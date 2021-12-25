// --------------------------------------------------------
// 失效预扣退还处理器
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const sconfig = require('./SConfig');
const common = require('../../protocol/Common');

function RestartRefund(ms) {
    clearTimeout(this.restartTimer);
    this.restartTimer = setTimeout(function () {
        this.StartRefund();
    }.bind(this), ms || 10 * 60 * 1000);
}

function GetKeyName(type) {
    if (type === common.Location.IMPAWN) {
        return 'IMPAWN_REFUND_ROUND';
    }
}

function GetWHRound() {
    if (!this.endRound) return this.round;
    let strRound = String(this.round);
    if (this.prRound) {
        strRound = String(this.prRound) + strRound;
    }
    return Number(strRound);
}

function GetRoundInfo() {
    this.prRound = 0;
    this.endRound = 0;

    let objGame = null;
    if (this.type === common.Location.IMPAWN) {
        objGame = g_impawn;
    } else {
        return;
    }
    if (typeof (objGame) !== 'object' ||
        typeof (objGame.GetRoundInfo) !== 'function') {
        return;
    }

    let roundInfo = objGame.GetRoundInfo();
    if (!roundInfo || !roundInfo[0] || !roundInfo[1]) return;
    this.endRound = roundInfo[0] - 1, this.prRound = roundInfo[1];
}

async function HandleRefund(whKey, times) {
    let replies = await g_gmredis.Batch([
        ['HGET', whKey, 'pid'],
        ['HGET', whKey, common.PropID.COIN]
    ]);
    if (replies === null) {
        setTimeout(function () {
            HandleRefund.call(this, whKey, times);
        }.bind(this), 3000);
        return;
    }

    if (isNaN(replies[0]) || isNaN(replies[1])) {
        g_log.Matter('退还预扣数据错误%s/%s', replies[0], replies[1]);
        g_gmredis.Batch([['DEL', whKey]], function () { });
        return;
    }
    let pid = Number(replies[0]);
    let whCoin = Number(replies[1]);

    let pKey = g_player.GetKey(pid);
    g_gmredis.Watch([pKey, whKey], async function (err) {
        if (err) {
            g_gmredis.Unwatch();
            setTimeout(function () {
                HandleRefund.call(this, whKey, times);
            }.bind(this), 3000);
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(pid, [
            ['EXISTS'],
            ['HGET', 'online'],
            ['HGET', common.PropID.COIN]
        ]);
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            g_gmredis.Unwatch();
            setTimeout(function () {
                HandleRefund.call(this, whKey, times);
            }.bind(this), 3000);
            return;
        }

        let playerExist = (replies[0] === 1);
        if (!playerExist) {
            g_gmredis.Unwatch();
            g_log.Matter('退还预扣玩家信息不存在%s/%s', pid, whCoin);
            g_gmredis.Batch([['DEL', whKey]], function () { });
            return;
        }
        let online = (Number(replies[1]) === 1);
        let coin = replies[2] ? Number(replies[2]) : 0;

        cmds = [['DEL', whKey]];
        cmds = cmds.concat(g_player.FillCmd(pid, [
            ['HSET', common.PropID.COIN, coin + whCoin]
        ]));
        let result = await g_gmredis.Multi(cmds);
        if (result === null) {
            setTimeout(function () {
                HandleRefund.call(this, whKey, times);
            }.bind(this), 3000);
            return;
        }

        if (result) {
            g_log.Warn('无效预扣成功退还：%s', JSON.stringify({
                pid: pid, refundSum: whCoin, resultSum: coin + whCoin,
                whKey: whKey, time: (new Date()).format('yyyy-MM-dd hh:mm:ss')
            }));
            g_handler.SendRefundMsg({ pid: pid, type: this.type, coin: whCoin });
            if (!online) g_player.Save(pid);
        } else if (times < sconfig.redisMaxRetryTimes) {
            setTimeout(function () {
                HandleRefund.call(this, whKey, times + 1);
            }.bind(this), 10);
        } else {
            g_log.Matter('多次退还预扣失败%s/%s', pid, whCoin);
            g_gmredis.Batch([['DEL', whKey]], function () { });
        }
    }.bind(this));
}

function DoRefund() {
    clearInterval(this.timerRefund);
    this.timerRefund = setTimeout(function () {
        let whRound = GetWHRound.call(this);
        if (this.round === whRound || whRound > this.endRound) {
            RestartRefund.call(this);
            return;
        }
        g_gmredis.Batch([
            ['KEYS', g_withhold.GetKey('*', this.type, whRound)]
        ], function (err, replies) {
            if (err) {
                DoRefund.call(this);
                g_log.Error(err);
                return;
            }
            let whKeyList = replies[0];
            for (let i = 0, len = whKeyList.length; i < len; ++i) {
                HandleRefund.call(this, whKeyList[i], 1);
            }
            let key = GetKeyName(this.type);
            g_gmredis.Batch([['SET', key, ++this.round]], function () { });
            DoRefund.call(this);
        }.bind(this));
    }.bind(this), 100);
}

function OpenGetRoundTimer() {
    setTimeout(function () {
        let cmds = [['GET', GetKeyName(this.type)]];
        g_gmredis.Batch(cmds, function (err, replies) {
            if (err) {
                OpenGetRoundTimer.call(this);
                g_log.Error(err);
                return;
            }
            this.round = replies[0] ? Number(replies[0]) : 1;
            RestartRefund.call(this, 10 * 1000);
        }.bind(this));
    }.bind(this), 3000);
}

const refund = {
    Init: function (type) {
        this.type = type;
        if (!GetKeyName(this.type)) {
            g_log.Error('预扣退还游戏类型错误%s', type);
            return;
        }
        OpenGetRoundTimer.call(this);
    },

    StartRefund: function () {
        if (!this.round) return;
        if (!GetKeyName(this.type)) return;
        GetRoundInfo.call(this);
        DoRefund.call(this);
    },
};

module.exports = refund;
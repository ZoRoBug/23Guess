// --------------------------------------------------------
// 押分核心逻辑
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const config = require('./Config');
const sconfig = require('../common/SConfig');
const common = require('../../protocol/Common');
const constant = require('../../protocol/Constant');
const BET_FAIL = require('../../protocol/MSG_IMPAWN_BET_FAIL_IMCL')['MSG_IMPAWN_BET_FAIL_IMCL'];

const SHOW_BETITEM_COUNT = 12; // 押分两边各显示押分条数
const SAVE_RECORD_COUNT = 60; // 保存游戏结果记录个数

function ResetData() {
    this.impawnTwoList = new Array();
    this.impawnThreeList = new Array();
    this.twoImpawnTotal = 0, this.threeImpawnTotal = 0;
    this.twoAwardRate = 100, this.threeAwardRate = 100;
}

function GetPRRound() {
    let cfgConn = config.connserver;
    if (cfgConn.length > 0 && !isNaN(cfgConn[0].id)) {
        return cfgConn[0].id;
    }
}

function GetWHRound() {
    let prRound = GetPRRound();
    let strRound = String(this.round);
    if (prRound) strRound = String(prRound) + strRound;
    return Number(strRound);
}

function RandomTail(sum) {
    if (sum < 100000) return sum;
    let sumW = sum % 100000;
    let sum10W = Math.randomnum(1, 9);
    let sum100W = sum - sum % 1000000;
    return sum100W + sum10W * 100000 + sumW;
}

function OnSettlement() {
    if (this.state !== common.ImpawnState.WAIT_END) {
        g_log.Error('错误状态%s开始游戏结算', this.state);
        return;
    }
    g_log.Debug('游戏正在进行结算');
    this.state = common.ImpawnState.SETTLEMENT;
    this.SendGameState();
    this.Settlement(this.Result());
}

function OnWaitEnd() {
    if (this.state !== common.ImpawnState.STARTING) {
        g_log.Error('错误状态%s等待结束游戏', this.state);
        return;
    }
    this.state = common.ImpawnState.WAIT_END;
    this.SendGameInfo();
    this.SendGameState();
    setTimeout(OnSettlement.bind(this), config.impawn.waitEndTime);
    g_log.Debug('%s毫秒后游戏开始结算', config.impawn.waitEndTime);
}

function OnStarting() {
    if (this.state !== common.ImpawnState.WAIT_START) {
        g_log.Error('错误状态%s开始进行游戏', this.state);
        return;
    }
    if (this.twoImpawnTotal > 0 || this.threeImpawnTotal > 0) {
        let cmds = [['SET', 'IMPAWN_ROUND', ++this.round]];
        let result = this.Result();
        if (result !== null) {
            let recordLength = this.recordList.push(result);
            if (recordLength > SAVE_RECORD_COUNT) this.recordList.shift();
            if (result) cmds.push(['SET', 'IMPAWN_CHU_RECORD', ++this.twoRecord]);
            if (!result) cmds.push(['SET', 'IMPAWN_HAN_RECORD', ++this.threeRecord]);
        }
        g_gmredis.Batch(cmds, function () { });
    }
    ResetData.call(this);
    this.state = common.ImpawnState.STARTING;
    this.startTimestamp = new Date().getTime();
    this.SendGameState();
    setTimeout(OnWaitEnd.bind(this), config.impawn.startingTime);
    g_log.Debug('%s毫秒游戏进行时间', config.impawn.startingTime);
}

function StartGame() {
    if (this.PauseGame()) return;
    if (this.state && this.state !== common.ImpawnState.PAUSE &&
        this.state !== common.ImpawnState.SETTLEMENT) {
        g_log.Error('错误状态%s重新开始游戏', this.state);
        return;
    }
    this.state = common.ImpawnState.WAIT_START;
    this.SendGameState();
    setTimeout(OnStarting.bind(this), config.impawn.waitStartTime);
    g_log.Debug('%s毫秒游戏开始', config.impawn.waitStartTime);
}

function OpenGetArchiveTimer() {
    setTimeout(async function () {
        let replies = await g_gmredis.Batch([
            ['GET', 'IMPAWN_ROUND'],
            ['GET', 'IMPAWN_CHU_RECORD'],
            ['GET', 'IMPAWN_HAN_RECORD']
        ]);
        if (replies === null) { OpenGetArchiveTimer.call(this); return; }
        this.round = replies[0] ? Number(replies[0]) + 1 : 1;
        this.twoRecord = replies[1] ? Number(replies[1]) : 0;
        this.threeRecord = replies[2] ? Number(replies[2]) : 0;
        StartGame.call(this);
    }.bind(this), 3000);
}

function DoSettlement(impawnItem, awardRate) {
    let whRound = GetWHRound.call(this);
    let cmds = g_withhold.FillCmd(impawnItem.pid, common.Location.IMPAWN, whRound, [
        ['HGET', common.PropID.COIN]
    ]);
    cmds = cmds.concat(g_player.FillCmd(impawnItem.pid, [
        ['EXISTS'],
        ['HGET', 'online'],
        ['HGET', common.PropID.COIN],
        ['HGET', 'winLoss'],
        ['HGET', 'coinSum'],
        ['HGET', 'level']
    ]));
    g_gmredis.Batch(cmds, function (err, replies) {
        if (err) {
            setTimeout(function () {
                DoSettlement.call(this, impawnItem, awardRate);
            }.bind(this), 3000);
            g_log.Error('押分第%s轮获取结算信息错误：%s', whRound, err);
            return;
        }

        let whCoin = replies[0] ? Number(replies[0]) : 0;
        if (whCoin !== impawnItem.coinSum) {
            g_log.Error('押分第%s轮预扣信息错误: %s != %s',
                whRound, whCoin, JSON.stringify(impawnItem));
            impawnItem.success = true;
            this.JudgeOver();
            return;
        }

        let playerExist = (replies[1] === 1);
        if (!playerExist) {
            g_log.Error('押分第%s轮结算玩家信息不存在，结算信息：%s',
                whRound, JSON.stringify(impawnItem));
            impawnItem.success = true;
            this.JudgeOver();
            return;
        }

        let online = (Number(replies[2]) === 1);
        let coin = replies[3] ? Number(replies[3]) : 0;
        let gainCoin = Math.floor(whCoin * awardRate / 100);
        let winCoin = 0;
        let cmds = [
            ['DEL', g_withhold.GetKey(impawnItem.pid, common.Location.IMPAWN, whRound)]
        ];
        if (gainCoin === -whCoin) {
            cmds = cmds.concat(g_player.FillCmd(impawnItem.pid, [
                ['HSET', common.PropID.COIN, coin + whCoin]
            ]));
        } else if (gainCoin >= whCoin) {
            winCoin = gainCoin - whCoin;
            cmds = cmds.concat(g_player.FillCmd(impawnItem.pid, [
                ['HSET', common.PropID.COIN, coin + gainCoin]
            ]));
        } else if (gainCoin === 0) {
            winCoin = -whCoin;
        } else {
            g_log.Error('押分第%s轮结算金额有误，结算信息：%s/%s',
                whRound, awardRate, JSON.stringify(impawnItem));
            impawnItem.success = true;
            this.JudgeOver();
            return;
        }

        let winLoss = replies[4] ? Number(replies[4]) : 0;
        let coinSum = replies[5] ? Number(replies[5]) : 0;
        let level = replies[6] ? Number(replies[6]) : 0;
        if (winCoin !== 0) {
            let newCoinSum = coinSum + whCoin;
            let newWinLoss = winLoss + winCoin;
            if (constant.CrownLevelCanUp(level, newWinLoss, newCoinSum)) {
                let newLevel = level + 1;
                cmds = cmds.concat(g_player.FillCmd(impawnItem.pid, [
                    ['HSET', 'level', newLevel],
                    ['HSET', 'winLoss', 0],
                    ['HSET', 'coinSum', 0]
                ]));
                g_rkredis.Batch([
                    ['ZADD', sconfig.rankCrown, -newLevel, impawnItem.pid]
                ], function () { });
            } else {
                cmds = cmds.concat(g_player.FillCmd(impawnItem.pid, [
                    ['HSET', 'winLoss', newWinLoss],
                    ['HSET', 'coinSum', newCoinSum]
                ]));
            }
            g_rkredis.Batch([
                ['ZINCRBY', sconfig.rankTDWinner, -winCoin, impawnItem.pid],
                ['ZREMRANGEBYRANK', sconfig.rankTDWinner, constant.RANK_WINNER_MAX_ITEM, -1]
            ], function () { });
        }

        g_gmredis.Batch(cmds, function (err, result) {
            if (err) {
                setTimeout(function () {
                    DoSettlement.call(this, impawnItem, awardRate);
                }.bind(this), 3000);
                g_log.Error('押分第%s轮最终结算错误：%s', whRound, err);
                return;
            }
            impawnItem.gainCoin = gainCoin;
            g_handler.SendImpawnSettlementMsg(g_cnclients, impawnItem);
            if (!online) g_player.Save(impawnItem.pid);
            impawnItem.success = true;
            this.JudgeOver();
        }.bind(this));
    }.bind(this));
}

const impawn = {
    Init: function () {
        ResetData.call(this);
        this.recordList = new Array();
        OpenGetArchiveTimer.call(this);
    },

    Uninit: function () {
        ResetData.call(this);
        clearInterval(this.restartTimer);
    },

    GetRoundInfo: function () {
        return [GetWHRound.call(this), GetPRRound()];
    },

    SendGameState: function (pid) {
        let remainTime = null;
        if (this.state === common.ImpawnState.STARTING) {
            let nowTimestamp = new Date().getTime();
            remainTime = config.impawn.startingTime - (nowTimestamp - this.startTimestamp);
            remainTime = Math.max(0, remainTime);
        }
        g_handler.SendImpawnGameStateMsg(g_cnclients, {
            pid: pid, remainTime: remainTime, state: this.state
        });
    },

    SendGameInfo: function (pid) {
        let twoImpawnTotal = this.twoImpawnTotal;
        let threeImpawnTotal = this.threeImpawnTotal;
        if (this.state === common.ImpawnState.STARTING) {
            twoImpawnTotal = RandomTail(this.twoImpawnTotal);
            threeImpawnTotal = RandomTail(this.threeImpawnTotal);
        }
        let objMsg = {
            twoImpawnTotal: twoImpawnTotal, threeImpawnTotal: threeImpawnTotal,
            twoAwardRate: this.twoAwardRate, threeAwardRate: this.threeAwardRate,
            twoPlayerCount: this.impawnTwoList.length,
            threePlayerCount: this.impawnThreeList.length
        };
        if (pid) {
            let impawnList = new Array();
            let playerTwoImpawnTimes = 0, playerThreeImpawnTimes = 0;
            let playerTwoImpawnTotal = 0, playerThreeImpawnTotal = 0;
            for (let i = 0, len = this.impawnTwoList.length; i < len; ++i) {
                if (pid === this.impawnTwoList[i].pid) {
                    playerTwoImpawnTotal += this.impawnTwoList[i].coinSum;
                    playerTwoImpawnTimes += this.impawnTwoList[i].impawnTimes;
                }
                if (i < SHOW_BETITEM_COUNT) {
                    impawnList.push(this.impawnTwoList[i]);
                }
            }
            for (let i = 0, len = this.impawnThreeList.length; i < len; ++i) {
                if (pid === this.impawnThreeList[i].pid) {
                    playerThreeImpawnTotal += this.impawnThreeList[i].coinSum;
                    playerThreeImpawnTimes += this.impawnThreeList[i].impawnTimes;
                }
                if (i < SHOW_BETITEM_COUNT) {
                    impawnList.push(this.impawnThreeList[i]);
                }
            }
            objMsg.pid = pid;
            objMsg.impawnList = impawnList;
            objMsg.recordList = this.recordList;
            objMsg.twoWinRecord = this.twoRecord;
            objMsg.threeWinRecord = this.threeRecord;
            objMsg.playerTwoImpawnTimes = playerTwoImpawnTimes;
            objMsg.playerThreeImpawnTimes = playerThreeImpawnTimes;
            objMsg.playerTwoImpawnTotal = playerTwoImpawnTotal;
            objMsg.playerThreeImpawnTotal = playerThreeImpawnTotal;

            let cfgIsPause = config.impawn.isPause;
            let cfgHeadHour = config.impawn.headHour;
            let cfgTailHour = config.impawn.tailHour;
            objMsg.restartHour = cfgIsPause ? cfgTailHour : cfgHeadHour;
            objMsg.pauseHour = cfgIsPause ? cfgHeadHour : cfgTailHour;
        }
        g_handler.SendImpawnGameInfoMsg(g_cnclients, objMsg);
    },

    Result: function () {
        return constant.ImpawnResult(this.twoImpawnTotal, this.threeImpawnTotal);
    },

    Count: function (pid, nickname, head, isTwo, coinSum) {
        if (isTwo) {
            this.twoImpawnTotal += coinSum;
        } else {
            this.threeImpawnTotal += coinSum;
        }

        let impawnTimes = 1;
        let impawnList = isTwo ? this.impawnTwoList : this.impawnThreeList;
        for (let i = 0, len = impawnList.length; i < len; ++i) {
            if (impawnList[i].pid !== pid) continue;
            coinSum += impawnList[i].coinSum;
            impawnTimes += impawnList[i].impawnTimes;
            impawnList.splice(i, 1);
            break;
        }
        let i = 0;
        for (let len = impawnList.length; i < len; ++i) {
            if (impawnList[i].coinSum < coinSum) break;
        }
        impawnList.splice(i, 0, {
            pid: pid, nickname: nickname, head: head,
            isTwo: isTwo, coinSum: coinSum, impawnTimes: impawnTimes
        });

        if (this.twoImpawnTotal > 0) {
            this.twoAwardRate = (this.twoImpawnTotal + this.threeImpawnTotal) / this.twoImpawnTotal;
            this.twoAwardRate = Math.floor(this.twoAwardRate * 100);
        }
        if (this.threeImpawnTotal > 0) {
            this.threeAwardRate = (this.twoImpawnTotal + this.threeImpawnTotal) / this.threeImpawnTotal;
            this.threeAwardRate = Math.floor(this.threeAwardRate * 100);
        }

        g_handler.SendImpawnNewBetMsg(g_cnclients, {
            pid: (i < SHOW_BETITEM_COUNT) ? null : pid,
            nickname: nickname, head: head, isTwo: isTwo, coinSum: coinSum
        });
        this.SendGameInfo();
    },

    Bet: function (betMsg) {
        let coinSum = Number(betMsg.coinSum);
        if (coinSum < constant.IMPAWN_MIN_BET_SUM || coinSum > constant.IMPAWN_MAX_BET_SUM) {
            betMsg.reason = BET_FAIL.Reason.PARAM_ERROR;
            g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
            return;
        }
        if (this.state !== common.ImpawnState.STARTING) {
            betMsg.reason = BET_FAIL.Reason.NO_STARTING;
            g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
            return;
        }

        let whRound = GetWHRound.call(this);
        let playerKey = g_player.GetKey(betMsg.pid);
        let withholdKey = g_withhold.GetKey(betMsg.pid, common.Location.IMPAWN, whRound);
        g_gmredis.Watch([playerKey, withholdKey], async function (err) {
            if (err) {
                g_gmredis.Unwatch();
                betMsg.reason = BET_FAIL.Reason.REDIS_ERROR;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                g_log.Error(err);
                return;
            }

            let cmds = g_withhold.FillCmd(betMsg.pid, common.Location.IMPAWN, whRound, [
                ['HGET', common.PropID.COIN]
            ]);
            cmds = cmds.concat(g_player.FillCmd(betMsg.pid, [
                ['HGET', common.PropID.COIN],
                ['HGET', 'nickname'],
                ['HGET', 'head'],
            ]));
            let replies = await g_gmredis.Batch(cmds);
            if (replies === null) {
                g_gmredis.Unwatch();
                betMsg.reason = BET_FAIL.Reason.REDIS_ERROR;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                return;
            }

            let whCoin = replies[0] ? Number(replies[0]) : 0;
            let coin = replies[1] ? Number(replies[1]) : 0;
            if (coin < coinSum) {
                g_gmredis.Unwatch();
                betMsg.reason = BET_FAIL.Reason.LACK_COIN;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                return;
            }

            let nickname = replies[2], head = replies[3];
            if (!nickname || nickname.length === 0) {
                g_gmredis.Unwatch();
                betMsg.reason = BET_FAIL.Reason.REDIS_ERROR;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                g_log.Error('投注获得昵称数据失败');
                return;
            }

            if (this.state !== common.ImpawnState.STARTING) {
                g_gmredis.Unwatch();
                betMsg.reason = BET_FAIL.Reason.NO_STARTING;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                return;
            }

            cmds = g_player.FillCmd(betMsg.pid, [
                ['HSET', common.PropID.COIN, coin - coinSum]
            ]);
            cmds = cmds.concat(g_withhold.FillCmd(betMsg.pid, common.Location.IMPAWN, whRound, [
                ['HSET', 'pid', betMsg.pid],
                ['HSET', common.PropID.COIN, whCoin + coinSum]
            ]));
            let result = await g_gmredis.Multi(cmds);
            if (result === null) {
                betMsg.reason = BET_FAIL.Reason.REDIS_ERROR;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                return;
            }
            if (!result) {
                betMsg.reason = BET_FAIL.Reason.REDIS_FAIL;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                return;
            }
            if (this.state === common.ImpawnState.SETTLEMENT) {
                g_log.Error('有一笔投注预扣成功，但已开始结算：%s', JSON.stringify(betMsg));
                return;
            }
            g_impawn.Count(betMsg.pid, nickname, head, betMsg.isTwo, coinSum);
        }.bind(this));
    },

    JudgeOver: function () {
        let totalSuccess = true;
        for (let i = 0, len = this.impawnTwoList.length; totalSuccess && i < len; ++i) {
            totalSuccess = this.impawnTwoList[i].success;
        }
        for (let i = 0, len = this.impawnThreeList.length; totalSuccess && i < len; ++i) {
            totalSuccess = this.impawnThreeList[i].success;
        }
        if (totalSuccess) {
            let diffTimestamp = (new Date()).getTime() - this.settlementTimestamp;
            if (diffTimestamp >= 3000) {
                let totalCount = this.impawnTwoList.length + this.impawnThreeList.length;
                g_log.Info('第' + this.round + '轮共结算' + totalCount + '条，共消耗' + diffTimestamp + '毫秒');
            }
            StartGame.call(this);
        }
        return totalSuccess;
    },

    Settlement: function (result) {
        this.settlementTimestamp = (new Date()).getTime();
        if (this.JudgeOver()) return;
        if (result === null) {
            for (let i = 0; i < this.impawnTwoList.length; ++i)
                DoSettlement.call(this, this.impawnTwoList[i], -100, 1);
            for (let i = 0; i < this.impawnThreeList.length; ++i)
                DoSettlement.call(this, this.impawnThreeList[i], -100, 1);
        } else if (result) {
            for (let i = 0; i < this.impawnTwoList.length; ++i)
                DoSettlement.call(this, this.impawnTwoList[i], this.twoAwardRate, 1);
            for (let i = 0; i < this.impawnThreeList.length; ++i)
                DoSettlement.call(this, this.impawnThreeList[i], 0, 1);
        } else {
            for (let i = 0; i < this.impawnTwoList.length; ++i)
                DoSettlement.call(this, this.impawnTwoList[i], 0, 1);
            for (let i = 0; i < this.impawnThreeList.length; ++i)
                DoSettlement.call(this, this.impawnThreeList[i], this.threeAwardRate, 1);
        }
    },

    PauseGame: function () {
        function IsPauseGameTime() {
            let headHour = config.impawn.headHour;
            let tailHour = config.impawn.tailHour;
            if (headHour === tailHour) return;
            let nowHour = (new Date()).getHours();
            let inRange = nowHour >= headHour && nowHour < tailHour;
            return (inRange === config.impawn.isPause);
        }

        if (!IsPauseGameTime()) return;
        this.state = common.ImpawnState.PAUSE;
        this.SendGameState();

        this.restartTimer = setInterval(function () {
            if (IsPauseGameTime()) return;
            clearInterval(this.restartTimer);
            this.twoRecord = 0, this.threeRecord = 0;
            this.recordList = new Array();
            StartGame.call(this);
        }.bind(this), 5000);

        return true;
    },
};

module.exports = impawn;
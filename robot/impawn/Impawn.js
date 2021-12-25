"use strict";
const config = require('./Config');
const order = require('../../public/Order');
const common = require('../../protocol/Common');
const constant = require('../../protocol/Constant');

function ResetData(client) {
    let player = this.playerList.get(client);
    if (!player) return;
    if (player.twoImpawnTotal > 0 || player.threeImpawnTotal > 0) {
        g_log.Error('结算未清空押分数据%s', JSON.stringify(player));
    }
    player.twoImpawnTimes = 0;
    player.threeImpawnTimes = 0;
    player.twoImpawnTotal = 0;
    player.threeImpawnTotal = 0;
    player.twoAwardRate = 100;
    player.threeAwardRate = 100;
    player.remainTime = 0;
}

function CreatePlayer(pid, nickname) {
    return {
        pid: pid, nickname: nickname,
        twoImpawnTimes: 0, threeImpawnTimes: 0,
        twoImpawnTotal: 0, threeImpawnTotal: 0,
        remainTime: 0, loginSuccess: false,
        twoAwardRate: 100, threeAwardRate: 100,
    }
}

const impawn = {
    Init: function () {
        this.playerList = new Map();

        setInterval(function () {
            for (let player of this.playerList.values()) {
                player.remainTime -= config.impawn.betGapTime;
            }
            this.Bet();
        }.bind(this), config.impawn.betGapTime);


        order.Register('inim', '开始登入押分', function () {
            clearInterval(this.timerLogin);
            clearInterval(this.timerLogout);
            this.timerLogin = setInterval(function () {
                let loginList = g_login.GetLoginList();
                if (this.playerList.size === loginList.size) {
                    if (this.loginComplete) return;
                    g_log.Info('共%s个玩家全部进入押分', this.playerList.size);
                    this.loginComplete = true;
                    return;
                }
                this.loginComplete = false;
                for (let [client, loginInfo] of loginList) {
                    if (!loginInfo.pi) continue;
                    if (this.playerList.has(client)) continue;
                    g_handler.SendImpawnLoginMsg(client);
                    let player = CreatePlayer(loginInfo.pi.pid, loginInfo.pi.nickname);
                    this.playerList.set(client, player);
                    break;
                }
            }.bind(this), config.impawn.loginTime);
        }.bind(this));

        order.Register('sinim', '停止登录押分', function () {
            clearInterval(this.timerLogin);
        }.bind(this));

        order.Register('outim', '开始登出押分', function () {
            clearInterval(this.timerLogin);
            clearInterval(this.timerLogout);
            this.timerLogout = setInterval(function () {
                if (this.playerList.size === 0) {
                    g_log.Info('所有玩家已退出押分');
                    clearInterval(this.timerLogout);
                    return;
                }
                for (let client of this.playerList.keys()) {
                    this.Logout(client);
                    break;
                }
            }.bind(this), config.impawn.logoutTime);
        }.bind(this));

        order.Register('soutim', '停止登出押分', function () {
            clearInterval(this.timerLogout);
        }.bind(this));

        order.Register('im', '开始押分', function () {
            this.canImpawn = true;
        }.bind(this));

        order.Register('sim', '停止押分', function () {
            this.canImpawn = false;
        }.bind(this));
    },

    Uninit: function () {
    },

    Login: function (client, success) {
        let player = this.playerList.get(client);
        if (!player) return;

        if (success) {
            player.loginSuccess = true;
        } else {
            this.playerList.delete(client);
        }
    },

    Logout: function (client) {
        let player = this.playerList.get(client);
        if (!player) return;

        g_handler.SendImpawnLogoutMsg(client);

        this.playerList.delete(client);
        g_log.Info('%s玩家已退出押分', player.nickname);
    },

    SetGameState: function (client, info) {
        if (info.state === common.ImpawnState.STARTING) {
            ResetData.call(this, client);
        }
        let player = this.playerList.get(client);
        if (player) {
            player.state = info.state;
            if (info.remainTime) player.remainTime = info.remainTime;
        } else {
            g_log.Error('SetGameState无链接信息');
        }
    },

    SetGameInfo: function (client, info) {
        let player = this.playerList.get(client);
        if (!player) {
            g_log.Error('SetGameInfo无链接信息');
            return;
        }
        player.twoAwardRate = info.twoAwardRate;
        player.threeAwardRate = info.threeAwardRate;
        if (info.pid === player.pid) {
            player.twoImpawnTimes = info.playerTwoImpawnTimes;
            player.threeImpawnTimes = info.playerThreeImpawnTimes;
            player.twoImpawnTotal = Number(info.playerTwoImpawnTotal);
            player.threeImpawnTotal = Number(info.playerThreeImpawnTotal);
        }
    },

    AddNewBet: function (client, info) {
        let player = this.playerList.get(client);
        if (!player) {
            g_log.Error('添加押分信息玩家列表链接不存在');
            return;
        }
        if (player.pid !== info.pid && player.nickname !== info.nickname) return;

        if (info.isTwo) {
            player.twoImpawnTotal = Number(info.coinSum);
        } else {
            player.threeImpawnTotal = Number(info.coinSum);
        }
    },

    BetFail: function (client, info) {
        let loginInfo = g_login.GetLoginInfo(client);
        if (!loginInfo) {
            g_log.Error('押分失败登录列表链接不存在');
            client.Close();
            return;
        }

        let player = this.playerList.get(client);
        if (!player) {
            g_log.Error('押分失败押分列表链接不存在');
            return;
        }

        if (info.isTwo) {
            player.twoImpawnTimes--;
        } else {
            player.threeImpawnTimes--;
        }
        loginInfo.pi[common.PropID.COIN] += Number(info.coinSum);
    },

    Settlement: function (client, info) {
        let loginInfo = g_login.GetLoginInfo(client);
        if (!loginInfo) {
            g_log.Error('押分结算登录列表链接不存在');
            client.Close();
            return;
        }

        let player = this.playerList.get(client);
        if (!player) {
            g_log.Error('押分结算押分列表链接不存在');
            return;
        }

        let betSum = info.isTwo ? player.twoImpawnTotal : player.threeImpawnTotal;
        if (info.coinSum != betSum) {
            g_log.Error('押分结算押分金额不正确%s/%s', player, info);
            return;
        }

        if (Number(info.gainCoin) > 0) {
            let awardRate = info.isTwo ? player.twoAwardRate : player.threeAwardRate;
            let gainCoin = betSum * awardRate / 100;
            if (info.gainCoin != gainCoin) {
                g_log.Error('押分结算获得金额不正确%s/%s/%s', gainCoin, player, info);
                return;
            }
        }

        if (info.isTwo) {
            player.twoImpawnTotal -= betSum;
        } else {
            player.threeImpawnTotal -= betSum;
        }

        if (-info.gainCoin == betSum) {
            loginInfo.pi[common.PropID.COIN] += info.coinSum;
        } else if (info.gainCoin >= betSum) {
            loginInfo.pi[common.PropID.COIN] += info.gainCoin;
        } else if (info.gainCoin != 0) {
            g_log.Error('无效的结算信息%s', JSON.stringify(info));
        }
    },

    Bet: function () {
        if (!this.canImpawn) return;
        if (Math.randomnum(1, 10000) > 10000 * config.impawn.betRate) return;

        let loopTimes = 0;
        let client = null, player = null;
        let clientList = [...this.playerList.keys()];
        while (++loopTimes < 10) {
            let random = Math.randomnum(0, clientList.length - 1);
            player = this.playerList.get(clientList[random]);
            if (!player) continue;
            let betCount = player.twoImpawnTimes + player.threeImpawnTimes;
            if (betCount < config.impawn.betCount && betCount < constant.IMPAWN_MAX_BET_TIMES) {
                client = clientList[random];
                break;
            }
        }
        if (client === null || player === null) return;
        if (player.state !== common.ImpawnState.STARTING || !player.loginSuccess) return;
        if (player.remainTime > config.impawn.maxBetTime || player.remainTime < config.impawn.minBetTime) return;

        let isTwo = true;
        if (config.impawn.betTwoRate === 0) {
            isTwo = false;
        } else if (config.impawn.betTwoRate > 0 && config.impawn.betTwoRate < 1) {
            isTwo = (Math.randomnum(1, 10000) <= 10000 * config.impawn.betTwoRate);
        }
        if (player.twoImpawnTimes > 0) isTwo = true;
        if (player.threeImpawnTimes > 0) isTwo = false;

        let loginInfo = g_login.GetLoginInfo(client);
        if (!loginInfo) {
            g_log.Error('押分预扣时玩家%s信息不存在', player.pid);
            client.Close();
            return;
        }

        let betSum = Math.randomnum(config.impawn.betMin, config.impawn.betMax);
        betSum = betSum - betSum % config.impawn.betMin;
        if (Math.randomnum(1, 10000) < 10000 * config.impawn.tailRate) {
            betSum = betSum + Math.randomnum(1, 9) * 100000;
        }
        if (betSum < constant.IMPAWN_MIN_BET_SUM || betSum > constant.IMPAWN_MAX_BET_SUM) return;

        if (loginInfo.pi[common.PropID.COIN] < betSum) {
            g_log.Warn('玩家%s押分失败，粮饷还有%s', player.nickname, loginInfo.pi[common.PropID.COIN]);
            return;
        }

        if (isTwo) {
            player.twoImpawnTimes++;
        } else {
            player.threeImpawnTimes++;
        }

        loginInfo.pi[common.PropID.COIN] -= betSum;
        g_handler.SendImpawnBetMsg(client, {
            isTwo: isTwo, coinSum: betSum
        });
    },
};

module.exports = impawn;
"use strict";
const config = require('./Config');
const EventEmitter = require('events');
const order = require('../../public/Order');
const common = require('../../protocol/Common');
const WSClient = require('../../public/WSClient');

function NewGate() {
    let client = new WSClient(this, config.login.address, this.emitter);
    this.gateList.add(client);
}

function NewConn(address, ticket) {
    let client = new WSClient(this, address, this.emitter);
    this.connList.set(client, { ticket: ticket });
}

function GetLoginPlayer(client) {
    for (let i = 0, len = config.players.length; i < len; ++i) {
        let player = config.players[i];
        if (!client) {
            if (!player.client) return player;
        } else {
            if (player.client === client) return player;
        }
    }
}

const login = {
    on: function () {
        this.emitter.on.apply(this.emitter, arguments);
    },

    emit: function () {
        this.emitter.emit.apply(this.emitter, arguments);
    },

    Init: function () {
        this.gateList = new Set();
        this.connList = new Map();
        this.logoutList = new Map();
        this.emitter = new EventEmitter();

        order.Register('in', '开始登录', function () {
            clearInterval(this.timerLogin);
            clearInterval(this.timerLogout);
            this.timerLogin = setInterval(function () {
                if (!GetLoginPlayer()) {
                    if (this.loginComplete) return;
                    this.loginComplete = true;
                    g_log.Info('共%s名玩家已完成登录', config.players.length);
                    return;
                } else {
                    this.loginComplete = false;
                    this.CreateGate();
                }
            }.bind(this), config.login.loginTime);
        }.bind(this));

        order.Register('sin', '停止登录', function () {
            clearInterval(this.timerLogin);
        }.bind(this));

        order.Register('out', '开始登出', function () {
            clearInterval(this.timerLogin);
            clearInterval(this.timerLogout);
            this.timerLogout = setInterval(function () {
                if (this.connList.size === 0) {
                    g_log.Info('所有玩家已完成退出');
                    clearInterval(this.timerLogout);
                    return;
                }
                for (let client of this.connList.keys()) {
                    this.DeleteConn(client);
                    g_handler.SendLogoutMsg(client);
                    break;
                }
            }.bind(this), config.login.logoutTime);
        }.bind(this));

        order.Register('sout', '停止登出', function () {
            clearInterval(this.timerLogout);
        }.bind(this));

        order.Register('li', '登录信息', function () {
            g_log.Info('登录人数%s/%s', this.connList.size, config.players.length);
        }.bind(this));
    },

    Uninit: function () {
        clearInterval(this.timerLogin);
        clearInterval(this.timerLogout);
        this.emitter.removeAllListeners();
        for (let client of this.gateList) client.Close();
        for (let client of this.connList.keys()) client.Close();
    },

    CreateGate: function () {
        NewGate.call(this);
    },

    CreateConn: function (address, ticket) {
        NewConn.call(this, address, ticket);
    },

    GetLoginList: function () {
        return this.connList;
    },

    GetLoginInfo: function (client) {
        return this.connList.get(client);
    },

    AddPlayerInfo: function (client, success, pi, propList) {
        let loginInfo = GetLoginPlayer(client);
        if (!loginInfo) {
            g_log.Error('登录列表中未找到链接', JSON.stringify(loginInfo));
        }
        if (!success) {
            if (loginInfo) loginInfo.client = null;
            return;
        }

        let clientInfo = this.connList.get(client);
        if (!clientInfo) {
            g_log.Error('未找到%s玩家链接', pi.nickname);
            client.Close();
            return;
        }

        let oldProp = this.logoutList.get(pi.pid);
        for (let i = 0, len = propList.length; i < len; ++i) {
            let prop = propList[i];
            pi[prop.id] = Number(prop.count);
            if (oldProp && oldProp[prop.id] != Number(prop.count)) {
                /*g_log.Warn('%s玩家登录后%s道具数量不对%s!=%s',
                    pi.nickname, prop.id, oldProp[prop.id], prop.count);*/
            }
        }
        if (!pi[common.PropID.COIN]) pi[common.PropID.COIN] = 0;
        clientInfo.pi = pi;
    },

    DeleteConn: function (client) {
        g_impawn.Logout(client);

        let loginInfo = GetLoginPlayer(client);
        if (loginInfo) loginInfo.client = null;

        let clientInfo = this.connList.get(client);
        if (clientInfo && clientInfo.pi) {
            this.logoutList.set(clientInfo.pi.pid, clientInfo.pi);
            g_log.Debug('%s已退出', clientInfo.pi.nickname);
        }
        this.connList.delete(client);
    },

    WSCOpen: function (client) {
        if (this.gateList.has(client)) {
            g_handler.SendApplyMsg(client);
        } else if (this.connList.has(client)) {
            let loginInfo = GetLoginPlayer();
            if (!loginInfo) {
                g_log.Warn('玩家已登录完成');
                this.DeleteConn(client);
                client.Close();
                return;
            }
            let clientInfo = this.connList.get(client);
            loginInfo.ticket = clientInfo.ticket;
            loginInfo.client = client;
            g_handler.SendLoginMsg(client, loginInfo);
        } else {
            g_log.Error('无效链接返回');
            client.Close();
        }
    },

    WSCClose: function (client) {
        this.gateList.delete(client);
        this.DeleteConn(client);
    },
};

module.exports = login;
// --------------------------------------------------------
// 链接服务器管理
// --------------------------------------------------------
//（1）temp临时链接
//（2）wait登录等待链接
//（3）game游戏模块链接
//（4）player游戏玩家链接
// --------------------------------------------------------
"use strict";
const EventEmitter = require('events');
const WSClient = require('../../public/WSClient');
const WSServer = require('../../public/WSServer');
const cfg = require('./Config').connserver;

const connserver = {
    on: function () {
        this.emitter.on.apply(this.emitter, arguments);
    },

    emit: function () {
        this.emitter.emit.apply(this.emitter, arguments);
    },

    Init: function () {
        this.tempList = new Map();

        this.idWaitList = new Map();
        this.waitIDList = new Map();

        this.idGameList = new Map();
        this.gameGIList = new Map();

        this.idPlayerList = new Map();
        this.playerPIList = new Map();

        this.emitter = new EventEmitter();
        this.wsserver = new WSServer(this, cfg.port, cfg.host, cfg.ssl);
    },

    Uninit: function () {
        this.emitter.removeAllListeners();
        for (let client of this.tempList.keys()) client.Close();
        for (let client of this.waitIDList.keys()) client.Close();
        for (let client of this.playerPIList.keys()) client.Close();
        setTimeout(function () {
            for (let client of this.gameGIList.keys()) client.Close();
            this.wsserver.Close();
        }.bind(this), 5000);
    },

    GetPlayerCount: function () {
        return this.idPlayerList.size;
    },

    PlayerIsOvertop: function () {
        return (this.GetPlayerCount() >= cfg.overPlayer);
    },

    Broadcast: function (msgData) {
        for (let client of this.playerPIList.keys()) {
            client.Send(msgData);
        }
    },

    DelPlayer: function (client, noSendMsg, noClose) {
        if (!this.playerPIList.has(client)) return;
        let pi = this.playerPIList.get(client);
        this.idPlayerList.delete(pi.pid);
        this.playerPIList.delete(client);
        g_handler.DelImpawnPlayer(pi.pid);
        if (!noSendMsg) g_handler.SendLogoutMsg(pi.pid);
        if (!noClose) client.Close();
    },

    DelWait: function (client, noClose) {
        if (!this.waitIDList.has(client)) return;
        let loginID = this.waitIDList.get(client);
        this.idWaitList.delete(loginID);
        this.waitIDList.delete(client);
        if (!noClose) client.Close();
    },

    DelGame: function (client) {
        if (!this.gameGIList.has(client)) return;
        let gi = this.gameGIList.get(client);
        this.idGameList.delete(gi.id);
        this.gameGIList.delete(client);
        g_log.Info('%s号模块（%s）已断开', gi.id, gi.name);
        client.Close();
    },

    AddPlayer: function (client, pi, wxSessionKey) {
        let oldClient = this.GetPlayer(pi.pid);
        if (oldClient) {
            g_log.Warn('玩家（PID：%s）激活链接未释放', pi.pid);
            this.DelPlayer(oldClient, true);
        }
        this.idPlayerList.set(pi.pid, client);
        this.playerPIList.set(client, {
            pid: pi.pid, wxSessionKey: wxSessionKey
        });
    },

    AddWait: function (loginID, client) {
        if (!this.tempList.has(client)) {
            g_log.Warn('临时列表未找到链接加入Wait');
            return;
        }
        if (this.GetWait(loginID)) {
            g_log.Error('有重复登录ID链接加入');
            return;
        }
        this.idWaitList.set(loginID, client);
        this.waitIDList.set(client, loginID);
        return this.tempList.delete(client);
    },

    AddGame: function (client, gi) {
        if (!this.tempList.has(client)) {
            g_log.Warn('临时列表未找到链接加入Game');
            return;
        }
        if (this.GetGame(gi.id)) {
            g_log.Error('有重复游戏ID链接加入');
            return;
        }
        this.idGameList.set(gi.id, client);
        this.gameGIList.set(client, {
            id: gi.id, name: gi.name
        });
        g_log.Info('%s号模块（%s）已注册成功', gi.id, gi.name);
        return this.tempList.delete(client);
    },

    GetPlayerInfo: function (client) {
        return this.playerPIList.get(client);
    },

    GetPlayer: function (pid) {
        return this.idPlayerList.get(Number(pid));
    },

    GetWait: function (loginID) {
        return this.idWaitList.get(Number(loginID));
    },

    GetGame: function (id) {
        return this.idGameList.get(Number(id));
    },

    WSCClose: function (client) {
        this.DelGame(client);
        this.DelWait(client);
        this.DelPlayer(client);
        this.tempList.delete(client);
    },

    WSSHeartbeat: function () {
        let nowTimestamp = new Date().getTime();
        for (let client of this.playerPIList.keys()) {
            client.SendHeartbeat(nowTimestamp);
        }
        for (let client of this.waitIDList.keys()) {
            client.SendHeartbeat(nowTimestamp);
        }
        for (let client of this.gameGIList.keys()) {
            client.SendHeartbeat(nowTimestamp);
        }
        for (let [client, connTime] of this.tempList) {
            if (nowTimestamp - connTime < 30000) {
                client.SendHeartbeat(nowTimestamp);
            } else {
                this.tempList.delete(client);
                client.Close();
            }
        }
    },

    WSSConnection: function (client) {
        let wsclient = new WSClient(this, client, this.emitter);
        this.tempList.set(wsclient, new Date().getTime());
    },
};

module.exports = connserver;
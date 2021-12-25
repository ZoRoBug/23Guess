// --------------------------------------------------------
// 网关服务器管理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const EventEmitter = require('events');
const WSClient = require('../../public/WSClient');
const WSServer = require('../../public/WSServer');
const cfg = require('./Config').gateserver;

const gateserver = {
    on: function () {
        this.emitter.on.apply(this.emitter, arguments);
    },

    emit: function () {
        this.emitter.emit.apply(this.emitter, arguments);
    },

    Init: function () {
        this.clientList = new Map();
        this.emitter = new EventEmitter();
        this.wsserver = new WSServer(this, cfg.port, cfg.host, cfg.ssl);
    },

    Uninit: function () {
        this.emitter.removeAllListeners();
        for (let client of this.clientList.keys()) client.Close();
        this.wsserver.Close();
    },

    HasClient: function (client) {
        return this.clientList.has(client);
    },

    WSCClose: function (client) {
        g_balance.DelServer(client);
        this.clientList.delete(client);
    },

    WSSConnection: function (client) {
        let wsclient = new WSClient(this, client, this.emitter);
        this.clientList.set(wsclient, new Date().getTime());
    },

    WSSHeartbeat: function () {
        let nowTimestamp = new Date().getTime();
        for (let [client, connTime] of this.clientList) {
            if (g_balance.HasServer(client) || nowTimestamp - connTime < 30000) {
                client.SendHeartbeat(nowTimestamp);
            } else {
                client.Close();
            }
        }
    },
};

module.exports = gateserver;
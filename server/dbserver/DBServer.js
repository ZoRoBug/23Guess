// --------------------------------------------------------
// 数据库服务器管理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const EventEmitter = require('events');
const WSClient = require('../../public/WSClient');
const WSServer = require('../../public/WSServer');
const cfg = require('./Config').dbserver;

const dbserver = {
    on: function () {
        this.emitter.on.apply(this.emitter, arguments);
    },

    emit: function () {
        this.emitter.emit.apply(this.emitter, arguments);
    },

    Init: function () {
        this.clientList = new Set();
        this.emitter = new EventEmitter();
        this.wsserver = new WSServer(this, cfg.port, cfg.host, cfg.ssl);
    },

    Uninit: function () {
        this.emitter.removeAllListeners();
        for (let client of this.clientList) { client.Close(); }
        this.wsserver.Close();
    },

    WSCClose: function (client) {
        this.clientList.delete(client);
    },

    WSSConnection: function (client) {
        let wsclient = new WSClient(this, client, this.emitter);
        this.clientList.add(wsclient);
    },

    WSSHeartbeat: function () {
        let nowTimestamp = new Date().getTime();
        for (let client of this.clientList) {
            client.SendHeartbeat(nowTimestamp);
        }
    },
};

module.exports = dbserver;
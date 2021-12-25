// --------------------------------------------------------
// 对链接服务器进行负载均衡
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const config = require('./Config');

const balance = {
    Init: function () {
        this.serverList = new Map();
        this.retainList = new Map();
    },

    Uninit: function () {
        this.serverList.clear();
        this.retainList.clear();
    },

    Register: function (server, client) {
        if (!g_gateserver.HasClient(client)) {
            g_log.Error('未找到链接服务器%s', JSON.stringify(server));
            return;
        }
        if (this.serverList.has(server.id)) {
            g_log.Error('链接服务器已注册%s', JSON.stringify(server));
            return;
        }
        if (server.nowPlayer < 0 || server.maxPlayer < 0 || server.overPlayer < server.maxPlayer) {
            g_log.Error('链接服务器注册参数错误%s', JSON.stringify(server));
            return;
        }
        server.client = client;
        this.serverList.set(server.id, server);
        g_log.Info('%s号链接服务器%s(%s/%s/%s)注册成功',
            server.id, server.address, server.nowPlayer, server.maxPlayer, server.overPlayer);
        return true;
    },

    Distribute: function (ip) {
        let server = null, nowTimestamp = (new Date()).getTime();
        if (this.retainList.has(ip)) {
            let infoRetain = this.retainList.get(ip);
            let diffTimestamp = nowTimestamp - infoRetain.timestamp;
            if (diffTimestamp < config.distribute.retainTime) {
                server = infoRetain.server;
            }
        }
        if (!server) {
            for (let value of this.serverList.values()) {
                if (value.nowPlayer >= value.overPlayer) continue;
                if (!server || server.nowPlayer > value.nowPlayer) server = value;
            }
        }
        if (server) {
            ++server.nowPlayer;
            server.ticket = Math.md5(String(ip) + Math.randomnum(1, 100000));
            this.retainList.set(ip, { timestamp: nowTimestamp, server: server });
        }
        return server;
    },

    ReportPlayer: function (info) {
        if (!this.serverList.has(info.id)) {
            g_log.Error('未找到%s号链接服务器信息，汇报人数失败', info.id);
        } else {
            let server = this.serverList.get(info.id);
            server.nowPlayer = info.nowPlayer;
            server.maxPlayer = info.maxPlayer;
            server.overPlayer = info.overPlayer;
        }
    },

    DelServer: function (client) {
        for (let [key, value] of this.serverList) {
            if (value.client !== client) { continue; }
            g_log.Info('%s号链接服务器已断开', value.id);
            this.serverList.delete(key);
            break;
        }
    },

    HasServer: function (client) {
        for (let value of this.serverList.values()) {
            if (value.client === client) return true;
        }
    },

    PrintServer: function () {
        for (let value of this.serverList.values()) {
            console.log('%s号服务器(%s) 在线人数：%s；最大人数：%s；最大负载：%s',
                value.id, value.address, value.nowPlayer, value.maxPlayer, value.overPlayer);
        }
    },

    IsEmpty: function () {
        return (this.serverList.size === 0);
    },
};

module.exports = balance;
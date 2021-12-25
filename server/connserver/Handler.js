// --------------------------------------------------------
// 消息&事件处理器
// --------------------------------------------------------
// （1）登录ID分配
// （2）ticket登录票据管理
// （3）impawn游戏玩家管理
// --------------------------------------------------------
"use strict";
const config = require('./Config');
const protocol = require('../../protocol/protocol');
const MSG_REPORT_CNGT = require('../../protocol/MSG_REPORT_CNGT')['MSG_REPORT_CNGT'];
const MSG_TICKET_GTCN = require('../../protocol/MSG_TICKET_GTCN')['MSG_TICKET_GTCN'];
const MSG_REGISTER_CNGT = require('../../protocol/MSG_REGISTER_CNGT')['MSG_REGISTER_CNGT'];
const MSG_REGISTER_GTCN = require('../../protocol/MSG_REGISTER_GTCN')['MSG_REGISTER_GTCN'];
const MSG_REGISTER_GMCN = require('../../protocol/MSG_REGISTER_GMCN')['MSG_REGISTER_GMCN'];
const MSG_REGISTER_CNGM = require('../../protocol/MSG_REGISTER_CNGM')['MSG_REGISTER_CNGM'];

const TICKET_RETAIN_TIME = 30000; // ticket保留时长ms

const handler = {
    Init: function () {
        this.loginID = 0;
        this.ticketList = new Map();
        this.impawnPlayers = new Set();

        setInterval(function () {
            let nowTimestamp = new Date().getTime();
            for (let [ticket, time] of this.ticketList) {
                let diffTime = nowTimestamp - time;
                if (diffTime < TICKET_RETAIN_TIME) continue;
                this.DelTicket(ticket);
            }
        }.bind(this), TICKET_RETAIN_TIME);

        g_gateclient.on('WS_CLIENT_OPEN', OnWSCOpen);
        g_gateclient.on('MSG_TICKET_GTCN', OnTicketMsg);
        g_gateclient.on('MSG_REGISTER_GTCN', OnGTRegisterMsg);
        g_connserver.on('MSG_REGISTER_GMCN', OnGMRegisterMsg);

        require('./handler/Lobby');
        require('./handler/Impawn');
    },

    Uninit: function () {
        this.ticketList.clear();
        this.impawnPlayers.clear();
    },

    GetLoginID: function () {
        return ++this.loginID;
    },

    AddTicket: function (ticket) {
        if (this.ticketList.has(ticket)) {
            g_log.Warn('出现重复ticket');
        } else {
            let nowTimestamp = new Date().getTime();
            this.ticketList.set(ticket, nowTimestamp);
        }
    },

    DelTicket: function (ticket) {
        return this.ticketList.delete(ticket);
    },

    SendImpawnMsg: function (pid, data) {
        let client = null;
        if (pid && pid > 0) {
            client = g_connserver.GetPlayer(pid);
            if (client) client.Send(data);
            return;
        }
        for (let pid of this.impawnPlayers) {
            client = g_connserver.GetPlayer(pid);
            if (client) client.Send(data);
        }
    },

    AddImpawnPlayer: function (pid) {
        if (this.HasImpawnPlayer(pid)) {
            g_log.Warn('%s重复进入押分', pid);
        } else {
            this.impawnPlayers.add(pid);
        }
    },

    HasImpawnPlayer: function (pid) {
        return this.impawnPlayers.has(pid);
    },

    DelImpawnPlayer: function (pid) {
        return this.impawnPlayers.delete(pid);
    },
};

function OnWSCOpen() {
    g_gateclient.Send(MSG_REGISTER_CNGT.encode({
        msgID: protocol.GetMsgId('MSG_REGISTER_CNGT'),
        id: config.connserver.id,
        address: config.connserver.address,
        nowPlayer: g_connserver.GetPlayerCount(),
        maxPlayer: config.connserver.maxPlayer,
        overPlayer: config.connserver.overPlayer
    }).finish());

    setInterval(function () {
        if (!g_gateclient.IsOpen()) return;
        g_gateclient.Send(MSG_REPORT_CNGT.encode({
            msgID: protocol.GetMsgId('MSG_REPORT_CNGT'),
            id: config.connserver.id,
            nowPlayer: g_connserver.GetPlayerCount(),
            maxPlayer: config.connserver.maxPlayer,
            overPlayer: config.connserver.overPlayer
        }).finish());
    }, 30000);
}

function OnTicketMsg(client, data) {
    let msg = MSG_TICKET_GTCN.decode(data);
    g_handler.AddTicket(msg.ticket);
}

function OnGTRegisterMsg(client, data) {
    let msg = MSG_REGISTER_GTCN.decode(data);
    if (msg.success) {
        g_log.Info('向网关服务器注册成功');
    } else {
        throw new Error('向网关服务器注册失败');
    }
}

function OnGMRegisterMsg(client, data) {
    let msg = MSG_REGISTER_GMCN.decode(data);
    msg.success = (config.connserver.id === msg.connID &&
        g_connserver.AddGame(client, msg));
    msg.msgID = protocol.GetMsgId('MSG_REGISTER_CNGM');
    client.Send(MSG_REGISTER_CNGM.encode(msg).finish());
}

module.exports = handler;
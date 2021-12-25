"use strict";
const protocol = require('../protocol/Protocol');
const MSG_APPLY_CLGT = require('../protocol/MSG_APPLY_CLGT')['MSG_APPLY_CLGT'];
const MSG_DISTRIBUTE_GTCL = require('../protocol/MSG_DISTRIBUTE_GTCL')['MSG_DISTRIBUTE_GTCL'];

const handler = {
    Init: function () {
        require('./LoginHandler');
        require('./LobbyHandler');
        require('./ImpawnHandler');
        g_gateclient.on('MSG_DISTRIBUTE_GTCL', OnDistributeMsg);
        g_gateclient.on('CLIENT_DISCONNECT', OnDisConnectMsg);
        g_gateclient.on('CLIENT_CONNECT', OnGateConnectMsg);
        g_connclient.on('CLIENT_DISCONNECT', OnDisConnectMsg);
        g_connclient.on('CLIENT_CONNECT', OnConnConnectMsg);
    },

    SetTicket: function (ticket) {
        this.ticket = ticket;
    },

    SendApplyMsg: function (client) {
        client.Send(MSG_APPLY_CLGT.encode({
            msgID: protocol.GetMsgId('MSG_APPLY_CLGT')
        }).finish());
    },
};

function OnGateConnectMsg() {
    g_handler.SendApplyMsg(g_gateclient);
}

function OnConnConnectMsg() {
    g_handler.SendLoginMsg(g_connclient);
}

function OnDisConnectMsg(name) {
    g_uiemitter.emit('UI_DISCONNECT', name);
}

function OnDistributeMsg(data) {
    let msg = MSG_DISTRIBUTE_GTCL.decode(data);
    if (msg.result === MSG_DISTRIBUTE_GTCL.Result.SUCCESS) {
        g_handler.SetTicket(msg.ticket);
        g_connclient.Connect(msg.address);
    } else {
        console.error('服务器分配失败：' + msg.result);
        g_uiemitter.emit('UI_DISTRIBUTE_FAIL', msg);
    }
    g_gateclient.Close();
}

module.exports = handler;
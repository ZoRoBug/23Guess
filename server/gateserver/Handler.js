// --------------------------------------------------------
// 消息&事件处理器
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const config = require('./config');
const protocol = require('../../protocol/protocol');
const MSG_APPLY_CLGT = require('../../protocol/MSG_APPLY_CLGT')['MSG_APPLY_CLGT'];
const MSG_TICKET_GTCN = require('../../protocol/MSG_TICKET_GTCN')['MSG_TICKET_GTCN'];
const MSG_REPORT_CNGT = require('../../protocol/MSG_REPORT_CNGT')['MSG_REPORT_CNGT'];
const MSG_REGISTER_CNGT = require('../../protocol/MSG_REGISTER_CNGT')['MSG_REGISTER_CNGT'];
const MSG_REGISTER_GTCN = require('../../protocol/MSG_REGISTER_GTCN')['MSG_REGISTER_GTCN'];
const MSG_DISTRIBUTE_GTCL = require('../../protocol/MSG_DISTRIBUTE_GTCL')['MSG_DISTRIBUTE_GTCL'];

const handler = {
    Init: function () {
        g_gateserver.on('MSG_APPLY_CLGT', OnApplyMsg);
        g_gateserver.on('MSG_REPORT_CNGT', OnReportMsg);
        g_gateserver.on('MSG_REGISTER_CNGT', OnRegisterMsg);
    },

    Uninit: function () {
    },
};

function OnApplyMsg(client, data) {
    try {
        MSG_APPLY_CLGT.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let noServerExplain = null;
    let result = MSG_DISTRIBUTE_GTCL.Result.SUCCESS;
    let server = g_balance.Distribute(client.GetIP());
    if (!server) {
        server = {};
        if (!g_balance.IsEmpty()) {
            result = MSG_DISTRIBUTE_GTCL.Result.FULL_PLAYER;
        } else {
            result = MSG_DISTRIBUTE_GTCL.Result.NO_SERVER;
            noServerExplain = config.explain;
        }
    }

    client.Send(MSG_DISTRIBUTE_GTCL.encode({
        msgID: protocol.GetMsgId('MSG_DISTRIBUTE_GTCL'),
        address: server.address, result: result,
        ticket: server.ticket, explain: noServerExplain
    }).finish(), function () {
        client.Close();
        if (result === MSG_DISTRIBUTE_GTCL.Result.SUCCESS) {
            server.client.Send(MSG_TICKET_GTCN.encode({
                msgID: protocol.GetMsgId('MSG_TICKET_GTCN'),
                ticket: server.ticket
            }).finish());
        }
    });
}

function OnRegisterMsg(client, data) {
    let msg = MSG_REGISTER_CNGT.decode(data);
    client.Send(MSG_REGISTER_GTCN.encode({
        msgID: protocol.GetMsgId('MSG_REGISTER_GTCN'),
        success: g_balance.Register(msg, client)
    }).finish());
}

function OnReportMsg(client, data) {
    let msg = MSG_REPORT_CNGT.decode(data);
    g_balance.ReportPlayer(msg);
}

module.exports = handler;

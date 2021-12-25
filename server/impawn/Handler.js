// --------------------------------------------------------
// 消息&事件处理器
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const config = require('./Config');
const protocol = require('../../protocol/protocol');
const MSG_REFUND_GMCL = require('../../protocol/MSG_REFUND_GMCL')['MSG_REFUND_GMCL'];
const MSG_REGISTER_GMCN = require('../../protocol/MSG_REGISTER_GMCN')['MSG_REGISTER_GMCN'];
const MSG_REGISTER_CNGM = require('../../protocol/MSG_REGISTER_CNGM')['MSG_REGISTER_CNGM'];
const MSG_IMPAWN_BET_CLIM = require('../../protocol/MSG_IMPAWN_BET_CLIM')['MSG_IMPAWN_BET_CLIM'];
const MSG_IMPAWN_LOGIN_CLIM = require('../../protocol/MSG_IMPAWN_LOGIN_CLIM')['MSG_IMPAWN_LOGIN_CLIM'];
const MSG_IMPAWN_NEW_BET_IMCL = require('../../protocol/MSG_IMPAWN_NEW_BET_IMCL')['MSG_IMPAWN_NEW_BET_IMCL'];
const MSG_IMPAWN_BET_FAIL_IMCL = require('../../protocol/MSG_IMPAWN_BET_FAIL_IMCL')['MSG_IMPAWN_BET_FAIL_IMCL'];
const MSG_IMPAWN_GAMEINFO_IMCL = require('../../protocol/MSG_IMPAWN_GAMEINFO_IMCL')['MSG_IMPAWN_GAMEINFO_IMCL'];
const MSG_IMPAWN_GAMESTATE_IMCL = require('../../protocol/MSG_IMPAWN_GAMESTATE_IMCL')['MSG_IMPAWN_GAMESTATE_IMCL'];
const MSG_IMPAWN_SETTLEMENT_IMCL = require('../../protocol/MSG_IMPAWN_SETTLEMENT_IMCL')['MSG_IMPAWN_SETTLEMENT_IMCL'];

const handler = {
    Init: function () {
        g_cnclients.on('WS_CLIENT_OPEN', OnWSCOpen);
        g_cnclients.on('MSG_REGISTER_CNGM', OnRegisterMsg);
        g_cnclients.on('MSG_IMPAWN_LOGIN_CLIM', OnImpawnLoginMsg);
        g_cnclients.on('MSG_IMPAWN_BET_CLIM', OnImpawnBetMsg);
    },

    Uninit: function () {
    },

    SendImpawnGameInfoMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_IMPAWN_GAMEINFO_IMCL');
        client.Send(MSG_IMPAWN_GAMEINFO_IMCL.encode(msg).finish());
    },

    SendImpawnGameStateMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_IMPAWN_GAMESTATE_IMCL');
        client.Send(MSG_IMPAWN_GAMESTATE_IMCL.encode(msg).finish());
    },

    SendImpawnNewBetMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_IMPAWN_NEW_BET_IMCL');
        client.Send(MSG_IMPAWN_NEW_BET_IMCL.encode(msg).finish());
    },

    SendImpawnBetFailMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_IMPAWN_BET_FAIL_IMCL');
        client.Send(MSG_IMPAWN_BET_FAIL_IMCL.encode(msg).finish());
    },

    SendImpawnSettlementMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_IMPAWN_SETTLEMENT_IMCL');
        client.Send(MSG_IMPAWN_SETTLEMENT_IMCL.encode(msg).finish());
    },

    SendRefundMsg: function (msg) {
        msg.msgID = protocol.GetMsgId('MSG_REFUND_GMCL');
        g_cnclients.Send(MSG_REFUND_GMCL.encode(msg).finish());
    },
};

function OnWSCOpen(client) {
    let connID = null;
    for (let i = 0; i < config.connserver.length; ++i) {
        let cid = config.connserver[i].id;
        if (g_cnclients.Get(cid) === client) {
            connID = cid;
            break;
        }
    }
    client.Send(MSG_REGISTER_GMCN.encode({
        msgID: protocol.GetMsgId('MSG_REGISTER_GMCN'),
        id: config.impawn.id, name: config.impawn.name,
        connID: connID
    }).finish());
}

function OnRegisterMsg(client, data) {
    let msg = MSG_REGISTER_CNGM.decode(data);
    let strID = String(msg.connID);
    if (msg.success) {
        g_log.Info(strID + '号链接服务器注册成功');
    } else {
        throw new Error(strID + '号链接服务器注册失败');
    }
}

function OnImpawnLoginMsg(client, data) {
    let msg = MSG_IMPAWN_LOGIN_CLIM.decode(data);
    g_impawn.SendGameState(msg.pid);
    g_impawn.SendGameInfo(msg.pid);
}

function OnImpawnBetMsg(client, data) {
    let msg = MSG_IMPAWN_BET_CLIM.decode(data);
    g_impawn.Bet(msg);
}

module.exports = handler;
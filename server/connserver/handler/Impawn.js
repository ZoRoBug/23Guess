// --------------------------------------------------------
// 押分相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const common = require('../../../protocol/Common');
const protocol = require('../../../protocol/protocol');
const MSG_IMPAWN_BET_CLIM = require('../../../protocol/MSG_IMPAWN_BET_CLIM')['MSG_IMPAWN_BET_CLIM'];
const MSG_IMPAWN_LOGIN_CLIM = require('../../../protocol/MSG_IMPAWN_LOGIN_CLIM')['MSG_IMPAWN_LOGIN_CLIM'];
const MSG_IMPAWN_LOGIN_CNCL = require('../../../protocol/MSG_IMPAWN_LOGIN_CNCL')['MSG_IMPAWN_LOGIN_CNCL'];
const MSG_IMPAWN_LOGOUT_CLCN = require('../../../protocol/MSG_IMPAWN_LOGOUT_CLCN')['MSG_IMPAWN_LOGOUT_CLCN'];
const MSG_IMPAWN_NEW_BET_IMCL = require('../../../protocol/MSG_IMPAWN_NEW_BET_IMCL')['MSG_IMPAWN_NEW_BET_IMCL'];
const MSG_IMPAWN_BET_FAIL_IMCL = require('../../../protocol/MSG_IMPAWN_BET_FAIL_IMCL')['MSG_IMPAWN_BET_FAIL_IMCL'];
const MSG_IMPAWN_GAMEINFO_IMCL = require('../../../protocol/MSG_IMPAWN_GAMEINFO_IMCL')['MSG_IMPAWN_GAMEINFO_IMCL'];
const MSG_IMPAWN_GAMESTATE_IMCL = require('../../../protocol/MSG_IMPAWN_GAMESTATE_IMCL')['MSG_IMPAWN_GAMESTATE_IMCL'];
const MSG_IMPAWN_SETTLEMENT_IMCL = require('../../../protocol/MSG_IMPAWN_SETTLEMENT_IMCL')['MSG_IMPAWN_SETTLEMENT_IMCL'];

g_connserver.on('MSG_IMPAWN_LOGIN_CLIM', function (client, data) {
    let msgIn = null;
    try {
        msgIn = MSG_IMPAWN_LOGIN_CLIM.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.IMPAWN);

    let msgOut = {
        msgID: protocol.GetMsgId('MSG_IMPAWN_LOGIN_CNCL'),
        result: MSG_IMPAWN_LOGIN_CNCL.Result.SUCCESS
    };
    if (!playerInfo) msgOut.result = MSG_IMPAWN_LOGIN_CNCL.Result.NO_CLIENT;
    if (!gameClient) msgOut.result = MSG_IMPAWN_LOGIN_CNCL.Result.OFFLINE;
    client.Send(MSG_IMPAWN_LOGIN_CNCL.encode(msgOut).finish());

    if (msgOut.result === MSG_IMPAWN_LOGIN_CNCL.Result.SUCCESS) {
        msgIn.pid = playerInfo.pid;
        gameClient.Send(MSG_IMPAWN_LOGIN_CLIM.encode(msgIn).finish());
        g_handler.AddImpawnPlayer(playerInfo.pid);
    }
});

g_connserver.on('MSG_IMPAWN_LOGOUT_CLCN', function (client, data) {
    try {
        MSG_IMPAWN_LOGOUT_CLCN.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }
    let playerInfo = g_connserver.GetPlayerInfo(client);
    if (playerInfo) g_handler.DelImpawnPlayer(playerInfo.pid);
});

g_connserver.on('MSG_IMPAWN_BET_CLIM', function (client, data) {
    let msgIn = null;
    try {
        msgIn = MSG_IMPAWN_BET_CLIM.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.IMPAWN);

    if (!gameClient) {
        msgIn.reason = MSG_IMPAWN_BET_FAIL_IMCL.Reason.OFFLINE;
    } else if (!playerInfo) {
        msgIn.reason = MSG_IMPAWN_BET_FAIL_IMCL.Reason.NO_CLIENT;
    } else if (!g_handler.HasImpawnPlayer(playerInfo.pid)) {
        msgIn.reason = MSG_IMPAWN_BET_FAIL_IMCL.Reason.NO_LOGIN;
    }

    if (msgIn.reason) {
        msgIn.msgID = protocol.GetMsgId('MSG_IMPAWN_BET_FAIL_IMCL');
        client.Send(MSG_IMPAWN_BET_FAIL_IMCL.encode(msgIn).finish());
    } else {
        msgIn.pid = playerInfo.pid;
        gameClient.Send(MSG_IMPAWN_BET_CLIM.encode(msgIn).finish());
    }
});

g_connserver.on('MSG_IMPAWN_SETTLEMENT_IMCL', function (client, data) {
    let msg = MSG_IMPAWN_SETTLEMENT_IMCL.decode(data);
    g_handler.SendImpawnMsg(msg.pid, data);
});

g_connserver.on('MSG_IMPAWN_BET_FAIL_IMCL', function (client, data) {
    let msg = MSG_IMPAWN_BET_FAIL_IMCL.decode(data);
    g_handler.SendImpawnMsg(msg.pid, data);
});

g_connserver.on('MSG_IMPAWN_NEW_BET_IMCL', function (client, data) {
    let msg = MSG_IMPAWN_NEW_BET_IMCL.decode(data);
    g_handler.SendImpawnMsg(msg.pid, data);
});

g_connserver.on('MSG_IMPAWN_GAMEINFO_IMCL', function (client, data) {
    let msg = MSG_IMPAWN_GAMEINFO_IMCL.decode(data);
    g_handler.SendImpawnMsg(msg.pid, data);
});

g_connserver.on('MSG_IMPAWN_GAMESTATE_IMCL', function (client, data) {
    let msg = MSG_IMPAWN_GAMESTATE_IMCL.decode(data);
    g_handler.SendImpawnMsg(msg.pid, data);
});
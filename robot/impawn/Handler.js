"use strict";
const protocol = require('../../protocol/protocol');
const MSG_APPLY_CLGT = require('../../protocol/MSG_APPLY_CLGT')['MSG_APPLY_CLGT'];
const MSG_DISTRIBUTE_GTCL = require('../../protocol/MSG_DISTRIBUTE_GTCL')['MSG_DISTRIBUTE_GTCL'];
const MSG_LOGIN_CLDB = require('../../protocol/MSG_LOGIN_CLDB')['MSG_LOGIN_CLDB'];
const MSG_LOGIN_DBCL = require('../../protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];
const MSG_LOGOUT_CLGM = require('../../protocol/MSG_LOGOUT_CLGM')['MSG_LOGOUT_CLGM'];
const MSG_KICK_LBCL = require('../../protocol/MSG_KICK_LBCL')['MSG_KICK_LBCL'];
const MSG_IMPAWN_LOGIN_CLIM = require('../../protocol/MSG_IMPAWN_LOGIN_CLIM')['MSG_IMPAWN_LOGIN_CLIM'];
const MSG_IMPAWN_LOGOUT_CLCN = require('../../protocol/MSG_IMPAWN_LOGOUT_CLCN')['MSG_IMPAWN_LOGOUT_CLCN'];
const MSG_IMPAWN_BET_CLIM = require('../../protocol/MSG_IMPAWN_BET_CLIM')['MSG_IMPAWN_BET_CLIM'];
const MSG_IMPAWN_LOGIN_CNCL = require('../../protocol/MSG_IMPAWN_LOGIN_CNCL')['MSG_IMPAWN_LOGIN_CNCL'];
const MSG_IMPAWN_BET_FAIL_IMCL = require('../../protocol/MSG_IMPAWN_BET_FAIL_IMCL')['MSG_IMPAWN_BET_FAIL_IMCL'];
const MSG_IMPAWN_NEW_BET_IMCL = require('../../protocol/MSG_IMPAWN_NEW_BET_IMCL')['MSG_IMPAWN_NEW_BET_IMCL'];
const MSG_IMPAWN_GAMEINFO_IMCL = require('../../protocol/MSG_IMPAWN_GAMEINFO_IMCL')['MSG_IMPAWN_GAMEINFO_IMCL'];
const MSG_IMPAWN_GAMESTATE_IMCL = require('../../protocol/MSG_IMPAWN_GAMESTATE_IMCL')['MSG_IMPAWN_GAMESTATE_IMCL'];
const MSG_IMPAWN_SETTLEMENT_IMCL = require('../../protocol/MSG_IMPAWN_SETTLEMENT_IMCL')['MSG_IMPAWN_SETTLEMENT_IMCL'];

const handler = {
    Init: function () {
        g_login.on('MSG_DISTRIBUTE_GTCL', OnDistributeMsg);
        g_login.on('MSG_LOGIN_DBCL', OnLoginMsg);
        g_login.on('MSG_KICK_LBCL', OnKickMsg);
        g_login.on('MSG_IMPAWN_LOGIN_CNCL', OnImpawnLoginMsg);
        g_login.on('MSG_IMPAWN_BET_FAIL_IMCL', OnImpawnBetFailMsg);
        g_login.on('MSG_IMPAWN_NEW_BET_IMCL', OnImpawnNewBetMsg);
        g_login.on('MSG_IMPAWN_GAMEINFO_IMCL', OnImpawnGameInfoMsg);
        g_login.on('MSG_IMPAWN_GAMESTATE_IMCL', OnImpawnGameStateMsg);
        g_login.on('MSG_IMPAWN_SETTLEMENT_IMCL', OnImpawnSettlementMsg);
    },

    Uninit: function () {
    },

    SendApplyMsg: function (client) {
        client.Send(MSG_APPLY_CLGT.encode({
            msgID: protocol.GetMsgId('MSG_APPLY_CLGT')
        }).finish());
    },

    SendLoginMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_LOGIN_CLDB');
        client.Send(MSG_LOGIN_CLDB.encode(msg).finish());
    },

    SendLogoutMsg: function (client) {
        client.Send(MSG_LOGOUT_CLGM.encode({
            msgID: protocol.GetMsgId('MSG_LOGOUT_CLGM')
        }).finish());
    },

    SendImpawnLoginMsg: function (client) {
        client.Send(MSG_IMPAWN_LOGIN_CLIM.encode({
            msgID: protocol.GetMsgId('MSG_IMPAWN_LOGIN_CLIM')
        }).finish());
    },

    SendImpawnLogoutMsg: function (client) {
        client.Send(MSG_IMPAWN_LOGOUT_CLCN.encode({
            msgID: protocol.GetMsgId('MSG_IMPAWN_LOGOUT_CLCN')
        }).finish());
    },

    SendImpawnBetMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_IMPAWN_BET_CLIM');
        client.Send(MSG_IMPAWN_BET_CLIM.encode(msg).finish());
    }
};

function OnDistributeMsg(client, data) {
    let msg = MSG_DISTRIBUTE_GTCL.decode(data);
    if (msg.result !== MSG_DISTRIBUTE_GTCL.Result.SUCCESS) {
        g_log.Error('申请服务器失败%s', JSON.stringify(msg));
    } else {
        g_login.CreateConn(msg.address, msg.ticket);
    }
    client.Close();
}

function OnLoginMsg(client, data) {
    let msg = MSG_LOGIN_DBCL.decode(data);
    if (msg.result !== MSG_LOGIN_DBCL.Result.SUCCESS) {
        g_log.Error('登录失败%s', JSON.stringify(msg));
        g_login.AddPlayerInfo(client, false);
        client.Close();
    } else {
        g_log.Info('%s登录成功', msg.pi.nickname);
        g_login.AddPlayerInfo(client, true, msg.pi, msg.propList);
    }
}

function OnKickMsg(client, data) {
    let msg = MSG_KICK_LBCL.decode(data);
    let loginInfo = g_login.GetLoginInfo(client);
    let sign = loginInfo && loginInfo.pi ? loginInfo.pi.nickname : msg.pid;
    g_log.Warn('%s被其他玩家挤下线', sign);
    client.Close();
}

function OnImpawnLoginMsg(client, data) {
    let msg = MSG_IMPAWN_LOGIN_CNCL.decode(data);
    if (msg.result === MSG_IMPAWN_LOGIN_CNCL.Result.SUCCESS) {
        let loginInfo = g_login.GetLoginInfo(client);
        if (loginInfo) {
            g_impawn.Login(client, true);
            g_log.Info('%s成功进入押分', loginInfo.pi.nickname);
        } else {
            g_impawn.Login(client, false);
            g_log.Error('进入押分未找到玩家信息%s', JSON.stringify(msg));
            client.Close();
        }
    } else {
        g_impawn.Login(client, false);
        g_log.Error('进入押分失败%s', JSON.stringify(msg));
    }
}

function OnImpawnBetFailMsg(client, data) {
    let msg = MSG_IMPAWN_BET_FAIL_IMCL.decode(data);
    g_log.Error('押分失败%s', JSON.stringify(msg));
    g_impawn.BetFail(client, msg);
}

function OnImpawnNewBetMsg(client, data) {
    let msg = MSG_IMPAWN_NEW_BET_IMCL.decode(data);
    g_log.Debug('新押分信息%s' + JSON.stringify(msg));
    g_impawn.AddNewBet(client, msg);
}

function OnImpawnGameInfoMsg(client, data) {
    let msg = MSG_IMPAWN_GAMEINFO_IMCL.decode(data);
    g_log.Debug('押分游戏信息%s' + JSON.stringify(msg));
    g_impawn.SetGameInfo(client, msg);
}

function OnImpawnGameStateMsg(client, data) {
    let msg = MSG_IMPAWN_GAMESTATE_IMCL.decode(data);
    g_log.Debug('押分游戏状态%s' + JSON.stringify(msg));
    g_impawn.SetGameState(client, msg);
}

function OnImpawnSettlementMsg(client, data) {
    let msg = MSG_IMPAWN_SETTLEMENT_IMCL.decode(data);
    g_log.Debug('押分结算信息%s' + JSON.stringify(msg));
    g_impawn.Settlement(client, msg);
}

module.exports = handler;
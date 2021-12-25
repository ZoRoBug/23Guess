// --------------------------------------------------------
// 大厅相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const helper = require('../../../public/Helper');
const common = require('../../../protocol/Common');
const constant = require('../../../protocol/Constant');
const protocol = require('../../../protocol/protocol');
const MSG_KICK_LBCL = require('../../../protocol/MSG_KICK_LBCL')['MSG_KICK_LBCL'];
const MSG_RANK_CLDB = require('../../../protocol/MSG_RANK_CLDB')['MSG_RANK_CLDB'];
const MSG_RANK_DBCL = require('../../../protocol/MSG_RANK_DBCL')['MSG_RANK_DBCL'];
const MSG_LOGIN_CLDB = require('../../../protocol/MSG_LOGIN_CLDB')['MSG_LOGIN_CLDB'];
const MSG_LOGIN_DBCL = require('../../../protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];
const MSG_LOGOUT_CLGM = require('../../../protocol/MSG_LOGOUT_CLGM')['MSG_LOGOUT_CLGM'];
const MSG_REFUND_GMCL = require('../../../protocol/MSG_REFUND_GMCL')['MSG_REFUND_GMCL'];
const MSG_SIGNIN_CLLB = require('../../../protocol/MSG_SIGNIN_CLLB')['MSG_SIGNIN_CLLB'];
const MSG_SIGNIN_LBCL = require('../../../protocol/MSG_SIGNIN_LBCL')['MSG_SIGNIN_LBCL'];
const MSG_REWARD_CLLB = require('../../../protocol/MSG_REWARD_CLLB')['MSG_REWARD_CLLB'];
const MSG_REWARD_LBCL = require('../../../protocol/MSG_REWARD_LBCL')['MSG_REWARD_LBCL'];

g_handler.SendLogoutMsg = function (pid) {
    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (gameClient) {
        gameClient.Send(MSG_LOGOUT_CLGM.encode({
            msgID: protocol.GetMsgId('MSG_LOGOUT_CLGM'), pid: pid
        }).finish());
    }
}

g_connserver.on('MSG_LOGIN_CLDB', function (client, data) {
    let msgIn = null;
    try {
        msgIn = MSG_LOGIN_CLDB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    try {
        if (g_connserver.PlayerIsOvertop()) {
            throw MSG_LOGIN_DBCL.Result.OVER_PLAYER;
        }

        if (!helper.IsValidPlatform(msgIn.platform)) {
            throw MSG_LOGIN_DBCL.Result.PARAM_ERROR;
        }

        if (msgIn.head.length > constant.LOGIN_HEAD_ADDR_MAX_SIZE) {
            throw MSG_LOGIN_DBCL.Result.PARAM_ERROR;
        }

        if (msgIn.nickname.length > constant.LOGIN_NICKNAME_MAX_SIZE) {
            throw MSG_LOGIN_DBCL.Result.PARAM_ERROR;
        }

        if (helper.IsOfficialPlatform(msgIn.platform) &&
            (msgIn.account.length === 0 || msgIn.account.length > constant.LOGIN_ACCOUNT_MAX_SIZE)) {
            throw MSG_LOGIN_DBCL.Result.ACCOUNT_NOEXIST;
        }

        if (helper.IsOfficialPlatform(msgIn.platform) && !constant.PasswordIsValid(msgIn.password)) {
            throw MSG_LOGIN_DBCL.Result.PASSWORD_ERROR;
        }

        if (helper.IsWeiXinPlatform(msgIn.platform) &&
            (msgIn.wxCode.length === 0 || msgIn.wxCode.length > constant.LOGIN_WXCODE_MAX_SIZE)) {
            throw MSG_LOGIN_DBCL.Result.WX_CODE_INVALID;
        }

        if (!g_handler.DelTicket(msgIn.ticket)) {
            throw MSG_LOGIN_DBCL.Result.TICKET_ERROR;
        }

        let gameClient = g_connserver.GetGame(common.Location.LOBBY);
        if (!gameClient) {
            throw MSG_LOGIN_DBCL.Result.LOBBY_NO_CONNECT;
        }

        msgIn.loginID = g_handler.GetLoginID();
        if (!g_connserver.AddWait(msgIn.loginID, client)) {
            throw MSG_LOGIN_DBCL.Result.UNKNOW1;
        }

        gameClient.Send(MSG_LOGIN_CLDB.encode(msgIn).finish());
    } catch (result) {
        if (typeof result !== 'number') {
            g_log.Error('MSG_LOGIN_CLDB意外异常出现%s', result);
            result = MSG_LOGIN_DBCL.Result.UNKNOW2;
        }
        client.Send(MSG_LOGIN_DBCL.encode({
            msgID: protocol.GetMsgId('MSG_LOGIN_DBCL'),
            result: result
        }).finish(), function () {
            client.Close();
        });
    }
});

g_connserver.on('MSG_LOGOUT_CLGM', function (client, data) {
    try {
        MSG_LOGOUT_CLGM.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }
    g_connserver.DelWait(client);
    g_connserver.DelPlayer(client);
    client.Close();
});

g_connserver.on('MSG_SIGNIN_CLLB', function (client, data) {
    let msg = null;
    try {
        msg = MSG_SIGNIN_CLLB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (!playerInfo) {
        msg.result = MSG_SIGNIN_LBCL.Result.NO_CLIENT;
    } else if (!gameClient) {
        msg.result = MSG_SIGNIN_LBCL.Result.OFFLINE;
    }

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_SIGNIN_LBCL');
        client.Send(MSG_SIGNIN_LBCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_SIGNIN_CLLB.encode(msg).finish());
    }
});

g_connserver.on('MSG_REWARD_CLLB', function (client, data) {
    let msg = null;
    try {
        msg = MSG_REWARD_CLLB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (!playerInfo) {
        msg.result = MSG_REWARD_LBCL.Result.NO_CLIENT;
    } else if (!gameClient) {
        msg.result = MSG_REWARD_LBCL.Result.OFFLINE;
    }

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_REWARD_LBCL');
        client.Send(MSG_REWARD_LBCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_REWARD_CLLB.encode(msg).finish());
    }
});

g_connserver.on('MSG_RANK_CLDB', function (client, data) {
    let msg = null;
    try {
        msg = MSG_RANK_CLDB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (!playerInfo || !gameClient) return;

    msg.pid = playerInfo.pid;
    gameClient.Send(MSG_RANK_CLDB.encode(msg).finish());
});

g_connserver.on('MSG_LOGIN_DBCL', function (client, data) {
    let msg = MSG_LOGIN_DBCL.decode(data);

    let waitClient = g_connserver.GetWait(msg.loginID);
    if (!waitClient) {
        g_log.Error('未发现%s号登录消息链接', msg.loginID);
        return;
    }

    if (msg.result === MSG_LOGIN_DBCL.Result.SUCCESS) {
        g_connserver.AddPlayer(waitClient, msg.pi, msg.wxSessionKey);
        g_connserver.DelWait(waitClient, true);
    }

    msg.loginID = null, msg.wxSessionKey = null;
    waitClient.Send(MSG_LOGIN_DBCL.encode(msg).finish(), function () {
        if (msg.result !== MSG_LOGIN_DBCL.Result.SUCCESS) {
            g_connserver.DelWait(waitClient);
        }
    });
});

g_connserver.on('MSG_KICK_LBCL', function (client, data) {
    let msg = MSG_KICK_LBCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) {
        g_connserver.DelPlayer(playerClient, true, true);
        playerClient.Send(data, function () {
            playerClient.Close();
        });
    }
});

g_connserver.on('MSG_SIGNIN_LBCL', function (client, data) {
    let msg = MSG_SIGNIN_LBCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_REWARD_LBCL', function (client, data) {
    let msg = MSG_REWARD_LBCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_REFUND_GMCL', function (client, data) {
    let msg = MSG_REFUND_GMCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_RANK_DBCL', function (client, data) {
    let msg = MSG_RANK_DBCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});
// --------------------------------------------------------
// 消息&事件处理器
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const config = require('./Config');
const sconfig = require('../common/SConfig');
const protocol = require('../../protocol/protocol');
const MSG_REGISTER_GMCN = require('../../protocol/MSG_REGISTER_GMCN')['MSG_REGISTER_GMCN'];
const MSG_REGISTER_CNGM = require('../../protocol/MSG_REGISTER_CNGM')['MSG_REGISTER_CNGM'];

const handler = {
    Init: function () {
        require('./handler/Rank');
        require('./handler/Login');
        require('./handler/Signin');
        g_cnclients.on('WS_CLIENT_OPEN', OnWSCOpen);
        g_cnclients.on('MSG_REGISTER_CNGM', OnRegisterMsg);
        setInterval(OnTransWinnerRank.bind(this), 50000);
    },

    Uninit: function () {
    },
};

function OnTransWinnerRank() {
    g_rkredis.Batch([['GET', sconfig.rankWinnerThansDay]], function (err, replies) {
        if (err) {
            g_log.Error(err);
            return;
        }
        let nowDate = new Date();
        let thansDay = replies[0];
        let nowDay = nowDate.format('yyyy-MM-dd');
        if (thansDay) {
            if (thansDay === nowDay) return;
            if (nowDate.getHours() !== 0) return;
        }
        g_rkredis.Batch([
            ['ZINTERSTORE', sconfig.rankYDWinner, 1, sconfig.rankTDWinner],
            ['ZREMRANGEBYRANK', sconfig.rankTDWinner, 0, -1],
            ['SET', sconfig.rankWinnerThansDay, nowDay],
        ], function () { });
    }.bind(this));
}

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
        id: config.lobby.id, name: config.lobby.name,
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

module.exports = handler;
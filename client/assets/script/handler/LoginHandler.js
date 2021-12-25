"use strict";
const config = require('../Config');
const common = require('../protocol/Common');
const utility = require('../public/Utility');
const protocol = require('../protocol/Protocol');
const constant = require('../protocol/Constant');
const MSG_KICK_LBCL = require('../protocol/MSG_KICK_LBCL')['MSG_KICK_LBCL'];
const MSG_LOGIN_CLDB = require('../protocol/MSG_LOGIN_CLDB')['MSG_LOGIN_CLDB'];
const MSG_LOGIN_DBCL = require('../protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];

g_handler.StartLogin = function (head, nickname) {
    this.loginHead = head;
    this.loginNickname = nickname;
    if (!utility.IsWeinXinPlatform()) {
        this.loginAccount = 'zztest1';
        this.loginPassword = '37Zz123456';
        g_gateclient.Connect(config.gateserver.address);
        return;
    }
    function Success(res) {
        if (res.code) {
            this.wxCode = res.code;
            g_gateclient.Connect(config.gateserver.address);
        } else {
            console.error('微信登录错误：' + res.errMsg);
            g_uiemitter.emit('UI_WXLOGIN_FAIL', res.errMsg);
        }
    }
    wx.login({
        timeout: 7000,
        success: Success.bind(this)
    })
}

g_handler.SendLoginMsg = function (client) {
    let nickname = null;
    if (this.loginNickname) {
        let nameMaxSize = constant.LOGIN_NICKNAME_MAX_SIZE;
        nickname = this.loginNickname.slice(0, nameMaxSize);
    }
    let msg = {
        msgID: protocol.GetMsgId('MSG_LOGIN_CLDB'),
        wxCode: this.wxCode, ticket: this.ticket,
        platform: common.Platform.WX_MINIGAME,
        head: this.loginHead, nickname: nickname
    };
    if (!utility.IsWeinXinPlatform()) {
        msg.account = this.loginAccount;
        msg.password = this.loginPassword;
        msg.platform = common.Platform.OFFICIAL;
    }
    client.Send(MSG_LOGIN_CLDB.encode(msg).finish());
}

g_connclient.on('MSG_LOGIN_DBCL', function (data) {
    let msg = MSG_LOGIN_DBCL.decode(data);
    if (msg.result !== MSG_LOGIN_DBCL.Result.SUCCESS) {
        console.error('登录失败：', msg.result);
        g_connclient.Close();
    } else {
        console.info('%s登录成功', msg.pi.nickname);
        g_player.SetPropList(msg.propList);
        g_player.SetPlayerInfo(msg.pi);
    }
    g_uiemitter.emit('UI_LOGIN_RESULT', msg);
});

g_connclient.on('MSG_KICK_LBCL', function (data) {
    let msg = MSG_KICK_LBCL.decode(data);
    g_uiemitter.emit('UI_KICK', msg);
    g_connclient.Close();
});
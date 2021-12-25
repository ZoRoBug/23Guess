// --------------------------------------------------------
// 界面消息通知
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const EventEmitter = require('events');

const msgList = [
    'UI_DISCONNECT', // 服务器链接断开

    'UI_DISTRIBUTE_FAIL', // 分配服务器失败
    'UI_WXLOGIN_FAIL', // 微信登录失败
    'UI_LOGIN_RESULT', // 登录结果
    'UI_KICK', // 被提下线

    'UI_RANK', // 排行榜
    'UI_REFUND', // 失效预扣退还
    'UI_SIGNIN', // 限时签到领奖
    'UI_LEVEL_UPGRADE', // 皇冠等级升级

    'UI_IMPAWN_LOGIN', // 押分登录
    'UI_IMPAWN_LOGOUT', // 押分登出
    'UI_IMPAWN_BET_FAIL', // 押分失败
    'UI_IMPAWN_NEW_BET', // 押分新投注
    'UI_IMPAWN_GAMEINFO', // 押分游戏信息
    'UI_IMPAWN_GAMESTATE', // 押分游戏状态
    'UI_IMPAWN_SETTLEMENT', // 押分结算
];

const emitter = new EventEmitter();
const uiemitter = {
    on: function () {
        if (!this.msgList[arguments[0]]) {
            console.error('未定义的消息协议%s', arguments[0]);
            return;
        }
        emitter.on.apply(emitter, arguments);
    },

    emit: function () {
        if (!this.msgList[arguments[0]]) {
            console.error('未定义的消息协议%s', arguments[0]);
            return;
        }
        emitter.emit.apply(emitter, arguments);
    },

    Init: function () {
        this.msgList = {};
        for (let i = 0, len = msgList.length; i < len; ++i) {
            this.msgList[msgList[i]] = i + 1;
        }
    }
};

module.exports = uiemitter;
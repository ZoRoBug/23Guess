// --------------------------------------------------------
// 整个项目消息协议
// --------------------------------------------------------
// msg数组为通信消息协议；bag数组为数据包，辅助消息协议
// gateserver(GT)网关服务器；connserver(CN)链接服务器；dbserver(DB)数据库服务器
// client(CL)客户端；lobby(LB)游戏大厅；impawn(IM)押分模块；GM后缀代表lobby，impawn集合
// 消息后缀代表消息流向，比如CLGT就代表 客户端 -> 网关服务器
// --------------------------------------------------------
"use strict";

const protocol = {
    // 通过消息ID获取消息名称
    GetMsgName: function (id) {
        if (typeof id != 'number' || id < 0) return;
        return this.msg[id];
    },

    // 通过消息名称获取消息ID
    GetMsgId: function (name) {
        if (typeof name != 'string' || name.length === 0) return;
        if (!this.msgid) {
            this.msgid = new Array();
            for (let i = 0, len = this.msg.length; i < len; ++i) {
                this.msgid[this.msg[i]] = i;
            }
        }
        return this.msgid[name];
    },

    msg: [
        'MSG_PING', // PING（用于客户端检查链接是否断开）
        'MSG_PONG', // PONG（用于客户端检查链接是否断开）

        'MSG_APPLY_CLGT', // 申请链接服务器
        'MSG_DISTRIBUTE_GTCL', // 分配链接服务器

        'MSG_REGISTER_CNGT', // 链接服务器申请注册
        'MSG_REGISTER_GTCN', // 链接服务器注册返回
        'MSG_REPORT_CNGT', // 链接服务器报告人数
        'MSG_TICKET_GTCN', // 通知链接服务器登录票据

        'MSG_REGISTER_GMCN', // 功能模块申请注册
        'MSG_REGISTER_CNGM', // 功能模块注册返回

        'MSG_LOGIN_CLDB', // 玩家登录
        'MSG_LOGIN_DBCL', // 玩家登录返回
        'MSG_LOGOUT_CLGM', // 玩家登出
        'MSG_KICK_LBCL', // 踢出玩家

        'MSG_REFUND_GMCL', // 失效预扣退还

        'MSG_SIGNIN_CLLB', // 签到领奖
        'MSG_SIGNIN_LBCL', // 签到领奖返回

        'MSG_REWARD_CLLB', // 游戏领奖
        'MSG_REWARD_LBCL', // 游戏领奖返回

        'MSG_RANK_CLDB', // 排行榜请求
        'MSG_RANK_DBCL', // 排行榜列表返回

        'MSG_IMPAWN_LOGIN_CLIM', // 登入押分
        'MSG_IMPAWN_LOGIN_CNCL', // 登入押分返回
        'MSG_IMPAWN_LOGOUT_CLCN', // 登出押分
        'MSG_IMPAWN_BET_CLIM', // 开始押分
        'MSG_IMPAWN_BET_FAIL_IMCL', // 押分失败
        'MSG_IMPAWN_NEW_BET_IMCL', // 新押分
        'MSG_IMPAWN_GAMEINFO_IMCL', // 游戏信息
        'MSG_IMPAWN_GAMESTATE_IMCL', // 游戏状态
        'MSG_IMPAWN_SETTLEMENT_IMCL', // 押分结算
    ],

    bag: [
        'MsgID', // 用于从消息编码数据中获取消息ID
        'Common', // 公共消息结构与公共枚举值
    ],
};

module.exports = protocol;
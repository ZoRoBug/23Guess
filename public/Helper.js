// --------------------------------------------------------
// 功能辅助模块
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const common = require('../protocol/Common');
const constant = require('../protocol/Constant');

const helper = {
    // 合法平台值？
    IsValidPlatform: function (platform) {
        if (typeof platform !== 'number') return false;
        return (platform > common.Platform.MIN && platform < common.Platform.MAX);
    },
    // 是官方平台？
    IsOfficialPlatform: function (platform) {
        if (typeof platform !== 'number') return false;
        return (platform === common.Platform.OFFICIAL);
    },
    // 是微信平台？
    IsWeiXinPlatform: function (platform) {
        if (typeof platform !== 'number') return false;
        return (platform === common.Platform.WX_MINIGAME);
    },

    // 是否为Admin
    IsAdmin: function (identity) {
        if (typeof identity !== 'number') return false;
        return (identity === common.Identity.ADMIN);
    },

    // 合法三国对象值？
    IsValidKing3Object: function (object) {
        if (typeof object !== 'number') return false;
        return (object > common.King3Object.MIN && object < common.King3Object.MAX);
    },

    // 通过兑换金额生成兑换码
    CreateExchCode: function (sum) {
        let randow = Math.random().toString(36);
        let nowTime = (new Date()).getTime();
        return Math.md5(randow + String(nowTime)) + sum.toString(16);
    },

    // 从兑换码中获得兑换金额
    GetExchangeSum: function (ticket) {
        if (typeof ticket !== 'string') return 0;
        if (ticket.length <= constant.EXCHANGE_TICKET_MIN_SIZE) return 0;
        let sumPos = constant.EXCHANGE_TICKET_MIN_SIZE - ticket.length;
        let strSum16 = ticket.slice(sumPos);
        let strSum10 = parseInt(strSum16, 16);
        if (isNaN(strSum10)) return 0;
        return Number(strSum10);
    },
};

module.exports = helper;
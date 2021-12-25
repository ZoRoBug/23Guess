// --------------------------------------------------------
// 整个项目常量
// --------------------------------------------------------
// 客户端与服务器共用
// --------------------------------------------------------
"use strict";

const constant = {
    ///////////////////////////////////////////////////////
    // 游戏系统相关

    RANK_CROWN_MAX_ITEM: 200, // 皇冠排行榜最大条数
    RANK_WINNER_MAX_ITEM: 50, // 吃鸡排行榜最大条数
    RANK_REQUEST_COUNT: 20, // 单次请求排行榜条数

    // 判断密码是否合法
    PasswordIsValid: function (password) {
        if (typeof password !== 'string') return false;
        if (password.indexOf('123456') === 0) return false;
        if (password.length < this.LOGIN_PASSWORD_MIN_SIZE ||
            password.length > this.LOGIN_PASSWORD_MAX_SIZE) return false;
        let patter = /^[A-Za-z0-9]+$/;
        return patter.test(password);
    },

    // 时间字符串转换为时间戳，时间无效返回NaN
    StrTimeToTimestamp: function (strTime) {
        strTime = strTime.substring(0, 19);
        strTime = strTime.replace(/-/g, '/');
        return new Date(strTime).getTime();
    },

    ///////////////////////////////////////////////////////
    // 登录模块相关
    LOGIN_WXCODE_MAX_SIZE: 64, // 微信最大长度
    LOGIN_ACCOUNT_MAX_SIZE: 20, // 账号最大长度
    LOGIN_PASSWORD_MAX_SIZE: 20, // 密码最大长度
    LOGIN_PASSWORD_MIN_SIZE: 6, // 密码最小长度
    LOGIN_NICKNAME_MAX_SIZE: 6, // 昵称最大长度
    LOGIN_HEAD_ADDR_MAX_SIZE: 164, // 头像地址最大长度

    ///////////////////////////////////////////////////////
    // 押分模块相关
    IMPAWN_MIN_BET_SUM: 1000, // 每次最小押分金额
    IMPAWN_MAX_BET_SUM: 500000000, // 每次最大押分金额
    IMPAWN_MAX_BET_TIMES: 3, // 每轮最大押分次数

    // 押分结果，返回null无效，true押2赢，false押3赢
    ImpawnResult: function (twoImpawnTotal, threeImpawnTotal) {
        if (!twoImpawnTotal || !threeImpawnTotal) return null;

        let strTwoImpawnTotal = String(twoImpawnTotal);
        let strTwo10wan = strTwoImpawnTotal.slice(-6, -5);
        if (strTwoImpawnTotal.length < 6) {
            strTwo10wan = strTwoImpawnTotal.slice(0, 1);
        }
        if (isNaN(strTwo10wan)) return null;

        let strThreeImpawnTotal = String(threeImpawnTotal);
        let strThree10wan = strThreeImpawnTotal.slice(-6, -5);
        if (strThreeImpawnTotal.length < 6) {
            strThree10wan = strThreeImpawnTotal.slice(0, 1);
        }
        if (isNaN(strThree10wan)) return null;

        let result = Number(strTwo10wan) + Number(strThree10wan);
        result = String(result).slice(-1);
        return Number(result) <= 2;
    },

    ///////////////////////////////////////////////////////
    // 皇冠等级相关

    // 皇冠等级列表
    CROWN_LEVEL: [
        { level: 0, win: 0, sum: 0 },
        { level: 1, win: 100000000, sum: 10000000000 },
        { level: 2, win: 400000000, sum: 40000000000 },
        { level: 3, win: 900000000, sum: 90000000000 },
        { level: 4, win: 1600000000, sum: 160000000000 },
        { level: 5, win: 2500000000, sum: 250000000000 },
        { level: 6, win: 3600000000, sum: 360000000000 },
        { level: 7, win: 4900000000, sum: 490000000000 },
        { level: 8, win: 6400000000, sum: 640000000000 },
        { level: 9, win: 8100000000, sum: 810000000000 },
        { level: 10, win: 10000000000, sum: 1000000000000 },
        { level: 11, win: 12100000000, sum: 1210000000000 },
        { level: 12, win: 14400000000, sum: 1440000000000 },
        { level: 13, win: 16900000000, sum: 1690000000000 },
        { level: 14, win: 19600000000, sum: 1960000000000 },
        { level: 15, win: 22500000000, sum: 2250000000000 },
        { level: 16, win: 25600000000, sum: 2560000000000 },
        { level: 17, win: 28900000000, sum: 2890000000000 },
        { level: 18, win: 32400000000, sum: 3240000000000 },
        { level: 19, win: 36100000000, sum: 3610000000000 },
        { level: 20, win: 40000000000, sum: 4000000000000 },
        { level: 21, win: 44100000000, sum: 4410000000000 },
        { level: 22, win: 48400000000, sum: 4840000000000 },
        { level: 23, win: 52900000000, sum: 5290000000000 },
        { level: 24, win: 57600000000, sum: 5760000000000 },
        { level: 25, win: 62500000000, sum: 6250000000000 },
        { level: 26, win: 67600000000, sum: 6760000000000 },
        { level: 27, win: 72900000000, sum: 7290000000000 },
        { level: 28, win: 78400000000, sum: 7840000000000 },
    ],

    // 获得等级值
    GetCrownLevel: function (level) {
        if (typeof level !== 'number') return;
        if (level >= this.CROWN_LEVEL.length) return;
        return this.CROWN_LEVEL[level];
    },

    // 等级是否跃升
    CrownLevelCanUp: function (level, win, sum) {
        if (typeof level !== 'number') return false;
        if (typeof win !== 'number') return false;
        if (typeof sum !== 'number') return false;

        let nextLevel = level + 1;
        if (nextLevel >= this.CROWN_LEVEL.length) return false;

        if (win >= this.CROWN_LEVEL[nextLevel].win) return true;
        if (sum >= this.CROWN_LEVEL[nextLevel].sum) return true;
        return false;
    },
};

module.exports = constant;
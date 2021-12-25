// --------------------------------------------------------
// 游戏大厅所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'lobby.log',
        consoleLevel: 'debug',
        fileLevel: 'info',
    },
    lobby: {
        id: 1,
        name: '游戏大厅',
    },
    reward: {
        statciADMaxTimes: 20, // 静态广告最大领奖次数
        statciADMinCoin: 100000000, // 静态广告领奖最小金额
        statciADMaxCoin: 200000000, // 静态广告领奖最大金额

        animateADMaxTimes: 20, // 动态广告最大领奖次数
        animateADMinCoin: 100000000, // 动态广告领奖最小金额
        animateADMaxCoin: 200000000, // 动态广告领奖最大金额

        shareGameMaxTimes: 20, // 分享游戏最大领奖次数
        shareGameMinCoin: 100000000, // 分享游戏领奖最小金额
        shareGameMaxCoin: 200000000, // 分享游戏领奖最大金额
    },
    signin: {
        interval: 3600, // 签到领奖间隔时间(秒)
        awardMinCoin: 50000000, // 签到领奖最小金额
        awardMaxCoin: 200000000, // 签到领奖最大金额
        pauseHeadHour: 1, // 签到暂停头部时间
        pauseTailHour: 8, // 签到暂停尾部时间（pauseHeadHour<=小时<pauseTailHour暂停签到）
    },
    connserver: [
        { id: 1, name: '1号ConnClient', address: 'ws://192.168.1.6:1964' },
    ],
    dbserver: {
        name: 'DBClient',
        address: 'ws://192.168.1.6:1965'
    },
    dbredis: {
        name: 'DBRedis',
        host: '192.168.1.11',
        port: 6379,
        password: '3.141592653589793',
        dbnum: 2,
    },
    gmredis: {
        name: 'GMRedis',
        host: '192.168.1.11',
        port: 6379,
        password: '3.141592653589793',
        dbnum: 3,
    },
    rkredis: {
        name: 'RKRedis',
        host: '192.168.1.11',
        port: 6379,
        password: '3.141592653589793',
        dbnum: 4,
    },
};

module.exports = config;
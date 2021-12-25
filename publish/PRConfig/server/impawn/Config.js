// --------------------------------------------------------
// 押分所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'impawn.log',
        consoleLevel: 'verbose',
        fileLevel: 'info',
    },
    impawn: {
        id: 2,
        name: '二三押分',

        headHour: 1, // 游戏进行配置头部时间（0-23）
        tailHour: 8, // 游戏进行配置尾部时间（0-23），与headHour相等则不暂停
        isPause: true, // headHour<=当前小时<tailHour时间段，true暂停游戏，其他时间段进行游戏；false进行游戏，其他时间段暂停游戏

        waitStartTime: 5000, // 等待开始时长
        startingTime: 50000, // 游戏进行时长
        waitEndTime: 2000, // 等待结束时长
    },
    connserver: [
        { id: 1, name: '1号ConnClient', address: 'wss://www.37jj.net:1964' },
    ],
    dbredis: {
        name: 'DBRedis',
        host: '127.0.0.1',
        port: 6379,
        password: '3.141592653589793@Redis',
        dbnum: 2,
    },
    gmredis: {
        name: 'GMRedis',
        host: '127.0.0.1',
        port: 6379,
        password: '3.141592653589793@Redis',
        dbnum: 3,
    },
    rkredis: {
        name: 'RKRedis',
        host: '127.0.0.1',
        port: 6379,
        password: '3.141592653589793@Redis',
        dbnum: 4,
    },
};

module.exports = config;
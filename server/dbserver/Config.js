// --------------------------------------------------------
// 世界服务器所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'dbserver.log',
        consoleLevel: 'debug',
        fileLevel: 'info',
    },
    dbserver: {
        host: '192.168.1.6',
        port: 1965,
    },
    database: {
        host: '192.168.1.11',
        port: 3306,
        db: '23Guess',
        readNum: 1,
        userRead: 'root',
        passwordRead: '3.141592653589793',
        writeNum: 1,
        userWrite: 'root',
        passwordWrite: '3.141592653589793',
    },
    redis: {
        name: 'DBRedis',
        host: '192.168.1.11',
        port: 6379,
        password: '3.141592653589793',
        dbnum: 2,
    }
};

module.exports = config;
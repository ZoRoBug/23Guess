// --------------------------------------------------------
// 世界服务器所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'dbserver.log',
        consoleLevel: 'verbose',
        fileLevel: 'info',
    },
    dbserver: {
        host: '127.0.0.1',
        port: 1965,
    },
    database: {
        host: '127.0.0.1',
        port: 3306,
        db: '23Guess',
        readNum: 1,
        userRead: 'user_read',
        passwordRead: '3.141592653589793@MariaDB-Read',
        writeNum: 1,
        userWrite: 'user_write',
        passwordWrite: '3.141592653589793@MariaDB-Write',
    },
    redis: {
        name: 'DBRedis',
        host: '127.0.0.1',
        port: 6379,
        password: '3.141592653589793@Redis',
        dbnum: 2,
    }
};

module.exports = config;
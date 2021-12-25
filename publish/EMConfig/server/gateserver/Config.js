// --------------------------------------------------------
// 网关服务器所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'gateserver.log',
        consoleLevel: 'verbose',
        fileLevel: 'info',
    },
    gateserver: {
        host: '192.168.1.14',
        port: 1963,
    },
    distribute: {
        retainTime: 70000, // 保留分配服务器时长
    }
};

module.exports = config;
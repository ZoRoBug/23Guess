// --------------------------------------------------------
// 链接服务器所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'connserver.log',
        consoleLevel: 'debug',
        fileLevel: 'info',
    },
    connserver: {
        id: 1,
        host: '192.168.1.6',
        port: 1964,
        maxPlayer: 2000,
        overPlayer: 2200,
        address: 'ws://192.168.1.6:1964'
    },
    gateserver: {
        name: 'GateClient',
        address: 'ws://192.168.1.6:1963'
    },
};

module.exports = config;
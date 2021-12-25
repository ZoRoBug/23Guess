// --------------------------------------------------------
// 链接服务器所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'connserver.log',
        consoleLevel: 'verbose',
        fileLevel: 'info',
    },
    connserver: {
        id: 1,
        host: '172.27.0.12',
        port: 1964,
        maxPlayer: 2000,
        overPlayer: 2200,
        address: 'wss://www.37jj.net:1964',
        ssl: {
            keyFilePath: './SSL.key',
            pemFilePath: './SSL.pem'
        }
    },
    gateserver: {
        name: 'GateClient',
        address: 'wss://www.37jj.net:1963'
    },
};

module.exports = config;
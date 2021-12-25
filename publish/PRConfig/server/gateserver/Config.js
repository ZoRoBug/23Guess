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
        host: '172.27.0.12',
        port: 1963,
        ssl: {
            keyFilePath: './SSL.key',
            pemFilePath: './SSL.pem'
        }
    },
    distribute: {
        retainTime: 70000, // 保留分配服务器时长
    }
};

module.exports = config;
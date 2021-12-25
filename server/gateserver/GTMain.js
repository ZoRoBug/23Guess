// --------------------------------------------------------
// 网关服务器入口
// --------------------------------------------------------
// 主要功能：
// （1）负载均衡链接服务器
// --------------------------------------------------------
"use strict";
require('../../public/Remould');
const config = require('./Config');
const order = require('../../public/Order');
global.g_log = require('../../public/Log');
global.g_balance = require('./Balance');
global.g_handler = require('./Handler');
global.g_gateserver = require('./GateServer');

// 初始命令
order.Init();

// 初始日志生成器
g_log.Init(config.log);

// 初始网关服务器
g_gateserver.Init();

// 初始消息处理器
g_handler.Init();

// 初始负载均衡
g_balance.Init();

// 注册执行命令
order.Register('eval', '执行代码', function (cmds) {
    try { eval(cmds[0]); }
    catch (err) { console.log(err); }
});

// 捕获程序异常
process.on('uncaughtException', function (err) {
    g_log.Error(err.stack);
    process.emit('SIGINT');
});

// 捕获退出信号
process.on('SIGINT', function () {
    g_log.Info('等待各模块释放完成...');
    g_balance.Uninit();
    g_handler.Uninit();
    g_gateserver.Uninit();
    setTimeout(function () {
        g_log.Info('释放完成，正在结束服务...');
        g_log.Uninit();
        order.Uninit();
        process.exit();
    }, 3000);
});
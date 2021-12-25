"use strict";
require('../../public/Remould');
const config = require('./Config');
const order = require('../../public/Order');
global.g_log = require('../../public/Log');
global.g_login = require('./Login');
global.g_handler = require('./Handler');
global.g_impawn = require('./Impawn');

// 初始命令
order.Init();

// 初始日志生成器
g_log.Init(config.log);

// 初始登录管理器
g_login.Init();

// 初始押分管理器
g_impawn.Init();

// 初始消息处理器
g_handler.Init();

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
    g_handler.Uninit();
    g_impawn.Uninit();
    g_login.Uninit();
    setTimeout(function () {
        g_log.Info('释放完成，正在结束服务...');
        g_log.Uninit();
        order.Uninit();
        process.exit();
    }, 3000);
});
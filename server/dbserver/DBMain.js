// --------------------------------------------------------
// 数据库服务器入口
// --------------------------------------------------------
// 主要功能：
// （1）登录登出流程
// （2）玩家数据落地
// （3）日志记录落地
// --------------------------------------------------------
"use strict";
require('../../public/Remould');
const config = require('./Config');
const order = require('../../public/Order');
const Redis = require('../common/Redis');
global.g_log = require('../../public/Log');
global.g_dbserver = require('./DBServer');
global.g_database = require('./Database');
global.g_handler = require('./Handler');
global.g_dbredis = new Redis();

// 初始命令
order.Init();

// 初始日志生成器
g_log.Init(config.log);

// 初始内存存储器
g_dbredis.Init(config.redis);

// 初始数据库存储器
g_database.Init();

// 初始数据库服务器
g_dbserver.Init();

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
    g_dbserver.Uninit();
    g_database.Uninit();
    g_dbredis.Uninit();
    setTimeout(function () {
        g_log.Info('释放完成，正在结束服务...');
        g_log.Uninit();
        order.Uninit();
        process.exit();
    }, 3000);
});

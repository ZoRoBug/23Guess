// --------------------------------------------------------
// Redis功能封装
// --------------------------------------------------------
// owner可实现以下回调函数接受信息：
// （1）RedisCLose 链接已关闭
// --------------------------------------------------------
"use strict";
const log = require('./Log');
const redis = require('redis');

function Title() {
    return '【RDS】' + this.client.address;
}

function RedisDB(owner, host, port, password) {
    this.owner = owner;

    this.client = redis.createClient(port, host, {
        detect_buffers: true, no_ready_check: true
    });
    if (password) this.client.auth(password);

    this.client.on('connect', function () {
        log.Info('%s链接已建立', Title.call(this));
    }.bind(this));

    this.client.on('error', function (err) {
        log.Error('%s出现错误：%s', Title.call(this), err);
    }.bind(this));

    this.client.on('warning', function (warn) {
        log.Warn('%s出现警告：%s', Title.call(this), warn);
    }.bind(this));

    this.client.on('end', function () {
        log.Info('%s链接已关闭', Title.call(this));
        if (this.owner && typeof this.owner.RedisCLose === 'function') {
            this.owner.RedisCLose(this);
        }
    }.bind(this));

    this.client.on('reconnecting', function () {
        log.Info('%s正在主动重连', Title.call(this));
    }.bind(this));
}

RedisDB.prototype.Raw = function () {
    return this.client;
}

RedisDB.prototype.IsConnected = function () {
    return this.client.connected;
}

RedisDB.prototype.Close = function () {
    log.Debug('%s链接准备关闭', Title.call(this));
    this.client.quit();
}

module.exports = RedisDB;
// --------------------------------------------------------
// 数据库Redis存储器
// --------------------------------------------------------
// Watch会缓存为队列，上个Watch主动Unwatch或执行Multi操作后，
// 才会执行下一个Watch。此策略是为了避免多个Watch同时执行时，
// 一个流程进行Unwatch，其他Watch则失效的问题。
// --------------------------------------------------------
"use strict";
const RedisDB = require('../../public/RedisDB');

function CreateRedis(cfg) {
    let client = new RedisDB(this, cfg.host, cfg.port, cfg.password);
    client.Raw().SELECT(cfg.dbnum ? cfg.dbnum : 0);
    return client;
}

function DoWatch() {
    if (this.isWatch || this.watchList.length === 0) return;
    let watch = this.watchList.shift();
    this.client.Raw().WATCH(watch.keys, watch.callback);
    this.isWatch = true;
}

function Redis() {
}

Redis.prototype.Init = function (cfg) {
    this.config = cfg;
    this.isWatch = false;
    this.watchList = new Array();
    this.client = CreateRedis.call(this, this.config);
}

Redis.prototype.Uninit = function () {
    this.client.Close();
    this.watchList = [];
    this.isUninit = true;
    clearTimeout(this.timerRecreate);
}

Redis.prototype.Unwatch = function () {
    this.client.Raw().UNWATCH();
    this.isWatch = false;
    DoWatch.call(this);
}

Redis.prototype.Watch = function (keys, callback) {
    this.watchList.push({ keys: keys, callback: callback });
    DoWatch.call(this);
}

Redis.prototype.Multi = function (cmds, callback) {
    if (typeof callback === 'function') {
        this.client.Raw().MULTI(cmds).EXEC(function (err, replies) {
            this.Unwatch();
            callback(err, replies);
        }.bind(this));
    } else {
        return new Promise(function (resolve) {
            this.client.Raw().MULTI(cmds).EXEC(function (err, replies) {
                this.Unwatch();
                resolve(err ? null : (replies !== null));
                if (err) g_log.Error(err);
            }.bind(this));
        }.bind(this));
    }
}

Redis.prototype.Batch = function (cmds, callback) {
    if (typeof callback === 'function') {
        this.client.Raw().BATCH(cmds).EXEC(callback);
    } else {
        return new Promise(function (resolve) {
            this.client.Raw().BATCH(cmds).EXEC(function (err, replies) {
                resolve(err ? null : replies);
                if (err) g_log.Error(err);
            });
        }.bind(this));
    }
}

Redis.prototype.RedisCLose = function () {
    if (!this.isUninit) {
        if (this.timerRecreate) {
            g_log.Info('【RDS】%s正在新建链接...', this.config.name);
            return;
        }
        this.timerRecreate = setTimeout(function () {
            this.timerRecreate = null;
            if (this.client.IsConnected()) return;
            this.client.Close();
            g_log.Info('【RDS】%s放弃自动重连改为手动重连...', this.config.name);
            this.client = CreateRedis.call(this, this.config);
        }.bind(this), 3000);
    }
}

module.exports = Redis;
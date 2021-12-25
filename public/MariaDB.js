// --------------------------------------------------------
// MariaDB功能封装
// --------------------------------------------------------
// owner可实现以下回调函数接受信息：
// （1）DBReady 数据库链接准备就绪
// （2）DBCLose 数据库链接已关闭
// --------------------------------------------------------
"use strict";
const log = require('./Log');
const MariaSql = require('mariasql');

function Title() {
    let strAuth = this.IsOnlyRead() ? '只读' : '读写';
    return '【MDB】' + this.user + strAuth + this.address;
}

function MariaDB(owner, host, port, user, password, db, onlyRead) {
    this.user = user, this.owner = owner, this.onlyRead = onlyRead;
    this.address = host + ':' + port;

    this.client = new MariaSql({
        host: host, port: port, user: user,
        password: password, db: db, charset: 'utf8'
    });

    this.client.on('error', function (err) {
        log.Error('%s链接出错：%s', Title.call(this), err);
    }.bind(this));

    this.client.on('ready', function () {
        log.Info('%s链接已就绪', Title.call(this));
        if (this.owner && typeof this.owner.DBReady === 'function') {
            this.owner.DBReady(this);
        }
    }.bind(this));

    this.client.on('close', function () {
        log.Info('%s链接已关闭', Title.call(this));
        if (this.owner && typeof this.owner.DBClose === 'function') {
            this.owner.DBClose(this);
        }
    }.bind(this));

    this.Query('select now();', function () { });
}

MariaDB.prototype.IsOnlyRead = function () {
    return this.onlyRead;
}

MariaDB.prototype.IsConnected = function () {
    return this.client.connected;
}

MariaDB.prototype.IsConnecting = function () {
    return this.client.connecting;
}

MariaDB.prototype.Close = function () {
    log.Debug('%s链接准备关闭', Title.call(this));
    this.client.end();
}

MariaDB.prototype.Query = function (sql, callback) {
    this.client.query(sql, callback);
}

module.exports = MariaDB;
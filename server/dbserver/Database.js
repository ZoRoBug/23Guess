// --------------------------------------------------------
// MariaDB数据库管理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const MariaDB = require('../../public/MariaDB');
const cfg = require('./Config').database;

function CreateReadDB() {
    return new MariaDB(this, cfg.host, cfg.port,
        cfg.userRead, cfg.passwordRead, cfg.db, true);
}

function CreateWriteDB() {
    return new MariaDB(this, cfg.host, cfg.port,
        cfg.userWrite, cfg.passwordWrite, cfg.db, false);
}

const database = {
    Init: function () {
        this.dbList = new Map();
        for (let i = 0; i < cfg.readNum; ++i) {
            this.dbList.set(CreateReadDB.call(this), false);
        }
        for (let i = 0; i < cfg.writeNum; ++i) {
            this.dbList.set(CreateWriteDB.call(this), false);
        }
    },

    Uninit: function () {
        this.isUninit = true;
        clearTimeout(this.timerRecreate);
        for (let db of this.dbList.keys()) db.Close();
    },

    DBReady: function () {
        for (let db of this.dbList.keys()) {
            if (!db.IsConnected()) return;
        }
        g_log.Info('【MDB】所有数据库已链接完成');
    },

    DBClose: function (client) {
        if (this.isUninit) {
            for (let db of this.dbList.keys()) {
                if (db.IsConnected() || db.IsConnecting()) return;
            }
            g_log.Info('【MDB】所有数据库已关闭完成');
        } else {
            if (!this.dbList.has(client)) {
                g_log.Warn('【MDB】未发现已关闭的链接');
                return;
            }
            if (this.dbList.get(client)) {
                g_log.Info('【MDB】正在进行新建链接');
                return;
            }
            this.dbList.set(client, true);
            this.timerRecreate = setTimeout(function () {
                g_log.Info('【MDB】意外断开则新建链接...');
                this.dbList.set(client.IsOnlyRead() ?
                    CreateReadDB.call(this) : CreateWriteDB.call(this), false);
                this.dbList.delete(client);
            }.bind(this), 3000);
        }
    },

    Query: function (sql, isWrite, callback) {
        let dbQuery = null;
        for (let db of this.dbList.keys()) {
            if (isWrite === db.IsOnlyRead()) continue;
            if (!db.sqlNum) { db.sqlNum = 0; dbQuery = db; break; }
            if (dbQuery == null || dbQuery.sqlNum > db.sqlNum) dbQuery = db;
        }

        if (dbQuery === null) {
            let value = isWrite ? '读写' : '只读';
            g_log.Error('【MDB】未找到合适的%s数据库链接', value);
            return;
        }

        dbQuery.sqlNum++;
        if (typeof callback === 'function') {
            dbQuery.Query(sql, function () {
                callback.apply(dbQuery, arguments);
                dbQuery.sqlNum--;
            });
        } else {
            return new Promise(function (resolve) {
                dbQuery.Query(sql, function (err, rows) {
                    dbQuery.sqlNum--;
                    resolve(err ? null : rows);
                    if (err) g_log.Error(err);
                });
            });
        }
    },
};

module.exports = database;
// --------------------------------------------------------
// 消息&事件处理器
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const protocol = require('../../protocol/protocol');
const MSG_LOGIN_CLDB = require('../../protocol/MSG_LOGIN_CLDB')['MSG_LOGIN_CLDB'];
const MSG_LOGIN_DBCL = require('../../protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];
const MSG_RANK_CLDB = require('../../protocol/MSG_RANK_CLDB')['MSG_RANK_CLDB'];
const MSG_RANK_DBCL = require('../../protocol/MSG_RANK_DBCL')['MSG_RANK_DBCL'];

const SYNC_DATA_CYCLE_TIME = 5; // 同步数据循环时间ms

const handler = {
    Init: function () {
        this.OpenPlayerDetailTimer();
        g_dbserver.on('MSG_LOGIN_CLDB', OnLoginMsg);
        g_dbserver.on('MSG_RANK_CLDB', OnRankMsg);
    },

    Uninit: function () {
        this.isUninit = true;
        clearTimeout(this.timerPlayerDetail);
    },

    SendLoginMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_LOGIN_DBCL');
        client.Send(MSG_LOGIN_DBCL.encode(msg).finish());
    },

    SendRankMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_RANK_DBCL');
        client.Send(MSG_RANK_DBCL.encode(msg).finish());
    },

    OpenPlayerDetailTimer: function () {
        if (this.isUninit) return;
        clearTimeout(this.timerPlayerDetail);
        this.timerPlayerDetail = setTimeout(async function () {
            let replys = await g_dbredis.Batch([['HKEYS', 'player_detail']]);
            if (replys === null) {
                handler.OpenPlayerDetailTimer();
                return;
            }
            let keys = replys[0];
            if (keys.length === 0) {
                handler.OpenPlayerDetailTimer();
                return;
            }
            let hkey = keys[Math.randomnum(0, keys.length - 1)];
            replys = await g_dbredis.Batch([['HGET', 'player_detail', Buffer.from(hkey)]]);
            if (replys === null) {
                handler.OpenPlayerDetailTimer();
                return;
            }
            if (replys[0] === null) {
                handler.OpenPlayerDetailTimer();
                return;
            }
            let strPropID = '', strPropCount = '';
            let detail = MSG_LOGIN_DBCL.decode(replys[0]);
            for (let i = 0, len = detail.propList.length; i < len; ++i) {
                strPropID = strPropID + detail.propList[i].id + ',';
                strPropCount = strPropCount + detail.propList[i].count + ',';
            }
            let sql = 'CALL 23Guess.`sp_update_player`(%s, \'%s\', \'%s\', %s, %s, %s);';
            sql = sql.replace('%s', detail.pi.pid);
            sql = sql.replace('%s', strPropID);
            sql = sql.replace('%s', strPropCount);
            sql = sql.replace('%s', detail.pi.level);
            sql = sql.replace('%s', detail.pi.winLoss);
            sql = sql.replace('%s', detail.pi.coinSum);
            let rows = await g_database.Query(sql, true);
            if (rows === null) {
                handler.OpenPlayerDetailTimer();
                return;
            };
            if (rows[0][0].return !== '0') {
                g_log.Error('%s return %s', sql, rows[0][0].return);
                handler.OpenPlayerDetailTimer();
                return;
            }
            await g_dbredis.Batch([['HDEL', 'player_detail', hkey]]);
            handler.OpenPlayerDetailTimer();
        }, SYNC_DATA_CYCLE_TIME);
    },
};

async function OnLoginMsg(client, data) {
    let msg = MSG_LOGIN_CLDB.decode(data);
    let replys = await g_dbredis.Batch([['HGET', 'player_detail', Buffer.from(msg.account)]]);
    if (replys === null) {
        handler.SendLoginMsg(client, {
            result: MSG_LOGIN_DBCL.Result.REDIS_GET_ERROR,
            loginID: msg.loginID
        });
        return;
    }
    if (replys[0] !== null) {
        let msgOut = MSG_LOGIN_DBCL.decode(replys[0]);
        msgOut.pi.head = msg.head;
        msgOut.loginID = msg.loginID;
        msgOut.wxSessionKey = msg.wxSessionKey;
        msgOut.result = MSG_LOGIN_DBCL.Result.SUCCESS;
        handler.SendLoginMsg(client, msgOut);
        return;
    }
    let sql = 'CALL 23Guess.`sp_login`(\'%s\', \'%s\', \'%s\', %s);';
    sql = sql.replace('%s', msg.account);
    sql = sql.replace('%s', msg.nickname);
    sql = sql.replace('%s', msg.password);
    sql = sql.replace('%s', msg.platform);
    let rows = await g_database.Query(sql, true);
    if (rows === null) {
        handler.SendLoginMsg(client, {
            result: MSG_LOGIN_DBCL.Result.MARIADB_QUERY_ERROR,
            loginID: msg.loginID
        });
        return;
    };
    let pi = null, propList = new Array();
    let result = Number(rows[0][0].return);
    if (result === MSG_LOGIN_DBCL.Result.SUCCESS) {
        pi = {
            pid: Number(rows[1][0].pid),
            account: rows[1][0].account,
            nickname: rows[1][0].nickname,
            password: rows[1][0].password,
            platform: Number(rows[1][0].platform),
            level: Number(rows[1][0].level),
            winLoss: Number(rows[1][0].win_loss),
            coinSum: Number(rows[1][0].coin_sum),
            head: msg.head,
        };
        for (let i = 0; i < rows[2].info.numRows; ++i) {
            propList.push({
                id: Number(rows[2][i].prop_id),
                count: Number(rows[2][i].prop_count)
            });
        }
    }
    handler.SendLoginMsg(client, {
        result: result,
        loginID: msg.loginID,
        wxSessionKey: msg.wxSessionKey,
        pi: pi, propList: propList
    });
}

function OnRankMsg(client, data) {
    let msg = MSG_RANK_CLDB.decode(data);
    if (msg.rankList.length === 0) {
        handler.SendRankMsg(client, msg);
        return;
    }
    let strPID = '';
    let pidRankList = new Array();
    for (let i = 0, len = msg.rankList.length; i < len; ++i) {
        strPID = strPID + msg.rankList[i].pid;
        if (i < len - 1) strPID = strPID + ',';
        pidRankList[msg.rankList[i].pid] = msg.rankList[i];
    }
    let sql = 'CALL 23Guess.`sp_query_player`(\'%s\');';
    sql = sql.replace('%s', strPID);
    g_database.Query(sql, false, function (err, rows) {
        if (err) {
            g_log.Error(err);
            handler.SendRankMsg(client, msg);
            return;
        }
        msg.rankList = new Array();
        for (let i = 0; i < rows[0].info.numRows; ++i) {
            let pid = Number(rows[0][i].pid);
            pidRankList[pid].nickname = rows[0][i].nickname;
            msg.rankList.push(pidRankList[pid]);
        }
        handler.SendRankMsg(client, msg);
    });
}

module.exports = handler;
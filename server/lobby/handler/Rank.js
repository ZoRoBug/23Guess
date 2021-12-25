// --------------------------------------------------------
// 排行榜相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const sconfig = require('../../common/SConfig');
const common = require('../../../protocol/Common');
const protocol = require('../../../protocol/protocol');
const MSG_RANK_CLDB = require('../../../protocol/MSG_RANK_CLDB')['MSG_RANK_CLDB'];
const MSG_RANK_DBCL = require('../../../protocol/MSG_RANK_DBCL')['MSG_RANK_DBCL'];

function SendRankMsg(msg) {
    msg.msgID = protocol.GetMsgId('MSG_RANK_DBCL');
    g_cnclients.Send(MSG_RANK_DBCL.encode(msg).finish());
}

function GetRankName(rankType) {
    if (rankType === common.RankType.UNIVERSE_CROWN) {
        return sconfig.rankCrown;
    } else if (rankType === common.RankType.YESTERDAY_WINNER) {
        return sconfig.rankYDWinner;
    }
}

g_cnclients.on('MSG_RANK_CLDB', function (client, data) {
    let msg = MSG_RANK_CLDB.decode(data);
    let rankName = GetRankName(msg.rankType);
    if (!rankName) return;
    let endPos = msg.startPos + msg.count;
    g_rkredis.Batch([
        ['ZRANGE', rankName, msg.startPos, endPos, 'WITHSCORES']
    ], function (err, replies) {
        if (err) {
            g_log.Error(err);
            SendRankMsg(msg);
            return;
        }
        msg.rankList = new Array();
        for (let i = 0; i < replies[0].length; i = i + 2) {
            let rank = { pid: Number(replies[0][i]) };
            if (msg.rankType === common.RankType.UNIVERSE_CROWN) {
                rank.level = -Number(replies[0][i + 1]);
            } else if (msg.rankType === common.RankType.YESTERDAY_WINNER) {
                rank.coinWin = -Number(replies[0][i + 1]);
            }
            msg.rankList.push(rank);
        }
        g_dbclient.Send(MSG_RANK_CLDB.encode(msg).finish());
    });
});

g_dbclient.on('MSG_RANK_DBCL', function (client, data) {
    let msg = MSG_RANK_DBCL.decode(data);
    let rankName = GetRankName(msg.rankType);
    if (!rankName) return;
    g_rkredis.Batch([
        ['ZRANK', rankName, msg.pid]
    ], function (err, replies) {
        if (err) {
            g_log.Error(err);
            SendRankMsg(msg);
            return;
        }
        if (replies[0] !== null) msg.selfRank = replies[0] + 1;
        SendRankMsg(msg);
    });
});
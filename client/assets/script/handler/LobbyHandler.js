"use strict";
const common = require('../protocol/Common');
const protocol = require('../protocol/Protocol');
const MSG_REFUND_GMCL = require('../protocol/MSG_REFUND_GMCL')['MSG_REFUND_GMCL'];
const MSG_SIGNIN_CLLB = require('../protocol/MSG_SIGNIN_CLLB')['MSG_SIGNIN_CLLB'];
const MSG_SIGNIN_LBCL = require('../protocol/MSG_SIGNIN_LBCL')['MSG_SIGNIN_LBCL'];
const MSG_RANK_CLDB = require('../protocol/MSG_RANK_CLDB')['MSG_RANK_CLDB'];
const MSG_RANK_DBCL = require('../protocol/MSG_RANK_DBCL')['MSG_RANK_DBCL'];

g_handler.SendSigninMsg = function (client) {
    client.Send(MSG_SIGNIN_CLLB.encode({
        msgID: protocol.GetMsgId('MSG_SIGNIN_CLLB')
    }).finish());
}

g_handler.SendRankMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_RANK_CLDB');
    client.Send(MSG_RANK_CLDB.encode(msg).finish());
}

g_connclient.on('MSG_REFUND_GMCL', function (data) {
    let msg = MSG_REFUND_GMCL.decode(data);
    msg.coin = Number(msg.coin);
    g_uiemitter.emit('UI_REFUND', msg);
});

g_connclient.on('MSG_SIGNIN_LBCL', function (data) {
    let msg = MSG_SIGNIN_LBCL.decode(data);
    msg.coin = Number(msg.coin);
    if (msg.result === MSG_SIGNIN_LBCL.Result.SUCCESS) {
        g_player.UpdateProp(common.PropID.COIN, msg.coin);
    }
    g_uiemitter.emit('UI_SIGNIN', msg);
});

g_connclient.on('MSG_RANK_DBCL', function (data) {
    let msg = MSG_RANK_DBCL.decode(data);
    g_uiemitter.emit('UI_RANK', msg);
});
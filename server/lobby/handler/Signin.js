// --------------------------------------------------------
// 签到相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const config = require('../Config');
const common = require('../../../protocol/Common');
const protocol = require('../../../protocol/protocol');
const MSG_SIGNIN_CLLB = require('../../../protocol/MSG_SIGNIN_CLLB')['MSG_SIGNIN_CLLB'];
const MSG_SIGNIN_LBCL = require('../../../protocol/MSG_SIGNIN_LBCL')['MSG_SIGNIN_LBCL'];

function GetSigninKey(pid) {
    return 'SIGNIN_TIMESTAMP' + String(pid);
}

function SendSigninMsg(msg) {
    msg.msgID = protocol.GetMsgId('MSG_SIGNIN_LBCL');
    g_cnclients.Send(MSG_SIGNIN_LBCL.encode(msg).finish());
}

g_cnclients.on('MSG_SIGNIN_CLLB', function (client, data) {
    let msg = MSG_SIGNIN_CLLB.decode(data);
    let pKey = g_player.GetKey(msg.pid);
    let sKey = GetSigninKey(msg.pid);
    g_gmredis.Watch([pKey, sKey], async function (err) {
        if (err) {
            msg.result = MSG_SIGNIN_LBCL.Result.REDIS_ERROR;
            SendSigninMsg(msg);
            g_gmredis.Unwatch();
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(msg.pid, [
            ['EXISTS'],
            ['HGET', common.PropID.COIN]
        ]);
        cmds.push(['TTL', sKey]);
        cmds.push(['KEYS', g_withhold.GetKey(msg.pid, common.Location.IMPAWN) + '*']);
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            msg.result = MSG_SIGNIN_LBCL.Result.REDIS_ERROR;
            SendSigninMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let playerExist = (replies[0] === 1);
        if (!playerExist) {
            msg.result = MSG_SIGNIN_LBCL.Result.PLAYER_OFFLINE;
            SendSigninMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let remainTime = replies[2];
        if (remainTime > 0) {
            msg.remainTime = remainTime;
            msg.result = MSG_SIGNIN_LBCL.Result.NO_TIME_TO;
            SendSigninMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let onImpawn = (replies[3].length > 0);
        if (onImpawn) {
            msg.result = MSG_SIGNIN_LBCL.Result.ON_IMPAWN;
            SendSigninMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let nowTime = new Date();
        let nowHour = nowTime.getHours();
        let headHour = config.signin.pauseHeadHour;
        let tailHour = config.signin.pauseTailHour;
        let interval = config.signin.interval;
        if (nowHour >= headHour && nowHour < tailHour) {
            let signinTime = new Date();
            signinTime.setHours(tailHour);
            signinTime.setMinutes(0);
            signinTime.setSeconds(0);
            signinTime.setMilliseconds(0);
            interval = signinTime.getTime() - nowTime.getTime();
            interval = Math.ceil(interval / 1000);
        }

        let minCoin = config.signin.awardMinCoin;
        let maxCoin = config.signin.awardMaxCoin;
        let awardCoin = Math.randomnum(minCoin, maxCoin);
        awardCoin = awardCoin - awardCoin % 1000;
        let coin = replies[1] ? Number(replies[1]) : 0;
        cmds = g_player.FillCmd(msg.pid, [
            ['HSET', common.PropID.COIN, coin + awardCoin]
        ]);
        cmds.push(['SET', sKey, 1]);
        cmds.push(['EXPIRE', sKey, interval]);
        let result = await g_gmredis.Multi(cmds);
        if (!result) {
            msg.result = MSG_SIGNIN_LBCL.Result.REDIS_ERROR;
            SendSigninMsg(msg);
            return;
        }

        msg.coin = awardCoin;
        msg.remainTime = interval;
        msg.result = MSG_SIGNIN_LBCL.Result.SUCCESS;
        SendSigninMsg(msg);
    });
});
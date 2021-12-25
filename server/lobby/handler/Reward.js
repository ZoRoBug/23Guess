// --------------------------------------------------------
// 领奖相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const config = require('../Config');
const common = require('../../../protocol/Common');
const protocol = require('../../../protocol/protocol');
const MSG_REWARD_CLLB = require('../../../protocol/MSG_REWARD_CLLB')['MSG_REWARD_CLLB'];
const MSG_REWARD_LBCL = require('../../../protocol/MSG_REWARD_LBCL')['MSG_REWARD_LBCL'];

function GetRewardCoinTotalKey() {
    return 'REWARD_COIN_TOTAL';
}

function GetRewardTimesTotalKey() {
    return 'REWARD_TIMES_TOTAL';
}

function GetRewardKey(pid, type) {
    return 'REWARD_TIMES' + String(type) + String(pid);
}

function GetRewardTimes(type) {
    if (type === common.AwardType.STATIC_AD) {
        return config.reward.statciADMaxTimes;
    } else if (type === common.AwardType.ANIMATE_AD) {
        return config.reward.animateADMaxTimes;
    } else if (type === common.AwardType.SHARE_GAME) {
        return config.reward.shareGameMaxTimes;
    }
    return 0;
}

function GetAwardCoin(type) {
    let min = 0, max = 0;
    if (type === common.AwardType.STATIC_AD) {
        min = config.reward.statciADMinCoin;
        max = config.reward.statciADMaxCoin;
    } else if (type === common.AwardType.ANIMATE_AD) {
        min = config.reward.animateADMinCoin;
        max = config.reward.animateADMaxCoin;
    } else if (type === common.AwardType.SHARE_GAME) {
        min = config.reward.shareGameMinCoin;
        max = config.reward.shareGameMaxCoin;
    }
    let awardCoin = Math.randomnum(min, max);
    return (awardCoin - awardCoin % 1000);
}

function GetExpireTime () {
    let nowTime = new Date();
    let expireTime = new Date();
    expireTime.setDate(expireTime.getDate() + 1);
    expireTime.setHours(0);
    expireTime.setMinutes(0);
    expireTime.setSeconds(0);
    expireTime.setMilliseconds(0);
    let interval = expireTime.getTime() - nowTime.getTime();
    return Math.ceil(interval / 1000);
}

function SendRewardMsg(msg) {
    msg.msgID = protocol.GetMsgId('MSG_REWARD_LBCL');
    g_cnclients.Send(MSG_REWARD_LBCL.encode(msg).finish());
}

g_cnclients.on('MSG_REWARD_CLLB', function (client, data) {
    let msg = MSG_REWARD_CLLB.decode(data);
    let pKey = g_player.GetKey(msg.pid);
    let rKey = GetRewardKey(msg.pid, msg.awardType);
    g_gmredis.Watch([pKey, rKey], async function (err) {
        if (err) {
            msg.result = MSG_REWARD_LBCL.Result.REDIS_ERROR;
            SendRewardMsg(msg);
            g_gmredis.Unwatch();
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(msg.pid, [
            ['EXISTS'],
            ['HGET', common.PropID.COIN]
        ]);
        cmds.push(['GET', rKey]);
        cmds.push(['KEYS', g_withhold.GetKey(msg.pid, common.Location.IMPAWN) + '*']);
        cmds.push(['GET', GetRewardCoinTotalKey()]);
        cmds.push(['GET', GetRewardTimesTotalKey()]);
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            msg.result = MSG_REWARD_LBCL.Result.REDIS_ERROR;
            SendRewardMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let playerExist = (replies[0] === 1);
        if (!playerExist) {
            msg.result = MSG_REWARD_LBCL.Result.PLAYER_OFFLINE;
            SendRewardMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let rewardTimes = replies[2] ? Number(replies[2]) : 0;
        if (rewardTimes >= GetRewardTimes(msg.awardType)) {
            msg.result = MSG_REWARD_LBCL.Result.OVER_TIMES;
            SendRewardMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let onImpawn = (replies[3].length > 0);
        if (onImpawn) {
            msg.result = MSG_REWARD_LBCL.Result.ON_IMPAWN;
            SendRewardMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let awardCoin = GetAwardCoin(msg.awardType);
        let coin = replies[1] ? Number(replies[1]) : 0;
        let awardCoinTotal = replies[4] ? Number(replies[4]) : 0;
        let awardTimesTotal = replies[5] ? Number(replies[5]) : 0;
        cmds = g_player.FillCmd(msg.pid, [
            ['HSET', common.PropID.COIN, coin + awardCoin]
        ]);
        cmds.push(['SET', rKey, rewardTimes + 1]);
        cmds.push(['EXPIRE', rKey, GetExpireTime()]);
        cmds.push(['SET', GetRewardCoinTotalKey(), awardCoinTotal + awardCoin]);
        cmds.push(['SET', GetRewardTimesTotalKey(), awardTimesTotal + 1]);
        let result = await g_gmredis.Multi(cmds);
        if (!result) {
            msg.result = MSG_REWARD_LBCL.Result.REDIS_ERROR;
            SendRewardMsg(msg);
            return;
        }

        msg.coin = awardCoin;
        msg.result = MSG_REWARD_LBCL.Result.SUCCESS;
        SendRewardMsg(msg);
    });
});
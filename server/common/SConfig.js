// --------------------------------------------------------
// 服务器全局配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    wxAppID: 'wx4a59e7b5ff27ed55', // 小游戏唯一凭证
    wxAppSecret: 'db727c029c4a82fbd10e3ad263c119bb', // 小游戏凭证密钥

    redisMaxRetryTimes: 10, // REDIS最大重试次数

    rankCrown: 'RANK_UNIVERSE_CROWN', // 宇宙皇冠榜redis集合名称
    rankTDWinner: 'RANK_TODAY_WINNER', // 今天吃鸡榜redis集合名称
    rankYDWinner: 'RANK_YESTERDAY_WINNER', // 昨日吃鸡榜redis集合名称
    rankWinnerThansDay: 'RANK_WINNER_THANS_DAY', // 吃鸡榜redis集合转移日期名次
};

module.exports = config;
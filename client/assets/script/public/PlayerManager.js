// --------------------------------------------------------
// 玩家个人信息管理
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const utility = require('./Utility');

let propList = [];
let playerInfo = {};

const player = {
    GetProp: function (id, isFormat) {
        if (typeof id !== 'number') return;
        let count = propList[id] ? propList[id] : 0;
        return isFormat ? utility.SplitStr(count) : count;
    },

    UpdateProp: function (id, count) {
        if (typeof id !== 'number') return;
        if (typeof count !== 'number' || count === 0) return true;
        let oldCount = propList[id] ? propList[id] : 0;
        let newCount = oldCount + count;
        if (newCount < 0) return;
        propList[id] = newCount;
        return true;
    },

    UpdateCoinSum: function (coinSum) {
        if (coinSum === 0) return;
        playerInfo.coinSum += coinSum;
    },

    UpdateWinLoss: function (winLoss) {
        if (winLoss === 0) return;
        playerInfo.winLoss += winLoss;
    },

    UpdateLevel: function (level) {
        if (level <= 0) return;
        playerInfo.level = level;
    },

    SetPropList: function (props) {
        for (let i = 0, len = props.length; i < len; ++i) {
            propList[props[i].id] = Number(props[i].count);
        }
    },

    SetPlayerInfo: function (pi) {
        pi.winLoss = Number(pi.winLoss);
        pi.coinSum = Number(pi.coinSum);
        playerInfo = pi;
    },

    GetPID: function () {
        return playerInfo.pid;
    },

    GetHead: function () {
        return playerInfo.head;
    },

    GetNickname: function () {
        return playerInfo.nickname;
    },

    GetCoinSum: function () {
        return playerInfo.coinSum;
    },

    GetWinLoss: function () {
        return playerInfo.winLoss;
    },

    GetLevel: function () {
        return playerInfo.level;
    }
};

module.exports = player;
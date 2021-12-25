// --------------------------------------------------------
// 楚汉相争信息管理
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const common = require('../protocol/Common');
const constant = require('../protocol/Constant');
const protocol = require('../protocol/Protocol');
const MSG_IMPAWN_GAMEINFO_IMCL = require('../protocol/MSG_IMPAWN_GAMEINFO_IMCL')['MSG_IMPAWN_GAMEINFO_IMCL'];
const MSG_IMPAWN_GAMESTATE_IMCL = require('../protocol/MSG_IMPAWN_GAMESTATE_IMCL')['MSG_IMPAWN_GAMESTATE_IMCL'];

let gameInfo = {};
let gameState = {};

function SortImpawnList(impawn1, impawn2) {
    return impawn2.coinSum - impawn1.coinSum;
}

function ClearGameData() {
    gameInfo = {}, gameState = {};

    gameState.msgID = protocol.GetMsgId('MSG_IMPAWN_GAMESTATE_IMCL');
    gameState = MSG_IMPAWN_GAMESTATE_IMCL.fromObject(gameState);

    gameInfo.msgID = protocol.GetMsgId('MSG_IMPAWN_GAMEINFO_IMCL');
    gameInfo = MSG_IMPAWN_GAMEINFO_IMCL.fromObject(gameInfo);
    gameInfo.twoImpawnTotal = 0, gameInfo.threeImpawnTotal = 0;
    gameInfo.playerTwoImpawnTotal = 0, gameInfo.playerThreeImpawnTotal = 0;
}
ClearGameData();

const impawn = {
    GetGameInfo: function () {
        return gameInfo;
    },

    GetGameState: function () {
        return gameState;
    },

    SetGameInfo: function (info) {
        if (info.pid > 0) {
            gameInfo = info;
        } else {
            gameInfo.twoAwardRate = info.twoAwardRate;
            gameInfo.threeAwardRate = info.threeAwardRate;
            gameInfo.twoImpawnTotal = info.twoImpawnTotal;
            gameInfo.threeImpawnTotal = info.threeImpawnTotal;
            gameInfo.twoPlayerCount = info.twoPlayerCount;
            gameInfo.threePlayerCount = info.threePlayerCount;
        }
    },

    SetGameState: function (info) {
        if (info.state === common.ImpawnState.STARTING) {
            let isTwoWin = this.IsTwoWin();
            if (isTwoWin !== null) {
                gameInfo.recordList.push(isTwoWin);
                isTwoWin ? gameInfo.twoWinRecord++ : gameInfo.threeWinRecord++;
            }
            gameInfo.impawnList = [];
            gameInfo.twoAwardRate = 100, gameInfo.threeAwardRate = 100;
            gameInfo.twoImpawnTotal = 0, gameInfo.threeImpawnTotal = 0;
            gameInfo.twoPlayerCount = 0, gameInfo.threePlayerCount = 0;
            gameInfo.playerTwoImpawnTimes = 0, gameInfo.playerThreeImpawnTimes = 0;
            gameInfo.playerTwoImpawnTotal = 0, gameInfo.playerThreeImpawnTotal = 0;
        }
        gameState = info;
    },

    AddNewImpawn: function (info) {
        if (info.pid === 0) {
            let alreadyImpawn = false;
            for (let i = 0; i < gameInfo.impawnList.length; ++i) {
                let nickname = gameInfo.impawnList[i].nickname;
                if (nickname !== info.nickname) continue;
                gameInfo.impawnList[i] = info;
                alreadyImpawn = true;
                break;
            }
            if (!alreadyImpawn) gameInfo.impawnList.push(info);
            gameInfo.impawnList.sort(SortImpawnList);
        }
        if (g_player.GetPID() === info.pid || g_player.GetNickname() === info.nickname) {
            if (info.isTwo) gameInfo.playerTwoImpawnTotal = info.coinSum;
            if (!info.isTwo) gameInfo.playerThreeImpawnTotal = info.coinSum;
        }
    },

    GetImpawnTimes: function () {
        return gameInfo.playerTwoImpawnTimes + gameInfo.playerThreeImpawnTimes;
    },

    IsTwoWin: function () {
        let twoImpawnTotal = gameInfo.twoImpawnTotal;
        let threeImpawnTotal = gameInfo.threeImpawnTotal;
        return constant.ImpawnResult(twoImpawnTotal, threeImpawnTotal);
    },

    IsStarting: function () {
        return (gameState.state === common.ImpawnState.STARTING);
    },

    IsImpawnTwo: function () {
        if (gameInfo.playerTwoImpawnTimes > 0) return true;
        if (gameInfo.playerThreeImpawnTimes > 0) return false;
        return null;
    },

    ClearData: function () {
        ClearGameData();
    },
};

module.exports = impawn;
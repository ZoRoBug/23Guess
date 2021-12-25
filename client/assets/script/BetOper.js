const config = require('./Config');
const utility = require('./public/Utility');
const common = require('./protocol/Common');
const constant = require('./protocol/Constant');

function UpdateBetBtn() {
    let nodeTwoLeft = this.node.getChildByName('TwoLeftBtn');
    let nodeThreeLeft = this.node.getChildByName('ThreeLeftBtn');
    let nodeTwoRight = this.node.getChildByName('TwoRightBtn');
    let nodeThreeRight = this.node.getChildByName('ThreeRightBtn');

    let isStarting = g_impawn.IsStarting();
    let isImpawnTwo = g_impawn.IsImpawnTwo();
    let twoBtnAlive = (isImpawnTwo === null || isImpawnTwo) && isStarting;
    let threeBtnAlive = (isImpawnTwo === null || !isImpawnTwo) && isStarting;

    nodeTwoLeft.getComponent(cc.Button).interactable = twoBtnAlive;
    nodeThreeLeft.getComponent(cc.Button).interactable = threeBtnAlive;
    nodeTwoRight.getComponent(cc.Button).interactable = twoBtnAlive;
    nodeThreeRight.getComponent(cc.Button).interactable = threeBtnAlive;
}

function UpdateSelfCoin() {
    let coinNode = cc.find('Coin/Sum', this.node);
    let coinLabel = coinNode.getComponent(cc.Label);
    let selfCoin = g_player.GetProp(common.PropID.COIN);
    let strCoin = utility.SplitStr(selfCoin - this.betCoinSum);
    coinLabel.string = '金币：' + strCoin;
}

function UpdateBetSum() {
    UpdateSelfCoin.call(this);
    let betSumNode = cc.find('BetSum/Sum', this.node);
    let betSumLabel = betSumNode.getComponent(cc.Label);
    betSumLabel.string = utility.SplitStr(this.betCoinSum);
    if (this.betOldCoinSum !== this.betCoinSum) {
        this.betOldCoinSum = this.betCoinSum;
        let action1 = cc.scaleTo(0.15, 1.2);
        let action2 = cc.scaleTo(0.12, 1.0);
        betSumNode.runAction(cc.sequence(action1, action2));
    }
}

function ClearBetSum() {
    this.betCoinSum = 0;
    UpdateBetSum.call(this);
}

function OnBtnBet(betSum) {
    cc.audioEngine.play(this.clickAudio, false, 1);
    let selfCoin = g_player.GetProp(common.PropID.COIN);
    let betTotal = betSum + this.betCoinSum;
    betTotal = Math.min(selfCoin, betTotal);
    betTotal = betTotal - betTotal % constant.IMPAWN_MIN_BET_SUM;
    this.betCoinSum = Math.min(betTotal, constant.IMPAWN_MAX_BET_SUM);
    UpdateBetSum.call(this);
}

function Bet(isTwo) {
    let isStarting = g_impawn.IsStarting();
    let isImpawnTwo = g_impawn.IsImpawnTwo();
    if (!isStarting || (isImpawnTwo !== null && isImpawnTwo !== isTwo)) return;

    if (g_impawn.GetImpawnTimes() >= constant.IMPAWN_MAX_BET_TIMES) {
        let tip = '猜分次数不能超过' + constant.IMPAWN_MAX_BET_TIMES + '次';
        g_msgbox.Show(null, tip, g_msgbox.MB_OK);
        return;
    }

    if (this.betCoinSum <= 0) {
        g_msgbox.Show(null, '猜分金额不能为0', g_msgbox.MB_OK);
        return;
    }

    if (this.betCoinSum > g_player.GetProp(common.PropID.COIN)) {
        g_msgbox.Show(null, '金币不足，操作失败', g_msgbox.MB_OK);
        return;
    }

    g_player.UpdateProp(common.PropID.COIN, -this.betCoinSum);
    g_handler.SendImpawnBetMsg(g_connclient, {
        isTwo: isTwo, coinSum: this.betCoinSum
    });

    let gameInfo = g_impawn.GetGameInfo();
    if (isTwo) {
        gameInfo.playerTwoImpawnTimes++
    } else {
        gameInfo.playerThreeImpawnTimes++;
    }

    let nodeBetSum = cc.find('BetSum/Sum', this.node);
    let nameSelfSum = isTwo ? 'BetInfo/TwoSelf' : 'BetInfo/ThreeSelf';
    let nodeSelfSum = cc.find(nameSelfSum, this.node.parent);
    let posDesc = nodeSelfSum.convertToWorldSpaceAR(cc.v2(0, 0));
    posDesc = nodeBetSum.parent.convertToNodeSpaceAR(posDesc);
    let nodeBetSumCopy = cc.instantiate(nodeBetSum);
    nodeBetSum.parent.addChild(nodeBetSumCopy);
    let actionJump = cc.jumpTo(0.5, posDesc.x, posDesc.y, 50, 1);
    let spawn = cc.spawn(cc.fadeOut(0.5), actionJump);
    nodeBetSumCopy.runAction(cc.sequence(spawn, cc.callFunc(function () {
        nodeBetSum.parent.removeChild(nodeBetSumCopy);
    })));

    this.betCoinSum = 0;
    UpdateBetSum.call(this);
    UpdateBetBtn.call(this);
    cc.audioEngine.play(this.betAudio, false, 1);
}

cc.Class({
    extends: cc.Component,

    properties: {
        betAudio: {
            default: null,
            type: cc.AudioClip
        },
        clickAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    start() {
        ClearBetSum.call(this);
        UpdateSelfCoin.call(this);
        setInterval(function () {
            UpdateSelfCoin.call(this);
        }.bind(this), 500);

        UpdateBetBtn.call(this);
        g_uiemitter.on('UI_IMPAWN_LOGOUT', function () {
            ClearBetSum.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMESTATE', function (msg) {
            UpdateBetBtn.call(this);
            if (msg.state === common.ImpawnState.WAIT_START) ClearBetSum.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_BET_FAIL', function (msg) {
            let gameState = g_impawn.GetGameState();
            if (msg.round !== gameState.round) return;
            let gameInfo = g_impawn.GetGameInfo();
            msg.isTwo ? gameInfo.playerTwoImpawnTimes-- : gameInfo.playerThreeImpawnTimes--;
            UpdateBetBtn.call(this);
        }.bind(this));

        this.node.getChildByName('1QBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 1000);
        }, this);
        this.node.getChildByName('1WBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 10000);
        }, this);
        this.node.getChildByName('10WBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 100000);
        }, this);
        this.node.getChildByName('100WBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 1000000);
        }, this);
        this.node.getChildByName('1000WBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 10000000);
        }, this);
        this.node.getChildByName('1YBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 100000000);
        }, this);

        this.node.getChildByName('ClearLeftBtn').on(cc.Node.EventType.TOUCH_END, function () {
            ClearBetSum.call(this);
        }, this);
        this.node.getChildByName('ClearRightBtn').on(cc.Node.EventType.TOUCH_END, function () {
            ClearBetSum.call(this);
        }, this);

        this.node.getChildByName('TwoLeftBtn').on('click', function () {
            Bet.call(this, true);
        }, this);
        this.node.getChildByName('TwoRightBtn').on('click', function () {
            Bet.call(this, true);
        }, this);
        this.node.getChildByName('ThreeLeftBtn').on('click', function () {
            Bet.call(this, false);
        }, this);
        this.node.getChildByName('ThreeRightBtn').on('click', function () {
            Bet.call(this, false);
        }, this);

        let scoreNode = cc.find('Coin/Score', this.node);
        scoreNode.on(cc.Node.EventType.TOUCH_END, function () {
            let nodeLevel = cc.find('Canvas').getChildByName('Level');
            nodeLevel.getComponent('Level').Show();
        }, this);

        let ruleNode = cc.find('Coin/Rule', this.node);
        ruleNode.on(cc.Node.EventType.TOUCH_END, function () {
            g_msgbox.Show(null, config.impawn.rule, g_msgbox.MB_OK, null, {
                width: 420, height: 580
            });
        }, this);
    },
});

const utility = require('./public/Utility');

function UpdateBetInfo() {
    let gameInfo = g_impawn.GetGameInfo();

    let twoSumNode = this.node.getChildByName('TwoSum');
    let twoSumLabel = twoSumNode.getComponent(cc.Label);
    twoSumLabel.string = utility.SplitStr(gameInfo.twoImpawnTotal);
    if (g_impawn.IsStarting() && twoSumLabel.string.length >= 7) {
        let arrNum = twoSumLabel.string.split('');
        if (arrNum.length >= 7) arrNum[arrNum.length - 7] = '*';
        twoSumLabel.string = arrNum.join('');
    }

    let threeSumNode = this.node.getChildByName('ThreeSum');
    let threeSumLabel = threeSumNode.getComponent(cc.Label);
    threeSumLabel.string = utility.SplitStr(gameInfo.threeImpawnTotal);
    if (g_impawn.IsStarting() && threeSumLabel.string.length >= 7) {
        let arrNum = threeSumLabel.string.split('');
        if (arrNum.length >= 7) arrNum[arrNum.length - 7] = '*';
        threeSumLabel.string = arrNum.join('');
    }

    let twoRateNode = this.node.getChildByName('TwoRate');
    let twoRateLabel = twoRateNode.getComponent(cc.Label);
    let twoAwardRate = gameInfo.twoAwardRate / 100;
    twoRateLabel.string = twoAwardRate.toFixed(2);

    let threeRateNode = this.node.getChildByName('ThreeRate');
    let threeRateLabel = threeRateNode.getComponent(cc.Label);
    let threeAwardRate = gameInfo.threeAwardRate / 100;
    threeRateLabel.string = threeAwardRate.toFixed(2);

    let twoSelfNode = this.node.getChildByName('TwoSelf');
    let twoSelfLabel = twoSelfNode.getComponent(cc.Label);
    twoSelfLabel.string = utility.SplitStr(gameInfo.playerTwoImpawnTotal);
    if (this.twoImpawnTotal !== gameInfo.playerTwoImpawnTotal) {
        this.twoImpawnTotal = gameInfo.playerTwoImpawnTotal;
        let action1 = cc.scaleTo(0.15, 1.3);
        let action2 = cc.scaleTo(0.12, 1.0);
        twoSelfNode.runAction(cc.sequence(action1, action2));
    }

    let threeSelfNode = this.node.getChildByName('ThreeSelf');
    let threeSelfLabel = threeSelfNode.getComponent(cc.Label);
    threeSelfLabel.string = utility.SplitStr(gameInfo.playerThreeImpawnTotal);
    if (this.threeImpawnTotal !== gameInfo.playerThreeImpawnTotal) {
        this.threeImpawnTotal = gameInfo.playerThreeImpawnTotal;
        let action1 = cc.scaleTo(0.15, 1.3);
        let action2 = cc.scaleTo(0.12, 1.0);
        threeSelfNode.runAction(cc.sequence(action1, action2));
    }
}

function DisplayResult(forceHide) {
    let nodeResult = this.node.getChildByName('Result');
    nodeResult.active = !g_impawn.IsStarting() && !forceHide;
    if (!nodeResult.active) return;

    let gameInfo = g_impawn.GetGameInfo();
    let strTwoImpawnTotal = String(gameInfo.twoImpawnTotal);
    let two10wan = Number(strTwoImpawnTotal.slice(-6, -5));
    let strTwo10wan = '猜2总额十万位' + two10wan;
    if (strTwoImpawnTotal.length < 6) {
        two10wan = Number(strTwoImpawnTotal.slice(0, 1));
        strTwo10wan = '猜2总额最高位' + two10wan;
    }

    let strThreeImpawnTotal = String(gameInfo.threeImpawnTotal);
    let three10wan = Number(strThreeImpawnTotal.slice(-6, -5));
    let strThree10wan = '猜3总额十万位' + three10wan;
    if (strThreeImpawnTotal.length < 6) {
        three10wan = Number(strThreeImpawnTotal.slice(0, 1));
        strThree10wan = '猜3总额最高位' + three10wan;
    }

    let strAddSum = String(Number(two10wan) + Number(three10wan));
    let strResult = strAddSum.slice(-1);
    strResult += (Number(strResult) <= 2 ? '<=2，猜2胜' : '>=3，猜3胜');

    let gameResult = strTwo10wan + ' + ' + strThree10wan + ' = ' + strAddSum;
    gameResult = gameResult + '，' + strAddSum + '个位数为' + strResult;
    if (gameInfo.twoImpawnTotal === 0 || gameInfo.threeImpawnTotal === 0) {
        gameResult = '有一方总额为0，无效处理';
    }

    let nodeTxt = nodeResult.getChildByName('Txt');
    nodeTxt.getComponent(cc.Label).string = gameResult;
}

cc.Class({
    extends: cc.Component,

    start() {
        UpdateBetInfo.call(this);
        DisplayResult.call(this, true);
        g_uiemitter.on('UI_IMPAWN_LOGOUT', function () {
            UpdateBetInfo.call(this);
            DisplayResult.call(this, true);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMEINFO', function () {
            if (this.timerGIUpdate) return;
            this.timerGIUpdate = setTimeout(function () {
                UpdateBetInfo.call(this);
                DisplayResult.call(this);
                this.timerGIUpdate = null;
            }.bind(this), 200);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMESTATE', function () {
            UpdateBetInfo.call(this);
            DisplayResult.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_NEW_BET', function () {
            if (this.timerNBUpdate) return;
            this.timerNBUpdate = setTimeout(function () {
                UpdateBetInfo.call(this);
                this.timerNBUpdate = null;
            }.bind(this), 210);
        }.bind(this));
    },
});

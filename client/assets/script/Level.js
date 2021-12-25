const constant = require('./protocol/Constant');

function OnUpgradeInfo() {
    let selfLevel = g_player.GetLevel();
    let nodeCurLevel = cc.find('BgSelf/CurLevel', this.node);
    let spriteCurLevel = nodeCurLevel.getComponent(cc.Sprite);
    g_level.Load(selfLevel, function (spriteFrame) {
        spriteCurLevel.spriteFrame = spriteFrame;
    })

    let nodeNextLevel = cc.find('BgSelf/NextLevel', this.node);
    let spriteNextLevel = nodeNextLevel.getComponent(cc.Sprite);
    g_level.Load(selfLevel + 1, function (spriteFrame) {
        spriteNextLevel.spriteFrame = spriteFrame;
    })

    let selfWinLoss = g_player.GetWinLoss();
    let selfCoinSum = g_player.GetCoinSum();
    let nextLevelInfo = constant.GetCrownLevel(selfLevel + 1);
    let winLossRate = nextLevelInfo ? selfWinLoss / nextLevelInfo.win : 0;
    let coinSumRate = nextLevelInfo ? selfCoinSum / nextLevelInfo.sum : 0;
    let progressRate = Math.max(winLossRate, coinSumRate);
    let nodeProgressBar = cc.find('BgSelf/ProgressBar', this.node);
    nodeProgressBar.getComponent(cc.ProgressBar).progress = progressRate;

    let nodeProgressTips = cc.find('BgSelf/ProgressTips', this.node);
    let labelProgressTips = nodeProgressTips.getComponent(cc.Label);
    let progressPercent = Math.min(Math.floor(progressRate * 100), 99);
    labelProgressTips.string = '您当前升级进度为' + progressPercent + '%';
}

cc.Class({
    extends: cc.Component,

    Show() {
        this.node.opacity = 0;
        this.node.active = true;
        this.node.runAction(cc.fadeIn(0.33));
        OnUpgradeInfo.call(this);
    },

    start() {
        let nodeCloseBtn = cc.find('BgLevel/CloseBtn', this.node);
        nodeCloseBtn.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
        }, this);
    },
});

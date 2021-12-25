function UpdateProgress() {
    let gameInfo = g_impawn.GetGameInfo();
    let total = gameInfo.twoImpawnTotal + gameInfo.threeImpawnTotal;
    let twoRate = (total > 0) ? gameInfo.twoImpawnTotal / total : 0.5;
    let twoPercent = Math.floor(twoRate * 100);

    let threeNode = cc.find('Bar/Three', this.node);
    let threeWidget = threeNode.getComponent(cc.Widget);
    threeWidget.left = twoRate;
    threeWidget.updateAlignment();

    let twoRateNode = cc.find('TwoRate/Rate', this.node);
    let twoRateLabel = twoRateNode.getComponent(cc.Label);
    twoRateLabel.string = twoPercent + '%';

    let threeRateNode = cc.find('ThreeRate/Rate', this.node);
    let threeRateLabel = threeRateNode.getComponent(cc.Label);
    threeRateLabel.string = (100 - twoPercent) + '%';
}

cc.Class({
    extends: cc.Component,

    start() {
        UpdateProgress.call(this);
        g_uiemitter.on('UI_IMPAWN_LOGOUT', function () {
            UpdateProgress.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMEINFO', function () {
            if (this.timerGIUpdate) return;
            this.timerGIUpdate = setTimeout(function () {
                UpdateProgress.call(this);
                this.timerGIUpdate = null;
            }.bind(this), 230);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMESTATE', function () {
            UpdateProgress.call(this);
        }.bind(this));
    },
});

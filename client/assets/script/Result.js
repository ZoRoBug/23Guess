const config = require('./Config');
const utility = require('./public/Utility');
const constant = require('./protocol/Constant');

function UpdateResultInfo(resultInfo) {
    let isSelfWin = (resultInfo.gainCoin >= resultInfo.coinSum);
    let isSelfDraw = (resultInfo.gainCoin === -resultInfo.coinSum)
    let isSelfLoss = (resultInfo.gainCoin === 0);

    let nodeResultImg = cc.find('Bg/ResultImg', this.node);
    let spriteResultImg = nodeResultImg.getComponent(cc.Sprite);
    if (isSelfDraw) {
        this.shareTitleList = config.shareTitle.ResultDraw;
        spriteResultImg.spriteFrame = this.drawSpriteFrame;
    } else if (isSelfLoss) {
        this.shareTitleList = config.shareTitle.ResultLoss;
        spriteResultImg.spriteFrame = this.lossSpriteFrame;
        cc.audioEngine.play(this.lossAudio, false, 1);
    } else {
        this.shareTitleList = config.shareTitle.ResultWin;
        spriteResultImg.spriteFrame = this.winSpriteFrame;
        cc.audioEngine.play(this.winAudio, false, 1);
    }

    let nodeBetSum = cc.find('Bg/BetInfo/Sum', this.node);
    let labelBetSum = nodeBetSum.getComponent(cc.Label);
    labelBetSum.string = utility.SplitStr(resultInfo.coinSum);

    let nodeBetObj = cc.find('Bg/BetInfo/Object', this.node);
    let labelBetObj = nodeBetObj.getComponent(cc.Label);
    labelBetObj.string = resultInfo.isTwo ? '猜2' : '猜3';

    let gainCoinSum = Math.abs(resultInfo.gainCoin);
    let nodeGainSum = cc.find('Bg/GainInfo/Sum', this.node);
    let labelGainSum = nodeGainSum.getComponent(cc.Label);
    labelGainSum.string = utility.SplitStr(gainCoinSum);

    let nodeGainRate = cc.find('Bg/GainInfo/Rate', this.node);
    let labelGainRate = nodeGainRate.getComponent(cc.Label);
    let awardRate = gainCoinSum / resultInfo.coinSum;
    labelGainRate.string = isSelfWin ? awardRate.toFixed(2) : 'XX';

    let winCoinSum = gainCoinSum - resultInfo.coinSum;
    let nodeResultSum = cc.find('Bg/ResultInfo/Sum', this.node);
    let labelResultSum = nodeResultSum.getComponent(cc.Label);
    let strWinCoinSum = utility.SplitStr(winCoinSum);
    if (winCoinSum > 0) strWinCoinSum = '+' + strWinCoinSum;
    labelResultSum.string = strWinCoinSum;

    let nodeResultTips = cc.find('Bg/ResultInfo/Result', this.node);
    let labelResultTips = nodeResultTips.getComponent(cc.Label);
    if (isSelfDraw) {
        labelResultTips.string = '无效';
    } else if (isSelfLoss) {
        labelResultTips.string = '猜错';
    } else {
        labelResultTips.string = '猜对';
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        winSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },
        lossSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },
        drawSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },
        winAudio: {
            default: null,
            type: cc.AudioClip
        },
        lossAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    Show(resultInfo) {
        this.ri = resultInfo;
        this.node.scaleX = 0.01;
        this.node.scaleY = 0.01;
        this.node.active = true;
        this.node.runAction(cc.scaleBy(0.2, 100));
        UpdateResultInfo.call(this, resultInfo);
    },

    start() {
        let nodeCloseBtn = cc.find('Bg/CloseBtn', this.node);
        nodeCloseBtn.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
            if (this.ri.gainCoin >= 0) {
                g_player.UpdateCoinSum(this.ri.coinSum);
                g_player.UpdateWinLoss(this.ri.gainCoin - this.ri.coinSum);
                let level = g_player.GetLevel();
                let winLoss = g_player.GetWinLoss();
                let coinSum = g_player.GetCoinSum();
                if (constant.CrownLevelCanUp(level, winLoss, coinSum)) {
                    let newLevel = level + 1;
                    g_player.UpdateLevel(newLevel);
                    g_player.UpdateCoinSum(-coinSum);
                    g_player.UpdateWinLoss(-winLoss);
                    g_uiemitter.emit('UI_LEVEL_UPGRADE', newLevel);
                }
            }
        }, this);

        let nodeInviteFriend = cc.find('Bg/InviteFriendBtn', this.node);
        nodeInviteFriend.on(cc.Node.EventType.TOUCH_END, function () {
            if (!utility.IsWeinXinPlatform()) return;
            let imgList = config.shareImgs;
            let idx = utility.Random(0, imgList.length - 1);
            wx.shareAppMessage({
                title: imgList[idx].title,
                imageUrlId: imgList[idx].id,
                imageUrl: imgList[idx].url
            });
        }, this);

        let nodeShowScore = cc.find('Bg/ShowScoreBtn', this.node);
        nodeShowScore.on(cc.Node.EventType.TOUCH_END, function () {
            if (!utility.IsWeinXinPlatform()) return;
            let nodeBg = this.node.getChildByName('Bg');
            let rectBg = utility.NodeToWXPos(nodeBg);
            let rate = rectBg.width / nodeBg.width;
            let titleList = this.shareTitleList;
            canvas.toTempFilePath({
                x: rectBg.x, y: rectBg.y + 78 * rate,
                width: rectBg.width,
                height: rectBg.width / 1.25,
                destWidth: rectBg.width,
                destHeight: rectBg.width / 1.25,
                success: function (res) {
                    let idx = utility.Random(0, titleList.length - 1);
                    wx.shareAppMessage({
                        title: titleList[idx],
                        imageUrl: res.tempFilePath
                    });
                },
                fail: function () {
                    let tips = '截图失败，请稍后重试';
                    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
                }
            });
        }, this);
    },
});

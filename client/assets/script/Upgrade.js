const config = require('./Config');
const utility = require('./public/Utility');

function UpdateLevelInfo(level) {
    let nodeNewLevel = cc.find('Bg/NewLevel', this.node);
    let spriteNewLevel = nodeNewLevel.getComponent(cc.Sprite);
    g_level.Load(level, function (spriteFrame) {
        spriteNewLevel.spriteFrame = spriteFrame;
    });

    let head132 = g_player.GetHead();
    g_head.Load(g_head.To64(head132), function (spriteFrame) {
        if (!spriteFrame) return;
        let headNode = cc.find('Bg/Head/Image', this.node);
        let headSprite = headNode.getComponent(cc.Sprite);
        headSprite.spriteFrame = spriteFrame;
    }.bind(this));

    let nodeLevelTips = cc.find('Bg/LevelTips', this.node);
    let labelLevelTips = nodeLevelTips.getComponent(cc.Label);
    labelLevelTips.string = '恭喜您！升级到Lv' + level;
}

cc.Class({
    extends: cc.Component,

    Show(newLevel) {
        this.node.scaleX = 0.01;
        this.node.scaleY = 0.01;
        this.node.active = true;
        this.node.runAction(cc.scaleBy(0.2, 100));
        UpdateLevelInfo.call(this, newLevel);
    },

    start() {
        let nodeCloseBtn = cc.find('Bg/CloseBtn', this.node);
        nodeCloseBtn.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
        }, this);

        let nodeShowLink = cc.find('Bg/ShowLink', this.node);
        nodeShowLink.on(cc.Node.EventType.TOUCH_END, function () {
            if (!utility.IsWeinXinPlatform()) return;
            let nodeBg = this.node.getChildByName('Bg');
            let rectBg = utility.NodeToWXPos(nodeBg);
            canvas.toTempFilePath({
                x: rectBg.x, y: rectBg.y,
                width: rectBg.width,
                height: rectBg.width / 1.25,
                destWidth: rectBg.width,
                destHeight: rectBg.width / 1.25,
                success: function (res) {
                    let titleList = config.shareTitle.Upgrade;
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

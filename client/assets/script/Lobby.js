const config = require('./Config');
const common = require('./protocol/Common');

function UpdatePlayerInfo() {
    let selfLevel = g_player.GetLevel();
    let nodeLevel = this.node.getChildByName('Level');
    let spriteLevel = nodeLevel.getComponent(cc.Sprite);
    g_level.Load(selfLevel, function (spriteFrame) {
        spriteLevel.spriteFrame = spriteFrame;
    });

    let nicknameNode = this.node.getChildByName('Nickname');
    let nicknameLabel = nicknameNode.getComponent(cc.Label);
    nicknameLabel.string = g_player.GetNickname() || '';

    let coinNode = this.node.getChildByName('Coin');
    let coinLabel = coinNode.getComponent(cc.Label);
    let strCoin = g_player.GetProp(common.PropID.COIN, true);
    coinLabel.string = '金币：' + strCoin;

    let hasSignin = cc.sys.localStorage.getItem(config.itemName.hasSignin);
    this.node.getChildByName('SigninClick').active = !hasSignin;

    let hasImpawn = cc.sys.localStorage.getItem(config.itemName.impawn);
    this.node.getChildByName('PlayClick').active = (hasSignin && !hasImpawn);
}

cc.Class({
    extends: cc.Component,

    start() {
        setInterval(function () {
            UpdatePlayerInfo.call(this);
        }.bind(this), 1000);

        let loadingNode = cc.find('PlayBtn/Loading', this.node);
        loadingNode.runAction(cc.repeatForever(cc.rotateBy(0.7, 180)));

        let nodeSigninClick = this.node.getChildByName('SigninClick');
        let xSignin = nodeSigninClick.x, ySignin = nodeSigninClick.y;
        let actSignin1 = cc.moveTo(0.5, cc.v2(xSignin, ySignin - 20));
        let actSignin2 = cc.moveTo(0.5, cc.v2(xSignin, ySignin));
        let seqSignin = cc.sequence(actSignin1, actSignin2);
        nodeSigninClick.runAction(cc.repeatForever(seqSignin));

        let nodePlayClick = this.node.getChildByName('PlayClick');
        let xPlay = nodePlayClick.x, yPlay = nodePlayClick.y;
        let actPlay1 = cc.moveTo(0.5, cc.v2(xPlay, yPlay - 20));
        let actPlay2 = cc.moveTo(0.5, cc.v2(xPlay, yPlay));
        let seqPlay = cc.sequence(actPlay1, actPlay2);
        nodePlayClick.runAction(cc.repeatForever(seqPlay));

        this.node.getChildByName('PlayBtn').on('click', function () {
            let nowTimestamp = (new Date()).getTime();
            if (!this.playClickTimestamp) this.playClickTimestamp = 0;
            if (nowTimestamp - this.playClickTimestamp < 2000) return;
            this.playClickTimestamp = nowTimestamp;
            g_handler.SendImpawnLoginMsg(g_connclient);
            this.OpenLoadingAction(true);
        }, this);

        let levelNode = this.node.getChildByName('Level');
        levelNode.on(cc.Node.EventType.TOUCH_END, function () {
            let nodeLevel = cc.find('Canvas').getChildByName('Level');
            nodeLevel.getComponent('Level').Show();
        }, this);

        let levelLinkNode = this.node.getChildByName('LevelLink');
        levelLinkNode.on(cc.Node.EventType.TOUCH_END, function () {
            let nodeLevel = cc.find('Canvas').getChildByName('Level');
            nodeLevel.getComponent('Level').Show();
        }, this);

        let rankLinkNode = this.node.getChildByName('RankLink');
        rankLinkNode.on(cc.Node.EventType.TOUCH_END, function () {
            let nodeLevel = cc.find('Canvas').getChildByName('Rank');
            nodeLevel.getComponent('Rank').Show();
        }, this);

        g_head.Load(g_player.GetHead(), function (spriteFrame) {
            if (!spriteFrame) return;
            let headNode = cc.find('Head/Image', this.node);
            let headSprite = headNode.getComponent(cc.Sprite);
            headSprite.spriteFrame = spriteFrame;
        }.bind(this));

        UpdatePlayerInfo.call(this);
    },

    OpenLoadingAction(isActive) {
        cc.find('PlayBtn/Loading', this.node).active = isActive;
    },
});

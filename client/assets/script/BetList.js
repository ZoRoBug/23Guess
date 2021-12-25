const utility = require('./public/Utility');

const LIST_SHOW_ITEM_COUNT = 12; // 押分列表显示条数

function UpdateCount() {
    let gameInfo = g_impawn.GetGameInfo();
    let nodeTwoCount = cc.find('Two/Count', this.node);
    let nodeThreeCount = cc.find('Three/Count', this.node);
    let labelTwoCount = nodeTwoCount.getComponent(cc.Label);
    let labelThreeCount = nodeThreeCount.getComponent(cc.Label);
    labelTwoCount.string = String(gameInfo.twoPlayerCount) + '人参与';
    labelThreeCount.string = String(gameInfo.threePlayerCount) + '人参与';
}

function UpdateInfo(node, nickname, coinSum) {
    node.getChildByName('Nickname').getComponent(cc.Label).string = nickname;
    let labelCoinSum = node.getChildByName('CoinSum').getComponent(cc.Label);
    labelCoinSum.string = utility.SplitStr(coinSum);
    if (g_impawn.IsStarting() && labelCoinSum.string.length >= 7) {
        let arrNum = labelCoinSum.string.split('');
        if (arrNum.length >= 7) arrNum[arrNum.length - 7] = '*';
        labelCoinSum.string = arrNum.join('');
    }
}

function UpdateList() {
    let twoItemIndex = 0, threeItemIndex = 0;
    let gameInfo = g_impawn.GetGameInfo();
    for (let i = 0, len = gameInfo.impawnList.length; i < len; ++i) {
        let impawn = gameInfo.impawnList[i];
        let title = impawn.isTwo ? 'Two' : 'Three';
        let index = impawn.isTwo ? ++twoItemIndex : ++threeItemIndex;
        let node = cc.find(title + '/Mask/' + index, this.node);
        if (node) UpdateInfo.call(this, node, impawn.nickname, impawn.coinSum);
    }
    for (let i = twoItemIndex + 1; i <= LIST_SHOW_ITEM_COUNT; ++i) {
        let node = cc.find('Two/Mask/' + i, this.node);
        UpdateInfo.call(this, node, '', '');
    }
    for (let i = threeItemIndex + 1; i <= LIST_SHOW_ITEM_COUNT; ++i) {
        let node = cc.find('Three/Mask/' + i, this.node);
        UpdateInfo.call(this, node, '', '');
    }
}

function InitList() {
    let nodeTwoList = cc.find('Two/Mask', this.node);
    let nodeThreeList = cc.find('Three/Mask', this.node);
    let nodeRankList = this.node.getChildByName('Rank');
    for (let i = 0; i < LIST_SHOW_ITEM_COUNT; ++i) {
        let nodeName = String(i + 1);
        let nodeTwoItem = cc.instantiate(this.twoItemPrefab);
        let nodeThreeItem = cc.instantiate(this.threeItemPrefab);
        nodeTwoList.addChild(nodeTwoItem, 1, nodeName);
        nodeThreeList.addChild(nodeThreeItem, 1, nodeName);

        let nodeRank = cc.instantiate(this.rankPrefab);
        let spriteRank = nodeRank.getComponent(cc.Sprite);
        spriteRank.spriteFrame = this.rankSprite[Math.min(i, 3)];
        let nodeNum = nodeRank.getChildByName('Num');
        nodeNum.getComponent(cc.Label).string = nodeName;
        nodeRankList.addChild(nodeRank, 1, nodeName);
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        rankPrefab: {
            default: null,
            type: cc.Prefab,
        },
        twoItemPrefab: {
            default: null,
            type: cc.Prefab,
        },
        threeItemPrefab: {
            default: null,
            type: cc.Prefab,
        },
        rankSprite: {
            default: [],
            type: cc.SpriteFrame
        },
    },

    start() {
        InitList.call(this);
        UpdateList.call(this);
        UpdateCount.call(this);
        g_uiemitter.on('UI_IMPAWN_LOGOUT', function () {
            UpdateList.call(this);
            UpdateCount.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMEINFO', function () {
            if (this.timerGIUpdate) return;
            this.timerGIUpdate = setTimeout(function () {
                UpdateList.call(this);
                UpdateCount.call(this);
                this.timerGIUpdate = null;
            }.bind(this), 300);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMESTATE', function () {
            UpdateList.call(this);
            UpdateCount.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_NEW_BET', function () {
            if (this.timerNBUpdate) return;
            this.timerNBUpdate = setTimeout(function () {
                UpdateList.call(this);
                UpdateCount.call(this);
                this.timerNBUpdate = null;
            }.bind(this), 310);
        }.bind(this));
    },
});

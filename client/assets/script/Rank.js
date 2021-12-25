const config = require('./Config');
const common = require('./protocol/Common');
const utility = require('./public/Utility');
const constant = require('./protocol/Constant');

function GetPrefab(rankType) {
    if (rankType === common.RankType.UNIVERSE_CROWN) {
        return this.crownItemPrefab;
    } else if (rankType === common.RankType.YESTERDAY_WINNER) {
        return this.winnerItemPrefab;
    }
}

function GetRankList(rankType) {
    if (rankType === common.RankType.UNIVERSE_CROWN) {
        return cc.find('Bg/RankList/CrownList/view/content', this.node);
    } else if (rankType === common.RankType.YESTERDAY_WINNER) {
        return cc.find('Bg/RankList/WinnerList/view/content', this.node);
    }
}

function GetSelfRank(rankType) {
    if (rankType === common.RankType.UNIVERSE_CROWN) {
        return this.selfCrownRank;
    } else if (rankType === common.RankType.YESTERDAY_WINNER) {
        return this.selfWinnerRank;
    }
}

function GetShareTitle(rankType) {
    if (rankType === common.RankType.UNIVERSE_CROWN) {
        return config.shareTitle.rankCrown;
    } else if (rankType === common.RankType.YESTERDAY_WINNER) {
        return config.shareTitle.rankWinner;
    }
}

function GetTitle(rankType) {
    if (rankType === common.RankType.UNIVERSE_CROWN) {
        return '所有玩家皇冠等级排名';
    } else if (rankType === common.RankType.YESTERDAY_WINNER) {
        return '昨日金币获胜最多排名';
    }
}

function RankRequestDone() {
    let nodeRankList = GetRankList.call(this, this.rankType);
    if (this.rankType === common.RankType.UNIVERSE_CROWN) {
        return this.crownRankDone ||
            (nodeRankList.childrenCount >= constant.RANK_CROWN_MAX_ITEM);
    } else if (this.rankType === common.RankType.YESTERDAY_WINNER) {
        return this.winnerRankDone ||
            (nodeRankList.childrenCount >= constant.RANK_WINNER_MAX_ITEM);
    }
}

function OpenWaitAction(isOpen) {
    cc.find('Bg/Wait', this.node).active = isOpen;
}

function UpdateCrownItem(nodeItem, rankItem, rankNum) {
    let spriteItem = nodeItem.getComponent(cc.Sprite);
    if (rankNum % 2 === 0) {
        spriteItem.spriteFrame = this.itemBg1SpriteFrame;
    } else {
        spriteItem.spriteFrame = this.itemBg2SpriteFrame;
    }

    let nodeNickname = nodeItem.getChildByName('Nickname');
    nodeNickname.getComponent(cc.Label).string = rankItem.nickname;

    let crownLevel = 'Lv' + String(rankItem.level);
    let nodeLevelTxt = cc.find('CrownLevel/LevelTxt', nodeItem);
    nodeLevelTxt.getComponent(cc.Label).string = crownLevel;

    let nodeLevelImg = cc.find('CrownLevel/LevelImg', nodeItem);
    let spriteLevelImg = nodeLevelImg.getComponent(cc.Sprite);
    g_level.Load(rankItem.level, function (spriteFrame) {
        spriteLevelImg.spriteFrame = spriteFrame;
    })

    let nodeNum = nodeItem.getChildByName('Num');
    let nodeNum1 = nodeItem.getChildByName('Num1');
    let nodeNum2 = nodeItem.getChildByName('Num2');
    let nodeNum3 = nodeItem.getChildByName('Num3');
    nodeNum.getComponent(cc.Label).string = String(rankNum);
    nodeNum1.getComponent(cc.Label).string = String(rankNum);
    nodeNum2.getComponent(cc.Label).string = String(rankNum);
    nodeNum3.getComponent(cc.Label).string = String(rankNum);
    nodeNum.active = (rankNum > 3);
    nodeNum1.active = (rankNum === 1);
    nodeNum2.active = (rankNum === 2);
    nodeNum3.active = (rankNum === 3);
}

function UpdateWinnerItem(nodeItem, rankItem, rankNum) {
    let spriteItem = nodeItem.getComponent(cc.Sprite);
    if (rankNum % 2 === 0) {
        spriteItem.spriteFrame = this.itemBg1SpriteFrame;
    } else {
        spriteItem.spriteFrame = this.itemBg2SpriteFrame;
    }

    let nodeNickname = nodeItem.getChildByName('Nickname');
    nodeNickname.getComponent(cc.Label).string = rankItem.nickname;

    let nodeWin = nodeItem.getChildByName('WinCoinSum');
    let strWinCoin = utility.SplitStr(rankItem.coinWin);
    nodeWin.getComponent(cc.Label).string = strWinCoin;

    let nodeNum = nodeItem.getChildByName('Num');
    let nodeNum1 = nodeItem.getChildByName('Num1');
    let nodeNum2 = nodeItem.getChildByName('Num2');
    let nodeNum3 = nodeItem.getChildByName('Num3');
    nodeNum.getComponent(cc.Label).string = String(rankNum);
    nodeNum1.getComponent(cc.Label).string = String(rankNum);
    nodeNum2.getComponent(cc.Label).string = String(rankNum);
    nodeNum3.getComponent(cc.Label).string = String(rankNum);
    nodeNum.active = (rankNum > 3);
    nodeNum1.active = (rankNum === 1);
    nodeNum2.active = (rankNum === 2);
    nodeNum3.active = (rankNum === 3);
}

function UpdateItem(nodeItem, rankType, rankItem, rankNum) {
    if (rankType === common.RankType.UNIVERSE_CROWN) {
        UpdateCrownItem.call(this, nodeItem, rankItem, rankNum);
    } else if (rankType === common.RankType.YESTERDAY_WINNER) {
        UpdateWinnerItem.call(this, nodeItem, rankItem, rankNum);
    }
}

function UpdateList(rankType, rankList) {
    let prefab = GetPrefab.call(this, rankType);
    let nodeRankList = GetRankList.call(this, rankType);
    if (!nodeRankList || !prefab) return;

    let listNodeLength = nodeRankList.childrenCount;
    for (let i = 0; i < rankList.length; ++i) {
        let nodeItem = cc.instantiate(prefab);
        nodeRankList.addChild(nodeItem);
        let rank = i + listNodeLength + 1;
        UpdateItem.call(this, nodeItem, rankType, rankList[i], rank);
    }
}

function UpdateSelfRank() {
    let strRank = '您未入榜';
    let selfRank = GetSelfRank.call(this, this.rankType);
    if (selfRank > 0) strRank = '您排在第' + selfRank + '名';
    strRank = GetTitle.call(this, this.rankType) + ' — ' + strRank;
    let nodeSelfRank = cc.find('Bg/SelfRank', this.node);
    nodeSelfRank.getComponent(cc.Label).string = strRank;
}

function UpdateRankTab() {
    let nodeCrownRank = cc.find('Bg/CrownRank', this.node);
    let nodeWinnerRank = cc.find('Bg/WinnerRank', this.node);
    let isCrown = (this.rankType === common.RankType.UNIVERSE_CROWN);
    let isWinner = (this.rankType === common.RankType.YESTERDAY_WINNER);
    nodeCrownRank.getComponent(cc.Button).interactable = isCrown;
    nodeWinnerRank.getComponent(cc.Button).interactable = isWinner;
}

function UpdateRankList(callback) {
    let nodeCrownRank = cc.find('Bg/RankList/CrownList', this.node);
    let nodeWinnerRank = cc.find('Bg/RankList/WinnerList', this.node);

    let widthCrown = nodeCrownRank.width;
    let actCrownShow = cc.moveTo(0.2, cc.v2(0, 0));
    let actCrownHide = cc.moveTo(0.2, cc.v2(-widthCrown, 0));

    let widthWinner = nodeWinnerRank.width;
    let actWinnerShow = cc.moveTo(0.2, cc.v2(0, 0));
    let actWinnerHide = cc.moveTo(0.2, cc.v2(widthWinner, 0));

    if (this.rankType === common.RankType.UNIVERSE_CROWN) {
        nodeCrownRank.runAction(actCrownShow);
        nodeWinnerRank.runAction(cc.sequence(actWinnerHide,
            cc.callFunc(function () {
                if (typeof callback === 'function') callback();
            }.bind(this))));
    } else if (this.rankType === common.RankType.YESTERDAY_WINNER) {
        nodeCrownRank.runAction(actCrownHide);
        nodeWinnerRank.runAction(cc.sequence(actWinnerShow,
            cc.callFunc(function () {
                if (typeof callback === 'function') callback();
            }.bind(this))));
    }
}

function RequestRank() {
    if (RankRequestDone.call(this)) return;
    let nodeRankList = GetRankList.call(this, this.rankType);
    g_handler.SendRankMsg(g_connclient, {
        rankType: this.rankType,
        startPos: nodeRankList.childrenCount,
        count: constant.RANK_REQUEST_COUNT - 1
    });
    OpenWaitAction.call(this, true);
}

function ShowFace(isShow) {
    this.node.active = true;
    let width = this.node.width;
    let nodeBg = this.node.getChildByName('Bg');
    let actBgShow = cc.moveTo(0.1, cc.v2(0, nodeBg.y));
    let actBgHide = cc.moveTo(0.1, cc.v2(-width, nodeBg.y));
    nodeBg.runAction(cc.sequence(isShow ? actBgShow : actBgHide,
        cc.callFunc(function () {
            if (!isShow) {
                this.node.runAction(cc.moveTo(0, cc.v2(-width, 0)));
            }
        }.bind(this))));
    if (isShow) this.node.runAction(cc.moveTo(0, cc.v2(0, 0)));
}

cc.Class({
    extends: cc.Component,

    properties: {
        crownItemPrefab: {
            default: null,
            type: cc.Prefab,
        },
        winnerItemPrefab: {
            default: null,
            type: cc.Prefab,
        },
        itemBg1SpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },
        itemBg2SpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },
    },

    Show() {
        ShowFace.call(this, true);
    },

    start() {
        this.selfCrownRank = 0, this.selfWinnerRank = 0;
        this.rankType = common.RankType.UNIVERSE_CROWN;

        let waitNode = cc.find('Bg/Wait', this.node);
        waitNode.runAction(cc.repeatForever(cc.rotateBy(1.5, 180)));
        OpenWaitAction.call(this, false);

        UpdateRankTab.call(this);
        UpdateSelfRank.call(this);
        UpdateRankList.call(this, function () {
            RequestRank.call(this);
        }.bind(this));

        g_uiemitter.on('UI_RANK', function (msg) {
            OpenWaitAction.call(this, false);
            UpdateList.call(this, msg.rankType, msg.rankList);
            if (msg.rankType === common.RankType.UNIVERSE_CROWN) {
                this.selfCrownRank = msg.selfRank;
                if (msg.rankList.length < constant.RANK_REQUEST_COUNT) {
                    this.crownRankDone = true;
                }
            } else if (msg.rankType === common.RankType.YESTERDAY_WINNER) {
                this.selfWinnerRank = msg.selfRank;
                if (msg.rankList.length < constant.RANK_REQUEST_COUNT) {
                    this.winnerRankDone = true;
                }
            }
            UpdateSelfRank.call(this);
        }.bind(this));

        cc.find('Bg/RankList/CrownList', this.node).on('scroll-to-bottom', function () {
            RequestRank.call(this);
        }, this);
        cc.find('Bg/RankList/WinnerList', this.node).on('scroll-to-bottom', function () {
            RequestRank.call(this);
        }, this);

        let nodeCrownRank = cc.find('Bg/CrownRank', this.node);
        nodeCrownRank.on(cc.Node.EventType.TOUCH_END, function () {
            this.rankType = common.RankType.UNIVERSE_CROWN;
            UpdateRankTab.call(this);
            UpdateSelfRank.call(this);
            UpdateRankList.call(this, function () {
                let nodeRankList = GetRankList.call(this, this.rankType);
                if (nodeRankList.childrenCount < constant.RANK_REQUEST_COUNT) {
                    RequestRank.call(this);
                }
            }.bind(this));
        }, this);

        let nodeWinnerRank = cc.find('Bg/WinnerRank', this.node);
        nodeWinnerRank.on(cc.Node.EventType.TOUCH_END, function () {
            this.rankType = common.RankType.YESTERDAY_WINNER;
            UpdateRankTab.call(this);
            UpdateSelfRank.call(this);
            UpdateRankList.call(this, function () {
                let nodeRankList = GetRankList.call(this, this.rankType);
                if (nodeRankList.childrenCount < constant.RANK_REQUEST_COUNT) {
                    RequestRank.call(this);
                }
            }.bind(this));
        }, this);

        let nodeShowLink = cc.find('Bg/ShowLink', this.node);
        nodeShowLink.on(cc.Node.EventType.TOUCH_END, function () {
            if (!utility.IsWeinXinPlatform()) return;
            let nodeBgLocation = this.node.getChildByName('BgLocation');
            let rectBgLocation = utility.NodeToWXPos(nodeBgLocation);
            let titleList = GetShareTitle.call(this, this.rankType);
            canvas.toTempFilePath({
                x: rectBgLocation.x, y: rectBgLocation.y,
                width: rectBgLocation.width,
                height: rectBgLocation.width / 1.25,
                destWidth: rectBgLocation.width,
                destHeight: rectBgLocation.width / 1.25,
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

        let nodeCloseBtn = cc.find('Bg/CloseBtn', this.node)
        nodeCloseBtn.on(cc.Node.EventType.TOUCH_END, function () {
            ShowFace.call(this, false);
        }, this);
    },
});

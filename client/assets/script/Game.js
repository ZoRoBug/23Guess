const UIClient = require('./network/UIClient');
window.g_connclient = new UIClient();
window.g_gateclient = new UIClient();

window.g_msgbox = require('./public/MsgBox');
window.g_handler = require('./handler/Handler');
window.g_uiemitter = require('./public/UIEmitter');
window.g_impawn = require('./public/ImpawnManager');
window.g_player = require('./public/PlayerManager');
window.g_level = require('./public/LevelManager');
window.g_head = require('./public/HeadManager');

const config = require('./Config');
const utility = require('./public/Utility');
const common = require('./protocol/Common');
const MSG_KICK_LBCL = require('./protocol/MSG_KICK_LBCL')['MSG_KICK_LBCL'];
const MSG_LOGIN_DBCL = require('./protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];
const MSG_DISTRIBUTE_GTCL = require('./protocol/MSG_DISTRIBUTE_GTCL')['MSG_DISTRIBUTE_GTCL'];
const MSG_IMPAWN_LOGIN_CNCL = require('./protocol/MSG_IMPAWN_LOGIN_CNCL')['MSG_IMPAWN_LOGIN_CNCL'];
const MSG_IMPAWN_BET_FAIL_IMCL = require('./protocol/MSG_IMPAWN_BET_FAIL_IMCL')['MSG_IMPAWN_BET_FAIL_IMCL'];

function OnDisconnect(name) {
    let tips = '链接已断开，请关闭页面重新打开';
    g_msgbox.Show(null, tips + name, g_msgbox.MB_OK);
    this.UpdateLoginTips(tips);
    this.UpdateLocation(null);
}

function OnDistributeFail(msg) {
    let tips = '分配服务器失败，请稍后重试';
    this.UpdateLoginTips(tips);
    if (msg.result === MSG_DISTRIBUTE_GTCL.Result.NO_SERVER) {
        tips = '服务器未准备好，' + tips;
        if (msg.explain.length) tips = tips + '\r\n' + msg.explain;
    } else if (msg.result === MSG_DISTRIBUTE_GTCL.Result.FULL_PLAYER) {
        tips = '服务器人数已满，' + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnWXLoginFail(errMsg) {
    let tips = '微信登录验证错误：' + errMsg + '，请稍后重试';
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
    this.UpdateLoginTips('微信登录验证错误，请稍后重试');
}

function OnKick(msg) {
    let tips = '，链接已断开';
    if (msg.reason === MSG_KICK_LBCL.Reason.OTHER_LOGIN) {
        tips = '您的账号在异地登录' + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
    this.UpdateLoginTips(tips);
    this.UpdateLocation(null);
}

function OnRefund(msg) {
    let tips = '您有一笔失效预扣：';
    tips = tips + utility.SplitStr(msg.coin) + '金币';
    tips = tips + '，请重新登录查收';
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnLoginResult(msg) {
    if (msg.result === MSG_LOGIN_DBCL.Result.SUCCESS) {
        this.UpdateLocation(common.Location.LOBBY);
        if (utility.IsWeinXinPlatform()) {
            wx.showShareMenu({ withShareTicket: true });
            wx.onShareAppMessage(function () {
                let imgList = config.shareImgs;
                let idx = utility.Random(0, imgList.length - 1);
                return {
                    title: imgList[idx].title,
                    imageUrlId: imgList[idx].id,
                    imageUrl: imgList[idx].url
                }
            })
        }
        return;
    }
    let tips = '，登录失败';
    if (msg.result === MSG_LOGIN_DBCL.Result.ACCOUNT_NOEXIST) {
        tips = '账号不存在' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.PASSWORD_ERROR) {
        tips = '密码错误' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.PARAM_ERROR) {
        tips = '消息不规范' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.ACCOUNT_FROZEN) {
        tips = '账号已被冻结' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.REDIS_GET_ERROR) {
        tips = '本地数据库出错' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.MARIADB_QUERY_ERROR) {
        tips = '远程数据库出错' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.LOBBY_NO_CONNECT) {
        tips = '游戏大厅未开启' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.TICKET_ERROR) {
        tips = '登录票据错误' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.OVER_PLAYER) {
        tips = '在线人数已满' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.ADD_PLAYER_ERROR) {
        tips = '添加玩家信息失败' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.ALREADY_LOGIN) {
        tips = '此账号已经登录' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_UNKNOW_ERROR) {
        tips = '微信验证未知错误' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_SYSTEM_BUSY) {
        tips = '微信验证系统繁忙' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_CODE_INVALID) {
        tips = '微信验证返回无效CODE' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_LOGIN_TOOMUCH) {
        tips = '微信验证登录频繁' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_URL_GET_ERROR) {
        tips = '微信验证服务链接不上' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_PARSE_FAIL) {
        tips = '微信返回数据解析失败' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_DATA_ERROR) {
        tips = '微信验证返回数据有误' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.result + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
    this.UpdateLoginTips('登录失败，请稍后重试');
}

function OnImpawnLogin(msg) {
    if (msg.result === MSG_IMPAWN_LOGIN_CNCL.Result.SUCCESS) {
        this.UpdateLocation(common.Location.IMPAWN);
        return;
    }
    let tips = '，开始游戏失败';
    if (msg.result === MSG_IMPAWN_LOGIN_CNCL.Result.NO_CLIENT) {
        tips = '未找到登录信息' + tips;
    } else if (msg.result === MSG_IMPAWN_LOGIN_CNCL.Result.OFFLINE) {
        tips = '游戏模块未开启' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.result + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnImpawnBetFail(msg) {
    let tips = '，操作失败。';
    tips = tips + utility.SplitStr(msg.coinSum) + '金币';
    tips += '已归还到您账户中，请仔细核对';
    if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.OFFLINE) {
        tips = '游戏模块未开启' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.NO_LOGIN) {
        tips = '未进入游戏模块' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.NO_CLIENT) {
        tips = '未找到登录信息' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.PARAM_ERROR) {
        tips = '消息中数据有误' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.REDIS_ERROR) {
        tips = '数据库操作出错' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.COIN_NOT_ENOUGH) {
        tips = '您的金币不足' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.WRITE_REDIS_FAIL) {
        tips = '数据库写入失败' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.NO_STARTING) {
        tips = '游戏还未重新开始' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.result + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnImpawnSettlement(msg) {
    let nodeLevel = cc.find('Canvas').getChildByName('Result');
    nodeLevel.getComponent('Result').Show(msg);
}

function OnLevelUpgrade(newLevel) {
    cc.audioEngine.play(this.upgradeAudio, false, 1);
    let nodeUpgrade = cc.find('Canvas').getChildByName('Upgrade');
    nodeUpgrade.getComponent('Upgrade').Show(newLevel);
}

function OnPreventHookTimer() {
    let length = config.hookTips.length;
    let random = utility.Random(0, length - 1);
    let hookTip = config.hookTips[random];
    let nowTimestamp = (new Date()).getTime();
    let diffTimestamp = nowTimestamp - this.startGameTimestamp;
    let hours = Math.floor(diffTimestamp / 3600000);
    hookTip = hookTip.replace('%s', hours);
    g_msgbox.Show(null, hookTip, g_msgbox.MB_OK);
}

cc.Class({
    extends: cc.Component,

    properties: {
        upgradeAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    start() {
        g_handler.Init();
        g_uiemitter.Init();
        g_connclient.Init('CNC');
        g_gateclient.Init('GTC');

        g_uiemitter.on('UI_REFUND', OnRefund.bind(this));

        g_uiemitter.on('UI_KICK', OnKick.bind(this));
        g_uiemitter.on('UI_DISCONNECT', OnDisconnect.bind(this));
        g_uiemitter.on('UI_WXLOGIN_FAIL', OnWXLoginFail.bind(this));
        g_uiemitter.on('UI_LOGIN_RESULT', OnLoginResult.bind(this));
        g_uiemitter.on('UI_DISTRIBUTE_FAIL', OnDistributeFail.bind(this));

        g_uiemitter.on('UI_IMPAWN_LOGIN', OnImpawnLogin.bind(this));
        g_uiemitter.on('UI_IMPAWN_BET_FAIL', OnImpawnBetFail.bind(this));
        g_uiemitter.on('UI_IMPAWN_SETTLEMENT', OnImpawnSettlement.bind(this));

        g_uiemitter.on('UI_LEVEL_UPGRADE', OnLevelUpgrade.bind(this));

        this.node.getChildByName('Rank').active = false;
        this.node.getChildByName('Level').active = false;
        this.node.getChildByName('Result').active = false;
        this.node.getChildByName('Upgrade').active = false;

        this.UpdateLocation(null);

        if (!cc.sys.localStorage.getItem(config.itemName.hasSignin)) {
            this.UpdatePlayBtn(false);
        }

        this.startGameTimestamp = (new Date()).getTime();
        setInterval(function () {
            OnPreventHookTimer.call(this);
        }.bind(this), 3601000);
    },

    UpdateLocation(location) {
        let nodeLogin = this.node.getChildByName('Login');
        let nodeLobby = this.node.getChildByName('Lobby');
        let nodeImpawn = this.node.getChildByName('Impawn');
        nodeImpawn.active = (location === common.Location.IMPAWN);
        nodeLobby.active = (location === common.Location.LOBBY);
        nodeLogin.active = (location === null);
        if (nodeLobby.active) {
            let nodeLobby = this.node.getChildByName('Lobby');
            nodeLobby.getComponent('Lobby').OpenLoadingAction(false);
        }
    },

    UpdatePlayBtn(enable) {
        let nodeLobby = this.node.getChildByName('Lobby');
        let nodePlay = nodeLobby.getChildByName('PlayBtn');
        nodePlay.getComponent(cc.Button).interactable = enable;
    },

    UpdateLoginTips(tips) {
        let nodeLogin = this.node.getChildByName('Login');
        nodeLogin.getComponent('Login').SetLoginTips(tips);
    },
});

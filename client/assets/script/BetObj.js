const common = require('./protocol/Common');

function DisplayGameTime() {
    let gameState = g_impawn.GetGameState();
    let display = (gameState.state === common.ImpawnState.PAUSE);
    let nodeGameTime = this.node.getChildByName('GameTime');
    nodeGameTime.active = display;
    if (!display) return;

    let gameInfo = g_impawn.GetGameInfo();
    let restartHour = String(gameInfo.restartHour);
    if (gameInfo.restartHour < 10) restartHour = '0' + restartHour;
    let pauseHour = String(gameInfo.pauseHour);
    if (gameInfo.pauseHour < 10) pauseHour = '0' + pauseHour;

    let gameTime = '游戏重开：' + restartHour + ':00 - ';
    gameTime = gameTime + '游戏结束：' + pauseHour + ':00';
    nodeGameTime.getComponent(cc.Label).string = gameTime;
}

function UpdateObjWin() {
    let nodeTwoWin = cc.find('TwoObj/Win', this.node);
    let nodeThreeWin = cc.find('ThreeObj/Win', this.node);
    nodeTwoWin.active = false, nodeThreeWin.active = false;
    let isTwoWin = g_impawn.IsTwoWin();
    if (isTwoWin !== null && !g_impawn.IsStarting()) {
        nodeTwoWin.active = isTwoWin;
        nodeThreeWin.active = !isTwoWin;
    }
}

function UpdateCountdown(txt) {
    let nodeCountdown = this.node.getChildByName('Countdown');
    nodeCountdown.getComponent(cc.Label).string = txt;
}

function OpenCountdownTimer(open) {
    if (!open) {
        clearInterval(this.timerCountdown);
        this.timerCountdown = null;
        return;
    }
    if (this.timerCountdown) return;
    this.timerCountdown = setInterval(function () {
        let nowTimestamp = new Date().getTime();
        let diffTime = nowTimestamp - this.startTimestamp;
        let gameState = g_impawn.GetGameState();
        let remainTime = gameState.remainTime - diffTime;
        remainTime = Math.max(remainTime, 0) / 1000;
        UpdateCountdown.call(this, Math.floor(remainTime));
    }.bind(this), 300);
}

function OnImpawnGameState() {
    let gameState = g_impawn.GetGameState();
    if (gameState.state === common.ImpawnState.WAIT_START) {
        UpdateCountdown.call(this, '等开始');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.ImpawnState.STARTING) {
        UpdateCountdown.call(this, Math.floor(gameState.remainTime / 1000));
        this.startTimestamp = new Date().getTime();
        OpenCountdownTimer.call(this, true);
    } else if (gameState.state === common.ImpawnState.WAIT_END) {
        UpdateCountdown.call(this, '结算中');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.ImpawnState.SETTLEMENT) {
        UpdateCountdown.call(this, '结算中');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.ImpawnState.PAUSE) {
        UpdateCountdown.call(this, '暂停中');
        OpenCountdownTimer.call(this, false);
    } else {
        UpdateCountdown.call(this, '状态' + String(gameState.state));
        OpenCountdownTimer.call(this, false);
    }
    DisplayGameTime.call(this);
}

cc.Class({
    extends: cc.Component,

    start() {
        UpdateObjWin.call(this);
        OnImpawnGameState.call(this);
        g_uiemitter.on('UI_IMPAWN_LOGOUT', function () {
            OnImpawnGameState.call(this);
            UpdateObjWin.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMESTATE', function () {
            OnImpawnGameState.call(this);
            UpdateObjWin.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMEINFO', function () {
            if (this.timerGIUpdate) return;
            this.timerGIUpdate = setTimeout(function () {
                DisplayGameTime.call(this);
                UpdateObjWin.call(this);
                this.timerGIUpdate = null;
            }.bind(this), 500);
        }.bind(this));

        let nodeReturn = this.node.getChildByName('Return');
        nodeReturn.on(cc.Node.EventType.TOUCH_END, function () {
            g_impawn.ClearData();
            g_uiemitter.emit('UI_IMPAWN_LOGOUT');
            g_handler.SendImpawnLogoutMsg(g_connclient);
            let jsGame = cc.find('Canvas').getComponent('Game');
            jsGame.UpdateLocation(common.Location.LOBBY);
        });
    },
});

const config = require('./Config');
const utility = require('./public/Utility');
const MSG_SIGNIN_LBCL = require('./protocol/MSG_SIGNIN_LBCL')['MSG_SIGNIN_LBCL'];

function GetSigninItemName(pid) {
    pid = pid || g_player.GetPID();
    return config.itemName.signTime + pid;
}

function GetSigninTimestamp() {
    let itemName = GetSigninItemName();
    let timestamp = cc.sys.localStorage.getItem(itemName);
    return isNaN(timestamp) ? 0 : Number(timestamp);
}

function SetSigninTimestamp(pid, remainTime) {
    let itemName = GetSigninItemName(pid);
    let nowTimestamp = new Date().getTime();
    remainTime = Math.min(remainTime, 24 * 60 * 60);
    let signinTimestamp = nowTimestamp + remainTime * 1000;
    cc.sys.localStorage.setItem(itemName, signinTimestamp);
}

function UpdateSigninBtn(enable) {
    let btnSignin = this.node.getChildByName('SigninBtn');
    btnSignin.getComponent(cc.Button).interactable = enable;
}

function UpdateCountdown(remainSec) {
    let hour = Math.floor(remainSec / 3600);
    hour = Math.min(hour, 99);
    remainSec = remainSec % 3600;
    let minute = Math.floor(remainSec / 60);
    let second = remainSec % 60;

    let strHour = String(hour);
    if (hour < 10) strHour = '0' + strHour;
    let strMinute = String(minute);
    if (minute < 10) strMinute = '0' + strMinute;
    let strSecond = String(second);
    if (second < 10) strSecond = '0' + strSecond;

    let remainTime = strHour + ':' + strMinute + ':' + strSecond;
    let nodeCountdown = this.node.getChildByName('Countdown');
    nodeCountdown.getComponent(cc.Label).string = remainTime;
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
        let remainTime = GetSigninTimestamp() - nowTimestamp;
        if (remainTime > 0) {
            let remainSec = Math.max(remainTime, 0) / 1000;
            UpdateCountdown.call(this, Math.floor(remainSec));
        } else {
            UpdateState.call(this);
        }
    }.bind(this), 300);
}

function UpdateState() {
    let timestamp = GetSigninTimestamp();
    let nowTimestamp = new Date().getTime();
    let isToTime = nowTimestamp >= timestamp;
    OpenCountdownTimer.call(this, !isToTime);
    this.node.getChildByName('SigninBtn').active = isToTime;
    this.node.getChildByName('Countdown').active = !isToTime;
    this.node.getChildByName('Tips').active = !isToTime;
}

function OnSigninBtn() {
    let timestamp = GetSigninTimestamp();
    let nowTimestamp = new Date().getTime();
    if (nowTimestamp < timestamp) {
        UpdateState.call(this);
        g_msgbox.Show(null, '倒计时还未结束，无法签到', g_msgbox.MB_OK);
        return;
    }
    UpdateSigninBtn.call(this, false);
    g_handler.SendSigninMsg(g_connclient);
    cc.find('Canvas').getComponent('Game').UpdatePlayBtn(true);
    cc.sys.localStorage.setItem(config.itemName.hasSignin, true);
}

cc.Class({
    extends: cc.Component,

    properties: {
        awardAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    start() {
        UpdateState.call(this);

        g_uiemitter.on('UI_SIGNIN', function (msg) {
            UpdateSigninBtn.call(this, true);
            let tips = '，签到失败，请稍后重试';
            if (msg.result === MSG_SIGNIN_LBCL.Result.SUCCESS) {
                SetSigninTimestamp(msg.pid, msg.remainTime);
                UpdateState.call(this);
                cc.audioEngine.play(this.awardAudio, false, 1);
                tips = '恭喜您签到成功\r\n获得金币：' + utility.SplitStr(msg.coin);
            } else if (msg.result === MSG_SIGNIN_LBCL.Result.NO_CLIENT) {
                tips = '您信息缺失' + tips;
            } else if (msg.result === MSG_SIGNIN_LBCL.Result.OFFLINE) {
                tips = '服务不在线' + tips;
            } else if (msg.result === MSG_SIGNIN_LBCL.Result.REDIS_ERROR) {
                tips = '数据库错误' + tips;
            } else if (msg.result === MSG_SIGNIN_LBCL.Result.PLAYER_OFFLINE) {
                tips = '您信息不在线' + tips;
            } else if (msg.result === MSG_SIGNIN_LBCL.Result.NO_TIME_TO) {
                SetSigninTimestamp(msg.pid, msg.remainTime);
                UpdateState.call(this);
                tips = '倒计时还未结束' + tips;
            } else if (msg.result === MSG_SIGNIN_LBCL.Result.ON_IMPAWN) {
                tips = '您游戏猜分未结算' + tips;
            } else {
                tips = '未知错误：' + msg.result + tips;
            }
            g_msgbox.Show(null, tips, g_msgbox.MB_OK);
        }.bind(this));

        this.node.getChildByName('SigninBtn').on('click', function () {
            OnSigninBtn.call(this);
        }, this);
    },
});

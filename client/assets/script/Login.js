const config = require('./Config');
const utility = require('./public/Utility');

function UpdateLoginTips() {
    let tips = this.loginTips || '登录中';
    let dotCount = this.loginTips ? 0 : this.tipsDotCount;
    for (let i = 0; i < dotCount; ++i) tips += '.';
    if (++this.tipsDotCount > 3) this.tipsDotCount = 0;
    let nodeTips = this.node.getChildByName('Tips');
    nodeTips.getComponent(cc.Label).string = tips;
}

function GetWXUserInfo() {
    const res = wx.getSystemInfoSync();
    let nodeTips = this.node.getChildByName('Tips');
    let factor = cc.view.getScaleX() / cc.view._devicePixelRatio;
    let width = res.screenWidth, height = res.screenHeight;
    let rtTips = nodeTips.getBoundingBoxToWorld();
    let btnWidth = 200, btnHeigth = 40;
    let btnAuth = wx.createUserInfoButton({
        type: 'text',
        text: '点击获取昵称头像 & 登录',
        style: {
            left: Math.floor((width - btnWidth) / 2),
            top: height - (rtTips.y + rtTips.height) * factor,
            width: btnWidth, height: btnHeigth, lineHeight: btnHeigth,
            backgroundColor: '#9b0000', color: '#ffffff',
            textAlign: 'center', fontSize: 16, borderRadius: 4
        }
    })
    btnAuth.onTap((res) => {
        btnAuth.hide();
        let passAuth = Boolean(res.userInfo);
        cc.sys.localStorage.setItem(config.itemName.wxAuth, passAuth);
        let head = res.userInfo ? res.userInfo.avatarUrl : '';
        let nickName = res.userInfo ? res.userInfo.nickName : '';
        g_handler.StartLogin(head, nickName);
    })
}

cc.Class({
    extends: cc.Component,

    start() {
        this.tipsDotCount = 0;
        UpdateLoginTips.call(this);
        setInterval(function () {
            UpdateLoginTips.call(this);
        }.bind(this), 700);

        if (!utility.IsWeinXinPlatform()) {
            g_handler.StartLogin();
            return;
        }

        let passAuth = cc.sys.localStorage.getItem(config.itemName.wxAuth);
        if (passAuth === null) {
            GetWXUserInfo.call(this);
        } else {
            if (!passAuth) {
                g_handler.StartLogin();
            } else {
                wx.getUserInfo({
                    fail: function () {
                        GetWXUserInfo.call(this);
                    }.bind(this),
                    success: function (res) {
                        let head = res.userInfo.avatarUrl;
                        let nickName = res.userInfo.nickName;
                        g_handler.StartLogin(head, nickName);
                    }
                });
            }
        }
    },

    SetLoginTips(tips) {
        this.loginTips = tips;
    },
});

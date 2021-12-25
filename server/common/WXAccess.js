// --------------------------------------------------------
// 微信访问接口管理
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const https = require('https');
const sconfig = require('./SConfig');

const MSG_CHECK_HOST = 'api.weixin.qq.com'; // 字符串合法性检查HOST
const MSG_CHECK_PATH = '/wxa/msg_sec_check?access_token='; // 字符串合法性检查路径

const AUTH_CODE_URL = 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=APPSECRET&js_code=JSCODE&grant_type=authorization_code'; // 登录验证URL
const GET_TOKEN_URL = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET'; // 获取令牌URL

const wxaccess = {
    // 初始化
    Init: function () {
        this.GetToken();
        this.expiresTime = 0;
        setInterval(function () {
            let nowTimestamp = (new Date()).getTime();
            if (this.expiresTime > nowTimestamp) return;
            this.GetToken();
        }.bind(this), 60000);
    },

    // 获取完整登录验证URL
    GetAuthCodeUrl: function (code) {
        let url = AUTH_CODE_URL;
        url = url.replace('APPID', sconfig.wxAppID);
        url = url.replace('APPSECRET', sconfig.wxAppSecret);
        url = url.replace('JSCODE', code);
        return url;
    },

    // 获取访问令牌
    GetToken: function () {
        let url = GET_TOKEN_URL;
        url = url.replace('APPID', sconfig.wxAppID);
        url = url.replace('APPSECRET', sconfig.wxAppSecret);
        https.get(url, function (result) {
            result.on('data', function (data) {
                let arrData = null;
                try {
                    arrData = JSON.parse(data);
                } catch (err) {
                    console.error('获取小程序TOKEN失败：JSON解析失败');
                    return;
                }
                if (arrData.errcode && arrData.errcode !== 0) {
                    console.error('获取小程序TOKEN失败：', arrData.errmsg);
                } else {
                    this.accessToken = arrData.access_token;
                    let nowTimestamp = (new Date()).getTime();
                    this.expiresTime = nowTimestamp + arrData.expires_in * 1000;
                }
            }.bind(this));
        }.bind(this)).on('error', function (err) {
            console.error('获取小程序TOKEN错误：', err);
        });
    },

    // 字符串合法性检查
    CheckValid: function (data, callback) {
        if (!this.accessToken) {
            if (typeof callback === 'function') callback(true);
            return;
        }
        let postData = JSON.stringify({ 'content': data });
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            },
            hostname: MSG_CHECK_HOST,
            path: MSG_CHECK_PATH + this.accessToken,
        };
        let request = https.request(options, function (result) {
            result.on('data', function (data) {
                let arrData = null;
                try {
                    arrData = JSON.parse(data);
                } catch (err) {
                    console.error('字符串合法性检查失败：JSON解析失败');
                    if (typeof callback === 'function') callback(false);
                    return;
                }
                let isValid = (arrData.errcode === 0);
                if (typeof callback === 'function') callback(isValid);
            });
        });
        request.on('error', function (err) {
            console.error('字符串合法性检查错误：', err);
            if (typeof callback === 'function') callback(true);
        });
        request.write(postData);
        request.end();
    }
};

module.exports = wxaccess;
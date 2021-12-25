// --------------------------------------------------------
// 服务器客户端
// --------------------------------------------------------
// 消息会先加入队列，每隔一定时间发送头条消息，发送成功后再发下一条
// 此操作一是避免消息拥堵，集中发送；二是要求消息有序发送
// 本模块会发送WS_CLIENT_OPEN事件
// --------------------------------------------------------
"use strict";
const EventEmitter = require('events');
const WSClient = require('../../public/WSClient');

function CreateClient() {
    return new WSClient(this, this.config.address, this.emitter);
}

function OpenSendMsg(open, reset) {
    this.openSendMsg = open;
    if (reset) this.sendingMsg = false;
    if (open && !this.timerSendMsg) {
        this.timerSendMsg = setInterval(function () {
            if (!this.IsOpen()) return;
            if (this.msgList.length === 0) return;
            if (!this.openSendMsg || this.sendingMsg) return;
            this.sendingMsg = true;
            this.client.Send(this.msgList[0].data, function () {
                let msg = this.msgList.shift();
                if (msg.callback) msg.callback();
                this.sendingMsg = false;
            }.bind(this));
        }.bind(this), 2);
    }
}

function Client() {
}

Client.prototype.on = function () {
    this.emitter.on.apply(this.emitter, arguments);
}

Client.prototype.emit = function () {
    this.emitter.emit.apply(this.emitter, arguments);
}

Client.prototype.Init = function (cfg) {
    this.config = cfg;
    this.msgList = new Array();
    this.emitter = new EventEmitter();
    this.client = CreateClient.call(this);
}

Client.prototype.Uninit = function () {
    this.msgList = [];
    this.client.Close();
    this.isUninit = true;
    clearInterval(this.timerSendMsg);
    clearTimeout(this.timerRecreate);
    this.emitter.removeAllListeners();
}

Client.prototype.WSCOpen = function () {
    OpenSendMsg.call(this, true, true);
    this.emit('WS_CLIENT_OPEN', this);
}

Client.prototype.WSCClose = function () {
    OpenSendMsg.call(this, false);
    if (!this.isUninit) {
        if (this.timerRecreate) {
            g_log.Info('【WSC】%s正在进行新建链接...', this.config.name);
            return;
        }
        this.timerRecreate = setTimeout(function () {
            this.timerRecreate = null;
            g_log.Info('【WSC】%s意外断开则新建链接...', this.config.name);
            this.client = CreateClient.call(this);
        }.bind(this), 3000);
    }
}

Client.prototype.Send = function (data, callback) {
    this.msgList.push({ data: data, callback: callback });
    if (this.IsOpen()) OpenSendMsg.call(this, true);
}

Client.prototype.IsOpen = function () {
    return this.client.IsOpen();
}

module.exports = Client;
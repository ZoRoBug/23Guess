// --------------------------------------------------------
// 服务器客户端
// --------------------------------------------------------
// 会发出以下事件
// （1）CLIENT_CONNECT
// （2）CLIENT_DISCONNECT
// --------------------------------------------------------
"use strict";
const WSClient = require('WSClient');
const EventEmitter = require('events');

function OpenSendMsg(open) {
    this.openSendMsg = open;
    if (open && !this.timerSendMsg) {
        this.timerSendMsg = setInterval(function () {
            if (!this.client || this.msgList.length === 0) return;
            if (!this.openSendMsg || !this.client.IsOpen()) return;
            if (this.client.Send(this.msgList[0])) this.msgList.shift();
        }.bind(this), 20);
    }
}

function UIClient() {
    this.msgList = new Array();
    this.emitter = new EventEmitter();
}

UIClient.prototype.on = function () {
    this.emitter.on.apply(this.emitter, arguments);
}

UIClient.prototype.emit = function () {
    this.emitter.emit.apply(this.emitter, arguments);
}

UIClient.prototype.Init = function (name) {
    this.name = name;
}

UIClient.prototype.Uninit = function () {
    clearInterval(this.timerSendMsg);
    this.emitter.removeAllListeners();
    this.Close();
}

UIClient.prototype.WSCOpen = function () {
    OpenSendMsg.call(this, true);
    this.emit('CLIENT_CONNECT', this.name);
}

UIClient.prototype.WSCClose = function (client, notify) {
    this.client = null;
    this.msgList = new Array();
    OpenSendMsg.call(this, false);
    if (notify) this.emit('CLIENT_DISCONNECT', this.name);
}

UIClient.prototype.Connect = function (address) {
    if (this.client) return;
    this.client = new WSClient(this, address, this.emitter, this.name);
}

UIClient.prototype.Send = function (data) {
    this.msgList.push(data);
    if (this.client && this.client.IsOpen()) OpenSendMsg.call(this, true);
}

UIClient.prototype.Close = function () {
    if (this.client) this.client.Close(false);
}

module.exports = UIClient;
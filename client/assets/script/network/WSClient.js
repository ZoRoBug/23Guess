// --------------------------------------------------------
// 终端websocket功能封装
// --------------------------------------------------------
// owner可实现以下回调函数接受信息：
// （1）WSCOpen 链接已经建立
// （2）WSCClose 链接已经关闭
// 本模块会发送各个消息协议事件 & PING PONG 消息处理
// --------------------------------------------------------
"use strict";
const protocol = require('../protocol/Protocol');
const msgid = require('../protocol/MsgID')['MsgID'];
const MSG_PING = require('../protocol/MSG_PING')['MSG_PING'];

function Heartbeat() {
    clearTimeout(this.pingTimeout);
    this.pingTimeout = setInterval(function () {
        if (this.isAlive === false) {
            this.Close(true);
            return;
        }
        if (!this.msgPingData) {
            this.msgPingData = MSG_PING.encode({
                msgID: protocol.GetMsgId('MSG_PING')
            }).finish();
        }
        this.isAlive = false;
        this.Send(this.msgPingData);
        console.debug('%s发送PING', this.wscName);
    }.bind(this), 15000);
}

function WSClient(owner, address, emitter, name) {
    this.wscName = name || 'WSClient';
    this.client = new WebSocket(address);
    this.owner = owner, this.emitter = emitter;
    this.notify = true;

    if (typeof this.client !== 'object') {
        throw new Error(this.wscName + '参数中client非法');
    }
    if (typeof this.emitter !== 'object') {
        throw new Error(this.wscName + '参数中emitter非法');
    }

    this.client.onopen = function () {
        Heartbeat.call(this);
        this.client.binaryType = 'arraybuffer';
        console.log('%s已建立链接', this.wscName);
        if (this.owner && typeof this.owner.WSCOpen === 'function') {
            this.owner.WSCOpen(this);
        }
    }.bind(this);

    this.client.onmessage = function (event) {
        let data = new Uint8Array(event.data);
        let msg = msgid.decode(data);
        let msgName = protocol.GetMsgName(msg.msgID);
        if (!msgName) {
            console.warn('%s未注册消息ID：%s', this.wscName, msg.msgID);
            return;
        }
        if (msgName === 'MSG_PONG') {
            console.debug('%s收到PONG', this.wscName);
            this.isAlive = true;
            return;
        }
        this.emitter.emit(msgName, data);
    }.bind(this);

    this.client.onclose = function (event) {
        clearTimeout(this.pingTimeout);
        console.log('%s已关闭链接', this.wscName);
        if (this.owner && typeof this.owner.WSCClose === 'function') {
            this.owner.WSCClose(this, this.notify);
            this.notify = true;
        }
    }.bind(this);

    this.client.onerror = function (event) {
        console.error("%s发生错误%s", this.wscName, JSON.stringify(event));
    }.bind(this);
}

WSClient.prototype.Send = function (data) {
    if (!this.IsOpen()) return;
    let startPos = data.byteOffset;
    let endPos = data.byteLength + data.byteOffset;
    let buffer = data.buffer.slice(startPos, endPos);
    this.client.send(buffer);
    return true;
}

WSClient.prototype.Close = function (notify) {
    this.notify = notify;
    if (!this.IsOpen()) return;
    clearTimeout(this.pingTimeout);
    console.debug('%s准备关闭链接', this.wscName);
    this.client.close();
}

WSClient.prototype.IsOpen = function () {
    return (this.client.readyState === WebSocket.OPEN);
}

WSClient.prototype.IsClosed = function () {
    return (this.client.readyState === WebSocket.CLOSED);
}

module.exports = WSClient;
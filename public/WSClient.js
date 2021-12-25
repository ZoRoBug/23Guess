// --------------------------------------------------------
// 终端websocket功能封装
// --------------------------------------------------------
// owner可实现以下回调函数接受信息：
// （1）WSCOpen 链接已经建立
// （2）WSCClose 链接已经关闭
// 本模块会发送各个消息协议事件
// --------------------------------------------------------
"use strict";
const WS = require('ws');
const log = require('./Log');
const protocol = require('../protocol/Protocol');
const msgid = require('../protocol/MsgID')['MsgID'];
const MSG_PONG = require('../protocol/MSG_PONG')['MSG_PONG'];

const MAX_MSG_SIZE = 100 * 1024;
const HEARTBEAT_DELAY_TIME = 5000;
const HEARTBEAT_CYCLE_TIME = 30000;

function Title() {
    let title = this.isServerClient ? '【WSS】' : '【WSC】';
    return title + this.client.ip;
}

function Heartbeat() {
    if (this.isServerClient) {
        this.isAlive = true;
    } else {
        clearTimeout(this.pingTimeout);
        this.pingTimeout = setTimeout(function () {
            log.Error('%s心跳包超时', Title.call(this));
            this.Terminate();
        }.bind(this), HEARTBEAT_CYCLE_TIME + HEARTBEAT_DELAY_TIME);
    }
}

function WSClient(owner, res, emitter) {
    this.owner = owner, this.emitter = emitter;
    if (typeof res === 'string') {
        this.client = new WS(res, { maxPayload: MAX_MSG_SIZE });
        this.client.ip = res;
    } else if (typeof res === 'object') {
        this.pingTimestamp = new Date().getTime();
        this.isServerClient = true;
        this.client = res;
    }

    if (typeof this.client !== 'object') {
        throw new Error('WSClient参数中client非法');
    }
    if (typeof this.emitter !== 'object') {
        throw new Error('WSClient参数中emitter非法');
    }

    this.client.on('open', function () {
        Heartbeat.call(this);
        log.Info('%s已建立链接', Title.call(this));
        if (this.owner && typeof this.owner.WSCOpen === 'function') {
            this.owner.WSCOpen(this);
        }
    }.bind(this));

    this.client.on('message', function (data) {
        let msg = null;
        try {
            msg = msgid.decode(data);
        } catch (err) {
            log.Error('%s数据解码出错：%s', Title.call(this), err);
            if (this.isServerClient) this.Close();
            return;
        }
        let msgName = protocol.GetMsgName(msg.msgID);
        if (!msgName) {
            log.Warn('%s未注册消息ID：%s', Title.call(this), msg.msgID);
            if (this.isServerClient) this.Close();
            return;
        }
        if (this.isServerClient && msgName === 'MSG_PING') {
            if (!this.msgPongData) {
                this.msgPongData = MSG_PONG.encode({
                    msgID: protocol.GetMsgId('MSG_PONG')
                }).finish();
            }
            if (this.IsOpen()) this.Send(this.msgPongData);
            return;
        }
        this.emitter.emit(msgName, this, data);
    }.bind(this));

    this.client.on('close', function (code, reason) {
        if (this.isServerClient) {
            log.Debug('%s已关闭链接C:%s-R:%s', Title.call(this), code, reason);
        } else {
            clearTimeout(this.pingTimeout);
            log.Info('%s已关闭链接C:%s-R:%s', Title.call(this), code, reason);
        }
        if (this.owner && typeof this.owner.WSCClose === 'function') {
            this.owner.WSCClose(this);
        }
    }.bind(this));

    this.client.on('unexpected-response', function (request, response) {
        log.Error('%s发生异常：%s', Title.call(this), response);
    }.bind(this));

    this.client.on('error', function (err) {
        log.Error('%s发生错误：%s', Title.call(this), err);
    }.bind(this));

    this.client.on('ping', function (data) {
        log.Debug('%s 收到PING', Title.call(this));
        Heartbeat.call(this);
    }.bind(this));

    this.client.on('pong', function (data) {
        log.Debug('%s 收到PONG', Title.call(this));
        Heartbeat.call(this);
    }.bind(this));
}

WSClient.prototype.GetIP = function () {
    return this.client.ip;
}

WSClient.prototype.GetOwner = function () {
    return this.owner;
}

WSClient.prototype.IsOpen = function () {
    return (this.client.readyState === WS.OPEN);
}

WSClient.prototype.IsClosed = function () {
    return (this.client.readyState === WS.CLOSED);
}

WSClient.prototype.SendHeartbeat = function (nowTimestamp) {
    if (!this.isServerClient || this.client.readyState !== WS.OPEN) return;
    if (nowTimestamp - this.pingTimestamp < HEARTBEAT_CYCLE_TIME) return;
    if (this.isAlive === false) { this.Terminate(); return; }
    this.pingTimestamp = nowTimestamp;
    this.isAlive = false;
    this.Ping();
}

WSClient.prototype.Ping = function (data) {
    if (this.client.readyState !== WS.OPEN) {
        log.Warn('%s未链接%s，发送PING失败',
            Title.call(this), this.client.readyState);
        return;
    }
    this.client.ping(data, function () {
        log.Debug('%s 发送PING', Title.call(this));
    }.bind(this));
    return true;
}

WSClient.prototype.Pong = function (data) {
    if (this.client.readyState !== WS.OPEN) {
        log.Warn('%s未链接%s，发送PONG失败',
            Title.call(this), this.client.readyState);
        return;
    }
    this.client.pong(data, function () {
        log.Debug('%s 发送PONG', Title.call(this));
    }.bind(this));
    return true;
}

WSClient.prototype.Send = function (data, callback) {
    if (this.client.readyState !== WS.OPEN) {
        log.Warn('%s未链接%s，发送消息失败',
            Title.call(this), this.client.readyState);
        return;
    }
    this.client.send(data, { binary: true }, callback);
    return true;
}

WSClient.prototype.Close = function (code, reason) {
    if (this.client.readyState !== WS.OPEN &&
        this.client.readyState !== WS.CONNECTING) return;
    log.Debug('%s准备关闭链接', Title.call(this));
    this.client.close(code, reason);
}

WSClient.prototype.Terminate = function () {
    if (this.client.readyState !== WS.OPEN &&
        this.client.readyState !== WS.CONNECTING) return;
    log.Warn('%s准备强制关闭链接', Title.call(this));
    this.client.terminate();
}

module.exports = WSClient;
// --------------------------------------------------------
// 服务websocket功能封装
// --------------------------------------------------------
// owner可实现以下回调函数接受信息：
// （1）WSSConnection 有客户端链接
// （2）WSSClose 端口监听已关闭
// （3）WSSHeartbeat 通知发生心跳包
// --------------------------------------------------------
"use strict";
const WS = require('ws');
const fs = require('fs');
const log = require('./Log');
const https = require('https');

const MAX_MSG_SIZE = 100 * 1024;

function Title() {
    let host = this.wss.options.host;
    let title = host ? '【WSS】ws://' : '【WSS】wss://';
    return title + this.host + ':' + this.port;
}

function WSServer(owner, port, host, ssl) {
    this.owner = owner;

    const options = {
        port: port, host: host,
        maxPayload: MAX_MSG_SIZE,
        clientTracking: false
    };
    if (ssl) {
        options.host = null, options.port = null;
        options.server = https.createServer({
            key: fs.readFileSync(ssl.keyFilePath),
            cert: fs.readFileSync(ssl.pemFilePath)
        }).listen(port);
    }

    this.wss = new WS.Server(options);
    this.host = host, this.port = port;

    this.wss.on('listening', function () {
        log.Info('%s已开启监听', Title.call(this));
    }.bind(this));

    this.wss.on('error', function (err) {
        throw new Error(Title.call(this) + '发生错误：' + err);
    }.bind(this));

    this.wss.on('close', function () {
        this.isClosed = true;
        clearInterval(this.timerHeartbeat);
        log.Info('%s已关闭监听', Title.call(this));
        if (this.owner && typeof this.owner.WSSClose === 'function') {
            this.owner.WSSClose(this);
        }
    }.bind(this));

    this.wss.on('connection', function (client, request) {
        client.ip = request.connection.remoteAddress;
        log.Debug('%s终端（%s）已连入', Title.call(this), client.ip);
        if (this.owner && typeof this.owner.WSSConnection === 'function') {
            this.owner.WSSConnection(client, request);
        }
    }.bind(this));

    this.timerHeartbeat = setInterval(function () {
        if (this.owner && typeof this.owner.WSSHeartbeat === 'function') {
            this.owner.WSSHeartbeat(this);
        }
    }.bind(this), 1500);
}

WSServer.prototype.Close = function () {
    if (this.isClosed) return;
    log.Debug('%s准备关闭监听', Title.call(this));
    clearInterval(this.timerHeartbeat);
    this.isClosed = true;
    this.wss.close();
}

module.exports = WSServer;
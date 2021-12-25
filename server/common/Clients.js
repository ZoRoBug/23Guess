// --------------------------------------------------------
// 链接终端集合
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const Client = require('./Client');

function Clients() {
}

Clients.prototype.on = function () {
    for (let client of this.mapClient.values()) {
        client.on.apply(client, arguments);
    }
}

Clients.prototype.Init = function (config) {
    this.mapClient = new Map();
    for (let i = 0; i < config.length; ++i) {
        let client = new Client();
        client.Init(config[i]);
        this.mapClient.set(config[i].id, client);
    }
}

Clients.prototype.Uninit = function () {
    for (let client of this.mapClient.values()) {
        client.Uninit();
    }
    this.mapClient.clear();
}

Clients.prototype.IsOpen = function () {
    for (let client of this.mapClient.values()) {
        if (!client.IsOpen()) return false;
    }
    return true;
}

Clients.prototype.Send = function (data) {
    for (let client of this.mapClient.values()) {
        client.Send(data);
    }
}

Clients.prototype.Get = function (id) {
    return this.mapClient.get(id);
}

module.exports = Clients;
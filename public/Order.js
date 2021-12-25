// --------------------------------------------------------
// 用户输入命令交互
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const readline = require('readline');

function HandlerOrder(cmd) {
    let arrCmd = cmd.split('//');
    if (!this.cmdList.has(arrCmd[0])) {
        console.warn('注意：%s命令不存在', arrCmd[0]);
        arrCmd[0] = 'help';
    }
    let objCmd = this.cmdList.get(arrCmd.shift());
    if (typeof objCmd.callback === 'function') {
        objCmd.callback(arrCmd);
    }
}

function Question() {
    this.readline.question('', function (cmd) {
        HandlerOrder.call(this, cmd);
        Question.call(this);
    }.bind(this));
}

function InitCmd() {
    this.Register('help', '命令帮助', function () {
        console.table(this.cmdList);
    }.bind(this));

    this.Register('exit', '绅士退出', function () {
        process.emit('SIGINT');
    });

    this.Register('kill', '强制退出', function () {
        process.exit();
    });
}

const order = {
    Init: function () {
        this.cmdList = new Map();
        InitCmd.call(this);

        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        Question.call(this);
    },

    Uninit: function () {
        this.readline.close();
    },

    Register: function (cmd, desc, callback) {
        if (this.cmdList.has(cmd)) {
            console.warn('注意：%s命令已注册', cmd);
            return;
        }
        this.cmdList.set(cmd, {
            desc: desc, callback: callback
        });
        return true;
    }
};

module.exports = order;
// --------------------------------------------------------
// 游戏轮次分配器
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

function OpenGetRoundTimer() {
    setTimeout(async function () {
        let replies = await g_gmredis.Batch([['GET', this.name]]);
        if (replies === null) { OpenGetRoundTimer.call(this); return; }
        this.round = replies[0] ? Number(replies[0]) + 1 : 1;
    }.bind(this), 3000);
}

const round = {
    Init: function (name) {
        if (typeof name !== 'string') return;
        this.name = name;
        OpenGetRoundTimer.call(this);
    },

    IsReady: function () {
        return this.round;
    },

    GetRound: function () {
        return this.round;
    },

    NewRound: function () {
        if (!this.IsReady()) return;
        let cmds = [['SET', this.name, ++this.round]];
        g_gmredis.Batch(cmds, function () { });
        return this.round;
    },
};

module.exports = round;
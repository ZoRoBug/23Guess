// --------------------------------------------------------
// 预扣本地存储管理接口
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";

const WITHHOLD_TITLE = 'WITHHOLD';

const withhold = {
    // 构造预扣key值
    GetKey: function (pid, location, round) {
        let key = WITHHOLD_TITLE + '_' + pid + '_' + location;
        if (round) key = key + '_' + String(round);
        return key;
    },

    // 完善预扣操作命令
    FillCmd: function (pid, location, round, cmds) {
        let key = this.GetKey(pid, location, round);
        for (let i = 0, len = cmds.length; i < len; ++i) {
            cmds[i].splice(1, 0, key);
        }
        return cmds;
    },
};

module.exports = withhold;
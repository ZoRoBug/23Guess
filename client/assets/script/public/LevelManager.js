// --------------------------------------------------------
// 等级图片管理
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";

let levelList = new Array();

function LoadHead(path) {
    if (levelList[path].loading) return;
    levelList[path].loading = true;
    cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
        if (err) {
            let errMsg = err.message || err;
            console.error('加载%s等级图片错误：%s', path, errMsg);
        }
        for (let i = 0; i < levelList[path].callbacks.length; ++i) {
            levelList[path].callbacks[i](spriteFrame);
        }
    });
}

const head = {
    Load: function (level, callback) {
        let levelPath = 'level/level' + level;
        let spriteFrame = cc.loader.getRes(levelPath, cc.SpriteFrame);
        if (spriteFrame instanceof cc.SpriteFrame) {
            callback(spriteFrame);
        } else {
            if (!levelList[levelPath]) {
                levelList[levelPath] = { callbacks: new Array() };
            }
            levelList[levelPath].callbacks.push(callback);
            LoadHead.call(this, levelPath);
        }
    },
};

module.exports = head;
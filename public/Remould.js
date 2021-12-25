// --------------------------------------------------------
// 对全局函数或对象进行改造
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const crypto = require('crypto');

// *对Math改造
// 数据进行MD5加密
Math.md5 = function (data) {
    let hash = crypto.createHash('md5');
    return hash.update(data).digest('hex');
}
// 随机给定范围整数
Math.randomnum = function (min, max) {
    if (typeof min !== 'number') return;
    if (typeof max !== 'number') return;
    if (min >= max) return min;
    let random = Math.random();
    return (min + Math.round(random * (max - min)));
};

// *对Date进行改造
// 添加format方法
Date.prototype.format = function (fmt) {
    if (typeof fmt !== 'string') return '';
    let o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1,
                (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
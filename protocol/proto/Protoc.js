// --------------------------------------------------------
// 编译Protocol.js中罗列的消息协议和数据包
// --------------------------------------------------------
// 编译后复制协议文件和js文件到客户端
// --------------------------------------------------------
"use strict";
const fs = require('fs');
const protocol = require("../Protocol");
const pbjs = require("protobufjs/cli/pbjs");

function Compile(name) {
    let desFilePath = '../' + name + '.js';
    let srcFilePath = './' + name + '.proto';
    console.log('开始编译' + srcFilePath);
    pbjs.main(['-t', 'static-module', '-w', 'commonjs', '-o', desFilePath, srcFilePath], function (err, output) {
        if (err) { console.error(err); return; }
        let fileData = output.replace('require("protobufjs/minimal");', 'protobuf;');
        let clientFilePath = '../../client/assets/script/protocol/' + name + '.js';
        fs.writeFile(clientFilePath, fileData, function (error) {
            if (error) console.error(clientFilePath + '写入失败');
        });
    });
}

console.log('开始编译协议...');

for (let i = 0; i < protocol.msg.length; ++i) {
    Compile(protocol.msg[i]);
}

for (let i = 0; i < protocol.bag.length; ++i) {
    Compile(protocol.bag[i]);
}

let fileNameList = ['Constant', 'Protocol'];
for (let i = 0; i < fileNameList.length; ++i) {
    let fileName = fileNameList[i];
    console.log('开始拷贝' + fileName);
    let protoSrcPath = '../' + fileName + '.js';
    let protoDesPath = '../../client/assets/script/protocol/' + fileName + '.js';
    let protoData = fs.readFileSync(protoSrcPath);
    fs.writeFile(protoDesPath, protoData, function (error) {
        if (error) console.error(protoDesPath + '写入失败');
    });
}

console.log('协议编译完成！');
// --------------------------------------------------------
// 客户端所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    gateserver: {
        address: 'ws://192.168.1.14:1963'
    },

    itemName: {
        impawn: 'HasImpawn',
        wxAuth: 'WXGetUserInfoAuth',
        signTime: 'SignTimestamp',
        hasSignin: 'HasSignin',
    },

    shareTitle: {
        Upgrade: [
            '我又升级了！新的皇冠，新的起点！'
        ],
        ResultWin: [
            '大吉大利，今晚吃鸡！'
        ],
        ResultDraw: [
            '哎！无敌是多么寂寞...'
        ],
        ResultLoss: [
            '我又猜错了，谁能帮帮我？'
        ],
        rankCrown: [
            '宇宙皇冠榜，你排在第几？'
        ],
        rankWinner: [
            '昨日吃鸡榜，你排在第几？'
        ]
    },

    hookTips: [
        '您已连续在线%s小时，请休息休息！',
        '您已连续在线%s小时，请合理安排游戏时间！',
        '您已累计在线%s小时，请合理安排游戏时间。请注意休息！',
    ],

    impawn: {
        rule: '游戏规则\r\n\r\n\
游戏根据23双方金币总额的十万位数字相加所得个位数判定胜负，个位数<=2则猜2胜，个位数>=3则猜3胜。举例：\r\n\r\n\
（1）猜2总额：323,000，猜3总额：1,912,000，猜2总额十万位3 + 猜3总额十万位9 = 12，12的个位数2 <= 2，则猜2胜\r\n\r\n\
（2）猜2总额：223,000，猜3总额：1,112,000，猜2总额十万位2 + 猜3总额十万位1 = 3，3的个位数3 >= 3，则猜3胜\r\n\r\n\
（3）猜2总额：12,000，猜3总额：11,530,000，猜2总额小于十万取最高位1 + 猜3总额十万位5 = 6，6的个位数6 >= 3，则猜3胜\r\n\r\n\
千人同场竞技，胜负自己掌握，考验智力，经验和勇气',
    },

    shareImgs: [
        {
            title: '考验智力，经验和勇气，你敢挑战么？',
            url: 'https://mmocgame.qpic.cn/wechatgame/U0KocDR9Xa31gPruY2rw2aHaMrbjhGMK4rZLvTer2xceeHl3LwDnsADIXeTp3xH9/0',
            id: 'yPg5wliXTE+eh5dxzIcB0A=='
        },
        {
            title: '@所有聪明人，还等什么，赶快加入吧！',
            url: 'https://mmocgame.qpic.cn/wechatgame/U0KocDR9Xa2FmCnNicUhs93h0GNustUnppicNorE9BberAicAvOvL6V675EeqSh86VV/0',
            id: '6O7BXj4xQdaN0HiJ53M0VQ=='
        },
        {
            title: '猜2风险刺激，猜3细水长流，快来试试吧！',
            url: 'https://mmocgame.qpic.cn/wechatgame/U0KocDR9Xa2juTSZmoNpeiaXzfgt5y5dibS0aZ0BjhOQnILbIpYvtIfQ7yGaF6xQ5X/0',
            id: 'rsIlYhyERuOuNw1Xw1JtXg=='
        },
        {
            title: '游戏规则简单，千人同场竞技，玩家无法作弊。',
            url: 'https://mmocgame.qpic.cn/wechatgame/U0KocDR9Xa2ib53FQvLh3bDbKLtdwfywaYgwhz0x7v9C13ZL5mMkibqCbuhJQwSWgj/0',
            id: '3Qq9oyZVT+abYe03VvHYEQ=='
        },
    ],
};

module.exports = config;
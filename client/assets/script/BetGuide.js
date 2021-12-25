const config = require('./Config');

function UpdatePage(stepPage) {
    if (stepPage > 2) return;
    let firstPage = (stepPage === 1);

    let nodeShadomBet1 = cc.find('ShadomBet1', this.node);
    let nodeShadomBet2 = cc.find('ShadomBet2', this.node);
    let nodeShadomSum = cc.find('ShadomSum', this.node);
    let nodeBoxSum = cc.find('BoxSum', this.node);
    let nodeBoxBet1 = cc.find('BoxBet1', this.node);
    let nodeBoxBet2 = cc.find('BoxBet2', this.node);
    nodeShadomBet1.active = firstPage;
    nodeShadomBet2.active = firstPage;
    nodeShadomSum.active = !firstPage;
    nodeBoxSum.active = firstPage;
    nodeBoxBet1.active = !firstPage;
    nodeBoxBet2.active = !firstPage;

    let nodeGuideTips = cc.find('GuideBg/Tips', this.node);
    let nodeGuideStep = cc.find('GuideBg/Step', this.node);
    let nodeGuideOper = cc.find('GuideBg/Oper/Background/Label', this.node);
    let labelGuideTips = nodeGuideTips.getComponent(cc.Label);
    let labelGuideStep = nodeGuideStep.getComponent(cc.Label);
    let labelGuideOper = nodeGuideOper.getComponent(cc.Label);
    if (firstPage) {
        labelGuideOper.string = '下一步';
        labelGuideStep.string = '1 / 2';
        labelGuideTips.string = '第1步：点击此区域单位按钮确定猜分金额';
    } else {
        labelGuideOper.string = '我懂了';
        labelGuideStep.string = '2 / 2';
        labelGuideTips.string = '第2步：点击左右两个区域按钮确定猜分对象';
    }
}

cc.Class({
    extends: cc.Component,

    start() {
        let itemName = config.itemName.impawn;
        this.node.active = !cc.sys.localStorage.getItem(itemName);

        this.stepPage = 1;
        UpdatePage.call(this, this.stepPage);

        let nodeOperBtn = cc.find('GuideBg/Oper', this.node);
        nodeOperBtn.on(cc.Node.EventType.TOUCH_END, function () {
            if (this.stepPage >= 2) {
                this.node.active = false;
                let itemName = config.itemName.impawn;
                cc.sys.localStorage.setItem(itemName, true);
                g_msgbox.Show(null, config.impawn.rule, g_msgbox.MB_OK, null, {
                    width: 420, height: 580
                });
            } else {
                UpdatePage.call(this, ++this.stepPage);
            }
        }, this);
    },
});

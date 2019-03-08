(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameTools.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8bd65hE/mpF7rSpFAblLS6g', 'GameTools', __filename);
// Script/GameTools.js

"use strict";

// let canvas = require("../../build/wechatgame/libs/weapp-adapter/window");

var GameTools = {
    // pickname == 'shareTicket' 则拉取群排名
    sharePicture: function sharePicture(pickName) {
        var title = "一起来玩贪吃蛇吧!";
        if (pickName == "shareTicket") {
            title = "看看你在群里排第几？快来和我一起挑战贪吃蛇吧.";
        } else if (pickName != undefined && pickName != null) {
            // 结束分享
            title = "我的了" + pickName + "分," + title;
        }

        if (CC_WECHATGAME) {
            window.wx.shareAppMessage({
                title: title,
                query: "score",
                // imageUrl: canvas.toTempFilePathSync({
                //     destWith: 300,
                //     destHeight: 200,
                // }),
                success: function success(res) {
                    if (res.shareTickets != undefined && res.shareTickets.length > 0) {
                        if (pickName == "shareTickets") {
                            // 查询群排名
                            window.wx.postMessage({
                                command: "fetchGroup",
                                shareTicket: res.shareTickets[0]
                            });
                        }
                    }
                }
            });
        } else {
            cc.log("执行了截图");
        }
    },
    pushScore: function pushScore(score) {
        if (CC_WECHATGAME) {
            console.log('提交分数' + score);
            window.wx.postMessage({
                command: "pushScore",
                score: score
            });
        } else {
            cc.log("提交得分:" + score);
        }
    }
};

module.exports = GameTools;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameTools.js.map
        
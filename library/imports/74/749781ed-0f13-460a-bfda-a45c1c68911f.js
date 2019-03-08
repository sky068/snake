"use strict";
cc._RF.push(module, '74978HtDxNGCr/apFwcaJEf', 'GameOverCtrl');
// Script/GameOverCtrl.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        shareTicket: null,
        rankPanel: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        if (CC_WECHATGAME) {
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 362;
            window.sharedCanvas.height = 640;
        }
    },
    getRank: function getRank() {
        if (CC_WECHATGAME) {
            // 发消息给子域
            if (this.shareTicket != null) {
                window.wx.postMessage({
                    // messageType: 5,
                    // MAIN_MENU_NUM: GameConfig.MAIN_MENU_NUM,
                    // shareTicket: this.shareTicket
                });
            } else {
                window.wx.postMessage({
                    command: "fetchFriends"
                });
            }
        } else {
            // let gameTypeNode = new cc.Node();
            // gameTypeNode.addComponent(cc.Label).string = "暂无排行榜数据";
            // this.node.addChild(gameTypeNode);
            cc.log("获取排行榜数据。");
        }
    },
    _updateSubDomainCanvas: function _updateSubDomainCanvas() {
        if (CC_WECHATGAME) {
            if (window.sharedCanvas != undefined) {
                this.tex.initWithElement(window.sharedCanvas);
                this.tex.handleLoadedTexture();
                this.rankPanel.spriteFrame = new cc.SpriteFrame(this.tex);
            }
        }

        this.rankPanel.node.active = CC_WECHATGAME;
    },
    update: function update(dt) {
        this._updateSubDomainCanvas();
    }
});

cc._RF.pop();
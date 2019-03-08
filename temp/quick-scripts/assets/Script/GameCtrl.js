(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '838e9UjNJxCXoQvbLq+kKBb', 'GameCtrl', __filename);
// Script/GameCtrl.js

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

/**
 *  参考：https://forum.cocos.com/t/topic/73426
 *  地图为20*20大小，左下角编号为0， 向右每个格子加1，向上每个格子加20，
 *  380
 *  360
 *  340
 *  320
 *  300
 *  280
 *  260
 *  240
 *  220
 *  200
 *  180
 *  160
 *  140
 *  120
 *  100
 *  80
 *  60
 *  40.............................................49
 *  20.............................................29
 *  0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19
 */

var GameTools = require("./GameTools");

cc.Class({
    extends: cc.Component,

    properties: {
        g: cc.Graphics,
        startLayer: cc.Node,
        overLayer: cc.Node,
        scoreLabel: cc.Label,
        bestLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.initGame();
    },
    initGame: function initGame() {
        this.canControl = false;
        this.moveOffset = 1; // 蛇头变化值，默认向右走 +1
        this.nextIndex = 0; // 下一个蛇头位置id 
        this.snake = [202, 201];
        this.food = 115;

        this.s = 0;
        this.mSpeed = 5;

        this.scoreLabel.string = this.s = 0;
        var best = cc.sys.localStorage.getItem("best_score");
        if (!best) {
            best = 0;
            cc.sys.localStorage.setItem("best_score", 0);
        }
        this.bestLabel.string = best;

        this._startPos = cc.v2(0, 0);
        this._endPos = cc.v2(0, 0);
    },
    onEnable: function onEnable() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },
    onDisable: function onDisable() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.Canvas.instance.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        cc.Canvas.instance.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        cc.Canvas.instance.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },
    onKeyDown: function onKeyDown(keyboardE) {
        if (!this.canControl) {
            return;
        }
        cc.log("keyCode: " + keyboardE.keyCode);
        this.moveOffset = this.snake[1] - this.snake[0] == (this.nextIndex = [-1, 20, 1, -20][keyboardE.keyCode - 37] || this.moveOffset) ? this.moveOffset : this.nextIndex;
    },
    onTouchStart: function onTouchStart(e) {
        this._startPos = e.getLocation();
    },
    onTouchMove: function onTouchMove(e) {
        this._endPos = e.getLocation();
    },
    onTouchEnd: function onTouchEnd(e) {
        var delta = cc.v2(this._endPos.x - this._startPos.x, this._endPos.y - this._startPos.y);
        if (Math.abs(delta.x) < 10 && Math.abs(delta.y) < 6) {
            return;
        }
        if (Math.abs(delta.x) > Math.abs(delta.y)) {
            if (delta.x < 0) {
                // 左
                e.keyCode = 37;
            } else {
                // 右
                e.keyCode = 39;
            }
        } else {
            if (delta.y < 0) {
                // 下
                e.keyCode = 40;
            } else {
                // 上
                e.keyCode = 38;
            }
        }
        this.onKeyDown(e);
    },
    onBtnDown: function onBtnDown(e, v) {
        e.keyCode = ~~v;
        this.onKeyDown(e);
    },
    move: function move() {
        this.nextIndex = this.snake[0] + this.moveOffset;
        // 把新蛇头加入进去
        this.snake.unshift(this.nextIndex);
        // 判断新蛇头是否碰到自己
        if (this.snake.indexOf(this.nextIndex, 1) > 0) {
            this.gameOver();
        }

        // 蛇头越界修复
        if (this.moveOffset == -20 && this.nextIndex < 0) {
            this.snake[0] = this.snake[0] + 400;
        } else if (this.moveOffset == 20 && this.nextIndex > 399) {
            this.snake[0] = this.snake[0] - 400;
        } else if (this.moveOffset == 1 && (this.nextIndex % 20 == 0 || this.nextIndex > 399)) {
            this.snake[0] = this.snake[0] - 20;
        } else if (this.moveOffset == -1 && (this.nextIndex % 20 == 19 || this.nextIndex < 0)) {
            this.snake[0] = this.snake[0] + 20;
        }

        // 画出当前蛇头
        this.draw(this.snake[0], cc.Color.GREEN);
        // 如果当前蛇头是产生的糖果，则产生新的糖果
        if (this.nextIndex == this.food) {
            // 产生糖果的位置不能存在蛇
            while (this.snake.indexOf(this.food = ~~(Math.random() * 400)) >= 0) {}
            // 产生新的食物
            this.draw(this.food, cc.Color.YELLOW);
            this.addScore(1);
        } else {
            // 删除蛇尾，即整体移动一格
            this.draw(this.snake.pop(), cc.Color.GRAY);
        }
    },
    draw: function draw(mapIndex, color) {
        this.g.fillColor = color;
        this.g.fillRect(mapIndex % 20 * 18 + 2, ~~(mapIndex / 20) * 18 + 2, 16, 16);
    },
    start: function start() {},
    startGame: function startGame() {
        var _this = this;

        // 棋盘
        for (var i = 0; i < 400; i++) {
            this.draw(i, cc.Color.GRAY);
        }
        // 初始蛇
        this.snake.forEach(function (v) {
            _this.draw(v, cc.Color.GREEN);
        });

        // 食物
        this.draw(this.food, cc.Color.YELLOW);

        this.schedule(this.move, 1 / this.mSpeed);
        this.canControl = true;

        this.startLayer.active = false;
        this.overLayer.active = false;
    },
    restart: function restart() {
        this.initGame();
        this.startGame();
    },
    gameOver: function gameOver() {
        var _this2 = this;

        cc.log("gameover.");
        this.unschedule(this.move);
        this.canControl = false;
        // 变红色
        this.snake.forEach(function (v) {
            _this2.draw(v, cc.Color.RED);
        });

        var best = cc.sys.localStorage.getItem("best_score");
        cc.sys.localStorage.setItem("best_score", this.s > best ? this.s : best);
        GameTools.pushScore(this.s > best ? this.s : best);

        this.scheduleOnce(function () {
            _this2.overLayer.active = true;
            _this2.overLayer.getComponent("GameOverCtrl").getRank();
        }, 1);
    },
    addScore: function addScore(s) {
        this.s += s;
        this.scoreLabel.string = this.s;
        if (this.s > 10) {
            var sp = this.mSpeed + Math.floor(this.s / 10);
            if (sp <= 15) {
                // 更新移动速度
                cc.log("sp: " + sp);
                this.schedule(this.move, 1 / sp);
            }
        }
    }

    // update (dt) {},

});

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
        //# sourceMappingURL=GameCtrl.js.map
        
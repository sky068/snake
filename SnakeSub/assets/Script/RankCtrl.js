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
        content: cc.Node,
        rankItemPrefab: cc.Prefab,
        loadingLabel: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.clearRank();

        if (CC_WECHATGAME){
            console.log("this is wechatgame.");
            window.wx.onMessage((data)=>{
                console.log("接收主域发来消息：", data);
                switch (data.command){
                    case 'pushScore':{
                        this.pushScore(data.score);
                        break;
                    }
                    case 'fetchFriends':{
                        this.fetchFriends();
                        break;
                    }
                    case 'fetchGroup': {
                        this.fetchGroup(data.shareTicket);
                        break;
                    }
                }
            });
        }
    },

    pushScore(score){
        window.wx.getUserCloudStorage({
            keyList: ['score'],
            success: function(res){
                console.log("getUserCloudStorage success: + " + res);
                if (res.KVDataList.length != 0){
                    let MAIN_MENU_NUM = 2;

                    // 下面用于把排行榜显示于小游戏中心
                    if (MAIN_MENU_NUM == 1) {
                        window.wx.setUserCloudStorage({
                            KVDataList: [{
                                key: "rank1",
                                value: "{\"wxgame\":{\"score\":" + (getres.KVDataList[0].value > score ? getres.KVDataList[0].value : score) + ",\"update_time\": " + new Date().getTime() + "}}"
                            }],
                        });
                    }

                    if (res.KVDataList[0].value > score) {
                        // 不需要更新
                        return;
                    }
                }

                // 对用户托管数据进行写数据操作, key 和 value必须都是字符串
                window.wx.setUserCloudStorage({
                    KVDataList: [{key: "score", value: "" + score}],
                    success: function (res) {
                        console.log('setUserCloudStorage', 'success', res)
                    },
                    fail: function (res) {
                        console.log('setUserCloudStorage', 'fail')
                    },
                    complete: function (res) {
                        console.log('setUserCloudStorage', 'ok')
                    }
                });
            },
            fail: function(res){
                console.log("getUserCloudStorage failed.");
            },
            complete: function(res){
                console.log("getUserCloudStorage complete.");
            }
        });
    },

    fetchFriends(){
        if (CC_WECHATGAME) {
            wx.getUserInfo({
                openIdList: ['selfOpenId'],
                success: (userRes) => {
                    console.log('getUserInfo success', userRes.data);
                    let userData = userRes.data[0];
                    //取出所有好友数据
                    wx.getFriendCloudStorage({
                        keyList: ["score"],
                        success: res => {
                            console.log("wx.getFriendCloudStorage success", res);
                            let data = res.data;
                            this._showRankData(userData, data);
                        },
                        fail: res => {
                            console.log("wx.getFriendCloudStorage fail", res);
                            this.loadingLabel.string = "数据加载失败，请检测网络，谢谢。";
                        },
                    });
                },
                fail: (res) => {
                    this.loadingLabel.string = "数据加载失败，请检测网络，谢谢。";
                }
            });
        } else {
            let userData = {nickname: "徐小燕11"};
            let data = new Array();
            for (let i = 0; i < 12; i++) {
                data[i] = {
                    KVDataList: [{key: "x1", value: "12" + i}],
                    avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/9h9G1VucURhfeXmbIicrXRnuJAvxdBfAC3xeSvfvjsYAfhJahJvU9ic2dTUpn5icLich8QDGeB0ojwUWfJia16O1yXQ/132",
                    nickname: "徐小燕" + i,
                    openid: "sadfsdg" + i
                }
            }
            this._showRankData(userData, data);
        }
    },

    fetchGroup(shareTicket){
        if (CC_WECHATGAME) {
            wx.getUserInfo({
                openIdList: ['selfOpenId'],
                success: (userRes) => {
                    console.log('getUserInfo success', userRes.data)
                    let userData = userRes.data[0];
                    //取出所有好友数据
                    wx.getGroupCloudStorage({
                        shareTicket: shareTicket,
                        keyList: ["score"],
                        success: res => {
                            console.log("wx.getGroupCloudStorage success", res);
                            let data = res.data;
                            this._showRankData(userData, data);
                        },
                        fail: res => {
                            console.log("wx.getFriendCloudStorage fail", res);
                            this.loadingLabel.string = "数据加载失败，请检测网络，谢谢。";
                        },
                    });
                },
                fail: (res) => {
                    this.loadingLabel.string = "数据加载失败，请检测网络，谢谢。";
                }
            });
        } else {
            let userData = {nickname: "徐小燕11"};
            let data = new Array();
            for (let i = 0; i < 12; i++) {
                data[i] = {
                    KVDataList: [{key: "x1", value: "12" + i}],
                    avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/9h9G1VucURhfeXmbIicrXRnuJAvxdBfAC3xeSvfvjsYAfhJahJvU9ic2dTUpn5icLich8QDGeB0ojwUWfJia16O1yXQ/132",
                    nickname: "徐小燕" + i,
                    openid: "sadfsdg" + i
                }
            }
            this._showRankData(userData, data);
        }
    },

    _showRankData(userData, data){
        this.clearRank();

        this.loadingLabel.node.active = false;
        
        data.sort((a, b) => {
            if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                return 0;
            }
            if (a.KVDataList.length == 0) {
                return 1;
            }
            if (b.KVDataList.length == 0) {
                return -1;
            }
            return b.KVDataList[0].value - a.KVDataList[0].value;
        });
        for (let i = 0; i < data.length; i++) {
            var playerInfo = data[i];
            var item = cc.instantiate(this.rankItemPrefab);
            item.getComponent('ItemCtrl').init(i, playerInfo);
            this.content.addChild(item);
            // if (data[i].avatarUrl == userData.avatarUrl) {
            //     let userItem = cc.instantiate(this.prefabRankItem);
            //     userItem.getComponent('RankItem').init(i, playerInfo);
            //     userItem.y = -354;
            //     this.node.addChild(userItem, 1, 1000);
            // }
        }
    },

    clearRank(){
        this.loadingLabel.node.active = true;
        this.content.removeAllChildren();
        this.content.height = 0;
    }

    // update (dt) {},
});

//弹幕轮询
setInterval(function () {
    if (((DanmuCtrlSwich == true) || (DanmuOrderSwich == true)) && (RoomID != "0")) {//判断开关状态，全关则停止轮询
        $.getJSON(BiliDanMuAPI, { roomid: RoomID }, function (data) {//获取数据
            if (eval(data).error == 1) {//错误请求处理
                TopMsg("房间错误", RoomID, true)
            } else {
                var adminMsg = eval(data).data.admin;//管理信息
                var roomMsg = eval(data).data.room;//房间信息
                //管理功能:切歌，强制点歌，播放歌单....
            if (DanmuCtrlSwich == true) {
                for (i in adminMsg) {
                    if (((Date.parse(new Date()) / 1000) - 10) <= timeLine(adminMsg[i].timeline)) {
                            //切歌 歌单 点歌
                            if (adminMsg[i].text.slice(0, 4) == "#歌单 ") {
                                //设置歌单
                                getSongList(Number(adminMsg[i].text.slice(4)));
                                TopMsg("导入歌单", adminMsg[i].text.slice(4), false);
                            } else if (adminMsg[i].text.slice(0, 4) == "#播放 ") {
                                //强制播放歌曲
                                SongSearch(adminMsg[i].text.slice(4))
                            } else if (adminMsg[i].text.slice(0, 3) == "#切歌") {
                                //强行切换歌曲
                                TopMsg("已切歌", "", false);
                                NextMusic(true,true);
                            } else if (adminMsg[i].text.slice(0, 4) == "#提示 ") {
                                //发送顶部提示
                                TopMsg("提示", adminMsg[i].text.slice(4), true);
                            } else if (adminMsg[i].text.slice(0, 3) == "#歌词") {
                                //切换歌词
                                TopMsg("歌词切换", "", false);
                                SpectrumSwichChange();
                            }
                        }
                    }
                }
                //观众点歌
                if (DanmuOrderSwich == true) {
                    for (i in roomMsg) {
                        if (((Date.parse(new Date()) / 1000) - 10) <= timeLine(roomMsg[i].timeline)) {
                            if (roomMsg[i].text.slice(0, 4) == "#点歌 ") {
                                //相关函数
                                if (Number(roomMsg[i].isadmin) == 1) {
                                    //管理员点歌
                                    //点歌函数
                                    GetOrederList(roomMsg[i].text.slice(4))
                                } else if (order_CD_list.includes(roomMsg[i].uid)) {
                                    //点歌CD
                                    TopMsg("点歌失败", "冷却中", true);
                                } else if (order_list.length >= orderListLength) {
                                    //歌单已满
                                    TopMsg("点歌失败", "歌单已满", true);
                                } else {
                                    //观众点歌
                                    order_CD_list.push(roomMsg[i].uid);
                                    //点歌函数
                                    GetOrederList(roomMsg[i].text.slice(4))
                                }
                            }
                        }
                    }
                }
            }
        }).fail(function () {//错误处理
            TopMsg("弹幕获取失败",'', true)
            console.log("[网络错误]弹幕服务器无响应或者返回了错误的数据")
        })
    }
}, 10000);

function timeLine(timeLine) {
    var date = new Date(timeLine);
   return(date.getTime()/1000)
}
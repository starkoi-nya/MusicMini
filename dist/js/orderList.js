//点歌列表 弹幕控制 动态更新歌单
//点歌数组[歌曲id]
var order_list = new Array;
//点歌CD列表
var order_CD_list = new Array;
//点歌列表状态
var orderListSign = false;
//待删除的歌
var orderListDelID = null;
//点歌队列长度
var orderListLength = 5;
//点歌间隔（秒）
var orderSecond = 300;

function SongSearch(songName) {
    $.getJSON(ColudMusicAPI+"/search", { limit: 1, keywords: songName }, function (data) {
        if (Number(eval(data).result.songCount) == 0) {
            TopMsg("播放失败", songName + "不存在", true);
        } else {
            TopMsg("播放", songName, false);
            var sid = eval(data).result.songs[0].id;
            MusicPlay(sid);
            PlayIconChange(sid)
        }
    })
}
function GetOrederList(songName) {
    $.getJSON(ColudMusicAPI+"/search", { limit: 1, keywords: songName }, function (data) {
        if (Number(eval(data).result.songCount)==0) {
            TopMsg("点歌失败", songName + "不存在", true);
        } else {
            var sid = eval(data).result.songs[0].id;
            var sname = eval(data).result.songs[0].name;
            //加入点歌表
            order_list.push(sid);
            //列表操作
            $("#SongListCell" + firstSongId).before("<div id='SongListCell" + sid + "' class='songListCell orderListCell" + sid + "'><a style='display : none'>" + sid + "</a><p class='songListIcon' style='display : none'>&nbsp;▶</p><label> " + sname + "</label><div type='button' class='songListButton orderListDelButton" + sid +" layui-btn layui-btn-danger'>×</div></div>");
            TopMsg("点歌成功", sname, false);
            orderListSign = true;
            //若无播放列表且点歌列表只有一首歌且当前为暂停状态，则自动播放点歌
            if ((play_list.length == 0) && (order_list.length == 1) && (oAudio.paused)) {
                PlayOrederList(sid);
            }
            //点击响应
            $(".orderListCell" + sid).click(function () {
                var sid = Number($(this).children("a").text())
                //console.log(music_num)
                PlayOrederList(sid);
               })
            $(".orderListDelButton" + sid).click(function () {
                var sid = Number($(this).parent().children("a").text())
                if (orderListDelID == sid) {
                    NextMusic()
                } else {
                    OrederListDel(sid);
                }
            })
        }
    })
}

function PlayOrederList(sid) {
    //更新播放标识,播放歌曲，播完删表
    var i = order_list.indexOf(sid);
    MusicPlay(order_list[i]);
    PlayIconChange(order_list[i])
    //记录准备删除的id
    orderListDelID = sid;
    //加入历史记录
    BeforeSign == false;
    before_list.unshift(order_list[i])
}
//删除函数
function OrederListDel(sid) {
    $("#SongListCell" + sid).remove()
    order_list.splice(order_list.indexOf(sid),1)
}
//递归更新CD
function CotList() {
    setTimeout(function () {
        order_CD_list.shift();
        CotList();
    }, orderSecond * 1000)
}
$(document).ready(function () {
    CotList();
})
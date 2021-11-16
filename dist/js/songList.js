var play_list = new Array;
var firstSongId = 0;
var music_num = -1;
function getSongList(SongListID) {
    var lid = SongListID;
    $.getJSON(ColudMusicAPI + "/playlist/detail", { id: lid }, function (data) {
        var l_data = eval(data).playlist.trackIds;
        //console.log(l_data.length)
        if (l_data.length == 0) {
            $("#SongOrderInput").val("");
            $("#SongOrderInput").attr("placeholder", "歌单为空");
            return;
        } else {
            //清空播放列表
            play_list = [];
            music_num = 0;
            $("#SongList").children(".songListCell2").remove();
            //导入播放列表
            //歌名及ID处理
            var play_list_name = new Array();
            for (var i in l_data) {
                play_list[i] = l_data[i].id
            }
            firstSongId = play_list[0];
            var get_id_list = play_list.toString()
            $.getJSON(ColudMusicAPI + "/song/detail", { ids: get_id_list }, function (data) {
                var ls_data = eval(data).songs;
                for (var i in ls_data) {
                    play_list_name[i] = ls_data[i].name
                    play_list_name[i].replace(/\s+/g, '&nbsp;');
                }
                for (var i in ls_data) {
                    $("#SongList").append("<div id='SongListCell" + play_list[i] + "' class='songListCell songListCell2'><a style='display : none'>" + i + "</a><p class='songListIcon' style='display : none'>&nbsp;▶</p><label> " + (Number(i) + 1) + "." + play_list_name[i] + "</label></div>");
                }
                $("#SongOrderInput").val("");
                $("#SongOrderInput").attr("placeholder", "歌单导入完成");
                //播放第一首歌曲
                MusicPlay(play_list[0]);
                PlayIconChange(play_list[0]);
                //检测首次播放
                Play();
                //加入播放记录
                BeforeSign == false;
                before_list.unshift(play_list[0])
                //点击响应
                $(".songListCell").click(function () {
                    music_num = Number($(this).children("a").text())
                    //console.log(music_num)
                    MusicPlay(play_list[music_num])
                    PlayIconChange(play_list[music_num])
                    //加入历史记录
                    BeforeSign == false;
                    before_list.unshift(play_list[music_num])
                })
            })
        }
    }).fail(function () {//错误处理
        TopMsg("歌单获取失败", '', true)
        $("#SongOrderInput").val("");
        $("#SongOrderInput").attr("placeholder", "服务器无响应或返回数据有误");
        console.log("[网络错误]网易云API服务器无响应或者返回了错误的数据")
    })
}
//播放模式选择
$(document).ready(function () {
    var Music = document.getElementById("Music");
    Music.addEventListener("ended", function () {
        BeforeSign = false;
        NextMusic(false,true)
    });
});
//下一首歌
let nextMusicCDsign = true;
function NextMusic(buttonClick = false, CD = false) {
    //切歌CD
    if (nextMusicCDsign || CD) {
        nextMusicCDsign = false;
        setTimeout(function () {
            nextMusicCDsign = true;
        }, 1000)
        //检查历史记录，有历史，下一曲播放历史
        if ((BeforeSign == true) && (BeforeSongFlag != 0)) {
            BeforeSongFlag--;
            MusicPlay(before_list[BeforeSongFlag])
            PlayIconChange(before_list[BeforeSongFlag])
        } else {//无历史，则正常下一曲
            //更新点歌列表
            if (orderListDelID != null) {
                OrederListDel(orderListDelID)
            }
            //更新点歌标识
            if (order_list.length == 0) {
                orderListSign = false;
                orderListDelID = null;
            }
            if (orderListSign) {
                //优先播放点歌列表
                PlayOrederList(order_list[0])
            } else if (play_list.length == 0) {
                //空播放列表弹信息
                TopMsg("无下一曲", "", true)
                Play('pause');
                ////更新播放器样式
                //歌曲
                $("#Music").attr("src", "mp3/TitleMusic.mp3");
                //歌名
                $("#SongName").empty();
                $("#SongName").append("音乐播放器");
                //艺术家
                $("#SongArtist").empty();
                $("#SongArtist").append("星恋幻象");
                //封面
                document.getElementById("SongImg").style.backgroundImage = "url(./img/songImg.jpg)";
                //歌词
                $("#LyricText").text("愿每天对你而言，都是美好的一天。");
                $("#LyricTextTranslation").hide()
                $("#LyricHr").hide()
                $("#LyricText").css("top", "50%");
            } else {
                if (buttonClick == false) {
                    //播放模式选择(自动)
                    switch (Number(PlayMode)) {
                        case 0://列表循环
                            music_num += 1;
                            if (play_list.length <= music_num) {
                                music_num = 0
                            };
                            break;
                        case 1://单曲循环
                            if (play_list.length <= music_num) {
                                music_num = 0
                            };
                            break;
                        case 2://随机播放
                            music_num = Math.floor(Math.random() * play_list.length);
                            break;
                        default:
                            music_num += 1;
                            if (play_list.length <= music_num) {
                                music_num = 0
                            };
                    }
                } else {
                    //播放模式选择(按键)
                    switch (Number(PlayMode)) {
                        case 0://列表循环
                            music_num += 1;
                            if (play_list.length <= music_num) {
                                music_num = 0
                            };
                            break;
                        case 1://单曲循环（与单曲相同）
                            music_num += 1;
                            if (play_list.length <= music_num) {
                                music_num = 0
                            };
                            break;
                        case 2://随机播放
                            music_num = Math.floor(Math.random() * play_list.length);
                            break;
                        default:
                            music_num += 1;
                            if (play_list.length <= music_num) {
                                music_num = 0
                            };
                    }
                }
                //播放歌曲 更新标识
                MusicPlay(play_list[music_num])
                PlayIconChange(play_list[music_num])
                //添加id到历史记录
                if ((Number(PlayMode) != 1) || (buttonClick == true)) {
                    before_list.unshift(play_list[music_num])
                }
            }
        }
    }
}

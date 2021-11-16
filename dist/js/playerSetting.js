//设置菜单
$(document).ready(function () {
    $("#SettingButton").click(function () {
        $(".mainMenu").animate({ width: 'toggle' }, 500);
        $(".songList").animate({ width: 'hide' }, 500);
        if (hideListTimeSign == false) {
            HideList()
            hideListTimeSign = true;
        }
    });
});
$(document).ready(function () {
    //歌单
    $("#ListButton").click(function () {
        $(".songList").animate({ width: 'toggle' }, 500);
        $(".mainMenu").animate({ width: 'hide' }, 500);
        if (hideListTimeSign == false) {
            HideList()
            hideListTimeSign = true;
        }
        //自动滚动歌单
        setTimeout(function () {
            try {
                $(".songList").animate({
                    scrollTop: ($(".songList").scrollTop() + $(".songListIcon[style='']").parent().position().top) - ($(".songListIcon[style='']").parent().outerHeight() * 2)
                }, 300)
            } catch (err) {
                console.log("[常规警告]暂无歌单,自动滚动无法执行")
            }
        }, 500)
    });
});

//自动缩回
$(document).ready(function () {
    $("#Main").mouseover(function () {
        hideListTime = 10;
    });
});

let hideListTime = 0;
let hideListTimeSign = false;
function HideList() {
    setTimeout(function () {
        if (hideListTime == 0) {
            $(".songList").animate({ width: 'hide' }, 500);
            $(".mainMenu").animate({ width: 'hide' }, 500);
            hideListTimeSign = false;
        } else {
            hideListTime--;
            HideList();
        }
    }, 1000)
}

//播放按钮
$(document).ready(function () {

    //关联音频
    oAudio = document.getElementById('Music');
    //按钮
    $("#PlayButton").click(function () {
        Play();
    })
});
let firstPlaySign = true;
function Play(mode = 'auto') {
    //第一次播放自动加载可视化效果，适配谷歌浏览器
    if (firstPlaySign == true) {
        $(".visualization").animate({ height: 'show' }, 500);
        $(".lyric").animate({ height: 'hide' }, 500);
        visualization();
        firstPlaySign = false;
    }
    switch (mode) {
        case 'auto'://自动切换
            if (oAudio.paused) {
                oAudio.play();
                $("#PlayButtonIcon").empty();
                $("#PlayButtonIcon").append("&#xe651;");
                $(".imgBackground").css("animation-play-state", "running");
                $(".imgBackground").css(" -webkit-animation-play-state", "running");
            } else {
                oAudio.pause();
                $("#PlayButtonIcon").empty();
                $("#PlayButtonIcon").append("&#xe652;");
                $(".imgBackground").css("animation-play-state", "paused");
                $(".imgBackground").css(" -webkit-animation-play-state", "paused");
            }
            break;
        case 'play'://播放
            oAudio.play();
            $("#PlayButtonIcon").empty();
            $("#PlayButtonIcon").append("&#xe651;");
            $(".imgBackground").css("animation-play-state", "running");
            $(".imgBackground").css(" -webkit-animation-play-state", "running");
            break;
        case 'pause'://暂停
            oAudio.pause();
            $("#PlayButtonIcon").empty();
            $("#PlayButtonIcon").append("&#xe652;");
            $(".imgBackground").css("animation-play-state", "paused");
            $(".imgBackground").css(" -webkit-animation-play-state", "paused");
    }
}
//自动更新封面及按钮状态
$(document).ready(function () {
    setInterval(function () {
        if (oAudio.paused) {
            $("#PlayButtonIcon").empty();
            $("#PlayButtonIcon").append("&#xe652;");
            $(".imgBackground").css("animation-play-state", "paused");
            $(".imgBackground").css(" -webkit-animation-play-state", "paused");
        } else {
            $("#PlayButtonIcon").empty();
            $("#PlayButtonIcon").append("&#xe651;");
            $(".imgBackground").css("animation-play-state", "running");
            $(".imgBackground").css(" -webkit-animation-play-state", "running");
        }
    }, 1000);
})
//上一曲
$(document).ready(function () {
    $("#BeforeButton").click(function () {
        if (firstPlaySign == true) {
            Play();
        } else {
            BeforeMusic();
        }
    })
    hideListTime = 10;
})
//上一曲相关函数
//上一曲列表(id值)
var before_list = new Array;
//是否启用上一曲功能
var BeforeSign = false;
//下标
var BeforeSongFlag = 0;
let beforetMusicCDsign = true;
function BeforeMusic() {
    //上一曲cd
    if (beforetMusicCDsign) {
        beforetMusicCDsign = false;
        setTimeout(function () {
            beforetMusicCDsign = true;
        }, 1000)
        //检测上一曲
        if ((BeforeSign == false) && (before_list.length > 1)) {
            BeforeSign = true;
            BeforeSongFlag = 1;
            MusicPlay(before_list[BeforeSongFlag])
            PlayIconChange(before_list[BeforeSongFlag])
        } else {
            if (BeforeSongFlag < (before_list.length - 1)) {
                BeforeSongFlag++;
                MusicPlay(before_list[BeforeSongFlag])
                PlayIconChange(before_list[BeforeSongFlag])
            } else {
                TopMsg("已无历史", "", true)
            }
        }
    }
}
//下一曲
$(document).ready(function () {
    $("#NextButton").click(function () {
        if (firstPlaySign == true) {
            Play();
        } else {
            NextMusic(true,false);
        }
    })
    hideListTime = 10;
})
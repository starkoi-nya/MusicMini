//API地址
var ColudMusicAPI = "http://localhost:3000";
var BiliDanMuAPI = "http://localhost:8514";

//房间绑定
var RoomID = "0";
$(document).ready(function () {
    $("#LiveRoomNumInputButton").click(function () {
        RoomID = ($("#LiveRoomNumInput").val());
        //console.log(RoomId);
        if (RoomID == "") {
            $("#LiveRoomNumInput").val("");
            $("#LiveRoomNumInput").attr("placeholder", "请输入房间号");
        } else {
            $("#LiveRoomNumInput").val("");
            $("#LiveRoomNumInput").attr("placeholder", "已绑定房间" + RoomID);
        }
    })
})
//弹幕控制
var DanmuCtrlSwich = true;
$(document).ready(function () {
    $("#DanmuCtrlSwichDiv").click(function () {
        DanmuCtrlSwich = $("#DanmuCtrlSwich").is(":checked");
        //console.log(DanmuCtrlSwich);
    })
})
//弹幕点歌
var DanmuOrderSwich = false;
$(document).ready(function () {
    $("#DanmuOrderSwichDiv").click(function () {
        DanmuOrderSwich = $("#DanmuOrderSwich").is(":checked");
        //console.log(DanmuOrderSwich);
    })
})
//播放模式
var PlayMode = 0;
$(document).ready(function () {
    $("#PlayModeCheck").click(function () {
        PlayMode = $("#PlayModeCheck").find("option:selected").attr("value");
        //console.log(PlayMode);
    })
    var option = document.getElementById("PlayModeCheck").getElementsByTagName("option");//得到数组option
    $("#PlayModeButton").click(function () {
        var i = $("#PlayModeCheck").find("option:selected").attr("value");
        if (i >= 2) {
            option[0].selected = true;
        } else {
            i++;
            option[i].selected = true;
        }
        PlayMode = $("#PlayModeCheck").find("option:selected").attr("value");
        //console.log(PlayMode);
    })
    
})
//频谱开关
var SpectrumSwich = true;
$(document).ready(function () {
    $("#SpectrumSwichDiv").click(function () {
        SpectrumSwich = $("#SpectrumSwich").is(":checked");
        //console.log(SpectrumSwich);
        if (SpectrumSwich) {
            $(".visualization").animate({ height: 'show' }, 500);
            $(".lyric").animate({ height: 'hide' }, 500);
        } else {
            $(".lyric").animate({ height: 'show' }, 500);
            $(".visualization").animate({ height: 'hide' }, 500);
        }
    })
})
//频谱歌词切换函数。用于调试和弹幕控制
function SpectrumSwichChange() {
    if (SpectrumSwich) {
       $(".lyric").animate({ height: 'show' }, 500);
        $(".visualization").animate({ height: 'hide' }, 500);
        SpectrumSwich = false;
    } else {
        $(".visualization").animate({ height: 'show' }, 500);
        $(".lyric").animate({ height: 'hide' }, 500);
        SpectrumSwich = true;
    }
}
//mini模式
var MiniSwich = false;
$(document).ready(function () {
    $("#MiniSwichDiv").click(function () {
        MiniSwich = $("#MiniSwich").is(":checked");
        //console.log(MiniSwich);
        MiniSwichChange();
    })
})

function MiniSwichChange() {
    if (MiniSwich) {
        $(".rightBottom").animate({ width: 'hide' }, 500);
        $(".squareMenu").css({ borderRadius: 'calc(38.2vw / 1.382 / 10) calc(38.2vw / 1.382 / 10) calc(38.2vw / 1.382 / 10) calc(38.2vw / 1.382 / 10) '})
        $(".squareMenuInside").css({ borderRadius: 'calc(38.2vw / 1.382 / 10) calc(38.2vw / 1.382 / 10) calc(38.2vw / 1.382 / 10) calc(38.2vw / 1.382 / 10) ' })
} else {
        $(".rightBottom").animate({ width: 'show' }, 500);
        $(".squareMenu").css({ borderRadius: 'calc(38.2vw / 1.382 / 10) 0px 0px calc(38.2vw / 1.382 / 10)' })
        $(".squareMenuInside").css({ borderRadius: 'calc(38.2vw / 1.382 / 10) 0px 0px calc(38.2vw / 1.382 / 10)' })

        //    border-radius: calc(38.2vw / 1.382 / 10) 0px 0px calc(38.2vw / 1.382 / 10);

    }
}
//歌单指定
var SongListID = "";
$(document).ready(function () {
    $("#SongOrderButton").click(function () {
        SongListID = ($("#SongOrderInput").val());
        //console.log(SongListID);
        if (SongListID == "") {
            $("#SongOrderInput").val("");
            $("#SongOrderInput").attr("placeholder", "请输入歌单ID");
        } else {
            getSongList(SongListID);
        }
    })
})
//音量调节
function VolumeUp() {
    if (document.getElementById("Music").volume <= 0.95) {
        document.getElementById("Music").volume += 0.05;
    } else {
        document.getElementById("Music").volume = 1;
    }
}
function VolumeDown(){
    if (document.getElementById("Music").volume >= 0.05) {
        document.getElementById("Music").volume -= 0.05;
    } else {
        document.getElementById("Music").volume = 0;
    }
}


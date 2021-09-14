//进度条
$(document).ready(function () {
    var Music = document.getElementById("Music");
    var music_long;
    layui.use('element', function () {
        element = layui.element;
    })
    Music.addEventListener("durationchange", function () {
        music_long = Music.duration;
    });

    var music_time;
    Music.addEventListener("timeupdate", function () {
        music_time = Music.currentTime;
        //console.log(music_time);
        //console.log(music_long);
        element.progress('RogressBar', ((music_time / music_long) * 100) + "%");
    })
})
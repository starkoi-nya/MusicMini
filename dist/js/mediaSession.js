//初始化windows控件
$(document).ready(function () {
    if ('mediaSession' in navigator) {
        //定义控件
        navigator.mediaSession.setActionHandler('play', function () { Play('play') });
        navigator.mediaSession.setActionHandler('pause', function () { Play('pause') });
        navigator.mediaSession.setActionHandler('stop', function () { Play('pause') });
        navigator.mediaSession.setActionHandler('previoustrack', function () { BeforeMusic() });
        navigator.mediaSession.setActionHandler('nexttrack', function () { NextMusic(true,false) });
        //设定默认信息
        navigator.mediaSession.metadata = new MediaMetadata({
            title: '音乐播放器',
            artist: '星恋幻象',
            artwork: [{ src: 'img/songImg.jpg' }]
        });
    }
})
//改变windows显示信息
function changeInfo(title = '', artist = '', artwork = 'img/playMenuBackground.png') {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: title,
            artist: artist,
            artwork: [{ src: artwork }]
        });
    }
}

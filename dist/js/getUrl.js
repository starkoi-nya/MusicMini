function getUrlSearch(name) {
    // 未传参，返回空
    if (!name) return null;
    // 查询参数：先通过search取值，如果取不到就通过hash来取
    var after = window.location.search;
    after = after.substr(1) || window.location.hash.split('?')[1];
    // 地址栏URL没有查询参数，返回空
    if (!after) return null;
    // 如果查询参数中没有"name"，返回空
    if (after.indexOf(name) === -1) return null;

    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    // 当地址栏参数存在中文时，需要解码，不然会乱码
    var r = decodeURI(after).match(reg);
    // 如果url中"name"没有值，返回空
    if (!r) return null;

    return r[2];
}
$(document).ready(function () {
    if (getUrlSearch("RoomID") !=null) {
        RoomID = getUrlSearch("RoomID")
        //console.log('房间ID', getUrlSearch("RoomID"));
    }
    if (getUrlSearch("SongListID") != null) {
        SongListID = getUrlSearch("SongListID")
        getSongList(SongListID)
        //console.log('歌单ID', getUrlSearch("SongListID"));
    }
    if (getUrlSearch("PlayMode") != null) {
        var PlayModeID = getUrlSearch("PlayMode")
        PlayModeChange(PlayModeID)
        //console.log('歌单ID', getUrlSearch("SongListID"));
    }
})

// 调用方法
//getUrlSearch("参数名");

// 举例1:若地址栏URL为：abc.html?id=123&name=池子&url=http://www.baidu.com
//console.log('地址栏参数id', getUrlSearch("id"));
//console.log('地址栏参数name', getUrlSearch("name"));
//console.log('地址栏参数url', getUrlSearch("ursl"));


// 举例2:若地址栏URL为：abc.html
//console.log('地址栏参数id', getUrlSearch("id"));
// null

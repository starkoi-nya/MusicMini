//顶部消息显示
var msgListSign = false;//队列标识，true则启动队列
var msgList = new Array();//队列，存放数据
//入口函数 用于接收两个显示参数
function TopMsg(title = "", msg = "",errSign = false) {
    //判断是否有消息正在显示
    if (msgListSign == false) {//无消息，调用显示函数
        ShowTopMsg(title, msg, errSign);
        msgListSign = true;//开启队列功能
        setTimeout(function () {//一段时间无消息，队列功能关闭
            if (msgList.length == 0) {
                msgListSign = false;
            }
        }, 5000)
    } else {//有消息，加入队列
        msgList.push([title, msg, errSign])
        if (msgList.length == 1) {//若队列长度为1需启动队列
            TopMsgList();
        }
    }
}

//消息显示函数
function ShowTopMsg(title, msg, errSign) {//接收三个参数
    //界面显示
    $("#TopMsg").empty();
    $("#TopMsgMini").empty();
    if (MiniSwich) {
        if (errSign) {
            $("#TopMsgMini").append("<a class='errMsg'>" + title + "</a>");
        } else {
            $("#TopMsgMini").append("<a>" + title + "</a>");
        }
        $("#TopMsgMini").animate({ height: 'show' }, 500);
        setTimeout(function () {
            $("#TopMsgMini").animate({ height: 'hide' }, 500);
        }, 4000)
    } else {
        if (errSign) {
            $("#TopMsg").append("<a class='errMsg'>" + title + "</a>" + msg);
        } else {
            $("#TopMsg").append("<a>" + title + "</a>" + msg);
        }
        $("#TopMsg").animate({ height: 'show' }, 500);
        setTimeout(function () {
            $("#TopMsg").animate({ height: 'hide' }, 500);
        }, 4000)
    }
}

//队列显示函数
function TopMsgList() {
    setTimeout(function () {//每5秒递归一次
        if (msgList.length == 0) {//判断队列是否为空，空则停止递归
            msgListSign = false;
        } else {
            var showMag = msgList.shift();//出队列
            ShowTopMsg(showMag[0], showMag[1],showMag[2])
            TopMsgList()//递归
        }
    }, 5000)
}
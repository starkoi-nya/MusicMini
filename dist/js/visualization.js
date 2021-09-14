function visualization() {
    // 创建音频上下文对象
    var oCtx = new AudioContext();
    //console.log(oCtx);

    // 创建媒体源,除了audio本身可以获取，也可以通过oCtx对象提供的api进行媒体源操作
    var audioSrc = oCtx.createMediaElementSource(oAudio);
    // 创建分析机
    var analyser = oCtx.createAnalyser();
    // 媒体源与分析机连接
    audioSrc.connect(analyser);
    // 输出的目标：将分析机分析出来的处理结果与目标点（耳机/扬声器）连接
    analyser.connect(oCtx.destination);

    // 效果（实现的具体方法）
    // 绘制音频图的条数(fftSize)
    /*
      根据分析音频的数据去获取音频频次界定音频图的高度
      放在与音频频次等长的8位无符号字节数组
      Uint8Array:初始化默认值为1024
    */
    // 利用cancas渐变进行音频绘制
    //绘制频谱图，申明相关变量
    var visualization_canvas = document.getElementById("VisualizationCanvas");
    var visualization_ctx = visualization_canvas.getContext('2d');
    var visualization_W;
    var visualization_H;
    var visualization_color1;
    var count;
    function changeWH() {
        //频谱图绘图区域宽高
        var visualization_WH = document.getElementById("VisualizationCanvas");
        visualization_canvas.width = visualization_WH.clientWidth || visualization_WH.offsetWidth;
        visualization_canvas.height = visualization_WH.clientHeight || visualization_WH.offsetHeight;
        visualization_W = visualization_canvas.width;
        visualization_H = visualization_canvas.height;

        //主频谱图颜色渐变区域
        visualization_color1 = visualization_ctx.createLinearGradient(0, visualization_H / 2, visualization_W, visualization_H);
        //主频谱图颜色样式
        visualization_color1.addColorStop(0, 'rgba(245,61,61,1)');
        visualization_color1.addColorStop(0.33, 'rgba(245,208,73,1)');
        visualization_color1.addColorStop(0.66, 'rgba(85,245,130,1)');
        visualization_color1.addColorStop(1, 'rgba(110,122,245,1)');
        // 音频图的条数
        count = visualization_W / 2;
        //console.log(count);
    }
    changeWH();

    //动态改变绘图区域大小
    $(window).resize(function () {
        changeWH();
    });

    // 缓冲区:进行数据的缓冲处理，转换成二进制数据
    var voiceHeight = new Uint8Array(analyser.frequencyBinCount);
    // console.log(voiceHeight); 显示这个日志会让你浏览器控制台爆炸

    function draw() {
        // 将当前的频率数据复制到传入的无符号字节数组中，做到实时连接
        analyser.getByteFrequencyData(voiceHeight);
        //console.log(voiceHeight);
        var maxHight = 1;
        //绘制频谱效果
        // 自定义获取数组里边数据的频步
        var step = Math.floor(voiceHeight.length / (count * 1.5));

        visualization_ctx.clearRect(0, 0, visualization_W, visualization_H);
        for (i = 0; i < count; i++) {
                if (voiceHeight[step * i] > maxHight) {
                    maxHight = voiceHeight[step * i];
                }  
        }
        for (i = 0; i < count; i++) {
            var audioHeight = voiceHeight[step * i];
            //console.log(voiceHeight[50]);

            // 绘制主线条
            visualization_ctx.fillStyle = visualization_color1;
            //参数（x坐标，y坐标，宽度，高度）
            visualization_ctx.fillRect((i * 2), visualization_H, 1, visualization_H * (-audioHeight / maxHight));
        }
        window.requestAnimationFrame(draw);
    }
    draw();
    /*
      analyserNode 提供了时时频率以及时间域的分析信息
          允许你获取实时的数据，并进行音频可视化
          analyserNode接口的fftSize属性
              fftSize:无符号长整型值，用于确定频域的FFT(快速傅里叶变换)
              ffiSize属性值是从32位到32768范围内的2的非零幂,默认值是2048
    */
}
/*
$(document).ready(function () {
    visualization()  兼容谷歌，该函数执行移动到了播放按钮点击上
})
*/
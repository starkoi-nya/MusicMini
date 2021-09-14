const { app, BrowserWindow, globalShortcut, Menu, MenuItem, ipcMain } = require('electron')
const path = require('path')
const menu = new Menu()
//接受渲染端的信息
ipcMain.on("sendMessage", (event, data) => {
  //console.log(data);
  //调整窗口穿透
  win.setIgnoreMouseEvents(data, { forward: data })
})

function createWindow() {       // 创建浏览器窗口    
  win = new BrowserWindow({
    width: 350,
    height: 120,
    transparent: true,
    clickThrough: 'pointer-events',
    resizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: false,
      nodeIntegration: true,
      enablemotemodule: true,
    }
  })    // 然后加载应用的 index.html    
  win.loadFile('dist/index.html')
  win.setAlwaysOnTop(true);
  //win.setIgnoreMouseEvents(true)
}

app.whenReady().then(() => {
  //快捷键
  //上一曲
  globalShortcut.register('CommandOrControl+Left', () => {
    win.webContents.executeJavaScript("BeforeMusic()");
  })
  globalShortcut.register('MediaPreviousTrack', () => {
    win.webContents.executeJavaScript("BeforeMusic()");
  })
  //下一曲
  globalShortcut.register('CommandOrControl+Right', () => {
    win.webContents.executeJavaScript("NextMusic(true)");
  })
  globalShortcut.register('MediaNextTrack', () => {
    win.webContents.executeJavaScript("NextMusic(true)");
  })
  //播放/暂停
  globalShortcut.register('MediaStop', () => {
    win.webContents.executeJavaScript("Play()");
  })
  globalShortcut.register('MediaPlayPause', () => {
    win.webContents.executeJavaScript("Play()");
  })
  //音量加
  globalShortcut.register('CommandOrControl+Up', () => {
    win.webContents.executeJavaScript("VolumeUp()");
  })
  //音量减
  globalShortcut.register('CommandOrControl+Down', () => {
    win.webContents.executeJavaScript("VolumeDown()");
  })
  //F11覆盖  
  menu.append(new MenuItem({
    label: 'F11',
    accelerator: 'F11',
    click: () => {
      //还没想好功能，除了全屏
    }
  }))
  Menu.setApplicationMenu(menu)
}).then(createWindow)

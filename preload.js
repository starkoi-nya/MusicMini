window.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require("electron");
    addEventListener('pointerover', function mousePolicy(event) {
        mousePolicy._canClick = event.target === document.documentElement ?
            mousePolicy._canClick && ipcRenderer.send("sendMessage",true) :
            mousePolicy._canClick || ipcRenderer.send("sendMessage",false) || 1
    }) 
})
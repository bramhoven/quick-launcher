const {app, BrowserWindow, globalShortcut, ipcMain } = require('electron')
const path = require('path')
let mainWindow
let visible = true;
let quitting = false;

const createWindow = () => {
  
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });
  
  const ret = globalShortcut.register('CommandOrControl+Space', () => {
    if(!visible) {
      mainWindow.show();
      visible = true;
    }
    else if(visible) {
      mainWindow.hide();
      visible = false;
    }
  });
  mainWindow.loadFile('index.html')

  mainWindow.on('minimize',(event) => {
    event.preventDefault();
    mainWindow.hide();
    visible = false;
  });

  mainWindow.on('close', (event) => {
    if(!quitting) {
      event.preventDefault();
      mainWindow.hide();
      visible = false;
    }
  });

  ipcMain.on('launch-complete', () => {
    mainWindow.hide();
    visible = false;
  });

  ipcMain.on('quit-quick-launcher', () => {
    quitting = true;
    mainWindow.close();
    app.quit();
  });
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

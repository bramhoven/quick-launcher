const {app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')
let mainWindow
let visible = true;

const createWindow = () => {
  
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  
  const ret = globalShortcut.register('CommandOrControl+Space', () => {
    if(!visible) {
      mainWindow.show();
      visible = true;
    }
    else if(visible) {
      mainWindow.hide();
      visible = false;
    }
  })
  mainWindow.loadFile('index.html')

  mainWindow.on('minimize',(event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const mediaController = require('node-media-controller');
const {ipcRenderer, shell} = require('electron');

const prevMedia = (event) => {
  mediaController.executeCommand('previous', () => {});
};

const togglePlayMedia = (event) => {
  mediaController.executeCommand('play', () => {});
  ipcRenderer.send('launch-complete');
};

const nextMedia = (event) => {
  mediaController.executeCommand('next', () => {});
};

const openChrome = (event) => {
  shell.openExternal("http://www.google.com");
  ipcRenderer.send('launch-complete');
};

const hotkeyManager = (event) => {
  let keyCode = event.keyCode;
  if(keyCode == 'b'.charCodeAt(0)) prevMedia();
  if(keyCode == 'p'.charCodeAt(0)) togglePlayMedia();
  if(keyCode == 'n'.charCodeAt(0)) nextMedia();
  if(keyCode == 'c'.charCodeAt(0)) openChrome();
};

document.getElementById('prev').addEventListener('click', prevMedia);
document.getElementById('play-pause').addEventListener('click', togglePlayMedia);
document.getElementById('next').addEventListener('click', nextMedia);
document.getElementById('chrome').addEventListener('click', openChrome);

document.addEventListener('keypress', hotkeyManager);
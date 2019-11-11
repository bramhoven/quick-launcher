// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const mediaController = require('node-media-controller');
const {ipcRenderer, shell} = require('electron');
const audio = require('win-audio').speaker;
audio.polling(200);

audio.events.on('change', (volume) => {
  document.getElementById('volume-range').value = volume.new;
});

const setVolume = (event) => {
  audio.set(parseInt(event.target.value));
};

const volumeUp = (event) => {
  let volume = audio.get();
  audio.set(volume + 2 < 100 ? volume + 2 - (volume%2) : 100);
};

const volumeDown = (event) => {
  let volume = audio.get();
  audio.set(volume - 2 > 0 ? volume - 2 + (volume%2) : 0);
};

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

const closeQuickLauncher = (event) => {
  ipcRenderer.send('quit-quick-launcher');
};

const hotkeyManager = (event) => {
  let keyCode = event.keyCode;
  if(keyCode == 38) volumeUp(); // Up arrow
  if(keyCode == 40) volumeDown(); // Down arrow
  if(keyCode == 'B'.charCodeAt(0)) prevMedia();
  if(keyCode == 'P'.charCodeAt(0)) togglePlayMedia();
  if(keyCode == 'N'.charCodeAt(0)) nextMedia();
  if(keyCode == 'C'.charCodeAt(0)) openChrome();
  if(keyCode == 'Q'.charCodeAt(0)) closeQuickLauncher();
};

document.getElementById('volume-range').value = audio.get();

document.getElementById('prev').addEventListener('click', prevMedia);
document.getElementById('play-pause').addEventListener('click', togglePlayMedia);
document.getElementById('next').addEventListener('click', nextMedia);
document.getElementById('chrome').addEventListener('click', openChrome);
document.getElementById('ql-close').addEventListener('click', closeQuickLauncher);
document.getElementById('volume-range').addEventListener('input', setVolume)

document.addEventListener('keydown', hotkeyManager);
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const mediaController = require('node-media-controller');

const prevMedia = (event) => {
  mediaController.executeCommand('previous', () => {});
};

const togglePlayMedia = (event) => {
  mediaController.executeCommand('play', () => {});
};

const nextMedia = (event) => {
  mediaController.executeCommand('next', () => {});
};

const hotkeyManager = (event) => {
  let keyCode = event.keyCode;
  if(keyCode == 'b'.charCodeAt(0)) prevMedia();
  if(keyCode == 'p'.charCodeAt(0)) togglePlayMedia();
  if(keyCode == 'n'.charCodeAt(0)) nextMedia();
};

document.getElementById('prev').addEventListener('click', prevMedia);
document.getElementById('play-pause').addEventListener('click', togglePlayMedia);
document.getElementById('next').addEventListener('click', nextMedia);

document.addEventListener('keypress', hotkeyManager);
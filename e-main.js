'use strict';

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

let mainWindow = null;

app.on('ready', function() {

  mainWindow = new BrowserWindow({
    height: 477,
    width: 776,
    useContentSize: true,
    resizable: false,

  });

  mainWindow.loadURL('file://' + __dirname + '/darkunknown.html');

})
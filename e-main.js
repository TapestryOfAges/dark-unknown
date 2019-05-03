'use strict';

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const {ipcMain} = require('electron')

let mainWindow = null;

app.on('ready', function() {

  mainWindow = new BrowserWindow({
    height: 469,
    width: 776,
    useContentSize: true,
    resizable: false,

  });

  mainWindow.loadURL('file://' + __dirname + '/darkunknown.html');

})

ipcMain.on('toggle_dev', function() {
  mainWindow.webContents.openDevTools();
});
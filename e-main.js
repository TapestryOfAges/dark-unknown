'use strict';

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const {ipcMain} = require('electron')

let mainWindow = null;
let debugWindow = null;

app.on('ready', function() {

  mainWindow = new BrowserWindow({
    height: 469,
    width: 776,
    useContentSize: true,
    resizable: false,

  });

  mainWindow.loadURL('file://' + __dirname + '/darkunknown.html');

  mainWindow.on("close", function() {
    app.quit();
  });
})

ipcMain.on('toggle_dev', function() {
  mainWindow.webContents.openDevTools();
});

ipcMain.on('open_debug', function() {
  debugWindow = new BrowserWindow({
    height:700,
    width: 500,
    useContentSize: true,
    resizeable: true,
  });

  debugWindow.loadURL('file://' + __dirname + '/debugwindow.html');
});

ipcMain.on('sendDebug', function(event, txt) {
  debugWindow.webContents.send('sendDebug', txt);
});

ipcMain.on('debug_bottom', function(event) {
  debugWindow.webContents.send('debug_buttom');
});

ipcMain.on('debug_clear', function(event) {
  debugWindow.webContents.send('debug_clear');
});

ipcMain.on('debug_new_turn', function(event, serialid) {
  debugWindow.webContents.send('debug_new_turn', serialid);
});

'use strict';
const {app, BrowserWindow} = require('electron');
// Module to create native browser window.
const isDev = require('electron-is-dev');
const {ipcMain} = require('electron')
const path = require('path')
const fs = require("fs");

const savePath = path.join(`${__dirname}`,'..','..','saves');

let mainWindow = null;
let debugWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 480,  // 469
    width: 776,
    useContentSize: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'e-preload.js'),
    },
  });

  mainWindow.loadFile('darkunknown.html');
}

app.whenReady().then(() => {
  ipcMain.on('resize', function(event, zoom) {
    if (zoom === 1) {
      mainWindow.setMinimumSize(776,480);
      mainWindow.setSize(776,469);
    } else if (zoom === 1.5) {
      mainWindow.setMinimumSize(1164,720);
      mainWindow.setSize(1164,704);
    } else if (zoom === 2) {
      mainWindow.setSize(1552,960);
    }
  });

  ipcMain.on('open_debug', function() {
    debugWindow = new BrowserWindow({
      height:700,
      width: 500,
      useContentSize: true,
      resizeable: true,
      webPreferences: {
        preload: path.join(__dirname, 'e-d-preload.js'),
      },
  
    });
    
    debugWindow.loadFile('debugwindow.html');
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

  ipcMain.on('toggle_dev', function(event) {
    mainWindow.webContents.openDevTools(); 
  });
  
  ipcMain.on('create_dir', function(event) {
    function createDirectory(directory) {
      //    const directory = path.normalize(directoryPath);
        
      return new Promise((resolve, reject) => {
        fs.stat(directory, (error) => {
          if (error) {
            if (error.code === 'ENOENT') {
              fs.mkdir(directory, (error) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(directory);
                }
              });
            } else {
              reject(error);              }
          } else {
            resolve(directory);
          }
        });
      });
    }
          
    createDirectory(savePath).then((path) => {
      console.log(`Successfully created directory: '${path}'`);
      try {
        fs.readFileSync(`${savePath}/save3`,'utf8');
      } catch(err) {
        if (err.message.indexOf("no such file") !== -1) {
          gamestate.initializeSaveGames();
          console.log("Initialized saved games.");    
        } else {
          console.log("Unknown error with saved games:");
          console.log(err.message);
        }
      }
      // populate saveIndex
      let saveIndex = [];
      for (let i=0;i<=9;i++) {
        saveIndex[i] = {datestamp: 0, charname:"",loc:"",graphic:""};
        let file = fs.readFileSync(`${savePath}/save${i}`,'utf8');
        if (file) {
          file = JSON.parse(file);
          let stats = fs.statSync(`${savePath}/save${i}`);
          saveIndex[i]["datestamp"] = stats.mtimeMs;
          saveIndex[i]["charname"] = file.charname;
          saveIndex[i]["loc"] = file.loc;
          saveIndex[i]["graphic"] = file.graphic;
          saveIndex[i]["timeplayed"] = file.timeplayed;
        }
      }
      mainWindow.webContents.send('sendSaveIndex', saveIndex);
    }).catch((error) => {
      console.log(`Problem creating directory: ${error.message}`)
    });
  });
  
  ipcMain.on('write_save', function(event,params) {
    fs.writeFileSync(`${savePath}/save${params.idx}`, params.serialized);
  });
  
  ipcMain.on('load_save', function(event,idx) {
    let loadsave = fs.readFileSync(`${savePath}/save${idx}`,'utf8');
    mainWindow.webContents.send('sendLoad', loadsave);
  });

  createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

//ipcMain.on('toggle_dev', function() {
//  mainWindow.webContents.openDevTools();
//});



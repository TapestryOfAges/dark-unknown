'use strict';

const { contextBridge, ipcRenderer, webFrame } = require('electron')

contextBridge.exposeInMainWorld('OutOfContext', {
  toggle_dev: () => { ipcRenderer.send('toggle_dev') },
  resize: (zoom) => { webFrame.setZoomFactor(zoom); ipcRenderer.send('resize', zoom)  },
  open_debug: () => { ipcRenderer.send('open_debug'); },
  sendDebug: (txt) => { ipcRenderer.send('sendDebug', txt); },
  debug_bottom: () => { ipcRenderer.send('debug_bottom'); },
  debug_clear: () => { ipcRenderer.send('debug_clear'); },
  debug_new_turn: () => { ipcRenderer.send('debug_new_turn'); },

  create_dir: () => { ipcRenderer.send('create_dir'); },

  write_save: (params) => { ipcRenderer.send('write_save', {idx: params[0], serialized: params[1]}); },
  load_game: (idx) => { ipcRenderer.send('load_save', idx); },
  write_settings: (params) => { ipcRenderer.send('write_settings', params); },
  load_settings: () => { ipcRenderer.send('load_settings'); },
  onGetSaveIndex: (callback) => { ipcRenderer.on('sendSaveIndex', callback) }, 
  onLoadData: (callback) => { ipcRenderer.on('sendLoad', callback) }, 
  onLoadSettings: (callback) => { ipcRenderer.on('sendSettings', callback) },
  write_error: (params) => { ipcRenderer.send('write_error', params) },
})


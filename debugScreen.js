"use strict";

let debugstyle = {};
debugstyle.header = "font-weight:bold";
debugstyle.map = "color:grey";
debugstyle.sound = "color:orange";
debugstyle.light = "color:brown";
debugstyle.saveload = "color:grey";
debugstyle.ai = "color:blue";
debugstyle.combat = "color:red";
debugstyle.magic = "color:green";
debugstyle.time = "color:cyan";
debugstyle.plot = "color:pink";
debugstyle.events = "color:magenta";
debugstyle.gameobj = "color:black";
debugstyle.schedules = "color:purple";
debugstyle.all = "color:black";

const {ipcRenderer} = require('electron');

ipcRenderer.on('sendDebug', function(event, txt) {
  let tmpchild = document.createElement('p');
  tmpchild.innerHTML = "<span style='" + debugstyle[txt.cat] + "'>" + txt.html + "</span>";
  document.getElementById('debugdiv').appendChild(tmpchild);
});

ipcRenderer.on('debug_bottom', function(event) {
  document.getElementById('debugdiv').scrollTop = document.getElementById('debugdiv').scrollHeight;
});

ipcRenderer.on('debug_clear', function(event) {
  document.getElementById('debugdiv').innerHTML = "";  
});

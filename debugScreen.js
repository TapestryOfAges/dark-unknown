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
debugstyle.new = "color:black";

const {ipcRenderer} = require('electron');

ipcRenderer.on('sendDebug', function(event, txt) {
  if (txt.cat === "new") {
    let newtmp = document.createElement('div');
    newtmp.innerHTML = "<span id='DB"+txt.sid+"'></span>";
    document.getElementById('debugdiv').appendChild(newtmp);
  }
  let tmpchild = document.createElement('p');
  tmpchild.innerHTML = "<span style='" + debugstyle[txt.cat] + "'>" + txt.html + "</span>";
  let dbdiv = document.getElementById('DB'+txt.sid);
  if (dbdiv) {
    dbdiv.appendChild(tmpchild);
  } else {
    console.log(txt.html);
  }
});

ipcRenderer.on('debug_bottom', function(event) {
  document.getElementById('debugdiv').scrollTop = document.getElementById('debugdiv').scrollHeight;
});

ipcRenderer.on('debug_clear', function(event) {
  document.getElementById('debugdiv').innerHTML = "";  
});

ipcRenderer.on('debug_new_turn', function(event, sid) {
  let tmpchild = document.createElement('div');
  tmpchild.innerHTML = "<span id='DB"+sid+"'></span>";
});

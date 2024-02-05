"use strict";

//const {ipcRenderer} = require('electron')

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

//ipcRenderer.on('sendDebug', function(event, txt) {
//  if (txt.cat === "new") {
//    let newtmp = document.createElement('div');
//    newtmp.innerHTML = "<span id='DB"+txt.sid+"'></span>";
//    document.getElementById('debugdiv').appendChild(newtmp);
//  }
//  let addstyle = "";
//  if (!txt.samemap) { addstyle = ", bgcolor: LightPink"; }
//  if (txt.watched) { addstyle = ", bgcolor: DeepSkyBlue"; }
//  let tmpchild = document.createElement('p');
//  tmpchild.innerHTML = "<span style='" + debugstyle[txt.cat] + addstyle + "'>" + txt.html + "</span>";
//  let dbdiv = document.getElementById('DB'+txt.sid);
//  if (dbdiv) {
//    dbdiv.appendChild(tmpchild);
//  } else {
//    console.log(txt.html);
//  }
//  document.getElementById('debugdiv').scrollTop = document.getElementById('debugdiv').scrollHeight;
//});

//ipcRenderer.on('debug_bottom', function(event) {
//  document.getElementById('debugdiv').scrollTop = document.getElementById('debugdiv').scrollHeight;
//});

//ipcRenderer.on('debug_clear', function(event) {
//  document.getElementById('debugdiv').innerHTML = "";  
//});

//ipcRenderer.on('debug_new_turn', function(event, sid) {
//  let tmpchild = document.createElement('div');
//  tmpchild.innerHTML = "<span id='DB"+sid+"'></span>";
//});


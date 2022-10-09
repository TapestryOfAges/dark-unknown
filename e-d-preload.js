'use strict';

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('OutOfContext', {
  sendDebug: (txt) => {
    if (txt.cat === "new") {
      let newtmp = document.createElement('div');
      newtmp.innerHTML = "<span id='DB"+txt.sid+"'></span>";
      document.getElementById('debugdiv').appendChild(newtmp);
    }
    let addstyle = "";
    if (!txt.samemap) { addstyle = ", bgcolor: LightPink"; }
    if (txt.watched) { addstyle = ", bgcolor: DeepSkyBlue"; }
    let tmpchild = document.createElement('p');
    tmpchild.innerHTML = "<span style='" + debugstyle[txt.cat] + addstyle + "'>" + txt.html + "</span>";
    let dbdiv = document.getElementById('DB'+txt.sid);
    if (dbdiv) {
      dbdiv.appendChild(tmpchild);
    } else {
      console.log(txt.html);
    }
    document.getElementById('debugdiv').scrollTop = document.getElementById('debugdiv').scrollHeight;
  },
  debug_bottom: () => { document.getElementById('debugdiv').scrollTop = document.getElementById('debugdiv').scrollHeight; },
  debug_clear: () => { document.getElementById('debugdiv').innerHTML = "";  },
  debug_new_turn: () => { 
    let tmpchild = document.createElement('div');
    tmpchild.innerHTML = "<span id='DB"+sid+"'></span>";
  }
})
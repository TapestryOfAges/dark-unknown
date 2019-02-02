
"use strict";

let debug = 0;
let debugscreen;
let dbs;
let watchon;  // must be set in console
let debugflags = {};
  debugflags.all = 1;
  debugflags.map = 0;
  debugflags.sound = 0;
  debugflags.light = 0;
  debugflags.saveload = 0;
  debugflags.ai = 0;
  debugflags.combat = 0;
  debugflags.magic = 0;
  debugflags.time = 0;
  debugflags.plot = 0;
  debugflags.events = 0;
  debugflags.gameobj = 0;
  debugflags.schedules = 0;
  debugflags.first = 1;
// var deeptest = 0;

let debugmaps = {};
debugmaps.open = 0;

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

function ActivateDebug(startup) { 
  
  let wide = window.innerWidth - 800;
  if (!wide) { wide = 300; }
  let tall = window.innerHeight - 30;
  document.body.innerHTML += "<div style='position:absolute;left:790px;top:0px;width:" + wide + "px;height:" + tall + "px;overflow-y:scroll;z-index:5000;background-color:white;color:black;font-size:smaller' id='debugdiv'></div>";
  let buttonleft = 800+wide/2;
  let buttontop = tall+10;
  document.body.innerHTML += "<div style='position:absolute;left:" + buttonleft + ";top:" + buttontop + ";z-index:5000;background-color:white' onClick='ClearDebug()'>Clear Debug</div>";
  document.getElementById('debugdiv').innerHTML = "<div style='text-align:center'>DEBUG PANE";

  if (!startup) {  
    targetCursor.page = 1;
    targetCursor.cmd = "debug";
    
    DrawDebugOptions();		
  }

}

function SetDebugWatch(watchname) {
  watchon = "";
  if (!watchname) { return; }
  let stuff = maps.getAllMaps();
  for (let i in stuff) {
    let val = stuff[i];
    let npclist = val.npcs.getAll();
    for (let j=0;j<npclist.length;j++) {
      if (npclist[j].getNPCName() === watchname) {
        watchon = npclist[j];
      }
    }
  };
  if (!watchon) { return ("Failed to find " + watchname); }
  return; 
}

function DebugWait(mins) {
  PC.setWaiting(DUTime.getGameClock() + mins/5);
}

function DebugWrite(category, html) {
  if (debug && (debugflags[category] || ((whoseturn === watchon) && ((category === "schedules")||(category === "ai"))))) {
//    document.getElementById('debugdiv').innerHTML += "<span style='" + debugstyle[category] + "'>" + html + "</span>";
    let tmpchild = document.createElement('p');
    tmpchild.innerHTML = "<span style='" + debugstyle[category] + "'>" + html + "</span>";
    document.getElementById('debugdiv').appendChild(tmpchild);
    return 1;
  } 
  return 0;
}

function SetDebugToBottom() {
  if (debug) {
    document.getElementById('debugdiv').scrollTop = document.getElementById('debugdiv').scrollHeight;
  }
}

function ClearDebug() {
  if (debug) {
    document.getElementById('debugdiv').innerHTML = "";
  }
}

function TestNetwork(mapref, network) {
  let web = mapref.network[network];
  for (let i=0; i<web.length; i++) {
    let conn = web[i].connections;
    let loopback = 0;
    for (let j=0; j<conn.length; j++) {
      let innerconn = conn[j].connections;
      for (let k=0; k<innerconn.length; k++) {
        if (innerconn[k] === web[i]) { loopback = 1; }
      }
    }
    if (!loopback) { alert(i + " does not loop back."); }
  }
  alert("Check complete.");
}

function OpenDebugMaps() {
  debugmaps.open = 1;
  let PCMap = PC.getHomeMap();
  debugmaps[PCMap.getName()] = window.open("",PCMap.getName());
  
  if (PCMap.getLinkedMaps().length > 0) {
    for (let i=0;i<PCMap.getLinkedMaps().length;i++) {
      debugmaps[PCMap.getLinkedMaps()[i]] = window.open("",PCMap.getLinkedMaps()[i]);
    }
  }
  
  setTimeout(SeedDebugMaps(0), 100);
  return;
}

function CloseDebugMaps() {
  delete debugmaps.open;
  let PCMap = PC.getHomeMap();
  debugmaps[PCMap.getName()].close();
  delete debugmaps[PCMap.getName()];
  for (let i=0;i<PCMap.getLinkedMaps().length;i++) {
    if (PCMap.getLinkedMaps()[i] !== "") {
      debugmaps[PCMap.getLinkedMaps()[i]].close();
      delete debugmaps[PCMap.getLinkedMaps()[i]];
    }
  }  
}

function SeedDebugMaps(j) {
  let PCMap = PC.getHomeMap();
  let ourmaps = [];
  ourmaps[0] = PCMap.getName();
  for (let i=0;i<PCMap.getLinkedMaps().length;i++) {
    if (PCMap.getLinkedMaps()[i] !== "") {
      ourmaps[i+1] = PCMap.getLinkedMaps()[i];
    }
  }
  
  if (j === ourmaps.length) { ShowDebugMaps(1); return; }

  debugmaps[ourmaps[j]].document.write("<html><head></head><body><div style='position:absolute;left:0px;top:0px;' id='terrain_" + ourmaps[j] + "'>What is this?</div><div style='position:absolute;left:0px;top:0px' id='main_" + ourmaps[j] + "'></div></body></html>");  
  setTimeout(SeedDebugMaps(j+1), 100);
}

function ShowDebugMaps(first) {
  let ourmaps = [];
  ourmaps[0] = PC.getHomeMap();
  for (let i=0;i<PC.getHomeMap().getLinkedMaps().length;i++) {
    ourmaps[i+1] = maps.getMap(PC.getHomeMap().getLinkedMaps()[i]);
  }

  for (let i=0;i<ourmaps.length;i++) {
    let mapname = ourmaps[i].getName();

    let terrain = "<table border='0' cellspacing='0' cellpadding='0'>";
    let mainview = "<table border='0' cellspacing='0' cellpadding='0'>";
    
    for (let yy=0;yy<ourmaps[i].data.length;yy++) {
      terrain += "<tr>";
      mainview += "<tr>";
      for (let xx=0;xx<ourmaps[i].data[yy].length;xx++) {
        if (first) {
          let terr = DebugGetDisplayTerrain(ourmaps[i],xx,yy,xx,yy,0);
          terrain += "<td style='width:32px;height:32px;background-image:url(\"graphics/" + terr.showGraphic + "\"); background-repeat: no-repeat; background-position: " + terr.graphics2 + "px " + terr.graphics3 + "px'>";
          terrain += "<img width='32' height='32' src='graphics/" + terr.graphics1 + "' border='0' alt='tile " + xx + "," + yy + "' /></td>";
        }
        
        let thiscell = DebugGetDisplayCell(ourmaps[i],xx,yy,xx,yy);
        if (thiscell.terrain) {
          mainview += "<td><img width='32' height='32' src='graphics/spacer.gif' border='0' alt='tile " + xx + "," + yy + "' /></td>";
        } else {
          mainview += "<td style='width:32px;height:32px;background-image:url(\"graphics/" + thiscell.showGraphic + "\"); background-repeat: no-repeat; background-position: " + thiscell.graphics2 + "px " + thiscell.graphics3 + "px'>";
          mainview += "<img width='32' height='32' src='graphics/" + thiscell.graphics1 + "' border='0' alt='tile " + xx + "," + yy + "' /></td>";          
        }
      }
      terrain += "</tr>";
      mainview += "</tr>";
    }
    
    terrain += "</table>";
    mainview += "</table>";

    if (first) {
      let docterr = debugmaps[mapname].document.getElementById("terrain_" + mapname);
      docterr.innerHTML = terrain;
    }
    let docmain = debugmaps[mapname].document.getElementById("main_" + mapname);
    docmain.innerHTML = mainview;
    
  }
}

function DebugGetDisplayCell(mapname, centerx, centery, x, y, tp, ev) {

  let displayCell = {};
  let localacre = mapname.getTile(x,y);
  
  let displaytile;
  // decide whether to draw a tile, draw it shaded, or make it darkness
  let losresult = 0;

  let blocks = localacre.getBlocksLOS();
  
  let lighthere = 1;
  
  displaytile = localacre.getTop(0,1);  // sorts NPCs to top
  let isnpc = 0;
  if (displaytile.checkType("NPC")) { isnpc = 1; }
  let graphics = displaytile.getGraphicArray();
  let showGraphic = graphics[0];
  if (typeof displaytile.setBySurround === "function") {
   	graphics = displaytile.setBySurround(x,y,mapname,graphics,1,centerx,centery,losresult);
    displayCell.showGraphic = graphics[0];
    displayCell.graphics2 = graphics[2];
    displayCell.graphics3 = graphics[3];
    displayCell.graphics1 = graphics[1];
    if (typeof displaytile.doTile === "function") {
      showGraphic = displaytile.doTile(x,y,graphics[0]);
      if (showGraphic.graphic) { displayCell.showGraphic = showGraphic.graphic; }
      if (showGraphic.spritexoffset) { 
        displayCell.graphics2 = showGraphic.spritexoffset;
        displayCell.graphics3 = showGraphic.spriteyoffset;
      }
    }
    displayCell.losresult = losresult;
    displayCell.lighthere = lighthere;
    displayCell.desc = displaytile.getDesc();
  } else {
    displayCell.showGraphic = showGraphic;
    displayCell.graphics2 = graphics[2];
    displayCell.graphics3 = graphics[3];
    displayCell.graphics1 = graphics[1];
    if (typeof displaytile.doTile === "function") {
      showGraphic = displaytile.doTile(x,y,showGraphic);
      if (showGraphic.graphic) { displayCell.showGraphic = showGraphic.graphic; }
      if (showGraphic.hasOwnProperty("spritexoffset")) { 
        displayCell.graphics2 = showGraphic.spritexoffset;
        displayCell.graphics3 = showGraphic.spriteyoffset;
      }      
    }
    if (typeof displaytile.setByBelow === "function") {
      let setbelow = displaytile.setByBelow(x,y,mapname);
      displayCell.showGraphic = setbelow[0];
      displayCell.graphics2 = setbelow[2];
      displayCell.graphics3 = setbelow[3];
    }
    displayCell.losresult = losresult;
    displayCell.lighthere = lighthere;
    displayCell.isnpc = isnpc;
    displayCell.desc = displaytile.getDesc();
  }
  if (displaytile.checkType("Terrain") && (displaytile.getName() !== "BlankBlack")) { displayCell.terrain = 1; }
  return displayCell;
}

function DebugGetDisplayTerrain(mapref, xcoord, ycoord,centerx,centery,losresult) {
  
  let localacre = mapref.getTile(xcoord, ycoord);
  let displaytile = localacre.getTerrain();

  let graphics = displaytile.getGraphicArray();
  let showGraphic = graphics[0];

  let displayCell = {};
  displayCell.desc = displaytile.getDesc();
  if (typeof displaytile.setBySurround === "function") {
   	graphics = displaytile.setBySurround(xcoord,ycoord,mapref,graphics,0,centerx,centery);
    showGraphic = graphics[0];
  }

  displayCell.showGraphic = showGraphic;
  displayCell.graphics2 = graphics[2];
  displayCell.graphics3 = graphics[3];
  displayCell.graphics1 = graphics[1];
  if (typeof displaytile.doTile === "function") {
    showGraphic = displaytile.doTile(xcoord,ycoord,showGraphic);
    if (showGraphic.graphic) { displayCell.showGraphic = showGraphic.graphic; }
    if (showGraphic.hasOwnProperty("spritexoffset")) { 
      displayCell.graphics2 = showGraphic.spritexoffset;
      displayCell.graphics3 = showGraphic.spriteyoffset;
    }        
  }

  return displayCell;
}

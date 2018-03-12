
"use strict";

var debug = 0;
var debugscreen;
var dbs;
var watchon;  // must be set in console
var debugflags = {};
  debugflags.all = 1;
  debugflags.map = 1
  debugflags.sound = 1;
  debugflags.light = 1;
  debugflags.saveload = 1;
  debugflags.ai = 1;
  debugflags.combat = 1;
  debugflags.magic = 1;
  debugflags.time = 1;
  debugflags.plot = 1;
  debugflags.events = 1;
  debugflags.gameobj = 1;
  debugflags.schedules = 1;
  debugflags.first = 1;
// var deeptest = 0;

var debugmaps = {};
debugmaps.open = 0;

var debugstyle = {};
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
debugstyle.all = "color:black";

// if (debug) {  ActivateDebug(1); }

function ActivateDebug(startup) { 
//  if (!dbs) {
//    debugscreen = window.open('','debugscreen');
//    dbs = debugscreen.document;
//  }
  
  var wide = $(window).width() - 800;
  if (!wide) { wide = 300; }
  var tall = $(document).height() - 30;
  $("body").append("<div style='position:absolute;left:790px;top:0px;width:" + wide + "px;height:" + tall + "px;overflow-y:scroll;z-index:5000;background-color:white;color:black;font-size:smaller' id='debugdiv'></div>");
  var buttonleft = 800+wide/2;
  var buttontop = tall+10;
  $("body").append("<div style='position:absolute;left:" + buttonleft + ";top:" + buttontop + ";z-index:5000;background-color:white' onClick='ClearDebug()'>Clear Debug</div>");
  $("#debugdiv").html("<div style='text-align:center'>DEBUG PANE");

  if (!startup) {  
    targetCursor.page = 1;
    targetCursor.cmd = "debug";
    
    DrawDebugOptions();		
  }

}

function DebugWrite(category, html) {
  if (debug && (debugflags[category] || (whoseturn === watchon))) {
    $("#debugdiv").append("<span style='" + debugstyle[category] + "'>" + html + "</span>");
    return 1;
  } 
  return 0;
}

function SetDebugToBottom() {
  if (debug) {
    $('#debugdiv').scrollTop($('#debugdiv')[0].scrollHeight);
  }
}

function ClearDebug() {
  if (debug) {
    $("#debugdiv").html("");
  }
}

function TestNetwork(mapref, network) {
  var web = mapref.network[network];
  for (var i=0; i<web.length; i++) {
    var conn = web[i].connections;
    var loopback = 0;
    for (var j=0; j<conn.length; j++) {
      var innerconn = conn[j].connections;
      for (var k=0; k<innerconn.length; k++) {
        if (innerconn[k] === web[i]) { loopback = 1; }
      }
    }
    if (!loopback) { alert(i + " does not loop back."); }
  }
  alert("Check complete.");
}

function OpenDebugMaps() {
  debugmaps.open = 1;
  var PCMap = PC.getHomeMap();
  debugmaps[PCMap.getName()] = window.open("",PCMap.getName());
  
  if (PCMap.getLinkedMaps().length > 0) {
    for (let i=0;i<PCMap.getLinkedMaps().length;i++) {
      debugmaps[PCMap.getLinkedMaps()[i]] = window.open("",PCMap.getLinkedMaps()[i]);
//      debugmaps[PCMap.getLinkedMaps()[i]].document.write("<html><head></head><body><div style='position:fixed;left:0px;top:0px' id='terrain_" + PCMap.getLinkedMaps()[i] + "'>What is this?</div><div style='position:fixed;left:0px;top:0px' id='main_" + PCMap.getLinkedMaps()[i] + "'></div></body></html>");
    }
  }
  
  setTimeout(SeedDebugMaps(0), 100);
  return;
}

function SeedDebugMaps(j) {
  let PCMap = PC.getHomeMap();
  let ourmaps = [];
  ourmaps[0] = PC.getHomeMap().getName();
  for (let i=0;i<PC.getHomeMap().getLinkedMaps().length;i++) {
    if (PC.getHomeMap().getLinkedMaps()[i] !== "") {
      ourmaps[i+1] = PC.getHomeMap().getLinkedMaps()[i];
    }
  }
  
  if (j === ourmaps.length) { ShowDebugMaps(); return; }

  debugmaps[ourmaps[j]].document.write("<html><head></head><body><div style='position:absolute;left:0px;top:0px;' id='terrain_" + ourmaps[j] + "'>What is this?</div><div style='position:absolute;left:0px;top:0px' id='main_" + ourmaps[j] + "'></div></body></html>");  
  setTimeout(SeedDebugMaps(j+1), 100);
}

function ShowDebugMaps() {
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
        let terr = DebugGetDisplayTerrain(ourmaps[i],xx,yy,xx,yy,0);
        terrain += "<td style='width:32px;height:32px;background-image:url(\"graphics/" + terr.showGraphic + "\"); background-repeat: no-repeat; background-position: " + terr.graphics2 + "px " + terr.graphics3 + "px'>";
        terrain += "<img width='32' height='32' src='graphics/" + terr.graphics1 + "' border='0' alt='tile " + xx + "," + yy + "' /></td>";
        
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
    
    var docterr = debugmaps[mapname].document.getElementById("terrain_" + mapname);
    docterr.innerHTML = terrain;
    var docmain = debugmaps[mapname].document.getElementById("main_" + mapname);
    docmain.innerHTML = mainview;
    
  }
}

function DebugGetDisplayCell(mapname, centerx, centery, x, y, tp, ev) {

  var displayCell = {};
  var localacre = mapname.getTile(x,y);
  
  var displaytile;
  // decide whether to draw a tile, draw it shaded, or make it darkness
  var losresult = 0;

  var blocks = localacre.getBlocksLOS();
  
  var lighthere = 1;
  
  displaytile = localacre.getTop(0,1);  // sorts NPCs to top
  var isnpc = 0;
  if (displaytile.checkType("NPC")) { isnpc = 1; }
  var graphics = displaytile.getGraphicArray();
  var showGraphic = graphics[0];
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
      var setbelow = displaytile.setByBelow(x,y,mapname);
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
  
  var localacre = mapref.getTile(xcoord, ycoord);
  var displaytile = localacre.getTerrain();

  var graphics = displaytile.getGraphicArray();
  var showGraphic = graphics[0];

  var displayCell = {};
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

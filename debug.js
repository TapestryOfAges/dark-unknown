
"use strict";

var debug = 0;
var debugscreen;
var dbs;
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
  debugflags.first = 1;
// var deeptest = 0;

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

if (debug) {  ActivateDebug(); }

function ActivateDebug() { 
  if (!dbs) {
    debugscreen = window.open('','debugscreen');
    dbs = debugscreen.document;
  }
  
  var wide = $(window).width() - 800;
  if (!wide) { wide = 300; }
  var tall = $(window).height() - 30;
  $("body").append("<div style='position:absolute;left:790px;top:0px;width:" + wide + "px;height:" + tall + "px;overflow-y:scroll;background-color:white;color:black;font-size:smaller' id='debugdiv'></div>");
  var buttonleft = 800+wide/2;
  var buttontop = tall+10;
  $("body").append("<div style='position:absolute;left:" + buttonleft + ";top:" + buttontop + ";background-color:white' onClick='ClearDebug()'>Clear Debug</div>");
  $("#debugdiv").html("<div style='text-align:center'>DEBUG PANE");
  
  targetCursor.page = 1;
  targetCursor.cmd = "debug";
    
  DrawDebugOptions();		

}

function DebugWrite(category, html) {
  if (debug && debugflags[category]) {
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
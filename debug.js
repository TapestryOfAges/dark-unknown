
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
// var deeptest = 0;

if (debug) {  ActivateDebug(); }

function ActivateDebug() { 
  if (!dbs) {
    debugscreen = window.open('','debugscreen');
    dbs = debugscreen.document;
  }
  
  var wide = $(window).width() - 800;
  if (!wide) { wide = 300; }
  var tall = $(window).height() - 30;
  $("body").html($("body").html() + "<div style='position:absolute;left:790px;top:0px;width:" + wide + "px;height:" + tall + "px;overflow-y:scroll;background-color:white;color:black' id='debugdiv'></div>");
  $("#debugdiv").html("<div style='text-align:center'>DEBUG PANE");
  
  targetCursor.page = 1;
  targetCursor.cmd = "debug";
    
  DrawDebugOptions();		

}

function DebugWrite(category, html) {
  if (debug && debugflags[category]) {
    $("#debugdiv").html($("#debugdiv").html() + html);
    return 1;
  } 
  return 0;
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
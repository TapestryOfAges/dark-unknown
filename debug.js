
"use strict";

var debug = 0;
var debugscreen;
var dbs;
var debugflags = {};
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
  
  targetCursor.page = 1;
  targetCursor.cmd = "debug";
    
  DrawDebugOptions();		

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
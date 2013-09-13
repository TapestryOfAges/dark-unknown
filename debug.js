
var debug = 0;
var debugscreen;
var dbs;

if (debug) {  ActivateDebug(); }

function ActivateDebug() { 
  debugscreen = window.open('','debugscreen');
  dbs = debugscreen.document;
}


function TestNetwork(mapref, network) {
  var web = mapref.network[network];
  for (i=0; i<web.length; i++) {
    var conn = web[i].connections;
    var loopback = 0;
    for (j=0; j<conn.length; j++) {
      var innerconn = conn[j].connections;
      for (k=0; k<innerconn.length; k++) {
        if (innerconn[k] == web[i]) { loopback = 1; }
      }
    }
    if (!loopback) { alert(i + " does not loop back."); }
  }
  alert("Check complete.");
}
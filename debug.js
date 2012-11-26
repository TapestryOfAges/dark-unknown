
var debug = 0;
var debugscreen;
var dbs;

if (debug) {  ActivateDebug(); }

function ActivateDebug() { 
  debugscreen = window.open('','debugscreen');
  dbs = debugscreen.document;
}

// Finished but untested

// clearListeners goes through list of listeners and prunes ones whose maps are out of memory
// clearListener actually deletes the listener

// addListener wants a DUEar object 

// when anything sends an event it sends it to the one DUListener object instantiated in main.js

"use strict";

function DUListener() {
  this.listeners = new Collection();
}
DUListener.prototype = new Object();

DUListener.createListener = function(name, listenname, flags, linkedmap) {
  let tmplistener = new DUEar;
  DUEar.name = name;
  DUEar.listenforname = listenname;
  DUEar.flagsreq = flags;
  if (typeof linkedmap !== "string") {
    linkedmap = linkedmap.getName();
  }
  DUEar.linkedtomap = linkedmap;

  this.addListener(tmplistener);
}

DUListener.prototype.addListener = function(newlistener) {
  this.listeners.addTop(newlistener);
}

DUListener.prototype.clearListeners = function() {
  var allears = this.listeners.getAll();
  if (allears.length) {
    for (var i = 0; i<allears.length; i++) {
      if (allears[i].linkedtomap) {
        var mapexists = maps.getMap(allears[i].linkedtomap);
        if (mapexists === undefined) {
          this.clearListener(allears[i].name);
        }
      }
    }
  }
}

DUListener.prototype.clearListener = function(listname) {
  var findlistener = this.listeners.getByName(listname);
  if (findlistener) {
    DebugWrite("events", "Deleting listener " + findlistener.getName() + ".<br />");
    this.listeners.deleteFrom(findlistener);
  }
}

DUListener.prototype.sendEvent = function(ev) {
  this.clearListeners();
  
  var allears = this.listeners.getAll();
  if (allears.length === 0) { 
    DebugWrite("events", "Event sent, no listeners.<br />");
    return;
  }
  for (var i=0; i<allears.length; i++) {
    if (allears[i].linkedtomap === ev.source.getHomeMap().getName()) {
      if (allears[i].listenforname === ev.name) {
        var flagsmatch = 1;
        $.each(allears[i].flagsreq, function(idx2, val2) {
          if (ev.flags[idx2] && (ev.flags[idx2] === val2)) {
            DebugWrite("events", "Flag " + idx2 + " matched - values " + val2 + ".<br />");
          } else {
            flagsmatch = 0;
          }
        });
        $.each(ev.flags, function(idx2, val2) {
          if (allears[i].flagsreq[idx2] && (allears[i].flagsreq[idx2] === val2)) {
            DebugWrite("events", "Flag " + idx2 + " matched - values " + val2 + ".<br />");
          } else {
            flagsmatch = 0;
          }          
        });
        if (flagsmatch) {
          EventFunctions[allears[i].name](ev);
        }
      }
    }
  }
}

function DUEar() {
  this.name;
  this.listenforname;
//  this.callfunc;
  this.flagsreq = {};
  this.linkedtomap;  // name
}
DUEar.prototype = new Object();

DUEar.prototype.getName = function() {
  return this.name;
}

function DUEvent(nm, srcs, flags) {
  this.name = nm;
  this.source = srcs;
  this.flags = flags;
}
DUEvent.prototype = new Object();


var EventFunctions = new Object();
// all listener funccalls must be attached to this object globally, for purposes of managing save/load

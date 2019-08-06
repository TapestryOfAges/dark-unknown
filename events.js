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

DUListener.prototype.createListener = function(name, listenname, flags, linkedmap) {
  this.clearListeners();
  let tmplistener = new DUEar;
  tmplistener.name = name;
  tmplistener.listenforname = listenname;
  tmplistener.flagsreq = flags;
  if (typeof linkedmap !== "string") {
    linkedmap = linkedmap.getName();
  }
  tmplistener.linkedtomap = linkedmap;

  this.addListener(tmplistener);
}

DUListener.prototype.addListener = function(newlistener) {
  this.listeners.addTop(newlistener);
}

DUListener.prototype.clearListeners = function() {
  let allears = this.listeners.getAll();
  if (allears.length) {
    for (let i=0; i<allears.length; i++) {
      if (allears[i].linkedtomap) {
        let mapexists = maps.getMap(allears[i].linkedtomap);
        if (mapexists === undefined) {
          this.clearListener(allears[i].name);
        }
      }
    }
  }
}

DUListener.prototype.clearListener = function(listname) {
  let findlistener = this.listeners.getByName(listname);
  if (findlistener) {
    DebugWrite("events", "Deleting listener " + findlistener.getName() + ".<br />");
    this.listeners.deleteFrom(findlistener);
  }
}

DUListener.prototype.sendEvent = function(ev) {
  this.clearListeners();
  
  let allears = this.listeners.getAll();
  if (allears.length === 0) { 
    DebugWrite("events", "Event sent, no listeners.<br />");
    return;
  }
  for (let i=0; i<allears.length; i++) {
    if (allears[i].linkedtomap === ev.source.getHomeMap().getName()) {
      if (allears[i].listenforname === ev.name) {
        let flagsmatch = 1;
        for (let idx in allears[i].flagsreq) {
          let val = allears[i].flagsreq[idx];
          if (ev.flags[idx] && (ev.flags[idx] === val)) {
            DebugWrite("events", "Flag " + idx + " matched - values " + val + ".<br />");
          } else {
            flagsmatch = 0;
          }
        };
        for (let idx2 in ev.flags) {
          let val2 = ev.flags[idx2];
          if (allears[i].flagsreq[idx2] && (allears[i].flagsreq[idx2] === val2)) {
            DebugWrite("events", "Flag " + idx2 + " matched - values " + val2 + ".<br />");
          } else {
            flagsmatch = 0;
          }          
        };
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


let EventFunctions = new Object();
// all listener funccalls must be attached to this object globally, for purposes of managing save/load

EventFunctions["BDragon"] = function(ev) {
  let bdmap = ev.source.getHomeMap();
  if (bdmap.getName() === "blackdragon") {
    let npcs = bdmap.npcs.getAll();
    let prince, dragon, justice;
    let guards = [];
    for (let i=0;i<npcs.length;i++) {
      if (npcs[i].getNPCName() === "Prince Lance") { prince = npcs[i]; }
      if (npcs[i].getName() === "TownGuardNPC") { guards[guards.length] = npcs[i]; }
      if (npcs[i].getNPCName() === "Justice") { justice = npcs[i]; }
      if (npcs[i].getNPCName() === "Black Dragon") { dragon = npcs[i]; }
    }
    if (IsVisibleOnScreen(prince)) {
      maintext.delayedAddText("There is a heartbeat where nothing moves and the air stills, and then Lance's eyes roll back in his head and he collapses unconscious.");
      maintext.delayedAddText('The dragon looks at him, and then at you. "How disappointing."');
      maintext.delayedAddText('And then it roars and lunges at you!');

      prince.realgraphic = prince.getGraphicArray();
      prince.setGraphicArray("master_spritesheet.png","","-64","-800");
   
      Close_BDC_Gate(bdmap);

      dragon.setAttitude("hostile");
      dragon.setCurrentAI("seekPC-30");
      dragon.setAggro(1);
      

    }
  }
}

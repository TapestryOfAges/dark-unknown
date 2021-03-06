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
      else if (npcs[i].getName() === "TownGuardNPC") { 
        guards[guards.length] = npcs[i]; 
        npcs[i].resists["fire"] = 50;  // make the guards somewhat more resistant to dragonfire
      }
      else if (npcs[i].getNPCName() === "Justice") { justice = npcs[i]; justice.setAttitude("neutral")}
      else if (npcs[i].getNPCName() === "Black Dragon") { dragon = npcs[i]; }
      else {
        npcs[i].setAttitude("neutral"); // randos shouldn't be killed by the dragon
      }
    }
    if (IsObjectVisibleOnScreen(prince)) {
      maintext.delayedAddText("There is a heartbeat where nothing moves and the air stills, and then Lance's eyes roll back in his head and he collapses unconscious.");
      gamestate.setMode("anykey");
      maintext.setInputLine("&gt;[MORE]");
      maintext.drawTextFrame(); 
      targetCursor.command = "endact";
      targetCursor.prince = prince;
      targetCursor.dragon = dragon;
      targetCursor.endact = 1;
      DU.gameflags.setFlag("endAct1",1);
      let uii = document.getElementById('uiinterface');
      if (uii) {
        uii.innerHTML = `<img src="graphics/spacer.gif" width="416" height="416" />`;
        uii.style.backgroundColor = "";
        uii.style.opacity = 0;
        uii.style.backgroundImage = `url('graphics/splash/CoverArt.png')`;  
        uii.classList.add("titlefadein");
        setTimeout(function() { uii.classList.remove("titlefadein"); uii.style.opacity = 1; }, 1700);
//        console.log(uii);
      } else {
        console.log("what happened?"); 
      }
      if (DU.gameflags.getFlag("music")) {
        DUPlayMusic("Tension", {fade:1});
      }        
    }
  }
}

EventFunctions["SimonHarp"] = function(ev) {
  let shmap = ev.source.getHomeMap();
  if (shmap.getName() === "swainhil") {
    let npcs = shmap.npcs.getAll();
    let simon;
    let guards = [];
    for (let i=0;i<npcs.length;i++) {
      if (npcs[i].getNPCName() === "Simon") { simon = npcs[i]; }
    }
    if (simon && IsObjectVisibleOnScreen(simon)) {
      if (DU.gameflags.getFlag("bard_simon_ask") && !DU.gameflags.getFlag("bard_simon_played")) {
        DU.gameflags.setFlag("bard_simon_played", 1);
        maintext.delayedAddText('Simon smiles wildly. "Well done! Well played, indeed. Surely, you will be a fine addition to the bards."');
      }
    }
  }
  Listener.clearListener("SimonHarp");
}


EventFunctions["OpenCons"] = function(ev) {
  DU.gameflags.setFlag("enter_consolation",1);
  DU.gameflags.deleteFlag("consolation_test");
  Listener.clearListener("OpenCons");
  let ashlin = PC.getHomeMap().getTile(14,24).getTopNPC();
  if (ashlin) {
    PC.forcedTalk = ashlin;
  } else { alert("No Ashlin?"); }
}

EventFunctions["BanditYell"] = function(ev) {
  let npcs = PC.getHomeMap().npcs.getAll();
  let nonspiders = [];
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName() !== "GiantSpiderNPC") { nonspiders.push(npcs[i]); }
  }
  if (nonspiders.length) {
    for (let i=0;i<nonspiders.length;i++) {
      if (nonspiders[i].getAggro()) { return; }
    }
    maintext.delayedAddText('You hear a voice from deeper in the cave. "What was that? I think I heard something."');
  }
  Listener.clearListener("BanditYell");
}

"use strict";

var gamestate = new GameStateData();

function GameStateData() {
	this.mode = "null";
	this.turn = {};
	// player, NPC, null, target, conversation, anykey
}

function Gameflags() {
  this.music = 0;
  this.sound = 1;
  this.tablet = 0;
  this.autosave = 0;
  this.negate = {};
  this.karma = 0;
  
  this.getFlag = function(flag) { return this[flag]; }
  this.setFlag = function(flag, val) { this[flag] = val; return this[flag]; }
  this.deleteFlag = function(flag) { delete this[flag]; }
}
Gameflags.prototype = new Object();



GameStateData.prototype.loadTmp = function() {
  gamestate.setMode("null");
	// Temporarily, this will return demo values
//  PC.setx(47);
//  PC.sety(49);
  PC.setx(13);
  PC.sety(19);

	PC.setPCName("Goldenflame");
	var themap;
	if (maps.getMap("darkunknown")) {
	  themap = maps.getMap("darkunknown");
	} else {
	  themap = new GameMap();
    themap.loadMap("darkunknown");
    maps.addMapByRef(themap);
	}
  var anothermap = new GameMap();
  anothermap.loadMap("pitdespair1");
	PC.setHomeMap(anothermap);
	maps.addMapByRef(anothermap);
//  PC.setHomeMap(themap);
  var rats = localFactory.createTile("GiantBatNPC");
  anothermap.placeThing(12,20,rats);
  var rats2 = localFactory.createTile("GiantBatNPC");
  anothermap.placeThing(14,20,rats2);
  var rats3 = localFactory.createTile("GiantInsectsNPC");
  anothermap.placeThing(12,18,rats3);
  var rats4 = localFactory.createTile("GiantInsectsNPC");
  anothermap.placeThing(14,18,rats4);

  var dagger = localFactory.createTile("Dagger");
  PC.addToInventory(dagger, 1);
  PC.addGold(1000);
  PC.setEquipment("weapon",dagger);
  var armor = localFactory.createTile("ClothArmor");
  PC.addToInventory(armor, 1);
  PC.setEquipment("armor",armor);
  dagger = localFactory.createTile("Longsword");
  PC.addToInventory(dagger,1);
  
  // Let's add some of everything!
  // <meme>ADD ALL THE THINGS!</meme>
  dagger = localFactory.createTile("Longsword");
  PC.addToInventory(dagger,1);
  // Let's see if the quantity increases- it does now!
  PC.addToInventory(localFactory.createTile("LeatherArmor"),1);
  PC.addToInventory(localFactory.createTile("ChainArmor"),1);
  PC.addToInventory(localFactory.createTile("PlateArmor"),1);
  PC.addToInventory(localFactory.createTile("ExoticArmor"),1);
  PC.addToInventory(localFactory.createTile("Shortsword"),1);
  PC.addToInventory(localFactory.createTile("Mace"),1);
  PC.addToInventory(localFactory.createTile("Axe"),1);
  PC.addToInventory(localFactory.createTile("Halberd"),1);
  PC.addToInventory(localFactory.createTile("MagicSword"),1);
  PC.addToInventory(localFactory.createTile("Sling"),1);
  PC.addToInventory(localFactory.createTile("Bow"),1);
  PC.addToInventory(localFactory.createTile("Crossbow"),1);
  
	maps.addMapByRef(themap);
	if (themap.getLinkedMaps().length > 0) {
		for (var i = 0; i < themap.getLinkedMaps().length; i++) {
			if (themap.getLinkedMaps()[i] != "") {
				var anothermap = new GameMap();
				anothermap.loadMap(themap.getLinkedMaps()[i]);
				maps.addMapByRef(anothermap);
			}
		}
	}
//	DUTime.setGameClock(0);
  PC.getHomeMap().placeThing(PC.getx(),PC.gety(),PC);
	var PCEvent = new GameEvent(PC);
	DUTime.addAtTimeInterval(PCEvent,.0001);
//  var nextEvent = DUTime.executeNextEvent();
//  var nextEntity = nextEvent.getEntity();
//  nextEntity.myTurn();
  startScheduler();
}

// eventually use var compressed = LZString.compressToUTF16(string); and string = LZString.decompressFromUTF16(localStorage.getItem("myData"));
// also, respect .nosave property
GameStateData.prototype.saveGame = function(flag) {
  gamestate.setMode("loadgame");
	var savedata = {};
	
	savedata.time = DUTime.getGameClock();   // no timeline- .copy needs to add a time field if an item is on the timeline
	savedata.gameflags = {};
	$.extend(true,savedata.gameflags,DU.gameflags);
	savedata.objs = {};
	savedata.maps = [];       // this turns into a list of names of maps, to be re-loaded on load
	
	savedata.events = {};
	Listener.clearListeners(); // clear out unneeded listeners
	var currlisteners = Listener.listeners.getAll();
	$.each(currlisteners, function(idx,val) {
	  savedata.events[val.name] = {};
	  savedata.events[val.name].listenforname = val.listenforname;
	  savedata.events[val.name].flagsreq = val.flagsreq;
	  savedata.events[val.name].linkedtomap = val.linkedtomap;
	});
	
	$.each(DU.maps.data, function(idx, val) {
	  savedata.maps.push(idx);
	  
	  // save features
	  var mapfeatures = val.features.getAll();
//	  if (debug && debugflags.saveload) { dbs.writeln("<br /><span style='font-weight:bold'>Copying " + mapfeatures.length + " features from map " + idx + "</span><br />"); }
	  DebugWrite("saveload", "<br /><span style='font-weight:bold'>Copying " + mapfeatures.length + " features from map " + idx + "</span><br />");
	  $.each(mapfeatures, function(feaidx, feaval) {
	    if (!feaval.nosave) {
  	    var copies = feaval.copy();
	      $.each(copies, function(copidx, copval) {
//	        if (debug && debugflags.saveload) { dbs.writeln("<br /><span style='font-weight:bold'>!Adding " + copval.name + " to save object!</span><br />"); }
	        DebugWrite("saveload", "<br /><span style='font-weight:bold'>!Adding " + copval.name + " to save object!</span><br />");
	        savedata.objs[copval.serial] = copval;
	      });
	    }
	  });
	  
	  // save NPCs
	  var mapnpcs = val.npcs.getAll();
//	  if (debug && debugflags.saveload) { dbs.writeln("<br /><span style='font-weight:bold'>Copying " + mapnpcs.length + " NPCs from map " + idx + "</span><br />"); }
	  DebugWrite("saveload", "<br /><span style='font-weight:bold'>Copying " + mapnpcs.length + " NPCs from map " + idx + "</span><br />");
	  $.each(mapnpcs, function (npcidx, npcval) {
	    if (!npcval.nosave) {
	      var copies = npcval.copy();
  	    // note- this is going to explode gloriously if I have a closed loop anywhere other than to and from maps
	      // so far so good though!
	      $.each(copies, function(copidx, copval) {
//	        if (debug && debugflags.saveload) { dbs.writeln("<br /><span style='font-weight:bold'>!Adding " + copval.name + " to save object!</span><br />"); }
	        DebugWrite("saveload", "<br /><span style='font-weight:bold'>!Adding " + copval.name + " to save object!</span><br />");
	        savedata.objs[copval.serial] = copval;
	      });
	    }
	    
	  });
	});
	
	// save the PC!
	var copies = PC.copy();
	$.each(copies, function(copidx, copval) {
    if (copval.name === "PC") {
      copval.timestamp = savedata.time;
      copval.traceback.push("timeline");
    }
    savedata.objs[copval.serial] = copval;
	});

  var serialized = JSON.stringify(savedata);
	var compressed = LZString.compressToUTF16(serialized);
	
//	if (debug && debugflags.saveload) { dbs.writeln("<br /><br /><p>" + serialized + "</p><br />"); }
	DebugWrite("saveload", "<br /><br /><p>" + serialized + "</p><br />");
	//this is where we would add a prompt for save game name if we want to allow multiple saves
	
	if (flag === 'external') {
	  savescreen = window.open('','savescreen');
	  savescreen.document.write(serialized);
/*	} else if (flag === "charsave") {
	  localStorage.charsave = compressed;
	} else {
	  localStorage.savegame = compressed;
	}
*/
  }	else {
//    localStorage["save"+flag] = compressed;
    localStorage["save"+flag] = serialized;
    var saveidx = JSON.parse(localStorage.saveIndex);
    if (!saveidx) { saveidx =[]; }
    saveidx[flag].datestamp = Date.now();
    saveidx[flag].charname = PC.getPCName();
    saveidx[flag].loc = PC.getHomeMap().getDesc();
    saveidx[flag].graphic = PC.getGraphic();
    localStorage.saveIndex = JSON.stringify(saveidx);
    
  }
}

GameStateData.prototype.initializeSaveGames = function() {
  var saves = [];
  for (var i=0;i<=9;i++) {
    saves[i] = {datestamp: 0, charname:"",loc:"",graphic:""};
    var saveslot = "save" + i;
    localStorage[saveslot] = "";
  }
  localStorage.saveIndex = JSON.stringify(saves);
  
}

GameStateData.prototype.getLatestSaveIndex = function() {
  var lastIdx = 0;
  var lastDate = 0;
  var saveIdx = localStorage.saveIndex; 
  if (!saveIdx) { return -1; }
  saveIdx = JSON.parse(saveIdx);
  if (!saveIdx) { return -1; }
  for (var i=1;i<=9;i++) {
    if (saveIdx[i].datestamp > lastDate) {
      lastIdx = i;
      lastDate = saveIdx[i].datestamp;
    }
  }
  if (!saveIdx[lastIdx].charname) { lastIdx = -1; }
  return lastIdx;
}

GameStateData.prototype.loadGame = function(idx) {
  gamestate.setMode("loadgame");
  
//  if (!localStorage.savegame && !localStorage.manualsave && !localStorage.charsave) {
//    if (debug && debugflags.saveload) { dbs.writeln("<br /><br /><p>LOADING TMP VALUES</p><br />"); }
  if (idx === "tmp") {
    DebugWrite("saveload", "<br /><br /><p>LOADING TMP VALUES</p><br />");
    gamestate.loadTmp();
    return;
  }

  var compressed;
  var serialized;
  
//  if (debug && debugflags.saveload) { dbs.writeln("<p><span style='font-weight:bold'>Start load procedure:</span><br />"); }
  DebugWrite("saveload", "<p><span style='font-weight:bold'>Start load procedure from slot " + idx + ":</span><br />");

/*
  if (localStorage.charsave) {
    compressed = localStorage.charsave;
    serialized = LZString.decompressFromUTF16(compressed);
    delete localStorage.charsave;    
  } else if (localStorage.manualsave) {
    serialized = localStorage.manualsave;
    delete localStorage.manualsave;
  } else {
    compressed = localStorage.savegame;
    serialized = LZString.decompressFromUTF16(compressed);
  }
*/

  if (localStorage.manualsave) {
    serialized = localStorage.manualsave;
  } else {
//    compressed = localStorage["save"+idx];
//    serialized = LZString.decompressFromUTF16(compressed);
    serialized = localStorage["save"+idx];
  }

  DebugWrite("saveload", "<br /><br /><p>" + serialized + "</p><br />");
  var savedata = JSON.parse(serialized);  
  var universe = {};
  
  var loadmaps = {};
  DU.maps = new MapMemory();
  maps = DU.maps; // re-alias
  DU.DUTime = new Timeline(0);
  DUTime = DU.DUTime;

  DUTime.setGameClock(savedata.time);
  DU.gameflags = new Gameflags();
  $.extend(true,DU.gameflags,savedata.gameflags);
  
  nowplaying = {};  
  ambient = {};  

  
  $.each(savedata.events, function(idx,val) {
    var tmplistener = new DUEar();
    tmplistener.name = idx;
    tmplistener.listenforname = val.listenforname;
    tmplistener.linkedtomap = val.linkedtomap;
    tmplistener.flagsreq = val.flagsreq;
    Listener.addListener(tmplistener);
  });
    
  $.each(savedata.maps, function(idx, val) {
    //load all the maps
    loadmaps[val] = new GameMap();
    loadmaps[val].loadMap(val);
  	maps.addMapByRef(loadmaps[val]);
    DebugWrite("saveload", "Loaded map: " + val + "<br />");
  });
  
  DebugWrite("saveload", "<br /><h3>Done loading maps, on to objs...</h3>");
  
  // go through all the objects that were saved
  $.each(savedata.objs, function(idx, val) {
    // idx is the serial, val is the object with only saved properties
    var savename = val.name;
    DebugWrite("saveload", "Loading object: " + savename + ", serial # " + idx + "...<br />");
    var newobj = localFactory.createTile(savename);
    $.each(val, function(svidx, svval) {
      DebugWrite("saveload", "&nbsp;&nbsp;Loading property " + svidx + ", saving " + svval + "...<br />");
      newobj[svidx] = svval;
    });
    universe[idx] = newobj;
  });

  DebugWrite("saveload", "<br />SECOND RUN THROUGH LOADED OBJECTS<br />");
  var topserial = 1;
  $.each(universe, function(idx, val) {
    
    if (val.serial > topserial) { topserial = val.serial; }
    DebugWrite("saveload", "Processing object: " + val.name + ", serial # + " + idx + "...<br />SERIALIZED NEW VERSION: " + JSON.stringify(val) +"<br />");
    if (val.serial == 1) { PC = val; }

    if (val.spawned) {
      var spawnlist = val.spawned;
      val.spawned = new Collection();
      $.each(spawnlist, function(spawnidx, spawnval) {
        val.spawned.addTop(universe[spawnval]);
      });
    } 
    if (val.inventory) {
      DebugWrite("saveload", val.name + " has an inventory, processing...");
      var inv = val.inventory;
      val.inventory = new Collection();
      $.each(inv, function(invidx, invval) {
        DebugWrite("saveload", "adding " + universe[invval].name + "... ");
        val.addToInventory(universe[invval], 1);
      });
      DebugWrite("saveload", "<br />");
    } else {
      val.inventory = new Collection();
    }
    if (val.spawnedBy) {
      DebugWrite("saveload", val.name + " was spawned by something, processing...");
      val.spawnedBy = universe[val.spawnedBy];
    }
    if (val.equipment) {
      DebugWrite("saveload", val.name + " has equipment, processing...");
      var inv = val.equipment;
      val.equipment = {};
      $.each(inv,function(invidx, invval) {
        var equipment = universe[invval];
        if (equipment.checkType("Armor")) {
          DebugWrite("saveload", "adding " + equipment.name + "... ");
          val.setArmor(equipment);
        }
        if (equipment.checkType("Weapon") && !equipment.checkType("Missile")) {
          DebugWrite("saveload", "adding " + equipment.name + "... ");
          val.setWeapon(equipment);
        }
        if (equipment.checkType("Missile")) {
          DebugWrite("saveload", "adding " + equipment.name + "... ");
          val.setMissile(equipment);
        }
      });
      DebugWrite("saveload", "<br />");
    } 
    if (val.spellEffects) {
      var inv = val.spellEffects;
      val.spellEffects = new Collection();
      $.each(inv, function(invidx, invval) {
        // don't use addSpellEffect, as that activates it and will double the effect
        val.spellEffects.addBottom(universe[invval]);
      });
    } else {
      val.spellEffects = new Collection();
    }
    if (val.traceback) {
      $.each(val.traceback, function(tbidx, ibval) {
        // things will have 0 (if in inventory or the like), 1 (on a map), or 2 (map and timeline) entries here
        if (ibval === "homeMap") {
          DebugWrite("saveload", "&nbsp;&nbsp;Setting home map to " + val.homeMap + "...<br />");
          loadmaps[val.homeMap].placeThing(val.x, val.y, val);
        }
        if (ibval == "timeline") {
          var newEvent = new GameEvent(val);
          DUTime.addAtTime(newEvent, val.timestamp);
          delete val.timestamp;
        }
        
      });
      delete val.traceback;
    }
    if (val.name === "PC") {
      PC = val;
    }
    
  });

  maxserial = topserial;
  if (DU.gameflags.getFlag("music")) {  
    var song = PC.getHomeMap().getMusic();
    nowplaying = DUPlayMusic(song);
  }
  startScheduler();
}

GameStateData.prototype.setMode = function(mode) {
	this.mode = mode;
}

GameStateData.prototype.getMode = function() {
	return this.mode;
}

GameStateData.prototype.setTurn = function(whoseturn) {
	this.turn = whoseturn;
}

GameStateData.prototype.getTurn = function() {
	return this.turn;
}

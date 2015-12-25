"use strict";

var gamestate = new GameStateData();

function GameStateData() {
	this.mode = "null";
	this.turn = {};
	// player, NPC, null, target, conversation, anykey
}



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
	
	$.each(DU.maps.data, function(idx, val) {
	  savedata.maps.push(idx);
	  
	  // save features
	  var mapfeatures = val.features.getAll();
	  if (debug && debugflags.saveload) { dbs.writeln("<br /><span style='font-weight:bold'>Copying " + mapfeatures.length + " features from map " + idx + "</span><br />"); }
	  $.each(mapfeatures, function(feaidx, feaval) {
	    if (!feaval.nosave) {
  	    var copies = feaval.copy();
	      $.each(copies, function(copidx, copval) {
	        if (debug && debugflags.saveload) { dbs.writeln("<br /><span style='font-weight:bold'>!Adding " + copval.name + " to save object!</span><br />"); }
	        savedata.objs[copval.serial] = copval;
	      });
	    }
	  });
	  
	  // save NPCs
	  var mapnpcs = val.npcs.getAll();
	  if (debug && debugflags.saveload) { dbs.writeln("<br /><span style='font-weight:bold'>Copying " + mapnpcs.length + " NPCs from map " + idx + "</span><br />"); }
	  $.each(mapnpcs, function (npcidx, npcval) {
	    if (!npcval.nosave) {
	      var copies = npcval.copy();
  	    // note- this is going to explode gloriously if I have a closed loop anywhere other than to and from maps
	      // so far so good though!
	      $.each(copies, function(copidx, copval) {
	        if (debug && debugflags.saveload) { dbs.writeln("<br /><span style='font-weight:bold'>!Adding " + copval.name + " to save object!</span><br />"); }
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
	
	if (debug && debugflags.saveload) { dbs.writeln("<br /><br /><p>" + serialized + "</p><br />"); }
	//this is where we would add a prompt for save game name if we want to allow multiple saves
	
	if (flag === 'external') {
	  savescreen = window.open('','savescreen');
	  savescreen.document.write(serialized);
	} else if (flag === "charsave") {
	  localStorage.charsave = compressed;
	} else {
	  localStorage.savegame = compressed;
	}
	
}

GameStateData.prototype.loadGame = function() {
  gamestate.setMode("loadgame");
  
  if (!localStorage.savegame && !localStorage.manualsave && !localStorage.charsave) {
    if (debug && debugflags.saveload) { dbs.writeln("<br /><br /><p>LOADING TMP VALUES</p><br />"); }
    gamestate.loadTmp();
    return;
  }

  var compressed;
  var serialized;
  
  if (debug && debugflags.saveload) { dbs.writeln("<p><span style='font-weight:bold'>Start load procedure:</span><br />"); }

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
  if (debug && debugflags.saveload) { dbs.writeln("<br /><br /><p>" + serialized + "</p><br />"); }
  var savedata = JSON.parse(serialized);  
  var universe = {};
  
  DUTime.setGameClock(savedata.time);
  DU.gameflags = {};
  $.extend(true,DU.gameflags,savedata.gameflags);
  
  var loadmaps = {};
  
  $.each(savedata.maps, function(idx, val) {
    //load all the maps
    loadmaps[val] = new GameMap();
    loadmaps[val].loadMap(val);
  	maps.addMapByRef(loadmaps[val]);
    if (debug && debugflags.saveload) { dbs.writeln("Loaded map: " + val + "<br />"); }
  });
  
  if (debug && debugflags.saveload) { dbs.writeln("<br /><h3>Done loading maps, on to objs...</h3>"); }
  
  // go through all the objects that were saved
  $.each(savedata.objs, function(idx, val) {
    // idx is the serial, val is the object with only saved properties
    var savename = val.name;
    if (debug && debugflags.saveload) { dbs.writeln("Loading object: " + savename + ", serial # " + idx + "...<br />"); }
    var newobj = localFactory.createTile(savename);
    $.each(val, function(svidx, svval) {
      if (debug && debugflags.saveload) { dbs.writeln("&nbsp;&nbsp;Loading property " + svidx + ", saving " + svval + "...<br />"); }  
      newobj[svidx] = svval;
    });
    universe[idx] = newobj;
  });

  if (debug && debugflags.saveload) { dbs.writeln("<br />SECOND RUN THROUGH LOADED OBJECTS<br />"); }
  var topserial = 1;
  $.each(universe, function(idx, val) {
    
    if (val.serial > topserial) { topserial = val.serial; }
    if (debug && debugflags.saveload) { dbs.writeln("Processing object: " + val.name + ", serial # + " + idx + "...<br />"); }
    if (debug && debugflags.saveload) { dbs.writeln("SERIALIZED NEW VERSION: " + JSON.stringify(val) +"<br />"); }
    if (val.serial == 1) { PC = val; }

    if (val.spawned) {
      var spawnlist = val.spawned;
      val.spawned = new Collection();
      $.each(spawnlist, function(spawnidx, spawnval) {
        val.spawned.addTop(universe[spawnval]);
      });
    } 
    if (val.inventory) {
      if (debug && debugflags.saveload) { dbs.writeln(val.name + " has an inventory, processing..."); }
      var inv = val.inventory;
      val.inventory = new Collection();
      $.each(inv, function(invidx, invval) {
        if (debug && debugflags.saveload) { dbs.writeln("adding " + universe[invval].name + "... "); }
        val.addToInventory(universe[invval], 1);
      });
      if (debug && debugflags.saveload) { dbs.writeln("<br />"); }
    } else {
      val.inventory = new Collection();
    }
    if (val.spawnedBy) {
      if (debug && debugflags.saveload) { dbs.writeln(val.name + " was spawned by something, processing..."); }
      val.spawnedBy = universe[val.spawnedBy];
    }
    if (val.equipment) {
      if (debug && debugflags.saveload) { dbs.writeln(val.name + " has equipment, processing..."); }
      var inv = val.equipment;
      val.equipment = {};
      $.each(inv,function(invidx, invval) {
        var equipment = universe[invval];
        if (equipment.checkType("Armor")) {
          if (debug && debugflags.saveload) { dbs.writeln("adding " + equipment.name + "... "); }
          val.setArmor(equipment);
        }
        if (equipment.checkType("Weapon") && !equipment.checkType("Missile")) {
          if (debug && debugflags.saveload) { dbs.writeln("adding " + equipment.name + "... "); }
          val.setWeapon(equipment);
        }
        if (equipment.checkType("Missile")) {
          if (debug && debugflags.saveload) { dbs.writeln("adding " + equipment.name + "... "); }
          val.setMissile(equipment);
        }
      });
      if (debug && debugflags.saveload) { dbs.writeln("<br />"); }
    } 
//    if (val.target) {
//      val.target = universe[val.target];
//    } else {
//      val.target = {};
//    }
    if (val.spellEffects) {
      var inv = val.spellEffects;
      val.spellEffects = new Collection();
      $.each(inv, function(invidx, invval) {
        val.addSpellEffect(universe[invval], 1);
      });
    } else {
      val.spellEffects = new Collection();
    }
    if (val.traceback) {
      $.each(val.traceback, function(tbidx, ibval) {
        // things will have 0 (if in inventory or the like), 1 (on a map), or 2 (map and timeline) entries here
        if (ibval === "homeMap") {
          if (debug && debugflags.saveload) { dbs.writeln("&nbsp;&nbsp;Setting home map to " + val.homeMap + "...<br />"); }          
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

  if (DU.gameflags.music) {  
    var song = PC.getHomeMap().getMusic();
    nowplaying = PlaySound(song);
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

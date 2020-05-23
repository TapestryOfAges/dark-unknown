"use strict";

function Gameflags() {
  this.music = 0;
  this.sound = 1;
  this.tablet = 0;
  this.autosave = 0;
  this.negate = {};
  
  this.getFlag = function(flag) { return this[flag]; }
  this.setFlag = function(flag, val) { this[flag] = val; return this[flag]; }
  this.deleteFlag = function(flag) { delete this[flag]; }
}
Gameflags.prototype = new Object();

let gamestate = new GameStateData();

function GameStateData() {
	this.mode = "null";
	this.turn = {};
	// player, NPC, null, target, conversation, anykey
}

GameStateData.prototype.loadTmp = function() {
  gamestate.setMode("null");
  PC.setx(13);
  PC.sety(19);

	PC.setPCName("Goldenflame");
	let themap;
	if (maps.getMap("darkunknown")) {
	  themap = maps.getMap("darkunknown");
	} else {
	  themap = new GameMap();
    themap = maps.addMap("darkunknown");
	}
  let anothermap = new GameMap();
  anothermap = maps.addMap("pitdespair1");
	PC.setHomeMap(anothermap);
  let rats = localFactory.createTile("GiantBatNPC");
  anothermap.placeThing(12,20,rats);
  let rats2 = localFactory.createTile("GiantBatNPC");
  anothermap.placeThing(14,20,rats2);
  let rats3 = localFactory.createTile("GiantInsectsNPC");
  anothermap.placeThing(12,18,rats3);
  let rats4 = localFactory.createTile("GiantInsectsNPC");
  anothermap.placeThing(14,18,rats4);

  let dagger = localFactory.createTile("Dagger");
  PC.addToInventory(dagger, 1);
  PC.addGold(1000);
  PC.setEquipment("weapon",dagger);
  let armor = localFactory.createTile("ClothArmor");
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
		for (let i = 0; i < themap.getLinkedMaps().length; i++) {
			if (themap.getLinkedMaps()[i] != "") {
				let anothermap = new GameMap();
				anothermap = maps.addMap(themap.getLinkedMaps()[i]);
			}
		}
	}
  PC.getHomeMap().placeThing(PC.getx(),PC.gety(),PC);
	let PCEvent = new GameEvent(PC);
	DUTime.addAtTimeInterval(PCEvent,.0001);
  startScheduler();
}

// eventually use var compressed = LZString.compressToUTF16(string); and string = LZString.decompressFromUTF16(localStorage.getItem("myData"));
// also, respect .nosave property
GameStateData.prototype.saveGame = function(flag) {
  gamestate.setMode("loadgame");
	let savedata = {};
	
	savedata.time = DUTime.getGameClock();   // no timeline- .copy needs to add a time field if an item is on the timeline
  savedata.gameflags = {};
  ExtendObject(true,savedata.gameflags,DU.gameflags);
	savedata.objs = {};
	savedata.maps = [];       // this turns into a list of names of maps, to be re-loaded on load
	
  savedata.merchants = DU.merchants;
	savedata.events = {};
	Listener.clearListeners(); // clear out unneeded listeners
  let currlisteners = Listener.listeners.getAll();
  for (let i=0;i<currlisteners.length;i++) {
    let val=currlisteners[i];
	  savedata.events[val.name] = {};
	  savedata.events[val.name].listenforname = val.listenforname;
	  savedata.events[val.name].flagsreq = val.flagsreq;
	  savedata.events[val.name].linkedtomap = val.linkedtomap;
	}
  
  for (let idx in DU.maps.data) {
    let val = DU.maps.data[idx];
	  savedata.maps.push(idx);
	  
	  // save features
	  let mapfeatures = val.features.getAll();
    DebugWrite("saveload", "<br /><span style='font-weight:bold'>Copying " + mapfeatures.length + " features from map " + idx + "</span><br />");
    for (let i=0;i<mapfeatures.length;i++) {
      let feaval = mapfeatures[i];
	    if (!feaval.nosave) {
        let copies = feaval.copy();
        for (let copidx in copies) {
          let copval = copies[copidx];
	        DebugWrite("saveload", "<br /><span style='font-weight:bold'>!Adding " + copval.name + " to save object!</span><br />");
	        savedata.objs[copval.serial] = copval;
	      }
	    }
	  }
	  
	  // save NPCs
	  let mapnpcs = val.npcs.getAll();
    DebugWrite("saveload", "<br /><span style='font-weight:bold'>Copying " + mapnpcs.length + " NPCs from map " + idx + "</span><br />");
    for (let i=0;i<mapnpcs.length;i++) {
      let npcval = mapnpcs[i];
	    if (!npcval.nosave) {
	      let copies = npcval.copy();
  	    // note- this is going to explode gloriously if I have a closed loop anywhere other than to and from maps
        // so far so good though!
        for (let copidx in copies) {
          let copval = copies[copidx];
	        DebugWrite("saveload", "<br /><span style='font-weight:bold'>!Adding " + copval.name + " to save object!</span><br />");
	        savedata.objs[copval.serial] = copval;
	      }
	    } 
	  }
	}
	
	// save the PC!
  let copies = PC.copy();
  for (let copidx in copies) {
    let copval = copies[copidx];
    if (copval.name === "PC") {
      copval.timestamp = savedata.time;
      copval.traceback.push("timeline");
    }
    savedata.objs[copval.serial] = copval;
	}

  savedata.datestamp = Date.now();
  savedata.charname = PC.getPCName();
  savedata.loc = PC.getHomeMap().getSaveName();
  savedata.graphic = PC.getGraphic();
  let serialized = JSON.stringify(savedata);
	
	DebugWrite("saveload", "<br /><br /><p>" + serialized + "</p><br />");
	
	if (flag === 'external') {
	  let savescreen = window.open('','savescreen');
    if (savescreen) {
  	  savescreen.document.write(serialized);
	    savescreen.document.close();
    } else {
      maintext.addText("<span style='sysconv'>Unable to open new window for save export.</span>");
    }
  }	else {
    fs.writeFileSync(`${savePath}/save${flag}`, serialized);
//    localStorage["save"+flag] = serialized;
    saveIndex[flag].datestamp = Date.now();
    saveIndex[flag].charname = PC.getPCName();
    saveIndex[flag].loc = PC.getHomeMap().getSaveName();
    saveIndex[flag].graphic = PC.getGraphic();
//    localStorage.saveIndex = JSON.stringify(saveidx);
    
  }
}

GameStateData.prototype.initializeSaveGames = function() {
  let saves = [];
  for (let i=0;i<=9;i++) {
    saves[i] = {datestamp: 0, charname:"",loc:"",graphic:""};
    let saveslot = "save" + i;
    fs.writeFileSync(`${savePath}/${saveslot}`, "");
//    localStorage[saveslot] = "";
  }
  saveIndex = saves;
//  localStorage.saveIndex = JSON.stringify(saves);
}

GameStateData.prototype.getLatestSaveIndex = function() {
  let lastIdx = 0;
  let lastDate = 0;
  //localStorage.saveIndex; 
  for (let i=1;i<=9;i++) {
    if (saveIndex[i].datestamp > lastDate) {
      lastIdx = i;
      lastDate = saveIndex[i].datestamp;
    }
  }
  if (!saveIndex[lastIdx].charname) { lastIdx = -1; }
  return lastIdx;
}

GameStateData.prototype.loadGame = function(idx) {
  gamestate.setMode("loadgame");
  
//  let compressed;
  let serialized;
  
  DebugWrite("saveload", "<p><span style='font-weight:bold'>Start load procedure from slot " + idx + ":</span><br />");

  if (localStorage.manualsave) {
    serialized = localStorage.manualsave;
    delete localStorage.manualsave;
  } else if (idx === "tmp") {
    DebugWrite("saveload", "<br /><br /><p>LOADING TMP VALUES</p><br />");
    gamestate.loadTmp();
    return;
  } else {
//    compressed = localStorage["save"+idx];
//    serialized = LZString.decompressFromUTF16(compressed);
    serialized = fs.readFileSync(`${savePath}/save${idx}`,'utf8');
    //serialized = localStorage["save"+idx];
  }

  DebugWrite("saveload", "<br /><br /><p>" + serialized + "</p><br />");
  let savedata = JSON.parse(serialized);  
  let universe = {};
  
  let loadmaps = {};
  DU.maps = new MapMemory();
  maps = DU.maps; // re-alias
  DU.DUTime = new Timeline(0);
  DUTime = DU.DUTime;
  DU.merchants = savedata.merchants;

  DUTime.setGameClock(savedata.time);
  DU.gameflags = new Gameflags();
  ExtendObject(true,DU.gameflags,savedata.gameflags);
  
  nowplaying = {};  
  ambient = {};  
  let attaches = [];
  
  for (let idx in savedata.events) {
    let val = savedata.events[idx];
    let tmplistener = new DUEar();
    tmplistener.name = idx;
    tmplistener.listenforname = val.listenforname;
    tmplistener.linkedtomap = val.linkedtomap;
    tmplistener.flagsreq = val.flagsreq;
    Listener.addListener(tmplistener);
  }
    
  for (let idx in savedata.maps) {
    let val = savedata.maps[idx];
    //load all the maps
    loadmaps[val] = maps.addMap(val);
    DebugWrite("saveload", "Loaded map: " + val + "<br />");
  }
  
  DebugWrite("saveload", "<br /><h3>Done loading maps, on to objs...</h3>");
  
  // go through all the objects that were saved
  for (let idx in savedata.objs) {
    let val = savedata.objs[idx];
    // idx is the serial, val is the object with only saved properties
    let savename = val.name;
    DebugWrite("saveload", "Loading object: " + savename + ", serial # " + idx + "...<br />");
    let newobj = localFactory.createTile(savename);
    for (let svidx in val) {
      let svval = val[svidx];
      DebugWrite("saveload", "&nbsp;&nbsp;Loading property " + svidx + ", saving " + svval + "...<br />");
      newobj[svidx] = svval;
    }
    universe[idx] = newobj;
  }

  DebugWrite("saveload", "<br />SECOND RUN THROUGH LOADED OBJECTS<br />");
  let topserial = 1;
  for (let idx in universe) {
    let val = universe[idx];
    
    if (val.serial > topserial) { topserial = val.serial; }
    DebugWrite("saveload", "Processing object: " + val.name + ", serial # + " + idx + "...<br />SERIALIZED NEW VERSION: " + JSON.stringify(val) +"<br />");
    if (val.serial == 1) { PC = val; }

    if (val.spawned) {
      let spawnlist = val.spawned;
      val.spawned = new Collection();
      for (let spidx in spawnlist) {
        let spawnval = spawnlist[spidx];
        val.spawned.addTop(universe[spawnval]);
      }
    } 
    if (val.walkonscript) {
      mappages[val.homeMap][val.walkonscript](val);
    }
    if (val.equippedTo) {
      val.equippedTo = universe[val.equippedTo];
    }
    if (val.linkedItem) {
      val.linkedItem = universe[val.linkedItem];
    }
    if (val.attachedTo) {
      val.attachedTo = universe[val.attachedTo];
    }
    if (val.hasOwnProperty("attachedParts")) {
      for (let i=0;i<val.attachedParts.length;i++) {
        val.attachedParts[i] = universe[val.attachedParts[i]];
      }
    }
    if (val.inventory && !val.inventory.container) {
      // if it has inventory.container, it's a Collection, which means it wasn't overwritten from the loaded game and so is empty
      DebugWrite("saveload", val.name + " has an inventory, processing...");
      let inv = val.inventory;
      val.inventory = new Collection();
      for (let ii in inv) {
        let invval = inv[ii];
        DebugWrite("saveload", "adding " + universe[invval].name + "... ");
        val.addToInventory(universe[invval], 1);
      }
      DebugWrite("saveload", "<br />");
    } 
    if (val.spawnedBy) {
      DebugWrite("saveload", val.name + " was spawned by something, processing...");
      val.spawnedBy = universe[val.spawnedBy];
    }
    if (val.equipment && !val.equipment.container) {
      DebugWrite("saveload", val.name + " has equipment, processing...");
      let inv = val.equipment;
      val.equipment = {};
      for (let ii in inv) {
        let invval = inv[ii];
        var equipment = universe[invval];

        if (equipment.checkType("Armor")) {
          DebugWrite("saveload", "adding " + equipment.name + "... ");
          val.setEquipment("armor",equipment);
        }
        if (equipment.checkType("Weapon") && !equipment.checkType("Missile")) {
          DebugWrite("saveload", "adding " + equipment.name + "... ");
          val.setEquipment("weapon",equipment);
        }
        if (equipment.checkType("Missile")) {
          DebugWrite("saveload", "adding " + equipment.name + "... ");
          val.setEquipment("missile",equipment);
        }
        if (equipment.checkType("Amulet")) {
          DebugWrite("saveload", "adding " + equipment.name + "... ");
          val.setEquipment("amulet",equipment);
        }
        if (equipment.checkType("Circlet")) {
          DebugWrite("saveload", "adding " + equipment.name + "... ");
          val.setEquipment("circlet",equipment);
        }
        if (equipment.checkType("Ring")) {
          DebugWrite("saveload", "adding " + equipment.name + "... ");
          if (hasring) {
            val.setEquipment("ring2",equipment);
          } else {
            val.setEquipment("ring1",equipment);
            hasring = 1;
          }
        }
      }
      DebugWrite("saveload", "<br />");
    } 
    if (val.spellEffects && !val.spellEffects.container) {
      DebugWrite("saveload", val.name + " has spell effects, processing...");
      let inv = val.spellEffects;
      val.spellEffects = new Collection();
      for (let ii in inv) {
        let invval = inv[ii];
        // don't use addSpellEffect, as that activates it and will double the effect
        DebugWrite("saveload", "adding " + universe[invval].name + "... ");
        val.spellEffects.addBottom(universe[invval]);
        attaches.push(val);
      }
    } else {
      val.spellEffects = new Collection();
    }
    if (val.traceback) {
      for (let ii in val.traceback) {
        let ibval = val.traceback[ii];
        // things will have 0 (if in inventory or the like), 1 (on a map), or 2 (map and timeline) entries here
        if (ibval === "homeMap") {
          DebugWrite("saveload", "&nbsp;&nbsp;Setting home map to " + val.homeMap + "...<br />");
          loadmaps[val.homeMap].placeThing(val.x, val.y, val);
        }
        if (ibval == "timeline") {
          let newEvent = new GameEvent(val);
          DUTime.addAtTime(newEvent, val.timestamp);
          delete val.timestamp;
        }
        
      }
      delete val.traceback;
    }
    if (val.name === "PC") {
      PC = val;
    }
    
  }

  if (attaches[0]) {
    DebugWrite("saveload", "<br />Adding circular refs to spelleffects:");
    for (let i=0;i<attaches.length;i++) {
      DebugWrite("saveload", "<br />Attaching to " + attaches[i].getName() + "... ");
      let thespells = attaches[i].getSpellEffects();
      if (thespells.length) {
        for (let j=0;j<thespells.length;j++) {
          DebugWrite("saveload", thespells[j].getName() + "... ");
          thespells[j].setAttachedTo(attaches[i]);
        }
      }
    }
  }

  for (let i in loadmaps) {
    let val = loadmaps[i];
    let checknpcs = val.npcs.getAll();
    for (let i=0;i<checknpcs.length;i++) {
      if ((typeof checknpcs[i].getLight === "function") && (checknpcs[i].getLight())) {
        val.moveThing(checknpcs[i].getx(),checknpcs[i].gety(),checknpcs[i]);
      }
    }
    let checkfeas = val.features.getAll();
    for (let i=0;i<checkfeas.length;i++) {
      if ((typeof checkfeas[i].getLight === "function") && (checkfeas[i].getLight())) {
        val.moveThing(checkfeas[i].getx(),checkfeas[i].gety(),checkfeas[i]);
      }
    }
  }
  PC.getHomeMap().moveThing(PC.getx(),PC.gety(),PC);
  
  maxserial = topserial;
  if (DU.gameflags.getFlag("act2")) {
    DUMusic["Dark Towne"] = "Towne";
  } else {
    DUMusic["Dark Towne"] = "Dark Towne";
  }
  if (DU.gameflags.getFlag("music")) {  
    let song = PC.getHomeMap().getMusic();
    DUPlayMusic(song);
  }
  ProcessAmbientNoise(PC.getHomeMap().getTile(PC.getx(),PC.gety()));
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

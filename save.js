
function GameStateData() {
	this.mode = "null";
	this.turn = {};
	// player, NPC, null, target, conversation, anykey
}



GameStateData.prototype.loadGame = function() {
	// Temporarily, this will return demo values
//  PC.setx(47);
//  PC.sety(49);
  PC.setx(8);
  PC.sety(8);

	PC.setPCName("Goldenflame");
	var themap;
	if (maps.getMap("darkunknown")) {
	  themap = maps.getMap("darkunknown");
	} else {
	  themap = new GameMap();
    themap.loadMap("darkunknown");

	}
  var anothermap = new GameMap();
  anothermap.loadMap("skypalace");
	PC.setHomeMap(anothermap);
	maps.addMapByRef(anothermap);
//  PC.setHomeMap(themap);
//  var rats = localFactory.createTile("OrcGroupLarge");
//  themap.placeThing(65,70,rats);
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
	var PCEvent = new GameEvent(PC);
	DUTime.addAtTimeInterval(PCEvent,.0001);
//  var nextEvent = DUTime.executeNextEvent();
//  var nextEntity = nextEvent.getEntity();
//  nextEntity.myTurn();
  startScheduler();
}

// eventually use var compressed = LZString.compressToUTF16(string); and string = LZString.decompressFromUTF16(localStorage.getItem("myData"));
// also, respect .nosave property
GameStateData.prototype.saveGame = function() {
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
	  if (debug) { dbs.writeln("<br /><span style='font-weight:bold'>Copying " + mapfeatures.length + " features from map " + idx + "</span><br />"); }
	  $.each(mapfeatures, function(feaidx, feaval) {
	    if (!feaval.nosave) {
  	    var copies = feaval.copy();
	      $.each(copies, function(copidx, copval) {
	        savedata.objs[copval.serial] = copval;
	      });
	    }
	  });
	  
	  // save NPCs
	  var mapnpcs = val.npcs.getAll();
	  if (debug) { dbs.writeln("<br /><span style='font-weight:bold'>Copying " + mapnpcs.length + " NPCs from map " + idx + "</span><br />"); }
	  $.each(mapnpcs, function (npcidx, npcval) {
	    if (!npcval.nosave) {
	      var copies = npcval.copy();
  	    // note- this is going to explode gloriously if I have a closed loop anywhere other than to and from maps
	      // so far so good though!
	      $.each(copies, function(copidx, copval) {
	        savedata.objs[copval.serial] = copval;
	      });
	    }
	    
	  });
	});
	
	// save the PC!
	
	
	
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

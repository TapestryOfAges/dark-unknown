
function Atlas() {

  this.key = {
    "WE" : "BlankWhite",   // 0
    "BlankWhite" : "WE",
    "WW" : "Ocean",   // 1
    "Ocean" : "WW",  
    "ww" : "Water",   // 2
    "Water" : "ww",  
    "uu" : "Shallows", // 3
    "Shallows" : "uu",
    '^^' : "Mountain", // 4
    "Mountain" : '^^', 
    '$=' : "LeftCastle", // 5
    "LeftCastle" : '$=',
    '=$' : "RightCastle", // 6
    "RightCastle" : '=$', 
  // 7-10 are features
    '%%' : "StoneWall", // 11
    "StoneWall" : '%%',
  // 12 is a feature
    '#%' : "Stone",     // 13
    "Stone": '#%',
    ',%' : "DirtStone",     // 13
    "DirtStone": ',%',
    '#*' : "Mast",  // 14
    "Mast" : '#*',
    '#!' : "Rigging", // 15
    "Rigging" : '#!',
    '+o' : "Pillar", // 16
    "Pillar" : '+o',
    'u`' : "FountainSW", // 17
    "FountainSW" : 'u`',
    '/u' : "FountainSE", // 18
    "FountainSE" : '/u',
    'u/' : "FountainNW", // 19
    "FountainNW" : 'u/',
    '`u' : "FountainNE", // 20
    "FountainNE" : '`u',
// 21-24 are features
    '_A' : "LetterA",  //25
    "LetterA" : '_A',
    '_B' : "LetterB",  //26
    "LetterB" : '_B',
    '_C' : "LetterC",  //27
    "LetterC" : '_C', 
    '_D' : "LetterD",  //28
    "LetterD" : '_D',
    '_E' : "LetterE",  //29
    "LetterE" : '_E',
    '_F' : "LetterF",  //30
    "LetterF" : '_F',
    '_G' : "LetterG",  //31
    "LetterG" : '_G',
    '_H' : "LetterH",  //32
    "LetterH" : '_H',
    '_I' : "LetterI",  //33
    "LetterI" : '_I',
    '_J' : "LetterJ",  //34
    "LetterJ" : '_J',
    '_K' : "LetterK",  //35
    "LetterK" : '_K',
    '_L' : "LetterL",  //36
    "LetterL" : '_L',
    '_M' : "LetterM",  //37
    "LetterM" : '_M',
    '_N' : "LetterN",  //38
    "LetterN" : '_N',
    '_O' : "LetterO",  //39
    "LetterO" : '_O',
    '_P' : "LetterP",  //40
    "LetterP" : '_P',
    '_Q' : "LetterQ",  //41
    "LetterQ" : '_Q',
    '_R' : "LetterR",  //42
    "LetterR" : '_R',
    '_S' : "LetterS",  //43
    "LetterS" : '_S',
    '_T' : "LetterT",  //44
    "LetterT" : '_T',
    '_U' : "LetterU",  //45
    "LetterU" : '_U',
    '_V' : "LetterV",  //46
    "LetterV" : '_V',
    '_W' : "LetterW",  //47
    "LetterW" : '_W',
    '_X' : "LetterX",  //48
    "LetterX" : '_X',
    '_Y' : "LetterY",  //49
    "LetterY" : '_Y',
    '_Z' : "LetterZ",  //50
    "LetterZ" : '_Z',
    '::' : "HorizontalCounter", // 51
    "HorizontalCounter" : '::',
    ':]' : "RightCounter",  // 52
    "RightCounter" : ':]', 
    '[:' : "LeftCounter", // 53
    "LeftCounter" : '[:',
    '[]' : "CounterBox",  // 54
    "CounterBox" : '[]',
    'BK' : "BlankBlack", // 55
    "BlankBlack" : 'BK',
    '##' : "Wall", // 56
    "Wall" : '##',
    '#+' : "ArrowSlit",
    "ArrowSlit" : '#+',
    '#O' : "Window",
    "Window" : '#O',
    '+`' : "WallNE", // 57
    "WallNE" : '+`',
    '/+' : "WallNW", // 58
    "WallNW" : '/+',
    '`+' : "WallSW", // 59
    "WallSW" : '`+',
    '+/' : "WallSE", // 60
    "WallSE" : '+/', 
    '()' : "VerticalCounter", // 61
    "VerticalCounter" : '()',
    '(_' : "BottomCounter", // 62
    "BottomCounter" : '(_',
    '(^' : "TopCounter", // 63
    "TopCounter" : '(^',
// 64 - 67 is features (doors)
    '+D' : "Doorway", // 68
    "Doorway" : '+D',
    '!!' : "PlanksNS", // 69
    "PlanksNS" : '!!',
// 70 - 72 are features (bridges)
    '__' : "SouthCoast", // 73
    "SouthCoast" : '__',
    '--' : "NorthCoast", // 74
    "NorthCoast" : '--',
    '.|' : "EastCoast", // 75
    "EastCoast" : '.|',
    '|.' : "WestCoast", // 76
    "WestCoast" : '|.',
    '.`' : "NortheastCoast", // 77
    "NortheastCoast" : '.`',
    '`.' : "SouthwestCoast", // 78
    "SouthwestCoast" : '`.', 
    '/.' : "NorthwestCoast", // 79
    "NorthwestCoast" : '/.',
    './' : "SoutheastCoast", // 80
    "SoutheastCoast" : './',
// 101-102 are features (bridge)
    '++' : "Cobblestone", // 103
    "Cobblestone" : '++',
    '-=' : "PlanksEW", // 104
    "PlanksEW" : '-=',
// 105 is a feature or an NPC, depending
    '..' : "Grass", // 121
    "Grass" : '..',
    '.,' : "Dirt", // 121
    "Dirt" : '.,',
    ',,' : "Brush", // 122
    "Brush" : ',,',
    ',|' : "BrushECoast",
    "BrushECoast" : ',|',
    '|,' : "BrushWCoast",
    "BrushWCoast" : '|,',
    '_,' : "BrushSCoast",
    "BrushSCoast" : '_,',
    '-,' : "BrushNCoast",
    "BrushNCoast" : '-,',
    ';;' : "Forest", // 123
    "Forest" : ';;',
    ',;' : "Grove", // 123
    "Grove" : ',;',
    '|;' : "ForestWCoast",
    "ForestWCoast" : '|;',
    ';|' : "ForestECoast",
    "ForestECoast" : ';|',
    '_;' : "ForestSCoast",
    "ForestSCoast" : '_;',
    '-;' : "ForestNCoast",
    "ForestNCoast" : '-;',
    'nn' : "Hills", // 124
    "Hills" : 'nn',
    '+*' : "PurpleCobblestone", // 125
    "PurpleCobblestone" : '+*',
// 126 is a feature (bridge)
    'ff' : "Swamp", // 141
    "Swamp" : 'ff',
// 142 - 146 are features
    '~~' : "Lava", // 147
    "Lava" : '~~',
    '@D' : "Dungeon", // 151
    "Dungeon" : '@D',
    '@T' : "Towne", // 152
    "Towne" : '@T',
    '@K' : "Keep", // 153
    "Keep" : '@K',
    '@V' : "Village", // 154
    "Village" : '@V',
    '@C' : "Castle", // 155
    "Castle" : '@C',
    '@S' : "Shrine", // 156
    "Shrine" : '@S', 
    '@R' : "Ruins", // 157
    "Ruins" : '@R',
    'nT' : "HillTower",
    "HillTower" : 'nT',
    '.T' : "GrassTower",
    "GrassTower" : '.T',
    "RiverNS" : '||',
    '||' : "RiverNS",
    "RiverEW" : '==',
    '==' : "RiverEW",
    "RiverNE" : '`=',
    '`=' : "RiverNE",
    "RiverSE" : '/=',
    '/=' : "RiverSE",
    "RiverNW" : '=/',
    '=/' : "RiverNW",
    "RiverSW" : '=`',
    '=`' : "RiverSW",
    "RiverTtop" : '-L',
    '-L' : "RiverTtop",
    "RiverTbottom" : 'TT',
    'TT' : "RiverTbottom",
    "RiverTleft" : '=|',
    '=|' : "RiverTleft",
    "RiverTright" : '|=',
    '|=' : "RiverTright",
    "RiverSourceN" : 'xv',
    'xv' : "RiverSourceN",
    "RiverSourceS" : 'x^',
    'x^' : "RiverSourceS",
    "RiverSourceE" : 'x=',
    'x=' : "RiverSourceE",
    "RiverSourceW" : '=x',
    '=x' : "RiverSourceW",
    "RoadEN" : 'r/',
    'r/' : "RoadEN",
    "RoadENS" : 'r<',
    'r<' : "RoadENS",
    "RoadES" : 'rr',
    'rr' : "RoadES",
    "RoadEW" : 'r=',
    'r=' : "RoadEW",
    "RoadEWN" : 'rV',
    'rV' : "RoadEWN",
    "RoadEWS" : 'rT',
    'rT' : "RoadEWS",
    "RoadNS" : 'r|',
    'r|' : "RoadNS",
    "RoadWN" : 'r]',
    'r]' : "RoadWN",
    "RoadWNS" : 'r>',
    'r>' : "RoadWNS",
    "RoadWS" : 'r[',
    'r[' : "RoadWS",
    "RoadX" : 'rX',
    'rX' : "RoadX",
    "Shingles" : 'rf',
    'rf' : "Shingles",
    "ShinglesTop" : 'rc',
    'rc' : "ShinglesTop",
    "SeeBelow" : 'sb',
    'sb' : "SeeBelow",
    "CaveFloor" : 'cf',
    'cf' : "CaveFloor",
    "CaveWall" : 'cw',
    'cw' : "CaveWall",
    "HexFloor" : 'hf',
    'hf' : "HexFloor"
  }

}

Atlas.prototype.keylookup = function(entry) {
  if (this.key[entry]) {  return this.key[entry];  }
  else {alert("Key lookup unsuccessful for " + entry); return 0; }

}

// Page object- condensed map

function Acre() {

  this.terrain = "";
  this.features = new Collection;
  this.npcs = new Collection;
  this.pcs = new Collection;
  
  this.serial = GetSerial();
  this.localLight = new Array;
}

Acre.prototype.addLocalLight = function(source, lightlevel) {
	this.localLight[source] = lightlevel;
}

Acre.prototype.getLocalLight = function() {
	var lightlevel = 0;
	for (var i in this.localLight) {
		lightlevel += this.localLight[i];
	}
	return lightlevel;
}

Acre.prototype.removeLocalLight = function(source) {
	delete this.localLight[source];
}

Acre.prototype.getBlocksLOS = function(dist) {
	var maxLOS = 0;
	maxLOS = this.terrain.getBlocksLOS(dist);
	var allFeatures = this.features.getAll();
	if (allFeatures[0]) {
		for (var i = 0; i < allFeatures.length; i++ ) {
			var featureLOS = allFeatures[0].getBlocksLOS(dist);
			if (featureLOS > maxLOS) {
				maxLOS = featureLOS;
			}
		}
	}
	return maxLOS;
}

Acre.prototype.getFeatures = function() {
	return (this.features.getAll());
}

Acre.prototype.getTopFeature = function() {
	return (this.features.getTop());
}

Acre.prototype.getTopVisibleFeature = function() {
	var features = this.features.getAll();
	var ind = features.length;
	if (ind == 0) { return; }
	while (ind > 0) {
		if (features[ind-1].invisible) {
			ind--;
		}
		else {
			return features[ind-1];
		}
	}
	return;
}

Acre.prototype.getNPCs = function() {
	return (this.npcs.getAll());
}

Acre.prototype.getTopNPC = function() {
	return (this.npcs.getTop());
}

Acre.prototype.getTopVisibleNPC = function() {
	var npcs = this.npcs.getAll();
	var ind = npcs.length;
	if (ind == 0) { return; }
	while (ind > 0) {
		if (npcs[ind-1].invisible) {
			ind--;
		}
		else {
			return npcs[ind-1];
		}
	}
	return;
}

Acre.prototype.getPCs = function() {
	return (this.pcs.getAll());
}

Acre.prototype.getTopPC = function() {
	return (this.pcs.getTop());
}

Acre.prototype.getTerrain = function() {
	return this.terrain;
}

Acre.prototype.getBumpIntoResult = function(mover) {
	var terrain = this.getTerrain();
	var retval = terrain.bumpinto(mover);

	if (retval["msg"] != "") { retval["msg"] = " - " + retval["msg"]; }	
	if (retval["canmove"] == 0) { return retval; }
	
	var features = this.getFeatures();
	if (features[0]) {
		for (var i=0; i<features.length; i++) {
			var retval2 = features[i].bumpinto(mover);
			if (retval2["msg"] != "") {
				if (retval["msg"] == "") { retval["msg"] = " - " + retval2["msg"]; }
				else { retval["msg"] += "\n" + retval2["msg"]; }
			}
			if (retval2["canmove"] == 0) { return retval; }
		}
	}
	
	return retval;
}

Acre.prototype.getInitDelay = function(mob) {
	if (mob.getMovetype() & MOVE_FLY) {
		return 1;
	}
	var terrain = this.getTerrain();
	var features = this.getFeatures();
	var initdelay = terrain.getInitDelay();
	if (features[0]) {
		for (var i = 0; i < features.length; i++) {
			initdelay = initdelay * features[i].getInitDelay();
		}
	}
	if (initdelay) { return initdelay; }
	return 1;
}

Acre.prototype.canMoveHere = function(mover, fromtile) {
	var terrain = this.getTerrain();
	var totalpassability = terrain.getPassable();
	var retval = new Object;
	if (totalpassability & MOVE_SWIM & mover.getMovetype()) {
		if (fromtile.getTerrain().getPassable() & MOVE_SWIM) {
			// moving from a water tile to a water tile. This bypasses the blocking ability of bridges, etc.
			retval["canmove"] = 1;
			retval["msg"] = "";
			return retval;
		}
	}
	var featurepassability = MOVE_FLY + MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	var features = this.getFeatures();
	if (features[0]) {
	  for (var i=0; i< features.length; i++) {
		  featurepassability = featurepassability & features[i].getPassable();
		}  
		var npcs = this.getNPCs();
	  if (npcs[0]) {
	  	featurepassability = 0;
	  }
		if (totalpassability & MOVE_SWIM) {
	  	if (featurepassability & mover.getMovetype()) {
	  		retval["canmove"] = 1;
  			retval["msg"] = "";
			  return retval;
		  }
	  }
	}
	var npcs = this.getNPCs();
	if (npcs[0]) {
		featurepassability = 0;
	}
	if (totalpassability & featurepassability & mover.getMovetype()) {
		retval["canmove"] = 1;
		retval["msg"] = "";
		return retval;
	}
	
	retval["canmove"] = 0;
	retval["msg"] = "Blocked!";
	return retval;
}

Acre.prototype.executeWalkons = function(walker) {
	var terrain = this.getTerrain();
	if (typeof terrain.walkon == "function") {
		terrain.walkon(walker);
	}
	var features = this.getFeatures();
	if (features) {
		for (var i = 0; i < features.length; i++) {
			if (typeof features[i].walkon == "function") {
				features[i].walkon(walker);
			}
		}
	}
}

// Map Object - one per map.

function GameMap() {

  this.data = new Array;
// Each entry in the array will be an Object with .terrain, .features, and .npcs

  this.enterx = 65;
  this.entery = 70;
  this.name = "";  

  this.features = new Collection;  // list of all features on the map
  this.npcs = new Collection; // list of all NPCs on the map
  this.pcs = new Collection; // list of all PCs on the map - usually one, but support exists for parties
// these three will be maintained concurrently with collections on individual tiles/acres

  this.desc = "";
  this.music = "";
  this.exitTo = new Object;
  this.exitTo.mapname = "darkunknown";
  this.exitTo.x = 65;
  this.exitTo.y = 70;
  this.wraps = 0;
  
  this.linkedMaps = new Array;
  this.seeBelow = "";
  
  this.lightLevel = "bright";
  this.alwaysRemember = 0;
}
GameMap.prototype = new Object;

GameMap.prototype.setName = function(name) {
  this.name = name;
  return this.name;
}

GameMap.prototype.getName = function() {
  return this.name;
}

GameMap.prototype.setDesc = function(desc) {
  this.desc = desc;
  return this.desc;
}

GameMap.prototype.getDesc = function() {
  return this.desc;
}

GameMap.prototype.setMusic = function(music) {
  this.music = music;
  return this.music;
}

GameMap.prototype.getMusic = function() {
  return this.music;
}

GameMap.prototype.setEnterX = function(x) {
  this.enterx = x;
  return this.enterx;
}

GameMap.prototype.getEnterX = function() {
  return this.enterx;
}

GameMap.prototype.setEnterY = function(y) {
  this.entery = y;
  return this.entery;
}

GameMap.prototype.getEnterY = function() {
  return this.entery;
}

GameMap.prototype.setExitToMap = function(name) {
  this.exitTo.mapname = name;
  return this.exitTo.mapname;
}

GameMap.prototype.getExitToMap = function() {
  return this.exitTo.mapname;
}

GameMap.prototype.setExitToX = function(x) {
  this.exitTo.x = x;
  return this.exitTo.x;
}

GameMap.prototype.getExitToX = function() {
  return this.exitTo.x;
}

GameMap.prototype.setExitToY = function(y) {
  this.exitTo.y = y;
  return this.exitTo.y;
}

GameMap.prototype.getExitToY = function() {
  return this.exitTo.y;
}

GameMap.prototype.setWrap = function(wrap) {
  this.wrap = wrap;
  return this.wrap;
}

GameMap.prototype.getWrap = function() {
  return this.wrap;
}

// This should not be used externally
GameMap.prototype.setTile = function(x,y,tile) {
  this.data[y][x] = tile;
  return this.data[y][x];
}

GameMap.prototype.getTile = function(x,y) {  // returns an Acre
	if ((y < 0) || (x < 0)) { return "OoB"; }
	if (y >= this.data.length) { return "OoB"; }
	if (x >= this.data[y].length) { return "OoB"; }
  return this.data[y][x];
}

GameMap.prototype.getLinkedMaps = function() {
	return this.linkedMaps;
}

GameMap.prototype.setLinkedMaps = function(maplist) {
	maplist = maplist.replace(" ","");
	this.linkedMaps = maplist.split(",");
}

GameMap.prototype.setLinkedMapsArray = function(maplist) {
	this.linkedMaps = maplist;
}

GameMap.prototype.getAlwaysRemember = function() {
	return this.alwaysRemember;
}

GameMap.prototype.setAlwaysRemember = function(ar) {
	this.alwaysRemember = ar;
}

GameMap.prototype.getSeeBelow = function() {
	return this.seeBelow;
}

GameMap.prototype.setSeeBelow = function(mapname) {
	this.seeBelow = mapname;
}

GameMap.prototype.setLightLevel = function(lightlevel) {
	this.lightLevel = lightlevel;
}

GameMap.prototype.getLightLevel = function() {
	return this.lightLevel;
}

// generate the tile from the factory first, then pass it to setTerrain
GameMap.prototype.setTerrain = function(x,y,terrain) {
  // hopefully usually called by click on the map
//  var tile = localFactory.createTile(terrain.name);
  var tile = eidos.getForm(terrain.getName());
  if (tile) {
    this.data[y][x] = new Acre;
    this.data[y][x].terrain = tile;
    return this.data[y][x].terrain;
  }
  return 0;
  
}

GameMap.prototype.getWidth = function() {
	return this.data[0].length;
}

GameMap.prototype.getHeight = function() {
	return this.data.length;
}

GameMap.prototype.resizeMap = function(newx,newy,anchor){
  var oldx = this.getWidth();
  var oldy = this.getHeight();
  if (debug ) {
    debugscreen.document.writeln(oldx + " " + oldy + " to " + newx + " " + newy + ", anchor is " + anchor + "<br><br>");
  }
  var tile = new Acre;
  tile.terrain = localFactory.createTile(selectionval.name);

  if ((newx) && (newx != oldx)) {
    for (i = 1; i <= Math.abs(newx-oldx); i++) {
      for (j=0;j<this.data.length;j++) {
        if ((anchor == 0) || (anchor == 3) || (anchor == 6)) {
          if (newx > oldx) {  
            this.data[j].push(tile);  
          }
          else if (oldx > newx ) { 
            this.data[j].pop();
          }
        }
        else if ((anchor == 2) || (anchor == 5) || (anchor == 8)) {
          if (newx > oldx) { 
            this.data[j].unshift(tile); 
          }
          else if (oldx > newx) { 
            this.data[j].shift(); 
          }
        }
        else if ((anchor == 1) || (anchor == 4) || (anchor == 7)) {
          if ((newx > oldx) && (i%2 == 1)) { 
            this.data[j].push(tile); 
          }
          else if ((newx > oldx) && (i%2 == 0)) { 
            this.data[j].unshift(tile); 
          }
          else if ((oldx > newx) && (i%2 == 1)) { 
            this.data[j].pop(); 
          }
          else if ((oldx > newx) && (i%2 == 0)) { 
            this.data[j].shift(); 
          }
        }
      }
    }
  }
  if ((newy) && (newy != oldy)) { 
    for (i = 1; i <= Math.abs(newy-oldy); i++) {
      if (newy > oldy) {
        var placeholder = new Array();
        for (j=0; j<this.data[0].length;j++) { placeholder.push(tile); }
        if ((anchor == 0) || (anchor == 1) || (anchor == 2)) {
          this.data.push(placeholder);
        }
        else if ((anchor == 6) || (anchor == 7) || (anchor == 8)) {
          this.data.unshift(placeholder);
        }
        else if ((anchor == 3) || (anchor == 4) || (anchor == 5)) {
          if (i%2 == 0) { 
            this.data.push(placeholder); 
          }
          else if (i%2 == 1) { 
            this.data.unshift(placeholder); 
          }
        }
      }
      else if (oldy > newy) {
        if ((anchor == 0) || (anchor == 1) || (anchor == 2)) {
          this.data.pop();
        }
        else if ((anchor == 6) || (anchor == 7) || (anchor == 8)) {
          this.data.shift(); 
        }
        else if ((anchor == 3) || (anchor == 4) || (anchor == 5)) {
          if (i%2 == 0) { 
            this.data.pop(); 
          }
          else if (i%2 == 1) { 
            this.data.shift(); 
          }
        }
      }
    }
  }
  if (debug) {
    debugscreen.document.writeln("Done: " + this.data.length + " " + this.data[0].length + "<br><br>");
  }
  this.setFeaturesCoord();
  this.setNPCsCoord();
  drawMap();
}

GameMap.prototype.setFeaturesCoord = function() {
  for (var i = 0; i<=this.data.length-1; i++) {
  	for (var j = 0; j<=this.data[0].length-1; j++){
  		var featuresarray = this.data[i][j].features.getAll();
  		for (var ind = 0; ind<=featuresarray.length-1; ind++) {
  			featuresarray[ind].x = j;
  			featuresarray[ind].y = i;
  		}
  	}
  }
}

GameMap.prototype.setNPCsCoord = function() {
  for (var i = 0; i<=this.data.length-1; i++) {
  	for (var j = 0; j<=this.data[0].length-1; j++){
  		var npcsarray = this.data[i][j].npcs.getAll();
  		for (var ind = 0; ind<=npcsarray.length-1; ind++) {
  			npcsarray[ind].x = j;
  			npcsarray[ind].y = i;
  		}
  	}
  }
}


GameMap.prototype.placeThing = function(x,y,newthing) {
  if (newthing) {
  	var type = newthing.type + "s";
    if (!this.data[type]) { this.data[type] = new Collection; }
  	newthing.setx(x);
  	newthing.sety(y);
    this[type].addTop(newthing);

    if (!this.data[y][x][type]) {
      this.data[y][x][type] = new Collection;
    }
    this.data[y][x][type].addTop(newthing);
  }
  if (newthing.type == "npc") {
  	var timing = newthing.nextActionTime(0);
//  	alert(newthing.name + ", " + timing);
  	var NPCEvent = new GameEvent(newthing);
  	DUTime.addAtTimeInterval(NPCEvent,timing);
  }  
}

GameMap.prototype.moveThing = function(x,y,thing) { // this is called after bump and passable and before walkon
	var type = thing.type + "s";
	this.data[thing.gety()][thing.getx()][type].deleteFrom(thing);
	if (!this.data[y][x][type]) { this.data[y][x][type] = new Collection(); }
  this.data[y][x][type].addTop(thing);
  thing.setx(x);
  thing.sety(y);
}

GameMap.prototype.deleteThing = function(thing) {
	var type = thing.type + "s";
	this[type].deleteFrom(thing);
	this.data[thing.y][thing.x][type].deleteFrom(thing);
}


GameMap.prototype.saveMap = function (name) {
 if (name == '') {
   name = prompt("Map Name", this.name);
 }
 if (name == null) {return;}
 var printerwin = window.open('','printarray');
 printerwin.document.writeln('mappages["' + name + '"] = new Object();');
 var oldname=name;
 name = 'mappages["' + name + '"].terrain';
 printerwin.document.writeln(name + " = new Array;");
 var maxindex = this.data.length-1;
 for (var i=0;i<=maxindex;i++) {
 	 var saveind = i;
// 	 while (saveind.toString().length < maxindex.toString().length) {
// 	 	 saveind = "0" + saveind;
// 	 }
   var n = maxindex.toString().length - saveind.toString().length;
   if (n > 0) {
   	for (var m = 1; m<=n; m++) {
   		printerwin.document.write(" ");
   	}
   }
   printerwin.document.write(name + "[" + saveind + "] = '");
   for (var j=0;j<=this.data[0].length-1;j++) {
     var savethis = this.data[i][j].terrain.serialize();
     if (j != 0) {
       printerwin.document.write(" ");
     }
     printerwin.document.write(""+savethis);
   }
   printerwin.document.write("';\n");
 }
 // ADD FEATURES/NPCs
 name = 'mappages["' + oldname + '"].features';
 printerwin.document.write("\n" + name + " = new Array;\n");
 var mapfeatures = this.features.getAll();
 for (var i=0;i<=mapfeatures.length-1;i++) {
   printerwin.document.write(name + "[" + i + "] = {name : '" + mapfeatures[i].getName() + "',");
   printerwin.document.write(" x : " + mapfeatures[i].getx() + ", y : " + mapfeatures[i].gety());
   // overrides
   var baseobj = localFactory.createTile(mapfeatures[i].getName());
 //  for (var props in baseobj) {
 //  	 if (baseobj[props] != this.features.container[i][props]) {
 //  	 	 printerwin.document.write(", " + props + " : " + this.features.container[i][props]);
 //  	 }
 //  }
   if (baseobj.getDesc() != mapfeatures[i].getDesc()) {
   	 var thedesc = mapfeatures[i].getDesc();
     printerwin.document.write(", desc : \"" + thedesc + "\"");
   }
   if ((baseobj.getLocked != null) && (baseobj.getLocked() != mapfeatures[i].getLocked())) {
   	 printerwin.document.write(", locked : " + mapfeatures[i].getLocked());
   }
   if (baseobj.getEnterMap != null) {
   	 var mapdest = mapfeatures[i].getEnterMap();
   	 printerwin.document.write(", entermap : '" + mapdest.entermap + "', enterx : " + mapdest.enterx + ", entery : " + mapdest.entery);
   }
   if (baseobj.getWalkOnScript() != mapfeatures[i].getWalkOnScript()) {
   	printerwin.document.write(", walkonscript : '" + mapfeatures[i].getWalkOnScript() + "'");
   }
   printerwin.document.write("};\n");
 }
 
 name = 'mappages["' + oldname + '"].npcs';
 printerwin.document.write("\n");
 printerwin.document.write("\n" + name + " = new Array;\n");
 var mapnpcs = this.npcs.getAll();
 for (var i=0;i<=mapnpcs.length-1;i++) {
 	printerwin.document.write(name + "[" + i + "] = {name : '" + mapnpcs[i].getName() + "'");
 	printerwin.document.write(", x : " + mapnpcs[i].getx() + ", y : " + mapnpcs[i].gety());
 	var basenpc = localFactory.createTile(mapnpcs[i].getName());
 	if (basenpc.getNPCName() != mapnpcs[i].getNPCName()) {
 		printerwin.document.write(", NPCName: '" + mapnpcs[i].getNPCName() + "'");
 	}
 	if (basenpc.getDesc() != mapnpcs[i].getDesc()) {
 		printerwin.document.write(", Desc: '" + mapnpcs[i].getDesc() + "'");
 	}
 	if (basenpc.getLevel() != mapnpcs[i].getLevel()) {
 		printerwin.document.write(", Level: " + mapnpcs[i].getLevel());
 	}
 	if (basenpc.getAlignment() != mapnpcs[i].getAlignment()) {
 		printerwin.document.write(", Alignment: '" + mapnpcs[i].getAlignment() + "'");
 	}
 	if (basenpc.getstr() != mapnpcs[i].getstr()) {
 		printerwin.document.write(", str: " + mapnpcs[i].getstr());
 	}
 	if (basenpc.getdex() != mapnpcs[i].getdex()) {
 		printerwin.document.write(", dex: " + mapnpcs[i].getdex());
 	}
 	if (basenpc.getint() != mapnpcs[i].getint()) {
 		printerwin.document.write(", int: " + mapnpcs[i].getint());
 	}
 	if (basenpc.getAttitude() != mapnpcs[i].getAttitude()) {
 		printerwin.document.write(", Attitude: '" + mapnpcs[i].getAttitude() + "'");
 	}
 	if (basenpc.getPeaceAI() != mapnpcs[i].getPeaceAI()) {
 		printerwin.document.write(", PeaceAI: '" + mapnpcs[i].getPeaceAI() + "'");
 	}
 	if (basenpc.getPCThreatAI() != mapnpcs[i].getPCThreatAI()) {
 		printerwin.document.write(", PCThreatAI: '" + mapnpcs[i].getPCThreatAI() + "'");
 	}
 	if (basenpc.getThreatenedAI() != mapnpcs[i].getThreatenedAI()) {
 		printerwin.document.write(", ThreatenedAI: '" + mapnpcs[i].getThreatenedAI() + "'");
 	}
 	if (basenpc.getMelee() != mapnpcs[i].getMelee()) {
 		printerwin.document.write(", Melee: '" + mapnpcs[i].getMelee() + "'");
 	}
 	if (basenpc.getMissile() != mapnpcs[i].getMissile()) {
 		printerwin.document.write(", Missile: '" + mapnpcs[i].getMissile() + "'");
 	}
 	printerwin.document.write("};\n");
}
 
 name = 'mappages["' + oldname + '"]';
 printerwin.document.write("\n" + name + ".desc = '" + this.getDesc() + "';\n");
 printerwin.document.write(name + ".music = '" + this.getMusic() + "';\n");
 printerwin.document.write(name + ".exitmap = '" + this.getExitToMap() + "';\n");
 printerwin.document.write(name + ".exitx = '" + this.getExitToX() + "';\n");
 printerwin.document.write(name + ".exity = '" + this.getExitToY() + "';\n");
 printerwin.document.write(name + ".wraps = '" + this.getWrap() + "';\n");
 printerwin.document.write(name + ".enterx = '" + this.getEnterX() + "';\n");
 printerwin.document.write(name + ".entery = '" + this.getEnterY() + "';\n");
 printerwin.document.write(name + ".seeBelow = '" + this.getSeeBelow() + "';\n");
 printerwin.document.write(name + ".lightLevel = '" + this.getLightLevel() + "';\n");
 printerwin.document.write(name + ".alwaysRemember = '" + this.getAlwaysRemember() + "';\n");
 var linkedMapList;
 var linkedMapArray = this.getLinkedMaps();
 if (linkedMapArray.length > 0) {
 	 for (var i=0;i<linkedMapArray.length;i++) {
 	 	if (i == 0) {
 	 		linkedMapList = '"' + linkedMapArray[i] + '"';
 	 	} else {
 	 		linkedMapList = linkedMapList + ',"' + linkedMapArray[i] + '"';
 	 	}
 	}
 	printerwin.document.write(name + ".linkedMaps = new Array(" + linkedMapList + ");\n");
 }
 else {
   printerwin.document.write(name + ".linkedMaps = new Array;\n");
 }
 printerwin.document.close();
}

GameMap.prototype.loadMap = function (name) {
  this.data = new Array;
  this.features.deleteAll();
  this.npcs.deleteAll();
  var loadfrom = mappages.readPage(name, "terrain");
  var localatlas = new Atlas;
  for (var i=0;i<=loadfrom.length-1;i++) {
    if (debug) {debugscreen.document.writeln("<br>Starting line: " +i+ ", length " + loadfrom[i].length + " <br>");}
    var tileserials = new Array;
    tileserials = loadfrom[i].split(" ");
    this.data[i] = new Array();
    for (var j=0;j<=tileserials.length-1;j++) {
      if (debug) {debugscreen.document.writeln(" " + tileserials[j]);}
      var loadedtile = localatlas.key[tileserials[j]];
//      this.data[i][j] = new Acre;
//      this.data[i][j].terrain = localFactory.createTile(loadedtile);
//      this.data[i][j].terrain.setHomeMap(this);
      var newterrain = localFactory.createTile(loadedtile);
      this.setTerrain(j,i,newterrain);
    }
  }
  var loadfeatures = mappages.readPage(name, "features");
//  this.features = new Collection;
  if (loadfeatures) {
//  	alert(loadfeatures.length + " features loading...");
    for (var i=0;i<=loadfeatures.length-1;i++) {
    	var newfeature = localFactory.createTile(loadfeatures[i].name);
    	newfeature.setHomeMap(this);
    	for (var featurekey in loadfeatures[i]) {
    		if (featurekey == "name") { continue; }
    		if (featurekey == "locked") { newfeature.lockMe(loadfeatures[i]["locked"]); continue; }
    		newfeature[featurekey] = loadfeatures[i][featurekey];
    	}
    	if (newfeature.getWalkOnScript()) {
    		var walkonscript = newfeature.getWalkOnScript();
    		mappages[name][walkonscript](newfeature);
    	}
  	  this.placeThing(loadfeatures[i].x,loadfeatures[i].y,newfeature);
    }
  }

  var loadnpcs = mappages.readPage(name, "npcs");
  if (loadnpcs)  {
  	for (var i=0;i<=loadnpcs.length-1;i++) {
  		var newnpc = localFactory.createTile(loadnpcs[i].name);
  		newnpc.setHomeMap(this);
  		for (var npckey in loadnpcs[i]) {
  			if (npckey == "NPCName") { newnpc.setNPCName(loadnpcs[i].NPCName); }
  			if (npckey == "Desc") { newnpc.setDesc(loadnpcs[i].Desc); }
  			if (npckey == "Level") { newnpc.setLevel(loadnpcs[i].Level); }
  			if (npckey == "Alignment") { newnpc.setAlignment(loadnpcs[i].Alignment); }
  			if (npckey == "str") { newnpc.setstr(loadnpcs[i].str); }
  			if (npckey == "dex") { newnpc.setdex(loadnpcs[i].dex); }
  			if (npckey == "int") { newnpc.setint(loadnpcs[i].int); }
  			if (npckey == "Attitude") { newnpc.setAttitude(loadnpcs[i].Attitude); }
  			if (npckey == "PeaceAI") { newnpc.setPeaceAI(loadnpcs[i].PeaceAI); }
  			if (npckey == "PCThreatAI") { newnpc.setPCThreatAI(loadnpcs[i].PCThreatAI); }
  			if (npckey == "ThreatenedAI") { newnpc.setThreatenedAI(loadnpcs[i].ThreatenedAI); }
  			if (npckey == "Melee") { newnpc.setMelee(loadnpcs[i].Melee); }
  			if (npckey == "Missile") { newnpc.setMissile(loadnpcs[i].Missile); }
  		}
  		this.placeThing(loadnpcs[i].x,loadnpcs[i].y,newnpc);
  	}
  }
  // load map details
  this.setDesc(mappages.readPage(name, "desc"));
  this.setMusic(mappages.readPage(name, "music"));
  this.setExitToMap(mappages.readPage(name, "exitmap"));
  this.setExitToX(mappages.readPage(name, "exitx"));
  this.setExitToY(mappages.readPage(name, "exity"));
  this.setWrap(mappages.readPage(name, "wraps"));
  this.setEnterX(mappages.readPage(name, "enterx"));
  this.setEnterY(mappages.readPage(name, "entery"));
  this.setSeeBelow(mappages.readPage(name, "seeBelow"));
  this.setLinkedMapsArray(mappages.readPage(name, "linkedMaps"));
  this.setLightLevel(mappages.readPage(name, "lightLevel"));
  this.setAlwaysRemember(mappages.readPage(name, "alwaysRemember"));
  
  this.setName(name);
  
  // set lightsources
  for (var i=0; i<this.data.length; i++) {
  	for (var j=0; j<this.data[0].length; j++) {
  	  var thistile = this.getTile(j,i);
  	  if (thistile == "OoB") { alert("Wtf? Tile out of bounds on map load."); }	
  	  if ((typeof thistile.getTerrain().getLight == "function") && (thistile.getTerrain().getLight() > 0)) {
  	  	setMapLight(this,thistile.getTerrain().getSerial(),thistile.getTerrain().getLight(),j,i);
  	  }
  	}
  }
  return;
}

function setMapLight(map,serial,light,x,y) {
	for (var i = (x-(light+1)); i<=(x+(light+1)); i++) {
		for (var j = (y-(light+1)); j<=(y+(light+1)); j++) {
			if (map.getTile(i,j) == "OoB") { next; }
			var LOSval = map.getLOS(x,y,i,j,losgrid);
			var dist = ((x-i)^2 + (y-j)^2)^(.5);
			var totlight = (light + 1.5 - dist) * ( LOS_THRESHOLD - LOSval );
			if (totlight > 0) { 
				map.getTile(i,j).addLocalLight(serial,totlight);
			}
		}
	}
}

GameMap.prototype.getLOS = function(x1,y1,x2,y2,losgrid) {
	var trueLOS = LOS_THRESHOLD;
	var totalLOS = 0;
	if ((x2-x1) <= (y2-y1)) { 
		// lower left half of map
		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","ne",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }
		
		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","nw",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","se",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }
	}
	if ((x2-x1) >= (y2-y1)) {
		// upper right half of map
		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","sw",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","nw",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","se",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }
	}
	if ((x2-x1) >= ((-1)*(y2-y1))) {
		// lower right half of map
		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","nw",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","sw",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","ne",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }
	}
	if ((x2-x1) <= ((-1)*(y2-y1))) {
		// upper left half of map
		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","se",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","ne",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","sw",this);
		if (totalLOS < LOS_THRESHOLD) { return totalLOS; }
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }
	}
	
	
  return trueLOS;
}

function genLOS(x1,y1,x2,y2,losgrid,startsection,endsection,losmap) {
	  var LOSes = losgrid.getLOS(x1,y1,x2,y2,startsection,endsection);
	  var totalLOS = 0;
	  if (LOSes[0]) {
	  	for (var i = 0; i < LOSes.length; i++ ){
	  		var location = losmap.getTile(x1+LOSes[i].x,y1+LOSes[i].y);
	  		var dist = Math.sqrt(Math.pow(((x1+LOSes[i].x) - x1), 2) + Math.pow(((y1 + LOSes[i].y) - y1),2));
	  		totalLOS += LOSes[i].coeff * location.getBlocksLOS(dist);
	  		if (totalLOS > LOS_THRESHOLD) { return totalLOS; }
	  	}
	  } 
	  return totalLOS;	
}

GameMap.prototype.setLights = function() {
	for (var i = 0; i < this.data.length; i++) {
		for (var j = 0; j < this.data[i].length; j++) {
			
		}
	}
}

function Pages() {

  this["test"] = new Object();
  this["test"].terrain = new Array;
  this["test"].terrain[0] = "WW WW WW WW WW";
  this["test"].terrain[1] = "WW ww ww ww WW";
  this["test"].terrain[2] = "WW ww uu ww WW";
  this["test"].terrain[3] = "WW ww ww ww WW";
  this["test"].terrain[4] = "WW WW WW WW WW";

}

Pages.prototype.readPage = function (name,type) {

  if (this[name][type]) {
    return this[name][type];
  } else {
  	return "";
  }
  
}


function Platonic() {

  this.data = new Array;

}

Platonic.prototype.getForm = function (name) {

  if (this.data[name]) {
    return this.data[name];
  }
  else {
    this.data[name] = localFactory.createTile(name);
    return this.data[name];
  }

}

function MapMemory() {
  this.data = new Array;	
}

MapMemory.prototype.addMap = function(mapname) {
	var newmap = new GameMap();
	newmap.loadMap(mapname);
	this.data[mapname] = newmap;
	
	// also load any linked maps
	if (newmap.linkedMaps[0] && newmap.linkedMaps[0] != "") {
		for (var i = 0; i < newmap.linkedMaps.length; i++) {
			var anothermap = new GameMap();
			anothermap.loadMap(newmap.linkedMaps[i]);
			this.data[newmap.linkedMaps[i]] = anothermap;
		}
	}
	
	return newmap;
}

MapMemory.prototype.addMapByRef = function(mapref) {
	var mapname = mapref.getName();
	this.data[mapname] = mapref;
	
	return mapref;
}

MapMemory.prototype.deleteMap = function(mapname) {
	if (this.data[mapname].linkedMaps[0] && this.data[mapname].linkedMaps[0] != "") {
		for (var i = 0; i < this.data[mapname].linkedMaps.length; i++) {
			delete this.data[this.data[mapname].linkedMaps[i]];
		}
	}
	delete this.data[mapname];
}

MapMemory.prototype.getMap = function(mapname) {
	if (this.data[mapname]) { return this.data[mapname]; }
	else { return undefined; }
}

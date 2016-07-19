
"use strict";

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
    "sW" : "ShadowOcean",   // 1
    "ShadowOcean" : "sW",  
    "sw" : "ShadowWater",   // 2
    "ShadowWater" : "sw",  
    "su" : "ShadowShallows", // 3
    "ShadowShallows" : "su",
    '^^' : "Mountain", // 4
    "Mountain" : '^^', 
    '^_' : "MountainPass", // 4
    "MountainPass" : '^_', 
    '$=' : "LeftCastle", // 5
    "LeftCastle" : '$=',
    '=$' : "RightCastle", // 6
    "RightCastle" : '=$', 
  // 7-10 are features
    '%%' : "StoneWall", // 11
    "StoneWall" : '%%',
    'c#' : "Coral",
    "Coral" : 'c#',
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
    'xo' : "PurplePillar", // 16
    "PurplePillar" : 'xo',
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
    'DK' : "Darkness", // 55
    "Darkness" : 'DK',
    '##' : "Wall", // 56
    "Wall" : '##',
    '!#' : "RuinsWall",
    "RuinsWall" : '!#',
    '~_' : "RuinsWallMidLeftBottomRight",
    "RuinsWallMidLeftBottomRight" : '~_',
    '_~' : "RuinsWallBottomLeftMidRight",
    "RuinsWallBottomLeftMidRight" : '_~',
    '=~' : "RuinsWallTallLeftMidRight",
    "RuinsWallTallLeftMidRight" : '=~',
    '~=' : "RuinsWallMidLeftTallRight",
    "RuinsWallMidLeftTallRight" : '~=',
    '~~' : "RuinsWallMidLeftMidRight",
    "RuinsWallMidLeftMidRight" : '~~',
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
//    '+D' : "Doorway", // 68
//    "Doorway" : '+D',
    '!!' : "PlanksNS", // 69
    "PlanksNS" : '!!',
    's!' : "ShadowPlanksNS", // 69
    "ShadowPlanksNS" : 's!',
// 70 - 72 are features (bridges)
    '__' : "SouthCoast", // 73
    "SouthCoast" : '__',
    '--' : "NorthCoast", // 74
    "NorthCoast" : '--',
    '-b' : "NorthCoastSand", // 74
    "NorthCoastSand" : '-b',
    '.|' : "EastCoast", // 75
    "EastCoast" : '.|',
    '|.' : "WestCoast", // 76
    "WestCoast" : '|.',
    '.`' : "NortheastCoast", // 77
    "NortheastCoast" : '.`',
    'b`' : "NortheastCoastSand", // 77
    "NortheastCoastSand" : 'b`',
    '`.' : "SouthwestCoast", // 78
    "SouthwestCoast" : '`.', 
    '/.' : "NorthwestCoast", // 79
    "NorthwestCoast" : '/.',
    '/b' : "NorthwestCoastSand", // 79
    "NorthwestCoastSand" : '/b',
    './' : "SoutheastCoast", // 80
    "SoutheastCoast" : './',
    's_' : "ShadowSouthCoast", // 73
    "ShadowSouthCoast" : 's_',
    's-' : "ShadowNorthCoast", // 74
    "ShadowNorthCoast" : 's-',
    's|' : "ShadowEastCoast", // 75
    "ShadowEastCoast" : 's|',
    '|s' : "ShadowWestCoast", // 76
    "ShadowWestCoast" : '|s',
    's`' : "ShadowNortheastCoast", // 77
    "ShadowNortheastCoast" : 's`',
    '`s' : "ShadowSouthwestCoast", // 78
    "ShadowSouthwestCoast" : '`s', 
    '/s' : "ShadowNorthwestCoast", // 79
    "ShadowNorthwestCoast" : '/s',
    's/' : "ShadowSoutheastCoast", // 80
    "ShadowSoutheastCoast" : 's/',
// 101-102 are features (bridge)
    '++' : "Cobblestone", // 103
    "Cobblestone" : '++',
    '-=' : "PlanksEW", // 104
    "PlanksEW" : '-=',
// 105 is a feature or an NPC, depending
    '..' : "Grass", // 121
    "Grass" : '..',
    'ss' : "ShadowGrass", // 121
    "ShadowGrass" : 'ss',
    '.,' : "Dirt", // 121
    "Dirt" : '.,',
    's,' : "ShadowDirt", 
    "ShadowDirt" : 's,',
    ',,' : "Brush", // 122
    "Brush" : ',,',
    ',s' : "ShadowBrush",
    "ShadowBrush" : ',s',
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
    's;' : "ShadowGrove", // 123
    "ShadowGrove" : 's;',
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
    '+S' : "ShadowPurpleCobblestone", // 125
    "ShadowPurpleCobblestone" : '+S',
    'p*' : "FancyFloor",
    "FancyFloor" : 'p*',
// 126 is a feature (bridge)
    'ff' : "Swamp", // 141
    "Swamp" : 'ff',
    'sf' : "ShadowSwamp", 
    "ShadowSwamp" : 'sf',
// 142 - 146 are features
//    '~~' : "Lava", // 147
//    "Lava" : '~~',
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
    "River" : 'RR',
    'RR' : "River",
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
    "Road" : 'rd',
    'rd' : "Road",
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
    "WorldBelow" : 'wb',
    'wb' : "WorldBelow",
    "CaveFloor" : 'cf',
    'cf' : "CaveFloor",
    "CaveWall" : 'cw',
    'cw' : "CaveWall",
    "HexFloor" : 'hf',
    'hf' : "HexFloor",
    "HexTransparentFloor" : 'ht',
    'ht' : "HexTransparentFloor",
    "BlueTiles" : 'bb',
    'bb' : "BlueTiles",    
    "GoldOutlineFloor" : 'go',
    'go' : "GoldOutlineFloor",    
    "DiamondFloor" : 'df',
    'df' : "DiamondFloor",    
    "BlueDiamondFloor" : 'bd',
    'bd' : "BlueDiamondFloor",    
    "PurpleDiamondFloor" : 'pd',
    'pd' : "PurpleDiamondFloor",    
    "RedDiamondFloor" : 'r^',
    'r^' : "RedDiamondFloor",    
    "YellowDiamondFloor" : 'yd',
    'yd' : "YellowDiamondFloor",    
    "GreenDiamondFloor" : 'gd',
    'gd' : "GreenDiamondFloor",    
    "Banner" : 'br',
    'br' : "Banner",
  }

}

Atlas.prototype.keylookup = function(entry) {
  if (this.key[entry]) {  return this.key[entry];  }
  else {alert("Key lookup unsuccessful for " + entry); return 0; }

}

// Page object- condensed map

function Acre() {

  this.terrain = "";
  this.features = new Collection();
  this.npcs = new Collection();
  this.pcs = new Collection();
  
//  AssignSerial.call(this);
  this.localLight = {};
}

Acre.prototype.addLocalLight = function(lightsource, lightlevel, map) {
  // lightlevel is always an object, might not have ne,nw,etc, always has center
  this.localLight[lightsource.getSerial()] = lightlevel;
	map.lightsList[lightsource.getSerial()] = lightsource;
//	if (debug && debugflags.light) { dbs.writeln("LIGHT " + lightsource.getSerial() + ": Added to this acre."); }
	DebugWrite("light", "LIGHT " + lightsource.getSerial() + ": Added to this acre.<br />");
}

Acre.prototype.getLocalLight = function(dir) {
  var lightlevel = 0 ;
  if (dir) {
    for (var i in this.localLight) {
      lightlevel += this.localLight[i][dir];
    }
  } else {
	  for (var i in this.localLight) {
		  lightlevel += this.localLight[i]["center"];
    }
  }
	return lightlevel;
}

Acre.prototype.getLocalLightFrom = function(viewer) {
  alert("IN OTHERWISE EMPTY FUNCTION getLocalLightFrom");
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

Acre.prototype.getBlocksLOE = function(dist) {
	var maxLOS = 0;
	maxLOS = this.terrain.getBlocksLOE(dist);
	var allFeatures = this.features.getAll();
	if (allFeatures[0]) {
		for (var i = 0; i < allFeatures.length; i++ ) {
			var featureLOS = allFeatures[0].getBlocksLOE(dist);
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
	if (ind === 0) { return; }
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
	if (ind === 0) { return; }
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

Acre.prototype.getTop = function(nopc) {
	var toptile;
	if (this.getTopPC() && !nopc) {
  	toptile = this.getTopPC();
  } else if (this.getTopVisibleNPC()) {
  	toptile = this.getTopVisibleNPC();
  } else if (this.getTopVisibleFeature()) {
  	toptile = this.getTopVisibleFeature();
  } else { toptile = this.getTerrain(); }

	return toptile;
}

Acre.prototype.getBumpIntoResult = function(mover) {
	var terrain = this.getTerrain();
	var retval = terrain.bumpinto(mover);

	if (retval["msg"] != "") { retval["msg"] = " - " + retval["msg"]; }	
	if (retval["canmove"] === 0) { return retval; }
	
	var features = this.getFeatures();
	if (features[0]) {
		for (var i=0; i<features.length; i++) {
			var retval2 = features[i].bumpinto(mover);
			if (retval2["msg"] != "") {
				if (retval["msg"] == "") { retval["msg"] = " - " + retval2["msg"]; }
				else { retval["msg"] += "\n" + retval2["msg"]; }
			}
			if (retval2["canmove"] === 0) { 
			  retval["canmove"] = 0;
			  return retval; 
			}
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

// if nonpcs is true, this will return false if there is an NPC blocking movement. If it's false/missing, this ignores NPCs.
Acre.prototype.canMoveHere = function(movetype, nonpcs) {
	var terrain = this.getTerrain();
	var totalpassability = terrain.getPassable();
	var retval = {};
	
//  NO LONGER ALLOWING SWIMMERS TO CROSS BRIDGES

//	if (totalpassability & MOVE_SWIM & mover.getMovetype()) {
//		if (fromtile.getTerrain().getPassable() & MOVE_SWIM) {
//			// moving from a water tile to a water tile. This bypasses the blocking ability of bridges, etc.
//			retval["canmove"] = 1;
//			retval["msg"] = "";
//			return retval;
//		}
//	}
  var doors = 0;
  if (movetype === MOVE_WALK_DOOR) { 
    movetype = MOVE_WALK; 
    doors = 1;
  }
  
	var featurepassability = MOVE_FLY + MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	var features = this.getFeatures();
	if (features[0]) {
	  for (var i=0; i< features.length; i++) {
	    if (doors && (((features[i].opengraphic) && (!features[i].locked)) || (features[i].pushable))) {
	      // skip doors for this check
	      // new: also skip things which can be pushed out of the way
	    } else {
		    featurepassability = featurepassability & features[i].getPassable();
		  }
		}  
		if (!nonpcs) {
		  var npcs = this.getNPCs();
	    if (npcs[0]) {
	  	  featurepassability = 0;
      }
      var pcs = this.getPCs();
      if (pcs[0]) {
	  	  featurepassability = 0;
      }
    }
		if (totalpassability & MOVE_SWIM) {
//	  	if (featurepassability & mover.getMovetype()) {
	  	if (featurepassability & movetype) {
	  		retval["canmove"] = 1;
  			retval["msg"] = "";
			  return retval;
		  }
	  }
	}
	if (!nonpcs) {
	  var npcs = this.getNPCs();
    if (npcs[0]) {
      featurepassability = 0;
    }
    var pcs = this.getPCs();
    if (pcs[0]) {
	   featurepassability = 0;
    }    
  }
//	if (totalpassability & featurepassability & mover.getMovetype()) {
  if (totalpassability & featurepassability & movetype) {
		retval["canmove"] = 1;
		retval["msg"] = "";
		return retval;
	}
	
	retval["canmove"] = 0;
	retval["msg"] = "Blocked!";
	return retval;
}

Acre.prototype.getPathWeight = function() {
  var pathweight = this.getTerrain().getPathWeight();
  var fea = this.getFeatures();
  $.each(fea, function(idx,val) {
    pathweight += val.getPathWeight();
  });
  return pathweight;
};

Acre.prototype.executeWalkons = function(walker) {
	var terrain = this.getTerrain();
	var response = "";
	if (typeof terrain.walkon === "function") {
    var resp = terrain.walkon(walker);
    if (resp) {
      response += resp;
    }
	}
	var features = this.getFeatures();
	if (features) {
		for (var i = 0; i < features.length; i++) {
			if (typeof features[i].walkon === "function") {
				var resp = features[i].walkon(walker);
				if (resp) {
				  if (response) { response += "<br />"; }
				  response += resp;
				}
			}
		}
	}
	return response;
}

Acre.prototype.executeWalkoffs = function(walker) {
	var terrain = this.getTerrain();
	var response = "";
	if (typeof terrain.walkoff === "function") {
    var resp = terrain.walkoff(walker);
    if (resp) {
      response += resp;
    }
	}
	var features = this.getFeatures();
	if (features) {
		for (var i = 0; i < features.length; i++) {
			if (typeof features[i].walkoff === "function") {
				var resp = features[i].walkoff(walker);
				if (resp) {
				  if (response) { response += "<br />"; }
				  response += resp;
				}
			}
		}
	}
	return response;
}

Acre.prototype.executeIdles = function(walker) {
	var terrain = this.getTerrain();
	var response = "";
	if (typeof terrain.idle === "function") {
		var resp = terrain.idle(walker);
		if (resp) { response += resp; }
	}
	var features = this.getFeatures();
	if (features) {
		for (var i = 0; i < features.length; i++) {
			if (typeof features[i].idle === "function") {
				var resp = features[i].idle(walker);
				if (resp) {
				  if (response) { response += "<br />"; }
				  resp += response;
				}
			}
		}
	}
	return response;
}

// Map Object - one per map.

function GameMap() {

  this.data = [];
// Each entry in the array will be an Object with .terrain, .features, and .npcs

  this.enterx = 65;
  this.entery = 70;
  this.name = "";  

  this.features = new Collection();  // list of all features on the map
  this.npcs = new Collection(); // list of all NPCs on the map
  this.pcs = new Collection(); // list of all PCs on the map - usually one, but support exists for parties
// these three will be maintained concurrently with collections on individual tiles/acres

  this.desc = "";
  this.music = "";
  this.exitTo = {};
  this.exitTo.mapname = "darkunknown";
  this.exitTo.x = 65;
  this.exitTo.y = 70;
  this.wraps = 0;
  
  this.returnmap = "darkunknown";
  this.returnx = 27;
  this.returny = 43;
  this.returninfused = 0;
  
  this.linkedMaps = [];
  this.seeBelow = "";
  
  this.lightLevel = "bright";
  this.alwaysRemember = 0;
  this.scale = 1;
  this.backgroundimage = '';
  this.underground = 0;
  this.noiseSources = [];
  
  this.exitScript = "";
  this.exitTestScript = "";
  this.enterScript = "";
  this.enterTestScript = "";
  this.pathGrid = {};
  this.network = [];
  
  this.lightsList = {};
}
GameMap.prototype = new Object();

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

GameMap.prototype.setBackground = function(bgimg) {
  this.backgroundimage = bgimg;
  return this.backgroundimage;
}

GameMap.prototype.getBackground = function() {
  return this.backgroundimage;
}

GameMap.prototype.setUnderground = function(ug) {
  if (parseInt(ug)) {
    this.underground = 1;
  }
  return this.underground;
}

GameMap.prototype.getUnderground = function() {
  return this.underground;
}

GameMap.prototype.setScale = function(newscale) {
  if (newscale) { this.scale = parseInt(newscale); }
//  this.scale = newscale;
  return this.scale;
}

GameMap.prototype.getScale = function() {
  return this.scale;
}

GameMap.prototype.setMusic = function(music) {
  this.music = music;
  return this.music;
}

GameMap.prototype.getMusic = function() {
  return this.music;
}

GameMap.prototype.setEnterX = function(x) {
  if (x) { this.enterx = parseInt(x); }
//  this.enterx = x;
  return this.enterx;
}

GameMap.prototype.getEnterX = function() {
  return this.enterx;
}

GameMap.prototype.setEnterY = function(y) {
  if (y) { this.entery = parseInt(y); }
//  this.entery = y;
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
  if (x) { this.exitTo.x = parseInt(x); }
//  this.exitTo.x = x;
  return this.exitTo.x;
}

GameMap.prototype.getExitToX = function() {
  return this.exitTo.x;
}

GameMap.prototype.setExitToY = function(y) {
  if (y) { this.exitTo.y = parseInt(y); }
//  this.exitTo.y = y;
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

GameMap.prototype.getReturnMap = function() {
  return this.returnmap;
}

GameMap.prototype.getReturnx = function() {
  return this.returnx;
}

GameMap.prototype.getReturny = function() {
  return this.returny;
}

GameMap.prototype.setReturn = function(newmap, rx, ry) {
  this.returnmap = newmap;
  this.returnx = parseInt(rx);
  this.returny = parseInt(ry);
  return this.returnmap;
}

GameMap.prototype.getReturnInfused = function() {
  return parseInt(this.returninfused);
}

GameMap.prototype.setReturnInfused = function(infused) {
  if (parseInt(infused)) {
    this.returninfused = 1;
  } else {
    this.returninfused = 0;
  }
  return this.returninfused;
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
  if (ar) { this.alwaysRemember = parseInt(ar); }
//	this.alwaysRemember = ar;
}

GameMap.prototype.getSeeBelow = function() {
	return this.seeBelow;
}

GameMap.prototype.setSeeBelow = function(mapname) {
	this.seeBelow = mapname;
}

GameMap.prototype.getLightLevel = function() {
	return this.lightLevel;
}

GameMap.prototype.setLightLevel = function(lightlevel) {
	this.lightLevel = lightlevel;
}

GameMap.prototype.getExitScript = function() {
	return this.exitScript;
}

GameMap.prototype.setExitScript = function(es) {
	this.exitScript = es;
}

GameMap.prototype.getExitTestScript = function() {
	return this.exitTestScript;
}

GameMap.prototype.setExitTestScript = function(es) {
	this.exitTestScript = es;
}

GameMap.prototype.getEnterScript = function() {
	return this.enterScript;
}

GameMap.prototype.setEnterScript = function(es) {
	this.enterScript = es;
}

GameMap.prototype.getEnterTestScript = function() {
	return this.enterTestScript;
}

GameMap.prototype.setEnterTestScript = function(es) {
	this.enterTestScript = es;
}

GameMap.prototype.getPathGrid = function (movetype) {
  return this.pathGrid[movetype];
}

GameMap.prototype.createPathGrid = function() {
  this.pathGrid[MOVE_WALK] = new PF.Grid(this.getWidth(), this.getHeight());
  this.pathGrid[MOVE_SWIM] = new PF.Grid(this.getWidth(), this.getHeight());
  this.pathGrid[MOVE_LEVITATE] = new PF.Grid(this.getWidth(), this.getHeight());
  this.pathGrid[MOVE_FLY] = new PF.Grid(this.getWidth(), this.getHeight());
  this.pathGrid[MOVE_ETHEREAL] = new PF.Grid(this.getWidth(), this.getHeight());
  this.pathGrid[MOVE_WALK_DOOR] = new PF.Grid(this.getWidth(), this.getHeight());
  for (var i=0; i<this.getWidth(); i++) {
    for (var j=0; j<this.getHeight(); j++) {
      var thisspot = this.getTile(i,j);
      for (var k=1; k<=32; k=k*2) {
        var response = thisspot.canMoveHere(k, 1);
        if (!response["canmove"]) { this.setWalkableAt(i,j,false,k); }
        var pathweight = thisspot.getPathWeight();
        if (!pathweight) { pathweight = 0; }
        this.setCostAt(i,j,pathweight,k);
      }
    }
  }
}

GameMap.prototype.getPath = function(fromx,fromy,tox,toy,movetype) {
  if (!movetype) { alert("getPath called with no movetype"); }
  
  var gridbackup = this.getPathGrid(movetype).clone();
  // destination tile must always be walkable.
  gridbackup.setWalkableAt(tox,toy,true);
  
  // so must start tile, for some reason
  gridbackup.setWalkableAt(fromx,fromy,true);
  
  // get path
  var foundpath = finder.findPath(fromx,fromy,tox,toy,gridbackup);
  
  return foundpath;
}

GameMap.prototype.setWalkableAt = function(x,y,canwalk,movetype) {
  this.pathGrid[movetype].setWalkableAt(x,y,canwalk);
}

GameMap.prototype.setCostAt = function(x,y,cost,movetype) {
  this.pathGrid[movetype].setCostAt(x,y,cost);
}


// generate the tile from the factory first, then pass it to setTerrain
GameMap.prototype.setTerrain = function(x,y,terrain) {
  // hopefully usually called by click on the map
//  var tile = localFactory.createTile(terrain.name);
  var tile = eidos.getForm(terrain.getName());
  if (tile) {
    this.data[y][x] = new Acre();
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
//  if (debug && debugflags.map) {
//    dbs.writeln(oldx + " " + oldy + " to " + newx + " " + newy + ", anchor is " + anchor + "<br><br>");
//  }
  DebugWrite("map", oldx + " " + oldy + " to " + newx + " " + newy + ", anchor is " + anchor + "<br><br>");
  var tile = new Acre();
  tile.terrain = localFactory.createTile(selectionval.name);

  if ((newx) && (newx != oldx)) {
    for (var i = 1; i <= Math.abs(newx-oldx); i++) {
      for (var j=0;j<this.data.length;j++) {
        if ((anchor === 0) || (anchor === 3) || (anchor === 6)) {
          if (newx > oldx) {  
            this.data[j].push(tile);  
          }
          else if (oldx > newx ) { 
            this.data[j].pop();
          }
        }
        else if ((anchor === 2) || (anchor === 5) || (anchor === 8)) {
          if (newx > oldx) { 
            this.data[j].unshift(tile); 
          }
          else if (oldx > newx) { 
            this.data[j].shift(); 
          }
        }
        else if ((anchor === 1) || (anchor === 4) || (anchor === 7)) {
          if ((newx > oldx) && (i%2 === 1)) { 
            this.data[j].push(tile); 
          }
          else if ((newx > oldx) && (i%2 === 0)) { 
            this.data[j].unshift(tile); 
          }
          else if ((oldx > newx) && (i%2 === 1)) { 
            this.data[j].pop(); 
          }
          else if ((oldx > newx) && (i%2 === 0)) { 
            this.data[j].shift(); 
          }
        }
      }
    }
  }
  if ((newy) && (newy != oldy)) { 
    for (var i = 1; i <= Math.abs(newy-oldy); i++) {
      if (newy > oldy) {
        var placeholder = [];
        for (var j=0; j<this.data[0].length;j++) { placeholder.push(tile); }
        if ((anchor === 0) || (anchor === 1) || (anchor === 2)) {
          this.data.push(placeholder);
        }
        else if ((anchor === 6) || (anchor === 7) || (anchor === 8)) {
          this.data.unshift(placeholder);
        }
        else if ((anchor === 3) || (anchor === 4) || (anchor === 5)) {
          if (i%2 === 0) { 
            this.data.push(placeholder); 
          }
          else if (i%2 === 1) { 
            this.data.unshift(placeholder); 
          }
        }
      }
      else if (oldy > newy) {
        if ((anchor === 0) || (anchor === 1) || (anchor === 2)) {
          this.data.pop();
        }
        else if ((anchor === 6) || (anchor === 7) || (anchor === 8)) {
          this.data.shift(); 
        }
        else if ((anchor === 3) || (anchor === 4) || (anchor === 5)) {
          if (i%2 === 0) { 
            this.data.pop(); 
          }
          else if (i%2 === 1) { 
            this.data.shift(); 
          }
        }
      }
    }
  }
//  if (debug && debugflags.map) {
//    dbs.writeln("Done: " + this.data.length + " " + this.data[0].length + "<br><br>");
//  }
  DebugWrite("map", "Done: " + this.data.length + " " + this.data[0].length + "<br><br>");
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


GameMap.prototype.placeThing = function(x,y,newthing,timeoverride) {
  if (newthing) {
    newthing.setHomeMap(this);
    
    if (newthing.checkType("NPC") && (typeof this.Enter === "function")) {
      this.Enter(newthing,"",0,0,x,y);
    }

    var type = newthing.getTypeForMap() + "s";
    if (!this.data[type]) { this.data[type] = new Collection(); }
  	newthing.setx(x);
  	newthing.sety(y);
    this[type].addTop(newthing);

    if (!this.data[y][x][type]) {
      this.data[y][x][type] = new Collection();
    }
    this.data[y][x][type].addTop(newthing);

 	  if ((typeof newthing.getLight === "function") && (newthing.getLight() > 0)) {
  	  DebugWrite("light", "<br /><br />LIGHT: Placing new light source: " + newthing.getName() + ", light value: " + newthing.getLight() + ", serial: " + newthing.getSerial());
  	  this.setMapLight(newthing, newthing.getLight(),x,y);
  	}       
  	
  	if (newthing.ambientNoise) {
  	  this.setNoiseSource(newthing, newthing.getAmbientNoise(), newthing.getAmbientRadius());
  	}
  
    newthing.activate(timeoverride);

	  //update pathfinding
	  if ((type !== "npcs") && (type !== "pcs")) {
      var tile = this.getTile(x,y);
      for (var itr=1; itr<=32; itr=itr*2) {
        var response = tile.canMoveHere(itr, 1);
	      if (response["canmove"]) { this.setWalkableAt(x,y,true,itr); }
  	    else { this.setWalkableAt(x,y,false,itr); }
    	}
    }

  }  
}

GameMap.prototype.moveThing = function(x,y,thing) { // this is called after bump and passable and before walkon
//	var type = thing.type + "s";
  var oldx = thing.getx();
  var oldy = thing.gety();
 	if ((typeof thing.getLight === "function") && (Math.abs(thing.getLight()) > 0)) {
    this.removeMapLight(thing.getSerial(),thing.getLight(),thing.getx(),thing.gety());
  }
  var type = thing.getTypeForMap() + "s";
	this.data[thing.gety()][thing.getx()][type].deleteFrom(thing);
	if (!this.data[y][x][type]) { this.data[y][x][type] = new Collection(); }
  this.data[y][x][type].addTop(thing);
  thing.setx(x);
  thing.sety(y);
 	if ((typeof thing.getLight === "function") && (Math.abs(thing.getLight()) !== 0)) {
    this.setMapLight(thing,thing.getLight(),x,y);
  }
  // update pathfinding
  if (type !== "npcs") {
    var oldtile = this.getTile(oldx,oldy);
    var tile = this.getTile(x,y);
  	for (var i=1; i<=32; i=i*2) {
	    var response = oldtile.canMoveHere(i, 1);
      if (response["canmove"]) { this.setWalkableAt(oldx,oldy,true,i); }
      else { this.setWalkableAt(oldx,oldy,false,i); }
      response = tile.canMoveHere(i, 1);
      if (response["canmove"]) { this.setWalkableAt(x,y,true,i); }
      else { this.setWalkableAt(x,y,false,i); }
    }
  }

}

GameMap.prototype.deleteThing = function(thing) {
  var thingmap = thing.getHomeMap();
//  alert(thingmap.getName());
//  alert(thing.getName());
  if (thingmap !== this) { alert("tried to delete " + thing.getName() + " which is not on this map."); return 0; }
//	var type = thing.type + "s";
  var oldx = thing.getx()
  var oldy = thing.gety();
  var type = thing.getTypeForMap() + "s";
  if ((typeof thing.getLight === "function") && (Math.abs(thing.getLight()) > 0)) {
    this.removeMapLight(thing.getSerial(),thing.getLight(),thing.getx(),thing.gety());
  }
	this[type].deleteFrom(thing);
	this.data[thing.gety()][thing.getx()][type].deleteFrom(thing);
	
	//update pathfinding
	if ((type !== "npcs") && (type !== "pcs")) {
    var tile = this.getTile(oldx,oldy);
	  for (var i=1; i<=32; i=i*2) {
	    var response = tile.canMoveHere(i, 1);
  	  if (response["canmove"]) { this.setWalkableAt(oldx,oldy,true,i); }
	    else { this.setWalkableAt(oldx,oldy,false,i); }
	  }
	}
	
}


GameMap.prototype.saveMap = function (name) {
 if (name === '') {
   name = prompt("Map Name", this.name);
 }
 if (name === null) {return;}
 var printerwin = window.open('','printarray');
 printerwin.document.writeln('mappages["' + name + '"] = {};');
 var oldname=name;
 name = 'mappages["' + name + '"].terrain';
 printerwin.document.writeln(name + " = [];");
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
 printerwin.document.write("\n" + name + " = [];\n");
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
   if (baseobj.getDesc() !== mapfeatures[i].getDesc()) {
   	 var thedesc = mapfeatures[i].getDesc();
     printerwin.document.write(", desc : \"" + thedesc + "\"");
   }
   if (baseobj.getPrefix() !== mapfeatures[i].getPrefix()) {
   	 var theprefix = mapfeatures[i].getPrefix();
     printerwin.document.write(", prefix : \"" + theprefix + "\"");
   }
   if ((baseobj.getLocked != null) && (baseobj.getLocked() !== mapfeatures[i].getLocked())) {
   	 printerwin.document.write(", locked : " + mapfeatures[i].getLocked());
   }
   if (baseobj.getEnterMap != null) {
   	 var mapdest = mapfeatures[i].getEnterMap();
   	 printerwin.document.write(", entermap : '" + mapdest.entermap + "', enterx : " + mapdest.enterx + ", entery : " + mapdest.entery);
   }
   if (baseobj.container != null) {
     printerwin.document.write(", lootgroup : '" + mapfeatures[i].getLootgroup() + "'");
     printerwin.document.write(", lootedid : '" + mapfeatures[i].getLootedID() + "'");
   }
   if (baseobj.getWalkOnScript() !== mapfeatures[i].getWalkOnScript()) {
   	printerwin.document.write(", walkonscript : '" + mapfeatures[i].getWalkOnScript() + "'");
   }
   if (baseobj.getUseScript() !== mapfeatures[i].getUseScript()) {
   	printerwin.document.write(", usescript : '" + mapfeatures[i].getUseScript() + "'");
   }   
   printerwin.document.write("};\n");
 }
 
 name = 'mappages["' + oldname + '"].npcs';
 printerwin.document.write("\n");
 printerwin.document.write("\n" + name + " = [];\n");
 var mapnpcs = this.npcs.getAll();
 for (var i=0;i<=mapnpcs.length-1;i++) {
 	printerwin.document.write(name + "[" + i + "] = {name : '" + mapnpcs[i].getName() + "'");
 	printerwin.document.write(", x : " + mapnpcs[i].getx() + ", y : " + mapnpcs[i].gety());
 	var basenpc = localFactory.createTile(mapnpcs[i].getName());
 	if (basenpc.getNPCName() !== mapnpcs[i].getNPCName()) {
 		printerwin.document.write(", NPCName: '" + mapnpcs[i].getNPCName() + "'");
 	}
 	if (basenpc.getDesc() !== mapnpcs[i].getDesc()) {
 		printerwin.document.write(", Desc: '" + mapnpcs[i].getDesc() + "'");
 	}
 	if (basenpc.getPrefix() !== mapnpcs[i].getPrefix()) {
 		printerwin.document.write(", Prefix: '" + mapnpcs[i].getPrefix() + "'");
 	}
 	if (basenpc.getLevel() !== mapnpcs[i].getLevel()) {
 		printerwin.document.write(", Level: " + mapnpcs[i].getLevel());
 	}
 	if (basenpc.getAlignment() !== mapnpcs[i].getAlignment()) {
 		printerwin.document.write(", Alignment: '" + mapnpcs[i].getAlignment() + "'");
 	}
 	if (basenpc.getStr() !== mapnpcs[i].getStr()) {
 		printerwin.document.write(", str: " + mapnpcs[i].getStr());
 	}
 	if (basenpc.getDex() !== mapnpcs[i].getDex()) {
 		printerwin.document.write(", dex: " + mapnpcs[i].getDex());
 	}
 	if (basenpc.getInt() !== mapnpcs[i].getInt()) {
 		printerwin.document.write(", int: " + mapnpcs[i].getInt());
 	}
 	if (basenpc.getAttitude() !== mapnpcs[i].getAttitude()) {
 		printerwin.document.write(", Attitude: '" + mapnpcs[i].getAttitude() + "'");
 	}
 	if (basenpc.getPeaceAI() !== mapnpcs[i].getPeaceAI()) {
 		printerwin.document.write(", PeaceAI: '" + mapnpcs[i].getPeaceAI() + "'");
 	}
  if (basenpc.getPCThreatAI() !== mapnpcs[i].getPCThreatAI()) {
 		printerwin.document.write(", PCThreatAI: '" + mapnpcs[i].getPCThreatAI() + "'");
 	}
 	if (basenpc.getConversation() !== mapnpcs[i].getConversation()) {
 		printerwin.document.write(", Conversation: '" + mapnpcs[i].getConversation() + "'");
 	} 	
 	if (basenpc.getConversationFlag() !== mapnpcs[i].getConversationFlag()) {
 		printerwin.document.write(", ConversationFlag: '" + mapnpcs[i].getConversationFlag() + "'");
 	} 	
 	if (basenpc.getGender() !== mapnpcs[i].getGender()) {
 		printerwin.document.write(", Gender: '" + mapnpcs[i].getGender() + "'");
 	} 	
 	if (basenpc.getMerch() !== mapnpcs[i].getMerch()) {
 		printerwin.document.write(", Merch: '" + mapnpcs[i].getMerch() + "'");
 	} 	
 	if (basenpc.getLeash() !== mapnpcs[i].getLeash()) {
 		printerwin.document.write(", Leash: " + mapnpcs[i].getLeash() + "");
 	} 	
 	if (basenpc.getBarkFreq() !== mapnpcs[i].getBarkFreq()) {
 		printerwin.document.write(", BarkFreq: " + mapnpcs[i].getBarkFreq() + "");
 	} 	
 	if (basenpc.getBark() !== mapnpcs[i].getBark()) {
 		printerwin.document.write(", Bark: '" + mapnpcs[i].getBark() + "'");
 	} 	
 	if (basenpc.getBarkRad() !== mapnpcs[i].getBarkRad()) {
 		printerwin.document.write(", BarkRad: " + mapnpcs[i].getBarkRad() + "");
 	} 	
 	if (basenpc.getNPCBand() !== mapnpcs[i].getNPCBand()) {
 		printerwin.document.write(", NPCBand: '" + mapnpcs[i].getNPCBand() + "'");
 	} 	
 	if (mapnpcs[i].overrideGraphic) {
 	  printerwin.document.write(", OverrideGraphic: '" + mapnpcs[i].overrideGraphic + "'");
 	}
 	printerwin.document.write("};\n");
}
 
 name = 'mappages["' + oldname + '"]';
 printerwin.document.write("\n" + name + ".desc = \"" + this.getDesc() + "\";\n");
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
 printerwin.document.write(name + ".scale = '" + this.getScale() + "';\n");
 printerwin.document.write(name + ".underground = '" + this.getUnderground() + "';\n");
 printerwin.document.write(name + ".enterscript = '" + this.getEnterScript() + "';\n");
 printerwin.document.write(name + ".entertestscript = '" + this.getEnterTestScript() + "';\n");
 printerwin.document.write(name + ".exitscript = '" + this.getExitScript() + "';\n");
 printerwin.document.write(name + ".exittestscript = '" + this.getExitTestScript() + "';\n");
 printerwin.document.write(name + ".returnmap = '" + this.getReturnMap() + "';\n");
 printerwin.document.write(name + ".returnx = '" + this.getReturnx() + "';\n");
 printerwin.document.write(name + ".returny = '" + this.getReturny() + "';\n");
 printerwin.document.write(name + ".returninfused = '" + this.getReturnInfused() + "';\n");
 var linkedMapList;
 var linkedMapArray = this.getLinkedMaps();
 if (linkedMapArray.length > 0) {
 	 for (var i=0;i<linkedMapArray.length;i++) {
 	 	if (i === 0) {
 	 		linkedMapList = '"' + linkedMapArray[i] + '"';
 	 	} else {
 	 		linkedMapList = linkedMapList + ',"' + linkedMapArray[i] + '"';
 	 	}
 	}
 	printerwin.document.write(name + ".linkedMaps = [" + linkedMapList + "];\n");
 }
 else {
   printerwin.document.write(name + ".linkedMaps = [];\n");
 }
 printerwin.document.close();
}

GameMap.prototype.loadMap = function (name) {
  this.data = [];
  this.features.deleteAll();
  this.npcs.deleteAll();
  var loadfrom = mappages.readPage(name, "terrain");
  var localatlas = new Atlas();
  for (var i=0;i<=loadfrom.length-1;i++) {
    DebugWrite("map", "<br>Starting line: " +i+ ", length " + loadfrom[i].length + " <br>");
    var tileserials = [];
    tileserials = loadfrom[i].split(" ");
    this.data[i] = [];
    for (var j=0;j<=tileserials.length-1;j++) {
      DebugWrite("map", " " + tileserials[j]);
      var loadedtile = localatlas.key[tileserials[j]];

      var newterrain = eidos.getForm(loadedtile);
      this.setTerrain(j,i,newterrain);
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
  this.setScale(mappages.readPage(name, "scale"));
  this.setUnderground(mappages.readPage(name, "underground"));
  this.setReturn(mappages.readPage(name, "returnmap"), mappages.readPage(name, "returnx"), mappages.readPage(name, "returny"));
  this.setReturnInfused(mappages.readPage(name, "returninfused"));
  if (!DU.gameflags.getFlag("editor")) {
    if(mappages.readPage(name, "enterscript")) {
      mappages[name][mappages.readPage(name, "enterscript")](this);
    }
    if(mappages.readPage(name, "entertestscript")){
      mappages[name][mappages.readPage(name, "entertestscript")](this);
    }
    if(mappages.readPage(name, "exitscript")) {
      mappages[name][mappages.readPage(name, "exitscript")](this);
    }
    if(mappages.readPage(name, "exittestscript")) {
      mappages[name][mappages.readPage(name, "exittestscript")](this);
    }
  } else {
    if(mappages.readPage(name, "enterscript")) {
      this.setEnterScript(mappages.readPage(name, "enterscript"));
    }
    if(mappages.readPage(name, "entertestscript")){
      this.setEnterTestScript(mappages.readPage(name, "entertestscript"));
    }
    if(mappages.readPage(name, "exitscript")) {
      this.setExitScript(mappages.readPage(name, "exitscript"));
    }
    if(mappages.readPage(name, "exittestscript")) {
      this.setExitTestScript(mappages.readPage(name, "exittestscript"));
    }
  }
  
  this.setName(name);
  this.createPathGrid();

  if (gamestate.getMode() !== "loadgame") {
    var loadfeatures = mappages.readPage(name, "features");
//  this.features = new Collection;
    if (loadfeatures) {
//  	alert(loadfeatures.length + " features loading...");
      for (var fi=0;fi<=loadfeatures.length-1;fi++) {
        var newfeature = localFactory.createTile(loadfeatures[fi].name);
//        if (debug && debugflags.map) {debugscreen.document.writeln("<br>Loading features: " +newfeature.getName()+ "...<br>");}
        DebugWrite("map", "<br />Loading features: " +newfeature.getName()+ "...<br />");
//    	newfeature.setHomeMap(this);
    	  for (var featurekey in loadfeatures[fi]) {
    		  if (featurekey === "name") { continue; }
      		if (featurekey === "locked") { newfeature.lockMe(loadfeatures[fi]["locked"]); continue; }
      		newfeature[featurekey] = loadfeatures[fi][featurekey];
      	}
    	  if (newfeature.getWalkOnScript()) {
      		var walkonscript = newfeature.getWalkOnScript();
      		mappages[name][walkonscript](newfeature);
      	}
      	if (newfeature.getUseScript()) {
      		var usescript = newfeature.getUseScript();
      		mappages[name][usescript](newfeature);
    	  }
      	if (newfeature.getLootedID()) {
      	  if (DU.gameflags.getFlag(newfeature.getLootedID())) {
      	    if (newfeature.lootonce) { newfeature.setLootgroup(""); }
      	    else  { newfeature.setLootgroup("prev_looted"); }
      	  }
      	}
      	if (newfeature.getLootgroup()) {
      	  AddLoot(newfeature);
      	}
  	    this.placeThing(loadfeatures[fi].x,loadfeatures[fi].y,newfeature);
      }
    }

    var loadnpcs = mappages.readPage(name, "npcs");
    if (loadnpcs)  {
  	  for (var npci=0;npci<=loadnpcs.length-1;npci++) {
    		var newnpc = localFactory.createTile(loadnpcs[npci].name);
//  		newnpc.setHomeMap(this);
    		for (var npckey in loadnpcs[npci]) {
  	  		if (npckey === "NPCName") { newnpc.setNPCName(loadnpcs[npci].NPCName); }
  		  	if (npckey === "Desc") { newnpc.setDesc(loadnpcs[npci].Desc); }
  			  if (npckey === "Prefix") { newnpc.setPrefix(loadnpcs[npci].Prefix); }
    			if (npckey === "Level") { newnpc.setLevel(loadnpcs[npci].Level); }
    			if (npckey === "Alignment") { newnpc.setAlignment(loadnpcs[npci].Alignment); }
  	  		if (npckey === "str") { newnpc.setStr(loadnpcs[npci].str); }
  		  	if (npckey === "dex") { newnpc.setDex(loadnpcs[npci].dex); }
  			  if (npckey === "int") { newnpc.setInt(loadnpcs[npci].int); }
    			if (npckey === "Attitude") { newnpc.setAttitude(loadnpcs[npci].Attitude); }
    			if (npckey === "PeaceAI") { newnpc.setPeaceAI(loadnpcs[npci].PeaceAI); }
  	  		if (npckey === "PCThreatAI") { newnpc.setPCThreatAI(loadnpcs[npci].PCThreatAI); }
  			  if (npckey === "Melee") { newnpc.setMeleeAttackAs(loadnpcs[npci].Melee); }
    			if (npckey === "Missile") { newnpc.setMissileAttackAs(loadnpcs[npci].Missile); }
    			if (npckey === "Conversation") { newnpc.setConversation(loadnpcs[npci].Conversation); }
  	  		if (npckey === "ConversationFlag") { newnpc.setConversationFlag(loadnpcs[npci].ConversationFlag); }
  		  	if (npckey === "Gender") { newnpc.setGender(loadnpcs[npci].Gender); }
  			  if (npckey === "Merch") { newnpc.setMerch(loadnpcs[npci].Merch); }
  			  if (npckey === "Leash") { newnpc.setLeash(loadnpcs[npci].Leash); }
  			  if (npckey === "BarkFreq") { newnpc.setBarkFreq(loadnpcs[npci].BarkFreq); }
  			  if (npckey === "Bark") { newnpc.setBark(loadnpcs[npci].Bark); }
  			  if (npckey === "BarkRad") { newnpc.setBarkRad(loadnpcs[npci].BarkRad); }
  			  if (npckey === "NPCBand") { newnpc.setNPCBand(loadnpcs[npci].NPCBand); }
  			  if (npckey === "OverrideGraphic") { newnpc.overrideGraphic = loadnpcs[npci].OverrideGraphic; }
    		}
    		this.placeThing(loadnpcs[npci].x,loadnpcs[npci].y,newnpc);
  	  }
    }
  }
  if(typeof mappages[name]["onload"] === "function") {
    mappages[name]["onload"](this);
  }
  
  return;
}

GameMap.prototype.setNoiseSource = function(noisesource, noise, radius) {
  var noiseobj = { source: noisesource, sound: noise, radius: radius };
  this.noiseSources.push(noiseobj);
}

GameMap.prototype.getAmbientNoise = function(wherex,wherey) {
  // working here
}

GameMap.prototype.setMapLight = function(lightsource,light,x,y) {
  if (this.getLightLevel() === "bright") { return; }
  var serial = lightsource.getSerial();
//  if (debug && debugflags.light) { dbs.writeln("LIGHT: " + lightsource.getHomeMap().getName() + ", " + serial + ", " + light + ", " + x + ", " + y + "<br />"); }
  DebugWrite("light", "LIGHT: " + lightsource.getHomeMap().getName() + ", " + serial + ", " + light + ", " + x + ", " + y + "<br />");
	for (var i = (x-(Math.ceil(Math.abs(light))+1)); i<=(x+(Math.ceil(Math.abs(light))+1)); i++) {
		for (var j = (y-(Math.ceil(Math.abs(light))+1)); j<=(y+(Math.ceil(Math.abs(light))+1)); j++) {
			if (this.getTile(i,j) === "OoB") { continue; }
			var block = this.getTile(i,j).getBlocksLOS();
//      if (debug && debugflags.light) { dbs.writeln("<br />LIGHT " + serial + ": Checking shine on x:"+i+",y:"+j+", which blocks " + block + ".<br />"); }
      DebugWrite("light", "<br />LIGHT " + serial + ": Checking shine on x:"+i+",y:"+j+", which blocks " + block + ".<br />");
			if ((block > LOS_THRESHOLD) && (!lightsource.checkType("PC"))) {   
        var LOSval = this.getLOS(x,y,i,j,losgrid,0,1,1);
        if (LOSval > LOS_THRESHOLD) { LOSval = LOS_THRESHOLD; }
        var dist = Math.pow((Math.pow((x-i),2) + Math.pow((y-j),2)),(.5));
        var totlight = {};
//        if (debug && debugflags.light) {dbs.writeln("LOSVAL ne: " + LOSval.ne + ", nw: " + LOSval.nw + ", se: " + LOSval.se + ", sw: " + LOSval.sw + ".<br />"); }
        DebugWrite("light", "LOSVAL ne: " + LOSval.ne + ", nw: " + LOSval.nw + ", se: " + LOSval.se + ", sw: " + LOSval.sw + ".<br />");
        totlight.ne = (light + 1.5 - dist) * ( 1- (LOSval.ne / LOS_THRESHOLD) );
        if ((light >= 0) && (totlight.ne < 0)) { totlight.ne = 0; }
        totlight.nw = (light + 1.5 - dist) * ( 1- (LOSval.nw / LOS_THRESHOLD) );
        if ((light >= 0) && (totlight.nw < 0)) { totlight.nw = 0; }
        totlight.se = (light + 1.5 - dist) * ( 1- (LOSval.se / LOS_THRESHOLD));
        if ((light >= 0) && (totlight.se < 0)) { totlight.se = 0; }
        totlight.sw = (light + 1.5 - dist) * ( 1- (LOSval.sw / LOS_THRESHOLD) );
        if ((light >= 0) && (totlight.sw < 0)) { totlight.sw = 0; }
        totlight.center = (light + 1.5 - dist) * ( 1- (LOSval.center / LOS_THRESHOLD) );
        if ((light >= 0) && (totlight.center < 0)) { totlight.center = 0; }
        if ((totlight.ne > 0) || (totlight.nw > 0) || (totlight.se > 0) || (totlight.sw > 0)) {
          this.getTile(i,j).addLocalLight(lightsource,totlight,this);
        }
			} else {
        var LOSval = this.getLOS(x,y,i,j,losgrid,0,0,1);
        if (LOSval > LOS_THRESHOLD) { LOSval = LOS_THRESHOLD; }
        var dist = Math.pow((Math.pow((x-i),2) + Math.pow((y-j),2)),(.5));
        var totlight = {};
        totlight.center = (light + 1.5 - dist) * ( 1- (LOSval / LOS_THRESHOLD) );
        if ((light >= 0) && (totlight.center < 0)) { totlight.center = 0; }
        if ((lightsource.checkType("PC")) && (block > LOS_THRESHOLD)) {
          totlight.ne = totlight.center;
          totlight.se = totlight.center;
          totlight.sw = totlight.center;
          totlight.nw = totlight.center;
        }
        if (totlight.center > 0) { 
          this.getTile(i,j).addLocalLight(lightsource,totlight,this);
        }
			}
			if (block > LOS_THRESHOLD) {
//			  if (debug && debugflags.light) {dbs.writeln("LIGHT " + serial + ": LOSval was (center:" + LOSval.center + ", nw:" + LOSval.nw + ", ne:" + LOSval.ne + ", sw:" + LOSval.sw + ", se:" + LOSval.se + "), light values: center=" + totlight.center + ", ne=" + totlight.ne + ", nw=" + totlight.nw + ", se=" + totlight.se + ", sw=" +totlight.sw + ".<br />"); }
			  DebugWrite("light", "LIGHT " + serial + ": LOSval was (center:" + LOSval.center + ", nw:" + LOSval.nw + ", ne:" + LOSval.ne + ", sw:" + LOSval.sw + ", se:" + LOSval.se + "), light values: center=" + totlight.center + ", ne=" + totlight.ne + ", nw=" + totlight.nw + ", se=" + totlight.se + ", sw=" +totlight.sw + ".<br />");
			} else {
//			  if (debug && debugflags.light) {dbs.writeln("LIGHT " + serial + ": LOSval was " + LOSval + ", light values: center=" + totlight.center + ", ne=" + totlight.ne + ", nw=" + totlight.nw + ", se=" + totlight.se + ", sw=" +totlight.sw + ".<br />"); }
			  DebugWrite("light", "LIGHT " + serial + ": LOSval was " + LOSval + ", light values: center=" + totlight.center + ", ne=" + totlight.ne + ", nw=" + totlight.nw + ", se=" + totlight.se + ", sw=" +totlight.sw + ".<br />");
			}
		}
	}
}

GameMap.prototype.removeMapLight = function(serial,light,x,y) {
	for (var i = (x-(Math.ceil(Math.abs(light))+1)); i<=(x+(Math.ceil(Math.abs(light))+1)); i++) {
		for (var j = (y-(Math.ceil(Math.abs(light))+1)); j<=(y+(Math.ceil(Math.abs(light))+1)); j++) {
			if (this.getTile(i,j) !== "OoB") { 
			  this.getTile(i,j).removeLocalLight(serial);
			}
		}
	}
}

GameMap.prototype.getLOE = function(x1,y1,x2,y2,losgrid) {
  return genLOS(x1,y1,x2,y2,losgrid,"center","center",this, 1, 0);
}

GameMap.prototype.getLOS = function(x1,y1,x2,y2,losgrid, useloe, checklight, checkforlight) {
//  if (debug) { dbs.writeln("<span style='color:grey;font-style:italic'>&nbsp;Getting LOS between " + x1 + ", " + y1 + " and " + x2 +", " + y2 + ".<br /></span>");  }
  // checklight = 0, check is for LOS only or light on an object that does not block LOS or the light source is the PC
  // checklight = 1, check is for light on an object that does block LOS
  
  // checkforlight is a universal "is this check on the behalf of light", since the previous variable is insufficient for
  // that and adding this was easier than refactoring
  
	var trueLOS = 100;
	var totalLOS = 0;
	var quartersLOS = {};

 	quartersLOS.nw = 100;
  quartersLOS.ne = 100;
  quartersLOS.sw = 100;
  quartersLOS.se = 100;
  quartersLOS.center = 100;

  if (( (x2-x1) === 0) && ( (y2-y1) === 0)) {
//    if (debug && (debugflags.map || debugflags.light)) { dbs.writeln("<span style='color:grey;font-style:italic'>&nbsp;Own tile, returning 0.<br /></span>");  }
    DebugWrite("light", "&nbsp;Own tile, returning 0.<br />");
    if (checklight) {
      quartersLOS.nw = 0;
      quartersLOS.ne = 0;
      quartersLOS.se = 0;
      quartersLOS.sw = 0;
      quartersLOS.center = 0;
      return quartersLOS;
    }
    return 0;
  } else if (( (x2-x1) === 0) && ( (y2-y1) < 0)) {  // north line
    totalLOS = genLOS(x1,y1,x2,y2,losgrid,"center","center",this, useloe, checklight);

		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else { return totalLOS; }		   
		}
  } else if (( (x2-x1) > 0) && ( (y2-y1) < 0)) { // NE quadrant
		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","sw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
		  totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","nw",this, useloe, checklight);
		} else {
		  // look at the sw of the tile above rather than the nw of the dest tile so the dest tile's 
		  // effect on los is calculated. The same is true everywhere else in this function that 
		  // I split the totalLOS check in two.
		  totalLOS = genLOS(x1,y1,x2,y2-1,losgrid,"ne","sw",this, useloe, checklight);
		}
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","se",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2+1,y2,losgrid,"ne","sw",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    
		
		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","sw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","nw",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2,y2-1,losgrid,"nw","sw",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","se",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2+1,y2,losgrid,"nw","sw",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","sw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","nw",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2,y2-1,losgrid,"se","sw",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","se",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2+1,y2,losgrid,"se","sw",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

  } else if (( (x2-x1) > 0) && ( (y2-y1) === 0)) {  // east line
    totalLOS = genLOS(x1,y1,x2,y2,losgrid,"center","center",this, useloe, checklight);

		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else { return totalLOS; }		   
		}    
  } else if (( (x2-x1) > 0) && ( (y2-y1) > 0)) { // SE quadrant
    if (!checklight) {
		  totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","sw",this, useloe, checklight);
		} else {
		  totalLOS = genLOS(x1,y1,x2,y2+1,losgrid,"se","nw",this, useloe, checklight);
		}
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","nw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","ne",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2+1,y2,losgrid,"se","nw",this, useloe, checklight);
    }
		if  (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    
		
		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","sw",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2,y2+1,losgrid,"sw","nw",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","nw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","ne",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2+1,y2,losgrid,"sw","nw",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","sw",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2,y2+1,losgrid,"ne","nw",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","nw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","ne",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2+1,y2,losgrid,"ne","nw",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

  } else if (( (x2-x1) === 0) && ( (y2-y1) > 0)) {  // south line
    totalLOS = genLOS(x1,y1,x2,y2,losgrid,"center","center",this, useloe, checklight);

		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else { return totalLOS; }		   
		}    
  } else if (( (x2-x1) < 0) && ( (y2-y1) > 0)) { // SW quadrant
		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","ne",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","nw",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2-1,y2,losgrid,"sw","ne",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","se",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2,y2+1,losgrid,"sw","ne",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    
		
		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","ne",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","nw",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2-1,y2,losgrid,"nw","ne",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","se",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2,y2+1,losgrid,"nw","ne",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","ne",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","nw",this, useloe, checklight);
    } else  {
      totalLOS = genLOS(x1,y1,x2-1,y2,losgrid,"se","ne",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"se","se",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2,y2+1,losgrid,"se","ne",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

  } else if (( (x2-x1) < 0) && ( (y2-y1) === 0)) {  // west line
    totalLOS = genLOS(x1,y1,x2,y2,losgrid,"center","center",this, useloe, checklight);

		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else { return totalLOS; }		   
		}    
  } else if (( (x2-x1) < 0) && ( (y2-y1) < 0)) { // NW quadrant
    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","ne",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2,y2-1,losgrid,"sw","se",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","sw",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2-1,y2,losgrid,"sw","se",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"sw","se",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    
		
    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","ne",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2,y2-1,losgrid,"nw","se",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","sw",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2-1,y2,losgrid,"nw","se",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"nw","se",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","ne",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2,y2-1,losgrid,"ne","se",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","sw",this, useloe, checklight);
    } else {
      totalLOS = genLOS(x1,y1,x2-1,y2,losgrid,"ne","se",this, useloe, checklight);
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,losgrid,"ne","se",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

  }
  if (checklight) { return quartersLOS; }	
	
  return trueLOS;
}

function genLOS(x1,y1,x2,y2,losgrid,startsection,endsection,losmap, useloe, allin) {
	  var LOSes = losgrid.getLOS(x1,y1,x2,y2,startsection,endsection);
	  var totalLOS = 0;
	  if (LOSes[0]) {
	  	for (var i = 0; i < LOSes.length; i++ ){
	  		var passx = parseInt(x1) + parseInt(LOSes[i].x);
	  		var passy = parseInt(y1) + parseInt(LOSes[i].y);
	  		var location = losmap.getTile(passx,passy);
	  		var dist = Math.sqrt(Math.pow((passx - x1), 2) + Math.pow((passy - y1),2));
	  		if (useloe) {
	  		  var block = location.getBlocksLOE(dist);
	  		  if (allin && (block >= 1) && ((LOSes[i].coeff * block) > .05) ) { return 1; }
	  		  totalLOS += LOSes[i].coeff * block;
	  		} else {
	  		  var block = location.getBlocksLOS(dist);
	  		  if (allin && (block >= 1) && ((LOSes[i].coeff * block) > .05) ) { return 1; }
	  		  totalLOS += LOSes[i].coeff * block;
	  		}
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

  this["test"] = {};
  this["test"].terrain = [];
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

  this.data = {};

}

Platonic.prototype.getForm = function (name) {

  if (this.data[name]) {
    return this.data[name];
  }
  else {
//    if (debug && debugflags.map) {
//      dbs.writeln("((Adding " + name + " to the platonic forms.))<br />");
//    }
    DebugWrite("map", "((Adding " + name + " to the platonic forms.))<br />");

    this.data[name] = localFactory.createTile(name);
    return this.data[name];
  }

}

function MapMemory() {
  this.data = {};	
}

MapMemory.prototype.addMap = function(mapname) {
	var newmap = new GameMap();
	newmap.loadMap(mapname);
	
	this.addMapByRef(newmap);

//	this.data[mapname] = newmap;
	
	// also load any linked maps
//	if (newmap.linkedMaps[0] && newmap.linkedMaps[0] != "") {
//		for (var i = 0; i < newmap.linkedMaps.length; i++) {
//			var anothermap = new GameMap();
//			anothermap.loadMap(newmap.linkedMaps[i]);
//			this.data[newmap.linkedMaps[i]] = anothermap;
//		}
//	}
	
	return newmap;
}

MapMemory.prototype.addMapByRef = function(mapref) {
	var mapname = mapref.getName();
	this.data[mapname] = mapref;
	
	// also load linked maps
	if (gamestate.getMode() !== "loadgame") {  // but only if not loading- on load they are in the saved game
  	if (mapref.linkedMaps[0] && mapref.linkedMaps[0] !== "") {
	    for (var i = 0; i < mapref.linkedMaps.length; i++) {
	      var anothermap = new GameMap();
	      anothermap.loadMap(mapref.linkedMaps[i]);
  	    this.data[mapref.linkedMaps[i]] = anothermap;
	    }
	  }
	}
	
	return mapref;
}

MapMemory.prototype.deleteMap = function(mapname) {
  var negated = DU.gameflags.getFlag("negate");
	if (this.data[mapname].linkedMaps[0] && this.data[mapname].linkedMaps[0] !== "") {
		for (var i = 0; i < this.data[mapname].linkedMaps.length; i++) {
			delete this.data[this.data[mapname].linkedMaps[i]];
			// also stop tracking that magic is negated on this map
			delete negated[this.data[mapname].linkedMaps[i]];   
//			if (debug && debugflags.map) { dbs.writeln("<span style='color:brown; font-style:italic'>Deleting map " + this.data[mapname].linkedMaps[i] + ".</span><br />"); }	
			DebugWrite("map", "* Deleting map " + this.data[mapname].linkedMaps[i] + ".</span><br />");
		}
	}
	delete this.data[mapname];
	delete negated[mapname];
	DU.gameflags.setFlag("negate", negated);
	if (debug && debugflags.map) {
//	  dbs.writeln("<span style='color:brown; font-style:italic'>Remaining maps: "); 
	  DebugWrite("map", "Remaining maps: ");
	  $.each(this.data, function(idx,val) {
//	    dbs.writeln(idx + ", "); 
	    DebugWrite("map", idx + ", ");
	  });
//	  dbs.writeln(".</span><br />");
	  DebugWrite("map", ".</span><br />");
	}
	
}

MapMemory.prototype.getMap = function(mapname) {
	if (this.data[mapname]) { return this.data[mapname]; }
	else { return undefined; }
}

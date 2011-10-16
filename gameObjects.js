

function GameObject() {
  this.x;
  this.y;
  
  this.serial = GetSerial();
  this.type = "XGameObjectX";
}
GameObject.prototype = new Object;

GameObject.prototype.getSerial = function() {
	return this.serial;
}

GameObject.prototype.getx = function() {
	return parseInt(this.x,10);
}

GameObject.prototype.setx = function(x) {
	if (parseInt(x) == "NaN") { alert("X being set to a string."); }
  this.x = parseInt(x,10);
}

GameObject.prototype.gety = function() {
	return parseInt(this.y,10);
}

GameObject.prototype.sety = function(y) {
	if (parseInt(y) == "NaN") { alert("Y being set to a string."); }
  this.y = parseInt(y,10);
}

GameObject.prototype.setHomeMap = function(mapref) {
  this.homeMap = mapref;
  return this.homeMap;
}

GameObject.prototype.getHomeMap = function() {
  return this.homeMap;
}

GameObject.prototype.setType = function(type) {
	this.type = type;
}

GameObject.prototype.getType = function() {
	return this.type;
}

GameObject.prototype.addType = function(type) {
  this.type = this.type + "X" + type + "X";
}

GameObject.prototype.checkType = function(type) {
  var patt = new RegExp("X"+type+"X");
  if (patt.test(this.type)) {
    return 1;
  } else { return 0; }
}

GameObject.prototype.getTypeForMap = function() {
  // run check for npc, pc, and feature
  var patt = new RegExp("XFeatureX");
  if (patt.test(this.type)) {
    return ("feature");
  }
  patt = new RegExp("XpcX");
  if (patt.test(this.type)) {
    return ("pc");
  }
  patt = new RegExp("XnpcX");
  if (patt.test(this.type)) {
    return ("npc");
  }
  return;
}

GameObject.prototype.setDesc = function(newdesc) {
	this.desc = newdesc;
}

GameObject.prototype.getDesc = function() {
	return this.desc;
}

GameObject.prototype.setPrefix = function(newpref) {
	this.prefix = newpref;
}

GameObject.prototype.getPrefix = function() {
  if (this.prefix) {
	  return this.prefix;
	} else {
	  return "";
	}
}

GameObject.prototype.getName = function() {
	return this.name;
}

GameObject.prototype.moveTo = function(x,y) {
	this.homeMap.moveThing(this,x,y)
}

GameObject.prototype.bumpinto = function(who) {
	var retval = new Object;
	retval["canmove"] = 1;
	retval["msg"] = "";
  return(retval);
}

GameObject.prototype.copy = function(type) {
  if (type == "clean") {
    var tilename = this.name;
    var minifactory = new tileFactory;
    return tileFactory.createTile(tilename);
  }
  // add full version when I need it
  return(0);
}

GameObject.prototype.setGraphic = function(newgraphic) {
	this.graphic = newgraphic;
}

GameObject.prototype.setGraphicArray = function(newgraphics) {
	this.graphic = newgraphics[0];
	this.overlay = newgraphics[1];
	this.spritexoffset = newgraphics[2];
	this.spriteyoffset = newgraphics[3];
}

GameObject.prototype.getGraphic = function() {
	var returnGraphic = this.graphic;

  if (returnGraphic) { return(returnGraphic); }
}

GameObject.prototype.getGraphicArray = function() {
	var returnGraphic = this.graphic;
  var returnOverlay = this.overlay;
  var returnVars = new Array;
  returnVars[0] = returnGraphic;
  if (returnOverlay) {
    returnVars[1] = returnOverlay;
  }
  else {
  	returnVars[1] = "spacer.gif";
  }
  if (this.spritexoffset) {
    returnVars[2] = this.spritexoffset;
    returnVars[3] = this.spriteyoffset;
  }
  else {
  	returnVars[2] = 0;
  	returnVars[3] = 0;
  }
  return(returnVars); 
}

GameObject.prototype.setOverlay = function(newgraphic) {
	this.overlay = newgraphic;
}

GameObject.prototype.getOverlay = function() {
	var returnOverlay = this.overlay;

  if (returnOverlay) { return(returnOverlay); }
}

GameObject.prototype.getBlocksLOS = function(distance) {
  if (this.losatdistance) {
    if (distance > this.losatdistance["distance"]) { return(this.losatdistance["blocklos"]) }
  }
  if (this.losupclose) {
  	if (distance <= this.losupclose["distance"]) { return(this.losupclose["blocklos"]) }
  }
  return (this.blocklos);
}

GameObject.prototype.getBlocksLOSArray = function() {
	var LOSref = new Array;
	LOSref[0] = this.blocklos;
	if (this.losatdistance){
		LOSref[1] = this.losatdistance['distance'];
		LOSref[2] = this.losatdistance['blocklos'];
	}
	if (this.losupclose) {
		LOSref[3] = this.losupclose['distance'];
		LOSref[4] = this.losupclose['blocklos'];
	}
	
	return LOSref;
}

GameObject.prototype.setBlocksLOSArray = function(newLOS) {
	this.blocklos = newLOS[0];
	if (typeof newLOS[1] != "undefined") {
		this.losatdistance['distance'] = newLOS[1];
		this.losatdistance['blocklos'] = newLOS[2];
	}
	if (typeof newLOS[3] != "undefined") {
		this.losupclose['distance'] = newLOS[3];
		this.losupclose['blocklos'] = newLOS[4];
	}
}

GameObject.prototype.getPassable = function() {
	return this.passable;
}

GameObject.prototype.setPassable = function(movetype) {
	this.passable = movetype;
	return this.passable;
}

GameObject.prototype.removePassable = function(movetype) {
	this.passable = this.passable & ~movetype;
	return this.passable;
}

GameObject.prototype.addPassable = function(movetype) {
	this.passable = this.passable | movetype;
	return this.passable;
}

GameObject.prototype.passable = function(movetype) {
  var Passability = new Object;
  if ((movetype & this.getPassable()) != "0") {
    Passability.validmove = 1;
    return(Passability);
  }
  Passability.validmove = 0;
  if (this.movementerrmeg) { Passability.errmsg = this.movementerrmsg; }
  else { Passability.errmsg = "Movement blocked!"; }
  return(Passability);
}

// These below are abstract classes, to be used only in JS's halfassed
// version of multiple inheritance. 

// Abstract class Lockable
function Lockable(unlockedgraphic, lockedgraphic, maglockedgraphic, unlockeddesc, lockeddesc, maglockeddesc) {
	this.locked = 0;
	this.lockedgraphics = new Array(unlockedgraphic, lockedgraphic, maglockedgraphic);
	this.lockeddescs = new Array(unlockeddesc, lockeddesc, maglockeddesc);
	
	this.setLocked = function(lock) { this.locked = lock; }
	this.getLocked = function() { return this.locked; }
	this.lockMe = function(lock) {
		this.setLocked(lock);
		this.setOverlay(this.lockedgraphics[lock]);
		this.setDesc(this.lockeddescs[lock]);
	}
	this.unlockMe = function() { this.lockMe(0); }
}

// Abstract class Enterable
function Enterable(entermap, enterx, entery) {
	this.entermap = entermap;
	this.enterx = enterx;
	this.entery = entery;
	this.klimb = "";
	this.descend = "";
	
	this.enter = function() {}
  this.setEnterMap = function(entermap, x, y) {
  	this.entermap = entermap;
  	this.enterx = x;
  	this.entery = y;
  }
  this.getEnterMap = function() {
  	var mapdata = { entermap : this.entermap , enterx : this.enterx, entery : this.entery };
  	return mapdata;
  }
  this.getKlimb = function() {
  	return this.klimb;
  }
  this.getDescend = function() {
  	return this.descend;
  }
}

// Abstract class Light Emitting
function LightEmitting(lightlevel) {
	this.light = lightlevel;
	this.ignite = function() {
		this.light = lightlevel;
	}
	this.extinguish = function() {
		this.light = 0;
	}
	this.setLight = function(light) {
		this.light = light;
	}
	this.getLight = function() {
		return this.light;
	}
}

// Abstract class Openable
function Openable(closedgraphic, opengraphic, startsopen) {
	this.open = startsopen;
	
	this.closedLOS = new Array;
	this.closedgraphic = closedgraphic;
	this.opengraphic = opengraphic;
	// NOTE: These should be arrays in the standard graphics[0-3] style.
	
	this.useScript = function(who) {
		var retval = new Object;
		retval["fin"] = 0;
		if (this.open == 1) {
			this.setGraphicArray(closedgraphic);
			
			this.setBlocksLOSArray(this.closedLOS);
			this.closedLOS = new Array;
			
			this.removePassable(MOVE_WALK);
			
			retval["fin"] = 1;
			retval["txt"] = "Closed!";
			
			this.open = 0;
		} else {
			if (typeof this.getLocked == "function") {
				if (this.getLocked()) {
					retval["fin"] = 1;
					retval["txt"] = "Locked.";
					return retval;
				}
			}
			this.setGraphicArray(opengraphic);
			
			this.closedLOS = this.getBlocksLOSArray();
			var seethru = new Array;
			seethru[0] = 0;
			this.setBlocksLOSArray(seethru);
			
			this.addPassable(MOVE_WALK);
			
			retval["fin"] = 1;
			retval["txt"] = "Opened!";
			this.open = 1;
		}
		return retval;
	}
	
}

// Abstract class Tiling
function Tiling(tileval) {
	this.doTile = function(tilingx,tilingy,tilegraphic) {
		tilingx = (tilingx % tileval); 
		tilingy = (tilingy % tileval);
		var foo = tilegraphic.split('.');
	  return(foo[0] + "-" + tilingy + tilingx + "." + foo[1]);
	}
}

// General func 
function SetByBelow() {
	this.setByBelow = function(x,y,themap) {
		var localacre = themap.getTile(x,y);
		var graphic = localacre.terrain.getGraphicArray();
		return (graphic[0]);
	};
}

// General func
function SetBySurround() {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
		var cardinal_dash = "";
		var north = 0;
		var south = 0;
		var east = 0;
		var west = 0;
		var vis = 0;

  	var addtoname_cardinal = "";
	  if ((themap.getTile(x,y+1) != "OoB") && (themap.getTile(x,y+1).terrain.getName() == "CaveFloor") && ((checklos == 0) || (themap.getLOS(fromx,fromy,x,y+1,losgrid) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "n"; north = 1; vis = 1;}
	  if ((themap.getTile(x,y+1) != "OoB") && (themap.getTile(x,y+1).terrain.getName() == "CaveFloor")) { north = 1; }
  	if ((themap.getTile(x,y-1) != "OoB") && (themap.getTile(x,y-1).terrain.getName() == "CaveFloor") && ((checklos == 0) || (themap.getLOS(fromx,fromy,x,y-1,losgrid) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "s"; south = 1; vis = 1;}
  	if ((themap.getTile(x,y-1) != "OoB") && (themap.getTile(x,y-1).terrain.getName() == "CaveFloor")) { south = 1; }
	  if ((themap.getTile(x-1,y) != "OoB") && (themap.getTile(x-1,y).terrain.getName() == "CaveFloor") && ((checklos == 0) || (themap.getLOS(fromx,fromy,x-1,y,losgrid) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "e"; east = 1; vis = 1;}
	  if ((themap.getTile(x-1,y) != "OoB") && (themap.getTile(x-1,y).terrain.getName() == "CaveFloor")) { east = 1; }
  	if ((themap.getTile(x+1,y) != "OoB") && (themap.getTile(x+1,y).terrain.getName() == "CaveFloor") && ((checklos == 0) || (themap.getLOS(fromx,fromy,x+1,y,losgrid) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "w"; west = 1; vis = 1;}
  	if ((themap.getTile(x+1,y) != "OoB") && (themap.getTile(x+1,y).terrain.getName() == "CaveFloor")) { west = 1; }
		
	  var diagonal_dash = "";
	  var addtoname_diagonal = "";
	 	if ((themap.getTile(x+1,y-1) != "OoB") && (themap.getTile(x+1,y-1).terrain.getName() == "CaveFloor") && (south == 0) && (west == 0) && ((checklos == 0) || (themap.getLOS(fromx,fromy,x+1,y-1,losgrid) < LOS_THRESHOLD) ))
	 	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "a"; vis = 1; }
  	if ((themap.getTile(x+1,y+1) != "OoB") && (themap.getTile(x+1,y+1).terrain.getName() == "CaveFloor") && (north == 0) && (west == 0) && ((checklos == 0) || (themap.getLOS(fromx,fromy,x+1,y+1,losgrid) < LOS_THRESHOLD) )) 
  	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "b"; vis = 1; }
	  if ((themap.getTile(x-1,y+1) != "OoB") && (themap.getTile(x-1,y+1).terrain.getName() == "CaveFloor") && (north == 0) && (east == 0) && ((checklos == 0) || (themap.getLOS(fromx,fromy,x-1,y+1,losgrid) < LOS_THRESHOLD) ))
	    { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "c"; vis = 1;}
	 	if ((themap.getTile(x-1,y-1) != "OoB") && (themap.getTile(x-1,y-1).terrain.getName() == "CaveFloor") && (south == 0) && (east == 0) && ((checklos == 0) || (themap.getLOS(fromx,fromy,x-1,y-1,losgrid) < LOS_THRESHOLD) )) 
	 	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "d"; vis = 1; }
	
	  var foo = graphics[0].split('.');
	  graphics[0] = foo[0] + cardinal_dash + addtoname_cardinal + diagonal_dash + addtoname_diagonal + '.' + foo[1];
	  if (vis == 0) { 
	  	var black = localFactory.createTile('BlankBlack');
	  	var blkgraphics = black.getGraphicArray();
	  	graphics[0] = blkgraphics[0];
	  }
	  if (graphics[0].indexOf("-nsew") != -1) { this.setBlockLOS(.5); }
	  return (graphics);
  }
}

// General func
function SetBySurroundCoast() {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
		if (losresult >= LOS_THRESHOLD) {
			var displaytile = localFactory.createTile('BlankBlack');
			var displaygraphic = displaytile.getGraphicArray();
			return displaygraphic;
		}
    var ocean;
    var water;
    var shallow;
    var localacre = themap.getTile(x,y-1);
    var tile; 
    if (localacre != "OoB") {
    	tile = localacre.terrain;
    	if (tile.getName() == "Ocean") { ocean = tile; }
    	if (tile.getName() == "Water") { water = tile; }
    	if (tile.getName() == "Shallows") { shallow = tile; }
    }
    localacre = themap.getTile(x,y+1);
    if (localacre != "OoB") {
    	tile = localacre.terrain;
    	if (tile.getName() == "Ocean") { ocean = tile; }
    	if (tile.getName() == "Water") { water = tile; }
    	if (tile.getName() == "Shallows") { shallow = tile;; }
    }
    localacre = themap.getTile(x+1,y);
    if (localacre != "OoB") {
    	tile = localacre.terrain;
    	if (tile.getName() == "Ocean") { ocean = tile; }
    	if (tile.getName() == "Water") { water = tile; }
    	if (tile.getName() == "Shallows") { shallow = tile; }
    }
    localacre = themap.getTile(x-1,y);
    if (localacre != "OoB") {
    	tile = localacre.terrain;
    	if (tile.getName() == "Ocean") { ocean = tile; }
    	if (tile.getName() == "Water") { water = tile; }
    	if (tile.getName() == "Shallows") { shallow = tile; }
    }
    var chosentile;
    if (shallow) { chosentile = shallow; }
    else if (water) { chosentile = water; }
    else if (ocean) { chosentile = ocean; }
    else { return graphics; }
    
    var chosengraphics = chosentile.getGraphicArray();
    graphics[0] = chosengraphics[0];
    graphics[2] = chosengraphics[2];
    graphics[3] = chosengraphics[3];
    return graphics;
  }
}

// General func
function SetBySurroundRoad() {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
		if (losresult >= LOS_THRESHOLD) {
			var displaytile = localFactory.createTile('BlankBlack');
			var displaygraphic = displaytile.getGraphicArray();
			return displaygraphic;
		}

    var suffix = "";
	  var localacre = themap.getTile(x+1,y);
	  if (localacre != "OoB") {
	  	var tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") != -1) { suffix = suffix + "e"; }
	  }	
	  localacre = themap.getTile(x-1,y);
	  if (localacre != "OoB") {
	  	var tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") != -1) { suffix = suffix + "w"; }
	  }	
	  localacre = themap.getTile(x,y-1);
	  if (localacre != "OoB") {
	  	var tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") != -1) { suffix = suffix + "n"; }
	  }	
	  localacre = themap.getTile(x,y+1);
	  if (localacre != "OoB") {
	  	var tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") != -1) { suffix = suffix + "s"; }
	  }	
	  if ((suffix == "ewns") || (suffix == "")) { suffix = "x"; }
	  if ((suffix == "e") || (suffix == "w")) { suffix = "ew"; }
	  if ((suffix == "n") || (suffix == "s")) { suffix = "ns"; }
	  graphics[0] = "road-" + suffix + ".gif";
		return graphics;
	}
}

// General func
function SetBySurroundRiver() {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
		if (losresult >= LOS_THRESHOLD) {
			var displaytile = localFactory.createTile('BlankBlack');
			var displaygraphic = displaytile.getGraphicArray();
			return displaygraphic;
		}

		var north;
		var south;
		var east;
		var west;
		var northacre = themap.getTile(x,y-1);
		northtile = northacre.terrain;
		if (northacre != "OoB") {
			if (IsWet(northtile)) {
				north = 1;
			}
		}
		var southacre = themap.getTile(x,y+1);
		var southtile = southacre.terrain;
		if (southacre != "OoB") {
			if (IsWet(southtile)) {
				south = 1;
			}
		}
		var eastacre = themap.getTile(x+1,y);
		var easttile = eastacre.terrain;
		if (eastacre != "OoB") {
			if (IsWet(easttile)) {
				east = 1;
			}
		}
		var westacre = themap.getTile(x-1,y);
		var westtile = westacre.terrain;
		if (westacre != "OoB") {
			if (IsWet(westtile)) {
				west = 1;
			}
		}
		if ((north == 1) && (south == 1) && (east == 1) && (west == 1)) {
			// this shouldn't happen, if it does I need to draw a + river piece
			graphics[1] = "spacer.gif";
		} else if ((north == 1) && (east == 1) && (south == 1)) {
			graphics[1] = "riverTright.gif";
		} else if ((north == 1) && (west == 1) && (south == 1)) {
			graphics[1] = "riverTleft.gif";
		} else if ((north == 1) && (east == 1) && (west == 1)) {
			graphics[1] = "riverTtop.gif";
		} else if ((south == 1) && (east == 1) && (west == 1)) {
			graphics[1] = "riverTbottom.gif";
		} else if ((east == 1) && (west == 1)) {
			graphics[1] = "riverew.gif";
		} else if ((north == 1) && (south == 1)) {
			graphics[1] = "riverns.gif";
		} else if ((north == 1) && (east == 1)) {
			graphics[1] = "riverne.gif";
		} else if ((north == 1) && (west == 1)) {
			graphics[1] = "rivernw.gif";
		} else if ((south == 1) && (east == 1)) {
			graphics[1] = "riverse.gif";
		} else if ((south == 1) && (west == 1)) {
			graphics[1] = "riversw.gif";
		} else if (north == 1) {
			graphics[1] = "riversources.gif";
		} else if (east == 1) {
			graphics[1] = "riversourcew.gif";
		} else if (west == 1) {
			graphics[1] = "riversourcee.gif";
		} else if (south == 1) {
			graphics[1] = "riversourcen.gif";
		}
		return graphics;
	}
}

// General func
function IsWet(tile) {
	if (tile.getName() == "Ocean") { return 1; }
	if (tile.getName() == "Water") { return 1; }
	if (tile.getName() == "Shallows") { return 1; }
	if (tile.getName() == "River") { return 1; }
	return 0;
}
// end multiple inheritance

function InanimateObject() {
  this.initdelay = 1;  // multiplicative
  this.walkonscript = "";
  
  this.addType("InanimateObject");
}

InanimateObject.prototype = new GameObject;

InanimateObject.prototype.getWalkOnScript = function() {
	return this.walkonscript;
}

InanimateObject.prototype.setWalkOnScript = function(newscript) {
	this.walkonscript = newscript;
}

InanimateObject.prototype.walkon = function() {
  return(1);
}

InanimateObject.prototype.leave = function() {
  return(1);
}

InanimateObject.prototype.idle = function() {
  return(0);
}

InanimateObject.prototype.use = function() {
  return(0);
}

InanimateObject.prototype.getInitDelay = function() {
	return this.initdelay;
}

InanimateObject.prototype.setInitDelay = function(newdelay) {
	this.initdelay = newdelay;
	return this.initdelay;
}

// And now, on with the show!
// TERRAIN

function TerrainObject() {
  this.addType("Terrain");
  this.combatmap = "";
}

TerrainObject.prototype = new InanimateObject;

TerrainObject.prototype.serialize = function() {
  var name = this.name;
  var myatlas = new Atlas();
  var code = myatlas.keylookup(name);
  if (code) { return(code); }
  return(0);
}

TerrainObject.prototype.getCombatMap = function() {
  var mapname = this.combatmap;
  if (this.mapnameoptions > 1) {
    var randomnumber=Math.floor(Math.random()*this.mapnameoptions)+1;
    mapname = mapname + randomnumber;
  }
  return mapname;
}

TerrainObject.prototype.setCombatMap = function(map) {
  this.combatmap = map;
  return this.combatmap;
}

TerrainObject.prototype.setCombatMapOptions = function(mapnum) {
  this.combatmapoptions = mapnum;
  return this.combatmapoptions;
}


function BlankWhiteTile() {
  this.name = "BlankWhite";
  this.graphic = "000.gif";
  this.desc = "";
  this.blocklos = 1;
  this.passable = MOVE_ETHEREAL;
}
BlankWhiteTile.prototype = new TerrainObject;

function OceanTile() {
  this.name = "Ocean";
  this.graphic = "flowing_animations.gif";
  this.desc = "ocean";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL;
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
}
OceanTile.prototype = new TerrainObject;

function WaterTile() {
  this.name = "Water";
  this.graphic = "flowing_animations.gif";
  this.desc = "water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
}
WaterTile.prototype = new TerrainObject;

function ShallowsTile() {
  this.name = "Shallows";
  this.graphic = "flowing_animations.gif";
  this.desc = "shallow water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
}
ShallowsTile.prototype = new TerrainObject;

function MountainTile() {
  this.name = "Mountain";
  this.graphic = "004.gif";
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
}
MountainTile.prototype = new TerrainObject;

function StoneWallTile() {
  this.name = "StoneWall";
  this.graphic = "011.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone wall";
}
StoneWallTile.prototype = new TerrainObject;

function StoneTile() {
  this.name = "Stone";
  this.graphic = "013.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone";
}
StoneTile.prototype = new TerrainObject;

function DirtStoneTile() {
  this.name = "DirtStone";
  this.graphic = "dirt-rock.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone";
}
DirtStoneTile.prototype = new TerrainObject;

function MastTile() {
  this.name = "Mast";
  this.graphic = "014.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mast";
}
MastTile.prototype = new TerrainObject;

function RiggingTile() {
  this.name = "Rigging";
  this.graphic = "015.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "ship's rigging";
}
RiggingTile.prototype = new TerrainObject;

function PillarTile() {
  this.name = "Pillar";
  this.graphic = "016.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pillar";
}
PillarTile.prototype = new TerrainObject;

function FountainSWTile() {
  this.name = "FountainSW";
  this.graphic = "017.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fountain";
}
FountainSWTile.prototype = new TerrainObject;

function FountainSETile() {
  this.name = "FountainSE";
  this.graphic = "018.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fountain";
}
FountainSETile.prototype = new TerrainObject;

function FountainNWTile() {
  this.name = "FountainNW";
  this.graphic = "019.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fountain";
}
FountainNWTile.prototype = new TerrainObject;

function FountainNETile() {
  this.name = "FountainNE";
  this.graphic = "020.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fountain";
}
FountainNETile.prototype = new TerrainObject;

function LetterATile() {
  this.name = "LetterA";
  this.graphic = "025.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "A";
}
LetterATile.prototype = new TerrainObject;

function LetterBTile() {
  this.name = "LetterB";
  this.graphic = "026.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "B";
}
LetterBTile.prototype = new TerrainObject;

function LetterCTile() {
  this.name = "LetterC";
  this.graphic = "027.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "C";
}
LetterCTile.prototype = new TerrainObject;

function LetterDTile() {
  this.name = "LetterD";
  this.graphic = "028.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "D";
}
LetterDTile.prototype = new TerrainObject;

function LetterETile() {
  this.name = "LetterE";
  this.graphic = "029.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "E";
}
LetterETile.prototype = new TerrainObject;

function LetterFTile() {
  this.name = "LetterF";
  this.graphic = "030.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "F";
}
LetterFTile.prototype = new TerrainObject;

function LetterGTile() {
  this.name = "LetterG";
  this.graphic = "031.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "G";
}
LetterGTile.prototype = new TerrainObject;

function LetterHTile() {
  this.name = "LetterH";
  this.graphic = "032.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "H";
}
LetterHTile.prototype = new TerrainObject;

function LetterITile() {
  this.name = "LetterI";
  this.graphic = "033.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "I";
}
LetterITile.prototype = new TerrainObject;

function LetterJTile() {
  this.name = "LetterJ";
  this.graphic = "034.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "J";
}
LetterJTile.prototype = new TerrainObject;

function LetterKTile() {
  this.name = "LetterK";
  this.graphic = "035.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "K";
}
LetterKTile.prototype = new TerrainObject;

function LetterLTile() {
  this.name = "LetterL";
  this.graphic = "036.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "L";
}
LetterLTile.prototype = new TerrainObject;

function LetterMTile() {
  this.name = "LetterM";
  this.graphic = "037.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "M";
}
LetterMTile.prototype = new TerrainObject;

function LetterNTile() {
  this.name = "LetterN";
  this.graphic = "038.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "N";
}
LetterNTile.prototype = new TerrainObject;

function LetterOTile() {
  this.name = "LetterO";
  this.graphic = "039.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "O";
}
LetterOTile.prototype = new TerrainObject;

function LetterPTile() {
  this.name = "LetterP";
  this.graphic = "040.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "P";
}
LetterPTile.prototype = new TerrainObject;

function LetterQTile() {
  this.name = "LetterQ";
  this.graphic = "041.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "Q";
}
LetterQTile.prototype = new TerrainObject;

function LetterRTile() {
  this.name = "LetterR";
  this.graphic = "042.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "R";
}
LetterRTile.prototype = new TerrainObject;

function LetterSTile() {
  this.name = "LetterS";
  this.graphic = "043.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "S";
}
LetterSTile.prototype = new TerrainObject;

function LetterTTile() {
  this.name = "LetterT";
  this.graphic = "044.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "T";
}
LetterTTile.prototype = new TerrainObject;

function LetterUTile() {
  this.name = "LetterU";
  this.graphic = "045.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "U";
}
LetterUTile.prototype = new TerrainObject;

function LetterVTile() {
  this.name = "LetterV";
  this.graphic = "046.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "V";
}
LetterVTile.prototype = new TerrainObject;

function LetterWTile() {
  this.name = "LetterW";
  this.graphic = "047.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "W";
}
LetterWTile.prototype = new TerrainObject;

function LetterXTile() {
  this.name = "LetterX";
  this.graphic = "048.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "X";
}
LetterXTile.prototype = new TerrainObject;

function LetterYTile() {
  this.name = "LetterY";
  this.graphic = "049.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "Y";
}
LetterYTile.prototype = new TerrainObject;

function LetterZTile() {
  this.name = "LetterZ";
  this.graphic = "050.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "Z";
}
LetterZTile.prototype = new TerrainObject;

function HorizontalCounterTile() {
  this.name = "HorizontalCounter";
  this.graphic = "051.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "counter";
}
HorizontalCounterTile.prototype = new TerrainObject;

function RightCounterTile() {
  this.name = "RightCounter";
  this.graphic = "052.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "counter";
}
RightCounterTile.prototype = new TerrainObject;

function LeftCounterTile() {
  this.name = "LeftCounter";
  this.graphic = "053.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "counter";
}
LeftCounterTile.prototype = new TerrainObject;

function CounterBoxTile() {
  this.name = "CounterBox";
  this.graphic = "054.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "counter";
}
CounterBoxTile.prototype = new TerrainObject;

function BlankBlackTile() {
  this.name = "BlankBlack";
  this.graphic = "055.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.desc = "darkness";
}
BlankBlackTile.prototype = new TerrainObject;

function WallTile() {
  this.name = "Wall";
  this.graphic = "056.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
}
WallTile.prototype = new TerrainObject;

function ArrowSlitTile() {
	this.name = "ArrowSlit";
	this.graphic = "arrowslit.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = { distance : 1 , blocklos : 0 };
	this.prefix = "an";
	this.desc = "arrow slit";

}
ArrowSlitTile.prototype = new TerrainObject;

function WindowTile() {
	this.name = "Window";
	this.graphic = "window.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "window";

}
WindowTile.prototype = new TerrainObject;

function WallNETile() {
  this.name = "WallNE";
  this.graphic = "057.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
}
WallNETile.prototype = new TerrainObject;

function WallNWTile() {
  this.name = "WallNW";
  this.graphic = "058.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
}
WallNWTile.prototype = new TerrainObject;

function WallSWTile() {
  this.name = "WallSW";
  this.graphic = "059.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
}
WallSWTile.prototype = new TerrainObject;

function WallSETile() {
  this.name = "WallSE";
  this.graphic = "060.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
}
WallSETile.prototype = new TerrainObject;

function VerticalCounterTile() {
  this.name = "VerticalCounter";
  this.graphic = "061.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "counter";
}
VerticalCounterTile.prototype = new TerrainObject;

function BottomCounterTile() {
  this.name = "BottomCounter";
  this.graphic = "062.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "counter";
}
BottomCounterTile.prototype = new TerrainObject;

function TopCounterTile() {
  this.name = "TopCounter";
  this.graphic = "063.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "counter";
}
TopCounterTile.prototype = new TerrainObject;

function PlanksNSTile() {
  this.name = "PlanksNS";
  this.graphic = "069.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
}
PlanksNSTile.prototype = new TerrainObject;

function SouthCoastTile() {
  this.name = "SouthCoast";
  this.graphic = "073.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
}
SouthCoastTile.prototype = new TerrainObject;

function NorthCoastTile() {
  this.name = "NorthCoast";
  this.graphic = "074.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
}
NorthCoastTile.prototype = new TerrainObject;

function EastCoastTile() {
  this.name = "EastCoast";
  this.graphic = "075.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
}
EastCoastTile.prototype = new TerrainObject;

function WestCoastTile() {
  this.name = "WestCoast";
  this.graphic = "076.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
}
WestCoastTile.prototype = new TerrainObject;

function NortheastCoastTile() {
  this.name = "NortheastCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "necoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastTile.prototype = new TerrainObject;

function SouthwestCoastTile() {
  this.name = "SouthwestCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "swcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastTile.prototype = new TerrainObject;

function NorthwestCoastTile() {
  this.name = "NorthwestCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "nwcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastTile.prototype = new TerrainObject;

function SoutheastCoastTile() {
  this.name = "SoutheastCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "secoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastTile.prototype = new TerrainObject;

function RiverTile() {
  this.name = "River";
  this.overlay = "riverns.gif";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "river";
  
  SetBySurroundRiver.call(this);
}
RiverTile.prototype = new TerrainObject;

function CobblestoneTile() {
  this.name = "Cobblestone";
  this.graphic = "103.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
}
CobblestoneTile.prototype = new TerrainObject;

function PlanksEWTile() {
  this.name = "PlanksEW";
  this.graphic = "104.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
}
PlanksEWTile.prototype = new TerrainObject;

function GrassTile() {
  this.name = "Grass";
  this.graphic = "121.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";

  this.combatmap = "combatGrass";
  this.combatmapoptions = 2; 
}
GrassTile.prototype = new TerrainObject;

function DirtTile() {
  this.name = "Dirt";
  this.graphic = "dirt-ground.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
}
DirtTile.prototype = new TerrainObject;


function RoadTile() {
  this.name = "Road";
  this.graphic = "road-ew.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dirt road";
  
  this.initdelay = 0.8;
  
  SetBySurroundRoad.call(this);
}
RoadTile.prototype = new TerrainObject;

function BrushTile() {
  this.name = "Brush";
  this.graphic = "122.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
}
BrushTile.prototype = new TerrainObject;

function BrushNCoastTile() {
  this.name = "BrushNCoast";
  this.graphic = "brushNcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
}
BrushNCoastTile.prototype = new TerrainObject;

function BrushECoastTile() {
  this.name = "BrushECoast";
  this.graphic = "brushEcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
}
BrushECoastTile.prototype = new TerrainObject;

function BrushSCoastTile() {
  this.name = "BrushSCoast";
  this.graphic = "brushScoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
}
BrushSCoastTile.prototype = new TerrainObject;

function BrushWCoastTile() {
  this.name = "BrushWCoast";
  this.graphic = "brushWcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
}
BrushWCoastTile.prototype = new TerrainObject;

function ForestTile() {
  this.name = "Forest";
  this.graphic = "123.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
//  this.losatdistance = { distance : 5 , blocklos : .8 };
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
}
ForestTile.prototype = new TerrainObject;

function GroveTile() {
	this.name = "Grove";
  this.graphic = "123.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .5;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "trees";
  this.initdelay = 1.3;
}
GroveTile.prototype = new TerrainObject;
	

function ForestNCoastTile() {
	this.name = "ForestNCoast";
	this.graphic = "forestNcoast.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
//  this.losatdistance = { distance : 5 , blocklos : .8 };
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
}
ForestNCoastTile.prototype = new TerrainObject;

function ForestECoastTile() {
	this.name = "ForestECoast";
	this.graphic = "forestEcoast.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
//  this.losatdistance = { distance : 5 , blocklos : .8 };
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
}
ForestECoastTile.prototype = new TerrainObject;

function ForestSCoastTile() {
	this.name = "ForestSCoast";
	this.graphic = "forestScoast.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
//  this.losatdistance = { distance : 5 , blocklos : .8 };
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
}
ForestSCoastTile.prototype = new TerrainObject;

function ForestWCoastTile() {
	this.name = "ForestWCoast";
	this.graphic = "forestWcoast.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
//  this.losatdistance = { distance : 5 , blocklos : .8 };
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
}
ForestWCoastTile.prototype = new TerrainObject;

function HillsTile() {
  this.name = "Hills";
//  this.graphic = "124.gif";
  this.graphic = "hill.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
//  this.blocklos = .3;
//  this.losatdistance = { distance : 5 , blocklos : .5 };
  this.desc = "hills";
  this.initdelay = 1.5;
}
HillsTile.prototype = new TerrainObject;

function PurpleCobblestoneTile() {
  this.name = "PurpleCobblestone";
  this.graphic = "125.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestone";
}
PurpleCobblestoneTile.prototype = new TerrainObject;

function SwampTile() {
  this.name = "Swamp";
  this.graphic = "141.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "swamp";
  this.initdelay = 1.2;
}
SwampTile.prototype = new TerrainObject;
SwampTile.prototype.walkon = function() {
  // return chance, damage, and type
}
SwampTile.prototype.idle = function() {
  // see walkon
}

function ShinglesTile() {
  this.name = "Shingles";
  this.graphic = "shingles.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
}
ShinglesTile.prototype = new TerrainObject;

function ShinglesTopTile() {
  this.name = "ShinglesTop";
  this.graphic = "shingles-top.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
}
ShinglesTopTile.prototype = new TerrainObject;

function CaveFloorTile() {
	this.name = "CaveFloor";
	this.graphic = "cavefloor.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "cave floor";
	
	Tiling.call(this, 2);
}
CaveFloorTile.prototype = new TerrainObject;

function CaveWallTile() {
	this.name = "CaveWall";
	this.graphic = "cavewall.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1;
	this.prefix = "a";
	this.desc = "cave wall";
	
	Tiling.call(this, 2);
	SetBySurround.call(this);
}
CaveWallTile.prototype = new TerrainObject;

function HexFloorTile() {
	this.name = "HexFloor";
	this.graphic = "hexfloor.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
}
HexFloorTile.prototype = new TerrainObject;


function SeeBelowTile() {
  this.name = "SeeBelow";
  this.graphic = "see-below.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "roof";
}
SeeBelowTile.prototype = new TerrainObject;

function LavaTile() {
  this.name = "Lava";
  this.graphic = "flowing_animations.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK + MOVE_SWIM;
  this.blocklos = 0;
  this.desc = "lava";
  this.initdelay = 1.2;
  this.spritexoffset = "-224";
  this.spriteyoffset = "0";
  
  LightEmitting.call(this, 1);
}
LavaTile.prototype = new TerrainObject;
LavaTile.prototype.walkon = function(person) {
  // return messages, perform action
  alert("Walkon!");
}
LavaTile.prototype.idle = function(person) {
  // see walkon
}

// Features!
function FeatureObject() {
  this.addType("Feature");
}
FeatureObject.prototype = new InanimateObject;


function DungeonTile() {
  this.name = "Dungeon";
  this.graphic = "151.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
DungeonTile.prototype = new FeatureObject;

function CaveTile() {
  this.name = "Cave";
  this.graphic = "cave.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "cave entrance";

  Enterable.call(this, "null", 0, 0);
}
CaveTile.prototype = new FeatureObject;

function TowneTile() {
  this.name = "Towne";
  this.graphic = "152.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "towne";

  Enterable.call(this, "null", 0, 0);
}
TowneTile.prototype = new FeatureObject;

function KeepTile() {
  this.name = "Keep";
  this.graphic = "153.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "keep";

  Enterable.call(this, "null", 0, 0);
}
KeepTile.prototype = new FeatureObject;

function GrassTowerTile() {
  this.name = "GrassTower";
  this.graphic = "tower-grass.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tower";

  Enterable.call(this, "null", 0, 0);
}
GrassTowerTile.prototype = new FeatureObject;

function HillTowerTile() {
  this.name = "HillTower";
  this.graphic = "tower-hill.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tower";

  Enterable.call(this, "null", 0, 0);
}
HillTowerTile.prototype = new FeatureObject;

function LighthouseTile() {
  this.name = "Lighthouse";
  this.graphic = "lighthouse.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lighthouse";

  Enterable.call(this, "null", 0, 0);
}
LighthouseTile.prototype = new FeatureObject;

function VillageTile() {
  this.name = "Village";
  this.graphic = "154.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "village";

  Enterable.call(this, "null", 0, 0);
}
VillageTile.prototype = new FeatureObject;

function CastleTile() {
  this.name = "Castle";
  this.graphic = "155.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "Castle Olympus";

  Enterable.call(this, "null", 0, 0);
}
CastleTile.prototype = new FeatureObject;

function LeftCastleTile() {
  this.name = "LeftCastle";
  this.graphic = "005.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Olympus";
}
LeftCastleTile.prototype = new FeatureObject;

function RightCastleTile() {
  this.name = "RightCastle";
  this.graphic = "006.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Olympus";
}
RightCastleTile.prototype = new FeatureObject;

function DoorwayTile() {
  this.name = "Doorway";
  this.graphic = "103.gif";
  this.overlay = "archway.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
  
  SetByBelow.call(this);
}
DoorwayTile.prototype = new FeatureObject;

function ShrineTile() {
  this.name = "Shrine";
  this.graphic = "156.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "gate";

//  Enterable.call(this, "null", 0, 0);
}
ShrineTile.prototype = new FeatureObject;

function BrokenShrineTile() {
  this.name = "BrokenShrine";
  this.graphic = "brokengate.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken gate";

//  Enterable.call(this, "null", 0, 0);
}
BrokenShrineTile.prototype = new FeatureObject;

function RuinsTile() {
  this.name = "Ruins";
  this.graphic = "157.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ruin";

  Enterable.call(this, "null", 0, 0);
}
RuinsTile.prototype = new FeatureObject;

function ChestTile() {
  Lockable.call(this, "008.gif", "008.gif", "008.gif", 	"a chest", "a locked chest", "a magically locked chest");
	this.name = "Chest";
	this.graphic = "008.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "chest";
	
}
ChestTile.prototype = new FeatureObject;

function DoorWindowTile() {
  Lockable.call(this, "009.gif", "010.gif", "067.gif", "a door", "a locked door", "a magically locked door");
	
	this.name = "DoorWindow";
	this.graphic = "009.gif";
	this.overlay = "009.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = { distance : 1 , blocklos : 0 };
	this.prefix = "a";
	this.desc = "door";

	SetByBelow.call(this);
  Openable.call(this, [this.graphic, this.overlay, 0, 0], [this.graphic, "archway.gif", 0, 0], 0);
}
DoorWindowTile.prototype = new FeatureObject;

function CorpseTile() {
	this.name = "Corpse";
	this.graphic = "012.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "corpse";
}
CorpseTile.prototype = new FeatureObject;

function EnergyFieldTile() {
	this.name = "EnergyField";
	this.graphic = "flowing_animations.gif";
	this.passable = 0; // impassable - wonky outdoors, but necessary indoors
	this.blocklos = 0;
//	this.light = 1;
  this.prefix = "an"; 
	this.desc = "energy field";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
	
	LightEmitting.call(this, 1);
}
EnergyFieldTile.prototype = new FeatureObject;

function CampfireTile() {
	this.name = "Campfire";
	this.graphic = "022.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
//	this.light = 2;  // 2 tiles of "bright"
  this.prefix = "a";
	this.desc = "campfire";
	
	LightEmitting.call(this, 2);
}
CampfireTile.prototype = new FeatureObject;

function AltarTile() {
	this.name = "Altar";
	this.graphic = "023.gif";
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "altar";
}
AltarTile.prototype = new FeatureObject;

function DoorTile() {
  Lockable.call(this, "064.gif", "065.gif", "066.gif", "a door", "a locked door", "a magically locked door");
  	
	this.name = "Door";
	this.graphic = "064.gif";
	this.overlay = "064.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
	this.desc = "door";

	SetByBelow.call(this);
	Openable.call(this, [this.graphic, this.overlay, 0, 0], [this.graphic, "archway.gif", 0, 0], 0);
}
DoorTile.prototype = new FeatureObject;

function SleepFieldTile() {
	this.name = "SleepField";
	this.graphic = "flowing_animations.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 1;
  this.prefix = "a";
	this.desc = "sleep field";
	this.initdelay = 1.5;
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
	
	LightEmitting.call(this, 1);
}
SleepFieldTile.prototype = new FeatureObject;

function FireFieldTile() {
	this.name = "FireField";
	this.graphic = "flowing_animations.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 3;
  this.prefix = "a";
	this.desc = "fire field";
	this.spritexoffset = "-32";
  this.spriteyoffset = "0";
	
	LightEmitting.call(this, 3);
	this.initdelay = 1.5;
}
FireFieldTile.prototype = new FeatureObject;

function PoisonFieldTile() {
	this.name = "PoisonField";
	this.graphic = "flowing_animations.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 1;
  this.prefix = "a";
	this.desc = "poison field";
	this.initdelay = 1.5;
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
	
	LightEmitting.call(this, 1);
}
PoisonFieldTile.prototype = new FeatureObject;

function LadderDownTile() {
  this.name = "LadderDown";
  this.graphic = "158.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ladder";

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
LadderDownTile.prototype = new FeatureObject;

function LadderUpTile() {
  this.name = "LadderUp";
  this.graphic = "159.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ladder";

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
LadderUpTile.prototype = new FeatureObject;

function WBridgeNSTile() {
  this.name = "WBridgeNS";
  this.graphic = "070.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
WBridgeNSTile.prototype = new FeatureObject;

function EBridgeNSTile() {
  this.name = "EBridgeNS";
  this.graphic = "071.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
EBridgeNSTile.prototype = new FeatureObject;

function BridgeNSTile() {
  this.name = "BridgeNS";
  this.graphic = "072.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
BridgeNSTile.prototype = new FeatureObject;

function NBridgeEWTile() {
  this.name = "NBridgeEW";
  this.graphic = "101.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
NBridgeEWTile.prototype = new FeatureObject;

function SBridgeEWTile() {
  this.name = "SBridgeEW";
  this.graphic = "102.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
SBridgeEWTile.prototype = new FeatureObject;

function BridgeEWTile() {
  this.name = "BridgeEW";
  this.graphic = "126.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
BridgeEWTile.prototype = new FeatureObject;

function LeftChairTile() {
  this.name = "LeftChair";
  this.graphic = "leftchair.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
LeftChairTile.prototype = new FeatureObject;

function RightChairTile() {
  this.name = "RightChair";
  this.graphic = "rightchair.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
RightChairTile.prototype = new FeatureObject;

function TopChairTile() {
  this.name = "TopChair";
  this.graphic = "topchair.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
TopChairTile.prototype = new FeatureObject;

function BottomChairTile() {
  this.name = "BottomChair";
  this.graphic = "bottomchair.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
BottomChairTile.prototype = new FeatureObject;

function SecretDoorTile() {
	this.name = "SecretDoor";
	this.graphic = "056.gif";   // note: 024 is U4's secret door
	this.overlay = "056.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
	this.desc = "wall";
	
	SetByBelow.call(this);
}
SecretDoorTile.prototype = new FeatureObject;

function WellTile() {
	this.name = "Well";
	this.graphic = "well.gif";   
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "well";
}
WellTile.prototype = new FeatureObject;

function WhirlpoolTile() {
	this.name = "Whirlpool";
	this.graphic = "325.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "whirlpool";
  
  Enterable.call(this, "null", 0, 0);
}
WhirlpoolTile.prototype = new FeatureObject;

function WalkOnTile() {
	this.name = "WalkOn";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnTile.prototype = new FeatureObject;

// Items

function ItemObject() {
	this.addType("Item");
	this.quantity = 1;
}
ItemObject.prototype = new FeatureObject;

ItemObject.prototype.isItem = function() {
	return this.item;
}

ItemObject.prototype.getQuantity = function() {
	return this.quantity;
}

ItemObject.prototype.setQuantity = function(quant) {
	this.quantity = quant;
}

function RubyGemoftheSunTile() {
	this.name = "RubyGemoftheSun";
	this.graphic = "sunruby.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0;
	this.desc = "ruby gem that harnesses the power of the sun";
	this.prefix = "a";
}
RubyGemoftheSunTile.prototype = new ItemObject;

function DecorativeArmorTile() {
	this.name = "DecorativeArmor";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-160";
	this.desc = "decorative suit of armor";
	this.blocklos = 0;
	this.passable = MOVE_ETHEREAL;
	this.prefix = "a";
}
DecorativeArmorTile.prototype = new ItemObject;

// Prototype for armor and weapons

function EquippableItemObject() {
  this.addType("Equippable");	
  this.equippedTo;
}
EquippableItemObject.prototype = new ItemObject;

EquippableItemObject.prototype.getEquippedTo = function() {
  return this.equippedTo;
}

EquippableItemObject.prototype.setEquippedTo = function(newwho) {
  if (newwho) {
    this.equippedTo = newwho;
    return 1;
  }
  return 0;
}

EquippableItemObject.prototype.equipMe = function(who) {
  if (!who.checkType("npc")) { return 0; }
  
  if (this.checkType("Armor")) {
    var currentarmor = who.getArmor();
    if (currentarmor) {
      currentarmor.unEquipMe();
    }
    this.setEquippedTo(who);
    who.setArmor(this);
  }
  
  else if (this.checkType("Missile")) {
    var currentmissile = who.getMissile();
    if (currentmissile) {
      currentmissile.unEquipMe();
    }
    this.setEquippedTo(who);
    who.setMissile(this);
  }

  else if (this.checkType("Weapon")) {
    var currentweapon = who.getWeapon();
    if (currentweapon) {
      currentweapon.unEquipMe();
    }
    this.setEquippedTo(who);
    who.setWeapon(this);
  }
    
}

EquippableItemObject.prototype.unEquipMe = function() {
  var who = this.getEquippedTo();
  if (!who) { return 0; }
  if (!who.checkType("npc")) { return 0; }  
  
  if (this.checkType("Armor")) {
    if (who.getArmor() == this) {
      who.setArmor("");
    } else { 
      return 0;
    }
  }
  else if (this.checkType("Weapon")) {
    if (who.getWeapon() == this) {
      who.setWeapon("");
    } else {
      return 0;
    }
  }
  else if (this.checkType("Missile")) {
    if (who.getMissile() == this) {
      who.setMissile("");
    } else {
      return 0;
    }    
  }
  this.setEquippedTo("");
  return 1;
}

// ARMOR

function ArmorObject() {
	this.defense = 0;
	this.absorb = 0;
	this.resist = 0;
	this.strReq = 0;
	
	this.addType("Armor");
}
ArmorObject.prototype = new EquippableItemObject;

ArmorObject.prototype.setDefense = function(newdef) {
	this.defense = newdef;
	return (this.defense);
}

ArmorObject.prototype.getDefense = function() {
	return (this.defense);
}

ArmorObject.prototype.setResist = function(newresist) {
	this.resist = newresist;
	return (this.resist);
}

ArmorObject.prototype.getResist = function() {
	return (this.resist);
}

ArmorObject.prototype.setAbsorb = function(newab) {
	this.absorb = newab;
	return (this.absorb);
}

ArmorObject.prototype.getAbsorb = function() {
	return (this.absorb);
}

ArmorObject.prototype.setStrReq = function(newreq) {
	this.strReq = newreq;
	return (this.strReq);
}

ArmorObject.prototype.getStrReq = function() {
	return (this.strReq);
}

function NaturalArmorTile() {
  this.name="NaturalArmor";
  this.defense = 5;
  this.absorb = 10;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "0";
  this.desc = "natural armor";
}
NaturalArmorTile.prototype = new ArmorObject;

function ClothArmorTile() {
	this.name = "ClothArmor";
	this.defense = 5;
	this.absorb = 10;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "0";
	this.desc = "cloth armor";
}
ClothArmorTile.prototype = new ArmorObject;

function LeatherArmorTile() {
	this.name = "LeatherArmor";
	this.defense = 10;
	this.absorb = 20;
	this.resist = 10;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "0";
	this.desc = "leather armor";
}
LeatherArmorTile.prototype = new ArmorObject;

function ChainArmorTile() {
	this.name = "ChainArmor";
	this.defense = 20;
	this.absorb = 33;
	this.resist = 10;
	this.strReq = 16;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "0";
	this.desc = "chain mail armor";
}
ChainArmorTile.prototype = new ArmorObject;

function PlateArmorTile() {
	this.name = "PlateArmor";
	this.defense = 35;
	this.absorb = 50;
	this.resist = 15;
	this.strReq = 20;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-96";
	this.spriteyoffset = "0";
	this.desc = "plate armor";
}
PlateArmorTile.prototype = new ArmorObject;

function ExoticArmorTile() {
	this.name = "ExoticArmor";
	this.defense = 40;
	this.absorb = 60;
	this.resist = 40;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-128";
	this.spriteyoffset = "0";
	this.desc = "exotic armor";
}
ExoticArmorTile.prototype = new ArmorObject;

// WEAPONS

function WeaponObject() {
	this.hit = 0;
	this.reduceArmor = 0;
	this.damage = "1d1+0";
	this.strdamage = 0;
	
	this.addType("Weapon");
}
WeaponObject.prototype = new EquippableItemObject;

WeaponObject.prototype.getHit = function() {
	return this.hit;
}

WeaponObject.prototype.setHit = function(newhit) {
	this.hit = newhit;
	return parseInt(this.hit);
}

WeaponObject.prototype.getReduceArmor = function() {
	return this.reduceArmor;
}

WeaponObject.prototype.setReduceArmor = function(newreduce) {
	this.reduceArmor = parseInt(newreduce);
	return this.reduceArmor;
}

WeaponObject.prototype.getDamage = function() {
	return this.damage;
}

WeaponObject.prototype.setDamage = function(newdam) {
	this.damage = newdam;
	return this.damage;
}

WeaponObject.prototype.getStrDamage = function() {
  return this.strdamage;
}

WeaponObject.prototype.setStrDamage = function(newdam) {
  this.strdamage = newdam;
  return this.strdamage;
}

WeaponObject.prototype.parseDamage = function() {
  var dmgobj = ParseDice(this.getDamage());
  
  return dmgobj;
}

WeaponObject.prototype.rollDamage = function(wielder) {
  var damage = RollDice(this.getDamage());
  if (wielder && this.getStrDamage()) {
    var str = wielder.getstr();
    var strmod = parseFloat(this.getStrDamage());
    var strdam = str*strmod;
    damage += parseInt(strdam);
  }
  
  return damage;
}

WeaponObject.prototype.getAveDamage = function(wielder) {
  var dmgobj = this.parseDamage();
  var damage = dmgobj.plus;
  damage += (dmgobj.quantity * (dmgobj.dice + 1)/2);
  if (wielder && this.getStrDamage()) {
    var str = wielder.getstr();
    var strmod = parseFloat(this.getStrDamage());
    var strdam = str*strmod;
    damage += parseInt(strdam);
  }
  return damage;
}

function FistsTile() {
	this.name = "Fists";
	this.damage = "1d2+0";
	this.strdamage = 1/15;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-224";
	this.spriteyoffset = "-32";
	this.prefix = "your";
	this.desc = "fists";
}
FistsTile.prototype = new WeaponObject;

function DaggerTile() {
	this.name = "Dagger";
	this.damage = "1d5+0";
	this.strdamage = 1/15;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-32";
	this.desc = "dagger";
	this.prefix = "a";
}
DaggerTile.prototype = new WeaponObject;

function ShortswordTile() {
	this.name = "Shortsword";
	this.damage = "2d4+1";
	this.strdamage = 1/15;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-32";
	this.desc = "shortsword";
	this.prefix = "a";
}
ShortswordTile.prototype = new WeaponObject;

function MaceTile() {
	this.name = "Mace";
	this.damage = "2d4+3";
	this.strdamage = 1/5;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-32";
	this.desc = "mace";
	this.prefix = "a";
}
MaceTile.prototype = new WeaponObject;

function AxeTile() {
	this.name = "Axe";
	this.damage = "2d4+8";
	this.strdamage = 1/10;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-96";
	this.spriteyoffset = "-32";
	this.desc = "axe";
	this.prefix = "an";
}
AxeTile.prototype = new WeaponObject;

function LongswordTile() {
	this.name = "Longsword";
	this.damage = "4d4+9";
	this.strdamage = 1/10;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-32";
	this.desc = "longsword";
	this.prefix = "a";
}
LongswordTile.prototype = new WeaponObject;

function HalberdTile() {
	this.name = "Halberd";
	this.damage = "5d4+15";
	this.strdamage = 1/3;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-160";
	this.spriteyoffset = "-32";
	this.desc = "halberd";
	this.prefix = "a";
}
HalberdTile.prototype = new WeaponObject;

function MagicSwordTile() {
	this.name = "MagicSword";
	this.damage = "5d10+22";
	this.strdamage = 1/5;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-192";
	this.spriteyoffset = "-32";
	this.desc = "magic sword";
	this.prefix = "a";
}
MagicSwordTile.prototype = new WeaponObject;

function NaturalWeaponTile() {
	this.name = "NaturalWeapon";
	this.damage = "1d5+0";
	this.strdamage = 1/15;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-32";
	this.desc = "natural weapon";
	this.prefix = "a";
}
NaturalWeaponTile.prototype = new WeaponObject;

function MissileWeaponObject() {
	this.dexReq = 10;
	this.range = 10;
	
	this.addType("Missile");
}
MissileWeaponObject.prototype = new WeaponObject;

MissileWeaponObject.prototype.getDexReq = function() {
  return this.dexReq;
}

MissileWeaponObject.prototype.setDexReq = function(newdex) {
  this.dexReq = newdex;
  return this.dexReq;
}

MissileWeaponObject.prototype.getRange = function() {
  return this.range;
}

MissileWeaponObject.prototype.setRange = function(newrange) {
  this.range = newrange;
  return this.range;
}

function SlingTile() {
	this.name = "Sling";
	this.damage = "1d3+0";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-64";
	this.desc = "sling";
	this.prefix = "a";
}
SlingTile.prototype = new MissileWeaponObject;

function BowTile() {
	this.name = "Bow";
	this.damage = "1d12+1";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-64";
	this.dexReq = 16;
	this.desc = "bow";
	this.prefix = "a";
}
BowTile.prototype = new MissileWeaponObject;

function CrossbowTile() {
	this.name = "Crossbow";
	this.damage = "4d8+-1";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-64";
	this.dexReq = 19;
	this.desc = "crossbow";
	this.prefix = "a";
}
CrossbowTile.prototype = new MissileWeaponObject;

function WandTile() {
	this.name = "Wand";
	this.damage = "4d12+0";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-96";
	this.spriteyoffset = "-64";
	this.desc = "magic wand";
	this.prefix = "a";
}
WandTile.prototype = new MissileWeaponObject;

function MagicAxeTile() {
	this.name = "MagicAxe";
	this.damage = "4d12+12";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-64";
	this.dexReq = 22;
	this.desc = "magic axe";
	this.prefix = "a";
}
MagicAxeTile.prototype = new MissileWeaponObject;

function NaturalMissileWeaponTile() {
	this.name = "NaturalMissileWeapon";
	this.damage = "1d12+1";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-64";
	this.desc = "natural missile weapon";
	this.prefix = "a";
}
NaturalMissileWeaponTile.prototype = new MissileWeaponObject;



// NPCs

function AnimateObject() {
	this.altGraphics = new Array;
	
	this.addType("Animate");
}
AnimateObject.prototype = new GameObject;


// Replaced for the nonce with PickOne.
AnimateObject.prototype.pickGraphic = new function() {
	if (this.altGraphics) {
  	var options = this.altGraphics.length;
	  if (options > 0) {
		  var randomnumber=Math.floor(Math.random()*options) + 1;
		  this.setGraphic(altGraphics[randomnumber]);
	  }
	}
}

function NPCObject() {
	this.str = 10;
	this.dex = 10;
	this.int = 10
	this.hp = 10;
	this.maxhp = 10;
	this.mana = 10;
	this.maxmana = 10;
	this.level = 0
//	this.type = "npc";
	this.npcname = "myname";
	this.desc = "an NPC";
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.ThreatenedAI = "spellcaster";
	this.graphic = "301.gif";
	this.meleeAttackAs = "Fists";
	this.meleeDamage = -1;
	this.meleeStrDamage = -1;
	this.missileAttackAs = "none";
	this.missileDamage = -1;
	this.missileRange = -1;
	this.armorAs = "none";
	this.armorDefense = -1;
	this.armorAbsorb = -1;
	this.armorResist = -1;
	this.initmult = 1;
	this.movetype = MOVE_WALK;
	this.inventory = new Collection;
  this.equipment = new Object;
	this.equipment.armor;
	this.equipment.weapon;
	this.equipment.missile;
  this.gold = 0;
	
	this.addType("npc");
}
NPCObject.prototype = new AnimateObject;

NPCObject.prototype.getNPCName = function() {
	return this.npcname;
}

NPCObject.prototype.setNPCName = function(newName) {
	this.npcname = newName;
	return this.npcname;
}

NPCObject.prototype.setMana = function(newMana) {
	if (newMana == -1) { this.mana = this.int; }
	else {this.mana = newMana; }
}

NPCObject.prototype.getMana = function() {
	return this.mana;
}

NPCObject.prototype.setMaxMana = function(newMana) {
	if (newMana == -1) { this.maxmana = this.int; }
	else {this.maxmana = newMana; }
}

NPCObject.prototype.getMaxMana = function() {
	return this.maxmana;
}

NPCObject.prototype.setGold = function(newgold) {
  newgold = parseInt(newgold);
	this.gold = newgold;
}

NPCObject.prototype.getGold = function() {
	return this.gold;
}

NPCObject.prototype.addGold = function(diffgold) {
  diffgold = parseInt(diffgold);
  this.gold += diffgold;
  return this.gold;
}

NPCObject.prototype.setHP = function(newhp) {
	this.hp = newhp;
}

NPCObject.prototype.getHP = function() {
	return this.hp;
}

NPCObject.prototype.setMaxHP = function(newhp) {
	this.maxhp = newhp;
}

NPCObject.prototype.getMaxHP = function() {
	return this.maxhp;
}

NPCObject.prototype.modHP = function(hpdiff) {
	hpdiff = parseInt(hpdiff);
	this.hp += hpdiff;
	return this.hp;
}

NPCObject.prototype.setstr = function(newstr) {
	newstr = parseInt(newstr);
	if (newstr != 0) { this.str = newstr; }
}

NPCObject.prototype.getstr = function() {
	return this.str;
}

NPCObject.prototype.setdex = function(newdex) {
	newdex = parseInt(newdex);
	if (newdex != 0) { this.dex = newdex; }
}

NPCObject.prototype.getdex = function() {
	return this.dex;
}

NPCObject.prototype.setint = function(newint) {
	newint = parseInt(newint);
	if (newint != 0) { this.int = newint; }
}

NPCObject.prototype.getint = function() {
	return this.int;
}

NPCObject.prototype.setStats = function(newstr, newdex, newint) {
	this.setstr(newstr);
	this.setdex(newdex);
	this.setint(newint);
}

NPCObject.prototype.setLevel = function(newlevel) {
	newlevel = parseInt(newlevel);
	if (newlevel != 0) { this.level = newlevel; }
}

NPCObject.prototype.getLevel = function() {
	return this.level;
}

NPCObject.prototype.getAlignment = function() {
	return this.alignment;
}

NPCObject.prototype.setAlignment = function(newAlign) {
	this.alignment = newAlign;
	return this.alignment;
}

NPCObject.prototype.getAttitude = function() {
	return this.attitude;
}

NPCObject.prototype.setAttitude = function(newAttitude) {
	this.attitude = newAttitude;
	return this.attitude;
}

NPCObject.prototype.getPeaceAI = function() {
	return this.peaceAI;
}

NPCObject.prototype.setPeaceAI = function(newAI) {
	this.peaceAI = newAI;
	return this.peaceAI;
}

NPCObject.prototype.getPCThreatAI = function() {
	return this.PCThreatAI;
}

NPCObject.prototype.setPCThreatAI = function(newAI) {
	this.PCThreatAI = newAI;
	return this.PCThreatAI;
}

NPCObject.prototype.getThreatenedAI = function() {
	return this.threatenedAI;
}

NPCObject.prototype.setThreatenedAI = function(newAI) {
	this.threatenedAI = newAI;
	return this.threatenedAI;
}

NPCObject.prototype.getMeleeAttackAs = function() {
	return this.meleeAttackAs;
}

NPCObject.prototype.setMeleeAttackAs = function(melee) {
	this.meleeAttackAs = melee;
	return this.meleeAttackAs;
}

NPCObject.prototype.getMissileAttackAs = function() {
	return this.missileAttackAs;
}

NPCObject.prototype.setMissileAttackAs = function(missile) {
	this.missileAttackAs = missile;
	return this.missileAttackAs;
}

NPCObject.prototype.getArmorAs = function() {
	return this.armorAs;
}

NPCObject.prototype.setArmorAs = function(armor) {
	this.armorAs = armor;
	return this.armorAs;
}

NPCObject.prototype.nextActionTime = function(initdelay) {

  var scale = this.getHomeMap().getScale();
  if (this.smallscalemove) { 
    scale = 1;
    delete this.smallscalemove;
  }

  var isQuick = 0;  // replace with a check for the presence of the Quickness spell.
  var init = ((-1/60) * this.getdex() + (7/6)) * this.initmult * (1 - .5 * isQuick);
  if ((initdelay) && (initdelay != 0)) {
  	init = init * initdelay;
  }
  if (scale) { init = init * SCALE_TIME; }
	return init;
}

NPCObject.prototype.getMovetype = function() {
	return this.movetype;
}

NPCObject.prototype.setMovetype = function(move) {
	this.movetype = move;
}

NPCObject.prototype.addMovetype = function(move) {
	this.movetype = this.movetype | move;
}

NPCObject.prototype.removeMovetype = function(move) {
	this.movetype = this.movetype & ~move;
}

NPCObject.prototype.activate = function(timeoverride) {
  
  var weapon;
  var missileweapon;
  var armor;
  
  if ((this.getMeleeAttackAs()) && (this.getMeleeAttackAs != "none")) {
    weapon = localFactory.createTile(this.getMeleeAttackAs());
    this.setEquipment("weapon",weapon);
    wpn = weapon;
  }
  else {
    weapon = localFactory.createTile("NaturalWeapon");
    this.setEquipment("weapon",weapon);
  } 
  if ((this.getMissileAttackAs()) && (this.getMissileAttackAs() != "none")) {
    missileweapon = localFactory.createTile(this.getMissileAttackAs());
    this.setEquipment("missile",missileweapon);
  } 
  else {
    missileweapon = localFactory.createTile("NaturalMissileWeapon");
    this.setEquipment("missile",missileweapon);
  } 
  if ((this.getArmorAs()) && (this.getArmorAs() != "none")) {
    armor = localFactory.createTile(this.getArmorAs());
    this.setEquipment("armor",armor);
  }
  else {
    armor = localFactory.createTile("NaturalArmor");
    this.setEquipment("armor",armor);
  } 
  
  if (this.meleeDamage != -1) {
    weapon.setDamage(this.meleeDamage);
  }
  if (this.meleeStrDamage != -1) {
    weapon.setStrDamage(this.meleeStrDamage);
  }
  
  if (this.missileDamage != -1) {
    missileweapon.setDamage(this.missileDamage);
  }
  if (this.missileRange != -1) {
    missileweapon.setRange(this.missileRange);
  }
  if (this.armorDefense != -1) {
    armor.setDefense(this.armorDefense);
  }
  if (this.armorResist != -1) {
    armor.setResist(this.armorResist);
  }
  if (this.armorAbsorb != -1) {
    armor.setAbsorb(this.armorAbsorb);
  }
  
  var timing = this.nextActionTime(0);
  timing = timing/2;
  if (timeoverride) {
    timing = timeoverride;
  }
  timing = timing + (Math.random() / 500);
  var NPCEvent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCEvent,timing);  
}

NPCObject.prototype.moveMe = function(diffx,diffy,forcemove) {
	var map = this.getHomeMap();
	var oldmapname = map.getDesc();
	var passx = parseInt(this.getx()) + parseInt(diffx);
	var passy = parseInt(this.gety()) + parseInt(diffy);
	var tile = map.getTile(passx,passy);
	var retval = new Object;
	if (tile == "OoB") { 
		if (map.getExitToMap()) {
			var newmap = new GameMap();
			if (maps.getMap(map.getExitToMap())) {
				newmap = maps.getMap(map.getExitToMap());
			} else {
				newmap.loadMap(map.getExitToMap());
				maps.addMapByRef(newmap);
			}
			tile = MoveBetweenMaps(this,map,newmap,map.getExitToX(),map.getExitToY());
			if (this == PC) {
				drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
				drawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
				retval["canmove"] = 0;
				retval["msg"] = ".<br />Exiting " + oldmapname + ".";
			}
		}
	}
	else {
		retval = tile.getBumpIntoResult(this);
		if (retval["canmove"] == 0) { return retval; }
		var moveval = tile.canMoveHere(this, map.getTile(this.getx(),this.gety()));
		retval["canmove"] = moveval["canmove"];
	
		if (retval["msg"] == "") {
			if (moveval["msg"] == "") { retval["msg"] = "."; }
			else { retval["msg"] = " - " + moveval["msg"]; }
		}
		else {
			if (moveval["msg"] != "") {
				retval["msg"] += "<br />" + moveval["msg"];
			}
		}
	}
	
	if (retval["canmove"] == 1) {
		map.moveThing(this.getx()+diffx,this.gety()+diffy,this);
//                if (this == PC) {
			drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
//		}
		var walkonval = tile.executeWalkons(this);
	}
	retval["initdelay"] = tile.getInitDelay(this);
	return retval;
}

NPCObject.prototype.myTurn = function() {
	gamestate.setMode("NPC");
	gamestate.setTurn(this);
	
	// actual AI!
	
	var response = new Object;  
	// will be = return value of AI call
	response["initdelay"] = 1;
	
	gamestate.setMode("null");
	var NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,this.nextActionTime(response["initdelay"]));
  
  var nextEntity = DUTime.executeNextEvent().getEntity();
  nextEntity.myTurn();
}

NPCObject.prototype.addToInventory = function(item, thinAir) {
  // Whether the object being added to inventory is an item
  // must be checked before this point. This will add _anything_ to
  // an inventory!
  
  //If thinAir is set, the item is being generated directly into the inventory,
  //and so does not need to be removed from the map.
  if (!thinAir) {
    // otherwise, this will remove the item from the NPC/PC's map first.
    this.getHomeMap().deleteThing(item);
  }
  var alreadyIn = this.inventory.getByName(item.getName());
  if (alreadyIn) {
    alreadyIn.setQuantity(alreadyIn.getQuantity()+1);
  }
  else {
    this.inventory.addTop(item);
  }
  item.setx(0);
  item.sety(0);  
}

NPCObject.prototype.removeFromInventory = function(item, map, x, y) {
  if (item.getQuantity > 1) {
    item.setQuantity(item.getQuantity()-1);
  } else {
    // If this is equipped, unequip it first
    if (item.checkType("Weapon")) {
      this.setEquipment("Weapon","");
    }
    if (item.checkType("Missile")) {
      this.setEquipment("Missile","");
    }
    if (item.checkType("Armor")) {
      this.setEquipment("Armor","");
    }    
    this.inventory.deleteFrom(item);
  }
  if (map) { // if map,x,y are filled in, will place the item back on
             // the map
    map.placeThing(x,y,item);
  }
}

NPCObject.prototype.getInventory = function() {
  var inv = this.inventory.getAll();
  return inv;
}

NPCObject.prototype.getEquipment = function(which) {
  which = which.toLowerCase();
  if (which == "armor") {
    return (this.getArmor()); 
  }
  else if (which == "weapon") {
    return (this.getWeapon());
  }
  else if (which == "missile") {
    return (this.getMissile());
  }
  
  else { return ""; }
}

NPCObject.prototype.setEquipment = function(which,what) {
  which = which.toLowerCase();
  if (which == "armor") {
    return this.setArmor(what);
  }
  else if (which == "weapon") {
    return this.setWeapon(what);
  }
  else if (which == "missile") {
    return this.setMissile(what);
  }
  
  else { return 0; }
}

NPCObject.prototype.getArmor = function() {
  if (this.equipment.armor) { return this.equipment.armor; }
  else { return ""; } 
}

NPCObject.prototype.getWeapon = function() {
  if (this.equipment.weapon) { return this.equipment.weapon; }
  else { return ""; } 
}

NPCObject.prototype.getMissile = function() {
  if (this.equipment.missile) { return this.equipment.missile; }
  else { return ""; } 
}

NPCObject.prototype.setArmor = function(newarmor) {
  if (newarmor) {
    if (newarmor.checkType("Armor")) {
      this.equipment.armor = newarmor;
      return 1;
    }
    return 0;
  } else { 
    this.equipment.armor = "";
    return 1;
  }
}

NPCObject.prototype.setWeapon = function(newweapon) {
  if (newweapon) {
    if (newweapon.checkType("Weapon")) {
      this.equipment.weapon = newweapon;
      return 1;
    }
    return 0;
  } else {
    this.equipment.weapon = "";
    return 1;
  }
}

NPCObject.prototype.setMissile = function(newmissile) {
  if (newmissile) {
    if (newmissile.checkType("Missile")) {
      this.equipment.missile = newmissile;
      return 1;
    }
    return 0;
  } else {
    this.equipment.missile = "";
    return 1;
  }
}

function NPCGroupObject() {
  this.group = new Array;
}
NPCGroupObject.prototype = new NPCObject;

function NPCList(npcs,num) {
  this.npc = npcs;
  this.count = num;
}

NPCGroupObject.prototype.populate = function() {
  var population = new Array;
  for (var i=0; i< this.group.length; i++) {
    var num = RollDice(this.group.count);
    for (var j=1; j<=num; j++) {
      if (population.length < 8) {
        population[population.length] = this.group.npc;
      }
    }
  }
  
  return population;
}

// NPCs have moved into npcObjects.js




function PCObject() {
	this.name = "PC";
	this.str = 10;
	this.dex = 10;
	this.int = 10;
	this.level = 1;
	this.pcname = "Subject Name Here";
	this.desc = "you";
	this.alignment = "good";	
	this.graphic = "300.gif";
	this.meleeAttackAs = "Fists";
	this.missileAttackAs = "none";
	this.maxhp = 30 * this.level;
	this.hp = this.maxhp;
	this.maxmana = this.int;
	this.mana = this.maxmana;
	this.movetype = MOVE_WALK;
	this.xp = 0;
	this.tp = 0;  // training points
	
	LightEmitting.call(this, 1);
	this.addType("pc");
}
PCObject.prototype = new NPCObject;

PCObject.prototype.myTurn = function() {
	gamestate.setMode("player");
	gamestate.setTurn(PC);
}

PCObject.prototype.getPCName = function() {
	return this.pcname;
}

PCObject.prototype.setPCName = function(newname) {
	this.pcname = newname;
	return this.pcname;
}

PCObject.prototype.getxp = function() {
  return this.xp;
}

PCObject.prototype.setxp = function(newxp) {
  newxp = parseInt(newxp);
  this.xp = newxp;
}

PCObject.prototype.addxp = function(diffxp) {
  diffxp = parseInt(diffxp);
  this.xp += diffxp;
  return this.xp;
}

PCObject.prototype.gettp = function() {
  return this.tp;
}

PCObject.prototype.settp = function(newtp) {
  newtp = parseInt(newtp);
  this.tp = newtp;
}

PCObject.prototype.addtp = function(difftp) {
  difftp = parseInt(difftp);
  this.tp += difftp;
  return this.tp;
}

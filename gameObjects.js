

function GameObject() {
  this.x;
  this.y;
  
  this.serial = GetSerial();
}

GameObject.prototype.getSerial = function() {
	return this.serial;
}

GameObject.prototype.getx = function() {
	return this.x;
}

GameObject.prototype.setx = function(x) {
  this.x = x;
}

GameObject.prototype.gety = function() {
	return this.y;
}

GameObject.prototype.sety = function(y) {
  this.y = y;
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

GameObject.prototype.setDesc = function(newdesc) {
	this.desc = newdesc;
}

GameObject.prototype.getDesc = function() {
	return this.desc;
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

GameObject.prototype.setUnderlay = function(newgraphic) {
	this.graphic = newgraphic;
}

GameObject.prototype.getUnderlay = function() {
	var returnGraphic = this.graphic;

  if (returnGraphic) { return(returnGraphic); }
}

GameObject.prototype.getGraphic = function() {
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

function Lockable(unlockedgraphic, lockedgraphic, maglockedgraphic, unlockeddesc, lockeddesc, maglockeddesc) {
	this.locked = 0;
	this.lockedgraphics = new Array(unlockedgraphic, lockedgraphic, maglockedgraphic);
	this.lockeddescs = new Array(unlockeddesc, lockeddesc, maglockeddesc);
	
	this.setLocked = function(lock) { this.locked = lock; }
	this.getLocked = function() { return this.locked; }
	this.lockMe = function(lock) {
		this.setLocked(lock);
		this.setGraphic(this.lockedgraphics[lock]);
		this.setDesc(this.lockeddescs[lock]);
	}
	this.unlockMe = function() { this.lockMe(0); }
}

function Enterable(entermap, enterx, entery) {
	this.entermap = entermap;
	this.enterx = enterx;
	this.entery = entery;
	
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
}

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

function Tiling(tileval) {
	this.doTile = function(tilingx,tilingy,tilegraphic) {
		tilingx = (tilingx % tileval); 
		tilingy = (tilingy % tileval);
		var foo = tilegraphic.split('.');
	  return(foo[0] + "-" + tilingy + tilingx + "." + foo[1]);
	}
}

function SetBySurround() {
	this.setBySurround = function(x,y,themap,showGraphic) {
		var cardinal_dash = "";
		var north = 0;
		var south = 0;
		var east = 0;
		var west = 0;
  	var addtoname_cardinal = "";
	  if ((themap.getTile(x,y+1) != "OoB") && (themap.getTile(x,y+1).terrain.getName() == "CaveFloor")) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "n"; north = 1;}
  	if ((themap.getTile(x,y-1) != "OoB") && (themap.getTile(x,y-1).terrain.getName() == "CaveFloor")) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "s"; south = 1;}
	  if ((themap.getTile(x-1,y) != "OoB") && (themap.getTile(x-1,y).terrain.getName() == "CaveFloor")) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "e"; east = 1;}
  	if ((themap.getTile(x+1,y) != "OoB") && (themap.getTile(x+1,y).terrain.getName() == "CaveFloor")) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "w"; west = 1;}
	
	  var diagonal_dash = "";
	  var addtoname_diagonal = "";
	 	if ((themap.getTile(x+1,y-1) != "OoB") && (themap.getTile(x+1,y-1).terrain.getName() == "CaveFloor") && (south == 0) && (west == 0))
	 	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "a"; }
  	if ((themap.getTile(x+1,y+1) != "OoB") && (themap.getTile(x+1,y+1).terrain.getName() == "CaveFloor") && (north == 0) && (west == 0)) 
  	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "b"; }
	  if ((themap.getTile(x-1,y+1) != "OoB") && (themap.getTile(x-1,y+1).terrain.getName() == "CaveFloor") && (north == 0) && (east == 0))
	    { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "c"; }
	 	if ((themap.getTile(x-1,y-1) != "OoB") && (themap.getTile(x-1,y-1).terrain.getName() == "CaveFloor") && (south == 0) && (east == 0)) 
	 	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "d"; }
	
	  var foo = showGraphic.split('.');
	  showGraphic = foo[0] + cardinal_dash + addtoname_cardinal + diagonal_dash + addtoname_diagonal + '.' + foo[1];
	  return (showGraphic);
  }
}
// end inheritance

function InanimateObject() {

}

InanimateObject.prototype = new GameObject;

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


// And now, on with the show!
// TERRAIN

function TerrainObject() {
  this.setType("terrain");
}

TerrainObject.prototype = new InanimateObject;

TerrainObject.prototype.serialize = function() {
  var name = this.name;
  var myatlas = new Atlas();
  var code = myatlas.keylookup(name);
  if (code) { return(code); }
  return(0);
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
  this.graphic = "001.gif";
  this.desc = "ocean";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL;
}
OceanTile.prototype = new TerrainObject;

function WaterTile() {
  this.name = "Water";
  this.graphic = "002.gif";
  this.desc = "water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
}
WaterTile.prototype = new TerrainObject;

function ShallowsTile() {
  this.name = "Shallows";
  this.graphic = "003.gif";
  this.desc = "shallow water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
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
  this.desc = "a stone wall";
}
StoneWallTile.prototype = new TerrainObject;

function StoneTile() {
  this.name = "Stone";
  this.graphic = "013.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a stone";
}
StoneTile.prototype = new TerrainObject;

function DirtStoneTile() {
  this.name = "DirtStone";
  this.graphic = "dirt-rock.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a stone";
}
DirtStoneTile.prototype = new TerrainObject;

function MastTile() {
  this.name = "Mast";
  this.graphic = "014.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a mast";
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
  this.desc = "a pillar";
}
PillarTile.prototype = new TerrainObject;

function FountainSWTile() {
  this.name = "FountainSW";
  this.graphic = "017.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a fountain";
}
FountainSWTile.prototype = new TerrainObject;

function FountainSETile() {
  this.name = "FountainSE";
  this.graphic = "018.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a fountain";
}
FountainSETile.prototype = new TerrainObject;

function FountainNWTile() {
  this.name = "FountainNW";
  this.graphic = "019.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a fountain";
}
FountainNWTile.prototype = new TerrainObject;

function FountainNETile() {
  this.name = "FountainNE";
  this.graphic = "020.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a fountain";
}
FountainNETile.prototype = new TerrainObject;

function LetterATile() {
  this.name = "LetterA";
  this.graphic = "025.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an A";
}
LetterATile.prototype = new TerrainObject;

function LetterBTile() {
  this.name = "LetterB";
  this.graphic = "026.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a B";
}
LetterBTile.prototype = new TerrainObject;

function LetterCTile() {
  this.name = "LetterC";
  this.graphic = "027.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a C";
}
LetterCTile.prototype = new TerrainObject;

function LetterDTile() {
  this.name = "LetterD";
  this.graphic = "028.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a D";
}
LetterDTile.prototype = new TerrainObject;

function LetterETile() {
  this.name = "LetterE";
  this.graphic = "029.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an E";
}
LetterETile.prototype = new TerrainObject;

function LetterFTile() {
  this.name = "LetterF";
  this.graphic = "030.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an F";
}
LetterFTile.prototype = new TerrainObject;

function LetterGTile() {
  this.name = "LetterG";
  this.graphic = "031.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a G";
}
LetterGTile.prototype = new TerrainObject;

function LetterHTile() {
  this.name = "LetterH";
  this.graphic = "032.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an H";
}
LetterHTile.prototype = new TerrainObject;

function LetterITile() {
  this.name = "LetterI";
  this.graphic = "033.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an I";
}
LetterITile.prototype = new TerrainObject;

function LetterJTile() {
  this.name = "LetterJ";
  this.graphic = "034.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a J";
}
LetterJTile.prototype = new TerrainObject;

function LetterKTile() {
  this.name = "LetterK";
  this.graphic = "035.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a K";
}
LetterKTile.prototype = new TerrainObject;

function LetterLTile() {
  this.name = "LetterL";
  this.graphic = "036.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an L";
}
LetterLTile.prototype = new TerrainObject;

function LetterMTile() {
  this.name = "LetterM";
  this.graphic = "037.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an M";
}
LetterMTile.prototype = new TerrainObject;

function LetterNTile() {
  this.name = "LetterN";
  this.graphic = "038.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an N";
}
LetterNTile.prototype = new TerrainObject;

function LetterOTile() {
  this.name = "LetterO";
  this.graphic = "039.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an O";
}
LetterOTile.prototype = new TerrainObject;

function LetterPTile() {
  this.name = "LetterP";
  this.graphic = "040.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a P";
}
LetterPTile.prototype = new TerrainObject;

function LetterQTile() {
  this.name = "LetterQ";
  this.graphic = "041.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a Q";
}
LetterQTile.prototype = new TerrainObject;

function LetterRTile() {
  this.name = "LetterR";
  this.graphic = "042.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an R";
}
LetterRTile.prototype = new TerrainObject;

function LetterSTile() {
  this.name = "LetterS";
  this.graphic = "043.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an S";
}
LetterSTile.prototype = new TerrainObject;

function LetterTTile() {
  this.name = "LetterT";
  this.graphic = "044.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a T";
}
LetterTTile.prototype = new TerrainObject;

function LetterUTile() {
  this.name = "LetterU";
  this.graphic = "045.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a U";
}
LetterUTile.prototype = new TerrainObject;

function LetterVTile() {
  this.name = "LetterV";
  this.graphic = "046.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a V";
}
LetterVTile.prototype = new TerrainObject;

function LetterWTile() {
  this.name = "LetterW";
  this.graphic = "047.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a W";
}
LetterWTile.prototype = new TerrainObject;

function LetterXTile() {
  this.name = "LetterX";
  this.graphic = "048.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "an X";
}
LetterXTile.prototype = new TerrainObject;

function LetterYTile() {
  this.name = "LetterY";
  this.graphic = "049.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a Y";
}
LetterYTile.prototype = new TerrainObject;

function LetterZTile() {
  this.name = "LetterZ";
  this.graphic = "050.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a Z";
}
LetterZTile.prototype = new TerrainObject;

function HorizontalCounterTile() {
  this.name = "HorizontalCounter";
  this.graphic = "051.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a counter";
}
HorizontalCounterTile.prototype = new TerrainObject;

function RightCounterTile() {
  this.name = "RightCounter";
  this.graphic = "052.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a counter";
}
RightCounterTile.prototype = new TerrainObject;

function LeftCounterTile() {
  this.name = "LeftCounter";
  this.graphic = "053.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a counter";
}
LeftCounterTile.prototype = new TerrainObject;

function CounterBoxTile() {
  this.name = "CounterBox";
  this.graphic = "054.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a counter";
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
  this.desc = "a wall";
}
WallTile.prototype = new TerrainObject;

function ArrowSlitTile() {
	this.name = "ArrowSlit";
	this.graphic = "arrowslit.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = { distance : 1 , blocklos : 0 };
	this.desc = "an arrow slit";

}
ArrowSlitTile.prototype = new TerrainObject;

function WindowTile() {
	this.name = "Window";
	this.graphic = "window.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.desc = "a window";

}
WindowTile.prototype = new TerrainObject;

function WallNETile() {
  this.name = "WallNE";
  this.graphic = "057.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.desc = "a wall";
}
WallNETile.prototype = new TerrainObject;

function WallNWTile() {
  this.name = "WallNW";
  this.graphic = "058.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.desc = "a wall";
}
WallNWTile.prototype = new TerrainObject;

function WallSWTile() {
  this.name = "WallSW";
  this.graphic = "059.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.desc = "a wall";
}
WallSWTile.prototype = new TerrainObject;

function WallSETile() {
  this.name = "WallSE";
  this.graphic = "060.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.desc = "a wall";
}
WallSETile.prototype = new TerrainObject;

function VerticalCounterTile() {
  this.name = "VerticalCounter";
  this.graphic = "061.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a counter";
}
VerticalCounterTile.prototype = new TerrainObject;

function BottomCounterTile() {
  this.name = "BottomCounter";
  this.graphic = "062.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a counter";
}
BottomCounterTile.prototype = new TerrainObject;

function TopCounterTile() {
  this.name = "TopCounter";
  this.graphic = "063.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "a counter";
}
TopCounterTile.prototype = new TerrainObject;

function DoorwayTile() {
  this.name = "Doorway";
  this.graphic = "068.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a doorway";
}
DoorwayTile.prototype = new TerrainObject;

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
  this.graphic = "077.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
}
NortheastCoastTile.prototype = new TerrainObject;

function SouthwestCoastTile() {
  this.name = "SouthwestCoast";
  this.graphic = "078.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
}
SouthwestCoastTile.prototype = new TerrainObject;

function NorthwestCoastTile() {
  this.name = "NorthwestCoast";
  this.graphic = "079.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
}
NorthwestCoastTile.prototype = new TerrainObject;

function SoutheastCoastTile() {
  this.name = "SoutheastCoast";
  this.graphic = "080.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
}
SoutheastCoastTile.prototype = new TerrainObject;

function RiverNSTile() {
  this.name = "RiverNS";
  this.graphic = "riverns.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverNSTile.prototype = new TerrainObject;

function RiverEWTile() {
  this.name = "RiverEW";
  this.graphic = "riverew.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverEWTile.prototype = new TerrainObject;

function RiverNETile() {
  this.name = "RiverNE";
  this.graphic = "riverne.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverNETile.prototype = new TerrainObject;

function RiverNWTile() {
  this.name = "RiverNW";
  this.graphic = "rivernw.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverNWTile.prototype = new TerrainObject;

function RiverSETile() {
  this.name = "RiverSE";
  this.graphic = "riverse.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverSETile.prototype = new TerrainObject;

function RiverSWTile() {
  this.name = "RiverSW";
  this.graphic = "riversw.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverSWTile.prototype = new TerrainObject;

function RiverTbottomTile() {
  this.name = "RiverTbottom";
  this.graphic = "riverTbottom.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverTbottomTile.prototype = new TerrainObject;

function RiverTleftTile() {
  this.name = "RiverTleft";
  this.graphic = "riverTleft.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverTleftTile.prototype = new TerrainObject;

function RiverTrightTile() {
  this.name = "RiverTright";
  this.graphic = "riverTright.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverTrightTile.prototype = new TerrainObject;

function RiverTtopTile() {
  this.name = "RiverTtop";
  this.graphic = "riverTtop.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverTtopTile.prototype = new TerrainObject;

function RiverSourceNTile() {
  this.name = "RiverSourceN";
  this.graphic = "riversourcen.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverSourceNTile.prototype = new TerrainObject;

function RiverSourceSTile() {
  this.name = "RiverSourceS";
  this.graphic = "riversources.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverSourceSTile.prototype = new TerrainObject;

function RiverSourceETile() {
  this.name = "RiverSourceE";
  this.graphic = "riversourcee.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverSourceETile.prototype = new TerrainObject;

function RiverSourceWTile() {
  this.name = "RiverSourceW";
  this.graphic = "riversourcew.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a river";
}
RiverSourceWTile.prototype = new TerrainObject;

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

function RoadENTile() {
  this.name = "RoadEN";
  this.graphic = "road-en.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dirt road";
}
RoadENTile.prototype = new TerrainObject;

function RoadENSTile() {
  this.name = "RoadENS";
  this.graphic = "road-ens.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dirt road";
}
RoadENSTile.prototype = new TerrainObject;

function RoadESTile() {
  this.name = "RoadES";
  this.graphic = "road-es.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dirt road";
}
RoadESTile.prototype = new TerrainObject;

function RoadEWTile() {
  this.name = "RoadEW";
  this.graphic = "road-ew.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dirt road";
}
RoadEWTile.prototype = new TerrainObject;

function RoadEWNTile() {
  this.name = "RoadEWN";
  this.graphic = "road-ewn.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dirt road";
}
RoadEWNTile.prototype = new TerrainObject;

function RoadEWSTile() {
  this.name = "RoadEWS";
  this.graphic = "road-ews.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dirt road";
}
RoadEWSTile.prototype = new TerrainObject;

function RoadNSTile() {
  this.name = "RoadNS";
  this.graphic = "road-ns.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dirt road";
}
RoadNSTile.prototype = new TerrainObject;

function RoadWNTile() {
  this.name = "RoadWN";
  this.graphic = "road-wn.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dirt road";
}
RoadWNTile.prototype = new TerrainObject;

function RoadWNSTile() {
  this.name = "RoadWNS";
  this.graphic = "road-wns.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dirt road";
}
RoadWNSTile.prototype = new TerrainObject;

function RoadWSTile() {
  this.name = "RoadWS";
  this.graphic = "road-ws.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dirt road";
}
RoadWSTile.prototype = new TerrainObject;

function RoadXTile() {
  this.name = "RoadX";
  this.graphic = "road-x.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dirt road";
}
RoadXTile.prototype = new TerrainObject;

function BrushTile() {
  this.name = "Brush";
  this.graphic = "122.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
}
BrushTile.prototype = new TerrainObject;

function BrushNCoastTile() {
  this.name = "BrushNCoast";
  this.graphic = "brushNcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
}
BrushNCoastTile.prototype = new TerrainObject;

function BrushECoastTile() {
  this.name = "BrushECoast";
  this.graphic = "brushEcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
}
BrushECoastTile.prototype = new TerrainObject;

function BrushSCoastTile() {
  this.name = "BrushSCoast";
  this.graphic = "brushScoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
}
BrushSCoastTile.prototype = new TerrainObject;

function BrushWCoastTile() {
  this.name = "BrushWCoast";
  this.graphic = "brushWcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
}
BrushWCoastTile.prototype = new TerrainObject;

function ForestTile() {
  this.name = "Forest";
  this.graphic = "123.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .6;
  this.losatdistance = { distance : 5 , blocklos : .8 };
  this.desc = "forest";
}
ForestTile.prototype = new TerrainObject;

function ForestNCoastTile() {
	this.name = "ForestNCoast";
	this.graphic = "forestNcoast.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .4;
  this.losatdistance = { distance : 5 , blocklos : .8 };
  this.desc = "forest";
}
ForestNCoastTile.prototype = new TerrainObject;

function ForestECoastTile() {
	this.name = "ForestECoast";
	this.graphic = "forestEcoast.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .4;
  this.losatdistance = { distance : 5 , blocklos : .8 };
  this.desc = "forest";
}
ForestECoastTile.prototype = new TerrainObject;

function ForestSCoastTile() {
	this.name = "ForestSCoast";
	this.graphic = "forestScoast.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .4;
  this.losatdistance = { distance : 5 , blocklos : .8 };
  this.desc = "forest";
}
ForestSCoastTile.prototype = new TerrainObject;

function ForestWCoastTile() {
	this.name = "ForestWCoast";
	this.graphic = "forestWcoast.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .4;
  this.losatdistance = { distance : 5 , blocklos : .8 };
  this.desc = "forest";
}
ForestWCoastTile.prototype = new TerrainObject;

function HillsTile() {
  this.name = "Hills";
  this.graphic = "124.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
//  this.blocklos = .3;
//  this.losatdistance = { distance : 5 , blocklos : .5 };
  this.desc = "hills";
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
  this.desc = "roof";
}
ShinglesTile.prototype = new TerrainObject;

function ShinglesTopTile() {
  this.name = "ShinglesTop";
  this.graphic = "shingles-top.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "roof";
}
ShinglesTopTile.prototype = new TerrainObject;

function CaveFloorTile() {
	this.name = "CaveFloor";
	this.graphic = "cavefloor.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "cave floor";
	
	Tiling.call(this, 2);
}
CaveFloorTile.prototype =  new TerrainObject;

function CaveWallTile() {
	this.name = "CaveWall";
	this.graphic = "cavewall.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1;
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
  this.graphic = "147.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK + MOVE_SWIM;
  this.blocklos = 0;
  this.desc = "lava";
  
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
  this.setType("feature");
}
FeatureObject.prototype = new InanimateObject;


function DungeonTile() {
  this.name = "Dungeon";
  this.graphic = "151.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
DungeonTile.prototype = new FeatureObject;

function CaveTile() {
  this.name = "Cave";
  this.graphic = "cave.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a cave entrance";

  Enterable.call(this, "null", 0, 0);
}
CaveTile.prototype = new FeatureObject;

function TowneTile() {
  this.name = "Towne";
  this.graphic = "152.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a towne";

  Enterable.call(this, "null", 0, 0);
}
TowneTile.prototype = new FeatureObject;

function KeepTile() {
  this.name = "Keep";
  this.graphic = "153.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a keep";

  Enterable.call(this, "null", 0, 0);
}
KeepTile.prototype = new FeatureObject;

function GrassTowerTile() {
  this.name = "GrassTower";
  this.graphic = "tower-grass.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a tower";

  Enterable.call(this, "null", 0, 0);
}
GrassTowerTile.prototype = new FeatureObject;

function HillTowerTile() {
  this.name = "HillTower";
  this.graphic = "tower-hill.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a tower";

  Enterable.call(this, "null", 0, 0);
}
HillTowerTile.prototype = new FeatureObject;

function VillageTile() {
  this.name = "Village";
  this.graphic = "154.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a village";

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

function ShrineTile() {
  this.name = "Shrine";
  this.graphic = "156.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a gate";

//  Enterable.call(this, "null", 0, 0);
}
ShrineTile.prototype = new FeatureObject;

function BrokenShrineTile() {
  this.name = "BrokenShrine";
  this.graphic = "brokengate.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a broken gate";

//  Enterable.call(this, "null", 0, 0);
}
BrokenShrineTile.prototype = new FeatureObject;

function RuinsTile() {
  this.name = "Ruins";
  this.graphic = "157.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a ruin";

  Enterable.call(this, "null", 0, 0);
}
RuinsTile.prototype = new FeatureObject;

function ChestTile() {
  Lockable.call(this, "008.gif", "008.gif", "008.gif", 	"a chest", "a locked chest", "a magically locked chest");
	this.name = "Chest";
	this.graphic = "008.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
	this.desc = "a chest";
	
}
ChestTile.prototype = new FeatureObject;

function DoorWindowTile() {
  Lockable.call(this, "009.gif", "010.gif", "067.gif", "a door", "a locked door", "a magically locked door");
	
	this.name = "DoorWindow";
	this.graphic = "009.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = { distance : 1 , blocklos : 0 };
	this.desc = "a door";

}
DoorWindowTile.prototype = new FeatureObject;

function CorpseTile() {
	this.name = "Corpse";
	this.graphic = "012.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "a corpse";
}
CorpseTile.prototype = new FeatureObject;

function EnergyFieldTile() {
	this.name = "EnergyField";
	this.graphic = "021.gif";
	this.passable = 0; // impassable - wonky outdoors, but necessary indoors
	this.blocklos = 0;
//	this.light = 1; 
	this.desc = "an energy field";
	
	LightEmitting.call(this, 1);
}
EnergyFieldTile.prototype = new FeatureObject;

function CampfireTile() {
	this.name = "Campfire";
	this.graphic = "022.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
//	this.light = 2;  // 2 tiles of "bright"
	this.desc = "a campfire";
	
	LightEmitting.call(this, 2);
}
CampfireTile.prototype = new FeatureObject;

function AltarTile() {
	this.name = "Altar";
	this.graphic = "023.gif";
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.desc = "an altar";
}
AltarTile.prototype = new FeatureObject;

function DoorTile() {
  Lockable.call(this, "064.gif", "065.gif", "066.gif", "a door", "a locked door", "a magically locked door");
  	
	this.name = "Door";
	this.graphic = "064.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.desc = "a door";

}
DoorTile.prototype = new FeatureObject;

function SleepFieldTile() {
	this.name = "SleepField";
	this.graphic = "142.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 1;
	this.desc = "a sleep field";
	
	LightEmitting.call(this, 1);
}
SleepFieldTile.prototype = new FeatureObject;

function FireFieldTile() {
	this.name = "FireField";
	this.graphic = "143.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 3;
	this.desc = "a fire field";
	
	LightEmitting.call(this, 3);
}
FireFieldTile.prototype = new FeatureObject;

function PoisonFieldTile() {
	this.name = "PoisonField";
	this.graphic = "144.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 1;
	this.desc = "a poison field";
	
	LightEmitting.call(this, 1);
}
PoisonFieldTile.prototype = new FeatureObject;

function LadderDownTile() {
  this.name = "LadderDown";
  this.graphic = "158.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a ladder";

  Enterable.call(this, "null", 0, 0);
}
LadderDownTile.prototype = new FeatureObject;

function LadderUpTile() {
  this.name = "LadderUp";
  this.graphic = "159.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a ladder";

  Enterable.call(this, "null", 0, 0);
}
LadderUpTile.prototype = new FeatureObject;

function WBridgeNSTile() {
  this.name = "WBridgeNS";
  this.graphic = "070.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a bridge";
}
WBridgeNSTile.prototype = new FeatureObject;

function EBridgeNSTile() {
  this.name = "EBridgeNS";
  this.graphic = "071.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a bridge";
}
EBridgeNSTile.prototype = new FeatureObject;

function BridgeNSTile() {
  this.name = "BridgeNS";
  this.graphic = "072.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a bridge";
}
BridgeNSTile.prototype = new FeatureObject;

function NBridgeEWTile() {
  this.name = "NBridgeEW";
  this.graphic = "101.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a bridge";
}
NBridgeEWTile.prototype = new FeatureObject;

function SBridgeEWTile() {
  this.name = "SBridgeEW";
  this.graphic = "102.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a bridge";
}
SBridgeEWTile.prototype = new FeatureObject;

function BridgeEWTile() {
  this.name = "BridgeEW";
  this.graphic = "126.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a bridge";
}
BridgeEWTile.prototype = new FeatureObject;

function LeftChairTile() {
  this.name = "LeftChair";
  this.graphic = "leftchair.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a chair";
}
LeftChairTile.prototype = new FeatureObject;

function RightChairTile() {
  this.name = "RightChair";
  this.graphic = "rightchair.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a chair";
}
RightChairTile.prototype = new FeatureObject;

function TopChairTile() {
  this.name = "TopChair";
  this.graphic = "topchair.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a chair";
}
TopChairTile.prototype = new FeatureObject;

function BottomChairTile() {
  this.name = "BottomChair";
  this.graphic = "bottomchair.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "a chair";
}
BottomChairTile.prototype = new FeatureObject;

function SecretDoorTile() {
	this.name = "SecretDoor";
	this.graphic = "056.gif";   // note: 024 is U4's secret door
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.desc = "a wall";
}
SecretDoorTile.prototype = new FeatureObject;

function WellTile() {
	this.name = "Well";
	this.graphic = "well.gif";   
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.desc = "a well";
}
WellTile.prototype = new FeatureObject;

function WhirlpoolTile() {
	this.name = "Whirlpool";
	this.graphic = "325.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.desc = "a whirlpool";
  
  Enterable.call(this, "null", 0, 0);
}
WhirlpoolTile.prototype = new FeatureObject;

// NPCs

function AnimateObject() {
	this.altGraphics = new Array;
}
AnimateObject.prototype = new GameObject;

AnimateObject.prototype.pickGraphic = new function() {
	if (this.altGraphics) {
  	var options = this.altGraphics.length;
	  if (options > 0) {
		  var randomnumber=Math.floor(Math.random()*options);
		  this.setGraphic(altGraphics[randomnumber]);
	  }
	}
}

function NPCObject() {
	this.str = 10;
	this.dex = 10;
	this.int = 10
	this.hp = 10;
	this.level = 0
	this.type = "npc";
	this.npcname = "myname";
	this.desc = "an NPC";
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.ThreatenedAI = "spellcaster";
	this.graphic = "301.gif";
	this.meleeAttackAs = "fists";
	this.missileAttackAs = "none";
	this.initmult = 1;
	this.movetype = MOVE_WALK;
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

NPCObject.prototype.getMelee = function() {
	return this.meleeAttackAs;
}

NPCObject.prototype.setMelee = function(melee) {
	this.meleeAttackAs = melee;
	return this.meleeAttackAs;
}

NPCObject.prototype.getMissile = function() {
	return this.missileAttackAs;
}

NPCObject.prototype.setMissile = function(missile) {
	this.missileAttackAs = missile;
	return this.missileAttackAs;
}

NPCObject.prototype.nextActionTime = function() {

  var isQuick = 0;  // replace with a check for the presence of the Quickness spell.
  var init = ((-1/60) * this.getdex() + (7/6)) * this.initmult * (1 - .5 * isQuick);
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

NPCObject.prototype.moveMe = function(diffx,diffy,forcemove) {
	var map = this.getHomeMap();
	var tile = map.getTile(this.getx()+diffx,this.gety()+diffy);
	
	var retval = tile.getBumpIntoResult(this);
	if (retval["canmove"] == 0) { return retval; }
	var moveval = tile.canMoveHere(this, map.getTile(this.getx(),this.gety()));
	retval["canmove"] = moveval["canmove"];
	if (retval["msg"] == "") {
		if (moveval["msg"] == "") { retval["msg"] = "."; }
		else { retval["msg"] = " - " + moveval["msg"]; }
	}
	else {
		if (moveval["msg"] != "") {
			retval["msg"] += "\n" + moveval["msg"];
		}
	}
	
	if (retval["canmove"] == 1) {
		map.moveThing(this.getx()+diffx,this.gety()+diffy,PC);
		drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
		var walkonval = tile.executeWalkons(this);
	}
	return retval;
}

function NPCGroup() {
	
}
NPCGroup.prototype = new AnimateObject;

// Start the NPCs!
function DruidVillagerNPCTile() {
	this.name = "DruidVillagerNPC";
	this.level = 1;
	this.str = 10;
	this.dex = 12;
	this.int = 14;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "spellcaster";
	this.graphic = "302.gif";
	this.meleeAttackAs = "fists";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
DruidVillagerNPCTile.prototype = new NPCObject;

function ShepherdVillagerNPCTile() {
	this.name = "ShepherdVillagerNPC";
	this.level = 1;
	this.str = 12;
	this.dex = 12;
	this.int = 12;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "melee";
	this.graphic = "301.gif";
	this.meleeAttackAs = "dagger";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
ShepherdVillagerNPCTile.prototype = new NPCObject;

function MageVillagerNPCTile() {
	this.name = "MageVillagerNPC";
	this.level = 1;
	this.str = 10;
	this.dex = 10;
	this.int = 16;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "spellcaster";
	this.graphic = "303.gif";
	this.meleeAttackAs = "fists";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
MageVillagerNPCTile.prototype = new NPCObject;

function TinkerVillagerNPCTile() {
	this.name = "TinkerVillagerNPC";
	this.level = 1;
	this.str = 12;
	this.dex = 14;
	this.int = 10;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "missile";
	this.graphic = "304.gif";
	this.meleeAttackAs = "dagger";
	this.missileAttackAs = "sling";
	this.movetype = MOVE_WALK;
}
TinkerVillagerNPCTile.prototype = new NPCObject;

function RangerVillagerNPCTile() {
	this.name = "RangerVillagerNPC";
	this.level = 1;
	this.str = 11;
	this.dex = 14;
	this.int = 11;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "ranger";
	this.graphic = "305.gif";
	this.meleeAttackAs = "dagger";
	this.missileAttackAs = "sling";
	this.movetype = MOVE_WALK;
}
RangerVillagerNPCTile.prototype = new NPCObject;

function AdventurerVillagerNPCTile() {
	this.name = "AdventurerVillagerNPC";
	this.level = 1;
	this.str = 12;
	this.dex = 12;
	this.int = 12;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "adventurer";
	this.graphic = "306.gif";
	this.meleeAttackAs = "shortsword";
	this.missileAttackAs = "sling";
	this.movetype = MOVE_WALK;
}
AdventurerVillagerNPCTile.prototype = new NPCObject;

function PaladinVillagerNPCTile() {
	this.name = "PaladinVillagerNPC";
	this.level = 1;
	this.str = 14;
	this.dex = 10;
	this.int = 12;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "paladin";
	this.graphic = "307.gif";
	this.meleeAttackAs = "shortsword";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
PaladinVillagerNPCTile.prototype = new NPCObject;

function FighterVillagerNPCTile() {
	this.name = "FighterVillagerNPC";
	this.level = 1;
	this.str = 14;
	this.dex = 12;
	this.int = 10;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "melee";
	this.graphic = "308.gif";
	this.meleeAttackAs = "shortsword";
	this.missileAttackAs = "sling";
	this.movetype = MOVE_WALK;
}
FighterVillagerNPCTile.prototype = new NPCObject;

function TownsfolkVillagerNPCTile() {
	this.name = "TownsfolkVillagerNPC";
	this.level = 1;
	this.str = 10;
	this.dex = 10;
	this.int = 10;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "melee";
	this.graphic = "310.gif";
	this.meleeAttackAs = "dagger";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
TownsfolkVillagerNPCTile.prototype = new NPCObject;

function BardVillagerNPCTile() {
	this.name = "BardVillagerNPC";
	this.level = 1;
	this.str = 10;
	this.dex = 14;
	this.int = 12;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "ranger";
	this.graphic = "311.gif";
	this.meleeAttackAs = "dagger";
	this.missileAttackAs = "bow";
	this.movetype = MOVE_WALK;
}
BardVillagerNPCTile.prototype = new NPCObject;

function ChildNPCTile() {
	this.name = "ChildNPC";
	this.level = 1;
	this.str = 7;
	this.dex = 7;
	this.int = 7;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "runaway";
	this.graphic = "312.gif";
	this.meleeAttackAs = "fists";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
ChildNPCTile.prototype = new NPCObject;

function BeggerNPCTile() {
	this.name = "BeggerNPC";
	this.level = 1;
	this.str = 7;
	this.dex = 7;
	this.int = 7;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "runaway";
	this.graphic = "313.gif";
	this.meleeAttackAs = "fists";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
BeggerNPCTile.prototype = new NPCObject;

function TownGuardNPCTile() {
  this.name = "TownGuardNPC";
	this.level = 5;
	this.str = 23;
	this.dex = 23;
	this.int = 14;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "guard";
	this.PCThreatAI = "melee";
	this.threatenedAI = "melee";
	this.graphic = "309.gif";
	this.meleeAttackAs = "halberd";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
TownGuardNPCTile.prototype = new NPCObject;

function KingNPCTile() {
  this.name = "KingNPC";
	this.level = 8;
	this.str = 30;
	this.dex = 30;
	this.int = 30;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "spellcaster";
	this.threatenedAI = "spellcaster";
	this.graphic = "315.gif";
	this.meleeAttackAs = "halberd";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
KingNPCTile.prototype = new NPCObject;

function PrinceNPCTile() {
  this.name = "PrinceNPC";
	this.level = 7;
	this.str = 25;
	this.dex = 25;
	this.int = 25;
	this.alignment = "good";
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "townsfolk";
	this.threatenedAI = "melee";
	this.graphic = "300.gif";
	this.meleeAttackAs = "longsword";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
PrinceNPCTile.prototype = new NPCObject;




function PCObject() {
	this.name = "PC";
	this.str = 10;
	this.dex = 10;
	this.int = 10
	this.level = 1
	this.type = "pc";
	this.pcname = "Goldenflame";
	this.desc = "you";
	this.alignment = "good";	
	this.graphic = "300.gif";
	this.meleeAttackAs = "fists";
	this.missileAttackAs = "none";
	this.maxhp = 30 * this.level;
	this.hp = this.maxhp;
	this.maxmana = this.int;
	this.mana = this.maxmana;
	this.movetype = MOVE_WALK;
	
	LightEmitting.call(this, 1);
}
PCObject.prototype = new NPCObject;

PCObject.prototype.myTurn = function() {
	gamestate.setMode("base");
}

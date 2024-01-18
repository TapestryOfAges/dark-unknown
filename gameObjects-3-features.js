"use strict";

// Features!
function FeatureObject() {
  this.addType("Feature");
  this.searchYield = [];   // be careful here
  this.showSearched = 0;
  this.searchDelete = 0;
  this.gold = 0;
}
FeatureObject.prototype = new InanimateObject();

FeatureObject.prototype.setGold = function(newgold) {
  newgold = parseInt(newgold);
	this.gold = newgold;
}

FeatureObject.prototype.getGold = function() {
	return parseInt(this.gold);
}

FeatureObject.prototype.addGold = function(diffgold) {
  diffgold = parseInt(diffgold);
  if (!isNaN(diffgold)) {
    this.gold += diffgold;
  }
  return this.gold;
}

FeatureObject.prototype.getSearchYield = function() {
  return this.searchYield;
}

FeatureObject.prototype.setSearchYield = function(searchable) {
  // searchable must be an array, even if an empty one
  if (!searchable) {
    delete this.searchYield;
  } else if (Array.isArray(searchable)) {
    this.searchYield = searchable;
  }
}

FeatureObject.prototype.addToSearchYield = function(searchable) {
  if (!this.searchYield.length) {
    this.searchYield = [];
  }
  this.searchYield.push(searchable);
}

FeatureObject.prototype.getSearchDelete = function() {
  return this.searchDelete;
}

FeatureObject.prototype.setSearchDelete = function(sd) {
  this.searchDelete = sd;
  return this.searchDelete;
}

FeatureObject.prototype.getShowSearched = function() {
  return this.showSearched;
}

FeatureObject.prototype.setShowSearched = function(showsearch) {
  this.showSearched = showsearch;
  return this.showSearched;
}

FeatureObject.prototype.getSearchedGraphic = function() {
  if (this.searchedgraphic) {
    return this.searchedgraphic;  // should be a graphic array
  }
}

FeatureObject.prototype.getSearchDesc = function() {
  return this.searchDesc;
}

FeatureObject.prototype.getSearchPrefix = function() {
  return this.searchPrefix;
}

FeatureObject.prototype.getAlternateSearchText = function() {
  return this.alternateSearchText; 
}

FeatureObject.prototype.getLootgroup = function() {
  return this.lootgroup;
}

FeatureObject.prototype.setLootgroup = function(lg) {
  this.lootgroup = lg;
  return this.lootgroup;
}

FeatureObject.prototype.getLootedID = function() {
  return this.lootedid;
}

FeatureObject.prototype.setLootedID = function(lid) {
  this.lootedid = lid;
  return this.lootedid;
}

// end definitions, begin features

function PlaceholderTile() {
  //This is used to play spell effects over
  this.name = "Placeholder";
  this.graphic = "spacer.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "nothing";
}
PlaceholderTile.prototype = new FeatureObject();

function CastleGrassTile() {
  this.name = "CastleGrass";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  this.combatmap = "Grass"; 
}
CastleGrassTile.prototype = new FeatureObject();

CastleGrassTile.prototype.bumpinto = function(who) {
	let retval = {};
	retval["canmove"] = 1;
	retval["msg"] = "";
	
	if ((who.getx() === this.getx()) && ((this.gety() - who.gety()) === -1)) {
	  // mover is moving north from the castle
	  retval["canmove"] = 0;
	  retval["msg"] = "Blocked!";
	}
  return(retval);
}

function LavaTile() {
  //Graphic Upgraded
  this.name = "Lava";
  this.graphic = "static.png";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK + MOVE_SWIM;
  this.blocklos = 0;
  this.desc = "lava";
  this.initdelay = 1.2;
  this.pathweight = 5;
  this.spritexoffset = 0;
  this.spriteyoffset = -165*32;
  
  HasAmbientNoise.call(this,"sfx_bubbling_lava",1.5);
  LightEmitting.call(this, 1);
  this.peerview = "#fc2000";

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 10,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 200,
    framedurationmax: 200,
    startframe: "start"
  });
}
LavaTile.prototype = new FeatureObject();

LavaTile.prototype.walkon = function(person) {
  // return messages, perform action
  var resp = InLava(person,this);
  return resp;
}

LavaTile.prototype.idle = function(person) {
  var resp = InLava(person,this);
  return resp;
}

LavaTile.prototype.isHostileTo = function(who) {
  if (who.getResist("fire") >= 100) { return 0; }
  return 1;
}

function InLava(who, lava) {
  if ((who.getMovetype() & MOVE_LEVITATE) || (who.getMovetype() & MOVE_FLY)) {
    who.dealDamage(Dice.roll("2d4+2"), lava, "fire");
  } else {
    who.dealDamage(Dice.roll("2d10+10"), lava, "fire");
  }
  return {msg:""};
}

function PurpleCarpetNWTile() {
  this.name = "PurpleCarpetNW";
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetNWTile.prototype = new FeatureObject();

function PurpleCarpetNTile() {
  this.name = "PurpleCarpetN";
  this.graphic = "static.png";
	this.spritexoffset = -32;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetNTile.prototype = new FeatureObject();

function PurpleCarpetNETile() {
  this.name = "PurpleCarpetNE";
  this.graphic = "static.png";
	this.spritexoffset = -2*32;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetNETile.prototype = new FeatureObject();

function PurpleCarpetWTile() {
  this.name = "PurpleCarpetW";
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetWTile.prototype = new FeatureObject();

function PurpleCarpetCTile() {
  this.name = "PurpleCarpetC";
  this.graphic = "static.png";
	this.spritexoffset = -32;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetCTile.prototype = new FeatureObject();

function PurpleCarpetETile() {
  this.name = "PurpleCarpetE";
  this.graphic = "static.png";
	this.spritexoffset = -2*32;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetETile.prototype = new FeatureObject();

function PurpleCarpetSWTile() {
  this.name = "PurpleCarpetSW";
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetSWTile.prototype = new FeatureObject();

function PurpleCarpetSTile() {
  this.name = "PurpleCarpetS";
  this.graphic = "static.png";
	this.spritexoffset = -32;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetSTile.prototype = new FeatureObject();

function PurpleCarpetSETile() {
  this.name = "PurpleCarpetSE";
  this.graphic = "static.png";
	this.spritexoffset = -2*32;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetSETile.prototype = new FeatureObject();

function FringeCarpetNWTile() {
  this.name = "FringeCarpetNW";
  this.graphic = "static.png";
	this.spritexoffset = -3*32;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetNWTile.prototype = new FeatureObject();

function FringeCarpetNTile() {
  this.name = "FringeCarpetN";
  this.graphic = "static.png";
	this.spritexoffset = -4*32;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetNTile.prototype = new FeatureObject();

function FringeCarpetNETile() {
  this.name = "FringeCarpetNE";
  this.graphic = "static.png";
	this.spritexoffset = -5*32;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetNETile.prototype = new FeatureObject();

function FringeCarpetWTile() {
  this.name = "FringeCarpetW";
  this.graphic = "static.png";
	this.spritexoffset = -3*32;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetWTile.prototype = new FeatureObject();

function FringeCarpetCTile() {
  this.name = "FringeCarpetC";
  this.graphic = "static.png";
	this.spritexoffset = -4*32;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetCTile.prototype = new FeatureObject();

function FringeCarpetETile() {
  this.name = "FringeCarpetE";
  this.graphic = "static.png";
	this.spritexoffset = -5*32;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetETile.prototype = new FeatureObject();

function FringeCarpetSWTile() {
  this.name = "FringeCarpetSW";
  this.graphic = "static.png";
	this.spritexoffset = -3*32;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetSWTile.prototype = new FeatureObject();

function FringeCarpetSTile() {
  this.name = "FringeCarpetS";
  this.graphic = "static.png";
	this.spritexoffset = -4*32;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetSTile.prototype = new FeatureObject();

function FringeCarpetSETile() {
  this.name = "FringeCarpetSE";
  this.graphic = "static.png";
	this.spritexoffset = -5*32;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetSETile.prototype = new FeatureObject();

function WoodenPillarTile() {
  this.name = "WoodenPillar";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .2;
  this.prefix = "a";
  this.desc = "pole";
}
WoodenPillarTile.prototype = new FeatureObject();

function MarblePillarTile() {
  //Graphics Upgraded
  this.name = "MarblePillar";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pillar";
}
MarblePillarTile.prototype = new FeatureObject();

function CrackedMarblePillarTile() {
  //Graphics Upgraded
  this.name = "CrackedMarblePillar";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pillar";
}
CrackedMarblePillarTile.prototype = new FeatureObject();

function BrokenMarblePillarTile() {
  //Graphics Upgraded
  this.name = "BrokenMarblePillar";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken pillar";
}
BrokenMarblePillarTile.prototype = new FeatureObject();

function FenceNSWTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceNSW";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -10*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceNSWTile.prototype = new FeatureObject();

function FenceWTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceW";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceWTile.prototype = new FeatureObject();

function FenceWBrokenTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceWBroken";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceWBrokenTile.prototype = new FeatureObject();

function FenceEBrokenTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceEBroken";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceEBrokenTile.prototype = new FeatureObject();

function FenceETile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceE";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceETile.prototype = new FeatureObject();

function FencePostTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FencePost";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FencePostTile.prototype = new FeatureObject();

function FenceBrokenPostTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceBrokenPost";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceBrokenPostTile.prototype = new FeatureObject();

function FenceNSEWTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceNSEW";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceNSEWTile.prototype = new FeatureObject();

function FenceNWTile() {
  //Graphics Upgraded
  this.name = "FenceNW";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceNWTile.prototype = new FeatureObject();

function FenceNETile() {
  //Graphics Upgraded
  this.name = "FenceNE";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceNETile.prototype = new FeatureObject();

function FenceEWTile() {
  //Graphics Upgraded
  this.name = "FenceEW";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceEWTile.prototype = new FeatureObject();

function FenceSETile() {
  //Graphics Upgraded
  this.name = "FenceSE";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceSETile.prototype = new FeatureObject();

function FenceSWTile() {
  //Graphics Upgraded
  this.name = "FenceSW";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceSWTile.prototype = new FeatureObject();

function FenceNSTile() {
  //Graphics Upgraded
  this.name = "FenceNS";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceNSTile.prototype = new FeatureObject();

function FenceEWSTile() {
  //Graphics Upgraded
  this.name = "FenceEWS";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceEWSTile.prototype = new FeatureObject();

function FenceEWNTile() {
  //Graphics Upgraded
  this.name = "FenceEWN";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceEWNTile.prototype = new FeatureObject();

function FenceENSTile() {
  //Graphics Upgraded
  this.name = "FenceENS";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceENSTile.prototype = new FeatureObject();

function FenceEWGateTile() {
  //Graphics Upgraded
	this.name = "FenceEWGate";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -12*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "gate";

  this.pathweight = 2; 

  Openable.call(this, ["static.png", "", -7*32, -12*32], ["static.png", "", 0, -11*32], 0, "sfx_fence_open", "sfx_fence_close", "sfx_locked_door");
}
FenceEWGateTile.prototype = new FeatureObject();

FenceEWGateTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function StatueBaseTile() {
  // Graphics Upgraded
  this.name = "StatueBase";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -93*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "statue";
}
StatueBaseTile.prototype = new FeatureObject();

function StatueTopTile() {
  //Graphics Upgraded
  this.name = "StatueTop";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -92*32;
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_SWIM + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "statue";
  this.alwaystop = 1;
}
StatueTopTile.prototype = new FeatureObject();

function Statue1Tile() {
  //Graphics Upgraded
  this.name = "Statue1";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -94*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "statue";
}
Statue1Tile.prototype = new FeatureObject();

function Statue2Tile() {
  //Graphics Upgraded
  this.name = "Statue2";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -94*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "statue";
}
Statue2Tile.prototype = new FeatureObject();

function Statue3Tile() {
  //Graphics Upgraded
  this.name = "Statue3";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -94*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sculpture";
}
Statue3Tile.prototype = new FeatureObject();

function Statue4Tile() {
  //Graphics Upgraded
  this.name = "Statue4";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -94*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sculpture";
}
Statue4Tile.prototype = new FeatureObject();

function Statue5Tile() {
  //Graphics Upgraded
  this.name = "Statue5";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sculpture";
}
Statue5Tile.prototype = new FeatureObject();

function Statue6Tile() {
  //Graphics Upgraded
  this.name = "Statue6";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sculpture";
}
Statue6Tile.prototype = new FeatureObject();

function PaintingCrossTile() {
  //Graphics Upgraded
  this.name = "PaintingCross";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "painting";
}
PaintingCrossTile.prototype = new FeatureObject();

function PaintingGreenTile() {
  //Graphics Upgraded
  this.name = "PaintingGreen";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "painting";
}
PaintingGreenTile.prototype = new FeatureObject();

function PaintingPurpleTile() {
  //Graphics Upgraded
  this.name = "PaintingPurple";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "painting";
}
PaintingPurpleTile.prototype = new FeatureObject();

function PaintingTreeTile() {
  //Graphics Upgraded
  this.name = "PaintingTree";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "painting";
}
PaintingTreeTile.prototype = new FeatureObject();

function PedestalTile() {
  this.name = "Pedestal";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-576";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pedestal";
}
PedestalTile.prototype = new FeatureObject();

function WoodSignTile() {
  this.name = "WoodSign";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -106*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign";
}
WoodSignTile.prototype = new FeatureObject();

function WoodSign1Tile() {
  this.name = "WoodSign1";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-608";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign";
}
WoodSign1Tile.prototype = new FeatureObject();

function WoodSign2Tile() {
  this.name = "WoodSign2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-608";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign";
}
WoodSign2Tile.prototype = new FeatureObject();

function WoodSign3Tile() {
  this.name = "WoodSign3";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-608";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign";
}
WoodSign3Tile.prototype = new FeatureObject();

function WoodSign4Tile() {
  this.name = "WoodSign4";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-608";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign";
}
WoodSign4Tile.prototype = new FeatureObject();

function CoralTile() {
  this.name = "Coral";
  this.graphic = "coral.gif";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "coral reef";
  this.peerview = "white";
  
  LightEmitting.call(this, 1);
}
CoralTile.prototype = new FeatureObject();

function WorldsEndingRaftTile() {
  //Graphics Upgraded
  this.name = "WorldsEndingRaft";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "raft";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
WorldsEndingRaftTile.prototype = new FeatureObject();

function WorldsEndingCenterRaftTile() {
  //Graphics Upgraded
  this.name = "WorldsEndingCenterRaft";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "raft";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
WorldsEndingCenterRaftTile.prototype = new FeatureObject();

WorldsEndingCenterRaftTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  }
}

WorldsEndingCenterRaftTile.prototype.myTurn = function() {
  let mymap = this.getHomeMap();
  if (!maps.getMap(mymap.getName())) {

    if (!DebugWrite("gameobj", "<span style='font-weight:bold'>Raft " + this.getSerial() + " removed from game- map gone.</span><br />")) {
      DebugWrite("magic", "<span style='font-weight:bold'>Raft " + this.getSerial() + " removed from game- map gone.</span><br />");
    }

    return 1;
  }
  
  let lever = mymap.getTile(40,28).getTopFeature();
  if (lever.spritexoffset === -9*32) {
    // raft only moves if lever is set to ON
    let movedir = "";
    if ((this.getx() >= 34) && (this.getx() <= 48) && (this.gety() === 24)) { movedir = "E"; }
    else if ((this.getx() === 49) && (this.gety() === 24)) { movedir = "N"; }
    else if ((this.getx() === 49) && (this.gety() === 23)) { movedir = "E"; }
    else if ((this.getx() === 50) && (this.gety() === 23)) { movedir = "N"; }
    else if ((this.getx() >= 50) && (this.getx() <= 53) && (this.gety() === 22)) { movedir = "E"; }
    else if ((this.getx() === 54) && (this.gety() === 22)) { movedir = "N"; }
    else if ((this.getx() >= 54) && (this.getx() <= 55) && (this.gety() === 21)) { movedir = "E"; }
    else if ((this.getx() === 56) && (this.gety() <= 21) && (this.gety() >= 16)) { movedir = "N"; }
    else if ((this.getx() === 56) && (this.gety() === 15)) { movedir = "W"; }
    else if ((this.getx() === 55) && (this.gety() === 15)) { movedir = "N"; }
    else if ((this.getx() === 55) && (this.gety() === 14)) { movedir = "N"; }
    else if ((this.getx() <= 55) && (this.getx() >= 43) && (this.gety() === 13)) { movedir = "W"; }
    else if ((this.getx() === 42) && (this.gety() === 13)) { movedir = "S"; }
    else if ((this.getx() <= 42) && (this.getx() >= 35) && (this.gety() === 14)) { movedir = "W"; }
    else if ((this.getx() === 34) && (this.gety() === 14)) { movedir = "S"; }
    else if ((this.getx() <= 34) && (this.getx() >= 32) && (this.gety() === 15)) { movedir = "W"; }
    else if ((this.getx() === 31) && (this.gety() === 15)) { movedir = "S"; }
    else if ((this.getx() === 31) && (this.gety() === 16)) { movedir = "W"; }
    else if ((this.getx() === 30) && (this.gety() <= 21) && (this.gety() >= 15)) { movedir = "S"; }
    else if ((this.getx() === 30) && (this.gety() === 22)) { movedir = "E"; }
    else if ((this.getx() === 31) && (this.gety() === 22)) { movedir = "S"; }
    else if ((this.getx() >= 31) && (this.getx() <= 33) && (this.gety() === 23)) { movedir = "E"; }
    else if ((this.getx() === 34) && (this.gety() === 23)) { movedir = "S"; }

    let spaces = [];
    if (!movedir) {
      alert("Failure to find myself: raft at " + this.getx() + "," + this.gety());
    } else if (movedir === "E") {
      spaces[0] = mymap.getTile(this.getx()+2,this.gety()-1);
      spaces[1] = mymap.getTile(this.getx()+2,this.gety());
      spaces[2] = mymap.getTile(this.getx()+2,this.gety()+1);
    } else if (movedir === "W") {
      spaces[0] = mymap.getTile(this.getx()-2,this.gety()-1);
      spaces[1] = mymap.getTile(this.getx()-2,this.gety());
      spaces[2] = mymap.getTile(this.getx()-2,this.gety()+1);
    } else if (movedir === "N") {
      spaces[0] = mymap.getTile(this.getx()-1,this.gety()-2);
      spaces[1] = mymap.getTile(this.getx(),this.gety()-2);
      spaces[2] = mymap.getTile(this.getx()+1,this.gety()-2);
    } else if (movedir === "S") {
      spaces[0] = mymap.getTile(this.getx()-1,this.gety()+2);
      spaces[1] = mymap.getTile(this.getx(),this.gety()+2);
      spaces[2] = mymap.getTile(this.getx()+1,this.gety()+2);
    }

    let blocked = 0;
    for (let i=0;i<=2;i++) {
      if (!spaces[i].canMoveHere(MOVE_SWIM).canmove) { blocked = 1; }
    }

    if (!blocked) {
      let raftparts = [];
      for (let i=-1;i<=1;i++) {
        for (let j=-1;j<=1;j++) {
          let feastack = mymap.getTile(this.getx()+i,this.gety()+j).getFeatures();
          for (let k=0;k<feastack.length;k++) { raftparts.push(feastack[k]); }
          let npcstack = mymap.getTile(this.getx()+i,this.gety()+j).getNPCs();
          for (let k=0;k<npcstack.length;k++) { raftparts.push(npcstack[k]); }
          if ((this.getx()+i === PC.getx()) && (this.gety()+j === PC.gety())) { raftparts.push(PC); }
        }
      }

      for (let i=0;i<raftparts.length;i++) {
        if (movedir === "E") {
          mymap.moveThing(raftparts[i].getx()+1,raftparts[i].gety(),raftparts[i]);
        } else if (movedir === "W") {
          mymap.moveThing(raftparts[i].getx()-1,raftparts[i].gety(),raftparts[i]);
        } else if (movedir === "N") {
          mymap.moveThing(raftparts[i].getx(),raftparts[i].gety()-1,raftparts[i]);
        } else if (movedir === "S") {
          mymap.moveThing(raftparts[i].getx(),raftparts[i].gety()+1,raftparts[i]);
        }
      }

      DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
    }

  }
   
  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
  return 1;
}

function PotentialReceptacleTile() {
  this.name = "PotentialReceptacle";
  this.graphic = "static.png";
  this.spritexoffset = 0*32;
  this.spriteyoffset = -97*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "metal platform with a hexagonal socket in the top";
}
PotentialReceptacleTile.prototype = new FeatureObject();

function WorldsEndingRaftSwitchTile() {
  //Graphic Upgraded
  this.name = "WorldsEndingRaftSwitch";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -107*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "large lever";
}
WorldsEndingRaftSwitchTile.prototype = new FeatureObject();

WorldsEndingRaftSwitchTile.prototype.use = function(who) {
  let retval = {fin:1};
  if (!DU.gameflags.getFlag("worldsendingraft")) { retval["txt"] = "The lever will not budge."; return retval; }

  if (this.spritexoffset === -8*32) { 
    this.spritexoffset = -9*32;
    retval["txt"] = "The lever moves with a satisfying click.";
    DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
  } else {
    this.spritexoffset = -8*32;
    retval["txt"] = "The lever moves with a satisfying click.";
    DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
  }
  return retval;
}

function DungeonTile() {
  //Graphics Upgraded
  this.name = "Dungeon";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -3*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
DungeonTile.prototype = new FeatureObject();

function Dungeon2Tile() {
  //Graphics Upgraded
  this.name = "Dungeon2";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon2Tile.prototype = new FeatureObject();

function Dungeon3Tile() {
  //Graphics Upgraded
  this.name = "Dungeon3";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon3Tile.prototype = new FeatureObject();

function Dungeon4Tile() {
  //Graphics Upgraded
  this.name = "Dungeon4";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon4Tile.prototype = new FeatureObject();

function Dungeon5Tile() {
  //Graphics Upgraded
  this.name = "Dungeon5";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon5Tile.prototype = new FeatureObject();

function Dungeon6Tile() {
  //Graphics Upgraded
  this.name = "Dungeon6";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon6Tile.prototype = new FeatureObject();

function Dungeon7Tile() {
  //Graphics Upgraded
  this.name = "Dungeon7";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon7Tile.prototype = new FeatureObject();

function CaveTile() {
  //Graphics Upgraded
  this.name = "Cave";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -3*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "cave entrance";

  Enterable.call(this, "null", 0, 0);
}
CaveTile.prototype = new FeatureObject();

function SecretCaveTile() {
  this.name = "SecretCave";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mountains";

  Enterable.call(this, "null", 0, 0);
}
SecretCaveTile.prototype = new FeatureObject();

SecretCaveTile.prototype.onSearched = function(who) {
  let retval = {};
  if (this.getDesc() === "mountain") {
    this.desc = "cave entrance";
    this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
    this.spritexoffset = -6*32;
    this.spriteyoffset = -3*32;
    retval.txt = "After careful inspection, you find the entrance to a cave!";
    retval.fin = 1;
    retval.exitOut = 1;
    DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
  }
  return retval;
}

function TowneTile() {
  //Graphics Upgraded
  this.name = "Towne";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -109*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "towne";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 200,
    startframe: "random"
  });
}
TowneTile.prototype = new FeatureObject();

function Towne2Tile() {
  //Graphics Upgraded
  this.name = "Towne2";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -110*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "towne";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 200,
    startframe: "random"
  });
}
Towne2Tile.prototype = new FeatureObject();

function Towne3Tile() {
  //Graphics Upgraded
  this.name = "Towne3";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "towne";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);
}
Towne3Tile.prototype = new FeatureObject();

function KeepTile() {
  //Graphics Upgraded
  this.name = "Keep";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -103*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "keep";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);

  ManualAnimation.call(this, { animstart: 0,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 250,
    startframe: "random"
  });
}
KeepTile.prototype = new FeatureObject();

function TowerTile() {
  this.name = "Tower";
	this.graphic = "static.png";
	this.spritexoffset = 0;
  this.spriteyoffset = -174*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tower";
  this.peerview = "#e0e0e0";

  Enterable.call(this, "null", 0, 0);

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 200,
    framedurationmax: 200,
    startframe: "start"
  });

}
TowerTile.prototype = new FeatureObject();

function LighthouseTile() {
  //Graphics Upgraded
  this.name = "Lighthouse";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -108*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lighthouse";
  this.peerview = "#e0e0e0";

  Enterable.call(this, "null", 0, 0);

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 8,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 200,
    framedurationmax: 200,
    startframe: "start"
  });
}
LighthouseTile.prototype = new FeatureObject();

function VillageTile() {
  //Graphics Upgraded
  this.name = "Village";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;  
  this.spriteyoffset = -3*32;  
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "village";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);
}
VillageTile.prototype = new FeatureObject();

function HotelPheranTile() {
  //Graphics Upgraded
  this.name = "HotelPheran";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "inn";
  this.peerview = "#00c000";
  this.civilized = 1;

  Enterable.call(this, "hotelcalifornia0", 7, 18);
}
HotelPheranTile.prototype = new FeatureObject();

HotelPheranTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,1);
  }
}

HotelPheranTile.prototype.myTurn = function() {
  if (DU.gameflags.getFlag("started_pheran")) {
    this.getHomeMap().deleteThing(this);
    DUTime.removeEntityFrom(this);
  } else {
    if ((this.getHomeMap() === PC.getHomeMap()) && (GetDistance(this.getx(),this.gety(),PC.getx(),PC.gety(),"square") <= 6)){
      this.onscreen = 1;
      // marks that the player has seen the hotel. Now it can start moving
    } else {
      if (this.onscreen && !IsVisibleOnScreen(this.getx(),this.gety())) {
        let choice = Dice.roll("1d7");
        if (choice === 1) { this.getHomeMap().moveThing(115,84,this); }
        else if (choice === 2) { this.getHomeMap().moveThing(114,43,this); }
        else if (choice === 3) { this.getHomeMap().moveThing(96,38,this); }
        else if (choice === 4) { this.getHomeMap().moveThing(49,17,this); }
        else if (choice === 5) { this.getHomeMap().moveThing(60,41,this); }
        else if (choice === 6) { this.getHomeMap().moveThing(42,84,this); }
        else if (choice === 7) { this.getHomeMap().moveThing(45,114,this); }
        console.log("Hotel Pheran moved!");
        console.log(`New coords: ${this.getx()},${this.gety()}.`);
      }
    }
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,50);  
  }
  return 1;
}

function CastleTile() {
  //Graphics Upgraded
  this.name = "Castle";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);
}
CastleTile.prototype = new FeatureObject();

CastleTile.prototype.bumpinto = function(who) {
	let retval = {};
	retval["canmove"] = 1;
	retval["msg"] = "";
	
	if ((who.getx() === this.getx()) && ((this.gety() - who.gety()) === 1)) {
	  // mover is north of the castle, block
	  retval["canmove"] = 0;
	  retval["msg"] = "Blocked!";
	}
  return(retval);
}

function LeftCastleTile() {
  //Graphics Upgraded
  this.name = "LeftCastle";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
LeftCastleTile.prototype = new FeatureObject();

function RightCastleTile() {
  //Graphics Upgraded
  this.name = "RightCastle";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
RightCastleTile.prototype = new FeatureObject();

function FarLeftCastleTile() {
  //Graphics Upgraded
  this.name = "FarLeftCastle";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
FarLeftCastleTile.prototype = new FeatureObject();

function FarRightCastleTile() {
  //Graphics Upgraded
  this.name = "FarRightCastle";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
FarRightCastleTile.prototype = new FeatureObject();

function UpperFarLeftCastleTile() {
  //Graphics Upgraded
  this.name = "UpperFarLeftCastle";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
UpperFarLeftCastleTile.prototype = new FeatureObject();

function UpperFarRightCastleTile() {
  //Graphics Upgraded
  this.name = "UpperFarRightCastle";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
UpperFarRightCastleTile.prototype = new FeatureObject();

function UpperLeftCastleTile() {
  //Graphics Upgraded
  this.name = "UpperLeftCastle";
	this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -99*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  ManualAnimation.call(this, { animstart: -4*32,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
UpperLeftCastleTile.prototype = new FeatureObject();

function UpperRightCastleTile() {
  //Graphics Upgraded
  this.name = "UpperRightCastle";
	this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -99*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  ManualAnimation.call(this, { animstart: 0,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });

}
UpperRightCastleTile.prototype = new FeatureObject();

function UpperCenterCastleTile() {
  //Graphics Upgraded
  this.name = "UpperCenterCastle";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
UpperCenterCastleTile.prototype = new FeatureObject();

function PileOfRocksTile() {
  this.name = "PileOfRocks";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pile of rocks";
  this.peerview = "#606060";
}
PileOfRocksTile.prototype = new FeatureObject();

function PushablePileOfRocksTile() {
  this.name = "PushablePileOfRocks";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-672";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pile of rocks";
  this.peerview = "#606060";
  Pushable.call(this);
}
PushablePileOfRocksTile.prototype = new FeatureObject();

function DoorwayTile() {
  //Graphics Upgraded
  this.name = "Doorway";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -16*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
DoorwayTile.prototype = new FeatureObject();

function DoorwayDarkenedTile() {
  //Graphics Upgraded
  this.name = "DoorwayDarkened";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -96*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
DoorwayDarkenedTile.prototype = new FeatureObject();

function GreyDoorwayTile() {
  //Graphics Upgraded
  this.name = "GreyDoorway";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -17*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
GreyDoorwayTile.prototype = new FeatureObject();

function GreyDoorwayDarkenedTile() {
  //Graphics Upgraded
  this.name = "GreyDoorwayDarkened";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -96*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
GreyDoorwayDarkenedTile.prototype = new FeatureObject();

function DaemonDoorwayTile() {
  this.name = "DaemonDoorway";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-704";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
DaemonDoorwayTile.prototype = new FeatureObject();

function StoneDoorwayTile() {
  this.name = "StoneDoorway";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-832";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
StoneDoorwayTile.prototype = new FeatureObject();

function StoneDoorwayDarkenedTile() {
  this.name = "StoneDoorwayDarkened";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -96*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
StoneDoorwayDarkenedTile.prototype = new FeatureObject();

function WallDoorwayTile() {
  this.name = "WallDoorway";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -17*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
WallDoorwayTile.prototype = new FeatureObject();

function ShrineTile() {
  //Graphics Upgraded
  this.name = "Shrine";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -3*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "gate";
  this.peerview = "#9d9d9d";
}
ShrineTile.prototype = new FeatureObject();

function BrokenShrineTile() {
  //Graphics Upgraded
  this.name = "BrokenShrine";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -3*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken gate";
  this.peerview = "#9d9d9d";
}
BrokenShrineTile.prototype = new FeatureObject();

function RuinsTile() {
  //Graphics Upgraded
  this.name = "Ruins";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -3*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ruin";
  this.peerview = "#e0e0e0";

  Enterable.call(this, "null", 0, 0);
}
RuinsTile.prototype = new FeatureObject();

function ChestTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-2*32,-78*32], ["static.png","",-2*32,-78*32], ["static.png","",-2*32,-78*32], 	"a",  "chest", "a", "locked chest", "a", "magically locked chest");
	this.name = "Chest";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -78*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_WALK + MOVE_LEVITATE;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "chest";
	
	this.lootgroup = "";
	this.lootedid = "";
	
	this.container = [];
	OpenContainer.call(this,"sfx_chest_open","sfx_locked_door");
	Pushable.call(this);
  this.flammable = 20;
  this.nopush = 1;
}
ChestTile.prototype = new FeatureObject();

ChestTile.prototype.flamed = function() {
  ContainerOnFire(this);
}

function ColinChestTile() {
	this.name = "ColinChest";
}
ColinChestTile.prototype = new ChestTile();

ColinChestTile.prototype.usecheck = function(who) {
  let colin = FindNPCByName("Colin",who.getHomeMap());
  if (colin) {
    if ((colin.getx() >= 24) && (colin.getx() <= 29) && (colin.gety() >= 51) && (colin.gety() <= 54)) {
      let ret = {}
      ret.retval = {};
      ret.retval["fin"] = 1;
      ret.retval["txt"] = 'Colin says, "Hey, stay away from that!" You pull your hand away from the chest.';
      ret.retval["input"] = "&gt;";
      ret.stop = 1;
      return ret;
    }
  }
  let ret = {};
  ret.stop = 0;
  return ret;
}

function WallDoor1Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-6*32,-16*32], ["static.png","",-6*32,-16*32], ["static.png","",-6*32,-16*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "WallDoor1";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -16*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-6*32,-16*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
WallDoor1Tile.prototype = new FeatureObject();

WallDoor1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function WallDoorWindow1Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-9*32,-15*32], ["static.png","",-9*32,-15*32], ["static.png","",-9*32,-15*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "WallDoorWindow1";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-9*32,-15*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
WallDoorWindow1Tile.prototype = new FeatureObject();

WallDoorWindow1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function WallDoorWindow1LitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-9*32,-15*32], ["static.png","",-9*32,-15*32], ["static.png","",-9*32,-15*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "WallDoorWindow1Lit";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-9*32,-15*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
WallDoorWindow1LitTile.prototype = new FeatureObject();

WallDoorWindow1LitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyDoor1Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-7*32,-18*32], ["static.png","",-7*32,-18*32], ["static.png","",-7*32,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "GreyDoor1";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-7*32,-18*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoor1Tile.prototype = new FeatureObject();

GreyDoor1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyDoorWindow1Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",0,-18*32], ["static.png","",0,-18*32], ["static.png","",0,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "GreyDoorWindow1";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",0,-18*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoorWindow1Tile.prototype = new FeatureObject();

GreyDoorWindow1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyDoorWindow1LitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-32,-18*32], ["static.png","",-32,-18*32], ["static.png","",-32,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "GreyDoorWindow1Lit";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-32,-18*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoorWindow1LitTile.prototype = new FeatureObject();

GreyDoorWindow1LitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function RuinsWallDoorWindow1Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-9*32,-13*32], ["static.png","",-9*32,-13*32], ["static.png","",-9*32,-13*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "RuinsWallDoorWindow1";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -13*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-9*32,-13*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoorWindow1Tile.prototype = new FeatureObject();

RuinsWallDoorWindow1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function RuinsWallDoorWindow1LitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",0,-14*32], ["static.png","",0,-14*32], ["static.png","",0,-14*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "RuinsWallDoorWindow1";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -14*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",0,-14*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoorWindow1LitTile.prototype = new FeatureObject();

RuinsWallDoorWindow1LitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function RuinsWallDoorWindow2Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-3*32,-14*32], ["static.png","",-4*32,-15*32], ["static.png","",-5*32,-14*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "RuinsWallDoorWindow2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -14*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-3*32,-14*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoorWindow2Tile.prototype = new FeatureObject();

RuinsWallDoorWindow2Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function RuinsWallDoorWindow2LitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-4*32,-14*32], ["static.png","",-5*32,-15*32], ["static.png","",-5*32,-14*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "RuinsWallDoorWindow2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -14*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-4*32,-14*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoorWindow2LitTile.prototype = new FeatureObject();

RuinsWallDoorWindow2LitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function DoorWindowTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-3*32,-16*32], ["static.png","",-2*32,-17*32], ["static.png","",-5*32,-16*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "DoorWindow";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -16*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-3*32,-16*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
DoorWindowTile.prototype = new FeatureObject();

DoorWindowTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function DoorWindowLitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-4*32,-16*32], ["static.png","",-3*32,-17*32], ["static.png","",-5*32,-16*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "DoorWindowLit";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -16*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-4*32,-16*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
DoorWindowLitTile.prototype = new FeatureObject();

DoorWindowLitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyDoorWindowTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-4*32,-18*32], ["static.png","",-9*32,-42*32], ["static.png","",-6*32,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "GreyDoorWindow";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-4*32,-18*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoorWindowTile.prototype = new FeatureObject();

GreyDoorWindowTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyDoorWindowLitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-5*32,-18*32], ["static.png","",-9*32,-47*32], ["static.png","",-6*32,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "GreyDoorWindowLit";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-5*32,-18*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoorWindowLitTile.prototype = new FeatureObject();

GreyDoorWindowLitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function StonePortcullisTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png", "", -2*32, -15*32], ["static.png", "", -2*32, -15*32], ["static.png", "", -2*32, -15*32], "a", "portcullis", "a", "portcullis", "a", "portcullis");
	
	this.name = "StonePortcullis";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "portcullis";
	this.heavy = 1;

  this.pathweight = 2; 

  Openable.call(this, ["static.png", "", -2*32, -15*32], ["static.png", "", 0, -15*32], 0, "sfx_portcullis_open", "sfx_portcullis_close", "sfx_locked_door");  
}
StonePortcullisTile.prototype = new FeatureObject();

StonePortcullisTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function StonePortcullisAlwaysClosedTile() {
	this.name = "StonePortcullisAlwaysClosed";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "portcullis";
	this.heavy = 1;

  this.pathweight = 2; 
}
StonePortcullisAlwaysClosedTile.prototype = new FeatureObject();

function WallPortcullisTile() {
  Lockable.call(this, ["static.png", "", -9*32, -16*32], ["static.png", "", -9*32, -16*32], ["static.png", "", -9*32, -16*32], "a", "portcullis", "a", "portcullis", "a", "portcullis");
	
	this.name = "WallPortcullis";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -16*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "portcullis";
	this.heavy = 1;

  this.pathweight = 2; 

  Openable.call(this, ["static.png", "", -9*32, -16*32], ["static.png", "", 0, -17*32], 0, "sfx_portcullis_open", "sfx_portcullis_close", "sfx_locked_door");  
}
WallPortcullisTile.prototype = new FeatureObject();

WallPortcullisTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyWallPortcullisTile() {
  Lockable.call(this, ["static.png", "", -4*32, -17*32], ["static.png", "", -4*32, -17*32], ["static.png", "", -4*32, -17*32], "a", "portcullis", "a", "portcullis", "a", "portcullis");
	
	this.name = "GreyWallPortcullis";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -17*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "portcullis";
	this.heavy = 1;

  this.pathweight = 2; 

  Openable.call(this, ["static.png", "", -4*32, -17*32], ["static.png", "", -5*32, -17*32], 0, "sfx_portcullis_open", "sfx_portcullis_close", "sfx_locked_door");  
}
GreyWallPortcullisTile.prototype = new FeatureObject();

GreyWallPortcullisTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function BloodyCorpseTile() {
  //Graphics Updated
  // if dark skinned, shift xoffset by -32
	this.name = "BloodyCorpse";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -78*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "corpse";
	this.showSearched = 1;
	
	Pushable.call(this);
}
BloodyCorpseTile.prototype = new FeatureObject();

function CorpseTile() {
  //Graphics Updated
  // if dark skinned, shift xoffset by -32
	this.name = "Corpse";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -77*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "corpse";
	this.showSearched = 1;
	
	Pushable.call(this);
}
CorpseTile.prototype = new FeatureObject();

function BloodTile() {
	this.name = "Blood";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -75*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "";
  this.desc = "blood";
  this.showSearched = 1;
}
BloodTile.prototype = new FeatureObject();

function EnergyFieldTile() {
	this.name = "EnergyField";
  this.graphic = "electricfield.gif";
	this.passable = 0; // impassable - wonky outdoors, but necessary indoors
	this.blocklos = 0;
	this.blockloe = 1;
  this.prefix = "an"; 
	this.desc = "energy field";
	
	LightEmitting.call(this, 1);
}
EnergyFieldTile.prototype = new FeatureObject();

EnergyFieldTile.prototype.bumpinto = function(who) {
  if (who === PC) {
    DUPlaySound("sfx_small_zap");
  }
  return {msg: ""};
}

function StreetLampTile() {
	this.name = "StreetLamp";
  this.graphic = "LampPost.png";
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "burning torch";

	LightEmitting.call(this, 4);

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 2,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });
}
StreetLampTile.prototype = new FeatureObject();  

function TorchWestTile() {
  //Graphics Upgraded
	this.name = "TorchWest";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -113*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "burning torch";

	LightEmitting.call(this, 2);

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });
}
TorchWestTile.prototype = new FeatureObject();  

TorchWestTile.prototype.use = function(who) {
  return UseTorch(who,this);
}

function TorchEastTile() {
  //Graphics Upgraded
	this.name = "TorchEast";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -114*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "burning torch";

	LightEmitting.call(this, 2);

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });
}
TorchEastTile.prototype = new FeatureObject();  

TorchEastTile.prototype.use = function(who) {
  return UseTorch(who,this);
}

function TorchWestOutTile() {
  //Graphics Upgraded
	this.name = "TorchWestOut";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -83*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "torch";
}
TorchWestOutTile.prototype = new FeatureObject();  

TorchWestOutTile.prototype.use = function(who) {
  return UseTorch(who,this);
}

function TorchEastOutTile() {
  //Graphics Upgraded
	this.name = "TorchEastOut";
	this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -83*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "torch";
}
TorchEastOutTile.prototype = new FeatureObject();  

TorchEastOutTile.prototype.use = function(who) {
  return UseTorch(who,this);
}

function UseTorch(who,torch) {
  let retval = {};
  let torchmap = torch.getHomeMap();
  let torchx = torch.getx();
  let torchy = torch.gety();

  let torchname = torch.getName();
  torchmap.deleteThing(torch);

  let newtorch;
  if (torchname === "TorchEast") {
    newtorch = localFactory.createTile("TorchEastOut");
    retval["txt"] = "Extinguished!";
  } else if (torchname === "TorchWest") {
    newtorch = localFactory.createTile("TorchWestOut");
    retval["txt"] = "Extinguished!";
  } else if (torchname === "TorchEastOut") {
    newtorch = localFactory.createTile("TorchEast");
    retval["txt"] = "You light the torch.";
  } else if (torchname === "TorchWestOut") {
    newtorch = localFactory.createTile("TorchWest");
    retval["txt"] = "You light the torch.";
  }

  torchmap.placeThing(torchx,torchy,newtorch);
  retval["fin"] = 1;
  if (torchmap === PC.getHomeMap()) {
    DrawMainFrame("draw",torchmap,PC.getx(),PC.gety());
  }

  return retval;
}

function WoodpileTile() {
	this.name = "Woodpile";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -76*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "wood pile";
}
WoodpileTile.prototype = new FeatureObject();

function CampfireTile() {
	this.name = "Campfire";
	this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -98*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "campfire";
	this.pathweight = 5;
	this.firedamage = "2d4";
	
	LightEmitting.call(this, 2);
	HasAmbientNoise.call(this,"sfx_fire_crackle",1.5);

  ManualAnimation.call(this, { animstart: -128,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });

}
CampfireTile.prototype = new FeatureObject();

CampfireTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  }
  return;
}

CampfireTile.prototype.walkon = function(person) {
  let resp = OnFire(person, this);
  return resp;
}
CampfireTile.prototype.idle = function(person) {
  let resp = OnFire(person, this);
  return resp;
}

CampfireTile.prototype.isHostileTo = function(who) {
  if (who.getResist("fire") >= 100) { return 0; }
  return 1;
}

CampfireTile.prototype.myTurn = function() {
  let mytile = this.getHomeMap().getTile(this.getx(),this.gety());
  let feas = mytile.getFeatures();
  for (let i=0;i<feas.length;i++) {
    if (feas[i].flammable) {
      if (Dice.roll("1d100") <= feas[i].flammable) {
        feas[i].flamed();
      }
    }
  };

  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
  return 1;  
}

function OnFire(who, what) {
  let dmg = Dice.roll(what.firedamage);
  dmg = (1/SCALE_TIME)*(DUTime.getGameClock() - who.getLastTurnTime()) * dmg;
  let response = {msg: "The " + what.getDesc() + " burns you!"};
  who.dealDamage(dmg, what, "fire");
  
  return response;
}

function CampfireExtinguishedTile() {
	this.name = "CampfireExtinguished";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-1760";  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "burned out campfire";
	this.pathweight = 5;
	
}
CampfireExtinguishedTile.prototype = new FeatureObject();

function BrazierTile() {
	this.name = "Brazier";
	this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -97*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "brazier";
	
	LightEmitting.call(this, 3);  
  ManualAnimation.call(this, { animstart: -128,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
BrazierTile.prototype = new FeatureObject();

BrazierTile.prototype.use = function(who) {
  let retval = {fin:1};
  if (!this.alwayslit) {
    let map = this.getHomeMap();
    let unlit = localFactory.createTile("UnlitBrazier");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,unlit);
    if (map === PC.getHomeMap()) {
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    }
    
    retval["txt"] = "You extinguish the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to go out.";
  }
  
  return retval;
}

function UnlitBrazierTile() {
  //Graphics Upgraded
	this.name = "UnlitBrazier";
	this.graphic = "static.png";
	this.spritexoffset = -9*32;
	this.spriteyoffset = -80*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "an";
  this.desc = "unlit brazier";
  
  LightEmitting.call(this, 0);  
}
UnlitBrazierTile.prototype = new FeatureObject();

UnlitBrazierTile.prototype.use = function(who) {
  let retval = {fin:1};
  if (!this.alwaysout) {
    let map = this.getHomeMap();
    let lit = localFactory.createTile("Brazier");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,lit);
    if (map === PC.getHomeMap()) {
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    }
    
    retval["txt"] = "You light the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to light.";
  }
  
  return retval;
}

function WEBrazierTile() {
	this.name = "WEBrazier";
	this.graphic = "brazier.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "brazier";
	
	LightEmitting.call(this, 2);  
}
WEBrazierTile.prototype = new FeatureObject();

WEBrazierTile.prototype.use = function(who) {
  let retval = {fin:1};
  if (!this.alwayslit) {
    let map = this.getHomeMap();
    let unlit = localFactory.createTile("UnlitWEBrazier");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,unlit);
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    
    retval["txt"] = "You extinguish the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to go out.";
  }
  
  CheckWEEntrance(this.getHomeMap());
  return retval;
}

function UnlitWEBrazierTile() {
	this.name = "UnlitWEBrazier";
	this.graphic = "static.png";
	this.spritexoffset = -9*32;
	this.spriteyoffset = -80*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "an";
	this.desc = "unlit brazier";
}
UnlitWEBrazierTile.prototype = new FeatureObject();

UnlitWEBrazierTile.prototype.use = function(who) {
  let retval = {fin:1};
  retval["fin"] = 1;
  if (!this.alwaysout) {
    let map = this.getHomeMap();
    let lit = localFactory.createTile("WEBrazier");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,lit);
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    
    retval["txt"] = "You light the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to light.";
  }
  
  CheckWEEntrance(this.getHomeMap());
  return retval;
}

function CheckWEEntrance(themap) {
  let ne_brazier = themap.getTile(11,43).getTopFeature();
  let nw_brazier = themap.getTile(7,43).getTopFeature();
  let se_brazier = themap.getTile(11,47).getTopFeature();
  let sw_brazier = themap.getTile(7,47).getTopFeature();
  
  let barrier = themap.getTile(12,45).getTopFeature();
  
  let set_barrier = 1;
  
  if ((ne_brazier.getName() === "UnlitWEBrazier") && (nw_brazier.getName() === "WEBrazier") && (se_brazier.getName() === "UnlitWEBrazier") && (sw_brazier.getName() === "WEBrazier")) {
    set_barrier = 0;
  }
  
  if (set_barrier && (!barrier || (barrier.getName() !== "IllusionaryEnergyField"))) {
    barrier = localFactory.createTile("IllusionaryEnergyField");
    themap.placeThing(12,45,barrier);
  } else if (!set_barrier && (barrier.getName() === "IllusionaryEnergyField")) {
    themap.deleteThing(barrier);
  }
  
  return;
}

function PheranIllusionaryEnergyFieldTile() {
	this.name = "PheranIllusionaryEnergyField";
  this.graphic = "electricfield.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0;
	this.blockloe = 2;
  this.prefix = "a"; 
	this.desc = "wall";
	
  this.invisible = 1;
}
PheranIllusionaryEnergyFieldTile.prototype = new FeatureObject();

function IllusionaryEnergyFieldTile() {
	this.name = "IllusionaryEnergyField";
  this.graphic = "electricfield.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 2;
	this.blockloe = 2;
  this.prefix = "a"; 
	this.desc = "wall";
	
  this.invisible = 1;
}
IllusionaryEnergyFieldTile.prototype = new FeatureObject();

function WEBrazier2Tile() {
	this.name = "WEBrazier2";
	this.graphic = "brazier.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "brazier";
	
	LightEmitting.call(this, 3);  
}
WEBrazier2Tile.prototype = new FeatureObject();

WEBrazier2Tile.prototype.use = function(who) {
  let retval = {fin:1};
  if (!this.alwayslit) {
    let map = this.getHomeMap();
    let unlit = localFactory.createTile("WEUnlitBrazier2");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,unlit);
    if (map === PC.getHomeMap()) {
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    }
    
    retval["txt"] = "You extinguish the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to go out.";
  }
  
  // Working here
  return retval;
}

function WEUnlitBrazier2Tile() {
	this.name = "WEUnlitBrazier2";
	this.graphic = "static.png";
	this.spritexoffset = -9*32;
	this.spriteyoffset = -80*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "an";
  this.desc = "unlit brazier";
  
  LightEmitting.call(this, 0);  
}
WEUnlitBrazier2Tile.prototype = new FeatureObject();

WEUnlitBrazier2Tile.prototype.use = function(who) {
  let retval = {fin:1};
  if (!this.alwaysout) {
    let map = this.getHomeMap();
    let lit = localFactory.createTile("WEBrazier2");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,lit);
    if (map === PC.getHomeMap()) {
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    }
    
    retval["txt"] = "You light the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to light.";
  }
  
  return retval;
}

function CrystalTrapSpaceTile() {
	this.name = "CrystalTrapSpace";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -111*32;
	this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_FLY + MOVE_ETHEREAL;
  this.prefix = "a"; 
	this.desc = "Crystal Trap spell";
	
  this.invisible = 1;  

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 5,
    animstyle: "pingpong",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });

}
CrystalTrapSpaceTile.prototype = new FeatureObject();

CrystalTrapSpaceTile.prototype.walkon = function(who) {
  let response = {msg:""};
  if ((who.getMovetype() & MOVE_FLY) || (who.getMovetype() & MOVE_LEVITATE) || (who.getMovetype() & MOVE_ETHEREAL)) {
    DebugWrite("magic", who.getName() + " flies/floats/flits over the crystal trap.<br />");
    return response;
  }

  if (who.getSpellEffectsByName("CrystalTrap")) { 
    DebugWrite("magic", "Crystal prison does not go off- victim already in one.<br />");
    return response;
  }

  if (who.getSerial() !== this.owner) {
    let trap = localFactory.createTile("CrystalTrap");
    trap.duration = this.duration;
    trap.power = this.power;
    trap.setExpiresTime(this.duration + DUTime.getGameClock());
    DebugWrite("magic", "Crystal Prison sprung. Expires at " + trap.getExpiresTime() + ".<br />");
    who.addSpellEffect(trap);
    ShowEffect(who,1000,"crystals.gif",0,0);
    if (GetDistance(PC.getx(),PC.gety(),who.getx(),who.gety())) { DUPlaySound("sfx_crystal_trap"); }

    let trapmap = this.getHomeMap();
    trapmap.deleteThing(this);
  
    response.msg = "You are engulfed in crystal!";
    return response;
  } else {
    DebugWrite("magic", "Owner has passed over a crystal prison.");
    return response;
  }
}

CrystalTrapSpaceTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,this.duration);
    let expiresat = this.duration + DUTime.getGameClock();
    DebugWrite("magic", "Crystal Prison trap created. Expires at " + expiresat + ".<br />");    
  }

  return;
}

CrystalTrapSpaceTile.prototype.myTurn = function() {
  DebugWrite("all", "<div style='border-style:inset; border-color:#999999'><span style='" + debugstyle.header + "'>" + this.getName() + ", serial " + this.getSerial() + " is starting its turn at " + this.getx() + "," + this.gety() + ", timestamp " + DUTime.getGameClock().toFixed(5) + ".</span><br />");
  if (!maps.getMap(this.getHomeMap().getName())) {
    // removing from timeline, its map is gone

    if (!DebugWrite("gameobj", "<span style='font-weight:bold'>Crystal Prison " + this.getSerial() + " removed from game- map gone.</span><br />")) {
      DebugWrite("magic", "<span style='font-weight:bold'>Crystal Prison " + this.getSerial() + " removed from game- map gone.</span><br />");
    }
  
    return 1;
  }
 
  if (this.expiresTime && (this.expiresTime > DUTime.getGameClock())) {
    if (!DebugWrite("magic", "<span style='font-weight:bold'>Crystal Prison " + this.getSerial() + " expired, removing itself.</span><br />")) {
      DebugWrite("gameobj", "<span style='font-weight:bold'>Crystal Prison " + this.getSerial() + " expired, removing itself.</span><br />");
    }
    this.getHomeMap().deleteThing(this);
    
    return 1;
  }

  // in the case of this thing, this part should never trigger.  
  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
  return 1;
}

function SpitTile() {
	this.name = "Spit";
	this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -162*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "campfire";
	
	LightEmitting.call(this, 2);

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });

}
SpitTile.prototype = new FeatureObject();

function FireplaceTile() {
  //Graphics Upgraded
	this.name = "Fireplace";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -111*32;
	this.passable = MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 2;
  this.prefix = "a";
	this.desc = "fireplace";
	this.peerview = "white";
	this.pathweight = 5;
  this.firedamage = "3d4";
//  this.nowander = 1;
	
	LightEmitting.call(this, 2);
	HasAmbientNoise.call(this,"sfx_fire_crackle",1.5);

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });
}
FireplaceTile.prototype = new FeatureObject();

FireplaceTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
    DebugWrite("gameobj", "Adding fireplace to the timeline.");
  }
  return;
}

FireplaceTile.prototype.walkon = function(person) {
  let resp = OnFire(person, this);
  return resp;
}
FireplaceTile.prototype.idle = function(person) {
  let resp = OnFire(person, this);
  return resp;
}

FireplaceTile.prototype.isHostileTo = function(who) {
  if (who.getResist("fire") >= 100) { return 0; }
  return 1;
}

FireplaceTile.prototype.myTurn = function() {
  let mytile = this.getHomeMap().getTile(this.getx(),this.gety());
  let feas = mytile.getFeatures();
  for (let i=0;i<feas.length;i++) {
    if (feas[i].flammable) {
      if (Dice.roll("1d100") <= feas[i].flammable) {
        feas[i].flamed();
      }
    }
  };

  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
  return 1;  
}

function SmallFireplaceTile() {
  //Graphics Upgraded
	this.name = "SmallFireplace";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -112*32;

}
SmallFireplaceTile.prototype = new FireplaceTile();

function DustyFireplaceTile() {
	this.name = "DustyFireplace";
	this.graphic = "static.png";
	this.spritexoffset = -8*32;
	this.spriteyoffset = -20*32;
	this.passable = MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 2;
  this.prefix = "a";
	this.desc = "dusty fireplace";
	this.peerview = "white";
}
DustyFireplaceTile.prototype = new FeatureObject();

function SmallDustyFireplaceTile() {
	this.name = "SmallDustyFireplace";
	this.graphic = "static.png";
	this.spritexoffset = -9*32;
	this.spriteyoffset = -20*32;
	this.passable = MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 2;
  this.prefix = "a";
	this.desc = "dusty fireplace";
	this.peerview = "white";
}
SmallDustyFireplaceTile.prototype = new FeatureObject();

function AltarTile() {
  //Graphics Upgraded
	this.name = "Altar";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -78*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "altar";
	this.peerview = "white";
}
AltarTile.prototype = new FeatureObject();

function ThinAltarTile() {
  //Graphics Upgraded
	this.name = "ThinAltar";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -77*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "altar";
	this.peerview = "white";
}
ThinAltarTile.prototype = new FeatureObject();

function ThroneTile() {
  //Graphics Upgraded
	this.name = "Throne";
	this.graphic = "static.png";
	this.spritexoffset = -5*32;
	this.spriteyoffset = -85*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "the";
	this.desc = "throne";

  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
}
ThroneTile.prototype = new FeatureObject();

ThroneTile.prototype.walkon = function(who) {
  return SitDown(who,this);
}

ThroneTile.prototype.walkoff = function(who) {
  return StandUp(who);
}

function BDThroneTile() {
  //Graphics Upgraded
	this.name = "BDThrone";
	this.graphic = "static.png";
	this.spritexoffset = -4*32;
	this.spriteyoffset = -85*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "the";
	this.desc = "throne";

  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
}
BDThroneTile.prototype = new FeatureObject();

BDThroneTile.prototype.walkon = function(who) {
  return {msg:""};

  let response = {msg:""};
  who.realgraphic = who.getGraphicArray();
  who.reallayers = who.layers;
  delete who.layers;
  let cc = "";
  if (parseInt(who.skintone) === 2) {
    cc = ".1";
  } else if (parseInt(who.skintone) !== 1) { console.log("Missing skintone on "); console.log(who); }
  let filename = `bdthroned${cc}.gif`;
  let garr = [filename,filename,0,0];
  who.setGraphicArray(garr);
  return response;
}

BDThroneTile.prototype.walkoff = function(who) {
  return {msg:""};
  
  if (who.realgraphic) {
    who.setGraphicArray(who.realgraphic);
    delete who.realgraphic;
    who.layers = who.reallayers;
    delete who.reallayers;
    DebugWrite("gameobj", "Changed the graphic of " + who.getNPCName() + " from sitting.<br />");
  } else {
    alert("Entity failed to have a standing graphic. See console.");
    console.log(who);
  }
  return {msg:""};
}

function RuinsWallDoor1Tile() {
  Lockable.call(this, ["static.png","",-8*32,-13*32], ["static.png","",-8*32,-13*32], ["static.png","",-8*32,-13*32], "a", "door", "a", "locked door", "a", "magically locked door");
  	
	this.name = "RuinsWallDoor1";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -13*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

	Openable.call(this, ["static.png","",-8*32,-13*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoor1Tile.prototype = new FeatureObject();

RuinsWallDoor1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function RuinsWallDoor2Tile() {
  Lockable.call(this, ["static.png","",-1*32,-14*32], ["static.png","",-3*32,-15*32], ["static.png","",-2*32,-14*32], "a", "door", "a", "locked door", "a", "magically locked door");
  	
	this.name = "RuinsWallDoor2";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -14*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

	Openable.call(this, ["static.png","",-1*32,-14*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoor2Tile.prototype = new FeatureObject();

RuinsWallDoor2Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function DoorTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-32,-16*32], ["static.png","",-32,-17*32], ["static.png","",-2*32,-16*32], "a", "door", "a", "locked door", "a", "magically locked door");
  	
	this.name = "Door";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -16*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

	Openable.call(this, ["static.png", "", -32, -16*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
DoorTile.prototype = new FeatureObject();

DoorTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function DaemonDoorTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-32,-16*32], ["static.png","",-32,-17*32], ["static.png","",-2*32,-16*32], "a", "door", "a", "locked door", "a", "magically locked door");
  	
	this.name = "DaemonDoor";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -16*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

	Openable.call(this, ["static.png", "", -32, -16*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
DaemonDoorTile.prototype = new FeatureObject();

DaemonDoorTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

DaemonDoorTile.prototype.activate - function() {
  this.lockMe(3);
}

function TalkingDoorTile() {
  this.name = "TalkingDoor";
  this.conversation = "ash_door";
}
TalkingDoorTile.prototype = new DoorTile();

TalkingDoorTile.prototype.getConversation = function() {
  return this.conversation;
}

TalkingDoorTile.prototype.getGenderedTerms = function() {
  let gt = {};
  gt.pronoun = "it";
  gt.possessive = "its";
  gt.objective = "it";
  gt.titled = "Lord";
  gt.sibling = "sibling";
  gt.kiddie = "child";    
  return gt;  
}

TalkingDoorTile.prototype.getNPCName = function() {
	return "The front door";
}

TalkingDoorTile.prototype.activate = function(timeoverride) {
//  this.use_old = this.use;
  this.use = function(who) {
    let retval;
    maintext.addText("Use " + this.getDesc() + ":");
    retval = PerformTalk(this,"ash_door","_start");
    retval["override"] = 1;
    maintext.setInputLine("&gt; You say: ");
    maintext.drawTextFrame();
    return retval;
  };
  return 1;
}

function GreyDoorTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-2*32,-18*32], ["static.png","",-9*32,-41*32], ["static.png","",-3*32,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
  	
	this.name = "GreyDoor";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

	Openable.call(this, ["static.png", "", -2*32, -18*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoorTile.prototype = new FeatureObject();

GreyDoorTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function DoorStoneWallTile() {
	this.name = "DoorStoneWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-1664";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["master_spritesheet.png","",'-192','-1664'], ["master_spritesheet.png","",'-224','-1664'], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
DoorStoneWallTile.prototype = new FeatureObject();

DoorStoneWallTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function SleepFieldTile() {
	this.name = "SleepField";
	this.graphic = "sleepfield.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "sleep field";
	this.initdelay = 1.5;
	this.pathweight = 5;
	
	LightEmitting.call(this, 1);
}
SleepFieldTile.prototype = new FeatureObject();

SleepFieldTile.prototype.walkon = function(person) {
  let resp = InASleepField(person);
  return resp;
}
SleepFieldTile.prototype.idle = function(person) {
  let resp = InASleepField(person);
  return resp;
}

SleepFieldTile.prototype.isHostileTo = function(who) {
  if (who.getResist("magic") >= 100) { return 0; }
  if (IsNonLiving(who) || who.specials.mindless) { return 0; }
  return 1;
}

function InASleepField(who) {
  if (IsNonLiving(who) || who.specials.mindless)  { return ""; }
  let resist = who.getResist("magic");
  resist = 1-(resist/100);
  let chance = .5 * resist;
  if (Math.random()*1 < chance) {
    if (who.getSpellEffectsByName("Sleep")) { return 0; }
    let fieldeffect = localFactory.createTile("Sleep");
    
    let duration = (Dice.roll("2d3") - who.getInt()/20) * SCALE_TIME;
    fieldeffect.setExpiresTime(duration + DUTime.getGameClock());
    who.addSpellEffect(fieldeffect);
    
    DrawCharFrame();

  }
  return {msg:""};
}

function FireFieldTile() {
	this.name = "FireField";
	this.graphic = "firefield.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "fire field";
	
	LightEmitting.call(this, 3);
	this.initdelay = 1.5;
	this.pathweight = 5;
	
	HasAmbientNoise.call(this,"sfx_fire_crackle",1.5);
}
FireFieldTile.prototype = new FeatureObject();

FireFieldTile.prototype.walkon = function(person) {
  let resp = InAFireField(person, this);
  return resp;
}
FireFieldTile.prototype.idle = function(person) {
  let resp = InAFireField(person, this);
  return resp;
}

FireFieldTile.prototype.isHostileTo = function(who) {
  if (who.getResist("magic") >= 100) { return 0; }
  if (who.getResist("fire") >= 100) { return 0; }
  return 1;
}

FireFieldTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let mytile = this.getHomeMap().getTile(this.getx(),this.gety());
    let npcs = mytile.getNPCs();
    for (let i=0;i<npcs.length;i++) {
      InAFireField(npcs[i]);
    }

    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  }

  return;
}

FireFieldTile.prototype.myTurn = function() {
  DebugWrite("all", "<div style='border-style:inset; border-color:#999999'><span style='" + debugstyle.header + "'>" + this.getName() + ", serial " + this.getSerial() + " is starting its turn at " + this.getx() + "," + this.gety() + ", timestamp " + DUTime.getGameClock().toFixed(5) + ".</span><br />");
  if (!maps.getMap(this.getHomeMap().getName())) {

    if (!DebugWrite("gameobj", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " removed from game- map gone.</span><br />")) {
      DebugWrite("magic", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " removed from game- map gone.</span><br />");
    }
  
    return 1;
  }
 
  if (this.expiresTime && (this.expiresTime < DUTime.getGameClock())) {
    if (!DebugWrite("magic", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " expired, removing itself.</span><br />")) {
      DebugWrite("gameobj", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " expired, removing itself.</span><br />");
    }
    let x = this.getx();
    let y = this.gety();
    let mymap = this.getHomeMap();
    mymap.deleteThing(this);
    DrawMainFrame("one",mymap,x,y);
    
    return 1;
  }
  
  let mytile = this.getHomeMap().getTile(this.getx(),this.gety());
  let feas = mytile.getFeatures();
  for (let i=0;i<feas.length;i++) {
    if (feas[i].flammable) {
      if (Dice.roll("1d100") <= feas[i].flammable) {
        feas[i].flamed();
      }
    }
  };

  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
  return 1;
}

function InAFireField(who, field) {
  let tmpdmg = prepareSpellDamage(field,who,"2d6+3","fire");
  let dmg = (1/SCALE_TIME)*(DUTime.getGameClock() - who.getLastTurnTime()) * tmpdmg.dmg;
  let response = {msg:"The fire field burns you!"};
  let resist = who.getResist("magic");
  resist = 1-(resist/100);
  dmg = dmg*resist;
  //who.dealDamage(dmg, this, "fire");
  DealandDisplayDamage(who,field, dmg, "fire");
  DebugWrite("gameobj", "Firefield deals " + dmg + " damage to " + who.getName() + ".");
  if (who === PC) { DUPlaySound("sfx_fire_hit"); }
  return response;
}

function AbyssFireFieldTile() {
	this.name = "AbyssFireField";
	this.graphic = "fields.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "fire field";
	this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.expires = 0;
	
	this.initdelay = 1.5;
	this.pathweight = 5;
	
	HasAmbientNoise.call(this,"sfx_fire_crackle",1.5);
}
AbyssFireFieldTile.prototype = new FeatureObject();

AbyssFireFieldTile.prototype.walkon = function(person) {
  let resp = {msg:"The fire burns you!"};
  let dmg = person.getMaxHP()/6;  // should wind up an integer because maxhp is a multiple of 30
  if (person.getHP() === 1) {
    // teleport to end
    resp.msg = "Despite the damage you have taken, you grit your teeth and take one more step. The world spins around you...";
    gamestate.setMode("waiting");
    resp["override"] = 3;
    FadeOut();
    setTimeout(function() { 
      person.getHomeMap().moveThing(9,8,person);
      DrawMainFrame("draw",person.getHomeMap(),person.getx(),person.gety());
      FadeIn();
      gamestate.setMode("player");
     }, 1500); 
    return resp;
  }
  else if (dmg > person.getHP()) {
    dmg = person.getHP()-1; 
  }
  person.setHP(person.getHP()-dmg);
  DrawCharFrame();
  DamageFlash();
  DUPlaySound("sfx_fire_hit");
  return resp;
}

function PoisonFieldTile() {
	this.name = "PoisonField";
	this.graphic = "poisonfield.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "poison field";
	this.initdelay = 1.5;
	this.pathweight = 5;
	
	LightEmitting.call(this, 1);
}
PoisonFieldTile.prototype = new FeatureObject();

PoisonFieldTile.prototype.walkon = function(person) {
  let resp = InAPoisonField(person);
  return resp;
}
PoisonFieldTile.prototype.idle = function(person) {
  let resp = InAPoisonField(person);
  return resp;
}

PoisonFieldTile.prototype.isHostileTo = function(who) {
  if (IsNonLiving(who)) { return 0; }
  return 1;
}

function InAPoisonField(who){
  let response = {msg:""};
  if (IsNonLiving(who)) {
    return response;
  }
  let poisonchance = .75;
  poisonchance = (1/SCALE_TIME)*(DUTime.getGameClock() - who.getLastTurnTime()) * poisonchance;
  poisonchance = poisonchance * (1-who.getResist("poison")/100);  
  if (Math.random()*1 < poisonchance) {  
    if (who.getSpellEffectsByName("Poison")) { return 0; }
    let poison = localFactory.createTile("Poison");
    
    let duration = (20+Dice.roll("2d10") + who.getInt() - 15) * SCALE_TIME;
    poison.setExpiresTime(duration + DUTime.getGameClock());
    who.addSpellEffect(poison);
    
    DrawCharFrame();
    response.msg = "You are poisoned!";
  }

  return response;
}

function LadderDownTile() {
  //Graphics Upgraded
  this.name = "LadderDown";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ladder";
  this.peerview = "#808080";

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;
}
LadderDownTile.prototype = new FeatureObject();

function LadderUpTile() {
  //Graphics Upgraded
  this.name = "LadderUp";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ladder";
  this.peerview = "#808080";

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;
}
LadderUpTile.prototype = new FeatureObject();

function StairDownTile() {
  //Graphics Upgraded
  this.name = "StairDown";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
StairDownTile.prototype = new FeatureObject();

function StairUpTile() {
  // Graphics Upgraded
  this.name = "StairUp";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
StairUpTile.prototype = new FeatureObject();

function StairDown2Tile() {
  // Graphics Upgraded
  this.name = "StairDown2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
StairDown2Tile.prototype = new FeatureObject();

function StairUp2Tile() {
  //Graphics Upgraded
  this.name = "StairUp2";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
StairUp2Tile.prototype = new FeatureObject();

function FancyStairDownTile() {
  //Graphics Upgraded
  this.name = "FancyStairDown";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
FancyStairDownTile.prototype = new FeatureObject();

function FancyStairUpTile() {
  // Graphics Upgraded
  this.name = "FancyStairUp";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
FancyStairUpTile.prototype = new FeatureObject();

function FancyStairDown2Tile() {
  // Graphics Upgraded
  this.name = "FancyStairDown2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
FancyStairDown2Tile.prototype = new FeatureObject();

function FancyStairUp2Tile() {
  //Graphics Upgraded
  this.name = "FancyStairUp2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
FancyStairUp2Tile.prototype = new FeatureObject();

function WoodenStairDownTile() {
  //Graphics Upgraded
  this.name = "WoodenStairDown";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
WoodenStairDownTile.prototype = new FeatureObject();

function WoodenStairUpTile() {
  //Graphics Upgraded
  this.name = "WoodenStairUp";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
WoodenStairUpTile.prototype = new FeatureObject();

function WoodenStairDown2Tile() {
  //Graphics Upgraded
  this.name = "WoodenStairDown2";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
WoodenStairDown2Tile.prototype = new FeatureObject();

function WoodenStairUp2Tile() {
  //Graphics Upgraded
  this.name = "WoodenStairUp2";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
WoodenStairUp2Tile.prototype = new FeatureObject();

function SingleSignpostTile() {
  //Graphics Upgraded
  this.name = "SingleSignpost";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SingleSignpostTile.prototype = new FeatureObject();

function SignpostLeftTile() {
  //Graphics Upgraded
  this.name = "SignpostLeft";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SignpostLeftTile.prototype = new FeatureObject();

function SignpostRightTile() {
  //Graphics Upgraded
  this.name = "SignpostRight";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SignpostRightTile.prototype = new FeatureObject();

function CarpenterSignTile() {
  //Graphics Upgraded
  this.name = "CarpenterSign";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "carpenter";
  this.peerview = "#541909";
}
CarpenterSignTile.prototype = new FeatureObject();

function CarpenterSign2Tile() {
  //Graphics Upgraded
  this.name = "CarpenterSign2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "carpenter";
  this.peerview = "#541909";
}
CarpenterSign2Tile.prototype = new FeatureObject();

function InnSignTile() {
  //Graphics Upgraded
  this.name = "InnSign";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "inn";
  this.peerview = "#541909";
}
InnSignTile.prototype = new FeatureObject();

function InnSign2Tile() {
  //Graphics Upgraded
  this.name = "InnSign2";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "inn";
  this.peerview = "#541909";
}
InnSign2Tile.prototype = new FeatureObject();

function TavernSignTile() {
  //Graphics Upgraded
  this.name = "TavernSign";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tavern";
  this.peerview = "#541909";
}
TavernSignTile.prototype = new FeatureObject();

function TavernSign2Tile() {
  //Graphics Upgraded
  this.name = "TavernSign2";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tavern";
  this.peerview = "#541909";
}
TavernSign2Tile.prototype = new FeatureObject();

function ArmourySignTile() {
  //Graphics Upgraded
  this.name = "ArmourySign";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "armoury";
  this.peerview = "#541909";
}
ArmourySignTile.prototype = new FeatureObject();

function ArmourySign2Tile() {
  //Graphics Upgraded
  this.name = "ArmourySign2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "armoury";
  this.peerview = "#541909";
}
ArmourySign2Tile.prototype = new FeatureObject();

function GrocerSignTile() {
  //Graphics Upgraded
  this.name = "GrocerSign";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -74*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grocer";
  this.peerview = "#541909";
}
GrocerSignTile.prototype = new FeatureObject();

function GrocerSign2Tile() {
  //Graphics Upgraded
  this.name = "GrocerSign2";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grocer";
  this.peerview = "#541909";
}
GrocerSign2Tile.prototype = new FeatureObject();

function GrocerSign_2Tile() {
  this.name = "GrocerSign_2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-480";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grocer";
  this.peerview = "#541909";
}
GrocerSign_2Tile.prototype = new FeatureObject();

function WeaponSignTile() {
  //Graphics Upgraded
  this.name = "WeaponSign";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "weaponsmith";
  this.peerview = "#541909";
}
WeaponSignTile.prototype = new FeatureObject();

function WeaponSign2Tile() {
  //Graphics Upgraded
  this.name = "WeaponSign2";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "weaponsmith";
  this.peerview = "#541909";
}
WeaponSign2Tile.prototype = new FeatureObject();

function BowyerSignTile() {
  //Grahics Upgraded
  this.name = "BowyerSign";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bowyer";
  this.peerview = "#541909";
}
BowyerSignTile.prototype = new FeatureObject();

function BowyerSign2Tile() {
  //Grahics Upgraded
  this.name = "BowyerSign2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bowyer";
  this.peerview = "#541909";
}
BowyerSign2Tile.prototype = new FeatureObject();

function AlchemistSignTile() {
  //Graphics Upgraded
  this.name = "AlchemistSign";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemist";
  this.peerview = "#541909";
}
AlchemistSignTile.prototype = new FeatureObject();

function AlchemistSign2Tile() {
  //Graphics Upgraded
  this.name = "AlchemistSign2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemist";
  this.peerview = "#541909";
}
AlchemistSign2Tile.prototype = new FeatureObject();

function MagicShoppeSignTile() {
  //Graphics Upgraded
  this.name = "MagicShoppeSign";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "magic shoppe";
  this.peerview = "#541909";
}
MagicShoppeSignTile.prototype = new FeatureObject();

function MagicShoppeSign2Tile() {
  //Graphics Upgraded
  this.name = "MagicShoppeSign2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "magic shoppe";
  this.peerview = "#541909";
}
MagicShoppeSign2Tile.prototype = new FeatureObject();

function HealerSignTile() {
  //Graphics Upgraded
  this.name = "HealerSign";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "healer";
  this.peerview = "#541909";
}
HealerSignTile.prototype = new FeatureObject();

function HealerSign2Tile() {
  //Graphics Upgraded
  this.name = "HealerSign2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "healer";
  this.peerview = "#541909";
}
HealerSign2Tile.prototype = new FeatureObject();

function CasinoSignTile() {
  //Graphics Upgraded
  this.name = "CasinoSign";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "casino";
  this.peerview = "#541909";
}
CasinoSignTile.prototype = new FeatureObject();

function CasinoSign2Tile() {
  //Graphics Upgraded
  this.name = "CasinoSign2";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "casino";
  this.peerview = "#541909";
}
CasinoSign2Tile.prototype = new FeatureObject();

function PaladinSignTile() {
  //Graphics Upgraded
  this.name = "PaladinSign";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign showing a chalice";
  this.peerview = "#541909";
}
PaladinSignTile.prototype = new FeatureObject();

function PaladinSign2Tile() {
  //Graphics Upgraded
  this.name = "PaladinSign2";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign showing a chalice";
  this.peerview = "#541909";
}
PaladinSign2Tile.prototype = new FeatureObject();

function HerbalistSignTile() {
  //Graphics Upgraded
  this.name = "HerbalistSign";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "herbalist";
  this.peerview = "#541909";
}
HerbalistSignTile.prototype = new FeatureObject();

function HerbalistSign2Tile() {
  //Graphics Upgraded
  this.name = "HerbalistSign2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "herbalist";
  this.peerview = "#541909";
}
HerbalistSign2Tile.prototype = new FeatureObject();

function CartographerSignTile() {
  //Graphics Upgraded
  this.name = "CartographerSign";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -73*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "cartographer";
  this.peerview = "#541909";
}
CartographerSignTile.prototype = new FeatureObject();

function CartographerSign2Tile() {
  //Graphics Upgraded
  this.name = "CartographerSign2";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "cartographer";
  this.peerview = "#541909";
}
CartographerSign2Tile.prototype = new FeatureObject();

function WhitesmithSignTile() {
  //Graphics Upgraded
  this.name = "WhitesmithSign";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -73*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "whitesmith";
  this.peerview = "#541909";
}
WhitesmithSignTile.prototype = new FeatureObject();

function WhitesmithSign2Tile() {
  //Graphics Upgraded
  this.name = "WhitesmithSign2";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "whitesmith";
  this.peerview = "#541909";
}
WhitesmithSign2Tile.prototype = new FeatureObject();

function CourthouseSignTile() {
  //Graphics Upgraded
  this.name = "CourthouseSign";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -74*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "courthouse";
  this.peerview = "#541909";
}
CourthouseSignTile.prototype = new FeatureObject();

function CourthouseSign2Tile() {
  //Graphics Upgraded
  this.name = "CourthouseSign2";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "courthouse";
  this.peerview = "#541909";
}
CourthouseSign2Tile.prototype = new FeatureObject();

function BardSignTile() {
  //Graphics Upgraded
  this.name = "BardSign";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "Bardic College";
  this.peerview = "#541909";
}
BardSignTile.prototype = new FeatureObject();

function BardSign2Tile() {
  //Graphics Upgraded
  this.name = "BardSign2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "Bardic College";
  this.peerview = "#541909";
}
BardSign2Tile.prototype = new FeatureObject();

function BrokenSignTile() {
  //Graphics Upgraded
  this.name = "BrokenSign";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken sign";
  this.peerview = "#541909";
}
BrokenSignTile.prototype = new FeatureObject();

function BrokenSign2Tile() {
  //Graphics Upgraded
  this.name = "BrokenSign2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken sign";
  this.peerview = "#541909";
}
BrokenSign2Tile.prototype = new FeatureObject();

function UnfinishedSignTile() {
  //Graphics Upgraded
  this.name = "UnfinishedSign";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken sign";
  this.peerview = "#541909";
}
UnfinishedSignTile.prototype = new FeatureObject();

function UnfinishedSign2Tile() {
  //Graphics Upgraded
  this.name = "UnfinishedSign2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken sign";
  this.peerview = "#541909";
}
UnfinishedSign2Tile.prototype = new FeatureObject();

function TombstoneTile() {
  this.name = "Tombstone";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -109*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tombstone";
  this.peerview = "#541909";
}
TombstoneTile.prototype = new FeatureObject();

function TrainingDummyTile() {
  //Graphics Upgraded
  this.name = "TrainingDummy";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -76*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "training dummy";
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
  
  Pushable.call(this);
  this.heavy = 1;
}
TrainingDummyTile.prototype = new FeatureObject();

function ArcheryTargetTile() {
  //Graphics Upgraded
  this.name = "ArcheryTarget";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -76*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archery target";
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
  
  Pushable.call(this);
  this.heavy = 1;
}
ArcheryTargetTile.prototype = new FeatureObject();

function PottedPlantTile() {
  //Graphics Upgraded
  this.name = "PottedPlant";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "potted plant";
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
  
  Pushable.call(this);
}
PottedPlantTile.prototype = new FeatureObject();

function PottedPlant2Tile() {
  //Graphics Upgraded
  this.name = "PottedPlant2";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "potted plant";
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
  
  Pushable.call(this);
}
PottedPlant2Tile.prototype = new FeatureObject();

function WallPlaqueTile() {
  //Graphics Upgraded
  this.name = "WallPlaque";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "wall with a plaque";
}
WallPlaqueTile.prototype = new FeatureObject();

function AnvilTile() {
  //Graphics Upgraded
  this.name = "Anvil";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -76*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "anvil";
}
AnvilTile.prototype = new FeatureObject();

function WBridgeNSTile() {
  //Graphics Upgraded
  this.name = "WBridgeNS";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
WBridgeNSTile.prototype = new FeatureObject();

function EBridgeNSTile() {
  //Graphics Upgraded
  this.name = "EBridgeNS";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
EBridgeNSTile.prototype = new FeatureObject();

function BridgeNSTile() {
  //Graphics Upgraded
  this.name = "BridgeNS";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
BridgeNSTile.prototype = new FeatureObject();

function BridgeNSBrokenTile() {
  //Graphics Upgraded
  this.name = "BridgeNSBroken";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
BridgeNSBrokenTile.prototype = new FeatureObject();

function NBridgeEWTile() {
  //Graphics Upgraded
  this.name = "NBridgeEW";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
NBridgeEWTile.prototype = new FeatureObject();

function SBridgeEWTile() {
  //Graphics Upgraded
  this.name = "SBridgeEW";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
SBridgeEWTile.prototype = new FeatureObject();

function BridgeEWTile() {
  //Graphics Upgraded
  this.name = "BridgeEW";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
BridgeEWTile.prototype = new FeatureObject();

function BridgeEWBrokenTile() {
  //Graphics Upgraded
  this.name = "BridgeEWBroken";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
BridgeEWBrokenTile.prototype = new FeatureObject();

function SitDown(who,what) {
  if (what.getName().includes("Chair")) {
    who.sitting = "chair";
    who.facing = "facing" + what.facing;
  } else {
    who.sitting = "throne";
  }
  who.currframenum = 1;
  who.makeLayers(1);

  return {msg:""};
}

function StandUp(who) {
  who.sitting = "";
  who.currframenum = 1;
  who.makeLayers();
  return {msg:""};
}

function GetChairGraphicFromFacing(thing, facing) {
  let gr = thing.getGraphicArray();
  switch (facing) {
    case 0:
      // bottom
      gr[2] = -3*32;
      gr[3] = -85*32;
      break;
    case 1:
      // left
      gr[2] = -32;
      gr[3] = -85*32;
      break;
    case 2:
      // top
      gr[2] = -2*32;
      gr[3] = -85*32;
      break;
    case 3:
      // right 
      gr[2] = 0;
      gr[3] = -85*32;
      break;
    default:
      console.log(thing);
      console.log("Facing problem.");
      break;
  }
  return gr;
}

function LeftChairTile() {
  // Graphics Upgraded
  this.name = "LeftChair";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 1;
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around

}
LeftChairTile.prototype = new FeatureObject();

LeftChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

LeftChairTile.prototype.walkon = function(who) {
  return SitDown(who,this);
}


LeftChairTile.prototype.walkoff = function(who) {
  return StandUp(who);
}

LeftChairTile.prototype.getGraphicFromFacing = function(face) {
  return GetChairGraphicFromFacing(this, face)
}

function RightChairTile() {
  // Graphics Upgraded
  this.name = "RightChair";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 3;
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
}
RightChairTile.prototype = new FeatureObject();

RightChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

RightChairTile.prototype.walkon = function(who) {
  return SitDown(who,this);
}

RightChairTile.prototype.walkoff = function(who) {
  return StandUp(who);
}

RightChairTile.prototype.getGraphicFromFacing = function(face) {
  return GetChairGraphicFromFacing(this, face)
}

function TopChairTile() {
  // Graphics Upgraded
  this.name = "TopChair";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 2;
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
}
TopChairTile.prototype = new FeatureObject();

TopChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

TopChairTile.prototype.walkon = function(who) {
  return SitDown(who,this);
}

TopChairTile.prototype.walkoff = function(who) {
  return StandUp(who);
}
 
TopChairTile.prototype.getGraphicFromFacing = function(face) {
  return GetChairGraphicFromFacing(this, face)
}

function BottomChairTile() {
  // Graphics Upgraded
  this.name = "BottomChair";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 0;
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
}
BottomChairTile.prototype = new FeatureObject();

BottomChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

BottomChairTile.prototype.walkon = function(who) {
  return SitDown(who,this);
}

BottomChairTile.prototype.walkoff = function(who) {
  return StandUp(who);
}
 
BottomChairTile.prototype.getGraphicFromFacing = function(face) {
  return GetChairGraphicFromFacing(this, face)
}

function TurnFacing(what) {
  switch (what.facing) {
    case 0:
      what.facing++;
      what.spritexoffset = -32;
      what.spriteyoffset = -85*32;
      break;
    case 1:
      what.facing++;
      what.spritexoffset = -2*32;
      what.spriteyoffset = -85*32;
      break;
    case 2:
      what.facing++;
      what.spritexoffset = 0;
      what.spriteyoffset = -85*32;
      break;
    case 3:
      what.facing = 0;
      what.spritexoffset = -3*32;
      what.spriteyoffset = -85*32;
      break;
  }
  
  let retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "Turned.";
  return retval;
}

function SmallTableTile() {
  //Graphics Upgraded
  this.name = "SmallTable";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
SmallTableTile.prototype = new FeatureObject();

function SmallTable2Tile() {
  //Graphics Upgraded
  this.name = "SmallTable2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
SmallTable2Tile.prototype = new FeatureObject();

function SmallTable3Tile() {
  //Graphics Upgraded
  this.name = "SmallTable3";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
SmallTable3Tile.prototype = new FeatureObject();

function LeftTableTile() {
  // Graphics Upgraded
  this.name = "LeftTable";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
LeftTableTile.prototype = new FeatureObject();

function MiddleTableTile() {
  // Graphics Upgraded
  this.name = "MiddleTable";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
MiddleTableTile.prototype = new FeatureObject();

function RightTableTile() {
  // Graphics Upgraded
  this.name = "RightTable";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
RightTableTile.prototype = new FeatureObject();

function FoodSouthTile() {
  //Graphic Upgraded
  this.name = "FoodSouth";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -113*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "plate of food";
}
FoodSouthTile.prototype = new FeatureObject();

function FoodNorthTile() {
  //Graphic Upgraded
  this.name = "FoodNorth";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -114*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "plate of food";
}
FoodNorthTile.prototype = new FeatureObject();

function FoodSouthNorthTile() {
  this.name = "FoodSouthNorth";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-640";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "table with food";
}
FoodSouthNorthTile.prototype = new FeatureObject();

function FoodSouthEdgeTile() {
  this.name = "FoodSouthEdge";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-1600";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "table with food";
}
FoodSouthEdgeTile.prototype = new FeatureObject();

function FoodNorthEdgeTile() {
  this.name = "FoodNorthEdge";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-1600";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "table with food";
}
FoodNorthEdgeTile.prototype = new FeatureObject();

function HarpsichordTile() {
  //Graphics Upgraded
  this.name = "Harpsichord";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -79*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "harpsichord";
}
HarpsichordTile.prototype = new FeatureObject();

HarpsichordTile.prototype.use = function(who) {
  let retval = { fin: 1 };
  if (who === PC) {
    let distanceToMe = GetDistance(who.getx(),who.gety(),this.getx(),this.gety(),"square");
    if (distanceToMe > 1) { 
      retval["txt"] = "The harpsichord makes a few discordant sounds, and then is silent.";
    } else if ((this.gety() - who.gety()) !== 1) { 
      retval["txt"] = "You can't reach the keys from here.";
      retval["fin"] = 0;
      return retval;
    } else {  
      retval["txt"] = "Drawing upon your years of training from your tutors, you give a passable performance.";
      let ev = new DUEvent("Harpsichord Plays",who,[]);
      Listener.sendEvent(ev);
      // Consider adding a sound effect if I find a good one
    }
  }
  return retval;
}

function BedrollHeadEmptyTile() {
  this.name = "BedrollHeadEmpty";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -169*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bedroll";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
BedrollHeadEmptyTile.prototype = new FeatureObject();

function BedrollFootEmptyTile() {
  this.name = "BedrollFootEmpty";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -169*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bedroll";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
BedrollFootEmptyTile.prototype = new FeatureObject();

function BedrollFootFullTile() {
  this.name = "BedrollFootFull";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -170*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bedroll";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
BedrollFootFullTile.prototype = new FeatureObject();

function BedHeadTile() {
  this.name = "BedHead";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
BedHeadTile.prototype = new FeatureObject();

function BedWalkOn(bedwho,bedarr) {
//  console.log(`Bed walk on: ${bedwho.npcname}`);
//  console.log(bedwho);
//  console.log(bedarr);
//  console.log(bedwho.getGraphicArray());
  bedwho.noAnim = 1;
  bedwho.animating = 0;  
  bedwho.inBed = "single";
  bedwho.makeLayers();
  DrawMainFrame("one",bedwho.getHomeMap(),bedwho.getx(),bedwho.gety());

//  console.log(fea);
  let fea = bedwho.getHomeMap().getTile(bedwho.getx()+1,bedwho.gety()).features.getAll();
  for (let i=0;i<fea.length;i++) {
    if (fea[i].getName() === "BedFoot") { 
      fea[i].setGraphicArray(["static.png","",-6*32,-90*32]); 
      fea[i].passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
      DrawMainFrame("one",fea[i].getHomeMap(),fea[i].getx(),fea[i].gety());
    }
  }
//  console.log(bedwho);
//  console.log(bedwho.realgraphic);
//  console.log(bedwho);
  return {msg:""};
}

function BedWalkOff(who, bed) {
//  console.log("Bed walk off.");
//  console.log(who);
  delete who.noAnim;
  delete who.inBed;
  who.makeLayers();
  DrawMainFrame("one",who.getHomeMap(),who.getx(),who.gety());

  let fea = who.getHomeMap().getTile(who.getx()+1,who.gety()).features.getAll();
  for (let i=0;i<fea.length;i++) {
    if (fea[i].getName() === "BedFoot") { 
      fea[i].setGraphicArray(["static.png","",-9*32,-89*32]);
      fea[i].passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
      DrawMainFrame("one",fea[i].getHomeMap(),fea[i].getx(),fea[i].gety());
    }
  }

  //  console.log(who);
  return {msg:""};
}

function BedBumpInto(who) {
  let retval = {};
	retval["fin"] = 1;
	retval["canmove"] = 1;
  retval["msg"] = "";
  
  // Prevent NPCs from randomwalking into the sleeping position
  if (who.aiWandering) { retval["canmove"] = 0; } 

  return(retval);
}

BedHeadTile.prototype.walkon = function(who) {
  let garr = ["static.png","",-5*32,-90*32];
  return BedWalkOn(who,garr);
}

BedHeadTile.prototype.walkoff = function(who) {
  return BedWalkOff(who);
}

BedHeadTile.prototype.bumpinto = function(who) {
  return BedBumpInto(who);
}

function DoubleBedHeadTile() {
  this.name = "DoubleBedHead";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -91*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;
  this.occupants = ["",""];

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedHeadTile.prototype = new FeatureObject();

DoubleBedHeadTile.prototype.walkon = function(who) {

  this.addOccupant(who);
  this.setLook();

  return {msg:""};
}

DoubleBedHeadTile.prototype.walkoff = function(who) {
  delete who.noAnim;
  delete who.inBed;
  who.makeLayers();
  DrawMainFrame("one",who.getHomeMap(),who.getx(),who.gety());

  this.removeOccupant(who);
  this.setLook();

  return {msg:""};
}

DoubleBedHeadTile.prototype.bumpinto = function(who) {
  return BedBumpInto(who);
}

DoubleBedHeadTile.prototype.checkForSpace = function() {
  if ((this.occupants[0] === "") || (this.occupants[1] === "")) {
    return 1;
  } else { return 0; }
}

DoubleBedHeadTile.prototype.addOccupant = function(who) {
  let idx = 0;
  if (this.occupants[0] !== "") {
    if (this.occupants[1] !== "") { 
      return -1; // No room!
    }
    idx = 1;
  }
  this.occupants[idx] = who;
  
}

DoubleBedHeadTile.prototype.removeOccupant = function(who) {
  if (this.occupants[0] === who) { this.occupants[0] = ""; }
  else if (this.occupants[1] === who) { this.occupants[1] = ""; }
  else { 
    return -1;
    // This person isn't in this bed!
  }
  return 1;
}

DoubleBedHeadTile.prototype.setLook = function() {
  let fea = this.getHomeMap().getTile(this.getx()+1,this.gety()).features.getAll();
  let foot;
  for (let i=0;i<fea.length;i++) { if (fea[i].getName() === "DoubleBedFoot") { foot = fea[i]; } }
  if (!this.occupants[0] && !this.occupants[1]) {
    foot.setGraphicArray(["static.png","",-5*32,-91*32]);
    foot.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
    DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
    DrawMainFrame("one",this.getHomeMap(),this.getx()+1,this.gety());
  } else if (this.occupants[0] && !this.occupants[1]) {
    this.occupants[0].inBed = "dblsinglelower";
    this.occupants[0].noAnim = 1;
    this.occupants[0].animating = 0;  
    this.occupants[0].makeLayers();
    foot.setGraphicArray(["static.png","",-7*32,-91*32]);
    foot.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
    DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
    DrawMainFrame("one",this.getHomeMap(),this.getx()+1,this.gety());
  } else if (!this.occupants[0] && this.occupants[1]) {
    this.occupants[1].inBed = "dblsingleupper";
    this.occupants[1].noAnim = 1;
    this.occupants[1].animating = 0; 
    this.occupants[1].makeLayers(); 
    foot.setGraphicArray(["static.png","",-7*32,-91*32]);
    foot.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
    DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
    DrawMainFrame("one",this.getHomeMap(),this.getx()+1,this.gety());
  } else if (this.occupants[0] && this.occupants[1]) {
    this.occupants[0].inBed = "dbldbllower";
    this.occupants[1].inBed = "dbldblupper";
    this.occupants[0].noAnim = 1;
    this.occupants[1].noAnim = 1;
    this.occupants[0].animating = 0;  
    this.occupants[1].animating = 0;  
    this.occupants[0].makeLayers();
    this.occupants[1].makeLayers();
    foot.setGraphicArray(["static.png","",-7*32,-91*32]);
    foot.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
    DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
    DrawMainFrame("one",this.getHomeMap(),this.getx()+1,this.gety());
  } else {
    alert("How did I get here? (Doublebed setlook occupant fail.)"); 
  }
}

function BedFootTile() {
  this.name = "BedFoot";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
BedFootTile.prototype = new FeatureObject();

function DoubleBedFootTile() {
  this.name = "DoubleBedFoot";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -91*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedFootTile.prototype = new FeatureObject();

function DoubleBedTopHeadTile() {
  this.name = "DoubleBedTopHead";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-1632";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedTopHeadTile.prototype = new FeatureObject();

DoubleBedTopHeadTile.prototype.walkon = function(who) {
  let garr = ["master_spritesheet.png","","-64","-1632"];
  return BedWalkOn(who,garr);
}

DoubleBedTopHeadTile.prototype.walkoff = function(who) {
  return BedWalkOff(who);
}

DoubleBedTopHeadTile.prototype.bumpinto = function(who) {
  return BedBumpInto(who);
}

function DoubleBedBottomHeadTile() {
  this.name = "DoubleBedBottomHead";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-1664";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedBottomHeadTile.prototype = new FeatureObject();

DoubleBedBottomHeadTile.prototype.walkon = function(who) {
  let garr = ["master_spritesheet.png","","-64","-1664"];
  return BedWalkOn(who,garr);
}

DoubleBedBottomHeadTile.prototype.walkoff = function(who) {
  return BedWalkOff(who);
}

DoubleBedBottomHeadTile.prototype.bumpinto = function(who) {
  return BedBumpInto(who);
}

function DoubleBedTopFootTile() {
  this.name = "DoubleBedTopFoot";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-1632";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedTopFootTile.prototype = new FeatureObject();

function DoubleBedBottomFootTile() {
  this.name = "DoubleBedBottomFoot";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-1664";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedBottomFootTile.prototype = new FeatureObject();

function EmptyBookshelfLeftTile() {
  //Graphics Upgraded
  this.name = "EmptyBookshelfLeft";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -84*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -2*32, -84*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
EmptyBookshelfLeftTile.prototype = new FeatureObject();

function EmptyBookshelfRightTile() {
  //Graphics Upgraded
  this.name = "EmptyBookshelfRight";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -84*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -3*32, -84*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
EmptyBookshelfRightTile.prototype = new FeatureObject();

function LooseFloorboardEWTile() {
  this.name = "LooseFloorboardEW";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.prefix = "a";
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
  this.alternateSearchText = "You pry up a loose floorboard. Underneath, you find:";
}
LooseFloorboardEWTile.prototype = new FeatureObject();

LooseFloorboardEWTile.prototype.walkon = function(who) {
  if (who === PC) {
    return {msg: "Creak!"}
  }
  return {msg:""}
}

function BookshelfLeftTile() {
  //Graphics Upgraded
  this.name = "BookshelfLeft";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -84*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -6*32, -84*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
BookshelfLeftTile.prototype = new FeatureObject();

function BookshelfLeft2Tile() {
  //Graphics Upgraded
  this.name = "BookshelfLeft2";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -92*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -6*32, -84*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
BookshelfLeft2Tile.prototype = new FeatureObject();

function BookshelfRightTile() {
  //Graphics Upgraded
  this.name = "BookshelfRight";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -84*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -7*32, -84*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
BookshelfRightTile.prototype = new FeatureObject();

function BookshelfOneTile() {
  //Graphics Upgraded
  this.name = "BookshelfOne";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -83*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -5*32, -83*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
BookshelfOneTile.prototype = new FeatureObject();

function RuinedBookshelfOneTile() {
  //Graphics Upgraded
  this.name = "RuinedBookshelfOne";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
RuinedBookshelfOneTile.prototype = new FeatureObject();

function RuinedBookshelfLeftTile() {
  //Graphics Upgraded
  this.name = "RuinedBookshelfLeft";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
RuinedBookshelfLeftTile.prototype = new FeatureObject();

function RuinedBookshelfRightTile() {
  //Graphics Upgraded
  this.name = "RuinedBookshelfRight";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
RuinedBookshelfRightTile.prototype = new FeatureObject();

function SmallBoxTile() {
  this.name = "SmallBox";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -79*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "small box";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -2*32, -79*32];
	this.lootgroup = "";
	this.lootedid = "";
	
	this.container = [];
  OpenContainer.call(this,"sfx_chest_open","sfx_locked_door");
  Lockable.call(this, ["static.png","",0,-79*32], ["static.png","",0,-79*32], ["static.png","",0,-79*32], 	"a",  "small box", "a", "locked small box", "a", "magically locked small box");
}
SmallBoxTile.prototype = new FeatureObject();

function CrateTile() {
  this.name = "Crate";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -79*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "small box";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -32, -79*32];
	this.lootgroup = "";
	this.lootedid = "";
	
	this.container = [];
  OpenContainer.call(this,"sfx_chest_open","sfx_locked_door");
  Lockable.call(this, ["static.png","",0,-79*32], ["static.png","",0,-79*32], ["static.png","",0,-79*32], 	"a",  "small box", "a", "locked small box", "a", "magically locked small box");
}
CrateTile.prototype = new FeatureObject();

function DresserTile() {
  //Graphics Upgraded
  this.name = "Dresser";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dresser";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",-7*32,-82*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
DresserTile.prototype = new FeatureObject();

function Dresser2Tile() {
  //Graphics Upgraded
  this.name = "Dresser2";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dresser";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",-8*32,-82*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
Dresser2Tile.prototype = new FeatureObject();

function Dresser3Tile() {
  //Graphics Upgraded
  this.name = "Dresser3";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dresser";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",0,-83*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
Dresser3Tile.prototype = new FeatureObject();

function VanityTile() {
  //Graphics Upgraded
  this.name = "Vanity";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "vanity";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",-4*32,-82*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
VanityTile.prototype = new FeatureObject();

function Vanity2Tile() {
  //Graphics Upgraded
  this.name = "Vanity2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "vanity";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",-5*32,-82*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
Vanity2Tile.prototype = new FeatureObject();

function Vanity3Tile() {
  //Graphics Upgraded
  this.name = "Vanity3";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "vanity";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",-6*32,-82*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
Vanity3Tile.prototype = new FeatureObject();

function CaskTile() {
  //Graphics Upgraded
  this.name = "Cask";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "cask";
	
}
CaskTile.prototype = new FeatureObject();

function TreeTile() {
  //Graphics Upgraded
  this.name = "Tree";
	this.graphic = "static.png";
	this.spritexoffset = -2*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tree";
}
TreeTile.prototype = new FeatureObject();

function AutumnTreeTile() {
  //Graphics Upgraded
  this.name = "AutumnTree";
	this.graphic = "static.png";
	this.spritexoffset = -3*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tree";
}
AutumnTreeTile.prototype = new FeatureObject();

function EvergreenTile() {
  //Graphics Upgraded
  this.name = "Evergreen";
	this.graphic = "static.png";
	this.spritexoffset = -5*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "evergreen tree";
}
EvergreenTile.prototype = new FeatureObject();

function WillowTreeTile() {
  //Graphics Upgraded
  this.name = "WillowTree";
	this.graphic = "static.png";
	this.spritexoffset = -32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "willow tree";
}
WillowTreeTile.prototype = new FeatureObject();

function DeadTreeTile() {
  //Graphics Upgraded
  this.name = "DeadTree";
	this.graphic = "static.png";
	this.spritexoffset = 0;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dead tree";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 0;
  this.searchedgraphic = ["static.png","",0,-19*32];
	}
DeadTreeTile.prototype = new FeatureObject();

function AppleTreeTile() {
  //Graphics Upgraded
  this.name = "AppleTree";
	this.graphic = "static.png";
	this.spritexoffset = -4*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "apple tree";
}
AppleTreeTile.prototype = new FeatureObject();

function OlympusTapestryTile() {
  this.name = "OlympusTapestry";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "tapestry with the seal of House Olympus";
}
OlympusTapestryTile.prototype = new FeatureObject();

function PaladinTapestryTile() {
  this.name = "PaladinTapestry";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "tapestry with the chalice of the Paladins";
}
PaladinTapestryTile.prototype = new FeatureObject();

function HildendainTapestryTile() {
  this.name = "HildendainTapestry";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "tapestry with the seal of House Hildendain";
}
HildendainTapestryTile.prototype = new FeatureObject();

function GrandfatherClockTile() {
  //Graphics Upgraded
  this.name = "GrandfatherClock";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -107*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grandfather clock";

  ManualAnimation.call(this, { animstart: 0,
    animlength: 8,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 250,
    framedurationmax: 250,
    startframe: "start"
  });
}
GrandfatherClockTile.prototype = new FeatureObject();

// override
GrandfatherClockTile.prototype.getFullDesc = function() {
  let full = "";
  if (this.getPrefix()) {
    full = this.getPrefix() + " ";
  }
  
  full = full + this.getDesc();

  full = full + " that reads ";
  let gfclocktime = GetDisplayTime();
  full = full + gfclocktime;

  return full;
}

GrandfatherClockTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
    let time = GetClockTime();
    this.currentHour = time[3];
  }
}

GrandfatherClockTile.prototype.myTurn = function() {
  let time = GetClockTime();
  let hour = time[3];
  if (hour !== this.currentHour) {
    this.currentHour = hour;
    if (!PC.getWaiting() && (PC.getHomeMap() === this.getHomeMap()) && (GetDistance(PC.getx(),PC.gety(),this.getx(),this.gety()) < 5)) {
      if (hour > 12) { hour -= 12; }
      if (hour === 0) { hour = 12; }
      TollChime(hour, this);
    }
  }
  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);

  return 1;
}

function TollChime(hoursleft, clock) {
  if (hoursleft) {
    if (clock.getHomeMap() !== PC.getHomeMap()) { return; }
    let dist = GetDistance(clock.getx(),clock.gety(),PC.getx(),PC.gety())-4;
    let sndmult = 1;
    if (dist > 0) {
      sndmult = Math.max(0, 1 - dist/6);
    }
    DUPlaySound("sfx_bong", sndmult);
    setTimeout(function() { TollChime(hoursleft-1, clock); }, 1500);
  }
}

function BarrelTile() {
  //Graphics Upgraded
  this.name = "Barrel";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -79*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "barrel";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -7*32, -79*32];
	this.lootgroup = "";
	this.lootedid = "";
  this.flammable = 20; // 20% chance it burns if in a fire
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
	
	this.container = [];
	OpenContainer.call(this,"","");
	Pushable.call(this);
}
BarrelTile.prototype = new FeatureObject();

BarrelTile.prototype.flamed = function() {
  ContainerOnFire(this);
}

function ContainerOnFire(what) {
  maintext.addText("The " + what.getDesc() + " is consumed by flame!");
  let burnup = what.use(what,1); // ignore locked and trapped
  if (burnup["txt"] === "Empty.") {
    maintext.addText("It was empty.");
  } else {
    maintext.addText(burnup["txt"]);
  }
  let thisx = what.getx();
  let thisy = what.gety();
  
  let itsmap = what.getHomeMap();
  itsmap.deleteThing(what);
  DrawMainFrame("one",itsmap,thisx,thisy);
  
  return 1; 
}

function KitchenBarrelTile() {
  this.name = "KitchenBarrel";
}
KitchenBarrelTile.prototype = new BarrelTile();

KitchenBarrelTile.prototype.use = function(who) {
  let retval = { fin: 1, txt: "It is full of salt and spices."};
  return retval;
}

function KitchenBarrel2Tile() {
  this.name = "KitchenBarrel2";
}
KitchenBarrel2Tile.prototype = new BarrelTile();

KitchenBarrel2Tile.prototype.use = function(who) {
  let retval = { fin: 1, txt: "It is full of salted meat."};
  return retval;
}

function KitchenBarrel3Tile() {
  this.name = "KitchenBarrel3";
}
KitchenBarrel3Tile.prototype = new BarrelTile();

KitchenBarrel3Tile.prototype.use = function(who) {
  let retval = { fin: 1, txt: "It is full of delicious cheeses."};
  return retval;
}

function Barrel2Tile() {
  //Graphics Upgraded
  this.name = "Barrel2";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -79*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "barrel";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -8*32, -79*32];
	this.lootgroup = "";
	this.lootedid = "";
  this.flammable = 20; // 20% chance it burns if in a fire
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
	
	this.container = [];
	OpenContainer.call(this,"","");
	Pushable.call(this);
}
Barrel2Tile.prototype = new FeatureObject();

Barrel2Tile.prototype.flamed = function() {
  ContainerOnFire(this);
}

function CrackedMirrorTile() {
  //Graphics Upgraded
  this.name = "CrackedMirror";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -76*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mirror";
  this.karmamod = -1;
  
  Breakable.call(this,["static.png", "", -7*32, -77*32],0,"sfx_break_glass");
  this.brokendesc = "broken mirror";
}
CrackedMirrorTile.prototype = new FeatureObject();

function SunLensTile() {
  //Graphics Upgraded
  this.name = "SunLens";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -109*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "magical lens";
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
	
	Pushable.call(this);
}
SunLensTile.prototype = new FeatureObject();

SunLensTile.prototype.use = function(who) {
  let retval = { fin: 1 };
  if ((this.getx() >= 11) && (this.getx() <= 17) && (this.gety() >= 11) && (this.gety() <= 15) && CheckTimeBetween("12:00","12:59")) {
    let frozen = localFactory.createTile("FrozenSunlight");
    let NPCevent = new GameEvent(frozen);
    DUTime.addAtTimeInterval(NPCevent,3*SCALE_TIME);

    who.addToInventory(frozen,1);
    retval["txt"] = "You angle the lens to catch the sunlight, and on the other side the light is concentrated to a point. There is a haze, and then in a flash a small glowing crystal coalesces. You catch it before it can fall to the ground.";
    maintext.delayedAddText = "<span class='sysconv'>You have gained: crystalized sunlight.</span>";
  } else {
    retval["txt"] = "Nothing happens when you try to use the strange device.";
  }
  return retval;
}

function MirrorTile() {
  //Graphics Upgraded
  this.name = "Mirror";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -76*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mirror";
  this.karmamod = -1;
  
  Breakable.call(this,["static.png", "", -7*32, -76*32],0,"sfx_break_glass");
  this.brokendesc = "broken mirror";
}
MirrorTile.prototype = new FeatureObject();

MirrorTile.prototype.activate = function() {
  if (!DU.gameflags.getFlag("editor")) {
    let reflection = localFactory.createTile("Reflection");
    reflection.mirror = this;
    let homemap = this.getHomeMap();
    homemap.placeThing(this.getx(),this.gety()+1,reflection);
  }
  return 1;
}

function ReflectionTile() {
  this.name = "Reflection";
  this.graphic = "walkon.gif";
  this.invisible = 1;
  this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "reflection walkon";
  this.nosave = 1;
}
ReflectionTile.prototype = new FeatureObject();

ReflectionTile.prototype.walkon = function(who) {
  // add reflection to attached mirror
  if (!this.mirror.getBroken()) {
    this.mirror.setGraphicArray([who.getGraphic(), "mirror-reflection_d.gif", "0", "7"]);
  }
  return {msg:""};
}

ReflectionTile.prototype.walkoff = function(who) {
  // remove reflection from attached mirror
  if (!this.mirror.getBroken()) {
    this.mirror.setGraphicArray(["master_spritesheet_d.gif", "", "-192", "-384"]);
  }
  return {msg:""};
}

function CursedMirrorTile() {
  this.name = "CursedMirror";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -76*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mirror";
  
  Breakable.call(this,["static.png", "", -7*32, -76*32],0,"sfx_break_glass");
  this.brokendesc = "broken mirror";
}
CursedMirrorTile.prototype = new FeatureObject();

CursedMirrorTile.prototype.activate = function() {
  if (!DU.gameflags.getFlag("editor")) {
    let reflection = localFactory.createTile("CursedReflection");
    reflection.mirror = this;
    let homemap = this.getHomeMap();
    homemap.placeThing(this.getx(),this.gety()+2,reflection);
  }
  return 1;
}

CursedMirrorTile.prototype.onBreak = function(who) {
  // generate Imp and place on broken mirror

  Earthquake();
  let imp = localFactory.createTile("ImpNPC");
  imp.lootTable = "cursed";
  this.getHomeMap().placeThing(this.getx(),this.gety(),imp);
  DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
  let energy = localFactory.createTile("EnergyField");
  this.getHomeMap().placeThing(10,10,energy);
  DrawMainFrame("one",this.getHomeMap(),10,10);
  let negated = DU.gameflags.getFlag("negate");
  delete negated[this.getHomeMap().getName()];
  DU.gameflags.setFlag("negate", negated);
  maintext.delayedAddText("You feel the flow of ether surround you once more!");
}

function CursedReflectionTile() {
  this.name = "CursedReflection";
  this.graphic = "walkon.gif";
  this.invisible = 1;
  this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "daemonic image";
  this.nosave = 1;
  this.conversation = "cursed_mirror";
}
CursedReflectionTile.prototype = new FeatureObject();

CursedReflectionTile.prototype.getConversation = function() {
  return this.conversation;
}

CursedReflectionTile.prototype.getGenderedTerms = function() {
  let gt = {};
  gt.pronoun = "it";
  gt.possessive = "its";
  gt.objective = "it";
  gt.titled = "Lord";
  gt.sibling = "sibling";
  gt.kiddie = "child";    
  return gt;  
}

CursedReflectionTile.prototype.getNPCName = function() {
	return "The cursed mirror";
}

CursedReflectionTile.prototype.walkon = function(who) {
  // add reflection to attached mirror
  if (!this.mirror.getBroken()) {
//    this.mirror.setGraphicArray(["351.gif", "mirror-reflection_d.gif", "0", "7"]);
    let cursedmap = this.getHomeMap();
    let cx = this.mirror.getx();
    let cy = this.mirror.gety();
    cursedmap.deleteThing(this.mirror);
    let newmirror = localFactory.createTile("CursedMirrorWithImp");
    cursedmap.placeThing(cx,cy,newmirror);
    // Actually use Imp graphic rather than Daemon

    let field = cursedmap.getTile(10,10).getTopFeature();
    cursedmap.deleteThing(field);
    let tree = localFactory.createTile("DeadTree");
    cursedmap.placeThing(10,10,tree);

    let retval = {};
    retval.msg = "";
    if (!DU.gameflags.getFlag("mirror_talks")) {
      DU.gameflags.setFlag("mirror_talks",1);
      retval = PerformTalk(this,"cursed_mirror","_start");
      retval["override"] = -3;
      maintext.drawTextFrame();
      return retval;
    } 
    this.getHomeMap().deleteThing(this);

    //	this.graphic = "master_spritesheet.png";    // spritesheet version of reflection. Can't work yet because of need to be overlay
    // this.spritexoffset = "-288"; 
    // this.spriteyoffset = "-1344";
  }
  return {msg:""};
}

function CursedMirrorWithImpTile() {
  this.name = "CursedMirrorWithImp";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -145*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mirror";
  
  Breakable.call(this,["static.png", "", -7*32, -76*32],0,"sfx_break_glass");
  this.brokendesc = "broken mirror";

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 240,
    framedurationmax: 320,
    startframe: "random"
  });

  this.conversation = "cursed_mirror";
}
CursedMirrorWithImpTile.prototype = new FeatureObject();

CursedMirrorWithImpTile.prototype.getConversation = function() {
  return this.conversation;
}

CursedMirrorWithImpTile.prototype.getGenderedTerms = function() {
  let gt = {};
  gt.pronoun = "it";
  gt.possessive = "its";
  gt.objective = "it";
  gt.titled = "Lord";
  gt.sibling = "sibling";
  gt.kiddie = "child";    
  return gt;  
}

CursedMirrorWithImpTile.prototype.getNPCName = function() {
	return "The cursed mirror";
}

CursedMirrorWithImpTile.prototype.onBreak = function(who) {
  // generate Imp and place on broken mirror

  Earthquake();
  let imp = localFactory.createTile("ImpNPC");
  imp.lootTable = "cursed";
  let impmap = this.getHomeMap();
  impmap.deleteThing(this);
  let ix=this.getx();
  let iy=this.gety();
  let brokenmirror = localFactory.createTile("Mirror");
  brokenmirror.break(imp,1,1);
  impmap.placeThing(ix,iy,brokenmirror);
  impmap.placeThing(ix,iy,imp);
  DrawMainFrame("one",impmap,ix,iy);
  let energy = localFactory.createTile("EnergyField");
  impmap.placeThing(10,10,energy);
  DrawMainFrame("one",impmap,10,10);
  let negated = DU.gameflags.getFlag("negate");
  delete negated[impmap.getName()];
  DU.gameflags.setFlag("negate", negated);
  maintext.delayedAddText("You feel the flow of ether surround you once more!");
  this.noAnim = 1;
}

function DaemonicMirrorTile() {
  this.name = "DaemonicMirror";
  this.graphic = "master_spritesheet_d.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-384";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mirror";
  
  Breakable.call(this,["master_spritesheet_d.gif", "", "-224", "-384"],0,"sfx_break_glass");
  this.brokendesc = "broken mirror";
}
DaemonicMirrorTile.prototype = new FeatureObject();

DaemonicMirrorTile.prototype.activate = function() {
  if (!DU.gameflags.getFlag("editor")) {
    let reflection = localFactory.createTile("DaemonicReflection");
    reflection.mirror = this;
    let homemap = this.getHomeMap();
    homemap.placeThing(this.getx(),this.gety()+1,reflection);
  }
  return 1;
}

DaemonicMirrorTile.prototype.onBreak = function(who) {
  let thismap = this.getHomeMap();
  let allbroke = 1;
  let reflection = thismap.getTile(this.getx(),this.gety()+1).getTopFeature();
  if (reflection.getName() === "DaemonicReflection") { 
    thismap.deleteThing(reflection);
  }

  for (let i=14;i<=18;i++) {
    let mirror = thismap.getTile(i,20).getTopFeature();
    if (!mirror.broken) { allbroke = 0; }
  }
  if (allbroke && (whoseturn === PC)) {
    DUPlaySound("sfx_thunder");
    let daemon = localFactory.createTile("DaemonNPC");
    this.getHomeMap().placeThing(23,21,daemon);
  }
}

function DaemonicReflectionTile() {
  this.name = "DaemonicReflection";
  this.graphic = "walkon.gif";
  this.invisible = 1;
  this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "reflection walkon";
  this.nosave = 1;
}
DaemonicReflectionTile.prototype = new FeatureObject();

DaemonicReflectionTile.prototype.walkon = function(who) {
  // add reflection to attached mirror
  if (!this.mirror.getBroken()) {
    this.mirror.setGraphicArray([who.getGraphic(), "mirror-reflection_d.gif", "0", "7"]);
    //	this.graphic = "master_spritesheet_d.gif";    // spritesheet version of reflection. Can't work yet because of need to be overlay
    // this.spritexoffset = "-288"; 
    // this.spriteyoffset = "-1344";
    this.mirror.reflecting = 1;
  }
  return {msg:""};
}

DaemonicReflectionTile.prototype.walkoff = function(who) {
  let allreflect = 1;
  let thismap = this.getHomeMap();
  for (let i=14;i<=18;i++) {
    let mirror = thismap.getTile(i,20).getTopFeature();
    if (!mirror.reflecting) { allreflect = 0; }
  }
  if (allreflect) {
    let darkness = thismap.getTile(18,32).getTopNPC();
    darkness.reflecting = 1;
  }
  return {msg:""};
}

function AlchemyLabTopTile() {
  this.name = "AlchemyLabTop";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-1632";
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_SWIM + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemy lab";
  this.alwaystop = 1;
}
AlchemyLabTopTile.prototype = new FeatureObject();

function AlchemyLabTop2Tile() {
  this.name = "AlchemyLabTop2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-1632";
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_SWIM + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemy lab";
  this.alwaystop = 1;
}
AlchemyLabTop2Tile.prototype = new FeatureObject();

function AlchemyLabTile() {
  this.name = "AlchemyLab";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-1664";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemy lab";
}
AlchemyLabTile.prototype = new FeatureObject();

function AlchemyLab2Tile() {
  this.name = "AlchemyLab2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-1664";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemy lab";
}
AlchemyLab2Tile.prototype = new FeatureObject();

function WaterfallTile() {
  //Graphics Upgraded
  this.name = "Waterfall";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -118*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "waterfall";
    
  HasAmbientNoise.call(this,"sfx_waterfall",1.5);

  ManualAnimation.call(this, { 
    animstart: -4*32,
    animlength: 4,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 150,
    startframe: "random"
  });
}
WaterfallTile.prototype = new FeatureObject();

WaterfallTile.prototype.activate = function() {
  if (!DU.gameflags.getFlag("editor")) {
    let flow = localFactory.createTile("WaterfallFlow");
    flow.waterfall = this;
    let homemap = this.getHomeMap();
    homemap.placeThing(this.getx(),this.gety()-1,flow);
  }
  return 1;
}

function WaterfallFlowTile() {
  this.name = "WaterfallFlow";
  this.graphic = "walkon.gif";
  this.invisible = 1;
  this.passable = MOVE_SWIM + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "waterfall flow walkon";
  this.nosave = 1;
}
WaterfallFlowTile.prototype = new FeatureObject();

WaterfallFlowTile.prototype.walkon = function(who) {
  // Go falling down
  gamestate.setMode("null");
  if (who.getMovetype() & MOVE_FLY) { return {msg:""}; }
  let waterfall = this.waterfall;
  setTimeout(function() {
    DescendWaterfall(who, waterfall);
  }, 300);
  return {msg:""};
}

function DescendWaterfall(who, waterfall) {
  let thismap = who.getHomeMap();
  thismap.moveThing(who.getx(),who.gety()+1,who);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());  
  if (who.gety() === waterfall.gety()) {
    setTimeout(function() {
      DescendWaterfall(who,waterfall);
    }, 100);
  } else {
    DUPlaySound("sfx_waterfall_fall");
    if (who === PC) {
      maintext.addText("You are swept down the waterfall!");
    }
    who.dealDamage(Dice.roll("1d10"));
    who.endTurn(0);
  }
}

function GrassWaterfallTile() {
  this.name = "GrassWaterfall";
//  this.layers = [["static.png","",-3*32,-60*32]];
}
GrassWaterfallTile.prototype = new WaterfallTile();

function DirtWaterfallTile() {
  this.name = "DirtWaterfall";
  this.layers = [["static.png","",-3*32,-67*32]];
}
DirtWaterfallTile.prototype = new WaterfallTile();

function CaveWaterfallTile() {
  this.name = "CaveWaterfall";
  this.layers = [["static.png","",-2*32,-67*32]];
}
CaveWaterfallTile.prototype = new WaterfallTile();

function BrilliantPoolTile() {
  this.name = "BrilliantPool";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -104*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "Brilliant Pool";

  ManualAnimation.call(this, { animstart: -6*32,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 200,
    startframe: "random"
  });

}
BrilliantPoolTile.prototype = new FeatureObject();

BrilliantPoolTile.prototype.use = function(who) {
  let retval = {};
  
  if (who === PC) {
    targetCursor.useditem = this;
    retval["override"] = -1;
    retval["fin"] = -1;
    retval["txt"] = "Drink from the pool?";
    retval["input"] = "(Y/N): ";
    return retval;
  }
  retval["fin"] = 1;
  return retval;
}

BrilliantPoolTile.prototype.usePrompt = function(code) {
  let retval = {};
  retval["fin"] = 1;
  if (DU.gameflags.getFlag("pool_drunk")) {
    retval["txt"] = "Having previously drunk of the pool, you are now too smart to dare try that again.";
    retval["fin"] = 3;
    return retval;
  }
  if (code === 89) {
    retval["txt"] = "You drink from the pool.";
    retval["override"] = 1;        
    retval["fin"] = 3;
    targetCursor.booktext = ["You feel tremendous power rush into you!","You view the world from above, seeing the secrets and the minds of each and every living thing.","This bright elixir peerless you have drunk...","YOU KNOW ALL THINGS!","...It is too much for your mortal mind...","Suddenly you are aware of just one thing-", "your mind is burning."];
    targetCursor.useditem = this;
    targetCursor.bookfinish = 1;
  } else {
    retval["txt"] = "You choose not to drink.";
  }
  return retval;
}

BrilliantPoolTile.prototype.bookFinish = function() {
  PC.setOrbInt(PC.getOrbInt() + 1);
  DU.gameflags.setFlag("pool_drunk",1);
  PC.dealDamage(PC.getMaxHP() + 100);
  return;
}

function SecretDoorTile() {
	this.name = "SecretDoor";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 2; 
	this.prefix = "a";
	this.desc = "wall";
	
	this.searchDesc = "secret door";
	this.searchPrefix = "a";
  this.peerview = "white";
  
  this.pathweight = 2; 
	
  Openable.call(this, [this.graphic, "", -8*32, -15*32], [this.graphic,"",-7*32,-16*32], 0, "sfx_stone_drag", "sfx_stone_drag", "sfx_locked_door");
}
SecretDoorTile.prototype = new FeatureObject();

function GreySecretDoorTile() {
	this.name = "GreySecretDoor";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -18*32;
  this.passable = MOVE_ETHEREAL;
	this.blocklos = 2; 
	this.prefix = "a";
	this.desc = "wall";
	
	this.searchDesc = "secret door";
	this.searchPrefix = "a";
  this.peerview = "white";
  
  this.pathweight = 2; 
	
  Openable.call(this, [this.graphic, "", -8*32, -18*32], [this.graphic,"",-6*32,-17*32], 0, "sfx_stone_drag", "sfx_stone_drag", "sfx_locked_door");
}
GreySecretDoorTile.prototype = new FeatureObject();

function ShiftingWallTile() {
  this.name = "ShiftingWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
ShiftingWallTile.prototype = new FeatureObject();

function DestructableStoneWallTile() {
  this.name = "DestructableStoneWall";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
DestructableStoneWallTile.prototype = new FeatureObject();

function RuinsWallTallLeftMidRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallTallLeftMidRight";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallTallLeftMidRightTile.prototype = new FeatureObject();

function RuinsWallTallLeftMidRight2Tile() {
  //Graphics Upgraded
  this.name = "RuinsWallTallLeftMidRight2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallTallLeftMidRight2Tile.prototype = new FeatureObject();

function RuinsWallMidLeftMidRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallMidLeftMidRight";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallMidLeftMidRightTile.prototype = new FeatureObject();

function RuinsWallMidLeftTallRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallMidLeftTallRight";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallMidLeftTallRightTile.prototype = new FeatureObject();

function RuinsWallMidLeftBottomRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallMidLeftBottomRight";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallMidLeftBottomRightTile.prototype = new FeatureObject();

function RuinsWallBottomLeftBottomRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallBottomLeftBottomRight";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallBottomLeftBottomRightTile.prototype = new FeatureObject();

function RuinsWallBottomLeftMidRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallBottomLeftMidRight";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallBottomLeftMidRightTile.prototype = new FeatureObject();

function WellTile() {
  //Graphics Upgraded
	this.name = "Well";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -76*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "well";
}
WellTile.prototype = new FeatureObject();

WellTile.prototype.use = function(who) {
  if (this.spritexoffset === -3*32) { this.spritexoffset = -4*32; }
  else { this.spritexoffset = -3*32; }
  DrawMainFrame("one",this.getHomeMap(), this.getx(), this.gety());
}

function BareWellTile() {
  //Graphics Upgraded
	this.name = "BareWell";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -76*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "well";
}
BareWellTile.prototype = new FeatureObject();

function WhirlpoolTile() {
	this.name = "Whirlpool";
	this.graphic = "325.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "whirlpool";
  
  Enterable.call(this, "null", 0, 0);
}
WhirlpoolTile.prototype = new FeatureObject();

function WhirlpoolFlukeTile() {
	this.name = "WhirlpoolFluke";
	this.graphic = "325.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "whirlpool";
  
}
WhirlpoolFlukeTile.prototype = new FeatureObject();

WhirlpoolFlukeTile.prototype.walkon = function(walker) {
  let diz = localFactory.createTile("Dizzy");
  diz.setExpiresTime(-1);
  walker.addSpellEffect(diz);
  return {msg:""};
}

WhirlpoolFlukeTile.prototype.walkoff = function(walker) {
  let diz = walker.getSpellEffectsByName("Dizzy");
  walker.deleteSpellEffect(diz);
  return {msg:""};
}

WhirlpoolFlukeTile.prototype.walkofftest = function(walker) {
  let chance = Dice.roll("1d30");
  let retval = []
  if (chance < walker.getStr()) {
    retval["txt"] = "You struggle to escape the pull of the whirlpool. You succeed!";
    retval["success"] = 1; 
  } else {
    retval["txt"] = "You struggle to escape the pull of the whirlpool. You fail.";
    retval["success"] = 0;
  }
  return retval;
}

function WalkOnTile() {
	this.name = "WalkOn";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnTile.prototype = new FeatureObject();

function WalkOnWingTile() {
	this.name = "WalkOnWing";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWingTile.prototype = new FeatureObject();

WalkOnWingTile.prototype.walkon = function(walker) {
  if ((walker === PC) && !walker.getHomeMap().blessed) {
    walker.getHomeMap().blessed = 1;
    walker.setHP(walker.getMaxHP());
    walker.setMana(walker.getMaxMana());
    if (!walker.getSpellEffectsByName("Blessing")) {
      let blessing = localFactory.createTile("Blessing");
      blessing.setPower(3);
      blessing.setExpiresTime(DU.DUTime.getGameClock() + 12*24);
      PC.addSpellEffect(blessing);
      DrawCharFrame();
    }
    return {msg: "The sound of water rushing over the edge and plummeting below fills you with a sense of great peace and tranquility. You feel refreshed." };
  }
  return {msg:""};
}

function WalkOnWE31Tile() {
  this.name = "WalkOnWE31";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWE31Tile.prototype = new FeatureObject();

WalkOnWE31Tile.prototype.walkon = function(walker) {
  let wallmap = this.getHomeMap();
  let wall1 = wallmap.getTile(24,32).getTopFeature();
  if (wall1 && (wall1.getName() === "ShiftingWall") && (walker === PC)) {
    let wall2 = wallmap.getTile(24,33).getTopFeature();
    let wall3 = wallmap.getTile(24,34).getTopFeature();
    wallmap.moveThing(25,31,wall1);
    wallmap.moveThing(26,31,wall2);
    wallmap.moveThing(27,31,wall3);
    let wall4 = localFactory.createTile("ShiftingWall");
    wallmap.placeThing(28,32,wall4);
    let wall5 = localFactory.createTile("ShiftingWall");
    wallmap.placeThing(28,33,wall5);
    let wall6 = localFactory.createTile("ShiftingWall");
    wallmap.placeThing(28,34,wall6);
    DUPlaySound("sfx_stone_drag");
  }
  return {msg:""};
}

function WalkOnWE32Tile() {
  this.name = "WalkOnWE32";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWE32Tile.prototype = new FeatureObject();

WalkOnWE32Tile.prototype.walkon = function(walker) {
  let wallmap = this.getHomeMap();
  let wall1 = wallmap.getTile(17,31).getTopFeature();
  if (wall1 && (wall1.getName() === "ShiftingWall") && (walker === PC)) {
    let wall2 = wallmap.getTile(18,31).getTopFeature();
    let wall3 = wallmap.getTile(19,31).getTopFeature();
    wallmap.moveThing(16,32,wall1);
    wallmap.moveThing(16,33,wall2);
    wallmap.moveThing(16,34,wall3);
    DUPlaySound("sfx_stone_drag");
  }
  return {msg:""};
}

function WalkOnWE33Tile() {
  this.name = "WalkOnWE33";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWE33Tile.prototype = new FeatureObject();

WalkOnWE33Tile.prototype.walkon = function(walker) {
  let wallmap = this.getHomeMap();
  let wall1 = wallmap.getTile(17,24).getTopFeature();
  if (wall1 && (wall1.getName() === "ShiftingWall") && (walker === PC)) {
    let wall2 = wallmap.getTile(18,24).getTopFeature();
    let wall3 = wallmap.getTile(19,24).getTopFeature();
    wallmap.moveThing(20,25,wall1);
    wallmap.moveThing(20,26,wall2);
    wallmap.moveThing(20,27,wall3);
    DUPlaySound("sfx_stone_drag");
  }
  return {msg:""};
}

function WalkOnWE34Tile() {
  this.name = "WalkOnWE34";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWE34Tile.prototype = new FeatureObject();

WalkOnWE34Tile.prototype.walkon = function(walker) {
  let wallmap = this.getHomeMap();
  let wall1 = wallmap.getTile(17,15).getTopFeature();
  if (wall1 && (wall1.getName() === "ShiftingWall") && (walker === PC)) {
    let wall2 = wallmap.getTile(18,15).getTopFeature();
    let wall3 = wallmap.getTile(19,15).getTopFeature();
    wallmap.moveThing(17,19,wall1);
    wallmap.moveThing(18,19,wall2);
    wallmap.moveThing(19,19,wall3);
    let wall4 = wallmap.getTile(20,16).getTopFeature();
    let wall5 = wallmap.getTile(20,17).getTopFeature();
    let wall6 = wallmap.getTile(20,18).getTopFeature();
    wallmap.moveThing(22,12,wall4);
    wallmap.moveThing(22,13,wall5);
    wallmap.moveThing(22,14,wall6);

    let wall7 = wallmap.getTile(33,25).getTopFeature();
    let wall8 = wallmap.getTile(33,26).getTopFeature();
    let wall9 = wallmap.getTile(33,27).getTopFeature();
    wallmap.deleteThing(wall7);
    wallmap.deleteThing(wall8);
    wallmap.deleteThing(wall9);
    DUPlaySound("sfx_stone_drag");
  }

  return {msg:""};
}

function WalkOnWE35Tile() {
  this.name = "WalkOnWE35";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWE35Tile.prototype = new FeatureObject();

WalkOnWE35Tile.prototype.walkon = function(walker) {
  let wallmap = this.getHomeMap();
  let wall1 = wallmap.getTile(16,8).getTopFeature();
  if (wall1 && (wall1.getName() === "ShiftingWall") && (walker === PC)) {
    let wall2 = wallmap.getTile(16,9).getTopFeature();
    let wall3 = wallmap.getTile(16,10).getTopFeature();
    wallmap.moveThing(13,8,wall1);
    wallmap.moveThing(13,9,wall2);
    wallmap.moveThing(13,10,wall3);
    let wall4 = wallmap.getTile(24,8).getTopFeature();
    let wall5 = wallmap.getTile(24,9).getTopFeature();
    let wall6 = wallmap.getTile(24,10).getTopFeature();
    wallmap.moveThing(28,8,wall4);
    wallmap.moveThing(28,9,wall5);
    wallmap.moveThing(28,10,wall6);
    DUPlaySound("sfx_stone_drag");
  }
  return {msg:""};
}

function WalkOnWE36Tile() {
  this.name = "WalkOnWE36";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWE36Tile.prototype = new FeatureObject();

WalkOnWE36Tile.prototype.walkon = function(walker) {
  let wallmap = this.getHomeMap();
  let playsound = 0;
  let wall1 = wallmap.getTile(9,29).getTopFeature();
  if (wall1 && (wall1.getName() === "ShiftingWall") && (walker === PC)) {
    let wall2 = wallmap.getTile(9,30).getTopFeature();
    wallmap.moveThing(5,29,wall1);
    wallmap.moveThing(5,30,wall2);  
  }
  let walla = wallmap.getTile(13,8).getTopFeature();
  if (walla && (walla.getName() === "ShiftingWall") && (walker === PC)) {
    let wallb = wallmap.getTile(13,9).getTopFeature();
    let wallc = wallmap.getTile(13,10).getTopFeature();
    wallmap.moveThing(16,8,walla);
    wallmap.moveThing(16,9,wallb);
    wallmap.moveThing(16,10,wallc);
  }
  let walld = wallmap.getTile(28,8).getTopFeature();
  if (walld && (walld.getName() === "ShiftingWall") && (walker === PC)) {
    let walle = wallmap.getTile(28,9).getTopFeature();
    let wallf = wallmap.getTile(28,10).getTopFeature();
    wallmap.moveThing(24,8,walld);
    wallmap.moveThing(24,9,walle);
    wallmap.moveThing(24,10,wallf);
  }
  if (playsound) { DUPlaySound("sfx_stone_drag"); } 
  return {msg:""};
}

function WalkOnWE3TeleporterTile() {
  this.name = "WalkOnWE3Teleporter";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWE3TeleporterTile.prototype = new FeatureObject();

WalkOnWE3TeleporterTile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let wallmap = this.getHomeMap();
    wallmap.moveThing(9,17,walker);
    DUPlaySound("sfx_teleport_pad");
  }

  return {msg:""};
}

function WalkOnWE37Tile() {
  this.name = "WalkOnWE37";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWE37Tile.prototype = new FeatureObject();

WalkOnWE37Tile.prototype.walkon = function(walker) {
  let wallmap = this.getHomeMap();
  let wall1 = wallmap.getTile(34,15).getTopFeature();
  if (wall1 && (wall1.getName() === "ShiftingWall") && (walker === PC)) {
    let wall2 = wallmap.getTile(35,15).getTopFeature();
    let wall3 = wallmap.getTile(36,15).getTopFeature();
    wallmap.moveThing(33,16,wall1);
    wallmap.moveThing(33,17,wall2);
    wallmap.moveThing(33,18,wall3);

    let wall4 = wallmap.getTile(31,25).getTopFeature();
    let wall5 = wallmap.getTile(31,26).getTopFeature();
    let wall6 = wallmap.getTile(31,27).getTopFeature();
    wallmap.deleteThing(wall4);
    wallmap.deleteThing(wall5);
    wallmap.deleteThing(wall6);
    DUPlaySound("sfx_stone_drag");
  }

  return {msg:""};
}

function WalkOnWE38Tile() {
  this.name = "WalkOnWE38";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWE38Tile.prototype = new FeatureObject();

WalkOnWE38Tile.prototype.walkon = function(walker) {
  let wallmap = this.getHomeMap();
  let wall1 = wallmap.getTile(25,28).getTopFeature();
  if (wall1 && (wall1.getName() === "ShiftingWall") && (walker === PC)) {
    let wall2 = wallmap.getTile(26,28).getTopFeature();
    let wall3 = wallmap.getTile(27,28).getTopFeature();
    wallmap.moveThing(25,24,wall1);
    wallmap.moveThing(26,24,wall2);
    wallmap.moveThing(27,24,wall3);
    let wall4 = localFactory.createTile("ShiftingWall");
    wallmap.placeThing(24,25,wall4);
    let wall5 = localFactory.createTile("ShiftingWall");
    wallmap.placeThing(24,26,wall5);
    let wall6 = localFactory.createTile("ShiftingWall");
    wallmap.placeThing(24,27,wall6);
    DUPlaySound("sfx_stone_drag");
  }
  return {msg:""};
}


function WalkOnWE39Tile() {
  this.name = "WalkOnWE39";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWE39Tile.prototype = new FeatureObject();

WalkOnWE39Tile.prototype.walkon = function(walker) {
  let wallmap = this.getHomeMap();
  let wall1 = wallmap.getTile(29,25).getTopFeature();
  if (wall1 && (wall1.getName() === "ShiftingWall") && (walker === PC)) {
    let wall2 = wallmap.getTile(29,26).getTopFeature();
    let wall3 = wallmap.getTile(29,27).getTopFeature();
    wallmap.deleteThing(wall1);
    wallmap.deleteThing(wall2);
    wallmap.deleteThing(wall3);
    DUPlaySound("sfx_stone_drag");
  }
  return {msg:""};
}

function WalkOnConsolationTile() {
	this.name = "WalkOnConsolation";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnConsolationTile.prototype = new FeatureObject();

WalkOnConsolationTile.prototype.walkon = function(walker) {
  if (DU.gameflags.getFlag("enter_consolation")) {
    let themap = this.getHomeMap();
    let field = themap.getTile(16,25).getTopFeature();
    if (field) {
      themap.deleteThing(field);
      field = themap.getTile(17,25).getTopFeature();
      themap.deleteThing(field);
      DrawMainFrame("one",themap,16,25);
      DrawMainFrame("one",themap,17,25);
      return {msg:"The forcefield disappears as you approach."};  
    }
    return {msg:""};
  } else if (walker === PC) {
    let npc = this.getHomeMap().getTile(0,0).getTopNPC();
    if (npc) {
      PC.forcedTalk = npc;
    }
    return {msg:""};
  } else { 
    return {msg:""};
  }
}

function WalkOnTharockTile() {
	this.name = "WalkOnTharock";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnTharockTile.prototype = new FeatureObject();

WalkOnTharockTile.prototype.walkon = function(walker) {
  let msg = "";
  let map = this.getHomeMap();
  let statue = map.getTile(32,27).getTopFeature();
  if (statue) {
    let liche = localFactory.createTile("LicheNPC");
    map.deleteThing(statue);
    map.placeThing(32,27,liche);
    liche.onDeath = "tharock";
    msg = 'As you step further into the room, the statue suddenly begins to move! It no longer looks human, and a skeletal face gazes out from under the hood. "An intruder," it says. "I had thought there were none left who would be so bold. No matter- now you will die."';
    DUPlaySound("sfx_teleport");
    let fea = map.features.getAll();
    for (let i=0;i<fea.length;i++) {
      if (fea[i].getName() === "WalkOnTharock") {
        map.deleteThing(fea[i]);
      }
    }
  }
  DrawMainFrame("draw",map,PC.getx(),PC.gety());
  return {msg:msg};
}

function ToshinWalkOnTile() {
	this.name = "ToshinWalkOn";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
ToshinWalkOnTile.prototype = new FeatureObject();

ToshinWalkOnTile.prototype.walkon = function(walker) {
  if ((walker === PC) && (!DU.gameflags.getFlag("knows_arlan"))) {
    let themap = this.getHomeMap();
    let arlan = FindNPCByName("Arlan",themap);
    PC.forcedTalk = arlan;
  }
  return {msg:""}
}

function WorldsEndingWalkOnTile() {
	this.name = "WorldsEndingWalkOn";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WorldsEndingWalkOnTile.prototype = new FeatureObject();

WorldsEndingWalkOnTile.prototype.walkon = function(walker) {
  let mapref = walker.getHomeMap();
  CloseWEDoors(mapref);
  if ((this.getx() === 35) && (this.gety() === 34) && ((this.getHomeMap().getTile(35,34).getFeatureByName("WorldsEndingWalkOn").secondlastteleport === "39,56") && (this.getHomeMap().getTile(35,34).getFeatureByName("WorldsEndingWalkOn").lastteleport === "31,56"))) {
    // SE, SW, N
    mapref.moveThing(43,34,walker);        
  } else if ((this.getx() === 31) && (this.gety() === 56) && ((this.getHomeMap().getTile(35,34).getFeatureByName("WorldsEndingWalkOn").lastteleport === "39,34") && (this.getHomeMap().getTile(35,34).getFeatureByName("WorldsEndingWalkOn").secondlastteleport === "35,34"))) { 
    // NE, N, SW
    mapref.moveThing(43,56,walker);        
  } else {
    if (typeof this.destx === "number") { 
      mapref.moveThing(this.destx,this.desty,walker);
    } else {
      mapref.moveThing(this.destx[Dice.roll("1d3-1")],this.desty,walker);
    }
  }
  
  // set last traveled to check patterns
  let trackteleports = this.getHomeMap().getTile(35,34).getFeatureByName("WorldsEndingWalkOn");
  trackteleports.secondlastteleport = trackteleports.lastteleport;
  trackteleports.lastteleport = this.getx() + "," + this.gety();
  if (walker === PC) { DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety()); }

  return {msg:""};
}

function WalkOnChangeExitTile() {
  this.name = "WalkOnChangeExit";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.setxto = 0;
	this.setyto = 0;
}
WalkOnChangeExitTile.prototype = new FeatureObject();

WalkOnChangeExitTile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let themap=walker.getHomeMap();
    themap.setExitToX(this.setxto);
    themap.setExitToY(this.setyto);
  }
  return {msg:""};
}

function WalkOnCairns1Tile() {
  this.name = "WalkOnCairns1";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnCairns1Tile.prototype = new FeatureObject();

WalkOnCairns1Tile.prototype.walkon = function(walker) {
  let themap = this.getHomeMap();
  if (!themap.skeletons1) {
    themap.skeletons1 = 1;
    // awaken the skeletons in the SE chamber to attack
    // then create 2nd walkon to make bodies in NE chamber to rise as specters
    let skel1 = themap.getTile(34,38).getTopFeature();
    let skel2 = themap.getTile(30,32).getTopFeature();
    let skel3 = themap.getTile(36,29).getTopFeature();
    themap.deleteThing(skel1);
    themap.deleteThing(skel2);
    themap.deleteThing(skel3);
    skelmob1 = localFactory.createTile("SkeletonNPC");
    skelmob2 = localFactory.createTile("SkeletonNPC");
    skelmob3 = localFactory.createTile("SkeletonNPC");
    themap.placeThing(34,38,skelmob1);
    themap.placeThing(30,32,skelmob2);
    themap.placeThing(36,29,skelmob3);

    return {msg:"The skeletons entombed here suddenly rise at your approach!"};
  }
  return {msg:""};
}

function WalkOnCairns2Tile() {
  this.name = "WalkOnCairns2";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnCairns2Tile.prototype = new FeatureObject();

WalkOnCairns2Tile.prototype.walkon = function(walker) {
  let themap = this.getHomeMap();
  if (!themap.skeletons2) {
    themap.skeletons2 = 1;
    spec1 = localFactory.createTile("SpecterNPC");
    spec2 = localFactory.createTile("SpecterNPC");
    spec3 = localFactory.createTile("SpecterNPC");
    themap.placeThing(48,12,spec1);
    themap.placeThing(44,21,spec2);
    themap.placeThing(52,17,spec3);

    return {msg:"Restless spirits seem to sense your approach!"};
  }
  return {msg:""};
}

function WalkOnHC1Tile() {
  this.name = "WalkOnHC1";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.destmap = "hotelcalifornia";
}
WalkOnHC1Tile.prototype = new FeatureObject();

WalkOnHC1Tile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  let newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let retval = {overridedraw: 1};
  DU.gameflags.setFlag("started_pheran",1);
  if (this.say) {
    retval.msg = this.say;
  }
  return retval;
}

function WalkOnHC2Tile() {
  this.name = "WalkOnHC2";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.destmap = "hotelcalifornia3";
}
WalkOnHC2Tile.prototype = new FeatureObject();

WalkOnHC2Tile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  let newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let retval = {overridedraw: 1};
  if (this.say) {
    retval.msg = this.say;
  }
  DU.gameflags.setFlag("started_pheran",1);
  return retval;
}

function WalkOnHC2ClockTile() {
  this.name = "WalkOnHC2Clock";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnHC2ClockTile.prototype = new FeatureObject();

WalkOnHC2ClockTile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  for (let i=0;i<this.place.length;i++) {
    let clock = localFactory.createTile("GrandfatherClock");
    themap.placeThing(this.place[i].x,this.place[i].y,clock);
//    DrawMainFrame("one", PC.getHomeMap(), place[i].x, place[i].y);
  }
  return {msg:""};
}

function WalkOnHC3TreeTile() {
  this.name = "WalkOnHC3Tree";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnHC3TreeTile.prototype = new FeatureObject();

WalkOnHC3TreeTile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  for (let i=0;i<this.place.length;i++) {
    let clock = localFactory.createTile("DeadTree");
    themap.placeThing(this.place[i].x,this.place[i].y,clock);
//    DrawMainFrame("one", PC.getHomeMap(), place[i].x, place[i].y);
  }
  return {msg:""};
}

function WalkOnHC5Tile() {
  this.name = "WalkOnHC5";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.destmap = "hotelcalifornia6";
  this.destx = 10;
  this.desty = 12;
}
WalkOnHC5Tile.prototype = new FeatureObject();

WalkOnHC5Tile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  let newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);

  let door = themap.getTile(10,3).getTopFeature();
  if (door.open) { door.use(walker,1); }
  door = themap.getTile(10,6).getTopFeature();
  if (door.open) { door.use(walker,1); }
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let retval = {overridedraw: 1};
  if (this.say) {
    retval.msg = this.say;
  }
  return retval;
}

function WalkOnHC6Tile() {
  this.name = "WalkOnHC6";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.destmap = "hotelcalifornia5";
  this.destx = 10;
  this.desty = 5;
}
WalkOnHC6Tile.prototype = new FeatureObject();

WalkOnHC6Tile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  let newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let door = themap.getTile(10,14).getTopFeature();
  if (door.open) { door.use(walker,1); }
  door = themap.getTile(10,6).getTopFeature();
  if (door.open) { door.use(walker,11); }
  let retval = {overridedraw: 1};
  if (this.say) {
    retval.msg = this.say;
  }
  return retval;
}

function WalkOnHC7Tile() {
  this.name = "WalkOnHC7";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.destmap = "hotelcalifornia8";
  this.destx = 7;
  this.desty = 16;
  this.say = "The inn fades from view and is gone.";
}
WalkOnHC7Tile.prototype = new FeatureObject();

WalkOnHC7Tile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  let newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let retval = {overridedraw: 1};
  if (this.say) {
    retval.msg = this.say;
  }
  return retval;
}

function WalkOnNoGalaxyTile() {
	this.name = "WalkOnNoGalaxy";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnNoGalaxyTile.prototype = new FeatureObject();

WalkOnNoGalaxyTile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let mymap = walker.getHomeMap();
    mymap.setBackground("");
  
    let normalsong = mymap.getMusic();
    if (DU.gameflags.getFlag("music") && nowplaying.name && (nowplaying.name !== normalsong)) {
      DUPlayMusic(normalsong, {fade:1});
    }
    DrawMainFrame("draw",mymap,walker.getx(),walker.gety());
  }
  return {msg:""};
}

function WalkOnGalaxy1Tile() {
	this.name = "WalkOnGalaxy1";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnGalaxy1Tile.prototype = new FeatureObject();

WalkOnGalaxy1Tile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let mymap = walker.getHomeMap();
    mymap.setBackground("ether.gif");
    mymap.setOpacity(.2);
  
     let song = "Sirius";
     if (DU.gameflags.getFlag("music") && nowplaying.name && (nowplaying.name !== song)) {
      DUPlayMusic(song, {fade:1});
    }
    DrawMainFrame("draw",mymap,walker.getx(),walker.gety());
  }
  return {msg:""};
}

function WalkOnGalaxy2Tile() {
	this.name = "WalkOnGalaxy2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnGalaxy2Tile.prototype = new FeatureObject();

WalkOnGalaxy2Tile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let mymap = walker.getHomeMap();
    mymap.setBackground("ether.gif");
    mymap.setOpacity(.5);
  
    let song = "Sirius";
    if (DU.gameflags.getFlag("music") && nowplaying.name && (nowplaying.name !== song)) {
     DUPlayMusic(song, {fade:1});
    }
    DrawMainFrame("draw",mymap,walker.getx(),walker.gety());
  }
  return {msg:""};
}

function WalkOnGalaxy3Tile() {
	this.name = "WalkOnGalaxy3";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnGalaxy3Tile.prototype = new FeatureObject();

WalkOnGalaxy3Tile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let mymap = walker.getHomeMap();
    mymap.setBackground("ether.gif");
    mymap.setOpacity(.8);
  
    let song = "Sirius";
    if (DU.gameflags.getFlag("music") && nowplaying.name && (nowplaying.name !== song)) {
      DUPlayMusic(song, {fade:1});
    }
    DrawMainFrame("draw",mymap,walker.getx(),walker.gety());
  }
  return {msg:""};
}

function WardukeWalkOnTile() {
	this.name = "WardukeWalkOn";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WardukeWalkOnTile.prototype = new FeatureObject();

WardukeWalkOnTile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let themap = this.getHomeMap();
    let warduke = FindNPCByName("Warduke", themap);
    PC.forcedTalk(warduke);
    let field = themap.getTile(30,6).getTopFeature();
    themap.deleteThing(field);
    field = themap.getTile(31,6).getTopFeature();
    themap.deleteThing(field);
    field = themap.getTile(31,7).getTopFeature();
    themap.deleteThing(field);
    field = themap.getTile(31,8).getTopFeature();
    themap.deleteThing(field);
    field = themap.getTile(30,8).getTopFeature();
    themap.deleteThing(field);
    field = themap.getTile(30,7).getTopFeature();  // walkon tile
    themap.deleteThing(field);
  }
  return {msg:""};
}

function WalkOnCOA2Tile() {
	this.name = "WalkOnCOA2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnCOA2Tile.prototype = new FeatureObject();

WalkOnCOA2Tile.prototype.walkon = function(walker) {
  if (walker !== PC) { return {msg:""}; }
  if (!DU.gameflags.getFlag("act2")) { return {msg:""}; }
  if (DU.gameflags.getFlag("guard_thief_talk")) { return {msg:""}; }

  let comap = this.getHomeMap();
  let npcs = comap.npcs.getAll();
  let closest;
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName() === "TownGuardNPC") {
      if (!closest) { closest = npcs[i]; }
      else {
        let closestdist = GetDistance(PC.getx(),PC.gety(),closest.getx(),closest.gety());
        let dist = GetDistance(PC.getx(),PC.gety(),npcs[i].getx(),npcs[i].gety());
        if (dist < closestdist) { closest = npcs[i]; }
      }
    }
  }
  return {msg:""};
}

function WalkOnShadowTile() {
	this.name = "WalkOnShadow";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnShadowTile.prototype = new FeatureObject();

WalkOnShadowTile.prototype.walkon = function(walker) {
  let themap = walker.getHomeMap();

  let shadow = localFactory.createTile("ShadowNPC");
  themap.placeThing(6,8,shadow);
  shadow = localFactory.createTile("ShadowNPC");
  themap.placeThing(12,8,shadow);
  shadow = localFactory.createTile("ShadowNPC");
  themap.placeThing(6,12,shadow);
  shadow = localFactory.createTile("ShadowNPC");
  themap.placeThing(12,12,shadow);

  return {msg: "<span class='daemontext'>Did you ever wonder where shadows go to hide? It is here, little one. In the absence of light, how can you tell... if you are surrounded by shadows?</span>"};
}

function WalkOnPaladinInitTile() {
	this.name = "WalkOnPaladinInit";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnPaladinInitTile.prototype = new FeatureObject();

WalkOnPaladinInitTile.prototype.walkon = function(walker) {
  if (walker === PC){ 
    this.getHomeMap().deleteThing(this);
    let retval = { msg: 'Isaac smiles as you enter the room. "Please, come sit beside me, and then we will begin."' };
    return retval;
  }
  return {msg:""};
}

function WalkOnPaladinInit2Tile() {
	this.name = "WalkOnPaladinInit2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnPaladinInit2Tile.prototype = new FeatureObject();

WalkOnPaladinInit2Tile.prototype.walkon = function(walker) {
  if (walker === PC) {
    gamestate.setMode("anykey");
    targetCursor.command = "PaladinInit";
    targetCursor.step = 1;
    let retval = {};
    retval.override = 4;
    retval.msg = 'Isaac nods at you as you sit. He looks across to the other table, and says in a resonant voice, "We have gathered here today to welcome into the Order our newest companion."';
    maintext.setInputLine("&gt; [MORE]"); 

    let x = this.getx()+2;
    if (x === 60) { x = 56; }
    let otherwalkon;
    let swain = this.getHomeMap();
    let pile = swain.getTile(x,this.gety()).features.getAll();
    for (let i=0;i<pile.length;i++) {
      if (pile[i].getName() === this.getName()) { otherwalkon = pile[i]; }
    }
    swain.deleteThing(otherwalkon);
    swain.deleteThing(this);

    return retval;
  }

  return {msg:""};
}

function SpinnerTile() {
  this.name = "Spinner";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
SpinnerTile.prototype = new FeatureObject();

SpinnerTile.prototype.walkon = function(walker) {
  let diso = localFactory.createTile("Disoriented");
  walker.addSpellEffect(diso);
  return {msg:""};
}

SpinnerTile.prototype.walkoff = function(walker) {
  let diso = walker.getSpellEffectsByName("Disoriented");
  diso.endEffect();
  return {msg:""};
}

function WalkOnMessageTile() {
	this.name = "WalkOnMessage";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
  this.invisible = 1;
  this.message = "";
}
WalkOnMessageTile.prototype = new FeatureObject();

WalkOnMessageTile.prototype.walkon = function(walker) {
  let response = {msg:""};
  if ((walker === PC) && (this.message) && (PC.getLight() >= 1)) {
    response.msg = this.message;
  } else if ((walker === PC) && (this.message)) {
    response.msg = "There is writing on the walls here, but your light is too dim to read it.";
  }
  return response;
}

function WalkOnRotateTile() {
	this.name = "WalkOnRotate";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnRotateTile.prototype = new FeatureObject();

WalkOnRotateTile.prototype.walkon = function(walker) {
  if (walker !== PC) { return {msg:""}; }

  let turns = Dice.roll("1d3");
  DebugWrite("gameobj", "PC stepped on central spinner: rotating " + turns + "x90 degrees.<br />");

  let currmap = this.getHomeMap();
  let mapidx = 0;
  if (currmap.getName() === "mtdrash7a") { mapidx = 1; }
  if (currmap.getName() === "mtdrash7b") { mapidx = 2; }
  if (currmap.getName() === "mtdrash7c") { mapidx = 3; }
  mapidx += turns;
  mapidx = mapidx % 4;
  let destmap = "mtdrash7";
  if (mapidx === 1) { destmap = "mtdrash7a"; }
  if (mapidx === 2) { destmap = "mtdrash7b"; }
  if (mapidx === 3) { destmap = "mtdrash7c"; }
  DebugWrite("gameobj", "Moving from " + currmap.getName() + " to " + destmap + ".<br />");
  destmap = maps.getMap(destmap);
  let dest = { destx: PC.getx(), desty: PC.gety() };
  for (let i=1;i<=turns;i++) {
    dest = Get90DegCoords(13,13,dest.destx,dest.desty);
  }
  MoveBetweenMaps(PC,currmap,destmap,dest.destx,dest.desty);

  let feas = currmap.features.getAll();
  for (let i=0;i<feas.length;i++) {
    dest = { destx: feas[i].getx(), desty: feas[i].gety() }
    for (let j=1;j<=turns;j++) {
      dest = Get90DegCoords(13,13,dest.destx,dest.desty);
    }
    MoveBetweenMaps(feas[i],currmap,destmap,dest.destx,dest.desty);
  }

  feas = currmap.npcs.getAll();
  for (let i=0;i<feas.length;i++) {
    dest = { destx: feas[i].getx(), desty: feas[i].gety() }
    for (let j=1;j<=turns;j++) {
      dest = Get90DegCoords(13,13,dest.destx,dest.desty);
    }
    MoveBetweenMaps(feas[i],currmap,destmap,dest.destx,dest.desty);
  }
  DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
  return {overridedraw: 1,msg:"A rumbling sound fills the dungeon. At the edge of awareness something shifts and rearranges..."};
}

function WalkOnWindTile() {
	this.name = "WalkOnWind";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWindTile.prototype = new FeatureObject();

WalkOnWindTile.prototype.walkon = function(walker) {
  let response = {msg:""};
  if (walker === PC) {
    let torch = walker.getSpellEffectsByName("TorchLight");
    if (torch) {
      torch.endEffect();
    }
    response.msg = "A strange wind blows!";
  }
  return response;
}

function WalkOnDarknessTile() {
	this.name = "WalkOnDarkness";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnDarknessTile.prototype = new FeatureObject();

WalkOnDarknessTile.prototype.walkon = function(walker) {
  let response = {msg:""};
  if (walker === PC) {
    let torch = walker.getSpellEffectsByName("TorchLight");
    if (torch) {
      torch.endEffect();
    }
    let light = walker.getSpellEffectsByName("Light");
    if (light) {
      light.endEffect();
    }
    response.msg = "You are smothered in darkness!";
  }
  return response;
}

function WalkOnAbyssTile() {
  this.name = "WalkOnAbyss";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss1";
	this.destx = 10;
	this.desty = 10;
	this.say = '';
}
WalkOnAbyssTile.prototype = new FeatureObject();

WalkOnAbyssTile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  let newmap;
  if ((this.destmap === "abyss_castle_1") || (this.destmap === "abyss_final")) {
    newmap = maps.addMap(this.destmap);
  } else {
    newmap = maps.getMap(this.destmap);
  }
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let retval = {overridedraw: 1,msg:""};
  if (this.say) {
    retval.msg = this.say;
  }
  return retval;
}

function WalkOnAbyss0Tile() {
  this.name = "WalkOnAbyss0";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss1";
	this.destx = 0;
	this.desty = 0;
	this.say = 'A voice speaks, from empty air: "As you learn, and feel, and gain experience, you fill your landscape with knowledge."';
}
WalkOnAbyss0Tile.prototype = new WalkOnAbyssTile();

function WalkOnAbyss1Tile() {
  this.name = "WalkOnAbyss1";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss2";
	this.destx = 0;
	this.desty = 0;
}
WalkOnAbyss1Tile.prototype = new WalkOnAbyssTile();

function WalkOnAbyss2Tile() {
  this.name = "WalkOnAbyss2";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss3";
	this.destx = 0;
	this.desty = 0;
  this.say = 'Voice: "To attain the higher initiation, you must first master yourself."';
}
WalkOnAbyss2Tile.prototype = new WalkOnAbyssTile();

function WalkOnAbyss3Tile() {
  this.name = "WalkOnAbyss3";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss4";
	this.destx = 0;
	this.desty = 0;
}
WalkOnAbyss3Tile.prototype = new WalkOnAbyssTile();

function WalkOnAbyss4Tile() {
  this.name = "WalkOnAbyss4";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss5";
	this.destx = 0;
	this.desty = 0;
	this.say = 'Voice: "Through this portal you shall be challenged. Prove your mastery of the self and you shall be counted as one of the great."';
}
WalkOnAbyss4Tile.prototype = new WalkOnAbyssTile();

function WalkOnAbyss5Tile() {
  this.name = "WalkOnAbyss5";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss_final";
	this.destx = 9;
	this.desty = 68;
	this.say = '';
}
WalkOnAbyss5Tile.prototype = new WalkOnAbyssTile();

function WalkOnAbyssCastleTile() {
  this.name = "WalkOnAbyssCastle";
	this.graphic = "walkon2.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.say = '';
}
WalkOnAbyssCastleTile.prototype = new FeatureObject();

WalkOnAbyssCastleTile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  if (walker.lastteleportx) {
    if (GetDistance(walker.lastteleportx,walker.lasteleporty,this.getx(),this.gety()) <= 1) {
      walker.lastteleportx = this.getx();
      walker.lastteleporty = this.gety();
      return {msg:""};
    }
  }
  let dest;
  while (!dest || (dest === themap.getName())) {
    dest = "abyss_castle_" + Dice.roll("1d8");
  }
  let newmap = maps.getMap(dest);
  MoveBetweenMaps(walker,themap,newmap,this.getx(),this.gety());
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let retval = {overridedraw: 1,msg:""};
  return retval;
}

function WalkOnAbyssCastleSayTile() {
  this.name = "WalkOnAbyssCastleSay";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.say = '';
}
WalkOnAbyssCastleSayTile.prototype = new FeatureObject();

WalkOnAbyssCastleSayTile.prototype.walkon = function(walker) {
  if (this.qnum === walker.lastq) { return {msg:""}; }
  walker.lastq = this.qnum;
  return {msg: this.say};
}

function WalkOnAbyssCastleSay1Tile() {
  this.name = "WalkOnAbyssCastleSay1";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.qnum = 1;
	this.say = 'Voice: "Before you lies a path, and you will choose your direction as you know your answers. You are here, because you seek greater power, but why? Travel west if you desire to increase your personal power. Travel east if the power is a means to accomplish an end."';
}
WalkOnAbyssCastleSay1Tile.prototype = new WalkOnAbyssCastleSayTile();

function WalkOnAbyssCastleSay2Tile() {
  this.name = "WalkOnAbyssCastleSay2";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.qnum = 2;
	this.say = 'Voice: "While walking the woods, you stumble upon a glade, wherein you see a foe about to lay a mortal wound upon a friend. Without thought, your power rises. If your first thought would be to strike at the enemy, walk north. If your first thought would be to create a shield to protect your friend, walk south."';
}
WalkOnAbyssCastleSay2Tile.prototype = new WalkOnAbyssCastleSayTile();

function WalkOnAbyssCastleSay3Tile() {
  this.name = "WalkOnAbyssCastleSay3";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.qnum = 3;
	this.say = 'Voice: "Your quest nears its end, but to secure victory now would require you to sacrifice your life. If you would willingly do so to ensure victory, walk east. If you would pull back and hope to find another solution, walk west."';
}
WalkOnAbyssCastleSay3Tile.prototype = new WalkOnAbyssCastleSayTile();

function WalkOnAbyssCastleSay4Tile() {
  this.name = "WalkOnAbyssCastleSay4";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.qnum = 4;
	this.say = 'Voice: "Power undreamed of is within your reach. Go north if you seek it to have power over others. Go south if you seek it that others have no dominion over you."';
}
WalkOnAbyssCastleSay4Tile.prototype = new WalkOnAbyssCastleSayTile();

function WalkOnAbyssCastleSayOnceTile() {
  this.name = "WalkOnAbyssCastleSayOnce";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.say = '';
}
WalkOnAbyssCastleSayOnceTile.prototype = new FeatureObject();

WalkOnAbyssCastleSayOnceTile.prototype.walkon = function(walker) {
  if (DU.gameflags.getFlag(this.getName())) { return {msg:""}; }
  DU.gameflags.setFlag(this.getName(), 1);
  return {msg: this.say};
}

function WalkOnAbyssCastleSay5Tile() {
  this.name = "WalkOnAbyssCastleSay5";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.qnum = 5;
	this.say = 'A new voice speaks without sound. "You have arrived in the Fortress of the Mind."';
}
WalkOnAbyssCastleSay5Tile.prototype = new WalkOnAbyssCastleSayOnceTile();

function WalkOnAbyssCastleSay6Tile() {
  this.name = "WalkOnAbyssCastleSay6";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.qnum = 6;
	this.say = 'Voice: "Here, you will be asked questions. Fear not- you are not here to be judged. There is no objective right or wrong answer. We do not seek to learn if you are good or evil. these things matter not."';
}
WalkOnAbyssCastleSay6Tile.prototype = new WalkOnAbyssCastleSayOnceTile();

function WalkOnAbyssCastleSay7Tile() {
  this.name = "WalkOnAbyssCastleSay7";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.qnum = 7;
	this.say = 'Voice: "I know the answers in your heart. I know the truth of your soul. What we are here to judge is simply: Do you?"';
}
WalkOnAbyssCastleSay7Tile.prototype = new WalkOnAbyssCastleSayOnceTile();

function WalkOnAbyssCastleSay8Tile() {
  this.name = "WalkOnAbyssCastleSay8";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.qnum = 8;
	this.say = 'Voice: "If you can know yourself, and can answer these questions in truth and in fact... then you will be found worthy."';
}
WalkOnAbyssCastleSay8Tile.prototype = new WalkOnAbyssCastleSayOnceTile();

function WalkOnAbyssGauntletTile() {
  this.name = "WalkOnAbyssGauntlet";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.say = '';
  this.effect = '';
}
WalkOnAbyssGauntletTile.prototype = new FeatureObject();

WalkOnAbyssGauntletTile.prototype.walkon = function(walker) {
  let retval = {msg:""};
  if (DU.gameflags.getFlag(this.getName())) { return retval; }
  DU.gameflags.setFlag(this.getName(), 1); // prevents the same gauntlet tile from triggering twice
  let desc = walker.getDesc();

  if (this.effect === "earthquake") {
    Earthquake();
    DUPlaySound("sfx_earthquake");
  } else if (this.effect) {
    retval.override = 3;  // I think this propagates through and tells main to not end turn
    let dmg = walker.getMaxHP()/12;
    let thismap = this.getHomeMap();
    let caster = thismap.getTile(9,4).getTopNPC();
    thismap.moveThing(walker.getx(),walker.gety()-7,caster);
    let boltgraphic = {};
    boltgraphic.graphic = "fireicelightning.gif";
    boltgraphic.yoffset = 0;
    boltgraphic.xoffset = 0;
    boltgraphic.directionalammo = 1;
    boltgraphic = GetEffectGraphic(caster,walker,boltgraphic);
    let descval = {txt: desc};
    let sndsfx;
    let dmgtype;
    if (this.effect === "fireball") {
      sndsfx = "sfx_fireball";
      dmgtype = "fire";
    } else if (this.effect === "lightning") {
      sndsfx = "sfx_small_zap";
      boltgraphic.yoffset = -64;
      dmgtype = "lightning";
    } else if (this.effect === "bolt") {
      boltgraphic.graphic = "magic-bolt.gif";
      sndsfx = "sfx_magic_bolt";
      dmgtype = "force";
    }

    let sounds = {};
    let fromcoords = getCoords(caster.getHomeMap(),caster.getx(), caster.gety());
    let tocoords = getCoords(walker.getHomeMap(),walker.getx(), walker.gety());
    let duration = (Math.pow( Math.pow(walker.getx() - caster.getx(), 2) + Math.pow (walker.gety() - caster.gety(), 2)  , .5)) * 100;
    let destgraphic = {graphic:"static.png", xoffset:-3*32, yoffset:-96*32, overlay:"spacer.gif"};
    DUPlaySound(sndsfx);
    let weapon = localFactory.createTile("SpellWeapon");
    weapon.dmgtype = "fire";
    AnimateEffect(caster, walker, fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:0, retval:descval, dmgtype:dmgtype, weapon:weapon});
    thismap.moveThing(9,4,caster);
    setTimeout(function() { PC.endTurn(); }, duration);
  }

  if (this.say) {
    retval.msg = this.say;
  }
  return retval;
}

function WalkOnAbyssGauntlet1Tile() {
  this.name = "WalkOnAbyssGauntlet1";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.say = 'You wish to have power. You will be subject to power.';
  this.effect = 'lightning';
}
WalkOnAbyssGauntlet1Tile.prototype = new WalkOnAbyssGauntletTile();

function WalkOnAbyssGauntlet2Tile() {
  this.name = "WalkOnAbyssGauntlet2";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.say = 'You desire to wield might. You will taste the flames.';
  this.effect = 'fireball';
}
WalkOnAbyssGauntlet2Tile.prototype = new WalkOnAbyssGauntletTile();

function WalkOnAbyssGauntlet3Tile() {
  this.name = "WalkOnAbyssGauntlet3";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.say = 'You yearn to learn the higher mysteries. The firm certainty upon which you stand will tremble beneath you.';
  this.effect = 'earthquake';
}
WalkOnAbyssGauntlet3Tile.prototype = new WalkOnAbyssGauntletTile();

function WalkOnAbyssGauntlet4Tile() {
  this.name = "WalkOnAbyssGauntlet4";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.say = 'You need to stand at the precipice, and look upwards to the stars. What will your soul do, when they look back?';
  this.effect = 'bolt';
}
WalkOnAbyssGauntlet4Tile.prototype = new WalkOnAbyssGauntletTile();

function WalkOnAbyssGauntlet5Tile() {
  this.name = "WalkOnAbyssGauntlet5";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.say = 'You strain to hear the voice of magic itself. You will know true loneliness.';
  this.effect = '';
}
WalkOnAbyssGauntlet5Tile.prototype = new WalkOnAbyssGauntletTile();

function WalkOnAbyssGauntlet6Tile() {
  this.name = "WalkOnAbyssGauntlet6";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.say = 'Can you endure the pain required to hold on to the ether?';
  this.effect = '';
}
WalkOnAbyssGauntlet6Tile.prototype = new WalkOnAbyssGauntletTile();

function NightshadeSpawnerTile() {
  this.name = "NightshadeSpawner";
  this.graphic = "target-cursor.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
  this.blockslos = 0;
  this.prefix = "an";
  this.desc = "invisible spawner";
  this.invisible = 1;
  
  this.stocked = 1;
}
NightshadeSpawnerTile.prototype = new FeatureObject();

NightshadeSpawnerTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    DebugWrite("gameobj", "Activating Nightshade spawner.");

    this.addToSearchYield("Nightshade");
    let nexttick = GetGameClockByClockTime("0:00");

    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,nexttick);
  }
}

NightshadeSpawnerTile.prototype.myTurn = function() {
  if (!this.searchYield.length) {
    DebugWrite("gameobj", "Nightshade spawner regrowing Nightshade.");
    this.addToSearchYield("Nightshade");
    let nexttick = GetGameClockByClockTime("0:00");
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,nexttick);
  }

  return 1;
}

function SpawnerTile() {
  this.name = "Spawner";
  this.graphic = "target-cursor.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
  this.blockslos = 0;
  this.prefix = "an";
  this.desc = "invisible spawner";
  this.invisible = 1;
  
  this.spawngroup = [];
  this.maxSpawns = 5; 
  this.spawnRadius = 0; // distance from spawner entity can appear
  this.spawnLeash = 20;
  this.spawnSoftLeash = 15;
  this.spawnFreq = 100;
  this.lastSpawned = 0;
  
  this.level = 1;
  this.evolve = [];  
  // if evolve [#] exists, the first time the player is that level and the spawner isn't
  // yet, go through the pairs of keyword/value and set then to the spawner
  
  this.altPoI = "";  // for creatures in "mordor" so they don't try to follow paths outside
  
  this.spawned = new Collection();
}
SpawnerTile.prototype = new FeatureObject();

SpawnerTile.prototype.getSpawngroup = function() {
  return this.spawngroup;
}

SpawnerTile.prototype.setSpawngroup = function(newgroup) {
  this.spawngroup = newgroup;
  return this.spawngroup;
}

SpawnerTile.prototype.pickSpawn = function() {
  let spindex = Math.floor(Math.random() * this.getSpawngroup().length);
  let spawns= this.getSpawngroup();
  return spawns[spindex];
}

SpawnerTile.prototype.getMaxSpawns = function() {
  return this.maxSpawns;
}

SpawnerTile.prototype.setMaxSpawns = function(spawnnum) {
  spawnnum = parseInt(spawnnum);
  if (!isNaN(spawnnum)) {
    this.maxSpawns = spawnnum;
  }
  return this.maxSpawns;
}

SpawnerTile.prototype.getSpawnRadius = function() {
  return this.spawnRadius;
}

SpawnerTile.prototype.setSpawnRadius = function(spawnnum) {
  spawnnum = parseInt(spawnnum);
  if (!isNaN(spawnnum)) {
    this.spawnRadius = spawnnum;
  }
  return this.spawnRadius;
}

SpawnerTile.prototype.getSpawnLeash = function() {
  return this.spawnLeash;
}

SpawnerTile.prototype.setSpawnLeash = function(spawnnum) {
  spawnnum = parseInt(spawnnum);
  if (!isNaN(spawnnum)) {
    this.spawnLeash = spawnnum;
  }
  return this.spawnLeash;
}

SpawnerTile.prototype.getSpawnSoftLeash = function() {
  return this.spawnSoftLeash;
}

SpawnerTile.prototype.setSpawnSoftLeash = function(spawnnum) {
  spawnnum = parseInt(spawnnum);
  if (!isNaN(spawnnum)) {
    this.spawnSoftLeash = spawnnum;
  }
  return this.spawnSoftLeash;
}

SpawnerTile.prototype.getSpawnFreq = function() {
  return this.spawnFreq;
}

SpawnerTile.prototype.setSpawnFreq = function(spawnnum) {
  spawnnum = parseInt(spawnnum);
  if (!isNaN(spawnnum)) {
    this.spawnFreq = spawnnum;
  }
  return this.spawnFreq;
}

SpawnerTile.prototype.addSpawned = function(spawned) {
  this.spawned.addTop(spawned);
}

SpawnerTile.prototype.deleteSpawned = function(spawned) {
  this.spawned.deleteFrom(spawned);
}

SpawnerTile.prototype.getSpawned = function() {
  return this.spawned;
}

SpawnerTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    DebugWrite("gameobj", "<span style='font-weight:bold'>Spawner " + this.getName() + " activating at " + DUTime.getGameClock().toFixed(5) + ".</span><br />");

    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,1);
  }
}

SpawnerTile.prototype.myTurn = function() {
  if (!maps.getMap(this.getHomeMap().getName())) {
    // removing from timeline, its map is gone
    DebugWrite("gameobj", "<span style='font-weight:bold'>Spawner " + this.getSerial() + " removed from game- map gone.</span><br />");
  
    return 1;
  }
  if (PC.getLevel() > this.level) {  
    for (let i=this.level+1; i<=PC.getLevel(); i++) {
      if (this.evolve[i]) {
        this.level = i;
        DebugWrite("gameobj", "Spawner at " + this.x + ", " + this.y + " has evolved.<br />");
        while (this.evolve[i][0]) {
          let idx = this.evolve[i].shift();
          let val = this.evolve[i].shift();
          this[idx] = val;
        }
      }
    }
  }
  if (this.sleepUntilPlayer) {
    let NPCevent = new GameEvent(this);
    if (this.getHomeMap() === PC.getHomeMap()) {
      delete this.sleepUntilPlayer;
      let timetonext = (this.getSpawnFreq() + (Math.random()*((this.getSpawnFreq()/2)+1)));
      DUTime.addAtTimeInterval(NPCevent,timetonext);
    } else {
      DUTime.addAtTimeInterval(NPCevent,1);
      return 1;
    }
  }
  
  let timetonext = (this.getSpawnFreq() + (Math.random()*((this.getSpawnFreq()/2)+1)));
  if ((this.spawned.getAll().length < this.getMaxSpawns()) && ((this.getHomeMap() != PC.getHomeMap()) || (GetDistance(PC.getx(), PC.gety(), this.getx(), this.gety()) > 10))) {
      // let's do some spawning
      let spawntype = this.pickSpawn();
      let newspawn = localFactory.createTile(spawntype);
      let diffx = Math.floor(Math.random() * this.getSpawnRadius() * 2) - this.getSpawnRadius();
      let diffy = Math.floor(Math.random() * this.getSpawnRadius() * 2) - this.getSpawnRadius();
      let mymap = this.getHomeMap();
      if (this.altPoI) {
        newspawn.altPoI = this.altPoI;
        DebugWrite("gameobj","About to spawn, adding an altPoI.<br />");
      }
      
      let tile = mymap.getTile(this.getx() + diffx, this.gety() + diffy);
      let resp = tile.canMoveHere(newspawn.getMovetype());
      if (resp["canmove"]) {
        mymap.placeThing(this.getx() + diffx, this.gety() + diffy, newspawn);
        this.addSpawned(newspawn);
        newspawn.setSpawnedBy(this);
        DebugWrite("gameobj", "Spawner #" + this.getSerial() + " at " + this.x + ", " + this.y + " has spawned a " + newspawn.getName() + " #" + newspawn.getSerial() + "<br />");
      } else {
        timetonext = 5;
      }      
  }
 
  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,timetonext);
  
  return 1;
}

function PentagramNWTile() {
  //Graphics Upgraded
  this.name = "PentagramNW";
  this.graphic = "pentagram.gif";
	this.spritexoffset = 0;
	this.spriteyoffset = 0;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramNWTile.prototype = new FeatureObject();

function PentagramNTile() {
  //Graphics Upgraded
  this.name = "PentagramN";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -32;
	this.spriteyoffset = 0;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramNTile.prototype = new FeatureObject();

function PentagramNETile() {
  //Graphics Upgraded
  this.name = "PentagramNE";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -64;
	this.spriteyoffset = 0;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramNETile.prototype = new FeatureObject();

function PentagramWTile() {
  //Graphics Upgraded
  this.name = "PentagramW";
  this.graphic = "pentagram.gif";
	this.spritexoffset = 0;
	this.spriteyoffset = -32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramWTile.prototype = new FeatureObject();

function PentagramCTile() {
  //Graphics Upgraded
  this.name = "PentagramC";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -32;
	this.spriteyoffset = -32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramCTile.prototype = new FeatureObject();

function PentagramETile() {
  //Graphics Upgraded
  this.name = "PentagramE";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -64;
	this.spriteyoffset = -32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramETile.prototype = new FeatureObject();

function PentagramSWTile() {
  //Graphics Upgraded
  this.name = "PentagramSW";
  this.graphic = "pentagram.gif";
	this.spritexoffset = 0;
	this.spriteyoffset = -64;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramSWTile.prototype = new FeatureObject();

function PentagramSTile() {
  //Graphics Upgraded
  this.name = "PentagramS";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -32;
	this.spriteyoffset = -64;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramSTile.prototype = new FeatureObject();

function PentagramSETile() {
  //Graphics Upgraded
  this.name = "PentagramSE";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -64;
	this.spriteyoffset = -64;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramSETile.prototype = new FeatureObject();

function CrenellationNWTile() {
  this.name = "CrenellationNW";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-192";
	this.spriteyoffset = "-1760";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "crenellation";
}
CrenellationNWTile.prototype = new FeatureObject();

function CrenellationNTile() {
  this.name = "CrenellationN";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-224";
	this.spriteyoffset = "-1760";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "crenellation";
}
CrenellationNTile.prototype = new FeatureObject();

function CrenellationNETile() {
  this.name = "CrenellationNE";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-256";
	this.spriteyoffset = "-1760";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "crenellation";
}
CrenellationNETile.prototype = new FeatureObject();

function CrenellationWTile() {
  this.name = "CrenellationW";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-192";
	this.spriteyoffset = "-1792";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "crenellation";
}
CrenellationWTile.prototype = new FeatureObject();

function CrenellationETile() {
  this.name = "CrenellationE";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-256";
	this.spriteyoffset = "-1792";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "crenellation";
}
CrenellationETile.prototype = new FeatureObject();

function CrenellationSWTile() {
  this.name = "CrenellationSW";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-192";
	this.spriteyoffset = "-1824";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "crenellation";
}
CrenellationSWTile.prototype = new FeatureObject();

function CrenellationSTile() {
  this.name = "CrenellationS";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-224";
	this.spriteyoffset = "-1824";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "crenellation";
}
CrenellationSTile.prototype = new FeatureObject();

function CrenellationSETile() {
  this.name = "CrenellationSE";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-256";
	this.spriteyoffset = "-1824";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "crenellation";
}
CrenellationSETile.prototype = new FeatureObject();

function WeaponCounterDaggerTile() {
  // Graphic made same as weapon
  this.name = "WeaponCounterDagger";
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -68*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display dagger";
  this.peerview = "black";
}
WeaponCounterDaggerTile.prototype = new FeatureObject();

function WeaponCounterMaceTile() {
  // Graphic made same as weapon
  this.name = "WeaponCounterMace";
  this.graphic = "static.png";
	this.spritexoffset = -2*32;
	this.spriteyoffset = -68*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display mace";
  this.peerview = "black";
}
WeaponCounterMaceTile.prototype = new FeatureObject();

function WeaponCounterSwordTile() {
  // Graphic made shortsword
  this.name = "WeaponCounterSword";
  this.graphic = "static.png";
	this.spritexoffset = -32;
	this.spriteyoffset = -68*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display sword";
  this.peerview = "black";
}
WeaponCounterSwordTile.prototype = new FeatureObject();

function ArmorCounterLeatherTile() {
  // Graphic made just same as armor
  this.name = "ArmorCounterLeather";
  this.graphic = "static.png";
	this.spritexoffset = -8*32;
	this.spriteyoffset = -70*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
ArmorCounterLeatherTile.prototype = new FeatureObject();

function ArmorCounterChainTile() {
  // Graphic made same as armor
  this.name = "ArmorCounterChain";
  this.graphic = "static.png";
	this.spritexoffset = -9*32;
	this.spriteyoffset = -70*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
ArmorCounterChainTile.prototype = new FeatureObject();

function ArmorCounterPlateTile() {
  // Graphic made same as armor
  this.name = "ArmorCounterPlate";
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
ArmorCounterPlateTile.prototype = new FeatureObject();

function DisplayCounterNTile() {
  //Graphics Upgraded
  this.name = "DisplayCounterN";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -93*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
DisplayCounterNTile.prototype = new FeatureObject();

function DisplayCounterSTile() {
  //Graphics Upgraded
  this.name = "DisplayCounterS";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -94*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
DisplayCounterSTile.prototype = new FeatureObject();

function DisplayCounterCTile() {
  //Graphics Upgraded
  this.name = "DisplayCounterC";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -93*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
DisplayCounterCTile.prototype = new FeatureObject();

function MerchantCounterClothTile() {
  //Graphics Upgraded
  this.name = "MerchantCounterCloth";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterClothTile.prototype = new FeatureObject();

function MerchantCounterScaleTile() {
  //Graphics Upgraded
  this.name = "MerchantCounterScale";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterScaleTile.prototype = new FeatureObject();

function MerchantCounterBillTile() {
  //Graphics Upgraded
  this.name = "MerchantCounterBill";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterBillTile.prototype = new FeatureObject();

function MerchantCounterBookTile() {
  //Graphics Upgraded
  this.name = "MerchantCounterBook";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterBookTile.prototype = new FeatureObject();

function MerchantCounterEdgeTile() {
  //Graphics Upgraded
  this.name = "MerchantCounterEdge";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -93*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterEdgeTile.prototype = new FeatureObject();

function MerchantCounterTile() {
  //Graphics Upgraded
  this.name = "MerchantCounter";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -93*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterTile.prototype = new FeatureObject();

function ArmorRackLeatherTile() {
  //Graphics Upgraded
  this.name = "ArmorRackLeather";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = 0;
  this.prefix = "a";
  this.desc = "display suit of leather armor";
  this.peerview = "black";
}
ArmorRackLeatherTile.prototype = new FeatureObject();

function ArmorRackChainTile() {
  //Graphics Upgraded
  this.name = "ArmorRackChain";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = 0;
  this.prefix = "a";
  this.desc = "display suit of chain mail";
  this.peerview = "black";
}
ArmorRackChainTile.prototype = new FeatureObject();

function ArmorRackPlateTile() {
  //Graphics Upgraded
  this.name = "ArmorRackPlate";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = 0;
  this.prefix = "a";
  this.desc = "display suit of plate armor";
  this.peerview = "black";
}
ArmorRackPlateTile.prototype = new FeatureObject();

function ShieldDisplayTile() {
  this.name = "ShieldDisplay";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -37*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = 0;
  this.prefix = "a";
  this.desc = "shield on a rack";
  this.peerview = "black";
}
ShieldDisplayTile.prototype = new FeatureObject();

function SkeletonDecorationTile() {
  //Graphic Upgraded
  this.name = "SkeletonDecoration";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "skeleton";
}
SkeletonDecorationTile.prototype = new FeatureObject();

function MoatLeverOffTile() {
  this.name = "MoatLeverOff";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -108*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
MoatLeverOffTile.prototype = new FeatureObject();

function LeverOffTile() {  // is this even used?
  //Graphic Upgraded
  this.name = "LeverOff";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -108*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
LeverOffTile.prototype = new FeatureObject();

function BDCLeverTile() {
  this.name = "BDCLever";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -108*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
BDCLeverTile.prototype = new FeatureObject();

BDCLeverTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "The lever refuses to budge.";
  return retval;
}

function GrottoLeverOffTile() {
  this.name = "GrottoLeverOff";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -109*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
GrottoLeverOffTile.prototype = new FeatureObject();

GrottoLeverOffTile.prototype.use = function(who) {
  let retval = {};
  retval["txt"] = "There is a deafening sound of rushing water! The water levels recede.";
  this.spritexoffset = -9*32;
  let frommap = this.getHomeMap();
  let tomap = maps.getMap("grotto2");
  DUPlaySound("sfx_large_lever");
  
  let feas = frommap.features.getAll();
  for (let i=0;i<feas.length;i++) {
    if (feas[i].getName() !== "EnergyField") {
      MoveBetweenMaps(feas[i],frommap,tomap,feas[i].getx(),feas[i].gety());
    }
  };
  let npcs = frommap.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    MoveBetweenMaps(npcs[i],frommap,tomap,npcs[i].getx(),npcs[i].gety());
  };
  MoveBetweenMaps(PC,frommap,tomap,PC.getx(),PC.gety());
  
  DrawMainFrame("draw", tomap, PC.getx(), PC.gety());
  return retval;
}

function GrottoBridgeLever1Tile() {
  //Graphic Upgraded
  this.name = "GrottoBridgeLever1";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -107*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "switch";

  this.setting = 0;
}
GrottoBridgeLever1Tile.prototype = new FeatureObject();

GrottoBridgeLever1Tile.prototype.use = function(who) {
  let mymap = this.getHomeMap();
  GrottoBridgePuzzle(mymap,102,31);
  GrottoBridgePuzzle(mymap,102,32);
  if (this.spritexoffset === -8*32) { this.spritexoffset = -9*32;}
  else { this.spritexoffset = -8*32;}
  DUPlaySound("sfx_small_lever");
  return { fin: 1, txt: "Lever thrown."};
}

function GrottoBridgeLever2Tile() {
  //Graphic Upgradedf
  this.name = "GrottoBridgeLever2";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -107*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "switch";

  this.setting = 0;
}
GrottoBridgeLever2Tile.prototype = new FeatureObject();

GrottoBridgeLever2Tile.prototype.use = function(who) {
  let mymap = this.getHomeMap();
  GrottoBridgePuzzle(mymap,102,33);
  GrottoBridgePuzzle(mymap,102,32);
  if (this.spritexoffset === -8*32) { this.spritexoffset = -9*32;}
  else { this.spritexoffset = -8*32;}
  DUPlaySound("sfx_small_lever");
  return { fin: 1, txt: "Lever thrown."};
}

function GrottoBridgeLever3Tile() {
  //Graphic Upgraded
  this.name = "GrottoBridgeLever3";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -107*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "switch";

  this.setting = 0;
}
GrottoBridgeLever3Tile.prototype = new FeatureObject();

GrottoBridgeLever3Tile.prototype.use = function(who) {
  let mymap = this.getHomeMap();
  GrottoBridgePuzzle(mymap,102,34);
  GrottoBridgePuzzle(mymap,102,32);
  if (this.spritexoffset === -8*32) { this.spritexoffset = -9*32;}
  else { this.spritexoffset = -8*32;}
  DUPlaySound("sfx_small_lever");
  return { fin: 1, txt: "Lever thrown."};
}

function GrottoBridgePuzzle(mymap,locx,locy) {
  let bridge;
  let fea = mymap.getTile(locx,locy).getFeatures();
  for (let i=0;i<fea.length;i++) {
    if (fea[i].getName() === "BridgeNS") { bridge = fea[i];}
  }
  if (bridge) {
    for (let i=0;i<fea.length;i++) {
      if (fea[i].getName() === "BridgeNS") { mymap.deleteThing(fea[i]);}
      else {
        // falls in!
        maintext.delayedAddText("The " + fea[i].getDesc() + " falls into the chasm!");
        mymap.deleteThing(fea[1]);
      }
    }
    if ((PC.getx() === locx) && (PC.gety() === locy)) {
      maintext.delayedAddText("The bridge disappears from beneath your feet! You fall.");
      let undermap = maps.getMap("undergrotto");
      MoveBetweenMaps(PC,mymap,undermap,25,7);
      DrawMainFrame("draw",undermap,PC.getx(),PC.gety());
    } else {
      DrawMainFrame("one",mymap,locx,locy);
    }
  } else {
    bridge = localFactory.createTile("BridgeNS");
    mymap.placeThing(locx,locy,bridge);
    DrawMainFrame("one",mymap,locx,locy);
  }
}

function MetalTwisterLeverTile() {
  //Graphic Upgraded
  this.name = "MetalTwisterLever";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -110*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
MetalTwisterLeverTile.prototype = new FeatureObject();
  
MetalTwisterLeverTile.prototype.use = function(user) {
  let level3 = maps.getMap("metaltwister3");
  let level2 = maps.getMap("metaltwister2");
  let retval = {};
  DUPlaySound("sfx_small_lever");
  if (!level2) {  // somehow level 2 is not in memory. Load it.
    let otherlevel = new GameMap();
    otherlevel = maps.addMap("metaltwister2");
    level2 = otherlevel;
  }
  if (this.spritexoffset === -8*32) {  // This switch hasn't been thrown
    this.spritexoffset = -9*32;
    retval["txt"] = "Click!";
    
    let checkboth = 1;
    let floor3features = level3.features.getAll();
    let ports = [];
    for (let i=0; i<floor3features.length; i++) {
      if (floor3features[i].getName() == "LeverOff") {
        if (floor3features[i].spritexoffset === -8*32) {
          checkboth = 0;
        }
      }
      if (floor3features[i].getName() == "StonePortcullis") {
        ports[ports.length] = floor3features[i];
      }
    }
    if (checkboth) {  // if both switches are thrown, open the dungeon's doors
      for (let i=0; i<ports.length; i++) {
        ports[i].unlockMe();
        ports[i].use(user);
      }
      let floor2features = level2.features.getAll();
      for (let i=0; i<floor2features.length; i++) {
        if (floor2features[i].getName() == "StonePortcullis") {
          floor2features[i].unlockMe();
          floor2features[i].use(user);
        }
      }
    }
  }
  else {  // for sanity's sake, you can't unthrow a switch
    retval["txt"] = "The switch is stuck."; 
  }
  return retval;  
}

function PitDespairLeverTile() {
  //Graphic Upgraded
  this.name = "PitDespairLever";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -109*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
PitDespairLeverTile.prototype = new FeatureObject();

PitDespairLeverTile.prototype.use = function(user) {
  let retval = {};
  if (this.attached) {
    if (PC.getHomeMap() === this.getHomeMap()) {
      DUPlaySound("sfx_small_lever");
    }
    let thismap = this.getHomeMap();
    let doortile = thismap.getTile(this.attached.x, this.attached.y);
    let ftrs = doortile.getFeatures();
    let door;
    for (let i=0;i<ftrs.length;i++) {
      if (ftrs[i].getName() === "WallPortcullis") { door = ftrs[i]; }
    };
    if (this.spritexoffset === -8*32) {
      door.locked = 0;
      door.setGraphicArray(["static.png", "", 0, -17*32]);
			
			door.closedLOS = door.getBlocksLOSArray();
			let seethru = [];
			seethru[0] = 0;
			door.setBlocksLOSArray(seethru);
			
			door.addPassable(MOVE_WALK);
			door.open = 1;
			
			this.spritexoffset = -9*32;
    } else {
      let mobs = doortile.getNPCs();
      let diffx = 0;
      let diffy = 0;
      if (this.gety() === 36) {
        diffy = -1;
      } else if ((this.getx() === 11) || (this.getx() === 25)) {
        diffx = 1;
      } else {
        diffx = -1;
      }
      for (let i=0;i<mobs.length;i++) {
        thismap.moveThing(mobs[i].getx() + diffx , mobs[i].gety() + diffy, mobs[i]);
        mobs[i].dealDamage(1000, door);
      };
      door.locked = 1;
      door.setGraphicArray(["static.png", "", -9*32, -16*32]);
      
      door.setBlocksLOSArray(door.closedLOS);
      door.closedLOS = [];
			
      door.removePassable(MOVE_WALK);
      door.open = 0;
      
      this.spritexoffset = -8*32;
    }
    retval["fin"] = 1;
    retval["txt"] = "Switch thrown.";
  } else {
    alert("Lever unattached!");
    retval["fin"] = 0;
  }
  
  return retval;
}

function ToshinLeverOffTile() {
  this.name = "ToshinLeverOff";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -109*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
ToshinLeverOffTile.prototype = new FeatureObject();

ToshinLeverOffTile.prototype.use = function(who) {
  let otherlever;
  if (this.getx() === 17) { 
    let levers = this.getHomeMap().getTile(6,13).getFeatures(); 
    for (let i=0;i<levers.length;i++) {
      if (levers[i].getName() === "ToshinLeverOff") { otherlever = levers[i]; break; }
    }
  } else {
    let levers = this.getHomeMap().getTile(17,21).getFeatures(); 
    for (let i=0;i<levers.length;i++) {
      if (levers[i].getName() === "ToshinLeverOff") { otherlever = levers[i]; break; }
    }
  }
  let doors = this.getHomeMap().getTile(25,13).getFeatures();
  let door;
  for (let i=0;i<doors.length;i++) {
    if (doors[i].getName().indexOf("Door") !== -1) {
      door = doors[i];
    }
  }
  if (this.spritexoffset === -8*32) {
    this.spritexoffset = -9*32;
    otherlever.spritexoffset = -9*32;
    door.unlockMe();
  } else {
    this.spritexoffset = -8*32;
    otherlever.spritexoffset = -8*32;
    door.lockMe(2);
  }
  DUPlaySound("sfx_small_lever");
  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "Switch thrown.";
  return retval;
}

function RoyalPuzzleLaserEWTile() {
  //Graphic Upgraded
  this.name = "RoyalPuzzleLaserEW";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -160*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "shimmering beam";
  
  LightEmitting.call(this, 1);

  ManualAnimation.call(this, { animstart: 0,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
RoyalPuzzleLaserEWTile.prototype = new FeatureObject();

RoyalPuzzleLaserEWTile.prototype.walkon = function(who) {
  let resp = InALaser(who);
  return resp;
}

function RoyalPuzzleLaserNSTile() {
  //Graphic Upgraded
  this.name = "RoyalPuzzleLaserNS";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -160*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "shimmering beam";
  
  LightEmitting.call(this, 1);

  ManualAnimation.call(this, { animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
RoyalPuzzleLaserNSTile.prototype = new FeatureObject();

RoyalPuzzleLaserNSTile.prototype.walkon = function(who) {
  let resp = InALaser(who);
  return resp;
}

function InALaser(who) {
  let themap = who.getHomeMap();
  themap.moveThing(46,28,who);
  ResetRoyalPuzzle(themap);
  DUPlaySound("sfx_small_zap");
  DrawMainFrame("draw",themap,PC.getx(),PC.gety());
  let response = {overridedraw:1,msg:"ZAP! The room resets."};
  return response;
}

function ResetRoyalPuzzle(where) {  
  let walls = [{x:48,y:29}, {x:49, y:35}, {x:48, y:31}, {x:46, y:29}, {x:47, y:28}, {x: 49, y:28}];
  
  let allfeatures = where.features.getAll();
  for (let i=0;i<allfeatures.length;i++) {
    if (allfeatures[i].getName() === "SandstoneWall") {
      let gowhere = walls.shift();
      where.moveThing(gowhere.x, gowhere.y, allfeatures[i]);
    }
  }
  
  CheckLasers(where);
}

function SunBeaconTile() {
  this.name = "SunBeacon";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-1792";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "beacon of sunlight";
  
  LightEmitting.call(this, 2);
}
SunBeaconTile.prototype = new FeatureObject();

function SandstoneWallTile() {
  this.name = "SandstoneWall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -97*32;
  this.blocklos = 0;
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a"
  this.desc = "sandstone wall";
  this.peerview = "#b0b0b0";

  this.pushable = 1;
  
  LightEmitting.call(this, 3);
}
SandstoneWallTile.prototype = new FeatureObject();

SandstoneWallTile.prototype.use = function(who) {
  let themap = who.getHomeMap();
  let diffx = this.getx() - who.getx();
  let diffy = this.gety() - who.gety();
  let retval = {};
  if ((Math.abs(diffx) > 1) || (Math.abs(diffy) > 1)) {
    retval["txt"] = "The wall shakes in place but does not move.";
    return retval;
  }
  let desttile = themap.getTile(this.getx()+diffx, this.gety()+diffy);
  let ontile = desttile.canMoveHere(MOVE_WALK,0);
  if (!ontile["canmove"]) {
    retval["txt"] = "Something is in the way.";
    return retval;
  }
  themap.moveThing(this.getx()+diffx, this.gety()+diffy, this);
  retval["txt"] = "The wall segment slides across the floor.";
  DUPlaySound("sfx_stone_drag");
  
  CheckLasers(themap);
  return retval;
}

SandstoneWallTile.prototype.pushMe = function(who) {
  let retval = this.use(who);
  retval["fin"] = 1;
  return retval;
}

// Sadly, currently not used.
function BlackDragonLadderWallTile() {
  //Graphics Upgraded
  this.name = "BlackDragonLadderWall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
BlackDragonLadderWallTile.prototype = new FeatureObject();

BlackDragonLadderWallTile.prototype.pushMe = function(who) {
  return this.use(who);
}

BlackDragonLadderWallTile.prototype.use = function(who) {
  let retval = {fin: 1};
  DUPlaySound("sfx_stone_drag");
  if (this.rotated) {
    let tile = this.getHomeMap().getTile(this.getx()+1,this.gety());
    let fealist = tile.getFeatures();
    for (let i=0;i<fealist.length;i++) {
      if (fealist[i].getName() === "LadderUp") {
        this.getHomeMap().deleteThing(fealist[i]);
        retval["txt"] = "The wall rotates again, and the ladder is again hidden.";
        this.rotated = 0;
        return retval;
      }
    }
  } else {
    let ladder = localFactory.createTile("LadderUp");
    let destmap = "blackdragon4";
    if (this.getHomeMap().getName() === "blackdragon_int3") { destmap = "blackdragon_int4"; }
    if (this.getHomeMap().getName() === "blackdragon_act2_3") { destmap = "blackdragon_act2_4"; }
    ladder.setEnterMap(destmap, this.getx()+1, this.gety());
    this.getHomeMap().placeThing(this.getx()+1,this.gety(),ladder);
    retval["txt"] = "The wall rotates in place, revealing a ladder attached to the wall!";
    this.rotated = 1;
    return retval;
  }
}

function WallOfWavesTile() {
  //Graphic Upgraded
  this.name = "WallOfWaves";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.layers = [["static.png","",-6*32,-161*32]];
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Waves";
  this.peerview = "white";
}
WallOfWavesTile.prototype = new FeatureObject();

WallOfWavesTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "waves", this);
  return retval;
}

WallOfWavesTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "waves", this);
  return retval;
}

function WallOfWindsTile() {
  //Graphic Upgraded
  this.name = "WallOfWinds";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.layers = [["static.png","",-7*32,-161*32]];
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Winds";
  this.peerview = "white";
}
WallOfWindsTile.prototype = new FeatureObject();

WallOfWindsTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "winds", this);
  return retval;
}

WallOfWindsTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "winds", this);
  return retval;
}

function WallOfKingsTile() {
  //Graphics Upgraded
  this.name = "WallOfKings";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.layers = [["static.png","",-5*32,-161*32]];
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Kings";
  this.peerview = "white";
}
WallOfKingsTile.prototype = new FeatureObject();

WallOfKingsTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "kings", this);
  return retval;
}

WallOfKingsTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "kings", this);
  return retval;
}

function WallOfFlamesTile() {
  //Graphics Upgraded
  this.name = "WallOfFlames";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.layers = [["static.png","",-8*32,-161*32]];
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Flames";
  this.peerview = "white";
}
WallOfFlamesTile.prototype = new FeatureObject();

WallOfFlamesTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "flames", this);
  return retval;
}

WallOfFlamesTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "flames", this);
  return retval;
}

function WallOfVoidTile() {
  //Graphics Upgraded
  this.name = "WallOfVoid";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.layers = [["static.png","",-9*32,-161*32]];
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Void";
  this.peerview = "white";
}
WallOfVoidTile.prototype = new FeatureObject();

WallOfVoidTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "void", this);
  return retval;
}

WallOfVoidTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "void", this);
  return retval;
}

function PlatformOfWavesTile() {
  //Graphics Upgraded
  this.name = "PlatformOfWaves";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -110*32;
  this.layers = [["static.png","",-6*32,-161*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfWavesTile.prototype = new FeatureObject();

function PlatformOfWindsTile() {
  //Graphics Upgraded
  this.name = "PlatformOfWinds";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -110*32;
  this.layers = [["static.png","",-7*32,-161*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfWindsTile.prototype = new FeatureObject();

PlatformOfWindsTile.prototype.walkon = function(who) {
  if (this.getHomeMap().getName() === "skypalace") {  // WHOOSH
    gamestate.setMode("null");

    let windlist = this.windlist;
    setTimeout( function() { whoosh(who, windlist, this.spawnat, this.spawnwhat); }, 100);
  
    delete this.spawnwhat;  
    DUPlaySound("sfx_whoosh");
    let response = {msg: "WHOOSH!" };
    return response;
  }
}

function whoosh(whozat, windlist, spawnwhere, spawnthing) {

  let tox = windlist[0];
  let toy = windlist[1];
  
  let windmap = whozat.getHomeMap();
  windmap.moveThing(tox,toy,whozat);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());  
  
  if (windlist[2]) {
    setTimeout( function() { whoosh(whozat, windlist.slice(2), spawnwhere, spawnthing); }, 100);
  } else {
    if (spawnthing) {
      let spawnedmonster = localFactory.createTile(spawnthing);
      windmap.placeThing(spawnwhere[0], spawnwhere[1], spawnedmonster);
      // add an "appears" visual effect? WORKING
    }
    
    
    whozat.endTurn(0);
  }
}

function PlatformOfKingsTile() {
  //Graphics Upgraded
  this.name = "PlatformOfKings";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -110*32;
  this.layers = [["static.png","",-5*32,-161*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfKingsTile.prototype = new FeatureObject();

function PlatformOfFlamesTile() {
  //Graphics Upgraded
  this.name = "PlatformOfFlames";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -110*32;
  this.layers = [["static.png","",-8*32,-161*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfFlamesTile.prototype = new FeatureObject();

function PlatformOfVoidTile() {
  //Graphics Upgraded
  this.name = "PlatformOfVoid";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -110*32;
  this.layers = [["static.png","",-9*32,-161*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfVoidTile.prototype = new FeatureObject();

function MarkOfKingsTile() {
  //Graphics Upgraded
  this.name = "MarkOfKings";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -161*32;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "Rune of Kings";
}
MarkOfKingsTile.prototype = new FeatureObject();
  
MarkOfKingsTile.prototype.use = function(user) {
  let retval = {};
  if (user.getRuneCooldown("kings") > DUTime.getGameClock()) {
    retval["fin"] = 1;
    retval["txt"] = "You are too tired to invoke this rune!"
    return retval;
  }
  // check if on surface, if so check location
  // if underground/in town, heal
  let themap = user.getHomeMap();
  if (!themap.getScale()) {
    if (themap.getName() === "darkunknown") {
      if (((user.getx() === 27) && (user.gety() === 28)) || ((user.getx() === 26) && (user.gety() === 29)) || ((user.getx() === 28) && (user.gety() === 29)) || ((user.getx() >= 25) && (user.getx() <= 28) && (user.gety() === 30)) || ((user.getx() >=25) && (user.getx() <= 27) && (user.gety() === 31))) {
        // open entrance to grotto
        Earthquake();
        DUPlaySound("sfx_earthquake");
        let cave = localFactory.createTile("Cave");
        cave.setEnterMap("grotto", 22, 53);
        themap.placeThing(27,30,cave);
        retval["txt"] = "A cave entrance is revealed!";
        return retval;
      } else if ((user.getx() === 100) && (user.gety() === 57)) {
        let tile = themap.getTile(112,67);
        let oldgate = tile.getTopFeature();
        if (oldgate && (oldgate.getName() === "Moongate")) {
          themap.deleteThing(oldgate);
        }
        
        user.getHomeMap().moveThing(111,67,user);
        DrawMainFrame("draw", themap, user.getx(), user.gety());
        // teleport to entrance to air
        setTimeout(function() {
          let moongate = localFactory.createTile("Moongate");
          moongate.destmap = "skypalace";
          moongate.destx = 47;
          moongate.desty = 49;
          themap.placeThing(112,67,moongate);
          AnimateMoongate(moongate,0,"up",300,0,1);
        }, 500);

      } else {
        // no effect
      }
    } else if ((themap.getName() === "volcano") && (GetDistance(user.getx(), user.gety(), 27,21) < 5)) {
      Earthquake();
      let cave = localFactory.createTile("Cave");
      cave.setEnterMap("lavatubes", 0, 0);   // make tubes!
      let nillavatile = themap.getTile(27,21);
      let nillava = nillavatile.getTopFeature();
      if (nillava && (nillave.getName() === "Lava")) {
        themap.deleteThing(nillava);
      }
      
      themap.placeThing(27,21,cave);
      retval["txt"] = "A tunnel into the caldera is exposed!";
      return retval;
        
    } else {
      retval["txt"] = "Nothing happens here.";
      return retval;
    }
  } else {
    // use power
    // set cooldown
  }
  return retval;
}  

function MarkOfWavesTile() {
  //Graphics Upgraded
  this.name = "MarkOfWaves";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -161*32;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "Rune of Waves";
}
MarkOfWavesTile.prototype = new FeatureObject();
  
MarkOfWavesTile.prototype.use = function(user) {
  // summon whirlpool if at lighthouse
  // otherwise, temp mana?
}  
  
function MarkOfWindsTile() {
  //Graphics Upgraded
  this.name = "MarkOfWinds";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -161*32;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "Rune of Winds";
}
MarkOfWindsTile.prototype = new FeatureObject();
  
MarkOfWindsTile.prototype.use = function(user) {
  // push back
}  

function MarkOfFlamesTile() {
  //Graphics Upgraded
  this.name = "MarkOfFlames";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -161*32;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "Rune of Flames";
}
MarkOfFlamesTile.prototype = new FeatureObject();
  
MarkOfFlamesTile.prototype.use = function(user) {
  // various random effects- flame armor, flame sword, burn foe
}  

function MarkOfVoidTile() {
  //Graphics Upgraded
  this.name = "MarkOfVoid";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -161*32;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "Rune of Void";
}
MarkOfVoidTile.prototype = new FeatureObject();
  
MarkOfVoidTile.prototype.use = function(user) {
  // Not sure it can be used, so this may not be useful
}  

function FlameEternalTile() {
  this.name = "FlameEternal";
  this.graphic = "master_spritesheet.png"; // for now, eternal_flame.gif for active fire
  this.spritexoffset = "-128";  // -32 is active fire
  this.spriteyoffset = "-1120";  // -0 for active fire
  this.prefix = "the";
  this.desc = "Flame Eternal";
  this.passable = MOVE_ETHEREAL;
}
FlameEternalTile.prototype = new FeatureObject();

function BrightFountainTile() {
  //Graphics Upgraded
  this.name = "BrightFountain";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -101*32;
  this.prefix = "a";
  this.desc = "fountain";
  this.peerview = "#a0a0a0";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  
  HasAmbientNoise.call(this,"sfx_fountain_splash",1.5);

  ManualAnimation.call(this, { animstart: 0,
    animlength: 5,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });

}
BrightFountainTile.prototype = new FeatureObject();

function BlueFountainTile() {
  //Graphics Upgraded
  this.name = "BlueFountain";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -102*32;
  this.prefix = "a";
  this.desc = "fountain";
  this.peerview = "#a0a0a0";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  
  HasAmbientNoise.call(this,"sfx_fountain_splash",1.5);

  ManualAnimation.call(this, { animstart: 0,
    animlength: 5,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });

}
BlueFountainTile.prototype = new FeatureObject();

function FountainTile() {
  //Graphics Upgraded
  this.name = "Fountain";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -101*32;
  this.prefix = "a";
  this.desc = "fountain";
  this.peerview = "#a0a0a0";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  
  HasAmbientNoise.call(this,"sfx_fountain_splash",2);

  ManualAnimation.call(this, { animstart: -160,
    animlength: 5,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });

}
FountainTile.prototype = new FeatureObject();

function WideFountainTile() {
  //Graphics Upgraded
  this.name = "WideFountain";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -123*32;
  this.prefix = "a";
  this.desc = "fountain";
  this.peerview = "#a0a0a0";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  
  HasAmbientNoise.call(this,"sfx_fountain_splash",2);

  ManualAnimation.call(this, { animstart: -192,
    animlength: 4,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });

}
WideFountainTile.prototype = new FeatureObject();

function BrokenFountainTile() {
  this.name = "BrokenFountain";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-832";
  this.prefix = "a";
  this.desc = "broken fountain";
  this.peerview = "#a0a0a0";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
}
BrokenFountainTile.prototype = new FeatureObject();

function BlueCrystalTile() {
  //Graphics Upgraded
  this.name = "BlueCrystal";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -111*32;
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#65ceff";
  this.passable = MOVE_ETHEREAL;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 5,
    animstyle: "pingpong",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });

}
BlueCrystalTile.prototype = new FeatureObject();

function PurpleCrystalTile() {
  //Graphics Upgraded
  this.name = "PurpleCrystal";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -112*32;
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#9b65ff";
  this.passable = MOVE_ETHEREAL;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 5,
    animstyle: "pingpong",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });
}
PurpleCrystalTile.prototype = new FeatureObject();

function YellowCrystalTile() {
  //Graphics Upgraded
  this.name = "YellowCrystal";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -113*32;
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#ffc465";
  this.passable = MOVE_ETHEREAL;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 5,
    animstyle: "pingpong",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });
}
YellowCrystalTile.prototype = new FeatureObject();

function GreenCrystalTile() {
  //Graphics Upgraded
  this.name = "GreenCrystal";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -114*32;
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#9bff65";
  this.passable = MOVE_ETHEREAL;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 5,
    animstyle: "pingpong",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });
}
GreenCrystalTile.prototype = new FeatureObject();

function RedCrystalTile() {
  //Graphics Upgraded
  this.name = "RedCrystal";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -115*32;
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#ff658b";
  this.passable = MOVE_ETHEREAL;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 5,
    animstyle: "pingpong",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });
}
RedCrystalTile.prototype = new FeatureObject();

function WhiteCrystalTile() {
  //Graphics Upgraded
  this.name = "WhiteCrystal";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -116*32;
  this.prefix = "a";
  this.desc = "crystal";
  this.peerview = "#b0cbc4";
  this.passable = MOVE_ETHEREAL;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 5,
    animstyle: "pingpong",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });
}
WhiteCrystalTile.prototype = new FeatureObject();

function TeleporterPlatformTile() {
  //Graphic Upgraded
  this.name = "TeleporterPlatform";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -110*32;
  this.prefix = "a";
  this.desc = "platform";
  this.destination;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
TeleporterPlatformTile.prototype = new FeatureObject();

TeleporterPlatformTile.prototype.setDestination = function(destobj) {
  if (destobj.map && destobj.x && destobj.y) {
    this.destination = {};
    this.destination = destobj;
  }
}

TeleporterPlatformTile.prototype.getDestination = function() {
  return this.destination;
}

TeleporterPlatformTile.prototype.walkon = function(who) {
  let response = {msg:""};
  if (this.getDestination()) {
    let themap = who.getHomeMap();
    let dest = this.getDestination();
    if (themap.getName() === dest.map) {
      themap.moveThing(dest.x, dest.y, who);
    } else {
      DU.maps.addMap(dest.map);
      let destmap = DU.maps.getMap(dest.map);
      MoveBetweenMaps(who,themap,destmap,dest.x,dest.y);
    }
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    ShowEffect(who, 500, "spellsparkles-anim.gif", 0, -64);
    if (who === PC) { DUPlaySound("sfx_teleport"); response.overridedraw = 1; }
  }
  return response;
}

function UDTeleporterPlatformTile() {
  //Graphic Upgraded
  this.name = "UDTeleporterPlatform";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -110*32;
  this.prefix = "a";
  this.desc = "platform";
  this.destination;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
UDTeleporterPlatformTile.prototype = new FeatureObject();

UDTeleporterPlatformTile.prototype.walkon = function(who) {
  let response = {msg:""};
  let themap = who.getHomeMap();
  themap.moveThing(7, 32, who);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  ShowEffect(who, 500, "spellsparkles-anim.gif", 0, -64);
  if (who === PC) { 
    DUPlaySound("sfx_teleport"); 
    response.overridedraw = 1; 
    if (DU.gameflags.getFlag("music")) { DUPlayMusic("Final", {fade:1}); }
    DU.gameflags.setFlag("final_music",1);
  }
  return response;
}

function PitTeleporterPlatformTile() {
  //Graphic Upgraded
  this.name = "PitTeleporterPlatform";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -110*32;
  this.prefix = "a";
  this.desc = "platform";
  this.destination;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
PitTeleporterPlatformTile.prototype = new FeatureObject();

PitTeleporterPlatformTile.prototype.setDestination = function(destobj) {
  this.destination = {};
  if (destobj.map && destobj.x && destobj.y) {
    this.destination = destobj;
  }
}

PitTeleporterPlatformTile.prototype.getDestination = function() {
  return this.destination;
}

PitTeleporterPlatformTile.prototype.walkon = function(who) {
  let response = {msg:""};
  if ((who.getLevel() < 4) && (who === PC)) {
    response.msg = "You hear a voice in your head: 'Thou'rt not yet ready for this trial.' Nothing happens.";
  }
  else if (this.getDestination()) {
    let themap = who.getHomeMap();
    let dest = this.getDestination();
    if (themap.getName() === dest.map) {
      themap.moveThing(dest.x, dest.y, who);
    } else {
      DU.maps.addMap(dest.map);
      let destmap = DU.maps.getMap(dest.map);
      MoveBetweenMaps(who,themap,destmap,dest.x,dest.y);
    }
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    ShowEffect(who, 500, "spellsparkles-anim.gif", 0, -64);
    if (who === PC) { DUPlaySound("sfx_teleport_pad"); response.overridedraw = 1; }
  }
  return response;
}

// Toshin
function ToshinPanelTile() {
  //Graphics Upgraded
  this.name = "ToshinPanel";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -106*32;
  this.prefix = "a";
  this.desc = "panel covered with buttons";
  this.val = {};
  this.val[65] = 0;
  this.val[66] = 0;
  this.val[67] = 0;
  this.val[68] = 0;
  this.val[69] = 0;
  this.peerview = "white";
}
ToshinPanelTile.prototype = new FeatureObject();

ToshinPanelTile.prototype.use = function(who) {
  gamestate.setMode("singleletter");
  let retval = {};
  retval["fin"] = 2;
  retval["txt"] = "Use: panel covered with buttons- Press which button?"
  retval["input"] = "Choose (A-E) - ";
  retval["override"] = 1;
  inputText.thing = "toshin";
  inputText.thingref = this;
  
  return retval;
}

function PerformToshinAltar(code) {
  let letter = String.fromCharCode(code);    	
  let retval = {};
  retval["fin"] = 1;
  if ((code => 65) && (code <= 69)) {
    retval["txt"] = "Pressed " + letter + ".";
  } else {
    retval["txt"] = "You look, and cannot find a " + letter + " button. Try A-E.";
  }
  let altar = inputText.thingref;
  let themap = altar.getHomeMap();
  let energyfield = localFactory.createTile("EnergyField");
  let firefield = localFactory.createTile("FireField");
  DUPlaySound("sfx_click");

  if (code === 65) {
    let fieldtile1 = themap.getTile(21,13);
    let fields = fieldtile1.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile2 = themap.getTile(20,17);
    fields = fieldtile2.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    if (altar.val[65]) {
      themap.placeThing(21,13,firefield);
      themap.placeThing(20,17,energyfield);
      altar.val[65] = 0;
    } else {
      themap.placeThing(21,13,energyfield);
      themap.placeThing(20,17,firefield);      
      altar.val[65] = 1;
    }
  } else if (code === 66) {
    let fieldtile1 = themap.getTile(11,7);
    let fields = fieldtile1.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile2 = themap.getTile(18,8);
    fields = fieldtile2.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    if (altar.val[66]) {
      themap.placeThing(18,8,energyfield);
      themap.placeThing(11,7,firefield);
      altar.val[66] = 0;
    } else {
      themap.placeThing(18,8,firefield);
      themap.placeThing(11,7,energyfield);      
      altar.val[66] = 1;
    }
  } else if (code === 67) {
    let fieldtile1 = themap.getTile(12,17);
    let fields = fieldtile1.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile2 = themap.getTile(12,19);
    fields = fieldtile2.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile3 = themap.getTile(13,18);
    fields = fieldtile3.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    if (altar.val[67]) {
      themap.placeThing(13,18,energyfield);
      themap.placeThing(12,17,firefield);
      let firefield2 = localFactory.createTile("FireField");
      themap.placeThing(12,19,firefield2);
      altar.val[67] = 0;
    } else {
      themap.placeThing(13,18,firefield);
      themap.placeThing(12,17,energyfield);      
      let energyfield2 = localFactory.createTile("EnergyField");
      themap.placeThing(12,19,energyfield2);
      altar.val[67] = 1;
    }
  } else if (code === 68) {
    let fieldtile1 = themap.getTile(12,11);
    let fields = fieldtile1.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile2 = themap.getTile(14,8);
    fields = fieldtile2.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    if (altar.val[68]) {
      themap.placeThing(14,8,energyfield);
      themap.placeThing(12,11,firefield);
      altar.val[68] = 0;
    } else {
      themap.placeThing(14,8,firefield);
      themap.placeThing(12,11,energyfield);      
      altar.val[68] = 1;
    }
  } else if (code === 69) {
    let fieldtile1 = themap.getTile(10,10);
    let fields = fieldtile1.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile2 = themap.getTile(12,15);
    fields = fieldtile2.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    if (altar.val[69]) {
      themap.placeThing(10,10,energyfield);
      themap.placeThing(12,15,firefield);
      altar.val[69] = 0;
    } else {
      themap.placeThing(10,10,firefield);
      themap.placeThing(12,15,energyfield);      
      altar.val[69] = 1;
    }
  } else {
    retval["fin"] = 2;
    return retval;
  } 
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  return retval;
}

function ToshinMoatLeverOffTile() {
  this.name = "ToshinMoatLeverOff";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -110*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
ToshinMoatLeverOffTile.prototype = new FeatureObject();

ToshinMoatLeverOffTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "Click!";
  let themap = this.getHomeMap();
  let tile = themap.getTile(25,13);
  let door = tile.getTopFeature();
  
  let lever1tile = themap.getTile(6,13);
  let lever1 = lever1tile.getTopFeature();
  let lever2tile = themap.getTile(17,21);
  let lever2 = lever2tile.getTopFeature();
  DUPlaySound("sfx_small_lever");
  
  if (this.spritexoffset === -8*32) {
    door.unlockMe();
    lever1.spritexoffset = -9*32;
    lever2.spritexoffset = -9*32;
  } else {
    door.lockMe(2);
    lever1.spritexoffset = -8*32;
    lever2.spritexoffset = -8*32;
  }
  DrawMainFrame("draw",themap,PC.getx(), PC.gety());
  
  return retval;
}

// For skypalace
function OrbToggleTile() {
  this.name = "OrbToggle";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -77*32;
  this.prefix = "an";
  this.desc = "orb";
}
OrbToggleTile.prototype = new FeatureObject();

OrbToggleTile.prototype.use = function(who) {
    this.spritexoffset = this.spritexoffset - 32;
    if (this.spritexoffset < -128) { this.spritexoffset = 0; }

    let sp = maps.getMap("skypalace");
    let orb1tile = sp.getTile(33,27);
    let orb1 = orb1tile.getTopFeature();
    let orb2tile = sp.getTile(29,32);
    let orb2 = orb2tile.getTopFeature();
    let orb3tile = sp.getTile(37,32);
    let orb3 = orb3tile.getTopFeature();
    if ((orb1.spritexoffset === -32) && (orb2.spritexoffset === -96) && (orb3.spritexoffset === -64)) {
      let moongate = localFactory.createTile("Moongate");
      moongate.destmap = "skypalace2";
      moongate.destx = 11;
      moongate.desty = 12;
      sp.placeThing(33,31,moongate);
      AnimateMoongate(moongate,0,"up",300,0,1);
    } else {
      let mgtile = sp.getTile(33,31);
      let moongate = mgtile.getTopFeature();
      if (moongate) {
        AnimateMoongate(moongate,0,"down",300,1,0);
        delete moongate.destmap;
      }
    }
  
    let retval = {};
    retval["txt"] = "Done!";
    return retval;
}

// Mt Drash
function DrashOrbToggleTile() {
  this.name = "DrashOrbToggle";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -77*32;
  this.prefix = "an";
  this.desc = "orb";
}
DrashOrbToggleTile.prototype = new FeatureObject();

DrashOrbToggleTile.prototype.use = function(who) {
  let retval = {};
  retval["txt"] = "Done!";

  this.spritexoffset = this.spritexoffset - 32;
    if (this.spritexoffset < -128) { this.spritexoffset = 0; }

    let sp = maps.getMap("mtdrash8");
    let orb1tile = sp.getTile(7,9);
    let orb1 = orb1tile.getTopFeature();
    let orb2tile = sp.getTile(8,8);
    let orb2 = orb2tile.getTopFeature();
    let orb3tile = sp.getTile(9,9);
    let orb3 = orb3tile.getTopFeature();
    if ((orb1.spritexoffset === -128) && (orb2.spritexoffset === -128) && (orb3.spritexoffset === -32)) {
      let pile = sp.getTile(14,12).getFeatures();
      let spinner;
      for (let i=0;i<pile.length;i++) {
        if (pile[i].getName() === "Spinner") {
          spinner = pile[i];
          break;
        }
      }
      if (spinner) {
        retval["txt"] = "Done!<br />You hear a distant SNAP sound.";
        sp.deleteThing(spinner);        
      }
    } 
  
  return retval;
}

function OrbStrengthTile() {
  this.name = "OrbStrength";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -69*32;
  this.prefix = "an";
  this.desc = "orb";
}
OrbStrengthTile.prototype = new FeatureObject();

OrbStrengthTile.prototype.use = function(who) {
  let retval = {fin:1};
  retval["input"] = "&gt;";
  if (DU.gameflags.getFlag(this.getHomeMap().getName() + "_StrOrb")) {
    retval["txt"] = "The orb shutters, and then crumbles to dust.";
    DUPlaySound("sfx_break_glass");
    this.getHomeMap().deleteThing(this);
    return retval;
  }
  who.setOrbStr(who.getOrbStr()+1);
  if (who === PC) {
    retval["txt"] = "You feel stronger! The orb crumbles to dust.";
    DUPlaySound("sfx_break_glass");
    DUPlaySound("sfx_buff");
  }
  this.getHomeMap().deleteThing(this);
  DU.gameflags.setFlag(this.getHomeMap().getName() + "_StrOrb",1);
  return retval;
}

function OrbDexterityTile() {
  this.name = "OrbDexterity";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -69*32;
  this.prefix = "an";
  this.desc = "orb";
}
OrbDexterityTile.prototype = new FeatureObject();

OrbDexterityTile.prototype.use = function(who) {
  let retval = {fin:1};
  retval["input"] = "&gt;";
  if (DU.gameflags.getFlag(this.getHomeMap().getName() + "_DexOrb")) {
    retval["txt"] = "The orb shutters, and then crumbles to dust.";
    this.getHomeMap().deleteThing(this);
    DUPlaySound("sfx_break_glass");
    return retval;
  }
  who.setOrbDex(who.getOrbDex()+1);
  DU.gameflags.setFlag(this.getHomeMap().getName() + "_DexOrb",1);
  if (who === PC) {
    retval["txt"] = "You feel more agile! The orb crumbles to dust.";
    DUPlaySound("sfx_break_glass");
    DUPlaySound("sfx_buff");
  }
  this.getHomeMap().deleteThing(this);

  return retval;
}

function OrbIntelligenceTile() {
  this.name = "OrbIntelligence";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -69*32;
  this.prefix = "an";
  this.desc = "orb";
}
OrbIntelligenceTile.prototype = new FeatureObject();

OrbIntelligenceTile.prototype.use = function(who) {
  let retval = {fin:1};
  retval["input"] = "&gt;";
  if (DU.gameflags.getFlag(this.getHomeMap().getName() + "_IntOrb")) {
    retval["txt"] = "The orb shutters, and then crumbles to dust.";
    this.getHomeMap().deleteThing(this);
    DUPlaySound("sfx_break_glass");
    return retval;
  }
  who.setOrbInt(who.getOrbInt()+1);
  DU.gameflags.setFlag(this.getHomeMap().getName() + "_IntOrb",1);
  if (who === PC) {
    retval["txt"] = "You feel smarter! The orb crumbles to dust.";
    DUPlaySound("sfx_break_glass");
    DUPlaySound("sfx_buff");
  }
  this.getHomeMap().deleteThing(this);
  return retval;
}

function OrbExperienceTile() {
  this.name = "OrbExperience";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -69*32;
  this.prefix = "an";
  this.desc = "orb";
}
OrbExperienceTile.prototype = new FeatureObject();

OrbExperienceTile.prototype.use = function(who) {
  let retval = {fin:1};
  retval["input"] = "&gt;";
  if (DU.gameflags.getFlag(this.getHomeMap().getName() + "_ExpOrb")) {
    retval["txt"] = "The orb shutters, and then crumbles to dust.";
    this.getHomeMap().deleteThing(this);
    DUPlaySound("sfx_break_glass");
    return retval;
  }
  who.addxp(100);
  if (who === PC) {
    DU.gameflags.setFlag(this.getHomeMap().getName() + "_ExpOrb",1);
    retval["txt"] = "You feel more experienced! The orb crumbles to dust.";
    DUPlaySound("sfx_break_glass");
    DUPlaySound("sfx_buff");
  }
  this.getHomeMap().deleteThing(this);
  return retval;
}

function EtherGateTile() {
  this.name = "EtherGate";
  this.graphic = "moongates.gif";
  this.spritexoffset = '-128';
  this.spriteyoffset = '-32';
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "gate";

  HasAmbientNoise.call(this,"sfx_portal_ambient",1.5);
}
EtherGateTile.prototype = new FeatureObject();

EtherGateTile.prototype.walkon = function(who) {
  let response = {msg:""};
  let homemap = who.getHomeMap();
  let desttile = homemap.getTile(this.destx,this.desty);
  let npcs = desttile.getNPCs();
  if (npcs) {
    for (let i=0;i<npcs.length;i++) {
      homemap.moveThing(this.destx-1,this.desty,npcs[i]);
    };
  }
  homemap.moveThing(this.destx,this.desty,who);
  if (who === PC) {
    DrawMainFrame("draw", homemap, PC.getx(), PC.gety());
    return response.overridedraw = 1; 
  }
  return response;
}

function TempMoongateTile() {
  this.name = "TempMoongate";
  this.graphic = "moongates.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -1*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "gate";

  ManualAnimation.call(this, { animstart: 0,
    animlength: 8,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 150,
    startframe: "start"
  });

}
TempMoongateTile.prototype = new FeatureObject();

function MoongateTile() {
  this.name = "Moongate";
  this.graphic = "moongates.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -1*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "gate";

  HasAmbientNoise.call(this,"sfx_portal_ambient",1.5);

  ManualAnimation.call(this, { animstart: 0,
    animlength: 8,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 150,
    startframe: "start"
  });

}
MoongateTile.prototype = new FeatureObject();

MoongateTile.prototype.walkon = function(who) {
  let response = {msg:""};
  if (this.destmap && this.destx && this.desty && (this.destmap !== who.getHomeMap().getName())) {
    let newmap = new GameMap();
    if (maps.getMap(this.destmap)) {
      newmap = maps.getMap(this.destmap);
    } else {
      newmap = maps.addMap(this.destmap);
    }
    MoveBetweenMaps(who,who.getHomeMap(),newmap, this.destx, this.desty);
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
    if (who === PC) { return {overridedraw: 1}; }
  } else if (this.destmap && this.destx && this.desty) {
    who.getHomeMap().moveThing(this.destx,this.desty,who);
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  }
  // needs SOUND
  return response;
}

function TempDaemonMoongateTile() {
  this.name = "TempDaemonMoongate";
  this.graphic = "moongates.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -1*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "gate";

  ManualAnimation.call(this, { animstart: 0,
    animlength: 8,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 150,
    startframe: "start"
  });
}
TempDaemonMoongateTile.prototype = new FeatureObject();

function DaemonMoongateTile() {
  this.name = "DaemonMoongate";
  this.graphic = "moongates.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -1*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "gate";

  HasAmbientNoise.call(this,"sfx_portal_ambient",1.5);

  ManualAnimation.call(this, { animstart: 0,
    animlength: 8,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 150,
    startframe: "start"
  });
}
DaemonMoongateTile.prototype = new FeatureObject();

DaemonMoongateTile.prototype.walkon = function(who) {
  let response = {msg:""};
  if (this.destx && this.desty) {
    who.getHomeMap().moveThing(this.destx,this.desty,who);
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");

    if (this.first) {
      let door = this.getHomeMap().getTile(21,24).getTopFeature();
      setTimeout(function() { DissolveDoor(door,1);}, 250);
    } else if (this.second) {
//other door dissolve, daemon speech?
    }
  }
  // needs SOUND
  return response;
}

function DissolveDoor(door, which) {
  // working here- replace with new graphic locations when I have them
  if (door.spriteyoffset === -16*32) {
    door.spriteyoffset = -163*32;
    door.spritexoffset = 0;
    DrawMainFrame("one",door.getHomeMap(),door.getx(),door.gety());
    setTimeout(function() { DissolveDoor(door,which);}, 250);
  } else if (door.spritexoffset === 0) {
    door.spritexoffset = -1*32;
    DrawMainFrame("one",door.getHomeMap(),door.getx(),door.gety());
    setTimeout(function() { DissolveDoor(door,which);}, 250);
  } else if (door.spritexoffset === -32) {
    door.spritexoffset = -2*32;
    DrawMainFrame("one",door.getHomeMap(),door.getx(),door.gety());
    setTimeout(function() { DissolveDoor(door,which);}, 250);
  } else if (door.spritexoffset === -2*32) {
    door.spritexoffset = -3*32;
    DrawMainFrame("one",door.getHomeMap(),door.getx(),door.gety());
    setTimeout(function() { DissolveDoor(door,which);}, 250);
  } else {
    let dmap = door.getHomeMap();
    let dx = door.getx();
    let dy = door.gety();
    dmap.deleteThing(door);
    DrawMainFrame("one",dmap,dx,dy);
    let darkness = dmap.getTile(18,32).getTopNPC();
    if (which === 1) {
      darkness.firstgate = 1;
    } else {
      darkness.secondgate = 1;
    }
  }
}

function PetrifiedReaperTile() {
  this.name = "PetrifiedReaper";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -98*32;
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "petrified reaper";
}
PetrifiedReaperTile.prototype = new FeatureObject();

PetrifiedReaperTile.prototype.use = function(who) {
  let retval  ={fin:1};

  if (IsAdjacent(who,this)) {
    let loot = localFactory.createTile("ReaperBark");
    PC.addToInventory(loot,1);
    retval["txt"] = "You take some petrified reaper bark.";
  } else {
    retval["txt"] = "Nothing happens.";
  }

  return retval;
}  

function OracleObject() {
  this.name = "OracleObject";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-640";
  this.passable = MOVE_ETHEREAL;
  this.prefix = "the";
  this.desc = "Oracle";
  this.peerview = "white";
}
OracleObject.prototype = new FeatureObject();

function OracleLowerLeftTile() {
  this.name = "OracleLowerLeft";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -93*32;
}
OracleLowerLeftTile.prototype = new OracleObject();

function OracleLowerRightTile() {
  this.name = "OracleLowerRight";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -93*32;
}
OracleLowerRightTile.prototype = new OracleObject();

function OracleMidLeftTile() {
  this.name = "OracleMidLeft";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -92*32;
}
OracleMidLeftTile.prototype = new OracleObject();

function OracleMidRightTile() {
  this.name = "OracleMidRight";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -92*32;
}
OracleMidRightTile.prototype = new OracleObject();

function OracleTopLeftTile() {
  this.name = "OracleTopLeft";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -91*32;
}
OracleTopLeftTile.prototype = new OracleObject();

function OracleTopRightTile() {
  this.name = "OracleTopRight";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -91*32;
}
OracleTopRightTile.prototype = new OracleObject();

function SwordInStoneTile() {
  //Graphics Upgraded
  this.name = "SwordInStone";
  this.graphic = "static.png";
//  this.spritexoffset = -4*32;
//  this.spriteyoffset = -75*32;
  this.spritexoffset = -9*32;
  this.spriteyoffset = -120*32;
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "sword driven into a stone";
  this.peerview = "white";
}
SwordInStoneTile.prototype = new FeatureObject();

SwordInStoneTile.prototype.use = function(who) {
  let wherex = this.getx();
  let wherey = this.gety();
  let mymap = this.getHomeMap();
  mymap.deleteThing(this);
  let emptyaltar = localFactory.createTile("StoneWithoutSword");
  mymap.placeThing(wherex,wherey,emptyaltar);
  let magicsword = localFactory.createTile("MagicSword");
  mymap.placeThing(wherex,wherey,magicsword);
  DrawMainFrame("one", mymap, wherex, whereY);
  
  return;
}

function StoneWithoutSwordTile() {
  //Graphics Upgraded
  this.name = "StoneWithoutSword";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "stone that once cradled a sword";
  this.peerview = "white";
}
StoneWithoutSwordTile.prototype = new FeatureObject();


// Items

function ItemObject() {
	this.addType("Item");
  this.quantity = 1;
  
  this.longdesc = "";
  this.usedesc = "";
	
	Pushable.call(this);
}
ItemObject.prototype = new FeatureObject();

ItemObject.prototype.getQuantity = function() {
	return this.quantity;
}

ItemObject.prototype.setQuantity = function(quant) {
	this.quantity = quant;
}

ItemObject.prototype.getLongDesc = function() {
  return this.longdesc;
}

ItemObject.prototype.getUseDesc = function() {
  return this.usedesc;
}

function AmbroseShieldTile() {
  this.name = "AmbroseShield";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -36*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "shield";
  this.prefix = "the";
  this.longdesc = "This was commissioned by Nyrani and made by Erin of Hildendain. It should be brought to Nyrani.";
  this.addType("Quest");
}
AmbroseShieldTile.prototype = new ItemObject();

function RobertMapTile() {
  //Graphics Upgraded
  this.name = "RobertMap";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "map";
  this.prefix = "a";
  this.longdesc = "A map. You were asked to bring it to Robert in Clear Lake.";
  this.addType("Quest");
}
RobertMapTile.prototype = new ItemObject();

function SmallRockTile() {
  //Graphics Upgraded
  this.name = "SmallRock";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "small rock";
  this.prefix = "a";
  this.longdesc = "A small rock. That's it. You were asked to bring it to Garen in Naurglen.";
  this.addType("Quest");  
}
SmallRockTile.prototype = new ItemObject();

function SiriCloakTile() {
  //Graphics Upgraded
  this.name = "SiriCloak";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -39*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "blue cloak";
  this.longdesc = "A blue cloak, once worn by Siri in her adventures. It should be returned to Garen in Naurglen.";
  this.prefix = "a";

  this.addType("Quest");  
}
SiriCloakTile.prototype = new ItemObject();

function JusticeOrbTile() {
  //Graphics Upgraded
  this.name = "JusticeOrb";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -70*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "crystal orb";
  this.longdesc = "A crystalline orb that was in the debris among the shattered, large crystals where you fought Justice.";
  this.prefix = "a";

  this.addType("Quest");  
}
JusticeOrbTile.prototype = new ItemObject();
  
JusticeOrbTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "Nothing happens here.";

  let themap = who.getHomeMap();
  if ((themap.getName() === "blackdragon3") || (themap.getName() === "blackdragon_int3") || (themap.getName() === "blackdragon_act2_3")) {
    let feas = themap.getTile(25,20).getFeatures();
    let field;
    for (let i=0;i<feas.length;i++) {
      if (feas[i].getName() === "EnergyField") { field = feas[i]; }
    }
    if (field) {
      themap.deleteThing(field);
      retval["txt"] = "The crystal glows fiercely for a moment, and without a sound the barrier in the corner of the room disappears, revealing a previously unseen ladder.";
    }
  }
  return retval;
}

JusticeOrbTile.prototype.onGet = function(who) {
  let newcrystal = localFactory.createTile("NegatorGnomeNPC");
  let gnomemap = maps.getMap("gnomeland");
	if (!gnomemap) {
	  gnomemap = new GameMap();
    gnomemap = maps.addMap("gnomeland");
	}
  gnomemap.placeThing(2,1,newcrystal);
  newcrystal.invisible = 1;
  let cataclysm = localFactory.createTile("JusticeCollapse");
  newcrystal.addSpellEffect(cataclysm);

  return {};
}

function CrownTile() {
  //Graphics Upgraded
  this.name = "Crown";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -21*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "crown";
  this.longdesc = "Not one of the crowns your parents wear, but one of the crown jewels nonetheless.";
  this.prefix = "a";

  this.addType("Quest");  
}
CrownTile.prototype = new ItemObject();

function CrownJewelTile() {
  this.name = "CrownJewel";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -98*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "royal necklace";
  this.longdesc = "This necklace, with heavy gold and a large set stone, is one of the crown jewels.";
  this.prefix = "a";

  this.addType("Quest");  
}
CrownJewelTile.prototype = new ItemObject();

function SceptreTile() {
  //Graphics Upgraded
  this.name = "Sceptre";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -36*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "sceptre";
  this.longdesc = "This sceptre, with a blue stone at the tip, is one of the crown jewels.";
  this.prefix = "a";

  this.addType("Quest");  
}
SceptreTile.prototype = new ItemObject();

function KineticCrystalTile() {
  //Graphics upgraded
  this.name = "KineticCrystal";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -97*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "softly glowing crystal";
  this.longdesc = "This pale crystal glows softly, but radiates no heat.";
  this.prefix = "a";

  this.addType("Quest");  
}
KineticCrystalTile.prototype = new ItemObject();

KineticCrystalTile.prototype.onGet = function(who) {
  let wemap = who.getHomeMap();
  let gazer = localFactory.createTile("GazerNPC");
  wemap.placeThing(30,47,gazer);
  gazer = localFactory.createTile("GazerNPC");
  wemap.placeThing(29,46,gazer);
  gazer = localFactory.createTile("GazerNPC");
  wemap.placeThing(34,51,gazer);
  gazer = localFactory.createTile("GazerNPC");
  wemap.placeThing(31,50,gazer);

  return {};
}

KineticCrystalTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "You hold the crystal in your hand, but are not sure what to do with it.";
  let wemap = who.getHomeMap();
  if (wemap.getName() === "worldsending2") {
    if (((who.getx() === 38) && (who.gety() === 28)) || ((who.getx() === 39) && (who.gety() === 29))) {
      retval["txt"] = "You place the crystal into the socket, and hear a profound CLICK, and then a low, resonant hum.";
      let receptacle = wemap.getTile(39,28).getTopFeature();
      receptacle.spritexoffset = -1*32;
      DU.gameflags.setFlag("worldsendingraft",1);
      PC.removeFromInventory(this);
    }
  }
  return retval;
}

function ChaliceTile() {
  //Graphics Upgraded
  this.name = "Chalice";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "chalice";
  this.longdesc = "The Chalice of the Paladins. Isaac seeks its return, in Swainhil.";
  this.prefix = "a";

  this.addType("Quest");  
}
ChaliceTile.prototype = new ItemObject();

function FrozenSunlightTile() {
  //Graphic Upgraded
  this.name = "FrozenSunlight";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -162*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "frozen sunlight";
  this.longdesc = "Sunlight, frozen solid. Somehow.";

  this.addType("Quest");  
  this.addType("Reagent");

  ManualAnimation.call(this, { animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
FrozenSunlightTile.prototype = new ItemObject();

FrozenSunlightTile.prototype.myTurn = function() {
  if (this.stabilized) { return 1; }
  if (PC.checkInventory("FrozenSunlight")) {
    PC.removeFromInventory(this);
    maintext.addText("The frozen sunlight dissipates with a golden glow and is gone.");
  } else {
    if (!maps.getMap(this.getHomeMap().getName())) {
      return 1; 
    }
    if (GetDistance(PC.getx(),PC.gety(),this.getx(),this.gety()) <= 6) {
      maintext.addText("The frozen sunlight dissipates with a golden glow and is gone.");
    }
    this.getHomeMap().deleteThing(this);
  }
  
  return 1;
}

function RippedAudachtaNemesosTile() {
  this.name = "RippedAudachtaNemesos";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -38*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a"
  this.desc = "ripped Audachta Nemesos";
  this.longdesc = "An Audachta Nemesos that has had three pages torn out, rendering it unreadable.";

  this.addType("Quest");  
  Breakable.call(this,["master_spritesheet.png", "", "-160", "-1216"],1);
  this.cannotrepair = 1; 
}
RippedAudachtaNemesosTile.prototype = new ItemObject();

RippedAudachtaNemesosTile.prototype.onMend = function(who) {
  if (who.checkInventory("AudachtaNemesosPage1") && who.checkInventory("AudachtaNemesosPage2") && who.checkInventory("AudachtaNemesosPage3")) {
    maintext.addText("You put the pages together with the book, and cast Mending. The entire thing glows for several heartbeats, then fades, now intact.");
    maintext.addText("<span class='sysconv'>You now have: Audachta Nemesos: Permanence.</span>");
    who.removeFromInventory(this);
    who.removeFromInventory(who.checkInventory("AudachtaNemesosPage1"));
    who.removeFromInventory(who.checkInventory("AudachtaNemesosPage2"));
    who.removeFromInventory(who.checkInventory("AudachtaNemesosPage3"));
    who.addToInventory(localFactory.createTile("AudachtaNemesosPermanence"),1);
    return 0;
  } else {
    maintext.addText("The torn book glows briefly, but nothing happens. You don't have all the missing pages.");
    return 0;
  }
}

function AudachtaNemesosPage1Tile() {
  this.name = "AudachtaNemesosPage1";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -100*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a"
  this.desc = "page torn from a Audachta Nemesos";
  this.longdesc = "A page that has been torn from an Audachta Nemesos.";

  this.addType("Quest");  
}
AudachtaNemesosPage1Tile.prototype = new ItemObject();

function AudachtaNemesosPage2Tile() {
  this.name = "AudachtaNemesosPage2";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -100*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a"
  this.desc = "page torn from a Audachta Nemesos";
  this.longdesc = "A page that has been torn from an Audachta Nemesos.";

  this.addType("Quest");  
}
AudachtaNemesosPage2Tile.prototype = new ItemObject();

function AudachtaNemesosPage3Tile() {
  this.name = "AudachtaNemesosPage3";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -100*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a"
  this.desc = "page torn from a Audachta Nemesos";
  this.longdesc = "A page that has been torn from an Audachta Nemesos.";

  this.addType("Quest");  
}
AudachtaNemesosPage3Tile.prototype = new ItemObject();

function CourierPouchTile() {
  //Graphics Upgraded
  this.name = "CourierPouch";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "pouch full of papers";
  this.prefix = "a";
  this.longdesc = "The pouch of papers carried by a rebel courier. Bring it to Dawne to prove yourself.";
  this.usedesc = "Read the contents.";
  this.addType("Quest");
}
CourierPouchTile.prototype = new ItemObject();

CourierPouchTile.prototype.onGet = function(who) {
  let themap = maps.getMap("darkunknown");
  let npcs = themap.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName() === "CourierGroup") {
      themap.deleteThing(npcs[i]);
      DUTime.removeEntityFrom(npcs[i]);
    }
  }

  return {};
}

CourierPouchTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "You open the pouch and scan through the documents. They appear to be written in some kind of code- hopefully the Loyalists know how to read it.";
  return retval;
}

function CourierLetterTile() {
  //Updated graphic
  this.name = "CourierLetter";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -100*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Rebel letter";
  this.longdesc = "A letter for your brother, from Aithne of the Rebels.";
  this.usedesc = "Read the letter.";
  this.prefix = "a";
  this.addType("Quest");
}
CourierLetterTile.prototype = new ItemObject();

CourierLetterTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "The letter appears to be in a simple code. Hopefully Prince Lance knows how to read it.";
  return retval;
}

function TrustedPlansTile() {
  //Graphics Upgraded
  this.name = "TrustedPlans";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "plans for a Trusted pin";
  this.prefix = "the";
  this.longdesc = "Plans that show the design of a pin that will signify that you are one of the Trusted. Colin in Clear Lake can make the pin from these.";  
  this.addType("Quest");
}
TrustedPlansTile.prototype = new ItemObject();

function TrustedPinTile() {
  //Graphics Upgraded
  this.name = "TrustedPin";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Trusted pin";
  this.prefix = "a";
  this.longdesc = "Wearing this pin marks you as one of the Trusted, able to gain access to Prince Lance.";
  this.addType("Quest");
}
TrustedPinTile.prototype = new ItemObject();

function ReaperBarkTile() {
  //Graphics Upgraded
  this.name = "ReaperBark";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "piece of petrified reaper bark";
  this.prefix = "a";
  this.longdesc = "A piece of bark taken off a petrified reaper. Asharden asked you to bring it to him.";
  this.addType("Quest");
}
ReaperBarkTile.prototype = new ItemObject();

function BlackDragonScaleTile() {
  //Graphics Upgraded
  this.name = "BlackDragonScale";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "black dragon scale";
  this.prefix = "a";
  this.longdesc = "A scale from the black dragon that had ensorcelled Lance.";
  this.addType("Quest");
}
BlackDragonScaleTile.prototype = new ItemObject();

function DragonBoneTile() {
  //Graphics Upgraded
  this.name = "DragonBone";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -39*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "dragon fingerbone";
  this.prefix = "a";
  this.longdesc = "The fingerbone of a dragon, usable as a pestle.";
  this.addType("Quest");
}
DragonBoneTile.prototype = new ItemObject();

function VoidstoneSculptureTile() {
  //Graphics Upgraded
  this.name = "VoidstoneSculpture";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -35*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sculpture made of voidstone";
  this.longdesc = "A simple sculpture of a bird, made of voidstone. It... isn't very good.";
  this.addType("Quest");
}
VoidstoneSculptureTile.prototype = new ItemObject();

function StoneOfConflagrationsTile() {
  this.name = "StoneOfConflagrations";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Stone of Conflagrations";
  this.prefix = "the";
  this.longdesc = "The Stone of Conflagrations. It has an aura of fiery power.";
  this.addType("Quest");

  ManualAnimation.call(this, { animstart: 0,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });

}
StoneOfConflagrationsTile.prototype = new ItemObject();

function BrokenArrowTile() {
  // Graphic Upgraded
  this.name = "BrokenArrow";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -73*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "green-fletched arrow";
  this.prefix = "a";
  this.longdesc = "A broken arrow with green fletching. Return to Ladonna when Mended.";
  this.addType("Quest");
  Breakable.call(this,["static.png", "", -32, -98*32],0,"");
  this.brokendesc = "broken green-fletched arrow";
  this.repairNeedsInfusion = 1;
}
BrokenArrowTile.prototype = new ItemObject();

BrokenArrowTile.prototype.onRepair = function(who) {
  this.longdesc = "An arrow with green fletching. Now that you've Mended it, return it to Ladonna.";
}

function TreasuryTokenTile() {
  this.name = "TreasuryToken";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-1248";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "treasury token";
  this.prefix = "a";
  this.longdesc = "A token given to you by the King. Bring it to the treasury.";
  this.addType("Quest");
}
TreasuryTokenTile.prototype = new ItemObject();

function FavorChitTile() {
  this.name = "FavorChit";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-1344";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "favor chit";
  this.prefix = "a";
  this.longdesc = "A chit that marks that Denise, mayor of Beldskae, owes you a favor.";
  this.addType("Quest");
}
FavorChitTile.prototype = new ItemObject();

function VoidstoneTile() {
  //Graphics Upgraded
  this.name = "Voidstone";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "chunk of voidstone";
  this.longdesc = "Voidstone. A rare material with unusual properties.";
  this.addType("Reagent");
}
VoidstoneTile.prototype = new ItemObject();

function SpiderSilkTile() {
  //Graphics Upgraded
  this.name = "SpiderSilk";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "bit of spider silk";
  this.longdesc = "Spider silk. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
SpiderSilkTile.prototype = new ItemObject();

function BlackPearlTile() {
  //Graphics Upgraded
  this.name = "BlackPearl";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "black pearl";
  this.longdesc = "Black pearl. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
BlackPearlTile.prototype = new ItemObject();

function ExecutionersHoodTile() {
  //Graphics Upgraded
  this.name = "ExecutionersHood";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -27*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "an";
  this.desc = "executioner's hood";
  this.longdesc = "A head of an executioner's hood mushroom.";
  this.addType("Reagent");
}
ExecutionersHoodTile.prototype = new ItemObject();

function QuestExecutionersHoodTile() {
  //Graphics Upgraded
  this.name = "QuestExecutionersHood";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -27*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "an";
  this.desc = "executioner's hood";
  this.longdesc = "A head of an executioner's hood mushroom. Jharden is seeking it.";
  this.addType("Quest");
}
QuestExecutionersHoodTile.prototype = new ItemObject();

function NightshadeTile() {
  //Graphics Upgraded
  this.name = "Nightshade";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -27*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "some";
  this.desc = "nightshade";
  this.longdesc = "Deadly nightshade. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
NightshadeTile.prototype = new ItemObject();

function SulfurousAshTile() {
  //Graphics Upgraded
  this.name = "SulfurousAsh";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -28*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pile of sulfurous ash";
  this.longdesc = "Sulfurous ash, found in a volcano. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
SulfurousAshTile.prototype = new ItemObject();

function MassOfHerbsTile() {
  //Graphics Upgraded
  this.name = "MassOfHerbs";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -28*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "mass of herbs";
  this.longdesc = "A mass of herbs, sometimes used in alchemy.";
  this.addType("Reagent");
}
MassOfHerbsTile.prototype = new ItemObject();

function MandrakeRootTile() {
  //Graphics Upgraded
  this.name = "MandrakeRoot";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "mandrake root";
  this.longdesc = "A sprig of mandrake root. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
MandrakeRootTile.prototype = new ItemObject();

function LightningWoodTile() {
  //GraphicsUpgraded 
  this.name = "LightningWood";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "twig of lightning wood";
  this.prefix = "a";
  this.longdesc = "The branch of a tree that has been struck by lightning. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
LightningWoodTile.prototype = new ItemObject();

function MistletoeTile() {
  //Graphics Upgraded
  this.name = "Mistletoe";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "mistletoe";
  this.longdesc = "A sprig of mistletoe. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
MistletoeTile.prototype = new ItemObject();

function BloodMossTile() {
  //Graphics Upgraded
  this.name = "BloodMoss";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "blood moss";
  this.longdesc = "Some blood moss. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
BloodMossTile.prototype = new ItemObject();

function BottledEtherTile() {
  //Graphics Upgraded
  this.name = "BottledEther";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -23*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "bottled ether";
  this.longdesc = "Bottled Ether. It glows fantastically.";
  this.addType("Reagent");
}
BottledEtherTile.prototype = new ItemObject();

function PerfectRubyTile() {
  //Graphics Upgraded
	this.name = "PerfectRuby";
  this.graphic = "static.png";
  this.spritexoffset = 0*32;
  this.spriteyoffset = -106*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "perfect ruby gemstone";
  this.longdesc = "A perfect ruby gemstone. Flawless.";
  this.prefix = "a";
  this.valuable = 1;
  this.enchantable = 1;
}
PerfectRubyTile.prototype = new ItemObject();

function UncutLargeRubyTile() {
  //Graphics Upgraded
	this.name = "UncutLargeRuby";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "rough, fist-sized ruby gemstone";
  this.longdesc = "A beautiful uncut, large ruby gemstone.";
  this.prefix = "a";
  this.valuable = 1;
}
UncutLargeRubyTile.prototype = new ItemObject();

UncutLargeRubyTile.prototype.onGet = function(who) {
  DU.gameflags.setFlag("rune_gems",1);

  return {};
}

function RubyTile() {
  //Graphics Upgraded
	this.name = "Ruby";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "ruby";
  this.longdesc = "A small ruby gemstone.";
  this.prefix = "a";
  this.valuable = 1;
}
RubyTile.prototype = new ItemObject();

function UncutRubyTile() {
  //Graphics Upgraded
	this.name = "UncutRuby";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "uncut ruby";
  this.longdesc = "A small uncut ruby gemstone.";
  this.prefix = "an";
  this.valuable = 1;
}
UncutRubyTile.prototype = new ItemObject();

function SmallSapphireTile() {
  //Graphics Upgraded
	this.name = "SmallSapphire";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "sapphire";
  this.prefix = "a";
  this.longdesc = "A small sapphire gemstone.";
  this.valuable = 1;
}
SmallSapphireTile.prototype = new ItemObject();

function UncutSapphireTile() {
  //Graphics Upgraded
	this.name = "UncutSapphire";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -24*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "smooth, uncut sapphire";
  this.prefix = "a";
  this.longdesc = "A smooth, uncut sapphire gemstone.";
  this.valuable = 1;
}
UncutSapphireTile.prototype = new ItemObject();

function GemsTile() {
  //Graphics Upgraded
	this.name = "Gems";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "handful of small gemstones";
  this.prefix = "a";
  this.longdesc = "A handful of small gemstones.";
  this.valuable = 1;
}
GemsTile.prototype = new ItemObject();

function UncutGemsTile() {
  //Graphics Upgraded
	this.name = "UncutGems";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "handful of small, uncut gemstones";
  this.prefix = "a";
  this.longdesc = "A handful of small uncut gemstones.";
  this.valuable = 1;
}
UncutGemsTile.prototype = new ItemObject();

function RubyGemoftheSunTile() {
  //Graphics Upgraded
	this.name = "RubyGemoftheSun";
  this.graphic = "static.png";
  this.spritexoffset = 0*32;
  this.spriteyoffset = -161*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "ruby gem of the sun";
  this.prefix = "the";
  this.longdesc = "Your ruby gem that harnesses the power of the sun.";
  this.usedesc = "Call upon the power of sunlight.";

  ManualAnimation.call(this, { animstart: 0,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });

}
RubyGemoftheSunTile.prototype = new ItemObject();

RubyGemoftheSunTile.prototype.use = function(who) {
  // do something
  // working here
  let retval = { fin: 1 };
  let themap = who.getHomeMap();
  if ((themap.getName() === "underworld") && (who.getx() === 96) && (who.gety() === 101)) {
    if (DU.gameflags.getFlag("bonebeacon")) {
      retval["txt"] = "You raise the ruby before you, but you cannot add to the light that already shines here.";
    } else {
      let sunmote = localFactory.createTile("SunBeacon");
      themap.placeThing(sunmote,96,101);
      DrawMainFrame("draw",themap,96,101);
      retval["txt"] = "You raise the ruby before you and focus your will upon it. You command it to let the sun into the underworld, and in this place you feel it pierce the veil above you, and now a beacon of sunlight dances above the hill.";
      let daemon = localFactory.createTile("ArchdaemonOfBone");
      themap.placeThing(daemon,91,105);
      DU.gameflags.setFlag("bonebeacon",1);
    }
  } else if ((themap.getName() === "underworld") && (who.getx() === 106) && (who.gety() === 76)) {
    if (DU.gameflags.getFlag("icebeacon")) {
      retval["txt"] = "You raise the ruby before you, but you cannot add to the light that already shines here.";
    } else {
      let sunmote = localFactory.createTile("SunBeacon");
      themap.placeThing(sunmote,106,76);
      DrawMainFrame("draw",themap,106,76);
      retval["txt"] = "You raise the ruby before you and focus your will upon it. You command it to let the sun into the underworld, and in this place you feel it pierce the veil above you, and now a beacon of sunlight dances above the hill.";
      let daemon = localFactory.createTile("ArchdaemonOfIce");
      themap.placeThing(daemon,104,70);
      DU.gameflags.setFlag("icebeacon",1);
    }
  } else if ((themap.getName() === "underworld") && (who.getx() === 57) && (who.gety() === 55)) {
    if (DU.gameflags.getFlag("dustbeacon")) {
      retval["txt"] = "You raise the ruby before you, but you cannot add to the light that already shines here.";
    } else {
      let sunmote = localFactory.createTile("SunBeacon");
      themap.placeThing(sunmote,57,55);
      DrawMainFrame("draw",themap,57,55);
      retval["txt"] = "You raise the ruby before you and focus your will upon it. You command it to let the sun into the underworld, and in this place you feel it pierce the veil above you, and now a beacon of sunlight dances above the hill.";
      let daemon = localFactory.createTile("ArchdaemonOfDust");
      themap.placeThing(daemon,63,55);
      DU.gameflags.setFlag("dustbeacon",1);
    }
  } else if ((themap.getName() === "underworld") && (who.getx() === 55) && (who.gety() === 85)) {
    if (DU.gameflags.getFlag("ashesbeacon")) {
      retval["txt"] = "You raise the ruby before you, but you cannot add to the light that already shines here.";
    } else {
      let sunmote = localFactory.createTile("SunBeacon");
      themap.placeThing(sunmote,55,85);
      DrawMainFrame("draw",themap,55,85);
      retval["txt"] = "You raise the ruby before you and focus your will upon it. You command it to let the sun into the underworld, and in this place you feel it pierce the veil above you, and now a beacon of sunlight dances above the hill.";
      let daemon = localFactory.createTile("ArchdaemonOfAshes");
      themap.placeThing(daemon,53,80);
      DU.gameflags.setFlag("ashesbeacon",1);
    }
  } else if ((themap.getName() === "uttermostdark") && (who.gety() > 27) && (who.getx() > 13)) {
    if (DU.gameflags.getFlag("music")) { DUPlayMusic("Despair", {fade:1}); }
    let uii = document.getElementById('uiinterface');
    if (uii) {
      uii.innerHTML = `<img src="graphics/spacer.gif" width="416" height="416" />`;
      uii.style.backgroundColor = "black";
      uii.style.opacity = 1;
      uii.style.backgroundImage = `url('graphics/splash/DemonGem-Part1.gif')`;  
    }
//    retval["txt"] = "You raise the ruby before you. The light that is usually within it seems hollow and wan, here in the heart of the dark.";
//    retval["input"] = "&gt;[MORE]";
    targetCursor.dark = 1;
    gamestate.setMode("endgame");
    retval["override"] = 1;
    retval["fin"] = 2;
    maintext.addText("Use: ruby gem of the sun<br />You raise the ruby before you. The light that is usually within it seems hollow and wan, here in the heart of the dark.");
    maintext.setInputLine("&gt;[MORE]");
    maintext.drawTextFrame();
  } else {
    retval["txt"] = "You raise the ruby before you, motes of sunlight glinting within its facets. You focus upon it and light blazes forth, illuminating every cranny, before fading back to the brightness it holds usually.";
    let light = localFactory.createTile("RubyLight");
    who.addSpellEffect(light);
  }
  return retval;
}

function GetNumberBeacons() {
  let num = 0;
  if (DU.gameflags.getFlag("ashesbeacon")) { num++; }
  if (DU.gameflags.getFlag("dustbeacon")) { num++; }
  if (DU.gameflags.getFlag("icebeacon")) { num++; }
  if (DU.gameflags.getFlag("bonebeacon")) { num++; }

  return num;
}

function DecorativeArmorTile() {
	this.name = "DecorativeArmor";
	this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -71*32;
	this.desc = "suit of armor";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "a suit of purely decorative armor. It would not actually provide protection.";
  this.enchantable = 1;
}
DecorativeArmorTile.prototype = new ItemObject();

function AlchemyCrateTile() {
  // Graphics Upgraded
  this.name = "AlchemyCrate";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -79*32;
	this.desc = "crate full of flasks, tools, and notes";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.addType("Quest");
  this.prefix = "a";
  this.longdesc = "A crate full of flasks, tools, and notes, left behind in a cave.";
}
AlchemyCrateTile.prototype = new ItemObject();

function FluteTile() {
  //Graphics Upgraded
  this.name = "Flute";
	this.graphic = "static.png";
	this.spritexoffset = -6*32;
  this.spriteyoffset = -36*32;
	this.desc = "flute";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A flute.";
}
FluteTile.prototype = new ItemObject();

function DrumTile() {
  //Graphics Upgraded
  this.name = "Drum";
	this.graphic = "static.png";
	this.spritexoffset = -4*32;
  this.spriteyoffset = -36*32;
	this.desc = "drum";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A drum.";
}
DrumTile.prototype = new ItemObject();

function LyreTile() {
  //Graphics Upgraded
  this.name = "Lyre";
	this.graphic = "static.png";
	this.spritexoffset = -5*32;
  this.spriteyoffset = -36*32;
	this.desc = "lyre";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A lyre.";
}
LyreTile.prototype = new ItemObject();

function LuteTile() {
  //Graphics Upgraded
  this.name = "Lute";
	this.graphic = "static.png";
	this.spritexoffset = -7*32;
  this.spriteyoffset = -36*32;
	this.desc = "lute";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A lute.";
}
LuteTile.prototype = new ItemObject();

function HornTile() {
  //Graphics Upgraded
  this.name = "Horn";
	this.graphic = "static.png";
	this.spritexoffset = -8*32;
  this.spriteyoffset = -36*32;
	this.desc = "horn";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A horn.";
}
HornTile.prototype = new ItemObject();

function MortarTile() {
  //Graphics Upgraded
  this.name = "Mortar";
  this.graphic = "static.png";
	this.spritexoffset = 0;
  this.spriteyoffset = -36*32;
	this.desc = "mortar and pestle";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A mortar and pestle. Useful in alchemy.";
}
MortarTile.prototype = new ItemObject();

function AppleTile() {
  this.name = "Apple";
  this.graphic = "static.png";
	this.spritexoffset = 0;
  this.spriteyoffset = -26*32;
	this.desc = "apple";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "an";
  this.longdesc = "An apple. Delicious.";
  this.usedesc = "Eat the apple, or offer it to someone.";
}
AppleTile.prototype = new ItemObject();

AppleTile.prototype.use = function(who) { 
  // working here- needs option to offer it to horses
  let retval = {};
  retval["fin"] = 1;
  if (who === PC) {
    retval["txt"] = "You crunch into the apple. It's delicious!";
  }
  who.setHP(Math.min(who.getMaxHP(), who.getHP()+1));
  return retval;
}

function CrystalMortarTile() {
  //Graphics Upgraded
  this.name = "CrystalMortar";
	this.graphic = "static.png";
	this.spritexoffset = -2*32;
  this.spriteyoffset = -36*32;
	this.desc = "crystal mortar";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A mortar made of crystal. Strong enough to mix the most powerful of magics.";
}
CrystalMortarTile.prototype = new ItemObject();

function GoldLocketTile() {
  //Graphics Upgraded
  this.name = "GoldLocket";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -35*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "gold locket";
  this.longdesc = "A locket. Inside is a portrait of an unfamiliar woman.";
}
GoldLocketTile.prototype = new ItemObject();

GoldLocketTile.prototype.onGet = function(who) {
  if (DU.gameflags.getFlag("knows_severyn")) {
    this.longdesc = "A locket. Inside is a portrait of someone you believe is Severyn, from Swainhil.";
    let retval = {};
    retval["txt"] = "There is a portrait in the locket, and you believe you recognize the subject. It looks like Severyn, from Swainhil..."
    return retval;
  }

  return {};
}

function StolenJewelryTile() {
  //Graphic Upgraded
  this.name = "StolenJewelry";
  this.graphic = "static.png";
  this.spriteyoffset = -9*32;
  this.spritexoffset = -98*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stolen jewelry";
  this.longdesc = "A small collection of jewelry, stolen from someone.";
}
StolenJewelryTile.prototype = new ItemObject();

StolenJewelryTile.prototype.onGet = function(who) {
  DU.gameflags.setFlag("stolenjewelry_taken",1);

  return {};
}

function SilverBridleTile() {
  this.name = "SilverBridle";
  this.graphic = "master_spritesheet.png";
  this.spriteyoffset = -9*32;
  this.spritexoffset = -98*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a"
  this.desc = "silver bridle";
  this.longdesc = "A horse's bridle, with highlights of beautiful silver.";
}
SilverBridleTile.prototype = new ItemObject();

function AltarOfAshesTile() {
	this.name = "AltarOfAshes";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -77*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "mottled white and dark altar";
	this.peerview = "white";
}
AltarOfAshesTile.prototype = new FeatureObject();

AltarOfAshesTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "You realize that the altar itself is pure white, but coated in a thick layer of ash, which resists any attempts to wipe away. On top, obscured by the ash, there is a slot into which something could be inserted.";
  retval["input"] = "&gt;";
}

function AltarOfIceTile() {
	this.name = "AltarOfIce";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -77*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "iridescent altar";
	this.peerview = "white";
}
AltarOfIceTile.prototype = new FeatureObject();

AltarOfIceTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "As you approach the altar you are assailed by a bitter cold. Light glistens strangely off the icy surface, on which you see a slot into which something could be inserted.";
  retval["input"] = "&gt;";
}

function AltarOfBoneTile() {
	this.name = "AltarOfBone";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -77*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "altar of pure white, made of many small angular pieces";
	this.peerview = "white";
}
AltarOfBoneTile.prototype = new FeatureObject();

AltarOfBoneTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "On closer inspection, you realize that this altar is made up of hundreds of clean bones. On the top, you see a slot into which something could be inserted.";
  retval["input"] = "&gt;";
}

function AltarOfDustTile() {
	this.name = "AltarOfDust";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -77*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "grey altar, covered with a coating of dust";
	this.peerview = "white";
}
AltarOfDustTile.prototype = new FeatureObject();

AltarOfDustTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "You sweep your hand across the top, but even as you cast dust off to the side, some always seems to remain. You do see, however, a slot in the top surface, into which something could be inserted.";
  retval["input"] = "&gt;";
}

function GoldTile() {
  //Graphics Upgraded
  this.name = "Gold";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -35*32;
  this.desc = "1 gold coin";
  this.quantity = 1;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "";
  this.longdesc = "Gold coins. May be exchanged for goods and services.";
}
GoldTile.prototype = new ItemObject();

GoldTile.prototype.setQuantity = function(quant) {
  let newquant = parseInt(quant);
  if (newquant === quant) {
    this.quantity = quant;
    if (quant === 1) { this.setDesc("1 gold coin"); }
    else { this.setDesc(quant + " gold coins"); }
  } else {
    return 0;
  }
  if ((this.quantity > 0) && (this.quantity < 7)) {
    this.graphic = "static.png";
    this.spritexoffset = -5*32;
    this.spriteyoffset = -35*32;
  }
  else if ((this.quantity > 6) && (this.quantity < 16)) {
    this.graphic = "static.png";
    this.spritexoffset = -6*32;
    this.spriteyoffset = -35*32;
  } else if (this.quantity > 15) {
    this.graphic = "static.png";
    this.spritexoffset = -7*32;
    this.spriteyoffset = -35*32;
  }
  return this.quantity;
}

GoldTile.prototype.onGet = function(who) {
  who.addGold(parseInt(this.getQuantity())); 
  DUPlaySound("sfx_coin");
  let goldx = this.getx();
  let goldy = this.gety();
  this.getHomeMap().deleteThing(this);
  DrawMainFrame("one",who.getHomeMap(),goldx,goldy);

  let retval = {};
  retval.noTake = 1;
  retval.txt = "Taken: " + this.getPrefix() + " " + this.getDesc() + ".";
  return retval;
  // this should delete the item entirely
}

function KeyItemObject() {
  this.addType("Key");
}
KeyItemObject.prototype = new ItemObject();

KeyItemObject.prototype.use = function(who) {
  gamestate.setMode("choosedir");
  let retval={};
  retval["override"] = 1;
  retval["fin"] = 4;
  retval["input"] = "&gt; Choose direction-";
  if (who === PC) {
    DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
  }
  targetCursor.command = "uk";
  targetCursor.useditem = this;
  return retval;
}

function KeyUse(who,what,tgt) {
  let retval= {};
  if (!tgt) {
    let locktile = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
    tgt = locktile.getTopFeature();
  }
  if (!tgt) {
    retval["fin"] = 0;
    retval["txt"] = "Use: " + what.getDesc() + "- Nothing there.";
    retval["input"] = "&gt;";
  } else {
    if (tgt.getLocked && (typeof tgt.getLocked === "function")) {
      if (tgt.keyname === what.getName()) {
        if (tgt.getLocked()) { 
          tgt.unlockMe(); 
          DrawMainFrame("one",tgt.getHomeMap(),tgt.getx(),tgt.gety());
        }
        else { 
          tgt.lockMe(1);
          DrawMainFrame("one",tgt.getHomeMap(),tgt.getx(),tgt.gety());
        }
        retval["fin"] = 1;
        retval["txt"] = "Use " + what.getDesc() + "- Click!";
        retval["input"] = "&gt;";
        DUPlaySound("sfx_open_lock");
      } else {
        retval["fin"] = 0;
        retval["txt"] = "Use " + what.getDesc() + "- Your key doesn't fit the lock.";
        retval["input"] = "&gt;";
        DUPlaySound("sfx_locked_door");
      }
    } else {
      retval["fin"] = 0;
      retval["txt"] = "Use: " + what.getDesc() + "- That is not locked.";
      retval["input"] = "&gt;";
    }
  }
  return retval;
}

function HomeKeyTile() {
  //Graphics Upgraded
  this.name = "HomeKey";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "your housekey";
  this.longdesc = "The key to your manor in West Naurglen.";
  this.usedesc = "Unlocks your front door.";
}
HomeKeyTile.prototype = new KeyItemObject();

function PaladinKeyTile() {
  this.name = "PaladinKey";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-1280";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "the";
  this.desc = "key to the Paladin tower";
  this.longdesc = "The key to the Paladin's tower in Swainhil.";
  this.usedesc = "Unlocks the doors to the Paladin tower.";
}
PaladinKeyTile.prototype = new KeyItemObject();

function ToshinKeyTile() {
  //Graphics Upgraded
  this.name = "ToshinKey";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "the";
  this.desc = "key to Toshin's Tower";
  this.longdesc = "A key found in a fireplace in Toshin's Tower.";
  this.usedesc = "Unlocks doors in Toshin's Tower.";
}
ToshinKeyTile.prototype = new KeyItemObject();

function PitOfDespairKeyTile() {
  //Graphics Upgraded
  this.name = "PitOfDespairKey";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Pit of Despair dungeon key";
  this.prefix = "the";
  this.longdesc = "The key to many doors in the Pit of Despair.";
  this.usedesc = "Unlocks doors in the Pit of Despair.";
}
PitOfDespairKeyTile.prototype = new KeyItemObject();

function InnerPitOfDespairKeyTile() {
  //Graphics Upgraded
  this.name = "InnerPitOfDespairKey";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "buzzing key";
  this.prefix = "a";
  this.longdesc = "A key found in the Pit of Despair.";
  this.usedesc = "Presumably opens a matching door.";
}
InnerPitOfDespairKeyTile.prototype = new KeyItemObject();

function KeyOfSpiritsTile() {   // Not currently used?
  //Graphics Upgraded
  this.name = "KeyOfSpirits";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Spirits";
  this.prefix = "the";
  this.longdesc = "The Key of Spirits.";
  this.usedesc = "Perhaps you'll find a lock it fits...";
}
KeyOfSpiritsTile.prototype = new KeyItemObject();

function RoyalKeyTile() {
  //Graphics Upgraded
  this.name = "RoyalKey";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Royal Key";
  this.prefix = "the";
  this.longdesc = "The Royal Key.";
  this.usedesc = "Opens locked doors in Castle dea'Saryn.";
}
RoyalKeyTile.prototype = new KeyItemObject();  

function BlackDragonKeyTile() {
  //Graphics Upgraded
  this.name = "BlackDragonKey";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Black Dragon Key";
  this.prefix = "the";
  this.longdesc = "The Black Dragon Key.";
  this.usedesc = "Opens locked doors in Black Dragon Castle.";
}
BlackDragonKeyTile.prototype = new KeyItemObject();  

function KeyOfSunTile() {
  //Graphics Upgraded
  this.name = "KeyOfSun";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of the Sun";
  this.prefix = "the";
  this.longdesc = "The Key of the Sun.";
  this.usedesc = "Unknown.";
}
KeyOfSunTile.prototype = new KeyItemObject();  

function StoneOfShadowTile() {
  //Graphics Upgraded
  this.name = "StoneOfShadow";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Stone of Shadow";
  this.prefix = "the";
  this.longdesc = "The Stone of Shadow.";
  this.usedesc = "Unknown.";
}
StoneOfShadowTile.prototype = new KeyItemObject();  

StoneOfShadowTile.prototype.onGet = function() {
  if (DU.gameflags.getFlag("stoneshadow")) { 
    this.usedesc = "If used in the right place, this will allow you entrance to the warded castle."
  }

  return {};
}

StoneOfShadowTile.prototype.use = function(who) {
  let retval = {};
  if ((who.getHomeMap().getName() !== "tharock_castle") && (who.getHomeMap().getName() !== "tharock_castle_shadow")) {
    retval["fin"] = 1;
    retval["txt"] = "Nothing happens when you try to use that here.";
    return retval;  
  } else if (who.getHomeMap().getName() === "tharock_castle") {
    if ((who.getx() >= 15) && (who.getx() <= 17) && (who.gety() >= 53) && (who.gety() <= 55)) {
      retval = this.swap(who);
    } else if ((who.getx() >= 37) && (who.getx() <= 39) && (who.gety() >= 41) && (who.gety() <= 43)) {
      retval = this.swap(who);
    } else {
      retval["fin"] = 1;
      retval["txt"] = "Nothing happens when you try to use that here.";
      return retval;  
    }
  } else { // in tharock_castle_shadow
    if ((who.getx() >= 15) && (who.getx() <= 17) && (who.gety() >= 53) && (who.gety() <= 55)) {
      retval = this.swap(who);
    } else if ((who.getx() >= 37) && (who.getx() <= 39) && (who.gety() >= 41) && (who.gety() <= 43)) {
      retval = this.swap(who);
    } else {
      retval["fin"] = 1;
      retval["txt"] = "Nothing happens when you try to use that here.";
      return retval;  
    }
  }
  return retval;
}

StoneOfShadowTile.prototype.swap = function(who) {
  let retval = {fin:2,override:-1};  // I think?
  maintext.addText("You touch the Stone of Shadow to the strange altar...");
  maintext.setInputLine("&gt;");
  maintext.drawTextFrame();
  let destmap = "tharock_castle_shadow";
  let destsong = "Shadows";
  if (who.getHomeMap().getName() === "tharock_castle_shadow") {
    destmap = "tharock_castle";
    destsong = "Lost Hope";
  }
  let dmap;
  if (maps.getMap(destmap)) {
    dmap = maps.getMap(destmap);
  } else {
    dmap = maps.addMap(destmap);
    // though, it should already be in memory
  }
  let currtime;
  if (nowplaying.song) {
    if (!nowplaying.song.ended) {
      currtime = nowplaying.song.currentTime;
    }
    nowplaying.song.pause();
  }
  DUPlaySound("sfx_dark_transition");
  gamestate.setMode("null");
  setTimeout(function() {
    MoveBetweenMaps(who,who.getHomeMap(),dmap,who.getx(),who.gety());
    DrawMainFrame("draw",dmap,who.getx(),who.gety());
    DUPlayMusic(destsong,{startat: currtime});
    maintext.addText("The world shifts around you!");
    who.endTurn();
  }, 5000);
  
  return retval;
}

// Books/Journals
function BookItemObject() {
  this.contents = "";
  this.addType("Book");
  this.usedesc = "Read it.";
}
BookItemObject.prototype = new ItemObject();

BookItemObject.prototype.use = function(who) {
  DUPlaySound("sfx_paper");
  let bookcontents = this.contents.split("%%");
  let retval = {};
  if (bookcontents) {
    retval["txt"] = "Use: " + this.getDesc() + "<br /> Reading...<br />" + bookcontents.shift();
    if (bookcontents.length > 0) {
      retval["override"] = 1;
	  	let usedname = this.getDesc();
		  usedname = usedname.replace(/^a /, "");
      
      retval["fin"] = 3;
      targetCursor.booktext = bookcontents;
    } else {
      retval["fin"] = 1;
      DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
    }
  }
  return retval;
}

function PerformRead() {
  var retval = {};
  retval["txt"] = targetCursor.booktext.shift();
  if (targetCursor.booktext.length > 0) {
    retval["fin"] = 0;
    return retval;
  } else {
    if (targetCursor.bookfinish) {
      targetCursor.useditem.bookFinish();
    } 
    retval["fin"] = 1;
    return retval;
  }
}

function SheafOfNotesTile() {
  //Graphics Upgraded 
  this.name = "SheafOfNotes";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -100*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "sheaf of notes";
  this.prefix = "a";
  this.contents = "You read the notes:%%<span class='conv'>'Empowerment is a powerful tool, allowing the permanent enchantment of an object such as a sword or suit of armor.</span>%%<span class='conv'>'The first step in Empowering is choosing a suitable object. It must be able to take on the enchantment- this is rare.</span>%%<span class='conv'>'Then one must prepare the reagents. Your choice of reagents will dictate the nature of the enchantment that you create.</span>%%<span class='conv'>'Prepare them with a mortar and pestle, incant the spell, and pour the mixture over the object to be enchanted. If all is as it should be, the object will be enchanted thereafter.</span>%%<span class='conv'>'I have tested many materials.</span>%%<span class='conv'>'Spider silk is necessary in almost all castings. It helps bind the magic to the object.</span>%%<span class='conv'>'Sulphurous ash is used for light and fire.</span>%%<span class='conv'>'Blood moss permits physical protection.</span>%%<span class='conv'>'Nightshade adds an air of poison or delusion.</span>%%<span class='conv'>'Black pearl projects power from the object.</span>%%<span class='conv'>'Mistletoe will ward away otherworldly evils.</span>%%<span class='conv'>'Lightning wood, from a tree recently struck, will channel the lightnings.</span>%%<span class='conv'>'Finally, additional power may be invoked by adding mandrake root.</span>%%<span class='conv'>'Once together, cast and hope.'</span>";
  this.longdesc = "A sheaf of notes on Empowerment. Transcribed by Arlan from Toshin's original notebooks.";
}
SheafOfNotesTile.prototype = new BookItemObject();

function XoriccoRecipeTile() {
  //Graphics Upgraded 
  this.name = "XoriccoRecipe";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -100*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "recipe";
  this.prefix = "a";
  this.contents = "You read the recipe:%%Insert recipe here.";  // WORKING HERE- Need a recipe
  this.longdesc = "Evidently, this is Sorceress Xoricco's recipe for chili.";
}
XoriccoRecipeTile.prototype = new BookItemObject();

function ClearLakeReportTile() {
  //Graphics Upgraded 
  this.name = "ClearLakeReport";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -100*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "report from Clear Lake";
  this.prefix = "the";
  this.contents = "You glance through the report, but your eyes quickly glaze over.";
  this.longdesc = "The report from the mayor of Clear Lake. To be brought to the Chancellor when you have all three reports.";
}
ClearLakeReportTile.prototype = new BookItemObject();

function BeldskaeReportTile() {
  //Graphics Upgraded 
  this.name = "BeldskaeReport";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -100*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "report from Beldskae";
  this.prefix = "the";
  this.contents = "You glance through the report, but your eyes quickly glaze over.";
  this.longdesc = "The report from the mayor of Beldskae. To be brought to the Chancellor when you have all three reports.";
}
BeldskaeReportTile.prototype = new BookItemObject();

function SwainhilReportTile() {
  //Graphics Upgraded 
  this.name = "SwainhilReport";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -100*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "report from Swainhil";
  this.prefix = "the";
  this.contents = "You glance through the report, but your eyes quickly glaze over.";
  this.longdesc = "The report from the mayor of Swainhil. To be brought to the Chancellor when you have all three reports.";
}
SwainhilReportTile.prototype = new BookItemObject();

function FallOfTargrionTile() {
  //Graphics Upgraded
  this.name = "FallOfTargrion";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = 'A book named "Fall of Targrion"';
  this.prefix = "The";
  this.contents = `You open to a random page:%%<span class='conv'>Targrion blazed, and fields became deserts and mountains cracked. "You challenge the supremacy of the sun? Do you not see that my fire is unchallenged, my light gives life?"</span>%%<span class='conv'>But Luhgon shook his fire-crested head. "The sun will gaze down in its majesty for all eternity, and I do not dispute the truth of your words. I only dispute your right to say them. Your mantle I will take, and the greatest light of the sky shall be mine to raise and draw down."</span>%%<span class='conv'>And Targrion was uncertain, for the coming of this upstart was foretold; but so, too, was their battle. "It may be destined that I fall," roared Targrion, "but I shall strive to stand athwart of this destiny. Come, and burn!"</span>`;
  this.longdesc = "The Fall of Targrion. A story of old myth. Sought by Olivia.";
}
FallOfTargrionTile.prototype = new BookItemObject();

FallOfTargrionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("olivia_asked")) {
    return this.longdesc;
  } else {
    return "The Fall of Targrion. A story of old myth.";
  }
}

function BookOfLoreTile() {
  //Graphics Upgraded
  this.name = "BookOfLore";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = 'A book named "Book of Lore"';
  this.prefix = "the";
  this.contents = "You open to a random page:%%<span class='conv'>Look up. Above you are the stars, embedded in the ether, which is the power of magic.</span>%%<span class='conv'>The ether is shaped by the will of the mage, who shapes it with mana. This is primarily done with the application of spells. But, it is possible to shape the ether directly- the monstrous Gazer, for example, does not cast a spell each morning to float above the earth.</span>%%<span class='conv'>When did we learn magic? Who crafted the first spells? This knowledge is lost, but it is said it began with the fall of a star...</span>";
  this.longdesc = "The Book of Lore. Its simple cover belies its rich contents. Sought by Arlan.";
}
BookOfLoreTile.prototype = new BookItemObject();

function EshkazBookTile() {
  //Graphics Upgraded
  this.name = "EshkazBook";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -38*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Eshkaz's Planar Primer";
  this.prefix = "the";
  this.contents = "You open to the book:%%The words within dance under your sight, and you cannot make sense of their meaning.";
  this.longdesc = "Eshkaz's Planar Primer. Contains his research into planar travel, to be brought to Asharden.";
}
EshkazBookTile.prototype = new BookItemObject();

function TomeOfSightTile() {
  //Graphics Upgraded
  this.name = "TomeOfSight";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = 'A book named "Tome of Sight"';
  this.prefix = "the";
  this.contents = "You open to a random page:%%<span class='conv'>...for the Eye of Man can be deceived, but the Eye of Magic is Immutable.</span>%%<span class='conv'>Mortals all live in the fog of illusion and unseeing, but the talent of seeing the truth below need not be the sole providence of the gods.</span>%%<span class='conv'>We toil in darkness, but with their fire may we be forged anew...</span>";
  this.longdesc = "The Tome of Sight. The leather cover is decorated with eye motifs.";
}
TomeOfSightTile.prototype = new BookItemObject();

function MapsAndLegendsTile() {
  //Graphics Upgraded
  this.name = "MapsAndLegends";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = 'A book named "Maps and Legends"';
  this.prefix = "";
  this.contents = "You flip through the pages and find a chapter on magical phenomenon.%%Searching, you find the section you seek:%%<span class='conv'>\"The Brilliant Pool\"</span>%%<span class='conv'>Once, this mythical place was considered the source of all magic.</span>%%<span class='conv'>Now, it is known that magic's power is drawn from the ethereal plane, and it is not known whether the Brilliant Pool ever truly existed, or still exists.</span>%%<span class='conv'>Another story has it that it is a star, misplaced on our plane, its power too great for any mortal to harness directly.</span>%%Seeing nothing more of use, you close the book.";
  this.longdesc = "The book <i>Maps and Legends</i>. Within are described many rumored and legendary phenomenon.";
}
MapsAndLegendsTile.prototype = new BookItemObject();

function ATreatiseOnDragonsTile() {
  //Graphics Upgraded
  this.name = "ATreatiseOnDragons";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -38*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = 'A book named "A Treatise On Dragons"';
  this.prefix = "";
  this.contents = "You open the book.%%<span class='conv'>A dragon is a mighty reptile with great magical and physical power. Its destructive power is so great that it is hardly a surprise that it came to be associated with Tethlokel the Destroyer.</span>%%<span class='conv'>The average dragon is roughly 60 feet long, breathes fire hot enough to easily set wooden buildings aflame, and can fly for hours without rest.</span>%%<span class='conv'>They prefer to live in caves in high mountains far from civilization, and so are infrequently seen.</span>%%<span class='conv'>Rarely, a dragon may grow to become an Elder. Elder Dragons are thought to have better than human intelligence and incredible magical power, allowing them to make plans that span decades.</span>%%<span class='conv'>It is fortunate that they are so rare, as they are evil of bent and desire power and conquest.</span>%%The book is long, but you feel like you have gotten the gist. You close the book.";
  this.longdesc = "The book <i>A Treatise on Dragons</i>. A summary of facts known, rumored, and debated about dragons and dragonkind.";
}
ATreatiseOnDragonsTile.prototype = new BookItemObject();

function AWarningOnDaemonsTile() {
  //Graphics Upgraded
  this.name = "AWarningOnDaemons";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = 'A book named "A Warning On Daemons"';
  this.prefix = "";
  this.contents = "You open the book.%%<span class='conv'>Little is known for certain about the class of entities we call \"daemons\". But some things are known.</span>%%<span class='conv'>One: they are powerful. Two: They are evil, and seem to be as part of their inherent nature. Three: They are not native to this world.</span>%%<span class='conv'>The place from which they hail is commonly called Hell by the unsophisticated. It is unknown whether it existed before our own world was born, or if they came into being together.</span>%%<span class='conv'>Daemons in the world are rare, and the result of an unwise wizard's magic. These wizards are sometimes seduced by offers of power.</span>%%The book is long, but you feel like you have gotten the gist. You close the book.";
  this.longdesc = "The book <i>A Warning On Daemons</i>. A text about daemons, elucidating what is known and what is rumoured.";
}
AWarningOnDaemonsTile.prototype = new BookItemObject();

function WhatIsMagicTile() {
  //Graphics Upgraded
  this.name = "WhatIsMagic";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = 'A thin book named "What Is Magic?"';
  this.prefix = "";
  this.contents = "You open the book.%%<span class='conv'>What is magic? Magic is all around us. As you live, you are constantly making magic in small ways.</span>%%<span class='conv'>Some rare people can use magic directly. These people are called \"Wizards\".</span>%%<span class='conv'>By speaking the right magic words, moving their hands in the right gestures, and thinking really hard, they can do what is called \"cast spells\"- making a small glowing ball of light, or a giant flying ball of fire.</span>%%You come to realize that the book was not written for readers of your age. You close the book.";
  this.longdesc = "The book <i>What Is Magic?</i>. The book is quite thin and appears to be aimed at children.";
}
WhatIsMagicTile.prototype = new BookItemObject();


function NatassaJournalTile() {
  //Graphics Upgraded
  this.name = "NatassaJournal";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You search through the journal for something useful.%%<span class='conv'>With the passing of Master Xoricco, I find myself maintaining two homes.</span>%%<span class='conv'>My Spire will continue to be my primary sanctuary, but the Palace of the Skies is too great an achievement to let fall.</span>%%<span class='conv'>There are two ways to get to the Palace. My way is the Way of the Sky- magics taught to me by Xoricco and known by no others.</span>%%<span class='conv'>But there is another way- the Way of Earth. Certain persons who have shown exceptional loyalty, to both the kings and the land, are granted the Rune of Kings.</span>%%<span class='conv'>If you are reading this, Adelus, I believe King Erik will be willing to grant you that honor- you've certainly done enough.</span>%%<span class='conv'>Invoke the Mark of Kings at the crook of the Dragon's elbow, and take the Road of Earth.<span>";
  this.longdesc = "The Journals of Natassa.";
}
NatassaJournalTile.prototype = new BookItemObject();

function NatassaResearchTile() {
  //Graphics Upgraded
  this.name = "NatassaResearch";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You flip through the notes.%%<span class='conv'>7-23-86: The Brilliant Pool is the subject of so many legends, yet I am convinced it exists. What's more- I believe my master knows more about it than she lets on. I must discover what she knows!</span>%%<span class='conv'>3-27-92: Her journals speak of many magical experiments but are silent on the Pool. And yet I remain convinced she not only knew of it but has utilized it herself.<span>%%<span class='conv'>10-3-103: I believe it to reside in the dungeon of World's Ending. I have cleared out the foul creatures that reside near the surface and may even build here. The solitude appeals.</span>%%<span class='conv'>3-16-104: It is not here. I have scoured the place, even down to the Underworld below. I detect no sign. It is not here.</span>%%<span class='conv'>9-3-105: THE POOL MOVES. It was once here, yes, but no longer. It could be ANYWHERE. I may have tried to cause a local volcano to erupt in my fury, but I refrained.</span>";
  this.longdesc = "Natassa's Research Notes, Vol 1.";
}
NatassaResearchTile.prototype = new BookItemObject();

function NatassaResearch2Tile() {
  //Graphics Upgraded
  this.name = "NatassaResearch2";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You flip through the notes.%%<span class='conv'>7-4-107: I continue to research the Pool alongside my other research. While recreating Xoricco's Wind Change spell was satisfying, there are other goals. Perhaps I should consult the oracle.</span>%%<span class='conv'>11-21-107: The underworld is even more dangerous than I had considered. I reached the Oracle- blessings upon Xoricco's research that revealed it to me! But was unable to obtain a full answer before I was forced to flee to the surface. I will work on the riddles.</span>%%<span class='conv'>4-15-109: Wind Change is not enough. King Erik has called upon me to try to recreate Xoricco's magics that made sea travel possible. The storms are too great to be uncreated just by temporarily stilling their winds. The Pool can wait.</span>%%<span class='conv'>10-19-113: Toshin is seeking the Pool. I must find it first- she cannot be permitted to draw upon its powers. She could be a second Tharock.</span>%%<span class='conv'>1-9-114: I have narrowed it down- the Pool has strong magic but it hides itself. But the Oracle taught me how to find the secondary resonances, and it is either underneath the city of Onyx, in the ruins under old Hildendain, or in the dungeon of Mt Drash.</span>%%<span class='conv'>3-21-114: I fear she has found it. I must confront her. I do not yet know what you need to do, or utilize, to use the Pool, but I can't assume she doesn't know either...</span>";
  this.longdesc = "Natassa's Research Notes, Vol 2.";
}
NatassaResearch2Tile.prototype = new BookItemObject();

function NatassaResearch3Tile() {
  //Graphics Upgraded
  this.name = "NatassaResearch3";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "collection of notes";
  this.prefix = "a";
  this.contents = "You closely read the notes.%%<span class='conv'>8-3-101: I've had a dream several times in the past month. A hand, holding a piece of the sun.</span>%%<span class='conv'>11-21-107: The underworld is even more dangerous than I had considered. I reached the Oracle- blessings upon Xoricco's research that revealed it to me! But was unable to obtain a full answer before I was forced to flee to the surface. I will work on the riddles.</span>%%<span class='conv'>4-15-109: Wind Change is not enough. King Erik has called upon me to try to recreate Xoricco's magics that made sea travel possible. The storms are too great to be uncreated just by temporarily stilling their winds. The Pool can wait.</span>%%<span class='conv'>10-19-113: Toshin is seeking the Pool. I must find it first- she cannot be permitted to draw upon its powers. She could be a second Tharock.</span>%%<span class='conv'>1-9-114: I have narrowed it down- the Pool has strong magic but it hides itself. But the Oracle taught me how to find the secondary resonances, and it is either underneath the city of Onyx, in the ruins under old Hildendain, or in the dungeon of Mt Drash.</span>%%<span class='conv'>3-21-114: I fear she has found it. I must confront her.</span>";
  this.longdesc = "Natassa's Research Notes, Project Sunlight";
}
NatassaResearch3Tile.prototype = new BookItemObject();

function ToshinJournalTile() {
  //Graphics Upgraded
  this.name = "ToshinJournal";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You search through the journal for something useful.%%<span class='conv'>It is somewhere... I can taste it. It is close. The bones of Ellusus sing with it, the unblinking eye of a star.</span>%%<span class='conv'>But there is something I need before I can use the Pool safely, even once I find it. Old scrolls call it an Infinite Scroll. I do not know how to make one... yet. But some are said to still exist. I will inquire of the black market.</span>%%<span class='conv'>There is a guild of thieves in Onyx, and they often have knowledge of such things, but almost certainly they will tell me that there is only one place to find things of such value: Beldskae.</span>";
  this.longdesc = "The Journals of Toshin.";
}
ToshinJournalTile.prototype = new BookItemObject();

function ArcheoJournalTile() {
  //Graphics Upgraded
  this.name = "ArcheoJournal";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -38*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You open the journal.%%<span class='conv'>Crossed to the small island at a time when the sea serpent was asleep. We investigated the strange crevasse leading deep into the earth, and returned with a ladder to allow us to explore below.</span>%%<span class='conv'>Below, what we found was astonishing. Buildings- a small outpost, it seemed- that look to be thousands of years old. They may predate the existence of humans! What could have built such a thing?</span>%%<span class='conv'>We need to bring more people and more gear back to look into this further. We are getting ready to cross the water. I think the serpent is asleep again.</span>";
  this.longdesc = "A small journal found in a cave.";
}
ArcheoJournalTile.prototype = new BookItemObject();

function RuinsJournalTile() {
  //Graphics Upgraded
  this.name = "RuinsJournal";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -97*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You open the journal.%%<span class='conv'>I fear we are beyond help. I write this down just to get the story out of my head-perhaps someday, someone will see it.</span>%%<span class='conv'>Our boat arrived here, with a crew of three dozen-an island of supremely fertile land, uncertainly attached to a volcano that we very much hoped Terrance was correct that it was dormant.</span>%%<span class='conv'>Terrance, our weather adept, enabled us to cross the ocean, and then built our side of the Gateway back to the duchy. As soon as it was open, half of our people returned there, and were replaced with a score of new settlers, bringing building materials.</span>%%<span class='conv'>As we built, we began to hear rumors of The Devourer. A huge beast with a dozen heads that would roam the island at night. One of our bravest soldiers went forth with her magic weapon to try to destroy it, and never returned.</span>%%<span class='conv'>We built, and we prepared to plant, when one day, two weeks ago, the portal just… closed. Disappeared. We are trapped, 30 people in a half-built village, no way to get more supplies, no way to go home.</span>%%<span class='conv'>We will never know what happened. To whomever is reading this, I don’t know how you found it, but this is our tale. Remember us.</span>";
  this.longdesc = "A small bound book found in a chest in Skara Brae.";
}
RuinsJournalTile.prototype = new BookItemObject();

function AdelusLetterTile() {
  //Graphics Upgraded 
  this.name = "AdelusLetter";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "letter";
  this.prefix = "a";
  this.contents = "<span class='conv'>Dearest Adelus,</span>%%<span class='conv'>Please visit when you can. I will admit that I have made the way difficult, for I do not wish other visitors, so let these instructions lay out a map for you.</span>%%<span class='conv'>When you enter World's Ending, you must create the sunset, and then walk with the light at your back. Close your eyes, and the wall will let you pass.</span>%%<span class='conv'>In the next chamber, go through the hallways in this order: far right, near right, mid left.</span>%%<span class='conv'>This will bring you to me. And once you are here...</span>%%...The rest of the letter is embarrassingly personal. You put it away.";
  this.longdesc = "A letter from Natassa to Adelus the bard.";
}
AdelusLetterTile.prototype = new BookItemObject();

function StephaneNoteTile() {
  this.name = "StephaneNote";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "letter";
  this.prefix = "a";
  this.contents = "<span class='conv'>I lie here, grievously wounded. I fear that I am not going to make it.</span>%%<span class='conv'>To whomever finds this note: please, I beg you, tell my brother my fate... assuming you do not share it. </span>%%<span class='conv'>His name is Ian, and he lives in Swainhil. You have my thanks in advance, stranger. I am sorry to ask this of you... but not as sorry as I am that I cannot do it myself.</span>%%There is a trailing of ink after this point, but no further writing.";
  this.longdesc = "A note found near a corpse in World's Ending.";
}
StephaneNoteTile.prototype = new BookItemObject();

function RhysLetterTile() {
  this.name = "RhysLetter";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "letter";
  this.prefix = "a";
  this.contents = "<span class='conv'>Lance, my friend!</span>%%<span class='conv'>I've been talking with Justice, and we think you should get out of that castle and into the world a bit. Let's get the old party together. Justice can train you while we are on the road. Who knows, maybe we'll kill a dragon!</span>%%<span class='conv'>Hope to see you soon- Rhys</span>";
  this.longdesc = "A letter to Prince Lance from his friend Rhys.";
}
RhysLetterTile.prototype = new BookItemObject();

function SpireScrapTile() {
  //Graphics Upgraded 
  this.name = "SpireScrap";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "scrap of paper";
  this.prefix = "a";
  this.contents = "<span class='conv'>Spire: far right, near right, mid left.</span>%%<span class='conv'>Underworld: far left, mid left, near right.</span>";
  this.longdesc = "A scrap of paper found in Natassa's Spire.";
}
SpireScrapTile.prototype = new BookItemObject();

function LayneJournalTile() {
  //Graphics Upgraded
  this.name = "LayneJournal";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "well marked scroll";
  this.prefix = "a";
  this.contents = "<span class='conv'>Herein are the words of Layne son of Timothy, squire to Sir Caradawg of the Knights of Hilden. I record our travels into the depths of the earth, as he seeks to venture into this newly discovered underworld.</span>%%<span class='conv'>We traveled through the mine- which is beginning to see trouble from the monsters below- and emerged on an island in a lake deeply underground, within the hugest cavern you have ever seen. With great craftiness we crossed the lake, the entrance to the mine at our backs, and found ourselves facing a wide tunnel leading deeper into the underworld.</span>%%<span class='conv'>Day 2 underground: After several battles with underworld denizens, we found ourselves... back at the banks of that self-same lake. Dismayed, we continued skirting the lake and found another path, which we followed until we were blocked by a great pool of lava. And so we backtracked, continued around the lake, and took the next path outward, making camp to rest.</span>%%<span class='conv'>Day 3: This passage is much quieter- worryingly so. We quickly reached a fork, and turned right, and stalked along until the ground turned swampy and muddy. The air was dank and unpleasant, and we began to be swarmed by insects. Two exits presented themselves from here, and we chose to travel again to the right.</span>%%<span class='conv'>This twisted and turned and we were suddenly beset by monstrous beings that walked like humans. But we slew them, and reached another fork, one path smooth and the other very much like a series of rough hills. Fearing to be seen from too great a distance on the flat paths, we chose the hills.</span>%%<span class='conv'>After several hours, the hills gave way to flatland once more. We ignored a side passage on our left, and reached a large cavern with paths leaving in four directions. We chose to go right, which almost immediately turned into a dead end where we took advantage of the secure position to make camp.</span>%%<span class='conv'>Day 4: Emerging from the cave, we saw that to the right was more swampland, and we decided not to travel that way, so we continued straight across. We chose right and then right again quickly thereafter. While walking this path we were attacked by great beasts, and wounded badly but not severely. With the beasts dispatched (truly, is Sir Caradawg a great warrior!), we turned to the question of where they had came from, and my lord found, in the crook of the wall where the cave curved again to the left, a small, well hidden cave. We entered.</span>%%<span class='conv'>Day 7: I have not had the opportunity to write in some time. Calamity has struck. We entered the small cave, and traveled a short way inside, when we were surrounded by demonic faces. They attacked without mercy and it was clear that we could not stand against them. Sir Caradawg ordered me to flee and carry word back home, and with a heavy heart I turned and ran. I have been running and hiding through this awful place since, but yet I live.</span>%%<span class='conv'>Day 8: Aha! Thank the gods, I have found an entrance to a dungeon that, if I am blessed by the luck, will take me to the surface. I write this just outside the great entrance (wondering, again, just who built these?), and will write again when I reach a place of safety inside it.</span>%%<span class='conv'>(Nothing more is written here.)</span>";
  this.longdesc = "A scroll containing a squire's journal.";
}
LayneJournalTile.prototype = new BookItemObject();

function LanceRuneNotesTile() {
  //Graphics Upgraded
  this.name = "LanceRuneNotes";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -38*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "<span class='conv'>Some time ago, Mother and Father shared a family Secret: the Rune of Kings. Deep under the site of another dynasty, it allows our bloodline to connect with... well, the heart of the Kingdom. The world. The earth.</span>%%<span class='conv'>Unknown to most, there are MORE. I directed Justice to help research them, and we discovered full elemental correspondences. The Rune of Kings is also the Rune of Earth- a bond to the land. It is also the key to unlock the other Runes.</span>%%<span class='conv'>Justice discovered the location of the Rune of Waves. There is a small island, naught but hills, north of the Crown Mountains and west of Poverty. The Rune of Kings is required to reveal the cave, she thinks, but I have not found a way to the island yet to try.</span>%%<span class='conv'>The Rune of Winds is, unsurprisingly perhaps, connected to Xoricco. The Rune of Flames appears to be near the Land of Lost Hope- it will be some time before I can try and discover it.</span>%%<span class='conv'>Strangely, there are hints and echoes of a fifth Rune, but I know not what it could be...</span>";
  this.longdesc = "A journal containing Lance's research on Runes.";
}
LanceRuneNotesTile.prototype = new BookItemObject();

function XApprenticeJournalTile() {
  this.name = "XApprenticeJournal";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You open the small journal.%%<span class='conv'>Master Xoricco insists that it is valuable to write everything down, that the act of putting pen to page will firm the memory and the ability to learn. So here I am.</span>%%<span class='conv'>We have taken over a small cave next to her chosen site for the Gate. Despite the fact that we are not going to be here long, she has set up defenses to protect us.</span>%%<span class='conv'>The ritual to create this side of the Gate is elaborate and difficult- she says we are not nearly to the point where she can teach any of it to me. But I have observed what I can.</span>%%<span class='conv'>The core of it all is a treated piece of voidstone, brought here from the expedition that discovered the far continent. I don't know what it must be treated with, only that it is another rare substance.</span>%%<span class='conv'>She is at the site now, preparing to bury the stone. Then will be another boat trip to the new land, to build the other gate. I am determined to convince her to allow me to accompany her...</span>";
  this.longdesc = "A small journal found in a cave.";
}
XApprenticeJournalTile.prototype = new BookItemObject();

function ConsumableItemObject() {
  this.addType("Consumable");
}
ConsumableItemObject.prototype = new ItemObject();

function KeyOfAshesTile() {
  //Graphics Upgraded
  this.name = "KeyOfAshes";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -25*32;  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Ashes";
  this.prefix = "the";
  this.longdesc = "The key of ashes. It feels strangely fragile...";
  this.usedesc = "Unknown.";
}
KeyOfAshesTile.prototype = new ConsumableItemObject();  

KeyOfAshesTile.prototype.use = function(who) {
  let retval = {fin:1};
  if ((who.getx() === 95) && (who.gety() === 60)) {
    let stuff = who.getHomeMap().getTile(88,54).getFeatures();
    let field;
    for (let i=0;i<stuff.length;i++) {
      if (stuff[i].getName() === "EnergyField") { field = stuff[i]; }
    }
    who.getHomeMap().deleteThing(field);
    DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
    retval["txt"] = "You insert the key into the opening on the ash covered surface, and carefully turn. There is a click, and then the key crumbles into ash that mixes with what is already present.";
  } else {
    retval["txt"] = "You cannot find a place to use that here.";
    retval["preserve"] = 1;
  }
  return retval;
}

function KeyOfIceTile() {
  //Graphics Upgraded
  this.name = "KeyOfIce";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Ice";
  this.prefix = "the";
  this.longdesc = "The Key of Ice. Cold to the touch, but does not seem to melt.";
  this.usedesc = "Unknown.";
}
KeyOfIceTile.prototype = new ConsumableItemObject();  

KeyOfIceTile.prototype.use = function(who) {
  let retval = {fin:1};
  if ((who.getx() === 96) && (who.gety() === 58)) {
    let stuff = who.getHomeMap().getTile(86,54).getFeatures();
    let field;
    for (let i=0;i<stuff.length;i++) {
      if (stuff[i].getName() === "EnergyField") { field = stuff[i]; }
    }
    who.getHomeMap().deleteThing(field);
    DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
    retval["txt"] = "You insert the key into the opening on the slick, icy surface, and gracefully turn. There is a click, and then the key melts in your hand, the water running down the altar until it freezes.";
  } else {
    retval["txt"] = "You cannot find a place to use that here.";
    retval["preserve"] = 1;
  }
  return retval;
}

function KeyOfBoneTile() {
  //Graphics Upgraded
  this.name = "KeyOfBone";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Bone";
  this.prefix = "the";
  this.longdesc = "The Key of Bone. Looking at it gives you an uncomfortable feeling.";
  this.usedesc = "Unknown.";
}
KeyOfBoneTile.prototype = new ConsumableItemObject();  

KeyOfBoneTile.prototype.use = function(who) {
  let retval = {fin:1};
  if ((who.getx() === 94) && (who.gety() === 62)) {
    let stuff = who.getHomeMap().getTile(85,54).getFeatures();
    let field;
    for (let i=0;i<stuff.length;i++) {
      if (stuff[i].getName() === "EnergyField") { field = stuff[i]; }
    }
    who.getHomeMap().deleteThing(field);
    DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
    retval["txt"] = "You insert the key into the opening on the strange, bone surface, and carefully turn. There is a click, and then the key glows brightly for a moment... and then is gone.";
  } else {
    retval["txt"] = "You cannot find a place to use that here.";
    retval["preserve"] = 1;
  }
  return retval;
}

function KeyOfDustTile() {
  //Graphics Upgraded
  this.name = "KeyOfDust";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Dust";
  this.prefix = "the";
  this.longdesc = "The Key of Dust. How is it held together...?";
  this.usedesc = "Unknown.";
}
KeyOfDustTile.prototype = new ConsumableItemObject();  

KeyOfDustTile.prototype.use = function(who) {
  let retval = {fin:1};
  if ((who.getx() === 90) && (who.gety() === 61)) {
    let stuff = who.getHomeMap().getTile(87,54).getFeatures();
    let field;
    for (let i=0;i<stuff.length;i++) {
      if (stuff[i].getName() === "EnergyField") { field = stuff[i]; }
    }
    who.getHomeMap().deleteThing(field);
    DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
    retval["txt"] = "You insert the key into the opening on the dust coated surface, and turn. There is a click, and then the key disintegrates into dust.";
  } else {
    retval["txt"] = "You cannot find a place to use that here.";
    retval["preserve"] = 1;
  }
  return retval;
}

function StoneOfCursesTile() {
  this.name = "StoneOfCurses";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -159*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Stone of Curses";
  this.prefix = "the";
  this.longdesc = "The Stone of Curses. It glows with a vile light.";
  this.usedesc = "Shatter the stone.";
  this.addType("Quest");
}
StoneOfCursesTile.prototype = new ConsumableItemObject();

StoneOfCursesTile.prototype.use = function(who) {
  let retval = { fin:1 };

  let ladder = localFactory.createTile("LadderDown");
  ladder.entermap = "hotelcalifornia7";
  ladder.enterx = 10;
  ladder.entery = 5;
  if (PC.getHomeMap().getName() === "hotelcalifornia6") {
    PC.getHomeMap().placeThing(10,9,ladder);
    retval["txt"] = "The curse is broken! The inn shakes around you.";
    Earthquake();
  } else {
    retval["txt"] = "The stone fades in your hand.";
  }

  return retval;
}

function TorchTile() {
  //Graphic Upgraded
  this.name = "Torch";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -163*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "torch";
  this.prefix = "a";
  this.longdesc = "An unlit torch.";
  this.flammable = 30;
}
TorchTile.prototype = new ConsumableItemObject();

TorchTile.prototype.use = function(who) {
  let retval = {};
  if (who.getSpellEffectsByName("TorchLight")) {
    if (who === PC) {
      retval["txt"] = "You already have a lit torch!";
    }
    retval["preserve"] = 1;
    retval["fin"] = 1;
    return retval;
  }
  let tl = localFactory.createTile("TorchLight");
  let endtime = 50 + DU.DUTime.getGameClock();
  tl.setExpiresTime(endtime);
  
  DUPlaySound("sfx_spell_light"); 
  who.addSpellEffect(tl);
  
  DrawCharFrame();
  retval["txt"] = "You light a torch.";
  retval["fin"] = 1;

  return retval;
}

TorchTile.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " burns away!");
  let thisx = this.getx();
  let thisy = this.gety();
  
  let itsmap = this.getHomeMap();
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap,thisx,thisy);
  
  return 1; 
}


function KyvekBoxTile() {
  this.name = "KyvekBox";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -79*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "box";
  this.prefix = "a";
  this.addType("Quest");
  this.openAsUse = 1;
  this.longdesc = "A box with the payment of a debt to Kyvek in Naurglen.";
  this.usedesc = "Open the box.";
}
KyvekBoxTile.prototype = new ConsumableItemObject();

KyvekBoxTile.prototype.use = function(who) {
  let retval = {fin:1};
  
  if (who === PC) {
    retval["override"] = -1;
    retval["fin"] = -1;
    retval["preserve"] = 1;
    retval["txt"] = "This will break the seal and you will be unable to return the money to Kyvek. Are you sure?";
    retval["input"] = "(Y/N): ";
    targetCursor.useditem = this;
    return retval;
  }
  return retval;
}

KyvekBoxTile.prototype.usePrompt = function(code) {
  let retval = {fin:1};
  if (code === 89) {
    retval["txt"] = "You break the seal and empty the coin into your own pouches. You gain 600 gold.";
    PC.diffKarma(-1);
    PC.addGold(600);
    PC.removeFromInventory(this);
    DrawCharFrame();
  } else {
    retval["txt"] = "You put the box away, unopened.";
  }
  return retval;
}

function InfiniteScrollTile() {
  //Graphics Upgraded
  this.name = "InfiniteScroll";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -39*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Infinite Scroll";
  this.prefix = "an";
  this.addType("Quest");
  this.openAsUse = 1;
  this.longdesc = "A piece of parchment so blank it is like a hole in your mind.";
  this.usedesc = "Use the Scroll.";
}
InfiniteScrollTile.prototype = new ConsumableItemObject();

InfiniteScrollTile.prototype.use = function(who) {
  let retval = {};
  
  if (who === PC) {
    delete this.circle;
    let fea = PC.getHomeMap().features.getAll();
    for (let i=0;i<fea.length;i++) {
      if (fea[i].getName() === "BrilliantPool") {
        if (IsAdjacent(who,fea[i])) {
          retval["override"] = -1;
          retval["fin"] = 4;
          retval["preserve"] = 1;
          retval["txt"] = "You kneel down in front of the Pool and feel its ethereal potency reach out towards you. What level spell will you inscribe?";
          retval["input"] = "(1-8): ";
          gamestate.setMode("singlenumber");
          targetCursor.itemname = "InfiniteScroll";
          targetCursor.itemSource = this;
          return retval;
        }
      }
    }
  }
  retval["txt"] = "There is no way to use that here.";
  retval["preserve"] = 1;
  retval["fin"] = 1;
  return retval;
}

InfiniteScrollTile.prototype.firstResponse = function(code) {
  let level = parseInt(code)-48;
  this.circle = level;
  let retval = {};
  retval["fin"] = -1;
  retval["txt"] = "Choose a spell:";
  for (let i=1;i<=8;i++) {
    let sid = i;
    if ((level===SPELL_WEATHER_CONTROL_LEVEL) && (i===SPELL_WEATHER_CONTROL_ID)) { continue; }  
    if ((level===SPELL_ARMAGEDDON_LEVEL) && (i===SPELL_ARMAGEDDON_ID)) { continue; }
    if ((level===SPELL_BUILD_GATE_LEVEL) && (i===SPELL_BUILD_GATE_ID)) { continue; }
    retval["txt"] += "<br />" + i + ") " + magic[level][GetSpellID(sid)].getName();
  }
  return retval;
}

InfiniteScrollTile.prototype.secondResponse = function(code) {
  let sid = parseInt(code)-48;
  let scroll = localFactory.createTile("ScrollWildcard");
  scroll.setDesc("scroll of " + magic[this.circle][GetSpellID(sid)].getName());
  scroll.spelllevel = this.circle;
  scroll.spellnum = GetSpellID(sid);
  PC.addToInventory(scroll,1);
  PC.removeFromInventory(this);

  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "You feel power swirl around you as text appears on the scroll!";
  retval["input"] = "&gt;"
  return retval;
}

function SupplyBoxTile() {
  this.name = "SupplyBox";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-384";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "small box";
  this.addType("Quest");
  this.openAsUse = 1;
  this.longdesc = "A small box of supplies, given to you by Nyrani.";
  this.usedesc = "Open the box.";
}
SupplyBoxTile.prototype = new ConsumableItemObject();

SupplyBoxTile.prototype.use = function(who) {
  let retval = { fin: 1 };
  who.addToInventory(localFactory.createTile("WhitePotion"),1,2);
  who.addToInventory(localFactory.createTile("RedPotion"),1);
  who.addToInventory(localFactory.createTile("YellowPotion"),1,2);
  who.addToInventory(localFactory.createTile("ScrollVulnerability"),1);
  retval["txt"] = "The box contains: two white potions, two yellow potions, a red potion, and a scroll of Vulnerability.";
  
  return retval;
}

function BluePalmCrystalTile() {
  //Graphics Upgraded
  this.name = "BluePalmCrystal";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -37*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "blue palm crystal";
  this.longdesc = "A blue crystal that will restore mental energy when gripped in the palm.";
  this.usedesc = "Grasp the crystal.";
}
BluePalmCrystalTile.prototype = new ConsumableItemObject();

BluePalmCrystalTile.prototype.use = function(who) {
  let retval = { fin: 1 };
  retval["txt"] = "You grip the crystal in your palm, and feel refreshed! The crystal crumbles to dust.";
  let newmana = who.getMana() + 5;
  if (newmana > who.getMaxMana()) { newmana = who.getMaxMana(); }
  who.setMana(newmana);
  if (who === PC) {
    DrawCharFrame();
  }
  return retval;
}

function GreenPalmCrystalTile() {
  //Graphics Upgraded
  this.name = "GreenPalmCrystal";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -37*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "green palm crystal";
  this.longdesc = "A green crystal that will cure poison or disease.";
  this.usedesc = "Grasp the crystal.";
}
GreenPalmCrystalTile.prototype = new ConsumableItemObject();

GreenPalmCrystalTile.prototype.use = function(who) {
  let retval = magic[SPELL_CURE_LEVEL][SPELL_CURE_ID].executeSpell(who,1,2);
  if (!who.getSpellEffectsByName("Poison") && !who.getSpellEffectsByName("Disease")) {
    retval["txt"] = "You grip the crystal in your palm. You don't feel any different, but the crystal crumbles to dust."; 
  } else {
    retval["txt"] = "You grip the crystal in your palm, and feel purified! The crystal crumbles to dust.";
  }
  if (who === PC) {
    DrawCharFrame();
  }
  return retval;
}

function PurplePalmCrystalTile() {
  //Graphics Upgraded
  this.name = "PurplePalmCrystal";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -37*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "purple palm crystal";
  this.longdesc = "A purple crystal that will grant a bird's-eye view of your location.";
  this.usedesc = "Grasp and gaze into the crystal.";
}
PurplePalmCrystalTile.prototype = new ConsumableItemObject();

PurplePalmCrystalTile.prototype.use = function(who) {
  if (DU.gameflags.getFlag("negate")[castermap.getName()]) {
    retval["txt"] = "Something is preventing this from functioning.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
    gamestate.setMode("player");
    
    return retval;
  }
  let retval = magic[SPELL_ETHEREAL_VISION_LEVEL][SPELL_ETHEREAL_VISION_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "You grasp the crystal. Gazing into it, you see yourself from above."  
  if (who === PC) {
    DrawCharFrame();
  }
  return retval;
}

function IdPotion(potion) {
  let pottype = potion.getName().toLowerCase();
  DU.gameflags.setFlag("knows" + pottype, 1);
}

// potions

function PotionItemObject() {
  this.addType("Potion");
  this.flammable = 10;
}
PotionItemObject.prototype = new ConsumableItemObject();

PotionItemObject.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " boils away!");
  let thisx = this.getx();
  let thisy = this.gety();
  
  let itsmap = this.getHomeMap();
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap,thisx,thisy);
  
  return 1; 
}

// poison potions
function GreenPotionTile() {
  //Graphics Upgraded
  this.name = "GreenPotion";
  this.desc = "green potion";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -21*32;
  this.usedesc = "Drink it, or throw it at something.";
}
GreenPotionTile.prototype = new PotionItemObject();

GreenPotionTile.prototype.getUseDesc = function() {
  if (DU.gameflags.getFlag("knowsgreenpotion")) {
    return this.usedesc;
  }
  return "Drink it.";
}

GreenPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsgreenpotion")) {
    return "A Poison potion.";
  }
  return "A green potion.";
}

GreenPotionTile.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " boils away!");
  let thisx = this.getx();
  let thisy = this.gety();
  let itsmap = this.getHomeMap();
    
  for (let i=thisx-1;i<=thisx+1;i++) {
    for (let j=thisy-1;j<=thisy+1;j++) {
      let tile = itsmap.getTile(i,j);
      if (tile !== "OoB") {
        let npcs = tile.getNPCs();
        for (let i=0;i<npcs.length;i++) {
          if (Dice.roll("1d100") < (55-npcs[i].getLevel()*5)) {
            // poisoned by fumes
            maintext.addText(npcs[i].getFullDesc() + " is poisoned by the fumes!");
            let poison = localFactory.createTile("Poison");
            let duration = Dice.roll("2d8") * SCALE_TIME;
            poison.setExpiresTime(duration + DUTime.getGameClock());
            npcs[i].addSpellEffect(poison);
            ShowEffect(npcs[i], 1000, "spellsparkles-anim.gif", 0, COLOR_GREEN);
            DU.gameflags.setFlag("knowsgreenpotion",1);
          }
        }
      }
    }
  }
  
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap,thisx,thisy);
  
  return 1; 
}

GreenPotionTile.prototype.use = function(who) {
  if (DU.gameflags.getFlag("knowsgreenpotion")) {
    let retval = {fin:-1}
    retval["override"] = -1;
    retval["txt"] = "Would you like to:<br />(A) Drink the potion<br />(B) Throw the potion";
    retval["input"] = "&gt; Choose one:";
    targetCursor.command = "u";
    targetCursor.usewhat = "greenpotion";
    targetCursor.uselink = this;
    retval["preserve"] = 1;
    return retval; 
  } else { 
    return this.drink(who);
  }
}

GreenPotionTile.prototype.drink = function(who, del) {
  DUPlaySound("sfx_potion");
  DU.gameflags.setFlag("knowsgreenpotion",1)
  let retval = {fin:1}
  let poison = localFactory.createTile("Poison");
  let duration = Dice.roll("2d8") * SCALE_TIME;
  poison.setExpiresTime(duration + DUTime.getGameClock());
  who.addSpellEffect(poison);
  if (who === PC) {
    retval["txt"] = "Gulp!<br />You are poisoned!";
    DrawCharFrame();
  }
  if (del) {
    if (this.getHomeMap()) {
      // cast from floor 
      this.getHomeMap().deleteThing(this);
      DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
    } else {
      PC.removeFromInventory(this);
    }
  }
  return retval;
}

GreenPotionTile.prototype.throw = function(who,tgt) {
  DUPlaySound("sfx_break_glass");
  let retval = {fin:1}
  let poison = localFactory.createTile("Poison");
  let duration = Dice.roll("2d8") * SCALE_TIME;
  poison.setExpiresTime(duration + DUTime.getGameClock());
  tgt.addSpellEffect(poison);
  if ((who === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
  retval["txt"] = "The potion poisons the " + tgt.getDesc() + "!";
  retval["input"] = "&gt;"
  delete targetCursor.uselink;
  return retval;
}

//haste potion
function DarkGreenPotionTile() {
  //Graphics Upgraded
  this.name = "DarkGreenPotion";
  this.desc = "dark green potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -21*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
DarkGreenPotionTile.prototype = new PotionItemObject();

DarkGreenPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsdarkgreenpotion")) {
    return "A Quickness potion.";
  }
  return "A dark green potion.";
}  

DarkGreenPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsdarkgreenpotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_QUICKNESS_LEVEL][SPELL_QUICKNESS_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />You begin to move more quickly!";
  DrawCharFrame();
  return retval;
}

// str potion
function SilverPotionTile() {
  //Graphics Upgraded
  this.name = "SilverPotion";
  this.desc = "silver potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
SilverPotionTile.prototype = new PotionItemObject();

SilverPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowssilverpotion")) {
    return "A Strength potion.";
  }
  return "A silver potion.";
}

SilverPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowssilverpotion",1)
  DUPlaySound("sfx_potion");
  let resp = {};
  resp["fin"] = 1;

  let levobj = localFactory.createTile("BlessingStr");
  
  let dur = Dice.roll("2d10+15");
  let power = Dice.roll("1d4+1");
  let endtime = dur + DU.DUTime.getGameClock();
  if (!DebugWrite("gameobj", "Potion of Strength: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />")) {
    DebugWrite("magic", "Potion of Strength: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  }
  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  who.addSpellEffect(levobj);
    
  DrawCharFrame();
  resp["txt"] = "Gulp!<br />You feel stronger!";
  return resp;  
}
  
// dex potion
function PinkPotionTile() {
  //Graphics Upgraded
  this.name = "PinkPotion";
  this.desc = "pink potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
PinkPotionTile.prototype = new PotionItemObject();

PinkPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowspinkpotion")) {
    return "A Dexterity potion.";
  }
  return "A pink potion.";
}

PinkPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowspinkpotion",1)
  DUPlaySound("sfx_potion");
  let resp = {fin:1};

  let levobj = localFactory.createTile("BlessingDex");
  
  let dur = Dice.roll("2d10+15");
  let power = Dice.roll("1d4+1");
  let endtime = dur + DU.DUTime.getGameClock();
  if (!DebugWrite("gameobj", "Potion of Dexterity: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />")) {
    DebugWrite("magic", "Potion of Dexterity: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  }

  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  who.addSpellEffect(levobj);
    
  DrawCharFrame();
  resp["txt"] = "Gulp!<br />You feel more agile!";
  return resp;  
}

// int potion
function GreyPotionTile() {
  //Graphics Upgraded
  this.name = "GreyPotion";
  this.desc = "grey potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -23*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
GreyPotionTile.prototype = new PotionItemObject();

GreyPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsgreypotion")) {
    return "An Intelligence potion.";
  }
  return "A grey potion.";
}

GreyPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsgreypotion",1)
  let resp = {fin:1};
  DUPlaySound("sfx_potion");

  let levobj = localFactory.createTile("BlessingInt");
  
  let dur = Dice.roll("2d10+15");
  let power = Dice.roll("1d4+1");
  let endtime = dur + DU.DUTime.getGameClock();
  if (!DebugWrite("gameobj", "Potion of Intelligence: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />")) {
    DebugWrite("magic", "Potion of Intelligence: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  }

  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  who.addSpellEffect(levobj);
    
  DrawCharFrame();
  resp["txt"] = "Gulp!<br />You feel smarter!";
  return resp;  
}

// greater mana potion
// actually milky purple
function BrownPotionTile() {
  //Graphics Upgraded
  this.name = "BrownPotion";
  this.desc = "milky purple potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
BrownPotionTile.prototype = new PotionItemObject();

BrownPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsbrownpotion")) {
    return "A Greater Mana potion.";
  }
  return "A milky purple potion.";
}

BrownPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsbrownpotion",1)
  DUPlaySound("sfx_potion");
  who.setMana(who.getMaxMana());
  let retval = {fin:1};
  if (who === PC) {
    retval["txt"] = "Gulp!<br />You feel refreshed!";
    DrawCharFrame();
  }
  return retval;
}

// cure potion
function RedPotionTile() {
  //Graphics Upgraded
  this.name = "RedPotion";
  this.desc = "red potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
RedPotionTile.prototype = new PotionItemObject();

RedPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsredpotion")) {
    return "A Cure potion.";
  }
  return "A red potion.";
}

RedPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsredpotion",1)
  DUPlaySound("sfx_potion");
  let poisoned;
  if (who.getSpellEffectsByName("Poison")) { poisoned = 1; }
  if (who.getSpellEffectsByName("Disease")) { poisoned = 1; }
  let resp = magic[SPELL_CURE_LEVEL][SPELL_CURE_ID].executeSpell(who,1,2);
  resp["txt"] = "Gulp!";
  if (!poisoned) { maintext.delayedAddText("Nothing happens."); } 
  DrawCharFrame();
  return resp;
}

// light potion
function WhitePotionTile() {
  //Graphics Upgraded
  this.name = "WhitePotion";
  this.desc = "white potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -21*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
WhitePotionTile.prototype = new PotionItemObject();

WhitePotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowswhitepotion")) {
    return "A Light potion.";
  }
  return "A white potion.";
}

WhitePotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowswhitepotion",1)
  DUPlaySound("sfx_potion");
  let retval = { fin:1};
  retval = magic[SPELL_LIGHT_LEVEL][SPELL_LIGHT_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />You begin to glow.";
  DrawCharFrame();
  return retval;
}

// lesser heal potion
function YellowPotionTile() {
  //Graphics Upgraded
  this.name = "YellowPotion";
  this.desc = "yellow potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
YellowPotionTile.prototype = new PotionItemObject();

YellowPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsyellowpotion")) {
    return "A Lesser Heal potion.";
  }
  return "A yellow potion.";
}

YellowPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsyellowpotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].executeSpell(PC, 0, 2);
  if (who.checkType("PC")) { DrawCharFrame(); }
  retval["txt"] = "Gulp!<br />You are healed!";
  return retval;
}

// protect potion
function PurplePotionTile() {
  //Graphics Upgraded
  this.name = "PurplePotion";
  this.desc = "purple potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
PurplePotionTile.prototype = new PotionItemObject();

PurplePotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowspurplepotion")) {
    return "A Protection potion.";
  }
  return "A purple potion.";
}

PurplePotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowspurplepotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_PROTECT_LEVEL][SPELL_PROTECT_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />You feel an aura of protection around you.";
  DrawCharFrame();
  return retval;
}

// bless potion
function BlackPotionTile() {
  //Graphics Upgraded
  this.name = "BlackPotion";
  this.desc = "black potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -21*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
BlackPotionTile.prototype = new PotionItemObject();

BlackPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsblackpotion")) {
    return "A Bless potion.";
  }
  return "A black potion.";
}

BlackPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsblackpotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_BLESSING_LEVEL][SPELL_BLESSING_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />You feel blessed!";
  DrawCharFrame();
  return retval;
}

// heal potion
function BluePotionTile() {
  //Graphics Upgraded
  this.name = "BluePotion";
  this.desc = "blue potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
BluePotionTile.prototype = new PotionItemObject();

BluePotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsbluepotion")) {
    return "A Heal potion.";
  }
  return "A blue potion.";
}

BluePotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsbluepotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />You are healed!"
  DrawCharFrame();
  return retval;
}

// ethereal vision potion
function DeepBluePotionTile() {
  //Graphics Upgraded
  this.name = "DeepBluePotion";
  this.desc = "deep blue potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -21*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
DeepBluePotionTile.prototype = new PotionItemObject();

DeepBluePotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsdeepbluepotion")) {
    return "An Ethereal Vision potion.";
  }
  return "A deep blue potion.";
}

DeepBluePotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsdeepbluepotion",1)
  DUPlaySound("sfx_potion");
  let retval = magic[SPELL_ETHEREAL_VISION_LEVEL][SPELL_ETHEREAL_VISION_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />Your vision becomes strange!"
  DrawCharFrame();
  return retval;
}

// mana potion
function OrangePotionTile() {
  //Graphics Upgraded
  this.name = "OrangePotion";
  this.desc = "orange potion";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
OrangePotionTile.prototype = new PotionItemObject();

OrangePotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsorangepotion")) {
    return "A Mana potion.";
  }
  return "An orange potion.";
}

OrangePotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsorangepotion",1)
  DUPlaySound("sfx_potion");
  let mana = Dice.roll("2d6+1");
  who.setMana(who.getMana() + mana);
  if (who.getMana() > who.getMaxMana()) { who.setMana(who.getMaxMana()); }
  let retval = {};
  retval["fin"] = 1;
  if (who === PC) {
    retval["txt"] = "Gulp!<br />You feel refreshed!";
    DrawCharFrame();
  }
  return retval;
}

// iron flesh potion
function TanPotionTile() {
  //Graphics Upgraded
  this.name = "TanPotion";
  this.desc = "tan potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
TanPotionTile.prototype = new PotionItemObject();

TanPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowstanpotion")) {
    return "An Iron Flesh potion.";
  }
  return "A tan potion.";
}

TanPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowstanpotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />Your skin is as hard as iron!"
  DrawCharFrame();
  return retval;
}

// scrolls

function ScrollItemObject() {
  //Graphics Upgraded
  this.addType("Scroll"); 
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -39*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.spelllevel = 1;
  this.spellnum = 1;
  this.flammable = 90;
  this.usedesc = "Read the scroll, casting the spell for free.";
}
ScrollItemObject.prototype = new ConsumableItemObject();

ScrollItemObject.prototype.getLongDesc = function() {
  let spellname = magic[this.spelllevel][this.spellnum].getName();
  return "A scroll of " + spellname + ".";
}

ScrollItemObject.prototype.use = function(who) {
  if (DU.gameflags.getFlag("negate")[who.getHomeMap().getName()]) {
    retval["txt"] = "Magic has been negated, you cannot cast spells here.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
    gamestate.setMode("player");
    
    return retval;
  }
  let retval = {};
  retval = magic[this.spelllevel][this.spellnum].executeSpell(PC, 0, 1);
  if (retval["fin"] === 4) { 
    retval["override"] = 1; 
    targetCursor.castFrom = this;
  }
  if (gamestate.getMode() === "anykey") {
    // Peer, at the least
    retval["override"] = 1;
    retval["fin"] = 4;
  }
  else {
    if (!retval["txt"]) { retval["txt"] = "Spell cast!"; }
    DrawCharFrame();
  }
  return retval;
}

ScrollItemObject.prototype.spellcast = function(who) {
  if (this.getHomeMap()) {
    // cast from floor 
    this.getHomeMap().deleteThing(this);
    DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
  } else {
    who.removeFromInventory(this);
  }
}

ScrollItemObject.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " burns away!");
  let thisx = this.getx();
  let thisy = this.gety();
  
  let itsmap = this.getHomeMap();
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap,thisx,thisy);
  
  return 1; 
}

function ScrollWildcardTile() {
  //Graphics Upgraded
  this.name = "ScrollWildcard";
  this.desc = "scroll of ???";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -39*32;
  this.spelllevel = 0;
  this.spellnum = 0;
}
ScrollWildcardTile.prototype = new ScrollItemObject();

function ScrollAudachtaScribeTile() {
  this.name = "ScrollAudachtaScribe";
  this.desc = "scroll of Audachta Scribe";
  this.prefix = "a";
  this.spelllevel = SPELL_AUDACHTA_SCRIBE_LEVEL;
  this.spellnum = SPELL_AUDACHTA_SCRIBE_ID;
}
ScrollAudachtaScribeTile.prototype = new ScrollItemObject();

function ScrollCureTile() {
  this.name = "ScrollCure";
  this.desc = "scroll of Cure";
  this.prefix = "a";
  this.spelllevel = SPELL_CURE_LEVEL;
  this.spellnum = SPELL_CURE_ID;
}
ScrollCureTile.prototype = new ScrollItemObject();

function ScrollDisarmTrapTile() {
  this.name = "ScrollDisarmTrap";
  this.desc = "scroll of Disarm Trap";
  this.prefix = "a";
  this.spelllevel = SPELL_DISARM_TRAP_LEVEL;
  this.spellnum = SPELL_DISARM_TRAP_ID;
}
ScrollDisarmTrapTile.prototype = new ScrollItemObject();

function ScrollDistractTile() {
  this.name = "ScrollDistract";
  this.desc = "scroll of Distract";
  this.prefix = "a";
  this.spelllevel = SPELL_DISTRACT_LEVEL;
  this.spellnum = SPELL_DISTRACT_ID;
}
ScrollDistractTile.prototype = new ScrollItemObject();

function ScrollFlameBladeTile() {
  this.name = "ScrollFlameBlade";
  this.desc = "scroll of Flame Blade";
  this.prefix = "a";
  this.spelllevel = SPELL_FLAME_BLADE_LEVEL;
  this.spellnum = SPELL_FLAME_BLADE_ID;
  this.flammable = 50;
}
ScrollFlameBladeTile.prototype = new ScrollItemObject();

function ScrollLightTile() {
  this.name = "ScrollLight";
  this.desc = "scroll of Light";
  this.prefix = "a";
  this.spelllevel = SPELL_LIGHT_LEVEL;
  this.spellnum = SPELL_LIGHT_ID;
}
ScrollLightTile.prototype = new ScrollItemObject();

function ScrollVulnerabilityTile() {
  this.name = "ScrollVulnerability";
  this.desc = "scroll of Vulnerability";
  this.prefix = "a";
  this.spelllevel = SPELL_VULNERABILITY_LEVEL;
  this.spellnum = SPELL_VULNERABILITY_ID;
}
ScrollVulnerabilityTile.prototype = new ScrollItemObject();

function ScrollIllusionTile() {
  this.name = "ScrollIllusion";
  this.desc = "scroll of Illusion";
  this.prefix = "a";
  this.spelllevel = SPELL_ILLUSION_LEVEL;
  this.spellnum = SPELL_ILLUSION_ID;
}
ScrollIllusionTile.prototype = new ScrollItemObject();

function ScrollIronFleshTile() {
  this.name = "ScrollIronFlesh";
  this.desc = "scroll of Iron Flesh";
  this.prefix = "a";
  this.spelllevel = SPELL_IRON_FLESH_LEVEL;
  this.spellnum = SPELL_IRON_FLESH_ID;
}
ScrollIronFleshTile.prototype = new ScrollItemObject();

function ScrollLesserHealTile() {
  this.name = "ScrollLesserHeal";
  this.desc = "scroll of Lesser Heal";
  this.prefix = "a";
  this.spelllevel = SPELL_LESSER_HEAL_LEVEL;
  this.spellnum = SPELL_LESSER_HEAL_ID;
}
ScrollLesserHealTile.prototype = new ScrollItemObject();

function ScrollMagicBoltTile() {
  this.name = "ScrollMagicBolt";
  this.desc = "scroll of Magic Bolt";
  this.prefix = "a";
  this.spelllevel = SPELL_MAGIC_BOLT_LEVEL;
  this.spellnum = SPELL_MAGIC_BOLT_ID;
}
ScrollMagicBoltTile.prototype = new ScrollItemObject();

function ScrollPoisonCloudTile() {
  this.name = "ScrollPoisonCloud";
  this.desc = "scroll of Poison Cloud";
  this.prefix = "a";
  this.spelllevel = SPELL_POISON_CLOUD_LEVEL;
  this.spellnum = SPELL_POISON_CLOUD_ID;
}
ScrollPoisonCloudTile.prototype = new ScrollItemObject();

function ScrollProtectionTile() {
  this.name = "ScrollProtection";
  this.desc = "scroll of Protection";
  this.prefix = "a";
  this.spelllevel = SPELL_PROTECTION_LEVEL;
  this.spellnum = SPELL_PROTECTION_ID;
}
ScrollProtectionTile.prototype = new ScrollItemObject();

function ScrollUnlockTile() {
  this.name = "ScrollUnlock";
  this.desc = "scroll of Unlock";
  this.prefix = "a";
  this.spelllevel = SPELL_UNLOCK_LEVEL;
  this.spellnum = SPELL_UNLOCK_ID;
}
ScrollUnlockTile.prototype = new ScrollItemObject();

function ScrollDispelTile() {
  this.name = "ScrollDispel";
  this.desc = "scroll of Dispel";
  this.prefix = "a";
  this.spelllevel = SPELL_DISPEL_LEVEL;
  this.spellnum = SPELL_DISPEL_ID;
}
ScrollDispelTile.prototype = new ScrollItemObject();

function ScrollDisruptUndeadTile() {
  this.name = "ScrollDisruptUndead";
  this.desc = "scroll of Disrupt Undead";
  this.prefix = "a";
  this.spelllevel = SPELL_DISRUPT_UNDEAD_LEVEL;
  this.spellnum = SPELL_DISRUPT_UNDEAD_ID;
}
ScrollDisruptUndeadTile.prototype = new ScrollItemObject();

function ScrollFireArmorTile() {
  this.name = "ScrollFireArmor";
  this.desc = "scroll of Fire Armor";
  this.prefix = "a";
  this.spelllevel = SPELL_FIRE_ARMOR_LEVEL;
  this.spellnum = SPELL_FIRE_ARMOR_ID;
  this.flammable = 30;
}
ScrollFireArmorTile.prototype = new ScrollItemObject();

function ScrollFireballTile() {
  this.name = "ScrollFireball";
  this.desc = "scroll of Fireball";
  this.prefix = "a";
  this.spelllevel = SPELL_FIREBALL_LEVEL;
  this.spellnum = SPELL_FIREBALL_ID;
  this.flammable = 50;
}
ScrollFireballTile.prototype = new ScrollItemObject();

function ScrollReturnTile() {
  this.name = "ScrollReturn";
  this.desc = "scroll of Return";
  this.prefix = "a";
  this.spelllevel = SPELL_RETURN_LEVEL;
  this.spellnum = SPELL_RETURN_ID;
  this.flammable = 50;
}
ScrollReturnTile.prototype = new ScrollItemObject();

function ScrollIceballTile() {
  this.name = "ScrollIceball";
  this.desc = "scroll of Iceball";
  this.prefix = "a";
  this.spelllevel = SPELL_ICEBALL_LEVEL;
  this.spellnum = SPELL_ICEBALL_ID;
}
ScrollIceballTile.prototype = new ScrollItemObject();

function ScrollTelekinesisTile() {
  this.name = "ScrollTelekinesis";
  this.desc = "scroll of Telekinesis";
  this.prefix = "a";
  this.spelllevel = SPELL_TELEKINESIS_LEVEL;
  this.spellnum = SPELL_TELEKINESIS_ID;
}
ScrollTelekinesisTile.prototype = new ScrollItemObject();

function ScrollTelepathyTile() {
  this.name = "ScrollTelepathy";
  this.desc = "scroll of Telepathy";
  this.prefix = "a";
  this.spelllevel = SPELL_TELEPATHY_LEVEL;
  this.spellnum = SPELL_TELEPATHY_ID;
}
ScrollTelepathyTile.prototype = new ScrollItemObject();

function ScrollWallOfFlameTile() {
  this.name = "ScrollWallOfFlame";
  this.desc = "scroll of Wall of Flame";
  this.prefix = "a";
  this.spelllevel = SPELL_WALL_OF_FLAME_LEVEL;
  this.spellnum = SPELL_WALL_OF_FLAME_ID;
  this.flammable = 20;
}
ScrollWallOfFlameTile.prototype = new ScrollItemObject();

function ScrollBlessingTile() {
  this.name = "ScrollBlessing";
  this.desc = "scroll of Blessing";
  this.prefix = "a";
  this.spelllevel = SPELL_BLESSING_LEVEL;
  this.spellnum = SPELL_BLESSING_ID;
}
ScrollBlessingTile.prototype = new ScrollItemObject();

function ScrollBlinkTile() {
  this.name = "ScrollBlink";
  this.desc = "scroll of Blink";
  this.prefix = "a";
  this.spelllevel = SPELL_BLINK_LEVEL;
  this.spellnum = SPELL_BLINK_ID;
}
ScrollBlinkTile.prototype = new ScrollItemObject();

function ScrollEtherealVisionTile() {
  this.name = "ScrollEtherealVision";
  this.desc = "scroll of Ethereal Vision";
  this.prefix = "a";
  this.spelllevel = SPELL_ETHEREAL_VISION_LEVEL;
  this.spellnum = SPELL_ETHEREAL_VISION_ID;
}
ScrollEtherealVisionTile.prototype = new ScrollItemObject();

function ScrollHealTile() {
  this.name = "ScrollHeal";
  this.desc = "scroll of Heal";
  this.prefix = "a";
  this.spelllevel = SPELL_HEAL_LEVEL;
  this.spellnum = SPELL_HEAL_ID;
}
ScrollHealTile.prototype = new ScrollItemObject();

function ScrollLifeDrainTile() {
  this.name = "ScrollLifeDrain";
  this.desc = "scroll of Life Drain";
  this.prefix = "a";
  this.spelllevel = SPELL_LIFE_DRAIN_LEVEL;
  this.spellnum = SPELL_LIFE_DRAIN_ID;
}
ScrollLifeDrainTile.prototype = new ScrollItemObject();

function ScrollSmiteTile() {
  this.name = "ScrollSmite";
  this.desc = "scroll of Smite";
  this.prefix = "a";
  this.spelllevel = SPELL_SMITE_LEVEL;
  this.spellnum = SPELL_SMITE_ID;
}
ScrollSmiteTile.prototype = new ScrollItemObject();

function ScrollCrystalTrapTile() {
  this.name = "ScrollCrystalTrap";
  this.desc = "scroll of Crystal Trap";
  this.prefix = "a";
  this.spelllevel = SPELL_CRYSTAL_TRAP_LEVEL;
  this.spellnum = SPELL_CRYSTAL_TRAP_ID;
}
ScrollCrystalTrapTile.prototype = new ScrollItemObject();

function ScrollMirrorWardTile() {
  this.name = "ScrollMirrorWard";
  this.desc = "scroll of Mirror Ward";
  this.prefix = "a";
  this.spelllevel = SPELL_MIRROR_WARD_LEVEL;
  this.spellnum = SPELL_MIRROR_WARD_ID;
}
ScrollMirrorWardTile.prototype = new ScrollItemObject();

function ScrollParalyzeTile() {
  this.name = "ScrollParalyze";
  this.desc = "scroll of Paralyze";
  this.prefix = "a";
  this.spelllevel = SPELL_PARALYZE_LEVEL;
  this.spellnum = SPELL_PARALYZE_ID;
}
ScrollParalyzeTile.prototype = new ScrollItemObject();

function ScrollPeerTile() {
  this.name = "ScrollPeer";
  this.desc = "scroll of Peer";
  this.prefix = "a";
  this.spelllevel = SPELL_PEER_LEVEL;
  this.spellnum = SPELL_PEER_ID;
}
ScrollPeerTile.prototype = new ScrollItemObject();

function ScrollShockwaveTile() {
  this.name = "ScrollShockwave";
  this.desc = "scroll of Shockwave";
  this.prefix = "a";
  this.spelllevel = SPELL_SHOCKWAVE_LEVEL;
  this.spellnum = SPELL_SHOCKWAVE_ID;
}
ScrollShockwaveTile.prototype = new ScrollItemObject();

function ScrollSummonAllyTile() {
  this.name = "ScrollSummonAlly";
  this.desc = "scroll of Summon Ally";
  this.prefix = "a";
  this.spelllevel = SPELL_SUMMON_ALLY_LEVEL;
  this.spellnum = SPELL_SUMMON_ALLY_ID;
}
ScrollSummonAllyTile.prototype = new ScrollItemObject();

function ScrollSwordstrikeTile() {
  this.name = "ScrollSwordstrike";
  this.desc = "scroll of Swordstrike";
  this.prefix = "a";
  this.spelllevel = SPELL_SWORDSTRIKE_LEVEL;
  this.spellnum = SPELL_SWORDSTRIKE_ID;
}
ScrollSwordstrikeTile.prototype = new ScrollItemObject();

function ScrollExplosionTile() {
  this.name = "ScrollExplosion";
  this.desc = "scroll of Explosion";
  this.prefix = "a";
  this.spelllevel = SPELL_EXPLOSION_LEVEL;
  this.spellnum = SPELL_EXPLOSION_ID;
}
ScrollExplosionTile.prototype = new ScrollItemObject();

function ScrollStormTile() {
  this.name = "ScrollStorm";
  this.desc = "scroll of Storm";
  this.prefix = "a";
  this.spelllevel = SPELL_STORM_LEVEL;
  this.spellnum = SPELL_STORM_ID;
}
ScrollStormTile.prototype = new ScrollItemObject();

function ScrollTremorTile() {
  this.name = "ScrollTremor";
  this.desc = "scroll of Tremor";
  this.prefix = "a";
  this.spelllevel = SPELL_TREMOR_LEVEL;
  this.spellnum = SPELL_TREMOR_ID;
}
ScrollTremorTile.prototype = new ScrollItemObject();

function ScrollFearTile() {
  this.name = "ScrollFear";
  this.desc = "scroll of Fear";
  this.prefix = "a";
  this.spelllevel = SPELL_FEAR_LEVEL;
  this.spellnum = SPELL_FEAR_ID;
}
ScrollFearTile.prototype = new ScrollItemObject();

function ScrollFireAndIceTile() {
  this.name = "ScrollFireAndIce";
  this.desc = "scroll of Fire and Ice";
  this.prefix = "a";
  this.spelllevel = SPELL_FIRE_AND_ICE_LEVEL;
  this.spellnum = SPELL_FIRE_AND_ICE_ID;
}
ScrollFireAndIceTile.prototype = new ScrollItemObject();

function ScrollMeteorSwarmTile() {
  this.name = "ScrollMeteorSwarm";
  this.desc = "scroll of Meteor Swarm";
  this.prefix = "a";
  this.spelllevel = SPELL_METEOR_SWARM_LEVEL;
  this.spellnum = SPELL_METEOR_SWARM_ID;
}
ScrollMeteorSwarmTile.prototype = new ScrollItemObject();

function ScrollMindBlastTile() {
  this.name = "ScrollMindBlast";
  this.desc = "scroll of Mind Blast";
  this.prefix = "a";
  this.spelllevel = SPELL_MIND_BLAST_LEVEL;
  this.spellnum = SPELL_MIND_BLAST_ID;
}
ScrollMindBlastTile.prototype = new ScrollItemObject();

function ScrollConflagrationTile() {
  this.name = "ScrollConflagration";
  this.desc = "scroll of Conflagration";
  this.prefix = "a";
  this.spelllevel = SPELL_CONFLAGRATION_LEVEL;
  this.spellnum = SPELL_CONFLAGRATION_ID;
  this.flammable = 30;
}
ScrollConflagrationTile.prototype = new ScrollItemObject();

function ScrollConjureDaemonTile() {
  this.name = "ScrollConjureDaemon";
  this.desc = "scroll of Conjure Daemon";
  this.prefix = "a";
  this.spelllevel = SPELL_CONJURE_DAEMON_LEVEL;
  this.spellnum = SPELL_CONJURE_DAEMON_ID;
}
ScrollConjureDaemonTile.prototype = new ScrollItemObject();

function ScrollTimeStopTile() {
  this.name = "ScrollTimeStop";
  this.desc = "scroll of Time Stop";
  this.prefix = "a";
  this.spelllevel = SPELL_TIME_STOP_LEVEL;
  this.spellnum = SPELL_TIME_STOP_ID;
}
ScrollTimeStopTile.prototype = new ScrollItemObject();

// Audachta

function AudachtaNemesosObject() {
  this.addType("Audachta");
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.spelllevel = 0;
  this.spellnum = 0;
  this.flammable = 40;
}
AudachtaNemesosObject.prototype = new ConsumableItemObject();

AudachtaNemesosObject.prototype.getLongDesc = function() {
  let spellname = magic[this.spelllevel][this.spellnum].getName();
  return "Audachta Nemesos: " + spellname + ". A book that teaches the spell " + spellname + " when the spell Audachta Scribe is cast upon the book.";
}

AudachtaNemesosObject.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " is ruined in the fire!");
  let thisx = this.getx();
  let thisy = this.gety();
  
  let itsmap = this.getHomeMap();
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap,thisx,thisy);
  
  return 1; 
}

function AudachtaNemesosDisarmTrapTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosDisarmTrap";
  this.desc = "Audachta Nemesos: Disarm Trap";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_DISARM_TRAP_LEVEL;
  this.spellnum = SPELL_DISARM_TRAP_ID;
  this.spellname = "Disarm Trap";
}
AudachtaNemesosDisarmTrapTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosDistractTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosDistract";
  this.desc = "Audachta Nemesos: Distract";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_DISTRACT_LEVEL;
  this.spellnum = SPELL_DISTRACT_ID;
  this.spellname = "Distract";
}
AudachtaNemesosDistractTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFlameBladeTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosFlameBlade";
  this.desc = "Audachta Nemesos: Flame Blade";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_FLAME_BLADE_LEVEL;
  this.spellnum = SPELL_FLAME_BLADE_ID;
  this.spellname = "Flame Blade";
}
AudachtaNemesosFlameBladeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosMagicBoltTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosMagicBolt";
  this.desc = "Audachta Nemesos: Magic Bolt";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_MAGIC_BOLT_LEVEL;
  this.spellnum = SPELL_MAGIC_BOLT_ID;
  this.spellname = "Magic Bolt";
}
AudachtaNemesosMagicBoltTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosVulnerabilityTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosVulnerability";
  this.desc = "Audachta Nemesos: Vulnerability";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_VULNERABILITY_LEVEL;
  this.spellnum = SPELL_VULNERABILITY_ID;
  this.spellname = "Vulnerability";
}
AudachtaNemesosVulnerabilityTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosIronFleshTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosIronFlesh";
  this.desc = "Audachta Nemesos: Iron Flesh";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_IRON_FLESH_LEVEL;
  this.spellnum = SPELL_IRON_FLESH_ID;
  this.spellname = "Iron Flesh";
}
AudachtaNemesosIronFleshTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosLesserHealTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosLesserHeal";
  this.desc = "Audachta Nemesos: Lesser Heal";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_LESSER_HEAL_LEVEL;
  this.spellnum = SPELL_LESSER_HEAL_ID;
  this.spellname = "Lesser Heal";
}
AudachtaNemesosLesserHealTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosPoisonCloudTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosPoisonCloud";
  this.desc = "Audachta Nemesos: Poison Cloud";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_POISON_CLOUD_LEVEL;
  this.spellnum = SPELL_POISON_CLOUD_ID;
  this.spellname = "Poison Cloud";
}
AudachtaNemesosPoisonCloudTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosProtectionTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosProtection";
  this.desc = "Audachta Nemesos: Protection";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_PROTECTION_LEVEL;
  this.spellnum = SPELL_PROTECTION_ID;
  this.spellname = "Protection";
}
AudachtaNemesosProtectionTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosUnlockTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosUnlock";
  this.desc = "Audachta Nemesos: Unlock";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_UNLOCK_LEVEL;
  this.spellnum = SPELL_UNLOCK_ID;
  this.spellname = "Unlock";
}
AudachtaNemesosUnlockTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosWindChangeTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosWindChange";
  this.desc = "Audachta Nemesos: Wind Change";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_WIND_CHANGE_LEVEL;
  this.spellnum = SPELL_WIND_CHANGE_ID;
  this.spellname = "Wind Change";
}
AudachtaNemesosWindChangeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosDisruptUndeadTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosDisruptUndead";
  this.desc = "Audachta Nemesos: Disrupt Undead";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_DISRUPT_UNDEAD_LEVEL;
  this.spellnum = SPELL_DISRUPT_UNDEAD_ID;
  this.spellname = "Disrupt Undead";
}
AudachtaNemesosDisruptUndeadTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFireArmorTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosFireArmor";
  this.desc = "Audachta Nemesos: Fire Armor";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_FIRE_ARMOR_LEVEL;
  this.spellnum = SPELL_FIRE_ARMOR_ID;
  this.spellname = "Fire Armor";
}
AudachtaNemesosFireArmorTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosIceballTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosIceball";
  this.desc = "Audachta Nemesos: Iceball";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_ICEBALL_LEVEL;
  this.spellnum = SPELL_ICEBALL_ID;
  this.spellname = "Iceball";
}
AudachtaNemesosIceballTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTelekinesisTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosTelekinesis";
  this.desc = "Audachta Nemesos: Telekinesis";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_TELEKINESIS_LEVEL;
  this.spellnum = SPELL_TELEKINESIS_ID;
  this.spellname = "Telekinesis";
}
AudachtaNemesosTelekinesisTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTelepathyTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosTelepathy";
  this.desc = "Audachta Nemesos: Telepathy";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_TELEPATHY_LEVEL;
  this.spellnum = SPELL_TELEPATHY_ID;
  this.spellname = "Telepathy";
}
AudachtaNemesosTelepathyTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosWallOfFlameTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosWallOfFlame";
  this.desc = "Audachta Nemesos: Wall of Flame";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_WALL_OF_FLAME_LEVEL;
  this.spellnum = SPELL_WALL_OF_FLAME_ID;
  this.spellname = "Wall of Flame";
}
AudachtaNemesosWallOfFlameTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosBlessingTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosBlessing";
  this.desc = "Audachta Nemesos: Blessing";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_BLESSING_LEVEL;
  this.spellnum = SPELL_BLESSING_ID;
  this.spellname = "Blessing";
}
AudachtaNemesosBlessingTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosHealTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosHeal";
  this.desc = "Audachta Nemesos: Heal";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_HEAL_LEVEL;
  this.spellnum = SPELL_HEAL_ID;
  this.spellname = "Heal";
}
AudachtaNemesosHealTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosLifeDrainTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosLifeDrain";
  this.desc = "Audachta Nemesos: Life Drain";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_LIFE_DRAIN_LEVEL;
  this.spellnum = SPELL_LIFE_DRAIN_ID;
  this.spellname = "Life Drain";
}
AudachtaNemesosLifeDrainTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosSmiteTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosSmite";
  this.desc = "Audachta Nemesos: Smite";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_SMITE_LEVEL;
  this.spellnum = SPELL_SMITE_ID;
  this.spellname = "Smite";
}
AudachtaNemesosSmiteTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosOpenGateTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosOpenGate";
  this.desc = "Audachta Nemesos: Open Gate";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_OPEN_GATE_LEVEL;
  this.spellnum = SPELL_OPEN_GATE_ID;
  this.spellname = "Open Gate";
}
AudachtaNemesosOpenGateTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosCrystalTrapTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosCrystalTrap";
  this.desc = "Audachta Nemesos: Crystal Trap";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_CRYSTAL_TRAP_LEVEL;
  this.spellnum = SPELL_CRYSTAL_TRAP_ID;
  this.spellname = "Crystal Trap";
}
AudachtaNemesosCrystalTrapTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosMirrorWardTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosMirrorWard";
  this.desc = "Audachta Nemesos: Mirror Ward";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_MIRROR_WARD_LEVEL;
  this.spellnum = SPELL_MIRROR_WARD_ID;
  this.spellname = "Mirror Ward";
}
AudachtaNemesosMirrorWardTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosParalyzeTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosParalyze";
  this.desc = "Audachta Nemesos: Paralyze";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_PARALYZE_LEVEL;
  this.spellnum = SPELL_PARALYZE_ID;
  this.spellname = "Paralyze";
}
AudachtaNemesosParalyzeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosReturnTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosReturn";
  this.desc = "Audachta Nemesos: Return";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_RETURN_LEVEL;
  this.spellnum = SPELL_RETURN_ID;
  this.spellname = "Return";
}
AudachtaNemesosReturnTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosShockwaveTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosShockwave";
  this.desc = "Audachta Nemesos: Shockwave";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_SHOCKWAVE_LEVEL;
  this.spellnum = SPELL_SHOCKWAVE_ID;
  this.spellname = "Shockwave";
}
AudachtaNemesosShockwaveTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosSummonAllyTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosSummonAlly";
  this.desc = "Audachta Nemesos: Summon Ally";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_SUMMON_ALLY_LEVEL;
  this.spellnum = SPELL_SUMMON_ALLY_ID;
  this.spellname = "Summon Ally";
}
AudachtaNemesosSummonAllyTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosSwordstrikeTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosSwordstrike";
  this.desc = "Audachta Nemesos: Swordstrike";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_SWORDSTRIKE_LEVEL;
  this.spellnum = SPELL_SWORDSTRIKE_ID;
  this.spellname = "Swordstrike";
}
AudachtaNemesosSwordstrikeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosEmpowerTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosEmpower";
  this.desc = "Audachta Nemesos: Empower";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_EMPOWER_LEVEL;
  this.spellnum = SPELL_EMPOWER_ID;
  this.spellname = "Empower";
}
AudachtaNemesosEmpowerTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosExplosionTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosExplosion";
  this.desc = "Audachta Nemesos: Explosion";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_EXPLOSION_LEVEL;
  this.spellnum = SPELL_EXPLOSION_ID;
  this.spellname = "Explosion";
}
AudachtaNemesosExplosionTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosJinxTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosJinx";
  this.desc = "Audachta Nemesos: Jinx";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_JINX_LEVEL;
  this.spellnum = SPELL_JINX_ID;
  this.spellname = "Jinx";
}
AudachtaNemesosJinxTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosNegateMagicTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosNegateMagic";
  this.desc = "Audachta Nemesos: Negate Magic";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_NEGATE_MAGIC_LEVEL;
  this.spellnum = SPELL_NEGATE_MAGIC_ID;
  this.spellname = "Negate Magic";
}
AudachtaNemesosNegateMagicTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTremorTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosTremor";
  this.desc = "Audachta Nemesos: Tremor";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_TREMOR_LEVEL;
  this.spellnum = SPELL_TREMOR_ID;
  this.spellname = "Tremor";
}
AudachtaNemesosTremorTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosWeatherControlTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosWeatherControl";
  this.desc = "Audachta Nemesos: Weather Control";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_WEATHER_CONTROL_LEVEL;
  this.spellnum = SPELL_WEATHER_CONTROL_ID;
  this.spellname = "Weather Control";
}
AudachtaNemesosWeatherControlTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosCharmTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosCharm";
  this.desc = "Audachta Nemesos: Charm";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_CHARM_LEVEL;
  this.spellnum = SPELL_CHARM_ID;
  this.spellname = "Charm";
}
AudachtaNemesosCharmTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFearTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosFear";
  this.desc = "Audachta Nemesos: Fear";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_FEAR_LEVEL;
  this.spellnum = SPELL_FEAR_ID;
  this.spellname = "Fear";
}
AudachtaNemesosFearTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFireAndIceTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosFireAndIce";
  this.desc = "Audachta Nemesos: Fire and Ice";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_FIRE_AND_ICE_LEVEL;
  this.spellnum = SPELL_FIRE_AND_ICE_ID;
  this.spellname = "Fire and Ice";
}
AudachtaNemesosFireAndIceTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosInvulnerabilityTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosInvulnerability";
  this.desc = "Audachta Nemesos: Invulnerability";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_INVULNERABILITY_LEVEL;
  this.spellnum = SPELL_INVULNERABILITY_ID;
  this.spellname = "Invulnerability";
}
AudachtaNemesosInvulnerabilityTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosMeteorSwarmTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosMeteorSwarm";
  this.desc = "Audachta Nemesos: Meteor Swarm";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_METEOR_SWARM_LEVEL;
  this.spellnum = SPELL_METEOR_SWARM_ID;
  this.spellname = "Meteor Swarm";
}
AudachtaNemesosMeteorSwarmTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosMindBlastTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosMindBlast";
  this.desc = "Audachta Nemesos: Mind Blast";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_MIND_BLAST_LEVEL;
  this.spellnum = SPELL_MIND_BLAST_ID;
  this.spellname = "Mind Blast";
}
AudachtaNemesosMindBlastTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosPermanenceTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosPermanence";
  this.desc = "Audachta Nemesos: Permanence";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_PERMANENCE_LEVEL;
  this.spellnum = SPELL_PERMANENCE_ID;
  this.spellname = "Permanence";
}
AudachtaNemesosPermanenceTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosArrowOfGlassTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosArrowOfGlass";
  this.desc = "Audachta Nemesos: Arrow of Glass";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_ARROW_OF_GLASS_LEVEL;
  this.spellnum = SPELL_ARROW_OF_GLASS_ID;
  this.spellname = "Arrow of Glass";
}
AudachtaNemesosArrowOfGlassTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosBuildGateTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosBuildGate";
  this.desc = "Audachta Nemesos: Build Gate";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_BUILD_GATE_LEVEL;
  this.spellnum = SPELL_BUILD_GATE_ID;
  this.spellname = "Build Gate";
}
AudachtaNemesosBuildGateTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosConflagrationTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosConflagration";
  this.desc = "Audachta Nemesos: Conflagration";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_CONFLAGRATION_LEVEL;
  this.spellnum = SPELL_CONFLAGRATION_ID;
  this.spellname = "Conflagration";
}
AudachtaNemesosConflagrationTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosConjureDaemonTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosConjureDaemon";
  this.desc = "Audachta Nemesos: Conjure Daemon";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_CONJURE_DAEMON_LEVEL;
  this.spellnum = SPELL_CONJURE_DAEMON_ID;
  this.spellname = "Conjure Daemon";
}
AudachtaNemesosConjureDaemonTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosQuicknessTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosQuickness";
  this.desc = "Audachta Nemesos: Quickness";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_QUICKNESS_LEVEL;
  this.spellnum = SPELL_QUICKNESS_ID;
  this.spellname = "Quickness";
}
AudachtaNemesosQuicknessTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosReincarnateTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosReincarnate";
  this.desc = "Audachta Nemesos: Reincarnate";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_REINCARNATE_LEVEL;
  this.spellnum = SPELL_REINCARNATE_ID;
  this.spellname = "Reincarnate";
}
AudachtaNemesosReincarnateTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTimeStopTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosTimeStop";
  this.desc = "Audachta Nemesos: Time Stop";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_TIME_STOP_LEVEL;
  this.spellnum = SPELL_TIME_STOP_ID;
  this.spellname = "Time Stop";
}
AudachtaNemesosTimeStopTile.prototype = new AudachtaNemesosObject();

// Prototype for armor and weapons

function EquipableItemObject() {
  this.addType("equipable");	
  this.equippedTo;
  this.toHitBonus = 0;
}
EquipableItemObject.prototype = new ItemObject();

EquipableItemObject.prototype.getEquippedTo = function() {
  return this.equippedTo;
}

EquipableItemObject.prototype.setEquippedTo = function(newwho) {
  if (newwho) {
    this.equippedTo = newwho;
    return 1;
  }
  this.equippedTo = "";
  return 0;
}

EquipableItemObject.prototype.equipMe = function(who) {
  if (!who.checkType("npc")) { return 0; }
  
  if (this.checkType("Armor")) {
    if (who.getStr() < this.getStrReq()) {
      return 0;
    }
    let currentarmor = who.getArmor();
    if (currentarmor && (currentarmor !== this)) {
      currentarmor.unEquipMe();
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    who.setEquipment("armor",this);
  }
  
  else if (this.checkType("Missile")) {
    if (who.getDex() < this.getDexReq()){
      return 0;
    }
    let currentmissile = who.getMissile();
    if (currentmissile && (currentmissile !== this)) {
      currentmissile.unEquipMe();
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    who.setEquipment("missile",this);
  }

  else if (this.checkType("Weapon")) {
    let currentweapon = who.getWeapon();
    if (currentweapon && (currentweapon !== this)) {
      currentweapon.unEquipMe();
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    who.setEquipment("weapon",this);
  }

  else if (this.checkType("Amulet")) {
    let currentamulet = who.getEquipment("amulet");
    if (currentamulet && (currentamulet !== this)){
      currentamulet.unEquipMe();
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    who.setEquipment("amulet",this);
  }

  else if (this.checkType("Circlet")) {
    let currentcirclet = who.getEquipment("circlet");
    if (currentcirclet && (currentcirclet !== this)){
      currentcirclet.unEquipMe();
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    who.setEquipment("circlet",this);
  }

  else if (this.checkType("Cloak")) {
    let currentcloak = who.getEquipment("cloak");
    if (currentcloak && (currentcloak !== this)){
      currentcloak.unEquipMe();
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    who.setEquipment("cloak",this);
  }

  else if (this.checkType("Ring")) {
    let currentring1 = who.getEquipment("ring1");
    let currentring2 = who.getEquipment("ring2"); 
    // let's be honest, it would be better to set this up as an array or something,
    // and ideally if you tried to wear a ring while you already had 2 on, it would
    // ask you which to take off. But I plan to only have 2 rings in DU, so I'm 
    // gonna save time now, and refactor this for the next version later.

    if ((currentring1 !== this) && (currentring2 !== this) && currentring1 && currentring2) {
      currentring1.unEquipMe(); // this should move ring2 to ring1
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    if (who.getEquipment("ring1")) { 
      who.setEquipment("ring2", this);
    } else { who.setEquipment("ring1", this); }
  }

  if (this.wornlayer && (who === PC)) {
    let wln = this.wornlayername;
    if (this.wornlayer === "mainhand") {
      if (PC.skintone === 1) { wln += "Pale"; }
      else { wln += "Dark"; }
    }
    PC.wornlayers[this.wornlayer] = wln;
    PC.makeLayers();
    DrawMainFrame("one",PC.getHomeMap(),PC.getx(),PC.gety());
  }
  return 1;
}

EquipableItemObject.prototype.unEquipMe = function() {
  let who = this.getEquippedTo();
  if (!who) { return 0; }
  if (!who.checkType("npc")) { return 0; }  
  
  if (this.checkType("Armor")) {
    if (who.getArmor() === this) {
      who.setEquipment("armor","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else { 
      return 0;
    }
  }
  else if (this.checkType("Weapon")) {
    if (who.getWeapon() === this) {
      who.setEquipment("weapon","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else {
      return 0;
    }
  }
  else if (this.checkType("Missile")) {
    if (who.getMissile() === this) {
      who.setEquipment("missile","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else {
      return 0;
    }    
  }
  else if (this.checkType("Circlet")) {
    if (who.getEquipment("circlet") === this) {
      who.setEquipment("circlet","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else {
      return 0;
    }    
  }
  else if (this.checkType("Cloak")) {
    if (who.getEquipment("cloak") === this) {
      who.setEquipment("cloak","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else {
      return 0;
    }    
  }
  else if (this.checkType("Amulet")) {
    if (who.getEquipment("amulet") === this) {
      who.setEquipment("amulet","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else {
      return 0;
    }    
  }
  else if (this.checkType("Ring")) {
    if (who.getEquipment("ring2") === this) {
      who.setEquipment("ring2","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else if (who.getEquipment("ring1") === this) {
      who.setEquipment("ring1", who.getEquipment("ring2"));
      who.setEquipment("ring2", "");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else {
      return 0;
    }    
  }
  this.setEquippedTo("");
  return 1;
}

EquipableItemObject.prototype.use = function(who) {
  let success = this.equipMe(PC);
  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "";
  if (this.checkType("Armor")) { 
    if (success) { retval["txt"] = "Worn!"; }
    else { retval["txt"] = "You are not strong enough to wear that."; return retval; }
  }
  else { 
    if (success) { retval["txt"] = "Wielded!"; }
    else { retval["txt"] = "You are not agile enough to equip that."; return retval; }
  }

  return retval;
}

EquipableItemObject.prototype.getToHitBonus = function() {
  return this.toHitBonus;
}

EquipableItemObject.prototype.setToHitBonus = function(newbonus) {
  if (newbonus) {
    newbonus = parseInt(newbonus, 10);
    if (isNaN(newbonus)) {
      newbonus = 0;
    }
    this.toHitBonus = newbonus;
  }
  return this.toHitBonus;
}

// TRINKETS

function RingOfFireResistTile() {
  //Graphics Upgraded
  this.name = "RingOfFireResist";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -21*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Ring of Fire Resistance";
  this.prefix = "a";
  this.longdesc = "A ring that confers some resistance to fire.";
  this.addType("Ring");
}
RingOfFireResistTile.prototype = new EquipableItemObject();

RingOfFireResistTile.prototype.onGet = function(who) {
  this.equipMe(who);

  return {};
}

RingOfFireResistTile.prototype.onEquip = function(who) {
  if (!who.resists.hasOwnProperty("fire")) { who.resists.fire = 33; }
  else { who.resists.fire += 33; }
  maintext.delayedAddText("You place the ring on your finger, and a chill feeling sweeps through you. You are more resistant to fire.");

  return {};
}

RingOfFireResistTile.prototype.onUnequip = function(who) {
  who.resists.fire -= 33; 
  maintext.delayedAddText("You remove the ring from your finger. You are less resistant to fire.");
}

function RingOfEtherealFocusTile() {
  //Graphics Upgraded
  this.name = "RingOfEtherealFocus";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -21*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Ring of Ethereal Focus";
  this.prefix = "a";
  this.longdesc = "A ring that provides mana as enemies are slain with magic.";
  this.addType("Ring");
}
RingOfEtherealFocusTile.prototype = new EquipableItemObject();

RingOfEtherealFocusTile.prototype.onGet = function(who) {
  this.equipMe(who);

  return {};
}

RingOfEtherealFocusTile.prototype.onEquip = function(who) {  
  maintext.delayedAddText("You place the ring on your finger, and you can feel a strange power flowing through it.");
}

RingOfEtherealFocusTile.prototype.onUnequip = function(who) {
  maintext.delayedAddText("You remove the ring of ethereal focus. You feel briefly lightheaded as your connection to its power ceases.");
}

RingOfEtherealFocusTile.prototype.killed = function(who) {
  let hps = who.getHitBySpell();
  let restoredmana = 0;
  if (hps) {
    let chance = parseInt((hps/4) * 100);
    while (chance >= 100) { restoredmana++; chance -= 100; }
    if (chance > 0) { 
      if (Dice.roll("1d100") <= chance) { restoredmana++; }
    }
    if (restoredmana) {
      maintext.delayedAddText("The Ring of Ethereal Focus restores " + restoredmana + " mana to you!");
      let wearer = this.getEquippedTo();
      wearer.modMana(restoredmana);
      if (wearer.getMana() > wearer.getMaxMana()) { wearer.setMana(wearer.getMaxMana()); }
    }
  }
}

function AmuletOfReflectionsTile() {
  //Graphics Upgraded
  this.name = "AmuletOfReflections";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Amulet of Reflections";
  this.prefix = "an";
  this.longdesc = "A gold amulet, inscribed with magical runes.";
  this.usedesc = "Attempt the ritual of the Abyss.";
  this.addType("Quest");
  this.addType("Amulet");
}
AmuletOfReflectionsTile.prototype = new EquipableItemObject();

AmuletOfReflectionsTile.prototype.use = function(who) {
  let themap = who.getHomeMap();
  let retval = {};
  if (DU.gameflags.getFlag("pc_abyss")) {
    retval["txt"] = "You have already crossed the Great Abyss.";
    retval["fin"] = 1;
    return retval;
  }
  let standbefore = themap.getTile(who.getx(), who.gety()-1);
  let ismirror = standbefore.getTopFeature();
  if (ismirror) {
    if (ismirror.getName() === "Mirror") {
      // you are in the right map standing at the right place. GO.
      // remove buffs/debuffs - doesn't cure poison, I guess you can die of
      // poison while your mind is elsewhere? Don't do it, people.
      let effects = who.getSpellEffects();
      for (let i=0;i<effects.length;i++) {
        if ((effects[i].getLevel() > 0) && (effects[i].getExpiresTime() > -1)) {
          effects[i].endEffect();
        }
      };
      gamestate.setMode("null");
      FadeOut();
      setTimeout(function() {
        let newmap = new GameMap();
        if (maps.getMap("abyss0")) {
          newmap = maps.getMap("abyss0");
        } else {
          newmap = maps.addMap("abyss0");
        }
        who.preabyssmap = who.getHomeMap().getName();
        who.preabyssx = who.getx();
        who.preabyssy = who.gety();
        who.preabysshp = who.getHP();
        who.setHP(who.getMaxHP());
        DrawCharFrame();
        MoveBetweenMaps(who,themap,newmap,8,8);
        DrawMainFrame("draw",newmap,8,8);
        FadeIn(2000);
        setTimeout(function() {
          gamestate.setMode("player");
          maintext.addText('You hear a voice in your mind: "In the beginning of the journey of knowledge, the mind is a blank. The landscape, featureless and empty."');
        },2000);
      }, 2000);
      retval["txt"] = "The room fades to black around you as your mind accepts the challenge of the Stygian Abyss.";
      retval["fin"] = -2;
      DUPlaySound("sfx_spellcast");
      return retval;
    }
  }
  retval["txt"] = "Nothing happens here.";
  retval["fin"] = 1;
  return retval;
}

function JadeNecklaceTile() {
  //Graphics Upgraded
  this.name = "JadeNecklace";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -35*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "jade necklace";
  this.longdesc = "A pendant bearing a shard of jade, said to bring luck.";
  this.addType("Amulet");
}
JadeNecklaceTile.prototype = new EquipableItemObject();

// ARMOR

function ArmorObject() {
	this.defense = 0;
	this.absorb = 0;
	this.resist = 0;
	this.strReq = 0;
	
	this.addType("Armor");
}
ArmorObject.prototype = new EquipableItemObject();

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
  this.defense = 0;
  this.absorb = 0;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "0";
  this.desc = "natural armor";
}
NaturalArmorTile.prototype = new ArmorObject();

function ClothArmorTile() {
  //Graphics Upgraded
	this.name = "ClothArmor";
	this.defense = 5;
	this.absorb = 10;
  this.graphic = "static.png";
	this.spritexoffset = -7*32;
	this.spriteyoffset = -70*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "cloth armor";
  this.longdesc = "A suit of cloth armor. Better than nothing.";
  this.usedesc = "Equip the armor.";

  this.wornlayer = "body";
  this.wornlayername = "WhiteTunic";
}
ClothArmorTile.prototype = new ArmorObject();

function LeatherArmorTile() {
  //Graphics Upgraded
	this.name = "LeatherArmor";
	this.defense = 10;
	this.absorb = 20;
	this.resist = 10;
  this.graphic = "static.png";
	this.spritexoffset = -8*32;
	this.spriteyoffset = -70*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "leather armor";
  this.longdesc = "A suit of leather armor. Provides some protection.";
  this.usedesc = "Equip the armor.";

  this.wornlayer = "body";
  this.wornlayername = "LeatherArmor";
}
LeatherArmorTile.prototype = new ArmorObject();

function ChainArmorTile() {
  //Graphics Upgraded
	this.name = "ChainArmor";
	this.defense = 20;
	this.absorb = 33;
	this.resist = 10;
	this.strReq = 14;
  this.graphic = "static.png";
	this.spritexoffset = -9*32;
	this.spriteyoffset = -70*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "chain mail armor";
  this.longdesc = "A suit of chain mail. Requires a 14 Strength to wear.";
  this.usedesc = "Equip the armor.";

  this.wornlayer = "body";
  this.wornlayername = "ChainMail";
}
ChainArmorTile.prototype = new ArmorObject();

function PlateArmorTile() {
  //Graphics Upgraded
	this.name = "PlateArmor";
	this.defense = 35;
	this.absorb = 50;
	this.resist = 15;
	this.strReq = 18;
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -71*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "plate armor";
  this.longdesc = "A suit of plate armor. Requires a 18 Strength to wear.";
  this.usedesc = "Equip the armor.";

  this.wornlayer = "body";
  this.wornlayername = "PlateWhiteTabard";
}
PlateArmorTile.prototype = new ArmorObject();

function ExoticArmorTile() {
	this.name = "ExoticArmor";
	this.defense = 40;
	this.absorb = 60;
  this.resist = 40;
  this.strReq = 16;
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -100*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "exotic armor";
  this.longdesc = "A suit of exotic armor, magically crafted by you. Requires a 16 Strength to wear.";
  this.usedesc = "Equip the armor.";

  ManualAnimation.call(this, { animstart: -128,
    animlength: 4,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });

  this.wornlayer = "body";
  this.wornlayername = "PlateWhiteTabard";
}
ExoticArmorTile.prototype = new ArmorObject();

// WEAPONS

function WeaponObject() {
	this.hit = 0;
	this.reduceArmor = 0;
	this.damage = "1d1+0";
	this.strdamage = 0;
	this.hitSound = "";
	this.attackSound = "";
  
  this.usedesc = "Ready the weapon.";
	this.addType("Weapon");
}
WeaponObject.prototype = new EquipableItemObject();

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
  let dmgobj = Dice.parse(this.getDamage());
  
  return dmgobj;
}

WeaponObject.prototype.rollDamage = function(wielder) {
  let damage = Dice.roll(this.getDamage());
  if (wielder && this.getStrDamage()) {
    let str = wielder.getStr();
    let strmod = parseFloat(this.getStrDamage());
    let strdam = (str-10)*strmod;
    damage += parseInt(strdam);
  }
  
  return damage;
}

WeaponObject.prototype.getAveDamage = function(wielder) {
  let damage = Dice.rollave(this.getDamage());
  if (wielder && this.getStrDamage()) {
    let str = wielder.getStr();
    let strmod = parseFloat(this.getStrDamage());
    let strdam = (str-10)*strmod;
    damage += parseInt(strdam);
  }
  return damage;
}

WeaponObject.prototype.getAttackSound = function() {
	return this.attackSound;
}

WeaponObject.prototype.setAttackSound = function(newsnd) {
	this.attackSound = newsnd;
	return this.attackSound;
}

WeaponObject.prototype.getHitSound = function() {
	return this.hitSound;
}

WeaponObject.prototype.setHitSound = function(newsnd) {
	this.hitSound = newsnd;
	return this.hitSound;
}

WeaponObject.prototype.getLongDesc = function() {
  let longdesc = this.longdesc;
  let avedmg = this.getAveDamage(PC);
  return longdesc.replace("%ave%", avedmg);
}

function FistsTile() {
  //Graphics Upgraded
	this.name = "Fists";
	this.damage = "1d2+0";
	this.strdamage = 1/3;
	this.graphic = "static.png";  // pic of an alternate mace, but never shown to the player anyway
	this.spritexoffset = -8*32;
	this.spriteyoffset = -68*32;
	this.prefix = "your";
	this.desc = "fists";
}
FistsTile.prototype = new WeaponObject();

function DaggerTile() {
  //Graphics Upgraded
	this.name = "Dagger";
	this.damage = "1d4+1";
	this.strdamage = 1/3;
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "dagger";
  this.prefix = "a";
  this.longdesc = "A dagger. In your hands, it does %ave% damage on average.";

  this.wornlayer = "mainhand";
  this.wornlayername = "Dagger";
}
DaggerTile.prototype = new WeaponObject();

function ShortswordTile() {
  //Graphics Upgraded
	this.name = "Shortsword";
	this.damage = "2d4+1";
	this.strdamage = 1/2;
  this.graphic = "static.png";
	this.spritexoffset = -32;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "shortsword";
  this.prefix = "a";
  this.longdesc = "A shortsword. In your hands, it does %ave% damage on average.";

  this.wornlayer = "mainhand";
  this.wornlayername = "Shortsword";
}
ShortswordTile.prototype = new WeaponObject();

function MaceTile() {
  //Graphics Upgraded
	this.name = "Mace";
	this.damage = "2d4+3";
	this.strdamage = 1;
  this.graphic = "static.png";
	this.spritexoffset = -2*32;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "mace";
  this.prefix = "a";
  this.longdesc = "A mace. In your hands, it does %ave% damage on average.";

  this.wornlayer = "mainhand";
  this.wornlayername = "Mace";
}
MaceTile.prototype = new WeaponObject();

function AxeTile() {
  //Graphics Upgraded
	this.name = "Axe";
	this.damage = "2d4+8";
	this.strdamage = 2/3;
  this.graphic = "static.png";
	this.spritexoffset = -3*32;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "axe";
  this.prefix = "an";
  this.longdesc = "An axe. In your hands, it does %ave% damage on average.";

  this.wornlayer = "mainhand";
  this.wornlayername = "Axe";
}
AxeTile.prototype = new WeaponObject();

function LongswordTile() {
  //Graphics Upgraded
	this.name = "Longsword";
	this.damage = "4d4+9";
	this.strdamage = 2/3;
  this.graphic = "static.png";
	this.spritexoffset = -4*32;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "longsword";
  this.prefix = "a";
  this.longdesc = "A longsword. In your hands, it does %ave% damage on average.";

  this.wornlayer = "mainhand";
  this.wornlayername = "Longsword";
}
LongswordTile.prototype = new WeaponObject();

function HalberdTile() {
  //Graphics Upgraded
	this.name = "Halberd";
	this.damage = "5d4+15";
	this.strdamage = 1;
  this.graphic = "static.png";
	this.spritexoffset = -5*32;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "halberd";
  this.prefix = "a";
  this.longdesc = "A halberd. In your hands, it does %ave% damage on average.";

  this.wornlayer = "mainhand";
  this.wornlayername = "Halberd";
}
HalberdTile.prototype = new WeaponObject();

function MagicSwordTile() {
  //Graphics Upgraded
	this.name = "MagicSword";
	this.damage = "5d10+22";
	this.strdamage = 1;
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "static.png";
//	this.spritexoffset = -6*32;
//	this.spriteyoffset = -124*32;
	this.spritexoffset = -2*32;
	this.spriteyoffset = -123*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "magic sword";
  this.prefix = "a";
  this.longdesc = "A magic sword. In your hands, it does %ave% damage on average.";

  ManualAnimation.call(this, { 
    animstart: -6*32,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });

  this.wornlayer = "mainhand";
  this.wornlayername = "SwordFromStone";
}
MagicSwordTile.prototype = new WeaponObject();

function UnenchantedSwordTile() {
  //Graphics Upgraded
  this.name = "UnenchantedSword";
  this.damage = "2d4";  // when fixed, 4d6+10
  this.strdamage = .5;
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -68*32;
  this.desc = "once-enchanted sword";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "an";
  this.longdesc = "Set this during enchantment.";
  
  this.brokendesc = "broken, once-enchanted sword";
  this.repairNeedsInfusion = 1;
  this.enchantable = 1;
  Breakable.call(this,["static.png", "", -7*32, -68*32],1);

  this.wornlayer = "mainhand";
  this.wornlayername = "Longsword";   // isn't a separate graphic for this from other longsword
}
UnenchantedSwordTile.prototype = new WeaponObject();

UnenchantedSwordTile.prototype.getLongDesc = function() {
  if (this.broken) {
    return "A broken sword. Once it was enchanted.";
  }
  return this.longdesc + "In your hands, it deals %ave% damage on average.";
}

UnenchantedSwordTile.prototype.onGet = function(who) {
  DU.gameflags.setFlag("unenchanted_sword",1);

  return {};
}

UnenchantedSwordTile.prototype.onMend = function() {
  this.damage = "4d6+10";
  this.enchantable = 1;
  // only becomes enchantable once you Mend it
  return 1;
}

// LightningSword, FlamingSword, SwordOfDefense, VenomSword ?

function NaturalWeaponTile() {
  //Graphics Upgraded
	this.name = "NaturalWeapon";
	this.damage = "1d5+0";
	this.strdamage = 1;
	this.graphic = "static.png";
	this.spritexoffset = -8*32;
	this.spriteyoffset = -68*32;
	this.desc = "natural weapon";
	this.prefix = "a";
	this.attackSound = "sfx_animal_attack";
}
NaturalWeaponTile.prototype = new WeaponObject();

function MissileWeaponObject() {
	this.dexReq = 10;
	this.range = 14;
	this.ammographic = "ammo.gif";
	this.ammoxoffset = "0";
	this.ammoyoffset = "0";
	this.directionalammo = 0;
	this.ammoReturn = 0;	
	
	this.addType("Missile");
}
MissileWeaponObject.prototype = new WeaponObject();

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

MissileWeaponObject.prototype.getRange = function() {
  return this.range;
}

MissileWeaponObject.prototype.setRange = function(newrange) {
  this.range = newrange;
  return this.range;
}

MissileWeaponObject.prototype.getAmmoGraphic = function(atk,def) {
  let params = {};
  params.graphic = this.ammographic;
  params.yoffset = this.ammoyoffset;
  params.xoffset = this.ammoxoffset;
  params.directionalammo = this.directionalammo;
  return GetEffectGraphic(atk,def,params);
}  

MissileWeaponObject.prototype.getAmmoReturn = function() {
  return this.ammoReturn;
}

function SpellWeaponTile() {
  // This is a fake object just to be passed to onDamaged scripts
	this.name = "SpellWeapon";
	this.damage = "1d2+0";
	this.strdamage = 1/3;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-224";
	this.spriteyoffset = "-32";
	this.prefix = "your";
	this.desc = "you won't see this";
  this.dmgtype = "fire";
}
SpellWeaponTile.prototype = new MissileWeaponObject();

function SlingTile() {
  //Graphics Upgraded
	this.name = "Sling";
	this.damage = "1d3+1";
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -69*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "sling";
  this.prefix = "a";
  this.ammographic = "static.png";
	this.ammoxoffset = -3*32;
  this.ammoyoffset = -69*32;
  this.attackSound = "sfx_sling";
  this.longdesc = "A sling, made of simple leather. In your hands, it does %ave% damage on average.";
}
SlingTile.prototype = new MissileWeaponObject();

function BowTile() {
  //Graphics Upgraded
	this.name = "Bow";
	this.damage = "1d12+1";
  this.graphic = "static.png";
	this.spritexoffset = -32;
	this.spriteyoffset = -69*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.dexReq = 14;
	this.desc = "bow";
  this.prefix = "a";
  this.ammographic = "static.png";
  this.ammoxoffset = 0;
  this.ammoyoffset = -73*32;
  this.directionalammo = 1;
  this.attackSound = "sfx_bow";
  this.longdesc = "A bow. It requires a Dexterity of 14 to use. In your hands, it does %ave% damage on average.";

  this.wornlayer = "mainhand";
  this.wornlayername = "Bow";
}
BowTile.prototype = new MissileWeaponObject();

function CrossbowTile() {
  //Graphics Upgraded
	this.name = "Crossbow";
	this.damage = "4d8+-1";
  this.graphic = "static.png";
	this.spritexoffset = -2*32;
	this.spriteyoffset = -69*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.dexReq = 17;
	this.desc = "crossbow";
	this.prefix = "a";
  this.ammographic = "static.png";
  this.ammoxoffset = 0;
  this.ammoyoffset = -74*32;
  this.directionalammo = 1;
  this.attackSound = "sfx_bow";
  this.longdesc = "A crossbow. It requires a Dexterity of 17 to use. In your hands, it does %ave% damage on average.";

  this.wornlayer = "mainhand";
  this.wornlayername = "Crossbow";
}
CrossbowTile.prototype = new MissileWeaponObject();

function YewWandTile() {
	this.name = "YewWand";
	this.damage = "4d12+0";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -104*32;
	this.desc = "magic wand";
	this.prefix = "a";
  this.ammoxoffset = "-64";
  this.ammoyoffset = "-128";
  this.attackSound = "sfx_wand";
  this.longdesc = "A wand made of yew, which fires bolts of magical energy.";

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });

  this.wornlayer = "mainhand";
  this.wornlayername = "Wand";

}
YewWandTile.prototype = new MissileWeaponObject();

function WandTile() {
  //Graphics Upgraded
	this.name = "Wand";
	this.damage = "4d12+0";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -103*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "magic wand";
	this.prefix = "a";
  this.ammoxoffset = "-64";
  this.ammoyoffset = "-128";
  this.attackSound = "sfx_wand";
  this.longdesc = "A wand that channels thunder. In your hands, it does %ave% damage on average.";
 
  ManualAnimation.call(this, { 
    animstart: -6*32,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 170,
    startframe: "random"
  });

  this.wornlayer = "mainhand";
  this.wornlayername = "Wand";
}
WandTile.prototype = new MissileWeaponObject();

function MagicAxeTile() {
  //Graphics Upgraded
	this.name = "MagicAxe";
	this.damage = "4d12+12";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -105*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.dexReq = 18;
	this.desc = "magic axe";
  this.prefix = "a";
  this.ammographic = "magicaxeammo.gif";
  this.ammoxoffset = 0;
  this.ammoyoffset = 0;
  this.ammoReturn = 1;
  this.attackSound = "sfx_magic_axe";
  this.longdesc = "A magic throwing axe. It requires a Dexterity of 18 to use. In your hands, it does %ave% damage on average.";

  ManualAnimation.call(this, { 
    animstart: -4*32,
    animlength: 5,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 100,
    framedurationmax: 100,
    startframe: "start"
  });

  this.wornlayer = "mainhand";
//  this.wornlayername = "MagicAxe";
}
MagicAxeTile.prototype = new MissileWeaponObject();

function NaturalMissileWeaponTile() {
	this.name = "NaturalMissileWeapon";
	this.damage = "1d12+1";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-64";
	this.desc = "natural missile weapon";
	this.prefix = "a";
  this.ammoxoffset = "-32";
  this.ammoyoffset = "-128";
}
NaturalMissileWeaponTile.prototype = new MissileWeaponObject();

function BoulderWeaponTile() {
  this.name = "BoulderWeapon";
  this.damage = "2d12+3";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-672";
  this.desc = "boulder";
  this.prefix = "a";
  this.ammoxoffset = "0";
  this.ammoyoffset = "0";  // probably not final values
  this.strDamage = 1;  // only missile weapon with a strength bonus
  this.hitSound = "sfx_boulder_hit";
  this.missSouns = "sfx_bounder_miss";
}
BoulderWeaponTile.prototype = new MissileWeaponObject();

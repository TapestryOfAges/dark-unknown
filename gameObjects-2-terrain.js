"use strict";

// And now, on with the show!
// TERRAIN

function TerrainObject() {
  this.addType("Terrain");
  this.combatmap = "";
}

TerrainObject.prototype = new InanimateObject();

TerrainObject.prototype.serialize = function() {
  let name = this.name;
  let myatlas = new Atlas();
  PopulateAtlas(myatlas);
  let code = myatlas.keylookup(name);
  if (code) { return(code); }
  return(0);
}

TerrainObject.prototype.getCombatMap = function() {
  return this.combatmap;
}

TerrainObject.prototype.setCombatMap = function(map) {
  this.combatmap = map;
  return this.combatmap;
}

TerrainObject.prototype.setCombatMapOptions = function(mapnum) {
  this.combatmapoptions = mapnum;
  return this.combatmapoptions;
}

function OceanTile() {
  //Graphics Upgraded
  this.name = "Ocean";
  this.graphic = "water.gif";
  this.desc = "deep water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL;
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
  this.combatmap = "Water";
  this.peerview = "#103cff";
  this.walkSound = "water";

  TilingSpritesheet.call(this, 8,0,1);
}
OceanTile.prototype = new TerrainObject();

function WaterTile() {
  this.name = "Water";
  this.graphic = "water.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -32;
  this.desc = "water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.combatmap = "Water";
  this.peerview = "#128dfe";
  this.walkSound = "water";

  TilingSpritesheet.call(this, 8,0,1);
}
WaterTile.prototype = new TerrainObject();

WaterTile.prototype.walkon = function(walker) {
  let resp = InWater(walker);
  return resp;
}

WaterTile.prototype.idle = function(walker) {
  let resp = InWater(walker);
  return resp;
}

function ShallowsTile() {
  this.name = "Shallows";
  this.graphic = "water.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -2*32;
  this.desc = "shallow water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.combatmap = "Water";
  this.peerview = "#12bbff";
  this.walkSound = "water";

  TilingSpritesheet.call(this, 8,0,1);
}
ShallowsTile.prototype = new TerrainObject();

ShallowsTile.prototype.walkon = function(walker) {
  let resp = InWater(walker);
  return resp;
}

ShallowsTile.prototype.idle = function(walker) {
  let resp = InWater(walker);
  return resp;
}

function StillWaterTile() {
  this.name = "StillWater";
  this.graphic = "WaterCaveSheet.gif";
  this.desc = "stagnant water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
  this.combatmap = "Water";
  this.peerview = "#12bbff";
  this.walkSound = "water";

  TilingSpritesheet.call(this, 8,0,1,3);
}
StillWaterTile.prototype = new TerrainObject();

StillWaterTile.prototype.walkon = function(walker) {
  let resp = InWater(walker);
  return resp;
}

StillWaterTile.prototype.idle = function(walker) {
  let resp = InWater(walker);
  return resp;
}

function InWater(who) {
  let response = {msg:""};
  if (who.getWaiting()) { 
    // entity is waiting and probably had been moved to a water tile 
    // because it was 0x0
    return response;
  }
  let whomov = who.getMovetype();
  if (MOVE_LEVITATE & whomov) {
    // entity is levitating and so won't drown
    return response;
  }  
  if (MOVE_ETHEREAL & whomov) {
    // entity is ethereal and can't drown
    return response;
  }
  if (MOVE_FLY & whomov) {
    // entity is flying and can't drown
    return response;
  }
  let localmap = who.getHomeMap();
  let tile = localmap.getTile(who.getx(),who.gety());
  let feats = tile.getFeatures();
  if (feats) {
    for (let i=0;i<feats.length;i++) {
      if (MOVE_WALK & feats[i].getPassable()) {
        return response;
      }
    }
  }

  let dur = DUTime.getGameClock() - who.getLastTurnTime();
  response.msg = "You have trouble keeping your head above the rough waters!";
  let dmg = dur * 3;
  who.dealDamage(dmg);
  
  return response;
}

function NoBlockMountainTile() {
  //Graphics Upgraded
  this.name = "NoBlockMountain";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -117*32;
  this.desc = "mountains";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#ffffff";
  this.walkSound = "hill";
  TilingSpritesheet.call(this, 2, 1);
}
NoBlockMountainTile.prototype = new TerrainObject();

function MountainTile() {
  //Graphics Upgraded
  this.name = "Mountain";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -117*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#ffffff";
  this.walkSound = "hill";
  TilingSpritesheet.call(this, 2, 1);
}
MountainTile.prototype = new TerrainObject();

function MountainPassTile() {
  //Graphics Upgraded
  this.name = "MountainPass";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -117*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_WALK;
  this.combatmap = "Hill";
  this.peerview = "#ffffff";
  this.walkSound = "hill";
  TilingSpritesheet.call(this, 2, 1);
}
MountainPassTile.prototype = new TerrainObject();

function FlameMountainTile() {
  this.name = "FlameMountain";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -54*32;
  this.desc = "fiery mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#4a110c";
  this.walkSound = "hill";
  TilingSpritesheet.call(this, 2, 1);
}
FlameMountainTile.prototype = new TerrainObject();

function Mountain1Tile() {
  //Graphics Upgraded
  this.name = "Mountain1";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -117*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#ffffff";
  this.walkSound = "hill";
}
Mountain1Tile.prototype = new TerrainObject();

function Mountain2Tile() {
  //Graphics Upgraded
  this.name = "Mountain2";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -117*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#ffffff";
  this.walkSound = "hill";
}
Mountain2Tile.prototype = new TerrainObject();

function FancyFloorTile() {
  //Graphics Upgraded
  this.name = "FancyFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "floor";
  this.peerview = "#128dfe";
  this.walkSound = "stone";
}
FancyFloorTile.prototype = new TerrainObject();

function FancyFloor2Tile() {
  //Graphics Upgraded
  this.name = "FancyFloor2";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "floor";
  this.peerview = "#128dfe";
  this.walkSound = "stone";
}
FancyFloor2Tile.prototype = new TerrainObject();

function FancyFloor3Tile() {
  //Graphics Upgraded
  this.name = "FancyFloor3";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "floor";
  this.peerview = "#128dfe";
  this.walkSound = "stone";
}
FancyFloor3Tile.prototype = new TerrainObject();

function BlankBlackTile() {
  //Graphics upgraded
  this.name = "BlankBlack";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -97*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.desc = "darkness";
  this.peerview = "#000000";
}
BlankBlackTile.prototype = new TerrainObject();

function ChasmTile() {
  // Graphics upgraded
  this.name = "Chasm";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -97*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chasm";
  this.peerview = "#000000";
}
ChasmTile.prototype = new TerrainObject();

function DarknessTile() {
  // Graphics upgraded
  this.name = "Darkness";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -97*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "darkness";
  this.peerview = "#000000";
}
DarknessTile.prototype = new TerrainObject();

function ShinyWallTile() {
  //Graphics Upgraded. Actually, new.
  this.name = "ShinyWall";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#ffffff";
}
ShinyWallTile.prototype = new TerrainObject();

function OffwhiteWallTile() {
  //Graphics Upgraded. Actually, new.
  this.name = "OffwhiteWall";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#ffffff";
}
OffwhiteWallTile.prototype = new TerrainObject();

function WallTile() {
  //Graphics Upgraded
  this.name = "Wall";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#ffffff";
}
WallTile.prototype = new TerrainObject();

function FireplaceWallTile() {
  //Graphics Upgraded
  this.name = "FireplaceWall";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#ffffff";
}
FireplaceWallTile.prototype = new TerrainObject();

function GreyWallTile() {
  //Graphics Upgraded
  this.name = "GreyWall";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -18*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#c1c1c1";
}
GreyWallTile.prototype = new TerrainObject();

function GreyFireplaceWallTile() {
  //Graphics Upgraded
  this.name = "GreyFireplaceWall";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -18*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#c1c1c1";
}
GreyFireplaceWallTile.prototype = new TerrainObject();

function RuinsWallTile() {
  //Graphics Upgraded
  this.name = "RuinsWall";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#c1c1c1";
}
RuinsWallTile.prototype = new TerrainObject();

function RuinsWallArchTile() {
  //Graphics Upgraded
  this.name = "RuinsWallArch";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -14*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#c1c1c1";
}
RuinsWallArchTile.prototype = new TerrainObject();

function RuinsWallIvyTile() {
  //Graphics Upgraded
  this.name = "RuinsWallIvy";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -14*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#c1c1c1";
}
RuinsWallIvyTile.prototype = new TerrainObject();

function RuinsWallIvy2Tile() {
  //Graphics Upgraded
  this.name = "RuinsWallIvy2";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -14*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#c1c1c1";
}
RuinsWallIvy2Tile.prototype = new TerrainObject();

function IllusionaryRuinsWallTile() {
  //Graphics Upgraded
  this.name = "IllusionaryRuinsWall";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#c1c1c1";
}
IllusionaryRuinsWallTile.prototype = new TerrainObject();

function ArrowSlitTile() {
  //Graphics Upgraded
	this.name = "ArrowSlit";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = { distance : 1 , blocklos : 0 };
	this.blockloe = 1;
	this.loeupclose = {distance : 0 , blocklow : .2 };
	this.prefix = "an";
	this.desc = "arrow slit";
  this.peerview = "#ffffff";
}
ArrowSlitTile.prototype = new TerrainObject();

function GreyArrowSlitTile() {
  //Graphics Upgraded
	this.name = "GreyArrowSlit";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -17*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = { distance : 1 , blocklos : 0 };
	this.blockloe = 1;
	this.loeupclose = {distance : 0 , blocklow : .2 };
	this.prefix = "an";
	this.desc = "arrow slit";
  this.peerview = "#c1c1c1";
}
GreyArrowSlitTile.prototype = new TerrainObject();

function WindowTile() {
  //Graphics Upgraded
	this.name = "Window";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.blockloe = 1;
	this.prefix = "a";
	this.desc = "window";
  this.peerview = "#fffff";
}
WindowTile.prototype = new TerrainObject();

function GreyWindowTile() {
  //Graphics Upgraded
	this.name = "GreyWindow";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -17*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.blockloe = 1;
	this.prefix = "a";
	this.desc = "window";
  this.peerview = "#c1c1c1";
}
GreyWindowTile.prototype = new TerrainObject();

function PlanksNSTile() {
  //Graphics Upgraded
  this.name = "PlanksNS";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#9d5a20";
  this.walkSound = "stone";
}
PlanksNSTile.prototype = new TerrainObject();

function DarkPlanksNSTile() {
  //Graphics Upgraded
  this.name = "DarkPlanksNS";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#9d5a20";
  this.walkSound = "stone";
}
DarkPlanksNSTile.prototype = new TerrainObject();

function RoughPlanksNSTile() {
  //Graphics Upgraded
  this.name = "RoughPlanksNS";
  this.graphic = "static.gif";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#9d5a20";
  this.walkSound = "stone";
}
RoughPlanksNSTile.prototype = new TerrainObject();

function SouthCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "SouthCoastMeadow";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -52*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
}
SouthCoastMeadowTile.prototype = new TerrainObject();

function SouthCoastTile() {
  //Graphics Upgraded
  this.name = "SouthCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -52*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
SouthCoastTile.prototype = new TerrainObject();

function SouthCoastSandTile() {
  //Graphics Upgraded
  this.name = "SouthCoastSand";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -52*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
SouthCoastSandTile.prototype = new TerrainObject();

function SouthCoastDirtTile() {
  //Graphics Upgraded
  this.name = "SouthCoastDirt";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -53*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
SouthCoastDirtTile.prototype = new TerrainObject();

function SouthCoastCaveTile() {
  //Graphics Upgraded
  this.name = "SouthCoastCave";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -53*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
}
SouthCoastCaveTile.prototype = new TerrainObject();

function NorthCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "NorthCoastMeadow";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
}
NorthCoastMeadowTile.prototype = new TerrainObject();

function NorthCoastTile() {
  //Graphics Upgraded
  this.name = "NorthCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
NorthCoastTile.prototype = new TerrainObject();

function NorthCoastSandTile() {
  //Graphics Upgraded
  this.name = "NorthCoastSand";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
NorthCoastSandTile.prototype = new TerrainObject();

function NorthCoastDirtTile() {
  //Graphics Upgraded
  this.name = "NorthCoastDirt";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
NorthCoastDirtTile.prototype = new TerrainObject();

function NorthCoastCaveTile() {
  //Graphics Upgraded
  this.name = "NorthCoastCave";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
}
NorthCoastCaveTile.prototype = new TerrainObject();

function EastCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "EastCoastMeadow";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
}
EastCoastMeadowTile.prototype = new TerrainObject();

function EastCoastTile() {
  //Graphics Upgraded
  this.name = "EastCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
EastCoastTile.prototype = new TerrainObject();

function EastCoastRoadEndTile() {
  //Graphics Upgraded
  this.name = "EastCoastRoadEnd";
}
EastCoastRoadEndTile.prototype = new EastCoastTile();

function EastCoastSandTile() {
  //Graphics Upgraded
  this.name = "EastCoastSand";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
EastCoastSandTile.prototype = new TerrainObject();

function EastCoastDirtTile() {
  //Graphics Upgraded
  this.name = "EastCoastDirt";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
EastCoastDirtTile.prototype = new TerrainObject();

function EastCoastCaveTile() {
  //Graphics Upgraded
  this.name = "EastCoastCave";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
}
EastCoastCaveTile.prototype = new TerrainObject();

function WestCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "WestCoastMeadow";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
}
WestCoastMeadowTile.prototype = new TerrainObject();

function WestCoastTile() {
  //Graphics Upgraded
  this.name = "WestCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
WestCoastTile.prototype = new TerrainObject();

function WestCoastSandTile() {
  //Graphics Upgraded
  this.name = "WestCoastSand";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
WestCoastSandTile.prototype = new TerrainObject();

function WestCoastDirtTile() {
  //Graphics Upgraded
  this.name = "WestCoastDirt";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
WestCoastDirtTile.prototype = new TerrainObject();

function WestCoastCaveTile() {
  //Graphics Upgraded
  this.name = "WestCoastCave";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
}
WestCoastCaveTile.prototype = new TerrainObject();

function NortheastCoastMeadowTile() {
  this.name = "NortheastCoastMeadow";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast.gif";
  this.layers = [["static.gif","",-5*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastMeadowTile.prototype = new TerrainObject();

function NortheastCoastTile() {
  this.name = "NortheastCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast.gif";
  this.layers = [["static.gif","",-6*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastTile.prototype = new TerrainObject();

function NortheastCoastSandTile() {
  this.name = "NortheastCoastSand";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast-sand.gif";
  this.layers = [["static.gif","",-7*32,-51*32]]
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastSandTile.prototype = new TerrainObject();

function NortheastCoastDirtTile() {
  this.name = "NortheastCoastDirt";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast-sand.gif";
  this.layers = [["static.gif","",0,-53*32]]
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastDirtTile.prototype = new TerrainObject();

function NortheastCoastCaveTile() {
  this.name = "NortheastCoastCave";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast-sand.gif";
  this.layers = [["static.gif","",-1*32,-53*32]]
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastCaveTile.prototype = new TerrainObject();

function SouthwestCoastMeadowTile() {
  this.name = "SouthwestCoastMeadow";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "swcoast.gif";
  this.layers = [["static.gif","",-5*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastMeadowTile.prototype = new TerrainObject();

function SouthwestCoastTile() {
  this.name = "SouthwestCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "swcoast.gif";
  this.layers = [["static.gif","",-6*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastTile.prototype = new TerrainObject();

function SouthwestCoastSandTile() {
  this.name = "SouthwestCoastSand";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "swcoast-sand.gif";
  this.layers = [["static.gif","",-7*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastSandTile.prototype = new TerrainObject();

function SouthwestCoastDirtTile() {
  this.name = "SouthwestCoastDirt";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "swcoast-sand.gif";
  this.layers = [["static.gif","",-8*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastDirtTile.prototype = new TerrainObject();

function SouthwestCoastCaveTile() {
  this.name = "SouthwestCoastCave";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "swcoast-sand.gif";
  this.layers = [["static.gif","",-9*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastCaveTile.prototype = new TerrainObject();

function NorthwestCoastMeadowTile() {
  this.name = "NorthwestCoastMeadow";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "nwcoast.gif";
  this.layers = [["static.gif","",0,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastMeadowTile.prototype = new TerrainObject();

function NorthwestCoastTile() {
  this.name = "NorthwestCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "nwcoast.gif";
  this.layers = [["static.gif","",-32,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastTile.prototype = new TerrainObject();

function NorthwestCoastSandTile() {
  this.name = "NorthwestCoastSand";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "nwcoast-sand.gif";
  this.layers = [["static.gif","",-2*32,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastSandTile.prototype = new TerrainObject();

function NorthwestCoastDirtTile() {
  this.name = "NorthwestCoastDirt";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "nwcoast-sand.gif";
  this.layers = [["static.gif","",-3*32,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastDirtTile.prototype = new TerrainObject();

function NorthwestCoastCaveTile() {
  this.name = "NorthwestCoastCave";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "nwcoast-sand.gif";
  this.layers = [["static.gif","",-4*32,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastCaveTile.prototype = new TerrainObject();

function SoutheastCoastMeadowTile() {
  this.name = "SoutheastCoastMeadow";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "secoast.gif";
  this.layers = [["static.gif","",0,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastMeadowTile.prototype = new TerrainObject();

function SoutheastCoastTile() {
  this.name = "SoutheastCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "secoast.gif";
  this.layers = [["static.gif","",-32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastTile.prototype = new TerrainObject();

function SoutheastCoastSandTile() {
  this.name = "SoutheastCoastSand";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "secoast-sand.gif";
  this.layers = [["static.gif","",-2*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastSandTile.prototype = new TerrainObject();

function SoutheastCoastDirtTile() {
  this.name = "SoutheastCoastDirt";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "secoast-sand.gif";
  this.layers = [["static.gif","",-3*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastDirtTile.prototype = new TerrainObject();

function SoutheastCoastCaveTile() {
  this.name = "SoutheastCoastCave";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "secoast-sand.gif";
  this.layers = [["static.gif","",-4*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastCaveTile.prototype = new TerrainObject();

// Lava versions

function SouthLavaCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "SouthLavaCoastMeadow";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -48*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
}
SouthLavaCoastMeadowTile.prototype = new TerrainObject();

function SouthLavaCoastTile() {
  //Graphics Upgraded
  this.name = "SouthLavaCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -48*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
SouthLavaCoastTile.prototype = new TerrainObject();

function SouthLavaCoastSandTile() {
  //Graphics Upgraded
  this.name = "SouthLavaCoastSand";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -48*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
SouthLavaCoastSandTile.prototype = new TerrainObject();

function SouthLavaCoastDirtTile() {
  //Graphics Upgraded
  this.name = "SouthLavaCoastDirt";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -48*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
SouthLavaCoastDirtTile.prototype = new TerrainObject();

function SouthLavaCoastCaveTile() {
  //Graphics Upgraded
  this.name = "SouthLavaCoastCave";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -48*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
}
SouthLavaCoastCaveTile.prototype = new TerrainObject();

function NorthLavaCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "NorthLavaCoastMeadow";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -48*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
}
NorthLavaCoastMeadowTile.prototype = new TerrainObject();

function NorthLavaCoastTile() {
  //Graphics Upgraded
  this.name = "NorthLavaCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -48*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
NorthLavaCoastTile.prototype = new TerrainObject();

function NorthLavaCoastSandTile() {
  //Graphics Upgraded
  this.name = "NorthLavaCoastSand";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -48*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
NorthLavaCoastSandTile.prototype = new TerrainObject();

function NorthLavaCoastDirtTile() {
  //Graphics Upgraded
  this.name = "NorthLavaCoastDirt";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -48*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
NorthLavaCoastDirtTile.prototype = new TerrainObject();

function NorthLavaCoastCaveTile() {
  //Graphics Upgraded
  this.name = "NorthLavaCoastCave";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -48*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
}
NorthLavaCoastCaveTile.prototype = new TerrainObject();

function EastLavaCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "EastLavaCoastMeadow";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -49*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
}
EastLavaCoastMeadowTile.prototype = new TerrainObject();

function EastLavaCoastTile() {
  //Graphics Upgraded
  this.name = "EastLavaCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -49*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
EastLavaCoastTile.prototype = new TerrainObject();

function EastLavaCoastSandTile() {
  //Graphics Upgraded
  this.name = "EastLavaCoastSand";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -49*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
EastLavaCoastSandTile.prototype = new TerrainObject();

function EastLavaCoastDirtTile() {
  //Graphics Upgraded
  this.name = "EastLavaCoastDirt";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -49*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
EastLavaCoastDirtTile.prototype = new TerrainObject();

function EastLavaCoastCaveTile() {
  //Graphics Upgraded
  this.name = "EastLavaCoastCave";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -49*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
}
EastLavaCoastCaveTile.prototype = new TerrainObject();

function WestLavaCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "WestLavaCoastMeadow";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -49*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
}
WestLavaCoastMeadowTile.prototype = new TerrainObject();

function WestLavaCoastTile() {
  //Graphics Upgraded
  this.name = "WestLavaCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -49*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
WestLavaCoastTile.prototype = new TerrainObject();

function WestLavaCoastSandTile() {
  //Graphics Upgraded
  this.name = "WestLavaCoastSand";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -49*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
WestLavaCoastSandTile.prototype = new TerrainObject();

function WestLavaCoastDirtTile() {
  //Graphics Upgraded
  this.name = "WestLavaCoastDirt";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -49*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
WestLavaCoastDirtTile.prototype = new TerrainObject();

function WestLavaCoastCaveTile() {
  //Graphics Upgraded
  this.name = "WestLavaCoastCave";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -49*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#626262";
  this.walkSound = "grass";
}
WestLavaCoastCaveTile.prototype = new TerrainObject();

// End lava versions

function RiverTile() {
  this.name = "River";
  this.layers = [["static.gif", "", -7*32,-42*32]];
  this.graphic = "riverflow.gif";
//  this.graphic = "water.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -32;
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "river";
  this.combatmap = "Water";
  this.peerview = "#12bbff";
  this.walkSound = "water";
  
  SetBySurroundRiver.call(this);
}
RiverTile.prototype = new TerrainObject();

function RiverGrassTile() {
  this.name = "RiverGrass";
  this.layers = [["static.gif", "", -7*32,-42*32]];
}
RiverGrassTile.prototype = new RiverTile();

function RiverDirtTile() {
  this.name = "RiverDirt";
  this.layers = [["static.gif", "", -7*32,-41*32]];
}
RiverDirtTile.prototype = new RiverTile();

function RiverCaveTile() {
  this.name = "RiverCave";
  this.layers = [["static.gif", "", -7*32,-47*32]];
}
RiverCaveTile.prototype = new RiverTile();

function RiverGrassAltTile() {
  this.name = "RiverGrassAlt";
  this.layers = [["static.gif", "", -8*32,-42*32]];
}
RiverGrassAltTile.prototype = new RiverTile();

function RiverDirtAltTile() {
  this.name = "RiverDirtAlt";
  this.layers = [["static.gif", "", -8*32,-41*32]];
}
RiverDirtAltTile.prototype = new RiverTile();

function RiverCaveAltTile() {
  this.name = "RiverCaveAlt";
  this.layers = [["static.gif", "", -8*32,-47*32]];
}
RiverCaveAltTile.prototype = new RiverTile();

function RiverGrassOverrideS_NSTile() {
  this.name = "RiverGrassOverrideS_NS";
  this.layers = [["static.gif", "", -5*32,-42*32]];
}
RiverGrassOverrideS_NSTile.prototype = new RiverTile;

function RiverGrassOverrideS_SNTile() {
  this.name = "RiverGrassOverrideS_SN";
  this.layers = [["static.gif", "", -4*32,-42*32]];
}
RiverGrassOverrideS_SNTile.prototype = new RiverTile;

function RiverGrassOverride_NETile() {
  this.name = "RiverGrassOverride_NE";
  this.layers = [["static.gif", "", -4*32,-45*32]];
}
RiverGrassOverride_NETile.prototype = new RiverTile;

function RiverGrassOverride_EWTile() {
  this.name = "RiverGrassOverride_EW";
  this.layers = [["static.gif", "", -7*32,-42*32]];
}
RiverGrassOverride_EWTile.prototype = new RiverTile;

function RiverGrassOverrideAlt_EWTile() {
  this.name = "RiverGrassOverrideAlt_EW";
  this.layers = [["static.gif", "", -8*32,-42*32]];
}
RiverGrassOverrideAlt_EWTile.prototype = new RiverTile;

function RiverGrassOverride_NSTile() {
  this.name = "RiverGrassOverride_NS";
  this.layers = [["static.gif", "", 0,-42*32]];
}
RiverGrassOverride_NSTile.prototype = new RiverTile;

function RedCobblestoneTile() {
  //Graphics Upgraded
  this.name = "RedCobblestone";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#a51a14";
  this.walkSound = "stone";
}
RedCobblestoneTile.prototype = new TerrainObject();

function BlueCobblestoneTile() {
  //Graphics Upgraded
  this.name = "BlueCobblestone";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#0d2185";
  this.walkSound = "stone";
}
BlueCobblestoneTile.prototype = new TerrainObject();

function BlackCobblestoneTile() {
  //Graphics Upgraded
  this.name = "BlackCobblestone";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#1d1d1d";
  this.walkSound = "stone";
}
BlackCobblestoneTile.prototype = new TerrainObject();

function CrackedBlackCobblestoneTile() {
  //Graphics Upgraded
  this.name = "CrackedBlackCobblestone";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#1d1d1d";
  this.walkSound = "stone";
}
CrackedBlackCobblestoneTile.prototype = new TerrainObject();

function CobblestoneTile() {
  //Graphics Upgraded
  this.name = "Cobblestone";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#772e24";
  this.walkSound = "stone";
}
CobblestoneTile.prototype = new TerrainObject();

function BrokenCobblestoneTile() {
  //Graphics Upgraded
  this.name = "BrokenCobblestone";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#772e24";
  this.walkSound = "stone";
}
BrokenCobblestoneTile.prototype = new TerrainObject();

function FadedCobblestoneTile() {
  //Graphics Upgraded
  this.name = "FadedCobblestone";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#64443f";
  this.walkSound = "stone";
}
FadedCobblestoneTile.prototype = new TerrainObject();

function FadedCobblestone2Tile() {
  //Graphics Upgraded
  this.name = "FadedCobblestone2";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#64443f";
  this.walkSound = "stone";
}
FadedCobblestone2Tile.prototype = new TerrainObject();

// atlas/editor needs start here
function ClayPaversTile() {
  //Graphics Upgraded
  this.name = "ClayPavers";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "clay brick floor";
  this.peerview = "#64443f";
  this.walkSound = "stone";
}
ClayPaversTile.prototype = new TerrainObject();

function FadedWoodNSTile() {
  //Graphics Upgraded
  this.name = "FadedWoodNS";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "wood floor";
  this.peerview = "#c08e5e";
  this.walkSound = "stone";
}
FadedWoodNSTile.prototype = new TerrainObject();

function FadedWoodEWTile() {
  //Graphics Upgraded
  this.name = "FadedWoodEW";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "wood floor";
  this.peerview = "#c08e5e";
  this.walkSound = "stone";
}
FadedWoodEWTile.prototype = new TerrainObject();

function BlueTileFloorTile() {
  //Graphics Upgraded
  this.name = "BlueTileFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "blue tile floor";
  this.peerview = "#476478";
  this.walkSound = "stone";
}
BlueTileFloorTile.prototype = new TerrainObject();

function BlueMarbleTileFloorTile() {
  //Graphics Upgraded
  this.name = "BlueMarbleTileFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#476478";
  this.walkSound = "stone";
}
BlueMarbleTileFloorTile.prototype = new TerrainObject();

function GreenTileFloorTile() {
  //Graphics Upgraded
  this.name = "GreenTileFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#477865";
  this.walkSound = "stone";
}
GreenTileFloorTile.prototype = new TerrainObject();

function GreenCheckeredTileFloorTile() {
  //Graphics Upgraded
  this.name = "GreenCheckeredTileFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#477865";
  this.walkSound = "stone";
}
GreenCheckeredTileFloorTile.prototype = new TerrainObject();

function StonePaverTile() {
  //Graphics Upgraded
  this.name = "StonePaver";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone paver";
  this.peerview = "#959595";
  this.walkSound = "stone";
}
StonePaverTile.prototype = new TerrainObject();

function StonePaver2Tile() {
  //Graphics Upgraded
  this.name = "StonePaver2";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone paver";
  this.peerview = "#959595";
  this.walkSound = "stone";
}
StonePaver2Tile.prototype = new TerrainObject();

function RedTileFloorTile() {
  //Graphics Upgraded
  this.name = "RedTileFloor";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#a95e56";
  this.walkSound = "stone";
}
RedTileFloorTile.prototype = new TerrainObject();

function DarkBlueTileFloorTile() {
  //Graphics Upgraded
  this.name = "DarkBlueTileFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#636899";
  this.walkSound = "stone";
}
DarkBlueTileFloorTile.prototype = new TerrainObject();

function BrokenTileFloorTile() {
  //Graphics Upgraded
  this.name = "BrokenTileFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#64443f";
  this.walkSound = "stone";
}
BrokenTileFloorTile.prototype = new TerrainObject();

function GreyTileFloorTile() {
  //Graphics Upgraded
  this.name = "GreyTileFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#959595";
  this.walkSound = "stone";
}
GreyTileFloorTile.prototype = new TerrainObject();

function FadedFancyFloorTile() {
  //Graphics Upgraded
  this.name = "FadedFancyFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#477865";
  this.walkSound = "stone";
}
FadedFancyFloorTile.prototype = new TerrainObject();

function FadedFancyFloor2Tile() {
  //Graphics Upgraded
  this.name = "FadedFancyFloor2";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#8d7058";
  this.walkSound = "stone";
}
FadedFancyFloor2Tile.prototype = new TerrainObject();

function FadedFancyFloor3Tile() {
  //Graphics Upgraded
  this.name = "FadedFancyFloor3";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#8d7058";
  this.walkSound = "stone";
}
FadedFancyFloor3Tile.prototype = new TerrainObject();

function CrackedStoneFloorTile() {
  //Graphics Upgraded
  this.name = "CrackedStoneFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#66756d";
  this.walkSound = "stone";
}
CrackedStoneFloorTile.prototype = new TerrainObject();

function FadedDarkWoodNSTile() {
  //Graphics Upgraded
  this.name = "FadedDarkWoodNS";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#9e8c74";
  this.walkSound = "stone";
}
FadedDarkWoodNSTile.prototype = new TerrainObject();

function CobblestoneRoadTile() {
  //Graphics Upgraded
  this.name = "CobblestoneRoad";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#772e24";
  this.walkSound = "stone";
  this.civilizedpathweight = .6;
}
CobblestoneRoadTile.prototype = new TerrainObject();

function PurpleCobblestoneRoadTile() {
  //Graphics Upgraded
  this.name = "PurpleCobblestoneRoad";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#553668";
  this.walkSound = "stone";
  this.civilizedpathweight = .6;
}
PurpleCobblestoneRoadTile.prototype = new TerrainObject();

function PlanksEWTile() {
  //Graphics Upgraded
  this.name = "PlanksEW";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#9d5a20";
  this.walkSound = "stone";
}
PlanksEWTile.prototype = new TerrainObject();

function DarkPlanksEWTile() {
  //Graphics Upgraded
  this.name = "DarkPlanksEW";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#9d5a20";
  this.walkSound = "stone";
}
DarkPlanksEWTile.prototype = new TerrainObject();

function RoughPlanksEWTile() {
  //Graphics Upgraded
  this.name = "RoughPlanksEW";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#9d5a20";
  this.walkSound = "stone";
}
RoughPlanksEWTile.prototype = new TerrainObject();

function MeadowTile() {
  // Graphics Upgraded
  this.name = "Meadow";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.peerview = "#61a01e";
  this.walkSound = "grass";
  this.combatmap = "Grass"; 
}
MeadowTile.prototype = new TerrainObject();

function GrassTile() {
  // Graphics Upgraded
  this.name = "Grass";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.peerview = "#618928";
  this.walkSound = "grass";
  this.combatmap = "Grass"; 
}
GrassTile.prototype = new TerrainObject();

function GrassRoadEndTile() {
  // Graphics Upgraded
  // This exists to trick roads into knowing they have to lead into cities
  this.name = "GrassRoadEnd";
}
GrassRoadEndTile.prototype = new GrassTile();

function DirtTile() {
  //Graphics Upgraded
  this.name = "Dirt";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
DirtTile.prototype = new TerrainObject();

function DirtScrubTile() {
  //Graphics Upgraded
  this.name = "DirtScrub";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
DirtScrubTile.prototype = new TerrainObject();

function FallowFarmTile() {
  //Graphics Upgraded
  this.name = "FallowFarm";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
FallowFarmTile.prototype = new TerrainObject();

function FarmTile() {
  //Graphics Upgraded
  this.name = "Farm";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
FarmTile.prototype = new TerrainObject();

function FallowFarm2Tile() {
  //Graphics Upgraded
  this.name = "FallowFarm2";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
FallowFarm2Tile.prototype = new TerrainObject();

function Farm2Tile() {
  //Graphics Upgraded
  this.name = "Farm2";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
Farm2Tile.prototype = new TerrainObject();

function RoadTile() {
  //Graphics Upgraded
  this.name = "Road";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -9*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dirt road";
  this.combatmap = "Grass";
  this.peerview = "#4d462c";
  
  this.initdelay = 0.8;
  this.pathweight = .8;
  this.civilizedpathweight = .5;
  this.walkSound = "grass";
  
  SetBySurroundRoad.call(this);
}
RoadTile.prototype = new TerrainObject();

function RoadWNTile() {
  //Graphics Upgraded
  this.name = "RoadWN";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -8*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dirt road";
  this.combatmap = "Grass";
  this.peerview = "#4d462c";
  
  this.initdelay = 0.8;
  this.pathweight = .8;
  this.civilizedpathweight = .5;
  this.walkSound = "grass";
}
RoadWNTile.prototype = new TerrainObject();

function BrushTile() {
  //Graphics Upgraded
  this.name = "Brush";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
BrushTile.prototype = new TerrainObject();

function BushesTile() {
  //Graphics Upgraded
  this.name = "Bushes";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "bushes";
  this.initdelay = 1.2;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
BushesTile.prototype = new TerrainObject();

function UnderbrushTile() {
  // Graphics Upgraded
  this.name = "Underbrush";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
UnderbrushTile.prototype = new TerrainObject();

function SandTile() {
  //Graphics Upgraded
  this.name = "Sand";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "sand";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
SandTile.prototype = new TerrainObject();

function SandVegetationTile() {
  //Graphics Upgraded
  this.name = "SandVegetation";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "sand";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Grass";
  this.peerview = "#5f6114";
  this.walkSound = "grass";
}
SandVegetationTile.prototype = new TerrainObject();

function BrushNCoastTile() {
  //Graphics Upgraded
  this.name = "BrushNCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = -45*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
BrushNCoastTile.prototype = new TerrainObject();

function BrushECoastTile() {
  this.name = "BrushECoast";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -45*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
BrushECoastTile.prototype = new TerrainObject();

function BrushSCoastTile() {
  //Graphics Upgraded
  this.name = "BrushSCoast";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -45*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
BrushSCoastTile.prototype = new TerrainObject();

function BrushWCoastTile() {
  //Graphics Upgraded
  this.name = "BrushWCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -45*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;  
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#618928";
  this.walkSound = "grass";
}
BrushWCoastTile.prototype = new TerrainObject();

function ForestTile() {
  //Graphics Upgraded
  this.name = "Forest";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .5;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.pathweight = 1.3;
  this.combatmap = "Forest";
  this.peerview = "#326a25";
  this.walkSound = "forest";
}
ForestTile.prototype = new TerrainObject();

function Forest2Tile() {
  //Graphics Upgraded
  this.name = "Forest2";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -32;
}
Forest2Tile.prototype = new ForestTile();

function ForestTilingNWTile() {
  //Graphics Upgraded
  this.name = "ForestTilingNW";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -62*32;
}
ForestTilingNWTile.prototype = new ForestTile();

function ForestTilingNETile() {
  //Graphics Upgraded
  this.name = "ForestTilingNE";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -62*32;
}
ForestTilingNETile.prototype = new ForestTile();

function ForestTilingWTile() {
  //Graphics Upgraded
  this.name = "ForestTilingW";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -63*32;
}
ForestTilingWTile.prototype = new ForestTile();

function ForestTilingETile() {
  //Graphics Upgraded
  this.name = "ForestTilingE";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -63*32;
}
ForestTilingETile.prototype = new ForestTile();

function ForestTilingSWTile() {
  //Graphics Upgraded
  this.name = "ForestTilingSW";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -64*32;
}
ForestTilingSWTile.prototype = new ForestTile();

function ForestTilingSETile() {
  //Graphics Upgraded
  this.name = "ForestTilingSE";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -64*32;
}
ForestTilingSETile.prototype = new ForestTile();

function ForestEdgeTile() {
  //Graphics Upgraded
  this.name = "ForestEdge";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -61*32;
}
ForestEdgeTile.prototype = new ForestTile();

function Forest3Tile() {
  //Graphics Upgraded
  this.name = "Forest3";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -61*32;
}
Forest3Tile.prototype = new ForestTile();

function ForestEdge3Tile() {
  //Graphics Upgraded
  this.name = "ForestEdge3";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -61*32;
}
ForestEdge3Tile.prototype = new ForestTile();

function ForestEdge4Tile() {
  //Graphics Upgraded
  this.name = "ForestEdge4";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -61*32;
}
ForestEdge4Tile.prototype = new ForestTile();

function ForestEdge5Tile() {
  //Graphics Upgraded
  this.name = "ForestEdge5";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -61*32;
}
ForestEdge5Tile.prototype = new ForestTile();

function DeadForestTile() {
  //Graphics Upgraded
  this.name = "DeadForest";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -32;
}
DeadForestTile.prototype = new ForestTile();

function EvergreenForestTile() {
  //Graphics Upgraded
  this.name = "EvergreenForest";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -32;
}
EvergreenForestTile.prototype = new ForestTile();

function EvergreenForestEdgeTile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdgeTile.prototype = new ForestTile();

function EvergreenForestEdge2Tile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge2";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdge2Tile.prototype = new ForestTile();

function EvergreenForestEdge3Tile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge3";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdge3Tile.prototype = new ForestTile();

function EvergreenForestEdge4Tile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge4";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdge4Tile.prototype = new ForestTile();

function BrightForestTile() {
  //Graphics Upgraded
  this.name = "BrightForest";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -32;
}
BrightForestTile.prototype = new ForestTile();

function BrightForest2Tile() {
  //Graphics Upgraded
  this.name = "BrightForest2";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -32;
}
BrightForest2Tile.prototype = new ForestTile();

function BrightForestEdgeTile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -61*32;
}
BrightForestEdgeTile.prototype = new ForestTile();

function BrightForestEdge2Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge2";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge2Tile.prototype = new ForestTile();

function BrightForestEdge3Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge3";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge3Tile.prototype = new ForestTile();

function BrightForestEdge4Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge4";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge4Tile.prototype = new ForestTile();

function BrightForestEdge5Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge5";
  this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge5Tile.prototype = new ForestTile();

function ForestNCoastTile() {
  //Graphics Upgraded
	this.name = "ForestNCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = -64*32;
}
ForestNCoastTile.prototype = new ForestTile();

function ForestECoastTile() {
  //Graphics Upgraded
	this.name = "ForestECoast";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -64*32;
}
ForestECoastTile.prototype = new ForestTile();

function ForestSCoastTile() {
  //Graphics Upgraded
	this.name = "ForestSCoast";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -64*32;
}
ForestSCoastTile.prototype = new ForestTile();

function ForestWCoastTile() {
  //Graphics Upgraded
	this.name = "ForestWCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -64*32;
}
ForestWCoastTile.prototype = new ForestTile();

function EvergreenForestNCoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestNCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = -63*32;
}
EvergreenForestNCoastTile.prototype = new ForestTile();

function EvergreenForestECoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestECoast";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -63*32;
}
EvergreenForestECoastTile.prototype = new ForestTile();

function EvergreenForestSCoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestSCoast";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -63*32;
}
EvergreenForestSCoastTile.prototype = new ForestTile();

function EvergreenForestWCoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestWCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -63*32;
}
EvergreenForestWCoastTile.prototype = new ForestTile();

function BrightForestNCoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestNCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = -62*32;
}
BrightForestNCoastTile.prototype = new ForestTile();

function BrightForestECoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestECoast";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -62*32;
}
BrightForestECoastTile.prototype = new ForestTile();

function BrightForestSCoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestSCoast";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -62*32;
}
BrightForestSCoastTile.prototype = new ForestTile();

function BrightForestWCoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestWCoast";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -62*32;
}
BrightForestWCoastTile.prototype = new ForestTile();

function HillsTile() {
  // Graphics Upgraded
  this.name = "Hills";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "hills";
  this.initdelay = 1.5;
  this.pathweight = 1.5;
  this.combatmap = "Hill";
  this.peerview = "#b6d123";
  this.walkSound = "hill";
}
HillsTile.prototype = new TerrainObject();

function Hills1Tile() {
  // Graphics Upgraded
  this.name = "Hills1";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "hills";
  this.initdelay = 1.5;
  this.pathweight = 1.5;
  this.combatmap = "Hill";
  this.peerview = "#b6d123";
  this.walkSound = "hill";
}
Hills1Tile.prototype = new TerrainObject();

function Hills2Tile() {
  // Graphics Upgraded
  this.name = "Hills2";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -18*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "hills";
  this.initdelay = 1.5;
  this.pathweight = 1.5;
  this.combatmap = "Hill";
  this.peerview = "#b6d123";
  this.walkSound = "hill";
}
Hills2Tile.prototype = new TerrainObject();

function SwampTile() {
  //Graphics Upgraded
  this.name = "Swamp";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "swamp";
  this.initdelay = 1.2;
  this.pathweight = 4;
  this.combatmap = "Swamp";
  this.peerview = "#122112";
  this.walkSound = "swamp";
}
SwampTile.prototype = new TerrainObject();

SwampTile.prototype.walkon = function(person) {
  let resp = InASwamp(person);
  return resp;
}
SwampTile.prototype.idle = function(person) {
  let resp = InASwamp(person);
  return resp;
}

SwampTile.prototype.isHostileTo = function(who) {
  if (IsNonLiving(who)) {
    return 0;
  }
  return 1;
}

function InASwamp(who) {
  let response = {msg:""};
  if ((MOVE_LEVITATE & who.getMovetype()) || (MOVE_FLY & who.getMovetype())) {
    // entity is flying/levitating and cannot be diseased
    return response;
  }
  
  if (who.group) {
    // entity is an NPC group, immune to disease
    return response;
  }

  if (IsNonLiving(who)) {
    // entity is not biological and cannot be diseased
    return response;
  }

  // percent chance of infection- 10% per step, prorated by speed
  let chance = 10 * (DUTime.getGameClock() - who.getLastTurnTime());  
  if (Dice.roll("1d100") < chance) {  // diseased!
    if (who.getSpellEffectsByName("Disease")) { return 0; }
    let disease = localFactory.createTile("Disease");
    who.addSpellEffect(disease);
    
    DrawCharFrame();
    response.msg = "You have become diseased!";
  }
  return response;
}

function ShinglesTile() {
  //Graphics Upgraded
  this.name = "Shingles";
  this.graphic = "static.gif";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
  this.peerview = "#08d66d";
}
ShinglesTile.prototype = new TerrainObject();

function Shingles2Tile() {
  //Graphics Upgraded
  this.name = "Shingles2";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -10*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
  this.peerview = "#08d66d";
}
Shingles2Tile.prototype = new TerrainObject();

function ShinglesTopTile() {
  //Graphics Upgraded
  this.name = "ShinglesTop";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
  this.peerview = "#08d66d";
}
ShinglesTopTile.prototype = new TerrainObject();

function IcyFloorTile() {
  //Graphics Upgraded
	this.name = "IcyFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -3*32;  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "icy floor";
	this.peerview = "#3f89b2";
	this.walkSound = "stone";
}
IcyFloorTile.prototype = new TerrainObject();

function Icy2FloorTile() {
  //Graphics Upgraded
	this.name = "Icy2Floor";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -3*32;  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "icy floor";
	this.peerview = "#3f89b2";
	this.walkSound = "stone";
}
Icy2FloorTile.prototype = new TerrainObject();

function CaveFloorTile() {
  //Graphics Upgraded
	this.name = "CaveFloor";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -3*32;  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "cave floor";
	this.peerview = "#626262";
	this.walkSound = "stone";
	
	TilingSpritesheet.call(this, 2);
}
CaveFloorTile.prototype = new TerrainObject();

function CaveWallTile() {
	this.name = "CaveWall";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -3936;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1;
	this.prefix = "a";
	this.desc = "cave wall";
	this.peerview = "#000000";
	
	TilingSpritesheet.call(this, 2);
	SetBySurroundCave.call(this);
}
CaveWallTile.prototype = new TerrainObject();

function CaveColumnTile() {
	this.name = "CaveColumn";
  this.graphic = "static.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -123*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = .5;
	this.prefix = "a";
	this.desc = "cave wall";
	this.peerview = "#000000";
	
	TilingSpritesheet.call(this, 2);
}
CaveColumnTile.prototype = new TerrainObject();

function WSFloorTile() {
	this.name = "WSFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-1760";  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "rough stone";
	this.peerview = "#6c6c6c";  // remember to set
	this.walkSound = "stone";
	
	TilingSpritesheet.call(this, 2);
}
WSFloorTile.prototype = new TerrainObject();

function WSWallTile() {
  this.name = "WSWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-1728";  
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "large stone wall";
  this.peerview = "#ffffff";  // remember to set
}
WSWallTile.prototype = new TerrainObject();

function WSWallVineTile() {
  this.name = "WSWallVine";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-1728";  
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "large stone wall";
  this.peerview = "#ffffff";  // remember to set
}
WSWallVineTile.prototype = new TerrainObject();

function WSWallMoldTile() {
  this.name = "WSWallMold";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-1728";  
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "large stone wall";
  this.peerview = "#ffffff";  // remember to set
}
WSWallMoldTile.prototype = new TerrainObject();

function RoughStoneFloorTile() {
  //Graphics Upgraded
	this.name = "RoughStoneFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -5*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#4d462c";
	this.walkSound = "stone";
}
RoughStoneFloorTile.prototype = new TerrainObject();

function LightRoughStoneFloorTile() {
  //Graphics Upgraded
	this.name = "LightRoughStoneFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -5*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#4d462c";
	this.walkSound = "stone";
}
LightRoughStoneFloorTile.prototype = new TerrainObject();

function HexTransparentFloorTile() {
  //Graphics Upgraded
  // No longer a hex, but hey
	this.name = "HexTransparentFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -10*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#1d1d1d";
	this.walkSound = "stone";
}
HexTransparentFloorTile.prototype = new TerrainObject();

function CyanCobblestoneTile() {
  //Graphics Upgraded
	this.name = "CyanCobblestone";
  this.graphic = "static.gif";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#235373";
	this.walkSound = "stone";
}
CyanCobblestoneTile.prototype = new TerrainObject();

function GreenCobblestoneTile() {
  //Graphics Upgraded
	this.name = "GreenCobblestone";
  this.graphic = "static.gif";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#009267";
	this.walkSound = "stone";
}
GreenCobblestoneTile.prototype = new TerrainObject();

function GreenCheckeredFloorTile() {
  //Graphics Upgraded
	this.name = "GreenCheckeredFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#a8ecb6";
	this.walkSound = "stone";
}
GreenCheckeredFloorTile.prototype = new TerrainObject();

function YellowCheckeredFloorTile() {
  //Graphics Upgraded
	this.name = "YellowCheckeredFloor";
  this.graphic = "static.gif";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#f4e5a0";
	this.walkSound = "stone";
}
YellowCheckeredFloorTile.prototype = new TerrainObject();

function LavaTubeTile() {
	this.name = "LavaTube";
  this.graphic = "static.gif";
  this.spritexoffset = -2*32;
  this.spriteyoffset = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "lava tube";
	this.peerview = "#626262";
	this.walkSound = "stone";
}
LavaTubeTile.prototype = new TerrainObject();

function SeeBelowTile() {
  this.name = "SeeBelow";
  this.graphic = "see-below.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "roof";
}
SeeBelowTile.prototype = new TerrainObject();

function WorldBelowTile() {
  this.name = "WorldBelow";
  this.graphic = "spacer.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "world";
}
WorldBelowTile.prototype = new TerrainObject();

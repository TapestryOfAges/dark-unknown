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


function BlankWhiteTile() {
  this.name = "BlankWhite";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-288";
  this.desc = "";
  this.blocklos = 1;
  this.passable = MOVE_ETHEREAL;
  this.peerview = "white";
}
BlankWhiteTile.prototype = new TerrainObject();

function OceanTile() {
  this.name = "Ocean";
  this.graphic = "flowing_animations.gif";
  this.desc = "deep water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL;
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
  this.peerview = "#0000e0";
  this.walkSound = "water";
}
OceanTile.prototype = new TerrainObject();

function WaterTile() {
  this.name = "Water";
  this.graphic = "flowing_animations.gif";
  this.desc = "water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
  this.peerview = "#4040fc";
  this.walkSound = "water";
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
  this.graphic = "flowing_animations.gif";
  this.desc = "shallow water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
  this.peerview = "#8080fc";
  this.walkSound = "water";
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

function ShadowOceanTile() {
  this.name = "ShadowOcean";
  this.graphic = "flow_ethereal.gif";
  this.desc = "deep water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL;
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
  this.peerview = "#172915";
  this.walkSound = "water";
}
ShadowOceanTile.prototype = new TerrainObject();

function ShadowWaterTile() {
  this.name = "ShadowWater";
  this.graphic = "flow_ethereal.gif";
  this.desc = "water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
  this.peerview = "#273425";
  this.walkSound = "water";
}
ShadowWaterTile.prototype = new TerrainObject();

ShadowWaterTile.prototype.walkon = function(walker) {
  let resp = InWater(walker);
  return resp;
}

ShadowWaterTile.prototype.idle = function(walker) {
  let resp = InWater(walker);
  return resp;
}

function ShadowShallowsTile() {
  this.name = "ShadowShallows";
  this.graphic = "flow_ethereal.gif";
  this.desc = "shallow water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
  this.peerview = "#809d7d";
  this.walkSound = "water";
}
ShadowShallowsTile.prototype = new TerrainObject();

ShadowShallowsTile.prototype.walkon = function(walker) {
  let resp = InWater(walker);
  return resp;
}

ShadowShallowsTile.prototype.idle = function(walker) {
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
  this.name = "NoBlockMountain";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.desc = "mountains";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
NoBlockMountainTile.prototype = new TerrainObject();

function MountainTile() {
  this.name = "Mountain";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainTile.prototype = new TerrainObject();

function MountainPassTile() {
  this.name = "MountainPass";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_WALK;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainPassTile.prototype = new TerrainObject();

function FlameMountainTile() {
  this.name = "FlameMountain";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-288";
  this.desc = "fiery mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#e42217";
  this.walkSound = "hill";
}
FlameMountainTile.prototype = new TerrainObject();

function StoneWallTile() {
  this.name = "StoneWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "stone wall";
  this.peerview = "#ffffff";
}
StoneWallTile.prototype = new TerrainObject();

function StoneTile() {
  this.name = "Stone";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone";
  this.peerview = "#606060";
}
StoneTile.prototype = new TerrainObject();

function DirtStoneTile() {
  this.name = "DirtStone";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone";
  this.peerview = "#606060";
}
DirtStoneTile.prototype = new TerrainObject();

function MastTile() {
  this.name = "Mast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .2;
  this.prefix = "a";
  this.desc = "mast";
  this.peerview = "#602000";
}
MastTile.prototype = new TerrainObject();

function RiggingTile() {
  this.name = "Rigging";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "ship's rigging";
  this.peerview = "#602000";
}
RiggingTile.prototype = new TerrainObject();

function PillarTile() {
  this.name = "Pillar";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pillar";
  this.peerview = "#707070";
}
PillarTile.prototype = new TerrainObject();

function PurplePillarTile() {
  this.name = "PurplePillar";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-288";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pillar";
  this.peerview = "#707070";
}
PurplePillarTile.prototype = new TerrainObject();

function FancyFloorTile() {
  this.name = "FancyFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-288";
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "floor";
  this.peerview = "#600060";
  this.walkSound = "stone";
}
FancyFloorTile.prototype = new TerrainObject();

function HorizontalCounterTile() {
  this.name = "HorizontalCounter";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
  this.peerview = "black";
}
HorizontalCounterTile.prototype = new TerrainObject();

function RightCounterTile() {
  this.name = "RightCounter";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
  this.peerview = "black";
}
RightCounterTile.prototype = new TerrainObject();

function LeftCounterTile() {
  this.name = "LeftCounter";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
  this.peerview = "black";
}
LeftCounterTile.prototype = new TerrainObject();

function CounterBoxTile() {
  this.name = "CounterBox";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
  this.peerview = "black";
}
CounterBoxTile.prototype = new TerrainObject();

function BlankBlackTile() {
  this.name = "BlankBlack";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.desc = "darkness";
  this.peerview = "black";
}
BlankBlackTile.prototype = new TerrainObject();

function ChasmTile() {
  this.name = "Chasm";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chasm";
  this.peerview = "black";
}
ChasmTile.prototype = new TerrainObject();

function DarknessTile() {
  this.name = "Darkness";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "darkness";
  this.peerview = "black";
}
DarknessTile.prototype = new TerrainObject();

function WallTile() {
  this.name = "Wall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
WallTile.prototype = new TerrainObject();

function RuinsWallTile() {
  this.name = "RuinsWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-256";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallTile.prototype = new TerrainObject();

function IllusionaryRuinsWallTile() {
  this.name = "IllusionaryRuinsWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-256";
  this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#600060";
}
IllusionaryRuinsWallTile.prototype = new TerrainObject();

function ArrowSlitTile() {
	this.name = "ArrowSlit";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-128";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = { distance : 1 , blocklos : 0 };
	this.blockloe = 1;
	this.loeupclose = {distance : 0 , blocklow : .2 };
	this.prefix = "an";
	this.desc = "arrow slit";
  this.peerview = "white";
}
ArrowSlitTile.prototype = new TerrainObject();

function WindowTile() {
	this.name = "Window";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-128";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.blockloe = 1;
	this.prefix = "a";
	this.desc = "window";
  this.peerview = "white";
}
WindowTile.prototype = new TerrainObject();

function ShadowWindowTile() {
	this.name = "ShadowWindow";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-352";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.blockloe = 1;
	this.prefix = "a";
	this.desc = "window";
  this.peerview = "white";
}
ShadowWindowTile.prototype = new TerrainObject();

function WallNETile() {
  this.name = "WallNE";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
WallNETile.prototype = new TerrainObject();

function WallNWTile() {
  this.name = "WallNW";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
WallNWTile.prototype = new TerrainObject();

function WallSWTile() {
  this.name = "WallSW";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
WallSWTile.prototype = new TerrainObject();

function WallSETile() {
  this.name = "WallSE";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
WallSETile.prototype = new TerrainObject();

function VerticalCounterTile() {
  this.name = "VerticalCounter";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-160";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
  this.peerview = "black";
}
VerticalCounterTile.prototype = new TerrainObject();

function BottomCounterTile() {
  this.name = "BottomCounter";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-192";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
  this.peerview = "black";
}
BottomCounterTile.prototype = new TerrainObject();

function TopCounterTile() {
  this.name = "TopCounter";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
  this.peerview = "black";
}
TopCounterTile.prototype = new TerrainObject();

function PlanksNSTile() {
  this.name = "PlanksNS";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
PlanksNSTile.prototype = new TerrainObject();

function ShadowPlanksNSTile() {
  this.name = "ShadowPlanksNS";
  this.graphic = "master_spritesheet";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-352";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#1c6000";
  this.walkSound = "stone";
}
ShadowPlanksNSTile.prototype = new TerrainObject();

function SouthCoastTile() {
  this.name = "SouthCoast";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
SouthCoastTile.prototype = new TerrainObject();

function SouthCoastSandTile() {
  this.name = "SouthCoastSand";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-96";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
SouthCoastSandTile.prototype = new TerrainObject();

function NorthCoastTile() {
  this.name = "NorthCoast";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
NorthCoastTile.prototype = new TerrainObject();

function NorthCoastSandTile() {
  this.name = "NorthCoastSand";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-288";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
NorthCoastSandTile.prototype = new TerrainObject();

function EastCoastTile() {
  this.name = "EastCoast";
//  this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
EastCoastTile.prototype = new TerrainObject();

function EastCoastSandTile() {
  this.name = "EastCoastSand";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-96";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
EastCoastSandTile.prototype = new TerrainObject();

function WestCoastTile() {
  this.name = "WestCoast";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
WestCoastTile.prototype = new TerrainObject();

function WestCoastSandTile() {
  this.name = "WestCoastSand";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-96";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
WestCoastSandTile.prototype = new TerrainObject();

function NortheastCoastTile() {
  this.name = "NortheastCoast";
  // For Phaser: 0,672
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast_d.gif";
  this.overlay = "necoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastTile.prototype = new TerrainObject();

function NortheastCoastSandTile() {
  this.name = "NortheastCoastSand";
  // For Phaser: 32,672
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "necoast-sand.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastSandTile.prototype = new TerrainObject();

function SouthwestCoastTile() {
  this.name = "SouthwestCoast";
  // For Phaser: 64,672
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "swcoast_d.gif";
  this.overlay = "swcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastTile.prototype = new TerrainObject();

function SouthwestCoastSandTile() {
  this.name = "SouthwestCoastSand";
  // For Phaser: 96,672
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "swcoast-sand.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastSandTile.prototype = new TerrainObject();

function NorthwestCoastTile() {
  this.name = "NorthwestCoast";
  // For Phaser: 128,672
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "nwcoast_d.gif";
  this.overlay = "nwcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastTile.prototype = new TerrainObject();

function NorthwestCoastSandTile() {
  this.name = "NorthwestCoastSand";
  // For Phaser: 160,672
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "nwcoast-sand.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastSandTile.prototype = new TerrainObject();

function SoutheastCoastTile() {
  this.name = "SoutheastCoast";
  // For Phaser: 192,672
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "secoast_d.gif";
  this.overlay = "secoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastTile.prototype = new TerrainObject();

function SoutheastCoastSandTile() {
  this.name = "SoutheastCoastSand";
  // For Phaser: 224,672
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "secoast-sand.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastSandTile.prototype = new TerrainObject();

function ShadowSouthCoastTile() {
  this.name = "ShadowSouthCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-352";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
}
ShadowSouthCoastTile.prototype = new TerrainObject();

function ShadowNorthCoastTile() {
  this.name = "ShadowNorthCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-352";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
}
ShadowNorthCoastTile.prototype = new TerrainObject();

function ShadowEastCoastTile() {
  this.name = "ShadowEastCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-352";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
}
ShadowEastCoastTile.prototype = new TerrainObject();

function ShadowWestCoastTile() {
  this.name = "ShadowWestCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-352";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
}
ShadowWestCoastTile.prototype = new TerrainObject();

function ShadowNortheastCoastTile() {
  this.name = "ShadowNortheastCoast";
  this.graphic = "flow_ethereal.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "necoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
ShadowNortheastCoastTile.prototype = new TerrainObject();

function ShadowSouthwestCoastTile() {
  this.name = "ShadowSouthwestCoast";
  this.graphic = "flow_ethereal.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "swcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
ShadowSouthwestCoastTile.prototype = new TerrainObject();

function ShadowNorthwestCoastTile() {
  this.name = "ShadowNorthwestCoast";
  this.graphic = "flow_ethereal.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "nwcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
ShadowNorthwestCoastTile.prototype = new TerrainObject();

function ShadowSoutheastCoastTile() {
  this.name = "ShadowSoutheastCoast";
  this.graphic = "flow_ethereal.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "secoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
ShadowSoutheastCoastTile.prototype = new TerrainObject();


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
  this.combatmap = "Water";
  this.peerview = "#8080fc";
  this.walkSound = "water";
  
  SetBySurroundRiver.call(this);
}
RiverTile.prototype = new TerrainObject();

function CobblestoneTile() {
  this.name = "Cobblestone";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
CobblestoneTile.prototype = new TerrainObject();

function CobblestoneRoadTile() {
  this.name = "CobblestoneRoad";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
  this.civilizedpathweight = .6;
}
CobblestoneRoadTile.prototype = new TerrainObject();

function ShadowCobblestoneTile() {
  this.name = "ShadowCobblestone";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#ee82ee";
  this.walkSound = "stone";
}
ShadowCobblestoneTile.prototype = new TerrainObject();

function ShadowCobblestoneRoadTile() {
  this.name = "ShadowCobblestoneRoad";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#ee82ee";
  this.walkSound = "stone";
  this.civilizedpathweight = .6;
}
ShadowCobblestoneRoadTile.prototype = new TerrainObject();

function BlueTilesTile() {
  this.name = "BlueTiles";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-256";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "tiles";
  this.peerview = "#345de1";
  this.walkSound = "stone";
}
BlueTilesTile.prototype = new TerrainObject();

function BlackFloorTile() {
  this.name = "BlackFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-128";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "emptiness";
  this.peerview = "black";
  this.walkSound = "stone";
}
BlackFloorTile.prototype = new TerrainObject();

function PlanksEWTile() {
  this.name = "PlanksEW";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
PlanksEWTile.prototype = new TerrainObject();

function ShadowPlanksEWTile() {
  this.name = "ShadowPlanksEW";
  this.graphic = "master_spritesheet";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-352";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#1c6000";
  this.walkSound = "stone";
}
ShadowPlanksEWTile.prototype = new TerrainObject();

function GrassTile() {
  this.name = "Grass";
  //this.graphic = "master_spritesheet_d.gif";
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
GrassTile.prototype = new TerrainObject();

function ShadowGrassTile() {
  this.name = "ShadowGrass";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
  this.combatmap = "Grass"; 
}
ShadowGrassTile.prototype = new TerrainObject();

function DirtTile() {
  this.name = "Dirt";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
DirtTile.prototype = new TerrainObject();

function ShadowDirtTile() {
  this.name = "ShadowDirt";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#60003c";
  this.walkSound = "grass";
}
ShadowDirtTile.prototype = new TerrainObject();

function FallowFarmTile() {
  this.name = "FallowFarm";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-288";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
FallowFarmTile.prototype = new TerrainObject();

function FarmTile() {
  this.name = "Farm";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-288";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
FarmTile.prototype = new TerrainObject();

function RoadTile() {
  this.name = "Road";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-768";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dirt road";
  this.combatmap = "Grass";
  this.peerview = "#7a3a1a";
  
  this.initdelay = 0.8;
  this.pathweight = .8;
  this.civilizedpathweight = .5;
  this.walkSound = "grass";
  
  SetBySurroundRoad.call(this);
}
RoadTile.prototype = new TerrainObject();

function BrushTile() {
  this.name = "Brush";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
BrushTile.prototype = new TerrainObject();

function ShadowBrushTile() {
  this.name = "ShadowBrush";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#005080";
  this.walkSound = "grass";
}
ShadowBrushTile.prototype = new TerrainObject();

function UnderbrushTile() {
  this.name = "Underbrush";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-288";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "underbrush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
UnderbrushTile.prototype = new TerrainObject();

function BrushNCoastTile() {
  this.name = "BrushNCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
BrushNCoastTile.prototype = new TerrainObject();

function ShadowBrushNCoastTile() {
  this.name = "ShadowBrushNCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#005080";
  this.walkSound = "grass";
}
ShadowBrushNCoastTile.prototype = new TerrainObject();

function BrushECoastTile() {
  this.name = "BrushECoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
BrushECoastTile.prototype = new TerrainObject();

function ShadowBrushECoastTile() {
  this.name = "ShadowBrushECoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#005080";
  this.walkSound = "grass";
}
ShadowBrushECoastTile.prototype = new TerrainObject();

function BrushSCoastTile() {
  this.name = "BrushSCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
BrushSCoastTile.prototype = new TerrainObject();

function ShadowBrushSCoastTile() {
  this.name = "ShadowBrushSCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#005080";
  this.walkSound = "grass";
}
ShadowBrushSCoastTile.prototype = new TerrainObject();

function BrushWCoastTile() {
  this.name = "BrushWCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;  
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
BrushWCoastTile.prototype = new TerrainObject();

function ShadowBrushWCoastTile() {
  this.name = "ShadowBrushWCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#005080";
  this.walkSound = "grass";
}
ShadowBrushWCoastTile.prototype = new TerrainObject();

function ForestTile() {
  this.name = "Forest";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.pathweight = 1.3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
}
ForestTile.prototype = new TerrainObject();

function GroveTile() {
	this.name = "Grove";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .5;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "trees";
  this.initdelay = 1.3;
  this.pathweight = 1.3;
  this.peerview = "#004000";
  this.walkSound = "forest";
}
GroveTile.prototype = new TerrainObject();

function ForestNCoastTile() {
	this.name = "ForestNCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-192";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.pathweight = 1.3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
}
ForestNCoastTile.prototype = new TerrainObject();

function ForestECoastTile() {
	this.name = "ForestECoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-192";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.pathweight = 1.3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
}
ForestECoastTile.prototype = new TerrainObject();

function ForestSCoastTile() {
	this.name = "ForestSCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-192";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.pathweight = 1.3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
}
ForestSCoastTile.prototype = new TerrainObject();

function ForestWCoastTile() {
	this.name = "ForestWCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-224";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.pathweight = 1.3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
}
ForestWCoastTile.prototype = new TerrainObject();

function HillsTile() {
  this.name = "Hills";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "hills";
  this.initdelay = 1.5;
  this.pathweight = 1.5;
  this.combatmap = "Hill";
  this.peerview = "#49473a";
  this.walkSound = "hill";
}
HillsTile.prototype = new TerrainObject();

function PurpleCobblestoneTile() {
  this.name = "PurpleCobblestone";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#600060";
  this.walkSound = "stone";
}
PurpleCobblestoneTile.prototype = new TerrainObject();

function ShadowPurpleCobblestoneTile() {
  this.name = "ShadowPurpleCobblestone";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-0";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#602300";
  this.walkSound = "stone";
}
ShadowPurpleCobblestoneTile.prototype = new TerrainObject();

function SwampTile() {
  this.name = "Swamp";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "swamp";
  this.initdelay = 1.2;
  this.pathweight = 4;
  this.combatmap = "Swamp";
  this.peerview = "#004000";
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

function ShadowSwampTile() {
  this.name = "ShadowSwamp";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "swamp";
  this.initdelay = 1.2;
  this.pathweight = 3;
  this.combatmap = "Swamp";
  this.peerview = "#002840";
  this.walkSound = "swamp";
}
ShadowSwampTile.prototype = new TerrainObject();

ShadowSwampTile.prototype.walkon = function(person) {
  let resp = InASwamp(person);
  return resp;
}
ShadowSwampTile.prototype.idle = function(person) {
  let resp = InASwamp(person);
  return resp;
}

ShadowSwampTile.prototype.isHostileTo = function(who) {
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
  this.name = "Shingles";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
  this.peerview = "#474747";
}
ShinglesTile.prototype = new TerrainObject();

function ShinglesTopTile() {
  this.name = "ShinglesTop";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
  this.peerview = "#474747";
}
ShinglesTopTile.prototype = new TerrainObject();

function RevealedCaveTile() {
  this.name = "RevealedCave";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-832";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "cave entrance";
}
RevealedCaveTile.prototype = new TerrainObject();

function CaveFloorTile() {
	this.name = "CaveFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-32";  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "cave floor";
	this.peerview = "#6c6c6c";
	this.walkSound = "stone";
	
	TilingSpritesheet.call(this, 2);
}
CaveFloorTile.prototype = new TerrainObject();

function CaveWallTile() {
	this.name = "CaveWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-3936";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1;
	this.prefix = "a";
	this.desc = "cave wall";
	this.peerview = "black";
	
	TilingSpritesheet.call(this, 2);
	SetBySurroundCave.call(this);
}
CaveWallTile.prototype = new TerrainObject();

function CaveColumnTile() {
	this.name = "CaveColumn";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-3936";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = .5;
	this.prefix = "a";
	this.desc = "cave wall";
	this.peerview = "black";
	
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
	this.peerview = "#6c6c6c";
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
  this.peerview = "#ffffff";
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
  this.peerview = "#ffffff";
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
  this.peerview = "#ffffff";
}
WSWallMoldTile.prototype = new TerrainObject();

function HexFloorTile() {
	this.name = "HexFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-224";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#675151";
	this.walkSound = "stone";
}
HexFloorTile.prototype = new TerrainObject();

function HexTransparentFloorTile() {
	this.name = "HexTransparentFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-288";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#675151";
	this.walkSound = "stone";
}
HexTransparentFloorTile.prototype = new TerrainObject();

function GoldOutlineFloorTile() {
	this.name = "GoldOutlineFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-224";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#9b8727";
	this.walkSound = "stone";
}
GoldOutlineFloorTile.prototype = new TerrainObject();

function DiamondFloorTile() {
	this.name = "DiamondFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-224";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#868585";
	this.walkSound = "stone";
}
DiamondFloorTile.prototype = new TerrainObject();

function BlueDiamondFloorTile() {
	this.name = "BlueDiamondFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-224";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#5050ff";
	this.walkSound = "stone";
}
BlueDiamondFloorTile.prototype = new TerrainObject();

function PurpleDiamondFloorTile() {
	this.name = "PurpleDiamondFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-256";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#b650ff";
	this.walkSound = "stone";
}
PurpleDiamondFloorTile.prototype = new TerrainObject();

function RedDiamondFloorTile() {
	this.name = "RedDiamondFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-256";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#ff5c50";
	this.walkSound = "stone";
}
RedDiamondFloorTile.prototype = new TerrainObject();

function GreenDiamondFloorTile() {
	this.name = "GreenDiamondFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-288";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#50ff61";
	this.walkSound = "stone";
}
GreenDiamondFloorTile.prototype = new TerrainObject();

function YellowDiamondFloorTile() {
	this.name = "YellowDiamondFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-288";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#cf790b";
	this.walkSound = "stone";
}
YellowDiamondFloorTile.prototype = new TerrainObject();

function BannerTile() {
  this.name = "Banner";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-256";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "banner of House Olympus";
  this.peerview = "white";
}
BannerTile.prototype = new TerrainObject();

function PaladinBannerTile() {
  this.name = "PaladinBanner";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-448";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "banner of the Paladins";
  this.peerview = "white";
}
PaladinBannerTile.prototype = new TerrainObject();

function HildendainBannerTile() {
  this.name = "HildendainBanner";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-1696";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "banner of House Hildendain";
  this.peerview = "white";
}
HildendainBannerTile.prototype = new TerrainObject();

function LavaTubeTile() {
	this.name = "LavaTube";
  this.graphic = "lavatubes.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "lava tube";
	this.peerview = "#853e3e";
	this.walkSound = "stone";
	
	HasAmbientNoise.call(this,"sfx_lava_bubble",1.5);
}
LavaTubeTile.prototype = new TerrainObject();

function RedCarpetNWTile() {
  this.name = "RedCarpetNW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-96";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetNWTile.prototype = new TerrainObject();

function RedCarpetNTile() {
  this.name = "RedCarpetN";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetNTile.prototype = new TerrainObject();

function RedCarpetNETile() {
  this.name = "RedCarpetNE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-160";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetNETile.prototype = new TerrainObject();

function RedCarpetWTile() {
  this.name = "RedCarpetW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-96";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetWTile.prototype = new TerrainObject();

function RedCarpetCTile() {
  this.name = "RedCarpetC";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetCTile.prototype = new TerrainObject();

function RedCarpetETile() {
  this.name = "RedCarpetE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-160";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetETile.prototype = new TerrainObject();

function RedCarpetSWTile() {
  this.name = "RedCarpetSW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-96";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetSWTile.prototype = new TerrainObject();

function RedCarpetSTile() {
  this.name = "RedCarpetS";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetSTile.prototype = new TerrainObject();

function RedCarpetSETile() {
  this.name = "RedCarpetSE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-160";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetSETile.prototype = new TerrainObject();

function BlueCarpetNWTile() {
  this.name = "BlueCarpetNW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "0";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetNWTile.prototype = new TerrainObject();

function BlueCarpetNTile() {
  this.name = "BlueCarpetN";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetNTile.prototype = new TerrainObject();

function BlueCarpetNETile() {
  this.name = "BlueCarpetNE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetNETile.prototype = new TerrainObject();

function BlueCarpetWTile() {
  this.name = "BlueCarpetW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "0";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetWTile.prototype = new TerrainObject();

function BlueCarpetCTile() {
  this.name = "BlueCarpetC";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetCTile.prototype = new TerrainObject();

function BlueCarpetETile() {
  this.name = "BlueCarpetE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetETile.prototype = new TerrainObject();

function BlueCarpetSWTile() {
  this.name = "BlueCarpetSW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "0";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetSWTile.prototype = new TerrainObject();

function BlueCarpetSTile() {
  this.name = "BlueCarpetS";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetSTile.prototype = new TerrainObject();

function BlueCarpetSETile() {
  this.name = "BlueCarpetSE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetSETile.prototype = new TerrainObject();

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

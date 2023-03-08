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
  this.peerview = "#0000e0";
  this.walkSound = "water";
}
OceanTile.prototype = new TerrainObject();

function WaterTile() {
  this.name = "Water";
  this.graphic = "water.gif";
  this.desc = "water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = -32;
  this.spriteyoffset = 0;
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
  this.graphic = "water.gif";
  this.desc = "shallow water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = -3*32;
  this.spriteyoffset = 0;
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

function StillWaterTile() {
  this.name = "StillWater";
  this.graphic = "water.gif";
  this.desc = "shallow water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = -2*32;
  this.spriteyoffset = 0;
  this.combatmap = "Water";
  this.peerview = "#8080fc";
  this.walkSound = "water";
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
  //Graphics Upgraded
  this.name = "NoBlockMountain";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = 0;
  this.desc = "mountains";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
  TilingSpritesheet.call(this, 2, 1);
}
NoBlockMountainTile.prototype = new TerrainObject();

function MountainTile() {
  //Graphics Upgraded
  this.name = "Mountain";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = 0;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
  TilingSpritesheet.call(this, 2, 1);
}
MountainTile.prototype = new TerrainObject();

function MountainPassTile() {
  //Graphics Upgraded
  this.name = "MountainPass";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = 0;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_WALK;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
  TilingSpritesheet.call(this, 2, 1);
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

function Mountain1Tile() {
  //Graphics Upgraded
  this.name = "Mountain1";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = 0;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1Tile.prototype = new TerrainObject();

function Mountain2Tile() {
  //Graphics Upgraded
  this.name = "Mountain1";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = 0;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2Tile.prototype = new TerrainObject();

function Mountain1MeadowBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain1MeadowBase";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1MeadowBaseTile.prototype = new TerrainObject();

function Mountain1GrassBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain1GrassBase";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1GrassBaseTile.prototype = new TerrainObject();

function Mountain1SandBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain1SandBase";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1SandBaseTile.prototype = new TerrainObject();

function Mountain1DirtBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain1DirtBase";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1DirtBaseTile.prototype = new TerrainObject();

function Mountain1CaveBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain1CaveBase";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1CaveBaseTile.prototype = new TerrainObject();

function Mountain2MeadowBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain2MeadowBase";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2MeadowBaseTile.prototype = new TerrainObject();

function Mountain2GrassBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain2GrassBase";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2GrassBaseTile.prototype = new TerrainObject();

function Mountain2SandBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain2SandBase";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2SandBaseTile.prototype = new TerrainObject();

function Mountain2DirtBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain2DirtBase";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2DirtBaseTile.prototype = new TerrainObject();

function Mountain2CaveBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain2CaveBase";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2CaveBaseTile.prototype = new TerrainObject();

function Mountain1MeadowCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1MeadowCrown";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1MeadowCrownTile.prototype = new TerrainObject();

function Mountain1GrassCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1GrassCrown";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1GrassCrownTile.prototype = new TerrainObject();

function Mountain1SandCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1SandCrown";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1SandCrownTile.prototype = new TerrainObject();

function Mountain1DirtCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1DirtCrown";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1DirtCrownTile.prototype = new TerrainObject();

function Mountain1CaveCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1CaveCrown";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1CaveCrownTile.prototype = new TerrainObject();

function Mountain2MeadowCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2MeadowCrown";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -56*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2MeadowCrownTile.prototype = new TerrainObject();

function Mountain2GrassCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2GrassCrown";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -57*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2GrassCrownTile.prototype = new TerrainObject();

function Mountain2SandCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1SandCrown";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -57*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2SandCrownTile.prototype = new TerrainObject();

function Mountain2DirtCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2DirtCrown";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -57*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2DirtCrownTile.prototype = new TerrainObject();

function Mountain2CaveCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2CaveCrown";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2CaveCrownTile.prototype = new TerrainObject();

function Mountain1MeadowBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1MeadowBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -50*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1MeadowBaseCrownTile.prototype = new TerrainObject();

function Mountain1GrassBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1GrassBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -50*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1GrassBaseCrownTile.prototype = new TerrainObject();

function Mountain1SandBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1SandBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -50*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1SandBaseCrownTile.prototype = new TerrainObject();

function Mountain1DirtBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1DirtBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -50*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1DirtBaseCrownTile.prototype = new TerrainObject();

function Mountain1CaveBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1CaveBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -50*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1CaveBaseCrownTile.prototype = new TerrainObject();

function Mountain2MeadowBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2MeadowBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2MeadowBaseCrownTile.prototype = new TerrainObject();

function Mountain2GrassBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2GrassBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2GrassBaseCrownTile.prototype = new TerrainObject();

function Mountain2SandBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1SandBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2SandBaseCrownTile.prototype = new TerrainObject();

function Mountain2DirtBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2DirtBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2DirtBaseCrownTile.prototype = new TerrainObject();

function Mountain2CaveBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2CaveBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2CaveBaseCrownTile.prototype = new TerrainObject();

function MountainLeftMeadowTile() {
  //Graphics Upgraded
  this.name = "MountainLeftMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -53*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainLeftMeadowTile.prototype = new TerrainObject();

function MountainLeftGrassTile() {
  //Graphics Upgraded
  this.name = "MountainLeftGrass";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -53*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainLeftGrassTile.prototype = new TerrainObject();

function MountainLeftSandTile() {
  //Graphics Upgraded
  this.name = "MountainLeftSand";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainLeftSandTile.prototype = new TerrainObject();

function MountainLeftDirtTile() {
  //Graphics Upgraded
  this.name = "MountainLeftDirt";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainLeftDirtTile.prototype = new TerrainObject();

function MountainLeftCaveTile() {
  //Graphics Upgraded
  this.name = "MountainLeftCave";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainLeftCaveTile.prototype = new TerrainObject();

function MountainRightMeadowTile() {
  //Graphics Upgraded
  this.name = "MountainRightMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainRightMeadowTile.prototype = new TerrainObject();

function MountainRightGrassTile() {
  //Graphics Upgraded
  this.name = "MountainRightGrass";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainRightGrassTile.prototype = new TerrainObject();

function MountainRightSandTile() {
  //Graphics Upgraded
  this.name = "MountainRightSand";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -57*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainRightSandTile.prototype = new TerrainObject();

function MountainRightDirtTile() {
  //Graphics Upgraded
  this.name = "MountainRightDirt";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainRightDirtTile.prototype = new TerrainObject();

function MountainRightCaveTile() {
  //Graphics Upgraded
  this.name = "MountainRightCave";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -57*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainRightCaveTile.prototype = new TerrainObject();

function MountainHalfMeadow1Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfMeadow1";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -55*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfMeadow1Tile.prototype = new TerrainObject();

function MountainHalfGrass1Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfGrass1";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -55*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfGrass1Tile.prototype = new TerrainObject();

function MountainHalfSand1Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfSand1";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -55*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfSand1Tile.prototype = new TerrainObject();

function MountainHalfDirt1Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfDirt1";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -56*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfDirt1Tile.prototype = new TerrainObject();

function MountainHalfCave1Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfCave1";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -56*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfCave1Tile.prototype = new TerrainObject();

function MountainHalfMeadow2Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfMeadow2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfMeadow2Tile.prototype = new TerrainObject();

function MountainHalfGrass2Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfGrass2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfGrass2Tile.prototype = new TerrainObject();

function MountainHalfSand2Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfSand2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfSand2Tile.prototype = new TerrainObject();

function MountainHalfDirt2Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfDirt1";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfDirt2Tile.prototype = new TerrainObject();

function MountainHalfCave2Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfCave2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfCave2Tile.prototype = new TerrainObject();

function MountainHalfMeadow3Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfMeadow3";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfMeadow3Tile.prototype = new TerrainObject();

function MountainHalfGrass3Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfGrass3";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfGrass3Tile.prototype = new TerrainObject();

function MountainHalfSand3Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfSand3";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -59*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfSand3Tile.prototype = new TerrainObject();

function MountainHalfDirt3Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfDirt3";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -59*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfDirt3Tile.prototype = new TerrainObject();

function MountainHalfCave3Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfCave3";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -59*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfCave3Tile.prototype = new TerrainObject();

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
  //Graphics Upgraded
  this.name = "FancyFloor";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "floor";
  this.peerview = "#600060";
  this.walkSound = "stone";
}
FancyFloorTile.prototype = new TerrainObject();

function FancyFloor2Tile() {
  //Graphics Upgraded
  this.name = "FancyFloor2";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "floor";
  this.peerview = "#600060";
  this.walkSound = "stone";
}
FancyFloor2Tile.prototype = new TerrainObject();

function FancyFloor3Tile() {
  //Graphics Upgraded
  this.name = "FancyFloor3";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "floor";
  this.peerview = "#600060";
  this.walkSound = "stone";
}
FancyFloor3Tile.prototype = new TerrainObject();

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

function ShinyWallTile() {
  //Graphics Upgraded. Actually, new.
  this.name = "ShinyWall";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
ShinyWallTile.prototype = new TerrainObject();

function OffwhiteWallTile() {
  //Graphics Upgraded. Actually, new.
  this.name = "OffwhiteWall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
OffwhiteWallTile.prototype = new TerrainObject();

function WallTile() {
  //Graphics Upgraded
  this.name = "Wall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
WallTile.prototype = new TerrainObject();

function FireplaceWallTile() {
  //Graphics Upgraded
  this.name = "FireplaceWall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
FireplaceWallTile.prototype = new TerrainObject();

function GreyWallTile() {
  //Graphics Upgraded
  this.name = "GreyWall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -18*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
GreyWallTile.prototype = new TerrainObject();

function GreyFireplaceWallTile() {
  //Graphics Upgraded
  this.name = "GreyFireplaceWall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -18*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
GreyFireplaceWallTile.prototype = new TerrainObject();

function RuinsWallTile() {
  //Graphics Upgraded
  this.name = "RuinsWall";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallTile.prototype = new TerrainObject();

function RuinsWallArchTile() {
  //Graphics Upgraded
  this.name = "RuinsWallArch";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -14*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallArchTile.prototype = new TerrainObject();

function RuinsWallIvyTile() {
  //Graphics Upgraded
  this.name = "RuinsWallIvy";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -14*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallIvyTile.prototype = new TerrainObject();

function RuinsWallIvy2Tile() {
  //Graphics Upgraded
  this.name = "RuinsWallIvy2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -14*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallIvy2Tile.prototype = new TerrainObject();

function IllusionaryRuinsWallTile() {
  //Graphics Upgraded
  this.name = "IllusionaryRuinsWall";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#600060";
}
IllusionaryRuinsWallTile.prototype = new TerrainObject();

function ArrowSlitTile() {
  //Graphics Upgraded
	this.name = "ArrowSlit";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -15*32;
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

function GreyArrowSlitTile() {
  //Graphics Upgraded
	this.name = "GreyArrowSlit";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -17*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = { distance : 1 , blocklos : 0 };
	this.blockloe = 1;
	this.loeupclose = {distance : 0 , blocklow : .2 };
	this.prefix = "an";
	this.desc = "arrow slit";
  this.peerview = "white";
}
GreyArrowSlitTile.prototype = new TerrainObject();

function WindowTile() {
  //Graphics Upgraded
	this.name = "Window";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.blockloe = 1;
	this.prefix = "a";
	this.desc = "window";
  this.peerview = "white";
}
WindowTile.prototype = new TerrainObject();

function GreyWindowTile() {
  //Graphics Upgraded
	this.name = "GreyWindow";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -17*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.blockloe = 1;
	this.prefix = "a";
	this.desc = "window";
  this.peerview = "white";
}
GreyWindowTile.prototype = new TerrainObject();

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
  //Graphics Upgraded
  this.name = "PlanksNS";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
PlanksNSTile.prototype = new TerrainObject();

function DarkPlanksNSTile() {
  //Graphics Upgraded
  this.name = "DarkPlanksNS";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
DarkPlanksNSTile.prototype = new TerrainObject();

function RoughPlanksNSTile() {
  //Graphics Upgraded
  this.name = "RoughPlanksNS";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
RoughPlanksNSTile.prototype = new TerrainObject();

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

function SouthCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "SouthCoastMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -52*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
SouthCoastMeadowTile.prototype = new TerrainObject();

function SouthCoastTile() {
  //Graphics Upgraded
  this.name = "SouthCoast";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -52*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
SouthCoastTile.prototype = new TerrainObject();

function SouthCoastSandTile() {
  //Graphics Upgraded
  this.name = "SouthCoastSand";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -52*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
SouthCoastSandTile.prototype = new TerrainObject();

function SouthCoastDirtTile() {
  //Graphics Upgraded
  this.name = "SouthCoastDirt";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -53*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
SouthCoastDirtTile.prototype = new TerrainObject();

function SouthCoastCaveTile() {
  //Graphics Upgraded
  this.name = "SouthCoastCave";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -53*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
SouthCoastCaveTile.prototype = new TerrainObject();

function NorthCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "NorthCoastMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
NorthCoastMeadowTile.prototype = new TerrainObject();

function NorthCoastTile() {
  //Graphics Upgraded
  this.name = "NorthCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
NorthCoastTile.prototype = new TerrainObject();

function NorthCoastSandTile() {
  //Graphics Upgraded
  this.name = "NorthCoastSand";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
NorthCoastSandTile.prototype = new TerrainObject();

function NorthCoastDirtTile() {
  //Graphics Upgraded
  this.name = "NorthCoastDirt";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
NorthCoastDirtTile.prototype = new TerrainObject();

function NorthCoastCaveTile() {
  //Graphics Upgraded
  this.name = "NorthCoastCave";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
NorthCoastCaveTile.prototype = new TerrainObject();

function EastCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "EastCoastMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
EastCoastMeadowTile.prototype = new TerrainObject();

function EastCoastTile() {
  //Graphics Upgraded
  this.name = "EastCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
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
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
EastCoastSandTile.prototype = new TerrainObject();

function EastCoastDirtTile() {
  //Graphics Upgraded
  this.name = "EastCoastDirt";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
EastCoastDirtTile.prototype = new TerrainObject();

function EastCoastCaveTile() {
  //Graphics Upgraded
  this.name = "EastCoastCave";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
EastCoastCaveTile.prototype = new TerrainObject();

function WestCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "WestCoastMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
WestCoastMeadowTile.prototype = new TerrainObject();

function WestCoastTile() {
  //Graphics Upgraded
  this.name = "WestCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
WestCoastTile.prototype = new TerrainObject();

function WestCoastSandTile() {
  //Graphics Upgraded
  this.name = "WestCoastSand";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
WestCoastSandTile.prototype = new TerrainObject();

function WestCoastDirtTile() {
  //Graphics Upgraded
  this.name = "WestCoastDirt";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
WestCoastDirtTile.prototype = new TerrainObject();

function WestCoastCaveTile() {
  //Graphics Upgraded
  this.name = "WestCoastCave";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
WestCoastCaveTile.prototype = new TerrainObject();

function NortheastCoastMeadowTile() {
  this.name = "NortheastCoastMeadow";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast.gif";
  this.layers = [["static.png","",-5*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
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
  this.layers = [["static.png","",-6*32,-51*32]];
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
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast-sand.gif";
  this.layers = [["static.png","",-7*32,-51*32]]
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
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
  this.layers = [["static.png","",0,-53*32]]
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
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
  this.layers = [["static.png","",-1*32,-53*32]]
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
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
  this.layers = [["static.png","",-5*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
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
  this.layers = [["static.png","",-6*32,-50*32]];
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
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "swcoast-sand.gif";
  this.layers = [["static.png","",-7*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
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
  this.layers = [["static.png","",-8*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
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
  this.layers = [["static.png","",-9*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
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
  this.layers = [["static.png","",0,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
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
  this.layers = [["static.png","",-32,-52*32]];
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
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "nwcoast-sand.gif";
  this.layers = [["static.png","",-2*32,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
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
  this.layers = [["static.png","",-3*32,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
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
  this.layers = [["static.png","",-4*32,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
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
  this.layers = [["static.png","",0,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
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
  this.layers = [["static.png","",-32,-51*32]];
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
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "secoast-sand.gif";
  this.layers = [["static.png","",-2*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
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
  this.layers = [["static.png","",-3*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
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
  this.layers = [["static.png","",-4*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastCaveTile.prototype = new TerrainObject();

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

function RiverBaseTile() {
  this.name = "RiverBase";
//  this.overlay = "riverns.gif";
  this.layers = [["static.png", "", 0,-42*32]];
  this.graphic = "water.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "river";
  this.combatmap = "Water";
  this.peerview = "#8080fc";
  this.walkSound = "water";

}
RiverBaseTile.prototype = new TerrainObject();

function RiverGrassSourceNTile() {
  this.name = "RiverGrassSourceN";
  this.layers = [["static.png", "", -4*32, -43*32]];
}
RiverGrassSourceNTile.prototype = new RiverBaseTile();

function RiverGrassSourceWTile() {
  this.name = "RiverGrassSourceW";
  this.layers = [["static.png", "", -7*32, -43*32]];
}
RiverGrassSourceWTile.prototype = new RiverBaseTile();

function RiverGrassSourceSTile() {
  this.name = "RiverGrassSourceS";
  this.layers = [["static.png", "", -4*32, -44*32]];
}
RiverGrassSourceSTile.prototype = new RiverBaseTile();

function RiverGrassSourceETile() {
  this.name = "RiverGrassSourceE";
  this.layers = [["static.png", "", -7*32, -44*32]];
}
RiverGrassSourceETile.prototype = new RiverBaseTile();

function RiverDirtSourceNTile() {
  this.name = "RiverDirtSourceN";
  this.layers = [["static.png", "", -5*32, -43*32]];
}
RiverDirtSourceNTile.prototype = new RiverBaseTile();

function RiverDirtSourceWTile() {
  this.name = "RiverDirtSourceW";
  this.layers = [["static.png", "", -8*32, -43*32]];
}
RiverDirtSourceWTile.prototype = new RiverBaseTile();

function RiverDirtSourceSTile() {
  this.name = "RiverDirtSourceS";
  this.layers = [["static.png", "", -5*32, -44*32]];
}
RiverDirtSourceSTile.prototype = new RiverBaseTile();

function RiverDirtSourceETile() {
  this.name = "RiverDirtSourceE";
  this.layers = [["static.png", "", -8*32, -44*32]];
}
RiverDirtSourceETile.prototype = new RiverBaseTile();

function RiverCaveSourceNTile() {
  this.name = "RiverCaveSourceN";
  this.layers = [["static.png", "", -6*32, -43*32]];
}
RiverCaveSourceNTile.prototype = new RiverBaseTile();

function RiverCaveSourceWTile() {
  this.name = "RiverCaveSourceW";
  this.layers = [["static.png", "", -9*32, -43*32]];
}
RiverCaveSourceWTile.prototype = new RiverBaseTile();

function RiverCaveSourceSTile() {
  this.name = "RiverCaveSourceS";
  this.layers = [["static.png", "", -6*32, -44*32]];
}
RiverCaveSourceSTile.prototype = new RiverBaseTile();

function RiverCaveSourceETile() {
  this.name = "RiverCaveSourceE";
  this.layers = [["static.png", "", -9*32, -44*32]];
}
RiverCaveSourceETile.prototype = new RiverBaseTile();

function RiverGrassNSTile() {
  this.name = "RiverGrassNS";
  this.layers = [["static.png", "", 0, -42*32]];
}
RiverGrassNSTile.prototype = new RiverBaseTile();

function RiverDirtNSTile() {
  this.name = "RiverDirtNS";
  this.layers = [["static.png", "", 0, -41*32]];
}
RiverDirtNSTile.prototype = new RiverBaseTile();

function RiverCaveNSTile() {
  this.name = "RiverCaveNS";
  this.layers = [["static.png", "", 0, -47*32]];
}
RiverCaveNSTile.prototype = new RiverBaseTile();

function RiverGrassEW_NTile() {
  this.name = "RiverGrassEW_N";
  this.layers = [["static.png", "", -7*32, -42*32]];
}
RiverGrassEW_NTile.prototype = new RiverBaseTile();

function RiverDirtEW_NTile() {
  this.name = "RiverDirtEW_N";
  this.layers = [["static.png", "", -7*32, -41*32]];
}
RiverDirtEW_NTile.prototype = new RiverBaseTile();

function RiverCaveEW_NTile() {
  this.name = "RiverCaveEW_N";
  this.layers = [["static.png", "", -7*32, -47*32]];
}
RiverCaveEW_NTile.prototype = new RiverBaseTile();

function RiverGrassEW_STile() {
  this.name = "RiverGrassEW_S";
  this.layers = [["static.png", "", -8*32, -42*32]];
}
RiverGrassEW_STile.prototype = new RiverBaseTile();

function RiverDirtEW_STile() {
  this.name = "RiverDirtEW_S";
  this.layers = [["static.png", "", -8*32, -41*32]];
}
RiverDirtEW_STile.prototype = new RiverBaseTile();

function RiverCaveEW_STile() {
  this.name = "RiverCaveEW_S";
  this.layers = [["static.png", "", -8*32, -47*32]];
}
RiverCaveEW_STile.prototype = new RiverBaseTile();

function RiverGrassSETile() {
  this.name = "RiverGrassSE";
  this.layers = [["static.png", "", -32, -42*32]];
}
RiverGrassSETile.prototype = new RiverBaseTile();

function RiverDirtSETile() {
  this.name = "RiverDirtSE";
  this.layers = [["static.png", "", -32, -41*32]];
}
RiverDirtSETile.prototype = new RiverBaseTile();

function RiverCaveSETile() {
  this.name = "RiverCaveSE";
  this.layers = [["static.png", "", -32, -47*32]];
}
RiverCaveSETile.prototype = new RiverBaseTile();

function RiverGrassSWTile() {
  this.name = "RiverGrassSW";
  this.layers = [["static.png", "", -2*32, -42*32]];
}
RiverGrassSWTile.prototype = new RiverBaseTile();

function RiverDirtSWTile() {
  this.name = "RiverDirtSW";
  this.layers = [["static.png", "", -2*32, -41*32]];
}
RiverDirtSWTile.prototype = new RiverBaseTile();

function RiverCaveSWTile() {
  this.name = "RiverCaveSW";
  this.layers = [["static.png", "", -2*32, -47*32]];
}
RiverCaveSWTile.prototype = new RiverBaseTile();

function RiverGrassNE_STile() {
  this.name = "RiverGrassNE_S";
  this.layers = [["static.png", "", -3*32, -42*32]];
}
RiverGrassNE_STile.prototype = new RiverBaseTile();

function RiverDirtNE_STile() {
  this.name = "RiverDirtNE_S";
  this.layers = [["static.png", "", -3*32, -41*32]];
}
RiverDirtNE_STile.prototype = new RiverBaseTile();

function RiverCaveNE_STile() {
  this.name = "RiverCaveNE_S";
  this.layers = [["static.png", "", -3*32, -47*32]];
}
RiverCaveNE_STile.prototype = new RiverBaseTile();

function RiverGrassEW_SNTile() {
  this.name = "RiverGrassEW_SN";
  this.layers = [["static.png", "", -4*32, -42*32]];
}
RiverGrassEW_SNTile.prototype = new RiverBaseTile();

function RiverDirtEW_SNTile() {
  this.name = "RiverDirtEW_SN";
  this.layers = [["static.png", "", -4*32, -41*32]];
}
RiverDirtEW_SNTile.prototype = new RiverBaseTile();

function RiverCaveEW_SNTile() {
  this.name = "RiverCaveEW_SN";
  this.layers = [["static.png", "", -4*32, -47*32]];
}
RiverCaveEW_SNTile.prototype = new RiverBaseTile();

function RiverGrassEW_NSTile() {
  this.name = "RiverGrassEW_NS";
  this.layers = [["static.png", "", -5*32, -42*32]];
}
RiverGrassEW_NSTile.prototype = new RiverBaseTile();

function RiverDirtEW_NSTile() {
  this.name = "RiverDirtEW_NS";
  this.layers = [["static.png", "", -5*32, -41*32]];
}
RiverDirtEW_NSTile.prototype = new RiverBaseTile();

function RiverCaveEW_NSTile() {
  this.name = "RiverCaveEW_NS";
  this.layers = [["static.png", "", -5*32, -47*32]];
}
RiverCaveEW_NSTile.prototype = new RiverBaseTile();

function RiverGrassNW_STile() {
  this.name = "RiverGrassNW_S";
  this.layers = [["static.png", "", -6*32, -42*32]];
}
RiverGrassNW_STile.prototype = new RiverBaseTile();

function RiverDirtNW_STile() {
  this.name = "RiverDirtNW_S";
  this.layers = [["static.png", "", -6*32, -41*32]];
}
RiverDirtNW_STile.prototype = new RiverBaseTile();

function RiverCaveNW_STile() {
  this.name = "RiverCaveNW_S";
  this.layers = [["static.png", "", -6*32, -47*32]];
}
RiverCaveNW_STile.prototype = new RiverBaseTile();

function RiverGrassNE_NTile() {
  this.name = "RiverGrassNE_N";
  this.layers = [["static.png", "", -4*32, -45*32]];
}
RiverGrassNE_NTile.prototype = new RiverBaseTile();

function RiverDirtNE_NTile() {
  this.name = "RiverDirtNE_N";
  this.layers = [["static.png", "", 0, -46*32]];
}
RiverDirtNE_NTile.prototype = new RiverBaseTile();

function RiverCaveNE_NTile() {
  this.name = "RiverCaveNE_N";
  this.layers = [["static.png", "", -2*32, -46*32]];
}
RiverCaveNE_NTile.prototype = new RiverBaseTile();

function RiverGrassNW_NTile() {
  this.name = "RiverGrassNW_N";
  this.layers = [["static.png", "", -5*32, -45*32]];
}
RiverGrassNW_NTile.prototype = new RiverBaseTile();

function RiverDirtNW_NTile() {
  this.name = "RiverDirtNW_N";
  this.layers = [["static.png", "", -1*32, -46*32]];
}
RiverDirtNW_NTile.prototype = new RiverBaseTile();

function RiverCaveNW_NTile() {
  this.name = "RiverCaveNW_N";
  this.layers = [["static.png", "", -3*32, -46*32]];
}
RiverCaveNW_NTile.prototype = new RiverBaseTile();

function RiverGrassMouthNTile() {
  this.name = "RiverGrassMouthN";
  this.layers = [["static.png", "", -7*32, -59*32]];
}
RiverGrassMouthNTile.prototype = new RiverBaseTile();

function RiverDirtMouthNTile() {
  this.name = "RiverDirtMouthN";
  this.layers = [["static.png", "", -8*32, -59*32]];
}
RiverDirtMouthNTile.prototype = new RiverBaseTile();

function RiverCaveMouthNTile() {
  this.name = "RiverCaveMouthN";
  this.layers = [["static.png", "", -9*32, -59*32]];
}
RiverCaveMouthNTile.prototype = new RiverBaseTile();

function RiverGrassMouthSTile() {
  this.name = "RiverGrassMouthS";
  this.layers = [["static.png", "", -0, -67*32]];
}
RiverGrassMouthSTile.prototype = new RiverBaseTile();

function RiverDirtMouthSTile() {
  this.name = "RiverDirtMouthS";
  this.layers = [["static.png", "", -1*32, -67*32]];
}
RiverDirtMouthSTile.prototype = new RiverBaseTile();

function RiverCaveMouthSTile() {
  this.name = "RiverCaveMouthS";
  this.layers = [["static.png", "", -9*32, -67*32]];
}
RiverCaveMouthSTile.prototype = new RiverBaseTile();

function RiverGrassMouthE_NTile() {
  this.name = "RiverGrassMouthE_N";
  this.layers = [["static.png", "", -9*32, -65*32]];
}
RiverGrassMouthE_NTile.prototype = new RiverBaseTile();

function RiverDirtMouthE_NTile() {
  this.name = "RiverDirtMouthE_N";
  this.layers = [["static.png", "", -1*32, -65*32]];
}
RiverDirtMouthE_NTile.prototype = new RiverBaseTile();

function RiverCaveMouthE_NTile() {
  this.name = "RiverCaveMouthE_N";
  this.layers = [["static.png", "", 0, -65*32]];
}
RiverCaveMouthE_NTile.prototype = new RiverBaseTile();

function RiverGrassMouthW_NTile() {
  this.name = "RiverGrassMouthW_N";
  this.layers = [["static.png", "", -6*32, -65*32]];
}
RiverGrassMouthW_NTile.prototype = new RiverBaseTile();

function RiverDirtMouthW_NTile() {
  this.name = "RiverDirtMouthW_N";
  this.layers = [["static.png", "", -7*32, -65*32]];
}
RiverDirtMouthW_NTile.prototype = new RiverBaseTile();

function RiverCaveMouthW_NTile() {
  this.name = "RiverCaveMouthW_N";
  this.layers = [["static.png", "", -8*32, -65*32]];
}
RiverCaveMouthW_NTile.prototype = new RiverBaseTile();

function RiverGrassSEW_STile() {
  this.name = "RiverGrassSEW_S";
  this.layers = [["static.png", "", -4*32, -62*32]];
}
RiverGrassSEW_STile.prototype = new RiverBaseTile();

function RiverDirtSEW_STile() {
  this.name = "RiverDirtSEW_S";
  this.layers = [["static.png", "", -5*32, -62*32]];
}
RiverDirtSEW_STile.prototype = new RiverBaseTile();

function RiverCaveSEW_STile() {
  this.name = "RiverCaveSEW_S";
  this.layers = [["static.png", "", -6*32, -62*32]];
}
RiverCaveSEW_STile.prototype = new RiverBaseTile();

function RiverGrassNSE_NTile() {
  this.name = "RiverGrassNSE_N";
  this.layers = [["static.png", "", -4*32, -63*32]];
}
RiverGrassNSE_NTile.prototype = new RiverBaseTile();

function RiverDirtNSE_NTile() {
  this.name = "RiverDirtNSE_N";
  this.layers = [["static.png", "", -5*32, -63*32]];
}
RiverDirtNSE_NTile.prototype = new RiverBaseTile();

function RiverCaveNSE_NTile() {
  this.name = "RiverCaveNSE_N";
  this.layers = [["static.png", "", -6*32, -63*32]];
}
RiverCaveNSE_NTile.prototype = new RiverBaseTile();

function RiverGrassNSW_STile() {
  this.name = "RiverGrassNSW_S";
  this.layers = [["static.png", "", -7*32, -62*32]];
}
RiverGrassNSW_STile.prototype = new RiverBaseTile();

function RiverDirtNSW_STile() {
  this.name = "RiverDirtNSW_S";
  this.layers = [["static.png", "", -4*32, -65*32]];
}
RiverDirtNSW_STile.prototype = new RiverBaseTile();

function RiverCaveNSW_STile() {
  this.name = "RiverCaveNSW_S";
  this.layers = [["static.png", "", -5*32, -65*32]];
}
RiverCaveNSW_STile.prototype = new RiverBaseTile();

function RiverGrassMouthW_STile() {
  this.name = "RiverGrassMouthW_S";
  this.layers = [["static.png", "", -9*32, -66*32]];
}
RiverGrassMouthW_STile.prototype = new RiverBaseTile();

function RiverDirtMouthW_STile() {
  this.name = "RiverDirtMouthW_S";
  this.layers = [["static.png", "", 0, -66*32]];
}
RiverDirtMouthW_STile.prototype = new RiverBaseTile();

function RiverCaveMouthW_STile() {
  this.name = "RiverCaveMouthW_S";
  this.layers = [["static.png", "", -1*32, -66*32]];
}
RiverCaveMouthW_STile.prototype = new RiverBaseTile();

function RiverGrassMouthE_STile() {
  this.name = "RiverGrassMouthE_S";
  this.layers = [["static.png", "", -4*32, -46*32]];
}
RiverGrassMouthE_STile.prototype = new RiverBaseTile();

function RiverDirtMouthE_STile() {
  this.name = "RiverDirtMouthE_S";
  this.layers = [["static.png", "", -5*32, -46*32]];
}
RiverDirtMouthE_STile.prototype = new RiverBaseTile();

function RiverCaveMouthE_STile() {
  this.name = "RiverCaveMouthE_S";
  this.layers = [["static.png", "", -2*32, -60*32]];
}
RiverCaveMouthE_STile.prototype = new RiverBaseTile();

function RiverGrassNSW_NTile() {
  this.name = "RiverGrassNSW_N";
  this.layers = [["static.png", "", -7*32, -63*32]];
}
RiverGrassNSW_NTile.prototype = new RiverBaseTile();

function RiverDirtNSW_NTile() {
  this.name = "RiverDirtNSW_N";
  this.layers = [["static.png", "", -4*32, -66*32]];
}
RiverDirtNSW_NTile.prototype = new RiverBaseTile();

function RiverCaveNSW_NTile() {
  this.name = "RiverCaveNSW_N";
  this.layers = [["static.png", "", -5*32, -66*32]];
}
RiverCaveNSW_NTile.prototype = new RiverBaseTile();

function RiverGrassNEW_STile() {
  this.name = "RiverGrassNEW_S";
  this.layers = [["static.png", "", -4*32, -64*32]];
}
RiverGrassNEW_STile.prototype = new RiverBaseTile();

function RiverDirtNEW_STile() {
  this.name = "RiverDirtNEW_S";
  this.layers = [["static.png", "", -5*32, -64*32]];
}
RiverDirtNEW_STile.prototype = new RiverBaseTile();

function RiverCaveNEW_STile() {
  this.name = "RiverCaveNEW_S";
  this.layers = [["static.png", "", -6*32, -64*32]];
}
RiverCaveNEW_STile.prototype = new RiverBaseTile();

function RiverGrassSEW_NTile() {
  this.name = "RiverGrassSEW_N";
  this.layers = [["static.png", "", -7*32, -64*32]];
}
RiverGrassSEW_NTile.prototype = new RiverBaseTile();

function RiverDirtSEW_NTile() {
  this.name = "RiverDirtSEW_N";
  this.layers = [["static.png", "", -4*32, -67*32]];
}
RiverDirtSEW_NTile.prototype = new RiverBaseTile();

function RiverCaveSEW_NTile() {
  this.name = "RiverCaveSEW_N";
  this.layers = [["static.png", "", -5*32, -67*32]];
}
RiverCaveSEW_NTile.prototype = new RiverBaseTile();

function RiverGrassNSE_STile() {
  this.name = "RiverGrassNSE_S";
  this.layers = [["static.png", "", -6*32, -66*32]];
}
RiverGrassNSE_STile.prototype = new RiverBaseTile();

function RiverDirtNSE_STile() {
  this.name = "RiverDirtNSE_S";
  this.layers = [["static.png", "", -7*32, -66*32]];
}
RiverDirtNSE_STile.prototype = new RiverBaseTile();

function RiverCaveNSE_STile() {
  this.name = "RiverCaveNSE_S";
  this.layers = [["static.png", "", -8*32, -66*32]];
}
RiverCaveNSE_STile.prototype = new RiverBaseTile();

function RiverGrassNEW_NTile() {
  this.name = "RiverGrassNEW_N";
  this.layers = [["static.png", "", -6*32, -67*32]];
}
RiverGrassNEW_NTile.prototype = new RiverBaseTile();

function RiverDirtNEW_NTile() {
  this.name = "RiverDirtNEW_N";
  this.layers = [["static.png", "", -7*32, -67*32]];
}
RiverDirtNEW_NTile.prototype = new RiverBaseTile();

function RiverCaveNEW_NTile() {
  this.name = "RiverCaveNEW_N";
  this.layers = [["static.png", "", -8*32, -67*32]];
}
RiverCaveNEW_NTile.prototype = new RiverBaseTile();

function RedCobblestoneTile() {
  //Graphics Upgraded
  this.name = "RedCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
RedCobblestoneTile.prototype = new TerrainObject();

function BlueCobblestoneTile() {
  //Graphics Upgraded
  this.name = "BlueCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BlueCobblestoneTile.prototype = new TerrainObject();

function BlackCobblestoneTile() {
  //Graphics Upgraded
  this.name = "BlackCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BlackCobblestoneTile.prototype = new TerrainObject();

function CrackedBlackCobblestoneTile() {
  //Graphics Upgraded
  this.name = "CrackedBlackCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
CrackedBlackCobblestoneTile.prototype = new TerrainObject();

function CobblestoneTile() {
  //Graphics Upgraded
  this.name = "Cobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
CobblestoneTile.prototype = new TerrainObject();

function BrokenCobblestoneTile() {
  //Graphics Upgraded
  this.name = "BrokenCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BrokenCobblestoneTile.prototype = new TerrainObject();

function FadedCobblestoneTile() {
  //Graphics Upgraded
  this.name = "FadedCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedCobblestoneTile.prototype = new TerrainObject();

function FadedCobblestone2Tile() {
  //Graphics Upgraded
  this.name = "FadedCobblestone2";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedCobblestone2Tile.prototype = new TerrainObject();

// atlas/editor needs start here
function ClayPaversTile() {
  //Graphics Upgraded
  this.name = "ClayPavers";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "clay brick floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
ClayPaversTile.prototype = new TerrainObject();

function FadedWoodNSTile() {
  //Graphics Upgraded
  this.name = "FadedWoodNS";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "wood floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedWoodNSTile.prototype = new TerrainObject();

function FadedWoodEWTile() {
  //Graphics Upgraded
  this.name = "FadedWoodEW";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "wood floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedWoodEWTile.prototype = new TerrainObject();

function BlueTileFloorTile() {
  //Graphics Upgraded
  this.name = "BlueTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "blue tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BlueTileFloorTile.prototype = new TerrainObject();

function BlueMarbleTileFloorTile() {
  //Graphics Upgraded
  this.name = "BlueMarbleTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BlueMarbleTileFloorTile.prototype = new TerrainObject();

function GreenTileFloorTile() {
  //Graphics Upgraded
  this.name = "GreenTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
GreenTileFloorTile.prototype = new TerrainObject();

function GreenCheckeredTileFloorTile() {
  //Graphics Upgraded
  this.name = "GreenCheckeredTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
GreenCheckeredTileFloorTile.prototype = new TerrainObject();

function StonePaverTile() {
  //Graphics Upgraded
  this.name = "StonePaver";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone paver";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
StonePaverTile.prototype = new TerrainObject();

function StonePaver2Tile() {
  //Graphics Upgraded
  this.name = "StonePaver2";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone paver";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
StonePaver2Tile.prototype = new TerrainObject();

function RedTileFloorTile() {
  //Graphics Upgraded
  this.name = "RedTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
RedTileFloorTile.prototype = new TerrainObject();

function DarkBlueTileFloorTile() {
  //Graphics Upgraded
  this.name = "DarkBlueTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
DarkBlueTileFloorTile.prototype = new TerrainObject();

function BrokenTileFloorTile() {
  //Graphics Upgraded
  this.name = "BrokenTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BrokenTileFloorTile.prototype = new TerrainObject();

function GreyTileFloorTile() {
  //Graphics Upgraded
  this.name = "GreyTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
GreyTileFloorTile.prototype = new TerrainObject();

function FadedFancyFloorTile() {
  //Graphics Upgraded
  this.name = "FadedFancyFloor";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedFancyFloorTile.prototype = new TerrainObject();

function FadedFancyFloor2Tile() {
  //Graphics Upgraded
  this.name = "FadedFancyFloor2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedFancyFloor2Tile.prototype = new TerrainObject();

function FadedFancyFloor3Tile() {
  //Graphics Upgraded
  this.name = "FadedFancyFloor3";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedFancyFloor3Tile.prototype = new TerrainObject();

function CrackedStoneFloorTile() {
  //Graphics Upgraded
  this.name = "CrackedStoneFloor";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
CrackedStoneFloorTile.prototype = new TerrainObject();

function FadedDarkWoodNSTile() {
  //Graphics Upgraded
  this.name = "FadedDarkWoodNS";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedDarkWoodNSTile.prototype = new TerrainObject();

function CobblestoneRoadTile() {
  //Graphics Upgraded
  this.name = "CobblestoneRoad";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
  this.civilizedpathweight = .6;
}
CobblestoneRoadTile.prototype = new TerrainObject();

function PurpleCobblestoneRoadTile() {
  //Graphics Upgraded
  this.name = "PurpleCobblestoneRoad";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
  this.civilizedpathweight = .6;
}
PurpleCobblestoneRoadTile.prototype = new TerrainObject();

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
  //Graphics Upgraded
  this.name = "PlanksEW";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
PlanksEWTile.prototype = new TerrainObject();

function DarkPlanksEWTile() {
  //Graphics Upgraded
  this.name = "DarkPlanksEW";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
DarkPlanksEWTile.prototype = new TerrainObject();

function RoughPlanksEWTile() {
  //Graphics Upgraded
  this.name = "RoughPlanksEW";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
RoughPlanksEWTile.prototype = new TerrainObject();

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

function MeadowTile() {
  // Graphics Upgraded
  this.name = "Meadow";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  this.combatmap = "Grass"; 
}
MeadowTile.prototype = new TerrainObject();

function GrassTile() {
  // Graphics Upgraded
  this.name = "Grass";
  this.graphic = "static.png";
  this.spritexoffset = -64;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.peerview = "#00c000";
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
  //Graphics Upgraded
  this.name = "Dirt";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
DirtTile.prototype = new TerrainObject();

function DirtScrubTile() {
  //Graphics Upgraded
  this.name = "DirtScrub";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
DirtScrubTile.prototype = new TerrainObject();

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
  //Graphics Upgraded
  this.name = "FallowFarm";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
FallowFarmTile.prototype = new TerrainObject();

function FarmTile() {
  //Graphics Upgraded
  this.name = "Farm";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
FarmTile.prototype = new TerrainObject();

function FallowFarm2Tile() {
  //Graphics Upgraded
  this.name = "FallowFarm2";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
FallowFarm2Tile.prototype = new TerrainObject();

function Farm2Tile() {
  //Graphics Upgraded
  this.name = "Farm2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
Farm2Tile.prototype = new TerrainObject();

function RoadTile() {
  //Graphics Upgraded
  this.name = "Road";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -9*32;
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

function RoadWNTile() {
  //Graphics Upgraded
  this.name = "RoadWN";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -8*32;
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
}
RoadWNTile.prototype = new TerrainObject();

function BrushTile() {
  //Graphics Upgraded
  this.name = "Brush";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = 0;
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
  // Graphics Upgraded
  this.name = "Underbrush";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
UnderbrushTile.prototype = new TerrainObject();

function SandTile() {
  //Graphics Upgraded
  this.name = "Sand";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "sand";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Grass";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
SandTile.prototype = new TerrainObject();

function SandVegetationTile() {
  //Graphics Upgraded
  this.name = "SandVegetation";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "sand";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Grass";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
SandVegetationTile.prototype = new TerrainObject();

function BrushNCoastTile() {
  //Graphics Upgraded
  this.name = "BrushNCoast";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -45*32;
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
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -45*32;
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
  //Graphics Upgraded
  this.name = "BrushSCoast";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -45*32;
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
  //Graphics Upgraded
  this.name = "BrushWCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -45*32;
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
  //Graphics Upgraded
  this.name = "Forest";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .5;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.pathweight = 1.3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
}
ForestTile.prototype = new TerrainObject();

function Forest2Tile() {
  //Graphics Upgraded
  this.name = "Forest2";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -32;
}
Forest2Tile.prototype = new ForestTile();

function ForestTilingNWTile() {
  //Graphics Upgraded
  this.name = "ForestTilingNW";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -62*32;
}
ForestTilingNWTile.prototype = new ForestTile();

function ForestTilingNETile() {
  //Graphics Upgraded
  this.name = "ForestTilingNE";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -62*32;
}
ForestTilingNETile.prototype = new ForestTile();

function ForestTilingWTile() {
  //Graphics Upgraded
  this.name = "ForestTilingW";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -63*32;
}
ForestTilingWTile.prototype = new ForestTile();

function ForestTilingETile() {
  //Graphics Upgraded
  this.name = "ForestTilingE";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -63*32;
}
ForestTilingETile.prototype = new ForestTile();

function ForestTilingSWTile() {
  //Graphics Upgraded
  this.name = "ForestTilingSW";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -64*32;
}
ForestTilingSWTile.prototype = new ForestTile();

function ForestTilingSETile() {
  //Graphics Upgraded
  this.name = "ForestTilingSE";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -64*32;
}
ForestTilingSETile.prototype = new ForestTile();

function ForestEdgeTile() {
  //Graphics Upgraded
  this.name = "ForestEdge";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -61*32;
}
ForestEdgeTile.prototype = new ForestTile();

function Forest3Tile() {
  //Graphics Upgraded
  this.name = "Forest3";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -61*32;
}
Forest3Tile.prototype = new ForestTile();

function ForestEdge3Tile() {
  //Graphics Upgraded
  this.name = "ForestEdge3";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -61*32;
}
ForestEdge3Tile.prototype = new ForestTile();

function ForestEdge4Tile() {
  //Graphics Upgraded
  this.name = "ForestEdge4";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -61*32;
}
ForestEdge4Tile.prototype = new ForestTile();

function ForestEdge5Tile() {
  //Graphics Upgraded
  this.name = "ForestEdge5";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -61*32;
}
ForestEdge5Tile.prototype = new ForestTile();

function DeadForestTile() {
  //Graphics Upgraded
  this.name = "DeadForest";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -32;
}
DeadForestTile.prototype = new ForestTile();

function EvergreenForestTile() {
  //Graphics Upgraded
  this.name = "EvergreenForest";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -32;
}
EvergreenForestTile.prototype = new ForestTile();

function EvergreenForestEdgeTile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdgeTile.prototype = new ForestTile();

function EvergreenForestEdge2Tile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdge2Tile.prototype = new ForestTile();

function EvergreenForestEdge3Tile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge3";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdge3Tile.prototype = new ForestTile();

function EvergreenForestEdge4Tile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge4";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdge4Tile.prototype = new ForestTile();

function BrightForestTile() {
  //Graphics Upgraded
  this.name = "BrightForest";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -32;
}
BrightForestTile.prototype = new ForestTile();

function BrightForest2Tile() {
  //Graphics Upgraded
  this.name = "BrightForest2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -32;
}
BrightForest2Tile.prototype = new ForestTile();

function BrightForestEdgeTile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -61*32;
}
BrightForestEdgeTile.prototype = new ForestTile();

function BrightForestEdge2Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge2";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge2Tile.prototype = new ForestTile();

function BrightForestEdge3Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge3";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge3Tile.prototype = new ForestTile();

function BrightForestEdge4Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge4";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge4Tile.prototype = new ForestTile();

function BrightForestEdge5Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge5";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge5Tile.prototype = new ForestTile();

function ForestNCoastTile() {
  //Graphics Upgraded
	this.name = "ForestNCoast";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -64*32;
}
ForestNCoastTile.prototype = new ForestTile();

function ForestECoastTile() {
  //Graphics Upgraded
	this.name = "ForestECoast";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -64*32;
}
ForestECoastTile.prototype = new ForestTile();

function ForestSCoastTile() {
  //Graphics Upgraded
	this.name = "ForestSCoast";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -64*32;
}
ForestSCoastTile.prototype = new ForestTile();

function ForestWCoastTile() {
  //Graphics Upgraded
	this.name = "ForestWCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -64*32;
}
ForestWCoastTile.prototype = new ForestTile();

function EvergreenForestNCoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestNCoast";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -63*32;
}
EvergreenForestNCoastTile.prototype = new ForestTile();

function EvergreenForestECoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestECoast";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -63*32;
}
EvergreenForestECoastTile.prototype = new ForestTile();

function EvergreenForestSCoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestSCoast";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -63*32;
}
EvergreenForestSCoastTile.prototype = new ForestTile();

function EvergreenForestWCoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestWCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -63*32;
}
EvergreenForestWCoastTile.prototype = new ForestTile();

function BrightForestNCoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestNCoast";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -62*32;
}
BrightForestNCoastTile.prototype = new ForestTile();

function BrightForestECoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestECoast";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -62*32;
}
BrightForestECoastTile.prototype = new ForestTile();

function BrightForestSCoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestSCoast";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -62*32;
}
BrightForestSCoastTile.prototype = new ForestTile();

function BrightForestWCoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestWCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -62*32;
}
BrightForestWCoastTile.prototype = new ForestTile();

function HillsTile() {
  // Graphics Upgraded
  this.name = "Hills";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = 0;
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

function Hills1Tile() {
  // Graphics Upgraded
  this.name = "Hills1";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "hills";
  this.initdelay = 1.5;
  this.pathweight = 1.5;
  this.combatmap = "Hill";
  this.peerview = "#49473a";
  this.walkSound = "hill";
}
Hills1Tile.prototype = new TerrainObject();

function Hills2Tile() {
  // Graphics Upgraded
  this.name = "Hills2";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -18*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "hills";
  this.initdelay = 1.5;
  this.pathweight = 1.5;
  this.combatmap = "Hill";
  this.peerview = "#49473a";
  this.walkSound = "hill";
}
Hills2Tile.prototype = new TerrainObject();

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
  //Graphics Upgraded
  this.name = "Swamp";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = 0;
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
  //Graphics Upgraded
  this.name = "Shingles";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
  this.peerview = "#474747";
}
ShinglesTile.prototype = new TerrainObject();

function Shingles2Tile() {
  //Graphics Upgraded
  this.name = "Shingles2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -10*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
  this.peerview = "#474747";
}
Shingles2Tile.prototype = new TerrainObject();

function ShinglesTopTile() {
  //Graphics Upgraded
  this.name = "ShinglesTop";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
  this.peerview = "#474747";
}
ShinglesTopTile.prototype = new TerrainObject();

function IcyFloorTile() {
  //Graphics Upgraded
	this.name = "IcyFloor";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -3*32;  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "icy floor";
	this.peerview = "#6c6c6c";
	this.walkSound = "stone";
}
IcyFloorTile.prototype = new TerrainObject();

function Icy2FloorTile() {
  //Graphics Upgraded
	this.name = "Icy2Floor";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -3*32;  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "icy floor";
	this.peerview = "#6c6c6c";
	this.walkSound = "stone";
}
Icy2FloorTile.prototype = new TerrainObject();

function CaveFloorTile() {
  //Graphics Upgraded
	this.name = "CaveFloor";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -3*32;  
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
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -3936;
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

function RoughStoneFloorTile() {
  //Graphics Upgraded
	this.name = "RoughStoneFloor";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -5*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#675151";
	this.walkSound = "stone";
}
RoughStoneFloorTile.prototype = new TerrainObject();

function LightRoughStoneFloorTile() {
  //Graphics Upgraded
	this.name = "LightRoughStoneFloor";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -5*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#675151";
	this.walkSound = "stone";
}
LightRoughStoneFloorTile.prototype = new TerrainObject();

function HexTransparentFloorTile() {
  //Graphics Upgraded
  // No longer a hex, but hey
	this.name = "HexTransparentFloor";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -10*32;
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

function CyanCobblestoneTile() {
  //Graphics Upgraded
	this.name = "CyanCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#ff5c50";
	this.walkSound = "stone";
}
CyanCobblestoneTile.prototype = new TerrainObject();

function GreenCobblestoneTile() {
  //Graphics Upgraded
	this.name = "GreenCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#ff5c50";
	this.walkSound = "stone";
}
GreenCobblestoneTile.prototype = new TerrainObject();

function GreenCheckeredFloorTile() {
  //Graphics Upgraded
	this.name = "GreenCheckeredFloor";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#50ff61";
	this.walkSound = "stone";
}
GreenCheckeredFloorTile.prototype = new TerrainObject();

function YellowCheckeredFloorTile() {
  //Graphics Upgraded
	this.name = "YellowCheckeredFloor";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#cf790b";
	this.walkSound = "stone";
}
YellowCheckeredFloorTile.prototype = new TerrainObject();

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
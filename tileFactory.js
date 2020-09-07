"use strict";

function tileFactory() {

}

// terrain factories:
tileFactory.prototype.createTile = function(tileName) {


  let thingy = "make"+tileName+"Tile";
  if (this[thingy] && (typeof this[thingy] == "function")) {
    let newthing = this[thingy]();
    newthing.assignSerial();
    return newthing;
  } else {
    alert(tileName + " is not a thing.");
  }
}

tileFactory.prototype.makeOceanTile = function() {
  let newTile = new OceanTile();
  return newTile;
}

tileFactory.prototype.makeWaterTile = function() {
  let newTile = new WaterTile();
  return newTile;
}

tileFactory.prototype.makeShallowsTile = function() {
  let newTile = new ShallowsTile();
  return newTile;
}

tileFactory.prototype.makeShadowOceanTile = function() {
  let newTile = new ShadowOceanTile();
  return newTile;
}

tileFactory.prototype.makeShadowWaterTile = function() {
  let newTile = new ShadowWaterTile();
  return newTile;
}

tileFactory.prototype.makeShadowShallowsTile = function() {
  let newTile = new ShadowShallowsTile();
  return newTile;
}

tileFactory.prototype.makeNoBlockMountainTile = function() {
  let newTile = new NoBlockMountainTile();
  return newTile;
}

tileFactory.prototype.makeMountainTile = function() {
  let newTile = new MountainTile();
  return newTile;
}

tileFactory.prototype.makeMountainPassTile = function() {
  let newTile = new MountainPassTile();
  return newTile;
}

tileFactory.prototype.makeFlameMountainTile = function() {
  let newTile = new FlameMountainTile();
  return newTile;
}

tileFactory.prototype.makeMountain1Tile = function() {
  let newTile = new Mountain1Tile();
  return newTile;
}

tileFactory.prototype.makeMountain2Tile = function() {
  let newTile = new Mountain2Tile();
  return newTile;
}

tileFactory.prototype.makeMountain1MeadowBaseTile = function() {
  let newTile = new Mountain1MeadowBaseTile();
  return newTile;
}

tileFactory.prototype.makeMountain1GrassBaseTile = function() {
  let newTile = new Mountain1GrassBaseTile();
  return newTile;
}

tileFactory.prototype.makeMountain1SandBaseTile = function() {
  let newTile = new Mountain1SandBaseTile();
  return newTile;
}

tileFactory.prototype.makeMountain1DirtBaseTile = function() {
  let newTile = new Mountain1DirtBaseTile();
  return newTile;
}

tileFactory.prototype.makeMountain1CaveBaseTile = function() {
  let newTile = new Mountain1CaveBaseTile();
  return newTile;
}

tileFactory.prototype.makeMountain2MeadowBaseTile = function() {
  let newTile = new Mountain2MeadowBaseTile();
  return newTile;
}

tileFactory.prototype.makeMountain2GrassBaseTile = function() {
  let newTile = new Mountain2GrassBaseTile();
  return newTile;
}

tileFactory.prototype.makeMountain2SandBaseTile = function() {
  let newTile = new Mountain2SandBaseTile();
  return newTile;
}

tileFactory.prototype.makeMountain2DirtBaseTile = function() {
  let newTile = new Mountain2DirtBaseTile();
  return newTile;
}

tileFactory.prototype.makeMountain2CaveBaseTile = function() {
  let newTile = new Mountain2CaveBaseTile();
  return newTile;
}

tileFactory.prototype.makeMountain1MeadowCrownTile = function() {
  let newTile = new Mountain1MeadowCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain1GrassCrownTile = function() {
  let newTile = new Mountain1GrassCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain1SandCrownTile = function() {
  let newTile = new Mountain1SandCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain1DirtCrownTile = function() {
  let newTile = new Mountain1DirtCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain1CaveCrownTile = function() {
  let newTile = new Mountain1CaveCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain2MeadowCrownTile = function() {
  let newTile = new Mountain2MeadowCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain2GrassCrownTile = function() {
  let newTile = new Mountain2GrassCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain2SandCrownTile = function() {
  let newTile = new Mountain2SandCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain2DirtCrownTile = function() {
  let newTile = new Mountain2DirtCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain2CaveCrownTile = function() {
  let newTile = new Mountain2CaveCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain1MeadowBaseCrownTile = function() {
  let newTile = new Mountain1MeadowBaseCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain1GrassBaseCrownTile = function() {
  let newTile = new Mountain1GrassBaseCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain1SandBaseCrownTile = function() {
  let newTile = new Mountain1SandBaseCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain1DirtBaseCrownTile = function() {
  let newTile = new Mountain1DirtBaseCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain1CaveBaseCrownTile = function() {
  let newTile = new Mountain1CaveBaseCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain2MeadowBaseCrownTile = function() {
  let newTile = new Mountain2MeadowBaseCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain2GrassBaseCrownTile = function() {
  let newTile = new Mountain2GrassBaseCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain2SandBaseCrownTile = function() {
  let newTile = new Mountain2SandBaseCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain2DirtBaseCrownTile = function() {
  let newTile = new Mountain2DirtBaseCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountain2CaveBaseCrownTile = function() {
  let newTile = new Mountain2CaveBaseCrownTile();
  return newTile;
}

tileFactory.prototype.makeMountainLeftMeadowTile = function() {
  let newTile = new MountainLeftMeadowTile();
  return newTile;
}

tileFactory.prototype.makeMountainLeftGrassTile = function() {
  let newTile = new MountainLeftGrassTile();
  return newTile;
}

tileFactory.prototype.makeMountainLeftSandTile = function() {
  let newTile = new MountainLeftSandTile();
  return newTile;
}

tileFactory.prototype.makeMountainLeftDirtTile = function() {
  let newTile = new MountainLeftDirtTile();
  return newTile;
}

tileFactory.prototype.makeMountainLeftCaveTile = function() {
  let newTile = new MountainLeftCaveTile();
  return newTile;
}

tileFactory.prototype.makeMountainRightMeadowTile = function() {
  let newTile = new MountainRightMeadowTile();
  return newTile;
}

tileFactory.prototype.makeMountainRightGrassTile = function() {
  let newTile = new MountainRightGrassTile();
  return newTile;
}

tileFactory.prototype.makeMountainRightSandTile = function() {
  let newTile = new MountainRightSandTile();
  return newTile;
}

tileFactory.prototype.makeMountainRightDirtTile = function() {
  let newTile = new MountainRightDirtTile();
  return newTile;
}

tileFactory.prototype.makeMountainRightCaveTile = function() {
  let newTile = new MountainRightCaveTile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfMeadow1Tile = function() {
  let newTile = new MountainHalfMeadow1Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfGrass1Tile = function() {
  let newTile = new MountainHalfGrass1Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfSand1Tile = function() {
  let newTile = new MountainHalfSand1Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfDirt1Tile = function() {
  let newTile = new MountainHalfDirt1Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfCave1Tile = function() {
  let newTile = new MountainHalfCave1Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfMeadow2Tile = function() {
  let newTile = new MountainHalfMeadow2Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfGrass2Tile = function() {
  let newTile = new MountainHalfGrass2Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfSand2Tile = function() {
  let newTile = new MountainHalfSand2Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfDirt2Tile = function() {
  let newTile = new MountainHalfDirt2Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfCave2Tile = function() {
  let newTile = new MountainHalfCave2Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfMeadow3Tile = function() {
  let newTile = new MountainHalfMeadow3Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfGrass3Tile = function() {
  let newTile = new MountainHalfGrass3Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfSand3Tile = function() {
  let newTile = new MountainHalfSand3Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfDirt3Tile = function() {
  let newTile = new MountainHalfDirt3Tile();
  return newTile;
}

tileFactory.prototype.makeMountainHalfCave3Tile = function() {
  let newTile = new MountainHalfCave3Tile();
  return newTile;
}

tileFactory.prototype.makeStoneWallTile = function() {
  let newTile = new StoneWallTile();
  return newTile;
}

tileFactory.prototype.makeStoneTile = function() {
  let newTile = new StoneTile();
  return newTile;
}

tileFactory.prototype.makeDirtStoneTile = function() {
  let newTile = new DirtStoneTile();
  return newTile;
}

tileFactory.prototype.makeMastTile = function() {
  let newTile = new MastTile();
  return newTile;
}

tileFactory.prototype.makeRiggingTile = function() {
  let newTile = new RiggingTile();
  return newTile;
}

tileFactory.prototype.makePillarTile = function() {
  let newTile = new PillarTile();
  return newTile;
}

tileFactory.prototype.makePurplePillarTile = function() {
  let newTile = new PurplePillarTile();
  return newTile;
}

tileFactory.prototype.makeFancyFloorTile = function() {
  let newTile = new FancyFloorTile();
  return newTile;
}

tileFactory.prototype.makeFancyFloor2Tile = function() {
  let newTile = new FancyFloor2Tile();
  return newTile;
}

tileFactory.prototype.makeFancyFloor3Tile = function() {
  let newTile = new FancyFloor3Tile();
  return newTile;
}

tileFactory.prototype.makeHorizontalCounterTile = function() {
  let newTile = new HorizontalCounterTile();
  return newTile;
}

tileFactory.prototype.makeRightCounterTile = function() {
  let newTile = new RightCounterTile();
  return newTile;
}

tileFactory.prototype.makeLeftCounterTile = function() {
  let newTile = new LeftCounterTile();
  return newTile;
}

tileFactory.prototype.makeCounterBoxTile = function() {
  let newTile = new CounterBoxTile();
  return newTile;
}

tileFactory.prototype.makeBlankBlackTile = function() {
  let newTile = new BlankBlackTile();
  return newTile;
}

tileFactory.prototype.makeChasmTile = function() {
  let newTile = new ChasmTile();
  return newTile;
}

tileFactory.prototype.makeDarknessTile = function() {
  let newTile = new DarknessTile();
  return newTile;
}

tileFactory.prototype.makeShinyWallTile = function() {
  let newTile = new ShinyWallTile();
  return newTile;
}

tileFactory.prototype.makeOffwhiteWallTile = function() {
  let newTile = new OffwhiteWallTile();
  return newTile;
}

tileFactory.prototype.makeWallTile = function() {
  let newTile = new WallTile();
  return newTile;
}

tileFactory.prototype.makeFireplaceWallTile = function() {
  let newTile = new FireplaceWallTile();
  return newTile;
}

tileFactory.prototype.makeGreyWallTile = function() {
  let newTile = new GreyWallTile();
  return newTile;
}

tileFactory.prototype.makeGreyFireplaceWallTile = function() {
  let newTile = new GreyFireplaceWallTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallTile = function() {
  let newTile = new RuinsWallTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallArchTile = function() {
  let newTile = new RuinsWallArchTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallIvyTile = function() {
  let newTile = new RuinsWallIvyTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallIvy2Tile = function() {
  let newTile = new RuinsWallIvy2Tile();
  return newTile;
}

tileFactory.prototype.makeIllusionaryRuinsWallTile = function() {
  let newTile = new IllusionaryRuinsWallTile();
  return newTile;
}

tileFactory.prototype.makeArrowSlitTile = function() {
  let newTile = new ArrowSlitTile();
  return newTile;
}

tileFactory.prototype.makeGreyArrowSlitTile = function() {
  let newTile = new GreyArrowSlitTile();
  return newTile;
}

tileFactory.prototype.makeWindowTile = function() {
  let newTile = new WindowTile();
  return newTile;
}

tileFactory.prototype.makeGreyWindowTile = function() {
  let newTile = new GreyWindowTile();
  return newTile;
}

tileFactory.prototype.makeShadowWindowTile = function() {
  let newTile = new ShadowWindowTile();
  return newTile;
}

tileFactory.prototype.makeWallNETile = function() {
  let newTile = new WallNETile();
  return newTile;
}

tileFactory.prototype.makeWallNWTile = function() {
  let newTile = new WallNWTile();
  return newTile;
}

tileFactory.prototype.makeWallSWTile = function() {
  let newTile = new WallSWTile();
  return newTile;
}

tileFactory.prototype.makeWallSETile = function() {
  let newTile = new WallSETile();
  return newTile;
}

tileFactory.prototype.makeVerticalCounterTile = function() {
  let newTile = new VerticalCounterTile();
  return newTile;
}

tileFactory.prototype.makeBottomCounterTile = function() {
  let newTile = new BottomCounterTile();
  return newTile;
}

tileFactory.prototype.makeTopCounterTile = function() {
  let newTile = new TopCounterTile();
  return newTile;
}

tileFactory.prototype.makePlanksNSTile = function() {
  let newTile = new PlanksNSTile();
  return newTile;
}

tileFactory.prototype.makeDarkPlanksNSTile = function() {
  let newTile = new DarkPlanksNSTile();
  return newTile;
}

tileFactory.prototype.makeRoughPlanksNSTile = function() {
  let newTile = new RoughPlanksNSTile();
  return newTile;
}

tileFactory.prototype.makeShadowPlanksNSTile = function() {
  let newTile = new ShadowPlanksNSTile();
  return newTile;
}

tileFactory.prototype.makeSouthCoastMeadowTile = function() {
  let newTile = new SouthCoastMeadowTile();
  return newTile;
}

tileFactory.prototype.makeSouthCoastTile = function() {
  let newTile = new SouthCoastTile();
  return newTile;
}

tileFactory.prototype.makeSouthCoastSandTile = function() {
  let newTile = new SouthCoastSandTile();
  return newTile;
}

tileFactory.prototype.makeSouthCoastDirtTile = function() {
  let newTile = new SouthCoastDirtTile();
  return newTile;
}

tileFactory.prototype.makeSouthCoastCaveTile = function() {
  let newTile = new SouthCoastCaveTile();
  return newTile;
}

tileFactory.prototype.makeNorthCoastMeadowTile = function() {
  let newTile = new NorthCoastMeadowTile();
  return newTile;
}

tileFactory.prototype.makeNorthCoastTile = function() {
  let newTile = new NorthCoastTile();
  return newTile;
}

tileFactory.prototype.makeNorthCoastSandTile = function() {
  let newTile = new NorthCoastSandTile();
  return newTile;
}

tileFactory.prototype.makeNorthCoastDirtTile = function() {
  let newTile = new NorthCoastDirtTile();
  return newTile;
}

tileFactory.prototype.makeNorthCoastCaveTile = function() {
  let newTile = new NorthCoastCaveTile();
  return newTile;
}

tileFactory.prototype.makeEastCoastMeadowTile = function() {
  let newTile = new EastCoastMeadowTile();
  return newTile;
}

tileFactory.prototype.makeEastCoastTile = function() {
  let newTile = new EastCoastTile();
  return newTile;
}

tileFactory.prototype.makeEastCoastSandTile = function() {
  let newTile = new EastCoastSandTile();
  return newTile;
}

tileFactory.prototype.makeEastCoastDirtTile = function() {
  let newTile = new EastCoastDirtTile();
  return newTile;
}

tileFactory.prototype.makeEastCoastCaveTile = function() {
  let newTile = new EastCoastCaveTile();
  return newTile;
}

tileFactory.prototype.makeWestCoastMeadowTile = function() {
  let newTile = new WestCoastMeadowTile();
  return newTile;
}

tileFactory.prototype.makeWestCoastTile = function() {
  let newTile = new WestCoastTile();
  return newTile;
}

tileFactory.prototype.makeWestCoastSandTile = function() {
  let newTile = new WestCoastSandTile();
  return newTile;
}

tileFactory.prototype.makeWestCoastDirtTile = function() {
  let newTile = new WestCoastDirtTile();
  return newTile;
}

tileFactory.prototype.makeWestCoastCaveTile = function() {
  let newTile = new WestCoastCaveTile();
  return newTile;
}

tileFactory.prototype.makeNortheastCoastMeadowTile = function() {
  let newTile = new NortheastCoastMeadowTile();
  return newTile;
}

tileFactory.prototype.makeNortheastCoastTile = function() {
  let newTile = new NortheastCoastTile();
  return newTile;
}

tileFactory.prototype.makeNortheastCoastSandTile = function() {
  let newTile = new NortheastCoastSandTile();
  return newTile;
}

tileFactory.prototype.makeNortheastCoastDirtTile = function() {
  let newTile = new NortheastCoastDirtTile();
  return newTile;
}

tileFactory.prototype.makeNortheastCoastCaveTile = function() {
  let newTile = new NortheastCoastCaveTile();
  return newTile;
}

tileFactory.prototype.makeSouthwestCoastMeadowTile = function() {
  let newTile = new SouthwestCoastMeadowTile();
  return newTile;
}

tileFactory.prototype.makeSouthwestCoastTile = function() {
  let newTile = new SouthwestCoastTile();
  return newTile;
}

tileFactory.prototype.makeSouthwestCoastSandTile = function() {
  let newTile = new SouthwestCoastSandTile();
  return newTile;
}

tileFactory.prototype.makeSouthwestCoastDirtTile = function() {
  let newTile = new SouthwestCoastDirtTile();
  return newTile;
}

tileFactory.prototype.makeSouthwestCoastCaveTile = function() {
  let newTile = new SouthwestCoastCaveTile();
  return newTile;
}

tileFactory.prototype.makeNorthwestCoastMeadowTile = function() {
  let newTile = new NorthwestCoastMeadowTile();
  return newTile;
}

tileFactory.prototype.makeNorthwestCoastTile = function() {
  let newTile = new NorthwestCoastTile();
  return newTile;
}

tileFactory.prototype.makeNorthwestCoastSandTile = function() {
  let newTile = new NorthwestCoastSandTile();
  return newTile;
}

tileFactory.prototype.makeNorthwestCoastDirtTile = function() {
  let newTile = new NorthwestCoastDirtTile();
  return newTile;
}

tileFactory.prototype.makeNorthwestCoastCaveTile = function() {
  let newTile = new NorthwestCoastCaveTile();
  return newTile;
}

tileFactory.prototype.makeSoutheastCoastMeadowTile = function() {
  let newTile = new SoutheastCoastMeadowTile();
  return newTile;
}

tileFactory.prototype.makeSoutheastCoastTile = function() {
  let newTile = new SoutheastCoastTile();
  return newTile;
}

tileFactory.prototype.makeSoutheastCoastSandTile = function() {
  let newTile = new SoutheastCoastSandTile();
  return newTile;
}

tileFactory.prototype.makeSoutheastCoastDirtTile = function() {
  let newTile = new SoutheastCoastDirtTile();
  return newTile;
}

tileFactory.prototype.makeSoutheastCoastCaveTile = function() {
  let newTile = new SoutheastCoastCaveTile();
  return newTile;
}

tileFactory.prototype.makeShadowSouthCoastTile = function() {
  let newTile = new ShadowSouthCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowNorthCoastTile = function() {
  let newTile = new ShadowNorthCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowEastCoastTile = function() {
  let newTile = new ShadowEastCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowWestCoastTile = function() {
  let newTile = new ShadowWestCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowNortheastCoastTile = function() {
  let newTile = new ShadowNortheastCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowSouthwestCoastTile = function() {
  let newTile = new ShadowSouthwestCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowNorthwestCoastTile = function() {
  let newTile = new ShadowNorthwestCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowSoutheastCoastTile = function() {
  let newTile = new ShadowSoutheastCoastTile();
  return newTile;
}

tileFactory.prototype.makeRiverTile = function() {
  let newTile = new RiverTile();
  return newTile;
}

tileFactory.prototype.makeRedCobblestoneTile = function() {
  let newTile = new RedCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeBlueCobblestoneTile = function() {
  let newTile = new BlueCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeBlackCobblestoneTile = function() {
  let newTile = new BlackCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeCrackedBlackCobblestoneTile = function() {
  let newTile = new CrackedBlackCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeCobblestoneTile = function() {
  let newTile = new CobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeBrokenCobblestoneTile = function() {
  let newTile = new BrokenCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeCobblestoneRoadTile = function() {
  let newTile = new CobblestoneRoadTile();
  return newTile;
}

tileFactory.prototype.makePurpleCobblestoneRoadTile = function() {
  let newTile = new PurpleCobblestoneRoadTile();
  return newTile;
}

tileFactory.prototype.makeShadowCobblestoneTile = function() {
  let newTile = new ShadowCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeShadowCobblestoneRoadTile = function() {
  let newTile = new ShadowCobblestoneRoadTile();
  return newTile;
}

tileFactory.prototype.makeBlueTilesTile = function() {
  let newTile = new BlueTilesTile();
  return newTile;
}

tileFactory.prototype.makePlanksEWTile = function() {
  let newTile = new PlanksEWTile();
  return newTile;
}

tileFactory.prototype.makeDarkPlanksEWTile = function() {
  let newTile = new DarkPlanksEWTile();
  return newTile;
}

tileFactory.prototype.makeRoughPlanksEWTile = function() {
  let newTile = new RoughPlanksEWTile();
  return newTile;
}

tileFactory.prototype.makeShadowPlanksEWTile = function() {
  let newTile = new ShadowPlanksEWTile();
  return newTile;
}

tileFactory.prototype.makeMeadowTile = function() {
  let newTile = new MeadowTile();
  return newTile;
}

tileFactory.prototype.makeGrassTile = function() {
  let newTile = new GrassTile();
  return newTile;
}

tileFactory.prototype.makeShadowGrassTile = function() {
  let newTile = new ShadowGrassTile();
  return newTile;
}

tileFactory.prototype.makeDirtTile = function() {
  let newTile = new DirtTile();
  return newTile;
}

tileFactory.prototype.makeDirtScrubTile = function() {
  let newTile = new DirtScrubTile();
  return newTile;
}

tileFactory.prototype.makeShadowDirtTile = function() {
  let newTile = new ShadowDirtTile();
  return newTile;
}

tileFactory.prototype.makeFallowFarmTile = function() {
  let newTile = new FallowFarmTile();
  return newTile;
}

tileFactory.prototype.makeFarmTile = function() {
  let newTile = new FarmTile();
  return newTile;
}

tileFactory.prototype.makeFallowFarm2Tile = function() {
  let newTile = new FallowFarm2Tile();
  return newTile;
}

tileFactory.prototype.makeFarm2Tile = function() {
  let newTile = new Farm2Tile();
  return newTile;
}

tileFactory.prototype.makeRoadTile = function() {
  let newTile = new RoadTile();
  return newTile;
}

tileFactory.prototype.makeRoadWNTile = function() {
  let newTile = new RoadWNTile();
  return newTile;
}

tileFactory.prototype.makeBrushTile = function() {
  let newTile = new BrushTile();
  return newTile;
}

tileFactory.prototype.makeShadowBrushTile = function() {
  let newTile = new ShadowBrushTile();
  return newTile;
}

tileFactory.prototype.makeUnderbrushTile = function() {
  let newTile = new UnderbrushTile();
  return newTile;
}

tileFactory.prototype.makeSandTile = function() {
  let newTile = new SandTile();
  return newTile;
}

tileFactory.prototype.makeSandVegetationTile = function() {
  let newTile = new SandVegetationTile();
  return newTile;
}

tileFactory.prototype.makeBrushNCoastTile = function() {
  let newTile = new BrushNCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowBrushNCoastTile = function() {
  let newTile = new ShadowBrushNCoastTile();
  return newTile;
}

tileFactory.prototype.makeBrushECoastTile = function() {
  let newTile = new BrushECoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowBrushECoastTile = function() {
  let newTile = new ShadowBrushECoastTile();
  return newTile;
}

tileFactory.prototype.makeBrushSCoastTile = function() {
  let newTile = new BrushSCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowBrushSCoastTile = function() {
  let newTile = new ShadowBrushSCoastTile();
  return newTile;
}

tileFactory.prototype.makeBrushWCoastTile = function() {
  let newTile = new BrushWCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowBrushWCoastTile = function() {
  let newTile = new ShadowBrushWCoastTile();
  return newTile;
}

tileFactory.prototype.makeForestTile = function() {
  let newTile = new ForestTile();
  return newTile;
}

tileFactory.prototype.makeForest2Tile = function() {
  let newTile = new Forest2Tile();
  return newTile;
}

tileFactory.prototype.makeForestEdgeTile = function() {
  let newTile = new ForestEdgeTile();
  return newTile;
}

tileFactory.prototype.makeForestEdge2Tile = function() {
  let newTile = new ForestEdge2Tile();
  return newTile;
}

tileFactory.prototype.makeForestEdge3Tile = function() {
  let newTile = new ForestEdge3Tile();
  return newTile;
}

tileFactory.prototype.makeForestEdge4Tile = function() {
  let newTile = new ForestEdge4Tile();
  return newTile;
}

tileFactory.prototype.makeForestEdge5Tile = function() {
  let newTile = new ForestEdge5Tile();
  return newTile;
}

tileFactory.prototype.makeDeadForestTile = function() {
  let newTile = new DeadForestTile();
  return newTile;
}

tileFactory.prototype.makeEvergreenForestTile = function() {
  let newTile = new EvergreenForestTile();
  return newTile;
}

tileFactory.prototype.makeEvergreenForestEdgeTile = function() {
  let newTile = new EvergreenForestEdgeTile();
  return newTile;
}

tileFactory.prototype.makeEvergreenForestEdge2Tile = function() {
  let newTile = new EvergreenForestEdge2Tile();
  return newTile;
}

tileFactory.prototype.makeEvergreenForestEdge3Tile = function() {
  let newTile = new EvergreenForestEdge3Tile();
  return newTile;
}

tileFactory.prototype.makeEvergreenForestEdge4Tile = function() {
  let newTile = new EvergreenForestEdge4Tile();
  return newTile;
}

tileFactory.prototype.makeBrightForestTile = function() {
  let newTile = new BrightForestTile();
  return newTile;
}

tileFactory.prototype.makeBrightForest2Tile = function() {
  let newTile = new BrightForest2Tile();
  return newTile;
}

tileFactory.prototype.makeBrightForestEdgeTile = function() {
  let newTile = new BrightForestEdgeTile();
  return newTile;
}

tileFactory.prototype.makeBrightForestEdge2Tile = function() {
  let newTile = new BrightForestEdge2Tile();
  return newTile;
}

tileFactory.prototype.makeBrightForestEdge3Tile = function() {
  let newTile = new BrightForestEdge3Tile();
  return newTile;
}

tileFactory.prototype.makeBrightForestEdge4Tile = function() {
  let newTile = new BrightForestEdge4Tile();
  return newTile;
}

tileFactory.prototype.makeBrightForestEdge5Tile = function() {
  let newTile = new BrightForestEdge5Tile();
  return newTile;
}

tileFactory.prototype.makeForestNCoastTile = function() {
  let newTile = new ForestNCoastTile();
  return newTile;
}

tileFactory.prototype.makeForestECoastTile = function() {
  let newTile = new ForestECoastTile();
  return newTile;
}

tileFactory.prototype.makeForestSCoastTile = function() {
  let newTile = new ForestSCoastTile();
  return newTile;
}

tileFactory.prototype.makeForestWCoastTile = function() {
  let newTile = new ForestWCoastTile();
  return newTile;
}

tileFactory.prototype.makeEvergreenForestNCoastTile = function() {
  let newTile = new EvergreenForestNCoastTile();
  return newTile;
}

tileFactory.prototype.makeEvergreenForestECoastTile = function() {
  let newTile = new EvergreenForestECoastTile();
  return newTile;
}

tileFactory.prototype.makeEvergreenForestSCoastTile = function() {
  let newTile = new EvergreenForestSCoastTile();
  return newTile;
}

tileFactory.prototype.makeEvergreenForestWCoastTile = function() {
  let newTile = new EvergreenForestWCoastTile();
  return newTile;
}

tileFactory.prototype.makeBrightForestNCoastTile = function() {
  let newTile = new BrightForestNCoastTile();
  return newTile;
}

tileFactory.prototype.makeBrightForestECoastTile = function() {
  let newTile = new BrightForestECoastTile();
  return newTile;
}

tileFactory.prototype.makeBrightForestSCoastTile = function() {
  let newTile = new BrightForestSCoastTile();
  return newTile;
}

tileFactory.prototype.makeBrightForestWCoastTile = function() {
  let newTile = new BrightForestWCoastTile();
  return newTile;
}

tileFactory.prototype.makeHillsTile = function() {
  let newTile = new HillsTile();
  return newTile;
}

tileFactory.prototype.makeHills1Tile = function() {
  let newTile = new Hills1Tile();
  return newTile;
}

tileFactory.prototype.makeHills2Tile = function() {
  let newTile = new Hills2Tile();
  return newTile;
}

tileFactory.prototype.makePurpleCobblestoneTile = function() {
  let newTile = new PurpleCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeShadowPurpleCobblestoneTile = function() {
  let newTile = new ShadowPurpleCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeSwampTile = function() {
  let newTile = new SwampTile();
  return newTile;
}

tileFactory.prototype.makeShadowSwampTile = function() {
  let newTile = new ShadowSwampTile();
  return newTile;
}

tileFactory.prototype.makeShinglesTile = function() {
  let newTile = new ShinglesTile();
  return newTile;
}

tileFactory.prototype.makeShingles2Tile = function() {
  let newTile = new Shingles2Tile();
  return newTile;
}

tileFactory.prototype.makeShinglesTopTile = function() {
  let newTile = new ShinglesTopTile();
  return newTile;
}

tileFactory.prototype.makeIcyFloorTile = function() {
  let newTile = new IcyFloorTile();
  return newTile;
}

tileFactory.prototype.makeIcy2FloorTile = function() {
  let newTile = new Icy2FloorTile();
  return newTile;
}

tileFactory.prototype.makeCaveFloorTile = function() {
  let newTile = new CaveFloorTile();
  return newTile;
}

tileFactory.prototype.makeCaveWallTile = function() {
  let newTile = new CaveWallTile();
  return newTile;
}

tileFactory.prototype.makeCaveColumnTile = function() {
  let newTile = new CaveColumnTile();
  return newTile;
}

tileFactory.prototype.makeWSFloorTile = function() {
  let newTile = new WSFloorTile();
  return newTile;
}

tileFactory.prototype.makeWSWallTile = function() {
  let newTile = new WSWallTile();
  return newTile;
}

tileFactory.prototype.makeWSWallVineTile = function() {
  let newTile = new WSWallVineTile();
  return newTile;
}

tileFactory.prototype.makeWSWallMoldTile = function() {
  let newTile = new WSWallMoldTile();
  return newTile;
}

tileFactory.prototype.makeRoughStoneFloorTile = function() {
  let newTile = new RoughStoneFloorTile();
  return newTile;
}

tileFactory.prototype.makeLightRoughStoneFloorTile = function() {
  let newTile = new LightRoughStoneFloorTile();
  return newTile;
}

tileFactory.prototype.makeHexTransparentFloorTile = function() {
  let newTile = new HexTransparentFloorTile();
  return newTile;
}

tileFactory.prototype.makeGoldOutlineFloorTile = function() {
  let newTile = new GoldOutlineFloorTile();
  return newTile;
}

tileFactory.prototype.makeDiamondFloorTile = function() {
  let newTile = new DiamondFloorTile();
  return newTile;
}

tileFactory.prototype.makeBlueDiamondFloorTile = function() {
  let newTile = new BlueDiamondFloorTile();
  return newTile;
}

tileFactory.prototype.makePurpleDiamondFloorTile = function() {
  let newTile = new PurpleDiamondFloorTile();
  return newTile;
}

tileFactory.prototype.makeCyanCobblestoneTile = function() {
  let newTile = new CyanCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeGreenCobblestoneTile = function() {
  let newTile = new GreenCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeGreenCheckeredFloorTile = function() {
  let newTile = new GreenCheckeredFloorTile();
  return newTile;
}

tileFactory.prototype.makeYellowCheckeredFloorTile = function() {
  let newTile = new YellowCheckeredFloorTile();
  return newTile;
}

tileFactory.prototype.makeBannerTile = function() {
  let newTile = new BannerTile();
  return newTile;
}

tileFactory.prototype.makePaladinBannerTile = function() {
  let newTile = new PaladinBannerTile();
  return newTile;
}

tileFactory.prototype.makeHildendainBannerTile = function() {
  let newTile = new HildendainBannerTile();
  return newTile;
}

tileFactory.prototype.makeLavaTubeTile = function() {
  let newTile = new LavaTubeTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetNWTile = function() {
  let newTile = new RedCarpetNWTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetNTile = function() {
  let newTile = new RedCarpetNTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetNETile = function() {
  let newTile = new RedCarpetNETile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetWTile = function() {
  let newTile = new RedCarpetWTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetCTile = function() {
  let newTile = new RedCarpetCTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetETile = function() {
  let newTile = new RedCarpetETile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetSWTile = function() {
  let newTile = new RedCarpetSWTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetSTile = function() {
  let newTile = new RedCarpetSTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetSETile = function() {
  let newTile = new RedCarpetSETile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetNWTile = function() {
  let newTile = new BlueCarpetNWTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetNTile = function() {
  let newTile = new BlueCarpetNTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetNETile = function() {
  let newTile = new BlueCarpetNETile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetWTile = function() {
  let newTile = new BlueCarpetWTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetCTile = function() {
  let newTile = new BlueCarpetCTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetETile = function() {
  let newTile = new BlueCarpetETile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetSWTile = function() {
  let newTile = new BlueCarpetSWTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetSTile = function() {
  let newTile = new BlueCarpetSTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetSETile = function() {
  let newTile = new BlueCarpetSETile();
  return newTile;
}

tileFactory.prototype.makeSeeBelowTile = function() {
  let newTile = new SeeBelowTile();
  return newTile;
}

tileFactory.prototype.makeWorldBelowTile = function() {
  let newTile = new WorldBelowTile();
  return newTile;
}

tileFactory.prototype.makeCastleGrassTile = function() {
  let newTile = new CastleGrassTile();
  return newTile;
}

tileFactory.prototype.makeLavaTile = function() {
  let newTile = new LavaTile();
  return newTile;
}

tileFactory.prototype.makePurpleCarpetNWTile = function() {
  let newTile = new PurpleCarpetNWTile();
  return newTile;
}

tileFactory.prototype.makePurpleCarpetNTile = function() {
  let newTile = new PurpleCarpetNTile();
  return newTile;
}

tileFactory.prototype.makePurpleCarpetNETile = function() {
  let newTile = new PurpleCarpetNETile();
  return newTile;
}

tileFactory.prototype.makePurpleCarpetWTile = function() {
  let newTile = new PurpleCarpetWTile();
  return newTile;
}

tileFactory.prototype.makePurpleCarpetCTile = function() {
  let newTile = new PurpleCarpetCTile();
  return newTile;
}

tileFactory.prototype.makePurpleCarpetETile = function() {
  let newTile = new PurpleCarpetETile();
  return newTile;
}

tileFactory.prototype.makePurpleCarpetSWTile = function() {
  let newTile = new PurpleCarpetSWTile();
  return newTile;
}

tileFactory.prototype.makePurpleCarpetSTile = function() {
  let newTile = new PurpleCarpetSTile();
  return newTile;
}

tileFactory.prototype.makePurpleCarpetSETile = function() {
  let newTile = new PurpleCarpetSETile();
  return newTile;
}

tileFactory.prototype.makeFringeCarpetNWTile = function() {
  let newTile = new FringeCarpetNWTile();
  return newTile;
}

tileFactory.prototype.makeFringeCarpetNTile = function() {
  let newTile = new FringeCarpetNTile();
  return newTile;
}

tileFactory.prototype.makeFringeCarpetNETile = function() {
  let newTile = new FringeCarpetNETile();
  return newTile;
}

tileFactory.prototype.makeFringeCarpetWTile = function() {
  let newTile = new FringeCarpetWTile();
  return newTile;
}

tileFactory.prototype.makeFringeCarpetCTile = function() {
  let newTile = new FringeCarpetCTile();
  return newTile;
}

tileFactory.prototype.makeFringeCarpetETile = function() {
  let newTile = new FringeCarpetETile();
  return newTile;
}

tileFactory.prototype.makeFringeCarpetSWTile = function() {
  let newTile = new FringeCarpetSWTile();
  return newTile;
}

tileFactory.prototype.makeFringeCarpetSTile = function() {
  let newTile = new FringeCarpetSTile();
  return newTile;
}

tileFactory.prototype.makeFringeCarpetSETile = function() {
  let newTile = new FringeCarpetSETile();
  return newTile;
}

tileFactory.prototype.makeWoodenPillarTile = function() {
  let newTile = new WoodenPillarTile();
  return newTile;
}

tileFactory.prototype.makeMarblePillarTile = function() {
  let newTile = new MarblePillarTile();
  return newTile;
}

tileFactory.prototype.makeCrackedMarblePillarTile = function() {
  let newTile = new CrackedMarblePillarTile();
  return newTile;
}

tileFactory.prototype.makeBrokenMarblePillarTile = function() {
  let newTile = new BrokenMarblePillarTile();
  return newTile;
}

tileFactory.prototype.makeFenceNSWTile = function() {
  let newTile = new FenceNSWTile();
  return newTile;
}

tileFactory.prototype.makeFenceWTile = function() {
  let newTile = new FenceWTile();
  return newTile;
}

tileFactory.prototype.makeFenceWBrokenTile = function() {
  let newTile = new FenceWBrokenTile();
  return newTile;
}

tileFactory.prototype.makeFenceEBrokenTile = function() {
  let newTile = new FenceEBrokenTile();
  return newTile;
}

tileFactory.prototype.makeFenceETile = function() {
  let newTile = new FenceETile();
  return newTile;
}

tileFactory.prototype.makeFencePostTile = function() {
  let newTile = new FencePostTile();
  return newTile;
}

tileFactory.prototype.makeFenceBrokenPostTile = function() {
  let newTile = new FenceBrokenPostTile();
  return newTile;
}

tileFactory.prototype.makeFenceNSEWTile = function() {
  let newTile = new FenceNSEWTile();
  return newTile;
}

tileFactory.prototype.makeFenceNWTile = function() {
  let newTile = new FenceNWTile();
  return newTile;
}

tileFactory.prototype.makeFenceNETile = function() {
  let newTile = new FenceNETile();
  return newTile;
}

tileFactory.prototype.makeFenceEWTile = function() {
  let newTile = new FenceEWTile();
  return newTile;
}

tileFactory.prototype.makeFenceSETile = function() {
  let newTile = new FenceSETile();
  return newTile;
}

tileFactory.prototype.makeFenceSWTile = function() {
  let newTile = new FenceSWTile();
  return newTile;
}

tileFactory.prototype.makeFenceNSTile = function() {
  let newTile = new FenceNSTile();
  return newTile;
}

tileFactory.prototype.makeFenceEWSTile = function() {
  let newTile = new FenceEWSTile();
  return newTile;
}

tileFactory.prototype.makeFenceEWNTile = function() {
  let newTile = new FenceEWNTile();
  return newTile;
}

tileFactory.prototype.makeFenceENSTile = function() {
  let newTile = new FenceENSTile();
  return newTile;
}

tileFactory.prototype.makeFenceEWGateTile = function() {
  let newTile = new FenceEWGateTile();
  return newTile;
}

tileFactory.prototype.makeStatueBaseTile = function() {
  let newTile = new StatueBaseTile();
  return newTile;
}

tileFactory.prototype.makeStatueTopTile = function() {
  let newTile = new StatueTopTile();
  return newTile;
}

tileFactory.prototype.makeStatue1Tile = function() {
  let newTile = new Statue1Tile();
  return newTile;
}

tileFactory.prototype.makeStatue2Tile = function() {
  let newTile = new Statue2Tile();
  return newTile;
}

tileFactory.prototype.makeStatue3Tile = function() {
  let newTile = new Statue3Tile();
  return newTile;
}

tileFactory.prototype.makeStatue4Tile = function() {
  let newTile = new Statue4Tile();
  return newTile;
}

tileFactory.prototype.makePaintingCrossTile = function() {
  let newTile = new PaintingCrossTile();
  return newTile;
}

tileFactory.prototype.makePaintingGreenTile = function() {
  let newTile = new PaintingGreenTile();
  return newTile;
}

tileFactory.prototype.makePaintingPurpleTile = function() {
  let newTile = new PaintingPurpleTile();
  return newTile;
}

tileFactory.prototype.makePaintingTreeTile = function() {
  let newTile = new PaintingTreeTile();
  return newTile;
}

tileFactory.prototype.makePedestalTile = function() {
  let newTile = new PedestalTile();
  return newTile;
}

tileFactory.prototype.makeWoodSignTile = function() {
  let newTile = new WoodSignTile();
  return newTile;
}

tileFactory.prototype.makeWoodSign1Tile = function() {
  let newTile = new WoodSign1Tile();
  return newTile;
}

tileFactory.prototype.makeWoodSign2Tile = function() {
  let newTile = new WoodSign2Tile();
  return newTile;
}

tileFactory.prototype.makeWoodSign3Tile = function() {
  let newTile = new WoodSign3Tile();
  return newTile;
}

tileFactory.prototype.makeWoodSign4Tile = function() {
  let newTile = new WoodSign4Tile();
  return newTile;
}

tileFactory.prototype.makeCoralTile = function() {
  let newTile = new CoralTile();
  return newTile;
}

tileFactory.prototype.makeDungeonTile = function() {
  let newTile = new DungeonTile();
  return newTile;
}

tileFactory.prototype.makeDungeon2Tile = function() {
  let newTile = new Dungeon2Tile();
  return newTile;
}

tileFactory.prototype.makeDungeon3Tile = function() {
  let newTile = new Dungeon3Tile();
  return newTile;
}

tileFactory.prototype.makeDungeon4Tile = function() {
  let newTile = new Dungeon4Tile();
  return newTile;
}

tileFactory.prototype.makeDungeon5Tile = function() {
  let newTile = new Dungeon5Tile();
  return newTile;
}

tileFactory.prototype.makeDungeon6Tile = function() {
  let newTile = new Dungeon6Tile();
  return newTile;
}

tileFactory.prototype.makeDungeon7Tile = function() {
  let newTile = new Dungeon7Tile();
  return newTile;
}

tileFactory.prototype.makeCaveTile = function() {
  let newTile = new CaveTile();
  return newTile;
}

tileFactory.prototype.makeTowneTile = function() {
  let newTile = new TowneTile();
  return newTile;
}

tileFactory.prototype.makeTowne2Tile = function() {
  let newTile = new Towne2Tile();
  return newTile;
}

tileFactory.prototype.makeTowne3Tile = function() {
  let newTile = new Towne3Tile();
  return newTile;
}

tileFactory.prototype.makeKeepTile = function() {
  let newTile = new KeepTile();
  return newTile;
}

tileFactory.prototype.makeGrassTowerTile = function() {
  let newTile = new GrassTowerTile();
  return newTile;
}

tileFactory.prototype.makeHillTowerTile = function() {
  let newTile = new HillTowerTile();
  return newTile;
}

tileFactory.prototype.makeLighthouseTile = function() {
  let newTile = new LighthouseTile();
  return newTile;
}

tileFactory.prototype.makeVillageTile = function() {
  let newTile = new VillageTile();
  return newTile;
}

tileFactory.prototype.makeHotelPheranTile = function() {
  let newTile = new HotelPheranTile();
  return newTile;
}

tileFactory.prototype.makeCastleTile = function() {
  let newTile = new CastleTile();
  return newTile;
}

tileFactory.prototype.makeLeftCastleTile = function() {
  let newTile = new LeftCastleTile();
  return newTile;
}

tileFactory.prototype.makeRightCastleTile = function() {
  let newTile = new RightCastleTile();
  return newTile;
}

tileFactory.prototype.makeFarLeftCastleTile = function() {
  let newTile = new FarLeftCastleTile();
  return newTile;
}

tileFactory.prototype.makeFarRightCastleTile = function() {
  let newTile = new FarRightCastleTile();
  return newTile;
}

tileFactory.prototype.makeUpperFarLeftCastleTile = function() {
  let newTile = new UpperFarLeftCastleTile();
  return newTile;
}

tileFactory.prototype.makeUpperFarRightCastleTile = function() {
  let newTile = new UpperFarRightCastleTile();
  return newTile;
}

tileFactory.prototype.makeUpperLeftCastleTile = function() {
  let newTile = new UpperLeftCastleTile();
  return newTile;
}

tileFactory.prototype.makeUpperRightCastleTile = function() {
  let newTile = new UpperRightCastleTile();
  return newTile;
}

tileFactory.prototype.makeUpperCenterCastleTile = function() {
  let newTile = new UpperCenterCastleTile();
  return newTile;
}

tileFactory.prototype.makePileOfRocksTile = function() {
  let newTile = new PileOfRocksTile();
  return newTile;
}

tileFactory.prototype.makeDoorwayTile = function() {
  let newTile = new DoorwayTile();
  return newTile;
}

tileFactory.prototype.makeGreyDoorwayTile = function() {
  let newTile = new GreyDoorwayTile();
  return newTile;
}

tileFactory.prototype.makeStoneDoorwayTile = function() {
  let newTile = new StoneDoorwayTile();
  return newTile;
}

tileFactory.prototype.makeWallDoorwayTile = function() {
  let newTile = new WallDoorwayTile();
  return newTile;
}

tileFactory.prototype.makeShrineTile = function() {
  let newTile = new ShrineTile();
  return newTile;
}

tileFactory.prototype.makeBrokenShrineTile = function() {
  let newTile = new BrokenShrineTile();
  return newTile;
}

tileFactory.prototype.makeRuinsTile = function() {
  let newTile = new RuinsTile();
  return newTile;
}

tileFactory.prototype.makeChestTile = function() {
  let newTile = new ChestTile();
  return newTile;
}

tileFactory.prototype.makeColinChestTile = function() {
  let newTile = new ColinChestTile();
  return newTile;
}

tileFactory.prototype.makeWallDoor1Tile = function() {
  let newTile = new WallDoor1Tile();
  return newTile;
}

tileFactory.prototype.makeWallDoorWindow1Tile = function() {
  let newTile = new WallDoorWindow1Tile();
  return newTile;
}

tileFactory.prototype.makeWallDoorWindow1LitTile = function() {
  let newTile = new WallDoorWindow1LitTile();
  return newTile;
}

tileFactory.prototype.makeGreyDoor1Tile = function() {
  let newTile = new GreyDoor1Tile();
  return newTile;
}

tileFactory.prototype.makeGreyDoorWindow1Tile = function() {
  let newTile = new GreyDoorWindow1Tile();
  return newTile;
}

tileFactory.prototype.makeGreyDoorWindow1LitTile = function() {
  let newTile = new GreyDoorWindow1LitTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow1Tile = function() {
  let newTile = new RuinsWallDoorWindow1Tile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow1LitTile = function() {
  let newTile = new RuinsWallDoorWindow1LitTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow2Tile = function() {
  let newTile = new RuinsWallDoorWindow2Tile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow2LitTile = function() {
  let newTile = new RuinsWallDoorWindow2LitTile();
  return newTile;
}

tileFactory.prototype.makeDoorWindowTile = function() {
  let newTile = new DoorWindowTile();
  return newTile;
}

tileFactory.prototype.makeDoorWindowLitTile = function() {
  let newTile = new DoorWindowLitTile();
  return newTile;
}

tileFactory.prototype.makeGreyDoorWindowTile = function() {
  let newTile = new GreyDoorWindowTile();
  return newTile;
}

tileFactory.prototype.makeGreyDoorWindowLitTile = function() {
  let newTile = new GreyDoorWindowLitTile();
  return newTile;
}

tileFactory.prototype.makeStonePortcullisTile = function() {
  let newTile = new StonePortcullisTile();
  return newTile;
}

tileFactory.prototype.makeStonePortcullisAlwaysClosedTile = function() {
  let newTile = new StonePortcullisAlwaysClosedTile();
  return newTile;
}

tileFactory.prototype.makeWallPortcullisTile = function() {
  let newTile = new WallPortcullisTile();
  return newTile;
}

tileFactory.prototype.makeGreyWallPortcullisTile = function() {
  let newTile = new GreyWallPortcullisTile();
  return newTile;
}

tileFactory.prototype.makeCorpseTile = function() {
  let newTile = new CorpseTile();
  return newTile;
}

tileFactory.prototype.makeBloodTile = function() {
  let newTile = new BloodTile();
  return newTile;
}

tileFactory.prototype.makeEnergyFieldTile = function() {
  let newTile = new EnergyFieldTile();
  return newTile;
}

tileFactory.prototype.makeTorchWestTile = function() {
  let newTile = new TorchWestTile();
  return newTile;
}

tileFactory.prototype.makeTorchEastTile = function() {
  let newTile = new TorchEastTile();
  return newTile;
}

tileFactory.prototype.makeTorchWestOutTile = function() {
  let newTile = new TorchWestOutTile();
  return newTile;
}

tileFactory.prototype.makeTorchEastOutTile = function() {
  let newTile = new TorchEastOutTile();
  return newTile;
}

tileFactory.prototype.makeWoodpileTile = function() {
  let newTile = new WoodpileTile();
  return newTile;
}

tileFactory.prototype.makeCampfireTile = function() {
  let newTile = new CampfireTile();
  return newTile;
}

tileFactory.prototype.makeCampfireExtinguishedTile = function() {
  let newTile = new CampfireExtinguishedTile();
  return newTile;
}

tileFactory.prototype.makeBrazierTile = function() {
  let newTile = new BrazierTile();
  return newTile;
}

tileFactory.prototype.makeUnlitBrazierTile = function() {
  let newTile = new UnlitBrazierTile();
  return newTile;
}

tileFactory.prototype.makeWEBrazierTile = function() {
  let newTile = new WEBrazierTile();
  return newTile;
}

tileFactory.prototype.makeUnlitWEBrazierTile = function() {
  let newTile = new UnlitWEBrazierTile();
  return newTile;
}

tileFactory.prototype.makeIllusionaryEnergyFieldTile = function() {
  let newTile = new IllusionaryEnergyFieldTile();
  return newTile;
}

tileFactory.prototype.makeCrystalTrapSpaceTile = function() {
  let newTile = new CrystalTrapSpaceTile();
  return newTile;
}

tileFactory.prototype.makeSpitTile = function() {
  let newTile = new SpitTile();
  return newTile;
}

tileFactory.prototype.makeFireplaceTile = function() {
  let newTile = new FireplaceTile();
  return newTile;
}

tileFactory.prototype.makeSmallFireplaceTile = function() {
  let newTile = new SmallFireplaceTile();
  return newTile;
}

tileFactory.prototype.makeDustyFireplaceTile = function() {
  let newTile = new DustyFireplaceTile();
  return newTile;
}

tileFactory.prototype.makeSmallDustyFireplaceTile = function() {
  let newTile = new SmallDustyFireplaceTile();
  return newTile;
}

tileFactory.prototype.makeAltarTile = function() {
  let newTile = new AltarTile();
  return newTile;
}

tileFactory.prototype.makeThroneTile = function() {
  let newTile = new ThroneTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallDoor1Tile = function() {
  let newTile = new RuinsWallDoor1Tile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallDoor2Tile = function() {
  let newTile = new RuinsWallDoor2Tile();
  return newTile;
}

tileFactory.prototype.makeDoorTile = function() {
  let newTile = new DoorTile();
  return newTile;
}

tileFactory.prototype.makeTalkingDoorTile = function() {
  let newTile = new TalkingDoorTile();
  return newTile;
}

tileFactory.prototype.makeGreyDoorTile = function() {
  let newTile = new GreyDoorTile();
  return newTile;
}

tileFactory.prototype.makeDoorStoneWallTile = function() {
  let newTile = new DoorStoneWallTile();
  return newTile;
}

tileFactory.prototype.makeSleepFieldTile = function() {
  let newTile = new SleepFieldTile();
  return newTile;
}

tileFactory.prototype.makeFireFieldTile = function() {
  let newTile = new FireFieldTile();
  return newTile;
}

tileFactory.prototype.makePoisonFieldTile = function() {
  let newTile = new PoisonFieldTile();
  return newTile;
}

tileFactory.prototype.makeLadderDownTile = function() {
  let newTile = new LadderDownTile();
  return newTile;
}

tileFactory.prototype.makeLadderUpTile = function() {
  let newTile = new LadderUpTile();
  return newTile;
}

tileFactory.prototype.makeStairDownTile = function() {
  let newTile = new StairDownTile();
  return newTile;
}

tileFactory.prototype.makeStairUpTile = function() {
  let newTile = new StairUpTile();
  return newTile;
}

tileFactory.prototype.makeStairDown2Tile = function() {
  let newTile = new StairDown2Tile();
  return newTile;
}

tileFactory.prototype.makeStairUp2Tile = function() {
  let newTile = new StairUp2Tile();
  return newTile;
}

tileFactory.prototype.makeWoodenStairDownTile = function() {
  let newTile = new WoodenStairDownTile();
  return newTile;
}

tileFactory.prototype.makeWoodenStairUpTile = function() {
  let newTile = new WoodenStairUpTile();
  return newTile;
}

tileFactory.prototype.makeWoodenStairDown2Tile = function() {
  let newTile = new WoodenStairDown2Tile();
  return newTile;
}

tileFactory.prototype.makeWoodenStairUp2Tile = function() {
  let newTile = new WoodenStairUp2Tile();
  return newTile;
}

tileFactory.prototype.makeSingleSignpostTile = function() {
  let newTile = new SingleSignpostTile();
  return newTile;
}

tileFactory.prototype.makeSignpostLeftTile = function() {
  let newTile = new SignpostLeftTile();
  return newTile;
}

tileFactory.prototype.makeSignpostRightTile = function() {
  let newTile = new SignpostRightTile();
  return newTile;
}

tileFactory.prototype.makeCarpenterSignTile = function() {
  let newTile = new CarpenterSignTile();
  return newTile;
}

tileFactory.prototype.makeInnSignTile = function() {
  let newTile = new InnSignTile();
  return newTile;
}

tileFactory.prototype.makeTavernSignTile = function() {
  let newTile = new TavernSignTile();
  return newTile;
}

tileFactory.prototype.makeArmourySignTile = function() {
  let newTile = new ArmourySignTile();
  return newTile;
}

tileFactory.prototype.makeGrocerSignTile = function() {
  let newTile = new GrocerSignTile();
  return newTile;
}

tileFactory.prototype.makeGrocerSign2Tile = function() {
  let newTile = new GrocerSign2Tile();
  return newTile;
}

tileFactory.prototype.makeWeaponSignTile = function() {
  let newTile = new WeaponSignTile();
  return newTile;
}

tileFactory.prototype.makeBowyerSignTile = function() {
  let newTile = new BowyerSignTile();
  return newTile;
}

tileFactory.prototype.makeAlchemistSignTile = function() {
  let newTile = new AlchemistSignTile();
  return newTile;
}

tileFactory.prototype.makeMagicShoppeSignTile = function() {
  let newTile = new MagicShoppeSignTile();
  return newTile;
}

tileFactory.prototype.makeHealerSignTile = function() {
  let newTile = new HealerSignTile();
  return newTile;
}

tileFactory.prototype.makeCasinoSignTile = function() {
  let newTile = new CasinoSignTile();
  return newTile;
}

tileFactory.prototype.makePaladinSignTile = function() {
  let newTile = new PaladinSignTile();
  return newTile;
}

tileFactory.prototype.makeHerbalistSignTile = function() {
  let newTile = new HerbalistSignTile();
  return newTile;
}

tileFactory.prototype.makeCartographerSignTile = function() {
  let newTile = new CartographerSignTile();
  return newTile;
}

tileFactory.prototype.makeWhitesmithSignTile = function() {
  let newTile = new WhitesmithSignTile();
  return newTile;
}

tileFactory.prototype.makeCourthouseSignTile = function() {
  let newTile = new CourthouseSignTile();
  return newTile;
}

tileFactory.prototype.makeBardSignTile = function() {
  let newTile = new BardSignTile();
  return newTile;
}

tileFactory.prototype.makeTombstoneTile = function() {
  let newTile = new TombstoneTile();
  return newTile;
}

tileFactory.prototype.makeTombstoneRIPTile = function() {
  let newTile = new TombstoneRIPTile();
  return newTile;
}

tileFactory.prototype.makeTrainingDummyTile = function() {
  let newTile = new TrainingDummyTile();
  return newTile;
}

tileFactory.prototype.makeArcheryTargetTile = function() {
  let newTile = new ArcheryTargetTile();
  return newTile;
}

tileFactory.prototype.makePottedPlantTile = function() {
  let newTile = new PottedPlantTile();
  return newTile;
}

tileFactory.prototype.makeWallPlaqueTile = function() {
  let newTile = new WallPlaqueTile();
  return newTile;
}

tileFactory.prototype.makeAnvilTile = function() {
  let newTile = new AnvilTile();
  return newTile;
}

tileFactory.prototype.makeWBridgeNSTile = function() {
  let newTile = new WBridgeNSTile();
  return newTile;
}

tileFactory.prototype.makeEBridgeNSTile = function() {
  let newTile = new EBridgeNSTile();
  return newTile;
}

tileFactory.prototype.makeBridgeNSTile = function() {
  let newTile = new BridgeNSTile();
  return newTile;
}

tileFactory.prototype.makeBridgeNSBrokenTile = function() {
  let newTile = new BridgeNSBrokenTile();
  return newTile;
}

tileFactory.prototype.makeNBridgeEWTile = function() {
  let newTile = new NBridgeEWTile();
  return newTile;
}

tileFactory.prototype.makeSBridgeEWTile = function() {
  let newTile = new SBridgeEWTile();
  return newTile;
}

tileFactory.prototype.makeBridgeEWTile = function() {
  let newTile = new BridgeEWTile();
  return newTile;
}

tileFactory.prototype.makeBridgeEWBrokenTile = function() {
  let newTile = new BridgeEWBrokenTile();
  return newTile;
}

tileFactory.prototype.makeLeftChairTile = function() {
  let newTile = new LeftChairTile();
  return newTile;
}

tileFactory.prototype.makeRightChairTile = function() {
  let newTile = new RightChairTile();
  return newTile;
}

tileFactory.prototype.makeTopChairTile = function() {
  let newTile = new TopChairTile();
  return newTile;
}

tileFactory.prototype.makeBottomChairTile = function() {
  let newTile = new BottomChairTile();
  return newTile;
}

tileFactory.prototype.makeSmallTableTile = function() {
  let newTile = new SmallTableTile();
  return newTile;
}

tileFactory.prototype.makeLeftTableTile = function() {
  let newTile = new LeftTableTile();
  return newTile;
}

tileFactory.prototype.makeMiddleTableTile = function() {
  let newTile = new MiddleTableTile();
  return newTile;
}

tileFactory.prototype.makeRightTableTile = function() {
  let newTile = new RightTableTile();
  return newTile;
}

tileFactory.prototype.makeFoodSouthTile = function() {
  let newTile = new FoodSouthTile();
  return newTile;
}

tileFactory.prototype.makeFoodNorthTile = function() {
  let newTile = new FoodNorthTile();
  return newTile;
}

tileFactory.prototype.makeFoodSouthNorthTile = function() {
  let newTile = new FoodSouthNorthTile();
  return newTile;
}

tileFactory.prototype.makeFoodSouthEdgeTile = function() {
  let newTile = new FoodSouthEdgeTile();
  return newTile;
}

tileFactory.prototype.makeFoodNorthEdgeTile = function() {
  let newTile = new FoodNorthEdgeTile();
  return newTile;
}

tileFactory.prototype.makeHarpsichordTile = function() {
  let newTile = new HarpsichordTile();
  return newTile;
}

tileFactory.prototype.makeBedHeadTile = function() {
  let newTile = new BedHeadTile();
  return newTile;
}

tileFactory.prototype.makeBedFootTile = function() {
  let newTile = new BedFootTile();
  return newTile;
}

tileFactory.prototype.makeDoubleBedTopHeadTile = function() {
  let newTile = new DoubleBedTopHeadTile();
  return newTile;
}

tileFactory.prototype.makeDoubleBedBottomHeadTile = function() {
  let newTile = new DoubleBedBottomHeadTile();
  return newTile;
}

tileFactory.prototype.makeDoubleBedTopFootTile = function() {
  let newTile = new DoubleBedTopFootTile();
  return newTile;
}

tileFactory.prototype.makeDoubleBedBottomFootTile = function() {
  let newTile = new DoubleBedBottomFootTile();
  return newTile;
}

tileFactory.prototype.makeBookshelfLeftTile = function() {
  let newTile = new BookshelfLeftTile();
  return newTile;
}

tileFactory.prototype.makeBookshelfRightTile = function() {
  let newTile = new BookshelfRightTile();
  return newTile;
}

tileFactory.prototype.makeBookshelfOneTile = function() {
  let newTile = new BookshelfOneTile();
  return newTile;
}

tileFactory.prototype.makeSmallBoxTile = function() {
  let newTile = new SmallBoxTile();
  return newTile;
}

tileFactory.prototype.makeDresserTile = function() {
  let newTile = new DresserTile();
  return newTile;
}

tileFactory.prototype.makeVanityTile = function() {
  let newTile = new VanityTile();
  return newTile;
}

tileFactory.prototype.makeCaskTile = function() {
  let newTile = new CaskTile();
  return newTile;
}

tileFactory.prototype.makeTreeTile = function() {
  let newTile = new TreeTile();
  return newTile;
}

tileFactory.prototype.makeAutumnTreeTile = function() {
  let newTile = new AutumnTreeTile();
  return newTile;
}

tileFactory.prototype.makeEvergreenTile = function() {
  let newTile = new EvergreenTile();
  return newTile;
}

tileFactory.prototype.makeWillowTreeTile = function() {
  let newTile = new WillowTreeTile();
  return newTile;
}

tileFactory.prototype.makeDeadTreeTile = function() {
  let newTile = new DeadTreeTile();
  return newTile;
}

tileFactory.prototype.makeAppleTreeTile = function() {
  let newTile = new AppleTreeTile();
  return newTile;
}

tileFactory.prototype.makeOlympusTapestryTile = function() {
  let newTile = new OlympusTapestryTile();
  return newTile;
}

tileFactory.prototype.makePaladinTapestryTile = function() {
  let newTile = new PaladinTapestryTile();
  return newTile;
}

tileFactory.prototype.makeHildendainTapestryTile = function() {
  let newTile = new HildendainTapestryTile();
  return newTile;
}

tileFactory.prototype.makeGrandfatherClockTile = function() {
  let newTile = new GrandfatherClockTile();
  return newTile;
}

tileFactory.prototype.makeBarrelTile = function() {
  let newTile = new BarrelTile();
  return newTile;
}

tileFactory.prototype.makeKitchenBarrelTile = function() {
  let newTile = new KitchenBarrelTile();
  return newTile;
}

tileFactory.prototype.makeKitchenBarrel2Tile = function() {
  let newTile = new KitchenBarrel2Tile();
  return newTile;
}

tileFactory.prototype.makeKitchenBarrel3Tile = function() {
  let newTile = new KitchenBarrel3Tile();
  return newTile;
}

tileFactory.prototype.makeMirrorTile = function() {
  let newTile = new MirrorTile();
  return newTile;
}

tileFactory.prototype.makeReflectionTile = function() {
  let newTile = new ReflectionTile();
  return newTile;
}

tileFactory.prototype.makeCursedMirrorTile = function() {
  let newTile = new CursedMirrorTile();
  return newTile;
}

tileFactory.prototype.makeCursedReflectionTile = function() {
  let newTile = new CursedReflectionTile();
  return newTile;
}

tileFactory.prototype.makeAlchemyLabTopTile = function() {
  let newTile = new AlchemyLabTopTile();
  return newTile;
}

tileFactory.prototype.makeAlchemyLabTop2Tile = function() {
  let newTile = new AlchemyLabTop2Tile();
  return newTile;
}

tileFactory.prototype.makeAlchemyLabTile = function() {
  let newTile = new AlchemyLabTile();
  return newTile;
}

tileFactory.prototype.makeAlchemyLab2Tile = function() {
  let newTile = new AlchemyLab2Tile();
  return newTile;
}

tileFactory.prototype.makeWaterfallTile = function() {
  let newTile = new WaterfallTile();
  return newTile;
}

tileFactory.prototype.makeWaterfallFlowTile = function() {
  let newTile = new WaterfallFlowTile();
  return newTile;
}

tileFactory.prototype.makeBrilliantPoolTile = function() {
  let newTile = new BrilliantPoolTile();
  return newTile;
}

tileFactory.prototype.makeSecretDoorTile = function() {
  let newTile = new SecretDoorTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallTallLeftMidRightTile = function() {
  let newTile = new RuinsWallTallLeftMidRightTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallTallLeftMidRight2Tile = function() {
  let newTile = new RuinsWallTallLeftMidRight2Tile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallMidLeftMidRightTile = function() {
  let newTile = new RuinsWallMidLeftMidRightTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallMidLeftTallRightTile = function() {
  let newTile = new RuinsWallMidLeftTallRightTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallMidLeftBottomRightTile = function() {
  let newTile = new RuinsWallMidLeftBottomRightTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallBottomLeftBottomRightTile = function() {
  let newTile = new RuinsWallBottomLeftBottomRightTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallBottomLeftMidRightTile = function() {
  let newTile = new RuinsWallBottomLeftMidRightTile();
  return newTile;
}

tileFactory.prototype.makeWellTile = function() {
  let newTile = new WellTile();
  return newTile;
}

tileFactory.prototype.makeWhirlpoolTile = function() {
  let newTile = new WhirlpoolTile();
  return newTile;
}

tileFactory.prototype.makeWhirlpoolFlukeTile = function() {
  let newTile = new WhirlpoolFlukeTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnTile = function() {
  let newTile = new WalkOnTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnWingTile = function() {
  let newTile = new WalkOnWingTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnConsolationTile = function() {
  let newTile = new WalkOnConsolationTile();
  return newTile;
}

tileFactory.prototype.makeToshinWalkOnTile = function() {
  let newTile = new ToshinWalkOnTile();
  return newTile;
}

tileFactory.prototype.makeWorldsEndingWalkOnTile = function() {
  let newTile = new WorldsEndingWalkOnTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnChangeExitTile = function() {
  let newTile = new WalkOnChangeExitTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnHC1Tile = function() {
  let newTile = new WalkOnHC1Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnHC2Tile = function() {
  let newTile = new WalkOnHC2Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnHC2ClockTile = function() {
  let newTile = new WalkOnHC2ClockTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnHC3TreeTile = function() {
  let newTile = new WalkOnHC3TreeTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnHC5Tile = function() {
  let newTile = new WalkOnHC5Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnHC6Tile = function() {
  let newTile = new WalkOnHC6Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnHC7Tile = function() {
  let newTile = new WalkOnHC7Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnNoGalaxyTile = function() {
  let newTile = new WalkOnNoGalaxyTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnGalaxy1Tile = function() {
  let newTile = new WalkOnGalaxy1Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnGalaxy2Tile = function() {
  let newTile = new WalkOnGalaxy2Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnGalaxy3Tile = function() {
  let newTile = new WalkOnGalaxy3Tile();
  return newTile;
}

tileFactory.prototype.makeWardukeWalkOnTile = function() {
  let newTile = new WardukeWalkOnTile();
  return newTile;
}

tileFactory.prototype.makeSpinnerTile = function() {
  let newTile = new SpinnerTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnMessageTile = function() {
  let newTile = new WalkOnMessageTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnRotateTile = function() {
  let newTile = new WalkOnRotateTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnWindTile = function() {
  let newTile = new WalkOnWindTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnDarknessTile = function() {
  let newTile = new WalkOnDarknessTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssTile = function() {
  let newTile = new WalkOnAbyssTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyss0Tile = function() {
  let newTile = new WalkOnAbyss0Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyss1Tile = function() {
  let newTile = new WalkOnAbyss1Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyss2Tile = function() {
  let newTile = new WalkOnAbyss2Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyss3Tile = function() {
  let newTile = new WalkOnAbyss3Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyss4Tile = function() {
  let newTile = new WalkOnAbyss4Tile();
  return newTile;
}

tileFactory.prototype.makeNightshadeSpawnerTile = function() {
  let newTile = new NightshadeSpawnerTile();
  return newTile;
}

tileFactory.prototype.makeSpawnerTile = function() {
  let newTile = new SpawnerTile();
  return newTile;
}

tileFactory.prototype.makePentagramNWTile = function() {
  let newTile = new PentagramNWTile();
  return newTile;
}

tileFactory.prototype.makePentagramNTile = function() {
  let newTile = new PentagramNTile();
  return newTile;
}

tileFactory.prototype.makePentagramNETile = function() {
  let newTile = new PentagramNETile();
  return newTile;
}

tileFactory.prototype.makePentagramWTile = function() {
  let newTile = new PentagramWTile();
  return newTile;
}

tileFactory.prototype.makePentagramCTile = function() {
  let newTile = new PentagramCTile();
  return newTile;
}

tileFactory.prototype.makePentagramETile = function() {
  let newTile = new PentagramETile();
  return newTile;
}

tileFactory.prototype.makePentagramSWTile = function() {
  let newTile = new PentagramSWTile();
  return newTile;
}

tileFactory.prototype.makePentagramSTile = function() {
  let newTile = new PentagramSTile();
  return newTile;
}

tileFactory.prototype.makePentagramSETile = function() {
  let newTile = new PentagramSETile();
  return newTile;
}

tileFactory.prototype.makeWeaponCounterDaggerTile = function() {
  let newTile = new WeaponCounterDaggerTile();
  return newTile;
}

tileFactory.prototype.makeWeaponCounterMaceTile = function() {
  let newTile = new WeaponCounterMaceTile();
  return newTile;
}

tileFactory.prototype.makeWeaponCounterSwordTile = function() {
  let newTile = new WeaponCounterSwordTile();
  return newTile;
}

tileFactory.prototype.makeArmorCounterLeatherTile = function() {
  let newTile = new ArmorCounterLeatherTile();
  return newTile;
}

tileFactory.prototype.makeArmorCounterChainTile = function() {
  let newTile = new ArmorCounterChainTile();
  return newTile;
}

tileFactory.prototype.makeArmorCounterPlateTile = function() {
  let newTile = new ArmorCounterPlateTile();
  return newTile;
}

tileFactory.prototype.makeArmorRackLeatherTile = function() {
  let newTile = new ArmorRackLeatherTile();
  return newTile;
}

tileFactory.prototype.makeArmorRackChainTile = function() {
  let newTile = new ArmorRackChainTile();
  return newTile;
}

tileFactory.prototype.makeArmorRackPlateTile = function() {
  let newTile = new ArmorRackPlateTile();
  return newTile;
}

tileFactory.prototype.makeShieldDisplayTile = function() {
  let newTile = new ShieldDisplayTile();
  return newTile;
}

tileFactory.prototype.makeSkeletonDecorationTile = function() {
  let newTile = new SkeletonDecorationTile();
  return newTile;
}

tileFactory.prototype.makeMoatLeverOffTile = function() {
  let newTile = new MoatLeverOffTile();
  return newTile;
}

tileFactory.prototype.makeLeverOffTile = function() {
  let newTile = new LeverOffTile();
  return newTile;
}

tileFactory.prototype.makeBDCLeverTile = function() {
  let newTile = new BDCLeverTile();
  return newTile;
}

tileFactory.prototype.makeGrottoLeverOffTile = function() {
  let newTile = new GrottoLeverOffTile();
  return newTile;
}

tileFactory.prototype.makeGrottoBridgeLever1Tile = function() {
  let newTile = new GrottoBridgeLever1Tile();
  return newTile;
}

tileFactory.prototype.makeGrottoBridgeLever2Tile = function() {
  let newTile = new GrottoBridgeLever2Tile();
  return newTile;
}

tileFactory.prototype.makeGrottoBridgeLever3Tile = function() {
  let newTile = new GrottoBridgeLever3Tile();
  return newTile;
}

tileFactory.prototype.makeMetalTwisterLeverTile = function() {
  let newTile = new MetalTwisterLeverTile();
  return newTile;
}

tileFactory.prototype.makePitDespairLeverTile = function() {
  let newTile = new PitDespairLeverTile();
  return newTile;
}

tileFactory.prototype.makeToshinLeverOffTile = function() {
  let newTile = new ToshinLeverOffTile();
  return newTile;
}

tileFactory.prototype.makeRoyalPuzzleLaserEWTile = function() {
  let newTile = new RoyalPuzzleLaserEWTile();
  return newTile;
}

tileFactory.prototype.makeRoyalPuzzleLaserNSTile = function() {
  let newTile = new RoyalPuzzleLaserNSTile();
  return newTile;
}

tileFactory.prototype.makeRoyalPuzzleLaserCrossTile = function() {
  let newTile = new RoyalPuzzleLaserCrossTile();
  return newTile;
}

tileFactory.prototype.makeSandstoneWallTile = function() {
  let newTile = new SandstoneWallTile();
  return newTile;
}

tileFactory.prototype.makeBlackDragonLadderWallTile = function() {
  let newTile = new BlackDragonLadderWallTile();
  return newTile;
}

tileFactory.prototype.makeWallOfWavesTile = function() {
  let newTile = new WallOfWavesTile();
  return newTile;
}

tileFactory.prototype.makeRuneOfWavesTile = function() {
  let newTile = new RuneOfWavesTile();
  return newTile;
}

tileFactory.prototype.makeWallOfWindsTile = function() {
  let newTile = new WallOfWindsTile();
  return newTile;
}

tileFactory.prototype.makeRuneOfWindsTile = function() {
  let newTile = new RuneOfWindsTile();
  return newTile;
}

tileFactory.prototype.makeWallOfKingsTile = function() {
  let newTile = new WallOfKingsTile();
  return newTile;
}

tileFactory.prototype.makeRuneOfKingsTile = function() {
  let newTile = new RuneOfKingsTile();
  return newTile;
}

tileFactory.prototype.makeWallOfFlamesTile = function() {
  let newTile = new WallOfFlamesTile();
  return newTile;
}

tileFactory.prototype.makeRuneOfFlamesTile = function() {
  let newTile = new RuneOfFlamesTile();
  return newTile;
}

tileFactory.prototype.makeWallOfVoidTile = function() {
  let newTile = new WallOfVoidTile();
  return newTile;
}

tileFactory.prototype.makeRuneOfVoidTile = function() {
  let newTile = new RuneOfVoidTile();
  return newTile;
}

tileFactory.prototype.makePlatformOfWavesTile = function() {
  let newTile = new PlatformOfWavesTile();
  return newTile;
}

tileFactory.prototype.makePlatformOfWindsTile = function() {
  let newTile = new PlatformOfWindsTile();
  return newTile;
}

tileFactory.prototype.makePlatformOfKingsTile = function() {
  let newTile = new PlatformOfKingsTile();
  return newTile;
}

tileFactory.prototype.makePlatformOfFlamesTile = function() {
  let newTile = new PlatformOfFlamesTile();
  return newTile;
}

tileFactory.prototype.makePlatformOfVoidTile = function() {
  let newTile = new PlatformOfVoidTile();
  return newTile;
}

tileFactory.prototype.makeMarkOfKingsTile = function() {
  let newTile = new MarkOfKingsTile();
  return newTile;
}

tileFactory.prototype.makeMarkOfWavesTile = function() {
  let newTile = new MarkOfWavesTile();
  return newTile;
}

tileFactory.prototype.makeMarkOfWindsTile = function() {
  let newTile = new MarkOfWindsTile();
  return newTile;
}

tileFactory.prototype.makeMarkOfFlamesTile = function() {
  let newTile = new MarkOfFlamesTile();
  return newTile;
}

tileFactory.prototype.makeFlameEternalTile = function() {
  let newTile = new FlameEternalTile();
  return newTile;
}

tileFactory.prototype.makeBrightFountainTile = function() {
  let newTile = new BrightFountainTile();
  return newTile;
}

tileFactory.prototype.makeBlueFountainTile = function() {
  let newTile = new BlueFountainTile();
  return newTile;
}

tileFactory.prototype.makeFountainTile = function() {
  let newTile = new FountainTile();
  return newTile;
}

tileFactory.prototype.makeBrokenFountainTile = function() {
  let newTile = new BrokenFountainTile();
  return newTile;
}

tileFactory.prototype.makeBlueCrystalTile = function() {
  let newTile = new BlueCrystalTile();
  return newTile;
}

tileFactory.prototype.makePurpleCrystalTile = function() {
  let newTile = new PurpleCrystalTile();
  return newTile;
}

tileFactory.prototype.makeYellowCrystalTile = function() {
  let newTile = new YellowCrystalTile();
  return newTile;
}

tileFactory.prototype.makeGreenCrystalTile = function() {
  let newTile = new GreenCrystalTile();
  return newTile;
}

tileFactory.prototype.makeRedCrystalTile = function() {
  let newTile = new RedCrystalTile();
  return newTile;
}

tileFactory.prototype.makeWhiteCrystalTile = function() {
  let newTile = new WhiteCrystalTile();
  return newTile;
}

tileFactory.prototype.makeTeleporterPlatformTile = function() {
  let newTile = new TeleporterPlatformTile();
  return newTile;
}

tileFactory.prototype.makePitTeleporterPlatformTile = function() {
  let newTile = new PitTeleporterPlatformTile();
  return newTile;
}

tileFactory.prototype.makeToshinPanelTile = function() {
  let newTile = new ToshinPanelTile();
  return newTile;
}

tileFactory.prototype.makeToshinMoatLeverOffTile = function() {
  let newTile = new ToshinMoatLeverOffTile();
  return newTile;
}

tileFactory.prototype.makeOrbToggleTile = function() {
  let newTile = new OrbToggleTile();
  return newTile;
}

tileFactory.prototype.makeDrashOrbToggleTile = function() {
  let newTile = new DrashOrbToggleTile();
  return newTile;
}

tileFactory.prototype.makeOrbStrengthTile = function() {
  let newTile = new OrbStrengthTile();
  return newTile;
}

tileFactory.prototype.makeOrbDexterityTile = function() {
  let newTile = new OrbDexterityTile();
  return newTile;
}

tileFactory.prototype.makeOrbIntelligenceTile = function() {
  let newTile = new OrbIntelligenceTile();
  return newTile;
}

tileFactory.prototype.makeOrbExperienceTile = function() {
  let newTile = new OrbExperienceTile();
  return newTile;
}

tileFactory.prototype.makeEtherGateTile = function() {
  let newTile = new EtherGateTile();
  return newTile;
}

tileFactory.prototype.makeMoongateTile = function() {
  let newTile = new MoongateTile();
  return newTile;
}

tileFactory.prototype.makePetrifiedReaperTile = function() {
  let newTile = new PetrifiedReaperTile();
  return newTile;
}

tileFactory.prototype.makeOracleLowerLeftTile = function() {
  let newTile = new OracleLowerLeftTile();
  return newTile;
}

tileFactory.prototype.makeOracleLowerRightTile = function() {
  let newTile = new OracleLowerRightTile();
  return newTile;
}

tileFactory.prototype.makeOracleMidLeftTile = function() {
  let newTile = new OracleMidLeftTile();
  return newTile;
}

tileFactory.prototype.makeOracleMidRightTile = function() {
  let newTile = new OracleMidRightTile();
  return newTile;
}

tileFactory.prototype.makeOracleTopLeftTile = function() {
  let newTile = new OracleTopLeftTile();
  return newTile;
}

tileFactory.prototype.makeOracleTopRightTile = function() {
  let newTile = new OracleTopRightTile();
  return newTile;
}

tileFactory.prototype.makeAltarWithSwordTile = function() {
  let newTile = new AltarWithSwordTile();
  return newTile;
}

tileFactory.prototype.makeAmbroseShieldTile = function() {
  let newTile = new AmbroseShieldTile();
  return newTile;
}

tileFactory.prototype.makeRobertMapTile = function() {
  let newTile = new RobertMapTile();
  return newTile;
}

tileFactory.prototype.makeSmallRockTile = function() {
  let newTile = new SmallRockTile();
  return newTile;
}

tileFactory.prototype.makeSiriCloakTile = function() {
  let newTile = new SiriCloakTile();
  return newTile;
}

tileFactory.prototype.makeCrownTile = function() {
  let newTile = new CrownTile();
  return newTile;
}

tileFactory.prototype.makeCrownJewelTile = function() {
  let newTile = new CrownJewelTile();
  return newTile;
}

tileFactory.prototype.makeSceptreTile = function() {
  let newTile = new SceptreTile();
  return newTile;
}

tileFactory.prototype.makeChaliceTile = function() {
  let newTile = new ChaliceTile();
  return newTile;
}

tileFactory.prototype.makeCourierPouchTile = function() {
  let newTile = new CourierPouchTile();
  return newTile;
}

tileFactory.prototype.makeCourierLetterTile = function() {
  let newTile = new CourierLetterTile();
  return newTile;
}

tileFactory.prototype.makeTrustedPlansTile = function() {
  let newTile = new TrustedPlansTile();
  return newTile;
}

tileFactory.prototype.makeTrustedPinTile = function() {
  let newTile = new TrustedPinTile();
  return newTile;
}

tileFactory.prototype.makeReaperBarkTile = function() {
  let newTile = new ReaperBarkTile();
  return newTile;
}

tileFactory.prototype.makeBlackDragonScaleTile = function() {
  let newTile = new BlackDragonScaleTile();
  return newTile;
}

tileFactory.prototype.makeDragonBoneTile = function() {
  let newTile = new DragonBoneTile();
  return newTile;
}

tileFactory.prototype.makeVoidstoneSculptureTile = function() {
  let newTile = new VoidstoneSculptureTile();
  return newTile;
}

tileFactory.prototype.makeStoneOfConflagrationsTile = function() {
  let newTile = new StoneOfConflagrationsTile();
  return newTile;
}

tileFactory.prototype.makeBrokenArrowTile = function() {
  let newTile = new BrokenArrowTile();
  return newTile;
}

tileFactory.prototype.makeTreasuryTokenTile = function() {
  let newTile = new TreasuryTokenTile();
  return newTile;
}

tileFactory.prototype.makeFavorChitTile = function() {
  let newTile = new FavorChitTile();
  return newTile;
}

tileFactory.prototype.makeVoidstoneTile = function() {
  let newTile = new VoidstoneTile();
  return newTile;
}

tileFactory.prototype.makeSpiderSilkTile = function() {
  let newTile = new SpiderSilkTile();
  return newTile;
}

tileFactory.prototype.makeBlackPearlTile = function() {
  let newTile = new BlackPearlTile();
  return newTile;
}

tileFactory.prototype.makeExecutionersHoodTile = function() {
  let newTile = new ExecutionersHoodTile();
  return newTile;
}

tileFactory.prototype.makeQuestExecutionersHoodTile = function() {
  let newTile = new QuestExecutionersHoodTile();
  return newTile;
}

tileFactory.prototype.makeNightshadeTile = function() {
  let newTile = new NightshadeTile();
  return newTile;
}

tileFactory.prototype.makeSulfurousAshTile = function() {
  let newTile = new SulfurousAshTile();
  return newTile;
}

tileFactory.prototype.makeMassOfHerbsTile = function() {
  let newTile = new MassOfHerbsTile();
  return newTile;
}

tileFactory.prototype.makeMandrakeRootTile = function() {
  let newTile = new MandrakeRootTile();
  return newTile;
}

tileFactory.prototype.makeLightningWoodTile = function() {
  let newTile = new LightningWoodTile();
  return newTile;
}

tileFactory.prototype.makeMistletoeTile = function() {
  let newTile = new MistletoeTile();
  return newTile;
}

tileFactory.prototype.makeBloodMossTile = function() {
  let newTile = new BloodMossTile();
  return newTile;
}

tileFactory.prototype.makeBottledEtherTile = function() {
  let newTile = new BottledEtherTile();
  return newTile;
}

tileFactory.prototype.makePerfectRubyTile = function() {
  let newTile = new PerfectRubyTile();
  return newTile;
}

tileFactory.prototype.makeUncutLargeRubyTile = function() {
  let newTile = new UncutLargeRubyTile();
  return newTile;
}

tileFactory.prototype.makeRubyTile = function() {
  let newTile = new RubyTile();
  return newTile;
}

tileFactory.prototype.makeUncutRubyTile = function() {
  let newTile = new UncutRubyTile();
  return newTile;
}

tileFactory.prototype.makeSmallSapphireTile = function() {
  let newTile = new SmallSapphireTile();
  return newTile;
}

tileFactory.prototype.makeUncutSapphireTile = function() {
  let newTile = new UncutSapphireTile();
  return newTile;
}

tileFactory.prototype.makeGemsTile = function() {
  let newTile = new GemsTile();
  return newTile;
}

tileFactory.prototype.makeUncutGemsTile = function() {
  let newTile = new UncutGemsTile();
  return newTile;
}

tileFactory.prototype.makeRubyGemoftheSunTile = function() {
  let newTile = new RubyGemoftheSunTile();
  return newTile;
}

tileFactory.prototype.makeDecorativeArmorTile = function() {
  let newTile = new DecorativeArmorTile();
  return newTile;
}

tileFactory.prototype.makeFluteTile = function() {
  let newTile = new FluteTile();
  return newTile;
}

tileFactory.prototype.makeDrumTile = function() {
  let newTile = new DrumTile();
  return newTile;
}

tileFactory.prototype.makeLyreTile = function() {
  let newTile = new LyreTile();
  return newTile;
}

tileFactory.prototype.makeLuteTile = function() {
  let newTile = new LuteTile();
  return newTile;
}

tileFactory.prototype.makeHornTile = function() {
  let newTile = new HornTile();
  return newTile;
}

tileFactory.prototype.makeMortarTile = function() {
  let newTile = new MortarTile();
  return newTile;
}

tileFactory.prototype.makeAppleTile = function() {
  let newTile = new AppleTile();
  return newTile;
}

tileFactory.prototype.makeCrystalMortarTile = function() {
  let newTile = new CrystalMortarTile();
  return newTile;
}

tileFactory.prototype.makeJadeNecklaceTile = function() {
  let newTile = new JadeNecklaceTile();
  return newTile;
}

tileFactory.prototype.makeGoldLocketTile = function() {
  let newTile = new GoldLocketTile();
  return newTile;
}

tileFactory.prototype.makeGoldTile = function() {
  let newTile = new GoldTile();
  return newTile;
}

tileFactory.prototype.makeHomeKeyTile = function() {
  let newTile = new HomeKeyTile();
  return newTile;
}

tileFactory.prototype.makeToshinKeyTile = function() {
  let newTile = new ToshinKeyTile();
  return newTile;
}

tileFactory.prototype.makePitOfDespairKeyTile = function() {
  let newTile = new PitOfDespairKeyTile();
  return newTile;
}

tileFactory.prototype.makeInnerPitOfDespairKeyTile = function() {
  let newTile = new InnerPitOfDespairKeyTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfSpiritsTile = function() {
  let newTile = new KeyOfSpiritsTile();
  return newTile;
}

tileFactory.prototype.makeRoyalKeyTile = function() {
  let newTile = new RoyalKeyTile();
  return newTile;
}

tileFactory.prototype.makeBlackDragonKeyTile = function() {
  let newTile = new BlackDragonKeyTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfAshesTile = function() {
  let newTile = new KeyOfAshesTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfIceTile = function() {
  let newTile = new KeyOfIceTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfBoneTile = function() {
  let newTile = new KeyOfBoneTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfDustTile = function() {
  let newTile = new KeyOfDustTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfSunTile = function() {
  let newTile = new KeyOfSunTile();
  return newTile;
}

tileFactory.prototype.makeStoneOfShadowTile = function() {
  let newTile = new StoneOfShadowTile();
  return newTile;
}

tileFactory.prototype.makeSheafOfNotesTile = function() {
  let newTile = new SheafOfNotesTile();
  return newTile;
}

tileFactory.prototype.makeXoriccoRecipeTile = function() {
  let newTile = new XoriccoRecipeTile();
  return newTile;
}

tileFactory.prototype.makeClearLakeReportTile = function() {
  let newTile = new ClearLakeReportTile();
  return newTile;
}

tileFactory.prototype.makeBeldskaeReportTile = function() {
  let newTile = new BeldskaeReportTile();
  return newTile;
}

tileFactory.prototype.makeSwainhilReportTile = function() {
  let newTile = new SwainhilReportTile();
  return newTile;
}

tileFactory.prototype.makeFallOfTargrionTile = function() {
  let newTile = new FallOfTargrionTile();
  return newTile;
}

tileFactory.prototype.makeBookOfLoreTile = function() {
  let newTile = new BookOfLoreTile();
  return newTile;
}

tileFactory.prototype.makeEshkazBookTile = function() {
  let newTile = new EshkazBookTile();
  return newTile;
}

tileFactory.prototype.makeTomeOfSightTile = function() {
  let newTile = new TomeOfSightTile();
  return newTile;
}

tileFactory.prototype.makeMapsAndLegendsTile = function() {
  let newTile = new MapsAndLegendsTile();
  return newTile;
}

tileFactory.prototype.makeATreatiseOnDragonsTile = function() {
  let newTile = new ATreatiseOnDragonsTile();
  return newTile;
}

tileFactory.prototype.makeNatassaJournalTile = function() {
  let newTile = new NatassaJournalTile();
  return newTile;
}

tileFactory.prototype.makeNatassaResearchTile = function() {
  let newTile = new NatassaResearchTile();
  return newTile;
}

tileFactory.prototype.makeNatassaResearch2Tile = function() {
  let newTile = new NatassaResearch2Tile();
  return newTile;
}

tileFactory.prototype.makeToshinJournalTile = function() {
  let newTile = new ToshinJournalTile();
  return newTile;
}

tileFactory.prototype.makeArcheoJournalTile = function() {
  let newTile = new ArcheoJournalTile();
  return newTile;
}

tileFactory.prototype.makeAdelusLetterTile = function() {
  let newTile = new AdelusLetterTile();
  return newTile;
}

tileFactory.prototype.makeSpireScrapTile = function() {
  let newTile = new SpireScrapTile();
  return newTile;
}

tileFactory.prototype.makeLanceRuneNotesTile = function() {
  let newTile = new LanceRuneNotesTile();
  return newTile;
}

tileFactory.prototype.makeXApprenticeJournalTile = function() {
  let newTile = new XApprenticeJournalTile();
  return newTile;
}

tileFactory.prototype.makeStoneOfCursesTile = function() {
  let newTile = new StoneOfCursesTile();
  return newTile;
}

tileFactory.prototype.makeTorchTile = function() {
  let newTile = new TorchTile();
  return newTile;
}

tileFactory.prototype.makeKyvekBoxTile = function() {
  let newTile = new KyvekBoxTile();
  return newTile;
}

tileFactory.prototype.makeInfiniteScrollTile = function() {
  let newTile = new InfiniteScrollTile();
  return newTile;
}

tileFactory.prototype.makeSupplyBoxTile = function() {
  let newTile = new SupplyBoxTile();
  return newTile;
}

tileFactory.prototype.makeBluePalmCrystalTile = function() {
  let newTile = new BluePalmCrystalTile();
  return newTile;
}

tileFactory.prototype.makeGreenPalmCrystalTile = function() {
  let newTile = new GreenPalmCrystalTile();
  return newTile;
}

tileFactory.prototype.makePurplePalmCrystalTile = function() {
  let newTile = new PurplePalmCrystalTile();
  return newTile;
}

tileFactory.prototype.makeGreenPotionTile = function() {
  let newTile = new GreenPotionTile();
  return newTile;
}

tileFactory.prototype.makeDarkGreenPotionTile = function() {
  let newTile = new DarkGreenPotionTile();
  return newTile;
}

tileFactory.prototype.makeSilverPotionTile = function() {
  let newTile = new SilverPotionTile();
  return newTile;
}

tileFactory.prototype.makePinkPotionTile = function() {
  let newTile = new PinkPotionTile();
  return newTile;
}

tileFactory.prototype.makeGreyPotionTile = function() {
  let newTile = new GreyPotionTile();
  return newTile;
}

tileFactory.prototype.makeBrownPotionTile = function() {
  let newTile = new BrownPotionTile();
  return newTile;
}

tileFactory.prototype.makeRedPotionTile = function() {
  let newTile = new RedPotionTile();
  return newTile;
}

tileFactory.prototype.makeWhitePotionTile = function() {
  let newTile = new WhitePotionTile();
  return newTile;
}

tileFactory.prototype.makeYellowPotionTile = function() {
  let newTile = new YellowPotionTile();
  return newTile;
}

tileFactory.prototype.makePurplePotionTile = function() {
  let newTile = new PurplePotionTile();
  return newTile;
}

tileFactory.prototype.makeBlackPotionTile = function() {
  let newTile = new BlackPotionTile();
  return newTile;
}

tileFactory.prototype.makeBluePotionTile = function() {
  let newTile = new BluePotionTile();
  return newTile;
}

tileFactory.prototype.makeDeepBluePotionTile = function() {
  let newTile = new DeepBluePotionTile();
  return newTile;
}

tileFactory.prototype.makeOrangePotionTile = function() {
  let newTile = new OrangePotionTile();
  return newTile;
}

tileFactory.prototype.makeTanPotionTile = function() {
  let newTile = new TanPotionTile();
  return newTile;
}

tileFactory.prototype.makeScrollWildcardTile = function() {
  let newTile = new ScrollWildcardTile();
  return newTile;
}

tileFactory.prototype.makeScrollAudachtaScribeTile = function() {
  let newTile = new ScrollAudachtaScribeTile();
  return newTile;
}

tileFactory.prototype.makeScrollCureTile = function() {
  let newTile = new ScrollCureTile();
  return newTile;
}

tileFactory.prototype.makeScrollDisarmTrapTile = function() {
  let newTile = new ScrollDisarmTrapTile();
  return newTile;
}

tileFactory.prototype.makeScrollDistractTile = function() {
  let newTile = new ScrollDistractTile();
  return newTile;
}

tileFactory.prototype.makeScrollFlameBladeTile = function() {
  let newTile = new ScrollFlameBladeTile();
  return newTile;
}

tileFactory.prototype.makeScrollLightTile = function() {
  let newTile = new ScrollLightTile();
  return newTile;
}

tileFactory.prototype.makeScrollVulnerabilityTile = function() {
  let newTile = new ScrollVulnerabilityTile();
  return newTile;
}

tileFactory.prototype.makeScrollIllusionTile = function() {
  let newTile = new ScrollIllusionTile();
  return newTile;
}

tileFactory.prototype.makeScrollIronFleshTile = function() {
  let newTile = new ScrollIronFleshTile();
  return newTile;
}

tileFactory.prototype.makeScrollLesserHealTile = function() {
  let newTile = new ScrollLesserHealTile();
  return newTile;
}

tileFactory.prototype.makeScrollMagicBoltTile = function() {
  let newTile = new ScrollMagicBoltTile();
  return newTile;
}

tileFactory.prototype.makeScrollPoisonCloudTile = function() {
  let newTile = new ScrollPoisonCloudTile();
  return newTile;
}

tileFactory.prototype.makeScrollProtectionTile = function() {
  let newTile = new ScrollProtectionTile();
  return newTile;
}

tileFactory.prototype.makeScrollUnlockTile = function() {
  let newTile = new ScrollUnlockTile();
  return newTile;
}

tileFactory.prototype.makeScrollDispelTile = function() {
  let newTile = new ScrollDispelTile();
  return newTile;
}

tileFactory.prototype.makeScrollDisruptUndeadTile = function() {
  let newTile = new ScrollDisruptUndeadTile();
  return newTile;
}

tileFactory.prototype.makeScrollFireArmorTile = function() {
  let newTile = new ScrollFireArmorTile();
  return newTile;
}

tileFactory.prototype.makeScrollFireballTile = function() {
  let newTile = new ScrollFireballTile();
  return newTile;
}

tileFactory.prototype.makeScrollReturnTile = function() {
  let newTile = new ScrollReturnTile();
  return newTile;
}

tileFactory.prototype.makeScrollIceballTile = function() {
  let newTile = new ScrollIceballTile();
  return newTile;
}

tileFactory.prototype.makeScrollTelekinesisTile = function() {
  let newTile = new ScrollTelekinesisTile();
  return newTile;
}

tileFactory.prototype.makeScrollTelepathyTile = function() {
  let newTile = new ScrollTelepathyTile();
  return newTile;
}

tileFactory.prototype.makeScrollWallOfFlameTile = function() {
  let newTile = new ScrollWallOfFlameTile();
  return newTile;
}

tileFactory.prototype.makeScrollBlessingTile = function() {
  let newTile = new ScrollBlessingTile();
  return newTile;
}

tileFactory.prototype.makeScrollBlinkTile = function() {
  let newTile = new ScrollBlinkTile();
  return newTile;
}

tileFactory.prototype.makeScrollEtherealVisionTile = function() {
  let newTile = new ScrollEtherealVisionTile();
  return newTile;
}

tileFactory.prototype.makeScrollHealTile = function() {
  let newTile = new ScrollHealTile();
  return newTile;
}

tileFactory.prototype.makeScrollLifeDrainTile = function() {
  let newTile = new ScrollLifeDrainTile();
  return newTile;
}

tileFactory.prototype.makeScrollSmiteTile = function() {
  let newTile = new ScrollSmiteTile();
  return newTile;
}

tileFactory.prototype.makeScrollCrystalTrapTile = function() {
  let newTile = new ScrollCrystalTrapTile();
  return newTile;
}

tileFactory.prototype.makeScrollMirrorWardTile = function() {
  let newTile = new ScrollMirrorWardTile();
  return newTile;
}

tileFactory.prototype.makeScrollParalyzeTile = function() {
  let newTile = new ScrollParalyzeTile();
  return newTile;
}

tileFactory.prototype.makeScrollPeerTile = function() {
  let newTile = new ScrollPeerTile();
  return newTile;
}

tileFactory.prototype.makeScrollShockwaveTile = function() {
  let newTile = new ScrollShockwaveTile();
  return newTile;
}

tileFactory.prototype.makeScrollSummonAllyTile = function() {
  let newTile = new ScrollSummonAllyTile();
  return newTile;
}

tileFactory.prototype.makeScrollSwordstrikeTile = function() {
  let newTile = new ScrollSwordstrikeTile();
  return newTile;
}

tileFactory.prototype.makeScrollExplosionTile = function() {
  let newTile = new ScrollExplosionTile();
  return newTile;
}

tileFactory.prototype.makeScrollStormTile = function() {
  let newTile = new ScrollStormTile();
  return newTile;
}

tileFactory.prototype.makeScrollTremorTile = function() {
  let newTile = new ScrollTremorTile();
  return newTile;
}

tileFactory.prototype.makeScrollFearTile = function() {
  let newTile = new ScrollFearTile();
  return newTile;
}

tileFactory.prototype.makeScrollFireAndIceTile = function() {
  let newTile = new ScrollFireAndIceTile();
  return newTile;
}

tileFactory.prototype.makeScrollMeteorSwarmTile = function() {
  let newTile = new ScrollMeteorSwarmTile();
  return newTile;
}

tileFactory.prototype.makeScrollMindBlastTile = function() {
  let newTile = new ScrollMindBlastTile();
  return newTile;
}

tileFactory.prototype.makeScrollConflagrationTile = function() {
  let newTile = new ScrollConflagrationTile();
  return newTile;
}

tileFactory.prototype.makeScrollConjureDaemonTile = function() {
  let newTile = new ScrollConjureDaemonTile();
  return newTile;
}

tileFactory.prototype.makeScrollTimeStopTile = function() {
  let newTile = new ScrollTimeStopTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosDisarmTrapTile = function() {
  let newTile = new AudachtaNemesosDisarmTrapTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosDistractTile = function() {
  let newTile = new AudachtaNemesosDistractTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosFlameBladeTile = function() {
  let newTile = new AudachtaNemesosFlameBladeTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosVulnerabilityTile = function() {
  let newTile = new AudachtaNemesosVulnerabilityTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosIronFleshTile = function() {
  let newTile = new AudachtaNemesosIronFleshTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosLesserHealTile = function() {
  let newTile = new AudachtaNemesosLesserHealTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosPoisonCloudTile = function() {
  let newTile = new AudachtaNemesosPoisonCloudTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosProtectionTile = function() {
  let newTile = new AudachtaNemesosProtectionTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosUnlockTile = function() {
  let newTile = new AudachtaNemesosUnlockTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosWindChangeTile = function() {
  let newTile = new AudachtaNemesosWindChangeTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosDisruptUndeadTile = function() {
  let newTile = new AudachtaNemesosDisruptUndeadTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosFireArmorTile = function() {
  let newTile = new AudachtaNemesosFireArmorTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosIceballTile = function() {
  let newTile = new AudachtaNemesosIceballTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosTelekinesisTile = function() {
  let newTile = new AudachtaNemesosTelekinesisTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosTelepathyTile = function() {
  let newTile = new AudachtaNemesosTelepathyTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosWallOfFlameTile = function() {
  let newTile = new AudachtaNemesosWallOfFlameTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosBlessingTile = function() {
  let newTile = new AudachtaNemesosBlessingTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosHealTile = function() {
  let newTile = new AudachtaNemesosHealTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosLifeDrainTile = function() {
  let newTile = new AudachtaNemesosLifeDrainTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosSmiteTile = function() {
  let newTile = new AudachtaNemesosSmiteTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosOpenGateTile = function() {
  let newTile = new AudachtaNemesosOpenGateTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosCrystalTrapTile = function() {
  let newTile = new AudachtaNemesosCrystalTrapTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosMirrorWardTile = function() {
  let newTile = new AudachtaNemesosMirrorWardTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosParalyzeTile = function() {
  let newTile = new AudachtaNemesosParalyzeTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosReturnTile = function() {
  let newTile = new AudachtaNemesosReturnTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosShockwaveTile = function() {
  let newTile = new AudachtaNemesosShockwaveTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosSummonAllyTile = function() {
  let newTile = new AudachtaNemesosSummonAllyTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosSwordstrikeTile = function() {
  let newTile = new AudachtaNemesosSwordstrikeTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosEmpowerTile = function() {
  let newTile = new AudachtaNemesosEmpowerTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosExplosionTile = function() {
  let newTile = new AudachtaNemesosExplosionTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosJinxTile = function() {
  let newTile = new AudachtaNemesosJinxTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosNegateMagicTile = function() {
  let newTile = new AudachtaNemesosNegateMagicTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosTremorTile = function() {
  let newTile = new AudachtaNemesosTremorTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosWeatherControlTile = function() {
  let newTile = new AudachtaNemesosWeatherControlTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosCharmTile = function() {
  let newTile = new AudachtaNemesosCharmTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosFearTile = function() {
  let newTile = new AudachtaNemesosFearTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosFireAndIceTile = function() {
  let newTile = new AudachtaNemesosFireAndIceTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosInvulnerabilityTile = function() {
  let newTile = new AudachtaNemesosInvulnerabilityTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosMeteorSwarmTile = function() {
  let newTile = new AudachtaNemesosMeteorSwarmTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosMindBlastTile = function() {
  let newTile = new AudachtaNemesosMindBlastTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosArrowOfGlassTile = function() {
  let newTile = new AudachtaNemesosArrowOfGlassTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosBuildGateTile = function() {
  let newTile = new AudachtaNemesosBuildGateTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosConflagrationTile = function() {
  let newTile = new AudachtaNemesosConflagrationTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosConjureDaemonTile = function() {
  let newTile = new AudachtaNemesosConjureDaemonTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosQuicknessTile = function() {
  let newTile = new AudachtaNemesosQuicknessTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosReincarnateTile = function() {
  let newTile = new AudachtaNemesosReincarnateTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosTimeStopTile = function() {
  let newTile = new AudachtaNemesosTimeStopTile();
  return newTile;
}

tileFactory.prototype.makeRingOfFireResistTile = function() {
  let newTile = new RingOfFireResistTile();
  return newTile;
}

tileFactory.prototype.makeRingOfEtherealFocusTile = function() {
  let newTile = new RingOfEtherealFocusTile();
  return newTile;
}

tileFactory.prototype.makeAmuletOfReflectionsTile = function() {
  let newTile = new AmuletOfReflectionsTile();
  return newTile;
}

tileFactory.prototype.makeNaturalArmorTile = function() {
  let newTile = new NaturalArmorTile();
  return newTile;
}

tileFactory.prototype.makeClothArmorTile = function() {
  let newTile = new ClothArmorTile();
  return newTile;
}

tileFactory.prototype.makeLeatherArmorTile = function() {
  let newTile = new LeatherArmorTile();
  return newTile;
}

tileFactory.prototype.makeChainArmorTile = function() {
  let newTile = new ChainArmorTile();
  return newTile;
}

tileFactory.prototype.makePlateArmorTile = function() {
  let newTile = new PlateArmorTile();
  return newTile;
}

tileFactory.prototype.makeExoticArmorTile = function() {
  let newTile = new ExoticArmorTile();
  return newTile;
}

tileFactory.prototype.makeFistsTile = function() {
  let newTile = new FistsTile();
  return newTile;
}

tileFactory.prototype.makeDaggerTile = function() {
  let newTile = new DaggerTile();
  return newTile;
}

tileFactory.prototype.makeShortswordTile = function() {
  let newTile = new ShortswordTile();
  return newTile;
}

tileFactory.prototype.makeMaceTile = function() {
  let newTile = new MaceTile();
  return newTile;
}

tileFactory.prototype.makeAxeTile = function() {
  let newTile = new AxeTile();
  return newTile;
}

tileFactory.prototype.makeLongswordTile = function() {
  let newTile = new LongswordTile();
  return newTile;
}

tileFactory.prototype.makeHalberdTile = function() {
  let newTile = new HalberdTile();
  return newTile;
}

tileFactory.prototype.makeMagicSwordTile = function() {
  let newTile = new MagicSwordTile();
  return newTile;
}

tileFactory.prototype.makeUnenchantedSwordTile = function() {
  let newTile = new UnenchantedSwordTile();
  return newTile;
}

tileFactory.prototype.makeNaturalWeaponTile = function() {
  let newTile = new NaturalWeaponTile();
  return newTile;
}

tileFactory.prototype.makeSlingTile = function() {
  let newTile = new SlingTile();
  return newTile;
}

tileFactory.prototype.makeBowTile = function() {
  let newTile = new BowTile();
  return newTile;
}

tileFactory.prototype.makeCrossbowTile = function() {
  let newTile = new CrossbowTile();
  return newTile;
}

tileFactory.prototype.makeWandTile = function() {
  let newTile = new WandTile();
  return newTile;
}

tileFactory.prototype.makeMagicAxeTile = function() {
  let newTile = new MagicAxeTile();
  return newTile;
}

tileFactory.prototype.makeNaturalMissileWeaponTile = function() {
  let newTile = new NaturalMissileWeaponTile();
  return newTile;
}

tileFactory.prototype.makeBoulderWeaponTile = function() {
  let newTile = new BoulderWeaponTile();
  return newTile;
}

tileFactory.prototype.makeDruidVillagerNPCTile = function() {
  let newTile = new DruidVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeShepherdVillagerNPCTile = function() {
  let newTile = new ShepherdVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeMageVillagerNPCTile = function() {
  let newTile = new MageVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeTinkerVillagerNPCTile = function() {
  let newTile = new TinkerVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeRangerVillagerNPCTile = function() {
  let newTile = new RangerVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeAdventurerVillagerNPCTile = function() {
  let newTile = new AdventurerVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makePaladinVillagerNPCTile = function() {
  let newTile = new PaladinVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeFighterVillagerNPCTile = function() {
  let newTile = new FighterVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeTownsfolkVillagerNPCTile = function() {
  let newTile = new TownsfolkVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeBardVillagerNPCTile = function() {
  let newTile = new BardVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeChildVillagerNPCTile = function() {
  let newTile = new ChildVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeBeggarVillagerNPCTile = function() {
  let newTile = new BeggarVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeJesterNPCTile = function() {
  let newTile = new JesterNPCTile();
  return newTile;
}

tileFactory.prototype.makeTownGuardNPCTile = function() {
  let newTile = new TownGuardNPCTile();
  return newTile;
}

tileFactory.prototype.makeKingNPCTile = function() {
  let newTile = new KingNPCTile();
  return newTile;
}

tileFactory.prototype.makeQueenNPCTile = function() {
  let newTile = new QueenNPCTile();
  return newTile;
}

tileFactory.prototype.makePrinceNPCTile = function() {
  let newTile = new PrinceNPCTile();
  return newTile;
}

tileFactory.prototype.makeGhostVillagerNPCTile = function() {
  let newTile = new GhostVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeChickenNPCTile = function() {
  let newTile = new ChickenNPCTile();
  return newTile;
}

tileFactory.prototype.makeHorseNPCTile = function() {
  let newTile = new HorseNPCTile();
  return newTile;
}

tileFactory.prototype.makeBullNPCTile = function() {
  let newTile = new BullNPCTile();
  return newTile;
}

tileFactory.prototype.makeCorruptPrinceNPCTile = function() {
  let newTile = new CorruptPrinceNPCTile();
  return newTile;
}

tileFactory.prototype.makeCorruptGuardsNPCTile = function() {
  let newTile = new CorruptGuardsNPCTile();
  return newTile;
}

tileFactory.prototype.makeCourierNPCTile = function() {
  let newTile = new CourierNPCTile();
  return newTile;
}

tileFactory.prototype.makeCourierGuardNPCTile = function() {
  let newTile = new CourierGuardNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantBatNPCTile = function() {
  let newTile = new GiantBatNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantInsectsNPCTile = function() {
  let newTile = new GiantInsectsNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantRatNPCTile = function() {
  let newTile = new GiantRatNPCTile();
  return newTile;
}

tileFactory.prototype.makeHeadlessNPCTile = function() {
  let newTile = new HeadlessNPCTile();
  return newTile;
}

tileFactory.prototype.makeHoodNPCTile = function() {
  let newTile = new HoodNPCTile();
  return newTile;
}

tileFactory.prototype.makeMinstrelNPCTile = function() {
  let newTile = new MinstrelNPCTile();
  return newTile;
}

tileFactory.prototype.makeSlimeNPCTile = function() {
  let newTile = new SlimeNPCTile();
  return newTile;
}

tileFactory.prototype.makeApprenticeNPCTile = function() {
  let newTile = new ApprenticeNPCTile();
  return newTile;
}

tileFactory.prototype.makeFighterNPCTile = function() {
  let newTile = new FighterNPCTile();
  return newTile;
}

tileFactory.prototype.makeImpNPCTile = function() {
  let newTile = new ImpNPCTile();
  return newTile;
}

tileFactory.prototype.makePythonNPCTile = function() {
  let newTile = new PythonNPCTile();
  return newTile;
}

tileFactory.prototype.makeNixieNPCTile = function() {
  let newTile = new NixieNPCTile();
  return newTile;
}

tileFactory.prototype.makeOrcNPCTile = function() {
  let newTile = new OrcNPCTile();
  return newTile;
}

tileFactory.prototype.makeRogueNPCTile = function() {
  let newTile = new RogueNPCTile();
  return newTile;
}

tileFactory.prototype.makePitRogueNPCTile = function() {
  let newTile = new PitRogueNPCTile();
  return newTile;
}

tileFactory.prototype.makeSkeletonNPCTile = function() {
  let newTile = new SkeletonNPCTile();
  return newTile;
}

tileFactory.prototype.makeAnimatedArmorNPCTile = function() {
  let newTile = new AnimatedArmorNPCTile();
  return newTile;
}

tileFactory.prototype.makeArcherNPCTile = function() {
  let newTile = new ArcherNPCTile();
  return newTile;
}

tileFactory.prototype.makeBardNPCTile = function() {
  let newTile = new BardNPCTile();
  return newTile;
}

tileFactory.prototype.makeDruidNPCTile = function() {
  let newTile = new DruidNPCTile();
  return newTile;
}

tileFactory.prototype.makeFireLizardNPCTile = function() {
  let newTile = new FireLizardNPCTile();
  return newTile;
}

tileFactory.prototype.makeFlukeNPCTile = function() {
  let newTile = new FlukeNPCTile();
  return newTile;
}

tileFactory.prototype.makeGhostNPCTile = function() {
  let newTile = new GhostNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantSpiderNPCTile = function() {
  let newTile = new GiantSpiderNPCTile();
  return newTile;
}

tileFactory.prototype.makeGremlinNPCTile = function() {
  let newTile = new GremlinNPCTile();
  return newTile;
}

tileFactory.prototype.makeHandlerNPCTile = function() {
  let newTile = new HandlerNPCTile();
  return newTile;
}

tileFactory.prototype.makeMimicNPCTile = function() {
  let newTile = new MimicNPCTile();
  return newTile;
}

tileFactory.prototype.makeOrcShamanNPCTile = function() {
  let newTile = new OrcShamanNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantSnakeNPCTile = function() {
  let newTile = new GiantSnakeNPCTile();
  return newTile;
}

tileFactory.prototype.makeSeahorseNPCTile = function() {
  let newTile = new SeahorseNPCTile();
  return newTile;
}

tileFactory.prototype.makeThiefNPCTile = function() {
  let newTile = new ThiefNPCTile();
  return newTile;
}

tileFactory.prototype.makeTrollNPCTile = function() {
  let newTile = new TrollNPCTile();
  return newTile;
}

tileFactory.prototype.makeTwisterNPCTile = function() {
  let newTile = new TwisterNPCTile();
  return newTile;
}

tileFactory.prototype.makeAirElementalNPCTile = function() {
  let newTile = new AirElementalNPCTile();
  return newTile;
}

tileFactory.prototype.makeCyclopsNPCTile = function() {
  let newTile = new CyclopsNPCTile();
  return newTile;
}

tileFactory.prototype.makeDeepNixieNPCTile = function() {
  let newTile = new DeepNixieNPCTile();
  return newTile;
}

tileFactory.prototype.makeDrakeNPCTile = function() {
  let newTile = new DrakeNPCTile();
  return newTile;
}

tileFactory.prototype.makeEarthElementalNPCTile = function() {
  let newTile = new EarthElementalNPCTile();
  return newTile;
}

tileFactory.prototype.makeFireElementalNPCTile = function() {
  let newTile = new FireElementalNPCTile();
  return newTile;
}

tileFactory.prototype.makeFireSnakeNPCTile = function() {
  let newTile = new FireSnakeNPCTile();
  return newTile;
}

tileFactory.prototype.makeLurkerNPCTile = function() {
  let newTile = new LurkerNPCTile();
  return newTile;
}

tileFactory.prototype.makeOrcCaptainNPCTile = function() {
  let newTile = new OrcCaptainNPCTile();
  return newTile;
}

tileFactory.prototype.makePaladinNPCTile = function() {
  let newTile = new PaladinNPCTile();
  return newTile;
}

tileFactory.prototype.makeSeaSerpentNPCTile = function() {
  let newTile = new SeaSerpentNPCTile();
  return newTile;
}

tileFactory.prototype.makeTremendousSpiderNPCTile = function() {
  let newTile = new TremendousSpiderNPCTile();
  return newTile;
}

tileFactory.prototype.makeWaterElementalNPCTile = function() {
  let newTile = new WaterElementalNPCTile();
  return newTile;
}

tileFactory.prototype.makeWizardNPCTile = function() {
  let newTile = new WizardNPCTile();
  return newTile;
}

tileFactory.prototype.makeCorpserNPCTile = function() {
  let newTile = new CorpserNPCTile();
  return newTile;
}

tileFactory.prototype.makeEttinNPCTile = function() {
  let newTile = new EttinNPCTile();
  return newTile;
}

tileFactory.prototype.makeFloorNPCTile = function() {
  let newTile = new FloorNPCTile();
  return newTile;
}

tileFactory.prototype.makeGazerNPCTile = function() {
  let newTile = new GazerNPCTile();
  return newTile;
}

tileFactory.prototype.makeHydraNPCTile = function() {
  let newTile = new HydraNPCTile();
  return newTile;
}

tileFactory.prototype.makeMagmaSpawnNPCTile = function() {
  let newTile = new MagmaSpawnNPCTile();
  return newTile;
}

tileFactory.prototype.makePhantomNPCTile = function() {
  let newTile = new PhantomNPCTile();
  return newTile;
}

tileFactory.prototype.makeRangerNPCTile = function() {
  let newTile = new RangerNPCTile();
  return newTile;
}

tileFactory.prototype.makeWillotheWispNPCTile = function() {
  let newTile = new WillotheWispNPCTile();
  return newTile;
}

tileFactory.prototype.makeDelverNPCTile = function() {
  let newTile = new DelverNPCTile();
  return newTile;
}

tileFactory.prototype.makeArchmageNPCTile = function() {
  let newTile = new ArchmageNPCTile();
  return newTile;
}

tileFactory.prototype.makeBlackDragonNPCTile = function() {
  let newTile = new BlackDragonNPCTile();
  return newTile;
}

tileFactory.prototype.makeDevourerNPCTile = function() {
  let newTile = new DevourerNPCTile();
  return newTile;
}

tileFactory.prototype.makeDragonNPCTile = function() {
  let newTile = new DragonNPCTile();
  return newTile;
}

tileFactory.prototype.makeEttinSorcererNPCTile = function() {
  let newTile = new EttinSorcererNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantNPCTile = function() {
  let newTile = new GiantNPCTile();
  return newTile;
}

tileFactory.prototype.makeKrakenNPCTile = function() {
  let newTile = new KrakenNPCTile();
  return newTile;
}

tileFactory.prototype.makeReaperNPCTile = function() {
  let newTile = new ReaperNPCTile();
  return newTile;
}

tileFactory.prototype.makeSpecterNPCTile = function() {
  let newTile = new SpecterNPCTile();
  return newTile;
}

tileFactory.prototype.makeDaemonNPCTile = function() {
  let newTile = new DaemonNPCTile();
  return newTile;
}

tileFactory.prototype.makeEarthenTyrantNPCTile = function() {
  let newTile = new EarthenTyrantNPCTile();
  return newTile;
}

tileFactory.prototype.makeLicheNPCTile = function() {
  let newTile = new LicheNPCTile();
  return newTile;
}

tileFactory.prototype.makeEyesofSpiteNPCTile = function() {
  let newTile = new EyesofSpiteNPCTile();
  return newTile;
}

tileFactory.prototype.makeReaperLordNPCTile = function() {
  let newTile = new ReaperLordNPCTile();
  return newTile;
}

tileFactory.prototype.makeElderDragonNPCTile = function() {
  let newTile = new ElderDragonNPCTile();
  return newTile;
}

tileFactory.prototype.makeBalronNPCTile = function() {
  let newTile = new BalronNPCTile();
  return newTile;
}

tileFactory.prototype.makeTitanNPCTile = function() {
  let newTile = new TitanNPCTile();
  return newTile;
}

tileFactory.prototype.makeAbyssalKrakenNPCTile = function() {
  let newTile = new AbyssalKrakenNPCTile();
  return newTile;
}

tileFactory.prototype.makeIllusionNPCTile = function() {
  let newTile = new IllusionNPCTile();
  return newTile;
}

tileFactory.prototype.makeInfusedIllusionNPCTile = function() {
  let newTile = new InfusedIllusionNPCTile();
  return newTile;
}

tileFactory.prototype.makeToshinSentinelNPCTile = function() {
  let newTile = new ToshinSentinelNPCTile();
  return newTile;
}

tileFactory.prototype.makeAbyssYouNPCTile = function() {
  let newTile = new AbyssYouNPCTile();
  return newTile;
}

tileFactory.prototype.makeNegatorGnomeNPCTile = function() {
  let newTile = new NegatorGnomeNPCTile();
  return newTile;
}

tileFactory.prototype.makeCrystalBarrierNPCTile = function() {
  let newTile = new CrystalBarrierNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantRatGroupTinyTile = function() {
  let newTile = new GiantRatGroupTinyTile();
  return newTile;
}

tileFactory.prototype.makeGiantRatGroupSmallTile = function() {
  let newTile = new GiantRatGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeGiantRatGroupLargeTile = function() {
  let newTile = new GiantRatGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeOrcGroupTinyTile = function() {
  let newTile = new OrcGroupTinyTile();
  return newTile;
}

tileFactory.prototype.makeOrcGroupSmallTile = function() {
  let newTile = new OrcGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeOrcGroupLargeTile = function() {
  let newTile = new OrcGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeHoodGroupTinyTile = function() {
  let newTile = new HoodGroupTinyTile();
  return newTile;
}

tileFactory.prototype.makeHoodGroupSmallTile = function() {
  let newTile = new HoodGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeHoodGroupLargeTile = function() {
  let newTile = new HoodGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeRogueGroupSmallTile = function() {
  let newTile = new RogueGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makePitRogueGroupSmallTile = function() {
  let newTile = new PitRogueGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeRogueGroupLargeTile = function() {
  let newTile = new RogueGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeThiefGroupSmallTile = function() {
  let newTile = new ThiefGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeThiefGroupLargeTile = function() {
  let newTile = new ThiefGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeLowbiePartyGroupTile = function() {
  let newTile = new LowbiePartyGroupTile();
  return newTile;
}

tileFactory.prototype.makeHeadlessGroupTinyTile = function() {
  let newTile = new HeadlessGroupTinyTile();
  return newTile;
}

tileFactory.prototype.makeHeadlessGroupSmallTile = function() {
  let newTile = new HeadlessGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeHeadlessGroupLargeTile = function() {
  let newTile = new HeadlessGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeSnakesGroupSmallTile = function() {
  let newTile = new SnakesGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeSnakesGroupTile = function() {
  let newTile = new SnakesGroupTile();
  return newTile;
}

tileFactory.prototype.makeMidSnakesGroupTile = function() {
  let newTile = new MidSnakesGroupTile();
  return newTile;
}

tileFactory.prototype.makeDrakesSmallGroupTile = function() {
  let newTile = new DrakesSmallGroupTile();
  return newTile;
}

tileFactory.prototype.makeDrakesLargeGroupTile = function() {
  let newTile = new DrakesLargeGroupTile();
  return newTile;
}

tileFactory.prototype.makeDragonsGroupTile = function() {
  let newTile = new DragonsGroupTile();
  return newTile;
}

tileFactory.prototype.makeMidPartyGroupTile = function() {
  let newTile = new MidPartyGroupTile();
  return newTile;
}

tileFactory.prototype.makeMidHighPartyGroupTile = function() {
  let newTile = new MidHighPartyGroupTile();
  return newTile;
}

tileFactory.prototype.makeHighPartyGroupTile = function() {
  let newTile = new HighPartyGroupTile();
  return newTile;
}

tileFactory.prototype.makeMidHeadlessGroupTile = function() {
  let newTile = new MidHeadlessGroupTile();
  return newTile;
}

tileFactory.prototype.makeHighHeadlessGroupTile = function() {
  let newTile = new HighHeadlessGroupTile();
  return newTile;
}

tileFactory.prototype.makeGiantsGroupTile = function() {
  let newTile = new GiantsGroupTile();
  return newTile;
}

tileFactory.prototype.makeOrcPartyLowGroupTile = function() {
  let newTile = new OrcPartyLowGroupTile();
  return newTile;
}

tileFactory.prototype.makeOrcPartyHighGroupTile = function() {
  let newTile = new OrcPartyHighGroupTile();
  return newTile;
}

tileFactory.prototype.makeNecromancerGroupTile = function() {
  let newTile = new NecromancerGroupTile();
  return newTile;
}

tileFactory.prototype.makeElementalistGroupTile = function() {
  let newTile = new ElementalistGroupTile();
  return newTile;
}

tileFactory.prototype.makeGazersGroupTile = function() {
  let newTile = new GazersGroupTile();
  return newTile;
}

tileFactory.prototype.makeTrollGroupTile = function() {
  let newTile = new TrollGroupTile();
  return newTile;
}

tileFactory.prototype.makeDaemonGroupTile = function() {
  let newTile = new DaemonGroupTile();
  return newTile;
}

tileFactory.prototype.makeSkeletonGroupTile = function() {
  let newTile = new SkeletonGroupTile();
  return newTile;
}

tileFactory.prototype.makeUndeadGroupTile = function() {
  let newTile = new UndeadGroupTile();
  return newTile;
}

tileFactory.prototype.makeFireLizardGroupTile = function() {
  let newTile = new FireLizardGroupTile();
  return newTile;
}

tileFactory.prototype.makeMagmaLizardGroupTile = function() {
  let newTile = new MagmaLizardGroupTile();
  return newTile;
}

tileFactory.prototype.makeInsectsGroupSmallTile = function() {
  let newTile = new InsectsGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeInsectsGroupLargeTile = function() {
  let newTile = new InsectsGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeCourierGroupTile = function() {
  let newTile = new CourierGroupTile();
  return newTile;
}

tileFactory.prototype.makeHorseAndCartNPCTile = function() {
  let newTile = new HorseAndCartNPCTile();
  return newTile;
}

tileFactory.prototype.makeCartSegmentTile = function() {
  let newTile = new CartSegmentTile();
  return newTile;
}

tileFactory.prototype.makeBlessingTile = function() {
  let newTile = new BlessingTile();
  return newTile;
}

tileFactory.prototype.makeBlessingStrTile = function() {
  let newTile = new BlessingStrTile();
  return newTile;
}

tileFactory.prototype.makeBlessingDexTile = function() {
  let newTile = new BlessingDexTile();
  return newTile;
}

tileFactory.prototype.makeBlessingIntTile = function() {
  let newTile = new BlessingIntTile();
  return newTile;
}

tileFactory.prototype.makeCharmTile = function() {
  let newTile = new CharmTile();
  return newTile;
}

tileFactory.prototype.makeConfusedTile = function() {
  let newTile = new ConfusedTile();
  return newTile;
}

tileFactory.prototype.makeCrystalTrapTile = function() {
  let newTile = new CrystalTrapTile();
  return newTile;
}

tileFactory.prototype.makeCurseTile = function() {
  let newTile = new CurseTile();
  return newTile;
}

tileFactory.prototype.makeDiseaseTile = function() {
  let newTile = new DiseaseTile();
  return newTile;
}

tileFactory.prototype.makeDisorientedTile = function() {
  let newTile = new DisorientedTile();
  return newTile;
}

tileFactory.prototype.makeDistractTile = function() {
  let newTile = new DistractTile();
  return newTile;
}

tileFactory.prototype.makeDizzyTile = function() {
  let newTile = new DizzyTile();
  return newTile;
}

tileFactory.prototype.makeDrunkTile = function() {
  let newTile = new DrunkTile();
  return newTile;
}

tileFactory.prototype.makeEntangleTile = function() {
  let newTile = new EntangleTile();
  return newTile;
}

tileFactory.prototype.makeEtherealVisionTile = function() {
  let newTile = new EtherealVisionTile();
  return newTile;
}

tileFactory.prototype.makeFearTile = function() {
  let newTile = new FearTile();
  return newTile;
}

tileFactory.prototype.makeFireArmorTile = function() {
  let newTile = new FireArmorTile();
  return newTile;
}

tileFactory.prototype.makeFlameBladeTile = function() {
  let newTile = new FlameBladeTile();
  return newTile;
}

tileFactory.prototype.makeFrozenTile = function() {
  let newTile = new FrozenTile();
  return newTile;
}

tileFactory.prototype.makeInvulnerableTile = function() {
  let newTile = new InvulnerableTile();
  return newTile;
}

tileFactory.prototype.makeIronFleshTile = function() {
  let newTile = new IronFleshTile();
  return newTile;
}

tileFactory.prototype.makeLevitateTile = function() {
  let newTile = new LevitateTile();
  return newTile;
}

tileFactory.prototype.makeLightTile = function() {
  let newTile = new LightTile();
  return newTile;
}

tileFactory.prototype.makeMirrorWardTile = function() {
  let newTile = new MirrorWardTile();
  return newTile;
}

tileFactory.prototype.makeNegateMagicTile = function() {
  let newTile = new NegateMagicTile();
  return newTile;
}

tileFactory.prototype.makeParalyzeTile = function() {
  let newTile = new ParalyzeTile();
  return newTile;
}

tileFactory.prototype.makePhasedTile = function() {
  let newTile = new PhasedTile();
  return newTile;
}

tileFactory.prototype.makePoisonTile = function() {
  let newTile = new PoisonTile();
  return newTile;
}

tileFactory.prototype.makeProtectionTile = function() {
  let newTile = new ProtectionTile();
  return newTile;
}

tileFactory.prototype.makeQuicknessTile = function() {
  let newTile = new QuicknessTile();
  return newTile;
}

tileFactory.prototype.makeSleepTile = function() {
  let newTile = new SleepTile();
  return newTile;
}

tileFactory.prototype.makeSlowTile = function() {
  let newTile = new SlowTile();
  return newTile;
}

tileFactory.prototype.makeStormTile = function() {
  let newTile = new StormTile();
  return newTile;
}

tileFactory.prototype.makeStunnedTile = function() {
  let newTile = new StunnedTile();
  return newTile;
}

tileFactory.prototype.makeTelepathyTile = function() {
  let newTile = new TelepathyTile();
  return newTile;
}

tileFactory.prototype.makeTimeStopTile = function() {
  let newTile = new TimeStopTile();
  return newTile;
}

tileFactory.prototype.makeTorchLightTile = function() {
  let newTile = new TorchLightTile();
  return newTile;
}

tileFactory.prototype.makeUnconsciousEndActTile = function() {
  let newTile = new UnconsciousEndActTile();
  return newTile;
}

tileFactory.prototype.makeVulnerabilityTile = function() {
  let newTile = new VulnerabilityTile();
  return newTile;
}

tileFactory.prototype.makeCourierFleeTile = function() {
  let newTile = new CourierFleeTile();
  return newTile;
}

tileFactory.prototype.makeCourierSurrenderTile = function() {
  let newTile = new CourierSurrenderTile();
  return newTile;
}

tileFactory.prototype.makeEraserTile = function() {
  let newTile = new BlankBlackTile();
  newTile.name = 'Eraser';
  newTile.type = 'feature';
  return newTile;
}

tileFactory.prototype.makeLockedDoorWindowTile = function() {
  let newTile = this.createTile('DoorWindow');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makeMagicLockedDoorWindowTile = function() {
  let newTile = this.createTile('DoorWindow');
  newTile.lockMe(2);    // Magic Lock
  return newTile;
}

tileFactory.prototype.makeLockedDoorTile = function() {
  let newTile = this.createTile('Door');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makeMagicLockedDoorTile = function() {
  let newTile = this.createTile('Door');
  newTile.lockMe(2);    // Magic Lock
  return newTile;
}

tileFactory.prototype.makeLockedStonePortcullisTile = function() {
  let newTile = this.createTile('StonePortcullis');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makeLockedWallPortcullisTile = function() {
  let newTile = this.createTile('WallPortcullis');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makeLockedGreyWallPortcullisTile = function() {
  let newTile = this.createTile('GreyWallPortcullis');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makeRuinsWallDoor1LockedTile = function() {
 let newTile = this.createTile('RuinsWallDoor1');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow1LockedTile = function() {
 let newTile = this.createTile('RuinsWallDoorWindow1');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow1LitLockedTile = function() {
 let newTile = this.createTile('RuinsWallDoorWindow1Lit');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeRuinsWallDoor1MagicLockedTile = function() {
 let newTile = this.createTile('RuinsWallDoor1');
  newTile.lockMe(2);
 return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow1MagicLockedTile = function() {
 let newTile = this.createTile('RuinsWallDoorWindow1');
  newTile.lockMe(2);
 return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow1LitMagicLockedTile = function() {
 let newTile = this.createTile('RuinsWallDoorWindow1Lit');
  newTile.lockMe(2);
 return newTile;
}

tileFactory.prototype.makeRuinsWallDoor2LockedTile = function() {
 let newTile = this.createTile('RuinsWallDoor2');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow2LockedTile = function() {
 let newTile = this.createTile('RuinsWallDoorWindow2');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow2LitLockedTile = function() {
 let newTile = this.createTile('RuinsWallDoorWindow2Lit');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeRuinsWallDoor2MagicLockedTile = function() {
 let newTile = this.createTile('RuinsWallDoor2');
  newTile.lockMe(2);
 return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow2MagicLockedTile = function() {
 let newTile = this.createTile('RuinsWallDoorWindow2');
  newTile.lockMe(2);
 return newTile;
}

tileFactory.prototype.makeRuinsWallDoorWindow2LitMagicLockedTile = function() {
 let newTile = this.createTile('RuinsWallDoorWindow2Lit');
  newTile.lockMe(2);
 return newTile;
}

tileFactory.prototype.makeWallDoor1LockedTile = function() {
 let newTile = this.createTile('WallDoor1');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeWallDoorWindow1LockedTile = function() {
 let newTile = this.createTile('WallDoorWindow1');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeWallDoorWindow1LitLockedTile = function() {
 let newTile = this.createTile('WallDoorWindow1Lit');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeGreyDoor1LockedTile = function() {
 let newTile = this.createTile('GreyDoor1');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeGreyDoorWindow1LockedTile = function() {
 let newTile = this.createTile('GreyDoorWindow1');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeGreyDoorWindow1LitLockedTile = function() {
 let newTile = this.createTile('GreyDoorWindow1Lit');
  newTile.lockMe(1);
 return newTile;
}

tileFactory.prototype.makeLockedGreyDoorWindowTile = function() {
  let newTile = this.createTile('GreyDoorWindow');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makeMagicLockedGreyDoorWindowTile = function() {
  let newTile = this.createTile('GreyDoorWindow');
  newTile.lockMe(2);    // Magic Lock
  return newTile;
}

tileFactory.prototype.makeLockedGreyDoorTile = function() {
  let newTile = this.createTile('GreyDoor');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makeMagicLockedGreyDoorTile = function() {
  let newTile = this.createTile('GreyDoor');
  newTile.lockMe(2);    // Magic Lock
  return newTile;
}

tileFactory.prototype.makeLockedGreyDoorWindowLitTile = function() {
  let newTile = this.createTile('GreyDoorWindowLit');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makeMagicLockedGreyDoorWindowLitTile = function() {
  let newTile = this.createTile('GreyDoorWindowLit');
  newTile.lockMe(2);    // Magic Lock
  return newTile;
}

tileFactory.prototype.makePCTile = function() {
  let newTile = new PCObject();
  return newTile;
}


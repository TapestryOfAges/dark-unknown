"use strict";

function tileFactory() {

}

// terrain factories:
tileFactory.prototype.createTile = function(tileName) {


  var thingy = "make"+tileName+"Tile";
  if (this[thingy] && (typeof this[thingy] == "function")) {
    var newthing = this[thingy]();
    newthing.assignSerial();
    return newthing;
  } else {
    alert(tileName + " is not a thing.");
  }
}

tileFactory.prototype.makeBlankWhiteTile = function() {
  var newTile = new BlankWhiteTile();
  return newTile;
}

tileFactory.prototype.makeOceanTile = function() {
  var newTile = new OceanTile();
  return newTile;
}

tileFactory.prototype.makeWaterTile = function() {
  var newTile = new WaterTile();
  return newTile;
}

tileFactory.prototype.makeShallowsTile = function() {
  var newTile = new ShallowsTile();
  return newTile;
}

tileFactory.prototype.makeShadowOceanTile = function() {
  var newTile = new ShadowOceanTile();
  return newTile;
}

tileFactory.prototype.makeShadowWaterTile = function() {
  var newTile = new ShadowWaterTile();
  return newTile;
}

tileFactory.prototype.makeShadowShallowsTile = function() {
  var newTile = new ShadowShallowsTile();
  return newTile;
}

tileFactory.prototype.makeNoBlockMountainTile = function() {
  var newTile = new NoBlockMountainTile();
  return newTile;
}

tileFactory.prototype.makeMountainTile = function() {
  var newTile = new MountainTile();
  return newTile;
}

tileFactory.prototype.makeMountainPassTile = function() {
  var newTile = new MountainPassTile();
  return newTile;
}

tileFactory.prototype.makeFlameMountainTile = function() {
  var newTile = new FlameMountainTile();
  return newTile;
}

tileFactory.prototype.makeStoneWallTile = function() {
  var newTile = new StoneWallTile();
  return newTile;
}

tileFactory.prototype.makeStoneTile = function() {
  var newTile = new StoneTile();
  return newTile;
}

tileFactory.prototype.makeDirtStoneTile = function() {
  var newTile = new DirtStoneTile();
  return newTile;
}

tileFactory.prototype.makeMastTile = function() {
  var newTile = new MastTile();
  return newTile;
}

tileFactory.prototype.makeRiggingTile = function() {
  var newTile = new RiggingTile();
  return newTile;
}

tileFactory.prototype.makePillarTile = function() {
  var newTile = new PillarTile();
  return newTile;
}

tileFactory.prototype.makePurplePillarTile = function() {
  var newTile = new PurplePillarTile();
  return newTile;
}

tileFactory.prototype.makeFancyFloorTile = function() {
  var newTile = new FancyFloorTile();
  return newTile;
}

tileFactory.prototype.makeHorizontalCounterTile = function() {
  var newTile = new HorizontalCounterTile();
  return newTile;
}

tileFactory.prototype.makeRightCounterTile = function() {
  var newTile = new RightCounterTile();
  return newTile;
}

tileFactory.prototype.makeLeftCounterTile = function() {
  var newTile = new LeftCounterTile();
  return newTile;
}

tileFactory.prototype.makeCounterBoxTile = function() {
  var newTile = new CounterBoxTile();
  return newTile;
}

tileFactory.prototype.makeBlankBlackTile = function() {
  var newTile = new BlankBlackTile();
  return newTile;
}

tileFactory.prototype.makeDarknessTile = function() {
  var newTile = new DarknessTile();
  return newTile;
}

tileFactory.prototype.makeWallTile = function() {
  var newTile = new WallTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallTallLeftMidRightTile = function() {
  var newTile = new RuinsWallTallLeftMidRightTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallMidLeftMidRightTile = function() {
  var newTile = new RuinsWallMidLeftMidRightTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallMidLeftTallRightTile = function() {
  var newTile = new RuinsWallMidLeftTallRightTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallTile = function() {
  var newTile = new RuinsWallTile();
  return newTile;
}

tileFactory.prototype.makeIllusionaryRuinsWallTile = function() {
  var newTile = new IllusionaryRuinsWallTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallMidLeftBottomRightTile = function() {
  var newTile = new RuinsWallMidLeftBottomRightTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallBottomLeftMidRightTile = function() {
  var newTile = new RuinsWallBottomLeftMidRightTile();
  return newTile;
}

tileFactory.prototype.makeArrowSlitTile = function() {
  var newTile = new ArrowSlitTile();
  return newTile;
}

tileFactory.prototype.makeWindowTile = function() {
  var newTile = new WindowTile();
  return newTile;
}

tileFactory.prototype.makeWallNETile = function() {
  var newTile = new WallNETile();
  return newTile;
}

tileFactory.prototype.makeWallNWTile = function() {
  var newTile = new WallNWTile();
  return newTile;
}

tileFactory.prototype.makeWallSWTile = function() {
  var newTile = new WallSWTile();
  return newTile;
}

tileFactory.prototype.makeWallSETile = function() {
  var newTile = new WallSETile();
  return newTile;
}

tileFactory.prototype.makeVerticalCounterTile = function() {
  var newTile = new VerticalCounterTile();
  return newTile;
}

tileFactory.prototype.makeBottomCounterTile = function() {
  var newTile = new BottomCounterTile();
  return newTile;
}

tileFactory.prototype.makeTopCounterTile = function() {
  var newTile = new TopCounterTile();
  return newTile;
}

tileFactory.prototype.makePlanksNSTile = function() {
  var newTile = new PlanksNSTile();
  return newTile;
}

tileFactory.prototype.makeShadowPlanksNSTile = function() {
  var newTile = new ShadowPlanksNSTile();
  return newTile;
}

tileFactory.prototype.makeSouthCoastTile = function() {
  var newTile = new SouthCoastTile();
  return newTile;
}

tileFactory.prototype.makeNorthCoastTile = function() {
  var newTile = new NorthCoastTile();
  return newTile;
}

tileFactory.prototype.makeNorthCoastSandTile = function() {
  var newTile = new NorthCoastSandTile();
  return newTile;
}

tileFactory.prototype.makeEastCoastTile = function() {
  var newTile = new EastCoastTile();
  return newTile;
}

tileFactory.prototype.makeWestCoastTile = function() {
  var newTile = new WestCoastTile();
  return newTile;
}

tileFactory.prototype.makeNortheastCoastTile = function() {
  var newTile = new NortheastCoastTile();
  return newTile;
}

tileFactory.prototype.makeNortheastCoastSandTile = function() {
  var newTile = new NortheastCoastSandTile();
  return newTile;
}

tileFactory.prototype.makeSouthwestCoastTile = function() {
  var newTile = new SouthwestCoastTile();
  return newTile;
}

tileFactory.prototype.makeNorthwestCoastTile = function() {
  var newTile = new NorthwestCoastTile();
  return newTile;
}

tileFactory.prototype.makeNorthwestCoastSandTile = function() {
  var newTile = new NorthwestCoastSandTile();
  return newTile;
}

tileFactory.prototype.makeSoutheastCoastTile = function() {
  var newTile = new SoutheastCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowSouthCoastTile = function() {
  var newTile = new ShadowSouthCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowNorthCoastTile = function() {
  var newTile = new ShadowNorthCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowEastCoastTile = function() {
  var newTile = new ShadowEastCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowWestCoastTile = function() {
  var newTile = new ShadowWestCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowNortheastCoastTile = function() {
  var newTile = new ShadowNortheastCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowSouthwestCoastTile = function() {
  var newTile = new ShadowSouthwestCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowNorthwestCoastTile = function() {
  var newTile = new ShadowNorthwestCoastTile();
  return newTile;
}

tileFactory.prototype.makeShadowSoutheastCoastTile = function() {
  var newTile = new ShadowSoutheastCoastTile();
  return newTile;
}

tileFactory.prototype.makeRiverTile = function() {
  var newTile = new RiverTile();
  return newTile;
}

tileFactory.prototype.makeCobblestoneTile = function() {
  var newTile = new CobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeBlueTilesTile = function() {
  var newTile = new BlueTilesTile();
  return newTile;
}

tileFactory.prototype.makePlanksEWTile = function() {
  var newTile = new PlanksEWTile();
  return newTile;
}

tileFactory.prototype.makeGrassTile = function() {
  var newTile = new GrassTile();
  return newTile;
}

tileFactory.prototype.makeShadowGrassTile = function() {
  var newTile = new ShadowGrassTile();
  return newTile;
}

tileFactory.prototype.makeDirtTile = function() {
  var newTile = new DirtTile();
  return newTile;
}

tileFactory.prototype.makeShadowDirtTile = function() {
  var newTile = new ShadowDirtTile();
  return newTile;
}

tileFactory.prototype.makeRoadTile = function() {
  var newTile = new RoadTile();
  return newTile;
}

tileFactory.prototype.makeBrushTile = function() {
  var newTile = new BrushTile();
  return newTile;
}

tileFactory.prototype.makeShadowBrushTile = function() {
  var newTile = new ShadowBrushTile();
  return newTile;
}

tileFactory.prototype.makeBrushNCoastTile = function() {
  var newTile = new BrushNCoastTile();
  return newTile;
}

tileFactory.prototype.makeBrushECoastTile = function() {
  var newTile = new BrushECoastTile();
  return newTile;
}

tileFactory.prototype.makeBrushSCoastTile = function() {
  var newTile = new BrushSCoastTile();
  return newTile;
}

tileFactory.prototype.makeBrushWCoastTile = function() {
  var newTile = new BrushWCoastTile();
  return newTile;
}

tileFactory.prototype.makeForestTile = function() {
  var newTile = new ForestTile();
  return newTile;
}

tileFactory.prototype.makeGroveTile = function() {
  var newTile = new GroveTile();
  return newTile;
}

tileFactory.prototype.makeShadowGroveTile = function() {
  var newTile = new ShadowGroveTile();
  return newTile;
}

tileFactory.prototype.makeForestNCoastTile = function() {
  var newTile = new ForestNCoastTile();
  return newTile;
}

tileFactory.prototype.makeForestECoastTile = function() {
  var newTile = new ForestECoastTile();
  return newTile;
}

tileFactory.prototype.makeForestSCoastTile = function() {
  var newTile = new ForestSCoastTile();
  return newTile;
}

tileFactory.prototype.makeForestWCoastTile = function() {
  var newTile = new ForestWCoastTile();
  return newTile;
}

tileFactory.prototype.makeHillsTile = function() {
  var newTile = new HillsTile();
  return newTile;
}

tileFactory.prototype.makePurpleCobblestoneTile = function() {
  var newTile = new PurpleCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeShadowPurpleCobblestoneTile = function() {
  var newTile = new ShadowPurpleCobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeSwampTile = function() {
  var newTile = new SwampTile();
  return newTile;
}

tileFactory.prototype.makeShadowSwampTile = function() {
  var newTile = new ShadowSwampTile();
  return newTile;
}

tileFactory.prototype.makeShinglesTile = function() {
  var newTile = new ShinglesTile();
  return newTile;
}

tileFactory.prototype.makeShinglesTopTile = function() {
  var newTile = new ShinglesTopTile();
  return newTile;
}

tileFactory.prototype.makeCaveFloorTile = function() {
  var newTile = new CaveFloorTile();
  return newTile;
}

tileFactory.prototype.makeCaveWallTile = function() {
  var newTile = new CaveWallTile();
  return newTile;
}

tileFactory.prototype.makeHexFloorTile = function() {
  var newTile = new HexFloorTile();
  return newTile;
}

tileFactory.prototype.makeHexTransparentFloorTile = function() {
  var newTile = new HexTransparentFloorTile();
  return newTile;
}

tileFactory.prototype.makeGoldOutlineFloorTile = function() {
  var newTile = new GoldOutlineFloorTile();
  return newTile;
}

tileFactory.prototype.makeDiamondFloorTile = function() {
  var newTile = new DiamondFloorTile();
  return newTile;
}

tileFactory.prototype.makeBlueDiamondFloorTile = function() {
  var newTile = new BlueDiamondFloorTile();
  return newTile;
}

tileFactory.prototype.makePurpleDiamondFloorTile = function() {
  var newTile = new PurpleDiamondFloorTile();
  return newTile;
}

tileFactory.prototype.makeRedDiamondFloorTile = function() {
  var newTile = new RedDiamondFloorTile();
  return newTile;
}

tileFactory.prototype.makeGreenDiamondFloorTile = function() {
  var newTile = new GreenDiamondFloorTile();
  return newTile;
}

tileFactory.prototype.makeYellowDiamondFloorTile = function() {
  var newTile = new YellowDiamondFloorTile();
  return newTile;
}

tileFactory.prototype.makeBannerTile = function() {
  var newTile = new BannerTile();
  return newTile;
}

tileFactory.prototype.makeLavaTubeTile = function() {
  var newTile = new LavaTubeTile();
  return newTile;
}

tileFactory.prototype.makeSeeBelowTile = function() {
  var newTile = new SeeBelowTile();
  return newTile;
}

tileFactory.prototype.makeWorldBelowTile = function() {
  var newTile = new WorldBelowTile();
  return newTile;
}

tileFactory.prototype.makeLavaTile = function() {
  var newTile = new LavaTile();
  return newTile;
}

tileFactory.prototype.makeCoralTile = function() {
  var newTile = new CoralTile();
  return newTile;
}

tileFactory.prototype.makeWaterRockTile = function() {
  var newTile = new WaterRockTile();
  return newTile;
}

tileFactory.prototype.makeDungeonTile = function() {
  var newTile = new DungeonTile();
  return newTile;
}

tileFactory.prototype.makeCaveTile = function() {
  var newTile = new CaveTile();
  return newTile;
}

tileFactory.prototype.makeTowneTile = function() {
  var newTile = new TowneTile();
  return newTile;
}

tileFactory.prototype.makeKeepTile = function() {
  var newTile = new KeepTile();
  return newTile;
}

tileFactory.prototype.makeGrassTowerTile = function() {
  var newTile = new GrassTowerTile();
  return newTile;
}

tileFactory.prototype.makeHillTowerTile = function() {
  var newTile = new HillTowerTile();
  return newTile;
}

tileFactory.prototype.makeLighthouseTile = function() {
  var newTile = new LighthouseTile();
  return newTile;
}

tileFactory.prototype.makeVillageTile = function() {
  var newTile = new VillageTile();
  return newTile;
}

tileFactory.prototype.makeCastleTile = function() {
  var newTile = new CastleTile();
  return newTile;
}

tileFactory.prototype.makeLeftCastleTile = function() {
  var newTile = new LeftCastleTile();
  return newTile;
}

tileFactory.prototype.makeRightCastleTile = function() {
  var newTile = new RightCastleTile();
  return newTile;
}

tileFactory.prototype.makeDoorwayTile = function() {
  var newTile = new DoorwayTile();
  return newTile;
}

tileFactory.prototype.makeStoneDoorwayTile = function() {
  var newTile = new StoneDoorwayTile();
  return newTile;
}

tileFactory.prototype.makeWallDoorwayTile = function() {
  var newTile = new WallDoorwayTile();
  return newTile;
}

tileFactory.prototype.makeShrineTile = function() {
  var newTile = new ShrineTile();
  return newTile;
}

tileFactory.prototype.makeBrokenShrineTile = function() {
  var newTile = new BrokenShrineTile();
  return newTile;
}

tileFactory.prototype.makeRuinsTile = function() {
  var newTile = new RuinsTile();
  return newTile;
}

tileFactory.prototype.makeChestTile = function() {
  var newTile = new ChestTile();
  return newTile;
}

tileFactory.prototype.makeDoorWindowTile = function() {
  var newTile = new DoorWindowTile();
  return newTile;
}

tileFactory.prototype.makeStonePortcullisTile = function() {
  var newTile = new StonePortcullisTile();
  return newTile;
}

tileFactory.prototype.makeWallPortcullisTile = function() {
  var newTile = new WallPortcullisTile();
  return newTile;
}

tileFactory.prototype.makeCorpseTile = function() {
  var newTile = new CorpseTile();
  return newTile;
}

tileFactory.prototype.makeBloodTile = function() {
  var newTile = new BloodTile();
  return newTile;
}

tileFactory.prototype.makeEnergyFieldTile = function() {
  var newTile = new EnergyFieldTile();
  return newTile;
}

tileFactory.prototype.makeTorchWestTile = function() {
  var newTile = new TorchWestTile();
  return newTile;
}

tileFactory.prototype.makeTorchEastTile = function() {
  var newTile = new TorchEastTile();
  return newTile;
}

tileFactory.prototype.makeCampfireTile = function() {
  var newTile = new CampfireTile();
  return newTile;
}

tileFactory.prototype.makeBrazierTile = function() {
  var newTile = new BrazierTile();
  return newTile;
}

tileFactory.prototype.makeUnlitBrazierTile = function() {
  var newTile = new UnlitBrazierTile();
  return newTile;
}

tileFactory.prototype.makeWEBrazierTile = function() {
  var newTile = new WEBrazierTile();
  return newTile;
}

tileFactory.prototype.makeUnlitWEBrazierTile = function() {
  var newTile = new UnlitWEBrazierTile();
  return newTile;
}

tileFactory.prototype.makeIllusionaryEnergyFieldTile = function() {
  var newTile = new IllusionaryEnergyFieldTile();
  return newTile;
}

tileFactory.prototype.makeSpitTile = function() {
  var newTile = new SpitTile();
  return newTile;
}

tileFactory.prototype.makeFireplaceTile = function() {
  var newTile = new FireplaceTile();
  return newTile;
}

tileFactory.prototype.makeDustyFireplaceTile = function() {
  var newTile = new DustyFireplaceTile();
  return newTile;
}

tileFactory.prototype.makeAltarTile = function() {
  var newTile = new AltarTile();
  return newTile;
}

tileFactory.prototype.makeThroneTile = function() {
  var newTile = new ThroneTile();
  return newTile;
}

tileFactory.prototype.makeDoorTile = function() {
  var newTile = new DoorTile();
  return newTile;
}

tileFactory.prototype.makeTalkingDoorTile = function() {
  var newTile = new TalkingDoorTile();
  return newTile;
}

tileFactory.prototype.makeSleepFieldTile = function() {
  var newTile = new SleepFieldTile();
  return newTile;
}

tileFactory.prototype.makeFireFieldTile = function() {
  var newTile = new FireFieldTile();
  return newTile;
}

tileFactory.prototype.makePoisonFieldTile = function() {
  var newTile = new PoisonFieldTile();
  return newTile;
}

tileFactory.prototype.makeLadderDownTile = function() {
  var newTile = new LadderDownTile();
  return newTile;
}

tileFactory.prototype.makeLadderUpTile = function() {
  var newTile = new LadderUpTile();
  return newTile;
}

tileFactory.prototype.makeStairDownTile = function() {
  var newTile = new StairDownTile();
  return newTile;
}

tileFactory.prototype.makeStairUpTile = function() {
  var newTile = new StairUpTile();
  return newTile;
}

tileFactory.prototype.makeStairDown2Tile = function() {
  var newTile = new StairDown2Tile();
  return newTile;
}

tileFactory.prototype.makeStairUp2Tile = function() {
  var newTile = new StairUp2Tile();
  return newTile;
}

tileFactory.prototype.makeSingleSignpostTile = function() {
  var newTile = new SingleSignpostTile();
  return newTile;
}

tileFactory.prototype.makeSignpostLeftTile = function() {
  var newTile = new SignpostLeftTile();
  return newTile;
}

tileFactory.prototype.makeSignpostRightTile = function() {
  var newTile = new SignpostRightTile();
  return newTile;
}

tileFactory.prototype.makeSingleSignpost2Tile = function() {
  var newTile = new SingleSignpost2Tile();
  return newTile;
}

tileFactory.prototype.makeSignpostLeft2Tile = function() {
  var newTile = new SignpostLeft2Tile();
  return newTile;
}

tileFactory.prototype.makeSignpostRight2Tile = function() {
  var newTile = new SignpostRight2Tile();
  return newTile;
}

tileFactory.prototype.makeInnSignTile = function() {
  var newTile = new InnSignTile();
  return newTile;
}

tileFactory.prototype.makeTavernSignTile = function() {
  var newTile = new TavernSignTile();
  return newTile;
}

tileFactory.prototype.makeArmourySignTile = function() {
  var newTile = new ArmourySignTile();
  return newTile;
}

tileFactory.prototype.makeGrocerSignTile = function() {
  var newTile = new GrocerSignTile();
  return newTile;
}

tileFactory.prototype.makeGrocerSign2Tile = function() {
  var newTile = new GrocerSign2Tile();
  return newTile;
}

tileFactory.prototype.makeWeaponSignTile = function() {
  var newTile = new WeaponSignTile();
  return newTile;
}

tileFactory.prototype.makeBowyerSignTile = function() {
  var newTile = new BowyerSignTile();
  return newTile;
}

tileFactory.prototype.makeAlchemistSignTile = function() {
  var newTile = new AlchemistSignTile();
  return newTile;
}

tileFactory.prototype.makeMagicShoppeSignTile = function() {
  var newTile = new MagicShoppeSignTile();
  return newTile;
}

tileFactory.prototype.makeHealerSignTile = function() {
  var newTile = new HealerSignTile();
  return newTile;
}

tileFactory.prototype.makeCasinoSignTile = function() {
  var newTile = new CasinoSignTile();
  return newTile;
}

tileFactory.prototype.makePaladinSignTile = function() {
  var newTile = new PaladinSignTile();
  return newTile;
}

tileFactory.prototype.makeTrainingDummyTile = function() {
  var newTile = new TrainingDummyTile();
  return newTile;
}

tileFactory.prototype.makeAnvilTile = function() {
  var newTile = new AnvilTile();
  return newTile;
}

tileFactory.prototype.makeWBridgeNSTile = function() {
  var newTile = new WBridgeNSTile();
  return newTile;
}

tileFactory.prototype.makeEBridgeNSTile = function() {
  var newTile = new EBridgeNSTile();
  return newTile;
}

tileFactory.prototype.makeBridgeNSTile = function() {
  var newTile = new BridgeNSTile();
  return newTile;
}

tileFactory.prototype.makeNBridgeEWTile = function() {
  var newTile = new NBridgeEWTile();
  return newTile;
}

tileFactory.prototype.makeSBridgeEWTile = function() {
  var newTile = new SBridgeEWTile();
  return newTile;
}

tileFactory.prototype.makeBridgeEWTile = function() {
  var newTile = new BridgeEWTile();
  return newTile;
}

tileFactory.prototype.makeLeftChairTile = function() {
  var newTile = new LeftChairTile();
  return newTile;
}

tileFactory.prototype.makeRightChairTile = function() {
  var newTile = new RightChairTile();
  return newTile;
}

tileFactory.prototype.makeTopChairTile = function() {
  var newTile = new TopChairTile();
  return newTile;
}

tileFactory.prototype.makeBottomChairTile = function() {
  var newTile = new BottomChairTile();
  return newTile;
}

tileFactory.prototype.makeSmallTableTile = function() {
  var newTile = new SmallTableTile();
  return newTile;
}

tileFactory.prototype.makeLeftTableTile = function() {
  var newTile = new LeftTableTile();
  return newTile;
}

tileFactory.prototype.makeMiddleTableTile = function() {
  var newTile = new MiddleTableTile();
  return newTile;
}

tileFactory.prototype.makeRightTableTile = function() {
  var newTile = new RightTableTile();
  return newTile;
}

tileFactory.prototype.makeLeftTableOnWoodTile = function() {
  var newTile = new LeftTableOnWoodTile();
  return newTile;
}

tileFactory.prototype.makeMiddleTableOnWoodTile = function() {
  var newTile = new MiddleTableOnWoodTile();
  return newTile;
}

tileFactory.prototype.makeRightTableOnWoodTile = function() {
  var newTile = new RightTableOnWoodTile();
  return newTile;
}

tileFactory.prototype.makeHarpsichordTile = function() {
  var newTile = new HarpsichordTile();
  return newTile;
}

tileFactory.prototype.makeBedHeadTile = function() {
  var newTile = new BedHeadTile();
  return newTile;
}

tileFactory.prototype.makeBedFootTile = function() {
  var newTile = new BedFootTile();
  return newTile;
}

tileFactory.prototype.makeBookshelfLeftTile = function() {
  var newTile = new BookshelfLeftTile();
  return newTile;
}

tileFactory.prototype.makeBookshelfRightTile = function() {
  var newTile = new BookshelfRightTile();
  return newTile;
}

tileFactory.prototype.makeBookshelfOneTile = function() {
  var newTile = new BookshelfOneTile();
  return newTile;
}

tileFactory.prototype.makeSmallBoxTile = function() {
  var newTile = new SmallBoxTile();
  return newTile;
}

tileFactory.prototype.makeDresserTile = function() {
  var newTile = new DresserTile();
  return newTile;
}

tileFactory.prototype.makeBarrelTile = function() {
  var newTile = new BarrelTile();
  return newTile;
}

tileFactory.prototype.makeKitchenBarrelTile = function() {
  var newTile = new KitchenBarrelTile();
  return newTile;
}

tileFactory.prototype.makeKitchenBarrel2Tile = function() {
  var newTile = new KitchenBarrel2Tile();
  return newTile;
}

tileFactory.prototype.makeKitchenBarrel3Tile = function() {
  var newTile = new KitchenBarrel3Tile();
  return newTile;
}

tileFactory.prototype.makeMirrorTile = function() {
  var newTile = new MirrorTile();
  return newTile;
}

tileFactory.prototype.makeReflectionTile = function() {
  var newTile = new ReflectionTile();
  return newTile;
}

tileFactory.prototype.makeWaterfallTile = function() {
  var newTile = new WaterfallTile();
  return newTile;
}

tileFactory.prototype.makeWaterfallFlowTile = function() {
  var newTile = new WaterfallFlowTile();
  return newTile;
}

tileFactory.prototype.makeSecretDoorTile = function() {
  var newTile = new SecretDoorTile();
  return newTile;
}

tileFactory.prototype.makeWellTile = function() {
  var newTile = new WellTile();
  return newTile;
}

tileFactory.prototype.makeWhirlpoolTile = function() {
  var newTile = new WhirlpoolTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnTile = function() {
  var newTile = new WalkOnTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnChangeExitTile = function() {
  var newTile = new WalkOnChangeExitTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssTile = function() {
  var newTile = new WalkOnAbyssTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyss0Tile = function() {
  var newTile = new WalkOnAbyss0Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyss1Tile = function() {
  var newTile = new WalkOnAbyss1Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyss2Tile = function() {
  var newTile = new WalkOnAbyss2Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyss3Tile = function() {
  var newTile = new WalkOnAbyss3Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyss4Tile = function() {
  var newTile = new WalkOnAbyss4Tile();
  return newTile;
}

tileFactory.prototype.makeSpawnerTile = function() {
  var newTile = new SpawnerTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetNWTile = function() {
  var newTile = new RedCarpetNWTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetNTile = function() {
  var newTile = new RedCarpetNTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetNETile = function() {
  var newTile = new RedCarpetNETile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetWTile = function() {
  var newTile = new RedCarpetWTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetCTile = function() {
  var newTile = new RedCarpetCTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetETile = function() {
  var newTile = new RedCarpetETile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetSWTile = function() {
  var newTile = new RedCarpetSWTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetSTile = function() {
  var newTile = new RedCarpetSTile();
  return newTile;
}

tileFactory.prototype.makeRedCarpetSETile = function() {
  var newTile = new RedCarpetSETile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetNWTile = function() {
  var newTile = new BlueCarpetNWTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetNTile = function() {
  var newTile = new BlueCarpetNTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetNETile = function() {
  var newTile = new BlueCarpetNETile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetWTile = function() {
  var newTile = new BlueCarpetWTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetCTile = function() {
  var newTile = new BlueCarpetCTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetETile = function() {
  var newTile = new BlueCarpetETile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetSWTile = function() {
  var newTile = new BlueCarpetSWTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetSTile = function() {
  var newTile = new BlueCarpetSTile();
  return newTile;
}

tileFactory.prototype.makeBlueCarpetSETile = function() {
  var newTile = new BlueCarpetSETile();
  return newTile;
}

tileFactory.prototype.makePentagramNWTile = function() {
  var newTile = new PentagramNWTile();
  return newTile;
}

tileFactory.prototype.makePentagramNTile = function() {
  var newTile = new PentagramNTile();
  return newTile;
}

tileFactory.prototype.makePentagramNETile = function() {
  var newTile = new PentagramNETile();
  return newTile;
}

tileFactory.prototype.makePentagramWTile = function() {
  var newTile = new PentagramWTile();
  return newTile;
}

tileFactory.prototype.makePentagramCTile = function() {
  var newTile = new PentagramCTile();
  return newTile;
}

tileFactory.prototype.makePentagramETile = function() {
  var newTile = new PentagramETile();
  return newTile;
}

tileFactory.prototype.makePentagramSWTile = function() {
  var newTile = new PentagramSWTile();
  return newTile;
}

tileFactory.prototype.makePentagramSTile = function() {
  var newTile = new PentagramSTile();
  return newTile;
}

tileFactory.prototype.makePentagramSETile = function() {
  var newTile = new PentagramSETile();
  return newTile;
}

tileFactory.prototype.makeWeaponCounterDaggerTile = function() {
  var newTile = new WeaponCounterDaggerTile();
  return newTile;
}

tileFactory.prototype.makeWeaponCounterMaceTile = function() {
  var newTile = new WeaponCounterMaceTile();
  return newTile;
}

tileFactory.prototype.makeWeaponCounterSwordTile = function() {
  var newTile = new WeaponCounterSwordTile();
  return newTile;
}

tileFactory.prototype.makeArmorCounterLeatherTile = function() {
  var newTile = new ArmorCounterLeatherTile();
  return newTile;
}

tileFactory.prototype.makeArmorCounterChainTile = function() {
  var newTile = new ArmorCounterChainTile();
  return newTile;
}

tileFactory.prototype.makeArmorCounterPlateTile = function() {
  var newTile = new ArmorCounterPlateTile();
  return newTile;
}

tileFactory.prototype.makeArmorRackLeatherTile = function() {
  var newTile = new ArmorRackLeatherTile();
  return newTile;
}

tileFactory.prototype.makeArmorRackChainTile = function() {
  var newTile = new ArmorRackChainTile();
  return newTile;
}

tileFactory.prototype.makeArmorRackPlateTile = function() {
  var newTile = new ArmorRackPlateTile();
  return newTile;
}

tileFactory.prototype.makeSkeletonDecorationTile = function() {
  var newTile = new SkeletonDecorationTile();
  return newTile;
}

tileFactory.prototype.makeMoatLeverOffTile = function() {
  var newTile = new MoatLeverOffTile();
  return newTile;
}

tileFactory.prototype.makeLeverOffTile = function() {
  var newTile = new LeverOffTile();
  return newTile;
}

tileFactory.prototype.makeBDCLeverTile = function() {
  var newTile = new BDCLeverTile();
  return newTile;
}

tileFactory.prototype.makeGrottoLeverOffTile = function() {
  var newTile = new GrottoLeverOffTile();
  return newTile;
}

tileFactory.prototype.makeMetalTwisterLeverTile = function() {
  var newTile = new MetalTwisterLeverTile();
  return newTile;
}

tileFactory.prototype.makePitDespairLeverTile = function() {
  var newTile = new PitDespairLeverTile();
  return newTile;
}

tileFactory.prototype.makeRoyalPuzzleLaserEWTile = function() {
  var newTile = new RoyalPuzzleLaserEWTile();
  return newTile;
}

tileFactory.prototype.makeRoyalPuzzleLaserNSTile = function() {
  var newTile = new RoyalPuzzleLaserNSTile();
  return newTile;
}

tileFactory.prototype.makeRoyalPuzzleLaserCrossTile = function() {
  var newTile = new RoyalPuzzleLaserCrossTile();
  return newTile;
}

tileFactory.prototype.makeSandstoneWallTile = function() {
  var newTile = new SandstoneWallTile();
  return newTile;
}

tileFactory.prototype.makeWallOfWavesTile = function() {
  var newTile = new WallOfWavesTile();
  return newTile;
}

tileFactory.prototype.makeRuneOfWavesTile = function() {
  var newTile = new RuneOfWavesTile();
  return newTile;
}

tileFactory.prototype.makeWallOfWindsTile = function() {
  var newTile = new WallOfWindsTile();
  return newTile;
}

tileFactory.prototype.makeRuneOfWindsTile = function() {
  var newTile = new RuneOfWindsTile();
  return newTile;
}

tileFactory.prototype.makeWallOfKingsTile = function() {
  var newTile = new WallOfKingsTile();
  return newTile;
}

tileFactory.prototype.makeRuneOfKingsTile = function() {
  var newTile = new RuneOfKingsTile();
  return newTile;
}

tileFactory.prototype.makeWallOfFlamesTile = function() {
  var newTile = new WallOfFlamesTile();
  return newTile;
}

tileFactory.prototype.makeRuneOfFlamesTile = function() {
  var newTile = new RuneOfFlamesTile();
  return newTile;
}

tileFactory.prototype.makeWallOfVoidTile = function() {
  var newTile = new WallOfVoidTile();
  return newTile;
}

tileFactory.prototype.makeRuneOfVoidTile = function() {
  var newTile = new RuneOfVoidTile();
  return newTile;
}

tileFactory.prototype.makePlatformOfWavesTile = function() {
  var newTile = new PlatformOfWavesTile();
  return newTile;
}

tileFactory.prototype.makePlatformOfWindsTile = function() {
  var newTile = new PlatformOfWindsTile();
  return newTile;
}

tileFactory.prototype.makePlatformOfKingsTile = function() {
  var newTile = new PlatformOfKingsTile();
  return newTile;
}

tileFactory.prototype.makePlatformOfFlamesTile = function() {
  var newTile = new PlatformOfFlamesTile();
  return newTile;
}

tileFactory.prototype.makePlatformOfVoidTile = function() {
  var newTile = new PlatformOfVoidTile();
  return newTile;
}

tileFactory.prototype.makeMarkOfKingsTile = function() {
  var newTile = new MarkOfKingsTile();
  return newTile;
}

tileFactory.prototype.makeMarkOfWavesTile = function() {
  var newTile = new MarkOfWavesTile();
  return newTile;
}

tileFactory.prototype.makeMarkOfWindsTile = function() {
  var newTile = new MarkOfWindsTile();
  return newTile;
}

tileFactory.prototype.makeMarkOfFlamesTile = function() {
  var newTile = new MarkOfFlamesTile();
  return newTile;
}

tileFactory.prototype.makeFlameEternalTile = function() {
  var newTile = new FlameEternalTile();
  return newTile;
}

tileFactory.prototype.makeBrightFountainTile = function() {
  var newTile = new BrightFountainTile();
  return newTile;
}

tileFactory.prototype.makeBlueFountainTile = function() {
  var newTile = new BlueFountainTile();
  return newTile;
}

tileFactory.prototype.makeBloodFountainTile = function() {
  var newTile = new BloodFountainTile();
  return newTile;
}

tileFactory.prototype.makeFountainTile = function() {
  var newTile = new FountainTile();
  return newTile;
}

tileFactory.prototype.makeBlueCrystalTile = function() {
  var newTile = new BlueCrystalTile();
  return newTile;
}

tileFactory.prototype.makePurpleCrystalTile = function() {
  var newTile = new PurpleCrystalTile();
  return newTile;
}

tileFactory.prototype.makeYellowCrystalTile = function() {
  var newTile = new YellowCrystalTile();
  return newTile;
}

tileFactory.prototype.makeGreenCrystalTile = function() {
  var newTile = new GreenCrystalTile();
  return newTile;
}

tileFactory.prototype.makeRedCrystalTile = function() {
  var newTile = new RedCrystalTile();
  return newTile;
}

tileFactory.prototype.makeWhiteCrystalTile = function() {
  var newTile = new WhiteCrystalTile();
  return newTile;
}

tileFactory.prototype.makeTeleporterPlatformTile = function() {
  var newTile = new TeleporterPlatformTile();
  return newTile;
}

tileFactory.prototype.makePitTeleporterPlatformTile = function() {
  var newTile = new PitTeleporterPlatformTile();
  return newTile;
}

tileFactory.prototype.makeToshinPanelTile = function() {
  var newTile = new ToshinPanelTile();
  return newTile;
}

tileFactory.prototype.makeToshinMoatLeverOffTile = function() {
  var newTile = new ToshinMoatLeverOffTile();
  return newTile;
}

tileFactory.prototype.makeOrbToggleTile = function() {
  var newTile = new OrbToggleTile();
  return newTile;
}

tileFactory.prototype.makeOrbStrengthTile = function() {
  var newTile = new OrbStrengthTile();
  return newTile;
}

tileFactory.prototype.makeOrbDexterityTile = function() {
  var newTile = new OrbDexterityTile();
  return newTile;
}

tileFactory.prototype.makeOrbIntelligenceTile = function() {
  var newTile = new OrbIntelligenceTile();
  return newTile;
}

tileFactory.prototype.makeOrbExperienceTile = function() {
  var newTile = new OrbExperienceTile();
  return newTile;
}

tileFactory.prototype.makeEtherGateTile = function() {
  var newTile = new EtherGateTile();
  return newTile;
}

tileFactory.prototype.makeMoongateTile = function() {
  var newTile = new MoongateTile();
  return newTile;
}

tileFactory.prototype.makePetrifiedReaperTile = function() {
  var newTile = new PetrifiedReaperTile();
  return newTile;
}

tileFactory.prototype.makeAltarWithSwordTile = function() {
  var newTile = new AltarWithSwordTile();
  return newTile;
}

tileFactory.prototype.makeAmbroseShieldTile = function() {
  var newTile = new AmbroseShieldTile();
  return newTile;
}

tileFactory.prototype.makeRobertMapTile = function() {
  var newTile = new RobertMapTile();
  return newTile;
}

tileFactory.prototype.makeSmallRockTile = function() {
  var newTile = new SmallRockTile();
  return newTile;
}

tileFactory.prototype.makeSiriCloakTile = function() {
  var newTile = new SiriCloakTile();
  return newTile;
}

tileFactory.prototype.makeCourierPouchTile = function() {
  var newTile = new CourierPouchTile();
  return newTile;
}

tileFactory.prototype.makeCourierLetterTile = function() {
  var newTile = new CourierLetterTile();
  return newTile;
}

tileFactory.prototype.makeTrustedPlansTile = function() {
  var newTile = new TrustedPlansTile();
  return newTile;
}

tileFactory.prototype.makeTrustedPinTile = function() {
  var newTile = new TrustedPinTile();
  return newTile;
}

tileFactory.prototype.makePitOfDespairKeyTile = function() {
  var newTile = new PitOfDespairKeyTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfSpiritsTile = function() {
  var newTile = new KeyOfSpiritsTile();
  return newTile;
}

tileFactory.prototype.makeRoyalKeyTile = function() {
  var newTile = new RoyalKeyTile();
  return newTile;
}

tileFactory.prototype.makeBlackDragonKeyTile = function() {
  var newTile = new BlackDragonKeyTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfAshesTile = function() {
  var newTile = new KeyOfAshesTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfIceTile = function() {
  var newTile = new KeyOfIceTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfBoneTile = function() {
  var newTile = new KeyOfBoneTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfDustTile = function() {
  var newTile = new KeyOfDustTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfSunTile = function() {
  var newTile = new KeyOfSunTile();
  return newTile;
}

tileFactory.prototype.makeKeyOfShadowTile = function() {
  var newTile = new KeyOfShadowTile();
  return newTile;
}

tileFactory.prototype.makeReaperBarkTile = function() {
  var newTile = new ReaperBarkTile();
  return newTile;
}

tileFactory.prototype.makeAmuletOfReflectionsTile = function() {
  var newTile = new AmuletOfReflectionsTile();
  return newTile;
}

tileFactory.prototype.makeDragonBoneTile = function() {
  var newTile = new DragonBoneTile();
  return newTile;
}

tileFactory.prototype.makeStoneOfSparksTile = function() {
  var newTile = new StoneOfSparksTile();
  return newTile;
}

tileFactory.prototype.makeStoneOfEmbersTile = function() {
  var newTile = new StoneOfEmbersTile();
  return newTile;
}

tileFactory.prototype.makeStoneOfTheBlazeTile = function() {
  var newTile = new StoneOfTheBlazeTile();
  return newTile;
}

tileFactory.prototype.makeStoneOfConflagrationsTile = function() {
  var newTile = new StoneOfConflagrationsTile();
  return newTile;
}

tileFactory.prototype.makeTreasuryTokenTile = function() {
  var newTile = new TreasuryTokenTile();
  return newTile;
}

tileFactory.prototype.makeSpiderSilkTile = function() {
  var newTile = new SpiderSilkTile();
  return newTile;
}

tileFactory.prototype.makeBlackPearlTile = function() {
  var newTile = new BlackPearlTile();
  return newTile;
}

tileFactory.prototype.makeExecutionersHoodTile = function() {
  var newTile = new ExecutionersHoodTile();
  return newTile;
}

tileFactory.prototype.makeQuestExecutionersHoodTile = function() {
  var newTile = new QuestExecutionersHoodTile();
  return newTile;
}

tileFactory.prototype.makeNightshadeTile = function() {
  var newTile = new NightshadeTile();
  return newTile;
}

tileFactory.prototype.makeSulfurousAshTile = function() {
  var newTile = new SulfurousAshTile();
  return newTile;
}

tileFactory.prototype.makeMandrakeRootTile = function() {
  var newTile = new MandrakeRootTile();
  return newTile;
}

tileFactory.prototype.makeLightningWoodTile = function() {
  var newTile = new LightningWoodTile();
  return newTile;
}

tileFactory.prototype.makeMistletoeTile = function() {
  var newTile = new MistletoeTile();
  return newTile;
}

tileFactory.prototype.makeBloodMossTile = function() {
  var newTile = new BloodMossTile();
  return newTile;
}

tileFactory.prototype.makePerfectRubyTile = function() {
  var newTile = new PerfectRubyTile();
  return newTile;
}

tileFactory.prototype.makeRubyTile = function() {
  var newTile = new RubyTile();
  return newTile;
}

tileFactory.prototype.makeSmallSapphireTile = function() {
  var newTile = new SmallSapphireTile();
  return newTile;
}

tileFactory.prototype.makeSapphireTile = function() {
  var newTile = new SapphireTile();
  return newTile;
}

tileFactory.prototype.makeGemsTile = function() {
  var newTile = new GemsTile();
  return newTile;
}

tileFactory.prototype.makeRubyGemoftheSunTile = function() {
  var newTile = new RubyGemoftheSunTile();
  return newTile;
}

tileFactory.prototype.makeDecorativeArmorTile = function() {
  var newTile = new DecorativeArmorTile();
  return newTile;
}

tileFactory.prototype.makeGoldTile = function() {
  var newTile = new GoldTile();
  return newTile;
}

tileFactory.prototype.makeBookOfLoreTile = function() {
  var newTile = new BookOfLoreTile();
  return newTile;
}

tileFactory.prototype.makeTomeOfSightTile = function() {
  var newTile = new TomeOfSightTile();
  return newTile;
}

tileFactory.prototype.makeMapsAndLegendsTile = function() {
  var newTile = new MapsAndLegendsTile();
  return newTile;
}

tileFactory.prototype.makeATreatiseOnDragonsTile = function() {
  var newTile = new ATreatiseOnDragonsTile();
  return newTile;
}

tileFactory.prototype.makeAdelusLetterTile = function() {
  var newTile = new AdelusLetterTile();
  return newTile;
}

tileFactory.prototype.makeKyvekBoxTile = function() {
  var newTile = new KyvekBoxTile();
  return newTile;
}

tileFactory.prototype.makeSupplyBoxTile = function() {
  var newTile = new SupplyBoxTile();
  return newTile;
}

tileFactory.prototype.makeGreenPotionTile = function() {
  var newTile = new GreenPotionTile();
  return newTile;
}

tileFactory.prototype.makeDarkGreenPotionTile = function() {
  var newTile = new DarkGreenPotionTile();
  return newTile;
}

tileFactory.prototype.makeSilverPotionTile = function() {
  var newTile = new SilverPotionTile();
  return newTile;
}

tileFactory.prototype.makePinkPotionTile = function() {
  var newTile = new PinkPotionTile();
  return newTile;
}

tileFactory.prototype.makeGreyPotionTile = function() {
  var newTile = new GreyPotionTile();
  return newTile;
}

tileFactory.prototype.makeBrownPotionTile = function() {
  var newTile = new BrownPotionTile();
  return newTile;
}

tileFactory.prototype.makeRedPotionTile = function() {
  var newTile = new RedPotionTile();
  return newTile;
}

tileFactory.prototype.makeWhitePotionTile = function() {
  var newTile = new WhitePotionTile();
  return newTile;
}

tileFactory.prototype.makeYellowPotionTile = function() {
  var newTile = new YellowPotionTile();
  return newTile;
}

tileFactory.prototype.makePurplePotionTile = function() {
  var newTile = new PurplePotionTile();
  return newTile;
}

tileFactory.prototype.makeBlackPotionTile = function() {
  var newTile = new BlackPotionTile();
  return newTile;
}

tileFactory.prototype.makeBluePotionTile = function() {
  var newTile = new BluePotionTile();
  return newTile;
}

tileFactory.prototype.makeOrangePotionTile = function() {
  var newTile = new OrangePotionTile();
  return newTile;
}

tileFactory.prototype.makeScrollAwakenTile = function() {
  var newTile = new ScrollAwakenTile();
  return newTile;
}

tileFactory.prototype.makeScrollCureTile = function() {
  var newTile = new ScrollCureTile();
  return newTile;
}

tileFactory.prototype.makeScrollDisarmTrapTile = function() {
  var newTile = new ScrollDisarmTrapTile();
  return newTile;
}

tileFactory.prototype.makeScrollDistractTile = function() {
  var newTile = new ScrollDistractTile();
  return newTile;
}

tileFactory.prototype.makeScrollFlameBladeTile = function() {
  var newTile = new ScrollFlameBladeTile();
  return newTile;
}

tileFactory.prototype.makeScrollLightTile = function() {
  var newTile = new ScrollLightTile();
  return newTile;
}

tileFactory.prototype.makeScrollVulnerabilityTile = function() {
  var newTile = new ScrollVulnerabilityTile();
  return newTile;
}

tileFactory.prototype.makeScrollIllusionTile = function() {
  var newTile = new ScrollIllusionTile();
  return newTile;
}

tileFactory.prototype.makeScrollIronFleshTile = function() {
  var newTile = new ScrollIronFleshTile();
  return newTile;
}

tileFactory.prototype.makeScrollLesserHealTile = function() {
  var newTile = new ScrollLesserHealTile();
  return newTile;
}

tileFactory.prototype.makeScrollMagicBoltTile = function() {
  var newTile = new ScrollMagicBoltTile();
  return newTile;
}

tileFactory.prototype.makeScrollPoisonCloudTile = function() {
  var newTile = new ScrollPoisonCloudTile();
  return newTile;
}

tileFactory.prototype.makeScrollProtectionTile = function() {
  var newTile = new ScrollProtectionTile();
  return newTile;
}

tileFactory.prototype.makeScrollUnlockTile = function() {
  var newTile = new ScrollUnlockTile();
  return newTile;
}

tileFactory.prototype.makeScrollDispelTile = function() {
  var newTile = new ScrollDispelTile();
  return newTile;
}

tileFactory.prototype.makeScrollDisruptUndeadTile = function() {
  var newTile = new ScrollDisruptUndeadTile();
  return newTile;
}

tileFactory.prototype.makeScrollFireArmorTile = function() {
  var newTile = new ScrollFireArmorTile();
  return newTile;
}

tileFactory.prototype.makeScrollFireballTile = function() {
  var newTile = new ScrollFireballTile();
  return newTile;
}

tileFactory.prototype.makeScrollIceballTile = function() {
  var newTile = new ScrollIceballTile();
  return newTile;
}

tileFactory.prototype.makeScrollTelekinesisTile = function() {
  var newTile = new ScrollTelekinesisTile();
  return newTile;
}

tileFactory.prototype.makeScrollTelepathyTile = function() {
  var newTile = new ScrollTelepathyTile();
  return newTile;
}

tileFactory.prototype.makeScrollWallOfFlameTile = function() {
  var newTile = new ScrollWallOfFlameTile();
  return newTile;
}

tileFactory.prototype.makeScrollBlessingTile = function() {
  var newTile = new ScrollBlessingTile();
  return newTile;
}

tileFactory.prototype.makeScrollBlinkTile = function() {
  var newTile = new ScrollBlinkTile();
  return newTile;
}

tileFactory.prototype.makeScrollEtherealVisionTile = function() {
  var newTile = new ScrollEtherealVisionTile();
  return newTile;
}

tileFactory.prototype.makeScrollHealTile = function() {
  var newTile = new ScrollHealTile();
  return newTile;
}

tileFactory.prototype.makeScrollLifeDrainTile = function() {
  var newTile = new ScrollLifeDrainTile();
  return newTile;
}

tileFactory.prototype.makeScrollSmiteTile = function() {
  var newTile = new ScrollSmiteTile();
  return newTile;
}

tileFactory.prototype.makeScrollCrystalBarrierTile = function() {
  var newTile = new ScrollCrystalBarrierTile();
  return newTile;
}

tileFactory.prototype.makeScrollMirrorWardTile = function() {
  var newTile = new ScrollMirrorWardTile();
  return newTile;
}

tileFactory.prototype.makeScrollParalyzeTile = function() {
  var newTile = new ScrollParalyzeTile();
  return newTile;
}

tileFactory.prototype.makeScrollPeerTile = function() {
  var newTile = new ScrollPeerTile();
  return newTile;
}

tileFactory.prototype.makeScrollShockwaveTile = function() {
  var newTile = new ScrollShockwaveTile();
  return newTile;
}

tileFactory.prototype.makeScrollSummonAllyTile = function() {
  var newTile = new ScrollSummonAllyTile();
  return newTile;
}

tileFactory.prototype.makeScrollSwordstrikeTile = function() {
  var newTile = new ScrollSwordstrikeTile();
  return newTile;
}

tileFactory.prototype.makeScrollExplosionTile = function() {
  var newTile = new ScrollExplosionTile();
  return newTile;
}

tileFactory.prototype.makeScrollStormTile = function() {
  var newTile = new ScrollStormTile();
  return newTile;
}

tileFactory.prototype.makeScrollTremorTile = function() {
  var newTile = new ScrollTremorTile();
  return newTile;
}

tileFactory.prototype.makeScrollFearTile = function() {
  var newTile = new ScrollFearTile();
  return newTile;
}

tileFactory.prototype.makeScrollFireAndIceTile = function() {
  var newTile = new ScrollFireAndIceTile();
  return newTile;
}

tileFactory.prototype.makeScrollMeteorSwarmTile = function() {
  var newTile = new ScrollMeteorSwarmTile();
  return newTile;
}

tileFactory.prototype.makeScrollMindBlastTile = function() {
  var newTile = new ScrollMindBlastTile();
  return newTile;
}

tileFactory.prototype.makeScrollConflagrationTile = function() {
  var newTile = new ScrollConflagrationTile();
  return newTile;
}

tileFactory.prototype.makeScrollConjureDaemonTile = function() {
  var newTile = new ScrollConjureDaemonTile();
  return newTile;
}

tileFactory.prototype.makeScrollTimeStopTile = function() {
  var newTile = new ScrollTimeStopTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosAwakenTile = function() {
  var newTile = new AudachtaNemesosAwakenTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosDisarmTrapTile = function() {
  var newTile = new AudachtaNemesosDisarmTrapTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosDistractTile = function() {
  var newTile = new AudachtaNemesosDistractTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosFlameBladeTile = function() {
  var newTile = new AudachtaNemesosFlameBladeTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosVulnerabilityTile = function() {
  var newTile = new AudachtaNemesosVulnerabilityTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosLesserHealTile = function() {
  var newTile = new AudachtaNemesosLesserHealTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosPoisonCloudTile = function() {
  var newTile = new AudachtaNemesosPoisonCloudTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosProtectionTile = function() {
  var newTile = new AudachtaNemesosProtectionTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosWindChangeTile = function() {
  var newTile = new AudachtaNemesosWindChangeTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosFireArmorTile = function() {
  var newTile = new AudachtaNemesosFireArmorTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosIceballTile = function() {
  var newTile = new AudachtaNemesosIceballTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosTelekinesisTile = function() {
  var newTile = new AudachtaNemesosTelekinesisTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosTelepathyTile = function() {
  var newTile = new AudachtaNemesosTelepathyTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosWallOfFlameTile = function() {
  var newTile = new AudachtaNemesosWallOfFlameTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosBlessingTile = function() {
  var newTile = new AudachtaNemesosBlessingTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosHealTile = function() {
  var newTile = new AudachtaNemesosHealTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosLifeDrainTile = function() {
  var newTile = new AudachtaNemesosLifeDrainTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosSmiteTile = function() {
  var newTile = new AudachtaNemesosSmiteTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosOpenGateTile = function() {
  var newTile = new AudachtaNemesosOpenGateTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosCrystalBarrierTile = function() {
  var newTile = new AudachtaNemesosCrystalBarrierTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosMirrorWardTile = function() {
  var newTile = new AudachtaNemesosMirrorWardTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosParalyzeTile = function() {
  var newTile = new AudachtaNemesosParalyzeTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosReturnTile = function() {
  var newTile = new AudachtaNemesosReturnTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosShockwaveTile = function() {
  var newTile = new AudachtaNemesosShockwaveTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosSummonAllyTile = function() {
  var newTile = new AudachtaNemesosSummonAllyTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosSwordstrikeTile = function() {
  var newTile = new AudachtaNemesosSwordstrikeTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosEmpowerTile = function() {
  var newTile = new AudachtaNemesosEmpowerTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosExplosionTile = function() {
  var newTile = new AudachtaNemesosExplosionTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosJinxTile = function() {
  var newTile = new AudachtaNemesosJinxTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosNegateMagicTile = function() {
  var newTile = new AudachtaNemesosNegateMagicTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosTremorTile = function() {
  var newTile = new AudachtaNemesosTremorTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosWeatherControlTile = function() {
  var newTile = new AudachtaNemesosWeatherControlTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosCharmTile = function() {
  var newTile = new AudachtaNemesosCharmTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosFearTile = function() {
  var newTile = new AudachtaNemesosFearTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosFireAndIceTile = function() {
  var newTile = new AudachtaNemesosFireAndIceTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosMeteorSwarmTile = function() {
  var newTile = new AudachtaNemesosMeteorSwarmTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosMindBlastTile = function() {
  var newTile = new AudachtaNemesosMindBlastTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosArrowOfGlassTile = function() {
  var newTile = new AudachtaNemesosArrowOfGlassTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosBuildGateTile = function() {
  var newTile = new AudachtaNemesosBuildGateTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosConflagrationTile = function() {
  var newTile = new AudachtaNemesosConflagrationTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosConjureDaemonTile = function() {
  var newTile = new AudachtaNemesosConjureDaemonTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosQuicknessTile = function() {
  var newTile = new AudachtaNemesosQuicknessTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosReincarnateTile = function() {
  var newTile = new AudachtaNemesosReincarnateTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosTimeStopTile = function() {
  var newTile = new AudachtaNemesosTimeStopTile();
  return newTile;
}

tileFactory.prototype.makeNaturalArmorTile = function() {
  var newTile = new NaturalArmorTile();
  return newTile;
}

tileFactory.prototype.makeClothArmorTile = function() {
  var newTile = new ClothArmorTile();
  return newTile;
}

tileFactory.prototype.makeLeatherArmorTile = function() {
  var newTile = new LeatherArmorTile();
  return newTile;
}

tileFactory.prototype.makeChainArmorTile = function() {
  var newTile = new ChainArmorTile();
  return newTile;
}

tileFactory.prototype.makePlateArmorTile = function() {
  var newTile = new PlateArmorTile();
  return newTile;
}

tileFactory.prototype.makeExoticArmorTile = function() {
  var newTile = new ExoticArmorTile();
  return newTile;
}

tileFactory.prototype.makeFistsTile = function() {
  var newTile = new FistsTile();
  return newTile;
}

tileFactory.prototype.makeDaggerTile = function() {
  var newTile = new DaggerTile();
  return newTile;
}

tileFactory.prototype.makeShortswordTile = function() {
  var newTile = new ShortswordTile();
  return newTile;
}

tileFactory.prototype.makeMaceTile = function() {
  var newTile = new MaceTile();
  return newTile;
}

tileFactory.prototype.makeAxeTile = function() {
  var newTile = new AxeTile();
  return newTile;
}

tileFactory.prototype.makeLongswordTile = function() {
  var newTile = new LongswordTile();
  return newTile;
}

tileFactory.prototype.makeHalberdTile = function() {
  var newTile = new HalberdTile();
  return newTile;
}

tileFactory.prototype.makeMagicSwordTile = function() {
  var newTile = new MagicSwordTile();
  return newTile;
}

tileFactory.prototype.makeUnenchantedSwordTile = function() {
  var newTile = new UnenchantedSwordTile();
  return newTile;
}

tileFactory.prototype.makeNaturalWeaponTile = function() {
  var newTile = new NaturalWeaponTile();
  return newTile;
}

tileFactory.prototype.makeSlingTile = function() {
  var newTile = new SlingTile();
  return newTile;
}

tileFactory.prototype.makeBowTile = function() {
  var newTile = new BowTile();
  return newTile;
}

tileFactory.prototype.makeCrossbowTile = function() {
  var newTile = new CrossbowTile();
  return newTile;
}

tileFactory.prototype.makeWandTile = function() {
  var newTile = new WandTile();
  return newTile;
}

tileFactory.prototype.makeMagicAxeTile = function() {
  var newTile = new MagicAxeTile();
  return newTile;
}

tileFactory.prototype.makeNaturalMissileWeaponTile = function() {
  var newTile = new NaturalMissileWeaponTile();
  return newTile;
}

tileFactory.prototype.makeBoulderWeaponTile = function() {
  var newTile = new BoulderWeaponTile();
  return newTile;
}

tileFactory.prototype.makeDruidVillagerNPCTile = function() {
  var newTile = new DruidVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeShepherdVillagerNPCTile = function() {
  var newTile = new ShepherdVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeMageVillagerNPCTile = function() {
  var newTile = new MageVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeTinkerVillagerNPCTile = function() {
  var newTile = new TinkerVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeRangerVillagerNPCTile = function() {
  var newTile = new RangerVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeAdventurerVillagerNPCTile = function() {
  var newTile = new AdventurerVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makePaladinVillagerNPCTile = function() {
  var newTile = new PaladinVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeFighterVillagerNPCTile = function() {
  var newTile = new FighterVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeTownsfolkVillagerNPCTile = function() {
  var newTile = new TownsfolkVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeBardVillagerNPCTile = function() {
  var newTile = new BardVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeChildVillagerNPCTile = function() {
  var newTile = new ChildVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeBeggarVillagerNPCTile = function() {
  var newTile = new BeggarVillagerNPCTile();
  return newTile;
}

tileFactory.prototype.makeJesterNPCTile = function() {
  var newTile = new JesterNPCTile();
  return newTile;
}

tileFactory.prototype.makeTownGuardNPCTile = function() {
  var newTile = new TownGuardNPCTile();
  return newTile;
}

tileFactory.prototype.makeKingNPCTile = function() {
  var newTile = new KingNPCTile();
  return newTile;
}

tileFactory.prototype.makeQueenNPCTile = function() {
  var newTile = new QueenNPCTile();
  return newTile;
}

tileFactory.prototype.makePrinceNPCTile = function() {
  var newTile = new PrinceNPCTile();
  return newTile;
}

tileFactory.prototype.makeHorseNPCTile = function() {
  var newTile = new HorseNPCTile();
  return newTile;
}

tileFactory.prototype.makeCorruptPrinceNPCTile = function() {
  var newTile = new CorruptPrinceNPCTile();
  return newTile;
}

tileFactory.prototype.makeCorruptGuardsNPCTile = function() {
  var newTile = new CorruptGuardsNPCTile();
  return newTile;
}

tileFactory.prototype.makeCourierNPCTile = function() {
  var newTile = new CourierNPCTile();
  return newTile;
}

tileFactory.prototype.makeCourierGuardNPCTile = function() {
  var newTile = new CourierGuardNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantBatNPCTile = function() {
  var newTile = new GiantBatNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantInsectsNPCTile = function() {
  var newTile = new GiantInsectsNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantRatNPCTile = function() {
  var newTile = new GiantRatNPCTile();
  return newTile;
}

tileFactory.prototype.makeHeadlessNPCTile = function() {
  var newTile = new HeadlessNPCTile();
  return newTile;
}

tileFactory.prototype.makeHoodNPCTile = function() {
  var newTile = new HoodNPCTile();
  return newTile;
}

tileFactory.prototype.makeMinstrelNPCTile = function() {
  var newTile = new MinstrelNPCTile();
  return newTile;
}

tileFactory.prototype.makeSlimeNPCTile = function() {
  var newTile = new SlimeNPCTile();
  return newTile;
}

tileFactory.prototype.makeApprenticeNPCTile = function() {
  var newTile = new ApprenticeNPCTile();
  return newTile;
}

tileFactory.prototype.makeFighterNPCTile = function() {
  var newTile = new FighterNPCTile();
  return newTile;
}

tileFactory.prototype.makePythonNPCTile = function() {
  var newTile = new PythonNPCTile();
  return newTile;
}

tileFactory.prototype.makeNixieNPCTile = function() {
  var newTile = new NixieNPCTile();
  return newTile;
}

tileFactory.prototype.makeOrcNPCTile = function() {
  var newTile = new OrcNPCTile();
  return newTile;
}

tileFactory.prototype.makeRogueNPCTile = function() {
  var newTile = new RogueNPCTile();
  return newTile;
}

tileFactory.prototype.makePitRogueNPCTile = function() {
  var newTile = new PitRogueNPCTile();
  return newTile;
}

tileFactory.prototype.makeSkeletonNPCTile = function() {
  var newTile = new SkeletonNPCTile();
  return newTile;
}

tileFactory.prototype.makeAnimatedArmorNPCTile = function() {
  var newTile = new AnimatedArmorNPCTile();
  return newTile;
}

tileFactory.prototype.makeArcherNPCTile = function() {
  var newTile = new ArcherNPCTile();
  return newTile;
}

tileFactory.prototype.makeBardNPCTile = function() {
  var newTile = new BardNPCTile();
  return newTile;
}

tileFactory.prototype.makeDruidNPCTile = function() {
  var newTile = new DruidNPCTile();
  return newTile;
}

tileFactory.prototype.makeFireLizardNPCTile = function() {
  var newTile = new FireLizardNPCTile();
  return newTile;
}

tileFactory.prototype.makeFlukeNPCTile = function() {
  var newTile = new FlukeNPCTile();
  return newTile;
}

tileFactory.prototype.makeGhostNPCTile = function() {
  var newTile = new GhostNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantSpiderNPCTile = function() {
  var newTile = new GiantSpiderNPCTile();
  return newTile;
}

tileFactory.prototype.makeGremlinNPCTile = function() {
  var newTile = new GremlinNPCTile();
  return newTile;
}

tileFactory.prototype.makeHandlerNPCTile = function() {
  var newTile = new HandlerNPCTile();
  return newTile;
}

tileFactory.prototype.makeMimicNPCTile = function() {
  var newTile = new MimicNPCTile();
  return newTile;
}

tileFactory.prototype.makeOrcShamanNPCTile = function() {
  var newTile = new OrcShamanNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantSnakeNPCTile = function() {
  var newTile = new GiantSnakeNPCTile();
  return newTile;
}

tileFactory.prototype.makeSeahorseNPCTile = function() {
  var newTile = new SeahorseNPCTile();
  return newTile;
}

tileFactory.prototype.makeThiefNPCTile = function() {
  var newTile = new ThiefNPCTile();
  return newTile;
}

tileFactory.prototype.makeTrollNPCTile = function() {
  var newTile = new TrollNPCTile();
  return newTile;
}

tileFactory.prototype.makeTwisterNPCTile = function() {
  var newTile = new TwisterNPCTile();
  return newTile;
}

tileFactory.prototype.makeAirElementalNPCTile = function() {
  var newTile = new AirElementalNPCTile();
  return newTile;
}

tileFactory.prototype.makeCyclopsNPCTile = function() {
  var newTile = new CyclopsNPCTile();
  return newTile;
}

tileFactory.prototype.makeDeepNixieNPCTile = function() {
  var newTile = new DeepNixieNPCTile();
  return newTile;
}

tileFactory.prototype.makeDrakeNPCTile = function() {
  var newTile = new DrakeNPCTile();
  return newTile;
}

tileFactory.prototype.makeEarthElementalNPCTile = function() {
  var newTile = new EarthElementalNPCTile();
  return newTile;
}

tileFactory.prototype.makeFireElementalNPCTile = function() {
  var newTile = new FireElementalNPCTile();
  return newTile;
}

tileFactory.prototype.makeLurkerNPCTile = function() {
  var newTile = new LurkerNPCTile();
  return newTile;
}

tileFactory.prototype.makeOrcCaptainNPCTile = function() {
  var newTile = new OrcCaptainNPCTile();
  return newTile;
}

tileFactory.prototype.makePaladinNPCTile = function() {
  var newTile = new PaladinNPCTile();
  return newTile;
}

tileFactory.prototype.makeSeaSerpentNPCTile = function() {
  var newTile = new SeaSerpentNPCTile();
  return newTile;
}

tileFactory.prototype.makeTremendousSpiderNPCTile = function() {
  var newTile = new TremendousSpiderNPCTile();
  return newTile;
}

tileFactory.prototype.makeWaterElementalNPCTile = function() {
  var newTile = new WaterElementalNPCTile();
  return newTile;
}

tileFactory.prototype.makeWizardNPCTile = function() {
  var newTile = new WizardNPCTile();
  return newTile;
}

tileFactory.prototype.makeCorpserNPCTile = function() {
  var newTile = new CorpserNPCTile();
  return newTile;
}

tileFactory.prototype.makeEttinNPCTile = function() {
  var newTile = new EttinNPCTile();
  return newTile;
}

tileFactory.prototype.makeFloorNPCTile = function() {
  var newTile = new FloorNPCTile();
  return newTile;
}

tileFactory.prototype.makeGazerNPCTile = function() {
  var newTile = new GazerNPCTile();
  return newTile;
}

tileFactory.prototype.makeHydraNPCTile = function() {
  var newTile = new HydraNPCTile();
  return newTile;
}

tileFactory.prototype.makeMagmaSpawnNPCTile = function() {
  var newTile = new MagmaSpawnNPCTile();
  return newTile;
}

tileFactory.prototype.makePhantomNPCTile = function() {
  var newTile = new PhantomNPCTile();
  return newTile;
}

tileFactory.prototype.makeRangerNPCTile = function() {
  var newTile = new RangerNPCTile();
  return newTile;
}

tileFactory.prototype.makeWillotheWispNPCTile = function() {
  var newTile = new WillotheWispNPCTile();
  return newTile;
}

tileFactory.prototype.makeDelverNPCTile = function() {
  var newTile = new DelverNPCTile();
  return newTile;
}

tileFactory.prototype.makeArchmageNPCTile = function() {
  var newTile = new ArchmageNPCTile();
  return newTile;
}

tileFactory.prototype.makeBlackDragonNPCTile = function() {
  var newTile = new BlackDragonNPCTile();
  return newTile;
}

tileFactory.prototype.makeDevourerNPCTile = function() {
  var newTile = new DevourerNPCTile();
  return newTile;
}

tileFactory.prototype.makeDragonNPCTile = function() {
  var newTile = new DragonNPCTile();
  return newTile;
}

tileFactory.prototype.makeEttinSorcererNPCTile = function() {
  var newTile = new EttinSorcererNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantNPCTile = function() {
  var newTile = new GiantNPCTile();
  return newTile;
}

tileFactory.prototype.makeKrakenNPCTile = function() {
  var newTile = new KrakenNPCTile();
  return newTile;
}

tileFactory.prototype.makeReaperNPCTile = function() {
  var newTile = new ReaperNPCTile();
  return newTile;
}

tileFactory.prototype.makeSpecterNPCTile = function() {
  var newTile = new SpecterNPCTile();
  return newTile;
}

tileFactory.prototype.makeDaemonNPCTile = function() {
  var newTile = new DaemonNPCTile();
  return newTile;
}

tileFactory.prototype.makeEarthenTyrantNPCTile = function() {
  var newTile = new EarthenTyrantNPCTile();
  return newTile;
}

tileFactory.prototype.makeLicheNPCTile = function() {
  var newTile = new LicheNPCTile();
  return newTile;
}

tileFactory.prototype.makeEyesofSpiteNPCTile = function() {
  var newTile = new EyesofSpiteNPCTile();
  return newTile;
}

tileFactory.prototype.makeReaperLordNPCTile = function() {
  var newTile = new ReaperLordNPCTile();
  return newTile;
}

tileFactory.prototype.makeElderDragonNPCTile = function() {
  var newTile = new ElderDragonNPCTile();
  return newTile;
}

tileFactory.prototype.makeBalronNPCTile = function() {
  var newTile = new BalronNPCTile();
  return newTile;
}

tileFactory.prototype.makeTitanNPCTile = function() {
  var newTile = new TitanNPCTile();
  return newTile;
}

tileFactory.prototype.makeAbyssalKrakenNPCTile = function() {
  var newTile = new AbyssalKrakenNPCTile();
  return newTile;
}

tileFactory.prototype.makeIllusionNPCTile = function() {
  var newTile = new IllusionNPCTile();
  return newTile;
}

tileFactory.prototype.makeInfusedIllusionNPCTile = function() {
  var newTile = new InfusedIllusionNPCTile();
  return newTile;
}

tileFactory.prototype.makeToshinSentinelNPCTile = function() {
  var newTile = new ToshinSentinelNPCTile();
  return newTile;
}

tileFactory.prototype.makeAbyssYouNPCTile = function() {
  var newTile = new AbyssYouNPCTile();
  return newTile;
}

tileFactory.prototype.makeNegatorGnomeNPCTile = function() {
  var newTile = new NegatorGnomeNPCTile();
  return newTile;
}

tileFactory.prototype.makeCrystalBarrierNPCTile = function() {
  var newTile = new CrystalBarrierNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantRatGroupTinyTile = function() {
  var newTile = new GiantRatGroupTinyTile();
  return newTile;
}

tileFactory.prototype.makeGiantRatGroupSmallTile = function() {
  var newTile = new GiantRatGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeGiantRatGroupLargeTile = function() {
  var newTile = new GiantRatGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeOrcGroupTinyTile = function() {
  var newTile = new OrcGroupTinyTile();
  return newTile;
}

tileFactory.prototype.makeOrcGroupSmallTile = function() {
  var newTile = new OrcGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeOrcGroupLargeTile = function() {
  var newTile = new OrcGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeHoodGroupTinyTile = function() {
  var newTile = new HoodGroupTinyTile();
  return newTile;
}

tileFactory.prototype.makeHoodGroupSmallTile = function() {
  var newTile = new HoodGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeHoodGroupLargeTile = function() {
  var newTile = new HoodGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeRogueGroupSmallTile = function() {
  var newTile = new RogueGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makePitRogueGroupSmallTile = function() {
  var newTile = new PitRogueGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeRogueGroupLargeTile = function() {
  var newTile = new RogueGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeThiefGroupSmallTile = function() {
  var newTile = new ThiefGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeThiefGroupLargeTile = function() {
  var newTile = new ThiefGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeLowbiePartyGroupTile = function() {
  var newTile = new LowbiePartyGroupTile();
  return newTile;
}

tileFactory.prototype.makeHeadlessGroupTinyTile = function() {
  var newTile = new HeadlessGroupTinyTile();
  return newTile;
}

tileFactory.prototype.makeHeadlessGroupSmallTile = function() {
  var newTile = new HeadlessGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeHeadlessGroupLargeTile = function() {
  var newTile = new HeadlessGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeSnakesGroupSmallTile = function() {
  var newTile = new SnakesGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeSnakesGroupTile = function() {
  var newTile = new SnakesGroupTile();
  return newTile;
}

tileFactory.prototype.makeMidSnakesGroupTile = function() {
  var newTile = new MidSnakesGroupTile();
  return newTile;
}

tileFactory.prototype.makeDrakesSmallGroupTile = function() {
  var newTile = new DrakesSmallGroupTile();
  return newTile;
}

tileFactory.prototype.makeDrakesLargeGroupTile = function() {
  var newTile = new DrakesLargeGroupTile();
  return newTile;
}

tileFactory.prototype.makeDragonsGroupTile = function() {
  var newTile = new DragonsGroupTile();
  return newTile;
}

tileFactory.prototype.makeMidPartyGroupTile = function() {
  var newTile = new MidPartyGroupTile();
  return newTile;
}

tileFactory.prototype.makeMidHighPartyGroupTile = function() {
  var newTile = new MidHighPartyGroupTile();
  return newTile;
}

tileFactory.prototype.makeHighPartyGroupTile = function() {
  var newTile = new HighPartyGroupTile();
  return newTile;
}

tileFactory.prototype.makeMidHeadlessGroupTile = function() {
  var newTile = new MidHeadlessGroupTile();
  return newTile;
}

tileFactory.prototype.makeHighHeadlessGroupTile = function() {
  var newTile = new HighHeadlessGroupTile();
  return newTile;
}

tileFactory.prototype.makeGiantsGroupTile = function() {
  var newTile = new GiantsGroupTile();
  return newTile;
}

tileFactory.prototype.makeOrcPartyLowGroupTile = function() {
  var newTile = new OrcPartyLowGroupTile();
  return newTile;
}

tileFactory.prototype.makeOrcPartyHighGroupTile = function() {
  var newTile = new OrcPartyHighGroupTile();
  return newTile;
}

tileFactory.prototype.makeNecromancerGroupTile = function() {
  var newTile = new NecromancerGroupTile();
  return newTile;
}

tileFactory.prototype.makeElementalistGroupTile = function() {
  var newTile = new ElementalistGroupTile();
  return newTile;
}

tileFactory.prototype.makeGazersGroupTile = function() {
  var newTile = new GazersGroupTile();
  return newTile;
}

tileFactory.prototype.makeTrollGroupTile = function() {
  var newTile = new TrollGroupTile();
  return newTile;
}

tileFactory.prototype.makeDaemonGroupTile = function() {
  var newTile = new DaemonGroupTile();
  return newTile;
}

tileFactory.prototype.makeSkeletonGroupTile = function() {
  var newTile = new SkeletonGroupTile();
  return newTile;
}

tileFactory.prototype.makeUndeadGroupTile = function() {
  var newTile = new UndeadGroupTile();
  return newTile;
}

tileFactory.prototype.makeFireLizardGroupTile = function() {
  var newTile = new FireLizardGroupTile();
  return newTile;
}

tileFactory.prototype.makeMagmaLizardGroupTile = function() {
  var newTile = new MagmaLizardGroupTile();
  return newTile;
}

tileFactory.prototype.makeInsectsGroupSmallTile = function() {
  var newTile = new InsectsGroupSmallTile();
  return newTile;
}

tileFactory.prototype.makeInsectsGroupLargeTile = function() {
  var newTile = new InsectsGroupLargeTile();
  return newTile;
}

tileFactory.prototype.makeCourierGroupTile = function() {
  var newTile = new CourierGroupTile();
  return newTile;
}

tileFactory.prototype.makeBlessingTile = function() {
  var newTile = new BlessingTile();
  return newTile;
}

tileFactory.prototype.makeBlessingStrTile = function() {
  var newTile = new BlessingStrTile();
  return newTile;
}

tileFactory.prototype.makeBlessingDexTile = function() {
  var newTile = new BlessingDexTile();
  return newTile;
}

tileFactory.prototype.makeBlessingIntTile = function() {
  var newTile = new BlessingIntTile();
  return newTile;
}

tileFactory.prototype.makeCharmTile = function() {
  var newTile = new CharmTile();
  return newTile;
}

tileFactory.prototype.makeConfusedTile = function() {
  var newTile = new ConfusedTile();
  return newTile;
}

tileFactory.prototype.makeCurseTile = function() {
  var newTile = new CurseTile();
  return newTile;
}

tileFactory.prototype.makeDiseaseTile = function() {
  var newTile = new DiseaseTile();
  return newTile;
}

tileFactory.prototype.makeDistractTile = function() {
  var newTile = new DistractTile();
  return newTile;
}

tileFactory.prototype.makeEtherealVisionTile = function() {
  var newTile = new EtherealVisionTile();
  return newTile;
}

tileFactory.prototype.makeFearTile = function() {
  var newTile = new FearTile();
  return newTile;
}

tileFactory.prototype.makeFireArmorTile = function() {
  var newTile = new FireArmorTile();
  return newTile;
}

tileFactory.prototype.makeFlameBladeTile = function() {
  var newTile = new FlameBladeTile();
  return newTile;
}

tileFactory.prototype.makeFrozenTile = function() {
  var newTile = new FrozenTile();
  return newTile;
}

tileFactory.prototype.makeInvulnerableTile = function() {
  var newTile = new InvulnerableTile();
  return newTile;
}

tileFactory.prototype.makeIronFleshTile = function() {
  var newTile = new IronFleshTile();
  return newTile;
}

tileFactory.prototype.makePoisonTile = function() {
  var newTile = new PoisonTile();
  return newTile;
}

tileFactory.prototype.makeLevitateTile = function() {
  var newTile = new LevitateTile();
  return newTile;
}

tileFactory.prototype.makeLightTile = function() {
  var newTile = new LightTile();
  return newTile;
}

tileFactory.prototype.makeMirrorWardTile = function() {
  var newTile = new MirrorWardTile();
  return newTile;
}

tileFactory.prototype.makeNegateMagicTile = function() {
  var newTile = new NegateMagicTile();
  return newTile;
}

tileFactory.prototype.makeParalyzeTile = function() {
  var newTile = new ParalyzeTile();
  return newTile;
}

tileFactory.prototype.makeProtectionTile = function() {
  var newTile = new ProtectionTile();
  return newTile;
}

tileFactory.prototype.makeQuicknessTile = function() {
  var newTile = new QuicknessTile();
  return newTile;
}

tileFactory.prototype.makeSleepTile = function() {
  var newTile = new SleepTile();
  return newTile;
}

tileFactory.prototype.makeSlowTile = function() {
  var newTile = new SlowTile();
  return newTile;
}

tileFactory.prototype.makeStormTile = function() {
  var newTile = new StormTile();
  return newTile;
}

tileFactory.prototype.makeTelepathyTile = function() {
  var newTile = new TelepathyTile();
  return newTile;
}

tileFactory.prototype.makeTimeStopTile = function() {
  var newTile = new TimeStopTile();
  return newTile;
}

tileFactory.prototype.makeVulnerabilityTile = function() {
  var newTile = new VulnerabilityTile();
  return newTile;
}

tileFactory.prototype.makeCourierFleeTile = function() {
  var newTile = new CourierFleeTile();
  return newTile;
}

tileFactory.prototype.makeCourierSurrenderTile = function() {
  var newTile = new CourierSurrenderTile();
  return newTile;
}

tileFactory.prototype.makeEraserTile = function() {
  var newTile = new BlankWhiteTile();
  newTile.name = 'Eraser';
  newTile.type = 'feature';
  return newTile;
}

tileFactory.prototype.makeLockedDoorWindowTile = function() {
  var newTile = this.createTile('DoorWindow');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makeMagicLockedDoorWindowTile = function() {
  var newTile = this.createTile('DoorWindow');
  newTile.lockMe(2);    // Magic Lock
  return newTile;
}

tileFactory.prototype.makeLockedDoorTile = function() {
  var newTile = this.createTile('Door');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makeMagicLockedDoorTile = function() {
  var newTile = this.createTile('Door');
  newTile.lockMe(2);    // Magic Lock
  return newTile;
}

tileFactory.prototype.makeLockedStonePortcullisTile = function() {
  var newTile = this.createTile('StonePortcullis');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makeLockedWallPortcullisTile = function() {
  var newTile = this.createTile('WallPortcullis');
  newTile.lockMe(1);
  return newTile;
}

tileFactory.prototype.makePCTile = function() {
  var newTile = new PCObject();
  return newTile;
}


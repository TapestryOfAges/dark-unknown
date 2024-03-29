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

tileFactory.prototype.makeBlankWhiteTile = function() {
  let newTile = new BlankWhiteTile();
  return newTile;
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

tileFactory.prototype.makeWallTile = function() {
  let newTile = new WallTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallTile = function() {
  let newTile = new RuinsWallTile();
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

tileFactory.prototype.makeWindowTile = function() {
  let newTile = new WindowTile();
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

tileFactory.prototype.makeShadowPlanksNSTile = function() {
  let newTile = new ShadowPlanksNSTile();
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

tileFactory.prototype.makeNorthCoastTile = function() {
  let newTile = new NorthCoastTile();
  return newTile;
}

tileFactory.prototype.makeNorthCoastSandTile = function() {
  let newTile = new NorthCoastSandTile();
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

tileFactory.prototype.makeWestCoastTile = function() {
  let newTile = new WestCoastTile();
  return newTile;
}

tileFactory.prototype.makeWestCoastSandTile = function() {
  let newTile = new WestCoastSandTile();
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

tileFactory.prototype.makeSouthwestCoastTile = function() {
  let newTile = new SouthwestCoastTile();
  return newTile;
}

tileFactory.prototype.makeSouthwestCoastSandTile = function() {
  let newTile = new SouthwestCoastSandTile();
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

tileFactory.prototype.makeSoutheastCoastTile = function() {
  let newTile = new SoutheastCoastTile();
  return newTile;
}

tileFactory.prototype.makeSoutheastCoastSandTile = function() {
  let newTile = new SoutheastCoastSandTile();
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

tileFactory.prototype.makeCobblestoneTile = function() {
  let newTile = new CobblestoneTile();
  return newTile;
}

tileFactory.prototype.makeCobblestoneRoadTile = function() {
  let newTile = new CobblestoneRoadTile();
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

tileFactory.prototype.makeBlackFloorTile = function() {
  let newTile = new BlackFloorTile();
  return newTile;
}

tileFactory.prototype.makePlanksEWTile = function() {
  let newTile = new PlanksEWTile();
  return newTile;
}

tileFactory.prototype.makeShadowPlanksEWTile = function() {
  let newTile = new ShadowPlanksEWTile();
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

tileFactory.prototype.makeRoadTile = function() {
  let newTile = new RoadTile();
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

tileFactory.prototype.makeGroveTile = function() {
  let newTile = new GroveTile();
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

tileFactory.prototype.makeHillsTile = function() {
  let newTile = new HillsTile();
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

tileFactory.prototype.makeShinglesTopTile = function() {
  let newTile = new ShinglesTopTile();
  return newTile;
}

tileFactory.prototype.makeRevealedCaveTile = function() {
  let newTile = new RevealedCaveTile();
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

tileFactory.prototype.makeHexFloorTile = function() {
  let newTile = new HexFloorTile();
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

tileFactory.prototype.makeRedDiamondFloorTile = function() {
  let newTile = new RedDiamondFloorTile();
  return newTile;
}

tileFactory.prototype.makeGreenDiamondFloorTile = function() {
  let newTile = new GreenDiamondFloorTile();
  return newTile;
}

tileFactory.prototype.makeYellowDiamondFloorTile = function() {
  let newTile = new YellowDiamondFloorTile();
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

tileFactory.prototype.makePlaceholderTile = function() {
  let newTile = new PlaceholderTile();
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

tileFactory.prototype.makeWaterRockTile = function() {
  let newTile = new WaterRockTile();
  return newTile;
}

tileFactory.prototype.makeWorldsEndingRaftTile = function() {
  let newTile = new WorldsEndingRaftTile();
  return newTile;
}

tileFactory.prototype.makeWorldsEndingCenterRaftTile = function() {
  let newTile = new WorldsEndingCenterRaftTile();
  return newTile;
}

tileFactory.prototype.makePotentialReceptacleTile = function() {
  let newTile = new PotentialReceptacleTile();
  return newTile;
}

tileFactory.prototype.makeWorldsEndingRaftSwitchTile = function() {
  let newTile = new WorldsEndingRaftSwitchTile();
  return newTile;
}

tileFactory.prototype.makeDungeonTile = function() {
  let newTile = new DungeonTile();
  return newTile;
}

tileFactory.prototype.makeCaveTile = function() {
  let newTile = new CaveTile();
  return newTile;
}

tileFactory.prototype.makeSecretCaveTile = function() {
  let newTile = new SecretCaveTile();
  return newTile;
}

tileFactory.prototype.makeTowneTile = function() {
  let newTile = new TowneTile();
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

tileFactory.prototype.makePileOfRocksTile = function() {
  let newTile = new PileOfRocksTile();
  return newTile;
}

tileFactory.prototype.makePushablePileOfRocksTile = function() {
  let newTile = new PushablePileOfRocksTile();
  return newTile;
}

tileFactory.prototype.makeDoorwayTile = function() {
  let newTile = new DoorwayTile();
  return newTile;
}

tileFactory.prototype.makeDaemonDoorwayTile = function() {
  let newTile = new DaemonDoorwayTile();
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

tileFactory.prototype.makeDoorWindowTile = function() {
  let newTile = new DoorWindowTile();
  return newTile;
}

tileFactory.prototype.makeStonePortcullisTile = function() {
  let newTile = new StonePortcullisTile();
  return newTile;
}

tileFactory.prototype.makeWallPortcullisTile = function() {
  let newTile = new WallPortcullisTile();
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

tileFactory.prototype.makeWEBrazier2Tile = function() {
  let newTile = new WEBrazier2Tile();
  return newTile;
}

tileFactory.prototype.makeWEUnlitBrazier2Tile = function() {
  let newTile = new WEUnlitBrazier2Tile();
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

tileFactory.prototype.makeDustyFireplaceTile = function() {
  let newTile = new DustyFireplaceTile();
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

tileFactory.prototype.makeDoorTile = function() {
  let newTile = new DoorTile();
  return newTile;
}

tileFactory.prototype.makeDaemonDoorTile = function() {
  let newTile = new DaemonDoorTile();
  return newTile;
}

tileFactory.prototype.makeTalkingDoorTile = function() {
  let newTile = new TalkingDoorTile();
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

tileFactory.prototype.makeLooseFloorboardEWTile = function() {
  let newTile = new LooseFloorboardEWTile();
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

tileFactory.prototype.makeEvergreenTile = function() {
  let newTile = new EvergreenTile();
  return newTile;
}

tileFactory.prototype.makeDeadTreeTile = function() {
  let newTile = new DeadTreeTile();
  return newTile;
}

tileFactory.prototype.makeCactusTile = function() {
  let newTile = new CactusTile();
  return newTile;
}

tileFactory.prototype.makeAppleTreeTile = function() {
  let newTile = new AppleTreeTile();
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

tileFactory.prototype.makeSunLensTile = function() {
  let newTile = new SunLensTile();
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

tileFactory.prototype.makeDaemonicMirrorTile = function() {
  let newTile = new DaemonicMirrorTile();
  return newTile;
}

tileFactory.prototype.makeDaemonicReflectionTile = function() {
  let newTile = new DaemonicReflectionTile();
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

tileFactory.prototype.makeShiftingWallTile = function() {
  let newTile = new ShiftingWallTile();
  return newTile;
}

tileFactory.prototype.makeDestructableStoneWallTile = function() {
  let newTile = new DestructableStoneWallTile();
  return newTile;
}

tileFactory.prototype.makeRuinsWallTallLeftMidRightTile = function() {
  let newTile = new RuinsWallTallLeftMidRightTile();
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

tileFactory.prototype.makeWalkOnWE31Tile = function() {
  let newTile = new WalkOnWE31Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnWE32Tile = function() {
  let newTile = new WalkOnWE32Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnWE33Tile = function() {
  let newTile = new WalkOnWE33Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnWE34Tile = function() {
  let newTile = new WalkOnWE34Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnWE35Tile = function() {
  let newTile = new WalkOnWE35Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnWE36Tile = function() {
  let newTile = new WalkOnWE36Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnWE3TeleporterTile = function() {
  let newTile = new WalkOnWE3TeleporterTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnWE37Tile = function() {
  let newTile = new WalkOnWE37Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnWE38Tile = function() {
  let newTile = new WalkOnWE38Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnWE39Tile = function() {
  let newTile = new WalkOnWE39Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnConsolationTile = function() {
  let newTile = new WalkOnConsolationTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnTharockTile = function() {
  let newTile = new WalkOnTharockTile();
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

tileFactory.prototype.makeWalkOnCairns1Tile = function() {
  let newTile = new WalkOnCairns1Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnCairns2Tile = function() {
  let newTile = new WalkOnCairns2Tile();
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

tileFactory.prototype.makeWalkOnCOA2Tile = function() {
  let newTile = new WalkOnCOA2Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnShadowTile = function() {
  let newTile = new WalkOnShadowTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnPaladinInitTile = function() {
  let newTile = new WalkOnPaladinInitTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnPaladinInit2Tile = function() {
  let newTile = new WalkOnPaladinInit2Tile();
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

tileFactory.prototype.makeWalkOnAbyss5Tile = function() {
  let newTile = new WalkOnAbyss5Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssCastleTile = function() {
  let newTile = new WalkOnAbyssCastleTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssCastleSayTile = function() {
  let newTile = new WalkOnAbyssCastleSayTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssCastleSay1Tile = function() {
  let newTile = new WalkOnAbyssCastleSay1Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssCastleSay2Tile = function() {
  let newTile = new WalkOnAbyssCastleSay2Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssCastleSay3Tile = function() {
  let newTile = new WalkOnAbyssCastleSay3Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssCastleSay4Tile = function() {
  let newTile = new WalkOnAbyssCastleSay4Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssCastleSayOnceTile = function() {
  let newTile = new WalkOnAbyssCastleSayOnceTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssCastleSay5Tile = function() {
  let newTile = new WalkOnAbyssCastleSay5Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssCastleSay6Tile = function() {
  let newTile = new WalkOnAbyssCastleSay6Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssCastleSay7Tile = function() {
  let newTile = new WalkOnAbyssCastleSay7Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssCastleSay8Tile = function() {
  let newTile = new WalkOnAbyssCastleSay8Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssGauntletTile = function() {
  let newTile = new WalkOnAbyssGauntletTile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssGauntlet1Tile = function() {
  let newTile = new WalkOnAbyssGauntlet1Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssGauntlet2Tile = function() {
  let newTile = new WalkOnAbyssGauntlet2Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssGauntlet3Tile = function() {
  let newTile = new WalkOnAbyssGauntlet3Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssGauntlet4Tile = function() {
  let newTile = new WalkOnAbyssGauntlet4Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssGauntlet5Tile = function() {
  let newTile = new WalkOnAbyssGauntlet5Tile();
  return newTile;
}

tileFactory.prototype.makeWalkOnAbyssGauntlet6Tile = function() {
  let newTile = new WalkOnAbyssGauntlet6Tile();
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

tileFactory.prototype.makeCrenellationNWTile = function() {
  let newTile = new CrenellationNWTile();
  return newTile;
}

tileFactory.prototype.makeCrenellationNTile = function() {
  let newTile = new CrenellationNTile();
  return newTile;
}

tileFactory.prototype.makeCrenellationNETile = function() {
  let newTile = new CrenellationNETile();
  return newTile;
}

tileFactory.prototype.makeCrenellationWTile = function() {
  let newTile = new CrenellationWTile();
  return newTile;
}

tileFactory.prototype.makeCrenellationETile = function() {
  let newTile = new CrenellationETile();
  return newTile;
}

tileFactory.prototype.makeCrenellationSWTile = function() {
  let newTile = new CrenellationSWTile();
  return newTile;
}

tileFactory.prototype.makeCrenellationSTile = function() {
  let newTile = new CrenellationSTile();
  return newTile;
}

tileFactory.prototype.makeCrenellationSETile = function() {
  let newTile = new CrenellationSETile();
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

tileFactory.prototype.makeSunBeaconTile = function() {
  let newTile = new SunBeaconTile();
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

tileFactory.prototype.makeBloodFountainTile = function() {
  let newTile = new BloodFountainTile();
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

tileFactory.prototype.makeUDTeleporterPlatformTile = function() {
  let newTile = new UDTeleporterPlatformTile();
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

tileFactory.prototype.makeDaemonMoongateTile = function() {
  let newTile = new DaemonMoongateTile();
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

tileFactory.prototype.makeJusticeOrbTile = function() {
  let newTile = new JusticeOrbTile();
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

tileFactory.prototype.makeKineticCrystalTile = function() {
  let newTile = new KineticCrystalTile();
  return newTile;
}

tileFactory.prototype.makeChaliceTile = function() {
  let newTile = new ChaliceTile();
  return newTile;
}

tileFactory.prototype.makeFrozenSunlightTile = function() {
  let newTile = new FrozenSunlightTile();
  return newTile;
}

tileFactory.prototype.makeRippedAudachtaNemesosTile = function() {
  let newTile = new RippedAudachtaNemesosTile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosPage1Tile = function() {
  let newTile = new AudachtaNemesosPage1Tile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosPage2Tile = function() {
  let newTile = new AudachtaNemesosPage2Tile();
  return newTile;
}

tileFactory.prototype.makeAudachtaNemesosPage3Tile = function() {
  let newTile = new AudachtaNemesosPage3Tile();
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

tileFactory.prototype.makeStoneOfSparksTile = function() {
  let newTile = new StoneOfSparksTile();
  return newTile;
}

tileFactory.prototype.makeStoneOfEmbersTile = function() {
  let newTile = new StoneOfEmbersTile();
  return newTile;
}

tileFactory.prototype.makeStoneOfTheBlazeTile = function() {
  let newTile = new StoneOfTheBlazeTile();
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

tileFactory.prototype.makeAlchemyCrateTile = function() {
  let newTile = new AlchemyCrateTile();
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

tileFactory.prototype.makeStolenJewelryTile = function() {
  let newTile = new StolenJewelryTile();
  return newTile;
}

tileFactory.prototype.makeAltarOfAshesTile = function() {
  let newTile = new AltarOfAshesTile();
  return newTile;
}

tileFactory.prototype.makeAltarOfIceTile = function() {
  let newTile = new AltarOfIceTile();
  return newTile;
}

tileFactory.prototype.makeAltarOfBoneTile = function() {
  let newTile = new AltarOfBoneTile();
  return newTile;
}

tileFactory.prototype.makeAltarOfDustTile = function() {
  let newTile = new AltarOfDustTile();
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

tileFactory.prototype.makePaladinKeyTile = function() {
  let newTile = new PaladinKeyTile();
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

tileFactory.prototype.makeAWarningOnDaemonsTile = function() {
  let newTile = new AWarningOnDaemonsTile();
  return newTile;
}

tileFactory.prototype.makeWhatIsMagicTile = function() {
  let newTile = new WhatIsMagicTile();
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

tileFactory.prototype.makeNatassaResearch3Tile = function() {
  let newTile = new NatassaResearch3Tile();
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

tileFactory.prototype.makeRuinsJournalTile = function() {
  let newTile = new RuinsJournalTile();
  return newTile;
}

tileFactory.prototype.makeAdelusLetterTile = function() {
  let newTile = new AdelusLetterTile();
  return newTile;
}

tileFactory.prototype.makeStephaneNoteTile = function() {
  let newTile = new StephaneNoteTile();
  return newTile;
}

tileFactory.prototype.makeRhysLetterTile = function() {
  let newTile = new RhysLetterTile();
  return newTile;
}

tileFactory.prototype.makeSpireScrapTile = function() {
  let newTile = new SpireScrapTile();
  return newTile;
}

tileFactory.prototype.makeLayneJournalTile = function() {
  let newTile = new LayneJournalTile();
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

tileFactory.prototype.makeAudachtaNemesosPermanenceTile = function() {
  let newTile = new AudachtaNemesosPermanenceTile();
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

tileFactory.prototype.makeAbyssFireFieldTile = function() {
  let newTile = new AbyssFireFieldTile();
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

tileFactory.prototype.makeSpellWeaponTile = function() {
  let newTile = new SpellWeaponTile();
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

tileFactory.prototype.makeYewWandTile = function() {
  let newTile = new YewWandTile();
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

tileFactory.prototype.makeRoosterNPCTile = function() {
  let newTile = new RoosterNPCTile();
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

tileFactory.prototype.makeCultistNPCTile = function() {
  let newTile = new CultistNPCTile();
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

tileFactory.prototype.makeDoppelgangerNPCTile = function() {
  let newTile = new DoppelgangerNPCTile();
  return newTile;
}

tileFactory.prototype.makeEarthenTyrantNPCTile = function() {
  let newTile = new EarthenTyrantNPCTile();
  return newTile;
}

tileFactory.prototype.makeJusticeNPCTile = function() {
  let newTile = new JusticeNPCTile();
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

tileFactory.prototype.makeShadowNPCTile = function() {
  let newTile = new ShadowNPCTile();
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

tileFactory.prototype.makeArchdaemonOfAshesNPCTile = function() {
  let newTile = new ArchdaemonOfAshesNPCTile();
  return newTile;
}

tileFactory.prototype.makeArchdaemonOfDustNPCTile = function() {
  let newTile = new ArchdaemonOfDustNPCTile();
  return newTile;
}

tileFactory.prototype.makeArchdaemonOfIceNPCTile = function() {
  let newTile = new ArchdaemonOfIceNPCTile();
  return newTile;
}

tileFactory.prototype.makeArchdaemonOfBoneNPCTile = function() {
  let newTile = new ArchdaemonOfBoneNPCTile();
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

tileFactory.prototype.makeShepherdOfDarkNPCTile = function() {
  let newTile = new ShepherdOfDarkNPCTile();
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

tileFactory.prototype.makeOnyxToHildendainGuardsGroupTile = function() {
  let newTile = new OnyxToHildendainGuardsGroupTile();
  return newTile;
}

tileFactory.prototype.makeNaurglenToPovertyGuardsGroupTile = function() {
  let newTile = new NaurglenToPovertyGuardsGroupTile();
  return newTile;
}

tileFactory.prototype.makeClearLakeGuardsGroupTile = function() {
  let newTile = new ClearLakeGuardsGroupTile();
  return newTile;
}

tileFactory.prototype.makeBeldskaeGuardsGroupTile = function() {
  let newTile = new BeldskaeGuardsGroupTile();
  return newTile;
}

tileFactory.prototype.makeSwainhilGuardsGroupTile = function() {
  let newTile = new SwainhilGuardsGroupTile();
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

tileFactory.prototype.makeElderDragonNPCTile = function() {
  let newTile = new ElderDragonNPCTile();
  return newTile;
}

tileFactory.prototype.makeElderDragonForelimbSegmentTile = function() {
  let newTile = new ElderDragonForelimbSegmentTile();
  return newTile;
}

tileFactory.prototype.makeElderDragonHindlimbSegmentTile = function() {
  let newTile = new ElderDragonHindlimbSegmentTile();
  return newTile;
}

tileFactory.prototype.makeElderDragonTailSegmentTile = function() {
  let newTile = new ElderDragonTailSegmentTile();
  return newTile;
}

tileFactory.prototype.makeTitanNPCTile = function() {
  let newTile = new TitanNPCTile();
  return newTile;
}

tileFactory.prototype.makeTitanHeadSegmentTile = function() {
  let newTile = new TitanHeadSegmentTile();
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

tileFactory.prototype.makeReincarnateTile = function() {
  let newTile = new ReincarnateTile();
  return newTile;
}

tileFactory.prototype.makeRubyLightTile = function() {
  let newTile = new RubyLightTile();
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

tileFactory.prototype.makeJusticeCollapseTile = function() {
  let newTile = new JusticeCollapseTile();
  return newTile;
}

tileFactory.prototype.makeDelayTurnStartTile = function() {
  let newTile = new DelayTurnStartTile();
  return newTile;
}

tileFactory.prototype.makeScouringBeldskaeTile = function() {
  let newTile = new ScouringBeldskaeTile();
  return newTile;
}

tileFactory.prototype.makeRemovePeterTile = function() {
  let newTile = new RemovePeterTile();
  return newTile;
}

tileFactory.prototype.makeEraserTile = function() {
  let newTile = new BlankWhiteTile();
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

tileFactory.prototype.makePCTile = function() {
  let newTile = new PCObject();
  return newTile;
}


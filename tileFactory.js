function tileFactory() {

}

// terrain factories:
tileFactory.prototype.createTile = function(tileName) {


  var thingy = "make"+tileName+"Tile";
  return this[thingy]();
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

tileFactory.prototype.makeMountainTile = function() {
  var newTile = new MountainTile();
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

tileFactory.prototype.makeFountainSWTile = function() {
  var newTile = new FountainSWTile();
  return newTile;
}

tileFactory.prototype.makeFountainSETile = function() {
  var newTile = new FountainSETile();
  return newTile;
}

tileFactory.prototype.makeFountainNWTile = function() {
  var newTile = new FountainNWTile();
  return newTile;
}

tileFactory.prototype.makeFountainNETile = function() {
  var newTile = new FountainNETile();
  return newTile;
}

tileFactory.prototype.makeLetterATile = function() {
  var newTile = new LetterATile();
  return newTile;
}

tileFactory.prototype.makeLetterBTile = function() {
  var newTile = new LetterBTile();
  return newTile;
}

tileFactory.prototype.makeLetterCTile = function() {
  var newTile = new LetterCTile();
  return newTile;
}

tileFactory.prototype.makeLetterDTile = function() {
  var newTile = new LetterDTile();
  return newTile;
}

tileFactory.prototype.makeLetterETile = function() {
  var newTile = new LetterETile();
  return newTile;
}

tileFactory.prototype.makeLetterFTile = function() {
  var newTile = new LetterFTile();
  return newTile;
}

tileFactory.prototype.makeLetterGTile = function() {
  var newTile = new LetterGTile();
  return newTile;
}

tileFactory.prototype.makeLetterHTile = function() {
  var newTile = new LetterHTile();
  return newTile;
}

tileFactory.prototype.makeLetterITile = function() {
  var newTile = new LetterITile();
  return newTile;
}

tileFactory.prototype.makeLetterJTile = function() {
  var newTile = new LetterJTile();
  return newTile;
}

tileFactory.prototype.makeLetterKTile = function() {
  var newTile = new LetterKTile();
  return newTile;
}

tileFactory.prototype.makeLetterLTile = function() {
  var newTile = new LetterLTile();
  return newTile;
}

tileFactory.prototype.makeLetterMTile = function() {
  var newTile = new LetterMTile();
  return newTile;
}

tileFactory.prototype.makeLetterNTile = function() {
  var newTile = new LetterNTile();
  return newTile;
}

tileFactory.prototype.makeLetterOTile = function() {
  var newTile = new LetterOTile();
  return newTile;
}

tileFactory.prototype.makeLetterPTile = function() {
  var newTile = new LetterPTile();
  return newTile;
}

tileFactory.prototype.makeLetterQTile = function() {
  var newTile = new LetterQTile();
  return newTile;
}

tileFactory.prototype.makeLetterRTile = function() {
  var newTile = new LetterRTile();
  return newTile;
}

tileFactory.prototype.makeLetterSTile = function() {
  var newTile = new LetterSTile();
  return newTile;
}

tileFactory.prototype.makeLetterTTile = function() {
  var newTile = new LetterTTile();
  return newTile;
}

tileFactory.prototype.makeLetterUTile = function() {
  var newTile = new LetterUTile();
  return newTile;
}

tileFactory.prototype.makeLetterVTile = function() {
  var newTile = new LetterVTile();
  return newTile;
}

tileFactory.prototype.makeLetterWTile = function() {
  var newTile = new LetterWTile();
  return newTile;
}

tileFactory.prototype.makeLetterXTile = function() {
  var newTile = new LetterXTile();
  return newTile;
}

tileFactory.prototype.makeLetterYTile = function() {
  var newTile = new LetterYTile();
  return newTile;
}

tileFactory.prototype.makeLetterZTile = function() {
  var newTile = new LetterZTile();
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

tileFactory.prototype.makeWallTile = function() {
  var newTile = new WallTile();
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

tileFactory.prototype.makeSouthCoastTile = function() {
  var newTile = new SouthCoastTile();
  return newTile;
}

tileFactory.prototype.makeNorthCoastTile = function() {
  var newTile = new NorthCoastTile();
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

tileFactory.prototype.makeSouthwestCoastTile = function() {
  var newTile = new SouthwestCoastTile();
  return newTile;
}

tileFactory.prototype.makeNorthwestCoastTile = function() {
  var newTile = new NorthwestCoastTile();
  return newTile;
}

tileFactory.prototype.makeSoutheastCoastTile = function() {
  var newTile = new SoutheastCoastTile();
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

tileFactory.prototype.makePlanksEWTile = function() {
  var newTile = new PlanksEWTile();
  return newTile;
}

tileFactory.prototype.makeGrassTile = function() {
  var newTile = new GrassTile();
  return newTile;
}

tileFactory.prototype.makeDirtTile = function() {
  var newTile = new DirtTile();
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

tileFactory.prototype.makeSwampTile = function() {
  var newTile = new SwampTile();
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

tileFactory.prototype.makeSeeBelowTile = function() {
  var newTile = new SeeBelowTile();
  return newTile;
}

tileFactory.prototype.makeLavaTile = function() {
  var newTile = new LavaTile();
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

tileFactory.prototype.makeCorpseTile = function() {
  var newTile = new CorpseTile();
  return newTile;
}

tileFactory.prototype.makeEnergyFieldTile = function() {
  var newTile = new EnergyFieldTile();
  return newTile;
}

tileFactory.prototype.makeCampfireTile = function() {
  var newTile = new CampfireTile();
  return newTile;
}

tileFactory.prototype.makeAltarTile = function() {
  var newTile = new AltarTile();
  return newTile;
}

tileFactory.prototype.makeDoorTile = function() {
  var newTile = new DoorTile();
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

tileFactory.prototype.makeRubyGemoftheSunTile = function() {
  var newTile = new RubyGemoftheSunTile();
  return newTile;
}

tileFactory.prototype.makeDecorativeArmorTile = function() {
  var newTile = new DecorativeArmorTile();
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

tileFactory.prototype.makeChildNPCTile = function() {
  var newTile = new ChildNPCTile();
  return newTile;
}

tileFactory.prototype.makeBeggerNPCTile = function() {
  var newTile = new BeggerNPCTile();
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

tileFactory.prototype.makePrinceNPCTile = function() {
  var newTile = new PrinceNPCTile();
  return newTile;
}

tileFactory.prototype.makeGiantRatNPCTile = function() {
  var newTile = new GiantRatNPCTile();
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

tileFactory.prototype.makeGiantSnakeNPCTile = function() {
  var newTile = new GiantSnakeNPCTile();
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


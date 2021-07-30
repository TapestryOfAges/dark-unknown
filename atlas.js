
"use strict";

function Atlas() {

  this.key = {
  }

}

Atlas.prototype.keylookup = function(entry) {
  if (this.key[entry]) {  return this.key[entry];  }
  else {alert("Key lookup unsuccessful for " + entry); return 0; }

}

Atlas.prototype.insertkey = function(terrain, keyname) {
  if (this.key[keyname]) { console.log("Duplicate key: " + keyname + ", key for " + terrain); }
  this.key[keyname] = terrain;
  this.key[terrain] = keyname;
}

function PopulateAtlas(atlasref) {
  atlasref.insertkey("Meadow","md");
  atlasref.insertkey("Sand","ss");
  atlasref.insertkey("SandVegetation","sv");
  atlasref.insertkey("Ocean","WW"); 
  atlasref.insertkey("Water","ww");
  atlasref.insertkey("Shallows","uu");
  atlasref.insertkey("StillWater","us");
  atlasref.insertkey("ShadowOcean","sW");
  atlasref.insertkey("ShadowWater","sw");
  atlasref.insertkey("ShadowShallows","su");
  atlasref.insertkey("Mountain",'^^');
  atlasref.insertkey("MountainPass",'^_');
  atlasref.insertkey("NoBlockMountain",'_^');
  atlasref.insertkey("FlameMountain",'F^');
  atlasref.insertkey("Mountain1",'^a');
  atlasref.insertkey("Mountain2",'^b');
  atlasref.insertkey("Mountain1MeadowBase",'^1');
  atlasref.insertkey("Mountain1GrassBase",'^2');
  atlasref.insertkey("Mountain1SandBase",'^3');
  atlasref.insertkey("Mountain1DirtBase",'^4');
  atlasref.insertkey("Mountain1CaveBase",'^5');
  atlasref.insertkey("Mountain2MeadowBase",'^6');
  atlasref.insertkey("Mountain2GrassBase",'^7');
  atlasref.insertkey("Mountain2SandBase",'^8');
  atlasref.insertkey("Mountain2DirtBase",'^9');
  atlasref.insertkey("Mountain2CaveBase",'^0');
  atlasref.insertkey("Mountain1MeadowCrown",'1^');
  atlasref.insertkey("Mountain1GrassCrown",'2^');
  atlasref.insertkey("Mountain1SandCrown",'3^');
  atlasref.insertkey("Mountain1DirtCrown",'4^');
  atlasref.insertkey("Mountain1CaveCrown",'5^');
  atlasref.insertkey("Mountain2MeadowCrown",'6^');
  atlasref.insertkey("Mountain2GrassCrown",'7^');
  atlasref.insertkey("Mountain2SandCrown",'8^');
  atlasref.insertkey("Mountain2DirtCrown",'9^');
  atlasref.insertkey("Mountain2CaveCrown",'0^');
  atlasref.insertkey("Mountain1MeadowBaseCrown",'^c');
  atlasref.insertkey("Mountain1GrassBaseCrown",'^d');
  atlasref.insertkey("Mountain1SandBaseCrown",'^e');
  atlasref.insertkey("Mountain1DirtBaseCrown",'^f');
  atlasref.insertkey("Mountain1CaveBaseCrown",'^g');
  atlasref.insertkey("Mountain2MeadowBaseCrown",'^h');
  atlasref.insertkey("Mountain2GrassBaseCrown",'^i');
  atlasref.insertkey("Mountain2SandBaseCrown",'^j');
  atlasref.insertkey("Mountain2DirtBaseCrown",'^k');
  atlasref.insertkey("Mountain2CaveBaseCrown",'^l');
  atlasref.insertkey("MountainLeftMeadow",'^m');
  atlasref.insertkey("MountainLeftGrass",'^n');
  atlasref.insertkey("MountainLeftSand",'^o');
  atlasref.insertkey("MountainLeftDirt",'^p');
  atlasref.insertkey("MountainLeftCave",'^q');
  atlasref.insertkey("MountainRightMeadow",'^r');
  atlasref.insertkey("MountainRightGrass",'^s');
  atlasref.insertkey("MountainRightSand",'^t');
  atlasref.insertkey("MountainRightDirt",'^u');
  atlasref.insertkey("MountainRightCave",'^v');
  atlasref.insertkey("MountainHalfMeadow1",'^A');
  atlasref.insertkey("MountainHalfGrass1",'^B');
  atlasref.insertkey("MountainHalfSand1",'^C');
  atlasref.insertkey("MountainHalfDirt1",'^D');
  atlasref.insertkey("MountainHalfCave1",'^E');
  atlasref.insertkey("MountainHalfMeadow2",'^F');
  atlasref.insertkey("MountainHalfGrass2",'^G');
  atlasref.insertkey("MountainHalfSand2",'^H');
  atlasref.insertkey("MountainHalfDirt2",'^I');
  atlasref.insertkey("MountainHalfCave2",'^J');
  atlasref.insertkey("MountainHalfMeadow3",'^K');
  atlasref.insertkey("MountainHalfGrass3",'^L');
  atlasref.insertkey("MountainHalfSand3",'^M');
  atlasref.insertkey("MountainHalfDirt3",'^N');
  atlasref.insertkey("MountainHalfCave3",'^O');
  atlasref.insertkey("StoneWall",'%%');
  atlasref.insertkey("Mast",'#*');
  atlasref.insertkey("Pillar",'+o');
  atlasref.insertkey("PurplePillar",'xo');
  atlasref.insertkey("HorizontalCounter",'::');
  atlasref.insertkey("RightCounter",':]');
  atlasref.insertkey("LeftCounter",'[:');
  atlasref.insertkey("CounterBox",'[]');
  atlasref.insertkey("BlankBlack",'BK');
  atlasref.insertkey("Darkness",'DK');
  atlasref.insertkey("Wall",'##');
  atlasref.insertkey("FireplaceWall",'f#');
  atlasref.insertkey("GreyFireplaceWall",'G#');
  atlasref.insertkey("ShinyWall",'s#');
  atlasref.insertkey("OffwhiteWall",'o#');
  atlasref.insertkey("GreyWall",'g#');
  atlasref.insertkey("GreyArrowSlit",'g+');
  atlasref.insertkey("GreyWindow",'gO');
  atlasref.insertkey("RuinsWall",'!#');
  atlasref.insertkey("RuinsWallIvy",'#i');
  atlasref.insertkey("RuinsWallIvy2",'#I');
  atlasref.insertkey("IllusionaryRuinsWall",'i#');
  atlasref.insertkey("RuinsWallMidLeftBottomRight",'~_');
  atlasref.insertkey("RuinsWallBottomLeftMidRight",'_~');
  atlasref.insertkey("RuinsWallTallLeftMidRight",'=~');
  atlasref.insertkey("RuinsWallMidLeftTallRight",'~=');
  atlasref.insertkey("RuinsWallMidLeftMidRight",'~~');
  atlasref.insertkey("ArrowSlit",'#+');
  atlasref.insertkey("Window",'#O');
  atlasref.insertkey("ShadowWindow",'sO');
  atlasref.insertkey("VerticalCounter",'()');
  atlasref.insertkey("BottomCounter",'(_');
  atlasref.insertkey("TopCounter",'(^');
  atlasref.insertkey("PlanksNS",'!!');
  atlasref.insertkey("DarkPlanksNS",'||');
  atlasref.insertkey("RoughPlanksNS",'!|');
  atlasref.insertkey("ShadowPlanksNS",'s!');
  atlasref.insertkey("SouthCoastMeadow",'_m');
  atlasref.insertkey("SouthCoast",'__');
  atlasref.insertkey("SouthCoastSand",'_b');
  atlasref.insertkey("SouthCoastDirt",'_d');
  atlasref.insertkey("SouthCoastCave",'_c');
  atlasref.insertkey("NorthCoastMeadow",'-m');
  atlasref.insertkey("NorthCoast",'--');
  atlasref.insertkey("NorthCoastSand",'-b');
  atlasref.insertkey("NorthCoastDirt",'-d');
  atlasref.insertkey("NorthCoastCave",'-c');
  atlasref.insertkey("EastCoastMeadow",'m|');
  atlasref.insertkey("EastCoast",'.|');
  atlasref.insertkey("EastCoastSand",'b|');
  atlasref.insertkey("EastCoastDirt",'d|');
  atlasref.insertkey("EastCoastCave",'c|');
  atlasref.insertkey("WestCoastMeadow",'|m');
  atlasref.insertkey("WestCoast",'|.');
  atlasref.insertkey("WestCoastSand",'|b');
  atlasref.insertkey("WestCoastDirt",'|d');
  atlasref.insertkey("WestCoastCave",'|c');
  atlasref.insertkey("NortheastCoastMeadow",'m`');
  atlasref.insertkey("NortheastCoast",'.`');
  atlasref.insertkey("NortheastCoastSand",'b`');
  atlasref.insertkey("NortheastCoastDirt",'d`');
  atlasref.insertkey("NortheastCoastCave",'c`');
  atlasref.insertkey("SouthwestCoastMeadow",'`m');
  atlasref.insertkey("SouthwestCoast",'`.');
  atlasref.insertkey("SouthwestCoastSand",'`b');
  atlasref.insertkey("SouthwestCoastDirt",'`d');
  atlasref.insertkey("SouthwestCoastCave",'`c');
  atlasref.insertkey("NorthwestCoastMeadow",'/m');
  atlasref.insertkey("NorthwestCoast",'/.');
  atlasref.insertkey("NorthwestCoastSand",'/b');
  atlasref.insertkey("NorthwestCoastDirt",'/d');
  atlasref.insertkey("NorthwestCoastCave",'/c');
  atlasref.insertkey("SoutheastCoastMeadow",'m/');
  atlasref.insertkey("SoutheastCoast",'./');
  atlasref.insertkey("SoutheastCoastSand",'b/');
  atlasref.insertkey("SoutheastCoastDirt",'d/');
  atlasref.insertkey("SoutheastCoastCave",'c/');
  atlasref.insertkey("ShadowSouthCoast",'s_');
  atlasref.insertkey("ShadowNorthCoast",'s-');
  atlasref.insertkey("ShadowEastCoast",'s|');
  atlasref.insertkey("ShadowWestCoast",'|s');
  atlasref.insertkey("ShadowNortheastCoast",'s`');
  atlasref.insertkey("ShadowSouthwestCoast",'`s',);
  atlasref.insertkey("ShadowNorthwestCoast",'/s');
  atlasref.insertkey("ShadowSoutheastCoast",'s/');
  atlasref.insertkey("Cobblestone",'++');
  atlasref.insertkey("CobblestoneRoad",'+r');
  atlasref.insertkey("PurpleCobblestoneRoad",'*r');
  atlasref.insertkey("PlanksEW",'-=');
  atlasref.insertkey("DarkPlanksEW",'==');
  atlasref.insertkey("RoughPlanksEW",'=-');
  atlasref.insertkey("Grass",'..');
  atlasref.insertkey("GrassRoadEnd",'.r');
  atlasref.insertkey("EastCoastRoadEnd",'.R');
  atlasref.insertkey("ShadowGrass",'sg');
  atlasref.insertkey("Dirt",'.,');
  atlasref.insertkey("DirtScrub",'.*');
  atlasref.insertkey("FallowFarm",'FF');
  atlasref.insertkey("Farm",'gF');
  atlasref.insertkey("FallowFarm2",'Ff');
  atlasref.insertkey("Farm2",'gf');
  atlasref.insertkey("ShadowDirt",'s,');
  atlasref.insertkey("Brush",',,');
  atlasref.insertkey("Underbrush",'u,');
  atlasref.insertkey("ShadowBrush",',s');
  atlasref.insertkey("BrushECoast",',|');
  atlasref.insertkey("BrushWCoast",'|,');
  atlasref.insertkey("BrushSCoast",'_,');
  atlasref.insertkey("BrushNCoast",'-,');
  atlasref.insertkey("EvergreenForest",'e;');
  atlasref.insertkey("Forest",';;');
  atlasref.insertkey("Forest2",',;');
  atlasref.insertkey("BrightForest",'b;');
  atlasref.insertkey("BrightForest2",'B;');
  atlasref.insertkey("DeadForest",'d;');
  atlasref.insertkey("EvergreenForestEdge",'e1');
  atlasref.insertkey("EvergreenForestEdge2",'e2');
  atlasref.insertkey("EvergreenForestEdge3",'e3');
  atlasref.insertkey("ForestTilingNW",';4');
  atlasref.insertkey("ForestTilingNE",';5');
  atlasref.insertkey("Forest3",';3');
  atlasref.insertkey("ForestTilingE",';6');
  atlasref.insertkey("ForestTilingW",';7');
  atlasref.insertkey("ForestTilingSE",';8');
  atlasref.insertkey("ForestTilingSW",';9');
  atlasref.insertkey("BrightForestEdge",'b1');
  atlasref.insertkey("BrightForestEdge2",'b2');
  atlasref.insertkey("BrightForestEdge3",'b3');
  atlasref.insertkey("BrightForestEdge4",'b4');
  atlasref.insertkey("BrightForestEdge5",'b5');
  atlasref.insertkey("ForestWCoast",'|;');
  atlasref.insertkey("ForestECoast",';|');
  atlasref.insertkey("ForestSCoast",'_;');
  atlasref.insertkey("ForestNCoast",'-;');
  atlasref.insertkey("EvergreenForestWCoast",'|E');
  atlasref.insertkey("EvergreenForestECoast",'E|');
  atlasref.insertkey("EvergreenForestSCoast",'_E');
  atlasref.insertkey("EvergreenForestNCoast",'-E');
  atlasref.insertkey("BrightForestWCoast",'|B');
  atlasref.insertkey("BrightForestECoast",'B|');
  atlasref.insertkey("BrightForestSCoast",'_B');
  atlasref.insertkey("BrightForestNCoast",'-B');
  atlasref.insertkey("Hills",'nn');
  atlasref.insertkey("Hills1",'n1');
  atlasref.insertkey("Hills2",'n2');
  atlasref.insertkey("PurpleCobblestone",'+*');
  atlasref.insertkey("ShadowPurpleCobblestone",'+S');
  atlasref.insertkey("FancyFloor",'p*');
  atlasref.insertkey("FancyFloor2",'q*');
  atlasref.insertkey("FancyFloor3",'Q*');
  atlasref.insertkey("Swamp",'ff');
  atlasref.insertkey("ShadowSwamp",'sf');
  atlasref.insertkey("River",'RR');
  atlasref.insertkey("Road",'rd');
  atlasref.insertkey("RoadWN",'rw');
  atlasref.insertkey("Shingles",'rf');
  atlasref.insertkey("ShinglesTop",'rc');
  atlasref.insertkey("Shingles2",'rL');
  atlasref.insertkey("SeeBelow",'sb');
  atlasref.insertkey("WorldBelow",'wb');
  atlasref.insertkey("CaveFloor",'cf');
  atlasref.insertkey("CaveWall",'cw');
  atlasref.insertkey("CaveColumn",'cc');
  atlasref.insertkey("LavaTube",'lt');
  atlasref.insertkey("RoughStoneFloor",'hf');
  atlasref.insertkey("LightRoughStoneFloor",'Lf');
  atlasref.insertkey("HexTransparentFloor",'ht');
  atlasref.insertkey("BlueTiles",'bb');
  atlasref.insertkey("GoldOutlineFloor",'go');
  atlasref.insertkey("DiamondFloor",'df');
  atlasref.insertkey("BlueCobblestone",'bd');
  atlasref.insertkey("PurpleDiamondFloor",'pd');
  atlasref.insertkey("RedCobblestone",'r^');
  atlasref.insertkey("BrokenCobblestone",'Bd');
  atlasref.insertkey("BlackCobblestone",'kd');
  atlasref.insertkey("CyanCobblestone",'cd');
  atlasref.insertkey("GreenCobblestone",'Gd');
  atlasref.insertkey("CrackedBlackCobblestone",'Kd');
  atlasref.insertkey("YellowCheckeredFloor",'yd');
  atlasref.insertkey("GreenCheckeredFloor",'gd');
  atlasref.insertkey("Chasm",'ch');
  atlasref.insertkey("WSFloor",'WF');
  atlasref.insertkey("WSWall","Ww");
  atlasref.insertkey("WSWallVine",'WV');
  atlasref.insertkey("WSWallMold",'WM');
  atlasref.insertkey("RiverGrassSourceN","Ra");
  atlasref.insertkey("RiverGrassSourceS","Rd");
  atlasref.insertkey("RiverGrassSourceE","Rg");
  atlasref.insertkey("RiverGrassSourceW","Rj");
  atlasref.insertkey("RiverDirtSourceN","Rb");
  atlasref.insertkey("RiverDirtSourceS","Re");
  atlasref.insertkey("RiverDirtSourceE","Rh");
  atlasref.insertkey("RiverDirtSourceW","Rk");
  atlasref.insertkey("RiverCaveSourceN","Rc");
  atlasref.insertkey("RiverCaveSourceS","Rf");
  atlasref.insertkey("RiverCaveSourceE","Ri");
  atlasref.insertkey("RiverCaveSourceW","Rl");
  atlasref.insertkey("RiverGrassNS","Rm");
  atlasref.insertkey("RiverDirtNS","Rn");
  atlasref.insertkey("RiverCaveNS","Ro");
  atlasref.insertkey("RiverGrassEW_N","Rp");
  atlasref.insertkey("RiverDirtEW_N","Rq");
  atlasref.insertkey("RiverCaveEW_N","Rr");
  atlasref.insertkey("RiverGrassEW_S","Rs");
  atlasref.insertkey("RiverDirtEW_S","Rt");
  atlasref.insertkey("RiverCaveEW_S","Ru");
  atlasref.insertkey("RiverGrassSE","Rv");
  atlasref.insertkey("RiverDirtSE","Rw");
  atlasref.insertkey("RiverCaveSE","Rx");
  atlasref.insertkey("RiverGrassSW","Ry");
  atlasref.insertkey("RiverDirtSW","Rz");
  atlasref.insertkey("RiverCaveSW","R1");
  atlasref.insertkey("RiverGrassNE_S","R2");
  atlasref.insertkey("RiverDirtNE_S","R3");
  atlasref.insertkey("RiverCaveNE_S","R4");
  atlasref.insertkey("RiverGrassEW_SN","R5");
  atlasref.insertkey("RiverDirtEW_SN","R6");
  atlasref.insertkey("RiverCaveEW_SN","R7");
  atlasref.insertkey("RiverGrassEW_NS","R8");
  atlasref.insertkey("RiverDirtEW_NS","R9");
  atlasref.insertkey("RiverCaveEW_NS","R0");
  atlasref.insertkey("RiverGrassNW_S","RA");
  atlasref.insertkey("RiverDirtNW_S","RB");
  atlasref.insertkey("RiverCaveNW_S","RC");
  atlasref.insertkey("RiverGrassNE_N","RD");
  atlasref.insertkey("RiverDirtNE_N","RE");
  atlasref.insertkey("RiverCaveNE_N","RF");
  atlasref.insertkey("RiverGrassNW_N","RG");
  atlasref.insertkey("RiverDirtNW_N","RH");
  atlasref.insertkey("RiverCaveNW_N","RI");
  atlasref.insertkey("RiverGrassMouthN","RJ");
  atlasref.insertkey("RiverDirtMouthN","RK");
  atlasref.insertkey("RiverCaveMouthN","RL");
  atlasref.insertkey("RiverGrassMouthS","RM");
  atlasref.insertkey("RiverDirtMouthS","RN");
  atlasref.insertkey("RiverCaveMouthS","RO");
  atlasref.insertkey("RiverGrassMouthE_N","RP");
  atlasref.insertkey("RiverDirtMouthE_N","RQ");
  atlasref.insertkey("RiverCaveMouthE_N","R/");
  atlasref.insertkey("RiverGrassMouthW_N","RS");
  atlasref.insertkey("RiverDirtMouthW_N","RT");
  atlasref.insertkey("RiverCaveMouthW_N","RU");
  atlasref.insertkey("RiverGrassSEW_S","RV");
  atlasref.insertkey("RiverDirtSEW_S","RW");
  atlasref.insertkey("RiverCaveSEW_S","RX");
  atlasref.insertkey("RiverGrassNSE_N","RY");
  atlasref.insertkey("RiverDirtNSE_N","RZ");
  atlasref.insertkey("RiverCaveNSE_N","R!");
  atlasref.insertkey("RiverGrassNSW_S","R@");
  atlasref.insertkey("RiverDirtNSW_S","R#");
  atlasref.insertkey("RiverCaveNSW_S","R$");
  atlasref.insertkey("RiverGrassMouthW_S","R%");
  atlasref.insertkey("RiverDirtMouthW_S","R^");
  atlasref.insertkey("RiverCaveMouthW_S","R&");
  atlasref.insertkey("RiverGrassMouthE_S","R?");
  atlasref.insertkey("RiverDirtMouthE_S","R>");
  atlasref.insertkey("RiverCaveMouthE_S","R<");
  atlasref.insertkey("RiverGrassNSW_N","R*");
  atlasref.insertkey("RiverDirtNSW_N","R-");
  atlasref.insertkey("RiverCaveNSW_N","R+");
  atlasref.insertkey("RiverGrassNEW_S","R=");
  atlasref.insertkey("RiverDirtNEW_S","R~");
  atlasref.insertkey("RiverCaveNEW_S","R`");
  atlasref.insertkey("RiverGrassSEW_N","R:");
  atlasref.insertkey("RiverDirtSEW_N",'R"');
  atlasref.insertkey("RiverCaveSEW_N","R|");
  atlasref.insertkey("RiverGrassNSE_S","R[");
  atlasref.insertkey("RiverDirtNSE_S","R]");
  atlasref.insertkey("RiverCaveNSE_S","R{");
  atlasref.insertkey("RiverGrassNEW_N","R}");
  atlasref.insertkey("RiverDirtNEW_N","R(");
  atlasref.insertkey("RiverCaveNEW_N","R)");
  atlasref.insertkey("FadedCobblestone","+f");
  atlasref.insertkey("FadedCobblestone2","+F");
  atlasref.insertkey("ClayPavers","+c");
  atlasref.insertkey("FadedWoodNS","f!");
  atlasref.insertkey("FadedWoodEW","f=");
  atlasref.insertkey("FadedDarkWoodNS","F!");
  atlasref.insertkey("BlueTileFloor","+b");
  atlasref.insertkey("BlueMarbleTileFloor","+m");
  atlasref.insertkey("GreenTileFloor","+g");
  atlasref.insertkey("GreenCheckeredTileFloor","+G");
  atlasref.insertkey("StonePaver","+s");
  atlasref.insertkey("StonePaver2","+$");
  atlasref.insertkey("RedTileFloor","+T");
  atlasref.insertkey("DarkBlueTileFloor","+B");
  atlasref.insertkey("BrokenTileFloor","+x");
  atlasref.insertkey("FadedFancyFloor3","+%");
  atlasref.insertkey("FadedFancyFloor","+#");
  atlasref.insertkey("FadedFancyFloor2","+&");
  atlasref.insertkey("GreyTileFloor","+t");
  atlasref.insertkey("CrackedStoneFloor","+X");
}

// Page object- condensed map

function Acre() {

  this.terrain = "";
  this.features = new Collection();
  this.npcs = new Collection();
  this.pcs = new Collection();
  
  this.localLight = {};
  this.localSound = {};
  this.topSound = "";

  this.x;
  this.y;
}

Acre.prototype.getx = function() { return this.x; }
Acre.prototype.gety = function() { return this.y; }

Acre.prototype.addLocalSound = function(snd, sndsrc) {
  this.localSound[sndsrc.getSerial()] = snd;
  this.topSound = sndsrc.getSerial();
  DebugWrite("sound", "Added " + snd + " sound to this acre.<br />");
}

Acre.prototype.removeLocalSound = function(sndsrc) {
  delete this.localSound[sndsrc.getSerial()];
  if (this.topSound === sndsrc.getSerial()) {
    let newsnd = "";
    for (let i=0;i<this.localSound.length;i++) {
      newsnd = i;
    }
    this.topSound = newsnd;
  }
  DebugWrite("sound", "Removed " + sndsrc + " sound from this acre.<br />");
}

Acre.prototype.getLocalSound = function() {
  if (this.topSound) {
    return this.localSound[this.topSound];
  }
  else return "";
}

Acre.prototype.addLocalLight = function(lightsource, lightlevel, map) {
  // lightlevel is always an object, might not have ne,nw,etc, always has center
  this.localLight[lightsource.getSerial()] = lightlevel;
	map.lightsList[lightsource.getSerial()] = lightsource;
	DebugWrite("light", "LIGHT " + lightsource.getSerial() + ": Added to this acre.<br />");
}

Acre.prototype.getLocalLight = function(dir) {
  let lightlevel = 0 ;
  if (dir) {
    for (let i in this.localLight) {
      lightlevel += this.localLight[i][dir];
    }
  } else {
	  for (let i in this.localLight) {
		  lightlevel += this.localLight[i]["center"];
    }
  }
	return lightlevel;
}

Acre.prototype.removeLocalLight = function(source) {
	delete this.localLight[source];
}

Acre.prototype.getBlocksLOS = function(dist) {
	let maxLOS = 0;
	maxLOS = this.terrain.getBlocksLOS(dist);
	let allFeatures = this.features.getAll();
	if (allFeatures[0]) {
		for (let i = 0; i < allFeatures.length; i++ ) {
			let featureLOS = allFeatures[0].getBlocksLOS(dist);
			if (featureLOS > maxLOS) {
				maxLOS = featureLOS;
			}
		}
	}
	return maxLOS;
}

Acre.prototype.getBlocksLOE = function(dist) {
	let maxLOS = 0;
	maxLOS = this.terrain.getBlocksLOE(dist);
	let allFeatures = this.features.getAll();
	if (allFeatures[0]) {
		for (let i = 0; i < allFeatures.length; i++ ) {
			let featureLOS = allFeatures[0].getBlocksLOE(dist);
			if (featureLOS > maxLOS) {
				maxLOS = featureLOS;
			}
		}
	}
	return maxLOS;
}

Acre.prototype.getFeatures = function() {
	return (this.features.getAll());
}

Acre.prototype.getTopFeature = function() {
	return (this.features.getTop());
}

Acre.prototype.getFeatureByName = function(featurename) {
  return (this.features.getByName(featurename));
}

Acre.prototype.getTopVisibleFeature = function() {
	let features = this.features.getAll();
	let ind = features.length;
	if (ind === 0) { return; }
	while (ind > 0) {
		if (features[ind-1].invisible) {
			ind--;
		}
		else {
			return features[ind-1];
		}
	}
	return;
}

Acre.prototype.getNPCs = function() {
	return (this.npcs.getAll());
}

Acre.prototype.getTopNPC = function() {
	return (this.npcs.getTop());
}

Acre.prototype.getTopVisibleNPC = function() {
	let npcs = this.npcs.getAll();
	let ind = npcs.length;
	if (ind === 0) { return; }
	while (ind > 0) {
		if (npcs[ind-1].invisible) {
			ind--;
		}
		else {
			return npcs[ind-1];
		}
	}
	return;
}

Acre.prototype.getPCs = function() {
	return (this.pcs.getAll());
}

Acre.prototype.getTopPC = function() {
	return (this.pcs.getTop());
}

Acre.prototype.getTerrain = function() {
	return this.terrain;
}

Acre.prototype.getTileStack = function() {
  let tilestack = this.getFeatures();
  tilestack.unshift(this.getTerrain());
  let npcs = this.getNPCs();
  for (let i=0;i<npcs.length;i++) {
    tilestack.push(npcs[i]);
  }
  if (this.getTopPC()) { tilestack.push(this.getTopPC()); }

  return tilestack;
}

Acre.prototype.getTop = function(nopc, sortnpctotop, fordisplay) {
  let toptile;
  if (fordisplay) {
    let fea = this.getFeatures();
    for (let i=0;i<fea.length;i++) {
      if (fea[i].alwaystop) {
        return fea[i];
      }
    }
    let npc = this.getNPCs();
    for (let i=0;i<npc.length;i++) {
      if (npc[i].alwaystop) {
        return npc[i];
      }
    }
  }
  if (!sortnpctotop) {
  	if (this.getTopPC() && !nopc) {
    	toptile = this.getTopPC();
    } else if (this.getTopVisibleNPC()) {
    	toptile = this.getTopVisibleNPC();
    } else if (this.getTopVisibleFeature()) {
    	toptile = this.getTopVisibleFeature();
    } else { toptile = this.getTerrain(); }
  } else {
    if (this.getTopVisibleNPC()) {
    	toptile = this.getTopVisibleNPC();
    } else if (this.getTopPC() && !nopc) {
      toptile = this.getTopPC();
    } else if (this.getTopVisibleFeature()) {
    	toptile = this.getTopVisibleFeature();
    } else { toptile = this.getTerrain(); }
  }

	return toptile;
}

Acre.prototype.getBumpIntoResult = function(mover) {
	let terrain = this.getTerrain();
	let retval = terrain.bumpinto(mover);

	if (retval["msg"] !== "") { retval["msg"] = " - " + retval["msg"]; }	
	if (retval["canmove"] === 0) { return retval; }
	
	let features = this.getFeatures();
	if (features[0]) {
		for (let i=0; i<features.length; i++) {
			let retval2 = features[i].bumpinto(mover);
			if (retval2["msg"] !== "") {
				if (retval["msg"] === "") { retval["msg"] = " - " + retval2["msg"]; }
				else { retval["msg"] += "\n" + retval2["msg"]; }
			}
			if (retval2["canmove"] === 0) { 
			  retval["canmove"] = 0;
			  return retval; 
			}
		}
	}
	
	return retval;
}

Acre.prototype.getInitDelay = function(mob) {
	if (mob.getMovetype() & MOVE_FLY) {
		return 1;
	}
	let terrain = this.getTerrain();
	let features = this.getFeatures();
	let initdelay = terrain.getInitDelay();
	if (features[0]) {
		for (let i = 0; i < features.length; i++) {
			initdelay = initdelay * features[i].getInitDelay();
		}
	}
	if (initdelay) { return initdelay; }
	return 1;
}

Acre.prototype.isBridge = function() {
  let fea = this.getFeatures();
  for (let i=0;i<fea.length;i++) {
    if (fea[i].bridge) { return 1; }
  }
  return 0;
}

// if nonpcs is false/missing, this will return false if there is an NPC blocking movement. If it's true, this ignores NPCs.
Acre.prototype.canMoveHere = function(movetype, nonpcs) {
	let terrain = this.getTerrain();
	let totalpassability = terrain.getPassable();
	let retval = {};
	
  let doors = 0;
  if (movetype & MOVE_WALK_DOOR) { 
    movetype -= MOVE_WALK; 
    doors = 1;
  }
  
	let featurepassability = MOVE_FLY + MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  let features = this.getFeatures();
  let bridge = 0;
	if (features[0]) {
	  for (let i=0; i< features.length; i++) {
	    if ((features[i].getName() !== "SecretDoor") && doors && (((features[i].hasOwnProperty("opengraphic")) && (!features[i].locked)) || (features[i].pushable))) {
	      // skip doors and things that can be pushed for this check
	    } else {
        featurepassability = featurepassability & features[i].getPassable();
        if (features[i].bridge) { bridge = 1; }
		  }
		}  
		if (!nonpcs) {
		  let npcs = this.getNPCs();
	    if (npcs[0]) {
	  	  featurepassability = 0;
      }
      let pcs = this.getPCs();
      if (pcs[0]) {
	  	  featurepassability = 0;
      }
    }
    if (bridge) {
	  	if (featurepassability & movetype) {
	  		retval["canmove"] = 1;
  			retval["msg"] = "";
			  return retval;
		  }
	  }
	}
	if (!nonpcs) {
	  let npcs = this.getNPCs();
    if (npcs[0]) {
      featurepassability = 0;
    }
    let pcs = this.getPCs();
    if (pcs[0]) {
	   featurepassability = 0;
    }    
  }

  if (totalpassability & featurepassability & movetype) {
		retval["canmove"] = 1;
		retval["msg"] = "";
		return retval;
	}
	
	retval["canmove"] = 0;
	retval["msg"] = "Blocked!";
	return retval;
}

Acre.prototype.getPathWeight = function(civ) {
  let pathweight = this.getTerrain().getPathWeight(civ);
  let fea = this.getFeatures();
  for (let i=0;i<fea.length;i++) {
    pathweight *= fea[i].getPathWeight(civ);
  }
  return pathweight;
};

Acre.prototype.executeWalkons = function(walker) {
	let terrain = this.getTerrain();
	let response = {msg:""};
	if (typeof terrain.walkon === "function") {
    let resp = terrain.walkon(walker);
    if (resp) {
      response = resp;
    }
	}
	let features = this.getFeatures();
	if (features) {
		for (let i = 0; i < features.length; i++) {
			if (typeof features[i].walkon === "function") {
				let resp = features[i].walkon(walker);
				if (resp.msg) {
          if (response.msg) {
            response.msg += "<br />"; 
          }
				  response.msg += resp.msg;
        }
        if (resp.overridedraw) {
          response.overridedraw = 1;
        }
        if (resp.override) {
          response.override = resp.override;
        }
			}
		}
	}
	return response;
}

Acre.prototype.executeWalkoffs = function(walker) {
	let terrain = this.getTerrain();
	let response = {msg:""};
	if (typeof terrain.walkoff === "function") {
    let resp = terrain.walkoff(walker);
    if (resp) {
      response = resp;
    }
	}
	let features = this.getFeatures();
	if (features) {
		for (let i = 0; i < features.length; i++) {
			if (typeof features[i].walkoff === "function") {
				let resp = features[i].walkoff(walker);
				if (resp.msg) {
          if (response.msg) { response.msg += "<br />"; }
          response.msg += resp.msg;
        }
        if (resp.overridedraw) {
          response.overridedraw = 1;
				}
			}
		}
	}
	return response;
}

Acre.prototype.executeIdles = function(walker) {
	let terrain = this.getTerrain();
	let response = {msg:""};
	if (typeof terrain.idle === "function") {
		let resp = terrain.idle(walker);
		if (resp) { response += resp; }
	}
	let features = this.getFeatures();
	if (features) {
		for (let i = 0; i < features.length; i++) {
			if (typeof features[i].idle === "function") {
				let resp = features[i].idle(walker);
				if (resp.msg) {
				  if (response.msg) { response.msg += "<br />"; }
				  resp.msg += response.msg;
				}
			}
		}
	}
	return response;
}

Acre.prototype.isHostileTo = function(who) {
  if (this.getTerrain().isHostileTo(who)) { return 1; }

  let fea = this.getFeatures();
  if (fea) {
    for (let i=0; i < fea.length; i++) {
      if (fea[i].isHostileTo(who)) { return 1; }
    }
  }

  return 0;
}

Acre.prototype.noWander = function() {
  if (this.getTerrain().nowander) { return 1; }

  let fea = this.getFeatures();
  if (fea) {
    for (let i=0; i < fea.length; i++) {
      if (fea[i].nowander) { return 1; }
    }
  }

  return 0;
}

// Map Object - one per map.

function GameMap() {

  this.data = [];
// Each entry in the array will be an Object with .terrain, .features, and .npcs

  this.enterx = 65;
  this.entery = 70;
  this.name = "";  

  this.features = new Collection();  // list of all features on the map
  this.npcs = new Collection(); // list of all NPCs on the map
  this.pcs = new Collection(); // list of all PCs on the map - usually one, but support exists for parties
// these three will be maintained concurrently with collections on individual tiles/acres

  this.desc = "";
  this.longdesc = "";
  this.music = "";
  this.exitTo = {};
  this.exitTo.mapname = "darkunknown";
  this.exitTo.x = 65;
  this.exitTo.y = 70;
  this.wrap = "None";
  
  this.returnmap = "darkunknown";
  this.returnx = 27;
  this.returny = 43;
  this.returninfused = 0;
  
  this.linkedMaps = [];
  this.seeBelow = "";
  
  this.lightLevel = "bright";
  this.alwaysRemember = 0;
  this.scale = 1;
  this.backgroundimage = '';
  this.underground = 0;
  this.undergroundDesc = "";
  this.noiseSources = {};
  this.savename = '';
  
  this.exitScript = "";
  this.exitTestScript = "";
  this.enterScript = "";
  this.enterTestScript = "";
  this.pathGrid = {};
  this.network = [];
  this.opacity = .6;
  
  this.lightsList = {};
  this.soundList = {};
}
GameMap.prototype = new Object();

GameMap.prototype.getNPCsAndPCs = function() {
  let alltargets = this.npcs.getAll();
  alltargets.push(PC);
  return alltargets;
}

GameMap.prototype.setName = function(name) {
  this.name = name;
  return this.name;
}

GameMap.prototype.getName = function() {
  return this.name;
}

GameMap.prototype.setDesc = function(desc) {
  this.desc = desc;
  return this.desc;
}

GameMap.prototype.getDesc = function() {
  return this.desc;
}

GameMap.prototype.setLongDesc = function(desc) {
  this.longdesc = desc;
  return this.longdesc;
}

GameMap.prototype.getLongDesc = function() {
  return this.longdesc;
}

GameMap.prototype.setOpacity = function(newo) {
  this.opacity = newo;
  return this.opacity;
}

GameMap.prototype.getOpacity = function() {
  return this.opacity;
}

GameMap.prototype.setBackground = function(bgimg) {
  this.backgroundimage = bgimg;
  return this.backgroundimage;
}

GameMap.prototype.getBackground = function() {
  return this.backgroundimage;
}

GameMap.prototype.setUnderground = function(ug) {
  if (parseInt(ug)) {
    this.underground = 1;
  }
  return this.underground;
}

GameMap.prototype.getUnderground = function() {
  return this.underground;
}

GameMap.prototype.setUndergroundDesc = function(desc) {
  this.undergroundDesc = desc;
}

GameMap.prototype.getUndergroundDesc = function() {
  if (this.undergroundDesc) {
    return this.undergroundDesc;
  }
  return "";
}

GameMap.prototype.setSaveName = function(newname) {
  this.savename = newname;
}

GameMap.prototype.getSaveName = function() {
  return this.savename;
}

GameMap.prototype.setScale = function(newscale) {
  if (newscale) { this.scale = parseInt(newscale); }
  return this.scale;
}

GameMap.prototype.getScale = function() {
  return this.scale;
}

GameMap.prototype.setMusic = function(music) {
  this.music = music;
  return this.music;
}

GameMap.prototype.getMusic = function() {
  return this.music;
}

GameMap.prototype.setEnterX = function(x) {
  if (x) { this.enterx = parseInt(x); }
  return this.enterx;
}

GameMap.prototype.getEnterX = function() {
  return this.enterx;
}

GameMap.prototype.setEnterY = function(y) {
  if (y) { this.entery = parseInt(y); }
  return this.entery;
}

GameMap.prototype.getEnterY = function() {
  return this.entery;
}

GameMap.prototype.setExitToMap = function(name) {
  this.exitTo.mapname = name;
  return this.exitTo.mapname;
}

GameMap.prototype.getExitToMap = function() {
  return this.exitTo.mapname;
}

GameMap.prototype.setExitToX = function(x) {
  if (x) { this.exitTo.x = parseInt(x); }
  return this.exitTo.x;
}

GameMap.prototype.getExitToX = function() {
  return this.exitTo.x;
}

GameMap.prototype.setExitToY = function(y) {
  if (y) { this.exitTo.y = parseInt(y); }
  return this.exitTo.y;
}

GameMap.prototype.getExitToY = function() {
  return this.exitTo.y;
}

GameMap.prototype.setWrap = function(wrap) {
  this.wrap = wrap;
  return this.wrap;
}

GameMap.prototype.getWrap = function() {
  return this.wrap;
}

GameMap.prototype.getReturnMap = function() {
  return this.returnmap;
}

GameMap.prototype.getReturnx = function() {
  return this.returnx;
}

GameMap.prototype.getReturny = function() {
  return this.returny;
}

GameMap.prototype.setReturn = function(newmap, rx, ry) {
  this.returnmap = newmap;
  this.returnx = parseInt(rx);
  this.returny = parseInt(ry);
  return this.returnmap;
}

GameMap.prototype.getReturnInfused = function() {
  return parseInt(this.returninfused);
}

GameMap.prototype.setReturnInfused = function(infused) {
  if (parseInt(infused)) {
    this.returninfused = 1;
  } else {
    this.returninfused = 0;
  }
  return this.returninfused;
}

// This should not be used externally
GameMap.prototype.setTile = function(x,y,tile) {
  this.data[y][x] = tile;
  return this.data[y][x];
}

GameMap.prototype.getTile = function(x,y) {  // returns an Acre
  if ((y<0) || (y >= this.getHeight())) {
    if ((this.getWrap() === "Vertical") || (this.getWrap() === "Both")) {
      if (y<0) { y=this.getHeight()+y; }
      else { y=y-this.getHeight(); }
    } else {
      return "OoB";
    }
  }
  if ((x<0) || (x >= this.getWidth())) {
    if ((this.getWrap() === "Horizontal") || (this.getWrap() === "Both")) {
      if (x<0) { x=this.getWidth()+x; }
      else { x=x-this.getWidth(); }
    } else {
      return "OoB";
    }
  }

//  if ((y < 0) || (x < 0)) { return "OoB"; }
//	if (y >= this.data.length) { return "OoB"; }
//	if (x >= this.data[y].length) { return "OoB"; }
  return this.data[y][x];
}

GameMap.prototype.getLinkedMaps = function() {
	return this.linkedMaps;
}

GameMap.prototype.setLinkedMaps = function(maplist) {
	maplist = maplist.replace(" ","");
	this.linkedMaps = maplist.split(",");
}

GameMap.prototype.setLinkedMapsArray = function(maplist) {
	this.linkedMaps = maplist;
}

GameMap.prototype.getAlwaysRemember = function() {
	return this.alwaysRemember;
}

GameMap.prototype.setAlwaysRemember = function(ar) {
  if (ar) { this.alwaysRemember = parseInt(ar); }
}

GameMap.prototype.getSeeBelow = function() {
	return this.seeBelow;
}

GameMap.prototype.setSeeBelow = function(mapname) {
	this.seeBelow = mapname;
}

GameMap.prototype.getLightLevel = function() {
	return this.lightLevel;
}

GameMap.prototype.setLightLevel = function(lightlevel) {
	this.lightLevel = lightlevel;
}

GameMap.prototype.getAmbientLight = function() {
  if (this.getLightLevel() === "bright") { return 1; }
  if (this.getLightLevel() === "cycle") {
    let sunlight = 0;
    if (CheckTimeBetween("6:00","17:59")) {
      sunlight = 1;
    } else if (CheckTimeBetween("18:00","18:59") || CheckTimeBetween("5:00","5:59")) {
      sunlight = .7;
    }
    return sunlight;
  } else {
    return 0;
  }
}

GameMap.prototype.getExitScript = function() {
	return this.exitScript;
}

GameMap.prototype.setExitScript = function(es) {
	this.exitScript = es;
}

GameMap.prototype.getExitTestScript = function() {
	return this.exitTestScript;
}

GameMap.prototype.setExitTestScript = function(es) {
	this.exitTestScript = es;
}

GameMap.prototype.getEnterScript = function() {
	return this.enterScript;
}

GameMap.prototype.setEnterScript = function(es) {
	this.enterScript = es;
}

GameMap.prototype.getEnterTestScript = function() {
	return this.enterTestScript;
}

GameMap.prototype.setEnterTestScript = function(es) {
	this.enterTestScript = es;
}

GameMap.prototype.getPathGrid = function (movetype) {
  return this.pathGrid[movetype];
}

GameMap.prototype.createPathGrid = function() {
  this.pathGrid[MOVE_WALK] = new PF.Grid(this.getWidth(), this.getHeight());
  this.pathGrid[MOVE_SWIM] = new PF.Grid(this.getWidth(), this.getHeight());
  this.pathGrid[MOVE_LEVITATE] = new PF.Grid(this.getWidth(), this.getHeight());
  this.pathGrid[MOVE_FLY] = new PF.Grid(this.getWidth(), this.getHeight());
  this.pathGrid[MOVE_ETHEREAL] = new PF.Grid(this.getWidth(), this.getHeight());
  this.pathGrid[MOVE_WALK_DOOR] = new PF.Grid(this.getWidth(), this.getHeight());
  for (let i=0; i<this.getWidth(); i++) {
    for (let j=0; j<this.getHeight(); j++) {
      let thisspot = this.getTile(i,j);
      for (let k=1; k<=MOVE_WALK_DOOR; k=k*2) {
        let response = thisspot.canMoveHere(k, 1);
        if (!response["canmove"]) { this.setWalkableAt(i,j,false,k); }
        let pathweight;
        if (k===MOVE_WALK_DOOR) { pathweight = thisspot.getPathWeight("civilized"); }
        else { pathweight = thisspot.getPathWeight(); }
        if (!pathweight) { pathweight = 1; }
        this.setWeightAt(i,j,pathweight,k);
      }
    }
  }
}

GameMap.prototype.getPath = function(fromx,fromy,tox,toy,movetype) {
  if (!movetype) { alert("getPath called with no movetype"); }
  
  let gridbackup = this.getPathGrid(movetype).clone();
  // destination tile must always be walkable.
  gridbackup.setWalkableAt(tox,toy,true);
  
  // so must start tile, for some reason
  gridbackup.setWalkableAt(fromx,fromy,true);
  
  // get path
  let foundpath = finder.findPath(fromx,fromy,tox,toy,gridbackup);
  
  return foundpath;
}

GameMap.prototype.setWalkableAt = function(x,y,canwalk,movetype) {
  this.pathGrid[movetype].setWalkableAt(x,y,canwalk);
}

GameMap.prototype.setWeightAt = function(x,y,cost,movetype) {
  this.pathGrid[movetype].setWeightAt(x,y,cost);
}


// generate the tile from the factory first, then pass it to setTerrain
GameMap.prototype.setTerrain = function(x,y,terrain) {
  // hopefully usually called by click on the map
//  var tile = localFactory.createTile(terrain.name);
  let tile = eidos.getForm(terrain.getName());
  if (tile) {
    if (!this.data[y][x]) {
      this.data[y][x] = new Acre();
    }
    this.data[y][x].terrain = tile;
    return this.data[y][x].terrain;
  }
  return 0;
  
}

GameMap.prototype.getWidth = function() {
	return this.data[0].length;
}

GameMap.prototype.getHeight = function() {
	return this.data.length;
}

GameMap.prototype.resizeMap = function(newx,newy,anchor){
  let oldx = this.getWidth();
  let oldy = this.getHeight();
  DebugWrite("map", oldx + " " + oldy + " to " + newx + " " + newy + ", anchor is " + anchor + "<br><br>");
//  let tile = new Acre();
//  tile.terrain = localFactory.createTile(selectionval.name);

  if ((newx) && (newx != oldx)) {
    for (let i = 1; i <= Math.abs(newx-oldx); i++) {
      for (let j=0;j<this.data.length;j++) {
        if ((anchor === 0) || (anchor === 3) || (anchor === 6)) {
          if (newx > oldx) {  
            let tile = new Acre();
            tile.terrain = localFactory.createTile(selectionval.name);
            this.data[j].push(tile);  
          }
          else if (oldx > newx ) { 
            this.data[j].pop();
          }
        }
        else if ((anchor === 2) || (anchor === 5) || (anchor === 8)) {
          if (newx > oldx) { 
            let tile = new Acre();
            tile.terrain = localFactory.createTile(selectionval.name);
            this.data[j].unshift(tile); 
          }
          else if (oldx > newx) { 
            this.data[j].shift(); 
          }
        }
        else if ((anchor === 1) || (anchor === 4) || (anchor === 7)) {
          if ((newx > oldx) && (i%2 === 1)) { 
            let tile = new Acre();
            tile.terrain = localFactory.createTile(selectionval.name);
            this.data[j].push(tile); 
          }
          else if ((newx > oldx) && (i%2 === 0)) { 
            let tile = new Acre();
            tile.terrain = localFactory.createTile(selectionval.name);
            this.data[j].unshift(tile); 
          }
          else if ((oldx > newx) && (i%2 === 1)) { 
            this.data[j].pop(); 
          }
          else if ((oldx > newx) && (i%2 === 0)) { 
            this.data[j].shift(); 
          }
        }
      }
    }
  }
  if ((newy) && (newy != oldy)) { 
    for (let i = 1; i <= Math.abs(newy-oldy); i++) {
      if (newy > oldy) {
        let placeholder = [];
        for (let j=0; j<this.data[0].length;j++) { 
          let tile = new Acre();
          tile.terrain = localFactory.createTile(selectionval.name);
          placeholder.push(tile); 
        }
        if ((anchor === 0) || (anchor === 1) || (anchor === 2)) {
          this.data.push(placeholder);
        }
        else if ((anchor === 6) || (anchor === 7) || (anchor === 8)) {
          this.data.unshift(placeholder);
        }
        else if ((anchor === 3) || (anchor === 4) || (anchor === 5)) {
          if (i%2 === 0) { 
            this.data.push(placeholder); 
          }
          else if (i%2 === 1) { 
            this.data.unshift(placeholder); 
          }
        }
      }
      else if (oldy > newy) {
        if ((anchor === 0) || (anchor === 1) || (anchor === 2)) {
          this.data.pop();
        }
        else if ((anchor === 6) || (anchor === 7) || (anchor === 8)) {
          this.data.shift(); 
        }
        else if ((anchor === 3) || (anchor === 4) || (anchor === 5)) {
          if (i%2 === 0) { 
            this.data.pop(); 
          }
          else if (i%2 === 1) { 
            this.data.shift(); 
          }
        }
      }
    }
  }
  DebugWrite("map", "Done: " + this.data.length + " " + this.data[0].length + "<br><br>");
  this.setFeaturesCoord();
  this.setNPCsCoord();
  drawMap();
}

GameMap.prototype.setFeaturesCoord = function() {
  for (let i = 0; i<=this.data.length-1; i++) {
  	for (let j = 0; j<=this.data[0].length-1; j++){
  		let featuresarray = this.data[i][j].features.getAll();
  		for (let ind = 0; ind<=featuresarray.length-1; ind++) {
  			featuresarray[ind].x = j;
  			featuresarray[ind].y = i;
  		}
  	}
  }
}

GameMap.prototype.setNPCsCoord = function() {
  for (let i = 0; i<=this.data.length-1; i++) {
  	for (let j = 0; j<=this.data[0].length-1; j++){
  		let npcsarray = this.data[i][j].npcs.getAll();
  		for (let ind = 0; ind<=npcsarray.length-1; ind++) {
  			npcsarray[ind].x = j;
  			npcsarray[ind].y = i;
  		}
  	}
  }
}


GameMap.prototype.placeThing = function(x,y,newthing,timeoverride,noactivate) {
  if (newthing) {
    newthing.setHomeMap(this);
    
    if (newthing.checkType("NPC") && (typeof this.Enter === "function")) {
      this.Enter(newthing,"",0,0,x,y);
    }

    let type = newthing.getTypeForMap() + "s";
    if (!this.data[type]) { this.data[type] = new Collection(); }
  	newthing.setx(x);
  	newthing.sety(y);
    this[type].addTop(newthing);

    if (!this.data[y][x][type]) {
      this.data[y][x][type] = new Collection();
    }
    this.data[y][x][type].addTop(newthing);

 	  if ((typeof newthing.getLight === "function") && (newthing.getLight() !== 0)) {
  	  DebugWrite("light", "<br /><br />LIGHT: Placing new light source: " + newthing.getName() + ", light value: " + newthing.getLight() + ", serial: " + newthing.getSerial());
  	  this.setMapLight(newthing, newthing.getLight(),x,y);
  	}       
  	
  	if (newthing.ambientNoise) {
  	  DebugWrite("sound", "<br /><br />Placing new ambient sound source: " + newthing.getName() + ", sound played: " + newthing.getAmbientNoise() + ", radius: " + newthing.getAmbientRadius() + " serial: " + newthing.getSerial() + "<br />");
  	  this.setNoiseSource(newthing, newthing.getAmbientNoise(), newthing.getAmbientRadius());
  	}
  
    if (!noactivate) {
      newthing.activate(timeoverride);
      if (newthing.hasOwnProperty("startAnimation")) { newthing.startAnimation(); }
    }

	  //update pathfinding
	  if ((type !== "npcs") && (type !== "pcs")) {
      let tile = this.getTile(x,y);
      for (let itr=1; itr<=32; itr=itr*2) {
        let response = tile.canMoveHere(itr, 1);
	      if (response["canmove"]) { this.setWalkableAt(x,y,true,itr); }
        else { this.setWalkableAt(x,y,false,itr); }
        if (itr < 32) {
          this.setWeightAt(x,y,this.getTile(x,y).getPathWeight(),itr);
        } else {
          this.setWeightAt(x,y,this.getTile(x,y).getPathWeight("civilized"),itr);
        }
    	}
    }

  }  
}

GameMap.prototype.moveThing = function(x,y,thing) { // this is called after bump and passable and before walkon
  let oldx = thing.getx(1);
  let oldy = thing.gety(1);
 	if ((typeof thing.getLight === "function") && (thing.getLight() !== 0)) {
    this.removeMapLight(thing.getSerial(),thing.getLight(),thing.getx(),thing.gety());
  }
  if (this.ambientNoise) {
    this.removeNoiseSource(thing,thing.getAmbientRadius());
  }
  let type = thing.getTypeForMap() + "s";
	this.data[thing.gety(1)][thing.getx(1)][type].deleteFrom(thing);
	if (!this.data[y][x][type]) { this.data[y][x][type] = new Collection(); }
  this.data[y][x][type].addTop(thing);
  thing.setx(x);
  thing.sety(y);
 	if ((typeof thing.getLight === "function") && (thing.getLight() !== 0)) {
    this.setMapLight(thing,thing.getLight(),x,y);
  }
  if (thing.ambientNoise) {
    this.setNoiseSource(thing, thing.getAmbientNoise(), thing.getAmbientRadius());
  }
  // update pathfinding
  if ((type !== "npcs") && (type !== "pcs")) {
    let oldtile = this.getTile(oldx,oldy);
    let tile = this.getTile(x,y);
  	for (let i=1; i<=32; i=i*2) {
	    let response = oldtile.canMoveHere(i, 1);
      if (response["canmove"]) { this.setWalkableAt(oldx,oldy,true,i); }
      else { this.setWalkableAt(oldx,oldy,false,i); }
      response = tile.canMoveHere(i, 1);
      if (response["canmove"]) { this.setWalkableAt(x,y,true,i); }
      else { this.setWalkableAt(x,y,false,i); }
    }
  }

  if (thing === PC) { ProcessAmbientNoise(this.getTile(x,y)); }
}

GameMap.prototype.deleteThing = function(thing) {
  let thingmap = thing.getHomeMap();
  if (thingmap !== this) { alert("tried to delete " + thing.getName() + " which is not on this map."); return 0; }
  if (thing === targetCursor.lastTarget) { delete targetCursor.lastTarget; }
  let oldx = thing.getx(1)
  let oldy = thing.gety(1);
  let type = thing.getTypeForMap() + "s";
  if ((typeof thing.getLight === "function") && (Math.abs(thing.getLight()) > 0)) {
    this.removeMapLight(thing.getSerial(),thing.getLight(),thing.getx(),thing.gety());
  }
  if (thing.ambientNoise) {
    this.removeNoiseSource(thing, thing.getAmbientRadius());
  }
	this[type].deleteFrom(thing);
	this.data[thing.gety(1)][thing.getx(1)][type].deleteFrom(thing);
	
	//update pathfinding
	if ((type !== "npcs") && (type !== "pcs")) {
    let tile = this.getTile(oldx,oldy);
	  for (let i=1; i<=32; i=i*2) {
	    let response = tile.canMoveHere(i, 1);
  	  if (response["canmove"]) { this.setWalkableAt(oldx,oldy,true,i); }
	    else { this.setWalkableAt(oldx,oldy,false,i); }
	  }
	}
}


GameMap.prototype.saveMap = function (name) {
  if (name === '') {
    name = prompt("Map Name", this.name);
  }
  if (name === null) {return;}
  let printerwin = window.open('','printarray');
  printerwin.document.writeln('mappages["' + name + '"] = {};<br />');
  let oldname=name;
  name = 'mappages["' + name + '"].terrain';
  printerwin.document.writeln(name + " = [];<br />");
  let maxindex = this.data.length-1;
  for (let i=0;i<=maxindex;i++) {
 	  let saveind = i;
    let n = maxindex.toString().length - saveind.toString().length;
    if (n > 0) {
    	for (let m = 1; m<=n; m++) {
    		printerwin.document.write("&nbsp;");
    	}
    }
    printerwin.document.write(name + "[" + saveind + "] = '");
    for (let j=0;j<=this.data[0].length-1;j++) {
      let savethis = this.data[i][j].terrain.serialize();
      if (j != 0) {
        printerwin.document.write(" ");
      }
      printerwin.document.write(""+savethis);
    }
    printerwin.document.write("';<br />");
  }
  // ADD FEATURES/NPCs
  name = 'mappages["' + oldname + '"].features';
  printerwin.document.write("<br />" + name + " = [];<br />");
  let mapfeatures = this.features.getAll();
  for (let i=0;i<=mapfeatures.length-1;i++) {
    printerwin.document.write(name + "[" + i + "] = {name : '" + mapfeatures[i].getName() + "',");
    printerwin.document.write(" x : " + mapfeatures[i].getx() + ", y : " + mapfeatures[i].gety());
    // overrides
    let baseobj = localFactory.createTile(mapfeatures[i].getName());
    if (baseobj.getDesc() !== mapfeatures[i].getDesc()) {
    	let thedesc = mapfeatures[i].getDesc();
      let replacequote = new RegExp('"', "g");
      thedesc = thedesc.replace(replacequote,'\\"');
      printerwin.document.write(", desc : \"" + thedesc + "\"");
    }
    if (baseobj.getPrefix() !== mapfeatures[i].getPrefix()) {
   	  let theprefix = mapfeatures[i].getPrefix();
      printerwin.document.write(", prefix : \"" + theprefix + "\"");
    }
    if ((baseobj.getLocked != null) && (baseobj.getLocked() !== mapfeatures[i].getLocked())) {
   	  printerwin.document.write(", locked : " + mapfeatures[i].getLocked());
    }
    if (mapfeatures[i].keyname) {
      printerwin.document.write(", keyname : \"" + mapfeatures[i].keyname + "\"");
    }
    if (baseobj.getEnterMap != null) {
      let mapdest = mapfeatures[i].getEnterMap();
      printerwin.document.write(", entermap : '" + mapdest.entermap + "', enterx : " + mapdest.enterx + ", entery : " + mapdest.entery);
    }
    if (baseobj.isContainer) {
      if (mapfeatures[i].getLootgroup()) {
        printerwin.document.write(", lootgroup : '" + mapfeatures[i].getLootgroup() + "'");
      }
      if (mapfeatures[i].getKarmaPenalty()) {
        printerwin.document.write(", karmaPenalty : '" + mapfeatures[i].getKarmaPenalty() + "'");
      }
    }
    if (baseobj.getWalkOnScript() !== mapfeatures[i].getWalkOnScript()) {
    	printerwin.document.write(", walkonscript : '" + mapfeatures[i].getWalkOnScript() + "'");
    }
    if (baseobj.getUseScript() !== mapfeatures[i].getUseScript()) {
   	  printerwin.document.write(", usescript : '" + mapfeatures[i].getUseScript() + "'");
    } 
    if (baseobj.getLootedID() !== mapfeatures[i].getLootedID()) {  
      printerwin.document.write(", lootedid : '" + mapfeatures[i].getLootedID() + "'");
    }
    if (mapfeatures[i].getSearchYield().length) {
      let printyield = "";
      let itsyield = mapfeatures[i].getSearchYield();
      if (itsyield.length) {
        printyield = itsyield[0];
        if (itsyield.length > 1) {
          for (let j=1;j<itsyield.length;j++) {
            printyield += "," + itsyield[j];
          }
        }
      }
    	printerwin.document.write(", searchyield : '" + printyield + "'");
    }   
    printerwin.document.write("};<br />\n");
  }
 
  name = 'mappages["' + oldname + '"].npcs';
  printerwin.document.write("<br />\n");
  printerwin.document.write("<br />\n" + name + " = [];<br />\n");
  let mapnpcs = this.npcs.getAll();
  for (let i=0;i<=mapnpcs.length-1;i++) {
  	printerwin.document.write(name + "[" + i + "] = {name : '" + mapnpcs[i].getName() + "'");
  	printerwin.document.write(", x : " + mapnpcs[i].getx() + ", y : " + mapnpcs[i].gety());
 	  let basenpc = localFactory.createTile(mapnpcs[i].getName());
 	  if (basenpc.getNPCName() !== mapnpcs[i].getNPCName()) {
 		  printerwin.document.write(", NPCName: '" + mapnpcs[i].getNPCName() + "'");
 	  }
 	  if (basenpc.getDesc() !== mapnpcs[i].getDesc()) {
 		  printerwin.document.write(", Desc: '" + mapnpcs[i].getDesc() + "'");
 	  }
   	if (basenpc.getPrefix() !== mapnpcs[i].getPrefix()) {
 	  	printerwin.document.write(", Prefix: '" + mapnpcs[i].getPrefix() + "'");
  	}
  	if (basenpc.getLevel() !== mapnpcs[i].getLevel()) {
 	  	printerwin.document.write(", Level: " + mapnpcs[i].getLevel());
  	}
  	if (basenpc.getAlignment() !== mapnpcs[i].getAlignment()) {
 	  	printerwin.document.write(", Alignment: '" + mapnpcs[i].getAlignment() + "'");
 	  }
 	  if (basenpc.getStr() !== mapnpcs[i].getStr()) {
 		  printerwin.document.write(", str: " + mapnpcs[i].getStr());
 	  }
  	if (basenpc.getDex() !== mapnpcs[i].getDex()) {
  		printerwin.document.write(", dex: " + mapnpcs[i].getDex());
 	  }
  	if (basenpc.getInt() !== mapnpcs[i].getInt()) {
  		printerwin.document.write(", int: " + mapnpcs[i].getInt());
 	  }
  	if (basenpc.getAttitude() !== mapnpcs[i].getAttitude()) {
  		printerwin.document.write(", Attitude: '" + mapnpcs[i].getAttitude() + "'");
  	}
 	  if (basenpc.getPeaceAI() !== mapnpcs[i].getPeaceAI()) {
 		  printerwin.document.write(", PeaceAI: '" + mapnpcs[i].getPeaceAI() + "'");
 	  }
    if (basenpc.getPCThreatAI() !== mapnpcs[i].getPCThreatAI()) {
 		  printerwin.document.write(", PCThreatAI: '" + mapnpcs[i].getPCThreatAI() + "'");
    }
    if (basenpc.getSchedule() !== mapnpcs[i].getSchedule()) {
 		  printerwin.document.write(", Schedule: '" + mapnpcs[i].getSchedule() + "'");
   	} 	
 	  if (basenpc.getConversation() !== mapnpcs[i].getConversation()) {
 		  printerwin.document.write(", Conversation: '" + mapnpcs[i].getConversation() + "'");
 	  } 	
 	  if (basenpc.getConversationFlag() !== mapnpcs[i].getConversationFlag()) {
 		  printerwin.document.write(", ConversationFlag: '" + mapnpcs[i].getConversationFlag() + "'");
   	} 	
 	  if (basenpc.getGender() !== mapnpcs[i].getGender()) {
 		  printerwin.document.write(", Gender: '" + mapnpcs[i].getGender() + "'");
 	  } 	
 	  if (basenpc.getMerch() !== mapnpcs[i].getMerch()) {
 		  printerwin.document.write(", Merch: '" + mapnpcs[i].getMerch() + "'");
 	  } 	
 	  if (basenpc.getLeash() !== mapnpcs[i].getLeash()) {
 		  printerwin.document.write(", Leash: " + mapnpcs[i].getLeash() + "");
 	  } 	
  	if (basenpc.getBarkFreq() !== mapnpcs[i].getBarkFreq()) {
  		printerwin.document.write(", BarkFreq: " + mapnpcs[i].getBarkFreq() + "");
 	  } 	
 	  if (basenpc.getBark() !== mapnpcs[i].getBark()) {
 		  printerwin.document.write(", Bark: '" + mapnpcs[i].getBark() + "'");
  	} 	
  	if (basenpc.getBarkRad() !== mapnpcs[i].getBarkRad()) {
 	  	printerwin.document.write(", BarkRad: " + mapnpcs[i].getBarkRad() + "");
 	  } 	
  	if (basenpc.getNPCBand() !== mapnpcs[i].getNPCBand()) {
  		printerwin.document.write(", NPCBand: '" + mapnpcs[i].getNPCBand() + "'");
 	  } 	
  	if (mapnpcs[i].overrideGraphic) {
  	  printerwin.document.write(", OverrideGraphic: '" + mapnpcs[i].overrideGraphic + "'");
 	  }
    if (mapnpcs[i].skintone) {
  	  printerwin.document.write(", skintone: " + mapnpcs[i].skintone);
 	  }
 	  printerwin.document.write("};<br />\n");
  }
 
  name = 'mappages["' + oldname + '"]';
  printerwin.document.write("<br />\n" + name + ".desc = \"" + this.getDesc() + "\";<br />\n");
  printerwin.document.write(name + ".longdesc = `" + this.getLongDesc() + "`;<br />\n");
  printerwin.document.write(name + ".music = '" + this.getMusic() + "';<br />\n");
  printerwin.document.write(name + ".savename = `" + this.getSaveName() + "`;<br />\n");
  printerwin.document.write(name + ".exitmap = '" + this.getExitToMap() + "';<br />\n");
  printerwin.document.write(name + ".exitx = '" + this.getExitToX() + "';<br />\n");
  printerwin.document.write(name + ".exity = '" + this.getExitToY() + "';<br />\n");
  printerwin.document.write(name + ".wraps = '" + this.getWrap() + "';<br />\n");
  printerwin.document.write(name + ".enterx = '" + this.getEnterX() + "';<br />\n");
  printerwin.document.write(name + ".entery = '" + this.getEnterY() + "';<br />\n");
  printerwin.document.write(name + ".seeBelow = '" + this.getSeeBelow() + "';<br />\n");
  printerwin.document.write(name + ".lightLevel = '" + this.getLightLevel() + "';<br />\n");
  printerwin.document.write(name + ".alwaysRemember = '" + this.getAlwaysRemember() + "';<br />\n");
  printerwin.document.write(name + ".scale = '" + this.getScale() + "';<br />\n");
  printerwin.document.write(name + ".underground = '" + this.getUnderground() + "';<br />\n");
  printerwin.document.write(name + ".undergroundDesc = '" + this.getUndergroundDesc() + "';<br />\n");
  printerwin.document.write(name + ".enterscript = '" + this.getEnterScript() + "';<br />\n");
  printerwin.document.write(name + ".entertestscript = '" + this.getEnterTestScript() + "';<br />\n");
  printerwin.document.write(name + ".exitscript = '" + this.getExitScript() + "';<br />\n");
  printerwin.document.write(name + ".exittestscript = '" + this.getExitTestScript() + "';<br />\n");
  printerwin.document.write(name + ".returnmap = '" + this.getReturnMap() + "';<br />\n");
  printerwin.document.write(name + ".returnx = '" + this.getReturnx() + "';<br />\n");
  printerwin.document.write(name + ".returny = '" + this.getReturny() + "';<br />\n");
  printerwin.document.write(name + ".returninfused = '" + this.getReturnInfused() + "';<br />\n");
  let linkedMapList;
  let linkedMapArray = this.getLinkedMaps();
  if (linkedMapArray.length > 0) {
 	  for (let i=0;i<linkedMapArray.length;i++) {
  	 	if (i === 0) {
  	 		linkedMapList = '"' + linkedMapArray[i] + '"';
 	  	} else {
 	  		linkedMapList = linkedMapList + ',"' + linkedMapArray[i] + '"';
 	 	  }
  	}
  	printerwin.document.write(name + ".linkedMaps = [" + linkedMapList + "];<br />\n");
  } else {
    printerwin.document.write(name + ".linkedMaps = [];<br />\n");
  }
  printerwin.document.write(name + ".editorLabels = '" + JSON.stringify(this.allLabels).replace("'","\\'") + "';<br /><br />\n");
  printerwin.document.close();
}

GameMap.prototype.loadMap = function (name) {
  this.data = [];
  this.features.deleteAll();
  this.npcs.deleteAll();
  let loadfrom = mappages.readPage(name, "terrain");
  let localatlas = new Atlas();
  PopulateAtlas(localatlas);
  for (let i=0;i<=loadfrom.length-1;i++) {
    DebugWrite("map", "<br>Starting line: " +i+ ", length " + loadfrom[i].length + " <br>");
    let tileserials = [];
    tileserials = loadfrom[i].split(" ");
    this.data[i] = [];
    for (let j=0;j<=tileserials.length-1;j++) {
      DebugWrite("map", " " + tileserials[j]);
      let loadedtile = localatlas.key[tileserials[j]];

      let newterrain = eidos.getForm(loadedtile);
      this.setTerrain(j,i,newterrain);
    }
  }
  
  // load map details
  this.setDesc(mappages.readPage(name, "desc"));
  this.setLongDesc(mappages.readPage(name, "longdesc"));
  this.setMusic(mappages.readPage(name, "music"));
  this.setSaveName(mappages.readPage(name, "savename"));
  this.setExitToMap(mappages.readPage(name, "exitmap"));
  this.setExitToX(mappages.readPage(name, "exitx"));
  this.setExitToY(mappages.readPage(name, "exity"));
  this.setWrap(mappages.readPage(name, "wraps"));
  this.setEnterX(mappages.readPage(name, "enterx"));
  this.setEnterY(mappages.readPage(name, "entery"));
  this.setSeeBelow(mappages.readPage(name, "seeBelow"));
  this.setLinkedMapsArray(mappages.readPage(name, "linkedMaps"));
  this.setLightLevel(mappages.readPage(name, "lightLevel"));
  this.setAlwaysRemember(mappages.readPage(name, "alwaysRemember"));
  this.setScale(mappages.readPage(name, "scale"));
  this.setUnderground(mappages.readPage(name, "underground"));
  this.setUndergroundDesc(mappages.readPage(name, "undergroundDesc"));
  this.setSaveName(mappages.readPage(name, "savename"));
  this.setReturn(mappages.readPage(name, "returnmap"), mappages.readPage(name, "returnx"), mappages.readPage(name, "returny"));
  this.setReturnInfused(mappages.readPage(name, "returninfused"));
  if (DU.gameflags.getFlag("editor")) {
    if (mappages.readPage(name, "editorLabels")) {
      this.allLabels = JSON.parse(mappages.readPage(name, "editorLabels"));
    } else {
      this.allLabels = {};
    }
  }
  if (!DU.gameflags.getFlag("editor")) {
    if(mappages.readPage(name, "enterscript")) {
      mappages[name][mappages.readPage(name, "enterscript")](this);
    }
    if(mappages.readPage(name, "entertestscript")){
      mappages[name][mappages.readPage(name, "entertestscript")](this);
    }
    if(mappages.readPage(name, "exitscript")) {
      mappages[name][mappages.readPage(name, "exitscript")](this);
    }
    if(mappages.readPage(name, "exittestscript")) {
      mappages[name][mappages.readPage(name, "exittestscript")](this);
    }
  } else {
    if(mappages.readPage(name, "enterscript")) {
      this.setEnterScript(mappages.readPage(name, "enterscript"));
    }
    if(mappages.readPage(name, "entertestscript")){
      this.setEnterTestScript(mappages.readPage(name, "entertestscript"));
    }
    if(mappages.readPage(name, "exitscript")) {
      this.setExitScript(mappages.readPage(name, "exitscript"));
    }
    if(mappages.readPage(name, "exittestscript")) {
      this.setExitTestScript(mappages.readPage(name, "exittestscript"));
    }
  }
  
  this.setName(name);
  this.createPathGrid();

  let litfeatures = [];

  if (gamestate.getMode() !== "loadgame") {
    let loadfeatures = mappages.readPage(name, "features");
    if (loadfeatures) {
      for (let fi=0;fi<=loadfeatures.length-1;fi++) {
        let newfeature = localFactory.createTile(loadfeatures[fi].name);
        DebugWrite("map", "<br />Loading features: " +newfeature.getName()+ "...<br />");
    	  for (let featurekey in loadfeatures[fi]) {
    		  if (featurekey === "name") { continue; }
      		if (featurekey === "locked") { newfeature.lockMe(loadfeatures[fi]["locked"]); continue; }
      		if (featurekey === "searchyield") { 
      		  let tmpyield = loadfeatures[fi][featurekey].split(",");
            newfeature["searchYield"] = tmpyield;
            newfeature.lootonce = 1;
      		  continue;
      		}
      		newfeature[featurekey] = loadfeatures[fi][featurekey];
      	}
      	if (newfeature.getLootedID()) {
      	  if (DU.gameflags.getFlag("lid_" + newfeature.getLootedID())) {
      	    if (newfeature.lootonce) { newfeature.setLootgroup(""); }
      	    else  { newfeature.setLootgroup("prev_looted"); }
      	  }
      	}
      	if (newfeature.getLootgroup()) {
      	  AddLoot(newfeature);
      	}
        if (typeof newfeature.getLight === "function") {
          let tmpobj = {};
          tmpobj.feature = newfeature;
          tmpobj.x = loadfeatures[fi].x;
          tmpobj.y = loadfeatures[fi].y;
          litfeatures.push(tmpobj);
        } else {
    	    this.placeThing(loadfeatures[fi].x,loadfeatures[fi].y,newfeature);
        }
      }
    }

    for (let i=0; i<litfeatures.length;i++) {
      this.placeThing(litfeatures[i].x,litfeatures[i].y,litfeatures[i].feature);
    }

    let loadnpcs = mappages.readPage(name, "npcs");
    if (loadnpcs)  {
  	  for (let npci=0;npci<=loadnpcs.length-1;npci++) {
        let newnpc = localFactory.createTile(loadnpcs[npci].name);
    		for (let npckey in loadnpcs[npci]) {
  	  		if (npckey === "NPCName") { newnpc.setNPCName(loadnpcs[npci].NPCName); }
  		  	if (npckey === "Desc") { newnpc.setDesc(loadnpcs[npci].Desc); }
  			  if (npckey === "Prefix") { newnpc.setPrefix(loadnpcs[npci].Prefix); }
    			if (npckey === "Level") { newnpc.setLevel(loadnpcs[npci].Level); }
    			if (npckey === "Alignment") { newnpc.setAlignment(loadnpcs[npci].Alignment); }
  	  		if (npckey === "str") { newnpc.setStr(loadnpcs[npci].str); }
  		  	if (npckey === "dex") { newnpc.setDex(loadnpcs[npci].dex); }
  			  if (npckey === "int") { newnpc.setInt(loadnpcs[npci].int); }
    			if (npckey === "Attitude") { newnpc.setAttitude(loadnpcs[npci].Attitude); }
    			if (npckey === "PeaceAI") { newnpc.setPeaceAI(loadnpcs[npci].PeaceAI); }
  	  		if (npckey === "PCThreatAI") { newnpc.setPCThreatAI(loadnpcs[npci].PCThreatAI); }
  			  if (npckey === "Melee") { newnpc.setMeleeAttackAs(loadnpcs[npci].Melee); }
          if (npckey === "Missile") { newnpc.setMissileAttackAs(loadnpcs[npci].Missile); }
    			if (npckey === "Schedule") { newnpc.setSchedule(loadnpcs[npci].Schedule); }
    			if (npckey === "Conversation") { newnpc.setConversation(loadnpcs[npci].Conversation); }
  	  		if (npckey === "ConversationFlag") { newnpc.setConversationFlag(loadnpcs[npci].ConversationFlag); }
  		  	if (npckey === "Gender") { newnpc.setGender(loadnpcs[npci].Gender); }
  			  if (npckey === "Merch") { newnpc.setMerch(loadnpcs[npci].Merch); }
  			  if (npckey === "Leash") { newnpc.setLeash(loadnpcs[npci].Leash); }
  			  if (npckey === "BarkFreq") { newnpc.setBarkFreq(loadnpcs[npci].BarkFreq); }
  			  if (npckey === "Bark") { newnpc.setBark(loadnpcs[npci].Bark); }
  			  if (npckey === "BarkRad") { newnpc.setBarkRad(loadnpcs[npci].BarkRad); }
  			  if (npckey === "NPCBand") { newnpc.setNPCBand(loadnpcs[npci].NPCBand); }
          if (npckey === "OverrideGraphic") { newnpc.overrideGraphic = loadnpcs[npci].OverrideGraphic; }
          if (npckey === "skintone") { newnpc.skintone = loadnpcs[npci].skintone; }
        }
        if ((newnpc.getPeaceAI() === "scheduled") && (!DU.gameflags.getFlag("editor"))) {
          let loc = DU.schedules[newnpc.getSchedule()].getNPCLocationByTime(GetClockTime(), 1, 1, this);
          newnpc._mapName = loc.mapName;
          newnpc._x = loc.x;
          newnpc._y = loc.y;
          newnpc.flags = loc.flags;
          if (this.getName() !== newnpc._mapName) {
            this.placeThing(loadnpcs[npci].x,loadnpcs[npci].y,newnpc);
            DebugWrite("schedules", "Put " + newnpc.getNPCName() + " on wrong map for now.<br />");
          } else {
            // it has been placed on the correct map
            this.placeThing(loc.x,loc.y,newnpc);
            let placedacre = this.getTile(loc.x,loc.y);
            placedacre.executeWalkons(newnpc);  
            delete newnpc._mapName;
            delete newnpc._x;
            delete newnpc._y;
          }
        } else {
          this.placeThing(loadnpcs[npci].x,loadnpcs[npci].y,newnpc);
        }
  	  }
    }
  }
  
  return;
}

GameMap.prototype.setNoiseSource = function(noisesource, noise, radius) {
  this.soundList[noisesource.getSerial()] = noisesource;
  for (let i=noisesource.getx()-Math.ceil(radius);i<=noisesource.getx()+Math.ceil(radius);i++) {
    for (let j=noisesource.gety()-Math.ceil(radius);j<=noisesource.gety()+Math.ceil(radius);j++) {
      let tile = this.getTile(i,j);
      if (tile !== "OoB") {
        if (GetDistance(noisesource.getx(),noisesource.gety(),i,j) <= radius) {
          tile.addLocalSound(noise,noisesource,this);
        }
      }
    }
  }
}

GameMap.prototype.removeNoiseSource = function(noisesource, radius) {
  let serial = noisesource.getSerial();
  for (let i=noisesource.getx()-Math.ceil(radius);i<=noisesource.getx()+Math.ceil(radius);i++) {
    for (let j=noisesource.gety()-Math.ceil(radius);j<=noisesource.gety()+Math.ceil(radius);j++) {
      let tile = this.getTile(i,j);
      if (tile !== "OoB") {
        if (GetDistance(noisesource.getx(),noisesource.gety(),i,j) <= radius) {
          tile.removeLocalSound(noisesource);
        }
      }
    }
  }  
}

GameMap.prototype.setMapLight = function(lightsource,light,x,y) {
  if (this.getLightLevel() === "bright") { return; }
  let serial = lightsource.getSerial();

  DebugWrite("light", "LIGHT: " + lightsource.getHomeMap().getName() + ", " + serial + ", " + light + ", " + x + ", " + y + "<br />");
	for (let i = (x-(Math.ceil(Math.abs(light))+1)); i<=(x+(Math.ceil(Math.abs(light))+1)); i++) {
		for (let j = (y-(Math.ceil(Math.abs(light))+1)); j<=(y+(Math.ceil(Math.abs(light))+1)); j++) {
			if (this.getTile(i,j) === "OoB") { continue; }
      let block = this.getTile(i,j).getBlocksLOS();
      let LOSval;
      let totlight = {};
      DebugWrite("light", "<br />LIGHT " + serial + " (" + x + "," + y + "): Checking shine on x:"+i+",y:"+j+", which blocks " + block + ".<br />");
			if (block > LOS_THRESHOLD) {   
        LOSval = this.getLOS(x,y,i,j,0,1,1);
        if (LOSval.ne > LOS_THRESHOLD) { LOSval.ne = LOS_THRESHOLD; }
        if (LOSval.nw > LOS_THRESHOLD) { LOSval.nw = LOS_THRESHOLD; }
        if (LOSval.se > LOS_THRESHOLD) { LOSval.se = LOS_THRESHOLD; }
        if (LOSval.sw > LOS_THRESHOLD) { LOSval.sw = LOS_THRESHOLD; }
        if (LOSval.center > LOS_THRESHOLD) { LOSval.center = LOS_THRESHOLD; }
        let dist = GetDistance(x,y,i,j);
        DebugWrite("light", "LOSVAL ne: " + LOSval.ne + ", nw: " + LOSval.nw + ", se: " + LOSval.se + ", sw: " + LOSval.sw + ".<br />");
        totlight.ne = LightAmount(light,dist) * ( 1- (LOSval.ne / LOS_THRESHOLD) );
        if ((light >= 0) && (totlight.ne < 0)) { totlight.ne = 0; }
        totlight.nw = LightAmount(light,dist) * ( 1- (LOSval.nw / LOS_THRESHOLD) );
        if ((light >= 0) && (totlight.nw < 0)) { totlight.nw = 0; }
        totlight.se = LightAmount(light,dist) * ( 1- (LOSval.se / LOS_THRESHOLD));
        if ((light >= 0) && (totlight.se < 0)) { totlight.se = 0; }
        totlight.sw = LightAmount(light,dist) * ( 1- (LOSval.sw / LOS_THRESHOLD) );
        if ((light >= 0) && (totlight.sw < 0)) { totlight.sw = 0; }
        totlight.center = LightAmount(light,dist) * ( 1- (LOSval.center / LOS_THRESHOLD) );
        if ((light >= 0) && (totlight.center < 0)) { totlight.center = 0; }
        if ((totlight.ne > 0) || (totlight.nw > 0) || (totlight.se > 0) || (totlight.sw > 0)) {
          this.getTile(i,j).addLocalLight(lightsource,totlight,this);
        }
			} else {
        LOSval = this.getLOS(x,y,i,j,0,0,1);
        DebugWrite("light", "LIGHT " + serial + ": LOSval: " + JSON.stringify(LOSval) + ".<br />");
        if (typeof LOSval === "number") { if (LOSval > LOS_THRESHOLD) { LOSval = LOS_THRESHOLD; } }
        else { alert("SetMapLight actually got an object in the number section."); console.log(LOSval); }
        if (LOSval.ne > LOS_THRESHOLD) { LOSval.ne = LOS_THRESHOLD; }
        if (LOSval.nw > LOS_THRESHOLD) { LOSval.nw = LOS_THRESHOLD; }
        if (LOSval.se > LOS_THRESHOLD) { LOSval.se = LOS_THRESHOLD; }
        if (LOSval.sw > LOS_THRESHOLD) { LOSval.sw = LOS_THRESHOLD; }
        if (LOSval.center > LOS_THRESHOLD) { LOSval.center = LOS_THRESHOLD; }
        let dist = GetDistance(x,y,i,j);
        totlight.center = LightAmount(light,dist) * ( 1- (LOSval / LOS_THRESHOLD) );
        if ((lightsource.checkType("PC")) && (block > LOS_THRESHOLD)) {
          totlight.ne = totlight.center;
          totlight.se = totlight.center;
          totlight.sw = totlight.center;
          totlight.nw = totlight.center;
        }
        if (totlight.center > 0) { 
          this.getTile(i,j).addLocalLight(lightsource,totlight,this);
        }
			}
			if (block > LOS_THRESHOLD) {
			  DebugWrite("light", "LIGHT " + serial + ": LOSval was (center:" + LOSval.center + ", nw:" + LOSval.nw + ", ne:" + LOSval.ne + ", sw:" + LOSval.sw + ", se:" + LOSval.se + "), light values: center=" + totlight.center + ", ne=" + totlight.ne + ", nw=" + totlight.nw + ", se=" + totlight.se + ", sw=" +totlight.sw + ".<br />");
			} else {
			  DebugWrite("light", "LIGHT " + serial + ": LOSval was " + LOSval + ", light values: center=" + totlight.center + ", ne=" + totlight.ne + ", nw=" + totlight.nw + ", se=" + totlight.se + ", sw=" +totlight.sw + ".<br />");
			}
		}
	}
}

function LightAmount(light,dist) {
  let result=0;
  if (light > 0) {
    result = light + 1.5 - dist;
    if (result < 0) { result = 0; }
  } else if (light < 0) {
    result = (-1*light + 1.5 - dist) * -1;
    if (result > 0) { result = 0; }
  } else { 
    alert("Setting light with light===0, shouldn't happen.");
  }
  return result;
}

GameMap.prototype.removeMapLight = function(serial,light,x,y) {
	for (let i = (x-(Math.ceil(Math.abs(light))+1)); i<=(x+(Math.ceil(Math.abs(light))+1)); i++) {
		for (let j = (y-(Math.ceil(Math.abs(light))+1)); j<=(y+(Math.ceil(Math.abs(light))+1)); j++) {
			if (this.getTile(i,j) !== "OoB") { 
			  this.getTile(i,j).removeLocalLight(serial);
			}
		}
	}
}

GameMap.prototype.verifyMap = function() {
  let valid = 1;
  for (let j=0;j<this.getHeight();j++) {
    for (let i=0;i<this.getWidth();i++) {
      let feahash = {};
      let fea = this.getTile(i,j).getFeatures();
      for (let k=0;k<fea.length;k++) {
        if (feahash.hasOwnProperty(fea[k].getName())) { valid = 0; console.log(`Multiple ${fea[k].getName()} at location ${i}x${j}.`); }
      } 
    }
  }
  if (valid) { console.log("Map valid."); } 
  else { console.log("Problems found."); }
}

GameMap.prototype.getLOS = function(x1,y1,x2,y2, useloe, checklight, checkforlight) {
  // checklight = 0, check is for LOS only or light on an object that does not block LOS or the light source is the PC
  // checklight = 1, check is for light on an object that does block LOS
  
  // checkforlight is a universal "is this check on the behalf of light", since the previous variable is insufficient for
  // that and adding this was easier than refactoring
  
	let trueLOS = 100;
	let totalLOS = 0;
	let quartersLOS = {};

 	quartersLOS.nw = 100;
  quartersLOS.ne = 100;
  quartersLOS.sw = 100;
  quartersLOS.se = 100;
  quartersLOS.center = 100;

  if (( (x2-x1) === 0) && ( (y2-y1) === 0)) {
    DebugWrite("light", "&nbsp;Own tile, returning 0.<br />");
    if (checklight) {
      quartersLOS.nw = 0;
      quartersLOS.ne = 0;
      quartersLOS.se = 0;
      quartersLOS.sw = 0;
      quartersLOS.center = 0;
      return quartersLOS;
    }
    return 0;
  } else if (( (x2-x1) === 0) && ( (y2-y1) < 0)) {  // north line
    totalLOS = genLOS(x1,y1,x2,y2,"center","center",this, useloe, checklight);

		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else { return totalLOS; }		   
		}
  } else if (( (x2-x1) > 0) && ( (y2-y1) < 0)) { // NE quadrant
		totalLOS = genLOS(x1,y1,x2,y2,"ne","sw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
		  totalLOS = genLOS(x1,y1,x2,y2,"ne","nw",this, useloe, checklight);
		} else {
		  // look at the sw of the tile above rather than the nw of the dest tile so the dest tile's 
		  // effect on los is calculated. The same is true everywhere else in this function that 
      // I split the totalLOS check in two.
      if (y2 > 0) {  // but first, make sure that tile is still on the map
        totalLOS = genLOS(x1,y1,x2,y2-1,"ne","sw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"ne","nw",this, useloe, checklight);
      }
		}
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"ne","se",this, useloe, checklight);
    } else {
      if (x2<this.getWidth()-1) {
        totalLOS = genLOS(x1,y1,x2+1,y2,"ne","sw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"ne","se",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    
		
		totalLOS = genLOS(x1,y1,x2,y2,"nw","sw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"nw","nw",this, useloe, checklight);
    } else {
      if (y2>0) {
        totalLOS = genLOS(x1,y1,x2,y2-1,"nw","sw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"nw","nw",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"nw","se",this, useloe, checklight);
    } else {
      if (x2<this.getWidth()-1) {
        totalLOS = genLOS(x1,y1,x2+1,y2,"nw","sw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"nw","se",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

		totalLOS = genLOS(x1,y1,x2,y2,"se","sw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"se","nw",this, useloe, checklight);
    } else {
      if (y2 > 0) {
        totalLOS = genLOS(x1,y1,x2,y2-1,"se","sw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"se","nw",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"se","se",this, useloe, checklight);
    } else {
      if (x2 < this.getWidth()-1) {
        totalLOS = genLOS(x1,y1,x2+1,y2,"se","sw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"se","se",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

  } else if (( (x2-x1) > 0) && ( (y2-y1) === 0)) {  // east line
    totalLOS = genLOS(x1,y1,x2,y2,"center","center",this, useloe, checklight);

		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else { return totalLOS; }		   
		}    
  } else if (( (x2-x1) > 0) && ( (y2-y1) > 0)) { // SE quadrant
    if (!checklight) {
		  totalLOS = genLOS(x1,y1,x2,y2,"se","sw",this, useloe, checklight);
		} else {
      if (y2 < this.getHeight()-1) {
        totalLOS = genLOS(x1,y1,x2,y2+1,"se","nw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"se","sw",this, useloe, checklight);
      }
		}
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,"se","nw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"se","ne",this, useloe, checklight);
    } else {
      if (x2 < this.getWidth()-1) {
        totalLOS = genLOS(x1,y1,x2+1,y2,"se","nw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"se","ne",this, useloe, checklight);
      }
    }
		if  (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    
		
		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"sw","sw",this, useloe, checklight);
    } else {
      if (y2 < this.getHeight()-1) {
        totalLOS = genLOS(x1,y1,x2,y2+1,"sw","nw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"sw","sw",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,"sw","nw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"sw","ne",this, useloe, checklight);
    } else {
      if (x2 < this.getWidth()-1) {
        totalLOS = genLOS(x1,y1,x2+1,y2,"sw","nw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"sw","ne",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"ne","sw",this, useloe, checklight);
    } else {
      if (y2 < this.getHeight()-1) {
        totalLOS = genLOS(x1,y1,x2,y2+1,"ne","nw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"ne","sw",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,"ne","nw",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"ne","ne",this, useloe, checklight);
    } else {
      if (x2 < this.getWidth()-1) {
        totalLOS = genLOS(x1,y1,x2+1,y2,"ne","nw",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"ne","ne",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

  } else if (( (x2-x1) === 0) && ( (y2-y1) > 0)) {  // south line
    totalLOS = genLOS(x1,y1,x2,y2,"center","center",this, useloe, checklight);

		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else { return totalLOS; }		   
		}    
  } else if (( (x2-x1) < 0) && ( (y2-y1) > 0)) { // SW quadrant
		totalLOS = genLOS(x1,y1,x2,y2,"sw","ne",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"sw","nw",this, useloe, checklight);
    } else {
      if (x2 > 0) {
        totalLOS = genLOS(x1,y1,x2-1,y2,"sw","ne",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"sw","nw",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"sw","se",this, useloe, checklight);
    } else {
      if (y2 < this.getHeight()-1) {
        totalLOS = genLOS(x1,y1,x2,y2+1,"sw","ne",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"sw","se",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    
		
		totalLOS = genLOS(x1,y1,x2,y2,"nw","ne",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"nw","nw",this, useloe, checklight);
    } else {
      if (x2 > 0) {
        totalLOS = genLOS(x1,y1,x2-1,y2,"nw","ne",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"nw","nw",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"nw","se",this, useloe, checklight);
    } else {
      if (y2 < this.getHeight()-1) {
        totalLOS = genLOS(x1,y1,x2,y2+1,"nw","ne",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"nw","se",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

		totalLOS = genLOS(x1,y1,x2,y2,"se","ne",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"se","nw",this, useloe, checklight);
    } else  {
      if (x2 > 0) {
        totalLOS = genLOS(x1,y1,x2-1,y2,"se","ne",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"se","nw",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.nw) { quartersLOS.nw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"se","se",this, useloe, checklight);
    } else {
      if (y2 < this.getHeight()-1) {
        totalLOS = genLOS(x1,y1,x2,y2+1,"se","ne",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"se","se",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

  } else if (( (x2-x1) < 0) && ( (y2-y1) === 0)) {  // west line
    totalLOS = genLOS(x1,y1,x2,y2,"center","center",this, useloe, checklight);

		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else { return totalLOS; }		   
		}    
  } else if (( (x2-x1) < 0) && ( (y2-y1) < 0)) { // NW quadrant
    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"sw","ne",this, useloe, checklight);
    } else {
      if (y2 > 0) {
        totalLOS = genLOS(x1,y1,x2,y2-1,"sw","se",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"sw","ne",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"sw","sw",this, useloe, checklight);
    } else {
      if (x2 > 0) { 
        totalLOS = genLOS(x1,y1,x2-1,y2,"sw","se",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"sw","sw",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,"sw","se",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    
		
    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"nw","ne",this, useloe, checklight);
    } else {
      if (y2 > 0) {
        totalLOS = genLOS(x1,y1,x2,y2-1,"nw","se",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"nw","ne",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"nw","sw",this, useloe, checklight);
    } else {
      if (x2 > 0) { 
        totalLOS = genLOS(x1,y1,x2-1,y2,"nw","se",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"nw","sw",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,"nw","se",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"ne","ne",this, useloe, checklight);
    } else {
      if (y2 > 0) {
        totalLOS = genLOS(x1,y1,x2,y2-1,"ne","se",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"ne","ne",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.ne) { quartersLOS.ne = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

    if (!checklight) {
      totalLOS = genLOS(x1,y1,x2,y2,"ne","sw",this, useloe, checklight);
    } else {
      if (x2 > 0) {
        totalLOS = genLOS(x1,y1,x2-1,y2,"ne","se",this, useloe, checklight);
      } else {
        totalLOS = genLOS(x1,y1,x2,y2,"ne","sw",this, useloe, checklight);
      }
    }
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.sw) { quartersLOS.sw = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }

		totalLOS = genLOS(x1,y1,x2,y2,"ne","se",this, useloe, checklight);
		if (totalLOS < LOS_THRESHOLD) { 
		  if (checklight) {
		    if (totalLOS < quartersLOS.center) { quartersLOS.center = totalLOS; }
		    if (totalLOS < quartersLOS.se) { quartersLOS.se = totalLOS; }
		  }
		  else if ((!checkforlight) || (totalLOS < .005)) { return totalLOS; }
		}
		if (totalLOS < trueLOS) { trueLOS = totalLOS; }    

  }
  if (checklight) { return quartersLOS; }	
	
  return trueLOS;
}

function genLOS(x1,y1,x2,y2,startsection,endsection,losmap, useloe, allin) {
    let LOSes = losgrid.getLOS(x1,y1,x2,y2,startsection,endsection);
	  let totalLOS = 0;
	  if (LOSes[0]) {
	  	for (let i = 0; i < LOSes.length; i++ ){
	  		let passx = parseInt(x1) + parseInt(LOSes[i].x);
        let passy = parseInt(y1) + parseInt(LOSes[i].y);
	  		let location = losmap.getTile(passx,passy);
	  		let dist = Math.sqrt(Math.pow((passx - x1), 2) + Math.pow((passy - y1),2));
	  		if (useloe) {
	  		  let block = location.getBlocksLOE(dist);
	  		  if (allin && (block >= 1) && ((LOSes[i].coeff * block) > .05) ) { return 1; }
	  		  totalLOS += LOSes[i].coeff * block;
	  		} else {
          let block = location.getBlocksLOS(dist);
	  		  if (allin && (block >= 1) && ((LOSes[i].coeff * block) > .05) ) { return 1; }
          totalLOS += LOSes[i].coeff * block;
	  		}
	  		if (totalLOS > LOS_THRESHOLD) { return totalLOS; }
	  	}
	  } 
	  return totalLOS;	
}

function Pages() {

  this["test"] = {};
  this["test"].terrain = [];
  this["test"].terrain[0] = "WW WW WW WW WW";
  this["test"].terrain[1] = "WW ww ww ww WW";
  this["test"].terrain[2] = "WW ww uu ww WW";
  this["test"].terrain[3] = "WW ww ww ww WW";
  this["test"].terrain[4] = "WW WW WW WW WW";

}

Pages.prototype.readPage = function (name,type) {
  if (this[name][type]) {
    return this[name][type];
  } else {
  	return "";
  }
  
}


function Platonic() {

  this.data = {};

}

Platonic.prototype.getForm = function (name) {

  if (this.data[name]) {
    return this.data[name];
  }
  else {
    DebugWrite("map", "((Adding " + name + " to the platonic forms.))<br />");

    this.data[name] = localFactory.createTile(name);
    return this.data[name];
  }

}

function MapMemory() {
  this.data = {};	
}

MapMemory.prototype.addMap = function(mapname) {
	let newmap = new GameMap();
	newmap.loadMap(mapname);	
	this.addMapByRef(newmap);
	
	return newmap;
}

MapMemory.prototype.addMapByRef = function(mapref) {
	let mapname = mapref.getName();
	this.data[mapname] = mapref;
	
	// also load linked maps
	if (gamestate.getMode() !== "loadgame") {  // but only if not loading- on load they are in the saved game
  	if (mapref.linkedMaps[0] && mapref.linkedMaps[0] !== "") {
	    for (let i = 0; i < mapref.linkedMaps.length; i++) {
	      let anothermap = new GameMap();
	      anothermap.loadMap(mapref.linkedMaps[i]);
  	    this.data[mapref.linkedMaps[i]] = anothermap;
      }
	  }
  }
  
  if(typeof mappages[mapname]["onload"] === "function") {
    mappages[mapname]["onload"](mapref);
  }

  if (gamestate.getMode() !== "loadgame") {  // but only if not loading- on load they get called individually
    if (mapref.linkedMaps[0] && mapref.linkedMaps[0] !== "") {
      for (let i=0;i<mapref.linkedMaps.length;i++) {
        if(typeof mappages[this.data[mapref.linkedMaps[i]].getName()]["onload"] === "function") {
          mappages[this.data[mapref.linkedMaps[i]].getName()]["onload"](this.data[mapref.linkedMaps[i]]);
        }
      }
    }
  }
	
	return mapref;
}

MapMemory.prototype.deleteMap = function(mapname) {
  let negated = DU.gameflags.getFlag("negate");
	if (this.data[mapname].linkedMaps[0] && this.data[mapname].linkedMaps[0] !== "") {
		for (let i = 0; i < this.data[mapname].linkedMaps.length; i++) {
			delete this.data[this.data[mapname].linkedMaps[i]];
			// also stop tracking that magic is negated on this map
			delete negated[this.data[mapname].linkedMaps[i]];   
			DebugWrite("map", "* Deleting map " + this.data[mapname].linkedMaps[i] + ".</span><br />");
		}
	}
	delete this.data[mapname];
	delete negated[mapname];
	DU.gameflags.setFlag("negate", negated);
	if (debug && debugflags.map) {
    DebugWrite("map", "Remaining maps: ");
    for (let idx in this.data) {
	    DebugWrite("map", idx + ", ");
	  }
	  DebugWrite("map", ".</span><br />");
	}
	
}

MapMemory.prototype.getMap = function(mapname) {
	if (this.data[mapname]) { return this.data[mapname]; }
	else { return undefined; }
}

MapMemory.prototype.getAllMaps = function() {
  return this.data;
}
"use strict;" 

var maxserial = 0;

var wind = {};
wind.xoff = 0;
wind.yoff = 2;

var mappages = new Pages();
var localFactory = new tileFactory();
var eidos = new Platonic();

var DU = {};  // attach all saveable global objects to me

DU.PC = new PCObject();
var PC = DU.PC;  // alias

var timeouts = {};

var debugarray = [];

PC.assignSerial();
var nowplaying;
var laststep = "left";
//DU.maps = new MapMemory();
//var maps = DU.maps; // alias
var losgrid = new LOSMatrix(30);  // BIGGER FOR AI USE

DU.DUTime = new Timeline(0);
var DUTime = DU.DUTime; // alias
var maintext = new TextFrame("innertextframe");
var DULoot = SetLoots();            //
var DULootGroups = SetLootGroups(); //  see loot.js and lootset.js for population
var DUTraps = SetTraps();           //
var displayspecs = {};
var Dice = new DiceObject();
var finder = new PF.AStarFinder({
  heuristic: PF.Heuristic.euclidean
});
DU.gameflags = new Gameflags();

var targetCursor = {};
    targetCursor.skipahead = 0;
var inputText = {};

var raceWarning = 0;

function DrawMainFrame() { }
function DrawCharFrame() {}
function ShowEffect(onwhat, duration, graphic, xoff, yoff) {}
function IsVisibleOnScreen() { return 1; }
function DUPlaySound() {}
  
QUnit.test( "Test minstrel song", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("combatGrass1");
  var testmap = maps.getMap("combatGrass1");
 
  var minstrel = localFactory.createTile("MinstrelNPC");
  testmap.placeThing(4,4,minstrel);
  
  minstrel.setHP(1);

  let friend  = localFactory.createTile("HoodNPC");
  testmap.placeThing(3,3,friend);
  friend  = localFactory.createTile("HoodNPC");
  testmap.placeThing(3,6,friend);

  testmap.placeThing(5,5,PC);

  let diecount = 0;
  Dice.roll = function() { if (!diecount) { diecount++; return 0; } 
                          else { return 3; } }
  
  let result = ais.ai_sing(minstrel);
  assert.deepEqual(result,"special","Minstrel sing AI returned 'special'");
  assert.deepEqual(minstrel.getHP(),4,"Healed!");

  Dice.roll = function() { return 0; }

  minstrel.setHP(minstrel.getMaxHP());
  result = ais.ai_sing(minstrel);
  let morale = friend.getSpellEffectsByName("Blessing");
  assert.deepEqual(morale.getName(),"Blessing","Friend is blessed.");
  assert.deepEqual(DUTime.getGameClock(),0,"Time is 0?");
  assert.deepEqual(morale.getExpiresTime(),2*SCALE_TIME,"Expires at 2 ticks");

  let morale2 = PC.getSpellEffectsByName("Blessing");
  assert.deepEqual(morale2,undefined,"No blessing on PC");

  diecount = 0;
  Dice.roll = function()  { if (!diecount) { diecount++; return 1; } 
  else { return 90; } }
  result = ais.ai_sing(minstrel);
  let distract = PC.getSpellEffectsByName("Distract");
  assert.deepEqual(distract.getName(),"Distract","PC is distracted!");

  maps.deleteMap("combatGrass1");
});

QUnit.test( "Test gremlin breed", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("combatGrass1");
  var testmap = maps.getMap("combatGrass1");
 
  var minstrel = localFactory.createTile("GremlinNPC");
  testmap.placeThing(4,4,minstrel);
  
  testmap.placeThing(5,5,PC);

  ais.ai_breed(minstrel);
  let npcs = testmap.npcs.getAll();
  assert.deepEqual(npcs.length,1,"There is still only one Gremlin.");

  Dice.roll = function() { return 0; }
  minstrel.fed = 1;
  ais.ai_breed(minstrel);
  npcs = testmap.npcs.getAll();
  assert.deepEqual(npcs.length,2,"The gremlin has bred.");
  assert.deepEqual(minstrel.fed,undefined,"The gremlin is no longer fed.");

  maps.deleteMap("combatGrass1");
});

QUnit.test( "Test gaze sleep", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("combatGrass1");
  var testmap = maps.getMap("combatGrass1");
 
  var gazer = localFactory.createTile("GazerNPC");
  testmap.placeThing(4,4,gazer);
  
  testmap.placeThing(5,5,PC);

  let friend = localFactory.createTile("IllusionNPC");

  testmap.placeThing(6,1,friend);

  let retval = ais.ai_sleep(gazer);

  assert.deepEqual(retval,"special","gazer acted.");

  maps.deleteMap("combatGrass1");
});

QUnit.test( "Test fluke whirlpool", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("combatCoast1");
  var testmap = maps.getMap("combatCoast1");
 
  var fluke = localFactory.createTile("FlukeNPC");
  testmap.placeThing(6,10,fluke);
  
  testmap.placeThing(7,10,PC);

  let fluke2 = localFactory.createTile("FlukeNPC");
  testmap.placeThing(7,11,fluke2);

  let retval = ais.ai_whirlpool(fluke);

  assert.deepEqual(retval,undefined,"Fluke didn't act, presumably because it needs 3.");

  let fluke3 = localFactory.createTile("FlukeNPC");
  testmap.placeThing(8,9,fluke3);

  retval = ais.ai_whirlpool(fluke);

  assert.deepEqual(retval,"special","Fluke acted.");
  let para = 0;
  if (fluke2.getSpellEffectsByName("Paralyze")) { para = 1; }
  assert.deepEqual(para,1,"Fluke2 is paralyzed with effort.");
  para = 0;
  if (fluke3.getSpellEffectsByName("Paralyze")) { para = 1; }
  assert.deepEqual(para,1,"Fluke3 is paralyzed with effort.");
  para = 0;
  if (fluke.getSpellEffectsByName("Paralyze")) { para = 1; }
  assert.deepEqual(para,0,"Fluke is not paralyzed with effort- it did it on its turn.");
  
  let tile = testmap.getTile(7,10);
  let wp = tile.getTopFeature();
  assert.deepEqual(wp.getName(),"WhirlpoolFluke","There is a whirlpool under the PC.");

  para = 0;
  if (PC.getSpellEffectsByName("Dizzy")) { para = 1; }
  assert.deepEqual(para,1,"PC is dizzy.");

  maps.deleteMap("combatCoast1");
});
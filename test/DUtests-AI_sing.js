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
  
QUnit.test( "Test minstrel song", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("combatGrass1");
  var testmap = maps.getMap("combatGrass1");
 
  var minstrel = localFactory.createTile("MinstrelNPC");
  testmap.placeThing(4,4,minstrel);
  
  minstrel.setHP(5);

  let friend  = localFactory.createTile("HoodNPC");
  testmap.placeThing(3,3,friend);
  friend  = localFactory.createTile("HoodNPC");
  testmap.placeThing(3,6,friend);

  testmap.placeThing(5,5,PC);

  let diecount = 0;
  Dice.roll = function() { if (!diecount) { diecount++; return 0; } 
                          else { return 10; } }
  
  let result = ais.ai_sing(minstrel);
  assert.deepEqual(result,"special","Minstrel sing AI returned 'special'");

  maps.deleteMap("unittest2");
});


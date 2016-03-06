var maxserial = 0;
var viewsizex = 13;
var viewsizey = 13;
var DAYNIGHT = DAY;

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
  
QUnit.test( "Test randomwalk", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest2");
  var testmap = maps.getMap("unittest2");
 
  var mage = localFactory.createTile("MageVillagerNPC");
  testmap.placeThing(8,10,mage);
  
  assert.deepEqual(mage.startx,8,"Placed, startx should be set.");
  assert.deepEqual(mage.starty,10,"Placed, starty should be set.");
 
  Dice.roll = function() { return 10; }
  
  var moveval = ais.Randomwalk(mage,25,25,25,25);
  assert.deepEqual(mage.getx(),8,"New x position: 8");
  assert.deepEqual(mage.gety(),9,"New y position: 9");
  assert.deepEqual(moveval.diffx,0,"Didn't move EW.");
  assert.deepEqual(moveval.diffy,-1,"Moved north.");
  assert.deepEqual(moveval.nomove,0,"Nomove = 0, moved.");
  assert.deepEqual(moveval.canmove,1,"Canmove = 1, moved.");

  Dice.roll = function() { return 30; }
  
  moveval = ais.Randomwalk(mage,25,25,25,25);
  assert.deepEqual(mage.getx(),9,"New x position: 9");
  assert.deepEqual(mage.gety(),9,"New y position: 9");
  assert.deepEqual(moveval.diffx,1,"Moved E.");
  assert.deepEqual(moveval.diffy,0,"Didn't move NS.");
  assert.deepEqual(moveval.nomove,0,"Nomove = 0, moved.");
  assert.deepEqual(moveval.canmove,1,"Canmove = 1, moved.");

  Dice.roll = function() { return 60; }
  
  moveval = ais.Randomwalk(mage,25,25,25,25);
  assert.deepEqual(mage.getx(),9,"New x position: 9");
  assert.deepEqual(mage.gety(),10,"New y position: 10");
  assert.deepEqual(moveval.diffx,0,"Didn't move EW.");
  assert.deepEqual(moveval.diffy,1,"Moved S.");
  assert.deepEqual(moveval.nomove,0,"Nomove = 0, moved.");
  assert.deepEqual(moveval.canmove,1,"Canmove = 1, moved.");

  Dice.roll = function() { return 80; }
  
  moveval = ais.Randomwalk(mage,25,25,25,25);
  assert.deepEqual(mage.getx(),8,"New x position: 8");
  assert.deepEqual(mage.gety(),10,"New y position: 10");
  assert.deepEqual(moveval.diffx,-1,"Moved W.");
  assert.deepEqual(moveval.diffy,0,"Didn't move NS.");
  assert.deepEqual(moveval.nomove,0,"Nomove = 0, moved.");
  assert.deepEqual(moveval.canmove,1,"Canmove = 1, moved.");
  
  moveval = ais.Randomwalk(mage,25,25,0,0);
  assert.deepEqual(mage.getx(),8,"Didn't move (x=8).");
  assert.deepEqual(mage.gety(),10,"Didn't move (y=10)");
  assert.deepEqual(moveval.diffx,0,"Didn't move (diffx=0).");
  assert.deepEqual(moveval.diffy,0,"Didn't move (diffy=0).");
  assert.deepEqual(moveval.nomove,1,"Didn't move (nomove = 1).");
  assert.deepEqual(moveval.canmove,0,"Canmove = 0, didn't move.");
  
  Dice.roll = function() {return 40; }
  moveval = ais.Randomwalk(mage,25,0,0,25);
  assert.deepEqual(mage.getx(),7,"New x position: 7");
  assert.deepEqual(mage.gety(),10,"New y position: 10");
  assert.deepEqual(moveval.diffx,-1,"Moved W.");
  assert.deepEqual(moveval.diffy,0,"Didn't move NS.");
  assert.deepEqual(moveval.nomove,0,"Nomove = 0, moved.");
  assert.deepEqual(moveval.canmove,1,"Canmove = 1, moved.");
  
  var field = localFactory.createTile("SleepField");
  testmap.placeThing(8,10,field);
  moveval = ais.Randomwalk(mage,0,50,0,0);
  assert.deepEqual(mage.getx(),7,"New x position: 7 (unchanged)");
  assert.deepEqual(mage.gety(),10,"New y position: 10 (unchanged)");
  assert.deepEqual(moveval.diffx,1,"Tried to move E, didn't.");
  assert.deepEqual(moveval.diffy,0,"Didn't move NS.");
  assert.deepEqual(moveval.nomove,1,"Nomove = 1, no move.");
  assert.deepEqual(moveval.canmove,0,"Canmove = 0, no move.");

  moveval = ais.Randomwalk(mage,0,0,0,50);
  assert.deepEqual(mage.getx(),7,"New x position: 7 (unchanged)");
  assert.deepEqual(mage.gety(),10,"New y position: 10 (unchanged)");
  assert.deepEqual(moveval.diffx,-1,"Tried to move W, didn't.");
  assert.deepEqual(moveval.diffy,0,"Didn't move NS.");
  assert.deepEqual(moveval.nomove,0,"Nomove = 0, despite no move, because move was attempted but failed.");
  assert.deepEqual(moveval.canmove,0,"Canmove = 0, no move.");

  maps.deleteMap("unittest2");
});

QUnit.test( "Test townsfolk AI", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest2");
  var testmap = maps.getMap("unittest2");
 
  var mage = localFactory.createTile("MageVillagerNPC");
  testmap.placeThing(8,11,mage);

  mage.setLeash(3);
  assert.deepEqual(mage.getLeash(),3,"Leash = 3");
  
  testmap.placeThing(0,0,PC);
  
  Dice.roll = function() { return 2; } // townsfolk AI will not wander
  assert.deepEqual(mage.getCurrentAI(),"townsfolk", "AI is townsfolk.");
  
  var airesult = ais.townsfolk(mage);
  assert.deepEqual(mage.getx(),8,"Townsfolk didn't move (x=8).")
  assert.deepEqual(mage.gety(),11,"Townsfolk didn't move (y=11).")

  Dice.roll = function() { return 1; }
  airesult = ais.townsfolk(mage);
  assert.deepEqual(mage.getx(),8,"Townsfolk randomwalked north (x=8).")
  assert.deepEqual(mage.gety(),10,"Townsfolk randomwalked north (y=10).")
  
  Dice.roll = function() {
    if (!Dice.rollnum) { Dice.rollnum = 1; }
    if (Dice.rollnum === 1) { Dice.rollnum++; return 1; } // yes, move
    if (Dice.rollnum === 2) { Dice.rollnum++; return 80; } // randomwalk west
  }

  airesult = ais.townsfolk(mage);
  assert.deepEqual(mage.getx(),7,"Walked west (x=7).");
  assert.deepEqual(mage.gety(),10," (y=10).")
  
  Dice.rollnum = 1;
  airesult = ais.townsfolk(mage);
  assert.deepEqual(mage.getx(),7,"Tried to walk west, opened door instead (x=7).");
  assert.deepEqual(mage.gety(),10," (y=10).")

  Dice.rollnum = 1;
  airesult = ais.townsfolk(mage);
  assert.deepEqual(mage.getx(),6,"Stepped through open door (x=6).");
  assert.deepEqual(mage.gety(),10," (y=10).")
  
  Dice.rollnum = 1;
  airesult = ais.townsfolk(mage);
  assert.deepEqual(mage.getx(),5,"Still west (x=5).");
  assert.deepEqual(mage.gety(),10," (y=10).")
  
  var tile = testmap.getTile(6,10);
  var door = tile.getFeatures();
  door[0].use(mage);
  
  Dice.rollnum = 1;
  airesult = ais.townsfolk(mage);
  assert.deepEqual(mage.getx(),5,"Outside leash, heading back (x=5, opened door).");
  assert.deepEqual(mage.gety(),10," (y=10).")  
  
  Dice.rollnum = 1;
  airesult = ais.townsfolk(mage);
  assert.deepEqual(mage.getx(),6,"Outside leash, heading back (x=6).");
  assert.deepEqual(mage.gety(),10," (y=10).")
  
  maps.deleteMap("unittest2");
});

QUnit.test( "Test ProcessPoI", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("darkunknown");
  var testmap = maps.getMap("darkunknown");

  var testnpc = localFactory.createTile("HoodNPC");
  testmap.placeThing(59,122,testnpc);

  Dice = new DiceObject();
  Dice.roll = function() { return 0; }
  var score = ais.ProcessPoI(testnpc,"road");

  assert.deepEqual(testnpc.getPoI().x,55,"x coord of new PoI");
  assert.deepEqual(testnpc.getPoI().y,115,"y coord of new PoI");
  assert.deepEqual(testnpc.getCurrentPath().length,11,"Check for length of path.");
  assert.deepEqual(testnpc.getTurnsToRecalcDest(),6,"Duration of path");
  assert.deepEqual(testnpc.getDestination().x,55,"x coord of new PoI");
  assert.deepEqual(testnpc.getDestination().y,115,"y coord of new PoI");
  assert.deepEqual(testnpc.getDestinationType(),"PoI","Test of destination type.");
  assert.deepEqual(testnpc.getCurrentPath()[0][0],59,"First step is not E/W");
  assert.deepEqual(testnpc.getCurrentPath()[0][1],121,"First step is N/S");
  assert.deepEqual(score,1,"Went through the first path in ProcessPoI.");
  
  var firststep = testnpc.getNextStep()
  assert.deepEqual(firststep[0],59,"First step is not E/W");
  assert.deepEqual(firststep[1],121,"First step is N/S");
  
  score = ais.ProcessPoI(testnpc,"road");
  assert.deepEqual(score,3,"Went through third path.");
  assert.deepEqual(testnpc.getCurrentPath()[0][0],59,"First step is not E/W");
  assert.deepEqual(testnpc.getCurrentPath()[0][1],121,"First step is N/S");

  testnpc.setTurnsToRecalcDest(0);
  score = ais.ProcessPoI(testnpc,"road");
  assert.deepEqual(score,2,"Went through second (path expired) codepath.");
  assert.deepEqual(testnpc.getDestination().x,36,"Path expired, looking at new PoI");
  assert.deepEqual(testnpc.getDestination().y,100,"Path expired, looking at new PoI");
  assert.deepEqual(testnpc.getTurnsToRecalcDest(),30,"New duration");
  assert.deepEqual(testnpc.getCurrentPath()[0][0],59,"First step is not E/W");
  assert.deepEqual(testnpc.getCurrentPath()[0][1],121,"First step is N/S");
  
  maps.deleteMap("darkunknown");
});

QUnit.test( "Test Hunt For PC", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("darkunknown");
  var testmap = maps.getMap("darkunknown");

  var testnpc = localFactory.createTile("HoodNPC");
  testmap.placeThing(59,122,testnpc);

  maps.addMap("combatGrass1");
  var combatmap = maps.getMap("combatGrass1");
  
  combatmap.placeThing(5,5,PC);
  

  maps.deleteMap("darkunknown");
});

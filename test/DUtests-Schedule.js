"use strict";

var maxserial = 0;
var viewsizex = 13;
var viewsizey = 13;
var DAYNIGHT = "DAY";

var wind = {};
wind.xoff = 0;
wind.yoff = 2;

var mappages = new Pages();
var localFactory = new tileFactory();
var eidos = new Platonic();
//var universe = new Object;

var DU = {};  // attach all saveable global objects to me
DU.version = "0.7.3";

DU.PC = new PCObject();
var PC = DU.PC;  // alias

var timeouts = {};

PC.assignSerial();

var nowplaying = {};  // .song = a SoundJS object for current music, .name = name of the song
var ambient = {};  // .song = a SoundJS object for current ambient noise, .name = name of the sound
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
var whoseturn;

function DrawMainFrame() { }
function DrawCharFrame() {}
function ShowEffect(onwhat, duration, graphic, xoff, yoff) {}

var maps = new MapMemory();
  
QUnit.test( "Test randomwalk", function( assert ) {
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");
  maps.addMap("unittest2");
  var testmap1 = maps.getMap("unittest2");

  var sched = '{"testmage":{"scheduleArray":[{"params":{"destination":{"x":"8","y":"6"},"startCondition":"Time","startTime":"9:00"},"type":"RouteTo"},{"params":{"destination":{"mapName":"unittest2","x":"3","y":"10"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"9","y":"10"},"closeDoors":"1","startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","responsibleFor":[{"x":"6","y":"10"}],"startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"AIName":"PlaceItem","params":"name: \\"RedPotion\\", x: 3, y:3","startCondition":"Time","startTime":"11:30"},"type":"CallAI"}],"baseLocation":"unittest","currentIndex":0}}';  
  
  var tmpschedules = JSON.parse(sched);
  
  DU.schedules = {};
  $.each(tmpschedules, function(idx,val) {
    DU.schedules[idx] = new NPCSchedule();
    DU.schedules[idx]["scheduleArray"] = val.scheduleArray;
    DU.schedules[idx]["currentIndex"] = val.currentIndex;
    DU.schedules[idx]["baseLocation"] = val.baseLocation;
  });

  var mage = localFactory.createTile("MageVillagerNPC");
  testmap.placeThing(8,10,mage);
  mage.setPeaceAI("scheduled");
  mage.setCurrentAI("scheduled");
  mage.schedule="testmage";
  
  DUTime.setGameClock(25);
  assert.deepEqual(GetUsableClockTime(), "11:05", "Clock should be set to 11:05.");

  mage.myTurn();
  assert.deepEqual(mage.gety(),9, "Moved north.");
  mage.myTurn();
  assert.deepEqual(mage.gety(),8, "Moved north.");
  mage.myTurn();
  assert.deepEqual(mage.gety(),7, "Moved north.");
  mage.myTurn();
  assert.deepEqual(mage.gety(),6, "Moved north.");
  assert.deepEqual(mage.getx(),8, "Still at x=8.");
  assert.deepEqual(mage.flags.activityComplete,1,"Activity complete");

  assert.deepEqual(mage.getHomeMap().getName(),"unittest", "On map unittest.");
  mage.myTurn();
  assert.deepEqual(mage.getHomeMap().getName(),"unittest2", "On map unittest2 (moved due to schedule).");
  assert.deepEqual(mage.getx(),3,"new x=3");
  assert.deepEqual(mage.gety(),10,"new y=10");

  var door = mage.getHomeMap().getTile(6,10).getTopFeature();
  mage.myTurn();
  assert.deepEqual(mage.getx(),4,"Moved east.");
  assert.deepEqual(mage.flags.activityComplete,undefined,"Activity complete deleted.");
  mage.myTurn();
  assert.deepEqual(mage.getx(),5,"Moved east.");
  assert.deepEqual(door.open,0,"Door is closed.");
  mage.myTurn();
  assert.deepEqual(mage.getx(),5,"Opened the door.");
  assert.deepEqual(door.open,1,"Door is open.");

  mage.myTurn();
  assert.deepEqual(mage.getx(),6,"Moved east.");

  mage.myTurn();
  assert.deepEqual(mage.getx(),7,"Moved east.");

  mage.myTurn();
  assert.deepEqual(mage.getx(),7,"Closed the door.");
  assert.deepEqual(door.open,0,"Door is closed.");

  mage.myTurn();
  assert.deepEqual(mage.getx(),8,"Moved east.");

  mage.myTurn();
  assert.deepEqual(mage.getx(),9,"Moved east.");
  assert.deepEqual(mage.flags.activityComplete,1,"Activity complete");

  Dice.roll = function() { return 2; }
  
  mage.myTurn();
  assert.deepEqual(mage.gety(),9,"Randomly chose to wander north.");

  mage.myTurn();
  assert.deepEqual(mage.gety(),8,"Randomly chose to wander north.");

  mage.myTurn();
  assert.deepEqual(mage.gety(),7,"Randomly chose to wander north.");

  mage.myTurn();
  assert.deepEqual(mage.gety(),6,"Randomly chose to wander north.");

  mage.myTurn();
  assert.deepEqual(mage.gety(),7,"Returning from outside the leash.");

  Dice.roll = function() { return 1; }

  mage.myTurn();
  assert.deepEqual(mage.getx(),9,"Decided not to wander.");
  assert.deepEqual(mage.gety(),7,"Decided not to wander.");

  door.use(mage);
  assert.deepEqual(door.open,1,"Door is open for testing.");

  mage.myTurn();
  assert.deepEqual(mage.flags.closingResponsibleDoor,0,"Chosen to close door.");  
  assert.deepEqual(mage.gety(),8,"Moving towards door.");

  mage.myTurn();
  assert.deepEqual(mage.getx(),8,"Moving towards door.");

  mage.myTurn();
  assert.deepEqual(mage.gety(),9,"Moving towards door.");

  mage.myTurn();
  assert.deepEqual(mage.getx(),7,"Moving towards door.");

  mage.myTurn();
  assert.deepEqual(mage.gety(),10,"Moving towards door.");

  mage.myTurn();
  assert.deepEqual(mage.gety(),10,"Didn't move y.");
  assert.deepEqual(mage.getx(),7,"Didn't move x.");
  assert.deepEqual(door.open,0,"Door has been closed.");

  Dice.roll = function() { return 2; }
  mage.myTurn();
  assert.deepEqual(mage.gety(),9,"Randomwalked north.");  

  DUTime.setGameClock(31);
  assert.deepEqual(GetUsableClockTime(), "11:35", "Clock should be set to 11:35.");

  mage.myTurn();
  var potion = mage.getHomeMap().getTile(3,3).getTopFeature();
  assert.deepEqual(potion.getName(),"RedPotion","A red potion was created.");
  assert.deepEqual(mage.linkedItem,potion,"It is linked to the mage.");

  maps.deleteMap("unittest");
  maps.deleteMap("unittest2");
});


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
  
QUnit.test( "Test randomwalk", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");
  maps.addMap("unittest2");
  var testmap1 = maps.getMap("unittest2");

  var sched = '{"avery":{"scheduleArray":[{"params":{"destination":{"x":"7","y":"42"},"closeDoors":"1","startCondition":"Time","startTime":"6:00"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen","x":"7","y":"42"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"11","y":"42"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"AIName":"PlaceItem","params":"{name: \\"PlateWithFood\\", x:11,y:41}","startCondition":"PreviousComplete"},"type":"CallAI"},{"params":{"AIName":"DeleteItem","params":"{param: \\"last\\"}","startCondition":"Time","startTime":"7:00"},"type":"CallAI"},{"params":{"destination":{"x":"10","y":"39"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"13","y":"38"},"startCondition":"Time","startTime":"15:30"},"type":"RouteTo"},{"params":{"AIName":"PlayHarpsichord","params":"{}","startCondition":"PreviousComplete"},"type":"CallAI"},{"params":{"destination":{"x":"10","y":"39"},"startCondition":"Time","startTime":"16:00"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"10","y":"39"},"startCondition":"Time","startTime":"18:30"},"type":"RouteTo"},{"params":{"AIName":"PlaceItem","params":"{name: \\"PlateWithFood\\", x:11,y:41}","startCondition":"PreviousComplete"},"type":"CallAI"},{"params":{"AIName":"DeleteItem","params":"{param:last}","startCondition":"Time","startTime":"19:00"},"type":"CallAI"},{"params":{"destination":{"x":"10","y":"39"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"7","y":"49"},"startCondition":"Time","startTime":"21:30"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen2","x":"7","y":"49"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"7","y":"37"},"closeDoors":"1","startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"sleep":"1","leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"}],"baseLocation":"Naurglen","currentIndex":0},"testmage":{"scheduleArray":[{"params":{"destination":{"x":"8","y":"6"},"startCondition":"Time","startTime":"9:00"},"type":"RouteTo"},{"params":{"destination":{"mapName":"unittest2","x":"3","y":"10"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"9","y":"10"},"closeDoors":"1","startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","responsibleFor":"\\"6,10\\"","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"AIName":"PlaceItem","params":"name: \\"RedPotion\\", x: 3, y:3","startCondition":"Time","startTime":"9:30"},"type":"CallAI"}],"baseLocation":"unittest","currentIndex":0}}';  
  
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
  
  DUTime = 24;
  assert.deepEqual(GetUsableClockTime(), "9:02", "Clock should be set to 9:02.");
 
  Dice.roll = function() { return 10; }
  
  maps.delete("unittest");
  maps.deleteMap("unittest2");
});


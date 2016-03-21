
// list of necessary tests: map load?

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

PC.assignSerial();
var nowplaying;
var laststep = "left";
DU.maps = new MapMemory();
var maps = DU.maps; // alias
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


function DrawCharFrame() {}
function ShowEffect(onwhat, duration, graphic, xoff, yoff) {}
  
var evtriggered = 0;
EventFunctions["Testear"] = function() {
  evtriggered = 1;
}  

// Events test
QUnit.test( "Test event system", function( assert ) {
  maps.addMap("unittest2");
  var testmap = maps.getMap("unittest2");
  
  assert.deepEqual(testmap.getName(), "unittest2", "Testing map name.");
  
  var mage = localFactory.createTile("MageVillagerNPC");
  testmap.placeThing(8,10,mage);

  var debugtxt = [];
  DebugWrite = function(what,msg) { debugtxt.push(msg); }

  var listener = new DUListener();
  
  var testear = new DUEar();
  testear.name = "Testear";
  testear.listenforname = "Testevent";
  testear.linkedtomap = "unittest2";
  testear.flagsreq = { bob: 1 };

  var testevent = new DUEvent("Testevent", mage, { george : 1} );
  listener.sendEvent(testevent);
  
  assert.deepEqual(evtriggered, 0, "Event sent, no listeners.");
  assert.deepEqual(debugtxt[0], "Event sent, no listeners.<br />", "Debug msg due to no listeners");
  
  debugtxt = [];
  listener.addListener(testear);
  
  assert.deepEqual(listener.listeners.getAll().length,1,"There is one listener attached.")
  assert.deepEqual(listener.listeners.getAll()[0].linkedtomap,"unittest2","It is linked to map unittest2.");

  listener.sendEvent(testevent);
  
  assert.deepEqual(debugtxt.length, 0, "No debug msg sent.");
  assert.deepEqual(evtriggered, 0, "Event did not match all flags.");

  testevent.flags = { bob:1, george:1 };
  listener.sendEvent(testevent);
  
  assert.deepEqual(evtriggered, 0, "Event did not match all flags (though did match some).");
  debugtxt = [];

  testevent.flags = { bob:1 };
  listener.sendEvent(testevent);
  
  assert.deepEqual(debugtxt[0], "Flag bob matched - values 1.<br />", "Debug msg due to matched flags");
  assert.deepEqual(evtriggered, 1, "Event matches all flags and called evfunc.");
  
});

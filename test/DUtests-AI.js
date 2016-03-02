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
  
  assert.deepEquals(mage.startx,8,"Placed, startx should be set.");
  assert.deepEquals(mage.starty,10,"Placed, starty should be set.");
 
  maps.deleteMap("unittest2");
}

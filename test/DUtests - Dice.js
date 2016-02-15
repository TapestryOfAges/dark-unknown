
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
  
//maps.addMap("unittest");

//function ClearMap(mapref) {
//  var fea = mapref.features.getAll();
//  var npcs = mapref.npcs.getAll();
//  $.each(fea, function(idx, val) {
//    mapref.deleteThing(val);
//  });
//  $.each(npcs, function(idx,val) {
//    mapref.deleteThing(val);
//  });
//}
  
// Dice test
QUnit.test( "Test dice parse", function( assert ) {

  var dieobj = Dice.parse("3d6+2");
  assert.deepEqual( dieobj.quantity, 3, "Checking '3d6+2', expecting 3" );
  assert.deepEqual( dieobj.dice, 6, "Checking '3d6+2', expecting 6" );
  assert.deepEqual( dieobj.plus, 2, "Checking '3d6+2', expecting 2" );
  
  dieobj = Dice.parse("3d6+-2");
  assert.deepEqual( dieobj.quantity, 3, "Checking '3d6+-2', expecting 3" );
  assert.deepEqual( dieobj.dice, 6, "Checking '3d6+-2', expecting 6" );
  assert.deepEqual( dieobj.plus, -2, "Checking '3d6+-2', expecting -2" );

  dieobj = Dice.parse("3d6-2");
  assert.deepEqual( dieobj.quantity, 3, "Checking '3d6-2', expecting 3" );
  assert.deepEqual( dieobj.dice, 6, "Checking '3d6-2', expecting 6" );
  assert.deepEqual( dieobj.plus, -2, "Checking '3d6-2', expecting -2" );

  dieobj = Dice.parse("2d10");
  assert.deepEqual( dieobj.quantity, 2, "Checking '2d10', expecting 2" );
  assert.deepEqual( dieobj.dice, 10, "Checking '2d10', expecting 10" );
  assert.deepEqual( dieobj.plus, 0, "Checking '2d10', expecting 0" );

  dieobj = Dice.parse("4");
  assert.deepEqual( dieobj.quantity, 0, "Checking '4', expecting 0" );
  assert.deepEqual( dieobj.dice, 0, "Checking '4', expecting 0" );
  assert.deepEqual( dieobj.plus, 4, "Checking '4', expecting 4" );

  dieobj = Dice.parse(4);
  assert.deepEqual( dieobj.quantity, 0, "Checking '4', expecting 0" );
  assert.deepEqual( dieobj.dice, 0, "Checking '4', expecting 0" );
  assert.deepEqual( dieobj.plus, 4, "Checking '4', expecting 4" );
    
  dieobj = Dice.parse("+4");
  assert.deepEqual( dieobj.quantity, 0, "Checking '+4', expecting 0" );
  assert.deepEqual( dieobj.dice, 0, "Checking '+4', expecting 0" );
  assert.deepEqual( dieobj.plus, 4, "Checking '+4', expecting 4" );

  dieobj = Dice.parse("-4");
  assert.deepEqual( dieobj.quantity, 0, "Checking '-4', expecting 0" );
  assert.deepEqual( dieobj.dice, 0, "Checking '-4', expecting 0" );
  assert.deepEqual( dieobj.plus, -4, "Checking '-4', expecting -4" );

  dieobj = Dice.parse(-4);
  assert.deepEqual( dieobj.quantity, 0, "Checking '-4', expecting 0" );
  assert.deepEqual( dieobj.dice, 0, "Checking '-4', expecting 0" );
  assert.deepEqual( dieobj.plus, -4, "Checking '-4', expecting -4" );

  dieobj = Dice.parse("3d");
  assert.deepEqual( dieobj.quantity, 0, "Checking '3d', expecting 0" );
  assert.deepEqual( dieobj.dice, 1, "Checking '3d', expecting 1" );
  assert.deepEqual( dieobj.plus, 0, "Checking '3d', expecting 0" );

  dieobj = Dice.parse("3d+2");
  assert.deepEqual( dieobj.quantity, 0, "Checking '3d+2', expecting 0" );
  assert.deepEqual( dieobj.dice, 1, "Checking '3d+2', expecting 1" );
  assert.deepEqual( dieobj.plus, 2, "Checking '3d+2', expecting 2" );

  dieobj = Dice.parse("d2+3");
  assert.deepEqual( dieobj.quantity, 1, "Checking 'd2+3', expecting 1" );
  assert.deepEqual( dieobj.dice, 2, "Checking 'd2+3', expecting 2" );
  assert.deepEqual( dieobj.plus, 3, "Checking 'd2+3', expecting 3" );

  assert.deepEqual( Dice.rollmin("3d6+4"), 7, "Checking min of 3d6+4, expecting 7.");
  assert.deepEqual( Dice.rollave("3d6+4"), 14.5, "Checking ave of 3d6+4, expecting 14.5.");

  assert.deepEqual( Dice.roll("3d1+4"), 7, "Rolling 3d1+4, expecting 7.");
});

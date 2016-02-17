
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

QUnit.test( "Test Awaken spell", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var tgtmob = localFactory.createTile("TownGuardNPC");
  var castermob = localFactory.createTile("PaladinNPC");
  
  testmap.placeThing(5,4,tgtmob);
  testmap.placeThing(5,8,castermob);
  
  var awake = PerformAwaken(castermob,0,0,tgtmob);
  assert.deepEqual(awake["txt"], "Your spell cannot reach that target!", "Spell can't reach.");

  testmap.moveThing(9,8,tgtmob);
  var oldmana = castermob.getMana();
  
  awake = PerformAwaken(castermob,0,0,tgtmob);
  assert.deepEqual(oldmana - castermob.getMana(), 1, "Awaken cast, should cost 1.");
  assert.deepEqual(awake["txt"], "Guard is not asleep- no effect.", "Checking response on non-sleeping target.");
  
  var sleeptile = localFactory.createTile("Sleep");
  tgtmob.addSpellEffect(sleeptile);
  var asleep = tgtmob.getSpellEffectsByName("Sleep");
  var isasleep = 0;
  if (asleep) { isasleep = 1; }
  oldmana = castermob.getMana();
  assert.deepEqual(isasleep, 1, "Putting guard to sleep before spellcast.");
  awake = PerformAwaken(castermob,0,1,tgtmob);
  assert.deepEqual(oldmana - castermob.getMana(), 0, "Awaken cast, should cost 0 (free cast).");
  asleep = tgtmob.getSpellEffectsByName("Sleep");
  isasleep = 0;
  if (asleep) { isasleep = 1; }
  assert.deepEqual(isasleep, 0, "Guard is now awake.");

  oldmana = castermob.getMana();
  awake = PerformAwaken(castermob,1,0,tgtmob);
  assert.deepEqual(oldmana - castermob.getMana(), 2, "Cast infused, should cost 2.");
  
  maps.deleteMap("unittest");
});

QUnit.test( "Test Cure spell", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");
  
  var castermob = localFactory.createTile("PaladinNPC");
  testmap.placeThing(5,8,castermob);

  var poison = localFactory.createTile("Poison");
  var disease = localFactory.createTile("Disease");
  castermob.addSpellEffect(poison);
  castermob.addSpellEffect(disease);
  
  var ispoisoned = 0;
  var isdiseased = 0;
  if (castermob.getSpellEffectsByName("Poison")) { ispoisoned = 1; }
  if (castermob.getSpellEffectsByName("Disease")) { isdiseased = 1; }
  assert.deepEqual(ispoisoned, 1, "Caster starts poisoned.");
  assert.deepEqual(isdiseased, 1, "Caster starts diseased.");
  
  var oldmana = castermob.getMana();
  var cure = magic[1][GetSpellID(2)].executeSpell(castermob,0,0);
  ispoisoned = 0;
  isdiseased = 0;
  if (castermob.getSpellEffectsByName("poison")) { ispoisoned = 1; }
  if (castermob.getSpellEffectsByName("disease")) { isdiseased = 1; }
  
  assert.deepEqual(oldmana-castermob.getMana(), 1, "Cost 1 mana.");
  assert.deepEqual(ispoisoned, 0, "Caster is cured of poison.");
  assert.deepEqual(isdiseased, 0, "Caster is cured of disease.");

  var poison = localFactory.createTile("Poison");
  var disease = localFactory.createTile("Disease");
  castermob.addSpellEffect(poison);
  castermob.addSpellEffect(disease);
  
  var ispoisoned = 0;
  var isdiseased = 0;
  if (castermob.getSpellEffectsByName("Poison")) { ispoisoned = 1; }
  if (castermob.getSpellEffectsByName("Disease")) { isdiseased = 1; }
  
  Dice.roll = function(die) { return 4; }
  castermob.healMe = function(amt) {
    castermob.washealed = amt;
  }
  var oldmana = castermob.getMana();
  var cure = magic[1][GetSpellID(2)].executeSpell(castermob,1,0);
  ispoisoned = 0;
  isdiseased = 0;
  if (castermob.getSpellEffectsByName("poison")) { ispoisoned = 1; }
  if (castermob.getSpellEffectsByName("disease")) { isdiseased = 1; }
  
  assert.deepEqual(oldmana-castermob.getMana(), 2, "Infused: cost 2 mana.");
  assert.deepEqual(ispoisoned, 0, "Caster is cured of poison.");
  assert.deepEqual(isdiseased, 0, "Caster is cured of disease.");
  assert.deepEqual(castermob.washealed, 4, "Caster was healed for 4.");

  maps.deleteMap("unittest");
});

QUnit.test( "Test Disarm Trap spell", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var castermob = localFactory.createTile("PaladinNPC");
  testmap.placeThing(2,11,castermob);
  
  var chests = [];
  chests[0] = localFactory.createTile("Chest");
  testmap.placeThing(1,10,chests[0]);
  chests[1] = localFactory.createTile("Chest");
  testmap.placeThing(2,10,chests[1]);
  chests[2] = localFactory.createTile("Chest");
  testmap.placeThing(3,10,chests[2]);
  chests[3] = localFactory.createTile("Chest");
  testmap.placeThing(3,11,chests[3]);
  chests[4] = localFactory.createTile("Chest");
  testmap.placeThing(3,12,chests[4]);
  chests[5] = localFactory.createTile("Chest");
  testmap.placeThing(2,12,chests[5]);
  chests[6] = localFactory.createTile("Chest");
  testmap.placeThing(1,12,chests[6]);
  chests[7] = localFactory.createTile("Chest");
  testmap.placeThing(1,11,chests[7]);
  
  for (var i=0; i<=7; i++) {
    chests[i].trapchallenge = 10+i;
    chests[i].trapped = "testtrap";
  }
  
  Dice.roll = function(die) { return 60; }
  
  var resp = magic[1][GetSpellID(3)].executeSpell(castermob,0,0);
  
  assert.deepEqual(chests[0].trapped, "", "Looking at chest 0 (challenge = 10): expecting the trap to be removed.");
  assert.deepEqual(chests[1].trapped, "", "Looking at chest 1 (challenge = 11): expecting the trap to be removed.");
  assert.deepEqual(chests[2].trapped, "", "Looking at chest 2 (challenge = 12): expecting the trap to be removed.");
  assert.deepEqual(chests[3].trapped, "testtrap", "Looking at chest 3 (challenge = 13): expecting spell failed.");
  assert.deepEqual(chests[4].trapped, "testtrap", "Looking at chest 4 (challenge = 14): expecting spell failed.");
  assert.deepEqual(chests[5].trapped, "testtrap", "Looking at chest 5 (challenge = 15): expecting spell failed.");
  assert.deepEqual(chests[6].trapped, "testtrap", "Looking at chest 6 (challenge = 16): expecting spell failed.");
  assert.deepEqual(chests[7].trapped, "testtrap", "Looking at chest 7(challenge = 17): expecting spell failed.");

  maps.deleteMap("unittest");
});
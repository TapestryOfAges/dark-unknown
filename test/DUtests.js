
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

function DrawMainFrame() { }
function DrawCharFrame() {}
function ShowEffect(onwhat, duration, graphic, xoff, yoff) {}
function AnimateEffect(atk, def, fromcoords, tocoords, ammographic, destgraphic, sounds, param, doagain) {
  // new version that doesn't actually animate, and so has no time delays
  var type = param.type;
  var duration = param.duration;
  var ammoreturn = param.ammoreturn;
  var dmg = param.dmg;
  var dmgtype = param.dmgtype;
  var endturn = param.endturn;
  var retval = param.retval;
  var callback = param.callback;
  var ammocoords = GetCoordsWithOffsets(ammographic.fired, fromcoords, tocoords);
  var returnhtml;

//  var tablehtml = '<div id="animtable" style="position: absolute; left: ' + ammocoords.fromx + 'px; top: ' + ammocoords.fromy + 'px; z-index:40; background-image:url(\'graphics/' + ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + ammographic.xoffset + 'px ' + ammographic.yoffset + 'px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';

//  $("#combateffects").html(tablehtml);
  
//  $("#animtable").animate({ left: ammocoords.tox , top: ammocoords.toy } , duration, 'linear', function() {

//    $("#combateffects").html("");
//    var hitanimhtml = '<div id="hitdiv" style="position: absolute; left: ' + tocoords.x + 'px; top: ' + tocoords.y + 'px; z-index:40; background-image:url(\'graphics/' + destgraphic.graphic + '\');background-repeat:no-repeat; background-position: '+destgraphic.xoffset+'px 0px;"><img src="graphics/' + destgraphic.overlay + '" width="32" height="32" /></div>';

//    $("#combateffects").html(hitanimhtml);
//    setTimeout(function() {
//      $("#combateffects").html("");
//      if ((type !== "missile") || (!ammoreturn)) {
//        duration = 50;
//        ammographic.graphic = "spacer.gif";
//        ammographic.xoffset = 0;
//        ammographic.yoffset = 0;
//      }
//      returnhtml = '<div id="animtable" style="position: absolute; left: ' + ammocoords.tox + 'px; top: ' + ammocoords.toy + 'px; z-index:40; background-image:url(\'graphics/' + ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + ammographic.xoffset + 'px ' + ammographic.yoffset + 'px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';      
//      $("#combateffects").html(returnhtml);
//      $("#animtable").animate({ left: ammocoords.fromx , top: ammocoords.fromy } , duration, 'linear', function() {
        if (dmg != 0) {
          var stillalive = def.dealDamage(dmg, atk, dmgtype);    
          if (stillalive > -1) {
            var damagedesc = GetDamageDescriptor(def); 
            retval["txt"] += ": " + damagedesc + "!"; 
          }
          else { 
            if (def.specials.crumbles) { retval["txt"] += ": It crumbles to dust!"; }
            else {retval["txt"] += ": Killed!"; }
            
            if (def.getXPVal() && (atk === PC)) {
              retval["txt"] += " (XP gained: " + def.getXPVal() + ")";
            }
          }
        } 
        maintext.addText(retval["txt"]);
        maintext.setInputLine("&gt;");
        maintext.drawInputLine();

        if ((!doagain) && (endturn)) {
//          atk.endTurn(retval["initdelay"]);
        } else if (doagain) {
          var doit = doagain.shift();
//          AnimateEffect(doit.atk, doit.def, doit.fromcoords, doit.tocoords, doit.ammocoords, doit.destgraphic, doit.type, doit.duration, doit.ammoreturn, doit.dmg, endturn, doit.retval, doagain);
        }

//      });

//    }, 400);
//  });
  
}  

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
  var cure = magic[SPELL_CURE_LEVEL][SPELL_CURE_ID].executeSpell(castermob,0,0);
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
  var cure = magic[SPELL_CURE_LEVEL][SPELL_CURE_ID].executeSpell(castermob,1,0);
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
  var oldmana = castermob.getMana();
  var resp = magic[SPELL_DISARM_TRAP_LEVEL][SPELL_DISARM_TRAP_ID].executeSpell(castermob,0,0);
  
  assert.deepEqual(chests[0].trapped, "", "Looking at chest 0 (challenge = 10): expecting the trap to be removed.");
  assert.deepEqual(chests[1].trapped, "", "Looking at chest 1 (challenge = 11): expecting the trap to be removed.");
  assert.deepEqual(chests[2].trapped, "", "Looking at chest 2 (challenge = 12): expecting the trap to be removed.");
  assert.deepEqual(chests[3].trapped, "testtrap", "Looking at chest 3 (challenge = 13): expecting spell failed.");
  assert.deepEqual(chests[4].trapped, "testtrap", "Looking at chest 4 (challenge = 14): expecting spell failed.");
  assert.deepEqual(chests[5].trapped, "testtrap", "Looking at chest 5 (challenge = 15): expecting spell failed.");
  assert.deepEqual(chests[6].trapped, "testtrap", "Looking at chest 6 (challenge = 16): expecting spell failed.");
  assert.deepEqual(chests[7].trapped, "testtrap", "Looking at chest 7(challenge = 17): expecting spell failed.");
  assert.deepEqual(oldmana-castermob.getMana(), 1, "Cast spell- should have lost 1 mana.");
  
  oldmana = castermob.getMana();
  resp = magic[SPELL_DISARM_TRAP_LEVEL][SPELL_DISARM_TRAP_ID].executeSpell(castermob,1,0);
  
  assert.deepEqual(chests[0].trapped, "", "Looking at chest 0 (challenge = 10): expecting the trap to be removed.");
  assert.deepEqual(chests[1].trapped, "", "Looking at chest 1 (challenge = 11): expecting the trap to be removed.");
  assert.deepEqual(chests[2].trapped, "", "Looking at chest 2 (challenge = 12): expecting the trap to be removed.");
  assert.deepEqual(chests[3].trapped, "", "Looking at chest 3 (challenge = 13): expecting the trap to be removed.");
  assert.deepEqual(chests[4].trapped, "", "Looking at chest 4 (challenge = 14): expecting the trap to be removed.");
  assert.deepEqual(chests[5].trapped, "", "Looking at chest 5 (challenge = 15): expecting the trap to be removed.");
  assert.deepEqual(chests[6].trapped, "", "Looking at chest 6 (challenge = 16): expecting the trap to be removed.");
  assert.deepEqual(chests[7].trapped, "", "Looking at chest 7 (challenge = 17): expecting the trap to be removed.");
  assert.deepEqual(oldmana-castermob.getMana(), 2, "Cast spell- should have lost 2 mana.");

  maps.deleteMap("unittest");
});

QUnit.test("Test magic resistance calculation", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var castermob = localFactory.createTile("PaladinNPC"); // lvl 4
  testmap.placeThing(12,12,castermob);
  var tgtmob = localFactory.createTile("HeadlessNPC"); // lvl 2
  testmap.placeThing(13,13,tgtmob);
  
  // chance to resist should be: BASE_RESIST_CHANCE + tgt.getResist("magic") + tgt.getLevel()*5 - caster.getLevel()*5 - infused*15;
  // BASE RESIST CHANCE = 30
  // HeadlessNPC getResist = 10
  // tgt lvl = 2
  // caster lvl = 4
  // infused = 0
  // 20% chance of resist
  
  Dice.roll = function(die) { return 29; }
  var resist = CheckResist(castermob, tgtmob, 0, 0);
  assert.deepEqual(resist, 29, "Expected: resisted.");
  Dice.roll = function(die) { return 31; }
  resist = CheckResist(castermob, tgtmob, 0, 0);
  assert.deepEqual(resist, 0, "Expected: NOT resisted.");
  Dice.roll = function(die) { return 14; }
  resist = CheckResist(castermob, tgtmob, 1, 0);
  assert.deepEqual(resist, 14, "Expected: resisted.");
  Dice.roll = function(die) { return 16; }
  resist = CheckResist(castermob, tgtmob, 1, 0);
  assert.deepEqual(resist, 0, "Expected: NOT resisted.");

  maps.deleteMap("unittest");
});


QUnit.test("Test Distract spell", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var castermob = localFactory.createTile("PaladinNPC");
  castermob.setAttitude("Friendly");
  var tgt1mob = localFactory.createTile("HeadlessNPC");
  var tgt2mob = localFactory.createTile("DelverNPC");
  var tgt3mob = localFactory.createTile("HeadlessNPC");
  
  testmap.placeThing(4,7,castermob);
  testmap.placeThing(3,7,tgt1mob);
  testmap.placeThing(5,7,tgt2mob);
  testmap.placeThing(4,5,tgt3mob);  // far side of a wall
  
  assert.deepEqual(tgt1mob.getHitChance("melee"), (BASE_HIT_CHANCE+2*HIT_PER_LEVEL+5), "Checking chance to hit, pre-distraction.");
  
  Dice.roll = function(die) { return 70; }
  var oldmana = castermob.getMana();
  magic[SPELL_DISTRACT_LEVEL][SPELL_DISTRACT_ID].executeSpell(castermob, 0, 0);
  assert.deepEqual(castermob.getMana()-oldmana, -1, "Should have cost 1.");
  
  var distract = tgt1mob.getSpellEffectsByName("Distract");
  var isdistract = 0;
  if (distract) { isdistract = 1; }
  
  assert.deepEqual(isdistract, 1, "tgt1 should be distracted (failed resist)");
  assert.deepEqual(tgt1mob.getHitChance("melee"), (BASE_HIT_CHANCE+2*HIT_PER_LEVEL+5-7), "Checking chance to hit, post-distraction.");
  var endtime = distract.getExpiresTime();
  assert.deepEqual(endtime - DUTime.getGameClock(), 7*SCALE_TIME, "Duration should be 7 (scale time)");
  
  distract = tgt2mob.getSpellEffectsByName("Distract");
  isdistract = 0;
  if (distract) { isdistract = 1; }

  assert.deepEqual(isdistract, 0, "tgt2 should have resisted");

//  var loe = testmap.getLOS(castermob.getx(), castermob.gety(), tgt3mob.getx(), tgt3mob.gety(),losgrid,1);
//  alert(loe);

  distract = tgt3mob.getSpellEffectsByName("Distract");
  isdistract = 0;
  if (distract) { isdistract = 1; }
  
  assert.deepEqual(isdistract, 0, "tgt3 had no LoE");

  oldmana = castermob.getMana();  
  magic[SPELL_DISTRACT_LEVEL][SPELL_DISTRACT_ID].executeSpell(castermob, 1, 0);
  distract = tgt1mob.getSpellEffectsByName("Distract");
  assert.deepEqual(distract.getPower(), 7*1.5, "Power of infused distract should be 10.5");
  assert.deepEqual(tgt1mob.getHitChance("melee"), (BASE_HIT_CHANCE+2*HIT_PER_LEVEL+5-7*1.5), "Checking chance to hit, post-distraction.");
  assert.deepEqual(distract.getExpiresTime()-DUTime.getGameClock(), (1/1.5)*.07 + .105, "Extended duration of merged spells.");
  assert.deepEqual(castermob.getMana()-oldmana, -2, "Should have used 2 mana.");
  
  maps.deleteMap("unittest");
});

QUnit.test("Test Flame Blade spell", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var castermob = localFactory.createTile("PaladinNPC");
  testmap.placeThing(4,7,castermob);
  testmap.placeThing(0,0,PC);
  
  var wpn = castermob.getWeapon();
  Dice.roll = function(die) { return 10; }
  assert.deepEqual(wpn.rollDamage(castermob), 14, "Testing longsword base damage.");
  magic[SPELL_FLAME_BLADE_LEVEL][SPELL_FLAME_BLADE_ID].executeSpell(castermob,0,0);
  var fb = castermob.getSpellEffectsByName("FlameBlade");
  assert.deepEqual(fb.damage, DMG_NEGLIGABLE, "Checking FB damage.");
  assert.deepEqual(wpn.rollDamage(castermob), 24, "Testing longsword with flame damage.");  

  maps.deleteMap("unittest");
});

QUnit.test("Test Light spell", function( assert ) {
  
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var castermob = localFactory.createTile("PaladinNPC");
  testmap.placeThing(4,7,castermob);
  testmap.placeThing(0,0,PC);

  var oldmana = castermob.getMana();
  var oldlight = castermob.getLight();
  magic[SPELL_LIGHT_LEVEL][SPELL_LIGHT_ID].executeSpell(castermob,0,1);
  assert.deepEqual(castermob.getMana()-oldmana, 0, "Free spell!");
  assert.deepEqual(oldlight, 0, "Should have started unlit.");
  assert.deepEqual(castermob.getLight(), 2, "Lit!");
  assert.deepEqual(castermob.getSpellEffectsByName("Light").getExpiresTime()-DUTime.getGameClock(), 5, "duration test, free spell so duration === 5.");

  var castermob2 = localFactory.createTile("PaladinNPC");
  testmap.placeThing(5,7,castermob2);

  var oldmana = castermob2.getMana();
  var oldlight = castermob2.getLight();
  magic[SPELL_LIGHT_LEVEL][SPELL_LIGHT_ID].executeSpell(castermob2,0,0);
  assert.deepEqual(castermob2.getMana()-oldmana, -1, "1 mana!");
  assert.deepEqual(oldlight, 0, "Should have started unlit.");
  assert.deepEqual(castermob2.getLight(), 2, "Lit!");
  assert.deepEqual(castermob2.getSpellEffectsByName("Light").getExpiresTime()-DUTime.getGameClock(), 14*.3, "duration test, not free.");

  maps.deleteMap("unittest");
});

QUnit.test("Test Mend spell", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testsword = localFactory.createTile("UnenchantedSword"); 
  var testmap = maps.getMap("unittest");
  var castermob2 = localFactory.createTile("PaladinNPC");
  testmap.placeThing(2,3,castermob2);
  
  testmap.placeThing(2,2,testsword);
  assert.deepEqual(testsword.getFullDesc(),"an unenchanted, broken sword");
  assert.deepEqual(testsword.getGraphicArray()[0],"magic-sword.gif");
  assert.deepEqual(testsword.getGraphicArray()[2],"0");

  PerformMend(castermob2,0,0,testsword);
  assert.deepEqual(testsword.getFullDesc(),"an unenchanted, broken sword");
  assert.deepEqual(testsword.getGraphicArray()[0],"magic-sword.gif");
  assert.deepEqual(testsword.getGraphicArray()[2],"0");

  PerformMend(castermob2,1,0,testsword);

  assert.deepEqual(testsword.getFullDesc(),"an unenchanted sword");
  assert.deepEqual(testsword.getGraphicArray()[0],"magic-sword.gif");
  assert.deepEqual(testsword.getGraphicArray()[2],"-32");

  maps.deleteMap("unittest");  
});

QUnit.test("Test Vulnerability spell", function( assert ) {
  Dice.roll = function(die) { return 70; }
  
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var castermob = localFactory.createTile("PaladinNPC");
  testmap.placeThing(4,7,castermob);
  var tgtmob = localFactory.createTile("TownGuardNPC");
  testmap.placeThing(6,7,tgtmob);
  
  var olddef = tgtmob.getDefense();
  assert.deepEqual(olddef, 20+DEF_PER_LEVEL*5+13*DEF_PER_DEX, "Pre-vuln defense.");
  var vuln = PerformVulnerability(castermob, 0, 0, tgtmob);
  
  assert.deepEqual(tgtmob.getDefense(), 10+13*DEF_PER_DEX, "Post-vuln defense.");

  maps.deleteMap("unittest");
});

QUnit.test("Test Illusion spell", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var castermob = localFactory.createTile("PaladinNPC");
  testmap.placeThing(4,7,castermob);

  var ill = PerformIllusion(castermob,0,0,{x:2,y:3});
  assert.deepEqual(ill.txt, "You cannot place your illusion there.", "Got conjure fail response.");


  var ill2 = PerformIllusion(castermob,0,0,{x:2,y:7});
  assert.deepEqual(ill2.txt, "You conjure an illusion to aid you in battle.", "Got conjure response.");

  var tile = testmap.getTile(2,7);
  var npc = tile.getTopNPC();
  assert.deepEqual(npc.getName(), "IllusionNPC", "Checking that there is something called an illusion there.");

  maps.deleteMap("unittest");
});

QUnit.test("Test Iron Flesh spell", function( assert ) {
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var castermob = localFactory.createTile("PaladinNPC");
  testmap.placeThing(4,7,castermob);

  assert.deepEqual(CheckAbsorb(20,castermob,castermob,"physical"), 10, "Checking how much is absorbed before casting.");

  magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].executeSpell(castermob,0,0);
  
  assert.deepEqual(CheckAbsorb(20,castermob,castermob,"physical"), 5, "Checking how much is absorbed after casting, 1.");  
  assert.deepEqual(CheckAbsorb(20,castermob,castermob,"physical"), 5, "Checking how much is absorbed after casting, 2.");  
  assert.deepEqual(CheckAbsorb(20,castermob,castermob,"physical"), 10, "Checking how much is absorbed after casting, 3.");  

  maps.deleteMap("unittest");
});

QUnit.test("Test Lesser Heal spell", function( assert ) {
  Dice.roll = function(die) { return 8; }
  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var castermob = localFactory.createTile("PaladinNPC");
  testmap.placeThing(4,7,castermob);

  castermob.setHP(2);
  
  magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].executeSpell(castermob,0,0);
  
  assert.deepEqual(castermob.getHP(),10,"HP total after Lesser Heal.");
  magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].executeSpell(castermob,1,1);
  assert.deepEqual(castermob.getHP(),22,"HP total after infused Lesser Heal.");
  
  maps.deleteMap("unittest");
});

QUnit.test("Test Magic Bolt spell and resistance", function( assert ) {

  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var castermob = localFactory.createTile("PaladinNPC");
  testmap.placeThing(4,7,castermob);

  var tgtmob = localFactory.createTile("TownGuardNPC");
  testmap.placeThing(6,7,tgtmob);

  Dice.roll = function() {
    if (!Dice.rollnum) { Dice.rollnum = 1; }
    if (Dice.rollnum === 1) { Dice.rollnum++; return 10; } // dmg
    if (Dice.rollnum === 2) { Dice.rollnum++; return 10; } // +dmg
    if (Dice.rollnum === 3) { Dice.rollnum++; return 10; } // succeed at resist
    if (Dice.rollnum === 4) { Dice.rollnum++; return 10; } // dmg
    if (Dice.rollnum === 5) { Dice.rollnum++; return 10; } // +dmg
    if (Dice.rollnum === 6) { Dice.rollnum++; return 100; } // fail at resist
  }

  tgtmob.setHP(40);
  assert.deepEqual(tgtmob.getHP(),40,"HP set to 40.");
  
  var resp = PerformMagicBolt(castermob,0,0,tgtmob);
  assert.deepEqual(resp["fin"],-1,"Resp is -1 (spell cast, waiting for animation).");

//  var done = assert.async();
//  var duration = (Math.pow( Math.pow(tgtmob.getx() - castermob.getx(), 2) + Math.pow (tgtmob.gety() - castermob.gety(), 2)  , .5)) * 100 *2;
//  duration += 600;
  
//  setTimeout(function() {
    assert.deepEqual(tgtmob.getHP(),29,"Took 11 damage.");
//    done();
//  }, duration);

  tgtmob.setHP(40);
  
  resp = PerformMagicBolt(castermob,1,0,tgtmob);
  assert.deepEqual(tgtmob.getHP(),10,"Took 30 damage."); 

  maps.deleteMap("unittest");
});

QUnit.test("Test Poison Cloud", function( assert ) {

  var maps = new MapMemory();
  maps.addMap("unittest");
  var testmap = maps.getMap("unittest");

  var castermob = localFactory.createTile("PaladinNPC");
  testmap.placeThing(4,7,castermob);

  var tgtmob = localFactory.createTile("TownGuardNPC");
  testmap.placeThing(6,7,tgtmob);
  
  Dice.roll = function() {
    if (!Dice.rollnum) { Dice.rollnum = 1; }
    if (Dice.rollnum === 1) { Dice.rollnum++; return 100; } // fail resist
    if (Dice.rollnum === 2) { Dice.rollnum++; return 1; } // short duration
  }  
  
  resp = PerformPoisonCloud(castermob,0,0,{x:7,y:8});
  
  var poison = tgtmob.getSpellEffectsByName("Poison");
  assert.deepEqual(poison.getExpiresTime(),DUTime.getGameClock()+2,"Checking poison duration and incidentally, existence.");
  
  maps.deleteMap("unittest");
});

"use strict";

var magic = {};
var bookmark = {};

function SpellObject(name, incant, level, targets) {
  this.name = name;
  this.incant = incant;
  this.level = level;
  this.targets = targets;
  this.reduceresist = 0;
   
}
SpellObject.prototype = new Object();

SpellObject.prototype.getName = function() {
  return this.name;
}

SpellObject.prototype.setName = function(newname) {
  this.name = newname;
  return this.name;
}

SpellObject.prototype.getIncant = function() {
  return this.incant;
}

SpellObject.prototype.getLevel = function() {
  return this.level;
}

SpellObject.prototype.getTargets = function() {
  return this.targets;
}

SpellObject.prototype.getReduceResist = function() {
  return this.returnresist;
}

SpellObject.prototype.myTurn = function() {
  this.executeSpell();
  
	var spellEvent = new GameEvent(this);
  DUTime.addAtTimeInterval(SpellEvent,this.nextActionTime(1));
  
  var nextEntity = DUTime.executeNextEvent().getEntity();
  nextEntity.myTurn(); 
}

SpellObject.prototype.executeSpell = function(caster, infused) {
  // this will be overridden by each spell object

  var retval = {};
  retval["fin"] = 1;
  retval["txt"] = "";
  retval["input"] = "&gt;";
  
  return retval;
}

SpellObject.prototype.expireSpell = function() {
  DUTime.removeEntityFrom(this);
}

SpellObject.prototype.getManaCost = function(infuse) {
  var multiplier = 1;
  if (infuse) { multiplier = 2; }
  var cost = this.getLevel() * multiplier;
  return cost; 
}

function CheckResist (caster, tgt, infused, diffmod) {
  // Base chance, + bonus from armor
  // caster and target level each modify by 5% either way
  // 15% harder to resist if infused
  // caster having super-high Int (>20) makes spell 10% harder to resist
  var chance = BASE_RESIST_CHANCE + tgt.getResist("magic") + tgt.getLevel()*5 - caster.getLevel()*5 - infused*15;
  if (caster.getInt() > 20) { chance -= 10; }
  if (diffmod) { chance += diffmod; }
  
  if (chance < 0) { chance = 0; }
  
  if (tgt.getSpellEffectsByName("Curse")) { chance = chance/2; }
  
  var resist = Dice.roll("1d100-1");
  
  if (resist <= chance) {
    if (resist === 0) { resist = chance; }
    return resist; 
  } 
  return 0;
}

function GetSpellID(num) {
  var spellid = (Math.pow(2,(num-1)));
  return spellid;
}

for (var i=1;i<=8;i++) {
  magic[i] = {};
}

magic[1][GetSpellID(1)] = new SpellObject("Awaken", "An Zu", 1, 1);      // heal?
magic[1][GetSpellID(2)] = new SpellObject("Cure", "An Nox", 1, 0);      // heal
magic[1][GetSpellID(3)] = new SpellObject("Disarm Trap", "An Jux", 1, 0);   // sound effect is sfx_unlock
magic[1][GetSpellID(4)] = new SpellObject("Distract", "An Wis Xen", 1, 0);  // debuff
magic[1][GetSpellID(5)] = new SpellObject("Flame Blade", "Flam Bet Ylem", 1, 0);     // flames
magic[1][GetSpellID(6)] = new SpellObject("Light", "In Lor", 1, 0);  // has sound
magic[1][GetSpellID(7)] = new SpellObject("Mend", "In Mani Ylem", 1, 1);  // heal?
magic[1][GetSpellID(8)] = new SpellObject("Vulnerability", "An Sanct", 1, 1);  // melee hit

magic[2][GetSpellID(1)] = new SpellObject("Illusion", "Quas Xen", 2, 1);  // generic
magic[2][GetSpellID(2)] = new SpellObject("Iron Flesh", "Sanct Ylem Mani", 2, 0);   // blessing?
magic[2][GetSpellID(3)] = new SpellObject("Lesser Heal", "Bet Mani", 2, 0);   // heal
magic[2][GetSpellID(4)] = new SpellObject("Magic Bolt", "Grav Por", 2, 1);   // attack spell, missile hit?
magic[2][GetSpellID(5)] = new SpellObject("Poison Cloud", "In Nox Hur", 2, 1);  // generic
magic[2][GetSpellID(6)] = new SpellObject("Protection", "In Sanct", 2, 0);   // blessing
magic[2][GetSpellID(7)] = new SpellObject("Unlock", "Ex Por", 2, 0);     // sfx_unlock
magic[2][GetSpellID(8)] = new SpellObject("Wind Change", "Rel Hur", 2, 0);     // whoosh?

magic[3][GetSpellID(1)] = new SpellObject("Dispel", "An Bet Ort", 3, 0);   // heal?
magic[3][GetSpellID(2)] = new SpellObject("Disrupt Undead", "An Xen Corp", 3, 0);   // attack spell
magic[3][GetSpellID(3)] = new SpellObject("Fire Armor", "In Sanct Flam", 3, 0);  // flames
magic[3][GetSpellID(4)] = new SpellObject("Fireball", "Flam Por", 3, 1);  // attack spell, explosion
magic[3][GetSpellID(5)] = new SpellObject("Iceball", "Frio Por", 3, 1);  // attack spell, glass shatter
magic[3][GetSpellID(6)] = new SpellObject("Telekinesis", "Ylem Por", 3, 1);   // generic
magic[3][GetSpellID(7)] = new SpellObject("Telepathy", "Rel Wis", 3, 0);   // generic
magic[3][GetSpellID(8)] = new SpellObject("Wall of Flame", "Kal Flam", 3, 1);    // flames

magic[4][GetSpellID(1)] = new SpellObject("Blessing", "In Mani Xen", 4, 0);  // blessing
magic[4][GetSpellID(2)] = new SpellObject("Blink", "Rel Por", 4, 0);  // blessing
magic[4][GetSpellID(3)] = new SpellObject("Ethereal Vision", "In Wis", 4, 0);  // blessing
magic[4][GetSpellID(4)] = new SpellObject("Heal", "In Mani", 4, 0);  // heal
magic[4][GetSpellID(5)] = new SpellObject("Life Drain", "In Corp Mani", 4, 1);  // # M Dam  curse
magic[4][GetSpellID(6)] = new SpellObject("Smite", "Corp Por", 4, 0);  // # M Dam on 3 random nearby foes   attack spell, thunder
magic[4][GetSpellID(7)] = new SpellObject("Transport", "Vas Rel Por", 4, 0);    // teleport (effect generated from moongate)
magic[4][GetSpellID(8)] = new SpellObject("Water Walk", "Uus Xen", 4, 0);   // blessing
 
magic[5][GetSpellID(1)] = new SpellObject("Crystal Barrier", "In Ylem Sanct", 5, 1);  // generic?
magic[5][GetSpellID(2)] = new SpellObject("Mirror Ward", "Ort Sanct", 5, 0);  // blessing
magic[5][GetSpellID(3)] = new SpellObject("Paralyze", "An Ex Por", 5, 1);    // curse
magic[5][GetSpellID(4)] = new SpellObject("Peer", "Vas Wis", 5, 0);    // generic?
magic[5][GetSpellID(5)] = new SpellObject("Return", "Kal Ort Por", 5, 0);    // none (moongate)
magic[5][GetSpellID(6)] = new SpellObject("Shockwave", "Vas Grav Por Ylem", 5, 0);   // # M Dam in ring around caster, pushes back  // thunder
magic[5][GetSpellID(7)] = new SpellObject("Summon Ally", "Kal Xen", 5, 1);   // generic
magic[5][GetSpellID(8)] = new SpellObject("Swordstrike", "Vas Jux Ylem", 5, 1);  // attack spell, melee hit  # H Dam to single, L to surrounding foes  

magic[6][GetSpellID(1)] = new SpellObject("Empower", "In Ort Ylem", 6, 0);  // bless
magic[6][GetSpellID(2)] = new SpellObject("Explosion", "Vas Flam Por", 6, 1);  // explosion
magic[6][GetSpellID(3)] = new SpellObject("Jinx", "Vas Quas", 6, 0);  // curse
magic[6][GetSpellID(4)] = new SpellObject("Mass Curse", "Vas An Sanct", 6, 0);  // curse
magic[6][GetSpellID(5)] = new SpellObject("Negate Magic", "An Ort", 6, 0);  // curse
magic[6][GetSpellID(6)] = new SpellObject("Storm", "In Grav Hur", 6, 0);  // lightning zap
magic[6][GetSpellID(7)] = new SpellObject("Tremor", "In Rel Ylem", 6, 0);  // ??
magic[6][GetSpellID(8)] = new SpellObject("Weather Control", "In Vas Rel Hur", 6, 0);  // whoosh?

magic[7][GetSpellID(1)] = new SpellObject("Charm", "An Xen Ex", 7, 1);   // curse
magic[7][GetSpellID(2)] = new SpellObject("Ethereal Travel", "Rel Ex Ylem", 7, 0);   // ?? none (moongate?) (red)
magic[7][GetSpellID(3)] = new SpellObject("Fear", "Quas Wis", 7, 0);   // curse
magic[7][GetSpellID(4)] = new SpellObject("Fire and Ice", "Vas Frio Flam Ex Por", 7, 1);  // explosion, glass shatter
magic[7][GetSpellID(5)] = new SpellObject("Invulnerability", "In Vas Sanct", 7, 0);   // bless
magic[7][GetSpellID(6)] = new SpellObject("Meteor Swarm", "Vas Flam Ylem", 7, 0);  // explosion
magic[7][GetSpellID(7)] = new SpellObject("Mind Blast", "An Wis Ort", 7, 1);  // ??
magic[7][GetSpellID(8)] = new SpellObject("Permanence", "In Vas Ort Tym", 7, 0);  // bless 

magic[8][GetSpellID(1)] = new SpellObject("Armageddon", "Kal Vas An Mani Corp Xen", 8, 0); // ??
magic[8][GetSpellID(2)] = new SpellObject("Arrow of Glass", "Corp Ylem", 8, 1);  // glass shatter
magic[8][GetSpellID(3)] = new SpellObject("Build Gate", "In Ort Rel Por Ylem", 8, 1);  // ??
magic[8][GetSpellID(4)] = new SpellObject("Conflagration", "In Vas Grav Flam Hur", 8, 1);  // explosion
magic[8][GetSpellID(5)] = new SpellObject("Conjure Daemon", "Kal Vas Des Xen", 7, 1);  // generic
magic[8][GetSpellID(6)] = new SpellObject("Quickness", "Rel Tym", 8, 0);   // bless
magic[8][GetSpellID(7)] = new SpellObject("Reincarnate", "An Corp", 8, 0);  // bless
magic[8][GetSpellID(8)] = new SpellObject("Time Stop", "An Tym", 8, 0);  // bless

// Awaken
magic[1][GetSpellID(1)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Awaken.<br />");
  if (caster !== PC) {
    var resp = PerformAwaken(caster, infused, free, tgt);
    return resp;
  }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Awaken";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "npc"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 0;
  gamestate.setMode("target");
  return resp;
}
  
function PerformAwaken(caster, infused, free, tgt) {
  var resp = {};
  resp["fin"] = 1;
  var desc = "";

  if (caster.getHomeMap().getLOE(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[1][GetSpellID(1)].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
    
  var sleep = tgt.getSpellEffectsByName("Sleep");
  if (sleep) {
    sleep.endEffect();
    ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
    if (tgt !== PC) {
      desc = tgt.getDesc() + " is awake!";
    } else {
      desc = "You are awakened!";
    }
  }
  else {
    desc = tgt.getDesc() + " is not asleep- no effect.";
  }
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);

  resp["txt"] = desc;
  resp["input"] = "&gt;";
  return resp;
}

// Cure
magic[1][GetSpellID(2)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Cure.<br /></span>"); }
  DebugWrite("magic", "Casting Cure.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  var effects = caster.getSpellEffects();
  if (effects) {
    for (var i=0; i<effects.length; i++) {
      if (effects[i].getName() === "Poison") {
        ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
        if (caster === PC) {
          maintext.addText("You are cured of poison!");
        }
        effects[i].endEffect();
      }
      if ((infused) && (effects[i].getName() === "Disease")) {
        effects[i].endEffect();
        if (caster === PC) {
          maintext.addText("You are cured of disease!");
        }
        ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
      }
    }
  }
  if (infused) {
    var die = caster.getLevel() + "d4+2";
    var heal = Dice.roll(die);
    caster.healMe(heal, caster);
  }
  return resp;
}

// Disarm Trap
magic[1][GetSpellID(3)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Disarm Trap.<br /></span>"); }
  DebugWrite("magic", "Casting Disarm Trap.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  var mult = 1;
  var power = caster.getInt();
  if (free) {
    power = 15;
  }
  if (infused) { mult = 2; }
  for (var i = -1; i<=1; i++) {
    for (var j = -1; j<=1; j++) {
      var checkx = caster.getx() + i;
      var checky = caster.gety() + j;
      var castermap = caster.getHomeMap();
      var thetile = castermap.getTile(checkx,checky)
      if (thetile === "OoB") { continue; }
      var allfeatures = thetile.getFeatures();
      $.each(allfeatures, function(idx, val) {
        if (val.trapped) {
          var chance = ((power*mult + 10) - (val.trapchallenge)) /20;
          if (chance < .05) { chance = .05; }
          var roll = Dice.roll("1d100")/100;
          if (roll <= chance) { 
            val.disarmTrap(); 
            maintext.addText("Trap disarmed!"); 
            ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_ORANGE);
          }
          else { 
            maintext.addText("Trap resists."); 
            ShowEffect(val, 500, "X.gif");
          }
        }
      });
    }
  }
  return resp;
}

// Distract
magic[1][GetSpellID(4)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Distract.<br /></span>"); }
  DebugWrite("magic", "Casting Distract.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var radius = 3;
  if (!free & caster.getInt() > 20) { radius = 4; }
  if (infused) { radius = radius * 1.5; } 
  var power = caster.getInt()/2;
  if (free) { power = Dice.roll("1d3+7"); }
  if (infused) { power = power*1.5; }
  var castermap = caster.getHomeMap();
  var npcs = castermap.npcs.getAll();
  $.each(npcs, function (idx, val) {
    if (val.getAttitude() !== caster.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),losgrid,1) < LOS_THRESHOLD )) {
        if (!CheckResist(caster,val,infused,0)) {
          var distract = localFactory.createTile("Distract");
          ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
          var desc = val.getDesc() + " is distracted!";
          if (val === PC) {
            desc = "You are distracted!";
          }
          var duration = power * SCALE_TIME;
          distract.setExpiresTime(duration + DUTime.getGameClock());
          distract.setPower(power);
          val.addSpellEffect(distract);
        } else {
          var desc = val.getDesc() + " resists!";
          if (val === PC) {
            desc = "You resist.";
            // no X over the PC
          } else {
            ShowEffect(val, 700, "X.gif");
          }
        }
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        maintext.addText(desc);
      }
    }
  });

  return resp;
}

// Flame Blade
magic[1][GetSpellID(5)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Flame Blade.<br /></span>"); }
  DebugWrite("magic", "Casting Flame Blade.<br />");
  var resp = {};
  if ((caster.getWeapon() === "Fists") || (caster.getWeapon() === "NaturalWeapon")) {
    if (caster === PC) {
      maintext.addText("You must have a weapon equipped.");
    }
    resp["fin"] = 0;
    return resp;  
  }
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  var flameblade = localFactory.createTile("FlameBlade");
  duration = caster.getInt() * 2 * SCALE_TIME;
  if (free) { duration = 30*SCALE_TIME; }
  flameblade.uses = 1;
  flameblade.damage = DMG_NEGLIGABLE;
  flameblade.power = 2;
  
  if (infused) { 
    duration = duration * 2; 
    flameblade.uses = Dice.roll("1d4+1");
    flameblade.damage = DMG_LIGHT;
    flameblade.power = 3;
  }
  var endtime = duration + DUTime.getGameClock();
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: End time is " + endtime + ".<br /></span>"); }
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  flameblade.setExpiresTime(endtime);
  caster.addSpellEffect(flameblade);
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
  
  return resp;
}

// Light
magic[1][GetSpellID(6)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Light.<br /></span>"); }
  DebugWrite("magic", "Casting Light.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var liobj = localFactory.createTile("Light");
  
  var dur = caster.getInt() * .3;
  if (free) { dur = 5; }
  if (infused) {dur = dur * 3; }
  var endtime = dur + DU.DUTime.getGameClock();
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  if (infused) { liobj.setPower(4); }   // defaults to 2
  
  DUPlaySound("sfx_spell_light"); 
  caster.addSpellEffect(liobj);
//  liobj.applyEffect();
  
  DrawCharFrame();
  return resp;
}

// Mend
magic[1][GetSpellID(7)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Mend.<br />");
  var resp = {};
  resp["fin"] = 1;
  
  var inv = caster.getInventory();
  var anything = 0;
  $.each(inv, function(idx, val) {
    if (val.broken) {
      anything = 1;
    }
  });
  
  if (!anything) {
    resp["fin"] = 2;
    maintext.addText("You have nothing in need of Mending.");
    return resp;
  }
}

// Vulnerability
magic[1][GetSpellID(8)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Vulnerability.<br />");
  var resp = {};
  resp["fin"] = 1;
  if (caster !== PC) {
    resp = PerformVulnerability(caster, infused, free, tgt);
    return resp;
  }
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Vulnerability";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "npc"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 0;
  gamestate.setMode("target");
  return resp;
}
  
function PerformVulnerability(caster, infused, free, tgt) {
  var resp = {};
  resp["fin"] = 1;
  var desc = "";

  if (caster.getHomeMap().getLOE(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[1][GetSpellID(8)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  
  if (!CheckResist(caster,tgt,infused,0)) {
    var vulobj = localFactory.createTile("Vulnerability");
  
    var dur = caster.getInt()/2;
    if (infused) { dur = dur * 1.5;}
    if (free) { dur = Dice.roll("1d4+5"); }
    ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
    if (tgt !== PC) {
      desc = tgt.getDesc() + " is vulnerable!";
    } else {
      desc = "You are vulnerable!";
    }
    vulobj.setExpiresTime(dur + DUTime.getGameClock());
    var power = 4;
    if (infused) { power = 6; }
    vulobj.setPower(power);
    tgt.addSpellEffect(vulobj);
  }
  else {
    desc = tgt.getDesc() + " resists!";
    if (tgt === PC) {
      desc = "You resist.";
      // no X over the PC
    } else {
      ShowEffect(val, 700, "X.gif");
    }
  }
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
//  maintext.addText(desc);
  resp["txt"] = desc;
  resp["input"] = "&gt;";
  return resp;
}

// Illusion
magic[2][GetSpellID(1)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Illusion.<br />");
  
  if (caster !== PC) {
    var resp = PerformIllusion(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Illusion.<br /></span>"); }

  var resp = {};
  
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  // check for existing illusion if I want to limit to just 1, but for now I don't
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Illusion";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "open"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 3;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose where to conjure- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformIllusion(caster, infused, free, tgt) {
  var resp = {};
  resp["fin"] = 1;
  var desc = "";

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.x, tgt.x, losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "You cannot place your illusion there.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  if (!free) {
    var mana = magic[2][GetSpellID(1)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  var illusion;
  if (infused) {
    illusion = localFactory.createTile("InfusedIllusionNPC");
  } else {
    illusion = localFactory.createTile("IllusionNPC");
  }
  
  var duration = caster.getInt();
  if (free) { duration = Dice.roll("1d6+12"); }
  duration = duration*2*SCALE_TIME;
  illusion.expiresTime = DUTime.getGameClock() + duration;  // illusion AI needs to check expiresTime and go poof if it is reached
  caster.getHomeMap().placeThing(tgt.x,tgt.y,illusion);
  DrawMainFrame("one",caster.getHomeMap().getName(),illusion.getx(),illusion.gety());
  
  resp["txt"] = "You conjure an illusion to aid you in battle.";
  resp["input"] = "&gt;";
  return resp;

}

// Iron Flesh
magic[2][GetSpellID(2)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Iron Flesh.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var liobj = localFactory.createTile("IronFlesh");
  
  var dur = caster.getInt() * .15;
  if (free) { dur = 3; }
  if (infused) {dur = dur * 2; }
  var endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  var power = 10;
  if (infused) { power = 25;}   
  liobj.setPower(power);
  
//  DUPlaySound("sfx_spell_light"); 
  caster.addSpellEffect(liobj);
  
  DrawCharFrame();
  return resp;
}

// Lesser Heal
magic[2][GetSpellID(3)].executeSpell = function(caster, infused, free, tgt) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Lesser Heal.<br /></span>"); }
  DebugWrite("magic", "Casting Lesser Heal.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var lvl = Math.ceil(caster.getLevel()/2);
  var plus = caster.getLevel();
  if (free) { 
    lvl = Dice.roll("1d2+2"); 
    plus = Dice.roll("1d3+2");
  }
  
  var healamt = Dice.roll(lvl + "d8+" + plus);
  if (infused) { healamt = healamt * 1.5; }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Healing " + healamt + " hp.<br /></span>"); }
  DebugWrite("magic", "Healing " + healamt + " hp.<br />");
  
  if (caster === PC) {
    tgt = caster;
  }
  
  ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
  tgt.healMe(healamt, caster);
  resp["txt"] = "You feel better!";
  
  return resp;
  
}

// Magic Bolt
magic[2][GetSpellID(4)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Magic Bolt.<br />");
  if (caster !== PC) {
    var resp = PerformMagicBolt(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Magic Bolt.<br /></span>"); }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Magic Bolt";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "npc"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformMagicBolt(caster, infused, free, tgt) {
  gamestate.setMode("null");
  var resp = {};
  resp["fin"] = 1;
  var desc = tgt.getDesc();

  if (caster.getHomeMap().getLOE(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[2][GetSpellID(4)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
//  var dmg = Dice.roll("2d6+" + Math.floor(caster.getInt()/5));
  var power = caster.getInt();
  if (free) { power = Dice.roll("1d5+12"); }
  var dmg = RollDamage(DMG_NEGLIGABLE, Math.floor(power/5)+1);
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Dealing " + dmg + " damage.<br /></span>"); }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  var boltgraphic = {};
  boltgraphic.graphic = "magic-bolt.gif";
  boltgraphic.yoffset = 0;
  boltgraphic.xoffset = 0;
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);
  var descval = {txt: desc};

  var sounds = {};
  var fromcoords = getCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  var tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  var duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  var destgraphic = {graphic:"702.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
  AnimateEffect(caster, tgt, fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"force"});
  //  maintext.addText(desc);
  resp["fin"] = -1;
  return resp;
}

// Poison Cloud
magic[2][GetSpellID(5)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Poison Cloud.<br />");
  if (caster !== PC) {
    var resp = PerformPoisonCloud(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Poison Cloud.<br /></span>"); }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Poison Cloud";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "open"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformPoisonCloud(caster, infused, free, tgt) {
  gamestate.setMode("null");
  var resp = {};
  resp["fin"] = 1;

  var tgtmap = caster.getHomeMap();
  if (tgtmap.getLOE(caster.getx(), caster.gety(), tgt.x, tgt.y, losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach there!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[2][GetSpellID(5)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var power = caster.getInt();
  if (free) { power = Dice.roll("1d5+12"); }  
  var radius = Math.floor(power/10) +1; 
    
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Calculating poison cloud.<br /></span>"); }
  DebugWrite("magic", "Calculating poison cloud.<br />");
  $.each(tgtmap.npcs.getAll(), function(idx, val) {
    if ((GetDistance(val.getx(),val.gety(),tgt.x,tgt.y) < radius) && (val !== caster)) {
      if (tgtmap.getLOE(val.getx(),val.gety(),tgt.x,tgt.y) < LOS_THRESHOLD) {
        if (CheckResist(caster,val,infused,0) || (val.getSpellEffectsByName("Poison"))) {
          // poison resisted
          ShowEffect(val, 700, "X.gif");
          var desc = val.getDesc() + " resists!";
          if (val === PC) {
            desc = "You resist!";
          }
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);        
          maintext.addText(desc);
        } else {
          ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_GREEN);
          var desc = val.getDesc() + " is poisoned!";
          if (val === PC) {
            desc = "You are poisoned!";
          }
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);        
          maintext.addText(desc);
          var poisontile = localFactory.createTile("Poison");
          var duration = (Dice.roll("2d10") + power - 15);
          if (duration < 2) { duration = 2; }
          duration = duration * SCALE_TIME;
          poison.setExpiresTime(duration + DUTime.getGameClock());
          val.addSpellEffect(poison);
          // poisoned!
          
          if (infused) {
            var dmg = Dice.roll(DMG_LIGHT);
            val.dealDamage(dmg,caster,"poison");
            // additionally deals some damage
          }
        }
      }
    }
  });
    
  return resp;
}

// Protection
magic[2][GetSpellID(6)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Protection.<br /></span>"); }
  DebugWrite("magic", "Casting Protection.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  var prot = localFactory.createTile("Protection");
  duration = caster.getInt() * 3 * SCALE_TIME;
  var power = Math.floor(caster.getInt()*2/3)+1;
  if (infused) { 
    duration = duration * 2; 
    power = Math.floor(power*3/2);
  }
  if (free) {
    duration = 40 * SCALE_TIME;
    power = Dice.roll("1d5+8");
  }
  var endtime = duration + DUTime.getGameClock();
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: End time is " + endtime + ".<br /></span>"); }
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  prot.setExpiresTime(endtime);
  prot.setPower(power);
  caster.addSpellEffect(prot);
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  
  return resp;
}

// Unlock
magic[2][GetSpellID(7)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Unlock.<br /></span>"); }
  DebugWrite("magic", "Casting Unlock.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var castermap = caster.getHomeMap();
  var features = castermap.features.getAll();
  $.each(features, function (idx, val) {
    if (typeof val.getLocked == "function") {
      if (GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) <= 1) {
        var lock = val.getLocked();
        if ((lock === 1) || ((lock === 2) && (infused))) {
          val.unlockMe();
          DrawMainFrame("one", castermap.getName(), val.getx(), val.gety());
          var desc = "The " + val.getDesc() + " is unlocked.";
          ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_ORANGE);
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);      
          maintext.addText(desc);
        }
      }
    }
  });

  return resp;
}

// Wind Change
magic[2][GetSpellID(8)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Wind Change.<br />");
  if (caster !== PC) {
    var resp = PerformWindChange(caster, infused, free, tgt);
    return resp;
  }

  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Wind Change";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "dir"};

  resp["txt"] = "";
  resp["input"] = "&gt; Choose direction- ";
  resp["fin"] = 4;
  gamestate.setMode("choosedir");
  return resp;
}

function PerformWindChange(caster,infused,free,tgt) {
  var dir = "";
  var resp = {};
  resp["fin"] = 1;
  if (tgt[0] > 0) { dir = "east"; }
  else if (tgt[0] < 0) { dir = "west"; }
  else if (tgt[1] > 0) { dir = "south"; }
  else if (tgt[1] > 0) { dir = "north"; }
  else {
    maintext.addText("The wind swirls in confused directions.");
    return resp; 
  }
  var desc = "wind";
  if (infused) {desc = "gale";}
  maintext.addText("The breeze shifts as you summon a " + desc + " from the " + dir + "!");
  return resp;
}

// Dispel 
magic[3][GetSpellID(1)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Dispel.<br />");
  var resp = {};
  resp["fin"] = 1;
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var casterspells = caster.getSpellEffects();
  var dispellables = [];
  $.each(casterspells, function(idx, val) {
    if (val.dispellable) { dispellables.push(val); }
  });
  if (dispellables.length > 0) {
    var idx = Math.floor(Math.random()*dispellables.length);
    var lvl = dispellables[idx].getLevel();
    DebugWrite("magic", "Attempting to dispel " + dispellables[idx] + ", which is level " + lvl + ".");
    var chance = .8 - .1*lvl;
    if (infused) { chance += .3; }
    if (Math.random() < chance) {
      maintext.addText("You dispel " + dispellables[idx].getDesc() + "!");
      dispellables[idx].endEffect();
    } else {
      maintext.AddText("You attempt to dispel " + dispellables[idx].getDesc() + ", but it fails.");
    }
  } else {
    maintext.addText("There are no effects upon you that can be dispelled.");
  }
  return resp;
}
  
  
// Disrupt Undead
magic[3][GetSpellID(2)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Disrupt Undead.<br /></span>"); }
  DebugWrite("magic", "Casting Disrupt Undead.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var castermap = caster.getHomeMap();
  var npcs = castermap.npcs.getAll();
  var hitany = 0;
  $.each(npcs, function (idx, val) {
    if (val.special.indexOf("undead") > -1) {
      if (GetDistance(val.getx(),val.gety(), caster.getx(), caster.gety()) < 8) {
        var dmg = RollDamage(DMG_MEDIUM);
        if (infused) {
          dmg *= 1.5;
        }
        if (CheckResist(caster,val,infused,0)) { dmg = (dmg/2)+1; }
//        if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Found " + val.getName() + " , dealing it " + dmg + " damage.<br /></span>"); }
        DebugWrite("magic", "Found " + val.getName() + " , dealing it " + dmg + " damage.<br />");
        val.dealDamage(dmg);
        ShowEffect(val, 700, "702.gif", 0, 0);
        var desc = val.getDesc() + " disrupted!";
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);      
        maintext.addText(desc);
        hitany = 1;
      }
    }
  });
  if (!hitany) {
    maintext.addText("No undead within range.");
  }

  return resp;
}

// Fire Armor
magic[3][GetSpellID(3)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Fire Armor.<br /></span>"); }
  DebugWrite("magic", "Casting Fire Armor.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  var prot = localFactory.createTile("FireArmor");
  duration = caster.getInt() * 3 * SCALE_TIME;
  if (free) { duration = Dice.roll("1d6 + 12") * 3 * SCALE_TIME; }
  var power = DMG_NEGLIGABLE;
  if (infused) { 
    duration = duration * 2; 
    power = DMG_LIGHT;
  }
  var endtime = duration + DUTime.getGameClock();
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: End time is " + endtime + ".<br /></span>"); }
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  prot.setExpiresTime(endtime);
  prot.setPower(power);
  caster.addSpellEffect(prot);
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
  
  return resp;
}

// Fireball
magic[3][GetSpellID(4)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Fireball.<br />");
  if (caster !== PC) {
    var resp = PerformFireball(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Fireball.<br /></span>"); }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Fireball";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "npc"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformFireball(caster, infused, free, tgt) {
  gamestate.setMode("null");
  var resp = {};
  resp["fin"] = 1;
  var desc = tgt.getDesc();

  if (caster.getHomeMap().getLOE(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[3][GetSpellID(4)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
//  var dmg = Dice.roll("2d6+" + Math.floor(caster.getInt()/5));
  var dmg = RollDamage(DMG_MEDIUM);
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Dealing " + dmg + " damage.<br /></span>"); }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  var boltgraphic = {};
  boltgraphic.graphic = "fireicelightning.gif";
  boltgraphic.yoffset = 0;
  boltgraphic.xoffset = 0;
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);
  var descval = {txt: desc};

  var sounds = {};
  var fromcoords = getCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  var tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  var duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  var destgraphic = {graphic:"702.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
  AnimateEffect(caster, tgt, fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"fire"});
  //  maintext.addText(desc);
  resp["fin"] = -1;
  return resp;
}

// Iceball
magic[3][GetSpellID(5)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Iceball.<br />");
  if (caster !== PC) {
    var resp = PerformIceball(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Iceball.<br /></span>"); }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Iceball";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "npc"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformIceball(caster, infused, free, tgt) {
  gamestate.setMode("null");
  var resp = {};
  resp["fin"] = 1;
  var desc = tgt.getDesc();

  if (caster.getHomeMap().getLOE(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[3][GetSpellID(5)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
//  var dmg = Dice.roll("2d6+" + Math.floor(caster.getInt()/5));
  var dmg = RollDamage(DMG_LIGHT);
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Dealing " + dmg + " damage.<br /></span>"); }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  var frozen = localFactory.createTile("Slow");
  var dur = caster.getInt()/3;
  if (free) { dur = Dice.roll("1d2+3"); }
  var endtime = dur*SCALE_TIME + DU.DUTime.getGameClock();
  frozen.setExpiresTime(endtime);
  tgt.addSpellEffect(frozen);
  
  var boltgraphic = {};
  boltgraphic.graphic = "fireicelightning.gif";
  boltgraphic.yoffset = -32;
  boltgraphic.xoffset = 0;
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);
  var descval = {txt: desc};

  var sounds = {};
  var fromcoords = getCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  var tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  var duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  var destgraphic = {graphic:"702.2.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
  AnimateEffect(caster, tgt, fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"ice"});
  //  maintext.addText(desc);
  resp["fin"] = -1;
  return resp;
}

// Telekinesis
magic[3][GetSpellID(6)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Telekinesis.<br />");
  if (caster !== PC) {
    var resp = PerformTelekinesis(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Telekinesis.<br /></span>"); }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Telekinesis";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "usable"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 0;
  gamestate.setMode("target");
  return resp;
}

function PerformTelekinesis(caster, infused, free, tgt) {
  gamestate.setMode("null");
  
  var retval = {};
  if (!free) {
    var mana = magic[3][GetSpellID(6)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (tgt.heavy && !infused) {
    retval["fin"] = 1;
    retval["txt"] = "That object is too heavy.";
    retval["override"] = 1;
  }
  else {
    retval = tgt.use(caster);
  }
  retval["input"] = "&gt;";
  if (retval["override"] === 1) {
    delete retval["override"]; 
  } else {
    var usemap = tgt.getHomeMap();
    var localacre = usemap.getTile(tgt.getx(),tgt.gety());
    retval["fin"] = 1;
    var usedname = tgt.getDesc();
    usedname = usedname.replace(/^a /, "");
    retval["txt"] = "Telekinesis on " + usedname + ": " + retval["txt"];
    var drawtype = "one";
    if (tgt.checkType("Consumable")) {
      usemap.deleteThing(used);
    }
    if (retval["redrawtype"]) {
      delete retval["redrawtype"];
      // if more of the map needs to be redrawn, need to recheck light sources

      $.each(localacre.localLight, function(index, value) {
      // each object that is casting light on the door might be casting light through the door.
        var lightsource = usemap.lightsList[index];
        usemap.removeMapLight(index, usemap.lightsList[index].getLight(), usemap.lightsList[index].getx(), usemap.lightsList[index].gety());
        usemap.setMapLight(lightsource, lightsource.getLight(), lightsource.getx(), lightsource.gety());
      });
		  
      DrawMainFrame("draw",usemap.getName(),PC.getx(),PC.gety());
    } else {		
      DrawMainFrame("one",usemap.getName(),tgt.getx(),tgt.gety());
    }
  }
  return retval;
}

// Telepathy
magic[3][GetSpellID(7)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Telepathy.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  var prot = localFactory.createTile("Telepathy");
  duration = caster.getInt() * 2 * SCALE_TIME;
  if (free) { duration = Dice.roll("1d6 + 12") * 2 * SCALE_TIME; }
  if (infused) { 
    duration = duration * 2; 
  }
  var endtime = duration + DUTime.getGameClock();
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  prot.setExpiresTime(endtime);
  caster.addSpellEffect(prot);
  
  return resp;
}

// Wall of Flame
magic[3][GetSpellID(8)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Wall of Flame.<br />");
  if (caster !== PC) {
    var resp = PerformWallOfFlame(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Wall of Flame.<br /></span>"); }
  var resp = {};
  
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Wall of Flame";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "open"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose where to conjure- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformWallOfFlame(caster, infused, free, tgt) {
  var resp = {};
  resp["fin"] = 1;
  resp["input"] = "&gt;";
  var desc = "";

  var castermap = caster.getHomeMap();
  if (castermap.getLOS(caster.getx(), caster.gety(), tgt.x, tgt.x, losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "You cannot cast this spell there.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  if (!free) {
    var mana = magic[3][GetSpellID(6)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  var duration = caster.getInt() * SCALE_TIME;
  if (infused) { duration = duration * 2; }
  var expires = duration + DU.DUTime.getGameClock();
  
  // make the first firefield
  var field1 = localFactory.createTile("FireField");
  castermap.placeThing(tgt.x, tgt.y, field1)
  field1.expires = expires;
  
  // determine which direction it was, for whether the wall is diagonal, horizontal, or vertical.
  var dir = GetEffectGraphic(caster,field1,{}).fired;
  if ((dir === 0) || (dir === 4)) {
    var placed = TryToPlaceField(castermap,tgt.x-1,tgt.y,"FireField");
    if (!placed) {
      var newy = tgt.y;
      if (dir === 0) { newy++; }
      else { newy--; }
      placed = TryToPlaceField(castermap,tgt.x-1,newy,"FireField");
      if (!placed) {
        if (dir === 0) { newy = tgt.y-1; }
        else { newy = tgt.y+1; }
        placed = TryToPlaceField(castermap,tgt.x-1,newy,"FireField");
        if (placed) { placed.expiresTime = expires; }
      } else {
        placed.expiresTime = expires;
      }
    } else {
      placed.expiresTime = expires;
    }
    placed = TryToPlaceField(castermap,tgt.x+1,tgt.y,"FireField");
    if (!placed) {
      var newy = tgt.y;
      if (dir === 0) { newy++; }
      else { newy--; }
      placed = TryToPlaceField(castermap,tgt.x+1,newy,"FireField");
      if (!placed) {
        if (dir === 0) { newy = tgt.y-1; }
        else { newy = tgt.y+1; }
        TryToPlaceField(castermap,tgt.x+1,newy,"FireField");
      } else {
        placed = placed.expiresTime = expires;
        if (placed) { placed.expiresTime = expires; }
      }
    } else {
      placed.expiresTime = expires;
    }
  } else if ((dir === 1) || (dir === 5)) {
    var placed = TryToPlaceField(castermap,tgt.x-1,tgt.y-1,"FireField");
    if (!placed) {
      var newy = tgt.y-1;
      var newx = tgt.x-1;
      if (dir === 1) { newy++; }
      else { newx++; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        var newy = tgt.y-1;
        var newx = tgt.x-1;
        if (dir === 1) { newx++; }
        else { newy++; }
        placed = TryToPlaceField(castermap,newy,newy,"FireField");
        if (placed) { placed.expiresTime = expires; }
      } else {
        placed.expiresTime = expires;
      }
    } else {
      placed.expiresTime = expires;
    }
    placed = TryToPlaceField(castermap,tgt.x+1,tgt.y+1,"FireField");
    if (!placed) {
      var newy = tgt.y+1;
      var newx = tgt.x+1;
      if (dir === 1) { newx--; }
      else { newy--; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        var newy = tgt.y+1;
        var newx = tgt.x+1;
        if (dir === 1) { newy--; }
        else { newx--; }
        placed = TryToPlaceField(castermap,newx,newy,"FireField");
        if (placed) { placed.expiresTime = expires; }
      } else {
        placed.expiresTime = expires;
      }
    } else {
      placed.expiresTime = expires;
    } 
  } else if ((dir === 2) || (dir === 6)) {
    var placed = TryToPlaceField(castermap,tgt.x,tgt.y-1,"FireField");
    if (!placed) {
      var newy = tgt.y-1;
      var newx = tgt.x;
      if (dir === 2) { newx--; }
      else { newx++; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        var newy = tgt.y-1;
        var newx = tgt.x;
        if (dir === 2) { newx++; }
        else { newx--; }
        placed = TryToPlaceField(castermap,newy,newy,"FireField");
        if (placed) { placed.expiresTime = expires; }
      } else {
        placed.expiresTime = expires;
      }
    } else {
      placed.expiresTime = expires;
    }
    placed = TryToPlaceField(castermap,tgt.x,tgt.y+1,"FireField");
    if (!placed) {
      var newy = tgt.y+1;
      var newx = tgt.x;
      if (dir === 2) { newx--; }
      else { newx++; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        var newy = tgt.y+1;
        var newx = tgt.x;
        if (dir === 2) { newx++; }
        else { newx--; }
        placed = TryToPlaceField(castermap,newx,newy,"FireField");
        if (placed) { placed.expiresTime = expires; }
      } else {
        placed.expiresTime = expires;
      }
    } else {
      placed.expiresTime = expires;
    }     
  } else if ((dir === 3) || (dir === 7)) {
    var placed = TryToPlaceField(castermap,tgt.x+1,tgt.y-1,"FireField");
    if (!placed) {
      var newy = tgt.y-1;
      var newx = tgt.x+1;
      if (dir === 3) { newx--; }
      else { newy++; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        var newy = tgt.y+1;
        var newx = tgt.x-1;
        if (dir === 3) { newy--; }
        else { newx++; }
        placed = TryToPlaceField(castermap,newy,newy,"FireField");
        if (placed) { placed.expiresTime = expires; }
      } else {
        placed.expiresTime = expires;
      }
    } else {
      placed.expiresTime = expires;
    }
    placed = TryToPlaceField(castermap,tgt.x-1,tgt.y+1,"FireField");
    if (!placed) {
      var newy = tgt.y+1;
      var newx = tgt.x-1;
      if (dir === 3) { newy--; }
      else { newx++; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        var newy = tgt.y+1;
        var newx = tgt.x-1;
        if (dir === 3) { newx++; }
        else { newy--; }
        placed = TryToPlaceField(castermap,newx,newy,"FireField");
        if (placed) { placed.expiresTime = expires; }
      } else {
        placed.expiresTime = expires;
      }
    } else {
      placed.expiresTime = expires;
    }        
  } else {
    alert("Finding facing isn't working.");
  }
  DrawMainFrame("draw",castermap.getName(),PC.getx(),PC.gety());
  
  return resp;
}

function TryToPlaceField(mapref, wherex, wherey, fieldname) {
  var tile = mapref.getTile(wherex, wherey);
  if (tile.canMoveHere(MOVE_WALK,0)["canmove"]) {
    var field = localFactory.createTile(fieldname);
    mapref.placeThing(wherex,wherey,field);
    return field;
  }
  return 0;
}

// Blessing
magic[4][GetSpellID(1)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Blessing.<br /></span>"); }
  DebugWrite("magic", "Casting Blessing.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;

  var levobj = localFactory.createTile("Blessing");
  
  var dur = caster.getInt() * SCALE_TIME;
  if (infused) { dur = dur * 3; }
  var power = Math.floor(caster.getInt()/5)+1;
  if (free) {
    dur = Dice.roll("2d10+15") * SCALE_TIME;
    power = Dice.roll("1d4+1");
  }
  var endtime = dur + DU.DUTime.getGameClock();
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(levobj);
//  levobj.applyEffect();
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
    
  DrawCharFrame();
  return resp;  
}

// Blink
magic[4][GetSpellID(2)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Blink.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;

  var success = 0;
  var castermap = caster.getHomeMap();
  var casterx = caster.getx();
  var castery = caster.gety();
  var castermove = caster.getMovetype();
  var possdest = [];
  for (var i=-4;i<=4;i++) {
    for (var j=-4;j<=4;j++) {
      if ((i==casterx) && (j==castery)) { next; }
      var loc = {};
      loc.x = casterx+i;
      loc.y = castery+j;
      possdest.push(loc);
    }
  }
  ShuffleArray(possdest);
  while (!success && possdest[0]) {
    var tile = castermap.getTile(possdest[0].x,possdest[0].y);
    if (tile.canMoveHere(castermovetype, 1)) {
      var path = castermap.getPath(casterx,castery,possdest[0].x,possdest[0].y,MOVE_WALK);
      if (path) {
        success = PerformBlink(caster,possdest[0].x,possdest[0].y);
      }
    }
    if (!success) { possdest.shift(); }
  }

  if (!success) { 
    maintext.addText("The spell fizzles.");
  }
  // be sure to test this in a location with no valid destinations
  return resp;  
}

function PerformBlink(caster,destx, desty) {
  var retval = {};
  var map = caster.getHomeMap();
  var exittile = map.getTile(caster.getx(),caster.gety());
  var walkofftile = exittile.executeWalkoffs(caster);
  if (walkofftile) {
    retval["msg"] += walkoffval;
  }
  map.moveThing(destx,desty,caster);

  var walkonval = tile.executeWalkons(this);
  if (walkonval) {
    if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
    retval["msg"] += walkonval;
  }
  DrawMainFrame("draw", PC.getHomemap().getName() , PC.getx(), PC.gety());
  maintext.addText(retval["msg"]);
  if ((caster.getx() === destx) && (caster.gety() === desty)) {
    return 1;
  } else {
    return 0;
  }
}

// Ethereal Vision
magic[4][GetSpellID(3)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Ethereal Vision.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;

  var levobj = localFactory.createTile("EtherealVision");
  
  var dur = 3 * SCALE_TIME;
  if (infused) { dur = dur * 2; }

  var endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  levobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(levobj);
//  levobj.applyEffect();
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
    
  DrawCharFrame();
  return resp;  
}

// Heal
magic[4][GetSpellID(4)].executeSpell = function(caster, infused, free, tgt) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Heal.<br /></span>"); }
  DebugWrite("magic", "Casting Heal.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var plus = caster.getLevel()*2;
  var healamt = Dice.roll(caster.getLevel() + "d8+" + plus);
  if (free) { healamt = Dice.roll("4d8+10"); }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Healing " + healamt + " hp.<br /></span>"); }
  DebugWrite("magic", "Healing " + healamt + " hp.<br />");
  if (infused) { healamt = healamt * 1.5; }
  
  if (caster === PC) {
    tgt = caster;
  }
  
  ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
  tgt.healMe(healamt, caster);
  resp["txt"] = "You feel better!";
  
  return resp;
  
}

//Life Drain
magic[4][GetSpellID(5)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Life Drain.<br />");
  if (caster !== PC) {
    var resp = PerformLifeDrain(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Life Drain.<br /></span>"); }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Life Drain";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "npc"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}
  
function PerformLifeDrain(caster, infused, free, tgt) {
  gamestate.setMode("null");
  var resp = {};
  resp["fin"] = 1;
  var desc = tgt.getDesc();

  if (caster.getHomeMap().getLOE(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[4][GetSpellID(5)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
//  var dmg = Dice.roll("2d6+" + Math.floor(caster.getInt()/5));
  var dmg = RollDamage(DMG_MEDIUM);
  if (infused) {
    dmg = dmg * 1.5;
  }

  var healamt = Dice.roll("2d8+" + 10);  
  if (infused) { healamt = healamt * 1.5; }
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
    healamt = Math.floor(healamt/2)+1;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Dealing " + dmg + " damage.<br /></span>"); }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    
  ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);

//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Healing " + healamt + " hp.<br /></span>"); }
  DebugWrite("magic", "Healing " + healamt + " hp.<br />");
  
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
  caster.healMe(healamt, caster);
  resp["txt"] = "You feel better!";

  resp["fin"] = -1;
  return resp;
}

//Smite
magic[4][GetSpellID(6)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Smite.<br /></span>"); }
  DebugWrite("magic", "Casting Smite.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;

  var foes = GetAllWithin("npcs",radius,caster.getHomeMap(),{x: caster.getx(), y: caster.gety()});
  foes = ShuffleArray(foes);
  
  if (!foes[0]) {
    resp["txt"] = "No enemies nearby.";
    return resp;
  }
  for (var i=0; i<=2; i++) {
    if (foes[i]) {
      var dmg = RollDamage(DMG_MEDIUM);
      if (infused) { dmg = dmg * 1.5; }
      if (CheckResist(caster,foes[i],infused,0)) {
        dmg = Math.floor(dmg/2)+1;
      }
      foes[i].dealDamage(dmg,caster,"force");
//      if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Dealing " + dmg + " damage to target " + foes[i].getName() + " " + foes[i].getSerial() + ".<br /></span>"); }
      DebugWrite("magic", "Dealing " + dmg + " damage to target " + foes[i].getName() + " " + foes[i].getSerial() + ".<br />");
      ShowEffect(foes[i], 700, "702.gif", 0, 0);
    }
  }
  return resp;  
}

//Transport
magic[4][GetSpellID(7)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Transport.<br /></span>"); }
  DebugWrite("magic", "Casting Transport.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 3;  // end of turn waits on end of animation

  var loc = caster.getHomeMap().getTile(caster.getx(), caster.gety());
  var shrine = loc.getTopFeature();
  if ((shrine) && (shrine.gotomap)) {
    var belowgraphic = shrine.getGraphicArray();
    if (shrine.getName() === "Shrine") {
      DU.maps.addMap(shrine.gotomap);
      var destmap = DU.maps.getMap(shrine.gotomap);
//      MoveBetweenMaps(caster,caster.getHomeMap(), destmap, shrine.gotox, shrine.gotoy);
//      DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
      TravelByMoongate(caster,"blue",belowgraphic,belowgraphic, destmap, shrine.gotox, shrine.gotoy);
    } else if (shrine.getName() === "BrokenShrine") {
      if (infused) {
        DU.maps.addMap(shrine.gotomap);
        var destmap = DU.maps.getMap(shrine.gotomap);
//        MoveBetweenMaps(caster,caster.getHomeMap(), destmap, shrine.gotox, shrine.gotoy);
//        DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
        TravelByMoongate(caster,"blue",belowgraphic,belowgraphic, destmap, shrine.gotox, shrine.gotoy);
      } else {
        maintext.addText("The spell sputters and the broken node remains closed.");
        resp["fin"] = 1;
      }
    }
  } else {
    maintext.addText("The spell sputters, finding no transport node to open."); 
    resp["fin"] = 1;
  }
  
  DrawCharFrame();
  return resp;
}

// Levitate/Waterwalk
magic[4][GetSpellID(8)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Water Walk.<br /></span>"); }
  DebugWrite("magic", "Casting Water Walk.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;

  var levobj = localFactory.createTile("Levitate");
  
  var dur = caster.getInt()+5;
  if (free) { dur = Dice.roll("1d10+35"); }
  if (infused) { dur = dur * 3; }
  var endtime = dur + DU.DUTime.getGameClock();
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  levobj.setPower(dur);
  levobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(levobj);
//  levobj.applyEffect();
    
  DrawCharFrame();
  return resp;  
}

// Crystal Barrier
magic[5][GetSpellID(1)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Crystal Barrier.<br />");
  if (caster !== PC) {
    var resp = PerformCrystalBarrier(caster, infused, free, tgt);
    return resp;
  }

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Crystal Barrier";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "open"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 3;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 0;
  gamestate.setMode("target");
  return resp;
}

function PerformCrystalBarrier(caster, infused, free, tgt) {
  var resp = {};
  resp["fin"] = 1;
  var desc = "";

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.x, tgt.x, losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "You cannot place your barrier there.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  if (!free) {
    var mana = magic[5][GetSpellID(1)].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  var crystal;
  crystal = localFactory.createTile("ConjuredCrystal");
  
  var duration = caster.getInt() * SCALE_TIME;
  if (free) { duration = Dice.roll("1d6+12") * SCALE_TIME; }
  crystal.expiresTime = DUTime.getGameClock() + duration;  // barrier AI needs to check expiresTime and go poof if it is reached
  caster.getHomeMap().placeThing(tgt.x,tgt.y,illusion);
  DrawMainFrame("one",caster.getHomeMap().getName(),crystal.getx(),crystal.gety());
  
  resp["txt"] = "You conjure a crystal barrier.";
  resp["input"] = "&gt;";
  return resp;

}

//Mirror Ward
magic[5][GetSpellID(2)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Mirror Ward.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;

  var mwobj = localFactory.createTile("MirrorWard");
  
  var dur = caster.getInt();
  if (free) { dur = Dice.roll("1d10+35"); }
  if (infused) { dur = dur * 3; }
  var endtime = (dur * SCALE_TIME) + DU.DUTime.getGameClock();
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  mwobj.setPower(dur);
  mwobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(mwobj);

  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  return resp;
}

//Paralyze
magic[5][GetSpellID(3)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Paralyze.<br />");
  if (caster !== PC) {
    var resp = PerformParalyze(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Paralyze.<br /></span>"); }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Paralyze";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "npc"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 0;
  gamestate.setMode("target");
  return resp;
}
  
function PerformParalyze(caster, infused, free, tgt) {
  var resp = {};
  resp["fin"] = 1;
  var desc = "";

  if (caster.getHomeMap().getLOE(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[5][GetSpellID(3)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  
  if (!CheckResist(caster,tgt,infused,0)) {
    var vulobj = localFactory.createTile("Paralyze");
  
    var dur = caster.getInt()/2;
    if (infused) { dur = dur * 1.5;}
    if (free) { dur = Dice.roll("1d4+5"); }
    ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
    if (tgt !== PC) {
      desc = tgt.getDesc() + " is paralyzed!";
    } else {
      desc = "You are paralyzed!";
    }
    vulobj.setExpiresTime(dur + DUTime.getGameClock());
    var power = 4;
    if (infused) { power = 6; }
    vulobj.setPower(power);
    tgt.addSpellEffect(vulobj);
  }
  else {
    desc = tgt.getDesc() + " resists!";
    if (tgt === PC) {
      desc = "You resist.";
      // no X over the PC
    } else {
      ShowEffect(val, 700, "X.gif");
    }
  }
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
//  maintext.addText(desc);
  resp["txt"] = desc;
  resp["input"] = "&gt;";
  return resp;
}

// Peer
magic[5][GetSpellID(4)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Peer.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 0;
  var castermap = caster.getHomeMap();
  var eachwayx = Math.floor(viewsizex/2)*4+1;
  var eachwayy = Math.floor(viewsizey/2)*4+1;
  var leftx = caster.getx()-eachwayx;
  var rightx = caster.getx()+eachwayx;
  var topy = caster.gety()-eachwayy;
  var bottomy = caster.gety()+eachwayy;
  var peerhtml = "<table id='mainview' cellpadding='0' cellspacing='0' border='0' style=\"position:relative; z-index:20; top:20px\">";
  for (var j=topy;j<=bottomy;j++) {
    peerhtml += "<tr><td style='background-color:black; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>";
    for (var i=leftx;i<=rightx;i++) {
      if ((caster.getx() === i) && (caster.gety() === j)) {
        // PC
        peerhtml += "<td style='background-color:cyan; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>";
      } else {
        var tile = castermap.getTile(i,j);
        if (tile === "OoB") { peerhtml += "<td style='background-color:black; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>"; }
        else {
          var npc = tile.getTopVisibleNPC();
          if (npc) { peerhtml += "<td style='background-color:purple; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>"; }
          else {
            var fea = tile.getTopVisibleFeature();
            if (fea && fea.getPeerview()) {
              var peer = fea.getPeerview();
              if (peer) { peerhtml += "<td style='background-color:"+peer+"; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>"; }
            }
            else {
              var terr = tile.getTerrain();
              var peer = terr.getPeerview();
              if (peer) { peerhtml += "<td style='background-color:"+peer+"; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>"; }
              else {
                peerhtml += "<td style='background-color:black; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>";
              }
            }
          }
        }
      }
    }
    peerhtml += "</tr>";
  }
  peerhtml += "<tr>";
  for (var i=leftx;i<=rightx;i++) {
    peerhtml += "<td style='background-color:black; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>";
  }
  peerhtml += "</tr></table>";
  alert(peerhtml);
  $('#displayframe').html(peerhtml);
  gamestate.setMode("anykey");
  targetCursor.command = "c";
  maintext.addText("You receive a bird's eye view.");
  resp["input"] = "[MORE]";
  return resp;
}

//Return
magic[5][GetSpellID(5)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Return.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var returndest = {};
  
  var castermap = caster.getHomeMap();
  if (castermap.getName().indexOf("combat") > -1) {
    var fighton = castermap.getExitToMap();
    if ((fighton === "darkunknown") || (infused)) {
      returndest.map = "darkunknown";
      returndest.x = 68;
      returndest.y = 73;
    }
  } else {
    if ((castermap.getReturnInfused() && infused) || !castermap.getReturnInfused()) {
      returndest.map = castermap.getReturnMap();
      returndest.x = castermap.getReturnx();
      returndest.y = castermap.getReturny();
    }
  }
  //WORK HERE  - done I think? aside from sound
  if (returndest.map) {
    var destmap = DU.maps.getMap(returndest.map);
    var localacre = castermap.getTile(caster.getx(), caster.gety());
    var displaytile = localacre.getTop(1);
    while (displaytile.getName() === "SeeBelow") {
      var retval = FindBelow(x,y,mapname);
      localacre = retval.tile;
      mapname = retval.map;
      displaytile = localacre.getTop();
    }  
    var graphics = displaytile.getGraphicArray();
    var showGraphic = graphics[0];
    if (typeof displaytile.setBySurround === "function") {
     	graphics = displaytile.setBySurround(x,y,mapname,graphics,1,centerx,centery,losresult);
      showGraphic = graphics[0];
      if (typeof displaytile.doTile === "function") {
        graphics[0] = displaytile.doTile(x,y,showGraphic);
      }
//    displayCell.showGraphic = showGraphic;
//    displayCell.graphics2 = graphics[2];
//    displayCell.graphics3 = graphics[3];
//    displayCell.graphics1 = graphics[1];
//    displayCell.losresult = losresult;
//    displayCell.lighthere = lighthere;
//    displayCell.desc = displaytile.getDesc();
    
//    mapdiv += '<td class="maptd" id="td-tile'+x+'x'+y+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat; background-position: ' + graphics[2] + 'px ' + graphics[3] + 'px;"><img id="tile'+x+'x'+y+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+x+'x'+y+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" style="position: relative; z-index:1;" title="' + displaytile.getDesc() + '" /></td>';
    }
    
    var destacre = destmap.getTile(returndest.x, returndest.y);
    var desttile = destacre.getTop();
    
    TravelByMoongate(caster,"blue",graphics,desttile.getGraphicArray(), destmap, returndest.x, returndest.y);
    resp["fin"] = 3;
  } else {
    maintext.addText("The spell sputters as the distances are too great.");
    resp["fin"] = 1;
  }
  
  return resp;
}

// Shockwave
magic[5][GetSpellID(6)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Shockwave.<br /></span>"); }
  DebugWrite("magic", "Casting Shockwave.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;

  var spellmap = caster.getHomeMap();
  for (var xdiff=-1; xdiff<=1; xdiff++) {
    for (var ydiff=-1;ydiff<=1; ydiff++) {
      if ((xdiff === 0) && (ydiff === 0)) { next; }
      var tile = spellmap.getTile(caster.getx()+xdiff, caster.gety()+ydiff);
      var badguy = tile.getTopNPC();
      if (badguy) {
        var dmg = Dice.roll(DMG_MEDIUM);
        if (infused) { dmg = dmg * 1.5; }
        var resist = 0;
        if (CheckResist(caster,badguy,infused,0)) {
          resist = 1;
          dmg = dmg*.5;
        }

        if (!resist) {
          badguy.moveMe(diffx,diffy,1);
        }
        badguy.dealDamage(dmg,caster,"force");
        ShowEffect(badguy, 700, "702.gif", 0, 0);
        
      }
    }
  }
  return resp;  
}

// Summon Ally
magic[5][GetSpellID(7)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Summon Ally.<br />");
  if (caster !== PC) {
    var resp = PerformSummonAlly(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Summon Ally.<br /></span>"); }
  var resp = {};
  
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  // check for existing illusion if I want to limit to just 1, but for now I don't
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Summon Ally";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "open"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 3;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose where to conjure- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformSummonAlly(caster, infused, free, tgt) {
  var resp = {};
  resp["fin"] = 1;
  var desc = "";

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.x, tgt.x, losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "You cannot summon anything there.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  if (!free) {
    var mana = magic[5][GetSpellID(7)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  var ally;
  var eletype;
  switch (Math.floor(Math.random()*4)+1) {
    case 1: 
      eletype = "AirElemental";
      break;
    case 2:
      eletype = "WaterElemental";
      break;
    case 3:
      eletype = "FireElemental";
      break;
    case 4:
      eletype = "EarthElemental";
      break;
  }
  ally = localFactory.createTile(eletype+"NPC");
  var duration = caster.getInt() * SCALE_TIME;
  if (free) { duration = Dice.roll("1d6+12"); }
  if (infused) {
    ally.setStr(ally.getStr()+5);
    ally.setStr(ally.getDex()+5);
    ally.setStr(ally.getInt()+5);
    ally.setMaxHP(ally.getMaxHP()+15);
    ally.setLevel(ally.getLevel()+1);
    duration = duration* 1.5; 
  }
  
  ally.expiresTime = DUTime.getGameClock() + duration;  // AI needs to check expiresTime and go poof if it is reached
  caster.getHomeMap().placeThing(tgt.x,tgt.y,ally);
  if (eletype !== "FireElemental") {
    DrawMainFrame("one",caster.getHomeMap().getName(),ally.getx(),ally.gety());
  } else {
    DrawMainFrame("draw",caster.getHomeMap().getName(),PC.getx(),PC.gety());
  }
  
  resp["txt"] = "You conjure an elemental to aid you in battle.";
  resp["input"] = "&gt;";
  return resp;

}

// Swordstrike
magic[5][GetSpellID(8)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Swordstrike.<br />");
  if (caster !== PC) {
    var resp = PerformSwordstrike(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Swordstrike.<br /></span>"); }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Swordstrike";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "npc"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformSwordstrike(caster, infused, free, tgt) {
  gamestate.setMode("null");
  var resp = {};
  resp["fin"] = 1;
  var desc = tgt.getDesc();
  var castmap = caster.getHomeMap();

  if (castmap.getLOE(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[5][GetSpellID(6)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  var hostile = 0;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(castmap);
    hostile = 1;
  }

  var dmg = RollDamage(DMG_HEAVY);
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Dealing " + dmg + " damage.<br /></span>"); }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  ShowEffect(tgt, 700, "702.gif", 0, 0);
  tgt.dealDamage(dmg,caster,"physical");
  
  for (var diffx = -1; diffx <=1; diffx++) {
    for (var diffy = -1; diffy <=1; diffy++) {
      if ((diffx === 0) && (diffy === 0)) { next; }
      dmg = RollDamage(DMG_LIGHT);
      if ((tgt.getx()+diffx === PC.getx()) && (tgt.gety()+diffy === PC.gety())) {
        if (CheckResist(caster,PC,infused,0)) { dmg = dmg/2 +1; }
        PC.dealDamage(dmg,caster,"physical");
        ShowEffect(PC, 700, "702.gif", 0, 0);
        next;
      }
      var tile = castmap.getTile(tgt.getx()+diffx,tgt.gety()+diffy);
      var badguy = tile.getTopNPC();
      if (badguy) {
        if (CheckResist(caster,badguy,infused,0)) { dmg = dmg/2+1; }
        badguy.dealDamage(dmg,caster,"physical");
        ShowEffect(badguy, 700, "702.gif", 0, 0);
        if (!hostile && (caster === PC) && (tgt.getAttitude() === "friendly")) {
          TurnMapHostile(castmap);
          hostile = 1;
        }
      }
    }
  }
  
  return resp;
}

// Empower

// Explosion
magic[6][GetSpellID(2)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Explosion.<br />");
  if (caster !== PC) {
    var resp = PerformExplosion(caster, infused, free, tgt);
    return resp;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Explosion.<br /></span>"); }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Explosion";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "open"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformExplosion(caster, infused, free, tgt) {
  gamestate.setMode("null");
  var resp = {};
  resp["fin"] = 1;
  var desc = tgt.getDesc();
  var castmap = caster.getHomeMap();

  if (castmap.getLOE(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[6][GetSpellID(2)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var hostile = 0;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(castmap);
    hostile = 1;
  }

  var dmg = RollDamage(DMG_HEAVY);
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Dealing " + dmg + " damage.<br /></span>"); }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  ShowEffect(tgt, 700, "702.gif", 0, 0);
  tgt.dealDamage(dmg,caster,"physical");
  
  for (var diffx = -1; diffx <=1; diffx++) {
    for (var diffy = -1; diffy <=1; diffy++) {
      if ((diffx === 0) && (diffy === 0)) { next; }
      dmg = RollDamage(DMG_LIGHT);
      if ((tgt.getx()+diffx === PC.getx()) && (tgt.gety()+diffy === PC.gety())) {
        if (CheckResist(caster,PC,infused,0)) { dmg = dmg/2 +1; }
        PC.dealDamage(dmg,caster,"physical");
        ShowEffect(PC, 700, "702.gif", 0, 0);
        next;
      }
      var tile = castmap.getTile(tgt.getx()+diffx,tgt.gety()+diffy);
      var badguy = tile.getTopNPC();
      if (badguy) {
        if (CheckResist(caster,badguy,infused,0)) { dmg = dmg/2+1; }
        badguy.dealDamage(dmg,caster,"physical");
        ShowEffect(badguy, 700, "702.gif", 0, 0);
        if (!hostile && (caster === PC) && (tgt.getAttitude() === "friendly")) {
          TurnMapHostile(castmap);
          hostile = 1;
        }
      }
    }
  }
  
  return resp;
}

// Jinx
magic[6][GetSpellID(3)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Jinx.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;

  var radius = 4;
  if (!free & caster.getInt() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  var castermap = caster.getHomeMap();
  var npcs = castermap.npcs.getAll();
  $.each(npcs, function (idx, val) {
    var desc;
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),losgrid,1) < LOS_THRESHOLD )) {
        var resist = CheckResist(caster,val,infused,0);
        var power = 66-resist;
        if (resist < 33) {
          desc = val.getDesc() + " resists!";
          if (val === PC) {
            desc = "You resist.";
            // no X over the PC
          } else {
            ShowEffect(val, 700, "X.gif");
          }       
        } else {
          var duration = 8 + Dice.roll("1d4") - val.getInt()/5;
          var jinx = localFactory.createTile("Confused");
          jinx.setPower(power);
          jinx.setExpiresTime(duration*SCALE_TIME + DUTime.getGameClock());
          val.addSpellEffect(jinx);          
          desc = val.getDesc() + " is confused!";
          ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
          if (val === PC) {
            desc = "You have become confused.";
          }
        }
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        maintext.addText(desc);
      }
    }
  });

  return resp;
}

// Mass Curse
magic[6][GetSpellID(4)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Mass Curse.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;

  var radius = 4;
  if (!free & caster.getInt() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  var castermap = caster.getHomeMap();
  var npcs = castermap.npcs.getAll();
  $.each(npcs, function (idx, val) {
    var desc;
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),losgrid,1) < LOS_THRESHOLD )) {
        var resist = CheckResist(caster,val,infused,0);
        var curse = localFactory.createTile("Curse");
        var power = 5 + Math.floor(caster.getInt()/5);
        if (resist) {
          if (val === PC) {
            desc = "You resist, but are more vulnerable to magic.";
            // no X over the PC
          } else {
            ShowEffect(val, 700, "X.gif");
          }       
          power = 2;
        } else {
          if (val === PC) {
            desc = "You are cursed! Your thoughts feel sluggish, you feel clumsier, and you feel weaker.";
          }
        }
        var duration = 10 + Dice.roll("1d8") - val.getInt()/4;
        curse.setPower(power);
        curse.setExpiresTime(duration*SCALE_TIME + DUTime.getGameClock());
        val.addSpellEffect(curse);          
        desc = val.getDesc() + " is cursed!";
        ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
        
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        maintext.addText(desc);
      }
    }
  });

  return resp;
}

//Negate Magic
magic[6][GetSpellID(5)].executeSpell = function(caster, infused, free) {
  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Negate Magic.<br /></span>"); }
  DebugWrite("magic", "Casting Negate Magic.<br />");
  
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var castermap = caster.getHomeMap();
  var duration = caster.getInt() + DU.DUTime.getGameClock();
  var negated = DU.gameflags.getFlag("negate");
  negated[castermap.getName()] = duration * SCALE_TIME;
  DU.gameflags.setFlag("negate", negated);
  
  var gnome = localFactory.createTile("NegatorGnomeNPC");
  var gnomemap = maps.getMap("gnomeland");
	if (!gnomemap) {
	  gnomemap = new GameMap();
    gnomemap.loadMap("gnomeland");
    maps.addMapByRef(gnomemap);
	}
  gnomemap.placeThing(2,2,gnome);
  gnome.activate(0);
  var negtile = localFactory.createTile("NegateMagic");
  negtile.negatedmap = castermap.getName();
  gnome.addSpellEffect(negtile);
  

  var everyone = castermap.npcs.getAll();
  $.each(everyone, function(idx, val) {
    var effects = val.getSpellEffects();
    $.each(effects, function(effidx, effval) {
      if ((effval.getLevel() > 0) && (effval.getExpiresTime() > -1)) {
//        if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Negate magic has dispelled " + effval.getName() + " from " + val.getName() + "<br /></span>"); }
        DebugWrite("magic", "Negate magic has dispelled " + effval.getName() + " from " + val.getName() + "<br />");
        effval.endEffect();
      }
    });
  });
  
  var effects = caster.getSpellEffects();
  $.each(effects, function(effidx, effval) {
    if ((effval.getLevel() > 0) && (effval.getExpiresTime() > -1)) {
//      if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Negate magic has dispelled " + effval.getName() + " from " + caster.getName() + "<br /></span>"); }
      DebugWrite("magic", "Magic: Negate magic has dispelled " + effval.getName() + " from " + caster.getName() + "<br />");
      effval.endEffect();
    }
  });
  
  DrawCharFrame();
  return resp;
}

// Lightning Storm
magic[6][GetSpellID(6)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Storm.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var castermap = caster.getHomeMap();
  if (!castermap.getScale()) {
    DebugWrite("magic", "Tried to cast Storm on an overland map.<br />");
    maintext.AddText("You summon a small storm, which soon ends.");
    return resp;
  }
  var liobj = localFactory.createTile("Storm");
  
  var dur = 10*SCALE_TIME;
  if (infused) {dur = dur * 1.5; } // can't be infused, but what the heck
  var endtime = dur + DU.DUTime.getGameClock();
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(liobj);
//  liobj.applyEffect();
  
  DrawCharFrame();
  return resp;
}

// Tremor

// Weather Control

// Charm
magic[7][GetSpellID(1)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Charm.<br />");
  if (caster !== PC) {
    var resp = PerformCharm(caster, infused, free, tgt);
    return resp;
  }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Charm";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "npc"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 0;
  gamestate.setMode("target");
  return resp;
}

function PerformCharm(caster, infused, free, tgt) {
  var resp = {};
  resp["fin"] = 1;
  var desc = "";

  if (caster.getHomeMap().getLOE(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[7][GetSpellID(1)].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;

  if (!CheckResist(caster,tgt,infused,0)) {
    var charmobj = localFactory.createTile("Charm");
  
    var dur = caster.getInt()/2;
    if (infused) { dur = dur * 1.5;}  // can't be infused, but just in case
    if (free) { dur = Dice.roll("1d4+5"); }
    ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
    if (tgt !== PC) {
      desc = tgt.getDesc() + " is charmed!";
    } else {
      desc = "You are charmed!";  // good lord, don't let NPCs cast charm
    }
    charmobj.setExpiresTime(dur + DUTime.getGameClock());
    charmobj.setPower(1);
    tgt.addSpellEffect(charmobj);
  }
  else {
    desc = tgt.getDesc() + " resists!";
    if (tgt === PC) {
      desc = "You resist.";
      // no X over the PC
    } else {
      ShowEffect(val, 700, "X.gif");
    }
  }
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
//  maintext.addText(desc);
  resp["txt"] = desc;
  resp["input"] = "&gt;";
  return resp;
}

// Ethereal Travel

// Fear
magic[7][GetSpellID(3)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Fear.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;

  var radius = 4;
  if (!free & caster.getInt() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  var castermap = caster.getHomeMap();
  var npcs = castermap.npcs.getAll();
  $.each(npcs, function (idx, val) {
    var desc;
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),losgrid,1) < LOS_THRESHOLD )) {
        if (CheckResist(caster,val,infused,0)) {
          if (val === PC) {
            desc = "You resist.";
            // no X over the PC
          } else {
            ShowEffect(val, 700, "X.gif");
          }       
        } else {
          if (val.specials.coward) {
            desc = val.getDesc() + " was already afraid!";
          } else {
            var fear = localFactory.createTile("Fear");
            var duration = 10 + Dice.roll("1d8") - val.getInt()/4;
            fear.setPower(1);
            fear.setExpiresTime(duration*SCALE_TIME + DUTime.getGameClock());
            val.addSpellEffect(fear);          
            desc = val.getDesc() + " is afraid!";
            ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
          }

 //         if (val === PC) {
 //           desc = "You are terrified!";
 //         }
        }
 
        if (desc) {       
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);
          maintext.addText(desc);
        }
      }
    }
  });

  return resp;
}

// Fire and Ice
magic[7][GetSpellID(4)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Fire and Ice.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = -1;

  PlayRing(caster,"firering.png", {}, 1, "icering.png", function(center) {
    var centerx = center.getx();
    var centery = center.gety();
    var castermap = center.getHomeMap();
    for (var i=centerx-1;i<=centerx+1;i++) {
      for (var j=centery-1;j<=centery+1;j++) {
        if ((i!==centerx)||(j!==centery)) {
          var tile = castermap.getTile(i,j);
          var tgt = tile.getTopVisibleNPC();
          if (tgt) {
            var dmg = Dice.roll(DMG_MEDIUM);
            if (CheckResist(center,tgt,0,0)) {
              dmg = Math.floor(dmg/2);
            }
            tgt.dealDamage(dmg,center,"fire");
          }
        }
      }
    }
  }, function(center) {
    var centerx = center.getx();
    var centery = center.gety();
    var castermap = center.getHomeMap();
    for (var i=centerx-1;i<=centerx+1;i++) {
      for (var j=centery-1;j<=centery+1;j++) {
        if ((i!==centerx)||(j!==centery)) {
          var tile = castermap.getTile(i,j);
          var tgt = tile.getTopVisibleNPC();
          if (tgt) {
            if (!CheckResist(center,tgt,0,0)) {
              var freeze = localFactory.createTile("Frozen");
              freeze.setPower(1);
              freeze.setExpiresTime(Dice.roll("1d3+1")*SCALE_TIME + DUTime.getGameClock());
              tgt.addSpellEffect(freeze);
              var desc = tgt.getDesc() + " is frozen!";
              maintext.addText(desc);
            }
          }
        }
      }
    }    
  });

  return resp;
}

// Invulnerability
magic[7][GetSpellID(5)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Invulnerability.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  var prot = localFactory.createTile("Invulnerable");
  duration = 3 * SCALE_TIME;
  var power = 1;
  if (infused) { 
    duration = duration +1; 
  }
  if (free) {
    duration = 2 * SCALE_TIME;
  }
  var endtime = duration + DUTime.getGameClock();
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: End time is " + endtime + ".<br /></span>"); }
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  prot.setExpiresTime(endtime);
  prot.setPower(power);
  caster.addSpellEffect(prot);
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  
  return resp;
}

// Meteor Swarm
magic[7][GetSpellID(6)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Meteor Swarm.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = -1;

  var radius = 4;
  if (!free & caster.getInt() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  var castermap = caster.getHomeMap();
  var npcs = castermap.npcs.getAll();
  var display = getDisplayCenter(PC.getHomeMap(), PC.getx(), PC.gety());
  var npccount = 0;
  $.each(npcs, function (idx, val) {
    var desc;
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),losgrid,1) < LOS_THRESHOLD )) {
        npccount++;
      }
    }
  });
  $.each(npcs, function (idx, val) {
    var desc;
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),losgrid,1) < LOS_THRESHOLD )) {
        npccount--;
        var final = 0;
        if (!npccount) { final = 1; }
        var dmg = Dice.roll(DMG_MEDIUM);
        if (CheckResist(caster,val,infused,0)) {
          dmg = dmg/2;
        } 
        // In theory, it is impossible for targets to be offscreen.
        var skysourcex = Math.random()*(display.rightedge - displey.leftedge +1) + display.leftedge;
        var skysourcey = display.topedge;
        
        var boltgraphic = {};
        boltgraphic.graphic = "fireicelightning.gif";
        boltgraphic.yoffset = 0;
        boltgraphic.xoffset = 0;
        boltgraphic.directionalammo = 1;
        boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);
        var desc = val.getDesc();
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        var descval = {txt: desc};

        var sounds = {};
        var fromcoords = getCoords(caster.getHomeMap(),caster.getx(), caster.gety());
        var tocoords = getCoords(val.getHomeMap(),val.getx(), val.gety());
        var duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
        var destgraphic = {graphic:"702.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
        AnimateEffect(caster, tgt, fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:final, retval:descval, dmgtype:"fire"});

      }
    }
  });

  return resp;
}

// Mind Blast

// Permanance

// Armageddon

// Arrow of Glass
magic[8][GetSpellID(2)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Arrow of Glass.<br />");
  if (caster !== PC) {
    var resp = PerformArrowOfGlass(caster, infused, free, tgt);
    return resp;
  }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Arrow of Glass";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "npc"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformArrowOfGlass(caster, infused, free, tgt) {
  gamestate.setMode("null");
  var resp = {};
  resp["fin"] = 1;
  var desc = tgt.getDesc();

  if (caster.getHomeMap().getLOE(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    var mana = magic[8][GetSpellID(2)].getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  var newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
//  var dmg = Dice.roll("2d6+" + Math.floor(caster.getInt()/5));
  var power = caster.getInt();
  if (free) { power = Dice.roll("1d5+12"); }
  var dmg = RollDamage(DMG_TREMENDOUS);
  if (infused) {  // can't be infused, but check anyway
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,-5)) {
    dmg = Math.floor(dmg/2)+1;
  }

  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  var boltgraphic = {};
  boltgraphic.graphic = "magic-bolt.gif";  // CHANGE ONCE ARROW OF GLASS GRAPHIC MADE
  boltgraphic.yoffset = 0;
  boltgraphic.xoffset = 0;
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);
  var descval = {txt: desc};

  var sounds = {};
  var fromcoords = getCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  var tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  var duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  var destgraphic = {graphic:"702.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
  AnimateEffect(caster, tgt, fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"physical"});

  resp["fin"] = -1;
  return resp;
}

// Build Gate

// Conflagration
magic[8][GetSpellID(4)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Conflagration.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;

  var radius = 4;
  if (!free & caster.getInt() > 25) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  var castermap = caster.getHomeMap();
  var npcs = castermap.npcs.getAll();
  var display = getDisplayCenter(PC.getHomeMap(), PC.getx(), PC.gety());
  var npccount = 0;
  $.each(npcs, function (idx, val) {
    var desc;
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),losgrid,1) < LOS_THRESHOLD )) {
        var dmg = Dice.roll(DMG_HEAVY);
        if (CheckResist(caster,val,infused,0)) {
          dmg = dmg/2+1;
        } 
        // In theory, it is impossible for targets to be offscreen.
        var desc = val.getDesc();
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        ShowEffect(val, 1000, "702.gif", 0, 0);
        val.dealDamge(dmg);

      }
    }
  });

  return resp;
}

// Conjure Daemon
magic[8][GetSpellID(5)].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Conjure Daemon.<br />");
  if (caster !== PC) {
    var resp = PerformConjureDaemon(caster, infused, free, tgt);
    return resp;
  }
  var resp = {};
  
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  // check for existing illusion if I want to limit to just 1, but for now I don't
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Conjure Daemon";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free, targettype: "open"};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 3;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose where to conjure- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformConjureDaemon(caster, infused, free, tgt) {
  var resp = {};
  resp["fin"] = 1;
  var desc = "";

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.x, tgt.x, losgrid, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "You cannot summon anything there.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  if (!free) {
    var mana = magic[8][GetSpellID(5)].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  var ally = localFactory.createTile("Daemon");
  var duration = caster.getInt() * SCALE_TIME;
  if (free) { duration = Dice.roll("1d6+12"); }
  if (infused) {  // once again, can't be infused, but hey, if you somehow do you get a HELLA daemon
    // note, this means Daemon is from California. Use at your own risk.
    ally.setStr(ally.getStr()+5);
    ally.setStr(ally.getDex()+5);
    ally.setStr(ally.getInt()+5);
    ally.setMaxHP(ally.getMaxHP()+15);
    ally.setLevel(ally.getLevel()+1);
    duration = duration* 1.5; 
  }
  
  ally.expiresTime = DUTime.getGameClock() + duration;  // AI needs to check expiresTime and go poof if it is reached
  caster.getHomeMap().placeThing(tgt.x,tgt.y,ally);
  DrawMainFrame("one",caster.getHomeMap().getName(),ally.getx(),ally.gety());
  
  resp["txt"] = "You conjure a daemon to aid you in battle!";
  resp["input"] = "&gt;";
  return resp;

}

//Quickness
magic[8][GetSpellID(6)].executeSpell = function(caster, infused, free) {
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Casting Quickness.<br /></span>"); }
  DebugWrite("magic", "Casting Quickness.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var liobj = localFactory.createTile("Quickness");
  
  var dur = caster.getInt() * SCALE_TIME;
  if (free) { 
    dur = Dice.roll("1d10+5") * SCALE_TIME;
  }
  if (infused) {dur = dur * 1.5; }
  var endtime = dur + DU.DUTime.getGameClock();
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  
//  if (DU.gameflags.sound) { play_audio("sfx_spell_light"); }   // ADD SOUND HERE
  caster.addSpellEffect(liobj);
//  liobj.applyEffect();
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  DrawCharFrame();
  return resp;  
}

// Reincarnate 

// Time Stop
magic[8][GetSpellID(8)].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Time Stop.<br />");
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  var liobj = localFactory.createTile("TimeStop");
  
  var dur = caster.getInt() * .3;
  if (free) { dur = 5; }
  if (infused) {dur = dur * 3; }
  var endtime = dur + DU.DUTime.getGameClock();
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  if (infused) { liobj.setPower(4); }   // defaults to 2
  
//  DUPlaySound("sfx_spell_light"); 
  caster.addSpellEffect(liobj);
//  liobj.applyEffect();
  
  DrawCharFrame();
  return resp;
}

function TravelByMoongate(who, color, belowgraphic, destbelow, destmap, destx, desty) {
  var tol = 300;
  var graphicarray = [];
  graphicarray[0] = "moongates.gif";
  graphicarray[1] = "spacer.gif";
  graphicarray[2] = -128;
  graphicarray[3] = 0;
  if (color === "red") { graphicarray[3] = -32; }
  
  var oldgraphic = who.getGraphicArray();
  // play sound effect
  who.setGraphicArray(graphicarray);
  DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
  setTimeout(function() {
    graphicarray[2] += 32;
    who.setGraphicArray(graphicarray);
    DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
    setTimeout(function() {
      graphicarray[2] += 32;
      who.setGraphicArray(graphicarray);
      DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
      setTimeout(function() {
        graphicarray[2] += 32;
        who.setGraphicArray(graphicarray);
        DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
        setTimeout(function() {
          graphicarray[2] += 32; // at this point it should be 0
          who.setGraphicArray(graphicarray);
          DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
          setTimeout(function() {
            who.setGraphicArray(belowgraphic);
            DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
            setTimeout(function() {
              MoveBetweenMaps(who,who.getHomeMap(), destmap, destx, desty);
              who.setGraphicArray(destbelow);
              DrawMainFrame("draw", who.getHomeMap().getName(), who.getx(), who.gety());
              setTimeout(function() {
                who.setGraphicArray(graphicarray);
                DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                setTimeout(function() {
                  graphicarray[2] -= 32;
                  who.setGraphicArray(graphicarray);
                  DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                  setTimeout(function() {
                    graphicarray[2] -= 32;
                    who.setGraphicArray(graphicarray);
                    DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                    setTimeout(function() {
                      graphicarray[2] -= 32;
                      who.setGraphicArray(graphicarray);
                      DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                      setTimeout(function() {
                        graphicarray[2] -= 32;
                        who.setGraphicArray(graphicarray);
                        DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                        setTimeout(function() {
                          who.setGraphicArray(oldgraphic);
                          DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                          DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");  
                          who.endTurn();  // currently only PC has endturn
                                          // if an NPC spell can use this function, add an endturn to NPCs
                        }, tol);
                      }, tol);
                    }, tol);
                  }, tol);
                }, tol);
              }, tol);
            }, tol);
          }, tol);
        }, tol);
      }, tol); 
    }, tol);
  }, tol);
  
}


var spellcount = {};

function ShowEffect(onwhat, duration, graphic, xoff, yoff) {
  if (Object.keys(spellcount).length === 0) {
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Clearing the spelleffects of empty divs.<br /></span>"); }
    DebugWrite("magic", "Clearing the spelleffects of empty divs.<br />");
    $("#spelleffects").html("");
  }

  if (!xoff) { xoff = 0; }
  if (!yoff) { yoff = 0; }
  
  if (spellcount["anim" + onwhat.getSerial()]){ 
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Tried to create a second effect on " + onwhat.getName() + ".<br /></span>"); }
    DebugWrite("magic", "Tried to create a second effect on " + onwhat.getName() + ".<br />");
    return; 
  }  //if there's already an effect playing, don't replace it with another one, just play the first only    
  var displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  var where = {};
  where.x = 0;
  where.y = 0;
  var animurl = "";
  spellcount["anim" + onwhat.getSerial()] = onwhat;
  if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onwhat.gety() <= displayspecs.bottomedge)) {
    where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
//    where.x += 192;
//    where.y += 192;
 //   animurl = "url('graphics/" + graphic + "')";
    animurl = "graphics/" + graphic ;
    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Putting a " + animurl + " on " + onwhat.getName() + ".<br /></span>"); }
    DebugWrite("magic", "Putting a " + animurl + " on " + onwhat.getName() + ".<br />");
  }
  var animhtml;
  if (animurl) {
    if ($("#anim" + onwhat.getSerial()).html() === "") {
      $("#anim" + onwhat.getSerial()).html('<img src="graphics/spacer.gif" width="32" height="32" />');
      $("#anim" + onwhat.getSerial()).css('left',where.x);
      $("#anim" + onwhat.getSerial()).css('top',where.y);
      $("#anim" + onwhat.getSerial()).css('background-image', 'url("graphics/' + graphic + '")');
      $("#anim" + onwhat.getSerial()).css('background-position', xoff + 'px ' + yoff + 'px');
    } else {
      animhtml = '<div id="anim' + onwhat.getSerial() + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; width:32px; height:32px; background-image:url(\'graphics/' + graphic + '\'); background-position: ' + xoff + 'px ' + yoff + 'px"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
      $("#spelleffects").html($("#spelleffects").html() + animhtml);
    }
    
    setTimeout(function() {
//      if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Removing a " + animurl + " from " + onwhat.getName() + ".<br /></span>"); }
      DebugWrite("magic", "Removing a " + animurl + " from " + onwhat.getName() + ".<br />");
      $("#anim" + onwhat.getSerial()).html("");
      $("#anim" + onwhat.getSerial()).css("background-image", "");
      delete spellcount["anim" + onwhat.getSerial()];
    },duration);
  }
}

function PlaySparkles(onwhat, color) {
  if (Object.keys(spellcount).length === 0) {
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Clearing the spelleffects of empty sparkles.<br /></span>"); }
    DebugWrite("magic", "Clearing the spelleffects of empty sparkles.<br />");
    $("#spelleffects").html("");
  }
    
  var colory = {};
  colory["yellow"] = 0;
  colory["green"] = -32;
  colory["blue"] = -64;
  colory["orange"] = -96;
  colory["purple"] = -128;
  colory["red"] = -160;
  
  var where;
  var animhtml;

  if (spellcount["anim" + onwhat.getSerial()]) { 
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Tried to create a second sparkle on " + onwhat.getName() + ".<br /></span>"); }
    DebugWrite("magic", "Tried to create a second sparkle on " + onwhat.getName() + ".<br />");
    return; 
  }  //if there's already a sparkle playing, don't replace it with another one, just play the first only
  spellcount["anim" + onwhat.getSerial()] = 1;
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Incrementing spell effects count to " + spellcount['anim' + onwhat.getSerial()] + ".<br /></span>"); }
  DebugWrite("magic", "Incrementing spell effects count to " + spellcount['anim' + onwhat.getSerial()] + ".<br />");
  var displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onewhat.gety() <= displayspecs.bottomedge)) {
    where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
//    where.x += 192;
//    where.y += 192;
    animhtml = '<div id="anim' + onwhat.getSerial() + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; background-image:url(\'graphics/spellsparkles.gif\');background-repeat:no-repeat; background-position: 0px ' + colory[color] + 'px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';  
  } else {
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Target is offscreen.<br /></span>"); }
    DebugWrite("magic", "Target is offscreen.<br />");
    animhtml = '<div id="anim' + onwhat.getSerial() + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; background-repeat:no-repeat; background-position: 0px ' + colory[color] + 'px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';  
  }
  $("#spelleffects").html($("#spelleffects").html() + animhtml);
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Placed " + color + " sparkles on " + onwhat.getName() + ".<br /></span>"); }
  DebugWrite("magic", "Placed " + color + " sparkles on " + onwhat.getName() + ".<br />");
  AnimateSparkles(onwhat,colory[color],0);
  
}

function AnimateSparkles(onwhat, color, animframe) {
  var spellcountid = "anim" + onwhat.getSerial();
  if (!spellcount[spellcountid]) {
    $("#"+spellcountid).html("");
    $("#"+spellcountid).css("background-image", "");
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Spellcount zeroed out externally. Ceasing sparkling.<br /></span>"); }
    DebugWrite("magic", "Spellcount zeroed out externally. Ceasing sparkling.<br />");
    return;
  }
  if (spellcount[spellcountid] === 48) {
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Sparkle on " + onwhat.getName() + " finished.<br /></span>"); }
    DebugWrite("magic", "Sparkle on " + onwhat.getName() + " finished.<br />");
    delete spellcount[spellcountid];
    $("#"+spellcountid).html("");
    $("#"+spellcountid).css("background-image", "");
  }
  var displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  var where;
  where.x = 0;
  where.y = 0;
  var animurl = "";
  if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onewhat.gety() <= displayspecs.bottomedge)) {
    where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
//    where.x += 192;
//    where.y += 192;
    animurl = "url('graphics/spellsparkles.gif')";
  }
  
  if ((spellcount[spellcountid]) % 3) {  // progressing the animation only every three calls 
                                         // so it can move with the target more quickly than it animates
    animframe++;
    if (animframe > 7) {
      animframe = 0;
    }
//    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Sparkle on " + onwhat.getName() + " moving on to frame " + animframe + ".<br /></span>"); }
    DebugWrite("magic", "Sparkle on " + onwhat.getName() + " moving on to frame " + animframe + ".<br />");
  }
  $("#"+spellcountid).css("background-position", (animframe*-32) + "px " + color + "py");
  $("#"+spellcountid).css("background-image", animurl);
  $("#"+spellcountid).css("left", where.x);
  $("#"+spellcountid).css("top", where.y);
  
  spellcount[spellcountid]++;
  setTimeout(AnimateSparkles(onwhat,color,animframe), 100);

}

function PerformSpellcast() {
  var themap = PC.getHomeMap();
  var targettile = themap.getTile(targetCursor.x, targetCursor.y);
  var onscreen = $('#td-tile' + targetCursor.x + 'x' + targetCursor.y).html();
  var losval = 0;
  if (onscreen.indexOf("You cannot see that") !== -1) { losval = 1; }
  else {
    var light = targettile.getLocalLight();
    if (themap.getLightLevel() === "bright") {
      light += 1;
    }
    if (light < SHADOW_THRESHOLD) {
      losval = 1;
    }
  }
  if (losval >= LOS_THRESHOLD) {
   	var retval = {};
  	retval["txt"] = "You cannot see that.";
  	retval["fin"] = 0;
    retval["input"] = "&gt;";
 	  var tileid = targetCursor.tileid;
    $(tileid).html(targetCursor.basetile); 
    delete targetCursor.spellName;

  	return retval;
  }

  if (themap.getLOE(PC.getx(), PC.gety(), targetCursor.x, targetCursor.y, losgrid, 1) >= LOS_THRESHOLD) { 
    retval["fin"] = 0;
    retval["txt"] = "Your spell cannot reach there!";
   	retval["input"] = "&gt;";
 	  var tileid = targetCursor.tileid;
    $(tileid).html(targetCursor.basetile); 
    delete targetCursor.spellName;

    return retval;
  }
  
  var resp = {};
  if (targetCursor.spelldetails.targettype === "npc") {
    var tgt = targettile.getTopVisibleNPC();
    if (!tgt || (tgt === PC)){
      // spell canceled
      resp["fin"] = 0;
      resp["txt"] = "Invalid target.";
      resp["input"] = "&gt;";
      delete targetCursor.spellName;
      var tileid = targetCursor.tileid;
      $(tileid).html(targetCursor.basetile); 

    } else {
      var tileid = targetCursor.tileid;
      $(tileid).html(targetCursor.basetile); 

      if (targetCursor.spellName === "Vulnerability") {
        resp = PerformVulnerability(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Magic Bolt") {
        resp = PerformMagicBolt(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Fireball") {
        resp = PerformFireball(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Iceball") {
        resp = PerformIceball(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Life Drain") {
        resp = PerformLifeDrain(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Paralyze") {
        resp = PerformParalyze(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Swordstrike") {
        resp = PerformSwordstrike(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Explosion") {
        resp = PerformExplosion(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Charm") {
        resp = PerformCharm(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Arrow of Glass") {
        resp = PerformArrowOfGlass(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Awaken") {
        resp = PerformAwaken(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Crystal Barrier") {
        resp = PerformCrystalBarrier(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      }
      delete targetCursor.spellName;
      
    }
    
  } else if (targetCursor.spelldetails.targettype === "open") {
    var canmove = targettile.canMoveHere(MOVE_WALK,0);
    if (!canmove["canmove"]) {
      resp["fin"] = 0;
      resp["txt"] = "You cannot cast there.";
      resp["input"] = "&gt;";   
      var tileid = targetCursor.tileid;
      $(tileid).html(targetCursor.basetile); 
      delete targetCursor.spellName;
      
      return resp;   
    }
    var tgt = {};
    tgt.x = targetCursor.x;
    tgt.y = targetCursor.y;
    var tileid = targetCursor.tileid;
    $(tileid).html(targetCursor.basetile); 
    if (targetCursor.spellName === "Illusion") {
      resp = PerformIllusion(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
    } else if (targetCursor.spellName === "Summon Ally") {
      resp = PerformSummonAlly(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
    } else if (targetCursor.spellName === "Poison Cloud") {
      resp = PerformPoisonCloud(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
    } else if (targetCursor.spellName === "Wall of Flame") {
      resp = PerformWallOfFlame(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
    } else if (targetCursor.spellName === "Conjure Daemon") {
      resp = PerformConjureDaemon(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
    }
  } else if (targetCursor.spelldetails.targettype === "usable") {
    var topfeature = targettile.getTopVisibleFeature();
    if (typeof topfeature.use === "function") {
      resp = PerformTelekinesis(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, topfeature);
    } else {
      resp["fin"] = 0;
      resp["txt"] = "There is nothing to cast this on there.";
      resp["input"] = "&gt;";
      var tileid = targetCursor.tileid;
      $(tileid).html(targetCursor.basetile); 
      delete targetCursor.spellName;
      
      return resp;   
    }
  } else {
    alert(targetCursor.spelldetails.targettype);
  }
  delete targetCursor.spellName;
  return resp;
}

function PerformDirSpellcast() {
  var resp;
  var tgt = [targetCursor.x - caster.getx(), targetCursor.y - caster.gety()];
  if (targetCursor.spellName === "Wind Change") {
    resp = PerformWindChange(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
  }
  return resp;
}

function CheckMirrorWard(tgt, caster) {
  var mirror = tgt.getSpellEffectsByName("MirrorWard");
  
  if (mirror) {
    tgt = mirror.findNewTarget(caster);
  }
  
  return tgt;
}

function PlayRing(onwhat, ringfile, retval, endturn, secondring, firstringcallback, secondringcallback) {
  if (Object.keys(spellcount).length === 0) {
    DebugWrite("magic", "Clearing the spelleffects of empty sparkles.<br />");
    $("#spelleffects").html("");
  }
    
  var where;
  var animhtml;

  if (spellcount["animring" + onwhat.getSerial()]) { 
    DebugWrite("magic", "Tried to create a second ring on " + onwhat.getName() + ".<br />");
    return; 
  }  //if there's already a sparkle playing, don't replace it with another one, just play the first only
  spellcount["animring" + onwhat.getSerial()] = 1;
  DebugWrite("magic", "Incrementing spell effects count to " + spellcount['anim' + onwhat.getSerial()] + ".<br />");
  var displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  
  var centerx = onwhat.getx();
  var centery = onwhat.gety();
  for (var i = centerx-1; i<=centerx+1; i++) {
    for (var j = centery-1; i<=centery+1; i++) {
      where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
      if ((i >= displayspecs.leftedge) && (i <= displayspecs.rightedge) && (j >= displayspecs.topedge) && (j <= displayspecs.bottomedge)) {
        animhtml = '<div id="animring' + onwhat.getSerial() + i + 'x' + j + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; background-image:url(\'graphics/' + ringfile + '\');background-repeat:no-repeat; background-position: 0px 0px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';    
      } else {
        animhtml = '<div id="animring' + onwhat.getSerial() + i + 'x' + j + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; background-image:url(\'graphics/spacer.gif\');background-repeat:no-repeat; background-position: 0px 0px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';            
      }
      $("#spelleffects").append(animhtml);
    }  
  }
  
  DebugWrite("magic", "Placed a " + ringfile + " ring on " + onwhat.getName() + ".<br />");
  AnimateRing(onwhat,ringfile,retval,endturn,secondring, firstringcallback, secondringcallback);  
  return;
}

function AnimateRing(onwhat, ringfile, retval, endturn, secondring, firstringcallback, secondringcallback) {
  var spellcountid = "animring" + onwhat.getSerial();
  if (!spellcount[spellcountid]) {
    $("#"+spellcountid).html("");
    $("#"+spellcountid).css("background-image", "");
    DebugWrite("magic", "Spellcount zeroed out externally. Ceasing animating.<br />");
    return;
  }
  var centerx = onwhat.getx();
  var centery = onwhat.gety();
  if (spellcount[spellcountid] === 192) {
    DebugWrite("magic", "Ring on " + onwhat.getName() + " finished.<br />");
    delete spellcount[spellcountid];
    for (i=centerx-1;i<=centerx+1;i++) {
      for (var j = centery-1; i<=centery+1; i++) {
        $("#"+spellcountid + i + 'x' + j).html("");
        $("#"+spellcountid + i + 'x' + j).css("background-image", "");        
      }
    }
    if (typeof firstringcallback === "function") {
      firstringcallback(onwhat);
    }
    if (secondring) {
      PlayRing(onwhat, secondring, endturn,0,secondringcallback);
      return;
    }
    if (endturn) {
      onwhat.endTurn(retval["initmod"]);
      return;
    }
  }
  var displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  var where;
  where.x = 0;
  where.y = 0;
  var animurl = "";
  for (i=centerx-1;i<=centerx+1;i++) {
    for (var j = centery-1; i<=centery+1; i++) {
      if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onewhat.gety() <= displayspecs.bottomedge)) {
        where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
        animurl = "url('graphics/" + ringfile + "')";
      } else {
        animurl = "url('graphics/spacer.gif')";
      }
      var animframe = spellcount[spellcountid]-1;
      animframe = Math.floor(animframe/3);
      var animx = 0;
      var animy = 0;
      while (animframe > 7) {
        animy = animy-32;
        animframe = animframe - 8;
      }
      animx = -32*animframe;

      $("#"+spellcountid).css("background-position", animx + "px " + animy + "py");
      $("#"+spellcountid).css("background-image", animurl);
      $("#"+spellcountid).css("left", where.x);
      $("#"+spellcountid).css("top", where.y);
      
    }
  }

  spellcount[spellcountid]++;
  setTimeout(AnimateRing(onwhat, ringfile, retval, endturn, secondring, firstringcallback, secondringcallback), 100);

}


function TestRing() {
  var displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  var testspot = getCoords(PC.getHomeMap(),displayspecs.leftedge, PC.gety());
  testspot.x -= 32;
  var animhtml = '<div id="animringtest" style="position: absolute; left: ' + testspot.x + 'px; top: ' + testspot.y + 'px; background-image:url(\'graphics/red-carpet.gif\');background-repeat:no-repeat; background-position: 0px 0px;"><img src="graphics/spacer.gif" width="96" height="96" /></div>';  
  $("#spelleffects").append(animhtml);
}
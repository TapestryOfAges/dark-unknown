"use strict";

let magic = {};
let bookmark = {};

function SpellObject(name, level, targets) {
  this.name = name;
  this.level = level;
  this.targets = targets;
  this.reduceresist = 0;
  this.longdesc = "";
  this.infuseddesc = "";
  this.saledesc = ""; 
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
  
	let spellEvent = new GameEvent(this);
  DUTime.addAtTimeInterval(SpellEvent,this.nextActionTime(1));
  
  let nextEntity = DUTime.executeNextEvent().getEntity();
  nextEntity.myTurn(); 
}

SpellObject.prototype.executeSpell = function(caster, infused, free, tgt) {
  // this will be overridden by each spell object
  // caster - the caster of the spell, reader of the scroll, drinker of the potion, etc 
  // infused - was this spell infused when cast 
  // free - If nonzero, don't consume any mana. free === 1 -> scroll, free === 2 -> potion. 
  //        free === 2 will suppress spell ephemeralObject apply text.
  // tgt - target of the spell when it is cast by an NPC. 

  return {fin:1, txt:"", input:"&gt;"};
}

SpellObject.prototype.expireSpell = function() {
  DUTime.removeEntityFrom(this);
}

SpellObject.prototype.getManaCost = function(infuse) {
  let multiplier = 1;
  if (infuse) { multiplier = 2; }
  let cost = this.getLevel() * multiplier;
  return cost; 
}

function CheckResist (caster, tgt, infused, diffmod) {
  // Base chance, + bonus from armor
  // caster and target level each modify by 5% either way
  // 15% harder to resist if infused
  // caster having super-high Int (>20) makes spell 10% harder to resist
  let chance = BASE_RESIST_CHANCE + tgt.getResist("magic") + tgt.getLevel()*5 - caster.getLevel()*5 - infused*15;
  if (caster.getInt() > 20) { chance -= 10; }
  if (diffmod) { chance += diffmod; }
  
  if (chance < 0) { chance = 0; }
  
  if (tgt.getSpellEffectsByName("Curse")) { chance = chance/2; }
  
  let resist = Dice.roll("1d100-1");
  
  if (resist <= chance) {
    if (resist === 0) { resist = chance; }
    return resist; 
  } 
  return 0;
}

function GetSpellID(num) {
  let spellid = (Math.pow(2,(num-1)));
  return spellid;
}

for (let i=1;i<=8;i++) {
  magic[i] = {};
}

// Create Spell Consts
const SPELL_AUDACHTA_SCRIBE_LEVEL = 1;
const SPELL_AUDACHTA_SCRIBE_ID = GetSpellID(1);
const SPELL_CURE_LEVEL = 1;
const SPELL_CURE_ID = GetSpellID(2);
const SPELL_DISARM_TRAP_LEVEL = 1;
const SPELL_DISARM_TRAP_ID = GetSpellID(3);
const SPELL_DISTRACT_LEVEL = 1;
const SPELL_DISTRACT_ID = GetSpellID(4);
const SPELL_FLAME_BLADE_LEVEL = 1;
const SPELL_FLAME_BLADE_ID = GetSpellID(5);
const SPELL_LIGHT_LEVEL = 1;
const SPELL_LIGHT_ID = GetSpellID(6);
const SPELL_MEND_LEVEL = 1;
const SPELL_MEND_ID = GetSpellID(7);
const SPELL_VULNERABILITY_LEVEL = 1;
const SPELL_VULNERABILITY_ID = GetSpellID(8);

const SPELL_ILLUSION_LEVEL = 2;
const SPELL_ILLUSION_ID = GetSpellID(1);
const SPELL_IRON_FLESH_LEVEL = 2;
const SPELL_IRON_FLESH_ID = GetSpellID(2);
const SPELL_LESSER_HEAL_LEVEL = 2;
const SPELL_LESSER_HEAL_ID = GetSpellID(3);
const SPELL_MAGIC_BOLT_LEVEL = 2;
const SPELL_MAGIC_BOLT_ID = GetSpellID(4);
const SPELL_POISON_CLOUD_LEVEL = 2;
const SPELL_POISON_CLOUD_ID = GetSpellID(5);
const SPELL_PROTECTION_LEVEL = 2;
const SPELL_PROTECTION_ID = GetSpellID(6);
const SPELL_UNLOCK_LEVEL = 2;
const SPELL_UNLOCK_ID = GetSpellID(7);
const SPELL_WIND_CHANGE_LEVEL = 2;
const SPELL_WIND_CHANGE_ID = GetSpellID(8);

const SPELL_DISPEL_LEVEL = 3;
const SPELL_DISPEL_ID = GetSpellID(1);
const SPELL_DISRUPT_UNDEAD_LEVEL = 3;
const SPELL_DISRUPT_UNDEAD_ID = GetSpellID(2);
const SPELL_FIRE_ARMOR_LEVEL = 3;
const SPELL_FIRE_ARMOR_ID = GetSpellID(3);
const SPELL_FIREBALL_LEVEL = 3;
const SPELL_FIREBALL_ID = GetSpellID(4);
const SPELL_OPEN_GATE_LEVEL = 3;
const SPELL_OPEN_GATE_ID = GetSpellID(5);
const SPELL_RETURN_LEVEL = 3;
const SPELL_RETURN_ID = GetSpellID(6);
const SPELL_TELEKINESIS_LEVEL = 3;
const SPELL_TELEKINESIS_ID = GetSpellID(7);
const SPELL_WALL_OF_FLAME_LEVEL = 3;
const SPELL_WALL_OF_FLAME_ID = GetSpellID(8);

const SPELL_BLESSING_LEVEL = 4;
const SPELL_BLESSING_ID = GetSpellID(1);
const SPELL_BLINK_LEVEL = 4;
const SPELL_BLINK_ID = GetSpellID(2);
const SPELL_HEAL_LEVEL = 4;
const SPELL_HEAL_ID = GetSpellID(3);
const SPELL_ICEBALL_LEVEL = 4;
const SPELL_ICEBALL_ID = GetSpellID(4);
const SPELL_LIFE_DRAIN_LEVEL = 4;
const SPELL_LIFE_DRAIN_ID = GetSpellID(5);
const SPELL_SMITE_LEVEL = 4;
const SPELL_SMITE_ID = GetSpellID(6);
const SPELL_TELEPATHY_LEVEL = 4;
const SPELL_TELEPATHY_ID = GetSpellID(7);
const SPELL_WATER_WALK_LEVEL = 4;
const SPELL_WATER_WALK_ID = GetSpellID(8);

const SPELL_CRYSTAL_TRAP_LEVEL = 5;
const SPELL_CRYSTAL_TRAP_ID = GetSpellID(1);
const SPELL_ETHEREAL_VISION_LEVEL = 5;
const SPELL_ETHEREAL_VISION_ID = GetSpellID(2);
const SPELL_MIRROR_WARD_LEVEL = 5;
const SPELL_MIRROR_WARD_ID = GetSpellID(3);
const SPELL_PARALYZE_LEVEL = 5;
const SPELL_PARALYZE_ID = GetSpellID(4);
const SPELL_PEER_LEVEL = 5;
const SPELL_PEER_ID = GetSpellID(5);
const SPELL_SHOCKWAVE_LEVEL = 5;
const SPELL_SHOCKWAVE_ID = GetSpellID(6);
const SPELL_SUMMON_ALLY_LEVEL = 5;
const SPELL_SUMMON_ALLY_ID = GetSpellID(7);
const SPELL_SWORDSTRIKE_LEVEL = 5;
const SPELL_SWORDSTRIKE_ID = GetSpellID(8);

const SPELL_EMPOWER_LEVEL = 6;
const SPELL_EMPOWER_ID = GetSpellID(1);
const SPELL_EXPLOSION_LEVEL = 6;
const SPELL_EXPLOSION_ID = GetSpellID(2);
const SPELL_JINX_LEVEL = 6;
const SPELL_JINX_ID = GetSpellID(3);
const SPELL_MASS_CURSE_LEVEL = 6;
const SPELL_MASS_CURSE_ID = GetSpellID(4);
const SPELL_NEGATE_MAGIC_LEVEL = 6;
const SPELL_NEGATE_MAGIC_ID = GetSpellID(5);
const SPELL_STORM_LEVEL = 6;
const SPELL_STORM_ID = GetSpellID(6);
const SPELL_TREMOR_LEVEL = 6;
const SPELL_TREMOR_ID = GetSpellID(7);
const SPELL_WEATHER_CONTROL_LEVEL = 6;
const SPELL_WEATHER_CONTROL_ID = GetSpellID(8);

const SPELL_CHARM_LEVEL = 7;
const SPELL_CHARM_ID = GetSpellID(1);
const SPELL_ETHEREAL_TRAVEL_LEVEL = 7;
const SPELL_ETHEREAL_TRAVEL_ID = GetSpellID(2);
const SPELL_FEAR_LEVEL = 7;
const SPELL_FEAR_ID = GetSpellID(3);
const SPELL_FIRE_AND_ICE_LEVEL = 7;
const SPELL_FIRE_AND_ICE_ID = GetSpellID(4);
const SPELL_INVULNERABILITY_LEVEL = 7;
const SPELL_INVULNERABILITY_ID = GetSpellID(5);
const SPELL_METEOR_SWARM_LEVEL = 7;
const SPELL_METEOR_SWARM_ID = GetSpellID(6);
const SPELL_MIND_BLAST_LEVEL = 7;
const SPELL_MIND_BLAST_ID = GetSpellID(7);
const SPELL_PERMANENCE_LEVEL = 7;
const SPELL_PERMANENCE_ID = GetSpellID(8);

const SPELL_ARMAGEDDON_LEVEL = 8;
const SPELL_ARMAGEDDON_ID = GetSpellID(1);
const SPELL_ARROW_OF_GLASS_LEVEL = 8;
const SPELL_ARROW_OF_GLASS_ID = GetSpellID(2);
const SPELL_BUILD_GATE_LEVEL = 8;
const SPELL_BUILD_GATE_ID = GetSpellID(3);
const SPELL_CONFLAGRATION_LEVEL = 8;
const SPELL_CONFLAGRATION_ID = GetSpellID(4);
const SPELL_CONJURE_DAEMON_LEVEL = 8;
const SPELL_CONJURE_DAEMON_ID = GetSpellID(5);
const SPELL_QUICKNESS_LEVEL = 8;
const SPELL_QUICKNESS_ID = GetSpellID(6);
const SPELL_REINCARNATE_LEVEL = 8;
const SPELL_REINCARNATE_ID = GetSpellID(7);
const SPELL_TIME_STOP_LEVEL = 8;
const SPELL_TIME_STOP_ID = GetSpellID(8);

magic[SPELL_AUDACHTA_SCRIBE_LEVEL][SPELL_AUDACHTA_SCRIBE_ID] = new SpellObject("Audachta Scribe", SPELL_AUDACHTA_SCRIBE_LEVEL, 1);      // heal?
magic[SPELL_CURE_LEVEL][SPELL_CURE_ID] = new SpellObject("Cure Ailment", SPELL_CURE_LEVEL, 0);      // heal
magic[SPELL_DISARM_TRAP_LEVEL][SPELL_DISARM_TRAP_ID] = new SpellObject("Disarm Trap", SPELL_DISARM_TRAP_LEVEL, 0);   // sound effect is sfx_unlock
magic[SPELL_DISTRACT_LEVEL][SPELL_DISTRACT_ID] = new SpellObject("Distract", SPELL_DISTRACT_LEVEL, 0);  // debuff
magic[SPELL_FLAME_BLADE_LEVEL][SPELL_FLAME_BLADE_ID] = new SpellObject("Flame Blade", SPELL_FLAME_BLADE_LEVEL, 0);     // flames
magic[SPELL_LIGHT_LEVEL][SPELL_LIGHT_ID] = new SpellObject("Light", SPELL_LIGHT_LEVEL, 0);  // has sound
magic[SPELL_MEND_LEVEL][SPELL_MEND_ID] = new SpellObject("Mend", SPELL_MEND_LEVEL, 1);  // heal?
magic[SPELL_VULNERABILITY_LEVEL][SPELL_VULNERABILITY_ID] = new SpellObject("Vulnerability", SPELL_VULNERABILITY_LEVEL, 1);  // melee hit

magic[SPELL_ILLUSION_LEVEL][SPELL_ILLUSION_ID] = new SpellObject("Illusion", SPELL_ILLUSION_LEVEL, 1);  // generic
magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID] = new SpellObject("Iron Flesh", SPELL_IRON_FLESH_LEVEL, 0);   // blessing?
magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID] = new SpellObject("Lesser Heal", SPELL_LESSER_HEAL_LEVEL, 0);   // heal
magic[SPELL_MAGIC_BOLT_LEVEL][SPELL_MAGIC_BOLT_ID] = new SpellObject("Magic Bolt", SPELL_MAGIC_BOLT_LEVEL, 1);   // attack spell, missile hit?
magic[SPELL_POISON_CLOUD_LEVEL][SPELL_POISON_CLOUD_ID] = new SpellObject("Poison Cloud", SPELL_POISON_CLOUD_LEVEL, 1);  // generic
magic[SPELL_PROTECTION_LEVEL][SPELL_PROTECTION_ID] = new SpellObject("Protection", SPELL_PROTECTION_LEVEL, 0);   // blessing
magic[SPELL_UNLOCK_LEVEL][SPELL_UNLOCK_ID] = new SpellObject("Unlock", SPELL_UNLOCK_LEVEL, 0);     // sfx_unlock
magic[SPELL_WIND_CHANGE_LEVEL][SPELL_WIND_CHANGE_ID] = new SpellObject("Wind Change", SPELL_WIND_CHANGE_LEVEL, 0);     // whoosh?

magic[SPELL_DISPEL_LEVEL][SPELL_DISPEL_ID] = new SpellObject("Dispel", SPELL_DISPEL_LEVEL, 0);   // heal?
magic[SPELL_DISRUPT_UNDEAD_LEVEL][SPELL_DISRUPT_UNDEAD_ID] = new SpellObject("Disrupt Undead", SPELL_DISRUPT_UNDEAD_LEVEL, 0);   // attack spell
magic[SPELL_FIRE_ARMOR_LEVEL][SPELL_FIRE_ARMOR_ID] = new SpellObject("Fire Armor", SPELL_FIRE_ARMOR_LEVEL, 0);  // flames
magic[SPELL_FIREBALL_LEVEL][SPELL_FIREBALL_ID] = new SpellObject("Fireball", SPELL_FIREBALL_LEVEL, 1);  // attack spell, explosion
magic[SPELL_ICEBALL_LEVEL][SPELL_ICEBALL_ID] = new SpellObject("Iceball", SPELL_ICEBALL_LEVEL, 1);  // attack spell, glass shatter
magic[SPELL_TELEKINESIS_LEVEL][SPELL_TELEKINESIS_ID] = new SpellObject("Telekinesis", SPELL_TELEKINESIS_LEVEL, 1);   // generic
magic[SPELL_TELEPATHY_LEVEL][SPELL_TELEPATHY_ID] = new SpellObject("Telepathy", SPELL_TELEPATHY_LEVEL, 0);   // generic
magic[SPELL_WALL_OF_FLAME_LEVEL][SPELL_WALL_OF_FLAME_ID] = new SpellObject("Wall of Flame", SPELL_WALL_OF_FLAME_LEVEL, 1);    // flames

magic[SPELL_BLESSING_LEVEL][SPELL_BLESSING_ID] = new SpellObject("Blessing", SPELL_BLESSING_LEVEL, 0);  // blessing
magic[SPELL_BLINK_LEVEL][SPELL_BLINK_ID] = new SpellObject("Blink", SPELL_BLINK_LEVEL, 0);  // blessing
magic[SPELL_ETHEREAL_VISION_LEVEL][SPELL_ETHEREAL_VISION_ID] = new SpellObject("Ethereal Vision", SPELL_ETHEREAL_VISION_LEVEL, 0);  // blessing
magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID] = new SpellObject("Heal", SPELL_HEAL_LEVEL, 0);  // heal
magic[SPELL_LIFE_DRAIN_LEVEL][SPELL_LIFE_DRAIN_ID] = new SpellObject("Life Drain", SPELL_LIFE_DRAIN_LEVEL, 1);  // # M Dam  curse
magic[SPELL_OPEN_GATE_LEVEL][SPELL_OPEN_GATE_ID] = new SpellObject("Open Gate", SPELL_OPEN_GATE_LEVEL, 0);    // teleport (effect generated from moongate)
magic[SPELL_SMITE_LEVEL][SPELL_SMITE_ID] = new SpellObject("Smite", SPELL_SMITE_LEVEL, 0);  // # M Dam on 3 random nearby foes   attack spell, thunder
magic[SPELL_WATER_WALK_LEVEL][SPELL_WATER_WALK_ID] = new SpellObject("Water Walking", SPELL_WATER_WALK_LEVEL, 0);   // blessing
 
magic[SPELL_CRYSTAL_TRAP_LEVEL][SPELL_CRYSTAL_TRAP_ID] = new SpellObject("Crystal Prison", SPELL_CRYSTAL_TRAP_LEVEL, 1);  // generic?
magic[SPELL_MIRROR_WARD_LEVEL][SPELL_MIRROR_WARD_ID] = new SpellObject("Mirror Ward", SPELL_MIRROR_WARD_LEVEL, 0);  // blessing
magic[SPELL_PARALYZE_LEVEL][SPELL_PARALYZE_ID] = new SpellObject("Paralyze", SPELL_PARALYZE_LEVEL, 1);    // curse
magic[SPELL_PEER_LEVEL][SPELL_PEER_ID] = new SpellObject("Peer", SPELL_PEER_LEVEL, 0);    // generic?
magic[SPELL_RETURN_LEVEL][SPELL_RETURN_ID] = new SpellObject("Return", SPELL_RETURN_LEVEL, 0);    // none (moongate)
magic[SPELL_SHOCKWAVE_LEVEL][SPELL_SHOCKWAVE_ID] = new SpellObject("Shockwave", SPELL_SHOCKWAVE_LEVEL, 0);   // # M Dam in ring around caster, pushes back  // thunder
magic[SPELL_SUMMON_ALLY_LEVEL][SPELL_SUMMON_ALLY_ID] = new SpellObject("Summon Ally", SPELL_SUMMON_ALLY_LEVEL, 1);   // generic
magic[SPELL_SWORDSTRIKE_LEVEL][SPELL_SWORDSTRIKE_ID] = new SpellObject("Swordstrike", SPELL_SWORDSTRIKE_LEVEL, 1);  // attack spell, melee hit  # H Dam to single, L to surrounding foes  

magic[SPELL_EMPOWER_LEVEL][SPELL_EMPOWER_ID] = new SpellObject("Empower", SPELL_EMPOWER_LEVEL, 0);  // bless
magic[SPELL_EXPLOSION_LEVEL][SPELL_EXPLOSION_ID] = new SpellObject("Explosion", SPELL_EXPLOSION_LEVEL, 1);  // explosion
magic[SPELL_JINX_LEVEL][SPELL_JINX_ID] = new SpellObject("Jinx", SPELL_JINX_LEVEL, 0);  // curse
magic[SPELL_MASS_CURSE_LEVEL][SPELL_MASS_CURSE_ID] = new SpellObject("Mass Curse", SPELL_MASS_CURSE_LEVEL, 0);  // curse
magic[SPELL_NEGATE_MAGIC_LEVEL][SPELL_NEGATE_MAGIC_ID] = new SpellObject("Negate Magic", SPELL_NEGATE_MAGIC_LEVEL, 0);  // curse
magic[SPELL_STORM_LEVEL][SPELL_STORM_ID] = new SpellObject("Storm", SPELL_STORM_LEVEL, 0);  // lightning zap
magic[SPELL_TREMOR_LEVEL][SPELL_TREMOR_ID] = new SpellObject("Tremor", SPELL_TREMOR_LEVEL, 0);  // ??
magic[SPELL_WEATHER_CONTROL_LEVEL][SPELL_WEATHER_CONTROL_ID] = new SpellObject("Weather Control", SPELL_WEATHER_CONTROL_LEVEL, 0);  // whoosh?

magic[SPELL_CHARM_LEVEL][SPELL_CHARM_ID] = new SpellObject("Charm", SPELL_CHARM_LEVEL, 1);   // curse
magic[SPELL_ETHEREAL_TRAVEL_LEVEL][SPELL_ETHEREAL_TRAVEL_ID] = new SpellObject("Ethereal Travel", SPELL_ETHEREAL_TRAVEL_LEVEL, 0);   // ?? none (moongate?) (red)
magic[SPELL_FEAR_LEVEL][SPELL_FEAR_ID] = new SpellObject("Fear", SPELL_FEAR_LEVEL, 0);   // curse
magic[SPELL_FIRE_AND_ICE_LEVEL][SPELL_FIRE_AND_ICE_ID] = new SpellObject("Fire and Ice", SPELL_FIRE_AND_ICE_LEVEL, 1);  // explosion, glass shatter
magic[SPELL_INVULNERABILITY_LEVEL][SPELL_INVULNERABILITY_ID] = new SpellObject("Invulnerability", SPELL_INVULNERABILITY_LEVEL, 0);   // bless
magic[SPELL_METEOR_SWARM_LEVEL][SPELL_METEOR_SWARM_ID] = new SpellObject("Meteor Swarm", SPELL_METEOR_SWARM_LEVEL, 0);  // explosion
magic[SPELL_MIND_BLAST_LEVEL][SPELL_MIND_BLAST_ID] = new SpellObject("Mind Blast", SPELL_MIND_BLAST_LEVEL, 1);  // ??
magic[SPELL_PERMANENCE_LEVEL][SPELL_PERMANENCE_ID] = new SpellObject("Permanence", SPELL_PERMANENCE_LEVEL, 0);  // bless 

magic[SPELL_ARMAGEDDON_LEVEL][SPELL_ARMAGEDDON_ID] = new SpellObject("Armageddon", SPELL_ARMAGEDDON_LEVEL, 0); // ??
magic[SPELL_ARROW_OF_GLASS_LEVEL][SPELL_ARROW_OF_GLASS_ID] = new SpellObject("Arrow of Glass", SPELL_ARROW_OF_GLASS_LEVEL, 1);  // glass shatter
magic[SPELL_BUILD_GATE_LEVEL][SPELL_BUILD_GATE_ID] = new SpellObject("Build Gate", SPELL_BUILD_GATE_LEVEL, 1);  // ??
magic[SPELL_CONFLAGRATION_LEVEL][SPELL_CONFLAGRATION_ID] = new SpellObject("Conflagration", SPELL_CONFLAGRATION_LEVEL, 1);  // explosion
magic[SPELL_CONJURE_DAEMON_LEVEL][SPELL_CONJURE_DAEMON_ID] = new SpellObject("Conjure Daemon", SPELL_CONJURE_DAEMON_LEVEL, 1);  // generic
magic[SPELL_QUICKNESS_LEVEL][SPELL_QUICKNESS_ID] = new SpellObject("Quickness", SPELL_QUICKNESS_LEVEL, 0);   // bless
magic[SPELL_REINCARNATE_LEVEL][SPELL_REINCARNATE_ID] = new SpellObject("Reincarnate", SPELL_REINCARNATE_LEVEL, 0);  // bless
magic[SPELL_TIME_STOP_LEVEL][SPELL_TIME_STOP_ID] = new SpellObject("Time Stop", SPELL_TIME_STOP_LEVEL, 0);  // bless

// Spells begin below

// Audachta Scribe
magic[SPELL_AUDACHTA_SCRIBE_LEVEL][SPELL_AUDACHTA_SCRIBE_ID].getLongDesc = function () {
  return "Adds a spell for which you have an Audachta Nemesos to your spellbook. Consumes the Audachta.";
}
magic[SPELL_AUDACHTA_SCRIBE_LEVEL][SPELL_AUDACHTA_SCRIBE_ID].getInfusedDesc = function() {
  return "No additional effect.";
}

magic[SPELL_AUDACHTA_SCRIBE_LEVEL][SPELL_AUDACHTA_SCRIBE_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Audachta Scribe.<br />");
  let resp = {fin:1};

  if (caster.getHomeMap().getName().indexOf("abyss") > -1) {
    retval["txt"] = "You cannot do that here.";
    retval["fin"] = 2;
    return retval;
  }

  let mademenu = MakeInventoryList("audachta");
  if (!mademenu.length) {
    resp["fin"] = 0;
    resp["txt"] = "You have no audachta nemesos.";
    resp["input"] = "&gt;";

    return resp;
  }

  gamestate.setMode("zstats");
  targetCursor.restrictTo = "audachta";
  targetCursor.page = 2;
  targetCursor.command = "c";
  targetCursor.spellName = "AudachtaScribe";
  targetCursor.spelldetails = {caster:caster, infused:infused, free:free};
  
  DisplayInventory("audachta");

  resp["txt"] = "";
  resp["input"] = "&gt; Cast Audachta Scribe on: ";
  resp["fin"] = 3;	
  gamestate.setMode("zstats");
  return resp;
}

function PerformAudachtaScribe(caster,infused,free,tgt) {
  let resp = {};
  resp["fin"] = 2;
  resp["usefin"] = 1;

  if (caster.knowsSpell(tgt.spelllevel, tgt.spellnum)) {
    resp["txt"] = "You already know that spell!";

  } else {
    if (!free) {
      let mana = magic[SPELL_AUDACHTA_SCRIBE_LEVEL][SPELL_AUDACHTA_SCRIBE_ID].getManaCost(0);
      caster.modMana(-1*mana);
      DebugWrite("magic", "Spent " + mana + " mana.<br />");
    }  
    caster.addSpell(tgt.spelllevel, tgt.spellnum);
    resp["txt"] = "You learn the spell " + tgt.spellname + "!";
    caster.removeFromInventory(tgt);
    DUPlaySound("sfx_ding");
  }

  resp["input"] = "&gt;";
  return resp;
}

// Cure
magic[SPELL_CURE_LEVEL][SPELL_CURE_ID].getLongDesc = function() {
  return "Removes <style='color:#58FA58'>poison</style> and <style='color:#58FA58'>Disease</style>.";
}
magic[SPELL_CURE_LEVEL][SPELL_CURE_ID].getInfusedDesc = function () {
  return "Also heals for " + Dice.rollmin(PC.getLevel() + "d4+2") + "-" + Dice.rollmax(PC.getLevel() + "d4+2") + ".";
}

magic[SPELL_CURE_LEVEL][SPELL_CURE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Cure.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let effects = caster.getSpellEffects();
  let sparkle = 0;
  if (effects) {
    for (let i=0; i<effects.length; i++) {
      if (effects[i].getName() === "Poison") {
        ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
        DUPlaySound("heal");
        sparkle = 1;
        if (caster === PC) {
          maintext.delayedAddText("You are cured of poison!");
        }
        effects[i].endEffect(1);
      }
      if (effects[i].getName() === "Disease") {
        effects[i].endEffect(1);
        if (caster === PC) {
          maintext.delayedAddText("You are cured of disease!");
        }
        if (!sparkle) {
          ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
          DUPlaySound("heal");
        }
      }
    }
  }
  if (infused) {
    let die = caster.getLevel() + "d4+2";
    let heal = Dice.roll(die);
    caster.healMe(heal, caster);
  }
  return resp;
}

// Disarm Trap
magic[SPELL_DISARM_TRAP_LEVEL][SPELL_DISARM_TRAP_ID].getLongDesc = function () {
  return "Attempts to disarm all adjacent traps.";
}
magic[SPELL_DISARM_TRAP_LEVEL][SPELL_DISARM_TRAP_ID].getInfusedDesc = function() {
  return "Significantly increases the chance of success.";
}

magic[SPELL_DISARM_TRAP_LEVEL][SPELL_DISARM_TRAP_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Disarm Trap.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let mult = 1;
  let power = caster.getInt();
  if (free) {
    power = 15;
  }
  if (infused) { mult = 2; }
  for (let i=-1; i<=1; i++) {
    for (let j=-1; j<=1; j++) {
      let checkx = caster.getx() + i;
      let checky = caster.gety() + j;
      let castermap = caster.getHomeMap();
      let thetile = castermap.getTile(checkx,checky)
      if (thetile === "OoB") { continue; }
      let allfeatures = thetile.getFeatures();
      for (let i=0;i<allfeatures.length;i++) {
        let val = allfeatures[i];
        if (val.trapped) {
          let chance = (100 - (val.trapchallenge*2+10) + (power*mult));
          DebugWrite("magic", "Chance to disarm trap with trap level=" + val.trapchallenge + ", chance to disarm is " + chance + "%.");
          if (chance < 5) { chance = 5; }
          let roll = Dice.roll("1d100");
          if (roll <= chance) { 
            val.disarmTrap(); 
            maintext.addText("Trap disarmed!"); 
            ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_ORANGE);
          }
          else { 
            maintext.addText("Trap resists."); 
            ShowEffect(val, 500, "X.gif");
          }
        } else if (val.name === "CrystalTrapSpace") {
          let chance = (50 + (power*mult));
          DebugWrite("magic", "Chance to disarm crystal trap is " + chance + "%.");
          if (chance < 5) { chance = 5; }
          let roll = Dice.roll("1d100");
          if (roll <= chance) { 
            val.disarmTrap(); 
            maintext.addText("Trap disarmed!"); 
            ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_ORANGE);
          }
        }
      }
    }
  }
  return resp;
}

// Distract
magic[SPELL_DISTRACT_LEVEL][SPELL_DISTRACT_ID].getLongDesc = function () {
  if (PC.getInt() > 20) {
    return "Enemies within a radius of 4 resist or become distracted, lowering their chance to hit by " + Math.round(PC.getInt()/2) + "%.";
  } else {
    return "Enemies within a radius of 3 resist or become distracted, lowering their chance to hit " + Math.round(PC.getInt()/2) + "%.";
  }
}
magic[SPELL_DISTRACT_LEVEL][SPELL_DISTRACT_ID].getInfusedDesc = function () {
  return "Increases the radius by 2 and makes it more difficult to resist.";
}

magic[SPELL_DISTRACT_LEVEL][SPELL_DISTRACT_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Distract.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  
  let radius = 3;
  if (!free & caster.getInt() > 20) { radius = 4; }
  if (infused) { radius = radius * 1.5; } 
  let power = caster.getInt()/2;
  if (free) { power = Dice.roll("1d3+7"); }
  if (infused) { power = power*1.5; }
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    if (val.getAttitude() !== caster.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        if (!CheckResist(caster,val,infused,0)) {
          let distract = localFactory.createTile("Distract");
          ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
          let desc = val.getDesc() + " is distracted!";
          // Not necessary for PC - ephemeral object's start desc is sufficient
          let duration = power * SCALE_TIME;
          distract.setExpiresTime(duration + DUTime.getGameClock());
          distract.setPower(power);
          val.addSpellEffect(distract, Math.max(0,free-1) );
        } else {
          let desc = val.getDesc() + " resists!";
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
  }

  return resp;
}

// Flame Blade
magic[SPELL_FLAME_BLADE_LEVEL][SPELL_FLAME_BLADE_ID].getLongDesc = function () {
  return "Sheathes your melee weapon in flame, dealing an extra " + Dice.rollmin(DMG_NEGLIGABLE) + "-" + Dice.rollmax(DMG_NEGLIGABLE) + "damage for 1 hit.";
}
magic[SPELL_FLAME_BLADE_LEVEL][SPELL_FLAME_BLADE_ID].getInfusedDesc = function() {
  return "Damage increases to " + Dice.rollmin(DMG_NEGLIGABLE) + ".";
}

magic[SPELL_FLAME_BLADE_LEVEL][SPELL_FLAME_BLADE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Flame Blade.<br />");
  let resp = {fin:1};
  if ((caster.getWeapon() === "Fists") || (caster.getWeapon() === "NaturalWeapon")) {
    if (caster === PC) {
      maintext.addText("You must have a weapon equipped.");
    }
    resp["fin"] = 0;
    return resp;  
  }
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let flameblade = localFactory.createTile("FlameBlade");
  let duration = caster.getInt() * 2 * SCALE_TIME;
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
  let endtime = duration + DUTime.getGameClock();
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  flameblade.setExpiresTime(endtime);
  caster.addSpellEffect(flameblade, Math.max(0,free-1) );
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
  
  return resp;
}

// Light
magic[SPELL_LIGHT_LEVEL][SPELL_LIGHT_ID].getLongDesc = function() {
  return "Generates light (radius 3).";
}
magic[SPELL_LIGHT_LEVEL][SPELL_LIGHT_ID].getInfusedDesc = function () {
  return "Radius expands to 5.";
}

magic[SPELL_LIGHT_LEVEL][SPELL_LIGHT_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Light.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let liobj = localFactory.createTile("Light");
  let dur = 20 * caster.getInt() * .3;
  if (free) { dur = 100; }
  if (infused) {dur = dur * 3; }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  if (infused) { liobj.setPower(4); }   // defaults to 2
  
  DUPlaySound("sfx_spell_light"); 
  caster.addSpellEffect(liobj, Math.max(0,free-1) );
  
  DrawCharFrame();
  return resp;
}

// Mend
magic[SPELL_MEND_LEVEL][SPELL_MEND_ID].getLongDesc = function () {
  return "Repairs a cracked, ripped, or otherwise damaged item.";
}
magic[SPELL_MEND_LEVEL][SPELL_MEND_ID].getInfusedDesc = function() {
  return "Can even repair something that has been broken in half.";
}

magic[SPELL_MEND_LEVEL][SPELL_MEND_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Mend.<br />");
  let resp = {fin:1};

  if (caster !== PC) {
    resp = PerformMend(caster, infused, free, tgt);
    return resp;
  }

  if (caster.getHomeMap().getName().indexOf("abyss") > -1) {
    retval["txt"] = "You cannot do that here.";
    retval["fin"] = 2;
    return retval;
  }
  
  CreateTargetCursor({sticky: 0, command:'c',spellName:'Mend',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "feature"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 1});
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;  // was 0
  gamestate.setMode("target");
  return resp;
}

function PerformMend(caster,infused,free,tgt) {
  let resp = {fin:2,usefin:1};
  let desc = "";
  
  if (!free) {
    let mana = magic[SPELL_MEND_LEVEL][SPELL_MEND_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (tgt.repairNeedsInfusion && !infused) {
    let desc = "The " + tgt.getDesc() + " glows briefly, but is not mended.";
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    resp["txt"] = desc;
  } else {
    tgt.repair();
    let desc = "The " + tgt.getDesc() + " glows briefly, and is mended!";
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    resp["txt"] = desc;    
  }
  resp["input"] = "&gt;";
  return resp;
}

// Vulnerability
magic[SPELL_VULNERABILITY_LEVEL][SPELL_VULNERABILITY_ID].getLongDesc = function() {
  return "Decreases the target's chance to avoid an attack by 10%.";
}
magic[SPELL_VULNERABILITY_LEVEL][SPELL_VULNERABILITY_ID].getInfusedDesc = function() {
  return "Increases the duration, and the decrease becomes 15%.";
}

magic[SPELL_VULNERABILITY_LEVEL][SPELL_VULNERABILITY_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Vulnerability.<br />");
  let resp = {fin:1};
  if (caster !== PC) {
    resp = PerformVulnerability(caster, infused, free, tgt);
    return resp;
  }

  CreateTargetCursor({sticky: 1, command:'c',spellName:'Vulnerability',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});  
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4; // was 0
  gamestate.setMode("target");
  return resp;
}
  
function PerformVulnerability(caster, infused, free, tgt) {
  let resp = {fin:1};
  let desc = "";

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    free = 0;
    let mana = magic[SPELL_VULNERABILITY_LEVEL][SPELL_VULNERABILITY_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  
  if (!CheckResist(caster,tgt,infused,0)) {
    let vulobj = localFactory.createTile("Vulnerability");
  
    let dur = caster.getInt()/2;
    if (infused) { dur = dur * 1.5;}
    if (free) { dur = Dice.roll("1d4+5"); }
    ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
    if (tgt !== PC) {
      desc = tgt.getDesc() + " is vulnerable!";
    } else {
      desc = "You are vulnerable!";
    }
    vulobj.setExpiresTime(dur + DUTime.getGameClock());
    let power = 10;
    if (infused) { power = 15; }
    vulobj.setPower(power);
    tgt.addSpellEffect(vulobj, Math.max(0,free-1) );
  }
  else {
    desc = tgt.getDesc() + " resists!";
    if (tgt === PC) {
      desc = "You resist.";
      // no X over the PC
    } else {
      ShowEffect(tgt, 700, "X.gif");
    }
  }
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);

  resp["txt"] = desc;
  resp["input"] = "&gt;";
  return resp;
}

// Illusion
magic[SPELL_ILLUSION_LEVEL][SPELL_ILLUSION_ID].getLongDesc = function() {
  return "Conjures an illusion to help you in battle. It disappears if struck.";
}
magic[SPELL_ILLUSION_LEVEL][SPELL_ILLUSION_ID].getInfusedDesc = function() { 
  return "The illusion is stronger.";
}

magic[SPELL_ILLUSION_LEVEL][SPELL_ILLUSION_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Illusion.<br />");
  
  if (caster !== PC) {
    let resp = PerformIllusion(caster, infused, free, tgt);
    return resp;
  }

  let resp = {};
  
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  // check for existing illusion if I want to limit to just 1, but for now I don't
  CreateTargetCursor({sticky: 0, command:'c',spellName:'Illusion',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "open"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 3});    
  resp["txt"] = "";
  resp["input"] = "&gt; Choose where to conjure- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformIllusion(caster, infused, free, tgt) {
  let resp = {fin:1};
  let desc = "";

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.x, tgt.y, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "You cannot place your illusion there.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_ILLUSION_LEVEL][SPELL_ILLUSION_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let illusion;
  if (infused) {
    illusion = localFactory.createTile("InfusedIllusionNPC");
  } else {
    illusion = localFactory.createTile("IllusionNPC");
  }
  
  let duration = caster.getInt();
  if (free) { duration = Dice.roll("1d6+12"); }
  duration = duration*2*SCALE_TIME;
  illusion.expiresTime = DUTime.getGameClock() + duration;  // illusion AI needs to check expiresTime and go poof if it is reached
  caster.getHomeMap().placeThing(tgt.x,tgt.y,illusion);
  DrawMainFrame("one",caster.getHomeMap(),illusion.getx(),illusion.gety());
  
  resp["txt"] = "You conjure an illusion to aid you in battle.";
  resp["input"] = "&gt;";
  return resp;
}

// Iron Flesh
magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].getLongDesc = function() {
  return "Absorbs 5 points from hits on you until it has absorbed 10.";
}
magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].getInfusedDesc = function() {
  return "Until it has absorbed 25 points of damage.";
}

magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Iron Flesh.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let liobj = localFactory.createTile("IronFlesh");
  
  let dur = caster.getInt() * .15;
  if (free) { dur = 3; }
  if (infused) {dur = dur * 2; }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  let power = 10;
  if (infused) { power = 25;}   
  liobj.setPower(power);
  
  caster.addSpellEffect(liobj, Math.max(0, free-1) );
  
  DrawCharFrame();
  return resp;
}

// Lesser Heal
magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].getLongDesc = function() {
  return "Heals you for " + Dice.rollmin(PC.getLevel() + "d6" + PC.getLevel()) + "-" + Dice.rollmax(PC.getLevel() + "d6" + PC.getLevel()) + "HP.";
}
magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].getInfusedDesc = function() {
  return "Heals for 1.5x as much.";
}

magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Lesser Heal.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let lvl = caster.getLevel();
  let plus = caster.getLevel();
  if (free) { 
    lvl = Dice.roll("1d2+2"); 
    plus = Dice.roll("1d3+2");
  }
  
  let healamt = Dice.roll(lvl + "d6+" + plus);
  if (infused) { healamt = healamt * 1.5; }
  DebugWrite("magic", "Healing " + healamt + " hp.<br />");
  
  if (!tgt || (caster === PC)) {
    tgt = caster;
  }
  
  ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
  tgt.healMe(healamt, caster);
  if (free !== 2) {
    resp["txt"] = "You feel better!";
  }
  
  return resp;
}

// Magic Bolt
magic[SPELL_MAGIC_BOLT_LEVEL][SPELL_MAGIC_BOLT_ID].getLongDesc = function() {
  return "Deals " + (Dice.rollmin(DMG_NEGLIGABLE)+Math.floor(PC.getInt()/5)+1) + "-" + (Dice.rollmax(DMG_NEGLIGABLE)+Math.floor(PC.getInt()/5)+1) + " magic damage to a single target. Half damage if resisted.";
}
magic[SPELL_MAGIC_BOLT_LEVEL][SPELL_MAGIC_BOLT_ID].getInfusedDesc = function() {
  return "Damage is increased by 1.5x.";
}

magic[SPELL_MAGIC_BOLT_LEVEL][SPELL_MAGIC_BOLT_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Magic Bolt.<br />");
  if (caster !== PC) {
    let resp = PerformMagicBolt(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};
  
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  CreateTargetCursor({sticky: 1, command:'c',spellName:'Magic Bolt',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});    
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformMagicBolt(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};
  let desc = tgt.getDesc();

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_MAGIC_BOLT_LEVEL][SPELL_MAGIC_BOLT_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
  let power = caster.getInt();
  if (free) { power = Dice.roll("1d5+12"); }
  let dmg = RollDamage(DMG_NEGLIGABLE, Math.floor(power/5)+1);
  if (infused) {
    dmg *= 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }

  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  let boltgraphic = {};
  boltgraphic.graphic = "magic-bolt.gif";
  boltgraphic.yoffset = 0;
  boltgraphic.xoffset = 0;
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);
  let descval = {txt: desc};

  let sounds = {};
  let fromcoords = getCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  let tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  let duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  let destgraphic = {graphic:"702.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
  
  AnimateEffect(caster, tgt, fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"force"},0);
  resp["fin"] = -1;
  return resp;
}

// Poison Cloud
magic[SPELL_POISON_CLOUD_LEVEL][SPELL_POISON_CLOUD_ID].getLongDesc = function() {
  let rad = Math.floor(PC.getInt()/10)+1;
  return "Attempts to poison anyone within " + rad + " steps of the selected space.";
}
magic[SPELL_POISON_CLOUD_LEVEL][SPELL_POISON_CLOUD_ID].getInfusedDesc = function() {
  return "Also deals " + Dice.rollmin(DMG_LIGHT) + "-" + Dice.rollmax(DMG_LIGHT) + " damage to each poisoned creature.";
}

magic[SPELL_POISON_CLOUD_LEVEL][SPELL_POISON_CLOUD_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Poison Cloud.<br />");
  if (caster !== PC) {
    let resp = PerformPoisonCloud(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
    
  CreateTargetCursor({sticky: 0, command:'c',spellName:'Poison Cloud',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "open"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});    
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformPoisonCloud(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};

  let tgtmap = caster.getHomeMap();
  if (tgtmap.getLOS(caster.getx(), caster.gety(), tgt.x, tgt.y, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach there!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_POISON_CLOUD_LEVEL][SPELL_POISON_CLOUD_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let power = caster.getInt();
  if (free) { power = Dice.roll("1d5+12"); }  
  let radius = Math.floor(power/10) +1; 

  DebugWrite("magic", "Calculating poison cloud. Radius: " + radius + "<br />");
  
  let anyonepoisoned = 0;
  let potential_targets = tgtmap.getNPCsAndPCs();
  
  for (let i=0;i<potential_targets.length;i++) {
    let val=potential_targets[i];
    if ((GetDistance(val.getx(),val.gety(),tgt.x,tgt.y) < radius) && (val !== caster)) {
      if (tgtmap.getLOS(val.getx(),val.gety(),tgt.x,tgt.y,1) < LOS_THRESHOLD) {
        anyonepoisoned = 1;
        if (val.getSpellEffectsByName("Poison") || CheckResist(caster,val,infused,0) || IsNonLiving(val)) {
          // poison resisted
          ShowEffect(val, 700, "X.gif");
          let desc = val.getDesc() + " resists!";
          if (val === PC) {
            desc = "You resist!";
          }
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);        
          maintext.addText(desc);
        } else {
          ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_GREEN);
          let desc = val.getDesc() + " is poisoned!";
          if (val === PC) {
            desc = "You are poisoned!";
          }
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);        
          maintext.addText(desc);
          let poisontile = localFactory.createTile("Poison");
          let duration = (Dice.roll("2d10") + power - 15);
          if (duration < 2) { duration = 2; }
          duration = duration * SCALE_TIME;
          poisontile.setExpiresTime(duration + DUTime.getGameClock());
          val.addSpellEffect(poisontile);
          // poisoned!
          
          if (infused) {
            let dmg = Dice.roll(DMG_LIGHT);
            val.dealDamage(dmg,caster,"poison");
            // additionally deals some damage
          }
        }
      }
    }
  }
  
  if (!anyonepoisoned) {
    maintext.addText("No one was poisoned by the cloud.");
  }
  resp["input"] = "&gt;";
  return resp;
}

// Protection
magic[SPELL_PROTECTION_LEVEL][SPELL_PROTECTION_ID].getLongDesc = function() {
  return "Decreases your chance of being hit by " + ((PC.getInt()*2/3)+1) + "%.";
}
magic[SPELL_PROTECTION_LEVEL][SPELL_PROTECTION_ID].getLongDesc = function() {
  return "Decreases your chance of being hit by " + Math.floor(((PC.getInt()*2/3)+1)*1.5) + "% instead.";
}

magic[SPELL_PROTECTION_LEVEL][SPELL_PROTECTION_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Protection.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let prot = localFactory.createTile("Protection");
  let duration = caster.getInt() * 3 * SCALE_TIME;
  let power = Math.floor(caster.getInt()*2/3)+1;
  if (infused) { 
    duration = duration * 2; 
    power = Math.floor(power*1.5);
  }
  if (free) {
    duration = 40 * SCALE_TIME;
    power = Dice.roll("1d5+8");
  }
  let endtime = duration + DUTime.getGameClock();
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  prot.setExpiresTime(endtime);
  prot.setPower(power);
  caster.addSpellEffect(prot, Math.max(0, free-1) );
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  
  return resp;
}

// Unlock
magic[SPELL_UNLOCK_LEVEL][SPELL_UNLOCK_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Unlock.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let castermap = caster.getHomeMap();
  let features = castermap.features.getAll();
  for (let i=0;i<features.length;i++) {
    let val=features[i];
    if (typeof val.getLocked == "function") {
      if (GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety(), "square") <= 1) {
        let lock = val.getLocked();
        if ((lock === 1) || ((lock === 2) && (infused))) {
          val.unlockMe();
          DrawMainFrame("one", castermap, val.getx(), val.gety());
          let desc = "The " + val.getDesc() + " is unlocked.";
          ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_ORANGE);
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);      
          maintext.addText(desc);
        }
      }
    }
  }

  return resp;
}

// Wind Change
magic[SPELL_WIND_CHANGE_LEVEL][SPELL_WIND_CHANGE_ID].getLongDesc = function() {
  return "Changes the direction of the wind.";
}
magic[SPELL_WIND_CHANGE_LEVEL][SPELL_WIND_CHANGE_ID].getInfusedDesc = function() {
  return "The wind blows more powerfully.";
}

magic[SPELL_WIND_CHANGE_LEVEL][SPELL_WIND_CHANGE_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Wind Change.<br />");
  if (caster !== PC) {
    let resp = PerformWindChange(caster, infused, free, tgt);
    return resp;
  }

  let resp = {};

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

  let resp = {fin:1};  
  if (!free) {
    let mana = magic[SPELL_WIND_CHANGE_LEVEL][SPELL_WIND_CHANGE_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let dir = "";
  if (tgt[0] > 0) { dir = "west"; }
  else if (tgt[0] < 0) { dir = "east"; }
  else if (tgt[1] > 0) { dir = "north"; }
  else if (tgt[1] < 0) { dir = "south"; }
  else {
    maintext.addText("The wind swirls in confused directions.");
    return resp; 
  }
  let desc = "wind";
  if (infused) {desc = "gale";}
  maintext.addText("The breeze shifts as you summon a " + desc + " from the " + dir + "!");

  // add here for elemental plane of air 
  return resp;
}

// Dispel 
magic[SPELL_DISPEL_LEVEL][SPELL_DISPEL_ID].getLongDesc = function() {
  return "Has a chance to dispel each hostile spell effect upon you.";
}
magic[SPELL_DISPEL_LEVEL][SPELL_DISPEL_ID].getInfusedDesc = function() {
  return "The chance of successfully dispelling a spell is 30% higher.";
}

magic[SPELL_DISPEL_LEVEL][SPELL_DISPEL_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Dispel.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let casterspells = caster.getSpellEffects();
  let dispellables = [];
  for (let i=0;i<casterspells.length;i++) {
    if (casterspells[i].dispellable) { dispellables.push(casterspells[i]); }
  }
  if (dispellables.length > 0) {
    let idx = Math.floor(Math.random()*dispellables.length);
    let lvl = dispellables[idx].getLevel();
    DebugWrite("magic", "Attempting to dispel " + dispellables[idx] + ", which is level " + lvl + ".");
    let chance = 80 - 10*lvl;
    if (infused) { chance += 30; }
    if (Dice.roll("1d100") <= chance) {
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
magic[SPELL_DISRUPT_UNDEAD_LEVEL][SPELL_DISRUPT_UNDEAD_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " damage to all undead within 6 steps.";
}
magic[SPELL_DISRUPT_UNDEAD_LEVEL][SPELL_DISRUPT_UNDEAD_ID].getInfusedDesc = function() {
  return "Damage increased by 1.5x.";
}

magic[SPELL_DISRUPT_UNDEAD_LEVEL][SPELL_DISRUPT_UNDEAD_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Disrupt Undead.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let castermap = caster.getHomeMap();
  let npcs = castermap.npcs.getAll();
  let hitany = 0;
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    if (val.special.indexOf("undead") > -1) {
      if (GetDistance(val.getx(),val.gety(), caster.getx(), caster.gety()) < 7) {
        let dmg = RollDamage(DMG_MEDIUM);
        if (infused) {
          dmg *= 1.5;
        }
        if (CheckResist(caster,val,infused,0)) { dmg = (dmg/2)+1; }
        DebugWrite("magic", "Found " + val.getName() + " , dealing it " + dmg + " damage.<br />");
        val.dealDamage(dmg);
        ShowEffect(val, 700, "702.gif", 0, 0);
        let desc = val.getDesc() + " disrupted!";
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);      
        maintext.addText(desc);
        hitany = 1;
      }
    }
  }
  if (!hitany) {
    maintext.addText("No undead within range.");
  }

  return resp;
}

// Fire Armor
magic[SPELL_FIRE_ARMOR_ID][SPELL_FIRE_ARMOR_ID].getLongDesc = function() {
  return "Any adjacent foe who strikes you takes " + Dice.rollmin(DMG_NEGLIGABLE) + "-" + Dice.rollmax(DMG_NEGLIGABLE) + " fire damage.";
}
magic[SPELL_FIRE_ARMOR_ID][SPELL_FIRE_ARMOR_ID].getInfusedDesc = function() {
  return "Damage increased to " + Dice.rollmin(DMG_LIGHT) + "-" + Dice.rollmax(DMG_LIGHT) + " and duration doubled.";
}

magic[SPELL_FIRE_ARMOR_ID][SPELL_FIRE_ARMOR_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Fire Armor.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let prot = localFactory.createTile("FireArmor");
  duration = caster.getInt() * 3 * SCALE_TIME;
  if (free) { duration = Dice.roll("1d6 + 12") * 3 * SCALE_TIME; }
  let power = DMG_NEGLIGABLE;
  if (infused) { 
    duration = duration * 2; 
    power = DMG_LIGHT;
  }
  let endtime = duration + DUTime.getGameClock();
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  prot.setExpiresTime(endtime);
  prot.setPower(power);
  caster.addSpellEffect(prot, Math.max(0, free-1) );
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
  
  return resp;
}

// Fireball
magic[SPELL_FIREBALL_LEVEL][SPELL_FIREBALL_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " fire damage to a single target. Half damage if resisted."
}
magic[SPELL_FIREBALL_LEVEL][SPELL_FIREBALL_ID].getInfusedDesc = function() {
  return "Damage increased by 1.5x.";
}

magic[SPELL_FIREBALL_LEVEL][SPELL_FIREBALL_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Fireball.<br />");
  if (caster !== PC) {
    let resp = PerformFireball(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  CreateTargetCursor({sticky: 1, command:'c',spellName:'Fireball',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});      
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformFireball(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};
  let desc = tgt.getDesc();

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_FIREBALL_LEVEL][SPELL_FIREBALL_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }

  let dmg = RollDamage(DMG_MEDIUM);
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  let boltgraphic = {};
  boltgraphic.graphic = "fireicelightning.gif";
  boltgraphic.yoffset = 0;
  boltgraphic.xoffset = 0;
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);
  let descval = {txt: desc};

  let sounds = {};
  let fromcoords = getCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  let tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  let duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  let destgraphic = {graphic:"702.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
  AnimateEffect(caster, tgt, fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"fire"});

  resp["fin"] = -1;
  return resp;
}

// Iceball
magic[SPELL_ICEBALL_LEVEL][SPELL_ICEBALL_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " ice damage to a single target, half if resisted. The target is slowed.";
}
magic[SPELL_ICEBALL_LEVEL][SPELL_ICEBALL_ID].getInfusedDesc = function() {
  return "Damage increased by 1.5x.";
}

magic[SPELL_ICEBALL_LEVEL][SPELL_ICEBALL_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Iceball.<br />");
  if (caster !== PC) {
    let resp = PerformIceball(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};
  
  CreateTargetCursor({sticky: 1, command:'c',spellName:'Iceball',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});      
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformIceball(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};
  let desc = tgt.getDesc();

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_ICEBALL_LEVEL][SPELL_ICEBALL_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }

  let dmg = RollDamage(DMG_MEDIUM);
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  let frozen = localFactory.createTile("Slow");
  let dur = caster.getInt()/3;
  if (free) { dur = Dice.roll("1d2+3"); }
  let endtime = dur*SCALE_TIME + DU.DUTime.getGameClock();
  frozen.setExpiresTime(endtime);
  tgt.addSpellEffect(frozen);
  
  let boltgraphic = {};
  boltgraphic.graphic = "fireicelightning.gif";
  boltgraphic.yoffset = -32;
  boltgraphic.xoffset = 0;
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);
  let descval = {txt: desc};

  let sounds = {};
  let fromcoords = getCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  let tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  let duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  let destgraphic = {graphic:"702.2.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
  AnimateEffect(caster, tgt, fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"ice"});
  
  resp["fin"] = -1;
  return resp;
}

// Telekinesis
magic[SPELL_TELEKINESIS_LEVEL][SPELL_TELEKINESIS_ID].getLongDesc = function() {
  return "Manipulate or retrieve an object at a distance.";
}
magic[SPELL_TELEKINESIS_LEVEL][SPELL_TELEKINESIS_ID].getInfusedDesc = function() {
  return "Telekinesis works on heavier objects.";
}

magic[SPELL_TELEKINESIS_LEVEL][SPELL_TELEKINESIS_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Telekinesis.<br />");
  if (caster !== PC) {
    let resp = PerformTelekinesis(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};

  CreateTargetCursor({sticky: 0, command:'c',spellName:'Telekinesis',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "usable"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});        
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4; // was 0
  gamestate.setMode("target");
  return resp;
}

function PerformTelekinesis(caster, infused, free, tgt) {
  gamestate.setMode("null");
  
  let retval = {};
  if (!free) {
    let mana = magic[SPELL_TELEKINESIS_LEVEL][SPELL_TELEKINESIS_ID].getManaCost(infused);
    caster.modMana(-1*mana);
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
    let usemap = tgt.getHomeMap();
    let localacre = usemap.getTile(tgt.getx(),tgt.gety());
    retval["fin"] = 1;
    let usedname = tgt.getDesc();
    usedname = usedname.replace(/^a /, "");
    retval["txt"] = "Telekinesis on " + usedname + ": " + retval["txt"];
    let drawtype = "one";
    if (tgt.checkType("Consumable")) {
      usemap.deleteThing(used);
    }
    if (retval["redrawtype"]) {
      delete retval["redrawtype"];
      // if more of the map needs to be redrawn, need to recheck light sources

      for (let i=0;i<localacre.localLight.length;i++) {
      // each object that is casting light on the door might be casting light through the door.
        let lightsource = usemap.lightsList[i];
        usemap.removeMapLight(index, usemap.lightsList[i].getLight(), usemap.lightsList[i].getx(), usemap.lightsList[i].gety());
        usemap.setMapLight(lightsource, lightsource.getLight(), lightsource.getx(), lightsource.gety());
      }
      
      if (usemap === PC.getHomeMap()) { 
        DrawMainFrame("draw",usemap,PC.getx(),PC.gety());
      }
    } else {		
      DrawMainFrame("one",usemap,tgt.getx(),tgt.gety());
    }
  }
  return retval;
}

function PerformTelekinesisMove(caster, infused, free, tgt) {  // NOTE- tgt needs to hold both moved item and target coords
  gamestate.setMode("null");
  
  let retval = {fin:1, input: "&gt;"};
  if (!free) {
    let mana = magic[SPELL_TELEKINESIS_LEVEL][SPELL_TELEKINESIS_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let usemap = tgt.getHomeMap();
  if (tgt.heavy && !infused) {
    retval["txt"] = "That object is too heavy.";
    retval["override"] = 1;
    return retval;
  } 
  let oldx = tgt.getx();
  let oldy = tgt.gety();
  usemap.moveThing(targetCursor.x,targetCursor.y,tgt);
  retval["txt"] = "Moved!";

  if ((typeof tgt.getLight === "function") && (tgt.getLight() !== 0)) {
    if (PC.getHomeMap() === usemap) {
      DrawMainFrame("draw",usemap,PC.getx(),PC.gety());
    }
  } else {
    if ((PC.getHomeMap() === usemap) && (GetDistance(PC.getx(),PC.gety(),tgt.getx(),tgt.gety(),"square") <= 6)) {
      DrawMainFrame("one",usemap,tgt.getx(),tgt.gety());
      DrawMainFrame("one",usemap,oldx,oldy);
    }
  }
  
  let usedname = tgt.getDesc();
  retval["txt"] = "Telekinesis on " + usedname + ": " + retval["txt"];

  return retval;
}

// Telepathy
magic[SPELL_TELEPATHY_LEVEL][SPELL_TELEPATHY_ID].getLongDesc = function() {
  return "Allows you to see the location of all nearby creatures with a mind, even if they are behind walls or invisible.";
}
magic[SPELL_TELEPATHY_LEVEL][SPELL_TELEPATHY_ID].getInfusedDesc = function() {
  return "Doubles the duration of the spell.";
}

magic[SPELL_TELEPATHY_LEVEL][SPELL_TELEPATHY_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Telepathy.<br />");
  let resp = {};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  resp["fin"] = 1;
  let prot = localFactory.createTile("Telepathy");
  duration = caster.getInt() * 2 * SCALE_TIME;
  if (free) { duration = Dice.roll("1d6 + 12") * 2 * SCALE_TIME; }
  if (infused) { 
    duration = duration * 2; 
  }
  let endtime = duration + DUTime.getGameClock();
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  prot.setExpiresTime(endtime);
  caster.addSpellEffect(prot, Math.max(0, free-1) );
  
  return resp;
}

// Wall of Flame
magic[SPELL_WALL_OF_FLAME_LEVEL][SPELL_WALL_OF_FLAME_ID].getLongDesc = function() {
  return "Conjures a three space wide wall of fire that deals " + Dice.rollmin("2d6+3") + "-" + Dice.rollmax("2d6+3") + " damage to anything in it.";
}
magic[SPELL_WALL_OF_FLAME_LEVEL][SPELL_WALL_OF_FLAME_ID].getInfusedDesc = function() {
  return "Extends the duration of the wall.";
}

magic[SPELL_WALL_OF_FLAME_LEVEL][SPELL_WALL_OF_FLAME_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Wall of Flame.<br />");
  if (caster !== PC) {
    let resp = PerformWallOfFlame(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};
  
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  CreateTargetCursor({sticky: 0, command:'c',spellName:'Wall of Flame',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "open"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});        
  resp["txt"] = "";
  resp["input"] = "&gt; Choose where to conjure- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformWallOfFlame(caster, infused, free, tgt) {
  let resp = {fin:1, input: "&gt;"};
  let desc = "";

  let castermap = caster.getHomeMap();
  if (castermap.getLOS(caster.getx(), caster.gety(), tgt.x, tgt.y, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "You cannot cast this spell there.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_WALL_OF_FLAME_LEVEL][SPELL_WALL_OF_FLAME_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let duration = caster.getInt() * SCALE_TIME;
  if (infused) { duration = duration * 2; }
  let expires = duration + DU.DUTime.getGameClock();
  
  // make the first firefield
  let field1 = localFactory.createTile("FireField");
  castermap.placeThing(tgt.x, tgt.y, field1)
  field1.expires = expires;
  
  // determine which direction it was, for whether the wall is diagonal, horizontal, or vertical.
  let dir = GetEffectGraphic(caster,field1,{}).fired;
  if ((dir === 0) || (dir === 4)) {
    let placed = TryToPlaceField(castermap,tgt.x-1,tgt.y,"FireField");
    if (!placed) {
      let newy = tgt.y;
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
      let newy = tgt.y;
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
    let placed = TryToPlaceField(castermap,tgt.x-1,tgt.y-1,"FireField");
    if (!placed) {
      let newy = tgt.y-1;
      let newx = tgt.x-1;
      if (dir === 1) { newy++; }
      else { newx++; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        let newy = tgt.y-1;
        let newx = tgt.x-1;
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
      let newy = tgt.y+1;
      let newx = tgt.x+1;
      if (dir === 1) { newx--; }
      else { newy--; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        let newy = tgt.y+1;
        let newx = tgt.x+1;
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
    let placed = TryToPlaceField(castermap,tgt.x,tgt.y-1,"FireField");
    if (!placed) {
      let newy = tgt.y-1;
      let newx = tgt.x;
      if (dir === 2) { newx--; }
      else { newx++; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        let newy = tgt.y-1;
        let newx = tgt.x;
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
      let newy = tgt.y+1;
      let newx = tgt.x;
      if (dir === 2) { newx--; }
      else { newx++; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        let newy = tgt.y+1;
        let newx = tgt.x;
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
    let placed = TryToPlaceField(castermap,tgt.x+1,tgt.y-1,"FireField");
    if (!placed) {
      let newy = tgt.y-1;
      let newx = tgt.x+1;
      if (dir === 3) { newx--; }
      else { newy++; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        let newy = tgt.y+1;
        let newx = tgt.x-1;
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
      let newy = tgt.y+1;
      let newx = tgt.x-1;
      if (dir === 3) { newy--; }
      else { newx++; }
      placed = TryToPlaceField(castermap,newx,newy,"FireField");
      if (!placed) {
        let newy = tgt.y+1;
        let newx = tgt.x-1;
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
  if (castermap === PC.getHomeMap()) {
    DrawMainFrame("draw",castermap,PC.getx(),PC.gety());
  }
  
  return resp;
}

function TryToPlaceField(mapref, wherex, wherey, fieldname) {
  let tile = mapref.getTile(wherex, wherey);
  if (tile.canMoveHere(MOVE_WALK,0)["canmove"]) {
    let field = localFactory.createTile(fieldname);
    mapref.placeThing(wherex,wherey,field);
    return field;
  }
  return 0;
}

// Blessing
magic[SPELL_BLESSING_LEVEL][SPELL_BLESSING_ID].getLongDesc = function() {
  return "Raises your STR, DEX, and INT by " + (Math.floor(PC.getInt()/5)+1) + ".";
}
magic[SPELL_BLESSING_LEVEL][SPELL_BLESSING_ID].getInfusedDesc = function() {
  return "Extends the duration.";
}

magic[SPELL_BLESSING_LEVEL][SPELL_BLESSING_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Blessing.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let levobj = localFactory.createTile("Blessing");
  
  let dur = caster.getInt() * SCALE_TIME;
  if (infused) { dur = dur * 3; }
  let power = Math.floor(caster.getInt()/5)+1;
  if (free) {
    dur = Dice.roll("2d10+15") * SCALE_TIME;
    power = Dice.roll("1d4+1");
  }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(levobj, Math.max(0,free-1) );

  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
    
  DrawCharFrame();
  return resp;  
}

// Blink
magic[SPELL_BLINK_LEVEL][SPELL_BLINK_ID].getLongDesc = function() {
  return "Teleports you to a random space within 4 spaces that you could otherwise reach by walking.";
}
magic[SPELL_BLINK_LEVEL][SPELL_BLINK_ID].getInfusedDesc = function() {
  return "This spell is not improved by infusion."
}

magic[SPELL_BLINK_LEVEL][SPELL_BLINK_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Blink.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let success = 0;
  let castermap = caster.getHomeMap();
  let casterx = caster.getx();
  let castery = caster.gety();
  let castermove = caster.getMovetype();
  let possdest = [];
  for (let i=-4;i<=4;i++) {
    for (let j=-4;j<=4;j++) {
      if ((i==casterx) && (j==castery)) { next; }
      let loc = {};
      loc.x = casterx+i;
      loc.y = castery+j;
      possdest.push(loc);
    }
  }
  ShuffleArray(possdest);
  while (!success && possdest[0]) {
    let tile = castermap.getTile(possdest[0].x,possdest[0].y);
    if (tile.canMoveHere(castermovetype, 1)) {
      let path = castermap.getPath(casterx,castery,possdest[0].x,possdest[0].y,MOVE_WALK);
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
  let retval = {};
  let map = caster.getHomeMap();
  let exittile = map.getTile(caster.getx(),caster.gety());
  let walkofftile = exittile.executeWalkoffs(caster);
  if (walkofftile) {
    retval["msg"] += walkoffval;
  }
  map.moveThing(destx,desty,caster);

  let walkonval = tile.executeWalkons(this);
  if (walkonval) {
    if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
    retval["msg"] += walkonval;
  }
  DrawMainFrame("draw", PC.getHomemap(), PC.getx(), PC.gety());
  maintext.addText(retval["msg"]);
  if ((caster.getx() === destx) && (caster.gety() === desty)) {
    return 1;
  } else {
    return 0;
  }
}

// Ethereal Vision
magic[SPELL_ETHEREAL_VISION_LEVEL][SPELL_ETHEREAL_VISION_ID].getLongDesc = function() {
  return "You can briefly see through solid objects.";
}
magic[SPELL_ETHEREAL_VISION_LEVEL][SPELL_ETHEREAL_VISION_ID].getInfusedDesc = function() {
  return "The duration is doubled.";
}

magic[SPELL_ETHEREAL_VISION_LEVEL][SPELL_ETHEREAL_VISION_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Ethereal Vision.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let levobj = localFactory.createTile("EtherealVision");
  
  let dur = 3 * SCALE_TIME;
  if (infused) { dur = dur * 2; }

  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  levobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(levobj, Math.max(0,free-1) );

  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
    
  DrawCharFrame();
  return resp;  
}

// Heal
magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID].getLongDesc = function() {
  return "Heals you for " + Dice.rollmin(PC.getLevel() + "d8" + (PC.getLevel()*2)) + "-" + Dice.rollmax(PC.getLevel() + "d8" + (PC.getLevel()*2)) + ".";
}
magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID].getInfusedDesc = function() {
  return "Heal is increased by 1.5x.";
}

magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Heal.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let plus = caster.getLevel()*2;
  let healamt = Dice.roll(caster.getLevel() + "d8+" + plus);
  if (free) { healamt = Dice.roll("4d8+10"); }
  DebugWrite("magic", "Healing " + healamt + " hp.<br />");
  if (infused) { healamt = healamt * 1.5; }
  
  if (caster === PC) {
    tgt = caster;
  }
  
  ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
  tgt.healMe(healamt, caster);
  if (free !== 2) {
    resp["txt"] = "You feel better!";
  }
  
  return resp;
}

//Life Drain
magic[SPELL_LIFE_DRAIN_LEVEL][SPELL_LIFE_DRAIN_ID].getLongDesc = function() {
  return "Deals a single target " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " and heals you for " + Dice.rollmin("2d8+10") + "-" + Dice.rollmax("2d8+10") + ".";
}
magic[SPELL_LIFE_DRAIN_LEVEL][SPELL_LIFE_DRAIN_ID].getInfusedDesc = function() {
  return "Damage and healing increased by 1.5x."
}

magic[SPELL_LIFE_DRAIN_LEVEL][SPELL_LIFE_DRAIN_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Life Drain.<br />");
  if (caster !== PC) {
    let resp = PerformLifeDrain(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};

  CreateTargetCursor({sticky: 1, command:'c',spellName:'Life Drain',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});        
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}
  
function PerformLifeDrain(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};
  let desc = tgt.getDesc();

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_LIFE_DRAIN_LEVEL][SPELL_LIFE_DRAIN_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }

  let dmg = RollDamage(DMG_MEDIUM);
  if (infused) {
    dmg = dmg * 1.5;
  }

  let healamt = Dice.roll("2d8+" + 10);  
  if (infused) { healamt = healamt * 1.5; }
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
    healamt = Math.floor(healamt/2)+1;
  }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    
  ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);

  DebugWrite("magic", "Healing " + healamt + " hp.<br />");
  
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
  caster.healMe(healamt, caster);
  resp["txt"] = "You feel better!";

  resp["fin"] = -1;
  return resp;
}

//Smite
magic[SPELL_SMITE_LEVEL][SPELL_SMITE_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " magic damage to three random nearby enemies.";
}
magic[SPELL_SMITE_LEVEL][SPELL_SMITE_ID].getInfusedDesc = function() {
  return "Damage is increased by 1.5x."
}

magic[SPELL_SMITE_LEVEL][SPELL_SMITE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Smite.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let foes = GetAllWithin("npcs",radius,caster.getHomeMap(),{x: caster.getx(), y: caster.gety()});
  foes = ShuffleArray(foes);
  
  if (!foes[0]) {
    resp["txt"] = "No enemies nearby.";
    return resp;
  }
  for (let i=0; i<=2; i++) {
    if (foes[i]) {
      let dmg = RollDamage(DMG_MEDIUM);
      if (infused) { dmg = dmg * 1.5; }
      if (CheckResist(caster,foes[i],infused,0)) {
        dmg = Math.floor(dmg/2)+1;
      }
      foes[i].dealDamage(dmg,caster,"force");
      DebugWrite("magic", "Dealing " + dmg + " damage to target " + foes[i].getName() + " " + foes[i].getSerial() + ".<br />");
      ShowEffect(foes[i], 700, "702.gif", 0, 0);
    }
  }
  return resp;  
}

//Open Gate
magic[SPELL_OPEN_GATE_LEVEL][SPELL_OPEN_GATE_ID].getLongDesc = function()  {
  return "When cast at a circle of stones Gate, opens a portal to the destination circle.";
}
magic[SPELL_OPEN_GATE_LEVEL][SPELL_OPEN_GATE_ID].getInfusedDesc = function() {
  return "Opens the portal even if the gate has been damaged.";
}

magic[SPELL_OPEN_GATE_LEVEL][SPELL_OPEN_GATE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Open Gate.<br />");
  let resp = {};
  resp["fin"] = 3;  // end of turn waits on end of animation

  let loc = caster.getHomeMap().getTile(caster.getx(), caster.gety());
  let shrine = loc.getTopFeature();
  if ((shrine) && (shrine.gotomap)) {
    let belowgraphic = shrine.getGraphicArray();
    if (shrine.getName() === "Shrine") {
      if (shrine.hasOwnProperty("gotomap")) {
        DU.maps.addMap(shrine.gotomap);
        let destmap = DU.maps.getMap(shrine.gotomap);
        if (!free) {
          free = 0;
          let mana = this.getManaCost(infused);
          caster.modMana(-1*mana);
          DebugWrite("magic", "Spent " + mana + " mana.<br />");
        }    
        TravelByMoongate(caster,"blue",belowgraphic,belowgraphic, destmap, shrine.gotox, shrine.gotoy);
      } else {
        maintext.addText("The gateway seems incomplete. The spell will not work until there is another gate linked to this one.");
        resp["fin"] = 1;
      }
    } else if (shrine.getName() === "BrokenShrine") {
      if (infused) {
        DU.maps.addMap(shrine.gotomap);
        let destmap = DU.maps.getMap(shrine.gotomap);
        TravelByMoongate(caster,"blue",belowgraphic,belowgraphic, destmap, shrine.gotox, shrine.gotoy);
        if (!free) {
          free = 0;
          let mana = this.getManaCost(infused);
          caster.modMana(-1*mana);
          DebugWrite("magic", "Spent " + mana + " mana.<br />");
        }      
      } else {
        maintext.addText("The spell sputters and the broken node remains closed.");
        resp["fin"] = 1;
        if (!free) {
          free = 0;
          let mana = this.getManaCost(infused);
          caster.modMana(-1*mana);
          DebugWrite("magic", "Spent " + mana + " mana.<br />");
        }      
      }
    }
  } else {
    maintext.addText("The spell sputters, finding no gate node to open."); 
    resp["fin"] = 1;
  }
  
  DrawCharFrame();
  return resp;
}

// Levitate/Waterwalk
magic[SPELL_WATER_WALK_LEVEL][SPELL_WATER_WALK_ID].getLongDesc = function() {
  return "Allows you to walk on water that is not too deep.";
}
magic[SPELL_WATER_WALK_LEVEL][SPELL_WATER_WALK_ID].getInfusedDesc = function() {
  return "Extends the duration.";
} 

magic[SPELL_WATER_WALK_LEVEL][SPELL_WATER_WALK_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Water Walk.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let levobj = localFactory.createTile("Levitate");
  
  let dur = caster.getInt()+5;
  if (free) { dur = Dice.roll("1d10+35"); }
  if (infused) { dur = dur * 3; }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  levobj.setPower(dur);
  levobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(levobj, Math.max(0, free-1) );
    
  DrawCharFrame();
  return resp;  
}

//Crystal Prison (aka Crystal Trap)
magic[SPELL_CRYSTAL_TRAP_LEVEL][SPELL_CRYSTAL_TRAP_ID].getLongDesc = function() {
  return "Places a hidden trap on a space. Imprisons the next enemy to walk on it in a crystal prison.";
}
magic[SPELL_CRYSTAL_TRAP_LEVEL][SPELL_CRYSTAL_TRAP_ID].getInfusedDesc = function() {
  return "The crystal prison is harder to escape.";
}

magic[SPELL_CRYSTAL_TRAP_LEVEL][SPELL_CRYSTAL_TRAP_ID].executeSpell = function(caster,infused,free,tgt) {
  DebugWrite("magic", "Casting Crystal Trap.<br />");  

  let resp = {};
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  let trap = localFactory.createTile("CrystalTrapSpace");
  trap.owner = caster.getSerial();
  trap.duration = caster.getInt() * SCALE_TIME;
  trap.power = caster.getInt();
  trap.infused = infused;
  if (infused) { trap.power = trap.power + 4; }

  caster.getHomeMap().placeThing(caster.getx(), caster.gety(), trap);

  let resp = {fin:1, input: "&gt;", txt: "A crystal trap is buried under your feet."};

  return resp;

}

//Mirror Ward
magic[SPELL_MIRROR_WARD_LEVEL][SPELL_MIRROR_WARD_ID].getLongDesc = function() {
  return "The next hostile spell to target you is redirected at a random other nearby creature, if possible.";
}
magic[SPELL_MIRROR_WARD_LEVEL][SPELL_MIRROR_WARD_ID].getInfusedDesc = function() {
  return "Extends the duration of the spell. (It still expires after one use.)";
}

magic[SPELL_MIRROR_WARD_LEVEL][SPELL_MIRROR_WARD_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Mirror Ward.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let mwobj = localFactory.createTile("MirrorWard");
  
  let dur = caster.getInt();
  if (free) { dur = Dice.roll("1d10+35"); }
  if (infused) { dur = dur * 3; }
  let endtime = (dur * SCALE_TIME) + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  mwobj.setPower(dur);
  mwobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(mwobj, Math.max(0, free-1) );

  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  return resp;
}

//Paralyze
magic[SPELL_PARALYZE_LEVEL][SPELL_PARALYZE_ID].getLongDesc = function() {
  return "Paralyzes a target enemy. No effect if the enemy resists.";
}
magic[SPELL_PARALYZE_LEVEL][SPELL_PARALYZE_ID].getInfusedDesc = function() {
  return "Chance to resist decreased and duration increased.";
}

magic[SPELL_PARALYZE_LEVEL][SPELL_PARALYZE_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Paralyze.<br />");
  if (caster !== PC) {
    let resp = PerformParalyze(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};
  
  CreateTargetCursor({sticky: 1, command:'c',spellName:'Paralyze',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});      
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4; // was 0
  gamestate.setMode("target");
  return resp;
}
  
function PerformParalyze(caster, infused, free, tgt) {
  let resp = {fin:1};
  let desc = "";

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    free = 0;
    let mana = magic[SPELL_PARALYZE_LEVEL][SPELL_PARALYZE_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  
  if (!CheckResist(caster,tgt,infused,0)) {
    let vulobj = localFactory.createTile("Paralyze");
  
    let dur = caster.getInt()/2;
    if (infused) { dur = dur * 1.5;}
    if (free) { dur = Dice.roll("1d4+5"); }
    ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
    if (tgt !== PC) {
      desc = tgt.getDesc() + " is paralyzed!";
    } else {
      desc = "You are paralyzed!";
    }
    vulobj.setExpiresTime(dur + DUTime.getGameClock());
    let power = 4;
    if (infused) { power = 6; }
    vulobj.setPower(power);
    tgt.addSpellEffect(vulobj, Math.max(0, free-1) );
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

  resp["txt"] = desc;
  resp["input"] = "&gt;";
  return resp;
}

// Peer
magic[SPELL_PEER_LEVEL][SPELL_PEER_ID].getLongDesc = function() {
  return "Shows a zoomed out view of the area.";
}
magic[SPELL_PEER_LEVEL][SPELL_PEER_ID].getInfusedDesc = function() {
  return "No additional effect.";
}

magic[SPELL_PEER_LEVEL][SPELL_PEER_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Peer.<br />");
  let resp = {fin:0};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let castermap = caster.getHomeMap();
  let eachwayx = Math.floor(viewsizex/2)*4+1;
  let eachwayy = Math.floor(viewsizey/2)*4+1;
  let leftx = caster.getx()-eachwayx;
  let rightx = caster.getx()+eachwayx;
  let topy = caster.gety()-eachwayy;
  let bottomy = caster.gety()+eachwayy;
  let peerhtml = "<table id='mainview' cellpadding='0' cellspacing='0' border='0' style=\"position:relative; z-index:20; top:20px\">";
  for (let j=topy;j<=bottomy;j++) {
    peerhtml += "<tr><td style='background-color:black; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>";
    for (let i=leftx;i<=rightx;i++) {
      if ((caster.getx() === i) && (caster.gety() === j)) {
        // PC
        peerhtml += "<td style='background-color:cyan; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>";
      } else {
        let tile = castermap.getTile(i,j);
        if (tile === "OoB") { peerhtml += "<td style='background-color:black; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>"; }
        else {
          let npc = tile.getTopVisibleNPC();
          if (npc && !npc.specials.nopeer) { 
            peerhtml += "<td style='background-color:purple; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>"; 
          } else {
            let fea = tile.getTopVisibleFeature();
            if (fea && fea.getPeerview()) {
              let peer = fea.getPeerview();
              if (peer) { peerhtml += "<td style='background-color:"+peer+"; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>"; }
            }
            else {
              let terr = tile.getTerrain();
              let peer = terr.getPeerview();
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
  for (let i=leftx;i<=rightx;i++) {
    peerhtml += "<td style='background-color:black; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>";
  }
  peerhtml += "</tr></table>";
//  alert(peerhtml);
  document.getElementById('uiinterface').innerHTML = peerhtml;
  gamestate.setMode("anykey");
  targetCursor.command = "c";
  if (free !== 2) {
    resp["txt"] = "You receive a bird's eye view.";
  }
  resp["input"] = "[MORE]";
  return resp;
}

//Return
magic[SPELL_RETURN_LEVEL][SPELL_RETURN_ID].getLongDesc = function() {
  if (PC.getHomeMap().getReturnInfused()) {
    return "No effect from this location.";
  } else {
    let dest = PC.getHomeMap().getReturnMap();
    let destx = PC.getHomeMap().getReturnx();
    let desty = PC.getHomeMap().getReturny();
    if ((dest === "darkunknown") && (destx === 69) && (desty === 74)) {
      return "Transports you to Castle dea Olympus.";
    } else if (PC.getHomeMap().underground) {
      return "Brings you to the surface.";
    } else {
      return "Brings you to the entrance to this map.";
    }
  }
}
magic[SPELL_RETURN_LEVEL][SPELL_RETURN_ID].getInfusedDesc = function() {
  if (PC.getHomeMap().getReturnInfused()) {
    return "Transports you to Castle dea Olympus.";
  } else {
    return "No additional effect from this location.";
  }
}

magic[SPELL_RETURN_LEVEL][SPELL_RETURN_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Return.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let returndest = {};
  
  let castermap = caster.getHomeMap();
  if (castermap.getName().indexOf("combat") > -1) {
    let fighton = castermap.getExitToMap();
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
    let destmap = DU.maps.getMap(returndest.map);
    let localacre = castermap.getTile(caster.getx(), caster.gety());
    let displaytile = localacre.getTop(1);
    while (displaytile.getName() === "SeeBelow") {
      let retval = FindBelow(x,y,mapname);
      localacre = retval.tile;
      mapname = retval.map;
      displaytile = localacre.getTop();
    }  
    let graphics = displaytile.getGraphicArray();
    let showGraphic = graphics[0];
    if (typeof displaytile.setBySurround === "function") {
     	graphics = displaytile.setBySurround(x,y,mapname,graphics,1,centerx,centery,losresult);
      showGraphic = graphics[0];
      if (typeof displaytile.doTile === "function") {
        graphics[0] = displaytile.doTile(x,y,showGraphic);
      }
    }
    
    let destacre = destmap.getTile(returndest.x, returndest.y);
    let desttile = destacre.getTop();
    
    TravelByMoongate(caster,"blue",graphics,desttile.getGraphicArray(), destmap, returndest.x, returndest.y);
    resp["fin"] = 3;
  } else {
    maintext.addText("The spell sputters as the distances are too great.");
    resp["fin"] = 1;
  }
  
  return resp;
}

// Shockwave
magic[SPELL_SHOCKWAVE_LEVEL][SPELL_SHOCKWAVE_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " to all adjacent enemies and pushes them. Half damage and unmoved if resisted.";
}
magic[SPELL_SHOCKWAVE_LEVEL][SPELL_SHOCKWAVE_ID].getInfusedDesc = function() {
  return "More difficult to resist, and damage increased by 1.5x.";
}

magic[SPELL_SHOCKWAVE_LEVEL][SPELL_SHOCKWAVE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Shockwave.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let spellmap = caster.getHomeMap();
  for (let xdiff=-1; xdiff<=1; xdiff++) {
    for (let ydiff=-1;ydiff<=1; ydiff++) {
      if ((xdiff === 0) && (ydiff === 0)) { next; }
      let tile = spellmap.getTile(caster.getx()+xdiff, caster.gety()+ydiff);
      let badguy = tile.getTopNPC();
      if (badguy) {
        let dmg = Dice.roll(DMG_MEDIUM);
        if (infused) { dmg = dmg * 1.5; }
        let resist = 0;
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
magic[SPELL_SUMMON_ALLY_LEVEL][SPELL_SUMMON_ALLY_ID].getLongDesc = function() {
  return "Conjures a random type of elemental to assist you in battle.";
}
magic[SPELL_SUMMON_ALLY_LEVEL][SPELL_SUMMON_ALLY_ID].getInfusedDesc = function() {
  return "Conjures a more powerful elemental.";
}

magic[SPELL_SUMMON_ALLY_LEVEL][SPELL_SUMMON_ALLY_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Summon Ally.<br />");
  if (caster !== PC) {
    let resp = PerformSummonAlly(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};
  
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  // check for existing illusion if I want to limit to just 1, but for now I don't

  CreateTargetCursor({sticky: 0, command:'c',spellName:'Summon Ally',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "open"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 3});        
  resp["txt"] = "";
  resp["input"] = "&gt; Choose where to conjure- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformSummonAlly(caster, infused, free, tgt) {
  let resp = {fin:1};

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.x, tgt.y, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "You cannot summon anything there.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_SUMMON_ALLY_LEVEL][SPELL_SUMMON_ALLY_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let ally;
  let eletype;
  switch (Dice.roll("1d4")) {
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
  let duration = caster.getInt() * SCALE_TIME;
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
    DrawMainFrame("one",caster.getHomeMap(),ally.getx(),ally.gety());
  } else {
    if (caster.getHomeMap() === PC.getHomeMap()) {
      DrawMainFrame("draw",caster.getHomeMap(),PC.getx(),PC.gety());
    }
  }
  
  resp["txt"] = "You conjure an elemental to aid you in battle.";
  resp["input"] = "&gt;";
  return resp;
}

// Swordstrike
magic[SPELL_SWORDSTRIKE_LEVEL][SPELL_SWORDSTRIKE_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_HEAVY) + "-" + Dice.rollmax(DMG_HEAVY) + " physical damage to a single target, and " + Dice.rollmin(DMG_LIGHT) + "-" + Dice.rollmax(DMG_LIGHT) + " damage to each neighboring enemy. Half damage if resisted.";
}
magic[SPELL_SWORDSTRIKE_LEVEL][SPELL_SWORDSTRIKE_ID].getInfusedDesc = function() {
  return "Increases the damage by 1.5x.";
}

magic[SPELL_SWORDSTRIKE_LEVEL][SPELL_SWORDSTRIKE_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Swordstrike.<br />");
  if (caster !== PC) {
    let resp = PerformSwordstrike(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};
  
  CreateTargetCursor({sticky: 1, command:'c',spellName:'Swordstrike',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});      
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformSwordstrike(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};
  let castmap = caster.getHomeMap();

  if (castmap.getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_SWORDSTRIKE_LEVEL][SPELL_SWORDSTRIKE_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  let hostile = 0;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(castmap);
    hostile = 1;
  }

  let dmg = RollDamage(DMG_HEAVY);
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  ShowEffect(tgt, 700, "702.gif", 0, 0);
  tgt.dealDamage(dmg,caster,"physical");
  
  for (let diffx = -1; diffx <=1; diffx++) {
    for (let diffy = -1; diffy <=1; diffy++) {
      if ((diffx === 0) && (diffy === 0)) { next; }
      dmg = RollDamage(DMG_LIGHT);
      if ((tgt.getx()+diffx === PC.getx()) && (tgt.gety()+diffy === PC.gety())) {
        if (CheckResist(caster,PC,infused,0)) { dmg = dmg/2 +1; }
        PC.dealDamage(dmg,caster,"physical");
        ShowEffect(PC, 700, "702.gif", 0, 0);
        next;
      }
      let tile = castmap.getTile(tgt.getx()+diffx,tgt.gety()+diffy);
      let badguy = tile.getTopNPC();
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
magic[SPELL_EXPLOSION_LEVEL][SPELL_EXPLOSION_ID].getLongDesc = function() {
  let mindam = Dice.rollmin(DMG_MEDIUM) + Dice.rollmin(DMG_LIGHT);
  let maxdam = Dice.rollmax(DMG_MEDIUM) + Dice.rollmax(DMG_LIGHT);
  return "Deals " + mindam + "-" + maxdam + " fire damage to target space and all adjacent spaces. Half damage if resisted.";
}

magic[SPELL_EXPLOSION_LEVEL][SPELL_EXPLOSION_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Explosion.<br />");
  if (caster !== PC) {
    let resp = PerformExplosion(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};
  
  CreateTargetCursor({sticky: 0, command:'c',spellName:'Explosion',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "open"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});      
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformExplosion(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};
  let castmap = caster.getHomeMap();

  if (castmap.getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_EXPLOSION_LEVEL][SPELL_EXPLOSION_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let hostile = 0;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(castmap);
    hostile = 1;
  }

  let dmg = RollDamage(DMG_MEDIUM,DMG_LIGHT);
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  ShowEffect(tgt, 700, "702.gif", 0, 0);
  tgt.dealDamage(dmg,caster,"fire");
  
  for (let diffx = -1; diffx <=1; diffx++) {
    for (let diffy = -1; diffy <=1; diffy++) {
      if ((diffx === 0) && (diffy === 0)) { next; }
//      dmg = RollDamage(DMG_LIGHT);
      if ((tgt.getx()+diffx === PC.getx()) && (tgt.gety()+diffy === PC.gety())) {
        if (CheckResist(caster,PC,infused,0)) { dmg = dmg/2 +1; }
        PC.dealDamage(dmg,caster,"fire");
        ShowEffect(PC, 700, "702.gif", 0, 0);
        next;
      }
      let tile = castmap.getTile(tgt.getx()+diffx,tgt.gety()+diffy);
      let badguy = tile.getTopNPC();
      if (badguy) {
        if (CheckResist(caster,badguy,infused,0)) { dmg = dmg/2+1; }
        badguy.dealDamage(dmg,caster,"fire");
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
magic[SPELL_JINX_LEVEL][SPELL_JINX_ID].getLongDesc = function() {
  return "Creatures in the target space and adjacent spaces have a chance of becoming confused, and may attack their allies.";
}

magic[SPELL_JINX_LEVEL][SPELL_JINX_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Jinx.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  var radius = 4;
  if (!free & caster.getInt() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    let desc;
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        let resist = CheckResist(caster,val,infused,0);
        let power = 66-resist;
        if (resist < 33) {
          desc = val.getDesc() + " resists!";
          if (val === PC) {
            desc = "You resist.";
            // no X over the PC
          } else {
            ShowEffect(val, 700, "X.gif");
          }       
        } else {
          let duration = 8 + Dice.roll("1d4") - val.getInt()/5;
          let jinx = localFactory.createTile("Confused");
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
  }

  return resp;
}

// Mass Curse
magic[SPELL_MASS_CURSE_LEVEL][SPELL_MASS_CURSE_ID].getLongDesc = function() {
  let rad = "four";
  if (PC.getInt() > 20) { rad = "five"; }
  return "All creatures within " +rad+ " steps of you have their stats lowered by " + (2+Math.floor(PC.getInt()/5)) + " unless they resist.";
}

magic[SPELL_MASS_CURSE_LEVEL][SPELL_MASS_CURSE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Mass Curse.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let radius = 4;
  if (!free & caster.getInt() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    let desc;
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        let resist = CheckResist(caster,val,infused,0);
        let curse = localFactory.createTile("Curse");
        let power = 2 + Math.floor(caster.getInt()/5);
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
        let duration = 10 + Dice.roll("1d8") - val.getInt()/4;
        curse.setPower(power);
        curse.setExpiresTime(duration*SCALE_TIME + DUTime.getGameClock());
        val.addSpellEffect(curse);          
        desc = val.getDesc() + " is cursed!";
        ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
        
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        maintext.addText(desc);
      }
    }
  }

  return resp;
}

//Negate Magic
magic[SPELL_NEGATE_MAGIC_LEVEL][SPELL_NEGATE_MAGIC_ID].getLongDesc = function() {
  return "Dispels magical effects on you and prevents the use of magic in the area.";
}

magic[SPELL_NEGATE_MAGIC_LEVEL][SPELL_NEGATE_MAGIC_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Negate Magic.<br />");
  
  var resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let castermap = caster.getHomeMap();
  let duration = caster.getInt() + DU.DUTime.getGameClock();
  let negated = DU.gameflags.getFlag("negate");
  negated[castermap.getName()] = duration * SCALE_TIME;
  DU.gameflags.setFlag("negate", negated);
  
  let gnome = localFactory.createTile("NegatorGnomeNPC");
  let gnomemap = maps.getMap("gnomeland");
	if (!gnomemap) {
	  gnomemap = new GameMap();
    gnomemap = maps.addMap("gnomeland");
	}
  gnomemap.placeThing(2,2,gnome);
  gnome.activate(0);
  let negtile = localFactory.createTile("NegateMagic");
  negtile.negatedmap = castermap.getName();
  gnome.addSpellEffect(negtile, Math.max(0, free-1) );  

  let everyone = castermap.getNPCsAndPCs();
  for (let i=0;i<everyone.length;i++) {
    let effects = everyone[i].getSpellEffects();
    for (let j=0;j<effects.length;j++) {
      if ((effects[j].getLevel() > 0) && (effects[j].getExpiresTime() > -1)) {
        DebugWrite("magic", "Negate magic has dispelled " + effects[j].getName() + " from " + everyone[i].getName() + "<br />");
        effval.endEffect();
      }
    }
  }
  
  let effects = caster.getSpellEffects();
  for (let i=0;i<effects.length;i++) {
    if ((effects[i].getLevel() > 0) && (effects[i].getExpiresTime() > -1)) {
      DebugWrite("magic", "Magic: Negate magic has dispelled " + effects[i].getName() + " from " + effects[i].getName() + "<br />");
      effects[i].endEffect();
    }
  }
  
  DrawCharFrame();
  return resp;
}

// Lightning Storm
magic[SPELL_STORM_LEVEL][SPELL_STORM_ID].getLongDesc = function() {
  return "Conjures a storm that will, each turn, strike two enemies with lightning for " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " damage per hit. Deals half damage if resisted.";
}

magic[SPELL_STORM_LEVEL][SPELL_STORM_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Storm.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let castermap = caster.getHomeMap();
  if (!castermap.getScale()) {
    DebugWrite("magic", "Tried to cast Storm on an overland map.<br />");
    maintext.AddText("You summon a small storm, which soon ends.");
    return resp;
  }
  let liobj = localFactory.createTile("Storm");
  
  let dur = 10*SCALE_TIME;
  if (infused) {dur = dur * 1.5; } // can't be infused, but what the heck
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(liobj);
  
  DrawCharFrame();
  return resp;
}

// Tremor

// Weather Control

// Charm
magic[SPELL_CHARM_LEVEL][SPELL_CHARM_ID].getLongDesc = function() {
  return "Target creature, if it does not resist the spell, becomes your ally and will attack its former friends.";
}

magic[SPELL_CHARM_LEVEL][SPELL_CHARM_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Charm.<br />");
  if (caster !== PC) {
    let resp = PerformCharm(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};
  
  CreateTargetCursor({sticky: 1, command:'c',spellName:'Charm',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});      
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;  // was 0
  gamestate.setMode("target");
  return resp;
}

function PerformCharm(caster, infused, free, tgt) {
  let resp = {fin:1};
  let desc = "";

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_CHARM_LEVEL][SPELL_CHARM_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;

  if (!CheckResist(caster,tgt,infused,0)) {
    let charmobj = localFactory.createTile("Charm");
  
    let dur = caster.getInt()/2;
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

  resp["txt"] = desc;
  resp["input"] = "&gt;";
  return resp;
}

// Ethereal Travel

// Fear
magic[SPELL_FEAR_LEVEL][SPELL_FEAR_ID].getLongDesc = function() {
  let rad = "four";
  if (PC.getInt() > 20) { rad = "five"; }
  return "Enemies within " + rad + " steps will become afraid and flee from you unless they resist.";
}

magic[SPELL_FEAR_LEVEL][SPELL_FEAR_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Fear.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let radius = 4;
  if (!free & caster.getInt() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    let desc;
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
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

        }
 
        if (desc) {       
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);
          maintext.addText(desc);
        }
      }
    }
  }

  return resp;
}

// Fire and Ice
magic[SPELL_FIRE_AND_ICE_LEVEL][SPELL_FIRE_AND_ICE_ID].getLongDesc = function() {
  return "All adjacent enemies take " + Dice.rollmin(DMG_HEAVY) + "-" + Dice.rollmax(DMG_HEAVY) + " fire damage (half on resist), and are frozen.";
}

magic[SPELL_FIRE_AND_ICE_LEVEL][SPELL_FIRE_AND_ICE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Fire and Ice.<br />");
  let resp = {fin:-1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  PlayRing(caster,"firering.png", {}, 1, "icering.png", function(center) {
    let centerx = center.getx();
    let centery = center.gety();
    let castermap = center.getHomeMap();
    for (let i=centerx-1;i<=centerx+1;i++) {
      for (let j=centery-1;j<=centery+1;j++) {
        if ((i!==centerx)||(j!==centery)) {
          let tile = castermap.getTile(i,j);
          let tgt = tile.getTopVisibleNPC();
          if (tgt) {
            let dmg = Dice.roll(DMG_HEAVY);
            if (CheckResist(center,tgt,0,0)) {
              dmg = Math.floor(dmg/2);
            }
            tgt.dealDamage(dmg,center,"fire");
          }
        }
      }
    }
  }, function(center) {
    let centerx = center.getx();
    let centery = center.gety();
    let castermap = center.getHomeMap();
    for (let i=centerx-1;i<=centerx+1;i++) {
      for (let j=centery-1;j<=centery+1;j++) {
        if ((i!==centerx)||(j!==centery)) {
          let tile = castermap.getTile(i,j);
          let tgt = tile.getTopVisibleNPC();
          if (tgt) {
            if (!CheckResist(center,tgt,0,0)) {
              let freeze = localFactory.createTile("Frozen");
              freeze.setPower(1);
              freeze.setExpiresTime(Dice.roll("1d3+1")*SCALE_TIME + DUTime.getGameClock());
              tgt.addSpellEffect(freeze);
              let desc = tgt.getDesc() + " is frozen!";
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
magic[SPELL_INVULNERABILITY_LEVEL][SPELL_INVULNERABILITY_ID].getLongDesc = function() {
  return "Makes you totally immune to damage for a brief time.";
}

magic[SPELL_INVULNERABILITY_LEVEL][SPELL_INVULNERABILITY_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Invulnerability.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let prot = localFactory.createTile("Invulnerable");
  duration = 3 * SCALE_TIME;
  let power = 1;
  if (infused) { 
    duration = duration +1; 
  }
  if (free) {
    duration = 2 * SCALE_TIME;
  }
  let endtime = duration + DUTime.getGameClock();
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  prot.setExpiresTime(endtime);
  prot.setPower(power);
  caster.addSpellEffect(prot, Math.max(0, free-1) );
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  
  return resp;
}

// Meteor Swarm
magic[SPELL_METEOR_SWARM_LEVEL][SPELL_METEOR_SWARM_ID].getLongDesc = function() {
  let rad = "four";
  if (PC.getInt() > 20) { rad = "five"; }
  let min = Dice.rollmin(DMG_MEDIUM) + Dice.rollmin(DMG_LIGHT);
  let max = Dice.rollmax(DMG_MEDIUM) + Dice.rollmax(DMG_LIGHT);
  return "All enemies within " + rad + " steps are dealt " + min + "-" + max + " fire damage, half if they resist.";
}

magic[SPELL_METEOR_SWARM_LEVEL][SPELL_METEOR_SWARM_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Meteor Swarm.<br />");
  let resp = {fin:-1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let radius = 4;
  if (!free & caster.getInt() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  let display = getDisplayCenter(PC.getHomeMap(), PC.getx(), PC.gety());
  let npccount = 0;
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        npccount++;
      }
    }
  }
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    var desc;
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        npccount--;
        let final = 0;
        if (!npccount) { final = 1; }
        let dmg = Dice.roll(DMG_MEDIUM, DMG_LIGHT);
        if (CheckResist(caster,val,infused,0)) {
          dmg = dmg/2;
        } 
        // In theory, it is impossible for targets to be offscreen. Unless maybe a monster is attacking a summoned/charmed ally?
        let skysourcex = Math.random()*(display.rightedge - displey.leftedge +1) + display.leftedge;
        let skysourcey = display.topedge;
        
        let boltgraphic = {};
        boltgraphic.graphic = "fireicelightning.gif";
        boltgraphic.yoffset = 0;
        boltgraphic.xoffset = 0;
        boltgraphic.directionalammo = 1;
        boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);
        let desc = val.getDesc();
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        let descval = {txt: desc};

        let sounds = {};
        let fromcoords = getCoords(caster.getHomeMap(),caster.getx(), caster.gety());
        let tocoords = getCoords(val.getHomeMap(),val.getx(), val.gety());
        let duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
        let destgraphic = {graphic:"702.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
        AnimateEffect(caster, tgt, fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:final, retval:descval, dmgtype:"fire"});

      }
    }
  }

  return resp;
}

// Mind Blast

// Permanance

// Armageddon

// Arrow of Glass
magic[SPELL_ARROW_OF_GLASS_LEVEL][SPELL_ARROW_OF_GLASS_ID].getLongDesc = function() {
  return "Deals enough damage to instantly slay most foes.";
}

magic[SPELL_ARROW_OF_GLASS_LEVEL][SPELL_ARROW_OF_GLASS_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Arrow of Glass.<br />");
  if (caster !== PC) {
    var resp = PerformArrowOfGlass(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};
  
  CreateTargetCursor({sticky: 1, command:'c',spellName:'Arrow of Glass',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 0});      
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformArrowOfGlass(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};
  let desc = tgt.getDesc();

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_ARROW_OF_GLASS_LEVEL][SPELL_ARROW_OF_GLASS_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
//  var dmg = Dice.roll("2d6+" + Math.floor(caster.getInt()/5));
  let power = caster.getInt();
  if (free) { power = Dice.roll("1d5+12"); }
  let dmg = RollDamage(DMG_TREMENDOUS);
  if (infused) {  // can't be infused, but check anyway
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,-5)) {
    dmg = Math.floor(dmg/2)+1;
  }

  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  let boltgraphic = {};
  boltgraphic.graphic = "magic-bolt.gif";  // CHANGE ONCE ARROW OF GLASS GRAPHIC MADE
  boltgraphic.yoffset = 0;
  boltgraphic.xoffset = 0;
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);
  let descval = {txt: desc};

  let sounds = {};
  let fromcoords = getCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  let tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  let duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  let destgraphic = {graphic:"702.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
  AnimateEffect(caster, tgt, fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"physical"});

  resp["fin"] = -1;
  return resp;
}

// Build Gate

// Conflagration
magic[SPELL_CONFLAGRATION_LEVEL][SPELL_CONFLAGRATION_ID].getLongDesc = function() {
  let rad = "four";
  if (PC.getInt() > 20) { rad = "five"; }
  let min = Dice.rollmin(DMG_HEAVY);
  let max = Dice.rollmax(DMG_HEAVY);
  return "All enemies within " + rad + " steps are dealt " + min + "-" + max + " fire damage, half if they resist.";
}

magic[SPELL_CONFLAGRATION_LEVEL][SPELL_CONFLAGRATION_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Conflagration.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let radius = 4;
  if (!free & caster.getInt() > 25) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  let display = getDisplayCenter(PC.getHomeMap(), PC.getx(), PC.gety());
  let npccount = 0;
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    let desc;
    if (caster.getAttitude() !== val.getAttitude()) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        let dmg = Dice.roll(DMG_HEAVY);
        if (CheckResist(caster,val,infused,0)) {
          dmg = dmg/2+1;
        } 
        // In theory, it is impossible for targets to be offscreen.
        let desc = val.getDesc();
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        ShowEffect(val, 1000, "702.gif", 0, 0);
        val.dealDamge(dmg);
      }
    }
  }

  return resp;
}

// Conjure Daemon
magic[SPELL_CONJURE_DAEMON_LEVEL][SPELL_CONJURE_DAEMON_ID].getLongDesc = function() {
  return "Conjures a powerful daemon to help you in battle.";
}

magic[SPELL_CONJURE_DAEMON_LEVEL][SPELL_CONJURE_DAEMON_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Conjure Daemon.<br />");
  if (caster !== PC) {
    let resp = PerformConjureDaemon(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};
  
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  // check for existing summon if I want to limit to just 1, but for now I don't
  CreateTargetCursor({sticky: 0, command:'c',spellName:'Conjure Daemon',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "open"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: 3});        
  resp["txt"] = "";
  resp["input"] = "&gt; Choose where to conjure- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformConjureDaemon(caster, infused, free, tgt) {
  let resp = {fin:1};
  let desc = "";

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.x, tgt.y, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "You cannot summon anything there.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_CONJURE_DAEMON_LEVEL][SPELL_CONJURE_DAEMON_ID].getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let ally = localFactory.createTile("Daemon");
  let duration = caster.getInt() * SCALE_TIME;
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
  DrawMainFrame("one",caster.getHomeMap(),ally.getx(),ally.gety());
  
  resp["txt"] = "You conjure a daemon to aid you in battle!";
  resp["input"] = "&gt;";
  return resp;
}

//Quickness
magic[SPELL_QUICKNESS_LEVEL][SPELL_QUICKNESS_ID].getLongDesc = function() {
  return "Doubles the rate at which you take actions.";
}

magic[SPELL_QUICKNESS_LEVEL][SPELL_QUICKNESS_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Quickness.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let liobj = localFactory.createTile("Quickness");
  
  let dur = caster.getInt() * SCALE_TIME;
  if (free) { 
    dur = Dice.roll("1d10+5") * SCALE_TIME;
  }
  if (infused) {dur = dur * 1.5; }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(liobj, Math.max(0, free-1) );

  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  DrawCharFrame();
  return resp;  
}

// Reincarnate 

// Time Stop
magic[SPELL_TIME_STOP_LEVEL][SPELL_TIME_STOP_ID].getLongDesc = function() {
  return "Stops time. Each moment you live while time is stopped will drain some of your mana.";
}

magic[SPELL_TIME_STOP_LEVEL][SPELL_TIME_STOP_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Time Stop.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let liobj = localFactory.createTile("TimeStop");
  
  let dur = caster.getInt() * .3;
  if (free) { dur = 5; }
  if (infused) {dur = dur * 3; }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  if (infused) { liobj.setPower(4); }   // defaults to 2
  
//  DUPlaySound("sfx_spell_light"); 
  caster.addSpellEffect(liobj);
  
  DrawCharFrame();
  return resp;
}

function TravelByMoongate(who, color, belowgraphic, destbelow, destmap, destx, desty) {
  let tol = 300;
  let graphicarray = [];
  graphicarray[0] = "moongates.gif";
  graphicarray[1] = "spacer.gif";
  graphicarray[2] = -128;
  graphicarray[3] = 0;
  if (color === "red") { graphicarray[3] = -32; }
  
  let oldgraphic = who.getGraphicArray();
  // play sound effect
  who.setGraphicArray(graphicarray);
  DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
  setTimeout(function() {
    graphicarray[2] += 32;
    who.setGraphicArray(graphicarray);
    DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
    setTimeout(function() {
      graphicarray[2] += 32;
      who.setGraphicArray(graphicarray);
      DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
      setTimeout(function() {
        graphicarray[2] += 32;
        who.setGraphicArray(graphicarray);
        DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
        setTimeout(function() {
          graphicarray[2] += 32; // at this point it should be 0
          who.setGraphicArray(graphicarray);
          DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
          setTimeout(function() {
            who.setGraphicArray(belowgraphic);
            DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
            setTimeout(function() {
              MoveBetweenMaps(who,who.getHomeMap(), destmap, destx, desty);
              who.setGraphicArray(destbelow);
              DrawMainFrame("draw", who.getHomeMap(), who.getx(), who.gety());
              setTimeout(function() {
                who.setGraphicArray(graphicarray);
                DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
                setTimeout(function() {
                  graphicarray[2] -= 32;
                  who.setGraphicArray(graphicarray);
                  DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
                  setTimeout(function() {
                    graphicarray[2] -= 32;
                    who.setGraphicArray(graphicarray);
                    DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
                    setTimeout(function() {
                      graphicarray[2] -= 32;
                      who.setGraphicArray(graphicarray);
                      DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
                      setTimeout(function() {
                        graphicarray[2] -= 32;
                        who.setGraphicArray(graphicarray);
                        DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
                        setTimeout(function() {
                          who.setGraphicArray(oldgraphic);
                          DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
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


let spellcount = {};

function ShowEffect(onwhat, duration, graphic, xoff, yoff) {
  if (Object.keys(spellcount).length === 0) {
    DebugWrite("magic", "Clearing the spelleffects of empty divs.<br />");
    document.getElementById("spelleffects").innerHTML="";
  }

  if (!xoff) { xoff = 0; }
  if (!yoff) { yoff = 0; }
  
  if (spellcount["anim" + onwhat.getSerial()]){ 
    DebugWrite("magic", "Tried to create a second effect on " + onwhat.getName() + ".<br />");
    return; 
  }  //if there's already an effect playing, don't replace it with another one, just play the first only    
  let displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  let where = {};
  where.x = 0;
  where.y = 0;
  let animurl = "";
  spellcount["anim" + onwhat.getSerial()] = onwhat;
  if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onwhat.gety() <= displayspecs.bottomedge)) {
    where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
    animurl = "graphics/" + graphic ;
    if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Putting a " + animurl + " on " + onwhat.getName() + ".<br /></span>"); }
    DebugWrite("magic", "Putting a " + animurl + " on " + onwhat.getName() + ".<br />");
  }
  let animhtml;
  if (animurl) {
    let docid = "anim" + onwhat.getSerial();
    if (document.getElementById(docid).innerHTML === "") {
      document.getElementById(docid).innerHTML = '<img src="graphics/spacer.gif" width="32" height="32" />';
      document.getElementById(docid).style.left = where.x;
      document.getElementById(docid).style.top = where.y;
      document.getElementById(docid).style.backgroundImage = 'url("graphics/' + graphic + '")';
      document.getElementById(docid).style.backgroundPosition = 'background-position', xoff + 'px ' + yoff + 'px';
    } else {
      animhtml = '<div id="anim' + onwhat.getSerial() + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; width:32px; height:32px; background-image:url(\'graphics/' + graphic + '\'); background-position: ' + xoff + 'px ' + yoff + 'px"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
      document.getElementById('spelleffects').innerHTML = document.getElementById('spelleffects').innerHTML + animhtml;
    }
    
    setTimeout(function() {
      DebugWrite("magic", "Removing a " + animurl + " from " + onwhat.getName() + ".<br />");
      document.getElementById(docid).innerHTML = "";
      document.getElementById(docid).style.backgroundImage = "";
      delete spellcount["anim" + onwhat.getSerial()];
    },duration);
  }
}

function PlaySparkles(onwhat, color) {
  if (Object.keys(spellcount).length === 0) {
    DebugWrite("magic", "Clearing the spelleffects of empty sparkles.<br />");
    document.getElementById('spelleffects').innerHTML = '';
  }
    
  let colory = {};
  colory["yellow"] = 0;
  colory["green"] = -32;
  colory["blue"] = -64;
  colory["orange"] = -96;
  colory["purple"] = -128;
  colory["red"] = -160;
  
  let where;
  let animhtml;

  if (spellcount["anim" + onwhat.getSerial()]) { 
    DebugWrite("magic", "Tried to create a second sparkle on " + onwhat.getName() + ".<br />");
    return; 
  }  //if there's already a sparkle playing, don't replace it with another one, just play the first only
  spellcount["anim" + onwhat.getSerial()] = 1;
  DebugWrite("magic", "Incrementing spell effects count to " + spellcount['anim' + onwhat.getSerial()] + ".<br />");
  let displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onewhat.gety() <= displayspecs.bottomedge)) {
    where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
    animhtml = '<div id="anim' + onwhat.getSerial() + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; background-image:url(\'graphics/spellsparkles.gif\');background-repeat:no-repeat; background-position: 0px ' + colory[color] + 'px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';  
  } else {
    DebugWrite("magic", "Target is offscreen.<br />");
    animhtml = '<div id="anim' + onwhat.getSerial() + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; background-repeat:no-repeat; background-position: 0px ' + colory[color] + 'px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';  
  }
  document.getElementById('spelleffects').innerHTML = document.getElementById('spelleffects').innerHTML + animhtml;
  DebugWrite("magic", "Placed " + color + " sparkles on " + onwhat.getName() + ".<br />");
  AnimateSparkles(onwhat,colory[color],0);  
}

function AnimateSparkles(onwhat, color, animframe) {
  let spellcountid = "anim" + onwhat.getSerial();
  if (!spellcount[spellcountid]) {
    document.getElementById(spellcountid).innerHTML = "";
    document.getElementById(spellcountid).style.backgroundImage = "";
    DebugWrite("magic", "Spellcount zeroed out externally. Ceasing sparkling.<br />");
    return;
  }
  if (spellcount[spellcountid] === 48) {
    DebugWrite("magic", "Sparkle on " + onwhat.getName() + " finished.<br />");
    delete spellcount[spellcountid];
    document.getElementById(spellcountid).innerHTML = "";
    document.getElementById(spellcountid).style.backgroundImage = "";
  }
  let displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  let where;
  where.x = 0;
  where.y = 0;
  let animurl = "";
  if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onewhat.gety() <= displayspecs.bottomedge)) {
    where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
    animurl = "url('graphics/spellsparkles.gif')";
  }
  
  if ((spellcount[spellcountid]) % 3) {  // progressing the animation only every three calls 
                                         // so it can move with the target more quickly than it animates
    animframe++;
    if (animframe > 7) {
      animframe = 0;
    }
    DebugWrite("magic", "Sparkle on " + onwhat.getName() + " moving on to frame " + animframe + ".<br />");
  }
  document.getElementById(spellcountid).style.backgroundPosition = (animframe*-32) + "px " + color + "py";
  document.getElementById(spellcountid).style.backgroundImage = animurl;
  document.getElementById(spellcountid).style.left = where.x;
  document.getElementById(spellcountid).style.top = where.y;
  
  spellcount[spellcountid]++;
  setTimeout(AnimateSparkles(onwhat,color,animframe), 100);
}

function PerformSpellcast() {
  let themap = PC.getHomeMap();
  let targettile = themap.getTile(targetCursor.x, targetCursor.y);
  if (!IsVisibleOnScreen(targetCursor.x,targetCursor.y)) {
   	let retval = {};
  	retval["txt"] = "You cannot see that.";
  	retval["fin"] = 0;
    retval["input"] = "&gt;";
    let tileid = targetCursor.tileid;
    document.getElementById(tileid).innerHTML = targetCursor.basetile;
    delete targetCursor.spellName;

  	return retval;
  }

  if (themap.getLOS(PC.getx(), PC.gety(), targetCursor.x, targetCursor.y, 1) >= LOS_THRESHOLD) { 
    retval["fin"] = 0;
    retval["txt"] = "Your spell cannot reach there!";
   	retval["input"] = "&gt;";
    let tileid = targetCursor.tileid;
    document.getElementById(tileid).innerHTML = targetCursor.basetile; 
    delete targetCursor.spellName;

    return retval;
  }
  
  let resp = {};
  if (targetCursor.spelldetails.targettype === "npc") {
    let tgt = targettile.getTopVisibleNPC();
    if (!tgt || (tgt === PC)){
      // spell canceled
      resp["fin"] = 0;
      resp["txt"] = "Invalid target.";
      resp["input"] = "&gt;";
      delete targetCursor.spellName;
      document.getElementById(targetCursor.tileid).innerHTML = targetCursor.basetile;
    } else {
      targetCursor.lastTarget = tgt;
      let tileid = targetCursor.tileid;
      document.getElementById(targetCursor.tileid).innerHTML = targetCursor.basetile;

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
    let canmove = targettile.canMoveHere(MOVE_WALK,0);
    if (!canmove["canmove"]) {
      resp["fin"] = 0;
      resp["txt"] = "You cannot cast there.";
      resp["input"] = "&gt;";   
      let tileid = targetCursor.tileid;
      document.getElementById(tileid).innerHTML = targetCursor.basetile;
      delete targetCursor.spellName;
      
      return resp;   
    }
    let tgt = {};
    tgt.x = targetCursor.x;
    tgt.y = targetCursor.y;
    document.getElementById(targetCursor.tileid).innerHTML = targetCursor.basetile;
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
    } else if (targetCursor.spellName === "Telekinesis") {
      resp = PerformTelekinesisMove(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, targetCursor.tgt);
    }
  } else if (targetCursor.spelldetails.targettype === "usable") {
    let topfeature = targettile.getTopVisibleFeature();
    if (topfeature.pushable) {
      document.getElementById(targetCursor.tileid).innerHTML = targetCursor.basetile;

      CreateTargetCursor({sticky: 0, command:'c',spellName:'Telekinesis',spelldetails:{ caster: targetCursor.spelldetails.caster, infused: targetCursor.spelldetails.infused, free: targetCursor.spelldetails.free, targettype: "open"}, targetlimit: (viewsizex -1)/2, targetCenterlimit: targetCursor.targetCenterlimit});
      targetCursor.tgt = topfeature;
      resp["txt"] = "";
      resp["input"] = "&gt; Choose where to move it- ";
      resp["fin"] = 4;
      gamestate.setMode("target");
    } else if (typeof topfeature.use === "function") {
      resp = PerformTelekinesis(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, topfeature);
    } else {
      resp["fin"] = 0;
      resp["txt"] = "There is nothing to cast this on there.";
      resp["input"] = "&gt;";
      document.getElementById(targetCursor.tileid).innerHTML = targetCursor.basetile;
      delete targetCursor.spellName;
    }
    return resp;
  } else if (targetCursor.spelldetails.targettype === "feature") {
    if ((targetCursor.x === targetCursor.spelldetails.caster.getx()) && (targetCursor.y === targetCursor.spelldetails.caster.gety())) {
      let mademenu = MakeInventoryList("broken");
      if (!mademenu.length) {
        resp["fin"] = 0;
        resp["txt"] = "You have nothing in need of mending.";
        resp["input"] = "&gt;";
        document.getElementById(targetCursor.tileid).innerHTML = targetCursor.basetile;
        delete targetCursor.spellName;

        return resp;
      }

      gamestate.setMode("zstats");
      targetCursor.restrictTo = "broken";
      targetCursor.page = 2;
      
      DisplayInventory("broken");

		  resp["txt"] = "";
  		resp["input"] = "&gt; Cast Mending on: ";
	  	resp["fin"] = 3;	
	  } else {
	    let thetile = targetCursor.spelldetails.caster.getHomeMap().getTile(targetCursor.x, targetCursor.y);
	    let fea = thetile.getTopFeature();
	    if (fea && fea.breakable && fea.getBroken()) {
	      resp = PerformMend(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, fea);
	    } else {
        resp["fin"] = 0;
        resp["txt"] = "That is not in need of mending.";
        resp["input"] = "&gt;";
      }	 
      document.getElementById(targetCursor.tileid).innerHTML = targetCursor.basetile;     
      delete targetCursor.spellName;
	  }
		
		return resp;
  } else {
    alert(targetCursor.spelldetails.targettype);
  }
  delete targetCursor.spellName;
  return resp;
}

// There is still one call to this, but I think it is no longer reachable
function PerformSpellcastEquip(code) {
  alert("I was wrong, PerformSpellcastEquip in magic.js is still used. FIX!");
  let retval = {};
  if (targetCursor.itemlist.length === 0) {
    code = 27;
  }
  if (code === 27) { // ESC
    retval["fin"] = 0;
    delete targetCursor.itemlist;
    delete targetCursor.spelldetails;
  }
	else if ((code === 38) || (code === 219)) {   // UP ARROW  or  [
    document.getElementById('inv' + targetCursor.scrolllocation).classList.toggle('highlight');
    targetCursor.scrolllocation--;
    if (targetCursor.scrolllocation < 0) { targetCursor.scrolllocation = targetCursor.itemlist.length-1; }
    document.getElementById('inv' + targetCursor.scrolllocation).classList.toggle('highlight');
    
    targetCursor.scrollapi.scrollToElement('#inv' + targetCursor.scrolllocation);
    retval["fin"] = 1;
	}
  else if ((code === 40) || (code === 191)) { // DOWN ARROW or /
      $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrolllocation++;
	    if (targetCursor.scrolllocation > targetCursor.itemlist.length-1) { targetCursor.scrolllocation = 0; }
	    $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrollapi.scrollToElement('#inv' + targetCursor.scrolllocation);
	    retval["fin"] = 1;
  }
	else if ((code === 32) || (code === 13)) { // SPACE or ENTER
    // cast on selected item
    var tgt = targetCursor.itemlist[targetCursor.scrolllocation];
    if (tgt) {
      if (targetCursor.spellName === "Mend") {
  		  retval = PerformMend(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
  		}
    } else {
      retval["fin"] = 0;
      delete targetCursor.itemlist;
      delete targetCursor.spelldetails;
    }
  }
  return retval;
  
}

function PerformDirSpellcast() {
  let resp;
  let tgt = [targetCursor.x - caster.getx(), targetCursor.y - caster.gety()];
  if (targetCursor.spellName === "Wind Change") {
    resp = PerformWindChange(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
  }
  return resp;
}

function CheckMirrorWard(tgt, caster) {
  let mirror = tgt.getSpellEffectsByName("MirrorWard");
  
  if (mirror) {
    tgt = mirror.findNewTarget(caster);
  }
  
  return tgt;
}

function PlayRing(onwhat, ringfile, retval, endturn, secondring, firstringcallback, secondringcallback) {
  if (Object.keys(spellcount).length === 0) {
    DebugWrite("magic", "Clearing the spelleffects of empty sparkles.<br />");
    document.getElementById('spelleffects').innerHTML = "";
  }
    
  let where;
  let animhtml;

  if (spellcount["animring" + onwhat.getSerial()]) { 
    DebugWrite("magic", "Tried to create a second ring on " + onwhat.getName() + ".<br />");
    return; 
  }  //if there's already a sparkle playing, don't replace it with another one, just play the first only
  spellcount["animring" + onwhat.getSerial()] = 1;
  DebugWrite("magic", "Incrementing spell effects count to " + spellcount['anim' + onwhat.getSerial()] + ".<br />");
  let displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  
  let centerx = onwhat.getx();
  let centery = onwhat.gety();
  for (let i=centerx-1; i<=centerx+1; i++) {
    for (let j=centery-1; i<=centery+1; i++) {
      where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
      if ((i >= displayspecs.leftedge) && (i <= displayspecs.rightedge) && (j >= displayspecs.topedge) && (j <= displayspecs.bottomedge)) {
        animhtml = '<div id="animring' + onwhat.getSerial() + i + 'x' + j + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; background-image:url(\'graphics/' + ringfile + '\');background-repeat:no-repeat; background-position: 0px 0px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';    
      } else {
        animhtml = '<div id="animring' + onwhat.getSerial() + i + 'x' + j + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; background-image:url(\'graphics/spacer.gif\');background-repeat:no-repeat; background-position: 0px 0px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';            
      }
      document.getElementById('spelleffects').innerHTML = document.getElementById('spelleffects').innerHTML + animhtml;
    }  
  }
  
  DebugWrite("magic", "Placed a " + ringfile + " ring on " + onwhat.getName() + ".<br />");
  AnimateRing(onwhat,ringfile,retval,endturn,secondring, firstringcallback, secondringcallback);  
  return;
}

function AnimateRing(onwhat, ringfile, retval, endturn, secondring, firstringcallback, secondringcallback) {
  let spellcountid = "animring" + onwhat.getSerial();
  if (!spellcount[spellcountid]) {
    document.getElementById(spellcountid).innerHTML = "";
    document.getElementById(spellcountid).style.backgroundImage = "";
    DebugWrite("magic", "Spellcount zeroed out externally. Ceasing animating.<br />");
    return;
  }
  let centerx = onwhat.getx();
  let centery = onwhat.gety();
  if (spellcount[spellcountid] === 192) {
    DebugWrite("magic", "Ring on " + onwhat.getName() + " finished.<br />");
    delete spellcount[spellcountid];
    for (let i=centerx-1;i<=centerx+1;i++) {
      for (let j = centery-1; i<=centery+1; i++) {
        document.getElementById(spellcountid + i + 'x' + j).innerHTML = "";
        document.getElementById(spellcountid + i + 'x' + j).style.backgroundImage = "";
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
  let displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  let where;
  where.x = 0;
  where.y = 0;
  let animurl = "";
  for (let i=centerx-1;i<=centerx+1;i++) {
    for (let j=centery-1; i<=centery+1; i++) {
      if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onewhat.gety() <= displayspecs.bottomedge)) {
        where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
        animurl = "url('graphics/" + ringfile + "')";
      } else {
        animurl = "url('graphics/spacer.gif')";
      }
      let animframe = spellcount[spellcountid]-1;
      animframe = Math.floor(animframe/3);
      let animx = 0;
      let animy = 0;
      while (animframe > 7) {
        animy = animy-32;
        animframe = animframe - 8;
      }
      animx = -32*animframe;

      let docid = document.getElementById(spellcountid);
      docid.style.backgroundPosition = animx+"px " + animy + "py";
      docid.style.backgroundImage = animurl;
      docid.style.left = where.x;
      docid.style.top = where.y;      
    }
  }

  spellcount[spellcountid]++;
  setTimeout(AnimateRing(onwhat, ringfile, retval, endturn, secondring, firstringcallback, secondringcallback), 100);
}


function TestRing() {
  let displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  let testspot = getCoords(PC.getHomeMap(),displayspecs.leftedge, PC.gety());
  testspot.x -= 32;
  let animhtml = '<div id="animringtest" style="position: absolute; left: ' + testspot.x + 'px; top: ' + testspot.y + 'px; background-image:url(\'graphics/red-carpet.gif\');background-repeat:no-repeat; background-position: 0px 0px;"><img src="graphics/spacer.gif" width="96" height="96" /></div>';  
  document.getElementById('spelleffects').innerHTML = document.getElementById('spelleffects').innerHTML + animhtml;
}

"use strict";

// fin lists:
// 1: spell is complete, turn ends
// 2: cancel spellcast, return control to player
// 3: wait for animation, which will end the turn
// 4: spell has set a mode

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
  if (caster.getIntForPower() > 20) { chance -= 10; }
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

  let mademenu = MakeInventoryList("audachta");
  if (!mademenu.length) {
    resp["fin"] = 2;
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
  resp["fin"] = 4;	
  return resp;
}

function PerformAudachtaScribe(caster,infused,free,tgt) {
  let resp = {};
  resp["fin"] = 2;
  resp["usefin"] = 1;

  if (caster.knowsSpell(tgt.spelllevel, tgt.spellnum)) {
    resp["txt"] = "You already know that spell!";
  } else if ((tgt.spelllevel > 3) && (!DU.gameflags.getFlag("spellbook2"))) {
    resp["txt"] = "Your spellbook is not strong enough to hold that spell.";
  } else {
    if (!free) {
      let mana = magic[SPELL_AUDACHTA_SCRIBE_LEVEL][SPELL_AUDACHTA_SCRIBE_ID].getManaCost(0);
      CastSpellMana(caster,mana);
      DebugWrite("magic", "Spent " + mana + " mana.<br />");
    }  
    caster.addSpell(tgt.spelllevel, tgt.spellnum);
    resp["txt"] = "You learn the spell " + tgt.spellname + "!";
    caster.removeFromInventory(tgt);
    PlayCastSound(caster,"sfx_ding");
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
  let heal = 0;
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let effects = caster.getSpellEffects();
  let sparkle = 0;
  if (effects) {
    for (let i=0; i<effects.length; i++) {
      if (effects[i].getName() === "Poison") {
        ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
        heal = 1;
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
          heal = 1;
        }
      }
    }
  }
  if (infused) {
    let die = caster.getLevel() + "d4+2";
    let heal = Dice.roll(die);
    caster.healMe(heal, caster);
    heal = 1;
  }
  if (heal) { PlayCastSound(caster,"sfx_heal"); }
  else { PlayCastSound(caster); }

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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let mult = 1;
  let power = caster.getIntForPower();
  if (free) {
    power = 15;
  }
  let playsound=0;
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
            playsound = 1;
            ShowEffect(val, 1700, "spellsparkles-anim.gif", 0, COLOR_ORANGE);
          }
          else { 
            maintext.addText("Trap resists."); 
            ShowEffect(val, 700, "X.gif");
          }
        } else if (val.name === "CrystalTrapSpace") {
          let chance = (50 + (power*mult));
          DebugWrite("magic", "Chance to disarm crystal trap is " + chance + "%.");
          if (chance < 5) { chance = 5; }
          let roll = Dice.roll("1d100");
          if (roll <= chance) { 
            val.disarmTrap(); 
            maintext.addText("Trap disarmed!"); 
            playsound = 1;
            ShowEffect(val, 1700, "spellsparkles-anim.gif", 0, COLOR_ORANGE);
          }
        }
      }
    }
  }
  if (playsound) { PlayCastSound(caster,"sfx_unlock"); }
  else { PlayCastSound(caster); }

  return resp;
}

// Distract
magic[SPELL_DISTRACT_LEVEL][SPELL_DISTRACT_ID].getLongDesc = function () {
  if (PC.getIntForPower() > 20) {
    return "Enemies within a radius of 4 resist or become distracted, lowering their chance to hit by " + Math.round(PC.getIntForPower()/2) + "%.";
  } else {
    return "Enemies within a radius of 3 resist or become distracted, lowering their chance to hit " + Math.round(PC.getIntForPower()/2) + "%.";
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let radius = 3;
  if (!free & caster.getIntForPower() > 20) { radius = 4; }
  if (infused) { radius = radius * 1.5; } 
  let power = caster.getIntForPower()/2;
  if (free) { power = Dice.roll("1d3+7"); }
  if (infused) { power = power*1.5; }
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  let distracted = 0;
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    if (CheckAreEnemies(val,caster) && !val.frozenintime) {   // only affect enemies who are not Vault frozen in time
      val.setHitBySpell(caster,SPELL_DISTRACT_LEVEL);
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        let desc = "";
        if (!CheckResist(caster,val,infused,0)) {
          let distract = localFactory.createTile("Distract");
          ShowEffect(val, 1700, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
          if (val !== PC) {
            desc = val.getDesc() + " is distracted!";            
          }
          // Not necessary for PC - ephemeral object's start desc is sufficient
          let duration = power * SCALE_TIME;
          distract.setExpiresTime(duration + DUTime.getGameClock());
          distract.setPower(power);
          val.addSpellEffect(distract, Math.max(0,free-1) );
          distracted = 1;
        } else {
          desc = val.getDesc() + " resists!";
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
  if (distracted) { PlayCastSound(caster,"sfx_debuff"); }
  else { PlayCastSound(caster); }

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
    resp["fin"] = 2;
    return resp;  
  }
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let flameblade = localFactory.createTile("FlameBlade");
  let duration = caster.getIntForPower() * 2 * SCALE_TIME;
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
  PlayCastSound(caster,"sfx_fire_hit");
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let liobj = localFactory.createTile("Light");
  let dur = 20 * caster.getIntForPower() * .3;
  if (free) { dur = 100; }
  if (infused) {dur = dur * 3; }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  if (infused) { liobj.setPower(4); }   // defaults to 2
  
  PlayCastSound(caster,"sfx_spell_light"); 
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
  let resp = {};

  if (caster !== PC) {
    resp = PerformMend(caster, infused, free, tgt);
    return resp;
  }
  
  CreateTargetCursor({sticky: 0, command:'c',spellName:'Mend',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "feature"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 1});
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (tgt.repairNeedsInfusion && !infused) {
    let desc = "The " + tgt.getDesc() + " glows briefly, but is not mended.";
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    resp["txt"] = desc;
  } else {
    if (tgt.cannotrepair) {
      // for quest things that need Mending but don't break/repair
      tgt.onMend(caster);
      PlayCastSound(caster,"sfx_ding");
    } else {
      tgt.repair();
      let desc = "The " + tgt.getDesc() + " glows briefly, and is mended!";
      desc = desc.charAt(0).toUpperCase() + desc.slice(1);
      PlayCastSound(caster,"sfx_ding");
      resp["txt"] = desc;    
    }
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
  let resp = {};
  if (caster !== PC) {
    resp = PerformVulnerability(caster, infused, free, tgt);
    return resp;
  }

  CreateTargetCursor({sticky: 1, command:'c',spellName:'Vulnerability',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});  
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    ShowEffect(tgt, 1000, "static.gif", MIRROR_SPLAT_X,MIRROR_SPLAT_Y);
    PlayCastSound(tgt, "sfx_mirror_ward");
    
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  
  if (!tgt.frozenintime) {
    tgt.setHitBySpell(caster,SPELL_VULNERABILITY_LEVEL);
  }
  if (tgt.frozenintime) {
    desc = "Nothing happens yet...";
  } else if (!CheckResist(caster,tgt,infused,0)) {
    let vulobj = localFactory.createTile("Vulnerability");
    
    let dur = caster.getIntForPower()/2;
    if (infused) { dur = dur * 1.5;}
    if (free) { dur = Dice.roll("1d4+5"); }
    ShowEffect(tgt, 1700, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
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
    PlayCastSound(caster,"sfx_debuff");
  }
  else {
    desc = tgt.getDesc() + " resists!";
    if (tgt === PC) {
      desc = "You resist.";
      // no X over the PC
    } else {
      ShowEffect(tgt, 700, "X.gif");
    }
    PlayCastSound(caster);
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
  CreateTargetCursor({sticky: 0, command:'c',spellName:'Illusion',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "open"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 3});    
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let illusion;
  if (infused) {
    illusion = localFactory.createTile("InfusedIllusionNPC");
  } else {
    illusion = localFactory.createTile("IllusionNPC");
  }
  
  if ((caster === PC) || (caster.getAttitude() === "friendly")) {
    illusion.setAttitude("friendly");
  }
  let duration = caster.getIntForPower();
  if (free) { duration = Dice.roll("1d6+12"); }
  duration = duration*2*SCALE_TIME;
  illusion.expiresTime = DUTime.getGameClock() + duration;  // illusion AI needs to check expiresTime and go poof if it is reached
  illusion.spawnedBy = caster; 
  illusion.summoned = 1;
  caster.getHomeMap().placeThing(tgt.x,tgt.y,illusion);
  DrawMainFrame("one",caster.getHomeMap(),illusion.getx(),illusion.gety());
  
  PlayCastSound(caster, "sfx_summon");  
  ShowEffect(illusion, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
  resp["txt"] = "You conjure an illusion to aid you in battle.";
  resp["input"] = "&gt;";
  return resp;
}

// Iron Flesh
magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].getLongDesc = function() {
  let absorb = PC.getIntForPower() * 3.5;
  return `Absorbs 5 points from hits on you until it has absorbed ${absorb}.`;
}
magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].getInfusedDesc = function() {
  let absorb = PC.getIntForPower() * 7;
  return `Until it has absorbed ${absorb} points of damage instead.`;
}

magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Iron Flesh.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  if (!tgt || (caster === PC)) {
    tgt = caster;
  }
  let liobj = localFactory.createTile("IronFlesh");
  
  let dur = caster.getIntForPower() * .5;
  if (free) { dur = 10; }
  if (infused) {dur = dur * 2; }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  let power = 35;
  if (!free) {
    if (infused) { power = caster.getIntForPower()*7; } 
    else { power = caster.getIntForPower()*3.5; }
  }
  liobj.setPower(power);
  
  tgt.addSpellEffect(liobj);
  
  PlayCastSound(caster, "sfx_buff");
  ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_ORANGE);
  DrawCharFrame();
  return resp;
}

// Lesser Heal
magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].getLongDesc = function() {
  return "Heals you for " + Dice.rollmin(PC.getLevel() + "d6+" + PC.getIntForPower()) + "-" + Dice.rollmax(PC.getLevel() + "d6+" + PC.getIntForPower()) + "HP.";
}
magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].getInfusedDesc = function() {
  let minheal = Dice.rollmin(PC.getLevel() + "d6+" + PC.getIntForPower());
  minheal = Math.floor(minheal * 1.5);
  let maxheal = Dice.rollmax(PC.getLevel() + "d6+" + PC.getIntForPower());
  maxheal = Math.floor(maxheal * 1.5);
  return "Heals for " + minheal + "-" + maxheal + "HP instead.";
}

magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Lesser Heal.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    var mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let lvl = caster.getLevel();
  let plus = PC.getIntForPower();
  if (free) { 
    lvl = Dice.roll("1d2+2"); 
    plus = Dice.roll("1d3+7");
  }
  
  let healamt = Dice.roll(lvl + "d6+" + plus);
  if (infused) { healamt = healamt * 1.5; }
  DebugWrite("magic", "Healing " + healamt + " hp.<br />");
  
  if (!tgt || (caster === PC)) {
    tgt = caster;
  }
  
  ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
  tgt.healMe(healamt, caster);
  PlayCastSound(caster, "sfx_heal");
  if (free !== 2) {
    resp["txt"] = "You feel better!";
  }
  
  return resp;
}

// Magic Bolt
magic[SPELL_MAGIC_BOLT_LEVEL][SPELL_MAGIC_BOLT_ID].getLongDesc = function() {
  return "Deals " + (Dice.rollmin(DMG_NEGLIGABLE)+Math.floor(PC.getIntForPower()/5)+1) + "-" + (Dice.rollmax(DMG_NEGLIGABLE)+Math.floor(PC.getIntForPower()/5)+1) + " magic damage to a single target. Half damage if resisted.";
}
magic[SPELL_MAGIC_BOLT_LEVEL][SPELL_MAGIC_BOLT_ID].getInfusedDesc = function() {
  let mindmg = Dice.rollmin(DMG_NEGLIGABLE)+Math.floor(PC.getIntForPower()/5)+1;
  mindmg = Math.floor(1.5*mindmg);
  let maxdmg = Dice.rollmax(DMG_NEGLIGABLE)+Math.floor(PC.getIntForPower()/5)+1;
  maxdmg = Math.floor(1.5*maxdmg);
  return "Deals " + mindmg + "-" + maxdmg + " magic damage instead.";
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

  CreateTargetCursor({sticky: 1, command:'c',spellName:'Magic Bolt',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});    
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformMagicBolt(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_MAGIC_BOLT_LEVEL][SPELL_MAGIC_BOLT_ID].getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let power = caster.getIntForPower();
  if (free) { power = Dice.roll("1d5+12"); }

  let dmg = 0;  // real damage rolled after real target determined
  let desc = "";
  let multitargets = [];
  multitargets[0] = {};
  multitargets[0].atk = caster;
  multitargets[0].def = tgt;
  multitargets[0].dmg = dmg;
  multitargets[0].retval = { txt:"" };
  multitargets[0].fromcoords = GetCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  multitargets[0].tocoords = GetCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  multitargets[0].destgraphic = {graphic:"static.gif", xoffset:RED_SPLAT_X, yoffset:RED_SPLAT_Y, overlay:"spacer.gif"};

  let boltgraphic = {};
  boltgraphic.graphic = "blasts.gif";
  boltgraphic.xoffset = 0;
  boltgraphic.yoffset = -32;
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);

  multitargets[0].ammographic = boltgraphic;

  multitargets[0].sounds = {end: "sfx_default_hit"};
  let duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  multitargets[0].duration = duration;
  let weapon = localFactory.createTile("SpellWeapon");
  weapon.dmgtype = "force";
  multitargets[0].weapon = weapon;
  multitargets[0].type = "missile";
  multitargets[0].ammoreturn = 0;
  multitargets[0].endturn = 1;
  multitargets[0].dmgtype = "force";

  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    // new target!
    let newobj = {};
    newobj.atk = tgt;
    newobj.def = newtgt;
    newobj.dmg = dmg;
    newobj.retval = { txt: ""};
    newobj.fromcoords = GetCoords(newobj.atk.getHomeMap(),newobj.atk.getx(),newobj.atk.gety());
    newobj.tocoords = GetCoords(newobj.def.getHomeMap(),newobj.def.getx(),newobj.def.gety());
    newobj.destgraphic = {graphic:"static.gif", xoffset:RED_SPLAT_X, yoffset:RED_SPLAT_Y, overlay:"spacer.gif"};

    multitargets[multitargets.length-1].destgraphic = {graphic:"static.gif", xoffset:MIRROR_SPLAT_X, yoffset:MIRROR_SPLAT_Y, overlay:"spacer.gif"};

    let bg = {};
    bg.graphic = "blasts.gif";
    bg.xoffset = 0;
    bg.yoffset = -32;
    bg.directionalammo = 1;
    bg = GetEffectGraphic(tgt, newtgt, bg);
    newobj.ammographic = bg;

    multitargets[multitargets.length-1].sounds = {end: "sfx_mirror_ward"}
    newobj.sounds = {end: "sfx_default_hit"};
    newobj.duration = (Math.pow( Math.pow(newtgt.getx() - tgt.getx(), 2) + Math.pow (newtgt.gety() - tgt.gety(), 2)  , .5)) * 100;
    let wpn = localFactory.createTile("SpellWeapon");
    wpn.dmgtype = "force";
    newobj.weapon = wpn;
    newobj.type = "missile";
    newobj.ammoreturn = 0;
    newobj.endturn = 1;
    newobj.dmgtype = "force";
    newobj.myturn = caster;

    multitargets.push(newobj);
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
  tgt.setHitBySpell(caster,SPELL_MAGIC_BOLT_LEVEL);

//  let dmg = RollDamage(DMG_NEGLIGABLE, Math.floor(power/5)+1);
  let predmg = prepareSpellDamage(caster, tgt, DMG_NEGLIGABLE, "force", 0, Math.floor(power/5)+1);
  dmg = predmg.dmg;
  if (infused) {
    dmg *= 1.5;
  }
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");

  desc = tgt.getDesc();
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  let descval = {txt: desc};

  multitargets[multitargets.length-1].dmg = dmg;
  multitargets[multitargets.length-1].retval = descval;

  PlayCastSound(caster,"sfx_magic_bolt");

  let nowtarget = multitargets.shift();
  nowtarget.doagain = multitargets;
  if (tgt.frozenintime) {
    descval = {txt: "You cast Magic Bolt. It streaks forth from your hand, but before it reaches its target, it slows, and stops, and hangs in the air."};
    nowtarget.retval = descval;
    nowtarget.frdesc = "Magic Bolt";
//    AnimateToFrozen({atk:caster, def:tgt, fromcoords:fromcoords, tocoords:tocoords, ammographic:boltgraphic, destgraphic:destgraphic, sounds:sounds, type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"force", weapon:weapon, frdesc:"Magic Bolt",doagain:[]});
    AnimateToFrozen(nowtarget);
  } else {
//    AnimateEffect({atk:caster, def:tgt, fromcoords:fromcoords, tocoords:tocoords, ammographic:boltgraphic, destgraphic:destgraphic, sounds:sounds, type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"force", weapon:weapon,doagain:[]});
    AnimateEffect(nowtarget);
  }
  resp["fin"] = -1;
  return resp;
}

// Poison Cloud
magic[SPELL_POISON_CLOUD_LEVEL][SPELL_POISON_CLOUD_ID].getLongDesc = function() {
  let rad = Math.floor(PC.getIntForPower()/10)+1;
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
    
  CreateTargetCursor({sticky: 0, command:'c',spellName:'Poison Cloud',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "fullopen"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});    
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let power = caster.getIntForPower();
  if (free) { power = Dice.roll("1d5+12"); }  
  let radius = Math.floor(power/10) +1.5; 

  DebugWrite("magic", "Calculating poison cloud. Radius: " + radius + "<br />");
  
  let anyonepoisoned = 0;
  let potential_targets = tgtmap.getNPCsAndPCs();
  
  for (let i=0;i<potential_targets.length;i++) {
    let val=potential_targets[i];
    if ((GetDistance(val.getx(),val.gety(),tgt.x,tgt.y) < radius) && (val !== caster) && (!val.frozenintime)) {
      if (tgtmap.getLOS(val.getx(),val.gety(),tgt.x,tgt.y,1) < LOS_THRESHOLD) {
        anyonepoisoned = 1;
        if (!IsNonLiving(val)) { val.setHitBySpell(caster,SPELL_POISON_CLOUD_LEVEL); }
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
          ShowEffect(val, 1700, "spellsparkles-anim.gif", 0, COLOR_GREEN);
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
            let dmg = prepareSpellDamage(caster, val, DMG_LIGHT, "poison", 0);
//            val.dealDamage(dmg,caster,"poison");
            DealandDisplayDamage(val,caster,dmg.dmg,"poison");
            // additionally deals some damage
          }
        }
      }
    }
  }
  
  if (!anyonepoisoned) {
    maintext.addText("No one was poisoned by the cloud.");
  }
  PlayCastSound(caster,"sfx_gas");
  resp["input"] = "&gt;";
  return resp;
}

// Protection
magic[SPELL_PROTECTION_LEVEL][SPELL_PROTECTION_ID].getLongDesc = function() {
  let power = (PC.getIntForPower()*2/3)+1;
  power = power.toFixed(2);
  let dur = PC.getIntForPower() * 5;
  return "Decreases your chance of being hit by " + power + "% for " + dur + " minutes.";
}
magic[SPELL_PROTECTION_LEVEL][SPELL_PROTECTION_ID].getInfusedDesc = function() {
  let power = ((PC.getIntForPower()*2/3)+1)*1.5;
  power = power.toFixed(2);
  let dur = PC.getIntForPower() * 10;
  return "Decreases your chance of being hit by " + power + "% for " + dur + " minutes instead.";
}

magic[SPELL_PROTECTION_LEVEL][SPELL_PROTECTION_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Protection.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  if (!tgt || (caster === PC)) { tgt = caster; }

  let prot = localFactory.createTile("Protection");
  let duration = caster.getIntForPower() * 5;
  let power = Math.floor(caster.getIntForPower()*2/3)+1;
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
  tgt.addSpellEffect(prot, Math.max(0, free-1) );
  PlayCastSound(caster,"sfx_buff");
  ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  
  return resp;
}

// Unlock
magic[SPELL_UNLOCK_LEVEL][SPELL_UNLOCK_ID].getLongDesc = function() {
  return "Unlocks a locked door.";
}
magic[SPELL_UNLOCK_LEVEL][SPELL_UNLOCK_ID].getInfusedDesc = function() {
  return "Can also unlock most magically locked doors.";
}

magic[SPELL_UNLOCK_LEVEL][SPELL_UNLOCK_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Unlock.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
   
  let unlocked = 0;
  let castermap = caster.getHomeMap();
  let features = castermap.features.getAll();
  for (let i=0;i<features.length;i++) {
    let val=features[i];
    if (typeof val.getLocked == "function") {
      if (GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety(), "square") <= 1) {
        let lock = val.getLocked();
        if ((lock === 1) || ((lock === 2) && (infused))) {
          val.unlockMe();
          unlocked = 1;
          DrawMainFrame("one", castermap, val.getx(), val.gety());
          let desc = "The " + val.getDesc() + " is unlocked.";
          ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_ORANGE);
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);      
          maintext.addText(desc);
        }
      }
    }
  }

  if (unlocked) { PlayCastSound(caster,"sfx_unlock"); }
  else { PlayCastSound(caster); }
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
    CastSpellMana(caster,mana);
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
  PlayCastSound(caster,"sfx_whoosh");

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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let casterspells = caster.getSpellEffects();
  let dispellables = [];
  let dispelled = 0;
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
      dispelled = 1;
    } else {
      maintext.AddText("You attempt to dispel " + dispellables[idx].getDesc() + ", but it fails.");
    }
  } else {
    maintext.addText("There are no effects upon you that can be dispelled.");
  }
  if (dispelled) { PlayCastSound(caster,"sfx_buff"); }
  else { PlayCastSound(caster); }

  return resp;
}
  
// Disrupt Undead
magic[SPELL_DISRUPT_UNDEAD_LEVEL][SPELL_DISRUPT_UNDEAD_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " damage to all undead within 6 steps.";
}
magic[SPELL_DISRUPT_UNDEAD_LEVEL][SPELL_DISRUPT_UNDEAD_ID].getInfusedDesc = function() {
  let mindmg = Dice.rollmin(DMG_MEDIUM);
  mindmg = Math.floor(1.5*mindmg);
  let maxdmg = Dice.rollmax(DMG_MEDIUM);
  maxdmg = Math.floor(1.5*maxdmg);
  return "Deals " + mindmg + "-" + maxdmg + " instead.";
}

magic[SPELL_DISRUPT_UNDEAD_LEVEL][SPELL_DISRUPT_UNDEAD_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Disrupt Undead.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let castermap = caster.getHomeMap();
  let npcs = castermap.npcs.getAll();
  let hitany = 0;
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    if ((val.special.indexOf("undead") > -1) && !val.frozenintime) {
      if (GetDistance(val.getx(),val.gety(), caster.getx(), caster.gety()) < 7) {
        val.setHitBySpell(caster,SPELL_DISRUPT_UNDEAD_LEVEL);
        let tmpdmg = prepareSpellDamage(caster,val,DMG_MEDIUM,"force");
        let dmg = tmpdmg.dmg;
        if (infused) {
          dmg *= 1.5;
        }
        if (CheckResist(caster,val,infused,0)) { dmg = (dmg/2)+1; }
        DebugWrite("magic", "Found " + val.getName() + " , dealing it " + dmg + " damage.<br />");
        //val.dealDamage(dmg);
        DealandDisplayDamage(val,caster,dmg,"force");
        ShowEffect(val, 700, "static.gif", RED_SPLAT_X, RED_SPLAT_Y);
        let desc = val.getDesc() + " disrupted!";
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);      
        maintext.addText(desc);
        hitany = 1;
      }
    }
  }
  if (!hitany) {
    PlayCastSound(caster);
    maintext.addText("No undead within range.");
  } else {
    PlayCastSound(caster,"sfx_dangerous_buff");
  }

  return resp;
}

// Fire Armor
magic[SPELL_FIRE_ARMOR_LEVEL][SPELL_FIRE_ARMOR_ID].getLongDesc = function() {
  return "Any adjacent foe who strikes you takes " + Dice.rollmin(DMG_NEGLIGABLE) + "-" + Dice.rollmax(DMG_NEGLIGABLE) + " fire damage.";
}
magic[SPELL_FIRE_ARMOR_LEVEL][SPELL_FIRE_ARMOR_ID].getInfusedDesc = function() {
  return "Damage increased to " + Dice.rollmin(DMG_LIGHT) + "-" + Dice.rollmax(DMG_LIGHT) + " and duration doubled.";
}

magic[SPELL_FIRE_ARMOR_LEVEL][SPELL_FIRE_ARMOR_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Fire Armor.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let prot = localFactory.createTile("FireArmor");
  let duration = caster.getIntForPower() * 5 * SCALE_TIME;
  if (free) { duration = Dice.roll("1d6 + 12") * 5 * SCALE_TIME; }
  let power = DMG_NEGLIGABLE;
  if (infused) { 
    duration = duration * 2; 
    power = DMG_LIGHT;
  }
  let endtime = duration + DUTime.getGameClock();
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  prot.setExpiresTime(endtime);
  prot.setPower(power);
  caster.addSpellEffect(prot, Math.max(0, free) );
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
  PlayCastSound(caster,"sfx_flame_armor");
  return resp;
}

// Fireball
magic[SPELL_FIREBALL_LEVEL][SPELL_FIREBALL_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " fire damage to a single target. Half damage if resisted."
}
magic[SPELL_FIREBALL_LEVEL][SPELL_FIREBALL_ID].getInfusedDesc = function() {
  let mindmg = Dice.rollmin(DMG_MEDIUM);
  mindmg = Math.floor(1.5 * mindmg);
  let maxdmg = Dice.rollmax(DMG_MEDIUM);
  maxdmg = Math.floor(1.5 * maxdmg);
  return "Deals " + mindmg + "-" + maxdmg + " fire damage instead.";
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

  CreateTargetCursor({sticky: 1, command:'c',spellName:'Fireball',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});      
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformFireball(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_FIREBALL_LEVEL][SPELL_FIREBALL_ID].getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let dmg = 0;  // real damage rolled after real target determined
  let desc = "";
  let multitargets = [];
  multitargets[0] = {};
  multitargets[0].atk = caster;
  multitargets[0].def = tgt;
  multitargets[0].dmg = dmg;
  multitargets[0].retval = { txt:"" };
  multitargets[0].fromcoords = GetCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  multitargets[0].tocoords = GetCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  multitargets[0].destgraphic = {graphic:"static.gif", xoffset:RED_SPLAT_X, yoffset:RED_SPLAT_Y, overlay:"spacer.gif"};

  let boltgraphic = {};
  boltgraphic.graphic = "blasts.gif";
  boltgraphic.xoffset = 0;
  boltgraphic.yoffset = 0;
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);

  multitargets[0].ammographic = boltgraphic;

  multitargets[0].sounds = {end: "sfx_default_hit"};
  let duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  multitargets[0].duration = duration;
  let weapon = localFactory.createTile("SpellWeapon");
  weapon.dmgtype = "fire";
  multitargets[0].weapon = weapon;
  multitargets[0].type = "missile";
  multitargets[0].ammoreturn = 0;
  multitargets[0].endturn = 1;
  multitargets[0].dmgtype = "fire";

  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    // new target!
    let newobj = {};
    newobj.atk = tgt;
    newobj.def = newtgt;
    newobj.dmg = dmg;
    newobj.retval = { txt: ""};
    newobj.fromcoords = GetCoords(newobj.atk.getHomeMap(),newobj.atk.getx(),newobj.atk.gety());
    newobj.tocoords = GetCoords(newobj.def.getHomeMap(),newobj.def.getx(),newobj.def.gety());
    newobj.destgraphic = {graphic:"static.gif", xoffset:RED_SPLAT_X, yoffset:RED_SPLAT_Y, overlay:"spacer.gif"};

    multitargets[multitargets.length-1].destgraphic = {graphic:"static.gif", xoffset:MIRROR_SPLAT_X, yoffset:MIRROR_SPLAT_Y, overlay:"spacer.gif"};

    let bg = {};
    bg.graphic = "blasts.gif";
    bg.xoffset = 0;
    bg.yoffset = 0;
    bg.directionalammo = 1;
    bg = GetEffectGraphic(tgt, newtgt, bg);
    newobj.ammographic = bg;

    multitargets[multitargets.length-1].sounds = {end: "sfx_mirror_ward"}
    newobj.sounds = {end: "sfx_default_hit"};
    newobj.duration = (Math.pow( Math.pow(newtgt.getx() - tgt.getx(), 2) + Math.pow (newtgt.gety() - tgt.gety(), 2)  , .5)) * 100;
    let wpn = localFactory.createTile("SpellWeapon");
    wpn.dmgtype = "fire";
    newobj.weapon = wpn;
    newobj.type = "missile";
    newobj.ammoreturn = 0;
    newobj.endturn = 1;
    newobj.dmgtype = "fire";
    newobj.myturn = caster;

    multitargets.push(newobj);

    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  tgt.setHitBySpell(caster,SPELL_FIREBALL_LEVEL);
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }

  let tmpdmg = prepareSpellDamage(caster,tgt,DMG_MEDIUM,"fire");
  dmg = tmpdmg.dmg;
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = tgt.getDesc();
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  let descval = {txt: desc};

  multitargets[multitargets.length-1].dmg = dmg;
  multitargets[multitargets.length-1].retval = descval;

  PlayCastSound(caster,"sfx_fireball");

  let nowtarget = multitargets.shift();
  nowtarget.doagain = multitargets;

  if (tgt.frozenintime) {
    descval = {txt: "You cast Fireball. It streaks forth from your hand, but before it reaches its target, it slows, and stops, and hangs in the air."};
    nowtarget.retval = descval;
    nowtarget.frdesc = "Fireball";
//    AnimateToFrozen({atk:caster, def:tgt, fromcoords:fromcoords, tocoords:tocoords, ammographic:boltgraphic, destgraphic:destgraphic, sounds:sounds, type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"force", weapon:weapon, frdesc: "Fireball", doagain:[]});
    AnimateToFrozen(nowtarget);
  } else {
//    AnimateEffect({atk:caster, def:tgt, fromcoords:fromcoords, tocoords:tocoords, ammographic:boltgraphic, destgraphic:destgraphic, sounds:sounds, type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"fire", weapon:weapon, doagain:[]});
    AnimateEffect(nowtarget);
  }
  resp["fin"] = -1;
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
    if (shrine.getName() === "Shrine") {
      if (shrine.hasOwnProperty("gotomap")) {
        DU.maps.addMap(shrine.gotomap);
        let destmap = DU.maps.getMap(shrine.gotomap);
        if (!free) {
          free = 0;
          let mana = this.getManaCost(infused);
          CastSpellMana(caster,mana);
          DebugWrite("magic", "Spent " + mana + " mana.<br />");
        }    
        PlayCastSound(caster,"sfx_teleport");
        TravelByMoongate(caster,"blue", destmap, shrine.gotox, shrine.gotoy);
      } else {
        maintext.addText("The gateway seems incomplete. The spell will not work until there is another gate linked to this one.");
        resp["fin"] = 1;
      }
    } else if (shrine.getName() === "BrokenShrine") {
      if (infused) {
        DU.maps.addMap(shrine.gotomap);
        let destmap = DU.maps.getMap(shrine.gotomap);
        PlayCastSound(caster,"sfx_teleport");
        TravelByMoongate(caster,"blue", destmap, shrine.gotox, shrine.gotoy);
        if (!free) {
          free = 0;
          let mana = this.getManaCost(infused);
          CastSpellMana(caster,mana);
          DebugWrite("magic", "Spent " + mana + " mana.<br />");
        }      
      } else {
        maintext.addText("The spell sputters and the broken node remains closed.");
        resp["fin"] = 1;
        if (!free) {
          free = 0;
          let mana = this.getManaCost(infused);
          CastSpellMana(caster,mana);
          DebugWrite("magic", "Spent " + mana + " mana.<br />");
        }      
        PlayCastSound(caster);
      }
    }
  } else {
    maintext.addText("The spell sputters, finding no gate node to open."); 
    resp["fin"] = 1;
  }
  
  DrawCharFrame();
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let returndest = {};
  
  let castermap = caster.getHomeMap();
  maintext.setInputLine("&gt;");
  maintext.drawTextFrame();

  if (castermap.getName().indexOf("combat") > -1) {
    let fighton = castermap.getExitToMap();
    if ((fighton === "darkunknown") || (infused)) {
      returndest.map = "darkunknown";
      returndest.x = 69;
      returndest.y = 74;
    }
  } else {
    if ((castermap.getReturnInfused() && infused) || !castermap.getReturnInfused()) {
      returndest.map = castermap.getReturnMap();
      returndest.x = castermap.getReturnx();
      returndest.y = castermap.getReturny();
    }
  }
  
  if (returndest.map) {
    let destmap = DU.maps.getMap(returndest.map);
    PlayCastSound(caster,"sfx_teleport");  
    TravelByMoongate(caster,"blue", destmap, returndest.x, returndest.y);
    resp["fin"] = 3;
  } else {
    maintext.addText("The spell sputters as the distances are too great.");
    resp["fin"] = 1;
    PlayCastSound(caster);
  }
  
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

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  CreateTargetCursor({sticky: 0, command:'c',spellName:'Telekinesis',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "usable"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});        
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (tgt.heavy && !infused) {
    retval["fin"] = 1;
    retval["txt"] = "That object is too heavy.";
    retval["override"] = 1;
  } else if (tgt.frozenintime) {
    retval["fin"] = 1;
    retval["txt"] = "You cast the spell, but nothing seems to happen.";
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
  PlayCastSound(caster);
  return retval;
}

function PerformTelekinesisMove(caster, infused, free, tgt) {  // NOTE- tgt needs to hold both moved item and target coords
  gamestate.setMode("null");
  
  let retval = {fin:1, input: "&gt;"};
  if (!free) {
    let mana = magic[SPELL_TELEKINESIS_LEVEL][SPELL_TELEKINESIS_ID].getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let usemap = tgt.getHomeMap();
  PlayCastSound(caster);
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

  CreateTargetCursor({sticky: 0, command:'c',spellName:'Wall of Flame',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "fullopen"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});        
  resp["txt"] = "";
  resp["input"] = "&gt; Choose where to conjure- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformWallOfFlame(caster, infused, free, tgt) {
  let resp = {fin:1, input: "&gt;"};
  PlayCastSound(caster,"sfx_flame_armor");

  let castermap = caster.getHomeMap();
  if (castermap.getLOS(caster.getx(), caster.gety(), tgt.x, tgt.y, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "You cannot cast this spell there.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_WALL_OF_FLAME_LEVEL][SPELL_WALL_OF_FLAME_ID].getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if ((caster.getHomeMap().getName() === "vault") && (tgt.y < 12) && (tgt.x < 12)) {
    resp.txt = "You cast the spell, but nothing seems to happen.";
    return resp;
  }

  let duration = caster.getIntForPower() * SCALE_TIME;
  if (infused) { duration = duration * 2; }
  let expires = duration + DU.DUTime.getGameClock();
  
  // make the first firefield
  let field1 = localFactory.createTile("FireField");
  castermap.placeThing(tgt.x, tgt.y, field1)
  field1.expiresTime = expires;
  
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
  return "Raises your STR, DEX, and INT by " + (Math.floor(PC.getIntForPower()/5)+1) + ".";
}
magic[SPELL_BLESSING_LEVEL][SPELL_BLESSING_ID].getInfusedDesc = function() {
  return "Extends the duration.";
}

magic[SPELL_BLESSING_LEVEL][SPELL_BLESSING_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Blessing.<br />");
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  if (!tgt || (caster === PC)) { tgt = caster; }

  let levobj = localFactory.createTile("Blessing");
  
  let dur = caster.getIntForPower() * SCALE_TIME;
  if (infused) { dur = dur * 3; }
  let power = Math.floor(caster.getIntForPower()/5)+1;
  if (free) {
    dur = Dice.roll("2d10+15") * SCALE_TIME;
    power = Dice.roll("1d4+1");
  }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  tgt.addSpellEffect(levobj, Math.max(0,free-1) );

  PlayCastSound(caster,"sfx_buff");
  ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
    
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let success = 0;
  let castermap = caster.getHomeMap();
  let casterx = caster.getx();
  let castery = caster.gety();

  let noblink = 0;
  let failtext = "The spell fizzles.";
  // Places where you cannot Blink
  if (castermap.getName() === "uttermostdark") {
    noblink = 1;
    failtext = "The darkness encircles you and you feel a sense of vertigo. But when your vision clears, you have not moved.";
  }

  if (!noblink) {
    let castermove = caster.getMovetype();
    let possdest = [];
    for (let i=-4;i<=4;i++) {
      for (let j=-4;j<=4;j++) {
        if ((i==casterx) && (j==castery)) { continue; }
        let loc = {};
        loc.x = casterx+i;
        loc.y = castery+j;
        possdest.push(loc);
      }
    }
    ShuffleArray(possdest);
    while (!success && possdest[0]) {
      let tile = castermap.getTile(possdest[0].x,possdest[0].y);
      if ((tile !== "OoB") && (tile.canMoveHere(castermove, 1).canmove)) {
        let path = castermap.getPath(casterx,castery,possdest[0].x,possdest[0].y,MOVE_WALK);
        if (path.length) {
          success = PerformBlink(caster,possdest[0].x,possdest[0].y);
        }
      }
      if (!success) { possdest.shift(); }
    }
  }

  if (!success) { 
    maintext.addText(failtext);
    PlayCastSound(caster, "sfx_spell_fail");
  } else {
    PlayCastSound(caster, "sfx_teleport");
    ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  }
  // be sure to test this in a location with no valid destinations
  return resp;  
}

function PerformBlink(caster,destx, desty) {
  let retval = {};
  let map = caster.getHomeMap();
  let exittile = map.getTile(caster.getx(),caster.gety());
  let walkoffval = exittile.executeWalkoffs(caster);
  if (walkoffval.msg) {
    retval["msg"] += walkoffval.msg;
  }
  map.moveThing(destx,desty,caster);

  let tile = map.getTile(destx,desty);
  let walkonval = tile.executeWalkons(caster);
//  console.log(walkonval);
  if (walkonval.msg) {
    if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
    retval["msg"] += walkonval.msg;
  }
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  maintext.addText(retval["msg"]);
  if ((caster.getx() === destx) && (caster.gety() === desty)) {
    return 1;
  } else {
    return 0;
  }
}

// Heal
magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID].getLongDesc = function() {
  return "Heals you for " + Dice.rollmin(PC.getLevel() + "d8+" + PC.getIntForPower()) + "-" + Dice.rollmax(PC.getLevel() + "d8+" + PC.getIntForPower()) + ".";
}
magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID].getInfusedDesc = function() {
  let minheal = Dice.rollmin(PC.getLevel() + "d8+" + PC.getIntForPower());
  minheal = Math.floor(1.5 * minheal);
  let maxheal = Dice.rollmax(PC.getLevel() + "d8+" + PC.getIntForPower());
  maxheal = Math.floor(1.5 * maxheal);
  return "Heals " + minheal + "-" + maxheal + "HP instead.";
}

magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Heal.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let plus = PC.getIntForPower();
  let healamt = Dice.roll(caster.getLevel() + "d8+" + plus);
  if (free) { healamt = Dice.roll("4d8+10"); }
  DebugWrite("magic", "Healing " + healamt + " hp.<br />");
  if (infused) { healamt = healamt * 1.5; }
  
  if (!tgt || (caster === PC)) {
    tgt = caster;
  }
  
  ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
  tgt.healMe(healamt, caster);
  if (free !== 2) {
    resp["txt"] = "You feel better!";
  }
  PlayCastSound(caster,"sfx_heal");
  return resp;
}

// Iceball
magic[SPELL_ICEBALL_LEVEL][SPELL_ICEBALL_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " ice damage to a single target, half if resisted. The target is slowed.";
}
magic[SPELL_ICEBALL_LEVEL][SPELL_ICEBALL_ID].getInfusedDesc = function() {
  let mindmg = Dice.rollmin(DMG_MEDIUM);
  mindmg = Math.floor(1.5 * mindmg);
  let maxdmg = Dice.rollmax(DMG_MEDIUM);
  maxdmg = Math.floor(1.5 * maxdmg);
  return "Deals " + mindmg + "-" + maxdmg + " ice damage instead.";
}

magic[SPELL_ICEBALL_LEVEL][SPELL_ICEBALL_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Iceball.<br />");
  if (caster !== PC) {
    let resp = PerformIceball(caster, infused, free, tgt);
    return resp;
  }

  let resp = {};
  
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  CreateTargetCursor({sticky: 1, command:'c',spellName:'Iceball',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});      
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}

function PerformIceball(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_ICEBALL_LEVEL][SPELL_ICEBALL_ID].getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let dmg = 0;  // real damage rolled after real target determined
  let desc = "";
  let multitargets = [];
  multitargets[0] = {};
  multitargets[0].atk = caster;
  multitargets[0].def = tgt;
  multitargets[0].dmg = dmg;
  multitargets[0].retval = { txt:"" };
  multitargets[0].fromcoords = GetCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  multitargets[0].tocoords = GetCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  multitargets[0].destgraphic = {graphic:"static.gif", xoffset:BLUE_SPLAT_X, yoffset:BLUE_SPLAT_Y, overlay:"spacer.gif"};

  let boltgraphic = {};
  boltgraphic.graphic = "ice.gif";
  boltgraphic.xoffset = 0;
  boltgraphic.yoffset = 0;
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);

  multitargets[0].ammographic = boltgraphic;

  multitargets[0].sounds = {end: "sfx_default_hit"};
  let duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  multitargets[0].duration = duration;
  let weapon = localFactory.createTile("SpellWeapon");
  weapon.dmgtype = "ice";
  multitargets[0].weapon = weapon;
  multitargets[0].type = "missile";
  multitargets[0].ammoreturn = 0;
  multitargets[0].endturn = 1;
  multitargets[0].dmgtype = "ice";

  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    // new target!
    let newobj = {};
    newobj.atk = tgt;
    newobj.def = newtgt;
    newobj.dmg = dmg;
    newobj.retval = { txt: ""};
    newobj.fromcoords = GetCoords(newobj.atk.getHomeMap(),newobj.atk.getx(),newobj.atk.gety());
    newobj.tocoords = GetCoords(newobj.def.getHomeMap(),newobj.def.getx(),newobj.def.gety());
    newobj.destgraphic = {graphic:"static.gif", xoffset:BLUE_SPLAT_X, yoffset:BLUE_SPLAT_Y, overlay:"spacer.gif"};

    multitargets[multitargets.length-1].destgraphic = {graphic:"static.gif", xoffset:MIRROR_SPLAT_X, yoffset:MIRROR_SPLAT_Y, overlay:"spacer.gif"};

    let bg = {};
    bg.graphic = "ice.gif";
    bg.xoffset = 0;
    bg.yoffset = 0;
    bg.directionalammo = 1;
    bg = GetEffectGraphic(tgt, newtgt, bg);
    newobj.ammographic = bg;

    multitargets[multitargets.length-1].sounds = {end: "sfx_mirror_ward"}
    newobj.sounds = {end: "sfx_default_hit"};
    newobj.duration = (Math.pow( Math.pow(newtgt.getx() - tgt.getx(), 2) + Math.pow (newtgt.gety() - tgt.gety(), 2)  , .5)) * 100;
    let wpn = localFactory.createTile("SpellWeapon");
    wpn.dmgtype = "ice";
    newobj.weapon = wpn;
    newobj.type = "missile";
    newobj.ammoreturn = 0;
    newobj.endturn = 1;
    newobj.dmgtype = "ice";
    newobj.myturn = caster;

    multitargets.push(newobj);
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  tgt.setHitBySpell(caster,SPELL_ICEBALL_LEVEL);
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }

  let tmpdmg = prepareSpellDamage(caster,tgt,DMG_MEDIUM,"ice");
  dmg = tmpdmg.dmg;
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = tgt.getDesc();
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  
  let frozen = localFactory.createTile("Slow");
  let dur = caster.getIntForPower()/3;
  if (free) { dur = Dice.roll("1d2+3"); }
  let endtime = dur*SCALE_TIME + DU.DUTime.getGameClock();
  frozen.setExpiresTime(endtime);
  tgt.addSpellEffect(frozen);
  
  let descval = {txt: desc};

  multitargets[multitargets.length-1].dmg = dmg;
  multitargets[multitargets.length-1].retval = descval;

  PlayCastSound(caster,"sfx_iceball");

  let nowtarget = multitargets.shift();
  nowtarget.doagain = multitargets;

  if (tgt.frozenintime) {
    descval = {txt: "You cast Iceball. It streaks forth from your hand, but before it reaches its target, it slows, and stops, and hangs in the air."};
    nowtarget.retval = descval;
    nowtarget.frdesc = "Iceball";
//    AnimateToFrozen({atk:caster, def:tgt, fromcoords:fromcoords, tocoords:tocoords, ammographic:boltgraphic, destgraphic:destgraphic, sounds:sounds, type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"force", weapon:weapon, frdesc: "Iceball",doagain:[]});
    AnimateToFrozen(nowtarget);
  } else {
//    AnimateEffect({atk:caster, def:tgt, fromcoords:fromcoords, tocoords:tocoords, ammographic:boltgraphic, destgraphic:destgraphic, sounds:sounds, type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"ice", weapon:weapon, doagain:[]});
    AnimateEffect(nowtarget);
  }
  
  resp["fin"] = -1;
  return resp;
}

//Life Drain
magic[SPELL_LIFE_DRAIN_LEVEL][SPELL_LIFE_DRAIN_ID].getLongDesc = function() {
  return "Deals a single target " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " and heals you for " + Dice.rollmin("2d8+10") + "-" + Dice.rollmax("2d8+10") + ".";
}
magic[SPELL_LIFE_DRAIN_LEVEL][SPELL_LIFE_DRAIN_ID].getInfusedDesc = function() {
  let mindmg = Dice.rollmin(DMG_MEDIUM);
  mindmg = Math.floor(1.5 * mindmg);
  let maxdmg = Dice.rollmax(DMG_MEDIUM);
  maxdmg = Math.floor(1.5 * maxdmg);
  let minheal = Dice.rollmin("2d8+10");
  minheal = Math.floor(1.5 * minheal);
  let maxheal = Dice.rollmax("2d8+10");
  maxheal = Math.floor(1.5 * maxheal);
  return "Deals " + mindmg + "-" + maxdmg + " damage and heals for " + minheal + "-" + maxheal + "HP instead.";
}

magic[SPELL_LIFE_DRAIN_LEVEL][SPELL_LIFE_DRAIN_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Life Drain.<br />");
  if (caster !== PC) {
    let resp = PerformLifeDrain(caster, infused, free, tgt);
    return resp;
  }

  let resp = {};

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  CreateTargetCursor({sticky: 1, command:'c',spellName:'Life Drain',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});        
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  if (tgt.frozenintime) {
    resp["txt"] = "You cast the spell, but nothing seems to happen.";
    return resp;
  }

  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    ShowEffect(tgt, 1000, "static.gif", MIRROR_SPLAT_X,MIRROR_SPLAT_Y);
    PlayCastSound(tgt, "sfx_mirror_ward");
    
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }

  tgt = newtgt;
  tgt.setHitBySpell(caster,SPELL_LIFE_DRAIN_LEVEL);
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }

  if (IsNonLiving(tgt)) {
    resp["txt"] = "That has no life to drain.";
    return resp;
  }

  let tmpdmg = prepareSpellDamage(caster,tgt,DMG_MEDIUM);
  let dmg = tmpdmg.dmg;
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
  //tgt.dealDamage(dmg, caster, "drain");
  DealandDisplayDamage(tgt, caster, dmg, "drain");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    
  ShowEffect(tgt, 1700, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
  PlayCastSound(caster, "sfx_mind");

  DebugWrite("magic", "Healing " + healamt + " hp.<br />");
  
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
  caster.healMe(healamt, caster);
  resp["txt"] = "You feel better!";

//  resp["fin"] = -1;
  return resp;
}

//Smite
magic[SPELL_SMITE_LEVEL][SPELL_SMITE_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " magic damage to three random nearby enemies.";
}
magic[SPELL_SMITE_LEVEL][SPELL_SMITE_ID].getInfusedDesc = function() {
  let mindmg = Dice.rollmin(DMG_MEDIUM);
  mindmg = Math.floor(1.5*mindmg);
  let maxdmg = Dice.rollmax(DMG_MEDIUM);
  maxdmg = Math.floor(1.5*maxdmg);
  return "Deals " + mindmg + "-" + maxdmg + " damage instead.";
}

magic[SPELL_SMITE_LEVEL][SPELL_SMITE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Smite.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
 
  let radius = 3;
  if (infused) { radius = 4; }
  let foes = GetAllWithin("npcs",radius,caster.getHomeMap(),{x: caster.getx(), y: caster.gety()},"loe");
  foes = ShuffleArray(foes);
  
  if (!foes[0]) {
    resp["txt"] = "No enemies nearby.";
    PlayCastSound(caster);
    return resp;
  }
  PlayCastSound(caster,"sfx_default_hit");
  for (let i=0; i<=2; i++) {
    if (foes[i] && !foes[i].frozenintime) {
      foes[i].setHitBySpell(caster,SPELL_SMITE_LEVEL);
      let tmpdmg = prepareSpellDamage(caster,foes[i],DMG_MEDIUM,"force");
      let dmg = tmpdmg.dmg;
      if (infused) { dmg = dmg * 1.5; }
      if (CheckResist(caster,foes[i],infused,0)) {
        dmg = Math.floor(dmg/2)+1;
      }
      //foes[i].dealDamage(dmg,caster,"force");
      DealandDisplayDamage(foes[i],caster,dmg,"force");
      DebugWrite("magic", "Dealing " + dmg + " damage to target " + foes[i].getName() + " " + foes[i].getSerial() + ".<br />");
      
      setTimeout(function() { ShowEffect(foes[i], 700, "static.gif", RED_SPLAT_X, RED_SPLAT_Y); }, 1000);
    }
  }
  return resp;  
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
  let resp = {fin:1};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  let prot = localFactory.createTile("Telepathy");
  let duration = caster.getIntForPower() * 2 * SCALE_TIME;
  if (free) { duration = Dice.roll("1d6 + 12") * 2 * SCALE_TIME; }
  if (infused) { 
    duration = duration * 2; 
  }
  let endtime = duration + DUTime.getGameClock();
  DebugWrite("magic", "End time is " + endtime + ".<br />");
  prot.setExpiresTime(endtime);
  caster.addSpellEffect(prot, Math.max(0, free-1) );
  PlayCastSound(caster,"sfx_buff");

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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let levobj = localFactory.createTile("Levitate");
  
  let dur = caster.getIntForPower()+5;
  if (free) { dur = Dice.roll("1d10+35"); }
  if (infused) { dur = dur * 3; }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  levobj.setPower(dur);
  levobj.setExpiresTime(endtime);
  
  PlayCastSound(caster,"sfx_buff");
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
  trap.duration = caster.getIntForPower() * SCALE_TIME;
  trap.power = caster.getIntForPower();
  trap.infused = infused;
  if (infused) { trap.power = trap.power + 4; }

  caster.getHomeMap().placeThing(caster.getx(), caster.gety(), trap);
  PlayCastSound(caster,"sfx_ding");

  resp = {fin:1, input: "&gt;", txt: "A crystal trap is buried under your feet."};

  return resp;

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
    CastSpellMana(caster,mana);
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
    
  PlayCastSound(caster,"sfx_buff");
  DrawCharFrame();
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let mwobj = localFactory.createTile("MirrorWard");
  
  let dur = caster.getIntForPower();
  if (free) { dur = Dice.roll("1d10+35"); }
  if (infused) { dur = dur * 3; }
  let endtime = (dur * SCALE_TIME) + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  mwobj.setPower(dur);
  mwobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(mwobj, Math.max(0, free-1) );
  PlayCastSound(caster,"sfx_buff");
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

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  CreateTargetCursor({sticky: 1, command:'c',spellName:'Paralyze',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});      
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  if (tgt.frozenintime) {
    resp["txt"] = "You cast the spell, but nothing seems to happen.";
    return resp;
  }

  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    ShowEffect(tgt, 1000, "static.gif", MIRROR_SPLAT_X,MIRROR_SPLAT_Y);
    PlayCastSound(tgt, "sfx_mirror_ward");
    
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  tgt.setHitBySpell(caster,SPELL_PARALYZE_LEVEL);
  if (!CheckResist(caster,tgt,infused,0)) {
    let vulobj = localFactory.createTile("Paralyze");
  
    let dur = caster.getIntForPower()/2;
    if (infused) { dur = dur * 1.5;}
    if (free) { dur = Dice.roll("1d4+5"); }
    ShowEffect(tgt, 1700, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
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
    PlayCastSound(caster,"sfx_debuff");
  }
  else {
    desc = tgt.getDesc() + " resists!";
    if (tgt === PC) {
      desc = "You resist.";
      // no X over the PC
    } else {
      ShowEffect(val, 700, "X.gif");
    }
    PlayCastSound(caster);
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
  let resp = {fin:4};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  PlayCastSound(caster);
  let castermap = caster.getHomeMap();
  let eachwayx = Math.floor(VIEWSIZEX/2)*4+1;
  let eachwayy = Math.floor(VIEWSIZEY/2)*4+1;
  let leftx = caster.getx()-eachwayx;
  let rightx = caster.getx()+eachwayx;
  let topy = caster.gety()-eachwayy;
  let bottomy = caster.gety()+eachwayy;
  let peerhtml = "<table id='mainview' cellpadding='0' cellspacing='0' border='0' style=\"position:relative; z-index:20; top:5px\">";
  for (let j=topy;j<=bottomy;j++) {
    peerhtml += "<tr><td style='background-color:black; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>";
    for (let i=leftx;i<=rightx;i++) {
      if ((caster.getx() === i) && (caster.gety() === j)) {
        // PC
        peerhtml += "<td style='background-color:cyan; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>";
      } else {
        let tile = castermap.getTile(i,j);
        if (tile === "OoB") { 
          if (caster.getHomeMap().getScale()) {
            peerhtml += "<td style='background-color:black; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>"; 
          } else {
            peerhtml += "<td style='background-color:#0000e0; width:8px; height:8px'><img src='graphics/spacer.gif' width='8' height='8' /></td>"; 
          }
        }
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
  document.getElementById('uiinterface').style.backgroundColor = "black";  
  gamestate.setMode("anykey");
  targetCursor.command = "c";
  targetCursor.spellName = "Peer";
  if (free !== 2) {
    resp["txt"] = "You receive a bird's eye view.";
  }
  resp["input"] = "&gt;[MORE]";
  return resp;
}

// Shockwave
magic[SPELL_SHOCKWAVE_LEVEL][SPELL_SHOCKWAVE_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " to all adjacent enemies and pushes them. Half damage and unmoved if resisted.";
}
magic[SPELL_SHOCKWAVE_LEVEL][SPELL_SHOCKWAVE_ID].getInfusedDesc = function() {
  let mindmg = Dice.rollmin(DMG_MEDIUM);
  mindmg = Math.floor(1.5 * mindmg);
  let maxdmg = Dice.rollmin(DMG_MEDIUM);
  maxdmg = Math.floor(1.5 * maxdmg);
  return "Deals " + mindmg + "-" + maxdmg + " damage instead, and the damage is more difficult to resist.";
}

magic[SPELL_SHOCKWAVE_LEVEL][SPELL_SHOCKWAVE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Shockwave.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  PlayCastSound(caster,"sfx_thunder");
  let spellmap = caster.getHomeMap();
  for (let xdiff=-1; xdiff<=1; xdiff++) {
    for (let ydiff=-1;ydiff<=1; ydiff++) {
      if ((xdiff === 0) && (ydiff === 0)) { continue; }
      let tile = spellmap.getTile(caster.getx()+xdiff, caster.gety()+ydiff);
      let badguy = tile.getTopNPC();
      if (badguy && !badguy.frozenintime) {
        badguy.setHitBySpell(caster,SPELL_SHOCKWAVE_LEVEL);
        let tmpdmg = prepareSpellDamage(caster,badguy,DMG_MEDIUM,"force");
        let dmg = tmpdmg;
        if (infused) { dmg = dmg * 1.5; }
        let resist = 0;
        if (CheckResist(caster,badguy,infused,0)) {
          resist = 1;
          dmg = dmg*.5;
        }

        if (!resist) {
          badguy.moveMe(xdiff,ydiff,1);
        }
        //badguy.dealDamage(dmg,caster,"force");
        DealandDisplayDamage(badguy,caster,dmg,"force");
        ShowEffect(badguy, 700, "static.gif", -RED_SPLAT_X, RED_SPLAT_Y);
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

  CreateTargetCursor({sticky: 0, command:'c',spellName:'Summon Ally',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "open"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 3});        
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  PlayCastSound(caster,"sfx_summon");
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
  let duration = caster.getIntForPower() * SCALE_TIME;
  if (free) { duration = Dice.roll("1d6+12"); }
  if (infused) {
    ally.setStr(ally.getStr()+5);
    ally.setStr(ally.getDex()+5);
    ally.setStr(ally.getInt()+5);
    ally.setMaxHP(ally.getMaxHP()+15);
    ally.setLevel(ally.getLevel()+1);
    duration = duration* 1.5; 
  }
  ally.spawnedBy = caster;
  ally.summoned = 1;
  if ((caster === PC) || (caster.getAttitude() === "friendly")) {
    ally.setAttitude("friendly");
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
  ShowEffect(ally, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
  
  resp["txt"] = "You conjure an elemental to aid you in battle.";
  resp["input"] = "&gt;";
  return resp;
}

// Swordstrike
magic[SPELL_SWORDSTRIKE_LEVEL][SPELL_SWORDSTRIKE_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_HEAVY) + "-" + Dice.rollmax(DMG_HEAVY) + " physical damage to a single target, and " + Dice.rollmin(DMG_LIGHT) + "-" + Dice.rollmax(DMG_LIGHT) + " damage to each neighboring enemy. Half damage if resisted.";
}
magic[SPELL_SWORDSTRIKE_LEVEL][SPELL_SWORDSTRIKE_ID].getInfusedDesc = function() {
  let mindmg = Math.floor(1.5 * Dice.rollmin(DMG_HEAVY));
  let maxdmg = Math.floor(1.5 * Dice.rollmax(DMG_HEAVY));
  return "Deals " + mindmg + "-" + maxdmg + " damage instead.";
}

magic[SPELL_SWORDSTRIKE_LEVEL][SPELL_SWORDSTRIKE_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Swordstrike.<br />");
  if (caster !== PC) {
    let resp = PerformSwordstrike(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  CreateTargetCursor({sticky: 1, command:'c',spellName:'Swordstrike',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});      
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  if (tgt.frozenintime) {
    resp["txt"] = "You cast the spell, but nothing seems to happen.";
    return resp;
  }

  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    ShowEffect(tgt, 1000, "static.gif", MIRROR_SPLAT_X,MIRROR_SPLAT_Y);
    PlayCastSound(tgt, "sfx_mirror_ward");
    
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  let hostile = 0;
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(castmap);
    hostile = 1;
  }

  let tmpdmg = prepareSpellDamage(caster,tgt,DMG_HEAVY,"physical");
  let dmg = tmpdmg.dmg;
  if (infused) {
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,0)) {
    dmg = Math.floor(dmg/2)+1;
  }
  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  ShowEffect(tgt, 700, "static.gif", RED_SPLAT_X, RED_SPLAT_Y);
  PlayCastSound(caster,"sfx_default_hit");
  //tgt.dealDamage(dmg,caster,"physical");
  DealandDisplayDamage(tgt,caster,dmg,"physical");
  
  for (let diffx = -1; diffx <=1; diffx++) {
    for (let diffy = -1; diffy <=1; diffy++) {
      if ((diffx === 0) && (diffy === 0)) { continue; }
      if ((tgt.getx()+diffx === PC.getx()) && (tgt.gety()+diffy === PC.gety())) {
        let tmpdmg = prepareSpellDamage(caster,PC,DMG_LIGHT,"physical");
        dmg = tmpdmg.dmg;
        if (CheckResist(caster,PC,infused,0)) { dmg = dmg/2 +1; }
        //PC.dealDamage(dmg,caster,"physical");
        DealandDisplayDamage(PC,caster,dmg,"physical");
        ShowEffect(PC, 700, "static.gif", RED_SPLAT_X, RED_SPLAT_Y);
        continue;
      }
      let tile = castmap.getTile(tgt.getx()+diffx,tgt.gety()+diffy);
      let badguy = tile.getTopNPC();
      if (badguy) {
        let tmpdmg = prepareSpellDamage(caster,badguy,DMG_LIGHT,"physical");
        dmg = tmpdmg.dmg;
        if (CheckResist(caster,badguy,infused,0)) { dmg = dmg/2+1; }
        //badguy.dealDamage(dmg,caster,"physical");
        DealandDisplayDamage(badguy,caster,dmg,"physical");
        badguy.setHitBySpell(caster,SPELL_SWORDSTRIKE_LEVEL);
        ShowEffect(badguy, 700, "static.gif", RED_SPLAT_X, RED_SPLAT_Y);
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
magic[SPELL_EMPOWER_LEVEL][SPELL_EMPOWER_ID].getLongDesc = function() {
  return "Create a magic item. Requires the appropriate reagents, and must be cast on a pentagram.";
}

magic[SPELL_EMPOWER_LEVEL][SPELL_EMPOWER_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Empower.<br />");

  let resp = {fin:1};

  if (caster !== PC) {
    resp = PerformEmpower(caster, infused, free, tgt);   // not that AIs will ever cast Empower
    return resp;
  }

  if (!IsOnPentagram(caster)) {
    resp.txt = "This spell must be cast while standing in a circle of power.";
    resp.input = "&gt;";
    resp.fin = 2;
    return retval;
  }

  if (!PC.checkInventory("Mortar") && !PC.checkInventory("CrystalMortar")) { 
    resp["fin"] = 2;
    resp["txt"] = "You have no mortar to grind the reagents in.";
    return resp;
  }

//  CreateTargetCursor({sticky: 0, command:'c',spellName:'Empower',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "feature"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 1});
  targetCursor.manacost = this.getManaCost();
  resp["txt"] = "";
  resp["input"] = "&gt; Choose object to be Empowered- ";
  resp["fin"] = 4;  // was 0
//  gamestate.setMode("target");
  gamestate.setMode("zstats");
  targetCursor.page = 2;
  targetCursor.spellName = "Empower";
  targetCursor.command = 'c';

  DisplayInventory();

  return resp;

}

function PerformEmpower(caster, infused, free, tgt) {
  let retval = { fin: 2, usefin: 1, initdelay: 0};
  if (!tgt.enchantable) {
    retval.txt = "That object is not able to hold an enchantment.";
    retval.input = "&gt;";
    return retval;
  }
  let mortar = caster.checkInventory("Mortar");
  if ((caster.checkInventory("DragonBone")) && (caster.checkInventory("CrystalMortar"))) {
    mortar = caster.checkInventory("CrystalMortar");
  }
  if (!mortar) {
    retval.txt = "You have no suitable mortar to treat the reagents in.";
    retval.input ="&gt;";
    return retval;
  }
  let mademenu = MakeInventoryList("reagent");
  if (!mademenu.length) { 
    retval.txt = "You have no reagents to mix for this spell.";
    retval.input = "&gt;";
    return retval;
  }
//  if ((tgt.getName() === "PerfectRuby") && (mortar.getName() === "Mortar")) {
//    retval.txt = "The enchantment you seek to place on the ruby is too powerful to be cast with that mortar. You must find something that will survive the casting.";
//    retval.input = "&gt;"
//    return retval;
//  }
  gamestate.setMode("empower");
  targetCursor.invx = 0; 
  targetCursor.invy = 0; 
  targetCursor.tgt = tgt;
  targetCursor.mortar = {};
  ShowEmpowerReagentChoice(caster);

  retval["txt"] = "";
  retval["input"] = "&gt; Include which reagents: ";
//  retval["fin"] = 3;	
  retval["fin"] = 1;

  return retval;
}

function ShowEmpowerReagentChoice(caster) {
  document.getElementById('uiinterface').innerHTML = "";
  document.getElementById('uiinterface').style.backgroundColor = "black";
  document.getElementById('uiinterface').innerHTML += "<div style='position: absolute; left: 100px; top:15px; color: white; font-size: 16pt; font-family: Commodore64'>Available reagents:</div>";
  for (let i=0;i<5;i++) {
    for (let j=0;j<2;j++) {
      let leftedge = 100+45*i;
      let topedge = 40+45*j;
      let qleftedge = leftedge + 18;
      let qtopedge = topedge + 36;
      document.getElementById('uiinterface').innerHTML += "<div id='invquant_"+i+"x"+j+"' style='position:absolute; left: " + qleftedge + "; top: " + qtopedge + "; width:12px; height: 10px; border:2px; border-style: solid; border-color:#999; visibility:hidden'></div>";
      document.getElementById('uiinterface').innerHTML += "<div id='inv_"+i+"x"+j+"' style='position:absolute; left: " + leftedge + "; top: " + topedge + "; width:32px; height: 32; border:3px; border-style: solid; border-color:#999;'></div>";
    }
  }
  document.getElementById('uiinterface').innerHTML += "<div id='inv_desc_window' style='position:absolute; left: 35px; top: 310px; border: 3px; border-style: solid; border-color:#ccc; width:340px; height: 100px'></div>";
  document.getElementById('inv_desc_window').innerHTML = "<table cellpadding='4' cellspacing='4' border='0' style='margin-top:5px'><tr><td rowspan='2' style='text-align:center; width: 100px'><div id='inv_image' style='position:absolute; top: 6px; left: 34px; width: 32px; height:32px'></div><p id='inv_name' class='charcreate' style='position:absolute; top:42px; width:100px; text-align:center'></p></td><td><p class='charcreate' id='inv_desc' style='top:20px'></p></td></tr><td><p class='charcreate' id='inv_use' style='color:yellow'></p></td></tr></table>";

  let mortar = caster.checkInventory("Mortar");
  if ((caster.checkInventory("DragonBone")) && (caster.checkInventory("CrystalMortar"))) {
    mortar = caster.checkInventory("CrystalMortar");
  }
  let showgraphic = mortar.getGraphicArray();
  document.getElementById('uiinterface').innerHTML += "<div style='position:absolute; left: 40px; top: 200px; width: 32px; height: 32px; background-image: url(\"graphics/" + showgraphic[0] + "\"); background-position: " +showgraphic[2] + "px " + showgraphic[3] + "px;' ></div>";
  document.getElementById('uiinterface').innerHTML += "<div style='position: absolute; left: 100px; top:170px; color: white; font-size: 16pt; font-family: Commodore64'>Reagents in mortar:</div>";

  for (let i=0;i<5;i++) {
    let leftedge = 100+45*i;
    let topedge = 200;
    document.getElementById('uiinterface').innerHTML += "<div id='inv_"+i+"x2' style='position:absolute; left: " + leftedge + "; top: " + topedge + "; width:32px; height: 32; border:3px; border-style: solid; border-color:#999;'></div>";
  }

  if (targetCursor.invy === 3) {
    document.getElementById('uiinterface').innerHTML += "<div id='inv_1x3' style='position: absolute; left: 150px; top:270px; color: black; background-color:white; font-size: 16pt; font-family: Commodore64'>Begin grinding</div>";
  } else {
    document.getElementById('uiinterface').innerHTML += "<div id='inv_1x3' style='position: absolute; left: 150px; top:270px; color: white; font-size: 16pt; font-family: Commodore64'>Begin grinding</div>";
    document.getElementById('inv_' + targetCursor.invx + 'x' + targetCursor.invy).style.borderColor = "#ffffff";
  }

  let reagents = MakeInventoryList("reagent");
  let ridx = 0;
  let midx = 0;
  for (let i=0;i<reagents.length;i++) {
    let regname = reagents[i].getName();
    let showgraphic = reagents[i].getGraphicArray();
    if (targetCursor.mortar[regname]) {
      let invdiv = document.getElementById('inv_'+midx+"x2");
      let innerdiv = document.createElement("div");
      innerdiv.id = "divid_" + reagents[i].getSerial();
      innerdiv.style.width = "32px";
      innerdiv.style.height = "32px";
      innerdiv.style.backgroundImage = "url('graphics/" + showgraphic[0] + "')";
      innerdiv.style.backgroundRepeat = "no-repeat";
      innerdiv.style.backgroundPosition = showgraphic[2] + "px " + showgraphic[3] + "px";
      innerdiv.style.position = "fixed";
      invdiv.appendChild(innerdiv);

      if ((targetCursor.invx === midx) && (targetCursor.invy === 2)) {
        document.getElementById('inv_image').style.backgroundImage = "url('graphics/" + showgraphic[0] + "')";
        document.getElementById('inv_image').style.backgroundRepeat = "no-repeat";
        document.getElementById('inv_image').style.backgroundPosition = showgraphic[2] + "px " + showgraphic[3] + "px";
        let descname = reagents[i].getDesc();
        descname = descname.charAt(0).toUpperCase() + descname.slice(1);
        document.getElementById('inv_name').innerHTML = descname;
        document.getElementById('inv_use').innerHTML = "Press Enter to remove from the mortar.";
      }
      midx++;
    } else {
      let writetox = ridx % 5;
      let writetoy = 0;
      if (ridx >= 5) { writetoy = 1; }
      let invdiv = document.getElementById('inv_'+writetox+"x"+writetoy);
      let innerdiv = document.createElement("div");
      innerdiv.id = "divid_" + reagents[i].getSerial();
      innerdiv.style.width = "32px";
      innerdiv.style.height = "32px";
      innerdiv.style.backgroundImage = "url('graphics/" + showgraphic[0] + "')";
      innerdiv.style.backgroundRepeat = "no-repeat";
      innerdiv.style.backgroundPosition = showgraphic[2] + "px " + showgraphic[3] + "px";
      innerdiv.style.position = "fixed";
      invdiv.appendChild(innerdiv);

      if (reagents[i].getQuantity() && (reagents[i].getQuantity() > 1)) {
        let quant = document.getElementById('invquant_'+writetox+"x"+writetoy);
        quant.style.fontSize = 12;
        quant.style.color = "white";
        quant.style.fontFamily = "Commodore64";
        quant.style.textAlign = "right";
        quant.style.visibility = "visible";
  
        quant.innerHTML = "<span style='position:relative;top:-2px'>" + inventorylist[i].getQuantity() + "</span>";
      }

      if ((targetCursor.invx === writetox) && (targetCursor.invy === writetoy)) {
        document.getElementById('inv_image').style.backgroundImage = "url('graphics/" + showgraphic[0] + "')";
        document.getElementById('inv_image').style.backgroundRepeat = "no-repeat";
        document.getElementById('inv_image').style.backgroundPosition = showgraphic[2] + "px " + showgraphic[3] + "px";
        let descname = reagents[i].getDesc();
        descname = descname.charAt(0).toUpperCase() + descname.slice(1);
        document.getElementById('inv_name').innerHTML = descname;
        document.getElementById('inv_use').innerHTML = "Press Enter to add to the mortar.";
      }
      ridx++;
    }
  }
  document.getElementById('inv_'+targetCursor.invx+"x"+targetCursor.invy).style.borderColor = "#ffffff";

}

function EmpowerReagentCommands(cmd) {
  let retval = {};
  if (cmd === 27) { // ESC
    retval["fin"] = -1;
    return retval;
  } else if (cmd === 38) { // Up
    retval["fin"] = 0;
    if (targetCursor.invy === 0) { return retval; }
    if (targetCursor.invy === 3) { 
      targetCursor.invx = targetCursor.invx_old;
      delete targetCursor.invx_old;
    }
    targetCursor.invy--;
    return retval;
  } else if (cmd === 37) { // Left
    retval["fin"] = 0;
    if (targetCursor.invy === 3) {
      return retval;
    }
    if (targetCursor.invx > 0) { targetCursor.invx--; }
    return retval;
  } else if (cmd === 39) { // Right
    retval["fin"] = 0;
    if (targetCursor.invy === 3) {
      return retval;
    }
    if (targetCursor.invx < 4) { targetCursor.invx++; }
    return retval;
  } else if (cmd === 40) { // Down
    retval["fin"] = 0;
    if (targetCursor.invy === 3) {
      return retval;
    }
    if (targetCursor.invy === 2) {
      targetCursor.invx_old = targetCursor.invx;
      targetCursor.invx = 1;
    }
    targetCursor.invy++;
    return retval;
  } else if ((cmd === 13) || (cmd === 32)) {  // space or enter
    retval["fin"] = 0;
    let reglist=[];
    let mortlist=[];
    let reagents = MakeInventoryList("reagent");
    for (let i=0;i<reagents.length;i++) {
      if (targetCursor.mortar[reagents[i].getName()]) {
        mortlist.push(reagents[i].getName());
      } else { reglist.push(reagents[i].getName()); }
    }
    if ((targetCursor.invy === 0) || (targetCursor.invy === 1)) {
      let idx = targetCursor.invx + 5*targetCursor.invy;
      targetCursor.mortar[reglist[idx]] = 1;
      return retval;
    } else if (targetCursor.invy===2) {
      targetCursor.mortar[mortlist[targetCursor.invx]] = 0;
      return retval;
    } else {
      // Do magic!
      let tgt = targetCursor.tgt;
      let tobeenchanted = tgt.getDesc();
      let mortar = PC.checkInventory("Mortar");
      if ((PC.checkInventory("DragonBone")) && (PC.checkInventory("CrystalMortar"))) {
        mortar = PC.checkInventory("CrystalMortar");
      }
      let mortardesc = mortar.getDesc();
      let starttext = `You place the ${tobeenchanted} in front of you, in the center of the pentagram, and carefully place the chosen reagents in the ${mortardesc}. `;
      let failuretext = [`As you begin the incantation and feel the power gather, your heightened mystical senses perceive that this combination of reagents, and this object to be empowered, will not generate a useful enchantment.`];
      failuretext.push(`You cease casting the spell before you begin mixing the reagents together. You will need to consider a different combination of materials.`);
      let successtext = [];
      if (tgt.getName() === "PerfectRuby") {
        if (targetCursor.mortar["MandrakeRoot"] && targetCursor.mortar["Mistletoe"] && targetCursor.mortar["SpiderSilk"] && targetCursor.mortar["SulfurousAsh"] && targetCursor.mortar["FrozenSunlight"]) {
          if (mortar.getName() !== "CrystalMortar") {
            retval["fin"] = 2;
            retval["outcome"] = ["You place the reagents in the mortar and begin the incancation, but quickly realize something is wrong.","This mortar will shatter under the strain of this enchantment. You will need to find something more enduring before you can perform this ritual.","You remove the reagents from the mortar and put them away."];
            return retval;
          }   
          successtext.push(`You place the ruby in front of you, in the center of the pentagram, and begin the incantation.`);
          successtext.push(`You crush the mandrake and mistletoe together, in the mortar of crystal. Then, you add the spider silk and the sulfurous ash to the mix. Finally, you carefully add the frozen sunlight and tentatively apply the pestle to it.`);
          successtext.push(`There is a rush of power, as strong as anything you have ever experienced. The world goes white for a moment.`);
          successtext.push(`When your vision returns, the mortar is empty. You pick up the gemstone and hold it before you; it is warm in your hand, and gives off a pleasant light. You can feel the power deep within it.`);
          successtext.push(`<span class='sysconv'>You have obtained: Ruby of the Sun.</span>`);
          successtext.unshift(starttext);
          CastSpellMana(PC,targetCursor.manacost);
          ShowEffect(PC, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
          PlayCastSound(PC,"sfx_enchant");
          PC.removeFromInventory(PC.checkInventory("MandrakeRoot"));
          PC.removeFromInventory(PC.checkInventory("Mistletoe"));
          PC.removeFromInventory(PC.checkInventory("SpiderSilk"));
          PC.removeFromInventory(PC.checkInventory("SulfurousAsh"));
          PC.removeFromInventory(PC.checkInventory("FrozenSunlight"));
          PC.removeFromInventory(PC.checkInventory("PerfectRuby"));
          let ruby = localFactory.createTile("RubyGemoftheSun");
          PC.addToInventory(ruby,1);

          questlog.complete(83);
          questlog.complete(91);
          questlog.activate(92);

          let oldlight = PC.getSpellEffectsByName("Light");
          oldlight.endEffect(1);

          // Having the Ruby means permanent infused Light
          let liobj = localFactory.createTile("Light");
          liobj.setExpiresTime(-1);
          liobj.setPower(4); 
          
          PC.addSpellEffect(liobj, 1);
          
          DrawCharFrame();
        
          retval["fin"] = 2;
          retval["outcome"] = successtext;

          return retval;
        }
      } else if (tgt.getName() === "YewWand") {
        if (targetCursor.mortar["SpiderSilk"] && targetCursor.mortar["LightningWood"]) {
          successtext.push(`You place the wand in the center of the pentagram, and then begin the incantation.`);
          successtext.push(`You crush the lightning wood and spider silk together, and feel the magic build.`);
          successtext.push(`The energy flows into the wand, which shudders and then glows with a new fierceness.`);
          successtext.unshift(starttext);
          CastSpellMana(PC,targetCursor.manacost);
          ShowEffect(PC, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
          PlayCastSound(PC,"sfx_enchant");
          PC.removeFromInventory(PC.checkInventory("SpiderSilk"));
          PC.removeFromInventory(PC.checkInventory("LightningWood"));
          let wasequipped = 0;
          if (PC.getMissile() === tgt) {
            wasequipped = 1;
          }
          PC.removeFromInventory(PC.checkInventory("YewWand"));
          let newwand = localFactory.createTile("Wand");
          PC.addToInventory(newwand,1);
          if (wasequipped) {
            PC.setEquipment("missile",newwand);
          }
          retval["fin"] = 2;
          retval["outcome"] = successtext;
          return retval;
        } 
      } else if (tgt.getName() === "DecorativeArmor") {
        if (targetCursor.mortar["MandrakeRoot"] && targetCursor.mortar["SpiderSilk"] && targetCursor.mortar["BloodMoss"]) {
          successtext.push(`You pile the suit of armor in front of you, on the pentagram, and then begin the incantation.`);
          successtext.push(`You crush the mandrake together with the moss and the spider silk, and feel the magic build.`);
          successtext.push(`The power flows from the mortar in your hands into the armor. You can see it bind to the metal, glowing faintly, strengthening and protecting.`);
          successtext.push(`<span class='sysconv'>You have obtained: Exotic Armor.</span>`);
          successtext.unshift(starttext);
          CastSpellMana(PC,targetCursor.manacost);
          ShowEffect(PC, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
          PlayCastSound(PC,"sfx_enchant");
          PC.removeFromInventory(PC.checkInventory("MandrakeRoot"));
          PC.removeFromInventory(PC.checkInventory("SpiderSilk"));
          PC.removeFromInventory(PC.checkInventory("BloodMoss"));
          PC.removeFromInventory(PC.checkInventory("DecorativeArmor"));
          let armor = localFactory.createTile("ExoticArmor");
          PC.addToInventory(armor,1);
          retval["fin"] = 2;
          retval["outcome"] = successtext;
          return retval;
        }
      } else if (tgt.getName() === "UnenchantedSword") {
        successtext.push(`You carefully place the repaired sword into the center of the pentagram, and begin the incancation.`);
        if (targetCursor.mortar["MandrakeRoot"] && targetCursor.mortar["SpiderSilk"] && targetCursor.mortar["LightningWood"]) {
          successtext.push(`You crush the mandrake together with the spider silk and the lightning blasted wood, and feel the magic build.`);
          successtext.push(`In a bolt, the power strikes the sword, which begins to crackle and shake. Wisps of lightning appear and disappear, chasing each other around the blade.`);
          successtext.push(`<span class='sysconv'>You have obtained: Lightning Sword.</span>`);
          CastSpellMana(PC,targetCursor.manacost);
          ShowEffect(PC, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
          PlayCastSound(PC,"sfx_enchant");
          PC.removeFromInventory(PC.checkInventory("MandrakeRoot"));
          PC.removeFromInventory(PC.checkInventory("SpiderSilk"));
          PC.removeFromInventory(PC.checkInventory("LightningWood"));
          let sword = localFactory.createTile("LightningSword");
          PC.addToInventory(sword,1);
          if (PC.getWeapon() === tgt) { // PC has the Unenchanted Sword equipped
            tgt.unEquipMe();
            sword.equipMe(PC);
          }
          PC.removeFromInventory(tgt);
          retval["fin"] = 2;
          retval["outcome"] = successtext;
          return retval;
        } else if (targetCursor.mortar["MandrakeRoot"] && targetCursor.mortar["SpiderSilk"] && targetCursor.mortar["Nightshade"]) {
          successtext.push(`You crush the mandrake together with the spider silk and the nightshade, and feel the magic build.`);
          successtext.push(`Wisps of green smoke appear before you and seem to be drawn into the sword blade. The metal takes on a green, oily sheen, though it is dry to the touch.`);
          successtext.push(`<span class='sysconv'>You have obtained: Sword of Venom.</span>`);
          PC.removeFromInventory(PC.checkInventory("MandrakeRoot"));
          PC.removeFromInventory(PC.checkInventory("SpiderSilk"));
          PC.removeFromInventory(PC.checkInventory("Nightshade"));
          CastSpellMana(PC,targetCursor.manacost);
          ShowEffect(PC, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
          PlayCastSound(PC,"sfx_enchant");
          let sword = localFactory.createTile("VenomSword");
          PC.addToInventory(sword,1);
          if (PC.getWeapon() === tgt) { // PC has Unenchanted Sword equipped
            tgt.unEquipMe();
            sword.equipMe(PC);
          }
          PC.removeFromInventory(tgt);
          retval["fin"] = 2;
          retval["outcome"] = successtext;
          return retval;
        } else if (targetCursor.mortar["MandrakeRoot"] && targetCursor.mortar["SpiderSilk"] && targetCursor.mortar["BloodMoss"]) {
          successtext.push(`You crush the mandrake together with the spider silk and the moss, and feel the magic build.`);
          successtext.push(`Motes of light float out of the mortar and begin orbiting closely around the blade of the sword.`);
          successtext.push(`<span class='sysconv'>You have obtained: Sword of Defense.</span>`);
          PC.removeFromInventory(PC.checkInventory("MandrakeRoot"));
          PC.removeFromInventory(PC.checkInventory("SpiderSilk"));
          PC.removeFromInventory(PC.checkInventory("BloodMoss"));
          CastSpellMana(PC,targetCursor.manacost);
          ShowEffect(PC, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
          PlayCastSound(PC,"sfx_enchant");
          let sword = localFactory.createTile("SwordOfDefense");
          PC.addToInventory(sword,1);
          if (PC.getWeapon() === tgt) { // PC has Unenchanted Sword equipped
            tgt.unEquipMe();
            sword.equipMe(PC);
          }
          PC.removeFromInventory(tgt);
          retval["fin"] = 2;
          retval["outcome"] = successtext;
          return retval;
        } else if (targetCursor.mortar["MandrakeRoot"] && targetCursor.mortar["SpiderSilk"] && targetCursor.mortar["SulfurousAsh"]) {
          successtext.push(`You crush the mandrake together with the spider silk and the sulfurous ash, and feel the magic build.`);
          successtext.push(`There is a bright flash, and the blade of the sword alights with flame, which never ceases.`);
          successtext.push(`<span class='sysconv'>You have obtained: Flaming Sword.</span>`);
          PC.removeFromInventory(PC.checkInventory("MandrakeRoot"));
          PC.removeFromInventory(PC.checkInventory("SpiderSilk"));
          PC.removeFromInventory(PC.checkInventory("SulfurousAsh"));
          CastSpellMana(PC,targetCursor.manacost);
          ShowEffect(PC, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
          PlayCastSound(PC,"sfx_enchant");
          let sword = localFactory.createTile("FlamingSword");
          PC.addToInventory(sword,1);
          if (PC.getWeapon() === tgt) { // PC has Unenchanted Sword equipped
            tgt.unEquipMe();
            sword.equipMe(PC);
          }
          PC.removeFromInventory(tgt);
          retval["fin"] = 2;
          retval["outcome"] = successtext;
          return retval;
        }
      }
      retval["fin"] = 2;
      retval["outcome"] = failuretext;
      return retval;    
    }
  }
  alert("How did you get here? EmpowerReagentCommands end.");
}

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
  
  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  CreateTargetCursor({sticky: 0, command:'c',spellName:'Explosion',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "open"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});      
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

  if (castmap.getLOS(caster.getx(), caster.gety(), tgt.x, tgt.y, 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_EXPLOSION_LEVEL][SPELL_EXPLOSION_ID].getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  if ((caster.getHomeMap().getName() === "vault") && (tgt.y < 12) && (tgt.x < 12)) {
    resp.txt = "You cast the spell, but nothing seems to happen.";
    return resp;
  }

  let hostile = 0;
//  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
//    TurnMapHostile(castmap);
//    hostile = 1;
//  }

  let dmg = RollDamage(DMG_MEDIUM,DMG_LIGHT);
  if (infused) {
    dmg = dmg * 1.5;
  }
  
//  if (CheckResist(caster,tgt,infused,0)) {
//    dmg = Math.floor(dmg/2)+1;
//  }
//  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
//  ShowEffect(tgt, 700, "master_spritesheet.png", -128, -1856);
  //tgt.dealDamage(dmg,caster,"fire");
//  DealandDisplayDamage(tgt,caster,dmg,"fire");
  PlayCastSound(caster,"sfx_explosion");
  for (let diffx = -1; diffx <=1; diffx++) {
    for (let diffy = -1; diffy <=1; diffy++) {
//      if ((diffx === 0) && (diffy === 0)) { continue; }
//      dmg = RollDamage(DMG_LIGHT);
      if ((tgt.x+diffx === PC.getx()) && (tgt.y+diffy === PC.gety())) {
        let localdmg = prepareSpellDamage(caster,PC,dmg,"fire");
        localdmg = localdmg.dmg;
        if (CheckResist(caster,PC,infused,0)) { localdmg = localdmg/2 +1; }
        //PC.dealDamage(dmg,caster,"fire");
        DealandDisplayDamage(PC,caster,localdmg,"fire");
        ShowEffect(PC, 700, "static.gif", RED_SPLAT_X, RED_SPLAT_Y);
        continue;
      }
      let tile = castmap.getTile(tgt.x+diffx,tgt.y+diffy);
      let badguy = tile.getTopNPC();
      if (badguy) {
        badguy.setHitBySpell(caster,SPELL_EXPLOSION_LEVEL);
        let localdmg = prepareSpellDamage(caster,badguy,dmg,"fire");
        localdmg = localdmg.dmg;
        if (CheckResist(caster,badguy,infused,0)) { localdmg = localdmg/2+1; }
        //badguy.dealDamage(dmg,caster,"fire");
        DealandDisplayDamage(badguy,caster,localdmg,"fire");
        ShowEffect(badguy, 700, "static.gif", RED_SPLAT_X, RED_SPLAT_Y);
        if (!hostile && (caster === PC) && (badguy.getAttitude() === "friendly")) {
          TurnMapHostile(castmap);
          hostile = 1;
        }
      } else {
        ShowEffect(0, 700, "static.gif", RED_SPLAT_X, RED_SPLAT_Y, {x:tgt.x+diffx, y:tgt.y+diffy, map:caster.getHomeMap()});
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  let radius = 4;
  if (!free & caster.getIntForPower() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  let someonejinxed = 0;
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    let desc;
    if (!val.frozenintime && CheckAreEnemies(caster,val)) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        val.setHitBySpell(caster,SPELL_JINX_LEVEL);

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
          let duration = 8 + Dice.roll("1d4") - val.getIntForPower()/5;
          let jinx = localFactory.createTile("Confused");
          jinx.setPower(power);
          jinx.setExpiresTime(duration*SCALE_TIME + DUTime.getGameClock());
          val.addSpellEffect(jinx);          
          desc = val.getDesc() + " is confused!";
          ShowEffect(val, 1700, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
          if (val === PC) {
            desc = "You have become confused.";
          }
          someonejinxed = 1;
        }
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        maintext.addText(desc);
      }
    }
  }

  if (someonejinxed) { PlayCastSound(caster,"sfx_debuff"); }
  else { PlayCastSound(caster); }

  return resp;
}

// Mass Curse
magic[SPELL_MASS_CURSE_LEVEL][SPELL_MASS_CURSE_ID].getLongDesc = function() {
  let rad = "four";
  if (PC.getIntForPower() > 20) { rad = "five"; }
  return "All creatures within " +rad+ " steps of you have their stats lowered by " + (2+Math.floor(PC.getIntForPower()/5)) + " unless they resist.";
}

magic[SPELL_MASS_CURSE_LEVEL][SPELL_MASS_CURSE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Mass Curse.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  let radius = 4;
  if (!free & caster.getIntForPower() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  let cursed = 0;
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    let desc;
    if (!val.frozenintime && CheckAreEnemies(caster,val)) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        val.setHitBySpell(caster,SPELL_MASS_CURSE_LEVEL);
        let resist = CheckResist(caster,val,infused,0);
        let curse = localFactory.createTile("Curse");
        let power = 2 + Math.floor(caster.getIntForPower()/5);
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
        let duration = 10 + Dice.roll("1d8") - val.getIntForPower()/4;
        curse.setPower(power);
        curse.setExpiresTime(duration*SCALE_TIME + DUTime.getGameClock());
        val.addSpellEffect(curse);          
        desc = val.getDesc() + " is cursed!";
        ShowEffect(val, 1700, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
        
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        maintext.addText(desc);
      }
    }
    cursed = 1;
  }

  if (cursed) { PlayCastSound(caster,"sfx_debuff"); }
  else { PlayCastSound(caster); }

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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  PlayCastSound(caster,"sfx_dangerous_buff");

  let castermap = caster.getHomeMap();
  let duration = (caster.getIntForPower() * SCALE_TIME * 2);
  let negated = DU.gameflags.getFlag("negate");
  negated[castermap.getName()] = duration + DU.DUTime.getGameClock();
  DU.gameflags.setFlag("negate", negated);
  
  let gnome = localFactory.createTile("NegatorGnomeNPC");
  let gnomemap = maps.getMap("gnomeland");
	if (!gnomemap) {
	  gnomemap = new GameMap();
    gnomemap = maps.addMap("gnomeland");
	}
  gnomemap.placeThing(2,2,gnome);
  let negtile = localFactory.createTile("NegateMagic");
  negtile.negatedmap = castermap.getName();
  gnome.addSpellEffect(negtile, Math.max(0, free-1) );  

  let everyone = castermap.getNPCsAndPCs();
  for (let i=0;i<everyone.length;i++) {
    let effects = everyone[i].getSpellEffects();
    for (let j=0;j<effects.length;j++) {
      if ((effects[j].getLevel() > 0) && (effects[j].getExpiresTime() > -1)) {
        DebugWrite("magic", "Negate magic has dispelled " + effects[j].getName() + " from " + everyone[i].getName() + "<br />");
        effects[j].endEffect();
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
  let ev = new DUEvent("Negate Magic",caster,[]);
  Listener.sendEvent(ev);
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let castermap = caster.getHomeMap();
  if (!castermap.getScale()) {
    DebugWrite("magic", "Tried to cast Storm on an overland map.<br />");
    resp["txt"] = "You summon a small storm, which soon ends.";
    return resp;
  }
  let liobj = localFactory.createTile("Storm");
  
  let dur = 10*SCALE_TIME;
  if (infused) {dur = dur * 1.5; } // can't be infused, but what the heck
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(liobj);
  PlayCastSound(caster,"sfx_long_thunder");
  
  DrawCharFrame();
  return resp;
}

// Tremor
magic[SPELL_TREMOR_LEVEL][SPELL_TREMOR_ID].getLongDesc = function() {
  return "Deals " + Dice.rollmin(DMG_MEDIUM) + "-" + Dice.rollmax(DMG_MEDIUM) + " damage to all nearby enemies. Flying enemies take reduced damage.";
}

magic[SPELL_TREMOR_LEVEL][SPELL_TREMOR_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Tremor.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
 
  let radius = 5;
  let foes = GetAllWithin("npcs",radius,caster.getHomeMap(),{x: caster.getx(), y: caster.gety()},"loe");
  foes = ShuffleArray(foes);
  
  if (!foes[0]) {
    resp["txt"] = "No enemies nearby.";
    PlayCastSound(caster);
    return resp;
  }
  PlayCastSound(caster,"sfx_earthquake");
  Earthquake();
  PlayCastSound(caster,"sfx_default_hit");
  for (let i=0; i<foes.length; i++) {
    if (foes[i] && !foes[i].frozenintime) {
      foes[i].setHitBySpell(caster,SPELL_TREMOR_LEVEL);
      let tmpdmg = prepareSpellDamage(caster,foes[i],DMG_MEDIUM,"force");
      let dmg = tmpdmg.dmg;
      if (foes[i].movetype & MOVE_FLY) {
        dmg = Math.floor(dmg/2)+1;
      }
      //foes[i].dealDamage(dmg,caster,"force");
      DealandDisplayDamage(foes[i],caster,dmg,"force");
      DebugWrite("magic", "Dealing " + dmg + " damage to target " + foes[i].getName() + " " + foes[i].getSerial() + ".<br />");
      
      setTimeout(function() { ShowEffect(foes[i], 700, "static.gif", RED_SPLAT_X, RED_SPLAT_Y); }, 1000);
    }
  }
  return resp;  
}

// Weather Control
magic[SPELL_WEATHER_CONTROL_LEVEL][SPELL_WEATHER_CONTROL_ID].getLongDesc = function() {
  return "Over the next hour, the weather will shift to the weather you desire. (This has no game effect.)";
}

magic[SPELL_WEATHER_CONTROL_LEVEL][SPELL_WEATHER_CONTROL_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Weather Control.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  resp["txt"] = "You cast the spell, and the weather begins to calm.";
  PlayCastSound(caster);
  return resp;
}

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

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  CreateTargetCursor({sticky: 1, command:'c',spellName:'Charm',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});      
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  if (tgt.frozenintime) {
    resp["txt"] = "You cast the spell, but nothing seems to happen.";
    return resp;
  }

  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    ShowEffect(tgt, 1000, "static.gif", MIRROR_SPLAT_X,MIRROR_SPLAT_Y);
    PlayCastSound(tgt, "sfx_mirror_ward");
    
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  tgt.setHitBySpell(caster,SPELL_CHARM_LEVEL);

  if (!CheckResist(caster,tgt,infused,0)) {
    let charmobj = localFactory.createTile("Charm");
  
    let dur = caster.getIntForPower()/2 * SCALE_TIME;
    if (infused) { dur = dur * 1.5;}  // can't be infused, but just in case
    if (free) { dur = Dice.roll("1d4+5"); }
    ShowEffect(tgt, 1700, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
    if (tgt !== PC) {
      desc = tgt.getDesc() + " is charmed!";
    } else {
      desc = "You are charmed!";  // good lord, don't let NPCs cast charm
    }
    charmobj.setExpiresTime(dur + DUTime.getGameClock());
    charmobj.setPower(1);
    charmobj.caster = caster;
    tgt.addSpellEffect(charmobj);
    PlayCastSound(caster,"sfx_debuff");
  }
  else {
    desc = tgt.getDesc() + " resists!";
    if (tgt === PC) {
      desc = "You resist.";
      // no X over the PC
    } else {
      ShowEffect(val, 700, "X.gif");
    }
    PlayCastSound(caster);
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
  if (PC.getIntForPower() > 20) { rad = "five"; }
  return "Enemies within " + rad + " steps will become afraid and flee from you unless they resist.";
}

magic[SPELL_FEAR_LEVEL][SPELL_FEAR_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Fear.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  let radius = 4;
  if (!free & caster.getIntForPower() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  let afeared = 0;
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    let desc;
    if (!val.frozenintime && CheckAreEnemies(caster,val)) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        val.setHitBySpell(caster,SPELL_FEAR_LEVEL);
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
            var duration = 10 + Dice.roll("1d8") - val.getIntForPower()/4;
            fear.setPower(1);
            fear.setExpiresTime(duration*SCALE_TIME + DUTime.getGameClock());
            val.addSpellEffect(fear);          
            desc = val.getDesc() + " is afraid!";
            ShowEffect(val, 1700, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
          }
          afeared = 1;
        }
 
        if (desc) {       
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);
          maintext.addText(desc);
        }
      }
    }
  }

  if (afeared) { PlayCastSound(caster,"sfx_debuff"); } 
  else {PlayCastSound(caster); }

  return resp;
}

// Fire and Ice
magic[SPELL_FIRE_AND_ICE_LEVEL][SPELL_FIRE_AND_ICE_ID].getLongDesc = function() {
  return "All adjacent enemies take " + Dice.rollmin(DMG_HEAVY) + "-" + Dice.rollmax(DMG_HEAVY) + " fire damage (half on resist), and are frozen.";
}

magic[SPELL_FIRE_AND_ICE_LEVEL][SPELL_FIRE_AND_ICE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Fire and Ice.<br />");
  let resp = {fin:3};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  PlayCastSound(caster,"sfx_fire_ice");
  PlayRing(caster,"firering.png", {}, 1, "icering.png", function(center) {
    let centerx = center.getx();
    let centery = center.gety();
    let castermap = center.getHomeMap();
    for (let i=centerx-1;i<=centerx+1;i++) {
      for (let j=centery-1;j<=centery+1;j++) {
        if ((i!==centerx)||(j!==centery)) {
          let tile = castermap.getTile(i,j);
          let tgt = tile.getTopVisibleNPC();
          if (tgt && !tgt.frozenintime) {
            let tmpdmg = prepareSpellDamage(caster,tgt,DMG_HEAVY,"fire");
            let dmg = tmpdmg.dmg;
            if (CheckResist(center,tgt,0,0)) {
              dmg = Math.floor(dmg/2);
            }
            //tgt.dealDamage(dmg,center,"fire");
            DealandDisplayDamage(tgt,caster,dmg,"fire");
            tgt.setHitBySpell(caster,SPELL_FIRE_AND_ICE_LEVEL);
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let prot = localFactory.createTile("Invulnerable");
  let duration = 3 * SCALE_TIME;
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
  PlayCastSound(caster,"sfx_buff");

  return resp;
}

// Meteor Swarm
magic[SPELL_METEOR_SWARM_LEVEL][SPELL_METEOR_SWARM_ID].getLongDesc = function() {
  let rad = "four";
  if (PC.getIntForPower() > 20) { rad = "five"; }
  let min = Dice.rollmin(DMG_MEDIUM) + Dice.rollmin(DMG_LIGHT);
  let max = Dice.rollmax(DMG_MEDIUM) + Dice.rollmax(DMG_LIGHT);
  return "All enemies within " + rad + " steps are dealt " + min + "-" + max + " fire damage, half if they resist.";
}

magic[SPELL_METEOR_SWARM_LEVEL][SPELL_METEOR_SWARM_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Meteor Swarm.<br />");
  let resp = {fin:-1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  let radius = 4;
  if (!free & caster.getIntForPower() > 20) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  let display = getDisplayCenter(PC.getHomeMap(), PC.getx(), PC.gety());
  let npccount = 0;
  PlayCastSound(caster,"sfx_explosion");

  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    if (!val.frozenintime && CheckAreEnemies(caster,val)) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        npccount++;
      }
    }
  }
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    if (!val.frozenintime && CheckAreEnemies(caster,val)) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        npccount--;
        let final = 0;
        if (!npccount) { final = 1; }
        val.setHitBySpell(caster,SPELL_METEOR_SWARM_LEVEL);
        let tmpdmg = prepareSpellDamage(caster,val,DMG_MEDIUM,"fire",0,DMG_LIGHT);
        let dmg = tmpdmg.dmg;
        if (CheckResist(caster,val,infused,0)) {
          dmg = dmg/2;
        } 
        // In theory, it is impossible for targets to be offscreen. Unless maybe a monster is attacking a summoned/charmed ally?
        let skysourcex = Math.random()*(display.rightedge - displey.leftedge +1) + display.leftedge;
        let skysourcey = display.topedge;
        
        let boltgraphic = {};
        boltgraphic.graphic = "blasts.gif";
        boltgraphic.yoffset = 0;
        boltgraphic.xoffset = 0;
        boltgraphic.directionalammo = 1;
        boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);
        let desc = val.getDesc();
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        let descval = {txt: desc};

        let sounds = {};
        let fromcoords = GetCoords(caster.getHomeMap(),caster.getx(), caster.gety());
        let tocoords = GetCoords(val.getHomeMap(),val.getx(), val.gety());
        let duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
        let destgraphic = {graphic:"static.gif", xoffset:RED_SPLAT_X, yoffset:RED_SPLAT_Y, overlay:"spacer.gif"};
        let weapon = localFactory.createTile("SpellWeapon");
        weapon.dmgtype = "fire";      
        AnimateEffect({atk:caster, def:tgt, fromcoords:fromcoords, tocoords:tocoords, ammographic:boltgraphic, destgraphic:destgraphic, sounds:sounds, type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:final, retval:descval, dmgtype:"fire", doagain:[]});

      }
    }
  }

  return resp;
}

// Mind Blast
magic[SPELL_MIND_BLAST_LEVEL][SPELL_MIND_BLAST_ID].getLongDesc = function() {
  return "Deals enough damage to instantly slay most foes.";
}

magic[SPELL_MIND_BLAST_LEVEL][SPELL_MIND_BLAST_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Mind Blast.<br />");
  if (caster !== PC) {
    let resp = PerformMindBlast(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  CreateTargetCursor({sticky: 1, command:'c',spellName:'Mind Blast',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});      
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformMindBlast(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};
  let desc = tgt.getDesc();

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_MIND_BLAST_LEVEL][SPELL_MIND_BLAST_ID].getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (tgt.frozenintime) {
    resp["txt"] = "You cast the spell, but nothing seems to happen.";
    return resp;
  }
  
  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    ShowEffect(tgt, 1000, "static.gif", MIRROR_SPLAT_X,MIRROR_SPLAT_Y);
    PlayCastSound(tgt, "sfx_mirror_ward");
    
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  tgt.setHitBySpell(caster,SPELL_MIND_BLAST_LEVEL);
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
  let power = caster.getIntForPower();
  if (free) { power = Dice.roll("1d5+12"); }
  let tmpdmg = prepareSpellDamage(caster,tgt,DMG_TREMENDOUS,"drain",0,power);
  let dmg = tmpdmg.dmg;
  if (infused) {  // can't be infused, but check anyway
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,-5)) {
    dmg = Math.floor(dmg/2)+1;
  }

  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");

  DealandDisplayDamage(tgt, caster, dmg, "drain");
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    
  ShowEffect(tgt, 1700, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
  PlayCastSound(caster, "sfx_mind");

  return resp;
}

// Permanence
magic[SPELL_PERMANENCE_LEVEL][SPELL_PERMANENCE_ID].getLongDesc = function() {
  return "Make permanent a spell. Can be applied to the following spells: Flame Blade, Light, Protection, Fire Armor, Blessing, Water Walking, and Telepathy. Must be cast in a pentagram, and consumes one mandrake root with each casting.";
}

magic[SPELL_PERMANENCE_LEVEL][SPELL_PERMANENCE_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Permanence.<br />");

  let resp = {fin:1};

  if (caster !== PC) {
    resp = PerformPermanence(caster, infused, free, tgt);   // not that AIs will ever cast Permanence, either
    return resp;
  }

  if (!IsOnPentagram(caster)) {
    resp["fin"] = 2;
    resp["txt"] = "This spell must be cast while standing in a circle of power.";
    return resp;
  }

  if (!PC.checkInventory("Mortar") && !PC.checkInventory("CrystalMortar")) { 
    resp["fin"] = 2;
    resp["txt"] = "You have no mortar to grind the reagents in.";
    return resp;
  }

  if (!PC.checkInventory("MandrakeRoot")) {
    resp["fin"] = 2;
    resp["txt"] = "You need to provide a mandrake root to empower this spell.";
    return resp;
  }

  if (!PC.getSpellEffectsByName("FlameBlade") && !PC.getSpellEffectsByName("Light") && !PC.getSpellEffectsByName("Protection") && !PC.getSpellEffectsByName("FireArmor") && !PC.getSpellEffectsByName("Blessing") && !PC.getSpellEffectsByName("Levitate") && !PC.getSpellEffectsByName("Telepathy")) {
    resp["fin"] = 2;
    resp["txt"] = "You have no spells on you that can be made permanent.";
    return resp;
  }

  targetCursor.manacost = this.getManaCost();
  resp["txt"] = "";
  resp["input"] = "&gt; Choose a spell to make permanent- ";
  let idx = 1;
  if (PC.getSpellEffectsByName("FlameBlade")) {
    resp["txt"] += `<br /> ${idx}- Flame Blade`;
    idx++;
  } 
  if (PC.getSpellEffectsByName("Light")) {
    resp["txt"] += `<br /> ${idx}- Light`;
    idx++;
  } 
  if (PC.getSpellEffectsByName("Protection")) {
    resp["txt"] += `<br /> ${idx}- Protection`;
    idx++;
  }
  if (PC.getSpellEffectsByName("FireArmor")) {
    resp["txt"] += `<br /> ${idx}- Fire Armor`;
    idx++;
  }
  if (PC.getSpellEffectsByName("Blessing")) {
    resp["txt"] += `<br /> ${idx}- Blessing`;
    idx++;
  }
  if (PC.getSpellEffectsByName("Levitate")) {
    resp["txt"] += `<br /> ${idx}- Water Walk`;
    idx++;
  }
  if (PC.getSpellEffectsByName("Telepathy")) {
    resp["txt"] += `<br /> ${idx}- Telepathy`;
    idx++;
  }

  resp["fin"] = 4;  // was 0

  gamestate.setMode("singlenumber");
  targetCursor.spellName = "Permanence";
  targetCursor.command = 'c';

  return resp;

}

function PerformPermanence(caster, infused, free, tgt) {
  console.log(tgt);
  let optionarr = [];
  let retval = { fin: 1 }
  if (PC.getSpellEffectsByName("FlameBlade")) {
    optionarr.push("FlameBlade");
  } 
  if (PC.getSpellEffectsByName("Light")) {
    optionarr.push("Light");
  } 
  if (PC.getSpellEffectsByName("Protection")) {
    optionarr.push("Protection");  }
  if (PC.getSpellEffectsByName("FireArmor")) {
    optionarr.push("FireArmor");  }
  if (PC.getSpellEffectsByName("Blessing")) {
    optionarr.push("Blessing");  }
  if (PC.getSpellEffectsByName("Levitate")) {
    optionarr.push("Levitate");  }
  if (PC.getSpellEffectsByName("Telepathy")) {
    optionarr.push("Telepathy");  }

  let idx = tgt - 49;
  if (optionarr[idx]) {
    let effect = PC.getSpellEffectsByName(optionarr[idx]);
    PC.removeFromInventory(PC.checkInventory("MandrakeRoot"));
    effect.setExpiresTime(-1);
    retval["txt"] = `The ${effect.getDesc()} spell has been rendered permanent.`;
  } else {
    retval["fin"] = 0;
    return retval;
  }
  return retval;
}

// Armageddon
magic[SPELL_ARMAGEDDON_LEVEL][SPELL_ARMAGEDDON_ID].getLongDesc = function() {
  return "Ends the world.";
}

magic[SPELL_ARMAGEDDON_LEVEL][SPELL_ARMAGEDDON_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Armageddon.<br />");
  let resp = {fin:4};
  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  resp["txt"] = "You complete the twisted incantation, longer and more complicated than any spell you have ever cast before. When you finish, there is a moment where everything, everywhere, goes still, and you realize you have made the worst and last mistake of your life.";
  gamestate.setMode("anykey");
  targetCursor.command = "armageddon";
  targetCursor.step = 1;
  resp["input"] = "&gt;[MORE]";
  return resp;
}

function ArmageddonNarration(step) {
  if (step === 1) {
    maintext.addText("A wave of energy flashes out from you in all directions, snuffing out all life it touches. You know that it will not stop until it has touched the entire world. The silence is deafening.");
  } else if (step === 2) {
    maintext.addText("As everything else reaches its inevitable, premature end, you realize the worst part of it all- you are still alive, in an empty world.");
  } else if (step === 3) {
    maintext.addText("As the balance fails in the world around you, great fires burn, stars fall, winds drive huge waves against unfeeling rocks. This is what you will see, for however so long as you live, wherever you look, whatever happens.");
    let mainframe = document.getElementById("displayframe");
    mainframe.innerHTML = "<img src='graphics/splash/Armageddon.gif' />";
  } else if (step === 4) {
    maintext.addText("This is how it ends, this is how it has ended. By your hand.");
  } else { 
    maintext.addText("Your quest has ended.");
    gamestate.setMode("null");
    maintext.setInputLine("&gt;");
    maintext.drawTextFrame();
  }

}

// Arrow of Glass
magic[SPELL_ARROW_OF_GLASS_LEVEL][SPELL_ARROW_OF_GLASS_ID].getLongDesc = function() {
  return "Deals enough damage to instantly slay most foes.";
}

magic[SPELL_ARROW_OF_GLASS_LEVEL][SPELL_ARROW_OF_GLASS_ID].executeSpell = function(caster, infused, free, tgt) {
  DebugWrite("magic", "Casting Arrow of Glass.<br />");
  if (caster !== PC) {
    let resp = PerformArrowOfGlass(caster, infused, free, tgt);
    return resp;
  }
  let resp = {};

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }
  
  CreateTargetCursor({sticky: 1, command:'c',spellName:'Arrow of Glass',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "npc"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});      
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 4;
  gamestate.setMode("target");
  return resp;
}


function PerformArrowOfGlass(caster, infused, free, tgt) {
  gamestate.setMode("null");
  let resp = {fin:1};

  if (caster.getHomeMap().getLOS(caster.getx(), caster.gety(), tgt.getx(), tgt.gety(), 1) >= LOS_THRESHOLD) { 
    resp["fin"] = 2;
    resp["txt"] = "Your spell cannot reach that target!";
    return resp;
  }
  
  if (!free) {
    let mana = magic[SPELL_ARROW_OF_GLASS_LEVEL][SPELL_ARROW_OF_GLASS_ID].getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let dmg = 0;  // real damage rolled after real target determined
  let desc = "";
  let multitargets = [];
  multitargets[0] = {};
  multitargets[0].atk = caster;
  multitargets[0].def = tgt;
  multitargets[0].dmg = dmg;
  multitargets[0].retval = { txt:"" };
  multitargets[0].fromcoords = GetCoords(caster.getHomeMap(),caster.getx(), caster.gety());
  multitargets[0].tocoords = GetCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  multitargets[0].destgraphic = {graphic:"static.gif", xoffset:RED_SPLAT_X, yoffset:RED_SPLAT_Y, overlay:"spacer.gif"};

  let boltgraphic = {};
  boltgraphic.graphic = "static.gif";
  boltgraphic.xoffset = 0;
  boltgraphic.yoffset = -164*32;  // Arrow of Glass
  boltgraphic.directionalammo = 1;
  boltgraphic = GetEffectGraphic(caster,tgt,boltgraphic);

  multitargets[0].ammographic = boltgraphic;

  multitargets[0].sounds = {end: "sfx_default_hit"};
  let duration = (Math.pow( Math.pow(tgt.getx() - caster.getx(), 2) + Math.pow (tgt.gety() - caster.gety(), 2)  , .5)) * 100;
  multitargets[0].duration = duration;
  let weapon = localFactory.createTile("SpellWeapon");
  weapon.dmgtype = "physical";
  multitargets[0].weapon = weapon;
  multitargets[0].type = "missile";
  multitargets[0].ammoreturn = 0;
  multitargets[0].endturn = 1;
  multitargets[0].dmgtype = "physical";

  let newtgt = CheckMirrorWard(tgt, caster);
  while (newtgt !== tgt) {
    // new target!
    let newobj = {};
    newobj.atk = tgt;
    newobj.def = newtgt;
    newobj.dmg = dmg;
    newobj.retval = { txt: ""};
    newobj.fromcoords = GetCoords(newobj.atk.getHomeMap(),newobj.atk.getx(),newobj.atk.gety());
    newobj.tocoords = GetCoords(newobj.def.getHomeMap(),newobj.def.getx(),newobj.def.gety());
    newobj.destgraphic = {graphic:"static.gif", xoffset:RED_SPLAT_X, yoffset:RED_SPLAT_Y, overlay:"spacer.gif"};

    multitargets[multitargets.length-1].destgraphic = {graphic:"static.gif", xoffset:MIRROR_SPLAT_X, yoffset:MIRROR_SPLAT_Y, overlay:"spacer.gif"};

    let bg = {};
    bg.graphic = "static.gif";
    bg.xoffset = 0;
    bg.yoffset = -164*32;
    bg.directionalammo = 1;
    bg = GetEffectGraphic(tgt, newtgt, bg);
    newobj.ammographic = bg;

    multitargets[multitargets.length-1].sounds = {end: "sfx_mirror_ward"}
    newobj.sounds = {end: "sfx_default_hit"};
    newobj.duration = (Math.pow( Math.pow(newtgt.getx() - tgt.getx(), 2) + Math.pow (newtgt.gety() - tgt.gety(), 2)  , .5)) * 100;
    let wpn = localFactory.createTile("SpellWeapon");
    wpn.dmgtype = "physical";
    newobj.weapon = wpn;
    newobj.type = "missile";
    newobj.ammoreturn = 0;
    newobj.endturn = 1;
    newobj.dmgtype = "physical";
    newobj.myturn = caster;

    multitargets.push(newobj);
    tgt = newtgt;
    newtgt = CheckMirrorWard(tgt, caster);
  }
    
  tgt = newtgt;
  tgt.setHitBySpell(caster,SPELL_ARROW_OF_GLASS_LEVEL);
  if ((caster === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
  let power = caster.getIntForPower();
  if (free) { power = Dice.roll("1d5+12"); }
//  let dmg = RollDamage(DMG_TREMENDOUS) + power;
  let tmpdmg = prepareSpellDamage(caster,tgt,DMG_AUTOKILL,"physical");
  
  dmg = tmpdmg.dmg;
  if (infused) {  // can't be infused, but check anyway
    dmg = dmg * 1.5;
  }
  
  if (CheckResist(caster,tgt,infused,-5)) {
    dmg = Math.floor(dmg/2)+1;
  }

  DebugWrite("magic", "Dealing " + dmg + " damage.<br />");
  desc = tgt.getDesc();
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);

  PlayCastSound(caster,"sfx_break_glass");
  let descval = {txt: desc};

  multitargets[multitargets.length-1].dmg = dmg;
  multitargets[multitargets.length-1].retval = descval;

  let nowtarget = multitargets.shift();
  nowtarget.doagain = multitargets;
  if (tgt.frozenintime) {
    descval = {txt: "You cast Arrow of Glass. It streaks forth from your hand, but before it reaches its target, it slows, and stops, and hangs in the air."};
    nowtarget.retval = descval;
    nowtarget.frdesc = "Arrow of Glass";
//    AnimateToFrozen({atk:caster, def:tgt, fromcoords:fromcoords, tocoords:tocoords, ammographic:boltgraphic, destgraphic:destgraphic, sounds:sounds, type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"force", weapon:weapon, frdesc:"Arrow of Glass",doagain:[]});
    AnimateToFrozen(nowtarget);
  } else {
//    AnimateEffect({atk:caster, def:tgt, fromcoords:fromcoords, tocoords:tocoords, ammographic:boltgraphic, destgraphic:destgraphic, sounds:sounds, type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"physical", weapon:weapon, doagain:[]});
    AnimateEffect(nowtarget);
  }

  resp["fin"] = -1;
  return resp;
}

// Build Gate

// Conflagration
magic[SPELL_CONFLAGRATION_LEVEL][SPELL_CONFLAGRATION_ID].getLongDesc = function() {
  let rad = "four";
  if (PC.getIntForPower() > 25) { rad = "five"; }
  let min = Dice.rollmin(DMG_HEAVY);
  let max = Dice.rollmax(DMG_HEAVY);
  return "All enemies within " + rad + " steps are dealt " + min + "-" + max + " fire damage, half if they resist.";
}

magic[SPELL_CONFLAGRATION_LEVEL][SPELL_CONFLAGRATION_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Conflagration.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  if (!caster.getHomeMap().getScale()) {
    resp["fin"] = 2;
    resp["txt"] = "There is no benefit to casting that spell here.";
    resp["input"] = "&gt;";
    return resp;
  }

  PlayCastSound(caster,"sfx_fireball");
  let radius = 4;
  if (!free & caster.getIntForPower() > 25) { radius = 5; }
  if (infused) { radius = radius * 1.5; }  // level 6+ spells can't be infused, but let's cover the case anyway
  let castermap = caster.getHomeMap();
  let npcs = castermap.getNPCsAndPCs();
  let display = getDisplayCenter(PC.getHomeMap(), PC.getx(), PC.gety());
  let npccount = 0;
  for (let i=0;i<npcs.length;i++) {
    let val=npcs[i];
    let desc;
    if (!val.frozenintime && CheckAreEnemies(caster,val)) {
      if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
        let tmpdmg = prepareSpellDamage(caster,val,DMG_HEAVY,"fire");
        let dmg = tmpdmg.dmg;
        if (CheckResist(caster,val,infused,0)) {
          dmg = dmg/2+1;
        } 
        // In theory, it is impossible for targets to be offscreen.
        val.setHitBySpell(caster,SPELL_CONFLAGRATION_LEVEL);
        let desc = val.getDesc();
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        ShowEffect(val, 700, "static.gif", RED_SPLAT_X, RED_SPLAT_Y);
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
  CreateTargetCursor({sticky: 0, command:'c',spellName:'Conjure Daemon',spelldetails:{ caster: caster, infused: infused, free: free, targettype: "open"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 3});        
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let ally = localFactory.createTile("Daemon");
  PlayCastSound(caster,"sfx_summon");
  let duration = caster.getIntForPower() * SCALE_TIME;
  if ((caster === PC) || (caster.getAttitude() === "friendly")) {
    ally.setAttitude("friendly");
  }
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
  ally.spawnedBy = caster;
  ally.summoned = 1;
  ally.expiresTime = DUTime.getGameClock() + duration;  // AI needs to check expiresTime and go poof if it is reached
  caster.getHomeMap().placeThing(tgt.x,tgt.y,ally);
  DrawMainFrame("one",caster.getHomeMap(),ally.getx(),ally.gety());
  ShowEffect(ally, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
  
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
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let liobj = localFactory.createTile("Quickness");
  
  let dur = caster.getIntForPower()/2 * SCALE_TIME;
  if (free) { 
    dur = Dice.roll("1d10+5") * SCALE_TIME;
  }
  if (infused) {dur = dur * 1.5; }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(liobj, Math.max(0, free-1) );
  PlayCastSound(caster,"sfx_buff");

  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  DrawCharFrame();
  return resp;  
}

// Reincarnate 
magic[SPELL_REINCARNATE_LEVEL][SPELL_REINCARNATE_ID].getLongDesc = function() {
  return "Places an enchantment upon you: the next time you would die, you are instead revived at half health. Must be cast in a pentagram.";
}

magic[SPELL_REINCARNATE_LEVEL][SPELL_REINCARNATE_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Reincarnate.<br />");
  let resp = {fin:1};

  if (!IsOnPentagram(caster)) {
    resp["fin"] = 2;
    resp["txt"] = "This spell must be cast while standing in a circle of power.";
    return resp;
  }

  if (!free) {
    free = 0;
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }

  let rein = localFactory.createTile("Reincarnate");
  rein.setExpiresTime(-1);

  caster.addSpellEffect(liobj, Math.max(0, free-1) );
  PlayCastSound(caster,"sfx_buff");

  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
  DrawCharFrame();
  return resp;  
}

// Time Stop
magic[SPELL_TIME_STOP_LEVEL][SPELL_TIME_STOP_ID].getLongDesc = function() {
  return "Stops time. Each moment you live while time is stopped will drain some of your mana.";
}

magic[SPELL_TIME_STOP_LEVEL][SPELL_TIME_STOP_ID].executeSpell = function(caster, infused, free) {
  DebugWrite("magic", "Casting Time Stop.<br />");
  let resp = {fin:1};
  if (!free) {
    let mana = this.getManaCost(infused);
    CastSpellMana(caster,mana);
    DebugWrite("magic", "Spent " + mana + " mana.<br />");
  }
  
  let liobj = localFactory.createTile("TimeStop");
  
  let dur = caster.getIntForPower() * .3;
  if (free) { dur = 5; }
  if (infused) {dur = dur * 3; }
  let endtime = dur + DU.DUTime.getGameClock();
  DebugWrite("magic", "Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  liobj.setExpiresTime(endtime);
  if (infused) { liobj.setPower(4); }   // defaults to 2
  
//  DUPlaySound("sfx_spell_light"); 
  PlayCastSound(caster,"sfx_dangerous_buff");
  caster.addSpellEffect(liobj);
  
  DrawCharFrame();
  return resp;
}

function CastSpellMana(mage, mana) {
  mage.modMana(-1*mana);
  let ev = new DUEvent("Spellcast",mage,[]);
  Listener.sendEvent(ev);
}

function TravelByMoongate(who,color,destmap,destx,desty) {
  let tol = 300;
  let gatename = "TempMoongate";
  if (color === "red") { gatename = "TempDaemonMoongate"; }

  let gate = localFactory.createTile(gatename);
  let castermap = who.getHomeMap();
  let gx = who.getx();
  let gy = who.gety();
  castermap.placeThing(gx,gy,gate);
  gate.spriteyoffset = 0;
  
  let oldgraphic = who.getGraphicArray();

  AnimateMoongate(gate,0,"up",tol,0);
  setTimeout(function() {
    if (who.checkType("human")) {
      who.noDraw = 1;
      who.makeLayers();
    } else {
      who.setGraphicArray(["spacer.gif","",0,0]);
    }
    DrawMainFrame("one", castermap, gx, gy);
    setTimeout(function() {
      if (destmap === castermap) {
        castermap.moveThing(destx,desty,who);
        castermap.moveThing(destx,desty,gate);
      } else {
        MoveBetweenMaps(who, castermap, destmap, destx, desty);
        MoveFeatureBetweenMaps(gate, destmap, destx, desty);
      }
      DrawMainFrame("draw", destmap, destx, desty);
      setTimeout(function() {
        if (who.checkType("human")) {
          delete who.noDraw;
          who.makeLayers();
        } else {
          who.setGraphicArray(oldgraphic);
        }
            
        DrawMainFrame("one", destmap, destx, desty);
        AnimateMoongate(gate,0,"down",tol,1);
        // Moongate descends, but player can immediately walk around
        DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
        DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");  
        who.endTurn();

      }, 400); // duration before emerge from gate at destination
    },700); // duration of stand in front of gate
  }, 1500);  // duration of gate coming up
}

function TravelByMoongateOld(who, color, destmap, destx, desty) {
  let tol = 300;
  let graphicarray = [];
  graphicarray[0] = "moongate.gif";
  graphicarray[1] = "spacer.gif";
  graphicarray[2] = 0;
  graphicarray[3] = -32;
  if (color === "red") { graphicarray[2] = -32; }
  
  let oldgraphic = who.getGraphicArray();
  // play sound effect
  who.setGraphicArray(graphicarray);
  DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
  setTimeout(function() {
    graphicarray[3] += 8;
    who.setGraphicArray(graphicarray);
    DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
    setTimeout(function() {
      graphicarray[3] += 8;
      who.setGraphicArray(graphicarray);
      DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
      setTimeout(function() {
        graphicarray[3] += 8;
        who.setGraphicArray(graphicarray);
        DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
        setTimeout(function() {
          graphicarray[3] += 8; // at this point it should be 0
          who.setGraphicArray(graphicarray);
          DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
          setTimeout(function() {
            who.setGraphicArray(["spacer.gif","spacer.gif",0,0]);
            DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
            setTimeout(function() {
              MoveBetweenMaps(who,who.getHomeMap(), destmap, destx, desty);
              DrawMainFrame("draw", who.getHomeMap(), who.getx(), who.gety());
              setTimeout(function() {
                who.setGraphicArray(graphicarray);
                DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
                setTimeout(function() {
                  graphicarray[3] -= 8;
                  who.setGraphicArray(graphicarray);
                  DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
                  setTimeout(function() {
                    graphicarray[3] -= 8;
                    who.setGraphicArray(graphicarray);
                    DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
                    setTimeout(function() {
                      graphicarray[3] -= 8;
                      who.setGraphicArray(graphicarray);
                      DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
                      setTimeout(function() {
                        graphicarray[3] -= 8;
                        who.setGraphicArray(graphicarray);
                        DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
                        setTimeout(function() {
                          who.setGraphicArray(oldgraphic);
                          DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
                          DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");  
                          who.endTurn();  
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

function ShowEffect(onwhat, duration, graphic, xoff, yoff, extraparams) {
  let temporary = 0;
  if (!onwhat) {
    onwhat = localFactory.createTile("Placeholder");
    extraparams.map.placeThing(extraparams.x,extraparams.y,onwhat);
    temporary = 1;
  }
  // duration in ms
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
  if (IsObjectVisibleOnScreen(onwhat)) {
    where = GetCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
    animurl = "graphics/" + graphic ;
    DebugWrite("magic", "Putting a " + animurl + " on " + onwhat.getName() + ".<br />");
  }
  let animhtml;
  if (animurl) {
    let docid = "anim" + onwhat.getSerial();
    let docdiv = document.getElementById(docid);
    if (!docdiv) {
      animhtml = '<div id="anim' + onwhat.getSerial() + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; width:32px; height:32px; background-image:url(\'graphics/' + graphic + '\'); background-position: ' + xoff + 'px ' + yoff + 'px"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
      document.getElementById('spelleffects').innerHTML = document.getElementById('spelleffects').innerHTML + animhtml;
    } else if (docdiv.innerHTML === "") {
      docdiv.innerHTML = '<img src="graphics/spacer.gif" width="32" height="32" />';
      docdiv.style.left = where.x;
      docdiv.style.top = where.y;
      docdiv.style.backgroundImage = 'url("graphics/' + graphic + '")';
      docdiv.style.backgroundPosition = 'background-position', xoff + 'px ' + yoff + 'px';
    } else {
      console.log(`${onwhat.name} already had a spell effect playing.`);
    }
    
    setTimeout(function() {
      DebugWrite("magic", "Removing a " + animurl + " from " + onwhat.getName() + ".<br />");
      let acton = document.getElementById(docid);
      if (acton) {
        acton.innerHTML = "";
        acton.style.backgroundImage = "";
      }
      delete spellcount["anim" + onwhat.getSerial()];
      if (temporary) {
        onwhat.getHomeMap().deleteThing(onwhat);
      }
    },duration);
  }
}

// Deprecated
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
    where = GetCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
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
    where = GetCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
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
    if (targetCursor.command === "u") {
      retval["txt"] = "You cannot reach there!";
    } else {
      retval["txt"] = "Your spell cannot reach there!";
    }
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
      } else if (targetCursor.spellName === "Charm") {
        resp = PerformCharm(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Arrow of Glass") {
        resp = PerformArrowOfGlass(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Awaken") {
        resp = PerformAwaken(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Crystal Barrier") {
        resp = PerformCrystalBarrier(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      } else if (targetCursor.spellName === "Green Potion") {
        resp = targetCursor.uselink.throw(PC,tgt);
      }
      delete targetCursor.spellName;
      
    }
    
  } else if ((targetCursor.spelldetails.targettype === "open") || (targetCursor.spelldetails.targettype === "fullopen")) {
    let nonpcs = 1;
    if (targetCursor.spelldetails.targettype === "fullopen") { nonpcs = 0; }
    let canmove = targettile.canMoveHere(MOVE_WALK,nonpcs);
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
    } else if (targetCursor.spellName === "Explosion") {
      resp = PerformExplosion(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
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

      CreateTargetCursor({sticky: 0, command:'c',spellName:'Telekinesis',spelldetails:{ caster: targetCursor.spelldetails.caster, infused: targetCursor.spelldetails.infused, free: targetCursor.spelldetails.free, targettype: "open"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: targetCursor.targetCenterlimit});
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
    if (targetCursor.spellName === "Mend") {
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
    } else if (targetCursor.spellName === "Empower") {
      if ((targetCursor.x === targetCursor.spelldetails.caster.getx()) && (targetCursor.y === targetCursor.spelldetails.caster.gety())) {
        gamestate.setMode("zstats");
        targetCursor.restrictTo = "";
        targetCursor.page = 2;
        
        DisplayInventory();
  
        resp["txt"] = "";
        resp["input"] = "&gt; Empower what: ";
        resp["fin"] = 3;	

  	  } else {
	      let thetile = targetCursor.spelldetails.caster.getHomeMap().getTile(targetCursor.x, targetCursor.y);
	      let fea = thetile.getTopFeature();
	      if (fea && fea.checkType("item")) {
	        resp = PerformEmpower(PC, 0, 0, fea);
  	    } else {
          resp["fin"] = 0;
          resp["txt"] = "That cannot be empowered.";
          resp["input"] = "&gt;";
        }	 
        document.getElementById(targetCursor.tileid).innerHTML = targetCursor.basetile;     
        delete targetCursor.spellName;
      }
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
      where = GetCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
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
        where = GetCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
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
  let testspot = GetCoords(PC.getHomeMap(),displayspecs.leftedge, PC.gety());
  testspot.x -= 32;
  let animhtml = '<div id="animringtest" style="position: absolute; left: ' + testspot.x + 'px; top: ' + testspot.y + 'px; background-image:url(\'graphics/red-carpet.gif\');background-repeat:no-repeat; background-position: 0px 0px;"><img src="graphics/spacer.gif" width="96" height="96" /></div>';  
  document.getElementById('spelleffects').innerHTML = document.getElementById('spelleffects').innerHTML + animhtml;
}

function PlayCastSound(caster,sfxname) {
  if ((caster.getHomeMap() === PC.getHomeMap()) && (IsVisibleOnScreen(caster.getx(),caster.gety()))) {
    DUPlaySound("sfx_spellcast");
    if (sfxname) {
      setTimeout(function() { DUPlaySound(sfxname); }, 300); 
    }
  }
}
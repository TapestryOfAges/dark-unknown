
function EphemeralObject() {

  this.type = "XephemeralX";
// beyond that, types are: Triggered, Spell, Buff, Debuff, OnAttack, OnHit, OnIsAttacked, OnIsHit
  this.name = "";
  this.createTime;
  this.expiresTime = 0; // 0 expires time means won't expire, replace this with a time if it will
  this.lastTime;   // timestamp of spell's last effect, if applicable
  this.power = 1;  // the Int of the caster, usually- this is used to decide which one of several
                   // of the same spell/effect to actually have take effect
  this.active = 0;  // set to 1 if it is being allowed to take effect, see above
  this.instances = 1;  // how many of this spell have stacked their durations
  this.display = "";
  this.attachedTo;
  this.desc;
  this.level = 0;
}
EphemeralObject.prototype = new ProtoObject();

EphemeralObject.prototype.setLevel = function(what) {
  this.level = what;
}

EphemeralObject.prototype.getLevel = function() {
  return this.level;
}

EphemeralObject.prototype.setAttachedTo = function(what) {
  this.attachedTo = what;
}

EphemeralObject.prototype.getAttachedTo = function() {
  return this.attachedTo;
}

EphemeralObject.prototype.setCreateTime = function(newtime) {
  this.createTime = newtime;
}

EphemeralObject.prototype.getCreateTime = function() {
  return this.createTime;
}

EphemeralObject.prototype.setLastTime = function(newtime) {
  this.lastTime = newtime;
}

EphemeralObject.prototype.getLastTime = function() {
  return this.lastTime;
}

EphemeralObject.prototype.setExpiresTime = function(newtime) {
  this.expiresTime = newtime;
}

EphemeralObject.prototype.getExpiresTime = function() {
  return this.expiresTime;
}

EphemeralObject.prototype.setPower = function(newpower) {
  this.power = parseInt(newpower);
  return this.power;
}

EphemeralObject.prototype.getPower = function() {
  return this.power;
}

EphemeralObject.prototype.getDisplay = function() {
  return this.display;
}

EphemeralObject.prototype.getInstances = function() {
  return this.instances;
}

EphemeralObject.prototype.setInstances = function(newval) {
  var nv = parseInt(newval);
  if (nv) { this.instances = nv; }
  return this.instances;
}

EphemeralObject.prototype.setActive = function(active) {
  if (active) {
    this.active = 1;
  } else {
    this.active = 0;
  }
  return this.active;
}

EphemeralObject.prototype.getActive = function() {
  return this.active;
}

EphemeralObject.prototype.onTurn = function() {
  var resp = 0;
  if ((this.getExpiresTime() > -1) && (DUTime.getGameClock() > this.getExpiresTime())) {
    resp = this.endEffect();
  }
  return resp;
}

EphemeralObject.prototype.mergeSpells = function(oldornew) {
  if (oldornew === "old") {
    
  } else {
    
  }
}

function DamageOverTimeObject() {
  this.damagePerTick = 0;
  this.addType("dot");
}
DamageOverTimeObject.prototype = new EphemeralObject();

DamageOverTimeObject.prototype.setDamagePerTick = function(newDoT) {
  this.damagePerTick = newDoT;
  return this.damagePerTick;
}

DamageOverTimeObject.prototype.getDamagePerTick = function() {
  return this.damagePerTick;
}

DamageOverTimeObject.prototype.onTurn = function() {
  var prev = this.getLastTime();
  if (!prev) { prev = this.getCreateTime(); }
  
  var now = DUTime.getGameClock();
  if ((this.getExpiresTime()) && (now > this.getExpiresTime())) {
    now = this.getExpiresTime();
  }
  var dur = now - prev;
  var dmg = dur * this.getDamagePerTick();
  var who = this.getAttachedTo();
  
//  alert(dmg);
//  var oldhp = who.getDisplayHP();
  who.dealDamage(dmg);
//  var newhp = who.getDisplayHP();
  
  if ((this.getExpiresTime()) && (now >= this.getExpiresTime())) {
    this.endEffect();
  } else {
    this.setLastTime(DUTime.getGameClock());    
  }
}

// Called "Tiles" for consistency, not because it'll ever get placed

function DiseaseTile() {
  this.addType("debuff");
  this.name = "Disease";
  this.damagePerTick = 1;
  this.display = "<span style='color:#58FA58'>D</span>";
  this.zstatdesc = "You have been infected by a disease.";
  this.desc = "disease";
}
DiseaseTile.prototype = new DamageOverTimeObject();

DiseaseTile.prototype.applyEffect = function(silent) {
  return 1;
}

DiseaseTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  DrawCharFrame();
}

function DistractTile() {
  this.addType("debuff");
  this.name = "Distract";
  this.display = "<span style='color:777777'>D</span>";
  this.zstatdesc = "You are distracted.";
  this.desc = "Distract";
}
DistractTile.prototype = new EphemeralObject();

DistractTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You have become distracted.");
  }
  return 1;
}

DistractTile.prototype.doEffect = function() {
  var resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

DistractTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You are no longer distracted!");
  }
  DrawCharFrame();
  return -1;
}

function FireArmorTile() {
  this.addType("buff");
  this.name = "FireArmor";
  this.display = "<span style='color:red'>A</span>";
  this.zstatdesc = "You are surrounded with flames.";
  this.desc = "Fire Armor";
  this.level = 3;
}
FireArmorTile.prototype = new EphemeralObject();

FireArmorTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You are surrounded with flames.");
    }
  }
  return 1;
}

FireArmorTile.prototype.doEffect = function() {
  var resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

FireArmorTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("The flames that surround you fade away.");
  }
  DrawCharFrame();
  return -1;
}

FireArmorTile.prototype.flashback = function(attacker) {
  var dmg = RollDamage(this.getPower());
  if (attacker === PC) {
    maintext.addText("Flames burn you!");
  }
  attacker.dealDamage(dmg);
  ShowEffect(attacker, 700, "702.gif", 0, 0);
}

function FlameBladeTile() {
  this.addType("buff");
  this.name = "FlameBlade";
  this.display = "<span style='color:#df0101'>F</span>";
  this.zstatdesc = "Your weapon is sheathed in flame.";
  this.desc = "Flame Blade";
  this.level = 1;
}
FlameBladeTile.prototype = new EphemeralObject();

FlameBladeTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if (who) {
    who.setLight(who.getLight() + .5);
    if ((who === PC) && !silent) {
      maintext.addText("Your weapon is sheathed in flame.");
    }
  }
  return 1;
}

FlameBladeTile.prototype.doEffect = function() {
  this.uses--;
  var resp = 0;
  if (this.uses) {
    if (DUTime.getGameClock() > this.getExpiresTime()) {
      resp = this.endEffect();
    }
  } else {
    resp = this.endEffect(1);
    maintext.delayedAddText("The flames on your weapon are consumed!");
  }
  return resp;
}

FlameBladeTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.setLight(who.getLight() - .5);
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("The flames on your weapon flicker and die.");
  }
  DrawCharFrame();
  return -1;
}

function PoisonTile() {
  this.addType("debuff");
  this.name = "Poison";
  this.damagePerTick = 2 * (1/SCALE_TIME);  // poison is slow-maps only
  this.display = "<span style='color:#58FA58'>D</span>";
  this.zstatdesc = "Poison courses through your veins.";
  this.desc = "poison";
}
PoisonTile.prototype = new DamageOverTimeObject();

PoisonTile.prototype.applyEffect = function(silent) {
  return 1;
}

PoisonTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  DrawCharFrame();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("The poison wears off.");
  }
}

function LevitateTile() {
  this.addType("buff");
  this.name = "Levitate";
  this.display = "<span style='color:#00FFFF'>W</span>";
  this.zstatdesc = "You are able to walk on water.";
  this.desc = "Water Walk";
  this.level = 4;
}
LevitateTile.prototype = new EphemeralObject();

LevitateTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if (who) {
    who.addMovetype(MOVE_LEVITATE);
    if ((who === PC) && !silent) {
      maintext.addText("You begin to float a few inches off the ground.");
    }
  }
  return 1;
}

LevitateTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

LevitateTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.removeMovetype(MOVE_LEVITATE);
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You sink back to the ground.");
  }
  DrawCharFrame();
}

function LightTile() {
  this.addType("buff");
  this.name = "Light";
  this.display = "<span style='color:#ffff00'>L</span>";
  this.power = 2;
  this.zstatdesc = "You are followed by a glowing sphere of light.";
  this.desc = "Light";
  this.level = 1;
}
LightTile.prototype = new EphemeralObject();

LightTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  if (who) {
    who.setLight(who.getLight() + power);
    if ((who === PC) && !silent) {
      var lightdesc = "a sphere of light";
      if (power > 2) { 
        lightdesc = "a bright sphere of light"; 
        this.zstatdesc = "You are followed by a brightly glowing sphere of light.";
      }
  
      maintext.addText("You conjure " + lightdesc + ".");
    }
  }
  return 1;
}

LightTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

LightTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.setLight(who.getLight() - this.getPower());
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("Your light blinks out.");
  }
  DrawCharFrame();
}

function MirrorWardTile() {
  this.addType("buff");
  this.name = "MirrorWard";
  this.display = "<span style='color:#EEEEEE'>W</span>";
  this.zstatdesc = "You are protected by a mirror ward.";
  this.desc = "Mirror Ward";
  this.level = 5;
}
MirrorWardTile.prototype = new EphemeralObject();

MirrorWardTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("Ethereal mirrors surround and protect you.");
    }
  }
  return 1;
}

MirrorWardTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

MirrorWardTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("The mirror ward fades.");
  }
  DrawCharFrame();
}

MirrorWardTile.prototype.findNewTarget = function(caster) {
  var curtarget = this.getAttachedTo();
  
  var localnpcs = curtarget.getHomeMap().npcs.getAll();
  var newtgt = [];
  var displayspecs = getDisplayCenter(curtarget.getHomeMap(),caster.getx(),caster.gety());
  var pcdisplay = getDisplayCenter(curtarget.getHomeMap(),PC.getx(),PC.gety()); // just in case
  
  if (debug) { dbs.writeln("<span style='color:green'>MIRROR WARD is reflecting the spell...<br /></span>"); }
  $.each(localnpcs, function(idx, val) {
    if (val !== curtarget) {
      if (GetDistance(val.getx(), val.gety(), tgt.getx(), tgt.gety()) < 8.5) {
        // check for on screen from caster
        if ((displayspecs.leftedge <= val.getx()) && (val.getx() <= displayspecs.rightedge) && (displayspecs.topedge <= val.gety()) && (val.gety() <= displayspecs.bottomedge)) {
          // check for LoE from curtarget 
          if (curtarget.getHomeMap().getLOS(curtarget.getx(), curtarget.gety(), val.getx(), val.gety(), losgrid, 1) > LOS_THRESHOLD) { 
            newtgt.push(val);
          }
        }
      }
    }
  });
  
  var reflectto = curtarget;
  if (newtgt.length) {
    var roll = Math.floor(Math.random()*(newtgt.length-1));
    reflectto = newtgt[roll];
    
    if (curtarget === PC) {
      maintext.addText("Your mirror ward flashes!");
    }
    if ((caster === PC) || (caster.getAttitude === "friendly")) {
      maintext.addText("The " + curtarget.getDesc() + " is protected by a mirror ward!");
    }
  }
  
  
  this.endEffect(1); // end silently
  
  return reflectto;
  
}

function NegateMagicTile() {
  this.addType("buff");
  this.name = "NegateMagic";
  this.display = "";
  this.power = 1;
  this.zstatdesc = "Magic has been negated.";
  this.desc = "Negate Magic";
  this.level = 6;
  this.negatedmap = "";
}
NegateMagicTile.prototype = new EphemeralObject();

NegateMagicTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  who.invisible = 1;
  return 1;
}

NegateMagicTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

NegateMagicTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  var negmap = who.getHomeMap();
  delete DU.gameflags.negate[negmap.getName()];
  negmap.deleteThing(who);
  
  if (PC.getHomeMap() === negmap) {
    maintext.addText("The ether is accessible again.");
  }

  DrawCharFrame();  
  return;
}

function ProtectionTile() {
  this.addType("buff");
  this.name = "Protection";
  this.display = "<span style='color:#ffffff'>P</span>";
  this.zstatdesc = "You are protected by magic.";
  this.desc = "Protection";
  this.level = 1;
}
ProtectionTile.prototype = new EphemeralObject();

ProtectionTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You are protected by magic.");
    }
  }
  return 1;
}

ProtectionTile.prototype.doEffect = function() {
  var resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

ProtectionTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("Your protective shield wears off.");
  }
  DrawCharFrame();
  return -1;
}


function QuicknessTile() {
  this.addType("buff");
  this.name = "Quickness";
  this.display = "<span style='color:c0c0c0'>Q</span>";
  this.power = .5;
  this.zstatdesc = "You move extremely quickly.";
  this.desc = "Quickness";
  this.level = 8;
}
QuicknessTile.prototype = new EphemeralObject();


QuicknessTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  
  who.initmult *= power;
  if ((who === PC) && !silent) {
    maintext.addText("You begin to move faster.");
  }
  return 1;
}

QuicknessTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

QuicknessTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.initmult *= (1/this.getPower());
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You slow down again.");
  }
  DrawCharFrame();  
}

function SleepTile() {
  this.addType("debuff");
  this.name = "Sleep";
  this.display = "<span style='color:777777'>S</span>";
  this.zstatdesc = "You are asleep.";
  this.desc = "sleep";
}
SleepTile.prototype = new EphemeralObject();

SleepTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You fall asleep.");
  }
  return 1;
}

SleepTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

SleepTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You wake up!");
  }
  DrawCharFrame();
}

function SlowTile() {
  this.addType("debuff");
  this.name = "Slow";
  this.display = "<span style='color:444444'>S</span>";
  this.power = 2.25;
  this.zstatdesc = "You are moving more slowly.";
  this.desc = "Slow";
  this.level = 3;
}
SlowTile.prototype = new EphemeralObject();


SlowTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  
  who.initmult *= power;
  if ((who === PC) && !silent) {
    maintext.addText("You are moving more slowly.");
  }
  return 1;
}

SlowTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

SlowTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.initmult *= (1/this.getPower())
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You speed up again.");
  }
  DrawCharFrame();  
}

function VulnerabilityTile() {
  this.addType("debuff");
  this.name = "Vulnerability";
  this.display = "<span style='color:#0000ee'>V</span>";
  this.zstatdesc = "You are vulnerable to attack.";
  this.desc = "Vulnerability";
  this.level = 1;
}
VulnerabilityTile.prototype = new EphemeralObject();

VulnerabilityTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You feel vulnerable.");
  }
  return 1;
}

VulnerabilityTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

VulnerabilityTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You no longer feel vulnerable.");
  }
  DrawCharFrame();
}

// This whole thing is deprecated
var runedefs = {};
runedefs[RUNE_KINGS] = {name: "Earthbond", pre: "Rune of Kings", focus: 3};  // heal
runedefs[RUNE_WAVES] = {name: "Mana Tide", pre: "Rune of Waves", focus: 4};  // temp mana
runedefs[RUNE_WINDS] = {name: "Buffet", pre: "Rune of Winds", focus: 3};  // push back one nearby foe
runedefs[RUNE_FLAMES] = {name: "Firetouched", pre: "Rune of Flames", focus:2};  // magic resist
runedefs[RUNE_VOID] = {name: "Blank Slate", pre: "Rune of the Void", focus:0};  // ??
runedefs[RUNE_KINGS + RUNE_VOID] = {name: "Earthborn", pre: "Runes of Kings and Void", focus: 6};  // more heal
runedefs[RUNE_WAVES + RUNE_VOID] = {name: "Tidal Surge", pre: "Runes of Waves and Void", focus: 7};  // more mana
runedefs[RUNE_WINDS + RUNE_VOID] = {name: "Cyclone", pre: "Runes of Winds and Void", focus: 5};  // pushback in all directions
runedefs[RUNE_FLAMES + RUNE_VOID] = {name: "Fireblast", pre: "Runes of Flames and Void", focus: 5};  // fireball
runedefs[RUNE_KINGS + RUNE_WAVES] = {name: "Crestbearer", pre: "Runes of Kings and Waves", focus: 5}; // ??
runedefs[RUNE_KINGS + RUNE_WAVES + RUNE_VOID] = {name: "??", pre: "Runes of Kings, Waves, and Void", focus: 8}; // ??
runedefs[RUNE_KINGS + RUNE_WINDS] = {name: "Protective Gale", pre: "Runes of Kings and Winds", focus: 4};  // defense against ranged
runedefs[RUNE_KINGS + RUNE_WINDS + RUNE_VOID] = {name: "??", pre: "Runes of Kings, Winds, and Void", focus: 7}; // ??
runedefs[RUNE_KINGS + RUNE_FLAMES] = {name: "Sparkcaller", pre: "Runes of Kings and Flames", focus: 7};  // summon fire elemental
runedefs[RUNE_KINGS + RUNE_FLAMES + RUNE_VOID] = {name: "Liege of Fires", pre: "Runes of Kings, Flames, and Void", focus: 10};  // summon dragon
runedefs[RUNE_WAVES + RUNE_WINDS] = {name: "??", pre: "Runes of Waves and Winds", focus: 5}; // ??
runedefs[RUNE_WAVES + RUNE_WINDS + RUNE_VOID] = {name: "??", pre: "Runes of Waves, Winds, and Void", focus: 8}; // ??
runedefs[RUNE_WAVES + RUNE_FLAMES] = {name: "??", pre: "Runes of Waves and Flames", focus: 5}; // ??
runedefs[RUNE_WAVES + RUNE_FLAMES + RUNE_VOID] = {name: "??", pre: "Runes of Waves, Flames, and Void", focus: 8}; // ??
runedefs[RUNE_WINDS + RUNE_FLAMES] = {name: "Burning Winds", pre: "Runes of Winds and Flames", focus: 5}; // ranged fire AoE
runedefs[RUNE_WINDS + RUNE_FLAMES + RUNE_VOID] = {name: "Conflagration", pre: "Runes of Winds, Flames, and Void", focus: 8}; // fire to all foes?


"use strict";

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
  this.dispellable = 0;
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
  if ((this.getExpiresTime() > 0) && (DUTime.getGameClock() > this.getExpiresTime())) {
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
  if ((this.getExpiresTime() > 0) && (now > this.getExpiresTime())) {
    now = this.getExpiresTime();
  }
  var dur = now - prev;
  var dmg = dur * this.getDamagePerTick();
  var who = this.getAttachedTo();
  
//  alert(dmg);
//  var oldhp = who.getDisplayHP();
  var damagetype = "";
  if (this.damagetype) { damagetype = this.damagetype; }
  who.dealDamage(dmg, this, damagetype);
//  var newhp = who.getDisplayHP();
  
  if ((this.getExpiresTime()) && (now >= this.getExpiresTime())) {
    this.endEffect();
  } else {
    this.setLastTime(DUTime.getGameClock());    
  }
}

// Called "Tiles" for consistency, not because it'll ever get placed
function BlessingTile() {
  this.addType("buff");
  this.name = "Blessing";
  this.display = "<span style='color:white'>B</span>";
  this.zstatdesc = "You have been blessed.";
  this.desc = "Blessing";
  this.level = 4;
}
BlessingTile.prototype = new EphemeralObject();

BlessingTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  who.setModStr(who.getModStr() + power);
  who.setModDex(who.getModDex() + power);
  who.setModInt(who.getModInt() + power);

  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You are blessed.");
    }
  }
  return 1;
}

BlessingTile.prototype.doEffect = function() {
  var resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

BlessingTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  who.deleteSpellEffect(this);
  who.setModStr(who.getModStr() - power);
  who.setModDex(who.getModDex() - power);
  who.setModInt(who.getModInt() - power);

  if ((who === PC) && !silent) {
    maintext.addText("The blessing fades.");
  }
  DrawCharFrame();
  return -1;
}

function BlessingStrTile() {
  this.addType("buff");
  this.name = "BlessingStr";
  this.display = "<span style='color:white'>S</span>";
  this.zstatdesc = "Your strength is improved.";
  this.desc = "Strength";
  this.level = 4;
}
BlessingStrTile.prototype = new EphemeralObject();

BlessingStrTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  who.setModStr(who.getModStr() + power);

  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You feel stronger.");
    }
  }
  return 1;
}

BlessingStrTile.prototype.doEffect = function() {
  var resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

BlessingStrTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  who.deleteSpellEffect(this);
  who.setModStr(who.getModStr() - power);

  if ((who === PC) && !silent) {
    maintext.addText("Your strength returns to normal.");
  }
  DrawCharFrame();
  return -1;
}

function BlessingDexTile() {
  this.addType("buff");
  this.name = "BlessingDex";
  this.display = "<span style='color:white'>D</span>";
  this.zstatdesc = "Your dexterity is improved.";
  this.desc = "Dexterity";
  this.level = 4;
}
BlessingDexTile.prototype = new EphemeralObject();

BlessingDexTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  who.setModDex(who.getModDex() + power);

  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You feel more agile.");
    }
  }
  return 1;
}

BlessingDexTile.prototype.doEffect = function() {
  var resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

BlessingDexTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  who.deleteSpellEffect(this);
  who.setModDex(who.getModDex() - power);

  if ((who === PC) && !silent) {
    maintext.addText("Your dexterity returns to normal.");
  }
  DrawCharFrame();
  return -1;
}

function BlessingIntTile() {
  this.addType("buff");
  this.name = "BlessingInt";
  this.display = "<span style='color:white'>I</span>";
  this.zstatdesc = "Your intelligence is improved.";
  this.desc = "Intelligence";
  this.level = 4;
}
BlessingIntTile.prototype = new EphemeralObject();

BlessingIntTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  who.setModInt(who.getModInt() + power);

  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You feel smarter.");
    }
  }
  return 1;
}

BlessingIntTile.prototype.doEffect = function() {
  var resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

BlessingIntTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  who.deleteSpellEffect(this);
  who.setModInt(who.getModInt() - power);

  if ((who === PC) && !silent) {
    maintext.addText("Your intelligence returns to normal.");
  }
  DrawCharFrame();
  return -1;
}

function CharmTile() {
  this.addType("debuff");
  this.name = "Charm";
  this.display = "<span style='color:purple'>C</span>";
  this.zstatdesc = "You are charmed.";
  this.desc = "charm";
  this.level = 7;
  this.dispellable = 1;
}
CharmTile.prototype = new EphemeralObject();

CharmTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  this.oldattitude = who.getAttitude();
  who.setAttitude("friendly");
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You have been charmed!");
  }
  return 1;
}

CharmTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

CharmTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.setAttitude(this.oldattitude);
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You are once more in control of yourself!");
  }
  DrawCharFrame();
}

function ConfusedTile() {
  this.addType("debuff");
  this.name = "Confused";
  this.display = "<span style='color:grey'>C</span>";
  this.zstatdesc = "You are confused.";
  this.desc = "confuse";
  this.level = 6;
  this.dispellable = 1;
}
ConfusedTile.prototype = new EphemeralObject();

ConfusedTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You have become confused!");
  }
  return 1;
}

ConfusedTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

ConfusedTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("Your head is clear of its confusion!");
  }
  DrawCharFrame();
}

function CurseTile() {
  this.addType("debuff");
  this.name = "Curse";
  this.display = "<span style='color:red'>C</span>";
  this.zstatdesc = "You have been cursed.";
  this.desc = "Curse";
  this.level = 6;
  this.dispellable = 1;
}
CurseTile.prototype = new EphemeralObject();

CurseTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  who.setModInt(who.getModInt() - power);
  who.setModStr(who.getModInt() - power);
  who.setModDex(who.getModInt() - power);

  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You have been cursed!");
    }
  }
  return 1;
}

CurseTile.prototype.doEffect = function() {
  var resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

CurseTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  who.deleteSpellEffect(this);
  who.setModInt(who.getModInt() + power);
  who.setModStr(who.getModInt() + power);
  who.setModDex(who.getModInt() + power);

  if ((who === PC) && !silent) {
    maintext.addText("You are no longer cursed.");
  }
  DrawCharFrame();
  return -1;
}

function DiseaseTile() {
  this.addType("debuff");
  this.name = "Disease";
  this.damagePerTick = 1;
  this.display = "<span style='color:#58FA58'>D</span>";
  this.zstatdesc = "You have been infected by a disease.";
  this.desc = "disease";
  this.damagetype = "disease";
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
  this.level = 1;
  this.dispellable = 1;
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

function EtherealVisionTile() {
  this.addType("buff");
  this.name = "Telepathy";
  this.display = "<span style='color:white'>E</span>";
  this.zstatdesc = "You can detect nearby minds.";
  this.desc = "Telepathy";
  this.level = 3;
}
EtherealVisionTile.prototype = new EphemeralObject();

EtherealVisionTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("Your mind expands.");
    }
  }
  return 1;
}

EtherealVisionTile.prototype.doEffect = function() {
  var resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

EtherealVisionTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("Your mind contracts.");
  }
  DrawCharFrame();
  return -1;
}

function FearTile() {
  this.addType("debuff");
  this.name = "Fear";
  this.display = "<span style='color:purple'>F</span>";
  this.zstatdesc = "You are afraid.";
  this.desc = "fear";
  this.level = 7;
  this.dispellable = 1;
}
FearTile.prototype = new EphemeralObject();

FearTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if (who !== PC) {
    who.specials.coward = 1;
  }
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You are terrified!");
  }
  return 1;
}

FearTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

FearTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  delete who.specials.coward;
  if ((who === PC) && !silent) {
    maintext.addText("You are once more in control of yourself!");
  }
  DrawCharFrame();
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
  attacker.dealDamage(dmg, this.getAttachedTo(), "fire");
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

function FrozenTile() {
  this.addType("debuff");
  this.name = "Frozen";
  this.display = "<span style='color:lightblue'>F</span>";
  this.zstatdesc = "You are frozen.";
  this.desc = "frozen";
  this.level = 7;
  this.dispellable = 1;
}
FrozenTile.prototype = new EphemeralObject();

FrozenTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You are frozen!");
  }
  return 1;
}

FrozenTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

FrozenTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You are no longer frozen.");
  }
  DrawCharFrame();
}

function InvulnerableTile() {
  this.addType("buff");
  this.name = "Invulnerable";
  this.display = "<span style='color:cyan'>I</span>";
  this.zstatdesc = "You are invulnerable.";
  this.desc = "invulnerable";
  this.level = 7;
}
InvulnerableTile.prototype = new EphemeralObject();

InvulnerableTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You are invulnerable to damage!");
  }
  return 1;
}

InvulnerableTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

InvulnerableTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You are once more vulnerable to damage.");
  }
  DrawCharFrame();
}

function IronFleshTile() {
  this.addType("buff");
  this.name = "IronFlesh";
  this.display = "<span style='color:#aaaaaa'>I</span>";
  this.zstatdesc = "Your skin is like iron.";
  this.desc = "Iron Flesh";
  this.level = 2;
}
IronFleshTile.prototype = new EphemeralObject();

IronFleshTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("Your skin becomes hard as iron.");
    }
  }
  return 1;
}

IronFleshTile.prototype.doEffect = function() {
  var resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

IronFleshTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("Your skin returns to normal.");
  }
  DrawCharFrame();
  return -1;
}

function PoisonTile() {
  this.addType("debuff");
  this.name = "Poison";
  this.damagePerTick = 2 * (1/SCALE_TIME);  // poison is slow-maps only
  this.damagetype = "poison";
  this.display = "<span style='color:#58FA58'>P</span>";
  this.zstatdesc = "Poison courses through your veins.";
  this.desc = "poison";
  this.level = 2;
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
  
//  if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>MIRROR WARD is reflecting the spell...<br /></span>"); }
  DebugWrite("magic", "MIRROR WARD is reflecting the spell...<br />");
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

function ParalyzeTile() {
  this.addType("debuff");
  this.name = "Paralyze";
  this.display = "<span style='color:cyan'>P</span>";
  this.zstatdesc = "You are paralyzed.";
  this.desc = "paralyze";
  this.level = 5;
  this.dispellable = 1;
}
ParalyzeTile.prototype = new EphemeralObject();

ParalyzeTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You are paralyzed!");
  }
  return 1;
}

ParalyzeTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

ParalyzeTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You can move again!");
  }
  DrawCharFrame();
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
  this.display = "<span style='color:#e600e5'>S</span>";
  this.zstatdesc = "You are asleep.";
  this.desc = "sleep";
  this.level = 1;
  this.dispellable = 1;
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
  this.display = "<span style='color:777777'>S</span>";
  this.power = 2.25;
  this.zstatdesc = "You are moving more slowly.";
  this.desc = "Slow";
  this.level = 3;
  this.dispellable = 1;
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

function StormTile() {
  this.addType("buff");
  this.name = "Storm";
  this.display = "<span style='color:yellow'>S</span>";
  this.power = .5;
  this.zstatdesc = "You have summoned the storm.";
  this.desc = "Storm";
  this.level = 6;
}
StormTile.prototype = new EphemeralObject();


StormTile.prototype.applyEffect = function(silent) {
//  var who = this.getAttachedTo();
//  var power = this.getPower();
  this.lastbolt = DU.getGameClock();
  return 1;
}

StormTile.prototype.doEffect = function() {
  var who = this.getAttachedTo();
  var bolts = Math.floor((DU.getGameClock() - this.lastbolt)/SCALE_TIME)*2;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
    bolts++;
  }
  if (bolts) {
    DebugWrite("magic", "Storm fires!");
    var castermap = who.getHomeMap();
    var npcs = castermap.npcs.getAll();
    var targetlist = [];
    $.each(npcs, function (idx, val) {
      if (caster.getAttitude() !== val.getAttitude()) {
        if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),losgrid,1) <= LOS_THRESHOLD )) {
          targetlist.push(val);
        }
      }
    });
    if (targetlist.length) {
      var display = getDisplayCenter(castermap, who.getx(), who.gety());
      var cloud = new GameObject();
      cloud.x = display.centerx;
      cloud.y = display.topy;
      // animate bolt from top-center to target 
      for (var i = 0; i<bolts; i++) {
        if (targetlist.length) {
          var chosenidx = Math.floor(Math.random()*targetlength.length);
        
          var boltgraphic = {};
          boltgraphic.graphic = "fireicelightning.gif";
          boltgraphic.yoffset = -64;
          boltgraphic.xoffset = 0;
          boltgraphic.directionalammo = 1;
        
          boltgraphic = GetEffectGraphic(cloud,targetlist[chosenidx],boltgraphic);
        
          var dmg = RollDamage(DMG_MEDIUM);
          if (CheckResist(who,targetlist[chosenidx],infused,0)) {
            dmg = Math.floor(dmg/2)+1;
          }

          var desc = targetlist[chosenidx].getDesc();
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);
          var descval = {txt: desc};
          var sounds = {};
          var fromcoords = getCoords(castermap,display.centerx, display.topy);
          var tocoords = getCoords(castermap,targetlist[chosenidx].getx(), targetlist[chosenidx].gety());
          var duration = (Math.pow( Math.pow(targetlist[chosenidx].getx() - display.centerx, 2) + Math.pow (targetlist[chosenidx].gety() - display.topy, 2)  , .5)) * 50;
          var destgraphic = {graphic:"702.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
          AnimateEffect(cloud, targetlist[chosenidx], fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:0, retval:descval, dmgtype:"lightning"});
          
          targetlist.splice(chosenidx,1);
          //WORKING HERE- check over
        }        
      }
    }
  }
}

StormTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("The storm has ceased.");
  }
  DrawCharFrame();  
}

function TelepathyTile() {
  this.addType("buff");
  this.name = "Telepathy";
  this.display = "<span style='color:white'>T</span>";
  this.zstatdesc = "You can detect nearby minds.";
  this.desc = "Telepathy";
  this.level = 3;
}
TelepathyTile.prototype = new EphemeralObject();

TelepathyTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("Your mind expands.");
    }
  }
  return 1;
}

TelepathyTile.prototype.doEffect = function() {
  var resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

TelepathyTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("Your mind contracts.");
  }
  DrawCharFrame();
  return -1;
}

function TimeStopTile() {
  this.addType("buff");
  this.name = "TimeStop";
  this.display = "<span style='color:cyan'>T</span>";
  this.zstatdesc = "Time bends to your will.";
  this.desc = "time stop";
  this.level = 8;
}
TimeStopTile.prototype = new EphemeralObject();

TimeStopTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You have caused time itself to stop!");
  }
  return 1;
}

TimeStopTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
  var who = this.getAttachedTo();
  if (who.getHomeMap().getScale()) {
    who.modMana(-5);
  } else {
    who.modMana(-(who.getMana()));
  }
  if (who.getMana() <= 0) {
    this.endEffect();
  }
}

TimeStopTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("Time flows once more.");
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
  this.dispellable = 1;
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
/* var runedefs = {};
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
*/
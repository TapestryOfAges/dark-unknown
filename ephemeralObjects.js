
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
  this.display = "";
  this.attachedTo;

}
EphemeralObject.prototype = new ProtoObject();

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

DamageOverTimeObject.prototype.doEffect = function() {
  var prev = this.getLastTime();
  if (!prev) { prev = this.getCreateTime(); }
  
  var now = DUTime.getGameClock();
  if ((this.getExpiresTime()) && (now > this.getExpiresTime())) {
    now = this.getExpiresTime();
  }
  var dur = now - prev;
  var dmg = dur * this.getDamagePerTick();
  var who = this.getAttachedTo();
  
  alert(dmg);
//  var oldhp = who.getDisplayHP();
  who.dealDamage(dmg);
//  var newhp = who.getDisplayHP();
  
  if ((this.getExpiresTime()) && (now > this.getExpiresTime())) {
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

function PoisonTile() {
  this.addType("debuff");
  this.name = "Poison";
  this.damagePerTick = 2 * (1/SCALE_TIME);  // poison is slow-maps only
  this.display = "<span style='color:#58FA58'>D</span>";
  this.zstatdesc = "Poison courses through your veins.";
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

function QuicknessTile() {
  this.addType("buff");
  this.name = "Quickness";
  this.display = "<span style='color:c0c0c0'>Q</span>";
  this.power = .5;
  this.zstatdesc = "You move extremely quickly.";
}
QuicknessTile.prototype = new EphemeralObject();


QuicknessTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  
  this.oldinitmult = who.initmult;
  who.initmult = power;
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
  who.initmult = this.oldinitmult;
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

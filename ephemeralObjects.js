
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
}
PoisonTile.prototype = new DamageOverTimeObject();

PoisonTile.prototype.applyEffect = function(silent) {
  return 1;
}

PoisonTile.prototype.endEffect = function(silent) {
  var who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  DrawCharFrame();
  if (!silent) {
    maintext.delayedAddText("The poison wears off.");
  }
}

function LevitateTile() {
  this.addType("buff");
  this.name = "Levitate";
  this.display = "<span style='color:#00FFFF'>L</span>";
}
LevitateTile.prototype = new EphemeralObject();

LevitateTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  if (who) {
    who.addMovetype(MOVE_LEVITATE);
    if (!silent) {
      maintext.addText("You begin to float a few inches off the ground.");
    }
  }
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
  if (!silent) {
    maintext.addText("You sink back to the ground.");
  }
  DrawCharFrame();
}

function LightTile() {
  this.addType("buff");
  this.name = "Light";
  this.display = "<span style='color:#ffff00'>L</span>";
  this.power = 2;
}
LightTile.prototype = new EphemeralObject();

LightTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  if (who) {
    who.setLight(who.getLight() + power);
    if (!silent) {
      var lightdesc = "a sphere of light";
      if (power > 2) { lightdesc = "a bright sphere of light"; }
  
      maintext.addText("You conjure " + lightdesc + ".");
    }
  }
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
  if (!silent) {
    maintext.addText("Your light blinks out.");
  }
  DrawCharFrame();
}

function QuicknessTile() {
  this.addType("buff");
  this.name = "Quickness";
  this.display = "<span style='color:c0c0c0'>Q</span>";
  this.power = .5;
}
QuicknessTile.prototype = new EphemeralObject();


QuicknessTile.prototype.applyEffect = function(silent) {
  var who = this.getAttachedTo();
  var power = this.getPower();
  
  this.oldinitmult = who.initmult;
  who.initmult = power;
  if (!silent) {
    maintext.addText("You begin to move faster.");
  }
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
  if (!silent) {
    maintext.addText("You slow down again.");
  }
  DrawCharFrame();  
}

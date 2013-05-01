
function EphemeralObject() {

  this.type = "XEphemeralObjectX";
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
EphemeralObject.prototype = new ProtoObject;

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
  this.expiresTime = parseInt(newtime);
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
}
DamageOverTimeObject.prototype = new EphemeralObject;

DamageOverTimeObject.prototype.setDamagePerTick = function(newDoT) {
  this.damagePerTick = newDoT;
  return this.damagePerTick;
}

DamageOverTimeObject.prototype.getDamagePerTick = function() {
  return this.damagePerTick;
}

// Called "Tiles" for consistency, not because it'll ever get placed

function DiseaseTile() {
  this.addType("Debuff");
  this.addType("DoT");
  this.name = "Disease";
  this.damagePerTick = 2;
  this.display = "<span style='color:#58FA58'>D</span>";
}
DiseaseTile.prototype = new DamageOverTimeObject;

DiseaseTile.prototype.doEffect = function() {
  var prev = this.getLastTime();
  if (!prev) { prev = this.getCreateTime(); }
  alert("prev: " + prev + ", now: " + DUTime.getGameClock());
  var dur = DUTime.getGameClock() - prev;
  var dmg = dur * this.getDamagePerTick();
  var who = this.getAttachedTo();
  
//  var oldhp = who.getDisplayHP();
  who.dealDamage(dmg);
//  var newhp = who.getDisplayHP();
  
  this.setLastTime(DUTime.getGameClock());    
}
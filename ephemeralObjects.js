
function EphemeralObject() {

  this.type = "XEphemeralObjectX";
// beyond that, types are: Triggered, Spell, Buff, Debuff, OnAttack, OnHit, OnIsAttacked, OnIsHit
  this.name = "";
  this.createTime;
  this.expiresTime = 0; // 0 expires time means won't expire, replace this with a time if it will
  this.power = 1;  // the Int of the caster, usually- this is used to decide which one of several
                   // of the same spell/effect to actually have take effect
  this.active = 0;  // set to 1 if it is being allowed to take effect, see above

}
EphemeralObject.prototype = new ProtoObject;

EphemeralObject.prototype.setCreateTime = new function(newtime) {
  this.createTime = parseInt(newtime);
}

EphemeralObject.prototype.getCreateTime = new function() {
  return this.createTime;
}

EphemeralObject.prototype.setExpiresTime = new function(newtime) {
  this.expiresTime = parseInt(newtime);
}

EphemeralObject.prototype.getExpiresTime = new function() {
  return this.expiresTime;
}

EphemeralObject.prototype.setPower = new function(newpower) {
  this.power = parseInt(newpower);
  return this.power;
}

EphemeralObject.prototype.getPower = new function() {
  return this.power;
}


EphemeralObject.prototype.setActive = new function(active) {
  if (active) {
    this.active = 1;
  } else {
    this.active = 0;
  }
  return this.active;
}

EphemeralObject.prototype.getActive = new function() {
  return this.active;
}



function DamageOverTimeObject() {
  this.damagePerTick = 0;
}
DamageOverTimeObject.prototype = new EphemeralObject;

DamageOverTimeObject.prototype.setDamagePerTick = new function(newDoT) {
  this.damagePerTick = newDoT;
  return this.damagePerTick;
}

DamageOverTimeObject.prototype.getDamagePerTick = new function() {
  return this.damagePerTick;
}

function DiseaseObject() {
  this.addType("Debuff");
  this.addType("DoT");
  this.name = "Disease";
  this.damagePerTick = 2;
}
DiseaseObject.prototype = new DamageOverTimeObject;

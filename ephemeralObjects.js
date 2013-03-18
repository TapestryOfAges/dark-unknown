
function EphemeralObject() {

  this.type = "XEphemeralObjectX";
// beyond that, types are: Triggered, Spell, Buff, Debuff, OnAttack, OnHit, OnIsAttacked, OnIsHit
  this.name = "";
  this.createTime = DUTime.getGameClock();
  this.expiresTime = 0; // 0 expires time means won't expire, replace this with a time if it will

}
EphemeralObject.prototype = new ProtoObject;

function TriggeredObject() {

}
TriggeredObject.prototype = new EphemeralObject;

function DiseaseObject() {
  this.addType("Debuff");
  this.name = "Disease";
}
DiseaseObject.prototype = new TriggeredObject;

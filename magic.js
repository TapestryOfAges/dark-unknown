
var magic = new Object;

function SpellObject(name, incant, level, targets) {
  this.name = name;
  this.incant = incant;
  this.level = level;
  this.targets = targets;
   
}
SpellObject.prototype = new Object;

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

SpellObject.prototype.myTurn = function() {
  this.executeSpell();
  
	var spellEvent = new GameEvent(this);
  DUTime.addAtTimeInterval(SpellEvent,this.nextActionTime(1));
  
  var nextEntity = DUTime.executeNextEvent().getEntity();
  nextEntity.myTurn(); 
}

SpellObject.prototype.executeSpell = function() {
  // this will be overridden by each spell object
  
  return;
}

SpellObject.prototype.expireSpell = function() {
  DUTime.removeEntityFrom(this);
}

function GetSpellID(level, num) {
  var spellid = (Math.pow(2,((num-1) + ((level-1) * 6))));
  return spellid;
}

magic[GetSpellID(1,1)] = new SpellObject("Cure", "An Nox", 1, 0);
magic[GetSpellID(1,2)] = new SpellObject("Disarm Trap", "An Jux", 1, 0);
magic[GetSpellID(1,3)] = new SpellObject("Distract", "An Wis Xen", 1, 0);
magic[GetSpellID(1,4)] = new SpellObject("Flame Blade", "Flam Bet Ylem", 1, 0);
magic[GetSpellID(1,5)] = new SpellObject("Light", "In Lor", 1, 0);
magic[GetSpellID(1,6)] = new SpellObject("Strike", "An Sanct", 1, 1);

magic[GetSpellID(2,1)] = new SpellObject("Illusion", "Quas Xen", 2, 1);
magic[GetSpellID(2,2)] = new SpellObject("Lesser Heal", "Bet Mani", 2, 0);
magic[GetSpellID(2,3)] = new SpellObject("Magic Bolt", "Grav Por", 2, 1);
magic[GetSpellID(2,4)] = new SpellObject("Poison Blade", "In Nox Bet Ylem", 2, 0);
magic[GetSpellID(2,5)] = new SpellObject("Protect", "In Sanct", 2, 0);
magic[GetSpellID(2,6)] = new SpellObject("Unlock", "Ex Por", 2, 0);

magic[GetSpellID(3,1)] = new SpellObject("Fire Armor", "In Sanct Flam", 3, 0);
magic[GetSpellID(3,2)] = new SpellObject("Fireball", "Flam Por", 3, 1);
magic[GetSpellID(3,3)] = new SpellObject("Iceball", "Frio Por", 3, 1);
magic[GetSpellID(3,4)] = new SpellObject("Poison Wind", "Vas Nox Hur", 3, 0);
magic[GetSpellID(3,5)] = new SpellObject("Telekinesis", "Ylem Por", 3, 1);
magic[GetSpellID(3,6)] = new SpellObject("Wall of Flame", "Kal Flam", 3, 1);

magic[GetSpellID(4,1)] = new SpellObject("Blessing", "In Mani Xen", 4, 0);
magic[GetSpellID(4,2)] = new SpellObject("Heal", "In Mani", 4, 0);
magic[GetSpellID(4,3)] = new SpellObject("Levitate", "Uus Xen", 4, 0);
magic[GetSpellID(4,4)] = new SpellObject("Life Drain", "In Corp Mani", 4, 1);
magic[GetSpellID(4,5)] = new SpellObject("Smite", "Corp Por", 4, 0);
magic[GetSpellID(4,6)] = new SpellObject("Transport", "Rel Por", 4, 0);

magic[GetSpellID(5,1)] = new SpellObject("Mirror Ward", "Ort Sanct", 5, 0);
magic[GetSpellID(5,2)] = new SpellObject("Paralyze", "An Ex Por", 5, 1);
magic[GetSpellID(5,3)] = new SpellObject("Return", "Kal Ort Por", 5, 0);
magic[GetSpellID(5,4)] = new SpellObject("Shockwave", "Vas Grav Por Ylem", 5, 0);
magic[GetSpellID(5,5)] = new SpellObject("Summon Ally", "Kal Xen", 5, 1);
magic[GetSpellID(5,6)] = new SpellObject("Swordstrike", "Vas Jux Ylem", 5, 1);

magic[GetSpellID(6,1)] = new SpellObject("Empower", "In Ort Ylem", 6, 0);
magic[GetSpellID(6,2)] = new SpellObject("Explosion", "Vas Flam Por", 6, 1);
magic[GetSpellID(6,3)] = new SpellObject("Jinx", "Vas Quas", 6, 0);
magic[GetSpellID(6,4)] = new SpellObject("Mass Curse", "Vas An Sanct", 6, 0);
magic[GetSpellID(6,5)] = new SpellObject("Lightning Storm", "In Grav Hur", 6, 0);
magic[GetSpellID(6,6)] = new SpellObject("Negate Magic", "An Ort", 6, 0);

magic[GetSpellID(7,1)] = new SpellObject("Charm", "An Xen Ex", 7, 1);
magic[GetSpellID(7,2)] = new SpellObject("Fear", "Quas Wis", 7, 0);
magic[GetSpellID(7,3)] = new SpellObject("Fire and Ice", "Vas Frio Flam Ex Por", 7, 1);
magic[GetSpellID(7,4)] = new SpellObject("Meteor Swarm", "Vas Flam Ylem", 7, 0);
magic[GetSpellID(7,5)] = new SpellObject("Permanence", "In Vas Ort Tym", 7, 0);
magic[GetSpellID(7,6)] = new SpellObject("Summon Daemon", "Kal Vas Des Xen", 7, 1);

magic[GetSpellID(8,1)] = new SpellObject("Armageddon", "Kal Vas An Mani Corp Xen", 8, 0);
magic[GetSpellID(8,2)] = new SpellObject("Arrow of Glass", "Corp Ylem", 8, 1);
magic[GetSpellID(8,3)] = new SpellObject("Conflagration", "In Vas Grav Flam Hur", 8, 1);
magic[GetSpellID(8,4)] = new SpellObject("Quickness", "Rel Tym", 8, 0);
magic[GetSpellID(8,5)] = new SpellObject("Reincarnate", "An Corp", 8, 0);
magic[GetSpellID(8,6)] = new SpellObject("Time Stop", "An Tym", 8, 0);

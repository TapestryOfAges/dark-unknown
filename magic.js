
var magic = {};
var bookmark = {};

function SpellObject(name, incant, level, targets) {
  this.name = name;
  this.incant = incant;
  this.level = level;
  this.targets = targets;
   
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

SpellObject.prototype.myTurn = function() {
  this.executeSpell();
  
	var spellEvent = new GameEvent(this);
  DUTime.addAtTimeInterval(SpellEvent,this.nextActionTime(1));
  
  var nextEntity = DUTime.executeNextEvent().getEntity();
  nextEntity.myTurn(); 
}

SpellObject.prototype.executeSpell = function(caster, infused) {
  // this will be overridden by each spell object

  var retval = {};
  retval["fin"] = 1;
  retval["txt"] = "";
  retval["input"] = "&gt;";
  
  return retval;
}

SpellObject.prototype.expireSpell = function() {
  DUTime.removeEntityFrom(this);
}

SpellObject.prototype.getManaCost = function(infuse) {
  var multiplier = 1;
  if (infuse) { multiplier = 2; }
  var cost = this.getLevel() * multiplier;
  return cost; 
}

function GetSpellID(num) {
  var spellid = (Math.pow(2,(num-1)));
  return spellid;
}

for (var i=1;i<=8;i++) {
  magic[i] = {};
}

magic[1][GetSpellID(1)] = new SpellObject("Cure", "An Nox", 1, 0);
magic[1][GetSpellID(2)] = new SpellObject("Disarm Trap", "An Jux", 1, 0);
magic[1][GetSpellID(3)] = new SpellObject("Distract", "An Wis Xen", 1, 0);
magic[1][GetSpellID(4)] = new SpellObject("Flame Blade", "Flam Bet Ylem", 1, 0);
magic[1][GetSpellID(5)] = new SpellObject("Light", "In Lor", 1, 0);
magic[1][GetSpellID(6)] = new SpellObject("Strike", "An Sanct", 1, 1);

magic[2][GetSpellID(1)] = new SpellObject("Illusion", "Quas Xen", 2, 1);
magic[2][GetSpellID(2)] = new SpellObject("Lesser Heal", "Bet Mani", 2, 0);
magic[2][GetSpellID(3)] = new SpellObject("Magic Bolt", "Grav Por", 2, 1);
magic[2][GetSpellID(4)] = new SpellObject("Poison Blade", "In Nox Bet Ylem", 2, 0);
magic[2][GetSpellID(5)] = new SpellObject("Protect", "In Sanct", 2, 0);
magic[2][GetSpellID(6)] = new SpellObject("Unlock", "Ex Por", 2, 0);

magic[3][GetSpellID(1)] = new SpellObject("Fire Armor", "In Sanct Flam", 3, 0);
magic[3][GetSpellID(2)] = new SpellObject("Fireball", "Flam Por", 3, 1);
magic[3][GetSpellID(3)] = new SpellObject("Iceball", "Frio Por", 3, 1);
magic[3][GetSpellID(4)] = new SpellObject("Poison Wind", "Vas Nox Hur", 3, 0);
magic[3][GetSpellID(5)] = new SpellObject("Telekinesis", "Ylem Por", 3, 1);
magic[3][GetSpellID(6)] = new SpellObject("Wall of Flame", "Kal Flam", 3, 1);

magic[4][GetSpellID(1)] = new SpellObject("Blessing", "In Mani Xen", 4, 0);
magic[4][GetSpellID(2)] = new SpellObject("Heal", "In Mani", 4, 0);
magic[4][GetSpellID(3)] = new SpellObject("Levitate", "Uus Xen", 4, 0);
magic[4][GetSpellID(4)] = new SpellObject("Life Drain", "In Corp Mani", 4, 1);
magic[4][GetSpellID(5)] = new SpellObject("Smite", "Corp Por", 4, 0);
magic[4][GetSpellID(6)] = new SpellObject("Transport", "Rel Por", 4, 0);

magic[5][GetSpellID(1)] = new SpellObject("Mirror Ward", "Ort Sanct", 5, 0);
magic[5][GetSpellID(2)] = new SpellObject("Paralyze", "An Ex Por", 5, 1);
magic[5][GetSpellID(3)] = new SpellObject("Return", "Kal Ort Por", 5, 0);
magic[5][GetSpellID(4)] = new SpellObject("Shockwave", "Vas Grav Por Ylem", 5, 0);
magic[5][GetSpellID(5)] = new SpellObject("Summon Ally", "Kal Xen", 5, 1);
magic[5][GetSpellID(6)] = new SpellObject("Swordstrike", "Vas Jux Ylem", 5, 1);

magic[6][GetSpellID(1)] = new SpellObject("Empower", "In Ort Ylem", 6, 0);
magic[6][GetSpellID(2)] = new SpellObject("Explosion", "Vas Flam Por", 6, 1);
magic[6][GetSpellID(3)] = new SpellObject("Jinx", "Vas Quas", 6, 0);
magic[6][GetSpellID(4)] = new SpellObject("Mass Curse", "Vas An Sanct", 6, 0);
magic[6][GetSpellID(5)] = new SpellObject("Lightning Storm", "In Grav Hur", 6, 0);
magic[6][GetSpellID(6)] = new SpellObject("Negate Magic", "An Ort", 6, 0);

magic[7][GetSpellID(1)] = new SpellObject("Charm", "An Xen Ex", 7, 1);
magic[7][GetSpellID(2)] = new SpellObject("Fear", "Quas Wis", 7, 0);
magic[7][GetSpellID(3)] = new SpellObject("Fire and Ice", "Vas Frio Flam Ex Por", 7, 1);
magic[7][GetSpellID(4)] = new SpellObject("Meteor Swarm", "Vas Flam Ylem", 7, 0);
magic[7][GetSpellID(5)] = new SpellObject("Permanence", "In Vas Ort Tym", 7, 0);
magic[7][GetSpellID(6)] = new SpellObject("Summon Daemon", "Kal Vas Des Xen", 7, 1);

magic[8][GetSpellID(1)] = new SpellObject("Armageddon", "Kal Vas An Mani Corp Xen", 8, 0);
magic[8][GetSpellID(2)] = new SpellObject("Arrow of Glass", "Corp Ylem", 8, 1);
magic[8][GetSpellID(3)] = new SpellObject("Conflagration", "In Vas Grav Flam Hur", 8, 1);
magic[8][GetSpellID(4)] = new SpellObject("Quickness", "Rel Tym", 8, 0);
magic[8][GetSpellID(5)] = new SpellObject("Reincarnate", "An Corp", 8, 0);
magic[8][GetSpellID(6)] = new SpellObject("Time Stop", "An Tym", 8, 0);


// Cure
magic[1][GetSpellID(1)].executeSpell = function(caster, infused, free) {
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
  }
  resp["fin"] = 1;
  var effects = caster.getSpellEffects();
  if (effects) {
    for (var i=0; i<effects.length; i++) {
      if (effects[i].getName() === "Poison") {
        caster.deleteSpellEffect(effects[i]);
      }
      if ((infused) && (effects[i].getName() === "Disease")) {
        caster.deleteSpellEffect(effects[i]);
      }
    }
  }
  DrawCharFrame();
  return resp;
}


// Levitate
magic[4][GetSpellID(3)].executeSpell = function(caster, infused, free) {
  if (!free) {
    var mana = this.getManaCost(infused);
    var resp = new Object;
    caster.modMana(-1*mana);
  }
  resp["fin"] = 1;

  var levobj = localFactory.createTile("Levitate");
  caster.addSpellEffect(levobj);
  levobj.applyEffect();
  
  var dur = caster.getInt();
  if (infused) { dur = dur * 3; }
  var endtime = dur + DUTime.getGameClock();
  levobj.setPower(dur);
  levobj.setExpiresTime(endtime);
  
  DrawCharFrame();
  return resp;  
}
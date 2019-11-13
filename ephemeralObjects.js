
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
  this.zstatdesc = "";
  this.attachedTo;
  this.desc;
  this.level = 0;
  this.dispellable = 0;
}
EphemeralObject.prototype = new ProtoObject();

EphemeralObject.prototype.getZstatdesc = function() {
  return this.zstatdesc;
}

EphemeralObject.prototype.setZstatdesc = function(what) {
  this.zstatdesc = what;
}

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
  this.power = parseFloat(newpower);
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
  let resp = 0;
  if ((this.getExpiresTime() > 0) && (DUTime.getGameClock() > this.getExpiresTime())) {
    resp = this.endEffect();
    return resp;
  }
  resp = this.eachTurn();
  return resp;
}

EphemeralObject.prototype.eachTurn = function() {
  return 0;
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
  let prev = this.getLastTime();
  if (!prev) { prev = this.getCreateTime(); }
  
  let now = DUTime.getGameClock();
  if ((this.getExpiresTime() > 0) && (now > this.getExpiresTime())) {
    now = this.getExpiresTime();
  }
  let dur = now - prev;
  let dmg = dur * this.getDamagePerTick();
  let who = this.getAttachedTo();
  
  let damagetype = "";
  if (this.damagetype) { damagetype = this.damagetype; }
  who.dealDamage(dmg, this, damagetype);
  
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
  let who = this.getAttachedTo();
  let power = this.getPower();
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
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

BlessingTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  let power = this.getPower();
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
  let who = this.getAttachedTo();
  let power = this.getPower();
  who.setModStr(who.getModStr() + power);

  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You feel stronger.");
    }
  }
  return 1;
}

BlessingStrTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

BlessingStrTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  let power = this.getPower();
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
  let who = this.getAttachedTo();
  let power = this.getPower();
  who.setModDex(who.getModDex() + power);

  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You feel more agile.");
    }
  }
  return 1;
}

BlessingDexTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

BlessingDexTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  let power = this.getPower();
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
  let who = this.getAttachedTo();
  let power = this.getPower();
  who.setModInt(who.getModInt() + power);

  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You feel smarter.");
    }
  }
  return 1;
}

BlessingIntTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

BlessingIntTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  let power = this.getPower();
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
  let who = this.getAttachedTo();
  this.oldattitude = who.getAttitude();
  who.setAttitude(this.caster.getAttitude());
  delete this.caster;
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("Your head is clear of its confusion!");
  }
  DrawCharFrame();
}

function CrystalTrapTile() {
  this.addType("debuff");
  this.name = "CrystalTrap";
  this.display = "<span style='color:silver'>C</span>";
  this.zstatdesc = "You are trapped in crystal.";
  this.desc = "Crystal Trap";
  this.level = 5;  
}
CrystalTrapTile.prototype = new EphemeralObject();

CrystalTrapTile.prototype.applyEffect = function(silent) {
  let who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("Magic erupts around you and you are encased in crystal!");
  }
  who.oldoverlay = who.getOverlay();
  who.setOverlay("crystal-trap.gif");
  return 1;
}

CrystalTrapTile.prototype.onTurn = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    DebugWrite("magic", "CrystalPrison drops.");
    this.endEffect();
  }
  let who = this.getAttachedTo();
  let chance = 30 + who.getStr() - this.getPower();
  if (chance < 5) { chance = 5; }
  let rollresult = Dice.roll("1d100");
  DebugWrite("magic", who.getName() + " tries to break free of crystal prison with chance " + chance + ". Rolls: " + rollresult + ".<br />");
  if (rollresult <= chance) { 
    if (who === PC) {
      maintext.delayedAddText("With a burst of strength, you break free of the crystal prison!");
    } else {
      maintext.addText("With a burst of strength, the " + who.getDesc() + " breaks free!");
    }
    if (trap.infused) { who.dealDamage(DMG_HEAVY); }
    else { who.dealDamage(DMG_MEDIUM); }
    this.endEffect(1);
  }
  // else, didn't break free, nothing happens.
}

CrystalTrapTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  who.setOverlay(who.oldoverlay);
  if ((who === PC) && !silent) {
    maintext.addText("The crystal falls to pieces around you.");
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
  let who = this.getAttachedTo();
  let power = this.getPower();
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
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

CurseTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  let power = this.getPower();
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
  this.display = "<span style='color:#58FA58'>D</span>";
  this.zstatdesc = "You have been infected by a disease.";
  this.desc = "disease";
}
DiseaseTile.prototype = new DamageOverTimeObject();

DiseaseTile.prototype.applyEffect = function(silent) {
  let who = this.getAttachedTo();
  if (IsNonLiving(who)) {
    this.endEffect();
  }
  return 1;
}

DiseaseTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  DrawCharFrame();
}

function DisorientedTile() {
  this.addType("debuff");
  this.name = "Disoriented";
  this.display = "<span style='color:cyan'>D</span>";
  this.zstatdesc = "You are disoriented.";
  this.desc = "Disoriented";
  this.level = 1;
}
DisorientedTile.prototype = new EphemeralObject();

DisorientedTile.prototype.applyEffect = function(silent) {
  let who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You are disoriented as the floor spins beneath you!");
  }
  return 1;
}

DisorientedTile.prototype.happen = function() {
  let resp = 0;
  let dir = Dice.roll("1d3");
  if (dir === 1) { PC.moveMe(-1,0,0); }
  if (dir === 2) { PC.moveMe(1,0,0); }
  if (dir === 3) { PC.moveMe(0,1,0); }

  return resp;
}

DisorientedTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  DrawCharFrame();
  return -1;
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
  let who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You have become distracted.");
  }
  return 1;
}

DistractTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

DistractTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You are no longer distracted!");
  }
  DrawCharFrame();
  return -1;
}

function DizzyTile() {
  this.addType("debuff");
  this.name = "Dizzy";
  this.display = "<span style='color:purple'>D</span>";
  this.zstatdesc = "You are dizzy.";
  this.desc = "Dizzy";
  this.level = 1;
}
DizzyTile.prototype = new EphemeralObject();

DizzyTile.prototype.applyEffect = function(silent) {
  let who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("The whirlpool makes you dizzy!");
  }
  return 1;
}

DizzyTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

DizzyTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You are no longer dizzy.");
  }
  DrawCharFrame();
  return -1;
}

function DrunkTile() {
  this.addType("debuff");
  this.name = "Drunk";
  this.display = "<span style='color:brown'>D</span>";
  this.zstatdesc = "You are tipsy.";
  this.desc = "drunk";
}
DrunkTile.prototype = new DamageOverTimeObject();

DrunkTile.prototype.getZstatdesc = function() {
  if (this.getPower() <= 2) { return "You are tipsy."; }
  if (this.getPower() <= 4) { return "You are inebriated."; }
  return "You are drunk.";
}

DrunkTile.prototype.applyEffect = function(silent) {
  let who = this.getAttachedTo();
  if (IsNonLiving(who)) {
    this.endEffect();
  }
  let power = this.getPower();
  who.setModDex(who.getModDex() - power);
  who.setModInt(who.getModInt() - power);
  
  return 1;
}

DrunkTile.prototype.happen = function() {
  let who = this.getAttachedTo();
  let retval = {};
  if (Dice.roll("1d10") <= this.getPower()) {
    retval["txt"] = "You stumble drunkenly!";
    let dir = Dice.roll("1d6");
    if (dir === 1) { who.moveMe(0,-1,0); }
    if (dir === 2) { who.moveMe(1,0,0); }
    if (dir === 3) { who.moveMe(0,1,0); }
    if (dir === 4) { who.moveMe(-1,0,0); }  
    retval["fin"] = 1;
    return retval;
  }
  retval["fin"] = 0;
  return retval;
}

DrunkTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  let power = this.getPower();
  who.setModDex(who.getModDex() + power);
  who.setModInt(who.getModInt() + power);
  who.deleteSpellEffect(this);
  DrawCharFrame();
  if ((who === PC) && !silent) {
    maintext.addText("You sober up.");
  }
}

function EntangleTile() {
  this.addType("debuff");
  this.name = "Entangle";
  this.display = "<span style='color:darkgreen'>E</span>";
  this.zstatdesc = "You are entangled.";
  this.desc = "Entangle";
  this.level = 4;
}
EntangleTile.prototype = new EphemeralObject();

EntangleTile.prototype.applyEffect = function(silent) {
  let who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("Tentacles from the ground grip your legs!");
  }
  return 1;
}

EntangleTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  } else {
    let who = this.getAttachedTo();
    let source;
    let themap = who.getHomeMap();
    for (let i=-1;i<=1;i++) {
      for (let j=-1;j<=1;j++) {
        // is it still around to be gripping you?
        let tile = themap.getTile(who.getx()+i,who.gety()+j);
        if (tile !== "OoB") {
          let npcs = tile.getNPCs();
          for (let k=0;k<npcs.length;k++) {
            if (npcs[k].getSerial() === this.tentacleSerial) { source = npcs[k]; }
          }
        }
      }
    }
    if (!source) { resp = this.endEffect(); }
    else {
      // STR check to escape
      let chance = 30 + who.getStr() - source.getStr();
      let roll = Dice.roll("1d100");
      if (roll <= chance) {
        if (who === PC) { maintext.addText("You struggle and break free!"); }
        else { 
          let txt = who.getFullDesc() + " struggles and breaks free!";
          txt = txt.charAt(0).toUpperCase() + txt.slice(1);
          maintext.addText(txt);
        }
        resp = this.endEffect();
      }
    }
  }

  return resp;
}

EntangleTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You are no longer entangled in tentacles.");
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
  let who = this.getAttachedTo();
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("Your mind expands.");
    }
  }
  return 1;
}

EtherealVisionTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

EtherealVisionTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You are surrounded with flames.");
    }
  }
  return 1;
}

FireArmorTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

FireArmorTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("The flames that surround you fade away.");
  }
  DrawCharFrame();
  return -1;
}

FireArmorTile.prototype.flashback = function(attacker) {
  let dmg = RollDamage(this.getPower());
  if (attacker === PC) {
    maintext.addText("Flames burn you!");
  }
  let dead = attacker.dealDamage(dmg, this.getAttachedTo(), "fire");
  ShowEffect(attacker, 700, "master_spritesheet.png", -128, -1856);
  return dead;
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
  let who = this.getAttachedTo();
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
  let resp = 0;
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("Your skin becomes hard as iron.");
    }
  }
  return 1;
}

IronFleshTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

IronFleshTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("Your skin returns to normal.");
  }
  DrawCharFrame();
  return -1;
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
  let power = this.getPower();
  if (who) {
    who.setLight(who.getLight() + power);
    if ((who === PC) && !silent) {
      let lightdesc = "a sphere of light";
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("The mirror ward fades.");
  }
  DrawCharFrame();
}

MirrorWardTile.prototype.findNewTarget = function(caster) {
  let curtarget = this.getAttachedTo();
  
  let localnpcs = curtarget.getHomeMap().npcs.getAll();
  let newtgt = [];
  let displayspecs = getDisplayCenter(curtarget.getHomeMap(),caster.getx(),caster.gety());
  let pcdisplay = getDisplayCenter(curtarget.getHomeMap(),PC.getx(),PC.gety()); // just in case
  
  DebugWrite("magic", "MIRROR WARD is reflecting the spell...<br />");
  for (let i=0;i<localnpcs.length;i++){ 
    let val=localnpcs[i];
    if (val !== curtarget) {
      if (GetDistance(val.getx(), val.gety(), tgt.getx(), tgt.gety()) < 8.5) {
        // check for on screen from caster
        if ((displayspecs.leftedge <= val.getx()) && (val.getx() <= displayspecs.rightedge) && (displayspecs.topedge <= val.gety()) && (val.gety() <= displayspecs.bottomedge)) {
          // check for LoE from curtarget 
          if (curtarget.getHomeMap().getLOS(curtarget.getx(), curtarget.gety(), val.getx(), val.gety(), 1) >= LOS_THRESHOLD) { 
            newtgt.push(val);
          }
        }
      }
    }
  };
  
  let reflectto = curtarget;
  if (newtgt.length) {
    let roll = Math.floor(Math.random()*(newtgt.length-1));
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
  let who = this.getAttachedTo();
  who.invisible = 1;
  return 1;
}

NegateMagicTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

NegateMagicTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  let negmap = this.negatedmap;
  let negated = DU.gameflags.getFlag("negate");
  delete negated[negmap.getName()];
  DU.gameflags.setFlag("negate", negated);
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You can move again!");
  }
  DrawCharFrame();
}

function PhasedTile() {
  this.addType("buff");
  this.name = "Phased";
  this.display = "<span style='color:white'>P</span>";
  this.zstatdesc = "You have phased out.";
  this.desc = "Phased";
  this.level = 6;
}
PhasedTile.prototype = new EphemeralObject();

PhasedTile.prototype.applyEffect = function(silent) {
  let who = this.getAttachedTo();
  who.invisible = 1;
  
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You phase out.");
    }
  }
  return 1;
}

PhasedTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

PhasedTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  delete who.invisible;
  who.deleteSpellEffect(this);

  if ((who === PC) && !silent) {
    maintext.addText("You phase in.");
  }
  DrawCharFrame();
  return -1;
}

function PoisonTile() {
  this.addType("debuff");
  this.name = "Poison";
  this.damagePerTick = 2;  // will deal very slow damage in combat maps
  this.damagetype = "poison";
  this.display = "<span style='color:#58FA58'>P</span>";
  this.zstatdesc = "Poison courses through your veins.";
  this.desc = "poison";
  this.level = 2;
}
PoisonTile.prototype = new DamageOverTimeObject();

PoisonTile.prototype.applyEffect = function(silent) {
  let who = this.getAttachedTo();
  if (IsNonLiving(who)) {
    this.endEffect();
  }
  return 1;
}

PoisonTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  DrawCharFrame();
  if ((who === PC) && !silent) {
    maintext.addText("The poison wears off.");
  }
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
  let who = this.getAttachedTo();
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("You are protected by magic.");
    }
  }
  return 1;
}

ProtectionTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

ProtectionTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
  let power = this.getPower();
  
  who.initmult *= power;
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You begin to move more quickly.");
  }
  return 1;
}

QuicknessTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

QuicknessTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
  let power = this.getPower();
  
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
  let who = this.getAttachedTo();
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
  this.lastbolt = DU.getGameClock();
  return 1;
}

StormTile.prototype.doEffect = function() {
  let who = this.getAttachedTo();
  let bolts = Math.floor((DU.getGameClock() - this.lastbolt)/SCALE_TIME)*2;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
    bolts++;
  }
  if (bolts) {
    DebugWrite("magic", "Storm fires!");
    let castermap = who.getHomeMap();
    let npcs = castermap.npcs.getAll();
    let targetlist = [];
    for (let i=0;i<npcs.length;i++) {
      let val=npcs[i];
      if (caster.getAttitude() !== val.getAttitude()) {
        if ((GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) && (castermap.getLOS(caster.getx(), caster.gety(), val.getx(), val.gety(),1) < LOS_THRESHOLD )) {
          targetlist.push(val);
        }
      }
    };
    if (targetlist.length) {
      PlayCastSound(caster,"sfx_thunder");
      let display = getDisplayCenter(castermap, who.getx(), who.gety());
      let cloud = new GameObject();
      cloud.x = display.centerx;
      cloud.y = display.topy;
      // animate bolt from top-center to target 
      for (let i=0; i<bolts; i++) {
        if (targetlist.length) {
          let chosenidx = Math.floor(Math.random()*targetlength.length);
        
          let boltgraphic = {};
          boltgraphic.graphic = "fireicelightning.gif";
          boltgraphic.yoffset = -64;
          boltgraphic.xoffset = 0;
          boltgraphic.directionalammo = 1;
        
          boltgraphic = GetEffectGraphic(cloud,targetlist[chosenidx],boltgraphic);
        
          let dmg = RollDamage(DMG_MEDIUM);
          if (CheckResist(who,targetlist[chosenidx],infused,0)) {
            dmg = Math.floor(dmg/2)+1;
          }

          let desc = targetlist[chosenidx].getDesc();
          desc = desc.charAt(0).toUpperCase() + desc.slice(1);
          let descval = {txt: desc};
          let sounds = {};
          let fromcoords = getCoords(castermap,display.centerx, display.topy);
          let tocoords = getCoords(castermap,targetlist[chosenidx].getx(), targetlist[chosenidx].gety());
          let duration = (Math.pow( Math.pow(targetlist[chosenidx].getx() - display.centerx, 2) + Math.pow (targetlist[chosenidx].gety() - display.topy, 2)  , .5)) * 50;
          let destgraphic = {graphic:"master_spritesheet.png", xoffset:-128, yoffset:-1856, overlay:"spacer.gif"};
          AnimateEffect(cloud, targetlist[chosenidx], fromcoords, tocoords, boltgraphic, destgraphic, sounds, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:0, retval:descval, dmgtype:"lightning"});
          
          targetlist.splice(chosenidx,1);
          //WORKING HERE- check over
        }        
      }
    }
  }
}

StormTile.prototype.eachTurn = function() {
  return this.doEffect();
}

StormTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("The storm has ceased.");
  }
  DrawCharFrame();  
}

function StunnedTile() {
  this.addType("debuff");
  this.name = "Stunned";
  this.display = "<span style='color:red'>S</span>";
  this.zstatdesc = "You are stunned.";
  this.desc = "stunned";
  this.level = 5;
  this.dispellable = 0;
}
StunnedTile.prototype = new EphemeralObject();

StunnedTile.prototype.applyEffect = function(silent) {
  let who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You are stunned!");
  }
  return 1;
}

StunnedTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

StunnedTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You are no longer stunned.");
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
  let who = this.getAttachedTo();
  if (who) {
    if ((who === PC) && !silent) {
      maintext.addText("Your mind expands.");
    }
  }
  return 1;
}

TelepathyTile.prototype.doEffect = function() {
  let resp = 0;
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    resp = this.endEffect();
  }
  return resp;
}

TelepathyTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
  if ((who === PC) && !silent) {
    maintext.delayedAddText("You have caused time itself to stop!");
  }
  return 1;
}

TimeStopTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
  let who = this.getAttachedTo();
  if (who.getHomeMap().getScale()) {
    who.modMana(-5);
  } else {
    who.modMana(-(who.getMana()));
  }
  if (who.getMana() <= 0) {
    this.endEffect();
  }
}

TimeStopTile.prototype.eachTurn = function() {
  return this.doEffect();
}

TimeStopTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("Time flows once more.");
  }
  DrawCharFrame();
}

function TorchLightTile() {
  this.addType("buff");
  this.name = "TorchLight";
  this.display = "<span style='color:red'>T</span>";
  this.power = 1.5;
  this.zstatdesc = "You are carrying a lit torch.";
  this.desc = "Torch light";
}
TorchLightTile.prototype = new EphemeralObject();

TorchLightTile.prototype.applyEffect = function(silent) {
  let who = this.getAttachedTo();
  let power = this.getPower();
  if (who) {
    who.setLight(who.getLight() + power);
  }
  return 1;
}

TorchLightTile.prototype.doEffect = function() {
  if (DUTime.getGameClock() > this.getExpiresTime()) {
    this.endEffect();
  }
}

TorchLightTile.prototype.endEffect = function(silent) {
  let who = this.getAttachedTo();
  who.setLight(who.getLight() - this.getPower());
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("Your torch goes out.");
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
  let who = this.getAttachedTo();
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
  let who = this.getAttachedTo();
  who.deleteSpellEffect(this);
  if ((who === PC) && !silent) {
    maintext.addText("You no longer feel vulnerable.");
  }
  DrawCharFrame();
}



// Pseudo spell effects

function CourierFleeTile() {
  this.addType("debuff");
  this.name = "CourierFlee";
  this.display = "<span style='color:#0000ee'>C</span>";
  this.zstatdesc = "You will flee at low hp.";
  this.desc = "Courier Flee";
  this.level = 1;
  this.dispellable = 0;
}
CourierFleeTile.prototype = new EphemeralObject();

CourierFleeTile.prototype.applyEffect = function(silent) {
  return 1;
}

CourierFleeTile.prototype.doEffect = function() {
  let who = this.getAttachedTo();
  if (who.getHP() < who.getMaxHP()-50) {
    who.setHP(15);
    if (!who.specials.coward) {
      maintext.addText("The courier guard panics!");
    }
    who.specials.coward = 1;
  }
}

CourierFleeTile.prototype.eachTurn = function() {
  return this.doEffect();
}
CourierFleeTile.prototype.endEffect = function(silent) {
  return 1;
}

function CourierSurrenderTile() {
  this.addType("debuff");
  this.name = "CourierSurrender";
  this.display = "<span style='color:#0000ee'>C</span>";
  this.zstatdesc = "You will surrender without guards.";
  this.desc = "Courier Surrender";
  this.level = 1;
  this.dispellable = 0;
}
CourierSurrenderTile.prototype = new EphemeralObject();

CourierSurrenderTile.prototype.applyEffect = function(silent) {
  return 1;
}

CourierSurrenderTile.prototype.doEffect = function() {
  let who = this.getAttachedTo();
  who.setCurrentAI("Courier");
  who.setAggro(0);
  DebugWrite("ai","Set courier's AI to 'courier'.");
}

CourierSurrenderTile.prototype.eachTurn = function() {
  return this.doEffect();
}

CourierSurrenderTile.prototype.endEffect = function(silent) {
  return 1;
}


"use strict";

// Introducing multi-tile sized NPC/Groups
function MultiTileNPC(othertilearray,othertilelocationsarray) {
  this.attachedParts = [];
  this.attachedLocations = [];
  this.attachParts = function() {
    let mymap = this.getHomeMap();
    for (let i=0; i<othertilearray.length; i++) {
      this.attachedLocations[i] = [othertilelocationsarray[i][0], othertilelocationsarray[i][1]];
      let part = localFactory.createTile(othertilearray[i]);
      this.attachedParts[this.attachedParts.length] = part;
      mymap.placeThing(this.getx() + othertilelocationsarray[i][0], this.gety() + othertilelocationsarray[i][1], part,0,1);
      part.attachedTo = this;
      part.activate();
    }
  }
}


function MultiSegment() {
  this.attachedTo = {};
  this.currentAI = "segment";
  this.peaceAI = "segment";
  this.special = 'noact';  // segments turns are skipped
}
MultiSegment.prototype = new NPCObject();

// now, to override a bunch of NPCObject functions.
MultiSegment.prototype.getHP = function() {
  return this.attachedTo.getHP();
}

MultiSegment.prototype.getDefense = function() {
  return this.attachedTo.getDefense();
}

MultiSegment.prototype.setHitBySpell = function(caster,lvl) {
  return this.attachedTo.setHitBySpell(caster,lvl);
}

MultiSegment.prototype.getHitBySpell = function() {
  return this.attachedTo.getHitBySpell();
}

MultiSegment.prototype.getAlignment = function() {
  return this.attachedTo.getAlignment();
}

MultiSegment.prototype.getAttitude = function() {
  return this.attachedTo.getAttitude();
}

MultiSegment.prototype.getSpellEffects = function() {
  return this.attachedTo.getSpellEffects();
}

MultiSegment.prototype.getSpellEffectsByName = function(spname) {
  return this.attachedTo.getSpellEffectsByName(spname);
}

MultiSegment.prototype.addSpellEffect = function(speff) {
  return this.attachedTo.addSpellEffect(speff);
}

MultiSegment.prototype.deleteSpellEffect = function(speff) {
  return this.attachedTo.deleteSpellEffect(speff);
}

MultiSegment.prototype.dealDamage = function(dmg,src,type) {
  return this.attachedTo.dealDamage(dmg,src,type);
}

MultiSegment.prototype.getAbsorb = function() {
  return this.attachedTo.getAbsorb();
}

MultiSegment.prototype.getResist = function(rtype) {
  return this.attachedTo.getResist(rtype);
}

MultiSegment.prototype.getDesc = function(rtype) {
  return this.attachedTo.getDesc(rtype);
}

MultiSegment.prototype.getFullDesc = function(rtype) {
  return this.attachedTo.getFullDesc(rtype);
}

function HorseAndCartNPCTile() {
  this.name = 'HorseAndCartNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 15;
  this.int = 14;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'scheduled';
  this.forgetAt = 0;
  this.withdraw = 75;
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-1536";
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = "horse and cart";
  this.meleeChance = 30;
  this.resists = {};
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.initOverride = 10;
  this.alwaystop = 1;
  this.special = 'remain';
  this.overridecombat = 'oliviaCart';

  MultiTileNPC.call(this, ["CartSegment"], [[-1,0]]);
//  MobileEnterable.call(this, "oliviaCart", 1, 7);
}
HorseAndCartNPCTile.prototype = new NPCObject();

HorseAndCartNPCTile.prototype.swapPlace = function(orient) {
  if ((orient === "left") || ((this.spritexoffset === '-256') && (orient !== "right"))) {
    this.spritexoffset = '-224';
    this.spriteyoffset = '-1568';
    this.attachedParts[0].spritexoffset = '-256';
    this.attachedParts[0].spriteyoffset = '-1568';
    this.attachedParts[0].setx(this.getx()+1);
    this.setx(this.getx()-1);
    this.attachedLocations[0][0] = 1;
  } else {
    this.spritexoffset = '-256';
    this.spriteyoffset = '-1536';
    this.attachedParts[0].spritexoffset = '-224';
    this.attachedParts[0].spriteyoffset = '-1536';
    this.attachedParts[0].setx(this.getx()-1);
    this.attachedLocations[0][0] = -1;
    this.setx(this.getx()+1);
  }
//  console.log("Swap performed:");
//  console.log(this);
}

function CartSegmentTile() {
  this.name = "CartSegment";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-1536";
  this.alwaystop = 1;
  this.special = 'remain';
  this.overridecombat = 'oliviaCart';
//  MobileEnterable.call(this, "oliviaCart", 1, 7);
}
CartSegmentTile.prototype = new MultiSegment();

function ElderDragonNPCTile() {
  this.name = 'ElderDragonNPC';
  this.level = 8;
  this.addhp = 15;
  this.str = 30;
  this.dex = 30;
  this.int = 30;
  this.alignment = 'Evil';
  this.attitude = 'friendly';
  this.peaceAI = 'elderdragon';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'static.png';
  this.spritexoffset = 0;
  this.spriteyoffset = -167*32;
  this.level = 7;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d8+15';
  this.meleeStrDamage = 1;
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'castlechest';
  this.prefix = 'an';
  this.desc = "elder dragon";
  this.meleeChance = 70;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, };
  this.resists = { fire:50 };
  this.meleeHitSound = 'sfx_roar_hit';
  this.meleeAttackSound = 'sfx_roar_miss';
  this.special = 'miniboss,ondeathElder,reach';

  MultiTileNPC.call(this, ["ElderDragonForelimbSegment","ElderDragonHindlimbSegment","ElderDragonTailSegment"], [[0,1],[1,1],[1,0]]);

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 5,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "start"
  });

}
ElderDragonNPCTile.prototype = new NPCObject();

function ElderDragonForelimbSegmentTile() {
  this.name = "ElderDragonForelimbSegment";
  this.graphic = 'static.png';
  this.spritexoffset = 0;
  this.spriteyoffset = -168*32;
  this.alwaystop = 1;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: 5,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "start"
  });
}
ElderDragonForelimbSegmentTile.prototype = new MultiSegment();

function ElderDragonHindlimbSegmentTile() {
  this.name = "ElderDragonHindlimbSegment";
  this.graphic = 'static.png';
  this.spritexoffset = -5*32;
  this.spriteyoffset = -168*32;
  this.alwaystop = 1;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "start"
  });
}
ElderDragonHindlimbSegmentTile.prototype = new MultiSegment();

function ElderDragonTailSegmentTile() {
  this.name = "ElderDragonTailSegment";
  this.graphic = 'static.png';
  this.spritexoffset = -5*32;
  this.spriteyoffset = -167*32;
  this.alwaystop = 1;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "start"
  });
}
ElderDragonTailSegmentTile.prototype = new MultiSegment();

function TitanNPCTile() {
  this.name = 'TitanNPC';
  this.level = 8;
  this.addhp = 20;
  this.str = 30;
  this.dex = 20;
  this.int = 14;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '345.gif';
  this.altgraphic = ['379.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.missileDamage = '2d12+3'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Titan';
  this.prefix = 'a';
  this.desc = "titan";
  this.onHit = 'knockback, stun';
  this.meleeChance = 70;
  this.resists = {};
  this.special = 'open_door, reach';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';

  MultiTileNPC.call(this, ["TitanHeadSegment"], [[0,-1]])
}
TitanNPCTile.prototype = new NPCObject();

function TitanHeadSegmentTile() {
  this.name = "TitanHeadSegment";
  this.graphic = 'elderdragon.gif';
  this.movetype = MOVE_ETHEREAL;
  this.spritexoffset = 0;
  this.spriteyoffset = -32;
  this.alwaystop = 1;
}
TitanHeadSegmentTile.prototype = new MultiSegment();
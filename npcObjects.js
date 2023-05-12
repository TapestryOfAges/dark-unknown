"use strict";


// Townsfolk

function DruidVillagerNPCTile() {
  this.name = 'DruidVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 12;
  this.int = 14;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 75;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['GreenRobe'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'GreenRobe'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'SerpentStaffPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsfolk';
  this.prefix = 'a';
  this.desc = "druid";
  this.meleeChance = 30;
  this.spellsknown = { heal: 1, lowcontrol: 1, summon: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
DruidVillagerNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function ShepherdVillagerNPCTile() {
  this.name = 'ShepherdVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 12;
  this.dex = 12;
  this.int = 12;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['BrownRobe'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'BrownRobe'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'CrookPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d4+1'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsfolk';
  this.prefix = 'a';
  this.desc = "shepherd";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
ShepherdVillagerNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function MageVillagerNPCTile() {
  this.name = 'MageVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 10;
  this.int = 16;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 50;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['BlueRobePlain'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'BlueRobePlain'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'QuarterstaffPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsfolk';
  this.prefix = 'a';
  this.desc = "mage";
  this.meleeChance = 0;
  this.spellsknown = { lowcontrol: 1, summon: 1, attack: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
MageVillagerNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function TinkerVillagerNPCTile() {
  this.name = 'TinkerVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 14;
  this.int = 12;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 50;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['LeatherArmor'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'LeatherArmor'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'HammerPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d4+1'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.missileDamage = '1d3+0'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsfolk';
  this.prefix = 'a';
  this.desc = "tinker";
  this.meleeChance = 30;
  this.spellsknown = { lowcontrol: 1, attack: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
TinkerVillagerNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function RangerVillagerNPCTile() {
  this.name = 'RangerVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 11;
  this.dex = 14;
  this.int = 11;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 50;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['LeatherArmor'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'LeatherArmor'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.back = 'Quiver'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'BowPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d4+1'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.missileDamage = '1d3+0'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsfolk';
  this.prefix = 'a';
  this.desc = "ranger";
  this.meleeChance = 50;
  this.spellsknown = { heal: 1, lowcontrol: 1, summon: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
RangerVillagerNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function AdventurerVillagerNPCTile() {
  this.name = 'AdventurerVillagerNPC';
  this.level = 1;
  this.addhp = 5;
  this.str = 12;
  this.dex = 12;
  this.int = 12;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['ChainMail'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'ChainMail'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.cloak = 'BlueCloak'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'LongswordPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.missileDamage = '1d3+0'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'an';
  this.desc = "adventurer";
  this.meleeChance = 50;
  this.spellsknown = { heal: 1, lowcontrol: 1, summon: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
AdventurerVillagerNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function PaladinVillagerNPCTile() {
  this.name = 'PaladinVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 14;
  this.dex = 10;
  this.int = 12;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['PlatePaladin'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'PlatePaladin'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.cloak = 'BlueCloak'
  this.defwornlayers.offhand = 'KiteShield'
  this.defwornlayers.mainhand = 'LongswordPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsfolk';
  this.prefix = 'a';
  this.desc = "paladin";
  this.meleeChance = 75;
  this.spellsknown = { heal: 1, attack: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
PaladinVillagerNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function FighterVillagerNPCTile() {
  this.name = 'FighterVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 14;
  this.dex = 12;
  this.int = 10;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['Plate'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'Plate'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'RoundShield'
  this.defwornlayers.mainhand = 'LongswordPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.missileDamage = '1d3+0'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsfolk';
  this.prefix = 'a';
  this.desc = "fighter";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
FighterVillagerNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function TownsfolkVillagerNPCTile() {
  this.name = 'TownsfolkVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 10;
  this.int = 10;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['WhiteTunic'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'WhiteTunic'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'MainHandPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d4+1'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsfolk';
  this.prefix = 'a';
  this.desc = "citizen";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'coward, open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
TownsfolkVillagerNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function BardVillagerNPCTile() {
  this.name = 'BardVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 14;
  this.int = 12;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 66;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['Bard1'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'Bard1'
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d4+1'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.missileDamage = '1d12+1'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsfolk';
  this.prefix = 'a';
  this.desc = "bard";
  this.meleeChance = 40;
  this.spellsknown = { lowcontrol: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
BardVillagerNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function ChildVillagerNPCTile() {
  this.name = 'ChildVillagerNPC';
  this.level = 1;
  this.addhp = -2;
  this.str = 7;
  this.dex = 7;
  this.int = 7;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['ChildPale'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'ChildPale'
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 0;
  this.armorAbsorb = 0;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "small child";
  this.meleeChance = 0;
  this.resists = {};
  this.special = 'coward, open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
ChildVillagerNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function BeggarVillagerNPCTile() {
  this.name = 'BeggarVillagerNPC';
  this.level = 1;
  this.addhp = -2;
  this.str = 7;
  this.dex = 7;
  this.int = 7;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = '313.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 0;
  this.armorAbsorb = 0;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "beggar";
  this.meleeChance = 0;
  this.resists = {};
  this.special = 'coward, open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
BeggarVillagerNPCTile.prototype = new NPCObject();


// Townsfolk

function JesterNPCTile() {
  this.name = 'JesterNPC';
  this.level = 1;
  this.addhp = -2;
  this.str = 7;
  this.dex = 7;
  this.int = 7;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['Jester'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'Jester'
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 0;
  this.armorAbsorb = 0;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "jester";
  this.meleeChance = 0;
  this.resists = {};
  this.special = 'coward, open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
JesterNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function TownGuardNPCTile() {
  this.name = 'TownGuardNPC';
  this.level = 5;
  this.addhp = 0;
  this.str = 23;
  this.dex = 23;
  this.int = 14;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['PlateCheckeredTabard'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'PlateCheckeredTabard'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'HalberdPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Town Guard';
  this.prefix = 'a';
  this.desc = "guard";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'random';
}
TownGuardNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function KingNPCTile() {
  this.name = 'KingNPC';
  this.level = 8;
  this.addhp = 100;
  this.str = 30;
  this.dex = 30;
  this.int = 30;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['King3'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'King3'
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d10+22'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'ExoticArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsfolk';
  this.desc = "your father the King";
  this.meleeChance = 70;
  this.spellsknown = { heal: 1, lowcontrol: 1, summon: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'male';
}
KingNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function QueenNPCTile() {
  this.name = 'QueenNPC';
  this.level = 8;
  this.addhp = 100;
  this.str = 30;
  this.dex = 30;
  this.int = 30;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['Queen'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'Queen'
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d10+22'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'ExoticArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsfolk';
  this.desc = "your mother the Queen";
  this.meleeChance = 70;
  this.spellsknown = { heal: 1, lowcontrol: 1, summon: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'female';
}
QueenNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function PrinceNPCTile() {
  this.name = 'PrinceNPC';
  this.level = 7;
  this.addhp = 50;
  this.str = 25;
  this.dex = 25;
  this.int = 25;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['PlateKnight'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'PlateKnight'
  this.defwornlayers.head = 'PrinceHead'
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Town Guard';
  this.desc = "your brother the prince";
  this.meleeChance = 70;
  this.spellsknown = { heal: 1, lowcontrol: 1, summon: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.initOverride = 10;
  this.gender = 'male';
}
PrinceNPCTile.prototype = new NPCHumanObject();


// Townsfolk

function GhostVillagerNPCTile() {
  this.name = 'GhostVillagerNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 14;
  this.dex = 14;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 30;
  this.withdraw = 0;
  this.graphic = '330.gif';
  this.altgraphic = ['364.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+8'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'Ghost';
  this.prefix = 'a';
  this.desc = "ghost";
  this.onDamaged = 'incorporeal';
  this.meleeChance = 100;
  this.resists = { ice:50, poison:100 };
  this.special = 'undead';
  this.meleeHitSound = 'sfx_ghost_hit';
  this.meleeAttackSound = 'sfx_ghost_miss';
  this.gender = 'random';
}
GhostVillagerNPCTile.prototype = new NPCObject();


// Townsfolk

function ChickenNPCTile() {
  this.name = 'ChickenNPC';
  this.level = 1;
  this.addhp = -5;
  this.str = 3;
  this.dex = 3;
  this.int = 3;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 0;
  this.armorAbsorb = 0;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "chicken";
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -138 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
ChickenNPCTile.prototype = new NPCObject();


// Townsfolk

function RoosterNPCTile() {
  this.name = 'RoosterNPC';
  this.level = 1;
  this.addhp = -5;
  this.str = 3;
  this.dex = 3;
  this.int = 3;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 0;
  this.armorAbsorb = 0;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "chicken";
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -126 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
RoosterNPCTile.prototype = new NPCObject();


// Townsfolk

function HorseNPCTile() {
  this.name = 'HorseNPC';
  this.level = 2;
  this.addhp = 10;
  this.str = 20;
  this.dex = 12;
  this.int = 3;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'horse.gif';
  this.altgraphic = ['horse2.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "horse";
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
}
HorseNPCTile.prototype = new NPCObject();


// Townsfolk

function BullNPCTile() {
  this.name = 'BullNPC';
  this.level = 2;
  this.addhp = 10;
  this.str = 25;
  this.dex = 12;
  this.int = 3;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = '316.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "bull";
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
}
BullNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function CorruptPrinceNPCTile() {
  this.name = 'CorruptPrinceNPC';
  this.level = 7;
  this.addhp = 50;
  this.str = 25;
  this.dex = 25;
  this.int = 25;
  this.alignment = 'Evil';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['PlateKnight'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'PlateKnight'
  this.defwornlayers.head = 'PrinceHead'
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Town Guard';
  this.desc = "your brother the prince";
  this.meleeChance = 70;
  this.spellsknown = { heal: 1, lowcontrol: 1, summon: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'male';
}
CorruptPrinceNPCTile.prototype = new NPCHumanObject();


// CorruptTownsfolk

function CorruptGuardsNPCTile() {
  this.name = 'CorruptGuardsNPC';
  this.level = 4;
  this.addhp = 0;
  this.str = 20;
  this.dex = 20;
  this.int = 14;
  this.alignment = 'Evil';
  this.attitude = 'friendly';
  this.peaceAI = 'townsfolk';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['PlateCheckeredTabard'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'PlateCheckeredTabard'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'HalberdPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Town Guard';
  this.prefix = 'a';
  this.desc = "guard";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
CorruptGuardsNPCTile.prototype = new NPCHumanObject();


// CorruptTownsfolk

function CourierNPCTile() {
  this.name = 'CourierNPC';
  this.level = 2;
  this.addhp = 200;
  this.str = 10;
  this.dex = 10;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'courier';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['WhiteTunic'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'WhiteTunic'
  this.defwornlayers.head = 'ShortBrownPale'
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.missileDamage = '1d3+0'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'none';
  this.armorDefense = 1000;
  this.armorAbsorb = 1000;
  this.armorResist = 1000;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Courier';
  this.prefix = 'a';
  this.desc = "courier";
  this.meleeChance = 0;
  this.resists = {};
  this.special = 'open_door, courierSurrender';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
CourierNPCTile.prototype = new NPCHumanObject();


// CorruptTownsfolk

function CourierGuardNPCTile() {
  this.name = 'CourierGuardNPC';
  this.level = 3;
  this.addhp = 200;
  this.str = 10;
  this.dex = 10;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['PlateWhiteTabard'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'PlateWhiteTabard'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'HalberdPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'CourierGuard';
  this.prefix = 'a';
  this.desc = "courier's guard";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door, courierFlee';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
CourierGuardNPCTile.prototype = new NPCHumanObject();


// Animal

function GiantBatNPCTile() {
  this.name = 'GiantBatNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 5;
  this.dex = 15;
  this.int = 2;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.forgetAt = 15;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d4+1'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 5;
  this.armorAbsorb = 5;
  this.armorResist = 0;
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "giant bat";
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -131 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
GiantBatNPCTile.prototype = new NPCObject();


// Animal

function GiantInsectsNPCTile() {
  this.name = 'GiantInsectsNPC';
  this.level = 1;
  this.addhp = 2;
  this.str = 3;
  this.dex = 8;
  this.int = 2;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-12';
  this.forgetAt = 14;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 5;
  this.armorAbsorb = 5;
  this.armorResist = 0;
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "swarm of insects";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'mindless';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -127 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
GiantInsectsNPCTile.prototype = new NPCObject();


// Animal

function GiantRatNPCTile() {
  this.name = 'GiantRatNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 5;
  this.dex = 8;
  this.int = 2;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d4+1'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 5;
  this.armorAbsorb = 5;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Small Animal';
  this.prefix = 'a';
  this.desc = "giant rat";
  this.onHit = 'disease';
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -139 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
GiantRatNPCTile.prototype = new NPCObject();


// Monster

function HeadlessNPCTile() {
  this.name = 'HeadlessNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 12;
  this.dex = 12;
  this.int = 5;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Headlesses';
  this.prefix = 'a';
  this.desc = "headless";
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -141 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
HeadlessNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function HoodNPCTile() {
  this.name = 'HoodNPC';
  this.level = 1;
  this.addhp = 4;
  this.str = 11;
  this.dex = 9;
  this.int = 9;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['LeatherArmor'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'LeatherArmor'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandDagger'
  this.defwornlayers.mainhand = 'DaggerPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d4+1'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'a';
  this.desc = "hood";
  this.onHit = 'steal gold';
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
HoodNPCTile.prototype = new NPCHumanObject();


// CorruptTownsfolk

function MinstrelNPCTile() {
  this.name = 'MinstrelNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 12;
  this.dex = 13;
  this.int = 12;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 50;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['Bard1'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'Bard1'
  this.defwornlayers.head = 'ShortBrownPale'
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d4+1'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.missileDamage = '1d3+0'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'a';
  this.desc = "minstrel";
  this.onHit = ' ';
  this.meleeChance = 40;
  this.spellsknown = { buff: 1, };
  this.resists = {};
  this.special = 'sing, open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
MinstrelNPCTile.prototype = new NPCHumanObject();


// Monster

function SlimeNPCTile() {
  this.name = 'SlimeNPC';
  this.level = 1;
  this.addhp = 5;
  this.str = 7;
  this.dex = 7;
  this.int = 1;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 7;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d4+1'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 0;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.desc = "slime";
  this.onDamaged = 'split';
  this.meleeChance = 70;
  this.resists = { fire:20 };
  this.special = 'mindless';
  this.meleeHitSound = 'sfx_slime_hit';
  this.meleeAttackSound = 'sfx_slime_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -131 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
SlimeNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function ApprenticeNPCTile() {
  this.name = 'ApprenticeNPC';
  this.level = 2;
  this.addhp = -5;
  this.str = 8;
  this.dex = 10;
  this.int = 13;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 75;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['BlueRobePlain'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'BlueRobePlain'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'DaggerPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'an';
  this.desc = "apprentice";
  this.meleeChance = 0;
  this.spellsknown = { lowcontrol: 1, summon: 1, attack: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
ApprenticeNPCTile.prototype = new NPCHumanObject();


// CorruptTownsfolk

function FighterNPCTile() {
  this.name = 'FighterNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 13;
  this.dex = 10;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['Plate'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'Plate'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.cloak = 'RedCloak'
  this.defwornlayers.offhand = 'RoundShield'
  this.defwornlayers.mainhand = 'AxePale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'a';
  this.desc = "fighter";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
FighterNPCTile.prototype = new NPCHumanObject();


// Monster

function ImpNPCTile() {
  this.name = 'ImpNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 12;
  this.dex = 12;
  this.int = 12;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'an';
  this.desc = "imp";
  this.meleeChance = 60;
  this.spellsknown = { attack: 1, };
  this.resists = { fire:35 };
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -129 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
ImpNPCTile.prototype = new NPCObject();


// Animal

function PythonNPCTile() {
  this.name = 'PythonNPC';
  this.level = 2;
  this.addhp = -5;
  this.str = 8;
  this.dex = 12;
  this.int = 3;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d4+1'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 5;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Small Animal';
  this.prefix = 'a';
  this.desc = "python";
  this.onHit = 'venom';
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -133 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
PythonNPCTile.prototype = new NPCObject();


// Monster

function NixieNPCTile() {
  this.name = 'NixieNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 12;
  this.dex = 12;
  this.int = 12;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.missileDamage = '1d12+1'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "nixie";
  this.meleeChance = 50;
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -128 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
NixieNPCTile.prototype = new NPCObject();


// Monster

function OrcNPCTile() {
  this.name = 'OrcNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 14;
  this.dex = 10;
  this.int = 6;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 15;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Orcs';
  this.prefix = 'an';
  this.desc = "orc";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -134 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
OrcNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function RogueNPCTile() {
  this.name = 'RogueNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 10;
  this.dex = 13;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['LeatherArmor'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'LeatherArmor'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandDagger'
  this.defwornlayers.mainhand = 'ShortswordPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'a';
  this.desc = "rogue";
  this.onHit = 'steal gold';
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
RogueNPCTile.prototype = new NPCHumanObject();


// CorruptTownsfolk

function PitRogueNPCTile() {
  this.name = 'PitRogueNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 10;
  this.dex = 13;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['LeatherArmor'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'LeatherArmor'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandDagger'
  this.defwornlayers.mainhand = 'ShortswordPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Pit Rogue,Minor Adventurer';
  this.prefix = 'a';
  this.desc = "rogue";
  this.onHit = 'steal gold';
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
PitRogueNPCTile.prototype = new NPCHumanObject();


// Monster

function SkeletonNPCTile() {
  this.name = 'SkeletonNPC';
  this.level = 2;
  this.addhp = -5;
  this.str = 10;
  this.dex = 10;
  this.int = 2;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'a';
  this.desc = "skeleton";
  this.meleeChance = 100;
  this.resists = { ice:33, poison:100 };
  this.special = 'undead';
  this.meleeHitSound = 'sfx_skeleton_hit';
  this.meleeAttackSound = 'sfx_skeleton_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -132 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
SkeletonNPCTile.prototype = new NPCObject();


// Monster

function AnimatedArmorNPCTile() {
  this.name = 'AnimatedArmorNPC';
  this.level = 3;
  this.addhp = 14;
  this.str = 13;
  this.dex = 8;
  this.int = 2;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '338.gif';
  this.altgraphic = ['372.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'AnimArmor';
  this.desc = "animated armor";
  this.meleeChance = 100;
  this.resists = { poison:100 };
  this.special = 'construct, wander';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
}
AnimatedArmorNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function ArcherNPCTile() {
  this.name = 'ArcherNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 12;
  this.dex = 20;
  this.int = 11;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 66;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['WhiteTunic'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'WhiteTunic'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.back = 'Quiver'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'BowPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.missileDamage = '1d12+1'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Lesser Adventurer';
  this.prefix = 'an';
  this.desc = "archer";
  this.initmult = 0.8;
  this.meleeChance = 30;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_missile_hit';
  this.meleeAttackSound = 'sfx_missile_miss';
  this.gender = 'random';
}
ArcherNPCTile.prototype = new NPCHumanObject();


// CorruptTownsfolk

function BardNPCTile() {
  this.name = 'BardNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 12;
  this.dex = 16;
  this.int = 11;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 50;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['Bard1'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'Bard1'
  this.defwornlayers.head = 'ShortBrownPale'
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.missileDamage = '1d12+1'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Lesser Adventurer';
  this.prefix = 'a';
  this.desc = "bard";
  this.meleeChance = 40;
  this.spellsknown = { lowcontrol: 1, summon: 1, buff: 1, };
  this.resists = {};
  this.special = 'sing, open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
BardNPCTile.prototype = new NPCHumanObject();


// CorruptTownsfolk

function DruidNPCTile() {
  this.name = 'DruidNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 12;
  this.dex = 12;
  this.int = 17;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 50;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['GreenRobe'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'GreenRobe'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'SerpentStaffPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Lesser Adventurer';
  this.prefix = 'a';
  this.desc = "druid";
  this.meleeChance = 30;
  this.spellsknown = { heal: 1, lowcontrol: 1, summon: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
DruidNPCTile.prototype = new NPCHumanObject();


// Animal

function FireLizardNPCTile() {
  this.name = 'FireLizardNPC';
  this.level = 3;
  this.addhp = 4;
  this.str = 14;
  this.dex = 14;
  this.int = 6;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '349.gif';
  this.altgraphic = ['383.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+8'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "fire lizard";
  this.meleeChance = 80;
  this.resists = { fire:66 };
  this.special = 'firebreath';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
}
FireLizardNPCTile.prototype = new NPCObject();


// Monster

function FlukeNPCTile() {
  this.name = 'FlukeNPC';
  this.level = 3;
  this.addhp = 3;
  this.str = 17;
  this.dex = 121;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.forgetAt = 15;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 7;
  this.armorAbsorb = 13;
  this.armorResist = 5;
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "fluke";
  this.meleeChance = 40;
  this.spellsknown = { lowcontrol: 1, };
  this.resists = { ice:33 };
  this.special = 'whirlpool, hides:spacer.gif';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -127 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
FlukeNPCTile.prototype = new NPCObject();


// Monster

function GhostNPCTile() {
  this.name = 'GhostNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 14;
  this.dex = 14;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-20';
  this.forgetAt = 30;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+8'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'Ghost';
  this.prefix = 'a';
  this.desc = "ghost";
  this.onDamaged = 'incorporeal';
  this.meleeChance = 100;
  this.resists = { ice:50, poison:100 };
  this.special = 'undead';
  this.meleeHitSound = 'sfx_ghost_hit';
  this.meleeAttackSound = 'sfx_ghost_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -142 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
GhostNPCTile.prototype = new NPCObject();


// Animal

function GiantSpiderNPCTile() {
  this.name = 'GiantSpiderNPC';
  this.level = 3;
  this.addhp = 5;
  this.str = 12;
  this.dex = 12;
  this.int = 3;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '329.gif';
  this.altgraphic = ['363.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+8'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 5;
  this.armorAbsorb = 10;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Spiders';
  this.prefix = 'a';
  this.desc = "giant spider";
  this.onHit = 'venom';
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
}
GiantSpiderNPCTile.prototype = new NPCObject();


// Animal

function GremlinNPCTile() {
  this.name = 'GremlinNPC';
  this.level = 3;
  this.addhp = -5;
  this.str = 10;
  this.dex = 15;
  this.int = 6;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Gremlin';
  this.prefix = 'a';
  this.desc = "gremlin";
  this.onHit = 'stealfood';
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'breedsexplosively';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -145 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
GremlinNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function HandlerNPCTile() {
  this.name = 'HandlerNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 13;
  this.dex = 13;
  this.int = 13;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['BrownRobe'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'BrownRobe'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'CrookPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Lesser Adventurer';
  this.prefix = 'an';
  this.desc = "animal handler";
  this.meleeChance = 70;
  this.spellsknown = { buff: 1, };
  this.resists = {};
  this.special = 'animalhandler, open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
HandlerNPCTile.prototype = new NPCHumanObject();


// Monster

function MimicNPCTile() {
  this.name = 'MimicNPC';
  this.level = 3;
  this.addhp = 10;
  this.str = 14;
  this.dex = 2;
  this.int = 2;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-3';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '368.gif';
  this.altgraphic = ['334.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+8'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Level3';
  this.prefix = 'a';
  this.desc = "chest";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'hides:008.gif, aggroname:a mimic, spitter, stationary';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
}
MimicNPCTile.prototype = new NPCObject();


// Monster

function OrcShamanNPCTile() {
  this.name = 'OrcShamanNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 12;
  this.dex = 10;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Orcs';
  this.prefix = 'an';
  this.desc = "orc shaman";
  this.meleeChance = 33;
  this.spellsknown = { heal: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -144 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
OrcShamanNPCTile.prototype = new NPCObject();


// Animal

function GiantSnakeNPCTile() {
  this.name = 'GiantSnakeNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 13;
  this.dex = 14;
  this.int = 3;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 15;
  this.armorAbsorb = 5;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Medium Animal';
  this.prefix = 'a';
  this.desc = "giant snake";
  this.onHit = 'venom';
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'spitter';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -125 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
GiantSnakeNPCTile.prototype = new NPCObject();


// Animal

function SeahorseNPCTile() {
  this.name = 'SeahorseNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 13;
  this.dex = 13;
  this.int = 10;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '326.gif';
  this.altgraphic = ['360.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 20;
  this.armorResist = 10;
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "seahorse";
  this.meleeChance = 80;
  this.resists = {};
  this.special = 'lbolt';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
}
SeahorseNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function ThiefNPCTile() {
  this.name = 'ThiefNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 13;
  this.dex = 18;
  this.int = 14;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['LeatherArmor'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'LeatherArmor'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'ShortswordPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 15;
  this.armorAbsorb = 20;
  this.armorResist = 5;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Adventurer';
  this.prefix = 'a';
  this.desc = "thief";
  this.onHit = 'steal gold';
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
ThiefNPCTile.prototype = new NPCHumanObject();


// Monster

function TrollNPCTile() {
  this.name = 'TrollNPC';
  this.level = 3;
  this.addhp = 5;
  this.str = 16;
  this.dex = 14;
  this.int = 8;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.missileDamage = '1d12+1'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Trolls';
  this.prefix = 'a';
  this.desc = "troll";
  this.meleeChance = 50;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -143 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
TrollNPCTile.prototype = new NPCObject();


// Monster

function TwisterNPCTile() {
  this.name = 'TwisterNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 14;
  this.dex = 16;
  this.int = 6;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 8;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "twister";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'mindless, wander';
  this.meleeHitSound = 'sfx_air_hit';
  this.meleeAttackSound = 'sfx_air_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -129 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
TwisterNPCTile.prototype = new NPCObject();


// Monster

function AirElementalNPCTile() {
  this.name = 'AirElementalNPC';
  this.level = 4;
  this.addhp = 0;
  this.str = 16;
  this.dex = 20;
  this.int = 6;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'an';
  this.desc = "air elemental";
  this.meleeChance = 70;
  this.resists = {};
  this.special = 'lbolt, mindless, wander';
  this.meleeHitSound = 'sfx_air_hit';
  this.meleeAttackSound = 'sfx_air_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -125 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
AirElementalNPCTile.prototype = new NPCObject();


// Monster

function CyclopsNPCTile() {
  this.name = 'CyclopsNPC';
  this.level = 4;
  this.addhp = 10;
  this.str = 20;
  this.dex = 12;
  this.int = 8;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+8'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.missileDamage = '2d12+3'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Cyclops';
  this.prefix = 'a';
  this.desc = "cyclops";
  this.onHit = 'knockback';
  this.meleeChance = 60;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -140 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
CyclopsNPCTile.prototype = new NPCObject();


// Monster

function DeepNixieNPCTile() {
  this.name = 'DeepNixieNPC';
  this.level = 4;
  this.addhp = 0;
  this.str = 17;
  this.dex = 17;
  this.int = 15;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+8'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "deep nixie";
  this.meleeChance = 60;
  this.spellsknown = { attack: 1, buff: 1, };
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -121 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
DeepNixieNPCTile.prototype = new NPCObject();


// Monster

function DrakeNPCTile() {
  this.name = 'DrakeNPC';
  this.level = 4;
  this.addhp = 5;
  this.str = 13;
  this.dex = 15;
  this.int = 10;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 15;
  this.armorAbsorb = 33;
  this.armorResist = 25;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Level5';
  this.prefix = 'a';
  this.desc = "drake";
  this.meleeChance = 85;
  this.spellsknown = { attack: 1, };
  this.resists = { fire:50 };
  this.special = 'firebreath, wander';
  this.meleeHitSound = 'sfx_roar_hit';
  this.meleeAttackSound = 'sfx_roar_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -128 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
DrakeNPCTile.prototype = new NPCObject();


// Monster

function EarthElementalNPCTile() {
  this.name = 'EarthElementalNPC';
  this.level = 4;
  this.addhp = 10;
  this.str = 20;
  this.dex = 10;
  this.int = 6;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'earth_elemental.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 0;
  this.armorAbsorb = 50;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'an';
  this.desc = "earth elemental";
  this.initmult = 1.2;
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'mindless, wander';
  this.meleeHitSound = 'sfx_boulder_hit';
  this.meleeAttackSound = 'sfx_boulder_miss';
}
EarthElementalNPCTile.prototype = new NPCObject();


// Monster

function FireElementalNPCTile() {
  this.name = 'FireElementalNPC';
  this.level = 4;
  this.addhp = 0;
  this.str = 18;
  this.dex = 14;
  this.int = 6;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'fire_elemental.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+8'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "fire elemental";
  this.meleeChance = 60;
  this.spellsknown = { attack: 1, banned: 'Ice', };
  this.resists = { fire:100, ice:-50 };
  this.special = 'flamearmor, mindless,wander,light:1';
  this.meleeHitSound = 'sfx_fire_hit';
  this.meleeAttackSound = 'sfx_fire_miss';
}
FireElementalNPCTile.prototype = new NPCObject();


// Animal

function FireSnakeNPCTile() {
  this.name = 'FireSnakeNPC';
  this.level = 4;
  this.addhp = 0;
  this.str = 10;
  this.dex = 10;
  this.int = 3;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "fire serpent";
  this.meleeChance = 75;
  this.resists = { fire:100 };
  this.special = 'firebreath,wander';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -122 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
FireSnakeNPCTile.prototype = new NPCObject();


// Monster

function LurkerNPCTile() {
  this.name = 'LurkerNPC';
  this.level = 4;
  this.addhp = -15;
  this.str = 8;
  this.dex = 16;
  this.int = 7;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 15;
  this.armorAbsorb = 15;
  this.armorResist = 10;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Shadow2';
  this.prefix = 'a';
  this.desc = "lurker";
  this.onHit = 'entangle';
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'hides:spacer.gif,wander';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -130 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
LurkerNPCTile.prototype = new NPCObject();


// Monster

function OrcCaptainNPCTile() {
  this.name = 'OrcCaptainNPC';
  this.level = 4;
  this.addhp = 10;
  this.str = 17;
  this.dex = 13;
  this.int = 9;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.missileDamage = '1d12+1'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'High Orcs';
  this.prefix = 'an';
  this.desc = "orc captain";
  this.meleeChance = 66;
  this.spellsknown = { buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -133 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
OrcCaptainNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function PaladinNPCTile() {
  this.name = 'PaladinNPC';
  this.level = 4;
  this.addhp = 5;
  this.str = 16;
  this.dex = 16;
  this.int = 14;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['Plate'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'Plate'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'KiteShield'
  this.defwornlayers.mainhand = 'LongswordPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 35;
  this.armorAbsorb = 50;
  this.armorResist = 15;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Warduke';
  this.prefix = 'a';
  this.desc = "paladin";
  this.meleeChance = 66;
  this.spellsknown = { heal: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door,ondeathWarduke';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
PaladinNPCTile.prototype = new NPCHumanObject();


// Animal

function SeaSerpentNPCTile() {
  this.name = 'SeaSerpentNPC';
  this.level = 4;
  this.addhp = 10;
  this.str = 18;
  this.dex = 14;
  this.int = 8;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 25;
  this.armorAbsorb = 33;
  this.armorResist = 5;
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "sea serpent";
  this.meleeChance = 80;
  this.resists = {};
  this.special = 'firebreath,wander';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -134 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
SeaSerpentNPCTile.prototype = new NPCObject();


// Animal

function TremendousSpiderNPCTile() {
  this.name = 'TremendousSpiderNPC';
  this.level = 4;
  this.addhp = 10;
  this.str = 13;
  this.dex = 15;
  this.int = 5;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '329.gif';
  this.altgraphic = ['363.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 15;
  this.armorResist = 5;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Giant Spider';
  this.prefix = 'a';
  this.desc = "giant spider";
  this.onHit = 'paralyze';
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'spitter';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
}
TremendousSpiderNPCTile.prototype = new NPCObject();


// Monster

function WaterElementalNPCTile() {
  this.name = 'WaterElementalNPC';
  this.level = 4;
  this.addhp = 0;
  this.str = 16;
  this.dex = 16;
  this.int = 10;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '326.gif';
  this.altgraphic = ['360.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_SWIM + MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "water elemental";
  this.onHit = 'slow';
  this.meleeChance = 75;
  this.resists = { ice:50, fire:-25 };
  this.special = 'mindless,wander';
  this.meleeHitSound = 'sfx_water_hit';
  this.meleeAttackSound = 'sfx_water_miss';
}
WaterElementalNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function WizardNPCTile() {
  this.name = 'WizardNPC';
  this.level = 4;
  this.addhp = -5;
  this.str = 10;
  this.dex = 14;
  this.int = 20;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 50;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['BlueRobePlain'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'BlueRobePlain'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'QuarterstaffPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'High Adventurer';
  this.prefix = 'a';
  this.desc = "wizard";
  this.meleeChance = 10;
  this.spellsknown = { lowcontrol: 1, summon: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
WizardNPCTile.prototype = new NPCHumanObject();


// Monster

function CorpserNPCTile() {
  this.name = 'CorpserNPC';
  this.level = 5;
  this.addhp = -20;
  this.str = 12;
  this.dex = 18;
  this.int = 7;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.forgetAt = 15;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 30;
  this.armorAbsorb = 30;
  this.armorResist = 10;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Level4';
  this.prefix = 'a';
  this.desc = "corpser";
  this.onHit = 'entangle';
  this.meleeChance = 50;
  this.resists = {};
  this.special = 'hides:spacer.gif, reach,wander';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -137 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
CorpserNPCTile.prototype = new NPCObject();


// Monster

function EttinNPCTile() {
  this.name = 'EttinNPC';
  this.level = 5;
  this.addhp = 15;
  this.str = 20;
  this.dex = 10;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 30;
  this.armorAbsorb = 30;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Ettin';
  this.prefix = 'an';
  this.desc = "ettin";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -142 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
EttinNPCTile.prototype = new NPCObject();


// Monster

function FloorNPCTile() {
  this.name = 'FloorNPC';
  this.level = 5;
  this.addhp = -5;
  this.str = 12;
  this.dex = 12;
  this.int = 4;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '103.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'the';
  this.desc = "floor";
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
}
FloorNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function CultistNPCTile() {
  this.name = 'CultistNPC';
  this.level = 5;
  this.addhp = 0;
  this.str = 12;
  this.dex = 12;
  this.int = 12;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['BrownRobeHood'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'BrownRobeHood'
  this.defwornlayers.offhand = 'OffhandDagger'
  this.defwornlayers.mainhand = 'DaggerPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Level5';
  this.prefix = 'a';
  this.desc = "cultist";
  this.meleeChance = 80;
  this.spellsknown = { attack: 1, };
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
CultistNPCTile.prototype = new NPCHumanObject();


// Monster

function GazerNPCTile() {
  this.name = 'GazerNPC';
  this.level = 5;
  this.addhp = -5;
  this.str = 8;
  this.dex = 15;
  this.int = 16;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'Gazer';
  this.prefix = 'a';
  this.desc = "gazer";
  this.meleeChance = 20;
  this.spellsknown = { attack: 1, };
  this.resists = {};
  this.special = 'sleep, ondeathInsects, ruthless';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -135 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
GazerNPCTile.prototype = new NPCObject();


// Monster

function HydraNPCTile() {
  this.name = 'HydraNPC';
  this.level = 5;
  this.addhp = 20;
  this.str = 20;
  this.dex = 10;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Level5';
  this.prefix = 'a';
  this.desc = "hydra";
  this.onHit = 'venom';
  this.initmult = 1.2;
  this.meleeChance = 80;
  this.resists = {};
  this.special = 'firebreath, multiattack';
  this.meleeHitSound = 'sfx_roar_hit';
  this.meleeAttackSound = 'sfx_roar_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -143 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
HydraNPCTile.prototype = new NPCObject();


// Monster

function MagmaSpawnNPCTile() {
  this.name = 'MagmaSpawnNPC';
  this.level = 5;
  this.addhp = 0;
  this.str = 16;
  this.dex = 16;
  this.int = 8;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '349.gif';
  this.altgraphic = ['383.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Level4';
  this.prefix = 'a';
  this.desc = "magma spawn";
  this.meleeChance = 80;
  this.resists = {};
  this.special = 'magmaspit, magmaheal';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
}
MagmaSpawnNPCTile.prototype = new NPCObject();


// Monster

function PhantomNPCTile() {
  this.name = 'PhantomNPC';
  this.level = 5;
  this.addhp = 0;
  this.str = 14;
  this.dex = 14;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.forgetAt = 15;
  this.withdraw = 0;
  this.graphic = '338.gif';
  this.altgraphic = ['372.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'Phantom';
  this.prefix = 'a';
  this.desc = "phantom";
  this.meleeChance = 80;
  this.spellsknown = { attack: 1, };
  this.resists = { poison:100 };
  this.special = 'undead';
  this.meleeHitSound = 'sfx_ghost_hit';
  this.meleeAttackSound = 'sfx_ghost_miss';
}
PhantomNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function RangerNPCTile() {
  this.name = 'RangerNPC';
  this.level = 5;
  this.addhp = 0;
  this.str = 17;
  this.dex = 17;
  this.int = 12;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['LeatherArmor'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'LeatherArmor'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.back = 'Quiver'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'BowPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.missileDamage = '4d8+-1'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'High Adventurer';
  this.prefix = 'a';
  this.desc = "ranger";
  this.meleeChance = 25;
  this.spellsknown = { heal: 1, lowcontrol: 1, summon: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
RangerNPCTile.prototype = new NPCHumanObject();


// Monster

function WillotheWispNPCTile() {
  this.name = 'WillotheWispNPC';
  this.level = 5;
  this.addhp = 5;
  this.str = 14;
  this.dex = 18;
  this.int = 16;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 15;
  this.armorAbsorb = 20;
  this.armorResist = 30;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Willowisp';
  this.prefix = 'a';
  this.desc = "will-o-the-wisp";
  this.onHit = 'mana clash';
  this.meleeChance = 35;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, };
  this.resists = {};
  this.special = 'teleport, energy bolt,wander';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -120 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 9,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 45,
    framedurationmax: 55,
    startframe: "random"
  });
}
WillotheWispNPCTile.prototype = new NPCObject();


// Monster

function DelverNPCTile() {
  this.name = 'DelverNPC';
  this.level = 5;
  this.addhp = 5;
  this.str = 16;
  this.dex = 14;
  this.int = 9;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '350.gif';
  this.altgraphic = ['384.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 40;
  this.armorResist = 100;
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'Level5';
  this.prefix = 'a';
  this.desc = "delver";
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
}
DelverNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function ArchmageNPCTile() {
  this.name = 'ArchmageNPC';
  this.level = 6;
  this.addhp = -5;
  this.str = 10;
  this.dex = 14;
  this.int = 22;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 50;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['RedRobe'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'RedRobe'
  this.defwornlayers.head = 'ShortBrownPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'QuarterstaffPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+3'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 10;
  this.armorResist = 30;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Archmage';
  this.prefix = 'an';
  this.desc = "archmage";
  this.meleeChance = 0;
  this.spellsknown = { heal: 1, lowcontrol: 1, summon: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
ArchmageNPCTile.prototype = new NPCHumanObject();


// Monster

function BlackDragonNPCTile() {
  this.name = 'BlackDragonNPC';
  this.level = 6;
  this.addhp = 10;
  this.str = 24;
  this.dex = 24;
  this.int = 24;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-0';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Blackdragon';
  this.prefix = 'a';
  this.desc = "black dragon";
  this.meleeChance = 70;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, };
  this.resists = {};
  this.special = 'firebreath, ruthless,stationary, ondeathEndact';
  this.meleeHitSound = 'sfx_roar_hit';
  this.meleeAttackSound = 'sfx_roar_miss';
  this.xpval = 0;
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -136 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
BlackDragonNPCTile.prototype = new NPCObject();


// Monster

function DevourerNPCTile() {
  this.name = 'DevourerNPC';
  this.level = 6;
  this.addhp = 20;
  this.str = 24;
  this.dex = 14;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '352.gif';
  this.altgraphic = ['386.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Devourer';
  this.prefix = 'the';
  this.desc = "devourer";
  this.onHit = 'venom';
  this.meleeChance = 70;
  this.spellsknown = { lowcontrol: 1, buff: 1, };
  this.resists = { fire:50, ice:50 };
  this.special = 'firebreath, icebreath, multiattack';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
}
DevourerNPCTile.prototype = new NPCObject();


// Monster

function DragonNPCTile() {
  this.name = 'DragonNPC';
  this.level = 6;
  this.addhp = 15;
  this.str = 20;
  this.dex = 20;
  this.int = 20;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'dragon';
  this.prefix = 'a';
  this.desc = "dragon";
  this.meleeChance = 70;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, };
  this.resists = { fire:50 };
  this.special = 'firebreath';
  this.meleeHitSound = 'sfx_roar_hit';
  this.meleeAttackSound = 'sfx_roar_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -135 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
DragonNPCTile.prototype = new NPCObject();


// Monster

function EttinSorcererNPCTile() {
  this.name = 'EttinSorcererNPC';
  this.level = 6;
  this.addhp = 5;
  this.str = 18;
  this.dex = 14;
  this.int = 16;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '343.gif';
  this.altgraphic = ['377.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 30;
  this.armorAbsorb = 30;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Ettin Sorcerer';
  this.prefix = 'an';
  this.desc = "ettin sorcerer";
  this.meleeChance = 40;
  this.spellsknown = { heal: 1, lowcontrol: 1, summon: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
}
EttinSorcererNPCTile.prototype = new NPCObject();


// Monster

function GiantNPCTile() {
  this.name = 'GiantNPC';
  this.level = 6;
  this.addhp = 10;
  this.str = 26;
  this.dex = 16;
  this.int = 8;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '345.gif';
  this.altgraphic = ['379.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.missileDamage = '2d12+3'
  this.missileStrDamage = 0
  this.missileRange = 5
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Giant';
  this.prefix = 'a';
  this.desc = "giant";
  this.onHit = 'knockback';
  this.meleeChance = 60;
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
}
GiantNPCTile.prototype = new NPCObject();


// Monster

function KrakenNPCTile() {
  this.name = 'KrakenNPC';
  this.level = 6;
  this.addhp = 10;
  this.str = 22;
  this.dex = 18;
  this.int = 12;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 30;
  this.armorAbsorb = 30;
  this.armorResist = 0;
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "kraken";
  this.onDamaged = 'shock';
  this.meleeChance = 85;
  this.resists = {};
  this.special = 'lbolt';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -138 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
KrakenNPCTile.prototype = new NPCObject();


// Monster

function ReaperNPCTile() {
  this.name = 'ReaperNPC';
  this.level = 6;
  this.addhp = 0;
  this.str = 12;
  this.dex = 12;
  this.int = 20;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-9';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 20;
  this.armorAbsorb = 50;
  this.armorResist = 25;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Reaper';
  this.prefix = 'a';
  this.desc = "reaper";
  this.meleeChance = 50;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, buff: 1, highbuff: 1, };
  this.resists = {};
  this.special = 'ruthless,stationary';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -132 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
ReaperNPCTile.prototype = new NPCObject();


// Monster

function SpecterNPCTile() {
  this.name = 'SpecterNPC';
  this.level = 6;
  this.addhp = 0;
  this.str = 17;
  this.dex = 17;
  this.int = 17;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '330.gif';
  this.altgraphic = ['364.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'Specter';
  this.prefix = 'a';
  this.desc = "specter";
  this.onDamaged = 'incorporeal';
  this.meleeChance = 66;
  this.spellsknown = { lowcontrol: 1, summon: 1, attack: 1, };
  this.resists = { poison:100 };
  this.special = 'phase, undead';
  this.meleeHitSound = 'sfx_ghost_hit';
  this.meleeAttackSound = 'sfx_ghost_miss';
}
SpecterNPCTile.prototype = new NPCObject();


// Monster

function DaemonNPCTile() {
  this.name = 'DaemonNPC';
  this.level = 7;
  this.addhp = 20;
  this.str = 24;
  this.dex = 22;
  this.int = 20;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 40;
  this.armorAbsorb = 30;
  this.armorResist = 30;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Daemon';
  this.prefix = 'a';
  this.desc = "daemon";
  this.meleeChance = 75;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -127 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
DaemonNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function DoppelgangerNPCTile() {
  this.name = 'DoppelgangerNPC';
  this.level = 7;
  this.addhp = 5;
  this.str = 20;
  this.dex = 20;
  this.int = 20;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '307.gif';
  this.altgraphic = ['307.2.gif','paladin-offcolor.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d10+22'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.desc = "your reflection";
  this.meleeChance = 66;
  this.spellsknown = { heal: 1, attack: 1, highattack: 1, buff: 1, };
  this.resists = {};
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'random';
}
DoppelgangerNPCTile.prototype = new NPCObject();


// Monster

function EarthenTyrantNPCTile() {
  this.name = 'EarthenTyrantNPC';
  this.level = 7;
  this.addhp = 10;
  this.str = 26;
  this.dex = 15;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '350.gif';
  this.altgraphic = ['384.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 40;
  this.armorResist = 100;
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'Earthen Tyrant';
  this.prefix = 'an';
  this.desc = "earthen tyrant";
  this.meleeChance = 90;
  this.resists = {};
  this.special = 'summonearthelemental';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
}
EarthenTyrantNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function JusticeNPCTile() {
  this.name = 'JusticeNPC';
  this.level = 7;
  this.addhp = -5;
  this.str = 10;
  this.dex = 14;
  this.int = 25;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'Justice';
  this.forgetAt = 15;
  this.withdraw = 0;
  this.graphic = 'spacer.gif';
  this.spritexoffset = 0;
  this.spriteyoffset = 0;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['BlueRobe'].frames,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: 1
  });

  this.defwornlayers.body = 'BlueRobe'
  this.defwornlayers.head = 'LongBrownHairPale'
  this.defwornlayers.offhand = 'OffhandPale'
  this.defwornlayers.mainhand = 'QuarterstaffPale'

  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 15;
  this.armorAbsorb = 15;
  this.armorResist = 35;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'none';
  this.desc = "Justice";
  this.meleeChance = 0;
  this.spellsknown = { summon: 1, attack: 1, highattack: 1, };
  this.resists = {};
  this.special = 'miniboss, unkillable';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'female';
}
JusticeNPCTile.prototype = new NPCHumanObject();


// Monster

function LicheNPCTile() {
  this.name = 'LicheNPC';
  this.level = 7;
  this.addhp = -10;
  this.str = 14;
  this.dex = 16;
  this.int = 30;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '348.gif';
  this.altgraphic = ['382.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+8'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 20;
  this.armorAbsorb = 40;
  this.armorResist = 40;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "liche";
  this.meleeChance = 0;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, buff: 1, highbuff: 1, };
  this.resists = { ice:66, poison: 100 };
  this.special = 'necromancer, undead, open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.gender = 'male';
}
LicheNPCTile.prototype = new NPCObject();


// Monster

function EyesofSpiteNPCTile() {
  this.name = 'EyesofSpiteNPC';
  this.level = 7;
  this.addhp = 0;
  this.str = 14;
  this.dex = 16;
  this.int = 20;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'Eyes';
  this.prefix = 'the';
  this.desc = "eyes of spite";
  this.onHit = 'paralyze';
  this.meleeChance = 15;
  this.spellsknown = { heal: 1, lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, buff: 1, highbuff: 1, };
  this.resists = {};
  this.special = 'sleep, ondeathInsects';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -136 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
EyesofSpiteNPCTile.prototype = new NPCObject();


// Monster

function ReaperLordNPCTile() {
  this.name = 'ReaperLordNPC';
  this.level = 7;
  this.addhp = 0;
  this.str = 14;
  this.dex = 12;
  this.int = 22;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-9';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '335.gif';
  this.altgraphic = ['369.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d4+15'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 25;
  this.armorAbsorb = 50;
  this.armorResist = 40;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Reaper Lord';
  this.prefix = 'a';
  this.desc = "reaper lord";
  this.meleeChance = 50;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, buff: 1, highbuff: 1, };
  this.resists = {};
  this.special = 'ruthless,stationary';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
}
ReaperLordNPCTile.prototype = new NPCObject();


// Monster

function ShadowNPCTile() {
  this.name = 'ShadowNPC';
  this.level = 7;
  this.addhp = 0;
  this.str = 17;
  this.dex = 17;
  this.int = 17;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.graphic = '330.gif';
  this.altgraphic = ['364.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '4d4+9'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "shadow";
  this.onDamaged = 'incorporeal';
  this.meleeChance = 66;
  this.spellsknown = { attack: 1, highattack: 1, };
  this.resists = { poison:100 };
  this.special = 'phase,undead,ondeathShadow';
  this.meleeHitSound = 'sfx_ghost_hit';
  this.meleeAttackSound = 'sfx_ghost_miss';
}
ShadowNPCTile.prototype = new NPCObject();


// Monster

function ElderDragonNPCTile() {
  this.name = 'ElderDragonNPC';
  this.level = 8;
  this.addhp = 40;
  this.str = 28;
  this.dex = 26;
  this.int = 30;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-12';
  this.forgetAt = 13;
  this.withdraw = 0;
  this.graphic = 'elder_dragon.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d10+22'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'ExoticArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'Elder Dragon';
  this.prefix = 'an';
  this.desc = "elder dragon";
  this.meleeChance = 65;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, buff: 1, highbuff: 1, };
  this.resists = { fire:50 };
  this.special = 'firebreath';
  this.meleeHitSound = 'sfx_roar_hit';
  this.meleeAttackSound = 'sfx_roar_miss';
}
ElderDragonNPCTile.prototype = new NPCObject();


// Monster

function BalronNPCTile() {
  this.name = 'BalronNPC';
  this.level = 8;
  this.addhp = 25;
  this.str = 26;
  this.dex = 26;
  this.int = 26;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d10+22'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Balron';
  this.prefix = 'a';
  this.desc = "balron";
  this.meleeChance = 75;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, };
  this.resists = { fire:100 };
  this.special = 'phase, open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -126 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
BalronNPCTile.prototype = new NPCObject();


// Monster

function ArchdaemonOfAshesNPCTile() {
  this.name = 'ArchdaemonOfAshesNPC';
  this.level = 8;
  this.addhp = 25;
  this.str = 26;
  this.dex = 26;
  this.int = 26;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 15;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d10+22'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'archdaemon_ashes';
  this.prefix = 'an';
  this.desc = "archdaemon";
  this.meleeChance = 75;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, banned: 'Ice', };
  this.resists = { fire:60, ice:30,poison: 60 };
  this.special = 'archdaemon_ashes, noflee';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -126 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
ArchdaemonOfAshesNPCTile.prototype = new NPCObject();


// Monster

function ArchdaemonOfDustNPCTile() {
  this.name = 'ArchdaemonOfDustNPC';
  this.level = 8;
  this.addhp = 25;
  this.str = 26;
  this.dex = 26;
  this.int = 26;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 15;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d10+22'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'archdaemon_dust';
  this.prefix = 'an';
  this.desc = "archdaemon";
  this.meleeChance = 75;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, attack: 1, highattack: 1, };
  this.resists = { fire:40, ice:40,poison: 60 };
  this.special = 'archdaemon_dust, noflee';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -126 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
ArchdaemonOfDustNPCTile.prototype = new NPCObject();


// Monster

function ArchdaemonOfIceNPCTile() {
  this.name = 'ArchdaemonOfIceNPC';
  this.level = 8;
  this.addhp = 25;
  this.str = 26;
  this.dex = 26;
  this.int = 26;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 15;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d10+22'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'archdaemon_ice';
  this.prefix = 'an';
  this.desc = "archdaemon";
  this.meleeChance = 75;
  this.spellsknown = { lowcontrol: 1, highcontrol: 1, summon: 1, attack: 1, highattack: 1, banned: 'Fire', };
  this.resists = { fire:30, ice:60,poison: 60 };
  this.special = 'archdaemon_ice, noflee';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -126 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
ArchdaemonOfIceNPCTile.prototype = new NPCObject();


// Monster

function ArchdaemonOfBoneNPCTile() {
  this.name = 'ArchdaemonOfBoneNPC';
  this.level = 8;
  this.addhp = 25;
  this.str = 26;
  this.dex = 26;
  this.int = 26;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 15;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d10+22'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'archdaemon_bone';
  this.prefix = 'an';
  this.desc = "archdaemon";
  this.meleeChance = 75;
  this.spellsknown = { summon: 1, attack: 1, highattack: 1, };
  this.resists = { fire:40, ice:40,poison: 60 };
  this.special = 'archdaemon_bone, noflee';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -126 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
ArchdaemonOfBoneNPCTile.prototype = new NPCObject();


// Monster

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
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
}
TitanNPCTile.prototype = new NPCObject();


// Monster

function AbyssalKrakenNPCTile() {
  this.name = 'AbyssalKrakenNPC';
  this.level = 9;
  this.addhp = 50;
  this.str = 30;
  this.dex = 30;
  this.int = 20;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-12';
  this.forgetAt = 12;
  this.withdraw = 0;
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d10+22'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'an';
  this.desc = "abyssal kraken";
  this.onDamaged = 'shock';
  this.meleeChance = 90;
  this.resists = {};
  this.special = 'lbolt';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -137 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 120,
    framedurationmax: 170,
    startframe: "random"
  });
}
AbyssalKrakenNPCTile.prototype = new NPCObject();


// Monster

function ShepherdOfDarkNPCTile() {
  this.name = 'ShepherdOfDarkNPC';
  this.level = 100;
  this.addhp = 10000;
  this.str = 30;
  this.dex = 30;
  this.int = 30;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'Darkness';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = '354.gif';
  this.altgraphic = ['388.gif',];
  this.meleeAttackAs = 'none';
  this.meleeDamage = '5d10+22'
  this.meleeStrDamage = 1
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'the';
  this.desc = "Shepherd of the Dark";
  this.meleeChance = 0;
  this.resists = {};
}
ShepherdOfDarkNPCTile.prototype = new NPCObject();


// Summoned

function IllusionNPCTile() {
  this.name = 'IllusionNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 15;
  this.dex = 15;
  this.int = 15;
  this.alignment = 'Good';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = '338.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+1'
  this.meleeStrDamage = .5
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'an';
  this.desc = "illusion";
  this.onDamaged = 'die';
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'mindless';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.xpval = 0;
}
IllusionNPCTile.prototype = new NPCObject();


// Summoned

function InfusedIllusionNPCTile() {
  this.name = 'InfusedIllusionNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 18;
  this.dex = 18;
  this.int = 18;
  this.alignment = 'Good';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = '338.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '2d4+8'
  this.meleeStrDamage = .66
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'an';
  this.desc = "illusion";
  this.onDamaged = 'die';
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'mindless';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
  this.xpval = 0;
}
InfusedIllusionNPCTile.prototype = new NPCObject();


// Sentinel

function ToshinSentinelNPCTile() {
  this.name = 'ToshinSentinelNPC';
  this.level = 8;
  this.addhp = 20;
  this.str = 30;
  this.dex = 30;
  this.int = 30;
  this.alignment = 'Neutral';
  this.attitude = 'neutral';
  this.peaceAI = 'Sentinel';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'sentinel.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'ExoticArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "floating sentinel";
  this.meleeChance = 0;
  this.resists = { fire:100, poison:100 };
  this.special = 'unkillable';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
}
ToshinSentinelNPCTile.prototype = new NPCObject();


// Townsfolk

function AbyssYouNPCTile() {
  this.name = 'AbyssYouNPC';
  this.level = 8;
  this.addhp = 20;
  this.str = 30;
  this.dex = 30;
  this.int = 30;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'abyssyou ';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = '388.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 2000;
  this.armorAbsorb = 2000;
  this.armorResist = 2000;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.desc = "yourself";
  this.meleeChance = 0;
  this.resists = {};
  this.special = 'mirror';
  this.meleeHitSound = 'sfx_melee_hit';
  this.meleeAttackSound = 'sfx_melee_miss';
}
AbyssYouNPCTile.prototype = new NPCObject();


// Sentinel

function NegatorGnomeNPCTile() {
  this.name = 'NegatorGnomeNPC';
  this.level = 8;
  this.addhp = 0;
  this.str = 30;
  this.dex = 30;
  this.int = 30;
  this.alignment = 'Neutral';
  this.attitude = 'friendly';
  this.peaceAI = 'negator';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'sentinel.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "negator gnome";
  this.meleeChance = 0;
  this.resists = {};
}
NegatorGnomeNPCTile.prototype = new NPCObject();


// Summoned

function CrystalBarrierNPCTile() {
  this.name = 'CrystalBarrierNPC';
  this.level = 3;
  this.addhp = 5;
  this.str = 10;
  this.dex = 3;
  this.int = 3;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-0';
  this.forgetAt = 0;
  this.withdraw = 0;
  this.graphic = 'crystals.gif';
  this.meleeAttackAs = 'none';
  this.meleeDamage = '1d2'
  this.meleeStrDamage = .33
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 0;
  this.armorAbsorb = 30;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "crystal barrier";
  this.meleeChance = 0;
  this.resists = { fire:30, poison:100 };
  this.special = 'crumbles,stationary,noact,ondeathDestroyCrystal';
  this.xpval = 0;
}
CrystalBarrierNPCTile.prototype = new NPCObject();

function GiantRatGroupTinyTile() {
  this.name = 'GiantRatGroupTiny';
  this.desc = 'giant rats';
  this.peaceAI = 'Animal-15';
  this.group = [];
  this.group[0] = new NPCList('GiantRatNPC', '1d2+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -139 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
GiantRatGroupTinyTile.prototype = new NPCGroupObject();

function GiantRatGroupSmallTile() {
  this.name = 'GiantRatGroupSmall';
  this.desc = 'giant rats';
  this.peaceAI = 'Animal-15';
  this.group = [];
  this.group[0] = new NPCList('GiantRatNPC', '1d3+2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -139 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
GiantRatGroupSmallTile.prototype = new NPCGroupObject();

function GiantRatGroupLargeTile() {
  this.name = 'GiantRatGroupLarge';
  this.desc = 'giant rats';
  this.peaceAI = 'Animal-15';
  this.group = [];
  this.group[0] = new NPCList('GiantRatNPC', '1d5+4');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -139 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
GiantRatGroupLargeTile.prototype = new NPCGroupObject();

function OrcGroupTinyTile() {
  this.name = 'OrcGroupTiny';
  this.desc = 'orcs';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d2+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -134 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
OrcGroupTinyTile.prototype = new NPCGroupObject();

function OrcGroupSmallTile() {
  this.name = 'OrcGroupSmall';
  this.desc = 'orcs';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d3+2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -134 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
OrcGroupSmallTile.prototype = new NPCGroupObject();

function OrcGroupLargeTile() {
  this.name = 'OrcGroupLarge';
  this.desc = 'orcs';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d5+4');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -134 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
OrcGroupLargeTile.prototype = new NPCGroupObject();

function HoodGroupTinyTile() {
  this.name = 'HoodGroupTiny';
  this.desc = 'hoods';
  this.peaceAI = 'Bandit-15';
  this.graphic = '375.gif';
  this.altgraphic = ['341.gif',];
  this.group = [];
  this.group[0] = new NPCList('HoodNPC', '1d2+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
HoodGroupTinyTile.prototype = new NPCGroupObject();

function HoodGroupSmallTile() {
  this.name = 'HoodGroupSmall';
  this.desc = 'hoods';
  this.peaceAI = 'Bandit-15';
  this.graphic = '375.gif';
  this.altgraphic = ['341.gif',];
  this.group = [];
  this.group[0] = new NPCList('HoodNPC', '1d3+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
HoodGroupSmallTile.prototype = new NPCGroupObject();

function HoodGroupLargeTile() {
  this.name = 'HoodGroupLarge';
  this.desc = 'hoods';
  this.peaceAI = 'Bandit-15';
  this.graphic = '375.gif';
  this.altgraphic = ['341.gif',];
  this.group = [];
  this.group[0] = new NPCList('HoodNPC', '1d3+3');
  this.group[1] = new NPCList('MinstrelNPC', '1d1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
HoodGroupLargeTile.prototype = new NPCGroupObject();

function RogueGroupSmallTile() {
  this.name = 'RogueGroupSmall';
  this.desc = 'rogues';
  this.peaceAI = 'Bandit-15';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('RogueNPC', '1d3+2');
  this.group[1] = new NPCList('HoodNPC', '1d3+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
RogueGroupSmallTile.prototype = new NPCGroupObject();

function PitRogueGroupSmallTile() {
  this.name = 'PitRogueGroupSmall';
  this.desc = 'rogues';
  this.peaceAI = 'Bandit-15';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('PitRogueNPC', '1d3+2');
  this.group[1] = new NPCList('HoodNPC', '1d3+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
PitRogueGroupSmallTile.prototype = new NPCGroupObject();

function RogueGroupLargeTile() {
  this.name = 'RogueGroupLarge';
  this.desc = 'rogues';
  this.peaceAI = 'Bandit-15';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('RogueNPC', '1d4+3');
  this.group[1] = new NPCList('HoodNPC', '1d3+2');
  this.group[2] = new NPCList('MinstrelNPC', '1d2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
RogueGroupLargeTile.prototype = new NPCGroupObject();

function ThiefGroupSmallTile() {
  this.name = 'ThiefGroupSmall';
  this.desc = 'thieves';
  this.peaceAI = 'Bandit-15';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('ThiefNPC', '1d3+2');
  this.group[1] = new NPCList('RogueNPC', '1d3+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
ThiefGroupSmallTile.prototype = new NPCGroupObject();

function ThiefGroupLargeTile() {
  this.name = 'ThiefGroupLarge';
  this.desc = 'thieves';
  this.peaceAI = 'Bandit-15';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('ThiefNPC', '1d4+3');
  this.group[1] = new NPCList('RogueNPC', '1d3+2');
  this.group[2] = new NPCList('MinstrelNPC', '1d2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
ThiefGroupLargeTile.prototype = new NPCGroupObject();

function LowbiePartyGroupTile() {
  this.name = 'LowbiePartyGroup';
  this.desc = 'a party of adventurers';
  this.peaceAI = 'Bandit-15';
  this.graphic = '308.gif';
  this.group = [];
  this.group[0] = new NPCList('FighterNPC', '1d2');
  this.group[1] = new NPCList('RogueNPC', '1d2');
  this.group[2] = new NPCList('MinstrelNPC', '1d2-1');
  this.group[3] = new NPCList('ApprenticeNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
}
LowbiePartyGroupTile.prototype = new NPCGroupObject();

function HeadlessGroupTinyTile() {
  this.name = 'HeadlessGroupTiny';
  this.desc = 'headlesses';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('HeadlessNPC', '1d2+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -141 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
HeadlessGroupTinyTile.prototype = new NPCGroupObject();

function HeadlessGroupSmallTile() {
  this.name = 'HeadlessGroupSmall';
  this.desc = 'headlesses';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('HeadlessNPC', '1d4+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -141 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
HeadlessGroupSmallTile.prototype = new NPCGroupObject();

function HeadlessGroupLargeTile() {
  this.name = 'HeadlessGroupLarge';
  this.desc = 'headlesses';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('HeadlessNPC', '1d5+2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -141 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
HeadlessGroupLargeTile.prototype = new NPCGroupObject();

function SnakesGroupSmallTile() {
  this.name = 'SnakesGroupSmall';
  this.desc = 'giant snakes';
  this.peaceAI = 'Animal-15';
  this.group = [];
  this.group[0] = new NPCList('PythonNPC', '1d2+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -133 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
SnakesGroupSmallTile.prototype = new NPCGroupObject();

function SnakesGroupTile() {
  this.name = 'SnakesGroup';
  this.desc = 'giant snakes';
  this.peaceAI = 'Animal-15';
  this.group = [];
  this.group[0] = new NPCList('PythonNPC', '1d4+2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -133 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
SnakesGroupTile.prototype = new NPCGroupObject();

function MidSnakesGroupTile() {
  this.name = 'MidSnakesGroup';
  this.desc = 'giant snakes';
  this.peaceAI = 'Animal-15';
  this.group = [];
  this.group[0] = new NPCList('PythonNPC', '1d4+2');
  this.group[1] = new NPCList('GiantSnakeNPC', '1d2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -133 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
MidSnakesGroupTile.prototype = new NPCGroupObject();

function DrakesSmallGroupTile() {
  this.name = 'DrakesSmallGroup';
  this.desc = 'drakes';
  this.peaceAI = 'Animal-15';
  this.group = [];
  this.group[0] = new NPCList('DrakeNPC', '1d4+1');
  this.movetype = MOVE_FLY;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -133 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
DrakesSmallGroupTile.prototype = new NPCGroupObject();

function DrakesLargeGroupTile() {
  this.name = 'DrakesLargeGroup';
  this.desc = 'drakes';
  this.peaceAI = 'Animal-15';
  this.group = [];
  this.group[0] = new NPCList('DrakeNPC', '1d6+1');
  this.group[1] = new NPCList('DragonNPC', '1d2-1');
  this.movetype = MOVE_FLY;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -133 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
DrakesLargeGroupTile.prototype = new NPCGroupObject();

function DragonsGroupTile() {
  this.name = 'DragonsGroup';
  this.desc = 'dragons';
  this.peaceAI = 'Animal-15';
  this.group = [];
  this.group[0] = new NPCList('DrakeNPC', '1d3');
  this.group[1] = new NPCList('DragonNPC', '1d3+1');
  this.movetype = MOVE_FLY;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -135 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
DragonsGroupTile.prototype = new NPCGroupObject();

function MidPartyGroupTile() {
  this.name = 'MidPartyGroup';
  this.desc = 'a party of adventurers';
  this.peaceAI = 'Bandit-15';
  this.graphic = '308.gif';
  this.group = [];
  this.group[0] = new NPCList('ArcherNPC', '1d2');
  this.group[1] = new NPCList('BardNPC', '1d2-1');
  this.group[2] = new NPCList('ThiefNPC', '1d2');
  this.group[3] = new NPCList('HandlerNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
}
MidPartyGroupTile.prototype = new NPCGroupObject();

function MidHighPartyGroupTile() {
  this.name = 'MidHighPartyGroup';
  this.desc = 'a party of adventurers';
  this.peaceAI = 'Bandit-15';
  this.graphic = '308.gif';
  this.group = [];
  this.group[0] = new NPCList('ThiefNPC', '1d2');
  this.group[1] = new NPCList('PaladinNPC', '1d2');
  this.group[2] = new NPCList('WizardNPC', '1d2-1');
  this.group[3] = new NPCList('RangerNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
}
MidHighPartyGroupTile.prototype = new NPCGroupObject();

function HighPartyGroupTile() {
  this.name = 'HighPartyGroup';
  this.desc = 'a party of adventurers';
  this.peaceAI = 'Bandit-15';
  this.graphic = '308.gif';
  this.group = [];
  this.group[0] = new NPCList('RangerNPC', '1d2');
  this.group[1] = new NPCList('PaladinNPC', '1d2');
  this.group[2] = new NPCList('ArchmageNPC', '1d2-1');
  this.group[3] = new NPCList('HandlerNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
}
HighPartyGroupTile.prototype = new NPCGroupObject();

function MidHeadlessGroupTile() {
  this.name = 'MidHeadlessGroup';
  this.desc = 'headlesses';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('HeadlessNPC', '1d4+2');
  this.group[1] = new NPCList('EttinNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -141 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
MidHeadlessGroupTile.prototype = new NPCGroupObject();

function HighHeadlessGroupTile() {
  this.name = 'HighHeadlessGroup';
  this.desc = 'headlesses';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('HeadlessNPC', '1d4+2');
  this.group[1] = new NPCList('EttinNPC', '1d3-1');
  this.group[2] = new NPCList('CyclopsNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -141 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
HighHeadlessGroupTile.prototype = new NPCGroupObject();

function GiantsGroupTile() {
  this.name = 'GiantsGroup';
  this.desc = 'giants';
  this.peaceAI = 'Monster-15';
  this.graphic = '345.gif';
  this.altgraphic = ['379.gif',];
  this.group = [];
  this.group[0] = new NPCList('GiantNPC', '1d2+1');
  this.group[1] = new NPCList('CyclopsNPC', '1d2');
  this.group[2] = new NPCList('EttinNPC', '1d3-1');
  this.group[3] = new NPCList('HeadlessNPC', '1d4');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
GiantsGroupTile.prototype = new NPCGroupObject();

function OrcPartyLowGroupTile() {
  this.name = 'OrcPartyLowGroup';
  this.desc = 'orcs';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d4+1');
  this.group[1] = new NPCList('OrcShamanNPC', '1d3-1');
  this.group[2] = new NPCList('TrollNPC', '1d3-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -134 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
OrcPartyLowGroupTile.prototype = new NPCGroupObject();

function OrcPartyHighGroupTile() {
  this.name = 'OrcPartyHighGroup';
  this.desc = 'orcs';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d4+1');
  this.group[1] = new NPCList('OrcShamanNPC', '1d3-1');
  this.group[2] = new NPCList('TrollNPC', '1d3-1');
  this.group[3] = new NPCList('OrcCaptainNPC', '1d3');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -134 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
OrcPartyHighGroupTile.prototype = new NPCGroupObject();

function NecromancerGroupTile() {
  this.name = 'NecromancerGroup';
  this.desc = 'an evil wizard';
  this.peaceAI = 'Monster-15';
  this.graphic = '347.gif';
  this.altgraphic = ['381.gif',];
  this.group = [];
  this.group[0] = new NPCList('ArchmageNPC', '1d2');
  this.group[1] = new NPCList('PhantomNPC', '1d3-1');
  this.group[2] = new NPCList('SkeletonNPC', '2d4');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
}
NecromancerGroupTile.prototype = new NPCGroupObject();

function ElementalistGroupTile() {
  this.name = 'ElementalistGroup';
  this.desc = 'an evil wizard';
  this.peaceAI = 'Monster-15';
  this.graphic = '347.gif';
  this.altgraphic = ['381.gif',];
  this.group = [];
  this.group[0] = new NPCList('ArchmageNPC', '1d2');
  this.group[1] = new NPCList('AirElementalNPC', '1d3-1');
  this.group[2] = new NPCList('FireElementalNPC', '1d3-1');
  this.group[3] = new NPCList('EarthElementalNPC', '1d3-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
}
ElementalistGroupTile.prototype = new NPCGroupObject();

function GazersGroupTile() {
  this.name = 'GazersGroup';
  this.desc = 'gazers';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('GazerNPC', '1d4');
  this.group[1] = new NPCList('GiantInsectsNPC', '1d5');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -135 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
GazersGroupTile.prototype = new NPCGroupObject();

function TrollGroupTile() {
  this.name = 'TrollGroup';
  this.desc = 'trolls';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('TrollNPC', '2d4');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -143 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
TrollGroupTile.prototype = new NPCGroupObject();

function DaemonGroupTile() {
  this.name = 'DaemonGroup';
  this.desc = 'daemons';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('DaemonNPC', '1d3');
  this.group[1] = new NPCList('FireElementalNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = 0 * 32;
  this.spriteyoffset = -127 * 32;

  ManualAnimation.call(this, { 
    animstart: 0*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
DaemonGroupTile.prototype = new NPCGroupObject();

function SkeletonGroupTile() {
  this.name = 'SkeletonGroup';
  this.desc = 'skeletons';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('SkeletonNPC', '2d4');
  this.group[1] = new NPCList('GhostNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -132 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
SkeletonGroupTile.prototype = new NPCGroupObject();

function UndeadGroupTile() {
  this.name = 'UndeadGroup';
  this.desc = 'undead';
  this.peaceAI = 'Monster-15';
  this.group = [];
  this.group[0] = new NPCList('GhostNPC', '2d3');
  this.group[1] = new NPCList('SkeletonNPC', '1d2');
  this.group[2] = new NPCList('PhantomNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -142 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 5,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
UndeadGroupTile.prototype = new NPCGroupObject();

function FireLizardGroupTile() {
  this.name = 'FireLizardGroup';
  this.desc = 'fire lizards';
  this.peaceAI = 'Monster-15';
  this.graphic = '349.gif';
  this.altgraphic = ['383.gif',];
  this.group = [];
  this.group[0] = new NPCList('FireLizardNPC', '1d5+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
FireLizardGroupTile.prototype = new NPCGroupObject();

function MagmaLizardGroupTile() {
  this.name = 'MagmaLizardGroup';
  this.desc = 'fire lizards';
  this.peaceAI = 'Monster-15';
  this.graphic = '349.gif';
  this.altgraphic = ['383.gif',];
  this.group = [];
  this.group[0] = new NPCList('MagmaLizardNPC', '1d4');
  this.group[1] = new NPCList('FireLizardNPC', '1d4+1');
  this.group[2] = new NPCList('FireElementalNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
MagmaLizardGroupTile.prototype = new NPCGroupObject();

function InsectsGroupSmallTile() {
  this.name = 'InsectsGroupSmall';
  this.desc = 'giant insects';
  this.peaceAI = 'Animal-15';
  this.group = [];
  this.group[0] = new NPCList('GiantInsectsNPC', '1d4');
  this.movetype = MOVE_FLY;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -127 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
InsectsGroupSmallTile.prototype = new NPCGroupObject();

function InsectsGroupLargeTile() {
  this.name = 'InsectsGroupLarge';
  this.desc = 'giant insects';
  this.peaceAI = 'Animal-15';
  this.group = [];
  this.group[0] = new NPCList('GiantInsectsNPC', '2d4+1');
  this.movetype = MOVE_FLY;
  this.attackword = 'attack';
  this.graphic = 'static.png';
  this.spritexoffset = -5 * 32;
  this.spriteyoffset = -127 * 32;

  ManualAnimation.call(this, { 
    animstart: -5*32,
    animlength: 4,
    animstyle: "random",
    allowrepeat: 0,
    framedurationmin: 150,
    framedurationmax: 300,
    startframe: "random"
  });
}
InsectsGroupLargeTile.prototype = new NPCGroupObject();

function CourierGroupTile() {
  this.name = 'CourierGroup';
  this.desc = 'a courier';
  this.peaceAI = 'Courier';
  this.graphic = '310.2.gif';
  this.group = [];
  this.group[0] = new NPCList('CourierNPC', '1d1');
  this.group[1] = new NPCList('CourierGuardNPC', '1d1+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
  this.special = 'remain';
}
CourierGroupTile.prototype = new NPCGroupObject();

function OnyxToHildendainGuardsGroupTile() {
  this.name = 'OnyxToHildendainGuardsGroup';
  this.desc = 'a guard patrol';
  this.peaceAI = 'PatrolOH';
  this.graphic = '309.gif';
  this.group = [];
  this.group[0] = new NPCList('GuardNPC', '5d1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
}
OnyxToHildendainGuardsGroupTile.prototype = new NPCGroupObject();

function NaurglenToPovertyGuardsGroupTile() {
  this.name = 'NaurglenToPovertyGuardsGroup';
  this.desc = 'a guard patrol';
  this.peaceAI = 'PatrolNP';
  this.graphic = '309.gif';
  this.group = [];
  this.group[0] = new NPCList('GuardNPC', '5d1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
}
NaurglenToPovertyGuardsGroupTile.prototype = new NPCGroupObject();

function ClearLakeGuardsGroupTile() {
  this.name = 'ClearLakeGuardsGroup';
  this.desc = 'a guard patrol';
  this.peaceAI = 'PatrolCL';
  this.graphic = '309.gif';
  this.group = [];
  this.group[0] = new NPCList('GuardNPC', '5d1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
}
ClearLakeGuardsGroupTile.prototype = new NPCGroupObject();

function BeldskaeGuardsGroupTile() {
  this.name = 'BeldskaeGuardsGroup';
  this.desc = 'a guard patrol';
  this.peaceAI = 'PatrolB';
  this.graphic = '309.gif';
  this.group = [];
  this.group[0] = new NPCList('GuardNPC', '5d1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
}
BeldskaeGuardsGroupTile.prototype = new NPCGroupObject();

function SwainhilGuardsGroupTile() {
  this.name = 'SwainhilGuardsGroup';
  this.desc = 'a guard patrol';
  this.peaceAI = 'PatrolS';
  this.graphic = '309.gif';
  this.group = [];
  this.group[0] = new NPCList('GuardNPC', '5d1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attacks';
}
SwainhilGuardsGroupTile.prototype = new NPCGroupObject();


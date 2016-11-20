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
  this.withdraw = '75';
  this.graphic = '302.gif';
  this.altgraphic = ['druid-offcolor.1.gif','druid-offcolor.gif',];
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = "druid";
  this.meleeChance = 30;
  this.spellsknown = { heal: 1, control: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
}
DruidVillagerNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '301.gif';
  this.altgraphic = ['shepherd-offcolor.1.gif',];
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = "shepherd";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
}
ShepherdVillagerNPCTile.prototype = new NPCObject();


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
  this.withdraw = '50';
  this.graphic = '303.gif';
  this.altgraphic = ['303.2.gif','mage-offcolor.gif',];
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = "mage";
  this.spellsknown = { control: 1, attack: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
}
MageVillagerNPCTile.prototype = new NPCObject();


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
  this.withdraw = '50';
  this.graphic = '304.gif';
  this.altgraphic = ['304.2.gif','tinker-offcolor.gif',];
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'Sling';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = "tinker";
  this.meleeChance = 30;
  this.spellsknown = { control: 1, attack: 1, };
  this.resists = {};
  this.special = 'open_door';
}
TinkerVillagerNPCTile.prototype = new NPCObject();


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
  this.withdraw = '50';
  this.graphic = '305.gif';
  this.altgraphic = ['ranger-offcolor.gif',];
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'Sling';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = "ranger";
  this.meleeChance = 50;
  this.spellsknown = { heal: 1, control: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
}
RangerVillagerNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '306.gif';
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'Sling';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'an';
  this.desc = "adventurer";
  this.meleeChance = 50;
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
}
AdventurerVillagerNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '307.gif';
  this.altgraphic = ['307.2.gif','paladin-offcolor.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = "paladin";
  this.meleeChance = 75;
  this.spellsknown = { heal: 1, attack: 1, };
  this.resists = {};
  this.special = 'open_door';
}
PaladinVillagerNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '308.gif';
  this.altgraphic = ['fighter-offcolor.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'Sling';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = "fighter";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'open_door';
}
FighterVillagerNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '310.gif';
  this.altgraphic = ['310.2.gif',];
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = "citizen";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'coward, open_door';
}
TownsfolkVillagerNPCTile.prototype = new NPCObject();


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
  this.withdraw = '66';
  this.graphic = '311.gif';
  this.altgraphic = ['bard-offcolor.gif',];
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'Bow';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = "bard";
  this.meleeChance = 40;
  this.spellsknown = { control: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
}
BardVillagerNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '312.gif';
  this.meleeAttackAs = 'Fists';
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
  this.resists = {};
  this.special = 'coward, open_door';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
}
ChildVillagerNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '313.gif';
  this.meleeAttackAs = 'Fists';
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
  this.resists = {};
  this.special = 'coward, open_door';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '314.gif';
  this.meleeAttackAs = 'Fists';
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
  this.resists = {};
  this.special = 'coward, open_door';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
}
JesterNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '309.gif';
  this.meleeAttackAs = 'Halberd';
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
}
TownGuardNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '315.gif';
  this.meleeAttackAs = 'MagicSword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ExoticArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.desc = "your father the King";
  this.meleeChance = 70;
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
}
KingNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '315.2.gif';
  this.meleeAttackAs = 'MagicSword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ExoticArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.desc = "your mother the Queen";
  this.meleeChance = 70;
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
}
QueenNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = 'prince.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Town Guard';
  this.desc = "your brother the prince";
  this.meleeChance = 70;
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
}
PrinceNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '105.gif';
  this.altgraphic = ['204.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "horse";
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
}
HorseNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = 'prince.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Town Guard';
  this.desc = "your brother the prince";
  this.meleeChance = 70;
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
}
CorruptPrinceNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '309.gif';
  this.meleeAttackAs = 'Longsword';
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
}
CorruptGuardsNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '310.2.gif';
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'Sling';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Courier';
  this.prefix = 'a';
  this.desc = "courier";
  this.resists = {};
  this.special = 'open_door, courierSurrender';
}
CourierNPCTile.prototype = new NPCObject();


// CorruptTownsfolk

function CourierGuardNPCTile() {
  this.name = 'CourierGuardNPC';
  this.level = 3;
  this.addhp = 200;
  this.str = 14;
  this.dex = 14;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.forgetAt = 0;
  this.withdraw = '0';
  this.graphic = '309.gif';
  this.meleeAttackAs = 'Axe';
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
}
CourierGuardNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '362.gif';
  this.altgraphic = ['328.gif',];
  this.meleeAttackAs = 'Dagger';
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
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '336.gif';
  this.altgraphic = ['370.gif',];
  this.meleeAttackAs = 'Fists';
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
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '327.gif';
  this.altgraphic = ['361.gif',];
  this.meleeAttackAs = 'Dagger';
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
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '344.gif';
  this.altgraphic = ['378.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Orcs';
  this.prefix = 'a';
  this.desc = "headless";
  this.meleeChance = 100;
  this.resists = {};
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
  this.withdraw = '0';
  this.graphic = '375.gif';
  this.altgraphic = ['341.gif',];
  this.meleeAttackAs = 'Dagger';
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
}
HoodNPCTile.prototype = new NPCObject();


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
  this.withdraw = '50';
  this.graphic = '311.gif';
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'Sling';
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
}
MinstrelNPCTile.prototype = new NPCObject();


// Monster

function SlimeNPCTile() {
  this.name = 'SlimeNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 7;
  this.dex = 7;
  this.int = 1;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 7;
  this.withdraw = '0';
  this.graphic = '331.gif';
  this.altgraphic = ['365.gif',];
  this.meleeAttackAs = 'Dagger';
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
  this.meleeMissSound = 'sfx_slime_miss';
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
  this.withdraw = '75';
  this.graphic = '303.gif';
  this.altgraphic = ['303.2.gif',];
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'an';
  this.desc = "apprentice";
  this.spellsknown = { control: 1, attack: 1, };
  this.resists = {};
  this.special = 'open_door';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
}
ApprenticeNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '308.gif';
  this.altgraphic = ['fighter-offcolor.gif',];
  this.meleeAttackAs = 'Mace';
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
}
FighterNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '342.gif';
  this.altgraphic = ['376.gif',];
  this.meleeAttackAs = 'Shortsword';
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
  this.withdraw = '0';
  this.graphic = '323.gif';
  this.altgraphic = ['357.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'Bow';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "nixie";
  this.meleeChance = 50;
  this.resists = {};
}
NixieNPCTile.prototype = new NPCObject();


// Monster

function OrcNPCTile() {
  this.name = 'OrcNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 12;
  this.dex = 10;
  this.int = 6;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = '339.gif';
  this.altgraphic = ['373.gif',];
  this.meleeAttackAs = 'Mace';
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
  this.withdraw = '0';
  this.graphic = '306.gif';
  this.meleeAttackAs = 'Shortsword';
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
}
RogueNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '306.gif';
  this.meleeAttackAs = 'Shortsword';
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
}
PitRogueNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '340.gif';
  this.altgraphic = ['374.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'a';
  this.desc = "skeleton";
  this.meleeChance = 100;
  this.resists = { ice:33 };
  this.special = 'undead';
  this.meleeHitSound = 'sfx_skeleton_hit';
  this.meleeMissSound = 'sfx_skeleton_miss';
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
  this.peaceAI = 'wander-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = '338.gif';
  this.altgraphic = ['372.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'AnimArmor';
  this.desc = "animated armor";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'construct';
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
  this.withdraw = '66';
  this.graphic = 'ranger-offcolor.gif';
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'Bow';
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
}
ArcherNPCTile.prototype = new NPCObject();


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
  this.withdraw = '50';
  this.graphic = 'bard-offcolor.gif';
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'Bow';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Lesser Adventurer';
  this.prefix = 'a';
  this.desc = "bard";
  this.meleeChance = 40;
  this.spellsknown = { control: 1, buff: 1, };
  this.resists = {};
  this.special = 'sing, open_door';
}
BardNPCTile.prototype = new NPCObject();


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
  this.withdraw = '50';
  this.graphic = '302.gif';
  this.altgraphic = ['druid-offcolor.gif','druid-offcolor.1.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Lesser Adventurer';
  this.prefix = 'a';
  this.desc = "druid";
  this.meleeChance = 30;
  this.spellsknown = { heal: 1, control: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
}
DruidNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '349.gif';
  this.altgraphic = ['383.gif',];
  this.meleeAttackAs = 'Axe';
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
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = 'fluke.gif';
  this.meleeAttackAs = 'Mace';
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
  this.spellsknown = { control: 1, };
  this.resists = { ice:33 };
  this.special = 'whirlpool, invisible';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '330.gif';
  this.altgraphic = ['364.gif',];
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'Ghost';
  this.prefix = 'a';
  this.desc = "ghost";
  this.onDamaged = 'incorporeal';
  this.meleeChance = 100;
  this.resists = { ice:50 };
  this.special = 'undead';
  this.meleeHitSound = 'sfx_ghost_hit';
  this.meleeMissSound = 'sfx_ghost_miss';
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
  this.withdraw = '0';
  this.graphic = '329.gif';
  this.altgraphic = ['363.gif',];
  this.meleeAttackAs = 'Axe';
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
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '333.gif';
  this.altgraphic = ['367.gif',];
  this.meleeAttackAs = 'Shortsword';
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
  this.special = 'stealfood,breedsexplosively';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = 'shepherd-offcolor.1.gif';
  this.meleeAttackAs = 'Mace';
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
}
HandlerNPCTile.prototype = new NPCObject();


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
  this.peaceAI = 'stationary-3';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = '368.gif';
  this.altgraphic = ['334.gif',];
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Mimic';
  this.prefix = 'a';
  this.desc = "chest";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'hides:008.gif, aggroname:a mimic, spitter';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = 'orc_shaman.gif';
  this.meleeAttackAs = 'Shortsword';
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
  this.withdraw = '0';
  this.graphic = 'python.gif';
  this.meleeAttackAs = 'Mace';
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
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '326.gif';
  this.altgraphic = ['360.gif',];
  this.meleeAttackAs = 'Mace';
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
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '306.gif';
  this.meleeAttackAs = 'Mace';
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
}
ThiefNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '332.gif';
  this.altgraphic = ['366.gif',];
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'Bow';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Trolls';
  this.prefix = 'a';
  this.desc = "troll";
  this.meleeChance = 50;
  this.resists = {};
  this.special = 'open_door';
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
  this.peaceAI = 'wander-10';
  this.forgetAt = 8;
  this.withdraw = '0';
  this.graphic = '324.gif';
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "twister";
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'mindless';
  this.meleeHitSound = 'sfx_air_hit';
  this.meleeMissSound = 'sfx_air_miss';
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
  this.peaceAI = 'wander-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = 'air_elemental.gif';
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'an';
  this.desc = "air elemental";
  this.meleeChance = 70;
  this.resists = {};
  this.special = 'lbolt, mindless';
  this.meleeHitSound = 'sfx_air_hit';
  this.meleeMissSound = 'sfx_air_miss';
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
  this.withdraw = '0';
  this.graphic = '345.gif';
  this.altgraphic = ['379.gif',];
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'Boulder';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Cyclops';
  this.prefix = 'a';
  this.desc = "cyclops";
  this.onHit = 'knockback';
  this.meleeChance = 60;
  this.resists = {};
  this.special = 'open_door';
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
  this.withdraw = '0';
  this.graphic = 'deep_nixie.gif';
  this.meleeAttackAs = 'Axe';
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
  this.peaceAI = 'wander-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = '353.gif';
  this.altgraphic = ['387.gif',];
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 15;
  this.armorAbsorb = 33;
  this.armorResist = 25;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Drake';
  this.prefix = 'a';
  this.desc = "drake";
  this.meleeChance = 85;
  this.spellsknown = { attack: 1, };
  this.resists = { fire:50 };
  this.special = 'firebreath';
  this.meleeHitSound = 'sfx_roar_hit';
  this.meleeMissSound = 'sfx_roar_miss';
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
  this.peaceAI = 'wander-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = 'earth_elemental.gif';
  this.meleeAttackAs = 'Halberd';
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
  this.special = 'mindless';
  this.meleeHitSound = 'sfx_boulder_hit';
  this.meleeMissSound = 'sfx_boulder_miss';
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
  this.peaceAI = 'wander-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = 'fire_elemental.gif';
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "fire elemental";
  this.meleeChance = 60;
  this.spellsknown = { attack: 1, };
  this.resists = { fire:100, ice:-50 };
  this.special = 'flamearmor, mindless,light:1';
  this.meleeHitSound = 'sfx_fire_hit';
  this.meleeMissSound = 'sfx_fire_miss';
}
FireElementalNPCTile.prototype = new NPCObject();


// Monster

function LurkerNPCTile() {
  this.name = 'LurkerNPC';
  this.level = 4;
  this.addhp = 0;
  this.str = 16;
  this.dex = 16;
  this.int = 7;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'wander-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = 'lurker.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 15;
  this.armorAbsorb = 15;
  this.armorResist = 10;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Lurker';
  this.prefix = 'a';
  this.desc = "lurker";
  this.onHit = 'entangle';
  this.meleeChance = 100;
  this.resists = {};
  this.special = 'invisible';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = 'orc_captain.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'Bow';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'HighOrcs';
  this.prefix = 'an';
  this.desc = "orc captain";
  this.meleeChance = 66;
  this.spellsknown = { buff: 1, };
  this.resists = {};
  this.special = 'open_door';
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
  this.withdraw = '0';
  this.graphic = '307.gif';
  this.altgraphic = ['307.2.gif','paladin-offcolor.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 35;
  this.armorAbsorb = 50;
  this.armorResist = 15;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'High Adventurer';
  this.prefix = 'a';
  this.desc = "paladin";
  this.meleeChance = 66;
  this.spellsknown = { heal: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
}
PaladinNPCTile.prototype = new NPCObject();


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
  this.peaceAI = 'wander-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = '321.gif';
  this.altgraphic = ['355.gif',];
  this.meleeAttackAs = 'Longsword';
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
  this.special = 'firebreath';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '329.gif';
  this.altgraphic = ['363.gif',];
  this.meleeAttackAs = 'Longsword';
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
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.peaceAI = 'wander-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = '325.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "water elemental";
  this.onHit = 'slow';
  this.meleeChance = 75;
  this.resists = { ice:50, fire:-25 };
  this.special = 'mindless';
  this.meleeHitSound = 'sfx_water_hit';
  this.meleeMissSound = 'sfx_water_miss';
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
  this.withdraw = '50';
  this.graphic = 'mage-offcolor.gif';
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'High Adventurer';
  this.prefix = 'a';
  this.desc = "wizard";
  this.meleeChance = 10;
  this.spellsknown = { control: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
}
WizardNPCTile.prototype = new NPCObject();


// Monster

function CorpserNPCTile() {
  this.name = 'CorpserNPC';
  this.level = 5;
  this.addhp = 0;
  this.str = 18;
  this.dex = 18;
  this.int = 7;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'wander-15';
  this.forgetAt = 15;
  this.withdraw = '0';
  this.graphic = 'corpser.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 30;
  this.armorAbsorb = 30;
  this.armorResist = 10;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Corpser';
  this.prefix = 'a';
  this.desc = "corpser";
  this.onHit = 'entangle';
  this.meleeChance = 50;
  this.resists = {};
  this.special = 'invisible, reach';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '343.gif';
  this.altgraphic = ['377.gif',];
  this.meleeAttackAs = 'Longsword';
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
  this.withdraw = '0';
  this.graphic = '103.gif';
  this.meleeAttackAs = 'Halberd';
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
  this.meleeMissSound = 'sfx_animal_miss';
}
FloorNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '337.gif';
  this.altgraphic = ['371.gif',];
  this.meleeAttackAs = 'Shortsword';
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
  this.special = 'sleep, ondeathInsects';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '352.gif';
  this.altgraphic = ['386.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Hydra';
  this.prefix = 'a';
  this.desc = "hydra";
  this.onHit = 'venom';
  this.initmult = 1.2;
  this.meleeChance = 80;
  this.resists = {};
  this.special = 'firebreath, multiattack';
  this.meleeHitSound = 'sfx_roar_hit';
  this.meleeMissSound = 'sfx_roar_miss';
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
  this.withdraw = '0';
  this.graphic = '349.gif';
  this.altgraphic = ['383.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Magmaspawn';
  this.prefix = 'a';
  this.desc = "magma spawn";
  this.meleeChance = 80;
  this.resists = {};
  this.special = 'magmaspit, magmaheal';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
}
MagmaSpawnNPCTile.prototype = new NPCObject();


// Monster

function PhantomNPCTile() {
  this.name = 'PhantomNPC';
  this.level = 5;
  this.addhp = 0;
  this.str = 14;
  this.dex = 14;
  this.int = 14;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.forgetAt = 15;
  this.withdraw = '0';
  this.graphic = '338.gif';
  this.altgraphic = ['372.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'Phantom';
  this.prefix = 'a';
  this.desc = "phantom";
  this.meleeChance = 75;
  this.spellsknown = { attack: 1, };
  this.resists = {};
  this.special = 'undead';
  this.meleeHitSound = 'sfx_ghost_hit';
  this.meleeMissSound = 'sfx_ghost_miss';
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
  this.withdraw = '0';
  this.graphic = '305.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'Crossbow';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'High Adventurer';
  this.prefix = 'a';
  this.desc = "ranger";
  this.meleeChance = 25;
  this.spellsknown = { heal: 1, control: 1, };
  this.resists = {};
  this.special = 'open_door';
}
RangerNPCTile.prototype = new NPCObject();


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
  this.peaceAI = 'wander-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = '346.gif';
  this.altgraphic = ['380.gif',];
  this.meleeAttackAs = 'Mace';
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
  this.spellsknown = { control: 1, attack: 1, };
  this.resists = {};
  this.special = 'teleport, energy bolt';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '350.gif';
  this.altgraphic = ['384.gif',];
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 40;
  this.armorResist = 100;
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'Delver';
  this.prefix = 'a';
  this.desc = "delver";
  this.meleeChance = 100;
  this.resists = {};
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '50';
  this.graphic = '347.gif';
  this.altgraphic = ['381.gif',];
  this.meleeAttackAs = 'Mace';
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
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
}
ArchmageNPCTile.prototype = new NPCObject();


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
  this.peaceAI = 'stationary';
  this.forgetAt = 0;
  this.withdraw = '0';
  this.graphic = 'blackdragon.gif';
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Blackdragon';
  this.prefix = 'a';
  this.desc = "black dragon";
  this.meleeChance = 70;
  this.spellsknown = { control: 1, attack: 1, };
  this.resists = {};
  this.special = 'firebreath';
  this.meleeHitSound = 'sfx_roar_hit';
  this.meleeMissSound = 'sfx_roar_miss';
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
  this.withdraw = '0';
  this.graphic = '352.gif';
  this.altgraphic = ['386.gif',];
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Devourer';
  this.prefix = 'the';
  this.desc = "devourer";
  this.onHit = 'venom';
  this.meleeChance = 70;
  this.spellsknown = { control: 1, buff: 1, };
  this.resists = { fire:50, ice:50 };
  this.special = 'firebreath, icebreath, multiattack';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '353.gif';
  this.altgraphic = ['387.gif',];
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'dragon';
  this.prefix = 'a';
  this.desc = "dragon";
  this.meleeChance = 70;
  this.spellsknown = { control: 1, attack: 1, };
  this.resists = { fire:50 };
  this.special = 'firebreath';
  this.meleeHitSound = 'sfx_roar_hit';
  this.meleeMissSound = 'sfx_roar_miss';
}
DragonNPCTile.prototype = new NPCObject();


// Monster

function EttinSorcererNPCTile() {
  this.name = 'EttinSorcererNPC';
  this.level = 5;
  this.addhp = 5;
  this.str = 18;
  this.dex = 14;
  this.int = 16;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = '343.gif';
  this.altgraphic = ['377.gif',];
  this.meleeAttackAs = 'Longsword';
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
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'open_door';
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
  this.withdraw = '0';
  this.graphic = '345.gif';
  this.altgraphic = ['379.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'Boulder';
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
  this.withdraw = '0';
  this.graphic = '322.gif';
  this.altgraphic = ['356.gif',];
  this.meleeAttackAs = 'Halberd';
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
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.peaceAI = 'stationary-9';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = '335.gif';
  this.altgraphic = ['369.gif',];
  this.meleeAttackAs = 'Longsword';
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
  this.spellsknown = { control: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '330.gif';
  this.altgraphic = ['364.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'Specter';
  this.prefix = 'a';
  this.desc = "specter";
  this.onDamaged = 'incorporeal';
  this.meleeChance = 66;
  this.spellsknown = { control: 1, attack: 1, };
  this.resists = {};
  this.special = 'phase';
  this.meleeHitSound = 'sfx_ghost_hit';
  this.meleeMissSound = 'sfx_ghost_miss';
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
  this.withdraw = '0';
  this.graphic = '351.gif';
  this.altgraphic = ['385.gif',];
  this.meleeAttackAs = 'Halberd';
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
  this.spellsknown = { control: 1, attack: 1, };
  this.resists = {};
  this.special = 'open_door';
}
DaemonNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '350.gif';
  this.altgraphic = ['384.gif',];
  this.meleeAttackAs = 'Halberd';
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
  this.meleeMissSound = 'sfx_animal_miss';
}
EarthenTyrantNPCTile.prototype = new NPCObject();


// Monster

function LicheNPCTile() {
  this.name = 'LicheNPC';
  this.level = 7;
  this.addhp = -10;
  this.str = 14;
  this.dex = 16;
  this.int = 26;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = '348.gif';
  this.altgraphic = ['382.gif',];
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 20;
  this.armorAbsorb = 40;
  this.armorResist = 40;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Liche';
  this.prefix = 'a';
  this.desc = "liche";
  this.spellsknown = { control: 1, attack: 1, buff: 1, };
  this.resists = { ice:66 };
  this.special = 'necromancer, undead, open_door';
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
  this.withdraw = '0';
  this.graphic = '337.gif';
  this.altgraphic = ['371.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'Eyes';
  this.prefix = 'the';
  this.desc = "eyes of spite";
  this.onHit = 'paralyze';
  this.meleeChance = 15;
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.special = 'sleep, ondeathInsects';
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.peaceAI = 'stationary-9';
  this.forgetAt = 10;
  this.withdraw = '0';
  this.graphic = '335.gif';
  this.altgraphic = ['369.gif',];
  this.meleeAttackAs = 'Halberd';
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
  this.spellsknown = { control: 1, attack: 1, buff: 1, };
  this.resists = {};
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
}
ReaperLordNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = 'elder_dragon.gif';
  this.meleeAttackAs = 'MagicSword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ExoticArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'Elder Dragon';
  this.prefix = 'an';
  this.desc = "elder dragon";
  this.meleeChance = 65;
  this.spellsknown = { control: 1, attack: 1, buff: 1, };
  this.resists = { fire:50 };
  this.special = 'firebreath';
  this.meleeHitSound = 'sfx_roar_hit';
  this.meleeMissSound = 'sfx_roar_miss';
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
  this.withdraw = '0';
  this.graphic = '354.gif';
  this.altgraphic = ['388.gif',];
  this.meleeAttackAs = 'MagicSword';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Balron';
  this.prefix = 'a';
  this.desc = "balron";
  this.meleeChance = 75;
  this.spellsknown = { control: 1, attack: 1, };
  this.resists = { fire:100 };
  this.special = 'phase, open_door';
}
BalronNPCTile.prototype = new NPCObject();


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
  this.withdraw = '0';
  this.graphic = '345.gif';
  this.altgraphic = ['379.gif',];
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'Boulder';
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
  this.withdraw = '0';
  this.graphic = '322.gif';
  this.altgraphic = ['356.gif',];
  this.meleeAttackAs = 'MagicSword';
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
  this.meleeMissSound = 'sfx_animal_miss';
}
AbyssalKrakenNPCTile.prototype = new NPCObject();


// Summoned

function IllusionNPCTile() {
  this.name = 'IllusionNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 15;
  this.dex = 15;
  this.int = 15;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'followPC';
  this.forgetAt = 0;
  this.withdraw = '0';
  this.graphic = '338.gif';
  this.meleeAttackAs = 'Shortsword';
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
  this.attitude = 'friendly';
  this.peaceAI = 'followPC';
  this.forgetAt = 0;
  this.withdraw = '0';
  this.graphic = '338.gif';
  this.meleeAttackAs = 'Axe';
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
  this.withdraw = '0';
  this.graphic = 'sentinel.gif';
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'ExoticArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "floating sentinel";
  this.resists = {};
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeMissSound = 'sfx_animal_miss';
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
  this.withdraw = '0';
  this.graphic = '388.gif';
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 2000;
  this.armorAbsorb = 2000;
  this.armorResist = 2000;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.desc = "yourself";
  this.resists = {};
  this.special = 'mirror';
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
  this.withdraw = '0';
  this.graphic = 'sentinel.gif';
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = "negator gnome";
  this.resists = {};
}
NegatorGnomeNPCTile.prototype = new NPCObject();


// Summoned

function CrystalBarrierNPCTile() {
  this.name = 'CrystalBarrierNPC';
  this.level = 5;
  this.addhp = 0;
  this.str = 10;
  this.dex = 3;
  this.int = 3;
  this.alignment = 'Neutral';
  this.attitude = 'friendly';
  this.peaceAI = 'stationary';
  this.forgetAt = 0;
  this.withdraw = '0';
  this.graphic = 'crystals.gif';
  this.meleeAttackAs = 'Fists';
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
  this.resists = {};
  this.special = 'crumbles';
}
CrystalBarrierNPCTile.prototype = new NPCObject();

function GiantRatGroupTinyTile() {
  this.name = 'GiantRatGroupTiny';
  this.desc = 'giant rats';
  this.peaceAI = 'Animal-15';
  this.graphic = '327.gif';
  this.altgraphic = ['361.gif',];
  this.group = [];
  this.group[0] = new NPCList('GiantRatNPC', '1d2+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
GiantRatGroupTinyTile.prototype = new NPCGroupObject();

function GiantRatGroupSmallTile() {
  this.name = 'GiantRatGroupSmall';
  this.desc = 'giant rats';
  this.peaceAI = 'Animal-15';
  this.graphic = '327.gif';
  this.altgraphic = ['361.gif',];
  this.group = [];
  this.group[0] = new NPCList('GiantRatNPC', '1d3+2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
GiantRatGroupSmallTile.prototype = new NPCGroupObject();

function GiantRatGroupLargeTile() {
  this.name = 'GiantRatGroupLarge';
  this.desc = 'giant rats';
  this.peaceAI = 'Animal-15';
  this.graphic = '327.gif';
  this.altgraphic = ['361.gif',];
  this.group = [];
  this.group[0] = new NPCList('GiantRatNPC', '1d5+4');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
GiantRatGroupLargeTile.prototype = new NPCGroupObject();

function OrcGroupTinyTile() {
  this.name = 'OrcGroupTiny';
  this.desc = 'orcs';
  this.peaceAI = 'Monster-15';
  this.graphic = '339.gif';
  this.altgraphic = ['373.gif',];
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d2+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
OrcGroupTinyTile.prototype = new NPCGroupObject();

function OrcGroupSmallTile() {
  this.name = 'OrcGroupSmall';
  this.desc = 'orcs';
  this.peaceAI = 'Monster-15';
  this.graphic = '339.gif';
  this.altgraphic = ['373.gif',];
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d3+2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
OrcGroupSmallTile.prototype = new NPCGroupObject();

function OrcGroupLargeTile() {
  this.name = 'OrcGroupLarge';
  this.desc = 'orcs';
  this.peaceAI = 'Monster-15';
  this.graphic = '339.gif';
  this.altgraphic = ['373.gif',];
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d5+4');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
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
  this.graphic = '344.gif';
  this.altgraphic = ['378.gif',];
  this.group = [];
  this.group[0] = new NPCList('HeadlessNPC', '1d2+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
HeadlessGroupTinyTile.prototype = new NPCGroupObject();

function HeadlessGroupSmallTile() {
  this.name = 'HeadlessGroupSmall';
  this.desc = 'headlesses';
  this.peaceAI = 'Monster-15';
  this.graphic = '344.gif';
  this.altgraphic = ['378.gif',];
  this.group = [];
  this.group[0] = new NPCList('HeadlessNPC', '1d4+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
HeadlessGroupSmallTile.prototype = new NPCGroupObject();

function HeadlessGroupLargeTile() {
  this.name = 'HeadlessGroupLarge';
  this.desc = 'headlesses';
  this.peaceAI = 'Monster-15';
  this.graphic = '344.gif';
  this.altgraphic = ['378.gif',];
  this.group = [];
  this.group[0] = new NPCList('HeadlessNPC', '1d5+2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
HeadlessGroupLargeTile.prototype = new NPCGroupObject();

function SnakesGroupSmallTile() {
  this.name = 'SnakesGroupSmall';
  this.desc = 'giant snakes';
  this.peaceAI = 'Animal-15';
  this.graphic = '342.gif';
  this.altgraphic = ['376.gif',];
  this.group = [];
  this.group[0] = new NPCList('PythonNPC', '1d2+1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
SnakesGroupSmallTile.prototype = new NPCGroupObject();

function SnakesGroupTile() {
  this.name = 'SnakesGroup';
  this.desc = 'giant snakes';
  this.peaceAI = 'Animal-15';
  this.graphic = '342.gif';
  this.altgraphic = ['376.gif',];
  this.group = [];
  this.group[0] = new NPCList('PythonNPC', '1d4+2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
SnakesGroupTile.prototype = new NPCGroupObject();

function MidSnakesGroupTile() {
  this.name = 'MidSnakesGroup';
  this.desc = 'giant snakes';
  this.peaceAI = 'Animal-15';
  this.graphic = '342.gif';
  this.altgraphic = ['376.gif',];
  this.group = [];
  this.group[0] = new NPCList('PythonNPC', '1d4+2');
  this.group[1] = new NPCList('GiantSnakeNPC', '1d2');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
MidSnakesGroupTile.prototype = new NPCGroupObject();

function DrakesSmallGroupTile() {
  this.name = 'DrakesSmallGroup';
  this.desc = 'drakes';
  this.peaceAI = 'Animal-15';
  this.graphic = '353.gif';
  this.altgraphic = ['387.gif',];
  this.group = [];
  this.group[0] = new NPCList('DrakeNPC', '1d4+1');
  this.movetype = MOVE_FLY;
  this.attackword = 'attack';
}
DrakesSmallGroupTile.prototype = new NPCGroupObject();

function DrakesLargeGroupTile() {
  this.name = 'DrakesLargeGroup';
  this.desc = 'drakes';
  this.peaceAI = 'Animal-15';
  this.graphic = '353.gif';
  this.altgraphic = ['387.gif',];
  this.group = [];
  this.group[0] = new NPCList('DrakeNPC', '1d6+1');
  this.group[1] = new NPCList('DragonNPC', '1d2-1');
  this.movetype = MOVE_FLY;
  this.attackword = 'attack';
}
DrakesLargeGroupTile.prototype = new NPCGroupObject();

function DragonsGroupTile() {
  this.name = 'DragonsGroup';
  this.desc = 'dragons';
  this.peaceAI = 'Animal-15';
  this.graphic = '353.gif';
  this.altgraphic = ['387.gif',];
  this.group = [];
  this.group[0] = new NPCList('DrakeNPC', '1d3');
  this.group[1] = new NPCList('DragonNPC', '1d3+1');
  this.movetype = MOVE_FLY;
  this.attackword = 'attack';
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
  this.graphic = '344.gif';
  this.altgraphic = ['378.gif',];
  this.group = [];
  this.group[0] = new NPCList('HeadlessNPC', '1d4+2');
  this.group[1] = new NPCList('EttinNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
MidHeadlessGroupTile.prototype = new NPCGroupObject();

function HighHeadlessGroupTile() {
  this.name = 'HighHeadlessGroup';
  this.desc = 'headlesses';
  this.peaceAI = 'Monster-15';
  this.graphic = '344.gif';
  this.altgraphic = ['378.gif',];
  this.group = [];
  this.group[0] = new NPCList('HeadlessNPC', '1d4+2');
  this.group[1] = new NPCList('EttinNPC', '1d3-1');
  this.group[2] = new NPCList('CyclopsNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
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
  this.graphic = '339.gif';
  this.altgraphic = ['373.gif',];
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d4+1');
  this.group[1] = new NPCList('OrcShamanNPC', '1d3-1');
  this.group[2] = new NPCList('TrollNPC', '1d3-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
OrcPartyLowGroupTile.prototype = new NPCGroupObject();

function OrcPartyHighGroupTile() {
  this.name = 'OrcPartyHighGroup';
  this.desc = 'orcs';
  this.peaceAI = 'Monster-15';
  this.graphic = '339.gif';
  this.altgraphic = ['373.gif',];
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d4+1');
  this.group[1] = new NPCList('OrcShamanNPC', '1d3-1');
  this.group[2] = new NPCList('TrollNPC', '1d3-1');
  this.group[3] = new NPCList('OrcCaptainNPC', '1d3');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
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
  this.graphic = '337.gif';
  this.altgraphic = ['341.gif',];
  this.group = [];
  this.group[0] = new NPCList('GazerNPC', '1d4');
  this.group[1] = new NPCList('GiantInsectsNPC', '1d5');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
GazersGroupTile.prototype = new NPCGroupObject();

function TrollGroupTile() {
  this.name = 'TrollGroup';
  this.desc = 'trolls';
  this.peaceAI = 'Monster-15';
  this.graphic = '332.gif';
  this.altgraphic = ['336.gif',];
  this.group = [];
  this.group[0] = new NPCList('TrollNPC', '2d4');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
TrollGroupTile.prototype = new NPCGroupObject();

function DaemonGroupTile() {
  this.name = 'DaemonGroup';
  this.desc = 'daemons';
  this.peaceAI = 'Monster-15';
  this.graphic = '351.gif';
  this.altgraphic = ['385.gif',];
  this.group = [];
  this.group[0] = new NPCList('DaemonNPC', '1d3');
  this.group[1] = new NPCList('FireElementalNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
DaemonGroupTile.prototype = new NPCGroupObject();

function SkeletonGroupTile() {
  this.name = 'SkeletonGroup';
  this.desc = 'skeletons';
  this.peaceAI = 'Monster-15';
  this.graphic = '340.gif';
  this.altgraphic = ['374.gif',];
  this.group = [];
  this.group[0] = new NPCList('SkeletonNPC', '2d4');
  this.group[1] = new NPCList('GhostNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
}
SkeletonGroupTile.prototype = new NPCGroupObject();

function UndeadGroupTile() {
  this.name = 'UndeadGroup';
  this.desc = 'undead';
  this.peaceAI = 'Monster-15';
  this.graphic = '364.gif';
  this.altgraphic = ['330.gif',];
  this.group = [];
  this.group[0] = new NPCList('GhostNPC', '2d3');
  this.group[1] = new NPCList('SkeletonNPC', '1d2');
  this.group[2] = new NPCList('PhantomNPC', '1d2-1');
  this.movetype = MOVE_WALK;
  this.attackword = 'attack';
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
  this.graphic = '336.gif';
  this.altgraphic = ['370.gif',];
  this.group = [];
  this.group[0] = new NPCList('GiantInsectsNPC', '1d4');
  this.movetype = MOVE_FLY;
  this.attackword = 'attack';
}
InsectsGroupSmallTile.prototype = new NPCGroupObject();

function InsectsGroupLargeTile() {
  this.name = 'InsectsGroupLarge';
  this.desc = 'giant insects';
  this.peaceAI = 'Animal-15';
  this.graphic = '336.gif';
  this.altgraphic = ['370.gif',];
  this.group = [];
  this.group[0] = new NPCList('GiantInsectsNPC', '2d4+1');
  this.movetype = MOVE_FLY;
  this.attackword = 'attack';
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
}
CourierGroupTile.prototype = new NPCGroupObject();


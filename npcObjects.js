
// Townsfolk

function DruidVillagerNPCTile() {
  this.name = 'DruidVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 12;
  this.int = 14;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'runaway';
  this.graphic = '302.gif';
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = 'druid';
}
DruidVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function ShepherdVillagerNPCTile() {
  this.name = 'ShepherdVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 12;
  this.dex = 12;
  this.int = 12;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'runaway';
  this.graphic = '301.gif';
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = 'shepherd';
}
ShepherdVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function MageVillagerNPCTile() {
  this.name = 'MageVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 10;
  this.int = 16;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'runaway';
  this.graphic = '303.gif';
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = 'mage';
}
MageVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function TinkerVillagerNPCTile() {
  this.name = 'TinkerVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 14;
  this.int = 12;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'missile';
  this.PCThreatAI = 'runaway';
  this.graphic = '304.gif';
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'Sling';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = 'tinker';
}
TinkerVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function RangerVillagerNPCTile() {
  this.name = 'RangerVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 11;
  this.dex = 14;
  this.int = 11;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'ranger';
  this.PCThreatAI = 'runaway';
  this.graphic = '305.gif';
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'Sling';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = 'ranger';
}
RangerVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function AdventurerVillagerNPCTile() {
  this.name = 'AdventurerVillagerNPC';
  this.level = 1;
  this.addhp = 5;
  this.str = 12;
  this.dex = 12;
  this.int = 12;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'adventurer';
  this.PCThreatAI = 'runaway';
  this.graphic = '306.gif';
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'Sling';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'an';
  this.desc = 'adventurer';
}
AdventurerVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function PaladinVillagerNPCTile() {
  this.name = 'PaladinVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 14;
  this.dex = 10;
  this.int = 12;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'paladin';
  this.PCThreatAI = 'assistPC';
  this.graphic = '307.gif';
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = 'paladin';
}
PaladinVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function FighterVillagerNPCTile() {
  this.name = 'FighterVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 14;
  this.dex = 12;
  this.int = 10;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'runaway';
  this.graphic = '308.gif';
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'Sling';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = 'fighter';
}
FighterVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function TownsfolkVillagerNPCTile() {
  this.name = 'TownsfolkVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 10;
  this.int = 10;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'runaway';
  this.graphic = '310.gif';
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = 'citizen';
}
TownsfolkVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function BardVillagerNPCTile() {
  this.name = 'BardVillagerNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 14;
  this.int = 12;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'ranger';
  this.PCThreatAI = 'runaway';
  this.graphic = '311.gif';
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'Bow';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = 'bard';
}
BardVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function ChildVillagerNPCTile() {
  this.name = 'ChildVillagerNPC';
  this.level = 1;
  this.addhp = -2;
  this.str = 7;
  this.dex = 7;
  this.int = 7;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'runaway';
  this.PCThreatAI = 'runaway';
  this.graphic = '312.gif';
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = '0';
  this.armorAbsorb = '0';
  this.armorResist = '0';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = 'small child';
}
ChildVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function BeggarVillagerNPCTile() {
  this.name = 'BeggarVillagerNPC';
  this.level = 1;
  this.addhp = -2;
  this.str = 7;
  this.dex = 7;
  this.int = 7;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'runaway';
  this.PCThreatAI = 'runaway';
  this.graphic = '313.gif';
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = '0';
  this.armorAbsorb = '0';
  this.armorResist = '0';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = 'beggar';
}
BeggarVillagerNPCTile.prototype = new NPCObject;


// Townsfolk

function TownGuardNPCTile() {
  this.name = 'TownGuardNPC';
  this.level = 5;
  this.addhp = 0;
  this.str = 23;
  this.dex = 23;
  this.int = 14;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'guard';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'assistPC';
  this.graphic = '309.gif';
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Town Guard';
  this.prefix = 'a';
  this.desc = 'guard';
}
TownGuardNPCTile.prototype = new NPCObject;


// Townsfolk

function KingNPCTile() {
  this.name = 'KingNPC';
  this.level = 8;
  this.addhp = 100;
  this.str = 30;
  this.dex = 30;
  this.int = 30;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'stationary';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'assistPC';
  this.graphic = '315.gif';
  this.meleeAttackAs = 'MagicSword';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.desc = 'your father the King';
}
KingNPCTile.prototype = new NPCObject;


// Townsfolk

function PrinceNPCTile() {
  this.name = 'PrinceNPC';
  this.level = 7;
  this.addhp = 50;
  this.str = 25;
  this.dex = 25;
  this.int = 25;
  this.alignment = 'Good';
  this.attitude = 'Friendly';
  this.peaceAI = 'stationary';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'assistPC';
  this.graphic = 'prince.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Town Guard';
  this.desc = 'your brother the prince';
}
PrinceNPCTile.prototype = new NPCObject;


// CorruptTownsfolk

function CorruptPrinceNPCTile() {
  this.name = 'CorruptPrinceNPC';
  this.level = 7;
  this.addhp = 50;
  this.str = 25;
  this.dex = 25;
  this.int = 25;
  this.alignment = 'Evil';
  this.attitude = 'Friendly';
  this.peaceAI = 'stationary';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = 'prince.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Town Guard';
  this.desc = 'your brother the prince';
}
CorruptPrinceNPCTile.prototype = new NPCObject;


// CorruptTownsfolk

function CorruptGuardsNPCTile() {
  this.name = 'CorruptGuardsNPC';
  this.level = 4;
  this.addhp = 0;
  this.str = 20;
  this.dex = 20;
  this.int = 14;
  this.alignment = 'Evil';
  this.attitude = 'Friendly';
  this.peaceAI = 'guard';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '309.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Town Guard';
  this.prefix = 'a';
  this.desc = 'guard';
}
CorruptGuardsNPCTile.prototype = new NPCObject;


// Animal

function GiantRatNPCTile() {
  this.name = 'GiantRatNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 5;
  this.dex = 8;
  this.int = 2;
  this.alignment = 'Neutral';
  this.attitude = 'Hostile';
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = PickOne(["327.gif","361.gif"]);
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = '5';
  this.armorAbsorb = '5';
  this.armorResist = '0';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Small Animal';
  this.prefix = 'a';
  this.desc = 'giant rat';
}
GiantRatNPCTile.prototype = new NPCObject;


// Animal

function GiantSnakeNPCTile() {
  this.name = 'GiantSnakeNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 10;
  this.dex = 12;
  this.int = 3;
  this.alignment = 'Neutral';
  this.attitude = 'Hostile';
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = PickOne(["342.gif","376.gif"]);
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = '10';
  this.armorAbsorb = '5';
  this.armorResist = '0';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Small Animal';
  this.prefix = 'a';
  this.desc = 'giant snake';
  this.onHit = 'venom';
}
GiantSnakeNPCTile.prototype = new NPCObject;


// Animal

function GiantBatNPCTile() {
  this.name = 'GiantBatNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 5;
  this.dex = 15;
  this.int = 2;
  this.alignment = 'Neutral';
  this.attitude = 'Hostile';
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = PickOne(["362.gif","328.gif"]);
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = '5';
  this.armorAbsorb = '5';
  this.armorResist = '0';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = 'giant bat';
}
GiantBatNPCTile.prototype = new NPCObject;


// Animal

function LargeSpiderNPCTile() {
  this.name = 'LargeSpiderNPC';
  this.level = 3;
  this.addhp = 5;
  this.str = 12;
  this.dex = 12;
  this.int = 3;
  this.alignment = 'Neutral';
  this.attitude = 'Hostile';
  this.peaceAI = 'seekPC-10';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = PickOne(["329.gif","363.gif"]);
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = '5';
  this.armorAbsorb = '10';
  this.armorResist = '0';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Spiders';
  this.prefix = 'a';
  this.desc = 'large spider';
  this.onHit = 'venom';
}
LargeSpiderNPCTile.prototype = new NPCObject;


// Animal

function GiantSpiderNPCTile() {
  this.name = 'GiantSpiderNPC';
  this.level = 4;
  this.addhp = 10;
  this.str = 13;
  this.dex = 15;
  this.int = 5;
  this.alignment = 'Neutral';
  this.attitude = 'Hostile';
  this.peaceAI = 'seekPC-10';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = PickOne(["329.gif","363.gif"]);
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = '10';
  this.armorAbsorb = '15';
  this.armorResist = '5';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Giant Spider';
  this.prefix = 'a';
  this.desc = 'giant spider';
  this.onHit = 'paralyze';
}
GiantSpiderNPCTile.prototype = new NPCObject;


// Animal

function GiantInsectsNPCTile() {
  this.name = 'GiantInsectsNPC';
  this.level = 1;
  this.addhp = 2;
  this.str = 3;
  this.dex = 8;
  this.int = 2;
  this.alignment = 'Neutral';
  this.attitude = 'Hostile';
  this.peaceAI = 'seePC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = PickOne(["336.gif","370.gif"]);
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = '5';
  this.armorAbsorb = '5';
  this.armorResist = '0';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = 'swarm of insects';
}
GiantInsectsNPCTile.prototype = new NPCObject;


// Monster

function OrcNPCTile() {
  this.name = 'OrcNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 12;
  this.dex = 10;
  this.int = 6;
  this.alignment = 'Evil';
  this.attitude = 'Hostile';
  this.peaceAI = 'seekPC-25';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = PickOne(["339.gif","373.gif"]);
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = '10';
  this.armorAbsorb = '15';
  this.armorResist = '0';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Orcs';
  this.prefix = 'an';
  this.desc = 'orc';
}
OrcNPCTile.prototype = new NPCObject;


// Monster

function SlimeNPCTile() {
  this.name = 'SlimeNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 7;
  this.dex = 7;
  this.int = 1;
  this.alignment = 'Neutral';
  this.attitude = 'Hostile';
  this.peaceAI = 'seekPC-5';
  this.threatenedAI = 'spitter';
  this.PCThreatAI = 'attackPC';
  this.graphic = PickOne(["331.gif","365.gif"]);
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = '10';
  this.armorAbsorb = '0';
  this.armorResist = '0';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.desc = 'slime';
  this.onDamaged = 'split';
}
SlimeNPCTile.prototype = new NPCObject;


// CorruptTownsfolk

function HoodNPCTile() {
  this.name = 'HoodNPC';
  this.level = 1;
  this.addhp = 4;
  this.str = 11;
  this.dex = 9;
  this.int = 9;
  this.alignment = 'Evil';
  this.attitude = 'Hostile';
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = PickOne(["375.gif","341.gif"]);
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'a';
  this.desc = 'hood';
  this.onHit = 'steal gold';
}
HoodNPCTile.prototype = new NPCObject;


// CorruptTownsfolk

function RogueNPCTile() {
  this.name = 'RogueNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 10;
  this.dex = 13;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'Hostile';
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '306.gif';
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'a';
  this.desc = 'rogue';
  this.onHit = 'steal gold';
}
RogueNPCTile.prototype = new NPCObject;


// CorruptTownsfolk

function MinstrelNPCTile() {
  this.name = 'MinstrelNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 12;
  this.dex = 13;
  this.int = 12;
  this.alignment = 'Evil';
  this.attitude = 'Hostile';
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'missile';
  this.PCThreatAI = 'attackPC';
  this.graphic = '311.gif';
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'Sling';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'a';
  this.desc = 'minstrel';
  this.onHit = 'sing';
}
MinstrelNPCTile.prototype = new NPCObject;


// CorruptTownsfolk

function ThiefNPCTile() {
  this.name = 'ThiefNPC';
  this.level = 3;
  this.addhp = 8;
  this.str = 15;
  this.dex = 18;
  this.int = 14;
  this.alignment = 'Evil';
  this.attitude = 'Hostile';
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '306.gif';
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = '15';
  this.armorAbsorb = '20';
  this.armorResist = '5';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Adventurer';
  this.prefix = 'a';
  this.desc = 'thief';
  this.onHit = 'steal gold';
}
ThiefNPCTile.prototype = new NPCObject;

function GiantRatGroupSmallTile() {
  this.name = 'GiantRatGroupSmall';
  this.desc = 'giant rats';
  this.peaceAI = 'seekPC-15';
  this.graphic = PickOne(["327.gif","361.gif"]);
  this.group = new Array;
  this.group[0] = new NPCList('GiantRatNPC', '1d3+2');
  this.movetype = MOVE_WALK;
}
GiantRatGroupSmallTile.prototype = new NPCGroupObject;

function GiantRatGroupLargeTile() {
  this.name = 'GiantRatGroupLarge';
  this.desc = 'giant rats';
  this.peaceAI = 'seekPC-15';
  this.graphic = PickOne(["327.gif","361.gif"]);
  this.group = new Array;
  this.group[0] = new NPCList('GiantRatNPC', '1d5+4');
  this.movetype = MOVE_WALK;
}
GiantRatGroupLargeTile.prototype = new NPCGroupObject;

function OrcGroupSmallTile() {
  this.name = 'OrcGroupSmall';
  this.desc = 'orcs';
  this.peaceAI = 'seekPC-25';
  this.graphic = PickOne(["339.gif","373.gif"]);
  this.group = new Array;
  this.group[0] = new NPCList('OrcNPC', '1d3+2');
  this.movetype = MOVE_WALK;
}
OrcGroupSmallTile.prototype = new NPCGroupObject;

function OrcGroupLargeTile() {
  this.name = 'OrcGroupLarge';
  this.desc = 'orcs';
  this.peaceAI = 'seekPC-25';
  this.graphic = PickOne(["339.gif","373.gif"]);
  this.group = new Array;
  this.group[0] = new NPCList('OrcNPC', '1d5+4');
  this.movetype = MOVE_WALK;
}
OrcGroupLargeTile.prototype = new NPCGroupObject;

function HoodGroupSmallTile() {
  this.name = 'HoodGroupSmall';
  this.desc = 'hoods';
  this.peaceAI = 'seekPC-25';
  this.graphic = PickOne(["375.gif","341.gif"]);
  this.group = new Array;
  this.group[0] = new NPCList('HoodNPC', '1d3+1');
  this.movetype = MOVE_WALK;
}
HoodGroupSmallTile.prototype = new NPCGroupObject;

function HoodGroupLargeTile() {
  this.name = 'HoodGroupLarge';
  this.desc = 'hoods';
  this.peaceAI = 'seekPC-25';
  this.graphic = PickOne(["375.gif","341.gif"]);
  this.group = new Array;
  this.group[0] = new NPCList('HoodNPC', '1d3+3');
  this.group[1] = new NPCList('MinstrelNPC', '1d1');
  this.movetype = MOVE_WALK;
}
HoodGroupLargeTile.prototype = new NPCGroupObject;

function RogueGroupSmallTile() {
  this.name = 'RogueGroupSmall';
  this.desc = 'rogues';
  this.peaceAI = 'seekPC-25';
  this.graphic = '306.gif';
  this.group = new Array;
  this.group[0] = new NPCList('RogueNPC', '1d3+2');
  this.group[1] = new NPCList('HoodNPC', '1d3+1');
  this.movetype = MOVE_WALK;
}
RogueGroupSmallTile.prototype = new NPCGroupObject;

function RogueGroupLargeTile() {
  this.name = 'RogueGroupLarge';
  this.desc = 'rogues';
  this.peaceAI = 'seekPC-25';
  this.graphic = '306.gif';
  this.group = new Array;
  this.group[0] = new NPCList('RogueNPC', '1d4+3');
  this.group[1] = new NPCList('HoodNPC', '1d3+2');
  this.group[2] = new NPCList('MinstrelNPC', '1d2');
  this.movetype = MOVE_WALK;
}
RogueGroupLargeTile.prototype = new NPCGroupObject;

function ThiefGroupSmallTile() {
  this.name = 'ThiefGroupSmall';
  this.desc = 'thieves';
  this.peaceAI = 'seekPC-25';
  this.graphic = '306.gif';
  this.group = new Array;
  this.group[0] = new NPCList('ThiefNPC', '1d3+2');
  this.group[1] = new NPCList('RogueNPC', '1d3+1');
  this.movetype = MOVE_WALK;
}
ThiefGroupSmallTile.prototype = new NPCGroupObject;

function ThiefGroupLargeTile() {
  this.name = 'ThiefGroupLarge';
  this.desc = 'thieves';
  this.peaceAI = 'seekPC-25';
  this.graphic = '306.gif';
  this.group = new Array;
  this.group[0] = new NPCList('ThiefNPC', '1d4+3');
  this.group[1] = new NPCList('RogueNPC', '1d3+2');
  this.group[2] = new NPCList('MinstrelNPC', '1d2');
  this.movetype = MOVE_WALK;
}
ThiefGroupLargeTile.prototype = new NPCGroupObject;


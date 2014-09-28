
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
  this.meleeChance = 100;
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
  this.meleeChance = 30;
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
  this.meleeChance = 50;
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
  this.meleeChance = 50;
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
  this.meleeChance = 60;
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
  this.meleeChance = 100;
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
  this.meleeChance = 100;
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
  this.meleeChance = 40;
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
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'runaway';
  this.PCThreatAI = 'runaway';
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
  this.desc = 'small child';
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
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'runaway';
  this.PCThreatAI = 'runaway';
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
  this.desc = 'beggar';
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
  this.attitude = 'Friendly';
  this.peaceAI = 'townsfolk';
  this.threatenedAI = 'runaway';
  this.PCThreatAI = 'runaway';
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
  this.desc = 'jester';
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
  this.meleeChance = 100;
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
  this.meleeChance = 70;
}
KingNPCTile.prototype = new NPCObject();


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
  this.meleeChance = 70;
}
PrinceNPCTile.prototype = new NPCObject();


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
  this.meleeChance = 70;
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
  this.meleeChance = 100;
}
CorruptGuardsNPCTile.prototype = new NPCObject();


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
  this.graphic = '327.gif';
  this.altgraphic = '361.gif;'
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
  this.desc = 'giant rat';
  this.meleeChance = 100;
}
GiantRatNPCTile.prototype = new NPCObject();


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
  this.graphic = '342.gif';
  this.altgraphic = '376.gif;'
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
  this.desc = 'giant snake';
  this.onHit = 'venom';
  this.meleeChance = 100;
}
GiantSnakeNPCTile.prototype = new NPCObject();


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
  this.graphic = '362.gif';
  this.altgraphic = '328.gif;'
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
  this.desc = 'giant bat';
  this.meleeChance = 100;
}
GiantBatNPCTile.prototype = new NPCObject();


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
  this.graphic = '329.gif';
  this.altgraphic = '363.gif;'
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
  this.desc = 'large spider';
  this.onHit = 'venom';
  this.meleeChance = 100;
}
LargeSpiderNPCTile.prototype = new NPCObject();


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
  this.graphic = '329.gif';
  this.altgraphic = '363.gif;'
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
  this.desc = 'giant spider';
  this.onHit = 'paralyze';
  this.meleeChance = 100;
}
GiantSpiderNPCTile.prototype = new NPCObject();


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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '336.gif';
  this.altgraphic = '370.gif;'
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
  this.desc = 'swarm of insects';
  this.meleeChance = 100;
}
GiantInsectsNPCTile.prototype = new NPCObject();


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
  this.graphic = '339.gif';
  this.altgraphic = '373.gif;'
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 15;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Orcs';
  this.prefix = 'an';
  this.desc = 'orc';
  this.meleeChance = 100;
}
OrcNPCTile.prototype = new NPCObject();


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
  this.graphic = '331.gif';
  this.altgraphic = '365.gif;'
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 0;
  this.armorResist = 0;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.desc = 'slime';
  this.onDamaged = 'split';
  this.meleeChance = 70;
}
SlimeNPCTile.prototype = new NPCObject();


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
  this.graphic = '375.gif';
  this.altgraphic = '341.gif;'
  this.meleeAttackAs = 'Dagger';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'a';
  this.desc = 'hood';
  this.onHit = 'steal gold';
  this.meleeChance = 100;
}
HoodNPCTile.prototype = new NPCObject();


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
  this.meleeChance = 100;
}
RogueNPCTile.prototype = new NPCObject();


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
  this.meleeChance = 40;
}
MinstrelNPCTile.prototype = new NPCObject();


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
  this.armorDefense = 15;
  this.armorAbsorb = 20;
  this.armorResist = 5;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Adventurer';
  this.prefix = 'a';
  this.desc = 'thief';
  this.onHit = 'steal gold';
  this.meleeChance = 100;
}
ThiefNPCTile.prototype = new NPCObject();


// Monster

function TwisterNPCTile() {
  this.name = 'TwisterNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 14;
  this.dex = 16;
  this.int = 6;
  this.alignment = 'Neutral';
  this.attitude = 'Hostile';
  this.peaceAI = 'wander';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '324.gif';
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = 'twister';
  this.meleeChance = 100;
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
  this.attitude = 'Hostile';
  this.peaceAI = 'wander';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '324.gif';
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'an';
  this.desc = 'air elemental';
  this.meleeChance = 70;
}
AirElementalNPCTile.prototype = new NPCObject();


// Monster

function DrakeNPCTile() {
  this.name = 'DrakeNPC';
  this.level = 4;
  this.addhp = 5;
  this.str = 13;
  this.dex = 15;
  this.int = 10;
  this.alignment = 'Neutral';
  this.attitude = 'Hostile';
  this.peaceAI = 'wander';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '353.gif';
  this.altgraphic = '387.gif;'
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = '15,33,25Armor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Drake';
  this.prefix = 'a';
  this.desc = 'drake';
  this.meleeChance = 85;
}
DrakeNPCTile.prototype = new NPCObject();


// Monster

function AnimatedArmorNPCTile() {
  this.name = 'AnimatedArmorNPC';
  this.level = 2;
  this.addhp = 10;
  this.str = 13;
  this.dex = 8;
  this.int = 2;
  this.alignment = 'Neutral';
  this.attitude = 'Hostile';
  this.peaceAI = 'wander';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '338.gif';
  this.altgraphic = '372.gif;'
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'AnimArmor';
  this.desc = 'animated armor';
  this.meleeChance = 100;
}
AnimatedArmorNPCTile.prototype = new NPCObject();


// Monster

function Will-o-the-WispNPCTile() {
  this.name = 'Will-o-the-WispNPC';
  this.level = 5;
  this.addhp = 5;
  this.str = 14;
  this.dex = 18;
  this.int = 16;
  this.alignment = 'Neutral';
  this.attitude = 'Hostile';
  this.peaceAI = 'wander';
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'attackPC';
  this.graphic = '346.gif';
  this.altgraphic = '380.gif;'
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = '15,20,30Armor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'willowisp';
  this.prefix = 'a';
  this.desc = 'will-o-the-wisp';
  this.onHit = 'mana clash';
  this.meleeChance = 35;
}
Will-o-the-WispNPCTile.prototype = new NPCObject();

function GiantRatGroupSmallTile() {
  this.name = 'GiantRatGroupSmall';
  this.desc = 'giant rats';
  this.peaceAI = 'seekPC-15';
  this.graphic = '327.gif';
  this.altgraphic = '361.gif';
  this.group = [];
  this.group[0] = new NPCList('GiantRatNPC', '1d3+2');
  this.movetype = MOVE_WALK;
}
GiantRatGroupSmallTile.prototype = new NPCGroupObject();

function GiantRatGroupLargeTile() {
  this.name = 'GiantRatGroupLarge';
  this.desc = 'giant rats';
  this.peaceAI = 'seekPC-15';
  this.graphic = '327.gif';
  this.altgraphic = '361.gif';
  this.group = [];
  this.group[0] = new NPCList('GiantRatNPC', '1d5+4');
  this.movetype = MOVE_WALK;
}
GiantRatGroupLargeTile.prototype = new NPCGroupObject();

function OrcGroupSmallTile() {
  this.name = 'OrcGroupSmall';
  this.desc = 'orcs';
  this.peaceAI = 'seekPC-25';
  this.graphic = '339.gif';
  this.altgraphic = '373.gif';
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d3+2');
  this.movetype = MOVE_WALK;
}
OrcGroupSmallTile.prototype = new NPCGroupObject();

function OrcGroupLargeTile() {
  this.name = 'OrcGroupLarge';
  this.desc = 'orcs';
  this.peaceAI = 'seekPC-25';
  this.graphic = '339.gif';
  this.altgraphic = '373.gif';
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d5+4');
  this.movetype = MOVE_WALK;
}
OrcGroupLargeTile.prototype = new NPCGroupObject();

function HoodGroupSmallTile() {
  this.name = 'HoodGroupSmall';
  this.desc = 'hoods';
  this.peaceAI = 'seekPC-25';
  this.graphic = '375.gif';
  this.altgraphic = '341.gif';
  this.group = [];
  this.group[0] = new NPCList('HoodNPC', '1d3+1');
  this.movetype = MOVE_WALK;
}
HoodGroupSmallTile.prototype = new NPCGroupObject();

function HoodGroupLargeTile() {
  this.name = 'HoodGroupLarge';
  this.desc = 'hoods';
  this.peaceAI = 'seekPC-25';
  this.graphic = '375.gif';
  this.altgraphic = '341.gif';
  this.group = [];
  this.group[0] = new NPCList('HoodNPC', '1d3+3');
  this.group[1] = new NPCList('MinstrelNPC', '1d1');
  this.movetype = MOVE_WALK;
}
HoodGroupLargeTile.prototype = new NPCGroupObject();

function RogueGroupSmallTile() {
  this.name = 'RogueGroupSmall';
  this.desc = 'rogues';
  this.peaceAI = 'seekPC-25';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('RogueNPC', '1d3+2');
  this.group[1] = new NPCList('HoodNPC', '1d3+1');
  this.movetype = MOVE_WALK;
}
RogueGroupSmallTile.prototype = new NPCGroupObject();

function RogueGroupLargeTile() {
  this.name = 'RogueGroupLarge';
  this.desc = 'rogues';
  this.peaceAI = 'seekPC-25';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('RogueNPC', '1d4+3');
  this.group[1] = new NPCList('HoodNPC', '1d3+2');
  this.group[2] = new NPCList('MinstrelNPC', '1d2');
  this.movetype = MOVE_WALK;
}
RogueGroupLargeTile.prototype = new NPCGroupObject();

function ThiefGroupSmallTile() {
  this.name = 'ThiefGroupSmall';
  this.desc = 'thieves';
  this.peaceAI = 'seekPC-25';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('ThiefNPC', '1d3+2');
  this.group[1] = new NPCList('RogueNPC', '1d3+1');
  this.movetype = MOVE_WALK;
}
ThiefGroupSmallTile.prototype = new NPCGroupObject();

function ThiefGroupLargeTile() {
  this.name = 'ThiefGroupLarge';
  this.desc = 'thieves';
  this.peaceAI = 'seekPC-25';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('ThiefNPC', '1d4+3');
  this.group[1] = new NPCList('RogueNPC', '1d3+2');
  this.group[2] = new NPCList('MinstrelNPC', '1d2');
  this.movetype = MOVE_WALK;
}
ThiefGroupLargeTile.prototype = new NPCGroupObject();


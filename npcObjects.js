
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
  this.attitude = 'friendly';
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
  this.attitude = 'friendly';
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
  this.attitude = 'friendly';
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
  this.spellsknown = { control: 1, attack: 1, };
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
  this.spellsknown = { heal: 1, control: 1, buff: 1, };
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
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
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
  this.spellsknown = { heal: 1, attack: 1, };
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
  this.attitude = 'friendly';
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
  this.attitude = 'friendly';
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
  this.spellsknown = { control: 1, buff: 1, };
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
  this.attitude = 'friendly';
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
  this.attitude = 'friendly';
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
  this.attitude = 'friendly';
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
  this.attitude = 'friendly';
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
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
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
  this.attitude = 'friendly';
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
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
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
  this.attitude = 'friendly';
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
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
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

function GiantBatNPCTile() {
  this.name = 'GiantBatNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 5;
  this.dex = 15;
  this.int = 2;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'giant bat';
  this.meleeChance = 100;
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'swarm of insects';
  this.meleeChance = 100;
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'giant rat';
  this.meleeChance = 100;
}
GiantRatNPCTile.prototype = new NPCObject();


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
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '375.gif';
  this.altgraphic = ['341.gif',];
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

function MinstrelNPCTile() {
  this.name = 'MinstrelNPC';
  this.level = 1;
  this.addhp = 0;
  this.str = 12;
  this.dex = 13;
  this.int = 12;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
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
  this.spellsknown = { buff: 1, };
  special = 'sing';
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
  this.peaceAI = 'seekPC-5';
  this.threatenedAI = 'spitter';
  this.PCThreatAI = 'attackPC';
  this.graphic = '331.gif';
  this.altgraphic = ['365.gif',];
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
  resists = { fire:20 };
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
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'attackPC';
  this.graphic = '303.gif';
  this.altgraphic = ['303.2.gif','mage-offcolor.gif',];
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'an';
  this.desc = 'apprentice';
  this.spellsknown = { control: 1, attack: 1, };
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
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '308.gif';
  this.altgraphic = ['fighter-offcolor.gif',];
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Minor Adventurer';
  this.prefix = 'a';
  this.desc = 'fighter';
  this.meleeChance = 100;
}
FighterNPCTile.prototype = new NPCObject();


// Animal

function GiantSnakeNPCTile() {
  this.name = 'GiantSnakeNPC';
  this.level = 2;
  this.addhp = 0;
  this.str = 10;
  this.dex = 12;
  this.int = 3;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'giant snake';
  this.onHit = 'venom';
  this.meleeChance = 100;
}
GiantSnakeNPCTile.prototype = new NPCObject();


// Monster

function HeadlessNPCTile() {
  this.name = 'HeadlessNPC';
  this.level = 2;
  this.addhp = 5;
  this.str = 15;
  this.dex = 12;
  this.int = 5;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '344.gif';
  this.altgraphic = ['378.gif',];
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Headless';
  this.prefix = 'a';
  this.desc = 'headless';
  this.meleeChance = 100;
}
HeadlessNPCTile.prototype = new NPCObject();


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
  this.threatenedAI = 'ranger';
  this.PCThreatAI = 'attackPC';
  this.graphic = '323.gif';
  this.altgraphic = ['357.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'Bow';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'Nixie';
  this.prefix = 'a';
  this.desc = 'nixie';
  this.meleeChance = 50;
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
  this.peaceAI = 'seekPC-25';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '339.gif';
  this.altgraphic = ['373.gif',];
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '340.gif';
  this.altgraphic = ['374.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Skeleton';
  this.prefix = 'a';
  this.desc = 'skeleton';
  this.meleeChance = 100;
  resists = { ice:33 };
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
  this.peaceAI = 'wander';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '338.gif';
  this.altgraphic = ['372.gif',];
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'missile';
  this.PCThreatAI = 'attackPC';
  this.graphic = 'ranger-offcolor.gif';
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'Bow';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Lesser Adventurer';
  this.prefix = 'an';
  this.desc = 'archer';
  this.initmult = 0.8;
  this.meleeChance = 30;
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'missile';
  this.PCThreatAI = 'attackPC';
  this.graphic = 'bard-offcolor.gif';
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'Bow';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Lesser Adventurer';
  this.prefix = 'a';
  this.desc = 'bard';
  this.meleeChance = 40;
  this.spellsknown = { control: 1, buff: 1, };
  special = 'sing';
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'attackPC';
  this.graphic = '302.gif';
  this.altgraphic = ['druid-offcolor.gif','druid-offcolor.1.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Lesser Adventurer';
  this.prefix = 'a';
  this.desc = 'druid';
  this.meleeChance = 30;
  this.spellsknown = { heal: 1, control: 1, buff: 1, };
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
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '349.gif';
  this.altgraphic = ['383.gif',];
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = 'fire lizard';
  resists = { fire:66 };
  special = 'firebreath';
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
  this.peaceAI = 'seekPC-10';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'fluke';
  this.meleeChance = 40;
  this.spellsknown = { control: 1, };
  resists = { ice:33 };
  special = 'whirlpool, hides:spacer.gif';
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '330.gif';
  this.altgraphic = ['364.gif',];
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'Ghost';
  this.prefix = 'a';
  this.desc = 'ghost';
  this.onDamaged = 'incorporeal';
  this.meleeChance = 100;
  resists = { ice:50 };
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
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'giant spider';
  this.onHit = 'venom';
  this.meleeChance = 100;
}
GiantSpiderNPCTile.prototype = new NPCObject();


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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = 'shepherd-offcolor.1.gif';
  this.altgraphic = ['shepherd-offcolor.gif',];
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Lesser Adventurer';
  this.prefix = 'an';
  this.desc = 'animal handler';
  this.meleeChance = 70;
  this.spellsknown = { buff: 1, };
  special = 'animalhandler';
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
  this.peaceAI = 'wait';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '368.gif';
  this.altgraphic = ['334.gif',];
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Mimic';
  this.prefix = 'a';
  this.desc = 'mimic';
  this.meleeChance = 100;
  special = 'hides:008.gif, hidename:"a chest", spitter';
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
  this.peaceAI = 'seekPC-25';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '339.gif';
  this.altgraphic = ['373.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'Orcs';
  this.prefix = 'an';
  this.desc = 'orc shaman';
  this.meleeChance = 33;
  this.spellsknown = { heal: 1, buff: 1, };
}
OrcShamanNPCTile.prototype = new NPCObject();


// Animal

function PythonNPCTile() {
  this.name = 'PythonNPC';
  this.level = 3;
  this.addhp = 0;
  this.str = 13;
  this.dex = 14;
  this.int = 3;
  this.alignment = 'Neutral';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '342.gif';
  this.altgraphic = ['376.gif',];
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
  this.desc = 'python';
  this.onHit = 'venom';
  this.meleeChance = 100;
  special = 'spitter';
}
PythonNPCTile.prototype = new NPCObject();


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
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '324.gif';
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
  this.desc = 'seahorse';
  this.meleeChance = 75;
  special = 'lbolt';
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

function TrollNPCTile() {
  this.name = 'TrollNPC';
  this.level = 3;
  this.addhp = 5;
  this.str = 16;
  this.dex = 14;
  this.int = 8;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'ranger';
  this.PCThreatAI = 'attackPC';
  this.graphic = '332.gif';
  this.altgraphic = ['366.gif',];
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'Bow';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Trolls';
  this.prefix = 'a';
  this.desc = 'troll';
  this.meleeChance = 50;
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
  this.attitude = 'hostile';
  this.peaceAI = 'wander';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = 'air_elemental.gif';
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'an';
  this.desc = 'air elemental';
  this.meleeChance = 70;
  special = 'lbolt';
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
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'ranger';
  this.PCThreatAI = 'attackPC';
  this.graphic = '345.gif';
  this.altgraphic = ['379.gif',];
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'Boulder';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'Cyclops';
  this.prefix = 'a';
  this.desc = 'cyclops';
  this.onHit = 'knockback';
  this.meleeChance = 60;
}
CyclopsNPCTile.prototype = new NPCObject();


// Monster

function Deep NixieNPCTile() {
  this.name = 'Deep NixieNPC';
  this.level = 4;
  this.addhp = 0;
  this.str = 17;
  this.dex = 17;
  this.int = 15;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-10';
  this.threatenedAI = 'makeknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '323.gif';
  this.altgraphic = ['357.gif',];
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = 'deep nixie';
  this.meleeChance = 60;
  this.spellsknown = { attack: 1, buff: 1, };
}
Deep NixieNPCTile.prototype = new NPCObject();


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
  this.peaceAI = 'wander';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'drake';
  this.meleeChance = 85;
  this.spellsknown = { attack: 1, };
  resists = { fire:50 };
  special = 'firebreath';
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
  this.peaceAI = 'wander';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = 'boulder.gif';
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
  this.desc = 'earth elemental';
  this.initmult = 1.2;
  this.meleeChance = 100;
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
  this.peaceAI = 'wander';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '143.gif';
  this.meleeAttackAs = 'Axe';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = 'fire elemental';
  this.meleeChance = 60;
  this.spellsknown = { attack: 1, };
  resists = { fire:100, ice:-50 };
  special = 'flamearmor';
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
  this.peaceAI = 'wander';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'lurker';
  this.onHit = 'entangle';
  this.meleeChance = 100;
  special = 'invisible';
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'ranger';
  this.PCThreatAI = 'attackPC';
  this.graphic = '339.gif';
  this.altgraphic = ['373.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'Bow';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'HighOrcs';
  this.prefix = 'an';
  this.desc = 'orc captain';
  this.meleeChance = 66;
  this.spellsknown = { buff: 1, };
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '307.gif';
  this.altgraphic = ['307.2.gif','paladin-offcolor.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'HighAdventurer';
  this.prefix = 'a';
  this.desc = 'paladin';
  this.meleeChance = 66;
  this.spellsknown = { heal: 1, attack: 1, buff: 1, };
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
  this.peaceAI = 'wander';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'sea serpent';
  this.meleeChance = 80;
  special = 'firebreath';
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
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'giant spider';
  this.onHit = 'paralyze';
  this.meleeChance = 100;
  special = 'spitter';
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
  this.peaceAI = 'wander';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '325.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChaineArmor';
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'a';
  this.desc = 'water elemental';
  this.onHit = 'slow';
  this.meleeChance = 75;
  resists = { ice:50, fire:-25 };
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
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'attackPC';
  this.graphic = '381.gif';
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'HighAdventurer';
  this.prefix = 'a';
  this.desc = 'wizard';
  this.meleeChance = 10;
  this.spellsknown = { control: 1, attack: 1, buff: 1, };
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
  this.peaceAI = 'wander';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'corpser';
  this.onHit = 'entangle';
  this.meleeChance = 100;
  special = 'invisible, reach';
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
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'ettin';
  this.meleeChance = 100;
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
  this.peaceAI = 'seekPC-5';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '103.gif';
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'the';
  this.desc = 'floor';
  this.meleeChance = 100;
  special = 'trueinvisible';
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'attackPC';
  this.graphic = '337.gif';
  this.altgraphic = ['371.gif',];
  this.meleeAttackAs = 'Shortsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'LeatherArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'gazer';
  this.prefix = 'a';
  this.desc = 'gazer';
  this.meleeChance = 20;
  this.spellsknown = { attack: 1, };
  special = 'sleep, ondeathInsects';
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
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '352.gif';
  this.altgraphic = ['386.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'hydra';
  this.prefix = 'a';
  this.desc = 'hydra';
  this.onHit = 'venom';
  this.initmult = 1.2;
  this.meleeChance = 80;
  special = 'firebreath, multiattack';
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
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '349.gif';
  this.altgraphic = ['383.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'magmaspawn';
  this.prefix = 'a';
  this.desc = 'magma spawn';
  this.meleeChance = 80;
  special = 'magmaspit, magmaheal';
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
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '338.gif';
  this.altgraphic = ['372.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'phantom';
  this.prefix = 'a';
  this.desc = 'phantom';
  this.meleeChance = 75;
  this.spellsknown = { attack: 1, };
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
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'ranger';
  this.PCThreatAI = 'attackPC';
  this.graphic = '305.gif';
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'Crossbow';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'HighAdventurer';
  this.prefix = 'a';
  this.desc = 'ranger';
  this.meleeChance = 25;
  this.spellsknown = { heal: 1, control: 1, };
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
  this.peaceAI = 'wander';
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'attackPC';
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
  this.lootTable = 'willowisp';
  this.prefix = 'a';
  this.desc = 'will-o-the-wisp';
  this.onHit = 'mana clash';
  this.meleeChance = 35;
  this.spellsknown = { control: 1, attack: 1, };
  special = 'teleport, energy bolt';
}
WillotheWispNPCTile.prototype = new NPCObject();


// Monster

function XornNPCTile() {
  this.name = 'XornNPC';
  this.level = 5;
  this.addhp = 5;
  this.str = 16;
  this.dex = 14;
  this.int = 9;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '350.gif';
  this.altgraphic = ['384.gif',];
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'xorn';
  this.prefix = 'a';
  this.desc = 'xorn';
  this.initmult = 1.2;
  this.meleeChance = 100;
}
XornNPCTile.prototype = new NPCObject();


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
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'attackPC';
  this.graphic = '303.gif';
  this.meleeAttackAs = 'Mace';
  this.missileAttackAs = 'none';
  this.armorAs = 'none';
  this.armorDefense = 10;
  this.armorAbsorb = 10;
  this.armorResist = 30;
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'archmage';
  this.prefix = 'an';
  this.desc = 'archmage';
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
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
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackAll';
  this.graphic = 'blackdragon.gif';
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = '';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'blackdragon';
  this.prefix = 'a';
  this.desc = 'black dragon';
  this.meleeChance = 70;
  this.spellsknown = { control: 1, attack: 1, };
  special = 'firebreath';
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
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '352.gif';
  this.altgraphic = ['386.gif',];
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'devourer';
  this.prefix = 'the';
  this.desc = 'devourer';
  this.onHit = 'venom';
  this.onDamaged = 'acidblood';
  this.meleeChance = 70;
  this.spellsknown = { control: 1, buff: 1, };
  resists = { fire:50, ice:50 };
  special = 'firebreath, icebreath, multiattack';
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
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '353.gif';
  this.altgraphic = ['387.gif',];
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'dragon';
  this.prefix = 'a';
  this.desc = 'dragon';
  this.meleeChance = 70;
  this.spellsknown = { control: 1, attack: 1, };
  resists = { fire:50 };
  special = 'firebreath';
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
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
  this.lootTable = 'ettinsorcerer';
  this.prefix = 'an';
  this.desc = 'ettin sorcerer';
  this.meleeChance = 40;
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
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
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'ranger';
  this.PCThreatAI = 'attackPC';
  this.graphic = '345.gif';
  this.altgraphic = ['379.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'Boulder';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Blood';
  this.lootTable = 'giant';
  this.prefix = 'a';
  this.desc = 'giant';
  this.onHit = 'knockback';
  this.meleeChance = 60;
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
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
  this.desc = 'kraken';
  this.onDamaged = 'shock';
  this.meleeChance = 85;
  special = 'lbolt';
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
  this.peaceAI = 'stationary';
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'attackPC';
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
  this.lootTable = 'repear';
  this.prefix = 'a';
  this.desc = 'repear';
  this.meleeChance = 50;
  this.spellsknown = { control: 1, attack: 1, buff: 1, };
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
  this.peaceAI = 'seekPC-20';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '330.gif';
  this.altgraphic = ['364.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = 'none';
  this.lootTable = 'specter';
  this.prefix = 'a';
  this.desc = 'specter';
  this.onDamaged = 'incorporeal';
  this.meleeChance = 66;
  this.spellsknown = { control: 1, attack: 1, };
  special = 'phase';
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
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
  this.lootTable = 'daemon';
  this.prefix = 'a';
  this.desc = 'daemon';
  this.meleeChance = 75;
  this.spellsknown = { control: 1, attack: 1, };
}
DaemonNPCTile.prototype = new NPCObject();


// Monster

function DelverNPCTile() {
  this.name = 'DelverNPC';
  this.level = 7;
  this.addhp = 10;
  this.str = 26;
  this.dex = 15;
  this.int = 10;
  this.alignment = 'Evil';
  this.attitude = 'hostile';
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '350.gif';
  this.altgraphic = ['384.gif',];
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'none';
  this.armorAs = 'ExoticArmor';
  this.movetype = MOVE_ETHEREAL;
  this.leavesCorpse = '';
  this.lootTable = 'delver';
  this.prefix = 'a';
  this.desc = 'delver';
  this.meleeChance = 90;
  special = 'summonearthelemental';
}
DelverNPCTile.prototype = new NPCObject();


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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'attackPC';
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
  this.lootTable = 'liche';
  this.prefix = 'a';
  this.desc = 'liche';
  this.spellsknown = { control: 1, attack: 1, buff: 1, };
  resists = { ice:66 };
  special = 'createundead';
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
  this.peaceAI = 'seekPC-25';
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'attackPC';
  this.graphic = '337.gif';
  this.altgraphic = ['371.gif',];
  this.meleeAttackAs = 'Longsword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ChainArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'eyes';
  this.prefix = 'the';
  this.desc = 'eyes of spite';
  this.onHit = 'paralyze';
  this.meleeChance = 15;
  this.spellsknown = { heal: 1, control: 1, attack: 1, buff: 1, };
  special = 'sleep, ondeathInsects';
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
  this.peaceAI = 'stationary';
  this.threatenedAI = 'spellcaster';
  this.PCThreatAI = 'attackPC';
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
  this.lootTable = 'reaperlord';
  this.prefix = 'a';
  this.desc = 'reaper lord';
  this.meleeChance = 50;
  this.spellsknown = { control: 1, attack: 1, buff: 1, };
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
  this.peaceAI = 'seekPC-7';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = 'elder_dragon.gif';
  this.meleeAttackAs = 'MagicSword';
  this.missileAttackAs = 'none';
  this.armorAs = 'ExoticArmor';
  this.movetype = MOVE_FLY;
  this.leavesCorpse = 'none';
  this.lootTable = 'elderdragon';
  this.prefix = 'an';
  this.desc = 'elder dragon';
  this.meleeChance = 65;
  this.spellsknown = { control: 1, attack: 1, buff: 1, };
  resists = { fire:50 };
  special = 'firebreath';
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
  this.peaceAI = 'seekPC-15';
  this.threatenedAI = 'mageknight';
  this.PCThreatAI = 'attackPC';
  this.graphic = '354.gif';
  this.altgraphic = ['388.gif',];
  this.meleeAttackAs = 'MagicSword';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'balron';
  this.prefix = 'a';
  this.desc = 'balron';
  this.meleeChance = 75;
  this.spellsknown = { control: 1, attack: 1, };
  resists = { fire:100 };
  special = 'phase';
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
  this.threatenedAI = 'ranger';
  this.PCThreatAI = 'attackPC';
  this.graphic = '345.gif';
  this.altgraphic = ['379.gif',];
  this.meleeAttackAs = 'Halberd';
  this.missileAttackAs = 'Boulder';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'none';
  this.lootTable = 'titan';
  this.prefix = 'a';
  this.desc = 'titan';
  this.onHit = 'knockback, stun';
  this.meleeChance = 70;
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
  this.peaceAI = 'seekPC-5';
  this.threatenedAI = 'melee';
  this.PCThreatAI = 'attackPC';
  this.graphic = '322.gif';
  this.altgraphic = ['356.gif',];
  this.meleeAttackAs = 'MagicSword';
  this.missileAttackAs = 'none';
  this.armorAs = 'PlateArmor';
  this.movetype = MOVE_SWIM;
  this.leavesCorpse = 'none';
  this.lootTable = 'none';
  this.prefix = 'an';
  this.desc = 'abyssal kraken';
  this.onDamaged = 'shock';
  this.meleeChance = 90;
  special = 'lbolt';
}
AbyssalKrakenNPCTile.prototype = new NPCObject();

function GiantRatGroupSmallTile() {
  this.name = 'GiantRatGroupSmall';
  this.desc = 'giant rats';
  this.peaceAI = 'Animal-15';
  this.graphic = '327.gif';
  this.altgraphic = ['361.gif',];
  this.group = [];
  this.group[0] = new NPCList('GiantRatNPC', '1d3+2');
  this.movetype = MOVE_;
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
  this.movetype = MOVE_;
}
GiantRatGroupLargeTile.prototype = new NPCGroupObject();

function OrcGroupSmallTile() {
  this.name = 'OrcGroupSmall';
  this.desc = 'orcs';
  this.peaceAI = 'Monster-25';
  this.graphic = '339.gif';
  this.altgraphic = ['373.gif',];
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d3+2');
  this.movetype = MOVE_;
}
OrcGroupSmallTile.prototype = new NPCGroupObject();

function OrcGroupLargeTile() {
  this.name = 'OrcGroupLarge';
  this.desc = 'orcs';
  this.peaceAI = 'Monster-25';
  this.graphic = '339.gif';
  this.altgraphic = ['373.gif',];
  this.group = [];
  this.group[0] = new NPCList('OrcNPC', '1d5+4');
  this.movetype = MOVE_;
}
OrcGroupLargeTile.prototype = new NPCGroupObject();

function HoodGroupSmallTile() {
  this.name = 'HoodGroupSmall';
  this.desc = 'hoods';
  this.peaceAI = 'Bandit-20';
  this.graphic = '375.gif';
  this.altgraphic = ['341.gif',];
  this.group = [];
  this.group[0] = new NPCList('HoodNPC', '1d3+1');
  this.movetype = MOVE_;
}
HoodGroupSmallTile.prototype = new NPCGroupObject();

function HoodGroupLargeTile() {
  this.name = 'HoodGroupLarge';
  this.desc = 'hoods';
  this.peaceAI = 'Bandit-20';
  this.graphic = '375.gif';
  this.altgraphic = ['341.gif',];
  this.group = [];
  this.group[0] = new NPCList('HoodNPC', '1d3+3');
  this.group[1] = new NPCList('MinstrelNPC', '1d1');
  this.movetype = MOVE_;
}
HoodGroupLargeTile.prototype = new NPCGroupObject();

function RogueGroupSmallTile() {
  this.name = 'RogueGroupSmall';
  this.desc = 'rogues';
  this.peaceAI = 'Bandit-20';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('RogueNPC', '1d3+2');
  this.group[1] = new NPCList('HoodNPC', '1d3+1');
  this.movetype = MOVE_;
}
RogueGroupSmallTile.prototype = new NPCGroupObject();

function RogueGroupLargeTile() {
  this.name = 'RogueGroupLarge';
  this.desc = 'rogues';
  this.peaceAI = 'Bandit-20';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('RogueNPC', '1d4+3');
  this.group[1] = new NPCList('HoodNPC', '1d3+2');
  this.group[2] = new NPCList('MinstrelNPC', '1d2');
  this.movetype = MOVE_;
}
RogueGroupLargeTile.prototype = new NPCGroupObject();

function ThiefGroupSmallTile() {
  this.name = 'ThiefGroupSmall';
  this.desc = 'thieves';
  this.peaceAI = 'Bandit-20';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('ThiefNPC', '1d3+2');
  this.group[1] = new NPCList('RogueNPC', '1d3+1');
  this.movetype = MOVE_;
}
ThiefGroupSmallTile.prototype = new NPCGroupObject();

function ThiefGroupLargeTile() {
  this.name = 'ThiefGroupLarge';
  this.desc = 'thieves';
  this.peaceAI = 'Bandit-20';
  this.graphic = '306.gif';
  this.group = [];
  this.group[0] = new NPCList('ThiefNPC', '1d4+3');
  this.group[1] = new NPCList('RogueNPC', '1d3+2');
  this.group[2] = new NPCList('MinstrelNPC', '1d2');
  this.movetype = MOVE_;
}
ThiefGroupLargeTile.prototype = new NPCGroupObject();

function LowbiePartyTile() {
  this.name = 'LowbieParty';
  this.desc = 'a party of adventurers';
  this.peaceAI = 'Bandit-20';
  this.graphic = '308.gif';
  this.group = [];
  this.group[0] = new NPCList('FighterNPC', '1d2');
  this.group[1] = new NPCList('RogueNPC', '1d2');
  this.group[2] = new NPCList('MinstrelNPC', '1d2-1');
  this.group[3] = new NPCList('ApprenticeNPC', '1d2-1');
  this.movetype = MOVE_Apprentice;
}
LowbiePartyTile.prototype = new NPCGroupObject();

function HeadlessGroupSmallTile() {
  this.name = 'HeadlessGroupSmall';
  this.desc = 'headlesses';
  this.peaceAI = 'Monster-15';
  this.graphic = '344.gif';
  this.altgraphic = ['378.gif',];
  this.group = [];
  this.group[0] = new NPCList('HeadlessNPC', '1d4+1');
  this.movetype = MOVE_;
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
  this.movetype = MOVE_;
}
HeadlessGroupLargeTile.prototype = new NPCGroupObject();

function SnakesTile() {
  this.name = 'Snakes';
  this.desc = 'giant snakes';
  this.peaceAI = 'Animal-15';
  this.graphic = '342.gif';
  this.altgraphic = ['376.gif',];
  this.group = [];
  this.group[0] = new NPCList('GiantSnakeNPC', '1d4+2');
  this.movetype = MOVE_;
}
SnakesTile.prototype = new NPCGroupObject();


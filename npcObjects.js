
// functions

function PickOne(fromarray) {
  var num = fromarray.length+1;
  var roll = Math.floor(Math.random() * num);
  return fromarray[roll];
}

// Townsfolk

function DruidVillagerNPCTile() {
	this.name = "DruidVillagerNPC";
	this.level = 1;
	this.str = 10;
	this.dex = 12;
	this.int = 14;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "spellcaster";
	this.graphic = "302.gif";
	this.meleeAttackAs = "Fists";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
DruidVillagerNPCTile.prototype = new NPCObject;

function ShepherdVillagerNPCTile() {
	this.name = "ShepherdVillagerNPC";
	this.level = 1;
	this.str = 12;
	this.dex = 12;
	this.int = 12;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "melee";
	this.graphic = "301.gif";
	this.meleeAttackAs = "Dagger";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
ShepherdVillagerNPCTile.prototype = new NPCObject;

function MageVillagerNPCTile() {
	this.name = "MageVillagerNPC";
	this.level = 1;
	this.str = 10;
	this.dex = 10;
	this.int = 16;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "spellcaster";
	this.graphic = "303.gif";
	this.meleeAttackAs = "Fists";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
MageVillagerNPCTile.prototype = new NPCObject;

function TinkerVillagerNPCTile() {
	this.name = "TinkerVillagerNPC";
	this.level = 1;
	this.str = 12;
	this.dex = 14;
	this.int = 10;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "missile";
	this.graphic = "304.gif";
	this.meleeAttackAs = "Dagger";
	this.missileAttackAs = "Sling";
	this.movetype = MOVE_WALK;
}
TinkerVillagerNPCTile.prototype = new NPCObject;

function RangerVillagerNPCTile() {
	this.name = "RangerVillagerNPC";
	this.level = 1;
	this.str = 11;
	this.dex = 14;
	this.int = 11;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "ranger";
	this.graphic = "305.gif";
	this.meleeAttackAs = "Dagger";
	this.missileAttackAs = "Sling";
	this.movetype = MOVE_WALK;
}
RangerVillagerNPCTile.prototype = new NPCObject;

function AdventurerVillagerNPCTile() {
	this.name = "AdventurerVillagerNPC";
	this.level = 1;
	this.str = 12;
	this.dex = 12;
	this.int = 12;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "adventurer";
	this.graphic = "306.gif";
	this.meleeAttackAs = "Shortsword";
	this.missileAttackAs = "Sling";
	this.movetype = MOVE_WALK;
}
AdventurerVillagerNPCTile.prototype = new NPCObject;

function PaladinVillagerNPCTile() {
	this.name = "PaladinVillagerNPC";
	this.level = 1;
	this.str = 14;
	this.dex = 10;
	this.int = 12;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "paladin";
	this.graphic = "307.gif";
	this.meleeAttackAs = "Shortsword";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
PaladinVillagerNPCTile.prototype = new NPCObject;

function FighterVillagerNPCTile() {
	this.name = "FighterVillagerNPC";
	this.level = 1;
	this.str = 14;
	this.dex = 12;
	this.int = 10;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "melee";
	this.graphic = "308.gif";
	this.meleeAttackAs = "Shortsword";
	this.missileAttackAs = "Sling";
	this.movetype = MOVE_WALK;
}
FighterVillagerNPCTile.prototype = new NPCObject;

function TownsfolkVillagerNPCTile() {
	this.name = "TownsfolkVillagerNPC";
	this.level = 1;
	this.str = 10;
	this.dex = 10;
	this.int = 10;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "melee";
	this.graphic = "310.gif";
	this.meleeAttackAs = "Dagger";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
TownsfolkVillagerNPCTile.prototype = new NPCObject;

function BardVillagerNPCTile() {
	this.name = "BardVillagerNPC";
	this.level = 1;
	this.str = 10;
	this.dex = 14;
	this.int = 12;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "ranger";
	this.graphic = "311.gif";
	this.meleeAttackAs = "Dagger";
	this.missileAttackAs = "Bow";
	this.movetype = MOVE_WALK;
}
BardVillagerNPCTile.prototype = new NPCObject;

function ChildNPCTile() {
	this.name = "ChildNPC";
	this.level = 1;
	this.str = 7;
	this.dex = 7;
	this.int = 7;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "runaway";
	this.graphic = "312.gif";
	this.meleeAttackAs = "Fists";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
ChildNPCTile.prototype = new NPCObject;

function BeggerNPCTile() {
	this.name = "BeggerNPC";
	this.level = 1;
	this.str = 7;
	this.dex = 7;
	this.int = 7;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "runaway";
	this.graphic = "313.gif";
	this.meleeAttackAs = "Fists";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
BeggerNPCTile.prototype = new NPCObject;

function TownGuardNPCTile() {
  this.name = "TownGuardNPC";
	this.level = 5;
	this.str = 23;
	this.dex = 23;
	this.int = 14;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "guard";
	this.PCThreatAI = "melee";
	this.threatenedAI = "melee";
	this.graphic = "309.gif";
	this.meleeAttackAs = "Halberd";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
TownGuardNPCTile.prototype = new NPCObject;

function KingNPCTile() {
  this.name = "KingNPC";
	this.level = 8;
	this.str = 30;
	this.dex = 30;
	this.int = 30;
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "spellcaster";
	this.threatenedAI = "spellcaster";
	this.graphic = "315.gif";
	this.meleeAttackAs = "MagicSword";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
KingNPCTile.prototype = new NPCObject;

function PrinceNPCTile() {
  this.name = "PrinceNPC";
	this.level = 7;
	this.str = 25;
	this.dex = 25;
	this.int = 25;
	this.alignment = "good";
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "townsfolk";
	this.threatenedAI = "melee";
	this.graphic = "prince.gif";
	this.meleeAttackAs = "Longsword";
	this.missileAttackAs = "none";
	this.movetype = MOVE_WALK;
}
PrinceNPCTile.prototype = new NPCObject;

// Monsters

function GiantRatNPCTile() {
  this.name = "GiantRatNPC";
  this.level = 1;
  this.str = 5;
  this.dex = 8;
  this.int = 2;
  this.alignment = "hostile";
  this.threatenedAI = "melee";
  this.graphic = PickOne(["327.gif","361.gif"]);
  this.meleeAttackAs = "Dagger";
  this.missileAttackAs = "none";
  this.movetype = MOVE_WALK;
  this.prefix = "a";
  this.desc = "giant rat";
  
}
GiantRatNPCTile.prototype = new NPCObject;

function GiantRatGroupSmallTile() {
  this.name = "GiantRatGroupSmall";
  this.desc = "giant rats";
  this.graphic = PickOne(["327.gif","361.gif"]);
  this.group[0] = new NPCList("GiantRatNPC", "1d3+2");
}
GiantRatGroupSmallTile.prototype = new NPCGroupObject;

function GiantRatGroupLargeTile() {
  this.name = "GiantRatGroupLarge";
  this.desc = "giant rats";
  this.graphic = PickOne(["327.gif","361.gif"]);
  this.group[0] = new NPCList("GiantRatNPC", "1d5+4");
}
GiantRatGroupLargeTile.prototype = new NPCGroupObject;


function GiantSnakeNPCTile() {
  this.name = "GiantSnakeNPC";
  this.level = 2;
  this.str = 10;
  this.dex = 12;
  this.int = 3;
  this.alignment = "hostile";
  this.threatenenAI = "melee";
  this.graphic = PickOne(["342.gif","376.gif"]);
  this.meleeAttackAs = "Shortsword";
  this.missileAttackAs = "none";
  this.movetype = MOVE_WALK;
  this.prefix = "a";
  this.desc = "giant snake";
}
GiantSnakeNPCTile.prototype = new NPCObject;


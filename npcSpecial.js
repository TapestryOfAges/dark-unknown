"use strict";

// Introducing multi-tile sized NPC/Groups
function MultiTileNPC(othertilearray,othertilelocationsarray) {
  this.attachedParts = [];
  this.attachParts = function() {
    let mymap = this.getHomeMap();
    for (let i=0; i<othertilearray.length; i++) {
      let part = localFactory.createTile(othertilearray[i]);
      this.attachedParts[this.attachedParts.length] = part;
      mymap.placeThing(othertilelocationsarray[i].x, othertilelocationsarray[i].y, part);
      part.attachedTo = this;
    }
  }
}


function MultiSegment() {
  this.attachedTo = {};
  this.currentAI = "segment";
  this.peaceAI = "segment";
}
MultiSegment.prototype = new NPCObject();

function HorseAndCartNPCTile() {
  this.name = 'HorseAndCart';
  this.level = 1;
  this.addhp = 0;
  this.str = 10;
  this.dex = 12;
  this.int = 14;
  this.alignment = 'Good';
  this.attitude = 'friendly';
  this.peaceAI = 'scheduled';
  this.forgetAt = 0;
  this.withdraw = 75;
  this.graphic = '302.gif';
  this.meleeAttackAs = 'Fists';
  this.missileAttackAs = 'none';
  this.armorAs = 'ClothArmor';
  this.movetype = MOVE_WALK;
  this.leavesCorpse = 'Corpse';
  this.lootTable = 'Townsman';
  this.prefix = 'a';
  this.desc = "horse and card";
  this.meleeChance = 30;
  this.resists = {};
  this.meleeHitSound = 'sfx_animal_hit';
  this.meleeAttackSound = 'sfx_animal_miss';
  this.initOverride = 10;

  MultiTileNPC.call(this)
}
HorseAndCartNPCTile.prototype = new NPCObject();

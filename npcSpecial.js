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
      mymap.placeThing(this.getx() + othertilelocationsarray[i][0], this.gety() + othertilelocationsarray[i][1], part);
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

  MultiTileNPC.call(this, ["CartSegment"], [[-1,0]])
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
}
CartSegmentTile.prototype = new MultiSegment();
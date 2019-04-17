"use strict";

// Introducing multi-tile sized NPC/Groups
function MultiTileNPC(othertilearray,othertilelocationsarray) {
  this.attachedParts = [];
  this.attachParts = function() {
    let mymap = this.getHomeMap();
    for (let i=0; i<othertilearray.length; i++) {
      let part = localFactory.createTile(othertilearray[i]);
      this.attachedParts[this.attachedParts.length] = part;

    }
  }
}


function MultiSegment() {
  this.attachedTo = {};
}
MultiSegment.prototype = new NPCObject();

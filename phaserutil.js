"use strict";

let phaserMainState = {
  preload: function() {
    console.log("preload");
    this.load.spritesheet('spritesheet', 'graphics/master_spritesheet.png', { framewidth: 32, frameheight: 32});
    console.log(this);
  },
  create: function() {
    console.log("create");
    phaserUI.gameSprites = [];
    for (let xx = 0; xx < 13; xx++){
      phaserUI.gameSprites[xx] = [];
      for (let yy = 0; yy < 13; yy++){
        phaserUI.gameSprites[xx][yy] = [];
      }
    }
    phaserUI.loaded = true;
  },
  update: function() {}
}

let phaserUI = {
  init() {
    this.game = new Phaser.Game({ width:800, height:600, type: Phaser.AUTO, parent: 'phaserterrainview', scene: phaserMainState});
  },

  setMainViewTile(x, y, tile) {
    if (!this.loaded) {
      return;
    }
    // console.log('setMainViewTile', x, y, tile);
  },
  setTerrainTile(x, y, tile) {
    if (!this.loaded) {
      return;
    }
    console.log(`setTerrainTile, ${x}, ${y}`);
    console.log(tile);
    if (tile.showGraphic !== 'master_spritesheet.png'){
      this.gameSprites[x][y].loadTexture('spritesheet', 8);
      return;
    }
    this.gameSprites[x][y].push(this.game.add.image(x*32,y*32,'spritesheet',GetTileIndex(tile.graphics2, tile.graphics3)));
    //loadTexture('spritesheet', GetTileIndex(tile.graphics2, tile.graphics3));
  }
}

function GetTileIndex(xoffset, yoffset) {
  parseInt(xoffset) * -1 / 32 + (parseInt(yoffset) * -1 / 32) * 10;
}

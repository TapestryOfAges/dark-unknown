"use strict";

let phaserMainState = {
  preload() {
    this.game.load.spritesheet('spritesheet', 'graphics/master_spritesheet.png', 32, 32);
  },
  create() {
    phaserUI.gameSprites = [];
    for (let xx = 0; xx < 13; xx++){
      phaserUI.gameSprites[xx] = [];
      for (let yy = 0; yy < 13; yy++){
        phaserUI.gameSprites[xx][yy] = this.game.add.sprite(xx * 32, yy * 32, 'spritesheet', 8);
      }
    }
    phaserUI.loaded = true;
  },
  update() {}
}

let phaserUI = {
  init() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaserterrainview', phaserMainState);
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
    console.log('setTerrainTile', x, y, tile);
    if (tile.showGraphic !== 'terrain_tiles.png'){
      this.terrainSprites[x][y].loadTexture('spritesheet', 8);
      return;
    }
    this.terrainSprites[x][y].loadTexture('spritesheet', GetTileIndex(tile.graphics2, tile.graphics3));
  }
}

function GetTileIndex(xoffset, yoffset) {
  parseInt(xoffset) * -1 / 32 + (parseInt(yoffset) * -1 / 32) * 10;
}

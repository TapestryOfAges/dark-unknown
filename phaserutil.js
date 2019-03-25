"use strict";

let DUScene;
let phaserMainState = {
  preload: function() {
    console.log("preload");
    this.load.spritesheet('spritesheet', 'graphics/master_spritesheet.png', { frameWidth: 32, frameHeight: 32});
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
    DUScene = this;
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
//      this.gameSprites[x][y].push(DUScene.add.image(x*32,y*32,'spritesheet',8));
      return;
    }
    this.gameSprites[x][y].push(DUScene.add.image(x*32,y*32,'spritesheet',GetSpritesheetLocation(tile.graphics2, tile.graphics3)).setOrigin(0,0));
    //loadTexture('spritesheet', GetTileIndex(tile.graphics2, tile.graphics3));
  }
}


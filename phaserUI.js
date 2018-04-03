window.phaserMainState = {
  preload() {
    this.game.load.spritesheet('terrain', 'graphics/terrain_tiles.png', 32, 32);
  },
  create() {
    window.phaserUI.terrainSprites = [];
    for (var xx = 0; xx < 13; xx++){
      window.phaserUI.terrainSprites[xx] = [];
      for (var yy = 0; yy < 13; yy++){
        window.phaserUI.terrainSprites[xx][yy] = this.game.add.sprite(xx * 32, yy * 32, 'terrain', 8);
      }
    }
    window.phaserUI.loaded = true;
  },
  update() {}
}

window.phaserUI = {
  init() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaserCanvas', window.phaserMainState);
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
    // console.log('setTerrainTile', x, y, tile);
    if (tile.showGraphic !== 'terrain_tiles.png'){
      this.terrainSprites[x][y].loadTexture('terrain', 8);
      return;
    }
    var tileIndex = parseInt(tile.graphics2) * -1 / 32 + (parseInt(tile.graphics3) * -1 / 32) * 10;
    this.terrainSprites[x][y].loadTexture('terrain', tileIndex);
  }
}
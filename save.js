
function GameStateData() {
	this.mode = "null";
	this.turn = new Object;
	// player, NPC, null, target, conversation
}



GameStateData.prototype.loadGame = function() {
	// Temporarily, this will return demo values
	PC.setx(77);
	PC.sety(20);
	PC.setPCName("Goldenflame");
	var themap = new GameMap();
	themap.loadMap("darkunknown");
	PC.setHomeMap(themap);
  var rats = localFactory.createTile("GiantRatGroupSmall");
  themap.placeThing(75,22,rats);
  var dagger = localFactory.createTile("Dagger");
  PC.addToInventory(dagger, 1);
  PC.setEquipment("weapon",dagger);
  var armor = localFactory.createTile("ClothArmor");
  PC.addToInventory(armor, 1);
  PC.setEquipment("armor",armor);
  dagger = localFactory.createTile("Longsword");
  PC.addToInventory(dagger,1);
  
  // Let's add some of everything!
  // <meme>ADD ALL THE THINGS!</meme>
  dagger = localFactory.createTile("Longsword");
  PC.addToInventory(dagger,1);
  // Let's see if the quantity increases- it does now!
  PC.addToInventory(localFactory.createTile("LeatherArmor"),1);
  PC.addToInventory(localFactory.createTile("ChainArmor"),1);
  PC.addToInventory(localFactory.createTile("PlateArmor"),1);
  PC.addToInventory(localFactory.createTile("ExoticArmor"),1);
  PC.addToInventory(localFactory.createTile("Shortsword"),1);
  PC.addToInventory(localFactory.createTile("Mace"),1);
  PC.addToInventory(localFactory.createTile("Axe"),1);
  PC.addToInventory(localFactory.createTile("Halberd"),1);
  PC.addToInventory(localFactory.createTile("MagicSword"),1);
  PC.addToInventory(localFactory.createTile("Sling"),1);
  PC.addToInventory(localFactory.createTile("Bow"),1);
  PC.addToInventory(localFactory.createTile("Crossbow"),1);
  
	maps.addMapByRef(themap);
	if (themap.getLinkedMaps().length > 0) {
		for (var i = 0; i < themap.getLinkedMaps().length; i++) {
			if (themap.getLinkedMaps()[i] != "") {
				var anothermap = new GameMap();
				anothermap.loadMap(themap.getLinkedMaps()[i]);
				maps.addMapByRef(anothermap);
			}
		}
	}
	DUTime.setGameClock(0);
	var PCEvent = new GameEvent(PC);
	DUTime.addAtTimeInterval(PCEvent,1);
  var nextEvent = DUTime.executeNextEvent();
  var nextEntity = nextEvent.getEntity();
  nextEntity.myTurn();
}

GameStateData.prototype.saveGame = function() {
	
}

GameStateData.prototype.setMode = function(mode) {
	this.mode = mode;
}

GameStateData.prototype.getMode = function() {
	return this.mode;
}

GameStateData.prototype.setTurn = function(whoseturn) {
	this.turn = whoseturn;
}

GameStateData.prototype.getTurn = function() {
	return this.turn;
}


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

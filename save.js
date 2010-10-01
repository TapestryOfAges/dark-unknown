
function GameStateData() {
	this.mode = "null";
	this.turn = new Object;
	// player, NPC, null, target, conversation
}



GameStateData.prototype.loadGame = function() {
	// Temporarily, this will return demo values
	PC.setx(30);
	PC.sety(30);
	var themap = new GameMap();
	themap.loadMap("island_cave");
	PC.setHomeMap(themap);
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

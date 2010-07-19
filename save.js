
function GameStateData() {
	this.mode = "waiting";
	// base, conversation, direction choice, waiting (no input)
}



GameStateData.prototype.loadGame = function() {
	// Temporarily, this will return demo values
	PC.setx(34);
	PC.sety(34);
	var themap = new GameMap();
	themap.loadMap("island_cave");
	PC.setHomeMap(themap);
	DUTime.setGameClock(0);
	var PCEvent = new GameEvent(PC);
	DUTime.addAtTimeInterval(PCEvent,1);
//	this.mode = "base";
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

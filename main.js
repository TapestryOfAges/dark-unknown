
var mode = "base";
// base, conversation, direction choice

var mappages = new Pages();

var worldmap = new GameMap();
var PC = new PCObject();
var gamestate = new GameStateData();
var localFactory = new tileFactory();
var eidos = new Platonic();



function drawCharFrame() {
	var txt = "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr><td colspan='2'>";
	txt = txt + PC.pcname + "</td></tr>";
	txt = txt + "<tr><td>HP: " + PC.hp + "</td><td style='text-align:right'>MP: " + PC.mana + "</td></tr></table>";
	$("#charstats").html(txt);
}

function drawMainFrame() {
	
}

function drawTopbarFrame(txt) {
  $('#topbarframe').html(txt);	
}

$(document).ready(function() {
	gamestate.loadGame();
  drawCharFrame();
  drawTopbarFrame("<p>Lands of Olympus</p>");
});

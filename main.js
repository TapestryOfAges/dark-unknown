
var mode = "base";
// base, conversation, direction choice

var mappages = new Pages();
var localFactory = new tileFactory();
var eidos = new Platonic();

var PC = new PCObject();
var gamestate = new GameStateData();
var maps = new MapMemory();
var worldmap = maps.addMap("darkunknown");

var debug = 0;
var debugscreen;


function drawCharFrame() {
	var txt = "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr><td colspan='2'>";
	txt = txt + PC.pcname + "</td></tr>";
	txt = txt + "<tr><td>HP: " + PC.hp + "</td><td style='text-align:right'>MP: " + PC.mana + "</td></tr></table>";
	$("#charstats").html(txt);
}

function drawMainFrame(how) {
  var mapdiv;
  for (var i=PC.getx - 6; i<= PC.getx + 6; i++ ){
  	for (var j=PC.gety - 6; j<= PC.gety + 6; j++ ){
  		
  	}
  }	
}

function drawTopbarFrame(txt) {
  $('#topbarframe').html(txt);	
}

$(document).ready(function() {
	gamestate.loadGame();
  drawCharFrame();
  drawTopbarFrame("<p>Lands of Olympus</p>");
  worldmap.loadMap("darkunknown");
  drawMainFrame("draw");

  
  $(window).keydown(function(e) {
   var code = (e.keyCode ? e.keyCode : e.which);
   // will be a function call to main function
  });
});

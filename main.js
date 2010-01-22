
var mode = "base";
// base, conversation, direction choice

var viewsizex = 13;
var viewsizey = 13;

var mappages = new Pages();
var localFactory = new tileFactory();
var eidos = new Platonic();

var PC = new PCObject();
var gamestate = new GameStateData();
var maps = new MapMemory();
var worldmap = new GameMap();

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
  var themap = maps.getMap(PC.getMapName());
  
  var leftedge = PC.getx() - (viewsizex - 1)/2;
  if (leftedge < 0) { leftedge = 0; }
  var rightedge = leftedge + viewsizex - 1;
  if (rightedge >= themap.getWidth()) {
  	rightedge = themap.getWidth() -1;  // Note, this will explode somewhat if the map is smaller than 13x13
  }
  var topedge = PC.gety() - (viewsizey - 1)/2;
  if (topedge < 0) { topedge = 0; }
  bottomedge = topedge + viewsizey - 1;
  if (bottomedge >= themap.getHeight()) {
  	bottomedge = themap.getHeight() -1;
  }
  
  
}

function drawTopbarFrame(txt) {
  $('#topbarframe').html(txt);	
}

$(document).ready(function() {
	gamestate.loadGame();
  drawCharFrame();
  drawTopbarFrame("<p>Lands of Olympus</p>");
  worldmap = maps.addMap("darkunknown");
  drawMainFrame("draw");

  
  $(window).keydown(function(e) {
   var code = (e.keyCode ? e.keyCode : e.which);
   // will be a function call to main function
  });
});


var mode = "base";
// base, conversation, direction choice

var viewsizex = 13;
var viewsizey = 13;
var LOS_THRESHOLD = 1;
var DAYNIGHT = DAY;

var mappages = new Pages();
var localFactory = new tileFactory();
var eidos = new Platonic();

var PC = new PCObject();
var gamestate = new GameStateData();
var maps = new MapMemory();
var worldmap = new GameMap();
var losgrid = new LOSMatrix(13);


var debug = 0;
var debugscreen;

if (debug) {
  debugscreen = window.open('','debugscreen');
}


function drawCharFrame() {
	var txt = "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr><td colspan='2'>";
	txt = txt + PC.pcname + "</td></tr>";
	txt = txt + "<tr><td>HP: " + PC.hp + "</td><td style='text-align:right'>MP: " + PC.mana + "</td></tr></table>";
	$("#charstats").html(txt);
}

function drawMainFrame(how, mapname, centerx, centery) {
  // how options are "draw" and "refresh"

  var mapdiv;
  var themap = maps.getMap(mapname);
  if (themap == undefined) {
  	maps.addMap(mapname);
  	themap = maps.getMap(mapname);
  }
  
  var leftedge = centerx - (viewsizex - 1)/2;
  if (leftedge < 0) { leftedge = 0; }
  var rightedge = leftedge + viewsizex - 1;
  if (rightedge >= themap.getWidth()) {
  	rightedge = themap.getWidth() -1;  // Note, this will explode somewhat if the map is smaller than 13x13
  }
  var topedge = centery - (viewsizey - 1)/2;
  if (topedge < 0) { topedge = 0; }
  bottomedge = topedge + viewsizey - 1;
  if (bottomedge >= themap.getHeight()) {
  	bottomedge = themap.getHeight() -1;
  }
  
  if (how == "draw") {
    mapdiv += "<table cellpadding='0' cellspacing='0' border='0'><tr>";
    for (var i=topedge;i<=bottomedge;i++) {
      for (var j=leftedge;j<=rightedge;j++) {
        var localacre = themap.getTile(j,i);
        var displaytile;
        // decide whether to draw a tile, draw it shaded, or make it darkness
        var losresult = themap.getLOS(centerx, centery, j, i, losgrid);
        if (losresult < 1) {
          if (localacre.pcs.getTop()) {
            displaytile = localacre.pcs.getTop();
          } else if (localacre.npcs.getTop()) {
            displaytile = localacre.npcs.getTop();
          } else if (localacre.features.getTop()) {
            displaytile = localacre.features.getTop();
          } else { displaytile = localacre.terrain; }
          var showGraphic = displaytile.getGraphic();
          if (typeof displaytile.setBySurround == "function") {
          	showGraphic = displaytile.setBySurround(j,i,themap,showGraphic);
          }
          if (typeof displaytile.doTile == "function") {
          	showGraphic = displaytile.doTile(j,i,showGraphic);
          }
          mapdiv += '<td class="maptd"><img id="tile'+j+'x'+i+'" src="graphics/'+showGraphic+'" border="0" alt="tile'+j+'x'+i+'" /></td>';
        } else {
        	displaytile = localFactory.createTile('BlankBlack');
        	mapdiv += '<td class="maptd"><img id="tile'+j+'x'+i+'" src="graphics/'+displaytile.getGraphic()+'" border="0" alt="tile'+j+'x'+i+'" /></td>';
        }
      }  
      mapdiv += '</tr><tr>';
    }
    mapdiv  += '</table>';
    $('#displayframe').html(mapdiv);
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
  worldmap.placeThing(PC.getx(),PC.gety(),PC);
  drawMainFrame("draw", PC.getMapName() , PC.getx(), PC.gety());

  
  $(window).keydown(function(e) {
   var code = (e.keyCode ? e.keyCode : e.which);
   // will be a function call to main function
  });
});

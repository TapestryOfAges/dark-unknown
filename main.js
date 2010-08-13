

var viewsizex = 13;
var viewsizey = 13;
var DAYNIGHT = DAY;

var mappages = new Pages();
var localFactory = new tileFactory();
var eidos = new Platonic();

var PC = new PCObject();
var gamestate = new GameStateData();
var maps = new MapMemory();
var worldmap = new GameMap();
maps.addMapByRef(worldmap);
var losgrid = new LOSMatrix(13);
var DUTime = new Timeline(0);
var maintext = new TextFrame(14,32);


function drawCharFrame() {
	var txt = "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr><td colspan='2'>";
	txt = txt + PC.pcname + "</td></tr>";
	txt = txt + "<tr><td>HP: " + PC.hp + "</td><td style='text-align:right'>MP: " + PC.mana + "</td></tr></table>";
	$("#charstats").html(txt);
}

function drawMainFrame(how, mapname, centerx, centery) {
  // how options are "draw" and "refresh"

  var mapdiv = "&nbsp;";
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
  	leftedge = rightedge - viewsizex + 1;
  	if (leftedge < 0) { leftedge = 0; }
  }
  var topedge = centery - (viewsizey - 1)/2;
  if (topedge < 0) { topedge = 0; }
  bottomedge = topedge + viewsizey - 1;
  if (bottomedge >= themap.getHeight()) {
  	bottomedge = themap.getHeight() -1;
  	topedge = bottomedge - viewsizey + 1;
  	if (topedge < 0) {topedge = 0;}
  }
  
  if (how == "draw") {
    mapdiv += "<table cellpadding='0' cellspacing='0' border='0'><tr>";
    for (var i=topedge;i<=bottomedge;i++) {
      for (var j=leftedge;j<=rightedge;j++) {
        var localacre = themap.getTile(j,i);
        var displaytile;
        // decide whether to draw a tile, draw it shaded, or make it darkness
        var losresult = themap.getLOS(centerx, centery, j, i, losgrid);
//        var losresult = themap.getLOS(j, i, centerx, centery, losgrid);
        var lighthere = localacre.getLocalLight();
        if (losresult < LOS_THRESHOLD) {
          if (localacre.getTopPC()) {
            displaytile = localacre.getTopPC();
          } else if (localacre.getTopVisibleNPC()) {
            displaytile = localacre.getTopVisibleNPC();
          } else if (localacre.getTopVisibleFeature()) {
            displaytile = localacre.getTopVisibleFeature();
          } else { displaytile = localacre.getTerrain(); }
          var graphics = displaytile.getGraphic();
          var showGraphic = graphics[0];
          if (typeof displaytile.setBySurround == "function") {
          	showGraphic = displaytile.setBySurround(j,i,themap,showGraphic);
          }
          if (typeof displaytile.doTile == "function") {
          	showGraphic = displaytile.doTile(j,i,showGraphic);
          }
        	mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat;"><img id="tile'+j+'x'+i+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+j+'x'+i+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" /></td>';
        } else {
        	displaytile = localFactory.createTile('BlankBlack');
        	var graphics = displaytile.getGraphic();
        	mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="background-image:url(\'graphics/' + graphics[0] + '\'); background-repeat:no-repeat;"><img id="tile'+j+'x'+i+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+j+'x'+i+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" /></td>';
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

function drawTextFrame(txt,inputtxt){
	$('#maintextframe').html(txt);
	$('#inputtext').html(inputtxt);
}

$(document).ready(function() {
worldmap.loadMap("darkunknown");
	
	gamestate.loadGame();
  drawCharFrame();
  
  
  maps.addMapByRef(PC.getHomeMap());
  PC.getHomeMap().placeThing(PC.getx(),PC.gety(),PC);
  drawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());

  maintext.addText("Game loaded.");
  drawTextFrame(maintext.getTextFrame(), "&gt;"); 
  
  $(document).keydown(function(e) {
   var code = (e.keyCode ? e.keyCode : e.which);
   // will be a function call to main function
   if (gamestate.mode == "base") {  // PC's turn, awaiting commands
   	 var response = PerformCommand(code);
   	 if (response["fin"]) { 
   	 	e.preventDefault(); 
   	 	maintext.addText(response["txt"]);
   	 	var inp = response["input"];
   	 	drawTextFrame(maintext.getTextFrame(), inp);
   	 	if (response["fin"] == 1) {
   	 		gamestate.mode = "waiting";
   	 		var PCevent = new GameEvent(PC);
   	 		DUTime.addAtTimeInterval(PCevent,PC.nextActionTime());
   	 		
        var nextEntity = DUTime.executeNextEvent().getEntity();
        nextEntity.myTurn();
   	 	}
   	 }  
  }
  });
});


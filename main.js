

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
var losgrid = new LOSMatrix(13);
var DUTime = new Timeline(0);
var maintext = new TextFrame(14,32);

var targetCursor = new Object;

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
  	alert("How am I here?");
  	maps.addMap(mapname);
  	themap = maps.getMap(mapname);
  }

  var edges = getDisplayCenter(themap,centerx,centery);
	var debugcolor = "#0000cc";
	
  if (how == "draw") {
    mapdiv += "<table cellpadding='0' cellspacing='0' border='0'><tr>";
    for (var i=edges.topedge;i<=edges.bottomedge;i++) {
      for (var j=edges.leftedge;j<=edges.rightedge;j++) {
      	if (debug) { dbs.writeln("<span style='color:"+debugcolor+"'>j = " + j + ", i = " + i + ". Map is " + themap.getName() + " -- "); }
      	if (debug) { dbs.writeln("<span style='color:"+debugcolor+"'>" + themap.data[i].length + "<br />"); }
        var localacre = themap.getTile(j,i);
        var displaytile;
        // decide whether to draw a tile, draw it shaded, or make it darkness
        var losresult = themap.getLOS(centerx, centery, j, i, losgrid);

        var lighthere = localacre.getLocalLight();
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
        	showGraphic = displaytile.setBySurround(j,i,themap,showGraphic,1,centerx,centery);
        	showGraphic = displaytile.doTile(j,i,showGraphic);
        	mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat;"><img id="tile'+j+'x'+i+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+j+'x'+i+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" style="position: relative; z-index:1;" title="' + displaytile.getDesc() + '" /></td>';
        }
        else if (losresult < LOS_THRESHOLD) {
          if (typeof displaytile.doTile == "function") {
          	showGraphic = displaytile.doTile(j,i,showGraphic);
          }
        	mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat;"><img id="tile'+j+'x'+i+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+j+'x'+i+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" style="position: relative; z-index:1" title="' + displaytile.getDesc() + '" /></td>';
        } else {
        	displaytile = localFactory.createTile('BlankBlack');
        	graphics = displaytile.getGraphic();
        	showGraphic = graphics[0];
        	mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat;"><img id="tile'+j+'x'+i+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+j+'x'+i+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" style="position: relative; z-index:1" title="You cannot see that" /></td>';
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
	maps.addMapByRef(worldmap);
	
	gamestate.loadGame();
  drawCharFrame();
  
  
  PC.getHomeMap().placeThing(PC.getx(),PC.gety(),PC);
  drawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());

  maintext.addText("Game loaded.");
  drawTextFrame(maintext.getTextFrame(), "&gt;"); 
  
  $(document).keydown(function(e) {
   var code = (e.keyCode ? e.keyCode : e.which);
   if (code == 27) { e.preventDefault(); }
   if (gamestate.getMode() == "player") {  // PC's turn, awaiting commands
//   	 alert(DUTime.getGameClock());
   	 var response = PerformCommand(code);
   	 if (response["fin"]) { 
   	 	e.preventDefault(); 
   	 	maintext.addText(response["txt"]);
   	 	var inp = response["input"];
   	 	drawTextFrame(maintext.getTextFrame(), inp);
   	 	if (response["fin"] == 1) {
   	 		gamestate.setMode("null");
   	 		var PCevent = new GameEvent(PC);
   	 		DUTime.addAtTimeInterval(PCevent,PC.nextActionTime(response["initdelay"]));
   	 		
        var nextEntity = DUTime.executeNextEvent().getEntity();
        nextEntity.myTurn();
   	 	}
   	 }  
  }
  else if (gamestate.getMode() == "target") {
  	var response = PerformTarget(code);
  	if (response["fin"]) { e.preventDefault(); }
  	if (response["fin"] == 1) {  // move the cursor
  		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
  		var posleft = 192 + (targetCursor.x - edges.centerx)*32;
  		var postop = 192 + (targetCursor.y - edges.centery)*32;
  		var tileid = targetCursor.tileid;
  		$(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:'+posleft+'px;top:'+postop+'px;z-index:3" />');
  		gamestate.setMode("target");
  	}
  	else if (response["fin"] == 2) { // look at the current target
  		if (targetCursor.command == "l") {
  			response = PerformLook();
  			maintext.addText(response["txt"]);
  			drawTextFrame(maintext.getTextFrame(), response["input"]);
  		}
  		gamestate.setMode("null");
  		var PCevent = new GameEvent(PC);
   	 	DUTime.addAtTimeInterval(PCevent,PC.nextActionTime(response["initdelay"]));
   	 		
      var nextEntity = DUTime.executeNextEvent().getEntity();
      nextEntity.myTurn();
  	}
  	else if (response["fin"] == 0) { 
  		var tileid = targetCursor.tileid;
      $(tileid).html(targetCursor.basetile); 
  			maintext.addText(response["txt"]);
  			drawTextFrame(maintext.getTextFrame(), response["input"]);
      
      gamestate.setMode("player");
      gamestate.setTurn(PC);
  	}
  	else {
  		gamestate.setMode("target");
  	}

  }
  });
});


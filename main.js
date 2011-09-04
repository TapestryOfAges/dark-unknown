

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
var maintext = new TextFrame("innertextframe");

var targetCursor = new Object;
var inputText = new Object;

function drawCharFrame() {
	var txt = "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr><td colspan='2'>";
	txt = txt + PC.getPCName() + "</td></tr>";
	txt = txt + "<tr><td>HP: " + PC.getHP() + "</td><td style='text-align:right'>MP: " + PC.getMana() + "</td></tr></table>";
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
				displaytile = localacre.getTop();
				while (displaytile.getName() == "SeeBelow") {
					localacre = FindBelow(j,i,themap);
					displaytile = localacre.getTop();
				}
        var graphics = displaytile.getGraphicArray();
        var showGraphic = graphics[0];
        if (typeof displaytile.setBySurround == "function") {
        	graphics = displaytile.setBySurround(j,i,themap,graphics,1,centerx,centery,losresult);
        	showGraphic = graphics[0];
        	if (typeof displaytile.doTile == "function") {
        		showGraphic = displaytile.doTile(j,i,showGraphic);
          }
        	mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat; background-position: ' + graphics[2] + 'px ' + graphics[3] + 'px;"><img id="tile'+j+'x'+i+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+j+'x'+i+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" style="position: relative; z-index:1;" title="' + displaytile.getDesc() + '" /></td>';
        }
        else if (losresult < LOS_THRESHOLD) {
          if (typeof displaytile.doTile == "function") {
          	showGraphic = displaytile.doTile(j,i,showGraphic);
          }
          if (typeof displaytile.setByBelow == "function") {
          	showGraphic = displaytile.setByBelow(j,i,themap);
          }
        	mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat; background-position: ' + graphics[2] + 'px ' + graphics[3] + 'px;"><img id="tile'+j+'x'+i+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+j+'x'+i+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" style="position: relative; z-index:1" title="' + displaytile.getDesc() + '" /></td>';
        } else {
        	displaytile = localFactory.createTile('BlankBlack');
        	graphics = displaytile.getGraphicArray();
        	showGraphic = graphics[0];
        	mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat; background-position: ' + graphics[2] + 'px ' + graphics[3] + 'px;"><img id="tile'+j+'x'+i+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+j+'x'+i+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" style="position: relative; z-index:1" title="You cannot see that" /></td>';
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
	worldmap.loadMap("darkunknown");
	maps.addMapByRef(worldmap);
	
	gamestate.loadGame();
  drawCharFrame();
    
  PC.getHomeMap().placeThing(PC.getx(),PC.gety(),PC);
  drawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());

  maintext.addText("Game loaded.");
  maintext.setInputLine("&gt;");
  maintext.drawTextFrame(); 
  
  $(document).keydown(function(e) {
   var code = (e.keyCode ? e.keyCode : e.which);
//   if (code == 27) { e.preventDefault(); }
   e.preventDefault();
   if (gamestate.getMode() == "player") {  // PC's turn, awaiting commands
//   	 alert(DUTime.getGameClock());
   	 var response = PerformCommand(code);
   	 if (response["fin"]) { 
   	 	maintext.addText(response["txt"]);
   	 	maintext.setInputLine(response["input"]);
   	 	var inp = response["input"];
			maintext.drawTextFrame();
   	 	if (response["fin"] == 1) {
   	 		gamestate.setMode("null");
   	 		var PCevent = new GameEvent(PC);
   	 		DUTime.addAtTimeInterval(PCevent,PC.nextActionTime(response["initdelay"]));
   	 		
        var nextEntity = DUTime.executeNextEvent().getEntity();
        nextEntity.myTurn();
   	 	}
   	 }  
  }
  else if (gamestate.getMode() == "talk") {
    if (((code >= 65) && (code <= 90)) || (code == 32)) {  // letter
			var letter = String.fromCharCode(code);    	
			if (inputText.txt.length < 14) {
				inputText.txt += letter;
				maintext.setInputLine(maintext.getInputLine() + letter);
				maintext.drawInputLine();
			}
    }
    else if (code == 8) { // backspace
    	var txt = maintext.getInputLine();
    	if (txt.length > 11) {
    		txt = txt.substr(0,txt.length-1);
    		maintext.setInputLine(txt);
				maintext.drawInputLine();
			}
    }
    else if (code == 13) { // enter
    	if (inputText.cmd == "y") { 
    		var retval = PerformYell(); 
    	  if (retval["fin"] == 2) {
    	  	gamestate.setMode("player");
    	  	gamestate.setTurn(PC);
    	  }
    	  else if (retval["fin"] == 1) {
    	  	gamestate.setMode("null");
   	 	  	var PCevent = new GameEvent(PC);
   	   		DUTime.addAtTimeInterval(PCevent,PC.nextActionTime());
   	 		
          var nextEntity = DUTime.executeNextEvent().getEntity();
          nextEntity.myTurn();
    	  }
    	  maintext.setInputLine("&gt;");
	    	maintext.addText(retval["txt"]);
	    	maintext.drawTextFrame();

    	}
    	else { alert("need to add hook here! (main 171)"); }
    }
    else if (code == 27) { // ESC
    	maintext.setInputLine("&gt;");
    	maintext.drawTextFrame();
    	gamestate.setMode("player");
    	gamestate.setTurn(PC);
    }
    else { // ignore
    	
    }
  }
  else if (gamestate.getMode() == "choosedir") {
  	var response = PerformChooseDir(code);
  	if (response["fin"] == 1) { // direction chosen
  		if ((targetCursor.x == PC.getx()) && (targetCursor.y == PC.gety()) && (targetCursor.command == "u")) {
  			maintext.addText("Use from inventory not yet implemented.");
  			maintext.setInputLine("&gt;");
  			maintext.drawTextFrame();
  			gamestate.setMode("player");
  			return;
  		}
  		else if ((targetCursor.x == PC.getx()) && (targetCursor.y == PC.gety()) && (targetCursor.command == "g")) {
  		  maintext.setInputLine("&gt;");
  		  maintext.drawTextFrame();
  			gamestate.setMode("player");
  			return;
  		}
  		else {
  			if (targetCursor.command == "u") { // USE
  				var resp = PerformUse(PC);
  				if (resp["fin"] == 1) {
  					drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
  				}
  				maintext.addText(resp["txt"]);
  				maintext.setInputLine("&gt;");
  				maintext.drawTextFrame();

  				gamestate.setMode("null");
  				var PCevent = new GameEvent(PC);
   			 	DUTime.addAtTimeInterval(PCevent,PC.nextActionTime(response["initdelay"]));
   	 		
  	  	  var nextEntity = DUTime.executeNextEvent().getEntity();
	      	nextEntity.myTurn();
  			} else if (targetCursor.command == "g") { // GET
  			  var resp = PerformGet(PC);
          if (resp["fin"] == 1) {
  					drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
  				}
  				maintext.addText(resp["txt"]);
  				maintext.setInputLine("&gt;");
  				maintext.drawTextFrame();

  				gamestate.setMode("null");
  				var PCevent = new GameEvent(PC);
   			 	DUTime.addAtTimeInterval(PCevent,PC.nextActionTime(response["initdelay"]));
   	 		
  	  	  var nextEntity = DUTime.executeNextEvent().getEntity();
	      	nextEntity.myTurn(); 
  			}
  		}
  	}
  	else if (response["fin"] == -1) {   // anything not useful
  		gamestate.setMode("choosedir");
  	}
  	else { // ESC hit
  		maintext.setInputLine("&gt;");
  		maintext.drawTextFrame();
  		gamestate.setMode("player");
  		return;
  	}
  }
  else if (gamestate.getMode() == "target") {
  	var response = PerformTarget(code);
  	if (response["fin"] == 1) {  // move the cursor
  		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
  		var posleft = 192 + (targetCursor.x - edges.centerx)*32;
  		var postop = 192 + (targetCursor.y - edges.centery)*32;
  		var tileid = targetCursor.tileid;
  		$(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:'+posleft+'px;top:'+postop+'px;z-index:3" />');
  		gamestate.setMode("target");
  	}
  	else if (response["fin"] == 2) { // act on the current target
  		if (targetCursor.command == "l") {
  			response = PerformLook();
  			maintext.addText(response["txt"]);
  			maintext.setInputLine(response["input"]);
  			//drawTextFrame(maintext.getTextFrame(), response["input"]);
  			maintext.drawTextFrame();
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
  			maintext.setInputLine(response["input"]);
  			//drawTextFrame(maintext.getTextFrame(), response["input"]);
  			maintext.drawTextFrame();
      
      gamestate.setMode("player");
      gamestate.setTurn(PC);
  	}
  	else {
  		gamestate.setMode("target");
  	}

  } 
  else if (gamestate.getMode() == "equip") {
    var response = PerformEquip(code);
    if (response["fin"] == 0) {
    	maintext.setInputLine("&gt;");
    	maintext.drawTextFrame();
      drawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
      gamestate.setMode("player");
    	gamestate.setTurn(PC);
    }
    // WORK HERE
  }
  else if (gamestate.getMode() == "zstats") {
    var response = performZstats(code);
    if (response["fin"] == 0) {
      maintext.setInputLine("&gt;");
    	maintext.drawTextFrame();
      drawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
      gamestate.setMode("player");
    	gamestate.setTurn(PC);
    } else if (response["fin"] == 1) {
      
    }
  }
  });
});



var maxserial = 0;
var viewsizex = 13;
var viewsizey = 13;
var DAYNIGHT = DAY;

var mappages = new Pages();
var localFactory = new tileFactory();
var eidos = new Platonic();

var PC = new PCObject();
PC.assignSerial();
var gamestate = new GameStateData();
var maps = new MapMemory();
var worldmap = new GameMap();
var losgrid = new LOSMatrix(13);
var DUTime = new Timeline(0);
var maintext = new TextFrame("innertextframe");
var DULoot = SetLoots();
var DULootGroups = SetLootGroups(); // see loot.js for population
var displayspecs = new Object;

var targetCursor = new Object;
var inputText = new Object;

var raceWarning = 0;

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
    alert("How am I here? (Drawmap)");
    maps.addMap(mapname);
    themap = maps.getMap(mapname);
  }

  var debugcolor = "#0000cc";
	
  if (how == "draw") {
    displayspecs = getDisplayCenter(themap,centerx,centery);
    
    mapdiv += "<table cellpadding='0' cellspacing='0' border='0'><tr>";
    for (var i=displayspecs.topedge;i<=displayspecs.bottomedge;i++) {
      for (var j=displayspecs.leftedge;j<=displayspecs.rightedge;j++) {
      	if (debug) { dbs.writeln("<span style='color:"+debugcolor+"'>j = " + j + ", i = " + i + ". Map is " + themap.getName() + " -- "); }
      	if (debug) { dbs.writeln("<span style='color:"+debugcolor+"'>" + themap.data[i].length + "<br />"); }
      	var thiscell = getDisplayCell(themap,centerx,centery,j,i);
      	var opac = 1;
      	if ((thiscell.lighthere >= SHADOW_THRESHOLD) && (thiscell.lighthere < 1)) {
      	  opac = 0.3;
      	}
      	if (thiscell.lighthere < SHADOW_THRESHOLD) {
      	  opac = 0;
      	}
        mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="opacity: ' + opac + '; background-image:url(\'graphics/' + thiscell.showGraphic + '\'); background-repeat:no-repeat; background-position: ' + thiscell.graphics2 + 'px ' + thiscell.graphics3 + 'px;"><img id="tile'+j+'x'+i+'" src="graphics/'+thiscell.graphics1+'" border="0" alt="tile'+j+'x'+i+' los:' + thiscell.losresult + ' light:' + thiscell.lighthere + '" width="32" height="32" style="position: relative; z-index:1" title="' + thiscell.desc + '" /></td>';
      }  
      mapdiv += '</tr><tr>';
    }
    mapdiv  += '</table>';
    $('#displayframe').html(mapdiv);
  } else if (how == "one") {
    if ((centerx <= displayspecs.rightedge) && (centerx >= displayspecs.leftedge) && (centery >= displayspecs.topedge) && (centery <= displayspecs.bottomedge)) {
      var thiscell = getDisplayCell(themap,PC.getx(),PC.gety(),centerx,centery);
      var tileid = "#td-tile" + centerx + "x" + centery;
      $(tileid).css("background-image","url('graphics/" + thiscell.showGraphic + "')");
      $(tileid).css("background-position",thiscell.graphics2 + 'px ' + thiscell.graphics3 + 'px');
      $(tileid).html('<img id="tile'+centerx+'x'+centery+'" src="graphics/'+thiscell.graphics1+'" border="0" alt="tile'+centerx+'x'+centery+' los:' + thiscell.losresult + ' light:' + thiscell.lighthere + '" width="32" height="32" style="position: relative; z-index:1" title="' + thiscell.desc + '" />');
    }
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
        PC.endTurn(response["initdelay"]);
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
      if (inputText.txt.length) {
        inputText.txt = inputText.txt.substr(0,inputText.txt.length-1);
//      }
//      if (txt.length > 11) {
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
          PC.endTurn(retval["initdelay"]);
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
      else if ((targetCursor.x == PC.getx()) && (targetCursor.y == PC.gety()) && ((targetCursor.command == "g") || (targetCursor.command == "a") || (targetCursor.command == "s"))) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        gamestate.setMode("player");
        return;
      }
      else {
        var resp;
        if (targetCursor.command == "u") { // USE
          resp = PerformUse(PC);
        } else if (targetCursor.command == "g") { // GET
          resp = PerformGet(PC);
        } else if (targetCursor.command == "s") { // SEARCH
          resp = PerformSearch(PC);
        } else if (targetCursor.command == "a") {  // ATTACK
          var dir = "";
          if (targetCursor.y == PC.gety()-1) { dir = "North"; }
          if (targetCursor.y == PC.gety()+1) { dir = "South"; }
          if (targetCursor.x == PC.getx()-1) { dir = "West"; }
          if (targetCursor.x == PC.getx()+1) { dir = "East"; }
          dir = "Attack " + dir + ".";
          resp = PerformAttackMap(PC);  			  
        }
        if (resp["fin"] == 1) {
// 					drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
        }
        if (resp["fin"] < 2) {
          maintext.addText(resp["txt"]);
          maintext.setInputLine("&gt;");
          maintext.drawTextFrame();

          PC.endTurn(resp["initdelay"]);
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
//  		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
      var posleft = 192 + (targetCursor.x - displayspecs.centerx)*32;
      var postop = 192 + (targetCursor.y - displayspecs.centery)*32;
      var tileid = targetCursor.tileid;
      $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:'+posleft+'px;top:'+postop+'px;z-index:3" />');
      gamestate.setMode("target");
    }
    else if (response["fin"] == 2) { // act on the current target
      var newresponse = new Object;
      if (targetCursor.command == "l") {
        newresponse = PerformLook();
        maintext.addText(newresponse["txt"]);
        maintext.setInputLine(newresponse["input"]);
        maintext.drawTextFrame();
      } else if (targetCursor.command == "a") {
        newresponse = PerformAttack(PC);
        if (newresponse["txt"]) {
          maintext.addText(newresponse["txt"]);
        }
        if (newresponse["input"]) {
          maintext.setInputLine(newresponse["input"]);
        }
        maintext.drawTextFrame();
      }
      if ((newresponse["fin"] == 0) || (newresponse["fin"] == 2)) {
        gamestate.setMode("player");
        // does not take time, either because it failed or was a no-time success
      }
      else if (newresponse["fin"] == 1) {
        PC.endTurn(newresponse["initdelay"]);
      }
      else if (newresponse["fin"] == -1) {
        gamestate.setMode("null");
        // wait and let the combat code set things to next turn. NOTE: possible 
        raceWarning = 1;
      }
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
    else if (response["fin"] == 1) {
      
    }
    else if (response["fin"] == 2) {
      maintext.addText(response["txt"]);
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      drawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      drawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
      PC.endTurn(response["initdelay"]);
    }
      
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


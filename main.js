"use strict";

var maxserial = 0;
var viewsizex = 13;
var viewsizey = 13;
var DAYNIGHT = DAY;

var wind = {};
wind.xoff = 0;
wind.yoff = 2;

var mappages = new Pages();
var localFactory = new tileFactory();
var eidos = new Platonic();
//var universe = new Object;

var DU = {};  // attach all saveable global objects to me
DU.version = 0.7;

DU.PC = new PCObject();
var PC = DU.PC;  // alias

var timeouts = {};

PC.assignSerial();

var nowplaying = {};  // .song = a SoundJS object for current music, .name = name of the song
var ambient = {};  // .song = a SoundJS object for current ambient noise, .name = name of the sound
var laststep = "left";

DU.maps = new MapMemory();
var maps = DU.maps; // alias
//var worldmap = new GameMap();
//var losgrid = new LOSMatrix(13);      // WAS RESTRICTING TO SIZE OF VIEWSCREEN
var losgrid = new LOSMatrix(30);  // BIGGER FOR AI USE

DU.DUTime = new Timeline(0);
var DUTime = DU.DUTime; // alias
var maintext = new TextFrame("innertextframe");
var DULoot = SetLoots();            //
var DULootGroups = SetLootGroups(); //  see loot.js and lootset.js for population
var DUTraps = SetTraps();           //
var displayspecs = {};
var Dice = new DiceObject();
var finder = new PF.AStarFinder({
  heuristic: PF.Heuristic.euclidean
});
DU.gameflags = new Gameflags();

var Listener = new DUListener();

var targetCursor = {};
    targetCursor.skipahead = 0;
var inputText = {};

var raceWarning = 0;
var whoseturn;

var convlog = [];

function DrawCharFrame() {
  var txt = "<table cellpadding='0' cellspacing='0' border='0' width='100%' style='margin-top:1px'><tr><td colspan='2'>";
  var dishp = "" + PC.getDisplayHP();
  while (dishp.length < 3) { dishp = " " + dishp; }
  dishp.replace(" ", "&nbsp;");
  var dismp = "" + PC.getMana();
  while (dismp.length < 3) { dismp = " " + dismp; }
  dismp = dismp.replace(/ /g, "&nbsp;");
  txt = txt + PC.getPCName() + "</td><td id='hpcell' style='text-align:right'>HP:&nbsp;" + dishp + "</td></tr>";
  txt = txt + "<tr><td width='33%' id='gpcell'>GP: " + PC.getGold() + "</td><td width='34%'>" + SpellInitials(PC) + "</td><td width='33%' style='text-align:right'>MP:&nbsp;" + dismp + "</td></tr></table>";
  $("#charstats").html(txt);
}

function DrawMainFrame(how, mapname, centerx, centery) {
  // how options are "draw" and "one"

  var mapdiv = "";
  var themap = maps.getMap(mapname);
  var opac = 1;
  
  if (themap === undefined) {
    alert("How am I here? (Drawmap)");
    maps.addMap(mapname);
    themap = maps.getMap(mapname);
  }

//  var debugcolor = "#0000cc";
//  if (debug) { dbs.writeln("<br /><br />"); }
	
  if (how === "draw") {
    displayspecs = getDisplayCenter(themap,centerx,centery);
    
    var mapbg = '';
    if (themap.getBackground()) {
      //mapbg = 'background-image:url(\'graphics/' + themap.getBackground() + '\'); background-repeat:no-repeat;';
      var opacity = themap.getOpacity();
      $("#worldlayer").html("<div id='cloudlayer' style='background-image:url(\"graphics/" + themap.getBackground() + "\");opacity:" + opacity + ";position:relative;z-index:10;background-position: " + wind.xoff + "px " + wind.yoff + "px;'><img src='graphics/spacer.gif' width='416' height='416' /></div>");
    } else {
      $("#worldlayer").html("<img src='graphics/spacer.gif' width='416' height='416' />");
    }
    if (themap.worldlayer) {
      $("#worldlayer").css("background-image", "url('graphics/" + themap.worldlayer + "')");
    } else {
      $("#worldlayer").css("background-image", "");
    }
    mapdiv += "<table id='mainview' cellpadding='0' cellspacing='0' border='0' style=\"position:relative; z-index:20; top:20px\">";
    var tp = 0; // telepathy
    var ev = 0; // ethereal vision
    if (PC.getSpellEffectsByName("Telepathy")) { tp = 1; }
    if (PC.getSpellEffectsByName("EtherealVision")) { ev = 1; }
    for (var i=displayspecs.topedge;i<=displayspecs.bottomedge;i++) {
      mapdiv += "<tr>";
      for (var j=displayspecs.leftedge;j<=displayspecs.rightedge;j++) {
      	var thiscell = getDisplayCell(themap,centerx,centery,j,i,tp,ev);
      	opac = 1;
      	if ((thiscell.lighthere >= SHADOW_THRESHOLD) && (thiscell.lighthere < 1) && !ev) {
      	  opac = 0.3;
      	} else if (thiscell.lighthere < SHADOW_THRESHOLD && !ev) {
      	  opac = 0;
      	}
        mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="opacity: ' + opac + '; background-image:url(\'graphics/' + thiscell.showGraphic + '\'); background-repeat:no-repeat; background-position: ' + thiscell.graphics2 + 'px ' + thiscell.graphics3 + 'px; position:relative; z-index:20;"><img id="tile'+j+'x'+i+'" src="graphics/'+thiscell.graphics1+'" border="0" alt="tile'+j+'x'+i+' los:' + thiscell.losresult + ' light:' + thiscell.lighthere + '" width="32" height="32" style="position: relative; z-index:20" title="' + thiscell.desc + '" /></td>';
      }  
      mapdiv += '</tr>';
    }
    mapdiv  += '</table>';
    $('#displayframe').html(mapdiv);
    $.each(spellcount, function(idx, val) {
      if ((val.getx() >= displayspecs.leftedge) && (val.getx() <= displayspecs.rightedge) && (val.gety() >= displayspecs.topedge) && (val.gety() <= displayspecs.bottomedge)) {
        var where = getCoords(val.getHomeMap(),val.getx(), val.gety());
//        where.x += 192;
//        where.y += 192;
        $("#" + idx).css("left", where.x);
        $("#" + idx).css("top", where.y);
      }
    });
  } else if (how === "one") {
    if ((themap === PC.getHomeMap()) && (centerx <= displayspecs.rightedge) && (centerx >= displayspecs.leftedge) && (centery >= displayspecs.topedge) && (centery <= displayspecs.bottomedge)) {
      var thiscell = getDisplayCell(themap,PC.getx(),PC.gety(),centerx,centery);
      var tileid = "#td-tile" + centerx + "x" + centery;
      $(tileid).css("background-image","url('graphics/" + thiscell.showGraphic + "')");
      $(tileid).css("background-position",thiscell.graphics2 + 'px ' + thiscell.graphics3 + 'px');
      $(tileid).html('<img id="tile'+centerx+'x'+centery+'" src="graphics/'+thiscell.graphics1+'" border="0" alt="tile'+centerx+'x'+centery+' los:' + thiscell.losresult + ' light:' + thiscell.lighthere + '" width="32" height="32" style="position: relative; z-index:20" title="' + thiscell.desc + '" />');
    }
    $.each(spellcount, function(idx, val) {
      if ((val.getx() >= displayspecs.leftedge) && (val.getx() <= displayspecs.rightedge) && (val.gety() >= displayspecs.topedge) && (val.gety() <= displayspecs.bottomedge)) {
        var where = getCoords(val.getHomeMap(),val.getx(), val.gety());
//        where.x += 192;
//        where.y += 192;
        $("#" + idx).css("left", where.x);
        $("#" + idx).css("top", where.y);
      }
    });

  }
  
}

function DrawTopbarFrame(txt) {
  $('#topbarframe').html(txt);	
}

$(document).ready(function() {
//  var worldmap = new GameMap();
//  worldmap.loadMap("darkunknown");
//  maps.addMapByRef(worldmap);

  var browserheight = $(window).height();
  var browserwidth = $(window).width();

  var blackwidth = browserwidth - 776;
  var blackheight = browserheight - 456;
  
  $("body").append('<div style="position:absolute;left:776px;top:0px;z-index:99; width:' + blackwidth + 'px; height:' + browserheight + 'px; background-color:black;"><img src="graphics/spacer.gif" width="' + blackwidth + '" height = "' + browserheight + '" /></div>');
  $("body").append('<div style="position:absolute;left:0px;top:456px;z-index:99; width:' + browserwidth + 'px; height:' + blackheight + 'px; background-color:black;"><img src="graphics/spacer.gif" width="' + browserwidth + '" height = "' + blackheight + '" /></div>');
      
  set_conversations();
  DU.merchants = {};
  DU.merchants = SetMerchants();
  // create audio players
//  populate_audio(musiclist, 0, 1, "music");
//  populate_audio(sfxlist, 1, 0, "sfx");
  if (debug) {  ActivateDebug(1); }
  audio_init();  
	CreateUI();
});

function SoundLoaded() {
  var whichsave = gamestate.getLatestSaveIndex();
  if (whichsave === -1) {
    gamestate.initializeSaveGames();
    gamestate.loadGame("tmp");
  } else {
    gamestate.loadGame(whichsave);
  }
//  audio_init_2();   // moved into audio_init
  DrawCharFrame();
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());

  maintext.addText("Game loaded.");
  maintext.setInputLine("&gt;");
  maintext.drawTextFrame(); 
  
  $(document).keydown(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
//   if (code == 27) { e.preventDefault(); }
  e.preventDefault();
  DoAction(code, e.ctrlKey);
  });
}

function DoAction(code, ctrl) {
  if (debug && ctrl && (code === 88)) { 
    // BE VERY CAREFUL WITH THIS.
    // recovers from syntax errors, returns control to player
    gamestate.setMode("player");
  }
  if (gamestate.getMode() === "player") {  // PC's turn, awaiting commands
//   	 alert(DUTime.getGameClock());
    var response = PerformCommand(code, ctrl);
    if (response["fin"]) { 
      maintext.addText(response["txt"]);
      maintext.setInputLine(response["input"]);
      var inp = response["input"];
      maintext.drawTextFrame();
      if (response["fin"] === 1) {
        PC.endTurn(response["initdelay"]);
      } else if (response["fin"] === 3) {
        gamestate.setMode("waiting");
      } 
    }  
  }
  else if (gamestate.getMode() === "anykey") {
    if (targetCursor.command === "garrick") {
      var retval = GarrickScene(targetCursor.stage);
      if (retval["fin"] === 1) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        startScheduler();
      } else {
        gamestate.setMode("anykey");
      }
    } else if (targetCursor.command === "u") {
      var retval = PerformRead();
      maintext.addText(retval["txt"]);
      if (retval["fin"] === 1) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        PC.endTurn(retval["initdelay"]);
      }
    } else {
      if (((code >= 65) && (code <= 90)) || (code === 32) || (code === 13)) {  // letter, space, or enter
        if (targetCursor.command === "c") {
          maintext.setInputLine("&gt;");
          maintext.drawTextFrame();
          DrawMainFrame("draw",PC.getHomeMap().getName(),PC.getx(),PC.gety());
          PC.endTurn();
        } else {
          var retval = PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), targetCursor.keyword); 
          maintext.addText(retval["txt"]);
          maintext.setInputLine(retval["input"]);
          maintext.drawTextFrame();
         
          if (retval["fin"] === 1) {
            PC.endTurn(retval["initdelay"]);
          }
        }
      }
    }
  }
  else if (gamestate.getMode() === "talk") {
    if ((code >= 65) && (code <= 90)) {  // letter, NOT SPACE 
      var letter = String.fromCharCode(code);    	
      if (inputText.txt.length < 14) {
        inputText.txt += letter;
        maintext.setInputLine(maintext.getInputLine() + letter);
        maintext.drawInputLine();
      }
    } 
    else if (code === 32) { // space
      // nothing 
    }
    else if (code === 8) { // backspace
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
    else if (code === 13) { // enter
      if (inputText.cmd === "y") { 
        var retval = PerformYell(); 
        if (retval["fin"] === 2) {
          gamestate.setMode("player");
          gamestate.setTurn(PC);
        }
        else if (retval["fin"] === 1) {
          PC.endTurn(retval["initdelay"]);
        }
        else if (retval["fin"] === 3) {
          gamestate.setMode("options");
        }
        maintext.setInputLine("&gt;");
        maintext.addText(retval["txt"]);
        maintext.drawTextFrame();

      } else if ( inputText.cmd === "t") {
        var convo = targetCursor.talkingto.getConversation();
        var retval;
        if (inputText.subcmd === "yn") {
          delete inputText.subcmd;
          if (inputText.txt === "") { inputText.txt = "NO"; }
          if ((inputText.txt === "Y") || (inputText.txt === "YES")) {
            inputText.txt = "YES";
            maintext.addText(" ");
            maintext.addText("You answer (y/n): " + inputText.txt);
            retval = PerformTalk(targetCursor.talkingto, convo, "_yes");
          } else {
            inputText.txt = "NO";
            maintext.addText(" ");
            maintext.addText("You answer (y/n): " + inputText.txt);
            retval = PerformTalk(targetCursor.talkingto, convo, "_no");
          }
        } else {
          if (inputText.txt === "") { inputText.txt = "BYE"; }
          maintext.addText(" ");
          maintext.addText("You say: " + inputText.txt);
          retval = PerformTalk(targetCursor.talkingto, convo, inputText.txt);
        }
        maintext.addText(retval["txt"]);
        maintext.setInputLine(retval["input"]);
        maintext.drawTextFrame();
        
        if (retval["fin"] === 1) {
          PC.endTurn(retval["initdelay"]);
        }
      } 
      else { alert("need to add hook here! (main 260)"); }
    }
    else if (code === 27) { // ESC
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    }
    else { // ignore
    	
    }
  }
  else if (gamestate.getMode() === "choosedir") {
    var response = PerformChooseDir(code);
    if (response["fin"] === 1) { // direction chosen
      if ((targetCursor.x === PC.getx()) && (targetCursor.y === PC.gety()) && (targetCursor.command === "u") ) {
        var resp = PerformUseFromInventory();
      }
      else if ((targetCursor.x === PC.getx()) && (targetCursor.y === PC.gety()) && ((targetCursor.command === "a") || (targetCursor.command === "s") || (targetCursor.command === "c") || (targetCursor.command === "p"))) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        gamestate.setMode("player");
        return;
      }
      else {
        var resp;
        if (targetCursor.command === "u") { // USE
          resp = PerformUse(PC);
        } else if (targetCursor.command === "g") { // GET
          resp = PerformGet(PC);
        } else if (targetCursor.command === "s") { // SEARCH
          resp = PerformSearch(PC);
        } else if (targetCursor.command === "a") {  // ATTACK
          var dir = "";
          if (targetCursor.y === PC.gety()-1) { dir = "North"; }
          if (targetCursor.y === PC.gety()+1) { dir = "South"; }
          if (targetCursor.x === PC.getx()-1) { dir = "West"; }
          if (targetCursor.x === PC.getx()+1) { dir = "East"; }
          dir = "Attack " + dir + ".";
          resp = PerformAttackMap(PC);  			  
        } else if (targetCursor.command === "c") { // CAST
          resp = PerformDirSpellcast();          
        } else if (targetCursor.command === "p") { // PUSH
          resp = PerformPush(PC);
        }
        if (resp["fin"] >= 2) {
          if ((targetCursor.command === "u") && (resp["fin"] === 3)) {
            maintext.setInputLine("[MORE]");
            maintext.addText(resp["txt"]);
            gamestate.setMode("anykey");
            maintext.drawTextFrame();
          } else {
            if ((resp["fin"] > 2) && (targetCursor.command !== "t")) {
              gamestate.setMode("player");
            }      
            maintext.addText(resp["txt"]);
            maintext.setInputLine(resp["input"]);
            maintext.drawTextFrame();
          }
        }
        if (resp["fin"] < 2) {
          maintext.addText(resp["txt"]);
          maintext.setInputLine("&gt;");
          maintext.drawTextFrame();

          PC.endTurn(resp["initdelay"]);
        } 
      }
    }
    else if (response["fin"] === -1) {   // anything not useful
      gamestate.setMode("choosedir");
    }
    else { // ESC hit
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      gamestate.setMode("player");
      return;
    }
  }
  else if (gamestate.getMode() === "target") {
    var response = PerformTarget(code);
    if (response["fin"] === 1) {  // move the cursor
//  		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
//      var pos = getCoords(PC.getHomeMap(), targetCursor.x, targetCursor.y);
//      var posleft = 192 + (targetCursor.x - displayspecs.centerx)*32;
//      var postop = 192 + (targetCursor.y - displayspecs.centery)*32;
      var tileid = targetCursor.tileid;
      $(tileid).html(targetCursor.basetile);
      tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
      targetCursor.tileid = tileid;
      targetCursor.basetile = $(tileid).html();
//      pos.x = 0;
//      pos.y = 0;
      $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0;top:0;z-index:50" />');
      gamestate.setMode("target");
    }
    else if (response["fin"] === 2) { // act on the current target
      var newresponse = {};
      if (targetCursor.command === "l") {
        newresponse = PerformLook();
        maintext.addText(newresponse["txt"]);
        maintext.setInputLine(newresponse["input"]);
        maintext.drawTextFrame();
      } else if (targetCursor.command === "a") {
        newresponse = PerformAttack(PC);
        if (newresponse["txt"]) {
          maintext.addText(newresponse["txt"]);
        }
        if (newresponse["input"]) {
          maintext.setInputLine(newresponse["input"]);
        }
        maintext.drawTextFrame();
      } else if (targetCursor.command === "t") {
        newresponse = PerformTalkTarget();
        maintext.addText(newresponse["txt"]);
        maintext.setInputLine(newresponse["input"]);
        maintext.drawTextFrame();
      } else if (targetCursor.command === "c") {
        newresponse = PerformSpellcast();
        maintext.addText(newresponse["txt"]);
        maintext.setInputLine(newresponse["input"]);
        maintext.drawTextFrame();        
      }
      if ((newresponse["fin"] === 0) || (newresponse["fin"] === 2)) {
        gamestate.setMode("player");
        // does not take time, either because it failed or was a no-time success
      }
      else if (newresponse["fin"] === 1) {
        PC.endTurn(newresponse["initdelay"]);
      }
      else if (newresponse["fin"] === -1) {
        gamestate.setMode("null");
        // wait and let the combat code set things to next turn. NOTE: possible race conition
        raceWarning = 1;
      }
      else if (newresponse["fin"] === 3) {
//        gamestate.setMode("talk");      // not needed, set in talk code
        // new response code (need a lot for targeting!)
        
      } else if (newresponse["fin"] === 4) {
        // don't do anything, already set to Equip
      }
    }
    else if (response["fin"] === 0) { 
      var tileid = targetCursor.tileid;
      $(tileid).html(targetCursor.basetile); 
      maintext.addText(response["txt"]);
      maintext.setInputLine(response["input"]);
  			//DrawTextFrame(maintext.getTextFrame(), response["input"]);
      maintext.drawTextFrame();
      
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    }
    else {
      gamestate.setMode("target");
    }

  } 
  else if (gamestate.getMode() === "equip") {
    var response;
    if (targetCursor.command === "w") {
      response = PerformEquip(code);
    } else if (targetCursor.command === "u") {
      response = PerformUseFromInventoryState(code);
    } else if (targetCursor.command === "r") {
      response = PerformRuneChoice(code);
    } else if (targetCursor.command === "c") {
      response = PerformSpellcastEquip(code);
    }
    if (response["fin"] === 0) {
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    }
    else if (response["fin"] === -1) {
      gamestate.setMode("useprompt");
      maintext.addText(response["txt"]);
      maintext.setInputLine(response["input"]);
      maintext.drawTextFrame();
    }
    else if (response["fin"] === 1) {
      maintext.addText(response["txt"]);
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
      PC.endTurn(response["initdelay"]);
    }
    else if (response["fin"] === 3) {
      // books
      maintext.setInputLine("[MORE]");
      maintext.addText(response["txt"]);
      gamestate.setMode("anykey");
      maintext.drawTextFrame();
    }

            
  }
  else if (gamestate.getMode() === "useprompt") {
    var used = targetCursor.itemlist[targetCursor.scrolllocation];
    var response = used.usePrompt(code);

    maintext.addText(response["txt"]);
    maintext.setInputLine("&gt;");
    maintext.drawTextFrame();
    DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
    DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
    PC.endTurn(response["initdelay"]);
  }
  else if (gamestate.getMode() === "zstats") {
    var response = performZstats(code);
    if (response["fin"] === 0) {
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    } else if (response["fin"] === 1) {
      
    }
  }
  else if (gamestate.getMode() === "options") {
    var response = performOptions(code);
    if (response["fin"] === 0) {
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    } else if (response["fin"] === 1) {
        
    }
  }
  else if (gamestate.getMode() === "singleletter") {
    if (((code >= 65) && (code <= 90)) || (code === 32)) {  // letter
      if (inputText.thing = "toshin") {
        var retval = PerformToshinAltar(code);
        if (retval["fin"] === 2) {
          gamestate.setMode("player");
          gamestate.setTurn(PC);
        } else if (retval["fin"] === 1) {
          PC.endTurn(retval["initdelay"]);
        }
        maintext.setInputLine("&gt;");
        maintext.addText(retval["txt"]);
        maintext.drawTextFrame();
      }
    }
    else if (code === 27) { // ESC
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    }
    else { // ignore
    	
    }
  } else if (gamestate.getMode() === "choosesave") {
    if (code === 27) { // esc
      $("#uiinterface").html("");
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    } else if (targetCursor.command === "l") {
      if ((code >= 48) && (code <= 57)) {
        var saveIndex = JSON.parse(localStorage.saveIndex);
        var idx = code-48;
        if (saveIndex[idx].charname) { 
          gamestate.loadGame(idx); 
          DrawCharFrame();
          DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
          DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());

          maintext.addText("Game loaded.");
          maintext.setInputLine("&gt;");
          maintext.drawTextFrame(); 
          $("#uiinterface").html("");
        }
      }
    } else if (targetCursor.command === "q") {
      if ((code >= 49) && (code <= 56)) {
        var saveIndex = JSON.parse(localStorage.saveIndex);
        var idx = code-48;
        gamestate.setMode("saving");
        gamestate.saveGame(idx); 
		    maintext.addText("Quit &amp; Save: Saving game...");
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame(); 
        $("#uiinterface").html("");
        gamestate.setMode("player");
        gamestate.setTurn(PC);
      }
    }
  } else if (gamestate.getMode() === "spellbook") {
    if (code === 27) { // esc
      $('#spellbookdiv').jqmHide();
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    }    else {
      var response = PerformSpellbook(code);
      if (response["fin"] === 1) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        maintext.addText(response["txt"]);
        PC.endTurn();
      } else if (response["fin"] === 4) {
        maintext.setInputLine(response["input"]);
        maintext.addText(response["txt"]);
        maintext.drawTextFrame();
        // mode has been set prior to this point
      } else if (response["fin"] === 2) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        maintext.addText(response["txt"]);
        gamestate.setMode("player");
        gamestate.setTurn(PC);
      } else if (response["fin"] === 3) {
        // waiting for an animation to finish, animation will handle ending turn
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        maintext.addText(response["txt"]);
        gamestate.setMode("null");
      }
    }
  }
  else if (gamestate.getMode() === "buy") {
    if ((code === 27) || (code ===13)) {    // ESC or enter
      var convo = targetCursor.talkingto.getConversation();
      maintext.addText(" ");
      maintext.addText("You buy: Nothing.");
      var retval = PerformTalk(targetCursor.talkingto, convo, "bye");
      maintext.addText(retval["txt"]);
      maintext.setInputLine(retval["input"]);
      maintext.drawTextFrame();
        
      if (retval["fin"] === 1) {
        PC.endTurn(retval["initdelay"]);
      }
    } else if ((code === 47) || (code === 63) || (code === 191)) {  //  ?, or / since it doesn't actually look at shift
      maintext.addText(" ");
      PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), "buy");
    } else if ((code >= 65) && (code <= 90)) {
      // check to see if that letter is in the merchant's inventory
      var merinv = DU.merchants[targetCursor.talkingto.getMerch()];
      var idx = code-65;
      if (merinv.stock[idx] && ((merinv.stock[idx].quantity) || (merinv.type === "spells"))) {  
        // that letter goes to something, and it is either spells or has a quantity
        if ((merinv.type === "spells") && (!PC.knowsSpell(SPELL_LIGHT_LEVEL,SPELL_LIGHT_ID))) {  
          // Doesn't have a spellbook, which starts with Light in it
          maintext.addText(" ");
          maintext.addText("You need a spellbook to learn spells.");
        } else if (merinv.stock[idx].price <= PC.getGold()) { // can afford it (at least one of it)!
          if (merinv.stock[idx].quantity) {  // item
            targetCursor.buychoice = idx;
            //working here - set up new buy interface
            // say presale blurb
            if (merinv.stock[idx].presale) {
              maintext.addText(merinv.stock[idx].presale);
            }
            if (!merinv.stock[idx].sellqty) {
              maintext.setInputLine("Purchase " + merinv.stock[idx].desc + "?");
            } else {
              maintext.setInputLine("Purchase how many?");
            }
            maintext.drawTextFrame();
            gamestate.setMode("buy-choose");
          } else { // spell 
            if (PC.knowsSpell(merinv.stock[idx].lvl, merinv.stock[idx].sid)) {
              maintext.addText(" ");
              maintext.addText("You already know that spell.");
            } else if ((merinv.stock[idx].lvl > 2) && (!DU.gameflags.getFlag("spellbook2"))) {
              maintext.addText(" ");
              maintext.addText("Your spellbook is not strong enough to contain that spell.");
            } else {
              targetCursor.buychoice = idx;
              //working here - set up new buy interface
              // say presale blurb
              if (merinv.stock[idx].presale) {
                maintext.addText(merinv.stock[idx].presale);
              }
              maintext.setInputLine("Purchase " + merinv.stock[idx].desc + "?");
              maintext.drawTextFrame();
              gamestate.setMode("buy-choose");
            }

          }
        } else { // not enough money
          maintext.addText(" ");
          maintext.addText("You don't have enough gold for that.");
        }
      }
    }
  }
  else if (gamestate.getMode() === "sell") {
    if ((code === 27) || (code ===13)) {    // ESC or enter
      var convo = targetCursor.talkingto.getConversation();
      maintext.addText(" ");
      maintext.addText("You sell: Nothing.");
      var retval = PerformTalk(targetCursor.talkingto, convo, "bye");
      maintext.addText(retval["txt"]);
      maintext.setInputLine(retval["input"]);
      maintext.drawTextFrame();
        
      if (retval["fin"] === 1) {
        PC.endTurn(retval["initdelay"]);
      }

    } else if ((code === 47) || (code === 63) || (code === 191)) {  //  ?, or / since it doesn't actually look at shift
      maintext.addText(" ");
      PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), "sell");
    } else if ((code >= 65) && (code <= 90)) {
      var merinv = DU.merchants[targetCursor.talkingto.getMerch()];
      var idx = code-65;
      if (merinv.stock[idx]) {
        var ininv = PC.checkInventory(merinv.stock[idx].item);
        var qty = ininv.getQuantity();
        if ((ininv === PC.getArmor()) || (ininv === PC.getWeapon()) || (ininv === PC.getMissile())) {
          qty = qty-1;
        }
        if (qty) { // sell it!
          var sold = ininv.desc;
          sold = sold.charAt(0).toUpperCase() + sold.slice(1)
          maintext.addText(sold + ": sold.");
          PC.removeFromInventory(ininv);  // already handles only subtracting 1 if there are multiples
          PC.addGold(Math.ceil(merinv.stock[idx].price/10));
          DrawCharFrame();
        }
      }
    }
  }
  else if (gamestate.getMode() === "buy-choose") {
    var merinv = DU.merchants[targetCursor.talkingto.getMerch()];
    var idx = targetCursor.buychoice;
    if (!merinv.stock[idx].sellqty && (code === 89)) { // buy one at a time, choosing to buy (pressing Y)
      if (merinv.type === "spells") {
        PC.addSpell(merinv.stock[idx].lvl, merinv.stock[idx].sid);
        maintext.addText(" ");
        maintext.addText("You have learned the spell " + merinv.stock[idx].desc + ".");
        PC.addGold(-(merinv.stock[idx].price));
        PC.addSpell(merinv.stock[idx].lvl, merinv.stock[idx].sid);
        gamestate.setMode("buy");
        maintext.setInputLine("Buy what: ");
        maintext.drawTextFrame();
        DrawCharFrame();
      } else {
        var idx = targetCursor.buychoice;
        var newitem = localFactory.createTile(merinv.stock[idx].item);
        if (merinv.stock[idx].quantity != 99) { merinv.stock[idx].quantity = merinv.stock[idx].quantity -1; }
        PC.addGold(-(merinv.stock[idx].price));
        PC.addToInventory(newitem,1);
        maintext.addText(" ");
        maintext.addText(newitem.getDesc().charAt(0).toUpperCase() + newitem.getDesc().slice(1) + ": Purchased. Anything else?");
        maintext.setInputLine("Buy what: ");
        maintext.drawTextFrame();

        DrawCharFrame();
        gamestate.setMode("buy");
      }
    } else if (merinv.stock[idx].sellqty && (code === 13)) {  // buy in a batch, have hit Enter
      var idx = targetCursor.buychoice;
      var buyqty = parseInt(targetCursor.buyqty);
      delete targetCursor.buyqty; 
      if (isNaN(buyqty)) { buyqty = 0; }
      if (buyqty <= 0) { 
        PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), "_nobuy");
        gamestate.setMode("buy");
        maintext.setInputLine("Buy what: ");
        maintext.drawTextFrame();
      } else if (buyqty > merinv.stock[idx].quantity) {
        maintext.addText("There are not that many available.");
        targetCursor.buyqty = buyqty;
      } else if ((merinv.stock[idx].price * parseInt(buyqty)) <= PC.getGold()) {
        maintext.addText(merinv.stock[idx].sale);
        var idx = targetCursor.buychoice;
        var newitem = localFactory.createTile(merinv.stock[idx].item);
        if (merinv.stock[idx].quantity != 99) { merinv.stock[idx].quantity = merinv.stock[idx].quantity - buyqty; }
        PC.addGold(-(merinv.stock[idx].price * buyqty));
        PC.addToInventory(newitem,buyqty);
        maintext.addText(" ");
        maintext.addText(newitem.getDesc().charAt(0).toUpperCase() + newitem.getDesc().slice(1) + " x" + buyqty + ": Purchased. Anything else?");
        if (HasStock(targetCursor.talkingto.getMerch())) {
          maintext.setInputLine("Buy what: ");
          maintext.drawTextFrame();
          DrawCharFrame();
          gamestate.setMode("buy");        
        } else {
          var retval = PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), "_soldout");
          maintext.addText(retval["txt"]);
          maintext.setInputLine(retval["input"]);
          maintext.drawTextFrame();
        
          if (retval["fin"] === 1) {
            PC.endTurn(retval["initdelay"]);
          }
        }
      } else {
        maintext.addText("You don't have enough gold for that.");
        gamestate.setMode("buy");
      }
    } else if ((code >= 48) && (code <= 57) && (merinv.stock[idx].sellqty)) {
      // picking a number
      var typednum = code-48;
      if (!targetCursor.buyqty) {
        if (typednum) {  // there's no buyqty yet, so you can't add 0 to it.
          targetCursor.buyqty = code-48;
          targetCursor.buyqty = targetCursor.buyqty.toString();
        } 
      } else if ( targetCursor.buyqty.length <= 2) {
        targetCursor.buyqty = targetCursor.buyqty + "" + typednum;
      }
      if (targetCursor.buyqty) {
        maintext.setInputLine("Purchase how many? " + targetCursor.buyqty);
        maintext.drawTextFrame();
      }
    } else if ((!merinv.stock[idx].sellqty && (code === 78)) || (code === 27)) {
      // saying NO (non-qty) or ESC (any)
      maintext.addText(" ");
      PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), "_nobuy");
      maintext.setInputLine("Buy what: ");
      maintext.drawTextFrame();
//      DisplayWares(targetCursor.talkingto);
      gamestate.setMode("buy");
    } else if ((code === 8) && (merinv.stock[idx].sellqty)) {
      // backspace
      if (targetCursor.buyqty.length > 1) {
        targetCursor.buyqty = targetCursor.buyqty.charAt(0);
      } else {
        targetCursor.buyqty = "";
      }
      maintext.setInputLine("Purchase how many? " + targetCursor.buyqty);
      maintext.drawTextFrame();
    }
  }
}

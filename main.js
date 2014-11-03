
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

DU.PC = new PCObject();
var PC = DU.PC;  // alias

var timeouts = {};

PC.assignSerial();
//var audioplayers = create_audio();
var nowplaying = "";
var laststep = "left";
var gamestate = new GameStateData();
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
var finder = new PF.AStarFinder();
DU.gameflags = {};
DU.gameflags.music = 0;
DU.gameflags.sound = 1;

var targetCursor = {};
    targetCursor.skipahead = 0;
var inputText = {};

var raceWarning = 0;

function DrawCharFrame() {
  var txt = "<table cellpadding='0' cellspacing='0' border='0' width='100%' style='margin-top:1px'><tr><td colspan='2'>";
  txt = txt + PC.getPCName() + "</td><td id='hpcell' style='text-align:right'>HP: " + PC.getDisplayHP() + "</td></tr>";
  txt = txt + "<tr><td width='33%' id='gpcell'>GP: " + PC.getGold() + "</td><td width='34%'>" + SpellInitials(PC) + "</td><td width='33%' style='text-align:right'>MP: " + PC.getMana() + "</td></tr></table>";
  $("#charstats").html(txt);
}

function DrawMainFrame(how, mapname, centerx, centery) {
  // how options are "draw" and "one"

  var mapdiv = "&nbsp;";
  var themap = maps.getMap(mapname);
  var opac = 1;
  
  if (themap === undefined) {
    alert("How am I here? (Drawmap)");
    maps.addMap(mapname);
    themap = maps.getMap(mapname);
  }

  var debugcolor = "#0000cc";
  if (debug) { dbs.writeln("<br /><br />"); }
	
  if (how === "draw") {
    displayspecs = getDisplayCenter(themap,centerx,centery);
    
    var mapbg = '';
    if (themap.getBackground()) {
      //mapbg = 'background-image:url(\'graphics/' + themap.getBackground() + '\'); background-repeat:no-repeat;';
      $("#worldlayer").html("<div id='cloudlayer' style='background-image:url(\"graphics/" + themap.getBackground() + "\");opacity:.6;position:relative;z-index:10;background-position: " + wind.xoff + "px " + wind.yoff + "px;'><img src='graphics/spacer.gif' width='416' height='416' /></div>");
    } else {
      $("#worldlayer").html("<img src='graphics/spacer.gif' width='416' height='416' />");
    }
    if (themap.worldlayer) {
      $("#worldlayer").css("background-image", "url('graphics/high_world.gif')");
    } else {
      $("#worldlayer").css("background-image", "");
    }
    mapdiv += "<table cellpadding='0' cellspacing='0' border='0' style=\"position:relative; z-index:20;\"><tr>";
    for (var i=displayspecs.topedge;i<=displayspecs.bottomedge;i++) {
      for (var j=displayspecs.leftedge;j<=displayspecs.rightedge;j++) {
      	var thiscell = getDisplayCell(themap,centerx,centery,j,i);
      	opac = 1;
      	if ((thiscell.lighthere >= SHADOW_THRESHOLD) && (thiscell.lighthere < 1)) {
      	  opac = 0.3;
      	}
      	if (thiscell.lighthere < SHADOW_THRESHOLD) {
      	  opac = 0;
      	}
        mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="opacity: ' + opac + '; background-image:url(\'graphics/' + thiscell.showGraphic + '\'); background-repeat:no-repeat; background-position: ' + thiscell.graphics2 + 'px ' + thiscell.graphics3 + 'px; position:relative; z-index:20;"><img id="tile'+j+'x'+i+'" src="graphics/'+thiscell.graphics1+'" border="0" alt="tile'+j+'x'+i+' los:' + thiscell.losresult + ' light:' + thiscell.lighthere + '" width="32" height="32" style="position: relative; z-index:20" title="' + thiscell.desc + '" /></td>';
      }  
      mapdiv += '</tr><tr>';
    }
    mapdiv  += '</table>';
    $('#displayframe').html(mapdiv);
  } else if (how === "one") {
    if ((centerx <= displayspecs.rightedge) && (centerx >= displayspecs.leftedge) && (centery >= displayspecs.topedge) && (centery <= displayspecs.bottomedge)) {
      var thiscell = getDisplayCell(themap,PC.getx(),PC.gety(),centerx,centery);
      var tileid = "#td-tile" + centerx + "x" + centery;
      $(tileid).css("background-image","url('graphics/" + thiscell.showGraphic + "')");
      $(tileid).css("background-position",thiscell.graphics2 + 'px ' + thiscell.graphics3 + 'px');
      $(tileid).html('<img id="tile'+centerx+'x'+centery+'" src="graphics/'+thiscell.graphics1+'" border="0" alt="tile'+centerx+'x'+centery+' los:' + thiscell.losresult + ' light:' + thiscell.lighthere + '" width="32" height="32" style="position: relative; z-index:20" title="' + thiscell.desc + '" />');
    }
  }
  
}

function DrawTopbarFrame(txt) {
  $('#topbarframe').html(txt);	
}

$(document).ready(function() {
  var worldmap = new GameMap();
  worldmap.loadMap("darkunknown");
  maps.addMapByRef(worldmap);
    
  set_conversations();
  DU.merchants = {};
  DU.merchants = SetMerchants();
  // create audio players
  populate_audio(musiclist, 0, 1, "music");
  populate_audio(sfxlist, 1, 0, "sfx");
	
  gamestate.loadGame();
  DrawCharFrame();
  

  
  
  PC.getHomeMap().placeThing(PC.getx(),PC.gety(),PC);
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());

  maintext.addText("Game loaded.");
  maintext.setInputLine("&gt;");
  maintext.drawTextFrame(); 
  
  $(document).keydown(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
//   if (code == 27) { e.preventDefault(); }
  e.preventDefault();
  DoAction(code);
  });
});

function DoAction(code) {
  if (gamestate.getMode() === "player") {  // PC's turn, awaiting commands
//   	 alert(DUTime.getGameClock());
    var response = PerformCommand(code);
    if (response["fin"]) { 
      maintext.addText(response["txt"]);
      maintext.setInputLine(response["input"]);
      var inp = response["input"];
      maintext.drawTextFrame();
      if (response["fin"] === 1) {
        PC.endTurn(response["initdelay"]);
      }
    }  
  }
  else if (gamestate.getMode() === "anykey") {
    if (((code >= 65) && (code <= 90)) || (code === 32) || (code === 13)) {  // letter, space, or enter
      var retval = PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), targetCursor.keyword); 
      maintext.addText(retval["txt"]);
      maintext.setInputLine(retval["input"]);
      maintext.drawTextFrame();
        
      if (retval["fin"] === 1) {
        PC.endTurn(retval["initdelay"]);
      }
    }
  }
  else if (gamestate.getMode() === "talk") {
    if (((code >= 65) && (code <= 90)) || (code === 32)) {  // letter
      var letter = String.fromCharCode(code);    	
      if (inputText.txt.length < 14) {
        inputText.txt += letter;
        maintext.setInputLine(maintext.getInputLine() + letter);
        maintext.drawInputLine();
      }
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
        maintext.setInputLine("&gt;");
        maintext.addText(retval["txt"]);
        maintext.drawTextFrame();

      } else if ( inputText.cmd === "t") {
        var convo = targetCursor.talkingto.getConversation();
        maintext.addText(" ");
        maintext.addText("You say: " + inputText.txt);
        var retval;
        if (inputText.subcmd === "yn") {
          if ((inputText.txt === "y") || (inputText.txt === "yes")) {
            retval = PerformTalk(targetCursor.talkingto, convo, "_yes");
          } else {
            retval = PerformTalk(targetCursor.talkingto, convo, "_no");
          }
          delete inputText.subcmd;
        } else {
          retval = PerformTalk(targetCursor.talkingto, convo, inputText.txt);
        }
        maintext.addText(retval["txt"]);
        maintext.setInputLine(retval["input"]);
        maintext.drawTextFrame();
        
        if (retval["fin"] === 1) {
          PC.endTurn(retval["initdelay"]);
        }
      } 
      else { alert("need to add hook here! (main 212)"); }
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
      if ((targetCursor.x === PC.getx()) && (targetCursor.y === PC.gety()) && (targetCursor.command === "u")) {
//        maintext.addText("Use from inventory not yet implemented.");
        PerformUseFromInventory();
//        maintext.setInputLine("&gt;");
//        maintext.drawTextFrame();
//        gamestate.setMode("equip");
        return;
      }
      else if ((targetCursor.x === PC.getx()) && (targetCursor.y === PC.gety()) && ((targetCursor.command === "g") || (targetCursor.command === "a") || (targetCursor.command === "s"))) {
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
        }
        if (resp["fin"] === 1) {
// 					DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
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
    }
    if (response["fin"] === 0) {
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    }
    else if (response["fin"] === 1) {
      
    }
    else if (response["fin"] === 2) {
      maintext.addText(response["txt"]);
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
      PC.endTurn(response["initdelay"]);
    }
            
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
  else if (gamestate.getMode() === "spellbook") {
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
        PC.endTurn();
      } else if (response["fin"] === 2) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        gamestate.setMode("player");
        gamestate.setTurn(PC);
      } else if (response["fin"] === 3) {
        // waiting for an animation to finish, animation will handle ending turn
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
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
//      DisplayWares(targetCursor.talkingto);
    } else if ((code >= 65) && (code <= 90)) {
      // check to see if that letter is in the merchant's inventory
      var merinv = DU.merchants[targetCursor.talkingto.getMerch()];
      var idx = code-65;
      if (merinv.stock[idx] && ((merinv.stock[idx].quantity) || (merinv.type === "spells"))) {  
        // that letter goes to something, and it is either spells or has a quantity
        if ((merinv.type === "spells") && (!PC.knowsSpell(1,GetSpellID(5)))) {  
          // Doesn't have a spellbook, which starts with Light in it
          maintext.addText(" ");
          maintext.addText("You need a spellbook to learn spells.");
        } else if (merinv.stock[idx].price < PC.getGold()) { // can afford it!
          PC.addGold(-(merinv.stock[idx].price));
          if (merinv.stock[idx].quantity) {  // item
            var newitem = localFactory.createTile(merinv.stock[idx].item);
            if (merinv.stock[idx].quantity != 99) { marinv.stock[idx].quantity = marinv.stock[idx].quantity -1; }
            PC.addToInventory(newitem,1);
            maintext.addText(" ");
            maintext.addText(newitem.getDesc().charAt(0).toUpperCase() + newitem.getDesc().slice(1) + ": Purchased. Anything else?");
          } else { // spell 
            if (PC.knowsSpell(merinv.stock[idx].lvl, merinv.stock[idx].sid)) {
              maintext.addText(" ");
              maintext.addText("You already know that spell.");
            } else {
              PC.addSpell(merinv.stock[idx].lvl, merinv.stock[idx].sid);
              maintext.addText(" ");
              maintext.addText("You have learned the spell " + merinv.stock[idx].desc + ".");
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
          PC.addGold(Math.floor(merinv.stock[idx].price/10));
        }
      }
    }
  }
}

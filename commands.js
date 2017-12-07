
"use strict";

function PerformCommand(code, ctrl) {
	var retval = {};
	retval["fin"] = 0;
	var confusion = PC.getSpellEffectsByName("Confused");
	if (confusion && (Math.random() > (confusion.getPower/100))) {
	  // PC is confused and loses their action because of it
	  retval["txt"] = "You are confused!";
	  retval["fin"] = 1;
	  if (Math.random() < .5) { 
	    // confused and randomly wandering
	    var dir = Dice.roll("1d4");
	    if (dir === 1) { PC.moveMe(0,-1,0); }
	    if (dir === 2) { PC.moveMe(1,0,0); }
	    if (dir === 3) { PC.moveMe(0,1,0); }
	    if (dir === 4) { PC.moveMe(-1,0,0); }
	  }
	  return retval;
	}
	// player has control, continue as normal
	if ((code === 38) || (code === 219)) {   // UP ARROW  or  [
		// move north
		var success = PC.moveMe(0,-1,0);
		var txt = "Move North";
		txt += success["msg"];
		retval["txt"] = txt;
		retval["input"] = "&gt;";
		retval["fin"] = 1;
    if (success["msg"].match("Blocked")) { 
      DUPlaySound("sfx_walk_blocked"); 
      retval["fin"] = 2; 
    }
    if (success["msg"].match("WHOOSH")) {
      retval["fin"] = 2;
    }
		retval["initdelay"] = success["initdelay"];
	}
	else if ((code === 37) || (code === 186)) {  // LEFT ARROW or ;
		// move west
		var success = PC.moveMe(-1,0,0);
		var txt = "Move West";
		txt += success["msg"];
		retval["txt"] = txt;
		retval["input"] = "&gt;";
		retval["fin"] = 1;
    if (success["msg"].match("Blocked")) { 
      DUPlaySound("sfx_walk_blocked"); 
      retval["fin"] = 2; 
    }
    if (success["msg"].match("WHOOSH")) {
      retval["fin"] = 2;
    }
		retval["initdelay"] = success["initdelay"];
	}
	else if ((code === 39) || (code === 222)) { // RIGHT ARROW or '
		// move east
		var success = PC.moveMe(1,0,0);
		var txt = "Move East";
		txt += success["msg"];
		retval["txt"] = txt;
		retval["input"] = "&gt;";
		retval["fin"] = 1;
    if (success["msg"].match("Blocked")) { 
      DUPlaySound("sfx_walk_blocked"); 
      retval["fin"] = 2; 
    }
    if (success["msg"].match("WHOOSH")) {
      retval["fin"] = 2;
    }
		retval["initdelay"] = success["initdelay"];
	}
	else if ((code === 40) || (code === 191)) { // DOWN ARROW or /
		// move south
		var success = PC.moveMe(0,1,0);
		var txt = "Move South";
		txt += success["msg"];
		retval["txt"] = txt;
		retval["input"] = "&gt;";
		retval["fin"] = 1;
    if (success["msg"].match("Blocked")) { 
      DUPlaySound("sfx_walk_blocked"); 
      retval["fin"] = 2; 
    }
    if (success["msg"].match("WHOOSH")) {
      retval["fin"] = 2;
    }
		retval["initdelay"] = success["initdelay"];
	}
	else if (code === 65) { // a
		// attack
		if (PC.getSpellEffectsByName("Fear")) {
		  retval["txt"] = "You are too afraid!";
		  retval["fin"] = 0;
		  retval["input"] = "&gt;";
		} else {
  	  var mapscale = PC.getHomeMap().getScale();
  		if (mapscale == '0') { // on a world map, attack is adjacent only
        gamestate.setMode("choosedir");
        retval["txt"] = "";
        retval["input"] = "&gt; Attack: ";
        retval["fin"] = 2;
        targetCursor.command = "a";
        targetCursor.x = PC.getx();
        targetCursor.y = PC.gety();		  
  		} else {  // on a 1:1 scale map, choose target
	  	  gamestate.setMode("target");
        var setcoords = 0;
        if (DU.gameflags.getFlag("sticky_target") && targetCursor.lastTarget) {
          if (targetCursor.lastTarget.getHomeMap() === PC.getHomeMap()) {
            if (IsVisibleOnScreen(targetCursor.lastTarget.getx(),targetCursor.lastTarget.gety())) {
              targetCursor.x = targetCursor.lastTarget.getx();
              targetCursor.y = targetCursor.lastTarget.gety();
              setcoords = 1;
            }
          }
        } 
        if (!setcoords) {
  		    targetCursor.x = PC.getx();
	  	    targetCursor.y = PC.gety();
	  	  }
  		  targetCursor.command = "a";
	  	  targetCursor.targetlimit = (viewsizex -1)/2;
		    targetCursor.targetCenterlimit = 0;
		    var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  		  targetCursor.tileid = tileid;
	  	  targetCursor.basetile = $(tileid).html();
		    $(tileid).html($(tileid).html() + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
		    retval["txt"] = "";
  		  retval["input"] = "&gt; Attack: ";
	  	  retval["fin"] = 2;
      }
    }
	}
	else if (code === 66) { // b
		// board - not used in Dark Unknown but available for hooking
		
	}
	else if (code === 67) { // c
		// cast
    retval = PerformCast(0);
	}
	else if (code === 68) { // d
		// descend - alternate "Enter" option when on a down ladder
		retval = PerformEnter("d");
	}
	else if (code === 69) { // e
		// enter
		retval = PerformEnter("e");
	}
  else if (code === 70) { // f
    // focus (since it isn't Fire)
		retval["txt"] = "Focus not hooked up yet.";
	}
	else if (code === 71) { // g
		// get 
		gamestate.setMode("choosedir");
		retval["txt"] = "";
		retval["input"] = "&gt; Get: ";
		retval["fin"] = 2;
		targetCursor.command = "g";
		targetCursor.x = PC.getx();
		targetCursor.y = PC.gety();		
	}
	else if (code === 72) { // h
		// hole up and camp, not used
		
	}
	else if (code === 73) { // i
		// was ignite torch, now infuse?
		if (PC.getKnowsInfusion()) {
      retval = PerformCast(1);
    } else {
      retval["fin"] = 2;
      retval["txt"] = "You have not yet learned the higher mysteries.";
    }
	}
	else if (code === 74) { // j
		// jimmy lock ?
		
	}
	else if (code === 75) { // k
		// klimb - alternate "Enter" option when on an up ladder
		retval = PerformEnter("k");
	}
	else if (code === 76) { // l
    // U4's Locate, here, Look
    if (ctrl) { 
      gamestate.setMode("choosesave");
      ShowSaveGames("Select a game to load:");
      retval["txt"] = "";
      retval["input"] = "&gt;";
      retval["fin"] = 2;
      targetCursor.command = "l";
    } else {
      gamestate.setMode("null");
      targetCursor.x = PC.getx();
      targetCursor.y = PC.gety();
      targetCursor.command = "l";
      targetCursor.targetlimit = (viewsizex -1)/2;
      targetCursor.targetCenterlimit = 0;
      var displaystats = getDisplayCenter(PC.getHomeMap(),targetCursor.x,targetCursor.y);
      var xcoord = targetCursor.x - displaystats.leftedge;
      var ycoord = targetCursor.y - displaystats.topedge;
      var tileid = "#mainview_" + xcoord + "x" + ycoord;
      targetCursor.tileid = tileid;
      targetCursor.basetile = $(tileid).html();
      $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
      retval["txt"] = "";
      retval["input"] = "&gt; Look: ";
      retval["fin"] = 2;
      gamestate.setMode("target");
    }
	}
	else if (code === 77) { // m
		// was mix - now, toggles music
    if (DU.gameflags.getFlag("music")) {
      DU.gameflags.setFlag("music", 0);
      StopMusic(nowplaying);
      retval["txt"] = "Music off.";
    } else {
      DU.gameflags.setFlag("music", 1);
      var song = PC.getHomeMap().getMusic();
      nowplaying = DUPlayMusic(song);
      retval["txt"] = "Music on.";
    }		
    retval["input"] = "&gt;";
    retval["fin"] = 2;
	}
	else if (code === 78) { // n
		// new order - not used
		
	}
	else if (code === 79) { // o
		// open (calls use if openable)
		// with ctrl, Options
    if (ctrl) {
  		gamestate.setMode("options");
      retval["txt"] = "";
      retval["input"] = "&gt; Options- ";
      retval["fin"] = 2;		
      targetCursor.page = 1;
      targetCursor.cmd = "o";
    
      DrawOptions();		
    } else {
   		gamestate.setMode("choosedir");
	  	retval["txt"] = "";
		  retval["input"] = "&gt; Open: ";
  		retval["fin"] = 2;
	  	targetCursor.command = "o";
		  targetCursor.x = PC.getx();
  		targetCursor.y = PC.gety();
    }
	}
	else if (code === 80) { // p
		// push
    if (!PC.getHomeMap().getScale()) {
      retval["txt"] = "Push: There is nothing to push here.";
      retval["input"] = "&gt;";
      retval["fin"] = 2;
      return retval;
    }

		gamestate.setMode("choosedir");
		retval["txt"] = "";
		retval["input"] = "&gt; Push- ";
		retval["fin"] = 2;

		targetCursor.command = "p";
		targetCursor.x = PC.getx();
		targetCursor.y = PC.gety();
	}
	else if (code === 81) { // q
    if (ctrl) { 
      gamestate.saveGame("external"); 
      retval["txt"] = "";
      retval["input"] = "&gt;";
      retval["fin"] = 0;
      gamestate.setMode("player");
    }
    else {
      gamestate.setMode("choosesave");
      ShowSaveGames("Select a slot to save in:");
      retval["txt"] = "";
      retval["input"] = "&gt;";
      retval["fin"] = 2;
      targetCursor.command = "q";
    }
	}
	else if (code === 82) { // r
    // Ready (contains functionality that used to be Wear/Weild)

    if (PC.getHomeMap().getName().indexOf("abyss") > -1) {
      retval["txt"] = "You cannot do that here.";
      retval["fin"] = 2;
      return retval;
    }

    gamestate.setMode("zstats");
    retval["txt"] = "";
    retval["input"] = "&gt; Ready- ";
    retval["fin"] = 2;	
    targetCursor.command = "r";			
    targetCursor.restrictTo = "equip";
    targetCursor.page = 2;
    
    DisplayInventory("equip");

	}
	else if (code === 83) { // s
    if (ctrl) { // output conversation log
      retval["input"] = "&gt;";
      retval["fin"] = 2;
	    var serialized = JSON.stringify(convlog);  
	    var savescreen = window.open('','savescreen');
  	  savescreen.document.write(serialized);
    } else {
  		gamestate.setMode("choosedir");
	  	retval["txt"] = "";
		  retval["input"] = "&gt; Search: ";
  		retval["fin"] = 2;
	  	targetCursor.command = "s";
		  targetCursor.x = PC.getx();
  		targetCursor.y = PC.gety();
  	}
	}
	else if (code === 84) { // t
    // talk
	  if (PC.getHomeMap().getScale() === '0') {
		  retval["txt"] = "No one to talk to.";
		  retval["fin"] = 2;
  	 return retval; 
	  }
    gamestate.setMode("target");
    targetCursor.x = PC.getx();
    targetCursor.y = PC.gety();
    targetCursor.command = "t";
    targetCursor.targetlimit = (viewsizex -1)/2;
    targetCursor.targetCenterlimit = 3;

    var edges = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
    var leftedge = targetCursor.x - edges.leftedge;
    var topedge = targetCursor.y - edges.topedge;

    var tileid = "#mainview_" + leftedge + "x" + topedge;
    targetCursor.tileid = tileid;
    targetCursor.basetile = $(tileid).html();
    $(tileid).html($(tileid).html() + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
    retval["txt"] = "";
    retval["input"] = "&gt; Talk: ";
    retval["fin"] = 2;
	}
	else if (code === 85) { // u
    // use
		gamestate.setMode("choosedir");
		retval["txt"] = "";
		retval["input"] = "&gt; Use: ";
		retval["fin"] = 2;
		targetCursor.command = "u";
		targetCursor.x = PC.getx();
		targetCursor.y = PC.gety();
	}
	else if (code === 86) { // v
		// volume - turns sound effects on and off
		if (DU.gameflags.getFlag("sound")) { 
		  DU.gameflags.setFlag("sound", 0); 
		  retval["txt"] = "Sound effects off.";
		}
		else { 
      DU.gameflags.setFlag("sound", 1); 
      retval["txt"] = "Sound effects on.";
    }
    retval["input"] = "&gt;";
    retval["fin"] = 2;
	}
	else if (code === 87) { // w
    // wait, was wear/wield
    var poisoned = PC.getSpellEffectsByName("Poison");
    if (poisoned) {
      retval["txt"] = "You are poisoned- waiting might be a bad idea.";
      retval["input"] = "&gt;";
      retval["fin"] = 2;
    }
    gamestate.setMode("anykey");
    targetCursor.command = 'w';
    retval['input'] = "Wait - how long? ";
    retval["fin"] = 2;
	}
	else if (code === 88) { // x
		// eXit - not used
	}
	else if (code === 89) { // y
		// yell 
		gamestate.setMode("talk");
		retval["txt"] = "";
		retval["input"] = "&gt; Yell: ";
		retval["fin"] = 2;
		inputText.cmd = "y";
		inputText.txt = "";
	}
	else if (code === 90) { // z
		// zstats
    gamestate.setMode("zstats");
    retval["txt"] = "";
    retval["input"] = "&gt; Zstats- ";
    retval["fin"] = 2;	
    targetCursor.command = "z";			
    targetCursor.page = 1;
    
    DrawStats(targetCursor.page);
	}
	else if ((code === 32) || (code === 13)) { // SPACE or ENTER
		// pass
		retval["txt"] = "Pass.";
		retval["input"] = "&gt;";
		retval["fin"] = 1;
	}
  else if (code === 27) {  // ESC
    retval = PerformEscape();
  }
	else {
		//alert(code);
	}
	
	return retval;
}

function PerformEscape() {
  var retval = {};
  retval["fin"] = 0;
  var pcmap = PC.getHomeMap();
  if (pcmap.getDesc() === "Combat") {
    var enemies = 0;
    var npcs = pcmap.npcs.getAll();
    $.each(npcs, function(idx,val) {
      if (val.getAttitude() === "hostile") { enemies = 1; }
    });
    if (enemies === 1) {
      return retval;
    } else {
      var newmap = new GameMap();
			if (maps.getMap(pcmap.getExitToMap())) {
			  DebugWrite("map", "destination map already exists.<br />");
				newmap = maps.getMap(pcmap.getExitToMap());
			} else {
			  DebugWrite("map", "destination map needs to be loaded.<br />");
			  newmap.loadMap(pcmap.getExitToMap());
		  	maps.addMapByRef(newmap);
	  	}
  		var tile = MoveBetweenMaps(PC,pcmap,newmap,pcmap.getExitToX(),pcmap.getExitToY());
 			if (tile) {
 			  DebugWrite("map", "Exited from MoveBetweenMaps. New map is " + newmap.getName() + ".<br />");
        retval["canmove"] = 0;
	    	DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
  		  DrawTopbarFrame("<p>" + newmap.getDesc() + "</p>");
 				maintext.addText(".<br />Exiting " + pcmap.getName() + ".");
 			} else {
			  DebugWrite("map", "Failed to exit due to exittest.");
  	    retval["canmove"] = 0;
  	    retval["diffx"] = diffx;
	      retval["diffy"] = diffy;
	      retval["txt"] = ": Failed!";
	      return retval;
			}
    }
  } 
  return retval;
}

function PerformChooseDir(code) {
	var retval = new Object;
	retval["fin"] = -1;
	if ((code === 38) || (code === 219)) {  // UP ARROW or [
		gamestate.setMode("null");
		targetCursor.y -= 1;
		retval["fin"] = 1;
	}
	else if ((code === 37) || (code ===186)) {  // LEFT ARROW or ;
		gamestate.setMode("null");
		targetCursor.x -= 1;
		retval["fin"] = 1;
	}
	else if ((code === 39) || (code === 222)) {  // RIGHT ARROW or '
		gamestate.setMode("null");
		targetCursor.x += 1;
		retval["fin"] = 1;
	}
	else if ((code === 40) || (code === 191)) {  // DOWN ARROW or /
		gamestate.setMode("null");
		targetCursor.y += 1;
		retval["fin"] = 1;
	}
	else if ((code === 32) || (code === 13)) {  // ENTER or SPACE
		gamestate.setMode("null");
		retval["fin"] = 1;
	}
	else if (code === 27) {  // ESC
		gamestate.setMode("null");
		retval["fin"] = 0;
		retval["txt"] = "";
		retval["input"] = "&gt;";
	}
	return retval;
}
function PerformTarget(code)  {
	var retval = {};
	retval["fin"] = -1;
	if ((code === 38) || (code === 219)) {   // UP ARROW  or  [
		gamestate.setMode("null");
		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		if ((edges.centery - targetCursor.y) < targetCursor.targetlimit) {
		  if ((!targetCursor.targetCenterlimit) || ((PC.y - targetCursor.y) < targetCursor.targetCenterlimit)) {
			  targetCursor.y -= 1;
			  retval["fin"] = 1;		
			}
		}
	}
	else if ((code === 37) || (code === 186)) {  // LEFT ARROW or ;
		gamestate.setMode("null");
		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		if ((edges.centerx - targetCursor.x) < targetCursor.targetlimit) {
		  if ((!targetCursor.targetCenterlimit) || ((PC.x - targetCursor.x) < targetCursor.targetCenterlimit)) {
			  targetCursor.x -= 1;
			  retval["fin"] = 1;
			}
		}
	}
	else if ((code === 39) || (code === 222)) { // RIGHT ARROW or '
		gamestate.setMode("null");
		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		if ((targetCursor.x - edges.centerx) < targetCursor.targetlimit) {
		  if ((!targetCursor.targetCenterlimit) || ((targetCursor.x - PC.x) < targetCursor.targetCenterlimit)) {
			  targetCursor.x += 1;
			  retval["fin"] = 1;
			}
		}
	}
	else if ((code === 40) || (code === 191)) { // DOWN ARROW or /
		gamestate.setMode("null");
		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		if ((targetCursor.y - edges.centery) < targetCursor.targetlimit) {
		  if ((!targetCursor.targetCenterlimit) || ((targetCursor.y - PC.y) < targetCursor.targetCenterlimit)) {
			  targetCursor.y += 1;
			  retval["fin"] = 1;
			}
		}
	}
	else if ((code === 32) || (code === 13) || (code === 65) || (code === 76) || (code === 84)) { // SPACE or ENTER or A, L, or T, since those commands use targeting
		gamestate.setMode("null");
		retval["fin"] = 2;
		delete targetCursor.targetlimit;
	}
	else if (code === 27) { // ESC
		gamestate.setMode("null");
		retval["fin"] = 0;
		retval["txt"] = "";
		retval["input"] = "&gt;";
		delete targetCursor.targetlimit;
	}
	
	return retval;
}

function PerformAttack(who) {
  var tileid = targetCursor.tileid;
	$(tileid).html(targetCursor.basetile);   

  var localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
  var atkwho = localacre.npcs.getTop();
  var retval = {};
  if ((targetCursor.x === PC.getx()) && (targetCursor.y === PC.gety())){ // No self-mutilation!
    retval["txt"] = "";
    retval["fin"] = 0;  
    retval["input"] = "&gt;";
    return retval;
  }  
  if (!atkwho) {  // nothing there
    var fea = localacre.features.getTop();
    if (fea && IsAdjacent(who,fea)) {
      if (fea.breakable) {
        retval = fea.break(who);
        return retval;
      }
    }
    retval["txt"] = "Attack: Nothing there!";
    retval["fin"] = 0;  
    retval["input"] = "&gt;";
    return retval;
  } else {
    targetCursor.lastTarget = atkwho;
  }
  retval = Attack(who, atkwho);
  return retval;
}

function PerformAttackMap(who) {
  var localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
  var atkwho = localacre.npcs.getTop();
  var retval = {};
  if (atkwho) { // there's something there!
    var combatmapname = GetCombatMap(who,atkwho);
    var newmap = new GameMap();
    newmap.loadMap(combatmapname);
    maps.addMapByRef(newmap);

    PC.getHomeMap().deleteThing(atkwho);
    var spawner=atkwho.getSpawnedBy();
    if (spawner) {
      spawner.deleteSpawned(atkwho);
    }

    var monsters = PlaceMonsters(newmap,atkwho,1);
    var desttile = MoveBetweenMaps(PC,PC.getHomeMap(),newmap, newmap.getEnterX(), newmap.getEnterY());
    
    DUTime.removeEntityFrom(atkwho);
    
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    retval["txt"] = "Attack: " + atkwho.getDesc() + ".";
    retval["fin"] = 0;
    retval["input"] = "&gt;";
    // as if retval = 1, but set to PC turn

  } else {
    retval["txt"] = "There is nothing to attack there.";
    retval["fin"] = 0;
    retval["input"] = "&gt;";
  }  
  return retval;
}

function PerformCast(infuse) {
  gamestate.setMode("spellbook");
  delete targetCursor.castFrom;
  PC.setInfusion(infuse);
  var hasSpellbook = 0;
  var retval = {};
  for (var lvl = 1; lvl <= 8; lvl++) {
    if (hasSpellbook) { break; }
    for (var i=1; i <= 8; i++) {
      var spellnum = GetSpellID(i);
      if (PC.knowsSpell(lvl, spellnum)) { 
        hasSpellbook = 1; 
        break;
      }
    }
  }
  if (!hasSpellbook) {
    retval["txt"] = "You have no spellbook!";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
    gamestate.setMode("player");
    
    return retval;
  }
  
  var castermap = PC.getHomeMap();
  if (DU.gameflags.getFlag("negate")[castermap.getName()]) {
    retval["txt"] = "Cast - Magic has been negated, you cannot cast spells here.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
    gamestate.setMode("player");
    
    return retval;
  }
  var myOpen=function(hash){ hash.w.css('opacity',0.95).show(); };
  $('#spellbookdiv').jqm({onShow:myOpen,modal:true}); 
  $('#spellbookdiv').jqmShow();
  WritePages();
  
  retval["fin"] = 2;
  retval["input"] = "&gt; Cast - "
  return retval;

}

function PerformSpellbook(code) {
  var retval = {};
  if ((code === 38) || (code === 219)) { // up
    var lvl = PC.getLastSpellLevel();
    var spell = PC.getLastSpell();
    spell--;
    while (spell > 0) {
      if (PC.knowsSpell(lvl,GetSpellID(spell))) {
        HighlightSpell(lvl,spell);
        PC.setLastSpell(spell);
        WriteSpellDesc();
        spell = 0;
      } else { 
        spell--;
      }
    }
    retval["fin"] = 0;
    return retval;
  }

  if ((code === 40) || (code === 191)) { // down
    var lvl = PC.getLastSpellLevel();
    var spell = PC.getLastSpell();
    spell++;
    while (spell < 9) {
      if (PC.knowsSpell(lvl,GetSpellID(spell))) {
        HighlightSpell(lvl,spell);
        PC.setLastSpell(spell);
        WriteSpellDesc();
        spell = 9;
      } else { 
        spell++;
      }
    }
    retval["fin"] = 0;
    return retval;
  }
  
  if ((code === 37) || (code === 186) || (code === 39) || (code === 222)) { // left or right
    var lvl = PC.getLastSpellLevel();
    var spell = PC.getLastSpell();
    var newlvl = lvl;
    if ((code === 37) || (code === 186)) { // left
      if (lvl > 1) { newlvl = lvl - 1; }
    }
    if ((code === 39) || (code === 222)) { // right
      if (lvl < 8) { newlvl = lvl + 1; }
    }
    // figure out how many spells down we are
    var spellsdown = 0;
    if (!spell) {
      spell = 1;
    }
    for (var i=1; i<=spell; i++) {
      if (PC.knowsSpell(lvl, GetSpellID(i))) { spellsdown++; }
    }
    var spindex = 0;
    var numspells = 0;
    for (var i=1; i<=8; i++) {
      if (PC.knowsSpell(newlvl,GetSpellID(i))) {
        numspells++;
        if (numspells === spellsdown) {
          spindex = i;
        }
      }
    }
    PC.setLastSpellLevel(newlvl);
    PC.setLastSpell(spindex);
    WritePages();

    retval["fin"] = 0;
    return retval;    
  }
  if ((code === 32) || (code === 13)) { // SPACE or ENTER
    // cast a spell
    var lvl = PC.getLastSpellLevel();
    if ((lvl > 5) && (PC.getInfusion())) {
      var retval = {};
      retval["fin"] = 2;
      retval["input"] = "&gt;";
      maintext.addText("Cannot infuse spells of level 6 or higher.");
      return retval;
    }
    var spellnum = PC.getLastSpell();
    $('#spellbookdiv').jqmHide();
    var spelltxt = "Cast: " + magic[lvl][GetSpellID(spellnum)].getName();
    if (PC.getInfusion()) {
      spelltxt += " (Infused)";
    }
    var manacost = magic[lvl][GetSpellID(spellnum)].getManaCost(PC.getInfusion());
    if (lvl > PC.getLevel()) {
      spelltxt += "...";
      maintext.addText(spelltxt);
      maintext.addText("That spell's power is beyond you.");
      var retval = {};
      retval["fin"] = 2;
      retval["input"] = "&gt;";
      return retval;
    }      
    if (lvl > PC.getInt()*3) {
      spelltxt += "...";
      maintext.addText(spelltxt);
      maintext.addText("Your intelligence is insufficient to cast that spell.");
      var retval = {};
      retval["fin"] = 2;
      retval["input"] = "&gt;";
      return retval;      
    }
    if (PC.getMana() >= manacost) {
      spelltxt += "!";
      maintext.addText(spelltxt);
      var retval = magic[lvl][GetSpellID(spellnum)].executeSpell(PC, PC.getInfusion(), 0);
      DrawCharFrame();
      return retval;
    }
    else {
      spelltxt += "...";
      maintext.addText(spelltxt);
      maintext.addText("Not enough mana.");
      var retval = {};
      retval["fin"] = 2;
      retval["input"] = "&gt;";
      return retval;
    }
  } else {
    retval["fin"] = 0;
    return retval;  
  }
}

function PerformLook() {
	var txt = "";
  var seethis = "";
  var map = PC.getHomeMap();
  var boundaries = getDisplayCenter(map,PC.getx(),PC.gety());
  var xcoord = targetCursor.x - boundaries.leftedge;
  var ycoord = targetCursor.y - boundaries.topedge;
  var onscreen = $('#mainview_' + xcoord + 'x' + ycoord).html();
  var losval = 0;
  if (onscreen.indexOf("You cannot see that") !== -1) { losval = 1; }
  else {
    var tile = map.getTile(targetCursor.x,targetCursor.y);
    var light = tile.getLocalLight();
    light += map.getAmbientLight();
    if (light < SHADOW_THRESHOLD) {
      losval = 1;
    }
  }

  if (losval >= LOS_THRESHOLD) { 
  	var retval = {};
  	retval["txt"] = "You cannot see that.";
  	retval["fin"] = 2;
  	retval["input"] = "&gt;";
 	  var tileid = targetCursor.tileid;
	  $(tileid).html(targetCursor.basetile); 

  	return retval;
  }
  var tile = map.getTile(targetCursor.x,targetCursor.y);
  if ((targetCursor.x === PC.getx())	&& (targetCursor.y === PC.gety())) {
  	txt = "You are standing on ";
  } else {
  	txt = "You see ";
  }
  var top = tile.getTop();
  while (top.getName() === "SeeBelow") {
    tile = FindBelow(targetCursor.x,targetCursor.y,map);
    top = tile.getTop();
  }
  var npcs = tile.getNPCs();
  if (npcs.length > 0) {
  	for (var i=(npcs.length-1) ; i >= 0; i-- ) {
  		if (seethis == "") { seethis = npcs[i].getFullDesc(); }
  		else { seethis += ", " + npcs[i].getFullDesc(); }
  	}
  }
  var features = tile.getFeatures();
  var len = features.length;
  if (len > 0) {
  	for (var i=(len-1); i >= 0; i-- ) {
  	  if (features[i].invisible) {
  	    len--;
  	  } else {
      	if (( seethis == "" ) && (i === len-1)) {
      		seethis = features[i].getFullDesc();
      		if (features[i].searched) {
      		  seethis = seethis + " [Searched]";
      		}
  	   	}
  	    else if ( typeof features[i].isItem === "function" ) {
  		    if (seethis == "") { seethis = features[i].getFullDesc(); }
 	    		else { seethis += ", " + features[i].getFullDesc(); }
 		    }
 		  }
  	}
  }
  if (seethis == "") {
  	var terrain = tile.getTerrain();
  	seethis = terrain.getPrefix() + " " + terrain.getDesc();
  }
  if (seethis == "") { alert("How are we here? command."); }
  
  txt += seethis + ".";
  var tileid = targetCursor.tileid;
  $(tileid).html(targetCursor.basetile); 
  
  var retval = {};
  retval["txt"] = txt;
  retval["fin"] = 2;
  retval["input"] = "&gt;";
  
  return retval;
}

function PerformEnter(cmd) {
  var oldmap = PC.getHomeMap();
		var here = oldmap.getTile(PC.getx(),PC.gety());
		var features = here.getFeatures();
		var destination;
		var destx;
		var desty;
		var klimb = "";
		var descend = "";
		var retval = {};
		if (features.length > 0) {
			for (var i = 0; i < features.length; i++) {
				if ((typeof features[i].getEnterMap === "function") && (features[i].getEnterMap())) {
					var mapdata = features[i].getEnterMap();
					destination = mapdata["entermap"];
					destx = mapdata["enterx"];
					desty = mapdata["entery"];
					if (typeof features[i].getKlimb === "function") {
						klimb = features[i].getKlimb();
					}
					if (typeof features[i].getDescend === "function") {
						descend = features[i].getDescend();
					}
				}
			}
		}
		if (!destination) {
			retval["fin"] = 2;
			if (cmd === "e") {
				retval["txt"] = "You cannot enter that.";
			} else if ((cmd === "k") || (cmd === "d")) {
				retval["txt"] = "You cannot climb that."; 
			} else {
				alert("How did you get here (in PerformEnter)");
			}
				
			retval["input"] = "&gt;";
		} else if (destination === "null") {
			retval["fin"] = 2;
			retval["txt"] = "Destination map does not exist.";
			retval["input"] = "&gt;";
		} else if (!mappages[destination]) {
			retval["fin"] = 2;
			retval["txt"] = "Destination map does not exist.";
			retval["input"] = "&gt;";
		} else if ((cmd === "d") && (descend == "")) {
			retval["fin"] = 2;
			retval["txt"] = "You cannot descend that.";
		} else if ((cmd === "k") && (descend == "") && (klimb == "")) {
			retval["fin"] = 2;
			retval["txt"] = "You cannot climb that.";
		} else {
			retval["fin"] = 1;
			var newmap = new GameMap();
			if (maps.getMap(destination)) {
				newmap = maps.getMap(destination);
			} else {
				newmap.loadMap(destination);
				maps.addMapByRef(newmap);
			}
			// check for someone in the way at destination
			if ($.inArray(newmap.getName(), oldmap.linkedMaps) != -1) {
			  var desttile = newmap.getTile(destx,desty);
			  if (desttile.getTopNPC()) { // there's someone in the way and it's a linked map
			    retval["fin"] = 2;
			    retval["txt"] = "There is something in the way!";
			    retval["input"] = "&gt;";
			    return retval;
			  }
			} else {
			  var desttile = newmap.getTile(destx,desty);
			  if (desttile.getTopNPC()) { // there's someone in the way and it's not a linked map
          var npcs = desttile.getNPCs();
          while (npcs.length) {
            PushOff(desttile.getTopNPC());
            npcs = desttile.getNPCs();
          }
        }
      }			  
      var tile = MoveBetweenMaps(PC,PC.getHomeMap(),newmap, destx, desty);
      AdjustStartingLocations(newmap);
			retval["txt"] = "Entering " + newmap.getDesc() + ".";
			if (descend != "") {
				retval["txt"] = descend;
			} else if (klimb != "") {
				retval["txt"] = klimb;
			}
			DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
			DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
			
		}
		return retval;
}

function PerformGet(who) {
  var localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
  var getitem = localacre.features.getTop();
  var retval = {};
  if (!getitem) {
    retval["txt"] = "There is nothing there.";
    retval["fin"] = 0;
    return retval;    
  } 
  else if (getitem.checkType("Item")) {
    var itemmap = getitem.getHomeMap();
    who.addToInventory(getitem);
    if (typeof getitem.onGet === "function") {
      getitem.onGet(who);
    }
    retval["txt"] = "Taken: " + getitem.getPrefix() + " " + getitem.getDesc() + ".";
    retval["fin"] = 1;
    if (itemmap === PC.getHomeMap()) {
      DrawMainFrame("one",itemmap,targetCursor.x,targetCursor.y);
      DrawCharFrame();
    }
    return retval;    
  } 
  else {
    retval["txt"] = "You can't get that.";
    retval["fin"] = 0;
    return retval;
  }
}

function PerformEquip(code) {
  var retval = {};
  if (code === 27) { // ESC
    retval["fin"] = 0;
    delete targetCursor.itemlist;
    $('#uiinterface').html("");
    $("#uiinterface").css("background-color", "");

  }
	else if ((code === 38) || (code === 219)) {   // UP ARROW  or  [
	    $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrolllocation--;
	    if (targetCursor.scrolllocation < 0) { targetCursor.scrolllocation = targetCursor.itemlist.length-1; }
	    $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrollapi.scrollToElement('#inv' + targetCursor.scrolllocation);
	    retval["fin"] = 2;
	}
  else if ((code === 40) || (code === 191)) { // DOWN ARROW or /
      $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrolllocation++;
	    if (targetCursor.scrolllocation > targetCursor.itemlist.length-1) { targetCursor.scrolllocation = 0; }
	    $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrollapi.scrollToElement('#inv' + targetCursor.scrolllocation);
	    retval["fin"] = 2;
  }
	else if ((code === 32) || (code === 13)) { // SPACE or ENTER
    // equip selected item
    var newequip = targetCursor.itemlist[targetCursor.scrolllocation];
    if (newequip.breakable && newequip.getBroken()) {
      retval["fin"] = 1;
      retval["txt"] = "That is broken and cannot be equipped.";
      return retval;
    }
    var success = newequip.equipMe(PC);
    retval["fin"] = 1;
    retval["txt"] = "";
    if (newequip.checkType("Armor")) { 
      if (success) { retval["txt"] = "Wear: "; }
      else { retval["txt"] = "You are not strong enough to wear that."; return retval; }
    }
    else { 
      if (success) { retval["txt"] = "Wield: "; }
      else { retval["txt"] = "You are not agile enough to equip that."; return retval; }
    }
    if (newequip.getPrefix()) { retval["txt"] = retval["txt"] + newequip.getPrefix(); }
    retval["txt"] = retval["txt"] + " " + newequip.getDesc() + ".";
  }
  $('#uiinterface').html("");
  $("#uiinterface").css("background-color", "");

  return retval;
 
}

function PerformPush(who) {
  var retval = {};
  retval["fin"] = 3;
  retval["input"] = "&gt;";
  var localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
  var blocker = localacre.getTopNPC();
  if (!blocker) { blocker = localacre.getTopPC(); }
  if (blocker) {
    blocker.pushed = 1;
    retval["txt"] = "Push: There is something in the way.";
    return retval;
  }
  var pushit = localacre.features.getTop();
  if (!pushit) { 
    retval["txt"] = "Push: Nothing there.";
    return retval; 
  }
  if (pushit.pushable) {
    return pushit.pushMe(who);
  }
  var retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "That won't budge!";
  
  return retval;
}

function PerformSearch(who) {
  var localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
  var searched = localacre.features.getTop();
  var retval = {};
  retval["fin"] = 1;
  if (!searched) {
		retval["txt"] = "Search: There is nothing there.";
		retval["fin"] = 0;
		return retval;
	}
	if (searched.isContainer) {  // add doors to the list
	  // search for traps and such rather than searching for items
	  if (searched.trapped && (who.getInt() >= searched.trapchallenge-5)) {
	    var descriptor = "complex ";
	    if (who.getDex() >= searched.trapchallenge+6) { // 80% chance to disarm
	      descriptor = "simple ";
	    } else if (who.getDex() <= searched.trapchallenge-6) { // 20% chance or worse
	      descriptor = "challenging ";
	    }
	    retval["txt"] = "Search: You find a " + descriptor + "trap!";
	    searched.setDesc(searched.getDesc() + " [Trap (" + descriptor + ")]");
//	    searched.trapchallenge = Math.floor(searched.trapchallenge / 2);
      searched.trapchallenge = searched.trapchallenge - 5;
	    // finding a trap reduces the challenge of removing it
	  } else {
	    retval["txt"] = "Search: You find nothing there.";
	    searched.searched = 1;
	  }
	  return retval;
	}
  else if ((searched.getSearchYield().length)) {
    var stuff = searched.getSearchYield();
    if (searched.getLootedID() && DU.gameflags.getFlag("lid_" + searched.getLootedID())) {
      retval["txt"] = "Search: You find nothing there.";
      stuff = 0;
    }
    else if (searched.getLootedID()) {
      DU.gameflags.setFlag("lid_" + searched.getLootedID(),1);
    }

    if (searched.getShowSearched()) {
      searched.searched = 1;
    }
    if (stuff) {
      retval["txt"] = "Search: You find ";
      retval["fin"] = 1;
      if (stuff.length) {
        for (var i=0; i < stuff.length; i++) {
          var newthing = localFactory.createTile(stuff[i]);
          if (stuff[i] === "Gold") {
            newthing.setQuantity(searched.getGold());
          }
          who.getHomeMap().placeThing(targetCursor.x,targetCursor.y,newthing);
          if (i) {
            retval["txt"] += ", ";
          }
          if (newthing.getPrefix()) {
            retval["txt"] += " " + newthing.getPrefix();
          }
          retval["txt"] += " " + newthing.getDesc();
        }
      }
      var blanksearch = [];
      searched.setSearchYield(blanksearch);
      retval["txt"] += ".";
    }
    if (searched.getSearchedGraphic()) {
      searched.setGraphicArray(searched.getSearchedGraphic());
    }
    DrawMainFrame("one",who.getHomeMap(),targetCursor.x,targetCursor.y);
  } else if (searched.getSearchDesc()) {
    retval["txt"] = "You see: " + searched.getSearchPrefix() + " " + searched.getSearchDesc() + ".";
    retval["fin"] = 1;
    searched.setDesc(searched.getSearchDesc());
  }  else {
    if (searched.getShowSearched()) {
      searched.searched = 1;
    }
    retval["txt"] = "Search: You find nothing there.";
    retval["fin"] = 1;
    if (searched.getSearchedGraphic()) {
      searched.setGraphicArray(searched.getSearchedGraphic());
      DrawMainFrame("one",who.getHomeMap(),targetCursor.x,targetCursor.y);
    }

  }
  if (searched.searchid) {
    DU.gameflags.setFlag(searched.searchedid, 1);
  }
  if (searched.getSearchDelete()) {
    searched.getHomeMap().deleteThing(searched);
    DrawMainFrame("one",who.getHomeMap(),targetCursor.x,targetCursor.y);
  }
  return retval;
}

function PerformTalkTarget() {
  var tileid = targetCursor.tileid;
  $(tileid).html(targetCursor.basetile); 
  var map = PC.getHomeMap();
  var onscreen = $('#tile' + targetCursor.x + 'x' + targetCursor.y).html();
//  alert(onscreen);
  var losval = 0;
  if (onscreen.indexOf("You cannot see that") !== -1) { losval = 1; }
  else {
    var tile = map.getTile(targetCursor.x,targetCursor.y);
    var light = tile.getLocalLight();
    light += map.getAmbientLight();
    if (light < SHADOW_THRESHOLD) {
      losval = 1;
    }
  }

  if (losval >= LOS_THRESHOLD) { 
  	var retval = {};
  	retval["txt"] = "You cannot see that.";
  	retval["fin"] = 2;
  	retval["input"] = "&gt;";
 	  var tileid = targetCursor.tileid;
	  $(tileid).html(targetCursor.basetile); 

  	return retval;
  }
  var tile = map.getTile(targetCursor.x,targetCursor.y);
  if ((targetCursor.x === PC.getx())	&& (targetCursor.y === PC.gety())) {
    var retval = {};
    retval["txt"] = "This is no time to be talking to yourself.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";

    return retval;
  } 
  var top = tile.getTop();
  while (top.getName() === "SeeBelow") {
    tile = FindBelow(targetCursor.x,targetCursor.y,map);
    top = tile.getTop();
  }
  
  
  var retval = {};
  if (!top.checkType("NPC")) {
  
    retval["txt"] = "There is no one there to talk to.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
  
    return retval;
  }
  if (top.getAttitude() !== "friendly") {
    var pronoun = top.getGenderedTerms().pronoun;
    pronoun = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
    retval["txt"] = pronoun + " does not want to talk to you.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
  
    return retval;    
  }
  if (top.getConversationFlag()) {
    if (DU.gameflags.getFlag(top.getConversationFlag())) {
      top.setConversationFlagged();
    }
  }

  var convo = top.getConversation();
  if (!convo || !conversations[convo]) {
    retval["txt"] = "No one there wishes to speak with you.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
    
    return retval;
  }

  maintext.addText("Talk to: " + top.getDesc());

  if (EarnedLevel(PC) && (top.getName() === "KingNPC") && DU.gameflags.getFlag("kingspeech")) {
    if ((PC.getLevel() < 4) || (PC.runes.kings)) {
      maintext.addText('<span class="conv">"Hail, ' + PC.getPCName() + '! I am well pleased with your progress. Seek Nyrani and Jharden for further training."</span>');
      PC.setLevel(PC.getLevel()+1);
      PC.setMaxHP(PC.getLevel()*30);
      PC.setHP(PC.getMaxHP());
      var effects = PC.getSpellEffects();
      if (effects) {
        for (var i=0; i<effects.length; i++) {
          if (effects[i].getName() === "Poison") {
            effects[i].endEffect();
          }
          if (effects[i].getName() === "Disease") {
            effects[i].endEffect();
          }
        }
      }
      if (PC.getLevel() === 2) { 
        var basement = maps.getMap("olympus0");
        var allnpcs = basement.npcs.getAll();
        var rose;
        for (var i=0; i< allnpcs.length; i++) {
          if (allnpcs[i].getNPCName() === "Rose") {
            rose = allnpcs[i];
          }
        }
        if (rose) {
          basement.moveThing(24,13,rose);
        } else {
          alert("Can't find Rose!");
        }
      }
      PC.settp(PC.gettp()+TP_PER_LEVEL);
      DU.gameflags.setFlag("can_train", 1);
      if (DU.gameflags.getFlag("spellbook")) {
        maintext.addText('<span class="conv">"In addition, Jharden may have more to teach you of magic!"</span>');
      }
      DU.gameflags.setFlag("jharden_newspell",1);
      if ((PC.getLevel() > 2) && (PC.getLevel() < 6)) {
        DU.gameflags.setFlag("ash_newspell",1);
      }
      maintext.addText(PC.getPCName() + " is now level " + PC.getLevel() + "!");
      DU.gameflags.setFlag("lvl"+PC.getLevel(),1);
      if (PC.getLevel() === 2) {
        maintext.addText("<span class='conv'>\"Oh, and another thing! We have captured a rebel instigator and are holding her in our <span style='color:cyan'>prison</span>. I charge you with seeing what information you can get from her!\"</span>");
      }
      DrawCharFrame();
      retval = PerformTalk(top, convo, "_level");
    } else {
      maintext.addText('<span class="conv">"Hail, ' + PC.getPCName() + '! You have made great progress, but you cannot advance without the =Rune=!."</span>');
      retval = PerformTalk(top, convo, "_level");
    }
  } else {
    retval = PerformTalk(top, convo, "_start");
  }
		
  return retval;

}

function PerformTalk(talkto, convo, topic) {
  var forlog = {NPC: talkto.getNPCName(), conversation: convo, keyword: topic, timestamp: DUTime.getGameClock()};
  convlog.push(forlog);
  
  var retval = {};
  var conval = conversations[convo].respond(talkto, topic);
  
  if (conval) {
    retval["txt"] = "";
    retval["fin"] = 3;
  } else {
    // person spoke and ended conversation
//    var gender = talkto.getGenderedTerms().pronoun;
//    gender = gender.charAt(0).toUpperCase() + gender.slice(1);
    retval["txt"] = "";
    retval["fin"] = 1;
    retval["input"] = "&gt;";
    return retval;
  }
  
  if (conval === 2) {
    retval["input"] = "[MORE]";
    gamestate.setMode("anykey");
  } else if (conval === 3) {
    retval["input"] = "Buy what: ";
    gamestate.setMode("buy");
  } else if (conval === 4) {
    // Add check for having stuff to sell?
    retval["input"] = "Sell what: ";
    gamestate.setMode("sell");
  } else if (conval === -1) {
    gamestate.setMode("null");
  } else {
    if (inputText.subcmd === "yn") {
      retval["input"] = "You answer (y/n):";
    } else {
      retval["input"] = "You say: ";
    }
    gamestate.setMode("talk");
  }
  
  targetCursor.talkingto = talkto;
  targetCursor.command ="t";
  targetCursor.conval = conval;   // 2 == in-midsentence, 3 or 4 == merchanting
  
  inputText.cmd = "t";
  inputText.txt = "";
		
  return retval;  
}

function PerformUse(who) {
  var retval = {};
  var usemap = who.getHomeMap();
	var localacre = usemap.getTile(targetCursor.x,targetCursor.y);
	var someone = localacre.getTopNPC();
	if (!someone) { someone = localacre.getTopPC(); }
	if (someone) {
    var commandname = "Use";
    if (targetCursor.command === "o") { commandname = "Open"; }
    retval["txt"] = commandname + ": There is something in the way.";
    retval["fin"] = 0;
    return retval;
  }
	var used = localacre.features.getTop();
	if (!used) {
		retval["txt"] = "There is nothing to use there.";
    if (targetCursor.command === "o") {
      retval["txt"] = "There is nothing you can open there."; 
    }
		retval["fin"] = 0;
		return retval;
	}
  if (targetCursor.command === "u") {
  	if (typeof used.use === "function") {
	    retval = MakeUseHappen(who,used,"map");
    } else {
	  	retval["txt"] = "There is nothing to use there.";
		  retval["fin"] = 0;
  	}
  } else if (targetCursor.command === "o") {
    if ((typeof used.use === "function") && (CheckOpenAsUse(used))) {
      retval = MakeUseHappen(who,used,"map");
    } else {
      retval["txt"] = "There is nothing you can open there.";
      retval["fin"] = 0;
    }
  }
	return retval;
}

function PerformUseFromInventory() {

  if (PC.getHomeMap().getName().indexOf("abyss") > -1) {
    retval["txt"] = "You cannot do that here.";
    retval["fin"] = 2;
    return retval;
  }

  gamestate.setMode("zstats");
  var retval = {};
	retval["txt"] = "";
  if (targetCursor.command === "u") {
    retval["input"] = "&gt; Use: ";
  } else if (targetCursor.command === "o") {
    retval["input"] = "&gt; Open: "; 
  }
  retval["fin"] = 2;

  targetCursor.restrictTo = "usable";
  targetCursor.page = 2;
  
  DisplayInventory("usable");

}

function _OldPerformUseFromInventory() {
		gamestate.setMode("equip");
		var retval = {};
		retval["txt"] = "";
    if (targetCursor.command === "u") {
  		retval["input"] = "&gt; Use: ";
    } else if (targetCursor.command === "o") {
      retval["input"] = "&gt; Open: "; 
    }
		retval["fin"] = 2;
		
   var statsdiv = "&nbsp;";
   statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
   statsdiv += "<table cellpadding='0' cellspacing='0' border='0'>";
   statsdiv += "<tr><td>&nbsp;&nbsp;</td><td>&nbsp;</td><td></td></tr>";
   var inv = PC.getInventory();
   var pots = [];
   var scrolls = [];
   var other = [];
   var iter = 0;
   var itemarray = [];
   if (inv.length) {
     for (var i = 0; i < inv.length; i++) {
       if ((inv[i].checkType("Consumable")) && (!inv[i].checkType("Potion")) && (!inv[i].checkType("Scroll"))) { other[other.length] = inv[i]; }
       else if (inv[i].checkType("Potion")) { pots[pots.length] = inv[i]; }
       else if (inv[i].checkType("Scroll")) { scrolls[scrolls.length] = inv[i];}
       else if (typeof inv[i].use === "function")  { other[other.length] = inv[i]; }
     }
     if (pots.length) {
       pots.sort(function(a,b) {
        var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
        if (nameA < nameB) 
          return -1
        if (nameA > nameB)
          return 1
        return 0 
       }); 
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Potions</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</span></td></tr>";
       for (var i = 0; i < pots.length; i++ ) {
         var itemdesc = pots[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         statsdiv += "<tr id='inv" + iter + "'><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + pots[i].getQuantity() + ")</td></tr>";
         itemarray[iter] = pots[i];
         iter++;
       }
       statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";
     }
     if (scrolls.length) {
       scrolls.sort(function(a,b) {
        var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
        if (nameA < nameB) 
          return -1
        if (nameA > nameB)
          return 1
       return 0 
       }); 
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Scrolls</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</span></td></tr>";
       for (var i = 0; i < scrolls.length; i++ ) {
         var itemdesc = scrolls[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         statsdiv += "<tr id='inv" + iter + "'><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + scrolls[i].getQuantity() + ")</td></tr>";
         itemarray[iter] = scrolls[i];
         iter++;
       }
       statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";      
     }
     if (other.length) {
       other.sort(function(a,b) {
        var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
        if (nameA < nameB) 
          return -1
        if (nameA > nameB)
          return 1
       return 0 
       }); 
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Other</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</span></td></tr>";
       for (var i = 0; i < other.length; i++ ) {
         var itemdesc = other[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         statsdiv += "<tr id='inv" + iter + "'><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + other[i].getQuantity() + ")</td></tr>";
         itemarray[iter] = other[i];
         iter++;
       }
       statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";
     }
     if ((PC.runes.kings || PC.runes.waves || PC.runes.winds || PC.runes.flames || PC.runes.void) && (targetCursor.command === "u")) {  // in theory, kings is required for the rest, but let's be sure
      // only show if Use rather than Open
       var rune;
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Runes</span></td><td>&nbsp;</td></tr>";
       if (PC.runes.kings) {
         if (PC.getRuneCooldown("kings") < DUTime.getGameClock()) {
           rune = localFactory.createTile("MarkOfKings");
           statsdiv += "<tr id='inv" + iter + "'><td></td><td>The " + rune.getDesc() + "</td><td>&nbsp;</td></tr>";
           itemarray[iter] = rune;
           iter++;
         } else {
           rune = localFactory.createTile("MarkOfKings");
           statsdiv += "<tr class='runecooldown'><td></td><td>The " + rune.getDesc() + "</td><td>&nbsp;</td></tr>";
         }
       }
       if (PC.runes.waves) {
         if (PC.getRuneCooldown("waves") < DUTime.getGameClock()) {
           rune = localFactory.createTile("MarkOfWaves");
           statsdiv += "<tr id='inv" + iter + "'><td></td><td>The " + rune.getDesc() + "</td><td>&nbsp;</td></tr>";
           itemarray[iter] = rune;
           iter++;
         } else { 
           rune = localFactory.createTile("MarkOfWaves");
           statsdiv += "<tr class='runecooldown'><td></td><td>The " + rune.getDesc() + "</td><td>&nbsp;</td></tr>";
         }
       }
       if (PC.runes.winds) {
         if (PC.getRuneCooldown("winds") < DUTime.getGameClock()) {
           rune = localFactory.createTile("MarkOfWinds");
           statsdiv += "<tr id='inv" + iter + "'><td></td><td>The " + rune.getDesc() + "</td><td>&nbsp;</td></tr>";
           itemarray[iter] = rune;
           iter++;
         } else {
           rune = localFactory.createTile("MarkOfWinds");
           statsdiv += "<tr class='runecooldown'><td></td><td>The " + rune.getDesc() + "</td><td>&nbsp;</td></tr>";
         }
       }
       if (PC.runes.flames) {
         if (PC.getRuneCooldown("flames") < DUTime.getGameClock()) {
           rune = localFactory.createTile("MarkOfFlames");
           statsdiv += "<tr id='inv" + iter + "'><td></td><td>The " + rune.getDesc() + "</td><td>&nbsp;</td></tr>";
           itemarray[iter] = rune;
           iter++;
         } else {
           rune = localFactory.createTile("MarkOfFlames");
           statsdiv += "<tr class='runecooldown'><td></td><td>The " + rune.getDesc() + "</td><td>&nbsp;</td></tr>";
         }
       }
        
         statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";
     }

   }

   if (itemarray.length === 0) {
    statsdiv += "<tr><td></td><td>You have no usable items.</td></tr>";
   }
   statsdiv += "<td></td></tr>";
  
   statsdiv += "</table></div></div>";
   DrawTopbarFrame("<p>Use Which:</p>");
   $("#worldlayer").html("<img src='graphics/spacer.gif' width='416' height='416' />");
   $("#worldlayer").css("background-image", "");
   $("#worldlayer").css("background-color", "black");
   
   $('#displayframe').html(statsdiv);
   
	var scrollelem = $('.zstats').jScrollPane();
  var scrollapi = scrollelem.data('jsp');
  targetCursor.scrollapi = scrollapi;
  targetCursor.scrolllocation = 0;
  targetCursor.itemlist = [];
  targetCursor.itemlist = itemarray;
  
  $('#inv0').toggleClass('highlight');
  return retval;
		
}

function PerformUseFromInventoryState(code) {
  var retval = {};
  if (targetCursor.itemlist.length === 0) {
    code = 27;
  }
  if (code === 27) { // ESC
    retval["fin"] = 0;
    delete targetCursor.itemlist;
  }
	else if ((code === 38) || (code === 219)) {   // UP ARROW  or  [
	    $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrolllocation--;
	    if (targetCursor.scrolllocation < 0) { targetCursor.scrolllocation = targetCursor.itemlist.length-1; }
	    $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrollapi.scrollToElement('#inv' + targetCursor.scrolllocation);
	    retval["fin"] = -2;
	}
  else if ((code === 40) || (code === 191)) { // DOWN ARROW or /
      $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrolllocation++;
	    if (targetCursor.scrolllocation > targetCursor.itemlist.length-1) { targetCursor.scrolllocation = 0; }
	    $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrollapi.scrollToElement('#inv' + targetCursor.scrolllocation);
	    retval["fin"] = -2;
  }
	else if ((code === 32) || (code === 13)) { // SPACE or ENTER
    var used = targetCursor.itemlist[targetCursor.scrolllocation];
    if (targetCursor.command === "o") {
      if (!CheckOpenAsUse(used)) {
        maintext.delayedAddText("You cannot open that.");
        retval["fin"] = 0;
        delete targetCursor.itemlist;
        return retval;
      }
    }
    // use selected item
    if (used) {
      retval = MakeUseHappen(PC,used,"inventory");
//      retval["fin"] = 2;
    } else {
      retval["fin"] = 0;
      delete targetCursor.itemlist;
    }
  }
  return retval;

//  targetCursor.scrolllocation = 0;
//  targetCursor.itemlist = itemarray;
 
}

function MakeUseHappen(who,used,where) {
  var retval = used.use(who);
  if (retval["override"] === 1) {
    delete retval["override"];
  } else {
    if (retval["override"] !== -1) {
      retval["fin"] = 1;
    }
    var usedname = used.getDesc();
    usedname = usedname.replace(/^a /, "");
    var commandname = "Use";
    if (targetCursor.command === "o") {
      commandname = "Open";
    }
    retval["txt"] = commandname + " " + usedname + ": " + retval["txt"];
    var drawtype = "one";
    if (used.checkType("Consumable") && !retval["preserve"]) {
      if (where === "map") {
      // being used from the ground
        used.getHomeMap().deleteThing(used);
	  	} else {
		    // being used from inventory
		    who.removeFromInventory(used);
		  }
		}
    if (where === "map") {
      var usemap = who.getHomeMap();
      var localacre = usemap.getTile(used.getx(),used.gety());

      if (retval["redrawtype"]) {
        delete retval["redrawtype"];
  	  	// if more of the map needs to be redrawn, need to recheck light sources
		  
	  	  $.each(localacre.localLight, function(index, value) {
		      // each object that is casting light on the door might be casting light through the door.
  		    var lightsource = usemap.lightsList[index];
  	      who.getHomeMap().removeMapLight(index, usemap.lightsList[index].getLight(), usemap.lightsList[index].getx(), usemap.lightsList[index].gety());
    		  who.getHomeMap().setMapLight(lightsource, lightsource.getLight(), lightsource.getx(), lightsource.gety());
	      });
		  
  		  DrawMainFrame("draw",used.getHomeMap(),PC.getx(),PC.gety());
  	  } else {		
	  	  DrawMainFrame("one",used.getHomeMap(),used.getx(),used.gety());
  	  }
    }
  }
  return retval;
}

function ChooseRune() {
  targetCursor.command = "r";

  var itemarray = [];
  var statsdiv = "&nbsp;";
  statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
  statsdiv += "<table cellpadding='0' cellspacing='0' border='0'>";
  statsdiv += "<tr><td>&nbsp;&nbsp;</td><td>&nbsp;</td></tr>";
  var numrunes = 0;
  if (PC.runes.kings) {
    statsdiv += "<tr><td id='star" + numrunes + "'></td><td id='rune" + numrunes + "'>The Rune of Kings</td></tr>";
    itemarray[numrunes] = RUNE_KINGS;
    numrunes++;
  }
  if (PC.runes.waves) {
    statsdiv += "<tr><td id='star" + numrunes + "'></td><td id='rune" + numrunes + "'>The Rune of Waves</td></tr>";
    itemarray[numrunes] = RUNE_WAVES;
    numrunes++;
  }
  if (PC.runes.winds) {
    statsdiv += "<tr><td id='star" + numrunes + "'></td><td id='rune" + numrunes + "'>The Rune of Winds</td></tr>";
    itemarray[numrunes] = RUNE_WINDS;
    numrunes++;
  }
  if (PC.runes.flames) {
    statsdiv += "<tr><td id='star" + numrunes + "'></td><td id='rune" + numrunes + "'>The Rune of Flames</td></tr>";
    itemarray[numrunes] = RUNE_FLAMES;
    numrunes++;
  }
  if (PC.runes.void) {
    statsdiv += "<tr><td id='star" + numrunes + "'></td><td id='rune" + numrunes + "'>The Rune of Void</td></tr>";
    itemarray[numrunes] = RUNE_VOID;
    numrunes++;
  }
  statsdiv += "</table><table width='100%' cellpadding='0' cellspacing='0' border='0'>";
//  statsdiv += "<tr><td id='rune1'>&nbsp;</td><td id='rune2'>&nbsp;</td></tr>";
//  statsdiv += "<tr><td colspan='2' id='runevoid' style='align:center'>&nbsp;</td></tr>"
  statsdiv += "<tr><td><br /><br /></td></tr>";
  statsdiv += "<tr><td id='rune" + numrunes + "' style='text-align:center'>&nbsp;</td></tr>";
  statsdiv += "</table></div></div>";

   DrawTopbarFrame("<p>Runes</p>");
   $("#worldlayer").html("<img src='graphics/spacer.gif' width='416' height='416' />");
   $("#worldlayer").css("background-image", "");
   $("#worldlayer").css("background-color", "black");
   
   $('#displayframe').html(statsdiv);
   
	var scrollelem = $('.zstats').jScrollPane();
  var scrollapi = scrollelem.data('jsp');
  targetCursor.scrollapi = scrollapi;
  targetCursor.scrolllocation = 0;
  targetCursor.itemlist = [];
  targetCursor.itemlist = itemarray;
  targetCursor.runeselect = {};
  
  $('#rune0').toggleClass('highlight');
}

function PerformRuneChoice(code) {
  var retval = {};
  var numselected = 0;
  var runecombo;
  var runecombodesc = "";
  $.each(targetCursor.runeselect, function(idx, val) {
    if (val === 1) { numselected++; }
  });
  if (code === 27) { // ESC
    retval["fin"] = 0;
    delete targetCursor.itemlist;
    delete targetCursor.runeselect;
  }
	else if ((code === 38) || (code === 219)) {   // UP ARROW  or  [
	    $('#rune' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrolllocation--;
	    if (targetCursor.scrolllocation < 0) { targetCursor.scrolllocation = targetCursor.itemlist.length; }
	    if ((targetCursor.scrolllocation === targetCursor.itemlist.length) && (!numselected)) {
	      targetCursor.scrolllocation--;
	    }
	    $('#rune' + targetCursor.scrolllocation).toggleClass('highlight');  
	    retval["fin"] = 1;
	}
  else if ((code === 40) || (code === 191)) { // DOWN ARROW or /
      $('#rune' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrolllocation++;
	    if ((targetCursor.scrolllocation === targetCursor.itemlist.length) && (!numselected)) {
	      targetCursor.scrolllocation++;
	    }
	    if (targetCursor.scrolllocation > targetCursor.itemlist.length) { targetCursor.scrolllocation = 0; }
	    $('#rune' + targetCursor.scrolllocation).toggleClass('highlight');  
	    retval["fin"] = 1;
  }
	else if ((code === 32) || (code === 13)) { // SPACE or ENTER
    // toggle selected rune
    if (targetCursor.scrolllocation === targetCursor.itemlist.length) {
      runecombo = 0;
      $.each(targetCursor.runeselect, function(idx,val) {
        if (val) { runecombo += targetCursor.itemlist[idx]; }
      });
      retval = RunePower(runecombo);
      retval["fin"] = 2;
    } else {
      retval["fin"] = 1;
      if (targetCursor.runeselect[targetCursor.scrolllocation]) {
        $('#star'+targetCursor.scrolllocation).html("");
        targetCursor.runeselect[targetCursor.scrolllocation] = 0;
        numselected--;
      } else {
        if ((numselected > 3) || ((numselected === 3) && (!targetCursor.runeselect[targetCursor.itemlist.length-1]))) {
          DUPlaySound("sfx_walk_blocked"); 
        } else {
          $('#star'+targetCursor.scrolllocation).html("*");
          targetCursor.runeselect[targetCursor.scrolllocation] = 1;
          numselected++;
        }
      }
      if (numselected) {
        runecombo = 0;
        $.each(targetCursor.runeselect, function(idx,val) {
          if (val) { runecombo += targetCursor.itemlist[idx]; }
        });
        alert(runecombo);
        $('#rune'+targetCursor.itemlist.length).html(runedefs[runecombo].pre);
      } else {
        $('#rune'+targetCursor.itemlist.length).html("");
      }
    }
  }
  return retval;

//  targetCursor.scrolllocation = 0;
//  targetCursor.itemlist = itemarray;
 
}

function PerformWait(code) {
  var retval = {fin:2};
  if ((code === 27) || (code === 48)) { 
    return retval;
  }
  gamestate.setMode("null");
  var duration = parseInt(code) - 48;
  retval["txt"] = "Waiting for " + duration + " hours.";
  if (duration === 1) { retval["txt"] = "Waiting for 1 hour."; }
  duration = duration * 12;
  PC.setWaiting(DUTime.getGameClock() + duration);
  PC.moveAfterWaiting = {x : PC.getx(), y: PC.gety()};
  $("#displayframe").fadeOut(1500, function() {});
  PC.getHomeMap().moveThing(0,0,PC);

  retval["fin"] = 1;
  retval["input"] = "&gt;";
  return retval;
}

function PerformYell() {
	var retval = {};
	if (inputText.txt == "") {
		retval["txt"] = "Yell: Nothing!";
		retval["fin"] = 2;
		return retval;
	}
	else {
		if (inputText.txt === "ETHERBUNNY") {
			PC.addMovetype(MOVE_ETHEREAL);
		} else if (inputText.txt === "DEBUG") {
		  if (debug) {
		    ActivateDebug();
		  } else {
		    debug = 1;
		    ActivateDebug();
		  }
		  retval["fin"] = 3;
		  return retval;
		} else if (inputText.txt === "BEAMAGE") {
		  PC.setKnowsInfusion(1);
		  for (var i=1; i<=8; i++) {
		    for (var j=1; j<=8; j++) {
	//	      if (i != 4) {
		        PC.addSpell(i,GetSpellID(j));
	//	      }
		    }
		  }
		} else if (inputText.txt === "ONEUP") {
		  PC.setLevel(PC.getLevel()+1);
		} else if (inputText.txt === "LOOPLEPR") {
		  PC.addGold(1000);
		} else if (inputText.txt === "REFRESH") {
		  PC.setMana(PC.getMaxMana());
      PC.setHP(PC.getMaxHP());
		} else if (inputText.txt === "SANS") {
		  PC.addxp(100);
		} else if (inputText.txt === "FUTHARK") {
		  PC.runes.kings = 1;
		  PC.setRuneCooldown("kings",0);
		} else if (inputText.txt === "QUAKE") {
		  Earthquake();
		} else if (inputText.txt === "RUNTEST") {
		  RunTest();
		} else if (inputText.txt === "TESTPAIN") {
		  var hurtnpcs = PC.getHomeMap().npcs;
		  hurtnpcs = hurtnpcs.getAll();
		  $.each(hurtnpcs, function(idx,val) {
		    val.setHP(2);
		  });
		} else if (inputText.txt === "TESTRING") {
		  TestRing();
		} else if (inputText.txt === "SOUNDCHK") {
		  createjs.Sound.play("Mainland", {loop: -1});
		} else if (inputText.txt === "SHOWMAP") {
      if (debug) {
        DisplayTestMap();
      }
    } else if (inputText.txt === "TESTTOWER") {
      var newmap = new GameMap();
      if (maps.getMap("toshin3")) {
				newmap = maps.getMap("toshin3");
			} else {
				newmap.loadMap("toshin3");
				maps.addMapByRef(newmap);
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,16,13);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTBARD") {
      var newmap = new GameMap();
      if (maps.getMap("swainhil")) {
				newmap = maps.getMap("swainhil");
			} else {
				newmap.loadMap("swainhil");
				maps.addMapByRef(newmap);
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,48,19);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "GOGROTTO") {
		    var homemap = PC.getHomeMap();
		    homemap.moveThing(30,45,PC);
		    DrawMainFrame("draw", homemap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTGROTTO") {
      var newmap = new GameMap();
      if (maps.getMap("grotto")) {
				newmap = maps.getMap("grotto");
			} else {
				newmap.loadMap("grotto");
				maps.addMapByRef(newmap);
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,22,53);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTETHER") {
      var newmap = new GameMap();
      if (maps.getMap("ether")) {
				newmap = maps.getMap("ether");
			} else {
				newmap.loadMap("ether");
				maps.addMapByRef(newmap);
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,46,64);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTPALACE") {
      var newmap = new GameMap();
      if (maps.getMap("skypalace")) {
				newmap = maps.getMap("skypalace");
			} else {
				newmap.loadMap("skypalace");
				maps.addMapByRef(newmap);
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,47,49);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTROYAL") {
      var newmap = new GameMap();
      if (maps.getMap("pitdespair2")) {
				newmap = maps.getMap("pitdespair2");
			} else {
				newmap.loadMap("pitdespair2");
				maps.addMapByRef(newmap);
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,46,28);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "BAKEDBEANS") {
      var itemname = prompt("Create what item?");
      var newthing = localFactory.createTile(itemname);
      PC.addToInventory(newthing,1);
    } else if (inputText.txt === "TESTANIM") {
      var newmap = new GameMap();
      if (maps.getMap("greenacres")) {
        newmap = maps.getMap("greenacres");
      } else {
        newmap.loadMap("greenacres");
        maps.addMapByRef(newmap);
      }
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap, 20,20);
      var tmpdude = localFactory.createTile("PaladinVillagerNPC");
      newmap.placeThing(20,25,tmpdude);
      var tmpdude2 = localFactory.createTile("PaladinVillagerNPC");
      newmap.placeThing(20,30,tmpdude2);
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTANIMA") {
      var tmpmap = maps.getMap("greenacres");
      var castermob = tmpmap.getTile(20,25).getTopNPC();
      var tgtmob = tmpmap.getTile(20,30).getTopNPC();
      PerformMagicBolt(castermob,0,0,tgtmob);
// REAL YELLS START HERE
		} else if (inputText.txt === "KARIS") {
		  if (PC.getHomeMap().getName() === "asharden1") {
		    // FIX HERE- add sound effect for teleport
		    maintext.delayedAddText("In a blink, you are elsewhere.");
		    var homemap = PC.getHomeMap();
		    homemap.moveThing(25,23,PC);
		    DrawMainFrame("draw", homemap, PC.getx(), PC.gety());
		  }
    } else if (inputText.txt === "XYZZY") {
	    maintext.delayedAddText("Nothing happens here.");
		}
		retval["txt"] = "Yell: " + inputText.txt + "!";
		retval["fin"] = 1;
		return retval;
	}
}

function performZstats(code) {
  var retval = {};
  var exitInv = 1;
  var restrict = 0;
  if (targetCursor.restrictTo) { restrict = targetCursor.restrictTo; }

  if ((code === 27) || (code === 90)) { // ESC or Z again
    retval["fin"] = 0;
  }
  else if ((code === 37) || (code === 186)) {  // previous page
    if (targetCursor.page === 2) { 
      // special inventory screen, move around it instead
      exitInv = PerformInventoryScreen(code, restrict);
    } 
    if (typeof exitInv === "object") {
      // (U)se return
    } else if (exitInv) {
      targetCursor.page--;
      if (targetCursor.page === 0) { 
        targetCursor.page = 3; 
        if (PC.runes.kings || PC.runes.waves || PC.runes.winds || PC.runes.flames || PC.runes.void) {
          targetCursor.page = 4;
        }
      }  // set to the last page when I know what that will be
      DrawStats(targetCursor.page);
    }
    retval["fin"] = 1;
  }
  else if ((code === 39) || (code === 222)) { // next page
    if (targetCursor.page === 2) {
      // special inventory screen, move around it instead
      exitInv = PerformInventoryScreen(code, restrict);
    } 
    if (typeof exitInv === "object") {
      // (U)se return
    } else if (exitInv) {
      targetCursor.page++;
      if (targetCursor.page === 5) { targetCursor.page = 1; }
      if ((targetCursor.page === 4) && !(PC.runes.kings || PC.runes.waves || PC.runes.winds || PC.runes.flames || PC.runes.void)) {
        targetCursor.page = 1;
      }
      DrawStats(targetCursor.page);
    }
    retval["fin"] = 1;
  }
  else if ((code === 38) || (code === 219)) { // scroll up
    if (targetCursor.page === 2) {
      // inventory
      exitInv = PerformInventoryScreen(code, restrict);
    } 
    if (typeof exitInv === "object") {
      // (U)se return
    } else if (exitInv) {
      targetCursor.scrollapi.scrollByY(-50,1);
    }
    retval["fin"] = 1;
  }
  else if ((code === 13) || (code === 40) || (code === 191)) { // scroll down
    if (targetCursor.page === 2) {
      exitInv = PerformInventoryScreen(code, restrict);
    }
    if (typeof exitInv === "object") {
      // (U)se return
      return exitInv;
    } else if (exitInv) {
      targetCursor.scrollapi.scrollByY(50,1);
    }
    retval["fin"] = 1;
  }
  else if ((code === 32) || (code === 34)) {  // space or page down
    if (targetCursor.page === 2) {
      exitInv = PerformInventoryScreen(code, restrict);
    }
    if (typeof exitInv === "object") {
      // (U)se return
    } else if (exitInv) {
      targetCursor.scrollapi.scrollByY(350,1);
    }
    retval["fin"] = 1;
  }       
  else if ((code === 33)) {  // page up
    if (targetCursor.page === 2) {
      exitInv = PerformInventoryScreen(code, restrict);
    }
    if (typeof exitInv === "object") {
      // (U)se return
    } else if (exitInv) {
      targetCursor.scrollapi.scrollByY(-350,1);
    }
    retval["fin"] = 1;
  }       
  else { retval["fin"] = 1; }

  if (targetCursor.page === 2) { DisplayInventory(restrict); }
  return retval;
}

function DrawStats(page) {

  var statsdiv = "&nbsp;";
   
  if (page === 1) {
    var spanstr = "<span>";
    if (PC.getStr() > PC.getBaseStr()) { spanstr = '<span style="color:cyan">'; }
    if (PC.getStr() < PC.getBaseStr()) { spanstr = '<span style="color:orange">'; }
    var spandex = "<span>";
    if (PC.getDex() > PC.getBaseDex()) { spandex = '<span style="color:cyan">'; }
    if (PC.getDex() < PC.getBaseDex()) { spandex = '<span style="color:orange">'; }
    var spanint = "<span>";
    if (PC.getInt() > PC.getBaseInt()) { spanint = '<span style="color:cyan">'; }
    if (PC.getInt() < PC.getBaseInt()) { spanint = '<span style="color:orange">'; }
    
    statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
    statsdiv += "<table cellpadding='0' cellspacing='0' border='0' style='background-color:black'><tr>";
    statsdiv += "<td>" + PC.getPCName() + "</td><td width='30'>&nbsp;</td><td></tr>";
    statsdiv += "<tr><td style='width:50%'>HP: " + PC.getDisplayHP() + "/" + PC.getMaxHP() + "</td><td></td>";
    statsdiv += "<td style='width:50%'>MP: " + PC.getMana() + "/" + PC.getMaxMana() + "</td></tr>";
    statsdiv += "<tr><td colspan='3'>&nbsp;<br /></td></tr>";
    statsdiv += "<tr><td>STR: " + spanstr + "" + PC.getStr() + "</span></td><td></td><td>LEVEL: " + PC.getLevel() + "</td></tr>";
    statsdiv += "<tr><td>DEX: " + spandex + "" + PC.getDex() + "</span></td><td></td><td>XP: ";
    if (EarnedLevel(PC)) {
      statsdiv += "<span class='leveled'>";
    }
    statsdiv += Math.floor(PC.getxp());
    if (EarnedLevel(PC)) {
      statsdiv += "</span>";
    }
    statsdiv += "</td></tr>";
    statsdiv += "<tr><td>INT: " + spanint + "" + PC.getInt() + "</span></td><td></td><td>Training: " + PC.gettp() + "</td></tr>";
    statsdiv += "<tr><td colspan='3'>&nbsp;<br /></td></tr>";
    statsdiv += "<tr><td>Gold: " + PC.getGold() + "</td><td></td><td></td></tr>";
    statsdiv += "<tr><td colspan='3'>&nbsp;<br /></td></tr>";
    if (PC.getEquipment("weapon")) { 
      var wpndesc = PC.getEquipment("weapon").getDesc();
      wpndesc = wpndesc.charAt(0).toUpperCase() + wpndesc.slice(1);
      statsdiv += "<tr><td>Weapon: " + wpndesc + "</td><td></td>";
    } else {
      statsdiv += "<tr><td>Weapon: None</td><td></td>";
    }
    if (PC.getEquipment("armor")) {
      var armordesc = PC.getEquipment("armor").getDesc();
      armordesc = armordesc.charAt(0).toUpperCase() + armordesc.slice(1);
      statsdiv += "<td>Armor: " + armordesc + "</td></tr>";
    } else {
      statsdiv += "<td>Armor: None</td></tr>";
    }
    if (PC.getEquipment("weapon")) {
      statsdiv += "<tr><td>Ave Dmg: " + PC.getEquipment("weapon").getAveDamage(PC) + "</td><td></td>";
    } else {
      statsdiv += "<tr><td></td><td></td>";
    }
    if (PC.getEquipment("armor")) {
      statsdiv += "<td>Defense: " + PC.getEquipment("armor").getDefense() + "</td></tr>";
    } else {
      statsdiv += "<td></td></tr>";
    }
    statsdiv += "<tr><td></td><td></td>";
    if (PC.getEquipment("armor")) {
      statsdiv += "<td>Absorb: " + PC.getEquipment("armor").getAbsorb() + "</td></tr>";
    } else {
      statsdiv += "<td></td></tr>";
    }
    if (PC.getEquipment("missile")) {    
      var missdesc = PC.getEquipment("missile").getDesc();
      missdesc = missdesc.charAt(0).toUpperCase() + missdesc.slice(1);
      statsdiv += "<tr><td>Missile: " + missdesc + "</td><td></td>";
    } else {
      statsdiv += "<tr><td></td><td></td>";
    }
    if (PC.getEquipment("armor")) {
      statsdiv += "<td>Resist: " + PC.getEquipment("armor").getResist() + "</td></tr>";
    } else {
      statsdiv += "<td></td></tr>";
    }
    if (PC.getEquipment("missile")){
      statsdiv += "<tr><td>Ave Dmg: " + PC.getEquipment("missile").getAveDamage(PC) + "</td><td></td>";
    } else {
      statsdiv += "<tr><td></td><td></td>";
    }
    statsdiv += "<td></td></tr><tr><td colspan='3'>&nbsp;</td></tr>";
    statsdiv += "<tr><td colspan='3' style='text-decoration:underline'>Spells and effects</td></tr>";
    var alleffects = PC.getSpellEffects();
    if (!alleffects[0]) {
      statsdiv += "<tr><td colspan='3'>You have no effects or afflictions upon you.</td></tr>";
    } else {
      for (var i=0; i < alleffects.length; i++) {
        if (alleffects[i].display) {
          statsdiv += "<tr><td colspan='3'>" + alleffects[i].display + ": " + alleffects[i].zstatdesc + "</td></tr>";
        }
      }
    } 

    statsdiv += "</table></div></div>";
    DrawTopbarFrame("<p>Character</p>");
  
    $("#worldlayer").html("<img src='graphics/spacer.gif' width='416' height='416' />");
    $("#worldlayer").css("background-image", "");
    $("#worldlayer").css("background-color", "black");
    $('#uiinterface').html(statsdiv);
    $("#uiinterface").css("background-color", "black");
  
  	var scrollelem = $('.zstats').jScrollPane();
    var scrollapi = scrollelem.data('jsp');
    targetCursor.scrollapi = scrollapi;

  } else if (page === 2) {
    DisplayInventory();
    DrawTopbarFrame("<p>Inventory</p>");
  } else if (page === 3) {
    statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
    statsdiv += "<table cellpadding='0' cellspacing='0' border='0' style='background-color:black'>";
    statsdiv += "<tr><td>&nbsp;</td></tr>";
   
    var hasSpellbook = 0;
   
    for (var lvl = 1; lvl <= 8; lvl++ ){
      var hasLevel = 0;
      for (var i=1; i<=8; i++) {
        var spellnum = GetSpellID(i);
        if (PC.knowsSpell(lvl, spellnum)) {
          if (!hasLevel) {
            if (lvl !== 1) { statsdiv += "<tr><td>&nbsp;</td></tr>"; }
            if (lvl === 1) {
              statsdiv += "<tr><td class='circleheader'>First Circle</td></tr>";
            } else if (lvl === 2) {
              statsdiv += "<tr><td class='circleheader'>Second Circle</td></tr>";
            } else if (lvl === 3) {
              statsdiv += "<tr><td class='circleheader'>Third Circle</td></tr>";
            } else if (lvl === 4) {
              statsdiv += "<tr><td class='circleheader'>Fourth Circle</td></tr>";
            } else if (lvl === 5) {
              statsdiv += "<tr><td class='circleheader'>Fifth Circle</td></tr>";
            } else if (lvl === 6) {
              statsdiv += "<tr><td class='circleheader'>Sixth Circle</td></tr>";
            } else if (lvl === 7) {
              statsdiv += "<tr><td class='circleheader'>Seventh Circle</td></tr>";
            } else if (lvl === 8) {
              statsdiv += "<tr><td class='circleheader'>Eighth Circle</td></tr>";
            }
          }
          statsdiv += "<tr><td class='spellstat'>" + magic[lvl][spellnum].getName() + "</td></tr>";
          hasLevel = 1;
          hasSpellbook = 1;
         
        }
      }
    }
    if (!hasSpellbook) {
      statsdiv += "<tr><td>You do not have a spellbook.</td></tr>";
    }
  
    statsdiv += "</table></div></div>";  

    $("#worldlayer").html("<img src='graphics/spacer.gif' width='416' height='416' />");
    $("#worldlayer").css("background-image", "");
    $("#worldlayer").css("background-color", "black");
    $('#uiinterface').html(statsdiv);
    $("#uiinterface").css("background-color", "black");
  
  	var scrollelem = $('.zstats').jScrollPane();
    var scrollapi = scrollelem.data('jsp');
    targetCursor.scrollapi = scrollapi;

    DrawTopbarFrame("<p>Spellbook</p>");
  } else if (page === 4) {
    statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
    statsdiv += "<table cellpadding='0' cellspacing='0' border='0' style='background-color:black'>";
    statsdiv += "<tr><td>&nbsp;</td></tr>";
   
    var hasrunes = 0;
    if (PC.runes.kings) { 
     statsdiv += "<tr><td>Rune of Kings</td></tr>";
     hasrunes = 1;
    }
    if (PC.runes.waves) { 
     statsdiv += "<tr><td>Rune of Waves</td></tr>";
     hasrunes = 1;
    }
    if (PC.runes.winds) { 
     statsdiv += "<tr><td>Rune of Winds</td></tr>";
     hasrunes = 1;
    }
    if (PC.runes.flames) { 
     statsdiv += "<tr><td>Rune of Flames</td></tr>";
     hasrunes = 1;
    }
    if (PC.runes.void) { 
     statsdiv += "<tr><td>Rune of Void</td></tr>";
     hasrunes = 1;
    }
    if (!hasrunes) {
      statsdiv += "<tr><td>You have discovered no runes.</td></tr>";
    }
    statsdiv += "</table></div></div>";  
    DrawTopbarFrame("<p>Runes</p>");

    $("#worldlayer").html("<img src='graphics/spacer.gif' width='416' height='416' />");
    $("#worldlayer").css("background-image", "");
    $("#worldlayer").css("background-color", "black");
    $('#uiinterface').html(statsdiv);
    $("#uiinterface").css("background-color", "black");
  
  	var scrollelem = $('.zstats').jScrollPane();
    var scrollapi = scrollelem.data('jsp');
    targetCursor.scrollapi = scrollapi;

  }
 
  $("#worldlayer").html("<img src='graphics/spacer.gif' width='416' height='416' />");
  $("#worldlayer").css("background-image", "");
  $("#worldlayer").css("background-color", "black");
  $('#uiinterface').html(statsdiv);
  $("#uiinterface").css("background-color", "black");
  
	var scrollelem = $('.zstats').jScrollPane();
  var scrollapi = scrollelem.data('jsp');
  targetCursor.scrollapi = scrollapi;

}

function StatsCategory(stuff, label) {
  stuff.sort(function(a,b) {
    var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
    if (nameA < nameB) 
      return -1
    if (nameA > nameB)
      return 1
    return 0 
  }); 
  var newtext = "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>" + label +"</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
  for (var i = 0; i < stuff.length; i++ ) {
    var itemdesc = stuff[i].getDesc();
    itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
    newtext += "<tr><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + stuff[i].getQuantity() + ")</td></tr>";
  }
  newtext += "<tr><td></td><td>&nbsp;</td></tr>";
  return newtext;
}

function DrawOptions() {
  var optdiv = "<div><div id='opt' class='zstats'>";
  optdiv += "<table cellpadding='0' cellspacing='0' border='0' style='background-color:black'>";
  optdiv += "<tr><td>&nbsp;&nbsp;</td><td>&nbsp;</td><td></td></tr>";
  optdiv += "<tr><td style='text-decoration:underline'>OPTIONS</td><td></td><td></td></tr>";
  optdiv += "<tr><td>&nbsp;&nbsp;</td><td>&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td></tr>";
  optdiv += "<tr><td><span style='text-decoration:underline'>SOUND AND MUSIC</span><br /></td><td></td><td></td></tr>";
  optdiv += "<tr><td>MUSIC VOLUME:</td><td></td><td";
  if (targetCursor.page === 1) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (DU.gameflags.getFlag("music")) {
    var modmusic = DU.gameflags.getFlag('music')*10;
    optdiv += modmusic;
  } else {
    optdiv += "0";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>LOOP MUSIC:</td><td></td><td";
  if (targetCursor.page === 2) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (DU.gameflags.getFlag("loopmusic")) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>SOUND VOLUME:</td><td></td><td";
  if (targetCursor.page === 3) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (DU.gameflags.getFlag("sound")) {
    var modsound = DU.gameflags.getFlag("sound")*10;
    optdiv += modsound;
  } else {
    optdiv += "0";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>AMBIENT SOUND:</td><td></td><td";
  if (targetCursor.page === 4) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (DU.gameflags.getFlag("ambientsound")) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";  
  optdiv += "<tr><td><br /><span style='text-decoration:underline'>USER INTERFACE</span><br /></td><td></td><td></td></tr>";
  optdiv += "<tr><td>MOVE OPENS DOORS:</td><td></td><td";
  if (targetCursor.page === 5) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (DU.gameflags.getFlag("move_opens_doors")) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";

  optdiv += "<tr><td>MOVE ATTACKS/TALKS:</td><td></td><td";
  if (targetCursor.page === 6) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (DU.gameflags.getFlag("move_attacks")) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";

  optdiv += "<tr><td>STICKY TARGETING:</td><td></td><td";
  if (targetCursor.page === 7) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (DU.gameflags.getFlag("sticky_target")) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";

  optdiv += "</table></div></div>";
  
  DrawTopbarFrame("<p>Options</p>");
  $("#worldlayer").html("<img src='graphics/spacer.gif' width='416' height='416' />");
  $("#worldlayer").css("background-image", "");
  $("#worldlayer").css("background-color", "black");
  $('#uiinterface').html(optdiv);
  $("#uiinterface").css("background-color", "black");

}

function DrawDebugOptions() {
  var optdiv = "<div><div id='opt' class='zstats'>";
  optdiv += "<table cellpadding='0' cellspacing='0' border='0' style='background-color:black'>";
  optdiv += "<tr><td>&nbsp;&nbsp;</td><td>&nbsp;</td><td></td></tr>";
  optdiv += "<tr><td>DEBUG OPTIONS</td><td></td><td></td></tr>";
  optdiv += "<tr><td>&nbsp;&nbsp;</td><td>&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td></tr>";
  optdiv += "<tr><td>Maps:</td><td></td><td";
  if (targetCursor.page === 1) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.map) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>Sound:</td><td></td><td";
  if (targetCursor.page === 2) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.sound) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>Light:</td><td></td><td";
  if (targetCursor.page === 3) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.light) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>Save/load:</td><td></td><td";
  if (targetCursor.page === 4) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.saveload) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>AI:</td><td></td><td";
  if (targetCursor.page === 5) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.ai) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>Combat:</td><td></td><td";
  if (targetCursor.page === 6) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.combat) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>Magic:</td><td></td><td";
  if (targetCursor.page === 7) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.magic) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>Time:</td><td></td><td";
  if (targetCursor.page === 8) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.time) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>Plot:</td><td></td><td";
  if (targetCursor.page === 9) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.plot) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>Events:</td><td></td><td";
  if (targetCursor.page === 10) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.events) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";
  optdiv += "<tr><td>Game Objects:</td><td></td><td";
  if (targetCursor.page === 11) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.gameobj) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";

  optdiv += "</table></div></div>";
  
  DrawTopbarFrame("<p>Debug Options</p>");
  $("#worldlayer").html("<img src='graphics/spacer.gif' width='416' height='416' />");
  $("#worldlayer").css("background-image", "");
  $("#worldlayer").css("background-color", "black");
  $('#uiinterface').html(optdiv);
  $("#uiinterface").css("background-color", "black");
  
}


function performOptions(code) {
  var retval = {};
    if ((code === 27) || (code === 79)) { // ESC or O again
      retval["fin"] = 0;
      delete targetCursor.cmd;
      $('#uiinterface').html("");
      $("#uiinterface").css("background-color", "");
    }
    else if ((code === 38) || (code === 219)) { // scroll up
      targetCursor.page--;
      if (targetCursor.page === 0) { targetCursor.page = 1; } 
      retval["fin"] = 1;
    }
    else if ((code === 40) || (code === 191)) { // scroll down
      targetCursor.page++;
      if (targetCursor.cmd === "o") {
        if (targetCursor.page === 8) { targetCursor.page = 7; }
      } else if (targetCursor.cmd === "debug") {
        if (targetCursor.page === 12) { targetCursor.page = 11; }
      }
      retval["fin"] = 1;
    }
    else if ((code === 37) || (code === 186)) {  // left, for volumes
      if (targetCursor.cmd === "o") {
        if (targetCursor.page === 1) {
          if (DU.gameflags.getFlag("music")) {
            DU.gameflags.setFlag("music", Math.round(Math.max(0,DU.gameflags.getFlag("music")-.1)));
            if (nowplaying.song) {
              nowplaying.song.volume = DU.gameflags.getFlag("music");
            }
          }
        } else if (targetCursor.page === 3) {
          if (DU.gameflags.getFlag("sound")) {
            DU.gameflags.setFlag("sound", Math.round(Math.max(0,DU.gameflags.getFlag("sound")-.1)));
          }
        }
      }
    }
    else if ((code === 39) || (code === 222)) {  // right, for volumes
      if (targetCursor.cmd === "o") {
        if (targetCursor.page === 1) {
          if (DU.gameflags.getFlag("music")) {
            DU.gameflags.setFlag("music", Math.round(Math.min(1,DU.gameflags.getFlag("music")+.1)));
            if (nowplaying.song) {
              nowplaying.song.volume = DU.gameflags.getFlag("music");
            } else {
              var song = PC.getHomeMap().getMusic();
              nowplaying = DUPlayMusic(song);
            }
          }
        } else if (targetCursor.page === 3) {
          if (DU.getFlag("sound")) {
            DU.setFlag("sound", Math.round(Math.min(1,DU.getFlag("sound")+.1)));
          }
        }
      }
    }
    else if ((code === 32) || (code === 13)) {  // space or enter
      if (targetCursor.cmd === "o") {
        if (targetCursor.page === 1) {
          if (DU.gameflags.getFlag("music")) {
            DU.gameflags.setFlag("music",0);
            if (nowplaying.song) {
              nowplaying.song.volume = 0;
            }
          } else {
            DU.gameflags.setFlag("music",1);
            if (nowplaying.song) {
              nowplaying.song.volume = 1;
            } else {
              var song = PC.getHomeMap().getMusic();
              nowplaying = DUPlayMusic(song);
            }
          }
        } else if (targetCursor.page === 3) {
          if (DU.gameflags.getFlag("sound")) {
            DU.gameflags.setFlag("sound",0);
          } else {
            DU.gameflags.setFlag("sound",1);
          }
        } else {
          ToggleOption(targetCursor.page);
        }
      } else if (targetCursor.cmd === "debug") {
        ToggleDebugOption(targetCursor.page);
      }
      retval["fin"] = 1;
    }       
    else { retval["fin"] = 1; }
    
    if (targetCursor.cmd === "o") {  
      DrawOptions();
    } else if (targetCursor.cmd === "debug") {
      DrawDebugOptions();
    }
    return retval;
}

function ToggleDebugOption(opt) {
  if (opt === 1) {
    if (debugflags.map === 1) {
      debugflags.map = 0;
    } else {
      debugflags.map = 1;
    }		
  } else if (opt === 2) {
   	if (debugflags.sound) { 
	    debugflags.sound = 0; 
	  } else { 
      debugflags.sound = 1; 
    }
  } else if (opt === 3) {
    if (debugflags.light === 1) {
      debugflags.light = 0;
    } else {
      debugflags.light = 1;
    }
  } else if (opt === 4) {
    if (debugflags.saveload === 1) {
      debugflags.saveload = 0;
    } else {
      debugflags.saveload = 1;
    }
  } else if (opt === 5) {
    if (debugflags.ai === 1) {
      debugflags.ai = 0;
    } else {
      debugflags.ai = 1;
    }
  } else if (opt === 6) {
    if (debugflags.combat === 1) {
      debugflags.combat = 0;
    } else {
      debugflags.combat = 1;
    }
  } else if (opt === 7) {
    if (debugflags.magic === 1) {
      debugflags.magic = 0;
    } else {
      debugflags.magic = 1;
    }
  } else if (opt === 8) {
    if (debugflags.time === 1) {
      debugflags.time = 0;
    } else {
      debugflags.time = 1;
    }
  } else if (opt === 9) {
    if (debugflags.plot === 1) {
      debugflags.plot = 0;
    } else {
      debugflags.plot = 1;
    }
  } else if (opt === 10) {
    if (debugflags.events === 1) {
      debugflags.events = 0;
    } else {
      debugflags.events = 1;
    }
  } else if (opt === 11) {
    if (debugflags.gameobj === 1) {
      debugflags.gameobj = 0;
    } else {
      debugflags.gameobj = 1;
    }
  }
}

function ToggleOption(opt) {
  if (opt === 1) {
    if (DU.gameflags.getFlag("music")) {
      DU.gameflags.setFlag("music", 0);
      StopMusic(nowplaying);
    } else {
      DU.gameflags.setFlag("music", 1);
      var song = PC.getHomeMap().getMusic();
      nowplaying = DUPlayMusic(song);
    }
  } else if (opt === 2) {
   	if (DU.gameflags.getFlag("loopmusic")) { 
	    DU.gameflags.setFlag("loopmusic", 0); 
      if (DU.gameflags.getFlag("music")) {
        nowplaying.song.loop = 0;
      }
	  } else { 
      DU.gameflags.setFlag("loopmusic", 1); 
      if (DU.gameflags.getFlag("music")) {
        if (nowplaying.song.playState === "playFinished") {
          var song = PC.getHomeMap().getMusic();
          nowplaying = DUPlayMusic(song);  
        } else {
          nowplaying.song.loop = -1;
        }
      }
    }		
  } else if (opt === 3) {
   	if (DU.gameflags.getFlag("sound")) { 
	    DU.gameflags.setFlag("sound", 0); 
	  } else { 
      DU.gameflags.setFlag("sound", 1); 
    }
  } else if (opt === 4) {
   	if (DU.gameflags.getFlag("ambientsound")) { 
	    DU.gameflags.setFlag("ambientsound", 0); 
	  } else { 
      DU.gameflags.setFlag("ambientsound", 1); 
    }
  } else if (opt === 5) {
    if (DU.gameflags.getFlag("move_opens_doors")) {
      DU.gameflags.setFlag("move_opens_doors", 0);
//      TabletUI(-1);
    } else {
      DU.gameflags.setFlag("move_opens_doors", 1);
//      TabletUI(1);
    }
  } else if (opt === 6) {
    if (DU.gameflags.getFlag("move_attacks")) {
      DU.gameflags.setFlag("move_attacks", 0);
    } else {
      DU.gameflags.setFlag("move_attacks", 1);
    }
  } else if (opt === 7) {
    if (DU.gameflags.getFlag("sticky_target")) {
      DU.gameflags.setFlag("sticky_target", 0);
    } else {
      DU.gameflags.setFlag("sticky_target", 1);
    }
  }
}

function ShowSaveGames(toptext) {
  var table = "<div class='zstats'><table cellpadding='2' cellspacing='0' border='0' style='background-color:black'>";
  var saveIndex = JSON.parse(localStorage.saveIndex);
  for (var i=-1;i<=9;i++) {
    if ((i === 0) || (i === 9)) { table += "<tr style='height:36; background-image:url(\"graphics/frame/saveui-lock.gif\"); width:416px'>"; }
    else { table += "<tr style='height:36; background-image:url(\"graphics/frame/saveui.gif\"); width:416px'>"; }
    if (i === -1) {
      table += "<td style='color:white;text-align:center;v-align:center;width:35'><img src='graphics/spacer.gif' width='32' /></td>";
      table += "<td style='color:white;text-align:center;v-align:center;width:35'><img src='graphics/spacer.gif' width='32' /></td>";
      table += "<td style='color:white;v-align:center;padding-left:5px;width:100%'>" + toptext + "</td>";      
    } else if (saveIndex[i].charname) {
      var tmpdate = saveIndex[i].datestamp;
      var thisdate = new Date();
      thisdate.setTime(tmpdate);
      var thistime = thisdate.toLocaleTimeString();
      var parts = thistime.split(/ /);
      var timepart = parts[0].split(":");
      thistime = timepart[0] + ":" + timepart[1] + " " + parts[1];
      var thisloc = saveIndex[i].loc.slice(0,13);
      table += "<td style='color:white;text-align:center;v-align:center;width:35'>" + i + "</td>";
      table += "<td style='color:white;text-align:center;v-align:center;width:35'><img src='graphics/" + saveIndex[i].graphic + "' /></td>";
      table += "<td style='color:white;v-align:center;padding-left:5px;width:100%;font-size:smaller'>" + saveIndex[i].charname + " (" + thisloc + ") " + thisdate.toLocaleDateString() + " " + thistime + "</td>";
    } else {
      table += "<td style='color:white;text-align:center;v-align:center;width:35'>" + i + "</td>";
      table += "<td style='color:white;text-align:center;v-align:center;width:35'></td>";
      table += "<td style='color:white;v-align:center;padding-left:5px;width:100%'></td>";      
    }
    table += "</tr>";
  }
  table += "</table></div>";
  $("#uiinterface").html(table);
}

function DisplayInventory(restrictTo) {
  if (!targetCursor.invx) { targetCursor.invx = 0; }
  if (!targetCursor.invy) { targetCursor.invy = 0; }
  if (!targetCursor.invskiprow) { targetCursor.invskiprow = 0; }
  if (!targetCursor.invlength) { targetCursor.invlength = 0; }
  
  var inventorylist = MakeInventoryList(restrictTo);

  targetCursor.invlength = inventorylist.length;
  $("#uiinterface").html("");
  $("#uiinterface").css("background-color","black");
  for (var j=0;j<5;j++) {
    for (var i=0;i<8;i++) {
      var leftedge = 30+45*i;
      var topedge = 20+45*j;
      $("#uiinterface").append("<div id='inv_"+i+"x"+j+"' style='position:absolute; left: " + leftedge + "; top: " + topedge + "; width:32px; height: 32; border:3px; border-style: solid; border-color:#999;'></div>");
    }
  }

  $("#uiinterface").append("<div id='inv_desc_window' style='position:absolute; left: 35px; top: 260px; border: 3px; border-style: solid; border-color:#ccc; width:340px; height: 125px'></div>");
  $("#inv_desc_window").html("<table cellpadding='4' cellspacing='4' border='0' style='margin-top:5px'><tr><td rowspan='2' style='text-align:center; width: 100px'><div id='inv_image' style='position:absolute; top: 16px; left: 34px; width: 32px; height:32px'></div><p id='inv_name' class='charcreate' style='position:absolute; top:52px; width:100px; text-align:center'></p></td><td><p class='charcreate' id='inv_desc' style='top:20px'></p></td></tr><td><p class='charcreate' id='inv_use' style='color:yellow'></p></td></tr></table>");
  var invselect = targetCursor.invskiprow*8;
  var writetox = 0;
  var writetoy = 0;

  for (var i=invselect;i<inventorylist.length;i++) {
    writetoy = Math.floor(i/8);
    writetox = i%8;
    
    var showgraphic = inventorylist[i].getGraphicArray();
    var bordercolor = "#ccc";
    $("#inv_"+writetox+"x"+writetoy).css("background-image", "url('graphics/" + showgraphic[0] + "')");
    $("#inv_"+writetox+"x"+writetoy).css("background-repeat", "no-repeat");
    $("#inv_"+writetox+"x"+writetoy).css("background-position", showgraphic[2] + "px " + showgraphic[3] + "px");

    if (inventorylist[i].getQuantity() && (inventorylist[i].getQuantity() > 1)) {
      $("#inv_"+writetox+"x"+writetoy).css("vertical-align", "bottom");
      $("#inv_"+writetox+"x"+writetoy).css("text-align", "right");
      $("#inv_"+writetox+"x"+writetoy).css("font-size", 12);
      $("#inv_"+writetox+"x"+writetoy).css("color", "white");
      $("#inv_"+writetox+"x"+writetoy).css("font-family","Commodore64");
      $("#inv_"+writetox+"x"+writetoy).css("line-height","24px");
      $("#inv_"+writetox+"x"+writetoy).html("<p>" + inventorylist[i].getQuantity() + "</p>");
    }

    if (PC.isEquipped(inventorylist[i])) {
      $("#inv_"+writetox+"x"+writetoy).css("border-color", "#000099");
    }
  }

  invselect = targetCursor.invskiprow*8 + targetCursor.invy*8 + targetCursor.invx;
  writetoy = Math.floor(invselect/8);
  writetox = invselect%8;

  if (invselect < inventorylist.length) {
    if (PC.isEquipped(inventorylist[invselect])) { 
      $("#inv_"+writetox+"x"+writetoy).css("border-color", "#66ccff");
    } else {
      $("#inv_"+writetox+"x"+writetoy).css("border-color", "#ffffff");
    }
  
    var showgraphic = inventorylist[invselect].getGraphicArray();
    $("#inv_image").css("background-image", "url('graphics/" + showgraphic[0] + "')");
    $("#inv_image").css("background-repeat", "no-repeat");
    $("#inv_image").css("background-position", showgraphic[2] + "px " + showgraphic[3] + "px");
    var descname = inventorylist[invselect].getDesc();
    descname = descname.charAt(0).toUpperCase() + descname.slice(1);
    $("#inv_name").html(descname);  
    if (inventorylist[invselect].getQuantity() > 1) {
      $("#inv_name").append(" (" + inventorylist[invselect].getQuantity() + ")"); 
    }
    $("#inv_desc").html(inventorylist[invselect].getLongDesc());
    $("#inv_use").html("Use: " + inventorylist[invselect].getUseDesc());
  } else {
    $("#inv_"+writetox+"x"+writetoy).css("border-color", "#ffffff");
  }

  $("#worldlayer").html("<img src='graphics/spacer.gif' width='416' height='416' />");
  $("#worldlayer").css("background-image", "");
  $("#worldlayer").css("background-color", "black");

}

function PerformInventoryScreen(code, restrict) {
  if ((code === 37) || (code === 186)) {
    if (targetCursor.invx > 0) {
      targetCursor.invx--;
    } else if (targetCursor.command === "z") { return 1; } // off the left edge
  } else if ((code ===39) || (code === 222)) {
    if (targetCursor.invx < 7) {
      targetCursor.invx++;
    } else if (targetCursor.command === "z") { return 1; } // off the right edge
  } else if ((code === 38) || (code === 219)) {
    if (targetCursor.invy > 0) { targetCursor.invy--; }
    else if (targetCursor.invskiprow) {
      targetCursor.invskiprow--;
    }
  } else if ((code === 40) || (code === 191)) {
    if (targetCursor.invy === 4) {
      if (targetCursor.invlength > (targetCursor.invskiprow*8 +40 )) {
        targetCursor.invskiprow++;
      }
    } else {
      targetCursor.invy++;
    }
  } else if ((code === 13) || (code === 32)) {
    // use selected item
    var invselect = targetCursor.invskiprow*8 + targetCursor.invy*8 + targetCursor.invx;
    var inventorylist = MakeInventoryList(restrict);
    var retval = {};
    if (targetCursor.command === "c") {
      // here for Scribe or Mend
      // WORKING HERE
      var tgt = inventorylist[invselect];
      if (tgt) {
        if (targetCursor.spellName === "Mend") {
          retval = PerformMend(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
        } else if (targetCursor.spellName === "AudachtaScribe") {
          retval = PerformAudachtaScribe(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
        }
      } else {
        retval["fin"] = 0;
      }
      delete targetCursor.spelldetails;
      return retval;      
    }
    if (targetCursor.command === "o") {
      if (!CheckOpenAsUse(inventorylist[invselect])) {
        maintext.delayedAddText("You cannot open that.");
        var retval = {};
        retval["fin"] = 0;
        delete targetCursor.itemlist;
        return retval;
      }
    }    
    targetCursor.command = 'u';
    var retval = MakeUseHappen(PC, inventorylist[invselect], "inventory");
    retval["usefin"] = retval["fin"];
    retval["fin"] = 2;
    return retval;
  } else if (code === 34) { 
    if (targetCursor.invy !== 4) { targetCursor.invy = 4; }
    else {
      var invselect = targetCursor.invskiprow*8 + targetCursor.invy*8 + targetCursor.invx;
      var inventorylist = MakeInventoryList(restrict);
      var i=0;
      while(((invselect+8*i) < inventorylist.length) && (i<4)) {
        i++;
      }
      targetCursor.invskiprow += i;
    }
  } else if (code === 33) {
    if (targetCursor.invy !== 0) { targetCursor.invy = 0; }
    else {
      var invselect = targetCursor.invskiprow*8 + targetCursor.invy*8 + targetCursor.invx;
      var inventorylist = MakeInventoryList(restrict);
      var i=0;
      while(((invselect-8*i) >= 0) && (i<4)) {
        i++;
      }
      targetCursor.invskiprow -= i;
    }
  }

  DisplayInventory(restrict);
  return 0;
}

function MakeInventoryList(restrictTo) {
  var inventorylist = {};
  inventorylist.armor = [];
  inventorylist.weapon = [];
  inventorylist.missile = [];
  inventorylist.potion = [];
  inventorylist.scroll = [];
  inventorylist.audachta = [];
  inventorylist.usable = [];
  inventorylist.key = [];
  inventorylist.reagent = [];
  inventorylist.quest = [];
  inventorylist.other = [];
  inventorylist.broken = [];
  inventorylist.total = [];
  var PCinv = PC.getInventory();

  for (var i=0; i<PCinv.length; i++) {
    if (restrictTo === "equip") {
      if (PCinv[i].checkType("armor")) { inventorylist.armor.push(PCinv[i]); }
      else if (PCinv[i].checkType("missile")) { inventorylist.missile.push(PCinv[i]); }
      else if (PCinv[i].checkType("weapon")) { inventorylist.weapon.push(PCinv[i]); }
    } else if (restrictTo === "usable") {
      if (PCinv[i].checkType("potion")) { inventorylist.potion.push(PCinv[i]); }
      else if (PCinv[i].checkType("scroll")) { inventorylist.scroll.push(PCinv[i]); }
      else if (PCinv[i].checkType("audachta")) { inventorylist.audachta.push(PCinv[i]); }
      else if (typeof PCinv[i].use === "function") { inventorylist.usable.push(PCinv[i]); }
    } else if (restrictTo === "audachta") {
      if (PCinv[i].checkType("audachta")) { inventorylist.audachta.push(PCinv[i]); }
    } else if (restrictTo === "broken") {
      if (typeof PCinv[i].getBroken === "function") { 
        if (PCinv[i].getBroken()) {inventorylist.broken.push(PCinv[i]); }
      }
    } else {
      if (PCinv[i].checkType("armor")) { inventorylist.armor.push(PCinv[i]); }
      else if (PCinv[i].checkType("missile")) { inventorylist.missile.push(PCinv[i]); }
      else if (PCinv[i].checkType("weapon")) { inventorylist.weapon.push(PCinv[i]); }
      else if (PCinv[i].checkType("potion")) { inventorylist.potion.push(PCinv[i]); }
      else if (PCinv[i].checkType("scroll")) { inventorylist.scroll.push(PCinv[i]); }
      else if (PCinv[i].checkType("audachta")) { inventorylist.audachta.push(PCinv[i]); }
      else if (PCinv[i].checkType("key")) { inventorylist.key.push(PCinv[i]); }
      else if (PCinv[i].checkType("reagent")) { inventorylist.reagent.push(PCinv[i]); }
      else if (PCinv[i].checkType("quest")) { inventorylist.quest.push(PCinv[i]); }
      else if (PCinv[i].getName() !== "Gold") { inventorylist.other.push(PCinv[i]); }
    }
  }

  if (inventorylist.armor.length) { inventorylist.armor.sort(function(a,b) { return (b.getDefense() - a.getDefense()); }); }
  if (inventorylist.weapon.length) { inventorylist.weapon.sort(function(a,b) { return (b.getAveDamage(PC) - a.getAveDamage(PC)); }); }
  if (inventorylist.missile.length) { inventorylist.missile.sort(function(a,b) { return (b.getAveDamage(PC) - a.getAveDamage(PC)); }); }
  if (inventorylist.potion.length) {
    inventorylist.potion.sort(function(a,b) {
      var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }
  if (inventorylist.key.length) {
    inventorylist.key.sort(function(a,b) {
      var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }
  if (inventorylist.reagent.length) {
    inventorylist.reagent.sort(function(a,b) {
      var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }
  if (inventorylist.quest.length) {
    inventorylist.quest.sort(function(a,b) {
      var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }
  if (inventorylist.usable.length) {
    inventorylist.usable.sort(function(a,b) {
      var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }  
  if (inventorylist.other.length) {
    inventorylist.other.sort(function(a,b) {
      var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }
  if (inventorylist.scroll.length) {
    inventorylist.scroll.sort(function(a,b) {
      var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (a.spelllevel < b.spelllevel) { return -1; }
      if (b.spelllevel < a.spelllevel) { return 1; }
      else {
        if (nameA < nameB) 
          return -1
        if (nameA > nameB)
          return 1
      }
      return 0 
    }); 
  }  
  if (inventorylist.audachta.length) {
    inventorylist.audachta.sort(function(a,b) {
      var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (a.spelllevel < b.spelllevel) { return -1; }
      if (b.spelllevel < a.spelllevel) { return 1; }
      else {
        if (nameA < nameB) 
          return -1
        if (nameA > nameB)
          return 1
      }
      return 0 
    }); 
  }  
  if (inventorylist.broken.length) {
    inventorylist.broken.sort(function(a,b) {
      var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }

  if (inventorylist.armor.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.armor); }
  if (inventorylist.weapon.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.weapon); }
  if (inventorylist.missile.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.missile); }
  if (inventorylist.potion.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.potion); }
  if (inventorylist.scroll.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.scroll); }
  if (inventorylist.audachta.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.audachta); }
  if (inventorylist.usable.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.usable); }
  if (inventorylist.key.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.key); }
  if (inventorylist.reagent.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.reagent); }
  if (inventorylist.quest.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.quest); }
  if (inventorylist.other.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.other); }
  if (inventorylist.broken.length) { Array.prototype.push.apply(inventorylist.total, inventorylist.broken); }
  
  return inventorylist.total;
}
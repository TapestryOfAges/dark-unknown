"use strict";

function PerformCommand(code, ctrl) {
	let retval = { fin: 0 };
  let confusion = PC.getSpellEffectsByName("Confused");
  if (code === 191) {  // / or ?
    ShowHelp();
    gamestate.setMode("showhelp");
    retval["txt"] = "";
    retval["input"] = "&gt;";
    retval["fin"] = 2;	
    targetCursor.command = "/";			
    targetCursor.page = 1;
    targetCursor.scrolllocation = 0;
    return retval;
  }
	if (confusion && (Dice.roll("1d100") > (confusion.getPower()))) {
	  // PC is confused and loses their action because of it
	  retval["txt"] = "You are confused!";
	  retval["fin"] = 1;
	  if (Dice.roll("1d2") === 1) { 
	    // confused and randomly wandering
	    let dir = Dice.roll("1d4");
	    if (dir === 1) { PC.moveMe(0,-1,0); }
	    else if (dir === 2) { PC.moveMe(1,0,0); }
	    else if (dir === 3) { PC.moveMe(0,1,0); }
	    else if (dir === 4) { PC.moveMe(-1,0,0); }
	  }
	  return retval;
  }
	// player has control, continue as normal
	if (code === 38) {   // UP ARROW  
    // move north
    let diso = PC.getSpellEffectsByName("Disoriented");
    if (diso) {
      diso.doEffect();
      retval["fin"] = 1;
      return retval;
    }
    let drunk = PC.getSpellEffectsByName("Drunk");
    if (drunk) {
      let tmp = drunk.doEffect();
      if (tmp["fin"] === 1) { return tmp; }
    }
  
    let success = PC.moveMe(0,-1,0);
		let txt = "Move North";
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
    if (success["fin"] === -3) {
      retval["fin"] = -3; 
      retval["txt"] = "";
    } else if (success["fin"] === 3) {
      retval["fin"] = 3;
    } else if (success["fin"] === 4) {
      retval["fin"] = 4; 
    }
    if (!DU.gameflags.getFlag("show_move")) {
      retval["txt"] = SuppressMove(retval["txt"], "North");
    }
		retval["initdelay"] = success["initdelay"];
	}
	else if (code === 37) {  // LEFT ARROW 
    // move west
    let diso = PC.getSpellEffectsByName("Disoriented");
    if (diso) {
      diso.doEffect();
      retval["fin"] = 1;
      return retval;
    }
    let drunk = PC.getSpellEffectsByName("Drunk");
    if (drunk) {
      let tmp = drunk.doEffect();
      if (tmp["fin"] === 1) { return tmp; }
    }

		let success = PC.moveMe(-1,0,0);
		let txt = "Move West";
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
    if (success["fin"] === -3) {
      retval["fin"] = -3; 
      retval["txt"] = "";
    } else if (success["fin"] === 3) {
      retval["fin"] = 3;
    }
    if (!DU.gameflags.getFlag("show_move")) {
      retval["txt"] = SuppressMove(retval["txt"], "West");
    }
		retval["initdelay"] = success["initdelay"];
	}
	else if (code === 39) { // RIGHT ARROW 
		// move east
    let diso = PC.getSpellEffectsByName("Disoriented");
    if (diso) {
      diso.doEffect();
      retval["fin"] = 1;
      return retval;
    }
    let drunk = PC.getSpellEffectsByName("Drunk");
    if (drunk) {
      let tmp = drunk.doEffect();
      if (tmp["fin"] === 1) { return tmp; }
    }

    let success = PC.moveMe(1,0,0);
		let txt = "Move East";
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
    if (success["fin"] === -3) {
      retval["fin"] = -3; 
      retval["txt"] = "";
    } else if (success["fin"] === 3) {
      retval["fin"] = 3;
    }
    if (!DU.gameflags.getFlag("show_move")) {
      retval["txt"] = SuppressMove(retval["txt"], "East");
    }
		retval["initdelay"] = success["initdelay"];
	}
	else if (code === 40) { // DOWN ARROW 
		// move south
    let diso = PC.getSpellEffectsByName("Disoriented");
    if (diso) {
      diso.doEffect();
      retval["fin"] = 1;
      return retval;
    }
    let drunk = PC.getSpellEffectsByName("Drunk");
    if (drunk) {
      let tmp = drunk.doEffect();
      if (tmp["fin"] === 1) { return tmp; }
    }

    let success = PC.moveMe(0,1,0);
		let txt = "Move South";
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
    if (success["fin"] === -3) {
      retval["fin"] = -3; 
      retval["txt"] = "";
    } else if (success["fin"] === 3) {
      retval["fin"] = 3;
    }
    if (!DU.gameflags.getFlag("show_move")) {
      retval["txt"] = SuppressMove(retval["txt"], "South");
    }
		retval["initdelay"] = success["initdelay"];
	}
	else if (code === 65) { // a
		// attack
    if (PC.getHomeMap().getName().indexOf("abyss") > -1) {
      retval["txt"] = "You cannot do that here.";
      retval["fin"] = 2;
      return retval;
    }

		if (PC.getSpellEffectsByName("Fear")) {
		  retval["txt"] = "You are too afraid!";
		  retval["fin"] = 0;
		  retval["input"] = "&gt;";
		} else {
      let mapscale = PC.getHomeMap().getScale();
  		if (!mapscale) { // on a world map, attack is adjacent only
        gamestate.setMode("choosedir");
        retval["txt"] = "";
        retval["input"] = "&gt; Approach: ";
        retval["fin"] = 2;
        targetCursor.command = "a";
        targetCursor.x = PC.getx();
        targetCursor.y = PC.gety();		  
  		} else {  // on a 1:1 scale map, choose target
	  	  gamestate.setMode("target");
        let setcoords = 0;
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
        targetCursor.targetlimit = (VIEWSIZEX -1)/2;
        targetCursor.targetCenterlimit = 0;
        let displaystats = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
        let xcoord = targetCursor.x - displaystats.leftedge;
        let ycoord = targetCursor.y - displaystats.topedge;
        let tileid = "mainview_" + xcoord + "x" + ycoord;
        targetCursor.tileid = tileid;
        targetCursor.basetile = document.getElementById(tileid).innerHTML;
        document.getElementById(tileid).innerHTML = targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />';
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
    if (PC.getHomeMap().getName().indexOf("abyss") > -1) {
      retval["txt"] = "You cannot do that here.";
      retval["fin"] = 2;
      return retval;
    }

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
    if (PC.getHomeMap().getName().indexOf("abyss") > -1) {
      retval["txt"] = "You cannot do that here.";
      retval["fin"] = 2;
      return retval;
    }

    if (PC.runes.kings || PC.runes.waves || PC.runes.winds || PC.runes.flames) {  // game requires kings first, but let's not assume
      let runepage = CreateRunesPage(1);
      DrawTopbarFrame("<p>Runes</p>");

      document.getElementById('worldlayer').innerHTML = "<img src='graphics/spacer.gif' width='416' height='416' />";
      document.getElementById('worldlayer').style.backgroundImage = "";
      document.getElementById('worldlayer').style.backgroundColor = "black";
      document.getElementById('uiinterface').innerHTML = runepage;
      document.getElementById('uiinterface').style.backgroundColor = "black";
      targetCursor.runeChoice = 1;

      retval["fin"] = 2;
      retval["txt"] = "Focus on which rune?";
      retval["input"] = "&gt; Focus:";
      gamestate.setMode("focus");
    } else {
      retval["txt"] = "You have no runes on which to focus.";
    }

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
   	if (PC.getKnowsInfusion() || ((PC.getHomeMap().getName() === "consolation") && (PC.getx() >= 16) && (PC.getx() <= 17) && (PC.gety() >= 14) && (PC.gety() <= 15))) {
      if (PC.getHomeMap().getName().indexOf("abyss") > -1) {
        retval["txt"] = "You cannot do that here.";
        retval["fin"] = 2;
        return retval;
      }
  
      retval = PerformCast(1);
    } else {
      retval["fin"] = 2;
      retval["txt"] = "You have not yet learned the higher mysteries.";
      retval["input"] = "&gt;";
    }
  }
	else if (code === 74) { // j
		// jimmy lock ?
    // Journal, Quest
    retval = PerformJournal();
		
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
      targetCursor.targetlimit = (VIEWSIZEX -1)/2;
      targetCursor.targetCenterlimit = 0;
      let displaystats = getDisplayCenter(PC.getHomeMap(),targetCursor.x,targetCursor.y);
      let xcoord = targetCursor.x - displaystats.leftedge;
      let ycoord = targetCursor.y - displaystats.topedge;
      let tileid = "mainview_" + xcoord + "x" + ycoord;
      targetCursor.tileid = tileid;
      targetCursor.basetile = document.getElementById(tileid).innerHTML;
      document.getElementById(tileid).innerHTML = targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />';
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
      let song = PC.getHomeMap().getMusic();
      DUPlayMusic(song);
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
    gamestate.setMode("choosesave");
    ShowSaveGames("Select a slot to save in:");
    retval["txt"] = "";
    retval["input"] = "&gt;";
    retval["fin"] = 2;
    targetCursor.command = "q";
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
	    let serialized = JSON.stringify(convlog);  
	    let savescreen = window.open('','savescreen');
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
    targetCursor.targetlimit = (VIEWSIZEX -1)/2;
    targetCursor.targetCenterlimit = 3;

    let edges = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
    let leftedge = targetCursor.x - edges.leftedge;
    let topedge = targetCursor.y - edges.topedge;

    let tileid = "mainview_" + leftedge + "x" + topedge;
    targetCursor.tileid = tileid;
    targetCursor.basetile = document.getElementById(tileid).innerHTML;
    document.getElementById(tileid).innerHTML = targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />';
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
      
      if (Object.keys(ambient).length) { // if ambient is not an empty object
        DecAmbientVol(ambient);
        ambient = {}; 
      }
		}
		else { 
      DU.gameflags.setFlag("sound", 1); 
      retval["txt"] = "Sound effects on.";

      ProcessAmbientNoise(PC.getHomeMap().getTile(PC.getx(),PC.gety()));
    }
    retval["input"] = "&gt;";
    retval["fin"] = 2;
	}
	else if (code === 87) { // w
    // wait, was wear/wield
    let poisoned = PC.getSpellEffectsByName("Poison");
    let waithere = 1;
    if (poisoned) {
      retval["txt"] = "You are poisoned- waiting might be a bad idea.";
      retval["input"] = "&gt;";
      retval["fin"] = 2;
      waithere = 0;
    }
    let tile = PC.getHomeMap().getTile(PC.getx(),PC.gety());
    if ((tile.getTerrain().getName() === "Ocean") || ((tile.getTerrain().getName() === "Water") && !tile.isBridge()) || ((tile.getTerrain().getName() === "Shallows") && !tile.isBridge()) || tile.isHostileTo(PC)) {
      retval["txt"] = "This is not the best place to wait around.";
      retval["input"] = "&gt;";
      retval["fin"] = 2;
      waithere = 0;
    }
    if (waithere) {
      gamestate.setMode("anykey");
      targetCursor.command = 'w';
      retval['input'] = "Wait - how many hours (1-9, S=sunup)? ";
      retval["fin"] = 2;
    }
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
    targetCursor.scrolllocation = 0;
    
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
  let retval = {};
  retval["fin"] = 0;
  let pcmap = PC.getHomeMap();
  if (pcmap.getDesc() === "Combat") {
    let enemies = 0;
    let npcs = pcmap.npcs.getAll();
    for (let idx in npcs) {
      let val = npcs[idx];
      if (val.getAttitude() === "hostile") { enemies = 1; }
    }
    if (enemies === 1) {
      return retval;
    } else {
      let newmap = new GameMap();
			if (maps.getMap(pcmap.getExitToMap())) {
			  DebugWrite("map", "destination map already exists.<br />");
				newmap = maps.getMap(pcmap.getExitToMap());
			} else {
			  DebugWrite("map", "destination map needs to be loaded.<br />");
			  newmap = maps.addMap(pcmap.getExitToMap());
	  	}
  		let tile = MoveBetweenMaps(PC,pcmap,newmap,pcmap.getExitToX(),pcmap.getExitToY());
 			if (tile) {
 			  DebugWrite("map", "Exited from MoveBetweenMaps. New map is " + newmap.getName() + ".<br />");
        retval["canmove"] = 0;
	    	DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
  		  DrawTopbarFrame("<p>" + newmap.getDesc() + "</p>");
 				maintext.addText("<br />Exiting combat.");
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
	let retval = {fin:-1};
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
	let retval = {fin:-1};
	if ((code === 38) || (code === 219)) {   // UP ARROW  or  [
		gamestate.setMode("null");
		let edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		if ((edges.centery - targetCursor.y) < targetCursor.targetlimit) {
		  if ((!targetCursor.targetCenterlimit) || ((PC.y - targetCursor.y) < targetCursor.targetCenterlimit)) {
			  targetCursor.y -= 1;
			  retval["fin"] = 1;		
			}
		}
	}
	else if ((code === 37) || (code === 186)) {  // LEFT ARROW or ;
		gamestate.setMode("null");
		let edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		if ((edges.centerx - targetCursor.x) < targetCursor.targetlimit) {
		  if ((!targetCursor.targetCenterlimit) || ((PC.x - targetCursor.x) < targetCursor.targetCenterlimit)) {
			  targetCursor.x -= 1;
			  retval["fin"] = 1;
			}
		}
	}
	else if ((code === 39) || (code === 222)) { // RIGHT ARROW or '
		gamestate.setMode("null");
		let edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		if ((targetCursor.x - edges.centerx) < targetCursor.targetlimit) {
		  if ((!targetCursor.targetCenterlimit) || ((targetCursor.x - PC.x) < targetCursor.targetCenterlimit)) {
			  targetCursor.x += 1;
			  retval["fin"] = 1;
			}
		}
	}
	else if ((code === 40) || (code === 191)) { // DOWN ARROW or /
		gamestate.setMode("null");
		let edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
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
  let tileid = targetCursor.tileid;
  document.getElementById(tileid).innerHTML = targetCursor.basetile;

  let localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
  let atkwho = localacre.npcs.getTop();
  let retval = {};
  if ((targetCursor.x === PC.getx()) && (targetCursor.y === PC.gety())){ // No self-mutilation!
    retval["txt"] = "";
    retval["fin"] = 0;  
    retval["input"] = "&gt;";
    return retval;
  }  
  if (!atkwho) {  // nothing there
    let fea = localacre.features.getTop();
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
  if (atkwho.getAttitude() === "hostile") {
    retval = Attack(who, atkwho);
  } else if ((atkwho.getNPCName() === "Garrick") && DU.gameflags.getFlag("garrick_flipout") && !DU.gameflags.getFlag("garrick_surrender")) {
    retval = Attack(who, atkwho);
  } else {
    retval["txt"] = "Your target is not hostile to you. Are you sure?";
    retval["input"] = "(Y/N) &gt;";
    retval["fin"] = 3;
    gamestate.setMode("singleletter");
  }
  return retval;
}

function PerformAttackMap(who) {
  let localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
  let atkwho = localacre.npcs.getTop();
  let retval = {};
  if (atkwho) { // there's something there!
    if (atkwho.overridecombat) {
      let combatmapname = atkwho.overridecombat;
      let newmap = new GameMap();
      newmap = maps.addMap(combatmapname);

      MoveBetweenMaps(PC,PC.getHomeMap(),newmap, newmap.getEnterX(), newmap.getEnterY());
      retval["txt"] = "Approach: " + atkwho.getDesc() + ".";
    } else {
      let combatmapname = GetCombatMap(who,atkwho);
      let newmap = new GameMap();
      newmap = maps.addMap(combatmapname);

      if ((!atkwho.special) || (!atkwho.special.includes("remain"))) {
        PC.getHomeMap().deleteThing(atkwho);
        let spawner=atkwho.getSpawnedBy();
        if (spawner) {
          spawner.deleteSpawned(atkwho);
        }

        DUTime.removeEntityFrom(atkwho);
      }

      let monsters = PlaceMonsters(newmap,atkwho,1);
      let desttile = MoveBetweenMaps(PC,PC.getHomeMap(),newmap, newmap.getEnterX(), newmap.getEnterY());
      retval["txt"] = "Approach: " + atkwho.getDesc() + ". Attack!";
    }
    
    PC.lastAttackedx = targetCursor.x;
    PC.lastAttackedy = targetCursor.y;
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    retval["fin"] = 0;
    retval["input"] = "&gt;";
    // as if retval = 1, but set to PC turn

  } else {
    retval["txt"] = "There is nothing to approach there.";
    retval["fin"] = 0;
    retval["input"] = "&gt;";
  }  
  return retval;
}

function PerformCast(infuse) {
  gamestate.setMode("spellbook");
  delete targetCursor.castFrom;
  PC.setInfusion(infuse);
  let hasSpellbook = 0;
  let retval = {};
  for (let lvl=1; lvl <= 8; lvl++) {
    if (hasSpellbook) { break; }
    for (let i=1; i <= 8; i++) {
      let spellnum = GetSpellID(i);
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
  
  let castermap = PC.getHomeMap();
  if (DU.gameflags.getFlag("negate")[castermap.getName()]) {
    retval["txt"] = "Cast - Magic has been negated, you cannot cast spells here.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
    gamestate.setMode("player");
    
    return retval;
  }
//  var myOpen=function(hash){ hash.w.css('opacity',0.95).show(); };
//  $('#spellbookdiv').jqm({onShow:myOpen,modal:true}); 
//  $('#spellbookdiv').jqmShow();
  document.getElementById('spellbookdiv').style.display = "block";
  WritePages();
  DUPlaySound("sfx_paper");

  retval["fin"] = 2;
  retval["input"] = "&gt; Cast - "
  return retval;

}

function PerformSpellbook(code) {
  let retval = {fin:0};
  if ((code === 38) || (code === 219)) { // up
    let lvl = PC.getLastSpellLevel();
    let spell = PC.getLastSpell();
    for (let i=spell-1;i>=0;i--) {
      if (PC.knowsSpell(lvl,GetSpellID(i))) {
        HighlightSpell(lvl,i);
        PC.setLastSpell(i);
        WriteSpellDesc();   
        return retval;
      }
    }

    return retval;
  }

  if ((code === 40) || (code === 191)) { // down
    let lvl = PC.getLastSpellLevel();
    let spell = PC.getLastSpell();
    for (let i=spell+1;i<=8;i++) {
      if (PC.knowsSpell(lvl,GetSpellID(i))) {
        HighlightSpell(lvl,i);
        PC.setLastSpell(i);
        WriteSpellDesc();   
        return retval;
      }
    }
    retval["fin"] = 0;
    return retval;
  }
  
  if ((code === 37) || (code === 186) || (code === 39) || (code === 222)) { // left or right
    let lvl = PC.getLastSpellLevel();
    let spell = PC.getLastSpell();
    let lvldiff = 0;
    let newlvl = lvl;
    if ((code === 37) || (code === 186)) { // left
      lvldiff = -1;
    }
    if ((code === 39) || (code === 222)) { // right
      lvldiff = 1;
    }
    // figure out how many spells down we are
    let spindex = 0;
    let spellsdown = 0;
    if (!spell) {
      spell = 1;
    }
    for (let i=1; i<=spell; i++) {
      if (PC.knowsSpell(lvl, GetSpellID(i))) { spellsdown++; }
    }

    let lastknown = 0;
    while (!spindex && (newlvl+lvldiff >= 1) && (newlvl+lvldiff <= 8)) {
      newlvl += lvldiff;
      let numspells = 0;
      for (let i=1; i<=8; i++) {
        if (PC.knowsSpell(newlvl,GetSpellID(i))) {
          lastknown = i;
          numspells++;
          if (numspells === spellsdown) {
            spindex = i;
          }
        }
      }
      if (!spindex) { spindex = lastknown; }
    }
    if (spindex) {
      PC.setLastSpellLevel(newlvl);
      PC.setLastSpell(spindex);
      WritePages();
    }
    retval["fin"] = 0;
    return retval;    
  }
  if ((code === 32) || (code === 13)) { // SPACE or ENTER
    // cast a spell
    let lvl = PC.getLastSpellLevel();
    if ((lvl > 5) && (PC.getInfusion())) {
      let retval = {};
      retval["fin"] = 2;
      retval["input"] = "&gt;";
      maintext.addText("Cannot infuse spells of level 6 or higher.");
      return retval;
    }
    let spellnum = PC.getLastSpell();
    document.getElementById('spellbookdiv').style.display = "none";
    let spelltxt = "Cast: " + magic[lvl][GetSpellID(spellnum)].getName();
    if (PC.getInfusion()) {
      spelltxt += " (Infused)";
    }
    let manacost = magic[lvl][GetSpellID(spellnum)].getManaCost(PC.getInfusion());
    if (lvl > PC.getLevel()) {
      spelltxt += "...";
      maintext.addText(spelltxt);
      maintext.addText("That spell's power is beyond you.");
      let retval = {};
      retval["fin"] = 2;
      retval["input"] = "&gt;";
      return retval;
    }      
//    if (lvl*3 > PC.getInt()) {
//      spelltxt += "...";
//      maintext.addText(spelltxt);
//      maintext.addText("Your intelligence is insufficient to cast that spell.");
//      let retval = {};
//      retval["fin"] = 2;
//      retval["input"] = "&gt;";
//      return retval;      
//    }
    if (PC.getMana() >= manacost) {
      spelltxt += "!";
      maintext.addText(spelltxt);
      let retval = magic[lvl][GetSpellID(spellnum)].executeSpell(PC, PC.getInfusion(), 0);
      DrawCharFrame();
      return retval;
    }
    else {
      spelltxt += "...";
      maintext.addText(spelltxt);
      maintext.addText("Not enough mana.");
      let retval = {};
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
	let txt = "";
  let seethis = "";
  let map = PC.getHomeMap();
  let boundaries = getDisplayCenter(map,PC.getx(),PC.gety());
  let xcoord = targetCursor.x - boundaries.leftedge;
  let ycoord = targetCursor.y - boundaries.topedge;
  let onscreen = document.getElementById('mainview_' + xcoord + 'x' + ycoord).innerHTML;
  let losval = 0;
  if (onscreen.indexOf("You cannot see that") !== -1) { losval = 1; }
  else {
    let tile = map.getTile(targetCursor.x,targetCursor.y);
    let light = tile.getLocalLight();
    light += map.getAmbientLight();
    if (light < SHADOW_THRESHOLD) {
      losval = 1;
    }
  }

  if (losval >= LOS_THRESHOLD) { 
  	let retval = {};
  	retval["txt"] = "You cannot see that.";
  	retval["fin"] = 2;
  	retval["input"] = "&gt;";
    let tileid = targetCursor.tileid;
    document.getElementById(tileid).innerHTML = targetCursor.basetile;

  	return retval;
  }
  let tile = map.getTile(targetCursor.x,targetCursor.y);
  if ((targetCursor.x === PC.getx())	&& (targetCursor.y === PC.gety())) {
  	txt = "You are standing on ";
  } else {
  	txt = "You see ";
  }
  let top = tile.getTop();
  while (top.getName() === "SeeBelow") {
    let result = FindBelow(targetCursor.x,targetCursor.y,map);
    tile = result.tile;
    top = tile.getTop();
  }
  let npcs = tile.getNPCs();
  if (npcs.length > 0) {
  	for (let i=(npcs.length-1) ; i >= 0; i-- ) {
  		if (seethis == "") { seethis = npcs[i].getFullDesc(); }
  		else { seethis += ", " + npcs[i].getFullDesc(); }
  	}
  }
  let features = tile.getFeatures();
  let len = features.length;
  if (len > 0) {
  	for (let i=(len-1); i >= 0; i-- ) {
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
  	let terrain = tile.getTerrain();
  	seethis = terrain.getPrefix() + " " + terrain.getDesc();
  }
  if (seethis == "") { alert("How are we here? command."); }
  
  txt += seethis + ".";
  let tileid = targetCursor.tileid;
  document.getElementById(tileid).innerHTML = targetCursor.basetile; 
  
  let retval = {};
  retval["txt"] = txt;
  retval["fin"] = 2;
  retval["input"] = "&gt;";
  
  return retval;
}

function PerformEnter(cmd) {
  let oldmap = PC.getHomeMap();
	let here = oldmap.getTile(PC.getx(),PC.gety());
	let features = here.getFeatures();
	let destination;
	let destx;
	let desty;
	let klimb = "";
	let descend = "";
	let retval = {};
	if (features.length > 0) {
		for (let i=0; i < features.length; i++) {
			if ((typeof features[i].getEnterMap === "function") && (features[i].getEnterMap())) {
				let mapdata = features[i].getEnterMap();
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
	if (!destination && !PC.getHomeMap().getScale()) {  // check for mobile scenes- only on world scale maps
	  for (let xx=PC.getx()-1;xx<=PC.getx()+1;xx++) {
	    for (let yy=PC.gety()-1;yy<=PC.gety()+1;yy++) {
	      if ((xx > -1) && (yy > -1)) {
	        let topthing = PC.getHomeMap().getTile(xx,yy).getTop();
	        if (topthing.enterable) {
   					let mapdata = topthing.getEnterMap();
		    		destination = mapdata["entermap"];
				  	destx = mapdata["enterx"];
				    desty = mapdata["entery"];
		      }
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

    let prevstate = gamestate.getMode();
    gamestate.setMode("saving");
    gamestate.saveGame(0);
    gamestate.setMode(prevstate);
    
		let newmap = new GameMap();
		if (maps.getMap(destination)) {
			newmap = maps.getMap(destination);
		} else {
			newmap = maps.addMap(destination);
		}
    // check for someone in the way at destination
    
		if (oldmap.linkedMaps.includes(newmap.getName())) {
		  let desttile = newmap.getTile(destx,desty);
		  if (desttile.getTopNPC()) { // there's someone in the way and it's a linked map
		    retval["fin"] = 2;
		    retval["txt"] = "There is something in the way!";
		    retval["input"] = "&gt;";
		    return retval;
		  }
		} else {
		  let desttile = newmap.getTile(destx,desty);
		  if (desttile.getTopNPC()) { // there's someone in the way and it's not a linked map
        let npcs = desttile.getNPCs();
        while (npcs.length) {
          PushOff(desttile.getTopNPC());
          npcs = desttile.getNPCs();
        }
      }
    }			  
    let tile = MoveBetweenMaps(PC,PC.getHomeMap(),newmap, destx, desty);
    AdjustStartingLocations(newmap);
    retval["txt"] = "Entering " + newmap.getDesc() + ".";
    retval["input"] = "&gt;";
		if (descend != "") {
			retval["txt"] = descend;
		} else if (klimb != "") {
			retval["txt"] = klimb;
    }
    if ((newmap.getLongDesc()) && (!DU.gameflags.getFlag(newmap.getName() + "_visited"))) {
      let longdesc = newmap.getLongDesc();
      longdesc = longdesc.replace("%%","<br />");
      longdesc = "<span class='sysconv'>" + longdesc + "</span>";
      maintext.delayedAddText(longdesc);
      DU.gameflags.setFlag(newmap.getName() + "_visited", 1);
    }
		DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
		DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
			
	}
	return retval;
}

function PerformFocus(code) {
  let retval = {};
  if (code === 27) { // ESC
    delete targetCursor.runeChoice;
    retval["fin"] = 0;
    retval["input"] = "&gt;";
    retval["txt"] = "None.";
    return retval;
  }
  if ((code === 32) || (code === 13)) {
    return PerformRuneChoice();
  }
  if ((code ===39) && (targetCursor.runeChoice === 1) && (PC.runes.waves)) {
    targetCursor.runeChoice = 2;
  } else if ((code === 39) && (targetCursor.runeChoice === 3) && (PC.runes.flames)) {
    targetCursor.runeChoice = 4; 
  } else if ((code === 39) && (targetCursor.runeChoice === 1) && (PC.runes.flames) && (!PC.runes.waves) && (!PC.runes.winds)) {
    targetCursor.runeChoice = 4;
  } else if ((code === 37) && (targetCursor.runeChoice === 2) && (PC.runes.kings)) {
    targetCursor.runeChoice = 1;
  } else if ((code === 37) && (targetCursor.runeChoice === 4) && (PC.runes.winds)) {
    targetCursor.runeChoice = 3;
  } else if ((code === 37) && (targetCursor.runeChoice === 4) && (PC.runes.kings) && (!PC.runes.waves) && (!PC.runes.winds)) {
    targetCursor.runeChoice = 1;
  } else if ((code === 38) && (targetCursor.runeChoice === 3) && (PC.runes.kings)) {
    targetCursor.runeChoice = 1;
  } else if ((code === 38) && (targetCursor.runeChoice === 4) && (PC.runes.waves)) {
    targetCursor.runeChoice = 2;
  } else if ((code === 38) && (targetCursor.runeChoice === 4) && (PC.runes.kings) && (!PC.runes.waves) && (!PC.runes.winds)) {
    targetCursor.runeChoice = 1;
  } else if ((code === 40) && (targetCursor.runeChoice === 1) && (PC.runes.winds)) {
    targetCursor.runeChoice = 3;
  } else if ((code === 40) && (targetCursor.runeChoice === 2) && (PC.runes.flames)) {
    targetCursor.runeChoice = 4;
  } else if ((code === 40) && (targetCursor.runeChoice === 1) && (PC.runes.flames) && (!PC.runes.winds) && (!PC.runes.waves)) {
    targetCursor.runeChoice = 4;
  }
  let runepage = CreateRunesPage(targetCursor.runeChoice);
  document.getElementById('uiinterface').innerHTML = runepage;
  retval["fin"] = 2;
  return retval;
}

function PerformRuneChoice() {
  let retval = {fin: 1, txt: ""};

  document.getElementById('uiinterface').innerHTML = "";
  document.getElementById('uiinterface').style.backgroundColor = "";
  let themap = PC.getHomeMap();

  if (targetCursor.runeChoice === 1) { 
    // The Rune of Kings
    // Always heals you some. In certain locations, may also reveal things.
    // If near the Prince and he is in a coma, heals and wakes him
    Earthquake();
    DUPlaySound("sfx_earthquake");

    if (themap.getName() === "darkunknown") {
      if (((PC.getx() === 27) && (PC.gety() === 28)) || ((PC.getx() === 26) && (PC.gety() === 29)) || ((PC.getx() === 28) && (PC.gety() === 29)) || ((PC.getx() >= 25) && (PC.getx() <= 28) && (PC.gety() === 30)) || ((PC.getx() >=25) && (PC.getx() <= 27) && (PC.gety() === 31))) {
        // open entrance to grotto
        let cave = localFactory.createTile("Cave");
        cave.setEnterMap("grotto", 22, 53);
        themap.placeThing(27,30,cave);
        DrawMainFrame("one",PC.getHomeMap(),27,30);
        retval["txt"] = "A cave entrance is revealed!";
        return retval;
      } else if ((PC.getx() === 100) && (PC.gety() === 57)) {
        let tile = themap.getTile(112,67);
        let oldgate = tile.getTopFeature();
        if (oldgate && (oldgate.getName() === "Moongate")) {
          themap.deleteThing(oldgate);
        }
        
        PC.getHomeMap().moveThing(111,67,user);
        DrawMainFrame("draw", themap, user.getx(), user.gety());
        // teleport to entrance to air
        setTimeout(function() {
          let moongate = localFactory.createTile("Moongate");
          moongate.destmap = "skypalace";
          moongate.destx = 47;
          moongate.desty = 49;
          themap.placeThing(112,67,moongate);
          AnimateMoongate(moongate,0,"up",300,0,1);
        }, 500);

      } else {
        // no effect
      }
    } else if ((themap.getName() === "volcano") && (GetDistance(PC.getx(), PC.gety(), 27,21) < 5)) {
      let cave = localFactory.createTile("Cave");
      cave.setEnterMap("lavatubes", 27, 18);   // make tubes!
      let nillavatile = themap.getTile(27,21);
      let nillava = nillavatile.getTopFeature();
      if (nillava && (nillave.getName() === "Lava")) {
        themap.deleteThing(nillava);
      }
      
      themap.placeThing(27,21,cave);
      DrawMainFrame("one",PC.getHomeMap(),27,21);
      retval["txt"] = "A tunnel into the caldera is exposed!";
      return retval;
        
    } else if ((themap.getName().includes("blackdragon")) && DU.gameflags.getFlag("act2") && !DU.gameflags.getFlag("prince_awake")) {
      let lance = FindNPCByName("Prince Lance",PC.getHomeMap());
      // WORKING HERE - wake prince plot
      // needs to add flag "prince_awake" and wake prince up; if he is awake and it's act 2 he can switch to a new schedule once the 
      // player re-enters the keep, but in the meantime this will wake but he'll stay in the bed.  
      if (IsAdjacent(PC,lance)) {
        lance.setConversation("lance_awaken");
        delete lance.flags.sleep;  // He'll go back to sleep at the end of the conversation
        retval["txt"] = "You reach for the earth... and it reaches back. But you then, carefully, redirect the earth's energies to your brother, lying wan and sickly beside you. As the warm power reaches him, you see color return to his face. He takes a sudden breath and his eyes open.";
        PC.forcedTalk = lance;
      }
    } else if (themap.getName() === "kaltonmine3") {
      if ((PC.getx() <=16) && (PC.gety() >= 22)) {
        if (!DU.getflags.getFlag("rune_gems")) {
          let alreadydone = 0;
          let fea = themap.features.getAll();
          for (let i=0;i<fea.length;i++) {
            // checks to see if you've used the rune and are trying to use it again while gems litter the floor
            if (fea[i].getName() === "UncutLargeRuby") { alreadydone = 1; }
          }
          if (!alreadydone) {
            let gems = localFactory.createTile("UncutLargeRuby");
            themap.placeThing(6,27,gems);
            gems = localFactory.createTile("UncutRuby");
            themap.placeThing(9,26,gems);
            gems = localFactory.createTile("UncutRuby");
            themap.placeThing(12,23,gems);
            gems = localFactory.createTile("UncutSapphire");
            themap.placeThing(8,25,gems);
            gems = localFactory.createTile("UncutGems");
            themap.placeThing(13,25,gems);
          }
        }
        DrawMainFrame("draw",themap,PC.getx(),PC.gety());
        Earthquake();
        DUPlaySound("sfx_earthquake");
      }
    }
    if (PC.getHP() < PC.getMaxHP()) {
      if (PC.runes.void) {
        PC.healMe(PC.getMaxHP(), PC);
      } else {
        PC.healMe(PC.getMaxHP()*.5, PC);
      }
      if (retval["txt"]) { retval["txt"] += "<br />"; }
      retval["txt"] += "You reach for the earth below... and it reaches back. You feel better!<br />It will be some time before you can do that again.";
      PC.setRuneCooldown("kings",144);  // 12 hours
    } else {
      if (retval["txt"]) { retval["txt"] += "<br />"; }
      retval["txt"] += "You feel the warm touch of the earth below your feet, but do not currently need its help with healing.";
    }

  } else if (targetCursor.runeChoice === 2) { 
    // The Rune of Waves

    // first whirlpool goes away
    let feas = themap.features.getAll();
    let wp;
    let formed = 0;
    for (let i=0;i<feas.length;i++) {
      if (feas[i].getName() === "Whirlpool") {
        let wpx = feas[i].getx();
        let wpy = feas[i].gety();
        themap.deleteThing(feas[i]);
        DrawMainFrame("one",themap,wpx,wpy);
        wp = 1;
      }
    }
    if (!wp && (themap.getName() !== "darkunknown")) {
      let worldmap = maps.getMap("darkunknown");
      feas = worldmap.features.getAll();
      for (let i=0;i<feas.length;i++) {
        if (feas[i].getName() === "Whirlpool") {
          let wpx = feas[i].getx();
          let wpy = feas[i].gety();
          worldmap.deleteThing(feas[i]);
        }
      }
    }

    if (!themap.getUnderground()) {  // can't summon a whirlpool while underground, that would be silly
      let nearbywater = 0;
      let nearwaterlist = {};
      let IsRightWater = function(terr) {
        if ((terr.getName() === "Water") || (terr.getName() === "Shallows")) { return 1; }
      }
      
      for (let i=-1;i<=1;i++) {
        for (let j=-1;j<=1;j++) {
          let px = PC.getx()+i;
          let py = PC.gety()+j;
          let tile = themap.getTile(px,py);
          if ((tile !== "OoB") && (IsRightWater(tile.getTerrain()))) { 
            nearbywater = 1; 
            nearwaterlist[px][py] = 1;
          }
        }
      }

      let farawaywater = 0;
      if (nearbywater) {
        let farwaterlist = [];
        Object.keys(nearwaterlist).forEach(key => {
          Object.keys(nearwaterlist[key]).forEach(innerkey => {
            for (let i=-1;i<=1;i++) {
              for (let j=-1;j<=1;j++) {
                let tile = themap.getTile(key+i,innerkey+j);
                if ((tile !== "OoB") && (IsRightWater(tile.getTerrain()))) {
                  if (GetDistance(PC.getx(),PC.gety(),key+i,innerkey+j,"square") === 2) {
                    let tx = key+i;
                    let ty = innerkey+j;
                    farwaterlist.push(`${tx},${ty}`);
                    farawaywater = 1;
                  }
                }
              }
            }
          });
        });
      }
      if (farawaywater) {
        let opts = farwaterlist.length;
        let opt = Dice.roll(`1d${opts}-1`);

        let whirlpool = localFactory.createTile("Whirlpool");

        let coords = split(",", farwaterlist[opt]);
        themap.placeThing(coords[0],coords[1],whirlpool);

        PC.whirlx = coords[0];
        PC.whirly = coords[1];
        PC.whirlmap = themap.getName();

        DUPlaySound("sfx_create_whirlpool");
        retval["txt"] = "You call upon the waves to provide what you need... and slowly, a whirlpool forms!";
        formed = 1;

        questlog.complete(79);
        CheckOracleQuest();
      } 

    }

    // Regardless of whether it summoned a whirlpool, also restore some mana
    if (PC.getMana() < PC.getMaxMana()) {
      let rettxt = "You call upon the water that flows without. You feel a surge of power!<br />It will be some time before you can do that again.";
      if (formed) { rettxt = "You feel a surge of power!<br />It will be some time before you can do that again."; }  
      if (retval["txt"]) {
        retval["txt"] += "<br />" + rettxt;
      } else {
        retval["txt"] = rettxt;
      }
      if (PC.runes.void) {
        PC.modMana(PC.getLevel());
      } else {
        PC.modMana(2*PC.getLevel());
      }
      PC.setRuneCooldown("waves",144);  // 12 hours
    }

  } else if (targetCursor.runeChoice === 3) {
    // The Rune of Winds
    let distance = PC.rune.void ? 3 : 2; 

    let PushBack = function(where, dir) {
      let tile = themap.getTile(where[0],where[1]);
      if (tile !== "OoB") {
        let who = tile.getTopNPC();
        let desttile = who.getHomeMap().getTile(who.getx()+dir[0], who.gety()+dir[1]);
        if (desttile !== "OoB") {
          who.moveMe(dir[0],dir[1]);
        }
      }
    }

    PushBack([PC.getx()-1,PC.gety()-2],[0,-1]);
    PushBack([PC.getx(),PC.gety()-2],[0,-1]);
    PushBack([PC.getx()+1,PC.gety()-2],[0,-1]);
    PushBack([PC.getx()+2,PC.gety()-1],[1,0]);
    PushBack([PC.getx()+2,PC.gety()],[1,0]);
    PushBack([PC.getx()+2,PC.gety()+1],[1,0]);
    PushBack([PC.getx()-1,PC.gety()+2],[0,1]);
    PushBack([PC.getx(),PC.gety()+2],[0,1]);
    PushBack([PC.getx()+1,PC.gety()+2],[0,1]);
    PushBack([PC.getx()-2,PC.gety()-1],[-1,0]);
    PushBack([PC.getx()-2,PC.gety()],[-1,0]);
    PushBack([PC.getx()-2,PC.gety()+1],[-1,0]);

    retval["txt"] = "You call upon the air above, and the winds swirl powerfully around you.<br />It will be some time before you can do that again.";

    PC.setRuneCooldown("winds",144);  // 12 hours

  } else if (targetCursor.runeChoice === 4) {
    let fs = PC.checkInventory("FrozenSunlight");
    if (fs && !fs.stabilized) {
      fs.stabilized = 1;
      retval["txt"] += "You hold the frozen sunlight in the palm of your hand, and reach out with the power of your mastery over fire. The sunlight, which had been fading and dissolving as you watched, solidifies into a stable form.";
    } else {
      let flip = Dice.roll("1d2");
      if (flip === 1) {
        // cast Fire Armor with more power than is possible by spell
        retval["txt"] = "You call upon the fire that burns within. It manifests around you, encapsulating you within a protective shell.";
        let prot = localFactory.createTile("FireArmor");
        let duration = 80 * SCALE_TIME;
        let power = DMG_MEDIUM;
        let endtime = duration + DUTime.getGameClock();
        DebugWrite("magic", "End time is " + endtime + ".<br />");
        prot.setExpiresTime(endtime);
        prot.setPower(power);
        PC.addSpellEffect(prot, Math.max(0, free) );
        ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
        PlayCastSound(caster,"sfx_flame_armor");
      } else if (flip === 2) {  // not putting else here to remind me to add more options if I think of them
        retval["txt"] = "You call upon the fire that burns within. You feel it stir, and lash out at your enemies.<br />It will be some time before you can do that again.";
        // cast Conflagration
        magic[SPELL_CONFLAGRATION_LEVEL][SPELL_CONFLAGRATION_ID].executeSpell(PC, 0, 1);
      }
      PC.setRuneCooldown("flames",144);  // 12 hours
    }
  }
  delete targetCursor.runeChoice;
  return retval;
}

function PerformGet(who, getitem) {
  if (!getitem) {
    let localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
    getitem = localacre.features.getTop();
  }
  let retval = { txt:"", fin:1};
  if (!getitem) {
    retval["txt"] = "There is nothing there.";
    retval["fin"] = 0;
    return retval;    
  } 
  else if (getitem.checkType("Item")) {
    let itemmap = getitem.getHomeMap();
    let onget = {};
    if (typeof getitem.onGet === "function") {
      onget = getitem.onGet(who);
    }
    if (getitem.noTake || onget.noTake) {
      retval["fin"] = 0;
      if ((getitem.prompt || onget.prompt) && !DU.gameflags.getFlag("skip_theft_warning")) {
        retval["fin"] = 3; 
        targetCursor.command = "g";
        targetCursor.getitem = getitem;
      }
    } else {
      who.addToInventory(getitem);
      retval["txt"] = "Taken: " + getitem.getPrefix() + " " + getitem.getDesc() + ".";
      if (getitem.karmaPenalty) {
        who.diffKarma(-getitem.karmaPenalty);
      }
    }
    if (onget["txt"]) {
      if (retval["txt"]) { retval["txt"] = retval["txt"] + "<br />"; }
      retval["txt"] = retval["txt"] + onget["txt"];
    }
    if (!onget.noTake && (itemmap === PC.getHomeMap())) {
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

function PerformJournal() {
  gamestate.setMode("journal");
  let retval = {};
  retval["txt"] = "";
  retval["input"] = "&gt; Journal- ";
  retval["fin"] = 2;	
  targetCursor.command = "j";			
  targetCursor.page = 1;
  targetCursor.scrolllocation = 0;

  let journaltitles = "<div class='journalpage' style='top:10px; left:5px;'><table cellpadding='2' cellspacing='0' border='0' style='width:100%'>";
  journaltitles += "<tr><td style='text-align:center;color:yellow' id='questtitletype'>Main Quests</td></tr>";
  for (let i=0; i<8; i++) {
    journaltitles += "<tr><td id='questtitle" + i + "'></td></tr>"
  }
  journaltitles += "</table></div>";
  let journaldetails = "<div class='journalpage' style='top:10px; left:210px;'><table cellpadding='2' cellspacing='0' border='0' style='width:100%'>";
  journaldetails += "<tr><td style='text-align:center;color:yellow' id='questdesctype'>Quest Description</td></tr>";
  journaldetails += "<tr><td id='questdesc'></td></tr>";
  journaldetails += "</table></div>";

  document.getElementById('worldlayer').innerHTML = "<img src='graphics/spacer.gif' width='416' height='416' />";
  document.getElementById('worldlayer').style.backgroundImage = "";
  document.getElementById('worldlayer').style.backgroundColor = "black";
  document.getElementById('uiinterface').innerHTML = journaltitles + journaldetails;
  document.getElementById('uiinterface').style.backgroundColor = "black";

  FillInJournal();

  return retval;
}

function FillInJournal() {
  let journallist = [];
  for (let i=0;i<8;i++) {
    document.getElementById("questtitle"+i).innerHTML = "";
  }
  document.getElementById("questdesc").innerHTML = "";
  if (targetCursor.page === 1) { document.getElementById("questtitletype").innerHTML = "Main Quests"; }
  if (targetCursor.page === 2) { document.getElementById("questtitletype").innerHTML = "Side Quests"; }
  if (targetCursor.page === 3) { document.getElementById("questtitletype").innerHTML = "Completed Main Quests"; }
  if (targetCursor.page === 4) { document.getElementById("questtitletype").innerHTML = "Completed Side Quests"; }
  for (let i=0;i<questlog.log.length;i++) {
    if ((targetCursor.page === 1) && (questlog.log[i].active) && (questlist[questlog.log[i].questnum].category === "main")) {
      journallist.push(questlist[questlog.log[i].questnum]);
    } else if ((targetCursor.page === 2) && (questlog.log[i].active) && (questlist[questlog.log[i].questnum].category === "side")) {
      journallist.push(questlist[questlog.log[i].questnum]);
    } else if ((targetCursor.page === 3) && (questlog.log[i].completed) && (!questlog.log[i].replaced) && (questlist[questlog.log[i].questnum].category === "main")) {
      journallist.push(questlist[questlog.log[i].questnum]);
    } else if ((targetCursor.page === 4) && (questlog.log[i].completed) && (!questlog.log[i].replaced) && (questlist[questlog.log[i].questnum].category === "side")) {
      journallist.push(questlist[questlog.log[i].questnum]);
    }
  }
  
  if (journallist.length === 0) { return; }
  if (targetCursor.scrolllocation >= journallist.length) { targetCursor.scrolllocation = journallist.length-1; }
  let firstentry = Math.max(targetCursor.scrolllocation - 6, 0);
  let lastentry = Math.min(firstentry+7,journallist.length-1);
  let idx = 0;
  for (let i=firstentry; i<=lastentry; i++) {
    let highlight = "";
    let qtype = "";
    if (targetCursor.page >= 3) { qtype = "completed"; }
    if (i===targetCursor.scrolllocation) {
      highlight = "<span style='color:black;background-color:white'>";
      document.getElementById("questdesc").innerHTML = "<span style='color:yellow'>SOURCE:</span><br />" + journallist[i].source + "<br />";
      document.getElementById("questdesc").innerHTML += "<span style='color:yellow'>LOCATION RECEIVED:</span><br />" + journallist[i].location + "<br /><br />";
      document.getElementById("questdesc").innerHTML += `${journallist[i].getText(qtype)}`;
    }
    document.getElementById("questtitle"+idx).innerHTML = highlight + journallist[i].name;
    if (highlight) { document.getElementById("questtitle"+idx).innerHTML += "</span>"; }
    idx++;
  }
}

function PerformPush(who) {
  let retval = {fin:3, input:"&gt;"};
  let localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
  let blocker = localacre.getTopNPC();
  if (!blocker) { blocker = localacre.getTopPC(); }
  if (blocker) {
    blocker.pushed = 1;
    retval["txt"] = "Push: There is something in the way.";
    return retval;
  }
  let pushit = localacre.features.getTop();
  if (!pushit) { 
    retval["txt"] = "Push: Nothing there.";
    return retval; 
  }
  if (pushit.pushable) {
    return pushit.pushMe(who);
  }
  
  return {fin:1, input:"&gt;", txt: "That won't budge!"};
}

function PerformSearch(who) {
  let localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
  let searched = localacre.features.getTop();
  let retval = {fin:1};
  if (!searched) {
		retval["txt"] = "Search: There is nothing there.";
		retval["fin"] = 0;
		return retval;
	}
  if ("onSearched" in searched) {
    let searchresult = searched.onSearched(who);
    if (searchresult.exitOut) {
      return searchresult;
    }
  }
	if (searched.isContainer) {  // add doors to the list
	  // search for traps and such rather than searching for items
	  if (searched.trapped && (who.getInt() >= searched.trapchallenge-5)) {
	    let descriptor = "complex ";
	    if (who.getDex() >= searched.trapchallenge+6) { // 80% chance to disarm
	      descriptor = "simple ";
	    } else if (who.getDex() <= searched.trapchallenge-6) { // 20% chance or worse
	      descriptor = "challenging ";
	    }
	    retval["txt"] = "Search: You find a " + descriptor + "trap!";
	    searched.setDesc(searched.getDesc() + " [Trap (" + descriptor + ")]");
      searched.trapchallenge = searched.trapchallenge - 5;
	    // finding a trap reduces the challenge of removing it
	  } else {
	    retval["txt"] = "Search: You find nothing there.";
	    searched.searched = 1;
	  }
	  return retval;
	}
  else if ((searched.getSearchYield().length)) {
    let stuff = searched.getSearchYield();
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
      if (searched.getAlternateSearchText()) { retval["txt"] = searched.getAlternateSearchText(); }
      retval["fin"] = 1;
      if (stuff.length) {
        for (let i=0; i<stuff.length; i++) {
          let goldtest = /\d+Gold/;
          if (goldtest.test(stuff[i])) {
            let amt = goldtest.exec(stuff[i]);
            searched.setGold(amt[1]);
            stuff[i] = "Gold";
          }
          let newthing = localFactory.createTile(stuff[i]);
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
      let blanksearch = [];
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
  let tileid = targetCursor.tileid;
  document.getElementById(tileid).innerHTML = targetCursor.basetile;
  let map = PC.getHomeMap();
  let onscreen = document.getElementById('tile' + targetCursor.x + 'x' + targetCursor.y).innerHTML;
  let losval = 0;
  if (onscreen.indexOf("You cannot see that") !== -1) { losval = 1; }
  else {
    let tile = map.getTile(targetCursor.x,targetCursor.y);
    let light = tile.getLocalLight();
    light += map.getAmbientLight();
    if (light < SHADOW_THRESHOLD) {
      losval = 1;
    }
  }

  if (losval >= LOS_THRESHOLD) { 
  	let retval = {};
  	retval["txt"] = "You cannot see that.";
  	retval["fin"] = 2;
  	retval["input"] = "&gt;";
 	  let tileid = targetCursor.tileid;
	  document.getElementById(tileid).innerhtml = targetCursor.basetile; 

  	return retval;
  }
  let tile = map.getTile(targetCursor.x,targetCursor.y);
  if ((targetCursor.x === PC.getx())	&& (targetCursor.y === PC.gety())) {
    let retval = {};
    retval["txt"] = "This is no time to be talking to yourself.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";

    return retval;
  } 
  let top = tile.getTop();
  while (top.getName() === "SeeBelow") {
    let result = FindBelow(targetCursor.x,targetCursor.y,map);
    tile = result.tile;
    top = tile.getTop();
  }
  
  
  let retval = {};
  if (!top.checkType("NPC")) {
    retval["txt"] = "There is no one there to talk to.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
  
    return retval;
  }
  if ((top.getAttitude() !== "friendly") && (top.getAttitude() !== "neutral")) {
    let pronoun = top.getGenderedTerms().pronoun;
    pronoun = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
    retval["txt"] = pronoun + " does not want to talk to you.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
  
    return retval;    
  }
  if (top.flags.hasOwnProperty("sleep")) {
    let pronoun = top.getGenderedTerms().pronoun;
    pronoun = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
    retval["txt"] = pronoun + " is asleep.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
  
    return retval;    
  }
  if (top.getConversationFlag()) {
    if (DU.gameflags.getFlag(top.getConversationFlag())) {
      top.setConversationFlagged();
    }
  }

  let convo = top.getConversation();
  if (!convo || !conversations[convo]) {
    retval["txt"] = "No one there wishes to speak with you.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
    
    return retval;
  }

  maintext.addText("Talk to: " + top.getFullDesc());

  if (IsVisibleOnScreen(top.getx(),top.gety())) {
    ShowTurnFrame(top);
  }

  if (EarnedLevel(PC) && ((top.getName() === "KingNPC") || (top.getName() === "QueenNPC")) && DU.gameflags.getFlag("kingspeech")) {
    if ((PC.getLevel() < 4) || (PC.runes.kings)) {
      if (top.getName() === "KingNPC") {
//        maintext.addText('<span class="conv">"Hail, ' + PC.getPCName() + '! I am well pleased with your progress. Seek Nyrani and Jharden for further training."</span>');
      } else { // Queen
//        maintext.addText('<span class="conv">"Well, well, ' + PC.getPCName() + '! I am pleased with your progress. Seek out Nyrani and Jharden for further training."</span>');
      }
      PC.setLevel(PC.getLevel()+1);
      PC.setMaxHP(PC.getLevel()*25+25);
      PC.setHP(PC.getMaxHP());
      let effects = PC.getSpellEffects();
      if (effects) {
        for (let i=0; i<effects.length; i++) {
          if (effects[i].getName() === "Poison") {
            effects[i].endEffect();
          }
          if (effects[i].getName() === "Disease") {
            effects[i].endEffect();
          }
        }
      }
      if (PC.getLevel() === 2) { 
        let basement = maps.getMap("olympus0");
        let allnpcs = basement.npcs.getAll();
        let rose;
        for (let i=0; i<allnpcs.length; i++) {
          if (allnpcs[i].getNPCName() === "Rose") {
            rose = allnpcs[i];
          }
        }
        if (rose) {
          basement.moveThing(24,13,rose);
          rose.setSchedule("rose");
        } else {
          alert("Can't find Rose!");
        }
      }
      PC.settp(PC.gettp()+TP_PER_LEVEL);
      DU.gameflags.setFlag("can_train", 1);
      if (DU.gameflags.getFlag("spellbook")) {
        if (top.getName() === "KingNPC") {
//          maintext.addText('<span class="conv">"In addition, Jharden may have more to teach you of magic!"</span>');
        } else { // Queen
//          maintext.addText('<span class="conv">"And please talk to Jharden! He may have more to teach you of magic."</span>');
        }        
      }
      DU.gameflags.setFlag("jharden_newspell",1);
      if ((PC.getLevel() > 2) && (PC.getLevel() < 6)) {
        DU.gameflags.setFlag("ash_newspell",1);
      }
//      maintext.addText("<span class='sysconv'>" + PC.getPCName() + " is now level " + PC.getLevel() + "!</span>");
      DU.gameflags.setFlag("lvl"+PC.getLevel(),1);
      DrawCharFrame();
      if (PC.getLevel() === 2) {
//        maintext.addText("<span class='conv'>\"Oh, and another thing! We have captured a rebel instigator and are holding her in our <span style='color:cyan'>prison</span>. I charge you with seeing what information you can get from her!\"</span>");
        retval = PerformTalk(top, convo, "_level2");
      } else if ((PC.getLevel() === 4) && (!DU.gameflags.getFlag("lvl4_rune"))) {
        if (DU.gameflags.getFlag("spellbook")) {
          retval = PerformTalk(top, convo, "_lvl4s");
        } else {
          retval = PerformTalk(top, convo, "_lvl4");
        }
      } else {
        retval = PerformTalk(top, convo, "_level");
      }
    } else {
    //  maintext.addText('<span class="conv">"Hail, ' + PC.getPCName() + '! You have made great progress, but you cannot advance without the <span style=\'color:cyan\'>Rune</span>!"</span>');
      retval = PerformTalk(top, convo, "_level0");
    }
  } else {
    retval = PerformTalk(top, convo, "_start");
  }
		
  return retval;

}

function PerformTalk(talkto, convo, topic) {
  let forlog = {NPC: talkto.getNPCName(), conversation: convo, keyword: topic, timestamp: DUTime.getGameClock()};
  convlog.push(forlog);
  
  let retval = {};
  let conval = conversations[convo].respond(talkto, topic);
  
  if (conval) {
    if (conval !== -1) {
      retval["txt"] = "";
      retval["fin"] = 3;
      retval["input"] = "You say: ";
    }
  } else {
    // person spoke and ended conversation
    retval["txt"] = "";
    retval["fin"] = 1;
    retval["input"] = "&gt;";
    return retval;
  }
  
  if (conval === 2) {
    retval["input"] = "&gt;[MORE]";
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
    retval["fin"] = "inn"; // you got a room at an inn
  } else {
    if (inputText.subcmd === "yn") {
      retval["input"] = "You answer (y/n):";
    } else {
      retval["input"] = "You say: ";
    }
    if (targetCursor.overrideMode) {
      delete targetCursor.overrideMode;
      if (gamestate.getMode() === "singlenumber") { retval["input"] = "Tip how much?"; }
    } else {
      gamestate.setMode("talk");
    }
  }
  
  targetCursor.talkingto = talkto;
  targetCursor.command ="t";
  targetCursor.conval = conval;   // 2 == in-midsentence, 3 or 4 == merchanting
  
  inputText.cmd = "t";
  inputText.txt = "";
		
  return retval;  
}

function PerformUse(who) {
  let retval = {};
  let usemap = who.getHomeMap();
	let localacre = usemap.getTile(targetCursor.x,targetCursor.y);
	let someone = localacre.getTopNPC();
	if (!someone) { someone = localacre.getTopPC(); }
	if (someone) {
    let commandname = "Use";
    if (targetCursor.command === "o") { commandname = "Open"; }
    retval["txt"] = commandname + ": There is something in the way.";
    retval["fin"] = 0;
    return retval;
  }
	let used = localacre.features.getTop();
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
    let retval = {};
    retval["txt"] = "You cannot do that here.";
    retval["fin"] = 2;
    return retval;
  }

  gamestate.setMode("zstats");
  let retval = {txt:""};
  if (targetCursor.command === "u") {
    retval["input"] = "&gt; Use: ";
  } else if (targetCursor.command === "o") {
    retval["input"] = "&gt; Open: "; 
  }
  retval["fin"] = 0;

  targetCursor.restrictTo = "usable";
  targetCursor.page = 2;
  
  DisplayInventory("usable");
  return retval;
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

function PerformUseFromInventoryState(code) {  // deprecated I think
  alert("PerformUseFromInventoryState not so deprecated?");
  let retval = {};
  if (targetCursor.itemlist.length === 0) {
    code = 27;
  }
  if (code === 27) { // ESC
    retval["fin"] = 0;
    delete targetCursor.itemlist;
  }
	else if ((code === 38) || (code === 219)) {   // UP ARROW  or  [
      document.getElementById('inv'+targetCursor.scrolllocation).classList.toggle('highlight');
	    targetCursor.scrolllocation--;
	    if (targetCursor.scrolllocation < 0) { targetCursor.scrolllocation = targetCursor.itemlist.length-1; }
      document.getElementById('inv'+targetCursor.scrolllocation).classList.toggle('highlight');
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
  let retval = used.use(who);
  if (retval["override"] === 1) {
    delete retval["override"];
  } else {
    if (retval["override"] !== -1) {
      retval["fin"] = 1;
    }
    let usedname = used.getDesc();
    usedname = usedname.replace(/^a /, "");
    let commandname = "Use";
    if (targetCursor.command === "o") {
      commandname = "Open";
    }
    retval["txt"] = commandname + " " + usedname + ": " + retval["txt"];
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
      let usemap = who.getHomeMap();
      let localacre = usemap.getTile(used.getx(),used.gety());

      if (retval["redrawtype"]) {
        delete retval["redrawtype"];
  	  	// if more of the map needs to be redrawn, need to recheck light sources
		  
        for (let index in localacre.localLight) {
		      // each object that is casting light on the door might be casting light through the door.
  		    var lightsource = usemap.lightsList[index];
  	      usemap.removeMapLight(index, usemap.lightsList[index].getLight(), usemap.lightsList[index].getx(), usemap.lightsList[index].gety());
    		  usemap.setMapLight(lightsource, lightsource.getLight(), lightsource.getx(), lightsource.gety());
	      }
        if (used.getHomeMap() === PC.getHomeMap()) {
          DrawMainFrame("draw",used.getHomeMap(),PC.getx(),PC.gety());
        }
  	  } else {		
	  	  DrawMainFrame("one",used.getHomeMap(),used.getx(),used.gety());
  	  }
    }
  }
  return retval;
}

function PerformWait(code) {
  let retval = {fin:2};
  if ((code === 27) || (code === 48)) { 
    return retval;
  }
  let anyhostiles = CheckMapForHostiles(PC);
  if ((anyhostiles <= 10) && (anyhostiles > 0)) { 
    retval["fin"] = 0;
    retval["txt"] = "You cannot wait here- it is too dangerous.";
    retval["input"] = "&gt;";
    return retval;
  }

  gamestate.setMode("null");
  if (code === 83) { // S
    let endtime = GetGameClockByClockTime("7:00");
    retval["txt"] = "Waiting until sunrise.";
    FadeOut();
    PC.setWaiting(endtime);

    retval["fin"] = 1;
    retval["input"] = "&gt;";
    return retval;
  }
  let duration = parseInt(code) - 48;
  retval["txt"] = "Waiting for " + duration + " hours.";
  if (duration === 1) { retval["txt"] = "Waiting for 1 hour."; }
  duration = duration * 12;
  FadeOut();

  PC.setWaiting(DUTime.getGameClock() + duration);

  retval["fin"] = 1;
  retval["input"] = "&gt;";
  return retval;
}

function PerformYell() {
	let retval = {};
	if (inputText.txt == "") {
		retval["txt"] = "Yell: Nothing!";
		retval["fin"] = 2;
		return retval;
	}
	else {
    let ev = new DUEvent("Yelling",PC,[]);
    Listener.sendEvent(ev);
  
    // Cheat/Debug Console 
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
		  for (let i=1; i<=8; i++) {
		    for (let j=1; j<=8; j++) {
		      PC.addSpell(i,GetSpellID(j));
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
      let hurtnpcs = PC.getHomeMap().npcs.getAll();
      for (let i=0;i<hurtnpcs.length;i++) {
		    hurtnpcs[i].setHP(2);
		  }
		} else if (inputText.txt === "TESTRING") {
		  TestRing();
		} else if (inputText.txt === "SOUNDCHK") {
		  createjs.Sound.play("Mainland", {loop: -1});
		} else if (inputText.txt === "SHOWMAP") {
      if (debug) {
        DisplayTestMap();
      }
    } else if (inputText.txt === "TESTTOWER") {
      let newmap = new GameMap();
      if (maps.getMap("toshin3")) {
				newmap = maps.getMap("toshin3");
			} else {
				newmap = maps.addMap("toshin3");
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,16,13);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTBARD") {
      let newmap = new GameMap();
      if (maps.getMap("swainhil")) {
				newmap = maps.getMap("swainhil");
			} else {
				newmap = maps.addMap("swainhil");
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,48,19);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "GOGROTTO") {
		    let homemap = PC.getHomeMap();
		    homemap.moveThing(30,45,PC);
		    DrawMainFrame("draw", homemap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTGROTTO") {
      let newmap = new GameMap();
      if (maps.getMap("grotto")) {
				newmap = maps.getMap("grotto");
			} else {
				newmap = maps.addMap("grotto");
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,22,53);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTETHER") {
      let newmap = new GameMap();
      if (maps.getMap("ether")) {
				newmap = maps.getMap("ether");
			} else {
				newmap = maps.addMap("ether");
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,46,64);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTPALACE") {
      let newmap = new GameMap();
      if (maps.getMap("skypalace")) {
				newmap = maps.getMap("skypalace");
			} else {
				newmap = maps.addMap("skypalace");
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,47,49);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTROYAL") {
      let newmap = new GameMap();
      if (maps.getMap("pitdespair2")) {
				newmap = maps.getMap("pitdespair2");
			} else {
				newmap = maps.addMap("pitdespair2");
			}
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap,46,28);		  
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTANIM") {
      let newmap = new GameMap();
      if (maps.getMap("greenacres")) {
        newmap = maps.getMap("greenacres");
      } else {
        newmap = maps.addMap("greenacres");
      }
      MoveBetweenMaps(PC,PC.getHomeMap(),newmap, 20,20);
      let tmpdude = localFactory.createTile("PaladinVillagerNPC");
      newmap.placeThing(20,25,tmpdude);
      let tmpdude2 = localFactory.createTile("PaladinVillagerNPC");
      newmap.placeThing(20,30,tmpdude2);
      DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
    } else if (inputText.txt === "TESTANIMA") {
      let tmpmap = maps.getMap("greenacres");
      let castermob = tmpmap.getTile(20,25).getTopNPC();
      let tgtmob = tmpmap.getTile(20,30).getTopNPC();
      PerformMagicBolt(castermob,0,0,tgtmob);
// REAL YELLS START HERE
		} else if (inputText.txt === "KARIS") {
		  if (PC.getHomeMap().getName() === "asharden1") {
		    DUPlaySound("sfx_teleport");
		    maintext.delayedAddText("In a blink, you are elsewhere.");
		    let homemap = PC.getHomeMap();
		    homemap.moveThing(25,23,PC);
		    DrawMainFrame("draw", homemap, PC.getx(), PC.gety());
		  }
		} else if (inputText.txt === "SIRAK") {
		  if (PC.getHomeMap().getName() === "asharden1") {
		    DUPlaySound("sfx_teleport");
		    maintext.delayedAddText("In a blink, you are elsewhere.");
		    let homemap = PC.getHomeMap();
		    homemap.moveThing(32,32,PC);
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
  let retval = {};
  let exitInv = 1;
  let restrict = 0;
  if (targetCursor.restrictTo) { restrict = targetCursor.restrictTo; }

  if ((code === 27) || (code === 90)) { // ESC or Z again
    if ((targetCursor.command === "c") && (targetCursor.spellName === "Empower")) {
      retval["fin"] = 0;
      retval["txt"] = "Mix these reagents in the mortar?";
      retval["input"] = "&gt; (Y/N) ";
      targetCursor.finalized = 1;
      return retval;
    } else {
      retval["fin"] = 0;
    }
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
        targetCursor.page = 4; 
        if (PC.runes.kings || PC.runes.waves || PC.runes.winds || PC.runes.flames || PC.runes.void) {
          targetCursor.page = 5;
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
      if (targetCursor.page === 6) { targetCursor.page = 1; }
      if ((targetCursor.page === 5) && !(PC.runes.kings || PC.runes.waves || PC.runes.winds || PC.runes.flames || PC.runes.void)) {
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
      ScrollStats(-20);  
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
      ScrollStats(20);    
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
      ScrollStats(250);    
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
      ScrollStats(-250);
    }
    retval["fin"] = 1;
  }       
  else { retval["fin"] = 1; }

  if (targetCursor.page === 2) { DisplayInventory(restrict); }
  return retval;
}

function ScrollStats(amt) {
  let divheight = document.getElementById('zstat').scrollHeight;
  let currtop = document.getElementById('zstat').scrollTop;
  currtop += amt;
  if (currtop > (divheight - 410)) { currtop = divheight - 410; }
  if (currtop < 0) { currtop = 0; }
  document.getElementById('zstat').scrollTop = currtop;
}

function DrawStats(page) {

  let statsdiv = "&nbsp;";
   
  if (page === 1) {
    let spanstr = "<span>";
    if (PC.getStr() > PC.getBaseStr()) { spanstr = '<span style="color:cyan">'; }
    if (PC.getStr() < PC.getBaseStr()) { spanstr = '<span style="color:orange">'; }
    let spandex = "<span>";
    if (PC.getDex() > PC.getBaseDex()) { spandex = '<span style="color:cyan">'; }
    if (PC.getDex() < PC.getBaseDex()) { spandex = '<span style="color:orange">'; }
    let spanint = "<span>";
    if (PC.getInt() > PC.getBaseInt()) { spanint = '<span style="color:cyan">'; }
    if (PC.getInt() < PC.getBaseInt()) { spanint = '<span style="color:orange">'; }
    
    statsdiv = "<div class='outerstats'><div id='zstat' class='zstats'>";
    statsdiv += "<table cellpadding='0' cellspacing='0' border='0' style='background-color:black; margin-top: 8px'><tr>";

    statsdiv += "<td style='padding-top:5px'>" + PC.getPCName() + "</td><td width='30'>&nbsp;</td><td>LEVEL: " + PC.getLevel() + "</td></tr>";
    statsdiv += "<tr><td style='width:50%'>HP: " + PC.getDisplayHP() + "/" + PC.getMaxHP() + "</td><td></td>";
    statsdiv += "<td style='width:50%'>MP: " + PC.getMana() + "/" + PC.getMaxMana() + "</td></tr>";
    statsdiv += "<tr><td colspan='3'>&nbsp;<br /></td></tr>";
    statsdiv += "<tr><td>STR: " + spanstr + "" + PC.getStr() + "</span></td><td></td><td>Gold: " + PC.getGold() + "</td></tr>";
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
    if (PC.getEquipment("weapon")) { 
      let wpndesc = PC.getEquipment("weapon").getDesc();
      wpndesc = wpndesc.charAt(0).toUpperCase() + wpndesc.slice(1);
      statsdiv += "<tr><td>Weapon: " + wpndesc + "</td><td></td>";
    } else {
      statsdiv += "<tr><td>Weapon: None</td><td></td>";
    }
    if (PC.getEquipment("armor")) {
      let armordesc = PC.getEquipment("armor").getDesc();
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
      let missdesc = PC.getEquipment("missile").getDesc();
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
    if (PC.getEquipment("circlet") || PC.getEquipment("amulet") || PC.getEquipment("ring1") || PC.getEquipment("ring2")) {
      statsdiv += "<tr><td colspan='3'>Accessories:</td></tr>";
      if (PC.getEquipment("circlet")) {
        let circletdesc = PC.getEquipment("circlet").getDesc();
        circletdesc = circletdesc.charAt(0).toUpperCase() + circletdesc.slice(1);
        statsdiv += "<tr><td colspan='3'>" + circletdesc + "</td></tr>";
      }
      if (PC.getEquipment("amulet")) {
        let circletdesc = PC.getEquipment("amulet").getDesc();
        circletdesc = circletdesc.charAt(0).toUpperCase() + circletdesc.slice(1);
        statsdiv += "<tr><td colspan='3'>" + circletdesc + "</td></tr>";
      }
      if (PC.getEquipment("ring1")) {
        let circletdesc = PC.getEquipment("ring1").getDesc();
        circletdesc = circletdesc.charAt(0).toUpperCase() + circletdesc.slice(1);
        statsdiv += "<tr><td colspan='3'>" + circletdesc + "</td></tr>";
      }
      if (PC.getEquipment("ring2")) {
        let circletdesc = PC.getEquipment("ring2").getDesc();
        circletdesc = circletdesc.charAt(0).toUpperCase() + circletdesc.slice(1);
        statsdiv += "<tr><td colspan='3'>" + circletdesc + "</td></tr>";
      }
    }
    

    statsdiv += "</table></div></div>";
    DrawTopbarFrame("<p>Character</p>");
    
  } else if (page === 2) {
    DisplayInventory();
    DrawTopbarFrame("<p>Inventory</p>");
  } else if (page === 3) {
    statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
    statsdiv += "<table cellpadding='0' cellspacing='0' border='0' style='background-color:black'>";
    statsdiv += "<tr><td>&nbsp;</td></tr>";
   
    let hasSpellbook = 0;
   
    for (let lvl = 1; lvl <= 8; lvl++ ){
      let hasLevel = 0;
      for (let i=1; i<=8; i++) {
        let spellnum = GetSpellID(i);
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

    DrawTopbarFrame("<p>Spellbook</p>");
  } else if (page === 4) {
    statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
    statsdiv += "<table cellpadding='0' cellspacing='0' border='0' style='background-color:black'>";
    statsdiv += "<tr><td>&nbsp;</td></tr>";
    
    let alleffects = PC.getSpellEffects();
    if (!alleffects[0]) {
      statsdiv += "<tr><td colspan='3'>You have no effects or afflictions upon you.</td></tr>";
    } else {
      for (let i=0; i < alleffects.length; i++) {
        if (alleffects[i].display) {
          statsdiv += "<tr><td colspan='3'>" + alleffects[i].display + ": " + alleffects[i].getZstatdesc() + "</td></tr>";
        }
      }
    } 
    statsdiv += "</table></div></div>";  
    DrawTopbarFrame("<p>Spells and effects</p>");
  } else if (page === 5) {
    let hasrunes = 0;
    if (PC.runes.kings || PC.runes.waves || PC.runes.winds || PC.runes.flames || PC.runes.void) { hasrunes = 1; }

    if (!hasrunes) {
      statsdiv += "<p>You have discovered no runes.</p>";
    } else {
      statsdiv = CreateRunesPage();
    }
    DrawTopbarFrame("<p>Runes</p>");

  }
 
  document.getElementById('worldlayer').innerHTML = "<img src='graphics/spacer.gif' width='416' height='416' />";
  document.getElementById('worldlayer').style.backgroundImage = "";
  document.getElementById('worldlayer').style.backgroundColor = "black";
  document.getElementById('uiinterface').innerHTML = statsdiv;
  document.getElementById('uiinterface').style.backgroundColor = "black";

}

function CreateRunesPage(selected) {
  let statsdiv;
  let hasvoid = 0;
  if (PC.runes.void && selected) { hasvoid = -110; }
  statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
  statsdiv += "<table cellpadding='0' cellspacing='10' border='0' style='background-color:black'>";
 
  statsdiv += "<tr><td width='110'>";
  if (PC.runes.kings) { 
    let sel = "";
    if (selected === 1) { 
      sel = "; color: yellow"; 
    }
    let opac = "";
    if (PC.getRuneCooldown("kings") > DUTime.getGameClock()) {
      opac = "; opacity: .5";
    }
   statsdiv += `<div style='width:110;height:110;background-image:url("graphics/runes.png");background-position:0px ${hasvoid}px${opac}'></div><p style='text-align:center${sel}'>The Rune<br />of Kings</p>`;
  }
  statsdiv += "</td><td>";
  if (PC.runes.waves) { 
    let sel = "";
    if (selected === 2) { sel = "; color: yellow"; }
    let opac = "";
    if (PC.getRuneCooldown("waves") > DUTime.getGameClock()) {
      opac = "; opacity: .5";
    }
   statsdiv += `<div style='width:110;height:110;background-image:url("graphics/runes.png");background-position:-110px ${hasvoid}px${opac}'></div><p style='text-align:center${sel}'>The Rune<br />of Waves</p>`;
  }
  statsdiv += "</td><td rowspan='2' style='vertical-align:center'>";
  statsdiv += "</td></tr><tr><td>";
  if (PC.runes.winds) { 
    let sel = "";
    if (selected === 3) { sel = "; color: yellow"; }
    let opac = "";
    if (PC.getRuneCooldown("winds") > DUTime.getGameClock()) {
      opac = "; opacity: .5";
    }
    statsdiv += `<div style='width:110;height:110;background-image:url("graphics/runes.png");background-position:-220px ${hasvoid}px${opac}'></div><p style='text-align:center${sel}'>The Rune<br />of Winds</p>`;
  }
  statsdiv += "</td><td>";
  if (PC.runes.flames) { 
    let sel = "";
    if (selected === 4) { sel = "; color: yellow"; }
    let opac = "";
    if (PC.getRuneCooldown("flames") > DUTime.getGameClock()) {
      opac = "; opacity: .5";
    }
   statsdiv += `<div style='width:110;height:110;background-image:url("graphics/runes.png");background-position:-330px ${hasvoid}px${opac}'></div><p style='text-align:center${sel}'>The Rune<br />of Flames</p>`;
  }
  statsdiv += "</td></tr></table>";

  return statsdiv;
}

function StatsCategory(stuff, label) {
  stuff.sort(function(a,b) {
    let nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
    if (nameA < nameB) 
      return -1
    if (nameA > nameB)
      return 1
    return 0 
  }); 
  let newtext = "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>" + label +"</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
  for (let i=0; i<stuff.length; i++ ) {
    let itemdesc = stuff[i].getDesc();
    itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
    newtext += "<tr><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + stuff[i].getQuantity() + ")</td></tr>";
  }
  newtext += "<tr><td></td><td>&nbsp;</td></tr>";
  return newtext;
}

function DrawOptions() {
  let optdiv = "<div><div id='opt' class='zstats'>";
  optdiv += "<table cellpadding='0' cellspacing='0' border='0' style='background-color:black'>";
  optdiv += "<tr><td>&nbsp;&nbsp;</td><td>&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td></tr>";
  optdiv += "<tr><td>=======SOUND AND MUSIC=======</td><td></td><td></td></tr>";
  optdiv += "<tr><td>MUSIC VOLUME:</td><td></td><td";
  if (targetCursor.page === 1) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (DU.gameflags.getFlag("music")) {
    let modmusic = DU.gameflags.getFlag('music')*10;
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
    let modsound = DU.gameflags.getFlag("sound")*10;
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
  optdiv += "<tr><td><br />=======USER INTERFACE=======</td><td></td><td></td></tr>";
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

  optdiv += "<tr><td>SHOW MOVES IN LOG:</td><td></td><td";
  if (targetCursor.page === 8) {
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (DU.gameflags.getFlag("show_move")) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";

  optdiv += "<tr><td>ZOOM:</td><td></td><td";
  if (targetCursor.page === 9) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  let zlev = DU.gameflags.getFlag("zoom");
  if (!DU.gameflags.getFlag("zoom")) { DU.gameflags.setFlag("zoom",1); zlev = 1; }
  optdiv += zlev + "x";
  optdiv += "</td></tr>";

  optdiv += "<tr><td>SKIP THEFT WARNING:</td><td></td><td";
  if (targetCursor.page === 10) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (DU.gameflags.getFlag("skip_theft_warning")) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";

  optdiv += "<tr><td><br />=======GAMEPLAY=======</td><td></td><td></td></tr>";
  optdiv += "<tr><td>DIFFICULTY:</td><td></td><td";
  if (targetCursor.page === 11) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (DU.gameflags.getFlag("storymode")) {
    optdiv += "STORY";
  } else {
    optdiv += "NORMAL";
  }
  optdiv += "</td></tr>";

//  optdiv += "<tr><td>RANDOMIZE POTION COLORS:</td><td></td><td";
//  if (targetCursor.page === 12) { 
//    optdiv += " class='highlight'";
//  }
//  optdiv += ">";
//  if (DU.gameflags.getFlag("randomize_potions")) {
//    optdiv += "YES";
//  } else {
//    optdiv += "NO";
//  }
//  optdiv += "</td></tr>";

  optdiv += "</table></div></div>";
  
  DrawTopbarFrame("<p>Options</p>");
  
  document.getElementById('worldlayer').innerHTML = "<img src='graphics/spacer.gif' width='416' height='416' />";
  document.getElementById('worldlayer').style.backgroundImage = "";
  document.getElementById('worldlayer').style.backgroundColor = "black";
  document.getElementById('uiinterface').innerHTML = optdiv;
  document.getElementById('uiinterface').style.backgroundColor = "black";
}

function DrawDebugOptions() {
  let optdiv = "<div><div id='opt' class='zstats'>";
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
  optdiv += "<tr><td>Schedules:</td><td></td><td";
  if (targetCursor.page === 12) { 
    optdiv += " class='highlight'";
  }
  optdiv += ">";
  if (debugflags.schedules) {
    optdiv += "YES";
  } else {
    optdiv += "NO";
  }
  optdiv += "</td></tr>";

  optdiv += "</table></div></div>";
  
  DrawTopbarFrame("<p>Debug Options</p>");
  document.getElementById('worldlayer').innerHTML = "<img src='graphics/spacer.gif' width='416' height='416' />";
  document.getElementById('worldlayer').style.backgroundImage = "";
  document.getElementById('worldlayer').style.backgroundColor = "black";
  document.getElementById('uiinterface').innerHTML = optdiv;
  document.getElementById('uiinterface').style.backgroundColor = "black";  
}


function performOptions(code) {
  let retval = {};
  if ((code === 27) || (code === 79)) { // ESC or O again
    retval["fin"] = 0;
    delete targetCursor.cmd;
    document.getElementById('uiinterface').innerHTML = "";
    document.getElementById('uiinterface').style.backgroundColor = "";
}
  else if ((code === 38) || (code === 219)) { // scroll up
    targetCursor.page--;
    if (targetCursor.page === 0) { targetCursor.page = 1; } 
    retval["fin"] = 1;
  }
  else if ((code === 40) || (code === 191)) { // scroll down
    targetCursor.page++;
    if (targetCursor.cmd === "o") {
      if (targetCursor.page === 12) { targetCursor.page = 11; }
    } else if (targetCursor.cmd === "debug") {
      if (targetCursor.page === 13) { targetCursor.page = 12; }
    }
    retval["fin"] = 1;
  }
  else if ((code === 37) || (code === 186)) {  // left, for volumes or zoom
    if (targetCursor.cmd === "o") {
      if (targetCursor.page === 1) {  // volume
        if (DU.gameflags.getFlag("music")) {
          let newvol = Math.max(0,DU.gameflags.getFlag("music")-.1);
          newvol = newvol*10;
          newvol = parseInt(newvol);
          newvol = newvol/10;
          DU.gameflags.setFlag("music", newvol);
          if (nowplaying.song) {
            nowplaying.song.volume = DU.gameflags.getFlag("music");
          }
        }
      } else if (targetCursor.page === 3) {  // volume
        if (DU.gameflags.getFlag("sound")) {
          let newvol = Math.max(0,DU.gameflags.getFlag("sound")-.1);
          newvol = newvol*10;
          newvol = parseInt(newvol);
          newvol = newvol/10;
          DU.gameflags.setFlag("sound", newvol);
        }
      } else if (targetCursor.page === 9) { // zoom
        if (DU.gameflags.getFlag("zoom") === 1.5) {
          DU.gameflags.setFlag("zoom",1);
//          webFrame.setZoomFactor(1);
//          ipcRenderer.send('resize', 1);
          OutOfContext.resize(1);
        } else if (DU.gameflags.getFlag("zoom") === 2) {
          DU.gameflags.setFlag("zoom",1.5);
//          webFrame.setZoomFactor(1.5);
//          ipcRenderer.send('resize', 1.5);
          OutOfContext.resize(1.5);
        }
      }
    }
  }
  else if ((code === 39) || (code === 222)) {  // right, for volumes
    if (targetCursor.cmd === "o") {
      if (targetCursor.page === 1) {
        let newvol = Math.min(1,DU.gameflags.getFlag("music")+.1);
        newvol = newvol*10;
        newvol = parseInt(newvol+.001);
        newvol = newvol/10;
        DU.gameflags.setFlag("music", newvol);
        if (nowplaying.song) {
          nowplaying.song.volume = DU.gameflags.getFlag("music");
        } else {
          let song = PC.getHomeMap().getMusic();
          DUPlayMusic(song);
        }
      } else if (targetCursor.page === 3) {
        let newvol = Math.min(1,DU.gameflags.getFlag("sound")+.1);
        newvol = newvol*10;
        newvol = parseInt(newvol+.001);
        newvol = newvol/10;
        DU.gameflags.setFlag("sound", newvol);
      } else if (targetCursor.page === 9) { // zoom
        if (DU.gameflags.getFlag("zoom") === 1) {
          DU.gameflags.setFlag("zoom",1.5);
//          webFrame.setZoomFactor(1.5);
//          ipcRenderer.send('resize', 1.5);
          OutOfContext.resize(1.5);
        } else if (DU.gameflags.getFlag("zoom") === 1.5) {
          DU.gameflags.setFlag("zoom",2);
//          webFrame.setZoomFactor(2);
//          ipcRenderer.send('resize', 2);
          OutOfContext.resize(2);
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
            let song = PC.getHomeMap().getMusic();
            DUPlayMusic(song);
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
  } else if (opt === 12) {
    if (debugflags.schedules === 1) {
      debugflags.schedules = 0;
    } else {
      debugflags.schedules = 1;
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
      let song = PC.getHomeMap().getMusic();
      DUPlayMusic(song);
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
          let song = PC.getHomeMap().getMusic();
          DUPlayMusic(song);  
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
    } else {
      DU.gameflags.setFlag("move_opens_doors", 1);
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
  } else if (opt === 8) {
    if (DU.gameflags.getFlag("show_move")) {
      DU.gameflags.setFlag("show_move", 0);
    } else {
      DU.gameflags.setFlag("show_move", 1);
    }
  } else if (opt === 9) {
    // ZOOM HANDLED ELSEWHERE
  } else if (opt === 10) {
    if (DU.gameflags.getFlag("skip_theft_warning")) {
      DU.gameflags.setFlag("skip_theft_warning", 0);
    } else {
      DU.gameflags.setFlag("skip_theft_warning", 1);
    }
  } else if (opt === 11) {
    if (DU.gameflags.getFlag("storymode")) {
      DU.gameflags.setFlag("storymode", 0);
    } else {
      DU.gameflags.setFlag("storymode", 1);
    }
  } else if (opt === 12) {
    if (DU.gameflags.getFlag("randomize_potions")) {
      DU.gameflags.setFlag("randomize_potions", 0);
    } else {
      DU.gameflags.setFlag("randomize_potions", 1);
    }
  }
}

function ShowSaveGames(toptext) {
  let table = "<div class='zstats'><table cellpadding='2' cellspacing='0' border='0' style='background-color:black'>";
  for (let i=-1;i<=9;i++) {
    if ((i === 0) || (i === 9)) { table += "<tr style='height:36; background-image:url(\"graphics/frame/saveui-lock.gif\"); width:416px'>"; }
    else { table += "<tr style='height:36; background-image:url(\"graphics/frame/saveui.gif\"); width:416px'>"; }
    if (i === -1) {
      table += "<td style='color:white;text-align:center;v-align:center;width:23'><img src='graphics/spacer.gif' width='23' /></td>";
      table += "<td style='color:white;v-align:center;padding-left:5px;width:100%'>" + toptext + "</td>";      
    } else if (saveIndex[i].charname) {
      let tmpdate = saveIndex[i].datestamp;
      let thisdate = new Date();
      thisdate.setTime(tmpdate);
      let thistime = thisdate.toLocaleTimeString();
      let parts = thistime.split(/ /);
      let timepart = parts[0].split(":");
      thistime = timepart[0] + ":" + timepart[1] + " " + parts[1];
      let thisloc = saveIndex[i].loc.slice(0,13);
      table += "<td style='color:white;text-align:center;v-align:center;width:23'>" + i + "</td>";
      let hours = Math.floor(saveIndex[i].timeplayed/(60*60));
      let minutes = Math.floor((saveIndex[i].timeplayed-(hours*60*60))/60);
      if (minutes < 10) { minutes = "0" + minutes; }

      table += "<td style='color:white;v-align:center;padding-left:5px;width:100%;font-size:smaller'>" + saveIndex[i].charname + " (" + thisloc + ") " + thisdate.toLocaleDateString() + " " + thistime + " [" + hours + ":" + minutes +"]</td>";
    } else {
      table += "<td style='color:white;text-align:center;v-align:center;width:23'>" + i + "</td>";
      table += "<td style='color:white;v-align:center;padding-left:5px;width:100%'></td>";      
    }
    table += "</tr>";
  }
  table += "</table></div>";
  document.getElementById('uiinterface').innerHTML = table;
}

function DisplayInventory(restrictTo) {
  if (!targetCursor.invx) { targetCursor.invx = 0; }
  if (!targetCursor.invy) { targetCursor.invy = 0; }
  if (!targetCursor.invskiprow) { targetCursor.invskiprow = 0; }
  if (!targetCursor.invlength) { targetCursor.invlength = 0; }
  
  let inventorylist = MakeInventoryList(restrictTo);
  inventorylist = SortInventoryList(inventorylist);

  targetCursor.invlength = inventorylist.length;
  document.getElementById('uiinterface').innerHTML = "";
  document.getElementById('uiinterface').style.backgroundColor = "black";
  for (let j=0;j<5;j++) {
    for (let i=0;i<8;i++) {
      let leftedge = 30+45*i;
      let topedge = 10+55*j;
      let qleftedge = leftedge + 18;
      let qtopedge = topedge + 36;
      document.getElementById('uiinterface').innerHTML += "<div id='invquant_"+i+"x"+j+"' style='position:absolute; left: " + qleftedge + "; top: " + qtopedge + "; width:12px; height: 10px; border:2px; border-style: solid; border-color:#666; visibility:hidden'></div>";
      document.getElementById('uiinterface').innerHTML += "<div id='inv_"+i+"x"+j+"' style='position:absolute; left: " + leftedge + "; top: " + topedge + "; width:32px; height: 32px; border:3px; border-style: solid; border-color:#666;'></div>";
    }
  }

  document.getElementById('uiinterface').innerHTML += "<div id='inv_desc_window' style='position:absolute; left: 35px; top: 280px; border: 3px; border-style: solid; border-color:#ccc; width:340px; height: 125px'></div>";
  document.getElementById('inv_desc_window').innerHTML = "<table cellpadding='4' cellspacing='4' border='0' style='margin-top:5px'><tr><td rowspan='2' style='text-align:center; width: 100px'><div id='inv_image' style='position:absolute; top: 16px; left: 34px; width: 32px; height:32px'></div><div style='position:absolute; top:52px; width:100px;'><p id='inv_name' class='charcreate' style='text-align:center'></p></div></td><td><p class='charcreate' id='inv_desc' style='top:20px'></p></td></tr><td><p class='charcreate' id='inv_use' style='color:yellow'></p></td></tr></table>";
  let invskip = targetCursor.invskiprow*8;
  let writetox = 0;
  let writetoy = 0;

  let displaylength = inventorylist.length;
  displaylength = Math.min(displaylength, 8*5+invskip);

  for (let i=invskip;i<displaylength;i++) {
    writetoy = Math.floor((i-invskip)/8);
    writetox = i%8;
    
    let showgraphic = inventorylist[i].getGraphicArray();
    let invdiv = document.getElementById('inv_'+writetox+"x"+writetoy);
    let innerdiv = document.createElement("div");
    innerdiv.id = "divid_" + inventorylist[i].getSerial();
    innerdiv.style.width = "32px";
    innerdiv.style.height = "32px";
    innerdiv.style.backgroundImage = "url('graphics/" + showgraphic[0] + "')";
    innerdiv.style.backgroundRepeat = "no-repeat";
    innerdiv.style.backgroundPosition = showgraphic[2] + "px " + showgraphic[3] + "px";
    innerdiv.style.position = "fixed";

    if (PC.isEquipped(inventorylist[i])) {
      invdiv.style.borderColor = "#000099";
    }
    // empower but specifically choosing regs
    if ((targetCursor.command === "c") && (targetCursor.spellName === "Empower") && (gamestate.getMode() === "empower")) {  
      if (targetCursor.chosenReagents[inventorylist[i].getName()]) {
        invdiv.style.borderColor = "#000099";
      }
    }
    invdiv.appendChild(innerdiv);
    if (inventorylist[i].getQuantity() && (inventorylist[i].getQuantity() > 1)) {
      let quant = document.getElementById('invquant_'+writetox+"x"+writetoy);
      quant.style.fontSize = 12;
      quant.style.color = "white";
      quant.style.fontFamily = "Commodore64";
      quant.style.textAlign = "right";
      quant.style.visibility = "visible";

      quant.innerHTML = "<span style='position:relative;top:-2px'>" + inventorylist[i].getQuantity() + "</span>";
    }

  }

  let invselect = targetCursor.invskiprow*8 + targetCursor.invy*8 + targetCursor.invx;
  writetoy = Math.floor((invselect-invskip)/8);
  writetox = invselect%8;

  if (invselect < inventorylist.length) {
    if (PC.isEquipped(inventorylist[invselect])) { 
      document.getElementById('inv_'+writetox+"x"+writetoy).style.borderColor = "#66ccff";
    } else {
      document.getElementById('inv_'+writetox+"x"+writetoy).style.borderColor = "#ffffff";
    }
  
    let showgraphic = inventorylist[invselect].getGraphicArray();
    document.getElementById('inv_image').style.backgroundImage = "url('graphics/" + showgraphic[0] + "')";
    document.getElementById('inv_image').style.backgroundRepeat = "no-repeat";
    document.getElementById('inv_image').style.backgroundPosition = showgraphic[2] + "px " + showgraphic[3] + "px";
    let descname = inventorylist[invselect].getDesc();
    descname = descname.charAt(0).toUpperCase() + descname.slice(1);
    document.getElementById('inv_name').innerHTML = descname;
    if (inventorylist[invselect].getQuantity() > 1) {
      document.getElementById('inv_name').innerHTML += " (" + inventorylist[invselect].getQuantity() + ")"; 
    }
    document.getElementById('inv_desc').innerHTML = inventorylist[invselect].getLongDesc();
    let usedesc = inventorylist[invselect].getUseDesc();
    if (usedesc) {
      document.getElementById('inv_use').innerHTML = "Use: " + usedesc;
    } else {
      document.getElementById('inv_use').innerHTML = "";
    }
  } else {
    document.getElementById("inv_"+writetox+"x"+writetoy).style.borderColor = "#ffffff";
  }

  document.getElementById('worldlayer').innerHTML = "<img src='graphics/spacer.gif' width='416' height='416' />";
  document.getElementById('worldlayer').style.backgroundImage = "";
  document.getElementById('worldlayer').style.backgroundColor = "black";
}

function PerformInventoryScreen(code, restrict) {
  if ((code === 37) || (code === 186)) {
    if (targetCursor.invx > 0) {
      targetCursor.invx--;
    } else if (targetCursor.command === "z") { return 1; } // off the left edge
    else if (targetCursor.command === "u") {
      if (targetCursor.invy > 1) {
        targetCursor.invy--;
        targetCursor.invx = 7;
      } else if (targetCursor.invskiprow) {
        targetCursor.invskiprow--;
        targetCursor.invx = 7;
      } else if (targetCursor.invy === 1) {
        targetCursor.invy--;
        targetCursor.invx = 7;
      }
    }
  } else if ((code ===39) || (code === 222)) {
    if (targetCursor.invx < 7) {
      targetCursor.invx++;
    } else if (targetCursor.command === "z") { return 1; } // off the right edge
    else if (targetCursor.command === "u") {
      if (targetCursor.invy < 3) {
        targetCursor.invy++;
        targetCursor.invx = 0;
      } else if (targetCursor.invy === 3) {
        if (targetCursor.invlength > (targetCursor.invskiprow*8 +40)) {
          targetCursor.invskiprow++;
          targetCursor.invx = 0;
        } else {
          targetCursor.invy++;
          targetCursor.invx = 0;
        }
      }
    }
  } else if ((code === 38) || (code === 219)) {
    if (targetCursor.invy > 1) { targetCursor.invy--; }
    else if (targetCursor.invskiprow) {
      targetCursor.invskiprow--;
    } else if (targetCursor.invy === 1) { targetCursor.invy--; }
  } else if ((code === 40) || (code === 191)) {
    if (targetCursor.invy === 3) {
      if (targetCursor.invlength > (targetCursor.invskiprow*8 +40 )) {
        targetCursor.invskiprow++;
      } else { targetCursor.invy++; }
    } else {
      if (targetCursor.invy < 3) {
        targetCursor.invy++;
      }
    }
  } else if ((code === 13) || (code === 32)) {
    // use selected item
    let invselect = targetCursor.invskiprow*8 + targetCursor.invy*8 + targetCursor.invx;
    let inventorylist = MakeInventoryList(restrict);
    inventorylist = SortInventoryList(inventorylist);
    let retval = {};
    if (targetCursor.command === "c") {
      // here for Scribe or Mend
      // WORKING HERE
      let tgt = inventorylist[invselect];
      if (tgt) {
        if (targetCursor.spellName === "Mend") {
          retval = PerformMend(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
        } else if (targetCursor.spellName === "AudachtaScribe") {
          retval = PerformAudachtaScribe(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
        } else if (targetCursor.spellName === "Empower") {
          if (targetCursor.restrictTo === "reagents") {
            // picking regs now, not what to enchant
            if(targetCursor.chosenReagents[tgt.getName()]) { delete targetCursor.chosenReagents[tgt.getName()]; }
            else { targetCursor.chosenReagents[tgt.getName()] = 1; }
            DisplayInventory("reagents");
            retval["fin"] = 0;
            return retval;
          } else {
            retval = PerformEmpower(PC, 0, 0, tgt);
          }
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
        retval = {fin:0};
        delete targetCursor.itemlist;
        return retval;
      }
    }    
    targetCursor.command = 'u';
    retval = MakeUseHappen(PC, inventorylist[invselect], "inventory");
    retval["usefin"] = retval["fin"];
    retval["fin"] = 2;
    return retval;
  } else if (code === 34) { 
    if (targetCursor.invy !== 4) { targetCursor.invy = 4; }
    else {
      let invselect = targetCursor.invskiprow*8 + targetCursor.invy*8 + targetCursor.invx;
      let inventorylist = MakeInventoryList(restrict);
      let i=0;
      while(((invselect+8*i) < inventorylist.length) && (i<4)) {
        i++;
      }
      targetCursor.invskiprow += i;
    }
  } else if (code === 33) {
    if (targetCursor.invy !== 0) { targetCursor.invy = 0; }
    else {
      let invselect = targetCursor.invskiprow*8 + targetCursor.invy*8 + targetCursor.invx;
      let inventorylist = MakeInventoryList(restrict);
      let i=0;
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
  let inventorylist = {};
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
  let PCinv = PC.getInventory();

  for (let i=0; i<PCinv.length; i++) {
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
    } else if (restrictTo === "reagent") {
      if (PCinv[i].checkType("reagent")) { inventorylist.reagent.push(PCinv[i]); }
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
      let nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }
  if (inventorylist.key.length) {
    inventorylist.key.sort(function(a,b) {
      let nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }
  if (inventorylist.reagent.length) {
    inventorylist.reagent.sort(function(a,b) {
      let nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }
  if (inventorylist.quest.length) {
    inventorylist.quest.sort(function(a,b) {
      let nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }
  if (inventorylist.usable.length) {
    inventorylist.usable.sort(function(a,b) {
      let nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }  
  if (inventorylist.other.length) {
    inventorylist.other.sort(function(a,b) {
      let nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    }); 
  }
  if (inventorylist.scroll.length) {
    inventorylist.scroll.sort(function(a,b) {
      let nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
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
      let nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
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
      let nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
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

function SortInventoryList(invlist) {
  let newinvlist = [];
  let equipped = [];
  let trinket = [];
  let armor = [];
  let melee = [];
  let missile = [];
  let potion = [];
  let scroll = [];
  let audachta = [];
  let keyslist = [];
  let reagent = [];
  let quest = [];
  let other = [];

  for (let i=0;i<invlist.length;i++) {
    if ((typeof invlist[i].isEquipped === "function") && (PC.isEquipped(invlist[i]))) {
      equipped.push(invlist[i]);
    } else if (invlist[i].checkType("armor")) { 
      armor.push(invlist[i]);
    } else if (invlist[i].checkType("missile")) {
      missile.push(invlist[i]);
    } else if (invlist[i].checkType("weapon")) {
      melee.push(invlist[i]);
    } else if (invlist[i].checkType("ring") || invlist[i].checkType("amulet") || invlist[i].checkType("circlet")) {
      trinket.push(invlist[i]);
    } else if (invlist[i].checkType("potion")) {
      potion.push(invlist[i]);
    } else if (invlist[i].checkType("scroll")) {
      scroll.push(invlist[i]);
    } else if (invlist[i].checkType("audachta")) {
      audachta.push(invlist[i]);
    } else if (invlist[i].checkType("key")) {
      keyslist.push(invlist[i]);
    } else if (invlist[i].checkType("reagent")) {
      reagent.push(invlist[i]);
    } else if (invlist[i].checkType("quest")) {
      quest.push(invlist[i]);
    } else {
      other.push(invlist[i]);
    }
  }
  // there is probably a more efficient way to do this, but I am without internet and
  // can't look up the proper syntax
  for (let itm in equipped) { newinvlist.push(equipped[itm]); }
  for (let itm in armor) { newinvlist.push(armor[itm]); }
  for (let itm in missile) { newinvlist.push(missile[itm]); }
  for (let itm in melee) { newinvlist.push(melee[itm]); }
  for (let itm in trinket) { newinvlist.push(trinket[itm]); }
  for (let itm in potion) { newinvlist.push(potion[itm]); }
  for (let itm in scroll) { newinvlist.push(scroll[itm]); }
  for (let itm in audachta) { newinvlist.push(audachta[itm]); }
  for (let itm in keyslist) { newinvlist.push(keyslist[itm]); }
  for (let itm in reagent) { newinvlist.push(reagent[itm]); }
  for (let itm in quest) { newinvlist.push(quest[itm]); }
  for (let itm in other) { newinvlist.push(other[itm]); }

  return newinvlist;
}

function ShowHelp() {
  let statsdiv = "<div><div id='showhelp' class='zstats'>";
  statsdiv += "<table cellpadding='0' cellspacing='0' border='0' style='background-color:black'>";
  statsdiv += "<tr><td colspan='3' style='text-align:center'>GAME COMMANDS</td></tr>";
  statsdiv += "<tr><td colspan='3'>&nbsp;</td></tr>";
  statsdiv += "<tr><td>ARROW KEYS - Move</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>P - Push</td></tr>";
  statsdiv += "<tr><td>A - Attack/Approach</td><td></td><td>Q - Save</td></tr>";
  let hasspellbook = "";
  if (!DU.gameflags.getFlag("spellbook")) {
    hasspellbook = "style='color:gray'";
  }
  statsdiv += `<tr><td ${hasspellbook}>C - Cast</td><td></td><td>R - Ready Equipment</td></tr>`;
  statsdiv += "<tr><td>D - Descend</td><td></td><td>S - Search</td></tr>";
  statsdiv += "<tr><td>E - Enter</td><td></td><td>T - Talk</td></tr>";
  let canfocus = "";
  if (!DU.gameflags.getFlag("rune_kings")) {
    canfocus = "style='color:gray'";
  }
  statsdiv += `<tr><td ${canfocus}>F - Focus</td><td></td><td>U - Use</td></tr>`;
  statsdiv += "<tr><td>G - Get</td><td></td><td>V - Toggle Volume</td></tr>";
  let caninfuse = "";
  if (!PC.getInfusion()) { 
    caninfuse = "style='color:gray'";
  }
  statsdiv += `<tr><td ${caninfuse}>I - Infuse</td><td></td><td>W - Wait</td></tr>`;
  statsdiv += "<tr><td>K - Climb</td><td></td><td>Y - Yell</td></tr>";
  statsdiv += "<tr><td>L - Look</td><td></td><td>Z - Stats</td></tr>";
  statsdiv += "<tr><td>CTRL-L - Load Game</td><td></td><td>SPACE - Pass Turn</tr>";
  statsdiv += "<tr><td>M - Toggle Music</td><td></td><td></td></tr>";
  statsdiv += "<tr><td>O - Open</td><td></td><td></td></tr>";
  statsdiv += "<tr><td>CTRL-O - Options</td><td></td><td></td></tr>";

  statsdiv += "</table></div></div>";

  document.getElementById('worldlayer').innerHTML = "<img src='graphics/spacer.gif' width='416' height='416' />";
  document.getElementById('worldlayer').style.backgroundImage = "";
  document.getElementById('worldlayer').style.backgroundColor = "black";
  document.getElementById('uiinterface').innerHTML = statsdiv;
  document.getElementById('uiinterface').style.backgroundColor = "black";
}

function PerformCommand(code) {
	var retval = {};
	retval["fin"] = 0;
	if ((code === 38) || (code === 219)) {   // UP ARROW  or  [
		// move north
		var success = PC.moveMe(0,-1,0);
		var txt = "Move North";
		txt += success["msg"];
		retval["txt"] = txt;
		retval["input"] = "&gt;";
		retval["fin"] = 1;
    if (success["msg"].match("Blocked")) { 
      if (DU.gameflags.sound) { play_audio("sfx_walk_blocked"); }
      retval["fin"] = 2; 
    }
		retval["initdelay"] = success["initdelay"];
	}
	else if ((code === 37) || (code === 59)) {  // LEFT ARROW or ;
		// move west
		var success = PC.moveMe(-1,0,0);
		var txt = "Move West";
		txt += success["msg"];
		retval["txt"] = txt;
		retval["input"] = "&gt;";
		retval["fin"] = 1;
    if (success["msg"].match("Blocked")) { 
      if (DU.gameflags.sound) { play_audio("sfx_walk_blocked"); }
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
      if (DU.gameflags.sound) { play_audio("sfx_walk_blocked"); }
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
      if (DU.gameflags.sound) { play_audio("sfx_walk_blocked"); }
      retval["fin"] = 2; 
    }
		retval["initdelay"] = success["initdelay"];
	}
	else if (code === 65) { // a
		// attack
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
		  var newx = PC.getx();
		  var newy = PC.gety();
		  var targetx = 192;
		  var targety = 192;
		  var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		  targetCursor.x = newx;
		  targetCursor.y = newy;
		  targetCursor.command = "a";
		  targetCursor.targetlimit = (viewsizex -1)/2;
		  targetCursor.targetCenterlimit = 0;
		  targetx += (PC.x - edges.centerx) * 32;
		  targety += (PC.y - edges.centery) * 32;
		  var tileid = "#td-tile" + newx + "x" + newy;
		  targetCursor.tileid = tileid;
		  targetCursor.basetile = $(tileid).html();
		  $(tileid).html($(tileid).html() + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:' + targetx + 'px;top:' + targety + 'px;z-index:3" />');
		  retval["txt"] = "";
		  retval["input"] = "&gt; Attack: ";
		  retval["fin"] = 2;
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
		// fire - not used in DU, no boats
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
    gamestate.setMode("target");
    var newx = PC.getx();
    var newy = PC.gety();
    targetCursor.x = newx;
    targetCursor.y = newy;
    targetCursor.command = "l";
    targetCursor.targetlimit = (viewsizex -1)/2;
    targetCursor.targetCenterlimit = 0;
    var targetcoords = getCoords(PC.getHomeMap(), PC.getx(), PC.gety());
    targetx = targetcoords.x;
    targety = targetcoords.y;
    var tileid = "#td-tile" + newx + "x" + newy;
    targetCursor.tileid = tileid;
    targetCursor.basetile = $(tileid).html();
    $(tileid).html($(tileid).html() + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:' + targetx + 'px;top:' + targety + 'px;z-index:3" />');
    retval["txt"] = "";
    retval["input"] = "&gt; Look: ";
    retval["fin"] = 2;
	}
	else if (code === 77) { // m
		// was mix - now, toggles music
    if (DU.gameflags.music) {
      DU.gameflags.music = 0;
      stop_music();
      retval["txt"] = "Music off.";
    } else {
      DU.gameflags.music = 1;
      var song = PC.getHomeMap().getMusic();
      play_audio(song);
      nowplaying = song;
      retval["txt"] = "Music on.";
    }		
    retval["input"] = "&gt;";
    retval["fin"] = 2;
	}
	else if (code === 78) { // n
		// new order - not used
		
	}
	else if (code === 79) { // o
		// open - merged with use
		
	}
	else if (code === 80) { // p
		// peer into gem - not used
		
	}
	else if (code === 81) { // q
		// quit and save
		
	}
	else if (code === 82) { // r
    // was Ready, merged with Wear/Wield
	}
	else if (code === 83) { // s
		gamestate.setMode("choosedir");
		retval["txt"] = "";
		retval["input"] = "&gt; Search: ";
		retval["fin"] = 2;
		targetCursor.command = "s";
		targetCursor.x = PC.getx();
		targetCursor.y = PC.gety();
	}
	else if (code === 84) { // t
		// talk
		if (PC.getHomeMap().getScale() === '0') {
		  retval["txt"] = "No one to talk to.";
		  retval["fin"] = 2;
		  return retval; 
		}
    gamestate.setMode("target");
    var newx = PC.getx();
    var newy = PC.gety();
    targetCursor.x = newx;
    targetCursor.y = newy;
    targetCursor.command = "t";
    targetCursor.targetlimit = (viewsizex -1)/2;
    targetCursor.targetCenterlimit = 3;
    var targetcoords = getCoords(PC.getHomeMap(), PC.getx(), PC.gety());
    targetx = targetcoords.x;
    targety = targetcoords.y;
    var tileid = "#td-tile" + newx + "x" + newy;
    targetCursor.tileid = tileid;
    targetCursor.basetile = $(tileid).html();
    $(tileid).html($(tileid).html() + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:' + targetx + 'px;top:' + targety + 'px;z-index:3" />');
    retval["txt"] = "";
    retval["input"] = "&gt; Talk: ";
    retval["fin"] = 2;
	}
	else if (code === 85) { // u
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
		if (DU.gameflags.sound) { 
		  DU.gameflags.sound = 0; 
		  retval["txt"] = "Sound effects off.";
		}
		else { 
      DU.gameflags.sound = 1; 
      retval["txt"] = "Sound effects on.";
    }
    retval["input"] = "&gt;";
    retval["fin"] = 2;
	}
	else if (code === 87) { // w
		gamestate.setMode("equip");
		retval["txt"] = "";
		retval["input"] = "&gt; Wear/Wield: ";
		retval["fin"] = 2;
		targetCursor.command = "w";		
		
   var statsdiv = "&nbsp;";
   statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
   statsdiv += "<table cellpadding='0' cellspacing='0' border='0'>";
   statsdiv += "<tr><td>&nbsp;&nbsp;</td><td>&nbsp;</td><td></td></tr>";
   var inv = PC.getInventory();
   var melee = [];
   var missile = [];
   var armor = [];
   var iter = 0;
   var itemarray = [];
   if (inv.length) {
     for (var i = 0; i < inv.length; i++) {
       if ((inv[i].checkType("Weapon")) && (!inv[i].checkType("Missile"))) { melee[melee.length] = inv[i]; }
       if (inv[i].checkType("Missile")) { missile[missile.length] = inv[i]; }
       if (inv[i].checkType("Armor")) { armor[armor.length] = inv[i];}
     }
     if (armor.length) {
       armor.sort(function(a,b) { return (b.getDefense() - a.getDefense()); });
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Armour</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
       for (var i = 0; i < armor.length; i++ ) {
         var itemdesc = armor[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         if (armor[i] === PC.getEquipment("armor")) {
           statsdiv += "<tr id='inv" + iter + "'><td class='selected'>*</td><td class='selected'>" + itemdesc + "</td><td>&nbsp;(" + armor[i].getQuantity() + ")</td></tr>";
         } else {
           statsdiv += "<tr id='inv" + iter + "'><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + armor[i].getQuantity() + ")</td></tr>";
         }
         itemarray[iter] = armor[i];
         iter++;
       }
       statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";
     }
     if (melee.length) {
       melee.sort(function(a,b) { return (b.getAveDamage(PC) - a.getAveDamage(PC)); });
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Weapons</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
       for (var i = 0; i < melee.length; i++ ) {
         var itemdesc = melee[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         if (melee[i] === PC.getEquipment("Weapon")) {
           statsdiv += "<tr id='inv" + iter + "'><td class='selected'>*</td><td class='selected'>" + itemdesc + "</td><td>&nbsp;(" + melee[i].getQuantity() + ")</td></tr>";
         } else {
           statsdiv += "<tr id='inv" + iter + "'><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + melee[i].getQuantity() + ")</td></tr>";
         }
         itemarray[iter] = melee[i];
         iter++;
       }
       statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";
     }
     if (missile.length) {
       missile.sort(function(a,b) { return (b.getAveDamage(PC) - a.getAveDamage(PC)); });
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Missile Weapons</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
       for (var i = 0; i < missile.length; i++ ) {
         var itemdesc = missile[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         if (missile[i] === PC.getEquipment("Missile")) {
           statsdiv += "<tr id='inv" + iter + "'><td class='selected'>*</td><td class='selected'>" + itemdesc + "</td><td>&nbsp;(" + missile[i].getQuantity() + ")</td></tr>";
         } else {
           statsdiv += "<tr id='inv" + iter + "'><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + missile[i].getQuantity() + ")</td></tr>";
         }
         itemarray[iter] = missile[i];
         iter++;
       }
       statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";
     }
       
   }
   statsdiv += "<td></td></tr>";
  
   statsdiv += "</table></div></div>";
   DrawTopbarFrame("<p>Equipment</p>");
   $('#displayframe').html(statsdiv);
   
	var scrollelem = $('.zstats').jScrollPane();
  var scrollapi = scrollelem.data('jsp');
  targetCursor.scrollapi = scrollapi;
  targetCursor.scrolllocation = 0;
  targetCursor.itemlist = new Array;
  targetCursor.itemlist = itemarray;
  
  $('#inv0').toggleClass('highlight');
		
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
    targetCursor.page = 1;
    
    DrawStats(targetCursor.page);
	}
	else if ((code === 32) || (code === 13)) { // SPACE or ENTER
		// pass
		retval["txt"] = "Pass.";
		retval["input"] = "&gt;";
		retval["fin"] = 1;
	}
	else {
		//alert(code);
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
	else if ((code === 37) || (code === 59)) {  // LEFT ARROW or ;
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
	else if ((code === 37) || (code === 59)) {  // LEFT ARROW or ;
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
	}
	else if (code === 27) { // ESC
		gamestate.setMode("null");
		retval["fin"] = 0;
		retval["txt"] = "";
		retval["input"] = "&gt;";
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
    retval["txt"] = "Attack: Nothing there!";
    retval["fin"] = 0;  
    retval["input"] = "&gt;";
    return retval;
  } 
  retval = Attack(who, atkwho);
  return retval;
}

function PerformAttackMap(who) {
  var localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
  var atkwho = localacre.npcs.getTop();
  var retval = {};
  if (atkwho) { // there's something there!
//    retval["txt"] = "You attack ";
//    if (atkwho.getPrefix()){ 
//      retval["txt"] += atkwho.getPrefix() + " ";
//    }
//    retval["txt"] += atkwho.getDesc() + ".";
//    retval["fin"] = 2;
//    retval["input"] = "&gt;";
    
//    var combatmapname = localacre.terrain.getCombatMap();
//    if (!combatmapname) { combatmapname = "combatGrass1"; }
    var combatmapname = GetCombatMap(who,atkwho);
    var newmap = new GameMap();
    newmap.loadMap(combatmapname);
    maps.addMapByRef(newmap);

    PC.getHomeMap().deleteThing(atkwho);
    var desttile = MoveBetweenMaps(PC,PC.getHomeMap(),newmap, newmap.getEnterX(), newmap.getEnterY());
    
    var monsters = PlaceMonsters(newmap,atkwho,1);
    DUTime.removeEntityFrom(atkwho);
    
    DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
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
  PC.setInfusion(infuse);
  var hasSpellbook = 0;
  var retval = {};
  for (var lvl = 1; lvl <= 8; lvl++) {
    if (hasSpellbook) { break; }
    for (var i=1; i <= 6; i++) {
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
    while (spell < 7) {
      if (PC.knowsSpell(lvl,GetSpellID(spell))) {
        HighlightSpell(lvl,spell);
        PC.setLastSpell(spell);
        spell = 7;
      } else { 
        spell++;
      }
    }
    retval["fin"] = 0;
    return retval;
  }
  
  if ((code === 37) || (code === 59) || (code === 39) || (code === 222)) { // left or right
    var lvl = PC.getLastSpellLevel();
    var spell = PC.getLastSpell();
    var newlvl = lvl;
    if ((code === 37) || (code === 59)) { // left
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
    var spellnum = PC.getLastSpell();
    $('#spellbookdiv').jqmHide();
    var spelltxt = "Cast: " + magic[lvl][GetSpellID(spellnum)].getName();
    if (PC.getInfusion()) {
      spelltxt += " (Infused)";
    }
    var manacost = magic[lvl][GetSpellID(spellnum)].getManaCost(PC.getInfusion());
    if (PC.getMana() >= manacost) {
      spelltxt += "!";
      maintext.addText(spelltxt);
      var retval = magic[lvl][GetSpellID(spellnum)].executeSpell(PC, PC.getInfusion(), 0);
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
  }
}

function PerformLook() {
	var txt = "";
  var seethis = "";
  var map = PC.getHomeMap();
  var onscreen = $('#td-tile' + targetCursor.x + 'x' + targetCursor.y).html();
//  alert(onscreen);
  var losval = 0;
  if (onscreen.indexOf("You cannot see that") !== -1) { losval = 1; }
  else {
    var tile = map.getTile(targetCursor.x,targetCursor.y);
    var light = tile.getLocalLight();
    if (map.getLightLevel() === "bright") {
      light += 1;
    }
    if (light < SHADOW_THRESHOLD) {
      losval = 1;
    }
  }
//  var losval = map.getLOS(PC.getx(), PC.gety(), targetCursor.x, targetCursor.y, losgrid);
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
  		if (seethis == "") { seethis = npcs[i].getPrefix() + " " + npcs[i].getDesc(); }
  		else { seethis += ", " + npcs[i].getPrefix() + " " + npcs[i].getDesc(); }
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
      		seethis = features[i].getPrefix() + " " + features[i].getDesc();
  	   	}
  	    else if ( typeof features[i].isItem === "function" ) {
  		    if (seethis == "") { seethis = features[i].getPrefix() + " " + features[i].getDesc(); }
 	    		else { seethis += ", " + features[i].getPrefix() + " " + features[i].getDesc(); }
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
				if (features[i].getEnterMap()) {
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
			retval["txt"] = "Entering " + newmap.getDesc() + ".";
			if (descend != "") {
				retval["txt"] = descend;
			} else if (klimb != "") {
				retval["txt"] = klimb;
			}
			DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
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
    who.addToInventory(getitem);
    if (typeof getitem.onGet === "function") {
      getitem.onGet(who);
    }
    retval["txt"] = "Taken: " + getitem.getPrefix() + " " + getitem.getDesc() + ".";
    retval["fin"] = 1;
    DrawMainFrame("one",getitem.getHomeMap().getName(),targetCursor.x,targetCursor.y);
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
  }
	else if ((code === 38) || (code === 219)) {   // UP ARROW  or  [
	    $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrolllocation--;
	    if (targetCursor.scrolllocation < 0) { targetCursor.scrolllocation = targetCursor.itemlist.length-1; }
	    $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrollapi.scrollToElement('#inv' + targetCursor.scrolllocation);
	    retval["fin"] = 1;
	}
  else if ((code === 40) || (code === 191)) { // DOWN ARROW or /
      $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrolllocation++;
	    if (targetCursor.scrolllocation > targetCursor.itemlist.length-1) { targetCursor.scrolllocation = 0; }
	    $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrollapi.scrollToElement('#inv' + targetCursor.scrolllocation);
	    retval["fin"] = 1;
  }
	else if ((code === 32) || (code === 13)) { // SPACE or ENTER
    // equip selected item
    var newequip = targetCursor.itemlist[targetCursor.scrolllocation];
    var success = newequip.equipMe(PC);
    retval["fin"] = 2;
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
  return retval;

//  targetCursor.scrolllocation = 0;
//  targetCursor.itemlist = itemarray;
 
}

function PerformSearch(who) {
  var localacre = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
  var searched = localacre.features.getTop();
  var retval = {};
  if (!searched) {
		retval["txt"] = "There is nothing there.";
		retval["fin"] = 0;
		return retval;
	}
	if (searched.isContainer) {  // add doors to the list
	  // search for traps and such rather than searching for items
	  if (searched.trapped && (who.getInt() <= searched.trapchallenge)) {
	    // If your int is at least half the challenge rating, you automatically find it. 
	    // Maybe I'll change it later.
	    retval["txt"] = "Search: You find a trap!";
	    retval["fin"] = 1;
	    searched.setDesc(searched.getDesc() + " [Trapped]");
	    searched.trapchallenge = Math.floor(searched.trapchallenge / 2);
	    // finding a trap halves the challenge of removing it
	  } else {
	    retval["txt"] = "Search: You find nothing there.";
	    searched.setDesc(searched.getDesc() + " [Searched]");
	  }
	}
  else if ((searched.getSearchYield().length)) {
    if (searched.getShowSearched()) {
      searched.setDesc(searched.getDesc() + " [Searched]");
    }
    retval["txt"] = "Search: You find ";
    retval["fin"] = 1;
    if (searched.getSearchYield().length) {
      var stuff = searched.getSearchYield();
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
//    if (searched.getGold()) {
//      var newthing = localFactory.createTile("Gold");
//      newthing.setQuantity(searched.getGold());
//      who.getHomeMap().placeThing(targetCursor.x,targetCursor.y,newthing);
//      if (searched.getSearchYield().length) {
//        retval["txt"] += ", ";
//      }
//      retval["txt"] += newthing.getDesc();
//    }
    retval["txt"] += ".";
    DrawMainFrame("one",who.getHomeMap().getName(),targetCursor.x,targetCursor.y);
  }  else {
    if (searched.getShowSearched()) {
      searched.setDesc(searched.getDesc() + " [Searched]");
    }
    retval["txt"] = "You find nothing there.";
    retval["fin"] = 1;
  }
  return retval;
}

function PerformTalkTarget() {
  var tileid = targetCursor.tileid;
  $(tileid).html(targetCursor.basetile); 
  var map = PC.getHomeMap();
  var onscreen = $('#td-tile' + targetCursor.x + 'x' + targetCursor.y).html();
//  alert(onscreen);
  var losval = 0;
  if (onscreen.indexOf("You cannot see that") !== -1) { losval = 1; }
  else {
    var tile = map.getTile(targetCursor.x,targetCursor.y);
    var light = tile.getLocalLight();
    if (map.getLightLevel() === "bright") {
      light += 1;
    }
    if (light < SHADOW_THRESHOLD) {
      losval = 1;
    }
  }
//  var losval = map.getLOS(PC.getx(), PC.gety(), targetCursor.x, targetCursor.y, losgrid);
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
  var convo = top.getConversation();
  if (!convo) {
    retval["txt"] = "No one there wishes to speak with you.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
    
    return retval;
  }
  if (top.getConversationFlag()) {
    if (DU.gameflags[top.getConversationFlag()]) {
      top.setConversationFlagged();
    }
  }

  maintext.addText("Talk to: " + top.getDesc());

  retval = PerformTalk(top, convo, "_start");
		
  return retval;

}

function PerformTalk(talkto, convo, topic) {
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
    retval["input"] = "&gt; [MORE]";
    gamestate.setMode("anykey");
  } else if (conval === 3) {
    retval["input"] = "&gt; Buy what: ";
    gamestate.setMode("buy");
  } else if (conval === 4) {
    // Add check for having stuff to sell?
    retval["input"] = "&gt; Sell what: ";
    gamestate.setMode("sell");
  } else {
    retval["input"] = "&gt; You say: ";
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
  var usemap = who.getHomeMap();
	var localacre = usemap.getTile(targetCursor.x,targetCursor.y);
	var used = localacre.features.getTop();
	var retval = {};
	if (!used) {
		retval["txt"] = "There is nothing to use there.";
		retval["fin"] = 0;
		return retval;
	}
	if (typeof used.use === "function") {
		retval = used.use(who);
		retval["fin"] = 1;
		var usedname = used.getDesc();
		usedname = usedname.replace(/^a /, "");
		retval["txt"] = "Use " + usedname + ": " + retval["txt"];
		var drawtype = "one";
		if (used.checkType("Consumable")) {
		  if (used.getHomeMap()) {
		    // being used from the ground
		    used.getHomeMap().deleteThing(used);
		  } else {
		    // being used from inventory
		    who.removeFromInventory(used);
		  }
		}
		if (retval["redrawtype"]) {
		  delete retval["redrawtype"];
		  // if more of the map needs to be redrawn, need to recheck light sources
		  
		  $.each(localacre.localLight, function(index, value) {
		    // each object that is casting light on the door might be casting light through the door.
		    var lightsource = usemap.lightsList[index];
		    who.getHomeMap().removeMapLight(index, usemap.lightsList[index].getLight(), usemap.lightsList[index].getx(), usemap.lightsList[index].gety());
		    who.getHomeMap().setMapLight(lightsource, lightsource.getLight(), lightsource.getx(), lightsource.gety());
		  });
		  
		  DrawMainFrame("draw",used.getHomeMap().getName(),PC.getx(),PC.gety());
		} else {		
		  DrawMainFrame("one",used.getHomeMap().getName(),used.getx(),used.gety());
		}
	} else {
		retval["txt"] = "There is nothing to use there.";
		retval["fin"] = 0;
	}
	return retval;
}

function PerformUseFromInventory() {
		gamestate.setMode("equip");
		var retval = {};
		retval["txt"] = "";
		retval["input"] = "&gt; Use: ";
		retval["fin"] = 2;
		targetCursor.command = "u";		
		
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
       if (inv[i].checkType("Potion")) { pots[pots.length] = inv[i]; }
       if (inv[i].checkType("Scroll")) { scrolls[scrolls.length] = inv[i];}
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
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Potions</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
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
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Scrolls</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
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
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Other</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
       for (var i = 0; i < other.length; i++ ) {
         var itemdesc = other[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         statsdiv += "<tr id='inv" + iter + "'><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + other[i].getQuantity() + ")</td></tr>";
         itemarray[iter] = other[i];
         iter++;
       }
       statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";
     }

   }

   statsdiv += "<td></td></tr>";
  
   statsdiv += "</table></div></div>";
   DrawTopbarFrame("<p>Consumables</p>");
   $('#displayframe').html(statsdiv);
   
	var scrollelem = $('.zstats').jScrollPane();
  var scrollapi = scrollelem.data('jsp');
  targetCursor.scrollapi = scrollapi;
  targetCursor.scrolllocation = 0;
  targetCursor.itemlist = new Array;
  targetCursor.itemlist = itemarray;
  
  $('#inv0').toggleClass('highlight');
		
}

function PerformUseFromInventoryState(code) {
  var retval = {};
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
	    retval["fin"] = 1;
	}
  else if ((code === 40) || (code === 191)) { // DOWN ARROW or /
      $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrolllocation++;
	    if (targetCursor.scrolllocation > targetCursor.itemlist.length-1) { targetCursor.scrolllocation = 0; }
	    $('#inv' + targetCursor.scrolllocation).toggleClass('highlight');  
	    targetCursor.scrollapi.scrollToElement('#inv' + targetCursor.scrolllocation);
	    retval["fin"] = 1;
  }
	else if ((code === 32) || (code === 13)) { // SPACE or ENTER
    // use selected item
    var used = targetCursor.itemlist[targetCursor.scrolllocation];
    if (used) {
  		retval = used.use(PC);
	  	retval["fin"] = 2;
		  var usedname = used.getDesc();
  		usedname = usedname.replace(/^a /, "");
	  	retval["txt"] = "Use " + usedname + ": " + retval["txt"];
      PC.removeFromInventory(used);
    } else {
      retval["fin"] = 0;
      delete targetCursor.itemlist;
    }
  }
  return retval;

//  targetCursor.scrolllocation = 0;
//  targetCursor.itemlist = itemarray;
 
}

function PerformYell() {
	var retval = new Object;
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
		    debug = 0;
		  } else {
		    debug = 1;
		    ActivateDebug();
		  }
		} else if (inputText.txt === "BEAMAGE") {
		  PC.setKnowsInfusion(1);
		  for (var i=1; i<=8; i++) {
		    for (var j=1; j<=6; j++) {
	//	      if (i != 4) {
		        PC.addSpell(i,GetSpellID(j));
	//	      }
		    }
		  }
		} else if (inputText.txt === "ONEUP") {
		  PC.setLevel(PC.getLevel()+1);
		} else if (inputText.txt === "REFRESH") {
		  PC.setMana(PC.getMaxMana());
		} else if (inputText.txt === "RUNTEST") {
		  RunTest();
		}
		retval["txt"] = "Yell: " + inputText.txt + "!";
		retval["fin"] = 1;
		return retval;
	}
}

function performZstats(code) {
  var retval = new Object;
    if ((code === 27) || (code === 90)) { // ESC or Z again
      retval["fin"] = 0;
    }
    else if ((code === 37) || (code === 59)) {  // previous page
      targetCursor.page--;
      if (targetCursor.page === 0) { targetCursor.page = 4; }  // set to the last page when I know what that will be
      DrawStats(targetCursor.page);
      retval["fin"] = 1;
    }
    else if ((code === 39) || (code === 222)) { // next page
      targetCursor.page++;
      if (targetCursor.page === 5) { targetCursor.page = 1; }
      DrawStats(targetCursor.page);
      retval["fin"] = 1;
    }
    else if ((code === 38) || (code === 219)) { // scroll up
      targetCursor.scrollapi.scrollByY(-50,1);
      retval["fin"] = 1;
    }
    else if ((code === 13) || (code === 40) || (code === 191)) { // scroll down
      targetCursor.scrollapi.scrollByY(50,1);
      retval["fin"] = 1;
    }
    else if ((code === 32) || (code === 34)) {  // space or page down
      targetCursor.scrollapi.scrollByY(350,1);
      retval["fin"] = 1;
    }       
    else if ((code === 33)) {  // page up
      targetCursor.scrollapi.scrollByY(-350,1);
      retval["fin"] = 1;
    }       
    else { retval["fin"] = 1; }
      
    return retval;
}

function DrawStats(page) {

  var statsdiv = "&nbsp;";
   
 if (page === 1) {
  statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
  statsdiv += "<table cellpadding='0' cellspacing='0' border='0'><tr>";
  statsdiv += "<td>" + PC.getPCName() + "</td><td width='30'>&nbsp;</td><td></tr>";
  statsdiv += "<tr><td style='width:50%'>HP: " + PC.getDisplayHP() + "/" + PC.getMaxHP() + "</td><td></td>";
  statsdiv += "<td style='width:50%'>MP: " + PC.getMana() + "/" + PC.getMaxMana() + "</td></tr>";
  statsdiv += "<tr><td colspan='3'>&nbsp;<br /></td></tr>";
  statsdiv += "<tr><td>STR: " + PC.getStr() + "</td><td></td><td>LEVEL: " + PC.getLevel() + "</td></tr>";
  statsdiv += "<tr><td>DEX: " + PC.getDex() + "</td><td></td><td>XP: " + PC.getxp() + "</td></tr>";
  statsdiv += "<tr><td>INT: " + PC.getInt() + "</td><td></td><td>Training: " + PC.gettp() + "</td></tr>";
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
  statsdiv += "<td></td></tr>";
  
  statsdiv += "</table></div></div>";
  DrawTopbarFrame("<p>Character</p>");
  
 }
 else if (page === 2) {
   statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
   statsdiv += "<table cellpadding='0' cellspacing='0' border='0'>";
   statsdiv += "<tr><td>&nbsp;&nbsp;</td><td>&nbsp;</td><td></td></tr>";
   var inv = PC.getInventory();
   var melee = [];
   var missile = [];
   var armor = [];
   if (inv.length) {
     for (var i = 0; i < inv.length; i++) {
       if ((inv[i].checkType("Weapon")) && (!inv[i].checkType("Missile"))) { melee[melee.length] = inv[i]; }
       if (inv[i].checkType("Missile")) { missile[missile.length] = inv[i]; }
       if (inv[i].checkType("Armor")) { armor[armor.length] = inv[i];}
     }
     if (armor.length) {
       armor.sort(function(a,b) { return (b.getDefense() - a.getDefense()); });
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Armour</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
       for (var i = 0; i < armor.length; i++ ) {
         var itemdesc = armor[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         if (armor[i] === PC.getEquipment("armor")) {
           statsdiv += "<tr><td class='selected'>*</td><td class='selected'>" + itemdesc + "</td><td>&nbsp;(" + armor[i].getQuantity() + ")</td></tr>";
         } else {
           statsdiv += "<tr><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + armor[i].getQuantity() + ")</td></tr>";
         }
       }
       statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";
     }
     if (melee.length) {
       melee.sort(function(a,b) { return (b.getAveDamage(PC) - a.getAveDamage(PC)); });
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Weapons</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
       for (var i = 0; i < melee.length; i++ ) {
         var itemdesc = melee[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         if (melee[i] === PC.getEquipment("Weapon")) {
           statsdiv += "<tr><td class='selected'>*</td><td class='selected'>" + itemdesc + "</td><td>&nbsp;(" + melee[i].getQuantity() + ")</td></tr>";
         } else {
           statsdiv += "<tr><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + melee[i].getQuantity() + ")</td></tr>";
         }
       }
       statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";
     }
     if (missile.length) {
       missile.sort(function(a,b) { return (b.getAveDamage(PC) - a.getAveDamage(PC)); });
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Missile Weapons</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
       for (var i = 0; i < missile.length; i++ ) {
         var itemdesc = missile[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         if (missile[i] === PC.getEquipment("Missile")) {
           statsdiv += "<tr><td class='selected'>*</td><td class='selected'>" + itemdesc + "</td><td>&nbsp;(" + missile[i].getQuantity() + ")</td></tr>";
         } else {
           statsdiv += "<tr><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + missile[i].getQuantity() + ")</td></tr>";
         }
       }
       statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";
     }
       
   }
   statsdiv += "<td></td></tr>";
  
   statsdiv += "</table></div></div>";
   DrawTopbarFrame("<p>Inventory</p>");
 } else if (page === 3) {
   statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
   statsdiv += "<table cellpadding='0' cellspacing='0' border='0'>";
   statsdiv += "<tr><td>&nbsp;&nbsp;</td><td>&nbsp;</td><td></td></tr>";
   var pots = [];
   var scrolls = [];
   var inv = PC.getInventory();
   if (inv.length) {
     for (var i = 0; i < inv.length; i++) {
       if (inv[i].checkType("Potion")) { pots[pots.length] = inv[i]; }
       if (inv[i].checkType("Scroll")) { scrolls[scrolls.length] = inv[i];}
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
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Potions</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
       for (var i = 0; i < pots.length; i++ ) {
         var itemdesc = pots[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         statsdiv += "<tr><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + pots[i].getQuantity() + ")</td></tr>";
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
       statsdiv += "<tr class='invheader'><td></td><td><span style='text-decoration:underline'>Scrolls</span></td><td>&nbsp;<span style='text-decoration:underline'>Qty</td></tr>";
       for (var i = 0; i < scrolls.length; i++ ) {
         var itemdesc = scrolls[i].getDesc();
         itemdesc = itemdesc.charAt(0).toUpperCase() + itemdesc.slice(1);
         statsdiv += "<tr><td></td><td>" + itemdesc + "</td><td>&nbsp;(" + scrolls[i].getQuantity() + ")</td></tr>";
       }
       statsdiv += "<tr><td></td><td>&nbsp;</td></tr>";      
     }
   }
   statsdiv += "<td></td></tr>";
  
   statsdiv += "</table></div></div>";
   DrawTopbarFrame("<p>Inventory</p>");

 } else if (page === 4) {
   statsdiv += "<div class='outerstats'><div id='zstat' class='zstats'>";
   statsdiv += "<table cellpadding='0' cellspacing='0' border='0'>";
   statsdiv += "<tr><td>&nbsp;</td></tr>";
   
   var hasSpellbook = 0;
   
   for (var lvl = 1; lvl <= 8; lvl++ ){
     var hasLevel = 0;
     for (var i=1; i<=6; i++) {
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
   DrawTopbarFrame("<p>Spellbook</p>");
  }
 
  $('#displayframe').html(statsdiv);
  
	var scrollelem = $('.zstats').jScrollPane();
  var scrollapi = scrollelem.data('jsp');
  targetCursor.scrollapi = scrollapi;

}


function getDisplayCenter(themap,fromx,fromy) {
	var edge = {};
	var leftedge = fromx - (viewsizex - 1)/2;
  if (leftedge < 0) { leftedge = 0; }
  var rightedge = leftedge + viewsizex - 1;
  if (rightedge >= themap.getWidth()) {
  	rightedge = themap.getWidth() -1;  // Note, this will explode somewhat if the map is smaller than 13x13
  	leftedge = rightedge - viewsizex + 1;
  	if (leftedge < 0) { leftedge = 0; }
  }
  var topedge = fromy - (viewsizey - 1)/2;
  if (topedge < 0) { topedge = 0; }
  bottomedge = topedge + viewsizey - 1;
  if (bottomedge >= themap.getHeight()) {
  	bottomedge = themap.getHeight() -1;
  	topedge = bottomedge - viewsizey + 1;
  	if (topedge < 0) {topedge = 0;}
  }
	edge.leftedge = leftedge;
	edge.rightedge = rightedge;
	edge.topedge = topedge;
	edge.bottomedge = bottomedge;
	edge.centerx = (leftedge + rightedge)/2;
	edge.centery = (topedge + bottomedge)/2;
	return edge;
}

function getCoords(mapref, newx, newy, centerfromx, centerfromy) {
  if (!centerfromx) { 
    centerfromx = PC.getx();
    centerfromy = PC.gety();
  }
//  var edges = getDisplayCenter(mapref,newx,newy);
  var edges = getDisplayCenter(mapref,centerfromx,centerfromy);
  var coords = {};
  coords.x = 192 + (newx - edges.centerx) * 32;
  coords.y = 192 + (newy - edges.centery) * 32;

  return coords;
}

function animateEffect(mapref, fromx,fromy,tox,toy,graphic,xoffset,yoffset,destgraphic,destxoffset,destyoffset,destsound) {
  var fromcoords = getCoords(mapref, fromx, fromy);
  var tocoords = getCoords(mapref,tox,toy);
  
  var tablehtml = '<table id="animtable" style="z-index:40; position: absolute; left: ' + fromcoords.x + 'px; top: ' + fromcoords.y + '><tr><td style="background-image:url(\'graphics/' + graphic + '\',background-repeat:no-repeat; background-position: ' + xoffset + 'px ' + yoffset + 'px;"><img src="graphics/spacer.gif" width="32" height="32"></td></tr></table>';
  tilecursor.tileid = "#td-tile" + displayspecs.leftedge + "x" + displayspecs.topedge;
  tilecursor.basetile = $(tilecursor.tileid).html(); 
  $(tilecursor.tileid).html($tilecursor.tileid.html() + tablehtml);
  var duration = Math.pow( Math.pow(tox - fromx, 2) + Math.pow (toy - fromy, 2)  , .5);
  $("#animtable").animate({ left: tocoords.x , top: tocoords.y } , duration, function() {

    });


}

function getDisplayCell(mapname, centerx, centery, x, y) {

  var displayCell = {};
  var localacre = mapname.getTile(x,y);
  var ambientlight = mapname.getLightLevel();
  
  var displaytile;
  // decide whether to draw a tile, draw it shaded, or make it darkness
  var losresult = mapname.getLOS(centerx, centery, x, y, losgrid);

  var blocks = localacre.getBlocksLOS();
  
  var lighthere = 0;
  if (ambientlight === "bright") {
    lighthere = 1;
  }
  else {
    if ((blocks > LOS_THRESHOLD) && ((centerx != x) || (centery != y) )) {
      var dirnum = GetDirection(centerx,centery,x,y);
      if ((dirnum === 6) || (dirnum === 7) || (dirnum === 0)) {
        var selight = localacre.getLocalLight("se");
        if (selight > lighthere) {
          lighthere = selight;
        }
      } if ((dirnum >= 0) && (dirnum <= 2)) {
        var swlight = localacre.getLocalLight("sw");
        if (swlight > lighthere) {
          lighthere = swlight;
        }
      } if ((dirnum >= 2) && (dirnum <= 4)) {
        var nwlight = localacre.getLocalLight("nw");
        if (nwlight > lighthere) {
          lighthere = nwlight;
        }
      } if ((dirnum >= 4) && (dirnum <= 6)) {
        var nelight = localacre.getLocalLight("ne");
        if (nelight > lighthere) {
          lighthere = nelight;
        }
      }
    } else {
      lighthere = localacre.getLocalLight("center");
    }
  }
  
  displaytile = localacre.getTop();
  while (displaytile.getName() === "SeeBelow") {
    var retval = FindBelow(x,y,mapname);
    localacre = retval.tile;
    mapname = retval.map;
    displaytile = localacre.getTop();
  }
  var graphics = displaytile.getGraphicArray();
  var showGraphic = graphics[0];
  if (typeof displaytile.setBySurround === "function") {
   	graphics = displaytile.setBySurround(x,y,mapname,graphics,1,centerx,centery,losresult);
    showGraphic = graphics[0];
    if (typeof displaytile.doTile === "function") {
      showGraphic = displaytile.doTile(x,y,showGraphic);
    }
    displayCell.showGraphic = showGraphic;
    displayCell.graphics2 = graphics[2];
    displayCell.graphics3 = graphics[3];
    displayCell.graphics1 = graphics[1];
    displayCell.losresult = losresult;
    displayCell.lighthere = lighthere;
    displayCell.desc = displaytile.getDesc();
    
//    mapdiv += '<td class="maptd" id="td-tile'+x+'x'+y+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat; background-position: ' + graphics[2] + 'px ' + graphics[3] + 'px;"><img id="tile'+x+'x'+y+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+x+'x'+y+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" style="position: relative; z-index:1;" title="' + displaytile.getDesc() + '" /></td>';
  }
  else if (losresult < LOS_THRESHOLD) {
    if (typeof displaytile.doTile === "function") {
      showGraphic = displaytile.doTile(x,y,showGraphic);
    }
    if (typeof displaytile.setByBelow === "function") {
      var setbelow = displaytile.setByBelow(x,y,mapname);
      showGraphic = setbelow[0];
      graphics[2] = setbelow[2];
      graphics[3] = setbelow[3];
//      showGraphic = displaytile.setByBelow(x,y,mapname);
    }
    displayCell.showGraphic = showGraphic;
    displayCell.graphics2 = graphics[2];
    displayCell.graphics3 = graphics[3];
    displayCell.graphics1 = graphics[1];
    displayCell.losresult = losresult;
    displayCell.lighthere = lighthere;
    displayCell.desc = displaytile.getDesc();
//    mapdiv += '<td class="maptd" id="td-tile'+x+'x'+y+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat; background-position: ' + graphics[2] + 'px ' + graphics[3] + 'px;"><img id="tile'+x+'x'+y+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+x+'x'+y+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" style="position: relative; z-index:1" title="' + displaytile.getDesc() + '" /></td>';
  } else {
    displaytile = eidos.getForm('BlankBlack');
    graphics = displaytile.getGraphicArray();
    showGraphic = graphics[0];
    displayCell.showGraphic = showGraphic;
    displayCell.graphics2 = graphics[2];
    displayCell.graphics3 = graphics[3];
    displayCell.graphics1 = graphics[1];
    displayCell.losresult = losresult;
    displayCell.lighthere = lighthere;
    displayCell.desc = "You cannot see that";
//    mapdiv += '<td class="maptd" id="td-tile'+x+'x'+y+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat; background-position: ' + graphics[2] + 'px ' + graphics[3] + 'px;"><img id="tile'+x+'x'+y+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+x+'x'+y+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" style="position: relative; z-index:1" title="You cannot see that" /></td>';
  }
return displayCell;
}


function MoveBetweenMaps(who,frommap,tomap,destx,desty,overridetests) {
  
  var retval = {};
  var oldx = who.getx();
  var oldy = who.gety();
  
  if (!overridetests) {  
    // check exit test
    if (typeof frommap.ExitTest === "function") {
      
    }
    
    if (typeof tomap.EnterTest === "function") {
      
    }
  }

  if (typeof frommap.Exit === "function") {
    
  }
  
  if (typeof tomap.Enter === "function") {
    tomap.Enter(who,frommap,who.getx(),who.gety(),destx,desty);
    
  }

  
  // determine time scale for this move
  if ((frommap.getScale()) || tomap.getScale()) { who.smallscalemove = 1; }
  
	// remove PC from current map
	frommap.deleteThing(who);
	// also delete any NPCs following PC (summoned demons) FIXTHIS
	tomap.placeThing(destx,desty,who);
	who.setHomeMap(tomap);
	var tile = tomap.getTile(destx,desty);
  var oldtile = frommap.getTile(oldx,oldy);
  
  // update pathfinding   // NO LONGER NECESSARY, mobs no longer impact paths
//	for (var i=1; i<=16; i=i*2) {
//	  var response = oldtile.canMoveHere(i, 1);
//	  if (response["canmove"]) { frommap.setWalkableAt(oldx,oldy,true,i); }
//	  else { frommap.setWalkableAt(oldx,oldy,false,i); }
//	  response = tile.canMoveHere(i, 1);
//	  if (response["canmove"]) { tomap.setWalkableAt(destx,desty,true,i); }
//	  else { tomap.setWalkableAt(destx,desty,false,i); }
//	}
	
	// Remove unneeded maps from mapmemory
	if (who === PC){
  	var keepmap = frommap.getAlwaysRemember();
	  if (!keepmap) {
		  // is old map linked to new map?
		  var linkedmaps = tomap.getLinkedMaps();
		  if (linkedmaps.length > 0) {
		  	for (var i=0; i<linkedmaps.length; i++) {
			  	if (linkedmaps[i] == frommap.getName()) {
				  	keepmap = 1;
  				}
	  		}
		  }
  	}
	
	  if (keepmap === 0) {
		  maps.deleteMap(frommap.getName());
  	}
  }
	
	if ((DU.gameflags.music) && (who === PC) && (tomap.getMusic() !== nowplaying)) {
	  stop_music();
	  var song = tomap.getMusic();
	  play_audio(song);
	  nowplaying = song;
	}
	
	return tile;

}

function FindBelow(upx,upy,map) {
	if (!map.getSeeBelow()) { return 0; }
	var lowermapname = map.getSeeBelow();
	var lowermap = maps.getMap(lowermapname);
	var tile = lowermap.getTile(upx,upy);
	if (tile) { 
	  var retval = {};
	  retval.tile = tile;
	  retval.map = lowermap;
	  return retval; 
	}
	return 0;
}

function ParseDice(die) {
  var dieobj = {};
  if (parseInt(die) == die) {
    dieobj.plus = die;
    dieobj.quantity = 0;
    dieobj.dice = 0;
    return dieobj;
  }
  var tmpobj = [];
  tmpobj = die.split("+");
  if (tmpobj[1]){
    dieobj.plus = parseInt(tmpobj[1]);
    tmpobj = tmpobj[0].split("d");
    if (tmpobj[1]) {
      dieobj.dice = parseInt(tmpobj[1]);
      dieobj.quantity = parseInt(tmpobj[0]);
    } else {
      dieobj.dice = 1;
      dieobj.quantity = 0;
    }
  } else {
    dieobj.plus = 0;
    tmpobj = die.split("d");
    if (tmpobj[1]) {
      dieobj.dice = parseInt(tmpobj[1]);
      dieobj.quantity = parseInt(tmpobj[0]);
    } else {
      dieobj.dice = 1;
      dieobj.quantity = 0;
    }
  }

  return dieobj;
}

function RollDice(die) {
  var dieobj = ParseDice(die);
  var roll = dieobj.plus;
  if (dieobj.quantity > 0) {
    for (var i = 1; i <= dieobj.quantity; i++) {
      roll += Math.floor(Math.random() * dieobj.dice)+ 1;
    }
  }	

  return roll;
}

function PlaceMonsters(battlemap,group,whoseturn) {
  var monsters = [];
  if (typeof group.populate === "function") {
    monsters = group.populate();
  } else {
    alert("Non-group monster on world map.");
    return 0;
  }
    
  var monstercoords = [];
  switch (monsters.length) {
      case 1:
        monstercoords[0] = {x:6, y:3};
        break;
      case 2:
        var coin = Math.floor(Math.random() * 2) +1;
        if (coin == 1) {
          monstercoords[0] = {x:5, y:3};
          monstercoords[1] = {x:7, y:3};
        }
        else if (coin == 2) {
          monstercoords[0] = {x:6, y:2};
          monstercoords[1] = {x:6, y:4};
        }
        break;
      case 3:
        var coin = Math.floor(Math.random() * 2) +1;
        if (coin == 1) {
          monstercoords[0] = {x:6, y:3};
          monstercoords[1] = {x:4, y:1};
          monstercoords[2] = {x:8, y:1};
        }
        else if (coin == 2) {
          monstercoords[0] = {x:6, y:1};
          monstercoords[1] = {x:4, y:3};
          monstercoords[2] = {x:8, y:3};
        }
        break;
      case 4:
        var coin = Math.floor(Math.random() * 2) +1;
        if (coin === 1) {
          monstercoords[0] = {x:4, y:1};
          monstercoords[1] = {x:5, y:3};
          monstercoords[2] = {x:7, y:3};
          monstercoords[3] = {x:8, y:1};
        }
        else if (coin === 2) {
          monstercoords[0] = {x:6, y:1};
          monstercoords[1] = {x:6, y:3};
          monstercoords[2] = {x:8, y:2};
          monstercoords[3] = {x:4, y:2};
        }
        break;
      case 5:
        var coin = Math.floor(Math.random() * 4) +1;
        if (coin === 1) {
          monstercoords[0] = {x:6, y:4};
          monstercoords[1] = {x:8, y:3};
          monstercoords[2] = {x:7, y:1};
          monstercoords[3] = {x:4, y:3};
          monstercoords[4] = {x:5, y:1};
        }          
        else if (coin === 2){
          monstercoords[0] = {x:6, y:2};
          monstercoords[1] = {x:8, y:3};
          monstercoords[2] = {x:7, y:1};
          monstercoords[3] = {x:4, y:3};
          monstercoords[4] = {x:5, y:1};
        }
        else if (coin === 3){
          monstercoords[0] = {x:7, y:4};
          monstercoords[1] = {x:5, y:4};
          monstercoords[2] = {x:6, y:2};
          monstercoords[3] = {x:4, y:2};
          monstercoords[4] = {x:8, y:2};
        }
        else if (coin === 4){
          monstercoords[0] = {x:7, y:1};
          monstercoords[1] = {x:5, y:1};
          monstercoords[2] = {x:6, y:3};
          monstercoords[3] = {x:4, y:3};
          monstercoords[4] = {x:8, y:3};
        }
        break;
      case 6:
        var coin = Math.floor(Math.random() * 5) +1;
        if (coin === 1) {
          monstercoords[0] = {x:6, y:3};
          monstercoords[1] = {x:5, y:2};
          monstercoords[2] = {x:7, y:2};
          monstercoords[3] = {x:6, y:1};
          monstercoords[4] = {x:4, y:1};
          monstercoords[5] = {x:8, y:1};
        } else if (coin === 2) {
          monstercoords[0] = {x:4, y:1};
          monstercoords[1] = {x:5, y:2};
          monstercoords[2] = {x:4, y:3};
          monstercoords[3] = {x:8, y:1};
          monstercoords[4] = {x:7, y:2};
          monstercoords[5] = {x:8, y:3};
        } else if (coin === 3) {
          monstercoords[0] = {x:4, y:1};
          monstercoords[1] = {x:6, y:2};
          monstercoords[2] = {x:8, y:1};
          monstercoords[3] = {x:4, y:3};
          monstercoords[4] = {x:6, y:4};
          monstercoords[5] = {x:8, y:3};
        } else if (coin === 4) {
          monstercoords[0] = {x:4, y:1};
          monstercoords[1] = {x:6, y:1};
          monstercoords[2] = {x:8, y:1};
          monstercoords[3] = {x:4, y:3};
          monstercoords[4] = {x:6, y:3};
          monstercoords[5] = {x:8, y:3};
        } else if (coin === 5) {
          monstercoords[0] = {x:5, y:1};
          monstercoords[1] = {x:7, y:1};
          monstercoords[2] = {x:5, y:3};
          monstercoords[3] = {x:7, y:3};
          monstercoords[4] = {x:5, y:5};
          monstercoords[5] = {x:7, y:5};
        }
        break;
      case 7:
        var coin = Math.floor(Math.random() * 3) +1;
        if (coin === 1) {
          monstercoords[0] = {x:6, y:4};
          monstercoords[1] = {x:5, y:3};
          monstercoords[2] = {x:7, y:3};
          monstercoords[3] = {x:6, y:2};
          monstercoords[4] = {x:4, y:2};
          monstercoords[5] = {x:8, y:2};
          monstercoords[6] = {x:5, y:1};
        } else if (coin === 2) {
          monstercoords[0] = {x:6, y:4};
          monstercoords[1] = {x:5, y:3};
          monstercoords[2] = {x:7, y:3};
          monstercoords[3] = {x:6, y:2};
          monstercoords[4] = {x:4, y:2};
          monstercoords[5] = {x:8, y:2};
          monstercoords[6] = {x:7, y:1};
        } else if (coin === 3) {
          monstercoords[0] = {x:6, y:4};
          monstercoords[1] = {x:5, y:3};
          monstercoords[2] = {x:7, y:3};
          monstercoords[3] = {x:5, y:1};
          monstercoords[4] = {x:4, y:2};
          monstercoords[5] = {x:8, y:2};
          monstercoords[6] = {x:7, y:1};
        }
        break;
      case 8:
        monstercoords[0] = {x:6, y:4};
        monstercoords[1] = {x:5, y:3};
        monstercoords[2] = {x:7, y:3};
        monstercoords[3] = {x:6, y:2};
        monstercoords[4] = {x:4, y:2};
        monstercoords[5] = {x:8, y:2};
        monstercoords[6] = {x:5, y:1};
        monstercoords[7] = {x:7, y:1};
        break;
      
  }

  for (var i =0; i < monsters.length; i++) {
//    monsters[i].setHomeMap(battlemap);
    var timetoplace = 0;
    if (!whoseturn) { // combat began on NPC turn
      timetoplace = .001;
    }
    battlemap.placeThing(monstercoords[i].x,monstercoords[i].y,monsters[i],timetoplace);
  }

  return monsters;
}

function GetDirection(viewerx, viewery, targx, targy) {
  var direction;
  var diffx = targx - viewerx;
  var diffy = targy - viewery;
  if ((diffx === 0) && (diffy < 0)) {
    direction = 0;
  } else if ((diffx === 0) && (diffy > 0)) {
    direction = 4;
  } else {
    if ((diffy === 0) && (diffx > 0)) {
      direction = 2;
    } else if ((diffy === 0) && (diffx < 0)) {
      direction = 6;
    }
    else { 
      var horflip = 0;
      var verflip = 1;
      if (diffy < 0) { 
        diffy = Math.abs(diffy); 
        verflip = 0;
      }
      if (diffx < 0) {
        diffx = Math.abs(diffx);
        horflip = 1;
      }
      slope = diffy/diffx;
      if ((slope > 2.42) && (verflip === 0)) {
        direction = 0;
      }
      else if ((slope > 2.42) && (verflip === 1)) {
        direction = 4;
      }
      else if ((slope < .414) && (horflip === 0)) {
        direction = 2;
      }
      else if ((slope < .414) && (horflip === 1)) {
        direction = 6;
      }
      else if ((verflip === 0) && (horflip === 0)) {
        direction = 1;
      }
      else if ((verflip === 1) && (horflip === 0)) {
        direction = 3;
      }
      else if ((verflip === 1) && (horflip === 1)) {
        direction = 5;
      }
      else if ((verflip === 0) && (horflip === 1)) {
        direction = 7;
      }
      else { alert("Error in direction finding."); }
    }
  }
  return direction;
}

function WritePages() {   
  var divid = "#spellbookinnerdiv";
  var spellhtml = "<table class='spells'>";
  var showpages = Math.ceil(PC.getLastSpellLevel()/2);
  if (showpages === 1) {
    spellhtml += "<tr><td class='spelllevel'>First Circle</td><td><img src='graphics/spacer.gif' width='60' height='16' /></td><td class='spelllevel'>Second Circle</td></tr><tr><td class='spellslist'>";
  } else if (showpages === 2) {
    spellhtml += "<tr><td class='spelllevel'>Third Circle</td><td><img src='graphics/spacer.gif' width='60' height='16' /></td><td class='spelllevel'>Fourth Circle</td></tr><tr><td class='spellslist'>";
  } else if (showpages === 3) {
    spellhtml += "<tr><td class='spelllevel'>Fifth Circle</td><td><img src='graphics/spacer.gif' width='60' height='16' /></td><td class='spelllevel'>Sixth Circle</td></tr><tr><td class='spellslist'>";
  } else if (showpages === 4) {
    spellhtml += "<tr><td class='spelllevel'>Seventh Circle</td><td><img src='graphics/spacer.gif' width='60' height='16' /></td><td class='spelllevel'>Eighth Circle</td></tr><tr><td class='spellslist'>";
  }
  spellhtml += GetSpellList((showpages*2)-1);
  spellhtml += "</td><td></td><td class='spellslist'>";
  spellhtml += GetSpellList(showpages*2);
  spellhtml += "</td></tr></table>"
  
  $(divid).html(spellhtml);
  if (PC.getLastSpell()) {
    var spellspan = "#level" + PC.getLastSpellLevel() + "spell" + PC.getLastSpell();
    $(spellspan).addClass("selected");
  }
}

function HighlightSpell(lvl,spell) {
  var spellspan = "#level" + PC.getLastSpellLevel() + "spell" + PC.getLastSpell();
  $(spellspan).removeClass("selected");
  spellspan = "#level" + lvl + "spell" + spell;
  $(spellspan).addClass("selected");
}

function GetSpellList(lvl) {
  var makehtml = "";
  for (var i=1;i<=6;i++) {
    if (PC.knowsSpell(lvl,GetSpellID(i))) {
      makehtml += "<span id='level" + lvl + "spell" + i + "'>" + magic[lvl][GetSpellID(i)].getName() + "</span>";
      // need to add a mouseclick to the spells for tablet play
      if (i < 6) { makehtml += "<br />"; }
    }
  }
  return makehtml;
}

function GetCombatMap(atk,def) {
  var atk_tile = atk.getHomeMap().getTile(atk.getx(),atk.gety());
  var def_tile = def.getHomeMap().getTile(def.getx(),def.gety());
  var atk_terrain = atk_tile.terrain.getCombatMap();
  if (!atk_terrain) { atk_terrain = "Grass"; }
  var def_terrain = def_tile.terrain.getCombatMap();
  if (!def_terrain) { def_terrain = "Grass"; }
  
  var rand = Math.floor((Math.random()*2)+1); 
  
  if ((atk_terrain === "Water") && (def_terrain === "Water")) {
    var final = "combatWater" + rand;
    return final;
  } 
  
  if ((atk_terrain === "Water") || (def_terrain === "Water")) {
    var PC_tile = PC.getHomeMap().getTile(PC.getx(),PC.gety());
    var PC_terrain = PC_tile.terrain.getCombatMap();
    if (PC_terrain === "Water") {  // PC attacking from offshore
      var final = "combatCoast" + rand;
      return final;
    } else {  // PC fighting an offshore foe
      var final = "combatShore" + rand;
      return final;
    }
  }
  
  var final = "combat" + def_terrain + rand;
  return final;
  
}

function SpellInitials(who) {
  var initials = "";
  var spells = who.getSpellEffects();
  if (spells) {
    for (var i=0; i<spells.length; i++) {
      if (spells[i].getDisplay()) {
        if (!initials.match(spells[i].getDisplay())) {
          initials += spells[i].getDisplay();
        }
      }
    }
  }
  return initials;
}

function DamageFlash() {
  $('#hpcell').css("background-color", "white");
  $('#hpcell').css("color", "black");
  setTimeout(function() { $('#hpcell').css("background-color", "black"); $('#hpcell').css("color", "white"); }, 250);
}

function GetDistance(x1,y1,x2,y2) {
  var dist = Math.pow(Math.pow(x1-x2,2) + Math.pow(y1-y2,2), 1/2)
  return dist;
}

function PerformTrap(who, trap, traplvl, trapped) {
  // Traps can be: Dart (makes atk roll, poison), acid (physical damage), gas (poison), explosion (magical damage), drain (mana)
  
  if (trap === "dart") {
    var def = who.getDefense();
    var tohit = (2*traplvl - def)/100;
    if (tohit < .05) { tohit = .05; }
    if (debug) { dbs.writeln("Dart trap fires, lvl " + traplvl + ", player defense is " + def + ", change to hit is " + tohit + "<br />"); }
    if (Math.random() < tohit) {  // dart hits!
      maintext.addText("TRAP! A dart strikes you. You are poisoned.");
      var poison = localFactory.createTile("Poison");
      who.addSpellEffect(poison);
      DrawCharFrame();
      return 1;
    } else {  // dart misses
      maintext.addText("TRAP! You barely avoid a poisoned dart.");
      return 0;
    } 
  } else if (trap === "acid") {
    var aciddmg = RollDice("1d6+3");
    who.dealDamage(aciddmg, trapped);
    maintext.addText("TRAP! You are splashed with acid.");
    DrawCharFrame();
    return 1;
  } else if (trap === "gas") {
    maintext.addText("TRAP! You are poisoned.");
    var poison = localFactory.createTile("Poison");
    who.addSpellEffect(poison);
    DrawCharFrame();
    return 1;    
  } else if (trap === "explosion") {
    maintext.addText("TRAP! There is an explosion!");
    var firedmg = RollDice("3d6");
    who.dealDamage(firedmg,trapped);
    DrawCharFrame();
    return 1;
  } else if (trap === "drain") {
    maintext.addText("TRAP! You feel a pull on your mind.");
    var drain = RollDice("2d4");
    if (drain > who.getMana()) {
      drain = who.getMana();
    }
    who.modMana(-1*drain);
    return 1;
  }
  alert("Bad trap type");
}
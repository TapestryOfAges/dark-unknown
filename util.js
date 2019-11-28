"use strict";

function getCoords(mapref, newx, newy, centerfromx, centerfromy) {
  if (!centerfromx) { 
    centerfromx = PC.getx();
    centerfromy = PC.gety();
  }
  let edges = getDisplayCenter(mapref,centerfromx,centerfromy);
  let coords = {};
  coords.x = 192 + (newx - edges.centerx) * 32;
  coords.y = 192 + (newy - edges.centery) * 32 +2;

  return coords;
}

function MoveBetweenMaps(who,frommap,tomap,destx,desty,overridetests) {
  let oldx = who.getx();
  let oldy = who.gety();
  
  if (!overridetests) {  
    // check exit test
    if (typeof frommap.ExitTest === "function") {
      let exittest = frommap.ExitTest(who,tomap,oldx,oldy,destx,desty);
      if (!exittest) { return 0; }
    }
    
    if (typeof tomap.EnterTest === "function") {
      let entertest = tomap.Enter(who,frommap,oldx,oldy,destx,desty);
      if (!entertest) { return 0; }
    }
  }

  if (typeof frommap.Exit === "function") {
    frommap.Exit(who,tomap,oldx,oldy,destx,desty);
  }
  
  if (typeof tomap.Enter === "function") {
    tomap.Enter(who,frommap,oldx,oldy,destx,desty);
    
  }

  
  // determine time scale for this move
  if ((frommap.getScale()) || tomap.getScale()) { who.smallscalemove = 1; }

  if ((who !== PC) && (!tomap.getScale())) {
    // a non-PC is fleeing to a world map. Delete instead.
    frommap.deleteThing(who);
    DrawMainFrame("one",frommap,oldx,oldy);
    DUTime.removeEntityFrom(who);
    CheckPostDeathMusic(frommap);
    let spawner=who.getSpawnedBy();
    if (spawner) {
      spawner.deleteSpawned(who);
    }

  }
  
	// remove entity from current map
	frommap.deleteThing(who);
	// also delete any NPCs following PC (summoned demons) FIXTHIS
  tomap.placeThing(destx,desty,who,0,"noactivate");
	who.setHomeMap(tomap);
	let tile = tomap.getTile(destx,desty);
  let oldtile = frommap.getTile(oldx,oldy);
    
  if (PC.getHomeMap() === frommap) {
    DrawMainFrame("one",frommap,oldx,oldy);
  } else if ((who !== PC) && (PC.getHomeMap() === tomap)) {
    DrawMainFrame("one",tomap,destx,desty);
  }
  
	// Remove unneeded maps from mapmemory
	if (who === PC){
	  spellcount = {};  // see magic.js, this prevents animations from continuing
  	let keepmap = frommap.getAlwaysRemember();
	  if (!keepmap) {
		  // is old map linked to new map?
		  let linkedmaps = tomap.getLinkedMaps();
		  if (linkedmaps.length > 0) {
		  	for (let i=0; i<linkedmaps.length; i++) {
			  	if (linkedmaps[i] == frommap.getName()) {
				  	keepmap = 1;
  				}
	  		}
		  }
  	}
	
	  if (keepmap === 0) {
	    DebugWrite("map", "<span style='font-weight:bold'>DESTROYING MAP " + frommap.getName() + ".</span><br />");
		  maps.deleteMap(frommap.getName());
		  
		  // remove stuff from the map from the timelines
		  DUTime.cleanTimeline();
  	}
  	DrawCharFrame();  // to remove Negate if it's present
  }

	if (who === PC) { ProcessAmbientNoise(tile); }
	if ((DU.gameflags.getFlag("music")) && (who === PC) && (tomap.getMusic() !== nowplaying.name)) {
//	  StopMusic(nowplaying);
	  let song = tomap.getMusic();
	  DUPlayMusic(song);
	}
	
	return tile;

}

function AdjustStartingLocations(amap) {
  let allnpcs = amap.npcs.getAll();
  let linked = amap.getLinkedMaps();

  if (linked && (linked.length > 0) && (linked[0] !== "")) {
    let othermap = new GameMap();
    for (let j=0;j<linked.length;j++) {
      othermap = maps.getMap(linked[j]);
      let othernpcs = othermap.npcs.getAll();
      for (let i=0;i<othernpcs.length;i++) {
        allnpcs.push(othernpcs[i]);
      }
    }
  }

  for (let i=0;i<allnpcs.length;i++) {

    if (allnpcs[i]._mapName && (allnpcs[i].getHomeMap().getName() !== allnpcs[i]._mapName)) {
      let destmap = maps.getMap(allnpcs[i]._mapName);
      let oldmap = allnpcs[i].getHomeMap();
      if (!destmap) { alert("Failure to find map " + allnpcs[i]._mapName + " while moving " + allnpcs[i].getNPCName()); }
      let oldtile = oldmap.getTile(allnpcs[i].gety(),allnpcs[i].gety());
      // no need to execute walkoffs, didn't execute walkons
      let desttile = MoveBetweenMaps(allnpcs[i],allnpcs[i].getHomeMap(),destmap,allnpcs[i]._x,allnpcs[i]._y);
      desttile.executeWalkons(allnpcs[i]);
      DebugWrite("schedules", "During map population, moved this NPC (" + allnpcs[i].getNPCName() + ") to its correct map by schedule (from " + oldmap.getName() + " to " + destmap.getName() + " at " + allnpcs[i]._x + "," + allnpcs[i]._y + ").<br />");
      delete allnpcs[i]._mapName;
      delete allnpcs[i]._x;
      delete allnpcs[i]._y;
    }
  }
}

function FindBelow(upx,upy,map) {
	if (!map.getSeeBelow()) { return 0; }
	let lowermapname = map.getSeeBelow();
	let lowermap = maps.getMap(lowermapname);
	let tile = lowermap.getTile(upx,upy);
	if (tile) { 
	  let retval = {};
	  retval.tile = tile;
	  retval.map = lowermap;
	  return retval; 
	}
	return 0;
}

function DiceObject() {
	
  this.parse = function(die) {
    let dieobj = {};
    if (parseInt(die) == die) {
      dieobj.plus = parseInt(die);
      dieobj.quantity = 0;
      dieobj.dice = 0;
      return dieobj;
    }
    if (/\d+d\d+\-\d+/.test(die)) {
      die = die.replace(/\-/,'+-');
    }
    let tmpobj = [];
    tmpobj = die.split("+");
    if (tmpobj[1]){
      dieobj.plus = parseInt(tmpobj[1]);
      tmpobj = tmpobj[0].split("d");
      if (tmpobj[1]) {
        dieobj.dice = parseInt(tmpobj[1]);
        dieobj.quantity = parseInt(tmpobj[0]);
        if (isNaN(dieobj.quantity)) { dieobj.quantity = 1; }
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
        if (isNaN(dieobj.quantity)) { dieobj.quantity = 1; }
      } else {
        dieobj.dice = 1;
        dieobj.quantity = 0;
      }
    }

    return dieobj;		
	}
	
  this.roll = function(die) {
    let dieobj = this.parse(die);
    let roll = dieobj.plus;
    if (dieobj.quantity > 0) {
      for (let i = 1; i <= dieobj.quantity; i++) {
        roll += Math.floor(Math.random() * dieobj.dice)+ 1;
      }
    }	 

    return roll;  
  }
  
  this.rollmin = function(die) {
    let dieobj = this.parse(die);
    return (dieobj.plus + dieobj.quantity);
  }
  
  this.rollave = function(die) {
    let dieobj = this.parse(die);
    return (dieobj.plus + dieobj.quantity * (1+dieobj.dice)/2);  
  }

  this.rollmax = function(die) {
    let dieobj = this.parse(die);
    return (dieobj.dice*dieobj.quantity + dieobj.plus);
  }
}
DiceObject.prototype = new Object();

function PlaceMonsters(battlemap,group,whoseturn) {
  let monsters = [];
  if (typeof group.populate === "function") {
    monsters = group.populate();
  } else {
    alert("Non-group monster on world map.");
    return 0;
  }
    
  let monstercoords = [];
  let coin;
  switch (monsters.length) {
      case 1:
        monstercoords[0] = {x:6, y:3};
        break;
      case 2:
        if (Dice.roll("1d2") === 1) {
          monstercoords[0] = {x:5, y:3};
          monstercoords[1] = {x:7, y:3};
        }
        else {
          monstercoords[0] = {x:6, y:2};
          monstercoords[1] = {x:6, y:4};
        }
        break;
      case 3:
        if (Dice.roll("1d2") === 1) {
          monstercoords[0] = {x:6, y:3};
          monstercoords[1] = {x:4, y:1};
          monstercoords[2] = {x:8, y:1};
        }
        else {
          monstercoords[0] = {x:6, y:1};
          monstercoords[1] = {x:4, y:3};
          monstercoords[2] = {x:8, y:3};
        }
        break;
      case 4:
        if (Dice.roll("1d2") === 1) {
          monstercoords[0] = {x:4, y:1};
          monstercoords[1] = {x:5, y:3};
          monstercoords[2] = {x:7, y:3};
          monstercoords[3] = {x:8, y:1};
        }
        else {
          monstercoords[0] = {x:6, y:1};
          monstercoords[1] = {x:6, y:3};
          monstercoords[2] = {x:8, y:2};
          monstercoords[3] = {x:4, y:2};
        }
        break;
      case 5:
        coin = Dice.roll("1d4");
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
        coin = Dice.roll("1d5");
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
        coin = Dice.roll("1d3");
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

  for (let i=0; i < monsters.length; i++) {
    let timetoplace = 0;
    if (!whoseturn) { // combat began on NPC turn
      timetoplace = .001;
    }
    battlemap.placeThing(monstercoords[i].x,monstercoords[i].y,monsters[i],timetoplace);
  }

  return monsters;
}

function GetDirection(viewerx, viewery, targx, targy) {
  let direction;
  let diffx = targx - viewerx;
  let diffy = targy - viewery;
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
      let horflip = 0;
      let verflip = 1;
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

function GetViewDirection(viewerx, viewery, targx, targy) {
  let direction;
  let diffx = targx - viewerx;
  let diffy = targy - viewery;
  if ((diffx === 0) && (diffy === 0)) {
    direction = -1;
  } else if ((diffx === 0) && (diffy < 0)) {
    direction = 0;
  } else if ((diffx === 0) && (diffy > 0)) {
    direction = 4;
  } else if ((diffy === 0) && (diffx < 0)) {
    direction = 6;
  } else if ((diffy === 0) && (diffx > 0)) {
    direction = 2;
  } else if ((diffx > 0) && (diffy < 0)) { 
    direction = 1;
  } else if ((diffx > 0) && (diffy > 0)) { 
    direction = 3;
  } else if ((diffx < 0) && (diffy < 0)) { 
    direction = 7;
  } else if ((diffx < 0) && (diffy > 0)) { 
    direction = 5;
  }

  return direction;
}

function WritePages() {   
  let divid = "spellbookinnerdiv";
  let spellhtml = "<table class='spells'>";
  let showpages = Math.ceil(PC.getLastSpellLevel()/2);
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
  
  document.getElementById(divid).innerHTML = spellhtml;
  if (PC.getLastSpell()) {
    let spellspan = "level" + PC.getLastSpellLevel() + "spell" + PC.getLastSpell();
    document.getElementById(spellspan).classList.toggle("selected");
    document.getElementById("spellbookinnerdiv").innerHTML += "<div class='spelldescs' id='spelldesc'></div>";
    WriteSpellDesc();
  }
}

function WriteSpellDesc() {
  if (typeof magic[PC.getLastSpellLevel()][GetSpellID(PC.getLastSpell())].getLongDesc === "function") {
    document.getElementById('spelldesc').innerHTML = magic[PC.getLastSpellLevel()][GetSpellID(PC.getLastSpell())].getLongDesc();
    if (PC.getKnowsInfusion() && (typeof magic[PC.getLastSpellLevel()][GetSpellID(PC.getLastSpell())].getInfusedDesc === "function")) {
      document.getElementById('spelldesc').innerHTML += "<br /><span style='color:yellow'>INFUSED:</span> " + magic[PC.getLastSpellLevel()][GetSpellID(PC.getLastSpell())].getInfusedDesc();
    }
  } else {
    document.getElementById('spelldesc').innerHTML = "";
  }
}

function HighlightSpell(lvl,spell) {
  let spellspan = "level" + PC.getLastSpellLevel() + "spell" + PC.getLastSpell();
  document.getElementById(spellspan).classList.toggle("selected");
  spellspan = "level" + lvl + "spell" + spell;
  document.getElementById(spellspan).classList.toggle("selected");
}

function GetSpellList(lvl) {
  let makehtml = "";
  for (let i=1;i<=8;i++) {
    if (PC.knowsSpell(lvl,GetSpellID(i))) {
      makehtml += "<span id='level" + lvl + "spell" + i + "'>" + magic[lvl][GetSpellID(i)].getName() + "</span>";
      // need to add a mouseclick to the spells for tablet play
      if (i < 8) { makehtml += "<br />"; }
    }
  }
  return makehtml;
}

function GetCombatMap(atk,def) {
  let atk_tile = atk.getHomeMap().getTile(atk.getx(),atk.gety());
  let def_tile = def.getHomeMap().getTile(def.getx(),def.gety());
  let atk_terrain = atk_tile.terrain.getCombatMap();
  if (!atk_terrain) { atk_terrain = "Grass"; }
  let def_terrain = def_tile.terrain.getCombatMap();
  if (!def_terrain) { def_terrain = "Grass"; }
  if (def.getHomeMap().getTile(def.getx(),def.gety()).getTopFeature()) { 
    if (def.getHomeMap().getTile(def.getx(),def.gety()).isBridge()) {
      def_terrain = "Bridge";
    }
  }
  let rand = Math.floor((Math.random()*2)+1); 
  
  if ((atk_terrain === "Water") && (def_terrain === "Water")) {
    let final = "combatWater" + rand;
    return final;
  } 
  
  if (((atk_terrain === "Water") && (!atk.getHomeMap().getTile(atk.getx(),atk.gety()).isBridge())) || (def_terrain === "Water")) {
    let PC_tile = PC.getHomeMap().getTile(PC.getx(),PC.gety());
    let PC_terrain = PC_tile.terrain.getCombatMap();
    if (PC_terrain === "Water") {  // PC attacking from offshore
      let final = "combatCoast" + rand;
      return final;
    } else {  // PC fighting an offshore foe
      let final = "combatShore" + rand;
      return final;
    }
  }
  
  let final = "combat" + def_terrain + rand;
  return final;
  
}

function ProcessAmbientNoise(newtile) {
  if (newtile.getLocalSound()) {
    let ambsound = newtile.getLocalSound();
    if (Object.keys(ambient).length === 0) {
      ambient = DUPlayAmbient(ambsound);
    } else if (ambient.name !== ambsound) {
      DecAmbientVol(ambient);
      ambient = DUPlayAmbient(ambsound);
    } else {
      // same thing playing, no need to change
    }
  } else {
    if (Object.keys(ambient).length !== 0) {
      //ambient.song.stop(); 
      DecAmbientVol(ambient);
      ambient = {}; 
    }
  }
}

function SpellInitials(who) {
  let initials = "";
  let spells = who.getSpellEffects();
  if (spells) {
    for (let i=0; i<spells.length; i++) {
      if (spells[i].getDisplay()) {
        if (!initials.match(spells[i].getDisplay())) {
          initials += spells[i].getDisplay();
        }
      }
    }
  }
  return initials;
}

function CheckMapForHostiles(who) {
  let themap = who.getHomeMap();
  let npcs = themap.npcs.getAll();
  let arehostiles = -1;
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getAttitude() === "hostile") { 
      let tmprad =  GetSquareDistance(who.getx(),who.gety(),npcs[i].getx(),npcs[i].gety());  
      if (arehostiles === -1) { arehostiles = tmprad; }
      else if (tmprad < arehostiles) { arehostiles = tmprad; }
    }
  }

  return arehostiles;
}

function GetDistance(x1,y1,x2,y2,disttype) {
  if (disttype === "square") { return GetSquareDistance(x1,y1,x2,y2); }
  if (disttype === "manhatten") { return GetManhattenDistance(x1,y1,x2,y2); }
  let dist = Math.pow(Math.pow(x1-x2,2) + Math.pow(y1-y2,2), 1/2)
  return dist;
}

function GetSquareDistance(x1,y1,x2,y2) {
  return (Math.max(Math.abs(x1-x2), Math.abs(y1-y2)));
}

function GetManhattenDistance(x1,y1,x2,y2) {
  return (Math.abs(x1-x2) + Math.abs(y1-y2));
}

function GetDistanceByPath(who1,who2,movetype) {
  let themap = who1.getHomeMap();
  if (themap !== who2.getHomeMap()){ return 0; }
  
  let path = themap.getPath(who1.getx(), who1.gety(), who2.getx(), who2.gety(),movetype);
  if (path.length) {
    path.shift();
    return path.length;
  } else { return 0; }
}

function PerformTrap(who, trap, traplvl, trapped) {
  // Traps can be: Dart (makes atk roll, poison), acid (physical damage), gas (poison), explosion (magical damage), drain (mana)
  
  if (trap === "dart") {
    if (!IsAdjacent(who,trapped)) {
      DebugWrite("gameobj", "Dart trap fires, misses everyone (telekinesis)<br />");
      if (GetDistance(who.getx(),who.gety(),trapped.getx(),trapped.gety()) <= 5) {
        maintext.addText("TRAP! A dart flies out and misses everything.");
        DUPlaySound("sfx_sling");
      }
      return 0;
    }
    let def = who.getDefense();
    let tohit = (2*traplvl - def + 10)/100;
    if (tohit < .05) { tohit = .05; }
    DebugWrite("gameobj", "Dart trap fires, lvl " + traplvl + ", player defense is " + def + ", chance to hit is " + tohit + "<br />");
    if (Math.random() < tohit) {  // dart hits!
      if (who === PC) {
        maintext.addText("TRAP! A dart strikes you. You are poisoned.");
      }
      let poison = localFactory.createTile("Poison");
      who.addSpellEffect(poison);
      if (GetDistance(who.getx(),who.gety(),trapped.getx(),trapped.gety()) <= 5) {
        DUPlaySound("sfx_default_hit");
      }
      DrawCharFrame();
      return 1;
    } else {  // dart misses
      if (who === PC) {
        maintext.addText("TRAP! You barely avoid a poisoned dart.");
      }
      if (GetDistance(who.getx(),who.gety(),trapped.getx(),trapped.gety()) <= 5) {
        DUPlaySound("sfx_sling");
      }
      return 0;
    } 
  } else if (trap === "acid") {
    if (GetDistance(who.getx(),who.gety(),trapped.getx(),trapped.gety()) <= 5) {
      DUPlaySound("sfx_acid");
    }
    if (!IsAdjacent(who,trapped)) {
      DebugWrite("gameobj", "Acid trap fires, misses everyone (telekinesis)<br />");
      if (GetDistance(who.getx(),who.gety(),trapped.getx(),trapped.gety()) <= 5) {
        maintext.addText("TRAP! Acid spews forth, missing everything.");
      }
      return 0;
    }
    let aciddmg = Dice.roll("1d6+3");
    who.dealDamage(aciddmg, trapped, "acid");
    if (who === PC) {
      maintext.addText("TRAP! You are splashed with acid.");
      DrawCharFrame();
    }
    return 1;
  } else if (trap === "gas") {
    if (GetDistance(who.getx(),who.gety(),trapped.getx(),trapped.gety()) <= 5) {
      DUPlaySound("sfx_spell_fail");
    }
    if (!IsAdjacent(who,trapped)) {
      DebugWrite("gameobj", "Gas trap fires, misses everyone (telekinesis)<br />");
      if (GetDistance(who.getx(),who.gety(),trapped.getx(),trapped.gety()) <= 5) {
        maintext.addText("TRAP! Poison gas billows forth, but disperses before it reaches you.");
      }
      return 0;
    }
    if (who === PC) {
      maintext.addText("TRAP! You are poisoned.");
    }
    let poison = localFactory.createTile("Poison");
    who.addSpellEffect(poison);
    DrawCharFrame();
    return 1;    
  } else if (trap === "explosion") {
    if (GetDistance(who.getx(),who.gety(),trapped.getx(),trapped.gety()) <= 5) {
      DUPlaySound("sfx_explosion");
    }
    if (!IsAdjacent(who,trapped)) {
      DebugWrite("gameobj", "Explosion trap fires, misses everyone (telekinesis)<br />");
      if (GetDistance(who.getx(),who.gety(),trapped.getx(),trapped.gety()) <= 5) {
        maintext.addText("TRAP! The lock explodes, but you just feel a little heat.");
      }
      return 0;
    }
    if (PC === who) {
      maintext.addText("TRAP! There is an explosion!");
    }
    let firedmg = Dice.roll("3d6+4");
    who.dealDamage(firedmg,trapped,"fire");
    DrawCharFrame();
    return 1;
  } else if (trap === "drain") {
    if (GetDistance(who.getx(),who.gety(),trapped.getx(),trapped.gety()) <= 5) {
      DUPlaySound("sfx_mind");
    }
    if (!IsAdjacent(who,trapped)) {
      DebugWrite("gameobj", "Drain trap fires, misses everyone (telekinesis)<br />");
      if (GetDistance(who.getx(),who.gety(),trapped.getx(),trapped.gety()) <= 5) {
        maintext.addText("TRAP! You feel a distant pull on your mind, but then it passes.");
      }
      return 0;
    }
    if (who === PC) {
      maintext.addText("TRAP! You feel a pull on your mind.");
    }
    let drain = Dice.roll("2d4");
    if (drain > who.getMana()) {
      drain = who.getMana();
    }
    who.modMana(-1*drain);
    DrawCharFrame();
    return 1;
  }
  alert("Bad trap type");
}

function ApplyRune(who, rune, runeref) {
  maintext.delayedAddText("You touch the glowing sigil.");
  maintext.delayedAddText("It burns you!");
  who.dealDamage((who.getHP()/3), runeref);
  let runecap = rune.charAt(0).toUpperCase() + rune.slice(1)
  maintext.delayedAddText("You have been marked with the Rune of " + runecap + "!");
  if (who.runes[rune] ===1) { maintext.delayedAddText("No effect!"); }
  else {
    DUPlaySound("sfx_dangerous_buff");
    if (rune === "kings") { 
      DU.gameflags.setFlag("rune_kings_1",1); 
      DU.gameflags.setFlag("rune_kings",1);
    }
    who.runes[rune] = 1;
  }
  
  return 1;
}

function DoPCDeath() {
  DebugWrite("all","IN DoPCDeath().<br />");
}

function GetOctant(diffx, diffy) {
  // diffx and diffy created via dest.x-start.x and dest.y-start.y
  
  if ((diffx === 0) && (diffy < 0)) {
    return 0;
  } else if ((diffx === 0) && (diffy > 0)) {
    return 4;
  } else {
    if ((diffy === 0) && (diffx > 0)) {
      return 2;
    } else if ((diffy === 0) && (diffx < 0)) {
      return 6;
    }
    else { 
      let horflip = 0;
      let verflip = 1;
      if (diffy < 0) { 
        diffy = Math.abs(diffy); 
        verflip = 0;
      }
      if (diffx < 0) {
        diffx = Math.abs(diffx);
        horflip = 1;
      }
      let slope = diffy/diffx;
      if ((slope > 2.42) && (verflip === 0)) {
        return 0;
      }
      else if ((slope > 2.42) && (verflip === 1)) {
        return 4;
      }
      else if ((slope < .414) && (horflip === 0)) {
        return 2;
      }
      else if ((slope < .414) && (horflip === 1)) {
        return 6;
      }
      else if ((verflip === 0) && (horflip === 0)) {
        return 1;
      }
      else if ((verflip === 1) && (horflip === 0)) {
        return 3;
      }
      else if ((verflip === 1) && (horflip === 1)) {
        return 5;
      }
      else if ((verflip === 0) && (horflip === 1)) {
        return 7;
      }
      else { alert("Error in octant finding."); }
    }
  }  
}

function GetEffectGraphic(start, dest, params) {
  let ammo = {};
  ammo.graphic = params.graphic;
  ammo.yoffset = params.yoffset;
  let diffx = dest.getx() - start.getx();
  let diffy = dest.gety() - start.gety();
  ammo.fired = GetOctant(diffx,diffy);
  ammo.xoffset = ammo.fired * -32;
  if (!params.directionalammo) {
    ammo.xoffset = params.xoffset;
  }
  return ammo;
}

function AddLoot(towhat) {

  let lootgroup = towhat.getLootgroup();
  if (lootgroup) {
    let loot = {};
    if (DULoot[lootgroup]) {
      loot = DULoot[lootgroup].getLoot(); 
      if (loot.lootlist.length) {
        if (towhat.isContainer) {
          for (let i=0; i<loot.lootlist.length;i++){
            towhat.addToContainer(loot.lootlist[i], 1);
          }
        } else {
          towhat.setSearchYield(loot.lootlist);
        }
      }
      if (loot.gold) {
        if (towhat.isContainer) {
          towhat.addToContainer("Gold", loot.gold);
        } else {
          towhat.addToSearchYield("Gold");
          towhat.setGold(loot.gold);
        }
      }
    }
    else {alert (towhat.getName() + " has a loottable that is not defined (" + lootgroup + ") ."); }
  }

  if (DULoot[lootgroup].trap) {
    let trapname = DULoot[lootgroup].trap;
    DebugWrite("gameobj", "Chest created, might be trapped with strength: " + trapname + ".<br />");
    let trap = DUTraps[trapname].getTrap();
    if (trap.trap) {
      towhat.setTrap(trap.trap, trap.level);
    }
  }
}

function RollDamage(dam_val,extra) {
  let dmg = Dice.roll(dam_val);
  if (extra) { dmg += Dice.roll(extra); }
  return parseInt(dmg);
}

function IsAdjacent(one,two,nodiag) {
  if (one.getHomeMap() !== two.getHomeMap()) { return 0; }
  if (!nodiag && (Math.abs(one.getx() - two.getx()) <= 1) && (Math.abs(one.gety() - two.gety()) <= 1)) { return 1; }
  if (((Math.abs(one.getx() - two.getx()) === 1) && (Math.abs(one.gety() - two.gety()) === 0)) || ((Math.abs(one.getx() - two.getx()) === 0) && (Math.abs(one.gety() - two.gety()) === 1))) { return 1; }
  return 0;
}

function CheckAbsorb(dam,to,from,type) {
  if (!type) { type = "physical"; }
  let absorb = to.getResist(type);

  if (!absorb) { return dam; }
  
  if (to.checkType("npc") && from && (type === "physical") && (typeof from.getEquipment === "function")) {
    let weapon = from.getEquipment("weapon");
    absorb = absorb - weapon.getReduceArmor();
    if (absorb < 0) { absorb = 0; }
  }
  
  if (absorb !== 0) {
    DebugWrite("combat", "Damage modified: " + dam + " becomes ");
    dam = dam * (1-(absorb/100));
    DebugWrite("combat", dam + ".<br />");
  }
  if (to.checkType("npc")) {
    let ironflesh = to.getSpellEffectsByName("IronFlesh");
    if (ironflesh) {
      dam = (Math.max(0,dam-5));
      let power = ironflesh.getPower();
      power -= 5;
      if (power <= 0) {
        ironflesh.endEffect();
      } else {
        ironflesh.setPower(power);
      }
    }
  }
  return dam;
}


function FindNearby(what,map,radius,shape,tox,toy) {
  var adj = [];
  if (shape === "box") {
    for (let i = tox-radius; i<=tox+radius; i++) {
      for (let j = toy-radius; j<=toy+radius; j++) {
        let tile = map.getTile(i,j);
        if (tile !== "OoB") {
          let list;
          if (what === "npcs") {
            list = tile.getNPCs();
            if ((PC.getHomeMap() === map) && (PC.getx() === i) && (PC.gety() === j)) {
              list.push(PC);
            }
          } else if (what === "features") {
            list = tile.getFeatures();
          } else {
            alert("Find Adj with improper what: " + what);
            return;
          }
          for (let k=0;k<list.length;k++) {
            adj.push(list[k]);
          }
        }
      }
    }
  } else if (shape === "circle") {
    let list;
    if (what === "npcs") { 
      list = map.npcs.getAll();  
      list.push(PC);
    }
    else if (what === "features") { list = map.features.getAll(); }
    for (let i=0;i<list.length;i++) {
      let val=list[i];
      if (((val.getx() !== tox) || (val.gety !== toy)) && (GetDistance(val.getx(), val.gety(),tox,toy) <= radius)) {
        adj.push(val);
      }
    }
  }
  return adj;
}


// "except" is there so you can "find nearest except this dude"
// align is "enemy" or "ally" (or blank for either)
function FindNearestNPC(from, align, except) {
  if (!except) { except = []; }
  let found = from.getHomeMap().npcs.getAll();
  if (PC.getHomeMap() === from.getHomeMap()) { 
    if (!align || ((align === "enemy") && (from.getAttitude() !== PC.getAttitude())) || ((align === "ally") && (from.getAttitude() === PC.getAttitude()))) {
      found.push(PC); 
    }
  }
  let nearest;
  let distance = 10000;
  for (let i=0;i<found.length;i++) {
    let val = found[i];
    if ((val !== from) && (!except.includes(val))) {
      if (!align || ((align === "enemy") && (from.getAttitude() !== val.getAttitude())) || ((align === "ally") && (from.getAttitude() === val.getAttitude()))) {
        let movetype = from.getMovetype();
        if (from.specials.open_door) { movetype = MOVE_WALK_DOOR; }
        let dist = GetDistanceByPath(from,val,movetype);
        if (dist < distance) {
          nearest = val;
          distance = dist;
        }
      }
    }
  }
  return nearest;
}

function DisplayTestMap() {
  let mapdiv;
  let themap = PC.getHomeMap();
  mapdiv += "<table id='mainview' cellpadding='0' cellspacing='0' border='0' style=\"position:relative; z-index:20;\">";
  for (let i=0;i<themap.getHeight();i++) {
    mapdiv += "<tr>";
    for (let j=0;j<themap.getWidth();j++) {
    	let thiscell = themap.getTile(j,i);
    	let graphics = thiscell.getTop().getGraphicArray();
      mapdiv += '<td class="maptd" id="td-tile'+j+'x'+i+'" style="background-image:url(\'graphics/' + graphics[0] + '\'); background-repeat:no-repeat; background-position: ' + graphics[2] + 'px ' + graphics[3] + 'px; position:relative; z-index:20;"><img id="tile'+j+'x'+i+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+j+'x'+i+'" width="32" height="32" style="position: relative; z-index:20" title="' + thiscell.desc + '" /></td>';
    }  
    mapdiv += '</tr>';
  }
  mapdiv  += '</table>';

  let debugmap = window.open('','debugmapscreen');
  debugmap.document.writeln(mapdiv);
  
  debugmap.document.close()
}

function GetAllWithin(type,rad,map,center) {
  let everything;
  if (type === "features") {
    everything = map.getAllFeatures();
  } else if (type === "npcs") {
    everything = map.getAllNPCs();
  } else {
    alert("GetAllWithin called inappropriately.");
    return [];
  }
  
  let within = [];
  for (let i=0;i<everything.length;i++) {
    let val=everything[i];
    if (GetDistance(val.getx(), val.gety(),center.x, center.y) < rad) {
      within.push(val);
    }
  }
  
  return within;
}

function IsOnPentagram(who) {
  let themap = who.getHomeMap();
  let tile = themap.getTile(who.getx(), who.gety());
  let terrain = tile.getTerrain();
  if (terrain.getGraphic() === "pentagram.gif") {
    return 1;
  } 
  return 0;
}

function ShouldShowFrames() {
  if (PC.getHomeMap().getScale()) {
    let npcs = PC.getHomeMap().npcs.getAll();
    for (let i=0; i<npcs.length;i++) {
      if (npcs[i].getAttitude() === "hostile") { return 1; }
    }
  }
  return 0;
}

function IsObjectVisibleOnScreen(what) {
  if (what.getHomeMap() !== PC.getHomeMap()) { return 0; }
  return IsVisibleOnScreen(what.getx(),what.gety());
}

function IsVisibleOnScreen(x,y) {
  let themap = PC.getHomeMap();
  let display = getDisplayCenter(themap,PC.getx(),PC.gety());
  if ((display.leftedge > x) || (display.rightedge < x)) { return 0; }
  if ((display.topedge > y) || (display.bottomedge < y)) { return 0; }
  let targettile = themap.getTile(x, y);
  x = x-display.leftedge;
  y = y-display.topedge;
  let onscreen = document.getElementById('mainview_' + x + 'x' + y).innerHTML;
  let losval = 0;
  if (onscreen.indexOf("You cannot see that") !== -1) { losval = 1; }
  else {
    let light = targettile.getLocalLight();
    light += themap.getAmbientLight();
    if (light < SHADOW_THRESHOLD) {
      losval = 1;
    }
  }
  if (losval >= LOS_THRESHOLD) {
    return 0;
  }
  
  return 1;
}

function GetStickyTargetCursorCoords() {
  if (DU.gameflags.getFlag("sticky_target") && targetCursor.lastTarget) {
    if (targetCursor.lastTarget.getHomeMap() === PC.getHomeMap()) {
      if (IsVisibleOnScreen(targetCursor.lastTarget.getx(), targetCursor.lastTarget.gety())) {
        return { x: targetCursor.lastTarget.getx(), y: targetCursor.lastTarget.gety() };
      }
    }
  }
  return {};
}

function CreateTargetCursor(params, noredraw) {
  if (!noredraw) { DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety()); }
  let coords = {};
  if (params.sticky) {
    coords = GetStickyTargetCursorCoords();
  }
  if (coords.hasOwnProperty('x')) {
    targetCursor.x = coords.x;
    targetCursor.y = coords.y;
  } else {
    targetCursor.x = PC.getx();
    targetCursor.y = PC.gety();
  }
  targetCursor.command = params.command;
  targetCursor.spellName = params.spellName;
  targetCursor.spelldetails = params.spelldetails;
  targetCursor.targetlimit = params.targetlimit;
  targetCursor.targetCenterlimit = params.targetCenterlimit;

  let edges = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  let leftedge = targetCursor.x - edges.leftedge;
  let topedge = targetCursor.y - edges.topedge;

  let tileid = "mainview_" + leftedge + "x" + topedge;
  targetCursor.tileid = tileid;
  targetCursor.basetile = document.getElementById(tileid).innerHTML;
  document.getElementById(tileid).innerHTML = targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />';  
}

function BeginAct2() {
  // this should be called on the death of the Black Dragon
  DU.merchants.gretchen.stock[4].qty = 2;
  DU.merchants.gretchen.stock[5].qty = 1;
  DU.merchants.ariel.stock[4].qty = 10;
  DU.merchants.ariel.stock[5].qty = 10;
}

function CheckOpenAsUse(used) {
  if (used.openAsUse) { return 1; }
  if (used.opengraphic) { return 1; }
  if (used.isContainer) { return 1; }

  return 0;
}

function BumpIntoDoor(door,who) {
  if (door.open) { return {msg:"", canmove:1}; }
  let retval = {};
  retval["msg"] = "Blocked!";
  retval["canmove"] = 0;

  if (DU.gameflags.getFlag("move_opens_doors") && !door.locked && (who === PC)) {
    door.use(who);
    retval["msg"] = "Open door!";
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  }
  return retval;
}

function IsWantedCode(code) {
  //  8    backspace
  // 13    enter
  // 27    ESC
  // 32    space
  // 33    pg up
  // 34    pg down
  // 37-40 arrow keys
  // 48-57 number
  // 65-90 letter
  // 186    ;
  // 191   /
  // 219   [
  // 222   '

  if ((code === 8) || (code === 13) || (code === 27) || ((code >= 32) && (code <= 34)) || ((code >= 37) && (code <= 40)) || ((code >=48) && (code <= 57)) || ((code >= 65) && (code <=90)) || (code === 186) || (code === 191) || (code === 219) || (code === 222)) {
    return 1; 
  }
  return 0;
}

function GetClockTime(usethistime) {
  if (!usethistime) { usethistime = DUTime.getGameClock(); }
  usethistime = usethistime*5;   // Without this, a step is 1 min on world map and .2 in town
  usethistime = usethistime + 9*60;  // Game starts at 9am on day 1
  usethistime = usethistime + 4*28*24*60 + 3*24*60; // Game starts on 4/3
  let minutes = Math.floor(usethistime%60);
  let hours = Math.floor((usethistime/60)%24);
  let days = Math.floor(((usethistime/60)/24)%28);
  let months = Math.floor((((usethistime/60)/24)/28)%12);
  let years = Math.floor((((usethistime/60)/24)/28)/12);
  return ([years,months,days,hours,minutes]);
}

function SetGameTimeByClockTime(targetTime) {
  DUTime.setGameClock(GetGameClockByClockTime(targetTime));
}

function GetGameClockByClockTime(targetTime) {
  let tmp = targetTime.split(":");
  let hour = parseInt(tmp[0]);
  let min = parseInt(tmp[1]);

  if (isNaN(hour) || isNaN(min)) { return; }

  let currtime = GetUsableClockTime();
  tmp = currtime.split(":");
  let currhour = parseInt(tmp[0]);
  let currmin = parseInt(tmp[1]);

  if (min < currmin) { min = min+60; currhour++; }
  let diffmin = min-currmin;
  
  if (hour < currhour) { hour = hour+24; }

  diffmin = diffmin + (hour-currhour)*60;
  let difftime = diffmin*.2;
  let newtime = DUTime.getGameClock() + difftime;
  return (newtime);
}

function GetDisplayDate(usethistime) {
  let calendar = GetClockTime(usethistime);
  calendar[0]+=143;
  return (calendar[1] + "-" + calendar[2] + "-" + calendar[0]);
}

function GetDisplayTime(usethistime) {
  let calendar = GetClockTime(usethistime);
  let ampm = "am";
  let hours = calendar[3];
  if (hours === 0) {hours = 12; }
  else if (hours === 12) { ampm = "pm"; }
  else if (hours > 12) { hours = hours - 12; ampm = "pm"; }
  if (calendar[4] < 10) { calendar[4] = "0" + calendar[4]; }
  return (hours + ":" + calendar[4] + " " + ampm);
}

function CheckPostDeathMusic(map) {
  if (map === PC.getHomeMap())  { 
    if (map.getName().includes("combat")) {
      let npcs = map.npcs.getAll();
      let hostiles = 0;
      for (let i=0;i<npcs.length;i++) {
        if (npcs[i].getAttitude() === "hostile") { hostiles = 1; }
      }
      if (!hostiles) {
        let dest = map.getExitToMap();
        dest = maps.getMap(dest);
        DUPlayMusic("Fanfare",{fade:1, queue:dest.getMusic()});
      }
    } else {

    }
  }
}

function SetSky() {
  if (PC.getHomeMap().getUndergroundDesc()) {
    for (let i = 1; i<=12; i++) {
      document.getElementById("sky"+i).style.backgroundImage = "";
      document.getElementById("sky"+i).style.backgroundPosition = "0px 0px";
    }
    document.getElementById("oversky").innerHTML = PC.getHomeMap().getUndergroundDesc();
    return(PC.getHomeMap().getUndergroundDesc());
  } else {
    let currenttime = DUTime.getGameClock() * 5;
    currenttime += 9*60 + 4*28*24*60 + 3*24*60;
    currenttime = Math.floor((currenttime/60)/24);
    let moon1phase = currenttime%8;
    let moon2phase = Math.floor((currenttime%24)/3);
    let moon1location = 3*moon1phase;
    let moon2location = 3*moon2phase;
    if (moon1phase === moon2phase) { 
      if (moon1phase <= 3) { moon2location++; }
      else { moon1location--; }
    }
    let daytime = GetClockTime();
    let sunposition = daytime[3]-5;
    if (sunposition < 1) { sunposition += 24; }
    document.getElementById("oversky").innerHTML = "";
    for (let i = 1; i<=12; i++) {
      document.getElementById("sky"+i).style.backgroundImage = "";
      document.getElementById("sky"+i).style.backgroundPosition = "0px 0px";
    }
    if (sunposition < 13) { document.getElementById("sky"+sunposition).style.backgroundImage = "url('graphics/sun.gif')"; }
    let moon1position = sunposition-moon1location;
    if (moon1position <= 0) { moon1position += 24; }
    let moon2position = sunposition-moon2location;
    if (moon2position <= 0) { moon2position += 24; }
    if (moon1position < 13) { 
      let phaseoffset = -1*moon1phase*16;
      document.getElementById("sky"+moon1position).style.backgroundImage = "url('graphics/moons.gif')";
      document.getElementById("sky"+moon1position).style.backgroundPosition = phaseoffset + "px 16px";
    }
    if (moon2position < 13) { 
      let phaseoffset = -1*moon2phase*16;
      document.getElementById("sky"+moon2position).style.backgroundImage = "url('graphics/moons.gif')";
      document.getElementById("sky"+moon2position).style.backgroundPosition = phaseoffset + "px 0px";
    }
    return([moon1phase,moon1position,moon2phase,moon2position]);
  }
}

function CheckTimeBetween(time1,time2, clocktime) {
  let time1arr = time1.split(":");
  let time2arr = time2.split(":");
  if (!clocktime) {
    clocktime = GetUsableClockTime();
  }
  let clockarr = clocktime.split(":");
  
  time1 = parseInt(time1arr[0])*60+parseInt(time1arr[1]);
  time2 = parseInt(time2arr[0])*60+parseInt(time2arr[1]);
  let clock0 = parseInt(clockarr[0])*60+parseInt(clockarr[1]);

  if (time2 > time1) {
    if ((clock0 >= time1) && (time2 >= clock0)) {
      return 1;
    }
    return 0;
  } else {
    if ((clock0 >= time1) || (clock0 <= time2)) {
      return 1;
    }
    return 0;
  }
}

function ModTime(time1,addTime) {
  let add = 1;
  if (addTime.indexOf("-") !== -1) {
    add = -1;
    addTime = addTime.replace("-","");
  }

  let time = time1.split(":");
  let difftime = addTime.split(":");
  
  let finmin = parseInt(time[1]) + parseInt(difftime[1])*add;
  let finhour = parseInt(time[0]) + parseInt(difftime[0])*add;

  while (finmin > 59) {
    finmin -= 60;
    finhour++;
  }
  while (finmin < 0) {
    finmin += 60;
    finhour--;
  }
  if (finmin < 10) { finmin = "0" + finmin; }
  while (finhour > 23) {
    finhour -= 24;
  }
  while (finhour < 0) {
    finhour += 24;
  }

  return finhour + ":" + finmin;
}

function GetUsableClockTime(time) {
  let clocktime;
  if (!time) {
    clocktime = GetClockTime();
  } else {
    clocktime = GetClockTime(time);
  }
  let min = clocktime[4];
  if (min < 10) { min = "0" + min; }
  clocktime = clocktime[3] + ":" + min;
  return clocktime;
}

// Is time1 after time2
function CheckTimeAfterTime(time1,time2) {
  let time2arr = time2.split(":");
  let time3hr = parseInt(time2arr[0]) + 12;
  if (time3hr > 23) { time3hr = time3hr - 24; }
  let time3 = time3hr + ":" + time2arr[1];
  
  if (CheckTimeBetween(time2,time3,time1)) { return 1; }
  else { return 0;}
  
}

function DiffTime(time1,time2) {
  // returns time2-time1 in minutes
  let time2arr = time2.split(":");
  let time1arr = time1.split(":");
  let time2min = 60*parseInt(time2arr[0]) + parseInt(time2arr[1]);
  let time1min = 60*parseInt(time1arr[0]) + parseInt(time1arr[1]);
  if (time2min < time1min) {
    time2min += 24*60;
  }
  return time2min - time1min;
}

function EndWaiting(who, inn) {
  FadeIn();
  if (who.moveAfterWaiting) {
    who.getHomeMap().moveThing(who.moveAfterWaiting.x,who.moveAfterWaiting.y,who);
    delete who.moveAfterWaiting;
  }
  if (inn) {
    maintext.addText("You awake refreshed!");
    PC.healMe(Dice.roll("20d5+20"));
    PC.setMana(PC.getMaxMana());
    delete who.atinn;
  }
  who.setWaiting(0);
  if (who === PC) {   // I mean, it only can be, but why not check?
    setTimeout(function() { gamestate.setMode("player"); }, 1500); 
    DrawCharFrame();
    DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
  }

  return 1;
}

function RotateMap90(mapref,centerx,centery) {
  let terrainArray = [];
  let featurearray = [];
  for (let y=0;y<mapref.getHeight();y++) {
    terrainArray[y] = [];
  }
  for (let y=0;y<mapref.getHeight();y++) {
    for (let x=0;x<mapref.getWidth();x++) {
      let yy=y-centery;
      let xx=x-centerx;
      let desty = xx;
      let destx = 0-yy;
      desty+=centery;
      destx+=centerx;
      terrainArray[desty][destx] = mapref.getTile(x,y).getTerrain();
      let feas = mapref.getTile(x,y).features.getAll();
      for (let k=0;k<feas.length;k++) {
        let farr = {};
        farr.feature = feas[k];
        farr.destx = destx;
        farr.desty = desty;
        featurearray[featurearray.length] = farr;
      }
      let npcs = mapref.getTile(x,y).npcs.getAll();
      for (let k=0;k<npcs.length;k++) {
        featurearray[featurearray.length] = {};
        featurearray[featurearray.length].feature = npcs[k];
        featurearray[featurearray.length].destx = destx;
        featurearray[featurearray.length].desty = desty;
      }
    }
  }
  for (let i=0;i<mapref.getHeight();i++) {
    for (let j=0;j<mapref.getWidth();j++) {
      mapref.getTile(j,i).terrain = terrainArray[i][j];
    }
  }

  for (let i=0;i<featurearray.length;i++) {
    mapref.moveThing(featurearray[i].destx,featurearray[i].desty,featurearray[i].feature);
  }

  if (PC.getHomeMap() === mapref) {
    let PCx = PC.getx();
    let PCy = PC.gety();
    PCx-=13;
    PCy-=13;
    mapref.moveThing(-PCy,PCx,PC);
  }
  // TESTING HERE
}

function Get90DegCoords(centerx,centery,oldx,oldy) {
  let yy=oldy-centery;
  let xx=oldx-centerx;
  let desty = xx;
  let destx = 0-yy;
  desty+=centery;
  destx+=centerx;
  return {x:destx, y:desty}
}

function PerformGambling() {
  inputText.txt = "";
  maintext.setInputLine("&gt; Bid how much?");
  maintext.drawInputLine();
  gamestate.setMode("digits");
}

//EXTERNALLY SOURCED

// these two functions found on stackexchange
// http://stackoverflow.com/questions/1773069/using-jquery-to-compare-two-arrays-of-javascript-objects

function arrayCompare(arrayA, arrayB) {
  let a = ExtendObject(true, [], arrayA);
  let b = ExtendObject(true, [], arrayB);
  a.sort(); 
  b.sort();
  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i]) { 
      return false;
    }
  }
  return true;
}

function objectCompare(objA, objB) {

  let i,a_type,b_type;

  // Compare if they are references to each other 
  if (objA === objB) { return true;}

  if (Object.keys(objA).length !== Object.keys(objB).length) { return false;}
  for (let i in objA) {
    if (objA.hasOwnProperty(i)) {
      if (typeof objB[i] === 'undefined') {
        return false;
      }
      else {
        a_type = Object.prototype.toString.apply(objA[i]);
        b_type = Object.prototype.toString.apply(objB[i]);

        if (a_type !== b_type) {
          return false; 
        }
      }
    }
    if (objectCompare(objA[i],objB[i]) === false){
      return false;
    }
  }
  return true;
}

// more stackoverflow: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#
function ShuffleArray(arr) {
  let currentIndex = arr.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

// Functions taken from jquery


function ExtendObject() {
  var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

  // Handle a deep copy situation
  if (typeof target === "boolean") {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== "object" && (typeof target !== "function")) {
      target = {};
  }

  // Extend jQuery itself if only one argument is passed
  if (i === length) {
      target = this;
      i--;
  }

  for (; i < length; i++) {

      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {

          // Extend the base object
          for (name in options) {
              src = target[name];
              copy = options[name];

              // Prevent never-ending loop
              if (target === copy) {
                  continue;
              }

              // Recurse if we're merging plain objects or arrays
              if (deep && copy && (IsPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

                  if (copyIsArray) {
                      copyIsArray = false;
                      clone = src && Array.isArray(src) ? src : [];

                  } else {
                      clone = src && IsPlainObject(src) ? src : {};
                  }

                  // Never move original objects, clone them
                  target[name] = ExtendObject(deep, clone, copy);

                  // Don't bring in undefined values
              } else if (copy !== undefined) {
                  target[name] = copy;
              }
          }
      }
  }

  // Return the modified object
  return target;
}


function IsPlainObject(obj) {
  var proto, Ctor;
  var getProto = Object.getPrototypeOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call( Object );

  // Detect obvious negatives
  // Use toString instead of jQuery.type to catch host objects
  if (!obj || toString.call(obj) !== "[object Object]") {
      return false;
  }

  proto = getProto(obj);

  // Objects with no prototype (e.g., `Object.create( null )`) are plain
  if (!proto) {
      return true;
  }

  // Objects with prototype are plain iff they were constructed by a global Object function
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}


"use strict";

function CreateDisplayTables() {
  let terraintable = "<table id='mainterrainview' style='position:fixed; top:38px; left:19px; z-index:21' border='0' cellspacing='0' cellpadding='0'>";
  let maintable = "<table id='mainview' style='position:fixed; top:38px; left:19px; z-index:23' border='0' cellspacing='0' cellpadding='0'>";
  let pttable = "<div id='phaserterrainview' style='position:fixed; top:38px; left:19px; z-index:22'>";
  for (let j=0; j<VIEWSIZEY; j++) {
    terraintable += "<tr>";
    maintable += "<tr>";
    for (let i=0; i<VIEWSIZEX; i++) {
      terraintable += "<td id='terrain_"+i+"x"+j+"'><img src='graphics/spacer.gif' width='32' height='32' /></td>";
      maintable += "<td id='mainview_"+i+"x"+j+"' style='position:relative'><img src='graphics/spacer.gif' width='32' height='32' /></td>";
    }
    terraintable += "</tr>";
    maintable += "</tr>";
  }
  terraintable += "</table>";
  maintable += "</table>";

  document.getElementById('displayframe').innerHTML = terraintable + "\n" + maintable + "\n" + pttable;;
  return;
}

function getDisplayCenter(themap,fromx,fromy) {
	let edge = {};
	let leftedge = fromx - (VIEWSIZEX - 1)/2;
  if (leftedge < 0) { leftedge = 0; }
  let rightedge = leftedge + VIEWSIZEX - 1;
  if (rightedge >= themap.getWidth()) {
  	rightedge = themap.getWidth() -1;  // Note, this will explode somewhat if the map is smaller than 13x13
  	leftedge = rightedge - VIEWSIZEX + 1;
  	if (leftedge < 0) { leftedge = 0; }
  }
  let topedge = fromy - (VIEWSIZEY - 1)/2;
  if (topedge < 0) { topedge = 0; }
  let bottomedge = topedge + VIEWSIZEY - 1;
  if (bottomedge >= themap.getHeight()) {
  	bottomedge = themap.getHeight() -1;
  	topedge = bottomedge - VIEWSIZEY + 1;
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

function AnimateEffect(atk, def, fromcoords, tocoords, ammographic, destgraphic, sounds, param, doagain) {
  // atk - source/attacker
  // def - target/defender, if any
  // fromcoords, tocoords - object with .x and .y
  // ammographic - object with .graphic, .xoffset, .yoffset, .fired (-1 if not a missile attack, directionalammo otherwise)
  // destgraphic - hit/miss/whatever graphic, object with graphic, xoffset, yoffset, overlay
  // sounds - object with sound effect for start and end of animation
  // param.type - "missile", "melee"
  // param.duration - time for animation 
  // param.ammoreturn - whether the animation doubles back
  // param.dmg - damage dealt by whatever generates this effect
  // param.endturn - 1 if this ends atk's turn
  // param.retval - retval from calling function
  let type = param.type;
  let duration = param.duration;
  let ammoreturn = param.ammoreturn;
  let dmg = param.dmg;
  let dmgtype = param.dmgtype;
  let endturn = param.endturn;
  let retval = param.retval;
  let ammocoords = GetCoordsWithOffsets(ammographic.fired, fromcoords, tocoords);
  let returnhtml;
  let eventcount = 0;
  let eventcount2 = 0;

  let animid = "anim_" + Dice.roll("1d100000");  // so more than one can be going at a time
  
  let tablehtml = '<div id="'+animid+'" style="position: absolute; left: ' + ammocoords.fromx + 'px; top: ' + ammocoords.fromy + 'px; background-image:url(\'graphics/' + ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + ammographic.xoffset + 'px ' + ammographic.yoffset + 'px; transition: left '+duration+'ms linear 0s, top '+duration+'ms linear 0s;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
  
  document.getElementById('combateffects').innerHTML += tablehtml;
    
  let animdiv = document.getElementById(animid);

  animdiv.addEventListener("transitionend", function(event) { 
    if (!eventcount) { eventcount++; return; }
  
    animdiv.parentNode.removeChild(animdiv);
    let hitanimhtml = '<div id="'+animid+'" style="position: absolute; left: ' + tocoords.x + 'px; top: ' + tocoords.y + 'px; background-image:url(\'graphics/' + destgraphic.graphic + '\');background-repeat:no-repeat; background-position: '+destgraphic.xoffset+'px 0px;"><img src="graphics/' + destgraphic.overlay + '" width="32" height="32" /></div>';
  
    document.getElementById('combateffects').innerHTML = hitanimhtml;
    if (sounds["end"]) {
      DUPlaySound(sounds["end"]);
    }
    setTimeout(function() {
      animdiv = document.getElementById(animid);
      animdiv.parentNode.removeChild(animdiv);
      if ((type !== "missile") || (!ammoreturn)) {
        duration = 50;
        ammographic.graphic = "spacer.gif";
        ammographic.xoffset = 0;
        ammographic.yoffset = 0;
      }
      returnhtml = '<div id="'+animid+'" style="position: absolute; left: ' + ammocoords.tox + 'px; top: ' + ammocoords.toy + 'px; background-image:url(\'graphics/' + ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + ammographic.xoffset + 'px ' + ammographic.yoffset + 'px; transition: left '+duration+'ms linear 0s, top '+duration+'ms linear 0s;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';      
      
      document.getElementById('combateffects').innerHTML += returnhtml;
      animdiv = document.getElementById(animid);
      
      animdiv.addEventListener("transitionend", function(event) {
        if (!eventcount2) { eventcount2++; return; }
        if (dmg != 0) {
          let prehp = def.getHP();
          let stillalive = def.dealDamage(dmg, atk, dmgtype);    
          if (stillalive > -1) {
            if (Math.floor(prehp) === Math.floor(def.getHP())) {
              retval["txt"] += ": Scratched!"; 
            } else {
              let damagedesc = GetDamageDescriptor(def); 
              retval["txt"] += ": " + damagedesc + "!"; 
            }
          }
          else { 
            if (def.specials.crumbles) { retval["txt"] += ": It crumbles to dust!"; }
            else {retval["txt"] += ": Killed!"; }
            
            if (def.getXPVal() && (atk === PC)) {
              retval["txt"] += " (XP gained: " + def.getXPVal() + ")";
            }
          }
        } 
        maintext.addText(retval["txt"]);
        maintext.setInputLine("&gt;");
        maintext.drawInputLine();
  
        if ((!doagain) && (endturn)) {
          atk.endTurn(retval["initdelay"]);
        } else if (doagain) {
          let doit = doagain.shift();
          AnimateEffect(doit.atk, doit.def, doit.fromcoords, doit.tocoords, doit.ammocoords, doit.destgraphic, doit.type, doit.duration, doit.ammoreturn, doit.dmg, endturn, doit.retval, doagain);
        }
  
      }, false);
      setTimeout(function() { Object.assign(animdiv.style, {left:ammocoords.fromx+"px", top: ammocoords.fromy+"px"}); }, 1); // see below- kludge

    }, 400);
  }, false);

  setTimeout(function() { Object.assign(animdiv.style, {left: ammocoords.tox+"px", top: ammocoords.toy+"px" }); }, 1); // THIS IS A TOTAL KLUDGE
  // For some reason, the transition would not run if the 50ms pause was not there. It would skip to the end, and not
  // fire the transitionend event. This should not be necessary.

}
  
function getDisplayCell(mapname, centerx, centery, x, y, tp, ev) {
  
  let displayCell = {};
  let localacre = mapname.getTile(x,y);
   
  let displaytile;
  // decide whether to draw a tile, draw it shaded, or make it darkness
  let losresult = mapname.getLOS(centerx, centery, x, y);
  
  let blocks = localacre.getBlocksLOS();
    
  let lighthere = 0;
  let sunlight = mapname.getAmbientLight();
  if (sunlight === 1) {
    lighthere = 1;
  } else {
    if ((blocks >= LOS_THRESHOLD) && ((centerx != x) || (centery != y) )) {
      let dirnum = GetViewDirection(centerx,centery,x,y);
      if ((dirnum === 6) || (dirnum === 7) || (dirnum === 0)) {
        let selight = localacre.getLocalLight("se") + sunlight;
        if (selight > lighthere) {
          lighthere = selight;
        }
      } if ((dirnum >= 0) && (dirnum <= 2)) {
        let swlight = localacre.getLocalLight("sw") + sunlight;
        if (swlight > lighthere) {
          lighthere = swlight;
        }
      } if ((dirnum >= 2) && (dirnum <= 4)) {
        let nwlight = localacre.getLocalLight("nw") + sunlight;
        if (nwlight > lighthere) {
          lighthere = nwlight;
        }
      } if ((dirnum >= 4) && (dirnum <= 6)) {
        let nelight = localacre.getLocalLight("ne") + sunlight;
        if (nelight > lighthere) {
          lighthere = nelight;
        }
      }
    } else {
      lighthere = localacre.getLocalLight("center") + sunlight;
    }
  }
    
  displaytile = localacre.getTop(0,1,1);  // sorts NPCs to top, but "alwaystop" features above them
  while (displaytile.getName() === "SeeBelow") {
    let retval = FindBelow(x,y,mapname);
    localacre = retval.tile;
    mapname = retval.map;
    displaytile = localacre.getTop();
  }
  let isnpc = 0;
  if (displaytile.checkType("NPC") && !displaytile.specials.mindless) { isnpc = 1; }
  let graphics = displaytile.getGraphicArray();
  let showGraphic = graphics[0];
  if ((typeof displaytile.setBySurround === "function") && ((losresult < LOS_THRESHOLD) || ev)) {
    graphics = displaytile.setBySurround(x,y,mapname,graphics,1,centerx,centery,losresult);
    displayCell.showGraphic = graphics[0];
    displayCell.graphics2 = graphics[2];
    displayCell.graphics3 = graphics[3];
    displayCell.graphics1 = graphics[1];
    if (typeof displaytile.doTile === "function") {
      showGraphic = displaytile.doTile(x,y,displayCell);
      if ("graphic" in showGraphic) { displayCell.showGraphic = showGraphic.graphic; }
      if ("spritexoffset" in showGraphic) { 
        displayCell.graphics2 = showGraphic.spritexoffset;
        displayCell.graphics3 = showGraphic.spriteyoffset;
      }
    }
    displayCell.losresult = losresult;
    displayCell.lighthere = lighthere;
    displayCell.desc = displaytile.getDesc();
  } else if ((losresult < LOS_THRESHOLD) || ((tp === 1) && isnpc) || ev) {
    displayCell.showGraphic = showGraphic;
    displayCell.graphics2 = graphics[2];
    displayCell.graphics3 = graphics[3];
    displayCell.graphics1 = graphics[1];
    if (typeof displaytile.doTile === "function") {
      showGraphic = displaytile.doTile(x,y,displayCell);
      if ("graphic" in showGraphic) { displayCell.showGraphic = showGraphic.graphic; }
      if ("spritexoffset" in showGraphic) { 
        displayCell.graphics2 = showGraphic.spritexoffset;
        displayCell.graphics3 = showGraphic.spriteyoffset;
      }      
    }
    if (typeof displaytile.setByBelow === "function") {
      let setbelow = displaytile.setByBelow(x,y,mapname);
      displayCell.showGraphic = setbelow[0];
      displayCell.graphics2 = setbelow[2];
      displayCell.graphics3 = setbelow[3];
    }
    displayCell.losresult = losresult;
    displayCell.lighthere = lighthere;
    displayCell.isnpc = isnpc;
    displayCell.desc = displaytile.getDesc();
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
  }
  if (displaytile.checkType("Terrain") && (displaytile.getName() !== "BlankBlack")) { displayCell.terrain = 1; }
  return displayCell;
}
  
function GetDisplayTerrain(mapref, xcoord, ycoord,centerx,centery,losresult) {
    
  if (losresult >= LOS_THRESHOLD) {
    let displaytile = eidos.getForm('BlankBlack');
    let graphics = displaytile.getGraphicArray();
    let showGraphic = graphics[0];
    let displayCell = {};
    displayCell.showGraphic = showGraphic;
    displayCell.graphics2 = graphics[2];
    displayCell.graphics3 = graphics[3];
    displayCell.graphics1 = graphics[1];
    return displayCell;
  }
  let localacre = mapref.getTile(xcoord, ycoord);
  let displaytile = localacre.getTerrain();
  
  while (displaytile.getName() === "SeeBelow") {
    let retval = FindBelow(xcoord,ycoord,mapref);
    localacre = retval.tile;
    mapref = retval.map;
    displaytile = localacre.getTerrain();
  }
  
  let graphics = displaytile.getGraphicArray();
  let showGraphic = graphics[0];
  
  let displayCell = {};
  displayCell.desc = displaytile.getDesc();
  if (typeof displaytile.setBySurround === "function") {
    graphics = displaytile.setBySurround(xcoord,ycoord,mapref,graphics,0,centerx,centery);
    showGraphic = graphics[0];
  }
  
  displayCell.showGraphic = showGraphic;
  displayCell.graphics2 = graphics[2];
  displayCell.graphics3 = graphics[3];
  displayCell.graphics1 = graphics[1];
  if (typeof displaytile.doTile === "function") {
    showGraphic = displaytile.doTile(xcoord,ycoord,displayCell);
    if ("graphic" in showGraphic) { displayCell.showGraphic = showGraphic.graphic; }
    if ("spritexoffset" in showGraphic) { 
      displayCell.graphics2 = showGraphic.spritexoffset;
      displayCell.graphics3 = showGraphic.spriteyoffset;
    }        
  }
  
  return displayCell;  
}

function DamageFlash() {
  document.getElementById('hpcell').style.backgroundColor = "white";
  document.getElementById('hpcell').style.color = "black";
  setTimeout(function() { document.getElementById('hpcell').style.backgroundColor = "black"; document.getElementById('hpcell').style.color = "white"; }, 250);
}

function animateImage(startx, endx, obj, repeat, dir, waitdur, destroywhendone, settostart) {
  if (timeouts[obj.getSerial()]) { clearTimeout(timeouts[obj.getSerial()]); }
  if (settostart) { obj.spritexoffset = startx; }
  if (PC.getHomeMap() === obj.getHomeMap()) {
    DrawMainFrame("one", obj.getHomeMap(), obj.getx(), obj.gety());
    timeouts[obj.getSerial()] = setTimeout(function() { continueAnimation(startx, endx, obj, repeat, dir, waitdur, destroywhendone) }, waitdur);
  }
}

function continueAnimation(startx, endx, obj,repeat, dir, waitdur, destroywhendone) {
  if (obj.getHomeMap() === PC.getHomeMap()) {
    let diff = 32;
    if (dir === "right") {
      diff = -32;
    }
    if (obj.spritexoffset == endx) {
      if (repeat) {
        obj.spritexoffset = startx;
        DrawMainFrame("one", obj.getHomeMap(), obj.getx(), obj.gety());
        timeouts[obj.getSerial()] = setTimeout(function() { continueAnimation(startx, endx, obj, repeat, dir, waitdur, destroywhendone) }, waitdur);
      }  else if (destroywhendone) {
        setTimeout(function() { destroyAnimation(obj) }, waitdur);
      }
    } else {
      obj.spritexoffset = parseInt(obj.spritexoffset) + diff;
      DrawMainFrame("one", obj.getHomeMap(), obj.getx(), obj.gety());
      timeouts[obj.getSerial()] = setTimeout(function() { continueAnimation(startx, endx, obj, repeat, dir, waitdur, destroywhendone) }, waitdur);
    }
  }
}

function destroyAnimation(thing) {
  delete timeouts[thing.getSerial()];
  let thingmap = thing.getHomeMap();
  let thingx = thing.getx();
  let thingy = thing.gety();
  thingmap.deleteThing(thing);
  if (thingmap === PC.getHomeMap()) {
    DrawMainFrame("one", thingmap, thingx, thingy);
  }
}

function Earthquake() {
  // possibly add sound
  document.getElementById('displayframe').style.left = 18;
  setTimeout(function() {
    document.getElementById('displayframe').style.left = 20;
    setTimeout(function() {
      document.getElementById('displayframe').style.left = 22;
      setTimeout(function() {
        document.getElementById('displayframe').style.left = 20;
        setTimeout(function() {
          document.getElementById('displayframe').style.left = 18;
          setTimeout(function() {
            document.getElementById('displayframe').style.left = 20;
            setTimeout(function() {
              document.getElementById('displayframe').style.left = 22;
              setTimeout(function() {
                document.getElementById('displayframe').style.left = 20;
              }, 250);
            },250);
          },250);
        },250);
      },250);
    },250);
  },250);
}

function FadeOut(death) {
  // stop playing spell animations
  spellcount = {};
  
  // Ironically, to do a fade OUT I am performing a jquery fadeIn(), to fade in a blanket of darkness
  // to put over the viewscreen.
  let darkness = "<div id='darkness' style='position:absolute;left:0;top:0;width:416px;height:418px;background-color:black;opacity:0'><img src='graphics/spacer.gif' width='416' height='418'></div>";
  document.getElementById('spelleffects').innerHTML = darkness;
  if (death) {
    document.getElementById('darkness').classList.toggle("rundeathfadein");
  } else {
    document.getElementById('darkness').classList.toggle("runfadein");
  }
}

function FadeIn(death) {

  if (death) {
    document.getElementById('darkness').classList.toggle("rundeathfadein");
  } else {
    document.getElementById('darkness').classList.toggle("runfadein");
  }
  document.getElementById('darkness').classList.toggle("runfadeout");
  setTimeout(function() { document.getElementById('spelleffects').innerHTML = ""; }, 1500);
  
}

function GetSpritesheetLocation(x,y) {
  return parseInt(x) * -1 / 32 + (parseInt(y) * -1 / 32) * 10;
}

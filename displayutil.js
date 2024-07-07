"use strict";

function CreateDisplayTables() {
  let maintable = "<table id='mainview' style='position:fixed; top:38px; left:19px; z-index:22' border='0' cellspacing='0' cellpadding='0'>";
  for (let j=0; j<VIEWSIZEY; j++) {
    maintable += "<tr>";
    for (let i=0; i<VIEWSIZEX; i++) {
      maintable += "<td id='mainview_"+i+"x"+j+"' style='position:relative; width:32; height:32'><img src='graphics/spacer.gif' width='32' height='32' /></td>";
    }
    maintable += "</tr>";
  }
  maintable += "</table>";

  document.getElementById('displayframe').innerHTML = maintable;
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

//function AnimateEffect(atk, def, fromcoords, tocoords, ammographic, destgraphic, sounds, param, doagain) {
function AnimateEffect(param) {
  //console.log("Animation begins!");
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
  // param.dmgtype - type of damage: force, fire, ice, physical, etc
  // param.endturn - 1 if this ends atk's turn
  // param.retval - retval from calling function
  // param.finishcallback - function to run when animation finishes, just before turn ends
  // param.callbackparam - object with parameters to feed to callback
  // param.weapon - the attacker's weapon, if appropriate
  let atk = param.atk;
  let def = param.def;
  let fromcoords = param.fromcoords;
  let tocoords = param.tocoords;
  let ammographic = param.ammographic;
  let destgraphic = param.destgraphic;
  let sounds = param.sounds;
  let doagain = param.doagain;
  let type = param.type;
  let duration = param.duration;
  let ammoreturn = param.ammoreturn;
  let dmg = param.dmg;
  let dmgtype = param.dmgtype;
  let endturn = param.endturn;
  let retval = param.retval;
  let weapon = param.weapon;
  let ammocoords = GetCoordsWithOffsets(ammographic.fired, fromcoords, tocoords);
  let returnhtml;
  let eventcount = 0;
  let eventcount2 = 0;
  let animid = "anim_" + Dice.roll("1d100000");  // so more than one can be going at a time

//  console.log("From: " + fromcoords.x + "," + fromcoords.y);
//  console.log("To: " + tocoords.x + "," + tocoords.y);
//  console.log(type);

  if (type === "melee") { FinishFirstAnimation(1); }
  else {
    let tablehtml = '<div id="'+animid+'" style="position: absolute; left: ' + ammocoords.fromx + 'px; top: ' + ammocoords.fromy + 'px; background-image:url(\'graphics/' + ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + ammographic.xoffset + 'px ' + ammographic.yoffset + 'px; transition: left '+duration+'ms linear 0s, top '+duration+'ms linear 0s;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
  
    document.getElementById('combateffects').innerHTML += tablehtml;
//    console.log("Setting up animation:");
//    console.log(tablehtml);
    let animdiv = document.getElementById(animid);
//    console.log(animdiv);
    animdiv.addEventListener("transitionend", function(event) { 
      FinishFirstAnimation();
    }, false);

    animdiv.offsetTop;
    Object.assign(animdiv.style, {left: ammocoords.tox+"px", top: ammocoords.toy+"px" });
//    setTimeout(function() { Object.assign(animdiv.style, {left: ammocoords.tox+"px", top: ammocoords.toy+"px" }); }, 1); // THIS IS A TOTAL KLUDGE
    // For some reason, the transition would not run if the 1ms pause was not there. It would skip to the end, and not
    // fire the transitionend event. This should not be necessary.

  }

  function FinishFirstAnimation(skipped) {
//    if (skipped) { console.log("Animation skipped."); }
//    if (eventcount) { console.log("callback called twice"); return; }
    eventcount = 1;
//    console.log("callback called");
    let animdiv = document.getElementById(animid);
    if (animdiv) {
      animdiv.parentNode.removeChild(animdiv);
    }
    let hitanimhtml = '<div id="'+animid+'" style="position: absolute; left: ' + tocoords.x + 'px; top: ' + tocoords.y + 'px; background-image:url(\'graphics/' + destgraphic.graphic + '\');background-repeat:no-repeat; background-position: '+destgraphic.xoffset+'px '+destgraphic.yoffset+'px;"><img src="graphics/' + destgraphic.overlay + '" width="32" height="32" /></div>';
  
    document.getElementById('combateffects').innerHTML += hitanimhtml;
    if (sounds["end"]) {
      DUPlaySound(sounds["end"]);
    }
    setTimeout(function() {
      animdiv = document.getElementById(animid);
      if (animdiv && (animdiv.parentNode)) {
        animdiv.parentNode.removeChild(animdiv);
      }
      if ((type !== "missile") || (!ammoreturn)) {
        FinishAnimation();
      } else {
        returnhtml = '<div id="'+animid+'" style="position: absolute; left: ' + ammocoords.tox + 'px; top: ' + ammocoords.toy + 'px; background-image:url(\'graphics/' + ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + ammographic.xoffset + 'px ' + ammographic.yoffset + 'px; transition: left '+duration+'ms linear 0s, top '+duration+'ms linear 0s;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';      
       
        document.getElementById('combateffects').innerHTML += returnhtml;
        animdiv = document.getElementById(animid);
      
        animdiv.addEventListener("transitionend", FinishAnimation, false);

        animdiv.offsetTop;
        Object.assign(animdiv.style, {left:ammocoords.fromx+"px", top: ammocoords.fromy+"px"});
//        setTimeout(function() { Object.assign(animdiv.style, {left:ammocoords.fromx+"px", top: ammocoords.fromy+"px"}); }, 1); // see below- kludge

      }
    }, 400);
  }

  function FinishAnimation() {
    if (eventcount2) { console.log("FinishAnimation called twice."); return; }
    eventcount2 = 1;
//    console.log("FinishAnimation called.");

    if (param.adddmg) {
      let fbdmg = prepareSpellDamage(atk,def,param.adddmg,param.adddmgtype);
      dmg += fbdmg.dmg;
    }
    if ((dmg !== 0) && def) {
      let prehp = def.getHP(); 
      // handle onDamaged stuff here
      if (def.onDamaged) {
        dmg = OnDamagedFuncs[def.onDamaged](atk,def,dmg,weapon);
      }
      if (param.weapon && param.weapon.hasOwnProperty("onMadeAttack")) {
        param.weapon.onMadeAttack(atk,def,dmg);
      }
      let effects = def.getSpellEffects();
      for (let i=0;i<effects.length;i++) {
        if (effects.onDamaged) { effects.onDamaged(atk,dmg); }
      }

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
        else if (atk.getName() === "BlackDragonNPC") { retval["txt"] += ": Unconscious!"; }
        else {retval["txt"] += ": Killed!"; }
        
        if (def.getXPVal() && (atk === PC)) {
          retval["txt"] += " (XP gained: " + def.getXPVal() + ")";
        }
      }
      let firearmor = def.getSpellEffectsByName("FireArmor");
      if (firearmor) {
        if (IsAdjacent(atk,def)) {
          firearmor.flashback(atk);
        }
      }
      if ((atk === PC) && atk.dead) { endturn = 0; }
    } 
    maintext.addText(retval["txt"]);
    maintext.setInputLine("&gt;");
    maintext.drawInputLine();

    if (param.finishcallback) { param.finishcallback(atk,def,param.callbackparam); }
    
    if ((!doagain.length) && (endturn)) {
//      console.log("Ending turn.");
      atk.endTurn(retval["initdelay"]);
    } else if (doagain.length) {
      let doit = doagain.shift();
      doit.doagain = doagain;
      AnimateEffect(doit.atk, doit.def, doit.fromcoords, doit.tocoords, doit.ammocoords, doit.destgraphic, doit.type, doit.duration, doit.ammoreturn, doit.dmg, endturn, doit.retval, doagain);
    }
  }
}

function DealandDisplayDamage(def,atk,dmg, dmgtype) {
  if (dmg !== 0) {
    let prehp = def.getHP(); 
    // handle onDamaged stuff here
    let weapon = localFactory.createTile("SpellWeapon");
    weapon.dmgtype = dmgtype;
    if (def.onDamaged) {
      dmg = OnDamagedFuncs[def.onDamaged](atk,def,dmg,weapon);
    }
    let stillalive = def.dealDamage(dmg, atk, dmgtype);   

    let desc = def.getDesc()
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    if (stillalive > -1) {
      if (Math.floor(prehp) === Math.floor(def.getHP())) {
        maintext.delayedAddText(desc + ": Scratched!"); 
      } else {
        let damagedesc = GetDamageDescriptor(def); 
        maintext.delayedAddText(desc + ": " + damagedesc + "!"); 
      }
    }
    else {  
      if (def.specials.crumbles) { maintext.delayedAddText(desc +  ": It crumbles to dust!"); }
      else if (atk.getName() === "BlackDragonNPC") { retval["txt"] += ": Unconscious!"; }
      else { maintext.delayedAddText(desc + ": Killed!"); }
      
      if (def.getXPVal() && (atk === PC)) {
        maintext.delayedAddText(" (XP gained: " + def.getXPVal() + ")");
      }
    }
    return stillalive;
  }
  return 0;
}

function SortDisplayTiles(disparray) {
  for (let i=disparray.length-1;i>=0;i--) {
    if (disparray[i].alwaystop) {
      disparray.push(disparray.slice(i,1));
    }
  }
  return disparray;
}

function GetDisplayStack(mapname, centerx, centery, x, y, tp, ev, skipfeatures, skipnpcs, skipseebelow) {
  
  let baseStack = [];
  let displayStack = [];

  let localacre = mapname.getTile(x,y);
   
  // decide whether to draw a tile, draw it shaded, or make it darkness
  let losresult = mapname.getLOS(centerx, centery, x, y);
  
  let blocks = localacre.getBlocksLOS();
    
  let lighthere = 0;
  let sunlight = mapname.getAmbientLight();
  if (sunlight === 1) {
    lighthere = 1;
  } else {
    if ((blocks >= LOS_THRESHOLD) && ((centerx != x) || (centery != y) )) {
      lighthere = GetDisplayDirectionalLight(centerx,centery,x,y,mapname,sunlight);
    } else {
      lighthere = localacre.getLocalLight("center") + sunlight;
    }
  }
    
  baseStack = localacre.getTileStack();
  let maplevel = mapname;
  if (!skipseebelow) {
    while (baseStack[0].getName() === "SeeBelow") {
      baseStack.shift();
      let retval = FindBelow(x,y,maplevel);
      maplevel = maps.getMap(maplevel.getSeeBelow());
      let loweracre = retval.tile;
      let newstack = loweracre.getTileStack();
      for (let j=newstack.length-1;j>=0;j--) {
        baseStack.unshift(newstack[j]);
      }
    }
  }

  let ontop = [];
  for (let i=0;i<baseStack.length;i++) {
    if (baseStack[i].invisible) { continue; }
    if (baseStack[i].checkType("feature") && skipfeatures) { continue; }
    if (baseStack[i].checkType("npc") && skipnpcs) { continue; }
    let displayCell = {};
    let displaytile = baseStack[i];
    displayCell.layers = displaytile.layers;
    let isnpc = 0;  // specifically, ones with minds who will be seen by telepathy
    if (displaytile.checkType("NPC") && !displaytile.specials.mindless) { isnpc = 1; }
    let graphics = displaytile.getGraphicArray();
    if ((typeof displaytile.setBySurround === "function") && ((losresult < LOS_THRESHOLD) || ev || (displaytile.getName() === "CaveWall"))) {
      if (displaytile.IWasJustDrawn) { displaytile.IWasJustDrawn(); }
      graphics = displaytile.setBySurround(x,y,mapname,graphics,1,centerx,centery,losresult);
      displayCell.showGraphic = graphics[0];
      displayCell.graphics2 = graphics[2];
      displayCell.graphics3 = graphics[3];
      displayCell.graphics1 = graphics[1];
      if (graphics[4]) {
        displayCell.layers = graphics[4];
      }
      if (typeof displaytile.doTile === "function") {
        let showGraphic = displaytile.doTile(x,y,displayCell);
        if ("graphic" in showGraphic) { displayCell.showGraphic = showGraphic.graphic; }
        if ("spritexoffset" in showGraphic) { 
          displayCell.graphics2 = showGraphic.spritexoffset;
          displayCell.graphics3 = showGraphic.spriteyoffset;
        }
      }
      displayCell.losresult = losresult;
      displayCell.lighthere = lighthere;
      displayCell.desc = displaytile.getDesc();
      if (graphics.length > 4) {
        if (graphics[4].corner && (displayCell.losresult >= LOS_THRESHOLD)) { 
          let seecorners = 1;
          if (graphics[4].east) {
            if ( mapname.getLOS(centerx, centery, x+1, y) >= LOS_THRESHOLD) { seecorners = 0; }
            else {
              let eastlight = GetDisplayDirectionalLight(centerx,centery,x+1,y,mapname,sunlight);
              if (eastlight > displayCell.lighthere) { displayCell.lighthere = eastlight; }
            }
          }
          if (graphics[4].west) {
            if ( mapname.getLOS(centerx, centery, x-1, y) >= LOS_THRESHOLD) { seecorners = 0; }
            else {
              let westlight = GetDisplayDirectionalLight(centerx,centery,x-1,y,mapname,sunlight);
              if (westlight > displayCell.lighthere) { displayCell.lighthere = westlight; }
            }
          }
          if (graphics[4].north) {
            if ( mapname.getLOS(centerx, centery, x, y-1) >= LOS_THRESHOLD) { seecorners = 0; }
            else {
              let northlight = GetDisplayDirectionalLight(centerx,centery,x,y-1,mapname,sunlight);
              if (northlight > displayCell.lighthere) { displayCell.lighthere = northlight; }
            }
          }
          if (graphics[4].south) {
            if ( mapname.getLOS(centerx, centery, x, y+1) >= LOS_THRESHOLD) { seecorners = 0; }
            else {
              let southlight = GetDisplayDirectionalLight(centerx,centery,x,y+1,mapname,sunlight);
              if (southlight > displayCell.lighthere) { displayCell.lighthere = southlight; }
            }
          }
          if (seecorners) { displayCell.losresult = 0; } 
        } 
      }
      if (displaytile.alwaystop) { ontop.push(displayCell); }
      else if (displayCell.losresult < LOS_THRESHOLD) { displayStack.push(displayCell); }
    } else if ((losresult < LOS_THRESHOLD) || ((tp === 1) && isnpc) || ev) {
      if (displaytile.IWasJustDrawn) { displaytile.IWasJustDrawn(); }
      displayCell.showGraphic = graphics[0];
      displayCell.graphics2 = graphics[2];
      displayCell.graphics3 = graphics[3];
      displayCell.graphics1 = graphics[1];
      if (typeof displaytile.doTile === "function") {
        let showGraphic = displaytile.doTile(x,y,displayCell);
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
      displayCell.divid = "divid_" + displaytile.getSerial();
      if (displaytile.alwaystop) { ontop.push(displayCell); }
      else { displayStack.push(displayCell); }
    } else {
      // skip adding to displayStack
    }
  }
  for (let i=0;i<ontop.length;i++) {
    displayStack.push(ontop[i]);
  }
  if (displayStack.length === 0) {
    let displaytile = eidos.getForm('BlankBlack');
    let graphics = displaytile.getGraphicArray();
    let displayCell = {};
    displayCell.showGraphic = graphics[0];
    displayCell.graphics2 = graphics[2];
    displayCell.graphics3 = graphics[3];
    displayCell.graphics1 = graphics[1];
    displayCell.losresult = losresult;
    displayCell.lighthere = lighthere;
    displayCell.desc = "You cannot see that";
    displayStack.push(displayCell);
  }
  let returnStack = [];
  for (let i=0;i<displayStack.length;i++) {
    returnStack.push(displayStack[i]);
    if (displayStack[i].layers) {
      for (let j=0;j<displayStack[i].layers.length;j++) {
        if (displayStack[i].layers[j]) {
          let makeCell = {};
          makeCell.losresult = displayStack[i].losresult;
          makeCell.lighthere = displayStack[i].lighthere;
          makeCell.desc = displayStack[i].desc;
          makeCell.isnpc = displayStack[i].isnpc;
          makeCell.showGraphic = displayStack[i].layers[j][0];
          makeCell.graphics1 = displayStack[i].layers[j][1];
          if (!makeCell.graphics1) { makeCell.graphics1 = "spacer.gif"; }
          makeCell.graphics2 = displayStack[i].layers[j][2];
          makeCell.graphics3 = displayStack[i].layers[j][3];
          makeCell.divid = displayStack[i].divid + "_" + j;
          returnStack.push(makeCell);
        }
      }
    }
  }
  return returnStack;
}

function GetDisplayDirectionalLight(centerx,centery,x,y,lightmap,sunlight) {
  let dirnum = GetViewDirection(centerx,centery,x,y);
  let lighthere=0;
  let localacre = lightmap.getTile(x,y);
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
  return lighthere;
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
    
  let toptop = localacre.getTop(0,1,1);  // sorts NPCs to top, but "alwaystop" features above them
  displaytile = localacre.getTop(0,1);
  let isontop = 0;
  if (toptop !== displaytile) { isontop = 1; }
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
  if (isontop) {
    let gra = toptop.getGraphicArray();
    let topview = {};
    topview.showGraphic = gra[0];
    topview.graphics1 = gra[1];
    topview.graphics2 = gra[2];
    topview.graphics3 = gra[3];
    displayCell.topview = topview;
  }
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

function AnimateMoongate(obj, repeat, dir, waitdur, destroywhendone) {
  if (timeouts[obj.getSerial()]) { clearTimeout(timeouts[obj.getSerial()]); }
  if (dir === "down") { obj.spriteyoffset = -32; }
  else { obj.spriteyoffset = 0; }
  if (PC.getHomeMap() === obj.getHomeMap()) {
    DrawMainFrame("one", obj.getHomeMap(), obj.getx(), obj.gety());
    timeouts[obj.getSerial()] = setTimeout(function() { ContinueMoongateAnimation(obj, repeat, dir, waitdur, destroywhendone) }, waitdur);
  }
}

function ContinueMoongateAnimation(obj,repeat, dir, waitdur, destroywhendone) {
  if (obj.getHomeMap() === PC.getHomeMap()) {
    let endy = -32;
    let starty = 0;
    let diff = -8;
    if (dir === "down") {
      endy = 0;
      starty = -32;
      diff = 8;
    }
    if (obj.spriteyoffset === endy) {
      if (repeat) {
        obj.spriteyoffset = starty;
        DrawMainFrame("one", obj.getHomeMap(), obj.getx(), obj.gety());
        timeouts[obj.getSerial()] = setTimeout(function() { ContinueMoongateAnimation(obj, repeat, dir, waitdur, destroywhendone) }, waitdur);
      }  else if (destroywhendone) {
        setTimeout(function() { DestroyMoongateAnimation(obj) }, waitdur);
      } else {
        delete timeouts[obj.getSerial()];
      }
    } else {
      obj.spriteyoffset = parseInt(obj.spriteyoffset) + diff;
      DrawMainFrame("one", obj.getHomeMap(), obj.getx(), obj.gety());
      timeouts[obj.getSerial()] = setTimeout(function() { ContinueMoongateAnimation(obj, repeat, dir, waitdur, destroywhendone) }, waitdur);
    }
  } else if (destroywhendone) {
    DestroyMoongateAnimation(obj);
  }
}

function DestroyMoongateAnimation(thing) {
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
  document.getElementById('mainview').style.left = 17;
  setTimeout(function() {
    document.getElementById('mainview').style.left = 19;
    setTimeout(function() {
      document.getElementById('mainview').style.left = 21;
      setTimeout(function() {
        document.getElementById('mainview').style.left = 19;
        setTimeout(function() {
          document.getElementById('mainview').style.left = 17;
          setTimeout(function() {
            document.getElementById('mainview').style.left = 19;
            setTimeout(function() {
              document.getElementById('mainview').style.left = 21;
              setTimeout(function() {
                document.getElementById('mainview').style.left = 19;
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
  
  // Ironically, to do a fade OUT I was performing a jquery fadeIn(), to fade in a blanket of darkness
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

  if (document.getElementById('darkness')) {
    if (death) {
      document.getElementById('darkness').classList.toggle("rundeathfadein");
    } else {
      document.getElementById('darkness').classList.toggle("runfadein");
    }
    document.getElementById('darkness').classList.toggle("runfadeout");
  } else { console.log("skipped fadein due to no darkness!"); }
  setTimeout(function() { document.getElementById('spelleffects').innerHTML = ""; }, 1500);
  
}

function GetSpritesheetLocation(x,y) {
  return parseInt(x) * -1 / 32 + (parseInt(y) * -1 / 32) * 10;
}

function AnimateAndFreeze(param) {
  //console.log("Animation begins!");
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
  // param.dmgtype - type of damage: force, fire, ice, physical, etc
  // param.endturn - 1 if this ends atk's turn
  // param.retval - retval from calling function
  // param.finishcallback - function to run when animation finishes, just before turn ends
  // param.callbackparam - object with parameters to feed to callback
  // param.weapon - the attacker's weapon, if appropriate
  let duration = param.duration;
  let endturn = param.endturn;
  let retval = param.retval;
  let ammographic = param.ammographic;
  let tocoords = param.tocoords;
  let fromcoords = param.fromcoords;
  let ammocoords = GetCoordsWithOffsets(param.ammographic.fired, param.fromcoords, param.tocoords);
  let destgraphic = param.destgraphic;
  let eventcount = 0;
  let eventcount2 = 0;
  let atk = param.atk;
  let animid = "anim_" + Dice.roll("1d100000");  // so more than one can be going at a time

//  console.log("From: " + fromcoords.x + "," + fromcoords.y);
//  console.log("To: " + tocoords.x + "," + tocoords.y);
//  console.log(type);

      let tablehtml = '<div id="'+animid+'" style="position: absolute; left: ' + ammocoords.fromx + 'px; top: ' + ammocoords.fromy + 'px; background-image:url(\'graphics/' + ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + ammographic.xoffset + 'px ' + ammographic.yoffset + 'px; transition: left '+duration+'ms linear 0s, top '+duration+'ms linear 0s;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
  
  document.getElementById('combateffects').innerHTML += tablehtml;
  let animdiv = document.getElementById(animid);
  animdiv.addEventListener("transitionend", function(event) { 
    FinishFirstAnimation();
  }, false);

  animdiv.offsetTop;
  Object.assign(animdiv.style, {left: ammocoords.tox+"px", top: ammocoords.toy+"px" });
  

  function FinishFirstAnimation(skipped) {
    if (!eventcount) {
    eventcount = 1;
    let animdiv = document.getElementById(animid);
    if (animdiv) {
      animdiv.parentNode.removeChild(animdiv);
    }
//    let hitanimhtml = '<div id="'+animid+'" style="position: absolute; left: ' + tocoords.x + 'px; top: ' + tocoords.y + 'px; background-image:url(\'graphics/' + destgraphic.graphic + '\');background-repeat:no-repeat; background-position: '+destgraphic.xoffset+'px '+destgraphic.yoffset+'px;"><img src="graphics/' + destgraphic.overlay + '" width="32" height="32" /></div>';
  
//    document.getElementById('combateffects').innerHTML += hitanimhtml;
//    setTimeout(function() {
      animdiv = document.getElementById(animid);
      let frspell = localFactory.createTile("FrozenSpell");
      frspell.setGraphic("blasts.gif");
      frspell.spritexoffset = ammographic.xoffset;
      frspell.spriteyoffset = ammographic.yoffset;
      frspell.setDesc(param.frdesc);
      param.def.getHomeMap().placeThing(param.newx,param.newy,frspell);  
      DrawMainFrame("one",param.def.getHomeMap(),param.newx,param.newy);
      if (animdiv && (animdiv.parentNode)) {
        animdiv.parentNode.removeChild(animdiv);
      }
      FinishAnimation();
//    }, 400);
    }
  }

  function FinishAnimation() {
    if (eventcount2) { console.log("FinishAnimation called twice."); return; }
    eventcount2 = 1;
//    console.log("FinishAnimation called.");

    maintext.addText(retval["txt"]);
    maintext.setInputLine("&gt;");
    maintext.drawInputLine();
    
    if (endturn) {
//      console.log("Ending turn.");
      atk.endTurn(retval["initdelay"]);
    } 
  }

}
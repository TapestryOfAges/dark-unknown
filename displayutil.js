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

  let ammocoords = GetCoordsWithOffsets(param.ammographic.fired, param.fromcoords, param.tocoords);
  param.ammocoords = ammocoords;
  let animid = "anim_" + Dice.roll("1d100000");  // so more than one can be going at a time
  param.animid = animid;

  param.duration = parseInt(param.duration);

  if (param.type === "melee") { FinishFirstAnimation(param); }
  else {
//    let tablehtml = '<div id="'+animid+'" style="position: absolute; left: ' + ammocoords.fromx + 'px; top: ' + ammocoords.fromy + 'px; background-image:url(\'graphics/' + param.ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + param.ammographic.xoffset + 'px ' + param.ammographic.yoffset + 'px; transition: left '+param.duration+'ms linear 0s, top '+param.duration+'ms linear 0s;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
//    let tablehtml = '<div id="'+animid+'" style="position: absolute; left: ' + ammocoords.fromx + 'px; top: ' + ammocoords.fromy + 'px; background-image:url(\'graphics/' + param.ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + param.ammographic.xoffset + 'px ' + param.ammographic.yoffset + 'px; transition: transform '+param.duration+'ms linear 0s;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
  
    let animnode = document.createElement("div");
    animnode.innerHTML = `<img src="graphics/spacer.gif" width="32" height="32" />`;
    animnode.style.position = 'absolute';
    animnode.style.left = `${ammocoords.fromx}px`;
    animnode.style.top = `${ammocoords.fromy}px`;
    animnode.style.backgroundImage = `url('graphics/${param.ammographic.graphic}')`;
    animnode.style.backgroundRepeat = 'no-repeat';
    animnode.style.backgroundPosition = `${param.ammographic.xoffset}px ${param.ammographic.yoffset}px`;
    animnode.style.transition = `transform ${param.duration}ms linear 0s`;
    animnode.id = animid;
    animnode.addEventListener("transitionend", (event) => {
      FinishFirstAnimation(param);
    }, false);

//    document.getElementById('combateffects').innerHTML += tablehtml;
    document.getElementById('combateffects').appendChild(animnode);

//    let animdiv = document.getElementById(animid);
//    animdiv.addEventListener("transitionend", (event) => { 
//      FinishFirstAnimation();
//    }, false);

    animnode.offsetTop;
//    console.log(document.getElementById('combateffects').innerHTML);
    let diffx = ammocoords.tox - ammocoords.fromx;
    let diffy = ammocoords.toy - ammocoords.fromy;
//    Object.assign(animdiv.style, {left: ammocoords.tox+"px", top: ammocoords.toy+"px" });
    Object.assign(animnode.style, {transform: `translate(${diffx}px,${diffy}px)` });

  }
}

function FinishFirstAnimation(p) {
  let animdiv = document.getElementById(p.animid);
  if (animdiv) {
    animdiv.parentNode.removeChild(animdiv);
  }
//  let hitanimhtml = '<div id="'+p.animid+'" style="position: absolute; left: ' + p.tocoords.x + 'px; top: ' + p.tocoords.y + 'px; background-image:url(\'graphics/' + p.destgraphic.graphic + '\');background-repeat:no-repeat; background-position: '+p.destgraphic.xoffset+'px '+p.destgraphic.yoffset+'px;"><img src="graphics/' + p.destgraphic.overlay + '" width="32" height="32" /></div>';
  let hitanimnode = document.createElement("div");
  hitanimnode.innerHTML = "";
  hitanimnode.id = p.animid;
  hitanimnode.style.width = 32;
  hitanimnode.style.height = 32;
  hitanimnode.style.position = "absolute";
  hitanimnode.style.left = `${p.tocoords.x}px`;
  hitanimnode.style.top = `${p.tocoords.y}px`;
  hitanimnode.style.backgroundImage = `url('graphics/${p.destgraphic.graphic}')`;
  hitanimnode.style.backgroundRepeat = "no-repeat";
  hitanimnode.style.backgroundPosition = `${p.destgraphic.xoffset}px ${p.destgraphic.yoffset}px`;

//  document.getElementById('combateffects').innerHTML += hitanimhtml;
  document.getElementById('combateffects').appendChild(hitanimnode);
  if (p.sounds["end"]) {
    DUPlaySound(p.sounds["end"]);
  }
  setTimeout(function() {
    animdiv = document.getElementById(p.animid);
    if (animdiv && (animdiv.parentNode)) {
      animdiv.parentNode.removeChild(animdiv);
    }
    if ((p.type !== "missile") || (!p.ammoreturn)) {
      FinishAnimation(p);
    } else {
//      let returnhtml = '<div id="'+p.animid+'" style="position: absolute; left: ' + p.ammocoords.tox + 'px; top: ' + p.ammocoords.toy + 'px; background-image:url(\'graphics/' + p.ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + p.ammographic.xoffset + 'px ' + p.ammographic.yoffset + 'px; transition: left '+p.duration+'ms linear 0s, top '+p.duration+'ms linear 0s;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';      
      let returnnode = document.createElement("div");
      returnnode.innerHTML = `<img src="graphics/spacer.gif" width="32" height="32" />`;
      returnnode.id = p.animid;
      returnnode.style.width = 32;
      returnnode.style.height = 32;
      returnnode.position = "absolute";
      returnnode.left = `${p.ammocoords.tox}px`;
      returnnode.top = `${p.ammocoords.toy}px`;
      returnnode.backgroundImage = `url("graphics/${p.ammographic.graphic}")`;
      returnnode.backgroundRepeat = "no-repeat";
      returnnode.backgroundPosition = `${p.ammographic.xoffset}px ${p.ammographic.yoffset}px`;
      returnnode.style.transition = `transform ${p.duration}ms linear 0s`;
      returnnode.addEventListener("transitionend", FinishAnimation(p), false);

      
//      document.getElementById('combateffects').innerHTML += returnhtml;
      document.getElementById('combateffects').appendChild(returnnode);

      returnnode.offsetTop;
      let diffx = ammocoords.fromx - ammocoords.tox;
      let diffy = ammocoords.fromy - ammocoords.toy;
      Object.assign(returnnode.style, {transform: `translate(${diffx}px,${diffy}px)` });

    }
  }, 400);
}

function FinishAnimation(param) {

  let retval = param.retval;
  let dmg = param.dmg;
  if (param.adddmg) {
    let fbdmg = prepareSpellDamage(param.atk,param.def,param.adddmg,param.adddmgtype);
    dmg += fbdmg.dmg;
  }
  if ((dmg !== 0) && param.def) {
    let prehp = param.def.getHP(); 
    // handle onDamaged stuff here
    if (param.def.onDamaged) {
      dmg = OnDamagedFuncs[param.def.onDamaged](param.atk,param.def,dmg,param.weapon);
    }
    if (param.weapon && param.weapon.hasOwnProperty("onMadeAttack")) {
      param.weapon.onMadeAttack(param.atk,param.def,dmg);
    }
    let effects = param.def.getSpellEffects();
    for (let i=0;i<effects.length;i++) {
      if (effects.onDamaged) { effects.onDamaged(param.atk,dmg); }
    }

    let stillalive = param.def.dealDamage(dmg, param.atk, param.dmgtype);   

    if (stillalive > -1) {
      if (Math.floor(prehp) === Math.floor(param.def.getHP())) {
        retval["txt"] += ": Scratched!"; 
      } else {
        let damagedesc = GetDamageDescriptor(param.def); 
        retval["txt"] += ": " + damagedesc + "!"; 
      }
    }
    else {  
      if (param.def.specials.crumbles) { retval["txt"] += ": It crumbles to dust!"; }
      else if (param.atk.getName() === "BlackDragonNPC") { retval["txt"] += ": Unconscious!"; }
      else {retval["txt"] += ": Killed!"; }
        
      if (param.def.getXPVal() && (param.atk === PC)) {
        retval["txt"] += " (XP gained: " + param.def.getXPVal() + ")";
      }
    }
    let firearmor = param.def.getSpellEffectsByName("FireArmor");
    if (firearmor) {
      if (IsAdjacent(param.atk,param.def)) {
        firearmor.flashback(param.atk);
      }
    }
    if ((param.atk === PC) && param.atk.dead) { endturn = 0; }
  } else {
    if (retval["txt"] === "You") { retval["txt"] = ""; } 
  }
  if (retval["txt"]) {
    maintext.addText(retval["txt"]);
  }
  if (targetCursor.sayAfterAttack) {
    maintext.addText(targetCursor.sayAfterAttack);
    delete targetCursor.sayAfterAttack;
  }
  maintext.setInputLine("&gt;");
  maintext.drawInputLine();

  if (param.finishcallback) { param.finishcallback(param.atk,param.def,param.callbackparam); }
    
  if (!targetCursor.animatedTargets) { targetCursor.animatedTargets = 0; }
  targetCursor.animatedTargets++;
  
  if ((!param.doagain.length) && (param.endturn)) {
    if (targetCursor.animatedTargets >= param.endturn) {
      delete targetCursor.animatedTargets;
      if (param.myturn) {
        param.myturn.endTurn(retval["initdelay"]);
      } else {
        param.atk.endTurn(retval["initdelay"]);
      }
    } 
  } else if (param.doagain.length) {
    let doit = param.doagain.shift();
    doit.doagain = param.doagain;
//      AnimateEffect(doit.atk, doit.def, doit.fromcoords, doit.tocoords, doit.ammocoords, doit.destgraphic, doit.type, doit.duration, doit.ammoreturn, doit.dmg, endturn, doit.retval, doagain);
    AnimateEffect(doit);
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
      if (graphics[4] && (!graphics[4].hasOwnProperty("corner"))) {
        displayCell.layers = [graphics[4]];
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
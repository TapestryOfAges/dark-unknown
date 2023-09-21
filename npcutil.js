"use strict";

//function NPCGroup() {
//  this.min = 1;
//  this.max = 1;
//  this.makeup = new Array;
//  this.makeup[0] = { name: "test", min: 1, max: 1 };
//}
//NPCGroup.prototype = new Object;

function Anchor() {
  this.x
  this.y
  this.maxlength;
  this.leashlength;
}
Anchor.prototype = new Object();

let NPCSpecialFuncs = {};

NPCSpecialFuncs["quick"] = function(who, how) {
  let qobj = localFactory.createTile("Quickness");
  qobj.setExpiresTime(-1);
  who.addSpellEffect(qobj);  
}

NPCSpecialFuncs["mirror"] = function(who, how) {
  who.setGraphicArray(PC.getGraphicArray());
  who.gender = PC.gender
  who.npcname = PC.pcname;  
}

NPCSpecialFuncs["light"] = function(who,how) {
  LightEmitting.call(who, how);
}

NPCSpecialFuncs["flamearmor"] = function(who,how) {
  let qobj = localFactory.createTile("FireArmor");
  if (how) {
    qobj.setPower(how);
  } else {
    qobj.setPower("2d4");
  }
  qobj.setExpiresTime(-1);
  who.addSpellEffect(qobj);  
}

NPCSpecialFuncs["invisible"] = function(who,how) {
  who.invisible = 1;
}

NPCSpecialFuncs["hides"] = function(who,how) {
  let oldgraph = who.getGraphic();
  who.setGraphic(how);
  return oldgraph;
}

NPCSpecialFuncs["courierSurrender"] = function(who,how) {
  let eobj = localFactory.createTile("CourierSurrender");
  who.addSpellEffect(eobj);
}

NPCSpecialFuncs["courierFlee"] = function(who,how) {
  let eobj = localFactory.createTile("CourierFlee");
  who.addSpellEffect(eobj);
}

NPCSpecialFuncs["ondeathInsects"] = function(who,how) {
  who.onDeath = "insects";
}

NPCSpecialFuncs["ondeathPatrol"] = function(who,how) {
  who.onDeath = "patrol";
}

NPCSpecialFuncs["ondeathWarduke"] = function(who,how) {
  who.onDeath = "Warduke";
}

NPCSpecialFuncs["ondeathEndact"] = function(who,how) {
  who.onDeath = "endact";
}

NPCSpecialFuncs["ondeathCult"] = function(who,how) {
  who.onDeath = "cult";
}

NPCSpecialFuncs["ondeathDestroyCrystal"] = function(who,how) {
  who.onDeath = "destroycrystals";
}

NPCSpecialFuncs["ondeathElder"] = function(who,how) {
  who.onDeath = "Elder";
}

NPCSpecialFuncs["archdaemon_ashes"] = function(who,how) {
  who.onDeath = "archdaemon_ashes";
}

NPCSpecialFuncs["archdaemon_dust"] = function(who,how) {
  who.onDeath = "archdaemon_dust";
}

NPCSpecialFuncs["archdaemon_bone"] = function(who,how) {
  who.onDeath = "archdaemon_bone";
}

NPCSpecialFuncs["ondeathShadow"] = function(who,how) {
  who.onDeath = "shadow";
}

NPCSpecialFuncs["patrol"] = function(who,how) {
  let ainame = who.getPeaceAI();
  who.overridecombat = 'guard' + ainame;
}

function DestroyJusticeCrystals() {
  let jmap = PC.getHomeMap();
  let crystals = jmap.npcs.getAll();
  Earthquake();
  for (let i=0;i<crystals.length;i++) {
    if (crystals[i].getName() === "CrystalBarrierNPC") {
      crystals[i].dealDamage(1000);
    }
  }
  DUPlaySound("sfx_break_glass");
}

function TurnMapHostile(map) {
  DebugWrite("combat", "Attacked a friendly! Turning hostile...<br />");
  PC.diffKarma(-10); 
  let localnpcs = map.npcs.getAll();
  for (let idx=0;idx<localnpcs.length;idx++) {
    let val = localnpcs[idx];
    if ((val.getAttitude() === "friendly") && (!val.summonedby)) {
      val.setAttitude("hostile");
      val.setAggro(1);
      DebugWrite("combat", val.getName() + " (serial: " + val.getSerial() + ") turns hostile!<br />");
    }
  };
}

function Attack(atk, def) {
  let retval = {};
  let type = "melee";
  let rad = 1;
  let endturn = 1;
  if (atk.specials.reach) { 
    rad = 2; 
  }
  DebugWrite("combat", "Attacking: reach is " + rad + ", atk coords: " + atk.getx() + ", " + atk.gety() + " ; def coords: " + def.getx() + ", " + def.gety() + ".<br />");
  if (Math.abs(atk.getx() - def.getx()) > rad) { type = "missile";}
  if (Math.abs(atk.gety() - def.gety()) > rad) { type = "missile";}

  let weapon = atk.getEquipment("weapon");
  let loeresult = 0;

  if (type === "missile") {
    // check to see if attacker can use its missile weapon
    let dex = atk.getDex();
    weapon = atk.getEquipment("missile");
    
    if (!weapon) {
      retval["txt"] = "You don't have a missile weapon equipped!";
      retval["fin"] = 0;
      retval["input"] = "&gt;";
      return retval;
    }
    if (dex < weapon.getDexReq()) {
      retval["txt"] = "You are not agile enough to use your weapon!";
      retval["fin"] = 0;
      retval["input"] = "&gt;";
      return retval;
    }
    if (!CanMissileAttack(atk)) {
      retval["txt"] = "Enemy too close. You cannot use your " + weapon.getDesc() + ".";
      retval["fin"] = 0;
      retval["input"] = "&gt;";
      return retval;
    }
    
    let themap = atk.getHomeMap();
      
    loeresult = themap.getLOS(atk.getx(), atk.gety(), def.getx(), def.gety(), 1);
    
    if (loeresult > LOS_THRESHOLD) {
      retval["txt"] = "You cannot attack that target from here.";
      retval["fin"] = 0;
      retval["input"] = "&gt;";
      return retval;
    }
  } 
  
  // probably should make an onAttack but for now this can do
  if (atk.specials.hides) {
    atk.setGraphic(atk.specials.hides);  
    delete atk.specials.hides;
    if (atk.getHomeMap() === PC.getHomeMap()) {
      DrawMainFrame("one",atk.getHomeMap(),atk.getx(),atk.gety());
    }
  }

  if (atk.checkType("pc")) {
    retval["txt"] = "Attack " + def.getDesc();
    if (def.getAttitude() === "friendly") {
      // Make it and its friends hostile. 
      // shouldn't this be done with an event/observer?
      TurnMapHostile(def.getHomeMap());
    }

    if (weapon.wornlayer) {   // PC holds the latest weapon they attacked with
      let wln = weapon.wornlayername;
      if (weapon.wornlayer === "mainhand") {
        if (atk.skintone === 1) { wln += "Pale"; }
        else { wln += "Dark"; }
      }
      atk.wornlayers[weapon.wornlayer] = wln;
      atk.makeLayers();
      DrawMainFrame("one",atk.getHomeMap(),atk.getx(),atk.gety());
    }
  
  } else {
    retval["txt"] =  atk.getDesc() + " attacks " + def.getDesc();
    retval["txt"] = retval["txt"].charAt(0).toUpperCase() + retval["txt"].slice(1);
  }
  if (def !== PC) {
    def.setAggro(1);
  }
  DebugWrite("combat", "Attacking: weapon is " + weapon.getName() + "<br />");
  let tohit = atk.getHitChance(type) / 100;
  tohit -= loeresult/2; // harder to hit if foe has cover

  DebugWrite("combat", "Attacking: reducing to-hit chance by " + loeresult/2 + " due to cover<br />");
  let defense = def.getDefense() / 100;

  DebugWrite("combat", "Atk: " + tohit + "; enemy defense: " + defense + "<br />");
  tohit = tohit - defense;
  if (tohit < .05) { tohit = .05; }
  
  DebugWrite("combat", "Chance to hit: " + tohit + "<br />");
//  var preanim = PreAnimationEffect(mapref, fromx,fromy,tox,toy,graphic,xoffset,yoffset,destgraphic,destxoffset,destyoffset)
  let dmg = 0;
  let storymode = DU.gameflags.getFlag("storymode");
  let snd;
  if (type === "melee") {
    snd = atk.getMeleeAttackSound();
  } else {
    snd = atk.getMissileAttackSound();
  }
  if (!snd) {
    weapon.getAttackSound();
  }
  if (snd) {
    DUPlaySound(snd);
  }
  snd = "";

  if ((Math.random() <= tohit) || (storymode && (atk === PC))) {
    // Hit!
    
    dmg = weapon.rollDamage(atk);
    if (type === "melee") {
      snd = atk.getMeleeHitSound();
    } else {
      snd = atk.getMissileHitSound();
    }
    if (!snd) {
      snd = weapon.getHitSound();
    }

    if (dmg < 1) { dmg = 1; }  // min dmg 1 on a hit
    if (storymode && (atk === PC)) { dmg = 500; }
    
    DebugWrite("combat", "Hit! Dealing " + dmg + " damage.<br />");
    if (atk.getOnHit()) {
      let onhits = atk.getOnHit().split(",");
      for (let i=0;i<onhits.length;i++) {
        if (typeof OnHitFuncs[onhits[i]] === "function") {
          DebugWrite("combat", "Undertaking onhit: " + onhits[i] + "<br />");
          OnHitFuncs[onhits[i]](atk,def,dmg);
          DebugWrite("combat", "Finished.<br />");
        } else {
          DebugWrite("combat", "**Attacker has an On Hit (" + onhits[i] + ") that does not have a function!**<br />");
        }
      }
    }
  }
  else { // Miss!
    // animation and sound here, too
    retval["txt"] = retval["txt"] + " - missed!";
    
  }
  
  // animate attack
  let fromcoords = getCoords(atk.getHomeMap(),atk.getx(), atk.gety());
  let tocoords = getCoords(def.getHomeMap(),def.getx(), def.gety());

  let ammographic = {};
  let duration = 50;
  let ammoreturn = 0;
  if (type === "missile") { 
    ammographic = weapon.getAmmoGraphic(atk,def); 
    duration = (Math.pow( Math.pow(def.getx() - atk.getx(), 2) + Math.pow (def.gety() - atk.gety(), 2)  , .5)) * 60;
    ammoreturn = weapon.getAmmoReturn();
  }
  else { 
    ammographic.graphic = "spacer.gif";
    ammographic.xoffset = 0;
    ammographic.yoffset = 0;
    ammographic.fired = -1;
  }

  let hitgraphic = {};
  hitgraphic.graphic = "static.png";
  hitgraphic.xoffset = RED_SPLAT_X;
  hitgraphic.yoffset = RED_SPLAT_Y;
  hitgraphic.overlay = "spacer.gif";
  if (dmg === 0) { 
    hitgraphic.graphic = "static.png"; 
    hitgraphic.xoffset = RED_BALL_X;
    hitgraphic.yoffset = RED_BALL_Y;
  }
  
  let sounds = {start: "", end: snd};

  AnimateEffect(atk,def,fromcoords,tocoords,ammographic,hitgraphic,sounds, {type:type, duration:duration,ammoreturn:ammoreturn,dmg:dmg,endturn:endturn,retval:retval,weapon:weapon});
  
  let tmpval = {};
  tmpval["fin"] = -1;
  tmpval["wait"] = 1;
  return tmpval;
}

function prepareSpellDamage(damsrc, damtar, damval, damtype) {
  let retval = {};
  retval.dmg = Dice.roll(damval);

  if (damtype === "magic") {
    let armor = damtar.getEquipment("armor");
    let resist = 0;
    if (resist) {
      resist = armor.getResist() - damsrc.getReduceResist();
      if (resist < 0) { resist = 0; }
    }    
    if (Dice.roll("1d100") <= resist) {
      retval.msg = "RESIST!";
      retval.dmg = Dice.rollmin(damval);
    }
  }

  if (damtype === "physical") {
    let armor = damtar.getEquipment("armor");
    let absorb = 0;
    if (armor) {
      absorb = armor.getAbsorb() - damsrc.getReduceResist();
      absorb /= 100;
      if (absorb < 0) { absorb = 0; }
    }
    retval.dmg = Math.floor(retval.dmg * (1-absorb));
    if (retval.dmg === 0) { retval.dmg = 1; }  // min dmg 1
  } 
  
  if (damtype === "fire") {
    if (damtar.resists.fire) {
      let fireresist = (damtar.resists.fire - damsrc.getReduceResist)/100;
      retval.dmg = retval.dmg * (1-fireresist);
    }
  }
  
  if (damtype === "ice") {
    if (damtar.resists.ice) {
      let iceresist = (damtar.resists.ice - damsrc.getReduceResist)/100;
      retval.dmg = retval.dmg * (1-iceresist);
    }
  }
  
}

function GetCoordsWithOffsets(direction, from, to) {

  let fromdisplace = 10;
  let todisplace = 5;

  let coordsobj = {};
  coordsobj.fromx = from.x;
  coordsobj.fromy = from.y;
  coordsobj.tox = to.x;
  coordsobj.toy = to.y;

  if ((direction === 7) || (direction === 0) || (direction === 1)) {  // north is a component
    coordsobj.fromy -= fromdisplace;
    coordsobj.toy += todisplace;
  }
  if ((direction >= 1) && (direction <= 3)) { // east is a component
    coordsobj.fromx += fromdisplace;
    coordsobj.tox -= todisplace;
  }
  if ((direction >= 3) && (direction <= 5)) { // south is a component
    coordsobj.fromy += fromdisplace;
    coordsobj.toy -= todisplace;
  }
  if ((direction >= 5) && (direction <= 7)) {  // west is a component
    coordsobj.fromx -= fromdisplace;
    coordsobj.fromy += todisplace;
  }

  return coordsobj;
}
  
function GetDamageDescriptor(who) {
  let ratio = who.getHP() / who.getMaxHP();
  if (who.specials.noact) {
    if (ratio > .66) { return ("lightly damaged"); }
    if (ratio > .4) { return ("moderately damaged"); }
    if (ratio > .2) { return ("heavily damaged"); }
    return ("catastrophically damaged");
  } else {
    if (ratio > .66) { return ("lightly wounded"); }
    if (ratio > .4) { return ("moderately wounded"); }
    if (ratio > .2) { return ("heavily wounded"); }
    return ("deathly wounded");
  }
}

function CanMissileAttack(who) {
  // looks to see if there are adjacent melee enemies
  let themap = who.getHomeMap();
  for (let i=-1; i<=1 ; i++) {
    for (let j=-1; j<=1; j++) {
      let tile = themap.getTile(who.getx() + i, who.gety() + j);
      if (tile != "OoB") { 
        let npcs = tile.getNPCs();
        if (npcs) {
          for (let k=0; k<npcs.length; k++) {
            if (CheckAreEnemies(npcs[k],who)) { return 0; }
          }
        }
      }
    }
  }
  return 1;
}

function SetActiveEffects(who) {
  let effects = who.getSpellEffects();
  effects.sort(function(a,b){ if (a.getName() == b.getName()) {
                                return (b.getPower() - a.getPower());
                              } else {
                                if (a.getName() < b.getName()) { return -1; }
                                else return 1;
                              }  } );
                              
  let currname = "";
  for (let i=0; i<effects.length; i++ ) {
    if (effects[i].getName() === currname) { effects[i].setActive(0); }
    else {
      effects[i].setActive(1);
      currname = effects[i].getName();
    }
  }
}

function RunEffects(who) {
  let effects = who.getSpellEffects();
  if (effects) {
    for (let i=0; i<effects.length; i++) {
      if (effects[i].getActive()) {
        effects[i].onTurn();
      } 
    } 
  }
}

function PickOne(fromarray) {
  let roll = Math.floor(Math.random() * fromarray.length);
  return fromarray[roll];
}

function PushOff(what) {
  let dir = 4;
  let themap = what.getHomeMap();
  let locx = what.getx();
  let locy = what.gety();
  let tries = 0;
  while (tries < 8) {
    let tile = themap.getTile(locx,locy);
    let destx = locx;
    let desty = locy;
    if ((dir === 7) || (dir <= 1)) { desty -= 1; }
    if ((dir >= 3) && (dir <= 5)) { desty += 1; }
    if ((dir >= 1) && (dir <= 3)) { destx += 1; }
    if ((dir >= 5) && (dir <= 7)) { destx -= 1; }

    if (tile.canMove(MOVE_WALK, 1)) {   // can walk but ignore NPCs there- this is a rare 
                                        // circumstance where I will stack NPCs
      themap.moveThing(destx, desty, what);
      DebugWrite("combat", "Moving NPC off of exit, in direction " + dir + "<br />");
      return 1;
    }
    tries += 1;
    dir += 1;
    if (dir === 8) { dir = 0; }
  }
  DebugWrite("combat", "Moving NPC off of exit, in emergency backup code.<br />");
  themap.moveThing(locx, locy+1, what);
  return 1;
  
}

function Regen(who) {
  if (who.getSpellEffectsByName("Disease")) { return; } 
  
  if (DUTime.getGameClock() > who.nextMana) {
    if (who.getMana() < who.getMaxMana()) {
      who.modMana(1);
    }
    who.nextMana += MANA_REGEN;
  }
  
  // put HP regen here if I decide to include it after all
}

function EarnedLevel(who) { 
  if (who.getLevel === LVL_MAX) { return 0; }
  let needed = Math.pow(2, who.getLevel()-1) * 100;
  if (who.getxp() >= needed) {
    return 1;
  }
  return 0;
}

function SetBandAggro(band, map) {
  let npcs = map.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getNPCBand() === band) {
      npcs[i].setAggro(1);
    }
  }
}

function StepOrDoor(who, where, nopush) {
  let whomap = who.getHomeMap();
  let tile = whomap.getTile(where[0],where[1]);
  if (tile !== "OoB") {
    let fea = tile.getTopFeature();
    if (fea && !(MOVE_WALK & fea.getPassable()) && who.specials["open_door"] && ((who.currentActivity !== "WaitHere") || (who.getCurrentAI() !== "scheduled"))) {
      // if there is a feature, that blocks movement, while I can open doors and am not randomwalking
      if (fea.closedgraphic) {
        // Destination tile has a door
        if (!((typeof fea.getLocked === "function") && (fea.getLocked()))) {
          // door is not locked    
          if (!fea.open) {
            // Door is not open- opening
            DebugWrite("ai", "opening a door in StepOrDoor.<br />");
            MakeUseHappen(who,fea,"map");
            if (GetDistance(fea.getx(),fea.gety(),PC.getx(),PC.gety(),"square") <= 5) {
              DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
            } 
            let moved = {canmove:0, opendoor:2, fin:1, diffx: where[0]-who.getx(), diffy: where[1]-who.gety() };
            return moved;  // opened a door, didn't take a step
          }
        }
      } 
    }
    let diffx = where[0] - who.getx();
    let diffy = where[1] - who.gety();
    let moved = who.moveMe(diffx,diffy);
    if (moved["canmove"]) { 
      DebugWrite("ai", "moved in StepOrDoor.<br />");
    } else {
      DebugWrite("ai", "didn't move in StepOrDoor.<br />");
      if (!nopush && fea && who.specials["open_door"]) {
        // If you can open a door, you can move a barrel.
        if (!tile.getTopNPC() && !tile.getTopPC()) {      
          let allfea = tile.getFeatures();
          let pushyou;
          for (let i=0;i<allfea.length;i++) {
            if (allfea[i].pushable) {
              if (!pushyou) { pushyou = allfea[i]; }
              else {
                if (!(allfea[i].getPassable & who.getMovetype())) {
                  pushyou = allfea[i];
                }
              }
            }
          }
          if (pushyou) {
            pushyou.pullMe(who);
          }
        }
      }
    }
    return moved;
  }
  // step was off the map somehow, returning can't move
  return {canmove: 0 };
}

function StepOrSidestep(who, path, finaldest, nopush) {
  DebugWrite("ai", "In StepOrSideStep...");
  let moved = StepOrDoor(who,path,nopush);
  if (!moved["canmove"] && !moved["opendoor"]) {
    DebugWrite("ai", " !canmove and !opendoor, trying here.");

    if ((who.getCurrentAI() === "scheduled") && (who.currentActivity === "RouteTo")) {
      let tile = who.getHomeMap().getTile(path[0],path[1]);
      let topentity = tile.getTop();
      if (topentity.checkType("pc") || topentity.checkType("npc")) {
        if (who.pushing === topentity.getSerial()) {
          delete who.pushing;
          if ((path[0] === finaldest[0]) && (path[1] === finaldest[1])) {
            // PC or NPC is on last step of path, no point to pushing through  -- consider if I want to change this for NPC
            let fea = tile.getTopFeature();
            if (fea && ((fea.getName() === "BedHead") || ((fea.getName() === "DoubleBedHead") && (topentity.checkType("pc"))))) {
              // PC is in your bed. Kick them out. Hopefully this never comes up with an NPC. If it does, though, kick them out too if it's a single bed
              npctile = who.getHomeMap().getTile(who.getx(),who.gety());
              topentity.getHomeMap().moveThing(who.getx(),who.gety(),topentity);
              tile.executeWalkoffs(topentity);
              npctile.executeWalkons(topentity);
              who.getHomeMap().moveThing(path[0],path[1],who);
              npctile.executeWalkoffs(who);
              tile.executeWalkons(who);
              moved["canmove"] = 1;
              if (topentity === PC) {
                maintext.delayedAddText(who.getFullDesc() + " pushes you out of their bed.");
                DebugWrite("ai", "Kicked PC out of bed.<br />");
                moved["intoPC"] = 1; // dunno if I'll want this, but might as well
              }
              return moved;
            } else if (fea && (fea.getName() === "DoubleBedHead")) { // joining an NPC in bed
              if (fea.checkForSpace()) {
                who.getHomeMap().moveThing(path[0],path[1],who);
                tile.executeWalkons(who);
                moved["canmove"] = 1;
                DrawMainFrame(who.getHomeMap(),"draw",PC.getx(),PC.gety());
              } else {
                // bed is, somehow, full
                moved["canmove"] = 0;
              }
              return moved;
            } else {
              // PC is probably in your chair or something. Give up and let them keep it.
              moved["canmove"] = 0;
              moved["intoPC"] = 1;

              return moved;
            }
          } else {
            let fromx = who.getx();
            let fromy = who.gety();
            who.getHomeMap().moveThing(path[0],path[1],who);
            tile.executeWalkons(who);
            // Puts the NPC on the same tile as the player/NPC
            // This is necessary, otherwise the player could still block the NPC's path
            // by standing in front of a closed door. Or, an NPC going the other way down a hallway
            // Will only come up if path is truly blocked
            moved["canmove"] = 1;
            if (topentity === PC) {
              let text = who.getFullDesc() + " steps past you.";
              text = text.charAt(0).toUpperCase() + text.slice(1);
              maintext.addText(text);
              moved["intoPC"] = 1; // dunno if I'll want this, but might as well
            } else {
              if (debug) {
                console.log(who.getNPCName() + " has stepped past " + topentity.getNPCName() + " at (" + who.getx() + "," + who.gety() + "), at " + GetUsableClockTime() + ", on " + who.getHomeMap().getName() + ".");
                EndWaiting(PC,0);
              }
            }

            if (who.getLight()) {
              DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
            } else {
              DrawMainFrame("one",PC.getHomeMap(),fromx,fromy);
            }
            return moved;
          }
        } else { 
          let gridbackup = who.getHomeMap().getPathGrid(MOVE_WALK_DOOR).clone();
          // destination tile must always be walkable.
          gridbackup.setWalkableAt(finaldest[0],finaldest[1],true);
          
          // so must start tile, for some reason
          gridbackup.setWalkableAt(who.getx(),who.gety(),true);

          gridbackup.setWalkableAt(path[0],path[1],false);
          // make PC not walkable, see what path we get now

          let npcs = who.getHomeMap().npcs.getAll();
          for (let i=0;i<npcs.length;i++) {
            if ((npcs[i].getCurrentAI() === "scheduled") && ((npcs[i].currentActivity !== "RouteTo") && (npcs[i].currentActivity !== "ChangeMap"))) {
              // creating a one-time pathmap that makes NPCs who are not currently moving (RouteTo or ChangeMap) impassable
              gridbackup.setWalkableAt(npcs[i].getx(),npcs[i].gety(),false);
            }
          }

          // get path
          let foundpath = finder.findPath(who.getx(),who.gety(),finaldest[0],finaldest[1],gridbackup);

          let oldpath = who.getHomeMap().getPath(who.getx(),who.gety(),finaldest[0],finaldest[1],MOVE_WALK_DOOR);
          if (!foundpath.length || ((foundpath.length - oldpath.length) > 9)) {
        
            who.pushing = topentity.getSerial(); 
            if (debug) { console.log(who.getNPCName() + " is ready to push past " + topentity.getNPCName() + " at (" + topentity.getx() + "," + topentity.gety() + ") on " + topentity.getHomeMap().getName() + " at " + GetUsableClockTime() + "."); }
            topentity.pushed = 1;
            return moved;
          } else {
            console.log(who.getNPCName() + " bumped into " + topentity.getNPCName() + " but is going to try to sidestep.");
          }
        }
      }
    }
    delete who.pushing;
    let diffx = path[0] - who.getx();
    let diffy = path[1] - who.gety();
    let fullx = finaldest[0] - who.getx();
    let fully = finaldest[1] - who.gety();

    let RandomwalkPassthrough = function(npc,dx,dy) {
      let themap = npc.getHomeMap();
      let tdiffx = npc.getx()+dx;
      let tdiffy = npc.gety()+dy;
      let newtile = [themap.getTile(tdiffx,tdiffy)];
      if (npc.attachedLocations) {
        for (let k=0;k<npc.attachedLocations.length;k++) {
          let atile = themap.getTile(tdiffx+npc.attachedLocations[k][0],tdiffy+npc.attachedLocations[k][1]);
          newtile.push(atile);
        }
      }
      let retval = {};
      for (let k=0;k<newtile.length;k++) {
        if (newtile[k].isHostileTo(npc) || newtile[k].noWander()) {
          retval["nomove"] = 1;
          retval["canmove"] = 0;
          retval["diffx"] = diffx;
          retval["diffy"] = diffy;
        }
      }
      if (!retval.nomove) {
        retval = npc.moveMe(dx,dy,1);
      }
      return retval;
    }

    if (diffx !== 0) {
      if (fully > 0) { 
        moved = RandomwalkPassthrough(who,0,1);
        if (!moved["canmove"]) { moved = RandomwalkPassthrough(who,0,-1); } 
      }
      else if (fully < 0 ) { 
        moved = RandomwalkPassthrough(who,0,-1);
        if (!moved["canmove"]) { moved = RandomwalkPassthrough(who,0,1); } 
      }
      else { 
        let parity = 1;
        if (Dice.roll("1d2") === 1) { 
          parity = -1;
        }
        moved = RandomwalkPassthrough(who,0,parity); 
        if (!moved["canmove"]) { moved = RandomwalkPassthrough(who,0,-1*parity); }
      }
    } else {
      if (fullx > 0) { 
        moved = RandomwalkPassthrough(who,1,0); 
        if (!moved["canmove"]) { moved = RandomwalkPassthrough(who,-1,0); }
      }
      else if (fullx < 0) { 
        moved = RandomwalkPassthrough(who,-1,0);
        if (!moved["canmove"]) { moved = RandomwalkPassthrough(who,1,0); } 
      }
      else {
        let parity = 1;
        if (Dice.roll("1d2") === 1) {
          parity = -1;
        } 
        moved = RandomwalkPassthrough(who,parity,0);
        if (!moved["canmove"]) { moved = RandomwalkPassthrough(who,-1*parity,0); }
      }
    }
  } else { delete who.pushing; }

  DebugWrite("ai", "<br />");
  return moved;
}

function IsNonLiving(who) {
  if (who.specials.undead || who.specials.construct || who.specials.noact) { return 1;}
  return 0;
}

function ShowTurnFrame(who) {
  let framegraph = "turn-frame-friendly.gif";
  if (who.getAttitude() === "hostile") { framegraph = "turn-frame-enemy.gif"; }

  let coords = getCoords(who.getHomeMap(),who.getx(),who.gety());
  let turnframe = document.getElementById('turnframe');
  turnframe.style.left = coords.x+16;
  turnframe.style.top = coords.y+16;
  turnframe.src = "graphics/frame/"+framegraph;
  turnframe.style.display = "block";

  who.hasFrame = 1;
}

function MoveTurnFrame(who) {
  let coords = getCoords(who.getHomeMap(),who.getx(),who.gety());
  document.getElementById('turnframe').style.left = coords.x+16;
  document.getElementById('turnframe').style.top = coords.y+16;
}

function HideTurnFrame(who) {
  document.getElementById('turnframe').style.display = "none";

  if (who) {
    delete who.hasFrame;
  }
}

function FindNPCByName(findname, map) {
  let npcs = map.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getNPCName() === findname) { return npcs[i];}
  }
  return 0;
}

function SayNear(sayx,sayy,saymap,saywhat) {
  if (PC.getHomeMap() === saymap) {
    if (GetDistance(sayx,sayy,PC.getx(),PC.gety()) <= 5) {
      maintext.addText(saywhat);
    }
  }
}

function WhereIs(npcname) {
  let npc;
  for (let idx in maps.data) {
    let val = maps.data[idx];
    let mapnpcs = val.npcs.getAll();
    for (let i=0;i<mapnpcs.length;i++) {
      if (mapnpcs[i].getNPCName() === npcname) {
        npc = mapnpcs[i];
      }
    }
  }
  return npc.getLocation();
}

function FindEmptyAdjacent(who, randompick) {
  let coordopts = [];
  let themap = who.getHomeMap();
  for (let i=-1;i<=1;i++) {
    for (let j=-1;j<=1;j++) {
      let gx = who.getx()+i;
      let gy = who.gety()+j;
      let acre = themap.getTile(gx,gy);
      if (acre === "OoB") { continue; }
      if (!acre.getTopFeature() && !acre.getTopNPC()) {
        if ((PC.getx() !== gx) || (PC.gety() !== gy)) {
          coordopts.push([gx,gy]);
        }
      }
    }
  }
  if (randompick) {
    if (coordopts.length) {
      let dieroll = Dice.roll(`1d${coordopts.length}-1`);
      return coordopts[dieroll];
    } else {
      return [];
    }  
  } else {
    return coordopts;
  }
}

function CheckAreEnemies(who1,who2) {
  if (who1.getName() === "NegatorGnomeNPC") { return 0; }
  if (who2.getName() === "NegatorGnomeNPC") { return 0; }
  if ((who1.getAttitude() === "friendly") && (who2.getAttitude() === "hostile")) { return 1; }
  if ((who2.getAttitude() === "friendly") && (who1.getAttitude() === "hostile")) { return 1; }
  if ((who1.getAttitude() === "ally") && (who2.getAttitude() === "enemy")) { return 1; }
  if ((who2.getAttitude() === "ally") && (who1.getAttitude() === "enemy")) { return 1; }
  return 0;
}

function DoArchaemon(who) {
  if (who.spoken === 3) { return; }
  if (who.justspoke) { delete who.justspoke; return; }
  if (Dice.roll("1d100") <= 35) {
    if (IsVisibleOnScreen(who.getx(),who.gety())) {
      if (!who.spoken) { 
        if (who.specials.archdaemon_ashes) { maintext.addText('The great daemon speaks. "Tremble, mortal. You face Kayora, Flayer of Stars. My darkness will be the last thing that you see."'); }
        if (who.specials.archdaemon_dust) { maintext.addText('The huge daemon opens its mouth. "Ah, little firefly, you have come at last. Hail, and farewell."'); }
        if (who.specials.archdaemon_ice) { maintext.addText('A voice speaks in your head: "Ith\'Kynian, the Silent Void, comes for you now."'); }
        if (who.specials.archdaemon_bone) { maintext.addText('In a harsh voice, the daemon speaks. "Begone, mortal. You stand before Khar-Ebbeth, Death\'s Harbinger."'); }
        who.spoken=1;
        who.justspoke = 1;
      } else if (who.spoken === 1) {
        if (who.specials.archdaemon_ashes) { maintext.addText('"Soon, we will breach the surface. There, I will put out every point of light in your sky."'); }
        if (who.specials.archdaemon_dust) { maintext.addText('"I am Kassotar, Unmaker of Dawn. The sun itself trembles before me."'); }
        if (who.specials.archdaemon_ice) { maintext.addText('In your head, icy cold and poisonous: "It has been scores of millennia since we have been imprisoned. But some of us... remember the light. And we hate you for having it.'); }
        if (who.specials.archdaemon_bone) { maintext.addText('"Those who came before you strove to make gods out of light and stone. But we have always been here in the dark. We are why they are no more."'); }
        who.spoken=2;
        who.justspoke = 1;
      } else if (who.spoken === 2) {
        let numb = GetNumberBeacons();
        if (numb === 1) { maintext.addText('"Your tiny pinprick will not pierce our darkness."'); }
        else if (numb === 2) { maintext.addText('"Why do you bring light here, little one? What do you think you can do with it?"'); }
        else if (numb === 3) { maintext.addText('"Your light begins to annoy, we will admit. But nothing more, and that is all it shall ever be."'); }
        else if (numb === 4) { maintext.addText('"Why do you persist? This underland has never been so bright. When I tear you limb from limb, I will put out your lights."'); }
        who.spoken = 3;
        who.justspoke = 1;
      }
      
    }
  }
}
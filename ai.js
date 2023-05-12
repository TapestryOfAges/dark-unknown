
"use strict";

let ais = {};

ais.doNothing = function(who) {
  return { fin:1 };
}

ais.seekPC = function(who,radius) {
  // name is legacy- really it's "seek an opponent"
  DebugWrite("ai", "Seeking PC (or just someone to punch)...<br />");
  if (radius === 0) { return {fin:1 } }
  let foe;
  let whomap = who.getHomeMap();
  let npcs = whomap.npcs.getAll();
  npcs.unshift(PC);
  for (let i=0;i<npcs.length;i++) {
    foe = npcs[i];
    if (CheckAreEnemies(who,foe)) {
      if (whomap === foe.getHomeMap()) {
        if (GetDistance(who.getx(),who.gety(),foe.getx(),foe.gety()) <= radius) {
          // if can see
          let losresult = whomap.getLOS(who.getx(), who.gety(), foe.getx(), foe.gety());
          if ((losresult < LOS_THRESHOLD) || (who.getMovetype() & MOVE_ETHEREAL)) {  // can automatically see if can move ethereal
            DebugWrite("ai", "SeekPC: Nearby and can see the an enemy (" + foe.getName() + ")! Aggroing.<br />");
            // Go aggro, turn team aggro if part of a band
            if (who.getNPCBand()) {
              SetBandAggro(who.getNPCBand(), who.getHomeMap());
            } else {
              who.setAggro(1);
            }
            return {fin:1};
          }
        }
      }    
    }
  }
  if (who.specials.wander) {
    let moveval = ais.Randomwalk(who,25,25,25,25);
  } else if (who.summoned) {
    let summoner = who.getSpawnedBy();
    if (whomap === summoner.getHomeMap()) {
//      if (!IsAdjacent(who,who.getSpawnedBy())) {
      if (GetDistance(who.getx(),who.gety(),summoner.getx(),summoner.gety(),"square") > 2) {
        let path = whomap.getPath(who.getx(),who.gety(),summoner.getx(),summoner.gety(),who.getMovetype());
        path.shift();
        let moved = StepOrSidestep(who,path[0],[who.startx, who.starty]);
        if (!moved) {
          let moveval = ais.Randomwalk(who,25,25,25,25);
        }
      }
    }
  } else if (!who.specials.stationary && (whomap === PC.getHomeMap())) {
    if ((who.getx() !== who.startx) || (who.gety() !== who.starty)) {
      DebugWrite(ai, "Seek PC: Can't see PC, heading home.<br />");
      // isn't at home, doesn't see PC, heads home
      let path = whomap.getPath(who.getx(),who.gety(),who.startx,who.starty,who.getMovetype());
      path.shift();
      let moved = StepOrSidestep(who,path[0],[who.startx, who.starty]);
      if (!moved) {
        let moveval = ais.Randomwalk(who,25,25,25,25);
      }
    }
  }
  return {fin:1};
}

ais.combat = function(who) {
  if (who.special.miniboss) {
    return ais[who.getCurrentAI()](who);
  }
  let retval = {fin:1};
  let whomap = who.getHomeMap();
  let whox = who.getx();
  let whoy = who.gety();
  
  DebugWrite("ai", "<span style='font-weight:bold'>In Combat AI...</span><br />");
 
  let nearest = FindNearestNPC(who, "enemy");
  if (whomap !== PC.getHomeMap()) {
    if (!nearest) {
    // what happens if the PC is on another map?
      DebugWrite("ai", "On a different map, waiting...<br />");
      who.wait++;
      if (who.wait > 30) {
        DebugWrite("ai", "Waited long enough, dropping aggro.<br />");
        who.setAggro(0);
      }
      return retval; 
    } 
  }
  
  // check to see if we should cease to aggro
  // need no one in your Band be within "forgetAt" radius
  if (who.getForgetAt() && (nearest > who.getForgetAt())) {
    let npcs = whomap.npcs.getAll();
    let anysee = 0;
    for (let i=0;i<npcs.length;i++) {
      if (!anysee && (who.getNPCBand() === npcs[i].getNPCBand()) && (FindNearestNPC(npcs[i],"enemy") < npcs[i].getForgetAt())) {
        anysee = 1;
      }
      if (!npcs[i].getForgetAt()) { anysee = 1; }
    }
    if (!anysee) {
      DebugWrite("ai", "Distant, and no one in the band can see enemies- dropping aggro.<br />");
      who.setAggro(0);
      return retval;
    }
  }
  
  if (!who.specials.noflee && !who.specials.undead && !who.specials.construct && !who.specials.mindless && !who.specials.tempbrave && (who.getHP() < .15*who.getMaxHP()) && (Dice.roll("1d2") === 1)) {
    // 50/50 chance each turn at 15% of life of dropping it all and fleeing
    DebugWrite("ai", "Too wounded, becoming a coward.<br />");
    // consider making this a check of some kind
    who.specials.coward = 1;
    who.specials.canbebrave = 1; // things that start out as cowards can't decide to stop being cowards
  }
  
  if (who.specials.coward || ((Dice.roll("1d100") < who.withdraw) && IsAdjacent(who,nearest))) {
    if (who.specials.coward) {
      // run away! run away!
      DebugWrite("ai", "Running away!<br />");
    } else {
      DebugWrite("ai", "Backing away.<br />");
    }
    let diffx = whox - nearest.getx();
    let diffy = whoy - nearest.gety();
    
    let rundest = [];
    let pathdest = [];
    let coin = Dice.roll("1d2");
    if ((Math.abs(diffx) > Math.abs(diffy)) || ((coin === 1) && (Math.abs(diffx) === Math.abs(diffy)))) {
      if (diffx > 0) {
        pathdest = [whox+1,whoy];
        rundest = [whomap.getWidth()-1,whoy];
      } else {
        pathdest = [whox-1,whoy];
        rundest = [0,whoy];
      }
    } else {
      if (diffy > 0) {
        pathdest = [whox,whoy+1];
        rundest = [whox,whomap.getHeight()-1];
      } else {
        pathdest = [whox,whoy-1];
        rundest = [whox,0];
      }
    }
    let desttile = whomap.getTile(pathdest[0],pathdest[1]);
    if (desttile === "OoB") {
      if (whomap.ExitTest(who)) {
        whomap.deleteThing(who);
        DUTime.removeEntityFrom(who);
        who.fled = 1;
        if (PC.getHomeMap() === whomap) {
          DrawMainFrame("draw", whomap, PC.getx(), PC.gety());
        }
        return retval;
      }
    } else {
      let trymove = StepOrSidestep(who,pathdest,rundest);
    }
    
    if (who.specials.canbebrave && (Dice.roll("1d5") === 1)) {
      // 20% chance each turn that a coward who didn't start cowardly will return to the fight
      DebugWrite("ai", "Has become brave again!");
      delete who.specials.coward;
      delete who.specials.canbebrave;
      who.specials.tempbrave = 1;
      // this last special marks them as not being able to become a coward again
    }
    return retval;
  }
  // whoo boy, here we are: still aggro, still on right map. Go!

  if (who.specials.archdaemon_ice || who.specials.archdaemon_dust || who.specials.archdaemon_ashes || who.specials.archdaemon_bone) {
    DoArchdaemon(who);
  }

  // decide if meleeing/approaching
  let chance = who.meleeChance;
  DebugWrite("ai", "Chance of melee: " + chance + ".<br />");
  let roll = Dice.roll("1d100");
  if (roll > chance) {
    // Not meleeing, now what?
    DebugWrite("ai", "In special/missile<br />");
    let nonmeleeoptions = [];
    if (who.getMissile()) { nonmeleeoptions.push("ai_missile"); }   
    if (who.spellsknown) { nonmeleeoptions.push("ai_cast"); }  // needs work
    if (who.specials.sing) { nonmeleeoptions.push("ai_sing"); }
    if (who.specials.firebreath) { nonmeleeoptions.push("ai_firebreath"); }  
    if (who.specials.icebreath) { nonmeleeoptions.push("ai_icebreath"); }  
    if (who.specials.whirlpool) { nonmeleeoptions.push("ai_whirlpool"); }  
    if (who.specials.breedsexplosively) { nonmeleeoptions.push("ai_breed"); }
    if (who.specials.animalhandler) { nonmeleeoptions.push("ai_handle"); }  
    if (who.specials.spitter) { nonmeleeoptions.push("ai_spit"); }  
    if (who.specials.lbolt) { nonmeleeoptions.push("ai_lbolt"); }  
    if (who.specials.magmaheal) { nonmeleeoptions.push("ai_magmaheal"); }  
    if (who.specials.magmaspit) { nonmeleeoptions.push("ai_magmaspit"); }  
    if (who.specials.teleport) { nonmeleeoptions.push("ai_teleport"); }  // needs work
    if (who.specials.energybolt) { nonmeleeoptions.push("ai_energybolt"); }  
    if (who.specials.phase) { nonmeleeoptions.push("ai_phase"); }  
//    if (who.specials.multiattack) { nonmeleeoptions.push("ai_multiattack"); }  // needs work- what was this going to be?
    if (who.specials.summonearthelemental) { nonmeleeoptions.push("ai_summonearthelemental"); }  
    if (who.specials.necromancer) { nonmeleeoptions.push("ai_necromancer"); }  
    if (who.specials.sleep) { nonmeleeoptions.push("ai_sleep"); }  

    // there will be more!
    // eventually make this choice smarter
    if (nonmeleeoptions.length === 0) { roll = 0; } 
    else {
      let performed_action = 0;
      let num_attempts = 0;
      while (!performed_action && (num_attempts < 10)) {
        performed_action = ais[nonmeleeoptions[Dice.roll("1d" + nonmeleeoptions.length + "-1")]](who);
        num_attempts++;
      }
      if (!performed_action && (num_attempts === 10)) {
        DebugWrite("ai", "10 tries, " + who.getName() + " (" + who.getSerial() + ") failed to choose a special action.");
        roll = 0;  // pretend we rolled intent to melee, because we failed to find anything else to do
      }
    
      if ((performed_action === "melee") || (performed_action === "missile") || (performed_action === "special_wait")) {
        retval["wait"] = 1;
        return retval;
      }
    }

  }
  if (roll <= chance) {
    // yes
    //now find targets
    // top priority: adjacent foes
    DebugWrite("ai", "Chosen to melee/approach!<br />");
    let melee = TryMelee(who);
    if (melee) { 
      retval["wait"] = 1;
      return retval; 
    }
    // didn't melee anything, time to try to find something to approach

    if (!nearest) {
      DebugWrite("ai", "How do I (" + who.getName() + " (" + who.getx() + "," + who.gety() + ")) not have a nearest enemy while still aggro?");
      who.setAggro(0); // no enemies abound
      return retval;
    }
    DebugWrite("ai", "Nearest enemy is: " + nearest.getName() + " " + nearest.getSerial() + " .<br />");
    let others = FindNearby("npcs",nearest.getHomeMap(),1,"square",nearest.getx(),nearest.gety());
    let count = 0;
    for (let i=0;i<others.length;i++){
      if (others[i].getAttitude() === who.getAttitude()) { count++; }
    }

    DebugWrite("ai", "It is already fighting " + count + " of my friends.<br />");
    let oldapproach;
    if (count >= 3) {
      // there's enough people beating on the closest, head towards someone else if there is one
      DebugWrite("ai", "That's plenty- looking for another target.<br />");
      newapproach = FindNearestNPC(who,"enemy",[nearest]);
      if (newapproach) { 
        DebugWrite("ai", "Found another target: " + newapproach.getName() + " " + newapproach.getSerial() + " .<br />");
        oldapproach = nearest;
        nearest = newapproach; 
      } else {
        DebugWrite("ai", "No other target found- sticking with current target.<br />");
      }
    }
    if (nearest) {
      let movetype = who.getMovetype();
      if (who.specials.open_door) { movetype = MOVE_WALK_DOOR; }  // note, currently this is a problem if it can fly and open doors
      let path = whomap.getPath(who.getx(), who.gety(), nearest.getx(), nearest.gety(),movetype);
      if (!path.length) {
        if (oldapproach) {
          nearest = oldapproach;
          path = whomap.getPath(who.getx(), who.gety(), nearest.getx(), nearest.gety(),movetype);
        }
      }
      if (path.length) { 
        let moved = FindCombatPath(who,nearest,path);
      } else {
        // no path found to target
        // Might need more work here but there is now code to prevent walking entirely away from the PC when randomwalking
        let north = 25;
        let south = 25;
        let east = 25;
        let west = 25;
        const BALKDIST = .4;
        if (GetDistance(who.getx(),who.gety()-1,PC.getx(),PC.gety()) - GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) > BALKDIST) { north = 0; DebugWrite("ai","Will not walk north- moves away from PC."); }
        if (GetDistance(who.getx(),who.gety()+1,PC.getx(),PC.gety()) - GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) > BALKDIST) { south = 0; DebugWrite("ai","Will not walk south- moves away from PC.");}
        if (GetDistance(who.getx()+1,who.gety(),PC.getx(),PC.gety()) - GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) > BALKDIST) { east = 0; DebugWrite("ai","Will not walk east- moves away from PC.");}
        if (GetDistance(who.getx()-1,who.gety(),PC.getx(),PC.gety()) - GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) > BALKDIST) { west = 0; DebugWrite("ai","Will not walk west- moves away from PC.");}
        let moved = ais.Randomwalk(who,north,east,south,west);
      }
    }
  }  
  return retval;
  
}

function TryMelee(who) {
  DebugWrite("ai", "In TryMelee.<br />");
  let radius = 1;
  if (who.specials.reach) { radius = 2; }
  let whomap = who.getHomeMap();
  let nearby = FindNearby("npcs",whomap,radius,"box",who.getx(),who.gety());
  let atked = 0;
  DebugWrite("ai", "Seeking entities in melee range. There are " + nearby.length + ".<br />");
  if (nearby.length > 0) {
    ShuffleArray(nearby);
    for (let i=0;i<nearby.length;i++) {
      if (!atked) {
        if (CheckAreEnemies(nearby[i],who)) {
          let doatk = 1;
          if (radius > 1) { 
            // check LOE first
            if (whomap.getLOS(who.getx(), who.gety(), nearby[i].getx(), nearby[i].gety(), "loe") >= LOS_THRESHOLD) { doatk = 0; }
          }
          // attack them and call it a day!
          if (doatk) {
            if (who.getSpellEffectsByName("Phased")) { who.getSpellEffectsByName("Phased").endEffect(); } 
            DebugWrite("ai", "ATTACK!<br />");
            let result = Attack(who,nearby[i]);
            maintext.addText(result["txt"]);
            atked = 1;
          }
        }
      }
    }
  }
  return atked;
}

ais.segment = function(who) {
  let retval = {};
  retval["fin"] = 1;
  return retval;
}

// deprecated in favor of schedules.
ais.townsfolk = function(who) {
  let retval = {};
  retval["fin"] = 1;
  
  if (!(who.startx && who.starty)) {
    DebugWrite("ai", "WARNING: missing startx or starty. Setting to current position...");
    who.startx = who.getx();
    who.starty = who.gety();
    alert(who.getName() + " WARNING: missing startx or starty. Setting to current position...");
  }
  var themap = who.getHomeMap();
  if (who.pushed || (Dice.roll("1d4") === 1)) {   // 25% chance of moving, slow wander
                                                  // automatically wanders if was pushed
    DebugWrite("ai", "Moving... ");
    if (who.getLeash() && (who.getLeash() < GetDistance(who.getx(), who.gety(), who.startx, who.starty))) {
      let path = themap.getPath(who.getx(),who.gety(),who.startx, who.starty, MOVE_WALK_DOOR);
      path.shift();  // first entry in the path is where it already stands
      if (path[0]){
        DebugWrite("ai", "Moving to " + path[0][0] + "," + path[0][1] + ".<br />");
        StepOrSidestep(who, path[0], [who.startx, who.starty]);
        return retval;
      } else {
        DebugWrite("ai", "Leashed and outside leash, but no path home.<br />");
      }
    } else if (who.getLeash()) {
      // able to wander (leash = 0 means stationary)
      let moveval = ais.Randomwalk(who,25,25,25,25);
      if ((moveval["canmove"] === 0) && (retval["nomove"] !== 1)) {
        // it picked a direction to move but failed to move        
      }
    }
  }
  // townsfolk don't do anything else
  return retval;
}

ais.Sam_escape = function(who) {
  let retval = { fin:1 };
  let themap = who.getHomeMap();
  if ((who.getx() === 7) && (who.gety() === 9)) {
    themap.deleteThing(who);
    DUTime.removeEntityFrom(who);
    DrawMainFrame("one",themap,7,9);
    return retval;
  }
  let path = themap.getPath(who.getx(), who.gety(), 7, 9, MOVE_WALK_DOOR);
  path.shift();
  if (path[0]) {
    StepOrSidestep(who,path[0],7,9);
  }
  return retval;
}

ais.Trevor = function(who) {
  let retval = {};
  retval["fin"] = 1;
  if (DU.gameflags.getFlag("kyvek_fetch")) {
    if (!who.steps) {
      let walk = who.moveMe(1,0);
      if (walk["canmove"]) {
        who.steps = 1;
      }
    } else if (who.steps === 1) {
      let walk = who.moveMe(0,-1);
      if (walk["canmove"]) {
        who.steps = 1.5;
      }      
    } else if (who.steps === 1.5) {
      let doortile = who.getHomeMap().getTile(9,14);
      let door = doortile.getTopFeature();
      door.unlockMe();
      DrawMainFrame("one",who.getHomeMap(),9,14);
      who.steps = 2;
    } else if (who.steps === 2) { 
      let doortile = who.getHomeMap().getTile(9,14);
      let door = doortile.getTopFeature();
      door.use(who);
      DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
      who.steps = 3;
    } else if ((who.steps >= 3) && (who.steps <= 5)) {
      let walk = who.moveMe(0,-1);
      if (walk["canmove"]) {
        who.steps++;
      }
    } else if (who.steps === 6) {
      let walk = who.moveMe(1,0);
      if (walk["canmove"]) {
        who.steps++;
      }
    } else if (who.steps === 7) {
      who.steps++;
    } else if (who.steps === 8) {
      let walk = who.moveMe(-1,0);
      if (walk["canmove"]) {
        who.steps++;
      }
    } else if ((who.steps >= 9) && (who.steps <= 11)) {
      let walk = who.moveMe(0,1);
      if (walk["canmove"]) {
        who.steps++;
      }
    } else if (who.steps === 12) {
      let doortile = who.getHomeMap().getTile(9,14);
      let door = doortile.getTopFeature();
      door.use(who);
      DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
      who.steps++;
    } else if (who.steps === 13) {
      let doortile = who.getHomeMap().getTile(9,14);
      let door = doortile.getTopFeature();
      door.lockMe(2);
      DrawMainFrame("one",who.getHomeMap(),9,14);
      who.steps = 13.5;
    } else if (who.steps === 13.5) {
      let walk = who.moveMe(0,1);
      if (walk["canmove"]) {
        who.steps = 14;
      }      
    } else if (who.steps === 14) {
      let walk = who.moveMe(-1,0);
      if (walk["canmove"]) {
        who.steps++;
      }
    } else if (who.steps > 14) {
      if (who.getHomeMap() === PC.getHomeMap()) {
        if ((PC.getx() >= 8) && (PC.getx() <= 10) && (PC.gety() >= 15) && (PC.gety() <= 19)) {
          maintext.addText("Trevor hands you a wooden box, sealed with wax. \"Give this to Kyvek and all debts will be paid.\" He makes a mark in his ledger.");
          let box = localFactory.createTile("KyvekBox");
          PC.addToInventory(box,1);
          DU.gameflags.deleteFlag("kyvek_fetch");
          DU.gameflags.setFlag("given_box",1);
          maintext.addText("<span class='sysconv'>You have obtained: " + box.getFullDesc() + ".</span>");
          who.setCurrentAI("scheduled");
        } else {
          DU.gameflags.deleteFlag("kyvek_fetch");
          DU.gameflags.setFlag("kyvek_fetch_incomplete",1);
          who.setCurrentAI("scheduled");
        }
      } else {
        DU.gameflags.deleteFlag("kyvek_fetch");
        DU.gameflags.setFlag("kyvek_fetch_incomplete",1);
        who.setCurrentAI("scheduled");
      }
    }
  }
  return retval;
}

ais.GarrickAttack = function(who) {
  let retval = {fin:1};
  let themap = who.getHomeMap();
  if (who.getHP() <= 2) { // Unkillable
    maintext.addText('Garrick falls to his knees and cries, "You win!"');
    retval["wait"] = 1;
    maintext.setInputLine("&gt;[MORE]");
    maintext.drawTextFrame(); 
    gamestate.setMode("anykey");
    targetCursor.command = "garrick";
    targetCursor.stage = 0;
    who.setCurrentAI("GarrickEscort");
    who.setHP(10);
    delete who.specials.unkillable;
    who.setAttitude("friendly");
    who.setAggro(0);
    let aoife;
    let npcs = PC.getHomeMap().npcs.getAll();
    for (let i=0;i<npcs.length;i++){
      if (npcs[i].getNPCName() === "Aoife") { aoife = npcs[i]; }
    }
    aoife.setCurrentAI("AoifeEscort");
    aoife.setMaxHP(30);
    aoife.setHP(30);
    delete aoife.specials.unkillable;
    aoife.setAttitude("friendly");
    aoife.setAggro(0);
    return retval;
  } else {
    if (IsAdjacent(who,PC)) {
      retval = Attack(who,PC);
    } else {
      let path = themap.getPath(who.getx(), who.gety(), PC.getx(), PC.gety(), MOVE_WALK_DOOR);
      let moved = FindCombatPath(who,PC,path);
    }
  }
  return retval;
}

function GarrickScene(stage) {
  gamestate.setMode("null");
  let aoife;
  let garrick
  let npcs = PC.getHomeMap().npcs.getAll();
  for (let i=0;i<npcs.length;i++){
    if (npcs[i].getNPCName() === "Aoife") { aoife = npcs[i]; }
    if (npcs[i].getNPCName() === "Garrick") { garrick = npcs[i]; }
  }
  let retval = {};
  if (aoife) {
    if (stage === 0) {
      maintext.addText('Aoife points at Garrick. "All right, you. Will you come quietly, now? You know where you\'re going, after a stunt like that."');
      targetCursor.stage++;
    } else if (stage === 1) {
      maintext.addText('Garrick, broken and defeated, merely nods and staggers to his feet.');
      targetCursor.stage++;
    } else if (stage === 2) {
      maintext.addText('Aoife gazes at him with eyes like flint. "Right. On you go, then."');
      targetCursor.stage++;
    } else if (stage === 3) {
      maintext.addText('She turns to you. "He\'ll get a cell to himself, for a while. You won\'t have to worry about him again." She shakes her head. "Sorry that happened."');
      retval["fin"] = 1;
      retval["garrick"] = garrick;
    }
    return retval;
  } else {
    // what should we do if Aoife is dead somehow? Only real way is if PC attacked her, in which case town has turned on them anyway.
    retval["fin"] = 1;
    return retval;
  }
}

ais.AoifeAttack = function(who) {
  let retval = {};
  retval["fin"] = 1;
  let aoifemap = who.getHomeMap();
  let npcs = aoifemap.npcs.getAll();
  let garrick;
  for (let i=0;i<npcs.length;i++){
    if (npcs[i].getNPCName() === "Garrick") { garrick = npcs[i]; }
  }
  if (garrick) {
    if(IsAdjacent(who,garrick)) {
      retval = Attack(who,garrick);
    } else {
      let path = aoifemap.getPath(who.getx(), who.gety(), garrick.getx(), garrick.gety(), MOVE_WALK_DOOR);
      let moved = FindCombatPath(who,garrick,path);
    }
  } else {
    alert("Where'd Garrick go?");
  }
  return retval;
}

ais.AoifeEscort = function(who) {
  if (!who.dest) { who.dest = 1; }
  let retval = {};
  retval["fin"] = 1;
  let themap = who.getHomeMap();
  let gx = who.getx();
  let gy = who.gety();
    
  let path;
  let pathfound;
  while (!pathfound) {
    if (who.dest === 1) {
      path = themap.getPath(gx, gy, 24, 23, MOVE_WALK_DOOR);
    } else if (who.dest === 2) {
      let doortile = themap.getTile(gx-1,gy);
      let door = doortile.getTopFeature();
      door.unlockMe();
      who.dest++;
      return retval;
    } else if (who.dest === 3) {
      path = themap.getPath(gx, gy, 14, 23, MOVE_WALK_DOOR);
    } else if (who.dest === 4) {
      let doortile = themap.getTile(gx,gy+1);
      let door = doortile.getTopFeature();
      door.unlockMe();
      who.dest++;
      return retval;
    } else if (who.dest ===5) {
      StepOrDoor(who,[gx-1,gy]);
      who.dest++;
      return retval;
    } else if (who.dest === 6) {
      let npcs = who.getHomeMap().npcs.getAll();
      let garrick;
      for (let i=0;i<npcs.length;i++) {
        if (npcs[i].getNPCName() === "Garrick") { garrick = npcs[i]; }
      }
      if ((garrick.getx() >= 13) && (garrick.getx()<=15) && (garrick.gety() >= 25) && (garrick.gety() <= 27)) {
        who.dest++;
      }
      return retval;
    } else if (who.dest === 7) {
      StepOrDoor(who,[gx+1,gy]);
      who.dest++;
      return retval;
    } else if (who.dest === 8) {
      let doortile = themap.getTile(14,24);
      let door = doortile.getTopFeature();
      door.use(who);
      DrawMainFrame("one",who.getHomeMap(),6,53);
      door.lockMe(1);
      who.setCurrentAI(who.getPeaceAI());
      DU.gameflags.setFlag("garrick_jailed",1);
      return retval;      
    }
    path.shift();
    if (!path[0]) { who.dest++; }
    else { pathfound = 1; }
  }
  
  // step on the path
  // check for mob, if mob, try to move in the perpendicular direction that gets you closer to your current dest
  let moved = StepOrSidestep(who, path[0], [14,23]);
  
  return retval;
}

ais.GarrickEscort = function(who) {
  let retval = {fin:1};
  let themap = who.getHomeMap();
  let npcs = themap.npcs.getAll();
  let aoife;

  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getNPCName() === "Aoife") { aoife = npcs[i];}
  }

  let destx = aoife.getx();
  let desty = aoife.gety();

  if ((who.getx() === 14) && (who.gety() === 25)) { 
    who.setSchedule("garrickImprisoned");
    who.setCurrentAI("scheduled");
    who.setCurrentScheduleIndex(0);
    return retval;
  }
  if (aoife.getx() <= 14) {
    destx = 14;
    desty = 26;
  }
  let path = themap.getPath(who.getx(), who.gety(), destx, desty, MOVE_WALK_DOOR);
  path.shift();
  path.pop();
  if (path[0]) {
    StepOrSidestep(who,path[0],[14,26]);
  } else {
    if (Dice.roll("1d8") === 1) {
      SayNear(aoife.getx(),aoife.gety(),aoife.getHomeMap(),'Aoife says, "Come on, let\'s go."');
    }
  }
  return retval;
}

ais.Isaac_initiate = function(who) {
  let themap = who.getHomeMap();
  if (!who.dest) { who.dest = 1; }
  if (who.dest === 1) {
    let thepath = themap.getPath(who.getx(),who.gety(),57,47,MOVE_WALK_DOOR);
    thepath.shift();
    if (thepath[0]) {
      StepOrSidestep(who,thepath[0],[57,47]);
    } else {
      who.dest++;
    }
  } else if (who.dest === 2) {
    // Add 4 paladins to floor 2: Skar, Linley, Yelena, and Amaeryl (56-59,51)
    // then add a walkon just at the top of the stairs where Isaac bids you sit beside him
    // add two walkons in the seats on either side of him that trigger the ceremony. 
    let swain2 = maps.getMap("swainhil2");
    let yelena = localFactory.createTile("PaladinVillagerNPC");
    yelena.setGraphic("307.gif"); // WORKING HERE - replace in newart branch
    yelena.skintone = 1;
    yelena.setConversation("yelena_initiation");
    yelena.setNPCName("Yelena");
    let amaeryl = localFactory.createTile("PaladinVillagerNPC");
    amaeryl.setGraphic("307.2.gif");
    amaeryl.skintone = 2;
    amaeryl.setConversation("amaeryl_initiation");
    amaeryl.setNPCName("Amaeryl");
    let skar = localFactory.createTile("PaladinVillagerNPC");
    skar.setGraphic("307.2.gif");
    skar.skintone = 2;
    skar.setConversation("skar_initiation");
    skar.setNPCName("Urskar");
    let linley = localFactory.createTile("PaladinVillagerNPC");
    linley.setGraphic("paladin-offcolor.gif");
    linley.skincolor = 1;
    linley.setConversation("linley_initiation");
    linley.setNPCName("Linley");
    swain2.placeThing(56,51,yelena);
    swain2.getTile(56,51).executeWalkons(yelena);  
    swain2.placeThing(57,51,amaeryl);
    swain2.getTile(57,51).executeWalkons(amaeryl);  
    swain2.placeThing(58,51,skar);
    swain2.getTile(58,51).executeWalkons(skar);
    swain2.placeThing(59,51,linley);
    swain2.getTile(59,51).executeWalkons(linley);  

    if ((who.getx() !== 57) || (who.gety() !== 47)) { console.log("Isaac is in the wrong place."); }
    let door = themap.getTile(57,48).getTopFeature();
    door.unlockMe();
    MakeUseHappen(who,door,"map");
    who.dest++;
  } else if (who.dest === 3) {
    StepOrSidestep(who,[57,48],[57,48]);
    who.dest++;
  } else if (who.dest === 4) {
    StepOrSidestep(who,[57,49],[57,49]);
    let door = themap.getTile(57,48).getTopFeature();
    MakeUseHappen(who,door,"map");
    door.lockMe(2);
    who.dest++;
  } else if (who.dest === 5) {
    let thepath = themap.getPath(who.getx(),who.gety(),57,57,MOVE_WALK_DOOR);
    thepath.shift();
    if (thepath[0]) {
      StepOrSidestep(who,thepath[0],[57,47]);
    } else {
      who.dest++;
    }
  } else if (who.dest === 6) {
    let swain2 = maps.getMap("swainhil2");
    MoveBetweenMaps(who,who.getHomeMap(),swain2,who.getx(),who.gety());
    who.dest++;
  } else if (who.dest === 7) {
    let thepath = themap.getPath(who.getx(),who.gety(),57,55,MOVE_WALK_DOOR);
    thepath.shift();
    if (thepath[0]) {
      StepOrSidestep(who,thepath[0],[57,47]);
    } else {
      who.dest++;
    }
  } else if (who.dest === 8) {
    let swain2 = maps.getMap("swainhil2");
    let wo1 = localFactory.createTile("WalkOnPaladinInit");
    swain2.placeThing(57,56,wo1);

    let wo2 = localFactory.createTile("WalkOnPaladinInit2");
    swain2.placeThing(56,55,wo2);
    let wo3 = localFactory.createTile("WalkOnPaladinInit2");
    swain2.placeThing(58,55,wo3);

    let swain = maps.getMap("swainhil");
    let door = swain.getTile(57,48).getTopFeature();
    door.unlockMe();
    
    who.dest++;
  }
  let retval = {};
  retval["fin"] = 1;
  return retval;
}

ais.AshardenBook = function(who) {
  if (!who.dest) { who.dest = 1; }
  let retval = {};
  retval["fin"] = 1;
  let themap = who.getHomeMap();
  let gx = who.getx();
  let gy = who.gety();
    
  let path;
  let pathfound;
  while (!pathfound) {
    if (who.dest === 1) {
      path = themap.getPath(gx, gy, 29, 18, MOVE_WALK);
    } else if (who.dest === 2) {
      let tile = themap.getTile(30,18);
      let fea = tile.getFeatures();
      let field;
      for (let i=0;i<fea.length;i++) {
        if (fea[i].getName() === "SleepField") { field = fea[i]; }
      }
      if (field) {
        themap.deleteThing(field);
        maintext.addText("Asharden gestures and the magic field disappears.");
        DrawMainFrame("one",who.getHomeMap(),30,18);
      } 
      who.dest++;
      return retval;
    } else if (who.dest === 3) {
      path = themap.getPath(gx, gy, 32, 18, who.getMovetype());
    } else if (who.dest === 4) {
      maintext.addText("Asharden rummages through his bookshelf.");
      who.dest++;
      return retval;
    } else if (who.dest ===5) {
      if ((PC.getHomeMap() === themap) && (PC.getx() < 35) && (PC.getx() > 13) && (PC.gety() < 21) && (PC.gety() > 14)) {
        path = themap.getPath(gx,gy,PC.getx()+1, PC.gety(), who.getMovetype());
      } else {
        path = themap.getPath(gx,gy,28,18, who.getMovetype()); 
      }
    } else if (who.dest === 6) {
      if (IsAdjacent(who,PC)) {
        maintext.addText("Asharden hands you a spellbook!");
        DU.gameflags.setFlag("spellbook",1);
        DU.gameflags.setFlag("spellbook2",1);
        DU.gameflags.deleteFlag("ash_get_book");
        PC.addSpell(SPELL_AUDACHTA_SCRIBE_LEVEL, SPELL_AUDACHTA_SCRIBE_ID);
        who.setCurrentAI(who.prevai);
        delete who.prevai;
        return retval;
      } else {
        who.dest--;
      }
    }
    path.shift();
    if (!path[0]) { who.dest++; }
    else { pathfound = 1; }
  }
  
  // step on the path
  // check for mob, if mob, try to move in the perpendicular direction that gets you closer to your current dest
  let desttile = themap.getTile(path[0][0],path[0][1]);
  let npcs = desttile.getNPCs();
  if (npcs.length) {
    if (Dice.roll("1d4") === 1) {
      if ((PC.getHomeMap() === who.getHomeMap()) && (GetSquareDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= 5)) {
        maintext.addText('Asharden says, "Excuse me."');
      }
    }
  }
  let moved = StepOrSidestep(who, path[0], [32,18]);
  
  return retval;
}

ais.CourierPath = function(who) {
  let retval = {fin:1};
  let whomap = who.getHomeMap();
  if (!who.direction) { who.direction = "n"; }
  if (who.getx() === 0) {
    if (!who.count) { who.count = 0; }
    if (who.count < 3) { 
      who.count++; 
      DebugWrite("ai","Waiting in town.");
      return retval; 
    }
    
    if (who.direction === "n") {
      let tile = whomap.getTile(48,90);
      let npcs = tile.getNPCs();
      if (!npcs.length) {
        let pcs = tile.getPCs();
        if (!pcs.length) {
          whomap.moveThing(48,90,who);
          who.direction = "s";
          DebugWrite("ai","Exiting Black Dragon Castle, by which I mean teleporting in from the corner.");
        } else { DebugWrite("ai","Didn't come out of BDC- PC in the way."); }
      } else { DebugWrite("ai","Didn't come out of BDC- NPC in the way."); }
    } else {
      let tile = whomap.getTile(63,119);
      let npcs = tile.getNPCs();
      if (!npcs.length) {
        let pcs = tile.getPCs();
        if (!pcs.length) {
          whomap.moveThing(63,119,who);
          who.direction = "n";
          DebugWrite("ai","Exiting Onyx, by which I mean teleporting in from the corner.");
        } else { DebugWrite("ai","Didn't come out of Onyx- PC in the way."); }
      } else { DebugWrite("ai","Didn't come out of Onyx- NPC in the way."); }
      
    }
  } else if ((who.getx()===64) && (who.gety()===119)) {
    whomap.moveThing(0,0,who);
    DebugWrite("ai", "Entering Onyx, by which I mean teleporting to the corner.");
    DrawMainFrame("one",whomap,64,119);
  } else if ((who.getx()===49) && (who.gety()===90)) {
    whomap.moveThing(0,0,who);
    DebugWrite("ai", "Entering BDC, by which I mean teleporting to the corner.");
    DrawMainFrame("one",whomap,49,90);
  } else {
    let dest = [];
    if (who.direction === "n") { dest[0]=49; dest[1]=90; }
    else { dest[0]=64;dest[1]=119; }
    let path = whomap.getPath(who.getx(),who.gety(),dest[0],dest[1],who.getMovetype());
    path.shift();
    if (path.length) {
      retval = StepOrSidestep(who, [path[0][0],path[0][1]], [dest[0],dest[1]], "nopush");
    }
  }
  return retval;
}

ais.Sentinel = function(who) {
  who.setHP(who.getMaxHP());
  let destinations = [];
  destinations[0] = ["w","w","n","n","w","w","e","e","e","e","e","e","s","s","s","s"];
  destinations[1] = ["s","s","s","s","e","e","n","n","n","e","e","s","s","s","s","s","w","w","w","e","e","e","s","s","w","w","w","s","s","e","e","e"];
  destinations[2] = ["w","w","s","s","s","s","s","s","s","s","e","e","e","n","n","w","n","n","n","n"];
  destinations[3] = ["n","e","e","e","e","e","n","n","e","e","s","s","e","e","e","e","e"];
  
  DebugWrite("ai", "SENTINEL " + who.patrol + " AI beginning. Standing at " + who.getx() + "," + who.gety() + " (step " + who.step + "). Path takes it " + destinations[who.patrol][who.step] + " * " + who.direction + ". <br />");
  DebugWrite("sent", "SENTINEL " + who.patrol + " AI beginning. Standing at " + who.getx() + "," + who.gety() + " (step " + who.step + "). Path takes it " + destinations[who.patrol][who.step] + " * " + who.direction + ". <br />");
//  console.log("SENTINEL " + who.patrol + " AI beginning. Standing at " + who.getx() + "," + who.gety() + " (step " + who.step + "). Path takes it " + destinations[who.patrol][who.step]);
  // sequence: first, see if player is in front of, if so spend action teleporting player back to center
  //                  (also do this to the player's summoned NPCs if they have one)
  // then, see if path is blocked, if so, if there is a jump, jump to next step without moving
  // if neither of those things happened, take the next step
  
  let mymap = who.getHomeMap();
  let diffx=0;
  let diffy=0;
  if (destinations[who.patrol][who.step] === "n") {
    diffy = -1*who.direction;
  } else if (destinations[who.patrol][who.step] === "s") {
    diffy = 1*who.direction;
  } else if (destinations[who.patrol][who.step] === "e") {
    diffx = 1*who.direction;
  } else if (destinations[who.patrol][who.step] === "w") {
    diffx = -1*who.direction;
  } else {
    alert("Sentinels have an invalid step, " + who.patrol + " / " + who.step);
  }

  let retval = {};
  let desttile = mymap.getTile(who.getx()+diffx,who.gety()+diffy);
  let moveval = desttile.canMoveHere(who.getMovetype());
  if ((PC.getHomeMap() === mymap) && (PC.getx() === who.getx()+diffx) && (PC.gety() === who.gety()+diffy)) {
    DebugWrite("ai", "SENTINEL " + who.patrol + ": PC in the way. Removing.<br />");
    DebugWrite("sent", "SENTINEL " + who.patrol + ": PC in the way. Removing.<br />");
    mymap.moveThing(16,13,PC);
    maintext.addText("The sentinel teleports you away.");
    DUPlaySound("sfx_teleport_pad");
    retval["fin"] = 1;
    DrawMainFrame("draw", mymap, PC.getx(), PC.gety());
    who.waits = 0;
  } else if (moveval["canmove"] !== 1) {
    // path is blocked
    let blocker = desttile.getTopNPC();
    if (blocker) {
      DebugWrite("ai", "Path is blocked by " + blocker.getName() + ".<br />");
      DebugWrite("sent", "Path is blocked by " + blocker.getName() + ".<br />");
      if (blocker.getName() !== who.getName()) {
        if (blocker.summoned) {
          maintext.addText("The sentinel unsummons your ally!");
          blocker.dealDamage(1000,who);
          retval["fin"] = 1;
          who.waits = 0;
        } else {
          // blocker is neither another sentinel nor a summoned creature nor the PC. 
          // This shouldn't be possible, but if it happens, it'll wait
          who.waits++;
          retval["fin"] = 1;
          DebugWrite("ai", "Ran into something not sentinel and not PC/summon. ??");
          DebugWrite("sent", "Ran into something not sentinel and not PC/summon. ??");
          console.log(blocker);
          
          // has it been standing here for too long?
          if (who.waits > 3) {
            let starttile = mymap.getTile(who.startx,who.starty);
            let whosethere = starttile.getTopNPC();
            if (!whosethere) {
              mymap.moveThing(who.startx, who.starty, who);
              DebugWrite("ai", "Standing around too long- went home.");
              DebugWrite("sent", "Standing around too long- went home.");
              who.step = who.startstep;
              who.direction = who.startdirection;
            } // otherwise, can't go back home because someone is there
            retval["fin"] = 1;
          }
        }
      } else {
        // bumped into another sentinel
        who.waits++;
        retval["fin"] = 1;
        // has it been standing here for too long?
        if (who.waits > 3) {
          DebugWrite("ai", "Been standing in place too long, going home.<br />");
          DebugWrite("sent", "Been standing in place too long, going home.<br />");
          let starttile = mymap.getTile(who.startx,who.starty);
          let whosthere = starttile.getTopNPC();
          if (!whosthere) {
            mymap.moveThing(who.startx, who.starty, who);
            who.step = who.startstep;
            who.direction = who.startdirection;
            who.waits = 0;
          } // otherwise, can't go back home because someone is there
        }    
      }
    } else {
      DebugWrite("ai", "SENTINEL " + who.patrol + ": Path blocked- turn around.");
      DebugWrite("sent", "SENTINEL " + who.patrol + ": Path blocked- turn around.");
      who.direction = who.direction * -1;
      who.step += who.direction;
      who.waits = 0;
      retval["fin"] = 1;
    }
  } else {
    who.moveMe(diffx,diffy);
    who.step += who.direction;
    DebugWrite("ai", "SENTINEL step is now: " + who.step + ", sentinel is at " + who.getx() + "," + who.gety());    
    DebugWrite("sent", "SENTINEL step is now: " + who.step + ", sentinel is at " + who.getx() + "," + who.gety());    
    if (destinations[who.patrol].length <= who.step) { 
      who.direction = who.direction * -1;
      who.step--;
      DebugWrite("ai", "Fell off the front- turning around. Step is now: " + who.step + ", direction is now: " + who.direction);    
      DebugWrite("sent", "Fell off the front- turning around. Step is now: " + who.step + ", direction is now: " + who.direction);    
    } else if (who.step < 0) {
      who.direction = who.direction * -1;
      who.step++;
      DebugWrite("ai", "Fell off the end- turning around. Step is now: " + who.step + ", direction is now: " + who.direction);    
      DebugWrite("sent", "Fell off the end- turning around. Step is now: " + who.step + ", direction is now: " + who.direction);    
    }
    retval["fin"] = 1;
  }
  return retval;
}

ais.Animal = function(who,radius) {
  let retval = ais.OutdoorHostile(who, radius, "none");
  return retval;  
}

ais.Bandit = function(who,radius) {
  let retval = ais.OutdoorHostile(who, radius, "road");
  return retval;
}

ais.Monster = function(who,radius) {
  let poiname = "wild";
  if (who.altPoI) { poiname = who.altPoI; }
  let retval = ais.OutdoorHostile(who, radius, poiname);
  return retval;
}

ais.OutdoorHostile = function(who, radius, pname) {
  if (!radius) { radius = 0; }
  
  let retval = {fin: 1};
  DebugWrite("ai", "AI " + who.getName() + " " + who.getSerial() + " is going. Radius: " + radius + ".<br />");
  // First, see if the PC is adjacent and if so, smite.
  let locx = PC.getx();
  let locy = PC.gety();
  let pcmap = PC.getHomeMap();
  if (who.getHomeMap() !== pcmap) {
    if ((pcmap.getName().match(/combat/)) && (pcmap.getExitToMap() === who.getHomeMap().getName())) {
      // if PC is on a combat map, use map's exit coords to determine location
      locx = pcmap.getExitToX();
      locy = pcmap.getExitToY();
    } else {
      locx = 300;
      locy = 300;
      // because these values can never be 1 away via GetDistance
    }
  }
  // not using IsAdjacent because don't want to check for same map
  if (((Math.abs(who.getx() - locx) === 1) && (Math.abs(who.gety() - locy) === 0)) || ((Math.abs(who.getx() - locx) === 0) && (Math.abs(who.gety() - locy) === 1))) {
    if (pcmap === who.getHomeMap()) {
      DebugWrite("ai", "<span style='font-weight:bold'>AI " + who.getName() + " attacks the PC!</span><br />"); 
      NPCAttackPCMap(who);
      retval.removed = 1;
      return retval;
    } else { // PC is already in a fight
      DebugWrite("ai", "<span style='font-weight:bold'>AI " + who.getName() + " adjacent to PC on world map, waiting its turn.</span><br />");
      retval["initdelay"] = .1;
      return retval;
    }
  }
  
  // Next, check and see if there is already a path that has not expired
  // but only if the PC is not within close range- in that case, always wait to hunt
  // reminder: locx and locy are the PC's coords
  DebugWrite("ai", "Comparing distance: Radius=" + radius + "; PC is " + GetDistance(who.getx(), who.gety(), locx, locy) + " away .<br />");
  if ((GetDistance(who.getx(), who.gety(), locx, locy) > radius/3) || (who.getDestinationType("spawn"))) {
    if (who.getDestinationType("spawn")) { DebugWrite("ai", "Current destination: returning to spawn anchor (" + who.getSpawnedBy().getx() + "," + who.getSpawnedBy().gety() + ")<br />"); }
    else { DebugWrite("ai", "PC on another map or not Close. Trying to follow a path.<br />"); }
    retval = ais.SurfaceFollowPath(who,40,1);   
    if (retval["fin"] === 1) { return retval; }
  }
  
  // If there is a radius attached, hunt for the PC next
  if (radius) {
    DebugWrite("ai", "AI hunts within " + radius + ", hunting for PC.<br />");
    let hunt = ais.HuntPC(who,radius);

    if (hunt) { 
      DebugWrite("ai", "Hunt was successful, trying to follow the path.<br />");
      retval = ais.SurfaceFollowPath(who,40,1);   
      return retval; // we're done here either way
    }  
  }

  if (pname !== "none") {
    // we have neither attacked, moved, nor hunted- now we look for a PoI to go towards
    DebugWrite("ai", "AI " + who.getName() + " has neither attacked, moved, nor hunted- now look for a PoI.<br />");
    let movepoi = ais.ProcessPoI(who, pname);
    if (movepoi) {
      retval = ais.SurfaceFollowPath(who,40,1); 
      return retval;
    }
  } 
  // animal (or on non-Elussus map), only randomwalk
  retval = this.Randomwalk(who,25,25,25,25);
  if (retval["nomove"] === 1) {
    retval = this.Randomwalk(who,25,25,25,25);
  }
  return retval;
}


// sub-functions

ais.HuntPC = function(who, radius) {
  let themap =  who.getHomeMap();
	// Is the PC within range to be hunted?
	let locx = PC.getx();
	let locy = PC.gety();
	if (PC.getHomeMap() !== themap) {
	  let pcmap = PC.getHomeMap();
	  if ((pcmap.getName().match(/combat/) && (pcmap.getExitToMap() === themap.getName()))) {
	    locx = pcmap.getExitToX();
	    locy = pcmap.getExitToY();
	    DebugWrite("ai", "Hunting, PC is in combat, using combat map's exit coords for PC position.<br />");
	  } else {
	    // far away so all GetDistance calls fail
	    locx = 300;
	    locy = 300;
	  }
	}
	if (GetDistance(who.getx(), who.gety(), locx, locy) > radius) {
	  DebugWrite("ai", "PC is not in range to hunt.<br />");
		return 0;  // no hunting
	}
	
	
	// if the PC is within a smaller radius (currently radius/3), hunt no matter what.
	// otherwise, check if we can see the PC, with a more forgiving threshold than used
	// in the game display
	if (GetDistance(who.getx(), who.gety(), locx, locy) > (radius/3)) {       
    let losresult = themap.getLOS(who.getx(), who.gety(), locx, locy);
    if ((losresult > 2) && !(who.getMovetype() & MOVE_ETHEREAL)) { 
      DebugWrite("ai", "PC is within radius but not in sight, no hunt.<br />");
      return 0; 
    }  // can't see the PC and they aren't really close, no hunt
	}
	
	// HUNT!
	// find path to the PC
	DebugWrite("ai", "HUNTING!<br />");
	let destination = { x: locx, y: locy };
		
	let path = themap.getPath(who.getx(), who.gety(), destination.x, destination.y, who.getMovetype());
	if (path.length) {
   	path.shift();  // because the first step is where it is already standing.
    DebugWrite("ai", "<span style='font-weight:bold'>From: " + who.getx() + ", " + who.gety() + " to " + destination.x + ", " + destination.y+ "<br />First step is: " + path[0][0] + ", " + path[0][1] + "<br />Next step is: " + path[1][0] + ", " + path[1][1] + "</span><br />");
    who.setCurrentPath(path);

    let dur = Dice.roll("1d3-2") + Math.floor(path.length / 3);
    if (dur < 1) { dur = 1; }
    who.setDestination(destination, dur);
    who.setDestinationType("PC");
    
    return 1;
  } else { 
    DebugWrite("ai", "No available path, hunt abandoned.<br />");
    return 0;
  }
	
}

ais.Borogard = function(who) {
  let retval = {};
  retval["fin"] = 1;
  if (IsObjectVisibleOnScreen(who)) {
    console.log("Visible!");
    PC.forcedTalk = who;
    who.currentAI = "seekPC-10";
    who.peaceAI = "seekPC-10";
  }
  return retval;
}

ais.SwainhilBandit = function(who) {
  let retval = {};
  retval["fin"] = 1;
  if (who.yelled) {
    if (GetDistance(who.getx(),who.gety(),12,16) <= 3) {
      who.currentAI = "seekPC-10";
      who.peaceAI = "seekPC-10";
    } else {
      let path = who.getHomeMap().getPath(who.getx(), who.gety(), 12, 15, who.getMovetype());
      if (path.length) {
        path.shift();
        retval = StepOrSidestep(who, [path[0][0],path[0][1]], [12,15], "nopush");
      } else {
        // can't path back, prepare to fight!
        who.currentAI = "seekPC-10";
        who.peaceAI = "seekPC-10";  
      }
    }
  } else if (IsObjectVisibleOnScreen(who)) {
    maintext.addText('A voice calls out, "There\'s someone here! Beware!"');
    who.yelled = 1;
  }
  return retval;
}

ais.FranklinCourier = function(who) {
  let retval = {};
  retval["fin"] = 1;
  if ((who.step === 1) && (GetSquareDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) === 1)) {
    maintext.addText(`The courier calls to you: "${PC.getPCName()}, my ${PC.titled}! The Bard Franklin bids me say Thank you again, and that I deliver to you this. Good day!"`);
    maintext.addText("He hands you a book, and runs off to his next delivery.");
    maintext.addText(`<span class='sysconv'>You have gained one Audachta Nemesos: Jinx.</span>`);
    PC.addToInventory(localFactory.createTile("AudachtaNemesosJinx"),1);
    who.step = 2;
    DU.gameflags.setFlag("franklin_gift",1);
    return retval;
  } else if (who.step === 1) {
    let path = who.getHomeMap().getPath(who.getx(),who.gety(),PC.getx(),PC.gety(),who.getMovetype());
    path.shift();
    retval = StepOrSidestep(who, [path[0][0],path[0][1]], [PC.getx(),PC.gety()], "nopush");
    return retval;
  } else if (who.step === 2) {
    if ((who.getx() === who.leavex) && (who.gety() === who.leavey)) {
      who.getHomeMap().deleteThing(who);
      DUTime.removeEntityFrom(who);
      DrawMainFrame("one",PC.getHomeMap(),who.leavex,who.leavey);
    } else {
      let path = who.getHomeMap().getPath(who.getx(),who.gety(),who.leavex,who.leavey,who.getMovetype());
      path.shift();
      retval = StepOrSidestep(who, [path[0][0],path[0][1]], [who.leavex,who.leavey], "nopush");
    }
  }
  return retval;
}

ais.CollGuard = function(who) {
  let retval = {fin:1};
  if (!DU.gameflags.getFlag("guard_thief_talk")) {
    if (PC.getHomeMap() === who.getHomeMap()) {
      if (GetDistance(PC.getx(),PC.gety(),who.getx(),who.gety()) <= 2) {
        PC.forcedTalk = who;
      }
    }
  }
  return retval;
}

ais.PaladinCourier = function(who) {
  let retval = {};
  retval["fin"] = 1;
  if ((who.step === 1) && (GetSquareDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) === 1)) {
    maintext.addText(`The courier calls to you: "${PC.getPCName()}, my ${PC.titled}! I come to you with a message from Lord Isaac of Swainhil. He bids you come to him in Swainhil. I am to say: you have passed the trails. Congratulations, and farewell!"`);
    maintext.addText("She turns away, off to make her next delivery.");
    who.step = 2;
    DU.gameflags.setFlag("paladin_stage2",1);
    return retval;
  } else if (who.step === 1) {
    let path = who.getHomeMap().getPath(who.getx(),who.gety(),PC.getx(),PC.gety(),who.getMovetype());
    path.shift();
    retval = StepOrSidestep(who, [path[0][0],path[0][1]], [PC.getx(),PC.gety()], "nopush");
    return retval;
  } else if (who.step === 2) {
    if ((who.getx() === who.leavex) && (who.gety() === who.leavey)) {
      who.getHomeMap().deleteThing(who);
      DUTime.removeEntityFrom(who);
      DrawMainFrame("one",PC.getHomeMap(),who.leavex,who.leavey);
    } else {
      let path = who.getHomeMap().getPath(who.getx(),who.gety(),who.leavex,who.leavey,who.getMovetype());
      path.shift();
      retval = StepOrSidestep(who, [path[0][0],path[0][1]], [who.leavex,who.leavey], "nopush");
    }
  }
  return retval;
}

ais.SurfaceFollowPath = function(who, random_nomove, random_tries) {
  DebugWrite("ai", "<span style='font-weight:bold'>AI " + who.getName() + " in SurfaceFollowPath.</span><br />");
  let retval = { fin: 0 };
  let spawnedby = who.getSpawnedBy();
  let leashpresent = 0;
  if (spawnedby && (spawnedby.getSpawnLeash() || spawnedby.getSpawnSoftLeash())) { leashpresent = 1; }
  
  if ((who.getCurrentPath().length > 0) && (who.getTurnsToRecalcDest() > 0)) {
    let coords = who.getNextStep();
    DebugWrite("ai", "Check path distance? My location: " + who.getx() + ", " + who.gety() + ", next step is: " + coords[0] + ", " + coords[1] + ".<br />");
    if (GetDistance(who.getx(), who.gety(), coords[0], coords[1]) === 1) {  // the next step is only a step away
      let diffx = coords[0] - who.getx();
      let diffy = coords[1] - who.gety();
      let civilized = 0;
      // check to see if move would bring close to a settlement
      if (who.getHomeMap().getScale() === 0) {  // only care about it if on an outdoor map
        DebugWrite("ai", "Checking for civilization proximity.");
        civilized = CheckTownProximity( { x: coords[0], y: coords[1] }, who.getHomeMap());
        if (civilized) { 
          DebugWrite("ai", " Civilized!");
          retval["canmove"] = 0; 
        }
        DebugWrite("ai", "<br />");
      }  

      DebugWrite("ai", "AI " + who.getName() + " moving from " + who.getx() + ", " + who.gety() + " to " + coords[0] + ", " + coords[1] + " :");
      let turnscheck = who.setTurnsToRecalcDest(who.getTurnsToRecalcDest() - 1);
      DebugWrite("ai", "There are now " + turnscheck + " turns left on the existing path.<br />");
      let leashed = 0;
      if (leashpresent) {
        let spawndist = GetDistance(coords[0], coords[1], spawnedby.getx(), spawnedby.gety());  // distance from spawner to target location
        if ((spawndist > spawnedby.getSpawnLeash()) && (who.getDestinationType() !== "spawn")) { // Presumably got here by chasing the PC, but trying to move beyond leash
          retval["canmove"] = 0;
          DebugWrite("ai", "AI " + who.getName() + " restricted from moving: hard leash at " + spawnedby.getx() + "," + spawnedby.gety() + ".<br />");
          leashed = 1;
        } else if ((who.getDestinationType() !== "spawn") && (who.getDestinationType() !== "PC") && spawnedby.getSpawnSoftLeash() && (spawndist > spawnedby.getSpawnSoftLeash())) { // moving past soft leash without going after the PC
          retval["canmove"] = 0;
          DebugWrite("ai", "AI " + who.getName() + " restricted from moving: trying to go past soft leash at " + spawnedby.getx() + "," + spawnedby.gety() + " w/o targetting PC.<br />");
          leashed = 1;
        }
      }
      if (!leashed && !civilized) {  
        retval = who.moveMe(diffx, diffy, 0);
      }
      if (retval["canmove"] === 1) { // it moved!
        retval["fin"] = 1;
        DebugWrite("ai", "successfully. New location: " + who.getx() + ", " + who.gety() + "<br />");
        if (debug && debugflags.ai) {
          let tile = who.getHomeMap().getTile(who.getx(), who.gety());
          if (!tile.canMoveHere(MOVE_WALK,1).canmove) {
            DebugWrite("ai", "<span style='font-weight:bold; text-decoration:underline'>AI moved onto a tile that cannot be walked on: " + tile.getTerrain().getName() + ".</span><br />");
          }
        }
        return retval; // we're done here
      }
      // failed to move. On the surface, this means there was another AI there, or it hit its leash.
      // in scale map, could be a closed door.
      DebugWrite("ai", "unsuccessfully.<br />");

      if (leashed) {
        let path = who.getHomeMap().getPath(who.getx(), who.gety(), spawnedby.getx(), spawnedby.gety(), who.getMovetype());
        if (path.length) {
          path.shift();
          if (path.length) {
            let dur = Math.floor(path.length / 3) + Dice.roll("1d5-3");
            if (dur > path.length) { dur = path.length; }
            if (dur < 0) { dur = 0; }
            who.setCurrentPath(path);
            who.setDestination({x: spawnedby.getx(), y: spawnedby.gety()}, dur);
            who.setDestinationType("spawn");
            DebugWrite("ai", "Set path to: " + spawnedby.getx() + ", " + spawnedby.gety() + "<br />");
            retval["fin"] = 1;
            return retval;
          }
        }
      }
      
      // if there is another AI in the way, randomwalk
      if (!random_tries) { random_tries = 1; }
      for (let i = 0; i<random_tries; i++) {
        if (!random_nomove) { random_nomove = 0; }
        let split_move = (100-random_nomove)/3;
        if (diffx === 1) { retval = ais.Randomwalk(who,split_move,0,split_move,split_move); }
        else if (diffx === -1) { retval = ais.Randomwalk(who,split_move,split_move,split_move,0); }
        else if (diffy === 1) { retval = ais.Randomwalk(who,0,split_move,split_move,split_move); }
        else if (diffy === -1) { retval =  ais.Randomwalk(who,split_move,split_move,0,split_move); }
        else { alert("How did I get here? ais.FollowPath."); }
        if (!retval["nomove"]) { 
          DebugWrite("ai", "Successful randomwalk to (" + who.getx() + "," + who.gety() + ").<br />");
          return retval; 
        }  // moved
      }
      
      //didn't move. Not going to try again. Ending turn.
      retval["fin"] = 1;
      return retval;
      
    } 
    // if next step is more than one step away, a previous move failed, recalculate now
    DebugWrite("ai", "Path distant? My location: " + who.getx() + ", " + who.gety() + ", next step is: " + coords[0] + ", " + coords[1] + ".<br />");
  }
  DebugWrite("ai", "No path to follow. Path length: " + who.getCurrentPath().length + ". Turns: " + who.getTurnsToRecalcDest() + ".<br />");
  return retval;
}

ais.Randomwalk = function(who, chance_north, chance_east, chance_south, chance_west) {
  // default values, 25 25 25 25. If it doesn't sum to 100, the remainder is chance_none.
  let retval = {};
  let diffx = 0;
  let diffy = 0;
  
  if (chance_north + chance_west + chance_east + chance_south  > 100) {
    chance_north = 25;
    chance_south = 25;
    chance_east = 25; 
    chance_west = 25;
  }
  
  let roll = Dice.roll("1d100");
  if (roll <= chance_north) { diffy = -1; }
  else if (roll - chance_north < chance_east) { diffx = 1; }
  else if (roll - chance_north - chance_east < chance_south) { diffy = 1; }
  else if (roll - chance_north - chance_east - chance_south < chance_west) { diffx = -1; }
  
  if (diffx === diffy) {  // which at this point can only happen if we aren't moving
    retval["nomove"] = 1;
    retval["canmove"] = 0;
    retval["diffx"] = diffx;
    retval["diffy"] = diffy;
    return retval;
  }
  let destx = who.getx()+diffx;
  let desty = who.gety()+diffy;
  let desttile = who.getHomeMap().getTile(destx, desty);
  if (desttile === "OoB") {
    retval["nomove"] = 1;
    retval["canmove"] = 0;
    retval["diffx"] = diffx;
    retval["diffy"] = diffy;
    return retval;     
  }
  
  if (desttile.isHostileTo(who)) {
    DebugWrite("ai", who.getName() + " refused to randomwalk onto a hostile tile at " + (destx) + "," + (desty) + ".");
    retval["nomove"] = 1;
    retval["canmove"] = 0;
    retval["diffx"] = diffx;
    retval["diffy"] = diffy;
    return retval; 
  }

  if (desttile.noWander()) {
    DebugWrite("ai", who.getName() + " refused to randomwalk onto a nowander tile at " + (destx) + "," + (desty) + ".");
    retval["nomove"] = 1;
    retval["canmove"] = 0;
    retval["diffx"] = diffx;
    retval["diffy"] = diffy;
    return retval; 
  }

  if (who.getHomeMap().getScale() === 0) {  // only care about it if on an outdoor map
    let civilized = CheckTownProximity( { x: destx, y: desty }, who.getHomeMap());
    if (civilized) {
      DebugWrite("ai", who.getName() + " refused to randomwalk close to civilization at " + (destx) + "," + (desty) + ".");
      retval["nomove"] = 1;
      retval["canmove"] = 0;
      retval["diffx"] = diffx;
      retval["diffy"] = diffy;
      return retval; 
    }
  }
  retval = StepOrSidestep(who, [destx,desty], [destx,desty], "nopush");
  retval["nomove"] = 0;  // NOTE- this is 0 even if they didn't move. If it gets to this point,
                         // canmove is the only reliable indicator of whether it moved. Checking
                         // for canmove=0 AND nomove=0 reveals that a move was attempted but failed.
  return retval;

}


ais.ProcessPoI = function(who,poiname) {
  let themap = who.getHomeMap();
  if (!themap.network[poiname]) { return; }
  if (!who.getPoI().x) {
    DebugWrite("ai", who.getName() + ", which follows " + poiname + " on map " + themap.getName() + ", has no PoI yet. Searching...<br />");
    let poi = FindClosestPoI(who.getx(), who.gety(), themap, poiname);
    DebugWrite("ai", "Closest PoI: " + poi.x + ", " + poi.y + "<br />");
    who.setPoI(poi);
    // random scatter the actual destination to near the PoI
    
    let path = [];
    let pathcount = 0;
    let xval, yval;
    while ((path.length === 0) && (pathcount < 10)) {
      xval = Dice.roll("1d9-5") + poi.x;
      yval = Dice.roll("1d9-5") + poi.y;
    
      if (xval < 0) { xval = 0; }
      if (xval > themap.getWidth()-1) { xval = themap.getWidth()-1; }
      if (yval < 0) { yval = 0; }
      if (yval > themap.getHeight()-1) { yval = themap.getHeight()-1; }
      // it shouldn't be possible to try to walk off the map, but let's make sure.
      
      path = themap.getPath(who.getx(), who.gety(), xval, yval, who.getMovetype());
      path.shift();
      pathcount++;
    }
    if (path.length === 0) { 
      DebugWrite("ai", "Couldn't find a path to anything near the PoI, gave up. Will randomwalk.")
      return 0; 
    }
    let dur = 2*Math.floor(path.length / 3) + Dice.roll("1d5-3");
    if (dur > path.length) { dur = path.length; }
    if (dur < 0) { dur = 0; }
    who.setCurrentPath(path);
    who.setDestination({x: xval, y: yval}, dur);
    who.setDestinationType("PoI");
    DebugWrite("ai", "Set path to: " + xval + ", " + yval + "<br />");
    return 1;
  } else {
    let coords = who.getCurrentPath()[0];
    if ((who.getTurnsToRecalcDest() <= 0) || !coords) {
      DebugWrite("ai", "Path expired, find a new PoI!<br />");
      let connections = who.getPoI().connections;
      let connind = Dice.roll("1d" + connections.length + "-1");
      let poi = who.getPoI().connections[connind];
      who.setPoI(poi);
      DebugWrite("ai", "New PoI coords: " + poi.x + ", " + poi.y + "<br />");
      let path = [];
      let pathcount = 0;
      let xval, yval;
      while ((path.length === 0) && (pathcount < 10)) {
        xval = Dice.roll("1d9-5") + poi.x;
        yval = Dice.roll("1d9-5") + poi.y;
    
        path = themap.getPath(who.getx(), who.gety(), xval, yval, who.getMovetype());
        path.shift();
        pathcount++;
      }
      if (path.length === 0) { 
        DebugWrite("ai", "Couldn't find a path to anything near the PoI, gave up. Will randomwalk.")
        return 0; 
      }
      let dur = 2*(path.length/3) + Dice.roll("1d3-1");
      if (dur < 0) { dur = 0; }
      if (dur > path.length) { dur = path.length; }
      who.setCurrentPath(path);
      who.setDestination({x: xval, y: yval}, dur);   
      who.setDestinationType("PoI");
      DebugWrite("ai", "New path to: " + xval + ", " + yval + "<br />");
      return 2;
    } else if (GetDistance(who.getx(), who.gety(), coords[0], coords[1]) !== 1) {
      // next step is not adjacent but destination is still valid: find a new path!
      DebugWrite("ai", "Path not expired, but path invalid. Recalculate.<br />");
      let coords = who.getDestination();
      let path = themap.getPath(who.getx(), who.gety(), coords.x, coords.y, who.getMovetype());
      path.shift();
      who.setCurrentPath(path);
      return 3;
    } 
  }

  return 0;
}

function NPCAttackPCMap(npc) {
  let combatmapname = GetCombatMap(npc, PC);
  let newmap = new GameMap();
  newmap = maps.addMap(combatmapname);

  PC.getHomeMap().deleteThing(npc);
  let spawner=npc.getSpawnedBy();
  if (spawner) {
    spawner.deleteSpawned(npc);
  }

  let desttile = MoveBetweenMaps(PC,PC.getHomeMap(),newmap, newmap.getEnterX(), newmap.getEnterY());
    
  let monsters = PlaceMonsters(newmap,npc,0);
  DUTime.removeEntityFrom(npc);
  DUTime.removeEntityFrom(PC);
  let NPCevent = new GameEvent(PC);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
      
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  
  let npcname = npc.getDesc();
  npcname = npcname.charAt(0).toUpperCase() + npcname.slice(1);
  if (npc.attackword) {
    maintext.addText(npcname + " " + npc.attackword + "!");
  } else {
    maintext.addText(npcname + " attack!");
  }
  
  return 1;
}

function CheckTownProximity(coords, map) {
  let mapfeatures = map.features.getAll();  // weirdly, this assumes that all maps this will be run on have features. Probably a safe assumption.
  if (!mapfeatures[0]) { return 0; }  // just in case one doesn't!

  for (let i = 0; i < mapfeatures.length; i++) {
    if (mapfeatures[i].civilized) {
      if (GetDistance(coords.x, coords.y, mapfeatures[i].getx(), mapfeatures[i].gety()) < 4) {  // your little walk will take you too close to civilization
        DebugWrite("ai", "Destination too close to " + mapfeatures[i].getDesc() + ".<br />");
        return 1;
      }
    }
  }
  return 0;
}

function FindClosestPoI(xval, yval, themap, poiname) {
  if (!themap.network[poiname]) { 
    alert("Unknown poi network! (" + poiname + ")"); 
  }
  
  let closeind = 0;
  let closest = GetDistance(xval,yval,themap.network[poiname][0].x, themap.network[poiname][0].y);
  
  for (let i=1; i<themap.network[poiname].length; i++) { 
    let ind = GetDistance(xval,yval,themap.network[poiname][i].x, themap.network[poiname][i].y);
    if (ind < closest) { closeind = i; }
  }
  return themap.network[poiname][closeind];
}

// who, approach, path
function FindCombatPath(who,approach,path) {
  let whomap = who.getHomeMap();
  let moved;
  path.shift();
  path.pop();
  let finaldest = whomap.getTile(path[path.length-1][0],path[path.length-1][1]);
  let firststep = whomap.getTile(path[0][0],path[0][1]);

  // if path > 3ish, try to walk along it, if short, check if destination tile is occupied, 
  // if so, search adjacent to approach to find an empty tile and pathfind to it.
  if ((path.length > 3) || (!finaldest.getTopNPC() && !firststep.getTopNPC()))  {
    DebugWrite("ai", "Path long enough or short but start and end positions are empty- walking.<br />");
    moved = StepOrSidestep(who,path[0],path[path.length-1]);
  } else {
    // path currently goes through some NPCs. Need to make a better path.
    // first step- create a local pathgrid that takes NPCs into account.
    // to get here the path distance can be no more than 4. Tweak this after playtest.
    DebugWrite("ai", "Path is short but blocked- looking for a better path.<br />");

    let leftx = who.getx();
    let rightx = approach.getx();
    if (rightx < leftx) { 
      leftx = rightx; 
      rightx = who.getx();
    }
    let topy = who.gety();
    let bottomy = approach.gety();
    if (topy > bottomy) {
      topy = bottomy;
      bottomy = who.gety();
    }
    leftx = leftx - 2;
    topy = topy - 2;
    rightx = rightx + 2;
    bottomy = bottomy + 2;

    if (rightx - leftx < 7) { rightx++; leftx--; }
    if (bottomy - topy < 7) { bottomy++; topy--; }
    if (leftx < 0) { leftx = 0; }
    if (topy < 0) { topy = 0; }
    if (rightx >= whomap.getWidth()) { rightx = whomap.getWidth()-1; }
    if (bottomy >= whomap.getHeight()) { bottomy = whomap.getHeight()-1; }
          
    DebugWrite("ai", "Searching for a path inside bounding box- left: " + leftx + ", right: " + rightx + ", top: " + topy + ", bottom: " + bottomy + ".<br />");
    // creates a box with the two entities in the corners, and then 
    // stretches it to be large enough to find paths in

    let temppathgrid = whomap.getPathGrid(who.getMovetype()).clone();
    for (let i = leftx; i <= rightx; i++ ) {
      for (let j = topy; j <= bottomy; j++ ) {
        let thisspot = whomap.getTile(i,j);
        if (thisspot.getTopNPC()) {
          temppathgrid.setWalkableAt(i,j,false);
        }
      }
    }
    // Created pathgrid that is a duplicate of the maps, but with NPCs marked impassible. 
    temppathgrid.setWalkableAt(who.getx(),who.gety(),true); // pathfinding requires start tile to be walkable
       
    // from here, find 5 paths, to center and each corner
    // each path requires its own clone with that location marked walkable- for corners, note if destination is occupied but still get path
    let whichdir = GetOctant(approach.getx()-who.getx(), approach.gety()-who.gety());
    DebugWrite("ai", "Attacker is in octant " + whichdir + ".<br />");      
    let endpoints = [];  
    switch(whichdir) {                                         // dir from target entity
      case 0:   // AI is heading south
        endpoints[0] = [Math.max(approach.getx()-1, 0), Math.max(approach.gety()-1,0)]; // northwest
        endpoints[1] = [Math.min(approach.getx()+1, whomap.getWidth()), Math.max(approach.gety()-1,0)]; // northeast
        endpoints[2] = [approach.getx(), Math.max(approach.gety()-1,0)];   // north
        break;
      case 1:   // AI is heading southwest
        endpoints[0] = [Math.min(approach.getx()+1, whomap.getWidth()), approach.gety()];   // east
        endpoints[1] = [Math.min(approach.getx()+1, whomap.getWidth()), Math.max(approach.gety()-1,0)]; // northeast
        endpoints[2] = [approach.getx(), Math.max(approach.gety()-1,0)];   // north
        break;
      case 2:   // AI is heading west
        endpoints[0] = [Math.min(approach.getx()+1, whomap.getWidth()), approach.gety()];   // east
        endpoints[1] = [Math.min(approach.getx()+1, whomap.getWidth()), Math.min(approach.gety()+1, whomap.getHeight())]; // southeast
        endpoints[2] = [Math.min(approach.getx()+1, whomap.getWidth()), Math.max(approach.gety()-1,0)]; // northeast
        break;
      case 3:   // AI is heading northwest
        endpoints[0] = [approach.getx()+1, approach.gety()];   // east
        endpoints[1] = [approach.getx()+1, Math.max(approach.gety()-1,0)]; // southeast
        endpoints[2] = [approach.getx(), Math.max(approach.gety()-1,0)]; // south
        break;        
      case 4:   // AI is heading north
        endpoints[0] = [approach.getx(), Math.min(approach.gety()+1, whomap.getHeight())];   // south
        endpoints[1] = [Math.min(approach.getx()+1, whomap.getWidth()), Math.min(approach.gety()+1, whomap.getHeight())]; // southeast
        endpoints[2] = [Math.max(approach.getx()-1, 0), Math.min(approach.gety()+1, whomap.getHeight())]; // southwest
        break;
      case 5:   // AI is heading northeast
        endpoints[0] = [approach.getx(), Math.min(approach.gety()+1, whomap.getHeight())];   // south
        endpoints[1] = [Math.max(approach.getx()-1, 0), approach.gety()];   // west
        endpoints[2] = [Math.max(approach.getx()-1, 0), Math.min(approach.gety()+1, whomap.getHeight())]; // southwest
        break;
      case 6:   // AI is heading east
        endpoints[0] = [Math.max(approach.getx()-1, 0), Math.max(approach.gety()-1,0)]; // northwest
        endpoints[1] = [Math.max(approach.getx()-1, 0), approach.gety()];   // west
        endpoints[2] = [Math.max(approach.getx()-1, 0), Math.min(approach.gety()+1, whomap.getHeight())]; // southwest
        break;
      case 7:   // AI is heading southeast
        endpoints[0] = [Math.max(approach.getx()-1, 0), Math.max(approach.gety()-1,0)]; // northwest
        endpoints[1] = [Math.max(approach.getx()-1, 0), approach.gety()];   // west
        endpoints[2] = [approach.getx(), Math.max(approach.gety()-1,0)];   // north
        break;
      default:
        alert("Switch in FindCombatPath broken.");
    }
    // all this min/max bs is to make sure we don't try to leave the map          
    
    DebugWrite("ai", "Searching for a path to these locations: (" +  endpoints[0][0] + "," + endpoints[0][1] + "),(" + endpoints[1][0] + "," + endpoints[1][1] + "),(" + endpoints[2][0] + "," + endpoints[2][1] + ").<br />");

    let available = [];
    let anyavailable = 0;
    for (let i=0;i<endpoints.length;i++) {
      let desttile = whomap.getTile(endpoints[i][0],endpoints[i][1]);
      if (desttile === "OoB") { available[i] = 0; }
      else if (desttile.getTopNPC()) { available[i] = 0; }
      else { available[i] = 1; anyavailable = 1;}
    }
    
    let availdests = [];
    if (anyavailable) {
      // remove from endpoints destinations that are occupied.
      // skip this step if they all are- in that case pretend none are and just get closer
      for (let i=0;i<endpoints.length;i++) {
        if (available[i]) {
          availdests.push(endpoints[i]);
        }
      }
    } else {
      availdests = endpoints;
    }
    
    let availpaths = [];
    for (let i=0;i<availdests.length;i++) {
      let evenmoretempgrid = temppathgrid.clone();
      if (whomap.getTile(availdests[i][0], availdests[i][1]) !== "OoB") {
        evenmoretempgrid.setWalkableAt(availdests[i][0], availdests[i][1], true);
        let tmp = finder.findPath(who.getx(),who.gety(),availdests[i][0],availdests[i][1],evenmoretempgrid);
        if (tmp) {
          availpaths[i] = tmp;
        }
      }
    }
    
    // next up- find the shortest of the available paths
    let shortest = [];
    for (let i = 0; i<availpaths.length; i++) {
      if (!availpaths[i]) { continue; }
      if (i === 0) {
        shortest = availpaths[i];
      } else if (availpaths[i].length < shortest.length) {
        shortest = availpaths[i];
      } else if (availpaths[i].length === shortest.length) {
        if (Math.random() < .5) {
          shortest = availpaths[i];
        }
      }
    }
    
    if (shortest.length) {
      shortest.shift(); // paths start with the starting location
      moved = StepOrSidestep(who,shortest[0],[approach.getx(),approach.gety()]);
    } else {
      moved = ais.Randomwalk(who,25,25,25,25);  // no path was found
    }
    
  }      
  return moved;
}

ais.Courier = function(who) {
  //stay a few steps away from the PC, check to see if both guards are cowards/dead and surrender if so.
  DebugWrite("ai", "Starting Courier AI.<br />");
  let couriermap = who.getHomeMap();
  let npcs = couriermap.npcs.getAll();
  let whox = who.getx();
  let whoy = who.gety();
  let stillfighting = 0;
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName() === "CourierGuardNPC") {
      if (!npcs[i].specials.coward) { stillfighting = 1; }
    }
  }
  
  if (stillfighting) {
    DebugWrite("ai", "Guards are still fighting!<br />");
    let runfrom = FindNearestNPC(who, "enemy");
    if (runfrom) {  // should be no way there can not be, but...
      let diffx = whox - runfrom.getx();
      let diffy = whoy - runfrom.gety();
      let rundest = [];
      let pathdest = [];
      let coin = Dice.roll("1d2");
      if ((Math.abs(diffx) > Math.abs(diffy)) || ((coin === 1) && (Math.abs(diffx) === Math.abs(diffy)))) {
        if (diffx > 0) {
          pathdest = [whox+1,whoy];
          rundest = [whomap.getWidth()-1,whoy];
        } else {
          pathdest = [whox-1,whoy];
          rundest = [0,whoy];
        }
        if (couriermap.getTile(pathdest[0],pathdest[1]) === "OoB") {
          pathdest = rundest;
          if (diffy > 0) { 
            pathdest = [pathdest[0],pathdest[1]+1];
            if (couriermap.getTile(pathdest[0],pathdest[1]) === "OoB") {
              pathdest = [pathdest[0],pathdest[1]-2];
            }
          } else {
            pathdest = [pathdest[0],pathdest[1]-1];
            if (couriermap.getTile(pathdest[0],pathdest[1]) === "OoB") {
              pathdest = [pathdest[0],pathdest[1]+2];
            }            
          }
        }
      } else {
        if (diffy > 0) {
          pathdest = [whox,whoy+1];
          rundest = [whox,whomap.getHeight()-1];
        } else {
          pathdest = [whox,whoy-1];
          rundest = [whox,0];
        }
        if (couriermap.getTile(pathdest[0],pathdest[1]) === "OoB") {
          pathdest = rundest;
          if (diffx > 0) { 
            pathdest = [pathdest[0]+1,pathdest[1]];
            if (couriermap.getTile(pathdest[0],pathdest[1]) === "OoB") {
              pathdest = [pathdest[0]-2,pathdest[1]];
            }
          } else {
            pathdest = [pathdest[0]-1,pathdest[1]];
            if (couriermap.getTile(pathdest[0],pathdest[1]) === "OoB") {
              pathdest = [pathdest[0]+2,pathdest[1]];
            }            
          }
        }
      }
      if (couriermap.getTile(pathdest[0],pathdest[1]) !== "OoB") {
        let trymove = StepOrSidestep(who,pathdest,rundest);    
      }
    }
  } else { 
    DebugWrite("ai", "Guards have fled!<br />");
    let currx = who.getx();
    let curry = who.gety();
    
    let mindist = currx;
    let dest = [0,curry];
    if (curry < currx) {
      mindist = curry;
      dest = [currx,0];
    }
    if (couriermap.getWidth()-1-currx < mindist) {
      mindist = couriermap.getWidth()-1-currx;
      dest = [couriermap.getWidth()-1,0];
    }
    if (couriermap.getHeight()-1-curry < mindist) {
      mindist = couriermap.getHeight()-1-curry;
      dest = [0,couriermap.getHeight()-1];
    }
    
    let runaway = 0;
    if (mindist > 0) {
      let path = couriermap.getPath(currx,curry,dest[0],dest[1],MOVE_WALK);
      path.shift();
      StepOrSidestep(who,[path[0][0],path[0][1]],[currx,0]);
    } else {
      runaway = 1;
    }
      
    if (!who.surrendered) {
      maintext.addText("The courier surrenders and drops the letter pouch!");
      let chest = localFactory.createTile("Chest");
      chest.addToContainer("CourierPouch",1);
      chest.addToContainer("Gold",30);
      couriermap.placeThing(currx,curry,chest);
      DrawMainFrame("one",who.getHomeMap(),currx,curry);
      who.surrendered = 1;
    }
    
    if (runaway) {
      couriermap.deleteThing(who);
      DUTime.removeEntityFrom(who);
      who.fled = 1;
      DrawMainFrame("one",who.getHomeMap(),currx,curry);
    }
    
  }
  return {fin:1};
}

ais.Justice = function(who) {
  console.log("Justice turn begins.");
  let retval = {fin:1};

  let pcadj = 0;
  let npcs = who.getHomeMap().npcs.getAll();

  for (let i=0;i<npcs.length;i++) {
    if (CheckAreEnemies(who,npcs[i])) {
      if (IsAdjacent(npcs[i],PC)) {
        pcadj = npcs[i];
      }
    }
  }

  if (pcadj) {
    console.log("Adjacent to PC: ");
    console.log(pcadj);
  }
  if (who.getHP() <= 2) {
    console.log("Justice is badly wounded and will flee.");
    retval.wait = 1; // animation will occur, we'll handle restarting the scheduler
    maintext.addText('Justice gasps, then says, "You are more formidable than I anticipated. But it will not avail you. What has been put into motion cannot be stopped! Good-bye!"');
    DU.gameflags.setFlag("justice_flees",1);
    maintext.setInputLine("&gt;[MORE]");
    maintext.drawTextFrame();
    gamestate.setMode("anykey");
    targetCursor.command="justice";
    targetCursor.justice = who;
    return retval;
  } else if (who.getHomeMap().getTile(who.getx(),who.gety()).isHostileTo(who)) {
    console.log("Justice is standing in a fire field.");
    let nearest = FindNearestNPC(who,"enemy");
    let diffx = who.getx()-nearest.getx();
    let diffy = who.gety()-nearest.gety();
    if ((Math.abs(diffy) >= Math.abs(diffx)) && (diffy > 0)) {
      let destx = who.getx();
      if (diffx > 0) { destx++; }
      else if (diffx < 0) { destx--; }
      StepOrSidestep(who, [who.getx(),who.gety()+1], [destx,who.gety()+1]);
      return retval;
    }
    if ((Math.abs(diffy) >= Math.abs(diffx)) && (diffy < 0)) {
      let destx = who.getx();
      if (diffx > 0) { destx++; }
      else if (diffx < 0) { destx--; }
      StepOrSidestep(who, [who.getx(),who.gety()-1], [destx,who.gety()-1]);
      return retval;
    }
    if ((Math.abs(diffx) > Math.abs(diffy)) && (diffx > 0)) {
      let desty = who.gety();
      if (diffy > 0) { desty++; }
      else if (diffy < 0) { desty--; }
      StepOrSidestep(who, [who.getx()+1,who.gety()], [who.getx()+1, desty]);
      return retval;
    }
    if ((Math.abs(diffx) > Math.abs(diffy)) && (diffx < 0)) {
      let desty = who.gety();
      if (diffy > 0) { desty++; }
      else if (diffy < 0) { desty--; }
      StepOrSidestep(who, [who.getx()-1,who.gety()], [who.getx()-1, desty]);
      return retval;
    }
  } else if ((who.getMana()<5) && (who.drankpotion)) {
    retval.wait = 1; // animation will occur, we'll handle restarting the scheduler
    console.log("Justice is out of mana for a second time.");
    maintext.addText('Justice growls and cries, "How is it that you still stand? No matter... what has been put into motion cannot be stopped. Good-bye!"');
    maintext.setInputLine("&gt;[MORE]");
    maintext.drawTextFrame();
    gamestate.setMode("anykey");
    DU.gameflags.setFlag("justice_flees",1);
    targetCursor.command="justice";
    targetCursor.justice = who;
    return retval;
  } else if (who.getMana()<5) {
    console.log("Justice downs a potion.")
    maintext.addText('Justice takes a potion from a pouch by her side, and drinks.');
    maintext.drawTextFrame();
    who.setMana(20);
    ShowEffect(who, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
    who.drankpotion = 1;
    return retval;
  } else if (!who.phase) {
    maintext.addText('Justice cries, "Now, welcome to MY domain. You were right, small fool. I AM behind all that has transpired. And now, I\'m afraid you know too much. Good-bye."');
    maintext.drawTextFrame();
    who.phase=1;
    return retval;
  } else if (who.phase === 1) {
    maintext.addText("Justice begins an incantation in a tongue that is not the language of magic you know... that you recognize as a language at all only because of the spaces between words. Two small portals open, and imps emerge, eyes blazing!");
    maintext.drawTextFrame();
    let imp = localFactory.createTile("ImpNPC");
    let combatmap = who.getHomeMap();
    combatmap.placeThing(5,8,imp);
    let imp2 = localFactory.createTile("ImpNPC");
    combatmap.placeThing(9,8,imp2);
    DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
    ShowEffect(imp, 3000, "spellsparkles-anim.gif", 0, COLOR_RED);
    ShowEffect(imp2, 3000, "spellsparkles-anim.gif", 0, COLOR_RED);
    who.phase = 2;
    return retval;
  } else if (who.phase === 2) {
    AnnounceSpellcast("Iron Flesh",who,who);
    magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].executeSpell(who,0,0,who);
    who.phase = 3;
    return retval;
  } else if (who.phase === 3) {
    AnnounceSpellcast("Protection",who,who);
    magic[SPELL_PROTECTION_LEVEL][SPELL_PROTECTION_ID].executeSpell(who,0,0,who);
    who.phase = 4;
    return retval; 
  } else {
    let nearest = FindNearestNPC(who,"enemy");
    console.log("Justice is nearest to:");
    console.log(nearest);
    let actions = [];
    let choice = 0;
    if (IsAdjacent(who,nearest)) {
      if (who.lastaction !== "shockwave") { actions.push({act: "shockwave", tgt: nearest}); }
      if (who.lastaction !== "blink") { actions.push({act: "blink", tgt: nearest}); }
      if (who.lastaction !== "iceball") { actions.push({act:"iceball", tgt: nearest}); }
      choice = 1;
      console.log("Justice is adjacent to an enemy, and so her actions list is:");
      console.log(actions);
    } else if (GetDistanceByPath(who,PC,MOVE_WALK) === 4) {
      console.log("PC is 4 steps away from Justice.");
      let field;
      let fea = who.getHomeMap().features.getAll();
      for (let i=0;i<fea.length;i++){
        if (fea[i].getName() === "FireField") { 
          if (((fea[i].getx() === 5) && (fea[i].gety() === 5)) ||
              ((fea[i].getx() === 5) && (fea[i].gety() === 9)) ||
              ((fea[i].getx() === 9) && (fea[i].gety() === 5)) ||
              ((fea[i].getx() === 9) && (fea[i].gety() === 9))) {
            // One of the fire fields that Justice didn't cast, continue
          } else {
            console.log("There is a field on the field that Justice created, so she will skip casting another Wall of Fire.");
            field = 1; 
          }
        }
      }
      if (!field) {
        let warpath = who.getHomeMap().getPath(who.getx(),who.gety(),PC.getx(),PC.gety(),MOVE_WALK);
        actions.push({act: "walloffire", tgt: {x:warpath[2][0],y:warpath[2][1]}});
        choice = 1;
      }
    } 
    if (!choice) {
      console.log("Justice hasn't made a choice yet...");
      if (pcadj) {
        // PC is next to an ally: explode them.
        let tgt = PC;
        if (Dice.roll("1d2") === 1) { tgt = pcadj; }
        actions.push({act:"explosion", tgt: tgt});
        // consider limiting frequency, but honestly not going to come up a lot
        console.log("PC is adjacent to one of the PC's allies. Justice will cast Explosion to catch them both. Adjacent ally is:");
        console.log(pcadj);
      } else {
        let imps;
        for (let i=0;i<npcs.length;i++) {
          if (npcs[i].getName() === "ImpNPC") { imps = 1; }
        }
        console.log("Are there imps? " + imps);
        if (!imps) {
          actions.push({act: "imps"});
          actions.push({act: "imps"});
          console.log("There were no imps, so adding summoning more to the actions list.");
        }
        let tgts = [PC];
        for (let i=0;i<npcs.length;i++) {
          if (CheckAreEnemies(who,npcs[i])) { 
            tgts.push(npcs[i]); 
          }
        }
        console.log("List of possible targets:");
        console.log(tgts);
        let tgt = tgts[Dice.roll("1d"+tgts.length+"-1")];
        console.log("Chose target:");
        console.log(tgt);
        actions.push({act:"fireball", tgt:tgt});
        actions.push({act:"iceball", tgt:tgt});
        if (who.getHP() < who.getMaxHP()) {
          actions.push({act:"lifedrain", tgt:tgt});
          // she won't cast Life Drain if she's unhurt
        }
  
        // check for PC or allies next to crystal, if so, add chance of Explosioning
        for (let i=0;i<tgts.length;i++) {
          let cry = 0;
          let north = who.getHomeMap().getTile(tgts[i].getx(),tgts[i].gety()-1).getTopNPC();
          let south = who.getHomeMap().getTile(tgts[i].getx(),tgts[i].gety()+1).getTopNPC();
          let east = who.getHomeMap().getTile(tgts[i].getx()+1,tgts[i].gety()).getTopNPC();
          let west = who.getHomeMap().getTile(tgts[i].getx()-1,tgts[i].gety()).getTopNPC();
          if (north) { if (north.getName() === "CrystalBarrierNPC") { cry = 1; } }
          if (south) { if (south.getName() === "CrystalBarrierNPC") { cry = 1; } }
          if (east) { if (east.getName() === "CrystalBarrierNPC") { cry = 1; } }
          if (west) { if (west.getName() === "CrystalBarrierNPC") { cry = 1; } }
          if (cry) { actions.push({act:"explosion",tgt: tgts[i]}); }
        }
      }
    }
    console.log("actions list:");
    console.log(actions);
    let roll = Dice.roll("1d"+actions.length+"-1");
    console.log("Rolled: " + roll);
    if (actions[roll].act === "blink") {
      AnnounceSpellcast("Blink",who);
      magic[SPELL_BLINK_LEVEL][SPELL_BLINK_ID].executeSpell(who,0,0);
      who.lastaction = "blink";
      return retval;
    } else if (actions[roll].act === "shockwave") {
      AnnounceSpellcast("Shockwave",who);
      magic[SPELL_SHOCKWAVE_LEVEL][SPELL_SHOCKWAVE_ID].executeSpell(who,0,0);
      who.lastaction = "shockwave";
      return retval;
    } else if (actions[roll].act === "iceball") {
      console.log(actions[roll].tgt);
      AnnounceSpellcast("Iceball",who,actions[roll].tgt);
      magic[SPELL_ICEBALL_LEVEL][SPELL_ICEBALL_ID].executeSpell(who,0,0,actions[roll].tgt);
      who.lastaction = "iceball";
      retval.wait = 1;
      return retval;
    } else if (actions[roll].act === "explosion") {
      AnnounceSpellcast("Explosion",who,actions[roll].tgt);
      magic[SPELL_EXPLOSION_LEVEL][SPELL_EXPLOSION_ID].executeSpell(who,0,0,actions[roll].tgt);
      who.lastaction = "explosion";
      return retval;
    } else if (actions[roll].act === "fireball") {
      AnnounceSpellcast("Fireball",who,actions[roll].tgt);
      magic[SPELL_FIREBALL_LEVEL][SPELL_FIREBALL_ID].executeSpell(who,0,0,actions[roll].tgt);
      who.lastaction = "fireball";
      retval.wait = 1;
      return retval;
    } else if (actions[roll].act === "lifedrain") {
      AnnounceSpellcast("Life Drain",who,actions[roll].tgt);
      magic[SPELL_LIFE_DRAIN_LEVEL][SPELL_LIFE_DRAIN_ID].executeSpell(who,0,0,actions[roll].tgt);
      who.lastaction = "lifedrain";
      return retval;
    } else if (actions[roll].act === "walloffire") {
      AnnounceSpellcast("Wall of Flame",who);
      magic[SPELL_WALL_OF_FLAME_LEVEL][SPELL_WALL_OF_FLAME_ID].executeSpell(who,0,0,actions[roll].tgt);
      who.lastaction = "walloffire";
      return retval;
    } else if (actions[roll].act === "imps") {
      let impcoords = [[5,6],[5,8],[9,6],[9,8]];
      let tgtcoords = [];
      impcoords = ShuffleArray(impcoords);
      for (let i=0; i<impcoords.length; i++) {
        let npcs = who.getHomeMap().getTile(impcoords[i][0],impcoords[i][1]).getTopNPC();
        if (!npcs) { tgtcoords.push(impcoords[i]); }
      }
      if (tgtcoords.length < 2) {
        let altcoords = [[6,6],[4,6],[6,8],[4,8],[8,6],[10,6],[8,8],[10,8]];
        altcoords = ShuffleArray(altcoords);
        let j=0;
        while ((tgtcoords.length < 2) && (j<altcoords.length)) {
          let npcs = who.getHomeMap().getTile(altcoords[j][0],altcoords[j][1]).getTopNPC();
          if (!npcs) { tgtcoords.push(altcoords[j]); }  
        }
      }

      maintext.addText("Justice repeats her summoning incantation. Two small portals open, and imps emerge, eyes blazing!");
      maintext.drawTextFrame();
      let imp = localFactory.createTile("ImpNPC");
      let imp2;
      let combatmap = who.getHomeMap();
      combatmap.placeThing(tgtcoords[0][0],tgtcoords[0][1],imp);
      if (tgtcoords.length >= 2) {
        imp2 = localFactory.createTile("ImpNPC");
        combatmap.placeThing(tgtcoords[1][0],tgtcoords[1][1],imp2);
      }
      DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
      ShowEffect(imp, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
      if (imp2) {
        ShowEffect(imp2, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
      }
      return retval;
    } else {
      console.log("Justice failed to act. What's up?");
      console.log(actions);

      alert("Justice failed to act.");
      return retval;
    }

  }
}

ais.ai_cast = function(who) {
  if (who.getMana() <= 1) { DebugWrite("ai", "In ai_cast, but has no mana."); return; }
  DebugWrite("ai", "In ai_cast... choosing how to act.");

  let themap = who.getHomeMap();

  if (DU.gameflags.getFlag("negate")[themap.getName()]) {
    DebugWrite("ai", "In ai_cast... but magic is negated.");
    return;
  }

  let enemies = [];
  let allies = [];
  let weakenemies = [];
  let strongenemies = [];
  let damagedallies = [];
  let strongallies = [];
  let enemylevel = 0;
  let alliedlevel = who.getLevel()/2 * ((who.getHP()/who.getMaxHP())+1);
  let npcs = themap.npcs.getAll();
  npcs.push(PC);
  for (let i=0;i<npcs.length;i++) {
    if (GetDistance(who.getx(),who.gety(),npcs[i].getx(),npcs[i].gety()) < 5.5) {
      if (CheckAreEnemies(npcs[i],who)) {
        if (themap.getLOS(who.getx(), who.gety(), npcs[i].getx(), npcs[i].gety()) < LOS_THRESHOLD) {
          enemies.push(npcs[i]);
          let el = npcs[i].getLevel()/2 * ((npcs[i].getHP()/npcs[i].getMaxHP())+1);
          enemylevel += el;
          if (el >= who.getLevel()/2) { strongenemies.push(npcs[i]); }
          else { weakenemies.push(npcs[i]); }
        }
      } else {
        if (themap.getLOS(who.getx(), who.gety(), npcs[i].getx(), npcs[i].gety()) < LOS_THRESHOLD) {
          allies.push(npcs[i]);
          let al = npcs[i].getLevel()/2 * ((npcs[i].getHP()/npcs[i].getMaxHP())+1);
          alliedlevel += al;
          if (al >= who.getLevel()/2) { strongallies.push(npcs[i]); }
          if (npcs[i].getHP()/npcs[i].getMaxHP() < .5) { damagedallies.push(npcs[i]); }
        }
      }
    }
  }
  DebugWrite("ai", "Current tally: enemy power " + enemylevel + ", ally power " + alliedlevel);
  let choices = [];
  if (who.spellsknown.heal) {
    if (damagedallies.length && (who.getMana() >= 2) && (who.getLevel() >= 2)) { 
      DebugWrite("ai", "There are damaged allies- adding HEAL to list.");
      choices.push("heal"); 
    }
    if ((who.getHP()/who.getMaxHP() < .5) && (who.getMana() >= 2) && (who.getLevel() >= 2)) { 
      DebugWrite("ai", "I'm at half health, adding HEALSELF to list.");  
      choices.push("healself"); 
    }
    if (who.getSpellEffectsByName("Poison")) { 
      DebugWrite("ai", "I am poisoned, adding CURE to list.");  
      choices.push("cure"); 
    }
    if ((who.getLevel() >= 3) && (who.getMana() >= 3)) {
      let ses = who.getSpellEffects();
      let needdispel = 0;
      for (let i=0;i<ses.length;i++) { 
        if (ses[i].checkType("Debuff")) { needdispel = 1; }
      }
      if (needdispel) { 
        DebugWrite("ai", "I have debuffs, adding DISPEL to list."); 
        choices.push("dispel"); 
      }
    }
  }
  if (who.spellsknown.buff && (who.getMana() >= 2) && (who.getLevel() >= 2)) {
    if (strongallies.length) { 
      DebugWrite("ai", "I have allies that are strong enough to be worth buffing. Adding BUFFOTHER to list.");  
      choices.push("buffother"); 
    }
    DebugWrite("ai", "Adding BUFFSELF to the list. Always worth considering buffing myself.");
    choices.push("buffself");
  }
  if (who.spellsknown.highbuff && (who.getLevel() >= 7) && (who.getMana() >= 7) && (!who.getSpellEffectsByName("Invulnerability") || !who.getSpellEffectsByName("Quickness"))) {
    DebugWrite("ai", "Adding HIGHBUFFSELF to the list.");
    choices.push("highbuffself");
  }
  if (who.spellsknown.lowcontrol) {
    if (strongenemies.length) { 
      DebugWrite("ai", "There are strong enemies. Adding LOWCONTROLENEMIES to the list.");
      choices.push("lowcontrolenemies"); 
    }
  }
  if (who.spellsknown.highcontrol && (who.getLevel() >= 6) && (who.getMana() >= 6)) {
    if (strongenemies.length) {
      DebugWrite("ai", "There are strong enemies. Adding HIGHCONTROLENEMIES to the list.");
      choices.push("highcontrolenemies");
    }
  }
  if (who.spellsknown.summon) {
    if (((enemylevel > .5*alliedlevel) || !who.summoned) && (who.getMana() >= 2) && (who.getLevel() >= 2)  && (enemies.length > 0)) { 
      DebugWrite("Either enemy level is over half of allied level, or I just haven't summoned anything yet; adding SUMMON to the list."); 
      choices.push("summon"); 
    }
  }
  if (who.spellsknown.attack && (who.getMana() >= 2) && (who.getLevel() >= 2) && (enemies.length > 0)) {
    DebugWrite("ai","Adding ATTACK to the list.");
    choices.push("attack");
  }
  if (who.spellsknown.highattack && (who.getMana() > 5) && (who.getLevel() > 5) && (enemies.length > 0)) {
    DebugWrite("ai","Adding HIGHATTACK to the list.");
    choices.push("highattack");
  }
  console.log(choices);
  if (choices.length) {
    let dr = Dice.roll("1d"+choices.length+"-1");
    if (choices[dr] === "heal") {
      DebugWrite("ai", "I have chosen to HEAL.");
      dr = Dice.roll("1d"+damagedallies.length+"-1");
      if ((who.getLevel() >= 4) && (who.getMana() >= 4) && (damagedallies[dr].getMaxHP() - damagedallies[dr].getHP() > 20)) {
        AnnounceSpellcast("Heal",who,damagedallies[dr]);
        magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID].executeSpell(who,0,0,damagedallies[dr]);
      }
      else if (who.getMana() >= 2) {
        AnnounceSpellcast("Lesser Heal",who,damagedallies[dr]);
        magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].executeSpell(who,0,0,damagedallies[dr]);
      }
    } else if (choices[dr] === "healself") {
      DebugWrite("ai", "I have chosen to HEAL MYSELF.");
      if ((who.getLevel() >= 4) && (who.getMana() >= 4) && (who.getMaxHP() - who.getHP() > 20)) {
        AnnounceSpellcast("Heal",who);
        magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID].executeSpell(who,0,0,who);
      } else if (who.getMana() >= 2) {
        AnnounceSpellcast("Lesser Heal",who);
        magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].executeSpell(who,0,0,who);
      }
    } else if (choices[dr] === "cure") {
      AnnounceSpellcast("Cure",who);
      magic[SPELL_CURE_LEVEL][SPELL_CURE_ID].executeSpell(who,0,0);
    } else if (choices[dr] === "dispel") {
      AnnounceSpellcast("Dispel",who);
      magic[SPELL_DISPEL_LEVEL][SPELL_DISPEL_ID].executeSpell(who,0,0);
    } else if (choices[dr] === "buffother") {
      dr = Dice.roll("1d"+strongallies.length+"-1");
      let tgt = strongallies[dr];
      let spelloptions = [];
      if (!tgt.getSpellEffectsByName("IronFlesh")) {
        spelloptions.push("IronFlesh");
      }
      if (!tgt.getSpellEffectsByName("Protection")) {
        spelloptions.push("Protection");
      }
      if (!tgt.getSpellEffectsByName("Blessing") && (who.getMana() >= 4) && (who.getLevel() >= 4)) {
        spelloptions.push("Blessing");
      }
      dr = Dice.roll("1d"+spelloptions.length+"-1");
      if (spelloptions[dr] === "IronFlesh") {
        AnnounceSpellcast("Iron Flesh",who,tgt);
        magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].executeSpell(who,0,0,tgt);
      } else if (spelloptions[dr] === "Protection") {
        AnnounceSpellcast("Protection",who,tgt);
        magic[SPELL_PROTECTION_LEVEL][SPELL_PROTECTION_ID].executeSpell(who,0,0,tgt);
      } else if (spelloptions[dr] === "Blessing") {
        AnnounceSpellcast("Blessing",who,tgt);
        magic[SPELL_BLESSING_LEVEL][SPELL_BLESSING_ID].executeSpell(who,0,0,tgt);
      }
    } else if (choices[dr] === "buffself") {
      let spelloptions = [];
      if (!who.getSpellEffectsByName("IronFlesh")) {
        spelloptions.push("IronFlesh");
      }
      if (!who.getSpellEffectsByName("Protection")) {
        spelloptions.push("Protection");
      }
      if (!who.getSpellEffectsByName("Blessing") && (who.getMana() >= 4) && (who.getLevel() >= 4)) {
        spelloptions.push("Blessing");
      }
      if (!who.getSpellEffectsByName("FireArmor") && (who.getMana() >= 3) && (who.getLevel() >= 3)) {
        spelloptions.push("FireArmor");
      }
      if (!who.getSpellEffectsByName("MirrorWard") && (who.getMana() >= 5) && (who.getLevel() >= 5)) {
        spelloptions.push("MirrorWard");
      }
      dr = Dice.roll("1d"+spelloptions.length+"-1");
      if (spelloptions[dr] === "IronFlesh") {
        AnnounceSpellcast("Iron Flesh",who);
        magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].executeSpell(who,0,0,who);
      } else if (spelloptions[dr] === "Protection") {
        AnnounceSpellcast("Protection",who);
        magic[SPELL_PROTECTION_LEVEL][SPELL_PROTECTION_ID].executeSpell(who,0,0,who);
      } else if (spelloptions[dr] === "Blessing") {
        AnnounceSpellcast("Blessing",who);
        magic[SPELL_BLESSING_LEVEL][SPELL_BLESSING_ID].executeSpell(who,0,0,who);
      } else if (spelloptions[dr] === "FireArmor") {
        AnnounceSpellcast("Fire Armor",who);
        magic[SPELL_FIRE_ARMOR_ID][SPELL_FIRE_ARMOR_ID].executeSpell(who,0,0);
      } else if (spelloptions[dr] === "MirrorWard") {
        AnnounceSpellcast("Mirror Ward",who);
        magic[SPELL_MIRROR_WARD_ID][SPELL_MIRROR_WARD_ID].executeSpell(who,0,0);
      }
    } else if (choices[dr] === "highbuffself") {
      if (!who.getSpellEffectsByName("Invulnerability") && (who.getMana() >= 7) && (who.getLevel() >= 7)) {
        spelloptions.push("Invulnerability");
      }
      if (!who.getSpellEffectsByName("Quickness") && (who.getMana() >= 8) && (who.getLevel() >= 8)) {
        spelloptions.push("Quickness");
      }
      dr = Dice.roll("1d"+spelloptions.length+"-1");
      if (spelloptions[dr] === "Invulnerability") {
        AnnounceSpellcast("Invulnerability",who);
        magic[SPELL_INVULNERABILITY_ID][SPELL_INVULNERABILITY_ID].executeSpell(who,0,0);
      } else if (spelloptions[dr] === "Quickness") {
        AnnounceSpellcast("Quickness",who);
        magic[SPELL_QUICKNESS_ID][SPELL_QUICKNESS_ID].executeSpell(who,0,0);
      }
    } else if (choices[dr] === "summon") {
      let spelloptions = [];
      if ((who.getMana() >= 2) && (who.getLevel() >= 2)) {
        spelloptions.push("Illusion");
      }
      if ((who.getMana() >= 5) && (who.getLevel() >= 5)) {
        spelloptions.push("SummonAlly");
      }
      if ((who.getMana() >= 8) && (who.getLevel() >= 8)) {
        spelloptions.push("SummonDaemon");
      }
      dr = Dice.roll("1d"+spelloptions.length+"-1");
      let putnear = FindNearestNPC(who,"enemy");
      let placementoptions = [];
      let badoptions = [];
      let okoptions = [];
      for (let i=who.getx()-3;i<=who.getx()+3;i++) {
        for (let j=who.gety()-3;j<=who.gety()+3;j++) {
          let tl = themap.getTile(i,j);
          if (tl !== "OoB") {
            if (!tl.getTopFeature() && !tl.getTopNPC() && !tl.getTopPC()) {
              let foedist = GetDistance(i,j,putnear.getx(),putnear.gety());
              let mydist = GetDistance(who.getx(),who.gety(),putnear.getx(),putnear.gety());
              if (foedist < mydist) { placementoptions.push([i,j]); }
              else if (foedist === mydist) { okoptions.push([i,j]); }
              else { badoptions.push([i,j]); }
            }
          }
        }
      }
      let opts = [];
      if (placementoptions.length) { opts = placementoptions; }
      else if (okoptions.length) { opts = okoptions; }
      else if (badoptions.length) { opts = badoptions; }
      let tgt = {};
      if (opts.length) {
        let optdr = Dice.roll("1d"+opts.length+"-1");
        tgt.x = opts[optdr][0];
        tgt.y = opts[optdr][1];
        if (spelloptions[dr] === "Illusion") {
          AnnounceSpellcast("Illusion",who);
          magic[SPELL_ILLUSION_LEVEL][SPELL_ILLUSION_ID].executeSpell(who,0,0,tgt);
        } else if (spelloptions[dr] === "SummonAlly") {
          AnnounceSpellcast("Summon Ally",who);
          magic[SPELL_SUMMON_ALLY_LEVEL][SPELL_SUMMON_ALLY_ID].executeSpell(who,0,0,tgt);
        } else if (spelloptions[dr] === "SummonDaemon") {
          AnnounceSpellcast("Summon Daemon",who);
          magic[SPELL_CONJURE_DAEMON_LEVEL][SPELL_CONJURE_DAEMON_ID].executeSpell(who,0,0,tgt);
        }
      }
    } else if (choices[dr] === "controlenemies") {
      let spelloptions = [];
      spelloptions.push("Distract");
      spelloptions.push("Vulnerability");
      if ((who.getLevel() >= 5) && (who.getMana() >= 5)) {
//        spelloptions.push("CrystalPrison");
        spelloptions.push("Paralyze");
      }
      if ((who.getLevel() >= 6) && (who.getMana() >= 6)) {
        spelloptions.push("Jinx");
        spelloptions.push("MassCurse");
      }
      if ((who.getLevel() >= 7) && (who.getMana() >= 7)) {
        if (enemies.length > 1) {
          spelloptions.push("Charm");
          spelloptions.push("Fear");
        }
      }
      if ((who.getLevel() >= 8) && (who.getMana() >= 8)) {
        if (!who.getSpellEffectsByName("TimeStop")) {
          spelloptions.push("TimeStop");
        }
      }      
      let dr = Dice.roll("1d"+spelloptions.length+"-1");
      if (spelloptions[dr] === "Distract") {
        AnnounceSpellcast("Distract",who);
        magic[SPELL_DISTRACT_LEVEL][SPELL_DISTRACT_ID].executeSpell(who,0,0);
      } else if (spelloptions[dr] === "Vulnerability") {
        if (strongenemies.length) {
          let enrol = Dice.roll("1d"+strongenemies.length+"-1");
          AnnounceSpellcast("Vulnerability",who,strongenemies[enrol]);
          magic[SPELL_VULNERABILITY_LEVEL][SPELL_VULNERABILITY_ID].executeSpell(who,0,0,strongenemies[enrol]);
        } else {
          let enrol = Dice.roll("1d"+enemies.length+"-1");
          AnnounceSpellcast("Vulnerability",who,enemies[enrol]);
          magic[SPELL_VULNERABILITY_LEVEL][SPELL_VULNERABILITY_ID].executeSpell(who,0,0,enemies[enrol]);
        }
      } else if (spelloptions[dr] === "CrystalPrison") {
        let putnear = FindNearestNPC(who,"enemy");
        let placementoptions = [];
        for (let i=who.getx()-3;i<=who.getx()+3;i++) {
          for (let j=who.gety()-3;j<=who.gety()+3;j++) {
            let tl = themap.getTile(i,j);
            if (tl !== "OoB") {
              if (!tl.getTopFeature() && !tl.getTopNPC() && !tl.getTopPC()) {
                let foedist = GetDistance(i,j,putnear.getx(),putnear.gety());
                let mydist = GetDistance(who.getx(),who.gety(),putnear.getx(),putnear.gety());
                if ((foedist < mydist) && (GetDistance(who.getx(),who.gety(),i,j) < mydist)) { placementoptions.push([i,j]); }
              }
            }
          }
        }
        if (placementoptions.length) {
  // Turned off here
          // if crystal prison is uncommented above, finish here
        }
      } else if (spelloptions[dr] === "Paralyze") {
        let tgt;
        if (strongenemies.length) {
          let dr2 = Dice.roll("1d"+strongenemies.length+"-1");
          tgt = strongenemies[dr2];
        } else {
          let dr2 = Dice.roll("1d"+enemies.length+"-1");
          tgt = enemies[dr2];
        }
        AnnounceSpellcast("Paralyze",who,tgt);
        magic[SPELL_PARALYZE_LEVEL][SPELL_PARALYZE_ID].executeSpell(who,0,0,tgt);
      } else if (spelloptions[dr] === "MassCurse") {
        AnnounceSpellcast("Mass Curse",who);
        magic[SPELL_MASS_CURSE_LEVEL][SPELL_MASS_CURSE_ID].executeSpell(who,0,0);
      } else if (spelloptions[dr] === "Charm") {
        let enemiesnopc = [];
        for (let i=0;i<enemies.length;i_++) {
          if (!enemies[i].checkType("PC")) { enemiesnopc.push(enemies[i]); }
        }
        let dr2 = Dice.roll("1d"+enemiesnopc.length+"-1");
        AnnounceSpellcast("Charm",who,tgt);
        magic[SPELL_CHARM_LEVEL][SPELL_CHARM_ID].executeSpell(who,0,0,enemiesnopc[dr2]);
      } else if (spelloptions[dr] === "Fear") {
        AnnounceSpellcast("Fear",who);
        magic[SPELL_FEAR_LEVEL][SPELL_FEAR_ID].executeSpell(who,0,0);
      } else if (spelloptions[dr] === "TimeStop") {
        AnnounceSpellcast("Time Stop",who);
        magic[SPELL_TIME_STOP_LEVEL][SPELL_TIME_STOP_ID].executeSpell(who,0,0);
      }
    } else if ((choices[dr] === "attack") || (choices[dr] === "highattack")) {
      let spelloptions = [];
      let cho = choices[dr];

      if (cho === "attack") {
        if (who.getMana()) {
          if ((!who.spellsknown.highattack) || (who.getMana() < 5)) {
            spelloptions.push("MagicBolt");
          }
        }
        if ((who.getLevel() >= 3) && (who.getMana() >= 3)) {
          if (!who.spellsknown.banned || !who.spellsknown.banned.includes("Fire")) {
            spelloptions.push("Fireball");
          }
        }
        if ((who.getLevel() >= 4) && (who.getMana() >= 4)) {
          if (!who.spellsknown.banned || !who.spellsknown.banned.includes("Ice")) {
            spelloptions.push("Iceball");
          }
          spelloptions.push("LifeDrain");
        }
      }

      let pretarget = {};
      if (enemies.length > 1) {
        let numadj = [];
        let numwi2 = [];
        let numwi3 = 0;
        let numwi4 = 0;
        let numadjtome = 0;
        for (let i=0;i<enemies.length;i++) {
          numadj[i] = 0;
          numwi2[i] = 0;
          if (IsAdjacent(enemies[i],who)) {
            numadjtome++;
          }
          if (GetDistance(who.getx(),who.gety(),enemies[i].getx(),enemies[i].gety()) <= 3) {
            numwi3++;
          }
          if (GetDistance(who.getx(),who.gety(),enemies[i].getx(),enemies[i].gety()) <= 4) {
            numwi4++;
          }
          for (let j=0;j<enemies.length;j++) {
            if (i !== j) {
              if (IsAdjacent(enemies[i],enemies[j])) {
                numadj[i]++;
              }
              if (GetDistance(enemies[i].getx(),enemies[i].gety(),enemies[j].getx(),enemies[j].gety()) <= 2) {
                numwi2[i]++;
              }
            }
          }
        }
        let maxadj = 0;
        let maxnear2 = 0;
        for (let i=0;i<enemies.length;i++) {
          if (numadj[i] > maxadj) {
            maxadj = numadj[i];
            pretarget.poisoncloud = enemies[i];
          }
          if (numwi2[i] > maxnear2) {
            maxnear2 = numwi2[i];
            pretarget.explosion = enemies[i];
          }
        }
        if (pretarget.poisoncloud && (cho === "attack")) {
          spelloptions.push("PoisonCloud");
        }
        if (pretarget.explosion && (cho === "highattack")) {
          spelloptions.push("Explosion");
        }
        if ((numadjtome > 1) && (who.getLevel() >= 7) && (who.getMana() >= 7) && (cho === "highattack")) { 
          if (!who.spellsknown.banned || !who.spellsknown.banned.includes("Ice")) {
            spelloptions.push("FireIce");
          }
        }
        if ((numwi3 > 1) && (who.getLevel() >= 4) && (who.getMana() >= 4) && (cho === "attack")) {
          spelloptions.push("Smite");
        } 
        if ((numwi4 > 1) && (who.getLevel() >= 7) && (who.getMana() >= 7) && (cho === "highattack")) {
          spelloptions.push("MeteorSwarm");
        }
        if ((numwi4 > 1) && (who.getLevel() >= 8) && (who.getMana() >= 8) && (cho === "highattack")) {
          spelloptions.push("Conflagration");
        }
        
      }

      let sroll = Dice.roll("1d"+spelloptions.length+"-1");
      if (spelloptions[sroll] === "MagicBolt") {
        let er = Dice.roll("1d"+enemies.length+"-1");
        AnnounceSpellcast("Magic Bolt",who,enemies[er]);
        magic[SPELL_MAGIC_BOLT_LEVEL][SPELL_MAGIC_BOLT_ID].executeSpell(who,0,0,enemies[er]);
        return "special_wait";
      }
      if (spelloptions[sroll] === "Fireball") {
        let er = Dice.roll("1d"+enemies.length+"-1");
        AnnounceSpellcast("Fireball",who,enemies[er]);
        magic[SPELL_FIREBALL_LEVEL][SPELL_FIREBALL_ID].executeSpell(who,0,0,enemies[er]);
        return "special_wait";
      }
      if (spelloptions[sroll] === "Iceball") {
        let er = Dice.roll("1d"+enemies.length+"-1");
        AnnounceSpellcast("Iceball",who,enemies[er]);
        magic[SPELL_ICEBALL_LEVEL][SPELL_ICEBALL_ID].executeSpell(who,0,0,enemies[er]);
        return "special_wait";
      }
      if (spelloptions[sroll] === "LifeDrain") {
        let er = Dice.roll("1d"+enemies.length+"-1");
        AnnounceSpellcast("Life Drain",who,enemies[er]);
        magic[SPELL_LIFE_DRAIN_LEVEL][SPELL_LIFE_DRAIN_ID].executeSpell(who,0,0,enemies[er]);
      }
      if (spelloptions[sroll] === "PoisonCloud") {
        AnnounceSpellcast("Poison Cloud",who);
        magic[SPELL_POISON_CLOUD_LEVEL][SPELL_POISON_CLOUD_ID].executeSpell(who,0,0,{x:pretarget.poisoncloud.getx(),y:pretarget.poisoncloud.gety()});
      }
      if (spelloptions[sroll] === "Explosion") {
        AnnounceSpellcast("Explosion",who);
        magic[SPELL_EXPLOSION_LEVEL][SPELL_EXPLOSION_ID].executeSpell(who,0,0,pretarget.explosion);
      }
      if (spelloptions[sroll] === "FireIce") {
        AnnounceSpellcast("Fire and Ice",who);
        magic[SPELL_FIRE_AND_ICE_LEVEL][SPELL_FIRE_AND_ICE_ID].executeSpell(who,0,0);
      }
      if (spelloptions[sroll] === "Smite") {
        AnnounceSpellcast("Smite",who);
        magic[SPELL_SMITE_LEVEL][SPELL_SMITE_ID].executeSpell(who,0,0);
      }
      if (spelloptions[sroll] === "MeteorSwarm") {
        AnnounceSpellcast("Meteor Swarm",who);
        magic[SPELL_METEOR_SWARM_LEVEL][SPELL_METEOR_SWARM_ID].executeSpell(who,0,0);
        return "special_wait";
      }
      if (spelloptions[sroll] === "Conflagration") {
        AnnounceSpellcast("Conflagration",who);
        magic[SPELL_CONFLAGRATION_LEVEL][SPELL_CONFLAGRATION_ID].executeSpell(who,0,0);
      }

    }
  }
  return "special";
}

ais.ai_teleport = function(who) {
  if (Dice.roll("1d6") === 1) {
    let tgt = FindNearestNPC(who,"enemy");
    let opts = [];
    let themap = who.getHomeMap();
    for (let i=-4;i<=4;i++) {
      for (let j=-4;j<=4;j++) {
        let tile = themap.getTile(tgt.getx()+i,tgt.gety()+j);
        if (tile !== "OoB") {
          if (!tile.getTopFeature() && !tile.getTopNPC() && !tile.getTopPC()) {
            opts.push([tgt.getx()+i,tgt.gety()+j]);
          }
        }
      }
    }
    if (opts.length) {
      let tries = 0;
      while (tries < 10) {
        let op = Dice.roll("1d"+opts.length+"-1");
        let path = themap.getPath(tgt.getx(),tgt.gety(),opts[op][0],opts[op][1],who.getMovetype());
        if (path) {
          themap.moveThing(opts[op][0],opts[op][1],who);
          ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_BLUE);
          return;
        }
        tries++;
      }
    }
  }
}

function AnnounceSpellcast(spellname,caster,target) {
  let txt;
  if (target) {
    if (target === caster) {
      txt = `${caster.getFullDesc()} casts ${spellname} on ${caster.getGenderedTerms().reflexive}.`;
    } else {
      txt = `${caster.getFullDesc()} casts ${spellname} on ${target.getFullDesc()}.`;
    }
  } else {
    txt = `${caster.getFullDesc()} casts ${spellname}.`;
  }
  txt = txt.charAt(0).toUpperCase() + txt.slice(1);
  maintext.addText(txt);
  return txt;
}

ais.ai_sing = function(who) {
  DebugWrite("ai",who.getName() + " is trying to sing.");
  let pref = who.getPrefix();
  if ((pref === "a") || (pref === "an")) { pref = "the"; }
  let desc = who.getDesc();
  if (who.getDesc() !== who.getNPCName()) {
    desc = pref + " " + desc;
  }
  let mybark = `${desc} strums and sings a song.`;
  mybark = mybark.charAt(0).toUpperCase() + mybark.slice(1);

  let options = [];
  if (who.getHP()/who.getMaxHP() < .5) { options[0] = "heal"; }
  
  // have at least 2 friends within 5 tiles?
  let npcs = who.getHomeMap().npcs.getAll();
  let count = 0;
  let moralelist = [];
  for (let i=0;i<npcs.length;i++) {
    if ((npcs[i].getAttitude() === who.getAttitude()) && (npcs[i] !== who) && (GetDistance(who.getx(),who.gety(),npcs[i].getx(),npcs[i].gety()) < 6)) { 
      count++; 
      moralelist.push(npcs[i]);
    }
  }
  if (count >= 2) { options.push("morale"); }

  let foe = FindNearestNPC(who,"enemy");
  if (foe && (GetDistance(who.getx(),who.gety(),foe.getx(),foe.gety()) < 5)) { options.push("demoralize"); } 

  if (options.length) {
    let dieroll = Dice.roll("1d"+options.length+"-1");
    if (options[dieroll] === "heal") {
      let healcast = magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].executeSpell(who,0,1,who);
      let tmpbark = `${desc} looks healthier.`;
      tmpbark = tmpbark.charAt(0).toUpperCase() + tmpbark.slice(1);
      mybark += `<br />${tmpbark}`;
      if (IsObjectVisibleOnScreen(who)) {
        maintext.addText(mybark);
      }
      return "special";
    } else if (options[dieroll] === "morale") {
      for (let i=0;i<moralelist.length;i++) {
        let dur = SCALE_TIME * 2;
        let power = 1;
        let endtime = dur + DU.DUTime.getGameClock();
        let levobj = localFactory.createTile("Blessing");
        levobj.setPower(power);
        levobj.setExpiresTime(endtime);
  
        moralelist[i].addSpellEffect(levobj, 1 );
      }
      if (IsVisibleOnScreen(who.getx(),who.gety())) {
        mybark += `${desc}'s allies are cheered!`;
        maintext.addText(mybark);
        DUPlaySound("sfx_lute");
      }
      return "special";
    } else if (options[dieroll] === "demoralize") {
      maintext.addText(mybark);
      let discast = magic[SPELL_DISTRACT_LEVEL][SPELL_DISTRACT_ID].executeSpell(who,0,1);
      DUPlaySound("sfx_lute");
      return "special";
    }
  }
}

ais.ai_breed = function(who) {
  if (!who.fed) { return; }
  maintext.addText("The well-fed gremlin vibrates violently in place! Something happens!");
  let coordopts = FindEmptyAdjacent(who, 1);
  if (coordopts[0]) {
    let newgrem = localFactory.createTile("GremlinNPC");
    delete who.fed;
    who.getHomeMap().placeThing(coordopts[0],coordopts[1],newgrem);
  }
  return "special";
}

ais.ai_sleep = function(who) {
  console.log("In ai_sleep");
  let themap = who.getHomeMap();
  let npcs = themap.npcs.getAll();
  let sleeptargets = [];
  if ((GetDistance(PC.getx(),PC.gety(),who.getx(),who.gety()) <5) && (PC.getHomeMap() === themap)) {
    sleeptargets.push(PC);
  }
  for (let i=0;i<npcs.length;i++) {
    if (CheckAreEnemies(npcs[i],who) && (GetDistance(who.getx(),who.gety(),npcs[i].getx(),npcs[i].gety()) < 5)) { sleeptargets.push(npcs[i]); }
  }
  if (sleeptargets.length) {
    let result = Dice.roll(`1d${sleeptargets.length}-1`);
    let desc = "the " + sleeptargets[result].getDesc();
    if (sleeptargets[result] === PC) { 
      maintext.addText("The " + who.getDesc() + " looks intently at you!");
    } else {
      maintext.addText("The " + who.getDesc() + " looks intently at " + desc + "!");
    }
    if (CheckResist(who,sleeptargets[result],0,0)) {
      if (sleeptargets[result] === PC) { maintext.addText("You feel drowsy, but shake it off."); }
      else { maintext.addText("The " + desc + " feels drowsy, but shakes it off."); }
    } else {
      if (sleeptargets[result] === PC) { maintext.addText("You fall asleep!"); }
      else { maintext.addText("The " + desc + " falls asleep!"); }

      if (sleeptargets[result].getSpellEffectsByName("Sleep")) { return; }
      let fieldeffect = localFactory.createTile("Sleep");
      
      let duration = Math.max((Dice.roll("2d3") - sleeptargets[result].getInt()/20), 1) * SCALE_TIME;
      fieldeffect.setExpiresTime(duration + DUTime.getGameClock());
      sleeptargets[result].addSpellEffect(fieldeffect);
      ShowEffect(sleeptargets[result], 1000, "spellsparkles-anim.gif", 0, COLOR_PURPLE);
      
      DrawCharFrame();

    }
  }
  return "special";
}

ais.ai_handle = function(who) {
  if (!who.summoned) {
    let coord = FindEmptyAdjacent(who,1);
    if (coord[0]) {
      who.meleeChance = 80;
      maintext.addText("The " + who.getDesc() + " summons an animal!");
      let animal = localFactory.createTile("PythonNPC");
      who.summoned = animal;
      animal.summonedby = who;
      who.getHomeMap().placeThing(coord[0],coord[1],animal);
    } else {return "special";}
  }
}

ais.ai_summonearthelemental = function(who) {
  if (!who.eversummoned) {
    let coord = FindEmptyAdjacent(who,1);
    if (coord[0]) {
      maintext.addText("The " + who.getDesc() + " summons an earth elemental!");
      let elem = localFactory.createTile("EarthElementalNPC");
      delete who.specials.summonearthelemental;
      who.eversummoned = 1;
      who.summoned = elem;
      elem.summonedby = who;
      who.getHomeMap().placeThing(coord[0],coord[1],elem);
    } else {return;}
  }
}

ais.ai_necromancer = function(who) {
  let coord = FindEmptyAdjacent(who,1);
  if (coord[0]) {
    maintext.addText("The " + who.getDesc() + " summons a skeleton!");
    let skel = localFactory.createTile("SkeletonNPC");
    who.getHomeMap().placeThing(coord[0],coord[1],skel);
  } else {return;}
}

ais.ai_whirlpool = function(who) {
  // if three flukes surround, one can suicide to generate damaging whirlpool
  let foe = FindNearestNPC(who,"enemy");
  let themap = who.getHomeMap();
  if (IsAdjacent(who,foe)) {
    let terrain = themap.getTile(who.getx(),who.gety()).getTerrain().getName();
    let countflukes = 0;
    let flukelist = [];
    if ((terrain === "Water") || (terrain === "Shallows") || (terrain === "Ocean") || (terrain === "ShadowWater") || (terrain === "ShadowShallows") || (terrain === "ShadowOcean")) {
      for (let i=-1;i<=1;i++) {
        for (let j=-1;j<=1;j++) {
          let fluke = themap.getTile(foe.getx()+i,foe.gety()+j);
          if (fluke !== "OoB") { 
            fluke = fluke.getTopNPC();
            if (fluke) { 
              if (fluke.getName() === "FlukeNPC") { 
                countflukes++; 
                flukelist.push(fluke);
              }
            }
          }
        }
      }
    }
    if (countflukes >= 3) {
      DebugWrite("ai","Flukes surround their foe- create whirlpool!");
      let whirlpool = localFactory.createTile("WhirlpoolFluke");
      themap.placeThing(foe.getx(),foe.gety(),whirlpool);
      let diz = localFactory.createTile("Dizzy");
      diz.setExpiresTime(-1);
      foe.addSpellEffect(diz);
      for (let i=0;i<countflukes;i++) {
        if (flukelist[i] !== who) {
          let para = localFactory.createTile("Paralyze");
          para.setExpiresTime(DUTime.getGameClock()+SCALE_TIME);
          flukelist[i].addSpellEffect(para);
        }
      }
      if (GetDistance(PC.getx(),PC.gety(),foe.getx(),foe.gety()) <= 5) { maintext.addText("The flukes work in unison to churn the waters. A whirlpool forms!"); }
      return "special";  
    } else { console.log("Fewer than 3 flukes, no whirlpool."); }
  } else { return; }
}

function GetBreathTarget(who) {
  let npcs = who.getHomeMap().npcs.getAll();
  if (PC.getHomeMap() === who.getHomeMap()) { npcs.push(PC); }
  let foes = [];
  for (let i=0;i<npcs.length;i++) {
    if (CheckAreEnemies(npcs[i],who)) { 
      if (GetDistance(npcs[i].getx(),npcs[i].gety(),who.getx(),who.gety()) <= 5) {  
        foes.push(npcs[i]); 
      }
    }
  }
  if (foes.length) {
    return foes[Dice.roll("1d"+foes.length+"-1")]; 
  }
  return;
}

ais.ai_firebreath = function(who) {
  let tgt = GetBreathTarget(who);
  if (!tgt) { return; }

  let bolt = {};
  bolt.graphic = "fireicelightning.gif";
  bolt.xoffset = 0;
  bolt.yoffset = 0;
  bolt.directionalammo = 1;
  bolt = GetEffectGraphic(who,tgt,bolt);
  let dmg;
  if (who.getLevel() <= 3) { dmg = Dice.roll("2d8+8"); }
  else if (who.getLevel() <= 5) { dmg = Dice.roll("4d8+14"); }
  else { dmg = Dice.roll("4d8+26"); }
  let atkhit = 1;
  if (Dice.roll("1d45") < PC.getDex()) { atkhit = 0; }
  let destgraphic = {};
  if (atkhit) {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " breathes fire. You are bathed in flames!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " breathes fire. " + tgtdesc + " is bathed in flames!");
    }
    destgraphic = {graphic:"master_spritesheet.png", xoffset:-128, yoffset:-1856, overlay:"spacer.gif"};
  } else {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " breathes fire. You dodge some of the blast!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " breathes fire. " + tgtdesc + " avoids some of the blast!");
    }

    destgraphic = {graphic:"spacer.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
    dmg = dmg/2;
  }
  if ((who.getHomeMap() === PC.getHomeMap()) && (IsVisibleOnScreen(who.getx(),who.gety()))) {
    DUPlaySound("sfx_fire_breath");
  }
  let fromcoords = getCoords(who.getHomeMap(),who.getx(), who.gety());
  let tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  let duration = (Math.pow( Math.pow(tgt.getx() - who.getx(), 2) + Math.pow (tgt.gety() - who.gety(), 2)  , .5)) * 100;
  let desc = tgt.getDesc();
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  let descval = { txt: desc };
  AnimateEffect(who, tgt, fromcoords, tocoords, bolt, destgraphic, {}, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"fire"},0);

  return "special_wait";
}

ais.ai_icebreath = function(who) {
  let tgt = GetBreathTarget(who);
  if (!tgt) { return; }

  let bolt = {};
  bolt.graphic = "fireicelightning.gif";
  bolt.xoffset = 0;
  bolt.yoffset = -32;
  bolt.directionalammo = 1;
  bolt = GetEffectGraphic(who,tgt,bolt);
  let dmg;
  if (who.getLevel() <= 3) { dmg = Dice.roll("2d8+8"); }
  else if (who.getLevel() <= 5) { dmg = Dice.roll("4d8+14"); }
  else { dmg = Dice.roll("4d8+26"); }
  let atkhit = 1;
  if (Dice.roll("1d45") < PC.getDex()) { atkhit = 0; }
  let destgraphic = {};
  if (atkhit) {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " breathes ice. You are skewered by shards!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " breathes ice. " + tgtdesc + " is skewered by shards!");
    }
    destgraphic = {graphic:"master_spritesheet.png", xoffset:-96, yoffset:-1856, overlay:"spacer.gif"};
  } else {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " breathes ice. You dodge some of the shards!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " breathes ice. " + tgtdesc + " avoids some of the blast!");
    }
    destgraphic = {graphic:"spacer.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
    dmg = dmg/2;
  }
  if ((who.getHomeMap() === PC.getHomeMap()) && (IsVisibleOnScreen(who.getx(),who.gety()))) {
    DUPlaySound("sfx_iceball");
  }
  let fromcoords = getCoords(who.getHomeMap(),who.getx(), who.gety());
  let tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  let duration = (Math.pow( Math.pow(tgt.getx() - who.getx(), 2) + Math.pow (tgt.gety() - who.gety(), 2)  , .5)) * 100;
  let desc = tgt.getDesc();
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  let descval = { txt: desc };
  AnimateEffect(who, tgt, fromcoords, tocoords, bolt, destgraphic, {}, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"ice"},0);

  return "special_wait";
}

ais.ai_lbolt = function(who) {
  let tgt = GetBreathTarget(who);
  if (!tgt) { return; }

  let bolt = {};
  bolt.graphic = "fireicelightning.gif";
  bolt.xoffset = 0;
  bolt.yoffset = -64;
  bolt.directionalammo = 1;
  bolt = GetEffectGraphic(who,tgt,bolt);
  let dmg;
  if (who.getLevel() <= 3) { dmg = Dice.roll("2d8+8"); }
  else if (who.getLevel() <= 5) { dmg = Dice.roll("4d8+14"); }
  else { dmg = Dice.roll("4d8+26"); }
  let atkhit = 1;
  if (Dice.roll("1d45") < PC.getDex()) { atkhit = 0; }
  let destgraphic = {};
  if (atkhit) {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " calls forth a lightning bolt. You are struck!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " calls forth a lightning bolt. " + tgtdesc + " is struck!");
    }
    destgraphic = {graphic:"master_spritesheet.png", xoffset:-128, yoffset:-1856, overlay:"spacer.gif"};
  } else {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " calls forth a lightning bolt. You are grazed by the power!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " calls forth a lightning bolt. " + tgtdesc + " is grazed by the power!");
    }

    destgraphic = {graphic:"spacer.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
    dmg = dmg/2;
  }
  if ((who.getHomeMap() === PC.getHomeMap()) && (IsVisibleOnScreen(who.getx(),who.gety()))) {
    DUPlaySound("sfx_small_zap");
  }
  let fromcoords = getCoords(who.getHomeMap(),who.getx(), who.gety());
  let tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  let duration = (Math.pow( Math.pow(tgt.getx() - who.getx(), 2) + Math.pow (tgt.gety() - who.gety(), 2)  , .5)) * 100;
  let desc = tgt.getDesc();
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  let descval = { txt: desc };
  AnimateEffect(who, tgt, fromcoords, tocoords, bolt, destgraphic, {}, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"lightning"},0);

  return "special_wait";
}

ais.ai_energybolt = function(who) {
  let tgt = GetBreathTarget(who);
  if (!tgt) { return; }

  let bolt = {};
  bolt.graphic = "magic-bolt.gif";
  bolt.xoffset = 0;
  bolt.yoffset = 0;
  bolt.directionalammo = 1;
  bolt = GetEffectGraphic(who,tgt,bolt);
  let dmg;
  if (who.getLevel() <= 3) { dmg = Dice.roll("2d8+8"); }
  else if (who.getLevel() <= 5) { dmg = Dice.roll("4d8+14"); }
  else { dmg = Dice.roll("4d8+26"); }
  let atkhit = 1;
  if (CheckResist(who,tgt,1)) { atkhit = 0; }
  let destgraphic = {};
  if (atkhit) {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " launches a bolt of energy. You are struck!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " launches a bolt of energy. " + tgtdesc + " is struck!");
    }
    destgraphic = {graphic:"master_spritesheet.png", xoffset:-128, yoffset:-1856, overlay:"spacer.gif"};
  } else {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " launches a bolt of energy. You resist!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " launches a bolt of energy. " + tgtdesc + " resists!");
    }

    destgraphic = {graphic:"spacer.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
    dmg = dmg/2;
  }
  if ((who.getHomeMap() === PC.getHomeMap()) && (IsVisibleOnScreen(who.getx(),who.gety()))) {
    DUPlaySound("sfx_magic_bolt");
  }
  let fromcoords = getCoords(who.getHomeMap(),who.getx(), who.gety());
  let tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  let duration = (Math.pow( Math.pow(tgt.getx() - who.getx(), 2) + Math.pow (tgt.gety() - who.gety(), 2)  , .5)) * 100;
  let desc = tgt.getDesc();
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  let descval = { txt: desc };
  AnimateEffect(who, tgt, fromcoords, tocoords, bolt, destgraphic, {}, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"lightning"},0);

  return "special_wait";
}

ais.ai_spit = function(who) {
  let tgt = GetBreathTarget(who);
  if (!tgt) { return; }

  let bolt = {};
  bolt.graphic = "master_spritesheet.png";
  bolt.xoffset = -64;
  bolt.yoffset = -1856;
  bolt.directionalammo = 0;
  bolt = GetEffectGraphic(who,tgt,bolt);
  let dmg = Dice.roll(DMG_LIGHT);
  let atkhit = 1;
  if (Dice.roll("1d45") < PC.getDex()) { atkhit = 0; }
  let destgraphic = {};
  if (who.specials.hides) {
    who.setGraphic(who.specials.hides);  
    delete who.specials.hides;
    if (who.getHomeMap() === PC.getHomeMap()) {
      DrawMainFrame("one",who.getHomeMap(),who.getx(),who.gety());
    }
  }
  if (atkhit) {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " spits venom at you!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " spits venom! " + tgtdesc + " is struck!");
    }
    destgraphic = {graphic:"master_spritesheet.png", xoffset:-160, yoffset:-1856, overlay:"spacer.gif"};
    let poison = localFactory.createTile("Poison");
    let duration = Dice.roll("1d11+9") * SCALE_TIME;
    poison.setExpiresTime(DUTime.getGameClock() + duration);
    tgt.addSpellEffect(poison);
    DrawCharFrame();
  } else {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " spits venom at you. You dodge it!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " spits venom. " + tgtdesc + " dodges!");
    }

    destgraphic = {graphic:"spacer.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
    dmg = 0;
  }
  if ((who.getHomeMap() === PC.getHomeMap()) && (IsVisibleOnScreen(who.getx(),who.gety()))) {
    DUPlaySound("sfx_acid");
  }
  let fromcoords = getCoords(who.getHomeMap(),who.getx(), who.gety());
  let tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  let duration = (Math.pow( Math.pow(tgt.getx() - who.getx(), 2) + Math.pow (tgt.gety() - who.gety(), 2)  , .5)) * 100;
  let desc = tgt.getDesc();
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  let descval = { txt: desc };
  AnimateEffect(who, tgt, fromcoords, tocoords, bolt, destgraphic, {}, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"poison"},0);

  return "special_wait";

}

ais.ai_magmaspit = function(who) {
  let tgt = GetBreathTarget(who);
  if (!tgt) { return; }

  let bolt = {};
  bolt.graphic = "flowing_animations.gif";
  bolt.xoffset = -224;
  bolt.yoffset = 0;
  bolt.directionalammo = 0;
  bolt = GetEffectGraphic(who,tgt,bolt);
  let dmg = Dice.roll(DMG_HEAVY);
  let atkhit = 1;
  if (Dice.roll("1d45") < PC.getDex()) { atkhit = 0; }
  let destgraphic = {};
  if (atkhit) {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " spits lava at you!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " spits lava! " + tgtdesc + " is struck!");
    }
    destgraphic = {graphic:"master_spritesheet.png", xoffset:-128, yoffset:-1856, overlay:"spacer.gif"};
    DrawCharFrame();
  } else {
    if (tgt === PC) {
      maintext.addText("The " + who.getDesc() + " spits lava at you. You avoid some of the spray!");
    } else {
      let tgtdesc = tgt.getFullDesc();
      tgtdesc = tgtdesc.charAt(0).toUpperCase() + tgtdesc.slice(1);
      maintext.addText("The " + who.getDesc() + " spits lava. " + tgtdesc + " avoids some of the spray!");
    }

    destgraphic = {graphic:"spacer.gif", xoffset:0, yoffset:0, overlay:"spacer.gif"};
    dmg = dmg/2;
  }
  if ((who.getHomeMap() === PC.getHomeMap()) && (IsVisibleOnScreen(who.getx(),who.gety()))) {
    DUPlaySound("sfx_acid");
  }
  let fromcoords = getCoords(who.getHomeMap(),who.getx(), who.gety());
  let tocoords = getCoords(tgt.getHomeMap(),tgt.getx(), tgt.gety());
  let duration = (Math.pow( Math.pow(tgt.getx() - who.getx(), 2) + Math.pow (tgt.gety() - who.gety(), 2)  , .5)) * 100;
  let desc = tgt.getDesc();
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  let descval = { txt: desc };
  let lava = localFactory.createTile("Lava");
  who.getHomeMap().placeThing(tgt.getx(),tgt.gety(),lava);
  AnimateEffect(who, tgt, fromcoords, tocoords, bolt, destgraphic, {}, {type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"poison"},0);
  setTimeout(function() { DrawMainFrame("one",who.getHomeMap(),tgt.getx(),tgt.gety()); }, duration);

  return "special_wait";

}

ais.ai_magmaheal = function(who) {
  if (who.getHP() === who.getMaxHP()) { return; }
  let themap = who.getHomeMap(); 
  let lava = 0;
  let fea = themap.getTile(who.getx(),who.gety()).getFeatures();
  for (let i=0;i<fea.length;i++) {
    if (fea[i].getName() === "Lava") { lava = 1; }
  }
  if (lava) {
    if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) < 5) { 
      maintext.addText("The " + who.getDesc() + " absorbs lava through its scales. It looks healthier!");
    }
    who.setHP(Math.min(who.getHP()+50,who.getMaxHP()));
    ShowEffect(who, 1000, "spellsparkles-anim.gif", 0, COLOR_RED);
  } 
  return;
}

ais.ai_phase = function(who) {
  if (who.getSpellEffectsByName("Phased")) { return; }
  let duration = Dice.roll("1d3") * SCALE_TIME;
  let phase = localFactory.createTile("Phased");
  phase.setExpiresTime(DUTime.getGameClock() + duration);
  who.addSpellEffect(phase);

  return "special";
}

ais.ai_missile = function(who) {
  let melee = TryMelee(who);
  if (melee) { 
    DebugWrite("ai", "In missile, but something was adjacent so meleeing. THIS SHOULDN'T HAPPEN!!<br />");
    return "melee"; 
  }
  
  // find a target
  let shoot_at = FindMissileTarget(who,10);
  if (shoot_at) {
    DebugWrite("ai", "Firing a missile attack!<br />");
    let result = Attack(who,shoot_at);
    maintext.addText(result["txt"]);
  
    return "missile";
  }
  
  return 0;
  
}

function FindMissileTarget(who,radius) {
  DebugWrite("ai", "In FindMissileTarget.<br />");
  let thismap = who.getHomeMap();
  let nearby = FindNearby("npcs",thismap,radius,"circle",who.getx(),who.gety());
  let listtargets = [];
  let listtargetname = [];
  let weakest;
  let closest;
  for (let i=0;i<nearby.length;i++) {
    if (nearby[i].getAttitude() === who.getAttitude()) { continue; }
    if (!weakest) { weakest=nearby[i]; }
    else { 
      if ((weakest.getHP()/weakest.getMaxHP()) > (nearby[i].getHP()/nearby[i].getMaxHP())) { 
        weakest = nearby[i];
      }
    }
   
    if (!closest) { closest = nearby[i]; }
    else {
      if (GetDistance(who.getx(),who.gety(),nearby[i].getx(),nearby[i].gety()) < GetDistance(who.getx(),who.gety(),closest.getx(),closest.gety())) {
        closest = nearby[i];
      }
    }
    
    listtargets.push(nearby[i]);
    listtargetname.push(nearby[i].getName());
  }
  if (weakest) { 
    listtargets.push(weakest); 
    listtargetname.push(weakest.getName());
    if (who.specials.ruthless) {
      for (let i=0; i<=8; i++) {
        // make choosing weakest more likely
        listtargets.push(weakest);
        listtargetname.push(weakest.getName());
      }
    }
  }
  if (closest) { listtargets.push(closest); listtargetname.push(closest.getName()); }
  if (listtargets[0]) {
    let idx = Dice.roll("1d"+listtargets.length+"-1");
    return (listtargets[idx]);
  } else {
    return 0;
  }
}

ais.Tharock = function(who) {
  if (who.timer) {
    if (who.timer === 3) {
      let tox, toy;
      if (PC.gety() >= 27) { tox=30; toy=25; }
      else if ((PC.getx() >= 27) && (PC.getx() <= 30) && (PC.gety() >= 24) && (PC.gety() <= 26)) { tox=29; toy=28; }
      else { tox=29; toy=26; }
      who.getHomeMap().moveThing(tox,toy,who);
      PC.forcedTalk = who;
      DrawMainFrame("one",who.getHomeMap(),tox,toy);
      delete who.timer;
    } else { who.timer++;}
  } 
  return {fin:1};
}

ais.elderdragon = function(who) {
  let retval = {fin:0};
  if (!who.roused) {
    if (PC.gety() < 20) {
      retval["wait"] = 1;
      gamestate.setMode("null");
      targetCursor.command = "elderstart";
      targetCursor.dragon = who;
      targetCursor.stage = 0;
      targetCursor.camx = PC.getx();
      targetCursor.camy = PC.gety();
      ais.elderdragonintro(who);
      who.earth = 2;
      who.air = 2;
      who.water = 2;
      who.fire = 2;
    }
  } else {
    // in a fight
    if (!who.first) { who.first = 1; return retval; }
    if (who.breathing) {
      console.log("Dragon is exhaling.");
      let tgt = who.getHomeMap().getTile(who.breathx,who.breathy).getTopNPC();
      if (!tgt) { 
        if ((PC.getx() === who.breathx) && (PC.gety() === who.breathy)) { tgt = PC; }
      }
      let boltgraphic = {};
      boltgraphic.graphic = "fireicelightning.gif";
      boltgraphic.yoffset = 0;
      boltgraphic.xoffset = 0;
      boltgraphic.directionalammo = 1;
      boltgraphic = GetEffectGraphic(who,{x:who.breathx,y:who.breathy},boltgraphic);

      let destgraphic = {graphic:"master_spritesheet.png", xoffset:-128, yoffset:-1856, overlay:"spacer.gif"};

      let weapon = localFactory.createTile("SpellWeapon");
      weapon.dmgtype = "fire";

      let duration = (Math.pow( Math.pow(who.breathx - who.getx(), 2) + Math.pow (who.breathy - who.gety(), 2)  , .5)) * 100;
      let descval = {};
      if (tgt) {
        let tgtdesc = "you";
        if (tgt !== PC) {
          tgtdesc = tgt.getFullDesc();
        }
        descval['txt'] = `The dragon breaths a torrential outburst of flame at ${tgtdesc}!`;
      } else {
        let tgtdesc = "you";
        if (who.breathing !== PC) {
          tgtdesc = who.breathing.getFullDesc();
        }
        descval['txt'] = `The dragon breaths a torrential outburst of flame at the space where ${tgtdesc} stood!`;
      }

      let cb = function(atk,def,cbp) {
        let firefield = localFactory.createTile("FireField");
        atk.getHomeMap().placeThing(cbp.x,cbp.y,firefield);
        DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
      }
      let dmg = Dice.roll(DMG_TREMENDOUS);
      let fromcoords = getCoords(who.getHomeMap(),who.getx(),who.gety());
      let tocoords = getCoords(who.getHomeMap(),who.breathx,who.breathy);
      AnimateEffect(who,tgt,fromcoords,tocoords,boltgraphic,destgraphic,{},{type:"missile", duration:duration, ammoreturn:0, dmg:dmg, endturn:1, retval:descval, dmgtype:"fire", weapon:weapon, finishcallback:cb, callbackparam: {x:who.breathx, y:who.breathy}});

      delete who.breathing;
      delete who.breathx;
      delete who.breathy;
      retval["wait"] = 1;
      return retval;
    } else {
      let dragonmap = who.getHomeMap();
      let foes = [];
      let nearby;
      if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety(),"square") <= 7) { foes.push(PC); nearby = PC;}
      let npcs = dragonmap.npcs.getAll();
      for (let i=0;i<npcs.length;i++) {
        if ((npcs[i].getAttitude() === "friendly") && (GetDistance(who.getx(),who.gety(),npcs[i].getx(),npcs[i].gety(),"square") <= 7)) { foes.push(npcs[i]); }
      }
      let isadj;
      let mindist = 100;
      for (let i=0;i<foes.length;i++) {
        if (!isadj) {
          isadj = IsAdjacent(who,foes[i]);
          if (isadj) { nearby = foes[i]; }
          else {
            let dist = GetDistance(who,foes[i]);
            if (dist < mindist) { mindist = dist; nearby = foes[i]; }
          }
          for (let j=0;j<who.attachedParts.length;j++) {
            if (!isadj) { 
              isadj = IsAdjacent(who.attachedParts[j],foes[i]); 
              if (isadj) { 
                nearby = foes[i]; 
              } else {
                let dist = GetDistance(who.attachedParts[j],foes[i]);
                if (dist < mindist) { mindist = dist; nearby = foes[i]; }
              }
            }
          }
        }
      }
      let action;
      let roll = Dice.roll("1d100");
      let elementals = who.earth + who.fire + who.water + who.air;
      console.log("Remaining elemental summons: " + elementals);
      console.log("Die roll: " + roll);
      if (isadj) { console.log("Using adjacent moveset."); }
      else { console.log("Using no-adjacent moveset."); }
      if (isadj) {
        if (roll <= 15) { action = "bite"; }
        else if (roll <= 40) { action = "claw"; }
        else if (roll <= 60) { action = "wing"; }
        else if (roll <= 70) { action = "spellcast"; }
        else if (roll <= 85) { 
          if (elementals) { action = "conjure"; } 
          else { action = "spellcast"; }
        }
        else { action = "backoff"; }
      } else {
        if (roll <= 15) { action = "breathe"; }
        else if (roll <= 45) { action = "spellcast"; }
        else if (roll <= 60) { action = "conjure"; }
        else  { action = "approach"; }
      }
      console.log("Chosen action: " + action);

      if (foes.length === 0) {
        // All enemies are very distant from the dragon, so it will head towards the player
        action = "approach";
        nearby = PC;
        console.log("All enemies are distant. Overriding action choice: action is now APPROACH.");          
      }


      if (action === "bite") {
        who.meleeDamage = '5d8+15';
        who.setOnHit("");
        retval = Attack(who,nearby);
      } else if (action === "claw") {
        who.meleeDamage = '4d8';
        who.setOnHit("knockback");
        retval = Attack(who,nearby);
      } else if (action === "wing") {
        // finish here - knockback multiple spaces, no damage, needs to animate each space of movement
        if (nearby === PC) {
          maintext.addText("The great dragon spreads its winds wide, and with a mighty beat, the air presses on you, pushing you back!");
        } else {
          maintext.addText(`The great dragon spreads its winds wide, and with a mighty beat, the air presses on the ${nearby.getDesc()}, pushing the ${nearby.getDesc()} back!`);
        }
        retval["fin"] = 0;
        retval["wait"] = 1;
        let xdiff = nearby.getx() - who.getx();
        let ydiff = nearby.gety() - who.gety();
        let pushdir=[];
        if ((xdiff < 0) && (ydiff < 0)) { pushdir = [-1,-1]; }
        else if ((xdiff > 1) && (ydiff < 0)) { pushdir = [1,-1]; }
        else if ((xdiff < 0) && (ydiff > 1)) { pushdir = [-1,1]; }
        else if ((xdiff > 1) && (ydiff > 1)) { pushdir = [1,1]; }
        else if (xdiff > 1) { pushdir = [1,0]; }
        else if (xdiff < 0) { pushdir = [-1,0]; }
        else if (ydiff > 1) { pushdir = [0,1]; }
        else if (ydiff < 0) { pushdir = [0,-1]; }
        setTimeout(function(){ WingBuffet(nearby,pushdir,who,1); },50);
        DUPlaySound("sfx_woosh");
        return retval;

      } else if (action === "spellcast") {
        let cast = ais.ai_cast(who);
        if (cast === "special_wait") { retval["wait"] = 1; }
      } else if (action === "conjure") {
        roll = Dice.roll("1d"+elementals);
        console.log("Rolled " + roll + " to determine elemental choice.");
        if (roll < who.air) {
          let coords = {};
          let coordsfound = 0;
          while (!coordsfound) {
            coords.x = Dice.roll("1d8+12");
            coords.y = Dice.roll("1d9+8");
            let tile = dragonmap.getTile(coords.x,coords.y);
            if (!tile.getTopNPC()) { coordsfound = 1; }
          }
          let airel = localFactory.createTile("AirElementalNPC");
          dragonmap.placeThing(coords.x,coords.y,airel);
          maintext.addText("The dragon trumpets a roar upwards, and the airs begin to swirl to life!");
          DUPlaySound("sfx_summon");
          who.air--;
          DrawMainFrame("one",dragonmap,coords.x,coords.y);
        } else if (roll < (who.air + who.earth)) {
          let fea = dragonmap.getTile(13,18).getFeatures();
          let rock;
          for (let i=0;i<fea.length;i++) {
            if (fea[i].getName() === "PileOfRocks") { 
              rock = fea[i];
            }
          }
          if (!rock) {
            fea = dragonmap.getTile(21,18).getFeatures();
            for (let i=0;i<fea.length;i++) {
              if (fea[i].getName() === "PileOfRocks") { 
                rock = fea[i];
              }
            }
          }
          if (rock) {
            let coords = {x:rock.getx(), y:rock.gety()};
            dragonmap.deleteThing(rock);
            let earthel = localFactory.createTile("EarthElementalNPC");
            dragonmap.placeThing(coords.x,coords.y,earthel);
            maintext.addText("The dragon speaks several syllables in a tongue unfamiliar to you. Near the entrance to this cavern, a pile of rocks animates and begins to move towards you.");
            DUPlaySound("sfx_summon");
            who.earth--;
            DrawMainFrame("one",dragonmap,coords.x,coords.y);
          }
        } else if (roll < (who.air + who.earth + who.fire)) {
          let coords = {};
          let coordsfound = 0;
          while (!coordsfound) {
            coords.x = Dice.roll("1d8+12");
            coords.y = Dice.roll("1d9+8");
            let tile = dragonmap.getTile(coords.x,coords.y);
            if (!tile.getTopNPC()) { coordsfound = 1; }
          }
          let fireel = localFactory.createTile("FireElementalNPC");
          dragonmap.placeThing(coords.x,coords.y,fireel);
          maintext.addText("The dragon breathes a stream of fire! When it strikes the cave floor, it gathers itself into place, and begins to move.");
          DUPlaySound("sfx_summon");
          who.fire--;
          DrawMainFrame("draw",dragonmap,PC.getx(),PC.gety());
        } else {
          let waterel = localFactory.createTile("WaterElementalNPC");
          if (!dragonmap.getTile(20,10).getTopNPC() && (PC.getx() !== 20) && (PC.gety() !== 10)) { dragonmap.placeThing(20,10,waterel); DrawMainFrame("one",dragonmap,20,10); }
          else if (!dragonmap.getTile(19,10).getTopNPC() && (PC.getx() !== 19) && (PC.gety() !== 10)) { dragonmap.placeThing(19,10,waterel); DrawMainFrame("one",dragonmap,19,10); }
          else if (!dragonmap.getTile(20,11).getTopNPC() && (PC.getx() !== 20) && (PC.gety() !== 11)) { dragonmap.placeThing(20,11,waterel); DrawMainFrame("one",dragonmap,20,11); }
          else if (!dragonmap.getTile(21,11).getTopNPC() && (PC.getx() !== 21) && (PC.gety() !== 11)) { dragonmap.placeThing(21,11,waterel); DrawMainFrame("one",dragonmap,21,11); }
          else if (!dragonmap.getTile(19,9).getTopNPC() && (PC.getx() !== 19) && (PC.gety() !== 9)) { dragonmap.placeThing(19,9,waterel); DrawMainFrame("one",dragonmap,19,9); }
          else if (!dragonmap.getTile(20,9).getTopNPC() && (PC.getx() !== 20) && (PC.gety() !== 9)) { dragonmap.placeThing(20,9,waterel); DrawMainFrame("one",dragonmap,20,9); }
          else if (!dragonmap.getTile(21,10).getTopNPC() && (PC.getx() !== 21) && (PC.gety() !== 10)) { dragonmap.placeThing(21,10,waterel); DrawMainFrame("one",dragonmap,21,10); }
          maintext.addText("The dragon utters a single, resonant word. Water fountains upwards from the surface of the small underground pond, and forms into a vaguely humanoid shape.");
          who.water--;
          DUPlaySound("sfx_summon");          
        }
      } else if (action === "breathe") {
        maintext.addText("The dragon inhales a deep breath, pulling air from throughout the cavern. It looks around as it prepares to exhale...");
        let chk = Dice.roll("1d"+foes.length+"-1");
        who.breathx = foes[chk].getx();
        who.breathy = foes[chk].gety();
        console.log("Breathing at:");
        console.log(foes[chk]);
        who.breathing = foes[chk];
      } else if (action === "backoff") {
        let xdiff = nearby.getx() - who.getx();
        let ydiff = nearby.gety() - who.gety();
        let wanttomove = {};
        if ((xdiff < 0 ) && dragonmap.getTile(who.getx()+2,who.gety()).canMoveHere(MOVE_WALK).canmove && dragonmap.getTile(who.getx()+2,who.gety()+1).canMoveHere(MOVE_WALK).canmove)  {
          wanttomove.east = 1;
        }
        if ((xdiff > 1 ) && dragonmap.getTile(who.getx()-1,who.gety()).canMoveHere(MOVE_WALK).canmove && dragonmap.getTile(who.getx()-1,who.gety()+1).canMoveHere(MOVE_WALK).canmove) {
          wanttomove.west = 1;
        }
        if ((ydiff < 0 ) && dragonmap.getTile(who.getx(),who.gety()+2).canMoveHere(MOVE_WALK).canmove && dragonmap.getTile(who.getx()+1,who.gety()+2).canMoveHere(MOVE_WALK).canmove) {
          wanttomove.south = 1;
        }
        if ((ydiff > 1 ) && dragonmap.getTile(who.getx(),who.gety()-1).canMoveHere(MOVE_WALK).canmove && dragonmap.getTile(who.getx()+1,who.gety()-1).canMoveHere(MOVE_WALK).canmove) {
          wanttomove.north = 1;
        }
        let dragonne, dragonse, dragonsw;
        for (let i=0;i<who.attachedParts.length;i++) {
          if (who.attachedParts[i].getx() === who.getx()) { dragonsw = who.attachedParts[i]; }
          else {
            if (who.attachedParts[i].gety() === who.gety()) { dragonne = who.attachedParts[i]; }
            else { dragonse = who.attachedParts[i]; }
          }
        }
        if (wanttomove.south) {
          dragonse.moveMe(0,1);
          dragonsw.moveMe(0,1);
          dragonne.moveMe(0,1);
          who.moveMe(0,1);
          DrawMainFrame("draw",dragonmap,PC.getx(),PC.gety());
        } else if (wanttomove.west) {
          who.moveMe(-1,0);
          dragonsw.moveMe(-1,0);
          dragonne.moveMe(-1,0);
          dragonse.moveMe(-1,0);
          DrawMainFrame("draw",dragonmap,PC.getx(),PC.gety());
        } else if (wanttomove.east) {
          dragonne.moveMe(1,0);
          dragonse.moveMe(1,0);
          dragonsw.moveMe(1,0);
          who.moveMe(1,0);
          DrawMainFrame("draw",dragonmap,PC.getx(),PC.gety());
        } else if (wanttomove.north) {
          dragonne.moveMe(0,-1);
          who.moveMe(0,-1);
          dragonse.moveMe(0,-1);
          dragonsw.moveMe(0,-1);
          DrawMainFrame("draw",dragonmap,PC.getx(),PC.gety());
        }
      } else if (action === "approach") {
        console.log(nearby);
        let xdiff = nearby.getx() - who.getx();
        let ydiff = nearby.gety() - who.gety();
        let wanttomove = {};
        if ((xdiff > 1 ) && dragonmap.getTile(who.getx()+2,who.gety()).canMoveHere(MOVE_WALK).canmove && dragonmap.getTile(who.getx()+2,who.gety()+1).canMoveHere(MOVE_WALK).canmove)  {
          wanttomove.east = 1;
        }
        if ((xdiff < 0 ) && dragonmap.getTile(who.getx()-1,who.gety()).canMoveHere(MOVE_WALK).canmove && dragonmap.getTile(who.getx()-1,who.gety()+1).canMoveHere(MOVE_WALK).canmove) {
          wanttomove.west = 1;
        }
        if ((ydiff > 1 ) && dragonmap.getTile(who.getx(),who.gety()+2).canMoveHere(MOVE_WALK).canmove && dragonmap.getTile(who.getx()+1,who.gety()+2).canMoveHere(MOVE_WALK).canmove) {
          wanttomove.south = 1;
        }
        if ((ydiff < 0 ) && dragonmap.getTile(who.getx(),who.gety()-1).canMoveHere(MOVE_WALK).canmove && dragonmap.getTile(who.getx()+1,who.gety()-1).canMoveHere(MOVE_WALK).canmove) {
          wanttomove.north = 1;
        }
        console.log(wanttomove);
        let dragonne, dragonse, dragonsw;
        for (let i=0;i<who.attachedParts.length;i++) {
          if (who.attachedParts[i].getx() === who.getx()) { dragonsw = who.attachedParts[i]; }
          else {
            if (who.attachedParts[i].gety() === who.gety()) { dragonne = who.attachedParts[i]; }
            else { dragonse = who.attachedParts[i]; }
          }
        }
        if (wanttomove.south) {
          dragonse.moveMe(0,1);
          dragonsw.moveMe(0,1);
          dragonne.moveMe(0,1);
          who.moveMe(0,1);
          DrawMainFrame("draw",dragonmap,PC.getx(),PC.gety());
        } else if (wanttomove.west) {
          who.moveMe(-1,0);
          dragonsw.moveMe(-1,0);
          dragonne.moveMe(-1,0);
          dragonse.moveMe(-1,0);
          DrawMainFrame("draw",dragonmap,PC.getx(),PC.gety());
        } else if (wanttomove.east) {
          dragonne.moveMe(1,0);
          dragonse.moveMe(1,0);
          dragonsw.moveMe(1,0);
          who.moveMe(1,0);
          DrawMainFrame("draw",dragonmap,PC.getx(),PC.gety());
        } else if (wanttomove.north) {
          dragonne.moveMe(0,-1);
          who.moveMe(0,-1);
          dragonse.moveMe(0,-1);
          dragonsw.moveMe(0,-1);
          DrawMainFrame("draw",dragonmap,PC.getx(),PC.gety());
        }
      } else {
        alert("How did you get here? In Elder Dragon AI, no Action chosen?");
      }
    }

  }
  return retval;
}

ais.elderdragonintro = function(who) {
  if (targetCursor.stage < 1) {
    let camera = {};
    camera.x = Math.round((PC.getx() + who.getx())/2);
    camera.y = Math.round((PC.gety() + who.gety())/2);

    if ((camera.x === targetCursor.camx) && (camera.y === targetCursor.camy)) {
      who.roused = 1;
      who.setAttitude("hostile");
      who.setMana(60);
      targetCursor.stage = 1;
      maintext.addText('The dragon beholds your entrance, and then opens its mouth. "So, you have finally come. I have felt your approach for some time now, little one. Your time-bound intensity."');
      gamestate.setMode("anykey");
      maintext.setInputLine("&gt;[MORE]");
      maintext.drawTextFrame(); 
      return;
    } else {
      if (camera.x > targetCursor.camx) { targetCursor.camx++; }
      if (camera.x < targetCursor.camx) { targetCursor.camx--; }
      if (camera.y > targetCursor.camy) { targetCursor.camy++; }
      if (camera.y < targetCursor.camy) { targetCursor.camy--; }
      DrawMainFrame("draw", PC.getHomeMap(), targetCursor.camx, targetCursor.camy);
      setTimeout(function() { ais.elderdragonintro(who) }, 350);
    }
  } else if (targetCursor.stage === 1) {
    maintext.addText('"I have been here since before your kind raised its cities. And I am so tired. Perhaps it is time for an ending. But if I will go, I will go shrouded in glory. Come, little one, and we shall raise glorious battle, and bring an ending to one of us. Hail, and farewell!"');
    targetCursor.stage = 2;
  } else {
    who.endTurn();
    delete targetCursor.stage;
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    maintext.setInputLine("&gt;");
    maintext.drawTextFrame();
  }
}

function WingBuffet(who, dir, dragon, count) {
  let desttile = who.getHomeMap().getTile(who.getx()+dir[0], who.gety()+dir[0]);
  if (desttile.canMoveHere(MOVE_WALK).canmove) {
    who.moveMe(dir[0],dir[1]);
  } else {
    dragon.endTurn();
    return;
  }
  count++;
  if (count < 3) {
    setTimeout(function() { WingBuffet(who,dir,dragon,count); }, 200);
  } else {
    dragon.endTurn();
  }
}

ais.Darkness = function(who) {
  if (!who.intro) {
    who.intro = Dice.roll("1d3+6");
    return {fin:1};
  } else if (who.intro && !who.introspoke) {
    if (who.intro === 1) {
      maintext.addText('A voice echoes in the darkness. <span class="daemontext">"Come, my little firefly. Come into the dark, where I can see you."</span>');
      who.introspoke = 1;
    } else {
      who.intro--;
    }
  } else if (!who.second) {
    if (PC.getx() < 20) {
      who.second = Dice.roll("1d5+2");
    } 
  } else if (who.second && !who.secondspoke) {
    if (who.second === 1) {
      maintext.addText('<span class="daemontext">"Little bug, with your lightning in a bottle. Facets of reflected glory."</span>');
      who.secondspoke = 1;
    } else {
      who.second--;
    }
  } else if (!who.third && who.firstgate) {
    who.third = Dice.roll("1d5+2");
  } else if (who.third && !who.thirdspoke) {
    if (who.third === 1) {
      maintext.addText('<span class="daemontext">"There is not enough light in all the worlds to fill a void without end and without limit."</span>');
    } else {
      who.third--;
    }
  } else if (!who.fourth && who.secondgate) {
    who.fourth = Dice.roll("1d6+2");
  } else if (who.fourth && !who.fourthspoke) {
    if (who.fourth === 1) {
      maintext.addText('<span class="daemontext">"Those who came before you strove to make gods out of light and stone. But we have always been here in the dark. We are why they are no more."</span>');
    } else {
      who.fourth--;
    }
  } else if (!who.alone) {
    if ((PC.gety() > 27) && (PC.getx() > 11)) {
      who.alone = 1;
      if (DU.gameflags.getFlag("music")) { DUPlayMusic("Heartbeat", {fade:1}); }
    }
  }

  if (who.reflecting && !who.reflected) {
    let thismap = who.getHomeMap();
    if ((PC.getx() >= 21) && (PC.gety() > 18)) {
      who.reflected = 1;
      for (let i=14;i<=18;i++) {
        let mirror = thismap.getTile(i,20).getTopFeature();
        if (!mirror.broken) {
          mirror.break(PC);
          let reflection = thismap.getTile(i,21).getTopFeature();
          if (reflection.getName() === "DaemonicReflection") { 
            thismap.deleteThing(reflection);
          }
          let doppel = localFactory.createTile("DoppelgangerNPC");
          doppel.setGraphic(PC.getGraphic());  // in other branch, set to look like human layers WORKING HERE
          doppel.onDeath = "doppelganger";
          thismap.placething(i,21,doppel);
        }
      }
    
    }
  }

  if ((who.getMaxHP() - who.getHP()) > 100) {
    if (!who.rebuked) {
      who.rebuked = 1;
      maintext.addText('<span class="daemontext">"And what, precisely, do you believe this to be accomplishing?"</span>');
    }
    who.setHP(who.getMaxHP()-100);
    who.healedcount++;
  }
  return {fin:1};
}

ais.PatrolOH = function(who) {
  let points = [[52,65],[62,118]];
  return ais.GuardPatrol(who,points);
}

ais.PatrolNP = function(who) {
  let points = [[42,29],[71,75]];
  return ais.GuardPatrol(who,points);
}

ais.PatrolCL = function(who) {
  let points = [[108,52],[81,25]];
  return ais.GuardPatrol(who,points);
}

ais.PatrolB = function(who) {
  let points = [[110,52],[125,16]];
  return ais.GuardPatrol(who,points);
}

ais.PatrolS = function(who) {
  let points = [[109,53],[121,101]];
  return ais.GuardPatrol(who,points);
}

ais.GuardPatrol = function(who,dests) {
  if (PC.getHomeMap().getName() === "guardPatrol") { return {fin:1}; }   // don't move if PC is on a guard patrol map
  let themap = who.getHomeMap();
  let nearby = FindNearestNPC(who,"",[PC]);  // nearest entity on this map that isn't the PC
  let nearbydist = GetDistance(who.getx(),who.gety(),nearby.getx(),nearby.gety(),"manhatten");
  if ((!nearby.getDesc().includes("guard patrol")) && (nearbydist <= 3)) {
    // there is a non-guard, non-PC nearby. Head towards it unless you're too far from the road
    if (nearbydist === 1) {
      // adjacent to a monster- smite or be smote
      if ((nearby.getName().includes("Dragon")) || (nearby.getName().includes("Daemon"))) {
        let whox = who.getx();
        let whoy = who.gety();
        DUTime.removeEntityFrom(who);
        let spawner=who.getSpawnedBy();
        if (spawner) {
          spawner.deleteSpawned(who);
        }
        themap.deleteThing(who);
        if (PC.getHomeMap() === themap) {
          DrawMainFrame("one",themap,whox,whoy);
        }  
      } else {
        let nearx = nearby.getx();
        let neary = nearby.gety();
        DUTime.removeEntityFrom(nearby);
        themap.deleteThing(nearby);
        if (PC.getHomeMap() === themap) {
          DrawMainFrame("one",themap,nearx,neary);
        }  
      }
      return {fin:1};
    }
    let offroad = 1;
    for (let i=who.getx()-3;i<=who.getx()+3; i++) {
      for (let j=who.gety()-3;j<=who.gety()+3; j++) {
        if (themap.getTile(i,j).getTerrain().getName() === "Road") {
          offroad = 0;
          break;
        }
        if (!offroad) { break; }
      }
    } 
    if (!offroad) {
      // we haven't moved too far away from the road we are patrolling yet 
      let path = themap.getPath(who.getx(),who.gety(),nearby.getx(),nearby.gety(),MOVE_WALK);
      path.shift();
      StepOrSidestep(who,path[0],[nearby.getx(),nearby.gety()]);
      return {fin:1};
    }
  } 
  // either there is nothing to engage, or we're too far from the road- continue on the path
  if (!who.destidx) { who.destidx = 0; }
  if ((who.getx() === dests[who.destidx][0]) && (who.gety() === dests[who.destidx][1])) {
    if (who.destidx) { who.destidx = 0; } else { who.destidx = 1; }
  }
  let path = themap.getPath(who.getx(),who.gety(),dests[who.destidx][0],dests[who.destidx][1],MOVE_WALK);
  path.shift();
  StepOrSidestep(who,path[0],dests[who.destidx]);

  return {fin:1};
}

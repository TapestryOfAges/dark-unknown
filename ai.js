
"use strict";

let ais = {};

ais.seekPC = function(who,radius) {
  let retval = {};
  DebugWrite("ai", "Seeking PC...<br />");
  let whomap = who.getHomeMap();
  if (whomap === PC.getHomeMap()) {
    if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= radius) {
      // if can see
      let losresult = whomap.getLOS(who.getx(), who.gety(), PC.getx(), PC.gety());
      if (losresult < LOS_THRESHOLD) {
        DebugWrite("ai", "SeekPC: Nearby and can see the PC! Aggroing.<br />");
        // Go aggro, turn team aggro if part of a band
        if (who.getNPCBand()) {
          SetBandAggro(who.getNPCBand(), who.getHomeMap());
        } else {
          who.setAggro(1);
        }
        return {fin:1};
      }
    }
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
  let retval = {fin:1};
  let whomap = who.getHomeMap();
  let whox = who.getx();
  let whoy = who.gety();
  
  DebugWrite("ai", "<span style='font-weight:bold'>In Combat AI...</span><br />");
 
  if (whomap !== PC.getHomeMap()) {
    // what happens if the PC is on another map?
    DebugWrite("ai", "On a different map, waiting...<br />");
    who.wait++;
    if (who.wait > 30) {
      DebugWrite("ai", "Waited long enough, dropping aggro.<br />");
      who.setAggro(0);
    }
    return retval;  
  }
  
  // check to see if we should cease to aggro
  // need no one in your Band be within "forgetAt" radius
  if (who.getForgetAt() && GetDistance(whox,whoy,PC.getx(),PC.gety()) > who.getForgetAt()) {
    let npcs = whomap.npcs.getAll();
    let anysee = 0;
    for (let i=0;i<npcs.length;i++) {
      if (!anysee && (who.getNPCBand() === npcs[i].getNPCBand()) && (GetDistance(npcs[i].getx(),npcs[i].gety(),PC.getx(),PC.gety()) < npcs[i].getForgetAt())) {
        anysee = 1;
      }
      if (!npcs[i].getForgetAt()) { anysee = 1; }
    }
    if (!anysee) {
      DebugWrite("ai", "Distant, and no one in the band can see- dropping aggro.<br />");
      who.setAggro(0);
      return retval;
    }
  }
  
  if (!who.specials.undead && !who.specials.construct && !who.specials.mindless && !who.specials.tempbrave && (who.getHP() < .15*who.getMaxHP()) && (Dice.roll("1d2") === 1)) {
    // 50/50 chance each turn at 15% of life of dropping it all and fleeing
    DebugWrite("ai", "Too wounded, becoming a coward.<br />");
    // consider making this a check of some kind
    who.specials.coward = 1;
    who.specials.canbebrave = 1; // things that start out as cowards can't decide to stop being cowards
  }
  
  let nearest = FindNearestNPC(who, "enemy");
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

  // decide if meleeing/approaching
  let chance = who.meleeChance;
  DebugWrite("ai", "Chance of melee: " + chance + ".<br />");
  if (Dice.roll("1d100") <= chance) {
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
    let approach = FindNearestNPC(who, "enemy");
    if (!approach) {
      alert("How do I (" + who.getName() + " (" + who.getx() + "," + who.gety() + ")) not have a nearest enemy while still aggro?");
      return retval;
    }
    DebugWrite("ai", "Nearest enemy is: " + approach.getName() + " " + approach.getSerial() + " .<br />");
    let others = FindNearby("npcs",approach.getHomeMap(),1,"square",approach.getx(),approach.gety());
    let count = 0;
    for (let i=0;i<others.length;i++){
      if (others[i].getAttitude() === who.getAttitude()) { count++; }
    }

    DebugWrite("ai", "It is already fighting " + count + " of my friends.<br />");
    let oldapproach;
    if (count >= 3) {
      // there's enough people beating on the closest, head towards someone else if there is one
      DebugWrite("ai", "That's plenty- looking for another target.<br />");
      newapproach = FindNearestNPC(who,"enemy",[approach]);
      if (newapproach) { 
        DebugWrite("ai", "Found another target: " + newapproach.getName() + " " + newapproach.getSerial() + " .<br />");
        oldapproach = approach;
        approach = newapproach; 
      } else {
        DebugWrite("ai", "No other target found- sticking with current target.<br />");
      }
    }
    if (approach) {
      let movetype = who.getMovetype();
      if (who.specials.open_door) { movetype = MOVE_WALK_DOOR; }  // note, currently this is a problem if it can fly and open doors
      let path = whomap.getPath(who.getx(), who.gety(), approach.getx(), approach.gety(),movetype);
      if (!path.length) {
        if (oldapproach) {
          approach = oldapproach;
          path = whomap.getPath(who.getx(), who.gety(), approach.getx(), approach.gety(),movetype);
        }
      }
      if (path.length) { 
        let moved = FindCombatPath(who,approach,path);
      } else {
        // no path found to target
        // WORK HERE- improve this behavior, should not randomwalk away from PC
        let moved = ais.Randomwalk(who,25,25,25,25);
      }
    }
  } else {
    // Not meleeing, not what?
    DebugWrite("ai", "In special/missile<br />");
    let nonmeleeoptions = [];
    if (who.getMissile()) { nonmeleeoptions.push("ai_missile"); }
    if (who.spellsknown) { nonmeleeoptions.push("ai_cast"); }
    if (who.specials.sing) { nonmeleeoptions.push("ai_sing"); }
    // there will be more!
    
    let performed_action = 0;
    let num_attempts = 0;
    while (!performed_action && (num_attempts < 10)) {
      performed_action = ais[nonmeleeoptions[Dice.roll("1d" + nonmeleeoptions.length + "-1")]](who);
      num_attempts++;
    }
    if (num_attempts === 10) {
      DebugWrite("ai", "10 tries, " + who.getName() + " (" + who.getSerial() + ") failed to choose a special action.");
      return retval;
    }
    
    if ((performed_action === "melee") || (performed_action === "missile") || (performed_action === "special")) {
      retval["wait"] = 1;
      return retval;
    }
  }

  return retval;
  
}

function TryMelee(who) {
  DebugWrite("ai", "In TryMelee.<br />");
  let radius = 1;
  if (who.specials.reach) { radius = 2; }
  let nearby = FindNearby("npcs",who.getHomeMap(),radius,"box",who.getx(),who.gety());
  let atked = 0;
  DebugWrite("ai", "Seeking entities in melee range. There are " + nearby.length + ".<br />");
  if (nearby.length > 0) {
    ShuffleArray(nearby);
    for (let i=0;i<nearby.length;i++) {
      if (!atked) {
        if (nearby[i].getAttitude() !== who.getAttitude()) {
          let doatk = 1;
          if (radius > 1) { 
            // check LOE first
            if (whomap.getLOS(who.getx(), who.gety(), nearby[i].getx(), nearby[i].gety(), "loe") >= LOS_THRESHOLD) { doatk = 0; }
          }
          // attack them and call it a day!
          if (doatk) {
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
        }
      }
    }
  }
  return retval;
}

ais.GarrickAttack = function(who) {
  let retval = {fin:1};
  let themap = who.getHomeMap();
  if (who.getHP() <= 1000) { // Garrick gets 1030 hp when he attacks, so he can always surrender
    maintext.addText('Garrick falls to his knees and cries, "You win!"');
    retval["wait"] = 1;
    maintext.setInputLine("&gt;[MORE]");
    maintext.drawTextFrame(); 
    gamestate.setMode("anykey");
    targetCursor.command = "garrick";
    targetCursor.stage = 0;
    who.setCurrentAI("GarrickEscort");
    who.setMaxHP(30);
    who.setHP(10);
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
        path = themap.getPath(gx,gy,28,18, who.getMoveType()); 
      }
    } else if (who.dest === 6) {
      if (IsAdjacent(who,PC)) {
        maintext.addText("Asharden hands you a spellbook!");
        DU.gameflags.setFlag("spellbook",1);
        DU.gameflags.setFlag("spellbook2",1);
        DU.deleteFlag("ash_get_book");
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
  let destinations = [];
  let jumps = [];
  destinations[0] = ["w","w","n","n","w","w","w","w","w","e","e","e","e","e","e","e","e","e","s","s","s","s","n","n","n","n","w","w","w","w","s","s","e","e"];
  jumps[0] = { 2:32, 6:12, 10:8, 18:26, 23:20, 30:4};
  destinations[1] = ["w","n","w","w","s","s","s","w","w","n","n","n","n","s","s","s","s","e","e","n","n","n","e","e","s","e","s","s","s","s","w","w","w","w","e","e","e","e","s","s","w","w","w","w","s","s","e","e","e","e","w","w","w","w","n","n","e","e","e","e","n","n","w","w","w","w","e","e","e","e","n","n","n","n"];
  jumps[1] = { 11:15,13:13,30:38,36:32,46:54,52:48,62:70,68:64};
  destinations[2] = ["n","n","n","n","n","e","e","e","w","w","w","s","s","s","s","s","s","s","s","e","e","e","e","n","n","w","w","n","n","n","n","s","s","s","s","e","e","s","s","w","w","w","w","n","n","n"];
  jumps[2] = { 1:15,6:10,8:8,13:3,21:41,28:34,32:30,39:23};
  destinations[3] = ["w","w","w","w","w","s","n","e","e","e","e","e","n","n","e","e","s","s","e","e","e","e","e","e","w","w","w","w","w","w","n","n","w","w","s","s"];
  jumps[3] = { 2:10, 8:4, 20:28, 26:22};
  
  DebugWrite("ai", "SENTINEL " + who.patrol + " AI beginning. Standing at " + who.getx() + "," + who.gety() + ". Path takes it " + destinations[who.patrol][who.step] + ". <br />");
  // sequence: first, see if player is in front of, if so spend action teleporting player back to center
  //                  (also do this to the player's summoned NPCs if they have one)
  // then, see if path is blocked, if so, if there is a jump, jump to next step without moving
  // if neither of those things happened, take the next step
  
  let mymap = who.getHomeMap();
  let diffx=0;
  let diffy=0;
  if (destinations[who.patrol][who.step] === "n") {
    diffy = -1;
  } else if (destinations[who.patrol][who.step] === "s") {
    diffy = 1;
  } else if (destinations[who.patrol][who.step] === "e") {
    diffx = 1;
  } else if (destinations[who.patrol][who.step] === "w") {
    diffx = -1;
  } else {
    alert("Sentinels have an invalid step, " + who.patrol + " / " + who.step);
  }

  let retval = {};
  let desttile = mymap.getTile(who.getx()+diffx,who.gety()+diffy);
  let moveval = desttile.canMoveHere(who.getMovetype());
  if ((PC.getHomeMap() === mymap) && (PC.getx() === who.getx()+diffx) && (PC.gety() === who.gety()+diffy)) {
    DebugWrite("ai", "SENTINEL " + who.patrol + ": PC in the way. Removing.<br />");
    mymap.moveThing(16,13,PC);
    maintext.addText("The sentinel teleports you away.");
    retval["fin"] = 1;
    who.waits = 0;
  } else if (moveval["canmove"] !== 1) {
    // path is blocked
    let blocker = desttile.getTopNPC();
    if (blocker) {
      DebugWrite("ai", "Path is blocked by " + blocker.getName() + ".<br />");
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
          
          // has it been standing here for too long?
          if (who.waits > 3) {
            let starttile = mymap.getTile(who.startx,who.starty);
            let whosethere = starttile.getTopNPC();
            if (!whosethere) {
              mymap.moveThing(who.startx, who.starty, who);
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
          let starttile = mymap.getTile(who.startx,who.starty);
          let whosthere = starttile.getTopNPC();
          if (!whosthere) {
            mymap.moveThing(who.startx, who.starty, who);
          } // otherwise, can't go back home because someone is there
        }    
      }
    } else {
      DebugWrite("ai", "SENTINEL " + who.patrol + ": Path blocked- skip from " + who.step + " to ");
      who.step = jumps[who.patrol][who.step];
      DebugWrite("ai", who.step + ".<br />");
      who.waits = 0;
      retval["fin"] = 1;
    }
  } else {
    who.moveMe(diffx,diffy);
    who.step++;
    if (destinations[who.patrol].length <= who.step) { 
      who.step = 0;
      // back at the start
      if ((who.getx() !== who.startx) || (who.gety() !== who.starty)) {
        alert("Sentinel failed to return home.");
      }
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
  // animal, only randomwalk
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
    if (losresult > 2) { 
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
          if (!tile.canMoveHere(MOVE_WALK)) {
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
  let desttile = who.getHomeMap().getTile(who.getx()+diffx, who.gety()+diffy);
  if (desttile === "OoB") {
    retval["nomove"] = 1;
    retval["canmove"] = 0;
    retval["diffx"] = diffx;
    retval["diffy"] = diffy;
    return retval;     
  }
  
  if (desttile.isHostileTo(who)) {
    DebugWrite("ai", who.getName() + " refused to randomwalk onto a hostile tile at " + diffx + "," + diffy + ".");
    retval["nomove"] = 1;
    retval["canmove"] = 0;
    retval["diffx"] = diffx;
    retval["diffy"] = diffy;
    return retval; 
  }
  
  retval = StepOrSidestep(who, [who.getx()+diffx,who.gety()+diffy], [who.getx()+diffx,who.gety()+diffy], "nopush");
  retval["nomove"] = 0;  // NOTE- this is 0 even if they didn't move. If it gets to this point,
                         // canmove is the only reliable indicator of whether it moved. Checking
                         // for canmove=0 AND nomove=0 reveals that a move was attempted but failed.
  return retval;

}


ais.ProcessPoI = function(who,poiname) {
  let themap = who.getHomeMap();
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
    
//    if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Searching for a path to these locations: (" +  endpoints[0][0] + "," + endpoints[0][1] + "),(" + endpoints[1][0] + "," + endpoints[1][1] + "),(" + endpoints[2][0] + "," + endpoints[2][1] + ").</span><br />"); }    
    DebugWrite("ai", "Searching for a path to these locations: (" +  endpoints[0][0] + "," + endpoints[0][1] + "),(" + endpoints[1][0] + "," + endpoints[1][1] + "),(" + endpoints[2][0] + "," + endpoints[2][1] + ").<br />");

    let available = [];
    let anyavailable = 0;
    for (let i=0;i<endpoints.length;i++) {
      let desttile = whomap.getTile(endpoints[i][0],endpoints[i][1]);
      if (desttile.getTopNPC()) { available[i] = 0; }
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
      evenmoretempgrid.setWalkableAt(availdests[i][0], availdests[i][1]);
      let tmp = finder.findPath(who.getx(),who.gety(),availdests[i][0],availdests[i][1],evenmoretempgrid);
      if (tmp) {
        availpaths[i] = tmp;
      }
    }
    
    // next up- find the shortest of the available paths
    let shortest;
    for (let i = 0; i<availpaths.length; i++) {
      if (!availpaths[i]) { next; }
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
    if (couriermap.getWidth()-1-currx < middist) {
      mindist = couriermap.getWidth()-1-currx;
      dest = [couriermap.getWidth()-1,0];
    }
    if (couriermap.getHeight()-1-curry < middist) {
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
      DrawMainFrame("one",who.getHomeMap(),currx,curry);
    }
    
  }
  return {fin:1};
}

ais.ai_sing = function(who) {
  
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

ais.ai_cast = function(who) {
  
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
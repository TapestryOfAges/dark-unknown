
"use strict";

var barks = {};
barks['jester'] = ['%THEDESC% sings, "Ho eye he hum!"'];
barks['sam'] = ['%THEDESC% shouts, "Look at me!"'];
barks['startguard'] = ['%THEDESC% says, "You father wishes to speak with you!"'];

barks.getBark = function(idx) {
  if (barks[idx]) {
    var choice = Math.floor(Math.random()*barks[idx].length);
    return barks[idx][choice];
  }
}

barks.checkBark = function(who) {
 if ((who.getBark()) && (who.getHomeMap() === PC.getHomeMap())) {
    if (Dice.roll("1d100")  < who.getBarkFreq()) {
      if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= who.getBarkRad()) {
        // bark!
//        if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Townfolk barking.</span><br />"); }
        DebugWrite("ai", "Townfolk barking.");
        var mybark = this.getBark(who.getBark());
        if (mybark) {
          if ((mybark.indexOf("%THEDESC%") !== -1) || (mybark.indexOf("%DESC%") !== -1)) {
            var pref = who.getPrefix();
            if (mybark.indexOf("%THEDESC%") !== -1) {
              if ((pref === "a") || (pref === "an")) { pref = "the"; }
            }
            var desc = who.getDesc();
            if (who.getDesc() !== who.getNPCName()) {
              desc = pref + " " + desc;
            }
            mybark = mybark.replace(/%THEDESC%/g, desc);
            mybark = mybark.replace(/%DESC%/g, desc);
          }
          mybark = mybark.charAt(0).toUpperCase() + mybark.slice(1);
          maintext.addText(mybark);
        }
      }
    }
  }  
}
// object to make it easier to construct which function to call without
// using eval.

var ais = {};

ais.seekPC = function(who,radius) {
  var retval = {};
//  if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Seeking PC...</span><br />"); }
  DebugWrite("ai", "Seeking PC...<br />");
  var whomap = who.getHomeMap();
  if (whomap === PC.getHomeMap()) {
    if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= radius) {
      // if can see
      var losresult = whomap.getLOS(who.getx(), who.gety(), PC.getx(), PC.gety());
      if (losresult < LOS_THRESHOLD) {
//        if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Nearby and can see the PC! Aggroing.</span><br />"); }
        DebugWrite("ai", "SeekPC: Nearby and can see the PC! Aggroing.<br />");
        // Go aggro, turn team aggro if part of a band
        if (who.getNPCBand()) {
          SetBandAggro(who.getNPCBand(), who.getHomeMap());
        } else {
          who.setAggro(1);
        }
        retval["fin"] = 1;
        return retval;
      }
    }
    if ((who.getx() !== who.startx) || (who.gety() !== who.starty)) {
//      if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Can't see PC, heading home.</span><br />"); }
      DebugWrite(ai, "Seek PC: Can't see PC, heading home.<br />");
      // isn't at home, doesn't see PC, heads home
      var path = whomap.getPath(who.getx(),who.gety(),who.startx,who.starty,who.getMovetype());
      path.shift();
      var moved = StepOrSidestep(who,path[0],[who.startx, who.starty]);
      if (!moved) {
        var moveval = ais.Randomwalk(who,25,25,25,25);
      }
    }
  }
  retval["fin"] = 1;
  return retval;
}

ais.combat = function(who) {
  var retval = {};
  retval["fin"] = 1;
  var whomap = who.getHomeMap();
  var whox = who.getx();
  var whoy = who.gety();
  
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
    var npcs = whomap.npcs.getAll();
    var anysee = 0;
    $.each(npcs, function(idx,val) {
      
      if (!anysee && (who.getNPCBand() === val.getNPCBand()) && (GetDistance(val.getx(),val.gety(),PC.getx(),PC.gety()) < val.getForgetAt())) {
        anysee = 1;
      }
      if (!val.getForgetAt()) { anysee = 1; }
    });
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
  
  var nearest = FindNearestNPC(who, "enemy");
  if (who.specials.coward || ((Dice.roll("1d100") < who.withdraw) && IsAdjacent(who,nearest))) {
    if (who.specials.coward) {
      // run away! run away!
      DebugWrite("ai", "Running away!<br />");
    } else {
      DebugWrite("ai", "Backing away.<br />");
    }
    var diffx = whox - nearest.getx();
    var diffy = whoy - nearest.gety();
    
    var rundest = [];
    var pathdest = [];
    var coin = Dice.roll("1d2");
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
    var desttile = whomap.getTile(pathdest[0],pathdest[1]);
    if (desttile === "OoB") {
      if (whomap.ExitTest(who)) {
        whomap.deleteThing(who);
        return retval;
      }
    } else {
      var trymove = StepOrSidestep(who,pathdest,rundest);
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
  var chance = who.meleeChance;
  if (!chance) { chance = 1; }
  DebugWrite("ai", "Chance of melee: " + chance + ".<br />");
  if (Dice.roll("1d100") <= chance) {
    // yes
    //now find targets
    // top priority: adjacent foes
    DebugWrite("ai", "Chosen to melee/approach!<br />");
    var melee = TryMelee(who);
    if (melee) { 
      retval["wait"] = 1;
      return retval; 
    }
    // didn't melee anything, time to try to find something to approach
    var approach = FindNearestNPC(who, "enemy");
    if (!approach) {
      alert("How do I (" + who.getName() + " (" + who.getx() + "," + who.gety() + ")) not have a nearest enemy while still aggro?");
      return retval;
    }
    DebugWrite("ai", "Nearest enemy is: " + approach.getName() + " " + approach.getSerial() + " .<br />");
    var others = FindNearby("npcs",approach.getHomeMap(),1,"square",approach.getx(),approach.gety());
    var count = 0;
    $.each(others, function(idx,val) {
      if (val.getAttitude() === who.getAttitude()) { count++; }
    });
//    if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>It is already fighting " + count + " of my friends.</span><br />"); }
    DebugWrite("ai", "It is already fighting " + count + " of my friends.<br />");
    var oldapproach;
    if (count >= 3) {
      // there's enough people beating on the closest, head towards someone else if there is one
//      if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>That's plenty- looking for another target.</span><br />"); }
      DebugWrite("ai", "That's plenty- looking for another target.<br />");
      newapproach = FindNearestNPC(who,"enemy",[approach]);
      if (newapproach) { 
//        if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Found another target: " + newapproach.getName() + " " + newapproach.getSerial() + " .</span><br />"); }
        DebugWrite("ai", "Found another target: " + newapproach.getName() + " " + newapproach.getSerial() + " .<br />");
        oldapproach = approach;
        approach = newapproach; 
      } else {
//        if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>No other target found- sticking with current target.</span><br />"); }
        DebugWrite("ai", "No other target found- sticking with current target.<br />");
      }
    }
    if (approach) {
      var path = whomap.getPath(who.getx(), who.gety(), approach.getx(), approach.gety(),who.getMovetype());
      if (!path.length) {
        if (oldapproach) {
          approach = oldapproach;
          path = whomap.getPath(who.getx(), who.gety(), approach.getx(), approach.gety(),who.getMovetype());
        }
      }
      if (path.length) { 
        var moved = FindCombatPath(who,approach,path);
      } else {
        // no path found to target
        var moved = ais.Randomwalk(who,25,25,25,25);
      }
    }
  } else {
    // Not meleeing, not what?
    DebugWrite("ai", "In special/missile<br />");
    var nonmeleeoptions = [];
    if (who.getMissile()) { nonmeleeoptions.push("ai_missile"); }
    if (who.spellsknown) { nonmeleeoptions.push("ai_cast"); }
    if (who.specials.sing) { nonmeleeoptions.push("ai_sing"); }
    // there will be more!
    
    var performed_action = 0;
    var num_attempts = 0;
    while (!performed_action && (num_attempts < 10)) {
      performed_action = ais[nonmeleeoptions[Dice.roll("1d" + nonmeleeoptions.length + "-1")]](who);
      num_attempts++;
    }
    if (num_attempts === 10) {
      alert("10 tries, " + who.getName() + " (" + who.getSerial() + ") failed to choose a special action.");
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
  var radius = 1;
  if (who.specials.reach) { radius = 2; }
  var nearby = FindNearby("npcs",who.getHomeMap(),radius,"box",who.getx(),who.gety());
  var atked = 0;
  DebugWrite("ai", "Seeking entities in melee range. There are " + nearby.length + ".<br />");
  if (nearby.length > 0) {
    ShuffleArray(nearby);
    $.each(nearby, function(idx,val) {
      if (!atked) {
        if (val.getAttitude() !== who.getAttitude()) {
          var doatk = 1;
          if (radius > 1) { 
            // check LOE first
            if (whomap.getLOS(who.getx(), who.gety(), val.getx(), val.gety(), "loe") >= LOS_THRESHOLD) { doatk = 0; }
          }
          // attack val and call it a day!
          if (doatk) {
//            if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>ATTACK!</span><br />"); }
            DebugWrite("ai", "ATTACK!<br />");
            var result = Attack(who,val);
            maintext.addText(result["txt"]);
            atked = 1;
          }
        }
      }
    });
  }
  return atked;
}

ais.townsfolk = function(who) {
  // first, check for bark
  barks.checkBark(who);
  var retval = {};
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
      var path = themap.getPath(who.getx(),who.gety(),who.startx, who.starty, MOVE_WALK_DOOR);
      path.shift();  // first entry in the path is where it already stands
      if (path[0]){
/*        var acre = themap.getTile(path[0][0],path[0][1]);
        var possdoor = acre.getTopFeature();
        if (possdoor && (possdoor.closedgraphic)) { 
          // there is a door in the way
          if (!possdoor.open && !((typeof possdoor.getLocked === "function") && (possdoor.getLocked()))) {
            // door is not locked
//            if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>opening a door.</span><br />"); }
            DebugWrite("ai", "opening a door.<br />");
            possdoor.use(who);
            DrawMainFrame("one",who.getHomeMap().getName(),possdoor.getx(),possdoor.gety());
            return retval;
          }
        } 
*/
//        if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Moving to " + path[0][0] + "," + path[0][1] + ".</span><br />"); }
        DebugWrite("ai", "Moving to " + path[0][0] + "," + path[0][1] + ".<br />");
//        who.moveMe(path[0][0]-who.getx(), path[0][1]-who.gety());
        StepOrSidestep(who, path[0], [who.startx, who.starty]);
        return retval;
      } else {
        DebugWrite("ai", "Leashed and outside leash, but no path home.<br />");
      }
    } else if (who.getLeash()) {
      // able to wander (leash = 0 means stationary)
      var moveval = ais.Randomwalk(who,25,25,25,25);
      if ((moveval["canmove"] === 0) && (retval["nomove"] !== 1)) {
        // it picked a direction to move but failed to move
 /*       var acre = themap.getTile(who.getx()+moveval['diffx'], who.gety()+moveval['diffy']);
        if (acre !== "OoB") {
          var possdoor = acre.getTopFeature();
          if (possdoor && (possdoor.closedgraphic)) { 
            // there is a door in the way
            if (!((typeof possdoor.getLocked === "function") && (possdoor.getLocked()))) {
              // door is not locked
//              if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>opening a door.</span><br />"); }
              DebugWrite("ai", "opening a door.<br />");
              possdoor.use(who);
              DrawMainFrame("draw",PC.getHomeMap().getName(),PC.getx(),PC.gety());
              return retval;
            }
          }
        }
 */  // this part obviated by putting door opening into randomwalk
        
      }
    }
  }
  // townsfolk don't do anything else
  return retval;
}

ais.Trevor = function(who) {
  var retval = {};
  retval["fin"] = 1;
  if (DU.gameflags.getFlag("kyvek_fetch")) {
    if (!who.steps) {
      var walk = who.moveMe(1,0);
      if (walk["canmove"]) {
        who.steps = 1;
      }
    } else if (who.steps === 1) {
      var walk = who.moveMe(0,-1);
      if (walk["canmove"]) {
        who.steps = 1.5;
      }      
    } else if (who.steps === 1.5) {
      var doortile = who.getHomeMap().getTile(9,14);
      var door = doortile.getTopFeature();
      door.unlockMe();
      DrawMainFrame("one",who.getHomeMap().getName(),9,14);
      who.steps = 2;
    } else if (who.steps === 2) { 
      var doortile = who.getHomeMap().getTile(9,14);
      var door = doortile.getTopFeature();
      door.use(who);
      DrawMainFrame("draw",PC.getHomeMap().getName(),PC.getx(),PC.gety());
      who.steps = 3;
    } else if ((who.steps >= 3) && (who.steps <= 5)) {
      var walk = who.moveMe(0,-1);
      if (walk["canmove"]) {
        who.steps++;
      }
    } else if (who.steps === 6) {
      var walk = who.moveMe(1,0);
      if (walk["canmove"]) {
        who.steps++;
      }
    } else if (who.steps === 7) {
      who.steps++;
    } else if (who.steps === 8) {
      var walk = who.moveMe(-1,0);
      if (walk["canmove"]) {
        who.steps++;
      }
    } else if ((who.steps >= 9) && (who.steps <= 11)) {
      var walk = who.moveMe(0,1);
      if (walk["canmove"]) {
        who.steps++;
      }
    } else if (who.steps === 12) {
      var doortile = who.getHomeMap().getTile(9,14);
      var door = doortile.getTopFeature();
      door.use(who);
      DrawMainFrame("draw",PC.getHomeMap().getName(),PC.getx(),PC.gety());
      who.steps++;
    } else if (who.steps === 13) {
      var doortile = who.getHomeMap().getTile(9,14);
      var door = doortile.getTopFeature();
      door.lockMe(2);
      DrawMainFrame("one",who.getHomeMap().getName(),9,14);
      who.steps = 13.5;
    } else if (who.steps === 13.5) {
      var walk = who.moveMe(0,1);
      if (walk["canmove"]) {
        who.steps = 14;
      }      
    } else if (who.steps === 14) {
      var walk = who.moveMe(-1,0);
      if (walk["canmove"]) {
        who.steps++;
      }
    } else if (who.steps > 14) {
      if (who.getHomeMap() === PC.getHomeMap()) {
        if ((PC.getx() >= 8) && (PC.getx() <= 10) && (PC.gety() >= 15) && (PC.gety() <= 19)) {
          maintext.addText("Trevor hands you a wooden box, sealed with wax. \"Give this to Kyvek and all debts will be paid.\" He makes a mark in his ledger.");
          var box = localFactory.createTile("KyvekBox");
          PC.addToInventory(box,1);
          DU.gameflags.deleteFlag("kyvek_fetch");
          DU.gameflags.deleteFlag("pay_kyvek");
          DU.gameflags.setFlag("given_box",1);
          maintext.addText("<span class='sysconv'>You have obtained: " + box.getFullDesc() + ".</span>");
        }
      }
    }
  }
  return retval;
}

ais.AnnaLeaves = function(who) {
  if (!who.dest) { who.dest = 1; }
  var retval = {};
  retval["fin"] = 1;
  var themap = who.getHomeMap();
  var annax = who.getx();
  var annay = who.gety();
  if (who.gety() === 59) {
    DU.gameflags.setFlag("anna_left",1);
    themap.deleteThing(who);
    DrawMainFrame("one",themap.getName(),annax,annay);
    return retval;
  }
  
  var path;
  var pathfound;
  
  while (!pathfound) {
    if (who.dest === 1) {
      path = themap.getPath(annax, annay, 26, 33, who.getMovetype());
    } else if (who.dest === 2) {
      path = themap.getPath(annax, annay, 26, 41, who.getMovetype());
    } else if (who.dest === 3) {
      path = themap.getPath(annax, annay, 25, 41, who.getMovetype());
    } else if (who.dest === 4) {
      path = themap.getPath(annax, annay, 25, 59, who.getMovetype());
    }
    path.shift();
    if (!path[0]) { who.dest++; pathfound = 0;}
    else { pathfound = 1; }
  }
  
  // step on the path
  // check for mob, if mob, try to move in the perpendicular direction that gets you closer to your current dest
  var diffx = path[0][0] - annax;
  var diffy = path[0][1] - annay;
  var fullx = 25 - annax;
  var fully = 59 - annay;
  
  var moved = who.moveMe(diffx,diffy);
  if (!moved["canmove"]) {
    if (diffx !== 0) {
      if (fully > 0) { who.moveMe(0,1); }
      else { who.moveMe(0,-1); }
    } else {
      if (fullx > 0) { who.moveMe(1,0); }
      else { who.moveMe(-1,0); }
    }
  }
  
  return retval;
}

ais.GarrickAttack = function(who) {
  var retval = {};
  retval["fin"] = 1;
  var themap = who.getHomeMap();
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
    var aoife;
    var npcs = PC.getHomeMap().npcs.getAll();
    $.each(npcs, function(idx,val) {
      if (val.getNPCName() === "Aoife") { aoife = val; }
    });
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
      var path = themap.getPath(who.getx(), who.gety(), PC.getx(), PC.gety(), MOVE_WALK_DOOR);
      var moved = FindCombatPath(who,PC,path);
    }
  }
  return retval;
}

function GarrickScene(stage) {
  gamestate.setMode("null");
  var aoife;
  var garrick
  var npcs = PC.getHomeMap().npcs.getAll();
  $.each(npcs, function(idx,val) {
    if (val.getNPCName() === "Aoife") { aoife = val; }
    if (val.getNPCName() === "Garrick") { garrick = val; }
  });
  var retval = {};
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
      var NPCevent = new GameEvent(garrick);
      DUTime.addAtTimeInterval(NPCevent,garrick.nextActionTime());
      retval["fin"] = 1;
    }
    return retval;
  } else {
    // what should we do if Aoife is dead somehow? Only real way is if PC attacked her, in which case town has turned on them anyway.
    retval["fin"] = 1;
    return retval;
  }
}

ais.AoifeAttack = function(who) {
  var retval = {};
  retval["fin"] = 1;
  var aoifemap = who.getHomeMap();
  var npcs = aoifemap.npcs.getAll();
  var garrick;
  $.each(npcs, function(idx, val) {
    if (val.getNPCName() === "Garrick") { garrick = val; }
  });
  if (garrick) {
    if(IsAdjacent(who,garrick)) {
      retval = Attack(who,garrick);
    } else {
      var path = aoifemap.getPath(who.getx(), who.gety(), garrick.getx(), garrick.gety(), MOVE_WALK_DOOR);
//      path.shift();
//      var fullx = garrick.getx() - who.getx();
//      var fully = garrick.gety() - who.gety();
//      var moved = StepOrSidestep(who,path[0],[fullx,fully]);
      var moved = FindCombatPath(who,garrick,path);
      
    }
  } else {
    alert("Where'd Garrick go?");
  }
  return retval;
}

ais.GarrickEscort = function(who) {
  if (!who.dest) { who.dest = 1; }
  var retval = {};
  retval["fin"] = 1;
  var themap = who.getHomeMap();
  var gx = who.getx();
  var gy = who.gety();
    
  var path;
  var pathfound;
  while (!pathfound) {
    if (who.dest === 1) {
      path = themap.getPath(gx, gy, 26, 40, MOVE_WALK_DOOR);
    } else if (who.dest === 2) {
      path = themap.getPath(gx, gy, 25, 41, who.getMovetype());
    } else if (who.dest === 3) {
      path = themap.getPath(gx, gy, 24, 50, who.getMovetype());
    } else if (who.dest === 4) {
      path = themap.getPath(gx, gy, 22, 50, MOVE_WALK_DOOR);
    } else if (who.dest ===5) {
      var doortile = themap.getTile(gx-1,gy);
      var door = doortile.getTopFeature();
      door.unlockMe();
      who.dest++;
      return retval;
    } else if (who.dest === 6) {
      path = themap.getPath(gx, gy, 6, 52, MOVE_WALK_DOOR);
    } else if (who.dest === 7) {
      var doortile = themap.getTile(gx,gy+1);
      var door = doortile.getTopFeature();
      door.unlockMe();
      who.dest++;
      return retval;
    } else if ((who.dest >= 8) && (who.dest <= 10)) {
      StepOrDoor(who,[gx,gy+1]);
      who.dest++;
      return retval;
    } else if (who.dest === 11) {
      var doortile = themap.getTile(6,53);
      var door = doortile.getTopFeature();
      door.use(who);
      DrawMainFrame("one",who.getHomeMap().getName(),6,53);
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
  var moved = StepOrSidestep(who, path[0], [6,52]);
  
  return retval;
}

ais.AshardenBook = function(who) {
  if (!who.dest) { who.dest = 1; }
  var retval = {};
  retval["fin"] = 1;
  var themap = who.getHomeMap();
  var gx = who.getx();
  var gy = who.gety();
    
  var path;
  var pathfound;
  while (!pathfound) {
    if (who.dest === 1) {
      path = themap.getPath(gx, gy, 29, 18, MOVE_WALK);
    } else if (who.dest === 2) {
      var tile = themap.getTile(30,18);
      var fea = tile.getFeatures();
      var field;
      $.each(fea, function(idx,val) {
        if (val.getName() === "SleepField") { field = val; }
      });
      if (field) {
        themap.deleteThing(field);
        maintext.addText("Asharden gestures and the magic field disappears.");
        DrawMainFrame("one",who.getHomeMap().getName(),30,18);
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
        who.setConversation("asharden");
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
  var desttile = themap.getTile(path[0][0],path[0][1]);
  var npcs = desttile.getNPCs();
  if (npcs.length) {
    if (Dice.roll("1d4") === 1) {
      if ((PC.getHomeMap() === who.getHomeMap()) && (GetSquareDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= 5)) {
        maintext.addText('Asharden says, "Excuse me."');
      }
    }
  }
  var moved = StepOrSidestep(who, path[0], [32,18]);
  
  return retval;
}


ais.AoifeEscort = function(who) {
  var retval = {};
  retval["fin"] = 1;
  var themap = who.getHomeMap();
  var allnpcs = themap.npcs.getAll();
  var garrick;
  $.each(allnpcs, function(idx,val) {
    if (val.getNPCName() === "Garrick") { garrick = val;}
  });
  if (garrick.getx() < 7) {
    who.setCurrentAI(who.getPeaceAI());
    return retval;
  }
  var path = themap.getPath(who.getx(), who.gety(), garrick.getx(), garrick.gety(), MOVE_WALK_DOOR);
  path.shift();
  path.pop();
  if (path[0]) {
    StepOrSidestep(who,path[0],[6,32]);

  } else {
    if ((themap === PC.getHomeMap()) && (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) < 6) && (Math.random() < .3)) {
      maintext.addText('Aoife says, "Come on, let\'s go."');
    }
  }
  return retval;
}

ais.CourierPath = function(who) {
  var retval = {};
  retval["fin"] = 1;
  var whomap = who.getHomeMap();
  if (!who.direction) { who.direction = "n"; }
  if (who.getx() === 0) {
    if (!who.count) { who.count = 0; }
    if (who.count < 3) { 
      who.count++; 
      DebugWrite("ai","Waiting in town.");
      return retval; 
    }
    
    if (who.direction === "n") {
      var tile = whomap.getTile(48,90);
      var npcs = tile.getNPCs();
      if (!npcs.length) {
        var pcs = tile.getPCs();
        if (!pcs.length) {
          whomap.moveThing(48,90,who);
          who.direction = "s";
          DebugWrite("ai","Exiting Black Dragon Castle, by which I mean teleporting in from the corner.");
        } else { DebugWrite("ai","Didn't come out of BDC- PC in the way."); }
      } else { DebugWrite("ai","Didn't come out of BDC- NPC in the way."); }
    } else {
      var tile = whomap.getTile(63,119);
      var npcs = tile.getNPCs();
      if (!npcs.length) {
        var pcs = tile.getPCs();
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
    DrawMainFrame("one",whomap.getName(),64,119);
  } else if ((who.getx()===49) && (who.gety()===90)) {
    whomap.moveThing(0,0,who);
    DebugWrite("ai", "Entering BDC, by which I mean teleporting to the corner.");
    DrawMainFrame("one",whomap.getName(),49,90);
  } else {
    var dest = [];
    if (who.direction === "n") { dest[0]=49; dest[1]=90; }
    else { dest[0]=64;dest[1]=119; }
    var path = whomap.getPath(who.getx(),who.gety(),dest[0],dest[1],who.getMovetype());
    path.shift();
    if (path.length) {
      retval = StepOrSidestep(who, [path[0][0],path[0][1]], [dest[0],dest[1]], "nopush");
    }
  }
  return retval;
}

ais.Sentinel = function(who) {
  var destinations = [];
  var jumps = [];
  destinations[0] = ["w","w","n","n","w","w","w","w","w","e","e","e","e","e","e","e","e","e","s","s","s","s","n","n","n","n","w","w","w","w","s","s","e","e"];
  jumps[0] = { 2:32, 6:12, 10:8, 18:26, 23:20, 30:4};
  destinations[1] = ["w","n","w","w","s","s","s","w","w","n","n","n","n","s","s","s","s","e","e","n","n","n","e","e","s","e","s","s","s","s","w","w","w","w","e","e","e","e","s","s","w","w","w","w","s","s","e","e","e","e","w","w","w","w","n","n","e","e","e","e","n","n","w","w","w","w","e","e","e","e","n","n","n","n"];
  jumps[1] = { 11:15,13:13,30:38,36:32,46:54,52:48,62:70,68:64};
  destinations[2] = ["n","n","n","n","n","e","e","e","w","w","w","s","s","s","s","s","s","s","s","e","e","e","e","n","n","w","w","n","n","n","n","s","s","s","s","e","e","s","s","w","w","w","w","n","n","n"];
  jumps[2] = { 1:15,6:10,8:8,13:3,21:41,28:34,32:30,39:23};
  destinations[3] = ["w","w","w","w","w","s","n","e","e","e","e","e","n","n","e","e","s","s","e","e","e","e","e","e","w","w","w","w","w","w","n","n","w","w","s","s"];
  jumps[3] = { 2:10, 8:4, 20:28, 26:22};
  
//  if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>SENTINEL " + who.patrol + " AI beginning. Standing at " + who.getx() + "," + who.gety() + ". Path takes it " + destinations[who.patrol][who.step] + ". </span><br />"); }
  DebugWrite("ai", "SENTINEL " + who.patrol + " AI beginning. Standing at " + who.getx() + "," + who.gety() + ". Path takes it " + destinations[who.patrol][who.step] + ". <br />");
  // sequence: first, see if player is in front of, if so spend action teleporting player back to center
  //                  (also do this to the player's summoned NPCs if they have one)
  // then, see if path is blocked, if so, if there is a jump, jump to next step without moving
  // if neither of those things happened, take the next step
  
  var mymap = who.getHomeMap();
  var diffx=0;
  var diffy=0;
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

  var retval = {};
  var desttile = mymap.getTile(who.getx()+diffx,who.gety()+diffy);
  var moveval = desttile.canMoveHere(who.getMovetype());
  if ((PC.getHomeMap() === mymap) && (PC.getx() === who.getx()+diffx) && (PC.gety() === who.gety()+diffy)) {
//    if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>SENTINEL " + who.patrol + ": PC in the way. Removing.</span><br />"); }
    DebugWrite("ai", "SENTINEL " + who.patrol + ": PC in the way. Removing.<br />");
    mymap.moveThing(16,13,PC);
    maintext.addText("The sentinel teleports you away.");
    retval["fin"] = 1;
    who.waits = 0;
  } else if (moveval["canmove"] !== 1) {
    // path is blocked
    var blocker = desttile.getTopNPC();
    if (blocker) {
//      if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Path is blocked by " + blocker.getName() + ".</span><br />"); }
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
            var starttile = mymap.getTile(who.startx,who.starty);
            var whosehere = starttile.getTopNPC();
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
//          if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Been standing in place too long, going home.</span><br />"); }
          DebugWrite("ai", "Been standing in place too long, going home.<br />");
          var starttile = mymap.getTile(who.startx,who.starty);
          var whosthere = starttile.getTopNPC();
          if (!whosthere) {
            mymap.moveThing(who.startx, who.starty, who);
          } // otherwise, can't go back home because someone is there
        }    
      }
    } else {
//      if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>SENTINEL " + who.patrol + ": Path blocked- skip from " + who.step + " to "); }
      DebugWrite("ai", "SENTINEL " + who.patrol + ": Path blocked- skip from " + who.step + " to ");
      who.step = jumps[who.patrol][who.step];
//      if (debug && debugflags.ai) { dbs.writeln(who.step + ".</span><br />"); }
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
  var retval = ais.OutdoorHostile(who, radius, "none");
  return retval;  
}

ais.Bandit = function(who,radius) {
  var retval = ais.OutdoorHostile(who, radius, "road");
  return retval;
}

ais.Monster = function(who,radius) {
  var poiname = "wild";
  if (who.altPoI) { poiname = who.altPoI; }
  var retval = ais.OutdoorHostile(who, radius, poiname);
  return retval;
}

ais.OutdoorHostile = function(who, radius, pname) {
  if (!radius) { radius = 0; }
  
  var retval = {fin: 1};
//  if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange; font-weight:bold'>AI " + who.getName() + " " + who.getSerial() + " is going. Radius: " + radius + ".</span><br />"); }
  DebugWrite("ai", "AI " + who.getName() + " " + who.getSerial() + " is going. Radius: " + radius + ".<br />");
  // First, see if the PC is adjacent and if so, smite.
  var locx = PC.getx();
  var locy = PC.gety();
  var pcmap = PC.getHomeMap();
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
    var hunt = ais.HuntPC(who,radius);

    if (hunt) { 
      DebugWrite("ai", "Hunt was successful, trying to follow the path.<br />");
      retval = ais.SurfaceFollowPath(who,40,1);   
      return retval; // we're done here either way
    }  
  }

  if (pname !== "none") {
    // we have neither attacked, moved, nor hunted- now we look for a PoI to go towards
    DebugWrite("ai", "AI " + who.getName() + " has neither attacked, moved, nor hunted- now look for a PoI.<br />");
    var movepoi = ais.ProcessPoI(who, pname);
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
  var themap =  who.getHomeMap();
	// Is the PC within range to be hunted?
	var locx = PC.getx();
	var locy = PC.gety();
	if (PC.getHomeMap() !== themap) {
	  var pcmap = PC.getHomeMap();
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
    
    var losresult = themap.getLOS(who.getx(), who.gety(), locx, locy);
    if (losresult > 2) { 
//      if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange; font-weight:bold'>PC is within radius but not in sight, no hunt.</span><br />"); }
      DebugWrite("ai", "PC is within radius but not in sight, no hunt.<br />");
      return 0; 
    }  // can't see the PC and they aren't really close, no hunt
	}
	
	// HUNT!
	// find path to the PC
//	if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange; font-weight:bold'>Hunting!</span><br />"); }
	DebugWrite("ai", "HUNTING!<br />");
	var destination = { x: locx, y: locy };
	
	//destination = CheckTownProximity(destination, who.getHomeMap());  // destination moved away if the target is too near a town.
		
	var path = themap.getPath(who.getx(), who.gety(), destination.x, destination.y, who.getMovetype());
	if (path.length) {
   	path.shift();  // because the first step is where it is already standing.
    DebugWrite("ai", "<span style='font-weight:bold'>From: " + who.getx() + ", " + who.gety() + " to " + destination.x + ", " + destination.y+ "<br />First step is: " + path[0][0] + ", " + path[0][1] + "<br />Next step is: " + path[1][0] + ", " + path[1][1] + "</span><br />");
    who.setCurrentPath(path);

    var dur = Dice.roll("1d3-2") + Math.floor(path.length / 3);
    if (dur < 1) { dur = 1; }
    who.setDestination(destination, dur);
    who.setDestinationType("PC");
    
    return 1;
  } else { 
//    if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange; font-weight:bold'>No available path, hunt abandoned.</span><br />"); }
    DebugWrite("ai", "No available path, hunt abandoned.<br />");
    return 0;
  }
	
}

ais.SurfaceFollowPath = function(who, random_nomove, random_tries) {
  DebugWrite("ai", "<span style='font-weight:bold'>AI " + who.getName() + " in SurfaceFollowPath.</span><br />");
  var retval = { fin: 0 };
  var spawnedby = who.getSpawnedBy();
  var leashpresent = 0;
  if (spawnedby && (spawnedby.getSpawnLeash() || spawnedby.getSpawnSoftLeash())) { leashpresent = 1; }
  
  if ((who.getCurrentPath().length > 0) && (who.getTurnsToRecalcDest() > 0)) {
    var coords = who.getNextStep();
    DebugWrite("ai", "Check path distance? My location: " + who.getx() + ", " + who.gety() + ", next step is: " + coords[0] + ", " + coords[1] + ".<br />");
    if (GetDistance(who.getx(), who.gety(), coords[0], coords[1]) === 1) {  // the next step is only a step away
      var diffx = coords[0] - who.getx();
      var diffy = coords[1] - who.gety();
      var civilized = 0;
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
      var turnscheck = who.setTurnsToRecalcDest(who.getTurnsToRecalcDest() - 1);
      DebugWrite("ai", "There are now " + turnscheck + " turns left on the existing path.<br />");
      var leashed = 0;
      if (leashpresent) {
        var spawndist = GetDistance(coords[0], coords[1], spawnedby.getx(), spawnedby.gety());  // distance from spawner to target location
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
          var tile = who.getHomeMap().getTile(who.getx(), who.gety());
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
        var path = who.getHomeMap().getPath(who.getx(), who.gety(), spawnedby.getx(), spawnedby.gety(), who.getMovetype());
        if (path.length) {
          path.shift();
          if (path.length) {
            var dur = Math.floor(path.length / 3) + Dice.roll("1d5-3");
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
      for (var i = 0; i<random_tries; i++) {
        if (!random_nomove) { random_nomove = 0; }
        var split_move = (100-random_nomove)/3;
        if (diffx === 1) { retval = ais.Randomwalk(who,split_move,0,split_move,split_move); }
        else if (diffx === -1) { retval = ais.Randomwalk(who,split_move,split_move,split_move,0); }
        else if (diffy === 1) { retval = ais.Randomwalk(who,0,split_move,split_move,split_move); }
        else if (diffy === -1) { retval =  ais.Randomwalk(who,split_move,split_move,0,split_move); }
        else { alert("How did I get here? ais.FollowPath."); }
        if (!retval["nomove"]) { 
//          if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange; font-weight:bold'>Successful randomwalk.</span><br />"); }
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
  var retval = {};
  var diffx = 0;
  var diffy = 0;
  
  if (chance_north + chance_west + chance_east + chance_south  > 100) {
    chance_north = 25;
    chance_south = 25;
    chance_east = 25; 
    chance_west = 25;
  }
  
  var roll = Dice.roll("1d100");
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
  var desttile = who.getHomeMap().getTile(who.getx()+diffx, who.gety()+diffy);
  if (desttile === "OoB") {
    retval["nomove"] = 1;
    retval["canmove"] = 0;
    retval["diffx"] = diffx;
    retval["diffy"] = diffy;
    return retval;     
  }
  var fea = desttile.getFeatures();
  
  if (fea) {
    for (var i=0; i<fea.length; i++){
      if (fea[i].getName().indexOf("Field") !== -1) {  // won't wander into a Field
        retval["nomove"] = 1;
        retval["canmove"] = 0;
        retval["diffx"] = diffx;
        retval["diffy"] = diffy;
        return retval; 
      } 
    }
  }
  
  retval = StepOrSidestep(who, [who.getx()+diffx,who.gety()+diffy], [who.getx()+diffx,who.gety()+diffy], "nopush");
  retval["nomove"] = 0;  // NOTE- this is 0 even if they didn't move. If it gets to this point,
                         // canmove is the only reliable indicator of whether it moved. Checking
                         // for canmove=0 AND nomove=0 reveals that a move was attempted but failed.
  return retval;

}


ais.ProcessPoI = function(who,poiname) {
  var themap = who.getHomeMap();
  if (!who.getPoI().x) {
    DebugWrite("ai", who.getName() + ", which follows " + poiname + " on map " + themap.getName() + ", has no PoI yet. Searching...<br />");
    var poi = FindClosestPoI(who.getx(), who.gety(), themap, poiname);
    DebugWrite("ai", "Closest PoI: " + poi.x + ", " + poi.y + "<br />");
    who.setPoI(poi);
    // random scatter the actual destination to near the PoI
    
    var path = [];
    var pathcount = 0;
    while ((path.length === 0) && (pathcount < 10)) {
      var xval = Dice.roll("1d9-5") + poi.x;
      var yval = Dice.roll("1d9-5") + poi.y;
    
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
    var dur = 2*Math.floor(path.length / 3) + Dice.roll("1d5-3");
    if (dur > path.length) { dur = path.length; }
    if (dur < 0) { dur = 0; }
    who.setCurrentPath(path);
    who.setDestination({x: xval, y: yval}, dur);
    who.setDestinationType("PoI");
    DebugWrite("ai", "Set path to: " + xval + ", " + yval + "<br />");
    return 1;
  } else {
    var coords = who.getCurrentPath()[0];
    if ((who.getTurnsToRecalcDest() <= 0) || !coords) {
      DebugWrite("ai", "Path expired, find a new PoI!<br />");
      var connections = who.getPoI().connections;
      var connind = Dice.roll("1d" + connections.length + "-1");
      var poi = who.getPoI().connections[connind];
      who.setPoI(poi);
      DebugWrite("ai", "New PoI coords: " + poi.x + ", " + poi.y + "<br />");
      var path = [];
      var pathcount = 0;
      while ((path.length === 0) && (pathcount < 10)) {
        var xval = Dice.roll("1d9-5") + poi.x;
        var yval = Dice.roll("1d9-5") + poi.y;
    
        path = themap.getPath(who.getx(), who.gety(), xval, yval, who.getMovetype());
        path.shift();
        pathcount++;
      }
      if (path.length === 0) { 
        DebugWrite("ai", "Couldn't find a path to anything near the PoI, gave up. Will randomwalk.")
        return 0; 
      }
      var dur = 2*(path.length/3) + Dice.roll("1d3-1");
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
      var coords = who.getDestination();
      var path = themap.getPath(who.getx(), who.gety(), coords.x, coords.y, who.getMovetype());
      path.shift();
      who.setCurrentPath(path);
      return 3;
    } 
  }

  return 0;
}

function NPCAttackPCMap(npc) {
  var combatmapname = GetCombatMap(npc, PC);
  var newmap = new GameMap();
  newmap.loadMap(combatmapname);
  maps.addMapByRef(newmap);

  PC.getHomeMap().deleteThing(npc);
  var spawner=npc.getSpawnedBy();
  if (spawner) {
    spawner.deleteSpawned(npc);
  }

  var desttile = MoveBetweenMaps(PC,PC.getHomeMap(),newmap, newmap.getEnterX(), newmap.getEnterY());
    
  var monsters = PlaceMonsters(newmap,npc,0);
  DUTime.removeEntityFrom(npc);
  DUTime.removeEntityFrom(PC);
  var NPCevent = new GameEvent(PC);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
      
  DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
  
  var npcname = npc.getDesc();
  npcname = npcname.charAt(0).toUpperCase() + npcname.slice(1);
  if (npc.attackword) {
    maintext.addText(npcname + " " + npc.attackword + "!");
  } else {
    maintext.addText(npcname + " attack!");
  }
  
  return 1;
}

function CheckTownProximity(coords, map) {
  var mapfeatures = map.features.getAll();  // weirdly, this assumes that all maps this will be run on have features. Probably a safe assumption.
  if (!mapfeatures[0]) { return 0; }  // just in case one doesn't!

  for (var i = 0; i < mapfeatures.length; i++) {
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
  
  var closeind = 0;
  var closest = GetDistance(xval,yval,themap.network[poiname][0].x, themap.network[poiname][0].y);
  
  for (var i=1; i<themap.network[poiname].length; i++) { 
    var ind = GetDistance(xval,yval,themap.network[poiname][i].x, themap.network[poiname][i].y);
    if (ind < closest) { closeind = i; }
  }
  return themap.network[poiname][closeind];
}

// who, approach, path
function FindCombatPath(who,approach,path) {
  var whomap = who.getHomeMap();
  var moved;
  path.shift();
  path.pop();
  var finaldest = whomap.getTile(path[path.length-1][0],path[path.length-1][1]);
  var firststep = whomap.getTile(path[0][0],path[0][1]);

  // if path > 3ish, try to walk along it, if short, check if destination tile is occupied, 
  // if so, search adjacent to approach to find an empty tile and pathfind to it.
  if ((path.length > 3) || (!finaldest.getTopNPC() && !firststep.getTopNPC()))  {
//    if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Path long enough or short but start and end positions are empty- walking.</span><br />"); }
    DebugWrite("ai", "Path long enough or short but start and end positions are empty- walking.<br />");
    moved = StepOrSidestep(who,path[0],path[path.length-1]);
  } else {
    // path currently goes through some NPCs. Need to make a better path.
    // first step- create a local pathgrid that takes NPCs into account.
    // to get here the path distance can be no more than 4. Tweak this after playtest.
//    if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Path is short but blocked- looking for a better path.</span><br />"); }
    DebugWrite("ai", "Path is short but blocked- looking for a better path.<br />");

    var leftx = who.getx();
    var rightx = approach.getx();
    if (rightx < leftx) { 
      leftx = rightx; 
      rightx = who.getx();
    }
    var topy = who.gety();
    var bottomy = approach.gety();
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
          
//    if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Searching for a path inside bounding box- left: " + leftx + ", right: " + rightx + ", top: " + topy + ", bottom: " + bottomy + ".</span><br />"); }
    DebugWrite("ai", "Searching for a path inside bounding box- left: " + leftx + ", right: " + rightx + ", top: " + topy + ", bottom: " + bottomy + ".<br />");
    // creates a box with the two entities in the corners, and then 
    // stretches it to be large enough to find paths in

    var temppathgrid = whomap.getPathGrid(who.getMovetype()).clone();
    for (var i = leftx; i <= rightx; i++ ) {
      for (var j = topy; j <= bottomy; j++ ) {
        var thisspot = whomap.getTile(i,j);
        if (thisspot.getTopNPC()) {
          temppathgrid.setWalkableAt(i,j,false);
        }
      }
    }
    // Created pathgrid that is a duplicate of the maps, but with NPCs marked impassible. 
    temppathgrid.setWalkableAt(who.getx(),who.gety(),true); // pathfinding requires start tile to be walkable
       
    // from here, find 5 paths, to enter and each corner
    // each path requires its own clone with that location marked walkable- for corners, note if destination is occupied but still get path
    var whichdir = GetOctant(approach.getx()-who.getx(), approach.gety()-who.gety());
          
    var endpoints = [];  
    switch(whichdir) {                                         // dir from target entity
      case 0:   // AI is heading north
        endpoints[0] = [approach.getx(), approach.gety()+1];   // south
        endpoints[1] = [approach.getx()+1, approach.gety()+1]; // southeast
        endpoints[2] = [approach.getx()-1, approach.gety()+1]; // southwest
        break;
      case 1:   // AI is heading northeast
        endpoints[0] = [approach.getx(), approach.gety()+1];   // south
        endpoints[1] = [approach.getx()-1, approach.gety()];   // west
        endpoints[2] = [approach.getx()-1, approach.gety()+1]; // southwest
        break;
      case 2:   // AI is heading east
        endpoints[0] = [approach.getx()-1, approach.gety()-1]; // northwest
        endpoints[1] = [approach.getx()-1, approach.gety()];   // west
        endpoints[2] = [approach.getx()-1, approach.gety()+1]; // southwest
        break;
      case 3:   // AI is heading southeast
        endpoints[0] = [approach.getx()-1, approach.gety()-1]; // northwest
        endpoints[1] = [approach.getx()-1, approach.gety()];   // west
        endpoints[2] = [approach.getx(), approach.gety()-1];   // north
        break;
      case 4:   // AI is heading south
        endpoints[0] = [approach.getx()-1, approach.gety()-1]; // northwest
        endpoints[1] = [approach.getx()+1, approach.gety()-1]; // northeast
        endpoints[2] = [approach.getx(), approach.gety()-1];   // north
        break;
      case 5:   // AI is heading southwest
        endpoints[0] = [approach.getx()+1, approach.gety()];   // east
        endpoints[1] = [approach.getx()+1, approach.gety()-1]; // northeast
        endpoints[2] = [approach.getx(), approach.gety()-1];   // north
        break;
      case 6:   // AI is heading west
        endpoints[0] = [approach.getx()+1, approach.gety()];   // east
        endpoints[1] = [approach.getx()+1, approach.gety()+1]; // southeast
        endpoints[2] = [approach.getx()+1, approach.gety()-1]; // northeast
        break;
      case 7:   // AI is heading northwest
        endpoints[0] = [approach.getx()+1, approach.gety()];   // east
        endpoints[1] = [approach.getx()+1, approach.gety()-1]; // southeast
        endpoints[2] = [approach.getx(), approach.gety()-1]; // south
        break;        
      default:
        alert("Switch in FindCombatPath broken.");
    }          
    
//    if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange;'>Searching for a path to these locations: (" +  endpoints[0][0] + "," + endpoints[0][1] + "),(" + endpoints[1][0] + "," + endpoints[1][1] + "),(" + endpoints[2][0] + "," + endpoints[2][1] + ").</span><br />"); }    
    DebugWrite("ai", "Searching for a path to these locations: (" +  endpoints[0][0] + "," + endpoints[0][1] + "),(" + endpoints[1][0] + "," + endpoints[1][1] + "),(" + endpoints[2][0] + "," + endpoints[2][1] + ").<br />");

    var available = [];
    var anyavailable = 0;
    $.each(endpoints, function(idx,val) {
      var desttile = whomap.getTile(val[0],val[1]);
      if (desttile.getTopNPC()) { available[idx] = 0; }
      else { available[idx] = 1; anyavailable = 1;}
    });
    
    var availdests = [];
    if (anyavailable) {
      // remove from endpoints destinations that are occupied.
      // skip this step if they all are- in that case pretend none are and just get closer
      $.each(endpoints, function(idx,val) {
        if (available[idx]) {
          availdests.push(val);
        }
      });
    } else {
      availdests = endpoints;
    }
    
    var availpaths = [];
    $.each(availdests, function(idx,val){ 
      var evenmoretempgrid = temppathgrid.clone();
      evenmoretempgrid.setWalkableAt(availdests[idx][0], availdests[idx][1]);
      var tmp = finder.findPath(who.getx(),who.gety(),availdests[idx][0],availdests[idx][1],evenmoretempgrid);
      if (tmp) {
        availpaths[idx] = tmp;
      }
    });
    
    // next up- find the shortest of the available paths
    var shortest;
    for (var i = 0; i<availpaths.length; i++) {
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
  var couriermap = who.getHomeMap();
  var npcs = couriermap.npcs.getAll();
  var whox = who.getx();
  var whoy = who.gety();
  var stillfighting = 0;
  $.each(npcs, function(idx,val) {
    if (val.getName() === "CourierGuardNPC") {
      if (!val.specials.coward) { stillfighting = 1; }
    }
  });
  
  if (stillfighting) {
    DebugWrite("ai", "Guards are still fighting!<br />");
    var runfrom = FindNearestNPC(who, "enemy");
    if (runfrom) {  // should be no way there can not be, but...
      var diffx = whox - runfrom.getx();
      var diffy = whoy - runfrom.gety();
      var rundest = [];
      var pathdest = [];
      var coin = Dice.roll("1d2");
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
        var trymove = StepOrSidestep(who,pathdest,rundest);    
      }
    }
  } else { 
    DebugWrite("ai", "Guards have fled!<br />");
    var currx = who.getx();
    var curry = who.gety();
    
    var mindist = currx;
    var dest = [0,curry];
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
    
    var runaway = 0;
    if (mindist > 0) {
      var path = couriermap.getPath(currx,curry,dest[0],dest[1],MOVE_WALK);
      path.shift();
      StepOrSidestep(who,[path[0][0],path[0][1]],[currx,0]);
    } else {
      runaway = 1;
    }
      
    if (!who.surrendered) {
      maintext.addText("The courier surrenders and drops the letter pouch!");
      var chest = localFactory.createTile("Chest");
      chest.addToContainer("CourierPouch",1);
      chest.addToContainer("Gold",30);
      couriermap.placeThing(currx,curry,chest);
      DrawMainFrame("one",who.getHomeMap().getName(),currx,curry);
      who.surrendered = 1;
    }
    
    if (runaway) {
      couriermap.deleteThing(who);
      DrawMainFrame("one",who.getHomeMap().getName(),currx,curry);
    }
    
  }
  var retval = {};
  retval["fin"] = 1;
  return retval;
}

ais.ai_sing = function(who) {
  
}

ais.ai_missile = function(who) {
  var melee = TryMelee(who);
  if (melee) { 
    DebugWrite("ai", "In missile, but something was adjacent so meleeing. THIS SHOULDN'T HAPPEN!!<br />");
    return "melee"; 
  }
  
  // find a target
  var shoot_at = FindMissileTarget(who,10);
  if (shoot_at) {
    DebugWrite("ai", "Firing a missile attack!<br />");
    var result = Attack(who,shoot_at);
    maintext.addText(result["txt"]);
  
    return "missile";
  }
  
  return 0;
  
}

ais.ai_cast = function(who) {
  
}

function FindMissileTarget(who,radius) {
  DebugWrite("ai", "In FindMissileTarget.<br />");
  var thismap = who.getHomeMap();
  var nearby = FindNearby("npcs",thismap,radius,"circle",who.getx(),who.gety());
  var listtargets = [];
  var listtargetname = [];
  var weakest;
  var closest;
  for (var i=0;i<nearby.length;i++) {
    if (nearby[i].getAttitude() === who.getAttitude()) { continue; }
    if (!weakest) { weakest=nearby[i]; }
    else { 
      if ((weakest.getHP()/weakest.getMaxHP()) > (nearby[i].getHP()/nearby[i].getMaxHP())) { 
 //       alert("replaced weakest with " + nearby[i].getName());
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
//alert(weakest.getName());
  if (weakest) { 
    listtargets.push(weakest); 
    listtargetname.push(weakest.getName());
    if (who.specials.ruthless) {
      for (var i=0; i<=8; i++) {
        // make choosing weakest more likely
        listtargets.push(weakest);
        listtargetname.push(weakest.getName());
      }
    }
  }
  if (closest) { listtargets.push(closest); listtargetname.push(closest.getName()); }
//  alert(JSON.stringify(listtargetname));
  if (listtargets[0]) {
    var idx = Dice.roll("1d"+listtargets.length+"-1");
    return (listtargets[idx]);
  } else {
    return 0;
  }
}
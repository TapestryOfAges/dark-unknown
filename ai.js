
var barks = {};
barks['jester'] = ['%THEDESC% sings, "Ho eye he hum!"'];

barks.getBark = function(idx) {
  if (barks[idx]) {
    var choice = Math.floor(Math.random()*barks[idx].length);
    return barks[idx][choice];
  }
}

barks.checkBark = function(who) {
 if ((who.getBark()) && (who.getHomeMap() === PC.getHomeMap())) {
    if (Math.floor(Math.random()*100)+1  < who.getBarkFreq()) {
      if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= who.getBarkRad()) {
        // bark!
        if (debug) { dbs.writeln("<span style='color:orange;'>Townfolk barking.</span><br />"); }
        var mybark = this.getBark(who.getBark());
        if (mybark) {
          if ((mybark.indexOf("%THEDESC%") !== -1) || (mybark.indexOf("%DESC%") !== -1)) {
            var pref = who.getPrefix();
            if (mybark.indexOf("%THEDESC%") !== -1) {
              if ((pref === "a") || (pref === "an")) { pref = "the"; }
            }
            var desc = pref + " " + who.getDesc();
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
  if (debug) { dbs.writeln("<span style='color:orange;'>Seeking PC...</span><br />"); }
  var whomap = who.getHomeMap();
  if (whomap === PC.getHomeMap()) {
    if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= radius) {
      // if can see
      var losresult = whomap.getLOS(who.getx(), who.gety(), PC.getx(), PC.gety(), losgrid);
      if (losresult < 1) {
        if (debug) { dbs.writeln("<span style='color:orange;'>Nearby and can see the PC! Aggroing.</span><br />"); }
        // WORKING HERE
        // Go aggro, turn team aggro if part of a band
        if (who.getNPCBand()) {
          SetBandAggro(who.getNPCBand(), who.getHomeMap());
        } else {
          who.setAggro();
        }
        retval["fin"] = 1;
        return retval;
      }
    }
    if ((who.getx() !== who.startx) || (who.gety() !== who.starty)) {
      if (debug) { dbs.writeln("<span style='color:orange;'>Can't see PC, heading home.</span><br />"); }
      // isn't at home, doesn't see PC, heads home
      var path = whomap.getPath(who.getx(),who.gety(),who.startx,who.starty,who.getMovetype());
      path.shift();
      var moved = StepOrDoor(who,path[0]);
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
  whomap = who.getHomeMap();
  
  if (debug) { dbs.writeln("<span style='color:orange;'>" + who.getName() + " " + who.getSerial() + " in combat AI.</span><br />"); } 
 
  if (whomap() !== PC.getHomeMap()) {
    // what happens if the PC is on another map?
    if (debug) { dbs.writeln("<span style='color:orange;'>On a different map, waiting...</span><br />"); }
    who.wait++;
    if (who.wait > 30) {
      if (debug) { dbs.writeln("<span style='color:orange;'>Waited long enough, dropping aggro.</span><br />"); }
      who.setAggro(0);
    }
    return retval;  
  }
  
  // check to see if we should cease to aggro
  // need no one in your Band be within "forgetAt" radius
  if (who.getForgetAt() && GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) > who.getForgetAt()) {
    var npcs = whomap.npcs.getAll();
    var anysee = 0;
    $.each(npcs, function(idx,val) {
      if (!anysee && (GetDistance(val.getx(),val.gety(),PC.getx(),PC.gety()) < val.getForgetAt())) {
        anysee = 1;
      }
      if (!val.getForgetAt()) { anysee = 1; }
    });
    if (!anysee) {
      if (debug) { dbs.writeln("<span style='color:orange;'>Distant, and no one in the band can see- dropping aggro.</span><br />"); }
      who.setAggro(0);
      return retval;
    }
  }
  
  if (!who.specials.undead && !who.specials.construct && !who.specials.mindless && (who.gethp() < .15*who.getMaxhp())) {
    if (debug) { dbs.writeln("<span style='color:orange;'>Too wounded, becoming a coward.</span><br />"); }
    // consider making this a check of some kind
    who.specials.coward = 1;
  }
  
  if (who.specials.coward) {
    // run away! run away!
    if (debug) { dbs.writeln("<span style='color:orange;'>Running away!</span><br />"); }
    var runfrom = FindNearestNPC(who, "enemy");
    var diffx = who.getx() - runfrom.getx();
    var diffy = who.gety() - runfrom.gety();
    // WORKING HERE
  }
  // whoo boy, here we are: still aggro, still on right map. Go!

  // decide if meleeing/approaching
  var chance = who.meleechance;
  if (chance) { chance = chance/100; }
  else { chance = 1; }
  if (debug) { dbs.writeln("<span style='color:orange;'>Chance of melee: " + chance + ".</span><br />"); }
  if (Math.random() < chance) {
    // yes
    //now find targets
    // top priority: adjacent foes
    var melee = TryMelee(who);
    if (melee) { return retval; }
    // didn't melee anything, time to try to find something to approach
  }


  // first up- choose a target
  if (!who.getTarget() || (who.getTarget().gethp()<=0)) {
    // no target, or target is dead but not yet cleaned up because it's a target
    var potentials = [];
    if (who.getAttitude() === "hostile") {
      potentials[0] = PC;
    }
    var npcs = whomap.npcs.getAll();
    var bandcount = 0;
    $.each(npcs, function(idx,val) {
      if (val.getAttitude() !== who.getAttitude()) {
        potentials.push(val);
      }
      if (val.getNPCBand() === who.getNPCBand()){ 
        bandcount++;
      }
    });
    if (potentials[1]) {
      ShuffleArray(potentials);
    }
    // WORKING HERE
  }
  
}

function TryMelee(who) {
  if (debug) { dbs.writeln("<span style='color:orange;'>Attempting melee.</span><br />"); }
  var radius = 1;
  if (who.specials.reach) { radius = 2; }
  var nearby = FindNearby("npcs",who.getHomeMap(),radius,"box",who.getx(),who.gety());
  if (nearby.length > 0) {
    ShuffleArray(nearby);
    $.each(nearby, function(idx,val) {
      if (val.getAttitude() !== who.getAttitude()) {
        if (radius > 1) { 
          // check LOE first
          if (whomap.getLOE(who.getx(), who.gety(), val.getx(), val.gety(), losgrid, 1) >= LOS_THRESHOLD) { continue; }
        }
        // attack val and call it a day!
        if (debug) { dbs.writeln("<span style='color:orange;'>ATTACK!</span><br />"); }
        var result = Attack(who,val);
        maintext.addText(result["txt"]);
        return 1;
      }
    });
  }
  return 0;
}

ais.townsfolk = function(who) {
  // first, check for bark
  barks.checkBark(who);
  var retval = {};
  retval["fin"] = 1;
  
  var themap = who.getHomeMap();
  if (Math.random() < .25) {   // 25% chance of moving, slow wander
    if (debug) { dbs.writeln("<span style='color:orange;'>Moving... </span>"); }
    if (who.getLeash() && (who.getLeash() < GetDistance(who.getx(), who.gety(), who.startx, who.starty))) {
      var path = themap.getPath(who.getx(),who.gety(),who.startx, who.starty, MOVE_WALK_DOOR);
      path.shift();  // first entry in the path is where it already stands
      var acre = themap.getTile(path[0][0],path[0][1]);
      var possdoor = acre.getTopFeature();
      if (possdoor && (possdoor.closedgraphic)) { 
        // there is a door in the way
        if (!((typeof possdoor.getLocked === "function") && (possdoor.getLocked()))) {
          // door is not locked
          if (debug) { dbs.writeln("<span style='color:orange;'>opening a door.</span><br />"); }
          possdoor.use(who);
          DrawMainFrame("one",who.getHomeMap().getName(),possdoor.getx(),possdoor.gety());
          return retval;
        }
      }
      if (debug) { dbs.writeln("<span style='color:orange;'>Moving to " + path[0][0] + "," + path[0][1] + ".</span><br />"); }
      who.moveMe(path[0][0]-who.getx(), path[0][1]-who.gety());
      return retval;
    } else if (who.getLeash()) {
      // able to wander (leash = 0 means stationary)
      var moveval = ais.Randomwalk(who,25,25,25,25);
      if (moveval["canmove"] === 0) {
        // it picked a direction to move but failed to move
        var acre = themap.getTile(who.getx()+moveval['diffx'], who.gety()+moveval['diffy']);
        var possdoor = acre.getTopFeature();
        if (possdoor && (possdoor.closedgraphic)) { 
          // there is a door in the way
          if (!((typeof possdoor.getLocked === "function") && (possdoor.getLocked()))) {
            // door is not locked
            if (debug) { dbs.writeln("<span style='color:orange;'>opening a door.</span><br />"); }
            possdoor.use(who);
            DrawMainFrame("one",who.getHomeMap().getName(),possdoor.getx(),possdoor.gety());
            return retval;
          }
        }
        
      }
    }
  }
  // townsfolk don't do anything else
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
  
  if (debug) { dbs.writeln("<span style='color:orange;'>SENTINEL " + who.patrol + " AI beginning. Standing at " + who.getx() + "," + who.gety() + ". Path takes it " + destinations[who.patrol][who.step] + ". </span><br />"); }
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
    if (debug) { dbs.writeln("<span style='color:orange;'>SENTINEL " + who.patrol + ": PC in the way. Removing.</span><br />"); }
    mymap.moveThing(16,13,PC);
    maintext.addText("The sentinel teleports you away.");
    retval["fin"] = 1;
    who.waits = 0;
  } else if (moveval["canmove"] !== 1) {
    // path is blocked
    var blocker = desttile.getTopNPC();
    if (blocker) {
      if (debug) { dbs.writeln("<span style='color:orange;'>Path is blocked by " + blocker.getName() + ".</span><br />"); }
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
          if (debug) { dbs.writeln("<span style='color:orange;'>Been standing in place too long, going home.</span><br />"); }
          var starttile = mymap.getTile(who.startx,who.starty);
          var whosthere = starttile.getTopNPC();
          if (!whosthere) {
            mymap.moveThing(who.startx, who.starty, who);
          } // otherwise, can't go back home because someone is there
        }    
      }
    } else {
      if (debug) { dbs.writeln("<span style='color:orange;'>SENTINEL " + who.patrol + ": Path blocked- skip from " + who.step + " to "); }
      who.step = jumps[who.patrol][who.step];
      if (debug) { dbs.writeln(who.step + ".</span><br />"); }
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

ais.Bandit = function(who,radius) {
  var retval = ais.OutdoorHostile(who, radius, "road");
  return retval;
}

ais.Monster = function(who,radius) {
  var retval = ais.OutdoorHostile(who, radius, "wild");
  return retval;
}

ais.OutdoorHostile = function(who, radius, pname) {
  if (!radius) { radius = 0; }
  
  var retval = {fin: 1};
  if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>AI " + who.getName() + " " + who.getSerial() + " is going.</span><br />"); }
  // First, see if the PC is adjacent and if so, smite.
  var locx = PC.getx();
  var locy = PC.gety();
  var pcmap = PC.getHomeMap();
  if (who.getHomeMap() !== pcmap) {
    if (pcmap.getName().match(/combat/)) {
      // if PC is on a combat map, use map's exit coords to determine location
      locx = pcmap.getExitToX();
      locy = pcmap.getExitToY();
    } else {
      locx = 300;
      locy = 300;
      // because these values can never be 1 away via GetDistance
    }
  }
  if (GetDistance(who.getx(), who.gety(), locx, locy) === 1) {
    if (pcmap === who.getHomeMap()) {
      if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>AI " + who.getName() + " attacks the PC!</span><br />"); }
      NPCAttackPCMap(who);
      return retval;
    } else { // PC is already in a fight
      if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>AI " + who.getName() + " adjacent to PC on world map, waiting its turn.</span><br />"); }
      retval["initdelay"] = .1;
      return retval;
    }
  }
  
  // Next, check to see if it's outside its leash radius (moved to SurfaceFollowPath)
//  var spawner = who.getSpawnedBy();
//  if ((spawner) && ) {
    
//  }
  
  // Next, check and see if there is already a path that has not expired
  // but only if the PC is not within close range- in that case, always wait to hunt
  if ((who.getHomeMap() !== pcmap) || (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) > radius/3)) {
    if (debug) { dbs.writeln("<span style='color:orange;'>PC on another map or not Close. Trying to follow a path.</span><br />"); }
    retval = ais.SurfaceFollowPath(who,40,1);   
    if (retval["fin"] === 1) { return retval; }
  }
  
  // If there is a radius attached, hunt for the PC next
  if (radius) {
    if (debug) { dbs.writeln("<span style='color:orange;'>AI hunts within " + radius + ", hunting for PC.</span><br />"); }
    var hunt = ais.HuntPC(who,radius);

    if (hunt) { 
      if (debug) { dbs.writeln("<span style='color:orange;'>Hunt was successful, trying to follow the path.</span><br />"); }
      retval = ais.SurfaceFollowPath(who,40,1);   
      return retval; // we're done here either way
    }  
  }

  // we have neither attacked, moved, nor hunted- now we look for a PoI to go towards
  if (debug) { dbs.writeln("<span style='color:orange;'>AI " + who.getName() + " has neither attacked, moved, nor hunted- now look for a PoI.</span><br />"); }
  retval = ais.ProcessPoI(who, pname);
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
	  if (pcmap.getName().match(/combat/)) {
	    locx = pcmap.getExitToX();
	    locy = pcmap.getExitToY();
	  } else {
	    // far away so all GetDistance calls fail
	    locx = 300;
	    locy = 300;
	  }
	}
	if ((themap !== PC.getHomeMap()) || (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) > radius)) {
	  if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>PC is not in range to hunt.</span><br />"); }
		return 0;  // no hunting
	}
	
	
	// if the PC is within a smaller radius (currently radius/3), hunt no matter what.
	// otherwise, check if we can see the PC, with a more forgiving threshold than used
	// in the game display
	if (GetDistance(who.getx(), who.gety(), locx, locy) > (radius/3)) {   
    
    var losresult = themap.getLOS(who.getx(), who.gety(), locx, locy, losgrid);
    if (losresult > 2) { 
      if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>PC is within radius but not in sight, no hunt.</span><br />"); }
      return 0; 
    }  // can't see the PC and they aren't really close, no hunt
	}
	
	// HUNT!
	// find path to the PC
	if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>Hunting!</span><br />"); }
	var destination = { x: locx, y: locy };
	
	//destination = CheckTownProximity(destination, who.getHomeMap());  // destination moved away if the target is too near a town.
		
	var path = themap.getPath(who.getx(), who.gety(), destination.x, destination.y, who.getMovetype());
	if (path.length) {
   	path.shift();  // because the furst step is where it is already standing.
    if (debug) { dbs.writeln("<span style='color:purple; font-weight:bold'>From: " + who.getx() + ", " + who.gety() + " to " + destination.x + ", " + destination.y+ "</span><br />"); }
    if (debug) { dbs.writeln("<span style='color:purple; font-weight:bold'>First step is: " + path[0][0] + ", " + path[0][1] + "</span><br />"); }
    if (debug) { dbs.writeln("<span style='color:purple; font-weight:bold'>Next step is: " + path[1][0] + ", " + path[1][1] + "</span><br />"); }
    who.setCurrentPath(path);

    var dur = Math.floor(Math.random()*3)-1; 
    dur = dur + Math.floor(path.length / 3);
    who.setDestination(destination, dur);
    who.setDestinationType("PC");
    
    return 1;
  } else { 
    if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>No available path, hunt abandoned.</span><br />"); }
    return 0;
  }
	
}

ais.SurfaceFollowPath = function(who, random_nomove, random_tries) {
  if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>AI " + who.getName() + " in SurfaceFollowPath.</span><br />"); }
  var retval = { fin: 0 };
  var spawnedby = who.getSpawnedBy();
  var leashpresent = 0;
  if (spawnedby && (spawnedby.getSpawnLeash() || spawnedby.getSpawnSoftLeash())) { leashpresent = 1; }
  
  if ((who.getCurrentPath().length > 0) && (who.getTurnsToRecalcDest() > 0)) {
    var coords = who.getNextStep();
    if (debug) { dbs.writeln("<span style='color:red; font-weight:bold'>Check path distance? My location: " + who.getx() + ", " + who.gety() + ", next step is: " + coords[0] + ", " + coords[1] + ".</span><br />"); }
    if (GetDistance(who.getx(), who.gety(), coords[0], coords[1]) === 1) {  // the next step is only a step away
      var diffx = coords[0] - who.getx();
      var diffy = coords[1] - who.gety();
      var civilized = 0;
      // check to see if move would bring close to a settlement
      if (who.getHomeMap().getScale() === 0) {  // only care about it if on an outdoor map
        if (debug) { dbs.writeln("Checking for civilization proximity."); }
        civilized = CheckTownProximity( { x: coords[0], y: coords[1] }, who.getHomeMap());
        if (civilized) { 
          if (debug) { dbs.writeln(" Civilized!"); }
          retval["canmove"] = 0; 
        }
        if (debug) { dbs.writeln("<br />"); }
      }  
      if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>AI " + who.getName() + " moving from " + who.getx() + ", " + who.gety() + " to " + coords[0] + ", " + coords[1] + " :"); }      
      who.setTurnsToRecalcDest(who.getTurnsToRecalcDest() - 1);
      var leashed = 0;
      if (leashpresent) {
        var spawndist = GetDistance(coords[0], coords[1], spawnedby.getx(), spawnedby.gety());  // distance from spawner to target location
        if ((who.getDestinationType() === "PC") && (spawndist > spawnedby.getSpawnLeash())) { // chasing the PC, but trying to move beyond leash
          retval["canmove"] = 0;
          leashed = 1;
        } else if (spawndist > spawnedby.getSpawnSoftLeash()) { // doing anything else but threatening to move past soft leash
          retval["canmove"] = 0;
          leashed = 1;
        }
      }
      if (!leashed && !civilized) {  
        retval = who.moveMe(diffx, diffy, 0);
      }
      if (retval["canmove"] === 1) { // it moved!
        retval["fin"] = 1;
        if (debug) { dbs.writeln("successfully. New location: " + who.getx() + ", " + who.gety() + "</span><br />"); }
        if (debug) {
          var tile = who.getHomeMap().getTile(who.getx(), who.gety());
          if (!tile.canMoveHere(MOVE_WALK)) {
            dbs.writeln("<span style='color:orange; font-weight:bold; text-decoration:underline'>AI moved onto a tile that cannot be walked on: " + tile.getTerrain().getName() + ".</span><br />");
          }
        }
        return retval; // we're done here
      }
      // failed to move. On the surface, this means there was another AI there, or it hit its leash.
      // in scale map, could be a closed door.
      if (debug) { dbs.writeln("unsuccessfully.</span><br />"); }
      
      // if there is another AI in the way, randomwalk
      if (!random_tries) { random_tries = 1; }
      for (var i = 0; i<random_tries; i++) {
        var split_move = (100-random_nomove)/3;
        if (diffx === 1) { retval = ais.Randomwalk(who,split_move,0,split_move,split_move); }
        else if (diffx === -1) { retval = ais.Randomwalk(who,split_move,split_move,split_move,0); }
        else if (diffy === 1) { retval = ais.Randomwalk(who,0,split_move,split_move,split_move); }
        else if (diffy === -1) { retval =  ais.Randomwalk(who,split_move,split_move,0,split_move); }
        else { alert("How did I get here? ais.FollowPath."); }
        if (!retval["nomove"]) { 
          if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>Successful randomwalk.</span><br />"); }
          return retval; 
        }  // moved
      }
      
      //didn't move. Not going to try again. Ending turn.
      retval["fin"] = 1;
      return retval;
      
    } 
    // if next step is more than one step away, a previous move failed, recalculate now
    if (debug) { dbs.writeln("<span style='color:red; font-weight:bold'>Path distant? My location: " + who.getx() + ", " + who.gety() + ", next step is: " + who.getCurrentPath()[0][0] + ", " + who.getCurrentPath()[0][1] + ".</span><br />"); }
  }
  if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>No path to follow. Path length: " + who.getCurrentPath().length + ". Turns: " + who.getTurnsToRecalcDest() + ".</span><br />"); }
  return retval;
}

ais.Randomwalk = function(who, chance_north, chance_east, chance_south, chance_west) {
  // default values, 25 25 25 25. If it doesn't sum to 100, the remainder is chance_none.
  var retval = { nomove: 0 };
  var diffx = 0;
  var diffy = 0;
  
  if (chance_north + chance_west + chance_east + chance_south  > 100) {
    chance_north = 25;
    chance_south = 25;
    chance_east = 25; 
    chance_west = 25;
  }
  
  var roll = Math.floor(Math.random() * 100)+ 1;
  if (roll <= chance_north) { diffy = -1; }
  else if (roll - chance_north < chance_east) { diffx = 1; }
  else if (roll - chance_north - chance_east < chance_south) { diffy = 1; }
  else if (roll - chance_north - chance_east - chance_south < chance_west) { diffx = -1; }
  
  if (diffx === diffy) {  // which at this point can only happen if we aren't moving
    retval["nomove"] = 1;
    return retval;
  }
  
  retval = who.moveMe(diffx,diffy);
  retval["diffx"] = diffx;
  retval["diffy"] = diffy;
  return retval;
}


ais.ProcessPoI = function(who,poiname) {
  var themap = who.getHomeMap();
  if (!who.getPoI().x) {
    if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>" + who.getName() + ", which follows " + poiname + " on map " + themap.getName() + ", has no PoI yet. Searching...</span><br />"); }
    var poi = FindClosestPoI(who.getx(), who.gety(), themap, poiname);
    if (debug) { dbs.writeln("<span style='color:red; font-weight:bold'>Closest PoI: " + poi.x + ", " + poi.y + "</span><br />"); }
    who.setPoI(poi);
    // random scatter the actual destination to near the PoI
    
    var path = [];
    while (path.length === 0) {
      var xval = Math.floor(Math.random()*9)-4 + poi.x;
      var yval = Math.floor(Math.random()*9)-4 + poi.y;
    
      path = themap.getPath(who.getx(), who.gety(), xval, yval, who.getMovetype());
    }
    path.shift();
    var dur = Math.floor(path.length / 3) + Math.floor(Math.random() * 3);
    if (dur > path.length) { dur = path.length; }
    who.setCurrentPath(path);
    who.setDestination({x: xval, y: yval}, dur);
    who.setDestinationType("PoI");
    if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>Set path to: " + xval + ", " + yval + "</span><br />"); }
  } else {
    var coords = who.getCurrentPath()[0];
    if (who.getTurnsToRecalcDest() <= 0) {
      if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>Path expired, find a new PoI!</span><br />"); }
      var connections = who.getPoI().connections;
      var connind = Math.floor(Math.random() * connections.length);
      var poi = who.getPoI().connections[connind];
      who.setPoI(poi);
      if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>New PoI coords: " + poi.x + ", " + poi.y + "</span><br />"); }
      var path = [];
      while (path.length === 0) {
        var xval = Math.floor(Math.random()*9)-4 + poi.x;
        var yval = Math.floor(Math.random()*9)-4 + poi.y;
    
        path = themap.getPath(who.getx(), who.gety(), xval, yval, who.getMovetype());
      }
      path.shift();
      var dur = path.length / 3 + Math.floor(Math.random() * 3);
      who.setCurrentPath(path);
      who.setDestination({x: xval, y: yval}, dur);   
      who.setDestinationType("PoI");
      if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>New path to: " + xval + ", " + yval + "</span><br />"); }
    } else if (GetDistance(who.getx(), who.gety(), coords[0], coords[1]) !== 1) {
      // next step is not adjacent but destination is still valid: find a new path!
      if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>Path not expired, but path invalid. Recalculate.</span><br />"); }
      var coords = who.getDestination();
      var path = themap.getPath(who.getx(), who.gety(), coords.x, coords.y, who.getMovetype());
      who.setCurrentPath(path);
    } 
  }
  var retval = ais.SurfaceFollowPath(who,30,1);
  return retval;
}

function NPCAttackPCMap(npc) {
  var combatmapname = GetCombatMap(npc, PC);
  var newmap = new GameMap();
  newmap.loadMap(combatmapname);
  maps.addMapByRef(newmap);

  PC.getHomeMap().deleteThing(npc);
  var desttile = MoveBetweenMaps(PC,PC.getHomeMap(),newmap, newmap.getEnterX(), newmap.getEnterY());
    
  var monsters = PlaceMonsters(newmap,npc,0);
  DUTime.removeEntityFrom(npc);
    
  DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
  
  var npcname = npc.getDesc();
  npcname = npcname.charAt(0).toUpperCase() + npcname.slice(1);
  maintext.addText(npcname + " attacks!");
  
  return 1;
}

function CheckTownProximity(coords, map) {
  var mapfeatures = map.features.getAll();  // weirdly, this assumes that all maps this will be run on have features. Probably a safe assumption.
//  var town = { x: 0};
  for (var i = 0; i < mapfeatures.length; i++) {
    if ((mapfeatures[i].getName().match(/Town/)) || (mapfeatures[i].getName().match(/Castle/)) || (mapfeatures[i].getName().match(/Keep/)) || (mapfeatures[i].getName().match(/Village/))) {
      if (GetDistance(coords.x, coords.y, mapfeatures[i].getx(), mapfeatures[i].gety()) < 4) {  // your little walk will take you too close to civilization
        if (debug) { dbs.writeln("Destination too close to " + mapfeatures[i].getDesc() + ".<br />"); }
        return 1;
      }
    }
  }
  return 0;
}

function FindClosestPoI(xval, yval, themap, poiname) {
  if (!themap.network[poiname]) { alert("Unknown poi network!"); }
  
  var closeind = 0;
  var closest = GetDistance(xval,yval,themap.network[poiname][0].x, themap.network[poiname][0].y);
  
  for (var i=1; i<themap.network[poiname].length; i++) { 
    var ind = GetDistance(xval,yval,themap.network[poiname][i].x, themap.network[poiname][i].y);
    if (ind < closest) { closeind = i; }
  }
  return themap.network[poiname][closeind];
}
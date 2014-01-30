
// object to make it easier to construct which function to call without
// using eval.

var ais = {};

ais.Bandit = function(who,radius) {
  var retval = ais.OutdoorHostile(who, radius, "road");
  return retval;
}

ais.Monster = function(who,radius) {
  var retval = ais.OutdoorHostile(who,radius, "wild");
  return retval;
}

ais.OutdoorHostile = function(who, radius, pname) {
  if (!radius) { radius = 0; }
  
  var retval = {fin: 1};
  if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>AI " + who.getName() + " " + who.getSerial() + " is going.</span><br />"); }
  // First, see if the PC is adjacent and if so, smite.
  if (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) === 1) {
    NPCAttackPCMap(who);
    if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>AI " + who.getName() + " attacks the PC!</span><br />"); }
    return retval;
  }
  
  // Next, check to see if it's outside its leash radius
  var spawner = who.getSpawnedBy();
//  if ((spawner) && ) {
    
//  }
  
  // Next, check and see if there is already a path that has not expired
  // but only if the PC is not within close range- in that case, always wait to hunt
  if ((who.getHomeMap() !== PC.getHomeMap()) || (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) > radius/3)) {
    retval = ais.SurfaceFollowPath(who,40,1);   
    if (retval["fin"] === 1) { return retval; }
  }
  
  // If there is a radius attached, hunt for the PC next
  if (radius) {
    var hunt = ais.HuntPC(who,radius);

    if (hunt) { 
      retval = ais.SurfaceFollowPath(who,40,1);   
      return retval; // we're done here either way
    }  
  }

  // we have neither attacked, moved, nor hunted- now we look for a PoI to go towards
  retval = ais.ProcessPoI(who, pname);
  return retval;
}


// sub-functions

ais.HuntPC = function(who, radius) {
  var themap =  who.getHomeMap();
	// Is the PC within range to be hunted?
	if ((themap !== PC.getHomeMap()) || (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) > radius)) {
	  if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>PC is not in range to hunt.</span><br />"); }
		return 0;  // no hunting
	}
	
	
	// if the PC is within a smaller radius (currently radius/3), hunt no matter what.
	// otherwise, check if we can see the PC, with a more forgiving threshold than used
	// in the game display
	if (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) > (radius/3)) {   
    
    var losresult = themap.getLOS(who.getx(), who.gety(), PC.getx(), PC.gety(), losgrid);
    if (losresult > 2) { 
      if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>PC is close but not in sight, no hunt.</span><br />"); }
      return 0; 
    }  // can't see the PC and they aren't really close, no hunt
	}
	
	// HUNT!
	// find path to the PC
	if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>Hunting!</span><br />"); }
	var destination = { x: PC.getx(), y: PC.gety() };
	
	destination = CheckTownProximity(destination, who.getHomeMap());  // destination moved away if the target is too near a town.
		
	var path = themap.getPath(who.getx(), who.gety(), destination.x, destination.y, who.getMovetype());
	if (path.length) {
   	path.shift();
    if (debug) { dbs.writeln("<span style='color:purple; font-weight:bold'>From: " + who.getx() + ", " + who.gety() + " to " + destination.x + ", " + destination.y+ "</span><br />"); }
    if (debug) { dbs.writeln("<span style='color:purple; font-weight:bold'>First step is: " + path[0][0] + ", " + path[0][1] + "</span><br />"); }
    if (debug) { dbs.writeln("<span style='color:purple; font-weight:bold'>Next step is: " + path[1][0] + ", " + path[1][1] + "</span><br />"); }
    who.setCurrentPath(path);

    var dur = Math.floor(Math.random()*3)-1; 
    dur = dur + Math.floor(path.length / 3);
    who.setDestination(destination, dur);
    who.setDestinationType("PC");
    
    return 1;
  } else { return 0; }
	
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
      if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>AI " + who.getName() + " moving from " + who.getx() + ", " + who.gety() + " to " + coords[0] + ", " + coords[1] + " :"); }
      var diffx = coords[0] - who.getx();
      var diffy = coords[1] - who.gety();
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
      if (!leashed) {  
        retval = who.moveMe(diffx, diffy, 0);
      }
      if (retval["canmove"] === 1) { // it moved!
        retval["fin"] = 1;
        if (debug) { dbs.writeln("successfully. New location: " + who.getx() + ", " + who.gety() + "</span><br />"); }
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
  return retval;
}


ais.ProcessPoI = function(who,poiname) {
  var themap = who.getHomeMap();
  if (!who.getPoI().x) {
    if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>Has no PoI yet. Searching...</span><br />"); }
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
  var town = { x: 0};
  for (var i = 0; i < mapfeatures.length; i++) {
    if ((mapfeatures[i].getName().match(/Town/)) || (mapfeatures[i].getName().match(/Castle/)) || (mapfeatures[i].getName().match(/Keep/)) || (mapfeatures[i].getName().match(/Village/))) {
      while (GetDistance(coords.x, coords.y, mapfeatures[i].getx(), mapfeatures[i].gety()) < 4) {  // your little walk will take you too close to civilization
        var dir = GetDirection(mapfeatures[i].getx(), mapfeatures[i].gety(), coords.x, coords.y);
        if (dir === 0) { coords.y--; }
        else if (dir === 1) { coords.y--; coords.x++ }
        else if (dir === 2) { coords.x++; }
        else if (dir === 3) { coords.x++; coords.y++ }
        else if (dir === 4) { coords.y++; }
        else if (dir === 5) { coords.x--; coords.y++ }
        else if (dir === 6) { coords.x--; }
        else if (dir === 7) { coords.x--; coords.y-- }
        if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>Moving destination away from " + mapfeatures[i].getDesc() + ".</span><br />"); }
        i = 0;
      }
    }
  }
  return coords;
}

function FindClosestPoI(xval, yval, themap, poiname) {
  var closeind = 0;
  var closest = GetDistance(xval,yval,themap.network[poiname][0].x, themap.network[poiname][0].y);
  
  for (var i=1; i<themap.network[poiname].length; i++) { 
    var ind = GetDistance(xval,yval,themap.network[poiname][i].x, themap.network[poiname][i].y);
    if (ind < closest) { closeind = ind; }
  }
  
  return themap.network[poiname][closeind];
}
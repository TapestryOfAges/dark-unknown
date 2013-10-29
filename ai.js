
// object to make it easier to construct which function to call without
// using eval.

var ais = {};

ais.Bandit = function(who, radius) {
  var retval = {fin: 1};
  if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>AI " + who.getName() + " " + who.getSerial() + " is going.<br />"); }
  // First, see if the PC is adjacent and if so, smite.
  if (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) === 1) {
    NPCAttackPCMap(who);
    return retval;
  }
  
  // Next, check and see if there is already a path that has not expired
  retval = ais.SurfaceFollowPath(who,40,1);   
  if (retval["fin"] === 1) { return retval; }
  
  // If there is a radius attached, hunt for the PC next
  var hunt = ais.HuntPC(who,radius);

  if (hunt) { return retval;  }  // already hunted

  return retval;
}


// sub-functions

ais.HuntPC = function(who, radius) {
	// Is the PC within range to be hunted?
	if (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) > radius) {
		return 0;  // no hunting
	}
	
	// if the PC is within a smaller radius (currently radius/3), hunt no matter what.
	// otherwise, check if we can see the PC, with a more forgiving threshold than used
	// in the game display
	if (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) > (radius/3)) {   
    var themap =  who.getHomeMap();
    
    var losresult = themap.getLOS(who.getx(), who.gety(), PC.getx(), PC.gety(), losgrid);
    if (losresult > 2) { return 0; }  // can't see the PC and they aren't really close, no hunt
	}
	
	// HUNT!
	// find path to the PC
	var destination = { x: PC.getx(), y: PC.gety() };
	who.setDestination(destination, 5);
	
}

ais.SurfaceFollowPath = function(who, random_nomove, random_tries) {
  var retval = { fin: 0 };
  if ((who.getCurrentPath().length > 0) && (who.getTurnsToRecalcDest() > 0)) {
    var coords = who.getNextStep();
    if (GetDistance(who.getx(), who.gety(), coords[0], coords[1]) === 1) {  // the next step is only a step away
      var diffx = coords[0] - who.getx();
      var diffy = coords[1] - who.gety();
      retval = who.moveMe(diffx, diffy, 0);
      if (retval["canmove"] === 1) { // it moved!
        return retval; // we're done here
      }
      // failed to move. On the surface, this means there was another AI there.
      // in scale map, could be a closed door.
      
      // if there is another AI in the way, randomwalk
      if (!random_tries) { random_tries = 1; }
      for (var i = 0; i<random_tries; i++) {
        var split_move = (100-random_nomove)/3;
        if (diffx === 1) { retval = ais.Randomwalk(who,split_move,0,split_move,split_move); }
        else if (diffx === -1) { retval = ais.Randomwalk(who,split_move,split_move,split_move,0); }
        else if (diffy === 1) { retval = ais.Randomwalk(who,0,split_move,split_move,split_move); }
        else if (diffy === -1) { retval =  ais.Randomwalk(who,split_move,split_move,0,split_move); }
        else { alert("How did I get here? ais.FollowPath."); }
        if (!retval["nomove"]) { return retval; }  // moved
      }
      
      //didn't move. Not going to try again. Ending turn.
      retval["fin"] = 1;
      return retval;
      
    } 
    // if next step is more than one step away, a previous move failed, recalculate now
  }
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


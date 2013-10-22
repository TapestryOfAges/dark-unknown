
// object to make it easier to construct which function to call without
// using eval.

var ais = new Object;

ais.Bandit = function(who, radius) {
  var retval = new Object;
  retval["fin"] = 1;
  // First, see if the PC is adjacent and if so, smite.
  if (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) == 1) {
    NPCAttackPCMap(who);
    return retval;
  }
  
  // If there is a radius attached, hunt for the PC next
  var hunt = ais.HuntPC(who,radius);

  if (hunt) { return retval;  }  // already hunted

  return retval;
}

ais.HuntPC = function(who, radius) {
	// Is the PC within range to be hunted?
	if (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) > radius) {
		return 0;  // no hunting
	}
	
	// if the PC is within a smaller radius (currently radius/3), hunt no matter what.
	// otherwise, check if we can see the PC, with a more forgiving threshold than used
	// in the game display
	if (GetDistance(who.getx(), who.gety(), PC.getx(), PC.gety()) > (radius/3)) {   
//		var losresult = who.getHomeMap().getLOS(who.getx(), who.gety(), PC.getx(), PC.gety(), losgrid);
//		if (losresult > 2) { return 0; }  // can't see the PC and they aren't really close, no hunt
	}
	
	// HUNT!
	// find path to the PC
	var destination = { x: PC.getx(), y: PC.gety() };
	who.setDestination(destination, 5);
	
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
  maintext.addText(npc.getDesc() + " attacks!");
  
  return 1;
}
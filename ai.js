
// object to make it easier to construct which function to call without
// using eval.

var ais = new Object;

ais.Bandit = function(who, radius) {
  // If there is a radius attached, hunt for the PC first
  var hunt = ais.HuntPC(who,radius);

  if (hunt) { return 1;  }  // already hunted

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
		var losresult = who.GetHomeMap().getLOS(who.getx(), who.gety(), PC.getx(), PC.gety(), losgrid);
		if (losresult > 2) { return 0; }  // can't see the PC and they aren't really close, no hunt
	}
	
	// HUNT!
	// find path to the PC
	
	
}
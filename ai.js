
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
	
	
	
}
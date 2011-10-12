

function getDisplayCenter(themap,fromx,fromy) {
	var edge = new Object;
	var leftedge = fromx - (viewsizex - 1)/2;
  if (leftedge < 0) { leftedge = 0; }
  var rightedge = leftedge + viewsizex - 1;
  if (rightedge >= themap.getWidth()) {
  	rightedge = themap.getWidth() -1;  // Note, this will explode somewhat if the map is smaller than 13x13
  	leftedge = rightedge - viewsizex + 1;
  	if (leftedge < 0) { leftedge = 0; }
  }
  var topedge = fromy - (viewsizey - 1)/2;
  if (topedge < 0) { topedge = 0; }
  bottomedge = topedge + viewsizey - 1;
  if (bottomedge >= themap.getHeight()) {
  	bottomedge = themap.getHeight() -1;
  	topedge = bottomedge - viewsizey + 1;
  	if (topedge < 0) {topedge = 0;}
  }
	edge.leftedge = leftedge;
	edge.rightedge = rightedge;
	edge.topedge = topedge;
	edge.bottomedge = bottomedge;
	edge.centerx = (leftedge + rightedge)/2;
	edge.centery = (topedge + bottomedge)/2;
	return edge;
}

function MoveBetweenMaps(who,frommap,tomap,destx,desty) {
  // determine time scale for this move
  if ((frommap.getScale()) || tomap.getScale()) { who.smallscalemove = 1; }
  
	// remove PC from current map
	frommap.deleteThing(who);
	// also delete any NPCs following PC (summoned demons) FIXTHIS
	tomap.placeThing(destx,desty,who);
	who.setHomeMap(tomap);
	var tile = tomap.getTile(destx,desty);
	
	// Remove unneeded maps from mapmemory
	var keepmap = frommap.getAlwaysRemember();
	if (!keepmap) {
		// is old map linked to new map?
		var linkedmaps = tomap.getLinkedMaps();
		if (linkedmaps.length > 0) {
			for (var i=0; i<linkedmaps.length; i++) {
				if (linkedmaps[i] == frommap.getName()) {
					keepmap = 1;
				}
			}
		}
	}
	
	if (keepmap == 0) {
		maps.deleteMap(frommap.getName());
	}
	
	var retval = new Object;

	return tile;

}

function FindBelow(upx,upy,map) {
	if (!map.getSeeBelow()) { return 0; }
	var lowermapname = map.getSeeBelow();
	var lowermap = maps.getMap(lowermapname);
	var tile = lowermap.getTile(upx,upy);
	if (tile) { return tile; }
	return 0;
}

function ParseDice(die) {
  var dieobj = new Object;
  var tmpobj = new Array;
  tmpobj = die.split("+");
  if (tmpobj[1]){
    dieobj.plus = parseInt(tmpobj[1]);
    tmpobj = tmpobj[0].split("d");
    if (tmpobj[1]) {
      dieobj.dice = parseInt(tmpobj[1]);
      dieobj.quantity = parseInt(tmpobj[0]);
    } else {
      dieobj.dice = 1;
      dieobj.quantity = 0;
    }
  } else {
    dieobj.plus = parseInt(tmpobj[0]);
    dieobj.dice = 1;
    dieobj.quantity = 0;
  }

  return dieobj;
}

function RollDice(die) {
  var dieobj = ParseDice(die);
  var roll = dieobj.plus;
  if (dieobj.quantity > 0) {
    for (var i = 1; i <= dieobj.quantity; i++) {
      roll += Math.floor(Math.random() * dieobj.dice)+ 1;
    }
  }	

  return roll;
}
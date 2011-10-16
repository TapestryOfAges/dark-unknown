

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

function PlaceMonsters(battlemap,group,whoseturn) {
  var monsters = new Array;
  if (typeof group.populate == "function") {
    monsters = group.populate();
  } else {
    alert("Non-group monster on world map.");
    return 0;
  }

    
  var monstercoords = new Array;
  switch (monsters.length) {
      case 1:
        monstercoords[0] = new Object;
        monstercoords[0].x = 6;
        monstercoords[0].y = 3;
        break;
      case 2:
        var coin = Math.floor(Math.random() * 2) +1;
        if (coin == 1) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 5;
          monstercoords[0].y = 3;
          monstercoords[1] = new Object;
          monstercoords[1].x = 7;
          monstercoords[1].y = 3;
        }
        else if (coin == 2) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 6;
          monstercoords[0].y = 2;
          monstercoords[1] = new Object;
          monstercoords[1].x = 6;
          monstercoords[1].y = 4;          
        }
        break;
      case 3:
        var coin = Math.floor(Math.random() * 2) +1;
        if (coin == 1) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 6;
          monstercoords[0].y = 3;
          monstercoords[1] = new Object;
          monstercoords[1].x = 4;
          monstercoords[1].y = 1;          
          monstercoords[2] = new Object;
          monstercoords[2].x = 8;
          monstercoords[2].y = 1;          
        }
        else if (coin == 2) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 6;
          monstercoords[0].y = 1;
          monstercoords[1] = new Object;
          monstercoords[1].x = 4;
          monstercoords[1].y = 3;          
          monstercoords[2] = new Object;
          monstercoords[2].x = 8;
          monstercoords[2].y = 3;                    
        }
        break;
      case 4:
        var coin = Math.floor(Math.random() * 2) +1;
        if (coin == 1) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 4;
          monstercoords[0].y = 1;
          monstercoords[1] = new Object;
          monstercoords[1].x = 5;
          monstercoords[1].y = 3;          
          monstercoords[2] = new Object;
          monstercoords[2].x = 7;
          monstercoords[2].y = 3;                    
          monstercoords[3] = new Object;
          monstercoords[3].x = 8;
          monstercoords[3].y = 1;                    
        }
        else if (coin == 2) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 6;
          monstercoords[0].y = 1;
          monstercoords[1] = new Object;
          monstercoords[1].x = 6;
          monstercoords[1].y = 3;          
          monstercoords[2] = new Object;
          monstercoords[2].x = 8;
          monstercoords[2].y = 2;                    
          monstercoords[3] = new Object;
          monstercoords[3].x = 4;
          monstercoords[3].y = 2;                              
        }
        break;
      case 5:
        var coin = Math.floor(Math.random() * 4) +1;
        if (coin == 1) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 6;
          monstercoords[0].y = 4;
          monstercoords[1] = new Object;
          monstercoords[1].x = 8;
          monstercoords[1].y = 3;          
          monstercoords[2] = new Object;
          monstercoords[2].x = 7;
          monstercoords[2].y = 1;                    
          monstercoords[3] = new Object;
          monstercoords[3].x = 4;
          monstercoords[3].y = 3;                              
          monstercoords[4] = new Object;
          monstercoords[4].x = 5;
          monstercoords[4].y = 1;                              
        }          
        else if (coin == 2){
          monstercoords[0] = new Object;
          monstercoords[0].x = 6;
          monstercoords[0].y = 2;
          monstercoords[1] = new Object;
          monstercoords[1].x = 8;
          monstercoords[1].y = 3;          
          monstercoords[2] = new Object;
          monstercoords[2].x = 7;
          monstercoords[2].y = 1;                    
          monstercoords[3] = new Object;
          monstercoords[3].x = 4;
          monstercoords[3].y = 3;                              
          monstercoords[4] = new Object;
          monstercoords[4].x = 5;
          monstercoords[4].y = 1;                                        
        }
        else if (coin == 3){
          monstercoords[0] = new Object;
          monstercoords[0].x = 7;
          monstercoords[0].y = 4;
          monstercoords[1] = new Object;
          monstercoords[1].x = 5;
          monstercoords[1].y = 4;          
          monstercoords[2] = new Object;
          monstercoords[2].x = 6;
          monstercoords[2].y = 2;                    
          monstercoords[3] = new Object;
          monstercoords[3].x = 4;
          monstercoords[3].y = 2;                              
          monstercoords[4] = new Object;
          monstercoords[4].x = 8;
          monstercoords[4].y = 2;                                        
        }
        else if (coin == 4){
          monstercoords[0] = new Object;
          monstercoords[0].x = 7;
          monstercoords[0].y = 1;
          monstercoords[1] = new Object;
          monstercoords[1].x = 5;
          monstercoords[1].y = 1;          
          monstercoords[2] = new Object;
          monstercoords[2].x = 6;
          monstercoords[2].y = 3;                    
          monstercoords[3] = new Object;
          monstercoords[3].x = 4;
          monstercoords[3].y = 3;                              
          monstercoords[4] = new Object;
          monstercoords[4].x = 8;
          monstercoords[4].y = 3;                                        
        }
        break;
      case 6:
        var coin = Math.floor(Math.random() * 5) +1;
        if (coin == 1) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 6;
          monstercoords[0].y = 3;
          monstercoords[1] = new Object;
          monstercoords[1].x = 5;
          monstercoords[1].y = 2;
          monstercoords[2] = new Object;
          monstercoords[2].x = 7;
          monstercoords[2].y = 2;
          monstercoords[3] = new Object;
          monstercoords[3].x = 6;
          monstercoords[3].y = 1;
          monstercoords[4] = new Object;
          monstercoords[4].x = 4;
          monstercoords[4].y = 1;
          monstercoords[5] = new Object;
          monstercoords[5].x = 8;
          monstercoords[5].y = 1;
        } else if (coin == 2) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 4;
          monstercoords[0].y = 1;
          monstercoords[1] = new Object;
          monstercoords[1].x = 5;
          monstercoords[1].y = 2;
          monstercoords[2] = new Object;
          monstercoords[2].x = 4;
          monstercoords[2].y = 3;
          monstercoords[3] = new Object;
          monstercoords[3].x = 8;
          monstercoords[3].y = 1;
          monstercoords[4] = new Object;
          monstercoords[4].x = 7;
          monstercoords[4].y = 2;
          monstercoords[5] = new Object;
          monstercoords[5].x = 8;
          monstercoords[5].y = 3;          
        } else if (coin == 3) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 4;
          monstercoords[0].y = 1;
          monstercoords[1] = new Object;
          monstercoords[1].x = 6;
          monstercoords[1].y = 2;
          monstercoords[2] = new Object;
          monstercoords[2].x = 8;
          monstercoords[2].y = 1;
          monstercoords[3] = new Object;
          monstercoords[3].x = 4;
          monstercoords[3].y = 3;
          monstercoords[4] = new Object;
          monstercoords[4].x = 6;
          monstercoords[4].y = 4;
          monstercoords[5] = new Object;
          monstercoords[5].x = 8;
          monstercoords[5].y = 3;          
        } else if (coin == 4) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 4;
          monstercoords[0].y = 1;
          monstercoords[1] = new Object;
          monstercoords[1].x = 6;
          monstercoords[1].y = 1;
          monstercoords[2] = new Object;
          monstercoords[2].x = 8;
          monstercoords[2].y = 1;
          monstercoords[3] = new Object;
          monstercoords[3].x = 4;
          monstercoords[3].y = 3;
          monstercoords[4] = new Object;
          monstercoords[4].x = 6;
          monstercoords[4].y = 3;
          monstercoords[5] = new Object;
          monstercoords[5].x = 8;
          monstercoords[5].y = 3;          
        } else if (coin == 5) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 4;
          monstercoords[0].y = 1;
          monstercoords[1] = new Object;
          monstercoords[1].x = 6;
          monstercoords[1].y = 1;
          monstercoords[2] = new Object;
          monstercoords[2].x = 4;
          monstercoords[2].y = 3;
          monstercoords[3] = new Object;
          monstercoords[3].x = 6;
          monstercoords[3].y = 3;
          monstercoords[4] = new Object;
          monstercoords[4].x = 4;
          monstercoords[4].y = 5;
          monstercoords[5] = new Object;
          monstercoords[5].x = 6;
          monstercoords[5].y = 5;          
        }
        break;
      case 7:
        var coin = Math.floor(Math.random() * 3) +1;
        if (coin == 1) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 6;
          monstercoords[0].y = 4;
          monstercoords[1] = new Object;
          monstercoords[1].x = 5;
          monstercoords[1].y = 3;
          monstercoords[2] = new Object;
          monstercoords[2].x = 7;
          monstercoords[2].y = 3;
          monstercoords[3] = new Object;
          monstercoords[3].x = 6;
          monstercoords[3].y = 2;
          monstercoords[4] = new Object;
          monstercoords[4].x = 4;
          monstercoords[4].y = 2;
          monstercoords[5] = new Object;
          monstercoords[5].x = 8;
          monstercoords[5].y = 2;
          monstercoords[6] = new Object;
          monstercoords[6].x = 5;
          monstercoords[6].y = 1;
        } else if (coin == 2) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 6;
          monstercoords[0].y = 4;
          monstercoords[1] = new Object;
          monstercoords[1].x = 5;
          monstercoords[1].y = 3;
          monstercoords[2] = new Object;
          monstercoords[2].x = 7;
          monstercoords[2].y = 3;
          monstercoords[3] = new Object;
          monstercoords[3].x = 6;
          monstercoords[3].y = 2;
          monstercoords[4] = new Object;
          monstercoords[4].x = 4;
          monstercoords[4].y = 2;
          monstercoords[5] = new Object;
          monstercoords[5].x = 8;
          monstercoords[5].y = 2;
          monstercoords[6] = new Object;
          monstercoords[6].x = 7;
          monstercoords[6].y = 1;
        } else if (coin == 3) {
          monstercoords[0] = new Object;
          monstercoords[0].x = 6;
          monstercoords[0].y = 4;
          monstercoords[1] = new Object;
          monstercoords[1].x = 5;
          monstercoords[1].y = 3;
          monstercoords[2] = new Object;
          monstercoords[2].x = 7;
          monstercoords[2].y = 3;
          monstercoords[3] = new Object;
          monstercoords[3].x = 5;
          monstercoords[3].y = 1;
          monstercoords[4] = new Object;
          monstercoords[4].x = 4;
          monstercoords[4].y = 2;
          monstercoords[5] = new Object;
          monstercoords[5].x = 8;
          monstercoords[5].y = 2;
          monstercoords[6] = new Object;
          monstercoords[6].x = 7;
          monstercoords[6].y = 1;
        }
        break;
      case 8:
        monstercoords[0] = new Object;
        monstercoords[0].x = 6;
        monstercoords[0].y = 4;
        monstercoords[1] = new Object;
        monstercoords[1].x = 5;
        monstercoords[1].y = 3;
        monstercoords[2] = new Object;
        monstercoords[2].x = 7;
        monstercoords[2].y = 3;
        monstercoords[3] = new Object;
        monstercoords[3].x = 6;
        monstercoords[3].y = 2;
        monstercoords[4] = new Object;
        monstercoords[4].x = 4;
        monstercoords[4].y = 2;
        monstercoords[5] = new Object;
        monstercoords[5].x = 8;
        monstercoords[5].y = 2;
        monstercoords[6] = new Object;
        monstercoords[6].x = 5;
        monstercoords[6].y = 1;
        monstercoords[7] = new Object;
        monstercoords[7].x = 7;
        monstercoords[7].y = 1;
        break;
      
  }

  for (i =0; i < monsters.length; i++) {
    monsters[i].setHomeMap(battlemap);
    var timetoplace = 0;
    if (!whoseturn) { // combat began on NPC turn
      timetoplace = .001;
    }
    combatmap.placeThing(monstercoords[i].x,monstercoords[i].y,monsters[i],timetoplace);
    
  }

  return monsters;
}

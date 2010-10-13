
function PerformCommand(code) {
	var retval = new Object;
	retval["fin"] = 0;
	if ((code == 38) || (code == 219)) {   // UP ARROW  or  [
		// move north
		var success = PC.moveMe(0,-1,0);
		var txt = "Move North";
		txt += success["msg"];
		retval["txt"] = txt;
		retval["input"] = "&gt;";
		retval["fin"] = 1;
		if (success["msg"].match("Blocked")) { retval["fin"] = 2; }
		retval["initdelay"] = success["initdelay"];
	}
	else if ((code == 37) || (code == 59)) {  // LEFT ARROW or ;
		// move west
		var success = PC.moveMe(-1,0,0);
		var txt = "Move West";
		txt += success["msg"];
		retval["txt"] = txt;
		retval["input"] = "&gt;";
		retval["fin"] = 1;
		if (success["msg"].match("Blocked")) { retval["fin"] = 2; }
		retval["initdelay"] = success["initdelay"];
	}
	else if ((code == 39) || (code == 222)) { // RIGHT ARROW or '
		// move east
		var success = PC.moveMe(1,0,0);
		var txt = "Move East";
		txt += success["msg"];
		retval["txt"] = txt;
		retval["input"] = "&gt;";
		retval["fin"] = 1;
		if (success["msg"].match("Blocked")) { retval["fin"] = 2; }
		retval["initdelay"] = success["initdelay"];
	}
	else if ((code == 40) || (code == 191)) { // DOWN ARROW or /
		// move south
		var success = PC.moveMe(0,1,0);
		var txt = "Move South";
		txt += success["msg"];
		retval["txt"] = txt;
		retval["input"] = "&gt;";
		retval["fin"] = 1;
		if (success["msg"].match("Blocked")) { retval["fin"] = 2; }
		retval["initdelay"] = success["initdelay"];
	}
	else if (code == 65) { // a
		// attack
		
	}
	else if (code == 66) { // b
		// board - not used in Dark Unknown but available for hooking
		
	}
	else if (code == 67) { // c
		// cast
		
	}
	else if (code == 68) { // d
		// descend - not used in DU, merged with "enter"
		
	}
	else if (code == 69) { // e
		// enter
		
	}
	else if (code == 70) { // f
		// fire - not used in DU, no boats
	}
	else if (code == 71) { // g
		// get 
		
	}
	else if (code == 72) { // h
		// hole up and camp
		
	}
	else if (code == 73) { // i
		// ignite torch
		
	}
	else if (code == 74) { // j
		// jimmy lock ?
		
	}
	else if (code == 75) { // k
		// klimb - not used, merged with "enter"
		
	}
	else if (code == 76) { // l
		// U4's Locate, here, Look
		gamestate.setMode("target");
		var newx = PC.getx();
		var newy = PC.gety();
		var targetx = 192;
		var targety = 192;
		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		targetCursor.x = newx;
		targetCursor.y = newy;
		targetCursor.command = "l";
		targetx += (PC.x - edges.centerx) * 32;
		targety += (PC.y - edges.centery) * 32;
//		targetCursor.x += (PC.x - edges.centerx);
//		targetCursor.y += (PC.y - edges.centery);
		var tileid = "#td-tile" + newx + "x" + newy;
		targetCursor.tileid = tileid;
		targetCursor.basetile = $(tileid).html();
		$(tileid).html($(tileid).html() + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:' + targetx + 'px;top:' + targety + 'px;z-index:3" />');
//		alert(PC.x + "," + PC.y + " ; " + targetCursor.x + "," + targetCursor.y);
		retval["txt"] = "";
		retval["input"] = "&gt; Look: ";
		retval["fin"] = 2;
	}
	else if (code == 77) { // m
		// mix - not used
		// might repurpose as "music" to give it a separate toggle to sound effects
		
	}
	else if (code == 78) { // n
		// new order - not used
		
	}
	else if (code == 79) { // o
		// open - merged with use
		
	}
	else if (code == 80) { // p
		// peer into gem - not used
		
	}
	else if (code == 81) { // q
		// quit and save
		
	}
	else if (code == 82) { // r
		// ready equipment
		
	}
	else if (code == 83) { // s
		// search
		
	}
	else if (code == 84) { // t
		// talk
		
	}
	else if (code == 85) { // u
		// use
		
	}
	else if (code == 86) { // v
		// volume - turns sound effects on and off
		
	}
	else if (code == 87) { // w
		// 
		
	}
	else if (code == 88) { // x
		// eXit - not used
		
	}
	else if (code == 89) { // y
		// yell - probably not used
		
	}
	else if (code == 90) { // z
		// zstats
		
	}
	else if ((code == 32) || (code == 13)) { // SPACE or ENTER
		// pass
		retval["txt"] = "Pass.";
		retval["input"] = "&gt;";
		retval["fin"] = 1;
	}
	else {
		//alert(code);
	}
	
	return retval;
}


function PerformTarget(code)  {
	var retval = new Object;
	retval["fin"] = -1;
	if ((code == 38) || (code == 219)) {   // UP ARROW  or  [
		gamestate.setMode("null");
		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		if ((edges.centery - targetCursor.y) < 6) {
			targetCursor.y -= 1;
			retval["fin"] = 1;		
		}
	}
	else if ((code == 37) || (code == 59)) {  // LEFT ARROW or ;
		gamestate.setMode("null");
		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		if ((edges.centerx - targetCursor.x) < 6) {
			targetCursor.x -= 1;
			retval["fin"] = 1;
		}
	}
	else if ((code == 39) || (code == 222)) { // RIGHT ARROW or '
		gamestate.setMode("null");
		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		if ((targetCursor.x - edges.centerx) < 6) {
			targetCursor.x += 1;
			retval["fin"] = 1;
		}
	}
	else if ((code == 40) || (code == 191)) { // DOWN ARROW or /
		gamestate.setMode("null");
		var edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
		if ((targetCursor.y - edges.centery) < 6) {
			targetCursor.y += 1;
			retval["fin"] = 1;
		}
	}
	else if ((code == 32) || (code == 13)) { // SPACE or ENTER
		gamestate.setMode("null");
		retval["fin"] = 2;
	}
	else if (code == 27) { // ESC
		gamestate.setMode("null");
		retval["fin"] = 0;
		retval["txt"] = "";
		retval["input"] = "&gt;";
	}
	
	return retval;
}

function PerformLook() {
	var txt = "";
  var seethis = "";
  var map = PC.getHomeMap();
  var onscreen = $('#td-tile' + targetCursor.x + 'x' + targetCursor.y).html();
//  alert(onscreen);
  var losval = 0;
  if (onscreen.indexOf("You cannot see that") != -1) { losval = 1; }
//  var losval = map.getLOS(PC.getx(), PC.gety(), targetCursor.x, targetCursor.y, losgrid);
  if (losval >= LOS_THRESHOLD) { 
  	var retval = new Object;
  	retval["txt"] = "You cannot see that.";
  	retval["fin"] = 2;
  	retval["input"] = "&gt;";
 	  var tileid = targetCursor.tileid;
	  $(tileid).html(targetCursor.basetile); 

  	return retval;
  }
  var tile = map.getTile(targetCursor.x,targetCursor.y);
  if ((targetCursor.x == PC.getx())	&& (targetCursor.y == PC.gety())) {
  	txt = "You are standing on ";
  } else {
  	txt = "You see ";
  }
  var npcs = tile.getNPCs();
  if (npcs.length > 0) {
  	for (var i=(npcs.length-1) ; i >= 0; i-- ) {
  		if (seethis == "") { seethis = npcs[i].getDesc(); }
  		else { seethis += ", " + npcs[i].getDesc(); }
  	}
  }
  var features = tile.getFeatures();
  if (features.length > 0) {
  	for (var i=(features.length-1); i >= 0; i-- ) {
  		if (( seethis == "" ) && (i == features.length-1)) {
  			seethis = features[i].getDesc();
  		}
  		else if ( features[i].isItem() ) {
  			if (seethis == "") { seethis = features[i].getDesc(); }
  			else { seethis += ", " + features[i].getDesc(); }
  		}
  	}
  }
  if (seethis == "") {
  	var terrain = tile.getTerrain();
  	seethis = terrain.desc;
  }
  if (seethis == "") { alert("How are we here? command."); }
  
  txt += seethis + ".";
  var tileid = targetCursor.tileid;
  $(tileid).html(targetCursor.basetile); 
  
  var retval = new Object;
  retval["txt"] = txt;
  retval["fin"] = 2;
  retval["input"] = "&gt;";
  
  return retval;
}

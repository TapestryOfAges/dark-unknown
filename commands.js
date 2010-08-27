
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
		var newx = PC.getx();
		var newy = PC.gety();
//		var tileid = "#td-tile" + newx + "x" + newy;
		$(tileid).html($(tileid).html() + '<img src="graphics/target-cursor.gif" style="position:absolute;left:192px;top:192px;z-index:3" />');
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


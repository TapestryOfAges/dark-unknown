"use strict";

function LOSMatrix(screensize) {

  var dirs = [];
  dirs[0] = {};
  dirs[0].dir = "center";
  dirs[0].x = 0;
  dirs[0].y = 0;
  dirs[1] = {};
  dirs[1].dir = "ne";
  dirs[1].x = .49;
  dirs[1].y = -.49;
  dirs[2] = {};
  dirs[2].dir = "nw";
  dirs[2].x = -.49;
  dirs[2].y = -.49;
  dirs[3] = {};
  dirs[3].dir = "se";
  dirs[3].x = .49;
  dirs[3].y = .49;
  dirs[4] = {};
  dirs[4].dir = "sw";
  dirs[4].x = -.49;
  dirs[4].y = .49;

  for (var i = 0; i <= 4; i++) {
  	this[dirs[i].dir] = {};
  	for (var j = 0; j <= 4; j++) {
  		this[dirs[i].dir][dirs[j].dir] = {};
  		this[dirs[i].dir][dirs[j].dir].matrix = [];

		  for (var k = 1-screensize; k<screensize; k++) {
		  	this[dirs[i].dir][dirs[j].dir]["matrix"][k] = [];
  			for (var l = 1-screensize; l<screensize; l++) {
		      this[dirs[i].dir][dirs[j].dir]["matrix"][k][l] = GetLineArray(0,0,l,k,dirs[i].x,dirs[i].y,dirs[j].x,dirs[j].y);
  			}
 		 	}
 		}
 	}
	
}

LOSMatrix.prototype.getLOS = function(x1,y1,x2,y2,whichstartlos,whichendlos) {
	if (!whichstartlos) { whichstartlos = "center"; }
	if (!whichendlos) { whichendlos = "center"; }
  var xdiff = x2-x1;
  var ydiff = y2-y1;
  return this[whichstartlos][whichendlos]["matrix"][ydiff][xdiff];
}


function GetLineArray(x1,y1,x2,y2,cornerx1,cornery1,cornerx2,cornery2) {

  if (!cornerx1) { cornerx1 = 0;}
	if (!cornery1) { cornery1 = 0;}
  if (!cornerx2) { cornerx2 = 0;}
	if (!cornery2) { cornery2 = 0;}

//  if (debug) { dbs.writeln("GetLineArray, sent " + x1 + "," + y1 + "," + x2 + "," + y2 + "," + cornerx1 + "," + cornery1 + "," + cornerx2 + "," + cornery2 + "<br>"); }

  if ((Math.abs(x1 - x2) < 1) && (Math.abs(y1 - y2) < 1)) { return(0); }

  var lineArray = [];

  x1 = x1+.5;
  y1 = y1+.5;
  x2 = x2+.5;
  y2 = y2+.5;
  var xints = [];
  var yints = [];

  if (x1 != x2) {
    var a = ((y1+cornery1)-(y2+cornery2))/((x1+cornerx1)-(x2+cornerx2));
    var b = (y1+cornery1) - a*(x1+cornerx1);

//    if (debug) { dbs.writeln("Line is: y = " + a + "x + " + b + "<br>"); }

    if (x2 < x1) { var x0 = x2; x2 = x1; x1 = x0; }
    if (y2 < y1) { var y0 = y2; y2 = y1; y1 = y0; }

    for (var xi = x1+.5 ; xi < x2 ; xi++) {
      xints.push(xi);
//      if (debug) { dbs.writeln("xint: " + xi + "  "); }
    }
    if (a != 0) {  // not a horizontal line
      for (var yi = y1+.5; yi < y2 ; yi++) {
        var x = (yi-b)/a;
        xints.push(x);
//        if (debug) { dbs.writeln("xint: " + x + "  "); }
      }
    }
    xints.sort(function(aa,bb){return aa - bb});
//    if (debug) { dbs.writeln("<br>");}
    
  }
  else {   // vertical line
//  	if (debug) { dbs.writeln("vert: "); }
  	if (y2 < y1) { var y0 = y2; y2 = y1; y1 = y0; }
    for (var yi = y1+.5 ; yi < y2 ; yi++) {
    	yints.push(yi);
//    	if (debug) { dbs.writeln("yint: " + yi + "  "); }
    }
//    if (debug) {dbs.writeln("<br>"); }
  }

  if (typeof xints[0] != "undefined")  {
  	var enterx = "x";
  	var entery;
  	var exitx;
  	var exity;
  	for (var k = 0; k < xints.length; k++){
//  		alert("k = " + k);
  		if (enterx !== "x") {
  			exitx = xints[k];
  			exity = a * xints[k] + b;
  			
  			var avex = (enterx + exitx)/2;
  			var avey = (entery + exity)/2;
//  			if (debug) { dbs.writeln("Range: (" + enterx + "," + entery + ") to (" + exitx + "," + exity + ")<br>"); }
//  			if (debug) { dbs.writeln("Ave: (" + avex + "," + avey + ")<br>"); }
  			avex = Math.floor(avex);
  			avey = Math.floor(avey);
//  			if (debug) { dbs.writeln("Floor: (" + avex + "," + avey + ")<br>"); }
  			var segment = Math.sqrt(Math.pow((exitx - enterx),2) + Math.pow((exity - entery),2));
//  			if (segment > .05) {
    			segment = 100*segment;
    			segment = Math.round(segment);
  	  		segment = segment/100;
  		  	var lineLengths = new Object;
  		  	lineLengths.coeff = segment;
  		  	lineLengths.x = avex;
  		  	lineLengths.y = avey;
  		  	lineArray.push(lineLengths);
//  		  	if (debug) { dbs.writeln("Segment: (" + segment + ")<br><br>"); }
//  		  }
//  		  else {
//  		  	if (debug) { dbs.writeln("Skipped.<br><br>"); }
//  		  }
  			
  			enterx = exitx;
  			entery = exity;
  		} else {
  			enterx = xints[k];
  			entery = a * xints[k]+ b;
  		}
  	}
  } else if (typeof yints[0] != "undefined") {
  	var enterx;
  	var entery;
  	var exitx;
  	var exity;
  	for (var k = 0; k < yints.length; k++){
  		if (enterx || entery) {
  			exitx = x1;
  			exity = yints[k];
  			
  			var avex = (enterx + exitx)/2;
  			var avey = (entery + exity)/2;
//  			if (debug) { dbs.writeln("Range: (" + enterx + "," + entery + ") to (" + exitx + "," + exity + ")<br>"); }
//  			if (debug) { dbs.writeln("Ave: (" + avex + "," + avey + ")<br>"); }
  			avex = Math.floor(avex);
  			avey = Math.floor(avey);
//  			if (debug) { dbs.writeln("Floor: (" + avex + "," + avey + ")<br>"); }
  			var segment = Math.sqrt(Math.pow((exitx - enterx),2) + Math.pow((exity - entery),2));
//  			if (segment > .05) {
    			segment = 100*segment;
    			segment = Math.round(segment);
  	  		segment = segment/100;
  		  	var lineLengths = {};
  		  	lineLengths.coeff = segment;
  		  	lineLengths.x = avex;
  		  	lineLengths.y = avey;
  		  	lineArray.push(lineLengths);
//  		  	if (debug) { dbs.writeln("Segment: (" + segment + ")<br><br>"); }
//  		  }
//        else {
//  		  	if (debug) { dbs.writeln("Skipped.<br><br>"); }
//  		  }
  			
  			enterx = exitx;
  			entery = exity;
  		} else {
  			enterx = x1;
  			entery = yints[k];
  		}
  	}  	
  } else {
//    if (debug) { dbs.writeln("ERROR!<br><br>"); }
    DebugWrite("all", "ERROR! (los.js)<br /><br />");
  }
  return lineArray;
}

function GetVisibility(currentmap, x, y) {
	if (currentmap.getLightLevel() === "bright") { return 1; }
}

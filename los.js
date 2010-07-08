
function LOSMatrix(screensize) {

  this.center = new Object;
  this.center.matrix = new Array;
  this.ne = new Object;
  this.ne.matrix = new Array;
  this.nw = new Object;
  this.nw.matrix = new Array;
  this.se = new Object;
  this.se.matrix = new Array;
  this.sw = new Object;
  this.sw.matrix = new Array;


//      var lineseg = GetLineArray(0,0,2,-2);
//      alert(i + "," + j + " : " + lineseg);

  for (var i = 1-screensize; i<screensize; i++) {
  	this.center.matrix[i] = new Array;
  	this.ne.matrix[i] = new Array;
  	this.nw.matrix[i] = new Array;
  	this.se.matrix[i] = new Array;
  	this.sw.matrix[i] = new Array;
  	for (var j = 1-screensize; j<screensize; j++) {
      this.center.matrix[i][j] = GetLineArray(0,0,j,i,0,0);
      this.ne.matrix[i][j] = GetLineArray(0,0,j,i,.5,-.5);
      this.nw.matrix[i][j] = GetLineArray(0,0,j,i,-.5,-.5);
      this.se.matrix[i][j] = GetLineArray(0,0,j,i,.5,.5);
      this.sw.matrix[i][j] = GetLineArray(0,0,j,i,-.5,.5);
  	}
  }
	
}

LOSMatrix.prototype.getLOS = function(x1,y1,x2,y2,whichlos) {
	if (!whichlos) { whichlos = "center"; }
  var xdiff = x2-x1;
  var ydiff = y2-y1;
  return this[whichlos].matrix[ydiff][xdiff];
}

function GetLineOfSight(x1,y1,x2,y2,map) {

  return 0;
  // temp until I finish function!! FIXME!!
}

function GetLineArray(x1,y1,x2,y2,cornerx,cornery) {

  if (!cornerx) { cornerx = 0;}
	if (!cornery) { cornery = 0;}

  if (debug) { dbs.writeln("GetLineArray, sent " + x1 + "," + y1 + "," + x2 + "," + y2 + "," + cornerx + "," + cornery + "<br>"); }

  if ((Math.abs(x1 - x2) <= 1) && (Math.abs(y1 - y2) <= 1)) { return(0); }

  var lineArray = new Array;

  x1 = x1+.5;
  y1 = y1+.5;
  x2 = x2+.5;
  y2 = y2+.5;
  var xints = new Array;
  var yints = new Array;

  if (x1 != x2) {
    var a = ((y1+cornery)-y2)/((x1+cornerx)-x2);
    var b = (y1+cornery) - a*(x1+cornerx);

//    if (debug) { dbs.writeln("Line is: y = " + a + "x + " + b + "<br>"); }

    if (x2 < x1) { var x0 = x2; x2 = x1; x1 = x0; }
    if (y2 < y1) { var y0 = y2; y2 = y1; y1 = y0; }

    for (var xi = x1+.5 ; xi < x2 ; xi++) {
      xints.push(xi);
      if (debug) { dbs.writeln("xint: " + xi + "  "); }
    }
    if (a != 0) {  // not a horizontal line
      for (var yi = y1+.5; yi < y2 ; yi++) {
        var x = (yi-b)/a;
        xints.push(x);
        if (debug) { dbs.writeln("xint: " + x + "  "); }
      }
    }
    xints.sort(function(aa,bb){return aa - bb});
    if (debug) { dbs.writeln("<br>");}
    
  }
  else {   // vertical line
  	if (debug) { dbs.writeln("vert: "); }
  	if (y2 < y1) { var y0 = y2; y2 = y1; y1 = y0; }
    for (var yi = y1+.5 ; yi < y2 ; yi++) {
    	yints.push(yi);
    	if (debug) { dbs.writeln("yint: " + yi + "  "); }
    }
    if (debug) {dbs.writeln("<br>"); }
  }

  if (typeof xints[0] != "undefined")  {
  	var enterx = "x";
  	var entery;
  	var exitx;
  	var exity;
  	for (var k = 0; k < xints.length; k++){
//  		alert("k = " + k);
  		if (enterx != "x") {
  			exitx = xints[k];
  			exity = a * xints[k] + b;
  			
  			var avex = (enterx + exitx)/2;
  			var avey = (entery + exity)/2;
  			if (debug) { dbs.writeln("Range: (" + enterx + "," + entery + ") to (" + exitx + "," + exity + ")<br>"); }
  			if (debug) { dbs.writeln("Ave: (" + avex + "," + avey + ")<br>"); }
  			avex = Math.floor(avex);
  			avey = Math.floor(avey);
  			if (debug) { dbs.writeln("Floor: (" + avex + "," + avey + ")<br>"); }
  			var segment = Math.sqrt(Math.pow((exitx - enterx),2) + Math.pow((exity - entery),2));
  			if (segment > .05) {
    			segment = 100*segment;
    			segment = Math.round(segment);
  	  		segment = segment/100;
  		  	var lineLengths = new Object;
  		  	lineLengths.coeff = segment;
  		  	lineLengths.x = avex;
  		  	lineLengths.y = avey;
  		  	lineArray.push(lineLengths);
  		  	if (debug) { dbs.writeln("Segment: (" + segment + ")<br><br>"); }
  		  }
  		  else {
  		  	if (debug) { dbs.writeln("Skipped.<br><br>"); }
  		  }
  			
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
  			if (debug) { dbs.writeln("Range: (" + enterx + "," + entery + ") to (" + exitx + "," + exity + ")<br>"); }
  			if (debug) { dbs.writeln("Ave: (" + avex + "," + avey + ")<br>"); }
  			avex = Math.floor(avex);
  			avey = Math.floor(avey);
  			if (debug) { dbs.writeln("Floor: (" + avex + "," + avey + ")<br>"); }
  			var segment = Math.sqrt(Math.pow((exitx - enterx),2) + Math.pow((exity - entery),2));
  			if (segment > .05) {
    			segment = 100*segment;
    			segment = Math.round(segment);
  	  		segment = segment/100;
  		  	var lineLengths = new Object;
  		  	lineLengths.coeff = segment;
  		  	lineLengths.x = avex;
  		  	lineLengths.y = avey;
  		  	lineArray.push(lineLengths);
  		  	if (debug) { dbs.writeln("Segment: (" + segment + ")<br><br>"); }
  		  }
        else {
  		  	if (debug) { dbs.writeln("Skipped.<br><br>"); }
  		  }
  			
  			enterx = exitx;
  			entery = exity;
  		} else {
  			enterx = x1;
  			entery = yints[k];
  		}
  	}  	
  } else {
    if (debug) { dbs.writeln("ERROR!<br><br>"); }
  }
  return lineArray;
}

function GetVisibility(currentmap, x, y) {
	if (currentmap.getLightLevel() == "bright") { return 1; }
}

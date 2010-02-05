
function LOSMatrix(screensize) {

  this.matrix = new Array;
//      var lineseg = GetLineArray(0,0,2,-2);
//      alert(i + "," + j + " : " + lineseg);

  for (var i = 1-screensize; i<screensize; i++) {
  	this.matrix[i] = new Array;
  	for (var j = 1-screensize; j<screensize; j++) {
//  		alert(j + "," + i);
      var lineseg = GetLineArray(0,0,j,i);
//      alert(j + "," + i + " : " + lineseg);
      this.matrix[i][j] = lineseg;
  	}
  }
	
}


function GetLineOfSight(x1,y1,x2,y2,map) {

  return 0;
  // temp until I finish function!! FIXME!!
}

function GetLineArray(x1,y1,x2,y2) {

  if ((Math.abs(x1 - x2) <= 1) && (Math.abs(y1 - y2) <= 1)) { return(0); }

  x1 = x1+.5;
  y1 = y1+.5;
  x2 = x2+.5;
  y2 = y2+.5;
  var xints = new Array;
  var yints = new Array;

  if (x1 != x2) {
    var a = (y1-y2)/(x1-x2);
    var b = y1 - a*x1;

    if (x2 < x1) { var x0 = x2; x2 = x1; x1 = x0; }
    if (y2 < y1) { var y0 = y2; y2 = y1; y1 = y0; }

    for (var xi = x1+.5 ; xi < x2 ; xi++) {
      xints.push(xi);
//      alert("xint: " + xi);
    }
    if (a != 0) {  // not a horizontal line
      for (var yi = y1+.5; yi < y2 ; yi++) {
        var x = (yi-b)/a;
        xints.push(x);
//        alert("xint: " + x);
      }
    }
    xints.sort(function(aa,bb){return aa - bb});

    
  }
  else {   // vertical line
//  	alert("vert");
  	if (y2 < y1) { var y0 = y2; y2 = y1; y1 = y0; }
    for (var yi = y1+.5 ; yi < y2 ; yi++) {
    	yints.push(yi);
//    	alert(yi);
    }
  }

  var lineLengths = "";
  if (xints[0])  {
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
//  			alert("Range: (" + enterx + "," + entery + ") to (" + exitx + "," + exity + ")");
//  			alert("Ave: (" + avex + "," + avey + ")");
  			avex = Math.floor(avex);
  			avey = Math.floor(avey);
//  			alert("Ave: (" + avex + "," + avey + ")");
  			var segment = Math.sqrt(Math.pow((exitx - enterx),2) + Math.pow((exity - entery),2));
  			if (segment > .05) {
    			segment = 100*segment;
    			segment = Math.round(segment);
  	  		segment = segment/100;
  		  	lineLengths =  lineLengths + segment + "(" + avex + "," + avey + ") ";
  		  }
  			
  			enterx = exitx;
  			entery = exity;
  		} else {
  			enterx = xints[k];
  			entery = a * xints[k]+ b;
  		}
  	}
  } else if (yints[0]) {
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
  			avex = Math.floor(avex);
  			avey = Math.floor(avey);
  			var segment = Math.sqrt(Math.pow((exitx - enterx),2) + Math.pow((exity - entery),2));
  			if (segment > .05) {
    			segment = 100*segment;
    			segment = Math.round(segment);
  	  		segment = segment/100;
  		  	lineLengths = lineLengths + segment + "(" + avex + "," + avey + ") ";
  		  }
  			
  			enterx = exitx;
  			entery = exity;
  		} else {
  			enterx = x1;
  			entery = yints[k];
  		}
  	}  	
  } else {
  	alert("Bwa?");
  }
  return lineLengths;
}

function GetVisibility(currentmap, x, y) {
	if (currentmap.getLightLevel() == "bright") { return 1; }
}

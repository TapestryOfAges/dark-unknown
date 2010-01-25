
function LOSMatrix(screensize) {

  this.matrix = new Array;
  
  for (i = 1-screensize; i<screensize ; i++) {
  	for (j = 1-screensize; j<screensize; j++) {
  		
  	}
  }
	
}


function GetLineOfSight(x1,y1,x2,y2,map) {

  return 0;
  // temp until I finish function!! FIXME!!

  if ((x1 == x2) && (y1 == y2)) { return(0); }

  var length;
  var visibility;
  if (x1 != x2) {
    var a = (y1-y2)/(x1-x2);
    var b = y1 - a*x1;

    var xints = new Array;
    var yints = new Array;
  
    for (var xi = x1+.5 ; xi < x2 ; xi++) {
      xints.push(xi);
    }
    if (a != 0) {  // not a horizontal line
      for (var yi = y1+.5; yi < y2 ; yi++) {
        var x = (yi-b)/a;
        xints.push(x);
      }
    }
    xints.sort(function(a,b){return a - b});

    
  }
  else {   // vertical line

  }
}

function GetVisibility(currentmap, x, y) {
	if (currentmap.getLightLevel() == "bright") { return 1; }
}



function getLineofSight(x1,y1,x2,y2,map) {

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



var brushdown = 0;
var brushcoords = {};

function CreateUI() {
  var uidiv = "<table cellpadding='0' cellspacing='0' border='0'>";
  for (var i = 0; i < 15; i++) {
    uidiv += "<tr>";
    for (var j = 0; j < 15; j++) {
      uidiv += "<td id='ui" + i + "x" + j + "' style='' width='32' height='32'><img src='graphics/spacer.gif' width='32' height='32' onMouseUp='UIClick(\"up\", " + i + ", " + j + ")' onMouseDown='UIClick(\"down\", " + i + ", " + j + ")' /></td>";
    }
    uidiv += "</tr>";
  }
  uidiv += "</table>";
  
  $("#uiinterface").html(uidiv);
}

function UIClick(direction, icoord, jcoord) {
  if (direction === "down") {
    if (DU.gameflags.tablet) {
      // Send a move when I figure out where it is!
    } else {
      brushdown = 1;
      brushcoords.i = icoord;
      brushcoords.j = jcoord;
    }
  } else {  // direction is up
    if (brushdown) {
      brushdown = 0;
      if ((jcoord - brushcoords.j) > 2) {
        //swiped far enough
        DU.gameflags.tablet = 1;
        // call function to enable tablet UI
      }
    }
  }
}
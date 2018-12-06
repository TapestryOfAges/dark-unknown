"use strict";

function CreateUI() {
  let uidiv = "<table cellpadding='0' cellspacing='0' border='0'>";
  for (let i=0; i<15; i++) {
    uidiv += "<tr>";
    for (let j = 0; j < 15; j++) {
      uidiv += "<td id='ui" + i + "x" + j + "' style='' width='32' height='32'><img src='graphics/spacer.gif' width='32' height='32' onMouseDown='UIClick(\"down\", " + i + ", " + j + ")' ondblclick='UIClick(\"dbl\", " + i + ", " + j + ")' /></td>";
    }
    uidiv += "</tr>";
  }
  uidiv += "</table>";
  
  document.getElementById('uiinterface').innerHTML = uidiv;
}

function UIClick(direction, icoord, jcoord) {
  if (DU.gameflags.getFlag("tablet")) {
    // Send a move when I figure out where it is!
  } else {
    if (direction === "dbl") {
      TabletUI(1);
    }
  }
}

function TabletUI(on) {
  if (on === 1) {
    // do an animation of it sliding out from under the map
    document.getElementById('tabletui').style.visibility = "";
  }
}
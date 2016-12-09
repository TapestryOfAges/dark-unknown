
"use strict";

function DrawMainScreenCanvas(how, mapref, centerx, centery) {
  var displayspecs = getDisplayCenter(themap,centerx,centery);
  
  if (how === "draw") {
    if (themap.worldlayer) {
      var worldlayerimage = new Image();
      worldlayerimage.src = themap.worldlayer;
      
    }
  } else if (how === "one") {
    
  } else {
    alert("Error in DrawMainScreenCanvas.");
  }
  
}
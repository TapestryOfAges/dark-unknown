
var cornerx = -1;
var cornery = -1;
var localFactory = new tileFactory();
var selectionval = localFactory.createTile("Ocean");
var eidos = new Platonic();
var mappages = new Pages();
var amap = new GameMap();
var debug = 0;
var debugscreen;
var togglehide = 0;
var displayval = "all";
var brushdown = 0;
var editable;
var editnpcs;
var browserheight = getSize();
var losgrid = new LOSMatrix(13);
var DUTime = new Timeline(0);
var mode = "editor";

if (debug) {
  debugscreen = window.open('','debugscreen');
}

function toggleinterface() {
  if (togglehide == 0) {
    $("span.buttons").hide();
    togglehide = 1;
    document.images["togglebutton"].src="editor/button-r.gif";
  }
  else {
    $("span.buttons").show();
    togglehide = 0;
    document.images["togglebutton"].src="editor/button-l.gif";
  }
}

function setdebug() {
  if (debug == 0) { debug = 1; }
  else { debug = 1; }
  if (debug) {
    debugscreen = window.open('','debugscreen');
  }
}

function editorLoadMap(mapname) {
	if (mapname != "test") { 
		mapname = document.menuinterface.mapnameslist.value;
	}
	amap.loadMap(mapname);
	drawMap();
}

// Thanks to http://www.howtocreate.co.uk/tutorials/javascript/browserwindow for this function
function getSize() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return (myHeight);
}

function drawMap() {
  var mapdiv = "";
 if (amap.data.length) {
   mapdiv += "<table cellpadding='0' cellspacing='0' border='0'><tr>";
   for (var i=0;i<=amap.data.length-1;i++) {
     for (var j=0;j<=amap.data[0].length-1;j++) {
       var localacre = amap.getTile(j,i);
       var graphics = localacre.getTerrain().getGraphicArray();
       var showGraphic = graphics[0];
       if (typeof localacre.getTerrain().setBySurround == "function") {
       	graphics = localacre.getTerrain().setBySurround(j,i,amap,graphics,0,0,0);
       	showGraphic = graphics[0];
      }
       if (typeof localacre.getTerrain().doTile == "function") {
  	     showGraphic = localacre.getTerrain().doTile(j,i,showGraphic);
       }
       mapdiv += '<td id="td_tile'+j+'x'+i+'" class="maptd" style="background-repeat:no-repeat;width:32;height:32;background-image:url(\'graphics/' + showGraphic + '\'); background-position: ' + graphics[2] + 'px ' + graphics[3] + 'px;" onMouseDown="brushdown=1;clickmap('+j+','+i+');return(false);" onMouseOver="enterTile('+j+','+i+');"><img id="tile'+j+'x'+i+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+j+'x'+i+'" width="32" height="32" /></td>';
     }
     mapdiv += '</tr><tr>';
   }
   mapdiv  += '</table>';
 }
 $("div.mapscreen").html(mapdiv);
 //$("td.maptd").bind("mouseenter", function() {
 	
 //});
 //$("td.maptd").bind("mouseleave", function() {
 	
 //});
 $("div.mapscreen").css("height", browserheight-130);
 $("div.tiles").css("height", browserheight-100);
 if (displayval == "features") {
   drawFeatures(1);
 }
 else if (displayval == "all") {
 	 drawFeatures(2);
 }
 $().ready(function() { $('#featurebubble').jqm({modal : true}) });
}

function enterTile(x,y) {
	if ((document.brushes.elements[0].checked) && (brushdown == 1)) {
		clickmap(x,y);
	}
}

function drawFeatures(draw) {
	if (draw > 0) {
  	var allfeatures = amap.features.getAll();
    for (var i=0;i<=allfeatures.length-1;i++) {
      var tileid = "tile" + allfeatures[i].getx() + "x" + allfeatures[i].gety();
      var tdid = "#td_" + tileid;
      var graphics = allfeatures[i].getGraphicArray();
      var showGraphic = graphics[0];
      if (typeof allfeatures[i].setBySurround == "function") {
       	graphics = allfeatures[i].setBySurround(allfeatures[i].getx(),allfeatures[i].gety(),amap,graphics,0,0,0);
       	showGraphic = graphics[0];
      }
      if (typeof allfeatures[i].doTile == "function") {
  	    showGraphic = allfeatures[i].doTile(allfeatures[i].getx(),allfeatures[i].gety(),showGraphic);
      }
      if (typeof allfeatures[i].setByBelow == "function") {
          	showGraphic = allfeatures[i].setByBelow(allfeatures[i].getx(),allfeatures[i].gety(),amap);
      }
      $(tdid).css("background-image", "url('graphics/" + showGraphic + "')");
      $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
      document.images[tileid].src="graphics/"+graphics[1];
    }
    if (draw > 1) {
    	var allnpcs = amap.npcs.getAll();
 	    for (var i=0;i<=allnpcs.length-1;i++) {
        var tileid = "tile" + allnpcs[i].getx() + "x" + allnpcs[i].gety();
        var tdid = "#td_" + tileid;
        var graphics = allnpcs[i].getGraphicArray();
        var showGraphic = graphics[0];
        if (typeof allnpcs[i].setBySurround == "function") {
       	  graphics = allnpcs[i].setBySurround(allnpcs[i].getx(),allnpcs[i].gety(),amap,graphics,0,0,0);
       	  showGraphic = graphics[0];
        }
        if (typeof allnpcs[i].doTile == "function") {
  	      showGraphic = allnpcs[i].doTile(allnpcs[i].getx(),allnpcs[i].gety(),showGraphic);
        }
      	$(tdid).css("background-image", "url('graphics/" + showGraphic + "')");
        $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
      	document.images[tileid].src="graphics/"+graphics[1];
      }
    }
  }
  else {
    var allfeatures = amap.features.getAll();
    for (var i=0;i<=allfeatures.length-1;i++) {
      var tileid = "tile" + allfeatures[i].getx() + "x" + allfeatures[i].gety();
      var tdid = "#td_" + tileid;
      var terrainthere = amap.getTile(allfeatures[i].getx(),allfeatures[i].gety());
      var showTerrain = terrainthere.getTerrain();
      var graphics = showTerrain.getGraphicArray();
      var showGraphic = graphics[0];
      if (typeof showTerrain.setBySurround == "function") {
       	graphics = showTerrain.setBySurround(allfeatures[i].getx(),allfeatures[i].gety(),amap,graphics,0,0,0);
       	showGraphic = graphics[0];
      }
      if (typeof showTerrain.doTile == "function") {
  	    showGraphic = showTerrain.doTile(allfeatures[i].getx(),allfeatures[i].gety(),showGraphic);
      }

      $(tdid).css("background-image", "url('graphics/" + showGraphic + "')");
      $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
      document.images[tileid].src="graphics/"+graphics[1];
    }
    var allnpcs = amap.npcs.getAll();
    for (var i=0;i<=allnpcs.length-1;i++) {
      var tileid = "tile" + allnpcs[i].getx() + "x" + allnpcs[i].gety();
      var tdid = "#td_" + tileid;
      var terrainthere = amap.getTile(allnpcs[i].getx(),allnpcs[i].gety());
      var showTerrain = terrainthere.getTerrain();
      var graphics = showTerrain.getGraphicArray();
      var showGraphic = graphics[0];
      if (typeof showTerrain.setBySurround == "function") {
       	graphics = showTerrain.setBySurround(allnpcs[i].getx(),allnpcs[i].gety(),amap,graphics,0,0,0);
       	showGraphic = graphics[0];
      }
      if (typeof showTerrain.doTile == "function") {
  	    showGraphic = showTerrain.doTile(allnpcs[i].getx(),allnpcs[i].gety(),showGraphic);
      }
      $(tdid).css("background-image", "url('graphics/" + showGraphic + "')");
      $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
      document.images[tileid].src="graphics/"+graphics[1];
    }

  } 	
}



function changeselection(tilename) {
  selectionval = localFactory.createTile(tilename);
  var graphics = selectionval.getGraphicArray();
  $('#td_selectionimg').css("background-image", "url('graphics/" + graphics[0] + "')");
  $('#td_selectionimg').css("background-position", graphics[2] + "px " + graphics[3] + "px");
  document.images["selectionimg"].src = "graphics/" + graphics[1];
  if (selectionval.getType() == "terrain") {
//  	displayval='terrain';
//  	drawFeatures(0);
//  	document.editlayer.layer[0].checked = true;
  }
  else if (selectionval.getType() == "feature") {
//  	displayval = 'feature';
//  	drawFeatures(1);
//  	document.editlayer.layer[1].checked = true;
  }
  else {
//  	displayval = 'all';
//  	drawFeatures(2);
//  	document.editlayer.layer[2].checked = true;
  }
}

function clickmap(xval,yval) {
//	if (lockout == 1) {return;}
  var x=0;
  var y=0;
  if (document.brushes.elements[0].checked) {
  	if (selectionval.getType() == "terrain") {
      changemaptile(xval,yval);
    }
    else if (selectionval.getType() == "feature") {
    	if (selectionval.getName() == "eraser") { erasefeature(xval,yval); }
    	else { addfeaturetomap(xval,yval,selectionval); }
    }
    else if (selectionval.getType() == "npc") {
    	addnpctomap(xval,yval,selectionval);
    }
    else {
    	alert("Unknown type.");
    }
  }
  else if (document.brushes.elements[1].checked) {
    if (cornerx == -1) {
      cornerx = xval;
      cornery = yval;
    }
    else {
      if (cornerx > xval) {
        x=xval;
        xval=cornerx;
        cornerx=x;
      }
      if (cornery > yval) {
        y=yval;
        yval=cornery;
        cornery=y;
      }
      for (x=cornerx;x<=xval;x++) {
        for (y=cornery;y<=yval;y++) {
        	if (selectionval.getType() == "terrain") {
            changemaptile(x,y);
          }
          else if (selectionval.getType() == "feature") {
    	      if (selectionval.getName() == "eraser") { erasefeature(x,y); }
    	      else { addfeaturetomap(x,y,selectionval); }
          }
          else if (selectionval.getType() == "npc") {
    	      addnpctomap(x,y,selectionval);
          }
          else {
    	      alert("Unknown type.");
          }
        }
      }
      cornerx=-1;
      cornery=-1;
    }
  }
  else if (document.brushes.elements[2].checked) {
  	var thistile = amap.getTile(xval,yval);
  	editable = thistile.features.getTop();
  	editnpcs = thistile.npcs.getTop();
  	if (!editable && !editnpcs) {alert("Nothing to edit on this tile."); return;}
  	if (!editnpcs || (displayval == "features")) {
      var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
      $('#featurebubble').jqm({onShow:myOpen}); 
      $('#featurebubble').jqmShow();
      var graphics = editable.getGraphicArray();
      $('#td_bubbletile').css("background-image","url('graphics/" + graphics[0] + "')");
      $('#td_bubbletile').css("background-position", graphics[2] + "px " + graphics[3] + "px");
  	  document.images["bubbletile"].src = "graphics/" + graphics[1];
      document.featureeditpopup.tiledesc.value = editable.getDesc();
      document.featureeditpopup.walkonscript.value = editable.getWalkOnScript();
      if (editable.getLocked != null) {
      	var lockedblock = document.getElementById("bubblelock");
    	  lockedblock.style.display = "table-row";
      	document.featureeditpopup.tilelocked.value = editable.getLocked();
      }
      if (editable.getEnterMap != null) {
      	var portalblock = document.getElementById("bubbleportal");
    	  portalblock.style.display = "table-row";
      	var mapinfo = editable.getEnterMap();
      	document.featureeditpopup.tileentermap.value = mapinfo.entermap;
      	document.featureeditpopup.tileenterx.value = mapinfo.enterx;
    	  document.featureeditpopup.tileentery.value = mapinfo.entery;
      }
    }
    else if (!editable || (displayval == "all")) {
    	var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
    	$('#npcbubble').jqm({onShow:myOpen});
    	$('#npcbubble').jqmShow();
    	document.npceditpopup.npcobjname.value = editnpcs.getName();
    	var graphics = editnpcs.getGraphicArray();
    	$('#td_bubbleNPCtile').css("background-image","url('graphics/" + graphics[0] + "')");
        $('#td_bubbleNPCtile').css("background-position", graphics[2] + "px " + graphics[3] + "px");
      document.images["bubbleNPCtile"].src = "graphics/" + graphics[1];    	
      document.npceditpopup.npcname.value = editnpcs.getNPCName();
      document.npceditpopup.npcdesc.value = editnpcs.getDesc();
      document.npceditpopup.npclevel.value = editnpcs.getLevel();
      document.npceditpopup.npcalign.value = editnpcs.getAlignment();
      document.npceditpopup.npcstr.value = editnpcs.getstr();
      document.npceditpopup.npcattitude.value = editnpcs.getAttitude();
      document.npceditpopup.npcdex.value = editnpcs.getdex();
      document.npceditpopup.npcpeaceai.value = editnpcs.getPeaceAI();
      document.npceditpopup.npcint.value = editnpcs.getint();
      document.npceditpopup.npcpcthreatai.value = editnpcs.getPCThreatAI();      
      document.npceditpopup.npcmelee.value = editnpcs.getMelee();
      document.npceditpopup.npcthreatenedai.value = editnpcs.getThreatenedAI();      
      document.npceditpopup.npcmissile.value = editnpcs.getMissile();
    }
  }
}

function submitEditFeature(change) {
	if (change == 1) {
		if (document.featureeditpopup.tiledesc.value != editable.getDesc()) {
			editable.setDesc(document.featureeditpopup.tiledesc.value);
		}
		if (document.featureeditpopup.walkonscript.value != editable.getWalkOnScript()) {
			editable.setWalkOnScript(document.featureeditpopup.walkonscript.value);
		}
		if ((document.featureeditpopup.tilelocked.value) && (editable.getLocked != null) && (document.featureeditpopup.tilelocked.value != editable.getLocked())) {
			editable.lockMe(document.featureeditpopup.tilelocked.value);
		}
		if ((document.featureeditpopup.tileentermap.value) && (editable.getEnterMap != null) && (document.featureeditpopup.tileentermap.value != editable.getEnterMap().entermap)) {
			editable.setEnterMap(document.featureeditpopup.tileentermap.value, document.featureeditpopup.tileenterx.value, document.featureeditpopup.tileentery.value);
		}
	}
	else if (change == -1) {
		// add an "Are you sure? Yes/No" prompt
		var mapfeature = amap.features;
		mapfeature.deleteFrom(editable);
		mapfeature = amap.getTile(editable.getx(),editable.gety());
		mapfeature.features.deleteFrom(editable);
    var tileid = "tile" + editable.getx() + "x" + editable.gety();
    var tdtileid = "#td_" + tileid;
    var localacre = amap.getTile(editable.getx(),editable.gety());
    var terraingraphics = localacre.terrain.getGraphicArray();
    $(tdtileid).css("background-image", "url('graphics/" + terraingraphics[0] + "')");
    $(tdtileid).css("background-position", terraingraphics[2] + "px " + terraingraphics[3] + "px");
    document.images[tileid].src = "graphics/"+terraingraphics[1];

	}
  document.featureeditpopup.elements[0].value = "";
  document.featureeditpopup.elements[1].value = "";
  document.featureeditpopup.elements[2].value = "";
  document.featureeditpopup.elements[3].value = "";
  document.featureeditpopup.elements[4].value = "";
 	var lockedblock = document.getElementById("bubblelock");
 	lockedblock.style.display = "none";
  var portalblock = document.getElementById("bubbleportal");
  portalblock.style.display = "none";
  return 0;
}

function submitEditNPC(change) {
	if (change == 1) {
		if (document.npceditpopup.npcname.value != editnpcs.getNPCName()) {
			editnpcs.setNPCName(document.npceditpopup.npcname.value);
		}
		if (document.npceditpopup.npcdesc.value != editnpcs.getDesc()) {
			editnpcs.setDesc(document.npceditpopup.npcdesc.value);
		}
		if (document.npceditpopup.npclevel.value != editnpcs.getLevel()) {
			editnpcs.setLevel(document.npceditpopup.npclevel.value);
		}
		if (document.npceditpopup.npcalign.value != editnpcs.getAlignment()) {
			editnpcs.setAlignment(document.npceditpopup.npcalign.value);
		}
		if (document.npceditpopup.npcstr.value != editnpcs.getstr()) {
			editnpcs.setstr(document.npceditpopup.npcstr.value);
		}
		if (document.npceditpopup.npcdex.value != editnpcs.getdex()) {
			editnpcs.setdex(document.npceditpopup.npcdex.value);
		}
		if (document.npceditpopup.npcint.value != editnpcs.getint()) {
			editnpcs.setint(document.npceditpopup.npcint.value);
		}
		if (document.npceditpopup.npcattitude.value != editnpcs.getAttitude()) {
			editnpcs.setAttitude(document.npceditpopup.npcattitude.value);
		}
		if (document.npceditpopup.npcpeaceai.value != editnpcs.getPeaceAI()) {
			editnpcs.setPeaceAI(document.npceditpopup.npcpeaceai.value);
		}
		if (document.npceditpopup.npcpcthreatai.value != editnpcs.getPCThreatAI()) {
			editnpcs.setPCThreatAI(document.npceditpopup.npcpcthreatai.value);
		}
		if (document.npceditpopup.npcthreatenedai.value != editnpcs.getThreatenedAI()) {
			editnpcs.setThreatenedAI(document.npceditpopup.npcthreatenedai.value);
		}
		if (document.npceditpopup.npcmelee.value != editnpcs.getMelee()) {
			editnpcs.setMelee(document.npceditpopup.npcmelee.value);
		}
		if (document.npceditpopup.npcmissile.value != editnpcs.getMissile()) {
			editnpcs.setMissile(document.npceditpopup.npcmissile.value);
		}
	}
	else if (change == -1) {
	  // add an "Are you sure? Yes/No" prompt
	  var mapnpc = amap.npcs;
	  mapnpc.deleteFrom(editnpcs);
    mapnpc = amap.getTile(editnpcs.getx(),editnpcs.gety());
	  mapnpc.npcs.deleteFrom(editnpcs);
    var tileid = "tile" + editnpcs.getx() + "x" + editnpcs.gety();
    var tdid = "#td_" + tileid;
    var localacre = amap.getTile(editnpcs.getx(),editnpcs.gety());
    var terraingraphics = localacre.terrain.getGraphicArray();
    $(tdid).css("background-image","url('graphics/" + terraingraphics[0] + "')");
    $(tdid).css("background-position", terraingraphics[2] + "px " + terraingraphics[3] + "px");
    document.images[tileid].src = "graphics/"+terraingraphics[1];
	}
}

function changemaptile(xval,yval) {
  var tileid = "tile" + xval + "x" + yval;
  var tdid = "#td_" + tileid;
  var graphics = selectionval.getGraphicArray();
  var showGraphic = graphics[0];
  if (typeof selectionval.setBySurround == "function") {
    graphics = selectionval.setBySurround(xval,yval,amap,graphics,0,0,0);
    showGraphic = graphics[0];
  }
  if (typeof selectionval.doTile == "function") {
  	showGraphic = selectionval.doTile(xval,yval,showGraphic);
  }
  if (typeof selectionval.setByBelow == "function") {
   	showGraphic = selectionval.setByBelow(xval,yval,amap);
  }
  $(tdid).css("background-image","url('graphics/" + graphics[0] + "')");
  $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
  document.images[tileid].src="graphics/"+graphics[1];
  amap.setTerrain(xval,yval,selectionval);

}


function resize(forminfo) {
  var oldy = amap.getHeight();
  var oldx = amap.getWidth();
  var newx = prompt("New width of the map:", oldx);
  var newy = prompt("New height of the map:", oldy);
  var anchor = 4;
  if (forminfo.elements[0].checked) {anchor = 0;}
  if (forminfo.elements[1].checked) {anchor = 1;}
  if (forminfo.elements[2].checked) {anchor = 2;}
  if (forminfo.elements[3].checked) {anchor = 3;}
  if (forminfo.elements[4].checked) {anchor = 4;}
  if (forminfo.elements[5].checked) {anchor = 5;}
  if (forminfo.elements[6].checked) {anchor = 6;}
  if (forminfo.elements[7].checked) {anchor = 7;}
  if (forminfo.elements[8].checked) {anchor = 8;}

  amap.resizeMap(newx,newy,anchor);

}


function addfeaturetomap(x,y,selection) {
	if (!amap.data[y][x].features) {
		amap.data[y][x].features = new Collection;
	}
	var newfeature = localFactory.createTile(selection.getName());
	newfeature.setx(x);
	newfeature.sety(y);
	amap.data[y][x].features.addTop(newfeature);
	amap.features.addTop(newfeature);

  var tileid = "tile" + x + "x" + y;  
  var tdid = "#td_" + tileid;
  var graphics = selection.getGraphicArray()
  var showGraphic = graphics[0];
  if (typeof selection.setBySurround == "function") {
   	graphics = selection.setBySurround(x,y,amap,graphics,0,0,0);
   	showGraphic = graphics[0];
  }
  if (typeof selection.doTile == "function") {
  	showGraphic = selection.doTile(x,y,showGraphic);
  }
  if (typeof selection.setByBelow == "function") {
   	showGraphic = selection.setByBelow(x,y,amap);
  }
  $(tdid).css("background-image","url('graphics/" + showGraphic + "')");
  $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
  document.images[tileid].src="graphics/"+graphics[1];
  
}

function addnpctomap(x,y,selection) {
	if (!amap.data[y][x].npcs) { 
		amap.data[y][x].npcs = new Collection;
	}
	var newnpc = localFactory.createTile(selection.getName());
	newnpc.setx(x);
	newnpc.sety(y);
	amap.data[y][x].npcs.addTop(newnpc);
	amap.npcs.addTop(newnpc);
	
	var tileid = "tile" + x + "x" + y;
	var tdid = "#td_" + tileid;
	var graphics = selection.getGraphicArray();
  var showGraphic = graphics[0];
  if (typeof selection.setBySurround == "function") {
   	graphics = selection.setBySurround(x,y,amap,graphics,0,0,0);
   	showGraphic = graphics[0];
  }
  if (typeof selection.doTile == "function") {
  	showGraphic = selection.doTile(x,y,showGraphic);
  }
  $(tdid).css("background-image","url('graphics/" + showGraphic + "')");
  $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
  document.images[tileid].src="graphics/"+graphics[1];
}

function erasefeature(x,y) {
	delete amap.data[y][x].features;
        amap.data[y][x].features = new Collection;
	var featureshere = amap.features.getAt(x,y);
	for (i in featureshere) {
	  amap.features.deleteFrom(featureshere[i]);
	}
        var tileid = "tile" + x + "x" + y;
        var tdid = "#td_" + tileid;
        var localacre = amap.getTile(x,y);
        var terraingraphics = localacre.getTerrain().getGraphicArray();
        var showGraphic = terraingraphics[0];
        if (typeof localacre.getTerrain().setBySurround == "function") {
       	  graphics = localacre.getTerrain().setBySurround(x,y,amap,graphics,0,0,0);
       	  showGraphic = graphics[0];
        }
        if (typeof localacre.getTerrain().doTile == "function") {
        	showGraphic = localacre.getTerrain().doTile(x,y,showGraphic);
        }
        $(tdid).css("background-image","url('graphics/" + showGraphic + "')");
        $(tdid).css("background-position", terraingraphics[2] + "px " + terraingraphics[3] + "px");
        document.images[tileid].src = "graphics/"+terraingraphics[1];
}

function initialSelect() {
  changeselection('Ocean');
 	displayval='all';
 	drawFeatures(2);
 	document.editlayer.layer[2].checked = true;

}

function writeTileOption(tilename) {

var tempTile = localFactory.createTile(tilename);
var graphics = tempTile.getGraphicArray();
var imgsrc = graphics[0];
var oversrc = graphics[1];
//document.write("<a href=\"javascript:changeselection('" + tilename + "');\"><img src='graphics/" + imgsrc + "'></a>");
var id = "#tileoption" + tilename;
document.write("<td id='" + id+ "' style=\"height:32;width:32;background-repeat:no-repeat;background-position: " + graphics[2] + "px " + graphics[3] + "px; background-image:url('graphics/" + imgsrc + "')\"><a href=\"javascript:changeselection('" + tilename + "');\"><img src='graphics/" + oversrc + "' width='32' height='32' border='0'></a></td>");
}

function setVisible(divname) {

var outdoorblock = document.getElementById("outdoordiv");
var indoorblock = document.getElementById("indoordiv");
var featureblock = document.getElementById("featurediv");
var creatureblock = document.getElementById("creaturediv");

  if (divname == "outdoor") {
    outdoorblock.style.display="block";
  }
  else { outdoorblock.style.display="none"; }
  
  if (divname == "indoor") {
    indoorblock.style.display="block";
  }
  else { indoorblock.style.display="none"; }
  
  if (divname == "features") {
    featureblock.style.display="block";
  }
  else { featureblock.style.display="none"; }
  
  if (divname == "creatures") {
    creatureblock.style.display="block";
  }
  else { creatureblock.style.display="none"; }

}

function editorEditMapDetails() {
  var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
  $('#detailsbubble').jqm({onShow:myOpen}); 
  $('#detailsbubble').jqmShow();
  document.detailseditpopup.mapname.value = amap.getName();
  document.detailseditpopup.mapdesc.value = amap.getDesc();
  document.detailseditpopup.mapmusic.value = amap.getMusic();
  document.detailseditpopup.mapexitmap.value = amap.getExitToMap();
  document.detailseditpopup.mapexitx.value = amap.getExitToX();
  document.detailseditpopup.mapexity.value = amap.getExitToY();
  document.detailseditpopup.mapenterx.value = amap.getEnterX();
  document.detailseditpopup.mapentery.value = amap.getEnterY();
  document.detailseditpopup.mapwrap.value = amap.getWrap();
  var maplist = amap.getLinkedMaps();
  if (maplist) {
    document.detailseditpopup.maplinkedmaps.value = maplist.join();
  }
  else { document.detailseditpopup.maplinkedmaps.value = ""; }
  document.detailseditpopup.mapseebelow.value = amap.getSeeBelow();
  document.detailseditpopup.maplightlevel.value = amap.getLightLevel();
  document.detailseditpopup.mapalwaysremember.value = amap.getAlwaysRemember();
}

function submitEditDetails(change) {
	if (change == 1) {
    amap.setName(document.detailseditpopup.mapname.value);
    amap.setDesc(document.detailseditpopup.mapdesc.value);
    amap.setMusic(document.detailseditpopup.mapmusic.value);
    amap.setExitToMap(document.detailseditpopup.mapexitmap.value);
    amap.setExitToX(document.detailseditpopup.mapexitx.value);
    amap.setExitToY(document.detailseditpopup.mapexity.value);		
    amap.setWrap(document.detailseditpopup.mapwrap.value);	
    amap.setEnterX(document.detailseditpopup.mapenterx.value);
    amap.setEnterY(document.detailseditpopup.mapentery.value);			
    amap.setLinkedMaps(document.detailseditpopup.maplinkedmaps.value);
    amap.setSeeBelow(document.detailseditpopup.mapseebelow.value);
    amap.setLightLevel(document.detailseditpopup.maplightlevel.value);
    amap.setAlwaysRemember(document.detailseditpopup.mapalwaysremember.value);
	}
}



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
var editable;
var browserheight = getSize();


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
       mapdiv += '<td><img onClick="parent.clickmap('+j+','+i+')" id="tile'+j+'x'+i+'" src="graphics/'+localacre.terrain.getGraphic()+'" border="0" alt="tile'+j+'x'+i+'" /></td>';
     }
     mapdiv += '</tr><tr>';
   }
   mapdiv  += '</table>';
 }
 $("div.mapscreen").html(mapdiv);
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

function drawFeatures(draw) {
	if (draw > 0) {
  	var allfeatures = amap.features.getAll();
    for (var i=0;i<=allfeatures.length-1;i++) {
      var tileid = "tile" + allfeatures[i].getx() + "x" + allfeatures[i].gety();
      document.images[tileid].src="graphics/"+allfeatures[i].getGraphic();
    }
    if (draw > 1) {
    	var allnpcs = amap.npcs.getAll();
 	    for (var i=0;i<=allnpcs.length-1;i++) {
        var tileid = "tile" + allnpcs[i].getx() + "x" + allnpcs[i].gety();
        document.images[tileid].src="graphics/"+allnpcs[i].getGraphic();
      }
    }
  }
  else {
    var allfeatures = amap.features.getAll();
    for (var i=0;i<=allfeatures.length-1;i++) {
      var tileid = "tile" + allfeatures[i].getx() + "x" + allfeatures[i].gety();
      var terrainthere = amap.getTile(allfeatures[i].getx(),allfeatures[i].gety());
      document.images[tileid].src="graphics/"+terrainthere.terrain.getGraphic();
    }
    var allnpcs = amap.npcs.getAll();
    for (var i=0;i<=allnpcs.length-1;i++) {
      var tileid = "tile" + allnpcs[i].getx() + "x" + allnpcs[i].gety();
      var terrainthere = amap.getTile(allnpcs[i].getx(),allnpcs[i].gety());
      document.images[tileid].src="graphics/"+terrainthere.terrain.getGraphic();
    }

  } 	
}



function changeselection(tilename) {
  selectionval = localFactory.createTile(tilename);
  document.images["selectionimg"].src = "graphics/" + selectionval.getGraphic();
  if (selectionval.getType() == "terrain") {
  	displayval='terrain';
  	drawFeatures(0);
  	document.editlayer.layer[0].checked = true;
  }
  else if (selectionval.getType() == "feature") {
  	displayval = 'feature';
  	drawFeatures(1);
  	document.editlayer.layer[1].checked = true;
  }
  else {
  	displayval = 'all';
  	drawFeatures(2);
  	document.editlayer.layer[2].checked = true;
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
  	if (!editable) {alert("No feature on this tile."); return;}
//  	lockout = 1;
//  	var bubbleblock = mapscreen.document.getElementById("featurebubble");
//  	bubbleblock.style.display = "block";
    var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
    $('#featurebubble').jqm({onShow:myOpen}); 
    $('#featurebubble').jqmShow();
  	document.images["bubbletile"].src = "graphics/" + editable.getGraphic();
    document.featureeditpopup.tiledesc.value = editable.getDesc();
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
}

function submitEditFeature(change) {
	if (change == 1) {
		if (document.featureeditpopup.tiledesc.value != editable.getDesc()) {
			editable.setDesc(document.featureeditpopup.tiledesc.value);
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
    var localacre = amap.getTile(editable.getx(),editable.gety());
    document.images[tileid].src = "graphics/"+localacre.terrain.getGraphic();

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


function changemaptile(xval,yval) {
  var tileid = "tile" + xval + "x" + yval;

  document.images[tileid].src="graphics/"+selectionval.getGraphic();
  amap.setTerrain(xval,yval,selectionval);

}


function resize(forminfo) {
  var oldy = amap.data.length;
  var oldx = amap.data[0].length;
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
  document.images[tileid].src="graphics/"+selection.getGraphic();
  
}

function addnpctomap(x,y,selection) {
	
}

function erasefeature(x,y) {
	delete amap.data[y][x].features;
        amap.data[y][x].features = new Collection;
	var featureshere = amap.features.getAt(x,y);
	for (i in featureshere) {
	  amap.features.deleteFrom(featureshere[i]);
	}
        var tileid = "tile" + x + "x" + y;
        var localacre = amap.getTile(x,y);
        document.images[tileid].src = "graphics/"+localacre.terrain.getGraphic();
}

function initialSelect() {
  changeselection('Ocean');
 	displayval='all';
 	drawFeatures(2);
 	document.editlayer.layer[2].checked = true;

}

function writeTileOption(tilename) {

var tempTile = parent.localFactory.createTile(tilename);
var imgsrc = tempTile.graphic;
document.write("<a href=\"javascript:parent.changeselection('" + tilename + "');\"><img src='graphics/" + imgsrc + "'></a>");

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
	}
}
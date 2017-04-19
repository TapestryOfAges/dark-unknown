"use strict";

var maxserial = 0;
var cornerx = -1;
var cornery = -1;
var changes = 0;
var localFactory = new tileFactory();
var selectionval = localFactory.createTile("Ocean");
var eidos = new Platonic();
var mappages = new Pages();
var amap = new GameMap();
var debug = 0;
var debugscreen;
var togglehide = 0;
var targetCursor = {};
var workInLayers = 0;

var brushdown = 0;
var editable;
var editnpcs;

var browserheight;
var losgrid = new LOSMatrix(13);
var DUTime = new Timeline(0);
//var mode = "editor";
var PC = new PCObject();
var DU = {};
var gamestate = new GameStateData();
var DULoot = SetLoots();            //
var DULootGroups = SetLootGroups(); //  see loot.js and lootset.js for population
var DUTraps = SetTraps();           //
var Dice = new DiceObject();
var localatlas = new Atlas();

var graphicpicks = [];
var optindex = 0;

DU.gameflags = new Gameflags();  // empty games flags because atlas will look for it
DU.gameflags.setFlag("editor", 1);  // for atlas to look for

$(document).ready(function() {
  browserheight = $(window).height();
});

if (debug) {
  debugscreen = window.open('','debugscreen');
}

function toggleinterface() {
  if (togglehide === 0) {
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
  if (debug === 0) { debug = 1; }
  else { debug = 1; }
  if (debug) {
    debugscreen = window.open('','debugscreen');
  }
}

function editorLoadMap(mapname) {
  if (changes === 1) {
    var doload = confirm("Do you wish to load a new map? All progress will be lost.");
    if (!doload) { return; }
  }
	if (mapname !== "test") { 
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
   mapdiv += "<table cellpadding='0' cellspacing='0' border='0' style='background-color:black'><tr>";
   for (var i=0;i<=amap.data.length-1;i++) {
     for (var j=0;j<=amap.data[0].length-1;j++) {
       var localacre = amap.getTile(j,i);
       var graphics = localacre.getTerrain().getGraphicArray();
       var showGraphic = graphics[0];
       if (typeof localacre.getTerrain().setBySurround === "function") {
       	graphics = localacre.getTerrain().setBySurround(j,i,amap,graphics,0,0,0);
       	showGraphic = graphics[0];
      }
       if (typeof localacre.getTerrain().doTile === "function") {
  	     showGraphic = localacre.getTerrain().doTile(j,i,showGraphic);
       }
       mapdiv += '<td id="td_tile'+j+'x'+i+'" class="maptd" style="background-repeat:no-repeat;width:32;height:32;background-image:url(\'graphics/' + showGraphic + '\'); background-position: ' + graphics[2] + 'px ' + graphics[3] + 'px;" onMouseDown="brushdown=1;clickmap('+j+','+i+');return(false);" onMouseOver="enterTile('+j+','+i+');"><img id="tile'+j+'x'+i+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+j+'x'+i+'" title="tile'+j+'x'+i+'" width="32" height="32" /></td>';
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
 drawFeatures();
 $().ready(function() { $('#featurebubble').jqm({modal : true}) });
}

function enterTile(x,y) {
	if ((document.brushes.elements[0].checked) && (brushdown === 1)) {
		clickmap(x,y);
	}
}

function drawFeatures() {
	if (document.editlayer.showfeatures.checked) {
  	var allfeatures = amap.features.getAll();
    for (var i=0;i<=allfeatures.length-1;i++) {
      if ((allfeatures[i].invisible) && (!document.editlayer.showinvis.checked)) { continue; }
      var tileid = "tile" + allfeatures[i].getx() + "x" + allfeatures[i].gety();
      var tdid = "#td_" + tileid;
      var graphics = allfeatures[i].getGraphicArray();
      var showGraphic = graphics[0];
      if (typeof allfeatures[i].setBySurround === "function") {
       	graphics = allfeatures[i].setBySurround(allfeatures[i].getx(),allfeatures[i].gety(),amap,graphics,0,0,0);
       	showGraphic = graphics[0];
      }
      if (typeof allfeatures[i].doTile === "function") {
  	    showGraphic = allfeatures[i].doTile(allfeatures[i].getx(),allfeatures[i].gety(),showGraphic);
      }
      if (typeof allfeatures[i].setByBelow === "function") {
//          	showGraphic = allfeatures[i].setByBelow(allfeatures[i].getx(),allfeatures[i].gety(),amap);
        var setbelow = allfeatures[i].setByBelow(allfeatures[i].getx(),allfeatures[i].gety(),amap);
        showGraphic = setbelow[0];
        graphics[2] = setbelow[2];
        graphics[3] = setbelow[3];
      }
      $(tdid).css("background-image", "url('graphics/" + showGraphic + "')");
      $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
      document.images[tileid].src="graphics/"+graphics[1];
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
      if (typeof showTerrain.setBySurround === "function") {
       	graphics = showTerrain.setBySurround(allfeatures[i].getx(),allfeatures[i].gety(),amap,graphics,0,0,0);
       	showGraphic = graphics[0];
      }
      if (typeof showTerrain.doTile === "function") {
  	    showGraphic = showTerrain.doTile(allfeatures[i].getx(),allfeatures[i].gety(),showGraphic);
      }

      $(tdid).css("background-image", "url('graphics/" + showGraphic + "')");
      $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
      document.images[tileid].src="graphics/"+graphics[1];
    }
  }
  if (document.editlayer.shownpcs.checked) {
    	var allnpcs = amap.npcs.getAll();
 	    for (var i=0;i<=allnpcs.length-1;i++) {
 	      if ((allnpcs[i].invisible) && (!document.editlayer.showinvis.checked)) { continue; }
        var tileid = "tile" + allnpcs[i].getx() + "x" + allnpcs[i].gety();
        var tdid = "#td_" + tileid;
        var graphics = allnpcs[i].getGraphicArray();
        var showGraphic = graphics[0];
        if (typeof allnpcs[i].setBySurround === "function") {
       	  graphics = allnpcs[i].setBySurround(allnpcs[i].getx(),allnpcs[i].gety(),amap,graphics,0,0,0);
       	  showGraphic = graphics[0];
        }
        if (typeof allnpcs[i].doTile === "function") {
  	      showGraphic = allnpcs[i].doTile(allnpcs[i].getx(),allnpcs[i].gety(),showGraphic);
        }
      	$(tdid).css("background-image", "url('graphics/" + showGraphic + "')");
        $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
      	document.images[tileid].src="graphics/"+graphics[1];
      }
  }
  else {
    var allnpcs = amap.npcs.getAll();
    for (var i=0;i<=allnpcs.length-1;i++) {
      var tileid = "tile" + allnpcs[i].getx() + "x" + allnpcs[i].gety();
      var tdid = "#td_" + tileid;
      var terrainthere = amap.getTile(allnpcs[i].getx(),allnpcs[i].gety());
      var showTerrain = terrainthere.getTerrain();
      var graphics = showTerrain.getGraphicArray();
      var showGraphic = graphics[0];
      if (typeof showTerrain.setBySurround === "function") {
       	graphics = showTerrain.setBySurround(allnpcs[i].getx(),allnpcs[i].gety(),amap,graphics,0,0,0);
       	showGraphic = graphics[0];
      }
      if (typeof showTerrain.doTile === "function") {
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
  selectionval.setName(tilename);  // to allow for my way of making locked doors/etc
  var graphics = selectionval.getGraphicArray();
  $('#td_selectionimg').css("background-image", "url('graphics/" + graphics[0] + "')");
  $('#td_selectionimg').css("background-position", graphics[2] + "px " + graphics[3] + "px");
  document.images["selectionimg"].src = "graphics/" + graphics[1];
  if (selectionval.checkType("Terrain")) {
//  	displayval='terrain';
//  	drawFeatures(0);
//  	document.editlayer.layer[0].checked = true;
  }
  else if (selectionval.checkType("Feature")) {
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
  changes = 1;
  var x=0;
  var y=0;
  if (workInLayers) {
    var square = document.getElementById("td_tile"+xval+"x"+yval);
    var rect = square.getBoundingClientRect();
    brushdown = 0;
    var mytext = prompt("Label:");
    if (mytext) {
      var divtileid = "div_tile"+xval+"x"+yval;
      $("body").append('<div id="'+divtileid+'" style="position:absolute;left:'+rect.left+';top:'+rect.top+'" class="labelsLayer" onClick="DeleteLabel(\''+divtileid+'\')">&nbsp;'+mytext+'&nbsp;</div>');
    }
    amap.allLabels[divtileid] = mytext;
  }
  else if (document.brushes.elements[0].checked) {   // point
  	if (selectionval.checkType("Terrain")) {
      changemaptile(xval,yval);
    }
    else if (selectionval.getName() === "Eraser") { erasefeature(xval,yval); }
    else if (selectionval.checkType("Feature")) {
    	addfeaturetomap(xval,yval,selectionval); 
    }
    else if (selectionval.checkType("npc")) {
    	addnpctomap(xval,yval,selectionval);
    }
    else {
    	alert("Unknown type.");
    }
  }
  else if (document.brushes.elements[1].checked) {   // rectangle
    if (cornerx === -1) {
      cornerx = xval;
      cornery = yval;
    }
    else {
      DrawRectangle(xval,yval);
    }
  }
  else if (document.brushes.elements[2].checked) {
  	var thistile = amap.getTile(xval,yval);
  	editable = thistile.features.getTop();
  	editnpcs = thistile.npcs.getTop();
  	if (!editable && !editnpcs) {alert("Nothing to edit on this tile."); return;}
    if (editnpcs && (document.editlayer.shownpcs.checked)) {
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
      document.npceditpopup.npcstr.value = editnpcs.getStr();
      document.npceditpopup.npcattitude.value = editnpcs.getAttitude();
      document.npceditpopup.npcdex.value = editnpcs.getDex();
      document.npceditpopup.npcpeaceai.value = editnpcs.getPeaceAI();
      document.npceditpopup.npcint.value = editnpcs.getInt();
      document.npceditpopup.npcpcthreatai.value = editnpcs.getPCThreatAI();      
//      document.npceditpopup.npcmelee.value = editnpcs.getMeleeAttackAs();
//      document.npceditpopup.npcmissile.value = editnpcs.getMissileAttackAs();
      document.npceditpopup.npcconvo.value = editnpcs.getConversation();
      document.npceditpopup.npcconvflag.value = editnpcs.getConversationFlag();
      document.npceditpopup.npcgender.value = editnpcs.getGender();
      document.npceditpopup.npcmerch.value = editnpcs.getMerch();
      document.npceditpopup.npcleash.value = editnpcs.getLeash();
      document.npceditpopup.npcbarkfreq.value = editnpcs.getBarkFreq();
      document.npceditpopup.npcbark.value = editnpcs.getBark();
      document.npceditpopup.npcbarkrad.value = editnpcs.getBarkRad();
      document.npceditpopup.npcnpcband.value = editnpcs.getNPCBand();
      
      graphicpicks = [];
      optindex=0;
      var tmpdude = localFactory.createTile(editnpcs.getName());
      var picksblock = "<table><tr><td style='background-color:777777; border:inset' id='opt1' onClick='selectGraphic(1,\"" + tmpdude.getGraphic() + "\")' >";
      picksblock = picksblock + "<img src='graphics/" + tmpdude.getGraphic() + "' /></td>";
      graphicpicks[1] = tmpdude.getGraphic();
      var optnum = 2;
      $.each(tmpdude.altgraphic, function(idx,val) {
        picksblock = picksblock + " <td style='background-color:777777; border:inset' id='opt" + optnum + "' onClick='selectGraphic(" + optnum+",\"" + val + "\")' >";
        picksblock = picksblock + "<img src='graphics/" + val + "' /></td>";
        graphicpicks[optnum] = val;
        optnum++;
      });
      picksblock = picksblock += "</tr></table>";
      $("#pickgraphics").html(picksblock);
      
      if (editnpcs.overrideGraphic && !optindex) {
        $.each(graphicpicks, function(idx,val) {
          if (val === editnpcs.overrideGraphic) { optindex = idx; }
        });
        $("#opt"+optindex).css("background-color","red");
      } else if (optindex) {
        $("#opt"+optindex).css("background-color","red");
      }
    }
  	else if (!editnpcs && (document.editlayer.showfeatures.checked)) {
      var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
      $('#featurebubble').jqm({onShow:myOpen}); 
      $('#featurebubble').jqmShow();
      var graphics = editable.getGraphicArray();
      $('#td_bubbletile').css("background-image","url('graphics/" + graphics[0] + "')");
      $('#td_bubbletile').css("background-position", graphics[2] + "px " + graphics[3] + "px");
  	  document.images["bubbletile"].src = "graphics/" + graphics[1];
  	  $('#featurecoordstd').text("x: " + editable.getx() + ", y: " + editable.gety());
      document.featureeditpopup.tiledesc.value = editable.getDesc();
      document.featureeditpopup.walkonscript.value = editable.getWalkOnScript();
      document.featureeditpopup.usescript.value = editable.getUseScript();
      if (editable.getLocked && (typeof editable.getLocked === "function")) {
      	var lockedblock = document.getElementById("bubblelock");
    	  lockedblock.style.display = "table-row";
      	document.featureeditpopup.tilelocked.value = editable.getLocked();
      } else {
        var lockedblock = document.getElementById("bubblelock");
    	  lockedblock.style.display = "none";
      }
      if (editable.getEnterMap && (typeof editable.getEnterMap === "function")) {
      	var portalblock = document.getElementById("bubbleportal");
    	  portalblock.style.display = "table-row";
      	var mapinfo = editable.getEnterMap();
      	document.featureeditpopup.tileentermap.value = mapinfo.entermap;
      	document.featureeditpopup.tileenterx.value = mapinfo.enterx;
    	  document.featureeditpopup.tileentery.value = mapinfo.entery;
      } else {
        var portalblock = document.getElementById("bubbleportal");
    	  portalblock.style.display = "none";
      }
      if (editable.isContainer) {
        var chestblock = document.getElementById("bubblechest");
        chestblock.style.display = "table-row";
        document.featureeditpopup.lootgroup.value = editable.getLootgroup();
        document.featureeditpopup.karmapenalty.value = editable.getKarmaPenalty();
      } else {
        var chestblock = document.getElementById("bubblechest");
        chestblock.style.display = "none";
      }
      if ("searchYield" in editable) {
        var chestblock = document.getElementById("bubblesearch");
        chestblock.style.display = "table-row";
        var tmpsearch = editable.getSearchYield();
        var tmpval = "";
        if (tmpsearch[0]) {
          tmpval = tmpsearch[0];
          if (tmpsearch[1]) {
            for (var i=1;i<tmpsearch.length;i++) {
              tmpval += "," + tmpsearch[i];
            }
          }
        } 
        document.featureeditpopup.searchyield.value = tmpval;
      } else {
        var chestblock = document.getElementById("bubblesearch");
        chestblock.style.display = "none";
      }
      if (editable.hasOwnProperty("lootedid")) {
        var chestblock = document.getElementById("bubbleloot");
        chestblock.style.display = "table-row";
        document.featureeditpopup.lootedid.value = editable.getLootedID();
      } else {
        var chestblock = document.getElementById("bubbleloot");
        chestblock.style.display = "none";
      }
    }
  } else if (document.brushes.elements[3].checked) {   // raze
    if (cornerx === -1) {
      cornerx = xval;
      cornery = yval;
    }
    else {
      RazeArea(Math.min(cornerx, xval), Math.max(cornerx, xval), Math.min(cornery, yval), Math.max(cornery, yval));
      cornerx = -1;
      cornery = -1;
    }
  } else if (document.brushes.elements[4].checked) {   // copy
    if (cornerx === -1) {
      cornerx = xval;
      cornery = yval;
    }
    else {
      MakeCopy(xval,yval);
      alert("Copy made.");
      cornerx = -1;
      cornery = -1;
    }
  } else if (document.brushes.elements[5].checked) { // PASTE
    PasteCopy(xval,yval);
    cornerx = -1;
    cornery = -1;
  }
}

function selectGraphic(optnum, selgraph) {
  if (graphicpicks[optindex] === selgraph) {
    optindex = 0;
    $("#opt" + optnum).css("background-color","777777");
  } else {
    $("#opt" + optindex).css("background-color","777777");
    optindex = optnum
    $("#opt" + optnum).css("background-color","red");
  }
}

function submitEditFeature(change) {
	if (change === 1) {
		if (document.featureeditpopup.tiledesc.value !== editable.getDesc()) {
			editable.setDesc(document.featureeditpopup.tiledesc.value);
		}
		if (document.featureeditpopup.walkonscript.value !== editable.getWalkOnScript()) {
			editable.setWalkOnScript(document.featureeditpopup.walkonscript.value);
		}
    if (document.featureeditpopup.usescript.value !== editable.getUseScript()) {
			editable.setUseScript(document.featureeditpopup.usescript.value);
		}
		if ((document.featureeditpopup.tilelocked.value) && (editable.getLocked != null) && (document.featureeditpopup.tilelocked.value !== editable.getLocked())) {
			editable.lockMe(document.featureeditpopup.tilelocked.value);
		}
		if ((document.featureeditpopup.tileentermap.value) && (editable.getEnterMap != null) && (document.featureeditpopup.tileentermap.value !== editable.getEnterMap().entermap)) {
			editable.setEnterMap(document.featureeditpopup.tileentermap.value, document.featureeditpopup.tileenterx.value, document.featureeditpopup.tileentery.value);
		}
		if ((document.featureeditpopup.lootgroup.value) && (editable.isContainer) && (document.featureeditpopup.lootgroup.value != editable.getLootgroup())) {
		  editable.setLootgroup(document.featureeditpopup.lootgroup.value);
		  editable.setKarmaPenalty(document.featureeditpopup.karmapenalty.value);
		}
		if ((document.featureeditpopup.lootedid.value) && (document.featureeditpopup.lootedid.value != editable.getLootedID())) {
		  editable.setLootedID(document.featureeditpopup.lootedid.value);
		}
		// searchyield
		var syarray = [];
		if ("searchYield" in editable) {
  		if (document.featureeditpopup.searchyield.value) {
  		  var tmpsy = document.featureeditpopup.searchyield.value.replace(/ /g,"");
	  	  syarray = document.featureeditpopup.searchyield.value.split(",");
		  }
		  editable.setSearchYield(syarray);
		}

	}
	else if (change === -1) {
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
    drawFeatures();

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
	if (change === 1) {
		if (document.npceditpopup.npcname.value !== editnpcs.getNPCName()) {
			editnpcs.setNPCName(document.npceditpopup.npcname.value);
		}
		if (document.npceditpopup.npcdesc.value !== editnpcs.getDesc()) {
			editnpcs.setDesc(document.npceditpopup.npcdesc.value);
		}
		if (document.npceditpopup.npclevel.value !== editnpcs.getLevel()) {
			editnpcs.setLevel(document.npceditpopup.npclevel.value);
		}
		if (document.npceditpopup.npcalign.value !== editnpcs.getAlignment()) {
			editnpcs.setAlignment(document.npceditpopup.npcalign.value);
		}
		if (document.npceditpopup.npcstr.value !== editnpcs.getStr()) {
			editnpcs.setStr(document.npceditpopup.npcstr.value);
		}
		if (document.npceditpopup.npcdex.value !== editnpcs.getDex()) {
			editnpcs.setDex(document.npceditpopup.npcdex.value);
		}
		if (document.npceditpopup.npcint.value !== editnpcs.getInt()) {
			editnpcs.setInt(document.npceditpopup.npcint.value);
		}
		if (document.npceditpopup.npcattitude.value !== editnpcs.getAttitude()) {
			editnpcs.setAttitude(document.npceditpopup.npcattitude.value);
		}
		if (document.npceditpopup.npcpeaceai.value !== editnpcs.getPeaceAI()) {
			editnpcs.setPeaceAI(document.npceditpopup.npcpeaceai.value);
		}
		if (document.npceditpopup.npcpcthreatai.value !== editnpcs.getPCThreatAI()) {
			editnpcs.setPCThreatAI(document.npceditpopup.npcpcthreatai.value);
		}
//		if (document.npceditpopup.npcmelee.value !== editnpcs.getMeleeAttackAs()) {
//			editnpcs.setMeleeAttackAs(document.npceditpopup.npcmelee.value);
//		}
//		if (document.npceditpopup.npcmissile.value !== editnpcs.getMissileAttackAs()) {
//			editnpcs.setMissileAttackAs(document.npceditpopup.npcmissile.value);
//		}
		if (document.npceditpopup.npcconvo.value !== editnpcs.getConversation()) {
			editnpcs.setConversation(document.npceditpopup.npcconvo.value);
		}
    if (document.npceditpopup.npcconvo.value !== editnpcs.getConversationFlag()) {
			editnpcs.setConversationFlag(document.npceditpopup.npcconvflag.value);
		}
		if (document.npceditpopup.npcmerch.value !== editnpcs.getMerch()) {
			editnpcs.setMerch(document.npceditpopup.npcmerch.value);
		}
		if (document.npceditpopup.npcgender.value !== editnpcs.getGender()) {
			editnpcs.setGender(document.npceditpopup.npcgender.value);
		}
		if (document.npceditpopup.npcleash.value !== editnpcs.getLeash()) {
			editnpcs.setLeash(document.npceditpopup.npcleash.value);
		}
		if (document.npceditpopup.npcbarkfreq.value !== editnpcs.getBarkFreq()) {
			editnpcs.setBarkFreq(document.npceditpopup.npcbarkfreq.value);
		}
		if (document.npceditpopup.npcbark.value !== editnpcs.getBark()) {
			editnpcs.setBark(document.npceditpopup.npcbark.value);
		}
		if (document.npceditpopup.npcbarkrad.value !== editnpcs.getBarkRad()) {
			editnpcs.setBarkRad(document.npceditpopup.npcbarkrad.value);
		}
		if (document.npceditpopup.npcnpcband.value !== editnpcs.getNPCBand()) {
			editnpcs.setNPCBand(document.npceditpopup.npcnpcband.value);
		}
		if (optindex) {
		  editnpcs.overrideGraphic = graphicpicks[optindex];
		} else {
		  editnpcs.overrideGraphic = "";
		}
	}
	else if (change === -1) {
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
    drawFeatures();
	}
}

function changemaptile(xval,yval,toTerrain) {
  if (!toTerrain) { toTerrain = selectionval; }
  var tileid = "tile" + xval + "x" + yval;
  var tdid = "#td_" + tileid;
  var graphics = toTerrain.getGraphicArray();
  var showGraphic = graphics[0];
  if (typeof toTerrain.setBySurround === "function") {
    graphics = toTerrain.setBySurround(xval,yval,amap,graphics,0,0,0);
    showGraphic = graphics[0];
  }
  if (typeof toTerrain.doTile === "function") {
  	showGraphic = toTerrain.doTile(xval,yval,showGraphic);
  }
  if (typeof toTerrain.setByBelow === "function") {
      var setbelow = toTerrain.setByBelow(xval,yval,amap);
      showGraphic = setbelow[0];
      graphics[2] = setbelow[2];
      graphics[3] = setbelow[3];

  }
  $(tdid).css("background-image","url('graphics/" + graphics[0] + "')");
  $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
  document.images[tileid].src="graphics/"+graphics[1];
  amap.setTerrain(xval,yval,toTerrain);

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


function addfeaturetomap(x,y,selection,noFactory) {
	if (!amap.data[y][x].features) {
		amap.data[y][x].features = new Collection();
	}
	var newfeature;
  if (!noFactory) {
    newfeature = localFactory.createTile(selection.getName());
	  newfeature.setx(x);
	  newfeature.sety(y);
  } else {
    newfeature = selection; 
  }
	amap.data[y][x].features.addTop(newfeature);
	amap.features.addTop(newfeature);

  var tileid = "tile" + x + "x" + y;  
  var tdid = "#td_" + tileid;
  var graphics = selection.getGraphicArray()
  var showGraphic = graphics[0];
  if (typeof selection.setBySurround === "function") {
   	graphics = selection.setBySurround(x,y,amap,graphics,0,0,0);
   	showGraphic = graphics[0];
  }
  if (typeof selection.doTile === "function") {
  	showGraphic = selection.doTile(x,y,showGraphic);
  }
  if (typeof selection.setByBelow === "function") {
//   	showGraphic = selection.setByBelow(x,y,amap);
    var setbelow = selection.setByBelow(x,y,amap);
    showGraphic = setbelow[0];
    graphics[2] = setbelow[2];
    graphics[3] = setbelow[3];
  }
  $(tdid).css("background-image","url('graphics/" + showGraphic + "')");
  $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
  document.images[tileid].src="graphics/"+graphics[1];
  
}

function addnpctomap(x,y,selection,noFactory) {
	if (!amap.data[y][x].npcs) { 
		amap.data[y][x].npcs = new Collection();
	}
	var newnpc;
  if (!noFactory) {
    newnpc = localFactory.createTile(selection.getName());
	  newnpc.setx(x);
	  newnpc.sety(y);
  	if (document.brushes.npcband.value) {
	    newnpc.setNPCBand(document.brushes.npcband.value);
  	}
  } else {
    newnpc = selection;
  }
	amap.data[y][x].npcs.addTop(newnpc);
	amap.npcs.addTop(newnpc);
	
	var tileid = "tile" + x + "x" + y;
	var tdid = "#td_" + tileid;
	var graphics = selection.getGraphicArray();
  var showGraphic = graphics[0];
  if (typeof selection.setBySurround === "function") {
   	graphics = selection.setBySurround(x,y,amap,graphics,0,0,0);
   	showGraphic = graphics[0];
  }
  if (typeof selection.doTile === "function") {
  	showGraphic = selection.doTile(x,y,showGraphic);
  }
  $(tdid).css("background-image","url('graphics/" + showGraphic + "')");
  $(tdid).css("background-position", graphics[2] + "px " + graphics[3] + "px");
  document.images[tileid].src="graphics/"+graphics[1];
}

function erasefeature(x,y) {
  var editable = amap.getTile(x,y).features.getTop();
  var mapfeature = amap.features;
  mapfeature.deleteFrom(editable);
  mapfeature = amap.getTile(editable.getx(),editable.gety());
  mapfeature.features.deleteFrom(editable);
  var tileid = "tile" + editable.getx() + "x" + editable.gety();
  var tdtileid = "#td_" + tileid;
  var localacre = amap.getTile(editable.getx(),editable.gety());
  var terraingraphics = localacre.terrain.getGraphicArray();
  var showGraphic = terraingraphics[0];
  if (typeof localacre.getTerrain().setBySurround === "function") {
 	  var graphics = localacre.getTerrain().setBySurround(x,y,amap,terraingraphics,0,0,0);
    showGraphic = graphics[0];
  }
  if (typeof localacre.getTerrain().doTile === "function") {
    showGraphic = localacre.getTerrain().doTile(x,y,showGraphic);
  }
  $(tdtileid).css("background-image", "url('graphics/" + showGraphic + "')");
  $(tdtileid).css("background-position", terraingraphics[2] + "px " + terraingraphics[3] + "px");
  document.images[tileid].src = "graphics/"+terraingraphics[1];
  drawFeatures();

  
//	delete amap.data[y][x].features;
//        amap.data[y][x].features = new Collection;
//	var featureshere = amap.features.getAt(x,y);
//	for (i in featureshere) {
//	  amap.features.deleteFrom(featureshere[i]);
//	}
//        var tileid = "tile" + x + "x" + y;
//        var tdid = "#td_" + tileid;
//        var localacre = amap.getTile(x,y);
//        var terraingraphics = localacre.getTerrain().getGraphicArray();
//        var showGraphic = terraingraphics[0];
//        if (typeof localacre.getTerrain().setBySurround == "function") {
//       	  graphics = localacre.getTerrain().setBySurround(x,y,amap,graphics,0,0,0);
//       	  showGraphic = graphics[0];
//        }
//        if (typeof localacre.getTerrain().doTile == "function") {
//        	showGraphic = localacre.getTerrain().doTile(x,y,showGraphic);
//        }
//        $(tdid).css("background-image","url('graphics/" + showGraphic + "')");
//        $(tdid).css("background-position", terraingraphics[2] + "px " + terraingraphics[3] + "px");
//        document.images[tileid].src = "graphics/"+terraingraphics[1];
}

function initialSelect() {
  changeselection('Ocean');
// 	displayval='all';
 	drawFeatures();
// 	document.editlayer.layer[2].checked = true;

}

function getManual() {
  var thingname = prompt("Select what?");
  if (thingname) {
    var thing = localFactory.createTile(thingname);
    if (thing) {
      changeselection(thingname);
    }
  }
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
var lowlvlblock = document.getElementById("lowlvldiv");
var highlvlblock = document.getElementById("highlvldiv");
var seablock = document.getElementById("seadiv");

  if (divname === "outdoor") {
    outdoorblock.style.display="block";
  }
  else { outdoorblock.style.display="none"; }
  
  if (divname === "indoor") {
    indoorblock.style.display="block";
  }
  else { indoorblock.style.display="none"; }
  
  if (divname === "features") {
    featureblock.style.display="block";
  }
  else { featureblock.style.display="none"; }
  
  if (divname === "creatures") {
    creatureblock.style.display="block";
  }
  else { creatureblock.style.display="none"; }

  if (divname === "lowlvl") {
    lowlvlblock.style.display="block";
  } 
  else { lowlvlblock.style.display="none"; }
  
  if (divname === "highlvl") {
    highlvlblock.style.display="block";
  } 
  else { highlvlblock.style.display="none"; }

  if (divname === "sea") {
    seablock.style.display="block";
  } 
  else {seablock.style.display="none"; }
  
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
  document.detailseditpopup.mapscale.value = amap.getScale();
  var maplist = amap.getLinkedMaps();
  if (maplist) {
    document.detailseditpopup.maplinkedmaps.value = maplist.join();
  }
  else { document.detailseditpopup.maplinkedmaps.value = ""; }
  document.detailseditpopup.mapseebelow.value = amap.getSeeBelow();
  document.detailseditpopup.maplightlevel.value = amap.getLightLevel();
  document.detailseditpopup.mapalwaysremember.value = amap.getAlwaysRemember();
  document.detailseditpopup.maponenterscript.value = amap.getEnterScript();
  document.detailseditpopup.maponexitscript.value = amap.getExitScript();
  document.detailseditpopup.maponentertest.value = amap.getEnterTestScript();
  document.detailseditpopup.maponexittest.value = amap.getExitTestScript();
  document.detailseditpopup.mapunderground.value = amap.getUnderground();
  document.detailseditpopup.mapsavename.value = amap.getSaveName();
  document.detailseditpopup.mapreturnmap.value = amap.getReturnMap();
  document.detailseditpopup.mapreturnx.value = amap.getReturnx();
  document.detailseditpopup.mapreturny.value = amap.getReturny();
  if (amap.getReturnInfused()) {
    document.detailseditpopup.mapreturninfused.checked = true;
  } else {
    document.detailseditpopup.mapreturninfused.checked = false;
  }
}

function submitEditDetails(change) {
	if (change === 1) {
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
    amap.setUnderground(document.detailseditpopup.mapunderground.value);
    amap.setSaveName(document.detailseditpopup.mapsavename.value);
    amap.setLightLevel(document.detailseditpopup.maplightlevel.value);
    amap.setAlwaysRemember(document.detailseditpopup.mapalwaysremember.value);
    amap.setScale(document.detailseditpopup.mapscale.value);
    amap.setEnterScript(document.detailseditpopup.maponenterscript.value);
    amap.setExitScript(document.detailseditpopup.maponexitscript.value);
    amap.setEnterTestScript(document.detailseditpopup.maponentertest.value);
    amap.setExitTestScript(document.detailseditpopup.maponexittest.value);
    amap.setReturn(document.detailseditpopup.mapreturnmap.value, document.detailseditpopup.mapreturnx.value, document.detailseditpopup.mapreturny.value);
    if (document.detailseditpopup.mapreturninfused.checked == true) {
      amap.setReturnInfused(1);
    } else {
      amap.setReturnInfused(0);
    }
	}
}

function DrawRectangle(xval,yval) {
  if (cornerx > xval) {
    var xx=xval;
    xval=cornerx;
    cornerx=xx;
  }
  if (cornery > yval) {
    var yy=yval;
    yval=cornery;
    cornery=yy;
  }
  for (var x=cornerx;x<=xval;x++) {
    for (var y=cornery;y<=yval;y++) {
      if (selectionval.checkType("Terrain")) {
        changemaptile(x,y);
      }
      else if (selectionval.checkType("Feature")) {
        if (selectionval.getName() === "Eraser") { erasefeature(x,y); }
        else { addfeaturetomap(x,y,selectionval); }
      }
      else if (selectionval.checkType("npc")) {
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

function MakeCopy(xval,yval) {
  var minx = Math.min(xval,cornerx);
  var maxx = Math.max(xval,cornerx);
  var miny = Math.min(yval,cornery);
  var maxy = Math.max(yval,cornery);
  var copyterrain = [];
  var copyfeatures = {};
  var copynpcs = {};
  var curridx = 0;
  for (var i=miny; i<=maxy; i++) {
    copyterrain[curridx] = "";
    for (var j=minx; j<=maxx; j++) {
      if (j !== minx) { copyterrain[curridx] = copyterrain[curridx] + " "; }
      copyterrain[curridx] = copyterrain[curridx] + "" + amap.getTile(j,i).getTerrain().serialize(); 
    }
    curridx++;
  }

  var mapfeatures = amap.features.getAll();
  $.each(mapfeatures, function(feaidx, feaval) {
    if (!feaval.nosave) {
      if ((feaval.getx() >= minx) && (feaval.getx() <= maxx) && (feaval.gety() >= miny) && (feaval.gety() <= maxy)) {
 	      var copies = feaval.copy();
        $.each(copies, function(copidx, copval) {
          copval.x = copval.x-minx;
          copval.y = copval.y-miny;
          copyfeatures[copval.serial] = copval;
        });
      }
    }
  });
	  
	var mapnpcs = amap.npcs.getAll();
  $.each(mapnpcs, function (npcidx, npcval) {
    if (!npcval.nosave) {
      if ((npcval.getx() >= minx) && (npcval.getx() <= maxx) && (npcval.gety() >= miny) && (npcval.gety() <= maxy)) {
        var copies = npcval.copy();
//        $.each(copies, function(copidx, copval) {
//          copval.x = copval.x-minx;
//          copval.y = copval.y-miny;          
//          copynpcs[copval.serial] = copval;       
//        });
        copies[0].x = copies[0].x-minx;
        copies[0].y = copies[0].y-miny;
        copynpcs[copies[0].serial] = copies[0];
      }
    }
	    
  });

  var saveobj = {};
  saveobj.terrain = copyterrain;
  saveobj.features = copyfeatures;
  saveobj.npcs = copynpcs;
  saveobj.width = maxx - minx +1;
  saveobj.height = maxy - miny +1;

  var serialized = JSON.stringify(saveobj);
  localStorage["editorCopy"] = serialized;
  
}

function PasteCopy(startx,starty) {
  if (localStorage["editorCopy"]) {
    var saveobj = JSON.parse(localStorage["editorCopy"]);
    var savewidth = saveobj.width;
    var saveheight = saveobj.height;
    var endx = Math.min(amap.getWidth()-1, startx+savewidth-1);
    var endy = Math.min(amap.getHeight()-1, starty+saveheight-1);
    RazeArea(startx,endx, starty, endy);
    for (var j = starty; j<= endy; j++) {
      var thisRow = saveobj.terrain[j-starty];
      var terrainRow = thisRow.split(" ");
      for (var i = startx; i<= endx; i++) {
        var thisTerrain = localatlas.key[terrainRow[i-startx]];
        var newTerrain = localFactory.createTile(thisTerrain);
        changemaptile(i,j,newTerrain);
      }
    }
    $.each(saveobj.features, function(idx,val) {
      var copyOfFeature = localFactory.createTile(val.name);
      $.each(val, function(svidx, svval) {
        copyOfFeature[svidx] = svval;
      });
      copyOfFeature.x = copyOfFeature.x + startx;
      copyOfFeature.y = copyOfFeature.y + starty;
      addfeaturetomap(copyOfFeature.x,copyOfFeature.y,copyOfFeature,1);
    });
    $.each(saveobj.npcs, function(idx,val) {
      var copyOfNPC = localFactory.createTile(val.name);
      $.each(val, function(svidx, svval) {
        copyOfNPC[svidx] = svval;
      });
      copyOfNPC.x = copyOfNPC.x + startx;
      copyOfNPC.y = copyOfNPC.y + starty;
      addnpctomap(copyOfNPC.x, copyOfNPC.y, copyOfNPC, 1);
    });
   
  }
}

function RazeArea(startx,endx,starty,endy) {
  for (var j = starty; j<= endy; j++) {
    for (var i = startx; i<= endx; i++) {
      var localacre = amap.getTile(i,j);
      var acreFeatures= localacre.features.getAll();
      if (acreFeatures.length) {
        for (var k=0; k<acreFeatures.length; k++) {
          amap.deleteThing(acreFeatures[k]);
        }
      }
      var acrenpcs = localacre.npcs.getAll();
      if (acrenpcs.length) {
        for (var k=0; k<acrenpcs.length; k++) {
          amap.deleteThing(acrenpcs[k]);
        }
      }
    }
  }
  drawMap();
}

function ToggleLabels() {
  if (workInLayers) {
    workInLayers = 0;
    $(".labelsLayer").css("display","none");
    // hide all the labels
  } else {
    workInLayers = 1;
    // show all the labels
    $(".labelsLayer").css("display","inline");
  }
}

function DeleteLabel(labelid) {
  $("#"+labelid).remove();
  delete amap.allLabels[labelid];
}
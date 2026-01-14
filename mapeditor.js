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
debug = 0;
var togglehide = 0;
var targetCursor = {};
var workInLayers = 0;
var maps = new MapMemory();

var brushdown = 0;
var brushdownx = -1;
var brushdowny = -1;
let flowing = 0;
var editable;
var editnpcs;
let transselect = 0;
let transx, transy;

var browserheight;
var losgrid = new LOSMatrix(13);
var DUTime = new Timeline(0);
//var mode = "editor";
var PC = new PCObject();
var DU = {};
DU.DUTime = DUTime;
gamestate = new GameStateData();
gamestate.setMode("editor");
var DULoot = SetLoots();            //
var DULootGroups = SetLootGroups(); //  see loot.js and lootset.js for population
var DUTraps = SetTraps();           //
var Dice = new DiceObject();
var localatlas = new Atlas();
PopulateAtlas(localatlas);

var graphicpicks = [];
let humanpicks = {};
var optindex = 0;
let fillselect;

DU.gameflags = new Gameflags();  // empty games flags because atlas will look for it
DU.gameflags.setFlag("editor", 1);  // for atlas to look for

$(document).ready(function() {
  browserheight = $(window).height();
  set_schedules();
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
    changes = 0; 
  }
	if (mapname !== "test") { 
		mapname = document.menuinterface.mapnameslist.value;
	}
  $("div.mapscreen").html(`		<div style="position:absolute;z-index:0" id="bottommap"></div>
    <div style="position:absolute;z-index:1" id="topmap"></div>`);
	amap = maps.addMap(mapname);
  drawMap();
  changes = 0;
}

function drawMap() {
  $("div.mapscreen").html(`<div style="position:absolute;z-index:1" id="topmap"></div>`);
  if (amap.data.length) {
    let maintable = "<table id='mainview' border='0' cellspacing='0' cellpadding='0'>";
    for (let j = 0; j<amap.data.length; j++) {
      maintable += "<tr>";
      for (let i = 0; i< amap.data[0].length; i++) {
        maintable += "<td id='mainview_"+i+"x"+j+"' style='position:relative;width:32;height:32' onMouseDown='brushdown=1;brushdownx="+i+";brushdowny="+j+";clickmap("+i+","+j+");return(false);' onMouseOver='enterTile("+i+","+j+");' alt='"+i+","+j+"' title='"+i+","+j+"'><img src='graphics/spacer.gif' width='32' height='32' />";
        maintable += CreateTileHTML(i,j);
        maintable += "</td>";
      }
      maintable += "</tr>";
    }
    maintable += "</table>";
    document.getElementById("topmap").innerHTML = maintable;

    $.each(amap.allLabels, function(idx,val) {
      var rect = {};
      var labelcoords = idx.replace('div_tile','');
      var labelarray = labelcoords.split('x');
      rect.left = labelarray[0]*32+3;
      rect.top = labelarray[1]*32+3;
      $("div.mapscreen").append('<div id="'+idx+'" style="position:absolute;left:'+rect.left+';top:'+rect.top+'" class="labelsLayer" onClick="DeleteLabel(\''+idx+'\')">&nbsp;'+val+'&nbsp;</div>');

    });
    workInLayers = 0;
    $(".labelsLayer").css("display","none");

    $("div.mapscreen").css("height", browserheight-130);
    $("div.tiles").css("height", browserheight-100);
    $().ready(function() { $('#featurebubble').jqm({modal : true}) });

  }
}

function RedrawTile(x,y) {
  let mainview = document.getElementById(`mainview_${x}x${y}`);
  if (mainview) {
    mainview.innerHTML = CreateTileHTML(x,y);
  }
}

function CreateTileHTML(x,y) {
  let fea = 1;
  if (document.getElementById("showfeatures").checked) { fea = 0; }
  let npcs = 1;
  if (document.getElementById("shownpcs").checked) { npcs = 0; }
  let thiscell;
  [thiscell] = GetDisplayStack(amap,x,y,x,y,0,0,fea,npcs,1);
  let tilehtml = "";
  for (let k=0;k<thiscell.length;k++) {
    let newdiv = `<div style="position:absolute; top:0px; left:0px; background-image: url('graphics/${thiscell[k].showGraphic}'); background-repeat:no-repeat; background-position: ${thiscell[k].graphics2}px ${thiscell[k].graphics3}px">
    <img id='tile${x}x${y}' src='graphics/${thiscell[k].graphics1}' border='0' width='32' height='32' title='${x}x${y}' alt='${x}x${y}' /></div>`;
    tilehtml += newdiv;
  }
  return tilehtml;
}

function drawMap2() {
  // Deprecated version
  if (amap.data.length) {
    
    // create map tables
    var terraintable = "<table id='mainterrainview' border='0' cellspacing='0' cellpadding='0'>";
    var maintable = "<table id='mainview' border='0' cellspacing='0' cellpadding='0'>";
    for (var j = 0; j<amap.data.length; j++) {
      terraintable += "<tr>";
      maintable += "<tr>";
      for (var i = 0; i< amap.data[0].length; i++) {
        terraintable += "<td id='terrain_"+i+"x"+j+"'><img src='graphics/spacer.gif' width='32' height='32' /></td>";
        maintable += "<td id='mainview_"+i+"x"+j+"' style='position:relative' onMouseDown='brushdown=1;brushdownx="+i+";brushdowny="+j+";clickmap("+i+","+j+");return(false);' onMouseOver='enterTile("+i+","+j+");' alt='"+i+","+j+"' title='"+i+","+j+"'><img src='graphics/spacer.gif' width='32' height='32' /></td>";
      }
      terraintable += "</tr>";
      maintable += "</tr>";
    }
    terraintable += "</table>";
    maintable += "</table>";

    $("#bottommap").html(terraintable);
    $("#topmap").html(maintable);

    for (var i=0;i<=amap.data.length-1;i++) {
      for (var j=0;j<=amap.data[0].length-1;j++) {
        var thiscell = getDisplayCell(amap,j,i,j,i);
        var yidx = i;
        var xidx = j;
        if (thiscell.terrain) {
          $("#mainview_"+xidx+"x"+yidx).html("<img id='tile"+j+"x"+i+"' src='graphics/spacer.gif' border='0' alt='tile"+j+"x"+i+"' width='32' height='32' />");
          $("#mainview_"+xidx+"x"+yidx).css("background-image", "url('graphics/spacer.gif')");
          $("#mainview_"+xidx+"x"+yidx).css("background-repeat", "no-repeat");
          $("#mainview_"+xidx+"x"+yidx).css("background-position", "0px 0px");
        }
                   
        var terr = GetDisplayTerrain(amap,j,i,j,i,0);
        $("#terrain_"+xidx+"x"+yidx).html("<img id='terr_tile"+j+"x"+i+"' src='graphics/"+terr.graphics1+"' border='0' alt='tile"+j+"x"+i+" los: " + thiscell.losresult + " light:" + thiscell.lighthere + "' width='32' height='32' title='" + terr.desc + "' />");
        $("#terrain_"+xidx+"x"+yidx).css("background-image", "url('graphics/" + terr.showGraphic + "')");
        $("#terrain_"+xidx+"x"+yidx).css("background-repeat", "no-repeat");
        $("#terrain_"+xidx+"x"+yidx).css("background-position", terr.graphics2 + "px " + terr.graphics3 + "px");
     
      }
    }
 

    $.each(amap.allLabels, function(idx,val) {
      var rect = {};
      var labelcoords = idx.replace('div_tile','');
      var labelarray = labelcoords.split('x');
      rect.left = labelarray[0]*32+3;
      rect.top = labelarray[1]*32+3;
      $("div.mapscreen").append('<div id="'+idx+'" style="position:absolute;left:'+rect.left+';top:'+rect.top+'" class="labelsLayer" onClick="DeleteLabel(\''+idx+'\')">&nbsp;'+val+'&nbsp;</div>');

    });
    workInLayers = 0;
    $(".labelsLayer").css("display","none");

    $("div.mapscreen").css("height", browserheight-130);
    $("div.tiles").css("height", browserheight-100);
    drawFeatures();
    $().ready(function() { $('#featurebubble').jqm({modal : true}) });
  }
}

function enterTile(x,y) {
	if ((document.brushes.elements[0].checked) && (brushdown === 1) && ((brushdownx !== x) || (brushdowny !== y))) {
    brushdownx = -1;
    brushdowny = -1;
		clickmap(x,y);
	}
}

function drawFeatures() {
	if (document.editlayer.showfeatures.checked) {
  	var allfeatures = amap.features.getAll();
    for (var i=0;i<=allfeatures.length-1;i++) {
      if ((allfeatures[i].invisible) && (!document.editlayer.showinvis.checked)) { continue; }
      var tileid = "tile" + allfeatures[i].getx() + "x" + allfeatures[i].gety();
      var tdid = "#mainview_" + allfeatures[i].getx() + "x" + allfeatures[i].gety();
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
//      document.images[tileid].src="graphics/"+graphics[1];
      $(tdid).html("<img src='graphics/"+graphics[1]+"' width='32' height='32' alt='"+allfeatures[i].getx()+"x"+allfeatures[i].gety()+"' />");
    }
  }
  else {
    var allfeatures = amap.features.getAll();
    for (var i=0;i<=allfeatures.length-1;i++) {
      var tileid = "tile" + allfeatures[i].getx() + "x" + allfeatures[i].gety();
      var tdid = "#mainview_" + allfeatures[i].getx() + "x" + allfeatures[i].gety();

      $(tdid).css("background-image", "");
      $(tdid).css("background-position", "");
      $(tdid).html("<img src='graphics/spacer.gif' width='32' height='32' alt='"+allfeatures[i].getx()+"x"+allfeatures[i].gety()+"' />");
    }
  }
  if (document.editlayer.shownpcs.checked) {
    	var allnpcs = amap.npcs.getAll();
 	    for (var i=0;i<=allnpcs.length-1;i++) {
 	      if ((allnpcs[i].invisible) && (!document.editlayer.showinvis.checked)) { continue; }
        var tileid = "tile" + allnpcs[i].getx() + "x" + allnpcs[i].gety();
        var tdid = "#mainview_" + allnpcs[i].getx() + "x" + allnpcs[i].gety();
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
      	$(tdid).html("<img src='graphics/"+graphics[1]+"' width='32' height='32' alt='"+allnpcs[i].getx()+"x"+allnpcs[i].gety()+"' />");
      }
  }
  else {
    if (!document.editlayer.showfeatures.checked) {
      var allnpcs = amap.npcs.getAll();
      for (var i=0;i<=allnpcs.length-1;i++) {
        var tileid = "tile" + allnpcs[i].getx() + "x" + allnpcs[i].gety();
        var tdid = "#mainview_" + allnpcs[i].getx() + "x" + allnpcs[i].gety();
        $(tdid).css("background-image", "");
        $(tdid).css("background-position", "");
        $(tdid).html("<img src='graphics/spacer.gif' width='32' height='32' alt='"+allnpcs[i].getx()+"x"+allnpcs[i].gety()+"' />");
      }
    }
  } 	
}


function changeselection(tilename) {
  selectionval = localFactory.createTile(tilename);
  selectionval.setName(tilename);  // to allow for my way of making locked doors/etc
  var graphics = selectionval.getGraphicArray();
  $('#td_selectionimg').css("background-image", "url('graphics/" + graphics[0] + "')");
  $('#td_selectionimg').css("background-position", graphics[2] + "px " + graphics[3] + "px");
  if (selectionval.layers) {
    let content = `<div style="background-image: url('graphics/${selectionval.layers[0][0]}'); background-position: ${selectionval.layers[0][2]}px ${selectionval.layers[0][3]}px; width:32; height:32"><img src="graphics/spacer.gif" width='32' height='32' /></div>`;
    document.getElementById("td_selectionimg").innerHTML = content;
  }
}

function clickmap(xval,yval) {
  changes = 1;
  var x=0;
  var y=0;
  if (workInLayers) {
    var square = document.getElementById("mainview_"+xval+"x"+yval);
    var rect = {};
    rect.left = xval*32+3;
    rect.top = yval*32+3;
    brushdown = 0;
    var mytext = prompt("Label:");
    if (mytext) {
      var divtileid = "div_tile"+xval+"x"+yval;
      $("div.mapscreen").append('<div id="'+divtileid+'" style="position:absolute;left:'+rect.left+';top:'+rect.top+'" class="labelsLayer" onClick="DeleteLabel(\''+divtileid+'\')">&nbsp;'+mytext+'&nbsp;</div>');
      amap.allLabels[divtileid] = mytext;
    }
  } else if (flowing) {
    let acre = amap.getTile(xval,yval);
    let fl = acre.getFlow();
    let fdiv = document.getElementById(`flowview_${xval}x${yval}`);
    if (fdiv) { fdiv.parentNode.removeChild(fdiv); }
    if (fl === "n") { fl = "e"; }
    else if (fl === "e") { fl = "s"; }
    else if (fl === "s") { fl = "w"; }
    else if (fl === "w") { fl = ""; }
    else { fl = "n"; }
    acre.setFlow(fl);

    if (fl) {
      let box = document.getElementById(`mainview_${xval}x${yval}`);
      let sx = 0;
      let sy = 0;
      if (fl === "n") { sx = -16; }
      if (fl === "e") { sx = -32; sy = -16; }
      if (fl === "w") { sy = -16; }
      if (fl === "s") { sx = -16; sy = -32; }

      let div = `<div id='flowview_${xval}x${yval}' style="position:absolute; left: 8px; top: 8px; background-image:url('graphics/frame/arrows.gif'); background-repeat:no-repeat; background-position: ${sx}px ${sy}px"><img src="graphics/spacer.gif" width="16" height="16" /></div>`;
      box.innerHTML += div;
    }
  }
  else if (document.brushes.elements[0].checked) {   // point
  	if (selectionval.checkType("Terrain")) {
      changemaptile(xval,yval);
    }
    else if (selectionval.getName() === "Eraser") { erasefeature(xval,yval); }
    else if (selectionval.checkType("Feature")) {
      if (document.replaceft.elements[0].checked) { erasefeature(xval,yval); }
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
      document.npceditpopup.npcskintone.value = editnpcs.skintone;
      document.npceditpopup.npcstr.value = editnpcs.getStr();
      document.npceditpopup.npcattitude.value = editnpcs.getAttitude();
      document.npceditpopup.npcdex.value = editnpcs.getDex();
      document.npceditpopup.npcpeaceai.value = editnpcs.getPeaceAI();
      document.npceditpopup.npcint.value = editnpcs.getInt();
      document.npceditpopup.npcpcthreatai.value = editnpcs.getPCThreatAI();      
      document.npceditpopup.npcconvo.value = editnpcs.getConversation();
      document.npceditpopup.npcschedule.value = editnpcs.getSchedule();
      document.npceditpopup.npcconvflag.value = editnpcs.getConversationFlag();
      document.npceditpopup.npcgender.value = editnpcs.getGender();
      document.npceditpopup.npcmerch.value = editnpcs.getMerch();
      document.npceditpopup.npcleash.value = editnpcs.getLeash();
      document.npceditpopup.npcprefix.value = editnpcs.getPrefix();
      document.npceditpopup.npcnpcband.value = editnpcs.getNPCBand();
      
      // this will get overwritten if it's a human
      if (!editnpcs.checkType("human")) {
        graphicpicks = [];
        optindex=0;
        let tmpdude = localFactory.createTile(editnpcs.getName());
        let picksblock = "<table><tr><td style='background-color:777777; border:inset' id='opt1' onClick='selectGraphic(1,\"" + tmpdude.getGraphic() + "\")' >";
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
      
      // New human parts picker
      else {
        let humanpartshtml = "<table><tr><td id='humandisplay' colspan='2' width='32' height='32' style='position:relative'>";
        let xpos = 0;
        let ypos = -104*32;
        let hsrc = "humanparts.png";
        if (editnpcs.wornlayers.back) {
          xpos = HumanParts[editnpcs.wornlayers.back].spritex + editnpcs.wornlayernudges.back.x;
          ypos = HumanParts[editnpcs.wornlayers.back].spritey + editnpcs.wornlayernudges.back.y;
          hsrc = HumanParts[editnpcs.wornlayers.back].src;
        }
        humanpartshtml += `<div id='humanback' style='position:absolute;left:0;top:0;background-image:url("graphics/${hsrc}");background-position: ${xpos}px ${ypos}px;width:32px;height:32px'></div>`;

        xpos = 0;
        ypos = -104*32;
        hsrc = "humanparts.png";
        if (editnpcs.wornlayers.cloak) {
          xpos = HumanParts[editnpcs.wornlayers.cloak].spritex + editnpcs.wornlayernudges.cloak.x;
          ypos = HumanParts[editnpcs.wornlayers.cloak].spritey + editnpcs.wornlayernudges.cloak.y;
          hsrc = HumanParts[editnpcs.wornlayers.cloak].src;
        }
        humanpartshtml += `<div id='humancloak' style='position:absolute;left:0;top:0;background-image:url("graphics/${hsrc}");background-position: ${xpos}px ${ypos}px;width:32px;height:32px'></div>`;

        xpos = 0;
        ypos = -104*32;
        hsrc = "humanparts.png";
        if (editnpcs.wornlayers.body) {
          xpos = HumanParts[editnpcs.wornlayers.body].spritex + editnpcs.wornlayernudges.body.x;
          ypos = HumanParts[editnpcs.wornlayers.body].spritey + editnpcs.wornlayernudges.body.y;
          hsrc = HumanParts[editnpcs.wornlayers.body].src;
        }
        humanpartshtml += `<div id='humanbody' style='position:absolute;left:0;top:0;background-image:url("graphics/${hsrc}");background-position: ${xpos}px ${ypos}px;width:32px;height:32px'></div>`;

        xpos = 0;
        ypos = -104*32;
        hsrc = "humanparts.png";
        if (editnpcs.wornlayers.head) {
          xpos = HumanParts[editnpcs.wornlayers.head].spritex + editnpcs.wornlayernudges.head.x;
          ypos = HumanParts[editnpcs.wornlayers.head].spritey + editnpcs.wornlayernudges.head.y;
          hsrc = HumanParts[editnpcs.wornlayers.head].src;
        }
        humanpartshtml += `<div id='humanhead' style='position:absolute;left:0;top:0;background-image:url("graphics/${hsrc}");background-position: ${xpos}px ${ypos}px;width:32px;height:32px'></div>`;

        xpos = 0;
        ypos = -104*32;
        hsrc = "humanparts.png";
        if (editnpcs.wornlayers.mainhand) {
          xpos = HumanParts[editnpcs.wornlayers.mainhand].spritex + editnpcs.wornlayernudges.mainhand.x;
          ypos = HumanParts[editnpcs.wornlayers.mainhand].spritey + editnpcs.wornlayernudges.mainhand.y;
          hsrc = HumanParts[editnpcs.wornlayers.mainhand].src;
        }
        humanpartshtml += `<div id='humanmainhand' style='position:absolute;left:0;top:0;background-image:url("graphics/${hsrc}");background-position: ${xpos}px ${ypos}px;width:32px;height:32px'></div>`;

        xpos = 0;
        ypos = -104*32;
        hsrc = "humanparts.png";
        if (editnpcs.wornlayers.offhand) {
          xpos = HumanParts[editnpcs.wornlayers.offhand].spritex + editnpcs.wornlayernudges.offhand.x;
          ypos = HumanParts[editnpcs.wornlayers.offhand].spritey + editnpcs.wornlayernudges.offhand.y;
          hsrc = HumanParts[editnpcs.wornlayers.offhand].src;
        }
        humanpartshtml += `<div id='humanoffhand' style='position:absolute;left:0;top:0;background-image:url("graphics/${hsrc}");background-position: ${xpos}px ${ypos}px;width:32px;height:32px'></div>`;

        humanpartshtml += "</td></tr>";
        let bits = Object.keys(HumanParts);
        let seloptions = { body: "", back: "", cloak: "", head: "", mainhand: "", offhand: "" };
        for (let i=0;i<bits.length;i++) {
          let selected = "";
          if (editnpcs.wornlayers[HumanParts[bits[i]].type] === bits[i]) { selected = " SELECTED "; }
          seloptions[HumanParts[bits[i]].type] += `<option value='${bits[i]}' ${selected}>${bits[i]}</option>`;
        }
        let bedoptions = "";
        bits = Object.keys(HumanPartsBed);
        for (let i=0;i<bits.length;i++) {
          let selected = "";
          if (editnpcs.wornlayers["realhead"] === bits[i]) { selected = " SELECTED "; }
          bedoptions += `<option value='${bits[i]}' ${selected}>${bits[i]}</option>`;
        }

        humanpartshtml += "<tr><td>Body: <select name='bodysel' id='bodysel' onChange='ChangeHumanDisplay(\"body\")'><option value=''></option>";
        humanpartshtml += seloptions.body;
        humanpartshtml += `</select></td><td>x: <input type='text' name='bodyxn' id='bodyxn' value='${editnpcs.wornlayernudges.body.x}' size='2' onChange='ChangeHumanDisplay(\"body\")' /> y: <input type='text' name='bodyyn' id='bodyyn' value='${editnpcs.wornlayernudges.body.y}' size='2' onChange='ChangeHumanDisplay(\"body\")' /> </td></tr>`;

        humanpartshtml += "<tr><td>Back: <select name='backsel' id='backsel' onChange='ChangeHumanDisplay(\"back\")'><option value=''></option>";
        humanpartshtml += seloptions.back;
        humanpartshtml += `</select></td><td>x: <input type='text' name='backxn' id='backxn' value='${editnpcs.wornlayernudges.back.x}' size='2' onChange='ChangeHumanDisplay(\"back\")' /> y: <input type='text' name='backyn' id='backyn' value='${editnpcs.wornlayernudges.back.y}' size='2' onChange='ChangeHumanDisplay(\"back\")' /> </td></tr>`;

        humanpartshtml += "<tr><td>Cloak: <select name='cloaksel' id='cloaksel' onChange='ChangeHumanDisplay(\"cloak\")'><option value=''></option>";
        humanpartshtml += seloptions.cloak;
        humanpartshtml += `</select></td><td>x: <input type='text' name='cloakxn' id='cloakxn' value='${editnpcs.wornlayernudges.cloak.x}' size='2' onChange='ChangeHumanDisplay(\"cloak\")' /> y: <input type='text' name='cloakyn' id='cloakyn' value='${editnpcs.wornlayernudges.cloak.y}' size='2' onChange='ChangeHumanDisplay(\"cloak\")' /> </td></tr>`;

        humanpartshtml += "<tr><td>Head: <select name='headsel' id='headsel' onChange='ChangeHumanDisplay(\"head\")'><option value=''></option>";
        humanpartshtml += seloptions.head;
        humanpartshtml += `</select></td><td>x: <input type='text' name='headxn' id='headxn' value='${editnpcs.wornlayernudges.head.x}' size='2' onChange='ChangeHumanDisplay(\"head\")' /> y: <input type='text' name='headyn' id='headyn' value='${editnpcs.wornlayernudges.head.y}' size='2' onChange='ChangeHumanDisplay(\"head\")' /> </td></tr>`;

        humanpartshtml += "<tr><td>Main Hand: <select name='mainhandsel' id='mainhandsel' onChange='ChangeHumanDisplay(\"mainhand\")'><option value=''></option>";
        humanpartshtml += seloptions.mainhand;
        humanpartshtml += `</select></td><td>x: <input type='text' name='mainhandxn' id='mainhandxn' value='${editnpcs.wornlayernudges.mainhand.x}' size='2' onChange='ChangeHumanDisplay(\"mainhand\")' /> y: <input type='text' name='mainhandyn' id='mainhandyn' value='${editnpcs.wornlayernudges.mainhand.y}' size='2' onChange='ChangeHumanDisplay(\"mainhand\")' /> </td></tr>`;

        humanpartshtml += "<tr><td>Off Hand: <select name='offhandsel' id='offhandsel' onChange='ChangeHumanDisplay(\"offhand\")'><option value=''></option>";
        humanpartshtml += seloptions.offhand;
        humanpartshtml += `</select></td><td>x: <input type='text' name='offhandxn' id='offhandxn' value='${editnpcs.wornlayernudges.offhand.x}' size='2' onChange='ChangeHumanDisplay(\"offhand\")' /> y: <input type='text' name='offhandyn' id='offhandyn' value='${editnpcs.wornlayernudges.offhand.y}' size='2' onChange='ChangeHumanDisplay(\"offhand\")' /> </td></tr>`;

        humanpartshtml += "<tr><td colspan='3'>Real Head: <select name='realheadsel' id='realheadsel''><option value=''></option>";
        humanpartshtml += bedoptions;
        humanpartshtml += `</select></td></tr>`;

        humanpartshtml += "</table>";
        humanpartshtml += "<input type='button' value='Clear Override Graphic' onClick='delete editnpcs.overrideGraphic' />";
        $("#pickgraphics").html(humanpartshtml);
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
  	  $('#featurecoordstd').text(editable.getName() + "; x: " + editable.getx() + ", y: " + editable.gety());
      document.featureeditpopup.tileprefix.value = editable.getPrefix();
      document.featureeditpopup.tiledesc.value = editable.getDesc();
      document.featureeditpopup.walkonscript.value = editable.getWalkOnScript();
      document.featureeditpopup.usescript.value = editable.getUseScript();
      if (editable.getLocked && (typeof editable.getLocked === "function")) {
      	var lockedblock = document.getElementById("bubblelock");
    	  lockedblock.style.display = "table-row";
      	document.featureeditpopup.tilelocked.value = editable.getLocked();
        if (editable.keyname) { document.featureeditpopup.tilekeyname.value = editable.keyname; }
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
  } else if (document.brushes.elements[3].checked) {   // fill bucket
    if (selectionval.checkType("terrain")) {
      fillselect = amap.getTile(xval,yval).getTerrain();
      if (fillselect.getName() !== selectionval.getName()) {
        FillMap(xval,yval);
      }
    } // else, don't do anything- can't fill with features/npcs
  } else if (document.brushes.elements[4].checked) {   // raze
    if (cornerx === -1) {
      cornerx = xval;
      cornery = yval;
    }
    else {
      RazeArea(Math.min(cornerx, xval), Math.max(cornerx, xval), Math.min(cornery, yval), Math.max(cornery, yval));
      cornerx = -1;
      cornery = -1;
    }
  } else if (document.brushes.elements[5].checked) {   // copy
    if (cornerx === -1) {
      cornerx = xval;
      cornery = yval;
    }
    else {
      MakeCopy(xval,yval);
      alert("Copy made.");
      cornerx = -1;
      cornery = -1;
//      document.brushes.elements[7].checked = true; 
    }
  } else if (document.brushes.elements[6].checked) { // PASTE
    PasteCopy(xval,yval);
    cornerx = -1;
    cornery = -1;
//    document.brushes.elements[7].checked = true; 
// what the heck were these for?
  } else if (document.brushes.elements[7].checked) { // Transition picker
    TransitionTile(xval,yval);
  }
}

function FillMap(xval,yval) {
  let tile = amap.getTile(xval,yval);
  if (tile === "OoB") { return; }
  if (tile.getTerrain().getName() === fillselect.getName()) { 
    changemaptile(xval,yval);
    FillMap(xval-1,yval);
    FillMap(xval+1,yval);
    FillMap(xval,yval-1);
    FillMap(xval,yval+1);  
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
		if (document.featureeditpopup.tileprefix.value !== editable.getPrefix()) {
			editable.setPrefix(document.featureeditpopup.tileprefix.value);
		}    
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
		if ((document.featureeditpopup.tilekeyname.value) && (editable.getLocked != null) && (document.featureeditpopup.tilekeyname.value !== editable.keyname)) {
			editable.keyname = document.featureeditpopup.tilekeyname.value;
		}
		if ((document.featureeditpopup.tileentermap.value) && (editable.getEnterMap != null) && (document.featureeditpopup.tileentermap.value !== editable.getEnterMap().entermap)) {
			editable.setEnterMap(document.featureeditpopup.tileentermap.value, document.featureeditpopup.tileenterx.value, document.featureeditpopup.tileentery.value);
		}
		if ((document.featureeditpopup.lootgroup.value) && (editable.isContainer) && (document.featureeditpopup.lootgroup.value != editable.getLootgroup())) {
		  editable.setLootgroup(document.featureeditpopup.lootgroup.value);
		}
		if ((document.featureeditpopup.karmapenalty.value) && (editable.isContainer) && (document.featureeditpopup.karmapenalty.value != editable.getKarmaPenalty())) {
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
//    var tileid = "tile" + editable.getx() + "x" + editable.gety();
    var tdtileid = "#mainview_" + editable.getx() + "x" + editable.gety();
    var localacre = amap.getTile(editable.getx(),editable.gety());
    var terraingraphics = localacre.terrain.getGraphicArray();
    $(tdtileid).css("background-image", "url('graphics/" + terraingraphics[0] + "')");
    $(tdtileid).css("background-position", terraingraphics[2] + "px " + terraingraphics[3] + "px");
    $(tdtileid).html('<img src="graphics/'+terraingraphics[1]+'" alt="' + editable.getx() + 'x' + editable.gety()+ '" />');
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
		if (document.npceditpopup.npcskintone.value !== editnpcs.skintone) {
			editnpcs.skintone = document.npceditpopup.npcskintone.value;
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
		if (document.npceditpopup.npcconvo.value !== editnpcs.getConversation()) {
			editnpcs.setConversation(document.npceditpopup.npcconvo.value);
		}
		if (document.npceditpopup.npcschedule.value !== editnpcs.getSchedule()) {
			editnpcs.setSchedule(document.npceditpopup.npcschedule.value);
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
		if (document.npceditpopup.npcprefix.value !== editnpcs.getPrefix()) {
			editnpcs.setPrefix(document.npceditpopup.npcprefix.value);
		}
		if (document.npceditpopup.npcnpcband.value !== editnpcs.getNPCBand()) {
			editnpcs.setNPCBand(document.npceditpopup.npcnpcband.value);
		}
    if (document.npceditpopup.bodysel.value !== editnpcs.wornlayers.body) {
      editnpcs.wornlayers.body = document.npceditpopup.bodysel.value;
    }
    if (parseInt(document.npceditpopup.bodyxn.value) !== editnpcs.wornlayernudges.body.x) {
      editnpcs.wornlayernudges.body.x = parseInt(document.npceditpopup.bodyxn.value);
    }
    if (parseInt(document.npceditpopup.bodyyn.value) !== editnpcs.wornlayernudges.body.y) {
      editnpcs.wornlayernudges.body.y = parseInt(document.npceditpopup.bodyyn.value);
    }
    if (document.npceditpopup.backsel.value !== editnpcs.wornlayers.back) {
      editnpcs.wornlayers.back = document.npceditpopup.backsel.value;
    }
    if (parseInt(document.npceditpopup.backxn.value) !== editnpcs.wornlayernudges.back.x) {
      editnpcs.wornlayernudges.back.x = parseInt(document.npceditpopup.backxn.value);
    }
    if (parseInt(document.npceditpopup.backyn.value) !== editnpcs.wornlayernudges.back.y) {
      editnpcs.wornlayernudges.back.y = parseInt(document.npceditpopup.backyn.value);
    }
    if (document.npceditpopup.cloaksel.value !== editnpcs.wornlayers.cloak) {
      editnpcs.wornlayers.cloak = document.npceditpopup.cloaksel.value;
    }
    if (parseInt(document.npceditpopup.cloakxn.value) !== editnpcs.wornlayernudges.cloak.x) {
      editnpcs.wornlayernudges.cloak.x = parseInt(document.npceditpopup.cloakxn.value);
    }
    if (parseInt(document.npceditpopup.cloakyn.value) !== editnpcs.wornlayernudges.cloak.y) {
      editnpcs.wornlayernudges.cloak.y = parseInt(document.npceditpopup.cloakyn.value);
    }
    if (document.npceditpopup.headsel.value !== editnpcs.wornlayers.head) {
      editnpcs.wornlayers.head = document.npceditpopup.headsel.value;
    }
    if (parseInt(document.npceditpopup.headxn.value) !== editnpcs.wornlayernudges.head.x) {
      editnpcs.wornlayernudges.head.x = parseInt(document.npceditpopup.headxn.value);
    }
    if (parseInt(document.npceditpopup.headyn.value) !== editnpcs.wornlayernudges.head.y) {
      editnpcs.wornlayernudges.head.y = parseInt(document.npceditpopup.headyn.value);
    }
    if (document.npceditpopup.mainhandsel.value !== editnpcs.wornlayers.mainhand) {
      editnpcs.wornlayers.mainhand = document.npceditpopup.mainhandsel.value;
    }
    if (parseInt(document.npceditpopup.mainhandxn.value) !== editnpcs.wornlayernudges.mainhand.x) {
      editnpcs.wornlayernudges.mainhand.x = parseInt(document.npceditpopup.mainhandxn.value);
    }
    if (parseInt(document.npceditpopup.mainhandyn.value) !== editnpcs.wornlayernudges.mainhand.y) {
      editnpcs.wornlayernudges.mainhand.y = parseInt(document.npceditpopup.mainhandyn.value);
    }
    if (document.npceditpopup.offhandsel.value !== editnpcs.wornlayers.offhand) {
      editnpcs.wornlayers.offhand = document.npceditpopup.offhandsel.value;
    }
    if (parseInt(document.npceditpopup.offhandxn.value) !== editnpcs.wornlayernudges.offhand.x) {
      editnpcs.wornlayernudges.offhand.x = parseInt(document.npceditpopup.offhandxn.value);
    }
    if (parseInt(document.npceditpopup.offhandyn.value) !== editnpcs.wornlayernudges.offhand.y) {
      editnpcs.wornlayernudges.offhand.y = parseInt(document.npceditpopup.offhandyn.value);
    }
    if (document.npceditpopup.realheadsel.value !== editnpcs.wornlayers.realhead) {
      editnpcs.wornlayers.realhead = document.npceditpopup.realheadsel.value;
    }
    if (editnpcs.checkType("human")) { 
      delete editnpcs.overrideGraphic; 
      editnpcs.makeLayers(); 
    }

		else if (optindex) {
		  editnpcs.overrideGraphic = graphicpicks[optindex];
		} else {
		  editnpcs.overrideGraphic = "";
		}
    $("#pickgraphics").html("");
    editnpcs = "";
	}
	else if (change === -1) {
	  // add an "Are you sure? Yes/No" prompt
	  var mapnpc = amap.npcs;
	  mapnpc.deleteFrom(editnpcs);
    mapnpc = amap.getTile(editnpcs.getx(),editnpcs.gety());
	  mapnpc.npcs.deleteFrom(editnpcs);
    var tileid = "tile" + editnpcs.getx() + "x" + editnpcs.gety();
    var tdid = "#mainview_" + tileid;
    var localacre = amap.getTile(editnpcs.getx(),editnpcs.gety());
    var terraingraphics = localacre.terrain.getGraphicArray();
    $(tdid).css("background-image","url('graphics/" + terraingraphics[0] + "')");
    $(tdid).css("background-position", terraingraphics[2] + "px " + terraingraphics[3] + "px");
    $(tdid).html('<img src="graphics/spacer.gif" />');
    drawFeatures();
	}
}

function changemaptile(xval,yval,toTerrain) {
  if (!toTerrain) { toTerrain = selectionval; }
  amap.setTerrain(xval,yval,toTerrain);
  setTimeout(function() { RedrawTile(xval,yval); }, 1);
}

function changemaptile_old(xval,yval,toTerrain) {
  if (!toTerrain) { toTerrain = selectionval; }
  var tileid = xval + "x" + yval;
  var tdid = "#terrain_" + tileid;
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
  $(tdid).html('<img src="graphics/'+graphics[1]+'" width="32" height="32" alt="tile'+xval+'x'+yval+'" />');
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
//	amap.data[y][x].features.addTop(newfeature);
//	amap.features.addTop(newfeature);
  amap.placeThing(x,y,newfeature);

  setTimeout(function() { RedrawTile(x,y) }, 1);
  return; 

  var tileid = x + "x" + y;  
  var tdid = "#mainview_" + tileid;
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
  $(tdid).html('<img src="graphics/'+graphics[1]+'" />');
  
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
//	amap.data[y][x].npcs.addTop(newnpc);
//	amap.npcs.addTop(newnpc);
  amap.placeThing(x,y,newnpc);
  
  setTimeout(function() { RedrawTile(x,y); }, 1);
  return; 

	var tileid = x + "x" + y;
	var tdid = "#mainview_" + tileid;
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
  $(tdid).html('<img src="graphics/'+graphics[1]+'" />');
}

function erasefeature(x,y,npc) {

  var editable;
  if (npc) {
    editable = amap.getTile(x,y).npcs.getTop();
  } else {
    editable = amap.getTile(x,y).features.getTop();
  }
  if (!editable) { return; }
  var mapfeature;
  if (npc) {
    mapfeature = amap.npcs;
  } else {
    mapfeature = amap.features;
  }
  mapfeature.deleteFrom(editable);
  mapfeature = amap.getTile(editable.getx(),editable.gety());
  if (npc) {
    mapfeature.npcs.deleteFrom(editable);
  } else {
    mapfeature.features.deleteFrom(editable);
  }
  setTimeout(function() { RedrawTile(x,y); }, 1);
  return;
  var tileid = editable.getx() + "x" + editable.gety();
  var tdtileid = "#mainview_" + tileid;
  $(tdtileid).css("background-image", "");
  $(tdtileid).css("background-position", "");
  $(tdtileid).html('<img src="graphics/spacer.gif" />');
  drawFeatures();

}

function initialSelect() {
  changeselection('Ocean');
// 	displayval='all';
 	drawFeatures();
// 	document.editlayer.layer[2].checked = true;
  SetGameTimeByClockTime("0:00");
  $("#clockface").html(GetUsableClockTime());

}

function SetClock() {
  var intime = prompt("Set time to: ");
  SetGameTimeByClockTime(intime);
  $("#clockface").html(GetUsableClockTime());

  PlaceNPCsByTime();

}

function PlaceNPCsByTime() {
  // loop over NPCs on map
  // figure where they are at time, move them
  var allnpcs = amap.npcs.getAll();
  var linked = amap.getLinkedMaps();

  if (linked && (linked.length > 0)) {
    var othermap = new GameMap();
    
    for (var j=0;j<linked.length;j++) {
      othermap = maps.getMap(linked[j]);
      var othernpcs = othermap.npcs.getAll();
      for (var i=0;i<othernpcs.length;i++) {
        allnpcs.push(othernpcs[i]);
      }
    }
  }
  
  for (var i=0;i<allnpcs.length;i++) {
    console.log(allnpcs[i].getName() + " " + allnpcs[i].getx() + "," + allnpcs[i].gety() + " : " + allnpcs[i].getNPCName());
    if (allnpcs[i].getSchedule()) {
      var sched = DU.schedules[allnpcs[i].getSchedule()];
      var loc = sched.getNPCLocationByTime();
      console.log(JSON.stringify(loc));
      var destmap = new GameMap();
      var frommap = allnpcs[i].getHomeMap();
      if (loc.mapName) {
        destmap = maps.getMap(loc.mapName);
      } else { destmap = frommap; }

      var editable = allnpcs[i];
      var mapfeature = frommap.npcs;
      mapfeature.deleteFrom(editable);
      mapfeature = frommap.getTile(editable.getx(),editable.gety());
      mapfeature.npcs.deleteFrom(editable);
      
      allnpcs[i].setx(loc.x);
      allnpcs[i].sety(loc.y);
      allnpcs[i].setHomeMap(destmap);
      destmap.data[loc.y][loc.x].npcs.addTop(allnpcs[i]);
      destmap.npcs.addTop(allnpcs[i]);
    }
  }
  drawMap();
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
  if (tempTile.checkType("Terrain")) {
    if (!localatlas.key[tempTile.getName()]) { console.log("No atlas key for " + tempTile.getName()); } 
  }
  var graphics = tempTile.getGraphicArray();
  var imgsrc = graphics[0];
  var oversrc = "<img src='graphics/" + graphics[1] + "' width='32' height='32' />";
  var id = "#tileoption" + tilename;
  
  if (tempTile.layers) {
    oversrc = "<div style='height:32;width:32;background-image:url(\"graphics/" + tempTile.layers[0][0] + "\");background-position: " + tempTile.layers[0][2] + "px " + tempTile.layers[0][3] + "px'></div>";
  } 
  document.write("<td id='" + id+ "' style=\"height:32;width:32;background-repeat:no-repeat;background-position: " + graphics[2] + "px " + graphics[3] + "px; background-image:url('graphics/" + imgsrc + "')\"><a href=\"javascript:changeselection('" + tilename + "');\">" + oversrc + "</a></td>");
}

function setVisible(divname) {

var outdoorblock = document.getElementById("outdoordiv");
var indoorblock = document.getElementById("indoordiv");
var featureblock = document.getElementById("featurediv");
var creatureblock = document.getElementById("creaturediv");
var lowlvlblock = document.getElementById("lowlvldiv");
var highlvlblock = document.getElementById("highlvldiv");
var transblock = document.getElementById("transdiv");

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

  if (divname === "trans") {
    transblock.style.display="block";
  } 
  else {transblock.style.display="none"; }
  
}

function editorEditMapDetails() {
  var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
  $('#detailsbubble').jqm({onShow:myOpen}); 
  $('#detailsbubble').jqmShow();
  document.detailseditpopup.mapname.value = amap.getName();
  document.detailseditpopup.mapdesc.value = amap.getDesc();
  document.detailseditpopup.maplongdesc.value = amap.getLongDesc();
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
  document.detailseditpopup.mapundergrounddesc.value = amap.getUndergroundDesc();
  document.detailseditpopup.mapautomap.value = amap.getAutomap();
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
    amap.setLongDesc(document.detailseditpopup.maplongdesc.value);
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
    amap.setUndergroundDesc(document.detailseditpopup.mapundergrounddesc.value);
    amap.setAutomap(document.detailseditpopup.mapautomap.value);
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
  var allfeatures = amap.features.getAll();
  for (var i = 0; i<allfeatures.length; i++) {
    if ((allfeatures[i].getx() >= startx) && (allfeatures[i].getx() <= endx) && (allfeatures[i].gety() >= starty) && (allfeatures[i].gety() <= endy)) {
      amap.deleteThing(allfeatures[i]);
    }
  }

  var allnpcs = amap.npcs.getAll();
  for (var i = 0; i<allnpcs.length; i++) {
    if ((allnpcs[i].getx() >= startx) && (allnpcs[i].getx() <= endx) && (allnpcs[i].gety() >= starty) && (allnpcs[i].gety() <= endy)) {
      amap.deleteThing(allnpcs[i]);
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

function getDisplayCell(mapname, centerx, centery, x, y, tp, ev) {

  var displayCell = {};
  var localacre = mapname.getTile(x,y);
  
  var displaytile;
  // decide whether to draw a tile, draw it shaded, or make it darkness
  var losresult = 0;

  var blocks = localacre.getBlocksLOS();
  
  var lighthere = 1;
  
  displaytile = localacre.getTop(0,1);  // sorts NPCs to top
  var isnpc = 0;
  if (displaytile.checkType("NPC")) { isnpc = 1; }
  var graphics = displaytile.getGraphicArray();
  var showGraphic = graphics[0];
  if (typeof displaytile.setBySurround === "function") {
   	graphics = displaytile.setBySurround(x,y,mapname,graphics,1,centerx,centery,losresult);
    displayCell.showGraphic = graphics[0];
    displayCell.graphics2 = graphics[2];
    displayCell.graphics3 = graphics[3];
    displayCell.graphics1 = graphics[1];
    if (typeof displaytile.doTile === "function") {
      showGraphic = displaytile.doTile(x,y,graphics[0]);
      if (showGraphic.graphic) { displayCell.showGraphic = showGraphic.graphic; }
      if (showGraphic.spritexoffset) { 
        displayCell.graphics2 = showGraphic.spritexoffset;
        displayCell.graphics3 = showGraphic.spriteyoffset;
      }
    }
    displayCell.losresult = losresult;
    displayCell.lighthere = lighthere;
    displayCell.desc = displaytile.getDesc();
  } else {
    displayCell.showGraphic = showGraphic;
    displayCell.graphics2 = graphics[2];
    displayCell.graphics3 = graphics[3];
    displayCell.graphics1 = graphics[1];
    if (typeof displaytile.doTile === "function") {
      showGraphic = displaytile.doTile(x,y,displayCell);
      if ("graphic" in showGraphic) { displayCell.showGraphic = showGraphic.graphic; }
      if ("spritexoffset" in showGraphic) { 
        displayCell.graphics2 = showGraphic.spritexoffset;
        displayCell.graphics3 = showGraphic.spriteyoffset;
      }      
    }
    if (typeof displaytile.setByBelow === "function") {
      var setbelow = displaytile.setByBelow(x,y,mapname);
      displayCell.showGraphic = setbelow[0];
      displayCell.graphics2 = setbelow[2];
      displayCell.graphics3 = setbelow[3];
    }
    displayCell.losresult = losresult;
    displayCell.lighthere = lighthere;
    displayCell.isnpc = isnpc;
    displayCell.desc = displaytile.getDesc();
  }
  if (displaytile.checkType("Terrain") && (displaytile.getName() !== "BlankBlack")) { displayCell.terrain = 1; }
  return displayCell;
}

function GetDisplayTerrain(mapref, xcoord, ycoord,centerx,centery,losresult) {
  
  var localacre = mapref.getTile(xcoord, ycoord);
  var displaytile = localacre.getTerrain();

  var graphics = displaytile.getGraphicArray();
  var showGraphic = graphics[0];

  var displayCell = {};
  displayCell.desc = displaytile.getDesc();
  if (typeof displaytile.setBySurround === "function") {
   	graphics = displaytile.setBySurround(xcoord,ycoord,mapref,graphics,0,centerx,centery);
    showGraphic = graphics[0];
  }

  displayCell.showGraphic = showGraphic;
  displayCell.graphics2 = graphics[2];
  displayCell.graphics3 = graphics[3];
  displayCell.graphics1 = graphics[1];
  if (typeof displaytile.doTile === "function") {
    showGraphic = displaytile.doTile(xcoord,ycoord,displayCell);
    if ("graphic" in showGraphic) { displayCell.showGraphic = showGraphic.graphic; }
    if ("spritexoffset" in showGraphic) { 
      displayCell.graphics2 = showGraphic.spritexoffset;
      displayCell.graphics3 = showGraphic.spriteyoffset;
    }        
  }

  return displayCell;
}

function Verify() {
  for (let i=0;i<amap.getHeight();i++) {
    for (let j=0;j<amap.getWidth();j++) {
      let fea = amap.getTile(j,i).getFeatures();
      let all = {};
      for (let k=0;k<fea.length;k++) {
        if (all[fea[k].getName()]) { console.log(`${j}x${i}: ${fea[k].getName()}`) }
        all[fea[k].getName()] = 1;
      }
    }
  }
}

function CleanDuplicates() {
  for (let i=0;i<amap.getHeight();i++) {
    for (let j=0;j<amap.getWidth();j++) {
      let fea = amap.getTile(j,i).getFeatures();
      if (fea.length > 1) {
        let all = {};
        for (let k=0;k<fea.length;k++) {
          if (all[fea[k].getName()]) { 
            amap.features.deleteFrom(fea[k]);
            amap.getTile(j,i).features.deleteFrom(fea[k]);  
          } else {
            all[fea[k].getName()] = 1;
          }
        }
      }
    }
  }
}

function ChangeHumanDisplay(which) {
  let changeme = document.getElementById("human" + which);
  let selid = document.getElementById(which + "sel").value;
  let xpos = 0;
  let ypos = -120*32;
  if (selid) {
    xpos = parseInt(HumanParts[selid].spritex) + parseInt(document.getElementById(which + "xn").value);
    ypos = parseInt(HumanParts[selid].spritey) + parseInt(document.getElementById(which + "yn").value);
  }
  changeme.style.backgroundPosition = xpos + "px " + ypos + "px";
}

function MakePeerView() {
  let pview = "<table cellpadding='0' cellspacing='0' border='0'>";
  for (let i=0;i<amap.getHeight();i++) {
    pview += "<tr>";
    for (let j=0;j<amap.getWidth();j++) {
      let tile = amap.getTile(j,i);
      let fea = tile.getTopFeature();
      let col;
      if (fea && fea.getPeerview()) { col = fea.getPeerview(); }
      else {
        let terrain = tile.getTerrain();
        col = terrain.getPeerview();
      }
      pview += "<td style='background-color:" + col + "'><img src='spacer.gif' width='3' height='3' /></td>";
    }
    pview += "</tr>";
  }
  pview += "</table>";

  let pwin = window.open('','printarray');
  pwin.document.writeln("<html><head></head><body>" + pview + "</body></html>");

}

function CreateFlow() {
  for (let y=0;y<amap.getHeight();y++) {
    for (let x=0;x<amap.getWidth();x++) {
      let tile = amap.getTile(x,y);
      let terrain = tile.getTerrain();
      if (terrain.getName().includes("River")) {
        let num = 0;
        let northacre = amap.getTile(x,y-1);
        let northtile;
        let north = 0;
        if (northacre !== "OoB") { 
          northtile = northacre.getTerrain(); 
          if (northtile.getName().includes("River") || IsWet(northtile)) { num++; north=1; }
        } else { north = 1; num++; }

        let southacre = amap.getTile(x,y+1);
        let southtile;
        let south = 0;
        if (southacre !== "OoB") {
          southtile = southacre.getTerrain();
          if (southtile.getName().includes("River") || IsWet(southtile)) { num++; south=1; }
        } else { south = 1; num++; }

        let eastacre = amap.getTile(x+1,y);
        let easttile;
        let east = 0;
        if (eastacre !== "OoB") { 
          easttile = eastacre.getTerrain(); 
          if (easttile.getName().includes("River") || IsWet(easttile)) { num++; east=1; }
        } else { east = 1; num++; }

        let westacre = amap.getTile(x-1,y);
        let westtile;
        let west = 0;
        if (westacre !== "OoB") {
          westtile = westacre.getTerrain();
          if (westtile.getName().includes("River") || IsWet(westtile)) { num++; west=1; }
        } else { west = 1; num++; }

        if (num === 1) {
          if (north) { tile.setFlow("n"); ExtendFlow(x,y-1);}
          else if (south) { tile.setFlow("s"); ExtendFlow(x,y+1);}
          else if (east) { tile.setFlow("e"); ExtendFlow(x+1,y);}
          else if (west) { tile.setFlow("w"); ExtendFlow(x-1,y);}
        }
      }
    }
  }

}

function ExtendFlow(x,y) {
  let tile = amap.getTile(x,y);
  if (tile === "OoB") { return; }
  if (tile.getFlow()) { return; }
  let terrain = tile.getTerrain();
  if (!terrain.getName().includes("River")) { return; }
  let northacre = amap.getTile(x,y-1);
  let northtile;
  let north = 0;
  let northflow = "";
  if (northacre !== "OoB") { 
    northflow = northacre.getFlow();
    northtile = northacre.getTerrain(); 
    if (northtile.getName().includes("River") || IsWet(northtile)) { north=1; }
  } else { north = 1; }

  let southacre = amap.getTile(x,y+1);
  let southtile;
  let south = 0;
  let southflow = "";
  if (southacre !== "OoB") {
    southflow = southacre.getFlow();
    southtile = southacre.getTerrain();
    if (southtile.getName().includes("River") || IsWet(southtile)) { south=1; }
  } else { south = 1; }

  let eastacre = amap.getTile(x+1,y);
  let easttile;
  let east = 0;
  let eastflow = "";
  if (eastacre !== "OoB") { 
    eastflow = eastacre.getFlow();
    easttile = eastacre.getTerrain(); 
    if (easttile.getName().includes("River") || IsWet(easttile)) { east=1; }
  } else { east = 1; }

  let westacre = amap.getTile(x-1,y);
  let westtile;
  let west = 0;
  let westflow = "";
  if (westacre !== "OoB") {
    westflow = westacre.getFlow();
    westtile = westacre.getTerrain();
    if (westtile.getName().includes("River") || IsWet(westtile)) { west=1; }
  } else { west = 1; }

  if (north && west && east) {
    if ((northflow === "s") && (eastflow === "w") && ((westflow === "w") || !westflow)) { tile.setFlow("w"); ExtendFlow(x-1,y); }
    else if ((northflow === "s") && (westflow === "e") && ((eastflow === "e") || !eastflow)) { tile.setFlow("e"); ExtendFlow(x+1,y); }
    else if ((westflow === "e") && (eastflow === "w") && ((northflow === "n") || !northflow)) { tile.setFlow("n"); ExtendFlow(x,y-1); }
  } else if (south && west && east) {
    if ((southflow === "n") && (eastflow === "w") && ((westflow === "w") || !westflow)) { tile.setFlow("w"); ExtendFlow(x-1,y); }
    else if ((southflow === "n") && (westflow === "e") && ((eastflow === "e") || !eastflow)) { tile.setFlow("e"); ExtendFlow(x+1,y); }
    else if ((westflow === "e") && (eastflow === "w") && ((southflow === "s") || !southflow)) { tile.setFlow("s"); ExtendFlow(x,y+1); }
  } else if (north && south && east) {
    if ((northflow === "s") && (southflow === "n") && ((eastflow === "e") || !eastflow)) { tile.setFlow("e"); ExtendFlow(x+1,y); }
    if ((northflow === "s") && (eastflow === "w") && ((southflow === "s") || !southflow)) { tile.setFlow("s"); ExtendFlow(x,y+1); }
    if ((southflow === "n") && (eastflow === "w") && ((northflow === "n") || !northflow)) { tile.setFlow("n"); ExtendFlow(x,y-1); }
  } else if (north && south && west) {
    if ((northflow === "s") && (southflow === "n") && ((westflow === "w") || !westflow)) { tile.setFlow("w"); ExtendFlow(x-1,y); }
    if ((northflow === "s") && (westflow === "e") && ((southflow === "s") || !southflow)) { tile.setFlow("s"); ExtendFlow(x,y+1); }
    if ((southflow === "n") && (westflow === "e") && ((northflow === "n") || !northflow)) { tile.setFlow("n"); ExtendFlow(x,y-1); }
  } else if (north && south) {
    if ((northflow === "s") && ((southflow === "s") || !southflow)) { tile.setFlow("s"); ExtendFlow(x,y+1); }
    else if ((southflow === "n") && ((northflow === "n") || !northflow)) { tile.setFlow("n"); ExtendFlow(x,y-1); }
  } else if (north && east) {
    if ((northflow === "s") && ((eastflow === "e") || !eastflow)) { tile.setFlow("e"); ExtendFlow(x+1,y); }
    if ((eastflow === "w") && ((northflow === "n") || !northflow)) { tile.setFlow("n"); ExtendFlow(x,y-1); }
  } else if (north && west) {
    if ((northflow === "s") && ((westflow === "w") || !westflow)) { tile.setFlow("w"); ExtendFlow(x-1,y); }
    else if ((westflow === "e") && ((northflow === "n") || !northflow)) { tile.setFlow("n"); ExtendFlow(x,y-1); }
  } else if (west && east) {
    if ((westflow === "e") && ((eastflow === "e") || !eastflow)) { tile.setFlow("e"); ExtendFlow(x+1,y); }
    else if ((eastflow === "w") && ((westflow === "w") || !westflow)) { tile.setFlow("w"); ExtendFlow(x-1,y); }
  } else if (west && south) {
    if ((westflow === "e") && (( southflow === "s") || !southflow)) { tile.setFlow("s"); ExtendFlow(x,y+1); }
    else if ((southflow === "n") && ((westflow === "w") || !westflow)) { tile.setFlow("w"); ExtendFlow(x-1,y); }
  } else if (east && south) {
    if ((eastflow === "w") && ((southflow === "s") || !southflow)) { tile.setFlow("s"); ExtendFlow(x,y+1); }
    else if ((southflow === "n") && ((eastflow === "e") || !eastflow)) { tile.setFlow("e"); ExtendFlow(x+1,y); }
  }
}

function drawFlow() {
  if (flowing) { flowing = 0; } 
  else { flowing = 1; }
  for (let y=0;y<amap.getHeight();y++) {
    for (let x=0;x<amap.getWidth();x++) {
      if (flowing) {
        let acre = amap.getTile(x,y);
        let flow = acre.getFlow();
        if (flow) {
          let box = document.getElementById(`mainview_${x}x${y}`);
          let sx = 0;
          let sy = 0;
          if (flow === "n") { sx = -16; }
          if (flow === "e") { sx = -32; sy = -16; }
          if (flow === "w") { sy = -16; }
          if (flow === "s") { sx = -16; sy = -32; }

          let div = `<div id='flowview_${x}x${y}' style="position:absolute; left: 8px; top: 8px; background-image:url('graphics/frame/arrows.gif'); background-repeat:no-repeat; background-position: ${sx}px ${sy}px"><img src="graphics/spacer.gif" width="16" height="16" /></div>`;
          box.innerHTML += div;
        }
      } else {
        let fdiv = document.getElementById(`flowview_${x}x${y}`);
        if (fdiv) {
          fdiv.parentNode.removeChild(fdiv);
        }
      }
    }
  }
}

function CreateTransitionModal() {
  var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
  $('#transitionbubble').jqm({onShow:myOpen}); 
  $('#transitionbubble').jqmShow();
  document.getElementById("transitionbubble").style.removeProperty("visibility");

  let block = document.getElementById("transcontent");
  let html = `<table cellpadding='5' cellspacing='0' border='0' style='width:100%'><tr><td>`;
  html += "<select id='transselect' onChange='ChangeTransitionType()'><option value=''></option>";
  for (let i=0;i<transoptions.length;i++) {
    let sel = "";
    if (transselect === i) { sel = " selected"; }
    html += `<option value='${transoptions[i]}'>${transoptions[i]}</option>`;
  }
  html += '</select></td><td id="seltilename"></td><td><div id="transtilearea" style="width:96;height:96"></div></td></tr></table>';

  html += `<table>`;
  html += `<tr><td><center>Layer 2:<br /><div id='translayer2'></div></td>`;
  html += `<td><div style='width:32;height:32' id='translayer2image'></div><br />3: <input type='text' id='layer2-3' size='12'/><br />2: <input type='text' id='layer2-2' size='12'/><br />1: <input type='text' id='layer2-1' size='12'/><br />0: <input type='text' id='layer2-0' size='12'/></td></tr>`;
  html += `<tr><td><center>Layer 1:<br /><div id='translayer1'><table><tr>`;
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/water.gif');background-position:0px 0px" id='water.gif 0 0' onclick="transSelection(1, ['water.gif','spacer.gif',0,0])"></div></td>`;
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/water.gif');background-position:0px -32px" id='water.gif 0 -32' onclick="transSelection(1, ['water.gif','spacer.gif',0,-32])"></div></td>`;
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/water.gif');background-position:0px -64px" id='water.gif 0 -64' onclick="transSelection(1, ['water.gif','spacer.gif',0,-64])"></div></td>`;
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/WaterCaveSheet.gif');background-position:0px 0px" id='WaterCaveSheet.gif 0 0' onclick="transSelection(1,['waterCaveSheet.gif','spacer.gif',0,0])"></div></td>`;
  // Grass
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-192px 0px" id='static.gif -192 0' onclick="transSelection(1,['static.gif','spacer.gif',-192,0])"></div></td>`;
  // SouthCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-192px -1664px" id='static.gif -192 -1664' onclick="transSelection(1,['static.gif','spacer.gif',-192,-1664])"></div></td>`;
  // NorthCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-96px -1760px" id='static.gif -96 -1760' onclick="transSelection(1,['static.gif','spacer.gif',-96,-1760])"></div></td>`;
  // EastCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-96px -1792px" id='static.gif -96 -1792' onclick="transSelection(1,['static.gif','spacer.gif',-96,-1792])"></div></td>`;
  // WestCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-96px -1824px" id='static.gif -96 -1824' onclick="transSelection(1,['static.gif','spacer.gif',-96,-1824])"></div></td>`;
  // Northeast Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-192px -1632px" id='static.gif -192 -1632' onclick="transSelection(1,['static.gif','spacer.gif',-192,-1632])"></div></td>`;
  // Southwest Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-192px -1600px" id='static.gif -192 -1600' onclick="transSelection(1,['static.gif','spacer.gif',-192,-1600])"></div></td>`;
  // Northwest Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-32px -1664px" id='static.gif -32 -1664' onclick="transSelection(1,['static.gif','spacer.gif',-32,-1664])"></div></td>`;
  // Southeast Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-32px -1632px" id='static.gif -32 -1632' onclick="transSelection(1,['static.gif','spacer.gif',-32,-1632])"></div></td>`;
  // Meadow
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:0px 0px" id='static.gif 0 0' onclick="transSelection(1,['static.gif','spacer.gif',0,0])"></div></td>`;
  // MeadowSouthCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-160px -1664px" id='static.gif -160 -1664' onclick="transSelection(1,['static.gif','spacer.gif',-160,-1664])"></div></td>`;
  // MeadowNorthCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-64px -1760px" id='static.gif -64 -1760' onclick="transSelection(1,['static.gif','spacer.gif',-64,-1760])"></div></td>`;
  // MeadowEastCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-64px -1792px" id='static.gif -64 -1792' onclick="transSelection(1,['static.gif','spacer.gif',-64,-1792])"></div></td>`;
  // MeadowWestCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-64px -1824px" id='static.gif -64 -1824' onclick="transSelection(1,['static.gif','spacer.gif',-64,-1824])"></div></td>`;
  // Meadow Northeast Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-160px -1632px" id='static.gif -160 -1632' onclick="transSelection(1,['static.gif','spacer.gif',-160,-1632])"></div></td>`;
  // Meadow Southwest Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-160px -1600px" id='static.gif -160 -1600' onclick="transSelection(1,['static.gif','spacer.gif',-160,-1600])"></div></td>`;
  // Meadow Northwest Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:0px -1664px" id='static.gif 0 -1664' onclick="transSelection(1,['static.gif','spacer.gif',0,-1664])"></div></td>`;
  // Meadow Southeast Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:0px -1632px" id='static.gif 0 -1632' onclick="transSelection(1,['static.gif','spacer.gif',0,-1632])"></div></td>`;

  html += `</tr><tr>`;
  // Cave
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:0px -96px" id='static.gif 0 -96' onclick="transSelection(1,['static.gif','spacer.gif',0,-96])"></div></td>`;  
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-32px -96px" id='static.gif -32 -96' onclick="transSelection(1,['static.gif','spacer.gif',-32,-96])"></div></td>`;  
  // CaveSouthCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-160px -1696px" id='static.gif -160 -1696' onclick="transSelection(1,['static.gif','spacer.gif',-160,-1696])"></div></td>`;
  // CaveNorthCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-192px -1760px" id='static.gif -192 -1760' onclick="transSelection(1,['static.gif','spacer.gif',-192,-1760])"></div></td>`;
  // CaveEastCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-192px -1792px" id='static.gif -192 -1792' onclick="transSelection(1,['static.gif','spacer.gif',-192,-1792])"></div></td>`;
  // CaveWestCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-192px -1824px" id='static.gif -192 -1824' onclick="transSelection(1,['static.gif','spacer.gif',-192,-1824])"></div></td>`;
    // Sand
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-128px 0px" id='static.gif -128 0' onclick="transSelection(1,['static.gif','spacer.gif',-128,0])"></div></td>`;
  // SandSouthCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-224px -1664px" id='static.gif -224 -1664' onclick="transSelection(1,['static.gif','spacer.gif',-224,-1664])"></div></td>`;
  // SandNorthCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-128px -1760px" id='static.gif -128 -1760' onclick="transSelection(1,['static.gif','spacer.gif',-128,-1760])"></div></td>`;
  // SandEastCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-128px -1792px" id='static.gif -128 -1792' onclick="transSelection(1,['static.gif','spacer.gif',-128,-1792])"></div></td>`;
  // SandWestCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-128px -1824px" id='static.gif -128 -1824' onclick="transSelection(1,['static.gif','spacer.gif',-128,-1824])"></div></td>`;
  // Sand Northeast Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-224px -1632px" id='static.gif -224 -1632' onclick="transSelection(1,['static.gif','spacer.gif',-224,-1632])"></div></td>`;
  // Sand Southwest Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-224px -1600px" id='static.gif -224 -1600' onclick="transSelection(1,['static.gif','spacer.gif',-224,-1600])"></div></td>`;
  // Sand Northwest Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-64px -1664px" id='static.gif -64 -1664' onclick="transSelection(1,['static.gif','spacer.gif',-64,-1664])"></div></td>`;
  // Sand Southeast Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-64px -1632px" id='static.gif -64 -1632' onclick="transSelection(1,['static.gif','spacer.gif',-64,-1632])"></div></td>`;

  html += `</tr><tr>`;
  // Cave
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:0px -128px" id='static.gif 0 -128' onclick="transSelection(1,['static.gif','spacer.gif',0,-128])"></div></td>`;  
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-32px -128px" id='static.gif -32 -128' onclick="transSelection(1,['static.gif','spacer.gif',-32,-128])"></div></td>`;  
  // Cave Northeast Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-32px -1696px" id='static.gif -32 -1696' onclick="transSelection(1,['static.gif','spacer.gif',-32,-1696])"></div></td>`;
  // Cave Southwest Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-288px -1600px" id='static.gif -288 -1600' onclick="transSelection(1,['static.gif','spacer.gif',-288,-1600])"></div></td>`;
  // Cave Northwest Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-128px -1664px" id='static.gif -128 -1664' onclick="transSelection(1,['static.gif','spacer.gif',-128,-1664])"></div></td>`;
  // Cave Southeast Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-128px -1632px" id='static.gif -128 -1632' onclick="transSelection(1,['static.gif','spacer.gif',-128,-1632])"></div></td>`;
  // Dirt
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:0px -64px" id='static.gif 0 -64' onclick="transSelection(1,['static.gif','spacer.gif',0,-64])"></div></td>`;
  // DirtSouthCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-128px -1696px" id='static.gif -128 -1696' onclick="transSelection(1,['static.gif','spacer.gif',-128,-1696])"></div></td>`;
  // DirtNorthCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-160px -1760px" id='static.gif -160 -1760' onclick="transSelection(1,['static.gif','spacer.gif',-160,-1760])"></div></td>`;
  // DirtEastCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-160px -1792px" id='static.gif -160 -1792' onclick="transSelection(1,['static.gif','spacer.gif',-160,-1792])"></div></td>`;
  // DirtWestCoast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-160px -1824px" id='static.gif -160 -1824' onclick="transSelection(1,['static.gif','spacer.gif',-160,-1824])"></div></td>`;
  // Dirt Northeast Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:0px -1696px" id='static.gif 0 -1696' onclick="transSelection(1,['static.gif','spacer.gif',0,-1696])"></div></td>`;
  // Dirt Southwest Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-256px -1600px" id='static.gif -256 -1600' onclick="transSelection(1,['static.gif','spacer.gif',-256,-1600])"></div></td>`;
  // Dirt Northwest Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-96px -1664px" id='static.gif -96 -1664' onclick="transSelection(1,['static.gif','spacer.gif',-96,-1664])"></div></td>`;
  // Dirt Southeast Coast
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-96px -1632px" id='static.gif -96 -1632' onclick="transSelection(1,['static.gif','spacer.gif',-96,-1632])"></div></td>`;
  // Swamp
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-288px 0px" id='static.gif -288 0' onclick="transSelection(1,['static.gif','spacer.gif',-288,0])"></div></td>`;
  // Hills
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-256px 0px" id='static.gif -256 0' onclick="transSelection(1,['static.gif','spacer.gif',-256,0])"></div></td>`;
  // Hills1
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-224px -224px" id='static.gif -224 -224' onclick="transSelection(1,['static.gif','spacer.gif',-224,-224])"></div></td>`;
  // Hills2
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/static.gif');background-position:-288px -576px" id='static.gif -288 -576' onclick="transSelection(1,['static.gif','spacer.gif',-288,-576])"></div></td>`;


  html += `</tr></table></div></td>`;
  html += `<td><div style='width:32;height:32' id='translayer1image'></div><br />3: <input type='text' id='layer1-3' size='12'/><br />2: <input type='text' id='layer1-2' size='12'/><br />1: <input type='text' id='layer1-1' size='12'/><br />0: <input type='text' id='layer1-0' size='12'/></td></tr>`;
  
  html += `<tr><td><center>Layer 0:<br /><div id='translayer0'><table><tr>`;
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/water.gif');background-position:0px 0px" id='water.gif 0 0' onclick="transSelection(0,['water.gif','spacer.gif',0,0])"></div></td>`;
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/water.gif');background-position:0px -32px" id='water.gif 0 -32' onclick="transSelection(0,['water.gif','spacer.gif',0,-32])"></div></td>`;
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/water.gif');background-position:0px -64px" id='water.gif 0 -64' onclick="transSelection(0,['water.gif','spacer.gif',0,-64])"></div></td>`;
  html += `<td><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/WaterCaveSheet.gif');background-position:0px 0px" id='WaterCaveSheet.gif 0 0' onclick="transSelection(0,['waterCaveSheet.gif','spacer.gif',0,0])"></div></td>`;
  html += `</tr></table></div></td>`;
  html += `<td><div style='width:32;height:32' id='translayer0image'></div><br />3: <input type='text' id='layer0-3' size='12'/><br />2: <input type='text' id='layer0-2' size='12'/><br />1: <input type='text' id='layer0-1' size='12'/><br />0: <input type='text' id='layer0-0' size='12'/></td></tr>`;
  html += `</table>`;

  block.innerHTML = html;

  for (let i=0;i<=2;i++) {
    for (let j=0;j<=3;j++) {
      let fieldname = `layer${i}-${j}`;
      document.getElementById(fieldname).value = "";
    }
  }
}

function TransitionTile(x,y) {
  transx = x;
  transy = y;
  CreateTransitionModal();

  let tname = amap.getTile(x,y).getTerrain().getName();
  document.getElementById("seltilename").innerHTML = tname;

  let tsel = "<table cellpadding='0' cellspacing='0' border='0' style='width:96; height:96'>";
  for (let j=y-1;j<=y+1;j++) {
    tsel += `<tr>`;
    for (let i=x-1;i<=x+1;i++) {
      let ttile = amap.getTile(i,j);
      if (ttile !== "OoB") {
        let graphic = ttile.getTerrain().getGraphicArray();
        tsel += `<td style='position:relative; width:32; height:32'><div style='position:absolute;left:0;top:0;background-image:url("graphics/${graphic[0]}");background-position: ${graphic[2]}px ${graphic[3]}px;width:32;height:32'></div>`;
        if (graphic[4]) {
          tsel += `<div style='position:absolute;left:0;top:0;background-image:url("graphics/${graphic[4][0][0]}");background-position: ${graphic[4][0][2]}px ${graphic[4][0][3]}px;width:32;height:32'></div>`;
        }
        tsel += `</td>`;
      } else {
        tsel += `<td style='width:32;height:32;background-color:black'></td>`;
      }
    }
    tsel += `</tr>`;
  }
  tsel += '</table>';
  document.getElementById("transtilearea").innerHTML = tsel;

  if (tname.includes("Mountain")) {
    ChangeTransitionType("Mountains");
  } else if (tname.includes("Hill")) {
    ChangeTransitionType("Hills");
  } else if (tname.includes("BrightForestEdge")) {
    ChangeTransitionType("Bright Forest [tiled]");
  } else if (tname.includes("BrightForest")) {
    ChangeTransitionType("Bright Forest");
//  } else if (tname.includes("EvergreenForestEdge")) {
//    ChangeTransitionType("Evergreen [tiled]");
  } else if (tname.includes("EvergreenForest")) {
    ChangeTransitionType("Evergreen");
  } else if (tname.includes("ForestTiling")) {
    ChangeTransitionType("Forest [tiled]");
  } else if (tname.includes("Forest")) {
    ChangeTransitionType("Forest");
  } else if (tname.includes("Swamp")) {
    ChangeTransitionType("Swamp");
  } else if (tname.includes("Dirt")) {
    ChangeTransitionType("Dirt");
  } else if (tname.includes("Meadow")) {
    ChangeTransitionType("Meadow");
  } else if (tname.includes("Grass")) {
    ChangeTransitionType("Grass");
  }

  if (amap.transover) {
    let override = amap.transover[`${x},${y}`];
    if (override) {
      for (let i=0;i<=2;i++) {
        let grapharray = override[i];
        let img = `<div style='width:32;height:32;background-image:url("graphics/${grapharray[0]}");background-position: ${grapharray[2]}px ${grapharray[3]}px'></div>`;
        document.getElementById(`translayer${i}image`).innerHTML = img;

        document.getElementById(`layer${i}-3`).value = `${grapharray[3]}`;
        document.getElementById(`layer${i}-2`).value = `${grapharray[2]}`;
        document.getElementById(`layer${i}-1`).value = `${grapharray[1]}`;
        document.getElementById(`layer${i}-0`).value = `${grapharray[0]}`;
      }
    }
  } else {
    amap.transover = {};
  }
}

function ChangeTransitionType(passedtype) {
  let totype = passedtype;
  if (!totype) {
    totype = document.getElementById("transselect").value;
  }
  transselect = totype;
  console.log("In ChangeTransitionType: " + totype);
  let ttile = "<table><tr>";
  if (totype === "Mountains") {
    let ty = transpixels["Mountains"];
    ttile += `<td>N: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:0px ${ty}px" id='TerrainBlend.gif 0 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',0,${ty}])"></div><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-32px ${ty}px" id='TerrainBlend.gif -32 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-32,${ty}])"></div></td>`; 
    ttile += `<td>S: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-64px ${ty}px" id='TerrainBlend.gif -64 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-64,${ty}])"></div><div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-96px ${ty}px" id='TerrainBlend.gif -96 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-96,${ty}])"></div></td>`; 
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-128px ${ty}px" id='TerrainBlend.gif -128 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-128,${ty}])"></div></td>`; 
    ttile += `<td>E: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-160px ${ty}px" id='TerrainBlend.gif -160 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-160,${ty}])"></div></td>`; 
    ttile += `<td>NW: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-192px ${ty}px" id='TerrainBlend.gif -192 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-192,${ty}])"></div></td>`; 
    ttile += `<td>NE: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-224px ${ty}px" id='TerrainBlend.gif -224 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-224,${ty}])"></div></td>`; 
    ttile += `<td>SW: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-256px ${ty}px" id='TerrainBlend.gif -256 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-256,${ty}])"></div></td>`; 
    ttile += `<td>SE: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-288px ${ty}px" id='TerrainBlend.gif -288 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-288,${ty}])"></div></td>`; 
    ttile += `<td>SNW: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-320px ${ty}px" id='TerrainBlend.gif -320 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-320,${ty}])"></div></td>`; 
    ttile += `<td>SNE: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-352px ${ty}px" id='TerrainBlend.gif -352 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-352,${ty}])"></div></td>`; 
    ttile += `<td>WNE: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-384px ${ty}px" id='TerrainBlend.gif -384 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-384,${ty}])"></div></td>`; 
    ttile += `<td>WSE: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-416px ${ty}px" id='TerrainBlend.gif -416 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-416,${ty}])"></div></td>`; 
    ttile += `<td>NS: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-448px ${ty}px" id='TerrainBlend.gif -448 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-448,${ty}])"></div></td>`; 
    ttile += `<td>EW: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-480px ${ty}px" id='TerrainBlend.gif -480 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-480,${ty}])"></div></td>`; 
  } else if ((totype === "Hills") ||  (totype === "Swamp") || (totype === "Dirt") || (totype === "Meadow") || (totype === "Grass") || (totype === "Sand") || (totype === "Forest") || (totype === "Bright Forest") || (totype === "Evergreen") || (totype === "DeadForest") || (totype === "DeadEvergreen")) {
    let ty = transpixels[totype];
    for (let i=0;i<directions.length;i++) {
      let tx = transpixels[directions[i]];
      let dir = directions[i].toUpperCase();
      ttile += `<td>${dir}: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    }
    //if ((totype !== "Forest") && (totype !== "Bright Forest") && (totype !== "Evergreen")) {
      ttile += `<td>NSEW: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:-448px ${ty}px" id='TerrainBlend.gif -448 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',-448,${ty}])"></div></td>`;
    //}
  } else if (totype === "Forest [tiled]") {
    ttile += `<td colspan='3'>Upper Left:</td><td colspan='3'>Upper Right:</td><td>Mid Left:</td><td>Mid Right:</td><td colspan='3'>Lower Left:</td><td colspan='3'>Lower Right:</td></tr><tr>`;
    let ty = transpixels["ForestTiledUL"];
    ttile += `<td>N: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:0px ${ty}px" id='TerrainBlend.gif 0 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',0,${ty}])"></div></td>`;
    let tx = transpixels["w"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["nw"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    ty = transpixels["ForestTiledUR"];
    ttile += `<td>N: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:0px ${ty}px" id='TerrainBlend.gif 0 ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',0,${ty}])"></div></td>`;
    tx = transpixels["e"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["ne"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    ty = transpixels["ForestTiledML"];
    tx = transpixels["w"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    ty = transpixels["ForestTiledMR"];
    tx = transpixels["e"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    ty = transpixels["ForestTiledLL"];
    tx = transpixels["s"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["w"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["sw"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    ty = transpixels["ForestTiledLR"];
    tx = transpixels["s"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["e"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["se"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
  } else if (totype === "Bright Forest [tiled]") {
    ttile += `<td colspan='7'>Top V1:</td><td colspan='7'>Top V2:</td><td colspan="3">Center:</td></tr><tr>`;
    let ty = transpixels["BrightTiledT2"];
    let tx = transpixels["n"];
    ttile += `<td>N: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["w"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["e"];
    ttile += `<td>E: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["nw"];
    ttile += `<td>NW: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["ne"];
    ttile += `<td>NE: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["new"];
    ttile += `<td>NEW: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["ew"];
    ttile += `<td>EW: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    ty = transpixels["BrightTiledT1"];
    tx = transpixels["n"];
    ttile += `<td>N: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["w"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["e"];
    ttile += `<td>E: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["nw"];
    ttile += `<td>NW: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["ne"];
    ttile += `<td>NE: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["new"];
    ttile += `<td>NEW: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["ew"];
    ttile += `<td>EW: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    ty = transpixels["BrightTiledC"];
    tx = transpixels["w"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["e"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["ew"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;

    ttile += `</tr><tr><td colspan='7'>Bottom V1:</td><td colspan='7'>Bottom V2:</td></tr><tr>`;
    ty = transpixels["BrightTiledB2"];
    tx = transpixels["s"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["w"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["e"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["sw"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["se"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["sew"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["ew"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    ty = transpixels["BrightTiledB1"];
    tx = transpixels["s"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["w"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["e"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["sw"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["se"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["sew"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
    tx = transpixels["ew"];
    ttile += `<td>W: <div style="width:32;height:32;border-style:solid;border-width:2;border-color:black;background-image:url('graphics/TerrainBlend.gif');background-position:${tx}px ${ty}px" id='TerrainBlend.gif ${tx} ${ty}' onclick="transSelection(2,['TerrainBlend.gif','spacer.gif',${tx},${ty}])"></div></td>`;
  }
  ttile += "</tr></table>";

  document.getElementById("translayer2").innerHTML = ttile;
}

let transoptions = ["Mountains", "Hills", "Forest", "Forest [tiled]", "Evergreen", "Bright Forest", "Bright Forest [tiled]", "DeadForest", "DeadEvergreen", "Swamp", "Dirt", "Sand", "Meadow", "Grass"];

let transpixels = {};
transpixels["Swamp"] = -640;
transpixels[5] = -640;
transpixels["Sand"] = -608;
transpixels[4] = -608;
transpixels["Dirt"] = -576;
transpixels[3] = -576;
transpixels["Meadow"] = -544;
transpixels[2] = -544;
transpixels["Grass"] = -512;
transpixels[1] = -512;
transpixels["Mountains"] = -480;
transpixels[10] = -480;
transpixels["Hills"] = -448;
transpixels[9] = -448;
transpixels["Evergreen"] = -416;
transpixels[7] = -416;
transpixels["Bright"] = -384;
transpixels["BrightForest"] = -384;
transpixels["Bright Forest"] = -384;
transpixels[8] = -384;
transpixels["Forest"] = -352;
transpixels[6] = -352;
transpixels["ForestTiledLR"] = -320;
transpixels["ForestTiledLL"] = -288;
transpixels["ForestTiledMR"] = -256;
transpixels["ForestTiledML"] = -224;
transpixels["ForestTiledUR"] = -192;
transpixels["ForestTiledUL"] = -160;
transpixels["BrightTiledB1"] = -128;
transpixels["BrightTiledB2"] = -96;
transpixels["BrightTiledC"] = -64;
transpixels["BrightTiledT1"] = -32;
transpixels["BrightTiledT2"] = 0;
transpixels["DeadForest"] = -672;
transpixels["DeadEvergreen"] = -704;

let transpixelsrev = {};
for (const [key, value] of Object.entries(transpixels)) {
  transpixelsrev[value] = key;
}

let directions = ["n","s","w","e","nw","ne","sw","se","nsw","nse","new","sew","ns","ew"];
transpixels["n"] = 0;
transpixels["s"] = -32;
transpixels["w"] = -64;
transpixels["e"] = -96;
transpixels["nw"] = -128;
transpixels["ne"] = -160;
transpixels["sw"] = -192;
transpixels["se"] = -224;
transpixels["nsw"] = -256;
transpixels["nse"] = -288;
transpixels["new"] = -320;
transpixels["sew"] = -352;
transpixels["ns"] = -384;
transpixels["ew"] = -416;
transpixels["nsew"] = -448;

function transSelection(n,grapharray) {
  let img = `<div style='width:32;height:32;background-image:url("graphics/${grapharray[0]}");background-position: ${grapharray[2]}px ${grapharray[3]}px'></div>`;
  document.getElementById(`translayer${n}image`).innerHTML = img;

  document.getElementById(`layer${n}-3`).value = `${grapharray[3]}`;
  document.getElementById(`layer${n}-2`).value = `${grapharray[2]}`;
  document.getElementById(`layer${n}-1`).value = `${grapharray[1]}`;
  document.getElementById(`layer${n}-0`).value = `${grapharray[0]}`;
}

function clearTransSelections() {
  for (let i=0;i<=2;i++) {
    for (let j=0;j<=3;j++) {
      let lay = `layer${i}-${j}`;
      let line = document.getElementById(lay);
      if (!line) { console.log("Couldn't find " + lay); }
      line.value = "";
    }
  }
}

function generateTransition() {
  console.log(`Generating transition for ${transx}, ${transy}`);
  let tile = amap.getTile(transx,transy).getTerrain();
  let tname = tile.getName();
  let ttier = GetTransTier(tname);
  let directions = "";
  let basedata = {};
  if (ttier) {
    let ntile = amap.getTile(transx,transy-1);
    for (let i=0;i<=10;i++) {
      basedata[i] = 0;
    }
    if (ntile !== "OoB") {
      let ntier = GetTransTier(ntile.getTerrain().getName());
      if (ntier < ttier) { directions += "n"; basedata[ntier]++; }
    }
    let stile = amap.getTile(transx,transy+1);
    if (stile !== "OoB") {
      let stier = GetTransTier(stile.getTerrain().getName());
      if (stier < ttier) { directions += "s"; basedata[stier]++; }
    }
    let etile = amap.getTile(transx+1,transy);
    if (etile !== "OoB") {
      let etier = GetTransTier(etile.getTerrain().getName());
      if (etier < ttier) { directions += "e"; basedata[etier]++; }
    }
    let wtile = amap.getTile(transx-1,transy);
    if (wtile !== "OoB") {
      let wtier = GetTransTier(wtile.getTerrain().getName());
      if (wtier < ttier) { directions += "w"; basedata[wtier]++; }
    }
    if (directions) {
      let mx = 0;
      let mxid = -1;
      for (let i=0;i<=10;i++) {
        if (basedata[i] && (basedata[i] > mx)) {
          mx = basedata[i];
          mxid = i;
        }
      }
      if (mxid === -1) { console.log("Cannot generate transition."); return;}

      if (mxid) {
        if ((!tname.includes("Edge")) && (!tname.includes("Tiling")) && (ttier <= 9)) {
          transSelection(2,["TerrainBlend.gif", "spacer.gif", transpixels[directions], transpixels[ttier]]);
          // document.getElementById("layer2-0").value = "TerrainBlend.gif";
          // document.getElementById("layer2-1").value = "spacer.gif";
          // document.getElementById("layer2-2").value = transpixels[directions];
          // document.getElementById("layer2-3").value = transpixels[ttier];
        } else if (tname.includes("BrightForestEdge")) {
          let tx = transpixels[directions];
          let ty = -1;
          if (tname === "BrightForestEdge") { ty === 0; }
          else if (tname === "BrightForestEdge2") { ty = 128; }
          else if (tname === "BrightForestEdge3") { ty = 96; }
          else if (tname === "BrightForestEdge4") { ty = 64; }
          else if (tname === "BrightForestEdge5") { ty = 32; }
          else { console.log("Failed to find transition for Bright Forest Edge."); }
          if (ty > -1) {
            ty = -1 * ty;
            transSelection(2,["TerrainBlend.gif", "spacer.gif", transpixels[directions], ty]);
          }
        } else if (tname.includes("ForestTiling")) { 
          let ty = -1;
          let tx = transpixels[directions];
          if (tname === "ForestTilingNW") { ty = 160; }
          else if (tname === "ForestTilingNE") { ty = 192; } 
          else if (tname === "ForestTilingW") { ty = 224; }
          else if (tname === "ForestTilingE") { ty = 256; }
          else if (tname === "ForestTilingSW") { ty = 288; }
          else if (tname === "ForestTilingSE") { ty = 320; }
          else { console.log("Failed to find transition tile for Forest Tiling here."); }
          if (ty > -1) {
            ty = -1*ty;
            transSelection(2,["TerrainBlend.gif", "spacer.gif", transpixels[directions], ty]);
          }
        } else if (ttier === 10) {
          let tilingx = (((transy % 2) + transx) % 2) * 32;
          let ty = transpixels["Mountains"];
          let tx = -1;
          if (directions === "n") {
            tx = 0 + tilingx;
          } else if (directions === "s") {
            tx = 64 + tilingx;
          } else if (directions === "w") {
            tx = 128;
          } else if (directions === "e") {
            tx = 160;
          } else if (directions === "nw") {
            tx = 192;
          } else if (directions === "ne") {
            tx = 224;
          } else if (directions === "sw") {
            tx = 256;
          } else if (directions === "se") {
            tx = 288; 
          } else if (directions === "nsw") {
            tx = 320;
          } else if (directions === "nse") {
            tx = 352;
          } else if (directions === "new") {
            tx = 384;
          } else if (directions === "sew") {
            tx = 416;
          } else if (directions === "ns") {
            tx = 448;
          } else if (directions === "ew") {
            tx = 480;
          } else { console.log("Mountain has " + directions + " directions. No good."); }

          if (tx > -1) { 
            tx = -1*tx;
            transSelection(2,["TerrainBlend.gif", "spacer.gif", tx, ty]);
          }
        }

        if (mxid === 1) {  // grass
          transSelection(1,["static.gif", "spacer.gif", -6*32, 0]);
          // document.getElementById("layer1-0").value = "static.gif";
          // document.getElementById("layer1-1").value = "spacer.gif";
          // document.getElementById("layer1-2").value = -6*32;
          // document.getElementById("layer1-3").value = 0;
        } else if (mxid === 2) { // meadow
          transSelection(1,["static.gif", "spacer.gif", 0, 0]);
          // document.getElementById("layer1-0").value = "static.gif";
          // document.getElementById("layer1-1").value = "spacer.gif";
          // document.getElementById("layer1-2").value = 0;
          // document.getElementById("layer1-3").value = 0;
        } else if (mxid === 3) { // dirt
          transSelection(1,["static.gif", "spacer.gif", 0, -64]);
          // document.getElementById("layer1-0").value = "static.gif";
          // document.getElementById("layer1-1").value = "spacer.gif";
          // document.getElementById("layer1-2").value = 0;
          // document.getElementById("layer1-3").value = -64;
        } else if (mxid === 4) { // sand
          transSelection(1,["static.gif", "spacer.gif", -4*32, 0]);
          // document.getElementById("layer1-0").value = "static.gif";
          // document.getElementById("layer1-1").value = "spacer.gif";
          // document.getElementById("layer1-2").value = -4*32;
          // document.getElementById("layer1-3").value = 0;
        } else if (mxid === 5) { // swamp
          transSelection(1,["static.gif", "spacer.gif", -9*32, 0]);
          // document.getElementById("layer1-0").value = "static.gif";
          // document.getElementById("layer1-1").value = "spacer.gif";
          // document.getElementById("layer1-2").value = -9*32;
          // document.getElementById("layer1-3").value = 0;
        } else if ((mxid >= 6) && (mxid <= 8)) {
          transSelection(1,["static.gif", "spacer.gif", -6*32, 0]);
          // if surrounded by forests of any type, use grass as the underlying stuff
        } else if (mxid === 9) {
          transSelection(1,["static.gif", "spacer.gif", -256, 0]);
          // use the single bump hill by default, but see if I should use the rolling hills
          // made the change!
        } else {
          // mxid is 0, so it's anything not accounted for above. Most likely, water, possibly cobblestone/wood
          // think I'll assume we want a solid line before any kind of actual floor
        }
      }
    }
  }
}

function GetTransTier(tname) {
  if (tname.includes("Mountain")) { return 10; }
  else if (tname.includes("Hill")) { return 9; }
  else if (tname.includes("BrightForest")) { return 8; }
  else if (tname.includes("Evergreen")) { return 7; }
  else if (tname.includes("Forest")) { return 6; }
  else if (tname.includes("Swamp")) { return 5; }
  else if (tname.includes("Sand")) { return 4; }
  else if (tname.includes("Dirt")) { return 3; }
  else if (tname.includes("Meadow")) { return 2; }
  else if (tname.includes("Grass")) { return 1; }
  else if (tname.includes("River")) { return 1; }
  else if (tname.includes("Brush")) { return 1; }
  else if (tname.includes("Underbrush")) { return 1; }
  return 0;
}

function submitTransition(val) {
  if (val === 0) { return; } // cancel
  let coord = `${transx},${transy}`;
  if (val === 1) {  // submit
    let tarr = [];
    if (document.getElementById("layer2-0").value) {
      tarr[0] = [ document.getElementById("layer0-0").value, document.getElementById("layer0-1").value, parseInt(document.getElementById("layer0-2").value), parseInt(document.getElementById("layer0-3").value) ];
      tarr[1] = [ document.getElementById("layer1-0").value, document.getElementById("layer1-1").value, parseInt(document.getElementById("layer1-2").value), parseInt(document.getElementById("layer1-3").value) ];
      tarr[2] = [ document.getElementById("layer2-0").value, document.getElementById("layer2-1").value, parseInt(document.getElementById("layer2-2").value), parseInt(document.getElementById("layer2-3").value) ];
      if (tarr[1][0] && tarr[2][0]) { 
        if (!amap.transover) { amap.transover = {}; }
        amap.transover[coord] = tarr; 
        RedrawTile(transx,transy);
      }
      else { alert("Incomplete selections."); }
    }
  } else if (val === -1) { // delete
    delete amap.transover[coord];
    RedrawTile(transx,transy);
  }
}

function automaticTransition(x,y) {
  transx = x;
  transy = y;
  CreateTransitionModal();
  document.getElementById("transitionbubble").style.visibility = "hidden";

  clearTransSelections();

  generateTransition();
  if (document.getElementById("layer1-0").value && document.getElementById("layer2-0").value) {
    submitTransition(1);
  }
}

function areaTransition(x1,y1,x2,y2,terraintype) {
  if (x1 > x2) { let tmp = x1; x1=x2; x2=tmp; }
  if (y1 > y2) { let tmp = y1; y1=y2; y2=tmp; }
  for (let i=x1;i<=x2;i++) {
    for (let j=y1;j<=y2;j++) {
      let tile = amap.getTile(i,j).getTerrain();
      if ((terraintype === "Grass") && (tile.getName() === "Grass")) { automaticTransition(i,j); }
      else if ((terraintype === "Meadow") && (tile.getName() === "Meadow")) { automaticTransition(i,j); }
      else if ((terraintype === "Sand") && (tile.getName() === "Sand")) { automaticTransition(i,j); }
      else if ((terraintype === "Dirt") && (tile.getName() === "Dirt")) { automaticTransition(i,j); }
      else if ((terraintype === "Swamp") && (tile.getName() === "Swamp")) { automaticTransition(i,j); }
      else if ((terraintype === "Forest") && ((tile.getName() === "Forest") || (tile.getName() === "Forest2") || (tile.getName().includes("ForestTiling")))) { automaticTransition(i,j); }
      else if ((terraintype === "Evergreen") && (tile.getName().includes("Evergreen"))) { automaticTransition(i,j); }
      else if ((terraintype === "BrightForest") && (tile.getName().includes("BrightForest"))) { automaticTransition(i,j); }
      else if ((terraintype === "Hills") && (tile.getName().includes("Hills"))) { automaticTransition(i,j); }
      else if ((terraintype === "Mountain") && (tile.getName().includes("Mountain")) && (tile.getName() !== "FlameMountain")) { automaticTransition(i,j); }
    }
  }
}

function areaDeleteTransition(x1,y1,x2,y2,terraintype) {
  if (x1 > x2) { let tmp = x1; x1=x2; x2=tmp; }
  if (y1 > y2) { let tmp = y1; y1=y2; y2=tmp; }
  for (let i=x1;i<=x2;i++) {
    for (let j=y1;j<=y2;j++) {
      let coord = `${i},${j}`;
      let tile = amap.getTile(i,j).getTerrain();
      if ((terraintype === "Grass") && (tile.getName() === "Grass")) { delete amap.transover[coord]; }
      else if ((terraintype === "Meadow") && (tile.getName() === "Meadow")) { delete amap.transover[coord]; }
      else if ((terraintype === "Sand") && (tile.getName() === "Sand")) { delete amap.transover[coord]; }
      else if ((terraintype === "Dirt") && (tile.getName() === "Dirt")) { delete amap.transover[coord]; }
      else if ((terraintype === "Swamp") && (tile.getName() === "Swamp")) { delete amap.transover[coord]; }
      else if ((terraintype === "Forest") && ((tile.getName() === "Forest") || (tile.getName() === "Forest2") || (tile.getName().includes("ForestTiling")))) { delete amap.transover[coord]; }
      else if ((terraintype === "Evergreen") && (tile.getName().includes("Evergreen"))) { delete amap.transover[coord]; }
      else if ((terraintype === "BrightForest") && (tile.getName().includes("BrightForest"))) { delete amap.transover[coord]; }
      else if ((terraintype === "Hills") && (tile.getName().includes("Hills"))) { delete amap.transover[coord]; }
      else if ((terraintype === "Mountain") && (tile.getName().includes("Mountain")) && (tile.getName() !== "FlameMountain")) { delete amap.transover[coord]; }
    }
  }
}

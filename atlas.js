
function Atlas() {

  this.key = {
    "WE" : "BlankWhite",   // 0
    "BlankWhite" : "WE",
    "WW" : "Ocean",   // 1
    "Ocean" : "WW",  
    "ww" : "Water",   // 2
    "Water" : "ww",  
    "uu" : "Shallows", // 3
    "Shallows" : "uu",
    '^^' : "Mountain", // 4
    "Mountain" : '^^', 
    '$=' : "LeftCastle", // 5
    "LeftCastle" : '$=',
    '=$' : "RightCastle", // 6
    "RightCastle" : '=$', 
  // 7-10 are features
    '%%' : "StoneWall", // 11
    "StoneWall" : '%%',
  // 12 is a feature
    '#%' : "Stone",     // 13
    "Stone": '#%',
    '#*' : "Mast",  // 14
    "Mast" : '#*',
    '#!' : "Rigging", // 15
    "Rigging" : '#!',
    '+o' : "Pillar", // 16
    "Pillar" : '+o',
    'u`' : "FountainSW", // 17
    "FountainSW" : 'u`',
    '/u' : "FountainSE", // 18
    "FountainSE" : '/u',
    'u/' : "FountainNW", // 19
    "FountainNW" : 'u/',
    '`u' : "FountainNE", // 20
    "FountainNE" : '`u',
// 21-24 are features
    '_A' : "LetterA",  //25
    "LetterA" : '_A',
    '_B' : "LetterB",  //26
    "LetterB" : '_B',
    '_C' : "LetterC",  //27
    "LetterC" : '_C', 
    '_D' : "LetterD",  //28
    "LetterD" : '_D',
    '_E' : "LetterE",  //29
    "LetterE" : '_E',
    '_F' : "LetterF",  //30
    "LetterF" : '_F',
    '_G' : "LetterG",  //31
    "LetterG" : '_G',
    '_H' : "LetterH",  //32
    "LetterH" : '_H',
    '_I' : "LetterI",  //33
    "LetterI" : '_I',
    '_J' : "LetterJ",  //34
    "LetterJ" : '_J',
    '_K' : "LetterK",  //35
    "LetterK" : '_K',
    '_L' : "LetterL",  //36
    "LetterL" : '_L',
    '_M' : "LetterM",  //37
    "LetterM" : '_M',
    '_N' : "LetterN",  //38
    "LetterN" : '_N',
    '_O' : "LetterO",  //39
    "LetterO" : '_O',
    '_P' : "LetterP",  //40
    "LetterP" : '_P',
    '_Q' : "LetterQ",  //41
    "LetterQ" : '_Q',
    '_R' : "LetterR",  //42
    "LetterR" : '_R',
    '_S' : "LetterS",  //43
    "LetterS" : '_S',
    '_T' : "LetterT",  //44
    "LetterT" : '_T',
    '_U' : "LetterU",  //45
    "LetterU" : '_U',
    '_V' : "LetterV",  //46
    "LetterV" : '_V',
    '_W' : "LetterW",  //47
    "LetterW" : '_W',
    '_X' : "LetterX",  //48
    "LetterX" : '_X',
    '_Y' : "LetterY",  //49
    "LetterY" : '_Y',
    '_Z' : "LetterZ",  //50
    "LetterZ" : '_Z',
    '::' : "HorizontalCounter", // 51
    "HorizontalCounter" : '::',
    ':]' : "RightCounter",  // 52
    "RightCounter" : ':]', 
    '[:' : "LeftCounter", // 53
    "LeftCounter" : '[:',
    '[]' : "CounterBox",  // 54
    "Counterbox" : '[]',
    'BK' : "BlankBlack", // 55
    "BlankBlack" : 'BK',
    '##' : "Wall", // 56
    "Wall" : '##',
    '#+' : "ArrowSlit",
    "ArrowSlit" : '#+',
    '#O' : "Window",
    "Window" : '#O',
    '+`' : "WallNE", // 57
    "WallNE" : '+`',
    '/+' : "WallNW", // 58
    "WallNW" : '/+',
    '`+' : "WallSW", // 59
    "WallSW" : '`+',
    '+/' : "WallSE", // 60
    "WallSE" : '+/', 
    '()' : "VerticalCounter", // 61
    "VerticalCounter" : '()',
    '(_' : "BottomCounter", // 62
    "BottomCounter" : '(_',
    '(^' : "TopCounter", // 63
    "TopCounter" : '(^',
// 64 - 67 is features (doors)
    '+D' : "Doorway", // 68
    "Doorway" : '+D',
    '!!' : "PlanksNS", // 69
    "PlanksNS" : '!!',
// 70 - 72 are features (bridges)
    '__' : "SouthCoast", // 73
    "SouthCoast" : '__',
    '--' : "NorthCoast", // 74
    "NorthCoast" : '--',
    '.|' : "EastCoast", // 75
    "EastCoast" : '.|',
    '|.' : "WestCoast", // 76
    "WestCoast" : '|.',
    '.`' : "NortheastCoast", // 77
    "NortheastCoast" : '.`',
    '`.' : "SouthwestCoast", // 78
    "SouthwestCoast" : '`.', 
    '/.' : "NorthwestCoast", // 79
    "NorthwestCoast" : '/.',
    './' : "SoutheastCoast", // 80
    "SoutheastCoast" : './',
// 101-102 are features (bridge)
    '++' : "Cobblestone", // 103
    "Cobblestone" : '++',
    '-=' : "PlanksEW", // 104
    "PlanksEW" : '-=',
// 105 is a feature or an NPC, depending
    '..' : "Grass", // 121
    "Grass" : '..',
    ',,' : "Brush", // 122
    "Brush" : ',,',
    ',|' : "BrushECoast",
    "BrushECoast" : ',|',
    '|,' : "BrushWCoast",
    "BrushWCoast" : '|,',
    '_,' : "BrushSCoast",
    "BrushSCoast" : '_,',
    '-,' : "BrushNCoast",
    "BrushNCoast" : '-,',
    ';;' : "Forest", // 123
    "Forest" : ';;',
    '|;' : "ForestWCoast",
    "ForestWCoast" : '|;',
    ';|' : "ForestECoast",
    "ForestECoast" : ';|',
    '_;' : "ForestSCoast",
    "ForestSCoast" : '_;',
    '-;' : "ForestNCoast",
    "ForestNCoast" : '-;',
    'nn' : "Hills", // 124
    "Hills" : 'nn',
    '+*' : "PurpleCobblestone", // 125
    "PurpleCobblestone" : '+*',
// 126 is a feature (bridge)
    'ff' : "Swamp", // 141
    "Swamp" : 'ff',
// 142 - 146 are features
    '~~' : "Lava", // 147
    "Lava" : '~~',
    '@D' : "Dungeon", // 151
    "Dungeon" : '@D',
    '@T' : "Towne", // 152
    "Towne" : '@T',
    '@K' : "Keep", // 153
    "Keep" : '@K',
    '@V' : "Village", // 154
    "Village" : '@V',
    '@C' : "Castle", // 155
    "Castle" : '@C',
    '@S' : "Shrine", // 156
    "Shrine" : '@S', 
    '@R' : "Ruins", // 157
    "Ruins" : '@R',
    'nT' : "HillTower",
    "HillTower" : 'nT',
    '.T' : "GrassTower",
    "GrassTower" : '.T',
    "RiverNS" : '||',
    '||' : "RiverNS",
    "RiverEW" : '==',
    '==' : "RiverEW",
    "RiverNE" : '`=',
    '`=' : "RiverNE",
    "RiverSE" : '/=',
    '/=' : "RiverSE",
    "RiverNW" : '=/',
    '=/' : "RiverNW",
    "RiverSW" : '=`',
    '=`' : "RiverSW",
    "RiverTtop" : '-L',
    '-L' : "RiverTtop",
    "RiverTbottom" : 'TT',
    'TT' : "RiverTbottom",
    "RiverTleft" : '=|',
    '=|' : "RiverTleft",
    "RiverTright" : '|=',
    '|=' : "RiverTright",
    "RiverSourceN" : 'xv',
    'xv' : "RiverSourceN",
    "RiverSourceS" : 'x^',
    'x^' : "RiverSourceS",
    "RiverSourceE" : 'x=',
    'x=' : "RiverSourceE",
    "RiverSourceW" : '=x',
    '=x' : "RiverSourceW"

    
// 158-159 are features
// 200-206 are features

  }

 // this.pages = new Array();  // array of condensed maps
  // might remove this and use seperate Page objects external to but referenced exclusively by the Atlas

}

Atlas.prototype.keylookup = function(entry) {
  if (this.key[entry]) {  return this.key[entry];  }
  else {alert("Key lookup unsuccessful for " + entry); return 0; }

}

// Page object- condensed map

function Acre() {

  this.terrain = "";
  this.features = new Collection;
  this.npcs = new Collection;

}

// Map Object - one per map.

function GameMap() {

  this.data = new Array;
// Each entry in the array will be an Object with .terrain, .features, and .npcs

  this.enterx = 0;
  this.entery = 0;
  this.name = "";  

  this.features = new Collection;  // list of all features on the map
  this.npcs = new Collection; // list of all NPCs on the map
// these two will be maintained concurrently with collections on individual tiles/acres

  this.desc = "";
  this.music = "";
  this.exitTo = new Object;
  this.exitTo.mapname = "darkunknown";
  this.exitTo.x = 65;
  this.exitTo.y = 70;
  this.wraps = 0;
}

GameMap.prototype.setName = function(name) {
  this.name = name;
  return this.name;
}

GameMap.prototype.getName = function() {
  return this.name;
}

// This should not be used externally
GameMap.prototype.setTile = function(x,y,tile) {
  this.data[y][x] = tile;
  return this.data[y][x];
}

GameMap.prototype.getTile = function(x,y) {
  return this.data[y][x];
  // FIXME - should return terrain, features, and NPCs
  // now returns an object that has all three
}

// generate the tile from the factory first, then pass it to setTerrain
GameMap.prototype.setTerrain = function(x,y,terrain) {
  // hopefully usually called by click on the map
//  var tile = localFactory.createTile(terrain.name);
  var tile = eidos.getForm(terrain.getName());
  if (tile) {
    this.data[y][x] = new Acre;
    this.data[y][x].terrain = tile;
    return this.data[y][x].terrain;
  }
  return 0;
  
}

GameMap.prototype.resizeMap = function(newx,newy,anchor){
  var oldx = this.data[0].length;
  var oldy = this.data.length;
  if (debug ) {
    debugscreen.document.writeln(oldx + " " + oldy + " to " + newx + " " + newy + ", anchor is " + anchor + "<br><br>");
  }
  var tile = new Acre;
  tile.terrain = localFactory.createTile(selectionval.name);
  
  if ((newx) && (newx != oldx)) {
    for (i = 1; i <= Math.abs(newx-oldx); i++) {
      for (j=0;j<this.data.length;j++) {
        if ((anchor == 0) || (anchor == 3) || (anchor == 6)) {
          if (newx > oldx) {  
            this.data[j].push(tile);  
          }
          else if (oldx > newx ) { 
            this.data[j].pop();
          }
        }
        else if ((anchor == 2) || (anchor == 5) || (anchor == 8)) {
          if (newx > oldx) { 
            this.data[j].unshift(tile); 
          }
          else if (oldx > newx) { 
            this.data[j].shift(); 
          }
        }
        else if ((anchor == 1) || (anchor == 4) || (anchor == 7)) {
          if ((newx > oldx) && (i%2 == 1)) { 
            this.data[j].push(tile); 
          }
          else if ((newx > oldx) && (i%2 == 0)) { 
            this.data[j].unshift(tile); 
          }
          else if ((oldx > newx) && (i%2 == 1)) { 
            this.data[j].pop(); 
          }
          else if ((oldx > newx) && (i%2 == 0)) { 
            this.data[j].shift(); 
          }
        }
      }
    }
  }
  if ((newy) && (newy != oldy)) { 
    for (i = 1; i <= Math.abs(newy-oldy); i++) {
      if (newy > oldy) {
        var placeholder = new Array();
        for (j=0; j<this.data[0].length;j++) { placeholder.push(tile); }
        if ((anchor == 0) || (anchor == 1) || (anchor == 2)) {
          this.data.push(placeholder);
        }
        else if ((anchor == 6) || (anchor == 7) || (anchor == 8)) {
          this.data.unshift(placeholder);
        }
        else if ((anchor == 3) || (anchor == 4) || (anchor == 5)) {
          if (i%2 == 0) { 
            this.data.push(placeholder); 
          }
          else if (i%2 == 1) { 
            this.data.unshift(placeholder); 
          }
        }
      }
      else if (oldy > newy) {
        if ((anchor == 0) || (anchor == 1) || (anchor == 2)) {
          this.data.pop();
        }
        else if ((anchor == 6) || (anchor == 7) || (anchor == 8)) {
          this.data.shift(); 
        }
        else if ((anchor == 3) || (anchor == 4) || (anchor == 5)) {
          if (i%2 == 0) { 
            this.data.pop(); 
          }
          else if (i%2 == 1) { 
            this.data.shift(); 
          }
        }
      }
    }
  }
  if (debug) {
    debugscreen.document.writeln("Done: " + this.data.length + " " + this.data[0].length + "<br><br>");
  }
  this.setFeaturesCoord();
  this.setNPCsCoord();
  drawMap();
}

GameMap.prototype.setFeaturesCoord = function() {
  for (var i = 0; i<=this.data.length-1; i++) {
  	for (var j = 0; j<=this.data[0].length-1; j++){
  		var featuresarray = this.data[i][j].features.getAll();
  		for (var ind = 0; ind<=featuresarray.length-1; ind++) {
  			featuresarray[ind].x = j;
  			featuresarray[ind].y = i;
  		}
  	}
  }
}

GameMap.prototype.setNPCsCoord = function() {
  for (var i = 0; i<=this.data.length-1; i++) {
  	for (var j = 0; j<=this.data[0].length-1; j++){
  		var npcsarray = this.data[i][j].npcs.getAll();
  		for (var ind = 0; ind<=npcsarray.length-1; ind++) {
  			npcsarray[ind].x = j;
  			npcsarray[ind].y = i;
  		}
  	}
  }
}


GameMap.prototype.placeThing = function(x,y,newthing) {
  if (newthing) {
  	var type = newthing.type + "s";
  	newthing.x = x;
  	newthing.y = y;
    this[type].addTop(newthing);

    if (!this.data[y][x][type]) {
      this.data[y][x][type] = new Collection;
    }
    this.data[y][x][type].addTop(newthing);
  }  
}

GameMap.prototype.moveThing = function(x,y,thing) { // this is called after bump and passable and before walkon
		this.data[thing.y][thing.x][thing.type].deleteFrom(thing);
    this.data[y][x][thing.type].addTop(newthing);
}

GameMap.prototype.deleteThing = function(thing) {
	this[thing.type].deleteFrom(thing);
	this.data[thing.y][thing.x][thing.type].deleteFrom(thing);
}


GameMap.prototype.saveMap = function (name) {
 if (name == '') {
   name = prompt("Map Name", "");
 }
 var printerwin = window.open('','printarray');
 printerwin.document.writeln('mappages["' + name + '"] = new Object();');
 var oldname=name;
 name = 'mappages["' + name + '"].terrain';
 printerwin.document.writeln(name + " = new Array;");
 var maxindex = this.data.length-1;
 for (var i=0;i<=maxindex;i++) {
 	 var saveind = i;
// 	 while (saveind.toString().length < maxindex.toString().length) {
// 	 	 saveind = "0" + saveind;
// 	 }
   var n = maxindex.toString().length - saveind.toString().length;
   if (n > 0) {
   	for (var m = 1; m<=n; m++) {
   		printerwin.document.write(" ");
   	}
   }
   printerwin.document.write(name + "[" + saveind + "] = '");
   for (var j=0;j<=this.data[0].length-1;j++) {
     var savethis = this.data[i][j].terrain.serialize();
     if (j != 0) {
       printerwin.document.write(" ");
     }
     printerwin.document.write(""+savethis);
   }
   printerwin.document.write("';\n");
 }
 // ADD FEATURES/NPCs
 name = 'mappages["' + oldname + '"].features';
 printerwin.document.write("\n" + name + " = new Array;\n");
 for (var i=0;i<=this.features.container.length-1;i++) {
   printerwin.document.write(name + "[" + i + "] = {name : '" + this.features.container[i].name + "',");
   printerwin.document.write(" x : " + this.features.container[i].x + ", y : " + this.features.container[i].y);
   // overrides
   var baseobj = localFactory.createTile(this.features.container[i].name);
 //  for (var props in baseobj) {
 //  	 if (baseobj[props] != this.features.container[i][props]) {
 //  	 	 printerwin.document.write(", " + props + " : " + this.features.container[i][props]);
 //  	 }
 //  }
   if (baseobj.getDesc() != this.features.container[i].getDesc()) {
   	 var thedesc = this.features.container[i].getDesc();
     printerwin.document.write(", desc : \"" + thedesc + "\"");
   }
   if ((baseobj.getLocked != null) && (baseobj.getLocked() != this.features.container[i].getLocked())) {
   	 printerwin.document.write(", locked : " + this.features.container[i].getLocked());
   }
   if (baseobj.getEnterMap != null) {
   	 var mapdest = this.features.container[i].getEnterMap();
   	 printerwin.document.write(", entermap : '" + mapdest.entermap + "', enterx : " + mapdest.enterx + ", entery : " + mapdest.entery);
   }
   printerwin.document.write("};\n");
 }
 printerwin.document.close();
}

GameMap.prototype.loadMap = function (name) {
  this.data = new Array;
  var loadfrom = mappages.readPage(name, "terrain");
  var localatlas = new Atlas;
  for (var i=0;i<=loadfrom.length-1;i++) {
    if (debug) {debugscreen.document.writeln("<br>Starting line: " +i+ ", length " + loadfrom[i].length + " <br>");}
    var tileserials = new Array;
    tileserials = loadfrom[i].split(" ");
    this.data[i] = new Array();
    for (var j=0;j<=tileserials.length-1;j++) {
      if (debug) {debugscreen.document.writeln(" " + tileserials[j]);}
      var loadedtile = localatlas.key[tileserials[j]];
      this.data[i][j] = new Acre;
      this.data[i][j].terrain = localFactory.createTile(loadedtile);
      this.data[i][j].terrain.setHomeMap(this);
    }
  }
  var loadfeatures = mappages.readPage(name, "features");
  this.features = new Collection;
  if (loadfeatures) {
//  	alert(loadfeatures.length + " features loading...");
    for (var i=0;i<=loadfeatures.length-1;i++) {
    	var newfeature = localFactory.createTile(loadfeatures[i].name);
    	for (var featurekey in loadfeatures[i]) {
    		if (featurekey == "name") { continue; }
    		if (featurekey == "locked") { newfeature.lockMe(loadfeatures[i]["locked"]); continue; }
    		newfeature[featurekey] = loadfeatures[i][featurekey];
    	}
  	  this.placeThing(loadfeatures[i].x,loadfeatures[i].y,newfeature);
    }
  }
  this.setName(name);
  return;
}


function Pages() {

  this["test"] = new Object();
  this["test"].terrain = new Array;
  this["test"].terrain[0] = "WW WW WW WW WW";
  this["test"].terrain[1] = "WW ww ww ww WW";
  this["test"].terrain[2] = "WW ww uu ww WW";
  this["test"].terrain[3] = "WW ww ww ww WW";
  this["test"].terrain[4] = "WW WW WW WW WW";

}

Pages.prototype.readPage = function (name,type) {

  return this[name][type];
  
}


function Platonic() {

  this.data = new Array;

}

Platonic.prototype.getForm = function (name) {

  if (this.data[name]) {
    return this.data[name];
  }
  else {
    this.data[name] = localFactory.createTile(name);
    return this.data[name];
  }

}

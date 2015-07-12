
function ProtoObject() {
  this.nosave = 0;
}
ProtoObject.prototype = new Object();

ProtoObject.prototype.getSerial = function() {
  if (!this.serial) {
    this.assignSerial();
  }
	return this.serial;
}

ProtoObject.prototype.assignSerial = function() {
  if (gamestate && (gamestate.getMode() !== "gameload")) {
   	maxserial++;
	  this.serial = maxserial;
	  if (debug) { dbs.writeln("Serial #" + maxserial + " assigned to " + this.getName() + "<br />"); }
//	universe[this.serial] = this;
  }
}

ProtoObject.prototype.setType = function(type) {
	this.type = type;
}

ProtoObject.prototype.getType = function() {
	return this.type;
}

ProtoObject.prototype.addType = function(type) {
  type = type.toLowerCase();
  this.type = this.type + "X" + type + "X";
}

ProtoObject.prototype.checkType = function(type) {
  type = type.toLowerCase();
  var patt = new RegExp("X"+type+"X");
  if (patt.test(this.type)) {
    return 1;
  } else { return 0; }
}

ProtoObject.prototype.getTypeForMap = function() {
  // run check for npc, pc, and feature
  var patt = new RegExp("XfeatureX");
  if (patt.test(this.type)) {
    return ("feature");
  }
  patt = new RegExp("XpcX");
  if (patt.test(this.type)) {
    return ("pc");
  }
  patt = new RegExp("XnpcX");
  if (patt.test(this.type)) {
    return ("npc");
  }
  return;
}

ProtoObject.prototype.getName = function() {
	return this.name;
}

ProtoObject.prototype.setName = function(newname) {  // USE SPARINGLY
  this.name = newname;
	return this.name;
}

function GameObject() {
  this.x;
  this.y;
  
  this.type = "XGameObjectX";
}
GameObject.prototype = new ProtoObject();

GameObject.prototype.getx = function() {
	return parseInt(this.x,10);
}

GameObject.prototype.setx = function(x) {
	if (isNaN(parseInt(x))) { alert("X being set to a string."); }
  this.x = parseInt(x,10);
}

GameObject.prototype.gety = function() {
	return parseInt(this.y,10);
}

GameObject.prototype.sety = function(y) {
	if (isNaN(parseInt(y))) { alert("Y being set to a string."); }
  this.y = parseInt(y,10);
}

GameObject.prototype.setHomeMap = function(mapref) {
  this.homeMap = mapref;
  return this.homeMap;
}

GameObject.prototype.getHomeMap = function() {
  return this.homeMap;
}

GameObject.prototype.setDesc = function(newdesc) {
	this.desc = newdesc;
}

GameObject.prototype.getDesc = function() {
	return this.desc;
}

GameObject.prototype.setPrefix = function(newpref) {
	this.prefix = newpref;
}

GameObject.prototype.getPrefix = function() {
  if (this.prefix) {
	  return this.prefix;
	} else {
	  return "";
	}
}

GameObject.prototype.moveTo = function(x,y) {
	this.homeMap.moveThing(this,x,y)
}

GameObject.prototype.bumpinto = function(who) {
	var retval = {};
	retval["canmove"] = 1;
	retval["msg"] = "";
  return(retval);
}

GameObject.prototype.copy = function(type) {
  if (type === "clean") {
    var tilename = this.name;
    return localFactory.createTile(tilename);
  }
  
  var savename = this.getName();
  if (debug) { dbs.writeln("<br /><span style='font-weight:bold'><br />Copying " + savename + ", serial " + this.getSerial() + ":</span><br />"); }
  var base_version = eidos.getForm(this.getName());
  var copydata = {};
  var copies = [];
  copies[0] = copydata;
  copydata.traceback = [];    // traceback holds the places this was found. On a map or in the timeline are the main options.
//  var copyserial = this.getSerial();
  copydata.name = this.getName(); 
  var ontime = DUTime.findEntityTime(this);
  if (ontime !== -1) {
    copydata.timestamp = ontime;
    copydata.traceback.push("timeline");
  }
  $.each(this, function(idx, val) {
    if ((typeof val === "function") && (typeof base_version[idx] === "function")) { 
      if (debug) { dbs.writeln("<span style='color:grey'>" + idx + " is a function, moving on...</span>  "); }
      return;
      // both have a function. Assuming they're the same, not worth caring
    }
    if (typeof val === "function") {  // real one has a function base one does not
      alert("Function on " + this.getName() + ": " + idx);
    }
    if (typeof val !== "object") { 
      if (val != base_version[idx]) {
        copydata[idx] = val;
        if (debug) { dbs.writeln(idx + " different, copying... "); }
      } else {
        if (debug) { dbs.writeln("<span style='color:grey'>" + idx + " the same, moving on...</span>  "); }
      }
    } else if ($.isArray(val)) {
      if ($.isArray(base_version[idx]) && arrayCompare(val, base_version[idx])) {
        if (debug) { dbs.writeln("<span style='color:grey'>" + idx + " an array and the same, moving on...</span>  "); }
      } else {
        copydata[idx] = val;
        if (debug) { 
          dbs.writeln(idx + " an array and different, copying... <br /> ["); 
          for (var i = 0; i < val.length; i++) { dbs.writeln(val[i] + ", "); }
          dbs.writeln("] vs [");
          if ($.isArray(base_version[idx])) {
            for (var i = 0; i < base_version[idx].length; i++) { dbs.writeln(base_version[idx][i] + ", "); }
          } else {
            dbs.writeln("Not an array");
          }
          dbs.writeln("]. <br />");
        }
      }
    } else if (idx === "homeMap") {
      copydata.homeMap = val.getName();
      copydata.traceback.push("homeMap");
      if (debug) { dbs.writeln(idx + " copied... "); }
    } else if (idx === "resists") {
      if ((typeof base_version[idx] === "object") && objectCompare(val, base_version[idx])) {
        if (debug) { dbs.writeln("<span style='color:grey'>" + idx + " an object and the same, moving on...</span>  "); }
      } else {
        copydata[idx] = val;
        if (debug) {
          dbs.writeln(idx + " an array and different, copying... ");
        }
      }
    } else if ((idx === "currentDestination") || (idx === "lastLocation")) {
      copydata[idx] = val;
      if (debug) { dbs.writeln(idx + " different, copying... "); }
    } else if ((idx === "currentPoI") || (idx === "losupclose")){
      copydata[idx] = {};
      if (debug) { dbs.writeln(idx + " deliberately not saved... "); }
    } else if (idx === "spawned") { 
      // for things with collections
      var spawnlist = val.getAll();
      var spawnserials = [];
      $.each(spawnlist, function(spaidx,spaval) {
        spawnserials.push(spaval.getSerial());
      });
      copydata[idx] = spawnserials;
      if (debug) { dbs.writeln("<span style='color:purple'>" + idx + " saved as serials, serial# " + copydata[idx] + "...</span> "); }
    } else if ((idx === "equippedTo") || (idx === "attachedTo")) {
      if (val) {
        copydata[idx] = val.getSerial();
        if (debug) { dbs.writeln("<span style='color:purple'>" + idx + " saved as serial, serial# " + copydata[idx] + "...</span> "); }
      } else {
        if (debug) { dbs.writeln("<span style='color:purple'>" + idx + " is empty, not saved...</span> "); }
      }
    } else if (idx === "equipment") {
      copydata[idx] = {};
      $.each(val, function(eqidx, eqval) {
        if (eqval) {
          if (debug) { dbs.writeln("<span>" + idx + ": " + eqidx + " being copied in a subthread...</span> <br /><nbsp /><nbsp />"); }
          var equipcopy = eqval.copy();
          copydata[idx][eqidx] = equipcopy[0].serial;
          copies.push(equipcopy[0]);   // using index rather than each here because equipment can't chain farther
          if (debug) { dbs.writeln("<span>Copy made, " + eqidx + " added as serial to main object...</span> "); }
        }
      });
    } else if (idx === "inventory") {
      var inv = val.getAll();
      copydata[idx] = [];
      $.each(inv, function(invidx, invval) {
        if (debug) { dbs.writeln("<span>" + idx + ": " + invidx + " being copied in a subthread...</span> <br /><nbsp /><nbsp />"); }
        var invcopy = invval.copy();
        copydata[idx][invidx] = invcopy[0].serial;
        copies.push(invcopy[0]);   // using index rather than each here as well for the same reason
        if (debug) { dbs.writeln("<span>Copy made, " + invidx + " added as serial to main object...</span> "); }
      });
    } else if (idx === "spellEffects") {
      var spells = val.getAll();
      copydata[idx] = [];
      $.each(spells, function(spellidx, spellval) {
        if (debug) { dbs.writeln("<span>" + idx + ": " + spellidx + " being copied in a subthread...</span> <br /><nbsp /><nbsp />"); }
        var spellcopy = spellval.copy();
        copydata[idx].push(spellcopy.serial);
        copies.push(spellcopy[0]);  // probably should make this each as future proofing
        if (debug) { dbs.writeln("<span>Copy made, " + spellidx + " added as serial to main object...</span> "); }
      });
    } else if (idx === "spellsknown") {
      if (objectCompare(val, base_version[idx])) {
        if (debug) { dbs.writeln("<span style='color:grey'>" + idx + " an object and the same, moving on...</span>  "); }
      } else {
        copydata[idx] = val;
        dbs.writeln("<span style='color:purple'>" + idx + " different, saved.</span>");
      }
    } else if (idx === "runes") {
      if (objectCompare(val, base_version[idx])) {
        if (debug) { dbs.writeln("<span style='color:grey'>" + idx + " an object and the same, moving on...</span>  "); }
      } else {
        copydata[idx] = val;
        dbs.writeln("<span style='color:purple'>" + idx + " different, saved.</span>");
      }
    } else {
      if (debug) { dbs.writeln("<br /><span style='color:red'>" + idx + " is type " + typeof val + "</span>,  "); }
      alert(savename + " SAVE NEEDS " + idx + "!");
    }
    // ADD HERE WHEN THERE ARE MORE
    
  });
  
  if (debug) { dbs.writeln("<br /><span style='font-weight:bold'>Copying " + copies.length + " objects.</span><br />  "); }
  return copies;
  
}

GameObject.prototype.setGraphic = function(newgraphic) {
	this.graphic = newgraphic;
}

GameObject.prototype.setGraphicArray = function(newgraphics) {
	this.graphic = newgraphics[0];
	this.overlay = newgraphics[1];
	this.spritexoffset = newgraphics[2];
	this.spriteyoffset = newgraphics[3];
}

GameObject.prototype.getGraphic = function() {
	var returnGraphic = this.graphic;

  if (returnGraphic) { return(returnGraphic); }
}

GameObject.prototype.getGraphicArray = function() {
	var returnGraphic = this.graphic;
  var returnOverlay = this.overlay;
  var returnVars = [];
  returnVars[0] = returnGraphic;
  if (returnOverlay) {
    returnVars[1] = returnOverlay;
  }
  else {
  	returnVars[1] = "spacer.gif";
  }
  if (this.spritexoffset) {
    returnVars[2] = this.spritexoffset;
    returnVars[3] = this.spriteyoffset;
  }
  else {
  	returnVars[2] = 0;
  	returnVars[3] = 0;
  }
  return(returnVars); 
}

GameObject.prototype.setOverlay = function(newgraphic) {
	this.overlay = newgraphic;
}

GameObject.prototype.getOverlay = function() {
	var returnOverlay = this.overlay;

  if (returnOverlay) { return(returnOverlay); }
}

GameObject.prototype.getBlocksLOS = function(distance) {
  if (this.losatdistance) {
    if (distance > this.losatdistance["distance"]) { return(this.losatdistance["blocklos"]) }
  }
  if (this.losupclose) {
  	if (distance <= this.losupclose["distance"]) { return(this.losupclose["blocklos"]) }
  }
  return (this.blocklos);
}

GameObject.prototype.getBlocksLOSArray = function() {
	var LOSref = [];
	LOSref[0] = this.blocklos;
	if (this.losatdistance){
		LOSref[1] = this.losatdistance['distance'];
		LOSref[2] = this.losatdistance['blocklos'];
	}
	if (this.losupclose) {
		LOSref[3] = this.losupclose['distance'];
		LOSref[4] = this.losupclose['blocklos'];
	}
	
	return LOSref;
}

GameObject.prototype.setBlocksLOSArray = function(newLOS) {
	this.blocklos = newLOS[0];
	if (typeof newLOS[1] !== "undefined") {
		this.losatdistance['distance'] = newLOS[1];
		this.losatdistance['blocklos'] = newLOS[2];
	}
	if (typeof newLOS[3] !== "undefined") {
		this.losupclose['distance'] = newLOS[3];
		this.losupclose['blocklos'] = newLOS[4];
	}
}

GameObject.prototype.getBlocksLOE = function(distance) {
  if (this.blockloe) {  
    if (this.loeatdistance) {
      if (distance > this.loeatdistance["distance"]) { return(this.loeatdistance["blockloe"]) }
    }
    if (this.loeupclose) {
  	  if (distance <= this.loeupclose["distance"]) { return(this.loeupclose["blockloe"]) }
    }
    return (this.blockloe);
  }
  else { return this.getBlocksLOS(distance); }
}

GameObject.prototype.getBlocksLOEArray = function() {
  if (this.blockloe) { 
    var tmp = [];
    tmp[0] = this.blockloe;
    if (this.loeatdistance) {
      tmp[1] = this.loeatdistance['distance'];
      tmp[2] = this.loeatdistance['attackThrough'];
    }
    if (this.loeupclose) {
      tmp[3] = this.loeupclose['distance'];
      tmp[4] = this.loeupclose['attackThrough']
    }
    return tmp;
  }
  return this.getBlocksLOSArray();
}

GameObject.prototype.getPassable = function() {
	return this.passable;
}

GameObject.prototype.setPassable = function(movetype) {
	this.passable = movetype;
	return this.passable;
}

GameObject.prototype.removePassable = function(movetype) {
	this.passable = this.passable & ~movetype;
	return this.passable;
}

GameObject.prototype.addPassable = function(movetype) {
	this.passable = this.passable | movetype;
	return this.passable;
}

GameObject.prototype.activate = function() {
  return 1;
}

// These below are abstract classes, to be used only in JS's halfassed
// version of multiple inheritance. 

// Abstract class Lockable
function Lockable(unlockedgraphic, lockedgraphic, maglockedgraphic, unlockedprefix, unlockeddesc, lockedprefix, lockeddesc, maglockedprefix, maglockeddesc) {
	this.locked = 0;
	this.lockedgraphics = [unlockedgraphic, lockedgraphic, maglockedgraphic];
	this.lockeddescs = [unlockeddesc, lockeddesc, maglockeddesc];
  this.lockedprefixes = [unlockedprefix, lockedprefix, maglockedprefix];
  this.trapped = "";
  this.trapchallenge = 0;
	
	this.setLocked = function(lock) { this.locked = lock; }
	this.getLocked = function() { return this.locked; }
	this.lockMe = function(lock) {
		this.setLocked(lock);
		this.setOverlay(this.lockedgraphics[lock]);
		this.setDesc(this.lockeddescs[lock]);
		this.setPrefix(this.lockedprefixes[lock]);
		var homemap = this.getHomeMap();
		if (homemap) {
		  homemap.setWalkableAt(this.getx(),this.gety(),false,MOVE_WALK_DOOR);
		}
	}
	this.unlockMe = function() { 
	  this.lockMe(0);
	  var homemap = this.getHomeMap();
	  if (homemap) {
	    this.getHomeMap().setWalkableAt(this.getx(),this.gety(),true,MOVE_WALK_DOOR);
	  }
	}
	
	this.setTrap = function(trap, challenge) { this.trapped = trap; this.trapchallenge = challenge; }
	this.tryTrap = function(who) { 
	  // if your Dex === the challenge rating for the trap, you have a 50/50 chance of opening it. Once your dex is twice the
	  // challenge you will always succeed. NOTE: Changed that to challenge+10.
	  var resp = 0;
//	  var chance = who.getDex() / (this.trapchallenge * 2);
    var chance = ((who.getDex() + 10) - (this.trapchallenge)) /20;
    if (chance < .05) { chance = .05; }
	  var roll = Math.random();
	  if (roll < chance) { this.disarmTrap(); resp = 1; maintext.addText("You disarm a trap!"); }
	  else { resp = PerformTrap(who, this.trapped, this.trapchallenge, this); }
	  return resp;
	} 
	this.disarmTrap = function() { this.trapped = ""; }
	
}

// Abstract class Enterable
function Enterable(entermap, enterx, entery) {
	this.entermap = entermap;
	this.enterx = enterx;
	this.entery = entery;
	this.klimb = "";
	this.descend = "";
	
	this.enter = function() {}
  this.setEnterMap = function(entermap, x, y) {
  	this.entermap = entermap;
  	this.enterx = x;
  	this.entery = y;
  }
  this.getEnterMap = function() {
  	var mapdata = { entermap : this.entermap , enterx : this.enterx, entery : this.entery };
  	return mapdata;
  }
  this.getKlimb = function() {
  	return this.klimb;
  }
  this.getDescend = function() {
  	return this.descend;
  }
}

// Abstract class Light Emitting
function LightEmitting(lightlevel) {
	this.light = lightlevel;
	this.ignite = function() {
		this.setLight(lightlevel);
	}
	this.extinguish = function() {
    this.setLight(0);
	}
	this.setLight = function(light) {
	  if (this.light > 0) {
	    this.getHomeMap().removeMapLight(this.getSerial(), this.light, this.getx(), this.gety());
	  }
	  if (light > 0) {
	    this.getHomeMap().setMapLight(this,light,this.getx(),this.gety());
	  }
	    
	  DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
		this.light = light;
	}
	this.getLight = function() {
		return this.light;
	}
}

// Abstract class 
function Openable(closedgraphic, opengraphic, startsopen, opensound, closesound, lockedsound) {
	this.open = startsopen;
	
	this.closedLOS = [];
	this.closedgraphic = closedgraphic;
	this.opengraphic = opengraphic;
	// NOTE: These should be arrays in the standard graphics[0-3] style.
	
	this.use = function(who) {
		var retval = {};
		retval["fin"] = 0;
		
		if (this.locked && this.keyname) {
		  if (who.inventory.getByName(this.keyname)) {
        this.unlockMe();
      }
    }
		if (this.open == 1) {
			this.setGraphicArray(closedgraphic);
			
			this.setBlocksLOSArray(this.closedLOS);
			this.closedLOS = [];
			
			this.removePassable(MOVE_WALK);
			this.removePassable(MOVE_LEVITATE);
			this.removePassable(MOVE_FLY);
			this.getHomeMap().setWalkableAt(this.getx(),this.gety(),false,MOVE_WALK);
			this.getHomeMap().setWalkableAt(this.getx(),this.gety(),false,MOVE_SWIM);
			this.getHomeMap().setWalkableAt(this.getx(),this.gety(),false,MOVE_LEVITATE);
			this.getHomeMap().setWalkableAt(this.getx(),this.gety(),false,MOVE_FLY);
			
			retval["fin"] = 1;
			retval["txt"] = "Closed!";
			retval["redrawtype"] = "draw";
			if (closesound) {
			  DUPlaySound(closesound); 
			}
			
			this.open = 0;
		} else {
			if (typeof this.getLocked == "function") {
				if (this.getLocked()) {
					retval["fin"] = 1;
					retval["txt"] = "Locked.";
					if (lockedsound) {
					  DUPlaySound(lockedsound); 
					}
					return retval;
				}
			}
			this.setGraphicArray(opengraphic);
			
			this.closedLOS = this.getBlocksLOSArray();
			var seethru = [];
			seethru[0] = 0;
			this.setBlocksLOSArray(seethru);
			
			this.addPassable(MOVE_WALK);
			this.addPassable(MOVE_LEVITATE);
			this.addPassable(MOVE_FLY);
			this.getHomeMap().setWalkableAt(this.getx(),this.gety(),true,MOVE_WALK);
			this.getHomeMap().setWalkableAt(this.getx(),this.gety(),true,MOVE_LEVITATE);
			this.getHomeMap().setWalkableAt(this.getx(),this.gety(),true,MOVE_SWIM);
			this.getHomeMap().setWalkableAt(this.getx(),this.gety(),true,MOVE_FLY);
			if (opensound) {
			  DUPlaySound(opensound); 
			}
			
			retval["fin"] = 1;
			retval["txt"] = "Opened!";
			retval["redrawtype"] = "draw";
			this.open = 1;
		}
		return retval;
	}
	
}

// Abstract class - open a container
function OpenContainer() {
  
  this.isContainer = 1;
  
  this.use = function(who) {
    var retval = {}; 

    if (this.trapped) {
      var trapresult = this.tryTrap(who);
    }

    if (typeof this.getLocked === "function") {
      if (this.getLocked() == 1) {
        retval["fin"] = 1;
        retval["txt"] = "Locked.";
        return retval;
      }
      else if (this.getLocked() === 2){
        retval["fin"] = 1;
        retval["txt"] = "Magically locked.";
        return retval;
      }
    }
    
    if (this.container.length) { // there's something inside
      if (this.getLootedID()) {
        DU.gameflags[this.getLootedID()] = 1;
      }
      
      retval["fin"] = 1;
      retval["txt"] = "It contains: ";
      var firstitem = 1;
      for (var i=0; i<this.container.length; i++) {
        var newitem = localFactory.createTile(this.container[i]);
        if (this.container[i] === "Gold") {
          newitem.setQuantity(this.gold);
        }
        if (newitem) {
          this.getHomeMap().placeThing(this.getx(),this.gety(),newitem);
          if (firstitem) {
            firstitem = 0;
            if (newitem.getPrefix()) {
              retval["txt"] += newitem.getPrefix() + " ";
            }
            retval["txt"] += newitem.getDesc();
          }
          else {
            retval["txt"] += ", ";
            if (newitem.getPrefix()) {
              retval["txt"] += newitem.getPrefix() + " ";
            }
            retval["txt"] += newitem.getDesc();              
          }
        }
      }
      retval["txt"] += ".";
    }
    else {
      retval["fin"] = 1;
      retval["txt"] = "Empty.";
    }
    
    this.getHomeMap().deleteThing(this);
    return retval;
  }
  
  this.addToContainer = function(addthis, amt) {
    if (!amt) { amt = 1; }
    if (addthis === "Gold") {
      this.container[this.container.length] = addthis;
      this.setGold(amt);
    } else {
      for (var i = 1; i <= amt; i++) {
        this.container[this.container.length] = addthis;
      }
    }
      
  }
}

// Abstract class Tiling
function Tiling(tileval) {
	this.doTile = function(tilingx,tilingy,tilegraphic) {
		tilingx = (tilingx % tileval); 
		tilingy = (tilingy % tileval);
		var foo = tilegraphic.split('.');
	  return(foo[0] + "-" + tilingy + tilingx + "." + foo[1]);
	}
}

// General func 
function SetByBelow() {
	this.setByBelow = function(x,y,themap) {
		var localacre = themap.getTile(x,y);
		var graphic = localacre.terrain.getGraphicArray();
		return graphic;
//		return (graphic[0]);
	};
}

// General func
function SetBySurround() {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
		var cardinal_dash = "";
		var north = 0;
		var south = 0;
		var east = 0;
		var west = 0;
		var vis = 0;

  	var addtoname_cardinal = "";
	  if ((themap.getTile(x,y+1) !== "OoB") && ((themap.getTile(x,y+1).terrain.getName() !== "CaveWall") && (themap.getTile(x,y+1).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x,y+1,losgrid) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "n"; north = 1; vis = 1;}
	  if ((themap.getTile(x,y+1) !== "OoB") && ((themap.getTile(x,y+1).terrain.getName() !== "CaveWall") && (themap.getTile(x,y+1).terrain.getName() !== "BlankBlack"))) { north = 1; }
  	if ((themap.getTile(x,y-1) !== "OoB") && ((themap.getTile(x,y-1).terrain.getName() !== "CaveWall") && (themap.getTile(x,y-1).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x,y-1,losgrid) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "s"; south = 1; vis = 1;}
  	if ((themap.getTile(x,y-1) !== "OoB") && ((themap.getTile(x,y-1).terrain.getName() !== "CaveWall") && (themap.getTile(x,y-1).terrain.getName() !== "BlankBlack"))) { south = 1; }
	  if ((themap.getTile(x-1,y) !== "OoB") && ((themap.getTile(x-1,y).terrain.getName() !== "CaveWall") && (themap.getTile(x-1,y).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y,losgrid) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "e"; east = 1; vis = 1;}
	  if ((themap.getTile(x-1,y) !== "OoB") && ((themap.getTile(x-1,y).terrain.getName() !== "CaveWall") && (themap.getTile(x-1,y).terrain.getName() !== "BlankBlack"))) { east = 1; }
  	if ((themap.getTile(x+1,y) !== "OoB") && ((themap.getTile(x+1,y).terrain.getName() !== "CaveWall") && (themap.getTile(x+1,y).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y,losgrid) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "w"; west = 1; vis = 1;}
  	if ((themap.getTile(x+1,y) !== "OoB") && ((themap.getTile(x+1,y).terrain.getName() !== "CaveWall") && (themap.getTile(x+1,y).terrain.getName() !== "BlankBlack"))) { west = 1; }
		
	  var diagonal_dash = "";
	  var addtoname_diagonal = "";
	 	if ((themap.getTile(x+1,y-1) !== "OoB") && (themap.getTile(x+1,y-1).terrain.getName() !== "CaveWall") && (themap.getTile(x+1,y-1).terrain.getName() !== "BlankBlack") && (south === 0) && (west === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y-1,losgrid) < LOS_THRESHOLD) ))
	 	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "a"; vis = 1; }
  	if ((themap.getTile(x+1,y+1) !== "OoB") && (themap.getTile(x+1,y+1).terrain.getName() !== "CaveWall") && (themap.getTile(x+1,y+1).terrain.getName() !== "BlankBlack") && (north === 0) && (west === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y+1,losgrid) < LOS_THRESHOLD) )) 
  	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "b"; vis = 1; }
	  if ((themap.getTile(x-1,y+1) !== "OoB") && (themap.getTile(x-1,y+1).terrain.getName() !== "CaveWall") && (themap.getTile(x-1,y+1).terrain.getName() !== "BlankBlack") && (north === 0) && (east === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y+1,losgrid) < LOS_THRESHOLD) ))
	    { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "c"; vis = 1;}
	 	if ((themap.getTile(x-1,y-1) !== "OoB") && (themap.getTile(x-1,y-1).terrain.getName() !== "CaveWall") && (themap.getTile(x-1,y-1).terrain.getName() !== "BlankBlack") && (south === 0) && (east === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y-1,losgrid) < LOS_THRESHOLD) )) 
	 	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "d"; vis = 1; }
	
	  var foo = graphics[0].split('.');
	  graphics[0] = foo[0] + cardinal_dash + addtoname_cardinal + diagonal_dash + addtoname_diagonal + '.' + foo[1];
	  if (vis === 0) { 
	  	var black = eidos.getForm('BlankBlack');
	  	var blkgraphics = black.getGraphicArray();
	  	graphics[0] = blkgraphics[0];
	  }
	  var tmparray = new Array;
	  tmparray[0] = .5;
	  if (graphics[0].indexOf("-nsew") !== -1) { this.setBlocksLOSArray(tmparray); }
	  return (graphics);
  }
}

// General func
function SetBySurroundCoast() {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
		if (losresult >= LOS_THRESHOLD) {
			var displaytile = eidos.getForm('BlankBlack');
			var displaygraphic = displaytile.getGraphicArray();
			return displaygraphic;
		}
    var ocean;
    var water;
    var shallow;
    var localacre = themap.getTile(x,y-1);
    var tile; 
    if (localacre !== "OoB") {
    	tile = localacre.terrain;
    	if (tile.getName() === "Ocean") { ocean = tile; }
    	if (tile.getName() === "Water") { water = tile; }
    	if (tile.getName() === "Shallows") { shallow = tile; }
    }
    localacre = themap.getTile(x,y+1);
    if (localacre !== "OoB") {
    	tile = localacre.terrain;
    	if (tile.getName() === "Ocean") { ocean = tile; }
    	if (tile.getName() === "Water") { water = tile; }
    	if (tile.getName() === "Shallows") { shallow = tile;; }
    }
    localacre = themap.getTile(x+1,y);
    if (localacre !== "OoB") {
    	tile = localacre.terrain;
    	if (tile.getName() === "Ocean") { ocean = tile; }
    	if (tile.getName() === "Water") { water = tile; }
    	if (tile.getName() === "Shallows") { shallow = tile; }
    }
    localacre = themap.getTile(x-1,y);
    if (localacre !== "OoB") {
    	tile = localacre.terrain;
    	if (tile.getName() === "Ocean") { ocean = tile; }
    	if (tile.getName() === "Water") { water = tile; }
    	if (tile.getName() === "Shallows") { shallow = tile; }
    }
    var chosentile;
    if (shallow) { chosentile = shallow; }
    else if (water) { chosentile = water; }
    else if (ocean) { chosentile = ocean; }
    // kludge fix for clear lagoon
    else if (themap.getName() === "clearlagoon") { 
      shallow = eidos.getForm("Shallows");
      chosentile = shallow;
    }
    else { 
      graphics[0] = "spacer.gif";
      graphics[2] = 0;
      graphics[3] = 0;
      return graphics; 
    }
    
    var chosengraphics = chosentile.getGraphicArray();
    graphics[0] = chosengraphics[0];
    graphics[2] = chosengraphics[2];
    graphics[3] = chosengraphics[3];
    return graphics;
  }
}

// General func
function SetBySurroundRoad() {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
		if (losresult >= LOS_THRESHOLD) {
			var displaytile = eidos.getForm('BlankBlack');
			var displaygraphic = displaytile.getGraphicArray();
			return displaygraphic;
		}

    var suffix = "";
	  var localacre = themap.getTile(x+1,y);
	  if (localacre !== "OoB") {
	  	var tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") !== -1) { suffix = suffix + "e"; }
	  }	
	  localacre = themap.getTile(x-1,y);
	  if (localacre !== "OoB") {
	  	var tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") !== -1) { suffix = suffix + "w"; }
	  }	
	  localacre = themap.getTile(x,y-1);
	  if (localacre !== "OoB") {
	  	var tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") !== -1) { suffix = suffix + "n"; }
	  }	
	  localacre = themap.getTile(x,y+1);
	  if (localacre !== "OoB") {
	  	var tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") !== -1) { suffix = suffix + "s"; }
	  }	
	  if ((suffix === "ewns") || (suffix === "")) { suffix = "x"; }
	  if ((suffix === "e") || (suffix === "w")) { suffix = "ew"; }
	  if ((suffix === "n") || (suffix === "s")) { suffix = "ns"; }
	  graphics[0] = "road-" + suffix + ".gif";
		return graphics;
	}
}

// General func
function SetBySurroundRiver() {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
		if (losresult >= LOS_THRESHOLD) {
			var displaytile = eidos.getForm('BlankBlack');
			var displaygraphic = displaytile.getGraphicArray();
			return displaygraphic;
		}

		var north;
		var south;
		var east;
		var west;
		var northacre = themap.getTile(x,y-1);
		northtile = northacre.terrain;
		if (northacre !== "OoB") {
			if (IsWet(northtile)) {
				north = 1;
			}
		}
		var southacre = themap.getTile(x,y+1);
		var southtile = southacre.terrain;
		if (southacre !== "OoB") {
			if (IsWet(southtile)) {
				south = 1;
			}
		}
		var eastacre = themap.getTile(x+1,y);
		var easttile = eastacre.terrain;
		if (eastacre !== "OoB") {
			if (IsWet(easttile)) {
				east = 1;
			}
		}
		var westacre = themap.getTile(x-1,y);
		var westtile = westacre.terrain;
		if (westacre !== "OoB") {
			if (IsWet(westtile)) {
				west = 1;
			}
		}
		if ((north === 1) && (south === 1) && (east === 1) && (west === 1)) {
			// this shouldn't happen, if it does I need to draw a + river piece
			graphics[1] = "spacer.gif";
		} else if ((north === 1) && (east === 1) && (south === 1)) {
			graphics[1] = "riverTright.gif";
		} else if ((north === 1) && (west === 1) && (south === 1)) {
			graphics[1] = "riverTleft.gif";
		} else if ((north === 1) && (east === 1) && (west === 1)) {
			graphics[1] = "riverTtop.gif";
		} else if ((south === 1) && (east === 1) && (west === 1)) {
			graphics[1] = "riverTbottom.gif";
		} else if ((east === 1) && (west === 1)) {
			graphics[1] = "riverew.gif";
		} else if ((north === 1) && (south === 1)) {
			graphics[1] = "riverns.gif";
		} else if ((north === 1) && (east === 1)) {
			graphics[1] = "riverne.gif";
		} else if ((north === 1) && (west === 1)) {
			graphics[1] = "rivernw.gif";
		} else if ((south === 1) && (east === 1)) {
			graphics[1] = "riverse.gif";
		} else if ((south === 1) && (west === 1)) {
			graphics[1] = "riversw.gif";
		} else if (north === 1) {
			graphics[1] = "riversources.gif";
		} else if (east === 1) {
			graphics[1] = "riversourcew.gif";
		} else if (west === 1) {
			graphics[1] = "riversourcee.gif";
		} else if (south === 1) {
			graphics[1] = "riversourcen.gif";
		}
		return graphics;
	}
}

// General func
function IsWet(tile) {
	if (tile.getName() === "Ocean") { return 1; }
	if (tile.getName() === "Water") { return 1; }
	if (tile.getName() === "Shallows") { return 1; }
	if (tile.getName() === "River") { return 1; }
	return 0;
}
// end multiple inheritance

function InanimateObject() {
  this.initdelay = 1;  // multiplicative
  this.walkonscript = "";
  this.usescript = "";
  
  this.addType("InanimateObject");
}

InanimateObject.prototype = new GameObject();

InanimateObject.prototype.getWalkOnScript = function() {
	return this.walkonscript;
}

InanimateObject.prototype.setWalkOnScript = function(newscript) {
	this.walkonscript = newscript;
}

InanimateObject.prototype.getUseScript = function() {
	return this.usescript;
}

InanimateObject.prototype.setUseScript = function(newscript) {
	this.usescript = newscript;
}

InanimateObject.prototype.walkon = function() {
  return("");
}

InanimateObject.prototype.leave = function() {
  return("");
}

InanimateObject.prototype.idle = function() {
  return("");
}

InanimateObject.prototype.getInitDelay = function() {
	return this.initdelay;
}

InanimateObject.prototype.setInitDelay = function(newdelay) {
	this.initdelay = newdelay;
	return this.initdelay;
}

// And now, on with the show!
// TERRAIN

function TerrainObject() {
  this.addType("Terrain");
  this.combatmap = "";
}

TerrainObject.prototype = new InanimateObject();

TerrainObject.prototype.serialize = function() {
  var name = this.name;
  var myatlas = new Atlas();
  var code = myatlas.keylookup(name);
  if (code) { return(code); }
  return(0);
}

TerrainObject.prototype.getCombatMap = function() {
//  var mapname = this.combatmap;
//  if (this.combatmapoptions > 1) {
//    var randomnumber=Math.floor(Math.random()*this.combatmapoptions)+1;
//    mapname = mapname + randomnumber;
//  }
//  return mapname;
  return this.combatmap;
}

TerrainObject.prototype.setCombatMap = function(map) {
  this.combatmap = map;
  return this.combatmap;
}

TerrainObject.prototype.setCombatMapOptions = function(mapnum) {
  this.combatmapoptions = mapnum;
  return this.combatmapoptions;
}


function BlankWhiteTile() {
  this.name = "BlankWhite";
//  this.graphic = "000.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-288";
  this.desc = "";
  this.blocklos = 1;
  this.passable = MOVE_ETHEREAL;
}
BlankWhiteTile.prototype = new TerrainObject();

function OceanTile() {
  this.name = "Ocean";
  this.graphic = "flowing_animations.gif";
  this.desc = "deep water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL;
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
}
OceanTile.prototype = new TerrainObject();

function WaterTile() {
  this.name = "Water";
  this.graphic = "flowing_animations.gif";
  this.desc = "water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
}
WaterTile.prototype = new TerrainObject();

WaterTile.prototype.walkon = function(walker) {
  var resp = InWater(walker);
  return resp;
}

WaterTile.prototype.idle = function(walker) {
  var resp = InWater(walker);
  return resp;
}

function ShallowsTile() {
  this.name = "Shallows";
  this.graphic = "flowing_animations.gif";
  this.desc = "shallow water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
}
ShallowsTile.prototype = new TerrainObject();

ShallowsTile.prototype.walkon = function(walker) {
  var resp = InWater(walker);
  return resp;
}

ShallowsTile.prototype.idle = function(walker) {
  var resp = InWater(walker);
  return resp;
}

function InWater(who) {
  if (MOVE_LEVITATE & who.getMovetype()) {
    // entity is levitating and so won't drown
    return "";
  }  
  if (MOVE_ETHEREAL & who.getMovetype()) {
    // entity is ethereal and can't drown
    return "";
  }

  var localmap = who.getHomeMap();
  var tile = localmap.getTile(who.getx(),who.gety());
  var feats = tile.getFeatures();
  if (feats) {
    for (var i=0;i<feats.length;i++) {
      if (MOVE_WALK & feats[i].getPassable()) {
        return "";
      }
    }
  }

  var dur = DUTime.getGameClock() - who.getLastTurnTime();
  var response = "You have trouble keeping your head above the rough waters!";
  var dmg = dur * 3;
  who.dealDamage(dmg);
  
  return response;
}

function MountainTile() {
  this.name = "Mountain";
//  this.graphic = "004.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
}
MountainTile.prototype = new TerrainObject();

function MountainPassTile() {
  this.name = "MountainPass";
//  this.graphic = "004.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_WALK;
  this.combatmap = "Hill";
}
MountainPassTile.prototype = new TerrainObject();

function StoneWallTile() {
  this.name = "StoneWall";
//  this.graphic = "011.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "stone wall";
}
StoneWallTile.prototype = new TerrainObject();

function StoneTile() {
  this.name = "Stone";
//  this.graphic = "013.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone";
}
StoneTile.prototype = new TerrainObject();

function DirtStoneTile() {
  this.name = "DirtStone";
//  this.graphic = "dirt-rock.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone";
}
DirtStoneTile.prototype = new TerrainObject();

function MastTile() {
  this.name = "Mast";
//  this.graphic = "014.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .2;
  this.prefix = "a";
  this.desc = "mast";
}
MastTile.prototype = new TerrainObject();

function RiggingTile() {
  this.name = "Rigging";
//  this.graphic = "015.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "ship's rigging";
}
RiggingTile.prototype = new TerrainObject();

function PillarTile() {
  this.name = "Pillar";
//  this.graphic = "016.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pillar";
}
PillarTile.prototype = new TerrainObject();

function PurplePillarTile() {
  this.name = "PurplePillar";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-288";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pillar";
}
PurplePillarTile.prototype = new TerrainObject();

function FountainSWTile() {
  this.name = "FountainSW";
//  this.graphic = "017.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-32";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fountain";
}
FountainSWTile.prototype = new TerrainObject();

function FountainSETile() {
  this.name = "FountainSE";
//  this.graphic = "018.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-32";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fountain";
}
FountainSETile.prototype = new TerrainObject();

function FountainNWTile() {
  this.name = "FountainNW";
//  this.graphic = "019.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-64";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fountain";
}
FountainNWTile.prototype = new TerrainObject();

function FountainNETile() {
  this.name = "FountainNE";
//  this.graphic = "020.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-64";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fountain";
}
FountainNETile.prototype = new TerrainObject();

function LetterATile() {
  this.name = "LetterA";
//  this.graphic = "025.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "A";
}
LetterATile.prototype = new TerrainObject();

function LetterBTile() {
  this.name = "LetterB";
//  this.graphic = "026.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "B";
}
LetterBTile.prototype = new TerrainObject();

function LetterCTile() {
  this.name = "LetterC";
//  this.graphic = "027.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "C";
}
LetterCTile.prototype = new TerrainObject();

function LetterDTile() {
  this.name = "LetterD";
//  this.graphic = "028.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "D";
}
LetterDTile.prototype = new TerrainObject();

function LetterETile() {
  this.name = "LetterE";
//  this.graphic = "029.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "E";
}
LetterETile.prototype = new TerrainObject();

function LetterFTile() {
  this.name = "LetterF";
//  this.graphic = "030.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "F";
}
LetterFTile.prototype = new TerrainObject();

function LetterGTile() {
  this.name = "LetterG";
//  this.graphic = "031.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "G";
}
LetterGTile.prototype = new TerrainObject();

function LetterHTile() {
  this.name = "LetterH";
//  this.graphic = "032.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "H";
}
LetterHTile.prototype = new TerrainObject();

function LetterITile() {
  this.name = "LetterI";
//  this.graphic = "033.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "I";
}
LetterITile.prototype = new TerrainObject();

function LetterJTile() {
  this.name = "LetterJ";
//  this.graphic = "034.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "J";
}
LetterJTile.prototype = new TerrainObject();

function LetterKTile() {
  this.name = "LetterK";
//  this.graphic = "035.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "K";
}
LetterKTile.prototype = new TerrainObject();

function LetterLTile() {
  this.name = "LetterL";
//  this.graphic = "036.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "L";
}
LetterLTile.prototype = new TerrainObject();

function LetterMTile() {
  this.name = "LetterM";
//  this.graphic = "037.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "M";
}
LetterMTile.prototype = new TerrainObject();

function LetterNTile() {
  this.name = "LetterN";
//  this.graphic = "038.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "N";
}
LetterNTile.prototype = new TerrainObject();

function LetterOTile() {
  this.name = "LetterO";
//  this.graphic = "039.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "O";
}
LetterOTile.prototype = new TerrainObject();

function LetterPTile() {
  this.name = "LetterP";
//  this.graphic = "040.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "P";
}
LetterPTile.prototype = new TerrainObject();

function LetterQTile() {
  this.name = "LetterQ";
//  this.graphic = "041.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "Q";
}
LetterQTile.prototype = new TerrainObject();

function LetterRTile() {
  this.name = "LetterR";
//  this.graphic = "042.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "R";
}
LetterRTile.prototype = new TerrainObject();

function LetterSTile() {
  this.name = "LetterS";
//  this.graphic = "043.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "S";
}
LetterSTile.prototype = new TerrainObject();

function LetterTTile() {
  this.name = "LetterT";
//  this.graphic = "044.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "T";
}
LetterTTile.prototype = new TerrainObject();

function LetterUTile() {
  this.name = "LetterU";
//  this.graphic = "045.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "U";
}
LetterUTile.prototype = new TerrainObject();

function LetterVTile() {
  this.name = "LetterV";
//  this.graphic = "046.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "V";
}
LetterVTile.prototype = new TerrainObject();

function LetterWTile() {
  this.name = "LetterW";
//  this.graphic = "047.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "W";
}
LetterWTile.prototype = new TerrainObject();

function LetterXTile() {
  this.name = "LetterX";
//  this.graphic = "048.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "an";
  this.desc = "X";
}
LetterXTile.prototype = new TerrainObject();

function LetterYTile() {
  this.name = "LetterY";
//  this.graphic = "049.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "Y";
}
LetterYTile.prototype = new TerrainObject();

function LetterZTile() {
  this.name = "LetterZ";
//  this.graphic = "050.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "Z";
}
LetterZTile.prototype = new TerrainObject();

function HorizontalCounterTile() {
  this.name = "HorizontalCounter";
//  this.graphic = "051.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
}
HorizontalCounterTile.prototype = new TerrainObject();

function RightCounterTile() {
  this.name = "RightCounter";
//  this.graphic = "052.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
}
RightCounterTile.prototype = new TerrainObject();

function LeftCounterTile() {
  this.name = "LeftCounter";
//  this.graphic = "053.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
}
LeftCounterTile.prototype = new TerrainObject();

function CounterBoxTile() {
  this.name = "CounterBox";
//  this.graphic = "054.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
}
CounterBoxTile.prototype = new TerrainObject();

function BlankBlackTile() {
  this.name = "BlankBlack";
//  this.graphic = "055.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.desc = "darkness";
}
BlankBlackTile.prototype = new TerrainObject();

function DarknessTile() {
  this.name = "Darkness";
//  this.graphic = "055.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "darkness";
}
DarknessTile.prototype = new TerrainObject();

function WallTile() {
  this.name = "Wall";
//  this.graphic = "056.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
}
WallTile.prototype = new TerrainObject();

function RuinsWallTallLeftMidRightTile() {
  this.name = "RuinsWallTallLeftMidRight";
//  this.graphic = "056.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-256";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
}
RuinsWallTallLeftMidRightTile.prototype = new TerrainObject();

function RuinsWallMidLeftMidRightTile() {
  this.name = "RuinsWallMidLeftMidRight";
//  this.graphic = "056.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-256";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
}
RuinsWallMidLeftMidRightTile.prototype = new TerrainObject();

function RuinsWallMidLeftTallRightTile() {
  this.name = "RuinsWallMidLeftTallRight";
//  this.graphic = "056.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-256";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
}
RuinsWallMidLeftTallRightTile.prototype = new TerrainObject();

function RuinsWallTile() {
  this.name = "RuinsWall";
//  this.graphic = "056.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-256";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
}
RuinsWallTile.prototype = new TerrainObject();

function RuinsWallMidLeftBottomRightTile() {
  this.name = "RuinsWallMidLeftBottomRight";
//  this.graphic = "056.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-256";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
}
RuinsWallMidLeftBottomRightTile.prototype = new TerrainObject();

function RuinsWallBottomLeftMidRightTile() {
  this.name = "RuinsWallBottomLeftMidRight";
//  this.graphic = "056.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-256";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
}
RuinsWallBottomLeftMidRightTile.prototype = new TerrainObject();

function ArrowSlitTile() {
	this.name = "ArrowSlit";
//	this.graphic = "arrowslit.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-128";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = { distance : 1 , blocklos : 0 };
	this.blockloe = 1;
	this.loeupclose = {distance : 0 , blocklow : .2 };
	this.prefix = "an";
	this.desc = "arrow slit";

}
ArrowSlitTile.prototype = new TerrainObject();

function WindowTile() {
	this.name = "Window";
//	this.graphic = "window.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-128";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.blockloe = 1;
	this.prefix = "a";
	this.desc = "window";

}
WindowTile.prototype = new TerrainObject();

function WallNETile() {
  this.name = "WallNE";
//  this.graphic = "057.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
}
WallNETile.prototype = new TerrainObject();

function WallNWTile() {
  this.name = "WallNW";
//  this.graphic = "058.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
}
WallNWTile.prototype = new TerrainObject();

function WallSWTile() {
  this.name = "WallSW";
//  this.graphic = "059.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
}
WallSWTile.prototype = new TerrainObject();

function WallSETile() {
  this.name = "WallSE";
//  this.graphic = "060.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 1;
  this.prefix = "a";
  this.desc = "wall";
}
WallSETile.prototype = new TerrainObject();

function VerticalCounterTile() {
  this.name = "VerticalCounter";
//  this.graphic = "061.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-160";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
}
VerticalCounterTile.prototype = new TerrainObject();

function BottomCounterTile() {
  this.name = "BottomCounter";
//  this.graphic = "062.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-192";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
}
BottomCounterTile.prototype = new TerrainObject();

function TopCounterTile() {
  this.name = "TopCounter";
//  this.graphic = "063.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "counter";
}
TopCounterTile.prototype = new TerrainObject();

function PlanksNSTile() {
  this.name = "PlanksNS";
//  this.graphic = "069.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
}
PlanksNSTile.prototype = new TerrainObject();

function SouthCoastTile() {
  this.name = "SouthCoast";
//  this.graphic = "073.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
}
SouthCoastTile.prototype = new TerrainObject();

function NorthCoastTile() {
  this.name = "NorthCoast";
//  this.graphic = "074.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
}
NorthCoastTile.prototype = new TerrainObject();

function EastCoastTile() {
  this.name = "EastCoast";
//  this.graphic = "075.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
}
EastCoastTile.prototype = new TerrainObject();

function WestCoastTile() {
  this.name = "WestCoast";
//  this.graphic = "076.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
}
WestCoastTile.prototype = new TerrainObject();

function NortheastCoastTile() {
  this.name = "NortheastCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "necoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastTile.prototype = new TerrainObject();

function SouthwestCoastTile() {
  this.name = "SouthwestCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "swcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastTile.prototype = new TerrainObject();

function NorthwestCoastTile() {
  this.name = "NorthwestCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "nwcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastTile.prototype = new TerrainObject();

function SoutheastCoastTile() {
  this.name = "SoutheastCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "secoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastTile.prototype = new TerrainObject();

function RiverTile() {
  this.name = "River";
  this.overlay = "riverns.gif";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "river";
  this.combatmap = "Water";
  
  SetBySurroundRiver.call(this);
}
RiverTile.prototype = new TerrainObject();

function CobblestoneTile() {
  this.name = "Cobblestone";
//  this.graphic = "103.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
}
CobblestoneTile.prototype = new TerrainObject();

function BlueTilesTile() {
  this.name = "BlueTiles";
//  this.graphic = "056.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-256";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "tiles";
}
BlueTilesTile.prototype = new TerrainObject();


function PlanksEWTile() {
  this.name = "PlanksEW";
//  this.graphic = "104.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
}
PlanksEWTile.prototype = new TerrainObject();

function GrassTile() {
  this.name = "Grass";
//  this.graphic = "121.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";

  this.combatmap = "Grass"; 
}
GrassTile.prototype = new TerrainObject();

function DirtTile() {
  this.name = "Dirt";
//  this.graphic = "dirt-ground.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
}
DirtTile.prototype = new TerrainObject();


function RoadTile() {
  this.name = "Road";
  this.graphic = "road-ew.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dirt road";
  this.combatmap = "Grass";
  
  this.initdelay = 0.8;
  
  SetBySurroundRoad.call(this);
}
RoadTile.prototype = new TerrainObject();

function BrushTile() {
  this.name = "Brush";
//  this.graphic = "122.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.combatmap = "Brush";
}
BrushTile.prototype = new TerrainObject();

function BrushNCoastTile() {
  this.name = "BrushNCoast";
//  this.graphic = "brushNcoast.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.combatmap = "Brush";
}
BrushNCoastTile.prototype = new TerrainObject();

function BrushECoastTile() {
  this.name = "BrushECoast";
//  this.graphic = "brushEcoast.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.combatmap = "Brush";
}
BrushECoastTile.prototype = new TerrainObject();

function BrushSCoastTile() {
  this.name = "BrushSCoast";
//  this.graphic = "brushScoast.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.combatmap = "Brush";
}
BrushSCoastTile.prototype = new TerrainObject();

function BrushWCoastTile() {
  this.name = "BrushWCoast";
//  this.graphic = "brushWcoast.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;  
  this.combatmap = "Brush";
}
BrushWCoastTile.prototype = new TerrainObject();

function ForestTile() {
  this.name = "Forest";
//  this.graphic = "123.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
//  this.losatdistance = { distance : 5 , blocklos : .8 };
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.combatmap = "Forest";
}
ForestTile.prototype = new TerrainObject();

function GroveTile() {
	this.name = "Grove";
//  this.graphic = "123.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .5;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "trees";
  this.initdelay = 1.3;
}
GroveTile.prototype = new TerrainObject();
	
function ForestNCoastTile() {
	this.name = "ForestNCoast";
//	this.graphic = "forestNcoast.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-192";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
//  this.losatdistance = { distance : 5 , blocklos : .8 };
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.combatmap = "Forest";
}
ForestNCoastTile.prototype = new TerrainObject();

function ForestECoastTile() {
	this.name = "ForestECoast";
//	this.graphic = "forestEcoast.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-192";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
//  this.losatdistance = { distance : 5 , blocklos : .8 };
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.combatmap = "Forest";
}
ForestECoastTile.prototype = new TerrainObject();

function ForestSCoastTile() {
	this.name = "ForestSCoast";
//	this.graphic = "forestScoast.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-192";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
//  this.losatdistance = { distance : 5 , blocklos : .8 };
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.combatmap = "Forest";
}
ForestSCoastTile.prototype = new TerrainObject();

function ForestWCoastTile() {
	this.name = "ForestWCoast";
//	this.graphic = "forestWcoast.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-224";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 1;
//  this.losatdistance = { distance : 5 , blocklos : .8 };
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.combatmap = "Forest";
}
ForestWCoastTile.prototype = new TerrainObject();

function HillsTile() {
  this.name = "Hills";
//  this.graphic = "124.gif";
//  this.graphic = "hill.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
//  this.blocklos = .3;
//  this.losatdistance = { distance : 5 , blocklos : .5 };
  this.desc = "hills";
  this.initdelay = 1.5;
  this.combatmap = "Hill";
}
HillsTile.prototype = new TerrainObject();

function PurpleCobblestoneTile() {
  this.name = "PurpleCobblestone";
//  this.graphic = "125.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestone";
}
PurpleCobblestoneTile.prototype = new TerrainObject();

function SwampTile() {
  this.name = "Swamp";
//  this.graphic = "141.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "swamp";
  this.initdelay = 1.2;
  this.combatmap = "Swamp";
}
SwampTile.prototype = new TerrainObject();

SwampTile.prototype.walkon = function(person) {
  var resp = InASwamp(person);
  return resp;
}
SwampTile.prototype.idle = function(person) {
  var resp = InASwamp(person);
  return resp;
}

function InASwamp(who) {
  if (MOVE_LEVITATE & who.getMovetype()) {
    // entity is levitating and cannot be diseased
    return "";
  }
  // percent chance of infection- 10% per step, prorated by speed
  var chance = 10 * (DUTime.getGameClock() - who.getLastTurnTime());  
  if (Math.random()*100 < chance) {  // diseased!
    if (who.getSpellEffectsByName("Disease")) { return 0; }
    var disease = localFactory.createTile("Disease");
    who.addSpellEffect(disease);
    
    DrawCharFrame();
    var response = "You have become diseased!";
    return response;
  }
  return "";
}

function ShinglesTile() {
  this.name = "Shingles";
//  this.graphic = "shingles.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
}
ShinglesTile.prototype = new TerrainObject();

function ShinglesTopTile() {
  this.name = "ShinglesTop";
//  this.graphic = "shingles-top.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
}
ShinglesTopTile.prototype = new TerrainObject();

function CaveFloorTile() {
	this.name = "CaveFloor";
	this.graphic = "cavefloor.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "cave floor";
	
	Tiling.call(this, 2);
}
CaveFloorTile.prototype = new TerrainObject();

function CaveWallTile() {
	this.name = "CaveWall";
	this.graphic = "cavewall.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1;
	this.prefix = "a";
	this.desc = "cave wall";
	
	Tiling.call(this, 2);
	SetBySurround.call(this);
}
CaveWallTile.prototype = new TerrainObject();

function HexFloorTile() {
	this.name = "HexFloor";
//	this.graphic = "hexfloor.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-224";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
}
HexFloorTile.prototype = new TerrainObject();

function GoldOutlineFloorTile() {
	this.name = "GoldOutlineFloor";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-224";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
}
GoldOutlineFloorTile.prototype = new TerrainObject();

function DiamondFloorTile() {
	this.name = "DiamondFloor";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-224";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
}
DiamondFloorTile.prototype = new TerrainObject();

function BlueDiamondFloorTile() {
	this.name = "BlueDiamondFloor";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-224";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
}
BlueDiamondFloorTile.prototype = new TerrainObject();

function PurpleDiamondFloorTile() {
	this.name = "PurpleDiamondFloor";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-256";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
}
PurpleDiamondFloorTile.prototype = new TerrainObject();

function RedDiamondFloorTile() {
	this.name = "RedDiamondFloor";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-256";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
}
RedDiamondFloorTile.prototype = new TerrainObject();

function GreenDiamondFloorTile() {
	this.name = "GreenDiamondFloor";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-288";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
}
GreenDiamondFloorTile.prototype = new TerrainObject();

function YellowDiamondFloorTile() {
	this.name = "YellowDiamondFloor";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-288";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
}
YellowDiamondFloorTile.prototype = new TerrainObject();

function BannerTile() {
  this.name = "Banner";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-256";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "banner of Olympus";
}
BannerTile.prototype = new TerrainObject();

function SeeBelowTile() {
  this.name = "SeeBelow";
  this.graphic = "see-below.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "roof";
}
SeeBelowTile.prototype = new TerrainObject();

function WorldBelowTile() {
  this.name = "WorldBelow";
  this.graphic = "spacer.gif";
//  this.graphic = "world-below.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "world";
}
WorldBelowTile.prototype = new TerrainObject();

// Features!
function FeatureObject() {
  this.addType("Feature");
  this.searchYield = [];   // be careful here
  this.showSearched = 0;
  this.gold = 0;
}
FeatureObject.prototype = new InanimateObject();

FeatureObject.prototype.setGold = function(newgold) {
  newgold = parseInt(newgold);
	this.gold = newgold;
}

FeatureObject.prototype.getGold = function() {
	return this.gold;
}

FeatureObject.prototype.addGold = function(diffgold) {
  diffgold = parseInt(diffgold);
  if (!isNaN(diffgold)) {
    this.gold += diffgold;
  }
  return this.gold;
}

FeatureObject.prototype.getSearchYield = function() {
  return this.searchYield;
}

FeatureObject.prototype.setSearchYield = function(searchable) {
  // searchable must be an array, even if an empty one
  if ($.isArray(searchable)) {
    this.searchYield = searchable;
  }
}

FeatureObject.prototype.addToSearchYield = function(searchable) {
  if (!this.searchYield.length) {
    this.searchYield = [];
  }
  this.searchYield.push(searchable);
}

FeatureObject.prototype.getShowSearched = function() {
  return this.showSearched;
}

FeatureObject.prototype.setShowSearched = function(showsearch) {
  this.showSearched = showsearch;
  return this.showSearched;
}

FeatureObject.prototype.getSearchedGraphic = function() {
  if (this.searchedgraphic) {
    return this.searchedgraphic;  // should be a graphic array
  }
}
// end definitions, begin features

function LavaTile() {
  this.name = "Lava";
  this.graphic = "flowing_animations.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK + MOVE_SWIM;
  this.blocklos = 0;
  this.desc = "lava";
  this.initdelay = 1.2;
  this.spritexoffset = "-224";
  this.spriteyoffset = "0";
  
  LightEmitting.call(this, 1);
}
LavaTile.prototype = new FeatureObject();

LavaTile.prototype.walkon = function(person) {
  // return messages, perform action
  var resp = InLava(person);
  return resp;
}

LavaTile.prototype.idle = function(person) {
  var resp = InLava(person);
  return resp;
}

function InLava(who) {
  // WORK HERE
}

function CoralTile() {
  this.name = "Coral";
  this.graphic = "coral.gif";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "coral reef";
  
  LightEmitting.call(this, 1);
}
CoralTile.prototype = new FeatureObject();

function DungeonTile() {
  this.name = "Dungeon";
  this.graphic = "151.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
DungeonTile.prototype = new FeatureObject();

function CaveTile() {
  this.name = "Cave";
  this.graphic = "cave.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "cave entrance";

  Enterable.call(this, "null", 0, 0);
}
CaveTile.prototype = new FeatureObject();

function TowneTile() {
  this.name = "Towne";
  this.graphic = "152.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "towne";

  Enterable.call(this, "null", 0, 0);
}
TowneTile.prototype = new FeatureObject();

function KeepTile() {
  this.name = "Keep";
  this.graphic = "153.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "keep";

  Enterable.call(this, "null", 0, 0);
}
KeepTile.prototype = new FeatureObject();

function GrassTowerTile() {
  this.name = "GrassTower";
  this.graphic = "tower-grass.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tower";

  Enterable.call(this, "null", 0, 0);
}
GrassTowerTile.prototype = new FeatureObject();

function HillTowerTile() {
  this.name = "HillTower";
  this.graphic = "tower-hill.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tower";

  Enterable.call(this, "null", 0, 0);
}
HillTowerTile.prototype = new FeatureObject();

function LighthouseTile() {
  this.name = "Lighthouse";
  this.graphic = "lighthouse.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lighthouse";

  Enterable.call(this, "null", 0, 0);
}
LighthouseTile.prototype = new FeatureObject();

function VillageTile() {
  this.name = "Village";
  this.graphic = "154.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "village";

  Enterable.call(this, "null", 0, 0);
}
VillageTile.prototype = new FeatureObject();

function CastleTile() {
  this.name = "Castle";
  this.graphic = "155.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "Castle Olympus";

  Enterable.call(this, "null", 0, 0);
}
CastleTile.prototype = new FeatureObject();

CastleTile.prototype.bumpinto = function(who) {
	var retval = {};
	retval["canmove"] = 1;
	retval["msg"] = "";
	
	if ((who.getx() === this.getx()) && ((this.gety() - who.gety()) === 1)) {
	  // mover is north of the castle, block
	  retval["canmove"] = 0;
	  retval["msg"] = "Blocked!";
	}
  return(retval);
}


function LeftCastleTile() {
  this.name = "LeftCastle";
  this.graphic = "005.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Olympus";
}
LeftCastleTile.prototype = new FeatureObject();

function RightCastleTile() {
  this.name = "RightCastle";
  this.graphic = "006.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Olympus";
}
RightCastleTile.prototype = new FeatureObject();

function DoorwayTile() {
  this.name = "Doorway";
  this.graphic = "103.gif";
  this.overlay = "archway.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
  
  SetByBelow.call(this);
}
DoorwayTile.prototype = new FeatureObject();

function StoneDoorwayTile() {
  this.name = "StoneDoorway";
  this.graphic = "055.gif";
  this.overlay = "stone-arch.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
  
//  SetByBelow.call(this);
}
StoneDoorwayTile.prototype = new FeatureObject();

function WallDoorwayTile() {
  this.name = "WallDoorway";
  this.graphic = "055.gif";
  this.overlay = "wall-arch.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
  
//  SetByBelow.call(this);
}
WallDoorwayTile.prototype = new FeatureObject();

function ShrineTile() {
  this.name = "Shrine";
  this.graphic = "156.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "gate";

//  Enterable.call(this, "null", 0, 0);
}
ShrineTile.prototype = new FeatureObject();

function BrokenShrineTile() {
  this.name = "BrokenShrine";
  this.graphic = "brokengate.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken gate";

//  Enterable.call(this, "null", 0, 0);
}
BrokenShrineTile.prototype = new FeatureObject();

function RuinsTile() {
  this.name = "Ruins";
  this.graphic = "157.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ruin";

  Enterable.call(this, "null", 0, 0);
}
RuinsTile.prototype = new FeatureObject();

function ChestTile() {
  Lockable.call(this, "008.gif", "008.gif", "008.gif", 	"a",  "chest", "a", "locked chest", "a", "magically locked chest");
	this.name = "Chest";
	this.graphic = "008.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "chest";
	
	this.lootgroup = "";
	this.lootedid = "";
	
	this.container = [];
	OpenContainer.call(this);
}
ChestTile.prototype = new FeatureObject();

ChestTile.prototype.getLootgroup = function() {
  return this.lootgroup;
}

ChestTile.prototype.setLootgroup = function(lg) {
  this.lootgroup = lg;
  return this.lootgroup;
}

ChestTile.prototype.getLootedID = function() {
  return this.lootedid;
}

ChestTile.prototype.setLootedID = function(lid) {
  this.lootedid = lid;
  return this.lootedid;
}


function DoorWindowTile() {
  Lockable.call(this, "009.gif", "010.gif", "067.gif", "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "DoorWindow";
	this.graphic = "009.gif";
	this.overlay = "009.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = { distance : 1 , blocklos : 0 };
	this.blockloe = 1;
	this.prefix = "a";
	this.desc = "door";

	SetByBelow.call(this);
  Openable.call(this, [this.graphic, this.overlay, 0, 0], [this.graphic, "archway.gif", 0, 0], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
DoorWindowTile.prototype = new FeatureObject();

function StonePortcullisTile() {
  Lockable.call(this, "stone-portcullis.gif", "stone-portcullis.gif", "stone-portcullis.gif", "a", "portcullis", "a", "portcullis", "a", "portcullis");
	
	this.name = "StonePortcullis";
	this.graphic = "stone-portcullis.gif";
	this.overlay = "stone-portcullis.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "portcullis";

//	SetByBelow.call(this);
  Openable.call(this, [this.graphic, this.overlay, 0, 0], ["055.gif", "stone-arch.gif", 0, 0], 0, "", "", "sfx_locked_door");  // ADD WHEN SOUNDS ADDED
}
StonePortcullisTile.prototype = new FeatureObject();

function WallPortcullisTile() {
  Lockable.call(this, "wall-portcullis.gif", "wall-portcullis.gif", "wall-portcullis.gif", "a", "portcullis", "a", "portcullis", "a", "portcullis");
	
	this.name = "WallPortcullis";
	this.graphic = "wall-portcullis.gif";
	this.overlay = "wall-portcullis.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "portcullis";

//	SetByBelow.call(this);
  Openable.call(this, [this.graphic, this.overlay, 0, 0], ["055.gif", "wall-arch.gif", 0, 0], 0, "", "", "sfx_locked_door");  // HERE TOO
}
WallPortcullisTile.prototype = new FeatureObject();

function CorpseTile() {
	this.name = "Corpse";
	this.graphic = "012.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "corpse";
	this.showSearched = 1;
}
CorpseTile.prototype = new FeatureObject();

function BloodTile() {
	this.name = "Blood";
	this.graphic = "blood.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "";
  this.desc = "blood";
  this.showSearched = 1;
}
BloodTile.prototype = new FeatureObject();

function EnergyFieldTile() {
	this.name = "EnergyField";
	this.graphic = "flowing_animations.gif";
	this.passable = 0; // impassable - wonky outdoors, but necessary indoors
	this.blocklos = 0;
	this.blockloe = 1;
//	this.light = 1;
  this.prefix = "an"; 
	this.desc = "energy field";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
	
	LightEmitting.call(this, 1);
}
EnergyFieldTile.prototype = new FeatureObject();

function TorchWestTile() {
	this.name = "TorchWest";
	this.graphic = "torch_l.gif";
	this.overlay = "torch_l.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "torch";

  SetByBelow.call(this);	
	LightEmitting.call(this, 2);
}
TorchWestTile.prototype = new FeatureObject();  

function TorchEastTile() {
	this.name = "TorchEast";
	this.graphic = "torch_r.gif";
	this.overlay = "torch_r.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "torch";

  SetByBelow.call(this);	
	LightEmitting.call(this, 2);
}
TorchEastTile.prototype = new FeatureObject();  

function CampfireTile() {
	this.name = "Campfire";
	this.graphic = "campfire.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "campfire";
	
	LightEmitting.call(this, 2);
}
CampfireTile.prototype = new FeatureObject();

function SpitTile() {
	this.name = "Spit";
	this.graphic = "spit.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "campfire";
	
	LightEmitting.call(this, 2);
}
SpitTile.prototype = new FeatureObject();

function FireplaceTile() {
	this.name = "Fireplace";
	this.graphic = "fireplace.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 2;
  this.prefix = "a";
	this.desc = "fireplace";
	
	LightEmitting.call(this, 2);
}
FireplaceTile.prototype = new FeatureObject();

function AltarTile() {
	this.name = "Altar";
	this.graphic = "023.gif";
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "altar";
}
AltarTile.prototype = new FeatureObject();

function DoorTile() {
  Lockable.call(this, "064.gif", "065.gif", "066.gif", "a", "door", "a", "locked door", "a", "magically locked door");
  	
	this.name = "Door";
	this.graphic = "064.gif";
	this.overlay = "064.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
	this.desc = "door";

	SetByBelow.call(this);
	Openable.call(this, [this.graphic, this.overlay, 0, 0], [this.graphic, "archway.gif", 0, 0], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
DoorTile.prototype = new FeatureObject();

function TalkingDoorTile() {
  this.name = "TalkingDoor";
  this.conversation = "ash_door";
}
TalkingDoorTile.prototype = new DoorTile();

TalkingDoorTile.prototype.getConversation = function() {
  return this.conversation;
}

TalkingDoorTile.prototype.getGenderedTerms = function() {
  var gt = {};
  gt.pronoun = "it";
  gt.possessive = "its";
  gt.objective = "it";
  gt.titled = "Lord";
  gt.sibling = "sibling";
  gt.kiddie = "child";    
  return gt;  
}

TalkingDoorTile.prototype.activate = function(timeoverride) {
  this.use_old = this.use;
  this.use = function(who) {
    var retval;
    maintext.addText("Use " + this.getDesc() + ":");
    retval = PerformTalk(this,"ash_door","_start");
    retval["override"] = 1;
    maintext.setInputLine("&gt; You say: ");
    maintext.drawTextFrame();
    return retval;
  };
  return 1;
}

function SleepFieldTile() {
	this.name = "SleepField";
	this.graphic = "flowing_animations.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 1;
  this.prefix = "a";
	this.desc = "sleep field";
	this.initdelay = 1.5;
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
	
	LightEmitting.call(this, 1);
}
SleepFieldTile.prototype = new FeatureObject();

SleepFieldTile.prototype.walkon = function(person) {
  var resp = InASleepField(person);
  return resp;
}
SleepFieldTile.prototype.idle = function(person) {
  var resp = InASleepField(person);
  return resp;
}

function InASleepField(who) {
  var resist = who.getResist("magic");
  resist = 1-(resist/100);
  var chance = .5 * resist;
  if (Math.random()*1 < chance) {
    if (who.getSpellEffectsByName("Sleep")) { return 0; }
    var fieldeffect = localFactory.createTile("Sleep");
    
    var duration = (RollDice("2d3") - who.getInt()/20) * SCALE_TIME;
    fieldeffect.setExpiresTime(duration + DUTime.getGameClock());
    who.addSpellEffect(fieldeffect);
    
    DrawCharFrame();

  }
  return "";
}

function FireFieldTile() {
	this.name = "FireField";
	this.graphic = "flowing_animations.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 3;
  this.prefix = "a";
	this.desc = "fire field";
	this.spritexoffset = "-32";
  this.spriteyoffset = "0";
	
	LightEmitting.call(this, 3);
	this.initdelay = 1.5;
}
FireFieldTile.prototype = new FeatureObject();

FireFieldTile.prototype.walkon = function(person) {
  var resp = InAFireField(person);
  return resp;
}
FireFieldTile.prototype.idle = function(person) {
  var resp = InAFireField(person);
  return resp;
}

function InAFireField(who) {
  var dmg = RollDice("2d6+3");
  dmg = (1/SCALE_TIME)*(DUTime.getGameClock() - who.getLastTurnTime()) * dmg;
  var response = "The fire field burns you!";
  var resist = who.getResist("magic");
  resist = 1-(resist/100);
  dmg = dmg*resist;
  who.dealDamage(dmg, this);
  
  return response;
}

function PoisonFieldTile() {
	this.name = "PoisonField";
	this.graphic = "flowing_animations.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 1;
  this.prefix = "a";
	this.desc = "poison field";
	this.initdelay = 1.5;
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
	
	LightEmitting.call(this, 1);
}
PoisonFieldTile.prototype = new FeatureObject();

PoisonFieldTile.prototype.walkon = function(person) {
  var resp = InAPoisonField(person);
  return resp;
}
PoisonFieldTile.prototype.idle = function(person) {
  var resp = InAPoisonField(person);
  return resp;
}

function InAPoisonField(who){
  if ((who.special.indexOf("undead") > -1) || (who.special.indexOf("construct") > -1)) {
    return "";
  }
  var poisonchance = .75;
  poisonchance = (1/SCALE_TIME)*(DUTime.getGameClock() - who.getLastTurnTime()) * poisonchance;
  poisonchance = poisonchance * (1-who.getResist()/100);  
  if (Math.random()*1 < poisonchance) {  
    if (who.getSpellEffectsByName("Poison")) { return 0; }
    var poison = localFactory.createTile("Poison");
    
    var duration = (20+RollDice("2d10") + who.getInt() - 15) * SCALE_TIME;
    poison.setExpiresTime(duration + DUTime.getGameClock());
    who.addSpellEffect(poison);
    
    DrawCharFrame();
    var response = "You are poisoned!";
    return response;
  }

  return "";
}

function LadderDownTile() {
  this.name = "LadderDown";
  this.graphic = "features.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ladder";

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
LadderDownTile.prototype = new FeatureObject();

function LadderUpTile() {
  this.name = "LadderUp";
  this.graphic = "features.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ladder";

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
LadderUpTile.prototype = new FeatureObject();

function StairDownTile() {
  this.name = "StairDown";
  this.graphic = "features.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
StairDownTile.prototype = new FeatureObject();

function StairUpTile() {
  this.name = "StairUp";
  this.graphic = "features.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
StairUpTile.prototype = new FeatureObject();

function StairDown2Tile() {
  this.name = "StairDown2";
  this.graphic = "features.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
StairDown2Tile.prototype = new FeatureObject();

function StairUp2Tile() {
  this.name = "StairUp2";
  this.graphic = "features.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
StairUp2Tile.prototype = new FeatureObject();

function SingleSignpostTile() {
  this.name = "SingleSignpost";
  this.graphic = "features.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
}
SingleSignpostTile.prototype = new FeatureObject();

function SignpostLeftTile() {
  this.name = "SignpostLeft";
  this.graphic = "features.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
}
SignpostLeftTile.prototype = new FeatureObject();

function SignpostRightTile() {
  this.name = "SignpostRight";
  this.graphic = "features.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
}
SignpostRightTile.prototype = new FeatureObject();

function InnSignTile() {
  this.name = "InnSign";
  this.graphic = "features.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "inn";
}
InnSignTile.prototype = new FeatureObject();

function TavernSignTile() {
  this.name = "TavernSign";
  this.graphic = "features.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tavern";
}
TavernSignTile.prototype = new FeatureObject();

function ArmourySignTile() {
  this.name = "ArmourySign";
  this.graphic = "features.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "armoury";
}
ArmourySignTile.prototype = new FeatureObject();

function GrocerSignTile() {
  this.name = "GrocerSign";
  this.graphic = "features.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grocer";
}
GrocerSignTile.prototype = new FeatureObject();

function GrocerSign2Tile() {
  this.name = "GrocerSign2";
  this.graphic = "features.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grocer";
}
GrocerSign2Tile.prototype = new FeatureObject();

function WeaponSignTile() {
  this.name = "WeaponSign";
  this.graphic = "features.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "weaponsmith";
}
WeaponSignTile.prototype = new FeatureObject();

function AlchemistSignTile() {
  this.name = "AlchemistSign";
  this.graphic = "features.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemist";
}
AlchemistSignTile.prototype = new FeatureObject();

function MagicShoppeSignTile() {
  this.name = "MagicShoppeSign";
  this.graphic = "features.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "magic shoppe";
}
MagicShoppeSignTile.prototype = new FeatureObject();

function HealerSignTile() {
  this.name = "HealerSign";
  this.graphic = "features.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "healer";
}
HealerSignTile.prototype = new FeatureObject();

function CasinoSignTile() {
  this.name = "CasinoSign";
  this.graphic = "features.gif";
  this.spritexoffset = "-260";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "casino";
}
CasinoSignTile.prototype = new FeatureObject();
  
function WBridgeNSTile() {
  this.name = "WBridgeNS";
  this.graphic = "070.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
WBridgeNSTile.prototype = new FeatureObject();

function EBridgeNSTile() {
  this.name = "EBridgeNS";
  this.graphic = "071.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
EBridgeNSTile.prototype = new FeatureObject();

function BridgeNSTile() {
  this.name = "BridgeNS";
  this.graphic = "072.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
BridgeNSTile.prototype = new FeatureObject();

function NBridgeEWTile() {
  this.name = "NBridgeEW";
  this.graphic = "101.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
NBridgeEWTile.prototype = new FeatureObject();

function SBridgeEWTile() {
  this.name = "SBridgeEW";
  this.graphic = "102.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
SBridgeEWTile.prototype = new FeatureObject();

function BridgeEWTile() {
  this.name = "BridgeEW";
  this.graphic = "126.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
}
BridgeEWTile.prototype = new FeatureObject();

function LeftChairTile() {
  this.name = "LeftChair";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
LeftChairTile.prototype = new FeatureObject();

function RightChairTile() {
  this.name = "RightChair";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
RightChairTile.prototype = new FeatureObject();

function TopChairTile() {
  this.name = "TopChair";
  this.graphic = "furniture.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
TopChairTile.prototype = new FeatureObject();

function BottomChairTile() {
  this.name = "BottomChair";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
BottomChairTile.prototype = new FeatureObject();

function LeftChairWoodTile() {
  this.name = "LeftChairWood";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-64";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
LeftChairWoodTile.prototype = new FeatureObject();

function RightChairWoodTile() {
  this.name = "RightChairWood";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-32";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
RightChairWoodTile.prototype = new FeatureObject();

function TopChairWoodTile() {
  this.name = "TopChairWood";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
TopChairWoodTile.prototype = new FeatureObject();

function BottomChairWoodTile() {
  this.name = "BottomChairWood";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-64";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
}
BottomChairWoodTile.prototype = new FeatureObject();

function LeftTableTile() {
  this.name = "LeftTable";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
LeftTableTile.prototype = new FeatureObject();

function MiddleTableTile() {
  this.name = "MiddleTable";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
MiddleTableTile.prototype = new FeatureObject();

function RightTableTile() {
  this.name = "RightTable";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
RightTableTile.prototype = new FeatureObject();

function LeftTableOnWoodTile() {
  this.name = "LeftTableOnWood";
  this.graphic = "furniture.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
LeftTableOnWoodTile.prototype = new FeatureObject();

function MiddleTableOnWoodTile() {
  this.name = "MiddleTableOnWood";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
MiddleTableOnWoodTile.prototype = new FeatureObject();

function RightTableOnWoodTile() {
  this.name = "RightTableOnWood";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
RightTableOnWoodTile.prototype = new FeatureObject();



function BedHeadTile() {
  this.name = "BedHead";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
}
BedHeadTile.prototype = new FeatureObject();

function BedFootTile() {
  this.name = "BedFoot";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
}
BedFootTile.prototype = new FeatureObject();

function BookshelfLeftTile() {
  this.name = "BookshelfLeft";
  this.graphic = "furniture.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["furniture.gif", "", "-96", "-32"];
}
BookshelfLeftTile.prototype = new FeatureObject();

function BookshelfRightTile() {
  this.name = "BookshelfRight";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["furniture.gif", "", "-128", "-32"];
}
BookshelfRightTile.prototype = new FeatureObject();

function BookshelfOneTile() {
  this.name = "BookshelfOne";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["furniture.gif", "", "-160", "-32"];
}
BookshelfOneTile.prototype = new FeatureObject();

function SmallBoxTile() {
  this.name = "SmallBoxOne";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "small box";
  this.showsearched = 1;
  this.searchedgraphic = ["furniture.gif", "", "-256", "-32"];
}
BookshelfOneTile.prototype = new FeatureObject();

function MirrorTile() {
  this.name = "Mirror";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mirror";
}
MirrorTile.prototype = new FeatureObject();

MirrorTile.prototype.activate = function() {
  if (!DU.gameflags.editor) {
    var reflection = localFactory.createTile("Reflection");
    reflection.mirror = this;
    var homemap = this.getHomeMap();
    homemap.placeThing(this.getx(),this.gety()+1,reflection);
  }
  return 1;
}

function ReflectionTile() {
  this.name = "Reflection";
  this.graphic = "walkon.gif";
  this.invisible = 1;
  this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "reflection walkon";
  this.nosave = 1;
}
ReflectionTile.prototype = new FeatureObject();

ReflectionTile.prototype.walkon = function(who) {
  // add reflection to attached mirror
  this.mirror.setGraphicArray([who.getGraphic(), "mirror-reflection.gif", "0", "7"]);
}

ReflectionTile.prototype.walkoff = function(who) {
  // remove reflection from attached mirror
  this.mirror.setGraphicArray(["furniture.gif", "", "-192", "0"]);
}

function SecretDoorTile() {
	this.name = "SecretDoor";
	this.graphic = "056.gif";   // note: 024 is U4's secret door
	this.overlay = "056.gif";
//  this.graphic = "terrain_tiles.gif";
//  this.spritexoffset = "-96";
//  this.spriteyoffset = "-128";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 2; 
	this.prefix = "a";
	this.desc = "wall";
	
	SetByBelow.call(this);
}
SecretDoorTile.prototype = new FeatureObject();

function WellTile() {
	this.name = "Well";
	this.graphic = "well.gif";   
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "well";
}
WellTile.prototype = new FeatureObject();

function WhirlpoolTile() {
	this.name = "Whirlpool";
	this.graphic = "325.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "whirlpool";
  
  Enterable.call(this, "null", 0, 0);
}
WhirlpoolTile.prototype = new FeatureObject();

function WalkOnTile() {
	this.name = "WalkOn";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnTile.prototype = new FeatureObject();

function WalkOnChangeExitTile() {
  this.name = "WalkOnChangeExit";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.setxto = 0;
	this.setyto = 0;
}
WalkOnChangeExitTile.prototype = new FeatureObject();

WalkOnChangeExitTile.prototype.walkon = function(walker) {
  var themap=walker.getHomeMap();
  themap.setExitToX(this.setxto);
  themap.setExitToY(this.setyto);
}

function WalkOnAbyssTile() {
  this.name = "WalkOnAbyss";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss1";
	this.destx = 10;
	this.desty = 10;
	this.say = '';
}
WalkOnAbyssTile.prototype = new FeatureObject();

WalkOnAbyssTile.prototype.walkon = function(walker) {
  var themap=walker.getHomeMap();
  newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);
  DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  if (this.say) {
    maintext.addText(this.say);
  }
}

function WalkOnAbyss0Tile() {
  this.name = "WalkOnAbyss0";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss1";
	this.destx = 10;
	this.desty = 10;
	this.say = 'Voice: "As you learn, and feel, and gain experience, you fill your landscape with knowledge."';
}
WalkOnAbyss0Tile.prototype = new WalkOnAbyssTile();

function WalkOnAbyss1Tile() {
  this.name = "WalkOnAbyss1";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss2";
	this.destx = 0;
	this.desty = 0;
}
WalkOnAbyss1Tile.prototype = new WalkOnAbyssTile();

function WalkOnAbyss2Tile() {
  this.name = "WalkOnAbyss2";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss3";
	this.destx = 0;
	this.desty = 0;
}
WalkOnAbyss2Tile.prototype = new WalkOnAbyssTile();

function WalkOnAbyss3Tile() {
  this.name = "WalkOnAbyss3";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss4";
	this.destx = 0;
	this.desty = 0;
	this.say = 'Voice: "To attain the higher initiation, you must first master yourself."';
}
WalkOnAbyss3Tile.prototype = new WalkOnAbyssTile();

function WalkOnAbyss4Tile() {
  this.name = "WalkOnAbyss4";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
	this.destmap = "abyss5";
	this.destx = 0;
	this.desty = 0;
	this.say = 'Voice: "Through this portal you shall be challenged. Prove your mastery of the self and you shall be counted as one of the great."';
}
WalkOnAbyss4Tile.prototype = new WalkOnAbyssTile();


function SpawnerTile() {
  this.name = "Spawner";
  this.graphic = "target-cursor.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
  this.blockslos = 0;
  this.prefix = "an";
  this.desc = "invisible spawner";
  this.invisible = 1;
  
  this.spawngroup = [];
  this.maxSpawns = 5; 
  this.spawnRadius = 0; // distance from spawner entity can appear
  this.spawnLeash = 20;
  this.spawnSoftLeash = 15;
  this.spawnFreq = 30;
  this.lastSpawned = 0;
  
  this.level = 1;
  this.evolve = [];  
  // if evolve [#] exists, the first time the player is that level and the spawner isn't
  // yet, go through the pairs of keyword/value and set then to the spawner
  
  this.spawned = new Collection();
}
SpawnerTile.prototype = new FeatureObject();

SpawnerTile.prototype.getSpawngroup = function() {
  return this.spawngroup;
}

SpawnerTile.prototype.setSpawngroup = function(newgroup) {
  this.spawngroup = newgroup;
  return this.spawngroup;
}

SpawnerTile.prototype.pickSpawn = function() {
  var spindex = Math.floor(Math.random() * this.getSpawngroup().length);
  var spawns= this.getSpawngroup();
  return spawns[spindex];
}

SpawnerTile.prototype.getMaxSpawns = function() {
  return this.maxSpawns;
}

SpawnerTile.prototype.setMaxSpawns = function(spawnnum) {
  spawnnum = parseInt(spawnnum);
  if (!isNaN(spawnnum)) {
    this.maxSpawns = spawnnum;
  }
  return this.maxSpawns;
}

SpawnerTile.prototype.getSpawnRadius = function() {
  return this.spawnRadius;
}

SpawnerTile.prototype.setSpawnRadius = function(spawnnum) {
  spawnnum = parseInt(spawnnum);
  if (!isNaN(spawnnum)) {
    this.spawnRadius = spawnnum;
  }
  return this.spawnRadius;
}

SpawnerTile.prototype.getSpawnLeash = function() {
  return this.spawnLeash;
}

SpawnerTile.prototype.setSpawnLeash = function(spawnnum) {
  spawnnum = parseInt(spawnnum);
  if (!isNaN(spawnnum)) {
    this.spawnLeash = spawnnum;
  }
  return this.spawnLeash;
}

SpawnerTile.prototype.getSpawnSoftLeash = function() {
  return this.spawnSoftLeash;
}

SpawnerTile.prototype.setSpawnSoftLeash = function(spawnnum) {
  spawnnum = parseInt(spawnnum);
  if (!isNaN(spawnnum)) {
    this.spawnSoftLeash = spawnnum;
  }
  return this.spawnSoftLeash;
}

SpawnerTile.prototype.getSpawnFreq = function() {
  return this.spawnFreq;
}

SpawnerTile.prototype.setSpawnFreq = function(spawnnum) {
  spawnnum = parseInt(spawnnum);
  if (!isNaN(spawnnum)) {
    this.spawnFreq = spawnnum;
  }
  return this.spawnFreq;
}

SpawnerTile.prototype.addSpawned = function(spawned) {
  this.spawned.addTop(spawned);
}

SpawnerTile.prototype.deleteSpawned = function(spawned) {
  this.spawned.deleteFrom(spawned);
}

SpawnerTile.prototype.getSpawned = function() {
  return this.spawned;
}

SpawnerTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    if (debug) {
      dbs.writeln("<span style='color:green;font-weight:bold'>Spawner " + this.getName() + " activating at " + DUTime.getGameClock() + ".</span><br />");
    }

    var NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,1);
  }
}

SpawnerTile.prototype.myTurn = function() {
  if (!maps.getMap(this.getHomeMap().getName())) {
    // removing from timeline, its map is gone
//    var nextEntity = DUTime.executeNextEvent().getEntity();
//    nextEntity.myTurn();

    dbs.writeln("<span style='color:green;font-weight:bold'>Spawner " + this.getSerial() + " removed from game- map gone.</span><br />");
  
    return 1;
  }
  if (PC.getLevel() > this.level) {  
    for (var i = this.level+1; i<=PC.getLevel(); i++) {
      if (this.evolve[i]) {
        this.level = i;
        if (debug) { dbs.writeln("<span style='color:#00cc00'>Spawner at " + this.x + ", " + this.y + " has evolved.</span><br />"); }
        while (this.evolve[i]) {
          var idx = shift(this.evolve[i]);
          var val = shift(this.evolve[i]);
          this.idx = val;
        }
      }
    }
  }
  
  var timetonext = (this.getSpawnFreq() + (Math.random()*((this.getSpawnFreq()/2)+1)));
  if ((this.spawned.getAll().length < this.getMaxSpawns()) && ((this.getHomeMap() != PC.getHomeMap()) || (GetDistance(PC.getx(), PC.gety(), this.getx(), this.gety()) > 10))) {
      // let's do some spawning
      var spawntype = this.pickSpawn();
      var newspawn = localFactory.createTile(spawntype);
      var diffx = Math.floor(Math.random() * this.getSpawnRadius() * 2) - this.getSpawnRadius();
      var diffy = Math.floor(Math.random() * this.getSpawnRadius() * 2) - this.getSpawnRadius();
      var mymap = this.getHomeMap();
      
      var tile = mymap.getTile(this.getx() + diffx, this.gety() + diffy);
      var resp = tile.canMoveHere(newspawn.getMovetype());
      if (resp["canmove"]) {
        mymap.placeThing(this.getx() + diffx, this.gety() + diffy, newspawn);
        this.addSpawned(newspawn);
        newspawn.setSpawnedBy(this);
        if (debug) { dbs.writeln("<span style='color:#00cc00'>Spawner at " + this.x + ", " + this.y + " has spawned a " + newspawn.getName() + " #" + newspawn.getSerial() + "</span><br />"); }
      } else {
        timetonext = 5;
      }
      
  }
 
  var NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,timetonext);
  
//  var nextEntity = DUTime.executeNextEvent().getEntity();
  //setTimeout(function(){ nextEntity.myTurn(); }, 1);
//  nextEntity.myTurn();
  return 1;
}

function PentagramNWTile() {
  this.name = "PentagramNW";
  this.graphic = "pentagram.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramNWTile.prototype = new FeatureObject();

function PentagramNTile() {
  this.name = "PentagramN";
  this.graphic = "pentagram.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramNTile.prototype = new FeatureObject();

function PentagramNETile() {
  this.name = "PentagramNE";
  this.graphic = "pentagram.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramNETile.prototype = new FeatureObject();

function PentagramWTile() {
  this.name = "PentagramW";
  this.graphic = "pentagram.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramWTile.prototype = new FeatureObject();

function PentagramCTile() {
  this.name = "PentagramC";
  this.graphic = "pentagram.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramCTile.prototype = new FeatureObject();

function PentagramETile() {
  this.name = "PentagramE";
  this.graphic = "pentagram.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramETile.prototype = new FeatureObject();

function PentagramSWTile() {
  this.name = "PentagramSW";
  this.graphic = "pentagram.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramSWTile.prototype = new FeatureObject();

function PentagramSTile() {
  this.name = "PentagramS";
  this.graphic = "pentagram.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramSTile.prototype = new FeatureObject();

function PentagramSETile() {
  this.name = "PentagramSE";
  this.graphic = "pentagram.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramSETile.prototype = new FeatureObject();

function MoatLeverOffTile() {
  this.name = "MoatLeverOff";
  this.graphic = "moatLever-off.gif";
  this.overlay = "moatLever-off.gif";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
  
  SetByBelow.call(this);
}
MoatLeverOffTile.prototype = new FeatureObject();

function LeverOffTile() {
  this.name = "LeverOff";
  this.graphic = "switch-off.gif";
  this.overlay = "switch-off.gif";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
  
  SetByBelow.call(this);
}
LeverOffTile.prototype = new FeatureObject();

function GrottoLeverOffTile() {
  this.name = "GrotoLeverOff";
  this.graphic = "switch-off.gif";
  this.overlay = "switch-off.gif";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
  
  SetByBelow.call(this);
}
GrottoLeverOffTile.prototype = new FeatureObject();

GrottoLeverOffTile.prototype.use = function(who) {
  var retval = {};
  retval["txt"] = "There is a deafening sound of rushing water! The water levels recede.";
  this.overlay = "switch-on.gif";
  var frommap = this.getHomeMap();
  var tomap = maps.getMap("grotto2");
  
  var feas = frommap.features.getAll();
  $.each(feas, function(idx,val) {
    if (val.getName() !== "EnergyField") {
      MoveBetweenMaps(val,frommap,tomap,val.getx(),val.gety());
    }
  });
  var npcs = frommap.npcs.getAll();
  $.each(npcs, function(idx,val) {
    MoveBetweenMaps(val,frommap,tomap,val.getx(),val.gety());
  });
  MoveBetweenMaps(PC,frommap,tomap,PC.getx(),PC.gety());
  
  DrawMainFrame("draw", "grotto2", PC.getx(), PC.gety());
  return retval;
}

function MetalTwisterLeverTile() {
  this.name = "MetalTwisterLever";
  this.graphic = "switch-off.gif";
  this.overlay = "switch-off.gif";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
  
  SetByBelow.call(this);
}
MetalTwisterLeverTile.prototype = new FeatureObject();
  
MetalTwisterLeverTile.prototype.use = function(user) {
    var level3 = maps.getMap("metaltwister3");
    var level2 = maps.getMap("metaltwister2");
    var retval = {};
    if (!level2) {  // somehow level 2 is not in memory. Load it.
      var otherlevel = new GameMap();
      otherlevel.loadMap("metaltwister2");
      maps.addMapByRef(otherlevel);
      level2 = otherlevel;
    }
    if (this.getOverlay() == "switch-off.gif") {  // This switch hasn't been thrown
      this.setOverlay("switch-on.gif");
      retval["txt"] = "Click!";
      
      var checkboth = 1;
      var floor3features = level3.features.getAll();
      var ports = [];
      for (i=0; i<floor3features.length; i++) {
        if (floor3features[i].getName() == "LeverOff") {
          if (floor3features[i].getOverlay() == "switch-off.gif") {
            checkboth = 0;
          }
        }
        if (floor3features[i].getName() == "StonePortcullis") {
          ports[ports.length] = floor3features[i];
        }
      }
      if (checkboth) {  // if both switches are thrown, open the dungeon's doors
        for (i=0; i<ports.length; i++) {
          ports[i].unlockMe();
          ports[i].use(user);
        }
        var floor2features = level2.features.getAll();
        for (i=0; i<floor2features.length; i++) {
          if (floor2features[i].getName() == "StonePortcullis") {
            floor2features[i].unlockMe();
            floor2features[i].use(user);
          }
        }
      }
    }
    else {  // for sanity's sake, you can't unthrow a switch
      retval["txt"] = "The switch is stuck."; 
    }
    return retval;  
}

function PitDespairLeverTile() {
  this.name = "PitDespairLever";
  this.graphic = "switch-off.gif";
  this.overlay = "switch-off.gif";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
  
  SetByBelow.call(this);
}
PitDespairLeverTile.prototype = new FeatureObject();

PitDespairLeverTile.prototype.use = function(user) {
  var retval = {};
  if (this.attached) {
    var thismap = user.getHomeMap();
    var doortile = thismap.getTile(this.attached.x, this.attached.y);
    var ftrs = doortile.getFeatures();
    var door;
    $.each(ftrs, function(idx, val) {
      if (val.getName() === "WallPortcullis") { door = val; }
    });
    if (this.graphic === "switch-off.gif") {
      door.locked = 0;
      door.setGraphicArray(["055.gif", "wall-arch.gif", 0, 0]);
			
			door.closedLOS = door.getBlocksLOSArray();
			var seethru = [];
			seethru[0] = 0;
			door.setBlocksLOSArray(seethru);
			
			door.addPassable(MOVE_WALK);
			door.open = 1;
			
			this.graphic = "switch-on.gif";
			this.overlay = "switch-on.gif";
    } else {
      var mobs = doortile.getNPCs();
      var diffx = 0;
      var diffy = 0;
      if (this.gety() === 36) {
        diffy = -1;
      } else if ((this.getx() === 11) || (this.getx() === 25)) {
        diffx = 1;
      } else {
        diffx = -1;
      }
      $.each(mobs, function(idx,val) {
        thismap.moveThing(val.getx() + diffx , val.gety() + diffy, val);
        val.dealDamage(1000, door);
      });
      door.locked = 1;
      door.setGraphicArray(["wall-portcullis.gif", "wall-portcullis.gif", 0, 0]);
      
      door.setBlocksLOSArray(door.closedLOS);
      door.closedLOS = [];
			
      door.removePassable(MOVE_WALK);
      door.open = 0;
      
      this.graphic = "switch-off.gif";
      this.graphic = "switch-on.gif";
    }
    retval["fin"] = 1;
    retval["txt"] = "Switch thrown.";
  } else {
    alert("Lever unattached!");
    retval["fin"] = 0;
  }
  
  return retval;
}

function RoyalPuzzleLaserEWTile() {
  this.name = "RoyalPuzzleLaserEW";
  this.graphic = "features.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "shimmering beam";
  
  LightEmitting.call(this, 1);
}
RoyalPuzzleLaserEWTile.prototype = new FeatureObject();

RoyalPuzzleLaserEWTile.prototype.walkon = function(who) {
  var resp = InALaser(who);
  return resp;
}

function RoyalPuzzleLaserNSTile() {
  this.name = "RoyalPuzzleLaserNS";
  this.graphic = "features.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "shimmering beam";
  
  LightEmitting.call(this, 1);
}
RoyalPuzzleLaserNSTile.prototype = new FeatureObject();

RoyalPuzzleLaserNSTile.prototype.walkon = function(who) {
  var resp = InALaser(who);
  return resp;
}

function RoyalPuzzleLaserCrossTile() {
  this.name = "RoyalPuzzleLaserCross";
  this.graphic = "features.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "shimmering beam";
  
  LightEmitting.call(this, 1);
}
RoyalPuzzleLaserCrossTile.prototype = new FeatureObject();

RoyalPuzzleLaserCrossTile.prototype.walkon = function(who) {
  var resp = InALaser(who);
  return resp;
}

function InALaser(who) {
  var themap = who.getHomeMap();
  themap.moveThing(46,28,who);
  ResetRoyalPuzzle(themap);
  return "ZAP! The room resets.";
}

function ResetRoyalPuzzle(where) {  
  var walls = [{x:48,y:29}, {x:49, y:35}, {x:48, y:31}, {x:46, y:29}, {x:47, y:28}, {x: 49, y:28}];
  
  var allfeatures = where.features.getAll();
  $.each(allfeatures, function(idx,val) {
    if (val.getName() === "SandstoneWall") {
      var gowhere = walls.shift();
      where.moveThing(gowhere.x, gowhere.y, val);
    }
  });
  
  CheckLasers(where);
}

function SandstoneWallTile() {
  this.name = "SandstoneWall";
  this.graphic = "features.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a"
  this.desc = "sandstone wall";
  
  LightEmitting.call(this, 3);
}
SandstoneWallTile.prototype = new FeatureObject();

SandstoneWallTile.prototype.use = function(who) {
  var themap = who.getHomeMap();
  var diffx = this.getx() - who.getx();
  var diffy = this.gety() - who.gety();
  var retval = {};
  if ((Math.abs(diffx) > 1) || (Math.abs(diffy) > 1)) {
    retval["txt"] = "The wall shakes in place but does not move.";
    return retval;
  }
  var desttile = themap.getTile(this.getx()+diffx, this.gety()+diffy);
  var ontile = desttile.canMoveHere(MOVE_WALK,0);
  if (!ontile) {
    retval["txt"] = "Something is in the way.";
    return retval;
  }
  themap.moveThing(this.getx()+diffx, this.gety()+diffy, this);
  retval["txt"] = "The wall segment slides across the floor.";
  
  CheckLasers(themap);
  return retval;
}

function WallOfWavesTile() {
  this.name = "WallOfWaves";
  this.graphic = "runes.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Waves";
}
WallOfWavesTile.prototype = new FeatureObject();

WallOfWavesTile.prototype.use = function(user) {
  ApplyRune(user, "waves", this);
}

WallOfWavesTile.prototype.bumpInto = function(who) {
  ApplyRune(who, "waves", this);
}

function RuneOfWavesTile() {
  this.name = "RuneOfWaves";
  this.graphic = "runes.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Waves";
}
RuneOfWavesTile.prototype = new FeatureObject();

RuneOfWavesTile.prototype.use = function(user) {
  ApplyRune(user, "waves", this);
}

RuneOfWavesTile.prototype.bumpInto = function(who) {
  ApplyRune(who, "waves", this);
}


function WallOfWindsTile() {
  this.name = "WallOfWinds";
  this.graphic = "runes.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Winds";
}
WallOfWindsTile.prototype = new FeatureObject();

WallOfWindsTile.prototype.use = function(user) {
  ApplyRune(user, "winds", this);
}

WallOfWindsTile.prototype.bumpInto = function(who) {
  ApplyRune(who, "winds", this);
}

function RuneOfWindsTile() {
  this.name = "RuneOfWinds";
  this.graphic = "runes.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Winds";
}
RuneOfWindsTile.prototype = new FeatureObject();

RuneOfWindsTile.prototype.use = function(user) {
  ApplyRune(user, "winds", this);
}

RuneOfWindsTile.prototype.bumpInto = function(who) {
  ApplyRune(who, "winds", this);
}


function WallOfKingsTile() {
  this.name = "WallOfKings";
  this.graphic = "runes.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Kings";
}
WallOfKingsTile.prototype = new FeatureObject();

WallOfKingsTile.prototype.use = function(user) {
  ApplyRune(user, "kings", this);
}

WallOfKingsTile.prototype.bumpInto = function(who) {
  ApplyRune(who, "kings", this);
}

function RuneOfKingsTile() {
  this.name = "RuneOfKings";
  this.graphic = "runes.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Kings";
}
RuneOfKingsTile.prototype = new FeatureObject();

RuneOfKingsTile.prototype.use = function(user) {
  ApplyRune(user, "kings", this);
}

RuneOfKingsTile.prototype.bumpInto = function(who) {
  ApplyRune(who, "kings", this);
}

function WallOfFlamesTile() {
  this.name = "WallOfFlames";
  this.graphic = "runes.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Flames";
}
WallOfFlamesTile.prototype = new FeatureObject();

WallOfFlamesTile.prototype.use = function(user) {
  ApplyRune(user, "flames", this);
}

WallOfFlamesTile.prototype.bumpInto = function(who) {
  ApplyRune(who, "flames", this);
}

function RuneOfFlamesTile() {
  this.name = "RuneOfFlames";
  this.graphic = "runes.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Flames";
}
RuneOfFlamesTile.prototype = new FeatureObject();

RuneOfFlamesTile.prototype.use = function(user) {
  ApplyRune(user, "flames", this);
}

RuneOfFlamesTile.prototype.bumpInto = function(who) {
  ApplyRune(who, "flames", this);
}


function WallOfVoidTile() {
  this.name = "WallOfVoid";
  this.graphic = "runes.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Void";
}
WallOfVoidTile.prototype = new FeatureObject();

WallOfVoidTile.prototype.use = function(user) {
  ApplyRune(user, "void", this);
}

WallOfVoidTile.prototype.bumpInto = function(who) {
  ApplyRune(who, "void", this);
}

function RuneOfVoidTile() {
  this.name = "RuneOfVoid";
  this.graphic = "runes.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Void";
}
RuneOfVoidTile.prototype = new FeatureObject();

RuneOfVoidTile.prototype.use = function(user) {
  ApplyRune(user, "void", this);
}

RuneOfVoidTile.prototype.bumpInto = function(who) {
  ApplyRune(who, "void", this);
}

function PlatformOfWavesTile() {
  this.name = "PlatformOfWaves";
  this.graphic = "runes.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-64";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfWavesTile.prototype = new FeatureObject();

function PlatformOfWindsTile() {
  this.name = "PlatformOfWinds";
  this.graphic = "runes.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-64";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfWindsTile.prototype = new FeatureObject();

PlatformOfWindsTile.prototype.walkon = function(who) {
  if (this.getHomeMap().getName() === "skypalace") {  // WHOOSH
    gamestate.setMode("null");

    var windlist = this.windlist;
    setTimeout( function() { whoosh(who, windlist, this.spawnat, this.spawnwhat); }, 100);
  
    delete this.spawnwhat;  
    // play a wind sound
    return "WHOOSH!";
  }
}

function whoosh(whozat, windlist, spawnwhere, spawnthing) {

  var tox = windlist[0];
  var toy = windlist[1];
  
  var windmap = whozat.getHomeMap();
  windmap.moveThing(tox,toy,whozat);
  DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());  
  
  if (windlist[2]) {
    setTimeout( function() { whoosh(whozat, windlist.slice(2), spawnwhere, spawnthing); }, 100);
  } else {
    var spawnedmonster = localFactory.createTile(spawnthing);
    windmap.placeThing(spawnwhere[0], spawnwhere[1], spawnedmonster);
    // add an "appears" visual effect?
    
    whozat.endTurn(0);
  }
}

function PlatformOfKingsTile() {
  this.name = "PlatformOfKings";
  this.graphic = "runes.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-64";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfKingsTile.prototype = new FeatureObject();

function PlatformOfFlamesTile() {
  this.name = "PlatformOfFlames";
  this.graphic = "runes.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-64";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfFlamesTile.prototype = new FeatureObject();

function PlatformOfVoidTile() {
  this.name = "PlatformOfVoid";
  this.graphic = "runes.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-64";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfVoidTile.prototype = new FeatureObject();

// These are fake items, just so runes can have a Usescript for UseFromInventory
// deprecated
function AbstractRuneTile() {
  this.name = "AbstractRune";
  this.graphic = "runes.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "Runes";
}
AbstractRuneTile.prototype = new FeatureObject();

AbstractRuneTile.prototype.use = function(user) {
  ChooseRune();
  var retval = {};
  retval.txt = "Invoked";
  retval.override = 1;
  return retval;
}

function OutdoorRuneOfKingsTile() {
  this.name = "OutdoorRuneOfKings";
  this.graphic = "runes.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "The";
  this.desc = "Rune of Kings";
}
OutdoorRuneOfKingsTile.prototype = new FeatureObject();

OutdoorRuneOfKingsTile.prototype.use = function(user) {
  // check to see if you are in one of a few locations, if so, open new dungeon
  // deprecated
}

function MarkOfKingsTile() {
  this.name = "MarkOfKings";
  this.graphic = "runes.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "Rune of Kings";
}
MarkOfKingsTile.prototype = new FeatureObject();
  
MarkOfKingsTile.prototype.use = function(user) {
  // check if on surface, if so check location
  // if underground/in town, heal
  var retval = {};
  var themap = user.getHomeMap();
  if (!themap.getScale()) {
    if (themap.getName() === "darkunknown") {
      if (((user.getx() === 27) && (user.gety() === 28)) || ((user.getx() === 26) && (user.gety() === 29)) || ((user.getx() === 28) && (user.gety() === 29)) || ((user.getx() >= 25) && (user.getx() <= 28) && (user.gety() === 30)) || ((user.getx() >=25) && (user.getx() <= 27) && (user.gety() === 31))) {
        // open entrance to grotto
        Earthquake();
        var cave = localFactory.createTile("Cave");
        cave.setEnterMap("grotto", 22, 53);
        themap.placeThing(27,30,cave);
        retval["txt"] = "A cave entrance is revealed!";
        return retval;
      } else if ((user.getx() === 100) && (user.gety() === 57)) {
        var tile = themap.getTile(112,67);
        var oldgate = tile.getTopFeature();
        if (oldgate && (oldgate.getName() === "Moongate")) {
          themap.deleteThing(oldgate);
        }
        
        user.getHomeMap().moveThing(111,67,user);
        DrawMainFrame("draw", "darkunknown", user.getx(), user.gety());
        // teleport to entrance to air
        setTimeout(function() {
          var moongate = localFactory.createTile("Moongate");
          moongate.destmap = "skypalace";
          moongate.destx = 47;
          moongate.desty = 49;
          themap.placeThing(112,67,moongate);
          animateImage(0,-128,moongate,0,"right",300,0,1);
        }, 500);

      } else {
        // no effect
      }
    } else if ((themap.getName() === "volcano") && (GetDistance(user.getx(), user.gety(), 27,21) < 5)) {
      Earthquake();
      var cave = localFactory.createTile("Cave");
      cave.setEnterMap("lavatubes", 0, 0);   // make tubes!
      var nillavatile = themap.getTile(27,21);
      var nillava = nillavatile.getTopFeature();
      if (nillava && (nillave.getName() === "Lava")) {
        themap.deleteThing(nillava);
      }
      
      themap.placeThing(27,21,cave);
      retval["txt"] = "A tunnel into the caldera is exposed!";
      return retval;
        
    } else {
      retval["txt"] = "Nothing happens here.";
      return retval;
    }
  } else {
    // use power
  }
  return retval;
}  

function MarkOfWavesTile() {
  this.name = "MarkOfWaves";
  this.graphic = "runes.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "Rune of Waves";
}
MarkOfWavesTile.prototype = new FeatureObject();
  
MarkOfWavesTile.prototype.use = function(user) {
  // summon whirlpool if at lighthouse
  // otherwise, temp mana?
}  
  
function MarkOfWindsTile() {
  this.name = "MarkOfWinds";
  this.graphic = "runes.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "Rune of Winds";
}
MarkOfWindsTile.prototype = new FeatureObject();
  
MarkOfWindsTile.prototype.use = function(user) {
  // push back
}  

function MarkOfFlamesTile() {
  this.name = "MarkOfFlames";
  this.graphic = "runes.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "Rune of Flames";
}
MarkOfFlamesTile.prototype = new FeatureObject();
  
MarkOfFlamesTile.prototype.use = function(user) {
  // various random effects- flame armor, flame sword, burn foe
}  


function FlameEternalTile() {
  this.name = "FlameEternal";
  this.graphic = "eternal_flame.gif";
  this.spritexoffset = "0";  // -32 is active fire
  this.spriteyoffset = "0";
  this.prefix = "the";
  this.desc = "Flame Eternal";
}
FlameEternalTile.prototype = new FeatureObject();

function BrightFountainTile() {
  this.name = "BrightFountain";
  this.graphic = "fountains.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.prefix = "a";
  this.desc = "fountain";
}
BrightFountainTile.prototype = new FeatureObject();

function BlueFountainTile() {
  this.name = "BlueFountain";
  this.graphic = "fountains.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.prefix = "a";
  this.desc = "fountain";
}
BlueFountainTile.prototype = new FeatureObject();

function BloodFountainTile() {
  this.name = "BloodFountain";
  this.graphic = "fountains.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.prefix = "a";
  this.desc = "fountain";
}
BloodFountainTile.prototype = new FeatureObject();

function FountainTile() {
  this.name = "Fountain";
  this.graphic = "fountain.gif";
  this.prefix = "a";
  this.desc = "fountain";
}
FountainTile.prototype = new FeatureObject();

function TeleporterPlatformTile() {
  this.name = "TeleporterPlatform";
  this.graphic = "teleporter.gif";
  this.prefix = "a";
  this.desc = "platform";
  this.destination;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
TeleporterPlatformTile.prototype = new FeatureObject();

TeleporterPlatformTile.prototype.setDestination = function(destobj) {
  this.destination = {};
  if (destobj.map && destobj.x && destobj.y) {
    this.destination = destobj;
  }
}

TeleporterPlatformTile.prototype.getDestination = function() {
  return this.destination;
}

TeleporterPlatformTile.prototype.walkon = function(who) {
  if (this.getDestination()) {
    var themap = who.getHomeMap();
    var dest = this.getDestination();
    if (themap.getName() === dest.map) {
      themap.moveThing(dest.x, dest.y, who);
    } else {
      DU.maps.addMap(dest.map);
      var destmap = DU.maps.getMap(dest.map);
      MoveBetweenMaps(who,themap,destmap,dest.x,dest.y);
    }
    DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
    ShowEffect(who, 500, "spellsparkles-anim.gif", 0, -64);
    // NEEDS SFX
  }
}

// Toshin
function ToshinPanelTile() {
  this.name = "ToshinPanel";
  this.graphic = "023.gif";
  this.prefix = "a";
  this.desc = "panel covered with buttons";
  this.val = {};
  this.val[65] = 0;
  this.val[66] = 0;
  this.val[67] = 0;
  this.val[68] = 0;
  this.val[69] = 0;
}
ToshinPanelTile.prototype = new FeatureObject();

ToshinPanelTile.prototype.use = function(who) {
  gamestate.setMode("singleletter");
  var retval = {};
  retval["fin"] = 2;
  retval["txt"] = "Use: panel covered with buttons- Press which button?"
  retval["input"] = "Choose (A-E) - ";
  retval["override"] = 1;
  inputText.thing = "toshin";
  inputText.thingref = this;
  
  return retval;
}

function PerformToshinAltar(code) {
  var letter = String.fromCharCode(code);    	
  var retval = {};
  retval["fin"] = 1;
  retval["txt"] = "Pressed " + letter + ".";
  var altar = inputText.thingref;
  var themap = altar.getHomeMap();
  var energyfield = localFactory.createTile("EnergyField");
  var firefield = localFactory.createTile("FireField");

  if (code === 65) {
    var fieldtile1 = themap.getTile(22,13);
    var fields = fieldtile1.getFeatures();
    $.each(fields, function(idx,val) {
      if (val.getName().indexOf("Field") > -1) {
        themap.deleteThing(val);
      }
    });
    var fieldtile2 = themap.getTile(20,17);
    fields = fieldtile2.getFeatures();
    $.each(fields, function(idx,val) {
      if (val.getName().indexOf("Field") > -1) {
        themap.deleteThing(val);
      }
    });
    if (altar.val[65]) {
      themap.placeThing(22,13,firefield);
      themap.placeThing(20,17,energyfield);
      altar.val[65] = 0;
    } else {
      themap.placeThing(22,13,energyfield);
      themap.placeThing(20,17,firefield);      
      altar.val[65] = 1;
    }
  } else if (code === 66) {
    var fieldtile1 = themap.getTile(11,7);
    var fields = fieldtile1.getFeatures();
    $.each(fields, function(idx,val) {
      if (val.getName().indexOf("Field") > -1) {
        themap.deleteThing(val);
      }
    });
    var fieldtile2 = themap.getTile(18,8);
    fields = fieldtile2.getFeatures();
    $.each(fields, function(idx,val) {
      if (val.getName().indexOf("Field") > -1) {
        themap.deleteThing(val);
      }
    });
    if (altar.val[66]) {
      themap.placeThing(18,8,energyfield);
      themap.placeThing(11,7,firefield);
      altar.val[66] = 0;
    } else {
      themap.placeThing(18,8,firefield);
      themap.placeThing(11,7,energyfield);      
      altar.val[66] = 1;
    }
  } else if (code === 67) {
    var fieldtile1 = themap.getTile(12,17);
    var fields = fieldtile1.getFeatures();
    $.each(fields, function(idx,val) {
      if (val.getName().indexOf("Field") > -1) {
        themap.deleteThing(val);
      }
    });
    var fieldtile2 = themap.getTile(12,19);
    fields = fieldtile2.getFeatures();
    $.each(fields, function(idx,val) {
      if (val.getName().indexOf("Field") > -1) {
        themap.deleteThing(val);
      }
    });
    var fieldtile3 = themap.getTile(13,18);
    fields = fieldtile3.getFeatures();
    $.each(fields, function(idx,val) {
      if (val.getName().indexOf("Field") > -1) {
        themap.deleteThing(val);
      }
    });
    if (altar.val[67]) {
      themap.placeThing(13,18,energyfield);
      themap.placeThing(12,17,firefield);
      var firefield2 = localFactory.createTile("FireField");
      themap.placeThing(12,19,firefield2);
      altar.val[67] = 0;
    } else {
      themap.placeThing(13,18,firefield);
      themap.placeThing(12,17,energyfield);      
      var energyfield2 = localFactory.createTile("EnergyField");
      themap.placeThing(12,19,energyfield2);
      altar.val[67] = 1;
    }
  } else if (code === 68) {
    var fieldtile1 = themap.getTile(11,11);
    var fields = fieldtile1.getFeatures();
    $.each(fields, function(idx,val) {
      if (val.getName().indexOf("Field") > -1) {
        themap.deleteThing(val);
      }
    });
    var fieldtile2 = themap.getTile(14,8);
    fields = fieldtile2.getFeatures();
    $.each(fields, function(idx,val) {
      if (val.getName().indexOf("Field") > -1) {
        themap.deleteThing(val);
      }
    });
    if (altar.val[68]) {
      themap.placeThing(14,8,energyfield);
      themap.placeThing(11,11,firefield);
      altar.val[68] = 0;
    } else {
      themap.placeThing(14,8,firefield);
      themap.placeThing(11,11,energyfield);      
      altar.val[68] = 1;
    }
  } else if (code === 69) {
    var fieldtile1 = themap.getTile(9,10);
    var fields = fieldtile1.getFeatures();
    $.each(fields, function(idx,val) {
      if (val.getName().indexOf("Field") > -1) {
        themap.deleteThing(val);
      }
    });
    var fieldtile2 = themap.getTile(12,15);
    fields = fieldtile2.getFeatures();
    $.each(fields, function(idx,val) {
      if (val.getName().indexOf("Field") > -1) {
        themap.deleteThing(val);
      }
    });
    if (altar.val[69]) {
      themap.placeThing(9,10,energyfield);
      themap.placeThing(12,15,firefield);
      altar.val[69] = 0;
    } else {
      themap.placeThing(9,10,firefield);
      themap.placeThing(12,15,energyfield);      
      altar.val[69] = 1;
    }
  } else {
    retval["fin"] = 2;
    return retval;
  } 
  DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
  return retval;
}

function ToshinMoatLeverOffTile() {
  this.name = "ToshinMoatLeverOff";
  this.graphic = "moatLever-off.gif";
  this.overlay = "moatLever-off.gif";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
  
  SetByBelow.call(this);
}
ToshinMoatLeverOffTile.prototype = new FeatureObject();

ToshinMoatLeverOffTile.prototype.use = function(who) {
  var retval = {};
  retval["fin"] = 1;
  retval["txt"] = "Click!";
  var themap = this.getHomeMap();
  var tile = themap.getTile(25,13);
  var door = tile.getTopFeature();
  
  var lever1tile = themap.getTile(6,12);
  var lever1 = lever1tile.getTopFeature();
  var lever2tile = themap.getTile(24,14);
  var lever2 = lever2tile.getTopFeature();
  
  if (this.getOverlay() === "moatLever-off.gif") {
    door.unlockMe();
    lever1.setGraphic("moatLever-on.gif");
    lever1.setOverlay("moatLever-on.gif");
    lever2.setGraphic("moatLever-on.gif");
    lever2.setOverlay("moatLever-on.gif");
  } else {
    door.lockMe(2);
    lever1.setGraphic("moatLever-off.gif");
    lever1.setOverlay("moatLever-off.gif");
    lever2.setGraphic("moatLever-off.gif");
    lever2.setOverlay("moatLever-off.gif");    
  }
  DrawMainFrame("one",themap.getName(),lever1.getx(), lever1.gety());
  DrawMainFrame("one",themap.getName(),lever2.getx(), lever2.gety());
  DrawMainFrame("one",themap.getName(),door.getx(), door.gety());
  
  return retval;
}

// For skypalace
function OrbToggleTile() {
  this.name = "OrbToggle";
  this.graphic = "orbs.gif";
  this.spritexoffset = '0';
  this.spriteyoffset = '0';
  this.prefix = "an";
  this.desc = "orb";
}
OrbToggleTile.prototype = new FeatureObject();

OrbToggleTile.prototype.use = function(who) {
    this.spritexoffset = this.spritexoffset - 32;
    if (this.spritexoffset < -128) { this.spritexoffset = 0; }

    var sp = maps.getMap("skypalace");
    var orb1tile = sp.getTile(33,27);
    var orb1 = orb1tile.getTopFeature();
    var orb2tile = sp.getTile(29,32);
    var orb2 = orb2tile.getTopFeature();
    var orb3tile = sp.getTile(37,32);
    var orb3 = orb3tile.getTopFeature();
//    alert(orb1.spritexoffset + " , " + orb2.spritexoffset + " , " + orb3.spritexoffset);
    if ((orb1.spritexoffset == '-32') && (orb2.spritexoffset == '-96') && (orb3.spritexoffset == '-64')) {
      var moongate = localFactory.createTile("Moongate");
      moongate.destmap = "skypalace2";
      moongate.destx = 11;
      moongate.desty = 12;
      sp.placeThing(33,31,moongate);
      animateImage(0,-128,moongate,0,"right",300,0,1);
    } else {
      var mgtile = sp.getTile(33,31);
      var moongate = mgtile.getTopFeature();
      if (moongate) {
        animateImage(-128,0,moongate,0,"left",300,1,0);
        delete moongate.destmap;
      }
    }
  
    var retval = {};
    retval["txt"] = "Done!";
    return retval;
}

function OrbStrengthTile() {
  this.name = "OrbStrength";
  this.graphic = "orbs.gif";
  this.spritexoffset = '-128';
  this.spriteyoffset = '0';
  this.prefix = "an";
  this.desc = "orb";
}
OrbStrengthTile.prototype = new FeatureObject();

function OrbDexterityTile() {
  this.name = "OrbDexterity";
  this.graphic = "orbs.gif";
  this.spritexoffset = '-64';
  this.spriteyoffset = '0';
  this.prefix = "an";
  this.desc = "orb";
}
OrbDexterityTile.prototype = new FeatureObject();

function OrbIntelligenceTile() {
  this.name = "OrbIntelligence";
  this.graphic = "orbs.gif";
  this.spritexoffset = '-32';
  this.spriteyoffset = '0';
  this.prefix = "an";
  this.desc = "orb";
}
OrbIntelligenceTile.prototype = new FeatureObject();

function OrbExperienceTile() {
  this.name = "OrbExperience";
  this.graphic = "orbs.gif";
  this.spritexoffset = '-96';
  this.spriteyoffset = '0';
  this.prefix = "an";
  this.desc = "orb";
}
OrbExperienceTile.prototype = new FeatureObject();


function MoongateTile() {
  this.name = "Moongate";
  this.graphic = "moongates.gif";
  this.spritexoffset = '-128';
  this.spriteyoffset = '0';
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "gate";
}
MoongateTile.prototype = new FeatureObject();

MoongateTile.prototype.walkon = function(who) {
  if (this.destmap && this.destx && this.desty) {
    var newmap = new GameMap();
    if (maps.getMap(this.destmap)) {
      newmap = maps.getMap(this.destmap);
    } else {
      newmap.loadMap(this.destmap);
      maps.addMapByRef(newmap);
    }
    MoveBetweenMaps(PC,PC.getHomeMap(),newmap, this.destx, this.desty);
    DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
    DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");

  } 
  return "";
}

function PetrifiedRoperTile() {
  this.name = "PetrifiedRoper";
  this.graphic = "petrifiedropwer.gif";
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "petrified roper";
}
PetrifiedRoperTile.prototype = new FeatureObject();

PetrifiedRoperTile.prototype.use = function(who) {
  var loot = localFactory.createTile("RoperBark");
  PC.addToInventory(loot,1);
  maintext.delayedAddText("You take some petrified roper bark.");
  return;
}  

function AltarWithSwordTile() {
  this.name = "AltarWithSword";
  this.graphic = "swordinstone.gif";
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "sword driven into the stone of an altar";
}
AltarWithSwordTile.prototype = new FeatureObject();

AltarWithSwordTile.prototype.use = function(who) {
  var wherex = this.getx();
  var wherey = this.gety();
  var mymap = this.getHomeMap();
  mymap.deleteThing(this);
  var emptyaltar = localFactory.createTile("Altar");
  mymap.placeThing(wherex,wherey,emptyaltar);
  var magicsword = localFactory.createTile("MagicSword");
  mymap.placeThing(wherex,wherey,magicsword);
  DrawMainFrame("one", mymap, wherex, whereY);
  
  return;
}

// Items

function ItemObject() {
	this.addType("Item");
	this.quantity = 1;
}
ItemObject.prototype = new FeatureObject();

ItemObject.prototype.getQuantity = function() {
	return this.quantity;
}

ItemObject.prototype.setQuantity = function(quant) {
	this.quantity = quant;
}

function AmbroseShieldTile() {
  this.name = "AmbroseShield";
  this.graphic = "items.gif";
  this.spriteyoffset = "-32";
  this.spritexoffset = "-256";
  this.blocklos = 0;
  this.desc = "shield commissioned by Nyrani";
  this.prefix = "the";
  this.addType("Quest");
}
AmbroseShieldTile.prototype = new ItemObject();

function PitOfDespairKeyTile() {
  this.name = "PitOfDespairKey";
  this.graphic = "items.gif";
  this.spriteyoffset = "-64";
  this.spritexoffset = "-224";
  this.blocklos = 0;
  this.desc = "Pit of Despair dungeon key";
  this.prefix = "the";
  this.addType("Quest");
}
PitOfDespairKeyTile.prototype = new ItemObject();
  

function RoperBarkTile() {
  this.name = "RoperBark";
  this.graphic = "items.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.desc = "piece of petrified roper bark";
  this.prefix = "a";
  this.addType("Quest");
}
RoperBarkTile.prototype = new ItemObject();

function AmuletOfReflectionsTile() {
  this.name = "AmuletOfReflections";
  this.graphic = "items.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.desc = "Amulet of Reflections";
  this.prefix = "an";
  this.addType("Quest");
}
AmuletOfReflectionsTile.prototype = new ItemObject();

AmuletOfReflectionsTile.prototype.use = function(who) {
  var themap = who.getHomeMap();
  var retval = {};
  if (themap.getName() === "olympus2") {
    var standbefore = themap.getTile(who.getx(), who.gety());
    var ismirror = standbefore.getTopFeature();
    if (ismirror.getName() === "mirror") {
      // you are in the right map standing at the right place. GO.
      // remove buffs/debuffs - doesn't cure poison, I guess you can die of
      // poison while your mind is elsewhere? Don't do it, people.
      var effects = who.getSpellEffects();
      $.each(effects, function(effidx, effval) {
        if ((effval.getLevel() > 0) && (effval.getExpiresTime() > -1)) {
          effval.endEffect();
        }
      });
      
      FadeOut(2000);
      setTimeout(function() {
        var newmap = new GameMap();
        if (maps.getMap("abyss0")) {
          newmap = maps.getMap("abyss0");
        } else {
          newmap.loadMap("abyss0");
          maps.addMapByRef(newmap);
        }
        MoveBetweenMaps(who,themap,newmap,8,8);
        FadeIn(2000);
        setTimeout(function() {
          gamestate.setMode("player");
          maintext.addText('You hear a voice in your mind: "In the beginning of the journey of knowledge, the mind is a blank. The landscape, featureless and empty."');
        },2000);
      }, 2000);
      retval["txt"] = "The room fades to black around you as your mind accepts the challenge of the Stygian Abyss.";
      retval["fin"] = 3;
      return retval;
    } 
  }
  retval["txt"] = "Nothing happens here.";
  retval["fin"] = 1;
  return retval;
}

function DragonBoneTile() {
  this.name = "DragonBone";
  this.graphic = "items.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.desc = "dragon fingerbone";
  this.prefix = "a";
  this.addType("Quest");
}
DragonBoneTile.prototype = new ItemObject();

function StoneOfSparksTile() {
  this.name = "StoneOfSparks";
  this.graphic = "items.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.desc = "Stone of Sparks";
  this.prefix = "the";
  this.addType("Quest");
}
StoneOfSparksTile.prototype = new ItemObject();

function StoneOfEmbersTile() {
  this.name = "StoneOfEmbers";
  this.graphic = "items.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.desc = "Stone of Embers";
  this.prefix = "the";
  this.addType("Quest");
}
StoneOfEmbersTile.prototype = new ItemObject();

function StoneOfTheBlazeTile() {
  this.name = "StoneOfTheBlaze";
  this.graphic = "items.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.desc = "Stone of the Blaze";
  this.prefix = "the";
  this.addType("Quest");
}
StoneOfTheBlazeTile.prototype = new ItemObject();

function StoneOfConflagrationsTile() {
  this.name = "StoneOfConflagrations";
  this.graphic = "items.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.desc = "Stone of Conflagrations";
  this.prefix = "the";
  this.addType("Quest");
}
StoneOfConflagrationsTile.prototype = new ItemObject();

function BookOfLoreTile() {
  this.name = "BookOfLore";
  this.graphic = "items.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.desc = "Book of Lore";
  this.prefix = "the";
  this.addType("Quest");
}
BookOfLoreTile.prototype = new ItemObject();

function SpiderSilkTile() {
  this.name = "SpiderSilk";
  this.graphic = "items.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bit of spider silk";
  this.addType("Reagent");
}
SpiderSilkTile.prototype = new ItemObject();

function BlackPearlTile() {
  this.name = "BlackPearl";
  this.graphic = "items.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "black pearl";
  this.addType("Reagent");
}
BlackPearlTile.prototype = new ItemObject();

function ExecutionersHoodTile() {
  this.name = "ExecutionersHood";
  this.graphic = "items.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "executioner's hood";
  this.addType("Reagent");
}
ExecutionersHoodTile.prototype = new ItemObject();

function NightshadeTile() {
  this.name = "Nightshade";
  this.graphic = "items.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.prefix = "some";
  this.desc = "nightshade";
  this.addType("Reagent");
}
NightshadeTile.prototype = new ItemObject();

function SulfurousAshTile() {
  this.name = "SulfurousAsh";
  this.graphic = "items.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pile of sulfurous ash";
  this.addType("Reagent");
}
SulfurousAshTile.prototype = new ItemObject();


function RubyGemoftheSunTile() {
	this.name = "RubyGemoftheSun";
	this.graphic = "sunruby.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0;
	this.desc = "ruby gem that harnesses the power of the sun";
	this.prefix = "a";
}
RubyGemoftheSunTile.prototype = new ItemObject();

function DecorativeArmorTile() {
	this.name = "DecorativeArmor";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-160";
	this.desc = "decorative suit of armor";
	this.blocklos = 0;
	this.passable = MOVE_ETHEREAL;
	this.prefix = "a";
}
DecorativeArmorTile.prototype = new ItemObject();

function GoldTile() {
  this.name = "Gold";
  this.graphic = "items.gif";  
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.desc = "1 gold coin";
  this.quantity = 1;
  this.blocklos = 0;
  this.passable = MOVE_ETHEREAL;
  this.prefix = "";
}
GoldTile.prototype = new ItemObject();

GoldTile.prototype.setQuantity = function(quant) {
  var newquant = parseInt(quant);
  if (newquant === quant) {
    this.quantity = quant;
    if (quant === 1) { this.setDesc("1 gold coin"); }
    else { this.setDesc(quant + " gold coins"); }
  } else {
    return 0;
  }
  if ((this.quantity > 0) && (this.quantity < 4)) {
    this.graphic = "items.gif";  
    this.spritexoffset = "0";
    this.spriteyoffset = "0";
  }
  else if ((this.quantity > 3) && (this.quantity < 16)) {
    this.graphic = "items.gif";  
    this.spritexoffset = "-32";
    this.spriteyoffset = "0";
  } else if (this.quantity > 15) {
    this.graphic = "items.gif";  
    this.spritexoffset = "-64";
    this.spriteyoffset = "0";
  }
  return this.quantity;
}

GoldTile.prototype.onGet = function(who) {
  who.addGold(parseInt(this.getQuantity())); 
  who.inventory.deleteFrom(this);

  // this should delete the item entirely
}

function ConsumableItemObject() {
  this.addType("Consumable");
}
ConsumableItemObject.prototype = new ItemObject();

// potions

function PotionItemObject() {
  this.addType("Potion");
}
PotionItemObject.prototype = new ConsumableItemObject();

// poison potions
function GreenPotionTile() {
  this.name = "GreenPotion";
  this.desc = "green potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
}
GreenPotionTile.prototype = new PotionItemObject();

//haste potion
function DarkGreenPotionTile() {
  this.name = "DarkGreenPotion";
  this.desc = "dark green potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
}
DarkGreenPotionTile.prototype = new PotionItemObject();

// str potion
function SilverPotionTile() {
  this.name = "SilverPotion";
  this.desc = "silver potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
}
SilverPotionTile.prototype = new PotionItemObject();

// dex potion
function PinkPotionTile() {
  this.name = "PinkPotion";
  this.desc = "pink potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "0";
}
PinkPotionTile.prototype = new PotionItemObject();

// int potion
function GreyPotionTile() {
  this.name = "GreyPotion";
  this.desc = "grey potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "0";
}
GreyPotionTile.prototype = new PotionItemObject();

// greater mana potion
function BrownPotionTile() {
  this.name = "BrownPotion";
  this.desc = "brown potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "0";
}
BrownPotionTile.prototype = new PotionItemObject();

// cure potion
function RedPotionTile() {
  this.name = "RedPotion";
  this.desc = "red potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-32";
}
RedPotionTile.prototype = new PotionItemObject();

RedPotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var resp = magic[1][GetSpellID(1)].executeSpell(who,1,1);
  resp["txt"] = "You feel purified.";
  
  return resp;
}

// light potion
function WhitePotionTile() {
  this.name = "WhitePotion";
  this.desc = "white potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-32";
}
WhitePotionTile.prototype = new PotionItemObject();

// lesser heal potion
function YellowPotionTile() {
  this.name = "YellowPotion";
  this.desc = "yellow potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
}
YellowPotionTile.prototype = new PotionItemObject();

// protect potion
function PurplePotionTile() {
  this.name = "PurplePotion";
  this.desc = "purple potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-32";
}
PurplePotionTile.prototype = new PotionItemObject();

// bless potion
function BlackPotionTile() {
  this.name = "BlackPotion";
  this.desc = "black potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-32";
}
BlackPotionTile.prototype = new PotionItemObject();

// heal potion
function BluePotionTile() {
  this.name = "BluePotion";
  this.desc = "blue potion";
  this.prefix = "a";
  this.graphic = "items.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-32";
}
BluePotionTile.prototype = new PotionItemObject();

// mana potion
function OrangePotionTile() {
  this.name = "OrangePotion";
  this.desc = "orange potion";
  this.prefix = "an";
  this.graphic = "items.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-32";
}
OrangePotionTile.prototype = new PotionItemObject();

// scrolls

function ScrollObject() {
  this.addType("Scroll"); 
}
ScrollObject.prototype = new ConsumableItemObject();


// Prototype for armor and weapons

function equipableItemObject() {
  this.addType("equipable");	
  this.equippedTo;
  this.toHitBonus = 0;
}
equipableItemObject.prototype = new ItemObject();

equipableItemObject.prototype.getEquippedTo = function() {
  return this.equippedTo;
}

equipableItemObject.prototype.setEquippedTo = function(newwho) {
  if (newwho) {
    this.equippedTo = newwho;
    return 1;
  }
  return 0;
}

equipableItemObject.prototype.equipMe = function(who) {
  if (!who.checkType("npc")) { return 0; }
  
  if (this.checkType("Armor")) {
    if (who.getStr() < this.getStrReq()) {
      return 0;
    }
    var currentarmor = who.getArmor();
    if (currentarmor) {
      currentarmor.unEquipMe();
    }
    this.setEquippedTo(who);
    who.setArmor(this);
  }
  
  else if (this.checkType("Missile")) {
    if (who.getDex() < this.getDexReq()){
      return 0;
    }
    var currentmissile = who.getMissile();
    if (currentmissile) {
      currentmissile.unEquipMe();
    }
    this.setEquippedTo(who);
    who.setMissile(this);
  }

  else if (this.checkType("Weapon")) {
    var currentweapon = who.getWeapon();
    if (currentweapon) {
      currentweapon.unEquipMe();
    }
    this.setEquippedTo(who);
    who.setWeapon(this);
  }
  return 1;
}

equipableItemObject.prototype.unEquipMe = function() {
  var who = this.getEquippedTo();
  if (!who) { return 0; }
  if (!who.checkType("npc")) { return 0; }  
  
  if (this.checkType("Armor")) {
    if (who.getArmor() === this) {
      who.setArmor("");
    } else { 
      return 0;
    }
  }
  else if (this.checkType("Weapon")) {
    if (who.getWeapon() === this) {
      who.setWeapon("");
    } else {
      return 0;
    }
  }
  else if (this.checkType("Missile")) {
    if (who.getMissile() === this) {
      who.setMissile("");
    } else {
      return 0;
    }    
  }
  this.setEquippedTo("");
  return 1;
}

equipableItemObject.prototype.getToHitBonus = function() {
  return this.toHitBonus;
}

equipableItemObject.prototype.setToHitBonus = function(newbonus) {
  if (newbonus) {
    newbonus = parseInt(newbonus, 10);
    if (isNaN(newbonus)) {
      newbonus = 0;
    }
    this.toHitBonus = newbonus;
  }
  return this.toHitBonus;
}



// ARMOR

function ArmorObject() {
	this.defense = 0;
	this.absorb = 0;
	this.resist = 0;
	this.strReq = 0;
	
	this.addType("Armor");
}
ArmorObject.prototype = new equipableItemObject();

ArmorObject.prototype.setDefense = function(newdef) {
	this.defense = newdef;
	return (this.defense);
}

ArmorObject.prototype.getDefense = function() {
	return (this.defense);
}

ArmorObject.prototype.setResist = function(newresist) {
	this.resist = newresist;
	return (this.resist);
}

ArmorObject.prototype.getResist = function() {
	return (this.resist);
}

ArmorObject.prototype.setAbsorb = function(newab) {
	this.absorb = newab;
	return (this.absorb);
}

ArmorObject.prototype.getAbsorb = function() {
	return (this.absorb);
}

ArmorObject.prototype.setStrReq = function(newreq) {
	this.strReq = newreq;
	return (this.strReq);
}

ArmorObject.prototype.getStrReq = function() {
	return (this.strReq);
}

function NaturalArmorTile() {
  this.name="NaturalArmor";
  this.defense = 0;
  this.absorb = 0;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "0";
  this.desc = "natural armor";
}
NaturalArmorTile.prototype = new ArmorObject();

function ClothArmorTile() {
	this.name = "ClothArmor";
	this.defense = 5;
	this.absorb = 10;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "0";
	this.desc = "cloth armor";
}
ClothArmorTile.prototype = new ArmorObject();

function LeatherArmorTile() {
	this.name = "LeatherArmor";
	this.defense = 10;
	this.absorb = 20;
	this.resist = 10;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "0";
	this.desc = "leather armor";
}
LeatherArmorTile.prototype = new ArmorObject();

function ChainArmorTile() {
	this.name = "ChainArmor";
	this.defense = 20;
	this.absorb = 33;
	this.resist = 10;
	this.strReq = 16;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "0";
	this.desc = "chain mail armor";
}
ChainArmorTile.prototype = new ArmorObject();

function PlateArmorTile() {
	this.name = "PlateArmor";
	this.defense = 35;
	this.absorb = 50;
	this.resist = 15;
	this.strReq = 20;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-96";
	this.spriteyoffset = "0";
	this.desc = "plate armor";
}
PlateArmorTile.prototype = new ArmorObject();

function ExoticArmorTile() {
	this.name = "ExoticArmor";
	this.defense = 40;
	this.absorb = 60;
	this.resist = 40;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-128";
	this.spriteyoffset = "0";
	this.desc = "exotic armor";
}
ExoticArmorTile.prototype = new ArmorObject();

// WEAPONS

function WeaponObject() {
	this.hit = 0;
	this.reduceArmor = 0;
	this.damage = "1d1+0";
	this.strdamage = 0;
	
	this.addType("Weapon");
}
WeaponObject.prototype = new equipableItemObject();

WeaponObject.prototype.getHit = function() {
	return this.hit;
}

WeaponObject.prototype.setHit = function(newhit) {
	this.hit = newhit;
	return parseInt(this.hit);
}

WeaponObject.prototype.getReduceArmor = function() {
	return this.reduceArmor;
}

WeaponObject.prototype.setReduceArmor = function(newreduce) {
	this.reduceArmor = parseInt(newreduce);
	return this.reduceArmor;
}

WeaponObject.prototype.getDamage = function() {
	return this.damage;
}

WeaponObject.prototype.setDamage = function(newdam) {
	this.damage = newdam;
	return this.damage;
}

WeaponObject.prototype.getStrDamage = function() {
  return this.strdamage;
}

WeaponObject.prototype.setStrDamage = function(newdam) {
  this.strdamage = newdam;
  return this.strdamage;
}

WeaponObject.prototype.parseDamage = function() {
  var dmgobj = ParseDice(this.getDamage());
  
  return dmgobj;
}

WeaponObject.prototype.rollDamage = function(wielder) {
  var damage = RollDice(this.getDamage());
  if (wielder && this.getStrDamage()) {
    var str = wielder.getStr();
    var strmod = parseFloat(this.getStrDamage());
    var strdam = (str-10)*strmod;
    damage += parseInt(strdam);
  }
  
  var fb = wielder.getSpellEffectsByName("FlameBlade");
  if (wielder && fb) {
    if (debug) { dbs.writeln("<span style='color:green'>Flame blade adds " + fb.damage + " damage.<br /></span>"); }
    fbdmg = RollDice(fb.damage);
    damage += parseInt(fbdmg);
    fb.doEffect();
  }
  return damage;
}

WeaponObject.prototype.getAveDamage = function(wielder) {
  var dmgobj = this.parseDamage();
  var damage = dmgobj.plus;
  damage += (dmgobj.quantity * (dmgobj.dice + 1)/2);
  if (wielder && this.getStrDamage()) {
    var str = wielder.getStr();
    var strmod = parseFloat(this.getStrDamage());
    var strdam = (str-10)*strmod;
    damage += parseInt(strdam);
  }
  return damage;
}

function FistsTile() {
	this.name = "Fists";
	this.damage = "1d2+0";
	this.strdamage = 1/3;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-224";
	this.spriteyoffset = "-32";
	this.prefix = "your";
	this.desc = "fists";
}
FistsTile.prototype = new WeaponObject();

function DaggerTile() {
	this.name = "Dagger";
	this.damage = "1d4+1";
	this.strdamage = 1/3;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-32";
	this.desc = "dagger";
	this.prefix = "a";
}
DaggerTile.prototype = new WeaponObject();

function ShortswordTile() {
	this.name = "Shortsword";
	this.damage = "2d4+1";
	this.strdamage = 1/2;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-32";
	this.desc = "shortsword";
	this.prefix = "a";
}
ShortswordTile.prototype = new WeaponObject();

function MaceTile() {
	this.name = "Mace";
	this.damage = "2d4+3";
	this.strdamage = 1;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-32";
	this.desc = "mace";
	this.prefix = "a";
}
MaceTile.prototype = new WeaponObject();

function AxeTile() {
	this.name = "Axe";
	this.damage = "2d4+8";
	this.strdamage = 2/3;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-96";
	this.spriteyoffset = "-32";
	this.desc = "axe";
	this.prefix = "an";
}
AxeTile.prototype = new WeaponObject();

function LongswordTile() {
	this.name = "Longsword";
	this.damage = "4d4+9";
	this.strdamage = 2/3;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-32";
	this.desc = "longsword";
	this.prefix = "a";
}
LongswordTile.prototype = new WeaponObject();

function HalberdTile() {
	this.name = "Halberd";
	this.damage = "5d4+15";
	this.strdamage = 1;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-160";
	this.spriteyoffset = "-32";
	this.desc = "halberd";
	this.prefix = "a";
}
HalberdTile.prototype = new WeaponObject();

function MagicSwordTile() {
	this.name = "MagicSword";
	this.damage = "5d10+22";
	this.strdamage = 1;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-192";
	this.spriteyoffset = "-32";
	this.desc = "magic sword";
	this.prefix = "a";
}
MagicSwordTile.prototype = new WeaponObject();

function NaturalWeaponTile() {
	this.name = "NaturalWeapon";
	this.damage = "1d5+0";
	this.strdamage = 1;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-32";
	this.desc = "natural weapon";
	this.prefix = "a";
}
NaturalWeaponTile.prototype = new WeaponObject();

function MissileWeaponObject() {
	this.dexReq = 10;
	this.range = 14;
	this.ammographic = "ammo.gif";
	this.ammoxoffset = "0";
	this.ammoyoffset = "0";
	this.directionalammo = 0;
	this.ammoReturn = 0;
	
	this.addType("Missile");
}
MissileWeaponObject.prototype = new WeaponObject();

MissileWeaponObject.prototype.getDexReq = function() {
  return this.dexReq;
}

MissileWeaponObject.prototype.setDexReq = function(newdex) {
  this.dexReq = newdex;
  return this.dexReq;
}

MissileWeaponObject.prototype.getRange = function() {
  return this.range;
}

MissileWeaponObject.prototype.setRange = function(newrange) {
  this.range = newrange;
  return this.range;
}

MissileWeaponObject.prototype.getRange = function() {
  return this.range;
}

MissileWeaponObject.prototype.setRange = function(newrange) {
  this.range = newrange;
  return this.range;
}

MissileWeaponObject.prototype.getAmmoGraphic = function(atk,def) {
  var params = {};
  params.graphic = this.ammographic;
  params.yoffset = this.ammoyoffset;
  params.xoffset = this.ammoxoffset;
  params.directionalammo = this.directionalammo;
  return GetEffectGraphic(atk,def,params);
  
}  

MissileWeaponObject.prototype.getAmmoReturn = function() {
  return this.ammoReturn;
}


function SlingTile() {
	this.name = "Sling";
	this.damage = "1d3+0";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-64";
	this.desc = "sling";
	this.prefix = "a";
	this.ammoxoffset = "-32";
	this.ammoyoffset = "-128";
}
SlingTile.prototype = new MissileWeaponObject();

function BowTile() {
	this.name = "Bow";
	this.damage = "1d12+1";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-64";
	this.dexReq = 16;
	this.desc = "bow";
	this.prefix = "a";
  this.ammoxoffset = "0";
  this.ammoyoffset = "0";
  this.directionalammo = 1;
}
BowTile.prototype = new MissileWeaponObject();

function CrossbowTile() {
	this.name = "Crossbow";
	this.damage = "4d8+-1";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-64";
	this.dexReq = 19;
	this.desc = "crossbow";
	this.prefix = "a";
  this.ammoxoffset = "0";
  this.ammoyoffset = "-32";
  this.directionalammo = 1;
}
CrossbowTile.prototype = new MissileWeaponObject();

function WandTile() {
	this.name = "Wand";
	this.damage = "4d12+0";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-96";
	this.spriteyoffset = "-64";
	this.desc = "magic wand";
	this.prefix = "a";
  this.ammoxoffset = "-64";
  this.ammoyoffset = "-128";
}
WandTile.prototype = new MissileWeaponObject();

function MagicAxeTile() {
	this.name = "MagicAxe";
	this.damage = "4d12+12";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-64";
	this.dexReq = 22;
	this.desc = "magic axe";
	this.prefix = "a";
  this.ammoxoffset = "0";
  this.ammoyoffset = "-128";
  this.ammoReturn = 1;
}
MagicAxeTile.prototype = new MissileWeaponObject();

function NaturalMissileWeaponTile() {
	this.name = "NaturalMissileWeapon";
	this.damage = "1d12+1";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-64";
	this.desc = "natural missile weapon";
	this.prefix = "a";
  this.ammoxoffset = "-32";
  this.ammoyoffset = "-128";
}
NaturalMissileWeaponTile.prototype = new MissileWeaponObject();

function BoulderWeaponTile() {
  this.name = "BoulderWeapon";
  this.damage = "2d12+3";
  this.graphic = "boulder.gif";
  this.desc = "boulder";
  this.prefix = "a";
  this.ammoxoffset = "0";
  this.ammoyoffset = "0";  // probably not final values
  this.strDamage = 1;  // only missile weapon with a strength bonus
}
BoulderWeaponTile.prototype = new MissileWeaponObject();

// NPCs

function AnimateObject() {
	this.altgraphic = [];
	
	this.addType("Animate");
}
AnimateObject.prototype = new GameObject();


// Replaced for the nonce with PickOne.
//AnimateObject.prototype.pickGraphic = new function() {
//	if (this.altGraphics) {
 // 	var options = this.altGraphics.length;
//	  if (options > 0) {
//		  var randomnumber=Math.floor(Math.random()*options) + 1;
//		  this.setGraphic(altGraphics[randomnumber]);
//	  }
//	}
//}

function NPCObject() {
	this.str = 10;
	this.dex = 10;
	this.int = 10
	this.modstr = 0;
	this.moddex = 0;
	this.modint = 0;
	this.hp = 10;
	this.maxhp = 10;
	this.mana = 10;
	this.maxmana = 10;
	this.level = 0
//	this.type = "npc";
	this.npcname = "myname";
	this.desc = "an NPC";
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.threatenedAI = "spellcaster";
	this.graphic = "301.gif";
  this.gender = "neuter";
	this.meleeAttackAs = "Fists";
	this.meleeDamage = -1;
	this.meleeStrDamage = -1;
	this.missileAttackAs = "none";
	this.missileDamage = -1;
	this.missileRange = -1;
	this.armorAs = "none";
	this.armorDefense = -1;
	this.armorAbsorb = -1;
	this.armorResist = -1;
	this.initmult = 1;
	this.movetype = MOVE_WALK;
	this.meleeChance = 100;
  this.gold = 0;
	this.leavesCorpse = "";
	this.lootTable = "";
	this.lastTurnTime = 0;
	this.knowsInfusion = 0;
	this.conversation = "";
	this.merch = "";
	this.spawnedBy;
	this.special = "";
	
	this.addType("npc");
//	AddNPCProperties.call(this);
}
NPCObject.prototype = new AnimateObject();

function AddNPCProperties() {
  this.equipment = {};
  this.equipment.armor = "";
  this.equipment.weapon = "";
  this.equipment.missile = "";

	this.inventory = new Collection();
	
	this.spellbook = [];
	this.spellEffects = new Collection();
	
	this.resists = {};   // fire, ice

	this.lastLocation = {};
	this.lastLocation.map = "";
	this.lastLocation.x = 0;
	this.lastLocation.y = 0;
		
	//brain
	this.currentPoI = {};
  this.currentDestination = {};
  this.turnsToRecalcPoI = 0;
  this.turnsToRecalcDest = 0;
  this.currentPath = [];
  this.destType;

}

NPCObject.prototype.getDesc = function() {
  var knowsflag = "knows_" + this.conversation;
  if (DU.gameflags[knowsflag]) {
    return this.npcname;
  } 
  return this.desc;
}

NPCObject.prototype.getNPCName = function() {
	return this.npcname;
}

NPCObject.prototype.setNPCName = function(newName) {
	this.npcname = newName;
	return this.npcname;
}

NPCObject.prototype.setMana = function(newMana) {
	if (newMana === -1) { this.mana = this.getInt(); }
	else {this.mana = newMana; }
}

NPCObject.prototype.getMana = function() {
  var mana = parseInt(this.mana);
	return mana;
}

NPCObject.prototype.modMana = function(diffMana) {
	this.mana = this.mana + diffMana;
	if (this.checkType("pc")) {
	  DrawCharFrame();
	}
	return this.mana;
}

NPCObject.prototype.setMaxMana = function(newMana) {
	if (newMana === -1) { this.maxmana = this.getInt(); }
	else {this.maxmana = newMana; }
}

NPCObject.prototype.getMaxMana = function() {
	return this.maxmana;
}

NPCObject.prototype.getKnowsInfusion = function() {
	return this.knowsInfusion;
}

NPCObject.prototype.setKnowsInfusion = function(knowledge) {
	this.knowsInfusion = knowledge;
	return this.knowsInfusion;
}

NPCObject.prototype.setGold = function(newgold) {
  newgold = parseInt(newgold);
	this.gold = newgold;
}

NPCObject.prototype.getGold = function() {
	return parseInt(this.gold);
}

NPCObject.prototype.addGold = function(diffgold) {
  diffgold = parseInt(diffgold);
  if (!isNaN(diffgold)) {
    this.gold += diffgold;
  }
  return this.gold;
}

NPCObject.prototype.getLastTurnTime = function() {
  return this.lastTurnTime;
}

NPCObject.prototype.setLastTurnTime = function(newtime) {
//  newtime = parseInt(newtime);
  if (!isNaN(newtime)) {
    this.lastTurnTime = newtime;
  }
  return this.lastTurnTime;
}

NPCObject.prototype.getConversation = function() {
  return this.conversation; 
}

NPCObject.prototype.setConversation = function (convo) {
  this.conversation = convo;
}

NPCObject.prototype.getConversationFlag = function() {
  return this.conversationflag; 
}

NPCObject.prototype.setConversationFlag = function (cf) {
  this.conversationflag = cf;
}

NPCObject.prototype.setConversationFlagged = function () {
  this.conversation= this.conversation + "_a";  
}

NPCObject.prototype.getMerch = function() {
  return this.merch; 
}

NPCObject.prototype.setMerch = function (merchname) {
  this.merch = merchname;
}

NPCObject.prototype.setHP = function(newhp) {
	this.hp = newhp;
}

NPCObject.prototype.getHP = function() {
	return this.hp;
}

NPCObject.prototype.getDisplayHP = function() {
  var displayhp = Math.ceil(this.hp);
  if (displayhp < 0) { displayhp = 0; }
  return displayhp;
}

NPCObject.prototype.setMaxHP = function(newhp) {
	this.maxhp = newhp;
}

NPCObject.prototype.getMaxHP = function() {
	return this.maxhp;
}

NPCObject.prototype.modHP = function(hpdiff) {
//	hpdiff = parseInt(hpdiff);
	this.hp += hpdiff;
	return this.hp;
}

NPCObject.prototype.healMe = function(amt, src) {
  this.modHP(amt);
  if (this.getHP() > this.getMaxHP()) {
    this.setHP(this.getMaxHP());
  }
  return this.getHP();
}

NPCObject.prototype.dealDamage = function(dmg, src) {
  var isasleep = this.getSpellEffectsByName("Sleep");
  if (isasleep) {
    isasleep.endEffect();
  }
  this.modHP(dmg*-1);
  if (this.getHP() <= 0) { // killed!
    this.processDeath(1);
    return 0;
  }
  else { return 1; }
}

NPCObject.prototype.processDeath = function(droploot){
  if (this.checkType("PC")) {
    
  } else {
    var corpse = {};
    var chest;
    var map = this.getHomeMap();
    if ((this.getLeavesCorpse()) && (this.getLeavesCorpse() !== "none")) {
      corpse = localFactory.createTile(this.getLeavesCorpse());
      map.placeThing(this.getx(),this.gety(), corpse);
    } else {
      chest = localFactory.createTile("Chest");
    }
    if ((droploot) && (this.lootTable !== "none")) {
      var loot = {};
      if (DULoot[this.lootTable]) {
        loot = DULoot[this.lootTable].getLoot(); 
        if (loot.lootlist.length) {
          if (chest) {
            for (var i=0; i<loot.lootlist.length;i++){
              chest.addToContainer(loot.lootlist[i], 1);
            }
          } else {
            corpse.setSearchYield(loot.lootlist);
          }
        }
        if (loot.gold) {
          if (chest) {
            chest.addToContainer("Gold", loot.gold);
          } else {
            corpse.addToSearchYield("Gold");
//            var foo = new Array;
//            foo[0] = "Gold";
//            corpse.setSearchYield(foo);
            corpse.setGold(loot.gold);
          }
        }
      }
      else {alert (this.getName() + " has a loottable that is not defined."); }
    }
    if ((chest) && (chest.container.length)) {
      if (DULoot[this.lootTable].trap) {
        var trapname = DULoot[this.lootTable].trap;
        if (debug) { dbs.writeln("Chest created, might be trapped with: " + trapname + ".<br />"); }        
        var trap = DUTraps[trapname].getTrap();
        if (trap.trap) {
          chest.setTrap(trap.trap, trap.level);
        }
      }
      map.placeThing(this.getx(),this.gety(), chest);
    }
    map.deleteThing(this);
    DrawMainFrame("one",this.getHomeMap().getName(),this.getx(),this.gety());
    DUTime.removeEntityFrom(this);
//    delete universe.this.getSerial();
//    delete map.lightsList[this.getSerial()];    // handled in map.deleteThing now
    var spawner=this.getSpawnedBy();
    if (spawner) {
      spawner.deleteSpawned(this);
    }
  }
}

NPCObject.prototype.setGender = function(newgender) {
  if ((newgender === "male") || (newgender === "female") || (newgender === "other") || (newgender === "neuter")) { this.gender = newgender; }
  else { alert ("setGender send invalid data"); }
  return this.gender; 
}

NPCObject.prototype.getGender = function() {
  return this.gender;
}

NPCObject.prototype.getGenderedTerms = function() {
  var gt = {};
  if (this.gender === "male") {
    gt.pronoun = "he";
    gt.possessive = "his";
    gt.titled = "Lord";
    gt.objective = "him";
    gt.formal = "Prince";
    gt.sibling = "brother";
    gt.kiddie = "son";
  } else if (this.gender === "female") {
    gt.pronoun = "she";
    gt.possessive = "hers";
    gt.titled = "Lady";
    gt.objective = "her";
    gt.formal = "Princess";
    gt.sibling = "sister";
    gt.kiddie = "daughter";
  } else if (this.gender === "other") {
    gt.pronoun = "they";
    gt.possessive = "theirs";
    gt.objective = "their";
    gt.titled = "Lord";
    gt.formal = "Heir";
    gt.sibling = "sibling";
    gt.kiddie = "child";    
  } else {
    gt.pronoun = "it";
    gt.possessive = "its";
    gt.objective = "it";
    gt.titled = "Lord";
    gt.formal = "Heir";
    gt.sibling = "sibling";
    gt.kiddie = "child";    
  }
  return gt;
}

NPCObject.prototype.setStr = function(newstr) {
	newstr = parseInt(newstr);
	if ((newstr !== 0) && (!isNaN(newstr))) { this.str = newstr; }
}

NPCObject.prototype.setBaseStr = function(newstr) {
  this.setStr(newstr);
}

NPCObject.prototype.getStr = function() {
  var str = this.getBaseStr() + this.getModStr();
	return str;
}

NPCObject.prototype.getModStr = function() {
  return this.modstr;
}

NPCObject.prototype.setModStr = function(newstr) {
  newstr = parseInt(newstr);
  if (!isNaN) { this.modstr = newstr; }
  return this.getStr();
}

NPCObject.prototype.getBaseStr = function() {
  return this.str;
}

NPCObject.prototype.setDex = function(newdex) {
	newdex = parseInt(newdex);
	if ((newdex !== 0) && (!isNaN(newdex))) { this.dex = newdex; }
}

NPCObject.prototype.setBaseDex = function(newdex) {
  this.setDex(newdex);
}

NPCObject.prototype.getDex = function() {
  var dex = this.getBaseDex() + this.getModDex();
	return dex;
}

NPCObject.prototype.getBaseDex = function() {
  return this.dex;
}

NPCObject.prototype.getModDex = function() {
  return this.moddex;
}

NPCObject.prototype.setModDex = function(newdex) {
  newdex = parseInt(newdex);
  if (!isNaN) { this.moddex = newdex; }
  return this.getDex();
}

NPCObject.prototype.setInt = function(newint) {
	newint = parseInt(newint);
	if ((newint !== 0) && (!isNaN(newint))) { this.int = newint; }
}

NPCObject.prototype.setBaseInt = function(newint) {
  this.setInt(newint);
}

NPCObject.prototype.setModInt = function(newint) {
  newint = parseInt(newint);
  if (!isNaN) { this.modint = newint; }
  return this.getInt();
}

NPCObject.prototype.getInt = function() {
  var theint = this.getBaseInt() + this.getModInt();
	return theint;
}

NPCObject.prototype.getBaseInt = function() {
  return this.int;
}

NPCObject.prototype.getModInt = function() {
  return this.modint;
}

NPCObject.prototype.setStats = function(newstr, newdex, newint) {
	this.setStr(newstr);
	this.setDex(newdex);
	this.setInt(newint);
}

NPCObject.prototype.setLevel = function(newlevel) {
	newlevel = parseInt(newlevel);
	if (newlevel !== 0) { this.level = newlevel; }
}

NPCObject.prototype.getLevel = function() {
	return this.level;
}

NPCObject.prototype.getAlignment = function() {
	return this.alignment;
}

NPCObject.prototype.setAlignment = function(newAlign) {
	this.alignment = newAlign;
	return this.alignment;
}

NPCObject.prototype.getAttitude = function() {
	return this.attitude;
}

NPCObject.prototype.setAttitude = function(newAttitude) {
	this.attitude = newAttitude;
	return this.attitude;
}

NPCObject.prototype.getPeaceAI = function() {
	return this.peaceAI;
}

NPCObject.prototype.setPeaceAI = function(newAI) {
	this.peaceAI = newAI;
	return this.peaceAI;
}

NPCObject.prototype.getPCThreatAI = function() {
	return this.PCThreatAI;
}

NPCObject.prototype.setPCThreatAI = function(newAI) {
	this.PCThreatAI = newAI;
	return this.PCThreatAI;
}

NPCObject.prototype.getThreatenedAI = function() {
	return this.threatenedAI;
}

NPCObject.prototype.setThreatenedAI = function(newAI) {
	this.threatenedAI = newAI;
	return this.threatenedAI;
}

NPCObject.prototype.getMeleeAttackAs = function() {
	return this.meleeAttackAs;
}

NPCObject.prototype.setMeleeAttackAs = function(melee) {
	this.meleeAttackAs = melee;
	return this.meleeAttackAs;
}

NPCObject.prototype.getMissileAttackAs = function() {
	return this.missileAttackAs;
}

NPCObject.prototype.setMissileAttackAs = function(missile) {
	this.missileAttackAs = missile;
	return this.missileAttackAs;
}

NPCObject.prototype.getArmorAs = function() {
	return this.armorAs;
}

NPCObject.prototype.setArmorAs = function(armor) {
	this.armorAs = armor;
	return this.armorAs;
}

NPCObject.prototype.nextActionTime = function(initdelay) {

  var themap = this.getHomeMap();
  var scale = themap.getScale();
  if (this.smallscalemove) { 
    scale = 1;
    delete this.smallscalemove;
  }

  var effectiveDex = 10;
  if (scale) {
    effectiveDex = this.getDex();
  }
//  var isQuick = 1;  // replace with a check for the presence of the Quickness spell.  // actually, quickness spell should just modify initmult
//  var init = ((-1/60) * effectiveDex + (7/6)) * this.initmult * (isQuick);
  var init = ((-1/60) * effectiveDex + (7/6)) * this.initmult;
  
  if ((initdelay) && (initdelay != 0)) {
  	init = init * initdelay;
  }
  if (scale != "0") { init = init * SCALE_TIME; }
	return init;
}

NPCObject.prototype.getLeavesCorpse = function() {
  return this.leavesCorpse;
}

NPCObject.prototype.setLeavesCorpse = function(newCorpse) {
  this.leavesCorpse = newCorpse;
  return (this.leavesCorpse);
}

NPCObject.prototype.getMovetype = function() {
	return this.movetype;
}

NPCObject.prototype.setMovetype = function(move) {
	this.movetype = move;
}

NPCObject.prototype.addMovetype = function(move) {
	this.movetype = this.movetype | move;
}

NPCObject.prototype.removeMovetype = function(move) {
	this.movetype = this.movetype & ~move;
}

NPCObject.prototype.getMeleeChance = function() {
  return this.meleeChance;
}

NPCObject.prototype.setMeleeChance = function(mc) {
  this.meleeChance = mc;
  return this.meleeChance;
}

NPCObject.prototype.getSpellEffects = function() {
  return this.spellEffects.getAll();
}

NPCObject.prototype.getSpellEffectsByName = function(checkname) {
  return this.spellEffects.getByName(checkname);
}

NPCObject.prototype.addSpellEffect = function(spellobj) {
  var otherEffects = this.getSpellEffects();
  var addme = 1;
  var silent = 0;
  if (otherEffects.length) {
    for (var i=0; i < otherEffects.length; i++) {
      if (otherEffects[i].getName() === spellobj.getName()) {
        silent = 1;
        var totin = spellobj.getInstances() + otherEffects[i].getInstances();
        if (debug) { dbs.writeln("<span style='color:green'>Magic: That spell is already on the target.<br /></span>"); }
        if (otherEffects[i].getPower() > spellobj.getPower()) {  // keep old one, extend it
          var adddur = (1/(totin - 1))*(spellobj.getPower() / otherEffects[i].getPower()) * (spellobj.getExpiresTime() - DU.DUTime.getGameClock());
          if (debug) { dbs.writeln("<span style='color:green'>Magic: Old one is stronger, extending by " + adddur + ".<br /></span>"); }
          otherEffects[i].setExpiresTime(otherEffects[i].getExpiresTime() + adddur);
          otherEffects[i].setInstances(otherEffects[i].getInstances() + spellobj.getInstances());
          otherEffects[i].mergeSpells("old");
          addme = 0; 
//          maintext.addText("The existing spell is revitalized!");
          return 0;
        } else {
          var adddur = (1/(totin - 1))*(otherEffects[i].getPower() / spellobj.getPower()) * (otherEffects[i].getExpiresTime() - DU.DUTime.getGameClock());
          spellobj.setExpiresTime(spellobj.getExpiresTime() + adddur);
          if (debug) { dbs.writeln("<span style='color:green'>Magic: New one is stronger. Replacing old and extending new by " + adddur + ".<br /></span>"); }
          otherEffects[i].endEffect(1);
          spellobj.setInstances(otherEffects[i].getInstances() + spellobj.getInstances());
          spellobj.mergeSpells("new");
//          maintext.addText("The existing spell has become stronger!");
        }
        break;
      }
    }
  }
  this.spellEffects.addBottom(spellobj);
  spellobj.setAttachedTo(this);
  spellobj.setCreateTime(DUTime.getGameClock());
  var makeactive = spellobj.applyEffect(silent);
  if (makeactive) {
    spellobj.setActive(1);
  }
  
  return 1;
//  SetActiveEffects(this);
}

NPCObject.prototype.deleteSpellEffect = function(spellobj) {
  this.spellEffects.deleteFrom(spellobj);
//  SetActiveEffects(this);
}

NPCObject.prototype.getSpawnedBy = function() {
  return this.spawnedBy;
}

NPCObject.prototype.setSpawnedBy = function(spawner) {
  this.spawnedBy = spawner;
  return this.spawnedBy;
}

NPCObject.prototype.activate = function(timeoverride) {
  if (gamestate.getMode() !== "loadgame") {  
    this.equipment = {};
    this.equipment.armor = "";
    this.equipment.weapon = "";
    this.equipment.missile = "";

	  this.inventory = new Collection();
	
  	this.spellbook = [];
	  this.spellEffects = new Collection();
	
  	this.resists = {};   // fire, ice

	  this.lastLocation = {};
    this.lastLocation.map = "";
	  this.lastLocation.x = 0;
	  this.lastLocation.y = 0;
		
	  //brain
	  this.currentPoI = {};
    this.currentDestination = {};
    this.turnsToRecalcPoI = 0;
    this.turnsToRecalcDest = 0;
    this.currentPath = [];
    this.destType;

    this.maxhp = this.level * 10 + (parseInt(Math.random()*11) - 5);
    if (this.addhp) { this.maxhp += this.addhp; }
    this.hp = this.maxhp;
    

    if (debug) {
      dbs.writeln("<span style='color:green;font-weight:bold'>NPC " + this.getName() + "(" + this.getSerial() + ") activating.</span><br />");
    }
  
    if (this.altgraphic.length) {
      this.altgraphic.push(this.graphic);
      this.graphic = PickOne(this.altgraphic);
      this.altgraphic = []; // no longer need to store this
    }
  
    this.setMana(-1);
    this.setMaxMana(-1);
  
    var weapon;
    var missileweapon;
    var armor;
    
    if ((this.getMeleeAttackAs()) && (this.getMeleeAttackAs() !== "none")) {
      weapon = localFactory.createTile(this.getMeleeAttackAs());
      this.setEquipment("weapon",weapon);
    }
    else {
      weapon = localFactory.createTile("NaturalWeapon");
      
      if (this.meleeDamage !== -1) {
        weapon.setDamage(this.meleeDamage);
      }
      if (this.meleeStrDamage !== -1) {
        weapon.setStrDamage(this.meleeStrDamage);
      }
      this.setEquipment("weapon",weapon);
    } 
    if ((this.getMissileAttackAs()) && (this.getMissileAttackAs() !== "none")) {
      missileweapon = localFactory.createTile(this.getMissileAttackAs());
      this.setEquipment("missile",missileweapon);
    } 
    else if (this.getMissileAttackAs() !== "none") {
      missileweapon = localFactory.createTile("NaturalMissileWeapon");
      if (this.missileDamage !== -1) {
        missileweapon.setDamage(this.missileDamage);
      }
      if (this.missileRange !== -1) {
        missileweapon.setRange(this.missileRange);
      }

      this.setEquipment("missile",missileweapon);
    } 
    if ((this.getArmorAs()) && (this.getArmorAs() !== "none")) {
      armor = localFactory.createTile(this.getArmorAs());
      this.setEquipment("armor",armor);
    }
    else {
      armor = localFactory.createTile("NaturalArmor");
      if (this.armorDefense !== -1) {
        armor.setDefense(this.armorDefense);
      }
      if (this.armorResist !== -1) {
        armor.setResist(this.armorResist);
      }
      if (this.armorAbsorb !== -1) {
        armor.setAbsorb(this.armorAbsorb);
      }

      this.setEquipment("armor",armor);
    } 
    
    if (this.special.indexOf("quick") > -1) {
      var qobj = localFactory.createTile("Quickness");
      qobj.setExpiresTime(-1);
      this.addSpellEffect(qobj);
    }
    
    if (this.special.indexOf("mirror") > -1) {
      this.setGraphicArray(PC.getGraphicArray());
      this.gender = PC.gender
      this.npcname = PC.pcname;
    }
  
    var timing = this.nextActionTime(0);
    timing = timing/2;
    if (timeoverride) {
      timing = timeoverride;
    }
    timing = timing + (Math.random() / 500);

    if (debug) {
      dbs.writeln("<span style='color:green;font-weight:bold'>Curr time: " + DUTime.getGameClock() + ", NPC will go in " + timing + ".</span><br />");
    }
  
    this.startx = this.getx();
    this.starty = this.gety();
    
    var NPCEvent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCEvent,timing);  
  }
}


NPCObject.prototype.moveMe = function(diffx,diffy,forcemove) {
	var map = this.getHomeMap();
	var oldmapname = map.getDesc();
	var passx = parseInt(this.getx()) + parseInt(diffx);
	var passy = parseInt(this.gety()) + parseInt(diffy);
	var tile = map.getTile(passx,passy);
	var retval = {};
	if (tile === "OoB") { 
		if (map.getExitToMap()) {
			var newmap = new GameMap();
			if (maps.getMap(map.getExitToMap())) {
				newmap = maps.getMap(map.getExitToMap());
			} else {
				newmap.loadMap(map.getExitToMap());
				maps.addMapByRef(newmap);
			}
			tile = MoveBetweenMaps(this,map,newmap,map.getExitToX(),map.getExitToY());
			if (this === PC) {
				DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
				DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
				retval["canmove"] = 0;
				retval["msg"] = ".<br />Exiting " + oldmapname + ".";
			}
		}
	}
	else {
		retval = tile.getBumpIntoResult(this);
		if (retval["canmove"] === 0) { return retval; }
//		var moveval = tile.canMoveHere(this, map.getTile(this.getx(),this.gety()));
		var moveval = tile.canMoveHere(this.getMovetype());
		retval["canmove"] = moveval["canmove"];
	
		if (retval["msg"] === "") {
			if (moveval["msg"] === "") { retval["msg"] = "."; }
			else { retval["msg"] = " - " + moveval["msg"]; }
		}
		else {
			if (moveval["msg"] !== "") {
				retval["msg"] += "<br />" + moveval["msg"];
			}
		}
	}
	
	if (retval["canmove"] === 1) {
	  var exittile = map.getTile(this.getx(),this.gety());
	  var walkofftile = exittile.executeWalkoffs(this);
	  if (walkofftile) {
	    if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
	    retval["msg"] += walkoffval;
	  }
		map.moveThing(this.getx()+diffx,this.gety()+diffy,this);
		if ((this === PC) && (DU.gameflags.sound)) {
		  if (tile.getFeatures().length) {
		    play_footstep("Feature");
		  } else {
		    play_footstep(tile.getTerrain().getName());
		  }
		}
//    if (GetDistance(this.getx(), this.gety(), PC.getx(), PC.gety()) < 1+Math.pow(( (viewsizex-1)/2*(viewsizex-1)/2 + (viewsizey-1)/2*(viewsizey-1)/2 ),.5) ) {
    var distfrom = getDisplayCenter(map, PC.getx(), PC.gety());
		var walkonval = tile.executeWalkons(this);
		if (walkonval) {
		  if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
		  retval["msg"] += walkonval;
		}
    if (GetDistance(this.getx(), this.gety(), distfrom.centerx, distfrom.centery) < 1+Math.pow(( (viewsizex-1)/2*(viewsizex-1)/2 + (viewsizey-1)/2*(viewsizey-1)/2 ),.5) ) {
      // basically, was this move on screen? The +1 is to catch things that might have just walked off-screen
      // uncommented version checks from current display center, not from PC position.
			DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
    }
	}
	retval["initdelay"] = tile.getInitDelay(this);
	return retval;
}

NPCObject.prototype.myTurn = function() {
  raceWarning = 0;
  
  if (!maps.getMap(this.getHomeMap().getName())) {
    // removing from timeline, its map is gone
    var nextEntity = DUTime.executeNextEvent().getEntity();
    nextEntity.myTurn();

    dbs.writeln("<span style='color:green;font-weight:orange'>Creature " + this.getName() + " : " + this.getSerial() + " removed from game- map gone.</span><br />");
  
    return 1;
  }

	gamestate.setMode("NPC");
	gamestate.setTurn(this);

  if (debug) { dbs.writeln("<span style='color:orange; font-weight:bold'>" + this.getName() + ", serial " + this.getSerial() + " is starting its turn.</span><br />"); }	
	RunEffects(this);
	
  var awake = 1;
  if (this.getSpellEffectsByName("Sleep")) { awake = 0; }
  
	// actual AI!
  if (awake) {	
    var response = {};  
  	// will be = return value of AI call
  	var ainame=this.getPeaceAI().split("-");

    if (ais[ainame[0]]) {
	    if (ainame.length === 1) { ainame[1] = ""; }
	    response = ais[ainame[0]](this, ainame[1]);
	  }
	  if (typeof response.initdelay === 'undefined') {
	    response["initdelay"] = 1;
	  }
	}
  if (response.wait) {
    // something the NPC did has started an animation that will handing restarting the scheduler.
    return 0;
  }	
  // check for NPC idling
  var oldloc = this.getLastLocation();
  if ((oldloc.map === this.getHomeMap().getName()) && (oldloc.x === this.getx()) && (oldloc.y === this.gety())) {  // npc did not move
    var tile = this.getHomeMap().getTile(this.getx(),this.gety());
    var idleval = tile.executeIdles(this);
  } else {
    var newloc = {};
    newloc.map = this.getHomeMap().getName();
    newloc.x = this.getx();
    newloc.y = this.gety();
    this.setLastLocation(newloc);
  }
  
	this.setLastTurnTime(DUTime.getGameClock());
	
	gamestate.setMode("null");
	var NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,this.nextActionTime(response["initdelay"]));
  
//  var nextEntity = DUTime.executeNextEvent().getEntity();
//  nextEntity.myTurn();

  return 1;
}

NPCObject.prototype.endTurn = function(init) {
  gamestate.setMode("null");
  
  // did this entity idle?
  var oldloc = this.getLastLocation();
  var idleval;
  if ((oldloc.map === this.getHomeMap().getName()) && (oldloc.x === this.getx()) && (oldloc.y === this.gety())) {  // player did not move
    var tile = this.getHomeMap().getTile(this.getx(),this.gety());
    idleval = tile.executeIdles(this);
  } else {
    var newloc = {};
    newloc.map = this.getHomeMap().getName();
    newloc.x = this.getx();
    newloc.y = this.gety();
    this.setLastLocation(newloc);
  }
  
  if (idleval && (this === PC)) { maintext.addText(idleval); }
  this.setLastTurnTime(DUTime.getGameClock());
  
  var myevent = new GameEvent(this);
  DUTime.addAtTimeInterval(myevent,this.nextActionTime(init));

//  var nextEntity = DUTime.executeNextEvent().getEntity();
//  nextEntity.myTurn();
  startScheduler();
}

NPCObject.prototype.addToInventory = function(item, thinAir, qty) {
  // Whether the object being added to inventory is an item
  // must be checked before this point. This will add _anything_ to
  // an inventory!
  
  //If thinAir is set, the item is being generated directly into the inventory,
  //and so does not need to be removed from the map.
  if (!thinAir) {
    // otherwise, this will remove the item from the NPC/PC's map first.
    this.getHomeMap().deleteThing(item);
  }
  if (!qty) { qty = 1; }
  var alreadyIn = this.inventory.getByName(item.getName());
  if (alreadyIn) {
    alreadyIn.setQuantity(alreadyIn.getQuantity()+qty);
  }
  else {
    this.inventory.addTop(item);
  }
  item.setx(0);
  item.sety(0);  
}

NPCObject.prototype.removeFromInventory = function(item, map, x, y) {
  if (item.getQuantity > 1) {
    item.setQuantity(item.getQuantity()-1);
  } else {
    // If this is equipped, unequip it first
    if (item === this.getWeapon()) {
      this.setEquipment("Weapon","");
    }
    if (item === this.getMissile()) {
      this.setEquipment("Missile","");
    }
    if (item === this.getArmor()) {
      this.setEquipment("Armor","");
    }    
    this.inventory.deleteFrom(item);
  }
  if (map) { // if map,x,y are filled in, will place the item back on
             // the map
    map.placeThing(x,y,item);
  }
}

NPCObject.prototype.getInventory = function() {
  var inv = this.inventory.getAll();
  return inv;
}

NPCObject.prototype.checkInventory = function(itemname) {
  return this.inventory.getByName(itemname);
}

NPCObject.prototype.getEquipment = function(which) {
  which = which.toLowerCase();
  if (which === "armor") {
    return (this.getArmor()); 
  }
  else if (which === "weapon") {
    return (this.getWeapon());
  }
  else if (which === "missile") {
    return (this.getMissile());
  }
  
  else { return ""; }
}

NPCObject.prototype.setEquipment = function(which,what) {
  which = which.toLowerCase();
  if (which === "armor") {
    return this.setArmor(what);
  }
  else if (which === "weapon") {
    return this.setWeapon(what);
  }
  else if (which === "missile") {
    return this.setMissile(what);
  }
  
  else { return 0; }
}

NPCObject.prototype.getArmor = function() {
  if (this.equipment.armor) { return this.equipment.armor; }
  else { return ""; } 
}

NPCObject.prototype.getWeapon = function() {
  if (this.equipment.weapon) { return this.equipment.weapon; }
  else { return ""; } 
}

NPCObject.prototype.getMissile = function() {
  if (this.equipment.missile) { return this.equipment.missile; }
  else { return ""; } 
}

NPCObject.prototype.setArmor = function(newarmor) {
  if (newarmor) {
    if (newarmor.checkType("Armor")) {
      this.equipment.armor = newarmor;
      return 1;
    }
    return 0;
  } else { 
    this.equipment.armor = "";
    return 1;
  }
}

NPCObject.prototype.setWeapon = function(newweapon) {
  if (newweapon) {
    if (newweapon.checkType("Weapon")) {
      this.equipment.weapon = newweapon;
      return 1;
    }
    return 0;
  } else {
    this.equipment.weapon = "";
    return 1;
  }
}

NPCObject.prototype.setMissile = function(newmissile) {
  if (newmissile) {
    if (newmissile.checkType("Missile")) {
      this.equipment.missile = newmissile;
      return 1;
    }
    return 0;
  } else {
    this.equipment.missile = "";
    return 1;
  }
}

NPCObject.prototype.getHitChance = function(atkwith) {
  if (!atkwith) { atkwith = "melee"; }
  var tohit = BASE_HIT_CHANCE;
  tohit += this.getLevel() * HIT_PER_LEVEL ;
  if (atkwith === "melee") {
    tohit += this.getStr() - 10;
    var weapon = this.getEquipment("weapon");
    if (weapon) {
      tohit += weapon.getToHitBonus();
    }
  } else {
    tohit += this.getDex() - 10;
    var weapon = this.getEquipment("missile");
    if (weapon) {
      tohit += weapon.getToHitBonus();
    }
  }
  var armor = this.getEquipment("armor");
  if (armor) {
    tohit += armor.getToHitBonus();
  }
  
  var distracted = this.getSpellEffectsByName("Distract");
  if (distracted) {
    var stillon = distracted.doEffect();
    if (stillon != -1) {
      if (debug) { dbs.writeln("<span style='color:green'>DISTRACTED: old tohit: " + tohit + ", "); }
      tohit = tohit * (1-distracted.getPower());
      if (debug) { dbs.writeln("new tohit: " + tohit + ".<br /></span>"); }
    }
  }
  return tohit;
}

NPCObject.prototype.getDefense = function() {
  var def = this.getLevel() * DEF_PER_LEVEL;
  var armor = this.getEquipment("armor");
  if (armor) {
    if (this.getStr() < armor.getStrReq()) {
      def += (armor.getDefense())/3;
    } else {
      def += armor.getDefense();
    }
  }
  var vuln = this.getSpellEffectsByName("Vulnerability");
  if (vuln) {
    if (debug) { dbs.writeln("vulnerable: old AC " + def + ", </span>"); }
    def = def - vuln.getPower();
    if (debug) { dbs.writeln("new AC: " + def + ".<br /></span>"); }
  }
  var prot = this.getSpellEffectsByName("Protection");
  if (prot) {
    if (debug) { dbs.writeln("protected: old AC " + def + ", </span>"); }
    def = def + prot.getPower();
    if (debug) { dbs.writeln("new AC: " + def + ".<br /></span>"); }
  } 
  return def;
}

NPCObject.prototype.getAbsorb = function() {
  var armor = this.getEquipment("armor");
  if (armor) {
    return armor.getAbsorb();
  }
}

NPCObject.prototype.getResist = function(resisttype) {
  if (resisttype === "physical") {
    var armor = this.getEquipment("armor");
    if (armor) {
      return (armor.getAbsorb());
    }
  }
  if (resisttype === "magic") {
    var armor = this.getEquipment("armor");
    if (armor) {
      return (armor.getResist());
    }
  }    
  
  if (this.resists[resisttype]) {
    return this.resists[resisttype];
  } 
  return 0;
}

NPCObject.prototype.getLastLocation = function() {
  return this.lastLocation;
}

NPCObject.prototype.setLastLocation = function (newloc) {
  this.lastLocation.map = newloc.map;
  this.lastLocation.x = newloc.x;
  this.lastLocation.y = newloc.y;
}

NPCObject.prototype.getDestination = function() {
  var dest = {};
  dest.x = this.currentDestination.x;
  dest.y = this.currentDestination.y;
  return dest;
}

NPCObject.prototype.setDestination = function(dest, timeuntil) {
  this.currentDestination = dest;
  this.turnsToRecalcDest = timeuntil;
}

NPCObject.prototype.getDestinationType = function() {
  return this.destType;
}

NPCObject.prototype.setDestinationType = function(dtype) {
  this.destType = dtype;
}


NPCObject.prototype.getTurnsToRecalcDest = function() {
  return this.turnsToRecalcDest; 
}

NPCObject.prototype.setTurnsToRecalcDest = function(timeuntil) {
  this.turnsToRecalcDest = timeuntil;
}

NPCObject.prototype.getPoI = function() {
  return this.currentPoI;
}

NPCObject.prototype.setPoI = function(poi) {
  this.currentPoI = poi;
}

//NPCObject.prototype.getTurnsToRecalcPoI = function() {
//  return this.turnsToRecalcPoI;
//}

//NPCObject.prototype.setTurnsToRecalcPoI = function(timeuntil) {
//  this.turnsToRecalcPoI = timeuntil;
//}

NPCObject.prototype.setCurrentPath = function(newpath) {
  this.currentPath = newpath;
}

NPCObject.prototype.getCurrentPath = function() {
  return this.currentPath;
}

NPCObject.prototype.getNextStep = function() {
  if (this.currentPath.length > 0) {
    var nextstep = this.currentPath.shift();
    return nextstep;
  }
  return [];
}

function NPCGroupObject() {
  this.group = [];
}
NPCGroupObject.prototype = new NPCObject();

function NPCList(npcs,num) {
  this.npc = npcs;
  this.count = num;
}

NPCGroupObject.prototype.populate = function() {
  var population = [];
  for (var i=0; i< this.group.length; i++) {
    var num = RollDice(this.group[i].count);
    for (var j=1; j<=num; j++) {
      if (population.length < 8) {
        var monster = localFactory.createTile(this.group[i].npc);
        population[population.length] = monster;
      }
    }
  }
  
  return population;
}

// NPCs have moved into npcObjects.js




function PCObject() {
	this.name = "PC";
	this.str = 10;
	this.dex = 10;
	this.int = 10;
	this.level = 1;
	this.pcname = "Subject Name Here";
	this.desc = "you";
	this.alignment = "good";	
	this.attutide = "friendly";
	this.graphic = "300.gif";
	this.meleeAttackAs = "Fists";
	this.missileAttackAs = "none";
  this.equipment = {};
  this.equipment.armor = "";
  this.equipment.weapon = "";
  this.equipment.missile = "";
	this.maxhp = 30 * this.level;
	this.hp = this.maxhp;
	this.maxmana = this.int;
	this.mana = this.maxmana;
	this.movetype = MOVE_WALK;
	this.xp = 0;
	this.tp = 0;  // training points
  this.spells = [];
  this.lastspelllevel = 1;
  this.lastspell = 1;
  this.infuse = 0;
  this.gender = "other";
	
	LightEmitting.call(this, 0.5);
	this.addType("pc");
	
  // kind of a hack
  this.equipment = {};
  this.equipment.armor = "";
  this.equipment.weapon = "";
  this.equipment.missile = "";

  this.runes = {};
  this.runes.kings = 0;
  this.runes.flames = 0;
  this.runes.winds = 0;
  this.runes.waves = 0;
  this.runes.void = 0;

	this.inventory = new Collection();
  this.spellEffects = new Collection();	

	this.lastLocation = {};
	this.lastLocation.map = "";
	this.lastLocation.x = 0;
	this.lastLocation.y = 0;

//	var myweapon = localFactory.createTile("Dagger");
//	myweapon.equipMe(this);
}
PCObject.prototype = new NPCObject();

PCObject.prototype.activate = function() {
  return 1;
}

PCObject.prototype.myTurn = function() {
  if (debug) { dbs.writeln("=== PC TURN ===   Timestamp: " + DU.DUTime.getGameClock() + "; x: " + PC.getx() + ", y: " + PC.gety() + "<br />"); }
  if (gamestate !== "loadgame") {
    // this half of myTurn has already run before the player saved
    RunEffects(this);
  
    if (this.getHP() <= 0) {
      DoPCDeath();
    }
  }
    
  var awake = 1;
  if (this.getSpellEffectsByName("Sleep")) { awake = 0; }  
  
  if (awake) {
	  gamestate.setMode("player");
	  gamestate.setTurn(PC);
	  return 0;
	} else {
	  maintext.addText("Zzzz...");
	  this.endTurn(0);
	}
}


PCObject.prototype.getPCName = function() {
	return this.pcname;
}

PCObject.prototype.setPCName = function(newname) {
	this.pcname = newname;
	return this.pcname;
}

PCObject.prototype.getxp = function() {
  return this.xp;
}

PCObject.prototype.setxp = function(newxp) {
  newxp = parseInt(newxp);
  this.xp = newxp;
}

PCObject.prototype.addxp = function(diffxp) {
  diffxp = parseInt(diffxp);
  this.xp += diffxp;
  return this.xp;
}

PCObject.prototype.gettp = function() {
  return this.tp;
}

PCObject.prototype.settp = function(newtp) {
  newtp = parseInt(newtp);
  this.tp = newtp;
}

PCObject.prototype.addtp = function(difftp) {
  difftp = parseInt(difftp);
  this.tp += difftp;
  return this.tp;
}

PCObject.prototype.addSpell = function(lvl, spellid) {
  this.spells[lvl] = (this.spells[lvl] | spellid);
  return this.spells;
}

PCObject.prototype.knowsSpell = function(lvl, spellid) {
  if (this.spells[lvl] & spellid) { return 1; }
  return 0;
}

PCObject.prototype.getSpells = function() {
  return this.spells;
}

PCObject.prototype.getLastSpellLevel = function() {
  return this.lastspelllevel;
}

PCObject.prototype.setLastSpellLevel = function(newlvl) {
  this.lastspelllevel = parseInt(newlvl);
  if (this.lastspelllevel === 0) { this.lastspelllevel = 1; }
  return this.lastspelllevel;
}

PCObject.prototype.getLastSpell = function() {
  return this.lastspell;
}

PCObject.prototype.setLastSpell = function(newid) {
  this.lastspell = parseInt(newid);
  if (this.lastspell === 0) { this.lastspell = 1; }
  return this.lastspell;
}

PCObject.prototype.getInfusion = function() {
  return this.infuse;
}

PCObject.prototype.setInfusion = function(infuse) {
  this.infuse = parseInt(infuse);
  if (this.infuse !== 1) { this.infuse = 0; }
  return this.infuse;
}

PCObject.prototype.dealDamage = function(dmg, src) {
  
  var isasleep = this.getSpellEffectsByName("Sleep");
  if (isasleep) {
    isasleep.endEffect();
  }

  var oldhp = this.getDisplayHP();
  this.modHP(dmg*-1);
  var newhp = this.getDisplayHP();
  
  if (oldhp !== newhp) {
    DrawCharFrame();
    DamageFlash();
  }
  
  if (this.getHP() <= 0) { // killed!
    this.processDeath(1);
    return 0;
  }
  else { return 1; }
}






function PointOfInterest(xval,yval) {
  
  this.x = xval;
  this.y = yval;
  this.connections = [];
//  this.type = poitype;
  
}
PointOfInterest.prototype = new Object();

function NPCBrain() {
  this.currentPoI = {};
  this.currentDestination = {};
  this.turnsToRecalcPoI = 0;
  this.turnsToRecalcDest = 0;
  this.currentPath = [];
}
NPCBrain.prototype = new Object();

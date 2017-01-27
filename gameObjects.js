
"use strict";

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
  if (gamestate && (gamestate.getMode() !== "loadgame")) {
   	maxserial++;
	  this.serial = maxserial;
    DebugWrite("gameobj", "Serial #" + maxserial + " assigned to " + this.getName() + "<br />");
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

ProtoObject.prototype.copy = function(type) {
  if (type === "clean") {
    var tilename = this.name;
    return localFactory.createTile(tilename);
  }
  
  var savename = this.getName();
  DebugWrite("saveload", "<br /><span style='font-weight:bold'><br />Copying " + savename + ", serial " + this.getSerial() + ":</span><br />");
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
    DebugWrite("save " + idx + ":");
    if ((typeof val === "function") && (typeof base_version[idx] === "function")) { 
      DebugWrite("saveload", idx + " is a <span style='color:darkblue'>function, moving on</span>...  ");
      return;
      // both have a function. Assuming they're the same, not worth caring
    }
    if (typeof val === "function") {  // real one has a function base one does not
      alert("Function on " + copydata.name + ": " + idx);
    }
    if (typeof val !== "object") { 
      if (val != base_version[idx]) {
        copydata[idx] = val;
        DebugWrite("saveload", idx + " <span style='color:lime'>different, copying</span>... ");
      } else {
        DebugWrite("saveload", idx + " <span style='color:firebrick'>the same, moving on</span>...  ");
      }
    } else if ($.isArray(val)) {
      if ($.isArray(base_version[idx]) && arrayCompare(val, base_version[idx])) {
        DebugWrite("saveload", idx + " an array and <span style='color:firebrick'>the same, moving on</span>...  ");
      } else {
        copydata[idx] = val;
        if (debug && debugflags.saveload) { 
          DebugWrite("saveload", idx + " an array and <span style='color:lime'>different, copying</span>... <br /> [");
          DebugWrite("saveload", "] vs [");
          if ($.isArray(base_version[idx])) {
            for (var i = 0; i < base_version[idx].length; i++) { 
              DebugWrite("saveload", base_version[idx][i] + ", ");
            }
          } else {
            DebugWrite("saveload", "Not an array");
          }
          DebugWrite("saveload", "]. <br />");
        }
      }
    } else if (idx === "homeMap") {
      copydata.homeMap = val.getName();
      copydata.traceback.push("homeMap");
      DebugWrite("saveload", idx + " copied... ");
    } else if ((idx === "resists") || (idx === "specials")) {
      if ((typeof base_version[idx] === "object") && objectCompare(val, base_version[idx])) {
        DebugWrite("saveload", idx + " an object and the <span style='color:firebrick'>same, moving on</span>...  ");
      } else {
        copydata[idx] = val;
        DebugWrite("saveload", idx + " an object and <span style='color:lime'>different, copying</span>... ");
      }
    } else if ((idx === "currentDestination") || (idx === "lastLocation")) {
      copydata[idx] = val;
      DebugWrite("saveload", idx + " <span style='color:lime'>different, copying</span>... ");
    } else if ((idx === "currentPoI") || (idx === "losupclose")){
      DebugWrite("saveload", idx + " <span style='color:maroon'>deliberately not saved</span>... ");
    } else if (idx === "spawned") { 
      // for things with collections
      var spawnlist = val.getAll();
      var spawnserials = [];
      $.each(spawnlist, function(spaidx,spaval) {
        spawnserials.push(spaval.getSerial());
      });
      copydata[idx] = spawnserials;
      DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " <span style='color:lime'>saved as serials, serial# " + copydata[idx] + "</span>...</span>");
    } else if ((idx === "equippedTo") || (idx === "attachedTo") || (idx === "spawnedBy")) {
      if (val) {
        copydata[idx] = val.getSerial();
        DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " <span style='color:lime'>saved as serial, serial# " + copydata[idx] + "</span>...</span> ");
      } else {
        DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " is <span style='color:magenta'>empty, not saved</span>...</span> ");
      }
    } else if (idx === "equipment") {
      copydata[idx] = {};
      $.each(val, function(eqidx, eqval) {
        if (eqval) {
          DebugWrite("saveload", idx + ": " + eqidx + " being <span style='color:lightseagreen'>copied in a subthread</span>...<br /><nbsp /><nbsp />");
          var equipcopy = eqval.copy();
          copydata[idx][eqidx] = equipcopy[0].serial;
          copies.push(equipcopy[0]);   // using index rather than each here because equipment can't chain farther
          DebugWrite("saveload", "Copy made, " + eqidx + " added as <span style='color:lightseagreen'>serial to main object</span>... ");
        }
      });
    } else if (idx === "inventory") {
      var inv = val.getAll();
      copydata[idx] = [];
      $.each(inv, function(invidx, invval) {
        DebugWrite("saveload", idx + ": " + invidx + " being <span style='color:lightseagreen'>copied in a subthread</span>... <br /><nbsp /><nbsp />");
        var invcopy = invval.copy();
        copydata[idx][invidx] = invcopy[0].serial;
        copies.push(invcopy[0]);   // using index rather than each here as well for the same reason
        DebugWrite("saveload", "Copy made, " + invidx + " added as <span style='color:lightseagreen'>serial to main object</span>... ");
      });
    } else if (idx === "spellEffects") {
      var spells = val.getAll();
      if (spells[0]) {
        copydata[idx] = [];
        $.each(spells, function(spellidx, spellval) {
          DebugWrite("saveload", idx + ": " + spellidx + " being <span style='color:lightseagreen'>copied in a subthread</span>... <br /><nbsp /><nbsp />");
          var spellcopy = spellval.copy();
          copydata[idx].push(spellcopy[0].serial);
          copies.push(spellcopy[0]);  // probably should make this each as future proofing
          DebugWrite("saveload", "Copy made, " + spellidx + " added as <span style='color:lightseagreen'>serial to main object</span>... ");
        });
      }
    } else if (idx === "spellsknown") {
      if (objectCompare(val, base_version[idx])) {
//        if (debug && debugflags.saveload) { dbs.writeln("<span style='color:grey'>" + idx + " an object and the same, moving on...</span>  "); }
        DebugWrite("saveload", idx + " an object and the same, moving on...  ");
      } else {
        copydata[idx] = val;
//        dbs.writeln("<span style='color:purple'>" + idx + " different, saved.</span>");
        DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " different, saved.</span>");
      }
    } else if (idx === "runes") {
      if (objectCompare(val, base_version[idx])) {
//        if (debug && debugflags.saveload) { dbs.writeln("<span style='color:grey'>" + idx + " an object and the same, moving on...</span>  "); }
        DebugWrite("saveload", idx + " an object and the same, moving on...  ");
      } else {
        copydata[idx] = val;
//        dbs.writeln("<span style='color:purple'>" + idx + " different, saved.</span>");
        DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " different, saved.</span>");
      }
    } else if (idx === "runeCooldown") {
      if (objectCompare(val, base_version[idx])) {
//        if (debug && debugflags.saveload) { dbs.writeln("<span style='color:grey'>" + idx + " an object and the same, moving on...</span>  "); }
        DebugWrite("saveload", idx + " an object and the same, moving on...  ");
      } else {
        copydata[idx] = val;
//        dbs.writeln("<span style='color:purple'>" + idx + " different, saved.</span>");
        DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " different, saved.</span>");
      }      
    } else {
//      if (debug && debugflags.saveload) { dbs.writeln("<br /><span style='color:red'>" + idx + " is type " + typeof val + "</span>,  "); }
      DebugWrite("saveload", "<br /><span style='color:red;font-weight:bold'>" + idx + " is type " + typeof val + "</span>,  ");
      alert(savename + " SAVE NEEDS " + idx + "!");
    }
    // ADD HERE WHEN THERE ARE MORE
    
  });
  
//  if (debug && debugflags.saveload) { dbs.writeln("<br /><span style='font-weight:bold'>Copying " + copies.length + " objects.</span><br />  "); }
  DebugWrite("saveload", "<br /><span style='font-weight:bold'>Copying " + copies.length + " objects.</span><br />  ");
  return copies;
  
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

GameObject.prototype.getFullDesc = function() {
  var full = "";
  if (this.getPrefix()) {
    full = this.getPrefix() + " ";
  }
  
  full = full + this.getDesc();
  if (this.conversation) {
    var knowsflag = "knows_" + this.conversation;
    if (DU.gameflags.getFlag(knowsflag)) {
      full = this.npcname;
    }
  } 
  return full;
  
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
	retval["fin"] = 1;
	retval["canmove"] = 1;
	retval["msg"] = "";
  return(retval);
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
	if (this.overrideGraphic) { returnGraphic = this.overrideGraphic; }
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
	if ((typeof newLOS[1] !== "undefined") && (newLOS[1])) {
		this.losatdistance['distance'] = newLOS[1];
		this.losatdistance['blocklos'] = newLOS[2];
	}
	if ((typeof newLOS[3] !== "undefined") && (newLOS[3])) {
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

// Abstract class Pushable
function Pushable() {
  this.pushable = 1;
  
  this.pushMe = function(who) {
    var retval = {};
    retval["fin"] = 0;
    retval["input"] = "&gt;";
    if (IsAdjacent(this,who,"nodiag")) {
      retval["fin"] = 1;
      var diffx = this.getx() - who.getx();
      var diffy = this.gety() - who.gety();
      var objmap = who.getHomeMap();
      var pushto = objmap.getTile(this.getx()+diffx,this.gety()+diffy);
      if (pushto === "OoB") { return this.pullMe(); }
      var canmove = pushto.canMoveHere(MOVE_WALK);
      if (canmove["canmove"]) {
        objmap.moveThing(this.getx()+diffx,this.gety()+diffy,this);
        retval["txt"] = "Push: " + this.getDesc() + ".";
        if ("facing" in this) {
          var graphic = this.getOverlay();
          graphic = graphic.replace(/\d\.gif/,"");
          if (diffx > 0) { graphic = graphic + "1.gif"; }
          else if (diffx < 0) { graphic = graphic + "3.gif"; }
          else if (diffy > 0) { graphic = graphic + "2.gif"; }
          else if (diffy < 0) { graphic = graphic + "0.gif"; }
          this.setOverlay(graphic);
        }
        if ((typeof this.getLight === "function") && (this.getLight() !== 0)) {
          if (PC.getHomeMap() === objmap) {
            DrawMainFrame("draw",objmap.getName(),PC.getx(),PC.gety());
          }
        } else {
          if ((PC.getHomeMap() === objmap) && (GetDistance(PC.getx(),PC.gety(),this.getx(),this.gety(),"square") <= 6)) {
            DrawMainFrame("one",objmap.getName(),this.getx(),this.gety());
            DrawMainFrame("one",objmap.getName(),this.getx()-diffx,this.gety()-diffy);
          }
        }
      } else {
        retval = this.pullMe(who);
      }
    } else {
      retval["txt"] = "You can't push that from here.";
    }
    return retval;
  }
  this.pullMe = function(who) {
    var retval = {};
    retval["fin"] = 1;
    retval["input"] = "&gt;";
    var objmap = this.getHomeMap();
    var diffx = this.getx()-who.getx();
    var diffy = this.gety()-who.gety();
    objmap.moveThing(who.getx(),who.gety(),this);
    var moveval = who.moveMe(diffx,diffy);
    retval["txt"] = "Pull: " + this.getDesc() + ".";
    retval["canmove"] = moveval["canmove"];
    if ("facing" in this) {
      var graphic = this.getOverlay();
      graphic = graphic.replace(/\d\.gif/,"");
      if (diffx > 0) { graphic = graphic + "1.gif"; }
      else if (diffx < 0) { graphic = graphic + "3.gif"; }
      else if (diffy > 0) { graphic = graphic + "2.gif"; }
      else if (diffy < 0) { graphic = graphic + "0.gif"; }
      this.setOverlay(graphic);
    }

    if ((typeof this.getLight === "function") && (this.getLight() !== 0)) {
      if (PC.getHomeMap() === objmap) {
        DrawMainFrame("draw",objmap.getName(),PC.getx(),PC.gety());
      }
    } else {
      if ((PC.getHomeMap() === objmap) && (GetDistance(PC,this,"square") <= 6)) {
        DrawMainFrame("one",objmap.getName(),this.getx(),this.gety());
        DrawMainFrame("one",objmap.getName(),this.getx()-diffx,this.gety()-diffy);
      }
    }
     
    return retval;
  }
}

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
		if (lock > 2) { lock = 2; }
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
	
	this.setTrap = function(trap, challenge) { 
	  this.trapped = trap; 
	  var diff = Math.floor(Math.random()*5)+1 - 3;
	  this.trapchallenge = challenge + diff; 
	}
	this.tryTrap = function(who) { 
	  // if your Dex === the challenge rating for the trap, you have a 50/50 chance of opening it. Once your dex is twice the
	  // challenge you will always succeed. NOTE: Changed that to challenge+10.
	  var resp = 0;
//	  var chance = who.getDex() / (this.trapchallenge * 2);
    var chance = (who.getDex() - this.trapchallenge + 10) /20;
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
	  if (this.light !== 0) {
	    this.getHomeMap().removeMapLight(this.getSerial(), this.light, this.getx(), this.gety());
	  }
	  if (light !== 0) {
	    this.getHomeMap().setMapLight(this,light,this.getx(),this.gety());
	  }
	    
	  DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
		this.light = light;
	}
	this.getLight = function() {
	  if (parseFloat(this.light) === "NaN") { alert(this.getName() + " has lightlevel that is NaN."); }
		return parseFloat(this.light);
	}
}

// Abstract class
function Breakable(brokengraphicarray, startsbroken) {
  if (!startsbroken) { startsbroken = 0; }

  this.breakable = 1;
  
  this.getBroken = function() { return this.broken; }
  this.setBroken = function(broke) { this.broken = broke; return this.broken; }  // note, set broken doesn't change graphics, etc
  this.break = function(who) { 
    this.broken = 1; 
    this.setGraphicArray(brokengraphicarray);
    if (!this.fixeddesc) {
      this.fixeddesc = this.getDesc();
    }
    this.setDesc(this.brokendesc);
    //play sound effect
    DrawMainFrame("one", this.getHomeMap().getName(), this.getx(), this.gety());
    if (this.karmamod && (who === PC)) { 
      DU.gameflags.setFlag("karma", DU.gameflags.getFlag("karma")+this.karmamod);
    }
    var retval = {};
    retval["fin"] = 1;
    retval["txt"] =  "You break the " + this.getDesc() + "!";
    retval["input"] = "&gt;";
    return retval;
  }
  this.repair = function() {
    this.broken = 0;
    var tmpcopy = localFactory.createTile(this.getName());
    this.setGraphicArray(tmpcopy.getGraphicArray());
    if (this.getName() === "Mirror") {
      this.setGraphicArray([who.getGraphic(), "mirror-reflection.gif", "0", "7"]);
    }
    this.setDesc(this.fixeddesc);
    DrawMainFrame("one", this.getHomeMap().getName(), this.getx(), this.gety());  // will try to draw 0,0 if in inventory, which is ok
  }
  
}

// Abstract class 
function Openable(closedgraphic, opengraphic, startsopen, opensound, closesound, lockedsound) {
	this.open = startsopen;
	
	this.closedLOS = [];
	this.closedgraphic = closedgraphic;
	this.opengraphic = opengraphic;
	// NOTE: These should be arrays in the standard graphics[0-3] style.
	
	this.use = function(who, silentdoors) {
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
			if (!silentdoors && closesound && (GetDistance(PC.getx(),PC.gety(),this.getx(),this.gety()) < 10)) {
			  DUPlaySound(closesound); 
			}
			
			this.open = 0;
		} else {
			if (typeof this.getLocked == "function") {
				if (this.getLocked()) {
					retval["fin"] = 1;
					retval["txt"] = "Locked.";
					if (!silentdoors && lockedsound && (GetDistance(PC.getx(),PC.gety(),this.getx(),this.gety()) < 10)) {
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
			if (!silentdoors && opensound && (GetDistance(PC.getx(),PC.gety(),this.getx(),this.gety()) < 10)) {
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
  this.karmaPenalty = 0;
  
  this.setKarmaPenalty = function(kp) {
    this.karmaPenalty = parseInt(kp);
    return this.karmaPenalty;
  }
  
  this.getKarmaPenalty = function() {
    return this.karmaPenalty;
  }
  
  this.use = function(who, fire) {
    var retval = {}; 
    
    if (this.getKarmaPenalty() && (who === PC)) {
      DU.gameflags.setFlag("karma", DU.gameflags.getFlag("karma")-this.getKarmaPenalty);
    }
    
    if (this.getLootedID()) {
      if (DU.gameflags.getFlag("lid_" + this.getLootedID())) {
        this.setLootgroup("prev_looted");
      }
    }

    if (this.trapped && !fire) {
      var trapresult = this.tryTrap(who);
    }

    if ((typeof this.getLocked === "function") && !fire) {
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
        DU.gameflags.setFlag("lid_" + this.getLootedID(), 1);
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
    
    if (this.showsearched) {
      this.container = [];
      this.setGraphicArray(this.getSearchedGraphic());
    } else {
      this.getHomeMap().deleteThing(this);
    }
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

//Abstract class HasAmbientNoise
function HasAmbientNoise(ambientsound, radius) {
  this.ambientNoise = ambientsound;
  this.getAmbientNoise = function() { return this.ambientNoise; }
  this.ambientRadius = radius;
  this.getAmbientRadius = function() { return this.ambientRadius; }
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
		var tilename = this.getName();

  	var addtoname_cardinal = "";
	  if ((themap.getTile(x,y+1) !== "OoB") && ((themap.getTile(x,y+1).terrain.getName() !== tilename) && (themap.getTile(x,y+1).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x,y+1) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "n"; north = 1; vis = 1;}
	  if ((themap.getTile(x,y+1) !== "OoB") && ((themap.getTile(x,y+1).terrain.getName() !== tilename) && (themap.getTile(x,y+1).terrain.getName() !== "BlankBlack"))) { north = 1; }
  	if ((themap.getTile(x,y-1) !== "OoB") && ((themap.getTile(x,y-1).terrain.getName() !== tilename) && (themap.getTile(x,y-1).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x,y-1) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "s"; south = 1; vis = 1;}
  	if ((themap.getTile(x,y-1) !== "OoB") && ((themap.getTile(x,y-1).terrain.getName() !== tilename) && (themap.getTile(x,y-1).terrain.getName() !== "BlankBlack"))) { south = 1; }
	  if ((themap.getTile(x-1,y) !== "OoB") && ((themap.getTile(x-1,y).terrain.getName() !== tilename) && (themap.getTile(x-1,y).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "e"; east = 1; vis = 1;}
	  if ((themap.getTile(x-1,y) !== "OoB") && ((themap.getTile(x-1,y).terrain.getName() !== tilename) && (themap.getTile(x-1,y).terrain.getName() !== "BlankBlack"))) { east = 1; }
  	if ((themap.getTile(x+1,y) !== "OoB") && ((themap.getTile(x+1,y).terrain.getName() !== tilename) && (themap.getTile(x+1,y).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "w"; west = 1; vis = 1;}
  	if ((themap.getTile(x+1,y) !== "OoB") && ((themap.getTile(x+1,y).terrain.getName() !== tilename) && (themap.getTile(x+1,y).terrain.getName() !== "BlankBlack"))) { west = 1; }
		
	  var diagonal_dash = "";
	  var addtoname_diagonal = "";
	 	if ((themap.getTile(x+1,y-1) !== "OoB") && (themap.getTile(x+1,y-1).terrain.getName() !== tilename) && (themap.getTile(x+1,y-1).terrain.getName() !== "BlankBlack") && (south === 0) && (west === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y-1) < LOS_THRESHOLD) ))
	 	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "a"; vis = 1; }
  	if ((themap.getTile(x+1,y+1) !== "OoB") && (themap.getTile(x+1,y+1).terrain.getName() !== tilename) && (themap.getTile(x+1,y+1).terrain.getName() !== "BlankBlack") && (north === 0) && (west === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y+1) < LOS_THRESHOLD) )) 
  	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "b"; vis = 1; }
	  if ((themap.getTile(x-1,y+1) !== "OoB") && (themap.getTile(x-1,y+1).terrain.getName() !== tilename) && (themap.getTile(x-1,y+1).terrain.getName() !== "BlankBlack") && (north === 0) && (east === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y+1) < LOS_THRESHOLD) ))
	    { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "c"; vis = 1;}
	 	if ((themap.getTile(x-1,y-1) !== "OoB") && (themap.getTile(x-1,y-1).terrain.getName() !== tilename) && (themap.getTile(x-1,y-1).terrain.getName() !== "BlankBlack") && (south === 0) && (east === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y-1) < LOS_THRESHOLD) )) 
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
    	if ((tile.getName() === "Ocean") || (tile.getName() === "ShadowOcean")) { ocean = tile; }
    	if ((tile.getName() === "Water") || (tile.getName() === "ShadowWater")) { water = tile; }
    	if ((tile.getName() === "Shallows") || (tile.getName() === "ShadowShallows")) { shallow = tile; }
    }
    localacre = themap.getTile(x,y+1);
    if (localacre !== "OoB") {
    	tile = localacre.terrain;
    	if ((tile.getName() === "Ocean") || (tile.getName() === "ShadowOcean")) { ocean = tile; }
    	if ((tile.getName() === "Water") || (tile.getName() === "ShadowWater")) { water = tile; }
    	if ((tile.getName() === "Shallows") || (tile.getName() === "ShadowShallows")) { shallow = tile;; }
    }
    localacre = themap.getTile(x+1,y);
    if (localacre !== "OoB") {
    	tile = localacre.terrain;
    	if ((tile.getName() === "Ocean") || (tile.getName() === "ShadowOcean")) { ocean = tile; }
    	if ((tile.getName() === "Water") || (tile.getName() === "ShadowWater")) { water = tile; }
    	if ((tile.getName() === "Shallows") || (tile.getName() === "ShadowShallows")) { shallow = tile; }
    }
    localacre = themap.getTile(x-1,y);
    if (localacre !== "OoB") {
    	tile = localacre.terrain;
    	if ((tile.getName() === "Ocean") || (tile.getName() === "ShadowOcean")) { ocean = tile; }
    	if ((tile.getName() === "Water") || (tile.getName() === "ShadowWater")) { water = tile; }
    	if ((tile.getName() === "Shallows") || (tile.getName() === "ShadowShallows")) { shallow = tile; }
    }
    var chosentile;
    if (shallow) { chosentile = shallow; }
    else if (water) { chosentile = water; }
    else if (ocean) { chosentile = ocean; }
    // kludge fix for clear lagoon
    else if (themap.getName() === "clearlake") { 
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
		var northtile = northacre.terrain;
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
  this.pathweight = 0; // additive
  this.walkonscript = "";
  this.usescript = "";
  this.peerview = "";
  this.walkSound = "";
  
  this.addType("InanimateObject");
}

InanimateObject.prototype = new GameObject();

InanimateObject.prototype.getWalkOnScript = function() {
	return this.walkonscript;
}

InanimateObject.prototype.setWalkOnScript = function(newscript) {
	this.walkonscript = newscript;
}

InanimateObject.prototype.getWalkSound = function() {
	return this.walkSound;
}

InanimateObject.prototype.setWalkSound = function(newsound) {
	this.walkSound = newsound;
}

InanimateObject.prototype.getUseScript = function() {
	return this.usescript;
}

InanimateObject.prototype.setUseScript = function(newscript) {
	this.usescript = newscript;
}

InanimateObject.prototype.getPeerview = function() {
	return this.peerview;
}

InanimateObject.prototype.setPeerview = function(newview) {
	this.peerview = newview;
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

InanimateObject.prototype.getPathWeight = function() {
	return this.pathweight;
}

InanimateObject.prototype.setPathWeight = function(neww) {
	this.pathweight = neww;
	return this.pathweight;
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
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-288";
  this.desc = "";
  this.blocklos = 1;
  this.passable = MOVE_ETHEREAL;
  this.peerview = "white";
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
  this.peerview = "#0000e0";
  this.walkSound = "water";
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
  this.peerview = "#4040fc";
  this.walkSound = "water";
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
  this.peerview = "#8080fc";
  this.walkSound = "water";
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

function ShadowOceanTile() {
  this.name = "ShadowOcean";
  this.graphic = "flow_ethereal.gif";
  this.desc = "deep water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL;
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
  this.peerview = "#172915";
  this.walkSound = "water";
}
ShadowOceanTile.prototype = new TerrainObject();

function ShadowWaterTile() {
  this.name = "ShadowWater";
  this.graphic = "flow_ethereal.gif";
  this.desc = "water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
  this.peerview = "#273425";
  this.walkSound = "water";
}
ShadowWaterTile.prototype = new TerrainObject();

ShadowWaterTile.prototype.walkon = function(walker) {
  var resp = InWater(walker);
  return resp;
}

ShadowWaterTile.prototype.idle = function(walker) {
  var resp = InWater(walker);
  return resp;
}

function ShadowShallowsTile() {
  this.name = "ShadowShallows";
  this.graphic = "flow_ethereal.gif";
  this.desc = "shallow water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.combatmap = "Water";
  this.peerview = "#809d7d";
  this.walkSound = "water";
}
ShadowShallowsTile.prototype = new TerrainObject();

ShadowShallowsTile.prototype.walkon = function(walker) {
  var resp = InWater(walker);
  return resp;
}

ShadowShallowsTile.prototype.idle = function(walker) {
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
  if (MOVE_FLY & who.getMovetype()) {
    // entity is flying and can't drown
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

function NoBlockMountainTile() {
  this.name = "NoBlockMountain";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.desc = "mountains";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
NoBlockMountainTile.prototype = new TerrainObject();

function MountainTile() {
  this.name = "Mountain";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainTile.prototype = new TerrainObject();

function MountainPassTile() {
  this.name = "MountainPass";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_WALK;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainPassTile.prototype = new TerrainObject();

function FlameMountainTile() {
  this.name = "FlameMountain";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-288";
  this.desc = "fiery mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#e42217";
  this.walkSound = "hill";
}
FlameMountainTile.prototype = new TerrainObject();

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
  this.peerview = "#ffffff";
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
  this.peerview = "#606060";
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
  this.peerview = "#606060";
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
  this.peerview = "#602000";
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
  this.peerview = "#602000";
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
  this.peerview = "#707070";
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
  this.peerview = "#707070";
}
PurplePillarTile.prototype = new TerrainObject();

function FancyFloorTile() {
  this.name = "FancyFloor";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-288";
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "floor";
  this.peerview = "#600060";
  this.walkSound = "stone";
}
FancyFloorTile.prototype = new TerrainObject();

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
  this.peerview = "black";
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
  this.peerview = "black";
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
  this.peerview = "black";
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
  this.peerview = "black";
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
  this.peerview = "black";
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
  this.peerview = "black";
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
  this.peerview = "white";
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
  this.peerview = "white";
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
  this.peerview = "white";
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
  this.peerview = "white";
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
  this.peerview = "white";
}
RuinsWallTile.prototype = new TerrainObject();

function IllusionaryRuinsWallTile() {
  this.name = "IllusionaryRuinsWall";
//  this.graphic = "056.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-256";
  this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#600060";
}
IllusionaryRuinsWallTile.prototype = new TerrainObject();

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
  this.peerview = "white";
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
  this.peerview = "white";
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
  this.peerview = "white";
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
  this.peerview = "white";
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
  this.peerview = "white";
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
  this.peerview = "white";
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
  this.peerview = "white";
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
  this.peerview = "white";
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
  this.peerview = "black";
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
  this.peerview = "black";
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
  this.peerview = "black";
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
  this.peerview = "#602000";
  this.walkSound = "stone";
}
PlanksNSTile.prototype = new TerrainObject();

function ShadowPlanksNSTile() {
  this.name = "ShadowPlanksNS";
//  this.graphic = "069.gif";
  this.graphic = "terrain_ether.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#1c6000";
  this.walkSound = "stone";
}
ShadowPlanksNSTile.prototype = new TerrainObject();

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
  this.peerview = "#00c000";
  this.walkSound = "grass";
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
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
NorthCoastTile.prototype = new TerrainObject();

function NorthCoastSandTile() {
  this.name = "NorthCoastSand";
//  this.graphic = "074.gif";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-288";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
NorthCoastSandTile.prototype = new TerrainObject();

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
  this.peerview = "#00c000";
  this.walkSound = "grass";
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
  this.peerview = "#00c000";
  this.walkSound = "grass";
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
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastTile.prototype = new TerrainObject();

function NortheastCoastSandTile() {
  this.name = "NortheastCoastSand";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "necoast-sand.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastSandTile.prototype = new TerrainObject();

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
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
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
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastTile.prototype = new TerrainObject();

function NorthwestCoastSandTile() {
  this.name = "NorthwestCoastSand";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "nwcoast-sand.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastSandTile.prototype = new TerrainObject();

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
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastTile.prototype = new TerrainObject();

function ShadowSouthCoastTile() {
  this.name = "ShadowSouthCoast";
//  this.graphic = "073.gif";
  this.graphic = "terrain_ether.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
}
ShadowSouthCoastTile.prototype = new TerrainObject();

function ShadowNorthCoastTile() {
  this.name = "ShadowNorthCoast";
//  this.graphic = "074.gif";
  this.graphic = "terrain_ether.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
}
ShadowNorthCoastTile.prototype = new TerrainObject();

function ShadowEastCoastTile() {
  this.name = "ShadowEastCoast";
//  this.graphic = "075.gif";
  this.graphic = "terrain_ether.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
}
ShadowEastCoastTile.prototype = new TerrainObject();

function ShadowWestCoastTile() {
  this.name = "ShadowWestCoast";
//  this.graphic = "076.gif";
  this.graphic = "terrain_ether.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
}
ShadowWestCoastTile.prototype = new TerrainObject();

function ShadowNortheastCoastTile() {
  this.name = "ShadowNortheastCoast";
  this.graphic = "flow_ethereal.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "necoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
ShadowNortheastCoastTile.prototype = new TerrainObject();

function ShadowSouthwestCoastTile() {
  this.name = "ShadowSouthwestCoast";
  this.graphic = "flow_ethereal.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "swcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
ShadowSouthwestCoastTile.prototype = new TerrainObject();

function ShadowNorthwestCoastTile() {
  this.name = "ShadowNorthwestCoast";
  this.graphic = "flow_ethereal.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "nwcoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
ShadowNorthwestCoastTile.prototype = new TerrainObject();

function ShadowSoutheastCoastTile() {
  this.name = "ShadowSoutheastCoast";
  this.graphic = "flow_ethereal.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.overlay = "secoast.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
ShadowSoutheastCoastTile.prototype = new TerrainObject();


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
  this.peerview = "#8080fc";
  this.walkSound = "water";
  
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
  this.peerview = "#800000";
  this.walkSound = "stone";
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
  this.peerview = "#345de1";
  this.walkSound = "stone";
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
  this.peerview = "#602000";
  this.walkSound = "stone";
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
  this.peerview = "#00c000";
  this.walkSound = "grass";
  this.combatmap = "Grass"; 
}
GrassTile.prototype = new TerrainObject();

function ShadowGrassTile() {
  this.name = "ShadowGrass";
//  this.graphic = "121.gif";
  this.graphic = "terrain_ether.gif";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
  this.combatmap = "Grass"; 
}
ShadowGrassTile.prototype = new TerrainObject();

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
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
DirtTile.prototype = new TerrainObject();

function ShadowDirtTile() {
  this.name = "ShadowDirt";
//  this.graphic = "dirt-ground.gif";
  this.graphic = "terrain_ether.gif";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#60003c";
  this.walkSound = "grass";
}
ShadowDirtTile.prototype = new TerrainObject();


function RoadTile() {
  this.name = "Road";
  this.graphic = "road-ew.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dirt road";
  this.combatmap = "Grass";
  this.peerview = "#7a3a1a";
  
  this.initdelay = 0.8;
  this.pathweight = -.2;
  this.walkSound = "grass";
  
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
  this.pathweight = .1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
BrushTile.prototype = new TerrainObject();

function ShadowBrushTile() {
  this.name = "ShadowBrush";
//  this.graphic = "122.gif";
  this.graphic = "terrain_ether.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = .1;
  this.combatmap = "Brush";
  this.peerview = "#005080";
  this.walkSound = "grass";
}
ShadowBrushTile.prototype = new TerrainObject();

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
  this.pathweight = .1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
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
  this.pathweight = .1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
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
  this.pathweight = .1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
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
  this.pathweight = .1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
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
  this.pathweight = .3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
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
  this.pathweight = .3;
  this.peerview = "#004000";
  this.walkSound = "forest";
}
GroveTile.prototype = new TerrainObject();

function ShadowGroveTile() {
	this.name = "ShadowGrove";
//  this.graphic = "123.gif";
  this.graphic = "terrain_ether.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .5;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "trees";
  this.initdelay = 1.3;
  this.pathweight = .3;
  this.peerview = "#002840";
  this.walkSound = "forest";
}
ShadowGroveTile.prototype = new TerrainObject();
	
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
  this.pathweight = .3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
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
  this.pathweight = .3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
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
  this.pathweight = .3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
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
  this.pathweight = .3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
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
  this.pathweight = .5;
  this.combatmap = "Hill";
  this.peerview = "#49473a";
  this.walkSound = "hill";
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
  this.peerview = "#600060";
  this.walkSound = "stone";
}
PurpleCobblestoneTile.prototype = new TerrainObject();

function ShadowPurpleCobblestoneTile() {
  this.name = "ShadowPurpleCobblestone";
//  this.graphic = "125.gif";
  this.graphic = "terrain_ether.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestone";
  this.peerview = "#602300";
  this.walkSound = "stone";
}
ShadowPurpleCobblestoneTile.prototype = new TerrainObject();

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
  this.pathweight = 1;
  this.combatmap = "Swamp";
  this.peerview = "#004000";
  this.walkSound = "swamp";
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

function ShadowSwampTile() {
  this.name = "ShadowSwamp";
//  this.graphic = "141.gif";
  this.graphic = "terrain_ether.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "swamp";
  this.initdelay = 1.2;
  this.pathweight = 1;
  this.combatmap = "Swamp";
  this.peerview = "#002840";
  this.walkSound = "swamp";
}
ShadowSwampTile.prototype = new TerrainObject();

ShadowSwampTile.prototype.walkon = function(person) {
  var resp = InASwamp(person);
  return resp;
}
ShadowSwampTile.prototype.idle = function(person) {
  var resp = InASwamp(person);
  return resp;
}

function InASwamp(who) {
  if (MOVE_LEVITATE & who.getMovetype()) {
    // entity is levitating and cannot be diseased
    return "";
  }
  if (MOVE_FLY & who.getMovetype()) {
    // entity flies and cannot be diseased
    return "";
  }
  
  if (who.group) {
    // entity is an NPC group, immune to disease
    return "";
  }
  
  // percent chance of infection- 10% per step, prorated by speed
  var chance = 10 * (DUTime.getGameClock() - who.getLastTurnTime());  
  if (Dice.roll("1d100") < chance) {  // diseased!
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
  this.peerview = "#474747";
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
  this.peerview = "#474747";
}
ShinglesTopTile.prototype = new TerrainObject();

function CaveFloorTile() {
	this.name = "CaveFloor";
	this.graphic = "cavefloor.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "cave floor";
	this.peerview = "#6c6c6c";
	this.walkSound = "stone";
	
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
	this.peerview = "black";
	
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
	this.peerview = "#675151";
	this.walkSound = "stone";
}
HexFloorTile.prototype = new TerrainObject();

function HexTransparentFloorTile() {
	this.name = "HexTransparentFloor";
  this.graphic = "hex-transparent.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#675151";
	this.walkSound = "stone";
}
HexTransparentFloorTile.prototype = new TerrainObject();

function GoldOutlineFloorTile() {
	this.name = "GoldOutlineFloor";
  this.graphic = "terrain_tiles.gif";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-224";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#9b8727";
	this.walkSound = "stone";
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
	this.peerview = "#868585";
	this.walkSound = "stone";
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
	this.peerview = "#5050ff";
	this.walkSound = "stone";
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
	this.peerview = "#b650ff";
	this.walkSound = "stone";
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
	this.peerview = "#ff5c50";
	this.walkSound = "stone";
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
	this.peerview = "#50ff61";
	this.walkSound = "stone";
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
	this.peerview = "#cf790b";
	this.walkSound = "stone";
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
  this.peerview = "white";
}
BannerTile.prototype = new TerrainObject();

function LavaTubeTile() {
	this.name = "LavaTube";
  this.graphic = "lavatubes.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "lava tube";
	this.peerview = "#853e3e";
	this.walkSound = "stone";
	
	HasAmbientNoise.call(this,"sfx_lava_bubble",1.5);
}
LavaTubeTile.prototype = new TerrainObject();

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
  this.searchDelete = 0;
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
  if (!searchable) {
    delete this.searchYield;
  } else if ($.isArray(searchable)) {
    this.searchYield = searchable;
  }
}

FeatureObject.prototype.addToSearchYield = function(searchable) {
  if (!this.searchYield.length) {
    this.searchYield = [];
  }
  this.searchYield.push(searchable);
}

FeatureObject.prototype.getSearchDelete = function() {
  return this.searchDelete;
}

FeatureObject.prototype.setSearchDelete = function(sd) {
  this.searchDelete = sd;
  return this.searchDelete;
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

FeatureObject.prototype.getSearchDesc = function() {
  return this.searchDesc;
}

FeatureObject.prototype.getSearchPrefix = function() {
  return this.searchPrefix;
}

FeatureObject.prototype.getLootgroup = function() {
  return this.lootgroup;
}

FeatureObject.prototype.setLootgroup = function(lg) {
  this.lootgroup = lg;
  return this.lootgroup;
}

FeatureObject.prototype.getLootedID = function() {
  return this.lootedid;
}

FeatureObject.prototype.setLootedID = function(lid) {
  this.lootedid = lid;
  return this.lootedid;
}

// end definitions, begin features

function LavaTile() {
  this.name = "Lava";
  this.graphic = "flowing_animations.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK + MOVE_SWIM;
  this.blocklos = 0;
  this.desc = "lava";
  this.initdelay = 1.2;
  this.pathweight = 3;
  this.spritexoffset = "-224";
  this.spriteyoffset = "0";
  
  LightEmitting.call(this, 1);
  this.peerview = "#fc2000";
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
  this.peerview = "white";
  
  LightEmitting.call(this, 1);
}
CoralTile.prototype = new FeatureObject();

function WaterRockTile() {
  this.name = "WaterRock";
  this.graphic = "flowing_animations.gif";
  this.overlay = "rock-floating.gif";
  this.spritexoffset = "-192";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "rock";
  
//  SetByBelow.call(this);
}
WaterRockTile.prototype = new FeatureObject();

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
  this.peerview = "#e0e0e0";
  this.civilized = 1;

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
  this.peerview = "#e0e0e0";
  this.civilized = 1;

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
  this.peerview = "#e0e0e0";

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
  this.peerview = "#e0e0e0";

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
  this.peerview = "#e0e0e0";

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
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);
}
VillageTile.prototype = new FeatureObject();

function CastleTile() {
  this.name = "Castle";
  this.graphic = "155.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

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
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
LeftCastleTile.prototype = new FeatureObject();

function RightCastleTile() {
  this.name = "RightCastle";
  this.graphic = "006.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
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
  this.peerview = "#9d9d9d";

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
  this.peerview = "#9d9d9d";

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
  this.peerview = "#e0e0e0";

  Enterable.call(this, "null", 0, 0);
}
RuinsTile.prototype = new FeatureObject();

function ChestTile() {
  Lockable.call(this, "008.gif", "008.gif", "008.gif", 	"a",  "chest", "a", "locked chest", "a", "magically locked chest");
	this.name = "Chest";
	this.graphic = "008.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_WALK + MOVE_LEVITATE;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "chest";
	
	this.lootgroup = "";
	this.lootedid = "";
	
	this.container = [];
	OpenContainer.call(this);
	Pushable.call(this);
	this.flammable = 20;
}
ChestTile.prototype = new FeatureObject();

ChestTile.prototype.flamed = function() {
  ContainerOnFire(what);
}

function DoorWindowTile() {
  Lockable.call(this, "009.gif", "010.gif", "067.gif", "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "DoorWindow";
	this.graphic = "009.gif";
	this.overlay = "009.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
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
	this.heavy = 1;

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
	this.heavy = 1;

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
	
	Pushable.call(this);
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
//	this.graphic = "flowing_animations.gif";
  this.graphic = "fields.gif";
	this.passable = 0; // impassable - wonky outdoors, but necessary indoors
	this.blocklos = 0;
	this.blockloe = 1;
//	this.light = 1;
  this.prefix = "an"; 
	this.desc = "energy field";
  this.spritexoffset = "-32";
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "campfire";
	this.pathweight = 3;
	this.firedamage = "2d4";
	
	LightEmitting.call(this, 2);
	HasAmbientNoise.call(this,"sfx_fire_crackle",1.5);
}
CampfireTile.prototype = new FeatureObject();

CampfireTile.prototype.activate = function() {
  if (!gamestate.getMode("loadgame")) {
    var NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  }
  return;
}

CampfireTile.prototype.walkon = function(person) {
  var resp = OnFire(person, this);
  return resp;
}
CampfireTile.prototype.idle = function(person) {
  var resp = OnFire(person, this);
  return resp;
}

CampfireTile.prototype.myTurn = function() {
  var mytile = this.getHomeMap().getTile(this.getx(),this.gety());
  var feas = mytile.getFeatures();
  $.each(feas, function(idx,val) {
    if (val.flammable) {
      if (Dice.roll("1d100") <= val.flammable) {
        val.flamed();
      }
    }
  });

  var NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
  return 1;  
}

function OnFire(who, what) {
  var dmg = Dice.roll(what.firedamage);
  dmg = (1/SCALE_TIME)*(DUTime.getGameClock() - who.getLastTurnTime()) * dmg;
  var response = "The " + what.getDesc() + " burns you!";
  who.dealDamage(dmg, what, "fire");
  
  return response;
}


function BrazierTile() {
	this.name = "Brazier";
	this.graphic = "brazier.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "brazier";
	
	LightEmitting.call(this, 2);  
}
BrazierTile.prototype = new FeatureObject();

BrazierTile.prototype.use = function(who) {
  var retval = {};
  retval["fin"] = 1;
  if (!this.alwayslit) {
    var map = this.getHomeMap();
    var unlit = localFactory.createTile("UnlitBrazier");
    var x = this.getx();
    var y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,unlit);
    DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
    
    retval["txt"] = "You extinguish the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to go out.";
  }
  
  return retval;
}

function UnlitBrazierTile() {
	this.name = "UnlitBrazier";
	this.graphic = "features.png";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-64";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "an";
	this.desc = "unlit brazier";
}
UnlitBrazierTile.prototype = new FeatureObject();

UnlitBrazierTile.prototype.use = function(who) {
  var retval = {};
  retval["fin"] = 1;
  if (!this.alwaysout) {
    var map = this.getHomeMap();
    var lit = localFactory.createTile("Brazier");
    var x = this.getx();
    var y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,lit);
    DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
    
    retval["txt"] = "You light the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to light.";
  }
  
  return retval;
}

function WEBrazierTile() {
	this.name = "WEBrazier";
	this.graphic = "brazier.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "brazier";
	
	LightEmitting.call(this, 2);  
}
WEBrazierTile.prototype = new FeatureObject();

WEBrazierTile.prototype.use = function(who) {
  var retval = {};
  retval["fin"] = 1;
  if (!this.alwayslit) {
    var map = this.getHomeMap();
    var unlit = localFactory.createTile("UnlitWEBrazier");
    var x = this.getx();
    var y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,unlit);
    DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
    
    retval["txt"] = "You extinguish the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to go out.";
  }
  
  CheckWEEntrance(this.getHomeMap());
  return retval;
}

function UnlitWEBrazierTile() {
	this.name = "UnlitWEBrazier";
	this.graphic = "features.png";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-64";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "an";
	this.desc = "unlit brazier";
}
UnlitWEBrazierTile.prototype = new FeatureObject();

UnlitWEBrazierTile.prototype.use = function(who) {
  var retval = {};
  retval["fin"] = 1;
  if (!this.alwaysout) {
    var map = this.getHomeMap();
    var lit = localFactory.createTile("WEBrazier");
    var x = this.getx();
    var y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,lit);
    DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
    
    retval["txt"] = "You light the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to light.";
  }
  
  CheckWEEntrance(this.getHomeMap());
  return retval;
}

function CheckWEEntrance(themap) {
  var ne_brazier = themap.getTile(11,43).getTopFeature();
  var nw_brazier = themap.getTile(7,43).getTopFeature();
  var se_brazier = themap.getTile(11,47).getTopFeature();
  var sw_brazier = themap.getTile(7,47).getTopFeature();
  
  var barrier = themap.getTile(12,45).getTopFeature();
  
  var set_barrier = 1;
  
  if ((ne_brazier.getName() === "UnlitWEBrazier") && (nw_brazier.getName() === "WEBrazier") && (se_brazier.getName() === "UnlitWEBrazier") && (sw_brazier.getName() === "WEBrazier")) {
    set_barrier = 0;
  }
  
  if (set_barrier && (!barrier || (barrier.getName() !== "IllusionaryEnergyField"))) {
    barrier = localFactory.createTile("IllusionaryEnergyField");
    themap.placeThing(12,45,barrier);
  } else if (!set_barrier && (barrier.getName() === "IllusionaryEnergyField")) {
    themap.deleteThing(barrier);
  }
  
  return;
}

function IllusionaryEnergyFieldTile() {
	this.name = "IllusionaryEnergyField";
  this.graphic = "fields.gif";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 2;
	this.blockloe = 2;
//	this.light = 1;
  this.prefix = "a"; 
	this.desc = "wall";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
	
  this.invisible = 1;
}
IllusionaryEnergyFieldTile.prototype = new FeatureObject();

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
	this.passable = MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 2;
  this.prefix = "a";
	this.desc = "fireplace";
	this.peerview = "white";
	this.pathweight = 3;
	this.firedamage = "3d4";
	
	LightEmitting.call(this, 2);
	HasAmbientNoise.call(this,"sfx_fire_crackle",1.5);
}
FireplaceTile.prototype = new FeatureObject();

FireplaceTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    var NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
    DebugWrite("gameobj", "Adding fireplace to the timeline.");
  }
  return;
}

FireplaceTile.prototype.walkon = function(person) {
  var resp = OnFire(person, this);
  return resp;
}
FireplaceTile.prototype.idle = function(person) {
  var resp = OnFire(person, this);
  return resp;
}

FireplaceTile.prototype.myTurn = function() {
  var mytile = this.getHomeMap().getTile(this.getx(),this.gety());
  var feas = mytile.getFeatures();
  $.each(feas, function(idx,val) {
    if (val.flammable) {
      if (Dice.roll("1d100") <= val.flammable) {
        val.flamed();
      }
    }
  });

  var NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
  return 1;  
}

function DustyFireplaceTile() {
	this.name = "DustyFireplace";
	this.graphic = "furniture.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-96";
	this.passable = MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 2;
  this.prefix = "a";
	this.desc = "dusty fireplace";
	this.peerview = "white";
}
DustyFireplaceTile.prototype = new FeatureObject();

function AltarTile() {
	this.name = "Altar";
	this.graphic = "023.gif";
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "altar";
	this.peerview = "white";
}
AltarTile.prototype = new FeatureObject();

function ThroneTile() {
	this.name = "Throne";
	this.graphic = "furniture.gif";
	this.spritexoffset = "-224";
	this.spriteyoffset = "-96";
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "the";
	this.desc = "throne";
}
ThroneTile.prototype = new FeatureObject();

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

TalkingDoorTile.prototype.getNPCName = function() {
	return "The front door";
}

TalkingDoorTile.prototype.activate = function(timeoverride) {
//  this.use_old = this.use;
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
	this.graphic = "fields.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 1;
  this.prefix = "a";
	this.desc = "sleep field";
	this.initdelay = 1.5;
	this.pathweight = 3;
  this.spritexoffset = "-96";
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
    
    var duration = (Dice.roll("2d3") - who.getInt()/20) * SCALE_TIME;
    fieldeffect.setExpiresTime(duration + DUTime.getGameClock());
    who.addSpellEffect(fieldeffect);
    
    DrawCharFrame();

  }
  return "";
}

function FireFieldTile() {
	this.name = "FireField";
	this.graphic = "fields.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 3;
  this.prefix = "a";
	this.desc = "fire field";
	this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.expires = 0;
	
	LightEmitting.call(this, 3);
	this.initdelay = 1.5;
	this.pathweight = 3;
	
	HasAmbientNoise.call(this,"sfx_fire_crackle",1.5);
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

FireFieldTile.prototype.activate = function() {
  if (!gamestate.getMode("loadgame")) {
    var NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  }

  return;
}

FireFieldTile.prototype.myTurn = function() {
  if (!maps.getMap(this.getHomeMap().getName())) {
    // removing from timeline, its map is gone
//    var nextEntity = DUTime.executeNextEvent().getEntity();
//    nextEntity.myTurn();

    if (!DebugWrite("gameobj", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " removed from game- map gone.</span><br />")) {
      DebugWrite("magic", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " removed from game- map gone.</span><br />");
    }
  
    return 1;
  }
 
  if (this.expiresTime && (this.expiresTime > DUTime.getGameClock())) {
//    if (debug && (debugflags.gameobj || debugflags.magic)) { dbs.writeln("<span style='color:green;font-weight:bold'>Firefield " + this.getSerial() + " expired, removing itself.</span><br />"); }
        if (!DebugWrite("magic", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " expired, removing itself.</span><br />")) {
      DebugWrite("gameobj", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " expired, removing itself.</span><br />");
    }
    this.getHomeMap().deleteThing(this);
    
    return 1;
  }
  
  var mytile = this.getHomeMap().getTile(this.getx(),this.gety());
  var feas = mytile.getFeatures();
  $.each(feas, function(idx,val) {
    if (val.flammable) {
      if (Dice.roll("1d100") <= val.flammable) {
        val.flamed();
      }
    }
  });

  var NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
//  var nextEntity = DUTime.executeNextEvent().getEntity();
  //setTimeout(function(){ nextEntity.myTurn(); }, 1);
//  nextEntity.myTurn();
  return 1;
}
function InAFireField(who) {
  var dmg = Dice.roll("2d6+3");
  dmg = (1/SCALE_TIME)*(DUTime.getGameClock() - who.getLastTurnTime()) * dmg;
  var response = "The fire field burns you!";
  var resist = who.getResist("magic");
  resist = 1-(resist/100);
  dmg = dmg*resist;
  who.dealDamage(dmg, this, "fire");
  
  return response;
}

function PoisonFieldTile() {
	this.name = "PoisonField";
	this.graphic = "fields.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
//	this.light = 1;
  this.prefix = "a";
	this.desc = "poison field";
	this.initdelay = 1.5;
	this.pathweight = 3;
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
    
    var duration = (20+Dice.roll("2d10") + who.getInt() - 15) * SCALE_TIME;
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
  this.graphic = "features.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ladder";
  this.peerview = "#808080";

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
LadderDownTile.prototype = new FeatureObject();

function LadderUpTile() {
  this.name = "LadderUp";
  this.graphic = "features.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ladder";
  this.peerview = "#808080";

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
LadderUpTile.prototype = new FeatureObject();

function StairDownTile() {
  this.name = "StairDown";
  this.graphic = "features.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
StairDownTile.prototype = new FeatureObject();

function StairUpTile() {
  this.name = "StairUp";
  this.graphic = "features.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
StairUpTile.prototype = new FeatureObject();

function StairDown2Tile() {
  this.name = "StairDown2";
  this.graphic = "features.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
StairDown2Tile.prototype = new FeatureObject();

function StairUp2Tile() {
  this.name = "StairUp2";
  this.graphic = "features.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
StairUp2Tile.prototype = new FeatureObject();

function SingleSignpostTile() {
  this.name = "SingleSignpost";
  this.graphic = "features.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SingleSignpostTile.prototype = new FeatureObject();

function SignpostLeftTile() {
  this.name = "SignpostLeft";
  this.graphic = "features.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SignpostLeftTile.prototype = new FeatureObject();

function SignpostRightTile() {
  this.name = "SignpostRight";
  this.graphic = "features.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SignpostRightTile.prototype = new FeatureObject();

function SingleSignpost2Tile() {
  this.name = "SingleSignpost2";
  this.graphic = "features.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SingleSignpost2Tile.prototype = new FeatureObject();

function SignpostLeft2Tile() {
  this.name = "SignpostLeft2";
  this.graphic = "features.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SignpostLeft2Tile.prototype = new FeatureObject();

function SignpostRight2Tile() {
  this.name = "SignpostRight2";
  this.graphic = "features.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SignpostRight2Tile.prototype = new FeatureObject();

function InnSignTile() {
  this.name = "InnSign";
  this.graphic = "features.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "inn";
  this.peerview = "#541909";
}
InnSignTile.prototype = new FeatureObject();

function TavernSignTile() {
  this.name = "TavernSign";
  this.graphic = "features.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tavern";
  this.peerview = "#541909";
}
TavernSignTile.prototype = new FeatureObject();

function ArmourySignTile() {
  this.name = "ArmourySign";
  this.graphic = "features.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "armoury";
  this.peerview = "#541909";
}
ArmourySignTile.prototype = new FeatureObject();

function GrocerSignTile() {
  this.name = "GrocerSign";
  this.graphic = "features.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grocer";
  this.peerview = "#541909";
}
GrocerSignTile.prototype = new FeatureObject();

function GrocerSign2Tile() {
  this.name = "GrocerSign2";
  this.graphic = "features.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grocer";
  this.peerview = "#541909";
}
GrocerSign2Tile.prototype = new FeatureObject();

function WeaponSignTile() {
  this.name = "WeaponSign";
  this.graphic = "features.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "weaponsmith";
  this.peerview = "#541909";
}
WeaponSignTile.prototype = new FeatureObject();

function BowyerSignTile() {
  this.name = "BowyerSign";
  this.graphic = "features.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bowyer";
  this.peerview = "#541909";
}
BowyerSignTile.prototype = new FeatureObject();

function AlchemistSignTile() {
  this.name = "AlchemistSign";
  this.graphic = "features.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemist";
  this.peerview = "#541909";
}
AlchemistSignTile.prototype = new FeatureObject();

function MagicShoppeSignTile() {
  this.name = "MagicShoppeSign";
  this.graphic = "features.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "magic shoppe";
  this.peerview = "#541909";
}
MagicShoppeSignTile.prototype = new FeatureObject();

function HealerSignTile() {
  this.name = "HealerSign";
  this.graphic = "features.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "healer";
  this.peerview = "#541909";
}
HealerSignTile.prototype = new FeatureObject();

function CasinoSignTile() {
  this.name = "CasinoSign";
  this.graphic = "features.png";
  this.spritexoffset = "-260";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "casino";
  this.peerview = "#541909";
}
CasinoSignTile.prototype = new FeatureObject();
  
function PaladinSignTile() {
  this.name = "PaladinSign";
  this.graphic = "features.png";
  this.spritexoffset = "-292";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign showing a chalice";
  this.peerview = "#541909";
}
PaladinSignTile.prototype = new FeatureObject();

function TrainingDummyTile() {
  this.name = "TrainingDummy";
  this.graphic = "features.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "training dummy";
  
  Pushable.call(this);
  this.heavy = 1;
}
TrainingDummyTile.prototype = new FeatureObject();

function AnvilTile() {
  this.name = "Anvil";
  this.graphic = "features.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "anvil";
}
AnvilTile.prototype = new FeatureObject();

function WBridgeNSTile() {
  this.name = "WBridgeNS";
  this.graphic = "070.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
WBridgeNSTile.prototype = new FeatureObject();

function EBridgeNSTile() {
  this.name = "EBridgeNS";
  this.graphic = "071.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
EBridgeNSTile.prototype = new FeatureObject();

function BridgeNSTile() {
  this.name = "BridgeNS";
  this.graphic = "072.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
BridgeNSTile.prototype = new FeatureObject();

function NBridgeEWTile() {
  this.name = "NBridgeEW";
  this.graphic = "101.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
NBridgeEWTile.prototype = new FeatureObject();

function SBridgeEWTile() {
  this.name = "SBridgeEW";
  this.graphic = "102.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
SBridgeEWTile.prototype = new FeatureObject();

function BridgeEWTile() {
  this.name = "BridgeEW";
  this.graphic = "126.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
BridgeEWTile.prototype = new FeatureObject();

function LeftChairTile() {
  this.name = "LeftChair";
  this.graphic = "chairs1.gif";
  this.overlay = "chairs1.gif";
//  this.spritexoffset = "-32";
//  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 1;
  
  SetByBelow.call(this);
}
LeftChairTile.prototype = new FeatureObject();

LeftChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

function RightChairTile() {
  this.name = "RightChair";
  this.graphic = "chairs3.gif";
  this.overlay = "chairs3.gif";
//  this.spritexoffset = "-96";
//  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 3;
  
  SetByBelow.call(this)
}
RightChairTile.prototype = new FeatureObject();

RightChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

function TopChairTile() {
  this.name = "TopChair";
  this.graphic = "chairs2.gif";
  this.overlay = "chairs2.gif";
//  this.spritexoffset = "0";
//  this.spriteyoffset = "-64";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 2;
  
  SetByBelow.call(this)
}
TopChairTile.prototype = new FeatureObject();

TopChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

function BottomChairTile() {
  this.name = "BottomChair";
  this.graphic = "chairs0.gif";
  this.overlay = "chairs0.gif";
//  this.spritexoffset = "0";
//  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 0;
  
  SetByBelow.call(this)
}
BottomChairTile.prototype = new FeatureObject();

BottomChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

function TurnFacing(what) {
  var graphic = what.getOverlay();
  var num = /\d/.exec(graphic);
  num = parseInt(num)+1;
  if (num > 3) { num = 0; }
  graphic = graphic.replace(/\d/,num);
  what.setOverlay(graphic);
  
  var retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "Turned.";
  return retval;
}

function SmallTableTile() {
  this.name = "SmallTable";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
SmallTableTile.prototype = new FeatureObject();

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

function HarpsichordTile() {
  this.name = "Harpsichord";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-96";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "harpsichord";
}
HarpsichordTile.prototype = new FeatureObject();

HarpsichordTile.prototype.use = function(who) {
  var retval = { fin: 1 };
  var distanceToMe = getDistance(who.getx(),who.gety(),this.getx(),this.gety(),"square");
  if (distanceToMe > 1) { 
    retval["txt"] = "The harpsichord makes a few discordant sounds, and then is silent.";
  } else if ((this.gety() - who.gety()) !== 1) { 
    retval["txt"] = "You can't reach the keys from here.";
    retval["fin"] = 0;
    return retval;
  } else {  
    retval["txt"] = "Drawing upon your years of training from your tutors, you give a passable performance.";
    if (DU.gameflags.getFlag("bard_simon_ask") && (this.getHomeMap().getName() === "swainhil1")) {
      DU.gameflags.setFlag("bard_simon_played", 1);
      DebugWrite("plot", "Simon has heard you play music.");
    }
  }
  return retval;
}

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
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
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
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
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
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
BookshelfOneTile.prototype = new FeatureObject();

function SmallBoxTile() {
  this.name = "SmallBox";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "small box";
  this.showsearched = 1;
  this.searchedgraphic = ["furniture.gif", "", "-128", "-96"];
	this.lootgroup = "";
	this.lootedid = "";
	
	this.container = [];
	OpenContainer.call(this);
}
SmallBoxTile.prototype = new FeatureObject();

function DresserTile() {
  this.name = "Dresser";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-32";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dresser";
	this.lootgroup = "";
	this.lootedid = "";
	
	this.container = [];
	OpenContainer.call(this);
}
DresserTile.prototype = new FeatureObject();

function BarrelTile() {
  this.name = "Barrel";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "barrel";
  this.showsearched = 1;
  this.searchedgraphic = ["furniture.gif", "", "-192", "-96"];
	this.lootgroup = "";
	this.lootedid = "";
	this.flammable = 20; // 20% chance it burns if in a fire
	
	this.container = [];
	OpenContainer.call(this);
	Pushable.call(this);
}
BarrelTile.prototype = new FeatureObject();

BarrelTile.prototype.flamed = function() {
  ContainerOnFire(this);
}

function ContainerOnFire(what) {
  maintext.addText("The " + what.getDesc() + " is consumed by flame!");
  var burnup = what.use(what,1); // ignore locked and trapped
  if (burnup["txt"] === "Empty.") {
    maintext.addText("It was empty.");
  } else {
    maintext.addText(burnup["txt"]);
  }
  var thisx = what.getx();
  var thisy = what.gety();
  
  var itsmap = what.getHomeMap();
  itsmap.deleteThing(what);
  DrawMainFrame("one",itsmap.getName(),thisx,thisy);
  
  return 1; 
  
}

function KitchenBarrelTile() {
  this.name = "KitchenBarrel";
}
KitchenBarrelTile.prototype = new BarrelTile();

KitchenBarrelTile.prototype.use = function(who) {
  var retval = { fin: 1, txt: "It is full of salt and spices."};
  return retval;
}

function KitchenBarrel2Tile() {
  this.name = "KitchenBarrel2";
}
KitchenBarrel2Tile.prototype = new BarrelTile();

KitchenBarrel2Tile.prototype.use = function(who) {
  var retval = { fin: 1, txt: "It is full of salted meat."};
  return retval;
}

function KitchenBarrel3Tile() {
  this.name = "KitchenBarrel3";
}
KitchenBarrel3Tile.prototype = new BarrelTile();

KitchenBarrel3Tile.prototype.use = function(who) {
  var retval = { fin: 1, txt: "It is full of delicious cheeses."};
  return retval;
}

function MirrorTile() {
  this.name = "Mirror";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mirror";
  this.karmamod = -1;
  
  Breakable.call(this,["furniture.gif", "", "-224", "0"]);
  this.brokendesc = "broken mirror";
}
MirrorTile.prototype = new FeatureObject();

MirrorTile.prototype.activate = function() {
  if (!DU.gameflags.getFlag("editor")) {
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
  if (!this.mirror.getBroken()) {
    this.mirror.setGraphicArray([who.getGraphic(), "mirror-reflection.gif", "0", "7"]);
  }
}

ReflectionTile.prototype.walkoff = function(who) {
  // remove reflection from attached mirror
  if (!this.mirror.getBroken()) {
    this.mirror.setGraphicArray(["furniture.gif", "", "-192", "0"]);
  }
}

function WaterfallTile() {
  this.name = "Waterfall";
  this.graphic = "waterfall-2.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "waterfall";
    
  HasAmbientNoise.call(this,"sfx_waterfall",1.5);
}
WaterfallTile.prototype = new FeatureObject();

WaterfallTile.prototype.activate = function() {
  if (!DU.gameflags.getFlag("editor")) {
    var flow = localFactory.createTile("WaterfallFlow");
    flow.waterfall = this;
    var homemap = this.getHomeMap();
    homemap.placeThing(this.getx(),this.gety()-1,flow);
  }
  return 1;
}

function WaterfallFlowTile() {
  this.name = "WaterfallFlow";
  this.graphic = "walkon.gif";
  this.invisible = 1;
  this.passable = MOVE_SWIM + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "waterfall flow walkon";
  this.nosave = 1;
}
WaterfallFlowTile.prototype = new FeatureObject();

WaterfallFlowTile.prototype.walkon = function(who) {
  // Go falling down
  gamestate.setMode("null");
  var waterfall = this.waterfall;
  setTimeout(function() {
    DescendWaterfall(who, waterfall);
  }, 300);
}

function DescendWaterfall(who, waterfall) {
  var thismap = who.getHomeMap();
  thismap.moveThing(who.getx(),who.gety()+1,who);
  DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());  
  if (who.gety() === waterfall.gety()) {
    setTimeout(function() {
      DescendWaterfall(who,waterfall);
    }, 100);
  } else {
    DUPlaySound("sfx_waterfall_fall");
    if (who === PC) {
      maintext.addText("You are swept down the waterfall!");
    }
    who.dealDamage(Dice.roll("1d10"));
    who.endTurn(0);
  }
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
	
	this.searchDesc = "secret door";
	this.searchPrefix = "a";
	this.peerview = "white";
	
  SetByBelow.call(this);
  Openable.call(this, [this.graphic, this.overlay, 0, 0], [this.graphic, "archway.gif", 0, 0], 0, "sfx_stone_drag", "sfx_stone_drag", "sfx_locked_door");
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
  this.spawnFreq = 100;
  this.lastSpawned = 0;
  
  this.level = 1;
  this.evolve = [];  
  // if evolve [#] exists, the first time the player is that level and the spawner isn't
  // yet, go through the pairs of keyword/value and set then to the spawner
  
  this.altPoI = "";  // for creatures in "mordor" so they don't try to follow paths outside
  
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
//    if (debug && debugflags.gameobj) {
//      dbs.writeln("<span style='color:green;font-weight:bold'>Spawner " + this.getName() + " activating at " + DUTime.getGameClock() + ".</span><br />");
//    }
    DebugWrite("gameobj", "<span style='font-weight:bold'>Spawner " + this.getName() + " activating at " + DUTime.getGameClock().toFixed(5) + ".</span><br />");

    var NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,1);
  }
}

SpawnerTile.prototype.myTurn = function() {
  if (!maps.getMap(this.getHomeMap().getName())) {
    // removing from timeline, its map is gone
    DebugWrite("gameobj", "<span style='font-weight:bold'>Spawner " + this.getSerial() + " removed from game- map gone.</span><br />");
  
    return 1;
  }
  if (PC.getLevel() > this.level) {  
    for (var i = this.level+1; i<=PC.getLevel(); i++) {
      if (this.evolve[i]) {
        this.level = i;
        DebugWrite("gameobj", "Spawner at " + this.x + ", " + this.y + " has evolved.<br />");
        while (this.evolve[i][0]) {
          var idx = this.evolve[i].shift();
          var val = this.evolve[i].shift();
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
      if (this.altPoI) {
        newspawn.altPoI = this.altPoI;
//        if (debug && debugflags.gameobj) { dbs.writeln("About to spawn, adding an altPoI.<br />"); }
        DebugWrite("gameobj","About to spawn, adding an altPoI.<br />");
      }
      
      var tile = mymap.getTile(this.getx() + diffx, this.gety() + diffy);
      var resp = tile.canMoveHere(newspawn.getMovetype());
      if (resp["canmove"]) {
        mymap.placeThing(this.getx() + diffx, this.gety() + diffy, newspawn);
        this.addSpawned(newspawn);
        newspawn.setSpawnedBy(this);
//        if (debug && debugflags.gameobj) { dbs.writeln("<span style='color:#00cc00'>Spawner #" + this.getSerial() + " at " + this.x + ", " + this.y + " has spawned a " + newspawn.getName() + " #" + newspawn.getSerial() + "</span><br />"); }
        DebugWrite("gameobj", "Spawner #" + this.getSerial() + " at " + this.x + ", " + this.y + " has spawned a " + newspawn.getName() + " #" + newspawn.getSerial() + "<br />");
      } else {
        timetonext = 5;
      }
      
  }
 
  var NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,timetonext);
  
  return 1;
}

function RedCarpetNWTile() {
  this.name = "RedCarpetNW";
  this.graphic = "red-carpet.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
RedCarpetNWTile.prototype = new FeatureObject();

function RedCarpetNTile() {
  this.name = "RedCarpetN";
  this.graphic = "red-carpet.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
RedCarpetNTile.prototype = new FeatureObject();

function RedCarpetNETile() {
  this.name = "RedCarpetNE";
  this.graphic = "red-carpet.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
RedCarpetNETile.prototype = new FeatureObject();

function RedCarpetWTile() {
  this.name = "RedCarpetW";
  this.graphic = "red-carpet.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
RedCarpetWTile.prototype = new FeatureObject();

function RedCarpetCTile() {
  this.name = "RedCarpetC";
  this.graphic = "red-carpet.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
RedCarpetCTile.prototype = new FeatureObject();

function RedCarpetETile() {
  this.name = "RedCarpetE";
  this.graphic = "red-carpet.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
RedCarpetETile.prototype = new FeatureObject();

function RedCarpetSWTile() {
  this.name = "RedCarpetSW";
  this.graphic = "red-carpet.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
RedCarpetSWTile.prototype = new FeatureObject();

function RedCarpetSTile() {
  this.name = "RedCarpetS";
  this.graphic = "red-carpet.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
RedCarpetSTile.prototype = new FeatureObject();

function RedCarpetSETile() {
  this.name = "RedCarpetSE";
  this.graphic = "red-carpet.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
RedCarpetSETile.prototype = new FeatureObject();

function BlueCarpetNWTile() {
  this.name = "BlueCarpetNW";
  this.graphic = "blue-carpet.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
BlueCarpetNWTile.prototype = new FeatureObject();

function BlueCarpetNTile() {
  this.name = "BlueCarpetN";
  this.graphic = "blue-carpet.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
BlueCarpetNTile.prototype = new FeatureObject();

function BlueCarpetNETile() {
  this.name = "BlueCarpetNE";
  this.graphic = "blue-carpet.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
BlueCarpetNETile.prototype = new FeatureObject();

function BlueCarpetWTile() {
  this.name = "BlueCarpetW";
  this.graphic = "blue-carpet.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
BlueCarpetWTile.prototype = new FeatureObject();

function BlueCarpetCTile() {
  this.name = "BlueCarpetC";
  this.graphic = "blue-carpet.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
BlueCarpetCTile.prototype = new FeatureObject();

function BlueCarpetETile() {
  this.name = "BlueCarpetE";
  this.graphic = "blue-carpet.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
BlueCarpetETile.prototype = new FeatureObject();

function BlueCarpetSWTile() {
  this.name = "BlueCarpetSW";
  this.graphic = "blue-carpet.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
BlueCarpetSWTile.prototype = new FeatureObject();

function BlueCarpetSTile() {
  this.name = "BlueCarpetS";
  this.graphic = "blue-carpet.gif";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
BlueCarpetSTile.prototype = new FeatureObject();

function BlueCarpetSETile() {
  this.name = "BlueCarpetSE";
  this.graphic = "blue-carpet.gif";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
BlueCarpetSETile.prototype = new FeatureObject();

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

function WeaponCounterDaggerTile() {
  this.name = "WeaponCounterDagger";
  this.graphic = "features.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
WeaponCounterDaggerTile.prototype = new FeatureObject();

function WeaponCounterMaceTile() {
  this.name = "WeaponCounterMace";
  this.graphic = "features.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
WeaponCounterMaceTile.prototype = new FeatureObject();

function WeaponCounterSwordTile() {
  this.name = "WeaponCounterSword";
  this.graphic = "features.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
WeaponCounterSwordTile.prototype = new FeatureObject();

function ArmorCounterLeatherTile() {
  this.name = "ArmorCounterLeather";
//  this.graphic = "051.gif";
  this.graphic = "features.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
ArmorCounterLeatherTile.prototype = new FeatureObject();

function ArmorCounterChainTile() {
  this.name = "ArmorCounterChain";
//  this.graphic = "051.gif";
  this.graphic = "features.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
ArmorCounterChainTile.prototype = new FeatureObject();

function ArmorCounterPlateTile() {
  this.name = "ArmorCounterPlate";
//  this.graphic = "051.gif";
  this.graphic = "features.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
ArmorCounterPlateTile.prototype = new FeatureObject();

function ArmorRackLeatherTile() {
  this.name = "ArmorRackLeather";
//  this.graphic = "051.gif";
  this.graphic = "features.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = 0;
  this.prefix = "a";
  this.desc = "display suit of leather armor";
  this.peerview = "black";
}
ArmorRackLeatherTile.prototype = new FeatureObject();

function ArmorRackChainTile() {
  this.name = "ArmorRackChain";
//  this.graphic = "051.gif";
  this.graphic = "features.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = 0;
  this.prefix = "a";
  this.desc = "display suit of chain mail";
  this.peerview = "black";
}
ArmorRackChainTile.prototype = new FeatureObject();

function ArmorRackPlateTile() {
  this.name = "ArmorRackPlate";
//  this.graphic = "051.gif";
  this.graphic = "features.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-64";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = 0;
  this.prefix = "a";
  this.desc = "display suit of plate armor";
  this.peerview = "black";
}
ArmorRackPlateTile.prototype = new FeatureObject();

function SkeletonDecorationTile() {
  this.name = "SkeletonDecoration";
  this.graphic = "103.gif";
  this.overlay = "skeleton-deco.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "skeleton";
  
  SetByBelow.call(this);
}
SkeletonDecorationTile.prototype = new FeatureObject();

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

function BDCLeverTile() {
  this.name = "BDCLever";
  this.graphic = "moatLever-off.gif";
  this.overlay = "moatLever-off.gif";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
  
  SetByBelow.call(this);
}
BDCLeverTile.prototype = new FeatureObject();

BDCLeverTile.prototype.use = function(who) {
  var retval = {};
  retval["fin"] = 1;
  retval["txt"] = "The lever refuses to budge.";
  return retval;
}

function GrottoLeverOffTile() {
  this.name = "GrottoLeverOff";
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
  this.graphic = "features.png";
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
  this.graphic = "features.png";
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
  this.graphic = "features.png";
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
  this.graphic = "features.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a"
  this.desc = "sandstone wall";
  this.peerview = "#b0b0b0";
  
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

SandstoneWallTile.prototype.pushMe = function(who) {
  return this.use(who);
}

function WallOfWavesTile() {
  this.name = "WallOfWaves";
  this.graphic = "runes.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Waves";
  this.peerview = "white";
}
WallOfWavesTile.prototype = new FeatureObject();

WallOfWavesTile.prototype.use = function(user) {
  var retval = {};
  retval["fin"] = 1;
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "waves", this);
  return retval;
}

WallOfWavesTile.prototype.bumpInto = function(who) {
  var retval = {};
  retval["fin"] = 1;
  ApplyRune(user, "waves", this);
  return retval;
}

function RuneOfWavesTile() {
  this.name = "RuneOfWaves";
  this.graphic = "runes.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Waves";
  this.peerview = "white";
}
RuneOfWavesTile.prototype = new FeatureObject();

RuneOfWavesTile.prototype.use = function(user) {
  var retval = {};
  retval["fin"] = 1;
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "waves", this);
  return retval;
}

RuneOfWavesTile.prototype.bumpInto = function(who) {
  var retval = {};
  retval["fin"] = 1;
  ApplyRune(user, "waves", this);
  return retval;
}


function WallOfWindsTile() {
  this.name = "WallOfWinds";
  this.graphic = "runes.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Winds";
  this.peerview = "white";
}
WallOfWindsTile.prototype = new FeatureObject();

WallOfWindsTile.prototype.use = function(user) {
  var retval = {};
  retval["fin"] = 1;
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "winds", this);
  return retval;
}

WallOfWindsTile.prototype.bumpInto = function(who) {
  var retval = {};
  retval["fin"] = 1;
  ApplyRune(user, "winds", this);
  return retval;
}

function RuneOfWindsTile() {
  this.name = "RuneOfWinds";
  this.graphic = "runes.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Winds";
  this.peerview = "white";
}
RuneOfWindsTile.prototype = new FeatureObject();

RuneOfWindsTile.prototype.use = function(user) {
  var retval = {};
  retval["fin"] = 1;
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "winds", this);
  return retval;
}

RuneOfWindsTile.prototype.bumpInto = function(who) {
  var retval = {};
  retval["fin"] = 1;
  ApplyRune(user, "winds", this);
  return retval;
}


function WallOfKingsTile() {
  this.name = "WallOfKings";
  this.graphic = "runes.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Kings";
  this.peerview = "white";
}
WallOfKingsTile.prototype = new FeatureObject();

WallOfKingsTile.prototype.use = function(user) {
  var retval = {};
  retval["fin"] = 1;
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "kings", this);
  return retval;
}

WallOfKingsTile.prototype.bumpInto = function(who) {
  var retval = {};
  retval["fin"] = 1;
  ApplyRune(user, "kings", this);
  return retval;
}

function RuneOfKingsTile() {
  this.name = "RuneOfKings";
  this.graphic = "runes.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Kings";
  this.peerview = "white";
}
RuneOfKingsTile.prototype = new FeatureObject();

RuneOfKingsTile.prototype.use = function(user) {
  var retval = {};
  retval["fin"] = 1;
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "kings", this);
  return retval;
}

RuneOfKingsTile.prototype.bumpInto = function(who) {
  var retval = {};
  retval["fin"] = 1;
  ApplyRune(user, "kings", this);
  return retval;
}

function WallOfFlamesTile() {
  this.name = "WallOfFlames";
  this.graphic = "runes.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Flames";
  this.peerview = "white";
}
WallOfFlamesTile.prototype = new FeatureObject();

WallOfFlamesTile.prototype.use = function(user) {
  var retval = {};
  retval["fin"] = 1;
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "flames", this);
  return retval;
}

WallOfFlamesTile.prototype.bumpInto = function(who) {
  var retval = {};
  retval["fin"] = 1;
  ApplyRune(user, "flames", this);
  return retval;
}

function RuneOfFlamesTile() {
  this.name = "RuneOfFlames";
  this.graphic = "runes.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Flames";
  this.peerview = "white";
}
RuneOfFlamesTile.prototype = new FeatureObject();

RuneOfFlamesTile.prototype.use = function(user) {
  var retval = {};
  retval["fin"] = 1;
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "flames", this);
  return retval;
}

RuneOfFlamesTile.prototype.bumpInto = function(who) {
  var retval = {};
  retval["fin"] = 1;
  ApplyRune(user, "flames", this);
  return retval;
}


function WallOfVoidTile() {
  this.name = "WallOfVoid";
  this.graphic = "runes.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Void";
  this.peerview = "white";
}
WallOfVoidTile.prototype = new FeatureObject();

WallOfVoidTile.prototype.use = function(user) {
  var retval = {};
  retval["fin"] = 1;
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "void", this);
  return retval;
}

WallOfVoidTile.prototype.bumpInto = function(who) {
  var retval = {};
  retval["fin"] = 1;
  ApplyRune(user, "void", this);
  return retval;
}

function RuneOfVoidTile() {
  this.name = "RuneOfVoid";
  this.graphic = "runes.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-32";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Void";
  this.peerview = "white";
}
RuneOfVoidTile.prototype = new FeatureObject();

RuneOfVoidTile.prototype.use = function(user) {
  var retval = {};
  retval["fin"] = 1;
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "void", this);
  return retval;
}

RuneOfVoidTile.prototype.bumpInto = function(who) {
  var retval = {};
  retval["fin"] = 1;
  ApplyRune(user, "void", this);
  return retval;
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
    // play a wind SOUND
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
    if (spawnthing) {
      var spawnedmonster = localFactory.createTile(spawnthing);
      windmap.placeThing(spawnwhere[0], spawnwhere[1], spawnedmonster);
      // add an "appears" visual effect? WORKING
    }
    
    
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
  var retval = {};
  if (user.getRuneCooldown("kings") > DUTime.getGameClock()) {
    retval["fin"] = 1;
    retval["txt"] = "You are too tired to invoke this rune!"
    return retval;
  }
  // check if on surface, if so check location
  // if underground/in town, heal
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
    // set cooldown
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
  this.graphic = "eternal_flame0.gif"; // remove 0 for active fire
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
  this.peerview = "#a0a0a0";
  
  HasAmbientNoise.call(this,"sfx_fountain_splash",1.5);
}
BrightFountainTile.prototype = new FeatureObject();

function BlueFountainTile() {
  this.name = "BlueFountain";
  this.graphic = "fountains.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.prefix = "a";
  this.desc = "fountain";
  this.peerview = "#a0a0a0";
  
  HasAmbientNoise.call(this,"sfx_fountain_splash",1.5);
}
BlueFountainTile.prototype = new FeatureObject();

function BloodFountainTile() {
  this.name = "BloodFountain";
  this.graphic = "fountains.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.prefix = "a";
  this.desc = "fountain";
  this.peerview = "#a0a0a0";
  
  HasAmbientNoise.call(this,"sfx_fountain_splash",1.5);
}
BloodFountainTile.prototype = new FeatureObject();

function FountainTile() {
  this.name = "Fountain";
  this.graphic = "fountain.gif";
  this.prefix = "a";
  this.desc = "fountain";
  this.peerview = "#a0a0a0";
  
  HasAmbientNoise.call(this,"sfx_fountain_splash",2);
}
FountainTile.prototype = new FeatureObject();

function BlueCrystalTile() {
  this.name = "BlueCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#65ceff";
}
BlueCrystalTile.prototype = new FeatureObject();

function PurpleCrystalTile() {
  this.name = "PurpleCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#9b65ff";
}
PurpleCrystalTile.prototype = new FeatureObject();

function YellowCrystalTile() {
  this.name = "YellowCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#ffc465";
}
YellowCrystalTile.prototype = new FeatureObject();

function GreenCrystalTile() {
  this.name = "GreenCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#9bff65";
}
GreenCrystalTile.prototype = new FeatureObject();

function RedCrystalTile() {
  this.name = "RedCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#ff658b";
}
RedCrystalTile.prototype = new FeatureObject();

function WhiteCrystalTile() {
  this.name = "WhiteCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
  this.prefix = "a";
  this.desc = "crystal";
  this.peerview = "#b0cbc4";
}
WhiteCrystalTile.prototype = new FeatureObject();

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
    // NEEDS SFX/SOUND
  }
}

function PitTeleporterPlatformTile() {
  this.name = "PitTeleporterPlatform";
  this.graphic = "teleporter.gif";
  this.prefix = "a";
  this.desc = "platform";
  this.destination;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
PitTeleporterPlatformTile.prototype = new FeatureObject();

PitTeleporterPlatformTile.prototype.setDestination = function(destobj) {
  this.destination = {};
  if (destobj.map && destobj.x && destobj.y) {
    this.destination = destobj;
  }
}

PitTeleporterPlatformTile.prototype.getDestination = function() {
  return this.destination;
}

PitTeleporterPlatformTile.prototype.walkon = function(who) {
  if ((who.getLevel() < 4) && (who === PC)) {
    maintext.addText("You hear a voice in your head: 'Thou'rt not yet ready for this trial.' Nothing happens.");
  }
  else if (this.getDestination()) {
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
    // NEEDS SFX/SOUND
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
  this.peerview = "white";
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

function EtherGateTile() {
  this.name = "EtherGate";
  this.graphic = "moongates.gif";
  this.spritexoffset = '-128';
  this.spriteyoffset = '0';
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "gate";
}
EtherGateTile.prototype = new FeatureObject();

EtherGateTile.prototype.walkon = function(who) {
  var homemap = who.getHomeMap();
  var desttile = homemap.getTile(this.destx,this.desty);
  var npcs = desttile.getNPCs();
  if (npcs) {
    $.each(npcs, function(idx,val) {
      homemap.moveThing(this.destx-1,this.desty,val);
    });
  }
  homemap.moveThing(this.destx,this.desty,who);
  DrawMainFrame("draw", homemap.getName(), PC.getx(), PC.gety());
}

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
  // needs SOUND
  return "";
}

function PetrifiedReaperTile() {
  this.name = "PetrifiedReaper";
  this.graphic = "petrifiedreaper.gif";
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "petrified reaper";
}
PetrifiedReaperTile.prototype = new FeatureObject();

PetrifiedReaperTile.prototype.use = function(who) {
  var retval  ={};
  retval["fin"] = 1;

  if (IsAdjacent(who,this)) {
    var loot = localFactory.createTile("ReaperBark");
    PC.addToInventory(loot,1);
    retval["txt"] = "You take some petrified reaper bark.";
  } else {
    retval["txt"] = "Nothing happens.";
  }

  return retval;
}  

function AltarWithSwordTile() {
  this.name = "AltarWithSword";
  this.graphic = "swordinstone.gif";
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "sword driven into the stone of an altar";
  this.peerview = "white";
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
	
	Pushable.call(this);
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
  this.graphic = "items.png";
  this.spriteyoffset = "-32";
  this.spritexoffset = "-256";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "shield commissioned by Nyrani";
  this.prefix = "the";
  this.addType("Quest");
}
AmbroseShieldTile.prototype = new ItemObject();

function RobertMapTile() {
  this.name = "RobertMap";
  this.graphic = "items.png";
  this.spriteyoffset = "-96";
  this.spritexoffset = "-0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "map to bring to Robert";
  this.prefix = "a";
  this.addType("Quest");
}
RobertMapTile.prototype = new ItemObject();

function SmallRockTile() {
  this.name = "SmallRock";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-128";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "small rock to bring to Garen";
  this.prefix = "a";
  this.addType("Quest");  
}
SmallRockTile.prototype = new ItemObject();

function SiriCloakTile() {
  this.name = "SiriCloak";
  this.graphic = "items.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-192";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "blue cloak";
  this.prefix = "a";
  this.addType("Quest");  
}
SiriCloakTile.prototype = new ItemObject();

function CourierPouchTile() {
  this.name = "CourierPouch";
  this.graphic = "items.png";
  this.spriteyoffset = "-160";
  this.spritexoffset = "-224";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "pouch full of papers";
  this.prefix = "a";
  this.addType("Quest");
}
CourierPouchTile.prototype = new ItemObject();

CourierPouchTile.prototype.use = function(who) {
  var retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "You open the pouch and scan through the documents. They appear to be written in some kind of code- hopefully the Loyalists know how to read it.";
  return retval;
}

function CourierLetterTile() {
  this.name = "CourierLetter";
  this.graphic = "items.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "letter to bring to the Prince";
  this.prefix = "a";
  this.addType("Quest");
}
CourierLetterTile.prototype = new ItemObject();

CourierLetterTile.prototype.use = function(who) {
  var retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "The letter appears to be in a simple code. Hopefully Prince Lance knows how to read it.";
  return retval;
}

function TrustedPlansTile() {
  this.name = "TrustedPlans";
  this.graphic = "items.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "plans for a Trusted pin";
  this.prefix = "the";
  this.addType("Quest");
}
TrustedPlansTile.prototype = new ItemObject();

function TrustedPinTile() {
  this.name = "TrustedPin";
  this.graphic = "items.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-160";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Trusted pin";
  this.prefix = "a";
  this.addType("Quest");
}
TrustedPinTile.prototype = new ItemObject();

function PitOfDespairKeyTile() {
  this.name = "PitOfDespairKey";
  this.graphic = "items.png";
  this.spriteyoffset = "-64";
  this.spritexoffset = "-224";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Pit of Despair dungeon key";
  this.prefix = "the";
  this.addType("Quest");
}
PitOfDespairKeyTile.prototype = new ItemObject();

function KeyOfSpiritsTile() {
  this.name = "KeyOfSpirits";
  this.graphic = "items.png";
  this.spriteyoffset = "-64";
  this.spritexoffset = "0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Spirits";
  this.prefix = "the";
  this.addType("Quest");
}
KeyOfSpiritsTile.prototype = new ItemObject();

function RoyalKeyTile() {
  this.name = "RoyalKey";
  this.graphic = "items.png";
  this.spriteyoffset = "-128";
  this.spritexoffset = "0";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Royal Key";
  this.prefix = "the";
  this.addType("Quest");
}
RoyalKeyTile.prototype = new ItemObject();  

function BlackDragonKeyTile() {
  this.name = "BlackDragonKey";
  this.graphic = "items.png";
  this.spriteyoffset = "-128";
  this.spritexoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Black Dragon Key";
  this.prefix = "the";
  this.addType("Quest");
}
BlackDragonKeyTile.prototype = new ItemObject();  

function KeyOfAshesTile() {
  this.name = "KeyOfAshes";
  this.graphic = "items.png";
  this.spriteyoffset = "-128";
  this.spritexoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Ashes";
  this.prefix = "the";
  this.addType("Quest");
}
KeyOfAshesTile.prototype = new ItemObject();  

function KeyOfIceTile() {
  this.name = "KeyOfIce";
  this.graphic = "items.png";
  this.spriteyoffset = "-128";
  this.spritexoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Ice";
  this.prefix = "the";
  this.addType("Quest");
}
KeyOfIceTile.prototype = new ItemObject();  

function KeyOfBoneTile() {
  this.name = "KeyOfBone";
  this.graphic = "items.png";
  this.spriteyoffset = "-128";
  this.spritexoffset = "-128";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Bone";
  this.prefix = "the";
  this.addType("Quest");
}
KeyOfBoneTile.prototype = new ItemObject();  

function KeyOfDustTile() {
  this.name = "KeyOfDust";
  this.graphic = "items.png";
  this.spriteyoffset = "-128";
  this.spritexoffset = "-160";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Dust";
  this.prefix = "the";
  this.addType("Quest");
}
KeyOfDustTile.prototype = new ItemObject();  

function KeyOfSunTile() {
  this.name = "KeyOfSun";
  this.graphic = "items.png";
  this.spriteyoffset = "-128";
  this.spritexoffset = "-192";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of the Sun";
  this.prefix = "the";
  this.addType("Quest");
}
KeyOfSunTile.prototype = new ItemObject();  

function KeyOfShadowTile() {
  this.name = "KeyOfShadow";
  this.graphic = "items.png";
  this.spriteyoffset = "-128";
  this.spritexoffset = "-256";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Shadow";
  this.prefix = "the";
  this.addType("Quest");
}
KeyOfShadowTile.prototype = new ItemObject();  

function ReaperBarkTile() {
  this.name = "ReaperBark";
  this.graphic = "items.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "piece of petrified reaper bark";
  this.prefix = "a";
  this.addType("Quest");
}
ReaperBarkTile.prototype = new ItemObject();

function AmuletOfReflectionsTile() {
  this.name = "AmuletOfReflections";
  this.graphic = "items.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
      gamestate.setMode("null");
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
      retval["fin"] = -2;
      // play SOUND generic spellcast
      return retval;
    } 
  }
  retval["txt"] = "Nothing happens here.";
  retval["fin"] = 1;
  return retval;
}

function DragonBoneTile() {
  this.name = "DragonBone";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "dragon fingerbone";
  this.prefix = "a";
  this.addType("Quest");
}
DragonBoneTile.prototype = new ItemObject();

function StoneOfSparksTile() {
  this.name = "StoneOfSparks";
  this.graphic = "items.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Stone of Sparks";
  this.prefix = "the";
  this.addType("Quest");
}
StoneOfSparksTile.prototype = new ItemObject();

function StoneOfEmbersTile() {
  this.name = "StoneOfEmbers";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Stone of Embers";
  this.prefix = "the";
  this.addType("Quest");
}
StoneOfEmbersTile.prototype = new ItemObject();

function StoneOfTheBlazeTile() {
  this.name = "StoneOfTheBlaze";
  this.graphic = "items.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Stone of the Blaze";
  this.prefix = "the";
  this.addType("Quest");
}
StoneOfTheBlazeTile.prototype = new ItemObject();

function StoneOfConflagrationsTile() {
  this.name = "StoneOfConflagrations";
  this.graphic = "items.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Stone of Conflagrations";
  this.prefix = "the";
  this.addType("Quest");
}
StoneOfConflagrationsTile.prototype = new ItemObject();

function TreasuryTokenTile() {
  this.name = "TreasuryToken";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-96";  // never seen
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "treasury token";
  this.prefix = "a";
  this.addType("Quest");
}
TreasuryTokenTile.prototype = new ItemObject();

function SpiderSilkTile() {
  this.name = "SpiderSilk";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.prefix = "a";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "bit of spider silk";
  this.addType("Reagent");
}
SpiderSilkTile.prototype = new ItemObject();

function BlackPearlTile() {
  this.name = "BlackPearl";
  this.graphic = "items.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.prefix = "a";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "black pearl";
  this.addType("Reagent");
}
BlackPearlTile.prototype = new ItemObject();

function ExecutionersHoodTile() {
  this.name = "ExecutionersHood";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "an";
  this.desc = "executioner's hood";
  this.addType("Reagent");
}
ExecutionersHoodTile.prototype = new ItemObject();

function QuestExecutionersHoodTile() {
  this.name = "QuestExecutionersHood";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "an";
  this.desc = "executioner's hood";
  this.addType("Quest");
}
QuestExecutionersHoodTile.prototype = new ItemObject();

function NightshadeTile() {
  this.name = "Nightshade";
  this.graphic = "items.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "some";
  this.desc = "nightshade";
  this.addType("Reagent");
}
NightshadeTile.prototype = new ItemObject();

function SulfurousAshTile() {
  this.name = "SulfurousAsh";
  this.graphic = "items.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pile of sulfurous ash";
  this.addType("Reagent");
}
SulfurousAshTile.prototype = new ItemObject();

function MandrakeRootTile() {
  this.name = "MandrakeRoot";
  this.graphic = "items.png";
  this.spriteyoffset = "-64";
  this.spritexoffset = "-256";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "mandrake root";
  this.addType("Reagent");
}
MandrakeRootTile.prototype = new ItemObject();

function LightningWoodTile() {
  this.name = "LightningWood";
  this.graphic = "items.png";
  this.spriteyoffset = "-64";
  this.spritexoffset = "-288";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "twig of lightning wood";
  this.prefix = "a";
  this.addType("Reagent");
}
LightningWoodTile.prototype = new ItemObject();

function MistletoeTile() {
  this.name = "Mistletoe";
  this.graphic = "items.png";
  this.spriteyoffset = "-96";
  this.spritexoffset = "-256";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "mistletoe";
  this.addType("Reagent");
}
MistletoeTile.prototype = new ItemObject();

function BloodMossTile() {
  this.name = "BloodMoss";
  this.graphic = "items.png";
  this.spriteyoffset = "-96";
  this.spritexoffset = "-288";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "blood moss";
  this.addType("Reagent");
}
BloodMossTile.prototype = new ItemObject();

function PerfectRubyTile() {
	this.name = "PerfectRuby";
	this.graphic = "items.png";
  this.spriteyoffset = "-192";
  this.spritexoffset = "0";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "perfect ruby gemstone";
	this.prefix = "a";
}
PerfectRubyTile.prototype = new ItemObject();

function RubyTile() {
	this.name = "Ruby";
	this.graphic = "items.png";
  this.spriteyoffset = "-192";
  this.spritexoffset = "-32";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "small ruby gemstone";
	this.prefix = "a";
}
RubyTile.prototype = new ItemObject();

function SmallSapphireTile() {
	this.name = "SmallSapphire";
	this.graphic = "items.png";
  this.spriteyoffset = "-192";
  this.spritexoffset = "-64";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "small sapphire gemstone";
	this.prefix = "a";
}
SmallSapphireTile.prototype = new ItemObject();

function SapphireTile() {
	this.name = "Sapphire";
	this.graphic = "items.png";
  this.spriteyoffset = "-192";
  this.spritexoffset = "-96";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "sapphire gemstone";
	this.prefix = "a";
}
SapphireTile.prototype = new ItemObject();

function GemsTile() {
	this.name = "Gems";
	this.graphic = "items.png";
  this.spriteyoffset = "-192";
  this.spritexoffset = "-128";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "pile of tiny gemstones";
	this.prefix = "a";
}
GemsTile.prototype = new ItemObject();

function RubyGemoftheSunTile() {
	this.name = "RubyGemoftheSun";
	this.graphic = "items.png";
  this.spriteyoffset = "-160";
  this.spritexoffset = "-288";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "ruby gem that harnesses the power of the sun";
	this.prefix = "a";
}
RubyGemoftheSunTile.prototype = new ItemObject();

RubyGemoftheSunTile.prototype.use = function(who) {
  // do something
  // working here
}


function DecorativeArmorTile() {
	this.name = "DecorativeArmor";
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-160";
	this.desc = "decorative suit of armor";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.prefix = "a";
}
DecorativeArmorTile.prototype = new ItemObject();

function GoldTile() {
  this.name = "Gold";
  this.graphic = "items.png";  
  this.spritexoffset = "0";
  this.spriteyoffset = "0";
  this.desc = "1 gold coin";
  this.quantity = 1;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
    this.graphic = "items.png";  
    this.spritexoffset = "0";
    this.spriteyoffset = "0";
  }
  else if ((this.quantity > 3) && (this.quantity < 16)) {
    this.graphic = "items.png";  
    this.spritexoffset = "-32";
    this.spriteyoffset = "0";
  } else if (this.quantity > 15) {
    this.graphic = "items.png";  
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

// Books/Journals
function BookItemObject() {
  this.contents = "";
  this.addType("Book");
}
BookItemObject.prototype = new ItemObject();

BookItemObject.prototype.use = function(who) {
  var bookcontents = this.contents.split("%%");
  var retval = {};
  if (bookcontents) {
    retval["txt"] = "Use: " + this.getDesc() + "<br /> Reading...<br />" + bookcontents.shift();
    if (bookcontents.length > 0) {
      retval["override"] = 1;
	  	var usedname = this.getDesc();
		  usedname = usedname.replace(/^a /, "");
      
      retval["fin"] = 3;
      targetCursor.booktext = bookcontents;
    } else {
      retval["fin"] = 1;
      DrawMainFrame("draw",PC.getHomeMap().getName(),PC.getx(),PC.gety());
    }
  }
  return retval;
}

function PerformRead() {
  var retval = {};
  retval["txt"] = targetCursor.booktext.shift();
  if (targetCursor.booktext.length > 0) {
    retval["fin"] = 0;
    return retval;
  } else {
    retval["fin"] = 1;
    return retval;
  }
}

function BookOfLoreTile() {
  this.name = "BookOfLore";
  this.graphic = "items.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-128";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Book of Lore";
  this.prefix = "the";
  this.addType("Quest");
  this.contents = "";
}
BookOfLoreTile.prototype = new BookItemObject();

function TomeOfSightTile() {
  this.name = "TomeOfSight";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Tome of Sight";
  this.prefix = "the";
  this.addType("Quest");
  this.contents = "You open to a random page:%%'...for the Eye of Man can be deceived, but the Eye of Magic is Immutable.' [addmore]";
}
TomeOfSightTile.prototype = new BookItemObject();

function MapsAndLegendsTile() {
  this.name = "MapsAndLegends";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-192";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Maps and Legends";
  this.prefix = "";
  this.addType("Quest");
  this.contents = "You flip through the pages and find a chapter on magical phenomenon.%%Searching, you find the section you seek:%%\"The Brilliant Pool\"%%<span class='conv'>Once, this mythical place was considered the source of all magic.</span>%%<span class='conv'>Now, it is known that magic's power is drawn from the ethereal plane, and it is not known whether the Brilliant Pool ever truly existed, or still exists.</span>%%<span class='conv'>Another story has it that it is a star, misplaced on our plane, its power too great for any mortal to harness directly.</span>%%You close the book.";
}
MapsAndLegendsTile.prototype = new BookItemObject();


function ATreatiseOnDragonsTile() {
  this.name = "ATreatiseOnDragons";
  this.graphic = "items.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-192";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "A Treatise On Dragons";
  this.prefix = "";
  this.addType("Quest");
  this.contents = "You open the book.%%<span class='conv'>A dragon is a mighty reptile with great magical and physical power. Its destructive power is so great that it is hardly a surprise that it came to be associated with Tethlokel the Destroyer.</span>%%<span class='conv'>The average dragon is roughly 60 feet long, breathes fire hot enough to easily set wooden buildings aflame, and can fly for hours without rest.</span>%%<span class='conv'>They prefer to live in caves in high mountains far from civilization, and so are infrequently seen.</span>%%<span class='conv'>Rarely, a dragon may grow to become an Elder. Elder Dragons are thought to have better than human intelligence and incredible magical power, allowing them to make plans that span decades.</span>%%<span class='conv'>It is fortunate that they are so rare, as they are evil of bent and desire power and conquest.</span>%%The book is long, but you feel like you have gotten the gist. You close the book.";
}
ATreatiseOnDragonsTile.prototype = new BookItemObject();

function AdelusLetterTile() {
  this.name = "AdelusLetter";
  this.graphic = "items.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "letter to Adelus";
  this.prefix = "a";
  this.addType("Quest");
  this.contents = "<span class='conv'>Dearest Adelus,</span>%%<span class='conv'>Please visit when you can. I will admit that I have made the way difficult, for I do not wish other visitors, so let these instructions lay out a map for you.</span>%%<span class='conv'>When you enter World's Ending, you must create the sunset, and then walk with the light at your back. Close your eyes, and the wall will let you pass.</span>%%<span class='conv'>In the next chamber, go through the hallways in this order: far right, near right, mid left.</span>%%<span class='conv'>This will bring you to me. And once you are here...</span>%%...The rest of the letter is embarrassingly personal. You put it away.";
}
AdelusLetterTile.prototype = new BookItemObject();

function ConsumableItemObject() {
  this.addType("Consumable");
}
ConsumableItemObject.prototype = new ItemObject();

function KyvekBoxTile() {
  this.name = "KyvekBox";
  this.graphic = "008.gif";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "box with the payment of a debt to Kyvek";
  this.prefix = "a";
  this.addType("Quest");
}
KyvekBoxTile.prototype = new ConsumableItemObject();

KyvekBoxTile.prototype.use = function(who) {
  var retval = {};
  
  if (who === PC) {
    retval["override"] = -1;
    retval["fin"] = -1;
    retval["preserve"] = 1;
    retval["txt"] = "This will break the seal and you will be unable to return the money to Kyvek. Are you sure?";
    retval["input"] = "(Y/N): ";
    return retval;
  }
  retval["fin"] = 1;
  return retval;
}

KyvekBoxTile.prototype.usePrompt = function(code) {
  var retval = {};
  retval["fin"] = 1;
  if (code === 89) {
    retval["txt"] = "You break the seal and empty the coin into your own pouches. You gain 600 gold.";
    DU.gameflags.setFlag("karma", DU.gameflags.getFlag("karma")-1);
    PC.addGold(600);
    PC.removeFromInventory(this);
    DrawCharFrame();
  } else {
    retval["txt"] = "You put the box away, unopened.";
  }
  return retval;
}

function SupplyBoxTile() {
  this.name = "SupplyBox";
  this.graphic = "furniture.gif";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-96";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "small box of supplies";
  this.addType("Quest");
}
SupplyBoxTile.prototype = new ConsumableItemObject();

SupplyBoxTile.prototype.use = function(who) {
  var retval = { fin: 1 };
  who.addToInventory(localFactory.createTile("WhitePotion"),1,2);
  who.addToInventory(localFactory.createTile("RedPotion"),1);
  who.addToInventory(localFactory.createTile("YellowPotion"),1,2);
  who.addToInventory(localFactory.createTile("ScrollVulnerability"),1);
  retval["txt"] = "The box contains: two white potions, two yellow potions, a red potion, and a scroll of Vulnerability.";
  
  return retval;
}

// potions

function PotionItemObject() {
  this.addType("Potion");
  this.flammable = 10;
}
PotionItemObject.prototype = new ConsumableItemObject();

PotionItemObject.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " boils away!");
  var thisx = this.getx();
  var thisy = this.gety();
  
  var itsmap = this.getHomeMap();
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap.getName(),thisx,thisy);
  
  return 1; 
}

// poison potions
function GreenPotionTile() {
  this.name = "GreenPotion";
  this.desc = "green potion";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "0";
}
GreenPotionTile.prototype = new PotionItemObject();

GreenPotionTile.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " boils away!");
  var thisx = this.getx();
  var thisy = this.gety();
  var itsmap = this.getHomeMap();
    
  for (var i=thisx-1;i<=thisx+1;i++) {
    for (var j=thisy-1;j<=thisy+1;j++) {
      var tile = itsmap.getTile(i,j);
      if (tile !== "OoB") {
        var npcs = tile.getNPCs();
        $.each(npcs, function(idx,val) {
          if (Dice.roll("1d100") < (55-val.getLevel()*5)) {
            // poisoned by fumes
            maintext.addText(val.getFullDesc() + " is poisoned by the fumes!");
            var poison = localFactory.createTile("Poison");
            var duration = Dice.roll("2d8") * SCALE_TIME;
            poison.setExpiresTime(duration + DUTime.getGameClock());
            val.addSpellEffect(poison);
            ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, COLOR_GREEN);
          }
        });
      }
    }
  }
  
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap.getName(),thisx,thisy);
  
  return 1; 
}

GreenPotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var retval = {}
  retval["fin"] = 1;
  var poisontile = localFactory.createTile("Poison");
  var duration = Dice.roll("2d8") * SCALE_TIME;
  poison.setExpiresTime(duration + DUTime.getGameClock());
  who.addSpellEffect(poison);
  if (who === PC) {
    retval["txt"] = "You are poisoned!";
  }
  return retval;
}

//haste potion
function DarkGreenPotionTile() {
  this.name = "DarkGreenPotion";
  this.desc = "dark green potion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
DarkGreenPotionTile.prototype = new PotionItemObject();

DarkGreenPotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var retval = {fin:1};
  retval = magic[SPELL_QUICKNESS_LEVEL][SPELL_QUICKNESS_ID].executeSpell(PC, 0, 1);
  retval["txt"] = "You feel yourself moving more quickly!";
  return retval;
}

// str potion
function SilverPotionTile() {
  this.name = "SilverPotion";
  this.desc = "silver potion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
SilverPotionTile.prototype = new PotionItemObject();

SilverPotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var resp = {};
  resp["fin"] = 1;

  var levobj = localFactory.createTile("BlessingStr");
  
  var dur = Dice.roll("2d10+15");
  var power = Dice.roll("1d4+1");
  var endtime = dur + DU.DUTime.getGameClock();
//  if (debug && (debugflags.gameobj || debugflags.magic)) { dbs.writeln("<span style='color:green'>Potion of Strength: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  if (!DebugWrite("gameobj", "Potion of Strength: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />")) {
    DebugWrite("magic", "Potion of Strength: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  }
  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  who.addSpellEffect(levobj);
    
  DrawCharFrame();
  resp["txt"] = "You feel stronger!";
  return resp;  
}
  
// dex potion
function PinkPotionTile() {
  this.name = "PinkPotion";
  this.desc = "pink potion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
PinkPotionTile.prototype = new PotionItemObject();

PinkPotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var resp = {};
  resp["fin"] = 1;

  var levobj = localFactory.createTile("BlessingDex");
  
  var dur = Dice.roll("2d10+15");
  var power = Dice.roll("1d4+1");
  var endtime = dur + DU.DUTime.getGameClock();
//  if (debug && (debugflags.gameobj || debugflags.magic)) { dbs.writeln("<span style='color:green'>Potion of Dexterity: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  if (!DebugWrite("gameobj", "Potion of Dexterity: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />")) {
    DebugWrite("magic", "Potion of Dexterity: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  }

  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  who.addSpellEffect(levobj);
    
  DrawCharFrame();
  resp["txt"] = "You feel quicker!";
  return resp;  
}

// int potion
function GreyPotionTile() {
  this.name = "GreyPotion";
  this.desc = "grey potion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
GreyPotionTile.prototype = new PotionItemObject();

GreyPotionTile.prototype.use = function(who) {
  var resp = {};
  DUPlaySound("sfx_potion");
  resp["fin"] = 1;

  var levobj = localFactory.createTile("BlessingInt");
  
  var dur = Dice.roll("2d10+15");
  var power = Dice.roll("1d4+1");
  var endtime = dur + DU.DUTime.getGameClock();
//  if (debug && (debugflags.gameobj || debugflags.magic)) { dbs.writeln("<span style='color:green'>Potion of Intelligence: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  if (!DebugWrite("gameobj", "Potion of Intelligence: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />")) {
    DebugWrite("magic", "Potion of Intelligence: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  }

  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  who.addSpellEffect(levobj);
    
  DrawCharFrame();
  resp["txt"] = "You feel smarter!";
  return resp;  
}

// greater mana potion
function BrownPotionTile() {
  this.name = "BrownPotion";
  this.desc = "brown potion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "0";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
BrownPotionTile.prototype = new PotionItemObject();

BrownPotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  who.setMana(who.getMaxMana());
  var retval = {};
  retval["fin"] = 1;
  if (who === PC) {
    retval["txt"] = "You feel refreshed!";
  }
  return retval;
}

// cure potion
function RedPotionTile() {
  this.name = "RedPotion";
  this.desc = "red potion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-32";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
RedPotionTile.prototype = new PotionItemObject();

RedPotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var resp = magic[SPELL_CURE_LEVEL][SPELL_CURE_ID].executeSpell(who,1,1);
  resp["txt"] = "You feel purified.";
  
  return resp;
}

// light potion
function WhitePotionTile() {
  this.name = "WhitePotion";
  this.desc = "white potion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-32";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
WhitePotionTile.prototype = new PotionItemObject();

WhitePotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var retval = { fin:1};
  retval = magic[SPELL_LIGHT_LEVEL][SPELL_LIGHT_ID].executeSpell(PC, 0, 1);
  retval["txt"] = "You begin to glow.";
  return retval;
}

// lesser heal potion
function YellowPotionTile() {
  this.name = "YellowPotion";
  this.desc = "yellow potion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-32";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
YellowPotionTile.prototype = new PotionItemObject();

YellowPotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var retval = {fin:1};
  retval = magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].executeSpell(PC, 0, 1);
  retval["txt"] = "You are healed!";
  return retval;
}

// protect potion
function PurplePotionTile() {
  this.name = "PurplePotion";
  this.desc = "purple potion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-32";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
PurplePotionTile.prototype = new PotionItemObject();

PurplePotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var retval = {fin:1};
  retval = magic[SPELL_PROTECT_LEVEL][SPELL_PROTECT_ID].executeSpell(PC, 0, 1);
  retval["txt"] = "You feel an aura of protection around you.";
  return retval;
}

// bless potion
function BlackPotionTile() {
  this.name = "BlackPotion";
  this.desc = "black potion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-32";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
BlackPotionTile.prototype = new PotionItemObject();

BlackPotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var retval = {fin:1};
  retval = magic[SPELL_BLESSING_LEVEL][SPELL_BLESSING_ID].executeSpell(PC, 0, 1);
  retval["txt"] = "You feel blessed!";
  return retval;
}

// heal potion
function BluePotionTile() {
  this.name = "BluePotion";
  this.desc = "blue potion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-32";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
BluePotionTile.prototype = new PotionItemObject();

BluePotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var retval = {fin:1};
  retval = magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID].executeSpell(PC, 0, 1);
  retval["txt"] = "You are healed!"
  return retval;
}

// mana potion
function OrangePotionTile() {
  this.name = "OrangePotion";
  this.desc = "orange potion";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-32";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
OrangePotionTile.prototype = new PotionItemObject();

OrangePotionTile.prototype.use = function(who) {
  DUPlaySound("sfx_potion");
  var mana = Dice.roll("2d6+1");
  who.setMana(who.getMana() + mana);
  if (who.getMana() > who.getMaxMana()) { who.setMana(who.getMaxMana()); }
  var retval = {};
  retval["fin"] = 1;
  if (who === PC) {
    retval["txt"] = "You feel refreshed!";
  }
  return retval;
}


// scrolls

function ScrollItemObject() {
  this.addType("Scroll"); 
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.spelllevel = 1;
  this.spellnumber = 1;
  this.flammable = 90;
}
ScrollItemObject.prototype = new ConsumableItemObject();

ScrollItemObject.prototype.use = function(who) {
  var retval = {};
  retval = magic[this.spelllevel][GetSpellID(this.spellnumber)].executeSpell(PC, 0, 1);
  return retval;
}

ScrollItemObject.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " burns away!");
  var thisx = this.getx();
  var thisy = this.gety();
  
  var itsmap = this.getHomeMap();
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap.getName(),thisx,thisy);
  
  return 1; 
}

function ScrollAwakenTile() {
  this.name = "ScrollAwaken";
  this.desc = "scroll of Awaken";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_AWAKEN_LEVEL;
  this.spellnum = SPELL_AWAKEN_ID;
}
ScrollAwakenTile.prototype = new ScrollItemObject();

function ScrollCureTile() {
  this.name = "ScrollCure";
  this.desc = "scroll of Cure";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_CURE_LEVEL;
  this.spellnum = SPELL_CURE_ID;
}
ScrollCureTile.prototype = new ScrollItemObject();

function ScrollDisarmTrapTile() {
  this.name = "ScrollDisarmTrap";
  this.desc = "scroll of Disarm Trap";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_DISARM_TRAP_LEVEL;
  this.spellnum = SPELL_DISARM_TRAP_ID;
}
ScrollDisarmTrapTile.prototype = new ScrollItemObject();

function ScrollDistractTile() {
  this.name = "ScrollDistract";
  this.desc = "scroll of Distract";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_DISTRACT_LEVEL;
  this.spellnum = SPELL_DISTRACT_ID;
}
ScrollDistractTile.prototype = new ScrollItemObject();

function ScrollFlameBladeTile() {
  this.name = "ScrollFlameBlade";
  this.desc = "scroll of Flame Blade";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_FLAME_BLADE_LEVEL;
  this.spellnum = SPELL_FLAME_BLADE_ID;
  this.flammable = 50;
}
ScrollFlameBladeTile.prototype = new ScrollItemObject();

function ScrollLightTile() {
  this.name = "ScrollLight";
  this.desc = "scroll of Light";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_LIGHT_LEVEL;
  this.spellnum = SPELL_LIGHT_ID;
}
ScrollLightTile.prototype = new ScrollItemObject();

function ScrollVulnerabilityTile() {
  this.name = "ScrollVulnerability";
  this.desc = "scroll of Vulnerability";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_VULNERABILITY_LEVEL;
  this.spellnum = SPELL_VULNERABILITY_ID;
}
ScrollVulnerabilityTile.prototype = new ScrollItemObject();

function ScrollIllusionTile() {
  this.name = "ScrollIllusion";
  this.desc = "scroll of Illusion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_ILLUSION_LEVEL;
  this.spellnum = SPELL_ILLUSION_ID;
}
ScrollIllusionTile.prototype = new ScrollItemObject();

function ScrollIronFleshTile() {
  this.name = "ScrollIronFlesh";
  this.desc = "scroll of Iron Flesh";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_IRON_FLESH_LEVEL;
  this.spellnum = SPELL_IRON_FLESH_ID;
}
ScrollIronFleshTile.prototype = new ScrollItemObject();

function ScrollLesserHealTile() {
  this.name = "ScrollLesserHeal";
  this.desc = "scroll of Lesser Heal";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_LESSER_HEAL_LEVEL;
  this.spellnum = SPELL_LESSER_HEAL_ID;
}
ScrollLesserHealTile.prototype = new ScrollItemObject();

function ScrollMagicBoltTile() {
  this.name = "ScrollMagicBolt";
  this.desc = "scroll of Magic Bolt";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_MAGIC_BOLT_LEVEL;
  this.spellnum = SPELL_MAGIC_BOLT_ID;
}
ScrollMagicBoltTile.prototype = new ScrollItemObject();

function ScrollPoisonCloudTile() {
  this.name = "ScrollPoisonCloud";
  this.desc = "scroll of Poison Cloud";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_POISON_CLOUD_LEVEL;
  this.spellnum = SPELL_POISON_CLOUD_ID;
}
ScrollPoisonCloudTile.prototype = new ScrollItemObject();

function ScrollProtectionTile() {
  this.name = "ScrollProtection";
  this.desc = "scroll of Protection";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_PROTECTION_LEVEL;
  this.spellnum = SPELL_PROTECTION_ID;
}
ScrollProtectionTile.prototype = new ScrollItemObject();

function ScrollUnlockTile() {
  this.name = "ScrollUnlock";
  this.desc = "scroll of Unlock";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_UNLOCK_LEVEL;
  this.spellnum = SPELL_UNLOCK_ID;
}
ScrollUnlockTile.prototype = new ScrollItemObject();

function ScrollDispelTile() {
  this.name = "ScrollDispel";
  this.desc = "scroll of Dispel";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_DISPEL_LEVEL;
  this.spellnum = SPELL_DISPEL_ID;
}
ScrollDispelTile.prototype = new ScrollItemObject();

function ScrollDisruptUndeadTile() {
  this.name = "ScrollDisruptUndead";
  this.desc = "scroll of Disrupt Undead";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_DISRUPT_UNDEAD_LEVEL;
  this.spellnum = SPELL_DISRUPT_UNDEAD_ID;
}
ScrollDisruptUndeadTile.prototype = new ScrollItemObject();

function ScrollFireArmorTile() {
  this.name = "ScrollFireArmor";
  this.desc = "scroll of Fire Armor";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_FIRE_ARMOR_LEVEL;
  this.spellnum = SPELL_FIRE_ARMOR_ID;
  this.flammable = 30;
}
ScrollFireArmorTile.prototype = new ScrollItemObject();

function ScrollFireballTile() {
  this.name = "ScrollFireball";
  this.desc = "scroll of Fireball";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_FIREBALL_LEVEL;
  this.spellnum = SPELL_FIREBALL_ID;
  this.flammable = 50;
}
ScrollFireballTile.prototype = new ScrollItemObject();

function ScrollIceballTile() {
  this.name = "ScrollIceball";
  this.desc = "scroll of Iceball";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_ICEBALL_LEVEL;
  this.spellnum = SPELL_ICEBALL_ID;
}
ScrollIceballTile.prototype = new ScrollItemObject();

function ScrollTelekinesisTile() {
  this.name = "ScrollTelekinesis";
  this.desc = "scroll of Telekinesis";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_TELEKINESIS_LEVEL;
  this.spellnum = SPELL_TELEKINESIS_ID;
}
ScrollTelekinesisTile.prototype = new ScrollItemObject();

function ScrollTelepathyTile() {
  this.name = "ScrollTelepathy";
  this.desc = "scroll of Telepathy";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_TELEPATHY_LEVEL;
  this.spellnum = SPELL_TELEPATHY_ID;
}
ScrollTelepathyTile.prototype = new ScrollItemObject();

function ScrollWallOfFlameTile() {
  this.name = "ScrollWallOfFlame";
  this.desc = "scroll of Wall of Flame";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_WALL_OF_FLAME_LEVEL;
  this.spellnum = SPELL_WALL_OF_FLAME_ID;
  this.flammable = 20;
}
ScrollWallOfFlameTile.prototype = new ScrollItemObject();

function ScrollBlessingTile() {
  this.name = "ScrollBlessing";
  this.desc = "scroll of Blessing";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_BLESSING_LEVEL;
  this.spellnum = SPELL_BLESSING_ID;
}
ScrollBlessingTile.prototype = new ScrollItemObject();

function ScrollBlinkTile() {
  this.name = "ScrollBlink";
  this.desc = "scroll of Blink";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_BLINK_LEVEL;
  this.spellnum = SPELL_BLINK_ID;
}
ScrollBlinkTile.prototype = new ScrollItemObject();

function ScrollEtherealVisionTile() {
  this.name = "ScrollEtherealVision";
  this.desc = "scroll of Ethereal Vision";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_ETHEREAL_VISION_LEVEL;
  this.spellnum = SPELL_ETHEREAL_VISION_ID;
}
ScrollEtherealVisionTile.prototype = new ScrollItemObject();

function ScrollHealTile() {
  this.name = "ScrollHeal";
  this.desc = "scroll of Heal";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_HEAL_LEVEL;
  this.spellnum = SPELL_HEAL_ID;
}
ScrollHealTile.prototype = new ScrollItemObject();

function ScrollLifeDrainTile() {
  this.name = "ScrollLifeDrain";
  this.desc = "scroll of Life Drain";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_LIFE_DRAIN_LEVEL;
  this.spellnum = SPELL_LIFE_DRAIN_ID;
}
ScrollLifeDrainTile.prototype = new ScrollItemObject();

function ScrollSmiteTile() {
  this.name = "ScrollSmite";
  this.desc = "scroll of Smite";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_SMITE_LEVEL;
  this.spellnum = SPELL_SMITE_ID;
}
ScrollSmiteTile.prototype = new ScrollItemObject();

function ScrollCrystalBarrierTile() {
  this.name = "ScrollCrystalBarrier";
  this.desc = "scroll of Crystal Barrier";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_CRYSTAL_BARRIER_LEVEL;
  this.spellnum = SPELL_CRYSTAL_BARRIER_ID;
}
ScrollCrystalBarrierTile.prototype = new ScrollItemObject();

function ScrollMirrorWardTile() {
  this.name = "ScrollMirrorWard";
  this.desc = "scroll of Mirror Ward";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_MIRROR_WARD_LEVEL;
  this.spellnum = SPELL_MIRROR_WARD_ID;
}
ScrollMirrorWardTile.prototype = new ScrollItemObject();

function ScrollParalyzeTile() {
  this.name = "ScrollParalyze";
  this.desc = "scroll of Paralyze";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_PARALYZE_LEVEL;
  this.spellnum = SPELL_PARALYZE_ID;
}
ScrollParalyzeTile.prototype = new ScrollItemObject();

function ScrollPeerTile() {
  this.name = "ScrollPeer";
  this.desc = "scroll of Peer";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_PEER_LEVEL;
  this.spellnum = SPELL_PEER_ID;
}
ScrollPeerTile.prototype = new ScrollItemObject();

function ScrollShockwaveTile() {
  this.name = "ScrollShockwave";
  this.desc = "scroll of Shockwave";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_SHOCKWAVE_LEVEL;
  this.spellnum = SPELL_SHOCKWAVE_ID;
}
ScrollShockwaveTile.prototype = new ScrollItemObject();

function ScrollSummonAllyTile() {
  this.name = "ScrollSummonAlly";
  this.desc = "scroll of Summon Ally";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_SUMMON_ALLY_LEVEL;
  this.spellnum = SPELL_SUMMON_ALLY_ID;
}
ScrollSummonAllyTile.prototype = new ScrollItemObject();

function ScrollSwordstrikeTile() {
  this.name = "ScrollSwordstrike";
  this.desc = "scroll of Swordstrike";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_SWORDSTRIKE_LEVEL;
  this.spellnum = SPELL_SWORDSTRIKE_ID;
}
ScrollSwordstrikeTile.prototype = new ScrollItemObject();

function ScrollExplosionTile() {
  this.name = "ScrollExplosion";
  this.desc = "scroll of Explosion";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_EXPLOSION_LEVEL;
  this.spellnum = SPELL_EXPLOSION_ID;
}
ScrollExplosionTile.prototype = new ScrollItemObject();

function ScrollStormTile() {
  this.name = "ScrollStorm";
  this.desc = "scroll of Storm";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_STORM_LEVEL;
  this.spellnum = SPELL_STORM_ID;
}
ScrollStormTile.prototype = new ScrollItemObject();

function ScrollTremorTile() {
  this.name = "ScrollTremor";
  this.desc = "scroll of Tremor";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_TREMOR_LEVEL;
  this.spellnum = SPELL_TREMOR_ID;
}
ScrollTremorTile.prototype = new ScrollItemObject();

function ScrollFearTile() {
  this.name = "ScrollFear";
  this.desc = "scroll of Fear";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_FEAR_LEVEL;
  this.spellnum = SPELL_FEAR_ID;
}
ScrollFearTile.prototype = new ScrollItemObject();

function ScrollFireAndIceTile() {
  this.name = "ScrollFireAndIce";
  this.desc = "scroll of Fire and Ice";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_FIRE_AND_ICE_LEVEL;
  this.spellnum = SPELL_FIRE_AND_ICE_ID;
}
ScrollFireAndIceTile.prototype = new ScrollItemObject();

function ScrollMeteorSwarmTile() {
  this.name = "ScrollMeteorSwarm";
  this.desc = "scroll of Meteor Swarm";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_METEOR_SWARM_LEVEL;
  this.spellnum = SPELL_METEOR_SWARM_ID;
}
ScrollMeteorSwarmTile.prototype = new ScrollItemObject();

function ScrollMindBlastTile() {
  this.name = "ScrollMindBlast";
  this.desc = "scroll of Mind Blast";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_MIND_BLAST_LEVEL;
  this.spellnum = SPELL_MIND_BLAST_ID;
}
ScrollMindBlastTile.prototype = new ScrollItemObject();

function ScrollConflagrationTile() {
  this.name = "ScrollConflagration";
  this.desc = "scroll of Conflagration";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_CONFLAGRATION_LEVEL;
  this.spellnum = SPELL_CONFLAGRATION_ID;
  this.flammable = 30;
}
ScrollConflagrationTile.prototype = new ScrollItemObject();

function ScrollConjureDaemonTile() {
  this.name = "ScrollConjureDaemon";
  this.desc = "scroll of Conjure Daemon";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_SUMMON_DAEMON_LEVEL;
  this.spellnum = SPELL_SUMMON_DAEMON_ID;
}
ScrollConjureDaemonTile.prototype = new ScrollItemObject();

function ScrollTimeStopTile() {
  this.name = "ScrollTimeStop";
  this.desc = "scroll of Time Stop";
  this.prefix = "a";
  this.graphic = "items.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-32";
  this.spelllevel = SPELL_TIME_STOP_LEVEL;
  this.spellnum = SPELL_TIME_STOP_ID;
}
ScrollTimeStopTile.prototype = new ScrollItemObject();

// Audachta

function AudachtaNemesosObject() {
  this.addType("Audachta");
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.spelllevel = 0;
  this.spellnum = 0;
  this.flammable = 40;
}
AudachtaNemesosObject.prototype = new ConsumableItemObject();

AudachtaNemesosObject.prototype.use = function(who) {
  var retval = {};
  retval["fin"] = 1;
  if (who.knowsSpell(this.spelllevel, this.spellnum)) {
    retval["txt"] = "You already know that spell!";
    retval["preserve"] = 1;
  } else {
    who.addSpell(this.spelllevel, this.spellnum);
    retval["txt"] = "You learn the spell " + this.spellname + "!";
  }
  retval["input"] = "&gt;";
  return retval;    
}

AudachtaNemesosObject.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " is ruined in the fire!");
  var thisx = this.getx();
  var thisy = this.gety();
  
  var itsmap = this.getHomeMap();
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap.getName(),thisx,thisy);
  
  return 1; 
}


function AudachtaNemesosAwakenTile() {
  this.name = "AudachtaNemesosAwaken";
  this.desc = "Audachta Nemesos: Awaken";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_AWAKEN_LEVEL;
  this.spellnum = SPELL_AWAKEN_ID;
  this.spellname = "Awaken";
}
AudachtaNemesosAwakenTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosDisarmTrapTile() {
  this.name = "AudachtaNemesosDisarmTrap";
  this.desc = "Audachta Nemesos: Disarm Trap";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_DISARM_TRAP_LEVEL;
  this.spellnum = SPELL_DISARM_TRAP_ID;
  this.spellname = "Disarm Trap";
}
AudachtaNemesosDisarmTrapTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosDistractTile() {
  this.name = "AudachtaNemesosDistract";
  this.desc = "Audachta Nemesos: Distract";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_DISTRACT_LEVEL;
  this.spellnum = SPELL_DISTRACT_ID;
  this.spellname = "Distract";
}
AudachtaNemesosDistractTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFlameBladeTile() {
  this.name = "AudachtaNemesosFlameBlade";
  this.desc = "Audachta Nemesos: Flame Blade";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_FLAME_BLADE_LEVEL;
  this.spellnum = SPELL_FLAME_BLADE_ID;
  this.spellname = "Flame Blade";
}
AudachtaNemesosFlameBladeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosVulnerabilityTile() {
  this.name = "AudachtaNemesosVulnerability";
  this.desc = "Audachta Nemesos: Vulnerability";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_VULNERABILITY_LEVEL;
  this.spellnum = SPELL_VULNERABILITY_ID;
  this.spellname = "Vulnerability";
}
AudachtaNemesosVulnerabilityTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosLesserHealTile() {
  this.name = "AudachtaNemesosLesserHeal";
  this.desc = "Audachta Nemesos: Lesser Heal";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_LESSER_HEAL_LEVEL;
  this.spellnum = SPELL_LESSER_HEAL_ID;
  this.spellname = "Lesser Heal";
}
AudachtaNemesosLesserHealTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosPoisonCloudTile() {
  this.name = "AudachtaNemesosPoisonCloud";
  this.desc = "Audachta Nemesos: Poison Cloud";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_POISON_CLOUD_LEVEL;
  this.spellnum = SPELL_POISON_CLOUD_ID;
  this.spellname = "Poison Cloud";
}
AudachtaNemesosPoisonCloudTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosProtectionTile() {
  this.name = "AudachtaNemesosProtection";
  this.desc = "Audachta Nemesos: Protection";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_PROTECTION_LEVEL;
  this.spellnum = SPELL_PROTECTION_ID;
  this.spellname = "Protection";
}
AudachtaNemesosProtectionTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosWindChangeTile() {
  this.name = "AudachtaNemesosWindChange";
  this.desc = "Audachta Nemesos: Wind Change";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_WIND_CHANGE_LEVEL;
  this.spellnum = SPELL_WIND_CHANGE_ID;
  this.spellname = "Wind Change";
}
AudachtaNemesosWindChangeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFireArmorTile() {
  this.name = "AudachtaNemesosFireArmor";
  this.desc = "Audachta Nemesos: Fire Armor";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_FIRE_ARMOR_LEVEL;
  this.spellnum = SPELL_FIRE_ARMOR_ID;
  this.spellname = "Fire Armor";
}
AudachtaNemesosFireArmorTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosIceballTile() {
  this.name = "AudachtaNemesosIceball";
  this.desc = "Audachta Nemesos: Iceball";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_ICEBALL_LEVEL;
  this.spellnum = SPELL_ICEBALL_ID;
  this.spellname = "Iceball";
}
AudachtaNemesosIceballTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTelekinesisTile() {
  this.name = "AudachtaNemesosTelekinesis";
  this.desc = "Audachta Nemesos: Telekinesis";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_TELEKINESIS_LEVEL;
  this.spellnum = SPELL_TELEKINESIS_ID;
  this.spellname = "Telekinesis";
}
AudachtaNemesosTelekinesisTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTelepathyTile() {
  this.name = "AudachtaNemesosTelepathy";
  this.desc = "Audachta Nemesos: Telepathy";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_TELEPATHY_LEVEL;
  this.spellnum = SPELL_TELEPATHY_ID;
  this.spellname = "Telepathy";
}
AudachtaNemesosTelepathyTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosWallOfFlameTile() {
  this.name = "AudachtaNemesosWallOfFlame";
  this.desc = "Audachta Nemesos: Wall of Flame";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_WALL_OF_FLAME_LEVEL;
  this.spellnum = SPELL_WALL_OF_FLAME_ID;
  this.spellname = "Wall of Flame";
}
AudachtaNemesosWallOfFlameTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosBlessingTile() {
  this.name = "AudachtaNemesosBlessing";
  this.desc = "Audachta Nemesos: Blessing";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_BLESSING_LEVEL;
  this.spellnum = SPELL_BLESSING_ID;
  this.spellname = "Blessing";
}
AudachtaNemesosBlessingTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosHealTile() {
  this.name = "AudachtaNemesosHeal";
  this.desc = "Audachta Nemesos: Heal";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_HEAL_LEVEL;
  this.spellnum = SPELL_HEAL_ID;
  this.spellname = "Heal";
}
AudachtaNemesosHealTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosLifeDrainTile() {
  this.name = "AudachtaNemesosLifeDrain";
  this.desc = "Audachta Nemesos: Life Drain";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_LIFE_DRAIN_LEVEL;
  this.spellnum = SPELL_LIFE_DRAIN_ID;
  this.spellname = "Life Drain";
}
AudachtaNemesosLifeDrainTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosSmiteTile() {
  this.name = "AudachtaNemesosSmite";
  this.desc = "Audachta Nemesos: Smite";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_SMITE_LEVEL;
  this.spellnum = SPELL_SMITE_ID;
  this.spellname = "Smite";
}
AudachtaNemesosSmiteTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosOpenGateTile() {
  this.name = "AudachtaNemesosOpenGate";
  this.desc = "Audachta Nemesos: Open Gate";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_OPEN_GATE_LEVEL;
  this.spellnum = SPELL_OPEN_GATE_ID;
  this.spellname = "Open Gate";
}
AudachtaNemesosOpenGateTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosCrystalBarrierTile() {
  this.name = "AudachtaNemesosCrystalBarrier";
  this.desc = "Audachta Nemesos: Crystal Barrier";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_CRYSTAL_BARRIER_LEVEL;
  this.spellnum = SPELL_CRYSTAL_BARRIER_ID;
  this.spellname = "Crystal Barrier";
}
AudachtaNemesosCrystalBarrierTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosMirrorWardTile() {
  this.name = "AudachtaNemesosMirrorWard";
  this.desc = "Audachta Nemesos: Mirror Ward";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_MIRROR_WARD_LEVEL;
  this.spellnum = SPELL_MIRROR_WARD_ID;
  this.spellname = "Mirror Ward";
}
AudachtaNemesosMirrorWardTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosParalyzeTile() {
  this.name = "AudachtaNemesosParalyze";
  this.desc = "Audachta Nemesos: Paralyze";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_PARALYZE_LEVEL;
  this.spellnum = SPELL_PARALYZE_ID;
  this.spellname = "Paralyze";
}
AudachtaNemesosParalyzeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosReturnTile() {
  this.name = "AudachtaNemesosReturn";
  this.desc = "Audachta Nemesos: Return";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_RETURN_LEVEL;
  this.spellnum = SPELL_RETURN_ID;
  this.spellname = "Return";
}
AudachtaNemesosReturnTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosShockwaveTile() {
  this.name = "AudachtaNemesosShockwave";
  this.desc = "Audachta Nemesos: Shockwave";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_SHOCKWAVE_LEVEL;
  this.spellnum = SPELL_SHOCKWAVE_ID;
  this.spellname = "Shockwave";
}
AudachtaNemesosShockwaveTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosSummonAllyTile() {
  this.name = "AudachtaNemesosSummonAlly";
  this.desc = "Audachta Nemesos: Summon Ally";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_SUMMON_ALLY_LEVEL;
  this.spellnum = SPELL_SUMMON_ALLY_ID;
  this.spellname = "Summon Ally";
}
AudachtaNemesosSummonAllyTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosSwordstrikeTile() {
  this.name = "AudachtaNemesosSwordstrike";
  this.desc = "Audachta Nemesos: Swordstrike";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_SWORDSTRIKE_LEVEL;
  this.spellnum = SPELL_SWORDSTRIKE_ID;
  this.spellname = "Swordstrike";
}
AudachtaNemesosSwordstrikeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosEmpowerTile() {
  this.name = "AudachtaNemesosEmpower";
  this.desc = "Audachta Nemesos: Empower";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_EMPOWER_LEVEL;
  this.spellnum = SPELL_EMPOWER_ID;
  this.spellname = "Empower";
}
AudachtaNemesosEmpowerTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosExplosionTile() {
  this.name = "AudachtaNemesosExplosion";
  this.desc = "Audachta Nemesos: Explosion";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-190";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_EXPLOSION_LEVEL;
  this.spellnum = SPELL_EXPLOSION_ID;
  this.spellname = "Explosion";
}
AudachtaNemesosExplosionTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosJinxTile() {
  this.name = "AudachtaNemesosJinx";
  this.desc = "Audachta Nemesos: Jinx";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_JINX_LEVEL;
  this.spellnum = SPELL_JINX_ID;
  this.spellname = "Jinx";
}
AudachtaNemesosJinxTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosNegateMagicTile() {
  this.name = "AudachtaNemesosNegateMagic";
  this.desc = "Audachta Nemesos: Negate Magic";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_NEGATE_MAGIC_LEVEL;
  this.spellnum = SPELL_NEGATE_MAGIC_ID;
  this.spellname = "Negate Magic";
}
AudachtaNemesosNegateMagicTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTremorTile() {
  this.name = "AudachtaNemesosTremor";
  this.desc = "Audachta Nemesos: Tremor";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_TREMOR_LEVEL;
  this.spellnum = SPELL_TREMOR_ID;
  this.spellname = "Tremor";
}
AudachtaNemesosTremorTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosWeatherControlTile() {
  this.name = "AudachtaNemesosWeatherControl";
  this.desc = "Audachta Nemesos: Weather Control";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_WEATHER_CONTROL_LEVEL;
  this.spellnum = SPELL_WEATHER_CONTROL_ID;
  this.spellname = "Weather Control";
}
AudachtaNemesosWeatherControlTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosCharmTile() {
  this.name = "AudachtaNemesosCharm";
  this.desc = "Audachta Nemesos: Charm";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_CHARM_LEVEL;
  this.spellnum = SPELL_CHARM_ID;
  this.spellname = "Charm";
}
AudachtaNemesosCharmTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFearTile() {
  this.name = "AudachtaNemesosFear";
  this.desc = "Audachta Nemesos: Fear";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_FEAR_LEVEL;
  this.spellnum = SPELL_FEAR_ID;
  this.spellname = "Fear";
}
AudachtaNemesosFearTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFireAndIceTile() {
  this.name = "AudachtaNemesosFireAndIce";
  this.desc = "Audachta Nemesos: Fire and Ice";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_FIRE_AND_ICE_LEVEL;
  this.spellnum = SPELL_FIRE_AND_ICE_ID;
  this.spellname = "Fire and Ice";
}
AudachtaNemesosFireAndIceTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosMeteorSwarmTile() {
  this.name = "AudachtaNemesosMeteorSwarm";
  this.desc = "Audachta Nemesos: Meteor Swarm";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_METEOR_SWARM_LEVEL;
  this.spellnum = SPELL_METEOR_SWARM_ID;
  this.spellname = "Meteor Swarm";
}
AudachtaNemesosMeteorSwarmTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosMindBlastTile() {
  this.name = "AudachtaNemesosMindBlast";
  this.desc = "Audachta Nemesos: Mind Blast";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_MIND_BLAST_LEVEL;
  this.spellnum = SPELL_MIND_BLAST_ID;
  this.spellname = "Mind Blast";
}
AudachtaNemesosMindBlastTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosArrowOfGlassTile() {
  this.name = "AudachtaNemesosArrowOfGlass";
  this.desc = "Audachta Nemesos: Arrow of Glass";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_ARROW_OF_GLASS_LEVEL;
  this.spellnum = SPELL_ARROW_OF_GLASS_ID;
  this.spellname = "Arrow of Glass";
}
AudachtaNemesosArrowOfGlassTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosBuildGateTile() {
  this.name = "AudachtaNemesosBuildGate";
  this.desc = "Audachta Nemesos: Build Gate";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_BUILD_GATE_LEVEL;
  this.spellnum = SPELL_BUILD_GATE_ID;
  this.spellname = "Build Gate";
}
AudachtaNemesosBuildGateTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosConflagrationTile() {
  this.name = "AudachtaNemesosConflagration";
  this.desc = "Audachta Nemesos: Conflagration";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_CONFLAGRATION_LEVEL;
  this.spellnum = SPELL_CONFLAGRATION_ID;
  this.spellname = "Conflagration";
}
AudachtaNemesosConflagrationTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosConjureDaemonTile() {
  this.name = "AudachtaNemesosConjureDaemon";
  this.desc = "Audachta Nemesos: Conjure Daemon";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_CONJURE_DAEMON_LEVEL;
  this.spellnum = SPELL_CONJURE_DAEMON_ID;
  this.spellname = "Conjure Daemon";
}
AudachtaNemesosConjureDaemonTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosQuicknessTile() {
  this.name = "AudachtaNemesosQuickness";
  this.desc = "Audachta Nemesos: Quickness";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_QUICKNESS_LEVEL;
  this.spellnum = SPELL_QUICKNESS_ID;
  this.spellname = "Quickness";
}
AudachtaNemesosQuicknessTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosReincarnateTile() {
  this.name = "AudachtaNemesosReincarnate";
  this.desc = "Audachta Nemesos: Reincarnate";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_REINCARNATE_LEVEL;
  this.spellnum = SPELL_REINCARNATE_ID;
  this.spellname = "Reincarnate";
}
AudachtaNemesosReincarnateTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTimeStopTile() {
  this.name = "AudachtaNemesosTimeStop";
  this.desc = "Audachta Nemesos: Time Stop";
  this.prefix = "an";
  this.graphic = "items.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-160";
  this.spelllevel = SPELL_TIME_STOP_LEVEL;
  this.spellnum = SPELL_TIME_STOP_ID;
  this.spellname = "Time Stop";
}
AudachtaNemesosTimeStopTile.prototype = new AudachtaNemesosObject();

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
    if (currentarmor && (currentarmor !== this)) {
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
    if (currentmissile && (currentmissile !== this)) {
      currentmissile.unEquipMe();
    }
    this.setEquippedTo(who);
    who.setMissile(this);
  }

  else if (this.checkType("Weapon")) {
    var currentweapon = who.getWeapon();
    if (currentweapon && (currentweapon !== this)) {
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "exotic armor";
}
ExoticArmorTile.prototype = new ArmorObject();

// WEAPONS

function WeaponObject() {
	this.hit = 0;
	this.reduceArmor = 0;
	this.damage = "1d1+0";
	this.strdamage = 0;
	this.hitSound = "sfx_melee_hit";
	this.missSound = "sfx_melee_miss";
	
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
  var dmgobj = Dice.parse(this.getDamage());
  
  return dmgobj;
}

WeaponObject.prototype.rollDamage = function(wielder) {
  var damage = Dice.roll(this.getDamage());
  if (wielder && this.getStrDamage()) {
    var str = wielder.getStr();
    var strmod = parseFloat(this.getStrDamage());
    var strdam = (str-10)*strmod;
    damage += parseInt(strdam);
  }
  
  var fb = wielder.getSpellEffectsByName("FlameBlade");
  if (wielder && fb) {
    if (debug && (debugflags.magic || debugflags.combat)) { dbs.writeln("<span style='color:green'>Flame blade adds " + fb.damage + " damage.<br /></span>"); }
    if (!DebugWrite("magic", "Flame blade adds " + fb.damage + "damage.<br />")) {
      DebugWrite("combat", "Flame blade adds " + fb.damage + "damage.<br />");
    }
    damage += parseInt(Dice.roll(fb.damage));
    fb.doEffect();
  }
  return damage;
}

WeaponObject.prototype.getAveDamage = function(wielder) {
//  var dmgobj = this.parseDamage();
//  var damage = dmgobj.plus;
//  damage += (dmgobj.quantity * (dmgobj.dice + 1)/2);
  var damage = Dice.rollave(this.getDamage());
  if (wielder && this.getStrDamage()) {
    var str = wielder.getStr();
    var strmod = parseFloat(this.getStrDamage());
    var strdam = (str-10)*strmod;
    damage += parseInt(strdam);
  }
  return damage;
}

WeaponObject.prototype.getMissSound = function() {
	return this.missSound;
}

WeaponObject.prototype.setMissSound = function(newsnd) {
	this.missSound = newsnd;
	return this.missSound;
}

WeaponObject.prototype.getHitSound = function() {
	return this.hitSound;
}

WeaponObject.prototype.setHitSound = function(newsnd) {
	this.hitSound = newsnd;
	return this.hitSound;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "magic sword";
	this.prefix = "a";
}
MagicSwordTile.prototype = new WeaponObject();

function UnenchantedSwordTile() {
  this.name = "UnenchantedSword";
  this.damage = "4d6+10";  // when broken, 2d4
  this.strdamage = .5;
  this.graphic = "magic-sword.gif";
  this.spritexoffset = "-32";
  this.desc = "unenchanted sword";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.prefix = "an";
	
  this.brokendesc = "unenchanted, broken sword";
  this.repairNeedsInfusion = 1;
  Breakable.call(this,["magic-sword.gif", "", "0", "0"]);
}
UnenchantedSwordTile.prototype = new WeaponObject();

UnenchantedSwordTile.prototype.activate = function() {
  this.break();
}

function NaturalWeaponTile() {
	this.name = "NaturalWeapon";
	this.damage = "1d5+0";
	this.strdamage = 1;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "0";
	this.spriteyoffset = "-32";
	this.desc = "natural weapon";
	this.prefix = "a";
	this.hitSound = "sfx_animal_hit";
	this.missSound = "sfx_melee_miss";
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
  this.hitSound = "sfx_missile_hit";
  this.missSound = "sfx_missile_miss";

	
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
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
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.spritexoffset = "-96";
	this.spriteyoffset = "-64";
	this.desc = "magic wand";
	this.prefix = "a";
  this.ammoxoffset = "-64";
  this.ammoyoffset = "-128";
  this.hitSound = "sfx_wand_zap";
  this.missSound = "sfx_wand_zap";

}
WandTile.prototype = new MissileWeaponObject();

function MagicAxeTile() {
	this.name = "MagicAxe";
	this.damage = "4d12+12";
	this.graphic = "armorweapons.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.spritexoffset = "-128";
	this.spriteyoffset = "-64";
	this.dexReq = 22;
	this.desc = "magic axe";
	this.prefix = "a";
  this.ammoxoffset = "0";
  this.ammoyoffset = "-128";
  this.ammoReturn = 1;
  this.hitSound = "sfx_magic_axe_hit";
  this.missSound = "sfx_magic_axe_miss";
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
  this.hitSound = "sfx_boulder_hit";
  this.missSouns = "sfx_bounder_miss";
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
	this.orbstr = 0;
	this.orbdex = 0;
	this.orbint = 0;
	this.hp = 10;
	this.maxhp = 10;
	this.mana = 10;
	this.maxmana = 10;
	this.level = 1;
//	this.type = "npc";
	this.npcname = "myname";
	this.desc = "an NPC";
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "runaway";
	this.forgetAt = 0;
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
	this.meleeHitSound = "";
	this.meleeMissSound = "";
	this.missileHitSound = "";
	this.missileMissSound = "";
	this.initmult = 1;
	this.movetype = MOVE_WALK;
	this.meleeChance = 100;
  this.gold = 0;
	this.leavesCorpse = "";
	this.lootTable = "";
	this.lastTurnTime = 0;
	this.knowsInfusion = 0;
	this.conversation = "";
	this.conversationflag = "";
	this.merch = "";
	this.spawnedBy;
	this.special = "";
	this.nextMana = 0;
	this.nextHP = 0;
	this.leash = 0;
	this.barkfreq = 0;
	this.bark = 0;
	this.barkrad = 0;
	this.aggro = 0;
	this.npcband = 0;
	this.wait;
	this.xpval = 0;
	
	LightEmitting.call(this, 0);
	
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
  if (DU.gameflags.getFlag(knowsflag)) {
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
	if (this.mana < 0) { this.mana = 0; }
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

NPCObject.prototype.getAggro = function() {
  return this.aggro;
}

NPCObject.prototype.setAggro = function(aggro) {
  this.aggro = aggro;
  return this.aggro;
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

NPCObject.prototype.getLeash = function() {
  return this.leash;
}

NPCObject.prototype.setLeash = function(radius) {
  this.leash = parseInt(radius);
  return this.leash;
}

NPCObject.prototype.getNPCBand = function() {
  return this.npcband;
}

NPCObject.prototype.setNPCBand = function(bandname) {
  this.npcband = bandname;
  return this.npcband;
}

NPCObject.prototype.getBark = function() {
  return this.bark;
}

NPCObject.prototype.setBark = function(bark) {
  this.bark = bark;
  return this.bark;
}

NPCObject.prototype.getBarkFreq = function() {
  return this.barkfreq;
}

NPCObject.prototype.setBarkFreq = function(freq) {
  // frequency is %
  this.barkfreq = parseInt(freq);
  return this.barkfreq;
}

NPCObject.prototype.getBarkRad = function() {
  return this.barkrad;
}

NPCObject.prototype.setBarkRad = function(radius) {
  this.barkrad = parseInt(radius);
  return this.barkrad;
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
  this.setConversationFlag("");
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

NPCObject.prototype.dealDamage = function(dmg, src, type) {
  var isasleep = this.getSpellEffectsByName("Sleep");
  if (isasleep) {
    isasleep.endEffect();
  }
  var isfrozen = this.getSpellEffectsByName("Frozen");
  if (isfrozen) {
    isfrozen.endEffect();
  }
  var isinvuln = this.getSpellEffectsByName("Invulnerable");
  if (isinvuln) {
    dmg = 0;
  }

  dmg = CheckAbsorb(dmg,this,src,type);
  this.modHP(dmg*-1);
  if (this.getHP() <= 0) { // killed!
    this.processDeath(1);
    if (src === PC) {
      var XP = this.getXPVal();
      PC.addxp(XP);
    }
    return -1;
  }
  else { return dmg; }
}

NPCObject.prototype.processDeath = function(droploot){
  var thisx = this.getx();
  var thisy = this.gety();
  if (targetCursor.lastTarget === this) { delete targetCursor.lastTarget; }
  if (this.checkType("PC")) {
    // just in case you died on your turn:
    gamestate.setMode("null");
    maintext.delayedAddText("You have died!");
    var newmap = new GameMap();
    if (maps.getMap("landsbeyond")) {
      newmap = maps.getMap("landsbeyond");
      // though I'm confused about why this is already in memory!
    } else {
      newmap.loadMap("landsbeyond");
      maps.addMapByRef(newmap);
    }
    var tile = MoveBetweenMaps(this,this.getHomeMap(),newmap, 7, 7);
    var spellobjs = this.getSpellEffects();
    if (spellobjs.length) {
      for (var i = 0; i < spellobjs.length; i++ ) {
        if (spellobjs[i].getExpiresTime() !== -1) {
          spellobjs[i].endEffect();
        }
      }
    }
    $("#mainview").fadeOut(2600, function() {
      maintext.addText("You find yourself floating bodiless in the void.");
      DrawMainFrame("draw", "landsbeyond", 7,7);
      $("#mainview").css('display','none');
      $("#mainview").fadeIn(2000, "swing", function() {
        DrawTopbarFrame("<p>" + newmap.getDesc() + "</p>");
        maintext.addText("There is nought to do but meditate upon your life, and the triumphs and errors it contained.");
        setTimeout(function() {
          maintext.addText("Suddenly a voice cries out in the darkness!");
          setTimeout(function() {
            maintext.addText('"The world is not finished with thee, ' + PC.getPCName() + '!"');
            setTimeout(function() {
              maintext.addText('"By the strength of this land I bid thee return!"');
              setTimeout(function() {
                maintext.addText("All is light...");
                setTimeout(function() {
                  // play sound effect
                  var returnmap = new GameMap();
                  if (maps.getMap("olympus1")) {
                    returnmap = maps.getMap("olympus1");
                    // though again, this shouldn't be in memory
                  } else {
                    returnmap.loadMap("olympus1");
                    maps.addMapByRef(returnmap);
                  }
                  tile = MoveBetweenMaps(PC,PC.getHomeMap(),returnmap,29,16);
                  DrawMainFrame("draw","olympus1",29,16);
                  PC.setHP(PC.getMaxHP());
                  PC.setMana(PC.getMaxMana());
                  DrawCharFrame();
                  gamestate.setMode("player");
                  gamestate.setTurn(PC);
                }, 2000);
              }, 2000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    });
    return;
  } else {
    var corpse = {};
    var chest;
    var map = this.getHomeMap();
    if ((this.getLeavesCorpse()) && (this.getLeavesCorpse() !== "none")) {
      corpse = localFactory.createTile(this.getLeavesCorpse());
      corpse.setSearchDelete(1);
      map.placeThing(thisx,thisy, corpse);
    } else {
      chest = localFactory.createTile("Chest");
    }
    if ((droploot) && (this.lootTable !== "none")) {
      var loottables = this.lootTable.split(",");
      for (var i=0;i<loottables.length;i++) {
        var loot = {};
        if (DULoot[loottables[i]]) {
          loot = DULoot[loottables[i]].getLoot(); 
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
            var totgold = loot.gold;
            if (this.stolengold) { totgold += this.stolengold; }

            if (chest) {
              chest.addToContainer("Gold", totgold);
            } else {
              corpse.addToSearchYield("Gold");
              corpse.setGold(corpse.getGold() + totgold);
            }
          }
        }
        else {alert (this.getName() + " has a loottable that is not defined."); }
      }
    }
    if ((chest) && (chest.container.length)) {
      var trapname = GetStrongestTrap(loottables);
      if (trapname) {
        DebugWrite("gameobj", "Chest created, might be trapped with: " + trapname + ".<br />");
        var trap = DUTraps[trapname].getTrap();
        if (trap.trap) {
          chest.setTrap(trap.trap, trap.level);
        }
      }
      map.placeThing(thisx,thisy, chest);
    }
    map.deleteThing(this);
    if (map.getName() === "shadow1") {
      var npcs = map.npcs.getAll();
      var safe = 1;
      $.each(npcs, function(idx, val) {
        if (val.getNPCBand()) {
          safe = 0;
        }
      });
      if (safe === 1) { DU.gameflags.setFlag("shadow_safe", 1); } 
    }
    DrawMainFrame("one",map.getName(),thisx,thisy);
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
  if (newgender === "") { newgender = "monster"; }
  if ((newgender === "male") || (newgender === "female") || (newgender === "other") || (newgender === "neuter") || (newgender === "monster")) { this.gender = newgender; }
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

NPCObject.prototype.getMeleeHitSound = function() {
  return this.meleeHitSound;
}

NPCObject.prototype.setMeleeHitSound = function(newsnd) {
  this.meleeHitSound = newsnd;
  return this.meleeHitSound;
}

NPCObject.prototype.getMissileHitSound = function() {
  return this.missileHitSound;
}

NPCObject.prototype.setMissileHitSound = function(newsnd) {
  this.missleHitSound = newsnd;
  return this.missleHitSound;
}

NPCObject.prototype.getMeleeMissSound = function() {
  return this.meleeMissSound;
}

NPCObject.prototype.setMeleeMissSound = function(newsnd) {
  this.meleeMissSound = newsnd;
  return this.meleeMissSound;
}

NPCObject.prototype.getMissileMissSound = function() {
  return this.missileMissSound;
}

NPCObject.prototype.setMissileMissSound = function(newsnd) {
  this.missleMissSound = newsnd;
  return this.missleMissSound;
}

NPCObject.prototype.getOnHit = function() {
  // OnHit is what happens when the NPC hits something
  return this.onHit;
}

NPCObject.prototype.setOnHit = function(newoh) {
  this.onHit = newoh;
  return this.onHit;
}

NPCObject.prototype.setStr = function(newstr) {
	newstr = parseInt(newstr);
	if ((newstr !== 0) && (!isNaN(newstr))) { this.str = newstr; }
}

NPCObject.prototype.setBaseStr = function(newstr) {
  this.setStr(newstr);
}

NPCObject.prototype.getStr = function() {
  var str = this.getBaseStr() + this.getModStr() + this.getOrbStr();
  str = Math.max(str,3);
	return str;
}

NPCObject.prototype.getModStr = function() {
  return this.modstr;
}

NPCObject.prototype.getOrbStr = function() {
  return this.orbstr;
}

NPCObject.prototype.setModStr = function(newstr) {
  newstr = parseInt(newstr);
  if (!isNaN(newstr)) { this.modstr = newstr; }
  return this.getStr();
}

NPCObject.prototype.setOrbStr = function(newstr) {
  newstr = parseInt(newstr);
  if (!isNaN(newstr)) { this.orbstr = newstr; }
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

NPCObject.prototype.setOrbDex = function(newdex) {
	newdex = parseInt(newdex);
	if (!isNaN(newdex)) { this.orbdex = newdex; }
}

NPCObject.prototype.getDex = function() {
  var dex = this.getBaseDex() + this.getModDex() + this.getOrbDex();
  dex = Math.max(dex,3);
	return dex;
}

NPCObject.prototype.getBaseDex = function() {
  return this.dex;
}

NPCObject.prototype.getModDex = function() {
  return this.moddex;
}

NPCObject.prototype.getOrbDex = function() {
  return this.orbdex;
}

NPCObject.prototype.setModDex = function(newdex) {
  newdex = parseInt(newdex);
  if (!isNaN(newdex)) { this.moddex = newdex; }
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
  if (!isNaN(newint)) { this.modint = newint; }
  return this.getInt();
}

NPCObject.prototype.setOrbInt = function(newint) {
  newint = parseInt(newint);
  if (!isNaN(newint)) { this.orbint = newint; }
  return this.getInt();
}

NPCObject.prototype.getInt = function() {
  var theint = this.getBaseInt() + this.getModInt() + this.getOrbInt();
  theint = Math.max(theint, 3);
	return theint;
}

NPCObject.prototype.getBaseInt = function() {
  return this.int;
}

NPCObject.prototype.getModInt = function() {
  return this.modint;
}

NPCObject.prototype.getOrbInt = function() {
  return this.orbint;
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

NPCObject.prototype.getXPVal = function() {
  if (this.xpval) { return this.xpval; }
	return this.level * XP_MULTIPLIER;
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

NPCObject.prototype.getForgetAt = function() {
	return this.forgetAt;
}

NPCObject.prototype.setForgetAt = function(newAt) {
	this.forgetAt = newAt;
	return this.forgetAt;
}

NPCObject.prototype.getCurrentAI = function() {
	return this.currentAI;
}

NPCObject.prototype.setCurrentAI = function(newAI) {
	this.currentAI = newAI;
	return this.currentAI;
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

  if (this.getSpellEffectsByName("TimeStop")) { return 0; }
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
//        if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: That spell is already on the target.<br /></span>"); }
        DebugWrite("magic", "That spell is already on the target.<br />");
        if (otherEffects[i].getPower() > spellobj.getPower()) {  // keep old one, extend it
          var adddur = (1/(totin - 1))*(spellobj.getPower() / otherEffects[i].getPower()) * (spellobj.getExpiresTime() - DU.DUTime.getGameClock());
//          if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: Old one is stronger, extending by " + adddur + ".<br /></span>"); }
          DebugWrite("magic", "Old one is stronger, extending by " + adddur + ".<br />");
          otherEffects[i].setExpiresTime(otherEffects[i].getExpiresTime() + adddur);
          otherEffects[i].setInstances(otherEffects[i].getInstances() + spellobj.getInstances());
          otherEffects[i].mergeSpells("old");
          addme = 0; 
//          maintext.addText("The existing spell is revitalized!");
          return 0;
        } else {
          var adddur = (1/(totin - 1))*(otherEffects[i].getPower() / spellobj.getPower()) * (otherEffects[i].getExpiresTime() - DU.DUTime.getGameClock());
          spellobj.setExpiresTime(spellobj.getExpiresTime() + adddur);
//          if (debug && debugflags.magic) { dbs.writeln("<span style='color:green'>Magic: New one is stronger. Replacing old and extending new by " + adddur + ".<br /></span>"); }
          DebugWrite("magic", "New one is stronger. Replacing old and extending new by " + adddur + ".<br />");
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

NPCObject.prototype.getTarget = function() {
  return this.target;
}

NPCObject.prototype.setTarget = function(newtarg) {
  this.target = newtarg;
  return this.target;
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

//    this.target = {};
    
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

    this.maxhp = this.level * 10 + Dice.roll("1d10-6");
    if (this.addhp) { this.maxhp += this.addhp; }
    this.hp = this.maxhp;
    

    DebugWrite("ai", "<span style='font-weight:bold'>NPC " + this.getName() + "(" + this.getSerial() + ") activating.</span><br />");
  
    if (this.overrideGraphic) {
      this.graphic = this.overrideGraphic;
    } else if (this.altgraphic.length) {
      this.altgraphic.push(this.graphic);
      this.graphic = PickOne(this.altgraphic);
      this.altgraphic = []; // no longer need to store this
    }
  
    this.setMana(-1);
    this.setMaxMana(-1);
  
    if (this.getHomeMap().getName().indexOf("combat") !== -1) {
      DebugWrite("ai","Setting AI to combat because of being on a combat map.<br />");
      this.setCurrentAI("combat");
    } else {
      DebugWrite("ai","Setting AI to " + this.getPeaceAI() + ". <br />");
      this.setCurrentAI(this.getPeaceAI());
    }
  
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
    
    this.specials = {};
    var tmpspc = {};
    if (this.special) {
      var tmp = this.special.replace(" ","");
      tmp = tmp.split(",");
      for (var i=0; i<tmp.length;i++){
        if (tmp[i].indexOf(":") > -1) {
          var bluh = tmp[i].split(":");
          tmpspc[bluh[0]] = bluh[1];
          if (typeof NPCSpecialFuncs[bluh[0]] === "function") {
            var ret = NPCSpecialFuncs[bluh[0]](this, bluh[1]);
            if (ret) { tmpspc[bluh[0]] = ret; }
          }
        } else {
          tmpspc[tmp[i]] = 1;
          if (typeof NPCSpecialFuncs[tmp[i]] === "function") {
            var ret = NPCSpecialFuncs[tmp[i]](this);
            if (ret) { tmpspc[tmp[i]] = ret; }
          }
        }
      }
      this.specials = tmpspc;
    }
                  
    var timing = this.nextActionTime(0);
    timing = timing/2;
    if (timeoverride) {
      timing = timeoverride;
    }
    timing = timing + (Math.random() / 500);

//    if (debug && (debugflags.ai || debugflags.time)) {
//      dbs.writeln("<span style='color:green;font-weight:bold'>Curr time: " + DUTime.getGameClock() + ", NPC will go in " + timing + ".</span><br />");
//    }
    DebugWrite("ai", "Curr time: " + DUTime.getGameClock().toFixed(5) + ", NPC will go in " + timing + ".<br />");
  
    this.startx = this.getx();
    this.starty = this.gety();
    
    this.nextMana = DUTime.getGameClock() + MANA_REGEN;
    this.nextHP = DUTime.getGameClock() + HP_REGEN;
    
    var NPCEvent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCEvent,timing);  
    
  }
}


NPCObject.prototype.moveMe = function(diffx,diffy,noexit) {
	var map = this.getHomeMap();
	var oldmapname = map.getDesc();
	var startx = this.getx();
	var starty = this.gety();
	var passx = startx + parseInt(diffx);
	var passy = starty + parseInt(diffy);
	var tile = map.getTile(passx,passy);
	var retval = { fin:1 };
	if (tile === "OoB") { 
	  if (noexit) {
	    // NPC won't step out of the map
	    DebugWrite("map", this.getDesc() + " won't move out of the map.<br />");
	    retval["canmove"] = 0;
	    retval["diffx"] = diffx;
	    retval["diffy"] = diffy;
	    return retval;
	  }
		if (map.getExitToMap()) {
		  DebugWrite("map", this.getDesc() + " exiting the map: ");
			var newmap = new GameMap();
			if (maps.getMap(map.getExitToMap())) {
			  DebugWrite("map", "destination map already exists.<br />");
				newmap = maps.getMap(map.getExitToMap());
			} else {
			  DebugWrite("map", "destination map needs to be loaded.<br />");
				newmap.loadMap(map.getExitToMap());
				maps.addMapByRef(newmap);
			}
			tile = MoveBetweenMaps(this,map,newmap,map.getExitToX(),map.getExitToY());
			if (tile) {
  			DebugWrite("map", "Exited from MoveBetweenMaps. New map is " + this.getHomeMap().getName() + ".<br />");
        retval["canmove"] = 0;
		  	if (this === PC) {
			  	DrawMainFrame("draw", newmap.getName() , PC.getx(), PC.gety());
				  DrawTopbarFrame("<p>" + newmap.getDesc() + "</p>");
  				retval["msg"] = ".<br />Exiting " + oldmapname + ".";
  			}
			} else {
			  DebugWrite("map", "Failed to exit due to exittest.");
  	    retval["canmove"] = 0;
  	    retval["diffx"] = diffx;
	      retval["diffy"] = diffy;
	      retval["msg"] = ": Failed!";
	      return retval;
			}
		}
	}	else {
		retval = tile.getBumpIntoResult(this);
		if (retval["canmove"] === 0) { return retval; }
//		var moveval = tile.canMoveHere(this, map.getTile(this.getx(),this.gety()));
//    if (debug && debugflags.ai) { dbs.writeln("<span style='color:brown'>" + this.getName() + " trying to move, checking canMoveHere for " + passx + "," + passy +".</span><br />"); }
    DebugWrite("ai", this.getName() + " trying to move, checking canMoveHere for " + passx + "," + passy +".</span><br />");
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
		if (this === PC) {
		  var sfx = "sfx_walk_";
		  if (map.getUnderground()) { sfx = sfx + "ug_"; }
		  if (tile.getTopFeature() && tile.getTopFeature().getWalkSound()) {
		    sfx = sfx + tile.getTopFeature().getWalkSound();
		  } else if (tile.getTerrain().getWalkSound()) {
		    sfx = sfx + tile.getTerrain().getWalkSound();
		  } else {
		    sfx = sfx + "grass";
		  }
		  play_footstep(sfx);
		  
      ProcessAmbientNoise(tile);
		}

    var distfrom = getDisplayCenter(map, PC.getx(), PC.gety());
		var walkonval = tile.executeWalkons(this);
		if (walkonval) {
		  if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
		  retval["msg"] += walkonval;
		}
    if ((map === PC.getHomeMap()) &&(GetSquareDistance(this.getx(), this.gety(), distfrom.centerx, distfrom.centery) < 1+Math.max(viewsizex,viewsizey) )) {
      // basically, was this move on screen? The +1 is to catch things that might have just walked off-screen
      // uncommented version checks from current display center, not from PC position.
      if (typeof this.getLight === "function") {
			  DrawMainFrame("draw", map.getName() , PC.getx(), PC.gety());
			} else {
			  // only redraw these two spaces
			  DrawMainFrame("one", map.getName(), startx, starty);
			  DrawMainFrame("one", map.getName(), passx, passy);
			}
    }
	}
	retval["initdelay"] = tile.getInitDelay(this);
	retval["diffx"] = diffx;
	retval["diffy"] = diffy;
	return retval;
}

NPCObject.prototype.myTurn = function() {
  raceWarning = 0;
  if (debugflags.first) { delete debugflags.first; } 
  else { DebugWrite("all", "</div>"); }
  DebugWrite("all", "<div style='border-style:inset; border-color:#999999'><span style='" + debugstyle.header + "'>" + this.getName() + " (" + this.getNPCName() + "), serial " + this.getSerial() + " is starting its turn at " + this.getx() + "," + this.gety() + ", timestamp " + DUTime.getGameClock().toFixed(5) + ".</span><br />");
  if (!maps.getMap(this.getHomeMap().getName())) {
    // removing from timeline, its map is gone

//    if (debug && debugflags.gameobj) { dbs.writeln("<span style='color:green;font-weight:orange'>Creature " + this.getName() + " : " + this.getSerial() + " removed from game- map gone.</span><br />"); }
    DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " removed from game- map gone.</span><br />");
  
    return 1;
  }

  if (this.expiresTime && (this.expiresTime > DUTime.getGameClock())) {
//    if (debug && debugflags.ai) { dbs.writeln("<span style='color:green;font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " expired, removing itself.</span><br />"); }
    DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " expired, removing itself.</span><br />");
    this.getHomeMap().deleteThing(this);
    
    return 1;
  }

	gamestate.setMode("NPC");
	gamestate.setTurn(this);

//  if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange; font-weight:bold'>" + this.getName() + " (" + this.getNPCName() + "), serial " + this.getSerial() + " is starting its turn at " + this.getx() + "," + this.gety() + ", timestamp " + DUTime.getGameClock() + ".</span><br />"); }	
	RunEffects(this);
	
	Regen(this);
  var awake = 1;
  if (this.getSpellEffectsByName("Sleep") || this.getSpellEffectsByName("Paralyze") || this.getSpellEffectsByName("Frozen")) { awake = 0; }
  var confused = this.getSpellEffectsByName("Confused");
  if (confused && (Math.random() < (confused.getPower()/100))) {
    // confused and Confused
    awake = 0;
    if (Math.random() < .5) { 
	    // confused and randomly wandering
	    var dir = Dice.roll("1d4");
	    if (dir === 1) { this.moveMe(0,-1,0); }
	    if (dir === 2) { this.moveMe(1,0,0); }
	    if (dir === 3) { this.moveMe(0,1,0); }
	    if (dir === 4) { this.moveMe(-1,0,0); }
	  }

  }

  var response = {};  
  // will be = return value of AI call
  
	// actual AI!
  if (awake) {	
  	var ainame=this.getCurrentAI().split("-");
    if (this.getAggro() && ((this.getAttitude() === "friendly") || (this.getAttitude() === "hostile") || (this.getAttitude() === "neutral"))) {
      ainame[0] = "combat";
    }
    
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

  if (!maps.getMap(this.getHomeMap().getName())) {
    // map removed during its turn (probably because it killed the player
    // therefore it deserves valhalla

    DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " removed from game- map gone. Not re-adding to timeline.</span><br />");
  
    return 1;
  }
	
	gamestate.setMode("null");
  if (!response.removed) {
	  var NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,this.nextActionTime(response["initdelay"]));
  }
  
  delete this.pushed;
  
//  var nextEntity = DUTime.executeNextEvent().getEntity();
//  nextEntity.myTurn();
//  if (debug && debugflags.ai) { dbs.writeln("<span style='color:orange; font-weight:bold'>*" + this.getName() + ", serial " + this.getSerial() + " is ending its turn at " + this.getx() + "," + this.gety() + ".*</span><br />"); }	
  DebugWrite("ai", "Ending its turn at (" + this.getx() + "," + this.gety() + ").");
  return 1;
}

NPCObject.prototype.endTurn = function(init) {
  if (whoseturn !== this) {
    alert("Somehow trying to end a turn when it isn't their turn, aborting.");
  } else {
    gamestate.setMode("null");
  
    DebugWrite("ai", "Ending its turn at (" + this.getx() + "," + this.gety() + ").");
  
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
  
    if (!maps.getMap(this.getHomeMap().getName())) {
      // map removed during its turn (probably because it killed the player
      // therefore it deserves valhalla

      DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " removed from game- map gone. Not re-adding to timeline.</span><br />");
  
    } else {
      var myevent = new GameEvent(this);
      DUTime.addAtTimeInterval(myevent,this.nextActionTime(init));
    }

//  var nextEntity = DUTime.executeNextEvent().getEntity();
//  nextEntity.myTurn();
    startScheduler();
  }
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
    item.setHomeMap("");
  }
  if (!qty) { 
    if (item.getQuantity()) {
      qty = item.getQuantity();
    } else {
      qty = 1; 
    }
  }
  var alreadyIn = this.checkInventory(item.getName());
  if (alreadyIn) {
    alreadyIn.setQuantity(alreadyIn.getQuantity()+qty);
  }
  else {
    this.inventory.addTop(item);
    item.setQuantity(qty);
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
//      if (debug && debugflags.combat) { dbs.writeln("<span style='color:green'>DISTRACTED: old tohit: " + tohit + ", "); }
      DebugWrite("combat", "DISTRACTED: old tohit: " + tohit + ", ");
      tohit = tohit - distracted.getPower();
//      if (debug && debugflags.combat) { dbs.writeln("new tohit: " + tohit + ".<br /></span>"); }
      DebugWrite("combat", "new tohit: " + tohit + ".<br />");
    }
  }
  return tohit;
}

NPCObject.prototype.getDefense = function() {
  var def = this.getLevel() * DEF_PER_LEVEL;
  def = def + (this.getDex()-10)*DEF_PER_DEX;
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
//    if (debug && debugflags.combat) { dbs.writeln("vulnerable: old AC " + def + ", </span>"); }
    DebugWrite("ai", "VULNERABLE: Old AC " + def + ", ");
    def = def - vuln.getPower();
//    if (debug && debugflags.combat) { dbs.writeln("new AC: " + def + ".<br /></span>"); }
    DebugWrite("ai", "new AC: " + def + ".<br />");
  }
  var prot = this.getSpellEffectsByName("Protection");
  if (prot) {
//    if (debug && debugflags.combat) { dbs.writeln("protected: old AC " + def + ", </span>"); }
    DebugWrite("combat", "PROTECTED: old AC " + def + ", ");
    def = def + prot.getPower();
//    if (debug && debugflags.combat) { dbs.writeln("new AC: " + def + ".<br /></span>"); }
    DebugWrite("combat", "new AC: " + def + ".<br />");
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
  this.turnsToRecalcDest = parseInt(timeuntil);
  return this.turnsToRecalcDest;
}

NPCObject.prototype.getPoI = function() {
  if (typeof this.currentPoI !== "object") { this.currentPoI = {}; }
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
  this.attackword = "attack";
}
NPCGroupObject.prototype = new NPCObject();

function NPCList(npcs,num) {
  this.npc = npcs;
  this.count = num;
}

NPCGroupObject.prototype.populate = function() {
  var population = [];
  for (var i=0; i< this.group.length; i++) {
    var num = Dice.roll(this.group[i].count);
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
	this.attitude = "friendly";
	this.graphic = "300.gif";
	this.meleeAttackAs = "Fists";
	this.missileAttackAs = "none";
	this.meleeHitSound = "";
	this.meleeMissSound = "";
	this.missileHitSound = "";
	this.missileMissSound = "";	
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
  this.lastspelllevel = SPELL_LIGHT_LEVEL;
  this.lastspell = SPELL_LIGHT_ID;
  this.infuse = 0;
  this.gender = "other";
	
	LightEmitting.call(this, 0.5);
	this.addType("pc");
	
  // kind of a hack
  this.equipment = {};
  this.equipment.armor = "";
  this.equipment.weapon = "";
  this.equipment.missile = "";
  this.resists = {};

  this.runes = {};
  this.runes.kings = 0;
  this.runes.flames = 0;
  this.runes.winds = 0;
  this.runes.waves = 0;
  this.runes.void = 0;
  this.runeCooldown = {};

  this.specials = {};

	this.inventory = new Collection();
  this.spellEffects = new Collection();	

	this.lastLocation = {};
	this.lastLocation.map = "";
	this.lastLocation.x = 0;
	this.lastLocation.y = 0;
	
	this.nextMana = MANA_REGEN;
	this.nextHP = HP_REGEN;

//	var myweapon = localFactory.createTile("Dagger");
//	myweapon.equipMe(this);
}
PCObject.prototype = new NPCObject();

PCObject.prototype.activate = function() {
  return 1;
}

PCObject.prototype.myTurn = function() {

  if (debugflags.first) { delete debugflags.first; } 
  else { DebugWrite("all", "</div>"); }
  DebugWrite("all", "<div style='border-style:inset; border-color:#999999'><span style='" + debugstyle.header + "'>=== PC TURN ===   Timestamp: " + DU.DUTime.getGameClock().toFixed(5) + "; x: " + PC.getx() + ", y: " + PC.gety() + "<br />");

//  if (debug) { dbs.writeln("=== PC TURN ===   Timestamp: " + DU.DUTime.getGameClock() + "; x: " + PC.getx() + ", y: " + PC.gety() + "<br />"); }
  if (gamestate !== "loadgame") {
    // this half of myTurn has already run before the player saved
    RunEffects(this);
  
    if (this.getHP() <= 0) {
      DebugWrite("all", "PC is dead.<br />");
      DoPCDeath();
      return 0;
    }
  }
    
  Regen(this);
  var awake = 1;
  var sleep = this.getSpellEffectsByName("Sleep");
  var paralyzed = this.getSpellEffectsByName("Paralyze");
  var frozen = this.getSpellEffectsByName("Frozen");
  if (sleep || paralyzed || frozen) { awake = 0; }  

  SetDebugToBottom();
  
  if (awake) {
	  gamestate.setMode("player");
	  gamestate.setTurn(PC);
	  return 0;
	} else {
	  if (sleep) {
  	  maintext.addText("Zzzz...");
  	} else if (paralyzed) {
  	  maintext.addText("Paralyzed!");
  	} else if (frozen) {
  	  maintext.addText("You are frozen!");
  	}
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

PCObject.prototype.getMaxMana = function() {
  var maxmana = this.getBaseInt() + this.getOrbInt();
  if (DU.gameflags.getFlag("pc_abyss")) {
    maxmana = maxmana * 2;
  }
  return maxmana;
}

// returns the amount of damage dealt, -1 if the damage killed the target
PCObject.prototype.dealDamage = function(dmg, src, type) {
  
  var isasleep = this.getSpellEffectsByName("Sleep");
  if (isasleep) {
    isasleep.endEffect();
  }
  
  var isfrozen = this.getSpellEffectsByName("Frozen");
  if (isfrozen) {
    isfrozen.endEffect();
  }

  var isinvuln = this.getSpellEffectsByName("Invulnerable");
  if (isinvuln) {
    dmg = 0;
  }

  dmg = CheckAbsorb(dmg,this,src,type);
  var oldhp = this.getDisplayHP();
  this.modHP(dmg*-1);
  var newhp = this.getDisplayHP();
  
  if (oldhp !== newhp) {
    DrawCharFrame();
    DamageFlash();
  }
  
  if (this.getHP() <= 0) { // killed!
    this.processDeath(1);
    return -1;
  }
  else { return dmg; }
}

PCObject.prototype.getRuneCooldown = function(rune) {
  return this.runeCooldown[rune];
}

PCObject.prototype.setRuneCooldown = function(rune, timediff) {
  this.runeCooldown[rune] = DUTime.getGameClock() + timediff;
  return this.runeCooldown[rune];
}

//NOPARSE

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

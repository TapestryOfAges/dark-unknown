
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
  let patt = new RegExp("X"+type+"X");
  if (patt.test(this.type)) {
    return 1;
  } else { return 0; }
}

ProtoObject.prototype.getTypeForMap = function() {
  // run check for npc, pc, and feature
  let patt = new RegExp("XfeatureX");
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
    let tilename = this.name;
    return localFactory.createTile(tilename);
  }
  
  let savename = this.getName();
  DebugWrite("saveload", "<br /><span style='font-weight:bold'><br />Copying " + savename + ", serial " + this.getSerial() + ":</span><br />");
  let base_version = eidos.getForm(this.getName());
  let copydata = {};
  let copies = [];
  copies[0] = copydata;
  copydata.traceback = [];    // traceback holds the places this was found. On a map or in the timeline are the main options.

  copydata.name = this.getName(); 
  if (!DU.gameflags.getFlag("editor")) {
    let ontime = DUTime.findEntityTime(this);
    if (ontime !== -1) {
      copydata.timestamp = ontime;
      copydata.traceback.push("timeline");
    }
  }
  for (let idx in this) {
    let val = this[idx];
    DebugWrite("saveload", "save " + idx + ": ");
    if ((typeof val === "function") && (typeof base_version[idx] === "function")) { 
      DebugWrite("saveload", idx + " is a <span style='color:darkblue'>function, moving on</span>...  ");
//      return;
      // both have a function. Assuming they're the same, not worth caring
    } else if (typeof val === "function") {  // real one has a function base one does not
      alert("Function on " + copydata.name + ": " + idx);
      console.log(this);
    }
    else if (typeof val !== "object") { 
      if (val != base_version[idx]) {
        copydata[idx] = val;
        DebugWrite("saveload", idx + " <span style='color:lime'>different, copying</span>... ");
      } else {
        DebugWrite("saveload", idx + " <span style='color:firebrick'>the same, moving on</span>...  ");
      }
    } else if (idx === "attachedParts") {
      copydata[idx] = [];
      for (let i=0;i<val.length;i++) {
        copydata[idx][i] = val[i].getSerial();
        DebugWrite("saveload", idx + " an array containing serial " + copydata[idx][i] + "...  ");
      }
    } else if (idx === "occupants") {
      copydata[idx] = [];
      for (let i=0;i<val.length;i++) {
        if (val[i]==="") { copydata[idx][i] = ""; }
        else {
          copydata[idx][i] = val[i].getSerial();
        }
        DebugWrite("saveload", idx + " an array containing serial " + copydata[idx][i] + "...  ");
      }
    } else if (idx === "attachedTo") {
      copydata[idx] = val.getSerial();
    } else if (Array.isArray(val)) {
      if (Array.isArray(base_version[idx]) && arrayCompare(val, base_version[idx])) {
        DebugWrite("saveload", idx + " an array and <span style='color:firebrick'>the same, moving on</span>...  ");
      } else {
        copydata[idx] = val;
        if (debug && debugflags.saveload) { 
          DebugWrite("saveload", idx + " an array and <span style='color:lime'>different, copying</span>... <br /> [");
          DebugWrite("saveload", "] vs [");
          if (Array.isArray(base_version[idx])) {
            for (let i=0; i<base_version[idx].length; i++) { 
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
      copydata[idx] = val;
      DebugWrite("saveload", idx + " an object and <span style='color:lime'> copied</span>... ");
    } else if ((idx === "currentDestination") || (idx === "lastLocation") || (idx === "flags")) {
      copydata[idx] = val;
      DebugWrite("saveload", idx + " <span style='color:lime'> copying regardless</span>... ");
    } else if ((idx === "currentPoI") || (idx === "losupclose")){
      DebugWrite("saveload", idx + " <span style='color:maroon'>deliberately not saved</span>... ");
    } else if (idx === "spawned") { 
      // for things with collections
      let spawnlist = val.getAll();
      let spawnserials = [];
      for (let i=0;i<spawnlist.length;i++) {
        spawnserials.push(spawnlist[i].getSerial());
      }
      copydata[idx] = spawnserials;
      DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " <span style='color:lime'>saved as serials, serial# " + copydata[idx] + "</span>...</span>");
    } else if ((idx === "equippedTo") || (idx === "attachedTo") || (idx === "spawnedBy") || (idx === "linkedItem")) {
      if (val) {
        copydata[idx] = val.getSerial();
        DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " <span style='color:lime'>saved as serial, serial# " + copydata[idx] + "</span>...</span> ");
      } else {
        DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " is <span style='color:magenta'>empty, not saved</span>...</span> ");
      }
    } else if (idx === "equipment") {
      copydata[idx] = {};
      for (let eqidx in val) {
        let eqval = val[eqidx];
        if (eqval) {
          DebugWrite("saveload", idx + ": " + eqidx + " being <span style='color:lightseagreen'>copied in a subthread</span>...<br /><nbsp /><nbsp />");
          let equipcopy = eqval.copy();
          copydata[idx][eqidx] = equipcopy[0].serial;
          copies.push(equipcopy[0]);   // using index rather than each here because equipment can't chain farther
          DebugWrite("saveload", "Copy made, " + eqidx + " added as <span style='color:lightseagreen'>serial to main object</span>... ");
        }
      }
    } else if (idx === "inventory") {
      let inv = val.getAll();
      copydata[idx] = [];
      for (let invidx=0;invidx<inv.length;invidx++) {
        let invval = inv[invidx];
        DebugWrite("saveload", idx + ": " + invidx + " being <span style='color:lightseagreen'>copied in a subthread</span>... <br /><nbsp /><nbsp />");
        let invcopy = invval.copy();
        copydata[idx][invidx] = invcopy[0].serial;
        copies.push(invcopy[0]);   // using index rather than each here as well for the same reason
        DebugWrite("saveload", "Copy made, " + invidx + " added as <span style='color:lightseagreen'>serial to main object</span>... ");
      }
    } else if (idx === "spellEffects") {
      let spells = val.getAll();
      if (spells[0]) {
        copydata[idx] = [];
        for (let spellidx=0;spellidx<spells.length;spellidx++) {
          let spellval = spells[spellidx];
          DebugWrite("saveload", idx + ": " + spellidx + " being <span style='color:lightseagreen'>copied in a subthread</span>... <br /><nbsp /><nbsp />");
          let spellcopy = spellval.copy();
          copydata[idx].push(spellcopy[0].serial);
          copies.push(spellcopy[0]);  // probably should make this each as future proofing
          DebugWrite("saveload", "Copy made, " + spellidx + " added as <span style='color:lightseagreen'>serial to main object</span>... ");
        }
      }
    } else if (idx === "spellsknown") {
      copydata[idx] = val;
      DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " saved.</span>");
    } else if (idx === "runes") {
      copydata[idx] = val;
      DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " saved.</span>");
    } else if (idx === "runeCooldown") {
      copydata[idx] = val;
      DebugWrite("saveload", "<span style='font-weight:bold'>" + idx + " different, saved.</span>");
    } else if (idx === "attached") {  // on some levers
      copydata[idx] = val;   
    } else if (idx === "destination") {  // on teleporters
      copydata[idx] = val;   
    } else if (idx === "val") {  // on ToshinPanel at the least
      copydata[idx] = val;
    } else {
      DebugWrite("saveload", "<br /><span style='color:red;font-weight:bold'>" + idx + " is type " + typeof val + "</span>,  ");
      alert(savename + " SAVE NEEDS " + idx + "!");
    }
    // ADD HERE WHEN THERE ARE MORE
    
  };
  
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

GameObject.prototype.getLocation = function() {
  let location = {};
  location.mapname = this.getHomeMap().getName();
  location.x = this.getx();
  location.y = this.gety();

  return location;
}

GameObject.prototype.setDesc = function(newdesc) {
	this.desc = newdesc;
}

GameObject.prototype.getDesc = function() {
	return this.desc;
}

GameObject.prototype.getFullDesc = function() {
  let full = "";
  if (this.getPrefix()) {
    full = this.getPrefix() + " ";
  }
  
  full = full + this.getDesc();
  if (this.conversation) {
    let knowsflag = "knows_" + this.conversation;
    if (DU.gameflags.getFlag(knowsflag)) {
      full = this.npcname;
    }
  } 
  if ((typeof this.getNPCName === "function") && (this.getNPCName() !== "myname")) {
    let nname = this.getNPCName().toLowerCase();
    let knowsflag = "knows_" + nname;
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
	let retval = {};
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
  this.overlayxoffset = newgraphics[4];
  this.overlayyoffset = newgraphics[5];
}

GameObject.prototype.getGraphic = function() {
	let returnGraphic = this.graphic;
  if (returnGraphic) { return(returnGraphic); }
}

GameObject.prototype.getGraphicArray = function() {
	let returnGraphic = this.graphic;
  let returnOverlay = this.overlay;
  let returnVars = [];
  returnVars[0] = returnGraphic;
  if (returnOverlay) {
    returnVars[1] = returnOverlay;
  }
  else {
  	returnVars[1] = "spacer.gif";
  }
  if (this.spritexoffset) {
    returnVars[2] = this.spritexoffset;
  }
  else {
  	returnVars[2] = "0";
  }
  if (this.spriteyoffset) {
    returnVars[3] = this.spriteyoffset;
  } else {
  	returnVars[3] = "0";
  }
  if (this.overlayxoffset) {
    returnVars[4] = this.overlayxoffset;
  } else {
    returnVars[4] = 0;
  }
  if (this.overlayyoffset) {
    returnVars[5] = this.overlayyoffset;
  } else {
    returnVars[5] = 0;
  }
  
  return(returnVars); 
}

GameObject.prototype.setOverlay = function(newgraphic) {
	this.overlay = newgraphic;
}

GameObject.prototype.getOverlay = function() {
	let returnOverlay = this.overlay;

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
	let LOSref = [];
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
    let tmp = [];
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
    let retval = {};
    retval["fin"] = 0;
    retval["input"] = "&gt;";
    if (IsAdjacent(this,who,"nodiag")) {
      retval["fin"] = 1;
      let diffx = this.getx() - who.getx();
      let diffy = this.gety() - who.gety();
      let objmap = who.getHomeMap();
      let pushto = objmap.getTile(this.getx()+diffx,this.gety()+diffy);
      if (pushto === "OoB") { return this.pullMe(); }
      let canmove = pushto.canMoveHere(MOVE_WALK);
      let canpush = 0;
      if (canmove["canmove"]) {
        canpush = 1;
        let fea = pushto.features.getAll();
        for (let i=0;i<fea.length;i++) {
          if (fea[i].nopush) { canpush = 0; }
        }
      }
      if (canpush) {
        objmap.moveThing(this.getx()+diffx,this.gety()+diffy,this);
        retval["txt"] = "Push: " + this.getDesc() + ".";
        if ("facing" in this) {
          let graphic;
          if (diffx > 0) { this.facing = 1; graphic = this.getGraphicFromFacing(1); }
          else if (diffx < 0) { this.facing = 3; graphic = this.getGraphicFromFacing(3); }
          else if (diffy > 0) { this.facing = 2; graphic = this.getGraphicFromFacing(2); }
          else if (diffy < 0) { this.facing = 0; graphic = this.getGraphicFromFacing(0); }
          this.setGraphicArray(graphic);
        }
        if ((typeof this.getLight === "function") && (this.getLight() !== 0)) {
          if (PC.getHomeMap() === objmap) {
            DrawMainFrame("draw",objmap,PC.getx(),PC.gety());
          }
        } else {
          if ((PC.getHomeMap() === objmap) && (GetDistance(PC.getx(),PC.gety(),this.getx(),this.gety(),"square") <= 6)) {
            DrawMainFrame("one",objmap,this.getx(),this.gety());
            DrawMainFrame("one",objmap,this.getx()-diffx,this.gety()-diffy);
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
    let retval = {fin:1,input:"&gt;"};
    let objmap = this.getHomeMap();
    let diffx = this.getx()-who.getx();
    let diffy = this.gety()-who.gety();
    let movetox = who.getx();
    let movetoy = who.gety();
    if (movetox && movetoy && this.getx() && this.gety()) {
      objmap.moveThing(0,0,this);
    } else { objmap.moveThing(3,3,this); }
    let moveval = who.moveMe(diffx,diffy);
    objmap.moveThing(movetox,movetoy,this);
    retval["txt"] = "Pull: " + this.getDesc() + ".";
    retval["canmove"] = moveval["canmove"];
    if ("facing" in this) {
      let graphic;
      if (diffx > 0) { this.facing = 1; graphic = this.getGraphicFromFacing(1); }
      else if (diffx < 0) { this.facing = 3; graphic = this.getGraphicFromFacing(3); }
      else if (diffy > 0) { this.facing = 2; graphic = this.getGraphicFromFacing(2); }
      else if (diffy < 0) { this.facing = 0; graphic = this.getGraphicFromFacing(0); }
      this.setGraphicArray(graphic);
    }
    if (objmap === PC.getHomeMap()) { DrawMainFrame("one",objmap,movetox,movetoy); }

    if ((typeof this.getLight === "function") && (this.getLight() !== 0)) {
      if (PC.getHomeMap() === objmap) {
        DrawMainFrame("draw",objmap,PC.getx(),PC.gety());
      }
    } else {
      if ((PC.getHomeMap() === objmap) && (GetDistance(PC,this,"square") <= 6)) {
        DrawMainFrame("one",objmap,this.getx(),this.gety());
        DrawMainFrame("one",objmap,this.getx()-diffx,this.gety()-diffy);
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
    if (lock == undefined) { lock = 1; }
		this.setLocked(lock);
		if (lock > 2) { lock = 2; }
		this.setGraphicArray(this.lockedgraphics[lock]);
		this.setDesc(this.lockeddescs[lock]);
		this.setPrefix(this.lockedprefixes[lock]);
		let homemap = this.getHomeMap();
		if (homemap) {
		  homemap.setWalkableAt(this.getx(),this.gety(),false,MOVE_WALK_DOOR);
    }
    if (!DU.gameflags.getFlag("editor")) {
      DrawMainFrame("one", this.getHomeMap(), this.getx(), this.gety());
    }
	}
	this.unlockMe = function() { 
	  this.lockMe(0);
	  let homemap = this.getHomeMap();
	  if (homemap) {
	    this.getHomeMap().setWalkableAt(this.getx(),this.gety(),true,MOVE_WALK_DOOR);
    }
    if (!DU.gameflags.getFlag("editor")) {
      DrawMainFrame("one", this.getHomeMap(), this.getx(), this.gety());
    }
	}
	
	this.setTrap = function(trap, challenge) { 
	  this.trapped = trap; 
	  let diff = Math.floor(Math.random()*5)+1 - 3;
	  this.trapchallenge = challenge + diff; 
	}
	this.tryTrap = function(who) { 
	  // if your Dex === the challenge rating for the trap, you have a 50/50 chance of opening it. Once your dex is twice the
	  // challenge you will always succeed. NOTE: Changed that to challenge+10.
	  let resp = 0;
    let chance = (who.getDex() - this.trapchallenge + 10) /20;
    if (chance < .05) { chance = .05; }
	  let roll = Math.random();
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
  	let mapdata = { entermap : this.entermap , enterx : this.enterx, entery : this.entery };
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
   
    if (this.getHomeMap() === PC.getHomeMap()) {
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    }
	  this.light = light;
	}
	this.getLight = function() {
	  if (parseFloat(this.light) === "NaN") { alert(this.getName() + " has lightlevel that is NaN."); }
		return parseFloat(this.light);
	}
}

// Abstract class
function Breakable(brokengraphicarray, startsbroken, breaksound) {
  if (!startsbroken) { startsbroken = 0; }

  if (startsbroken) { 
    this.activate = function() {
      this.break();
    }
  }
  this.breakable = 1;
  
  this.getBroken = function() { return this.broken; }
  this.setBroken = function(broke) { this.broken = broke; return this.broken; }  // note, set broken doesn't change graphics, etc
  this.break = function(who) { 
    this.broken = 1; 
    this.setGraphicArray(brokengraphicarray);
    if (!this.fixeddesc) {
      this.fixeddesc = this.getDesc();
    }
    let olddesc = this.getDesc();
    this.setDesc(this.brokendesc);
    //play sound effect
    if (breaksound && who) {
      if (GetDistance(who.getx(),who.gety(),this.getx(),this.gety()) <= 5) {
        DUPlaySound(breaksound);
      }
    }
    if (who) {
      DrawMainFrame("one", this.getHomeMap(), this.getx(), this.gety());
    }
    if (this.karmamod && (who === PC)) { 
      PC.diffKarma(this.karmamod);
    }
    if (typeof this.onBreak === "function") {
      this.onBreak(who);
    }
    let retval = {};
    retval["fin"] = 1;
    retval["txt"] =  "You break the " + olddesc + "!";
    retval["input"] = "&gt;";
    return retval;
  }
  this.repair = function() {
    this.broken = 0;
    let tmpcopy = localFactory.createTile(this.getName());
    this.setGraphicArray(tmpcopy.getGraphicArray());
    if (this.getName() === "Mirror") {
      let who;
      if ((PC.getx() === this.getx()) && (PC.gety() === (this.gety()+1))) { who = PC; }
      else {
        let south = this.getHomeMap().getTile(this.getx(),this.gety()+1);
        who = south.getTopNPC();
      }
      if (who) {
        this.setGraphicArray([who.getGraphic(), "mirror-reflection.gif", "0", "7"]);
      }
    }
    this.setDesc(this.fixeddesc);
    if (typeof this.onMend === "function") {
      this.onMend(who);
    }
    DrawMainFrame("one", this.getHomeMap(), this.getx(), this.gety());  // will try to draw 0,0 if in inventory, which is ok
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
		let retval = {};
    retval["fin"] = 0;
    
    let mymap = this.getHomeMap();
		
		if (this.locked && this.keyname) {
		  if (who.inventory.getByName(this.keyname)) {
        this.unlockMe();
      }
    }
		if (this.open === 1) {
			this.setGraphicArray(closedgraphic);
			
			this.setBlocksLOSArray(this.closedLOS);
			this.closedLOS = [];
			
			this.removePassable(MOVE_WALK);
			this.removePassable(MOVE_LEVITATE);
			this.removePassable(MOVE_FLY);
      mymap.setWalkableAt(this.getx(),this.gety(),false,MOVE_WALK);
      if (this.getName() === "SecretDoor") {
        mymap.setWalkableAt(this.getx(),this.gety(),false,MOVE_WALK_DOOR);
      }
			mymap.setWalkableAt(this.getx(),this.gety(),false,MOVE_SWIM);
			mymap.setWalkableAt(this.getx(),this.gety(),false,MOVE_LEVITATE);
			mymap.setWalkableAt(this.getx(),this.gety(),false,MOVE_FLY);
			
			retval["fin"] = 1;
			retval["txt"] = "Closed!";
			retval["redrawtype"] = "draw";
			if (!silentdoors && closesound && (GetDistance(PC.getx(),PC.gety(),this.getx(),this.gety()) < 6) && (PC.getHomeMap() === mymap)) {
			  DUPlaySound(closesound); 
			}
			
			this.open = 0;
		} else {
			if (typeof this.getLocked === "function") {
				if (this.getLocked()) {
					retval["fin"] = 1;
					retval["txt"] = "Locked.";
					if (!silentdoors && lockedsound && (GetDistance(PC.getx(),PC.gety(),this.getx(),this.gety()) < 6) && (PC.getHomeMap() === mymap)) {
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
      mymap.setWalkableAt(this.getx(),this.gety(),true,MOVE_WALK);
      if (this.getName() === "SecretDoor") {
        mymap.setWalkableAt(this.getx(),this.gety(),true,MOVE_WALK_DOOR);
      }
			mymap.setWalkableAt(this.getx(),this.gety(),true,MOVE_LEVITATE);
			mymap.setWalkableAt(this.getx(),this.gety(),true,MOVE_SWIM);
			mymap.setWalkableAt(this.getx(),this.gety(),true,MOVE_FLY);
			if (!silentdoors && opensound && (GetDistance(PC.getx(),PC.gety(),this.getx(),this.gety()) < 6) && (PC.getHomeMap() === this.getHomeMap())) {
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
function OpenContainer(opensound, lockedsound) {
  
  this.isContainer = 1;
  this.karmaPenalty = 0;
  
  this.setKarmaPenalty = function(kp) {
    this.karmaPenalty = parseInt(kp);
    return this.karmaPenalty;
  }
  
  this.getKarmaPenalty = function() {
    return this.karmaPenalty;
  }
  
  this.usePrompt = function(code) {
    if (code === 89) {
      PC.diffKarma(1-this.getKarmaPenalty);
      this.setKarmaPenalty(0);
      return this.use(PC);
    } else {
      retval["txt"] = "You decide not to open it.";
    }
  }

  this.use = function(who, fire) {
    let retval = {}; 

    if (this.usecheck) {
      let uchk = this.usecheck(who);
      if (uchk.stop) {
        return uchk.retval;
      }
    }
    
    if (this.getKarmaPenalty() && (who === PC) && !fire) {
      if (DU.gameflags.getFlag("skip_theft_warning")) {
        PC.diffKarma(0-this.getKarmaPenalty());
      } else {
        retval["override"] = -1;
        retval["fin"] = -1;
        retval["preserve"] = 1;
        retval["txt"] = "Opening this would be stealing. Are you sure?";
        retval["input"] = "(Y/N): ";
        targetCursor.useditem = this;
        return retval;
      }
    
    }
    
    if ((typeof this.getLocked === "function") && !fire) {
      if (this.getLocked() == 1) {
        retval["fin"] = 1;
        retval["txt"] = "Locked.";
        if ((who === PC) && lockedsound) { DUPlaySound(lockedsound); }
        return retval;
      }
      else if (this.getLocked() === 2){
        retval["fin"] = 1;
        retval["txt"] = "Magically locked.";
        if ((who === PC) && lockedsound) { DUPlaySound(lockedsound); }
        return retval;
      }
    }

    if (this.trapped && !fire) {
      let trapresult = this.tryTrap(who);
      if (this.getHomeMap() !== who.getHomeMap()) { // trap killed them
        retval["override"] = 1;
        return retval;
      }
    }
    
    let searchables = this.getSearchYield();
    if (searchables.length) {
      if (!this.getLootedID() || (!DU.gameflags.getFlag("lid_" + this.getLootedID()))) {
        // no looted ID, or looted ID not met
        for (let i=0; i < searchables.length; i++) {
          let goldtest = /(\d+)Gold/;
          if (goldtest.test(searchables[i])) {
            let amt = goldtest.exec(searchables[i]);
            this.setGold(parseInt(amt[1]) + this.getGold());
            searchables[i] = "Gold";
          }
          this.container.push(searchables[i]);
        }
      }
    } else {
      if (this.getLootedID()) {
        if (DU.gameflags.getFlag("lid_" + this.getLootedID())) {
          this.setLootgroup("prev_looted");
          // only do this if contents come from lootgroup rather than searchyield
        }
      }  
    }

    if (this.container.length) { // there's something inside
      if (this.getLootedID()) {
        DU.gameflags.setFlag("lid_" + this.getLootedID(), 1);
      }
      
      retval["fin"] = 1;
      retval["txt"] = "It contains: ";
      let firstitem = 1;
      for (let i=0; i<this.container.length; i++) {
        let newitem = localFactory.createTile(this.container[i]);
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
    if (who === PC) { DUPlaySound(opensound); }
    return retval;
  }
  
  this.addToContainer = function(addthis, amt) {
    if (!amt) { amt = 1; }
    if (addthis === "Gold") {
      this.container[this.container.length] = addthis;
      this.setGold(amt);
    } else {
      for (let i=1; i<=amt; i++) {
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
		let foo = tilegraphic.split('.');
	  return({graphic: foo[0] + "-" + tilingy + tilingx + "." + foo[1]});
	}
}

// Abstract class Tiling-spritesheet
function TilingSpritesheet(tileval, horizonly) {
  this.doTile = function(tilingx,tilingy,tilegraphic) {
    if (!horizonly) {
  		tilingx = (tilingx % tileval)*32; 
      tilingy = (tilingy % tileval)*32;
    } else {
      tilingx = (((tilingy % 2) + tilingx) % tileval) * 32;
      tilingy = 0;
    }
    let tileme = {};
    if (!tilegraphic) {tilegraphic = this.getGraphicArray(); }
    tileme.spritexoffset = parseInt(tilegraphic.graphics2) - tilingx;
    tileme.spriteyoffset = parseInt(tilegraphic.graphics3) - tilingy;
    return tileme;
  }
}

//Abstract class HasAmbientNoise
function HasAmbientNoise(ambientsound, radius) {
  this.ambientNoise = ambientsound;
  this.getAmbientNoise = function() { return this.ambientNoise; }
  this.ambientRadius = radius;
  this.getAmbientRadius = function() { return this.ambientRadius; }
}

//Abstract class MobileEnterable
function MobileEnterable(destmap, destx, desty) {
  this.enterable = 1;
  this.enterto = destmap;
  this.enterx = destx; 
  this.entery = desty;

  this.getEnterMap = function() {
  	let mapdata = { entermap : this.destmap , enterx : this.destx, entery : this.desty };
  	return mapdata;
  }
}

//Abstract class ManualAnimation
function ManualAnimation(params) {
  // animstart is the spritex values of the first animation frame
  this.animstart = params.animstart;
  this.animlength = params.anilength;  // number of frames
  // animstyle is random or cycle
  this.animstyle = params.animstyle;
  this.allowrepeat = 0;
  if (params.allowrepeat) { this.allowrepeat = 1; }
  // min and max duration times. If there are specific frames I want to be able to linger on maybe I'll change this
  this.framedurationmin = params.framedurationmin;
  this.framedurationmax = params.framedurationmax;
  
  // start frame = start or random (start meaning leftmost spritex)
  this.startframe = params.startframe;

  // used to denote if it is on screen or not
  this.animating = 0;

  this.startAnimation = function() {

  }

}

// General func 
function SetByBelow() {
	this.setByBelow = function(x,y,themap) {
		let localacre = themap.getTile(x,y);
		let graphic = localacre.terrain.getGraphicArray();
		return graphic;
	};
}

// General func
function SetBySurround() {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
		let cardinal_dash = "";
		let north = 0;
		let south = 0;
		let east = 0;
		let west = 0;
		let vis = 0;
		let tilename = this.getName();

  	let addtoname_cardinal = "";
	  if ((themap.getTile(x,y+1) !== "OoB") && ((themap.getTile(x,y+1).terrain.getName() !== tilename) && (themap.getTile(x,y+1).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x,y+1) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "n"; north = 1; vis = 1;}
	  if ((themap.getTile(x,y+1) !== "OoB") && ((themap.getTile(x,y+1).terrain.getName() !== tilename) && (themap.getTile(x,y+1).terrain.getName() !== "BlankBlack"))) { north = 1; }
  	if ((themap.getTile(x,y-1) !== "OoB") && ((themap.getTile(x,y-1).terrain.getName() !== tilename) && (themap.getTile(x,y-1).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x,y-1) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "s"; south = 1; vis = 1;}
  	if ((themap.getTile(x,y-1) !== "OoB") && ((themap.getTile(x,y-1).terrain.getName() !== tilename) && (themap.getTile(x,y-1).terrain.getName() !== "BlankBlack"))) { south = 1; }
	  if ((themap.getTile(x-1,y) !== "OoB") && ((themap.getTile(x-1,y).terrain.getName() !== tilename) && (themap.getTile(x-1,y).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "e"; east = 1; vis = 1;}
	  if ((themap.getTile(x-1,y) !== "OoB") && ((themap.getTile(x-1,y).terrain.getName() !== tilename) && (themap.getTile(x-1,y).terrain.getName() !== "BlankBlack"))) { east = 1; }
  	if ((themap.getTile(x+1,y) !== "OoB") && ((themap.getTile(x+1,y).terrain.getName() !== tilename) && (themap.getTile(x+1,y).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y) < LOS_THRESHOLD) )) { cardinal_dash = "-"; addtoname_cardinal = addtoname_cardinal + "w"; west = 1; vis = 1;}
  	if ((themap.getTile(x+1,y) !== "OoB") && ((themap.getTile(x+1,y).terrain.getName() !== tilename) && (themap.getTile(x+1,y).terrain.getName() !== "BlankBlack"))) { west = 1; }
		
	  let diagonal_dash = "";
	  let addtoname_diagonal = "";
	 	if ((themap.getTile(x+1,y-1) !== "OoB") && (themap.getTile(x+1,y-1).terrain.getName() !== tilename) && (themap.getTile(x+1,y-1).terrain.getName() !== "BlankBlack") && (south === 0) && (west === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y-1) < LOS_THRESHOLD) ))
	 	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "a"; vis = 1; }
  	if ((themap.getTile(x+1,y+1) !== "OoB") && (themap.getTile(x+1,y+1).terrain.getName() !== tilename) && (themap.getTile(x+1,y+1).terrain.getName() !== "BlankBlack") && (north === 0) && (west === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y+1) < LOS_THRESHOLD) )) 
  	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "b"; vis = 1; }
	  if ((themap.getTile(x-1,y+1) !== "OoB") && (themap.getTile(x-1,y+1).terrain.getName() !== tilename) && (themap.getTile(x-1,y+1).terrain.getName() !== "BlankBlack") && (north === 0) && (east === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y+1) < LOS_THRESHOLD) ))
	    { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "c"; vis = 1;}
	 	if ((themap.getTile(x-1,y-1) !== "OoB") && (themap.getTile(x-1,y-1).terrain.getName() !== tilename) && (themap.getTile(x-1,y-1).terrain.getName() !== "BlankBlack") && (south === 0) && (east === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y-1) < LOS_THRESHOLD) )) 
	 	  { diagonal_dash = "-"; addtoname_diagonal = addtoname_diagonal + "d"; vis = 1; }
	
    let foo = graphics[0].split('.');
	  graphics[0] = foo[0] + cardinal_dash + addtoname_cardinal + diagonal_dash + addtoname_diagonal + '.' + foo[1];
	  if (vis === 0) { 
	  	let black = eidos.getForm('BlankBlack');
	  	let blkgraphics = black.getGraphicArray();
	  	graphics[0] = blkgraphics[0];
	  }
	  let tmparray = [];
	  tmparray[0] = .5;
	  if (graphics[0].indexOf("-nsew") !== -1) { this.setBlocksLOSArray(tmparray); }
	  return (graphics);
  }
}

function SetBySurroundCave() {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
    const ADD_Y = 864;
    const A_CORNER = 1;
    const B_CORNER = 2;
    const C_CORNER = 4;
    const D_CORNER = 8;
    const E_WALL = 16;
    const N_WALL = 32;
    const S_WALL = 64;
    const W_WALL = 128;

    let tilename = this.getName();
		let vis = 0;
		let north = 0;
		let south = 0;
		let east = 0;
		let west = 0;

    let spritecount = 0;
    let cornerobj = {};
	  if ((themap.getTile(x,y+1) !== "OoB") && ((themap.getTile(x,y+1).terrain.getName() !== tilename) && (themap.getTile(x,y+1).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x,y+1) < LOS_THRESHOLD) )) { spritecount += N_WALL; north = 1; vis = 1;}
	  else if ((themap.getTile(x,y+1) !== "OoB") && ((themap.getTile(x,y+1).terrain.getName() !== tilename) && (themap.getTile(x,y+1).terrain.getName() !== "BlankBlack"))) { north = 1; }
  	if ((themap.getTile(x,y-1) !== "OoB") && ((themap.getTile(x,y-1).terrain.getName() !== tilename) && (themap.getTile(x,y-1).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x,y-1) < LOS_THRESHOLD) )) { spritecount += S_WALL; south = 1; vis = 1;}
  	else if ((themap.getTile(x,y-1) !== "OoB") && ((themap.getTile(x,y-1).terrain.getName() !== tilename) && (themap.getTile(x,y-1).terrain.getName() !== "BlankBlack"))) { south = 1; }
	  if ((themap.getTile(x-1,y) !== "OoB") && ((themap.getTile(x-1,y).terrain.getName() !== tilename) && (themap.getTile(x-1,y).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y) < LOS_THRESHOLD) )) { spritecount += E_WALL; east = 1; vis = 1;}
	  else if ((themap.getTile(x-1,y) !== "OoB") && ((themap.getTile(x-1,y).terrain.getName() !== tilename) && (themap.getTile(x-1,y).terrain.getName() !== "BlankBlack"))) { east = 1; }
  	if ((themap.getTile(x+1,y) !== "OoB") && ((themap.getTile(x+1,y).terrain.getName() !== tilename) && (themap.getTile(x+1,y).terrain.getName() !== "BlankBlack")) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y) < LOS_THRESHOLD) )) { spritecount += W_WALL; west = 1; vis = 1;}
  	else if ((themap.getTile(x+1,y) !== "OoB") && ((themap.getTile(x+1,y).terrain.getName() !== tilename) && (themap.getTile(x+1,y).terrain.getName() !== "BlankBlack"))) { west = 1; }
		
	 	if ((themap.getTile(x+1,y-1) !== "OoB") && (themap.getTile(x+1,y-1).terrain.getName() !== tilename) && (themap.getTile(x+1,y-1).terrain.getName() !== "BlankBlack") && (south === 0) && (west === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y-1) < LOS_THRESHOLD) ))
	 	  { spritecount += A_CORNER; vis = 1; cornerobj.corner = 1; cornerobj.north = 1; cornerobj.east = 1;}
  	if ((themap.getTile(x+1,y+1) !== "OoB") && (themap.getTile(x+1,y+1).terrain.getName() !== tilename) && (themap.getTile(x+1,y+1).terrain.getName() !== "BlankBlack") && (north === 0) && (west === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x+1,y+1) < LOS_THRESHOLD) )) 
  	  { spritecount += B_CORNER; vis = 1; cornerobj.corner = 1; cornerobj.south = 1; cornerobj.east = 1;}
	  if ((themap.getTile(x-1,y+1) !== "OoB") && (themap.getTile(x-1,y+1).terrain.getName() !== tilename) && (themap.getTile(x-1,y+1).terrain.getName() !== "BlankBlack") && (north === 0) && (east === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y+1) < LOS_THRESHOLD) ))
	    { spritecount += C_CORNER; vis = 1; cornerobj.corner = 1; cornerobj.south = 1; cornerobj.west = 1;}
	 	if ((themap.getTile(x-1,y-1) !== "OoB") && (themap.getTile(x-1,y-1).terrain.getName() !== tilename) && (themap.getTile(x-1,y-1).terrain.getName() !== "BlankBlack") && (south === 0) && (east === 0) && ((checklos === 0) || (themap.getLOS(fromx,fromy,x-1,y-1) < LOS_THRESHOLD) )) 
	 	  { spritecount += D_CORNER; vis = 1; cornerobj.corner = 1; cornerobj.north = 1; cornerobj.west = 1;}

	  if (vis === 0) { 
	  	let black = eidos.getForm('BlankBlack');
	  	let blkgraphics = black.getGraphicArray();
	  	graphics = blkgraphics;
	  } else {
      let yoff = parseInt(-1*spritecount*64/320)*64;
      let xoff = ((-1*spritecount*64)%320);
      graphics[2] = xoff;
      graphics[3] = yoff-ADD_Y;
    }
    graphics[4] = cornerobj;
	  return (graphics);
  }
}

// General func
function SetBySurroundCoast() {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
		if (losresult >= LOS_THRESHOLD) {
			let displaytile = eidos.getForm('BlankBlack');
			let displaygraphic = displaytile.getGraphicArray();
			return displaygraphic;
		}
    let ocean;
    let water;
    let shallow;
    let still;
    let localacre = themap.getTile(x,y-1);
    let tile; 
    if (localacre !== "OoB") {
    	tile = localacre.terrain;
    	if ((tile.getName() === "Ocean") || (tile.getName() === "ShadowOcean")) { ocean = tile; }
    	if ((tile.getName() === "Water") || (tile.getName() === "ShadowWater")) { water = tile; }
      if ((tile.getName() === "Shallows") || (tile.getName() === "ShadowShallows")) { shallow = tile; }
      if ((tile.getName() === "StillWater") || (tile.getName() === "ShadowStillWater")) { still = tile; }
    }
    localacre = themap.getTile(x,y+1);
    if (localacre !== "OoB") {
    	tile = localacre.terrain;
    	if ((tile.getName() === "Ocean") || (tile.getName() === "ShadowOcean")) { ocean = tile; }
    	if ((tile.getName() === "Water") || (tile.getName() === "ShadowWater")) { water = tile; }
      if ((tile.getName() === "Shallows") || (tile.getName() === "ShadowShallows")) { shallow = tile;; }
      if ((tile.getName() === "StillWater") || (tile.getName() === "ShadowStillWater")) { still = tile; }
    }
    localacre = themap.getTile(x+1,y);
    if (localacre !== "OoB") {
    	tile = localacre.terrain;
    	if ((tile.getName() === "Ocean") || (tile.getName() === "ShadowOcean")) { ocean = tile; }
    	if ((tile.getName() === "Water") || (tile.getName() === "ShadowWater")) { water = tile; }
      if ((tile.getName() === "Shallows") || (tile.getName() === "ShadowShallows")) { shallow = tile; }
      if ((tile.getName() === "StillWater") || (tile.getName() === "ShadowStillWater")) { still = tile; }
    }
    localacre = themap.getTile(x-1,y);
    if (localacre !== "OoB") {
    	tile = localacre.terrain;
    	if ((tile.getName() === "Ocean") || (tile.getName() === "ShadowOcean")) { ocean = tile; }
    	if ((tile.getName() === "Water") || (tile.getName() === "ShadowWater")) { water = tile; }
      if ((tile.getName() === "Shallows") || (tile.getName() === "ShadowShallows")) { shallow = tile; }
      if ((tile.getName() === "StillWater") || (tile.getName() === "ShadowStillWater")) { still = tile; }
    }
    let chosentile;
    if (shallow) { chosentile = shallow; }
    else if (water) { chosentile = water; }
    else if (ocean) { chosentile = ocean; }
    else if (still) { chosentile = still; }
    // kludge fix for clear lake
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
    
    let chosengraphics = chosentile.getGraphicArray();
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
			let displaytile = eidos.getForm('BlankBlack');
			let displaygraphic = displaytile.getGraphicArray();
			return displaygraphic;
		}

    let suffix = "";
	  let localacre = themap.getTile(x+1,y);
	  if (localacre !== "OoB") {
	  	let tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") !== -1) { suffix = suffix + "e";}
	  }	
	  localacre = themap.getTile(x-1,y);
	  if (localacre !== "OoB") {
	  	let tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") !== -1) { suffix = suffix + "w";}
	  }	
	  localacre = themap.getTile(x,y-1);
	  if (localacre !== "OoB") {
	  	let tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") !== -1) { suffix = suffix + "n";}
	  }	
	  localacre = themap.getTile(x,y+1);
	  if (localacre !== "OoB") {
	  	let tile = localacre.terrain;
	  	if (tile.getName().indexOf("Road") !== -1) { suffix = suffix + "s";}
	  }	
	  if ((suffix === "ewns") || (suffix === "")) { suffix = "x"; }
	  if ((suffix === "e") || (suffix === "w")) { suffix = "ew"; }
    if ((suffix === "n") || (suffix === "s")) { suffix = "ns"; }
    
    graphics[0] = "static.png";
    switch (suffix) {
      case "en": 
      graphics[2] = -9*32; graphics[3] = -8*32;
      return graphics;
      case "ens":
      graphics[2] = -9*32; graphics[3] = -9*32;
      return graphics;
      case "es":
      graphics[2] = -6*32; graphics[3] = -8*32;
      return graphics;
      case "ew":
      graphics[2] = -7*32; graphics[3] = -9*32;
      return graphics;
      case "ewn":
      graphics[2] = -6*32; graphics[3] = -9*32;
      return graphics;
      case "ews":
      graphics[2] = -9*32; graphics[3] = -7*32;
      return graphics;
      case "ns":
      graphics[2] = -8*32; graphics[3] = -7*32;
      return graphics;
      case "wn":
      graphics[2] = -8*32; graphics[3] = -8*32;
      return graphics;
      case "wns":
      graphics[2] = -6*32; graphics[3] = -10*32;
      return graphics;
      case "ws":
      graphics[2] = -7*32; graphics[3] = -8*32;
      return graphics;
      case "x":
      graphics[2] = -8*32; graphics[3] = -9*32;
      return graphics;
    }
//	  graphics[0] = "road-" + suffix + ".gif";
//		return graphics;
	}
}

// General func
function SetBySurroundRiver(terraintype) {
	this.setBySurround = function(x,y,themap,graphics, checklos, fromx, fromy, losresult) {
		if (losresult >= LOS_THRESHOLD) {
			let displaytile = eidos.getForm('BlankBlack');
			let displaygraphic = displaytile.getGraphicArray();
			return displaygraphic;
		}

		let north;
		let south;
		let east;
		let west;
		let northacre = themap.getTile(x,y-1);
		let northtile = northacre.terrain;
		if (northacre !== "OoB") {
			if (IsWet(northtile)) {
				north = 1;
			}
		} else { north = 1; }
		let southacre = themap.getTile(x,y+1);
		let southtile = southacre.terrain;
		if (southacre !== "OoB") {
			if (IsWet(southtile)) {
				south = 1;
			}
		} else { south = 1; }
		let eastacre = themap.getTile(x+1,y);
		let easttile = eastacre.terrain;
		if (eastacre !== "OoB") {
			if (IsWet(easttile)) {
				east = 1;
			}
		} else { east = 1; }
		let westacre = themap.getTile(x-1,y);
		let westtile = westacre.terrain;
		if (westacre !== "OoB") {
			if (IsWet(westtile)) {
				west = 1;
			}
		} else { west = 1; }
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
  this.pathweight = 1; // multiplicative
  this.civilizedpathweight = 1; // multiplicative, more to keep npcs on roads/paths
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

InanimateObject.prototype.getPathWeight = function(civ) {
  if (civ) { return this.civilizedpathweight; }
  return this.pathweight;
}

InanimateObject.prototype.setPathWeight = function(neww, civ) {
  if (civ) { this.civilizedpathweight = neww; return this.civilizedpathweight; }
  this.pathweight = neww;
	return this.pathweight;
}

InanimateObject.prototype.isHostileTo = function(who) {
  return 0;
}

// And now, on with the show!
// TERRAIN

function TerrainObject() {
  this.addType("Terrain");
  this.combatmap = "";
}

TerrainObject.prototype = new InanimateObject();

TerrainObject.prototype.serialize = function() {
  let name = this.name;
  let myatlas = new Atlas();
  PopulateAtlas(myatlas);
  let code = myatlas.keylookup(name);
  if (code) { return(code); }
  return(0);
}

TerrainObject.prototype.getCombatMap = function() {
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

function OceanTile() {
  //Graphics Upgraded
  this.name = "Ocean";
  this.graphic = "water.gif";
  this.desc = "deep water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL;
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
  this.combatmap = "Water";
  this.peerview = "#0000e0";
  this.walkSound = "water";
}
OceanTile.prototype = new TerrainObject();

function WaterTile() {
  this.name = "Water";
  this.graphic = "water.gif";
  this.desc = "water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = -32;
  this.spriteyoffset = 0;
  this.combatmap = "Water";
  this.peerview = "#4040fc";
  this.walkSound = "water";
}
WaterTile.prototype = new TerrainObject();

WaterTile.prototype.walkon = function(walker) {
  let resp = InWater(walker);
  return resp;
}

WaterTile.prototype.idle = function(walker) {
  let resp = InWater(walker);
  return resp;
}

function ShallowsTile() {
  this.name = "Shallows";
  this.graphic = "water.gif";
  this.desc = "shallow water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = -3*32;
  this.spriteyoffset = 0;
  this.combatmap = "Water";
  this.peerview = "#8080fc";
  this.walkSound = "water";
}
ShallowsTile.prototype = new TerrainObject();

ShallowsTile.prototype.walkon = function(walker) {
  let resp = InWater(walker);
  return resp;
}

ShallowsTile.prototype.idle = function(walker) {
  let resp = InWater(walker);
  return resp;
}

function StillWaterTile() {
  this.name = "StillWater";
  this.graphic = "water.gif";
  this.desc = "shallow water";
  this.blocklos = 0;
  this.passable = MOVE_SWIM + MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  this.spritexoffset = -2*32;
  this.spriteyoffset = 0;
  this.combatmap = "Water";
  this.peerview = "#8080fc";
  this.walkSound = "water";
}
StillWaterTile.prototype = new TerrainObject();

StillWaterTile.prototype.walkon = function(walker) {
  let resp = InWater(walker);
  return resp;
}

StillWaterTile.prototype.idle = function(walker) {
  let resp = InWater(walker);
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
  let resp = InWater(walker);
  return resp;
}

ShadowWaterTile.prototype.idle = function(walker) {
  let resp = InWater(walker);
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
  let resp = InWater(walker);
  return resp;
}

ShadowShallowsTile.prototype.idle = function(walker) {
  let resp = InWater(walker);
  return resp;
}

function InWater(who) {
  let response = {msg:""};
  if (who.getWaiting()) { 
    // entity is waiting and probably had been moved to a water tile 
    // because it was 0x0
    return response;
  }
  let whomov = who.getMovetype();
  if (MOVE_LEVITATE & whomov) {
    // entity is levitating and so won't drown
    return response;
  }  
  if (MOVE_ETHEREAL & whomov) {
    // entity is ethereal and can't drown
    return response;
  }
  if (MOVE_FLY & whomov) {
    // entity is flying and can't drown
    return response;
  }
  let localmap = who.getHomeMap();
  let tile = localmap.getTile(who.getx(),who.gety());
  let feats = tile.getFeatures();
  if (feats) {
    for (let i=0;i<feats.length;i++) {
      if (MOVE_WALK & feats[i].getPassable()) {
        return response;
      }
    }
  }

  let dur = DUTime.getGameClock() - who.getLastTurnTime();
  response.msg = "You have trouble keeping your head above the rough waters!";
  let dmg = dur * 3;
  who.dealDamage(dmg);
  
  return response;
}

function NoBlockMountainTile() {
  //Graphics Upgraded
  this.name = "NoBlockMountain";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = 0;
  this.desc = "mountains";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
  TilingSpritesheet.call(this, 2, 1);
}
NoBlockMountainTile.prototype = new TerrainObject();

function MountainTile() {
  //Graphics Upgraded
  this.name = "Mountain";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = 0;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
  TilingSpritesheet.call(this, 2, 1);
}
MountainTile.prototype = new TerrainObject();

function MountainPassTile() {
  //Graphics Upgraded
  this.name = "MountainPass";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = 0;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_WALK;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
  TilingSpritesheet.call(this, 2, 1);
}
MountainPassTile.prototype = new TerrainObject();

function FlameMountainTile() {
  this.name = "FlameMountain";
  this.graphic = "master_spritesheet.png";
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

function Mountain1Tile() {
  //Graphics Upgraded
  this.name = "Mountain1";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = 0;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1Tile.prototype = new TerrainObject();

function Mountain2Tile() {
  //Graphics Upgraded
  this.name = "Mountain1";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = 0;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2Tile.prototype = new TerrainObject();

function Mountain1MeadowBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain1MeadowBase";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1MeadowBaseTile.prototype = new TerrainObject();

function Mountain1GrassBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain1GrassBase";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1GrassBaseTile.prototype = new TerrainObject();

function Mountain1SandBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain1SandBase";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1SandBaseTile.prototype = new TerrainObject();

function Mountain1DirtBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain1DirtBase";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1DirtBaseTile.prototype = new TerrainObject();

function Mountain1CaveBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain1CaveBase";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1CaveBaseTile.prototype = new TerrainObject();

function Mountain2MeadowBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain2MeadowBase";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2MeadowBaseTile.prototype = new TerrainObject();

function Mountain2GrassBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain2GrassBase";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2GrassBaseTile.prototype = new TerrainObject();

function Mountain2SandBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain2SandBase";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2SandBaseTile.prototype = new TerrainObject();

function Mountain2DirtBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain2DirtBase";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2DirtBaseTile.prototype = new TerrainObject();

function Mountain2CaveBaseTile() {
  //Graphics Upgraded
  this.name = "Mountain2CaveBase";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -48*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2CaveBaseTile.prototype = new TerrainObject();

function Mountain1MeadowCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1MeadowCrown";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1MeadowCrownTile.prototype = new TerrainObject();

function Mountain1GrassCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1GrassCrown";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1GrassCrownTile.prototype = new TerrainObject();

function Mountain1SandCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1SandCrown";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1SandCrownTile.prototype = new TerrainObject();

function Mountain1DirtCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1DirtCrown";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1DirtCrownTile.prototype = new TerrainObject();

function Mountain1CaveCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1CaveCrown";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1CaveCrownTile.prototype = new TerrainObject();

function Mountain2MeadowCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2MeadowCrown";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -56*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2MeadowCrownTile.prototype = new TerrainObject();

function Mountain2GrassCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2GrassCrown";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -57*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2GrassCrownTile.prototype = new TerrainObject();

function Mountain2SandCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1SandCrown";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -57*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2SandCrownTile.prototype = new TerrainObject();

function Mountain2DirtCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2DirtCrown";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -57*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2DirtCrownTile.prototype = new TerrainObject();

function Mountain2CaveCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2CaveCrown";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2CaveCrownTile.prototype = new TerrainObject();

function Mountain1MeadowBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1MeadowBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -50*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1MeadowBaseCrownTile.prototype = new TerrainObject();

function Mountain1GrassBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1GrassBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -50*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1GrassBaseCrownTile.prototype = new TerrainObject();

function Mountain1SandBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1SandBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -50*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1SandBaseCrownTile.prototype = new TerrainObject();

function Mountain1DirtBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1DirtBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -50*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1DirtBaseCrownTile.prototype = new TerrainObject();

function Mountain1CaveBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1CaveBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -50*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain1CaveBaseCrownTile.prototype = new TerrainObject();

function Mountain2MeadowBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2MeadowBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2MeadowBaseCrownTile.prototype = new TerrainObject();

function Mountain2GrassBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2GrassBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2GrassBaseCrownTile.prototype = new TerrainObject();

function Mountain2SandBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain1SandBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2SandBaseCrownTile.prototype = new TerrainObject();

function Mountain2DirtBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2DirtBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2DirtBaseCrownTile.prototype = new TerrainObject();

function Mountain2CaveBaseCrownTile() {
  //Graphics Upgraded
  this.name = "Mountain2CaveBaseCrown";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -49*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
Mountain2CaveBaseCrownTile.prototype = new TerrainObject();

function MountainLeftMeadowTile() {
  //Graphics Upgraded
  this.name = "MountainLeftMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -53*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainLeftMeadowTile.prototype = new TerrainObject();

function MountainLeftGrassTile() {
  //Graphics Upgraded
  this.name = "MountainLeftGrass";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -53*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainLeftGrassTile.prototype = new TerrainObject();

function MountainLeftSandTile() {
  //Graphics Upgraded
  this.name = "MountainLeftSand";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainLeftSandTile.prototype = new TerrainObject();

function MountainLeftDirtTile() {
  //Graphics Upgraded
  this.name = "MountainLeftDirt";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainLeftDirtTile.prototype = new TerrainObject();

function MountainLeftCaveTile() {
  //Graphics Upgraded
  this.name = "MountainLeftCave";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainLeftCaveTile.prototype = new TerrainObject();

function MountainRightMeadowTile() {
  //Graphics Upgraded
  this.name = "MountainRightMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainRightMeadowTile.prototype = new TerrainObject();

function MountainRightGrassTile() {
  //Graphics Upgraded
  this.name = "MountainRightGrass";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainRightGrassTile.prototype = new TerrainObject();

function MountainRightSandTile() {
  //Graphics Upgraded
  this.name = "MountainRightSand";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -57*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainRightSandTile.prototype = new TerrainObject();

function MountainRightDirtTile() {
  //Graphics Upgraded
  this.name = "MountainRightDirt";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -54*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainRightDirtTile.prototype = new TerrainObject();

function MountainRightCaveTile() {
  //Graphics Upgraded
  this.name = "MountainRightCave";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -57*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainRightCaveTile.prototype = new TerrainObject();

function MountainHalfMeadow1Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfMeadow1";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -55*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfMeadow1Tile.prototype = new TerrainObject();

function MountainHalfGrass1Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfGrass1";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -55*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfGrass1Tile.prototype = new TerrainObject();

function MountainHalfSand1Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfSand1";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -55*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfSand1Tile.prototype = new TerrainObject();

function MountainHalfDirt1Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfDirt1";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -56*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfDirt1Tile.prototype = new TerrainObject();

function MountainHalfCave1Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfCave1";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -56*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfCave1Tile.prototype = new TerrainObject();

function MountainHalfMeadow2Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfMeadow2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfMeadow2Tile.prototype = new TerrainObject();

function MountainHalfGrass2Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfGrass2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfGrass2Tile.prototype = new TerrainObject();

function MountainHalfSand2Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfSand2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfSand2Tile.prototype = new TerrainObject();

function MountainHalfDirt2Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfDirt1";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfDirt2Tile.prototype = new TerrainObject();

function MountainHalfCave2Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfCave2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfCave2Tile.prototype = new TerrainObject();

function MountainHalfMeadow3Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfMeadow3";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfMeadow3Tile.prototype = new TerrainObject();

function MountainHalfGrass3Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfGrass3";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -58*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfGrass3Tile.prototype = new TerrainObject();

function MountainHalfSand3Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfSand3";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -59*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfSand3Tile.prototype = new TerrainObject();

function MountainHalfDirt3Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfDirt3";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -59*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfDirt3Tile.prototype = new TerrainObject();

function MountainHalfCave3Tile() {
  //Graphics Upgraded
  this.name = "MountainHalfCave3";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -59*32;
  this.desc = "mountains";
  this.blocklos = 1;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.combatmap = "Hill";
  this.peerview = "#fcfcfc";
  this.walkSound = "hill";
}
MountainHalfCave3Tile.prototype = new TerrainObject();

function StoneWallTile() {
  this.name = "StoneWall";
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  //Graphics Upgraded
  this.name = "FancyFloor";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "floor";
  this.peerview = "#600060";
  this.walkSound = "stone";
}
FancyFloorTile.prototype = new TerrainObject();

function FancyFloor2Tile() {
  //Graphics Upgraded
  this.name = "FancyFloor2";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "floor";
  this.peerview = "#600060";
  this.walkSound = "stone";
}
FancyFloor2Tile.prototype = new TerrainObject();

function FancyFloor3Tile() {
  //Graphics Upgraded
  this.name = "FancyFloor3";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "floor";
  this.peerview = "#600060";
  this.walkSound = "stone";
}
FancyFloor3Tile.prototype = new TerrainObject();

function HorizontalCounterTile() {
  this.name = "HorizontalCounter";
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.desc = "darkness";
  this.peerview = "black";
}
BlankBlackTile.prototype = new TerrainObject();

function ChasmTile() {
  this.name = "Chasm";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chasm";
  this.peerview = "black";
}
ChasmTile.prototype = new TerrainObject();

function DarknessTile() {
  this.name = "Darkness";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-128";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "darkness";
  this.peerview = "black";
}
DarknessTile.prototype = new TerrainObject();

function ShinyWallTile() {
  //Graphics Upgraded. Actually, new.
  this.name = "ShinyWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
ShinyWallTile.prototype = new TerrainObject();

function OffwhiteWallTile() {
  //Graphics Upgraded. Actually, new.
  this.name = "OffwhiteWall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
OffwhiteWallTile.prototype = new TerrainObject();

function WallTile() {
  //Graphics Upgraded
  this.name = "Wall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
WallTile.prototype = new TerrainObject();

function FireplaceWallTile() {
  //Graphics Upgraded
  this.name = "FireplaceWall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
FireplaceWallTile.prototype = new TerrainObject();

function GreyWallTile() {
  //Graphics Upgraded
  this.name = "GreyWall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -18*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
GreyWallTile.prototype = new TerrainObject();

function GreyFireplaceWallTile() {
  //Graphics Upgraded
  this.name = "GreyFireplaceWall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -18*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
GreyFireplaceWallTile.prototype = new TerrainObject();

function RuinsWallTile() {
  //Graphics Upgraded
  this.name = "RuinsWall";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallTile.prototype = new TerrainObject();

function RuinsWallArchTile() {
  //Graphics Upgraded
  this.name = "RuinsWallArch";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -14*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallArchTile.prototype = new TerrainObject();

function RuinsWallIvyTile() {
  //Graphics Upgraded
  this.name = "RuinsWallIvy";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -14*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallIvyTile.prototype = new TerrainObject();

function RuinsWallIvy2Tile() {
  //Graphics Upgraded
  this.name = "RuinsWallIvy2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -14*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallIvy2Tile.prototype = new TerrainObject();

function IllusionaryRuinsWallTile() {
  //Graphics Upgraded
  this.name = "IllusionaryRuinsWall";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "#600060";
}
IllusionaryRuinsWallTile.prototype = new TerrainObject();

function ArrowSlitTile() {
  //Graphics Upgraded
	this.name = "ArrowSlit";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -15*32;
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

function GreyArrowSlitTile() {
  //Graphics Upgraded
	this.name = "GreyArrowSlit";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -17*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = { distance : 1 , blocklos : 0 };
	this.blockloe = 1;
	this.loeupclose = {distance : 0 , blocklow : .2 };
	this.prefix = "an";
	this.desc = "arrow slit";
  this.peerview = "white";
}
GreyArrowSlitTile.prototype = new TerrainObject();

function WindowTile() {
  //Graphics Upgraded
	this.name = "Window";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.blockloe = 1;
	this.prefix = "a";
	this.desc = "window";
  this.peerview = "white";
}
WindowTile.prototype = new TerrainObject();

function GreyWindowTile() {
  //Graphics Upgraded
	this.name = "GreyWindow";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -17*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.blockloe = 1;
	this.prefix = "a";
	this.desc = "window";
  this.peerview = "white";
}
GreyWindowTile.prototype = new TerrainObject();

function ShadowWindowTile() {
	this.name = "ShadowWindow";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-352";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.blockloe = 1;
	this.prefix = "a";
	this.desc = "window";
  this.peerview = "white";
}
ShadowWindowTile.prototype = new TerrainObject();

function WallNETile() {
  this.name = "WallNE";
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  //Graphics Upgraded
  this.name = "PlanksNS";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
PlanksNSTile.prototype = new TerrainObject();

function DarkPlanksNSTile() {
  //Graphics Upgraded
  this.name = "DarkPlanksNS";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
DarkPlanksNSTile.prototype = new TerrainObject();

function RoughPlanksNSTile() {
  //Graphics Upgraded
  this.name = "RoughPlanksNS";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
RoughPlanksNSTile.prototype = new TerrainObject();

function ShadowPlanksNSTile() {
  this.name = "ShadowPlanksNS";
  this.graphic = "master_spritesheet";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-352";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#1c6000";
  this.walkSound = "stone";
}
ShadowPlanksNSTile.prototype = new TerrainObject();

function SouthCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "SouthCoastMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -52*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
SouthCoastMeadowTile.prototype = new TerrainObject();

function SouthCoastTile() {
  //Graphics Upgraded
  this.name = "SouthCoast";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -52*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
SouthCoastTile.prototype = new TerrainObject();

function SouthCoastSandTile() {
  //Graphics Upgraded
  this.name = "SouthCoastSand";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -52*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
SouthCoastSandTile.prototype = new TerrainObject();

function SouthCoastDirtTile() {
  //Graphics Upgraded
  this.name = "SouthCoastDirt";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -53*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
SouthCoastDirtTile.prototype = new TerrainObject();

function SouthCoastCaveTile() {
  //Graphics Upgraded
  this.name = "SouthCoastCave";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -53*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
SouthCoastCaveTile.prototype = new TerrainObject();

function NorthCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "NorthCoastMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
NorthCoastMeadowTile.prototype = new TerrainObject();

function NorthCoastTile() {
  //Graphics Upgraded
  this.name = "NorthCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
NorthCoastTile.prototype = new TerrainObject();

function NorthCoastSandTile() {
  //Graphics Upgraded
  this.name = "NorthCoastSand";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
NorthCoastSandTile.prototype = new TerrainObject();

function NorthCoastDirtTile() {
  //Graphics Upgraded
  this.name = "NorthCoastDirt";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
NorthCoastDirtTile.prototype = new TerrainObject();

function NorthCoastCaveTile() {
  //Graphics Upgraded
  this.name = "NorthCoastCave";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -55*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
NorthCoastCaveTile.prototype = new TerrainObject();

function EastCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "EastCoastMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
EastCoastMeadowTile.prototype = new TerrainObject();

function EastCoastTile() {
  //Graphics Upgraded
  this.name = "EastCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
EastCoastTile.prototype = new TerrainObject();

function EastCoastRoadEndTile() {
  //Graphics Upgraded
  this.name = "EastCoastRoadEnd";
}
EastCoastRoadEndTile.prototype = new EastCoastTile();

function EastCoastSandTile() {
  //Graphics Upgraded
  this.name = "EastCoastSand";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
EastCoastSandTile.prototype = new TerrainObject();

function EastCoastDirtTile() {
  //Graphics Upgraded
  this.name = "EastCoastDirt";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
EastCoastDirtTile.prototype = new TerrainObject();

function EastCoastCaveTile() {
  //Graphics Upgraded
  this.name = "EastCoastCave";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -56*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
EastCoastCaveTile.prototype = new TerrainObject();

function WestCoastMeadowTile() {
  //Graphics Upgraded
  this.name = "WestCoastMeadow";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
WestCoastMeadowTile.prototype = new TerrainObject();

function WestCoastTile() {
  //Graphics Upgraded
  this.name = "WestCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
}
WestCoastTile.prototype = new TerrainObject();

function WestCoastSandTile() {
  //Graphics Upgraded
  this.name = "WestCoastSand";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
WestCoastSandTile.prototype = new TerrainObject();

function WestCoastDirtTile() {
  //Graphics Upgraded
  this.name = "WestCoastDirt";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
WestCoastDirtTile.prototype = new TerrainObject();

function WestCoastCaveTile() {
  //Graphics Upgraded
  this.name = "WestCoastCave";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -57*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
WestCoastCaveTile.prototype = new TerrainObject();

function NortheastCoastMeadowTile() {
  this.name = "NortheastCoastMeadow";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast.gif";
  this.layers = [["static.png","",-5*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastMeadowTile.prototype = new TerrainObject();

function NortheastCoastTile() {
  this.name = "NortheastCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast.gif";
  this.layers = [["static.png","",-6*32,-51*32]];
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
  //this.overlay = "necoast-sand.gif";
  this.layers = [["static.png","",-7*32,-51*32]]
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastSandTile.prototype = new TerrainObject();

function NortheastCoastDirtTile() {
  this.name = "NortheastCoastDirt";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast-sand.gif";
  this.layers = [["static.png","",0,-53*32]]
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastDirtTile.prototype = new TerrainObject();

function NortheastCoastCaveTile() {
  this.name = "NortheastCoastCave";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "necoast-sand.gif";
  this.layers = [["static.png","",-1*32,-53*32]]
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NortheastCoastCaveTile.prototype = new TerrainObject();

function SouthwestCoastMeadowTile() {
  this.name = "SouthwestCoastMeadow";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "swcoast.gif";
  this.layers = [["static.png","",-5*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastMeadowTile.prototype = new TerrainObject();

function SouthwestCoastTile() {
  this.name = "SouthwestCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "swcoast.gif";
  this.layers = [["static.png","",-6*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastTile.prototype = new TerrainObject();

function SouthwestCoastSandTile() {
  this.name = "SouthwestCoastSand";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "swcoast-sand.gif";
  this.layers = [["static.png","",-7*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastSandTile.prototype = new TerrainObject();

function SouthwestCoastDirtTile() {
  this.name = "SouthwestCoastDirt";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "swcoast-sand.gif";
  this.layers = [["static.png","",-8*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastDirtTile.prototype = new TerrainObject();

function SouthwestCoastCaveTile() {
  this.name = "SouthwestCoastCave";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "swcoast-sand.gif";
  this.layers = [["static.png","",-9*32,-50*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SouthwestCoastCaveTile.prototype = new TerrainObject();

function NorthwestCoastMeadowTile() {
  this.name = "NorthwestCoastMeadow";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "nwcoast.gif";
  this.layers = [["static.png","",0,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastMeadowTile.prototype = new TerrainObject();

function NorthwestCoastTile() {
  this.name = "NorthwestCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "nwcoast.gif";
  this.layers = [["static.png","",-32,-52*32]];
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
//  this.overlay = "nwcoast-sand.gif";
  this.layers = [["static.png","",-2*32,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastSandTile.prototype = new TerrainObject();

function NorthwestCoastDirtTile() {
  this.name = "NorthwestCoastDirt";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "nwcoast-sand.gif";
  this.layers = [["static.png","",-3*32,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastDirtTile.prototype = new TerrainObject();

function NorthwestCoastCaveTile() {
  this.name = "NorthwestCoastCave";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "nwcoast-sand.gif";
  this.layers = [["static.png","",-4*32,-52*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
NorthwestCoastCaveTile.prototype = new TerrainObject();

function SoutheastCoastMeadowTile() {
  this.name = "SoutheastCoastMeadow";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "secoast.gif";
  this.layers = [["static.png","",0,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastMeadowTile.prototype = new TerrainObject();

function SoutheastCoastTile() {
  this.name = "SoutheastCoast";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
//  this.overlay = "secoast.gif";
  this.layers = [["static.png","",-32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastTile.prototype = new TerrainObject();

function SoutheastCoastSandTile() {
  this.name = "SoutheastCoastSand";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "secoast-sand.gif";
  this.layers = [["static.png","",-2*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastSandTile.prototype = new TerrainObject();

function SoutheastCoastDirtTile() {
  this.name = "SoutheastCoastDirt";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "secoast-sand.gif";
  this.layers = [["static.png","",-3*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastDirtTile.prototype = new TerrainObject();

function SoutheastCoastCaveTile() {
  this.name = "SoutheastCoastCave";
  this.graphic = "flowing_animations.gif";
  this.spritexoffset = "-192";
  this.spriteyoffset = "0";
  //this.overlay = "secoast-sand.gif";
  this.layers = [["static.png","",-4*32,-51*32]];
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "coast";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
  
  SetBySurroundCoast.call(this);
}
SoutheastCoastCaveTile.prototype = new TerrainObject();

function ShadowSouthCoastTile() {
  this.name = "ShadowSouthCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-352";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-352";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-352";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-352";
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

function RiverBaseTile() {
  this.name = "RiverBase";
//  this.overlay = "riverns.gif";
  this.layers = [["static.png", "", 0,-42*32]];
  this.graphic = "water.gif";
  this.spritexoffset = "-64";
  this.spriteyoffset = "0";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "river";
  this.combatmap = "Water";
  this.peerview = "#8080fc";
  this.walkSound = "water";

}
RiverBaseTile.prototype = new TerrainObject();

function RiverGrassSourceNTile() {
  this.name = "RiverGrassSourceN";
  this.layers = [["static.png", "", -4*32, -43*32]];
}
RiverGrassSourceNTile.prototype = new RiverBaseTile();

function RiverGrassSourceWTile() {
  this.name = "RiverGrassSourceW";
  this.layers = [["static.png", "", -7*32, -43*32]];
}
RiverGrassSourceWTile.prototype = new RiverBaseTile();

function RiverGrassSourceSTile() {
  this.name = "RiverGrassSourceS";
  this.layers = [["static.png", "", -4*32, -44*32]];
}
RiverGrassSourceSTile.prototype = new RiverBaseTile();

function RiverGrassSourceETile() {
  this.name = "RiverGrassSourceE";
  this.layers = [["static.png", "", -7*32, -44*32]];
}
RiverGrassSourceETile.prototype = new RiverBaseTile();

function RiverDirtSourceNTile() {
  this.name = "RiverDirtSourceN";
  this.layers = [["static.png", "", -5*32, -43*32]];
}
RiverDirtSourceNTile.prototype = new RiverBaseTile();

function RiverDirtSourceWTile() {
  this.name = "RiverDirtSourceW";
  this.layers = [["static.png", "", -8*32, -43*32]];
}
RiverDirtSourceWTile.prototype = new RiverBaseTile();

function RiverDirtSourceSTile() {
  this.name = "RiverDirtSourceS";
  this.layers = [["static.png", "", -5*32, -44*32]];
}
RiverDirtSourceSTile.prototype = new RiverBaseTile();

function RiverDirtSourceETile() {
  this.name = "RiverDirtSourceE";
  this.layers = [["static.png", "", -8*32, -44*32]];
}
RiverDirtSourceETile.prototype = new RiverBaseTile();

function RiverCaveSourceNTile() {
  this.name = "RiverCaveSourceN";
  this.layers = [["static.png", "", -6*32, -43*32]];
}
RiverCaveSourceNTile.prototype = new RiverBaseTile();

function RiverCaveSourceWTile() {
  this.name = "RiverCaveSourceW";
  this.layers = [["static.png", "", -9*32, -43*32]];
}
RiverCaveSourceWTile.prototype = new RiverBaseTile();

function RiverCaveSourceSTile() {
  this.name = "RiverCaveSourceS";
  this.layers = [["static.png", "", -6*32, -44*32]];
}
RiverCaveSourceSTile.prototype = new RiverBaseTile();

function RiverCaveSourceETile() {
  this.name = "RiverCaveSourceE";
  this.layers = [["static.png", "", -9*32, -44*32]];
}
RiverCaveSourceETile.prototype = new RiverBaseTile();

function RiverGrassNSTile() {
  this.name = "RiverGrassNS";
  this.layers = [["static.png", "", 0, -42*32]];
}
RiverGrassNSTile.prototype = new RiverBaseTile();

function RiverDirtNSTile() {
  this.name = "RiverDirtNS";
  this.layers = [["static.png", "", 0, -41*32]];
}
RiverDirtNSTile.prototype = new RiverBaseTile();

function RiverCaveNSTile() {
  this.name = "RiverCaveNS";
  this.layers = [["static.png", "", 0, -47*32]];
}
RiverCaveNSTile.prototype = new RiverBaseTile();

function RiverGrassEW_NTile() {
  this.name = "RiverGrassEW_N";
  this.layers = [["static.png", "", -7*32, -42*32]];
}
RiverGrassEW_NTile.prototype = new RiverBaseTile();

function RiverDirtEW_NTile() {
  this.name = "RiverDirtEW_N";
  this.layers = [["static.png", "", -7*32, -41*32]];
}
RiverDirtEW_NTile.prototype = new RiverBaseTile();

function RiverCaveEW_NTile() {
  this.name = "RiverCaveEW_N";
  this.layers = [["static.png", "", -7*32, -47*32]];
}
RiverCaveEW_NTile.prototype = new RiverBaseTile();

function RiverGrassEW_STile() {
  this.name = "RiverGrassEW_S";
  this.layers = [["static.png", "", -8*32, -42*32]];
}
RiverGrassEW_STile.prototype = new RiverBaseTile();

function RiverDirtEW_STile() {
  this.name = "RiverDirtEW_S";
  this.layers = [["static.png", "", -8*32, -41*32]];
}
RiverDirtEW_STile.prototype = new RiverBaseTile();

function RiverCaveEW_STile() {
  this.name = "RiverCaveEW_S";
  this.layers = [["static.png", "", -8*32, -47*32]];
}
RiverCaveEW_STile.prototype = new RiverBaseTile();

function RiverGrassSETile() {
  this.name = "RiverGrassSE";
  this.layers = [["static.png", "", -32, -42*32]];
}
RiverGrassSETile.prototype = new RiverBaseTile();

function RiverDirtSETile() {
  this.name = "RiverDirtSE";
  this.layers = [["static.png", "", -32, -41*32]];
}
RiverDirtSETile.prototype = new RiverBaseTile();

function RiverCaveSETile() {
  this.name = "RiverCaveSE";
  this.layers = [["static.png", "", -32, -47*32]];
}
RiverCaveSETile.prototype = new RiverBaseTile();

function RiverGrassSWTile() {
  this.name = "RiverGrassSW";
  this.layers = [["static.png", "", -2*32, -42*32]];
}
RiverGrassSWTile.prototype = new RiverBaseTile();

function RiverDirtSWTile() {
  this.name = "RiverDirtSW";
  this.layers = [["static.png", "", -2*32, -41*32]];
}
RiverDirtSWTile.prototype = new RiverBaseTile();

function RiverCaveSWTile() {
  this.name = "RiverCaveSW";
  this.layers = [["static.png", "", -2*32, -47*32]];
}
RiverCaveSWTile.prototype = new RiverBaseTile();

function RiverGrassNE_STile() {
  this.name = "RiverGrassNE_S";
  this.layers = [["static.png", "", -3*32, -42*32]];
}
RiverGrassNE_STile.prototype = new RiverBaseTile();

function RiverDirtNE_STile() {
  this.name = "RiverDirtNE_S";
  this.layers = [["static.png", "", -3*32, -41*32]];
}
RiverDirtNE_STile.prototype = new RiverBaseTile();

function RiverCaveNE_STile() {
  this.name = "RiverCaveNE_S";
  this.layers = [["static.png", "", -3*32, -47*32]];
}
RiverCaveNE_STile.prototype = new RiverBaseTile();

function RiverGrassEW_SNTile() {
  this.name = "RiverGrassEW_SN";
  this.layers = [["static.png", "", -4*32, -42*32]];
}
RiverGrassEW_SNTile.prototype = new RiverBaseTile();

function RiverDirtEW_SNTile() {
  this.name = "RiverDirtEW_SN";
  this.layers = [["static.png", "", -4*32, -41*32]];
}
RiverDirtEW_SNTile.prototype = new RiverBaseTile();

function RiverCaveEW_SNTile() {
  this.name = "RiverCaveEW_SN";
  this.layers = [["static.png", "", -4*32, -47*32]];
}
RiverCaveEW_SNTile.prototype = new RiverBaseTile();

function RiverGrassEW_NSTile() {
  this.name = "RiverGrassEW_NS";
  this.layers = [["static.png", "", -5*32, -42*32]];
}
RiverGrassEW_NSTile.prototype = new RiverBaseTile();

function RiverDirtEW_NSTile() {
  this.name = "RiverDirtEW_NS";
  this.layers = [["static.png", "", -5*32, -41*32]];
}
RiverDirtEW_NSTile.prototype = new RiverBaseTile();

function RiverCaveEW_NSTile() {
  this.name = "RiverCaveEW_NS";
  this.layers = [["static.png", "", -5*32, -47*32]];
}
RiverCaveEW_NSTile.prototype = new RiverBaseTile();

function RiverGrassNW_STile() {
  this.name = "RiverGrassNW_S";
  this.layers = [["static.png", "", -6*32, -42*32]];
}
RiverGrassNW_STile.prototype = new RiverBaseTile();

function RiverDirtNW_STile() {
  this.name = "RiverDirtNW_S";
  this.layers = [["static.png", "", -6*32, -41*32]];
}
RiverDirtNW_STile.prototype = new RiverBaseTile();

function RiverCaveNW_STile() {
  this.name = "RiverCaveNW_S";
  this.layers = [["static.png", "", -6*32, -47*32]];
}
RiverCaveNW_STile.prototype = new RiverBaseTile();

function RiverGrassNE_NTile() {
  this.name = "RiverGrassNE_N";
  this.layers = [["static.png", "", -4*32, -45*32]];
}
RiverGrassNE_NTile.prototype = new RiverBaseTile();

function RiverDirtNE_NTile() {
  this.name = "RiverDirtNE_N";
  this.layers = [["static.png", "", 0, -46*32]];
}
RiverDirtNE_NTile.prototype = new RiverBaseTile();

function RiverCaveNE_NTile() {
  this.name = "RiverCaveNE_N";
  this.layers = [["static.png", "", -2*32, -46*32]];
}
RiverCaveNE_NTile.prototype = new RiverBaseTile();

function RiverGrassNW_NTile() {
  this.name = "RiverGrassNW_N";
  this.layers = [["static.png", "", -5*32, -45*32]];
}
RiverGrassNW_NTile.prototype = new RiverBaseTile();

function RiverDirtNW_NTile() {
  this.name = "RiverDirtNW_N";
  this.layers = [["static.png", "", -1*32, -46*32]];
}
RiverDirtNW_NTile.prototype = new RiverBaseTile();

function RiverCaveNW_NTile() {
  this.name = "RiverCaveNW_N";
  this.layers = [["static.png", "", -3*32, -46*32]];
}
RiverCaveNW_NTile.prototype = new RiverBaseTile();

function RiverGrassMouthNTile() {
  this.name = "RiverGrassMouthN";
  this.layers = [["static.png", "", -7*32, -59*32]];
}
RiverGrassMouthNTile.prototype = new RiverBaseTile();

function RiverDirtMouthNTile() {
  this.name = "RiverDirtMouthN";
  this.layers = [["static.png", "", -8*32, -59*32]];
}
RiverDirtMouthNTile.prototype = new RiverBaseTile();

function RiverCaveMouthNTile() {
  this.name = "RiverCaveMouthN";
  this.layers = [["static.png", "", -9*32, -59*32]];
}
RiverCaveMouthNTile.prototype = new RiverBaseTile();

function RiverGrassMouthSTile() {
  this.name = "RiverGrassMouthS";
  this.layers = [["static.png", "", -0, -67*32]];
}
RiverGrassMouthSTile.prototype = new RiverBaseTile();

function RiverDirtMouthSTile() {
  this.name = "RiverDirtMouthS";
  this.layers = [["static.png", "", -1*32, -67*32]];
}
RiverDirtMouthSTile.prototype = new RiverBaseTile();

function RiverCaveMouthSTile() {
  this.name = "RiverCaveMouthS";
  this.layers = [["static.png", "", -9*32, -67*32]];
}
RiverCaveMouthSTile.prototype = new RiverBaseTile();

function RiverGrassMouthE_NTile() {
  this.name = "RiverGrassMouthE_N";
  this.layers = [["static.png", "", -9*32, -65*32]];
}
RiverGrassMouthE_NTile.prototype = new RiverBaseTile();

function RiverDirtMouthE_NTile() {
  this.name = "RiverDirtMouthE_N";
  this.layers = [["static.png", "", -1*32, -65*32]];
}
RiverDirtMouthE_NTile.prototype = new RiverBaseTile();

function RiverCaveMouthE_NTile() {
  this.name = "RiverCaveMouthE_N";
  this.layers = [["static.png", "", 0, -65*32]];
}
RiverCaveMouthE_NTile.prototype = new RiverBaseTile();

function RiverGrassMouthW_NTile() {
  this.name = "RiverGrassMouthW_N";
  this.layers = [["static.png", "", -6*32, -65*32]];
}
RiverGrassMouthW_NTile.prototype = new RiverBaseTile();

function RiverDirtMouthW_NTile() {
  this.name = "RiverDirtMouthW_N";
  this.layers = [["static.png", "", -7*32, -65*32]];
}
RiverDirtMouthW_NTile.prototype = new RiverBaseTile();

function RiverCaveMouthW_NTile() {
  this.name = "RiverCaveMouthW_N";
  this.layers = [["static.png", "", -8*32, -65*32]];
}
RiverCaveMouthW_NTile.prototype = new RiverBaseTile();

function RiverGrassSEW_STile() {
  this.name = "RiverGrassSEW_S";
  this.layers = [["static.png", "", -4*32, -62*32]];
}
RiverGrassSEW_STile.prototype = new RiverBaseTile();

function RiverDirtSEW_STile() {
  this.name = "RiverDirtSEW_S";
  this.layers = [["static.png", "", -5*32, -62*32]];
}
RiverDirtSEW_STile.prototype = new RiverBaseTile();

function RiverCaveSEW_STile() {
  this.name = "RiverCaveSEW_S";
  this.layers = [["static.png", "", -6*32, -62*32]];
}
RiverCaveSEW_STile.prototype = new RiverBaseTile();

function RiverGrassNSE_NTile() {
  this.name = "RiverGrassNSE_N";
  this.layers = [["static.png", "", -4*32, -63*32]];
}
RiverGrassNSE_NTile.prototype = new RiverBaseTile();

function RiverDirtNSE_NTile() {
  this.name = "RiverDirtNSE_N";
  this.layers = [["static.png", "", -5*32, -63*32]];
}
RiverDirtNSE_NTile.prototype = new RiverBaseTile();

function RiverCaveNSE_NTile() {
  this.name = "RiverCaveNSE_N";
  this.layers = [["static.png", "", -6*32, -63*32]];
}
RiverCaveNSE_NTile.prototype = new RiverBaseTile();

function RiverGrassNSW_STile() {
  this.name = "RiverGrassNSW_S";
  this.layers = [["static.png", "", -7*32, -62*32]];
}
RiverGrassNSW_STile.prototype = new RiverBaseTile();

function RiverDirtNSW_STile() {
  this.name = "RiverDirtNSW_S";
  this.layers = [["static.png", "", -4*32, -65*32]];
}
RiverDirtNSW_STile.prototype = new RiverBaseTile();

function RiverCaveNSW_STile() {
  this.name = "RiverCaveNSW_S";
  this.layers = [["static.png", "", -5*32, -65*32]];
}
RiverCaveNSW_STile.prototype = new RiverBaseTile();

function RiverGrassMouthW_STile() {
  this.name = "RiverGrassMouthW_S";
  this.layers = [["static.png", "", -9*32, -66*32]];
}
RiverGrassMouthW_STile.prototype = new RiverBaseTile();

function RiverDirtMouthW_STile() {
  this.name = "RiverDirtMouthW_S";
  this.layers = [["static.png", "", 0, -66*32]];
}
RiverDirtMouthW_STile.prototype = new RiverBaseTile();

function RiverCaveMouthW_STile() {
  this.name = "RiverCaveMouthW_S";
  this.layers = [["static.png", "", -1*32, -66*32]];
}
RiverCaveMouthW_STile.prototype = new RiverBaseTile();

function RiverGrassMouthE_STile() {
  this.name = "RiverGrassMouthE_S";
  this.layers = [["static.png", "", -4*32, -46*32]];
}
RiverGrassMouthE_STile.prototype = new RiverBaseTile();

function RiverDirtMouthE_STile() {
  this.name = "RiverDirtMouthE_S";
  this.layers = [["static.png", "", -5*32, -46*32]];
}
RiverDirtMouthE_STile.prototype = new RiverBaseTile();

function RiverCaveMouthE_STile() {
  this.name = "RiverCaveMouthE_S";
  this.layers = [["static.png", "", -2*32, -60*32]];
}
RiverCaveMouthE_STile.prototype = new RiverBaseTile();

function RiverGrassNSW_NTile() {
  this.name = "RiverGrassNSW_N";
  this.layers = [["static.png", "", -7*32, -63*32]];
}
RiverGrassNSW_NTile.prototype = new RiverBaseTile();

function RiverDirtNSW_NTile() {
  this.name = "RiverDirtNSW_N";
  this.layers = [["static.png", "", -4*32, -66*32]];
}
RiverDirtNSW_NTile.prototype = new RiverBaseTile();

function RiverCaveNSW_NTile() {
  this.name = "RiverCaveNSW_N";
  this.layers = [["static.png", "", -5*32, -66*32]];
}
RiverCaveNSW_NTile.prototype = new RiverBaseTile();

function RiverGrassNEW_STile() {
  this.name = "RiverGrassNEW_S";
  this.layers = [["static.png", "", -4*32, -64*32]];
}
RiverGrassNEW_STile.prototype = new RiverBaseTile();

function RiverDirtNEW_STile() {
  this.name = "RiverDirtNEW_S";
  this.layers = [["static.png", "", -5*32, -64*32]];
}
RiverDirtNEW_STile.prototype = new RiverBaseTile();

function RiverCaveNEW_STile() {
  this.name = "RiverCaveNEW_S";
  this.layers = [["static.png", "", -6*32, -64*32]];
}
RiverCaveNEW_STile.prototype = new RiverBaseTile();

function RiverGrassSEW_NTile() {
  this.name = "RiverGrassSEW_N";
  this.layers = [["static.png", "", -7*32, -64*32]];
}
RiverGrassSEW_NTile.prototype = new RiverBaseTile();

function RiverDirtSEW_NTile() {
  this.name = "RiverDirtSEW_N";
  this.layers = [["static.png", "", -4*32, -67*32]];
}
RiverDirtSEW_NTile.prototype = new RiverBaseTile();

function RiverCaveSEW_NTile() {
  this.name = "RiverCaveSEW_N";
  this.layers = [["static.png", "", -5*32, -67*32]];
}
RiverCaveSEW_NTile.prototype = new RiverBaseTile();

function RiverGrassNSE_STile() {
  this.name = "RiverGrassNSE_S";
  this.layers = [["static.png", "", -6*32, -66*32]];
}
RiverGrassNSE_STile.prototype = new RiverBaseTile();

function RiverDirtNSE_STile() {
  this.name = "RiverDirtNSE_S";
  this.layers = [["static.png", "", -7*32, -66*32]];
}
RiverDirtNSE_STile.prototype = new RiverBaseTile();

function RiverCaveNSE_STile() {
  this.name = "RiverCaveNSE_S";
  this.layers = [["static.png", "", -8*32, -66*32]];
}
RiverCaveNSE_STile.prototype = new RiverBaseTile();

function RiverGrassNEW_NTile() {
  this.name = "RiverGrassNEW_N";
  this.layers = [["static.png", "", -6*32, -67*32]];
}
RiverGrassNEW_NTile.prototype = new RiverBaseTile();

function RiverDirtNEW_NTile() {
  this.name = "RiverDirtNEW_N";
  this.layers = [["static.png", "", -7*32, -67*32]];
}
RiverDirtNEW_NTile.prototype = new RiverBaseTile();

function RiverCaveNEW_NTile() {
  this.name = "RiverCaveNEW_N";
  this.layers = [["static.png", "", -8*32, -67*32]];
}
RiverCaveNEW_NTile.prototype = new RiverBaseTile();

function RedCobblestoneTile() {
  //Graphics Upgraded
  this.name = "RedCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
RedCobblestoneTile.prototype = new TerrainObject();

function BlueCobblestoneTile() {
  //Graphics Upgraded
  this.name = "BlueCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BlueCobblestoneTile.prototype = new TerrainObject();

function BlackCobblestoneTile() {
  //Graphics Upgraded
  this.name = "BlackCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BlackCobblestoneTile.prototype = new TerrainObject();

function CrackedBlackCobblestoneTile() {
  //Graphics Upgraded
  this.name = "CrackedBlackCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
CrackedBlackCobblestoneTile.prototype = new TerrainObject();

function CobblestoneTile() {
  //Graphics Upgraded
  this.name = "Cobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
CobblestoneTile.prototype = new TerrainObject();

function BrokenCobblestoneTile() {
  //Graphics Upgraded
  this.name = "BrokenCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -6*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BrokenCobblestoneTile.prototype = new TerrainObject();

function FadedCobblestoneTile() {
  //Graphics Upgraded
  this.name = "FadedCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedCobblestoneTile.prototype = new TerrainObject();

function FadedCobblestone2Tile() {
  //Graphics Upgraded
  this.name = "FadedCobblestone2";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedCobblestone2Tile.prototype = new TerrainObject();

// atlas/editor needs start here
function ClayPaversTile() {
  //Graphics Upgraded
  this.name = "ClayPavers";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "clay brick floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
ClayPaversTile.prototype = new TerrainObject();

function FadedWoodNSTile() {
  //Graphics Upgraded
  this.name = "FadedWoodNS";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "wood floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedWoodNSTile.prototype = new TerrainObject();

function FadedWoodEWTile() {
  //Graphics Upgraded
  this.name = "FadedWoodEW";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "wood floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedWoodEWTile.prototype = new TerrainObject();

function BlueTileFloorTile() {
  //Graphics Upgraded
  this.name = "BlueTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "blue tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BlueTileFloorTile.prototype = new TerrainObject();

function BlueMarbleTileFloorTile() {
  //Graphics Upgraded
  this.name = "BlueMarbleTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BlueMarbleTileFloorTile.prototype = new TerrainObject();

function GreenTileFloorTile() {
  //Graphics Upgraded
  this.name = "GreenTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
GreenTileFloorTile.prototype = new TerrainObject();

function GreenCheckeredTileFloorTile() {
  //Graphics Upgraded
  this.name = "GreenCheckeredTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
GreenCheckeredTileFloorTile.prototype = new TerrainObject();

function StonePaverTile() {
  //Graphics Upgraded
  this.name = "StonePaver";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone paver";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
StonePaverTile.prototype = new TerrainObject();

function StonePaver2Tile() {
  //Graphics Upgraded
  this.name = "StonePaver2";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -86*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "stone paver";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
StonePaver2Tile.prototype = new TerrainObject();

function RedTileFloorTile() {
  //Graphics Upgraded
  this.name = "RedTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
RedTileFloorTile.prototype = new TerrainObject();

function DarkBlueTileFloorTile() {
  //Graphics Upgraded
  this.name = "DarkBlueTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
DarkBlueTileFloorTile.prototype = new TerrainObject();

function BrokenTileFloorTile() {
  //Graphics Upgraded
  this.name = "BrokenTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
BrokenTileFloorTile.prototype = new TerrainObject();

function GreyTileFloorTile() {
  //Graphics Upgraded
  this.name = "GreyTileFloor";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tile floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
GreyTileFloorTile.prototype = new TerrainObject();

function FadedFancyFloorTile() {
  //Graphics Upgraded
  this.name = "FadedFancyFloor";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedFancyFloorTile.prototype = new TerrainObject();

function FadedFancyFloor2Tile() {
  //Graphics Upgraded
  this.name = "FadedFancyFloor2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedFancyFloor2Tile.prototype = new TerrainObject();

function FadedFancyFloor3Tile() {
  //Graphics Upgraded
  this.name = "FadedFancyFloor3";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedFancyFloor3Tile.prototype = new TerrainObject();

function CrackedStoneFloorTile() {
  //Graphics Upgraded
  this.name = "CrackedStoneFloor";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
CrackedStoneFloorTile.prototype = new TerrainObject();

function FadedDarkWoodNSTile() {
  //Graphics Upgraded
  this.name = "FadedDarkWoodNS";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "floor";
  this.peerview = "#800000";
  this.walkSound = "stone";
}
FadedDarkWoodNSTile.prototype = new TerrainObject();

function CobblestoneRoadTile() {
  //Graphics Upgraded
  this.name = "CobblestoneRoad";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
  this.civilizedpathweight = .6;
}
CobblestoneRoadTile.prototype = new TerrainObject();

function PurpleCobblestoneRoadTile() {
  //Graphics Upgraded
  this.name = "PurpleCobblestoneRoad";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#800000";
  this.walkSound = "stone";
  this.civilizedpathweight = .6;
}
PurpleCobblestoneRoadTile.prototype = new TerrainObject();

function ShadowCobblestoneTile() {
  this.name = "ShadowCobblestone";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#ee82ee";
  this.walkSound = "stone";
}
ShadowCobblestoneTile.prototype = new TerrainObject();

function ShadowCobblestoneRoadTile() {
  this.name = "ShadowCobblestoneRoad";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#ee82ee";
  this.walkSound = "stone";
  this.civilizedpathweight = .6;
}
ShadowCobblestoneRoadTile.prototype = new TerrainObject();

function BlueTilesTile() {
  this.name = "BlueTiles";
  this.graphic = "master_spritesheet.png";
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
  //Graphics Upgraded
  this.name = "PlanksEW";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
PlanksEWTile.prototype = new TerrainObject();

function DarkPlanksEWTile() {
  //Graphics Upgraded
  this.name = "DarkPlanksEW";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
DarkPlanksEWTile.prototype = new TerrainObject();

function RoughPlanksEWTile() {
  //Graphics Upgraded
  this.name = "RoughPlanksEW";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
}
RoughPlanksEWTile.prototype = new TerrainObject();

function ShadowPlanksEWTile() {
  this.name = "ShadowPlanksEW";
  this.graphic = "master_spritesheet";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-352";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#1c6000";
  this.walkSound = "stone";
}
ShadowPlanksEWTile.prototype = new TerrainObject();

function MeadowTile() {
  // Graphics Upgraded
  this.name = "Meadow";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  this.combatmap = "Grass"; 
}
MeadowTile.prototype = new TerrainObject();

function GrassTile() {
  // Graphics Upgraded
  this.name = "Grass";
  this.graphic = "static.png";
  this.spritexoffset = -64;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  this.combatmap = "Grass"; 
}
GrassTile.prototype = new TerrainObject();

function GrassRoadEndTile() {
  // Graphics Upgraded
  // This exists to trick roads into knowing they have to lead into cities
  this.name = "GrassRoadEnd";
}
GrassRoadEndTile.prototype = new GrassTile();

function ShadowGrassTile() {
  this.name = "ShadowGrass";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.peerview = "#0065a0";
  this.walkSound = "grass";
  this.combatmap = "Grass"; 
}
ShadowGrassTile.prototype = new TerrainObject();

function DirtTile() {
  //Graphics Upgraded
  this.name = "Dirt";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
DirtTile.prototype = new TerrainObject();

function DirtScrubTile() {
  //Graphics Upgraded
  this.name = "DirtScrub";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
DirtScrubTile.prototype = new TerrainObject();

function ShadowDirtTile() {
  this.name = "ShadowDirt";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#60003c";
  this.walkSound = "grass";
}
ShadowDirtTile.prototype = new TerrainObject();

function FallowFarmTile() {
  //Graphics Upgraded
  this.name = "FallowFarm";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
FallowFarmTile.prototype = new TerrainObject();

function FarmTile() {
  //Graphics Upgraded
  this.name = "Farm";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
FarmTile.prototype = new TerrainObject();

function FallowFarm2Tile() {
  //Graphics Upgraded
  this.name = "FallowFarm2";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
FallowFarm2Tile.prototype = new TerrainObject();

function Farm2Tile() {
  //Graphics Upgraded
  this.name = "Farm2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "dirt";
  this.combatmap = "Grass";
  this.peerview = "#7a2a1a";
  this.walkSound = "grass";
}
Farm2Tile.prototype = new TerrainObject();

function RoadTile() {
  //Graphics Upgraded
  this.name = "Road";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -9*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dirt road";
  this.combatmap = "Grass";
  this.peerview = "#7a3a1a";
  
  this.initdelay = 0.8;
  this.pathweight = .8;
  this.civilizedpathweight = .5;
  this.walkSound = "grass";
  
  SetBySurroundRoad.call(this);
}
RoadTile.prototype = new TerrainObject();

function RoadWNTile() {
  //Graphics Upgraded
  this.name = "RoadWN";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -8*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dirt road";
  this.combatmap = "Grass";
  this.peerview = "#7a3a1a";
  
  this.initdelay = 0.8;
  this.pathweight = .8;
  this.civilizedpathweight = .5;
  this.walkSound = "grass";
}
RoadWNTile.prototype = new TerrainObject();

function BrushTile() {
  //Graphics Upgraded
  this.name = "Brush";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
BrushTile.prototype = new TerrainObject();

function ShadowBrushTile() {
  this.name = "ShadowBrush";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#005080";
  this.walkSound = "grass";
}
ShadowBrushTile.prototype = new TerrainObject();

function UnderbrushTile() {
  // Graphics Upgraded
  this.name = "Underbrush";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
UnderbrushTile.prototype = new TerrainObject();

function SandTile() {
  //Graphics Upgraded
  this.name = "Sand";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "sand";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Grass";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
SandTile.prototype = new TerrainObject();

function SandVegetationTile() {
  //Graphics Upgraded
  this.name = "SandVegetation";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "sand";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Grass";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
SandVegetationTile.prototype = new TerrainObject();

function BrushNCoastTile() {
  //Graphics Upgraded
  this.name = "BrushNCoast";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -45*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
BrushNCoastTile.prototype = new TerrainObject();

function ShadowBrushNCoastTile() {
  this.name = "ShadowBrushNCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#005080";
  this.walkSound = "grass";
}
ShadowBrushNCoastTile.prototype = new TerrainObject();

function BrushECoastTile() {
  this.name = "BrushECoast";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -45*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
BrushECoastTile.prototype = new TerrainObject();

function ShadowBrushECoastTile() {
  this.name = "ShadowBrushECoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#005080";
  this.walkSound = "grass";
}
ShadowBrushECoastTile.prototype = new TerrainObject();

function BrushSCoastTile() {
  //Graphics Upgraded
  this.name = "BrushSCoast";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -45*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
BrushSCoastTile.prototype = new TerrainObject();

function ShadowBrushSCoastTile() {
  this.name = "ShadowBrushSCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#005080";
  this.walkSound = "grass";
}
ShadowBrushSCoastTile.prototype = new TerrainObject();

function BrushWCoastTile() {
  //Graphics Upgraded
  this.name = "BrushWCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -45*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;  
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#008000";
  this.walkSound = "grass";
}
BrushWCoastTile.prototype = new TerrainObject();

function ShadowBrushWCoastTile() {
  this.name = "ShadowBrushWCoast";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "brush";
  this.initdelay = 1.1;
  this.pathweight = 1.1;
  this.combatmap = "Brush";
  this.peerview = "#005080";
  this.walkSound = "grass";
}
ShadowBrushWCoastTile.prototype = new TerrainObject();

function ForestTile() {
  //Graphics Upgraded
  this.name = "Forest";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = .5;
	this.losupclose = { distance : 1 , blocklos : 0 };
  this.desc = "forest";
  this.initdelay = 1.3;
  this.pathweight = 1.3;
  this.combatmap = "Forest";
  this.peerview = "#004000";
  this.walkSound = "forest";
}
ForestTile.prototype = new TerrainObject();

function Forest2Tile() {
  //Graphics Upgraded
  this.name = "Forest2";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -32;
}
Forest2Tile.prototype = new ForestTile();

function ForestTilingNWTile() {
  //Graphics Upgraded
  this.name = "ForestTilingNW";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -62*32;
}
ForestTilingNWTile.prototype = new ForestTile();

function ForestTilingNETile() {
  //Graphics Upgraded
  this.name = "ForestTilingNE";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -62*32;
}
ForestTilingNETile.prototype = new ForestTile();

function ForestTilingWTile() {
  //Graphics Upgraded
  this.name = "ForestTilingW";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -63*32;
}
ForestTilingWTile.prototype = new ForestTile();

function ForestTilingETile() {
  //Graphics Upgraded
  this.name = "ForestTilingE";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -63*32;
}
ForestTilingETile.prototype = new ForestTile();

function ForestTilingSWTile() {
  //Graphics Upgraded
  this.name = "ForestTilingSW";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -64*32;
}
ForestTilingSWTile.prototype = new ForestTile();

function ForestTilingSETile() {
  //Graphics Upgraded
  this.name = "ForestTilingSE";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -64*32;
}
ForestTilingSETile.prototype = new ForestTile();

function ForestEdgeTile() {
  //Graphics Upgraded
  this.name = "ForestEdge";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -61*32;
}
ForestEdgeTile.prototype = new ForestTile();

function Forest3Tile() {
  //Graphics Upgraded
  this.name = "Forest3";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -61*32;
}
Forest3Tile.prototype = new ForestTile();

function ForestEdge3Tile() {
  //Graphics Upgraded
  this.name = "ForestEdge3";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -61*32;
}
ForestEdge3Tile.prototype = new ForestTile();

function ForestEdge4Tile() {
  //Graphics Upgraded
  this.name = "ForestEdge4";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -61*32;
}
ForestEdge4Tile.prototype = new ForestTile();

function ForestEdge5Tile() {
  //Graphics Upgraded
  this.name = "ForestEdge5";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -61*32;
}
ForestEdge5Tile.prototype = new ForestTile();

function DeadForestTile() {
  //Graphics Upgraded
  this.name = "DeadForest";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -32;
}
DeadForestTile.prototype = new ForestTile();

function EvergreenForestTile() {
  //Graphics Upgraded
  this.name = "EvergreenForest";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -32;
}
EvergreenForestTile.prototype = new ForestTile();

function EvergreenForestEdgeTile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdgeTile.prototype = new ForestTile();

function EvergreenForestEdge2Tile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdge2Tile.prototype = new ForestTile();

function EvergreenForestEdge3Tile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge3";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdge3Tile.prototype = new ForestTile();

function EvergreenForestEdge4Tile() {
  //Graphics Upgraded
  this.name = "EvergreenForestEdge4";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -60*32;
}
EvergreenForestEdge4Tile.prototype = new ForestTile();

function BrightForestTile() {
  //Graphics Upgraded
  this.name = "BrightForest";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -32;
}
BrightForestTile.prototype = new ForestTile();

function BrightForest2Tile() {
  //Graphics Upgraded
  this.name = "BrightForest2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -32;
}
BrightForest2Tile.prototype = new ForestTile();

function BrightForestEdgeTile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -61*32;
}
BrightForestEdgeTile.prototype = new ForestTile();

function BrightForestEdge2Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge2";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge2Tile.prototype = new ForestTile();

function BrightForestEdge3Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge3";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge3Tile.prototype = new ForestTile();

function BrightForestEdge4Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge4";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge4Tile.prototype = new ForestTile();

function BrightForestEdge5Tile() {
  //Graphics Upgraded
  this.name = "BrightForestEdge5";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -61*32;
}
BrightForestEdge5Tile.prototype = new ForestTile();

function ForestNCoastTile() {
  //Graphics Upgraded
	this.name = "ForestNCoast";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -64*32;
}
ForestNCoastTile.prototype = new ForestTile();

function ForestECoastTile() {
  //Graphics Upgraded
	this.name = "ForestECoast";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -64*32;
}
ForestECoastTile.prototype = new ForestTile();

function ForestSCoastTile() {
  //Graphics Upgraded
	this.name = "ForestSCoast";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -64*32;
}
ForestSCoastTile.prototype = new ForestTile();

function ForestWCoastTile() {
  //Graphics Upgraded
	this.name = "ForestWCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -64*32;
}
ForestWCoastTile.prototype = new ForestTile();

function EvergreenForestNCoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestNCoast";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -63*32;
}
EvergreenForestNCoastTile.prototype = new ForestTile();

function EvergreenForestECoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestECoast";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -63*32;
}
EvergreenForestECoastTile.prototype = new ForestTile();

function EvergreenForestSCoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestSCoast";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -63*32;
}
EvergreenForestSCoastTile.prototype = new ForestTile();

function EvergreenForestWCoastTile() {
  //Graphics Upgraded
	this.name = "EvergreenForestWCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -63*32;
}
EvergreenForestWCoastTile.prototype = new ForestTile();

function BrightForestNCoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestNCoast";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -62*32;
}
BrightForestNCoastTile.prototype = new ForestTile();

function BrightForestECoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestECoast";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -62*32;
}
BrightForestECoastTile.prototype = new ForestTile();

function BrightForestSCoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestSCoast";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -62*32;
}
BrightForestSCoastTile.prototype = new ForestTile();

function BrightForestWCoastTile() {
  //Graphics Upgraded
	this.name = "BrightForestWCoast";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -62*32;
}
BrightForestWCoastTile.prototype = new ForestTile();

function HillsTile() {
  // Graphics Upgraded
  this.name = "Hills";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "hills";
  this.initdelay = 1.5;
  this.pathweight = 1.5;
  this.combatmap = "Hill";
  this.peerview = "#49473a";
  this.walkSound = "hill";
}
HillsTile.prototype = new TerrainObject();

function Hills1Tile() {
  // Graphics Upgraded
  this.name = "Hills1";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "hills";
  this.initdelay = 1.5;
  this.pathweight = 1.5;
  this.combatmap = "Hill";
  this.peerview = "#49473a";
  this.walkSound = "hill";
}
Hills1Tile.prototype = new TerrainObject();

function Hills2Tile() {
  // Graphics Upgraded
  this.name = "Hills2";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -18*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "hills";
  this.initdelay = 1.5;
  this.pathweight = 1.5;
  this.combatmap = "Hill";
  this.peerview = "#49473a";
  this.walkSound = "hill";
}
Hills2Tile.prototype = new TerrainObject();

function PurpleCobblestoneTile() {
  this.name = "PurpleCobblestone";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-224";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#600060";
  this.walkSound = "stone";
}
PurpleCobblestoneTile.prototype = new TerrainObject();

function ShadowPurpleCobblestoneTile() {
  this.name = "ShadowPurpleCobblestone";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-0";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "cobblestones";
  this.peerview = "#602300";
  this.walkSound = "stone";
}
ShadowPurpleCobblestoneTile.prototype = new TerrainObject();

function SwampTile() {
  //Graphics Upgraded
  this.name = "Swamp";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "swamp";
  this.initdelay = 1.2;
  this.pathweight = 4;
  this.combatmap = "Swamp";
  this.peerview = "#004000";
  this.walkSound = "swamp";
}
SwampTile.prototype = new TerrainObject();

SwampTile.prototype.walkon = function(person) {
  let resp = InASwamp(person);
  return resp;
}
SwampTile.prototype.idle = function(person) {
  let resp = InASwamp(person);
  return resp;
}

SwampTile.prototype.isHostileTo = function(who) {
  if (IsNonLiving(who)) {
    return 0;
  }
  return 1;
}

function ShadowSwampTile() {
  this.name = "ShadowSwamp";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-320";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "swamp";
  this.initdelay = 1.2;
  this.pathweight = 3;
  this.combatmap = "Swamp";
  this.peerview = "#002840";
  this.walkSound = "swamp";
}
ShadowSwampTile.prototype = new TerrainObject();

ShadowSwampTile.prototype.walkon = function(person) {
  let resp = InASwamp(person);
  return resp;
}
ShadowSwampTile.prototype.idle = function(person) {
  let resp = InASwamp(person);
  return resp;
}

ShadowSwampTile.prototype.isHostileTo = function(who) {
  if (IsNonLiving(who)) {
    return 0;
  }
  return 1;
}

function InASwamp(who) {
  let response = {msg:""};
  if ((MOVE_LEVITATE & who.getMovetype()) || (MOVE_FLY & who.getMovetype())) {
    // entity is flying/levitating and cannot be diseased
    return response;
  }
  
  if (who.group) {
    // entity is an NPC group, immune to disease
    return response;
  }

  if (IsNonLiving(who)) {
    // entity is not biological and cannot be diseased
    return response;
  }

  // percent chance of infection- 10% per step, prorated by speed
  let chance = 10 * (DUTime.getGameClock() - who.getLastTurnTime());  
  if (Dice.roll("1d100") < chance) {  // diseased!
    if (who.getSpellEffectsByName("Disease")) { return 0; }
    let disease = localFactory.createTile("Disease");
    who.addSpellEffect(disease);
    
    DrawCharFrame();
    response.msg = "You have become diseased!";
  }
  return response;
}

function ShinglesTile() {
  //Graphics Upgraded
  this.name = "Shingles";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
  this.peerview = "#474747";
}
ShinglesTile.prototype = new TerrainObject();

function Shingles2Tile() {
  //Graphics Upgraded
  this.name = "Shingles2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -10*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
  this.peerview = "#474747";
}
Shingles2Tile.prototype = new TerrainObject();

function ShinglesTopTile() {
  //Graphics Upgraded
  this.name = "ShinglesTop";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "roof";
  this.peerview = "#474747";
}
ShinglesTopTile.prototype = new TerrainObject();

function IcyFloorTile() {
  //Graphics Upgraded
	this.name = "IcyFloor";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -3*32;  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "icy floor";
	this.peerview = "#6c6c6c";
	this.walkSound = "stone";
}
IcyFloorTile.prototype = new TerrainObject();

function Icy2FloorTile() {
  //Graphics Upgraded
	this.name = "Icy2Floor";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -3*32;  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "icy floor";
	this.peerview = "#6c6c6c";
	this.walkSound = "stone";
}
Icy2FloorTile.prototype = new TerrainObject();

function CaveFloorTile() {
  //Graphics Upgraded
	this.name = "CaveFloor";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -3*32;  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "cave floor";
	this.peerview = "#6c6c6c";
	this.walkSound = "stone";
	
	TilingSpritesheet.call(this, 2);
}
CaveFloorTile.prototype = new TerrainObject();

function CaveWallTile() {
	this.name = "CaveWall";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -3936;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1;
	this.prefix = "a";
	this.desc = "cave wall";
	this.peerview = "black";
	
	TilingSpritesheet.call(this, 2);
	SetBySurroundCave.call(this);
}
CaveWallTile.prototype = new TerrainObject();

function CaveColumnTile() {
	this.name = "CaveColumn";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-3936";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = .5;
	this.prefix = "a";
	this.desc = "cave wall";
	this.peerview = "black";
	
	TilingSpritesheet.call(this, 2);
}
CaveColumnTile.prototype = new TerrainObject();

function WSFloorTile() {
	this.name = "WSFloor";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-1760";  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "rough stone";
	this.peerview = "#6c6c6c";
	this.walkSound = "stone";
	
	TilingSpritesheet.call(this, 2);
}
WSFloorTile.prototype = new TerrainObject();

function WSWallTile() {
  this.name = "WSWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-1728";  
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "large stone wall";
  this.peerview = "#ffffff";
}
WSWallTile.prototype = new TerrainObject();

function WSWallVineTile() {
  this.name = "WSWallVine";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-1728";  
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "large stone wall";
  this.peerview = "#ffffff";
}
WSWallVineTile.prototype = new TerrainObject();

function WSWallMoldTile() {
  this.name = "WSWallMold";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-1728";  
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "large stone wall";
  this.peerview = "#ffffff";
}
WSWallMoldTile.prototype = new TerrainObject();

function RoughStoneFloorTile() {
  //Graphics Upgraded
	this.name = "RoughStoneFloor";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -5*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#675151";
	this.walkSound = "stone";
}
RoughStoneFloorTile.prototype = new TerrainObject();

function LightRoughStoneFloorTile() {
  //Graphics Upgraded
	this.name = "LightRoughStoneFloor";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -5*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#675151";
	this.walkSound = "stone";
}
LightRoughStoneFloorTile.prototype = new TerrainObject();

function HexTransparentFloorTile() {
  //Graphics Upgraded
  // No longer a hex, but hey
	this.name = "HexTransparentFloor";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -10*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#675151";
	this.walkSound = "stone";
}
HexTransparentFloorTile.prototype = new TerrainObject();

function GoldOutlineFloorTile() {
	this.name = "GoldOutlineFloor";
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-256";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#b650ff";
	this.walkSound = "stone";
}
PurpleDiamondFloorTile.prototype = new TerrainObject();

function CyanCobblestoneTile() {
  //Graphics Upgraded
	this.name = "CyanCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#ff5c50";
	this.walkSound = "stone";
}
CyanCobblestoneTile.prototype = new TerrainObject();

function GreenCobblestoneTile() {
  //Graphics Upgraded
	this.name = "GreenCobblestone";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#ff5c50";
	this.walkSound = "stone";
}
GreenCobblestoneTile.prototype = new TerrainObject();

function GreenCheckeredFloorTile() {
  //Graphics Upgraded
	this.name = "GreenCheckeredFloor";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#50ff61";
	this.walkSound = "stone";
}
GreenCheckeredFloorTile.prototype = new TerrainObject();

function YellowCheckeredFloorTile() {
  //Graphics Upgraded
	this.name = "YellowCheckeredFloor";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -6*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.desc = "floor";
	this.peerview = "#cf790b";
	this.walkSound = "stone";
}
YellowCheckeredFloorTile.prototype = new TerrainObject();

function BannerTile() {
  this.name = "Banner";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-256";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "banner of House Olympus";
  this.peerview = "white";
}
BannerTile.prototype = new TerrainObject();

function PaladinBannerTile() {
  this.name = "PaladinBanner";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-448";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "banner of the Paladins";
  this.peerview = "white";
}
PaladinBannerTile.prototype = new TerrainObject();

function HildendainBannerTile() {
  this.name = "HildendainBanner";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-1696";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "banner of House Hildendain";
  this.peerview = "white";
}
HildendainBannerTile.prototype = new TerrainObject();

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

function RedCarpetNWTile() {
  this.name = "RedCarpetNW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-96";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetNWTile.prototype = new TerrainObject();

function RedCarpetNTile() {
  this.name = "RedCarpetN";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetNTile.prototype = new TerrainObject();

function RedCarpetNETile() {
  this.name = "RedCarpetNE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-160";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetNETile.prototype = new TerrainObject();

function RedCarpetWTile() {
  this.name = "RedCarpetW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-96";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetWTile.prototype = new TerrainObject();

function RedCarpetCTile() {
  this.name = "RedCarpetC";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetCTile.prototype = new TerrainObject();

function RedCarpetETile() {
  this.name = "RedCarpetE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-160";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetETile.prototype = new TerrainObject();

function RedCarpetSWTile() {
  this.name = "RedCarpetSW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-96";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetSWTile.prototype = new TerrainObject();

function RedCarpetSTile() {
  this.name = "RedCarpetS";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-128";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetSTile.prototype = new TerrainObject();

function RedCarpetSETile() {
  this.name = "RedCarpetSE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-160";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
RedCarpetSETile.prototype = new TerrainObject();

function BlueCarpetNWTile() {
  this.name = "BlueCarpetNW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "0";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetNWTile.prototype = new TerrainObject();

function BlueCarpetNTile() {
  this.name = "BlueCarpetN";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetNTile.prototype = new TerrainObject();

function BlueCarpetNETile() {
  this.name = "BlueCarpetNE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-32";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetNETile.prototype = new TerrainObject();

function BlueCarpetWTile() {
  this.name = "BlueCarpetW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "0";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetWTile.prototype = new TerrainObject();

function BlueCarpetCTile() {
  this.name = "BlueCarpetC";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetCTile.prototype = new TerrainObject();

function BlueCarpetETile() {
  this.name = "BlueCarpetE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-64";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetETile.prototype = new TerrainObject();

function BlueCarpetSWTile() {
  this.name = "BlueCarpetSW";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "0";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetSWTile.prototype = new TerrainObject();

function BlueCarpetSTile() {
  this.name = "BlueCarpetS";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-32";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetSTile.prototype = new TerrainObject();

function BlueCarpetSETile() {
  this.name = "BlueCarpetSE";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-64";
	this.spriteyoffset = "-96";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
  this.walkSound = "stone";
}
BlueCarpetSETile.prototype = new TerrainObject();

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
	return parseInt(this.gold);
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
  } else if (Array.isArray(searchable)) {
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

FeatureObject.prototype.getAlternateSearchText = function() {
  return this.alternateSearchText; 
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

function PlaceholderTile() {
  //This is used to play spell effects over
  this.name = "Placeholder";
  this.graphic = "spacer.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "nothing";
}
PlaceholderTile.prototype = new FeatureObject();

function CastleGrassTile() {
  this.name = "CastleGrass";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-160";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "grass";
  this.peerview = "#00c000";
  this.walkSound = "grass";
  this.combatmap = "Grass"; 
}
CastleGrassTile.prototype = new FeatureObject();

CastleGrassTile.prototype.bumpinto = function(who) {
	let retval = {};
	retval["canmove"] = 1;
	retval["msg"] = "";
	
	if ((who.getx() === this.getx()) && ((this.gety() - who.gety()) === -1)) {
	  // mover is moving north from the castle
	  retval["canmove"] = 0;
	  retval["msg"] = "Blocked!";
	}
  return(retval);
}

function LavaTile() {
  this.name = "Lava";
  this.graphic = "flowing_animations.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK + MOVE_SWIM;
  this.blocklos = 0;
  this.desc = "lava";
  this.initdelay = 1.2;
  this.pathweight = 5;
  this.spritexoffset = "-224";
  this.spriteyoffset = "0";
  
  HasAmbientNoise.call(this,"sfx_bubbling_lava",1.5);
  LightEmitting.call(this, 1);
  this.peerview = "#fc2000";
}
LavaTile.prototype = new FeatureObject();

LavaTile.prototype.walkon = function(person) {
  // return messages, perform action
  var resp = InLava(person,this);
  return resp;
}

LavaTile.prototype.idle = function(person) {
  var resp = InLava(person,this);
  return resp;
}

LavaTile.prototype.isHostileTo = function(who) {
  if (who.getResist("fire") >= 100) { return 0; }
  return 1;
}

function InLava(who, lava) {
  if ((who.getMovetype() & MOVE_LEVITATE) || (who.getMovetype() & MOVE_FLY)) {
    who.dealDamage(Dice.roll("2d4+2"), lava, "fire");
  } else {
    who.dealDamage(Dice.roll("2d10+10"), lava, "fire");
  }
  return {msg:""};
}

function PurpleCarpetNWTile() {
  this.name = "PurpleCarpetNW";
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetNWTile.prototype = new FeatureObject();

function PurpleCarpetNTile() {
  this.name = "PurpleCarpetN";
  this.graphic = "static.png";
	this.spritexoffset = -32;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetNTile.prototype = new FeatureObject();

function PurpleCarpetNETile() {
  this.name = "PurpleCarpetNE";
  this.graphic = "static.png";
	this.spritexoffset = -2*32;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetNETile.prototype = new FeatureObject();

function PurpleCarpetWTile() {
  this.name = "PurpleCarpetW";
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetWTile.prototype = new FeatureObject();

function PurpleCarpetCTile() {
  this.name = "PurpleCarpetC";
  this.graphic = "static.png";
	this.spritexoffset = -32;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetCTile.prototype = new FeatureObject();

function PurpleCarpetETile() {
  this.name = "PurpleCarpetE";
  this.graphic = "static.png";
	this.spritexoffset = -2*32;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetETile.prototype = new FeatureObject();

function PurpleCarpetSWTile() {
  this.name = "PurpleCarpetSW";
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetSWTile.prototype = new FeatureObject();

function PurpleCarpetSTile() {
  this.name = "PurpleCarpetS";
  this.graphic = "static.png";
	this.spritexoffset = -32;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetSTile.prototype = new FeatureObject();

function PurpleCarpetSETile() {
  this.name = "PurpleCarpetSE";
  this.graphic = "static.png";
	this.spritexoffset = -2*32;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
PurpleCarpetSETile.prototype = new FeatureObject();

function FringeCarpetNWTile() {
  this.name = "FringeCarpetNW";
  this.graphic = "static.png";
	this.spritexoffset = -3*32;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetNWTile.prototype = new FeatureObject();

function FringeCarpetNTile() {
  this.name = "FringeCarpetN";
  this.graphic = "static.png";
	this.spritexoffset = -4*32;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetNTile.prototype = new FeatureObject();

function FringeCarpetNETile() {
  this.name = "FringeCarpetNE";
  this.graphic = "static.png";
	this.spritexoffset = -5*32;
	this.spriteyoffset = -8*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetNETile.prototype = new FeatureObject();

function FringeCarpetWTile() {
  this.name = "FringeCarpetW";
  this.graphic = "static.png";
	this.spritexoffset = -3*32;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetWTile.prototype = new FeatureObject();

function FringeCarpetCTile() {
  this.name = "FringeCarpetC";
  this.graphic = "static.png";
	this.spritexoffset = -4*32;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetCTile.prototype = new FeatureObject();

function FringeCarpetETile() {
  this.name = "FringeCarpetE";
  this.graphic = "static.png";
	this.spritexoffset = -5*32;
	this.spriteyoffset = -9*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetETile.prototype = new FeatureObject();

function FringeCarpetSWTile() {
  this.name = "FringeCarpetSW";
  this.graphic = "static.png";
	this.spritexoffset = -3*32;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetSWTile.prototype = new FeatureObject();

function FringeCarpetSTile() {
  this.name = "FringeCarpetS";
  this.graphic = "static.png";
	this.spritexoffset = -4*32;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetSTile.prototype = new FeatureObject();

function FringeCarpetSETile() {
  this.name = "FringeCarpetSE";
  this.graphic = "static.png";
	this.spritexoffset = -5*32;
	this.spriteyoffset = -10*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "carpet";
}
FringeCarpetSETile.prototype = new FeatureObject();

function WoodenPillarTile() {
  this.name = "WoodenPillar";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .2;
  this.prefix = "a";
  this.desc = "pole";
}
WoodenPillarTile.prototype = new FeatureObject();

function MarblePillarTile() {
  //Graphics Upgraded
  this.name = "MarblePillar";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pillar";
}
MarblePillarTile.prototype = new FeatureObject();

function CrackedMarblePillarTile() {
  //Graphics Upgraded
  this.name = "CrackedMarblePillar";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pillar";
}
CrackedMarblePillarTile.prototype = new FeatureObject();

function BrokenMarblePillarTile() {
  //Graphics Upgraded
  this.name = "BrokenMarblePillar";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken pillar";
}
BrokenMarblePillarTile.prototype = new FeatureObject();

function FenceNSWTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceNSW";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -10*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceNSWTile.prototype = new FeatureObject();

function FenceWTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceW";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceWTile.prototype = new FeatureObject();

function FenceWBrokenTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceWBroken";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceWBrokenTile.prototype = new FeatureObject();

function FenceEBrokenTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceEBroken";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceEBrokenTile.prototype = new FeatureObject();

function FenceETile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceE";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceETile.prototype = new FeatureObject();

function FencePostTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FencePost";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FencePostTile.prototype = new FeatureObject();

function FenceBrokenPostTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceBrokenPost";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceBrokenPostTile.prototype = new FeatureObject();

function FenceNSEWTile() {
  //Graphics Upgraded
  //new fence
  this.name = "FenceNSEW";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceNSEWTile.prototype = new FeatureObject();

function FenceNWTile() {
  //Graphics Upgraded
  this.name = "FenceNW";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceNWTile.prototype = new FeatureObject();

function FenceNETile() {
  //Graphics Upgraded
  this.name = "FenceNE";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceNETile.prototype = new FeatureObject();

function FenceEWTile() {
  //Graphics Upgraded
  this.name = "FenceEW";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceEWTile.prototype = new FeatureObject();

function FenceSETile() {
  //Graphics Upgraded
  this.name = "FenceSE";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceSETile.prototype = new FeatureObject();

function FenceSWTile() {
  //Graphics Upgraded
  this.name = "FenceSW";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceSWTile.prototype = new FeatureObject();

function FenceNSTile() {
  //Graphics Upgraded
  this.name = "FenceNS";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceNSTile.prototype = new FeatureObject();

function FenceEWSTile() {
  //Graphics Upgraded
  this.name = "FenceEWS";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -11*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceEWSTile.prototype = new FeatureObject();

function FenceEWNTile() {
  //Graphics Upgraded
  this.name = "FenceEWN";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceEWNTile.prototype = new FeatureObject();

function FenceENSTile() {
  //Graphics Upgraded
  this.name = "FenceENS";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -12*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "fence";
}
FenceENSTile.prototype = new FeatureObject();

function FenceEWGateTile() {
  //Graphics Upgraded
	this.name = "FenceEWGate";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -12*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "gate";

  this.pathweight = 2; 

  Openable.call(this, ["static.png", "", -7*32, -12*32], ["static.png", "", 0, -11*32], 0, "sfx_fence_open", "sfx_fence_close", "sfx_locked_door");
}
FenceEWGateTile.prototype = new FeatureObject();

FenceEWGateTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function StatueBaseTile() {
  // Graphics Upgraded
  this.name = "StatueBase";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -93*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "statue";
}
StatueBaseTile.prototype = new FeatureObject();

function StatueTopTile() {
  //Graphics Upgraded
  this.name = "StatueTop";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -92*32;
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_SWIM + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "statue";
  this.alwaystop = 1;
}
StatueTopTile.prototype = new FeatureObject();

function Statue1Tile() {
  //Graphics Upgraded
  this.name = "Statue1";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -94*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "statue";
}
Statue1Tile.prototype = new FeatureObject();

function Statue2Tile() {
  //Graphics Upgraded
  this.name = "Statue2";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -94*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "statue";
}
Statue2Tile.prototype = new FeatureObject();

function Statue3Tile() {
  //Graphics Upgraded
  this.name = "Statue3";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -94*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sculpture";
}
Statue3Tile.prototype = new FeatureObject();

function Statue4Tile() {
  //Graphics Upgraded
  this.name = "Statue4";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -94*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sculpture";
}
Statue4Tile.prototype = new FeatureObject();

function Statue5Tile() {
  //Graphics Upgraded
  this.name = "Statue5";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sculpture";
}
Statue5Tile.prototype = new FeatureObject();

function Statue6Tile() {
  //Graphics Upgraded
  this.name = "Statue6";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sculpture";
}
Statue6Tile.prototype = new FeatureObject();

function PaintingCrossTile() {
  //Graphics Upgraded
  this.name = "PaintingCross";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "painting";
}
PaintingCrossTile.prototype = new FeatureObject();

function PaintingGreenTile() {
  //Graphics Upgraded
  this.name = "PaintingGreen";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "painting";
}
PaintingGreenTile.prototype = new FeatureObject();

function PaintingPurpleTile() {
  //Graphics Upgraded
  this.name = "PaintingPurple";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "painting";
}
PaintingPurpleTile.prototype = new FeatureObject();

function PaintingTreeTile() {
  //Graphics Upgraded
  this.name = "PaintingTree";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "painting";
}
PaintingTreeTile.prototype = new FeatureObject();

function PedestalTile() {
  this.name = "Pedestal";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-576";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pedestal";
}
PedestalTile.prototype = new FeatureObject();

function WoodSignTile() {
  this.name = "WoodSign";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-576";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign";
}
WoodSignTile.prototype = new FeatureObject();

function WoodSign1Tile() {
  this.name = "WoodSign1";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-608";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign";
}
WoodSign1Tile.prototype = new FeatureObject();

function WoodSign2Tile() {
  this.name = "WoodSign2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-608";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign";
}
WoodSign2Tile.prototype = new FeatureObject();

function WoodSign3Tile() {
  this.name = "WoodSign3";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-608";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign";
}
WoodSign3Tile.prototype = new FeatureObject();

function WoodSign4Tile() {
  this.name = "WoodSign4";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-608";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign";
}
WoodSign4Tile.prototype = new FeatureObject();

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

function DungeonTile() {
  //Graphics Upgraded
  this.name = "Dungeon";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -3*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
DungeonTile.prototype = new FeatureObject();

function Dungeon2Tile() {
  //Graphics Upgraded
  this.name = "Dungeon2";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon2Tile.prototype = new FeatureObject();

function Dungeon3Tile() {
  //Graphics Upgraded
  this.name = "Dungeon3";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon3Tile.prototype = new FeatureObject();

function Dungeon4Tile() {
  //Graphics Upgraded
  this.name = "Dungeon4";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon4Tile.prototype = new FeatureObject();

function Dungeon5Tile() {
  //Graphics Upgraded
  this.name = "Dungeon5";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon5Tile.prototype = new FeatureObject();

function Dungeon6Tile() {
  //Graphics Upgraded
  this.name = "Dungeon6";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon6Tile.prototype = new FeatureObject();

function Dungeon7Tile() {
  //Graphics Upgraded
  this.name = "Dungeon7";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -40*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dungeon entrance";

  Enterable.call(this, "null", 0, 0);
}
Dungeon7Tile.prototype = new FeatureObject();

function CaveTile() {
  //Graphics Upgraded
  this.name = "Cave";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -3*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "cave entrance";

  Enterable.call(this, "null", 0, 0);
}
CaveTile.prototype = new FeatureObject();

function TowneTile() {
  //Graphics Upgraded
  this.name = "Towne";
  this.graphic = "town.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "towne";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);
}
TowneTile.prototype = new FeatureObject();

function Towne2Tile() {
  //Graphics Upgraded
  this.name = "Towne2";
  this.graphic = "town2.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "towne";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);
}
Towne2Tile.prototype = new FeatureObject();

function Towne3Tile() {
  //Graphics Upgraded
  this.name = "Towne3";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "towne";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);
}
Towne3Tile.prototype = new FeatureObject();

function KeepTile() {
  //Graphics Upgraded
  this.name = "Keep";
  this.graphic = "keep.gif";
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
	this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-160";
  this.spriteyoffset = "-1440";
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
	this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-160";
  this.spriteyoffset = "-1472";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tower";
  this.peerview = "#e0e0e0";

  Enterable.call(this, "null", 0, 0);
}
HillTowerTile.prototype = new FeatureObject();

function LighthouseTile() {
  //Graphics Upgraded
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
  //Graphics Upgraded
  this.name = "Village";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;  
  this.spriteyoffset = -3*32;  
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "village";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);
}
VillageTile.prototype = new FeatureObject();

function HotelPheranTile() {
  //Graphics Upgraded
  this.name = "HotelPheran";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "inn";
  this.peerview = "#00c000";
  this.civilized = 1;

  Enterable.call(this, "hotelcalifornia0", 7, 18);
}
HotelPheranTile.prototype = new FeatureObject();

HotelPheranTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,1);
  }
}

HotelPheranTile.prototype.myTurn = function() {
  if (DU.gameflags.getFlag("started_pheran")) {
    this.getHomeMap().deleteThing(this);
  } else {
    if ((this.getHomeMap() === PC.getHomeMap()) && (GetDistance(this.getx(),this.gety(),PC.getx(),PC.gety(),"square") <= 6)){
      this.onscreen = 1;
      // marks that the player has seen the hotel. Now it can start moving
    } else {
      if (this.onscreen) {
        let choice = Dice.roll("1d7");
        if (choice === 1) { this.getHomeMap().moveThing(115,84,this); }
        else if (choice === 2) { this.getHomeMap().moveThing(114,43,this); }
        else if (choice === 3) { this.getHomeMap().moveThing(96,38,this); }
        else if (choice === 4) { this.getHomeMap().moveThing(49,17,this); }
        else if (choice === 5) { this.getHomeMap().moveThing(60,41,this); }
        else if (choice === 6) { this.getHomeMap().moveThing(42,84,this); }
        else if (choice === 7) { this.getHomeMap().moveThing(45,114,this); }
        console.log("Hotel Pheran moved!");
        console.log(`New coords: ${this.getx()},${this.gety()}.`);
      }
    }
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,20);  
  }
  return 1;
}

function CastleTile() {
  //Graphics Upgraded
  this.name = "Castle";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;

  Enterable.call(this, "null", 0, 0);
}
CastleTile.prototype = new FeatureObject();

CastleTile.prototype.bumpinto = function(who) {
	let retval = {};
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
  //Graphics Upgraded
  this.name = "LeftCastle";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
LeftCastleTile.prototype = new FeatureObject();

function RightCastleTile() {
  //Graphics Upgraded
  this.name = "RightCastle";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
RightCastleTile.prototype = new FeatureObject();

function FarLeftCastleTile() {
  //Graphics Upgraded
  this.name = "FarLeftCastle";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
FarLeftCastleTile.prototype = new FeatureObject();

function FarRightCastleTile() {
  //Graphics Upgraded
  this.name = "FarRightCastle";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -5*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
FarRightCastleTile.prototype = new FeatureObject();

function UpperFarLeftCastleTile() {
  //Graphics Upgraded
  this.name = "UpperFarLeftCastle";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
UpperFarLeftCastleTile.prototype = new FeatureObject();

function UpperFarRightCastleTile() {
  //Graphics Upgraded
  this.name = "UpperFarRightCastle";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
UpperFarRightCastleTile.prototype = new FeatureObject();

function UpperLeftCastleTile() {
  //Graphics Upgraded
  this.name = "UpperLeftCastle";
  this.graphic = "castleflag2.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
UpperLeftCastleTile.prototype = new FeatureObject();

function UpperRightCastleTile() {
  //Graphics Upgraded
  this.name = "UpperRightCastle";
  this.graphic = "castleflag1.gif";
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
UpperRightCastleTile.prototype = new FeatureObject();

function UpperCenterCastleTile() {
  //Graphics Upgraded
  this.name = "UpperCenterCastle";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -4*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.desc = "Castle Dea Olympus";
  this.peerview = "#e0e0e0";
  this.civilized = 1;
}
UpperCenterCastleTile.prototype = new FeatureObject();

function PileOfRocksTile() {
  this.name = "PileOfRocks";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "pile of rocks";
  this.peerview = "#606060";
}
PileOfRocksTile.prototype = new FeatureObject();

function DoorwayTile() {
  //Graphics Upgraded
  this.name = "Doorway";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -16*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
DoorwayTile.prototype = new FeatureObject();

function DoorwayDarkenedTile() {
  //Graphics Upgraded
  this.name = "DoorwayDarkened";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -96*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
DoorwayDarkenedTile.prototype = new FeatureObject();

function GreyDoorwayTile() {
  //Graphics Upgraded
  this.name = "GreyDoorway";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -17*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
GreyDoorwayTile.prototype = new FeatureObject();

function GreyDoorwayDarkenedTile() {
  //Graphics Upgraded
  this.name = "GreyDoorwayDarkened";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -96*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
GreyDoorwayDarkenedTile.prototype = new FeatureObject();

function StoneDoorwayTile() {
  this.name = "StoneDoorway";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-832";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
StoneDoorwayTile.prototype = new FeatureObject();

function StoneDoorwayDarkenedTile() {
  this.name = "StoneDoorwayDarkened";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -96*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
StoneDoorwayDarkenedTile.prototype = new FeatureObject();

function WallDoorwayTile() {
  this.name = "WallDoorway";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -17*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archway";
}
WallDoorwayTile.prototype = new FeatureObject();

function ShrineTile() {
  //Graphics Upgraded
  this.name = "Shrine";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -3*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "gate";
  this.peerview = "#9d9d9d";
}
ShrineTile.prototype = new FeatureObject();

function BrokenShrineTile() {
  //Graphics Upgraded
  this.name = "BrokenShrine";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -3*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken gate";
  this.peerview = "#9d9d9d";
}
BrokenShrineTile.prototype = new FeatureObject();

function RuinsTile() {
  //Graphics Upgraded
  this.name = "Ruins";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -3*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ruin";
  this.peerview = "#e0e0e0";

  Enterable.call(this, "null", 0, 0);
}
RuinsTile.prototype = new FeatureObject();

function ChestTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-2*32,-78*32], ["static.png","",-2*32,-78*32], ["static.png","",-2*32,-78*32], 	"a",  "chest", "a", "locked chest", "a", "magically locked chest");
	this.name = "Chest";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -78*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_WALK + MOVE_LEVITATE;
	this.blocklos = 0;
	this.prefix = "a";
	this.desc = "chest";
	
	this.lootgroup = "";
	this.lootedid = "";
	
	this.container = [];
	OpenContainer.call(this,"sfx_chest_open","sfx_locked_door");
	Pushable.call(this);
  this.flammable = 20;
  this.nopush = 1;
}
ChestTile.prototype = new FeatureObject();

ChestTile.prototype.flamed = function() {
  ContainerOnFire(what);
}

function ColinChestTile() {
	this.name = "ColinChest";
}
ColinChestTile.prototype = new ChestTile();

ColinChestTile.prototype.usecheck = function(who) {
  let colin = FindNPCByName("Colin",who.getHomeMap());
  if (colin) {
    if ((colin.getx() >= 24) && (colin.getx() <= 29) && (colin.gety() >= 51) && (colin.gety() <= 54)) {
      let ret = {}
      ret.retval = {};
      ret.retval["fin"] = 1;
      ret.retval["txt"] = 'Colin says, "Hey, stay away from that!" You pull your hand away from the chest.';
      ret.retval["input"] = "&gt;";
      ret.stop = 1;
      return ret;
    }
  }
  let ret = {};
  ret.stop = 0;
  return ret;
}

function WallDoor1Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-6*32,-16*32], ["static.png","",-6*32,-16*32], ["static.png","",-6*32,-16*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "WallDoor1";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -16*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-6*32,-16*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
WallDoor1Tile.prototype = new FeatureObject();

WallDoor1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function WallDoorWindow1Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-9*32,-15*32], ["static.png","",-9*32,-15*32], ["static.png","",-9*32,-15*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "WallDoorWindow1";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-9*32,-15*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
WallDoorWindow1Tile.prototype = new FeatureObject();

WallDoorWindow1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function WallDoorWindow1LitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-9*32,-15*32], ["static.png","",-9*32,-15*32], ["static.png","",-9*32,-15*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "WallDoorWindow1Lit";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-9*32,-15*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
WallDoorWindow1LitTile.prototype = new FeatureObject();

WallDoorWindow1LitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyDoor1Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-7*32,-18*32], ["static.png","",-7*32,-18*32], ["static.png","",-7*32,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "GreyDoor1";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-7*32,-18*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoor1Tile.prototype = new FeatureObject();

GreyDoor1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyDoorWindow1Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",0,-18*32], ["static.png","",0,-18*32], ["static.png","",0,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "GreyDoorWindow1";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",0,-18*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoorWindow1Tile.prototype = new FeatureObject();

GreyDoorWindow1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyDoorWindow1LitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-32,-18*32], ["static.png","",-32,-18*32], ["static.png","",-32,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "GreyDoorWindow1Lit";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-32,-18*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoorWindow1LitTile.prototype = new FeatureObject();

GreyDoorWindow1LitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function RuinsWallDoorWindow1Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-9*32,-13*32], ["static.png","",-9*32,-13*32], ["static.png","",-9*32,-13*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "RuinsWallDoorWindow1";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -13*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-9*32,-13*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoorWindow1Tile.prototype = new FeatureObject();

RuinsWallDoorWindow1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function RuinsWallDoorWindow1LitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",0,-14*32], ["static.png","",0,-14*32], ["static.png","",0,-14*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "RuinsWallDoorWindow1";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -14*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",0,-14*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoorWindow1LitTile.prototype = new FeatureObject();

RuinsWallDoorWindow1LitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function RuinsWallDoorWindow2Tile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-3*32,-14*32], ["static.png","",-4*32,-15*32], ["static.png","",-5*32,-14*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "RuinsWallDoorWindow2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -14*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-3*32,-14*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoorWindow2Tile.prototype = new FeatureObject();

RuinsWallDoorWindow2Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function RuinsWallDoorWindow2LitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-4*32,-14*32], ["static.png","",-5*32,-15*32], ["static.png","",-5*32,-14*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "RuinsWallDoorWindow2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -14*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-4*32,-14*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoorWindow2LitTile.prototype = new FeatureObject();

RuinsWallDoorWindow2LitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function DoorWindowTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-3*32,-16*32], ["static.png","",-2*32,-17*32], ["static.png","",-5*32,-16*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "DoorWindow";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -16*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-3*32,-16*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
DoorWindowTile.prototype = new FeatureObject();

DoorWindowTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function DoorWindowLitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-4*32,-16*32], ["static.png","",-3*32,-17*32], ["static.png","",-5*32,-16*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "DoorWindowLit";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -16*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-4*32,-16*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
DoorWindowLitTile.prototype = new FeatureObject();

DoorWindowLitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyDoorWindowTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-4*32,-18*32], ["static.png","",-9*32,-42*32], ["static.png","",-6*32,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "GreyDoorWindow";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-4*32,-18*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoorWindowTile.prototype = new FeatureObject();

GreyDoorWindowTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyDoorWindowLitTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-5*32,-18*32], ["static.png","",-9*32,-47*32], ["static.png","",-6*32,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
	
	this.name = "GreyDoorWindowLit";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["static.png","",-5*32,-18*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoorWindowLitTile.prototype = new FeatureObject();

GreyDoorWindowLitTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function StonePortcullisTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png", "", -2*32, -15*32], ["static.png", "", -2*32, -15*32], ["static.png", "", -2*32, -15*32], "a", "portcullis", "a", "portcullis", "a", "portcullis");
	
	this.name = "StonePortcullis";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "portcullis";
	this.heavy = 1;

  this.pathweight = 2; 

  Openable.call(this, ["static.png", "", -2*32, -15*32], ["static.png", "", 0, -15*32], 0, "sfx_portcullis_open", "sfx_portcullis_close", "sfx_locked_door");  
}
StonePortcullisTile.prototype = new FeatureObject();

StonePortcullisTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function StonePortcullisAlwaysClosedTile() {
	this.name = "StonePortcullisAlwaysClosed";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "portcullis";
	this.heavy = 1;

  this.pathweight = 2; 
}
StonePortcullisAlwaysClosedTile.prototype = new FeatureObject();

function WallPortcullisTile() {
  Lockable.call(this, ["static.png", "", -9*32, -16*32], ["static.png", "", -9*32, -16*32], ["static.png", "", -9*32, -16*32], "a", "portcullis", "a", "portcullis", "a", "portcullis");
	
	this.name = "WallPortcullis";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -16*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "portcullis";
	this.heavy = 1;

  this.pathweight = 2; 

  Openable.call(this, ["static.png", "", -9*32, -16*32], ["static.png", "", 0, -17*32], 0, "sfx_portcullis_open", "sfx_portcullis_close", "sfx_locked_door");  
}
WallPortcullisTile.prototype = new FeatureObject();

WallPortcullisTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function GreyWallPortcullisTile() {
  Lockable.call(this, ["static.png", "", -4*32, -17*32], ["static.png", "", -4*32, -17*32], ["static.png", "", -4*32, -17*32], "a", "portcullis", "a", "portcullis", "a", "portcullis");
	
	this.name = "GreyWallPortcullis";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -17*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "portcullis";
	this.heavy = 1;

  this.pathweight = 2; 

  Openable.call(this, ["static.png", "", -4*32, -17*32], ["static.png", "", -5*32, -17*32], 0, "sfx_portcullis_open", "sfx_portcullis_close", "sfx_locked_door");  
}
GreyWallPortcullisTile.prototype = new FeatureObject();

GreyWallPortcullisTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function CorpseTile() {
  //Graphics Updated
  // if dark skinned, shift xoffset by -32
	this.name = "Corpse";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -78*32;
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
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -75*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "";
  this.desc = "blood";
  this.showSearched = 1;
}
BloodTile.prototype = new FeatureObject();

function EnergyFieldTile() {
	this.name = "EnergyField";
  this.graphic = "electricfield.gif";
	this.passable = 0; // impassable - wonky outdoors, but necessary indoors
	this.blocklos = 0;
	this.blockloe = 1;
  this.prefix = "an"; 
	this.desc = "energy field";
	
	LightEmitting.call(this, 1);
}
EnergyFieldTile.prototype = new FeatureObject();

EnergyFieldTile.prototype.bumpinto = function(who) {
  if (who === PC) {
    DUPlaySound("sfx_small_zap");
  }
  return {msg: ""};
}

function TorchWestTile() {
  //Graphics Upgraded
	this.name = "TorchWest";
  this.graphic = "torches.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "burning torch";

	LightEmitting.call(this, 2);
}
TorchWestTile.prototype = new FeatureObject();  

TorchWestTile.prototype.use = function(who) {
  return UseTorch(who,this);
}

function TorchEastTile() {
  //Graphics Upgraded
	this.name = "TorchEast";
  this.graphic = "torches.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "burning torch";

	LightEmitting.call(this, 2);
}
TorchEastTile.prototype = new FeatureObject();  

TorchEastTile.prototype.use = function(who) {
  return UseTorch(who,this);
}

function TorchWestOutTile() {
  //Graphics Upgraded
	this.name = "TorchWestOut";
  this.graphic = "static.gif";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -83*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "torch";
}
TorchWestOutTile.prototype = new FeatureObject();  

TorchWestOutTile.prototype.use = function(who) {
  return UseTorch(who,this);
}

function TorchEastOutTile() {
  //Graphics Upgraded
	this.name = "TorchEastOut";
	this.graphic = "static.gif";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -83*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "torch";
}
TorchEastOutTile.prototype = new FeatureObject();  

TorchEastOutTile.prototype.use = function(who) {
  return UseTorch(who,this);
}

function UseTorch(who,torch) {
  let retval = {};
  let torchmap = torch.getHomeMap();
  let torchx = torch.getx();
  let torchy = torch.gety();

  let torchname = torch.getName();
  torchmap.deleteThing(torch);

  let newtorch;
  if (torchname === "TorchEast") {
    newtorch = localFactory.createTile("TorchEastOut");
    retval["txt"] = "Extinguished!";
  } else if (torchname === "TorchWest") {
    newtorch = localFactory.createTile("TorchWestOut");
    retval["txt"] = "Extinguished!";
  } else if (torchname === "TorchEastOut") {
    newtorch = localFactory.createTile("TorchEast");
    retval["txt"] = "You light the torch.";
  } else if (torchname === "TorchWestOut") {
    newtorch = localFactory.createTile("TorchWest");
    retval["txt"] = "You light the torch.";
  }

  torchmap.placeThing(torchx,torchy,newtorch);
  retval["fin"] = 1;
  if (torchmap === PC.getHomeMap()) {
    DrawMainFrame("draw",torchmap,PC.getx(),PC.gety());
  }

  return retval;
}

function WoodpileTile() {
	this.name = "Woodpile";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -76*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "wood pile";
}
WoodpileTile.prototype = new FeatureObject();

function CampfireTile() {
	this.name = "Campfire";
	this.graphic = "campfire.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "campfire";
	this.pathweight = 5;
	this.firedamage = "2d4";
	
	LightEmitting.call(this, 2);
	HasAmbientNoise.call(this,"sfx_fire_crackle",1.5);
}
CampfireTile.prototype = new FeatureObject();

CampfireTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  }
  return;
}

CampfireTile.prototype.walkon = function(person) {
  let resp = OnFire(person, this);
  return resp;
}
CampfireTile.prototype.idle = function(person) {
  let resp = OnFire(person, this);
  return resp;
}

CampfireTile.prototype.isHostileTo = function(who) {
  if (who.getResist("fire") >= 100) { return 0; }
  return 1;
}

CampfireTile.prototype.myTurn = function() {
  let mytile = this.getHomeMap().getTile(this.getx(),this.gety());
  let feas = mytile.getFeatures();
  for (let i=0;i<feas.length;i++) {
    if (feas[i].flammable) {
      if (Dice.roll("1d100") <= feas[i].flammable) {
        feas[i].flamed();
      }
    }
  };

  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
  return 1;  
}

function OnFire(who, what) {
  let dmg = Dice.roll(what.firedamage);
  dmg = (1/SCALE_TIME)*(DUTime.getGameClock() - who.getLastTurnTime()) * dmg;
  let response = {msg: "The " + what.getDesc() + " burns you!"};
  who.dealDamage(dmg, what, "fire");
  
  return response;
}

function CampfireExtinguishedTile() {
	this.name = "CampfireExtinguished";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-1760";  
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "burned out campfire";
	this.pathweight = 5;
	
}
CampfireExtinguishedTile.prototype = new FeatureObject();

function BrazierTile() {
	this.name = "Brazier";
	this.graphic = "brazier.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "brazier";
	
	LightEmitting.call(this, 3);  
}
BrazierTile.prototype = new FeatureObject();

BrazierTile.prototype.use = function(who) {
  let retval = {fin:1};
  if (!this.alwayslit) {
    let map = this.getHomeMap();
    let unlit = localFactory.createTile("UnlitBrazier");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,unlit);
    if (map === PC.getHomeMap()) {
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    }
    
    retval["txt"] = "You extinguish the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to go out.";
  }
  
  return retval;
}

function UnlitBrazierTile() {
  //Graphics Upgraded
	this.name = "UnlitBrazier";
	this.graphic = "static.png";
	this.spritexoffset = -9*32;
	this.spriteyoffset = -80*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "an";
  this.desc = "unlit brazier";
  
  LightEmitting.call(this, 0);  
}
UnlitBrazierTile.prototype = new FeatureObject();

UnlitBrazierTile.prototype.use = function(who) {
  let retval = {fin:1};
  if (!this.alwaysout) {
    let map = this.getHomeMap();
    let lit = localFactory.createTile("Brazier");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,lit);
    if (map === PC.getHomeMap()) {
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    }
    
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
  let retval = {fin:1};
  if (!this.alwayslit) {
    let map = this.getHomeMap();
    let unlit = localFactory.createTile("UnlitWEBrazier");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,unlit);
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    
    retval["txt"] = "You extinguish the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to go out.";
  }
  
  CheckWEEntrance(this.getHomeMap());
  return retval;
}

function UnlitWEBrazierTile() {
	this.name = "UnlitWEBrazier";
	this.graphic = "static.png";
	this.spritexoffset = -9*32;
	this.spriteyoffset = -80*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "an";
	this.desc = "unlit brazier";
}
UnlitWEBrazierTile.prototype = new FeatureObject();

UnlitWEBrazierTile.prototype.use = function(who) {
  let retval = {fin:1};
  retval["fin"] = 1;
  if (!this.alwaysout) {
    let map = this.getHomeMap();
    let lit = localFactory.createTile("WEBrazier");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,lit);
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    
    retval["txt"] = "You light the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to light.";
  }
  
  CheckWEEntrance(this.getHomeMap());
  return retval;
}

function CheckWEEntrance(themap) {
  let ne_brazier = themap.getTile(11,43).getTopFeature();
  let nw_brazier = themap.getTile(7,43).getTopFeature();
  let se_brazier = themap.getTile(11,47).getTopFeature();
  let sw_brazier = themap.getTile(7,47).getTopFeature();
  
  let barrier = themap.getTile(12,45).getTopFeature();
  
  let set_barrier = 1;
  
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
  this.prefix = "a"; 
	this.desc = "wall";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
	
  this.invisible = 1;
}
IllusionaryEnergyFieldTile.prototype = new FeatureObject();

function WEBrazier2Tile() {
	this.name = "WEBrazier2";
	this.graphic = "brazier.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "brazier";
	
	LightEmitting.call(this, 3);  
}
WEBrazier2Tile.prototype = new FeatureObject();

WEBrazier2Tile.prototype.use = function(who) {
  let retval = {fin:1};
  if (!this.alwayslit) {
    let map = this.getHomeMap();
    let unlit = localFactory.createTile("WEUnlitBrazier2");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,unlit);
    if (map === PC.getHomeMap()) {
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    }
    
    retval["txt"] = "You extinguish the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to go out.";
  }
  
  // Working here
  return retval;
}

function WEUnlitBrazier2Tile() {
	this.name = "WEUnlitBrazier2";
	this.graphic = "static.png";
	this.spritexoffset = -9*32;
	this.spriteyoffset = -80*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0;
  this.prefix = "an";
  this.desc = "unlit brazier";
  
  LightEmitting.call(this, 0);  
}
WEUnlitBrazier2Tile.prototype = new FeatureObject();

WEUnlitBrazier2Tile.prototype.use = function(who) {
  let retval = {fin:1};
  if (!this.alwaysout) {
    let map = this.getHomeMap();
    let lit = localFactory.createTile("WEBrazier2");
    let x = this.getx();
    let y = this.gety();
    map.deleteThing(this);
    map.placeThing(x,y,lit);
    if (map === PC.getHomeMap()) {
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    }
    
    retval["txt"] = "You light the brazier.";
  } else {
    retval["txt"] = "The brazier refuses to light.";
  }
  
  return retval;
}

function CrystalTrapSpaceTile() {
	this.name = "CrystalTrapSpace";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-640";
	this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_FLY + MOVE_ETHEREAL;
  this.prefix = "a"; 
	this.desc = "Crystal Trap spell";
	
  this.invisible = 1;  
}
CrystalTrapSpaceTile.prototype = new FeatureObject();

CrystalTrapSpaceTile.prototype.walkon = function(who) {
  let response = {msg:""};
  if ((who.getMovetype() & MOVE_FLY) || (who.getMovetype() & MOVE_LEVITATE) || (who.getMovetype() & MOVE_ETHEREAL)) {
    DebugWrite("magic", who.getName() + " flies/floats/flits over the crystal trap.<br />");
    return response;
  }

  if (who.getSpellEffectsByName("CrystalTrap")) { 
    DebugWrite("magic", "Crystal prison does not go off- victim already in one.<br />");
    return response;
  }

  if (who.getSerial() !== this.owner) {
    let trap = localFactory.createTile("CrystalTrap");
    trap.duration = this.duration;
    trap.power = this.power;
    trap.setExpiresTime(this.duration + DUTime.getGameClock());
    DebugWrite("magic", "Crystal Prison sprung. Expires at " + trap.getExpiresTime() + ".<br />");
    who.addSpellEffect(trap);
    ShowEffect(who,1000,"crystals.gif",0,0);
    if (GetDistance(PC.getx(),PC.gety(),who.getx(),who.gety())) { DUPlaySound("sfx_crystal_trap"); }

    let trapmap = this.getHomeMap();
    trapmap.deleteThing(this);
  
    response.msg = "You are engulfed in crystal!";
    return response;
  } else {
    DebugWrite("magic", "Owner has passed over a crystal prison.");
    return response;
  }
}

CrystalTrapSpaceTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,this.duration);
    let expiresat = this.duration + DUTime.getGameClock();
    DebugWrite("magic", "Crystal Prison trap created. Expires at " + expiresat + ".<br />");    
  }

  return;
}

CrystalTrapSpaceTile.prototype.myTurn = function() {
  DebugWrite("all", "<div style='border-style:inset; border-color:#999999'><span style='" + debugstyle.header + "'>" + this.getName() + ", serial " + this.getSerial() + " is starting its turn at " + this.getx() + "," + this.gety() + ", timestamp " + DUTime.getGameClock().toFixed(5) + ".</span><br />");
  if (!maps.getMap(this.getHomeMap().getName())) {
    // removing from timeline, its map is gone

    if (!DebugWrite("gameobj", "<span style='font-weight:bold'>Crystal Prison " + this.getSerial() + " removed from game- map gone.</span><br />")) {
      DebugWrite("magic", "<span style='font-weight:bold'>Crystal Prison " + this.getSerial() + " removed from game- map gone.</span><br />");
    }
  
    return 1;
  }
 
  if (this.expiresTime && (this.expiresTime > DUTime.getGameClock())) {
    if (!DebugWrite("magic", "<span style='font-weight:bold'>Crystal Prison " + this.getSerial() + " expired, removing itself.</span><br />")) {
      DebugWrite("gameobj", "<span style='font-weight:bold'>Crystal Prison " + this.getSerial() + " expired, removing itself.</span><br />");
    }
    this.getHomeMap().deleteThing(this);
    
    return 1;
  }

  // in the case of this thing, this part should never trigger.  
  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
  return 1;
}

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
  //Graphics Upgraded
	this.name = "Fireplace";
	this.graphic = "largefireplace.gif";
	this.passable = MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 2;
  this.prefix = "a";
	this.desc = "fireplace";
	this.peerview = "white";
	this.pathweight = 5;
  this.firedamage = "3d4";
//  this.nowander = 1;
	
	LightEmitting.call(this, 2);
	HasAmbientNoise.call(this,"sfx_fire_crackle",1.5);
}
FireplaceTile.prototype = new FeatureObject();

FireplaceTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
    DebugWrite("gameobj", "Adding fireplace to the timeline.");
  }
  return;
}

FireplaceTile.prototype.walkon = function(person) {
  let resp = OnFire(person, this);
  return resp;
}
FireplaceTile.prototype.idle = function(person) {
  let resp = OnFire(person, this);
  return resp;
}

FireplaceTile.prototype.isHostileTo = function(who) {
  if (who.getResist("fire") >= 100) { return 0; }
  return 1;
}

FireplaceTile.prototype.myTurn = function() {
  let mytile = this.getHomeMap().getTile(this.getx(),this.gety());
  let feas = mytile.getFeatures();
  for (let i=0;i<feas.length;i++) {
    if (feas[i].flammable) {
      if (Dice.roll("1d100") <= feas[i].flammable) {
        feas[i].flamed();
      }
    }
  };

  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
  return 1;  
}

function SmallFireplaceTile() {
  //Graphics Upgraded
	this.name = "SmallFireplace";
	this.graphic = "smallfireplace.gif";
}
SmallFireplaceTile.prototype = new FireplaceTile();

function DustyFireplaceTile() {
	this.name = "DustyFireplace";
	this.graphic = "static.png";
	this.spritexoffset = -8*32;
	this.spriteyoffset = -20*32;
	this.passable = MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 2;
  this.prefix = "a";
	this.desc = "dusty fireplace";
	this.peerview = "white";
}
DustyFireplaceTile.prototype = new FeatureObject();

function SmallDustyFireplaceTile() {
	this.name = "SmallDustyFireplace";
	this.graphic = "static.png";
	this.spritexoffset = -9*32;
	this.spriteyoffset = -20*32;
	this.passable = MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 2;
  this.prefix = "a";
	this.desc = "dusty fireplace";
	this.peerview = "white";
}
SmallDustyFireplaceTile.prototype = new FeatureObject();

function AltarTile() {
  //Graphics Upgraded
	this.name = "Altar";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -78*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "altar";
	this.peerview = "white";
}
AltarTile.prototype = new FeatureObject();

function ThinAltarTile() {
  //Graphics Upgraded
	this.name = "ThinAltar";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -77*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "altar";
	this.peerview = "white";
}
ThinAltarTile.prototype = new FeatureObject();

function ThroneTile() {
  //Graphics Upgraded
	this.name = "Throne";
	this.graphic = "static.png";
	this.spritexoffset = -5*32;
	this.spriteyoffset = -85*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "the";
	this.desc = "throne";
}
ThroneTile.prototype = new FeatureObject();

ThroneTile.prototype.walkon = function(who) {
  let response = {msg:""};
  who.realgraphic = who.getGraphicArray();
  if (who.getGraphic() === "315.gif") {
    who.setGraphicArray(["throned_king.gif","throned_king.gif",0,0]);
    return response;
  }
  if (who.getGraphic() === "315.2.gif") {
    who.setGraphicArray(["throned_queen.gif","throned_queen.gif",0,0]); 
    return response;
  }
  let cc = "";
  if (parseInt(who.skintone) === 2) {
    cc = ".1";
  } else if (parseInt(who.skintone) !== 1) { console.log("Missing skintone on "); console.log(who); }
  let filename = `throned${cc}.gif`;
  let garr = [filename,filename,0,0];
  who.setGraphicArray(garr);
  return response;
}

ThroneTile.prototype.walkoff = function(who) {
  if (who.realgraphic) {
    who.setGraphicArray(who.realgraphic);
    delete who.realgraphic;
    DebugWrite("gameobj", "Changed the graphic of " + who.getNPCName() + " from sitting.<br />");
  } else {
    alert("Entity failed to have a standing graphic. See console.");
    console.log(who);
  }
  return {msg:""};
}

function BDThroneTile() {
  //Graphics Upgraded
	this.name = "BDThrone";
	this.graphic = "static.png";
	this.spritexoffset = -4*32;
	this.spriteyoffset = -85*32;
	this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "the";
	this.desc = "throne";
}
BDThroneTile.prototype = new FeatureObject();

BDThroneTile.prototype.walkon = function(who) {
  let response = {msg:""};
  who.realgraphic = who.getGraphicArray();
  let cc = "";
  if (parseInt(who.skintone) === 2) {
    cc = ".1";
  } else if (parseInt(who.skintone) !== 1) { console.log("Missing skintone on "); console.log(who); }
  let filename = `bdthroned${cc}.gif`;
  let garr = [filename,filename,0,0];
  who.setGraphicArray(garr);
  return response;
}

BDThroneTile.prototype.walkoff = function(who) {
  if (who.realgraphic) {
    who.setGraphicArray(who.realgraphic);
    delete who.realgraphic;
    DebugWrite("gameobj", "Changed the graphic of " + who.getNPCName() + " from sitting.<br />");
  } else {
    alert("Entity failed to have a standing graphic. See console.");
    console.log(who);
  }
  return {msg:""};
}

function RuinsWallDoor1Tile() {
  Lockable.call(this, ["static.png","",-8*32,-13*32], ["static.png","",-8*32,-13*32], ["static.png","",-8*32,-13*32], "a", "door", "a", "locked door", "a", "magically locked door");
  	
	this.name = "RuinsWallDoor1";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -13*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

	Openable.call(this, ["static.png","",-8*32,-13*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoor1Tile.prototype = new FeatureObject();

RuinsWallDoor1Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function RuinsWallDoor2Tile() {
  Lockable.call(this, ["static.png","",-1*32,-14*32], ["static.png","",-3*32,-15*32], ["static.png","",-2*32,-14*32], "a", "door", "a", "locked door", "a", "magically locked door");
  	
	this.name = "RuinsWallDoor2";
  this.graphic = "static.png";
  this.spritexoffset = -1*32;
  this.spriteyoffset = -14*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

	Openable.call(this, ["static.png","",-1*32,-14*32], ["static.png","",-9*32,-14*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
RuinsWallDoor2Tile.prototype = new FeatureObject();

RuinsWallDoor2Tile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function DoorTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-32,-16*32], ["static.png","",-32,-17*32], ["static.png","",-2*32,-16*32], "a", "door", "a", "locked door", "a", "magically locked door");
  	
	this.name = "Door";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -16*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

	Openable.call(this, ["static.png", "", -32, -16*32], ["static.png","",-8*32,-16*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
DoorTile.prototype = new FeatureObject();

DoorTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function TalkingDoorTile() {
  this.name = "TalkingDoor";
  this.conversation = "ash_door";
}
TalkingDoorTile.prototype = new DoorTile();

TalkingDoorTile.prototype.getConversation = function() {
  return this.conversation;
}

TalkingDoorTile.prototype.getGenderedTerms = function() {
  let gt = {};
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
    let retval;
    maintext.addText("Use " + this.getDesc() + ":");
    retval = PerformTalk(this,"ash_door","_start");
    retval["override"] = 1;
    maintext.setInputLine("&gt; You say: ");
    maintext.drawTextFrame();
    return retval;
  };
  return 1;
}

function GreyDoorTile() {
  //Graphics Upgraded
  Lockable.call(this, ["static.png","",-2*32,-18*32], ["static.png","",-9*32,-41*32], ["static.png","",-3*32,-18*32], "a", "door", "a", "locked door", "a", "magically locked door");
  	
	this.name = "GreyDoor";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -18*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

	Openable.call(this, ["static.png", "", -2*32, -16*32], ["static.png","",-7*32,-17*32], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
GreyDoorTile.prototype = new FeatureObject();

GreyDoorTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function DoorStoneWallTile() {
	this.name = "DoorStoneWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-1664";
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 1; 
	this.losupclose = {distance: 1 , blocklos: 0};
	this.blockloe = 1;
	this.prefix = "a";
  this.desc = "door";
  
  this.pathweight = 2; 

  Openable.call(this, ["master_spritesheet.png","",'-192','-1664'], ["master_spritesheet.png","",'-224','-1664'], 0, "sfx_open_door", "sfx_close_door", "sfx_locked_door");
}
DoorStoneWallTile.prototype = new FeatureObject();

DoorStoneWallTile.prototype.bumpinto = function(who) {
  return BumpIntoDoor(this,who);
}

function SleepFieldTile() {
	this.name = "SleepField";
	this.graphic = "sleepfield.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "sleep field";
	this.initdelay = 1.5;
	this.pathweight = 5;
	
	LightEmitting.call(this, 1);
}
SleepFieldTile.prototype = new FeatureObject();

SleepFieldTile.prototype.walkon = function(person) {
  let resp = InASleepField(person);
  return resp;
}
SleepFieldTile.prototype.idle = function(person) {
  let resp = InASleepField(person);
  return resp;
}

SleepFieldTile.prototype.isHostileTo = function(who) {
  if (who.getResist("magic") >= 100) { return 0; }
  if (IsNonLiving(who) || who.specials.mindless) { return 0; }
  return 1;
}

function InASleepField(who) {
  if (IsNonLiving(who) || who.specials.mindless)  { return ""; }
  let resist = who.getResist("magic");
  resist = 1-(resist/100);
  let chance = .5 * resist;
  if (Math.random()*1 < chance) {
    if (who.getSpellEffectsByName("Sleep")) { return 0; }
    let fieldeffect = localFactory.createTile("Sleep");
    
    let duration = (Dice.roll("2d3") - who.getInt()/20) * SCALE_TIME;
    fieldeffect.setExpiresTime(duration + DUTime.getGameClock());
    who.addSpellEffect(fieldeffect);
    
    DrawCharFrame();

  }
  return {msg:""};
}

function FireFieldTile() {
	this.name = "FireField";
	this.graphic = "firefield.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "fire field";
  this.expires = 0;
	
	LightEmitting.call(this, 3);
	this.initdelay = 1.5;
	this.pathweight = 5;
	
	HasAmbientNoise.call(this,"sfx_fire_crackle",1.5);
}
FireFieldTile.prototype = new FeatureObject();

FireFieldTile.prototype.walkon = function(person) {
  let resp = InAFireField(person);
  return resp;
}
FireFieldTile.prototype.idle = function(person) {
  let resp = InAFireField(person);
  return resp;
}

FireFieldTile.prototype.isHostileTo = function(who) {
  if (who.getResist("magic") >= 100) { return 0; }
  if (who.getResist("fire") >= 100) { return 0; }
  return 1;
}

FireFieldTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let mytile = this.getHomeMap().getTile(this.getx(),this.gety());
    let npcs = mytile.getNPCs();
    for (let i=0;i<npcs.length;i++) {
      InAFireField(npcs[i]);
    }

    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  }

  return;
}

FireFieldTile.prototype.myTurn = function() {
  DebugWrite("all", "<div style='border-style:inset; border-color:#999999'><span style='" + debugstyle.header + "'>" + this.getName() + ", serial " + this.getSerial() + " is starting its turn at " + this.getx() + "," + this.gety() + ", timestamp " + DUTime.getGameClock().toFixed(5) + ".</span><br />");
  if (!maps.getMap(this.getHomeMap().getName())) {

    if (!DebugWrite("gameobj", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " removed from game- map gone.</span><br />")) {
      DebugWrite("magic", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " removed from game- map gone.</span><br />");
    }
  
    return 1;
  }
 
  if (this.expiresTime && (this.expiresTime > DUTime.getGameClock())) {
    if (!DebugWrite("magic", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " expired, removing itself.</span><br />")) {
      DebugWrite("gameobj", "<span style='font-weight:bold'>Firefield " + this.getSerial() + " expired, removing itself.</span><br />");
    }
    this.getHomeMap().deleteThing(this);
    
    return 1;
  }
  
  let mytile = this.getHomeMap().getTile(this.getx(),this.gety());
  let feas = mytile.getFeatures();
  for (let i=0;i<feas.length;i++) {
    if (feas[i].flammable) {
      if (Dice.roll("1d100") <= feas[i].flammable) {
        feas[i].flamed();
      }
    }
  };

  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
  
  return 1;
}

function InAFireField(who) {
  let dmg = Dice.roll("2d6+3");
  dmg = (1/SCALE_TIME)*(DUTime.getGameClock() - who.getLastTurnTime()) * dmg;
  let response = {msg:"The fire field burns you!"};
  let resist = who.getResist("magic");
  resist = 1-(resist/100);
  dmg = dmg*resist;
  //who.dealDamage(dmg, this, "fire");
  DealandDisplayDamage(who,this, dmg, "fire");
  DebugWrite("gameobj", "Firefield deals " + dmg + " damage to " + who.getName() + ".");
  if (who === PC) { DUPlaySound("sfx_fire_hit"); }
  return response;
}

function PoisonFieldTile() {
	this.name = "PoisonField";
	this.graphic = "poisonfield.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.blocklos = 0;
  this.prefix = "a";
	this.desc = "poison field";
	this.initdelay = 1.5;
	this.pathweight = 5;
	
	LightEmitting.call(this, 1);
}
PoisonFieldTile.prototype = new FeatureObject();

PoisonFieldTile.prototype.walkon = function(person) {
  let resp = InAPoisonField(person);
  return resp;
}
PoisonFieldTile.prototype.idle = function(person) {
  let resp = InAPoisonField(person);
  return resp;
}

PoisonFieldTile.prototype.isHostileTo = function(who) {
  if (IsNonLiving(who)) { return 0; }
  return 1;
}

function InAPoisonField(who){
  let response = {msg:""};
  if (IsNonLiving(who)) {
    return response;
  }
  let poisonchance = .75;
  poisonchance = (1/SCALE_TIME)*(DUTime.getGameClock() - who.getLastTurnTime()) * poisonchance;
  poisonchance = poisonchance * (1-who.getResist("poison")/100);  
  if (Math.random()*1 < poisonchance) {  
    if (who.getSpellEffectsByName("Poison")) { return 0; }
    let poison = localFactory.createTile("Poison");
    
    let duration = (20+Dice.roll("2d10") + who.getInt() - 15) * SCALE_TIME;
    poison.setExpiresTime(duration + DUTime.getGameClock());
    who.addSpellEffect(poison);
    
    DrawCharFrame();
    response.msg = "You are poisoned!";
  }

  return response;
}

function LadderDownTile() {
  //Graphics Upgraded
  this.name = "LadderDown";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ladder";
  this.peerview = "#808080";

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;
}
LadderDownTile.prototype = new FeatureObject();

function LadderUpTile() {
  //Graphics Upgraded
  this.name = "LadderUp";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "ladder";
  this.peerview = "#808080";

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;
}
LadderUpTile.prototype = new FeatureObject();

function StairDownTile() {
  //Graphics Upgraded
  this.name = "StairDown";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
StairDownTile.prototype = new FeatureObject();

function StairUpTile() {
  // Graphics Upgraded
  this.name = "StairUp";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
StairUpTile.prototype = new FeatureObject();

function StairDown2Tile() {
  // Graphics Upgraded
  this.name = "StairDown2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
StairDown2Tile.prototype = new FeatureObject();

function StairUp2Tile() {
  //Graphics Upgraded
  this.name = "StairUp2";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
StairUp2Tile.prototype = new FeatureObject();

function FancyStairDownTile() {
  //Graphics Upgraded
  this.name = "FancyStairDown";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
FancyStairDownTile.prototype = new FeatureObject();

function FancyStairUpTile() {
  // Graphics Upgraded
  this.name = "FancyStairUp";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
FancyStairUpTile.prototype = new FeatureObject();

function FancyStairDown2Tile() {
  // Graphics Upgraded
  this.name = "FancyStairDown2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
FancyStairDown2Tile.prototype = new FeatureObject();

function FancyStairUp2Tile() {
  //Graphics Upgraded
  this.name = "FancyStairUp2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
FancyStairUp2Tile.prototype = new FeatureObject();

function WoodenStairDownTile() {
  //Graphics Upgraded
  this.name = "WoodenStairDown";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
WoodenStairDownTile.prototype = new FeatureObject();

function WoodenStairUpTile() {
  //Graphics Upgraded
  this.name = "WoodenStairUp";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -81*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
WoodenStairUpTile.prototype = new FeatureObject();

function WoodenStairDown2Tile() {
  //Graphics Upgraded
  this.name = "WoodenStairDown2";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs down";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.descend = "Climb down!";
}
WoodenStairDown2Tile.prototype = new FeatureObject();

function WoodenStairUp2Tile() {
  //Graphics Upgraded
  this.name = "WoodenStairUp2";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stairs up";
  this.peerview = "#808080";

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
  this.nowander = 1;

  Enterable.call(this, "null", 0, 0);
  this.klimb = "Climb up!";
}
WoodenStairUp2Tile.prototype = new FeatureObject();

function SingleSignpostTile() {
  //Graphics Upgraded
  this.name = "SingleSignpost";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SingleSignpostTile.prototype = new FeatureObject();

function SignpostLeftTile() {
  //Graphics Upgraded
  this.name = "SignpostLeft";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SignpostLeftTile.prototype = new FeatureObject();

function SignpostRightTile() {
  //Graphics Upgraded
  this.name = "SignpostRight";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "signpost";
  this.peerview = "#541909";
}
SignpostRightTile.prototype = new FeatureObject();

function CarpenterSignTile() {
  //Graphics Upgraded
  this.name = "CarpenterSign";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "carpenter";
  this.peerview = "#541909";
}
CarpenterSignTile.prototype = new FeatureObject();

function CarpenterSign2Tile() {
  //Graphics Upgraded
  this.name = "CarpenterSign2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "carpenter";
  this.peerview = "#541909";
}
CarpenterSign2Tile.prototype = new FeatureObject();

function InnSignTile() {
  //Graphics Upgraded
  this.name = "InnSign";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "inn";
  this.peerview = "#541909";
}
InnSignTile.prototype = new FeatureObject();

function InnSign2Tile() {
  //Graphics Upgraded
  this.name = "InnSign2";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "inn";
  this.peerview = "#541909";
}
InnSign2Tile.prototype = new FeatureObject();

function TavernSignTile() {
  //Graphics Upgraded
  this.name = "TavernSign";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tavern";
  this.peerview = "#541909";
}
TavernSignTile.prototype = new FeatureObject();

function TavernSign2Tile() {
  //Graphics Upgraded
  this.name = "TavernSign2";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tavern";
  this.peerview = "#541909";
}
TavernSign2Tile.prototype = new FeatureObject();

function ArmourySignTile() {
  //Graphics Upgraded
  this.name = "ArmourySign";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "armoury";
  this.peerview = "#541909";
}
ArmourySignTile.prototype = new FeatureObject();

function ArmourySign2Tile() {
  //Graphics Upgraded
  this.name = "ArmourySign2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "armoury";
  this.peerview = "#541909";
}
ArmourySign2Tile.prototype = new FeatureObject();

function GrocerSignTile() {
  //Graphics Upgraded
  this.name = "GrocerSign";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -74*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grocer";
  this.peerview = "#541909";
}
GrocerSignTile.prototype = new FeatureObject();

function GrocerSign2Tile() {
  //Graphics Upgraded
  this.name = "GrocerSign2";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grocer";
  this.peerview = "#541909";
}
GrocerSign2Tile.prototype = new FeatureObject();

function GrocerSign_2Tile() {
  this.name = "GrocerSign_2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-480";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grocer";
  this.peerview = "#541909";
}
GrocerSign_2Tile.prototype = new FeatureObject();

function WeaponSignTile() {
  //Graphics Upgraded
  this.name = "WeaponSign";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "weaponsmith";
  this.peerview = "#541909";
}
WeaponSignTile.prototype = new FeatureObject();

function WeaponSign2Tile() {
  //Graphics Upgraded
  this.name = "WeaponSign2";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "weaponsmith";
  this.peerview = "#541909";
}
WeaponSign2Tile.prototype = new FeatureObject();

function BowyerSignTile() {
  //Grahics Upgraded
  this.name = "BowyerSign";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bowyer";
  this.peerview = "#541909";
}
BowyerSignTile.prototype = new FeatureObject();

function BowyerSign2Tile() {
  //Grahics Upgraded
  this.name = "BowyerSign2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bowyer";
  this.peerview = "#541909";
}
BowyerSign2Tile.prototype = new FeatureObject();

function AlchemistSignTile() {
  //Graphics Upgraded
  this.name = "AlchemistSign";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemist";
  this.peerview = "#541909";
}
AlchemistSignTile.prototype = new FeatureObject();

function AlchemistSign2Tile() {
  //Graphics Upgraded
  this.name = "AlchemistSign2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemist";
  this.peerview = "#541909";
}
AlchemistSign2Tile.prototype = new FeatureObject();

function MagicShoppeSignTile() {
  //Graphics Upgraded
  this.name = "MagicShoppeSign";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "magic shoppe";
  this.peerview = "#541909";
}
MagicShoppeSignTile.prototype = new FeatureObject();

function MagicShoppeSign2Tile() {
  //Graphics Upgraded
  this.name = "MagicShoppeSign2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "magic shoppe";
  this.peerview = "#541909";
}
MagicShoppeSign2Tile.prototype = new FeatureObject();

function HealerSignTile() {
  //Graphics Upgraded
  this.name = "HealerSign";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "healer";
  this.peerview = "#541909";
}
HealerSignTile.prototype = new FeatureObject();

function HealerSign2Tile() {
  //Graphics Upgraded
  this.name = "HealerSign2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "healer";
  this.peerview = "#541909";
}
HealerSign2Tile.prototype = new FeatureObject();

function CasinoSignTile() {
  //Graphics Upgraded
  this.name = "CasinoSign";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "casino";
  this.peerview = "#541909";
}
CasinoSignTile.prototype = new FeatureObject();

function CasinoSign2Tile() {
  //Graphics Upgraded
  this.name = "CasinoSign2";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "casino";
  this.peerview = "#541909";
}
CasinoSign2Tile.prototype = new FeatureObject();

function PaladinSignTile() {
  //Graphics Upgraded
  this.name = "PaladinSign";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign showing a chalice";
  this.peerview = "#541909";
}
PaladinSignTile.prototype = new FeatureObject();

function PaladinSign2Tile() {
  //Graphics Upgraded
  this.name = "PaladinSign2";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sign showing a chalice";
  this.peerview = "#541909";
}
PaladinSign2Tile.prototype = new FeatureObject();

function HerbalistSignTile() {
  //Graphics Upgraded
  this.name = "HerbalistSign";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "herbalist";
  this.peerview = "#541909";
}
HerbalistSignTile.prototype = new FeatureObject();

function HerbalistSign2Tile() {
  //Graphics Upgraded
  this.name = "HerbalistSign2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "herbalist";
  this.peerview = "#541909";
}
HerbalistSign2Tile.prototype = new FeatureObject();

function CartographerSignTile() {
  //Graphics Upgraded
  this.name = "CartographerSign";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -73*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "cartographer";
  this.peerview = "#541909";
}
CartographerSignTile.prototype = new FeatureObject();

function CartographerSign2Tile() {
  //Graphics Upgraded
  this.name = "CartographerSign2";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "cartographer";
  this.peerview = "#541909";
}
CartographerSign2Tile.prototype = new FeatureObject();

function WhitesmithSignTile() {
  //Graphics Upgraded
  this.name = "WhitesmithSign";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -73*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "whitesmith";
  this.peerview = "#541909";
}
WhitesmithSignTile.prototype = new FeatureObject();

function WhitesmithSign2Tile() {
  //Graphics Upgraded
  this.name = "WhitesmithSign2";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "whitesmith";
  this.peerview = "#541909";
}
WhitesmithSign2Tile.prototype = new FeatureObject();

function CourthouseSignTile() {
  //Graphics Upgraded
  this.name = "CourthouseSign";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -74*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "courthouse";
  this.peerview = "#541909";
}
CourthouseSignTile.prototype = new FeatureObject();

function CourthouseSign2Tile() {
  //Graphics Upgraded
  this.name = "CourthouseSign2";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "courthouse";
  this.peerview = "#541909";
}
CourthouseSign2Tile.prototype = new FeatureObject();

function BardSignTile() {
  //Graphics Upgraded
  this.name = "BardSign";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -71*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "Bardic College";
  this.peerview = "#541909";
}
BardSignTile.prototype = new FeatureObject();

function BardSign2Tile() {
  //Graphics Upgraded
  this.name = "BardSign2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "Bardic College";
  this.peerview = "#541909";
}
BardSign2Tile.prototype = new FeatureObject();

function BrokenSignTile() {
  //Graphics Upgraded
  this.name = "BrokenSign";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -72*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken sign";
  this.peerview = "#541909";
}
BrokenSignTile.prototype = new FeatureObject();

function BrokenSign2Tile() {
  //Graphics Upgraded
  this.name = "BrokenSign2";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken sign";
  this.peerview = "#541909";
}
BrokenSign2Tile.prototype = new FeatureObject();

function UnfinishedSignTile() {
  //Graphics Upgraded
  this.name = "UnfinishedSign";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken sign";
  this.peerview = "#541909";
}
UnfinishedSignTile.prototype = new FeatureObject();

function UnfinishedSign2Tile() {
  //Graphics Upgraded
  this.name = "UnfinishedSign2";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "broken sign";
  this.peerview = "#541909";
}
UnfinishedSign2Tile.prototype = new FeatureObject();

function TombstoneTile() {
  this.name = "Tombstone";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-512";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tombstone";
  this.peerview = "#541909";
}
TombstoneTile.prototype = new FeatureObject();

function TombstoneRIPTile() {
  this.name = "TombstoneRIP";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-512";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tombstone";
  this.peerview = "#541909";
}
TombstoneRIPTile.prototype = new FeatureObject();

function TrainingDummyTile() {
  //Graphics Upgraded
  this.name = "TrainingDummy";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -76*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "training dummy";
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
  
  Pushable.call(this);
  this.heavy = 1;
}
TrainingDummyTile.prototype = new FeatureObject();

function ArcheryTargetTile() {
  //Graphics Upgraded
  this.name = "ArcheryTarget";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -76*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "archery target";
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
  
  Pushable.call(this);
  this.heavy = 1;
}
ArcheryTargetTile.prototype = new FeatureObject();

function PottedPlantTile() {
  //Graphics Upgraded
  this.name = "PottedPlant";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "potted plant";
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
  
  Pushable.call(this);
}
PottedPlantTile.prototype = new FeatureObject();

function PottedPlant2Tile() {
  //Graphics Upgraded
  this.name = "PottedPlant2";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "potted plant";
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
  
  Pushable.call(this);
}
PottedPlant2Tile.prototype = new FeatureObject();

function WallPlaqueTile() {
  //Graphics Upgraded
  this.name = "WallPlaque";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -20*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "wall with a plaque";
}
WallPlaqueTile.prototype = new FeatureObject();

function AnvilTile() {
  //Graphics Upgraded
  this.name = "Anvil";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -76*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "anvil";
}
AnvilTile.prototype = new FeatureObject();

function WBridgeNSTile() {
  //Graphics Upgraded
  this.name = "WBridgeNS";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
WBridgeNSTile.prototype = new FeatureObject();

function EBridgeNSTile() {
  //Graphics Upgraded
  this.name = "EBridgeNS";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
EBridgeNSTile.prototype = new FeatureObject();

function BridgeNSTile() {
  //Graphics Upgraded
  this.name = "BridgeNS";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
BridgeNSTile.prototype = new FeatureObject();

function BridgeNSBrokenTile() {
  //Graphics Upgraded
  this.name = "BridgeNSBroken";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
BridgeNSBrokenTile.prototype = new FeatureObject();

function NBridgeEWTile() {
  //Graphics Upgraded
  this.name = "NBridgeEW";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
NBridgeEWTile.prototype = new FeatureObject();

function SBridgeEWTile() {
  //Graphics Upgraded
  this.name = "SBridgeEW";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
SBridgeEWTile.prototype = new FeatureObject();

function BridgeEWTile() {
  //Graphics Upgraded
  this.name = "BridgeEW";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
BridgeEWTile.prototype = new FeatureObject();

function BridgeEWBrokenTile() {
  //Graphics Upgraded
  this.name = "BridgeEWBroken";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -2*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bridge";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.bridge = 1;
}
BridgeEWBrokenTile.prototype = new FeatureObject();

function SitDown(who,what) {
  let direction;
  who.realgraphic = who.getGraphicArray();
  let cc = "";
  let rf = "";
  if (parseInt(who.skintone) === 2) {
    cc = ".1";
  } else if (parseInt(who.skintone) !== 1) { console.log("Missing skintone on "); console.log(who); }
  if (Dice.roll("1d2") === 1) {
    rf = "_2";
  }
  switch (what.facing) {
    case 0:
      direction = "north";
      break;
    case 1:
      direction = "east";
      break;
    case 2:
      direction = "south";
      break;
    case 3: 
      direction = "west";
      break;
  }
  let filename = `seated_${direction}${rf}${cc}.gif`;
  let garr = [filename,filename,0,0];
  who.setGraphicArray(garr);
  return {msg:""};
}

function StandUp(who) {
  if (who.realgraphic) {
    who.setGraphicArray(who.realgraphic);
    delete who.realgraphic;
    DebugWrite("gameobj", "Changed the graphic of " + who.getNPCName() + " from sitting.<br />");
  } else {
    alert("Entity failed to have a standing graphic. See console.");
    console.log(who);
  }
  return {msg:""};
}

function GetChairGraphicFromFacing(thing, facing) {
  let gr = thing.getGraphicArray();
  switch (facing) {
    case 0:
      // bottom
      gr[2] = -3*32;
      gr[3] = -85*32;
      break;
    case 1:
      // left
      gr[2] = -32;
      gr[3] = -85*32;
      break;
    case 2:
      // top
      gr[2] = -2*32;
      gr[3] = -85*32;
      break;
    case 3:
      // right 
      gr[2] = 0;
      gr[3] = -85*32;
      break;
    default:
      console.log(thing);
      console.log("Facing problem.");
      break;
  }
  return gr;
}

function LeftChairTile() {
  // Graphics Upgraded
  this.name = "LeftChair";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 1;
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around

}
LeftChairTile.prototype = new FeatureObject();

LeftChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

LeftChairTile.prototype.walkon = function(who) {
  return SitDown(who,this);
}


LeftChairTile.prototype.walkoff = function(who) {
  return StandUp(who);
}

LeftChairTile.prototype.getGraphicFromFacing = function(face) {
  return GetChairGraphicFromFacing(this, face)
}

function RightChairTile() {
  // Graphics Upgraded
  this.name = "RightChair";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 3;
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
}
RightChairTile.prototype = new FeatureObject();

RightChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

RightChairTile.prototype.walkon = function(who) {
  return SitDown(who,this);
}

RightChairTile.prototype.walkoff = function(who) {
  return StandUp(who);
}

RightChairTile.prototype.getGraphicFromFacing = function(face) {
  return GetChairGraphicFromFacing(this, face)
}

function TopChairTile() {
  // Graphics Upgraded
  this.name = "TopChair";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 2;
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
}
TopChairTile.prototype = new FeatureObject();

TopChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

TopChairTile.prototype.walkon = function(who) {
  return SitDown(who,this);
}

TopChairTile.prototype.walkoff = function(who) {
  return StandUp(who);
}
 
TopChairTile.prototype.getGraphicFromFacing = function(face) {
  return GetChairGraphicFromFacing(this, face)
}

function BottomChairTile() {
  // Graphics Upgraded
  this.name = "BottomChair";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "chair";
  Pushable.call(this);
  this.facing = 0;
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5; // prefer to go around
}
BottomChairTile.prototype = new FeatureObject();

BottomChairTile.prototype.use = function(who) {
  return TurnFacing(this);
}

BottomChairTile.prototype.walkon = function(who) {
  return SitDown(who,this);
}

BottomChairTile.prototype.walkoff = function(who) {
  return StandUp(who);
}
 
BottomChairTile.prototype.getGraphicFromFacing = function(face) {
  return GetChairGraphicFromFacing(this, face)
}

function TurnFacing(what) {
  switch (what.facing) {
    case 0:
      what.facing++;
      what.spritexoffset = -32;
      what.spriteyoffset = -85*32;
      break;
    case 1:
      what.facing++;
      what.spritexoffset = -2*32;
      what.spriteyoffset = -85*32;
      break;
    case 2:
      what.facing++;
      what.spritexoffset = 0;
      what.spriteyoffset = -85*32;
      break;
    case 3:
      what.facing = 0;
      what.spritexoffset = -3*32;
      what.spriteyoffset = -85*32;
      break;
  }
  
  let retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "Turned.";
  return retval;
}

function SmallTableTile() {
  //Graphics Upgraded
  this.name = "SmallTable";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
SmallTableTile.prototype = new FeatureObject();

function SmallTable2Tile() {
  //Graphics Upgraded
  this.name = "SmallTable2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
SmallTable2Tile.prototype = new FeatureObject();

function SmallTable3Tile() {
  //Graphics Upgraded
  this.name = "SmallTable3";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -80*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
SmallTable3Tile.prototype = new FeatureObject();

function LeftTableTile() {
  // Graphics Upgraded
  this.name = "LeftTable";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
LeftTableTile.prototype = new FeatureObject();

function MiddleTableTile() {
  // Graphics Upgraded
  this.name = "MiddleTable";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
MiddleTableTile.prototype = new FeatureObject();

function RightTableTile() {
  // Graphics Upgraded
  this.name = "RightTable";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -85*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "table";
}
RightTableTile.prototype = new FeatureObject();

function FoodSouthTile() {
  this.name = "FoodSouth";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-640";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "table with food";
}
FoodSouthTile.prototype = new FeatureObject();

function FoodNorthTile() {
  this.name = "FoodNorth";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-640";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "table with food";
}
FoodNorthTile.prototype = new FeatureObject();

function FoodSouthNorthTile() {
  this.name = "FoodSouthNorth";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-640";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "table with food";
}
FoodSouthNorthTile.prototype = new FeatureObject();

function FoodSouthEdgeTile() {
  this.name = "FoodSouthEdge";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-1600";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "table with food";
}
FoodSouthEdgeTile.prototype = new FeatureObject();

function FoodNorthEdgeTile() {
  this.name = "FoodNorthEdge";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-1600";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "table with food";
}
FoodNorthEdgeTile.prototype = new FeatureObject();

function HarpsichordTile() {
  //Graphics Upgraded
  this.name = "Harpsichord";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -79*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "harpsichord";
}
HarpsichordTile.prototype = new FeatureObject();

HarpsichordTile.prototype.use = function(who) {
  let retval = { fin: 1 };
  if (who === PC) {
    let distanceToMe = GetDistance(who.getx(),who.gety(),this.getx(),this.gety(),"square");
    if (distanceToMe > 1) { 
      retval["txt"] = "The harpsichord makes a few discordant sounds, and then is silent.";
    } else if ((this.gety() - who.gety()) !== 1) { 
      retval["txt"] = "You can't reach the keys from here.";
      retval["fin"] = 0;
      return retval;
    } else {  
      retval["txt"] = "Drawing upon your years of training from your tutors, you give a passable performance.";
      let ev = new DUEvent("Harpsichord Plays",who,[]);
      Listener.sendEvent(ev);
      // Consider adding a sound effect if I find a good one
    }
  }
  return retval;
}

function BedHeadTile() {
  this.name = "BedHead";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
BedHeadTile.prototype = new FeatureObject();

function BedWalkOn(bedwho,bedarr) {
//  console.log(`Bed walk on: ${bedwho.npcname}`);
//  console.log(bedwho);
//  console.log(bedarr);
//  console.log(bedwho.getGraphicArray());
  if (parseInt(bedwho.skintone) === 2) {
    bedarr[2] += -2*32;
  } else if (parseInt(bedwho.skintone) !== 1) { console.log("Missing skintone on "); console.log(bedwho); }
  bedwho.realgraphic = bedwho.getGraphicArray();
  bedwho.setGraphicArray(bedarr);
  DebugWrite("gameobj", "Changed the graphic of " + bedwho.getNPCName() + " to sleeping.<br />");

  let fea = bedwho.getHomeMap().getTile(bedwho.getx()+1,bedwho.gety()).features.getAll();
//  console.log(fea);
  let foot;
  for (let i=0;i<fea.length;i++) {
    if (fea[i].getName() === "BedFoot") { 
      fea[i].setGraphicArray(["static.png","",-6*32,-90*32]); 
      fea[i].passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
    }
  }
//  console.log(bedwho);
//  console.log(bedwho.realgraphic);
//  console.log(bedwho);
  return {msg:""};
}

function BedWalkOff(who, bed) {
//  console.log("Bed walk off.");
//  console.log(who);
  if (who.realgraphic) {
    who.setGraphicArray(who.realgraphic);
    delete who.realgraphic;
    DebugWrite("gameobj", "Changed the graphic of " + who.getNPCName() + " from sleeping.<br />");
  } else {
    alert("Entity failed to have a waking graphic. See console.");
    console.log(who);
  }
  let fea = who.getHomeMap().getTile(who.getx()+1,who.gety()).features.getAll();
  let foot;
  for (let i=0;i<fea.length;i++) {
    if (fea[i].getName() === "BedFoot") { foot = fea[i]; }
  }
  if (foot) {
    foot.setGraphicArray(["static.png","",-9*32,-89*32]);
    foot.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  }

  //  console.log(who);
  return {msg:""};
}

function BedBumpInto(who) {
  let retval = {};
	retval["fin"] = 1;
	retval["canmove"] = 1;
  retval["msg"] = "";
  
  // Prevent NPCs from randomwalking into the sleeping position
  if (who.aiWandering) { retval["canmove"] = 0; } 

  return(retval);
}

BedHeadTile.prototype.walkon = function(who) {
  let garr = ["static.png","",-5*32,-90*32];
  return BedWalkOn(who,garr);
}

BedHeadTile.prototype.walkoff = function(who) {
  return BedWalkOff(who);
}

BedHeadTile.prototype.bumpinto = function(who) {
  return BedBumpInto(who);
}

function DoubleBedHeadTile() {
  this.name = "DoubleBedHead";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -91*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;
  this.occupants = ["",""];

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedHeadTile.prototype = new FeatureObject();

DoubleBedHeadTile.prototype.walkon = function(who) {
  who.realgraphic = who.getGraphicArray();
  who.setGraphicArray(["spacer.gif","",0,0]);

  this.addOccupant(who);
  this.setLook();

  return {msg:""};
}

DoubleBedHeadTile.prototype.walkoff = function(who) {
  if (who.realgraphic) {
    who.setGraphicArray(who.realgraphic);
    delete who.realgraphic;
    DebugWrite("gameobj", "Changed the graphic of " + who.getNPCName() + " from sleeping.<br />");
  } else {
    alert("Entity failed to have a waking graphic. See console.");
    console.log(who);
  }

  this.removeOccupant(who);
  this.setLook();

  return {msg:""};
}

DoubleBedHeadTile.prototype.bumpinto = function(who) {
  return BedBumpInto(who);
}

DoubleBedHeadTile.prototype.checkForSpace = function() {
  if ((this.occupants[0] === "") || (this.occupants[1] === "")) {
    return 1;
  } else { return 0; }
}

DoubleBedHeadTile.prototype.addOccupant = function(who) {
  let idx = 0;
  if (this.occupants[0] !== "") {
    if (this.occupants[1] !== "") { 
      return -1; // No room!
    }
    idx = 1;
  }
  this.occupants[idx] = who;
  
}

DoubleBedHeadTile.prototype.removeOccupant = function(who) {
  if (this.occupants[0] === who) { this.occupants[0] = ""; }
  else if (this.occupants[1] === who) { this.occupants[1] = ""; }
  else { 
    return -1;
    // This person isn't in this bed!
  }
  return 1;
}

DoubleBedHeadTile.prototype.setLook = function() {
  let fea = this.getHomeMap().getTile(this.getx()+1,this.gety()).features.getAll();
  let foot;
  for (let i=0;i<fea.length;i++) { if (fea[i].getName() === "DoubleBedFoot") { foot = fea[i]; } }
  if (!this.occupants[0] && !this.occupants[1]) {
    this.setGraphicArray(["static.png","",-4*32,-91*32]);
    foot.setGraphicArray(["static.png","",-5*32,-91*32]);
    foot.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  } else if (this.occupants[0] && !this.occupants[1]) {
    if (parseInt(this.occupants[0].skintone) === 1) {
      this.setGraphicArray(["static.png","",-6*32,-91*32]);
    } else {
      this.setGraphicArray(["static.png","",-8*32,-91*32]);
    }
    foot.setGraphicArray(["static.png","",-7*32,-91*32]);
    foot.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  } else if (!this.occupants[0] && this.occupants[1]) {
    if (parseInt(this.occupants[1].skintone) === 1) {
      this.setGraphicArray(["static.png","",-9*32,-91*32]);
    } else {
      this.setGraphicArray(["static.png","",-9*32,-90*32]);
    }
    foot.setGraphicArray(["static.png","",-7*32,-91*32]);
    foot.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  } else if (this.occupants[0] && this.occupants[1]) {
    if (parseInt(this.occupants[0].skintone) === 1) {
      if (parseInt(this.occupants[1].skintone) === 1) {
        this.setGraphicArray(["static.png","",-7*32,-92*32]);
      } else {
        this.setGraphicArray(["static.png","",-5*32,-92*32]);
      }
    } else {
      if (parseInt(this.occupants[1].skintone) === 1) {
        this.setGraphicArray(["static.png","",-8*32,-92*32]);
      } else {
        this.setGraphicArray(["static.png","",-6*32,-92*32]);
      }
    }
    foot.setGraphicArray(["static.png","",-7*32,-91*32]);
    foot.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE;
  } else {
    alert("How did I get here? (Doublebed setlook occupant fail.)"); 
  }
}

function BedFootTile() {
  this.name = "BedFoot";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -89*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
BedFootTile.prototype = new FeatureObject();

function DoubleBedFootTile() {
  this.name = "DoubleBedFoot";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -91*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedFootTile.prototype = new FeatureObject();

function DoubleBedTopHeadTile() {
  this.name = "DoubleBedTopHead";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-1632";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedTopHeadTile.prototype = new FeatureObject();

DoubleBedTopHeadTile.prototype.walkon = function(who) {
  let garr = ["master_spritesheet.png","","-64","-1632"];
  return BedWalkOn(who,garr);
}

DoubleBedTopHeadTile.prototype.walkoff = function(who) {
  return BedWalkOff(who);
}

DoubleBedTopHeadTile.prototype.bumpinto = function(who) {
  return BedBumpInto(who);
}

function DoubleBedBottomHeadTile() {
  this.name = "DoubleBedBottomHead";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-1664";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedBottomHeadTile.prototype = new FeatureObject();

DoubleBedBottomHeadTile.prototype.walkon = function(who) {
  let garr = ["master_spritesheet.png","","-64","-1664"];
  return BedWalkOn(who,garr);
}

DoubleBedBottomHeadTile.prototype.walkoff = function(who) {
  return BedWalkOff(who);
}

DoubleBedBottomHeadTile.prototype.bumpinto = function(who) {
  return BedBumpInto(who);
}

function DoubleBedTopFootTile() {
  this.name = "DoubleBedTopFoot";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-1632";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedTopFootTile.prototype = new FeatureObject();

function DoubleBedBottomFootTile() {
  this.name = "DoubleBedBottomFoot";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-1664";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bed";
  this.nowander = 1;
  this.nopush = 1;

  this.pathweight = 5; 
  this.civilizedpathweight = 5;
}
DoubleBedBottomFootTile.prototype = new FeatureObject();

function EmptyBookshelfLeftTile() {
  //Graphics Upgraded
  this.name = "EmptyBookshelfLeft";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -84*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -2*32, -84*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
EmptyBookshelfLeftTile.prototype = new FeatureObject();

function EmptyBookshelfRightTile() {
  //Graphics Upgraded
  this.name = "EmptyBookshelfRight";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -84*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -3*32, -84*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
EmptyBookshelfRightTile.prototype = new FeatureObject();

function LooseFloorboardEWTile() {
  this.name = "LooseFloorboardEW";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -7*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "wooden planks";
  this.peerview = "#602000";
  this.walkSound = "stone";
  this.prefix = "a";
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
  this.alternateSearchText = "You pry up a loose floorboard. Underneath, you find:";
}
LooseFloorboardEWTile.prototype = new FeatureObject();

LooseFloorboardEWTile.prototype.walkon = function(who) {
  if (who === PC) {
    return {msg: "Creak!"}
  }
  return {msg:""}
}

function BookshelfLeftTile() {
  //Graphics Upgraded
  this.name = "BookshelfLeft";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -84*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -6*32, -84*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
BookshelfLeftTile.prototype = new FeatureObject();

function BookshelfLeft2Tile() {
  //Graphics Upgraded
  this.name = "BookshelfLeft2";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -92*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -6*32, -84*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
BookshelfLeft2Tile.prototype = new FeatureObject();

function BookshelfRightTile() {
  //Graphics Upgraded
  this.name = "BookshelfRight";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -84*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -7*32, -84*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
BookshelfRightTile.prototype = new FeatureObject();

function BookshelfOneTile() {
  //Graphics Upgraded
  this.name = "BookshelfOne";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -83*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -5*32, -83*32];
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
BookshelfOneTile.prototype = new FeatureObject();

function RuinedBookshelfOneTile() {
  //Graphics Upgraded
  this.name = "RuinedBookshelfOne";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -87*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
RuinedBookshelfOneTile.prototype = new FeatureObject();

function RuinedBookshelfLeftTile() {
  //Graphics Upgraded
  this.name = "RuinedBookshelfLeft";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
RuinedBookshelfLeftTile.prototype = new FeatureObject();

function RuinedBookshelfRightTile() {
  //Graphics Upgraded
  this.name = "RuinedBookshelfRight";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -88*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "bookshelf";
  this.lootonce = 1;
	this.lootgroup = "";
	this.lootedid = "";
}
RuinedBookshelfRightTile.prototype = new FeatureObject();

function SmallBoxTile() {
  this.name = "SmallBox";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -79*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "small box";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -2*32, -79*32];
	this.lootgroup = "";
	this.lootedid = "";
	
	this.container = [];
  OpenContainer.call(this,"sfx_chest_open","sfx_locked_door");
  Lockable.call(this, ["static.png","",0,-79*32], ["static.png","",0,-79*32], ["static.png","",0,-79*32], 	"a",  "small box", "a", "locked small box", "a", "magically locked small box");
}
SmallBoxTile.prototype = new FeatureObject();

function CrateTile() {
  this.name = "Crate";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -79*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "small box";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -32, -79*32];
	this.lootgroup = "";
	this.lootedid = "";
	
	this.container = [];
  OpenContainer.call(this,"sfx_chest_open","sfx_locked_door");
  Lockable.call(this, ["static.png","",0,-79*32], ["static.png","",0,-79*32], ["static.png","",0,-79*32], 	"a",  "small box", "a", "locked small box", "a", "magically locked small box");
}
CrateTile.prototype = new FeatureObject();

function DresserTile() {
  //Graphics Upgraded
  this.name = "Dresser";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dresser";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",-7*32,-82*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
DresserTile.prototype = new FeatureObject();

function Dresser2Tile() {
  //Graphics Upgraded
  this.name = "Dresser2";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dresser";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",-8*32,-82*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
Dresser2Tile.prototype = new FeatureObject();

function Dresser3Tile() {
  //Graphics Upgraded
  this.name = "Dresser3";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dresser";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",0,-83*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
Dresser3Tile.prototype = new FeatureObject();

function VanityTile() {
  //Graphics Upgraded
  this.name = "Vanity";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "vanity";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",-4*32,-82*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
VanityTile.prototype = new FeatureObject();

function Vanity2Tile() {
  //Graphics Upgraded
  this.name = "Vanity2";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "vanity";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",-5*32,-82*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
Vanity2Tile.prototype = new FeatureObject();

function Vanity3Tile() {
  //Graphics Upgraded
  this.name = "Vanity3";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -82*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "vanity";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png","",-6*32,-82*32];
	
	this.container = [];
	OpenContainer.call(this,"","");
}
Vanity3Tile.prototype = new FeatureObject();

function CaskTile() {
  //Graphics Upgraded
  this.name = "Cask";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "cask";
	
}
CaskTile.prototype = new FeatureObject();

function TreeTile() {
  //Graphics Upgraded
  this.name = "Tree";
	this.graphic = "static.png";
	this.spritexoffset = -2*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tree";
}
TreeTile.prototype = new FeatureObject();

function AutumnTreeTile() {
  //Graphics Upgraded
  this.name = "AutumnTree";
	this.graphic = "static.png";
	this.spritexoffset = -3*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "tree";
}
AutumnTreeTile.prototype = new FeatureObject();

function EvergreenTile() {
  //Graphics Upgraded
  this.name = "Evergreen";
	this.graphic = "static.png";
	this.spritexoffset = -5*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "evergreen tree";
}
EvergreenTile.prototype = new FeatureObject();

function WillowTreeTile() {
  //Graphics Upgraded
  this.name = "WillowTree";
	this.graphic = "static.png";
	this.spritexoffset = -32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "willow tree";
}
WillowTreeTile.prototype = new FeatureObject();

function DeadTreeTile() {
  //Graphics Upgraded
  this.name = "DeadTree";
	this.graphic = "static.png";
	this.spritexoffset = 0;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "dead tree";
	this.lootgroup = "";
	this.lootedid = "";
  this.showsearched = 0;
  this.searchedgraphic = ["static.png","",0,-19*32];
	}
DeadTreeTile.prototype = new FeatureObject();

function AppleTreeTile() {
  //Graphics Upgraded
  this.name = "AppleTree";
	this.graphic = "static.png";
	this.spritexoffset = -4*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "apple tree";
}
AppleTreeTile.prototype = new FeatureObject();

function OlympusTapestryTile() {
  this.name = "OlympusTapestry";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "tapestry with the seal of House Olympus";
}
OlympusTapestryTile.prototype = new FeatureObject();

function PaladinTapestryTile() {
  this.name = "PaladinTapestry";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "tapestry with the chalice of the Paladins";
}
PaladinTapestryTile.prototype = new FeatureObject();

function HildendainTapestryTile() {
  this.name = "HildendainTapestry";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -19*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "tapestry with the seal of House Hildendain";
}
HildendainTapestryTile.prototype = new FeatureObject();

function GrandfatherClockTile() {
  //Graphics Upgraded
  this.name = "GrandfatherClock";
  this.graphic = "grandfatherclock.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "grandfather clock";
}
GrandfatherClockTile.prototype = new FeatureObject();

// override
GrandfatherClockTile.prototype.getFullDesc = function() {
  let full = "";
  if (this.getPrefix()) {
    full = this.getPrefix() + " ";
  }
  
  full = full + this.getDesc();

  full = full + " that reads ";
  let gfclocktime = GetDisplayTime();
  full = full + gfclocktime;

  return full;
}

GrandfatherClockTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);
    let time = GetClockTime();
    this.currentHour = time[3];
  }
}

GrandfatherClockTile.prototype.myTurn = function() {
  let time = GetClockTime();
  let hour = time[3];
  if (hour !== this.currentHour) {
    this.currentHour = hour;
    if (!PC.getWaiting() && (PC.getHomeMap() === this.getHomeMap()) && (GetDistance(PC.getx(),PC.gety(),this.getx(),this.gety()) < 5)) {
      if (hour > 12) { hour -= 12; }
      if (hour === 0) { hour = 12; }
      TollChime(hour, this);
    }
  }
  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,SCALE_TIME);

  return 1;
}

function TollChime(hoursleft, clock) {
  if (hoursleft) {
    if (clock.getHomeMap() !== PC.getHomeMap()) { return; }
    let dist = GetDistance(clock.getx(),clock.gety(),PC.getx(),PC.gety())-4;
    let sndmult = 1;
    if (dist > 0) {
      sndmult = Math.max(0, 1 - dist/6);
    }
    DUPlaySound("sfx_bong", sndmult);
    setTimeout(function() { TollChime(hoursleft-1, clock); }, 1500);
  }
}

function BarrelTile() {
  //Graphics Upgraded
  this.name = "Barrel";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -79*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "barrel";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -7*32, -79*32];
	this.lootgroup = "";
	this.lootedid = "";
  this.flammable = 20; // 20% chance it burns if in a fire
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
	
	this.container = [];
	OpenContainer.call(this,"","");
	Pushable.call(this);
}
BarrelTile.prototype = new FeatureObject();

BarrelTile.prototype.flamed = function() {
  ContainerOnFire(this);
}

function ContainerOnFire(what) {
  maintext.addText("The " + what.getDesc() + " is consumed by flame!");
  let burnup = what.use(what,1); // ignore locked and trapped
  if (burnup["txt"] === "Empty.") {
    maintext.addText("It was empty.");
  } else {
    maintext.addText(burnup["txt"]);
  }
  let thisx = what.getx();
  let thisy = what.gety();
  
  let itsmap = what.getHomeMap();
  itsmap.deleteThing(what);
  DrawMainFrame("one",itsmap,thisx,thisy);
  
  return 1; 
}

function KitchenBarrelTile() {
  this.name = "KitchenBarrel";
}
KitchenBarrelTile.prototype = new BarrelTile();

KitchenBarrelTile.prototype.use = function(who) {
  let retval = { fin: 1, txt: "It is full of salt and spices."};
  return retval;
}

function KitchenBarrel2Tile() {
  this.name = "KitchenBarrel2";
}
KitchenBarrel2Tile.prototype = new BarrelTile();

KitchenBarrel2Tile.prototype.use = function(who) {
  let retval = { fin: 1, txt: "It is full of salted meat."};
  return retval;
}

function KitchenBarrel3Tile() {
  this.name = "KitchenBarrel3";
}
KitchenBarrel3Tile.prototype = new BarrelTile();

KitchenBarrel3Tile.prototype.use = function(who) {
  let retval = { fin: 1, txt: "It is full of delicious cheeses."};
  return retval;
}

function Barrel2Tile() {
  //Graphics Upgraded
  this.name = "Barrel2";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -79*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "barrel";
  this.showsearched = 1;
  this.searchedgraphic = ["static.png", "", -8*32, -79*32];
	this.lootgroup = "";
	this.lootedid = "";
  this.flammable = 20; // 20% chance it burns if in a fire
  this.pathweight = 10; 
  this.civilizedpathweight = 10; // paths should never go through this unless there is no choice
	
	this.container = [];
	OpenContainer.call(this,"","");
	Pushable.call(this);
}
Barrel2Tile.prototype = new FeatureObject();

Barrel2Tile.prototype.flamed = function() {
  ContainerOnFire(this);
}

function CrackedMirrorTile() {
  //Graphics Upgraded
  this.name = "CrackedMirror";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -76*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mirror";
  this.karmamod = -1;
  
  Breakable.call(this,["static.gif", "", -7*32, -77*32],0,"sfx_break_glass");
  this.brokendesc = "broken mirror";
}
CrackedMirrorTile.prototype = new FeatureObject();

function MirrorTile() {
  //Graphics Upgraded
  this.name = "Mirror";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -76*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mirror";
  this.karmamod = -1;
  
  Breakable.call(this,["static.gif", "", -7*32, -77*32],0,"sfx_break_glass");
  this.brokendesc = "broken mirror";
}
MirrorTile.prototype = new FeatureObject();

MirrorTile.prototype.activate = function() {
  if (!DU.gameflags.getFlag("editor")) {
    let reflection = localFactory.createTile("Reflection");
    reflection.mirror = this;
    let homemap = this.getHomeMap();
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
    this.mirror.setGraphicArray([who.getGraphic(), "mirror-reflection_d.gif", "0", "7"]);
  }
  return {msg:""};
}

ReflectionTile.prototype.walkoff = function(who) {
  // remove reflection from attached mirror
  if (!this.mirror.getBroken()) {
    this.mirror.setGraphicArray(["master_spritesheet_d.gif", "", "-192", "-384"]);
  }
  return {msg:""};
}

function CursedMirrorTile() {
  this.name = "CursedMirror";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -77*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "mirror";
  
  Breakable.call(this,["master_spritesheet_d.gif", "", "-224", "-384"],0,"sfx_break_glass");
  this.brokendesc = "broken mirror";
}
CursedMirrorTile.prototype = new FeatureObject();

CursedMirrorTile.prototype.activate = function() {
  if (!DU.gameflags.getFlag("editor")) {
    let reflection = localFactory.createTile("CursedReflection");
    reflection.mirror = this;
    let homemap = this.getHomeMap();
    homemap.placeThing(this.getx(),this.gety()+2,reflection);
  }
  return 1;
}

CursedMirrorTile.prototype.onBreak = function(who) {
  // generate Imp and place on broken mirror

  Earthquake();
  let imp = localFactory.createTile("ImpNPC");
  imp.lootTable = "cursed";
  this.getHomeMap().placeThing(this.getx(),this.gety(),imp);
  DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
  let energy = localFactory.createTile("EnergyField");
  this.getHomeMap().placeThing(10,10,energy);
  DrawMainFrame("one",this.getHomeMap(),10,10);
  let negated = DU.gameflags.getFlag("negate");
  delete negated[this.getHomeMap().getName()];
  DU.gameflags.setFlag("negate", negated);
  maintext.delayedAddText("You feel the flow of ether surround you once more!");
}

function CursedReflectionTile() {
  this.name = "CursedReflection";
  this.graphic = "walkon.gif";
  this.invisible = 1;
  this.passable = MOVE_WALK + MOVE_LEVITATE + MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "reflection walkon";
  this.nosave = 1;
  this.conversation = "cursed_mirror";
}
CursedReflectionTile.prototype = new FeatureObject();

CursedReflectionTile.prototype.getConversation = function() {
  return this.conversation;
}

CursedReflectionTile.prototype.getGenderedTerms = function() {
  let gt = {};
  gt.pronoun = "it";
  gt.possessive = "its";
  gt.objective = "it";
  gt.titled = "Lord";
  gt.sibling = "sibling";
  gt.kiddie = "child";    
  return gt;  
}

CursedReflectionTile.prototype.getNPCName = function() {
	return "The cursed mirror";
}

CursedReflectionTile.prototype.walkon = function(who) {
  // add reflection to attached mirror
  if (!this.mirror.getBroken()) {
    this.mirror.setGraphicArray(["351.gif", "mirror-reflection_d.gif", "0", "7"]);
    // Actually use Imp graphic rather than Daemon

    let field = this.getHomeMap().getTile(10,10).getTopFeature();
    this.getHomeMap().deleteThing(field);
    let tree = localFactory.createTile("DeadTree");
    this.getHomeMap().placeThing(10,10,tree);

    let retval = {};
    retval.msg = "";
    if (!DU.gameflags.getFlag("mirror_talks")) {
      DU.gameflags.setFlag("mirror_talks",1);
      retval = PerformTalk(this,"cursed_mirror","_start");
      retval["override"] = -3;
      maintext.drawTextFrame();
      return retval;
    } 

    //	this.graphic = "master_spritesheet.png";    // spritesheet version of reflection. Can't work yet because of need to be overlay
    // this.spritexoffset = "-288"; 
    // this.spriteyoffset = "-1344";
  }
  return {msg:""};
}

function AlchemyLabTopTile() {
  this.name = "AlchemyLabTop";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-1632";
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_SWIM + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemy lab";
  this.alwaystop = 1;
}
AlchemyLabTopTile.prototype = new FeatureObject();

function AlchemyLabTop2Tile() {
  this.name = "AlchemyLabTop2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-1632";
  this.passable = MOVE_ETHEREAL + MOVE_FLY + MOVE_WALK + MOVE_SWIM + MOVE_LEVITATE;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemy lab";
  this.alwaystop = 1;
}
AlchemyLabTop2Tile.prototype = new FeatureObject();

function AlchemyLabTile() {
  this.name = "AlchemyLab";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-1664";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemy lab";
}
AlchemyLabTile.prototype = new FeatureObject();

function AlchemyLab2Tile() {
  this.name = "AlchemyLab2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-1664";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "an";
  this.desc = "alchemy lab";
}
AlchemyLab2Tile.prototype = new FeatureObject();

function WaterfallTile() {
  //Graphics Upgraded
  this.name = "Waterfall";
  this.graphic = "waterfall.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "waterfall";
    
  HasAmbientNoise.call(this,"sfx_waterfall",1.5);
}
WaterfallTile.prototype = new FeatureObject();

WaterfallTile.prototype.activate = function() {
  if (!DU.gameflags.getFlag("editor")) {
    let flow = localFactory.createTile("WaterfallFlow");
    flow.waterfall = this;
    let homemap = this.getHomeMap();
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
  if (who.getMovetype() & MOVE_FLY) { return {msg:""}; }
  let waterfall = this.waterfall;
  setTimeout(function() {
    DescendWaterfall(who, waterfall);
  }, 300);
  return {msg:""};
}

function DescendWaterfall(who, waterfall) {
  let thismap = who.getHomeMap();
  thismap.moveThing(who.getx(),who.gety()+1,who);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());  
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

function GrassWaterfallTile() {
  this.name = "GrassWaterfall";
  this.layers = [["static.png","",-3*32,-60*32]];
}
GrassWaterfallTile.prototype = new WaterfallTile();

function DirtWaterfallTile() {
  this.name = "DirtWaterfall";
  this.layers = [["static.png","",-3*32,-67*32]];
}
DirtWaterfallTile.prototype = new WaterfallTile();

function CaveWaterfallTile() {
  this.name = "CaveWaterfall";
  this.layers = [["static.png","",-2*32,-67*32]];
}
CaveWaterfallTile.prototype = new WaterfallTile();

function BrilliantPoolTile() {
  this.name = "BrilliantPool";
  this.graphic = "pool.gif";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "the";
  this.desc = "Brilliant Pool";
}
BrilliantPoolTile.prototype = new FeatureObject();

BrilliantPoolTile.prototype.use = function(who) {
  let retval = {};
  
  if (who === PC) {
    targetCursor.useditem = this;
    retval["override"] = -1;
    retval["fin"] = -1;
    retval["txt"] = "Drink from the pool?";
    retval["input"] = "(Y/N): ";
    return retval;
  }
  retval["fin"] = 1;
  return retval;
}

BrilliantPoolTile.prototype.usePrompt = function(code) {
  let retval = {};
  retval["fin"] = 1;
  if (DU.gameflags.getFlag("pool_drunk")) {
    retval["txt"] = "Having previously drunk of the pool, you are now too smart to dare try that again.";
    retval["fin"] = 3;
    return retval;
  }
  if (code === 89) {
    retval["txt"] = "You drink from the pool.";
    retval["override"] = 1;        
    retval["fin"] = 3;
    targetCursor.booktext = ["You feel tremendous power rush into you!","You view the world from above, seeing the secrets and the minds of each and every living thing.","This bright elixir peerless you have drunk...","YOU KNOW ALL THINGS!","...It is too much for your mortal mind...","Suddenly you are aware of just one thing-", "your mind is burning."];
    targetCursor.useditem = this;
    targetCursor.bookfinish = 1;
  } else {
    retval["txt"] = "You choose not to drink.";
  }
  return retval;
}

BrilliantPoolTile.prototype.bookFinish = function() {
  PC.setOrbInt(PC.getOrbInt() + 1);
  DU.gameflags.setFlag("pool_drunk",1);
  PC.dealDamage(PC.getMaxHP() + 100);
  return;
}

function SecretDoorTile() {
	this.name = "SecretDoor";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
	this.passable = MOVE_ETHEREAL;
	this.blocklos = 2; 
	this.prefix = "a";
	this.desc = "wall";
	
	this.searchDesc = "secret door";
	this.searchPrefix = "a";
  this.peerview = "white";
  
  this.pathweight = 2; 
	
  Openable.call(this, [this.graphic, "", -8*32, -15*32], [this.graphic,"",-7*32,-16*32], 0, "sfx_stone_drag", "sfx_stone_drag", "sfx_locked_door");
}
SecretDoorTile.prototype = new FeatureObject();

function GreySecretDoorTile() {
	this.name = "GreySecretDoor";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -18*32;
  this.passable = MOVE_ETHEREAL;
	this.blocklos = 2; 
	this.prefix = "a";
	this.desc = "wall";
	
	this.searchDesc = "secret door";
	this.searchPrefix = "a";
  this.peerview = "white";
  
  this.pathweight = 2; 
	
  Openable.call(this, [this.graphic, "", -8*32, -18*32], [this.graphic,"",-6*32,-17*32], 0, "sfx_stone_drag", "sfx_stone_drag", "sfx_locked_door");
}
GreySecretDoorTile.prototype = new FeatureObject();

function DestructableStoneWallTile() {
  this.name = "DestructableStoneWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "0";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
DestructableStoneWallTile.prototype = new FeatureObject();

function RuinsWallTallLeftMidRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallTallLeftMidRight";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallTallLeftMidRightTile.prototype = new FeatureObject();

function RuinsWallTallLeftMidRight2Tile() {
  //Graphics Upgraded
  this.name = "RuinsWallTallLeftMidRight2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallTallLeftMidRight2Tile.prototype = new FeatureObject();

function RuinsWallMidLeftMidRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallMidLeftMidRight";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallMidLeftMidRightTile.prototype = new FeatureObject();

function RuinsWallMidLeftTallRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallMidLeftTallRight";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallMidLeftTallRightTile.prototype = new FeatureObject();

function RuinsWallMidLeftBottomRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallMidLeftBottomRight";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallMidLeftBottomRightTile.prototype = new FeatureObject();

function RuinsWallBottomLeftBottomRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallBottomLeftBottomRight";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallBottomLeftBottomRightTile.prototype = new FeatureObject();

function RuinsWallBottomLeftMidRightTile() {
  //Graphics Upgraded
  this.name = "RuinsWallBottomLeftMidRight";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -13*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
RuinsWallBottomLeftMidRightTile.prototype = new FeatureObject();

function WellTile() {
  //Graphics Upgraded
	this.name = "Well";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -76*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "well";
}
WellTile.prototype = new FeatureObject();

WellTile.prototype.use = function(who) {
  if (this.spritexoffset === -3*32) { this.spritexoffset = -4*32; }
  else { this.spritexoffset = -3*32; }
  DrawMainFrame("one",this.getHomeMap(), this.getx(), this.gety());
}

function BareWellTile() {
  //Graphics Upgraded
	this.name = "BareWell";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -76*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL;
	this.blocklos = 0; 
	this.prefix = "a";
	this.desc = "well";
}
BareWellTile.prototype = new FeatureObject();

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

function WhirlpoolFlukeTile() {
	this.name = "WhirlpoolFluke";
	this.graphic = "325.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "whirlpool";
  
}
WhirlpoolFlukeTile.prototype = new FeatureObject();

WhirlpoolFlukeTile.prototype.walkon = function(walker) {
  let diz = localFactory.createTile("Dizzy");
  diz.setExpiresTime(-1);
  walker.addSpellEffect(diz);
  return {msg:""};
}

WhirlpoolFlukeTile.prototype.walkoff = function(walker) {
  let diz = walker.getSpellEffectsByName("Dizzy");
  walker.deleteSpellEffect(diz);
  return {msg:""};
}

WhirlpoolFlukeTile.prototype.walkofftest = function(walker) {
  let chance = Dice.roll("1d30");
  let retval = []
  if (chance < walker.getStr()) {
    retval["txt"] = "You struggle to escape the pull of the whirlpool. You succeed!";
    retval["success"] = 1; 
  } else {
    retval["txt"] = "You struggle to escape the pull of the whirlpool. You fail.";
    retval["success"] = 0;
  }
  return retval;
}

function WalkOnTile() {
	this.name = "WalkOn";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnTile.prototype = new FeatureObject();

function WalkOnWingTile() {
	this.name = "WalkOnWing";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWingTile.prototype = new FeatureObject();

WalkOnWingTile.prototype.walkon = function(walker) {
  if ((walker === PC) && !walker.getHomeMap().blessed) {
    walker.getHomeMap().blessed = 1;
    walker.setHP(walker.getMaxHP());
    walker.setMana(walker.getMaxMana());
    if (!walker.getSpellEffectsByName("Blessing")) {
      let blessing = localFactory.createTile("Blessing");
      blessing.setPower(3);
      blessing.setExpiresTime(DU.DUTime.getGameClock() + 12*24);
      PC.addSpellEffect(blessing);
      DrawCharFrame();
    }
    return {msg: "The sound of water rushing over the edge and plummeting below fills you with a sense of great peace and tranquility. You feel refreshed." };
  }
  return {msg:""};
}

function WalkOnConsolationTile() {
	this.name = "WalkOnConsolation";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnConsolationTile.prototype = new FeatureObject();

WalkOnConsolationTile.prototype.walkon = function(walker) {
  if (DU.gameflags.getFlag("enter_consolation")) {
    let themap = this.getHomeMap();
    let field = themap.getTile(16,25).getTopFeature();
    if (field) {
      themap.deleteThing(field);
      field = themap.getTile(17,25).getTopFeature();
      themap.deleteThing(field);
      DrawMainFrame("one",themap,16,25);
      DrawMainFrame("one",themap,17,25);
      return {msg:"The forcefield disappears as you approach."};  
    }
    return {msg:""};
  } else if (walker === PC) {
    let npc = this.getHomeMap().getTile(0,0).getTopNPC();
    if (npc) {
      PC.forcedTalk = npc;
    }
    return {msg:""};
  } else { 
    return {msg:""};
  }
}

function ToshinWalkOnTile() {
	this.name = "ToshinWalkOn";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
ToshinWalkOnTile.prototype = new FeatureObject();

ToshinWalkOnTile.prototype.walkon = function(walker) {
  if ((walker === PC) && (!DU.gameflags.getFlag("knows_arlan"))) {
    let themap = this.getHomeMap();
    let arlan = FindNPCByName("Arlan",themap);
    PC.forcedTalk = arlan;
  }
  return {msg:""}
}

function WorldsEndingWalkOnTile() {
	this.name = "WorldsEndingWalkOn";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WorldsEndingWalkOnTile.prototype = new FeatureObject();

WorldsEndingWalkOnTile.prototype.walkon = function(walker) {
  let mapref = walker.getHomeMap();
  CloseWEDoors(mapref);
  if ((this.getx() === 35) && (this.gety() === 34) && ((this.getHomeMap().getTile(35,34).getFeatureByName("WorldsEndingWalkOn").secondlastteleport === "39,56") && (this.getHomeMap().getTile(35,34).getFeatureByName("WorldsEndingWalkOn").lastteleport === "31,56"))) {
    // SE, SW, N
    mapref.moveThing(43,34,walker);        
  } else if ((this.getx() === 31) && (this.gety() === 56) && ((this.getHomeMap().getTile(35,34).getFeatureByName("WorldsEndingWalkOn").lastteleport === "39,34") && (this.getHomeMap().getTile(35,34).getFeatureByName("WorldsEndingWalkOn").secondlastteleport === "35,34"))) { 
    // NE, N, SW
    mapref.moveThing(43,56,walker);        
  } else {
    if (typeof this.destx === "number") { 
      mapref.moveThing(this.destx,this.desty,walker);
    } else {
      mapref.moveThing(this.destx[Dice.roll("1d3-1")],this.desty,walker);
    }
  }
  
  // set last traveled to check patterns
  let trackteleports = this.getHomeMap().getTile(35,34).getFeatureByName("WorldsEndingWalkOn");
  trackteleports.secondlastteleport = trackteleports.lastteleport;
  trackteleports.lastteleport = this.getx() + "," + this.gety();
  if (walker === PC) { DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety()); }

  return {msg:""};
}

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
  if (walker === PC) {
    let themap=walker.getHomeMap();
    themap.setExitToX(this.setxto);
    themap.setExitToY(this.setyto);
  }
  return {msg:""};
}

function WalkOnHC1Tile() {
  this.name = "WalkOnHC1";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.destmap = "hotelcalifornia";
}
WalkOnHC1Tile.prototype = new FeatureObject();

WalkOnHC1Tile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  let newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let retval = {overridedraw: 1};
  DU.gameflags.setFlag("started_pheran",1);
  if (this.say) {
    retval.msg = this.say;
  }
  return retval;
}

function WalkOnHC2Tile() {
  this.name = "WalkOnHC2";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.destmap = "hotelcalifornia3";
}
WalkOnHC2Tile.prototype = new FeatureObject();

WalkOnHC2Tile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  let newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let retval = {overridedraw: 1};
  if (this.say) {
    retval.msg = this.say;
  }
  DU.gameflags.setFlag("started_pheran",1);
  return retval;
}

function WalkOnHC2ClockTile() {
  this.name = "WalkOnHC2Clock";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnHC2ClockTile.prototype = new FeatureObject();

WalkOnHC2ClockTile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  for (let i=0;i<this.place.length;i++) {
    let clock = localFactory.createTile("GrandfatherClock");
    themap.placeThing(this.place[i].x,this.place[i].y,clock);
//    DrawMainFrame("one", PC.getHomeMap(), place[i].x, place[i].y);
  }
  return {msg:""};
}

function WalkOnHC3TreeTile() {
  this.name = "WalkOnHC3Tree";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnHC3TreeTile.prototype = new FeatureObject();

WalkOnHC3TreeTile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  for (let i=0;i<this.place.length;i++) {
    let clock = localFactory.createTile("DeadTree");
    themap.placeThing(this.place[i].x,this.place[i].y,clock);
//    DrawMainFrame("one", PC.getHomeMap(), place[i].x, place[i].y);
  }
  return {msg:""};
}

function WalkOnHC5Tile() {
  this.name = "WalkOnHC5";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.destmap = "hotelcalifornia6";
  this.destx = 10;
  this.desty = 12;
}
WalkOnHC5Tile.prototype = new FeatureObject();

WalkOnHC5Tile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  let newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);

  let door = themap.getTile(10,3).getTopFeature();
  if (door.open) { door.use(walker,1); }
  door = themap.getTile(10,6).getTopFeature();
  if (door.open) { door.use(walker,1); }
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let retval = {overridedraw: 1};
  if (this.say) {
    retval.msg = this.say;
  }
  return retval;
}

function WalkOnHC6Tile() {
  this.name = "WalkOnHC6";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.destmap = "hotelcalifornia5";
  this.destx = 10;
  this.desty = 5;
}
WalkOnHC6Tile.prototype = new FeatureObject();

WalkOnHC6Tile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  let newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let door = themap.getTile(10,14).getTopFeature();
  if (door.open) { door.use(walker,1); }
  door = themap.getTile(10,6).getTopFeature();
  if (door.open) { door.use(walker,11); }
  let retval = {overridedraw: 1};
  if (this.say) {
    retval.msg = this.say;
  }
  return retval;
}

function WalkOnHC7Tile() {
  this.name = "WalkOnHC7";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
  this.destmap = "hotelcalifornia8";
  this.destx = 7;
  this.desty = 16;
  this.say = "The inn fades from view and is gone.";
}
WalkOnHC7Tile.prototype = new FeatureObject();

WalkOnHC7Tile.prototype.walkon = function(walker) {
  let themap=walker.getHomeMap();
  let newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let retval = {overridedraw: 1};
  if (this.say) {
    retval.msg = this.say;
  }
  return retval;
}

function WalkOnNoGalaxyTile() {
	this.name = "WalkOnNoGalaxy";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnNoGalaxyTile.prototype = new FeatureObject();

WalkOnNoGalaxyTile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let mymap = walker.getHomeMap();
    mymap.setBackground("");
  
    let normalsong = mymap.getMusic();
    if (DU.gameflags.getFlag("music") && nowplaying.name && (nowplaying.name !== normalsong)) {
      DUPlayMusic(normalsong, {fade:1});
    }
    DrawMainFrame("draw",mymap,walker.getx(),walker.gety());
    return {msg:""};
  }
}

function WalkOnGalaxy1Tile() {
	this.name = "WalkOnGalaxy1";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnGalaxy1Tile.prototype = new FeatureObject();

WalkOnGalaxy1Tile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let mymap = walker.getHomeMap();
    mymap.setBackground("ether.gif");
    mymap.setOpacity(.2);
  
     let song = "Sirius";
     if (DU.gameflags.getFlag("music") && nowplaying.name && (nowplaying.name !== song)) {
      DUPlayMusic(song, {fade:1});
    }
    DrawMainFrame("draw",mymap,walker.getx(),walker.gety());
    return {msg:""};
  }
}

function WalkOnGalaxy2Tile() {
	this.name = "WalkOnGalaxy2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnGalaxy2Tile.prototype = new FeatureObject();

WalkOnGalaxy2Tile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let mymap = walker.getHomeMap();
    mymap.setBackground("ether.gif");
    mymap.setOpacity(.5);
  
    let song = "Sirius";
    if (DU.gameflags.getFlag("music") && nowplaying.name && (nowplaying.name !== song)) {
     DUPlayMusic(song, {fade:1});
    }
    DrawMainFrame("draw",mymap,walker.getx(),walker.gety());
    return {msg:""};
  }
}

function WalkOnGalaxy3Tile() {
	this.name = "WalkOnGalaxy3";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnGalaxy3Tile.prototype = new FeatureObject();

WalkOnGalaxy3Tile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let mymap = walker.getHomeMap();
    mymap.setBackground("ether.gif");
    mymap.setOpacity(.8);
  
    let song = "Sirius";
    if (DU.gameflags.getFlag("music") && nowplaying.name && (nowplaying.name !== song)) {
      DUPlayMusic(song, {fade:1});
    }
    DrawMainFrame("draw",mymap,walker.getx(),walker.gety());
    return {msg:""};
  }
}

function WardukeWalkOnTile() {
	this.name = "WardukeWalkOn";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WardukeWalkOnTile.prototype = new FeatureObject();

WardukeWalkOnTile.prototype.walkon = function(walker) {
  if (walker === PC) {
    let themap = this.getHomeMap();
    let warduke = FindNPCByName("Warduke", themap);
    PC.forcedTalk(warduke);
    let field = themap.getTile(30,6).getTopFeature();
    themap.deleteThing(field);
    field = themap.getTile(31,6).getTopFeature();
    themap.deleteThing(field);
    field = themap.getTile(31,7).getTopFeature();
    themap.deleteThing(field);
    field = themap.getTile(31,8).getTopFeature();
    themap.deleteThing(field);
    field = themap.getTile(30,8).getTopFeature();
    themap.deleteThing(field);
    field = themap.getTile(30,7).getTopFeature();  // walkon tile
    themap.deleteThing(field);
  }
  return {msg:""};
}

function WalkOnCOA2Tile() {
	this.name = "WalkOnCOA2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-608";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnCOA2Tile.prototype = new FeatureObject();

WalkOnCOA2Tile.prototype.walkon = function(walker) {
  if (walker !== PC) { return {msg:""}; }
  if (!DU.gameflags.getFlag("act2")) { return {msg:""}; }
  if (DU.gameflags.getFlag("guard_thief_talk")) { return {msg:""}; }

  let comap = this.getHomeMap();
  let npcs = comap.npcs.getAll();
  let closest;
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName() === "TownGuardNPC") {
      if (!closest) { closest = npcs[i]; }
      else {
        let closestdist = GetDistance(PC.getx(),PC.gety(),closest.getx(),closest.gety());
        let dist = GetDistance(PC.getx(),PC.gety(),npcs[i].getx(),npcs[i].gety());
        if (dist < closestdist) { closest = npcs[i]; }
      }
    }
  }
  
}

function SpinnerTile() {
  this.name = "Spinner";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
SpinnerTile.prototype = new FeatureObject();

SpinnerTile.prototype.walkon = function(walker) {
  let diso = localFactory.createTile("Disoriented");
  walker.addSpellEffect(diso);
  return {msg:""};
}

SpinnerTile.prototype.walkoff = function(walker) {
  let diso = walker.getSpellEffectsByName("Disoriented");
  diso.endEffect();
  return {msg:""};
}

function WalkOnMessageTile() {
	this.name = "WalkOnMessage";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
  this.invisible = 1;
  this.message = "";
}
WalkOnMessageTile.prototype = new FeatureObject();

WalkOnMessageTile.prototype.walkon = function(walker) {
  let response = {msg:""};
  if ((walker === PC) && (this.message) && (PC.getLight() >= 1)) {
    response.msg = this.message;
  } else if ((walker === PC) && (this.message)) {
    response.msg = "There is writing on the walls here, but your light is too dim to read it.";
  }
  return response;
}

function WalkOnRotateTile() {
	this.name = "WalkOnRotate";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnRotateTile.prototype = new FeatureObject();

WalkOnRotateTile.prototype.walkon = function(walker) {
  if (walker !== PC) { return {msg:""}; }

  let turns = Dice.roll("1d3");
  DebugWrite("gameobj", "PC stepped on central spinner: rotating " + turns + "x90 degrees.<br />");

  let currmap = this.getHomeMap();
  let mapidx = 0;
  if (currmap.getName() === "mtdrash7a") { mapidx = 1; }
  if (currmap.getName() === "mtdrash7b") { mapidx = 2; }
  if (currmap.getName() === "mtdrash7c") { mapidx = 3; }
  mapidx += turns;
  mapidx = mapidx % 4;
  let destmap = "mtdrash7";
  if (mapidx === 1) { destmap = "mtdrash7a"; }
  if (mapidx === 2) { destmap = "mtdrash7b"; }
  if (mapidx === 3) { destmap = "mtdrash7c"; }
  DebugWrite("gameobj", "Moving from " + currmap.getName() + " to " + destmap + ".<br />");
  destmap = maps.getMap(destmap);
  let dest = { destx: PC.getx(), desty: PC.gety() };
  for (let i=1;i<=turns;i++) {
    dest = Get90DegCoords(13,13,dest.destx,dest.desty);
  }
  MoveBetweenMaps(PC,currmap,destmap,dest.destx,dest.desty);

  let feas = currmap.features.getAll();
  for (let i=0;i<feas.length;i++) {
    dest = { destx: feas[i].getx(), desty: feas[i].gety() }
    for (let j=1;j<=turns;j++) {
      dest = Get90DegCoords(13,13,dest.destx,dest.desty);
    }
    MoveBetweenMaps(feas[i],currmap,destmap,dest.destx,dest.desty);
  }

  feas = currmap.npcs.getAll();
  for (let i=0;i<feas.length;i++) {
    dest = { destx: feas[i].getx(), desty: feas[i].gety() }
    for (let j=1;j<=turns;j++) {
      dest = Get90DegCoords(13,13,dest.destx,dest.desty);
    }
    MoveBetweenMaps(feas[i],currmap,destmap,dest.destx,dest.desty);
  }
  DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
  return {overridedraw: 1,msg:"A rumbling sound fills the dungeon. At the edge of awareness something shifts and rearranges..."};
}

function WalkOnWindTile() {
	this.name = "WalkOnWind";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnWindTile.prototype = new FeatureObject();

WalkOnWindTile.prototype.walkon = function(walker) {
  let response = {msg:""};
  if (walker === PC) {
    let torch = walker.getSpellEffectsByName("TorchLight");
    if (torch) {
      torch.endEffect();
    }
    response.msg = "A strange wind blows!";
  }
  return response;
}

function WalkOnDarknessTile() {
	this.name = "WalkOnDarkness";
	this.graphic = "walkon.gif";
	this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
	this.blocklos = 0;
	this.prefix = "an";
	this.desc = "invisible walkon tile";
	this.invisible = 1;
}
WalkOnDarknessTile.prototype = new FeatureObject();

WalkOnDarknessTile.prototype.walkon = function(walker) {
  let response = {msg:""};
  if (walker === PC) {
    let torch = walker.getSpellEffectsByName("TorchLight");
    if (torch) {
      torch.endEffect();
    }
    let light = walker.getSpellEffectsByName("Light");
    if (light) {
      light.endEffect();
    }
    response.msg = "You are smothered in darkness!";
  }
  return response;
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
  let themap=walker.getHomeMap();
  newmap = maps.getMap(this.destmap);
  if (!this.destx) {
    this.destx = walker.getx();
    this.desty = walker.gety();
  }
  MoveBetweenMaps(walker,themap,newmap,this.destx,this.desty);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  let retval = {overridedraw: 1,msg:""};
  if (this.say) {
    retval.msg = this.say;
  }
  return retval;
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

function NightshadeSpawnerTile() {
  this.name = "NightshadeSpawner";
  this.graphic = "target-cursor.gif";
  this.passable = MOVE_SWIM + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_FLY + MOVE_WALK;
  this.blockslos = 0;
  this.prefix = "an";
  this.desc = "invisible spawner";
  this.invisible = 1;
  
  this.stocked = 1;
}
NightshadeSpawnerTile.prototype = new FeatureObject();

NightshadeSpawnerTile.prototype.activate = function() {
  if (gamestate.getMode() !== "loadgame") {
    DebugWrite("gameobj", "Activating Nightshade spawner.");

    this.addToSearchYield("Nightshade");
    let nexttick = GetGameClockByClockTime("0:00");

    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,nexttick);
  }
}

NightshadeSpawnerTile.prototype.myTurn = function() {
  if (!this.searchYield.length) {
    DebugWrite("gameobj", "Nightshade spawner regrowing Nightshade.");
    this.addToSearchYield("Nightshade");
    let nexttick = GetGameClockByClockTime("0:00");
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,nexttick);
  }

  return 1;
}

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
  let spindex = Math.floor(Math.random() * this.getSpawngroup().length);
  let spawns= this.getSpawngroup();
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
    DebugWrite("gameobj", "<span style='font-weight:bold'>Spawner " + this.getName() + " activating at " + DUTime.getGameClock().toFixed(5) + ".</span><br />");

    let NPCevent = new GameEvent(this);
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
    for (let i=this.level+1; i<=PC.getLevel(); i++) {
      if (this.evolve[i]) {
        this.level = i;
        DebugWrite("gameobj", "Spawner at " + this.x + ", " + this.y + " has evolved.<br />");
        while (this.evolve[i][0]) {
          let idx = this.evolve[i].shift();
          let val = this.evolve[i].shift();
          this[idx] = val;
        }
      }
    }
  }
  
  let timetonext = (this.getSpawnFreq() + (Math.random()*((this.getSpawnFreq()/2)+1)));
  if ((this.spawned.getAll().length < this.getMaxSpawns()) && ((this.getHomeMap() != PC.getHomeMap()) || (GetDistance(PC.getx(), PC.gety(), this.getx(), this.gety()) > 10))) {
      // let's do some spawning
      let spawntype = this.pickSpawn();
      let newspawn = localFactory.createTile(spawntype);
      let diffx = Math.floor(Math.random() * this.getSpawnRadius() * 2) - this.getSpawnRadius();
      let diffy = Math.floor(Math.random() * this.getSpawnRadius() * 2) - this.getSpawnRadius();
      let mymap = this.getHomeMap();
      if (this.altPoI) {
        newspawn.altPoI = this.altPoI;
        DebugWrite("gameobj","About to spawn, adding an altPoI.<br />");
      }
      
      let tile = mymap.getTile(this.getx() + diffx, this.gety() + diffy);
      let resp = tile.canMoveHere(newspawn.getMovetype());
      if (resp["canmove"]) {
        mymap.placeThing(this.getx() + diffx, this.gety() + diffy, newspawn);
        this.addSpawned(newspawn);
        newspawn.setSpawnedBy(this);
        DebugWrite("gameobj", "Spawner #" + this.getSerial() + " at " + this.x + ", " + this.y + " has spawned a " + newspawn.getName() + " #" + newspawn.getSerial() + "<br />");
      } else {
        timetonext = 5;
      }      
  }
 
  let NPCevent = new GameEvent(this);
  DUTime.addAtTimeInterval(NPCevent,timetonext);
  
  return 1;
}

function PentagramNWTile() {
  //Graphics Upgraded
  this.name = "PentagramNW";
  this.graphic = "pentagram.gif";
	this.spritexoffset = 0;
	this.spriteyoffset = 0;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramNWTile.prototype = new FeatureObject();

function PentagramNTile() {
  //Graphics Upgraded
  this.name = "PentagramN";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -32;
	this.spriteyoffset = 0;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramNTile.prototype = new FeatureObject();

function PentagramNETile() {
  //Graphics Upgraded
  this.name = "PentagramNE";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -64;
	this.spriteyoffset = 0;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramNETile.prototype = new FeatureObject();

function PentagramWTile() {
  //Graphics Upgraded
  this.name = "PentagramW";
  this.graphic = "pentagram.gif";
	this.spritexoffset = 0;
	this.spriteyoffset = -32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramWTile.prototype = new FeatureObject();

function PentagramCTile() {
  //Graphics Upgraded
  this.name = "PentagramC";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -32;
	this.spriteyoffset = -32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramCTile.prototype = new FeatureObject();

function PentagramETile() {
  //Graphics Upgraded
  this.name = "PentagramE";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -64;
	this.spriteyoffset = -32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramETile.prototype = new FeatureObject();

function PentagramSWTile() {
  //Graphics Upgraded
  this.name = "PentagramSW";
  this.graphic = "pentagram.gif";
	this.spritexoffset = 0;
	this.spriteyoffset = -64;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramSWTile.prototype = new FeatureObject();

function PentagramSTile() {
  //Graphics Upgraded
  this.name = "PentagramS";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -32;
	this.spriteyoffset = -64;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramSTile.prototype = new FeatureObject();

function PentagramSETile() {
  //Graphics Upgraded
  this.name = "PentagramSE";
  this.graphic = "pentagram.gif";
	this.spritexoffset = -64;
	this.spriteyoffset = -64;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pentagram";
}
PentagramSETile.prototype = new FeatureObject();

function WeaponCounterDaggerTile() {
  this.name = "WeaponCounterDagger";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-576";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-576";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-576";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-544";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-544";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-544";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
ArmorCounterPlateTile.prototype = new FeatureObject();

function DisplayCounterNTile() {
  //Graphics Upgraded
  this.name = "DisplayCounterN";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -93*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
DisplayCounterNTile.prototype = new FeatureObject();

function DisplayCounterSTile() {
  //Graphics Upgraded
  this.name = "DisplayCounterS";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -94*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
DisplayCounterSTile.prototype = new FeatureObject();

function DisplayCounterCTile() {
  //Graphics Upgraded
  this.name = "DisplayCounterC";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -93*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
DisplayCounterCTile.prototype = new FeatureObject();

function MerchantCounterClothTile() {
  //Graphics Upgraded
  this.name = "MerchantCounterCloth";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterClothTile.prototype = new FeatureObject();

function MerchantCounterScaleTile() {
  //Graphics Upgraded
  this.name = "MerchantCounterScale";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterScaleTile.prototype = new FeatureObject();

function MerchantCounterBillTile() {
  //Graphics Upgraded
  this.name = "MerchantCounterBill";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterBillTile.prototype = new FeatureObject();

function MerchantCounterBookTile() {
  //Graphics Upgraded
  this.name = "MerchantCounterBook";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterBookTile.prototype = new FeatureObject();

function MerchantCounterEdgeTile() {
  //Graphics Upgraded
  this.name = "MerchantCounterEdge";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -93*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterEdgeTile.prototype = new FeatureObject();

function MerchantCounterTile() {
  //Graphics Upgraded
  this.name = "MerchantCounter";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -93*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = .3;
  this.prefix = "a";
  this.desc = "display counter";
  this.peerview = "black";
}
MerchantCounterTile.prototype = new FeatureObject();

function ArmorRackLeatherTile() {
  //Graphics Upgraded
  this.name = "ArmorRackLeather";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = 0;
  this.prefix = "a";
  this.desc = "display suit of leather armor";
  this.peerview = "black";
}
ArmorRackLeatherTile.prototype = new FeatureObject();

function ArmorRackChainTile() {
  //Graphics Upgraded
  this.name = "ArmorRackChain";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = 0;
  this.prefix = "a";
  this.desc = "display suit of chain mail";
  this.peerview = "black";
}
ArmorRackChainTile.prototype = new FeatureObject();

function ArmorRackPlateTile() {
  //Graphics Upgraded
  this.name = "ArmorRackPlate";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -95*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = 0;
  this.prefix = "a";
  this.desc = "display suit of plate armor";
  this.peerview = "black";
}
ArmorRackPlateTile.prototype = new FeatureObject();

function ShieldDisplayTile() {
  this.name = "ShieldDisplay";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -37*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.blockloe = 0;
  this.prefix = "a";
  this.desc = "shield on a rack";
  this.peerview = "black";
}
ShieldDisplayTile.prototype = new FeatureObject();

function SkeletonDecorationTile() {
  this.name = "SkeletonDecoration";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -90*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "skeleton";
}
SkeletonDecorationTile.prototype = new FeatureObject();

function MoatLeverOffTile() {
  this.name = "MoatLeverOff";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-608";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
MoatLeverOffTile.prototype = new FeatureObject();

function LeverOffTile() {
  this.name = "LeverOff";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-608";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
LeverOffTile.prototype = new FeatureObject();

function BDCLeverTile() {
  this.name = "BDCLever";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-608";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-608";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
GrottoLeverOffTile.prototype = new FeatureObject();

GrottoLeverOffTile.prototype.use = function(who) {
  let retval = {};
  retval["txt"] = "There is a deafening sound of rushing water! The water levels recede.";
  this.spritexoffset = "-256";
  let frommap = this.getHomeMap();
  let tomap = maps.getMap("grotto2");
  DUPlaySound("sfx_large_lever");
  
  let feas = frommap.features.getAll();
  for (let i=0;i<feas.length;i++) {
    if (feas[i].getName() !== "EnergyField") {
      MoveBetweenMaps(feas[i],frommap,tomap,feas[i].getx(),feas[i].gety());
    }
  };
  let npcs = frommap.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    MoveBetweenMaps(npcs[i],frommap,tomap,npcs[i].getx(),npcs[i].gety());
  };
  MoveBetweenMaps(PC,frommap,tomap,PC.getx(),PC.gety());
  
  DrawMainFrame("draw", tomap, PC.getx(), PC.gety());
  return retval;
}

function GrottoBridgeLever1Tile() {
  this.name = "GrottoBridgeLever1";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-608";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "switch";

  this.setting = 0;
}
GrottoBridgeLever1Tile.prototype = new FeatureObject();

GrottoBridgeLever1Tile.prototype.use = function(who) {
  let mymap = this.getHomeMap();
  GrottoBridgePuzzle(mymap,102,31);
  GrottoBridgePuzzle(mymap,102,32);
  if (this.spritexoffset === "-224") { this.spritexoffset = "-256";}
  else { this.spritexoffset = "-192";}
  DUPlaySound("sfx_small_lever");
  return { fin: 1, txt: "Lever thrown."};
}

function GrottoBridgeLever2Tile() {
  this.name = "GrottoBridgeLever2";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-608";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "switch";

  this.setting = 0;
}
GrottoBridgeLever2Tile.prototype = new FeatureObject();

GrottoBridgeLever2Tile.prototype.use = function(who) {
  let mymap = this.getHomeMap();
  GrottoBridgePuzzle(mymap,102,33);
  GrottoBridgePuzzle(mymap,102,32);
  if (this.spritexoffset === "-224") { this.spritexoffset = "-256";}
  else { this.spritexoffset = "-192";}
  DUPlaySound("sfx_small_lever");
  return { fin: 1, txt: "Lever thrown."};
}

function GrottoBridgeLever3Tile() {
  this.name = "GrottoBridgeLever3";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-608";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "switch";

  this.setting = 0;
}
GrottoBridgeLever3Tile.prototype = new FeatureObject();

GrottoBridgeLever3Tile.prototype.use = function(who) {
  let mymap = this.getHomeMap();
  GrottoBridgePuzzle(mymap,102,34);
  GrottoBridgePuzzle(mymap,102,32);
  if (this.spritexoffset === "-224") { this.spritexoffset = "-256";}
  else { this.spritexoffset = "-192";}
  DUPlaySound("sfx_small_lever");
  return { fin: 1, txt: "Lever thrown."};
}

function GrottoBridgePuzzle(mymap,locx,locy) {
  let bridge;
  let fea = mymap.getTile(locx,locy).getFeatures();
  for (let i=0;i<fea.length;i++) {
    if (fea[i].getName() === "BridgeNS") { bridge = fea[i];}
  }
  if (bridge) {
    for (let i=0;i<fea.length;i++) {
      if (fea[i].getName() === "BridgeNS") { mymap.deleteThing(fea[i]);}
      else {
        // falls in!
        maintext.delayedAddText("The " + fea[i].getDesc() + " falls into the chasm!");
        mymap.deleteThing(fea[1]);
      }
    }
    if ((PC.getx() === locx) && (PC.gety() === locy)) {
      maintext.delayedAddText("The bridge disappears from beneath your feet! You fall.");
      let undermap = maps.getMap("undergrotto");
      MoveBetweenMaps(PC,mymap,undermap,25,7);
      DrawMainFrame("draw",undermap,PC.getx(),PC.gety());
    } else {
      DrawMainFrame("one",mymap,locx,locy);
    }
  } else {
    bridge = localFactory.createTile("BridgeNS");
    mymap.placeThing(locx,locy,bridge);
    DrawMainFrame("one",mymap,locx,locy);
  }
}

function MetalTwisterLeverTile() {
  this.name = "MetalTwisterLever";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-608";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
MetalTwisterLeverTile.prototype = new FeatureObject();
  
MetalTwisterLeverTile.prototype.use = function(user) {
  let level3 = maps.getMap("metaltwister3");
  let level2 = maps.getMap("metaltwister2");
  let retval = {};
  DUPlaySound("sfx_small_lever");
  if (!level2) {  // somehow level 2 is not in memory. Load it.
    let otherlevel = new GameMap();
    otherlevel = maps.addMap("metaltwister2");
    level2 = otherlevel;
  }
  if (this.spritexoffset === "-224") {  // This switch hasn't been thrown
    this.spritexoffset = "-256";
    retval["txt"] = "Click!";
    
    let checkboth = 1;
    let floor3features = level3.features.getAll();
    let ports = [];
    for (let i=0; i<floor3features.length; i++) {
      if (floor3features[i].getName() == "LeverOff") {
        if (floor3features[i].spritexoffset === "-224") {
          checkboth = 0;
        }
      }
      if (floor3features[i].getName() == "StonePortcullis") {
        ports[ports.length] = floor3features[i];
      }
    }
    if (checkboth) {  // if both switches are thrown, open the dungeon's doors
      for (let i=0; i<ports.length; i++) {
        ports[i].unlockMe();
        ports[i].use(user);
      }
      let floor2features = level2.features.getAll();
      for (let i=0; i<floor2features.length; i++) {
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-608";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
PitDespairLeverTile.prototype = new FeatureObject();

PitDespairLeverTile.prototype.use = function(user) {
  let retval = {};
  if (this.attached) {
    if (PC.getHomeMap() === this.getHomeMap()) {
      DUPlaySound("sfx_small_lever");
    }
    let thismap = this.getHomeMap();
    let doortile = thismap.getTile(this.attached.x, this.attached.y);
    let ftrs = doortile.getFeatures();
    let door;
    for (let i=0;i<ftrs.length;i++) {
      if (ftrs[i].getName() === "WallPortcullis") { door = ftrs[i]; }
    };
    if (this.spritexoffset === "-224") {
      door.locked = 0;
      door.setGraphicArray(["master_spritesheet.png", "", "-256", "-832"]);
			
			door.closedLOS = door.getBlocksLOSArray();
			let seethru = [];
			seethru[0] = 0;
			door.setBlocksLOSArray(seethru);
			
			door.addPassable(MOVE_WALK);
			door.open = 1;
			
			this.spritexoffset = "-256";
    } else {
      let mobs = doortile.getNPCs();
      let diffx = 0;
      let diffy = 0;
      if (this.gety() === 36) {
        diffy = -1;
      } else if ((this.getx() === 11) || (this.getx() === 25)) {
        diffx = 1;
      } else {
        diffx = -1;
      }
      for (let i=0;i<mobs.length;i++) {
        thismap.moveThing(mobs[i].getx() + diffx , mobs[i].gety() + diffy, mobs[i]);
        mobs[i].dealDamage(1000, door);
      };
      door.locked = 1;
      door.setGraphicArray(["master_spritesheet.png", "", "-224", "-832"]);
      
      door.setBlocksLOSArray(door.closedLOS);
      door.closedLOS = [];
			
      door.removePassable(MOVE_WALK);
      door.open = 0;
      
      this.spritexoffset = "-224";
    }
    retval["fin"] = 1;
    retval["txt"] = "Switch thrown.";
  } else {
    alert("Lever unattached!");
    retval["fin"] = 0;
  }
  
  return retval;
}

function ToshinLeverOffTile() {
  this.name = "ToshinLeverOff";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-608";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
ToshinLeverOffTile.prototype = new FeatureObject();

ToshinLeverOffTile.prototype.use = function(who) {
  let otherlever;
  if (this.getx() === 17) { 
    let levers = this.getHomeMap().getTile(6,13).getFeatures(); 
    for (let i=0;i<levers.length;i++) {
      if (levers[i].getName() === "ToshinLeverOff") { otherlever = levers[i]; break; }
    }
  } else {
    let levers = this.getHomeMap().getTile(17,21).getFeatures(); 
    for (let i=0;i<levers.length;i++) {
      if (levers[i].getName() === "ToshinLeverOff") { otherlever = levers[i]; break; }
    }
  }
  let doors = this.getHomeMap().getTile(25,13).getFeatures();
  let door;
  for (let i=0;i<doors.length;i++) {
    if (doors[i].getName().indexOf("Door") !== -1) {
      door = doors[i];
    }
  }
  if (this.spritexoffset === "-160") {
    this.spritexoffset = "-192";
    otherlever.spritexoffset = "-192";
    door.unlockMe();
  } else {
    this.spritexoffset = "-160";
    otherlever.spritexoffset = "-160";
    door.lockMe(2);
  }
  DUPlaySound("sfx_small_lever");
  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "Switch thrown.";
  return retval;
}

function RoyalPuzzleLaserEWTile() {
  this.name = "RoyalPuzzleLaserEW";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-448";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "shimmering beam";
  
  LightEmitting.call(this, 1);
}
RoyalPuzzleLaserEWTile.prototype = new FeatureObject();

RoyalPuzzleLaserEWTile.prototype.walkon = function(who) {
  let resp = InALaser(who);
  return resp;
}

function RoyalPuzzleLaserNSTile() {
  this.name = "RoyalPuzzleLaserNS";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-448";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "shimmering beam";
  
  LightEmitting.call(this, 1);
}
RoyalPuzzleLaserNSTile.prototype = new FeatureObject();

RoyalPuzzleLaserNSTile.prototype.walkon = function(who) {
  let resp = InALaser(who);
  return resp;
}

function RoyalPuzzleLaserCrossTile() {
  this.name = "RoyalPuzzleLaserCross";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-448";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "shimmering beam";
  
  LightEmitting.call(this, 1);
}
RoyalPuzzleLaserCrossTile.prototype = new FeatureObject();

RoyalPuzzleLaserCrossTile.prototype.walkon = function(who) {
  let resp = InALaser(who);
  return resp;
}

function InALaser(who) {
  let themap = who.getHomeMap();
  themap.moveThing(46,28,who);
  ResetRoyalPuzzle(themap);
  DUPlaySound("sfx_small_zap");
  DrawMainFrame("draw",themap,PC.getx(),PC.gety());
  let response = {overridedraw:1,msg:"ZAP! The room resets."};
  return response;
}

function ResetRoyalPuzzle(where) {  
  let walls = [{x:48,y:29}, {x:49, y:35}, {x:48, y:31}, {x:46, y:29}, {x:47, y:28}, {x: 49, y:28}];
  
  let allfeatures = where.features.getAll();
  for (let i=0;i<allfeatures.length;i++) {
    if (allfeatures[i].getName() === "SandstoneWall") {
      let gowhere = walls.shift();
      where.moveThing(gowhere.x, gowhere.y, allfeatures[i]);
    }
  }
  
  CheckLasers(where);
}

function SandstoneWallTile() {
  this.name = "SandstoneWall";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-416";
  this.blocklos = 0;
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a"
  this.desc = "sandstone wall";
  this.peerview = "#b0b0b0";

  this.pushable = 1;
  
  LightEmitting.call(this, 3);
}
SandstoneWallTile.prototype = new FeatureObject();

SandstoneWallTile.prototype.use = function(who) {
  let themap = who.getHomeMap();
  let diffx = this.getx() - who.getx();
  let diffy = this.gety() - who.gety();
  let retval = {};
  if ((Math.abs(diffx) > 1) || (Math.abs(diffy) > 1)) {
    retval["txt"] = "The wall shakes in place but does not move.";
    return retval;
  }
  let desttile = themap.getTile(this.getx()+diffx, this.gety()+diffy);
  let ontile = desttile.canMoveHere(MOVE_WALK,0);
  if (!ontile) {
    retval["txt"] = "Something is in the way.";
    return retval;
  }
  themap.moveThing(this.getx()+diffx, this.gety()+diffy, this);
  retval["txt"] = "The wall segment slides across the floor.";
  DUPlaySound("sfx_stone_drag");
  
  CheckLasers(themap);
  return retval;
}

SandstoneWallTile.prototype.pushMe = function(who) {
  let retval = this.use(who);
  retval["fin"] = 1;
  return retval;
}

// Sadly, currently not used.
function BlackDragonLadderWallTile() {
  //Graphics Upgraded
  this.name = "BlackDragonLadderWall";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -15*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 2;
  this.prefix = "a";
  this.desc = "wall";
  this.peerview = "white";
}
BlackDragonLadderWallTile.prototype = new FeatureObject();

BlackDragonLadderWallTile.prototype.pushMe = function(who) {
  return this.use(who);
}

BlackDragonLadderWallTile.prototype.use = function(who) {
  let retval = {fin: 1};
  DUPlaySound("sfx_stone_drag");
  if (this.rotated) {
    let tile = this.getHomeMap().getTile(this.getx()+1,this.gety());
    let fealist = tile.getFeatures();
    for (let i=0;i<fealist.length;i++) {
      if (fealist[i].getName() === "LadderUp") {
        this.getHomeMap().deleteThing(fealist[i]);
        retval["txt"] = "The wall rotates again, and the ladder is again hidden.";
        this.rotated = 0;
        return retval;
      }
    }
  } else {
    let ladder = localFactory.createTile("LadderUp");
    let destmap = "blackdragon4";
    if (this.getHomeMap().getName() === "blackdragon_int3") { destmap = "blackdragon_int4"; }
    if (this.getHomeMap().getName() === "blackdragon_act2_3") { destmap = "blackdragon_act2_4"; }
    ladder.setEnterMap(destmap, this.getx()+1, this.gety());
    this.getHomeMap().placeThing(this.getx()+1,this.gety(),ladder);
    retval["txt"] = "The wall rotates in place, revealing a ladder attached to the wall!";
    this.rotated = 1;
    return retval;
  }
}

function WallOfWavesTile() {
  this.name = "WallOfWaves";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-1536";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Waves";
  this.peerview = "white";
}
WallOfWavesTile.prototype = new FeatureObject();

WallOfWavesTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "waves", this);
  return retval;
}

WallOfWavesTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "waves", this);
  return retval;
}

function RuneOfWavesTile() {
  this.name = "RuneOfWaves";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-1568";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Waves";
  this.peerview = "white";
}
RuneOfWavesTile.prototype = new FeatureObject();

RuneOfWavesTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "waves", this);
  return retval;
}

RuneOfWavesTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "waves", this);
  return retval;
}


function WallOfWindsTile() {
  this.name = "WallOfWinds";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-1536";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Winds";
  this.peerview = "white";
}
WallOfWindsTile.prototype = new FeatureObject();

WallOfWindsTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "winds", this);
  return retval;
}

WallOfWindsTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "winds", this);
  return retval;
}

function RuneOfWindsTile() {
  this.name = "RuneOfWinds";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-1568";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Winds";
  this.peerview = "white";
}
RuneOfWindsTile.prototype = new FeatureObject();

RuneOfWindsTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "winds", this);
  return retval;
}

RuneOfWindsTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "winds", this);
  return retval;
}


function WallOfKingsTile() {
  this.name = "WallOfKings";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-1536";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Kings";
  this.peerview = "white";
}
WallOfKingsTile.prototype = new FeatureObject();

WallOfKingsTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "kings", this);
  return retval;
}

WallOfKingsTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "kings", this);
  return retval;
}

function RuneOfKingsTile() {
  this.name = "RuneOfKings";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-1568";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Kings";
  this.peerview = "white";
}
RuneOfKingsTile.prototype = new FeatureObject();

RuneOfKingsTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "kings", this);
  return retval;
}

RuneOfKingsTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "kings", this);
  return retval;
}

function WallOfFlamesTile() {
  this.name = "WallOfFlames";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-1536";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Flames";
  this.peerview = "white";
}
WallOfFlamesTile.prototype = new FeatureObject();

WallOfFlamesTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "flames", this);
  return retval;
}

WallOfFlamesTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "flames", this);
  return retval;
}

function RuneOfFlamesTile() {
  this.name = "RuneOfFlames";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-1568";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Flames";
  this.peerview = "white";
}
RuneOfFlamesTile.prototype = new FeatureObject();

RuneOfFlamesTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "flames", this);
  return retval;
}

RuneOfFlamesTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "flames", this);
  return retval;
}


function WallOfVoidTile() {
  this.name = "WallOfVoid";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-1536";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Void";
  this.peerview = "white";
}
WallOfVoidTile.prototype = new FeatureObject();

WallOfVoidTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "void", this);
  return retval;
}

WallOfVoidTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "void", this);
  return retval;
}

function RuneOfVoidTile() {
  this.name = "RuneOfVoid";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-1568";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "rune of Void";
  this.peerview = "white";
}
RuneOfVoidTile.prototype = new FeatureObject();

RuneOfVoidTile.prototype.use = function(user) {
  let retval = {fin:1};
  if ((Math.abs(user.getx() - this.getx()) > 1) && (Math.abs(user.gety() - this.gety()) > 1)) { 
    retval["txt"] = "The rune glows for a moment, and then fades.";
    return retval;
  }
  ApplyRune(user, "void", this);
  return retval;
}

RuneOfVoidTile.prototype.bumpInto = function(who) {
  let retval = {fin:1};
  ApplyRune(user, "void", this);
  return retval;
}

function PlatformOfWavesTile() {
  this.name = "PlatformOfWaves";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-1600";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfWavesTile.prototype = new FeatureObject();

function PlatformOfWindsTile() {
  this.name = "PlatformOfWinds";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-1600";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfWindsTile.prototype = new FeatureObject();

PlatformOfWindsTile.prototype.walkon = function(who) {
  if (this.getHomeMap().getName() === "skypalace") {  // WHOOSH
    gamestate.setMode("null");

    let windlist = this.windlist;
    setTimeout( function() { whoosh(who, windlist, this.spawnat, this.spawnwhat); }, 100);
  
    delete this.spawnwhat;  
    DUPlaySound("sfx_whoosh");
    let response = {msg: "WHOOSH!" };
    return response;
  }
}

function whoosh(whozat, windlist, spawnwhere, spawnthing) {

  let tox = windlist[0];
  let toy = windlist[1];
  
  let windmap = whozat.getHomeMap();
  windmap.moveThing(tox,toy,whozat);
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());  
  
  if (windlist[2]) {
    setTimeout( function() { whoosh(whozat, windlist.slice(2), spawnwhere, spawnthing); }, 100);
  } else {
    if (spawnthing) {
      let spawnedmonster = localFactory.createTile(spawnthing);
      windmap.placeThing(spawnwhere[0], spawnwhere[1], spawnedmonster);
      // add an "appears" visual effect? WORKING
    }
    
    
    whozat.endTurn(0);
  }
}

function PlatformOfKingsTile() {
  this.name = "PlatformOfKings";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-1600";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfKingsTile.prototype = new FeatureObject();

function PlatformOfFlamesTile() {
  this.name = "PlatformOfFlames";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-1600";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfFlamesTile.prototype = new FeatureObject();

function PlatformOfVoidTile() {
  this.name = "PlatformOfVoid";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-1600";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "platform";
}
PlatformOfVoidTile.prototype = new FeatureObject();

function MarkOfKingsTile() {
  this.name = "MarkOfKings";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-1568";
  this.blocklos = 2;
  this.prefix = "the";
  this.desc = "Rune of Kings";
}
MarkOfKingsTile.prototype = new FeatureObject();
  
MarkOfKingsTile.prototype.use = function(user) {
  let retval = {};
  if (user.getRuneCooldown("kings") > DUTime.getGameClock()) {
    retval["fin"] = 1;
    retval["txt"] = "You are too tired to invoke this rune!"
    return retval;
  }
  // check if on surface, if so check location
  // if underground/in town, heal
  let themap = user.getHomeMap();
  if (!themap.getScale()) {
    if (themap.getName() === "darkunknown") {
      if (((user.getx() === 27) && (user.gety() === 28)) || ((user.getx() === 26) && (user.gety() === 29)) || ((user.getx() === 28) && (user.gety() === 29)) || ((user.getx() >= 25) && (user.getx() <= 28) && (user.gety() === 30)) || ((user.getx() >=25) && (user.getx() <= 27) && (user.gety() === 31))) {
        // open entrance to grotto
        Earthquake();
        DUPlaySound("sfx_earthquake");
        let cave = localFactory.createTile("Cave");
        cave.setEnterMap("grotto", 22, 53);
        themap.placeThing(27,30,cave);
        retval["txt"] = "A cave entrance is revealed!";
        return retval;
      } else if ((user.getx() === 100) && (user.gety() === 57)) {
        let tile = themap.getTile(112,67);
        let oldgate = tile.getTopFeature();
        if (oldgate && (oldgate.getName() === "Moongate")) {
          themap.deleteThing(oldgate);
        }
        
        user.getHomeMap().moveThing(111,67,user);
        DrawMainFrame("draw", themap, user.getx(), user.gety());
        // teleport to entrance to air
        setTimeout(function() {
          let moongate = localFactory.createTile("Moongate");
          moongate.destmap = "skypalace";
          moongate.destx = 47;
          moongate.desty = 49;
          themap.placeThing(112,67,moongate);
          AnimateMoongate(moongate,0,"up",300,0,1);
        }, 500);

      } else {
        // no effect
      }
    } else if ((themap.getName() === "volcano") && (GetDistance(user.getx(), user.gety(), 27,21) < 5)) {
      Earthquake();
      let cave = localFactory.createTile("Cave");
      cave.setEnterMap("lavatubes", 0, 0);   // make tubes!
      let nillavatile = themap.getTile(27,21);
      let nillava = nillavatile.getTopFeature();
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-1568";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-1568";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-1568";
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
  this.graphic = "master_spritesheet.png"; // for now, eternal_flame.gif for active fire
  this.spritexoffset = "-128";  // -32 is active fire
  this.spriteyoffset = "-1120";  // -0 for active fire
  this.prefix = "the";
  this.desc = "Flame Eternal";
  this.passable = MOVE_ETHEREAL;
}
FlameEternalTile.prototype = new FeatureObject();

function BrightFountainTile() {
  //Graphics Upgraded
  this.name = "BrightFountain";
  this.graphic = "fountains.gif";
  this.spritexoffset = -64;
  this.spriteyoffset = 0;
  this.prefix = "a";
  this.desc = "fountain";
  this.peerview = "#a0a0a0";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  
  HasAmbientNoise.call(this,"sfx_fountain_splash",1.5);
}
BrightFountainTile.prototype = new FeatureObject();

function BlueFountainTile() {
  //Graphics Upgraded
  this.name = "BlueFountain";
  this.graphic = "fountains.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
  this.prefix = "a";
  this.desc = "fountain";
  this.peerview = "#a0a0a0";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  
  HasAmbientNoise.call(this,"sfx_fountain_splash",1.5);
}
BlueFountainTile.prototype = new FeatureObject();

function FountainTile() {
  //Graphics Upgraded
  this.name = "Fountain";
  this.graphic = "fountains.gif";
  this.spritexoffset = -32;
  this.spriteyoffset = 0;
  this.prefix = "a";
  this.desc = "fountain";
  this.peerview = "#a0a0a0";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
  
  HasAmbientNoise.call(this,"sfx_fountain_splash",2);
}
FountainTile.prototype = new FeatureObject();

function BrokenFountainTile() {
  this.name = "BrokenFountain";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-128";
  this.spriteyoffset = "-832";
  this.prefix = "a";
  this.desc = "broken fountain";
  this.peerview = "#a0a0a0";
  this.passable = MOVE_ETHEREAL + MOVE_FLY;
}
BrokenFountainTile.prototype = new FeatureObject();

function BlueCrystalTile() {
  //Graphics Upgraded
  this.name = "BlueCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#65ceff";
  this.passable = MOVE_ETHEREAL;
}
BlueCrystalTile.prototype = new FeatureObject();

function PurpleCrystalTile() {
  //Graphics Upgraded
  this.name = "PurpleCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -32;
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#9b65ff";
  this.passable = MOVE_ETHEREAL;
}
PurpleCrystalTile.prototype = new FeatureObject();

function YellowCrystalTile() {
  //Graphics Upgraded
  this.name = "YellowCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -4*32;
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#ffc465";
  this.passable = MOVE_ETHEREAL;
}
YellowCrystalTile.prototype = new FeatureObject();

function GreenCrystalTile() {
  //Graphics Upgraded
  this.name = "GreenCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -2*32;
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#9bff65";
  this.passable = MOVE_ETHEREAL;
}
GreenCrystalTile.prototype = new FeatureObject();

function RedCrystalTile() {
  //Graphics Upgraded
  this.name = "RedCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -3*32;
  this.prefix = "a";
  this.desc = "crystal";
  LightEmitting.call(this, 2);
  this.peerview = "#ff658b";
  this.passable = MOVE_ETHEREAL;
}
RedCrystalTile.prototype = new FeatureObject();

function WhiteCrystalTile() {
  //Graphics Upgraded
  this.name = "WhiteCrystal";
  this.graphic = "crystals.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = -5*32;
  this.prefix = "a";
  this.desc = "crystal";
  this.peerview = "#b0cbc4";
  this.passable = MOVE_ETHEREAL;
}
WhiteCrystalTile.prototype = new FeatureObject();

function TeleporterPlatformTile() {
  this.name = "TeleporterPlatform";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-896";
  this.prefix = "a";
  this.desc = "platform";
  this.destination;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
}
TeleporterPlatformTile.prototype = new FeatureObject();

TeleporterPlatformTile.prototype.setDestination = function(destobj) {
  if (destobj.map && destobj.x && destobj.y) {
    this.destination = {};
    this.destination = destobj;
  }
}

TeleporterPlatformTile.prototype.getDestination = function() {
  return this.destination;
}

TeleporterPlatformTile.prototype.walkon = function(who) {
  let response = {msg:""};
  if (this.getDestination()) {
    let themap = who.getHomeMap();
    let dest = this.getDestination();
    if (themap.getName() === dest.map) {
      themap.moveThing(dest.x, dest.y, who);
    } else {
      DU.maps.addMap(dest.map);
      let destmap = DU.maps.getMap(dest.map);
      MoveBetweenMaps(who,themap,destmap,dest.x,dest.y);
    }
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    ShowEffect(who, 500, "spellsparkles-anim.gif", 0, -64);
    if (who === PC) { DUPlaySound("sfx_teleport"); response.overridedraw = 1; }
  }
  return response;
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
  let response = {msg:""};
  if ((who.getLevel() < 4) && (who === PC)) {
    response.msg = "You hear a voice in your head: 'Thou'rt not yet ready for this trial.' Nothing happens.";
  }
  else if (this.getDestination()) {
    let themap = who.getHomeMap();
    let dest = this.getDestination();
    if (themap.getName() === dest.map) {
      themap.moveThing(dest.x, dest.y, who);
    } else {
      DU.maps.addMap(dest.map);
      let destmap = DU.maps.getMap(dest.map);
      MoveBetweenMaps(who,themap,destmap,dest.x,dest.y);
    }
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    ShowEffect(who, 500, "spellsparkles-anim.gif", 0, -64);
    if (who === PC) { DUPlaySound("sfx_teleport_pad"); response.overridedraw = 1; }
  }
  return response;
}

// Toshin
function ToshinPanelTile() {
  //Graphics Upgraded
  this.name = "ToshinPanel";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -77*32;
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
  let retval = {};
  retval["fin"] = 2;
  retval["txt"] = "Use: panel covered with buttons- Press which button?"
  retval["input"] = "Choose (A-E) - ";
  retval["override"] = 1;
  inputText.thing = "toshin";
  inputText.thingref = this;
  
  return retval;
}

function PerformToshinAltar(code) {
  let letter = String.fromCharCode(code);    	
  let retval = {};
  retval["fin"] = 1;
  if ((code => 65) && (code <= 69)) {
    retval["txt"] = "Pressed " + letter + ".";
  } else {
    retval["txt"] = "You look, and cannot find a " + letter + " button. Try A-E.";
  }
  let altar = inputText.thingref;
  let themap = altar.getHomeMap();
  let energyfield = localFactory.createTile("EnergyField");
  let firefield = localFactory.createTile("FireField");
  DUPlaySound("sfx_click");

  if (code === 65) {
    let fieldtile1 = themap.getTile(21,13);
    let fields = fieldtile1.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile2 = themap.getTile(20,17);
    fields = fieldtile2.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    if (altar.val[65]) {
      themap.placeThing(21,13,firefield);
      themap.placeThing(20,17,energyfield);
      altar.val[65] = 0;
    } else {
      themap.placeThing(21,13,energyfield);
      themap.placeThing(20,17,firefield);      
      altar.val[65] = 1;
    }
  } else if (code === 66) {
    let fieldtile1 = themap.getTile(11,7);
    let fields = fieldtile1.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile2 = themap.getTile(18,8);
    fields = fieldtile2.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
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
    let fieldtile1 = themap.getTile(12,17);
    let fields = fieldtile1.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile2 = themap.getTile(12,19);
    fields = fieldtile2.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile3 = themap.getTile(13,18);
    fields = fieldtile3.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    if (altar.val[67]) {
      themap.placeThing(13,18,energyfield);
      themap.placeThing(12,17,firefield);
      let firefield2 = localFactory.createTile("FireField");
      themap.placeThing(12,19,firefield2);
      altar.val[67] = 0;
    } else {
      themap.placeThing(13,18,firefield);
      themap.placeThing(12,17,energyfield);      
      let energyfield2 = localFactory.createTile("EnergyField");
      themap.placeThing(12,19,energyfield2);
      altar.val[67] = 1;
    }
  } else if (code === 68) {
    let fieldtile1 = themap.getTile(12,11);
    let fields = fieldtile1.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile2 = themap.getTile(14,8);
    fields = fieldtile2.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    if (altar.val[68]) {
      themap.placeThing(14,8,energyfield);
      themap.placeThing(12,11,firefield);
      altar.val[68] = 0;
    } else {
      themap.placeThing(14,8,firefield);
      themap.placeThing(12,11,energyfield);      
      altar.val[68] = 1;
    }
  } else if (code === 69) {
    let fieldtile1 = themap.getTile(10,10);
    let fields = fieldtile1.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    let fieldtile2 = themap.getTile(12,15);
    fields = fieldtile2.getFeatures();
    for (let i=0;i<fields.length;i++) {
      if (fields[i].getName().indexOf("Field") > -1) {
        themap.deleteThing(fields[i]);
      }
    };
    if (altar.val[69]) {
      themap.placeThing(10,10,energyfield);
      themap.placeThing(12,15,firefield);
      altar.val[69] = 0;
    } else {
      themap.placeThing(10,10,firefield);
      themap.placeThing(12,15,energyfield);      
      altar.val[69] = 1;
    }
  } else {
    retval["fin"] = 2;
    return retval;
  } 
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
  return retval;
}

function ToshinMoatLeverOffTile() {
  this.name = "ToshinMoatLeverOff";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-608";
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "lever";
}
ToshinMoatLeverOffTile.prototype = new FeatureObject();

ToshinMoatLeverOffTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "Click!";
  let themap = this.getHomeMap();
  let tile = themap.getTile(25,13);
  let door = tile.getTopFeature();
  
  let lever1tile = themap.getTile(6,13);
  let lever1 = lever1tile.getTopFeature();
  let lever2tile = themap.getTile(17,21);
  let lever2 = lever2tile.getTopFeature();
  DUPlaySound("sfx_small_lever");
  
  if (this.spritexoffset === "-160") {
    door.unlockMe();
    lever1.spritexoffset = "-192";
    lever2.spritexoffset = "-192";
  } else {
    door.lockMe(2);
    lever1.spritexoffset = "-160";
    lever2.spritexoffset = "-160";
  }
  DrawMainFrame("draw",themap,PC.getx(), PC.gety());
  
  return retval;
}

// For skypalace
function OrbToggleTile() {
  this.name = "OrbToggle";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -77*32;
  this.prefix = "an";
  this.desc = "orb";
}
OrbToggleTile.prototype = new FeatureObject();

OrbToggleTile.prototype.use = function(who) {
    this.spritexoffset = this.spritexoffset - 32;
    if (this.spritexoffset < -128) { this.spritexoffset = 0; }

    let sp = maps.getMap("skypalace");
    let orb1tile = sp.getTile(33,27);
    let orb1 = orb1tile.getTopFeature();
    let orb2tile = sp.getTile(29,32);
    let orb2 = orb2tile.getTopFeature();
    let orb3tile = sp.getTile(37,32);
    let orb3 = orb3tile.getTopFeature();
    if ((orb1.spritexoffset == '-32') && (orb2.spritexoffset == '-96') && (orb3.spritexoffset == '-64')) {
      let moongate = localFactory.createTile("Moongate");
      moongate.destmap = "skypalace2";
      moongate.destx = 11;
      moongate.desty = 12;
      sp.placeThing(33,31,moongate);
      AnimateMoongate(moongate,0,"up",300,0,1);
    } else {
      let mgtile = sp.getTile(33,31);
      let moongate = mgtile.getTopFeature();
      if (moongate) {
        AnimateMoongate(moongate,0,"down",300,1,0);
        delete moongate.destmap;
      }
    }
  
    let retval = {};
    retval["txt"] = "Done!";
    return retval;
}

// Mt Drash
function DrashOrbToggleTile() {
  this.name = "DrashOrbToggle";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -77*32;
  this.prefix = "an";
  this.desc = "orb";
}
DrashOrbToggleTile.prototype = new FeatureObject();

DrashOrbToggleTile.prototype.use = function(who) {
  let retval = {};
  retval["txt"] = "Done!";

  this.spritexoffset = this.spritexoffset - 32;
    if (this.spritexoffset < -128) { this.spritexoffset = 0; }

    let sp = maps.getMap("mtdrash8");
    let orb1tile = sp.getTile(7,9);
    let orb1 = orb1tile.getTopFeature();
    let orb2tile = sp.getTile(8,8);
    let orb2 = orb2tile.getTopFeature();
    let orb3tile = sp.getTile(9,9);
    let orb3 = orb3tile.getTopFeature();
    if ((orb1.spritexoffset == '-128') && (orb2.spritexoffset == '-128') && (orb3.spritexoffset == '-32')) {
      let pile = sp.getTile(14,12).getFeatures();
      let spinner;
      for (let i=0;i<pile.length;i++) {
        if (pile[i].getName() === "Spinner") {
          spinner = pile[i];
          break;
        }
      }
      if (spinner) {
        retval["txt"] = "Done!<br />You hear a distant SNAP sound.";
        sp.deleteThing(spinner);        
      }
    } 
  
  return retval;
}

function OrbStrengthTile() {
  this.name = "OrbStrength";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -69*32;
  this.prefix = "an";
  this.desc = "orb";
}
OrbStrengthTile.prototype = new FeatureObject();

OrbStrengthTile.prototype.use = function(who) {
  let retval = {fin:1};
  retval["input"] = "&gt;";
  if (DU.gameflags.getFlag(this.getHomeMap().getName() + "_StrOrb")) {
    retval["txt"] = "The orb shutters, and then crumbles to dust.";
    DUPlaySound("sfx_ding");
    this.getHomeMap().deleteThing(this);
    return retval;
  }
  who.setOrbStr(who.getOrbStr()+1);
  if (who === PC) {
    retval["txt"] = "You feel stronger! The orb crumbles to dust.";
  }
  this.getHomeMap().deleteThing(this);
  DU.gameflags.setFlag(this.getHomeMap().getName() + "_StrOrb",1);
  return retval;
}

function OrbDexterityTile() {
  this.name = "OrbDexterity";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -69*32;
  this.prefix = "an";
  this.desc = "orb";
}
OrbDexterityTile.prototype = new FeatureObject();

OrbDexterityTile.prototype.use = function(who) {
  let retval = {fin:1};
  retval["input"] = "&gt;";
  if (DU.gameflags.getFlag(this.getHomeMap().getName() + "_DexOrb")) {
    retval["txt"] = "The orb shutters, and then crumbles to dust.";
    this.getHomeMap().deleteThing(this);
    DUPlaySound("sfx_ding");
    return retval;
  }
  who.setOrbDex(who.getOrbDex()+1);
  DU.gameflags.setFlag(this.getHomeMap().getName() + "_DexOrb",1);
  if (who === PC) {
    retval["txt"] = "You feel more agile! The orb crumbles to dust.";
  }
  this.getHomeMap().deleteThing(this);

  return retval;
}

function OrbIntelligenceTile() {
  this.name = "OrbIntelligence";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -69*32;
  this.prefix = "an";
  this.desc = "orb";
}
OrbIntelligenceTile.prototype = new FeatureObject();

OrbIntelligenceTile.prototype.use = function(who) {
  let retval = {fin:1};
  retval["input"] = "&gt;";
  if (DU.gameflags.getFlag(this.getHomeMap().getName() + "_IntOrb")) {
    retval["txt"] = "The orb shutters, and then crumbles to dust.";
    this.getHomeMap().deleteThing(this);
    DUPlaySound("sfx_ding");
    return retval;
  }
  who.setOrbInt(who.getOrbInt()+1);
  DU.gameflags.setFlag(this.getHomeMap().getName() + "_IntOrb",1);
  if (who === PC) {
    retval["txt"] = "You feel smarter! The orb crumbles to dust.";
  }
  this.getHomeMap().deleteThing(this);
  return retval;
}

function OrbExperienceTile() {
  this.name = "OrbExperience";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -69*32;
  this.prefix = "an";
  this.desc = "orb";
}
OrbExperienceTile.prototype = new FeatureObject();

OrbExperienceTile.prototype.use = function(who) {
  let retval = {fin:1};
  retval["input"] = "&gt;";
  if (DU.gameflags.getFlag(this.getHomeMap().getName() + "_ExpOrb")) {
    retval["txt"] = "The orb shutters, and then crumbles to dust.";
    this.getHomeMap().deleteThing(this);
    DUPlaySound("sfx_ding");
    return retval;
  }
  who.addxp(100);
  if (who === PC) {
    DU.gameflags.setFlag(this.getHomeMap().getName() + "_ExpOrb",1);
    retval["txt"] = "You feel more experienced! The orb crumbles to dust.";
  }
  this.getHomeMap().deleteThing(this);
  return retval;
}

function EtherGateTile() {
  this.name = "EtherGate";
  this.graphic = "moongates.gif";
  this.spritexoffset = '-128';
  this.spriteyoffset = '-32';
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "gate";

  HasAmbientNoise.call(this,"sfx_portal_ambient",1.5);
}
EtherGateTile.prototype = new FeatureObject();

EtherGateTile.prototype.walkon = function(who) {
  let response = {msg:""};
  let homemap = who.getHomeMap();
  let desttile = homemap.getTile(this.destx,this.desty);
  let npcs = desttile.getNPCs();
  if (npcs) {
    for (let i=0;i<npcs.length;i++) {
      homemap.moveThing(this.destx-1,this.desty,npcs[i]);
    };
  }
  homemap.moveThing(this.destx,this.desty,who);
  if (who === PC) {
    DrawMainFrame("draw", homemap, PC.getx(), PC.gety());
    return response.overridedraw = 1; 
  }
  return response;
}

function MoongateTile() {
  this.name = "Moongate";
  this.graphic = "moongate.gif";
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "gate";

  HasAmbientNoise.call(this,"sfx_portal_ambient",1.5);
}
MoongateTile.prototype = new FeatureObject();

MoongateTile.prototype.walkon = function(who) {
  let response = {msg:""};
  if (this.destmap && this.destx && this.desty) {
    let newmap = new GameMap();
    if (maps.getMap(this.destmap)) {
      newmap = maps.getMap(this.destmap);
    } else {
      newmap = maps.addMap(this.destmap);
    }
    MoveBetweenMaps(who,who.getHomeMap(),newmap, this.destx, this.desty);
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
    if (who === PC) { return {overridedraw: 1}; }
  } 
  // needs SOUND
  return response;
}

function PetrifiedReaperTile() {
  this.name = "PetrifiedReaper";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-224";
  this.spriteyoffset = "-640";
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "petrified reaper";
}
PetrifiedReaperTile.prototype = new FeatureObject();

PetrifiedReaperTile.prototype.use = function(who) {
  let retval  ={fin:1};

  if (IsAdjacent(who,this)) {
    let loot = localFactory.createTile("ReaperBark");
    PC.addToInventory(loot,1);
    retval["txt"] = "You take some petrified reaper bark.";
  } else {
    retval["txt"] = "Nothing happens.";
  }

  return retval;
}  

function OracleObject() {
  this.name = "OracleObject";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-640";
  this.passable = MOVE_ETHEREAL;
  this.prefix = "the";
  this.desc = "Oracle";
  this.peerview = "white";
}
OracleObject.prototype = new FeatureObject();

function OracleLowerLeftTile() {
  this.name = "OracleLowerLeft";
  this.spritexoffset = "0";
  this.spriteyoffset = "-1600";
}
OracleLowerLeftTile.prototype = new OracleObject();

function OracleLowerRightTile() {
  this.name = "OracleLowerRight";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-1600";
}
OracleLowerRightTile.prototype = new OracleObject();

function OracleMidLeftTile() {
  this.name = "OracleMidLeft";
  this.spritexoffset = "0";
  this.spriteyoffset = "-1568";
}
OracleMidLeftTile.prototype = new OracleObject();

function OracleMidRightTile() {
  this.name = "OracleMidRight";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-1568";
}
OracleMidRightTile.prototype = new OracleObject();

function OracleTopLeftTile() {
  this.name = "OracleTopLeft";
  this.spritexoffset = "0";
  this.spriteyoffset = "-1536";
}
OracleTopLeftTile.prototype = new OracleObject();

function OracleTopRightTile() {
  this.name = "OracleTopRight";
  this.spritexoffset = "-32";
  this.spriteyoffset = "-1536";
}
OracleTopRightTile.prototype = new OracleObject();

function SwordInStoneTile() {
  //Graphics Upgraded
  this.name = "SwordInStone";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "sword driven into a stone";
  this.peerview = "white";
}
SwordInStoneTile.prototype = new FeatureObject();

SwordInStoneTile.prototype.use = function(who) {
  let wherex = this.getx();
  let wherey = this.gety();
  let mymap = this.getHomeMap();
  mymap.deleteThing(this);
  let emptyaltar = localFactory.createTile("StoneWithoutSword");
  mymap.placeThing(wherex,wherey,emptyaltar);
  let magicsword = localFactory.createTile("MagicSword");
  mymap.placeThing(wherex,wherey,magicsword);
  DrawMainFrame("one", mymap, wherex, whereY);
  
  return;
}

function StoneWithoutSwordTile() {
  //Graphics Upgraded
  this.name = "StoneWithoutSword";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -75*32;
  this.passable = MOVE_ETHEREAL;
  this.prefix = "a";
  this.desc = "stone that once cradled a sword";
  this.peerview = "white";
}
StoneWithoutSwordTile.prototype = new FeatureObject();


// Items

function ItemObject() {
	this.addType("Item");
  this.quantity = 1;
  
  this.longdesc = "";
  this.usedesc = "";
	
	Pushable.call(this);
}
ItemObject.prototype = new FeatureObject();

ItemObject.prototype.getQuantity = function() {
	return this.quantity;
}

ItemObject.prototype.setQuantity = function(quant) {
	this.quantity = quant;
}

ItemObject.prototype.getLongDesc = function() {
  return this.longdesc;
}

ItemObject.prototype.getUseDesc = function() {
  return this.usedesc;
}

function AmbroseShieldTile() {
  this.name = "AmbroseShield";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -36*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "shield";
  this.prefix = "the";
  this.longdesc = "This was commissioned by Nyrani and made by Erin of Hildendain. It should be brought to Nyrani.";
  this.addType("Quest");
}
AmbroseShieldTile.prototype = new ItemObject();

function RobertMapTile() {
  //Graphics Upgraded
  this.name = "RobertMap";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "map";
  this.prefix = "a";
  this.longdesc = "A map. You were asked to bring it to Robert in Clear Lake.";
  this.addType("Quest");
}
RobertMapTile.prototype = new ItemObject();

function SmallRockTile() {
  //Graphics Upgraded
  this.name = "SmallRock";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "small rock";
  this.prefix = "a";
  this.longdesc = "A small rock. That's it. You were asked to bring it to Garen in Naurglen.";
  this.addType("Quest");  
}
SmallRockTile.prototype = new ItemObject();

function SiriCloakTile() {
  //Graphics Upgraded
  this.name = "SiriCloak";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -39*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "blue cloak";
  this.longdesc = "A blue cloak, once worn by Siri in her adventures. It should be returned to Garen in Naurglen.";
  this.prefix = "a";

  this.addType("Quest");  
}
SiriCloakTile.prototype = new ItemObject();

function JusticeOrbTile() {
  //Graphics Upgraded
  this.name = "JusticeOrb";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -70*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "crystal orb";
  this.longdesc = "A crystalline orb that was in the debris among the shattered, large crystals where you fought Justice.";
  this.prefix = "a";

  this.addType("Quest");  
}
JusticeOrbTile.prototype = new ItemObject();
  
JusticeOrbTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "Nothing happens here.";

  let themap = who.getHomeMap();
  if ((themap.getName() === "blackdragon3") || (themap.getName() === "blackdragon_int3") || (themap.getName() === "blackdragon_act2_3")) {
    let feas = themap.getTile(25,20).getFeatures();
    let field;
    for (let i=0;i<feas.length;i++) {
      if (feas[i].getName() === "EnergyField") { field = feas[i]; }
    }
    if (field) {
      themap.deleteThing(field);
      retval["txt"] = "The crystal glows fiercely for a moment, and without a sound the barrier in the corner of the room disappears, revealing a previously unseen ladder.";
    }
  }
  return retval;
}

JusticeOrbTile.prototype.onGet = function(who) {
  let newcrystal = localFactory.createTile("NegatorGnomeNPC");
  let gnomemap = maps.getMap("gnomeland");
	if (!gnomemap) {
	  gnomemap = new GameMap();
    gnomemap = maps.addMap("gnomeland");
	}
  gnomemap.placeThing(2,1,newcrystal);
  newcrystal.invisible = 1;
  let cataclysm = localFactory.createTile("JusticeCollapse");
  newcrystal.addSpellEffect(cataclysm);
}

function CrownTile() {
  //Graphics Upgraded
  this.name = "Crown";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -21*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "crown";
  this.longdesc = "Not one of the crowns your parents wear, but one of the crown jewels nonetheless.";
  this.prefix = "a";

  this.addType("Quest");  
}
CrownTile.prototype = new ItemObject();

function CrownJewelTile() {
  this.name = "CrownJewel";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-256";
  this.spriteyoffset = "-1312";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "royal necklace";
  this.longdesc = "This necklace, with heavy gold and a large set stone, is one of the crown jewels.";
  this.prefix = "a";

  this.addType("Quest");  
}
CrownJewelTile.prototype = new ItemObject();

function SceptreTile() {
  //Graphics Upgraded
  this.name = "Sceptre";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -36*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "sceptre";
  this.longdesc = "This sceptre, with a blue stone at the tip, is one of the crown jewels.";
  this.prefix = "a";

  this.addType("Quest");  
}
SceptreTile.prototype = new ItemObject();

function ChaliceTile() {
  //Graphics Upgraded
  this.name = "Chalice";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "chalice";
  this.longdesc = "The Chalice of the Paladins. Isaac seeks its return, in Swainhil.";
  this.prefix = "a";

  this.addType("Quest");  
}
ChaliceTile.prototype = new ItemObject();

function CourierPouchTile() {
  //Graphics Upgraded
  this.name = "CourierPouch";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "pouch full of papers";
  this.prefix = "a";
  this.longdesc = "The pouch of letters and other papers carried by a courier for the rebels. Bring it to Dawne to prove yourself.";
  this.usedesc = "Read the contents of the pouch.";
  this.addType("Quest");
}
CourierPouchTile.prototype = new ItemObject();

CourierPouchTile.prototype.onGet = function(who) {
  let themap = maps.getMap("darkunknown");
  let npcs = themap.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName() === "CourierGroup") {
      themap.deleteThing(npcs[i]);
      DUTime.removeEntityFrom(npcs[i]);
    }
  }
}

CourierPouchTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "You open the pouch and scan through the documents. They appear to be written in some kind of code- hopefully the Loyalists know how to read it.";
  return retval;
}

function CourierLetterTile() {
  this.name = "CourierLetter";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-1184";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Rebel letter";
  this.longdesc = "A letter for your brother, from Aithne of the Rebels.";
  this.usedesc = "Read the letter.";
  this.prefix = "a";
  this.addType("Quest");
}
CourierLetterTile.prototype = new ItemObject();

CourierLetterTile.prototype.use = function(who) {
  let retval = {};
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  retval["txt"] = "The letter appears to be in a simple code. Hopefully Prince Lance knows how to read it.";
  return retval;
}

function TrustedPlansTile() {
  //Graphics Upgraded
  this.name = "TrustedPlans";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "plans for a Trusted pin";
  this.prefix = "the";
  this.longdesc = "Plans that show the design of a pin that will signify that you are one of the Trusted. Colin in Clear Lake can make the pin from these.";  
  this.addType("Quest");
}
TrustedPlansTile.prototype = new ItemObject();

function TrustedPinTile() {
  //Graphics Upgraded
  this.name = "TrustedPin";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Trusted pin";
  this.prefix = "a";
  this.longdesc = "Wearing this pin marks you as one of the Trusted, able to gain access to Prince Lance.";
  this.addType("Quest");
}
TrustedPinTile.prototype = new ItemObject();

function ReaperBarkTile() {
  //Graphics Upgraded
  this.name = "ReaperBark";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "piece of petrified reaper bark";
  this.prefix = "a";
  this.longdesc = "A piece of bark taken off a petrified reaper. Asharden asked you to bring it to him.";
  this.addType("Quest");
}
ReaperBarkTile.prototype = new ItemObject();

function BlackDragonScaleTile() {
  //Graphics Upgraded
  this.name = "BlackDragonScale";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "black dragon scale";
  this.prefix = "a";
  this.longdesc = "A scale from the black dragon that had ensorcelled Lance.";
  this.addType("Quest");
}
BlackDragonScaleTile.prototype = new ItemObject();

function DragonBoneTile() {
  //Graphics Upgraded
  this.name = "DragonBone";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -39*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "dragon fingerbone";
  this.prefix = "a";
  this.longdesc = "The fingerbone of a dragon, usable as a pestle.";
  this.addType("Quest");
}
DragonBoneTile.prototype = new ItemObject();

function VoidstoneSculptureTile() {
  //Graphics Upgraded
  this.name = "VoidstoneSculpture";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -35*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "sculpture made of voidstone";
  this.longdesc = "A simple sculpture of a bird, made of voidstone. It... isn't very good.";
  this.addType("Quest");
}
VoidstoneSculptureTile.prototype = new ItemObject();

function StoneOfConflagrationsTile() {
  this.name = "StoneOfConflagrations";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Stone of Conflagrations";
  this.prefix = "the";
  this.longdesc = "The Stone of Conflagrations. It has an aura of fiery power.";
  this.addType("Quest");
}
StoneOfConflagrationsTile.prototype = new ItemObject();

function BrokenArrowTile() {
  this.name = "BrokenArrow";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-160";
  this.spriteyoffset = "-1728";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "green-fletched arrow";
  this.prefix = "a";
  this.longdesc = "A broken arrow with green fletching. Return to Ladonna when Mended.";
  this.addType("Quest");
  Breakable.call(this,["master_spritesheet.png", "", "-128", "-1728"],0,"");
  this.brokendesc = "broken green-fletched arrow";
  this.repairNeedsInfusion = 1;
}
BrokenArrowTile.prototype = new ItemObject();

BrokenArrowTile.prototype.onRepair = function(who) {
  this.longdesc = "An arrow with green fletching. Now that you've Mended it, return it to Ladonna.";
}

function TreasuryTokenTile() {
  this.name = "TreasuryToken";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-1248";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "treasury token";
  this.prefix = "a";
  this.longdesc = "A token given to you by the King. Bring it to the treasury.";
  this.addType("Quest");
}
TreasuryTokenTile.prototype = new ItemObject();

function FavorChitTile() {
  this.name = "FavorChit";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-192";
  this.spriteyoffset = "-1344";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "favor chit";
  this.prefix = "a";
  this.longdesc = "A chit that marks that Denise, mayor of Beldskae, owes you a favor.";
  this.addType("Quest");
}
FavorChitTile.prototype = new ItemObject();

function VoidstoneTile() {
  //Graphics Upgraded
  this.name = "Voidstone";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "chunk of voidstone";
  this.longdesc = "Voidstone. A rare material with unusual properties.";
  this.addType("Reagent");
}
VoidstoneTile.prototype = new ItemObject();

function SpiderSilkTile() {
  //Graphics Upgraded
  this.name = "SpiderSilk";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "bit of spider silk";
  this.longdesc = "Spider silk. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
SpiderSilkTile.prototype = new ItemObject();

function BlackPearlTile() {
  //Graphics Upgraded
  this.name = "BlackPearl";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.prefix = "a";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "black pearl";
  this.longdesc = "Black pearl. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
BlackPearlTile.prototype = new ItemObject();

function ExecutionersHoodTile() {
  //Graphics Upgraded
  this.name = "ExecutionersHood";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -27*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "an";
  this.desc = "executioner's hood";
  this.longdesc = "A head of an executioner's hood mushroom.";
  this.addType("Reagent");
}
ExecutionersHoodTile.prototype = new ItemObject();

function QuestExecutionersHoodTile() {
  //Graphics Upgraded
  this.name = "QuestExecutionersHood";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -27*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "an";
  this.desc = "executioner's hood";
  this.longdesc = "A head of an executioner's hood mushroom. Jharden is seeking it.";
  this.addType("Quest");
}
QuestExecutionersHoodTile.prototype = new ItemObject();

function NightshadeTile() {
  //Graphics Upgraded
  this.name = "Nightshade";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -27*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "some";
  this.desc = "nightshade";
  this.longdesc = "Deadly nightshade. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
NightshadeTile.prototype = new ItemObject();

function SulfurousAshTile() {
  //Graphics Upgraded
  this.name = "SulfurousAsh";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -28*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "pile of sulfurous ash";
  this.longdesc = "Sulfurous ash, found in a volcano. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
SulfurousAshTile.prototype = new ItemObject();

function MassOfHerbsTile() {
  //Graphics Upgraded
  this.name = "MassOfHerbs";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -28*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.desc = "mass of herbs";
  this.longdesc = "A mass of herbs, sometimes used in alchemy.";
  this.addType("Reagent");
}
MassOfHerbsTile.prototype = new ItemObject();

function MandrakeRootTile() {
  //Graphics Upgraded
  this.name = "MandrakeRoot";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "mandrake root";
  this.longdesc = "A sprig of mandrake root. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
MandrakeRootTile.prototype = new ItemObject();

function LightningWoodTile() {
  //GraphicsUpgraded 
  this.name = "LightningWood";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "twig of lightning wood";
  this.prefix = "a";
  this.longdesc = "The branch of a tree that has been struck by lightning. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
LightningWoodTile.prototype = new ItemObject();

function MistletoeTile() {
  //Graphics Upgraded
  this.name = "Mistletoe";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "mistletoe";
  this.longdesc = "A sprig of mistletoe. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
MistletoeTile.prototype = new ItemObject();

function BloodMossTile() {
  //Graphics Upgraded
  this.name = "BloodMoss";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -26*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "blood moss";
  this.longdesc = "Some blood moss. A useful reagent in certain magical rituals.";
  this.addType("Reagent");
}
BloodMossTile.prototype = new ItemObject();

function BottledEtherTile() {
  //Graphics Upgraded
  this.name = "BottledEther";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -23*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "bottled ether";
  this.longdesc = "Bottled Ether. It glows fantastically.";
  this.addType("Reagent");
}
BottledEtherTile.prototype = new ItemObject();

function PerfectRubyTile() {
  //Graphics Upgraded
	this.name = "PerfectRuby";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "perfect ruby gemstone";
  this.longdesc = "A perfect ruby gemstone. Flawless.";
  this.prefix = "a";
  this.valuable = 1;
}
PerfectRubyTile.prototype = new ItemObject();

function UncutLargeRubyTile() {
  //Graphics Upgraded
	this.name = "UncutLargeRuby";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "rough, fist-sized ruby gemstone";
  this.longdesc = "A beautiful uncut, large ruby gemstone.";
  this.prefix = "a";
  this.valuable = 1;
}
UncutLargeRubyTile.prototype = new ItemObject();

function RubyTile() {
  //Graphics Upgraded
	this.name = "Ruby";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "ruby";
  this.longdesc = "A small ruby gemstone.";
  this.prefix = "a";
  this.valuable = 1;
}
RubyTile.prototype = new ItemObject();

function UncutRubyTile() {
  //Graphics Upgraded
	this.name = "UncutRuby";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "uncut ruby";
  this.longdesc = "A small uncut ruby gemstone.";
  this.prefix = "an";
  this.valuable = 1;
}
UncutRubyTile.prototype = new ItemObject();

function SmallSapphireTile() {
  //Graphics Upgraded
	this.name = "SmallSapphire";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "sapphire";
  this.prefix = "a";
  this.longdesc = "A small sapphire gemstone.";
  this.valuable = 1;
}
SmallSapphireTile.prototype = new ItemObject();

function UncutSapphireTile() {
  //Graphics Upgraded
	this.name = "UncutSapphire";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -24*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "smooth, uncut sapphire";
  this.prefix = "a";
  this.longdesc = "A smooth, uncut sapphire gemstone.";
  this.valuable = 1;
}
UncutSapphireTile.prototype = new ItemObject();

function GemsTile() {
  //Graphics Upgraded
	this.name = "Gems";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "handful of small gemstones";
  this.prefix = "a";
  this.longdesc = "A handful of small gemstones.";
  this.valuable = 1;
}
GemsTile.prototype = new ItemObject();

function UncutGemsTile() {
  //Graphics Upgraded
	this.name = "UncutGems";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "handful of small, uncut gemstones";
  this.prefix = "a";
  this.longdesc = "A handful of small uncut gemstones.";
  this.valuable = 1;
}
UncutGemsTile.prototype = new ItemObject();

function RubyGemoftheSunTile() {
  //Graphics Upgraded
	this.name = "RubyGemoftheSun";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -23*32;
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "ruby gem";
  this.prefix = "the";
  this.longdesc = "Your ruby gem that harnesses the power of the sun.";
  this.usedesc = "Call upon the power of sunlight.";
}
RubyGemoftheSunTile.prototype = new ItemObject();

RubyGemoftheSunTile.prototype.use = function(who) {
  // do something
  // working here
}


function DecorativeArmorTile() {
	this.name = "DecorativeArmor";
	this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -71*32;
	this.desc = "suit of armor";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "a suit of purely decorative armor. It would not actually provide protection.";
}
DecorativeArmorTile.prototype = new ItemObject();

function FluteTile() {
  //Graphics Upgraded
  this.name = "Flute";
	this.graphic = "static.png";
	this.spritexoffset = -6*32;
  this.spriteyoffset = -36*32;
	this.desc = "flute";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A flute.";
}
FluteTile.prototype = new ItemObject();

function DrumTile() {
  //Graphics Upgraded
  this.name = "Drum";
	this.graphic = "static.png";
	this.spritexoffset = -4*32;
  this.spriteyoffset = -36*32;
	this.desc = "drum";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A drum.";
}
DrumTile.prototype = new ItemObject();

function LyreTile() {
  //Graphics Upgraded
  this.name = "Lyre";
	this.graphic = "static.png";
	this.spritexoffset = -5*32;
  this.spriteyoffset = -36*32;
	this.desc = "lyre";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A lyre.";
}
LyreTile.prototype = new ItemObject();

function LuteTile() {
  //Graphics Upgraded
  this.name = "Lute";
	this.graphic = "static.png";
	this.spritexoffset = -7*32;
  this.spriteyoffset = -36*32;
	this.desc = "lute";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A lute.";
}
LuteTile.prototype = new ItemObject();

function HornTile() {
  //Graphics Upgraded
  this.name = "Horn";
	this.graphic = "static.png";
	this.spritexoffset = -8*32;
  this.spriteyoffset = -36*32;
	this.desc = "horn";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A horn.";
}
HornTile.prototype = new ItemObject();

function MortarTile() {
  //Graphics Upgraded
  this.name = "Mortar";
  this.graphic = "static.png";
	this.spritexoffset = 0;
  this.spriteyoffset = -36*32;
	this.desc = "mortar and pestle";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A mortar and pestle. Useful in alchemy.";
}
MortarTile.prototype = new ItemObject();

function AppleTile() {
  this.name = "Apple";
  this.graphic = "static.png";
	this.spritexoffset = 0;
  this.spriteyoffset = -26*32;
	this.desc = "apple";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "an";
  this.longdesc = "An apple. Delicious.";
  this.usedesc = "Eat the apple, or offer it to someone.";
}
AppleTile.prototype = new ItemObject();

AppleTile.prototype.use = function(who) { 
  // working here- needs option to offer it to horses
  let retval = {};
  retval["fin"] = 1;
  if (who === PC) {
    retval["txt"] = "You crunch into the apple. It's delicious!";
  }
  who.setHP(Math.min(who.getMaxHP(), who.getHP()+1));
  return retval;
}

function CrystalMortarTile() {
  //Graphics Upgraded
  this.name = "CrystalMortar";
	this.graphic = "static.png";
	this.spritexoffset = -2*32;
  this.spriteyoffset = -36*32;
	this.desc = "crystal mortar";
	this.blocklos = 0;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.longdesc = "A mortar made of crystal. Strong enough to mix the most powerful of magics.";
}
CrystalMortarTile.prototype = new ItemObject();

function JadeNecklaceTile() {
  //Graphics Upgraded
  this.name = "JadeNecklace";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -35*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "jade necklace";
  this.longdesc = "A pendant bearing a shard of jade, said to bring luck.";
}
JadeNecklaceTile.prototype = new ItemObject();

function GoldLocketTile() {
  //Graphics Upgraded
  this.name = "GoldLocket";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -35*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "gold locket";
  this.longdesc = "A locket. Inside is a portrait of an unfamiliar woman.";
}
GoldLocketTile.prototype = new ItemObject();

GoldLocketTile.prototype.onGet = function(who) {
  if (DU.gameflags.getFlag("knows_severyn")) {
    this.longdesc = "A locket. Inside is a portrait of someone you believe is Severyn, from Swainhil.";
    let retval = {};
    retval["txt"] = "There is a portrait in the locket, and you believe you recognize the subject. It looks like Severyn, from Swainhil..."
    return retval;
  }
}

function StolenJewelryTile() {
  this.name = "StolenJewelry";
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
  this.spriteyoffset = "-160";
  this.spritexoffset = "-1760";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.blocklos = 0;
  this.desc = "stolen jewelry";
  this.longdesc = "A small collection of jewelry, stolen from someone.";
}
StolenJewelryTile.prototype = new ItemObject();

StolenJewelryTile.prototype.onGet = function(who) {
  DU.gameflag.setFlag("stolenjewelry_taken",1);
}

function GoldTile() {
  //Graphics Upgraded
  this.name = "Gold";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -35*32;
  this.desc = "1 gold coin";
  this.quantity = 1;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "";
  this.longdesc = "Gold coins. May be exchanged for goods and services.";
}
GoldTile.prototype = new ItemObject();

GoldTile.prototype.setQuantity = function(quant) {
  let newquant = parseInt(quant);
  if (newquant === quant) {
    this.quantity = quant;
    if (quant === 1) { this.setDesc("1 gold coin"); }
    else { this.setDesc(quant + " gold coins"); }
  } else {
    return 0;
  }
  if ((this.quantity > 0) && (this.quantity < 7)) {
    this.graphic = "static.png";
    this.spritexoffset = -5*32;
    this.spriteyoffset = -35*32;
  }
  else if ((this.quantity > 6) && (this.quantity < 16)) {
    this.graphic = "static.png";
    this.spritexoffset = -6*32;
    this.spriteyoffset = -35*32;
  } else if (this.quantity > 15) {
    this.graphic = "static.png";
    this.spritexoffset = -7*32;
    this.spriteyoffset = -35*32;
  }
  return this.quantity;
}

GoldTile.prototype.onGet = function(who) {
  who.addGold(parseInt(this.getQuantity())); 
  DUPlaySound("sfx_coin");
  this.getHomeMap().deleteThing(this);

  let retval = {};
  retval.noTake = 1;
  retval.txt = "Taken: " + this.getPrefix() + " " + this.getDesc() + ".";
  return retval;
  // this should delete the item entirely
}

function KeyItemObject() {
  this.addType("Key");
}
KeyItemObject.prototype = new ItemObject();

KeyItemObject.prototype.use = function(who) {
  gamestate.setMode("choosedir");
  let retval={};
  retval["override"] = 1;
  retval["fin"] = 4;
  retval["input"] = "&gt; Choose direction-";
  if (who === PC) {
    DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
  }
  targetCursor.command = "uk";
  targetCursor.useditem = this;
  return retval;
}

function KeyUse(who,what,tgt) {
  let retval= {};
  if (!tgt) {
    let locktile = who.getHomeMap().getTile(targetCursor.x,targetCursor.y);
    tgt = locktile.getTopFeature();
  }
  if (!tgt) {
    retval["fin"] = 0;
    retval["txt"] = "Use: " + what.getDesc() + "- Nothing there.";
    retval["input"] = "&gt;";
  } else {
    if (tgt.getLocked && (typeof tgt.getLocked === "function")) {
      if (tgt.keyname === what.getName()) {
        if (tgt.getLocked()) { 
          tgt.unlockMe(); 
          DrawMainFrame("one",tgt.getHomeMap(),tgt.getx(),tgt.gety());
        }
        else { 
          tgt.lockMe(1);
          DrawMainFrame("one",tgt.getHomeMap(),tgt.getx(),tgt.gety());
        }
        retval["fin"] = 1;
        retval["txt"] = "Use " + what.getDesc() + "- Click!";
        retval["input"] = "&gt;";
        DUPlaySound("sfx_open_lock");
      } else {
        retval["fin"] = 0;
        retval["txt"] = "Use " + what.getDesc() + "- Your key doesn't fit the lock.";
        retval["input"] = "&gt;";
        DUPlaySound("sfx_locked_door");
      }
    } else {
      retval["fin"] = 0;
      retval["txt"] = "Use: " + what.getDesc() + "- That is not locked.";
      retval["input"] = "&gt;";
    }
  }
  return retval;
}

function HomeKeyTile() {
  //Graphics Upgraded
  this.name = "HomeKey";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "your housekey";
  this.longdesc = "The key to your manor in West Naurglen.";
  this.usedesc = "Unlocks your front door.";
}
HomeKeyTile.prototype = new KeyItemObject();

function ToshinKeyTile() {
  //Graphics Upgraded
  this.name = "ToshinKey";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "key to Toshin's Tower";
  this.longdesc = "A key found in a fireplace in Toshin's Tower.";
  this.usedesc = "Unlocks doors in Toshin's Tower.";
}
ToshinKeyTile.prototype = new KeyItemObject();

function PitOfDespairKeyTile() {
  //Graphics Upgraded
  this.name = "PitOfDespairKey";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Pit of Despair dungeon key";
  this.prefix = "the";
  this.longdesc = "The key to many doors in the Pit of Despair.";
  this.usedesc = "Unlocks doors in the Pit of Despair.";
}
PitOfDespairKeyTile.prototype = new KeyItemObject();

function InnerPitOfDespairKeyTile() {
  //Graphics Upgraded
  this.name = "InnerPitOfDespairKey";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "buzzing key";
  this.prefix = "a";
  this.longdesc = "A key found in the Pit of Despair.";
  this.usedesc = "Presumably opens a matching door.";
}
InnerPitOfDespairKeyTile.prototype = new KeyItemObject();

function KeyOfSpiritsTile() {   // Not currently used?
  //Graphics Upgraded
  this.name = "KeyOfSpirits";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Spirits";
  this.prefix = "the";
  this.longdesc = "The Key of Spirits.";
  this.usedesc = "Perhaps you'll find a lock it fits...";
}
KeyOfSpiritsTile.prototype = new KeyItemObject();

function RoyalKeyTile() {
  //Graphics Upgraded
  this.name = "RoyalKey";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Royal Key";
  this.prefix = "the";
  this.longdesc = "The Royal Key.";
  this.usedesc = "Opens locked doors in Castle dea'Saryn.";
}
RoyalKeyTile.prototype = new KeyItemObject();  

function BlackDragonKeyTile() {
  //Graphics Upgraded
  this.name = "BlackDragonKey";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -24*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Black Dragon Key";
  this.prefix = "the";
  this.longdesc = "The Black Dragon Key.";
  this.usedesc = "Opens locked doors in Black Dragon Castle.";
}
BlackDragonKeyTile.prototype = new KeyItemObject();  

function KeyOfAshesTile() {
  //Graphics Upgraded
  this.name = "KeyOfAshes";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Ashes";
  this.prefix = "the";
  this.longdesc = "The key of ashes. It feels strangely fragile...";
  this.usedesc = "Unknown.";
}
KeyOfAshesTile.prototype = new KeyItemObject();  

function KeyOfIceTile() {
  //Graphics Upgraded
  this.name = "KeyOfIce";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Ice";
  this.prefix = "the";
  this.longdesc = "The Key of Ice. Cold to the touch, but does not seem to melt.";
  this.usedesc = "Unknown.";
}
KeyOfIceTile.prototype = new KeyItemObject();  

function KeyOfBoneTile() {
  //Graphics Upgraded
  this.name = "KeyOfBone";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Bone";
  this.prefix = "the";
  this.longdesc = "The Key of Bone. Looking at it gives you an uncomfortable feeling.";
  this.usedesc = "Unknown.";
}
KeyOfBoneTile.prototype = new KeyItemObject();  

function KeyOfDustTile() {
  //Graphics Upgraded
  this.name = "KeyOfDust";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of Dust";
  this.prefix = "the";
  this.longdesc = "The Key of Dust. How is it held together...?";
  this.usedesc = "Unknown.";
}
KeyOfDustTile.prototype = new KeyItemObject();  

function KeyOfSunTile() {
  //Graphics Upgraded
  this.name = "KeyOfSun";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Key of the Sun";
  this.prefix = "the";
  this.longdesc = "The Key of the Sun.";
  this.usedesc = "Unknown.";
}
KeyOfSunTile.prototype = new KeyItemObject();  

function StoneOfShadowTile() {
  //Graphics Upgraded
  this.name = "StoneOfShadow";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -25*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Stone of Shadow";
  this.prefix = "the";
  this.longdesc = "The Stone of Shadow.";
  this.usedesc = "If used in the right place, this will allow you entrance to the warded castle.";
}
StoneOfShadowTile.prototype = new KeyItemObject();  

// Books/Journals
function BookItemObject() {
  this.contents = "";
  this.addType("Book");
  this.usedesc = "Read it.";
}
BookItemObject.prototype = new ItemObject();

BookItemObject.prototype.use = function(who) {
  DUPlaySound("sfx_paper");
  let bookcontents = this.contents.split("%%");
  let retval = {};
  if (bookcontents) {
    retval["txt"] = "Use: " + this.getDesc() + "<br /> Reading...<br />" + bookcontents.shift();
    if (bookcontents.length > 0) {
      retval["override"] = 1;
	  	let usedname = this.getDesc();
		  usedname = usedname.replace(/^a /, "");
      
      retval["fin"] = 3;
      targetCursor.booktext = bookcontents;
    } else {
      retval["fin"] = 1;
      DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
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
    if (targetCursor.bookfinish) {
      targetCursor.useditem.bookFinish();
    } 
    retval["fin"] = 1;
    return retval;
  }
}

function SheafOfNotesTile() {
  //Graphics Upgraded (might upgrade again)
  this.name = "SheafOfNotes";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "sheaf of notes";
  this.prefix = "a";
  this.contents = "You read the notes:%%<span class='conv'>'Empowerment is a powerful tool, allowing the permanent enchantment of an object such as a sword or suit of armor.</span>%%<span class='conv'>'The first step in Empowering is choosing a suitable object. It must be able to take on the enchantment- this is rare.</span>%%<span class='conv'>'Then one must prepare the reagents. Your choice of reagents will dictate the nature of the enchantment that you create.</span>%%<span class='conv'>'Prepare them with a mortar and pestle, incant the spell, and pour the mixture over the object to be enchanted. If all is as it should be, the object will be enchanted thereafter.</span>%%<span class='conv'>'I have tested many materials.</span>%%<span class='conv'>'Spider silk is necessary in almost all castings. It helps bind the magic to the object.</span>%%<span class='conv'>'Sulphurous ash is used for light and fire.</span>%%<span class='conv'>'Blood moss permits physical protection.</span>%%<span class='conv'>'Nightshade adds an air of poison or delusion.</span>%%<span class='conv'>'Black pearl projects power from the object.</span>%%<span class='conv'>'Mistletoe will ward away otherworldly evils.</span>%%<span class='conv'>'Lightning wood, from a tree recently struck, will channel the lightnings.</span>%%<span class='conv'>'Finally, additional power may be invoked by adding mandrake root.</span>%%<span class='conv'>'Once together, cast and hope.'</span>";
  this.longdesc = "A sheaf of notes on Empowerment. Transcribed by Arlan from Toshin's original notebooks.";
}
SheafOfNotesTile.prototype = new BookItemObject();

function XoriccoRecipeTile() {
  //Graphics Upgraded (might upgrade again)
  this.name = "XoriccoRecipe";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "recipe";
  this.prefix = "a";
  this.contents = "You read the recipe:%%Insert recipe here.";  // WORKING HERE- Need a recipe
  this.longdesc = "Evidently, this is Sorceress Xoricco's recipe for chili.";
}
XoriccoRecipeTile.prototype = new BookItemObject();

function ClearLakeReportTile() {
  //Graphics Upgraded (might upgrade again)
  this.name = "ClearLakeReport";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "report from Clear Lake";
  this.prefix = "the";
  this.contents = "You glance through the report, but your eyes quickly glaze over.";
  this.longdesc = "The report from the mayor of Clear Lake. To be brought to the Chancellor when you have all three reports.";
}
ClearLakeReportTile.prototype = new BookItemObject();

function BeldskaeReportTile() {
  //Graphics Upgraded (might upgrade again)
  this.name = "BeldskaeReport";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "report from Beldskae";
  this.prefix = "the";
  this.contents = "You glance through the report, but your eyes quickly glaze over.";
  this.longdesc = "The report from the mayor of Beldskae. To be brought to the Chancellor when you have all three reports.";
}
BeldskaeReportTile.prototype = new BookItemObject();

function SwainhilReportTile() {
  //Graphics Upgraded (might upgrade again)
  this.name = "SwainhilReport";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "report from Swainhil";
  this.prefix = "the";
  this.contents = "You glance through the report, but your eyes quickly glaze over.";
  this.longdesc = "The report from the mayor of Swainhil. To be brought to the Chancellor when you have all three reports.";
}
SwainhilReportTile.prototype = new BookItemObject();

function FallOfTargrionTile() {
  //Graphics Upgraded
  this.name = "FallOfTargrion";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Fall of Targrion";
  this.prefix = "The";
  this.contents = `You open to a random page:%%<span class='conv'>Targrion blazed, and fields became deserts and mountains cracked. "You challenge the supremacy of the sun? Do you not see that my fire is unchallenged, my light gives life?"</span>%%<span class='conv'>But Luhgon shook his fire-crested head. "The sun will gaze down in its majesty for all eternity, and I do not dispute the truth of your words. I only dispute your right to say them. Your mantle I will take, and the greatest light of the sky shall be mine to raise and draw down."</span>%%<span class='conv'>And Targrion was uncertain, for the coming of this upstart was foretold; but so, too, was their battle. "It may be destined that I fall," roared Targrion, "but I shall strive to stand athwart of this destiny. Come, and burn!"</span>`;
  this.longdesc = "The Fall of Targrion. A story of old myth. Sought by Olivia.";
}
FallOfTargrionTile.prototype = new BookItemObject();

function BookOfLoreTile() {
  //Graphics Upgraded
  this.name = "BookOfLore";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Book of Lore";
  this.prefix = "the";
  this.contents = "You open to a random page:%%<span class='conv'>Look up. Above you are the stars, embedded in the ether, which is the power of magic.</span>%%<span class='conv'>The ether is shaped by the will of the mage, who shapes it with mana. This is primarily done with the application of spells. But, it is possible to shape the ether directly- the monstrous Gazer, for example, does not cast a spell each morning to float above the earth.</span>%%<span class='conv'>When did we learn magic? Who crafted the first spells? This knowledge is lost, but it is said it began with the fall of a star...</span>";
  this.longdesc = "The Book of Lore. Its simple cover belies its rich contents. Sought by Arlan.";
}
BookOfLoreTile.prototype = new BookItemObject();

function EshkazBookTile() {
  //Graphics Upgraded
  this.name = "EshkazBook";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -38*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Eshkaz's Planar Primer";
  this.prefix = "the";
  this.contents = "You open to the book:%%The words within dance under your sight, and you cannot make sense of their meaning.";
  this.longdesc = "Eshkaz's Planar Primer. Contains his research into planar travel, to be brought to Asharden.";
}
EshkazBookTile.prototype = new BookItemObject();

function TomeOfSightTile() {
  //Graphics Upgraded
  this.name = "TomeOfSight";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Tome of Sight";
  this.prefix = "the";
  this.contents = "You open to a random page:%%<span class='conv'>...for the Eye of Man can be deceived, but the Eye of Magic is Immutable.</span>%%<span class='conv'>Mortals all live in the fog of illusion and unseeing, but the talent of seeing the truth below need not be the sole providence of the gods.</span>%%<span class='conv'>We toil in darkness, but with their fire may we be forged anew...</span>";
  this.longdesc = "The Tome of Sight. The leather cover is decorated with eye motifs.";
}
TomeOfSightTile.prototype = new BookItemObject();

function MapsAndLegendsTile() {
  //Graphics Upgraded
  this.name = "MapsAndLegends";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Maps and Legends";
  this.prefix = "";
  this.contents = "You flip through the pages and find a chapter on magical phenomenon.%%Searching, you find the section you seek:%%<span class='conv'>\"The Brilliant Pool\"</span>%%<span class='conv'>Once, this mythical place was considered the source of all magic.</span>%%<span class='conv'>Now, it is known that magic's power is drawn from the ethereal plane, and it is not known whether the Brilliant Pool ever truly existed, or still exists.</span>%%<span class='conv'>Another story has it that it is a star, misplaced on our plane, its power too great for any mortal to harness directly.</span>%%Seeing nothing more of use, you close the book.";
  this.longdesc = "The book <i>Maps and Legends</i>. Within are described many rumored and legendary phenomenon.";
}
MapsAndLegendsTile.prototype = new BookItemObject();

function ATreatiseOnDragonsTile() {
  //Graphics Upgraded
  this.name = "ATreatiseOnDragons";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -38*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "A Treatise On Dragons";
  this.prefix = "";
  this.contents = "You open the book.%%<span class='conv'>A dragon is a mighty reptile with great magical and physical power. Its destructive power is so great that it is hardly a surprise that it came to be associated with Tethlokel the Destroyer.</span>%%<span class='conv'>The average dragon is roughly 60 feet long, breathes fire hot enough to easily set wooden buildings aflame, and can fly for hours without rest.</span>%%<span class='conv'>They prefer to live in caves in high mountains far from civilization, and so are infrequently seen.</span>%%<span class='conv'>Rarely, a dragon may grow to become an Elder. Elder Dragons are thought to have better than human intelligence and incredible magical power, allowing them to make plans that span decades.</span>%%<span class='conv'>It is fortunate that they are so rare, as they are evil of bent and desire power and conquest.</span>%%The book is long, but you feel like you have gotten the gist. You close the book.";
  this.longdesc = "The book <i>A Treatise on Dragons</i>. A summary of facts known, rumored, and debated about dragons and dragonkind.";
}
ATreatiseOnDragonsTile.prototype = new BookItemObject();

function NatassaJournalTile() {
  //Graphics Upgraded
  this.name = "NatassaJournal";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You search through the journal for something useful.%%<span class='conv'>With the passing of Master Xoricco, I find myself maintaining two homes.</span>%%<span class='conv'>My Spire will continue to be my primary sanctuary, but the Palace of the Skies is too great an achievement to let fall.</span>%%<span class='conv'>There are two ways to get to the Palace. My way is the Way of the Sky- magics taught to me by Xoricco and known by no others.</span>%%<span class='conv'>But there is another way- the Way of Earth. Certain persons who have shown exceptional loyalty, to both the kings and the land, are granted the Rune of Kings.</span>%%<span class='conv'>If you are reading this, Adelus, I believe King Erik will be willing to grant you that honor- you've certainly done enough.</span>%%<span class='conv'>Invoke the Mark of Kings at the crook of the Dragon's elbow, and take the Road of Earth.<span>";
  this.longdesc = "The Journals of Natassa.";
}
NatassaJournalTile.prototype = new BookItemObject();

function NatassaResearchTile() {
  //Graphics Upgraded
  this.name = "NatassaResearch";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You flip through the notes.%%<span class='conv'>7-23-86: The Brilliant Pool is the subject of so many legends, yet I am convinced it exists. What's more- I believe my master knows more about it than she lets on. I must discover what she knows!</span>%%<span class='conv'>3-27-92: Her journals speak of many magical experiments but are silent on the Pool. And yet I remain convinced she not only knew of it but has utilized it herself.<span>%%<span class='conv'>10-3-103: I believe it to reside in the dungeon of World's Ending. I have cleared out the foul creatures that reside near the surface and may even build here. The solitude appeals.</span>%%<span class='conv'>3-16-104: It is not here. I have scoured the place, even down to the Underworld below. I detect no sign. It is not here.</span>%%<span class='conv'>9-3-105: THE POOL MOVES. It was once here, yes, but no longer. It could be ANYWHERE. I may have tried to cause a local volcano to erupt in my fury, but I refrained.</span>";
  this.longdesc = "Natassa's Research Notes, Vol 1.";
}
NatassaResearchTile.prototype = new BookItemObject();

function NatassaResearch2Tile() {
  //Graphics Upgraded
  this.name = "NatassaResearch2";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You flip through the notes.%%<span class='conv'>7-4-107: I continue to research the Pool alongside my other research. While recreating Xoricco's Wind Change spell was satisfying, there are other goals. Perhaps I should consult the oracle.</span>%%<span class='conv'>11-21-107: The underworld is even more dangerous than I had considered. I reached the Oracle- blessings upon Xoricco's research that revealed it to me! But was unable to obtain a full answer before I was forced to flee to the surface. I will work on the riddles.</span>%%<span class='conv'>4-15-109: Wind Change is not enough. King Erik has called upon me to try to recreate Xoricco's magics that made sea travel possible. The storms are too great to be uncreated just by temporarily stilling their winds. The Pool can wait.</span>%%<span class='conv'>10-19-113: Toshin is seeking the Pool. I must find it first- she cannot be permitted to draw upon its powers. She could be a second Tharock.</span>%%<span class='conv'>1-9-114: I have narrowed it down- the Pool has strong magic but it hides itself. But the Oracle taught me how to find the secondary resonances, and it is either underneath the city of Onyx, in the ruins under old Hildendain, or in the dungeon of Mt Drash.</span>%%<span class='conv'>3-21-114: I fear she has found it. I must confront her.</span>";
  this.longdesc = "Natassa's Research Notes, Vol 2.";
}
NatassaResearch2Tile.prototype = new BookItemObject();

function ToshinJournalTile() {
  //Graphics Upgraded
  this.name = "ToshinJournal";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You search through the journal for something useful.%%<span class='conv'>It is somewhere... I can taste it. It is close. The bones of Ellusus sing with it, the unblinking eye of a star.</span>%%<span class='conv'>But there is something I need before I can use the Pool safely, even once I find it. Old scrolls call it an Infinite Scroll. I do not know how to make one... yet. But some are said to still exist. I will inquire of the black market.</span>%%<span class='conv'>There is a guild of thieves in Onyx, and they often have knowledge of such things, but almost certainly they will tell me that there is only one place to find things of such value: Beldskae.</span>";
  this.longdesc = "The Journals of Toshin.";
}
ToshinJournalTile.prototype = new BookItemObject();

function ArcheoJournalTile() {
  //Graphics Upgraded
  this.name = "ArcheoJournal";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You open the journal.%%<span class='conv'>Crossed to the small island at a time when the sea serpent was asleep. We investigated the strange crevasse leading deep into the earth, and returned with a ladder to allow us to explore below.</span>%%<span class='conv'>Below, what we found was astonishing. Buildings- a small outpost, it seemed- that look to be thousands of years old. They may predate the existence of humans! What could have built such a thing?</span>%%<span class='conv'>We need to bring more people and more gear back to look into this further. We are getting ready to cross the water. I think the serpent is asleep again.</span>";
  this.longdesc = "A small journal found in a cave.";
}
ArcheoJournalTile.prototype = new BookItemObject();

function AdelusLetterTile() {
  //Graphics Upgraded 
  this.name = "AdelusLetter";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "letter";
  this.prefix = "a";
  this.contents = "<span class='conv'>Dearest Adelus,</span>%%<span class='conv'>Please visit when you can. I will admit that I have made the way difficult, for I do not wish other visitors, so let these instructions lay out a map for you.</span>%%<span class='conv'>When you enter World's Ending, you must create the sunset, and then walk with the light at your back. Close your eyes, and the wall will let you pass.</span>%%<span class='conv'>In the next chamber, go through the hallways in this order: far right, near right, mid left.</span>%%<span class='conv'>This will bring you to me. And once you are here...</span>%%...The rest of the letter is embarrassingly personal. You put it away.";
  this.longdesc = "A letter from Natassa to Adelus the bard.";
}
AdelusLetterTile.prototype = new BookItemObject();

function RhysLetterTile() {
  this.name = "RhysLetter";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "letter";
  this.prefix = "a";
  this.contents = "<span class='conv'>Lance, my friend!</span>%%<span class='conv'>I've been talking with Justice, and we think you should get out of that castle and into the world a bit. Let's get the old party together. Justice can train you while we are on the road. Who knows, maybe we'll kill a dragon!</span>%%<span class='conv'>Hope to see you soon- Rhys</span>";
  this.longdesc = "A letter to Prince Lance from his friend Rhys.";
}
RhysLetterTile.prototype = new BookItemObject();

function SpireScrapTile() {
  //Graphics Upgraded 
  this.name = "SpireScrap";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "scrap of paper";
  this.prefix = "a";
  this.contents = "<span class='conv'>Spire: far right, near right, mid left.</span>%%<span class='conv'>Underworld: far left, mid left, near right.</span>";
  this.longdesc = "A scrap of paper found in Natassa's Spire.";
}
SpireScrapTile.prototype = new BookItemObject();

function LanceRuneNotesTile() {
  //Graphics Upgraded
  this.name = "LanceRuneNotes";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -37*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "<span class='conv'>Some time ago, Mother and Father shared a family Secret: the Rune of Kings. Deep under the site of another dynasty, it allows our bloodline to connect with... well, the heart of the Kingdom. The world. The earth.</span>%%<span class='conv'>Unknown to most, there are MORE. I directed Justice to help research them, and we discovered full elemental correspondences. The Rune of Kings is also the Rune of Earth- a bond to the land. It is also the key to unlock the other Runes.</span>%%<span class='conv'>Justice discovered the location of the Rune of Waves. There is a small island, naught but hills, north of the Crown Mountains and west of Poverty. The Rune of Kings is required to reveal the cave, she thinks, but I have not found a way to the island yet to try.</span>%%<span class='conv'>The Rune of Winds is, unsurprisingly perhaps, connected to Xoricco. The Rune of Flames appears to be near the Land of Lost Hope- it will be some time before I can try and discover it.</span>%%<span class='conv'>Strangely, there are hints and echoes of a fifth Rune, but I know not what it could be...</span>";
  this.longdesc = "A journal containing Lance's research on Runes.";
}
LanceRuneNotesTile.prototype = new BookItemObject();

function XApprenticeJournalTile() {
  this.name = "XApprenticeJournal";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -38*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "journal";
  this.prefix = "a";
  this.contents = "You open the small journal.%%<span class='conv'>Master Xoricco insists that it is valuable to write everything down, that the act of putting pen to page will firm the memory and the ability to learn. So here I am.</span>%%<span class='conv'>We have taken over a small cave next to her chosen site for the Gate. Despite the fact that we are not going to be here long, she has set up defenses to protect us.</span>%%<span class='conv'>The ritual to create this side of the Gate is elaborate and difficult- she says we are not nearly to the point where she can teach any of it to me. But I have observed what I can.</span>%%<span class='conv'>The core of it all is a treated piece of voidstone, brought here from the expedition that discovered the far continent. I don't know what it must be treated with, only that it is another rare substance.</span>%%<span class='conv'>She is at the site now, preparing to bury the stone. Then will be another boat trip to the new land, to build the other gate. I am determined to convince her to allow me to accompany her...</span>";
  this.longdesc = "A small journal found in a cave.";
}
XApprenticeJournalTile.prototype = new BookItemObject();

function ConsumableItemObject() {
  this.addType("Consumable");
}
ConsumableItemObject.prototype = new ItemObject();

function StoneOfCursesTile() {
  this.name = "StoneOfCurses";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-96";
  this.spriteyoffset = "-1248";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Stone of Curses";
  this.prefix = "the";
  this.longdesc = "The Stone of Curses. It glows with a vile light.";
  this.usedesc = "Shatter the stone.";
  this.addType("Quest");
}
StoneOfCursesTile.prototype = new ConsumableItemObject();

StoneOfCursesTile.prototype.use = function(who) {
  let retval = { fin:1 };

  let ladder = localFactory.createTile("LadderDown");
  ladder.entermap = "hotelcalifornia7";
  ladder.enterx = 10;
  ladder.entery = 5;
  if (PC.getHomeMap().getName() === "hotelcalifornia6") {
    PC.getHomeMap().placeThing(10,9,ladder);
    retval["txt"] = "The curse is broken! The inn shakes around you.";
    Earthquake();
  } else {
    retval["txt"] = "The stone fades in your hand.";
  }

  return retval;
}

function TorchTile() {
  this.name = "Torch";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "0";
  this.spriteyoffset = "-1344";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "torch";
  this.prefix = "a";
  this.longdesc = "An unlit torch.";
}
TorchTile.prototype = new ConsumableItemObject();

TorchTile.prototype.use = function(who) {
  let retval = {};
  if (who.getSpellEffectsByName("TorchLight")) {
    if (who === PC) {
      retval["txt"] = "You already have a lit torch!";
    }
    retval["preserve"] = 1;
    retval["fin"] = 1;
    return retval;
  }
  let tl = localFactory.createTile("TorchLight");
  let endtime = 50 + DU.DUTime.getGameClock();
  tl.setExpiresTime(endtime);
  
  DUPlaySound("sfx_spell_light"); 
  who.addSpellEffect(tl);
  
  DrawCharFrame();
  retval["txt"] = "You light a torch.";
  retval["fin"] = 1;

  return retval;
}

function KyvekBoxTile() {
  this.name = "KyvekBox";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-704";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "box";
  this.prefix = "a";
  this.addType("Quest");
  this.openAsUse = 1;
  this.longdesc = "A box with the payment of a debt to Kyvek in Naurglen.";
  this.usedesc = "Open the box.";
}
KyvekBoxTile.prototype = new ConsumableItemObject();

KyvekBoxTile.prototype.use = function(who) {
  let retval = {fin:1};
  
  if (who === PC) {
    retval["override"] = -1;
    retval["fin"] = -1;
    retval["preserve"] = 1;
    retval["txt"] = "This will break the seal and you will be unable to return the money to Kyvek. Are you sure?";
    retval["input"] = "(Y/N): ";
    targetCursor.useditem = this;
    return retval;
  }
  return retval;
}

KyvekBoxTile.prototype.usePrompt = function(code) {
  let retval = {fin:1};
  if (code === 89) {
    retval["txt"] = "You break the seal and empty the coin into your own pouches. You gain 600 gold.";
    PC.diffKarma(-1);
    PC.addGold(600);
    PC.removeFromInventory(this);
    DrawCharFrame();
  } else {
    retval["txt"] = "You put the box away, unopened.";
  }
  return retval;
}

function InfiniteScrollTile() {
  //Graphics Upgraded
  this.name = "InfiniteScroll";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -39*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Infinite Scroll";
  this.prefix = "an";
  this.addType("Quest");
  this.openAsUse = 1;
  this.longdesc = "A piece of parchment so blank it is like a hole in your mind.";
  this.usedesc = "Use the Scroll.";
}
InfiniteScrollTile.prototype = new ConsumableItemObject();

InfiniteScrollTile.prototype.use = function(who) {
  let retval = {};
  
  if (who === PC) {
    delete this.circle;
    let fea = PC.getHomeMap().features.getAll();
    for (let i=0;i<fea.length;i++) {
      if (fea[i].getName() === "BrilliantPool") {
        if (IsAdjacent(who,fea[i])) {
          retval["override"] = -1;
          retval["fin"] = 4;
          retval["preserve"] = 1;
          retval["txt"] = "You kneel down in front of the Pool and feel its ethereal potency reach out towards you. What level spell will you inscribe?";
          retval["input"] = "(1-8): ";
          gamestate.setMode("singlenumber");
          targetCursor.itemname = "InfiniteScroll";
          targetCursor.itemSource = this;
          return retval;
        }
      }
    }
  }
  retval["txt"] = "There is no way to use that here.";
  retval["preserve"] = 1;
  retval["fin"] = 1;
  return retval;
}

InfiniteScrollTile.prototype.firstResponse = function(code) {
  let level = parseInt(code)-48;
  this.circle = level;
  let retval = {};
  retval["fin"] = -1;
  retval["txt"] = "Choose a spell:";
  for (let i=1;i<=8;i++) {
    let sid = i;
    if ((level===SPELL_WEATHER_CONTROL_LEVEL) && (i===SPELL_WEATHER_CONTROL_ID)) { continue; }  
    if ((level===SPELL_ARMAGEDDON_LEVEL) && (i===SPELL_ARMAGEDDON_ID)) { continue; }
    if ((level===SPELL_BUILD_GATE_LEVEL) && (i===SPELL_BUILD_GATE_ID)) { continue; }
    retval["txt"] += "<br />" + i + ") " + magic[level][GetSpellID(sid)].getName();
  }
  return retval;
}

InfiniteScrollTile.prototype.secondResponse = function(code) {
  let sid = parseInt(code)-48;
  let scroll = localFactory.createTile("ScrollWildcard");
  scroll.setDesc("scroll of " + magic[this.circle][GetSpellID(sid)].getName());
  scroll.spelllevel = this.circle;
  scroll.spellnum = GetSpellID(sid);
  PC.addToInventory(scroll,1);
  PC.removeFromInventory(this);

  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "You feel power swirl around you as text appears on the scroll!";
  retval["input"] = "&gt;"
  return retval;
}

function SupplyBoxTile() {
  this.name = "SupplyBox";
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-64";
  this.spriteyoffset = "-384";
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "small box";
  this.addType("Quest");
  this.openAsUse = 1;
  this.longdesc = "A small box of supplies, given to you by Nyrani.";
  this.usedesc = "Open the box.";
}
SupplyBoxTile.prototype = new ConsumableItemObject();

SupplyBoxTile.prototype.use = function(who) {
  let retval = { fin: 1 };
  who.addToInventory(localFactory.createTile("WhitePotion"),1,2);
  who.addToInventory(localFactory.createTile("RedPotion"),1);
  who.addToInventory(localFactory.createTile("YellowPotion"),1,2);
  who.addToInventory(localFactory.createTile("ScrollVulnerability"),1);
  retval["txt"] = "The box contains: two white potions, two yellow potions, a red potion, and a scroll of Vulnerability.";
  
  return retval;
}

function BluePalmCrystalTile() {
  //Graphics Upgraded
  this.name = "BluePalmCrystal";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -37*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "blue palm crystal";
  this.longdesc = "A blue crystal that will restore mental energy when gripped in the palm.";
  this.usedesc = "Grasp the crystal.";
}
BluePalmCrystalTile.prototype = new ConsumableItemObject();

BluePalmCrystalTile.prototype.use = function(who) {
  let retval = { fin: 1 };
  retval["txt"] = "You grip the crystal in your palm, and feel refreshed! The crystal crumbles to dust.";
  let newmana = who.getMana() + 5;
  if (newmana > who.getMaxMana()) { newmana = who.getMaxMana(); }
  who.setMana(newmana);
  if (who === PC) {
    DrawCharFrame();
  }
  return retval;
}

function GreenPalmCrystalTile() {
  //Graphics Upgraded
  this.name = "GreenPalmCrystal";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -37*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "green palm crystal";
  this.longdesc = "A green crystal that will cure poison or disease.";
  this.usedesc = "Grasp the crystal.";
}
GreenPalmCrystalTile.prototype = new ConsumableItemObject();

GreenPalmCrystalTile.prototype.use = function(who) {
  let retval = magic[SPELL_CURE_LEVEL][SPELL_CURE_ID].executeSpell(who,1,2);
  if (!who.getSpellEffectsByName("Poison") && !who.getSpellEffectsByName("Disease")) {
    retval["txt"] = "You grip the crystal in your palm. You don't feel any different, but the crystal crumbles to dust."; 
  } else {
    retval["txt"] = "You grip the crystal in your palm, and feel purified! The crystal crumbles to dust.";
  }
  if (who === PC) {
    DrawCharFrame();
  }
  return retval;
}

function PurplePalmCrystalTile() {
  //Graphics Upgraded
  this.name = "PurplePalmCrystal";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -37*32;
  this.passable = MOVE_ETHEREAL;
  this.blocklos = 0;
  this.prefix = "a";
  this.desc = "purple palm crystal";
  this.longdesc = "A purple crystal that will grant a bird's-eye view of your location.";
  this.usedesc = "Grasp and gaze into the crystal.";
}
PurplePalmCrystalTile.prototype = new ConsumableItemObject();

PurplePalmCrystalTile.prototype.use = function(who) {
  if (DU.gameflags.getFlag("negate")[castermap.getName()]) {
    retval["txt"] = "Something is preventing this from functioning.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
    gamestate.setMode("player");
    
    return retval;
  }
  let retval = magic[SPELL_ETHEREAL_VISION_LEVEL][SPELL_ETHEREAL_VISION_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "You grasp the crystal. Gazing into it, you see yourself from above."  
  if (who === PC) {
    DrawCharFrame();
  }
  return retval;
}

function IdPotion(potion) {
  let pottype = potion.getName().toLowerCase();
  DU.gameflags.setFlag("knows" + pottype, 1);
}

// potions

function PotionItemObject() {
  this.addType("Potion");
  this.flammable = 10;
}
PotionItemObject.prototype = new ConsumableItemObject();

PotionItemObject.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " boils away!");
  let thisx = this.getx();
  let thisy = this.gety();
  
  let itsmap = this.getHomeMap();
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap,thisx,thisy);
  
  return 1; 
}

// poison potions
function GreenPotionTile() {
  //Graphics Upgraded
  this.name = "GreenPotion";
  this.desc = "green potion";
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -21*32;
  this.usedesc = "Drink the potion, or throw the potion.";
}
GreenPotionTile.prototype = new PotionItemObject();

GreenPotionTile.prototype.getUseDesc = function() {
  if (DU.gameflags.getFlag("knowsgreenpotion")) {
    return this.usedesc;
  }
  return "Drink it, or throw it at something.";
}

GreenPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsgreenpotion")) {
    return "A poison potion.";
  }
  return "A green potion.";
}

GreenPotionTile.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " boils away!");
  let thisx = this.getx();
  let thisy = this.gety();
  let itsmap = this.getHomeMap();
    
  for (let i=thisx-1;i<=thisx+1;i++) {
    for (let j=thisy-1;j<=thisy+1;j++) {
      let tile = itsmap.getTile(i,j);
      if (tile !== "OoB") {
        let npcs = tile.getNPCs();
        for (let i=0;i<npcs.length;i++) {
          if (Dice.roll("1d100") < (55-npcs[i].getLevel()*5)) {
            // poisoned by fumes
            maintext.addText(npcs[i].getFullDesc() + " is poisoned by the fumes!");
            let poison = localFactory.createTile("Poison");
            let duration = Dice.roll("2d8") * SCALE_TIME;
            poison.setExpiresTime(duration + DUTime.getGameClock());
            npcs[i].addSpellEffect(poison);
            ShowEffect(npcs[i], 1000, "spellsparkles-anim.gif", 0, COLOR_GREEN);
            DU.gameflags.setFlag("knowsgreenpotion",1);
          }
        }
      }
    }
  }
  
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap,thisx,thisy);
  
  return 1; 
}

GreenPotionTile.prototype.use = function(who) {
  if (DU.gameflags.getFlag("knowsgreenpotion")) {
    let retval = {fin:-1}
    retval["override"] = -1;
    retval["txt"] = "Would you like to:<br />(A) Drink the potion<br />(B) Throw the potion";
    retval["input"] = "&gt; Choose one:";
    targetCursor.command = "u";
    targetCursor.usewhat = "greenpotion";
    targetCursor.uselink = this;
    retval["preserve"] = 1;
    return retval; 
  } else { 
    return this.drink(who);
  }
}

GreenPotionTile.prototype.drink = function(who, del) {
  DUPlaySound("sfx_potion");
  DU.gameflags.setFlag("knowsgreenpotion",1)
  let retval = {fin:1}
  let poison = localFactory.createTile("Poison");
  let duration = Dice.roll("2d8") * SCALE_TIME;
  poison.setExpiresTime(duration + DUTime.getGameClock());
  who.addSpellEffect(poison);
  if (who === PC) {
    retval["txt"] = "Gulp!<br />You are poisoned!";
    DrawCharFrame();
  }
  if (del) {
    if (this.getHomeMap()) {
      // cast from floor 
      this.getHomeMap().deleteThing(this);
      DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
    } else {
      PC.removeFromInventory(this);
    }
  }
  return retval;
}

GreenPotionTile.prototype.throw = function(who,tgt) {
  DUPlaySound("sfx_break_glass");
  let retval = {fin:1}
  let poison = localFactory.createTile("Poison");
  let duration = Dice.roll("2d8") * SCALE_TIME;
  poison.setExpiresTime(duration + DUTime.getGameClock());
  tgt.addSpellEffect(poison);
  if ((who === PC) && (tgt.getAttitude() === "friendly")) {
    TurnMapHostile(caster.getHomeMap());
  }
  retval["txt"] = "The potion poisons the " + tgt.getDesc() + "!";
  retval["input"] = "&gt;"
  delete targetCursor.uselink;
  return retval;
}

//haste potion
function DarkGreenPotionTile() {
  //Graphics Upgraded
  this.name = "DarkGreenPotion";
  this.desc = "dark green potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -21*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
DarkGreenPotionTile.prototype = new PotionItemObject();

DarkGreenPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsdarkgreenpotion")) {
    return "A quickness potion.";
  }
  return "A dark green potion.";
}  

DarkGreenPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsdarkgreenpotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_QUICKNESS_LEVEL][SPELL_QUICKNESS_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />You begin to move more quickly!";
  DrawCharFrame();
  return retval;
}

// str potion
function SilverPotionTile() {
  //Graphics Upgraded
  this.name = "SilverPotion";
  this.desc = "silver potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
SilverPotionTile.prototype = new PotionItemObject();

SilverPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowssilverpotion")) {
    return "A strength potion.";
  }
  return "A silver potion.";
}

SilverPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowssilverpotion",1)
  DUPlaySound("sfx_potion");
  let resp = {};
  resp["fin"] = 1;

  let levobj = localFactory.createTile("BlessingStr");
  
  let dur = Dice.roll("2d10+15");
  let power = Dice.roll("1d4+1");
  let endtime = dur + DU.DUTime.getGameClock();
  if (!DebugWrite("gameobj", "Potion of Strength: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />")) {
    DebugWrite("magic", "Potion of Strength: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  }
  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  who.addSpellEffect(levobj);
    
  DrawCharFrame();
  resp["txt"] = "Gulp!<br />You feel stronger!";
  return resp;  
}
  
// dex potion
function PinkPotionTile() {
  //Graphics Upgraded
  this.name = "PinkPotion";
  this.desc = "pink potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
PinkPotionTile.prototype = new PotionItemObject();

PinkPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowspinkpotion")) {
    return "A dexterity potion.";
  }
  return "A pink potion.";
}

PinkPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowspinkpotion",1)
  DUPlaySound("sfx_potion");
  let resp = {fin:1};

  let levobj = localFactory.createTile("BlessingDex");
  
  let dur = Dice.roll("2d10+15");
  let power = Dice.roll("1d4+1");
  let endtime = dur + DU.DUTime.getGameClock();
  if (!DebugWrite("gameobj", "Potion of Dexterity: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />")) {
    DebugWrite("magic", "Potion of Dexterity: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  }

  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  who.addSpellEffect(levobj);
    
  DrawCharFrame();
  resp["txt"] = "Gulp!<br />You feel more agile!";
  return resp;  
}

// int potion
function GreyPotionTile() {
  //Graphics Upgraded
  this.name = "GreyPotion";
  this.desc = "grey potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -23*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
GreyPotionTile.prototype = new PotionItemObject();

GreyPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsgreypotion")) {
    return "An intelligence potion.";
  }
  return "A grey potion.";
}

GreyPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsgreypotion",1)
  let resp = {fin:1};
  DUPlaySound("sfx_potion");

  let levobj = localFactory.createTile("BlessingInt");
  
  let dur = Dice.roll("2d10+15");
  let power = Dice.roll("1d4+1");
  let endtime = dur + DU.DUTime.getGameClock();
  if (!DebugWrite("gameobj", "Potion of Intelligence: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />")) {
    DebugWrite("magic", "Potion of Intelligence: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br />");
  }

  levobj.setPower(power);
  levobj.setExpiresTime(endtime);
  
  who.addSpellEffect(levobj);
    
  DrawCharFrame();
  resp["txt"] = "Gulp!<br />You feel smarter!";
  return resp;  
}

// greater mana potion
// actually milky purple
function BrownPotionTile() {
  //Graphics Upgraded
  this.name = "BrownPotion";
  this.desc = "milky purple potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
BrownPotionTile.prototype = new PotionItemObject();

BrownPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsbrownpotion")) {
    return "A greater mana potion.";
  }
  return "A brown potion.";
}

BrownPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsbrownpotion",1)
  DUPlaySound("sfx_potion");
  who.setMana(who.getMaxMana());
  let retval = {fin:1};
  if (who === PC) {
    retval["txt"] = "Gulp!<br />You feel refreshed!";
    DrawCharFrame();
  }
  return retval;
}

// cure potion
function RedPotionTile() {
  //Graphics Upgraded
  this.name = "RedPotion";
  this.desc = "red potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
RedPotionTile.prototype = new PotionItemObject();

RedPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsredpotion")) {
    return "A cure potion.";
  }
  return "A red potion.";
}

RedPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsredpotion",1)
  DUPlaySound("sfx_potion");
  let poisoned;
  if (who.getSpellEffectsByName("Poison")) { poisoned = 1; }
  if (who.getSpellEffectsByName("Disease")) { poisoned = 1; }
  let resp = magic[SPELL_CURE_LEVEL][SPELL_CURE_ID].executeSpell(who,1,2);
  resp["txt"] = "Gulp!";
  if (!poisoned) { maintext.delayedAddText("Nothing happens."); } 
  DrawCharFrame();
  return resp;
}

// light potion
function WhitePotionTile() {
  //Graphics Upgraded
  this.name = "WhitePotion";
  this.desc = "white potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -21*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
WhitePotionTile.prototype = new PotionItemObject();

WhitePotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowswhitepotion")) {
    return "A light potion.";
  }
  return "A white potion.";
}

WhitePotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowswhitepotion",1)
  DUPlaySound("sfx_potion");
  let retval = { fin:1};
  retval = magic[SPELL_LIGHT_LEVEL][SPELL_LIGHT_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />You begin to glow.";
  DrawCharFrame();
  return retval;
}

// lesser heal potion
function YellowPotionTile() {
  //Graphics Upgraded
  this.name = "YellowPotion";
  this.desc = "yellow potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
YellowPotionTile.prototype = new PotionItemObject();

YellowPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsyellowpotion")) {
    return "A lesser heal potion.";
  }
  return "A yellow potion.";
}

YellowPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsyellowpotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_LESSER_HEAL_LEVEL][SPELL_LESSER_HEAL_ID].executeSpell(PC, 0, 2);
  if (who.checkType("PC")) { DrawCharFrame(); }
  retval["txt"] = "Gulp!<br />You are healed!";
  return retval;
}

// protect potion
function PurplePotionTile() {
  //Graphics Upgraded
  this.name = "PurplePotion";
  this.desc = "purple potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
PurplePotionTile.prototype = new PotionItemObject();

PurplePotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowspurplepotion")) {
    return "A protection potion.";
  }
  return "A purple potion.";
}

PurplePotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowspurplepotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_PROTECT_LEVEL][SPELL_PROTECT_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />You feel an aura of protection around you.";
  DrawCharFrame();
  return retval;
}

// bless potion
function BlackPotionTile() {
  //Graphics Upgraded
  this.name = "BlackPotion";
  this.desc = "black potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -21*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
BlackPotionTile.prototype = new PotionItemObject();

BlackPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsblackpotion")) {
    return "A bless potion.";
  }
  return "A black potion.";
}

BlackPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsblackpotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_BLESSING_LEVEL][SPELL_BLESSING_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />You feel blessed!";
  DrawCharFrame();
  return retval;
}

// heal potion
function BluePotionTile() {
  //Graphics Upgraded
  this.name = "BluePotion";
  this.desc = "blue potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
BluePotionTile.prototype = new PotionItemObject();

BluePotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsbluepotion")) {
    return "A heal potion.";
  }
  return "A blue potion.";
}

BluePotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsbluepotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_HEAL_LEVEL][SPELL_HEAL_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />You are healed!"
  DrawCharFrame();
  return retval;
}

// ethereal vision potion
function DeepBluePotionTile() {
  //Graphics Upgraded
  this.name = "DeepBluePotion";
  this.desc = "deep blue potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -21*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
DeepBluePotionTile.prototype = new PotionItemObject();

DeepBluePotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsdeepbluepotion")) {
    return "An ethereal vision potion.";
  }
  return "A deep blue potion.";
}

DeepBluePotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsdeepbluepotion",1)
  DUPlaySound("sfx_potion");
  let retval = magic[SPELL_ETHEREAL_VISION_LEVEL][SPELL_ETHEREAL_VISION_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />Your vision becomes strange!"
  DrawCharFrame();
  return retval;
}

// mana potion
function OrangePotionTile() {
  //Graphics Upgraded
  this.name = "OrangePotion";
  this.desc = "orange potion";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
OrangePotionTile.prototype = new PotionItemObject();

OrangePotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowsorangepotion")) {
    return "A mana potion.";
  }
  return "A orange potion.";
}

OrangePotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowsorangepotion",1)
  DUPlaySound("sfx_potion");
  let mana = Dice.roll("2d6+1");
  who.setMana(who.getMana() + mana);
  if (who.getMana() > who.getMaxMana()) { who.setMana(who.getMaxMana()); }
  let retval = {};
  retval["fin"] = 1;
  if (who === PC) {
    retval["txt"] = "Gulp!<br />You feel refreshed!";
    DrawCharFrame();
  }
  return retval;
}

// iron flesh potion
function TanPotionTile() {
  //Graphics Upgraded
  this.name = "TanPotion";
  this.desc = "tan potion";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -22*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.usedesc = "Drink it.";
}
TanPotionTile.prototype = new PotionItemObject();

TanPotionTile.prototype.getLongDesc = function() {
  if (DU.gameflags.getFlag("knowstanpotion")) {
    return "An iron flesh potion.";
  }
  return "A tan potion.";
}

TanPotionTile.prototype.use = function(who) {
  DU.gameflags.setFlag("knowstanpotion",1)
  DUPlaySound("sfx_potion");
  let retval = {fin:1};
  retval = magic[SPELL_IRON_FLESH_LEVEL][SPELL_IRON_FLESH_ID].executeSpell(PC, 0, 2);
  retval["txt"] = "Gulp!<br />Your skin is as hard as iron!"
  DrawCharFrame();
  return retval;
}

// scrolls

function ScrollItemObject() {
  //Graphics Upgraded
  this.addType("Scroll"); 
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -39*32;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.spelllevel = 1;
  this.spellnum = 1;
  this.flammable = 90;
  this.usedesc = "Read the scroll, casting the spell for free.";
}
ScrollItemObject.prototype = new ConsumableItemObject();

ScrollItemObject.prototype.getLongDesc = function() {
  let spellname = magic[this.spelllevel][this.spellnum].getName();
  return "A scroll of " + spellname + ".";
}

ScrollItemObject.prototype.use = function(who) {
  if (DU.gameflags.getFlag("negate")[who.getHomeMap().getName()]) {
    retval["txt"] = "Magic has been negated, you cannot cast spells here.";
    retval["fin"] = 2;
    retval["input"] = "&gt;";
    gamestate.setMode("player");
    
    return retval;
  }
  let retval = {};
  retval = magic[this.spelllevel][this.spellnum].executeSpell(PC, 0, 1);
  if (retval["fin"] === 4) { 
    retval["override"] = 1; 
    targetCursor.castFrom = this;
  }
  if (gamestate.getMode() === "anykey") {
    // Peer, at the least
    retval["override"] = 1;
    retval["fin"] = 4;
  }
  else {
    if (!retval["txt"]) { retval["txt"] = "Spell cast!"; }
    DrawCharFrame();
  }
  return retval;
}

ScrollItemObject.prototype.spellcast = function(who) {
  if (this.getHomeMap()) {
    // cast from floor 
    this.getHomeMap().deleteThing(this);
    DrawMainFrame("one",this.getHomeMap(),this.getx(),this.gety());
  } else {
    who.removeFromInventory(this);
  }
}

ScrollItemObject.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " burns away!");
  let thisx = this.getx();
  let thisy = this.gety();
  
  let itsmap = this.getHomeMap();
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap,thisx,thisy);
  
  return 1; 
}

function ScrollWildcardTile() {
  //Graphics Upgraded
  this.name = "ScrollWildcard";
  this.desc = "scroll of ???";
  this.prefix = "a";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -39*32;
  this.spelllevel = 0;
  this.spellnum = 0;
}
ScrollWildcardTile.prototype = new ScrollItemObject();

function ScrollAudachtaScribeTile() {
  this.name = "ScrollAudachtaScribe";
  this.desc = "scroll of Audachta Scribe";
  this.prefix = "a";
  this.spelllevel = SPELL_AUDACHTA_SCRIBE_LEVEL;
  this.spellnum = SPELL_AUDACHTA_SCRIBE_ID;
}
ScrollAudachtaScribeTile.prototype = new ScrollItemObject();

function ScrollCureTile() {
  this.name = "ScrollCure";
  this.desc = "scroll of Cure";
  this.prefix = "a";
  this.spelllevel = SPELL_CURE_LEVEL;
  this.spellnum = SPELL_CURE_ID;
}
ScrollCureTile.prototype = new ScrollItemObject();

function ScrollDisarmTrapTile() {
  this.name = "ScrollDisarmTrap";
  this.desc = "scroll of Disarm Trap";
  this.prefix = "a";
  this.spelllevel = SPELL_DISARM_TRAP_LEVEL;
  this.spellnum = SPELL_DISARM_TRAP_ID;
}
ScrollDisarmTrapTile.prototype = new ScrollItemObject();

function ScrollDistractTile() {
  this.name = "ScrollDistract";
  this.desc = "scroll of Distract";
  this.prefix = "a";
  this.spelllevel = SPELL_DISTRACT_LEVEL;
  this.spellnum = SPELL_DISTRACT_ID;
}
ScrollDistractTile.prototype = new ScrollItemObject();

function ScrollFlameBladeTile() {
  this.name = "ScrollFlameBlade";
  this.desc = "scroll of Flame Blade";
  this.prefix = "a";
  this.spelllevel = SPELL_FLAME_BLADE_LEVEL;
  this.spellnum = SPELL_FLAME_BLADE_ID;
  this.flammable = 50;
}
ScrollFlameBladeTile.prototype = new ScrollItemObject();

function ScrollLightTile() {
  this.name = "ScrollLight";
  this.desc = "scroll of Light";
  this.prefix = "a";
  this.spelllevel = SPELL_LIGHT_LEVEL;
  this.spellnum = SPELL_LIGHT_ID;
}
ScrollLightTile.prototype = new ScrollItemObject();

function ScrollVulnerabilityTile() {
  this.name = "ScrollVulnerability";
  this.desc = "scroll of Vulnerability";
  this.prefix = "a";
  this.spelllevel = SPELL_VULNERABILITY_LEVEL;
  this.spellnum = SPELL_VULNERABILITY_ID;
}
ScrollVulnerabilityTile.prototype = new ScrollItemObject();

function ScrollIllusionTile() {
  this.name = "ScrollIllusion";
  this.desc = "scroll of Illusion";
  this.prefix = "a";
  this.spelllevel = SPELL_ILLUSION_LEVEL;
  this.spellnum = SPELL_ILLUSION_ID;
}
ScrollIllusionTile.prototype = new ScrollItemObject();

function ScrollIronFleshTile() {
  this.name = "ScrollIronFlesh";
  this.desc = "scroll of Iron Flesh";
  this.prefix = "a";
  this.spelllevel = SPELL_IRON_FLESH_LEVEL;
  this.spellnum = SPELL_IRON_FLESH_ID;
}
ScrollIronFleshTile.prototype = new ScrollItemObject();

function ScrollLesserHealTile() {
  this.name = "ScrollLesserHeal";
  this.desc = "scroll of Lesser Heal";
  this.prefix = "a";
  this.spelllevel = SPELL_LESSER_HEAL_LEVEL;
  this.spellnum = SPELL_LESSER_HEAL_ID;
}
ScrollLesserHealTile.prototype = new ScrollItemObject();

function ScrollMagicBoltTile() {
  this.name = "ScrollMagicBolt";
  this.desc = "scroll of Magic Bolt";
  this.prefix = "a";
  this.spelllevel = SPELL_MAGIC_BOLT_LEVEL;
  this.spellnum = SPELL_MAGIC_BOLT_ID;
}
ScrollMagicBoltTile.prototype = new ScrollItemObject();

function ScrollPoisonCloudTile() {
  this.name = "ScrollPoisonCloud";
  this.desc = "scroll of Poison Cloud";
  this.prefix = "a";
  this.spelllevel = SPELL_POISON_CLOUD_LEVEL;
  this.spellnum = SPELL_POISON_CLOUD_ID;
}
ScrollPoisonCloudTile.prototype = new ScrollItemObject();

function ScrollProtectionTile() {
  this.name = "ScrollProtection";
  this.desc = "scroll of Protection";
  this.prefix = "a";
  this.spelllevel = SPELL_PROTECTION_LEVEL;
  this.spellnum = SPELL_PROTECTION_ID;
}
ScrollProtectionTile.prototype = new ScrollItemObject();

function ScrollUnlockTile() {
  this.name = "ScrollUnlock";
  this.desc = "scroll of Unlock";
  this.prefix = "a";
  this.spelllevel = SPELL_UNLOCK_LEVEL;
  this.spellnum = SPELL_UNLOCK_ID;
}
ScrollUnlockTile.prototype = new ScrollItemObject();

function ScrollDispelTile() {
  this.name = "ScrollDispel";
  this.desc = "scroll of Dispel";
  this.prefix = "a";
  this.spelllevel = SPELL_DISPEL_LEVEL;
  this.spellnum = SPELL_DISPEL_ID;
}
ScrollDispelTile.prototype = new ScrollItemObject();

function ScrollDisruptUndeadTile() {
  this.name = "ScrollDisruptUndead";
  this.desc = "scroll of Disrupt Undead";
  this.prefix = "a";
  this.spelllevel = SPELL_DISRUPT_UNDEAD_LEVEL;
  this.spellnum = SPELL_DISRUPT_UNDEAD_ID;
}
ScrollDisruptUndeadTile.prototype = new ScrollItemObject();

function ScrollFireArmorTile() {
  this.name = "ScrollFireArmor";
  this.desc = "scroll of Fire Armor";
  this.prefix = "a";
  this.spelllevel = SPELL_FIRE_ARMOR_LEVEL;
  this.spellnum = SPELL_FIRE_ARMOR_ID;
  this.flammable = 30;
}
ScrollFireArmorTile.prototype = new ScrollItemObject();

function ScrollFireballTile() {
  this.name = "ScrollFireball";
  this.desc = "scroll of Fireball";
  this.prefix = "a";
  this.spelllevel = SPELL_FIREBALL_LEVEL;
  this.spellnum = SPELL_FIREBALL_ID;
  this.flammable = 50;
}
ScrollFireballTile.prototype = new ScrollItemObject();

function ScrollReturnTile() {
  this.name = "ScrollReturn";
  this.desc = "scroll of Return";
  this.prefix = "a";
  this.spelllevel = SPELL_RETURN_LEVEL;
  this.spellnum = SPELL_RETURN_ID;
  this.flammable = 50;
}
ScrollReturnTile.prototype = new ScrollItemObject();

function ScrollIceballTile() {
  this.name = "ScrollIceball";
  this.desc = "scroll of Iceball";
  this.prefix = "a";
  this.spelllevel = SPELL_ICEBALL_LEVEL;
  this.spellnum = SPELL_ICEBALL_ID;
}
ScrollIceballTile.prototype = new ScrollItemObject();

function ScrollTelekinesisTile() {
  this.name = "ScrollTelekinesis";
  this.desc = "scroll of Telekinesis";
  this.prefix = "a";
  this.spelllevel = SPELL_TELEKINESIS_LEVEL;
  this.spellnum = SPELL_TELEKINESIS_ID;
}
ScrollTelekinesisTile.prototype = new ScrollItemObject();

function ScrollTelepathyTile() {
  this.name = "ScrollTelepathy";
  this.desc = "scroll of Telepathy";
  this.prefix = "a";
  this.spelllevel = SPELL_TELEPATHY_LEVEL;
  this.spellnum = SPELL_TELEPATHY_ID;
}
ScrollTelepathyTile.prototype = new ScrollItemObject();

function ScrollWallOfFlameTile() {
  this.name = "ScrollWallOfFlame";
  this.desc = "scroll of Wall of Flame";
  this.prefix = "a";
  this.spelllevel = SPELL_WALL_OF_FLAME_LEVEL;
  this.spellnum = SPELL_WALL_OF_FLAME_ID;
  this.flammable = 20;
}
ScrollWallOfFlameTile.prototype = new ScrollItemObject();

function ScrollBlessingTile() {
  this.name = "ScrollBlessing";
  this.desc = "scroll of Blessing";
  this.prefix = "a";
  this.spelllevel = SPELL_BLESSING_LEVEL;
  this.spellnum = SPELL_BLESSING_ID;
}
ScrollBlessingTile.prototype = new ScrollItemObject();

function ScrollBlinkTile() {
  this.name = "ScrollBlink";
  this.desc = "scroll of Blink";
  this.prefix = "a";
  this.spelllevel = SPELL_BLINK_LEVEL;
  this.spellnum = SPELL_BLINK_ID;
}
ScrollBlinkTile.prototype = new ScrollItemObject();

function ScrollEtherealVisionTile() {
  this.name = "ScrollEtherealVision";
  this.desc = "scroll of Ethereal Vision";
  this.prefix = "a";
  this.spelllevel = SPELL_ETHEREAL_VISION_LEVEL;
  this.spellnum = SPELL_ETHEREAL_VISION_ID;
}
ScrollEtherealVisionTile.prototype = new ScrollItemObject();

function ScrollHealTile() {
  this.name = "ScrollHeal";
  this.desc = "scroll of Heal";
  this.prefix = "a";
  this.spelllevel = SPELL_HEAL_LEVEL;
  this.spellnum = SPELL_HEAL_ID;
}
ScrollHealTile.prototype = new ScrollItemObject();

function ScrollLifeDrainTile() {
  this.name = "ScrollLifeDrain";
  this.desc = "scroll of Life Drain";
  this.prefix = "a";
  this.spelllevel = SPELL_LIFE_DRAIN_LEVEL;
  this.spellnum = SPELL_LIFE_DRAIN_ID;
}
ScrollLifeDrainTile.prototype = new ScrollItemObject();

function ScrollSmiteTile() {
  this.name = "ScrollSmite";
  this.desc = "scroll of Smite";
  this.prefix = "a";
  this.spelllevel = SPELL_SMITE_LEVEL;
  this.spellnum = SPELL_SMITE_ID;
}
ScrollSmiteTile.prototype = new ScrollItemObject();

function ScrollCrystalTrapTile() {
  this.name = "ScrollCrystalTrap";
  this.desc = "scroll of Crystal Trap";
  this.prefix = "a";
  this.spelllevel = SPELL_CRYSTAL_TRAP_LEVEL;
  this.spellnum = SPELL_CRYSTAL_TRAP_ID;
}
ScrollCrystalTrapTile.prototype = new ScrollItemObject();

function ScrollMirrorWardTile() {
  this.name = "ScrollMirrorWard";
  this.desc = "scroll of Mirror Ward";
  this.prefix = "a";
  this.spelllevel = SPELL_MIRROR_WARD_LEVEL;
  this.spellnum = SPELL_MIRROR_WARD_ID;
}
ScrollMirrorWardTile.prototype = new ScrollItemObject();

function ScrollParalyzeTile() {
  this.name = "ScrollParalyze";
  this.desc = "scroll of Paralyze";
  this.prefix = "a";
  this.spelllevel = SPELL_PARALYZE_LEVEL;
  this.spellnum = SPELL_PARALYZE_ID;
}
ScrollParalyzeTile.prototype = new ScrollItemObject();

function ScrollPeerTile() {
  this.name = "ScrollPeer";
  this.desc = "scroll of Peer";
  this.prefix = "a";
  this.spelllevel = SPELL_PEER_LEVEL;
  this.spellnum = SPELL_PEER_ID;
}
ScrollPeerTile.prototype = new ScrollItemObject();

function ScrollShockwaveTile() {
  this.name = "ScrollShockwave";
  this.desc = "scroll of Shockwave";
  this.prefix = "a";
  this.spelllevel = SPELL_SHOCKWAVE_LEVEL;
  this.spellnum = SPELL_SHOCKWAVE_ID;
}
ScrollShockwaveTile.prototype = new ScrollItemObject();

function ScrollSummonAllyTile() {
  this.name = "ScrollSummonAlly";
  this.desc = "scroll of Summon Ally";
  this.prefix = "a";
  this.spelllevel = SPELL_SUMMON_ALLY_LEVEL;
  this.spellnum = SPELL_SUMMON_ALLY_ID;
}
ScrollSummonAllyTile.prototype = new ScrollItemObject();

function ScrollSwordstrikeTile() {
  this.name = "ScrollSwordstrike";
  this.desc = "scroll of Swordstrike";
  this.prefix = "a";
  this.spelllevel = SPELL_SWORDSTRIKE_LEVEL;
  this.spellnum = SPELL_SWORDSTRIKE_ID;
}
ScrollSwordstrikeTile.prototype = new ScrollItemObject();

function ScrollExplosionTile() {
  this.name = "ScrollExplosion";
  this.desc = "scroll of Explosion";
  this.prefix = "a";
  this.spelllevel = SPELL_EXPLOSION_LEVEL;
  this.spellnum = SPELL_EXPLOSION_ID;
}
ScrollExplosionTile.prototype = new ScrollItemObject();

function ScrollStormTile() {
  this.name = "ScrollStorm";
  this.desc = "scroll of Storm";
  this.prefix = "a";
  this.spelllevel = SPELL_STORM_LEVEL;
  this.spellnum = SPELL_STORM_ID;
}
ScrollStormTile.prototype = new ScrollItemObject();

function ScrollTremorTile() {
  this.name = "ScrollTremor";
  this.desc = "scroll of Tremor";
  this.prefix = "a";
  this.spelllevel = SPELL_TREMOR_LEVEL;
  this.spellnum = SPELL_TREMOR_ID;
}
ScrollTremorTile.prototype = new ScrollItemObject();

function ScrollFearTile() {
  this.name = "ScrollFear";
  this.desc = "scroll of Fear";
  this.prefix = "a";
  this.spelllevel = SPELL_FEAR_LEVEL;
  this.spellnum = SPELL_FEAR_ID;
}
ScrollFearTile.prototype = new ScrollItemObject();

function ScrollFireAndIceTile() {
  this.name = "ScrollFireAndIce";
  this.desc = "scroll of Fire and Ice";
  this.prefix = "a";
  this.spelllevel = SPELL_FIRE_AND_ICE_LEVEL;
  this.spellnum = SPELL_FIRE_AND_ICE_ID;
}
ScrollFireAndIceTile.prototype = new ScrollItemObject();

function ScrollMeteorSwarmTile() {
  this.name = "ScrollMeteorSwarm";
  this.desc = "scroll of Meteor Swarm";
  this.prefix = "a";
  this.spelllevel = SPELL_METEOR_SWARM_LEVEL;
  this.spellnum = SPELL_METEOR_SWARM_ID;
}
ScrollMeteorSwarmTile.prototype = new ScrollItemObject();

function ScrollMindBlastTile() {
  this.name = "ScrollMindBlast";
  this.desc = "scroll of Mind Blast";
  this.prefix = "a";
  this.spelllevel = SPELL_MIND_BLAST_LEVEL;
  this.spellnum = SPELL_MIND_BLAST_ID;
}
ScrollMindBlastTile.prototype = new ScrollItemObject();

function ScrollConflagrationTile() {
  this.name = "ScrollConflagration";
  this.desc = "scroll of Conflagration";
  this.prefix = "a";
  this.spelllevel = SPELL_CONFLAGRATION_LEVEL;
  this.spellnum = SPELL_CONFLAGRATION_ID;
  this.flammable = 30;
}
ScrollConflagrationTile.prototype = new ScrollItemObject();

function ScrollConjureDaemonTile() {
  this.name = "ScrollConjureDaemon";
  this.desc = "scroll of Conjure Daemon";
  this.prefix = "a";
  this.spelllevel = SPELL_SUMMON_DAEMON_LEVEL;
  this.spellnum = SPELL_SUMMON_DAEMON_ID;
}
ScrollConjureDaemonTile.prototype = new ScrollItemObject();

function ScrollTimeStopTile() {
  this.name = "ScrollTimeStop";
  this.desc = "scroll of Time Stop";
  this.prefix = "a";
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

AudachtaNemesosObject.prototype.getLongDesc = function() {
  let spellname = magic[this.spelllevel][this.spellnum].getName();
  return "Audachta Nemesos: " + spellname + ". A book that teaches the spell " + spellname + " when the spell Audachta Scribe is cast upon the book.";
}

AudachtaNemesosObject.prototype.flamed = function() {
  maintext.addText("The " + this.getDesc() + " is ruined in the fire!");
  let thisx = this.getx();
  let thisy = this.gety();
  
  let itsmap = this.getHomeMap();
  itsmap.deleteThing(this);
  DrawMainFrame("one",itsmap,thisx,thisy);
  
  return 1; 
}

function AudachtaNemesosDisarmTrapTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosDisarmTrap";
  this.desc = "Audachta Nemesos: Disarm Trap";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_DISARM_TRAP_LEVEL;
  this.spellnum = SPELL_DISARM_TRAP_ID;
  this.spellname = "Disarm Trap";
}
AudachtaNemesosDisarmTrapTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosDistractTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosDistract";
  this.desc = "Audachta Nemesos: Distract";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_DISTRACT_LEVEL;
  this.spellnum = SPELL_DISTRACT_ID;
  this.spellname = "Distract";
}
AudachtaNemesosDistractTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFlameBladeTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosFlameBlade";
  this.desc = "Audachta Nemesos: Flame Blade";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_FLAME_BLADE_LEVEL;
  this.spellnum = SPELL_FLAME_BLADE_ID;
  this.spellname = "Flame Blade";
}
AudachtaNemesosFlameBladeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosVulnerabilityTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosVulnerability";
  this.desc = "Audachta Nemesos: Vulnerability";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_VULNERABILITY_LEVEL;
  this.spellnum = SPELL_VULNERABILITY_ID;
  this.spellname = "Vulnerability";
}
AudachtaNemesosVulnerabilityTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosIronFleshTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosIronFlesh";
  this.desc = "Audachta Nemesos: Iron Flesh";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_IRON_FLESH_LEVEL;
  this.spellnum = SPELL_IRON_FLESH_ID;
  this.spellname = "Iron Flesh";
}
AudachtaNemesosIronFleshTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosLesserHealTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosLesserHeal";
  this.desc = "Audachta Nemesos: Lesser Heal";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_LESSER_HEAL_LEVEL;
  this.spellnum = SPELL_LESSER_HEAL_ID;
  this.spellname = "Lesser Heal";
}
AudachtaNemesosLesserHealTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosPoisonCloudTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosPoisonCloud";
  this.desc = "Audachta Nemesos: Poison Cloud";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_POISON_CLOUD_LEVEL;
  this.spellnum = SPELL_POISON_CLOUD_ID;
  this.spellname = "Poison Cloud";
}
AudachtaNemesosPoisonCloudTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosProtectionTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosProtection";
  this.desc = "Audachta Nemesos: Protection";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_PROTECTION_LEVEL;
  this.spellnum = SPELL_PROTECTION_ID;
  this.spellname = "Protection";
}
AudachtaNemesosProtectionTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosUnlockTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosUnlock";
  this.desc = "Audachta Nemesos: Unlock";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_UNLOCK_LEVEL;
  this.spellnum = SPELL_UNLOCK_ID;
  this.spellname = "Unlock";
}
AudachtaNemesosUnlockTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosWindChangeTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosWindChange";
  this.desc = "Audachta Nemesos: Wind Change";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_WIND_CHANGE_LEVEL;
  this.spellnum = SPELL_WIND_CHANGE_ID;
  this.spellname = "Wind Change";
}
AudachtaNemesosWindChangeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosDisruptUndeadTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosDisruptUndead";
  this.desc = "Audachta Nemesos: Disrupt Undead";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_DISRUPT_UNDEAD_LEVEL;
  this.spellnum = SPELL_DISRUPT_UNDEAD_ID;
  this.spellname = "Disrupt Undead";
}
AudachtaNemesosDisruptUndeadTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFireArmorTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosFireArmor";
  this.desc = "Audachta Nemesos: Fire Armor";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_FIRE_ARMOR_LEVEL;
  this.spellnum = SPELL_FIRE_ARMOR_ID;
  this.spellname = "Fire Armor";
}
AudachtaNemesosFireArmorTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosIceballTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosIceball";
  this.desc = "Audachta Nemesos: Iceball";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_ICEBALL_LEVEL;
  this.spellnum = SPELL_ICEBALL_ID;
  this.spellname = "Iceball";
}
AudachtaNemesosIceballTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTelekinesisTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosTelekinesis";
  this.desc = "Audachta Nemesos: Telekinesis";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_TELEKINESIS_LEVEL;
  this.spellnum = SPELL_TELEKINESIS_ID;
  this.spellname = "Telekinesis";
}
AudachtaNemesosTelekinesisTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTelepathyTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosTelepathy";
  this.desc = "Audachta Nemesos: Telepathy";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_TELEPATHY_LEVEL;
  this.spellnum = SPELL_TELEPATHY_ID;
  this.spellname = "Telepathy";
}
AudachtaNemesosTelepathyTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosWallOfFlameTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosWallOfFlame";
  this.desc = "Audachta Nemesos: Wall of Flame";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_WALL_OF_FLAME_LEVEL;
  this.spellnum = SPELL_WALL_OF_FLAME_ID;
  this.spellname = "Wall of Flame";
}
AudachtaNemesosWallOfFlameTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosBlessingTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosBlessing";
  this.desc = "Audachta Nemesos: Blessing";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_BLESSING_LEVEL;
  this.spellnum = SPELL_BLESSING_ID;
  this.spellname = "Blessing";
}
AudachtaNemesosBlessingTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosHealTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosHeal";
  this.desc = "Audachta Nemesos: Heal";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_HEAL_LEVEL;
  this.spellnum = SPELL_HEAL_ID;
  this.spellname = "Heal";
}
AudachtaNemesosHealTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosLifeDrainTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosLifeDrain";
  this.desc = "Audachta Nemesos: Life Drain";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_LIFE_DRAIN_LEVEL;
  this.spellnum = SPELL_LIFE_DRAIN_ID;
  this.spellname = "Life Drain";
}
AudachtaNemesosLifeDrainTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosSmiteTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosSmite";
  this.desc = "Audachta Nemesos: Smite";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_SMITE_LEVEL;
  this.spellnum = SPELL_SMITE_ID;
  this.spellname = "Smite";
}
AudachtaNemesosSmiteTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosOpenGateTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosOpenGate";
  this.desc = "Audachta Nemesos: Open Gate";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_OPEN_GATE_LEVEL;
  this.spellnum = SPELL_OPEN_GATE_ID;
  this.spellname = "Open Gate";
}
AudachtaNemesosOpenGateTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosCrystalTrapTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosCrystalTrap";
  this.desc = "Audachta Nemesos: Crystal Trap";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_CRYSTAL_TRAP_LEVEL;
  this.spellnum = SPELL_CRYSTAL_TRAP_ID;
  this.spellname = "Crystal Trap";
}
AudachtaNemesosCrystalTrapTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosMirrorWardTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosMirrorWard";
  this.desc = "Audachta Nemesos: Mirror Ward";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_MIRROR_WARD_LEVEL;
  this.spellnum = SPELL_MIRROR_WARD_ID;
  this.spellname = "Mirror Ward";
}
AudachtaNemesosMirrorWardTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosParalyzeTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosParalyze";
  this.desc = "Audachta Nemesos: Paralyze";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_PARALYZE_LEVEL;
  this.spellnum = SPELL_PARALYZE_ID;
  this.spellname = "Paralyze";
}
AudachtaNemesosParalyzeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosReturnTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosReturn";
  this.desc = "Audachta Nemesos: Return";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_RETURN_LEVEL;
  this.spellnum = SPELL_RETURN_ID;
  this.spellname = "Return";
}
AudachtaNemesosReturnTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosShockwaveTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosShockwave";
  this.desc = "Audachta Nemesos: Shockwave";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_SHOCKWAVE_LEVEL;
  this.spellnum = SPELL_SHOCKWAVE_ID;
  this.spellname = "Shockwave";
}
AudachtaNemesosShockwaveTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosSummonAllyTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosSummonAlly";
  this.desc = "Audachta Nemesos: Summon Ally";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_SUMMON_ALLY_LEVEL;
  this.spellnum = SPELL_SUMMON_ALLY_ID;
  this.spellname = "Summon Ally";
}
AudachtaNemesosSummonAllyTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosSwordstrikeTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosSwordstrike";
  this.desc = "Audachta Nemesos: Swordstrike";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_SWORDSTRIKE_LEVEL;
  this.spellnum = SPELL_SWORDSTRIKE_ID;
  this.spellname = "Swordstrike";
}
AudachtaNemesosSwordstrikeTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosEmpowerTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosEmpower";
  this.desc = "Audachta Nemesos: Empower";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_EMPOWER_LEVEL;
  this.spellnum = SPELL_EMPOWER_ID;
  this.spellname = "Empower";
}
AudachtaNemesosEmpowerTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosExplosionTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosExplosion";
  this.desc = "Audachta Nemesos: Explosion";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_EXPLOSION_LEVEL;
  this.spellnum = SPELL_EXPLOSION_ID;
  this.spellname = "Explosion";
}
AudachtaNemesosExplosionTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosJinxTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosJinx";
  this.desc = "Audachta Nemesos: Jinx";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_JINX_LEVEL;
  this.spellnum = SPELL_JINX_ID;
  this.spellname = "Jinx";
}
AudachtaNemesosJinxTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosNegateMagicTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosNegateMagic";
  this.desc = "Audachta Nemesos: Negate Magic";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_NEGATE_MAGIC_LEVEL;
  this.spellnum = SPELL_NEGATE_MAGIC_ID;
  this.spellname = "Negate Magic";
}
AudachtaNemesosNegateMagicTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTremorTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosTremor";
  this.desc = "Audachta Nemesos: Tremor";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -7*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_TREMOR_LEVEL;
  this.spellnum = SPELL_TREMOR_ID;
  this.spellname = "Tremor";
}
AudachtaNemesosTremorTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosWeatherControlTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosWeatherControl";
  this.desc = "Audachta Nemesos: Weather Control";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_WEATHER_CONTROL_LEVEL;
  this.spellnum = SPELL_WEATHER_CONTROL_ID;
  this.spellname = "Weather Control";
}
AudachtaNemesosWeatherControlTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosCharmTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosCharm";
  this.desc = "Audachta Nemesos: Charm";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_CHARM_LEVEL;
  this.spellnum = SPELL_CHARM_ID;
  this.spellname = "Charm";
}
AudachtaNemesosCharmTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFearTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosFear";
  this.desc = "Audachta Nemesos: Fear";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -3*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_FEAR_LEVEL;
  this.spellnum = SPELL_FEAR_ID;
  this.spellname = "Fear";
}
AudachtaNemesosFearTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosFireAndIceTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosFireAndIce";
  this.desc = "Audachta Nemesos: Fire and Ice";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_FIRE_AND_ICE_LEVEL;
  this.spellnum = SPELL_FIRE_AND_ICE_ID;
  this.spellname = "Fire and Ice";
}
AudachtaNemesosFireAndIceTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosInvulnerabilityTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosInvulnerability";
  this.desc = "Audachta Nemesos: Invulnerability";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -4*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_INVULNERABILITY_LEVEL;
  this.spellnum = SPELL_INVULNERABILITY_ID;
  this.spellname = "Invulnerability";
}
AudachtaNemesosInvulnerabilityTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosMeteorSwarmTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosMeteorSwarm";
  this.desc = "Audachta Nemesos: Meteor Swarm";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_METEOR_SWARM_LEVEL;
  this.spellnum = SPELL_METEOR_SWARM_ID;
  this.spellname = "Meteor Swarm";
}
AudachtaNemesosMeteorSwarmTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosMindBlastTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosMindBlast";
  this.desc = "Audachta Nemesos: Mind Blast";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_MIND_BLAST_LEVEL;
  this.spellnum = SPELL_MIND_BLAST_ID;
  this.spellname = "Mind Blast";
}
AudachtaNemesosMindBlastTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosArrowOfGlassTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosArrowOfGlass";
  this.desc = "Audachta Nemesos: Arrow of Glass";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_ARROW_OF_GLASS_LEVEL;
  this.spellnum = SPELL_ARROW_OF_GLASS_ID;
  this.spellname = "Arrow of Glass";
}
AudachtaNemesosArrowOfGlassTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosBuildGateTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosBuildGate";
  this.desc = "Audachta Nemesos: Build Gate";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_BUILD_GATE_LEVEL;
  this.spellnum = SPELL_BUILD_GATE_ID;
  this.spellname = "Build Gate";
}
AudachtaNemesosBuildGateTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosConflagrationTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosConflagration";
  this.desc = "Audachta Nemesos: Conflagration";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_CONFLAGRATION_LEVEL;
  this.spellnum = SPELL_CONFLAGRATION_ID;
  this.spellname = "Conflagration";
}
AudachtaNemesosConflagrationTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosConjureDaemonTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosConjureDaemon";
  this.desc = "Audachta Nemesos: Conjure Daemon";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -8*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_CONJURE_DAEMON_LEVEL;
  this.spellnum = SPELL_CONJURE_DAEMON_ID;
  this.spellname = "Conjure Daemon";
}
AudachtaNemesosConjureDaemonTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosQuicknessTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosQuickness";
  this.desc = "Audachta Nemesos: Quickness";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -5*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_QUICKNESS_LEVEL;
  this.spellnum = SPELL_QUICKNESS_ID;
  this.spellname = "Quickness";
}
AudachtaNemesosQuicknessTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosReincarnateTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosReincarnate";
  this.desc = "Audachta Nemesos: Reincarnate";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_REINCARNATE_LEVEL;
  this.spellnum = SPELL_REINCARNATE_ID;
  this.spellname = "Reincarnate";
}
AudachtaNemesosReincarnateTile.prototype = new AudachtaNemesosObject();

function AudachtaNemesosTimeStopTile() {
  //Graphics Upgraded
  this.name = "AudachtaNemesosTimeStop";
  this.desc = "Audachta Nemesos: Time Stop";
  this.prefix = "an";
  this.graphic = "static.png";
  this.spritexoffset = -2*32;
  this.spriteyoffset = -38*32;
  this.spelllevel = SPELL_TIME_STOP_LEVEL;
  this.spellnum = SPELL_TIME_STOP_ID;
  this.spellname = "Time Stop";
}
AudachtaNemesosTimeStopTile.prototype = new AudachtaNemesosObject();

// Prototype for armor and weapons

function EquipableItemObject() {
  this.addType("equipable");	
  this.equippedTo;
  this.toHitBonus = 0;
}
EquipableItemObject.prototype = new ItemObject();

EquipableItemObject.prototype.getEquippedTo = function() {
  return this.equippedTo;
}

EquipableItemObject.prototype.setEquippedTo = function(newwho) {
  if (newwho) {
    this.equippedTo = newwho;
    return 1;
  }
  this.equippedTo = "";
  return 0;
}

EquipableItemObject.prototype.equipMe = function(who) {
  if (!who.checkType("npc")) { return 0; }
  
  if (this.checkType("Armor")) {
    if (who.getStr() < this.getStrReq()) {
      return 0;
    }
    let currentarmor = who.getArmor();
    if (currentarmor && (currentarmor !== this)) {
      currentarmor.unEquipMe();
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    who.setEquipment("armor",this);
  }
  
  else if (this.checkType("Missile")) {
    if (who.getDex() < this.getDexReq()){
      return 0;
    }
    let currentmissile = who.getMissile();
    if (currentmissile && (currentmissile !== this)) {
      currentmissile.unEquipMe();
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    who.setEquipment("missile",this);
  }

  else if (this.checkType("Weapon")) {
    let currentweapon = who.getWeapon();
    if (currentweapon && (currentweapon !== this)) {
      currentweapon.unEquipMe();
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    who.setEquipment("weapon",this);
  }

  else if (this.checkType("Amulet")) {
    let currentamulet = who.getEquipment("amulet");
    if (currentamulet && (currentamulet !== this)){
      currentamulet.unEquipMe();
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    who.setEquipment("amulet",this);
  }

  else if (this.checkType("Circlet")) {
    let currentcirclet = who.getEquipment("circlet");
    if (currentcirclet && (currentcirclet !== this)){
      currentcirclet.unEquipMe();
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    who.setEquipment("circlet",this);
  }

  else if (this.checkType("Ring")) {
    let currentring1 = who.getEquipment("ring1");
    let currentring2 = who.getEquipment("ring2"); 
    // let's be honest, it would be better to set this up as an array or something,
    // and ideally if you tried to wear a ring while you already had 2 on, it would
    // ask you which to take off. But I plan to only have 2 rings in DU, so I'm 
    // gonna save time now, and refactor this for the next version later.

    if ((currentring1 !== this) && (currentring2 !== this) && currentring1 && currentring2) {
      currentring1.unEquipMe(); // this should move ring2 to ring1
    }
    this.setEquippedTo(who);
    if (typeof this.onEquip === "function") { this.onEquip(who); }
    if (who.getEquipment("ring1")) { 
      who.setEquipment("ring2", this);
    } else { who.setEquipment("ring1", this); }
  }
  
  return 1;
}

EquipableItemObject.prototype.unEquipMe = function() {
  let who = this.getEquippedTo();
  if (!who) { return 0; }
  if (!who.checkType("npc")) { return 0; }  
  
  if (this.checkType("Armor")) {
    if (who.getArmor() === this) {
      who.setEquipment("armor","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else { 
      return 0;
    }
  }
  else if (this.checkType("Weapon")) {
    if (who.getWeapon() === this) {
      who.setEquipment("weapon","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else {
      return 0;
    }
  }
  else if (this.checkType("Missile")) {
    if (who.getMissile() === this) {
      who.setEquipment("missile","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else {
      return 0;
    }    
  }
  else if (this.checkType("Circlet")) {
    if (who.getEquipment("circlet") === this) {
      who.setEquipment("circlet","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else {
      return 0;
    }    
  }
  else if (this.checkType("Amulet")) {
    if (who.getEquipment("amulet") === this) {
      who.setEquipment("amulet","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else {
      return 0;
    }    
  }
  else if (this.checkType("Ring")) {
    if (who.getEquipment("ring2") === this) {
      who.setEquipment("ring2","");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else if (who.getEquipment("ring1") === this) {
      who.setEquipment("ring1", who.getEquipment("ring2"));
      who.setEquipment("ring2", "");
      if (typeof this.onUnequip === "function") { this.onUnequip(who); }
    } else {
      return 0;
    }    
  }
  this.setEquippedTo("");
  return 1;
}

EquipableItemObject.prototype.use = function(who) {
  let success = this.equipMe(PC);
  let retval = {};
  retval["fin"] = 1;
  retval["txt"] = "";
  if (this.checkType("Armor")) { 
    if (success) { retval["txt"] = "Worn!"; }
    else { retval["txt"] = "You are not strong enough to wear that."; return retval; }
  }
  else { 
    if (success) { retval["txt"] = "Wielded!"; }
    else { retval["txt"] = "You are not agile enough to equip that."; return retval; }
  }

  return retval;
}

EquipableItemObject.prototype.getToHitBonus = function() {
  return this.toHitBonus;
}

EquipableItemObject.prototype.setToHitBonus = function(newbonus) {
  if (newbonus) {
    newbonus = parseInt(newbonus, 10);
    if (isNaN(newbonus)) {
      newbonus = 0;
    }
    this.toHitBonus = newbonus;
  }
  return this.toHitBonus;
}

// TRINKETS

function RingOfFireResistTile() {
  //Graphics Upgraded
  this.name = "RingOfFireResist";
  this.graphic = "static.png";
  this.spritexoffset = -32;
  this.spriteyoffset = -21*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Ring of Fire Resistance";
  this.prefix = "a";
  this.longdesc = "A ring that confers some resistance to fire.";
  this.addType("Ring");
}
RingOfFireResistTile.prototype = new EquipableItemObject();

RingOfFireResistTile.prototype.onGet = function(who) {
  this.equipMe(who);
}

RingOfFireResistTile.prototype.onEquip = function(who) {
  if (!who.resists.hasOwnProperty("fire")) { who.resists.fire = 33; }
  else { who.resists.fire += 33; }
  maintext.delayedAddText("You place the ring on your finger, and a chill feeling sweeps through you. You are more resistant to fire.");
}

RingOfFireResistTile.prototype.onUnequip = function(who) {
  who.resists.fire -= 33; 
  maintext.delayedAddText("You remove the ring from your finger. You are less resistant to fire.");
}

function RingOfEtherealFocusTile() {
  //Graphics Upgraded
  this.name = "RingOfEtherealFocus";
  this.graphic = "static.png";
  this.spritexoffset = 0;
  this.spriteyoffset = -21*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Ring of Ethereal Focus";
  this.prefix = "a";
  this.longdesc = "A ring that provides mana as enemies are slain with magic.";
  this.addType("Ring");
}
RingOfEtherealFocusTile.prototype = new EquipableItemObject();

RingOfEtherealFocusTile.prototype.onGet = function(who) {
  this.equipMe(who);
}

RingOfEtherealFocusTile.prototype.onEquip = function(who) {  
  maintext.delayedAddText("You place the ring on your finger, and you can feel a strange power flowing through it.");
}

RingOfEtherealFocusTile.prototype.onUnequip = function(who) {
  maintext.delayedAddText("You remove the ring of ethereal focus. You feel briefly lightheaded as your connection to its power ceases.");
}

RingOfEtherealFocusTile.prototype.killed = function(who) {
  let hps = who.getHitBySpell();
  let restoredmana = 0;
  if (hps) {
    let chance = parseInt((hps/4) * 100);
    while (chance >= 100) { restoredmana++; chance -= 100; }
    if (chance > 0) { 
      if (Dice.roll("1d100") <= chance) { restoredmana++; }
    }
    if (restoredmana) {
      maintext.delayedAddText("The Ring of Ethereal Focus restores " + restoredmana + " mana to you!");
      let wearer = this.getEquippedTo();
      wearer.modMana(restoredmana);
      if (wearer.getMana() > wearer.getMaxMana()) { wearer.setMana(wearer.getMaxMana()); }
    }
  }
}

function AmuletOfReflectionsTile() {
  //Graphics Upgraded
  this.name = "AmuletOfReflections";
  this.graphic = "static.png";
  this.spritexoffset = -9*32;
  this.spriteyoffset = -35*32;
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "Amulet of Reflections";
  this.prefix = "an";
  this.longdesc = "A gold amulet, inscribed with magical runes.";
  this.usedesc = "Attempt the ritual of the Abyss.";
  this.addType("Quest");
  this.addType("Amulet");
}
AmuletOfReflectionsTile.prototype = new EquipableItemObject();

AmuletOfReflectionsTile.prototype.use = function(who) {
  let themap = who.getHomeMap();
  let retval = {};
  if (themap.getName() === "olympus2") {
    let standbefore = themap.getTile(who.getx(), who.gety());
    let ismirror = standbefore.getTopFeature();
    if (ismirror.getName() === "mirror") {
      // you are in the right map standing at the right place. GO.
      // remove buffs/debuffs - doesn't cure poison, I guess you can die of
      // poison while your mind is elsewhere? Don't do it, people.
      let effects = who.getSpellEffects();
      for (let i=0;i<effects.length;i++) {
        if ((effects[i].getLevel() > 0) && (effects[i].getExpiresTime() > -1)) {
          effects[i].endEffect();
        }
      };
      gamestate.setMode("null");
      FadeOut();
      setTimeout(function() {
        let newmap = new GameMap();
        if (maps.getMap("abyss0")) {
          newmap = maps.getMap("abyss0");
        } else {
          newmap = maps.addMap("abyss0");
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
      DUPlaySound("sfx_spellcast");
      return retval;
    } 
  }
  retval["txt"] = "Nothing happens here.";
  retval["fin"] = 1;
  return retval;
}


// ARMOR

function ArmorObject() {
	this.defense = 0;
	this.absorb = 0;
	this.resist = 0;
	this.strReq = 0;
	
	this.addType("Armor");
}
ArmorObject.prototype = new EquipableItemObject();

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
  //Graphics Upgraded
	this.name = "ClothArmor";
	this.defense = 5;
	this.absorb = 10;
  this.graphic = "static.png";
	this.spritexoffset = -7*32;
	this.spriteyoffset = -70*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "cloth armor";
  this.longdesc = "A suit of cloth armor. Better than nothing.";
  this.usedesc = "Equip the armor.";
}
ClothArmorTile.prototype = new ArmorObject();

function LeatherArmorTile() {
  //Graphics Upgraded
	this.name = "LeatherArmor";
	this.defense = 10;
	this.absorb = 20;
	this.resist = 10;
  this.graphic = "static.png";
	this.spritexoffset = -8*32;
	this.spriteyoffset = -70*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "leather armor";
  this.longdesc = "A suit of leather armor. Provides some protection.";
  this.usedesc = "Equip the armor.";
}
LeatherArmorTile.prototype = new ArmorObject();

function ChainArmorTile() {
  //Graphics Upgraded
	this.name = "ChainArmor";
	this.defense = 20;
	this.absorb = 33;
	this.resist = 10;
	this.strReq = 14;
  this.graphic = "static.png";
	this.spritexoffset = -9*32;
	this.spriteyoffset = -70*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "chain mail armor";
  this.longdesc = "A suit of chain mail. Requires a 14 Strength to wear.";
  this.usedesc = "Equip the armor.";
}
ChainArmorTile.prototype = new ArmorObject();

function PlateArmorTile() {
  //Graphics Upgraded
	this.name = "PlateArmor";
	this.defense = 35;
	this.absorb = 50;
	this.resist = 15;
	this.strReq = 18;
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -71*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "plate armor";
  this.longdesc = "A suit of plate armor. Requires a 18 Strength to wear.";
  this.usedesc = "Equip the armor.";
}
PlateArmorTile.prototype = new ArmorObject();

function ExoticArmorTile() {
	this.name = "ExoticArmor";
	this.defense = 40;
	this.absorb = 60;
  this.resist = 40;
  this.strReq = 16;
  this.graphic = "exoticarmor.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.desc = "exotic armor";
  this.longdesc = "A suit of exotic armor, magically crafted by you. Requires a 16 Strength to wear.";
  this.usedesc = "Equip the armor.";
}
ExoticArmorTile.prototype = new ArmorObject();

// WEAPONS

function WeaponObject() {
	this.hit = 0;
	this.reduceArmor = 0;
	this.damage = "1d1+0";
	this.strdamage = 0;
	this.hitSound = "";
	this.attackSound = "";
  
  this.usedesc = "Ready the weapon.";
	this.addType("Weapon");
}
WeaponObject.prototype = new EquipableItemObject();

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
  let dmgobj = Dice.parse(this.getDamage());
  
  return dmgobj;
}

WeaponObject.prototype.rollDamage = function(wielder) {
  let damage = Dice.roll(this.getDamage());
  if (wielder && this.getStrDamage()) {
    let str = wielder.getStr();
    let strmod = parseFloat(this.getStrDamage());
    let strdam = (str-10)*strmod;
    damage += parseInt(strdam);
  }
  
  let fb = wielder.getSpellEffectsByName("FlameBlade");
  if (!this.checkType("Missile")) {
    if (wielder && fb) {
      if (!DebugWrite("magic", "Flame blade adds " + fb.damage + "damage.<br />")) {
        DebugWrite("combat", "Flame blade adds " + fb.damage + "damage.<br />");
      }
      damage += parseInt(Dice.roll(fb.damage));
      fb.doEffect();
    }
  }
  return damage;
}

WeaponObject.prototype.getAveDamage = function(wielder) {
  let damage = Dice.rollave(this.getDamage());
  if (wielder && this.getStrDamage()) {
    let str = wielder.getStr();
    let strmod = parseFloat(this.getStrDamage());
    let strdam = (str-10)*strmod;
    damage += parseInt(strdam);
  }
  return damage;
}

WeaponObject.prototype.getAttackSound = function() {
	return this.attackSound;
}

WeaponObject.prototype.setAttackSound = function(newsnd) {
	this.attackSound = newsnd;
	return this.attackSound;
}

WeaponObject.prototype.getHitSound = function() {
	return this.hitSound;
}

WeaponObject.prototype.setHitSound = function(newsnd) {
	this.hitSound = newsnd;
	return this.hitSound;
}

WeaponObject.prototype.getLongDesc = function() {
  let longdesc = this.longdesc;
  let avedmg = this.getAveDamage(PC);
  return longdesc.replace("%ave%", avedmg);
}

function FistsTile() {
  //Graphics Upgraded
	this.name = "Fists";
	this.damage = "1d2+0";
	this.strdamage = 1/3;
	this.graphic = "static.png";  // pic of an alternate mace, but never shown to the player anyway
	this.spritexoffset = -8*32;
	this.spriteyoffset = -68*32;
	this.prefix = "your";
	this.desc = "fists";
}
FistsTile.prototype = new WeaponObject();

function DaggerTile() {
  //Graphics Upgraded
	this.name = "Dagger";
	this.damage = "1d4+1";
	this.strdamage = 1/3;
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "dagger";
  this.prefix = "a";
  this.longdesc = "A dagger. In your hands, it does %ave% damage on average.";
}
DaggerTile.prototype = new WeaponObject();

function ShortswordTile() {
  //Graphics Upgraded
	this.name = "Shortsword";
	this.damage = "2d4+1";
	this.strdamage = 1/2;
  this.graphic = "static.png";
	this.spritexoffset = -32;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "shortsword";
  this.prefix = "a";
  this.longdesc = "A shortsword. In your hands, it does %ave% damage on average.";
}
ShortswordTile.prototype = new WeaponObject();

function MaceTile() {
  //Graphics Upgraded
	this.name = "Mace";
	this.damage = "2d4+3";
	this.strdamage = 1;
  this.graphic = "static.png";
	this.spritexoffset = -2*32;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "mace";
  this.prefix = "a";
  this.longdesc = "A mace. In your hands, it does %ave% damage on average.";
}
MaceTile.prototype = new WeaponObject();

function AxeTile() {
  //Graphics Upgraded
	this.name = "Axe";
	this.damage = "2d4+8";
	this.strdamage = 2/3;
  this.graphic = "static.png";
	this.spritexoffset = -3*32;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "axe";
  this.prefix = "an";
  this.longdesc = "An axe. In your hands, it does %ave% damage on average.";
}
AxeTile.prototype = new WeaponObject();

function LongswordTile() {
  //Graphics Upgraded
	this.name = "Longsword";
	this.damage = "4d4+9";
	this.strdamage = 2/3;
  this.graphic = "static.png";
	this.spritexoffset = -4*32;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "longsword";
  this.prefix = "a";
  this.longdesc = "A longsword. In your hands, it does %ave% damage on average.";
}
LongswordTile.prototype = new WeaponObject();

function HalberdTile() {
  //Graphics Upgraded
	this.name = "Halberd";
	this.damage = "5d4+15";
	this.strdamage = 1;
  this.graphic = "static.png";
	this.spritexoffset = -5*32;
	this.spriteyoffset = -68*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "halberd";
  this.prefix = "a";
  this.longdesc = "A halberd. In your hands, it does %ave% damage on average.";
}
HalberdTile.prototype = new WeaponObject();

function MagicSwordTile() {
	this.name = "MagicSword";
	this.damage = "5d10+22";
	this.strdamage = 1;
  //this.graphic = "master_spritesheet_d.gif";
  this.graphic = "master_spritesheet.png";
	this.spritexoffset = "-192";
	this.spriteyoffset = "-32";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "magic sword";
  this.prefix = "a";
  this.longdesc = "A magic sword. In your hands, it does %ave% damage on average.";
}
MagicSwordTile.prototype = new WeaponObject();

function UnenchantedSwordTile() {
  //Graphics Upgraded
  this.name = "UnenchantedSword";
  this.damage = "4d6+10";  // when broken, 2d4
  this.strdamage = .5;
  this.graphic = "static.png";
  this.spritexoffset = -6*32;
  this.spriteyoffset = -68*32;
  this.desc = "unenchanted sword";
  this.blocklos = 0;
  this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
  this.prefix = "an";
  this.longdesc = "Set this during enchantment.";
  
  this.brokendesc = "unenchanted, broken sword";
  this.repairNeedsInfusion = 1;
  Breakable.call(this,["static.png", "", -7*32, -68*32],1);
}
UnenchantedSwordTile.prototype = new WeaponObject();

UnenchantedSwordTile.prototype.getLongDesc = function() {
  if (this.broken) {
    return "A broken sword. Once it was enchanted.";
  }
  return this.longdesc + "In your hands, it deals %ave% damage on average.";
}

// LightningSword, FlamingSword, SwordOfDefense, VenomSword ?

function NaturalWeaponTile() {
  //Graphics Upgraded
	this.name = "NaturalWeapon";
	this.damage = "1d5+0";
	this.strdamage = 1;
	this.graphic = "static.png";
	this.spritexoffset = -8*32;
	this.spriteyoffset = -68*32;
	this.desc = "natural weapon";
	this.prefix = "a";
	this.attackSound = "sfx_animal_attack";
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
  let params = {};
  params.graphic = this.ammographic;
  params.yoffset = this.ammoyoffset;
  params.xoffset = this.ammoxoffset;
  params.directionalammo = this.directionalammo;
  return GetEffectGraphic(atk,def,params);
}  

MissileWeaponObject.prototype.getAmmoReturn = function() {
  return this.ammoReturn;
}

function SpellWeaponTile() {
  // This is a fake object just to be passed to onDamaged scripts
	this.name = "SpellWeapon";
	this.damage = "1d2+0";
	this.strdamage = 1/3;
	this.graphic = "armorweapons.gif";
	this.spritexoffset = "-224";
	this.spriteyoffset = "-32";
	this.prefix = "your";
	this.desc = "you won't see this";
  this.dmgtype = "fire";
}
SpellWeaponTile.prototype = new MissileWeaponObject();

function SlingTile() {
  //Graphics Upgraded
	this.name = "Sling";
	this.damage = "1d3+0";
  this.graphic = "static.png";
	this.spritexoffset = 0;
	this.spriteyoffset = -69*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "sling";
  this.prefix = "a";
  this.ammographic = "static.png";
	this.ammoxoffset = -3*32;
  this.ammoyoffset = -69*32;
  this.attackSound = "sfx_sling";
  this.longdesc = "A sling, made of simple leather. In your hands, it does %ave% damage on average.";
}
SlingTile.prototype = new MissileWeaponObject();

function BowTile() {
  //Graphics Upgraded
	this.name = "Bow";
	this.damage = "1d12+1";
  this.graphic = "static.png";
	this.spritexoffset = -32;
	this.spriteyoffset = -69*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.dexReq = 14;
	this.desc = "bow";
  this.prefix = "a";
  this.ammographic = "static.png";
  this.ammoxoffset = 0;
  this.ammoyoffset = -73*32;
  this.directionalammo = 1;
  this.attackSound = "sfx_bow";
  this.longdesc = "A bow. It requires a Dexterity of 14 to use. In your hands, it does %ave% damage on average.";
}
BowTile.prototype = new MissileWeaponObject();

function CrossbowTile() {
  //Graphics Upgraded
	this.name = "Crossbow";
	this.damage = "4d8+-1";
  this.graphic = "static.png";
	this.spritexoffset = -2*32;
	this.spriteyoffset = -69*32;
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.dexReq = 17;
	this.desc = "crossbow";
	this.prefix = "a";
  this.ammographic = "static.png";
  this.ammoxoffset = 0;
  this.ammoyoffset = -74*32;
  this.directionalammo = 1;
  this.attackSound = "sfx_bow";
  this.longdesc = "A crossbow. It requires a Dexterity of 17 to use. In your hands, it does %ave% damage on average.";
}
CrossbowTile.prototype = new MissileWeaponObject();

function WandTile() {
  //Graphics Upgraded
	this.name = "Wand";
	this.damage = "4d12+0";
  this.graphic = "magicwand.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.desc = "magic wand";
	this.prefix = "a";
  this.ammoxoffset = "-64";
  this.ammoyoffset = "-128";
  this.attackSound = "sfx_wand";
  this.longdesc = "A wand that channels thunder. In your hands, it does %ave% damage on average.";
}
WandTile.prototype = new MissileWeaponObject();

function MagicAxeTile() {
  //Graphics Upgraded
	this.name = "MagicAxe";
	this.damage = "4d12+12";
  this.graphic = "magicaxe.gif";
	this.passable = MOVE_FLY + MOVE_ETHEREAL + MOVE_LEVITATE + MOVE_WALK;
	this.dexReq = 18;
	this.desc = "magic axe";
  this.prefix = "a";
  this.ammographic = "magicaxeammo.gif";
  this.ammoxoffset = 0;
  this.ammoyoffset = 0;
  this.ammoReturn = 1;
  this.attackSound = "sfx_magic_axe";
  this.longdesc = "A magic throwing axe. It requires a Dexterity of 18 to use. In your hands, it does %ave% damage on average.";
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
  this.graphic = "master_spritesheet.png";
  this.spritexoffset = "-288";
  this.spriteyoffset = "-672";
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
	this.npcname = "myname";
	this.desc = "an NPC";
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "combat";
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
	this.meleeAttackSound = "";
	this.missileHitSound = "";
	this.missileAttackSound = "";
	this.initmult = 1;
	this.movetype = MOVE_WALK;
	this.meleeChance = 100;
  this.gold = 0;
	this.leavesCorpse = "";
	this.lootTable = "";
	this.lastTurnTime = 0;
	this.knowsInfusion = 0;
  this.conversation = "";
  this.schedule = "";
  this.currentScheduleIndex = 0;
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
  this.flags = {};
  this.initOverride = 0;
  this.skintone = 1;  
  this.hitbyspell = 0;  // did the PC hit me with spells? Used for Ring of Ethereal Focus.
	LightEmitting.call(this, 0);
	
	this.addType("npc");
}
NPCObject.prototype = new AnimateObject();

NPCObject.prototype.getDesc = function() {
  let knowsflag = "knows_" + this.conversationflag;
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
  let mana = parseInt(this.mana);
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

NPCObject.prototype.getInitOverride = function() {
  return this.initOverride;
}

NPCObject.prototype.setInitOverride = function(newinit) {
  this.initOverride = parseInt(newinit);
  return this.initOverride;
}

NPCObject.prototype.getLastTurnTime = function() {
  return this.lastTurnTime;
}

NPCObject.prototype.setLastTurnTime = function(newtime) {
  if (!isNaN(newtime)) {
    this.lastTurnTime = newtime;
  }
  return this.lastTurnTime;
}

NPCObject.prototype.getSchedule = function() {
  return this.schedule; 
}

NPCObject.prototype.setSchedule = function (sched) {
  this.schedule = sched;
}

NPCObject.prototype.getCurrentScheduleIndex = function() {
  return this.currentScheduleIndex; 
}

NPCObject.prototype.setCurrentScheduleIndex = function(sched) {
  sched = parseInt(sched);
  this.currentScheduleIndex = sched;
  return this.currentScheduleIndex;
}

NPCObject.prototype.incrementCurrentScheduleIndex = function() {
  let schedule = DU.schedules[this.getSchedule()];
  let nextidx = this.currentScheduleIndex+1;
  if (nextidx >= schedule.scheduleArray.length) { nextidx = 0; }
  this.currentScheduleIndex = nextidx;
  return this.currentScheduleIndex;
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
  let displayhp = Math.ceil(this.hp);
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

NPCObject.prototype.setHitBySpell = function(caster,lvl) {
  if ((caster === PC) && (this !== PC)) {
    if (!this.hitbyspell) { this.hitbyspell = 0; }
    this.hitbyspell += lvl;
  }
}

NPCObject.prototype.getHitBySpell = function() {
  return this.hitbyspell;
}

NPCObject.prototype.dealDamage = function(dmg, src, type) {
  let isasleep = this.getSpellEffectsByName("Sleep");
  if (isasleep) {
    isasleep.endEffect();
  }
  let isfrozen = this.getSpellEffectsByName("Frozen");
  if (isfrozen) {
    isfrozen.endEffect();
  }
  let isinvuln = this.getSpellEffectsByName("Invulnerable");
  if (isinvuln) {
    dmg = 0;
  }

  dmg = CheckAbsorb(dmg,this,src,type);
  if (this.specials.unkillable && (dmg > this.getHP())) {
    dmg = this.getHP()-1;
  }
  this.modHP(dmg*-1);
  if (this.getHP() <= 0) { // killed!
    this.processDeath(1);
    if (src === PC) {
      let XP = this.getXPVal();
      XP = XP * (1 + PC.getKarma()/100);
      PC.addxp(XP);

      let rof = PC.checkInventory("RingOfEtherealFocus");
      if (rof) {
        rof.killed(this);
      }
    }
    return -1;
  }
  else { return dmg; }
}

NPCObject.prototype.processDeath = function(droploot){
  if (this.onDeath) { OnDeathFuncs[this.onDeath](this); }
  let thisx = this.getx();
  let thisy = this.gety();
  if (targetCursor.lastTarget === this) { delete targetCursor.lastTarget; }
  if (this.checkType("PC")) {
    DebugWrite("all", "PC HAS DIED");
    // just in case you died on your turn:
    if (gamestate.getTurn() === PC) {
      gamestate.setMode("null");
    }
    let newmap = new GameMap();
    if (maps.getMap("landsbeyond")) {
      newmap = maps.getMap("landsbeyond");
      // though I'm confused about why this is already in memory!
    } else {
      newmap = maps.addMap("landsbeyond");
    }
    let spellobjs = this.getSpellEffects();
    if (spellobjs.length) {
      for (let i=0; i<spellobjs.length; i++ ) {
        if (spellobjs[i].getExpiresTime() !== -1) {
          spellobjs[i].endEffect();
        }
      }
    }
    let wascityfighting = this.getHomeMap().cityfight;
    if (!this.getHomeMap().getName().includes("blackdragon")) { wascityfighting = 0; }
    MoveBetweenMaps(this,this.getHomeMap(),newmap, 7, 7, 1);
    FadeOut(1);

    if (wascityfighting) {
      PC.dead = 1;
      PC.deaduntil = GetGameClockByClockTime(ModTime(GetUsableClockTime(),"1:00"));
      PC.bdc = 1;
      DU.gameflags.setFlag("intermission",1);
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame(); 
      setTimeout(function() {
        maintext.addText("You cease to feel as consciousness flees from you.");
        setTimeout(function() {
          maintext.addText("<br style='textbreak' />When you come to, you are on the floor, and the battle has ended.");
          setTimeout(function() {
            if (maps.getMap("blackdragon_int")) {
              returnmap = maps.getMap("blackdragon_int");
              // though again, this shouldn't be in memory
            } else {
              returnmap = maps.addMap("blackdragon_int");
            }
            AdjustStartingLocations(returnmap);
            let taran = FindNPCByName("Taran",returnmap);
            returnmap.moveThing(36,15,taran);
            MoveBetweenMaps(PC,PC.getHomeMap(),returnmap,37,15);
            DrawMainFrame("draw",returnmap,37,15);
            FadeIn();
            setTimeout(function() {
              maintext.addText(`<br style='textbreak' />Taran kneels beside you. "${PC.getPCName()}, I'm glad you're ok. The dragon was struck down, and its body just... disappeared. But your brother hasn't woken up. Gather your strength, and get up when you feel ready."`);
              setTimeout(function() {
                maintext.addText("<br style='textbreak' />You close your eyes for a moment, and an unknown amount of time passes before you are again able to stand.");
                setTimeout(function() {
                  maintext.addText("<span class='sysconv'>You have gained: 100 XP.</span>");
                  maintext.setInputLine("&gt;");
                  PC.addxp(100);
                  DU.gameflags.setFlag("act2",DUTime.getGameClock());
                  BeginAct2();
                  DU.gameflags.deleteFlag("intermission");
                  PC.setHP(15);
                  delete PC.dead;
                }, 1700);
              }, 1700);
            },1700);
          },1700);
        }, 1700);
      },1500);        
      return;
    }
    PC.dead = 1;
    PC.deaduntil = GetGameClockByClockTime("9:00");

    maintext.delayedAddText("You have died!");
    maintext.setInputLine("&gt;");
    maintext.drawTextFrame(); 
    setTimeout(function() {
      maintext.addText("You find yourself floating bodiless in the void.");
      DrawMainFrame("draw", newmap, 7,7);
//      if (gamestate.getTurn() === PC) {
//        PC.endTurn();
//      }
      FadeIn();
      setTimeout(function() {
        DrawTopbarFrame("<p>" + newmap.getDesc() + "</p>");
        maintext.addText("<br style='textbreak' />There is nought to do but meditate upon your life, and the triumphs and errors it contained.");
        setTimeout(function() {
          maintext.addText("<br style='textbreak' />Suddenly a voice cries out in the darkness!");
          setTimeout(function() {
            maintext.addText('<br style="textbreak" />"The world is not finished with thee, ' + PC.getPCName() + '!"');
            setTimeout(function() {
              maintext.addText('<br style="textbreak" />"By the strength of this land I bid thee return!"');
              setTimeout(function() {
                maintext.addText("<br style='textbreak' />All is light...");
                setTimeout(function() {
                  delete PC.dead;
                  // play sound effect

                }, 1700);
              }, 1700);
            }, 1700);
          }, 1700);
        }, 1700);
      }, 1500);
    }, 2300);
    return;
  } else {
    let corpse = {};
    let chest;
    let map = this.getHomeMap();
    if (!this.summoned && (this.getLeavesCorpse()) && (this.getLeavesCorpse() !== "none")) {
      corpse = localFactory.createTile(this.getLeavesCorpse());
      corpse.setSearchDelete(1);
      if (this.skintone === 2) { corpse.spritexoffset += -32; }
      map.placeThing(thisx,thisy, corpse);
    } else {
      chest = localFactory.createTile("Chest");
    }
    if (!this.summoned && droploot && (this.lootTable !== "none")) {
      let loottables = this.lootTable.split(",");
      for (let i=0;i<loottables.length;i++) {
        let loot = {};
        if (DULoot[loottables[i]]) {
          loot = DULoot[loottables[i]].getLoot(); 
          if (loot.lootlist.length) {
            if (chest) {
              for (let i=0; i<loot.lootlist.length;i++){
                chest.addToContainer(loot.lootlist[i], 1);
              }
            } else {
              corpse.setSearchYield(loot.lootlist);
            }
          }
          if (loot.gold) {
            let totgold = loot.gold;
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
      if ((chest) && (chest.container.length)) {
        let trapname = GetStrongestTrap(loottables);
        if (trapname) {
          DebugWrite("gameobj", "Chest created, might be trapped with: " + trapname + ".<br />");
          let trap = DUTraps[trapname].getTrap();
          if (trap.trap) {
            chest.setTrap(trap.trap, trap.level);
          }
        }
        map.placeThing(thisx,thisy, chest);
      }  
    }
    map.deleteThing(this);
    if (this.summonedby) {
      delete this.summonedby.summoned;
      delete this.summonedby;
    }
    if (this.summoned) {
      delete this.summoned.summonedby;
      delete this.summoned;
    }
    if (map.getName() === "shadow1") {
      let npcs = map.npcs.getAll();
      let safe = 1;
      for (let i=0;i<npcs.length;i++) {
        if (npcs[i].getNPCBand()) {
          safe = 0;
        }
      };
      if (safe === 1) { DU.gameflags.setFlag("shadow_safe", 1); } 
    }
    DrawMainFrame("one",map,thisx,thisy);
    DUTime.removeEntityFrom(this);
    CheckPostDeathMusic(map);
    let spawner=this.getSpawnedBy();
    if (spawner && (spawner.getName() === "Spawner")) {  // summons also use SpawnedBy
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
  let gt = {};
  if (this.gender === "random") {
    if (Dice.roll("1d2") === 2) { this.gender = "male"; }
    else { this.gender = "female"; }
  }
  
  if (this.gender === "male") {
    gt.pronoun = "he";
    gt.possessive = "his";
    gt.titled = "Lord";
    gt.objective = "him";
    gt.formal = "Prince";
    gt.sibling = "brother";
    gt.kiddie = "son";
    gt.reflexive = "himself";
  } else if (this.gender === "female") {
    gt.pronoun = "she";
    gt.possessive = "hers";
    gt.titled = "Lady";
    gt.objective = "her";
    gt.formal = "Princess";
    gt.sibling = "sister";
    gt.kiddie = "daughter";
    gt.reflexive = "herself";
  } else if (this.gender === "other") {
    gt.pronoun = "they";
    gt.possessive = "theirs";
    gt.objective = "their";
    gt.titled = "Lord";
    gt.formal = "Heir";
    gt.sibling = "sibling";
    gt.kiddie = "child";    
    gt.reflexive = "themself";
  } else {
    gt.pronoun = "it";
    gt.possessive = "its";
    gt.objective = "it";
    gt.titled = "Lord";
    gt.formal = "Heir";
    gt.sibling = "sibling";
    gt.kiddie = "child";    
    gt.reflexive = "itself";
  }
  return gt;
}

NPCObject.prototype.getMeleeHitSound = function() {
  if (this.meleeHitSound) {
    return this.meleeHitSound;
  } else {
    if (this.getEquipment("weapon")) {
      if (this.getEquipment("weapon").getHitSound()) {
        return (this.getEquipment("weapon").getHitSound());
      }
    }
  }
  return "sfx_default_hit";
}

NPCObject.prototype.setMeleeHitSound = function(newsnd) {
  this.meleeHitSound = newsnd;
  return this.meleeHitSound;
}

NPCObject.prototype.getMissileHitSound = function() {
  if (this.missileHitSound){
    return this.missileHitSound;
  } else {
    if (this.getEquipment("missile")) {
      if (this.getEquipment("missile").getHitSound()) {
        return (this.getEquipment("missile").getHitSound());
      }
    }
  }
  return "sfx_default_hit";
}

NPCObject.prototype.setMissileHitSound = function(newsnd) {
  this.missleHitSound = newsnd;
  return this.missleHitSound;
}

NPCObject.prototype.getMeleeAttackSound = function() {
  if (this.meleeAttackSound) {
    return this.meleeAttackSound;
  } else {
    if (this.getEquipment("weapon")) {
      return (this.getEquipment("weapon").getAttackSound());
    }
  }
}

NPCObject.prototype.setMeleeAttackSound = function(newsnd) {
  this.meleeAttackSound = newsnd;
  return this.meleeAttackSound;
}

NPCObject.prototype.getMissileAttackSound = function() {
  if (this.missileAttackSound) { 
    return this.missileAttackSound;
  } else {
    if (this.getEquipment("missile")) {
      return (this.getEquipment("missile").getAttackSound());
    }
  }
}

NPCObject.prototype.setMissileAttackSound = function(newsnd) {
  this.missleAttackSound = newsnd;
  return this.missleAttackSound;
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
  let str = this.getBaseStr() + this.getModStr() + this.getOrbStr();
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
  let dex = this.getBaseDex() + this.getModDex() + this.getOrbDex();
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
  let theint = this.getBaseInt() + this.getModInt() + this.getOrbInt();
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
  if (this.hasOwnProperty("xpval")) { return this.xpval; }
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
  let themap = this.getHomeMap();
  let scale = themap.getScale();
  if (this.smallscalemove) { 
    scale = 1;
    delete this.smallscalemove;
  }

  let effectiveDex = 10;
  if (scale) {
    effectiveDex = this.getDex();
  }
  if (this.getInitOverride() && (this.getAttitude() === "friendly")) { effectiveDex = this.getInitOverride(); }

  let init = ((-1/60) * effectiveDex + (7/6)) * this.initmult;
  
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

NPCObject.prototype.addSpellEffect = function(spellobj, silent) {
  let otherEffects = this.getSpellEffects();
  let addme = 1;
  if (!silent) { silent = 0; }
  if (otherEffects.length) {
    for (let i=0; i < otherEffects.length; i++) {
      if (otherEffects[i].getName() === spellobj.getName()) {
        silent = 1;
        let totin = spellobj.getInstances() + otherEffects[i].getInstances();
        DebugWrite("magic", "That spell is already on the target.<br />");
        if (otherEffects[i].getPower() > spellobj.getPower()) {  // keep old one, extend it
          let adddur = (1/(totin - 1))*(spellobj.getPower() / otherEffects[i].getPower()) * (spellobj.getExpiresTime() - DU.DUTime.getGameClock());
          DebugWrite("magic", "Old one is stronger, extending by " + adddur + ".<br />");
          otherEffects[i].setExpiresTime(otherEffects[i].getExpiresTime() + adddur);
          otherEffects[i].setInstances(otherEffects[i].getInstances() + spellobj.getInstances());
          otherEffects[i].mergeSpells("old");
          addme = 0; 
          return 0;
        } else {
          let adddur = (1/(totin - 1))*(otherEffects[i].getPower() / spellobj.getPower()) * (otherEffects[i].getExpiresTime() - DU.DUTime.getGameClock());
          spellobj.setExpiresTime(spellobj.getExpiresTime() + adddur);
          DebugWrite("magic", "New one is stronger. Replacing old and extending new by " + adddur + ".<br />");
          otherEffects[i].endEffect(1);
          spellobj.setInstances(otherEffects[i].getInstances() + spellobj.getInstances());
          spellobj.mergeSpells("new");
        }
        break;
      }
    }
  }
  this.spellEffects.addBottom(spellobj);
  spellobj.setAttachedTo(this);
  spellobj.setCreateTime(DUTime.getGameClock());
  let makeactive = spellobj.applyEffect(silent);
  if (makeactive) {
    spellobj.setActive(1);
  }
  
  return 1;
}

NPCObject.prototype.deleteSpellEffect = function(spellobj) {
  this.spellEffects.deleteFrom(spellobj);
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
    if (this.getPeaceAI() === "RunAway") { 
      this.specials.coward = 1;
      this.setPeaceAI("combat");
    }
    this.equipment = {};
    this.equipment.armor = "";
    this.equipment.weapon = "";
    this.equipment.missile = "";
    this.equipment.ring1 = "";
    this.equipment.ring2 = "";
    this.equipment.circlet = "";
    this.equipment.amulet = "";

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

    this.maxhp = this.level * 10 + Dice.roll("1d10-6");
    if (this.addhp) { this.maxhp += this.addhp; }
    this.hp = this.maxhp;
    

    DebugWrite("ai", "<span style='font-weight:bold'>NPC " + this.getName() + "(" + this.getSerial() + ") (" + this.getNPCName() + ") activating at " + this.getx() + "," + this.gety() + ".</span><br />");
  
    if (this.overrideGraphic) {
      if (this.realgraphic) {
        this.realgraphic = this.overrideGraphic; 
        alert("Why is this happening?");
        console.log("Why is this happening? Actual use of realgraphic in activation:");
        console.log(this);
      } else {
        this.graphic = this.overrideGraphic;
      }
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
  
    let weapon;
    let missileweapon;
    let armor;
    
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
    let tmpspc = {};
    if (this.special) {
      let tmp = this.special.replace(/ /g,"");
      tmp = tmp.split(",");
      for (let i=0; i<tmp.length;i++){
        if (tmp[i].indexOf(":") > -1) {
          let bluh = tmp[i].split(":");
          tmpspc[bluh[0]] = bluh[1];
          if (typeof NPCSpecialFuncs[bluh[0]] === "function") {
            let ret = NPCSpecialFuncs[bluh[0]](this, bluh[1]);
            if (ret) { tmpspc[bluh[0]] = ret; }
          }
        } else {
          tmpspc[tmp[i]] = 1;
          if (typeof NPCSpecialFuncs[tmp[i]] === "function") {
            let ret = NPCSpecialFuncs[tmp[i]](this);
            if (ret) { tmpspc[tmp[i]] = ret; }
          }
        }
      }
      this.specials = tmpspc;
    }
                  
    let timing = this.nextActionTime(0);
    timing = timing/2;
    if (timeoverride) {
      timing = timeoverride;
    }
    timing = timing + (Math.random() / 500);

    DebugWrite("ai", "Curr time: " + DUTime.getGameClock().toFixed(5) + ", NPC will go in " + timing + ".<br />");

    if (typeof this.attachParts === "function") { this.attachParts(); }
    this.startx = this.getx();
    this.starty = this.gety();
    
    this.nextMana = DUTime.getGameClock() + MANA_REGEN;
    this.nextHP = DUTime.getGameClock() + HP_REGEN;
    
    let NPCEvent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCEvent,timing);  
    
    if (this.getSchedule()) {
      this.setCurrentScheduleIndex(DU.schedules[this.getSchedule()].currentIndex);
      DebugWrite("ai", "Set schedule index to: " + this.getCurrentScheduleIndex() + ".<br />");
    }
  }
}


NPCObject.prototype.moveMe = function(diffx,diffy,noexit) {
  let retval = { fin:1 };
  if (this.getSpellEffectsByName("Entangle")) {
    if (this === PC) {
      retval["msg"] = ": You are entangled by tentacles!";
    }
    retval["canmove"] = 0;
    retval["diffx"] = diffx;
    retval["diffy"] = diffy;
    return retval;
  }
	let map = this.getHomeMap();
	let oldmapname = map.getDesc();
	let startx = this.getx();
	let starty = this.gety();
	let passx = startx + parseInt(diffx);
	let passy = starty + parseInt(diffy);
	let tile = map.getTile(passx,passy);
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
			let newmap = new GameMap();
			if (maps.getMap(map.getExitToMap())) {
			  DebugWrite("map", "destination map already exists.<br />");
				newmap = maps.getMap(map.getExitToMap());
			} else {
			  DebugWrite("map", "destination map needs to be loaded.<br />");
				newmap = maps.addMap(map.getExitToMap());
			}
			tile = MoveBetweenMaps(this,map,newmap,map.getExitToX(),map.getExitToY());
			if (tile) {
  			DebugWrite("map", "Exited from MoveBetweenMaps. New map is " + this.getHomeMap().getName() + ".<br />");
        retval["canmove"] = 0;
		  	if (this === PC) {
			  	DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
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
    if (map.getWrap() !== "None") {
      let wrap = map.getWrap();
      if ((passx < 0) && ((wrap === "Horizontal") || (wrap === "Both"))) { passx = map.getWidth()+passx; }
      else if ((passx >= map.getWidth()) && ((wrap === "Horizontal") || (wrap === "Both"))) { passx = passx-map.getWidth(); }
      else if ((passy < 0) && ((wrap === "Vertical") || (wrap === "Both"))) { passy = map.getHeight()+passy; }
      else if ((passy >= map.getHeight()) && ((wrap === "Vertical") || (wrap === "Both"))) { passy = passy-map.getHeight(); }
    }
		retval = tile.getBumpIntoResult(this);
		if (retval["canmove"] === 0) { return retval; }
    DebugWrite("ai", this.getName() + " trying to move, checking canMoveHere for " + passx + "," + passy +".</span><br />");
		let moveval = tile.canMoveHere(this.getMovetype());
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
    let exittile = map.getTile(this.getx(),this.gety());
    let walkofftest = { success: 1 };
    if (exittile.walkofftest) {
      walkofftest = exittile.walkofftest(this);
      if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
      retval["msg"] += walkofftest["txt"];
    }
    if (walkofftest.success) {
      let walkofftile = exittile.executeWalkoffs(this);
	    if (walkofftile.msg) {
	      if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
	      retval["msg"] += walkoffval.msg;
  	  }
      map.moveThing(this.getx()+diffx,this.gety()+diffy,this);
      retval["fin"] = 1;
		  if (this === PC) {
		    let sfx = "sfx_walk_";
  		  if (map.getUnderground()) { sfx = sfx + "ug_"; }
	  	  if (tile.getTopFeature() && tile.getTopFeature().getWalkSound()) {
		      sfx = sfx + tile.getTopFeature().getWalkSound();
		    } else if (tile.getTerrain().getWalkSound()) {
		      sfx = sfx + tile.getTerrain().getWalkSound();
  		  } else {
	  	    sfx = sfx + "grass";
		    }
		    play_footstep(sfx);
		  
//        ProcessAmbientNoise(tile); 
//        moved to atlas moveThing, so it runs after teleports
		  }

      let distfrom = getDisplayCenter(map, PC.getx(), PC.gety());
      let walkonval = tile.executeWalkons(this);
      let overridedraw = 0;
      if (walkonval.overridedraw) { overridedraw = 1; }
		  if (walkonval.msg) {
  		  if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
        retval["msg"] += walkonval.msg;
      }
      if (walkonval.override) {
        retval.fin = walkonval.override;
        if (walkonval.override === -3) {
          retval["msg"] = "";
        }
      }
//    if ((map === PC.getHomeMap()) && (GetSquareDistance(this.getx(), this.gety(), distfrom.centerx, distfrom.centery) < 1+Math.max(VIEWSIZEX,VIEWSIZEY) )) {
      // basically, was this move on screen? The +1 is to catch things that might have just walked off-screen
      // uncommented version checks from current display center, not from PC position.
      if (!overridedraw) {
        if ((typeof this.getLight === "function") && (this.getLight() !== 0)) {
          DebugWrite("ai", "A light source, need to redraw the whole screen...<br />");
          DrawMainFrame("draw", map, PC.getx(), PC.gety());
  			} else {
          // only redraw these two spaces
          DebugWrite("ai", "Redraw both tiles.<br />");
			    DrawMainFrame("one", map, startx, starty);
			    DrawMainFrame("one", map, passx, passy);
        }
      }
//    }
	  }
	  retval["initdelay"] = tile.getInitDelay(this);
	  retval["diffx"] = diffx;
    retval["diffy"] = diffy;
  }

  if (this.hasFrame) {
    if ((this.getHomeMap() === PC.getHomeMap()) && (IsVisibleOnScreen(this.getx(),this.gety()))) {
      MoveTurnFrame(this);
    } else {
      HideTurnFrame();
      delete this.hasFrame;
    }
  }
	return retval;
}

NPCObject.prototype.myTurn = function() {
  maintext.flushDelayedText();
  raceWarning = 0;
  if (this.fled) { return 1; }
  DebugWrite("new", "<div style='border-style:inset; border-color:#999999'><span style='" + debugstyle.header + "'>" + this.getName() + " (" + this.getNPCName() + "), serial " + this.getSerial() + " is starting its turn at " + this.getx() + "," + this.gety() + ", timestamp " + DUTime.getGameClock().toFixed(5) + ".</span><br />");
  if (!maps.getMap(this.getHomeMap().getName())) {
    // removing from timeline, its map is gone

    DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " removed from game- map gone.</span><br />");
  
    return 1;
  }

  if (this.expiresTime && (this.expiresTime <= DUTime.getGameClock())) {
    DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " expired, removing itself.</span><br />");
    this.getHomeMap().deleteThing(this);
    
    return 1;
  }

	gamestate.setMode("NPC");
	gamestate.setTurn(this);

  if (this.specials.noact) { return 1; } // noact NPCs skip their turns. Effects do not run!
  
  let tileid;

  this.hasFrame = 0;
  if (PC.showFrames && IsObjectVisibleOnScreen(this)) {
    // add turn frame
    ShowTurnFrame(this);
  } else {
    HideTurnFrame();
  }

	RunEffects(this);
	
	Regen(this);
  let awake = 1;
  if (this.getSpellEffectsByName("Sleep") || this.getSpellEffectsByName("Paralyze") || this.getSpellEffectsByName("Frozen") || this.getSpellEffectsByName("CrystalTrap") || this.getSpellEffectsByName("Stunned")) { awake = 0; }
  let confused = this.getSpellEffectsByName("Confused");
  if (confused && (Math.random() < (confused.getPower()/100))) {
    // confused and Confused
    awake = 0;
    if (Math.random() < .5) { 
	    // confused and randomly wandering
	    let dir = Dice.roll("1d4");
	    if (dir === 1) { this.moveMe(0,-1,0); }
	    if (dir === 2) { this.moveMe(1,0,0); }
	    if (dir === 3) { this.moveMe(0,1,0); }
	    if (dir === 4) { this.moveMe(-1,0,0); }
	  }

  }

  let response = {};  
  // will be = return value of AI call
  
  // actual AI!
  if (awake) {	
    let ainame=this.getCurrentAI().split("-");
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
  let oldloc = this.getLastLocation();
  if ((oldloc.map === this.getHomeMap().getName()) && (oldloc.x === this.getx()) && (oldloc.y === this.gety())) {  // npc did not move
    let tile = this.getHomeMap().getTile(this.getx(),this.gety());
    let idleval = tile.executeIdles(this);
  } else {
    let newloc = {};
    newloc.map = this.getHomeMap().getName();
    newloc.x = this.getx();
    newloc.y = this.gety();
    this.setLastLocation(newloc);
  }
  
	this.setLastTurnTime(DUTime.getGameClock());

  if (!maps.getMap(this.getHomeMap().getName())) {
    // map removed during its turn (probably because it killed the player)
    // therefore it deserves valhalla

    DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " removed from game- map gone. Not re-adding to timeline.</span><br />");

    if (this.hasFrame) {
      // remove turn frame
      HideTurnFrame(this);
    }
  
    return 1;
  }
	
	gamestate.setMode("null");
  if (!response.removed && (this.getHP() > 0)) {
	  let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,this.nextActionTime(response["initdelay"]));
  }
  
  delete this.pushed;
  
  if (this.hasFrame) {
    // remove turn frame
    HideTurnFrame(this);
  }

  DebugWrite("ai", "Ending its turn at (" + this.getx() + "," + this.gety() + ").");
  return 1;
}

NPCObject.prototype.endTurn = function(init) {
  if (!init) { init = 0; }
  if (this.hasFrame && IsObjectVisibleOnScreen(this)) {
    // remove turn frame
    HideTurnFrame(this);
  }

  if (gamestate.getTurn() !== this) {
    console.log(this);
    console.log(gamestate.getTurn());
    alert("Somehow trying to end a turn when it isn't their turn, aborting.");
  } else if ((this.getHP() <= 0) && (this !== PC)) {
    DebugWrite("ai", "Ending turn while dead, not going back on the stack!");
    setTimeout(function() { startScheduler(); }, 5 );
  } else {
    gamestate.setMode("null");
  
    DebugWrite("ai", "Ending its turn at (" + this.getx() + "," + this.gety() + ").");
  
    // did this entity idle?
    let oldloc = this.getLastLocation();
    let idleval;
    if ((oldloc.map === this.getHomeMap().getName()) && (oldloc.x === this.getx()) && (oldloc.y === this.gety())) {  // did not move
      let tile = this.getHomeMap().getTile(this.getx(),this.gety());
      idleval = tile.executeIdles(this);
    } else {
      let newloc = {};
      newloc.map = this.getHomeMap().getName();
      newloc.x = this.getx();
      newloc.y = this.gety();
      this.setLastLocation(newloc);
    }
  
    if (idleval && (this === PC)) { maintext.addText(idleval.msg); }
    this.setLastTurnTime(DUTime.getGameClock());
  
    if (!maps.getMap(this.getHomeMap().getName())) {
      // map removed during its turn (probably because it killed the player)
      // therefore it deserves valhalla

      DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " removed from game- map gone. Not re-adding to timeline.</span><br />");
  
    } else {
      let myevent = new GameEvent(this);
      DUTime.addAtTimeInterval(myevent,this.nextActionTime(init));
    }

    setTimeout(function() { startScheduler(); }, 5 );
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
  let alreadyIn = this.checkInventory(item.getName());
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
  if (item.getQuantity() > 1) {
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
    if (item === this.getEquipment("ring1")) {
      this.setEquipment("ring1","");
    }
    if (item === this.getEquipment("ring2")) {
      this.setEquipment("ring2","");
    }
    if (item === this.getEquipment("circlet")) {
      this.setEquipment("circlet","");
    }
    if (item === this.getEquipment("amulet")) {
      this.setEquipment("amulet","");
    }
    this.inventory.deleteFrom(item);
  }
  if (map) { // if map,x,y are filled in, will place the item back on
             // the map
    map.placeThing(x,y,item);
  }
}

NPCObject.prototype.getInventory = function() {
  let inv = this.inventory.getAll();
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
  else if (which === "ring1") {
    if (this.equipment.ring1) {
      return this.equipment.ring1;
    } else { return ""; }
  }
  else if (which === "ring2") {
    if (this.equipment.ring2) {
      return this.equipment.ring2;
    } else { return ""; }
  }
  else if (which === "circlet") {
    if (this.equipment.circlet) {
      return this.equipment.circlet;
    } else { return ""; }
  }
  else if (which === "amulet") {
    if (this.equipment.amulet) {
      return this.equipment.amulet;
    } else { return ""; }
  }
  
  else { return ""; }
}

NPCObject.prototype.setEquipment = function(which,what) {
  which = which.toLowerCase();
  if ((which === "armor") || (which === "weapon") || (which === "missile") || (which === "amulet") || (which === "circlet") || (which === "ring1") || (which === "ring2")) {
    if (what) {
      let type = which;
      if ((type === "ring1") || (type === "ring2")) { type = "ring"; }
      if (what.checkType(type)) {
        this.equipment[which] = what;
        return 1;
      }
      return 0;
    } else {
      this.equipment[which] = "";
      return 1;
    }
  }  
  else { return 0; }
}

NPCObject.prototype.isEquipped = function(checkItem) {
  if (typeof checkItem.getEquippedTo === "function") {
    if (checkItem.getEquippedTo() === this) {
      return 1; 
    }
  }

  return 0;
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

NPCObject.prototype.getHitChance = function(atkwith) {
  if (!atkwith) { atkwith = "melee"; }
  let tohit = BASE_HIT_CHANCE;
  tohit += this.getLevel() * HIT_PER_LEVEL ;
  if (atkwith === "melee") {
    tohit += this.getStr() - 10;
    let weapon = this.getEquipment("weapon");
    if (weapon) {
      tohit += weapon.getToHitBonus();
    }
  } else {
    tohit += this.getDex() - 10;
    let weapon = this.getEquipment("missile");
    if (weapon) {
      tohit += weapon.getToHitBonus();
    }
  }
  let armor = this.getEquipment("armor");
  if (armor) {
    tohit += armor.getToHitBonus();
  }
  
  let distracted = this.getSpellEffectsByName("Distract");
  if (!distracted) { distracted = this.getSpellEffectsByName("Dizzy"); }
  if (distracted) {
    let stillon = distracted.doEffect();
    if (stillon != -1) {
      DebugWrite("combat", "DISTRACTED: old tohit: " + tohit + ", ");
      tohit = tohit - distracted.getPower();
      DebugWrite("combat", "new tohit: " + tohit + ".<br />");
    }
  }
  return tohit;
}

NPCObject.prototype.getDefense = function() {
  let def = this.getLevel() * DEF_PER_LEVEL;
  def = def + (this.getDex()-10)*DEF_PER_DEX;
  let armor = this.getEquipment("armor");
  if (armor) {
    if (this.getStr() < armor.getStrReq()) {
      def += (armor.getDefense())/3;
    } else {
      def += armor.getDefense();
    }
  }
  let vuln = this.getSpellEffectsByName("Vulnerability");
  if (vuln) {
    DebugWrite("ai", "VULNERABLE: Old AC " + def + ", ");
    def = def - vuln.getPower();
    DebugWrite("ai", "new AC: " + def + ".<br />");
  }
  let prot = this.getSpellEffectsByName("Protection");
  if (prot) {
    DebugWrite("combat", "PROTECTED: old AC " + def + ", ");
    def = def + prot.getPower();
    DebugWrite("combat", "new AC: " + def + ".<br />");
  } 
  return def;
}

NPCObject.prototype.getAbsorb = function() {
  let armor = this.getEquipment("armor");
  if (armor) {
    return armor.getAbsorb();
  }
}

NPCObject.prototype.getResist = function(resisttype) {
  if (resisttype === "physical") {
    let armor = this.getEquipment("armor");
    if (armor) {
      return (armor.getAbsorb());
    }
  }
  if (resisttype === "magic") {
    let armor = this.getEquipment("armor");
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
  let dest = {};
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

NPCObject.prototype.setCurrentPath = function(newpath) {
  this.currentPath = newpath;
}

NPCObject.prototype.getCurrentPath = function() {
  return this.currentPath;
}

NPCObject.prototype.getNextStep = function() {
  if (this.currentPath.length > 0) {
    let nextstep = this.currentPath.shift();
    return nextstep;
  }
  return [];
}

NPCObject.prototype.setWaiting = function(newwait) {
  this.waiting = newwait;
  if (newwait) {
    DU.gameflags.setFlag("mute",1);
  } else {
    DU.gameflags.deleteFlag("mute");
  }
}

NPCObject.prototype.getWaiting = function() {
  return this.waiting;
}

function NPCGroupObject() {
  this.group = [];
  this.attackword = "attack";
  this.attitude = "hostile";
}
NPCGroupObject.prototype = new NPCObject();

function NPCList(npcs,num) {
  this.npc = npcs;
  this.count = num;
}

NPCGroupObject.prototype.populate = function() {
  let population = [];
  for (let i=0; i<this.group.length; i++) {
    let num = Dice.roll(this.group[i].count);
    for (let j=1; j<=num; j++) {
      if (population.length < 8) {
        let monster = localFactory.createTile(this.group[i].npc);
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
	this.meleeAttackSound = "";
	this.missileHitSound = "";
	this.missileAttackSound = "";	
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
  this.lastspell = 6;
  this.infuse = 0;
  this.gender = "other";
  this.casinonet = 0;
  this.karma = 0;
  this.negkarma = 0;
  
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
  
  this.waiting = 0;
	
	this.nextMana = MANA_REGEN;
	this.nextHP = HP_REGEN;

}
PCObject.prototype = new NPCObject();

PCObject.prototype.activate = function() {
  return 1;
}

PCObject.prototype.getx = function(evenwait) {
//  if (!evenwait && this.getWaiting()) {
//    return this.moveAfterWaiting.x
//  } 
	return parseInt(this.x,10);
}

PCObject.prototype.gety = function(evenwait) {
//  if (!evenwait && this.getWaiting()) {
//    return this.moveAfterWaiting.y
//  } 
  return parseInt(this.y,10);
}

PCObject.prototype.myTurn = function() {
  maintext.flushDelayedText();
  if (ShouldShowFrames()) { PC.showFrames = 1; }
  else {delete PC.showFrames}

  if (debugmaps.open) { ShowDebugMaps(); }

  let clockface = GetClockTime(this.getLastTurnTime());
  if ((clockface[3] !== GetClockTime()[3]) && !this.getWaiting() && !this.dead) { DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety()); }
  if (!this.dead) {
    SetSky();
  }

  if (this.replaceTurnWith) {
    this.replaceTurnWith(this);
    // remember that it is the responsibility of the replaceTurn function to delete itself from the PC
    return 0;
  }

  DebugWrite("new", "<div style='border-style:inset; border-color:#999999'><span style='" + debugstyle.header + "'><span style='color:purple'>=== PC TURN ===</span>   Timestamp: " + DU.DUTime.getGameClock().toFixed(5) + "; Clock: " + GetUsableClockTime() + "; x: " + PC.getx() + ", y: " + PC.gety() + "<br />");

  if (gamestate !== "loadgame") {
    // this half of myTurn has already run before the player saved
    RunEffects(this);
  
    if (PC.getHP() <= 0) {
      if (DUTime.getGameClock() <= PC.deaduntil) {
        gamestate.setTurn(PC);
        PC.endTurn(0);
        return 0;
      } 
      if (PC.dead) {
        setTimeout(function(){ PC.myTurn(); }, 100);
        return 0;
      }
      delete PC.deaduntil;
      let returnmap = new GameMap();
      if (PC.bdc) {

        PC.setHP(1);
        PC.setMana(PC.getMaxMana());
      } else {
        if (maps.getMap("olympus1")) {
          returnmap = maps.getMap("olympus1");
          // though again, this shouldn't be in memory
        } else {
          returnmap = maps.addMap("olympus1");
        }
        AdjustStartingLocations(returnmap);
        MoveBetweenMaps(PC,PC.getHomeMap(),returnmap,49,22);
        DrawMainFrame("draw",returnmap,49,22);
        PC.setHP(PC.getMaxHP());
        PC.setMana(PC.getMaxMana());
      }
      DrawCharFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
      SetSky();
    }
  }
    
  Regen(this);
  let awake = 1;
  let sleep = this.getSpellEffectsByName("Sleep");
  let paralyzed = this.getSpellEffectsByName("Paralyze");
  let frozen = this.getSpellEffectsByName("Frozen");
  let waiting = this.getWaiting();
  let endingwait = 0;
  if (waiting && (waiting < DUTime.getGameClock())) { 
    waiting = 0;
    EndWaiting(this,this.atinn);
    endingwait = 1;
  } else if (waiting && (PC.getx() !== 0) && (PC.gety() !== 0)) {  // waiting somewhere that can have hostiles
    let closemonsters = CheckMapForHostiles(PC);
    if ((closemonsters >= 0) && (closemonsters <= 4)) {
      maintext.addText("You become alert due to nearby enemies.");
      waiting = 0;
      EndWaiting(this,0);
      // consider checking LOS so you aren't alerted by stuff behind walls?
    }
  }
  if (sleep || paralyzed || frozen || waiting) { awake = 0; }  

  SetDebugToBottom();
  
  gamestate.setTurn(PC);
  if (awake) {
    if (!endingwait) {
      if (this.getSpellEffectsByName("DelayTurnStart")) {
        gamestate.setMode("null");
        let delayturn = this.getSpellEffectsByName("DelayTurnStart");
        delayturn.endEffect(1);
      } else {
        gamestate.setMode("player");
      }

      if (this.forcedTalk) {
        if (this.forcedTalk.getNPCName() === "Ashlin") {
          let ashlin = this.forcedTalk;
          if (ashlin && !DU.gameflags.getFlag("enter_consolation")) {
            let themap = this.getHomeMap();
            let moongate = localFactory.createTile("Moongate");
            moongate.destmap = "consolation";
            moongate.destx = 14;
            moongate.desty = 24;
            themap.placeThing(14,24,moongate);
            AnimateMoongate(moongate,0,"up",300,0,1);
            gamestate.setMode("null");
            setTimeout(function() {
              moongate.getHomeMap().moveThing(14,24,ashlin);
              moongate.getHomeMap().deleteThing(moongate);
              ShowTurnFrame(ashlin);
              let convo = ashlin.getConversation();
              let newresponse = PerformTalk(ashlin, convo, "_start");
              maintext.addText(newresponse["txt"]);
              maintext.setInputLine(newresponse["input"]);
              maintext.drawTextFrame();    
            }, 1200);
          } else if (ashlin) {
            let convo = ashlin.getConversation();
            let newresponse = PerformTalk(ashlin, convo, "_entry");
            maintext.addText(newresponse["txt"]);
            maintext.setInputLine(newresponse["input"]);
            maintext.drawTextFrame();    
          }
        } else {
          ShowTurnFrame(this.forcedTalk);
          let convo = this.forcedTalk.getConversation();
          let newresponse = PerformTalk(this.forcedTalk, convo, "_start");
          maintext.addText(newresponse["txt"]);
          maintext.setInputLine(newresponse["input"]);
          maintext.drawTextFrame();
        }

        delete this.forcedTalk;
      }
      if (!DU.gameflags.getFlag("act2")) {
        let endact = this.getSpellEffectsByName("UnconsciousEndAct");
        if (endact) {
          PerformActEnd();
        }
      }
    
      // Because EndWaiting will set to player in a second, and this can override
      // "waiting for input" states.
    }
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
  this.xp = Math.min(this.xp,XP_MAX);
  return this.xp;
}

PCObject.prototype.getKarma = function() {
  return this.karma;
}

PCObject.prototype.diffKarma = function(diffkarma) {
  diffkarma = parseInt(diffkarma);
  this.karma += diffkarma;
  if (diffkarma < 0) { this.negkarma++; }
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
  let maxmana = this.getBaseInt() + this.getOrbInt();
  if (DU.gameflags.getFlag("pc_abyss")) {
    maxmana = maxmana * 2;
  }
  return maxmana;
}

// returns the amount of damage dealt, -1 if the damage killed the target
PCObject.prototype.dealDamage = function(dmg, src, type) {
  
  let isasleep = this.getSpellEffectsByName("Sleep");
  if (isasleep) {
    isasleep.endEffect();
  }
  
  let isfrozen = this.getSpellEffectsByName("Frozen");
  if (isfrozen) {
    isfrozen.endEffect();
  }

  let isinvuln = this.getSpellEffectsByName("Invulnerable");
  if (isinvuln) {
    dmg = 0;
  }

  dmg = CheckAbsorb(dmg,this,src,type);
  let oldhp = this.getDisplayHP();
  this.modHP(dmg*-1);
  let newhp = this.getDisplayHP();
  
  if (oldhp !== newhp) {
    DrawCharFrame();
    DamageFlash();
  }
  
  if (this.getHP() <= 0) { // killed!
    if (DU.gameflags.getFlag("storymode")) { this.setHP(1); }
    else {
      this.processDeath(1);
      return -1;
    }
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


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
    } else if (idx === "wornlayers") { 
      copydata[idx] = val;
    } else if (idx === "wornlayernudges") {
      copydata[idx] = val;
    } else if (idx === "defwornlayernudges") {
      copydata[idx] = val;
    } else if (idx === "defwornlayers") {
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
  if (newgraphics[4]) { alert("Newgraphic trying to add a layer"); }
}

GameObject.prototype.getGraphic = function() {
	let returnGraphic = this.graphic;
  if (returnGraphic) { return(returnGraphic); }
}

GameObject.prototype.getGraphicArray = function(getbase) {
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
  if (getbase || !this.hasOwnProperty("currframe")) {
    if (this.spritexoffset) {
      returnVars[2] = this.spritexoffset;
    } else {
  	  returnVars[2] = "0";
    }
  } else {
    returnVars[2] = this.currframe;
  }
  if (this.spriteyoffset) {
    returnVars[3] = this.spriteyoffset;
  } else {
  	returnVars[3] = "0";
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
  this.break = function(who, notext, silent) { 
    this.broken = 1; 
    this.setGraphicArray(brokengraphicarray);
    if (!this.fixeddesc) {
      this.fixeddesc = this.getDesc();
    }
    let olddesc = this.getDesc();
    this.setDesc(this.brokendesc);
    //play sound effect
    if (breaksound && who && !silent) {
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
    if (notext) { retval["txt"] = ""; }
    else { retval["txt"] =  "You break the " + olddesc + "!"; }
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
      PC.diffKarma(0-this.getKarmaPenalty());
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
  	let mapdata = { entermap : this.enterto , enterx : this.enterx, entery : this.entery };
  	return mapdata;
  }
}

//Abstract class ManualAnimation
function ManualAnimation(params) {
  // animstart is the spritex values of the first animation frame
  this.animstart = params.animstart;
  this.animlength = params.animlength;  // number of frames
  // animstyle is random, cycle (1-4 and back to 1), pingpong (1-4-1), flow 
  this.animstyle = params.animstyle;
  this.animdir = params.animdir;  // vertical or horizontal, if animstyle is "flow"; 1 or -1, if animstyle is "pingpong"
  // can it animate to the same frame twice in a row?
  this.allowrepeat = 0;
  if (params.allowrepeat) { this.allowrepeat = 1; }
  // min and max duration times. If there are specific frames I want to be able to linger on maybe I'll change this
  this.framedurationmin = params.framedurationmin;
  this.framedurationmax = params.framedurationmax;
  
  // start frame = start or random (start meaning leftmost spritex)
  this.startframe = params.startframe;

  // used to denote if it is on screen or not
  this.animating = 0;

  // will be initially set in startAnimation, which is called in Activate. If this exists, it will be used rather than
  // spritexoffset to determine what to display
  this.currframe; 
  this.currframenum;

  this.startAnimation = function() {
    console.log("startAnimation called for " + this.getName());
    if (this.animstyle === "pingpong") { this.animdir = 1; }
    if (this.startframe === "start") { 
      if (this.animdir === "vertical") {
        this.currframe = this.spriteyoffset;
      } else {
        this.currframe = this.spritexoffset; 
      }
      this.currframenum = 1;
    } 
    else { 
      let sf = Dice.roll("1d"+this.animlength);
      this.currframe = -1*(sf-1)*32 + this.spritexoffset;
      this.currframenum = sf;
    }
    console.log("currframenum: " + this.currframenum);
    console.log("currframe: " + this.currframe);
    this.animating = 0; // this.animating gets saved, but we want it to always start at 0
  }

  this.IWasJustDrawn = function() {
    console.log("IWasJustDrawn (" + this.getName() + ")");
    let who = this;
    if (this.hasOwnProperty("attachedTo")) { who = this.attachedTo; }
    if (who.animating) {
      console.log("Already animating: " + who.animating);
      return; 
    } // animateMe cycle is already going 
    if (who.noAnim) {
      console.log("noAnim set, not (re)starting animating.");
      return;
    }
    who.animating = 1;

    let waittime = Math.floor(Math.random() * (who.framedurationmax - who.framedurationmin +1)) + who.framedurationmin;
    let ts = who;
    setTimeout(function() { ts.animateMe(); }, waittime);
  }

  this.animateMe = function() {
//    console.log("In animateMe " + this.getName() + " , (" + this.getx() + "," + this.gety() + ")");
    if (this.noAnim) { return; }

    if ((this.getSerial() === 1) && (this !== PC)) { console.log("NUKING OLD PC ANIM"); return; }

    let divid = "divid_" + this.getSerial();
    let div = document.getElementById(divid);
    let animated = 0;

    if (this.animstyle === "cycle") {
      this.currframenum++;
      if (this.currframenum > this.animlength) { this.currframenum = 1; }
      this.currframe = -1*(this.currframenum-1)*32 + this.spritexoffset;
    } else if (this.animstyle === "pingpong") {
      this.currframenum = this.currframenum + this.animdir;
      if (this.currframenum === this.animlength) { this.animdir = -1; }
      if (this.currframenum === 1) { this.animdir = 1; }
      this.currframe = -1*(this.currframenum-1)*32 + this.spritexoffset;
    } else if (this.animstyle === "flow") {
      this.currframenum++;
      if (this.currframenum > this.animlength) { this.currframenum = 1; }
      if (this.animdir === "horizontal") {
        this.currframe = -1*(this.currframenum-1) + this.spritexoffset;
      } else {
        this.currframe = -1*(this.currframenum-1) + this.spriteyoffset;
      }
    } else { // random
      let diesize = this.animlength;
      if (!this.allowrepeat) { diesize = diesize-1; }
      let sf = Dice.roll("1d"+diesize);
      if (!this.allowrepeat && (sf >= this.currframenum)) { 
        // if you can't repeat, die size was one too small. Therefore if you roll the current frame or higher, add one.
        sf++; 
      }
      this.currframenum = sf;
      if (this.currframenum > this.animlength) { this.currframenum = 1; }
      this.currframe = -1*(sf-1)*32 + this.spritexoffset;
    }

    let delaymult = 1;
    if (this.animdir === "vertical") {
      if (div) {
        div.style.backgroundPosition = this.spritexoffset + "px " + this.currframe + "px";
        animated = 1;
      }
    } else {
      if (div) {
        div.style.backgroundPosition = this.currframe + "px " + this.spriteyoffset + "px";
        animated = 1;

        if (this.checkType("human")) {
          this.makeLayers(this.currframenum);
          for (let i=0;i<this.layers.length;i++) {
            let fdiv = document.getElementById(divid + "_" + i);
            fdiv.style.backgroundPosition = this.layers[i][2] + "px " + this.layers[i][3] + "px";
          }
          if (this.currframenum === 1) { delaymult = 3; }
        }
      }
    }

    if (this.hasOwnProperty("attachedParts")) {
      // animate the other segments to the same frame
      for (let i=0;i<this.attachedParts.length;i++) {
        divid = "divid_" + this.attachedParts[i].getSerial();
        div = document.getElementById(divid);
        if (div) {
          animated = 1;
          this.attachedParts[i].currframe = -1*(this.currframenum-1)*32 + this.attachedParts[i].spritexoffset;
          if (this.animdir === "vertical") {
            div.style.backgroundPosition = this.attachedParts[i].spritexoffset + "px " + this.attachedParts[i].currframe + "px";
          } else {
            div.style.backgroundPosition = this.attachedParts[i].currframe + "px " + this.attachedParts[i].spriteyoffset + "px";
          }
        }
      }
    }

    if (animated) {
      let waittime = Math.floor(Math.random() * (this.framedurationmax - this.framedurationmin +1)) + this.framedurationmin;
      waittime = waittime * delaymult;
//    if (this.checkType("human")) { console.log(waittime); }
      let ts = this;
      setTimeout(function() { ts.animateMe(); }, waittime);
    } else {
      this.animating = 0;
    }
  }
}

// uncomment if I want to take flowing animations away from animating gifs, but for now that seems fine, honestly
//function UniversalFlowModulator() {
//  universalFlow++;
//  if (universalFlow === 33) { universalFlow = 1;}

//  setTimeout(function() { UniversalFlowModulator(); }, 150);
//}

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

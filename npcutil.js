
function NPCGroup() {
  this.min = 1;
  this.max = 1;
  this.makeup = new Array;
  this.makeup[0] = { name: "test", min: 1, max: 1 };
}
NPCGroup.prototype = new Object;

function Anchor() {
  this.x
  this.y
  this.maxlength;
  this.leashlength;
}
Anchor.prototype = new Object;

function Attack(atk, def) {
  var retval = new Object;
  var type = "weapon";
  if (Math.abs(atk.getx() - def.getx()) > 1) { type = "missile"; }
  if (Math.abs(atk.gety() - def.gety()) > 1) { type = "missile"; }

  var weapon = atk.getEquipment("weapon");
  
  if (type == "missile") {
    // check to see if attacker can use its missile weapon
    var dex = atk.getDex();
    weapon = atk.getEquipment("missile");
    
    if (!weapon) {
      retval["txt"] = "You don't have a missile weapon equipped!";
      retval["fin"] = 0;
      retval["input"] = "&gt;";
      return retval;
    }
    if (dex < weapon.getDexReq()) {
      retval["txt"] = "You are not agile enough to use your weapon!";
      retval["fin"] = 0;
      retval["input"] = "&gt;";
      return retval;
    }
    if (!CanMissileAttack(atk)) {
      retval["txt"] = "Enemy too close. You cannot use your " + weapon.getDesc() + ".";
      retval["fin"] = 0;
      retval["input"] = "&gt;";
      return retval;
    }
    
    var themap = atk.getHomeMap();
      
    var loeresult = themap.getLOS(atk.getx(), atk.gety(), def.getx(), def.gety(), losgrid, 1);
    if (loeresult > LOS_THRESHOLD) {
      retval["txt"] = "You cannot attack that target from here.";
      retval["fin"] = 0;
      retval["input"] = "&gt;";
      return retval;
    }
  } 
  
  if (atk.checkType("pc")) {
    retval["txt"] = "Attack " + def.getDesc();
  } else {
    retval["txt"] =  atk.getDesc() + " attacks " + def.getDesc();
    retval["txt"] = retval["txt"].charAt(0).toUpperCase() + retval["txt"].slice(1);
  }
  
  var tohit = atk.getHitChance(weapon) / 100;
  var defense = def.getDefense() / 100;
  
  tohit = tohit - defense;
  if (tohit < .05) { tohit = .05; }
  
//  var preanim = PreAnimationEffect(mapref, fromx,fromy,tox,toy,graphic,xoffset,yoffset,destgraphic,destxoffset,destyoffset)
  var dmg = 0;
  if (Math.random() <= tohit) {
    // Hit!
    
    dmg = weapon.rollDamage(atk);
    var armor = def.getEquipment("armor");
    var absorb = 0;
    if (armor) {
      absorb = def.getEquipment("armor").getAbsorb() - weapon.getReduceArmor();
      absorb /= 100;
      if (absorb < 0) { absorb = 0; }
    }
    dmg = Math.floor(dmg * (1-absorb));
    if (dmg == 0) { dmg = 1; }  // min dmg 1

    
  }
  else { // Miss!
    // animation and sound here, too
    retval["txt"] = retval["txt"] + " - missed!";
  }
  
  // animate attack
  var fromcoords = getCoords(atk.getHomeMap(),atk.getx(), atk.gety());
  var tocoords = getCoords(def.getHomeMap(),def.getx(), def.gety());

  // get graphic, xoffset, yoffset for graphic
  var ammographic = new Object;
  var duration = 50;
  if (type == "missile") { ammographic = weapon.getAmmoGraphic(atk,def); }
  else { 
    ammographic.graphic = "spacer.gif";
    ammographic.xoffset = 0;
    ammographic.yoffset = 0;
    ammographic.fired = -1;
  }

  var ammocoords = GetCoordsWithOffsets(ammographic.fired, fromcoords, tocoords);

  var tablehtml = '<div id="animtable" style="position: absolute; left: ' + ammocoords.fromx + 'px; top: ' + ammocoords.fromy + 'px; z-index:4; background-image:url(\'graphics/' + ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + ammographic.xoffset + 'px ' + ammographic.yoffset + 'px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
  
  targetCursor.tileid = "#td-tile" + displayspecs.leftedge + "x" + displayspecs.topedge;
  targetCursor.basetile = $(targetCursor.tileid).html(); 
  $(targetCursor.tileid).html($(targetCursor.tileid).html() + tablehtml);
  if (type == "missile") {
    duration = (Math.pow( Math.pow(def.getx() - atk.getx(), 2) + Math.pow (def.gety() - atk.gety(), 2)  , .5)) * 100;
  }
  
  $("#animtable").animate({ left: ammocoords.tox , top: ammocoords.toy } , duration, 'linear', function() {
    $(targetCursor.tileid).html(targetCursor.basetile);
    var hitgraphic = "";
    if (dmg == 0) { hitgraphic = "700.gif"; }
    else { hitgraphic = "702.gif"; }
    var hitanimhtml = '<div id="hitdiv" style="position: absolute; left: ' + tocoords.x + 'px; top: ' + tocoords.y + 'px; z-index:4; background-image:url(\'graphics/' + hitgraphic + '\');background-repeat:no-repeat; background-position: 0px 0px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
    $(targetCursor.tileid).html($(targetCursor.tileid).html() + hitanimhtml);
    setTimeout(function() {
      $(targetCursor.tileid).html(targetCursor.basetile);
      if ((type != "missile") || (!weapon.getAmmoReturn())) {
        duration = 50;
        ammographic.graphic = "spacer.gif";
        ammographic.xoffset = 0;
        ammographic.yoffset = 0;
      }
      returnhtml = '<div id="animtable" style="position: absolute; left: ' + ammocoords.tox + 'px; top: ' + ammocoords.toy + 'px; z-index:4; background-image:url(\'graphics/' + ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + ammographic.xoffset + 'px ' + ammographic.yoffset + 'px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';      
      $(targetCursor.tileid).html($(targetCursor.tileid).html() + returnhtml);
      $("#animtable").animate({ left: ammocoords.fromx , top: ammocoords.fromy } , duration, 'linear', function() {
        $(targetCursor.tileid).html(targetCursor.basetile);
        if (dmg != 0) {
          var stillalive = def.dealDamage(dmg, atk);    
          if (stillalive) {
            var damagedesc = GetDamageDescriptor(def); 
            retval["txt"] += ": " + damagedesc + "!"; 
          }
          else { retval["txt"] += ": Killed!"; }
        } 
        maintext.addText(retval["txt"]);
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        
        atk.endTurn(retval["initdelay"]);

      });
    }, 400);
  });
  
  var tmpval = new Object;
  tmpval["fin"] = -1;
  return tmpval;
}

function GetCoordsWithOffsets(direction, from, to) {

  var fromdisplace = 10;
  var todisplace = 5;

  var coordsobj = new Object;
  coordsobj.fromx = from.x;
  coordsobj.fromy = from.y;
  coordsobj.tox = to.x;
  coordsobj.toy = to.y;

  if ((direction == 7) || (direction == 0) || (direction == 1)) {  // north is a component
    coordsobj.fromy -= fromdisplace;
    coordsobj.toy += todisplace;
  }
  if ((direction >= 1) && (direction <= 3)) { // east is a component
    coordsobj.fromx += fromdisplace;
    coordsobj.tox -= todisplace;
  }
  if ((direction >= 3) && (direction <= 5)) { // south is a component
    coordsobj.fromy += fromdisplace;
    coordsobj.toy -= todisplace;
  }
  if ((direction >= 5) && (direction <= 7)) {  // west is a component
    coordsobj.fromx -= fromdisplace;
    coordsobj.fromy += todisplace;
  }

  return coordsobj;
}
  
function GetDamageDescriptor(who) {
  var ratio = who.getHP() / who.getMaxHP();
  if (ratio > .66) { return ("lightly wounded"); }
  if (ratio > .4) { return ("moderately wounded"); }
  if (ratio > .2) { return ("heavily wounded"); }
  return ("deathly wounded");
}

function CanMissileAttack(who) {
  // looks to see if there are adjacent melee enemies
  var enemystring = "";
  if (who.getAttitude() == "friendly") {
    enemystring = "hostile";
  } else if (who.getAttitude() == "hostile") {
    enemystring = "friendly";
  }
  var themap = who.getHomeMap();
  for (i = -1; i <=1 ; i++) {
    for (j = -1; j <= 1; j++) {
      var tile = themap.getTile(who.getx() + i, who.gety() + j);
      if (tile != "OoB") { 
        var npcs = tile.getNPCs();
        if (npcs) {
          for (k=0; k<npcs.length; k++) {
            if (npcs[k].getAttitude() == enemystring) { return 0; }
          }
        }
      }
    }
  }
  return 1;
}

function SetActiveEffects(who) {
  var effects = who.getSpellEffects();
  effects.sort(function(a,b){ if (a.getName() == b.getName()) {
                                return (b.getPower() - a.getPower());
                              } else {
                                if (a.getName() < b.getName()) { return -1; }
                                else return 1;
                              }  } );
                              
  var currname = "";
  for (var i = 0; i < effects.length; i++ ) {
    if (effects[i].getName() == currname) { effects[i].setActive(0); }
    else {
      effects[i].setActive(1);
      currname = effects[i].getName();
    }
  }
}

function RunEffects(who) {
  var effects = who.getSpellEffects();
  if (effects) {
    for (var i=0; i<effects.length; i++) {
      if (effects[i].getActive()) {
        effects[i].doEffect();
      } 
    } 
  }
  
}

function PickOne(fromarray) {
  var num = fromarray.length;
  var roll = Math.floor(Math.random() * num);
  return fromarray[roll];
}

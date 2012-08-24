
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
    var themap = atk.getHomeMap();
      
    var loeresult = themap.getLOS(atk.getx(), atk.gety(), def.getx(), def.gety(), losgrid, 1);
    if (loeresult > LOS_THRESHOLD) {
      retval["txt"] = "You cannot attack that target from here.";
      retval["fin"] = 0;
      retval["input"] = "&gt;";
      return retval;
    }
  } 
  
  retval["txt"] = "Attack " + def.getDesc();
  
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
  if (type == "missile") { ammographic = weapon.getAmmoGraphic(atk,def); }
  else { 
    ammographic.graphic = "spacer.gif";
    ammographic.xoffset = 0;
    ammographic.yoffset = 0;
  }

  //var tablehtml = '<div id="animtable" style="position: absolute; left: ' + fromcoords.x + 'px; top: ' + fromcoords.y + 'px; z-index:4; background-image:url(\'graphics/035.gif\');background-repeat:no-repeat;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
  var tablehtml = '<div id="animtable" style="position: absolute; left: ' + fromcoords.x + 'px; top: ' + fromcoords.y + 'px; z-index:4; background-image:url(\'graphics/' + ammographic.graphic + '\');background-repeat:no-repeat; background-position: ' + ammographic.xoffset + 'px ' + ammographic.yoffset + 'px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
  //var tablehtml = '<table id="animtable" cellpadding="0" cellspacing="0" border="0" style="position: absolute; left: ' + fromcoords.x + 'px; top: ' + fromcoords.y + 'px; z-index:4;"><tr><td style="background-image:url(\'graphics/' + ammographic.graphic + '\'),background-repeat:no-repeat; background-position: ' + ammographic.xoffset + 'px ' + ammographic.yoffset + 'px;"><img src="graphics/target-cursor.gif" width="32" height="32" /></td></tr></table>';
  //var tablehtml = '<img id="animtable" style="z-index:4; position: absolute; left: ' + fromcoords.x + 'px; top: ' + fromcoords.y + 'px" src="graphics/target-cursor.gif" />';
  
  targetCursor.tileid = "#td-tile" + displayspecs.leftedge + "x" + displayspecs.topedge;
  targetCursor.basetile = $(targetCursor.tileid).html(); 
  $(targetCursor.tileid).html($(targetCursor.tileid).html() + tablehtml);
  var duration = (Math.pow( Math.pow(def.getx() - atk.getx(), 2) + Math.pow (def.gety() - atk.gety(), 2)  , .5)) * 150;
  
  $("#animtable").animate({ left: tocoords.x , top: tocoords.y } , duration, 'linear', function() {
    $(targetCursor.tileid).html(targetCursor.basetile);

  });
}

function PostAnimation1(mapref, frommob, tomob, dmg, retval) {
  
  if (dmg != 0) {
    var stillalive = def.dealDamage(dmg, atk);    
    if (stillalive) {
      var damagedesc = GetDamageDescriptor(def); 
      retval["txt"] += ": " + damagedesc + "!"; 
    }
    else { retval["txt"] += ": Killed!"; }
  } else {
    retval["txt"] = retval["txt"] + " - missed!";
  }
    
  retval["fin"] = 1;
  retval["input"] = "&gt;";
  return retval;
  
}


function GetDamageDescriptor(who) {
  var ratio = who.getHP() / who.getMaxHP();
  if (ratio > .66) { return ("lightly wounded"); }
  if (ratio > .4) { return ("moderately wounded"); }
  if (ratio > .2) { return ("heavily wounded"); }
  return ("deathly wounded");
}
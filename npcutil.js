
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
  } 
  
  retval["txt"] = "Attack " + def.getDesc();
  
  var tohit = atk.getHitChance(weapon) / 100;
  var defense = def.getDefense() / 100;
  
  tohit = tohit - defense;
  if (tohit < .05) { tohit = .05; }
  
  var preanim = PreAnimationEffect(mapref, fromx,fromy,tox,toy,graphic,xoffset,yoffset,destgraphic,destxoffset,destyoffset)
  
  if (Math.random() <= tohit) {
    // Hit!
    // animation and sound here!!!
    
    var dmg = weapon.rollDamage(atk);
    var armor = def.getEquipment("armor");
    var absorb = 0;
    if (armor) {
      absorb = def.getEquipment("armor").getAbsorb() - weapon.getReduceArmor();
      absorb /= 100;
      if (absorb < 0) { absorb = 0; }
    }
    dmg = Math.floor(dmg * (1-absorb));
    if (dmg == 0) { dmg = 1; }  // min dmg 1

    var stillalive = def.dealDamage(dmg, atk);    
    if (stillalive) {
      var damagedesc = GetDamageDescriptor(def); 
      retval["txt"] += ": " + damagedesc + "!"; 
    }
    else { retval["txt"] += ": Killed!"; }
    
  }
  else { // Miss!
    // animation and sound here, too
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
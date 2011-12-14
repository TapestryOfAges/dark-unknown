
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
  
  if (type == "missile") {
    // check to see if attacker can use its missile weapon
    var dex = atk.getDex();
    var weapon = atk.getEquipment("missile");
    
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
  
  var tohit = atk.getHitChance();
  var defense = def.getDefense();
  
  tohit = tohit - defense;
  
}
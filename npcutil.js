
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
  var type = "melee";
  if (Math.abs(atk.getx() - def.getx()) > 1) { type = "missile"; }
  if (Math.abs(atk.gety() - def.gety()) > 1) { type = "missile"; }
  
  var tohit = atk.getHitChance();
}
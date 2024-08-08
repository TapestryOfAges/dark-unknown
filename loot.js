
"use strict";

function LootTable() {
 
   this.goldDice = "0";
   this.goldChance = 100; 
   this.linked = 0;  // only has items if there is gold
   
   this.loot = [];  // array of objects with objname, quantity (dice), and chance
   
   this.trap = ""; // blank, never trapped, otherwise, name of a trap group
}
LootTable.prototype = new Object();

LootTable.prototype.getLoot = function() {
  let lootobj = {};
  lootobj.gold = 0;
  lootobj.lootlist = [];  // array of objnames
  let hasgold = 0;
  
  if ((this.goldDice !== "0") && (Math.random() <= (this.goldChance/100))) {
    lootobj.gold = Dice.roll(this.goldDice);
    hasgold = 1;
  }
  if (this.loot.length) {
    if ((hasgold) || (!this.linked)) {
      for (let i=0; i<this.loot.length; i++) {
        if (Math.random() <= (this.loot[i].chance / 100)) {
          let lootquant = this.loot[i].quantity;
          let theloot = this.loot[i].objname;
          let quant = Dice.roll(this.loot[i].quantity);
          for (let j=1;j<=quant;j++) {
            if (DULootGroups.treasureTypes[theloot]) {
              lootobj.lootlist[lootobj.lootlist.length] = DULootGroups.rollForTreasure(theloot);
            } else {
              lootobj.lootlist[lootobj.lootlist.length] = theloot;
            }
          }
        }
      }
    }
  }
  return lootobj;
}

  
function LootGroups() {
  this.treasureTypes = {};  // lootgroups
}
LootGroups.prototype = new Object();

LootGroups.prototype.setTreasureType = function(ttype, treasure) {
//  ttype = "group_" + ttype;
  this.treasureTypes[ttype] = [];
  for (let i = 0; i< treasure.length ; i=i+2) {
    for (let j = 1; j<=treasure[i+1]; j++) {
      this.treasureTypes[ttype][this.treasureTypes[ttype].length] = treasure[i];
    }
  }
}

LootGroups.prototype.rollForTreasure = function(ttype) {
  let roll = Math.floor(Math.random() * this.treasureTypes[ttype].length);  
  return this.treasureTypes[ttype][roll];
}


function TrapGroups(dart, acid, gas, explosion, drain, level) {
  this.traps = [dart, acid, gas, explosion, drain];
  this.trapnames = ["dart", "acid", "gas", "explosion", "drain"];
  this.level = level;
}
TrapGroups.prototype = new Object();

TrapGroups.prototype.getTrap = function() {   // returns which trap name and what level
                                              // level is Dex with 50% chance to evade
  let dice = Math.floor(Math.random()*100)+1;
  DebugWrite("gameobj", "Getting a trap: rolled " + dice + "<br />");
  let i = 0;
  let resp = {};
  resp.level = this.level;
  while ((dice > 0) && (this.traps[i])){
    if (this.traps[i] > dice) {
      resp.trap = this.trapnames[i];
      DebugWrite("gameobj", "Trap is: " + resp.trap + " , level: " + resp.level + "<br />");
      return resp;
    }
    dice -= this.traps[i];
    i++;
  }
  resp.trap = "";
  return resp; 
}

function SetTraps() {
  let traps = {};
  
  traps["weak"] = new TrapGroups(20,10,0,0,0,12);  // 70% chance of no trap
  traps["medium"] = new TrapGroups(30,20,10,0,0,17); // 40% chance no trap
  traps["strong"] = new TrapGroups(15,15,15,15,15,22); // 25% chance of no trap
  
  return traps;
}

function GetStrongestTrap(loottables) {
  let trap;
  for (let i=0;i<loottables.length;i++) {
    if (DULoot[loottables[i]].trap) {
      if (DULoot[loottables[i]].trap === "strong") { return "strong"; }
      if (DULoot[loottables[i]].trap === "medium") { trap = "medium"; }
      else if ((DULoot[loottables[i]].trap === "weak") && (trap !== "medium")) { trap = "weak"; }
    }
  }
  return trap;
}
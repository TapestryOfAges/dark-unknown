
function LootTable() {
 
   this.goldDice = "0";
   this.goldChance = 100; 
   this.linked = 0;
   
   this.loot = new Array;  // array of objects with objname, quantity (dice), and chance
   
}
LootTable.prototype = new Object;

LootTable.prototype.getLoot = function() {
  var lootobj = new Object;
  lootobj.gold = 0;
  lootobj.lootlist = new Array;  // array of objnames
  var hasgold = 0;
  
  if ((this.goldDice) && (Math.random() <= (this.goldChance/100))) {
    lootobj.gold = RollDice(this.goldDice);
    hasgold = 1;
  }
  if (this.loot.length) {
    if ((hasgold) || (!this.linked)) {
      for (i =0; i<this.loot.length; i++) {
        if (Math.random() <= (this.loot[i].chance / 100)) {
          var lootquant = this.loot[i].quantity;
          var theloot = this.loot[i].objname;
          var quant = RollDice(this.loot[i].quantity);
          for (j=1;j<=quant;j++) {
            if (theloot.match("_")) {
              lootobj.lootlist[lootobj.lootlist.length] = DULootGroups.rollForTreasure(lootobj);
            } else {
              lootobj.lootlist[lootobj.lootlist.length] = this.loot[i].objname;
            }
          }
        }
      }
    }
  }
  return lootobj;
}

  
function LootGroups() {
  this.treasureTypes = new Object;  // lootgroups
}
LootGroups.prototype = new Object;

LootGroups.prototype.setTreasureType = function(ttype, treasure) {
  ttype = "group_" + ttype;
  this.treasureTypes[ttype] = new Array;
  for (var i = 0; i< treasure.length ; i=i+2) {
    for (var j = 1; j<=treasure[i+1]; j++) {
      this.treasureTypes[ttype][this.treasureTypes[ttype].length] = treasure[i];
    }
  }
}

LootGroups.prototype.rollForTreasure = function(ttype) {
  var roll = Math.floor(Math.random() * this.treasureTypes[ttype].length);  
  return this.treasureTypes[ttype][roll];
}


function SetLoots() {
  var loots = new Object;
  
  loots["small animal"] = new LootTable;
  loots["small animal"].goldDice = "1d3";
  loots["small animal"].goldChance = 30;
  
  loots["orcs"] = new LootTable;
  loots["orcs"].goldDice = "2d5";
  loots["orcs"].goldChance = 60;
  loots["orcs"].loot[0] = new Object;
  loots["orcs"].loot[0].objname = "Dagger";
  loots["orcs"].loot[0].chance = "90";
  loots["orcs"].loot[0].quantity = "1";

  
  
  return loots;
}

function SetLootGroups() {
  var DULootGroup = new LootGroups();
  
  DULootGroup.setTreasureType("smallweapons",
                              ["Dagger", 2,
                               "Shortsword", 1]);
                               
                               
  return DULootGroup;
}
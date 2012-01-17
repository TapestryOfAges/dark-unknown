
function LootTable() {
 
   this.goldDice = "0";
   this.goldChance = 100; 
   
   this.loot = new Array;  // array of objects with objname, quantity (dice), and chance
   
}
LootTable.prototype = new Object;

LootTable.prototype.getLoot = function() {
  var lootobj = new Object;
  lootobj.gold = 0;
  lootobj.lootlist = new Array;  // array of objnames
  
  if ((this.goldDice) && (Math.random() <= (this.goldChance/100))) {
    lootobj.gold = RollDice(this.goldDice);
  }
  if (this.loot.length) {
    for (i =0; i<this.loot.length; i++) {
      if (Math.random() <= (this.loot[i].chance / 100)) {
        var quant = RollDice(this.loot[i].quantity);
        for (j=1;j<=quant;j++) {
          lootobj.lootlist[lootobj.lootlist.length] = this.loot[i].objname;
        }
      }
    }
  }
  return lootobj;
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
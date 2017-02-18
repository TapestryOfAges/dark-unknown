"use strict";

function SetMerchants() {
  var bill = {};
  // Hildendain
  bill.aaron = {};
  bill.aaron.stock = [ { item: "Dagger", quantity: 10, price: 5, desc: "Dagger", presale: '"Small, but deadly."', sale: '"Thank you. May it serve you well."' },
                    { item: "Shortsword", quantity: 10, price: 50, desc: "Shortsword", presale: '"Quality goods, I promise you."', sale: '"Thank you. May it serve you well."' },
                    { item: "Mace", quantity: 7, price: 200, desc: "Mace", presale: '"Got some heft to it."', sale: '"Thank you. May it serve you well."' },
                    { item: "Axe", quantity: 4, price: 500, desc: "Axe", presale: '"Good for chopping people out of armor."', sale: '"Thank you. May it serve you well."'},
                    { item: "Longsword", quantity: 0, price: 1700}, 
                    { item: "Halberd", quantity: 0, price: 3500},
                    { item: "MagicSword", quantity: 0, price: 6000, desc: "Magic Sword"} ];
  bill.aaron.type = "stuff";
  
  // Onyx
  bill.gretchen = {};
  bill.gretchen.stock = [ { item: "Dagger", quantity: 5, price: 10, desc: "Dagger", sale: '"Remember, keep this between us."' },
                    { item: "Shortsword", quantity: 5, price: 75, desc: "Shortsword", sale: '"Remember, keep this between us."' },
                    { item: "Mace", quantity: 5, price: 260, desc: "Mace", sale: '"Remember, keep this between us."' },
                    { item: "Axe", quantity: 3, price: 650, desc: "Axe", sale: '"Remember, keep this between us."'},
                    { item: "Longsword", quantity: 0, price: 2200, desc: "Longsword", sale: '"Remember, keep this between us."'}, 
                    { item: "Halberd", quantity: 0, price: 4200, desc: "Halberd", sale: '"Remember, keep this between us."'},
                    { item: "MagicSword", quantity: 0, price: 6600, desc: "Magic Sword"}, 
                  ];
  bill.gretchen.type = "stuff";
  
  // Beldskae
  bill.ariel = {};
  bill.ariel.stock = [ { item: "Dagger", quantity: 10, price: 7, desc: "Dagger", sale: '"May your blade be sharp."' },
                    { item: "Shortsword", quantity: 10, price: 60, desc: "Shortsword", sale: '"May your blade be sharp."' },
                    { item: "Mace", quantity: 10, price: 220, desc: "Mace", presale: '"Heavy enough to crush bone!"', sale: '"Thank you for your patronage!"' },
                    { item: "Axe", quantity: 10, price: 575, desc: "Axe", presale: '"For when you absolutely need to chop something in half."', sale: '"Thank you for your patronage!"'},
                    { item: "Longsword", quantity: 0, price: 1800, desc: "Longsword", sale: '"May your blade be sharp."'}, 
                    { item: "Halberd", quantity: 0, price: 3500, desc: "Halberd", sale: '"Enjoy your glaive. Halberd? I can never keep track, to be honest."'},
                    { item: "MagicSword", quantity: 0, price: 6600, desc: "Magic Sword"}, 
                  ];
  bill.ariel.type = "stuff";
               
  bill.lisa = {};
  bill.lisa.stock = [ { item: "Sling", quantity: 99, price: 25, sale: '"Thank you, come again."' }, 
                       { item: "Bow", quantity: 15, price: 500, sale: '"Thank you, come again."' },
                       { item: "Crossbow", quantity: 10, price: 3000, sale: '"Thank you, come again."' },
                       { item: "Wand", quantity: 0, price: 5000 },
                       { item: "MagicAxe", quantity: 0, price: 7500, desc: "Magic Axe" },
                  ];
  bill.lisa.type = "stuff";
    
  bill.erin = {};
  bill.erin.stock = [ { item: "ClothArmor", quantity: 10, price: 10, desc: "Cloth Armor", sale: '"May it serve you well."' },
                       { item: "LeatherArmor", quantity: 10, price: 50, desc: "Leather Armor", sale: '"May it serve you well."' },
                       { item: "ChainArmor", quantity: 5, price: 1000, desc: "Chain Mail", sale: '"May it serve you well."' },
                       { item: "PlateArmor", quantity: 0, price: 2000, desc: "Plate Armor" },
                  ];
  bill.erin.type = "stuff";

  bill.deirdre = {};
  bill.deirdre.stock = [ { item: "ClothArmor", quantity: 25, price: 10, desc: "Cloth Armor", sale: '"It will protect you in your adventures!."' },
                       { item: "LeatherArmor", quantity: 25, price: 50, desc: "Leather Armor", sale: '"It will protect you in your adventures!."' },
                       { item: "ChainArmor", quantity: 20, price: 1000, desc: "Chain Mail", sale: '"It will protect you in your adventures!."' },
                       { item: "PlateArmor", quantity: 10, price: 2500, desc: "Plate Armor", sale: '"It will protect you in your adventures!."' },
                  ];
  bill.deirdre.type = "stuff";
  

  bill.brooke = {};
  bill.brooke.stock = [ { item: "RedPotion", quantity: 2, price: 50, desc: "Red Potion", sale: '"I added extra sugar, to make it go down easier."', sellqty: 1},
                        { item: "YellowPotion", quantity: 4, price: 35, desc: "Yellow Potion", sale: '"You can never have too many of these."', sellqty: 1},
                                ];
  bill.brooke.type = "stuff";

  bill.alexis = {};
  bill.alexis.stock = [ { item: "DistractSpell", desc: "Distract", lvl: SPELL_DISTRACT_LEVEL, sid: SPELL_DISTRACT_ID, price: 100, sale: '"A simple glamour, but a useful one."'},
                  { item: "FlameBladeSpell", desc: "Flame Blade", lvl:SPELL_FLAME_BLADE_LEVEL, sid: SPELL_FLAME_BLADE_ID, price: 100, sale: '"Comes in your choice of red or blue!"'},
                  { item: "MendSpell", desc: "Mend", lvl: SPELL_MEND_LEVEL, sid: SPELL_MEND_ID, price: 100, sale: '"Excellent at keeping your boots in good repair."'},
                  { item: "LesserHealSpell", desc: "Lesser Heal", lvl: SPELL_LESSER_HEAL_LEVEL, sid: SPELL_LESSER_HEAL_ID, price: 200, sale: '"Guaranteed to make you feel better."'},
                  { item: "MagicBoltSpell", desc: "Magic Bolt", lvl: SPELL_MAGIC_BOLT_LEVEL, sid: SPELL_MAGIC_BOLT_ID, price: 200, sale: '"The easiest of the spells that do damage directly."'},
                  { item: "ProtectionSpell", desc: "Protection", lvl: SPELL_PROTECTION_LEVEL, sid: SPELL_PROTECTION_ID, price: 200, sale: '"Because it\'s often better to just prevent the damage in the first place."'},
                  { item: "FireArmorSpell", desc: "Fire Armor", lvl: SPELL_FIRE_ARMOR_LEVEL, sid: SPELL_FIRE_ARMOR_ID, price: 400, sale: '"Alas, it only comes in red."'},
                  { item: "WallofFlameSpell", desc: "Wall of Flame", lvl: SPELL_WALL_OF_FLAME_LEVEL, sid: SPELL_WALL_OF_FLAME_ID, price: 400, sale: '"This? Also just red."'},
                ];
  bill.alexis.type = "spells"; 
  
  bill.megan = {};
  bill.megan.stock = [ { item: "DistractSpell", desc: "Distract", lvl: SPELL_DISTRACT_LEVEL, sid: SPELL_DISTRACT_ID, price: 150},
                  { item: "FireArmorSpell", desc: "Fire Armor", lvl: SPELL_FIRE_ARMOR_LEVEL, sid: SPELL_FIRE_ARMOR_ID, price: 600},
                  { item: "IceballSpell", desc: "Iceball", lvl: SPELL_ICEBALL_LEVEL, sid: SPELL_ICEBALL_ID, price: 600},
                  { item: "TelepathySpell", desc: "Telepathy", lvl: SPELL_TELEPATHY_LEVEL, sid: SPELL_TELEPATHY_ID, price: 600},
                  { item: "HealSpell", desc: "Heal", lvl: SPELL_HEAL_LEVEL, sid: SPELL_HEAL_ID, price: 1000},
                  { item: "ParalyzeSpell", desc: "Paralyze", lvl: SPELL_PARALYZE_LEVEL, sid: SPELL_PARALYZE_ID, price: 1300},
                  { item: "ShockwaveSpell", desc: "Shockwave", lvl: SPELL_SHOCKWAVE_LEVEL, sid: SPELL_SHOCKWAVE_ID, price: 1300},
                  { item: "ShockwaveSpell", desc: "Swordstrike", lvl: SPELL_SWORDSTRIKE_LEVEL, sid: SPELL_SWORDSTRIKE_ID, price: 1300},
                ];
  bill.megan.type = "spells"; 

  bill.dale = {};
  bill.dale.stock = [ { item: "DisarmTrapSpell", desc: "Disarm Trap", lvl: SPELL_DISARM_TRAP_LEVEL, sid: SPELL_DISARM_TRAP_ID, price: 100},
                  { item: "VulnerabilitySpell", desc: "Vulnerability", lvl: SPELL_VULNERABILITY_LEVEL, sid: SPELL_VULNERABILITY_ID, price: 100},
                  { item: "MagicBoltSpell", desc: "Magic Bolt", lvl: SPELL_MAGIC_BOLT_LEVEL, sid: SPELL_MAGIC_BOLT_ID, price: 200},
                  { item: "DisruptUndeadSpell", desc: "Disrupt Undead", lvl: SPELL_DISRUPT_UNDEAD_LEVEL, sid: SPELL_DISRUPT_UNDEAD_ID, price: 400},
                  { item: "TelekinesisSpell", desc: "Telekinesis", lvl: SPELL_TELEKINESIS_LEVEL, sid: SPELL_TELEKINESIS_ID, price: 400},
                  { item: "LifeDrainSpell", desc: "Life Drain", lvl: SPELL_LIFE_DRAIN_LEVEL, sid: SPELL_LIFE_DRAIN_ID, price: 750},
                  { item: "SmiteSpell", desc: "Smite", lvl: SPELL_SMITE_LEVEL, sid: SPELL_SMITE_ID, price: 750},
                  { item: "CrystalBarrierSpell", desc: "Crystal Barrier", lvl: SPELL_CRYSTAL_BARRIER_LEVEL, sid: SPELL_CRYSTAL_BARRIER_ID, price: 1100},
                ];
  bill.dale.type = "spells"; 
  
  return bill;
}


function DisplayWares(who) {
  var stocks = DU.merchants[who.getMerch()];
  var code = 65; // ascii for A, to associate array index with letter for choice

  if (stocks.type === "stuff") {
    $.each(stocks.stock, function(idx, val) {    
      var qty = val.quantity;
      if (qty) {
        var displayname = val.item;
        if (val.desc) { displayname = val.desc; }
        if ((qty > 0) && (qty <= 99)) {
          displayname = displayname + " (qty: " + qty + ")";
        }
//        var spaces = 23 - displayname.length;
        var addme = String.fromCharCode(code+idx) + ") " + displayname;
//        for (var i=0; i<spaces; i++) {
//          addme = addme + "-";
//        }
        var price = val.price + " gp";
//        spaces = 8-price.length;
//        if (spaces < 8) {
//          for (var i = 0; i<spaces; i++) {
//            price = "=" + price;
//          }
//        }
        var addedtext = addme + "<span style='float:right'>" + price + "</span>";
//        addme = addme + price;
        maintext.addText(addedtext);
      }
    });
    
    return 1;
  } else if (stocks.type === "spells") {
//    var anyspells = [];
    var yesspells = 0;
    $.each(stocks.stock, function(idx, val) {
//      if (!PC.knowsSpell(val.lvl, val.sid)) { 
        if (!yesspells) {
          conversations[who.getConversation()].say(who, conversations[who.getConversation()]["_startbuy"].responses[1]);
        }
//        anyspells.push(idx);
        yesspells = 1;
        var displayname = val.desc + " (lvl: " + val.lvl + ")";
//        var spaces = 23 - displayname.length;
        var addme = String.fromCharCode(code+idx) + ") " + displayname;
//        for (var i=0; i<spaces; i++) {
//          addme = addme + "&nbsp;";
//        }
        var price = val.price + " gp";
//        spaces = 8-price.length;
//        if (spaces < 8) {
//          for (var i = 0; i<spaces; i++) {
//            price = "&nbsp;" + price;
//          }
//        }
//        addme = addme + price;
        var addedtext = addme + "<span style='float:right'>" + price + "</span>";
        if (PC.knowsSpell(val.lvl, val.sid)) {
          addedtext = "<span style='color:aaa'>" + addedtext + "</span>";
        }
        maintext.addText(addedtext);
        
//      }
    });
    if (!yesspells) {
      conversations[who.getConversation()].say(who, conversations[who.getConversation()]["_knowsall"].responses[1]);
      return 0;
    }
    return 1;
  }
  else { alert("Bad merchant. (No biscuit)."); }
}

function GetSellBack(seller, merchant) {
  var stocks = DU.merchants[merchant.getMerch()];
  var code = 65; // ascii for A, to associate array index with letter for choice
  var selllist = [];

  $.each(stocks.stock, function(idx, val) { 
    var ininv = seller.checkInventory(val.item);
    if (ininv) {
      var qty = ininv.getQuantity();
      if ((ininv === seller.getArmor()) || (ininv === seller.getWeapon()) || (ininv === seller.getMissile())) {
        qty = qty-1;
      }
      if (qty) {
        var displayname = ininv.desc;
        displayname = displayname + " (" + qty + ")";
//        var spaces = 23 - displayname.length;
        var addme = String.fromCharCode(code+idx) + ") " + displayname;
//        for (var i=0; i<spaces; i++) {
//          addme = addme + "&nbsp;";
//        }
        var price = Math.ceil(val.price/10) + " gp";
//        spaces = 8-price.length;
//        if (spaces < 8) {
//          for (var i = 0; i<spaces; i++) {
//            price = "&nbsp;" + price;
//          }
//        }
//        addme = addme + price;
        var addedtext = addme + "<span style='float:right'>" + price + "</span>";
        selllist.push(addedtext);
      }
    }
  });
  
  return selllist;
}

function HasStock(whose) {
  if (DU.merchants[whose]) {
    if (DU.merchants[whose].type === "spells") { return 1; }
    for (var i = 0; i < DU.merchants[whose].stock.length; i++) {
      if (DU.merchants[whose].stock[i].quantity > 0) { return 1; }
    }
  }
}
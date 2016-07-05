"use strict";

function SetMerchants() {
  var bill = {};
  bill.aaron = {};
  bill.aaron.stock = [ { item: "Dagger", quantity: 10, price: 5, sale: '"Thank you. May it serve you well."' },
                    { item: "Shortsword", quantity: 10, price: 50, sale: '"Thank you. May it serve you well."' },
                    { item: "Mace", quantity: 7, price: 200, sale: '"Thank you. May it serve you well."' },
                    { item: "Axe", quantity: 4, price: 500, sale: '"Thank you. May it serve you well."'},
                    { item: "Longsword", quantity: 0, price: 1700}, 
                    { item: "Halberd", quantity: 0, price: 3500},
                    { item: "MagicSword", quantity: 0, price: 6000, desc: "Magic Sword"} ];
  bill.aaron.type = "stuff";
  
  bill.gretchen = {};
  bill.gretchen.stock = [ { item: "Dagger", quantity: 5, price: 10, sale: '"Remember, keep this between us."' },
                    { item: "Shortsword", quantity: 5, price: 75, sale: '"Remember, keep this between us."' },
                    { item: "Mace", quantity: 5, price: 260, sale: '"Remember, keep this between us."' },
                    { item: "Axe", quantity: 3, price: 650, sale: '"Remember, keep this between us."'},
                    { item: "Longsword", quantity: 2, price: 2200, sale: '"Remember, keep this between us."'}, 
                    { item: "Halberd", quantity: 1, price: 4200, sale: '"Remember, keep this between us."'},
                    { item: "MagicSword", quantity: 0, price: 6600, desc: "Magic Sword"}, 
                  ];
  bill.gretchen.type = "stuff";
  
  bill.ariel = {};
  bill.ariel.stock = [ { item: "Dagger", quantity: 10, price: 7, sale: '"May your blade be sharp."' },
                    { item: "Shortsword", quantity: 10, price: 60, sale: '"May your blade be sharp."' },
                    { item: "Mace", quantity: 10, price: 220, sale: '"Heavy enough to crush bone!"' },
                    { item: "Axe", quantity: 10, price: 575, sale: '"For when you absolutely need to chop something in half."'},
                    { item: "Longsword", quantity: 10, price: 1800, sale: '"May your blade be sharp."'}, 
                    { item: "Halberd", quantity: 10, price: 3500, sale: '"Enjoy your glaive. Halberd? I can never keep track, to be honest."'},
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
  bill.erin.stock = [ { item: "ClothArmor", quantity: 10, price: 100, desc: "Cloth Armor", sale: '"May it serve you well."' },
                       { item: "LeatherArmor", quantity: 10, price: 400, desc: "Leather Armor", sale: '"May it serve you well."' },
                       { item: "ChainArmor", quantity: 5, price: 2000, desc: "Chain Mail", sale: '"May it serve you well."' },
                       { item: "PlateArmor", quantity: 0, price: 4000, desc: "Plate Armor" },
                  ];
  bill.erin.type = "stuff";

  bill.deirdre = {};
  bill.deirdre.stock = [ { item: "ClothArmor", quantity: 25, price: 100, desc: "Cloth Armor", sale: '"It will protect you in your adventures!."' },
                       { item: "LeatherArmor", quantity: 25, price: 400, desc: "Leather Armor", sale: '"It will protect you in your adventures!."' },
                       { item: "ChainArmor", quantity: 20, price: 2000, desc: "Chain Mail", sale: '"It will protect you in your adventures!."' },
                       { item: "PlateArmor", quantity: 10, price: 5000, desc: "Plate Armor", sale: '"It will protect you in your adventures!."' },
                  ];
  bill.deirdre.type = "stuff";
  

  bill.brooke = {};
  bill.brooke.stock = [ { item: "RedPotion", quantity: 2, price: 50, desc: "Red Potion", sale: '"I added extra sugar, to make it go down easier."', sellqty: 1},
                        { item: "YellowPotion", quantity: 4, price: 35, desc: "Yellow Potion", sale: '"You can never have too many of these."', sellqty: 1},
                                ];
  bill.brooke.type = "stuff";

  bill.alexis = {};
  bill.alexis.stock = [ { item: "DistractSpell", desc: "Distract", lvl: 1, sid: GetSpellID(4), price: 100, sale: '"A simple glamour, but a useful one."'},
                  { item: "FlameBladeSpell", desc: "Flame Blade", lvl:1, sid: GetSpellID(5), price: 100, sale: '"Comes in your choice of red or blue!"'},
                  { item: "MendSpell", desc: "Mend", lvl: 1, sid: GetSpellID(7), price: 100, sale: '"Excellent at keeping your boots in good repair."'},
                  { item: "LesserHealSpell", desc: "Lesser Heal", lvl: 2, sid: GetSpellID(3), price: 200, sale: '"Guaranteed to make you feel better."'},
                  { item: "MagicBoltSpell", desc: "Magic Bolt", lvl: 2, sid: GetSpellID(4), price: 200, sale: '"The easiest of the spells that do damage directly."'},
                  { item: "ProtectSpell", desc: "Protect", lvl: 2, sid: GetSpellID(6), price: 200, sale: '"Because it\'s often better to just prevent the damage in the first place."'},
                  { item: "FireArmorSpell", desc: "Fire Armor", lvl: 3, sid: GetSpellID(3), price: 400, sale: '"Alas, it only comes in red."'},
                  { item: "WallofFlameSpell", desc: "Wall of Flame", lvl: 3, sid: GetSpellID(8), price: 400, sale: '"This? Also just red."'},
                ];
  bill.alexis.type = "spells"; 
  
  bill.megan = {};
  bill.megan.stock = [ { item: "DistractSpell", desc: "Distract", lvl: 1, sid: GetSpellID(4), price: 150},
                  { item: "FireArmorSpell", desc: "Fire Armor", lvl: 3, sid: GetSpellID(3), price: 600},
                  { item: "IceballSpell", desc: "Iceball", lvl: 3, sid: GetSpellID(5), price: 600},
                  { item: "TelepathySpell", desc: "Telepathy", lvl: 3, sid: GetSpellID(7), price: 600},
                  { item: "HealSpell", desc: "Heal", lvl: 4, sid: GetSpellID(4), price: 1000},
                  { item: "ParalyzeSpell", desc: "Paralyze", lvl: 5, sid: GetSpellID(3), price: 1300},
                  { item: "ShockwaveSpell", desc: "Shockwave", lvl: 5, sid: GetSpellID(6), price: 1300},
                  { item: "ShockwaveSpell", desc: "Swordstrike", lvl: 5, sid: GetSpellID(8), price: 1300},
                ];
  bill.megan.type = "spells"; 

  bill.megan = {};
  bill.megan.stock = [ { item: "DisarmTrapSpell", desc: "Disarm Trap", lvl: 1, sid: GetSpellID(3), price: 100},
                  { item: "VulnerabilitySpell", desc: "Vulnerability", lvl: 1, sid: GetSpellID(8), price: 100},
                  { item: "MagicBoltSpell", desc: "Magic Bolt", lvl: 2, sid: GetSpellID(4), price: 200},
                  { item: "DisruptUndeadSpell", desc: "Disrupt Undead", lvl: 3, sid: GetSpellID(2), price: 400},
                  { item: "TelekinesisSpell", desc: "Telekinesis", lvl: 3, sid: GetSpellID(6), price: 400},
                  { item: "LifeDrainSpell", desc: "Life Drain", lvl: 4, sid: GetSpellID(5), price: 750},
                  { item: "SmiteSpell", desc: "Smite", lvl: 4, sid: GetSpellID(6), price: 750},
                  { item: "CrystalBarrierSpell", desc: "Crystal Barrier", lvl: 5, sid: GetSpellID(1), price: 1100},
                ];
  bill.megan.type = "spells"; 
  
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
          displayname = displayname + " (" + qty + ")";
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
        var displayname = val.desc + " (" + val.lvl + ")";
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
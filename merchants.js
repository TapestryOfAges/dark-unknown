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
  bill.ariel.stock = [ { item: "Dagger", quantity: 10, price: 7, sale: '"Remember, keep this between us."' },
                    { item: "Shortsword", quantity: 10, price: 60, sale: '"Remember, keep this between us."' },
                    { item: "Mace", quantity: 10, price: 220, sale: '"Remember, keep this between us."' },
                    { item: "Axe", quantity: 10, price: 575, sale: '"Remember, keep this between us."'},
                    { item: "Longsword", quantity: 10, price: 1800, sale: '"Remember, keep this between us."'}, 
                    { item: "Halberd", quantity: 10, price: 3500, sale: '"Remember, keep this between us."'},
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
  
  bill.low_alchemist = {};
  bill.low_alchemist.stock = [ { item: "RedPotion", quantity: 10, price: 80, desc: "Red Potion"},
                               { item: "YellowPotion", quantity: 25, price: 75, desc: "Yellow Potion"},
                                ];
  bill.low_alchemist.type = "stuff";

  bill.brooke = {};
  bill.brooke.stock = [ { item: "RedPotion", quantity: 2, price: 50, desc: "Red Potion"},
                        { item: "YellowPotion", quantity: 4, price: 35, desc: "Yellow Potion"},
                                ];
  bill.brooke.type = "stuff";

  bill.alexis = {};
  bill.alexis.stock = [ { item: "DisarmTrapSpell", desc: "Disarm Trap", lvl: 1, sid: GetSpellID(2), price: 100} ,
                  { item: "DistractSpell", desc: "Distract", lvl: 1, sid: GetSpellID(3), price: 100},
                  { item: "FlameBladeSpell", desc: "Flame Blade", lvl:1, sid: GetSpellID(4), price: 100},
                  { item: "StrikeSpell", desc: "Strike", lvl: 1, sid: GetSpellID(6), price: 100},
                  { item: "LesserHealSpell", desc: "Lesser Heal", lvl: 2, sid: GetSpellID(2), price: 200},
                  { item: "MagicBoltSpell", desc: "Magic Bolt", lvl: 2, sid: GetSpellID(3), price: 200},
                  { item: "ProtectSpell", desc: "Protect", lvl: 2, sid: GetSpellID(5), price: 200},
                  { item: "FireArmorSpell", desc: "Fire Armor", lvl: 3, sid: GetSpellID(1), price: 400},
                ];
  bill.alexis.type = "spells";
  
  bill.ivan = {};
  bill.ivan.stock = [ { item: "LesserHealSpell", desc: "Lesser Heal", lvl: 2, sid: GetSpellID(2), price: 150},
                { item: "ProtectSpell", desc: "Protect", lvl: 2, sid: GetSpellID(5), price: 150},
                { item: "IllusionSpell", desc: "Illusion", lvl: 2, sid: GetSpellID(1), price: 150},
                { item: "TelekinesisSpell", desc: "Telekinesis", lvl: 3, sid: GetSpellID(5), price: 330},
                { item: "HealSpell", desc: "Heal", lvl: 4, sid: GetSpellID(2), price: 700},
              ];
  bill.ivan.type = "spells";
  
  
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

function SetMerchants() {
  var bill = {};
  bill.low_wpns = {};
  bill.low_wpns.stock = [ { item: "Dagger", quantity: 99, price: 5 },
                    { item: "Shortsword", quantity: 99, price: 45 },
                    { item: "Mace", quantity: 99, price: 200 },
                    { item: "Axe", quantity: 99, price: 500},
                    { item: "Longsword", quantity: 0, price: 1700}, 
                    { item: "Halberd", quantity: 0, price: 3500},
                    { item: "MagicSword", quantity: 0, price: 6000, desc: "Magic Sword"} ];
  bill.low_wpns.type = "stuff";
  
  bill.all_wpns = {};
  bill.all_wpns.stock = [ { item: "Dagger", quantity: 99, price: 10 },
                    { item: "Shortsword", quantity: 99, price: 60 },
                    { item: "Mace", quantity: 99, price: 240 },
                    { item: "Axe", quantity: 99, price: 560},
                    { item: "Longsword", quantity: 99, price: 2000}, 
                    { item: "Halberd", quantity: 99, price: 4200},
                    { item: "MagicSword", quantity: 0, price: 6600, desc: "Magic Sword"}, 
                  ];
  bill.all_wpns.type = "stuff";
  
  bill.poverty_wpns = {};
  bill.poverty_wpns.stock = [ { item: "Dagger", quantity: 99, price: 5 },
                           { item: "Shortsword", quantity: 99, price: 30 },
                           { item: "Mace", quantity: 99, price: 160 },
                           { item: "Sling", quantity: 99, price: 35 },
                   ];       
  bill.poverty_wpns.type = "stuff";
             
  bill.low_missile = {};
  bill.low_missile.stock = [ { item: "Sling", quantity: 99, price: 50 }, 
                       { item: "Bow", quantity: 99, price: 500 },
                       { item: "Crossbow", quantity: 0, price: 1000 },
                       { item: "Wand", quantity: 0, price: 5000 },
                       { item: "MagicAxe", quantity: 0, price: 7500, desc: "Magic Axe" },
                  ];
  bill.low_missile.type = "stuff";
  
  bill.all_missile = {};
  bill.all_missile.stock = [ { item: "Sling", quantity: 99, price: 60 }, 
                       { item: "Bow", quantity: 99, price: 600 },
                       { item: "Crossbow", quantity: 99, price: 2000 },
                       { item: "Wand", quantity: 0, price: 5000 },
                       { item: "MagicAxe", quantity: 0, price: 7500, desc: "Magic Axe" },
                  ];
  bill.all_missile.type = "stuff";
  
  bill.low_armor = {};
  bill.low_armor.stock = [ { item: "ClothArmor", quantity: 99, price: 100, desc: "Cloth Armor" },
                       { item: "LeatherArmor", quantity: 99, price: 400, desc: "Leather Armor" },
                       { item: "ChainArmor", quantity: 99, price: 2000, desc: "Chain" },
                       { item: "PlateArmor", quantity: 0, price: 4000, desc: "Plate" },
                  ];
  bill.low_armor.type = "stuff";
  
  bill.low_alchemist = {};
  bill.low_alchemist.stock = [ { item: "RedPotion", quantity: 10, price: 80, desc: "Red Potion"},
                               { item: "YellowPotion", quantity: 25, price: 75, desc: "Yellow Potion"},
                                ];
  bill.low_alchemist.type = "stuff";

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
        if ((qty > 0) && (qty < 99)) {
          displayname = displayname + " (" + qty + ")";
        }
        var spaces = 23 - displayname.length;
        var addme = String.fromCharCode(code+idx) + ") " + displayname;
        for (var i=0; i<spaces; i++) {
          addme = addme + "&nbsp;";
        }
        var price = val.price + " gp";
        spaces = 8-price.length;
        if (spaces < 8) {
          for (var i = 0; i<spaces; i++) {
            price = "&nbsp;" + price;
          }
        }
        addme = addme + price;
        maintext.addText(addme);
      }
    });
    
    return 1;
    // WORKING HERE
  } else if (stocks.type === "spells") {
//    var anyspells = [];
    var yesspells = 0;
    $.each(stocks.stock, function(idx, val) {
      if (!PC.knowsSpell(val.lvl, val.sid)) { 
        if (!yesspells) {
          conversations[who.getConversation()].say(who, conversations[who.getConversation()]["_startbuy"].responses[1]);
        }
//        anyspells.push(idx);
        yesspells = 1;
        var displayname = val.desc + " (" + val.lvl + ")";
        var spaces = 23 - displayname.length;
        var addme = String.fromCharCode(code+idx) + ") " + displayname;
        for (var i=0; i<spaces; i++) {
          addme = addme + "&nbsp;";
        }
        var price = val.price + " gp";
        spaces = 8-price.length;
        if (spaces < 8) {
          for (var i = 0; i<spaces; i++) {
            price = "&nbsp;" + price;
          }
        }
        addme = addme + price;
        maintext.addText(addme);
        
      }
    });
    if (!yesspells) {
      conversations[who.getConversation()].say(who, conversations[who.getConversation()]["_knowsall"].responses[1]);
      return 0;
    }
    return 1;
  }
  else { alert("Bad merchant. (No biscuit)."); }
}
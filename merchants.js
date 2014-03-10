
function SetMerchants() {
  var bill = {};
  bill.low_wpns = {};
  bill.low_wpns.stock = [ { item: "Dagger", quantity: 99, price: 5 },
                    { item: "Shortsword", quantity: 99, price: 45 },
                    { item: "Mace", quantity: 99, price: 200 },
                    { item: "Axe", quantity: 99, price: 500},
                    { item: "Longsword", quantity: 0, price: 1700}, 
                    { item: "Halberd", quantity: 0, price: 3500},
                    { item: "MagicSword", quantity: 0, price: 6000}, ];
  bill.low_wpns.type = "stuff";
  
  bill.all_wpns = {};
  bill.all_wpns.stock = [ { item: "Dagger", quantity: 99, price: 10 },
                    { item: "Shortsword", quantity: 99, price: 60 },
                    { item: "Mace", quantity: 99, price: 240 },
                    { item: "Axe", quantity: 99, price: 560},
                    { item: "Longsword", quantity: 99, price: 2000}, 
                    { item: "Halberd", quantity: 99, price: 4200},
                    { item: "MagicSword", quantity: 0, price: 6600}, 
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
                       { item: "MagicAxe", quantity: 0, price: 7500 },
                  ];
  bill.low_missile.type = "stuff";
  
  bill.all_missile = {};
  bill.all_missile.stock = [ { item: "Sling", quantity: 99, price: 60 }, 
                       { item: "Bow", quantity: 99, price: 600 },
                       { item: "Crossbow", quantity: 99, price: 2000 },
                       { item: "Wand", quantity: 0, price: 5000 },
                       { item: "MagicAxe", quantity: 0, price: 7500 },
                  ];
  bill.all_missile.type = "stuff";
  

  bill.alexis = {};
  bill.alexis.stock = [ { item: "DisarmTrapSpell", desc: "Disarm Trap (1)", price: 100} ,
                  { item: "DistractSpell", desc: "Distract (1)", price: 100},
                  { item: "FlameBladeSpell", desc: "Flame Blade (1)", price: 100},
                  { item: "StrikeSpell", desc: "Strike (1)", price: 100},
                  { item: "LesserHealSpell", desc: "Lesser Heal (2)", price: 200},
                  { item: "MagicBoltSpell", desc: "Magic Bolt (2)", price: 200},
                  { item: "ProtectSpell", desc: "Protect (2)", price: 200},
                  { item: "FireArmorSpell", desc: "Fire Armor (3)", price: 400},
                ];
  bill.alexis.type = "spells";
  
  bill.ivan = {};
  bill.ivan.stock = [ { item: "LesserHealSpell", desc: "Lesser Heal (2)", price: 150},
                { item: "ProtectSpell", desc: "Protect (2)", price: 150},
                { item: "IllusionSpell", desc: "Illusion (2)", price: 150},
                { item: "TelekinesisSpell", desc: "Telekinesis (3)", price: 330},
                { item: "HealSpell", desc: "Heal (4)", price: 700},
              ];
  bill.ivan.type = "spells";
  
  
  return bill;
}


function DisplayWares(who) {
  var stocks = DU.merchants[who.getMerch()];
  var code = 65; // ascii for A, to associate array index with letter for choice
  
  if (stocks.type === "stuff") {
    $.each(stocks, function(idx, val) {   
      if (val.quantity) {
        var spaces = 14 - val.item.length;
        var addme = String.fromCharCode(code+idx) + ") " + val.item;
        for (var i=0; i<spaces; i++) {
          addme = addme + " ";
        }
        addme = addme + val.price + " gp";
        maintext.addText(addme);
      }
    });
    
    // WORKING HERE
  } else if (stocks.type === "spells") {
    
  }
  else { alert("Bad merchant."); }
}
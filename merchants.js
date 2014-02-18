
function setMerchants() {
  var bill = {};
  bill.low_wpns = [ { item: "Dagger", quantity: 99, price: 5 },
                    { item: "Shortsword", quantity: 99, price: 45 },
                    { item: "Mace", quantity: 99, price: 200 },
                    { item: "Axe", quantity: 99, price: 500},
                    { item: "Longsword", quantity: 0, price: 1700}, 
                    { item: "Halberd", quantity: 0, price: 3500},
                    { item: "MagicSword", quantity: 0, price: 6000}, ];
  
  bill.all_wpns = [ { item: "Dagger", quantity: 99, price: 10 },
                    { item: "Shortsword", quantity: 99, price: 60 },
                    { item: "Mace", quantity: 99, price: 240 },
                    { item: "Axe", quantity: 99, price: 560},
                    { item: "Longsword", quantity: 99, price: 2000}, 
                    { item: "Halberd", quantity: 99, price: 4200},
                    { item: "MagicSword", quantity: 0, price: 6600}, 
                  ];
  bill.poverty_weapons = [ { item: "Dagger", quantity: 99, price: 5 },
                           { item: "Shortsword", quantity: 99, price: 30 },
                           { item: "Mace", quantity: 99, price: 160 },
                           { item: "Sling", quantity: 99, price: 35 },
                   ];                  
  bill.low_missile = [ { item: "Sling", quantity: 99, price: 50 }, 
                       { item: "Bow", quantity: 99, price: 500 },
                       { item: "Crossbow", quantity: 0, price: 1000 },
                       { item: "Wand", quantity: 0, price: 5000 },
                       { item: "MagicAxe", quantity: 0, price: 7500 },
                  ];
  bill.all_missile = [ { item: "Sling", quantity: 99, price: 60 }, 
                       { item: "Bow", quantity: 99, price: 600 },
                       { item: "Crossbow", quantity: 99, price: 2000 },
                       { item: "Wand", quantity: 0, price: 5000 },
                       { item: "MagicAxe", quantity: 0, price: 7500 },
                  ];


  bill.alexis = [ { item: "DisarmTrapSpell", quantity: 99, price: 100} ,
                  { item: "DistractSpell", quantity: 99, price: 100},
                  { item: "FlameBladeSpell", quantity: 99, price: 100},
                  { item: "StrikeSpell", quantity: 99, price: 100},
                  { item: "LesserHealSpell", quantity: 99, price: 200},
                  { item: "MagicBoltSpell", quantity: 99, price: 200},
                  { item: "ProtectSpell", quantity: 99, price: 200},
                  { item: "FireArmorSpell", quantity: 99, price: 400},
                ];
  bill.ivan = [ { item: "LesserHealSpell", quantity: 99, price: 150},
                { item: "ProtectSpell", quantity: 99, price: 150},
                { item: "IllusionSpell", quantity: 99, price: 150},
                { item: "TelekinesisSpell", quantity: 99, price: 330},
                { item: "HealSpell", quantity: 99, price: 700},
              ];
}
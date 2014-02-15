
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
                  
}
"use strict";

function SetMerchants() {
  let bill = {};
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
  
  bill.coral = {};
  bill.coral.stock = [ { item: "AudachtaNemesosUnlock", quantity: 1, price: 500, desc: "Audachta Nemesos: Unlock", sale: 'She winks. "So easy, it\'s almost cheating."' },
                       { item: "ScrollPeer", quantity: 5, price: 150, desc: "Scroll of Peer", sale: '"Good for finding a back way somewhere."' },
                       { item: "DarkGreenPotion", quantity: 1, price: 150, desc: "Potion of Haste", sale: '"Sometimes you need to get out in a hurry."' },
                ];
  bill.coral.type =  "stuff";

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

  // Clear Lake
  bill.lisa = {};
  bill.lisa.stock = [ { item: "Sling", quantity: 99, price: 25, desc: "Sling", sale: '"Thank you, come again."' }, 
                       { item: "Bow", quantity: 15, price: 500, desc: "Bow", sale: '"Thank you, come again."' },
                       { item: "Crossbow", quantity: 10, price: 3000, desc: "Crossbow", sale: '"Thank you, come again."' },
                       { item: "Wand", quantity: 0, price: 5000, desc: "Wand", sale: '"Thank you, come again."' },
                       { item: "MagicAxe", quantity: 0, price: 7500, desc: "Magic Axe", sale: '"Thank you, come again."' },
                  ];
  bill.lisa.type = "stuff";

  bill.colin = {};
  bill.colin.stock = [ { item: "Gems", quantity: 1, price: 500, desc: "Gems", sale: '"Thank you, come back any time."' }, 
                       { item: "BluePalmCrystal", quantity: 2, price: 150, desc: "Blue Crystal", sale: '"Thank you, come back any time."' },
                       { item: "PurplePalmCrystal", quantity: 1, price: 300, desc: "Purple Crystal", sale: '"Thank you, come back any time."' },
                       { item: "Ruby", quantity: 0, price: 400, desc: "Ruby", sale: '"Thank you, come back any time."' },
                       { item: "UncutRuby", quantity: 0, price: 250, desc: "Uncut ruby", sale: '"Thank you, come back any time."' },
                       { item: "SmallSapphire", quantity: 0, price: 50, desc: "Small sapphire", sale: '"Thank you, come back any time."' },
                       { item: "UncutSapphire", quantity: 0, price: 100, desc: "Uncut sapphire", sale: '"Thank you, come back any time."' },
                       { item: "UncutGems", quantity: 0, price: 350, desc: "Uncut gems", sale: '"Thank you, come back any time."' },
                  ];
  bill.colin.type = "stuff";

  // Hildendain
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
  
  // Poverty
  bill.brooke = {};
  bill.brooke.stock = [ { item: "RedPotion", quantity: 2, price: 50, desc: "Red Potion", sale: '"I added extra sugar, to make it go down easier."', sellqty: 1},
                        { item: "YellowPotion", quantity: 4, price: 35, desc: "Yellow Potion", sale: '"You can never have too many of these."', sellqty: 1},
                                ];
  bill.brooke.type = "stuff";

  // Swainhil
  bill.severyn = {};
  bill.severyn.stock = [ { item: "BluePalmCrystal", quantity: 4, price: 100, desc: "Blue Palm Crystal", sale: '"The energies will be harmonious with your own."', sellqty: 1},
                        { item: "GreenPalmCrystal", quantity: 4, price: 35, desc: "Green Palm Crystal", sale: '"Its aura overcomes any toxin."', sellqty: 1},
                        { item: "PurplePalmCrystal", quantity: 2, price: 200, desc: "Purple Palm Crystal", sale: '"It will open your third eye!"', sellqty: 1},
                        { item: "JadeNecklace", quantity: 1, price: 200, desc: "Jade Necklace", sale: '"This will bring you luck."', sellqty: 1},
                                ];
  bill.severyn.type = "stuff";

  bill.dale = {};
  bill.dale.stock = [ { item: "YellowPotion", quantity: 4, price: 50, desc: "Yellow Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "PurplePotion", quantity: 4, price: 80, desc: "Purple Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "ScrollFireArmor", quantity: 2, price: 100, desc: "Scroll of Fire Armor", sale: '"Excellent choice."', sellqty: 1},
                        { item: "ScrollSmite", quantity: 1, price: 130, desc: "Scroll of Smite", sale: '"Something will be sure to regret meeting you."', sellqty: 1},
                        { item: "AudachtaNemesosIronFlesh", quantity: 1, price: 250, desc: "Audachta Nemesos: Iron Flesh", sale: '"Ah, an eye for the rare and valuable."', sellqty: 1},
                        { item: "GreenPotion", quantity: 0, price: 10, desc: "Green Potion", sale: '"Useful for dealing with rats, I suppose."', sellqty: 1},
                        { item: "DarkGreenPotion", quantity: 0, price: 150, desc: "Dark Green Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "SilverPotion", quantity: 0, price: 80, desc: "Silver Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "PinkPotion", quantity: 0, price: 80, desc: "Pink Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "GreyPotion", quantity: 0, price: 80, desc: "Grey Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "BrownPotion", quantity: 0, price: 120, desc: "Brown Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "RedPotion", quantity: 0, price: 75, desc: "Red Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "WhitePotion", quantity: 0, price: 30, desc: "White Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "BlackPotion", quantity: 0, price: 120, desc: "Black Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "BluePotion", quantity: 0, price: 100, desc: "Blue Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "DeepBluePotion", quantity: 0, price: 150, desc: "Deep Blue Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "TanPotion", quantity: 0, price: 50, desc: "Tan Potion", sale: '"Would you like anything else?"', sellqty: 1},
                        { item: "OrangePotion", quantity: 0, price: 80, desc: "Orange Potion", sale: '"Would you like anything else?"', sellqty: 1},
                                ];
  bill.dale.type = "stuff";

  // MAGIC

  // Hildendain
  bill.alexis = {};
  bill.alexis.stock = [ { item: "DistractSpell", desc: "Distract", lvl: SPELL_DISTRACT_LEVEL, sid: SPELL_DISTRACT_ID, price: 100, presale: '"A simple glamour, but a useful one."'},
                  { item: "FlameBladeSpell", desc: "Flame Blade", lvl:SPELL_FLAME_BLADE_LEVEL, sid: SPELL_FLAME_BLADE_ID, price: 100, presale: '"Comes in your choice of red or blue!"'},
                  { item: "MendSpell", desc: "Mend", lvl: SPELL_MEND_LEVEL, sid: SPELL_MEND_ID, price: 100, presale: '"Excellent at keeping your boots in good repair."'},
                  { item: "LesserHealSpell", desc: "Lesser Heal", lvl: SPELL_LESSER_HEAL_LEVEL, sid: SPELL_LESSER_HEAL_ID, price: 200, presale: '"Guaranteed to make you feel better."'},
                  { item: "MagicBoltSpell", desc: "Magic Bolt", lvl: SPELL_MAGIC_BOLT_LEVEL, sid: SPELL_MAGIC_BOLT_ID, price: 200, presale: '"The easiest of the spells that do damage directly."'},
                  { item: "ProtectionSpell", desc: "Protection", lvl: SPELL_PROTECTION_LEVEL, sid: SPELL_PROTECTION_ID, price: 200, presale: '"Because it\'s often better to just prevent the damage in the first place."'},
                  { item: "FireArmorSpell", desc: "Fire Armor", lvl: SPELL_FIRE_ARMOR_LEVEL, sid: SPELL_FIRE_ARMOR_ID, price: 400, presale: '"Alas, it only comes in red."'},
                  { item: "WallofFlameSpell", desc: "Wall of Flame", lvl: SPELL_WALL_OF_FLAME_LEVEL, sid: SPELL_WALL_OF_FLAME_ID, price: 400, presale: '"This? Also just red."'},
                ];
  bill.alexis.type = "spells"; 
  
  // Beldskae
  bill.megan = {};
  bill.megan.stock = [ { item: "DistractSpell", desc: "Distract", lvl: SPELL_DISTRACT_LEVEL, sid: SPELL_DISTRACT_ID, price: 150, presale: '"A useful trick for staying alive."'},
                  { item: "FireArmorSpell", desc: "Fire Armor", lvl: SPELL_FIRE_ARMOR_LEVEL, sid: SPELL_FIRE_ARMOR_ID, price: 600, presale: '"For when you want someone to really regret trying to hit you."'},
                  { item: "HealSpell", desc: "Heal", lvl: SPELL_HEAL_LEVEL, sid: SPELL_HEAL_ID, price: 1000, presale: '"Can close surprisingly deep wounds without a trace."'},
                  { item: "IceballSpell", desc: "Iceball", lvl: SPELL_ICEBALL_LEVEL, sid: SPELL_ICEBALL_ID, price: 1000, presale: '"Hail has nothing on this."'},
                  { item: "TelepathySpell", desc: "Telepathy", lvl: SPELL_TELEPATHY_LEVEL, sid: SPELL_TELEPATHY_ID, price: 1000, presale: '"Not for reading minds, but for sensing their surface thoughts."'},
                  { item: "ParalyzeSpell", desc: "Paralyze", lvl: SPELL_PARALYZE_LEVEL, sid: SPELL_PARALYZE_ID, price: 1300, presale: '"Freeze someone right in place!"'},
                  { item: "ShockwaveSpell", desc: "Shockwave", lvl: SPELL_SHOCKWAVE_LEVEL, sid: SPELL_SHOCKWAVE_ID, price: 1300, presale: '"Strike everyone around you, and push them away."'},
                  { item: "SwordstrikeSpell", desc: "Swordstrike", lvl: SPELL_SWORDSTRIKE_LEVEL, sid: SPELL_SWORDSTRIKE_ID, price: 1300, presale: '"Conjures a magical sword that flies to strike an enemy and anything near it."'},
                ];
  bill.megan.type = "spells"; 

  // Onyx
  bill.william = {};
  bill.william.stock = [ { item: "DisarmTrapSpell", desc: "Disarm Trap", lvl: SPELL_DISARM_TRAP_LEVEL, sid: SPELL_DISARM_TRAP_ID, price: 100, presale: '"Disarms any immediately nearby trap. A necessity for the cautious adventurer."'},
                  { item: "VulnerabilitySpell", desc: "Vulnerability", lvl: SPELL_VULNERABILITY_LEVEL, sid: SPELL_VULNERABILITY_ID, price: 100, presale: '"Renders a foe nearly incapable of defending itself."'},
                  { item: "MagicBoltSpell", desc: "Magic Bolt", lvl: SPELL_MAGIC_BOLT_LEVEL, sid: SPELL_MAGIC_BOLT_ID, price: 200, presale: '"A magic arrow flies to strike a target."'},
                  { item: "HealSpell", desc: "Heal", lvl: SPELL_HEAL_LEVEL, sid: SPELL_HEAL_ID, price: 400, presale: '"Restores your vitality. Useful if you want to do a lot of fighting."'},
                  { item: "TelekinesisSpell", desc: "Telekinesis", lvl: SPELL_TELEKINESIS_LEVEL, sid: SPELL_TELEKINESIS_ID, price: 400, presale: '"Pick up or manipulate a distant object."'},
                  { item: "LifeDrainSpell", desc: "Life Drain", lvl: SPELL_LIFE_DRAIN_LEVEL, sid: SPELL_LIFE_DRAIN_ID, price: 750, presale: '"Harms an enemy, and transfers some of its vitality to you!"'},
                  { item: "SmiteSpell", desc: "Smite", lvl: SPELL_SMITE_LEVEL, sid: SPELL_SMITE_ID, price: 750, presale: '"Randomly chooses three nearby enemies and strikes them a mighty blow."'},
                  { item: "CrystalTrapSpell", desc: "Crystal Trap", lvl: SPELL_CRYSTAL_TRAP_LEVEL, sid: SPELL_CRYSTAL_TRAP_ID, price: 1100, presale: '"Hides a trap that, when stepped upon, traps the treader in crystal for a time."'},
                ];
  bill.william.type = "spells"; 
               
  return bill;
}


function DisplayWares(who) {
  let stocks = DU.merchants[who.getMerch()];
  let code = 65; // ascii for A, to associate array index with letter for choice

  if (stocks.type === "stuff") {
    for (let idx=0;idx<stocks.stock.length;idx++) {
      let val = stocks.stock[idx];
      let qty = val.quantity;
      if (qty) {
        let displayname = val.item;
        if (val.desc) { displayname = val.desc; }
        if ((qty > 0) && (qty <= 99)) {
          displayname = displayname + " (qty: " + qty + ")";
        }
        let addme = String.fromCharCode(code+idx) + ") " + displayname;
        let price = val.price + " gp";
        let addedtext = addme + "<span style='float:right'>" + price + "</span>";
        maintext.addText(addedtext);
      }
    };
    
    return 1;
  } else if (stocks.type === "spells") {
    let yesspells = 0;
    for (let idx=0;idx<stocks.stock.length;idx++) {
      let val = stocks.stock[idx];
        if (!yesspells) {
          conversations[who.getConversation()].say(who, conversations[who.getConversation()]["_startbuy"].responses[1]);
        }
        yesspells = 1;
        let displayname = val.desc + " (lvl: " + val.lvl + ")";
        let addme = String.fromCharCode(code+idx) + ") " + displayname;
        let price = val.price + " gp";
        let addedtext = addme + "<span style='float:right'>" + price + "</span>";
        if (PC.knowsSpell(val.lvl, val.sid)) {
          addedtext = "<span style='color:aaa'>" + addedtext + "</span>";
        }
        maintext.addText(addedtext);
        
    };
    if (!yesspells) {
      conversations[who.getConversation()].say(who, conversations[who.getConversation()]["_knowsall"].responses[1]);
      return 0;
    }
    return 1;
  }
  else { alert("Bad merchant. (No biscuit)."); }
}

function GetSellBack(seller, merchant) {
  let stocks = DU.merchants[merchant.getMerch()];
  let code = 65; // ascii for A, to associate array index with letter for choice
  let selllist = [];

  for (let idx=0;idx<stocks.stock.length;idx++) {
    let val=stocks.stock[idx];
    let ininv = seller.checkInventory(val.item);
    if (ininv) {
      let qty = ininv.getQuantity();
      if ((ininv === seller.getArmor()) || (ininv === seller.getWeapon()) || (ininv === seller.getMissile())) {
        qty = qty-1;
      }
      if (qty) {
        let displayname = ininv.desc;
        displayname = displayname + " (" + qty + ")";
        let addme = String.fromCharCode(code+idx) + ") " + displayname;
        let price;
        if (ininv.valuable) {
          price = Math.ceil(val.price*.95) + " gp";
        } else {
          price = Math.ceil(val.price/10) + " gp";
        }
        let addedtext = addme + "<span style='float:right'>" + price + "</span>";
        selllist.push(addedtext);
      }
    }
  };
  
  return selllist;
}

function HasStock(whose) {
  if (DU.merchants[whose]) {
    if (DU.merchants[whose].type === "spells") { return 1; }
    for (let i=0; i<DU.merchants[whose].stock.length; i++) {
      if (DU.merchants[whose].stock[i].quantity > 0) { return 1; }
    }
  }
}
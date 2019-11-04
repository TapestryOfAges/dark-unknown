"use strict";

function SetLoots() {
  let loots = {};

  loots['Minor Adventurer'] = new LootTable();
  loots['Minor Adventurer'].goldDice = '2d6+1';
  loots['Minor Adventurer'].goldChance = 100;
  loots['Minor Adventurer'].loot[0] = {};
  loots['Minor Adventurer'].loot[0].objname = 'Lesser Weapon';
  loots['Minor Adventurer'].loot[0].quantity = '1';
  loots['Minor Adventurer'].loot[0].chance = 20;
  loots['Minor Adventurer'].loot[1] = {};
  loots['Minor Adventurer'].loot[1].objname = 'Lesser Armor';
  loots['Minor Adventurer'].loot[1].quantity = '1';
  loots['Minor Adventurer'].loot[1].chance = 20;
  loots['Minor Adventurer'].loot[2] = {};
  loots['Minor Adventurer'].loot[2].objname = 'Potions1';
  loots['Minor Adventurer'].loot[2].quantity = '1';
  loots['Minor Adventurer'].loot[2].chance = 15;
  loots['Minor Adventurer'].trap = 'weak';

  loots['Town Guard'] = new LootTable();
  loots['Town Guard'].goldDice = '2d6';
  loots['Town Guard'].goldChance = 100;
  loots['Town Guard'].loot[0] = {};
  loots['Town Guard'].loot[0].objname = 'YellowPotion';
  loots['Town Guard'].loot[0].quantity = '1';
  loots['Town Guard'].loot[0].chance = 20;
  loots['Town Guard'].loot[1] = {};
  loots['Town Guard'].loot[1].objname = 'Medium Weapon';
  loots['Town Guard'].loot[1].quantity = '1';
  loots['Town Guard'].loot[1].chance = 40;
  loots['Town Guard'].loot[2] = {};
  loots['Town Guard'].loot[2].objname = 'Medium Armor';
  loots['Town Guard'].loot[2].quantity = '1';
  loots['Town Guard'].loot[2].chance = 25;
  loots['Town Guard'].trap = 'medium';

  loots['castlechest'] = new LootTable();
  loots['castlechest'].goldDice = '2d50';
  loots['castlechest'].goldChance = 100;
  loots['castlechest'].loot[0] = {};
  loots['castlechest'].loot[0].objname = 'Scrolls4';
  loots['castlechest'].loot[0].quantity = '1';
  loots['castlechest'].loot[0].chance = 15;
  loots['castlechest'].loot[1] = {};
  loots['castlechest'].loot[1].objname = 'Scrolls3';
  loots['castlechest'].loot[1].quantity = '1';
  loots['castlechest'].loot[1].chance = 20;
  loots['castlechest'].loot[2] = {};
  loots['castlechest'].loot[2].objname = 'Scrolls5';
  loots['castlechest'].loot[2].quantity = '1';
  loots['castlechest'].loot[2].chance = 15;
  loots['castlechest'].loot[3] = {};
  loots['castlechest'].loot[3].objname = 'Potions3';
  loots['castlechest'].loot[3].quantity = '1';
  loots['castlechest'].loot[3].chance = 15;
  loots['castlechest'].loot[4] = {};
  loots['castlechest'].loot[4].objname = 'All Armor';
  loots['castlechest'].loot[4].quantity = '1d2';
  loots['castlechest'].loot[4].chance = 50;
  loots['castlechest'].loot[5] = {};
  loots['castlechest'].loot[5].objname = 'Scrolls6';
  loots['castlechest'].loot[5].quantity = '1';
  loots['castlechest'].loot[5].chance = 10;
  loots['castlechest'].loot[6] = {};
  loots['castlechest'].loot[6].objname = 'Potions1';
  loots['castlechest'].loot[6].quantity = '1d2';
  loots['castlechest'].loot[6].chance = 30;
  loots['castlechest'].loot[7] = {};
  loots['castlechest'].loot[7].objname = 'All Weapons';
  loots['castlechest'].loot[7].quantity = '1d3';
  loots['castlechest'].loot[7].chance = 60;
  loots['castlechest'].loot[8] = {};
  loots['castlechest'].loot[8].objname = 'Scrolls2';
  loots['castlechest'].loot[8].quantity = '1';
  loots['castlechest'].loot[8].chance = 25;
  loots['castlechest'].loot[9] = {};
  loots['castlechest'].loot[9].objname = 'Scrolls1';
  loots['castlechest'].loot[9].quantity = '1';
  loots['castlechest'].loot[9].chance = 25;
  loots['castlechest'].loot[10] = {};
  loots['castlechest'].loot[10].objname = 'Potions2';
  loots['castlechest'].loot[10].quantity = '1d2';
  loots['castlechest'].loot[10].chance = 30;
  loots['castlechest'].loot[11] = {};
  loots['castlechest'].loot[11].objname = 'Scrolls7';
  loots['castlechest'].loot[11].quantity = '1';
  loots['castlechest'].loot[11].chance = 5;
  loots['castlechest'].loot[12] = {};
  loots['castlechest'].loot[12].objname = 'Scrolls8';
  loots['castlechest'].loot[12].quantity = '1';
  loots['castlechest'].loot[12].chance = 5;
  loots['castlechest'].trap = 'strong';

  loots['Large Animal'] = new LootTable();
  loots['Large Animal'].goldDice = '2d6+3';
  loots['Large Animal'].goldChance = 45;
  loots['Large Animal'].loot[0] = {};
  loots['Large Animal'].loot[0].objname = 'Scroll1';
  loots['Large Animal'].loot[0].quantity = '1d2';
  loots['Large Animal'].loot[0].chance = 20;

  loots['Headlesses'] = new LootTable();
  loots['Headlesses'].goldDice = '2d6+5';
  loots['Headlesses'].goldChance = 100;
  loots['Headlesses'].loot[0] = {};
  loots['Headlesses'].loot[0].objname = 'Potions1';
  loots['Headlesses'].loot[0].quantity = '1';
  loots['Headlesses'].loot[0].chance = 25;
  loots['Headlesses'].loot[1] = {};
  loots['Headlesses'].loot[1].objname = 'Mid Weapon';
  loots['Headlesses'].loot[1].quantity = '1';
  loots['Headlesses'].loot[1].chance = 20;
  loots['Headlesses'].loot[2] = {};
  loots['Headlesses'].loot[2].objname = 'Lesser Weapon';
  loots['Headlesses'].loot[2].quantity = '1';
  loots['Headlesses'].loot[2].chance = 40;

  loots['paladinchest'] = new LootTable();
  loots['paladinchest'].goldDice = '10d10';
  loots['paladinchest'].goldChance = 100;
  loots['paladinchest'].loot[0] = {};
  loots['paladinchest'].loot[0].objname = 'HeavyArmor';
  loots['paladinchest'].loot[0].quantity = '2';
  loots['paladinchest'].loot[0].chance = 100;
  loots['paladinchest'].loot[1] = {};
  loots['paladinchest'].loot[1].objname = 'ScrollHealing';
  loots['paladinchest'].loot[1].quantity = '1';
  loots['paladinchest'].loot[1].chance = 100;
  loots['paladinchest'].loot[2] = {};
  loots['paladinchest'].loot[2].objname = 'ScrollSwordstrike';
  loots['paladinchest'].loot[2].quantity = '1';
  loots['paladinchest'].loot[2].chance = 100;
  loots['paladinchest'].loot[3] = {};
  loots['paladinchest'].loot[3].objname = 'HeavyWeapon';
  loots['paladinchest'].loot[3].quantity = '2';
  loots['paladinchest'].loot[3].chance = 100;

  loots['Level3'] = new LootTable();
  loots['Level3'].goldDice = '5d10';
  loots['Level3'].goldChance = 65;
  loots['Level3'].loot[0] = {};
  loots['Level3'].loot[0].objname = 'Lesser Weapon';
  loots['Level3'].loot[0].quantity = '1';
  loots['Level3'].loot[0].chance = 20;
  loots['Level3'].loot[1] = {};
  loots['Level3'].loot[1].objname = 'Scrolls3';
  loots['Level3'].loot[1].quantity = '1';
  loots['Level3'].loot[1].chance = 20;
  loots['Level3'].loot[2] = {};
  loots['Level3'].loot[2].objname = 'Medium Armor';
  loots['Level3'].loot[2].quantity = '1';
  loots['Level3'].loot[2].chance = 25;
  loots['Level3'].loot[3] = {};
  loots['Level3'].loot[3].objname = 'Mid Weapon';
  loots['Level3'].loot[3].quantity = '1';
  loots['Level3'].loot[3].chance = 35;
  loots['Level3'].loot[4] = {};
  loots['Level3'].loot[4].objname = 'Potions1';
  loots['Level3'].loot[4].quantity = '1d2';
  loots['Level3'].loot[4].chance = 35;
  loots['Level3'].loot[5] = {};
  loots['Level3'].loot[5].objname = 'Scrolls2';
  loots['Level3'].loot[5].quantity = '1';
  loots['Level3'].loot[5].chance = 25;
  loots['Level3'].loot[6] = {};
  loots['Level3'].loot[6].objname = 'Scrolls1';
  loots['Level3'].loot[6].quantity = '1';
  loots['Level3'].loot[6].chance = 10;
  loots['Level3'].loot[7] = {};
  loots['Level3'].loot[7].objname = 'Potions2';
  loots['Level3'].loot[7].quantity = '1';
  loots['Level3'].loot[7].chance = 20;
  loots['Level3'].trap = 'weak';

  loots['Pit Rogue'] = new LootTable();
  loots['Pit Rogue'].loot[0] = {};
  loots['Pit Rogue'].loot[0].objname = 'PitOfDespairKey';
  loots['Pit Rogue'].loot[0].quantity = '1';
  loots['Pit Rogue'].loot[0].chance = 5;

  loots['Level6'] = new LootTable();
  loots['Level6'].goldDice = '5d12+25';
  loots['Level6'].goldChance = 70;
  loots['Level6'].loot[0] = {};
  loots['Level6'].loot[0].objname = 'Potions4';
  loots['Level6'].loot[0].quantity = '1d2';
  loots['Level6'].loot[0].chance = 20;
  loots['Level6'].loot[1] = {};
  loots['Level6'].loot[1].objname = 'Potions2';
  loots['Level6'].loot[1].quantity = '1d2';
  loots['Level6'].loot[1].chance = 20;
  loots['Level6'].loot[2] = {};
  loots['Level6'].loot[2].objname = 'Heavy Weapon';
  loots['Level6'].loot[2].quantity = '1';
  loots['Level6'].loot[2].chance = 35;
  loots['Level6'].loot[3] = {};
  loots['Level6'].loot[3].objname = 'Potions1';
  loots['Level6'].loot[3].quantity = '1d2';
  loots['Level6'].loot[3].chance = 20;
  loots['Level6'].loot[4] = {};
  loots['Level6'].loot[4].objname = 'Medium Weapon';
  loots['Level6'].loot[4].quantity = '1';
  loots['Level6'].loot[4].chance = 50;
  loots['Level6'].loot[5] = {};
  loots['Level6'].loot[5].objname = 'Medium Armor';
  loots['Level6'].loot[5].quantity = '1';
  loots['Level6'].loot[5].chance = 25;
  loots['Level6'].loot[6] = {};
  loots['Level6'].loot[6].objname = 'Scrolls4';
  loots['Level6'].loot[6].quantity = '1d2';
  loots['Level6'].loot[6].chance = 25;
  loots['Level6'].loot[7] = {};
  loots['Level6'].loot[7].objname = 'Scrolls3';
  loots['Level6'].loot[7].quantity = '1d2';
  loots['Level6'].loot[7].chance = 25;
  loots['Level6'].loot[8] = {};
  loots['Level6'].loot[8].objname = 'Scrolls5';
  loots['Level6'].loot[8].quantity = '1';
  loots['Level6'].loot[8].chance = 25;
  loots['Level6'].loot[9] = {};
  loots['Level6'].loot[9].objname = 'Potions3';
  loots['Level6'].loot[9].quantity = '1d2';
  loots['Level6'].loot[9].chance = 20;
  loots['Level6'].loot[10] = {};
  loots['Level6'].loot[10].objname = 'Scrolls6';
  loots['Level6'].loot[10].quantity = '1';
  loots['Level6'].loot[10].chance = 20;
  loots['Level6'].loot[11] = {};
  loots['Level6'].loot[11].objname = 'Heavy Armor';
  loots['Level6'].loot[11].quantity = '1';
  loots['Level6'].loot[11].chance = 35;
  loots['Level6'].trap = 'strong';

  loots['prev_looted'] = new LootTable();
  loots['prev_looted'].goldDice = '1d4';
  loots['prev_looted'].goldChance = 100;

  loots['Level4'] = new LootTable();
  loots['Level4'].goldDice = '7d10';
  loots['Level4'].goldChance = 65;
  loots['Level4'].loot[0] = {};
  loots['Level4'].loot[0].objname = 'Lesser Weapon';
  loots['Level4'].loot[0].quantity = '1';
  loots['Level4'].loot[0].chance = 20;
  loots['Level4'].loot[1] = {};
  loots['Level4'].loot[1].objname = 'Scrolls3';
  loots['Level4'].loot[1].quantity = '1d2';
  loots['Level4'].loot[1].chance = 20;
  loots['Level4'].loot[2] = {};
  loots['Level4'].loot[2].objname = 'Scrolls4';
  loots['Level4'].loot[2].quantity = '1';
  loots['Level4'].loot[2].chance = 15;
  loots['Level4'].loot[3] = {};
  loots['Level4'].loot[3].objname = 'Potions1';
  loots['Level4'].loot[3].quantity = '1d2';
  loots['Level4'].loot[3].chance = 30;
  loots['Level4'].loot[4] = {};
  loots['Level4'].loot[4].objname = 'Medium Armor';
  loots['Level4'].loot[4].quantity = '1';
  loots['Level4'].loot[4].chance = 40;
  loots['Level4'].loot[5] = {};
  loots['Level4'].loot[5].objname = 'Mid Weapon';
  loots['Level4'].loot[5].quantity = '1';
  loots['Level4'].loot[5].chance = 45;
  loots['Level4'].loot[6] = {};
  loots['Level4'].loot[6].objname = 'Potions2';
  loots['Level4'].loot[6].quantity = '1';
  loots['Level4'].loot[6].chance = 35;
  loots['Level4'].loot[7] = {};
  loots['Level4'].loot[7].objname = 'Scrolls2';
  loots['Level4'].loot[7].quantity = '1d2';
  loots['Level4'].loot[7].chance = 25;
  loots['Level4'].loot[8] = {};
  loots['Level4'].loot[8].objname = 'Scrolls1';
  loots['Level4'].loot[8].quantity = '1';
  loots['Level4'].loot[8].chance = 10;
  loots['Level4'].trap = 'medium';

  loots['Spiders'] = new LootTable();
  loots['Spiders'].goldDice = '1d4';
  loots['Spiders'].goldChance = 45;
  loots['Spiders'].loot[0] = {};
  loots['Spiders'].loot[0].objname = 'Scroll1';
  loots['Spiders'].loot[0].quantity = '1';
  loots['Spiders'].loot[0].chance = 5;
  loots['Spiders'].loot[1] = {};
  loots['Spiders'].loot[1].objname = 'Lesser Weapon';
  loots['Spiders'].loot[1].quantity = '1';
  loots['Spiders'].loot[1].chance = 35;

  loots['headlesscave'] = new LootTable();
  loots['headlesscave'].goldDice = '2d6+5';
  loots['headlesscave'].goldChance = 100;
  loots['headlesscave'].loot[0] = {};
  loots['headlesscave'].loot[0].objname = 'Scrolls1';
  loots['headlesscave'].loot[0].quantity = '1d2';
  loots['headlesscave'].loot[0].chance = 25;
  loots['headlesscave'].loot[1] = {};
  loots['headlesscave'].loot[1].objname = 'Lesser Weapon';
  loots['headlesscave'].loot[1].quantity = '1';
  loots['headlesscave'].loot[1].chance = 20;
  loots['headlesscave'].loot[2] = {};
  loots['headlesscave'].loot[2].objname = 'Mid Weapon';
  loots['headlesscave'].loot[2].quantity = '1';
  loots['headlesscave'].loot[2].chance = 25;
  loots['headlesscave'].loot[3] = {};
  loots['headlesscave'].loot[3].objname = 'Potions1';
  loots['headlesscave'].loot[3].quantity = '1d2';
  loots['headlesscave'].loot[3].chance = 25;
  loots['headlesscave'].trap = 'weak';

  loots['smallguard'] = new LootTable();
  loots['smallguard'].loot[0] = {};
  loots['smallguard'].loot[0].objname = 'Lesser Weapon';
  loots['smallguard'].loot[0].quantity = '1';
  loots['smallguard'].loot[0].chance = 100;
  loots['smallguard'].loot[1] = {};
  loots['smallguard'].loot[1].objname = 'Lesser Armor';
  loots['smallguard'].loot[1].quantity = '1';
  loots['smallguard'].loot[1].chance = 100;

  loots['potslow'] = new LootTable();
  loots['potslow'].goldDice = '2d20';
  loots['potslow'].goldChance = 80;
  loots['potslow'].loot[0] = {};
  loots['potslow'].loot[0].objname = 'Potions1';
  loots['potslow'].loot[0].quantity = '1d3';
  loots['potslow'].loot[0].chance = 100;
  loots['potslow'].loot[1] = {};
  loots['potslow'].loot[1].objname = 'Potions2';
  loots['potslow'].loot[1].quantity = '1';
  loots['potslow'].loot[1].chance = 20;

  loots['Level7'] = new LootTable();
  loots['Level7'].goldDice = '8d10+15';
  loots['Level7'].goldChance = 75;
  loots['Level7'].loot[0] = {};
  loots['Level7'].loot[0].objname = 'Heavy Weapon';
  loots['Level7'].loot[0].quantity = '1';
  loots['Level7'].loot[0].chance = 35;
  loots['Level7'].loot[1] = {};
  loots['Level7'].loot[1].objname = 'Potions1';
  loots['Level7'].loot[1].quantity = '1d2';
  loots['Level7'].loot[1].chance = 30;
  loots['Level7'].loot[2] = {};
  loots['Level7'].loot[2].objname = 'Medium Weapon';
  loots['Level7'].loot[2].quantity = '1';
  loots['Level7'].loot[2].chance = 25;
  loots['Level7'].loot[3] = {};
  loots['Level7'].loot[3].objname = 'Medium Armor';
  loots['Level7'].loot[3].quantity = '1';
  loots['Level7'].loot[3].chance = 25;
  loots['Level7'].loot[4] = {};
  loots['Level7'].loot[4].objname = 'Scrolls3';
  loots['Level7'].loot[4].quantity = '1d2';
  loots['Level7'].loot[4].chance = 30;
  loots['Level7'].loot[5] = {};
  loots['Level7'].loot[5].objname = 'Scrolls4';
  loots['Level7'].loot[5].quantity = '1d2';
  loots['Level7'].loot[5].chance = 30;
  loots['Level7'].loot[6] = {};
  loots['Level7'].loot[6].objname = 'Scrolls6';
  loots['Level7'].loot[6].quantity = '1';
  loots['Level7'].loot[6].chance = 20;
  loots['Level7'].loot[7] = {};
  loots['Level7'].loot[7].objname = 'Heavy Armor';
  loots['Level7'].loot[7].quantity = '1';
  loots['Level7'].loot[7].chance = 35;
  loots['Level7'].loot[8] = {};
  loots['Level7'].loot[8].objname = 'Scrolls5';
  loots['Level7'].loot[8].quantity = '1';
  loots['Level7'].loot[8].chance = 30;
  loots['Level7'].loot[9] = {};
  loots['Level7'].loot[9].objname = 'Potions3';
  loots['Level7'].loot[9].quantity = '1';
  loots['Level7'].loot[9].chance = 10;
  loots['Level7'].loot[10] = {};
  loots['Level7'].loot[10].objname = 'Potions4';
  loots['Level7'].loot[10].quantity = '1';
  loots['Level7'].loot[10].chance = 10;
  loots['Level7'].loot[11] = {};
  loots['Level7'].loot[11].objname = 'Scrolls7';
  loots['Level7'].loot[11].quantity = '1';
  loots['Level7'].loot[11].chance = 10;
  loots['Level7'].loot[12] = {};
  loots['Level7'].loot[12].objname = 'Potions2';
  loots['Level7'].loot[12].quantity = '1d2';
  loots['Level7'].loot[12].chance = 30;
  loots['Level7'].trap = 'strong';

  loots['Small Animal'] = new LootTable();
  loots['Small Animal'].goldDice = '1d3';
  loots['Small Animal'].goldChance = 1;

  loots['cursed'] = new LootTable();
  loots['cursed'].goldDice = '2d10+10';
  loots['cursed'].goldChance = 100;
  loots['cursed'].loot[0] = {};
  loots['cursed'].loot[0].objname = 'StoneOfCurses';
  loots['cursed'].loot[0].quantity = '1';
  loots['cursed'].loot[0].chance = 100;

  loots['olympus_secret'] = new LootTable();
  loots['olympus_secret'].goldDice = '2d20';
  loots['olympus_secret'].goldChance = 100;
  loots['olympus_secret'].loot[0] = {};
  loots['olympus_secret'].loot[0].objname = 'Scrolls1';
  loots['olympus_secret'].loot[0].quantity = '1d2';
  loots['olympus_secret'].loot[0].chance = 25;
  loots['olympus_secret'].loot[1] = {};
  loots['olympus_secret'].loot[1].objname = 'Lesser Weapon';
  loots['olympus_secret'].loot[1].quantity = '1d2';
  loots['olympus_secret'].loot[1].chance = 60;
  loots['olympus_secret'].loot[2] = {};
  loots['olympus_secret'].loot[2].objname = 'Lesser Armor';
  loots['olympus_secret'].loot[2].quantity = '1';
  loots['olympus_secret'].loot[2].chance = 33;
  loots['olympus_secret'].loot[3] = {};
  loots['olympus_secret'].loot[3].objname = 'Potions1';
  loots['olympus_secret'].loot[3].quantity = '1d2';
  loots['olympus_secret'].loot[3].chance = 40;

  loots['Level5'] = new LootTable();
  loots['Level5'].goldDice = '4d10+20';
  loots['Level5'].goldChance = 70;
  loots['Level5'].loot[0] = {};
  loots['Level5'].loot[0].objname = 'Scrolls2';
  loots['Level5'].loot[0].quantity = '1';
  loots['Level5'].loot[0].chance = 30;
  loots['Level5'].loot[1] = {};
  loots['Level5'].loot[1].objname = 'Potions2';
  loots['Level5'].loot[1].quantity = '1d2';
  loots['Level5'].loot[1].chance = 35;
  loots['Level5'].loot[2] = {};
  loots['Level5'].loot[2].objname = 'Potions3';
  loots['Level5'].loot[2].quantity = '1';
  loots['Level5'].loot[2].chance = 30;
  loots['Level5'].loot[3] = {};
  loots['Level5'].loot[3].objname = 'Scrolls5';
  loots['Level5'].loot[3].quantity = '1';
  loots['Level5'].loot[3].chance = 25;
  loots['Level5'].loot[4] = {};
  loots['Level5'].loot[4].objname = 'Heavy Armor';
  loots['Level5'].loot[4].quantity = '1';
  loots['Level5'].loot[4].chance = 20;
  loots['Level5'].loot[5] = {};
  loots['Level5'].loot[5].objname = 'Scrolls4';
  loots['Level5'].loot[5].quantity = '1';
  loots['Level5'].loot[5].chance = 30;
  loots['Level5'].loot[6] = {};
  loots['Level5'].loot[6].objname = 'Scrolls3';
  loots['Level5'].loot[6].quantity = '1d2';
  loots['Level5'].loot[6].chance = 35;
  loots['Level5'].loot[7] = {};
  loots['Level5'].loot[7].objname = 'Medium Armor';
  loots['Level5'].loot[7].quantity = '1';
  loots['Level5'].loot[7].chance = 40;
  loots['Level5'].loot[8] = {};
  loots['Level5'].loot[8].objname = 'Mid Weapon';
  loots['Level5'].loot[8].quantity = '1';
  loots['Level5'].loot[8].chance = 50;
  loots['Level5'].loot[9] = {};
  loots['Level5'].loot[9].objname = 'Medium Weapon';
  loots['Level5'].loot[9].quantity = '1';
  loots['Level5'].loot[9].chance = 50;
  loots['Level5'].loot[10] = {};
  loots['Level5'].loot[10].objname = 'Potions1';
  loots['Level5'].loot[10].quantity = '1';
  loots['Level5'].loot[10].chance = 35;
  loots['Level5'].trap = 'medium';

  loots['Shadow2'] = new LootTable();
  loots['Shadow2'].goldDice = '4d6+10';
  loots['Shadow2'].goldChance = 100;
  loots['Shadow2'].loot[0] = {};
  loots['Shadow2'].loot[0].objname = 'Potions1';
  loots['Shadow2'].loot[0].quantity = '1';
  loots['Shadow2'].loot[0].chance = 60;
  loots['Shadow2'].loot[1] = {};
  loots['Shadow2'].loot[1].objname = 'Medium Armor';
  loots['Shadow2'].loot[1].quantity = '1';
  loots['Shadow2'].loot[1].chance = 35;
  loots['Shadow2'].loot[2] = {};
  loots['Shadow2'].loot[2].objname = 'Mid Weapon';
  loots['Shadow2'].loot[2].quantity = '1';
  loots['Shadow2'].loot[2].chance = 50;
  loots['Shadow2'].loot[3] = {};
  loots['Shadow2'].loot[3].objname = 'Lesser Weapon';
  loots['Shadow2'].loot[3].quantity = '1';
  loots['Shadow2'].loot[3].chance = 25;
  loots['Shadow2'].loot[4] = {};
  loots['Shadow2'].loot[4].objname = 'Potions2';
  loots['Shadow2'].loot[4].quantity = '1';
  loots['Shadow2'].loot[4].chance = 50;

  loots['Townsfolk'] = new LootTable();
  loots['Townsfolk'].goldDice = '2d6-1';
  loots['Townsfolk'].goldChance = 100;

  loots['Giant Spider'] = new LootTable();
  loots['Giant Spider'].goldDice = '2d6+3';
  loots['Giant Spider'].goldChance = 45;
  loots['Giant Spider'].loot[0] = {};
  loots['Giant Spider'].loot[0].objname = 'Spider Silk';
  loots['Giant Spider'].loot[0].quantity = '1';
  loots['Giant Spider'].loot[0].chance = 100;
  loots['Giant Spider'].loot[1] = {};
  loots['Giant Spider'].loot[1].objname = 'Scroll1';
  loots['Giant Spider'].loot[1].quantity = '1d2';
  loots['Giant Spider'].loot[1].chance = 33;

  loots['Ariel Shop'] = new LootTable();
  loots['Ariel Shop'].goldDice = '2d6+10';
  loots['Ariel Shop'].goldChance = 100;
  loots['Ariel Shop'].loot[0] = {};
  loots['Ariel Shop'].loot[0].objname = 'Medium Weapon';
  loots['Ariel Shop'].loot[0].quantity = '2';
  loots['Ariel Shop'].loot[0].chance = 100;
  loots['Ariel Shop'].loot[1] = {};
  loots['Ariel Shop'].loot[1].objname = 'Medium Armor';
  loots['Ariel Shop'].loot[1].quantity = '2';
  loots['Ariel Shop'].loot[1].chance = 100;

  loots['pc_start'] = new LootTable();
  loots['pc_start'].loot[0] = {};
  loots['pc_start'].loot[0].objname = 'Shortsword';
  loots['pc_start'].loot[0].quantity = '1';
  loots['pc_start'].loot[0].chance = 100;
  loots['pc_start'].loot[1] = {};
  loots['pc_start'].loot[1].objname = 'LeatherArmor';
  loots['pc_start'].loot[1].quantity = '1';
  loots['pc_start'].loot[1].chance = 100;

  loots['colin_chest'] = new LootTable();
  loots['colin_chest'].loot[0] = {};
  loots['colin_chest'].loot[0].objname = 'BluePalmCrystal';
  loots['colin_chest'].loot[0].quantity = '1';
  loots['colin_chest'].loot[0].chance = 100;
  loots['colin_chest'].loot[1] = {};
  loots['colin_chest'].loot[1].objname = 'Gems';
  loots['colin_chest'].loot[1].quantity = '1';
  loots['colin_chest'].loot[1].chance = 100;
  loots['colin_chest'].loot[2] = {};
  loots['colin_chest'].loot[2].objname = 'PinkPotion';
  loots['colin_chest'].loot[2].quantity = '1';
  loots['colin_chest'].loot[2].chance = 100;

  loots['pc_home'] = new LootTable();
  loots['pc_home'].goldDice = '25d1';
  loots['pc_home'].goldChance = 100;
  loots['pc_home'].loot[0] = {};
  loots['pc_home'].loot[0].objname = 'YellowPotion';
  loots['pc_home'].loot[0].quantity = '1';
  loots['pc_home'].loot[0].chance = 100;

  loots['Level2'] = new LootTable();
  loots['Level2'].goldDice = '3d12';
  loots['Level2'].goldChance = 50;
  loots['Level2'].loot[0] = {};
  loots['Level2'].loot[0].objname = 'Scrolls1';
  loots['Level2'].loot[0].quantity = '1';
  loots['Level2'].loot[0].chance = 15;
  loots['Level2'].loot[1] = {};
  loots['Level2'].loot[1].objname = 'Scrolls2';
  loots['Level2'].loot[1].quantity = '1';
  loots['Level2'].loot[1].chance = 20;
  loots['Level2'].loot[2] = {};
  loots['Level2'].loot[2].objname = 'Lesser Armor';
  loots['Level2'].loot[2].quantity = '1';
  loots['Level2'].loot[2].chance = 60;
  loots['Level2'].loot[3] = {};
  loots['Level2'].loot[3].objname = 'Lesser Weapon';
  loots['Level2'].loot[3].quantity = '1';
  loots['Level2'].loot[3].chance = 40;
  loots['Level2'].loot[4] = {};
  loots['Level2'].loot[4].objname = 'Mid Weapon';
  loots['Level2'].loot[4].quantity = '1';
  loots['Level2'].loot[4].chance = 30;
  loots['Level2'].loot[5] = {};
  loots['Level2'].loot[5].objname = 'Medium Armor';
  loots['Level2'].loot[5].quantity = '1';
  loots['Level2'].loot[5].chance = 15;
  loots['Level2'].loot[6] = {};
  loots['Level2'].loot[6].objname = 'Potions1';
  loots['Level2'].loot[6].quantity = '1';
  loots['Level2'].loot[6].chance = 45;
  loots['Level2'].trap = 'weak';

  loots['Level1'] = new LootTable();
  loots['Level1'].goldDice = '2d8';
  loots['Level1'].goldChance = 50;
  loots['Level1'].loot[0] = {};
  loots['Level1'].loot[0].objname = 'Potions1';
  loots['Level1'].loot[0].quantity = '1';
  loots['Level1'].loot[0].chance = 35;
  loots['Level1'].loot[1] = {};
  loots['Level1'].loot[1].objname = 'Lesser Armor';
  loots['Level1'].loot[1].quantity = '1';
  loots['Level1'].loot[1].chance = 60;
  loots['Level1'].loot[2] = {};
  loots['Level1'].loot[2].objname = 'Lesser Weapon';
  loots['Level1'].loot[2].quantity = '1d2';
  loots['Level1'].loot[2].chance = 50;
  loots['Level1'].loot[3] = {};
  loots['Level1'].loot[3].objname = 'Scrolls1';
  loots['Level1'].loot[3].quantity = '1';
  loots['Level1'].loot[3].chance = 20;
  loots['Level1'].trap = 'weak';

  loots['Mage Town'] = new LootTable();
  loots['Mage Town'].goldDice = '2d4+2';
  loots['Mage Town'].goldChance = 100;
  loots['Mage Town'].loot[0] = {};
  loots['Mage Town'].loot[0].objname = 'Potions1';
  loots['Mage Town'].loot[0].quantity = '1';
  loots['Mage Town'].loot[0].chance = 100;
  loots['Mage Town'].loot[1] = {};
  loots['Mage Town'].loot[1].objname = 'Scrolls1';
  loots['Mage Town'].loot[1].quantity = '1d2';
  loots['Mage Town'].loot[1].chance = 100;

  loots['Orcs'] = new LootTable();
  loots['Orcs'].goldDice = '2d6+5';
  loots['Orcs'].goldChance = 100;
  loots['Orcs'].loot[0] = {};
  loots['Orcs'].loot[0].objname = 'Lesser Weapon';
  loots['Orcs'].loot[0].quantity = '1';
  loots['Orcs'].loot[0].chance = 20;
  loots['Orcs'].loot[1] = {};
  loots['Orcs'].loot[1].objname = 'Medium Weapon';
  loots['Orcs'].loot[1].quantity = '1';
  loots['Orcs'].loot[1].chance = 10;
  loots['Orcs'].trap = 'weak';

  return loots;
}

function SetLootGroups() {
  let DULootGroup = new LootGroups();

  DULootGroup.setTreasureType('Scrolls7',
  [
    'ScrollFear', 1,
    'ScrollMeteorSwarm', 1,
    'ScrollMindBlast', 1,
    'ScrollFireAndIce', 1,
  ]);

  DULootGroup.setTreasureType('Potions4',
  [
    'DarkGreenPotion', 1,
    'BrownPotion', 1,
    'BlackPotion', 1,
  ]);

  DULootGroup.setTreasureType('Lesser Armor',
  [
    'LeatherArmor', 2,
    'ClothArmor', 3,
  ]);

  DULootGroup.setTreasureType('All Weapons',
  [
    'Shortsword', 3,
    'Dagger', 3,
    'Mace', 2,
    'Axe', 2,
    'Halberd', 1,
    'Longsword', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls2',
  [
    'ScrollLesserHeal', 1,
    'ScrollPoisonCloud', 1,
    'ScrollIronFlesh', 1,
    'ScrollProtection', 1,
    'ScrollIllusion', 1,
    'ScrollMagicBolt', 1,
  ]);

  DULootGroup.setTreasureType('Potions2',
  [
    'PurplePotion', 2,
    'OrangePotion', 3,
    'BluePotion', 2,
  ]);

  DULootGroup.setTreasureType('Potions1',
  [
    'BrownPotion', 2,
    'WhitePotion', 2,
    'GreenPotion', 1,
    'YellowPotion', 2,
    'RedPotion', 2,
  ]);

  DULootGroup.setTreasureType('Heavy Weapon',
  [
    'Halberd', 1,
    'Longsword', 2,
  ]);

  DULootGroup.setTreasureType('Medium Armor',
  [
    'LeatherArmor', 3,
    'ChainArmor', 2,
  ]);

  DULootGroup.setTreasureType('Mid Weapon',
  [
    'Mace', 1,
    'Shortsword', 2,
  ]);

  DULootGroup.setTreasureType('Scrolls3',
  [
    'ScrollFireArmor', 1,
    'ScrollIceball', 1,
    'ScrollDisruptUndead', 1,
    'ScrollTelepathy', 1,
    'ScrollWallOfFlame', 1,
    'ScrollFireball', 1,
    'ScrollDispel', 1,
  ]);

  DULootGroup.setTreasureType('Potions3',
  [
    'GreyPotion', 1,
    'SilverPotion', 1,
    'PinkPotion', 1,
    'DeepBluePotion', 1,
  ]);

  DULootGroup.setTreasureType('Heavy Armor',
  [
    'ChainArmor', 3,
    'PlateArmor', 2,
  ]);

  DULootGroup.setTreasureType('Scrolls8',
  [
    'ScrollConflagration', 1,
    'ScrollConjureDaemon', 1,
    'ScrollTimeStop', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls1',
  [
    'ScrollDisarmTrap', 1,
    'ScrollDistract', 1,
    'ScrollVulnerability', 1,
    'ScrollLight', 1,
    'ScrollCure', 1,
    'ScrollFlameBlade', 1,
  ]);

  DULootGroup.setTreasureType('Medium Weapon',
  [
    'Axe', 3,
    'Mace', 5,
    'Longsword', 2,
  ]);

  DULootGroup.setTreasureType('Scrolls4',
  [
    'ScrollEtherealVision', 1,
    'ScrollSmite', 1,
    'ScrollLifeDrain', 1,
    'ScrollBlink', 1,
    'ScrollBlessing', 1,
    'ScrollHeal', 1,
  ]);

  DULootGroup.setTreasureType('Gems',
  [
    'Sapphire', 1,
    'SmallSapphire', 2,
    'Ruby', 2,
    'Gems', 1,
  ]);

  DULootGroup.setTreasureType('Lesser Weapon',
  [
    'Dagger', 2,
    'Shortsword', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls5',
  [
    'ScrollParalyze', 1,
    'ScrollMirrorWard', 1,
    'ScrollShockwave', 1,
    'ScrollPeer', 1,
    'ScrollCrystalBarrier', 1,
    'ScrollSwordstrike', 1,
    'ScrollSummonAlly', 1,
  ]);

  DULootGroup.setTreasureType('All Armor',
  [
    'PlateArmor', 1,
    'ChainArmor', 1,
    'ClothArmor', 2,
    'LeatherArmor', 2,
  ]);

  DULootGroup.setTreasureType('Scrolls6',
  [
    'ScrollExplosion', 1,
    'ScrollStorm', 1,
    'ScrollTremor', 1,
  ]);

  return DULootGroup;
}

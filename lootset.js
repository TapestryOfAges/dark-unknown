"use strict";

function SetLoots() {
  let loots = {};

  loots['Gazer'] = new LootTable();
  loots['Gazer'].goldDice = '5d12';
  loots['Gazer'].goldChance = 75;
  loots['Gazer'].loot[0] = {};
  loots['Gazer'].loot[0].objname = 'Nightshade';
  loots['Gazer'].loot[0].quantity = '1';
  loots['Gazer'].loot[0].chance = 25;

  loots['Level3'] = new LootTable();
  loots['Level3'].goldDice = '5d10';
  loots['Level3'].goldChance = 65;
  loots['Level3'].loot[0] = {};
  loots['Level3'].loot[0].objname = 'BluePalmCrystal';
  loots['Level3'].loot[0].quantity = '1';
  loots['Level3'].loot[0].chance = 5;
  loots['Level3'].loot[1] = {};
  loots['Level3'].loot[1].objname = 'Scrolls3';
  loots['Level3'].loot[1].quantity = '1';
  loots['Level3'].loot[1].chance = 20;
  loots['Level3'].loot[2] = {};
  loots['Level3'].loot[2].objname = 'Medium Armor';
  loots['Level3'].loot[2].quantity = '1';
  loots['Level3'].loot[2].chance = 25;
  loots['Level3'].loot[3] = {};
  loots['Level3'].loot[3].objname = 'GreenPalmCrystal';
  loots['Level3'].loot[3].quantity = '1';
  loots['Level3'].loot[3].chance = 5;
  loots['Level3'].loot[4] = {};
  loots['Level3'].loot[4].objname = 'Mid Weapon';
  loots['Level3'].loot[4].quantity = '1';
  loots['Level3'].loot[4].chance = 35;
  loots['Level3'].loot[5] = {};
  loots['Level3'].loot[5].objname = 'Potions1';
  loots['Level3'].loot[5].quantity = '1d2';
  loots['Level3'].loot[5].chance = 35;
  loots['Level3'].loot[6] = {};
  loots['Level3'].loot[6].objname = 'Lesser Weapon';
  loots['Level3'].loot[6].quantity = '1';
  loots['Level3'].loot[6].chance = 20;
  loots['Level3'].loot[7] = {};
  loots['Level3'].loot[7].objname = 'Scrolls1';
  loots['Level3'].loot[7].quantity = '1';
  loots['Level3'].loot[7].chance = 10;
  loots['Level3'].loot[8] = {};
  loots['Level3'].loot[8].objname = 'Scrolls2';
  loots['Level3'].loot[8].quantity = '1';
  loots['Level3'].loot[8].chance = 25;
  loots['Level3'].loot[9] = {};
  loots['Level3'].loot[9].objname = 'Potions2';
  loots['Level3'].loot[9].quantity = '1';
  loots['Level3'].loot[9].chance = 20;
  loots['Level3'].trap = 'weak';

  loots['Mage Town'] = new LootTable();
  loots['Mage Town'].goldDice = '2d4+2';
  loots['Mage Town'].goldChance = 100;
  loots['Mage Town'].loot[0] = {};
  loots['Mage Town'].loot[0].objname = 'Audachta1';
  loots['Mage Town'].loot[0].quantity = '1';
  loots['Mage Town'].loot[0].chance = 15;
  loots['Mage Town'].loot[1] = {};
  loots['Mage Town'].loot[1].objname = 'Potions1';
  loots['Mage Town'].loot[1].quantity = '1';
  loots['Mage Town'].loot[1].chance = 100;
  loots['Mage Town'].loot[2] = {};
  loots['Mage Town'].loot[2].objname = 'Scrolls1';
  loots['Mage Town'].loot[2].quantity = '1d2';
  loots['Mage Town'].loot[2].chance = 100;

  loots['potsmed'] = new LootTable();
  loots['potsmed'].goldDice = '2d10';
  loots['potsmed'].goldChance = 100;
  loots['potsmed'].loot[0] = {};
  loots['potsmed'].loot[0].objname = 'Potions2';
  loots['potsmed'].loot[0].quantity = '1';
  loots['potsmed'].loot[0].chance = 50;
  loots['potsmed'].loot[1] = {};
  loots['potsmed'].loot[1].objname = 'Potions1';
  loots['potsmed'].loot[1].quantity = '1d2';
  loots['potsmed'].loot[1].chance = 100;
  loots['potsmed'].loot[2] = {};
  loots['potsmed'].loot[2].objname = 'Potions3';
  loots['potsmed'].loot[2].quantity = '1';
  loots['potsmed'].loot[2].chance = 33;

  loots['smallguard'] = new LootTable();
  loots['smallguard'].loot[0] = {};
  loots['smallguard'].loot[0].objname = 'Lesser Armor';
  loots['smallguard'].loot[0].quantity = '1';
  loots['smallguard'].loot[0].chance = 100;
  loots['smallguard'].loot[1] = {};
  loots['smallguard'].loot[1].objname = 'Lesser Weapon';
  loots['smallguard'].loot[1].quantity = '1';
  loots['smallguard'].loot[1].chance = 100;

  loots['Town Guard'] = new LootTable();
  loots['Town Guard'].goldDice = '2d6';
  loots['Town Guard'].goldChance = 100;
  loots['Town Guard'].loot[0] = {};
  loots['Town Guard'].loot[0].objname = 'Medium Armor';
  loots['Town Guard'].loot[0].quantity = '1';
  loots['Town Guard'].loot[0].chance = 25;
  loots['Town Guard'].loot[1] = {};
  loots['Town Guard'].loot[1].objname = 'YellowPotion';
  loots['Town Guard'].loot[1].quantity = '1';
  loots['Town Guard'].loot[1].chance = 20;
  loots['Town Guard'].loot[2] = {};
  loots['Town Guard'].loot[2].objname = 'Medium Weapon';
  loots['Town Guard'].loot[2].quantity = '1';
  loots['Town Guard'].loot[2].chance = 40;
  loots['Town Guard'].trap = 'medium';

  loots['Ettin Sorcerer'] = new LootTable();
  loots['Ettin Sorcerer'].goldDice = '7d10+15';
  loots['Ettin Sorcerer'].goldChance = 100;
  loots['Ettin Sorcerer'].loot[0] = {};
  loots['Ettin Sorcerer'].loot[0].objname = 'Lesser Weapon';
  loots['Ettin Sorcerer'].loot[0].quantity = '1';
  loots['Ettin Sorcerer'].loot[0].chance = 30;
  loots['Ettin Sorcerer'].loot[1] = {};
  loots['Ettin Sorcerer'].loot[1].objname = 'Mid Weapon';
  loots['Ettin Sorcerer'].loot[1].quantity = '1';
  loots['Ettin Sorcerer'].loot[1].chance = 60;
  loots['Ettin Sorcerer'].loot[2] = {};
  loots['Ettin Sorcerer'].loot[2].objname = 'Mid Ranged';
  loots['Ettin Sorcerer'].loot[2].quantity = '1';
  loots['Ettin Sorcerer'].loot[2].chance = 15;
  loots['Ettin Sorcerer'].loot[3] = {};
  loots['Ettin Sorcerer'].loot[3].objname = 'Scrolls2';
  loots['Ettin Sorcerer'].loot[3].quantity = '1d2';
  loots['Ettin Sorcerer'].loot[3].chance = 75;
  loots['Ettin Sorcerer'].loot[4] = {};
  loots['Ettin Sorcerer'].loot[4].objname = 'Scrolls3';
  loots['Ettin Sorcerer'].loot[4].quantity = '1';
  loots['Ettin Sorcerer'].loot[4].chance = 25;
  loots['Ettin Sorcerer'].loot[5] = {};
  loots['Ettin Sorcerer'].loot[5].objname = 'Medium Armor';
  loots['Ettin Sorcerer'].loot[5].quantity = '1';
  loots['Ettin Sorcerer'].loot[5].chance = 50;
  loots['Ettin Sorcerer'].loot[6] = {};
  loots['Ettin Sorcerer'].loot[6].objname = 'Potions3';
  loots['Ettin Sorcerer'].loot[6].quantity = '1';
  loots['Ettin Sorcerer'].loot[6].chance = 50;
  loots['Ettin Sorcerer'].loot[7] = {};
  loots['Ettin Sorcerer'].loot[7].objname = 'Medium Weapon';
  loots['Ettin Sorcerer'].loot[7].quantity = '1';
  loots['Ettin Sorcerer'].loot[7].chance = 20;
  loots['Ettin Sorcerer'].trap = 'medium';

  loots['castlechest'] = new LootTable();
  loots['castlechest'].goldDice = '2d50';
  loots['castlechest'].goldChance = 100;
  loots['castlechest'].loot[0] = {};
  loots['castlechest'].loot[0].objname = 'BluePalmCrystal';
  loots['castlechest'].loot[0].quantity = '1';
  loots['castlechest'].loot[0].chance = 10;
  loots['castlechest'].loot[1] = {};
  loots['castlechest'].loot[1].objname = 'Scrolls7';
  loots['castlechest'].loot[1].quantity = '1';
  loots['castlechest'].loot[1].chance = 5;
  loots['castlechest'].loot[2] = {};
  loots['castlechest'].loot[2].objname = 'Scrolls3';
  loots['castlechest'].loot[2].quantity = '1';
  loots['castlechest'].loot[2].chance = 20;
  loots['castlechest'].loot[3] = {};
  loots['castlechest'].loot[3].objname = 'All Weapons';
  loots['castlechest'].loot[3].quantity = '1d3';
  loots['castlechest'].loot[3].chance = 60;
  loots['castlechest'].loot[4] = {};
  loots['castlechest'].loot[4].objname = 'All Armor';
  loots['castlechest'].loot[4].quantity = '1d2';
  loots['castlechest'].loot[4].chance = 50;
  loots['castlechest'].loot[5] = {};
  loots['castlechest'].loot[5].objname = 'Scrolls2';
  loots['castlechest'].loot[5].quantity = '1';
  loots['castlechest'].loot[5].chance = 25;
  loots['castlechest'].loot[6] = {};
  loots['castlechest'].loot[6].objname = 'Scrolls8';
  loots['castlechest'].loot[6].quantity = '1';
  loots['castlechest'].loot[6].chance = 5;
  loots['castlechest'].loot[7] = {};
  loots['castlechest'].loot[7].objname = 'PurplePalmCrystal';
  loots['castlechest'].loot[7].quantity = '1';
  loots['castlechest'].loot[7].chance = 5;
  loots['castlechest'].loot[8] = {};
  loots['castlechest'].loot[8].objname = 'Potions4';
  loots['castlechest'].loot[8].quantity = '1';
  loots['castlechest'].loot[8].chance = 10;
  loots['castlechest'].loot[9] = {};
  loots['castlechest'].loot[9].objname = 'Scrolls1';
  loots['castlechest'].loot[9].quantity = '1';
  loots['castlechest'].loot[9].chance = 25;
  loots['castlechest'].loot[10] = {};
  loots['castlechest'].loot[10].objname = 'Scrolls6';
  loots['castlechest'].loot[10].quantity = '1';
  loots['castlechest'].loot[10].chance = 10;
  loots['castlechest'].loot[11] = {};
  loots['castlechest'].loot[11].objname = 'Potions3';
  loots['castlechest'].loot[11].quantity = '1';
  loots['castlechest'].loot[11].chance = 15;
  loots['castlechest'].loot[12] = {};
  loots['castlechest'].loot[12].objname = 'Potions2';
  loots['castlechest'].loot[12].quantity = '1d2';
  loots['castlechest'].loot[12].chance = 30;
  loots['castlechest'].loot[13] = {};
  loots['castlechest'].loot[13].objname = 'Scrolls5';
  loots['castlechest'].loot[13].quantity = '1';
  loots['castlechest'].loot[13].chance = 15;
  loots['castlechest'].loot[14] = {};
  loots['castlechest'].loot[14].objname = 'Potions1';
  loots['castlechest'].loot[14].quantity = '1d2';
  loots['castlechest'].loot[14].chance = 30;
  loots['castlechest'].loot[15] = {};
  loots['castlechest'].loot[15].objname = 'Scrolls4';
  loots['castlechest'].loot[15].quantity = '1';
  loots['castlechest'].loot[15].chance = 15;
  loots['castlechest'].trap = 'strong';

  loots['paladinchest'] = new LootTable();
  loots['paladinchest'].goldDice = '10d10';
  loots['paladinchest'].goldChance = 100;
  loots['paladinchest'].loot[0] = {};
  loots['paladinchest'].loot[0].objname = 'ScrollSwordstrike';
  loots['paladinchest'].loot[0].quantity = '1';
  loots['paladinchest'].loot[0].chance = 100;
  loots['paladinchest'].loot[1] = {};
  loots['paladinchest'].loot[1].objname = 'HeavyArmor';
  loots['paladinchest'].loot[1].quantity = '2';
  loots['paladinchest'].loot[1].chance = 100;
  loots['paladinchest'].loot[2] = {};
  loots['paladinchest'].loot[2].objname = 'ScrollHealing';
  loots['paladinchest'].loot[2].quantity = '1';
  loots['paladinchest'].loot[2].chance = 100;
  loots['paladinchest'].loot[3] = {};
  loots['paladinchest'].loot[3].objname = 'HeavyWeapon';
  loots['paladinchest'].loot[3].quantity = '2';
  loots['paladinchest'].loot[3].chance = 100;

  loots['Giant Spider'] = new LootTable();
  loots['Giant Spider'].goldDice = '2d6+3';
  loots['Giant Spider'].goldChance = 45;
  loots['Giant Spider'].loot[0] = {};
  loots['Giant Spider'].loot[0].objname = 'Scroll1';
  loots['Giant Spider'].loot[0].quantity = '1d2';
  loots['Giant Spider'].loot[0].chance = 33;
  loots['Giant Spider'].loot[1] = {};
  loots['Giant Spider'].loot[1].objname = 'SpiderSilk';
  loots['Giant Spider'].loot[1].quantity = '1';
  loots['Giant Spider'].loot[1].chance = 100;

  loots['wilding2'] = new LootTable();
  loots['wilding2'].loot[0] = {};
  loots['wilding2'].loot[0].objname = 'AudachtaNemesosHeal';
  loots['wilding2'].loot[0].quantity = '1';
  loots['wilding2'].loot[0].chance = 100;
  loots['wilding2'].loot[1] = {};
  loots['wilding2'].loot[1].objname = 'DarkGreenPotion';
  loots['wilding2'].loot[1].quantity = '1';
  loots['wilding2'].loot[1].chance = 100;
  loots['wilding2'].trap = 'weak';

  loots['potshigh'] = new LootTable();
  loots['potshigh'].goldDice = '3d10';
  loots['potshigh'].goldChance = 100;
  loots['potshigh'].loot[0] = {};
  loots['potshigh'].loot[0].objname = 'Potions3';
  loots['potshigh'].loot[0].quantity = '1';
  loots['potshigh'].loot[0].chance = 50;
  loots['potshigh'].loot[1] = {};
  loots['potshigh'].loot[1].objname = 'Potions4';
  loots['potshigh'].loot[1].quantity = '1';
  loots['potshigh'].loot[1].chance = 33;
  loots['potshigh'].loot[2] = {};
  loots['potshigh'].loot[2].objname = 'Potions2';
  loots['potshigh'].loot[2].quantity = '1d2';
  loots['potshigh'].loot[2].chance = 100;

  loots['Blackdragon'] = new LootTable();
  loots['Blackdragon'].goldDice = '100';
  loots['Blackdragon'].goldChance = 100;
  loots['Blackdragon'].loot[0] = {};
  loots['Blackdragon'].loot[0].objname = 'BlackDragonScale';
  loots['Blackdragon'].loot[0].quantity = '1';
  loots['Blackdragon'].loot[0].chance = 100;

  loots['Underworld2'] = new LootTable();
  loots['Underworld2'].goldDice = '3d20+10';
  loots['Underworld2'].goldChance = 100;
  loots['Underworld2'].loot[0] = {};
  loots['Underworld2'].loot[0].objname = 'AudachtaNemesosMeteorSwarm';
  loots['Underworld2'].loot[0].quantity = '1';
  loots['Underworld2'].loot[0].chance = 100;
  loots['Underworld2'].trap = 'medium';

  loots['pc_home'] = new LootTable();
  loots['pc_home'].goldDice = '25d1';
  loots['pc_home'].goldChance = 100;
  loots['pc_home'].loot[0] = {};
  loots['pc_home'].loot[0].objname = 'YellowPotion';
  loots['pc_home'].loot[0].quantity = '1';
  loots['pc_home'].loot[0].chance = 100;

  loots['Orcs'] = new LootTable();
  loots['Orcs'].goldDice = '2d6+5';
  loots['Orcs'].goldChance = 100;
  loots['Orcs'].loot[0] = {};
  loots['Orcs'].loot[0].objname = 'Torch';
  loots['Orcs'].loot[0].quantity = '1';
  loots['Orcs'].loot[0].chance = 15;
  loots['Orcs'].loot[1] = {};
  loots['Orcs'].loot[1].objname = 'Lesser Weapon';
  loots['Orcs'].loot[1].quantity = '1';
  loots['Orcs'].loot[1].chance = 20;
  loots['Orcs'].loot[2] = {};
  loots['Orcs'].loot[2].objname = 'Medium Weapon';
  loots['Orcs'].loot[2].quantity = '1';
  loots['Orcs'].loot[2].chance = 10;
  loots['Orcs'].trap = 'weak';

  loots['Shadow2'] = new LootTable();
  loots['Shadow2'].goldDice = '4d6+10';
  loots['Shadow2'].goldChance = 100;
  loots['Shadow2'].loot[0] = {};
  loots['Shadow2'].loot[0].objname = 'Potions1';
  loots['Shadow2'].loot[0].quantity = '1';
  loots['Shadow2'].loot[0].chance = 60;
  loots['Shadow2'].loot[1] = {};
  loots['Shadow2'].loot[1].objname = 'Mid Weapon';
  loots['Shadow2'].loot[1].quantity = '1';
  loots['Shadow2'].loot[1].chance = 50;
  loots['Shadow2'].loot[2] = {};
  loots['Shadow2'].loot[2].objname = 'Medium Armor';
  loots['Shadow2'].loot[2].quantity = '1';
  loots['Shadow2'].loot[2].chance = 35;
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

  loots['cursed'] = new LootTable();
  loots['cursed'].goldDice = '2d10+10';
  loots['cursed'].goldChance = 100;
  loots['cursed'].loot[0] = {};
  loots['cursed'].loot[0].objname = 'StoneOfCurses';
  loots['cursed'].loot[0].quantity = '1';
  loots['cursed'].loot[0].chance = 100;

  loots['Level6'] = new LootTable();
  loots['Level6'].goldDice = '5d12+25';
  loots['Level6'].goldChance = 70;
  loots['Level6'].loot[0] = {};
  loots['Level6'].loot[0].objname = 'Potions2';
  loots['Level6'].loot[0].quantity = '1d2';
  loots['Level6'].loot[0].chance = 20;
  loots['Level6'].loot[1] = {};
  loots['Level6'].loot[1].objname = 'Heavy Armor';
  loots['Level6'].loot[1].quantity = '1';
  loots['Level6'].loot[1].chance = 35;
  loots['Level6'].loot[2] = {};
  loots['Level6'].loot[2].objname = 'Scrolls5';
  loots['Level6'].loot[2].quantity = '1';
  loots['Level6'].loot[2].chance = 25;
  loots['Level6'].loot[3] = {};
  loots['Level6'].loot[3].objname = 'Scrolls4';
  loots['Level6'].loot[3].quantity = '1d2';
  loots['Level6'].loot[3].chance = 25;
  loots['Level6'].loot[4] = {};
  loots['Level6'].loot[4].objname = 'Potions1';
  loots['Level6'].loot[4].quantity = '1d2';
  loots['Level6'].loot[4].chance = 20;
  loots['Level6'].loot[5] = {};
  loots['Level6'].loot[5].objname = 'Scrolls6';
  loots['Level6'].loot[5].quantity = '1';
  loots['Level6'].loot[5].chance = 20;
  loots['Level6'].loot[6] = {};
  loots['Level6'].loot[6].objname = 'Medium Armor';
  loots['Level6'].loot[6].quantity = '1';
  loots['Level6'].loot[6].chance = 25;
  loots['Level6'].loot[7] = {};
  loots['Level6'].loot[7].objname = 'Potions3';
  loots['Level6'].loot[7].quantity = '1d2';
  loots['Level6'].loot[7].chance = 20;
  loots['Level6'].loot[8] = {};
  loots['Level6'].loot[8].objname = 'Heavy Weapon';
  loots['Level6'].loot[8].quantity = '1';
  loots['Level6'].loot[8].chance = 35;
  loots['Level6'].loot[9] = {};
  loots['Level6'].loot[9].objname = 'Potions4';
  loots['Level6'].loot[9].quantity = '1d2';
  loots['Level6'].loot[9].chance = 20;
  loots['Level6'].loot[10] = {};
  loots['Level6'].loot[10].objname = 'Scrolls3';
  loots['Level6'].loot[10].quantity = '1d2';
  loots['Level6'].loot[10].chance = 25;
  loots['Level6'].loot[11] = {};
  loots['Level6'].loot[11].objname = 'Medium Weapon';
  loots['Level6'].loot[11].quantity = '1';
  loots['Level6'].loot[11].chance = 50;
  loots['Level6'].trap = 'strong';

  loots['prev_looted'] = new LootTable();
  loots['prev_looted'].goldDice = '1d4';
  loots['prev_looted'].goldChance = 100;

  loots['Specter'] = new LootTable();
  loots['Specter'].goldDice = '4d12+10';
  loots['Specter'].goldChance = 100;
  loots['Specter'].loot[0] = {};
  loots['Specter'].loot[0].objname = 'Audachta3';
  loots['Specter'].loot[0].quantity = '1';
  loots['Specter'].loot[0].chance = 10;
  loots['Specter'].loot[1] = {};
  loots['Specter'].loot[1].objname = 'Audachta2';
  loots['Specter'].loot[1].quantity = '1';
  loots['Specter'].loot[1].chance = 15;
  loots['Specter'].loot[2] = {};
  loots['Specter'].loot[2].objname = 'GreenPalmCrystal';
  loots['Specter'].loot[2].quantity = '1';
  loots['Specter'].loot[2].chance = 10;
  loots['Specter'].loot[3] = {};
  loots['Specter'].loot[3].objname = 'Scrolls4';
  loots['Specter'].loot[3].quantity = '1';
  loots['Specter'].loot[3].chance = 15;
  loots['Specter'].loot[4] = {};
  loots['Specter'].loot[4].objname = 'Audachta1';
  loots['Specter'].loot[4].quantity = '1';
  loots['Specter'].loot[4].chance = 15;
  loots['Specter'].loot[5] = {};
  loots['Specter'].loot[5].objname = 'BluePalmCrystal';
  loots['Specter'].loot[5].quantity = '1';
  loots['Specter'].loot[5].chance = 20;
  loots['Specter'].loot[6] = {};
  loots['Specter'].loot[6].objname = 'Scrolls3';
  loots['Specter'].loot[6].quantity = '1';
  loots['Specter'].loot[6].chance = 20;
  loots['Specter'].loot[7] = {};
  loots['Specter'].loot[7].objname = 'Scrolls2';
  loots['Specter'].loot[7].quantity = '1';
  loots['Specter'].loot[7].chance = 25;
  loots['Specter'].loot[8] = {};
  loots['Specter'].loot[8].objname = 'PurplePalmCrystal';
  loots['Specter'].loot[8].quantity = '1';
  loots['Specter'].loot[8].chance = 15;
  loots['Specter'].trap = 'weak';

  loots['Warduke'] = new LootTable();
  loots['Warduke'].goldDice = '2d6+10';
  loots['Warduke'].goldChance = 100;
  loots['Warduke'].loot[0] = {};
  loots['Warduke'].loot[0].objname = 'Heavy Weapon';
  loots['Warduke'].loot[0].quantity = '1';
  loots['Warduke'].loot[0].chance = 100;
  loots['Warduke'].loot[1] = {};
  loots['Warduke'].loot[1].objname = 'Heavy Armor';
  loots['Warduke'].loot[1].quantity = '1';
  loots['Warduke'].loot[1].chance = 100;
  loots['Warduke'].loot[2] = {};
  loots['Warduke'].loot[2].objname = 'Potions3';
  loots['Warduke'].loot[2].quantity = '1';
  loots['Warduke'].loot[2].chance = 15;
  loots['Warduke'].loot[3] = {};
  loots['Warduke'].loot[3].objname = 'Chalice';
  loots['Warduke'].loot[3].quantity = '1';
  loots['Warduke'].loot[3].chance = 100;
  loots['Warduke'].trap = 'medium';

  loots['wilding3'] = new LootTable();
  loots['wilding3'].goldDice = '20d10';
  loots['wilding3'].goldChance = 100;
  loots['wilding3'].loot[0] = {};
  loots['wilding3'].loot[0].objname = 'BrownPotion';
  loots['wilding3'].loot[0].quantity = '5';
  loots['wilding3'].loot[0].chance = 100;
  loots['wilding3'].loot[1] = {};
  loots['wilding3'].loot[1].objname = 'ScrollSummonAlly';
  loots['wilding3'].loot[1].quantity = '1';
  loots['wilding3'].loot[1].chance = 100;
  loots['wilding3'].trap = 'strong';

  loots['Adventurer'] = new LootTable();
  loots['Adventurer'].goldDice = '5d10+10';
  loots['Adventurer'].goldChance = 100;
  loots['Adventurer'].loot[0] = {};
  loots['Adventurer'].loot[0].objname = 'Lesser Weapon';
  loots['Adventurer'].loot[0].quantity = '1';
  loots['Adventurer'].loot[0].chance = 10;
  loots['Adventurer'].loot[1] = {};
  loots['Adventurer'].loot[1].objname = 'PurplePalmCrystal';
  loots['Adventurer'].loot[1].quantity = '1';
  loots['Adventurer'].loot[1].chance = 10;
  loots['Adventurer'].loot[2] = {};
  loots['Adventurer'].loot[2].objname = 'Mid Ranged';
  loots['Adventurer'].loot[2].quantity = '1';
  loots['Adventurer'].loot[2].chance = 10;
  loots['Adventurer'].loot[3] = {};
  loots['Adventurer'].loot[3].objname = 'Medium Weapon';
  loots['Adventurer'].loot[3].quantity = '1';
  loots['Adventurer'].loot[3].chance = 10;
  loots['Adventurer'].loot[4] = {};
  loots['Adventurer'].loot[4].objname = 'Scrolls3';
  loots['Adventurer'].loot[4].quantity = '1';
  loots['Adventurer'].loot[4].chance = 15;
  loots['Adventurer'].loot[5] = {};
  loots['Adventurer'].loot[5].objname = 'Potions1';
  loots['Adventurer'].loot[5].quantity = '1';
  loots['Adventurer'].loot[5].chance = 20;
  loots['Adventurer'].loot[6] = {};
  loots['Adventurer'].loot[6].objname = 'Mid Weapon';
  loots['Adventurer'].loot[6].quantity = '1';
  loots['Adventurer'].loot[6].chance = 30;
  loots['Adventurer'].loot[7] = {};
  loots['Adventurer'].loot[7].objname = 'Torch';
  loots['Adventurer'].loot[7].quantity = '1d2';
  loots['Adventurer'].loot[7].chance = 50;
  loots['Adventurer'].loot[8] = {};
  loots['Adventurer'].loot[8].objname = 'Potions2';
  loots['Adventurer'].loot[8].quantity = '1';
  loots['Adventurer'].loot[8].chance = 30;
  loots['Adventurer'].loot[9] = {};
  loots['Adventurer'].loot[9].objname = 'Medium Armor';
  loots['Adventurer'].loot[9].quantity = '1';
  loots['Adventurer'].loot[9].chance = 30;
  loots['Adventurer'].trap = 'medium';

  loots['GremlinMine'] = new LootTable();
  loots['GremlinMine'].goldDice = '2d20+1';
  loots['GremlinMine'].goldChance = 100;
  loots['GremlinMine'].loot[0] = {};
  loots['GremlinMine'].loot[0].objname = 'Uncut Sapphire';
  loots['GremlinMine'].loot[0].quantity = '1';
  loots['GremlinMine'].loot[0].chance = 3;
  loots['GremlinMine'].loot[1] = {};
  loots['GremlinMine'].loot[1].objname = 'UncutRuby';
  loots['GremlinMine'].loot[1].quantity = '1';
  loots['GremlinMine'].loot[1].chance = 3;
  loots['GremlinMine'].loot[2] = {};
  loots['GremlinMine'].loot[2].objname = 'UncutGems';
  loots['GremlinMine'].loot[2].quantity = '1';
  loots['GremlinMine'].loot[2].chance = 10;

  loots['potslow'] = new LootTable();
  loots['potslow'].goldDice = '2d20';
  loots['potslow'].goldChance = 80;
  loots['potslow'].loot[0] = {};
  loots['potslow'].loot[0].objname = 'Potions2';
  loots['potslow'].loot[0].quantity = '1';
  loots['potslow'].loot[0].chance = 20;
  loots['potslow'].loot[1] = {};
  loots['potslow'].loot[1].objname = 'Potions1';
  loots['potslow'].loot[1].quantity = '1d3';
  loots['potslow'].loot[1].chance = 100;

  loots['Medium Animal'] = new LootTable();
  loots['Medium Animal'].goldDice = '2d6+3';
  loots['Medium Animal'].goldChance = 45;
  loots['Medium Animal'].loot[0] = {};
  loots['Medium Animal'].loot[0].objname = 'Scroll1';
  loots['Medium Animal'].loot[0].quantity = '1d2';
  loots['Medium Animal'].loot[0].chance = 20;

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

  loots['Level4'] = new LootTable();
  loots['Level4'].goldDice = '7d10';
  loots['Level4'].goldChance = 65;
  loots['Level4'].loot[0] = {};
  loots['Level4'].loot[0].objname = 'Medium Armor';
  loots['Level4'].loot[0].quantity = '1';
  loots['Level4'].loot[0].chance = 40;
  loots['Level4'].loot[1] = {};
  loots['Level4'].loot[1].objname = 'Scrolls3';
  loots['Level4'].loot[1].quantity = '1d2';
  loots['Level4'].loot[1].chance = 20;
  loots['Level4'].loot[2] = {};
  loots['Level4'].loot[2].objname = 'BluePalmCrystal';
  loots['Level4'].loot[2].quantity = '1';
  loots['Level4'].loot[2].chance = 10;
  loots['Level4'].loot[3] = {};
  loots['Level4'].loot[3].objname = 'Potions2';
  loots['Level4'].loot[3].quantity = '1';
  loots['Level4'].loot[3].chance = 35;
  loots['Level4'].loot[4] = {};
  loots['Level4'].loot[4].objname = 'PurplePalmCrystal';
  loots['Level4'].loot[4].quantity = '1';
  loots['Level4'].loot[4].chance = 5;
  loots['Level4'].loot[5] = {};
  loots['Level4'].loot[5].objname = 'Scrolls2';
  loots['Level4'].loot[5].quantity = '1d2';
  loots['Level4'].loot[5].chance = 25;
  loots['Level4'].loot[6] = {};
  loots['Level4'].loot[6].objname = 'Scrolls1';
  loots['Level4'].loot[6].quantity = '1';
  loots['Level4'].loot[6].chance = 10;
  loots['Level4'].loot[7] = {};
  loots['Level4'].loot[7].objname = 'Lesser Weapon';
  loots['Level4'].loot[7].quantity = '1';
  loots['Level4'].loot[7].chance = 20;
  loots['Level4'].loot[8] = {};
  loots['Level4'].loot[8].objname = 'Potions1';
  loots['Level4'].loot[8].quantity = '1d2';
  loots['Level4'].loot[8].chance = 30;
  loots['Level4'].loot[9] = {};
  loots['Level4'].loot[9].objname = 'Scrolls4';
  loots['Level4'].loot[9].quantity = '1';
  loots['Level4'].loot[9].chance = 15;
  loots['Level4'].loot[10] = {};
  loots['Level4'].loot[10].objname = 'Mid Weapon';
  loots['Level4'].loot[10].quantity = '1';
  loots['Level4'].loot[10].chance = 45;
  loots['Level4'].trap = 'medium';

  loots['olympus_secret'] = new LootTable();
  loots['olympus_secret'].goldDice = '2d20';
  loots['olympus_secret'].goldChance = 100;
  loots['olympus_secret'].loot[0] = {};
  loots['olympus_secret'].loot[0].objname = 'Lesser Weapon';
  loots['olympus_secret'].loot[0].quantity = '1d2';
  loots['olympus_secret'].loot[0].chance = 60;
  loots['olympus_secret'].loot[1] = {};
  loots['olympus_secret'].loot[1].objname = 'Scrolls1';
  loots['olympus_secret'].loot[1].quantity = '1d2';
  loots['olympus_secret'].loot[1].chance = 25;
  loots['olympus_secret'].loot[2] = {};
  loots['olympus_secret'].loot[2].objname = 'Potions1';
  loots['olympus_secret'].loot[2].quantity = '1d2';
  loots['olympus_secret'].loot[2].chance = 40;
  loots['olympus_secret'].loot[3] = {};
  loots['olympus_secret'].loot[3].objname = 'Lesser Armor';
  loots['olympus_secret'].loot[3].quantity = '1';
  loots['olympus_secret'].loot[3].chance = 33;

  loots['pc_start'] = new LootTable();
  loots['pc_start'].loot[0] = {};
  loots['pc_start'].loot[0].objname = 'LeatherArmor';
  loots['pc_start'].loot[0].quantity = '1';
  loots['pc_start'].loot[0].chance = 100;
  loots['pc_start'].loot[1] = {};
  loots['pc_start'].loot[1].objname = 'Shortsword';
  loots['pc_start'].loot[1].quantity = '1';
  loots['pc_start'].loot[1].chance = 100;

  loots['wilding1'] = new LootTable();
  loots['wilding1'].goldDice = '250';
  loots['wilding1'].goldChance = 100;

  loots['Level7'] = new LootTable();
  loots['Level7'].goldDice = '8d10+15';
  loots['Level7'].goldChance = 75;
  loots['Level7'].loot[0] = {};
  loots['Level7'].loot[0].objname = 'Potions2';
  loots['Level7'].loot[0].quantity = '1d2';
  loots['Level7'].loot[0].chance = 30;
  loots['Level7'].loot[1] = {};
  loots['Level7'].loot[1].objname = 'Scrolls5';
  loots['Level7'].loot[1].quantity = '1';
  loots['Level7'].loot[1].chance = 30;
  loots['Level7'].loot[2] = {};
  loots['Level7'].loot[2].objname = 'Heavy Armor';
  loots['Level7'].loot[2].quantity = '1';
  loots['Level7'].loot[2].chance = 35;
  loots['Level7'].loot[3] = {};
  loots['Level7'].loot[3].objname = 'Scrolls4';
  loots['Level7'].loot[3].quantity = '1d2';
  loots['Level7'].loot[3].chance = 30;
  loots['Level7'].loot[4] = {};
  loots['Level7'].loot[4].objname = 'Potions1';
  loots['Level7'].loot[4].quantity = '1d2';
  loots['Level7'].loot[4].chance = 30;
  loots['Level7'].loot[5] = {};
  loots['Level7'].loot[5].objname = 'Scrolls6';
  loots['Level7'].loot[5].quantity = '1';
  loots['Level7'].loot[5].chance = 20;
  loots['Level7'].loot[6] = {};
  loots['Level7'].loot[6].objname = 'Medium Armor';
  loots['Level7'].loot[6].quantity = '1';
  loots['Level7'].loot[6].chance = 25;
  loots['Level7'].loot[7] = {};
  loots['Level7'].loot[7].objname = 'Potions3';
  loots['Level7'].loot[7].quantity = '1';
  loots['Level7'].loot[7].chance = 10;
  loots['Level7'].loot[8] = {};
  loots['Level7'].loot[8].objname = 'Potions4';
  loots['Level7'].loot[8].quantity = '1';
  loots['Level7'].loot[8].chance = 10;
  loots['Level7'].loot[9] = {};
  loots['Level7'].loot[9].objname = 'Heavy Weapon';
  loots['Level7'].loot[9].quantity = '1';
  loots['Level7'].loot[9].chance = 35;
  loots['Level7'].loot[10] = {};
  loots['Level7'].loot[10].objname = 'Scrolls3';
  loots['Level7'].loot[10].quantity = '1d2';
  loots['Level7'].loot[10].chance = 30;
  loots['Level7'].loot[11] = {};
  loots['Level7'].loot[11].objname = 'Scrolls7';
  loots['Level7'].loot[11].quantity = '1';
  loots['Level7'].loot[11].chance = 10;
  loots['Level7'].loot[12] = {};
  loots['Level7'].loot[12].objname = 'Medium Weapon';
  loots['Level7'].loot[12].quantity = '1';
  loots['Level7'].loot[12].chance = 25;
  loots['Level7'].trap = 'strong';

  loots['swainhilcave'] = new LootTable();
  loots['swainhilcave'].goldDice = '10d10';
  loots['swainhilcave'].goldChance = 100;
  loots['swainhilcave'].loot[0] = {};
  loots['swainhilcave'].loot[0].objname = 'Mid Ranged';
  loots['swainhilcave'].loot[0].quantity = '1';
  loots['swainhilcave'].loot[0].chance = 100;
  loots['swainhilcave'].loot[1] = {};
  loots['swainhilcave'].loot[1].objname = 'GoldLocket';
  loots['swainhilcave'].loot[1].quantity = '1';
  loots['swainhilcave'].loot[1].chance = 100;
  loots['swainhilcave'].loot[2] = {};
  loots['swainhilcave'].loot[2].objname = 'Potions1';
  loots['swainhilcave'].loot[2].quantity = '1d2';
  loots['swainhilcave'].loot[2].chance = 100;
  loots['swainhilcave'].trap = 'weak';

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

  loots['justicecrystal'] = new LootTable();
  loots['justicecrystal'].loot[0] = {};
  loots['justicecrystal'].loot[0].objname = 'JusticeOrb';
  loots['justicecrystal'].loot[0].quantity = '1';
  loots['justicecrystal'].loot[0].chance = 100;

  loots['Toshin'] = new LootTable();
  loots['Toshin'].goldDice = '4d10';
  loots['Toshin'].goldChance = 70;
  loots['Toshin'].loot[0] = {};
  loots['Toshin'].loot[0].objname = 'Audachta1';
  loots['Toshin'].loot[0].quantity = '1';
  loots['Toshin'].loot[0].chance = 10;
  loots['Toshin'].loot[1] = {};
  loots['Toshin'].loot[1].objname = 'Scrolls3';
  loots['Toshin'].loot[1].quantity = '1d2';
  loots['Toshin'].loot[1].chance = 35;
  loots['Toshin'].loot[2] = {};
  loots['Toshin'].loot[2].objname = 'Scrolls2';
  loots['Toshin'].loot[2].quantity = '1';
  loots['Toshin'].loot[2].chance = 30;
  loots['Toshin'].loot[3] = {};
  loots['Toshin'].loot[3].objname = 'Potions3';
  loots['Toshin'].loot[3].quantity = '1';
  loots['Toshin'].loot[3].chance = 30;
  loots['Toshin'].loot[4] = {};
  loots['Toshin'].loot[4].objname = 'Audachta2';
  loots['Toshin'].loot[4].quantity = '1';
  loots['Toshin'].loot[4].chance = 10;
  loots['Toshin'].loot[5] = {};
  loots['Toshin'].loot[5].objname = 'Potions2';
  loots['Toshin'].loot[5].quantity = '1d2';
  loots['Toshin'].loot[5].chance = 35;
  loots['Toshin'].loot[6] = {};
  loots['Toshin'].loot[6].objname = 'Scrolls5';
  loots['Toshin'].loot[6].quantity = '1';
  loots['Toshin'].loot[6].chance = 25;
  loots['Toshin'].loot[7] = {};
  loots['Toshin'].loot[7].objname = 'Potions1';
  loots['Toshin'].loot[7].quantity = '1';
  loots['Toshin'].loot[7].chance = 35;
  loots['Toshin'].loot[8] = {};
  loots['Toshin'].loot[8].objname = 'Scrolls4';
  loots['Toshin'].loot[8].quantity = '1';
  loots['Toshin'].loot[8].chance = 30;
  loots['Toshin'].trap = 'medium';

  loots['Lesser Adventurer'] = new LootTable();
  loots['Lesser Adventurer'].goldDice = '3d10+5';
  loots['Lesser Adventurer'].goldChance = 100;
  loots['Lesser Adventurer'].loot[0] = {};
  loots['Lesser Adventurer'].loot[0].objname = 'Low Ranged';
  loots['Lesser Adventurer'].loot[0].quantity = '1';
  loots['Lesser Adventurer'].loot[0].chance = 15;
  loots['Lesser Adventurer'].loot[1] = {};
  loots['Lesser Adventurer'].loot[1].objname = 'Medium Armor';
  loots['Lesser Adventurer'].loot[1].quantity = '1';
  loots['Lesser Adventurer'].loot[1].chance = 15;
  loots['Lesser Adventurer'].loot[2] = {};
  loots['Lesser Adventurer'].loot[2].objname = 'Torch';
  loots['Lesser Adventurer'].loot[2].quantity = '1d2';
  loots['Lesser Adventurer'].loot[2].chance = 50;
  loots['Lesser Adventurer'].loot[3] = {};
  loots['Lesser Adventurer'].loot[3].objname = 'Potions2';
  loots['Lesser Adventurer'].loot[3].quantity = '1';
  loots['Lesser Adventurer'].loot[3].chance = 15;
  loots['Lesser Adventurer'].loot[4] = {};
  loots['Lesser Adventurer'].loot[4].objname = 'Mid Weapon';
  loots['Lesser Adventurer'].loot[4].quantity = '1';
  loots['Lesser Adventurer'].loot[4].chance = 15;
  loots['Lesser Adventurer'].loot[5] = {};
  loots['Lesser Adventurer'].loot[5].objname = 'GreenPalmCrystal';
  loots['Lesser Adventurer'].loot[5].quantity = '1';
  loots['Lesser Adventurer'].loot[5].chance = 10;
  loots['Lesser Adventurer'].loot[6] = {};
  loots['Lesser Adventurer'].loot[6].objname = 'Potions1';
  loots['Lesser Adventurer'].loot[6].quantity = '1';
  loots['Lesser Adventurer'].loot[6].chance = 20;
  loots['Lesser Adventurer'].loot[7] = {};
  loots['Lesser Adventurer'].loot[7].objname = 'Lesser Weapon';
  loots['Lesser Adventurer'].loot[7].quantity = '1';
  loots['Lesser Adventurer'].loot[7].chance = 20;
  loots['Lesser Adventurer'].loot[8] = {};
  loots['Lesser Adventurer'].loot[8].objname = 'Scrolls1';
  loots['Lesser Adventurer'].loot[8].quantity = '1';
  loots['Lesser Adventurer'].loot[8].chance = 15;
  loots['Lesser Adventurer'].trap = 'medium';

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

  loots['Small Animal'] = new LootTable();
  loots['Small Animal'].goldDice = '1d3';
  loots['Small Animal'].goldChance = 1;

  loots['Cyclops'] = new LootTable();
  loots['Cyclops'].goldDice = '7d10';
  loots['Cyclops'].goldChance = 100;
  loots['Cyclops'].loot[0] = {};
  loots['Cyclops'].loot[0].objname = 'Medium Armor';
  loots['Cyclops'].loot[0].quantity = '1';
  loots['Cyclops'].loot[0].chance = 50;
  loots['Cyclops'].loot[1] = {};
  loots['Cyclops'].loot[1].objname = 'Lesser Weapon';
  loots['Cyclops'].loot[1].quantity = '1';
  loots['Cyclops'].loot[1].chance = 30;
  loots['Cyclops'].loot[2] = {};
  loots['Cyclops'].loot[2].objname = 'Mid Weapon';
  loots['Cyclops'].loot[2].quantity = '1';
  loots['Cyclops'].loot[2].chance = 60;
  loots['Cyclops'].trap = 'medium';

  loots['Ettin'] = new LootTable();
  loots['Ettin'].goldDice = '7d10+15';
  loots['Ettin'].goldChance = 100;
  loots['Ettin'].loot[0] = {};
  loots['Ettin'].loot[0].objname = 'Medium Armor';
  loots['Ettin'].loot[0].quantity = '1';
  loots['Ettin'].loot[0].chance = 50;
  loots['Ettin'].loot[1] = {};
  loots['Ettin'].loot[1].objname = 'Medium Weapon';
  loots['Ettin'].loot[1].quantity = '1';
  loots['Ettin'].loot[1].chance = 20;
  loots['Ettin'].loot[2] = {};
  loots['Ettin'].loot[2].objname = 'Mid Ranged';
  loots['Ettin'].loot[2].quantity = '1';
  loots['Ettin'].loot[2].chance = 15;
  loots['Ettin'].loot[3] = {};
  loots['Ettin'].loot[3].objname = 'Lesser Weapon';
  loots['Ettin'].loot[3].quantity = '1';
  loots['Ettin'].loot[3].chance = 30;
  loots['Ettin'].loot[4] = {};
  loots['Ettin'].loot[4].objname = 'Potions1';
  loots['Ettin'].loot[4].quantity = '1';
  loots['Ettin'].loot[4].chance = 50;
  loots['Ettin'].loot[5] = {};
  loots['Ettin'].loot[5].objname = 'Mid Weapon';
  loots['Ettin'].loot[5].quantity = '1';
  loots['Ettin'].loot[5].chance = 60;
  loots['Ettin'].trap = 'medium';

  loots['Willowisp'] = new LootTable();
  loots['Willowisp'].goldDice = '4d12+10';
  loots['Willowisp'].goldChance = 100;
  loots['Willowisp'].loot[0] = {};
  loots['Willowisp'].loot[0].objname = 'Audachta1';
  loots['Willowisp'].loot[0].quantity = '1';
  loots['Willowisp'].loot[0].chance = 15;
  loots['Willowisp'].loot[1] = {};
  loots['Willowisp'].loot[1].objname = 'Audachta3';
  loots['Willowisp'].loot[1].quantity = '1';
  loots['Willowisp'].loot[1].chance = 10;
  loots['Willowisp'].loot[2] = {};
  loots['Willowisp'].loot[2].objname = 'Audachta2';
  loots['Willowisp'].loot[2].quantity = '1';
  loots['Willowisp'].loot[2].chance = 15;
  loots['Willowisp'].loot[3] = {};
  loots['Willowisp'].loot[3].objname = 'Scrolls3';
  loots['Willowisp'].loot[3].quantity = '1';
  loots['Willowisp'].loot[3].chance = 20;
  loots['Willowisp'].loot[4] = {};
  loots['Willowisp'].loot[4].objname = 'Scrolls2';
  loots['Willowisp'].loot[4].quantity = '1';
  loots['Willowisp'].loot[4].chance = 25;
  loots['Willowisp'].loot[5] = {};
  loots['Willowisp'].loot[5].objname = 'Scrolls4';
  loots['Willowisp'].loot[5].quantity = '1';
  loots['Willowisp'].loot[5].chance = 15;
  loots['Willowisp'].trap = 'weak';

  loots['Gremlin'] = new LootTable();
  loots['Gremlin'].goldDice = '2d20+1';
  loots['Gremlin'].goldChance = 100;

  loots['shrinecavechest'] = new LootTable();
  loots['shrinecavechest'].loot[0] = {};
  loots['shrinecavechest'].loot[0].objname = 'XApprenticeJournal';
  loots['shrinecavechest'].loot[0].quantity = '1';
  loots['shrinecavechest'].loot[0].chance = 100;
  loots['shrinecavechest'].loot[1] = {};
  loots['shrinecavechest'].loot[1].objname = 'ScrollProtection';
  loots['shrinecavechest'].loot[1].quantity = '1';
  loots['shrinecavechest'].loot[1].chance = 100;

  loots['Archmage'] = new LootTable();
  loots['Archmage'].goldDice = '5d12+25';
  loots['Archmage'].goldChance = 70;
  loots['Archmage'].loot[0] = {};
  loots['Archmage'].loot[0].objname = 'Scrolls3';
  loots['Archmage'].loot[0].quantity = '1d2';
  loots['Archmage'].loot[0].chance = 30;
  loots['Archmage'].loot[1] = {};
  loots['Archmage'].loot[1].objname = 'Audachta1';
  loots['Archmage'].loot[1].quantity = '1';
  loots['Archmage'].loot[1].chance = 15;
  loots['Archmage'].loot[2] = {};
  loots['Archmage'].loot[2].objname = 'Potions4';
  loots['Archmage'].loot[2].quantity = '1d2';
  loots['Archmage'].loot[2].chance = 25;
  loots['Archmage'].loot[3] = {};
  loots['Archmage'].loot[3].objname = 'Audachta2';
  loots['Archmage'].loot[3].quantity = '1';
  loots['Archmage'].loot[3].chance = 15;
  loots['Archmage'].loot[4] = {};
  loots['Archmage'].loot[4].objname = 'Potions3';
  loots['Archmage'].loot[4].quantity = '1d2';
  loots['Archmage'].loot[4].chance = 25;
  loots['Archmage'].loot[5] = {};
  loots['Archmage'].loot[5].objname = 'Audachta3';
  loots['Archmage'].loot[5].quantity = '1';
  loots['Archmage'].loot[5].chance = 10;
  loots['Archmage'].loot[6] = {};
  loots['Archmage'].loot[6].objname = 'Scrolls6';
  loots['Archmage'].loot[6].quantity = '1';
  loots['Archmage'].loot[6].chance = 20;
  loots['Archmage'].loot[7] = {};
  loots['Archmage'].loot[7].objname = 'Scrolls5';
  loots['Archmage'].loot[7].quantity = '1';
  loots['Archmage'].loot[7].chance = 30;
  loots['Archmage'].loot[8] = {};
  loots['Archmage'].loot[8].objname = 'Potions1';
  loots['Archmage'].loot[8].quantity = '1d2';
  loots['Archmage'].loot[8].chance = 25;
  loots['Archmage'].loot[9] = {};
  loots['Archmage'].loot[9].objname = 'Scrolls4';
  loots['Archmage'].loot[9].quantity = '1d2';
  loots['Archmage'].loot[9].chance = 30;
  loots['Archmage'].loot[10] = {};
  loots['Archmage'].loot[10].objname = 'Potions2';
  loots['Archmage'].loot[10].quantity = '1d2';
  loots['Archmage'].loot[10].chance = 25;
  loots['Archmage'].loot[11] = {};
  loots['Archmage'].loot[11].objname = 'Audachta4';
  loots['Archmage'].loot[11].quantity = '1';
  loots['Archmage'].loot[11].chance = 10;
  loots['Archmage'].trap = 'strong';

  loots['headlesscave'] = new LootTable();
  loots['headlesscave'].goldDice = '2d6+5';
  loots['headlesscave'].goldChance = 100;
  loots['headlesscave'].loot[0] = {};
  loots['headlesscave'].loot[0].objname = 'Lesser Weapon';
  loots['headlesscave'].loot[0].quantity = '1';
  loots['headlesscave'].loot[0].chance = 20;
  loots['headlesscave'].loot[1] = {};
  loots['headlesscave'].loot[1].objname = 'Scrolls1';
  loots['headlesscave'].loot[1].quantity = '1d2';
  loots['headlesscave'].loot[1].chance = 25;
  loots['headlesscave'].loot[2] = {};
  loots['headlesscave'].loot[2].objname = 'Mid Weapon';
  loots['headlesscave'].loot[2].quantity = '1';
  loots['headlesscave'].loot[2].chance = 25;
  loots['headlesscave'].loot[3] = {};
  loots['headlesscave'].loot[3].objname = 'Potions1';
  loots['headlesscave'].loot[3].quantity = '1d2';
  loots['headlesscave'].loot[3].chance = 25;
  loots['headlesscave'].trap = 'weak';

  loots['Minor Adventurer'] = new LootTable();
  loots['Minor Adventurer'].goldDice = '2d6+1';
  loots['Minor Adventurer'].goldChance = 100;
  loots['Minor Adventurer'].loot[0] = {};
  loots['Minor Adventurer'].loot[0].objname = 'Lesser Armor';
  loots['Minor Adventurer'].loot[0].quantity = '1';
  loots['Minor Adventurer'].loot[0].chance = 20;
  loots['Minor Adventurer'].loot[1] = {};
  loots['Minor Adventurer'].loot[1].objname = 'Potions1';
  loots['Minor Adventurer'].loot[1].quantity = '1';
  loots['Minor Adventurer'].loot[1].chance = 15;
  loots['Minor Adventurer'].loot[2] = {};
  loots['Minor Adventurer'].loot[2].objname = 'Lesser Weapon';
  loots['Minor Adventurer'].loot[2].quantity = '1';
  loots['Minor Adventurer'].loot[2].chance = 20;
  loots['Minor Adventurer'].loot[3] = {};
  loots['Minor Adventurer'].loot[3].objname = 'Torch';
  loots['Minor Adventurer'].loot[3].quantity = '1';
  loots['Minor Adventurer'].loot[3].chance = 15;
  loots['Minor Adventurer'].trap = 'weak';

  loots['High Orcs'] = new LootTable();
  loots['High Orcs'].goldDice = '4d12+10';
  loots['High Orcs'].goldChance = 100;
  loots['High Orcs'].loot[0] = {};
  loots['High Orcs'].loot[0].objname = 'Potions1';
  loots['High Orcs'].loot[0].quantity = '1';
  loots['High Orcs'].loot[0].chance = 50;
  loots['High Orcs'].loot[1] = {};
  loots['High Orcs'].loot[1].objname = 'Mid Weapon';
  loots['High Orcs'].loot[1].quantity = '1';
  loots['High Orcs'].loot[1].chance = 60;
  loots['High Orcs'].loot[2] = {};
  loots['High Orcs'].loot[2].objname = 'Mid Ranged';
  loots['High Orcs'].loot[2].quantity = '1';
  loots['High Orcs'].loot[2].chance = 15;
  loots['High Orcs'].loot[3] = {};
  loots['High Orcs'].loot[3].objname = 'Potions2';
  loots['High Orcs'].loot[3].quantity = '1';
  loots['High Orcs'].loot[3].chance = 30;
  loots['High Orcs'].loot[4] = {};
  loots['High Orcs'].loot[4].objname = 'Medium Weapon';
  loots['High Orcs'].loot[4].quantity = '1';
  loots['High Orcs'].loot[4].chance = 20;
  loots['High Orcs'].loot[5] = {};
  loots['High Orcs'].loot[5].objname = 'Medium Armor';
  loots['High Orcs'].loot[5].quantity = '1';
  loots['High Orcs'].loot[5].chance = 50;
  loots['High Orcs'].trap = 'medium';

  loots['Pit Rogue'] = new LootTable();
  loots['Pit Rogue'].loot[0] = {};
  loots['Pit Rogue'].loot[0].objname = 'PitOfDespairKey';
  loots['Pit Rogue'].loot[0].quantity = '1';
  loots['Pit Rogue'].loot[0].chance = 5;

  loots['High Adventurer'] = new LootTable();
  loots['High Adventurer'].goldDice = '6d12+15';
  loots['High Adventurer'].goldChance = 100;
  loots['High Adventurer'].loot[0] = {};
  loots['High Adventurer'].loot[0].objname = 'Medium Weapon';
  loots['High Adventurer'].loot[0].quantity = '1';
  loots['High Adventurer'].loot[0].chance = 10;
  loots['High Adventurer'].loot[1] = {};
  loots['High Adventurer'].loot[1].objname = 'Scrolls3';
  loots['High Adventurer'].loot[1].quantity = '1';
  loots['High Adventurer'].loot[1].chance = 15;
  loots['High Adventurer'].loot[2] = {};
  loots['High Adventurer'].loot[2].objname = 'BluePalmCrystal';
  loots['High Adventurer'].loot[2].quantity = '1';
  loots['High Adventurer'].loot[2].chance = 10;
  loots['High Adventurer'].loot[3] = {};
  loots['High Adventurer'].loot[3].objname = 'Audachta1';
  loots['High Adventurer'].loot[3].quantity = '1';
  loots['High Adventurer'].loot[3].chance = 10;
  loots['High Adventurer'].loot[4] = {};
  loots['High Adventurer'].loot[4].objname = 'Heavy Weapon';
  loots['High Adventurer'].loot[4].quantity = '1';
  loots['High Adventurer'].loot[4].chance = 10;
  loots['High Adventurer'].loot[5] = {};
  loots['High Adventurer'].loot[5].objname = 'PurplePalmCrystal';
  loots['High Adventurer'].loot[5].quantity = '1';
  loots['High Adventurer'].loot[5].chance = 10;
  loots['High Adventurer'].loot[6] = {};
  loots['High Adventurer'].loot[6].objname = 'Mid Ranged';
  loots['High Adventurer'].loot[6].quantity = '1';
  loots['High Adventurer'].loot[6].chance = 10;
  loots['High Adventurer'].loot[7] = {};
  loots['High Adventurer'].loot[7].objname = 'Scrolls2';
  loots['High Adventurer'].loot[7].quantity = '1';
  loots['High Adventurer'].loot[7].chance = 20;
  loots['High Adventurer'].loot[8] = {};
  loots['High Adventurer'].loot[8].objname = 'Potions3';
  loots['High Adventurer'].loot[8].quantity = '1';
  loots['High Adventurer'].loot[8].chance = 30;
  loots['High Adventurer'].loot[9] = {};
  loots['High Adventurer'].loot[9].objname = 'Audachta2';
  loots['High Adventurer'].loot[9].quantity = '1';
  loots['High Adventurer'].loot[9].chance = 10;
  loots['High Adventurer'].loot[10] = {};
  loots['High Adventurer'].loot[10].objname = 'Medium Armor';
  loots['High Adventurer'].loot[10].quantity = '1';
  loots['High Adventurer'].loot[10].chance = 30;
  loots['High Adventurer'].loot[11] = {};
  loots['High Adventurer'].loot[11].objname = 'Scrolls4';
  loots['High Adventurer'].loot[11].quantity = '1';
  loots['High Adventurer'].loot[11].chance = 10;
  loots['High Adventurer'].loot[12] = {};
  loots['High Adventurer'].loot[12].objname = 'Potions1';
  loots['High Adventurer'].loot[12].quantity = '1';
  loots['High Adventurer'].loot[12].chance = 15;
  loots['High Adventurer'].loot[13] = {};
  loots['High Adventurer'].loot[13].objname = 'Mid Weapon';
  loots['High Adventurer'].loot[13].quantity = '1';
  loots['High Adventurer'].loot[13].chance = 30;
  loots['High Adventurer'].loot[14] = {};
  loots['High Adventurer'].loot[14].objname = 'Torch';
  loots['High Adventurer'].loot[14].quantity = '1d2';
  loots['High Adventurer'].loot[14].chance = 50;
  loots['High Adventurer'].loot[15] = {};
  loots['High Adventurer'].loot[15].objname = 'Potions2';
  loots['High Adventurer'].loot[15].quantity = '1';
  loots['High Adventurer'].loot[15].chance = 20;
  loots['High Adventurer'].trap = 'medium';

  loots['Phantom'] = new LootTable();
  loots['Phantom'].goldDice = '4d10';
  loots['Phantom'].goldChance = 100;
  loots['Phantom'].loot[0] = {};
  loots['Phantom'].loot[0].objname = 'PurplePalmCrystal';
  loots['Phantom'].loot[0].quantity = '1';
  loots['Phantom'].loot[0].chance = 15;
  loots['Phantom'].loot[1] = {};
  loots['Phantom'].loot[1].objname = 'BluePalmCrystal';
  loots['Phantom'].loot[1].quantity = '1';
  loots['Phantom'].loot[1].chance = 20;
  loots['Phantom'].loot[2] = {};
  loots['Phantom'].loot[2].objname = 'GreenPalmCrystal';
  loots['Phantom'].loot[2].quantity = '1';
  loots['Phantom'].loot[2].chance = 10;

  loots['Headlesses'] = new LootTable();
  loots['Headlesses'].goldDice = '2d6+5';
  loots['Headlesses'].goldChance = 100;
  loots['Headlesses'].loot[0] = {};
  loots['Headlesses'].loot[0].objname = 'Mid Weapon';
  loots['Headlesses'].loot[0].quantity = '1';
  loots['Headlesses'].loot[0].chance = 20;
  loots['Headlesses'].loot[1] = {};
  loots['Headlesses'].loot[1].objname = 'Potions1';
  loots['Headlesses'].loot[1].quantity = '1';
  loots['Headlesses'].loot[1].chance = 25;
  loots['Headlesses'].loot[2] = {};
  loots['Headlesses'].loot[2].objname = 'Lesser Weapon';
  loots['Headlesses'].loot[2].quantity = '1';
  loots['Headlesses'].loot[2].chance = 40;

  loots['Level2'] = new LootTable();
  loots['Level2'].goldDice = '3d12';
  loots['Level2'].goldChance = 50;
  loots['Level2'].loot[0] = {};
  loots['Level2'].loot[0].objname = 'Scrolls2';
  loots['Level2'].loot[0].quantity = '1';
  loots['Level2'].loot[0].chance = 20;
  loots['Level2'].loot[1] = {};
  loots['Level2'].loot[1].objname = 'Mid Weapon';
  loots['Level2'].loot[1].quantity = '1';
  loots['Level2'].loot[1].chance = 30;
  loots['Level2'].loot[2] = {};
  loots['Level2'].loot[2].objname = 'GreenPalmCrystal';
  loots['Level2'].loot[2].quantity = '1';
  loots['Level2'].loot[2].chance = 10;
  loots['Level2'].loot[3] = {};
  loots['Level2'].loot[3].objname = 'Lesser Armor';
  loots['Level2'].loot[3].quantity = '1';
  loots['Level2'].loot[3].chance = 60;
  loots['Level2'].loot[4] = {};
  loots['Level2'].loot[4].objname = 'Potions1';
  loots['Level2'].loot[4].quantity = '1';
  loots['Level2'].loot[4].chance = 45;
  loots['Level2'].loot[5] = {};
  loots['Level2'].loot[5].objname = 'Lesser Weapon';
  loots['Level2'].loot[5].quantity = '1';
  loots['Level2'].loot[5].chance = 40;
  loots['Level2'].loot[6] = {};
  loots['Level2'].loot[6].objname = 'Scrolls1';
  loots['Level2'].loot[6].quantity = '1';
  loots['Level2'].loot[6].chance = 15;
  loots['Level2'].loot[7] = {};
  loots['Level2'].loot[7].objname = 'Medium Armor';
  loots['Level2'].loot[7].quantity = '1';
  loots['Level2'].loot[7].chance = 15;
  loots['Level2'].trap = 'weak';

  loots['archeochest'] = new LootTable();
  loots['archeochest'].goldDice = '3d10+20';
  loots['archeochest'].goldChance = 100;
  loots['archeochest'].loot[0] = {};
  loots['archeochest'].loot[0].objname = 'ArcheoJournal';
  loots['archeochest'].loot[0].quantity = '1';
  loots['archeochest'].loot[0].chance = 100;
  loots['archeochest'].loot[1] = {};
  loots['archeochest'].loot[1].objname = 'YellowPotion';
  loots['archeochest'].loot[1].quantity = '1';
  loots['archeochest'].loot[1].chance = 100;

  loots['colin_chest'] = new LootTable();
  loots['colin_chest'].loot[0] = {};
  loots['colin_chest'].loot[0].objname = 'Gems';
  loots['colin_chest'].loot[0].quantity = '1';
  loots['colin_chest'].loot[0].chance = 100;
  loots['colin_chest'].loot[1] = {};
  loots['colin_chest'].loot[1].objname = 'BluePalmCrystal';
  loots['colin_chest'].loot[1].quantity = '1';
  loots['colin_chest'].loot[1].chance = 100;
  loots['colin_chest'].loot[2] = {};
  loots['colin_chest'].loot[2].objname = 'PinkPotion';
  loots['colin_chest'].loot[2].quantity = '1';
  loots['colin_chest'].loot[2].chance = 100;

  loots['warwizard'] = new LootTable();
  loots['warwizard'].goldDice = '2d10+25';
  loots['warwizard'].goldChance = 100;
  loots['warwizard'].loot[0] = {};
  loots['warwizard'].loot[0].objname = 'RingOfEtherealFocus';
  loots['warwizard'].loot[0].quantity = '1';
  loots['warwizard'].loot[0].chance = 100;
  loots['warwizard'].loot[1] = {};
  loots['warwizard'].loot[1].objname = 'ScrollOfPeer';
  loots['warwizard'].loot[1].quantity = '1';
  loots['warwizard'].loot[1].chance = 100;

  loots['Trolls'] = new LootTable();
  loots['Trolls'].goldDice = '3d6+5';
  loots['Trolls'].goldChance = 100;
  loots['Trolls'].loot[0] = {};
  loots['Trolls'].loot[0].objname = 'Medium Weapon';
  loots['Trolls'].loot[0].quantity = '1';
  loots['Trolls'].loot[0].chance = 20;
  loots['Trolls'].loot[1] = {};
  loots['Trolls'].loot[1].objname = 'Mid Ranged';
  loots['Trolls'].loot[1].quantity = '1';
  loots['Trolls'].loot[1].chance = 25;
  loots['Trolls'].loot[2] = {};
  loots['Trolls'].loot[2].objname = 'Torch';
  loots['Trolls'].loot[2].quantity = '1';
  loots['Trolls'].loot[2].chance = 15;
  loots['Trolls'].loot[3] = {};
  loots['Trolls'].loot[3].objname = 'Lesser Weapon';
  loots['Trolls'].loot[3].quantity = '1';
  loots['Trolls'].loot[3].chance = 40;
  loots['Trolls'].trap = 'weak';

  loots['AnimArmor'] = new LootTable();
  loots['AnimArmor'].goldDice = '2d20+10';
  loots['AnimArmor'].goldChance = 100;
  loots['AnimArmor'].loot[0] = {};
  loots['AnimArmor'].loot[0].objname = 'Medium Armor';
  loots['AnimArmor'].loot[0].quantity = '1';
  loots['AnimArmor'].loot[0].chance = 100;

  loots['spireloot'] = new LootTable();
  loots['spireloot'].goldDice = '2d10+10';
  loots['spireloot'].goldChance = 100;
  loots['spireloot'].loot[0] = {};
  loots['spireloot'].loot[0].objname = 'Scrolls3';
  loots['spireloot'].loot[0].quantity = '1';
  loots['spireloot'].loot[0].chance = 30;
  loots['spireloot'].loot[1] = {};
  loots['spireloot'].loot[1].objname = 'Scrolls1';
  loots['spireloot'].loot[1].quantity = '1';
  loots['spireloot'].loot[1].chance = 50;
  loots['spireloot'].loot[2] = {};
  loots['spireloot'].loot[2].objname = 'Potions2';
  loots['spireloot'].loot[2].quantity = '1';
  loots['spireloot'].loot[2].chance = 40;
  loots['spireloot'].loot[3] = {};
  loots['spireloot'].loot[3].objname = 'Scrolls2';
  loots['spireloot'].loot[3].quantity = '1';
  loots['spireloot'].loot[3].chance = 40;

  loots['Underworld'] = new LootTable();
  loots['Underworld'].goldDice = '3d20+10';
  loots['Underworld'].goldChance = 100;
  loots['Underworld'].loot[0] = {};
  loots['Underworld'].loot[0].objname = 'RippedAudachtaNemesos';
  loots['Underworld'].loot[0].quantity = '1';
  loots['Underworld'].loot[0].chance = 100;
  loots['Underworld'].trap = 'strong';

  loots['Level5'] = new LootTable();
  loots['Level5'].goldDice = '4d10+20';
  loots['Level5'].goldChance = 70;
  loots['Level5'].loot[0] = {};
  loots['Level5'].loot[0].objname = 'PurplePalmCrystal';
  loots['Level5'].loot[0].quantity = '1';
  loots['Level5'].loot[0].chance = 5;
  loots['Level5'].loot[1] = {};
  loots['Level5'].loot[1].objname = 'Scrolls2';
  loots['Level5'].loot[1].quantity = '1';
  loots['Level5'].loot[1].chance = 30;
  loots['Level5'].loot[2] = {};
  loots['Level5'].loot[2].objname = 'Scrolls3';
  loots['Level5'].loot[2].quantity = '1d2';
  loots['Level5'].loot[2].chance = 35;
  loots['Level5'].loot[3] = {};
  loots['Level5'].loot[3].objname = 'BluePalmCrystal';
  loots['Level5'].loot[3].quantity = '1';
  loots['Level5'].loot[3].chance = 10;
  loots['Level5'].loot[4] = {};
  loots['Level5'].loot[4].objname = 'Medium Weapon';
  loots['Level5'].loot[4].quantity = '1';
  loots['Level5'].loot[4].chance = 50;
  loots['Level5'].loot[5] = {};
  loots['Level5'].loot[5].objname = 'Heavy Armor';
  loots['Level5'].loot[5].quantity = '1';
  loots['Level5'].loot[5].chance = 20;
  loots['Level5'].loot[6] = {};
  loots['Level5'].loot[6].objname = 'Scrolls5';
  loots['Level5'].loot[6].quantity = '1';
  loots['Level5'].loot[6].chance = 25;
  loots['Level5'].loot[7] = {};
  loots['Level5'].loot[7].objname = 'Potions1';
  loots['Level5'].loot[7].quantity = '1';
  loots['Level5'].loot[7].chance = 35;
  loots['Level5'].loot[8] = {};
  loots['Level5'].loot[8].objname = 'Scrolls4';
  loots['Level5'].loot[8].quantity = '1';
  loots['Level5'].loot[8].chance = 30;
  loots['Level5'].loot[9] = {};
  loots['Level5'].loot[9].objname = 'Mid Weapon';
  loots['Level5'].loot[9].quantity = '1';
  loots['Level5'].loot[9].chance = 50;
  loots['Level5'].loot[10] = {};
  loots['Level5'].loot[10].objname = 'Potions2';
  loots['Level5'].loot[10].quantity = '1d2';
  loots['Level5'].loot[10].chance = 35;
  loots['Level5'].loot[11] = {};
  loots['Level5'].loot[11].objname = 'Medium Armor';
  loots['Level5'].loot[11].quantity = '1';
  loots['Level5'].loot[11].chance = 40;
  loots['Level5'].loot[12] = {};
  loots['Level5'].loot[12].objname = 'Potions3';
  loots['Level5'].loot[12].quantity = '1';
  loots['Level5'].loot[12].chance = 30;
  loots['Level5'].trap = 'medium';

  loots['Ghost'] = new LootTable();
  loots['Ghost'].loot[0] = {};
  loots['Ghost'].loot[0].objname = 'BluePalmCrystal';
  loots['Ghost'].loot[0].quantity = '1';
  loots['Ghost'].loot[0].chance = 10;
  loots['Ghost'].loot[1] = {};
  loots['Ghost'].loot[1].objname = 'GreenPalmCrystal';
  loots['Ghost'].loot[1].quantity = '1';
  loots['Ghost'].loot[1].chance = 10;
  loots['Ghost'].loot[2] = {};
  loots['Ghost'].loot[2].objname = 'PurplePalmCrystal';
  loots['Ghost'].loot[2].quantity = '1';
  loots['Ghost'].loot[2].chance = 5;

  return loots;
}

function SetLootGroups() {
  let DULootGroup = new LootGroups();

  DULootGroup.setTreasureType('Scrolls7',
  [
    'ScrollFireAndIce', 1,
    'ScrollMindBlast', 1,
    'ScrollMeteorSwarm', 1,
    'ScrollFear', 1,
  ]);

  DULootGroup.setTreasureType('High Ranged',
  [
    'Bow', 1,
    'Crossbow', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls2',
  [
    'ScrollPoisonCloud', 1,
    'ScrollIronFlesh', 1,
    'ScrollLesserHeal', 1,
    'ScrollProtection', 1,
    'ScrollMagicBolt', 1,
    'ScrollIllusion', 1,
  ]);

  DULootGroup.setTreasureType('Mid Ranged',
  [
    'Sling', 1,
    'Bow', 1,
  ]);

  DULootGroup.setTreasureType('All Armor',
  [
    'LeatherArmor', 2,
    'ClothArmor', 2,
    'PlateArmor', 1,
    'ChainArmor', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls1',
  [
    'ScrollLight', 1,
    'ScrollVulnerability', 1,
    'ScrollCure', 1,
    'ScrollDistract', 1,
    'ScrollDisarmTrap', 1,
    'ScrollFlameBlade', 1,
  ]);

  DULootGroup.setTreasureType('Lesser Weapon',
  [
    'Shortsword', 1,
    'Dagger', 2,
  ]);

  DULootGroup.setTreasureType('Audachta3',
  [
    'AudachtaNemesosTelekinesis', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls6',
  [
    'ScrollStorm', 1,
    'ScrollExplosion', 1,
    'ScrollTremor', 1,
  ]);

  DULootGroup.setTreasureType('Potions3',
  [
    'DeepBluePotion', 1,
    'PinkPotion', 1,
    'SilverPotion', 1,
    'GreyPotion', 1,
  ]);

  DULootGroup.setTreasureType('Medium Armor',
  [
    'ChainArmor', 2,
    'LeatherArmor', 3,
  ]);

  DULootGroup.setTreasureType('Audachta4',
  [
    'AudachtaNemesosIceball', 1,
    'AudachtaNemesosHeal', 1,
    'AudachtaNemesosSmite', 1,
    'AudachtaNemesosLifeDrain', 1,
    'AudachtaNemesosTelepathy', 1,
  ]);

  DULootGroup.setTreasureType('Audachta5',
  [
    'AudachtaNemesosShockwave', 1,
    'AudachtaNemesosMirrorWard', 1,
    'AudachtaNemesosCrystalPrison', 1,
  ]);

  DULootGroup.setTreasureType('Mid Weapon',
  [
    'Mace', 1,
    'Shortsword', 2,
  ]);

  DULootGroup.setTreasureType('Scrolls4',
  [
    'ScrollBlink', 1,
    'ScrollBlessing', 1,
    'ScrollEtherealVision', 1,
    'ScrollLifeDrain', 1,
    'ScrollSmite', 1,
    'ScrollHeal', 1,
  ]);

  DULootGroup.setTreasureType('Audachta1',
  [
    'AudachtaNemesosDisarmTrap', 1,
    'AudachtaNemesosDistract', 1,
    'AudachtaNemesosFlameBlade', 1,
  ]);

  DULootGroup.setTreasureType('Medium Weapon',
  [
    'Axe', 3,
    'Longsword', 2,
    'Mace', 5,
  ]);

  DULootGroup.setTreasureType('All Weapons',
  [
    'Axe', 2,
    'Halberd', 1,
    'Longsword', 1,
    'Mace', 2,
    'Shortsword', 3,
    'Dagger', 3,
  ]);

  DULootGroup.setTreasureType('Scrolls3',
  [
    'ScrollTelepathy', 1,
    'ScrollDisruptUndead', 1,
    'ScrollFireArmor', 1,
    'ScrollDispel', 1,
    'ScrollIceball', 1,
    'ScrollFireball', 1,
    'ScrollWallOfFlame', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls8',
  [
    'ScrollConflagration', 1,
    'ScrollTimeStop', 1,
    'ScrollConjureDaemon', 1,
  ]);

  DULootGroup.setTreasureType('Heavy Weapon',
  [
    'Longsword', 2,
    'Halberd', 1,
  ]);

  DULootGroup.setTreasureType('Potions4',
  [
    'DarkGreenPotion', 1,
    'BlackPotion', 1,
    'BrownPotion', 1,
  ]);

  DULootGroup.setTreasureType('Low Ranged',
  [
    'Bow', 1,
    'Sling', 2,
  ]);

  DULootGroup.setTreasureType('Audachta2',
  [
    'AudachtaNemesosProtection', 1,
    'AudachtaNemesosMagicBolt', 1,
    'AudachtaNemesosPoisonCloud', 1,
  ]);

  DULootGroup.setTreasureType('Potions2',
  [
    'PurplePotion', 2,
    'BrownPotion', 3,
    'BluePotion', 2,
  ]);

  DULootGroup.setTreasureType('Lesser Armor',
  [
    'ClothArmor', 3,
    'LeatherArmor', 2,
  ]);

  DULootGroup.setTreasureType('Potions1',
  [
    'RedPotion', 2,
    'WhitePotion', 2,
    'OrangePotion', 2,
    'YellowPotion', 2,
    'GreenPotion', 1,
  ]);

  DULootGroup.setTreasureType('Gems',
  [
    'Gems', 1,
    'SmallSapphire', 2,
    'Ruby', 2,
    'Sapphire', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls5',
  [
    'ScrollParalyze', 1,
    'ScrollMirrorWard', 1,
    'ScrollSummonAlly', 1,
    'ScrollCrystalBarrier', 1,
    'ScrollSwordstrike', 1,
    'ScrollShockwave', 1,
    'ScrollPeer', 1,
  ]);

  DULootGroup.setTreasureType('Heavy Armor',
  [
    'PlateArmor', 2,
    'ChainArmor', 3,
  ]);

  return DULootGroup;
}

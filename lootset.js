"use strict";

function SetLoots() {
  var loots = {};

  loots['olympus_secret'] = new LootTable();
  loots['olympus_secret'].goldDice = '2d20';
  loots['olympus_secret'].goldChance = 100;
  loots['olympus_secret'].loot[0] = {};
  loots['olympus_secret'].loot[0].objname = 'Lesser Weapon';
  loots['olympus_secret'].loot[0].quantity = '1d2';
  loots['olympus_secret'].loot[0].chance = 60;
  loots['olympus_secret'].loot[1] = {};
  loots['olympus_secret'].loot[1].objname = 'Potions1';
  loots['olympus_secret'].loot[1].quantity = '1d2';
  loots['olympus_secret'].loot[1].chance = 40;
  loots['olympus_secret'].loot[2] = {};
  loots['olympus_secret'].loot[2].objname = 'Lesser Armor';
  loots['olympus_secret'].loot[2].quantity = '1';
  loots['olympus_secret'].loot[2].chance = 33;
  loots['olympus_secret'].loot[3] = {};
  loots['olympus_secret'].loot[3].objname = 'Scrolls1';
  loots['olympus_secret'].loot[3].quantity = '1d2';
  loots['olympus_secret'].loot[3].chance = 25;

  loots['castlechest'] = new LootTable();
  loots['castlechest'].goldDice = '2d50';
  loots['castlechest'].goldChance = 100;
  loots['castlechest'].loot[0] = {};
  loots['castlechest'].loot[0].objname = 'Scrolls4';
  loots['castlechest'].loot[0].quantity = '1';
  loots['castlechest'].loot[0].chance = 15;
  loots['castlechest'].loot[1] = {};
  loots['castlechest'].loot[1].objname = 'Potions3';
  loots['castlechest'].loot[1].quantity = '1';
  loots['castlechest'].loot[1].chance = 15;
  loots['castlechest'].loot[2] = {};
  loots['castlechest'].loot[2].objname = 'Scrolls2';
  loots['castlechest'].loot[2].quantity = '1';
  loots['castlechest'].loot[2].chance = 25;
  loots['castlechest'].loot[3] = {};
  loots['castlechest'].loot[3].objname = 'Scrolls7';
  loots['castlechest'].loot[3].quantity = '1';
  loots['castlechest'].loot[3].chance = 5;
  loots['castlechest'].loot[4] = {};
  loots['castlechest'].loot[4].objname = 'Scrolls3';
  loots['castlechest'].loot[4].quantity = '1';
  loots['castlechest'].loot[4].chance = 20;
  loots['castlechest'].loot[5] = {};
  loots['castlechest'].loot[5].objname = 'Potions1';
  loots['castlechest'].loot[5].quantity = '1d2';
  loots['castlechest'].loot[5].chance = 30;
  loots['castlechest'].loot[6] = {};
  loots['castlechest'].loot[6].objname = 'Scrolls8';
  loots['castlechest'].loot[6].quantity = '1';
  loots['castlechest'].loot[6].chance = 5;
  loots['castlechest'].loot[7] = {};
  loots['castlechest'].loot[7].objname = 'Scrolls5';
  loots['castlechest'].loot[7].quantity = '1';
  loots['castlechest'].loot[7].chance = 15;
  loots['castlechest'].loot[8] = {};
  loots['castlechest'].loot[8].objname = 'Potions2';
  loots['castlechest'].loot[8].quantity = '1d2';
  loots['castlechest'].loot[8].chance = 30;
  loots['castlechest'].loot[9] = {};
  loots['castlechest'].loot[9].objname = 'All Armor';
  loots['castlechest'].loot[9].quantity = '1d2';
  loots['castlechest'].loot[9].chance = 50;
  loots['castlechest'].loot[10] = {};
  loots['castlechest'].loot[10].objname = 'Scrolls6';
  loots['castlechest'].loot[10].quantity = '1';
  loots['castlechest'].loot[10].chance = 10;
  loots['castlechest'].loot[11] = {};
  loots['castlechest'].loot[11].objname = 'All Weapons';
  loots['castlechest'].loot[11].quantity = '1d3';
  loots['castlechest'].loot[11].chance = 60;
  loots['castlechest'].loot[12] = {};
  loots['castlechest'].loot[12].objname = 'Scrolls1';
  loots['castlechest'].loot[12].quantity = '1';
  loots['castlechest'].loot[12].chance = 25;
  loots['castlechest'].trap = 'strong';

  loots['olympusbook3'] = new LootTable();
  loots['olympusbook3'].loot[0] = {};
  loots['olympusbook3'].loot[0].objname = 'YellowPotion';
  loots['olympusbook3'].loot[0].quantity = '1';
  loots['olympusbook3'].loot[0].chance = 100;

  loots['Giant Spider'] = new LootTable();
  loots['Giant Spider'].goldDice = '2d6+3';
  loots['Giant Spider'].goldChance = 45;
  loots['Giant Spider'].loot[0] = {};
  loots['Giant Spider'].loot[0].objname = 'Scroll1';
  loots['Giant Spider'].loot[0].quantity = '1d2';
  loots['Giant Spider'].loot[0].chance = 33;
  loots['Giant Spider'].loot[1] = {};
  loots['Giant Spider'].loot[1].objname = 'Spider Silk';
  loots['Giant Spider'].loot[1].quantity = '1';
  loots['Giant Spider'].loot[1].chance = 100;

  loots['Spiders'] = new LootTable();
  loots['Spiders'].goldDice = '1d4';
  loots['Spiders'].goldChance = 45;
  loots['Spiders'].loot[0] = {};
  loots['Spiders'].loot[0].objname = 'Lesser Weapon';
  loots['Spiders'].loot[0].quantity = '1';
  loots['Spiders'].loot[0].chance = 35;
  loots['Spiders'].loot[1] = {};
  loots['Spiders'].loot[1].objname = 'Scroll1';
  loots['Spiders'].loot[1].quantity = '1';
  loots['Spiders'].loot[1].chance = 5;

  loots['olympusbook2'] = new LootTable();
  loots['olympusbook2'].loot[0] = {};
  loots['olympusbook2'].loot[0].objname = 'ScrollDisarmTrap';
  loots['olympusbook2'].loot[0].quantity = '1';
  loots['olympusbook2'].loot[0].chance = 100;

  loots['Small Animal'] = new LootTable();
  loots['Small Animal'].goldDice = '1d3';
  loots['Small Animal'].goldChance = 30;

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

  loots['prev_looted'] = new LootTable();
  loots['prev_looted'].goldDice = '1d4';
  loots['prev_looted'].goldChance = 100;

  loots['ash_book_1'] = new LootTable();
  loots['ash_book_1'].loot[0] = {};
  loots['ash_book_1'].loot[0].objname = 'Scrolls1';
  loots['ash_book_1'].loot[0].quantity = '1';
  loots['ash_book_1'].loot[0].chance = 100;
  loots['ash_book_1'].loot[1] = {};
  loots['ash_book_1'].loot[1].objname = 'book_awaken';
  loots['ash_book_1'].loot[1].quantity = '1';
  loots['ash_book_1'].loot[1].chance = 100;

  loots['Orcs'] = new LootTable();
  loots['Orcs'].goldDice = '2d6+5';
  loots['Orcs'].goldChance = 100;
  loots['Orcs'].loot[0] = {};
  loots['Orcs'].loot[0].objname = 'Medium Weapon';
  loots['Orcs'].loot[0].quantity = '1';
  loots['Orcs'].loot[0].chance = 10;
  loots['Orcs'].loot[1] = {};
  loots['Orcs'].loot[1].objname = 'Lesser Weapon';
  loots['Orcs'].loot[1].quantity = '1';
  loots['Orcs'].loot[1].chance = 20;
  loots['Orcs'].trap = 'weak';

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
  loots['Town Guard'].loot[0].objname = 'Medium Armor';
  loots['Town Guard'].loot[0].quantity = '1';
  loots['Town Guard'].loot[0].chance = 25;
  loots['Town Guard'].loot[1] = {};
  loots['Town Guard'].loot[1].objname = 'Medium Weapon';
  loots['Town Guard'].loot[1].quantity = '1';
  loots['Town Guard'].loot[1].chance = 40;
  loots['Town Guard'].loot[2] = {};
  loots['Town Guard'].loot[2].objname = 'Yellow Potion';
  loots['Town Guard'].loot[2].quantity = '1';
  loots['Town Guard'].loot[2].chance = 20;
  loots['Town Guard'].trap = 'medium';

  loots['ash_book_2'] = new LootTable();
  loots['ash_book_2'].loot[0] = {};
  loots['ash_book_2'].loot[0].objname = 'Scrolls1';
  loots['ash_book_2'].loot[0].quantity = '1';
  loots['ash_book_2'].loot[0].chance = 100;
  loots['ash_book_2'].loot[1] = {};
  loots['ash_book_2'].loot[1].objname = 'book_iron_flesh';
  loots['ash_book_2'].loot[1].quantity = '1';
  loots['ash_book_2'].loot[1].chance = 100;

  loots['ash_book3'] = new LootTable();
  loots['ash_book3'].loot[0] = {};
  loots['ash_book3'].loot[0].objname = 'Scrolls1';
  loots['ash_book3'].loot[0].quantity = '1';
  loots['ash_book3'].loot[0].chance = 100;

  loots['Townsfolk'] = new LootTable();
  loots['Townsfolk'].goldDice = '2d6-1';
  loots['Townsfolk'].goldChance = 100;

  loots['Large Animal'] = new LootTable();
  loots['Large Animal'].goldDice = '2d6+3';
  loots['Large Animal'].goldChance = 45;
  loots['Large Animal'].loot[0] = {};
  loots['Large Animal'].loot[0].objname = 'Scroll1';
  loots['Large Animal'].loot[0].quantity = '1d2';
  loots['Large Animal'].loot[0].chance = 20;

  loots['olympusbook1'] = new LootTable();
  loots['olympusbook1'].loot[0] = {};
  loots['olympusbook1'].loot[0].objname = 'ScrollLesserHeal';
  loots['olympusbook1'].loot[0].quantity = '1';
  loots['olympusbook1'].loot[0].chance = 100;

  return loots;
}

function SetLootGroups() {
  var DULootGroup = new LootGroups();

  DULootGroup.setTreasureType('Potions1',
  [
    'YellowPotion', 2,
    'GreenPotion', 1,
    'WhitePotion', 2,
    'RedPotion', 2,
  ]);

  DULootGroup.setTreasureType('Potions4',
  [
    'BrownPotion', 1,
    'DarkGreenPotion', 1,
    'BlackPotion', 1,
  ]);

  DULootGroup.setTreasureType('Medium Weapon',
  [
    'Longsword', 2,
    'Axe', 3,
    'Mace', 5,
  ]);

  DULootGroup.setTreasureType('Scrolls3',
  [
    'ScrollTelepathy', 1,
    'ScrollDispel', 1,
    'ScrollDisruptUndead', 1,
    'ScrollFireArmor', 1,
    'ScrollWallOfFlame', 1,
    'ScrollIceball', 1,
    'ScrollFireball', 1,
  ]);

  DULootGroup.setTreasureType('Heavy Armor',
  [
    'ChainArmor', 3,
    'PlateArmor', 2,
  ]);

  DULootGroup.setTreasureType('Scrolls4',
  [
    'ScrollBlink', 1,
    'ScrollBlessing', 1,
    'ScrollLifeDrain', 1,
    'ScrollEtherealVision', 1,
    'ScrollSmite', 1,
    'ScrollHeal', 1,
  ]);

  DULootGroup.setTreasureType('All Weapons',
  [
    'Dagger', 3,
    'Halberd', 1,
    'Shortsword', 3,
    'Longsword', 1,
    'Axe', 2,
    'Mace', 2,
  ]);

  DULootGroup.setTreasureType('All Armor',
  [
    'LeatherArmor', 2,
    'ClothArmor', 2,
    'PlateArmor', 1,
    'ChainArmor', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls5',
  [
    'ScrollPeer', 1,
    'ScrollShockwave', 1,
    'ScrollParalyze', 1,
    'ScrollSummonAlly', 1,
    'ScrollCrystalBarrier', 1,
    'ScrollSwordstrike', 1,
    'ScrollMirrorWard', 1,
  ]);

  DULootGroup.setTreasureType('Lesser Armor',
  [
    'LeatherArmor', 2,
    'ClothArmor', 3,
  ]);

  DULootGroup.setTreasureType('Scrolls8',
  [
    'ScrollConjureDaemon', 1,
    'ScrollConflagration', 1,
    'ScrollTimeStop', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls7',
  [
    'ScrollFireAndIce', 1,
    'ScrollMindBlast', 1,
    'ScrollFear', 1,
    'ScrollMeteorSwarm', 1,
  ]);

  DULootGroup.setTreasureType('Potions3',
  [
    'GreyPotion', 1,
    'PinkPotion', 1,
    'SilverPotion', 1,
  ]);

  DULootGroup.setTreasureType('Medium Armor',
  [
    'ChainArmor', 2,
    'LeatherArmor', 3,
  ]);

  DULootGroup.setTreasureType('Heavy Weapon',
  [
    'Halberd', 1,
    'Longsword', 2,
  ]);

  DULootGroup.setTreasureType('Scrolls2',
  [
    'ScrollIronFlesh', 1,
    'ScrollPoisonCloud', 1,
    'ScrollIllusion', 1,
    'ScrollProtection', 1,
    'ScrollLesserHeal', 1,
    'ScrollMagicBolt', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls1',
  [
    'ScrollCure', 1,
    'ScrollAwaken', 1,
    'ScrollLight', 1,
    'ScrollDisarmTrap', 1,
    'ScrollFlameBlade', 1,
    'ScrollVulnerability', 1,
    'ScrollDistract', 1,
  ]);

  DULootGroup.setTreasureType('Gems',
  [
    'SmallSapphire', 2,
    'Gems', 1,
    'Sapphire', 1,
    'Ruby', 2,
  ]);

  DULootGroup.setTreasureType('Scrolls6',
  [
    'ScrollTremor', 1,
    'ScrollStorm', 1,
    'ScrollExplosion', 1,
  ]);

  DULootGroup.setTreasureType('Lesser Weapon',
  [
    'Dagger', 2,
    'Shortsword', 1,
  ]);

  DULootGroup.setTreasureType('Potions2',
  [
    'PurplePotion', 2,
    'OrangePotion', 3,
    'BluePotion', 2,
  ]);

  return DULootGroup;
}

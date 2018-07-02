"use strict";

function SetLoots() {
  var loots = {};

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

  loots['pc_start'] = new LootTable();
  loots['pc_start'].loot[0] = {};
  loots['pc_start'].loot[0].objname = 'Shortsword';
  loots['pc_start'].loot[0].quantity = '1';
  loots['pc_start'].loot[0].chance = 100;
  loots['pc_start'].loot[1] = {};
  loots['pc_start'].loot[1].objname = 'LeatherArmor';
  loots['pc_start'].loot[1].quantity = '1';
  loots['pc_start'].loot[1].chance = 100;

  loots['Pit Rogue'] = new LootTable();
  loots['Pit Rogue'].loot[0] = {};
  loots['Pit Rogue'].loot[0].objname = 'PitOfDespairKey';
  loots['Pit Rogue'].loot[0].quantity = '1';
  loots['Pit Rogue'].loot[0].chance = 5;

  loots['headlesscave'] = new LootTable();
  loots['headlesscave'].goldDice = '2d6+5';
  loots['headlesscave'].goldChance = 100;
  loots['headlesscave'].loot[0] = {};
  loots['headlesscave'].loot[0].objname = 'Scrolls1';
  loots['headlesscave'].loot[0].quantity = '1d2';
  loots['headlesscave'].loot[0].chance = 25;
  loots['headlesscave'].loot[1] = {};
  loots['headlesscave'].loot[1].objname = 'Medium Weapon';
  loots['headlesscave'].loot[1].quantity = '1';
  loots['headlesscave'].loot[1].chance = 10;
  loots['headlesscave'].loot[2] = {};
  loots['headlesscave'].loot[2].objname = 'Lesser Weapon';
  loots['headlesscave'].loot[2].quantity = '1';
  loots['headlesscave'].loot[2].chance = 20;
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
  loots['Minor Adventurer'].loot[1].objname = 'Lesser Weapon';
  loots['Minor Adventurer'].loot[1].quantity = '1';
  loots['Minor Adventurer'].loot[1].chance = 20;
  loots['Minor Adventurer'].loot[2] = {};
  loots['Minor Adventurer'].loot[2].objname = 'Potions1';
  loots['Minor Adventurer'].loot[2].quantity = '1';
  loots['Minor Adventurer'].loot[2].chance = 15;
  loots['Minor Adventurer'].trap = 'weak';

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

  loots['castlechest'] = new LootTable();
  loots['castlechest'].goldDice = '2d50';
  loots['castlechest'].goldChance = 100;
  loots['castlechest'].loot[0] = {};
  loots['castlechest'].loot[0].objname = 'Potions2';
  loots['castlechest'].loot[0].quantity = '1d2';
  loots['castlechest'].loot[0].chance = 30;
  loots['castlechest'].loot[1] = {};
  loots['castlechest'].loot[1].objname = 'Scrolls2';
  loots['castlechest'].loot[1].quantity = '1';
  loots['castlechest'].loot[1].chance = 25;
  loots['castlechest'].loot[2] = {};
  loots['castlechest'].loot[2].objname = 'Scrolls5';
  loots['castlechest'].loot[2].quantity = '1';
  loots['castlechest'].loot[2].chance = 15;
  loots['castlechest'].loot[3] = {};
  loots['castlechest'].loot[3].objname = 'Scrolls8';
  loots['castlechest'].loot[3].quantity = '1';
  loots['castlechest'].loot[3].chance = 5;
  loots['castlechest'].loot[4] = {};
  loots['castlechest'].loot[4].objname = 'All Armor';
  loots['castlechest'].loot[4].quantity = '1d2';
  loots['castlechest'].loot[4].chance = 50;
  loots['castlechest'].loot[5] = {};
  loots['castlechest'].loot[5].objname = 'Potions1';
  loots['castlechest'].loot[5].quantity = '1d2';
  loots['castlechest'].loot[5].chance = 30;
  loots['castlechest'].loot[6] = {};
  loots['castlechest'].loot[6].objname = 'Scrolls3';
  loots['castlechest'].loot[6].quantity = '1';
  loots['castlechest'].loot[6].chance = 20;
  loots['castlechest'].loot[7] = {};
  loots['castlechest'].loot[7].objname = 'Scrolls1';
  loots['castlechest'].loot[7].quantity = '1';
  loots['castlechest'].loot[7].chance = 25;
  loots['castlechest'].loot[8] = {};
  loots['castlechest'].loot[8].objname = 'Scrolls7';
  loots['castlechest'].loot[8].quantity = '1';
  loots['castlechest'].loot[8].chance = 5;
  loots['castlechest'].loot[9] = {};
  loots['castlechest'].loot[9].objname = 'All Weapons';
  loots['castlechest'].loot[9].quantity = '1d3';
  loots['castlechest'].loot[9].chance = 60;
  loots['castlechest'].loot[10] = {};
  loots['castlechest'].loot[10].objname = 'Potions3';
  loots['castlechest'].loot[10].quantity = '1';
  loots['castlechest'].loot[10].chance = 15;
  loots['castlechest'].loot[11] = {};
  loots['castlechest'].loot[11].objname = 'Scrolls4';
  loots['castlechest'].loot[11].quantity = '1';
  loots['castlechest'].loot[11].chance = 15;
  loots['castlechest'].loot[12] = {};
  loots['castlechest'].loot[12].objname = 'Scrolls6';
  loots['castlechest'].loot[12].quantity = '1';
  loots['castlechest'].loot[12].chance = 10;
  loots['castlechest'].trap = 'strong';

  loots['olympus_secret'] = new LootTable();
  loots['olympus_secret'].goldDice = '2d20';
  loots['olympus_secret'].goldChance = 100;
  loots['olympus_secret'].loot[0] = {};
  loots['olympus_secret'].loot[0].objname = 'Lesser Armor';
  loots['olympus_secret'].loot[0].quantity = '1';
  loots['olympus_secret'].loot[0].chance = 33;
  loots['olympus_secret'].loot[1] = {};
  loots['olympus_secret'].loot[1].objname = 'Scrolls1';
  loots['olympus_secret'].loot[1].quantity = '1d2';
  loots['olympus_secret'].loot[1].chance = 25;
  loots['olympus_secret'].loot[2] = {};
  loots['olympus_secret'].loot[2].objname = 'Lesser Weapon';
  loots['olympus_secret'].loot[2].quantity = '1d2';
  loots['olympus_secret'].loot[2].chance = 60;
  loots['olympus_secret'].loot[3] = {};
  loots['olympus_secret'].loot[3].objname = 'Potions1';
  loots['olympus_secret'].loot[3].quantity = '1d2';
  loots['olympus_secret'].loot[3].chance = 40;

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
  loots['Orcs'].loot[0].objname = 'Medium Weapon';
  loots['Orcs'].loot[0].quantity = '1';
  loots['Orcs'].loot[0].chance = 10;
  loots['Orcs'].loot[1] = {};
  loots['Orcs'].loot[1].objname = 'Lesser Weapon';
  loots['Orcs'].loot[1].quantity = '1';
  loots['Orcs'].loot[1].chance = 20;
  loots['Orcs'].trap = 'weak';

  loots['prev_looted'] = new LootTable();
  loots['prev_looted'].goldDice = '1d4';
  loots['prev_looted'].goldChance = 100;

  loots['Small Animal'] = new LootTable();
  loots['Small Animal'].goldDice = '1d3';
  loots['Small Animal'].goldChance = 1;

  loots['Town Guard'] = new LootTable();
  loots['Town Guard'].goldDice = '2d6';
  loots['Town Guard'].goldChance = 100;
  loots['Town Guard'].loot[0] = {};
  loots['Town Guard'].loot[0].objname = 'Medium Weapon';
  loots['Town Guard'].loot[0].quantity = '1';
  loots['Town Guard'].loot[0].chance = 40;
  loots['Town Guard'].loot[1] = {};
  loots['Town Guard'].loot[1].objname = 'Yellow Potion';
  loots['Town Guard'].loot[1].quantity = '1';
  loots['Town Guard'].loot[1].chance = 20;
  loots['Town Guard'].loot[2] = {};
  loots['Town Guard'].loot[2].objname = 'Medium Armor';
  loots['Town Guard'].loot[2].quantity = '1';
  loots['Town Guard'].loot[2].chance = 25;
  loots['Town Guard'].trap = 'medium';

  loots['smallguard'] = new LootTable();
  loots['smallguard'].loot[0] = {};
  loots['smallguard'].loot[0].objname = 'Lesser Weapon';
  loots['smallguard'].loot[0].quantity = '1';
  loots['smallguard'].loot[0].chance = 100;
  loots['smallguard'].loot[1] = {};
  loots['smallguard'].loot[1].objname = 'Lesser Armor';
  loots['smallguard'].loot[1].quantity = '1';
  loots['smallguard'].loot[1].chance = 100;

  return loots;
}

function SetLootGroups() {
  var DULootGroup = new LootGroups();

  DULootGroup.setTreasureType('Potions1',
  [
    'GreenPotion', 1,
    'YellowPotion', 2,
    'WhitePotion', 2,
    'BrownPotion', 2,
    'RedPotion', 2,
  ]);

  DULootGroup.setTreasureType('All Armor',
  [
    'ClothArmor', 2,
    'LeatherArmor', 2,
    'ChainArmor', 1,
    'PlateArmor', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls3',
  [
    'ScrollFireball', 1,
    'ScrollFireArmor', 1,
    'ScrollTelepathy', 1,
    'ScrollWallOfFlame', 1,
    'ScrollDisruptUndead', 1,
    'ScrollIceball', 1,
    'ScrollDispel', 1,
  ]);

  DULootGroup.setTreasureType('Heavy Armor',
  [
    'PlateArmor', 2,
    'ChainArmor', 3,
  ]);

  DULootGroup.setTreasureType('Scrolls8',
  [
    'ScrollTimeStop', 1,
    'ScrollConflagration', 1,
    'ScrollConjureDaemon', 1,
  ]);

  DULootGroup.setTreasureType('Heavy Weapon',
  [
    'Longsword', 2,
    'Halberd', 1,
  ]);

  DULootGroup.setTreasureType('Potions4',
  [
    'BlackPotion', 1,
    'DarkGreenPotion', 1,
    'BrownPotion', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls1',
  [
    'ScrollDistract', 1,
    'ScrollCure', 1,
    'ScrollFlameBlade', 1,
    'ScrollDisarmTrap', 1,
    'ScrollLight', 1,
    'ScrollVulnerability', 1,
  ]);

  DULootGroup.setTreasureType('Lesser Armor',
  [
    'ClothArmor', 3,
    'LeatherArmor', 2,
  ]);

  DULootGroup.setTreasureType('Potions3',
  [
    'SilverPotion', 1,
    'PinkPotion', 1,
    'GreyPotion', 1,
    'DeepBluePotion', 1,
  ]);

  DULootGroup.setTreasureType('All Weapons',
  [
    'Longsword', 1,
    'Dagger', 3,
    'Mace', 2,
    'Shortsword', 3,
    'Halberd', 1,
    'Axe', 2,
  ]);

  DULootGroup.setTreasureType('Scrolls7',
  [
    'ScrollMeteorSwarm', 1,
    'ScrollMindBlast', 1,
    'ScrollFear', 1,
    'ScrollFireAndIce', 1,
  ]);

  DULootGroup.setTreasureType('Medium Armor',
  [
    'ChainArmor', 2,
    'LeatherArmor', 3,
  ]);

  DULootGroup.setTreasureType('Lesser Weapon',
  [
    'Dagger', 2,
    'Shortsword', 1,
  ]);

  DULootGroup.setTreasureType('Gems',
  [
    'Sapphire', 1,
    'SmallSapphire', 2,
    'Ruby', 2,
    'Gems', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls2',
  [
    'ScrollProtection', 1,
    'ScrollIronFlesh', 1,
    'ScrollPoisonCloud', 1,
    'ScrollLesserHeal', 1,
    'ScrollMagicBolt', 1,
    'ScrollIllusion', 1,
  ]);

  DULootGroup.setTreasureType('Medium Weapon',
  [
    'Longsword', 2,
    'Mace', 5,
    'Axe', 3,
  ]);

  DULootGroup.setTreasureType('Potions2',
  [
    'BluePotion', 2,
    'OrangePotion', 3,
    'PurplePotion', 2,
  ]);

  DULootGroup.setTreasureType('Scrolls5',
  [
    'ScrollMirrorWard', 1,
    'ScrollSwordstrike', 1,
    'ScrollSummonAlly', 1,
    'ScrollParalyze', 1,
    'ScrollShockwave', 1,
    'ScrollPeer', 1,
    'ScrollCrystalBarrier', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls4',
  [
    'ScrollSmite', 1,
    'ScrollLifeDrain', 1,
    'ScrollBlessing', 1,
    'ScrollHeal', 1,
    'ScrollEtherealVision', 1,
    'ScrollBlink', 1,
  ]);

  DULootGroup.setTreasureType('Scrolls6',
  [
    'ScrollTremor', 1,
    'ScrollStorm', 1,
    'ScrollExplosion', 1,
  ]);

  return DULootGroup;
}

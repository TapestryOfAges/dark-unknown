function SetLoots() {
  var loots = {};

  loots['Large Animal'] = new LootTable();
  loots['Large Animal'].goldDice = '2d6+3';
  loots['Large Animal'].goldChance = 45;
  loots['Large Animal'].loot[0] = {};
  loots['Large Animal'].loot[0].objname = 'Scroll1';
  loots['Large Animal'].loot[0].quantity = '1d2';
  loots['Large Animal'].loot[0].chance = 20;

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

  loots['Minor Adventurer'] = new LootTable();
  loots['Minor Adventurer'].goldDice = '2d6+1';
  loots['Minor Adventurer'].goldChance = 100;
  loots['Minor Adventurer'].loot[0] = {};
  loots['Minor Adventurer'].loot[0].objname = 'Lesser Weapon';
  loots['Minor Adventurer'].loot[0].quantity = '1';
  loots['Minor Adventurer'].loot[0].chance = 20;

  loots['Town Guard'] = new LootTable();
  loots['Town Guard'].goldDice = '2d6';
  loots['Town Guard'].goldChance = 100;
  loots['Town Guard'].loot[0] = {};
  loots['Town Guard'].loot[0].objname = 'Yellow Potion';
  loots['Town Guard'].loot[0].quantity = '1';
  loots['Town Guard'].loot[0].chance = 20;
  loots['Town Guard'].loot[1] = {};
  loots['Town Guard'].loot[1].objname = 'Medium Armor';
  loots['Town Guard'].loot[1].quantity = '1';
  loots['Town Guard'].loot[1].chance = 25;
  loots['Town Guard'].loot[2] = {};
  loots['Town Guard'].loot[2].objname = 'Medium Weapon';
  loots['Town Guard'].loot[2].quantity = '1';
  loots['Town Guard'].loot[2].chance = 40;
  loots['Town Guard'].trap = 'medium';

  loots['Townsfolk'] = new LootTable();
  loots['Townsfolk'].goldDice = '2d6-1';
  loots['Townsfolk'].goldChance = 100;

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

  loots['Small Animal'] = new LootTable();
  loots['Small Animal'].goldDice = '1d3';
  loots['Small Animal'].goldChance = 30;

}

function SetLootGroups() {
  var DULootGroup = new LootGroups();

  DULootGroup.setTreasureType('Heavy Armor',
  [
    'PlateArmor', 2,
    'ChainArmor', 3,
  ]);

  DULootGroup.setTreasureType('Lesser Weapon',
  [
    'Dagger', 2,
    'Short Sword', 1,
  ]);

  DULootGroup.setTreasureType('Lesser Armor',
  [
    'LeatherArmor', 2,
    'ClothArmor', 3,
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

  DULootGroup.setTreasureType('Medium Weapon',
  [
    'Longsword', 2,
    'Axe', 3,
    'Mace', 5,
  ]);

}

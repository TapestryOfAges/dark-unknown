
"use strict";

const LOS_THRESHOLD = .98;
const SHADOW_THRESHOLD = .3;

const VIEWSIZEX = 13;
const VIEWSIZEY = 13;

const MOVE_FLY = 1;
const MOVE_SWIM = 2;
const MOVE_ETHEREAL = 4;
const MOVE_LEVITATE = 8;
const MOVE_WALK = 16;
const MOVE_WALK_DOOR = 32;
const MOVE_WALK_LOE = 64; // not for real paths, but to allow for Metal Twister to work

const SCALE_TIME = .2;

const BASE_RESIST_CHANCE = 30;
const BASE_HIT_CHANCE = 70;
const HIT_PER_LEVEL = 4;
const DEF_PER_LEVEL = 0;
const DEF_PER_DEX = 1;
const XP_MULTIPLIER = 1;

const DMG_NEGLIGABLE = "2d4";
const DMG_LIGHT = "3d4+3";
const DMG_MEDIUM = "4d4+16";
const DMG_HEAVY = "5d4+30";
const DMG_TREMENDOUS = "5d8+55";
const DMG_AUTOKILL = "255";

const MANA_REGEN = 10;
const HP_REGEN = 25;
const INT_POWER = 1.5;

// For sparkles
const COLOR_YELLOW = 0;
const COLOR_GREEN = -32;
const COLOR_BLUE = -64;
const COLOR_ORANGE = -96;
const COLOR_PURPLE = -128;
const COLOR_RED = -160;

const STAT_MAX = 25;
const LVL_MAX = 8;
const TP_PER_LEVEL = 3;
const XP_MAX = 9999;

//Combat graphics
const RED_SPLAT_X = -96;
const RED_SPLAT_Y = -3072;
const BLUE_SPLAT_X = -128;
const BLUE_SPLAT_Y = -3072;
const YELLOW_BALL_X = -160;
const YELLOW_BALL_Y = -3072;
const RED_BALL_X = -192;
const RED_BALL_Y = -3072;
const BLUE_BALL_X = -224;
const BLUE_BALL_Y = -3072;
const PURPLE_BALL_X = -256;
const PURPLE_BALL_Y = -3072;
const GREEN_BALL_X = -288;
const GREEN_BALL_Y = -3072;
const MIRROR_SPLAT_X = -160;
const MIRROR_SPLAT_Y = -1728;

const HILLS_TILES = ["Hills", "Hills1", "Hills2"];
const BASIC_FOREST_TILES = ["Forest", "Forest2", "ForestTilingNE", "ForestTilingNE", "ForestTilingW", "ForestTilingE", "ForestTilingSE", "ForestTilingSW", "ForestEdge", "Forest3", "ForestEdge3", "ForestEdge4", "ForestEdge5", "ForestNCoast", "ForestWCoast", "ForestSCoast", "ForestECoast"];
const EVERGREEN_FOREST_TILES = ["EvergreenForest", "EvergreenForestEdge", "EvergreenForestEdge2", "EvergreenForestEdge3", "EvergreenForestEdge4", "DeadForest", "EvergreenForestNCoast", "EvergreenForestECoast", "EvergreenForestSCoast", "EvergreenForestWCoast"];
const BRIGHT_FOREST_TILES = ["BrightForest", "BrightForest2", "BrightForestEdge", "BrightForestEdge2", "BrightForestEdge3", "BrightForestEdge4", "BrightForestEdge5", "BrightForestNCoast", "BrightForestECoast", "BrightForestSCoast", "BrightForestWCoast"];
const GRASS_TILES = ["Grass", "Brush", "Underbrush"];
const DIRT_TILES = ["Dirt", "DirtScrub"];
const SAND_TILES = ["Sand", "SandVegetation"];
const WATER_TILES = ["Water", "OceanWaterTransition0", "OceanWaterTransition1", "OceanWaterTransition2", "OceanWaterTransition3", "OceanWaterTransition4", "OceanWaterTransition5", "OceanWaterTransition6", "OceanWaterTransition7", "OceanWaterTransition8", "OceanWaterTransition9", "OceanWaterTransition10", "OceanWaterTransition11"];
const SHALLOWS_TILES = ["Shallows", "WaterShallowsTransition0", "WaterShallowsTransition1", "WaterShallowsTransition2", "WaterShallowsTransition3", "WaterShallowsTransition4", "WaterShallowsTransition5", "WaterShallowsTransition6", "WaterShallowsTransition7", "WaterShallowsTransition8", "WaterShallowsTransition9", "WaterShallowsTransition10", "WaterShallowsTransition11"];

const CHESTS_DIRECT_TO_INVENTORY = true;

const DEEP_WATER_PEER = 1;
const WATER_PEER = 2;
const SHALLOW_WATER_PEER = 3;
const MOUNTAIN_PEER = 4;
const FLAME_MOUNTAIN_PEER = 5;
const DARKNESS_PEER = 6; 
const GREY_PEER = 7; 
const WOOD_PEER = 8;
const MEADOW_PEER = 9;
const GRASS_PEER = 10;
const SAND_PEER = 11;
const CAVE_PEER = 12;
const RED_COBBLE_PEER = 13;
const BLUE_COBBLE_PEER = 14; 
const BLACK_COBBLE_PEER = 15;
const COBBLE_PEER = 16;
const CLAY_PEER = 17;
const FADED_WOOD_PEER = 18;
const BLUE_FLOOR_PEER = 19;
const GREEN_FLOOR_PEER = 20;
const STONE_PAVER_PEER = 21;
const RED_TILE_PEER = 22;
const BLUE_TILE_PEER = 23;
const FANCY_TILE_PEER = 24;
const CRACKED_STONE_PEER = 25;
const DARK_FADED_WOOD_PEER = 26;
const PURPLE_COBBLE_PEER = 27;
const ROAD_PEER = 28;
const FOREST_PEER = 29;
const HILL_PEER = 30;
const SWAMP_PEER = 31;
const ROOF_PEER = 32;
const ICE_PEER = 33;
const CYAN_COBBLE_PEER = 34;
const GREEN_COBBLE_PEER = 35;
const GREEN_CHECKERED_PEER = 36;
const YELLOW_CHECKERED_PEER = 37;
const LAVA_PEER = 38;
const CORAL_PEER = 39;
const LADDER_PEER = 40;
const COUNTER_PEER = 41;
const SANDSTONE_PEER = 42;
const PURPLE_CRYSTAL = 43;
const YELLOW_CRYSTAL = 44;
const GREEN_CRYSTAL = 45;
const PEER_COLORS = ["#000000", 
                     "#103cff", "#128dfe", "#12bbff", "#ffffff", "#4a110c", "#000000", "#c1c1c1", "#9d5a20", "#61a01e", "#618928", "#5f6114", "#626262", "#a51a14", "#0d2185", "#1d1d1d", "#772e24", "#64443f", "#c08e5e", "#476478", "#477865", 
                     "#959595", "#a95e56", "#636899", "#8d7058", "#66756d", "#9e8c74", "#553668", "#4d462c", "#326a25", "#b6d123", "#122112", "#08d66d", "#3f89b2", "#235373", "#009267", "#a8ecb6", "#f4e5a0", "#e42015", "#f2a9e0", "#eaa35f",
                     "#452318", "#eee557", "#d52bff", "#ffdf17", "#b9fc48"];
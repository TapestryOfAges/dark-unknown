
/* 
var musiclist = {};
musiclist["Theme"] = "music/Hero Theme.mp3";
musiclist["Dark Unknown"] = "music/Dark Unknown.mp3";
musiclist["Towne"] = "music/Towne.mp3";
musiclist["Dark Towne"] = "music/Dark Towne.mp3";
musiclist["Dungeon"] = "music/Dungeon.mp3";
musiclist["Dark Dungeon"] = "music/Dark Dungeon.mp3";
musiclist["Mainland"] = "music/Mainland Wander.mp3";
musiclist["Island"] = "music/Island Wander.mp3";
musiclist["Magic"] = "music/Magic.mp3";
musiclist["Cave"] = "music/Cave.mp3";
musiclist["Underworld"] = "music/Underworld.mp3";
musiclist["Combat"] = "music/Combat.mp3";
musiclist["Olympus"] = "music/Olympus.mp3";

var sfxlist = {};
sfxlist["sfx_walk_right"] = "sfx/sfx1.wav";
sfxlist["sfx_walk_left"] = "sfx/sfx1.wav";
sfxlist["sfx_walk_water_right"] = "sfx/sfx1_1.wav";
sfxlist["sfx_walk_water_left"] = "sfx/sfx1_1.wav";
sfxlist["sfx_walk_blocked"] = "sfx/sfx6.wav";
sfxlist["sfx_open_door"] = "sfx/sfx3.wav";
sfxlist["sfx_close_door"] = "sfx/sfx4.wav";
sfxlist["sfx_locked_door"] = "sfx/sfx5.wav";
sfxlist["sfx_spell_light"] = "sfx/sfx2.wav";
sfxlist["sfx_unlock"] = "sfx/sfx7.wav";
sfxlist["sfx_potion"] = "sfx/sfx8.wav";
sfxlist["sfx_melee_miss"] = "sfx/sfx9.wav";
// melee hit (10)
// arrow/bolt miss (11)
// arrow/bolt hit (12)
*/

var mapslist = {};
mapslist["darkunknown"] = "the Mainland";
mapslist["poverty"] = "the Towne of Poverty";
mapslist["magetower"] = "Mage's Tower";
mapslist["deathunending"] = "the Dungeon Death's Unending";
mapslist["worldsending"] = "the Dungeon World's Ending";
mapslist["olympus1"] = "Castle Olympus";
mapslist["olympus0"] = "Castle Olympus";
mapslist["olympus2"] = "Castle Olympus";
mapslist["nassau"] = " the Village of Nassau";
mapslist["gauntlet"] = "the Towne of Gauntlet";
mapslist["clearlagoon"] = "the Towne of Clear Lagoon";
mapslist["shadow"] = "the Dungeon Shadow";
mapslist["wealth"] = "the Towne of Wealth";
mapslist["guilddeath"] = "the Dungeon The Guild of Death";
mapslist["blackdragon"] = "Black Dragon's Castle";
mapslist["metaltwister"] = "the Dungeon The Metal Twister";
mapslist["onyx"] = "the Towne of Onyx";
mapslist["pitdespair"] = "the Dungeon Pit of Despair";
mapslist["stout"] = "the Towne of Stout";
mapslist["drash"] = "the Dungeon Mt Drash";
mapslist["vault"] = "the Dungeon Vault";
mapslist["ambrosia"] = "Ambrosia";
mapslist["island"] = "the Distant Island";
mapslist["cairns"] = "the Dungeon Cairns";

ailist = new Array("townsfolk","runaway","guard","melee","spellcaster","missile","adventurer","paladin","ranger","stationary","smallwander","fullwander");

var DAY = 0;
var NIGHT = 2;
var DAWN = 1;
var DUSK = 3;

var worldlight = {};
worldlight["bright"] = 1;
worldlight["dim"] = .5;
worldlight["dark"] = 0;

var LOS_THRESHOLD = .98;
//var LOE_THRESHOLD = .7;
var SHADOW_THRESHOLD = .3;

var MOVE_FLY = 1;
var MOVE_SWIM = 2;
var MOVE_ETHEREAL = 4;
var MOVE_LEVITATE = 8;
var MOVE_WALK = 16;
var MOVE_WALK_DOOR = 32;

var SCALE_TIME = .005;

var BASE_HIT_CHANCE = 70;
var HIT_PER_LEVEL = 4;
var DEF_PER_LEVEL = 0;

var RUNE_KINGS  = 1;
var RUNE_WAVES  = 2;
var RUNE_WINDS  = 4;
var RUNE_FLAMES = 8;
var RUNE_VOID   = 16;

var DMG_NEGLIGABLE = "2d4";
var DMG_LIGHT = "3d4+3";
var DMG_MEDIUM = "4d4+16";
var DMG_HEAVY = "5d4+30";
var DMG_TREMENDOUS = "5d8+55";
var DMG_AUTOKILL = "255";

var MANA_REGEN = 1.5;
var HP_REGEN = 20;

// For sparkles
var COLOR_YELLOW = 0;
var COLOR_GREEN = -32;
var COLOR_BLUE = -64;
var COLOR_ORANGE = -96;
var COLOR_PURPLE = -128;
var COLOR_RED = -160;

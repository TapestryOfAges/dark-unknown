
"use strict";

var ailist = new Array("townsfolk","runaway","guard","melee","spellcaster","missile","adventurer","paladin","ranger","stationary","smallwander","fullwander");

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

var SCALE_TIME = .01;

var BASE_RESIST_CHANCE = 30;
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

var MANA_REGEN = 4;
var HP_REGEN = 20;

// For sparkles
var COLOR_YELLOW = 0;
var COLOR_GREEN = -32;
var COLOR_BLUE = -64;
var COLOR_ORANGE = -96;
var COLOR_PURPLE = -128;
var COLOR_RED = -160;

var STAT_MAX = 25;
var LVL_MAX = 8;
var TP_PER_LEVEL = 3;

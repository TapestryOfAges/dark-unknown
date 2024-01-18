
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

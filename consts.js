
"use strict";

const DAY = 0;
const NIGHT = 2;
const DAWN = 1;
const DUSK = 3;

const worldlight = { bright: 1, dim: .5, dark: 0};

const LOS_THRESHOLD = .98;
//var LOE_THRESHOLD = .7;
const SHADOW_THRESHOLD = .3;

const MOVE_FLY = 1;
const MOVE_SWIM = 2;
const MOVE_ETHEREAL = 4;
const MOVE_LEVITATE = 8;
const MOVE_WALK = 16;
const MOVE_WALK_DOOR = 32;

const SCALE_TIME = .01;

const BASE_RESIST_CHANCE = 30;
const BASE_HIT_CHANCE = 70;
const HIT_PER_LEVEL = 4;
const DEF_PER_LEVEL = 0;
const DEF_PER_DEX = 1;
const XP_MULTIPLIER = 2;

const RUNE_KINGS  = 1;
const RUNE_WAVES  = 2;
const RUNE_WINDS  = 4;
const RUNE_FLAMES = 8;
const RUNE_VOID   = 16;

const DMG_NEGLIGABLE = "2d4";
const DMG_LIGHT = "3d4+3";
const DMG_MEDIUM = "4d4+16";
const DMG_HEAVY = "5d4+30";
const DMG_TREMENDOUS = "5d8+55";
const DMG_AUTOKILL = "255";

const MANA_REGEN = 4;
const HP_REGEN = 20;

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
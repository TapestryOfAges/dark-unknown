"use strict";

mappages["combatGrass1"] = {};
mappages["combatGrass1"].terrain = [];
 mappages["combatGrass1"].terrain[0] = ',, ,, ,, .. .. .. .. .. .. .. .. .. ..';
 mappages["combatGrass1"].terrain[1] = ',, .. .. .. .. .. .. .. .. .. .. .. ,,';
 mappages["combatGrass1"].terrain[2] = '.. .. .. .. .. .. .. .. .. .. .. ,, ,,';
 mappages["combatGrass1"].terrain[3] = '.. .. .. .. .. .. .. .. .. .. ,, ,, ,,';
 mappages["combatGrass1"].terrain[4] = '.. .. .. .. .. .. .. .. .. .. ,, ,, ,,';
 mappages["combatGrass1"].terrain[5] = ',, .. .. .. .. .. .. .. .. .. .. ,, ,,';
 mappages["combatGrass1"].terrain[6] = ',, ,, .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatGrass1"].terrain[7] = ',, ,, ,, .. .. .. .. .. .. .. .. .. ..';
 mappages["combatGrass1"].terrain[8] = ',, ,, .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatGrass1"].terrain[9] = ',, ,, .. .. .. .. .. .. .. .. .. .. ..';
mappages["combatGrass1"].terrain[10] = '.. ,, .. .. .. .. .. .. .. .. .. ,, ,,';
mappages["combatGrass1"].terrain[11] = '.. .. .. .. .. .. .. .. .. .. .. ,, ,,';
mappages["combatGrass1"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. .. .. ,,';

mappages["combatGrass1"].features = [];
mappages["combatGrass1"].features[0] = {name : 'PileOfRocks', x : 11, y : 9};
mappages["combatGrass1"].features[1] = {name : 'PileOfRocks', x : 10, y : 5};
mappages["combatGrass1"].features[2] = {name : 'PileOfRocks', x : 1, y : 1};
mappages["combatGrass1"].features[3] = {name : 'PileOfRocks', x : 1, y : 5};
mappages["combatGrass1"].features[4] = {name : 'PileOfRocks', x : 2, y : 9};


mappages["combatGrass1"].npcs = [];

mappages["combatGrass1"].desc = "Combat";
mappages["combatGrass1"].longdesc = ``;
mappages["combatGrass1"].music = 'Combat';
mappages["combatGrass1"].savename = `Combat`;
mappages["combatGrass1"].exitmap = '';
mappages["combatGrass1"].exitx = '65';
mappages["combatGrass1"].exity = '70';
mappages["combatGrass1"].wraps = 'None';
mappages["combatGrass1"].enterx = '6';
mappages["combatGrass1"].entery = '9';
mappages["combatGrass1"].seeBelow = '';
mappages["combatGrass1"].lightLevel = 'bright';
mappages["combatGrass1"].alwaysRemember = '0';
mappages["combatGrass1"].scale = '1';
mappages["combatGrass1"].underground = '0';
mappages["combatGrass1"].undergroundDesc = '';
mappages["combatGrass1"].enterscript = 'set_exits';
mappages["combatGrass1"].entertestscript = '';
mappages["combatGrass1"].exitscript = '';
mappages["combatGrass1"].exittestscript = 'check_escape';
mappages["combatGrass1"].returnmap = '';
mappages["combatGrass1"].returnx = 'NaN';
mappages["combatGrass1"].returny = 'NaN';
mappages["combatGrass1"].returninfused = '0';
mappages["combatGrass1"].automap = '0';
mappages["combatGrass1"].linkedMaps = [""];
mappages["combatGrass1"].editorLabels = '{}';

// manually added

mappages["combatGrass1"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}


mappages["combatGrass1"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

mappages["combatGrass2"] = {};
mappages["combatGrass2"].terrain = [];
 mappages["combatGrass2"].terrain[0] = '.. .. .. .. ,, ,, ,, ,, ,, .. .. .. ..';
 mappages["combatGrass2"].terrain[1] = '.. .. .. .. .. .. ,, ,, .. .. .. .. ..';
 mappages["combatGrass2"].terrain[2] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatGrass2"].terrain[3] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatGrass2"].terrain[4] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatGrass2"].terrain[5] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatGrass2"].terrain[6] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatGrass2"].terrain[7] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatGrass2"].terrain[8] = '.. ,, .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatGrass2"].terrain[9] = '.. ,, ,, .. .. .. .. .. .. .. .. .. ,,';
mappages["combatGrass2"].terrain[10] = ',, ,, ,, .. .. .. .. .. .. .. .. .. ,,';
mappages["combatGrass2"].terrain[11] = ',, .. .. .. .. .. .. .. .. .. ,, ,, ,,';
mappages["combatGrass2"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. ,, ,, ,,';

mappages["combatGrass2"].features = [];
mappages["combatGrass2"].features[0] = {name : 'PileOfRocks', x : 11, y : 10};


mappages["combatGrass2"].npcs = [];

mappages["combatGrass2"].desc = "Combat";
mappages["combatGrass2"].longdesc = ``;
mappages["combatGrass2"].music = 'Combat';
mappages["combatGrass2"].savename = `Combat`;
mappages["combatGrass2"].exitmap = '';
mappages["combatGrass2"].exitx = '65';
mappages["combatGrass2"].exity = '70';
mappages["combatGrass2"].wraps = 'None';
mappages["combatGrass2"].enterx = '6';
mappages["combatGrass2"].entery = '9';
mappages["combatGrass2"].seeBelow = '';
mappages["combatGrass2"].lightLevel = 'bright';
mappages["combatGrass2"].alwaysRemember = '0';
mappages["combatGrass2"].scale = '1';
mappages["combatGrass2"].underground = '0';
mappages["combatGrass2"].undergroundDesc = '';
mappages["combatGrass2"].enterscript = 'set_exits';
mappages["combatGrass2"].entertestscript = '';
mappages["combatGrass2"].exitscript = '';
mappages["combatGrass2"].exittestscript = 'check_escape';
mappages["combatGrass2"].returnmap = '';
mappages["combatGrass2"].returnx = 'NaN';
mappages["combatGrass2"].returny = 'NaN';
mappages["combatGrass2"].returninfused = '0';
mappages["combatGrass2"].automap = '0';
mappages["combatGrass2"].linkedMaps = [""];
mappages["combatGrass2"].editorLabels = '{}';

// manually added

mappages["combatGrass2"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatGrass2"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}


// MAP BEGINS HERE
mappages["combatShore1"] = {};
mappages["combatShore1"].terrain = [];
 mappages["combatShore1"].terrain[0] = 'ww ww ww ww ww ww ww ww ww w8 w1 w1 w1';
 mappages["combatShore1"].terrain[1] = 'ww ww ww ww ww w8 w1 w1 w1 w7 uu uu uu';
 mappages["combatShore1"].terrain[2] = 'ww ww w8 w1 w1 w7 uu uu uu uu uu uu uu';
 mappages["combatShore1"].terrain[3] = 'w1 w1 w7 uu uu uu uu uu uu uu uu uu uu';
 mappages["combatShore1"].terrain[4] = 'uu uu uu uu uu uu uu uu uu uu /. -- --';
 mappages["combatShore1"].terrain[5] = 'uu uu uu uu /. -- -- -- -- -- .. .. ..';
 mappages["combatShore1"].terrain[6] = 'uu uu /. -- .. .. .. .. .. .. .. .. ..';
 mappages["combatShore1"].terrain[7] = '-- -- .. .. .. .. .. .. .. .. ,, .. ,,';
 mappages["combatShore1"].terrain[8] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatShore1"].terrain[9] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["combatShore1"].terrain[10] = '.. .. ,, .. .. .. .. .. .. .. .. .. ..';
mappages["combatShore1"].terrain[11] = '.. .. .. .. .. .. .. ,, .. .. .. .. ..';
mappages["combatShore1"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';

mappages["combatShore1"].features = [];


mappages["combatShore1"].npcs = [];

mappages["combatShore1"].desc = "Combat";
mappages["combatShore1"].longdesc = ``;
mappages["combatShore1"].music = 'Combat';
mappages["combatShore1"].savename = `Combat`;
mappages["combatShore1"].exitmap = '';
mappages["combatShore1"].exitx = '65';
mappages["combatShore1"].exity = '70';
mappages["combatShore1"].wraps = '';
mappages["combatShore1"].enterx = '6';
mappages["combatShore1"].entery = '9';
mappages["combatShore1"].seeBelow = '';
mappages["combatShore1"].lightLevel = 'bright';
mappages["combatShore1"].alwaysRemember = '0';
mappages["combatShore1"].scale = '1';
mappages["combatShore1"].underground = '0';
mappages["combatShore1"].undergroundDesc = '';
mappages["combatShore1"].enterscript = 'set_exits';
mappages["combatShore1"].entertestscript = '';
mappages["combatShore1"].exitscript = '';
mappages["combatShore1"].exittestscript = 'check_escape';
mappages["combatShore1"].returnmap = '';
mappages["combatShore1"].returnx = 'NaN';
mappages["combatShore1"].returny = 'NaN';
mappages["combatShore1"].returninfused = '0';
mappages["combatShore1"].automap = '0';
mappages["combatShore1"].linkedMaps = [""];
mappages["combatShore1"].editorLabels = '{}';
// MAP ENDS HERE

// manually added

mappages["combatShore1"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatShore1"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

// MAP BEGINS HERE
mappages["combatShore2"] = {};
mappages["combatShore2"].terrain = [];
 mappages["combatShore2"].terrain[0] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatShore2"].terrain[1] = 'w1 w1 w10 ww w8 w1 w1 w1 w1 w1 w1 w10 ww';
 mappages["combatShore2"].terrain[2] = 'uu uu w5 w1 w7 uu uu uu uu uu uu w5 w1';
 mappages["combatShore2"].terrain[3] = 'uu uu uu uu uu uu uu uu uu uu uu uu uu';
 mappages["combatShore2"].terrain[4] = '-- .` uu uu uu uu uu /. -- .` uu uu uu';
 mappages["combatShore2"].terrain[5] = '.. .. .` uu /. -- -- .. .. .. .` uu /.';
 mappages["combatShore2"].terrain[6] = '.. .. .. -- .. .. .. .. .. .. .. -- ..';
 mappages["combatShore2"].terrain[7] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatShore2"].terrain[8] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatShore2"].terrain[9] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["combatShore2"].terrain[10] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["combatShore2"].terrain[11] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["combatShore2"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';

mappages["combatShore2"].features = [];
mappages["combatShore2"].features[0] = {name : 'PileOfRocks', x : 11, y : 10};
mappages["combatShore2"].features[1] = {name : 'PileOfRocks', x : 3, y : 8};
mappages["combatShore2"].features[2] = {name : 'PileOfRocks', x : 1, y : 11};


mappages["combatShore2"].npcs = [];

mappages["combatShore2"].desc = "Combat";
mappages["combatShore2"].longdesc = ``;
mappages["combatShore2"].music = 'Combat';
mappages["combatShore2"].savename = `Combat`;
mappages["combatShore2"].exitmap = '';
mappages["combatShore2"].exitx = '65';
mappages["combatShore2"].exity = '70';
mappages["combatShore2"].wraps = '';
mappages["combatShore2"].enterx = '6';
mappages["combatShore2"].entery = '9';
mappages["combatShore2"].seeBelow = '';
mappages["combatShore2"].lightLevel = 'bright';
mappages["combatShore2"].alwaysRemember = '0';
mappages["combatShore2"].scale = '1';
mappages["combatShore2"].underground = '0';
mappages["combatShore2"].undergroundDesc = '';
mappages["combatShore2"].enterscript = 'set_exits';
mappages["combatShore2"].entertestscript = '';
mappages["combatShore2"].exitscript = '';
mappages["combatShore2"].exittestscript = 'check_escape';
mappages["combatShore2"].returnmap = '';
mappages["combatShore2"].returnx = 'NaN';
mappages["combatShore2"].returny = 'NaN';
mappages["combatShore2"].returninfused = '0';
mappages["combatShore2"].automap = '0';
mappages["combatShore2"].linkedMaps = [];
mappages["combatShore2"].editorLabels = '{}';
// MAP ENDS HERE

// manually added

mappages["combatShore2"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatShore2"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

// Water

// MAP BEGINS HERE
mappages["combatWater1"] = {};
mappages["combatWater1"].terrain = [];
 mappages["combatWater1"].terrain[0] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater1"].terrain[1] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater1"].terrain[2] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater1"].terrain[3] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater1"].terrain[4] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater1"].terrain[5] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater1"].terrain[6] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater1"].terrain[7] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater1"].terrain[8] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater1"].terrain[9] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
mappages["combatWater1"].terrain[10] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
mappages["combatWater1"].terrain[11] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
mappages["combatWater1"].terrain[12] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';

mappages["combatWater1"].features = [];


mappages["combatWater1"].npcs = [];

mappages["combatWater1"].desc = "Combat";
mappages["combatWater1"].longdesc = ``;
mappages["combatWater1"].music = 'Combat';
mappages["combatWater1"].savename = `Combat`;
mappages["combatWater1"].exitmap = '';
mappages["combatWater1"].exitx = '65';
mappages["combatWater1"].exity = '70';
mappages["combatWater1"].wraps = 'None';
mappages["combatWater1"].enterx = '6';
mappages["combatWater1"].entery = '9';
mappages["combatWater1"].seeBelow = '';
mappages["combatWater1"].lightLevel = 'bright';
mappages["combatWater1"].alwaysRemember = '0';
mappages["combatWater1"].scale = '1';
mappages["combatWater1"].underground = '0';
mappages["combatWater1"].undergroundDesc = '';
mappages["combatWater1"].enterscript = 'set_exits';
mappages["combatWater1"].entertestscript = '';
mappages["combatWater1"].exitscript = '';
mappages["combatWater1"].exittestscript = 'check_escape';
mappages["combatWater1"].returnmap = '';
mappages["combatWater1"].returnx = 'NaN';
mappages["combatWater1"].returny = 'NaN';
mappages["combatWater1"].returninfused = '0';
mappages["combatWater1"].automap = '0';
mappages["combatWater1"].linkedMaps = [""];
mappages["combatWater1"].editorLabels = '{}';
// MAP ENDS HERE

// manually added

mappages["combatWater1"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatWater1"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}


// MAP BEGINS HERE
mappages["combatWater2"] = {};
mappages["combatWater2"].terrain = [];
 mappages["combatWater2"].terrain[0] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater2"].terrain[1] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater2"].terrain[2] = 'w8 w1 w1 w1 w10 ww ww ww ww ww ww ww ww';
 mappages["combatWater2"].terrain[3] = 'w3 uu uu uu w2 ww ww ww ww ww ww ww ww';
 mappages["combatWater2"].terrain[4] = 'w9 w0 w6 uu w2 ww ww ww ww ww ww ww ww';
 mappages["combatWater2"].terrain[5] = 'ww ww w9 w0 w11 ww ww ww ww ww ww ww ww';
 mappages["combatWater2"].terrain[6] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
 mappages["combatWater2"].terrain[7] = 'ww ww ww ww ww ww ww ww w8 w1 w1 w10 ww';
 mappages["combatWater2"].terrain[8] = 'ww ww ww ww w8 w1 w10 ww w3 uu uu w2 ww';
 mappages["combatWater2"].terrain[9] = 'ww ww ww w8 w7 uu w2 ww w9 w0 w0 w11 ww';
mappages["combatWater2"].terrain[10] = 'ww ww ww w3 uu uu w2 ww ww ww ww ww ww';
mappages["combatWater2"].terrain[11] = 'ww ww ww w9 w0 w0 w11 ww ww ww ww ww ww';
mappages["combatWater2"].terrain[12] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';

mappages["combatWater2"].features = [];


mappages["combatWater2"].npcs = [];

mappages["combatWater2"].transover = '{}';

mappages["combatWater2"].desc = "Combat";
mappages["combatWater2"].longdesc = ``;
mappages["combatWater2"].music = 'Combat';
mappages["combatWater2"].savename = `Combat`;
mappages["combatWater2"].exitmap = '';
mappages["combatWater2"].exitx = '65';
mappages["combatWater2"].exity = '70';
mappages["combatWater2"].wraps = 'None';
mappages["combatWater2"].enterx = '6';
mappages["combatWater2"].entery = '9';
mappages["combatWater2"].seeBelow = '';
mappages["combatWater2"].lightLevel = 'bright';
mappages["combatWater2"].alwaysRemember = '0';
mappages["combatWater2"].scale = '1';
mappages["combatWater2"].underground = '0';
mappages["combatWater2"].undergroundDesc = '';
mappages["combatWater2"].enterscript = 'set_exits';
mappages["combatWater2"].entertestscript = '';
mappages["combatWater2"].exitscript = '';
mappages["combatWater2"].exittestscript = 'check_escape';
mappages["combatWater2"].returnmap = '';
mappages["combatWater2"].returnx = 'NaN';
mappages["combatWater2"].returny = 'NaN';
mappages["combatWater2"].returninfused = '0';
mappages["combatWater2"].automap = '0';
mappages["combatWater2"].linkedMaps = [""];
mappages["combatWater2"].editorLabels = '{}';
// MAP ENDS HERE

// manually added

mappages["combatWater2"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatWater2"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

// Brush

mappages["combatBrush1"] = {};
mappages["combatBrush1"].terrain = [];
 mappages["combatBrush1"].terrain[0] = ',, ,, u, ,, .. .. .. .. .. .. u, ,, ,,';
 mappages["combatBrush1"].terrain[1] = 'u, ,, ,, .. .. .. .. .. .. .. .. .. ,,';
 mappages["combatBrush1"].terrain[2] = ',, ,, .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatBrush1"].terrain[3] = ',, .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatBrush1"].terrain[4] = '.. .. .. .. .. ,, ,, ,, ,, .. .. .. ..';
 mappages["combatBrush1"].terrain[5] = '.. .. .. .. .. .. ,, u, ,, ,, .. ,, ..';
 mappages["combatBrush1"].terrain[6] = '.. .. .. .. .. .. .. ,, ,, ,, u, ,, ,,';
 mappages["combatBrush1"].terrain[7] = '.. .. .. .. .. .. .. .. .. ,, ,, ,, ,,';
 mappages["combatBrush1"].terrain[8] = '.. .. .. .. .. .. .. .. .. .. ,, u, ,,';
 mappages["combatBrush1"].terrain[9] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["combatBrush1"].terrain[10] = '.. ,, ,, .. .. .. .. .. .. .. .. .. ..';
mappages["combatBrush1"].terrain[11] = ',, ,, u, ,, .. .. .. .. .. .. .. .. ..';
mappages["combatBrush1"].terrain[12] = 'u, ,, ,, ,, ,, .. .. .. .. .. .. .. ..';

mappages["combatBrush1"].features = [];
mappages["combatBrush1"].features[0] = {name : 'PileOfRocks', x : 7, y : 7};
mappages["combatBrush1"].features[1] = {name : 'PileOfRocks', x : 10, y : 5};
mappages["combatBrush1"].features[2] = {name : 'PileOfRocks', x : 5, y : 5};
mappages["combatBrush1"].features[3] = {name : 'PileOfRocks', x : 2, y : 2};
mappages["combatBrush1"].features[4] = {name : 'PileOfRocks', x : 3, y : 10};


mappages["combatBrush1"].npcs = [];

mappages["combatBrush1"].desc = "Combat";
mappages["combatBrush1"].longdesc = ``;
mappages["combatBrush1"].music = 'Combat';
mappages["combatBrush1"].savename = `Combat`;
mappages["combatBrush1"].exitmap = '';
mappages["combatBrush1"].exitx = '65';
mappages["combatBrush1"].exity = '70';
mappages["combatBrush1"].wraps = 'None';
mappages["combatBrush1"].enterx = '6';
mappages["combatBrush1"].entery = '9';
mappages["combatBrush1"].seeBelow = '';
mappages["combatBrush1"].lightLevel = 'bright';
mappages["combatBrush1"].alwaysRemember = '0';
mappages["combatBrush1"].scale = '1';
mappages["combatBrush1"].underground = '0';
mappages["combatBrush1"].undergroundDesc = '';
mappages["combatBrush1"].enterscript = 'set_exits';
mappages["combatBrush1"].entertestscript = '';
mappages["combatBrush1"].exitscript = '';
mappages["combatBrush1"].exittestscript = 'check_escape';
mappages["combatBrush1"].returnmap = '';
mappages["combatBrush1"].returnx = 'NaN';
mappages["combatBrush1"].returny = 'NaN';
mappages["combatBrush1"].returninfused = '0';
mappages["combatBrush1"].automap = '0';
mappages["combatBrush1"].linkedMaps = [""];
mappages["combatBrush1"].editorLabels = '{}';

// manually added

mappages["combatBrush1"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatBrush1"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}


mappages["combatBrush2"] = {};
mappages["combatBrush2"].terrain = [];
 mappages["combatBrush2"].terrain[0] = '.. .. .. .. .. .. .. .. .. u, ,, ,, ,,';
 mappages["combatBrush2"].terrain[1] = ',, .. .. .. .. .. .. .. .. .. ,, u, ,,';
 mappages["combatBrush2"].terrain[2] = 'u, ,, .. .. .. .. .. .. .. .. .. ,, ..';
 mappages["combatBrush2"].terrain[3] = ',, u, ,, .. .. .. .. .. .. .. .. .. ..';
 mappages["combatBrush2"].terrain[4] = ',, ,, ,, ,, ,, .. .. .. .. .. .. .. ..';
 mappages["combatBrush2"].terrain[5] = '.. .. ,, ,, u, ,, .. .. .. .. .. .. ,,';
 mappages["combatBrush2"].terrain[6] = '.. .. .. ,, ,, ,, ,, .. .. .. .. .. ,,';
 mappages["combatBrush2"].terrain[7] = '.. .. .. .. ,, ,, ,, .. .. .. .. .. ..';
 mappages["combatBrush2"].terrain[8] = '.. .. .. .. .. ,, .. .. .. .. .. .. ..';
 mappages["combatBrush2"].terrain[9] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["combatBrush2"].terrain[10] = ',, .. .. .. .. .. .. .. .. .. ,, ,, ..';
mappages["combatBrush2"].terrain[11] = 'u, ,, .. .. .. .. .. .. .. ,, u, ,, ,,';
mappages["combatBrush2"].terrain[12] = 'u, ,, .. .. .. .. .. .. ,, ,, ,, u, ,,';

mappages["combatBrush2"].features = [];


mappages["combatBrush2"].npcs = [];

mappages["combatBrush2"].desc = "Combat";
mappages["combatBrush2"].longdesc = '';
mappages["combatBrush2"].music = 'Combat';
mappages["combatBrush2"].savename = `Combat`;
mappages["combatBrush2"].exitmap = '';
mappages["combatBrush2"].exitx = '65';
mappages["combatBrush2"].exity = '70';
mappages["combatBrush2"].wraps = 'None';
mappages["combatBrush2"].enterx = '6';
mappages["combatBrush2"].entery = '9';
mappages["combatBrush2"].seeBelow = '';
mappages["combatBrush2"].lightLevel = 'bright';
mappages["combatBrush2"].alwaysRemember = '0';
mappages["combatBrush2"].scale = '1';
mappages["combatBrush2"].underground = '0';
mappages["combatBrush2"].undergroundDesc = '';
mappages["combatBrush2"].enterscript = 'set_exits';
mappages["combatBrush2"].entertestscript = '';
mappages["combatBrush2"].exitscript = '';
mappages["combatBrush2"].exittestscript = 'check_escape';
mappages["combatBrush2"].returnmap = '';
mappages["combatBrush2"].returnx = 'NaN';
mappages["combatBrush2"].returny = 'NaN';
mappages["combatBrush2"].returninfused = '0';
mappages["combatBrush2"].automap = '0';
mappages["combatBrush2"].linkedMaps = [""];
mappages["combatBrush2"].editorLabels = '{}';

// manually added

mappages["combatBrush2"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatBrush2"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

// Hill

// MAP BEGINS HERE
mappages["combatHill1"] = {};
mappages["combatHill1"].terrain = [];
 mappages["combatHill1"].terrain[0] = '^^ ^^ ^^ ^^ nn .. .. .. .. .. nn ^^ ^^';
 mappages["combatHill1"].terrain[1] = '^^ ^^ ^^ nn .. .. .. .. .. .. nn nn ^^';
 mappages["combatHill1"].terrain[2] = '^^ ^^ ^^ .. .. .. .. .. nn nn nn nn nn';
 mappages["combatHill1"].terrain[3] = '^^ ^^ nn .. nn nn .. .. .. ^^ ^^ nn nn';
 mappages["combatHill1"].terrain[4] = '^^ ^^ .. .. ^^ ^^ .. .. .. .. ^^ .. ..';
 mappages["combatHill1"].terrain[5] = '^^ ^^ .. .. ^^ .. .. ^^ ^^ .. ^^ ^^ ..';
 mappages["combatHill1"].terrain[6] = 'nn .. .. .. ^^ .. .. nn ^^ .. ^^ ^^ ..';
 mappages["combatHill1"].terrain[7] = '.. .. nn .. .. .. nn nn .. .. ^^ nn nn';
 mappages["combatHill1"].terrain[8] = '.. nn ^^ .. .. .. .. .. .. ^^ ^^ nn nn';
 mappages["combatHill1"].terrain[9] = '.. nn ^^ ^^ n1 .. .. .. .. .. .. .. ..';
mappages["combatHill1"].terrain[10] = '^^ ^^ ^^ ^^ .. .. .. .. .. .. nn nn ..';
mappages["combatHill1"].terrain[11] = '^^ ^^ ^^ nn .. .. .. .. .. nn ^^ ^^ ^^';
mappages["combatHill1"].terrain[12] = '^^ ^^ nn .. .. .. .. nn ^^ ^^ ^^ ^^ ^^';

mappages["combatHill1"].features = [];


mappages["combatHill1"].npcs = [];

mappages["combatHill1"].transover = '{"0,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"1,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-448]],"1,9":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-64,-448]],"2,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"2,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-320,-448]],"2,12":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-96,-448]],"3,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"3,11":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"4,0":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"4,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-448]],"5,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-448]],"6,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-256,-448]],"7,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-64,-448]],"7,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"7,12":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-448]],"8,2":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-256,-448]],"9,2":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-448]],"9,11":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-448]],"10,0":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-64,-448]],"10,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-64,-448]],"10,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-448]],"11,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-448]],"11,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-448]],"11,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-448]],"12,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-448]],"12,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-448]],"12,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-448]],"0,5":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-96,-480]],"0,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-480]],"1,3":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-160,-480]],"1,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-480]],"1,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-480]],"1,10":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-32,-480]],"1,12":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-160,-480]],"2,1":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-160,-480]],"2,2":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-480]],"2,8":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-384,-480]],"2,9":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-128,-480]],"2,11":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-288,-480]],"3,0":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-288,-480]],"3,9":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-480]],"3,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-480]],"4,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-480]],"4,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-480,-480]],"4,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-416,-480]],"5,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-352,-480]],"7,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-320,-480]],"8,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-480]],"8,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-416,-480]],"8,12":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-192,-480]],"9,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-320,-480]],"9,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-320,-480]],"9,12":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-32,-480]],"10,3":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-224,-480]],"10,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-480,-480]],"10,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-480]],"10,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-480]],"10,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-480,-480]],"10,8":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-288,-480]],"10,11":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-192,-480]],"11,0":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-256,-480]],"11,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-480]],"11,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-480]],"11,11":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",0,-480]],"12,1":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-256,-480]],"12,11":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-480]],"4,9":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-448,-448]]}';

mappages["combatHill1"].desc = "Combat";
mappages["combatHill1"].longdesc = ``;
mappages["combatHill1"].music = 'Combat';
mappages["combatHill1"].savename = `Combat`;
mappages["combatHill1"].exitmap = '';
mappages["combatHill1"].exitx = '65';
mappages["combatHill1"].exity = '70';
mappages["combatHill1"].wraps = 'None';
mappages["combatHill1"].enterx = '6';
mappages["combatHill1"].entery = '9';
mappages["combatHill1"].seeBelow = '';
mappages["combatHill1"].lightLevel = 'bright';
mappages["combatHill1"].alwaysRemember = '0';
mappages["combatHill1"].scale = '1';
mappages["combatHill1"].underground = '0';
mappages["combatHill1"].undergroundDesc = '';
mappages["combatHill1"].enterscript = 'set_exits';
mappages["combatHill1"].entertestscript = '';
mappages["combatHill1"].exitscript = '';
mappages["combatHill1"].exittestscript = 'check_escape';
mappages["combatHill1"].returnmap = '';
mappages["combatHill1"].returnx = 'NaN';
mappages["combatHill1"].returny = 'NaN';
mappages["combatHill1"].returninfused = '0';
mappages["combatHill1"].automap = '0';
mappages["combatHill1"].linkedMaps = [""];
mappages["combatHill1"].editorLabels = '{}';
// MAP ENDS HERE

// manually added

mappages["combatHill1"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatHill1"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}


// MAP BEGINS HERE
mappages["combatHill2"] = {};
mappages["combatHill2"].terrain = [];
 mappages["combatHill2"].terrain[0] = '^^ ^^ nn .. .. nn nn nn .. nn nn ^^ ^^';
 mappages["combatHill2"].terrain[1] = '^^ ^^ nn .. .. .. nn .. .. .. nn nn ^^';
 mappages["combatHill2"].terrain[2] = '^^ nn nn .. .. .. .. .. .. .. .. nn ^^';
 mappages["combatHill2"].terrain[3] = 'nn nn .. .. .. .. .. .. .. .. .. nn nn';
 mappages["combatHill2"].terrain[4] = 'nn .. .. .. .. .. .. .. .. .. .. .. nn';
 mappages["combatHill2"].terrain[5] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatHill2"].terrain[6] = '.. .. .. nn nn nn .. nn nn nn .. .. ..';
 mappages["combatHill2"].terrain[7] = '.. .. .. ^^ ^^ nn .. nn nn ^^ ^^ .. ..';
 mappages["combatHill2"].terrain[8] = '.. nn ^^ ^^ nn .. .. .. nn ^^ ^^ ^^ ..';
 mappages["combatHill2"].terrain[9] = 'nn ^^ ^^ ^^ .. .. .. .. .. nn ^^ ^^ nn';
mappages["combatHill2"].terrain[10] = 'nn ^^ ^^ ^^ .. .. .. .. .. .. ^^ ^^ ^^';
mappages["combatHill2"].terrain[11] = '^^ ^^ ^^ nn .. .. .. .. .. .. ^^ ^^ ^^';
mappages["combatHill2"].terrain[12] = '^^ ^^ ^^ nn nn .. .. .. .. nn nn ^^ ^^';

mappages["combatHill2"].features = [];


mappages["combatHill2"].npcs = [];

mappages["combatHill2"].transover = '{"0,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"0,9":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-448]],"1,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"1,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-448]],"2,0":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-96,-448]],"2,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-96,-448]],"2,2":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"3,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-448]],"3,11":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-96,-448]],"4,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-448]],"4,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"4,12":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-448]],"5,0":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-448]],"5,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-448]],"5,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"6,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-352,-448]],"7,0":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-448]],"7,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-448]],"7,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-448]],"8,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-448]],"8,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-448]],"9,0":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-448]],"9,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-448]],"9,9":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-448]],"9,12":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-448]],"10,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-448]],"11,2":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-64,-448]],"11,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-448]],"12,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-448]],"12,9":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-448]],"0,2":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-288,-480]],"0,11":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-32,-480]],"1,0":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-160,-480]],"1,1":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-288,-480]],"1,9":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-192,-480]],"1,10":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-128,-480]],"2,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-480]],"2,11":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-160,-480]],"2,12":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-160,-480]],"3,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-480]],"3,8":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-160,-480]],"3,9":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-480]],"3,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-480]],"4,7":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-352,-480]],"9,7":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-192,-480]],"9,8":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-256,-480]],"10,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-480]],"10,9":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-128,-480]],"10,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-480]],"10,11":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-256,-480]],"11,0":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-256,-480]],"11,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-480]],"11,9":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-160,-480]],"11,12":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-128,-480]],"12,1":[["","",null,null],["static.gif","spacer.gif",-256,0],["TerrainBlend.gif","spacer.gif",-128,-480]],"12,2":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",-256,-480]],"12,10":[["","",null,null],["static.gif","spacer.gif",-224,-224],["TerrainBlend.gif","spacer.gif",0,-480]]}';

mappages["combatHill2"].desc = "Combat";
mappages["combatHill2"].longdesc = ``;
mappages["combatHill2"].music = 'Combat';
mappages["combatHill2"].savename = `Combat`;
mappages["combatHill2"].exitmap = '';
mappages["combatHill2"].exitx = '65';
mappages["combatHill2"].exity = '70';
mappages["combatHill2"].wraps = 'None';
mappages["combatHill2"].enterx = '6';
mappages["combatHill2"].entery = '9';
mappages["combatHill2"].seeBelow = '';
mappages["combatHill2"].lightLevel = 'bright';
mappages["combatHill2"].alwaysRemember = '0';
mappages["combatHill2"].scale = '1';
mappages["combatHill2"].underground = '0';
mappages["combatHill2"].undergroundDesc = '';
mappages["combatHill2"].enterscript = 'set_exits';
mappages["combatHill2"].entertestscript = '';
mappages["combatHill2"].exitscript = '';
mappages["combatHill2"].exittestscript = 'check_escape';
mappages["combatHill2"].returnmap = '';
mappages["combatHill2"].returnx = 'NaN';
mappages["combatHill2"].returny = 'NaN';
mappages["combatHill2"].returninfused = '0';
mappages["combatHill2"].automap = '0';
mappages["combatHill2"].linkedMaps = [""];
mappages["combatHill2"].editorLabels = '{}';
// MAP ENDS HERE

// manually added

mappages["combatHill2"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatHill2"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

// Forest

mappages["combatForest1"] = {};
mappages["combatForest1"].terrain = [];
 mappages["combatForest1"].terrain[0] = '.. ,, .. .. .. .. ,, .. .. .. .. .. ,,';
 mappages["combatForest1"].terrain[1] = '.. .. .. .. .. .. .. .. .. ,, ,, .. ,,';
 mappages["combatForest1"].terrain[2] = '.. ,, u, .. ,, ,, ,, ,, ,, .. .. ,, ..';
 mappages["combatForest1"].terrain[3] = ',, ,, .. .. .. ,, .. .. .. .. .. u, ..';
 mappages["combatForest1"].terrain[4] = '.. .. .. .. .. .. ,, .. .. .. .. .. ..';
 mappages["combatForest1"].terrain[5] = ',, .. .. .. .. ,, ,, .. .. .. .. .. ..';
 mappages["combatForest1"].terrain[6] = 'u, .. .. .. ,, ,, .. u, .. .. .. .. ..';
 mappages["combatForest1"].terrain[7] = '.. .. .. .. .. .. .. .. .. .. ,, ,, ..';
 mappages["combatForest1"].terrain[8] = '.. .. .. .. .. ,, .. .. .. .. .. ,, ..';
 mappages["combatForest1"].terrain[9] = ',, ,, .. ,, ,, .. .. .. .. u, .. .. ..';
mappages["combatForest1"].terrain[10] = ',, .. .. .. .. .. .. .. .. .. ,, ,, ..';
mappages["combatForest1"].terrain[11] = '.. .. ,, ,, ,, .. .. .. ,, .. .. .. ..';
mappages["combatForest1"].terrain[12] = ',, .. u, .. .. ,, ,, .. .. .. .. .. ..';

mappages["combatForest1"].features = [];
mappages["combatForest1"].features[0] = {name : 'Tree', x : 4, y : 4};
mappages["combatForest1"].features[1] = {name : 'Tree', x : 2, y : 3};
mappages["combatForest1"].features[2] = {name : 'Tree', x : 2, y : 1};
mappages["combatForest1"].features[3] = {name : 'Tree', x : 1, y : 4};
mappages["combatForest1"].features[4] = {name : 'Tree', x : 2, y : 6};
mappages["combatForest1"].features[5] = {name : 'Tree', x : 4, y : 7};
mappages["combatForest1"].features[6] = {name : 'Tree', x : 3, y : 10};
mappages["combatForest1"].features[7] = {name : 'Tree', x : 2, y : 8};
mappages["combatForest1"].features[8] = {name : 'Tree', x : 1, y : 11};
mappages["combatForest1"].features[9] = {name : 'Tree', x : 10, y : 9};
mappages["combatForest1"].features[10] = {name : 'Tree', x : 8, y : 10};
mappages["combatForest1"].features[11] = {name : 'Tree', x : 8, y : 7};
mappages["combatForest1"].features[12] = {name : 'Tree', x : 10, y : 5};
mappages["combatForest1"].features[13] = {name : 'Tree', x : 11, y : 6};
mappages["combatForest1"].features[14] = {name : 'Tree', x : 9, y : 2};
mappages["combatForest1"].features[15] = {name : 'Tree', x : 8, y : 0};
mappages["combatForest1"].features[16] = {name : 'Tree', x : 4, y : 0};
mappages["combatForest1"].features[17] = {name : 'Tree', x : 0, y : 2};
mappages["combatForest1"].features[18] = {name : 'Tree', x : 11, y : 1};
mappages["combatForest1"].features[19] = {name : 'Tree', x : 12, y : 3};
mappages["combatForest1"].features[20] = {name : 'Tree', x : 12, y : 10};
mappages["combatForest1"].features[21] = {name : 'Tree', x : 11, y : 12};
mappages["combatForest1"].features[22] = {name : 'Tree', x : 9, y : 12};
mappages["combatForest1"].features[23] = {name : 'Tree', x : 8, y : 5};
mappages["combatForest1"].features[24] = {name : 'Tree', x : 5, y : 10};
mappages["combatForest1"].features[25] = {name : 'DeadTree', x : 1, y : 7};
mappages["combatForest1"].features[26] = {name : 'DeadTree', x : 10, y : 3};
mappages["combatForest1"].features[27] = {name : 'Tree', x : 7, y : 8};


mappages["combatForest1"].npcs = [];

mappages["combatForest1"].desc = "Combat";
mappages["combatForest1"].longdesc = '';
mappages["combatForest1"].music = 'Combat';
mappages["combatForest1"].savename = `Combat`;
mappages["combatForest1"].exitmap = '';
mappages["combatForest1"].exitx = '65';
mappages["combatForest1"].exity = '70';
mappages["combatForest1"].wraps = 'None';
mappages["combatForest1"].enterx = '6';
mappages["combatForest1"].entery = '9';
mappages["combatForest1"].seeBelow = '';
mappages["combatForest1"].lightLevel = 'bright';
mappages["combatForest1"].alwaysRemember = '0';
mappages["combatForest1"].scale = '1';
mappages["combatForest1"].underground = '0';
mappages["combatForest1"].undergroundDesc = '';
mappages["combatForest1"].enterscript = 'set_exits';
mappages["combatForest1"].entertestscript = '';
mappages["combatForest1"].exitscript = '';
mappages["combatForest1"].exittestscript = 'check_escape';
mappages["combatForest1"].returnmap = '';
mappages["combatForest1"].returnx = 'NaN';
mappages["combatForest1"].returny = 'NaN';
mappages["combatForest1"].returninfused = '0';
mappages["combatForest1"].automap = '0';
mappages["combatForest1"].linkedMaps = [""];
mappages["combatForest1"].editorLabels = '{}';

// manually added

mappages["combatForest1"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatForest1"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

mappages["combatForest2"] = {};
mappages["combatForest2"].terrain = [];
 mappages["combatForest2"].terrain[0] = '.. .. .. .. .. .. .. .. .. .. ,, .. ..';
 mappages["combatForest2"].terrain[1] = '.. u, .. .. .. .. .. .. .. ,, ,, .. ..';
 mappages["combatForest2"].terrain[2] = '.. .. .. ,, ,, .. .. ,, .. .. u, .. ,,';
 mappages["combatForest2"].terrain[3] = '.. .. .. .. .. .. ,, .. .. .. .. .. ..';
 mappages["combatForest2"].terrain[4] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatForest2"].terrain[5] = '.. ,, ,, .. .. ,, .. .. .. .. .. ,, ..';
 mappages["combatForest2"].terrain[6] = 'u, .. .. ,, .. .. .. .. ,, ,, ,, .. ..';
 mappages["combatForest2"].terrain[7] = '.. .. .. .. .. .. .. .. .. .. ,, .. ..';
 mappages["combatForest2"].terrain[8] = '.. ,, .. .. .. .. ,, ,, .. .. ,, .. ..';
 mappages["combatForest2"].terrain[9] = '.. ,, .. .. .. .. .. .. .. .. .. .. u,';
mappages["combatForest2"].terrain[10] = ',, .. .. .. .. ,, .. .. .. .. .. .. ..';
mappages["combatForest2"].terrain[11] = '.. .. .. ,, ,, ,, .. ,, .. .. ,, ,, ..';
mappages["combatForest2"].terrain[12] = '.. .. u, .. .. .. .. .. .. .. .. .. ..';

mappages["combatForest2"].features = [];
mappages["combatForest2"].features[0] = {name : 'Tree', x : 8, y : 8};
mappages["combatForest2"].features[1] = {name : 'Tree', x : 8, y : 9};
mappages["combatForest2"].features[2] = {name : 'Tree', x : 7, y : 9};
mappages["combatForest2"].features[3] = {name : 'Tree', x : 8, y : 10};
mappages["combatForest2"].features[4] = {name : 'Tree', x : 9, y : 7};
mappages["combatForest2"].features[5] = {name : 'Tree', x : 10, y : 5};
mappages["combatForest2"].features[6] = {name : 'Tree', x : 9, y : 4};
mappages["combatForest2"].features[7] = {name : 'Tree', x : 9, y : 5};
mappages["combatForest2"].features[8] = {name : 'Tree', x : 10, y : 3};
mappages["combatForest2"].features[9] = {name : 'Tree', x : 11, y : 2};
mappages["combatForest2"].features[10] = {name : 'Tree', x : 11, y : 1};
mappages["combatForest2"].features[11] = {name : 'Tree', x : 11, y : 4};
mappages["combatForest2"].features[12] = {name : 'Tree', x : 11, y : 7};
mappages["combatForest2"].features[13] = {name : 'Tree', x : 10, y : 9};
mappages["combatForest2"].features[14] = {name : 'Tree', x : 11, y : 9};
mappages["combatForest2"].features[15] = {name : 'Tree', x : 12, y : 10};
mappages["combatForest2"].features[16] = {name : 'Tree', x : 10, y : 12};
mappages["combatForest2"].features[17] = {name : 'Tree', x : 9, y : 12};
mappages["combatForest2"].features[18] = {name : 'Tree', x : 1, y : 4};
mappages["combatForest2"].features[19] = {name : 'Tree', x : 1, y : 2};
mappages["combatForest2"].features[20] = {name : 'Tree', x : 2, y : 2};
mappages["combatForest2"].features[21] = {name : 'Tree', x : 2, y : 2};
mappages["combatForest2"].features[22] = {name : 'Tree', x : 3, y : 1};
mappages["combatForest2"].features[23] = {name : 'Tree', x : 4, y : 0};
mappages["combatForest2"].features[24] = {name : 'Tree', x : 1, y : 0};
mappages["combatForest2"].features[25] = {name : 'Tree', x : 0, y : 1};
mappages["combatForest2"].features[26] = {name : 'Tree', x : 1, y : 7};
mappages["combatForest2"].features[27] = {name : 'Tree', x : 2, y : 8};
mappages["combatForest2"].features[28] = {name : 'Tree', x : 2, y : 10};
mappages["combatForest2"].features[29] = {name : 'Tree', x : 1, y : 10};
mappages["combatForest2"].features[30] = {name : 'Tree', x : 0, y : 12};


mappages["combatForest2"].npcs = [];

mappages["combatForest2"].desc = "Combat";
mappages["combatForest2"].longdesc = '';
mappages["combatForest2"].music = 'Combat';
mappages["combatForest2"].savename = `Combat`;
mappages["combatForest2"].exitmap = '';
mappages["combatForest2"].exitx = '65';
mappages["combatForest2"].exity = '70';
mappages["combatForest2"].wraps = 'None';
mappages["combatForest2"].enterx = '6';
mappages["combatForest2"].entery = '9';
mappages["combatForest2"].seeBelow = '';
mappages["combatForest2"].lightLevel = 'bright';
mappages["combatForest2"].alwaysRemember = '0';
mappages["combatForest2"].scale = '1';
mappages["combatForest2"].underground = '0';
mappages["combatForest2"].undergroundDesc = '';
mappages["combatForest2"].enterscript = 'set_exits';
mappages["combatForest2"].entertestscript = '';
mappages["combatForest2"].exitscript = '';
mappages["combatForest2"].exittestscript = 'check_escape';
mappages["combatForest2"].returnmap = '';
mappages["combatForest2"].returnx = 'NaN';
mappages["combatForest2"].returny = 'NaN';
mappages["combatForest2"].returninfused = '0';
mappages["combatForest2"].automap = '0';
mappages["combatForest2"].linkedMaps = [""];
mappages["combatForest2"].editorLabels = '{}';

// manually added

mappages["combatForest2"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatForest2"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

//Swamp

// MAP BEGINS HERE
mappages["combatSwamp1"] = {};
mappages["combatSwamp1"].terrain = [];
 mappages["combatSwamp1"].terrain[0] = '.. .. ff .. .. .. .. .. .. .. .. .. ..';
 mappages["combatSwamp1"].terrain[1] = '.. ff .. .. .. .. .. .. .. ff ff ff ..';
 mappages["combatSwamp1"].terrain[2] = 'ff ff .. .. .. .. .. .. .. .. .. ff ..';
 mappages["combatSwamp1"].terrain[3] = '.. .. ff ff .. .. .. .. .. .. .. .. ..';
 mappages["combatSwamp1"].terrain[4] = '.. ff ff .. .. .. .. .. .. .. .. .. ..';
 mappages["combatSwamp1"].terrain[5] = '.. ff .. .. .. .. .. .. .. .. ff .. ..';
 mappages["combatSwamp1"].terrain[6] = 'ff .. .. .. .. .. .. .. .. .. .. ff ..';
 mappages["combatSwamp1"].terrain[7] = 'ff .. .. .. .. .. .. .. .. .. ff ff ..';
 mappages["combatSwamp1"].terrain[8] = '.. .. ff ff .. .. .. .. .. .. .. .. ..';
 mappages["combatSwamp1"].terrain[9] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["combatSwamp1"].terrain[10] = 'ff ff .. .. .. .. .. .. .. .. ff .. ff';
mappages["combatSwamp1"].terrain[11] = 'ff .. .. .. .. .. .. .. .. ff ff ff ..';
mappages["combatSwamp1"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. ff .. ..';

mappages["combatSwamp1"].features = [];


mappages["combatSwamp1"].npcs = [];

mappages["combatSwamp1"].transover = '{"0,2":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-384,-640]],"0,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-640]],"0,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-640]],"0,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-640]],"0,11":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-640]],"1,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-320,-640]],"1,2":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-640]],"1,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-640]],"1,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-352,-640]],"1,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-640]],"2,0":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-352,-640]],"2,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-640]],"2,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-640]],"2,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-256,-640]],"3,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-640]],"3,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-640]],"9,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-256,-640]],"9,11":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-256,-640]],"10,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-384,-640]],"10,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-448,-640]],"10,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-256,-640]],"10,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-320,-640]],"10,12":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-416,-640]],"11,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-640]],"11,2":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-352,-640]],"11,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-320,-640]],"11,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-640]],"11,11":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-640]],"12,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-256,-640]]}';

mappages["combatSwamp1"].desc = "Combat";
mappages["combatSwamp1"].longdesc = ``;
mappages["combatSwamp1"].music = 'Combat';
mappages["combatSwamp1"].savename = `Combat`;
mappages["combatSwamp1"].exitmap = '';
mappages["combatSwamp1"].exitx = '65';
mappages["combatSwamp1"].exity = '70';
mappages["combatSwamp1"].wraps = 'None';
mappages["combatSwamp1"].enterx = '6';
mappages["combatSwamp1"].entery = '9';
mappages["combatSwamp1"].seeBelow = '';
mappages["combatSwamp1"].lightLevel = 'bright';
mappages["combatSwamp1"].alwaysRemember = '0';
mappages["combatSwamp1"].scale = '1';
mappages["combatSwamp1"].underground = '0';
mappages["combatSwamp1"].undergroundDesc = '';
mappages["combatSwamp1"].enterscript = 'set_exits';
mappages["combatSwamp1"].entertestscript = '';
mappages["combatSwamp1"].exitscript = '';
mappages["combatSwamp1"].exittestscript = 'check_escape';
mappages["combatSwamp1"].returnmap = '';
mappages["combatSwamp1"].returnx = 'NaN';
mappages["combatSwamp1"].returny = 'NaN';
mappages["combatSwamp1"].returninfused = '0';
mappages["combatSwamp1"].automap = '0';
mappages["combatSwamp1"].linkedMaps = [""];
mappages["combatSwamp1"].editorLabels = '{}';
// MAP ENDS HERE

// manually added

mappages["combatSwamp1"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatSwamp1"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}


// MAP BEGINS HERE
mappages["combatSwamp2"] = {};
mappages["combatSwamp2"].terrain = [];
 mappages["combatSwamp2"].terrain[0] = '.. .. ff ff .. .. .. .. .. .. ff ff ..';
 mappages["combatSwamp2"].terrain[1] = '.. ff .. .. .. .. ff ff ff .. .. .. ff';
 mappages["combatSwamp2"].terrain[2] = 'ff .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatSwamp2"].terrain[3] = 'ff .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatSwamp2"].terrain[4] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatSwamp2"].terrain[5] = '.. .. .. .. .. .. .. .. .. .. .. ff ..';
 mappages["combatSwamp2"].terrain[6] = '.. ff ff .. .. .. .. .. .. .. .. ff ..';
 mappages["combatSwamp2"].terrain[7] = '.. ff .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatSwamp2"].terrain[8] = '.. .. .. .. .. .. .. .. .. .. ff .. ..';
 mappages["combatSwamp2"].terrain[9] = '.. .. .. .. .. .. .. .. .. .. .. .. ff';
mappages["combatSwamp2"].terrain[10] = 'ff .. .. .. .. .. .. .. .. .. .. ff ff';
mappages["combatSwamp2"].terrain[11] = 'ff ff ff .. .. .. .. .. .. .. .. .. ..';
mappages["combatSwamp2"].terrain[12] = 'ff .. .. .. ff ff ff ff ff .. .. .. ..';

mappages["combatSwamp2"].features = [];


mappages["combatSwamp2"].npcs = [];

mappages["combatSwamp2"].transover = '{"0,2":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-640]],"0,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-640]],"0,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-640]],"0,12":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-96,-640]],"1,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-448,-640]],"1,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-640]],"1,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-352,-640]],"1,11":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-384,-640]],"2,0":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-640]],"2,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-640]],"2,11":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-640]],"3,0":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-640]],"4,12":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-640]],"5,12":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-640]],"6,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-256,-640]],"6,12":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-640]],"7,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-384,-640]],"7,12":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-640]],"8,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-288,-640]],"8,12":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-640]],"10,0":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-640]],"10,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-448,-640]],"11,0":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-640]],"11,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-320,-640]],"11,6":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-352,-640]],"11,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-256,-640]],"12,1":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-256,-640]],"12,9":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-640]],"12,10":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-640]]}';

mappages["combatSwamp2"].desc = "Combat";
mappages["combatSwamp2"].longdesc = ``;
mappages["combatSwamp2"].music = 'Combat';
mappages["combatSwamp2"].savename = `Combat`;
mappages["combatSwamp2"].exitmap = '';
mappages["combatSwamp2"].exitx = '65';
mappages["combatSwamp2"].exity = '70';
mappages["combatSwamp2"].wraps = 'None';
mappages["combatSwamp2"].enterx = '6';
mappages["combatSwamp2"].entery = '9';
mappages["combatSwamp2"].seeBelow = '';
mappages["combatSwamp2"].lightLevel = 'bright';
mappages["combatSwamp2"].alwaysRemember = '0';
mappages["combatSwamp2"].scale = '1';
mappages["combatSwamp2"].underground = '0';
mappages["combatSwamp2"].undergroundDesc = '';
mappages["combatSwamp2"].enterscript = 'set_exits';
mappages["combatSwamp2"].entertestscript = '';
mappages["combatSwamp2"].exitscript = '';
mappages["combatSwamp2"].exittestscript = 'check_escape';
mappages["combatSwamp2"].returnmap = '';
mappages["combatSwamp2"].returnx = 'NaN';
mappages["combatSwamp2"].returny = 'NaN';
mappages["combatSwamp2"].returninfused = '0';
mappages["combatSwamp2"].automap = '0';
mappages["combatSwamp2"].linkedMaps = [""];
mappages["combatSwamp2"].editorLabels = '{}';
// MAP ENDS HERE

// manually added

mappages["combatSwamp2"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatSwamp2"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

// Coast (PC is on water)

// MAP BEGINS HERE
mappages["combatCoast1"] = {};
mappages["combatCoast1"].terrain = [];
 mappages["combatCoast1"].terrain[0] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatCoast1"].terrain[1] = '.. .. .. .. .. .. .. .. .. .. ,, ,, ..';
 mappages["combatCoast1"].terrain[2] = '.. ,, .. .. .. .. .. .. .. .. .. ,, ..';
 mappages["combatCoast1"].terrain[3] = '.. ,, .. .. .. .. .. .. .. .. .. .. _,';
 mappages["combatCoast1"].terrain[4] = '.. .. .. .. .. .. .. .. .. .. __ ./ uu';
 mappages["combatCoast1"].terrain[5] = '`. __ _, _, __ __ __ __ __ ./ uu uu uu';
 mappages["combatCoast1"].terrain[6] = 'uu uu uu uu uu uu uu uu uu uu uu uu uu';
 mappages["combatCoast1"].terrain[7] = 'uu uu uu uu uu uu uu uu uu uu uu uu w4';
 mappages["combatCoast1"].terrain[8] = 'w0 w6 uu uu uu uu uu uu w4 w0 w0 w0 w11';
 mappages["combatCoast1"].terrain[9] = 'ww w9 w0 w0 w0 w0 w0 w0 w11 ww ww ww ww';
mappages["combatCoast1"].terrain[10] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
mappages["combatCoast1"].terrain[11] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
mappages["combatCoast1"].terrain[12] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';

mappages["combatCoast1"].features = [];


mappages["combatCoast1"].npcs = [];

mappages["combatCoast1"].desc = "Combat";
mappages["combatCoast1"].longdesc = ``;
mappages["combatCoast1"].music = 'Combat';
mappages["combatCoast1"].savename = `Combat`;
mappages["combatCoast1"].exitmap = '';
mappages["combatCoast1"].exitx = '65';
mappages["combatCoast1"].exity = '70';
mappages["combatCoast1"].wraps = 'None';
mappages["combatCoast1"].enterx = '6';
mappages["combatCoast1"].entery = '9';
mappages["combatCoast1"].seeBelow = '';
mappages["combatCoast1"].lightLevel = 'bright';
mappages["combatCoast1"].alwaysRemember = '0';
mappages["combatCoast1"].scale = '1';
mappages["combatCoast1"].underground = '0';
mappages["combatCoast1"].undergroundDesc = '';
mappages["combatCoast1"].enterscript = 'set_exits';
mappages["combatCoast1"].entertestscript = '';
mappages["combatCoast1"].exitscript = '';
mappages["combatCoast1"].exittestscript = 'check_escape';
mappages["combatCoast1"].returnmap = '';
mappages["combatCoast1"].returnx = 'NaN';
mappages["combatCoast1"].returny = 'NaN';
mappages["combatCoast1"].returninfused = '0';
mappages["combatCoast1"].automap = '0';
mappages["combatCoast1"].linkedMaps = [""];
mappages["combatCoast1"].editorLabels = '{}';
// MAP ENDS HERE

// manually added

mappages["combatCoast1"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatCoast1"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}


// MAP BEGINS HERE
mappages["combatCoast2"] = {};
mappages["combatCoast2"].terrain = [];
 mappages["combatCoast2"].terrain[0] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatCoast2"].terrain[1] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatCoast2"].terrain[2] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatCoast2"].terrain[3] = '.. __ __ __ .. .. .. .. .. .. .. .. ..';
 mappages["combatCoast2"].terrain[4] = './ uu uu uu `. .. .. .. .. .. .. .. ..';
 mappages["combatCoast2"].terrain[5] = 'uu uu uu uu uu `. __ __ __ __ __ __ ./';
 mappages["combatCoast2"].terrain[6] = 'uu uu uu uu uu uu uu uu uu uu uu uu uu';
 mappages["combatCoast2"].terrain[7] = 'uu w4 w0 w6 uu uu uu uu uu uu uu uu w4';
 mappages["combatCoast2"].terrain[8] = 'w0 w11 ww w9 w0 w6 uu uu uu uu uu uu w2';
 mappages["combatCoast2"].terrain[9] = 'ww ww ww ww ww w9 w6 uu uu uu w4 w0 w11';
mappages["combatCoast2"].terrain[10] = 'ww ww ww ww ww ww w9 w0 w0 w0 w11 ww ww';
mappages["combatCoast2"].terrain[11] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';
mappages["combatCoast2"].terrain[12] = 'ww ww ww ww ww ww ww ww ww ww ww ww ww';

mappages["combatCoast2"].features = [];
mappages["combatCoast2"].features[0] = {name : 'PileOfRocks', x : 11, y : 4};
mappages["combatCoast2"].features[1] = {name : 'PileOfRocks', x : 6, y : 4};
mappages["combatCoast2"].features[2] = {name : 'PileOfRocks', x : 1, y : 2};


mappages["combatCoast2"].npcs = [];

mappages["combatCoast2"].transover = '{}';

mappages["combatCoast2"].desc = "Combat";
mappages["combatCoast2"].longdesc = ``;
mappages["combatCoast2"].music = 'Combat';
mappages["combatCoast2"].savename = `Combat`;
mappages["combatCoast2"].exitmap = '';
mappages["combatCoast2"].exitx = '65';
mappages["combatCoast2"].exity = '70';
mappages["combatCoast2"].wraps = 'None';
mappages["combatCoast2"].enterx = '6';
mappages["combatCoast2"].entery = '9';
mappages["combatCoast2"].seeBelow = '';
mappages["combatCoast2"].lightLevel = 'bright';
mappages["combatCoast2"].alwaysRemember = '0';
mappages["combatCoast2"].scale = '1';
mappages["combatCoast2"].underground = '0';
mappages["combatCoast2"].undergroundDesc = '';
mappages["combatCoast2"].enterscript = 'set_exits';
mappages["combatCoast2"].entertestscript = '';
mappages["combatCoast2"].exitscript = '';
mappages["combatCoast2"].exittestscript = 'check_escape';
mappages["combatCoast2"].returnmap = '';
mappages["combatCoast2"].returnx = 'NaN';
mappages["combatCoast2"].returny = 'NaN';
mappages["combatCoast2"].returninfused = '0';
mappages["combatCoast2"].automap = '0';
mappages["combatCoast2"].linkedMaps = [""];
mappages["combatCoast2"].editorLabels = '{}';
// MAP ENDS HERE

// manually added

mappages["combatCoast2"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatCoast2"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

mappages["combatBridge1"] = {};
mappages["combatBridge1"].terrain = [];
 mappages["combatBridge1"].terrain[0] = '__ __ .. .. .. .. .. .. .. .. .. __ __';
 mappages["combatBridge1"].terrain[1] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge1"].terrain[2] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge1"].terrain[3] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge1"].terrain[4] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge1"].terrain[5] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge1"].terrain[6] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge1"].terrain[7] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge1"].terrain[8] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge1"].terrain[9] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
mappages["combatBridge1"].terrain[10] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
mappages["combatBridge1"].terrain[11] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
mappages["combatBridge1"].terrain[12] = '-- -- .. .. .. .. .. .. .. .. .. -- --';

mappages["combatBridge1"].features = [];
mappages["combatBridge1"].features[0] = {name : 'WBridgeNS', x : 2, y : 1};
mappages["combatBridge1"].features[1] = {name : 'WBridgeNS', x : 2, y : 2};
mappages["combatBridge1"].features[2] = {name : 'WBridgeNS', x : 2, y : 3};
mappages["combatBridge1"].features[3] = {name : 'WBridgeNS', x : 2, y : 4};
mappages["combatBridge1"].features[4] = {name : 'WBridgeNS', x : 2, y : 5};
mappages["combatBridge1"].features[5] = {name : 'WBridgeNS', x : 2, y : 6};
mappages["combatBridge1"].features[6] = {name : 'WBridgeNS', x : 2, y : 7};
mappages["combatBridge1"].features[7] = {name : 'WBridgeNS', x : 2, y : 8};
mappages["combatBridge1"].features[8] = {name : 'WBridgeNS', x : 2, y : 9};
mappages["combatBridge1"].features[9] = {name : 'WBridgeNS', x : 2, y : 10};
mappages["combatBridge1"].features[10] = {name : 'WBridgeNS', x : 2, y : 11};
mappages["combatBridge1"].features[11] = {name : 'EBridgeNS', x : 10, y : 1};
mappages["combatBridge1"].features[12] = {name : 'EBridgeNS', x : 10, y : 2};
mappages["combatBridge1"].features[13] = {name : 'EBridgeNS', x : 10, y : 3};
mappages["combatBridge1"].features[14] = {name : 'EBridgeNS', x : 10, y : 4};
mappages["combatBridge1"].features[15] = {name : 'EBridgeNS', x : 10, y : 5};
mappages["combatBridge1"].features[16] = {name : 'EBridgeNS', x : 10, y : 6};
mappages["combatBridge1"].features[17] = {name : 'EBridgeNS', x : 10, y : 7};
mappages["combatBridge1"].features[18] = {name : 'EBridgeNS', x : 10, y : 8};
mappages["combatBridge1"].features[19] = {name : 'EBridgeNS', x : 10, y : 9};
mappages["combatBridge1"].features[20] = {name : 'EBridgeNS', x : 10, y : 10};
mappages["combatBridge1"].features[21] = {name : 'EBridgeNS', x : 10, y : 11};


mappages["combatBridge1"].npcs = [];

mappages["combatBridge1"].desc = "Combat";
mappages["combatBridge1"].longdesc = '';
mappages["combatBridge1"].music = 'Combat';
mappages["combatBridge1"].savename = `Combat`;
mappages["combatBridge1"].exitmap = '';
mappages["combatBridge1"].exitx = '65';
mappages["combatBridge1"].exity = '70';
mappages["combatBridge1"].wraps = 'None';
mappages["combatBridge1"].enterx = '6';
mappages["combatBridge1"].entery = '9';
mappages["combatBridge1"].seeBelow = '';
mappages["combatBridge1"].lightLevel = 'bright';
mappages["combatBridge1"].alwaysRemember = '0';
mappages["combatBridge1"].scale = '1';
mappages["combatBridge1"].underground = '0';
mappages["combatBridge1"].undergroundDesc = '';
mappages["combatBridge1"].enterscript = 'set_exits';
mappages["combatBridge1"].entertestscript = '';
mappages["combatBridge1"].exitscript = '';
mappages["combatBridge1"].exittestscript = 'check_escape';
mappages["combatBridge1"].returnmap = '';
mappages["combatBridge1"].returnx = 'NaN';
mappages["combatBridge1"].returny = 'NaN';
mappages["combatBridge1"].returninfused = '0';
mappages["combatBridge1"].automap = '0';
mappages["combatBridge1"].linkedMaps = [""];
mappages["combatBridge1"].editorLabels = '{}';

// manually added

mappages["combatBridge1"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatBridge1"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

 
mappages["combatBridge2"] = {};
mappages["combatBridge2"].terrain = [];
 mappages["combatBridge2"].terrain[0] = '__ __ .. .. .. .. .. .. .. .. .. __ __';
 mappages["combatBridge2"].terrain[1] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge2"].terrain[2] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge2"].terrain[3] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge2"].terrain[4] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge2"].terrain[5] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge2"].terrain[6] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge2"].terrain[7] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge2"].terrain[8] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
 mappages["combatBridge2"].terrain[9] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
mappages["combatBridge2"].terrain[10] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
mappages["combatBridge2"].terrain[11] = 'uu uu uu !! !! !! !! !! !! !! uu uu uu';
mappages["combatBridge2"].terrain[12] = '-- -- .. .. .. .. .. .. .. .. .. -- --';

mappages["combatBridge2"].features = [];
mappages["combatBridge2"].features[0] = {name : 'WBridgeNS', x : 2, y : 1};
mappages["combatBridge2"].features[1] = {name : 'WBridgeNS', x : 2, y : 2};
mappages["combatBridge2"].features[2] = {name : 'WBridgeNS', x : 2, y : 3};
mappages["combatBridge2"].features[3] = {name : 'WBridgeNS', x : 2, y : 4};
mappages["combatBridge2"].features[4] = {name : 'WBridgeNS', x : 2, y : 5};
mappages["combatBridge2"].features[5] = {name : 'WBridgeNS', x : 2, y : 6};
mappages["combatBridge2"].features[6] = {name : 'WBridgeNS', x : 2, y : 7};
mappages["combatBridge2"].features[7] = {name : 'WBridgeNS', x : 2, y : 8};
mappages["combatBridge2"].features[8] = {name : 'WBridgeNS', x : 2, y : 9};
mappages["combatBridge2"].features[9] = {name : 'WBridgeNS', x : 2, y : 10};
mappages["combatBridge2"].features[10] = {name : 'WBridgeNS', x : 2, y : 11};
mappages["combatBridge2"].features[11] = {name : 'EBridgeNS', x : 10, y : 1};
mappages["combatBridge2"].features[12] = {name : 'EBridgeNS', x : 10, y : 2};
mappages["combatBridge2"].features[13] = {name : 'EBridgeNS', x : 10, y : 3};
mappages["combatBridge2"].features[14] = {name : 'EBridgeNS', x : 10, y : 4};
mappages["combatBridge2"].features[15] = {name : 'EBridgeNS', x : 10, y : 5};
mappages["combatBridge2"].features[16] = {name : 'EBridgeNS', x : 10, y : 6};
mappages["combatBridge2"].features[17] = {name : 'EBridgeNS', x : 10, y : 7};
mappages["combatBridge2"].features[18] = {name : 'EBridgeNS', x : 10, y : 8};
mappages["combatBridge2"].features[19] = {name : 'EBridgeNS', x : 10, y : 9};
mappages["combatBridge2"].features[20] = {name : 'EBridgeNS', x : 10, y : 10};
mappages["combatBridge2"].features[21] = {name : 'EBridgeNS', x : 10, y : 11};


mappages["combatBridge2"].npcs = [];

mappages["combatBridge2"].desc = "Combat";
mappages["combatBridge2"].longdesc = '';
mappages["combatBridge2"].music = 'Combat';
mappages["combatBridge2"].savename = `Combat`;
mappages["combatBridge2"].exitmap = '';
mappages["combatBridge2"].exitx = '65';
mappages["combatBridge2"].exity = '70';
mappages["combatBridge2"].wraps = 'None';
mappages["combatBridge2"].enterx = '6';
mappages["combatBridge2"].entery = '9';
mappages["combatBridge2"].seeBelow = '';
mappages["combatBridge2"].lightLevel = 'bright';
mappages["combatBridge2"].alwaysRemember = '0';
mappages["combatBridge2"].scale = '1';
mappages["combatBridge2"].underground = '0';
mappages["combatBridge2"].undergroundDesc = '';
mappages["combatBridge2"].enterscript = 'set_exits';
mappages["combatBridge2"].entertestscript = '';
mappages["combatBridge2"].exitscript = '';
mappages["combatBridge2"].exittestscript = 'check_escape';
mappages["combatBridge2"].returnmap = '';
mappages["combatBridge2"].returnx = 'NaN';
mappages["combatBridge2"].returny = 'NaN';
mappages["combatBridge2"].returninfused = '0';
mappages["combatBridge2"].automap = '0';
mappages["combatBridge2"].linkedMaps = [""];
mappages["combatBridge2"].editorLabels = '{}';

// manually added

mappages["combatBridge2"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["combatBridge2"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

// for all combat maps

function maps_set_exits(mapref) {
  mapref.Enter = function(ewho,efrommap,efromx,efromy,etox,etoy) {
    if (efrommap && (ewho === PC)) {
      this.setExitToMap(efrommap.getName());
      this.setExitToX(efromx);
      this.setExitToY(efromy);    
      this.edited = 1;
      
      this.setReturn(efrommap.getName(), 69,74);
      if (efrommap.getName() !== "ellusus") {
        this.setReturnInfused(1);
      }
    }
  }
}

function maps_check_escape(mapref) {
  mapref.ExitTest = function(who,tomap,fromx,fromy,tox,toy) {
    // check for player death
    if (who.getHP() <= 0) { return 1; }
    
    let enemytype = "hostile";
    let numenemies = 0;
    if (who.getAttitude() === "hostile") { enemytype = "friendly"; numenemies = 1; }  // The PC!
    let npcs = this.npcs.getAll();
    for (let i=0;i<npcs.length;i++) {
      // counting number of non-coward enemies on the combat map to determine chance to successfully flee
      if ((npcs[i].getAttitude() === enemytype) && !npcs[i].specials.coward) { numenemies++; }
    }
    let chance = 100;
    if (numenemies) {
      chance = 100 - (20 + 7*numenemies);
      if (chance < 10) { chance = 10; }
    }
    if (gamestate.getMode() === "spellbook") { chance = 100; }  // if you're here because you're casting Return, they can't stop you
    if (Dice.roll("1d100") > chance) {
      if (who === PC) {
        maintext.delayedAddText("You failed to escape!");
      }
      return 0;
    } else {
      if (who === PC) {
        if (numenemies) {
          maintext.delayedAddText("Escaped!");
        }
      } else {
        maintext.addText("The " + who.getDesc() + " fled!");
      }
    }
    
    if ((who === PC) && numenemies) {
      // possibly check for bribery if I decide to go that route
      if ((PC.getHP() > (PC.getMaxHP() * (1/5))) && (PC.getLevel() !== 1)) {
        DebugWrite("combat","PC has more than 1/5 its hp, gains coward point for fleeing.<br />");
        addToKarmaLog("Cowardice!",1,`Fled from ${numenemies} enemies.`);
        DU.gameflags.setFlag("coward",DU.gameflags.getFlag("coward")+1);
        maintext.addText("<span style='color:red'>Cowardice!</span>");
      } else {
        DebugWrite("combat","PC has less than 1/5 its hp or is level 1, able to flee freely.<br />");
      }
      
    }
    
    return 1;  
  }
}

// MAP BEGINS HERE
mappages["oliviaCart"] = {};
mappages["oliviaCart"].terrain = [];
 mappages["oliviaCart"].terrain[0] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["oliviaCart"].terrain[1] = '.. .. .. .. .. u, .. .. .. .. .. u, ..';
 mappages["oliviaCart"].terrain[2] = '.. .. .. .. .. .. .. u, .. .. .. .. ..';
 mappages["oliviaCart"].terrain[3] = '., .. ., ., ., ., ., ., ., ., ., .. .,';
 mappages["oliviaCart"].terrain[4] = '., ., ., ., -= -= -= -= ., ., ., ., .,';
 mappages["oliviaCart"].terrain[5] = '., ., ., ., -= -= -= -= ., ., ., ., .,';
 mappages["oliviaCart"].terrain[6] = '., ., ., ., -= -= -= -= ., ., ., ., .,';
 mappages["oliviaCart"].terrain[7] = '., ., ., ., -= -= -= -= ., ., ., ., .,';
 mappages["oliviaCart"].terrain[8] = '., ., ., ., .. ., ., ., ., ., ., ., .,';
 mappages["oliviaCart"].terrain[9] = '.. .. .. .. .. .. .. u, .. .. .. .. ..';
mappages["oliviaCart"].terrain[10] = '.. u, .. .. .. .. .. .. .. .. .. u, ..';
mappages["oliviaCart"].terrain[11] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["oliviaCart"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';

mappages["oliviaCart"].features = [];
mappages["oliviaCart"].features[0] = {name : 'Tree', x : 9, y : 2};
mappages["oliviaCart"].features[1] = {name : 'Tree', x : 2, y : 1};
mappages["oliviaCart"].features[2] = {name : 'Tree', x : 4, y : 11};
mappages["oliviaCart"].features[3] = {name : 'LeftChair', x : 6, y : 5};
mappages["oliviaCart"].features[4] = {name : 'LeftChair', x : 6, y : 6};
mappages["oliviaCart"].features[5] = {name : 'FenceEW', x : 5, y : 4};
mappages["oliviaCart"].features[6] = {name : 'FenceEW', x : 5, y : 7};
mappages["oliviaCart"].features[7] = {name : 'FenceSE', x : 6, y : 7};
mappages["oliviaCart"].features[8] = {name : 'FenceNW', x : 4, y : 4};
mappages["oliviaCart"].features[9] = {name : 'FenceNE', x : 6, y : 4};
mappages["oliviaCart"].features[10] = {name : 'FenceNS', x : 4, y : 5};
mappages["oliviaCart"].features[11] = {name : 'FenceNS', x : 4, y : 6};
mappages["oliviaCart"].features[12] = {name : 'FenceSW', x : 4, y : 7};


mappages["oliviaCart"].npcs = [];
mappages["oliviaCart"].npcs[0] = {name : 'BardVillagerNPC', x : 6, y : 5, NPCName: 'Olivia', Conversation: 'olivia_cart', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"Bard2","head":"BardPale2","back":"","offhand":"","cloak":"","mainhand":"","realhead":"ShortBlackPale"}'};
mappages["oliviaCart"].npcs[1] = {name : 'HorseNPC', x : 8, y : 4, Gender: 'monster', NPCBand: '0', OverrideGraphic: 'horse.gif', skintone: 1};
mappages["oliviaCart"].npcs[2] = {name : 'HorseNPC', x : 8, y : 7, Gender: 'monster', NPCBand: '0', OverrideGraphic: 'horse.gif', skintone: 1};

mappages["oliviaCart"].transover = '{"0,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"0,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"1,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"1,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"2,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"2,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"3,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"3,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-576]],"5,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-576]],"8,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"8,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"9,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"9,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"10,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"10,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"11,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"11,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"12,3":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"12,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]]}';

mappages["oliviaCart"].desc = "Olivia's Cart";
mappages["oliviaCart"].longdesc = ``;
mappages["oliviaCart"].music = 'Village';
mappages["oliviaCart"].savename = `Olivia's Cart`;
mappages["oliviaCart"].exitmap = 'ellusus';
mappages["oliviaCart"].exitx = '65';
mappages["oliviaCart"].exity = '70';
mappages["oliviaCart"].wraps = 'None';
mappages["oliviaCart"].enterx = '6';
mappages["oliviaCart"].entery = '11';
mappages["oliviaCart"].seeBelow = '';
mappages["oliviaCart"].lightLevel = 'bright';
mappages["oliviaCart"].alwaysRemember = '0';
mappages["oliviaCart"].scale = '1';
mappages["oliviaCart"].underground = '0';
mappages["oliviaCart"].undergroundDesc = '';
mappages["oliviaCart"].enterscript = 'set_exits';
mappages["oliviaCart"].entertestscript = '';
mappages["oliviaCart"].exitscript = '';
mappages["oliviaCart"].exittestscript = 'check_escape';
mappages["oliviaCart"].returnmap = 'ellusus';
mappages["oliviaCart"].returnx = '69';
mappages["oliviaCart"].returny = '74';
mappages["oliviaCart"].returninfused = '0';
mappages["oliviaCart"].automap = '0';
mappages["oliviaCart"].linkedMaps = [""];
mappages["oliviaCart"].editorLabels = '{}';
// MAP ENDS HERE

mappages["oliviaCart"].onload = function(mapref) {
  let olivia = mapref.getTile(6,5).getTopNPC();
  olivia.onDeath = "oliviaDead";
  mapref.getTile(6,5).executeWalkons(olivia);
}

mappages["oliviaCart"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["oliviaCart"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

// MAP BEGINS HERE
mappages["guardPatrolOH"] = {};
mappages["guardPatrolOH"].terrain = [];
 mappages["guardPatrolOH"].terrain[0] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolOH"].terrain[1] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolOH"].terrain[2] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolOH"].terrain[3] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolOH"].terrain[4] = '.. ., ., ., ., .. .. .. .. ., ., .. ..';
 mappages["guardPatrolOH"].terrain[5] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolOH"].terrain[6] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolOH"].terrain[7] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolOH"].terrain[8] = '., ., ., .. .. .. .. ., ., ., ., ., ..';
 mappages["guardPatrolOH"].terrain[9] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolOH"].terrain[10] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolOH"].terrain[11] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolOH"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';

mappages["guardPatrolOH"].features = [];


mappages["guardPatrolOH"].npcs = [];
mappages["guardPatrolOH"].npcs[0] = {name : 'TownGuardNPC', x : 3, y : 4, NPCName: 'Torin', Desc: 'soldier', Conversation: 'torin', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"ShortBrownPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};
mappages["guardPatrolOH"].npcs[1] = {name : 'TownGuardNPC', x : 6, y : 3, NPCName: 'Alan', Desc: 'soldier', Conversation: 'alan', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"OldManPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};
mappages["guardPatrolOH"].npcs[2] = {name : 'TownGuardNPC', x : 9, y : 5, NPCName: 'Jerome', Desc: 'soldier', Conversation: 'jerome', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"ShortBlackPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};
mappages["guardPatrolOH"].npcs[3] = {name : 'TownGuardNPC', x : 8, y : 8, NPCName: 'Alanis', Desc: 'soldier', Conversation: 'alanis', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"ShortBlackDark","back":null,"offhand":"OffhandDark","cloak":null,"mainhand":"HalberdDark"}'};
mappages["guardPatrolOH"].npcs[4] = {name : 'TownGuardNPC', x : 4, y : 7, NPCName: 'Dara', Desc: 'soldier', Conversation: 'dara', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"ShortBlackPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};

mappages["guardPatrolOH"].transover = '{"0,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"0,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"1,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"1,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"2,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"2,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-576]],"3,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"3,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"4,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"4,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"5,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"5,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"6,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"6,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"7,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"7,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-576]],"8,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"8,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"9,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"9,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"10,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"10,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"11,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"11,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-576]],"12,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"12,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]]}';

mappages["guardPatrolOH"].desc = "Combat";
mappages["guardPatrolOH"].longdesc = ``;
mappages["guardPatrolOH"].music = 'Dark Unknown';
mappages["guardPatrolOH"].savename = `Combat`;
mappages["guardPatrolOH"].exitmap = '';
mappages["guardPatrolOH"].exitx = '65';
mappages["guardPatrolOH"].exity = '70';
mappages["guardPatrolOH"].wraps = 'None';
mappages["guardPatrolOH"].enterx = '5';
mappages["guardPatrolOH"].entery = '11';
mappages["guardPatrolOH"].seeBelow = '';
mappages["guardPatrolOH"].lightLevel = 'bright';
mappages["guardPatrolOH"].alwaysRemember = '0';
mappages["guardPatrolOH"].scale = '1';
mappages["guardPatrolOH"].underground = '0';
mappages["guardPatrolOH"].undergroundDesc = '';
mappages["guardPatrolOH"].enterscript = 'set_exits';
mappages["guardPatrolOH"].entertestscript = '';
mappages["guardPatrolOH"].exitscript = '';
mappages["guardPatrolOH"].exittestscript = 'check_escape';
mappages["guardPatrolOH"].returnmap = 'ellusus';
mappages["guardPatrolOH"].returnx = '69';
mappages["guardPatrolOH"].returny = '74';
mappages["guardPatrolOH"].returninfused = '0';
mappages["guardPatrolOH"].automap = '0';
mappages["guardPatrolOH"].linkedMaps = [""];
mappages["guardPatrolOH"].editorLabels = '{}';
// MAP ENDS HERE

mappages["guardPatrolOH"].onload = function(mapref) {
  let npcs = mapref.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    npcs[i].onDeath = "patrolDead";
  }
}

mappages["guardPatrolOH"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["guardPatrolOH"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}


// MAP BEGINS HERE
mappages["guardPatrolNP"] = {};
mappages["guardPatrolNP"].terrain = [];
 mappages["guardPatrolNP"].terrain[0] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolNP"].terrain[1] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolNP"].terrain[2] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolNP"].terrain[3] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolNP"].terrain[4] = '.. ., ., ., ., .. .. .. .. ., ., .. ..';
 mappages["guardPatrolNP"].terrain[5] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolNP"].terrain[6] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolNP"].terrain[7] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolNP"].terrain[8] = '., ., ., .. .. .. .. ., ., ., ., ., ..';
 mappages["guardPatrolNP"].terrain[9] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolNP"].terrain[10] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolNP"].terrain[11] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolNP"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';

mappages["guardPatrolNP"].features = [];


mappages["guardPatrolNP"].npcs = [];
mappages["guardPatrolNP"].npcs[0] = {name : 'TownGuardNPC', x : 3, y : 4, NPCName: 'Curtr', Desc: 'soldier', Conversation: 'curtr', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"OldManPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};
mappages["guardPatrolNP"].npcs[1] = {name : 'TownGuardNPC', x : 6, y : 3, NPCName: 'Beauregard', Desc: 'soldier', Conversation: 'beauregard', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"OldManPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};
mappages["guardPatrolNP"].npcs[2] = {name : 'TownGuardNPC', x : 9, y : 5, NPCName: 'Geoff', Desc: 'soldier', Conversation: 'geoff', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"ShortBlackDark","back":null,"offhand":"OffhandDark","cloak":null,"mainhand":"HalberdDark"}'};
mappages["guardPatrolNP"].npcs[3] = {name : 'TownGuardNPC', x : 8, y : 8, NPCName: 'Tanya', Desc: 'soldier', Conversation: 'tanya', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"BrownDark","back":null,"offhand":"OffhandDark","cloak":null,"mainhand":"HalberdDark"}'};
mappages["guardPatrolNP"].npcs[4] = {name : 'TownGuardNPC', x : 4, y : 7, NPCName: 'Celeste', Desc: 'soldier', Conversation: 'celeste', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"BrownDark","back":null,"offhand":"OffhandDark","cloak":null,"mainhand":"HalberdDark"}'};

mappages["guardPatrolNP"].transover = '{"0,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"0,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"1,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"1,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"2,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"2,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-576]],"3,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"3,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"4,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"4,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"5,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"5,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"6,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"6,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"7,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"7,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-576]],"8,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"8,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"9,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"9,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"10,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"10,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"11,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"11,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-576]],"12,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"12,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]]}';

mappages["guardPatrolNP"].desc = "Combat";
mappages["guardPatrolNP"].longdesc = ``;
mappages["guardPatrolNP"].music = 'Dark Unknown';
mappages["guardPatrolNP"].savename = `Combat`;
mappages["guardPatrolNP"].exitmap = '';
mappages["guardPatrolNP"].exitx = '65';
mappages["guardPatrolNP"].exity = '70';
mappages["guardPatrolNP"].wraps = 'None';
mappages["guardPatrolNP"].enterx = '5';
mappages["guardPatrolNP"].entery = '11';
mappages["guardPatrolNP"].seeBelow = '';
mappages["guardPatrolNP"].lightLevel = 'bright';
mappages["guardPatrolNP"].alwaysRemember = '0';
mappages["guardPatrolNP"].scale = '1';
mappages["guardPatrolNP"].underground = '0';
mappages["guardPatrolNP"].undergroundDesc = '';
mappages["guardPatrolNP"].enterscript = 'set_exits';
mappages["guardPatrolNP"].entertestscript = '';
mappages["guardPatrolNP"].exitscript = '';
mappages["guardPatrolNP"].exittestscript = 'check_escape';
mappages["guardPatrolNP"].returnmap = 'ellusus';
mappages["guardPatrolNP"].returnx = '69';
mappages["guardPatrolNP"].returny = '74';
mappages["guardPatrolNP"].returninfused = '0';
mappages["guardPatrolNP"].automap = '0';
mappages["guardPatrolNP"].linkedMaps = [""];
mappages["guardPatrolNP"].editorLabels = '{}';
// MAP ENDS HERE

mappages["guardPatrolNP"].onload = function(mapref) {
  let npcs = mapref.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    npcs[i].onDeath = "patrolDead";
  }
}

mappages["guardPatrolNP"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["guardPatrolNP"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

// MAP BEGINS HERE
mappages["guardPatrolCL"] = {};
mappages["guardPatrolCL"].terrain = [];
 mappages["guardPatrolCL"].terrain[0] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolCL"].terrain[1] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolCL"].terrain[2] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolCL"].terrain[3] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolCL"].terrain[4] = '.. ., ., ., ., .. .. .. .. ., ., .. ..';
 mappages["guardPatrolCL"].terrain[5] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolCL"].terrain[6] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolCL"].terrain[7] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolCL"].terrain[8] = '., ., ., .. .. .. .. ., ., ., ., ., ..';
 mappages["guardPatrolCL"].terrain[9] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolCL"].terrain[10] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolCL"].terrain[11] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolCL"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';

mappages["guardPatrolCL"].features = [];


mappages["guardPatrolCL"].npcs = [];
mappages["guardPatrolCL"].npcs[0] = {name : 'TownGuardNPC', x : 3, y : 4, NPCName: 'Er Thom', Desc: 'soldier', Conversation: 'erthom', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"BlondePale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};
mappages["guardPatrolCL"].npcs[1] = {name : 'TownGuardNPC', x : 6, y : 3, NPCName: 'Richard', Desc: 'soldier', Conversation: 'richard', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"ShortBlackDark","back":null,"offhand":"OffhandDark","cloak":null,"mainhand":"HalberdDark"}'};
mappages["guardPatrolCL"].npcs[2] = {name : 'TownGuardNPC', x : 9, y : 5, NPCName: 'Homer', Desc: 'soldier', Conversation: 'homer', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"ShortBrownPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};
mappages["guardPatrolCL"].npcs[3] = {name : 'TownGuardNPC', x : 8, y : 8, NPCName: 'Sally', Desc: 'soldier', Conversation: 'sally', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"OldManPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};
mappages["guardPatrolCL"].npcs[4] = {name : 'TownGuardNPC', x : 4, y : 7, NPCName: 'Patty', Desc: 'soldier', Conversation: 'patty', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"ShortBrownPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};

mappages["guardPatrolCL"].transover = '{"0,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"0,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"1,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"1,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"2,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"2,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-576]],"3,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"3,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"4,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"4,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"5,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"5,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"6,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"6,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"7,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"7,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-576]],"8,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"8,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"9,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"9,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"10,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"10,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"11,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"11,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-576]],"12,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"12,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]]}';

mappages["guardPatrolCL"].desc = "Combat";
mappages["guardPatrolCL"].longdesc = ``;
mappages["guardPatrolCL"].music = 'Dark Unknown';
mappages["guardPatrolCL"].savename = `Combat`;
mappages["guardPatrolCL"].exitmap = '';
mappages["guardPatrolCL"].exitx = '65';
mappages["guardPatrolCL"].exity = '70';
mappages["guardPatrolCL"].wraps = 'None';
mappages["guardPatrolCL"].enterx = '5';
mappages["guardPatrolCL"].entery = '11';
mappages["guardPatrolCL"].seeBelow = '';
mappages["guardPatrolCL"].lightLevel = 'bright';
mappages["guardPatrolCL"].alwaysRemember = '0';
mappages["guardPatrolCL"].scale = '1';
mappages["guardPatrolCL"].underground = '0';
mappages["guardPatrolCL"].undergroundDesc = '';
mappages["guardPatrolCL"].enterscript = 'set_exits';
mappages["guardPatrolCL"].entertestscript = '';
mappages["guardPatrolCL"].exitscript = '';
mappages["guardPatrolCL"].exittestscript = 'check_escape';
mappages["guardPatrolCL"].returnmap = 'ellusus';
mappages["guardPatrolCL"].returnx = '69';
mappages["guardPatrolCL"].returny = '74';
mappages["guardPatrolCL"].returninfused = '0';
mappages["guardPatrolCL"].automap = '0';
mappages["guardPatrolCL"].linkedMaps = [""];
mappages["guardPatrolCL"].editorLabels = '{}';
// MAP ENDS HERE

mappages["guardPatrolCL"].onload = function(mapref) {
  let npcs = mapref.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    npcs[i].onDeath = "patrolDead";
  }
}

mappages["guardPatrolCL"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["guardPatrolCL"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

// MAP BEGINS HERE
mappages["guardPatrolB"] = {};
mappages["guardPatrolB"].terrain = [];
 mappages["guardPatrolB"].terrain[0] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolB"].terrain[1] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolB"].terrain[2] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolB"].terrain[3] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolB"].terrain[4] = '.. ., ., ., ., .. .. .. .. ., ., .. ..';
 mappages["guardPatrolB"].terrain[5] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolB"].terrain[6] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolB"].terrain[7] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolB"].terrain[8] = '., ., ., .. .. .. .. ., ., ., ., ., ..';
 mappages["guardPatrolB"].terrain[9] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolB"].terrain[10] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolB"].terrain[11] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolB"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';

mappages["guardPatrolB"].features = [];


mappages["guardPatrolB"].npcs = [];
mappages["guardPatrolB"].npcs[0] = {name : 'TownGuardNPC', x : 3, y : 4, NPCName: 'Marcy', Desc: 'soldier', Conversation: 'marcy', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"BlondePale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};
mappages["guardPatrolB"].npcs[1] = {name : 'TownGuardNPC', x : 6, y : 3, NPCName: 'Chuck', Desc: 'soldier', Conversation: 'chuck', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"ShortBlackPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};
mappages["guardPatrolB"].npcs[2] = {name : 'TownGuardNPC', x : 9, y : 5, NPCName: 'Ford', Desc: 'soldier', Conversation: 'ford', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"BrownDark","back":null,"offhand":"OffhandDark","cloak":null,"mainhand":"HalberdDark"}'};
mappages["guardPatrolB"].npcs[3] = {name : 'TownGuardNPC', x : 8, y : 8, NPCName: 'Andromeda', Desc: 'soldier', Conversation: 'andromeda', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"BrownDark","back":null,"offhand":"OffhandDark","cloak":null,"mainhand":"HalberdDark"}'};
mappages["guardPatrolB"].npcs[4] = {name : 'TownGuardNPC', x : 4, y : 7, NPCName: 'Beverly', Desc: 'soldier', Conversation: 'beverly', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"ShortBrownPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};

mappages["guardPatrolB"].transover = '{"0,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"0,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"1,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"1,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"2,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"2,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-576]],"3,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"3,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"4,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"4,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"5,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"5,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"6,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"6,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"7,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"7,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-576]],"8,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"8,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"9,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"9,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"10,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"10,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"11,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"11,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-576]],"12,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"12,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]]}';

mappages["guardPatrolB"].desc = "Combat";
mappages["guardPatrolB"].longdesc = ``;
mappages["guardPatrolB"].music = 'Dark Unknown';
mappages["guardPatrolB"].savename = `Combat`;
mappages["guardPatrolB"].exitmap = '';
mappages["guardPatrolB"].exitx = '65';
mappages["guardPatrolB"].exity = '70';
mappages["guardPatrolB"].wraps = 'None';
mappages["guardPatrolB"].enterx = '5';
mappages["guardPatrolB"].entery = '11';
mappages["guardPatrolB"].seeBelow = '';
mappages["guardPatrolB"].lightLevel = 'bright';
mappages["guardPatrolB"].alwaysRemember = '0';
mappages["guardPatrolB"].scale = '1';
mappages["guardPatrolB"].underground = '0';
mappages["guardPatrolB"].undergroundDesc = '';
mappages["guardPatrolB"].enterscript = 'set_exits';
mappages["guardPatrolB"].entertestscript = '';
mappages["guardPatrolB"].exitscript = '';
mappages["guardPatrolB"].exittestscript = 'check_escape';
mappages["guardPatrolB"].returnmap = 'ellusus';
mappages["guardPatrolB"].returnx = '69';
mappages["guardPatrolB"].returny = '74';
mappages["guardPatrolB"].returninfused = '0';
mappages["guardPatrolB"].automap = '0';
mappages["guardPatrolB"].linkedMaps = [""];
mappages["guardPatrolB"].editorLabels = '{}';
// MAP ENDS HERE

mappages["guardPatrolB"].onload = function(mapref) {
  let npcs = mapref.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    npcs[i].onDeath = "patrolDead";
  }
}

mappages["guardPatrolB"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["guardPatrolB"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}

// MAP BEGINS HERE
mappages["guardPatrolS"] = {};
mappages["guardPatrolS"].terrain = [];
 mappages["guardPatrolS"].terrain[0] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolS"].terrain[1] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolS"].terrain[2] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolS"].terrain[3] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["guardPatrolS"].terrain[4] = '.. ., ., ., ., .. .. .. .. ., ., .. ..';
 mappages["guardPatrolS"].terrain[5] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolS"].terrain[6] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolS"].terrain[7] = '., ., ., ., ., ., ., ., ., ., ., ., .,';
 mappages["guardPatrolS"].terrain[8] = '., ., ., .. .. .. .. ., ., ., ., ., ..';
 mappages["guardPatrolS"].terrain[9] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolS"].terrain[10] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolS"].terrain[11] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["guardPatrolS"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. .. .. ..';

mappages["guardPatrolS"].features = [];


mappages["guardPatrolS"].npcs = [];
mappages["guardPatrolS"].npcs[0] = {name : 'TownGuardNPC', x : 3, y : 4, NPCName: 'Melody', Desc: 'soldier', Conversation: 'melody', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"BrownDark","back":null,"offhand":"OffhandDark","cloak":null,"mainhand":"HalberdDark"}'};
mappages["guardPatrolS"].npcs[1] = {name : 'TownGuardNPC', x : 6, y : 3, NPCName: 'Steven', Desc: 'soldier', Conversation: 'steven', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"ShortBlackPale","back":null,"offhand":"OffhandPale","cloak":null,"mainhand":"HalberdPale"}'};
mappages["guardPatrolS"].npcs[2] = {name : 'TownGuardNPC', x : 9, y : 5, NPCName: 'Bart', Desc: 'soldier', Conversation: 'bart', Gender: 'male', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"BrownDark","back":null,"offhand":"OffhandDark","cloak":null,"mainhand":"HalberdDark"}'};
mappages["guardPatrolS"].npcs[3] = {name : 'TownGuardNPC', x : 8, y : 8, NPCName: 'Sigrun', Desc: 'soldier', Conversation: 'sigrun', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"BaldBeardedDark","back":null,"offhand":"OffhandDark","cloak":null,"mainhand":"HalberdDark"}'};
mappages["guardPatrolS"].npcs[4] = {name : 'TownGuardNPC', x : 4, y : 7, NPCName: 'Seraphina', Desc: 'soldier', Conversation: 'seraphina', Gender: 'female', NPCBand: '0', skintone: 1, wornlayers: '{"body":"PlateCheckeredTabard","head":"BrownDark","back":null,"offhand":"OffhandDark","cloak":null,"mainhand":"HalberdDark"}'};

mappages["guardPatrolS"].transover = '{"0,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"0,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"1,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"1,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"2,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"2,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-576]],"3,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"3,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"4,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"4,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"5,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"5,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"6,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"6,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"7,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"7,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-192,-576]],"8,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"8,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"9,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-128,-576]],"9,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"10,4":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-160,-576]],"10,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]],"11,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"11,8":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-224,-576]],"12,5":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",0,-576]],"12,7":[["","",null,null],["static.gif","spacer.gif",-192,0],["TerrainBlend.gif","spacer.gif",-32,-576]]}';

mappages["guardPatrolS"].desc = "Combat";
mappages["guardPatrolS"].longdesc = ``;
mappages["guardPatrolS"].music = 'Dark Unknown';
mappages["guardPatrolS"].savename = `Combat`;
mappages["guardPatrolS"].exitmap = '';
mappages["guardPatrolS"].exitx = '65';
mappages["guardPatrolS"].exity = '70';
mappages["guardPatrolS"].wraps = 'None';
mappages["guardPatrolS"].enterx = '5';
mappages["guardPatrolS"].entery = '11';
mappages["guardPatrolS"].seeBelow = '';
mappages["guardPatrolS"].lightLevel = 'bright';
mappages["guardPatrolS"].alwaysRemember = '0';
mappages["guardPatrolS"].scale = '1';
mappages["guardPatrolS"].underground = '0';
mappages["guardPatrolS"].undergroundDesc = '';
mappages["guardPatrolS"].enterscript = 'set_exits';
mappages["guardPatrolS"].entertestscript = '';
mappages["guardPatrolS"].exitscript = '';
mappages["guardPatrolS"].exittestscript = 'check_escape';
mappages["guardPatrolS"].returnmap = 'ellusus';
mappages["guardPatrolS"].returnx = '69';
mappages["guardPatrolS"].returny = '74';
mappages["guardPatrolS"].returninfused = '0';
mappages["guardPatrolS"].automap = '0';
mappages["guardPatrolS"].linkedMaps = [""];
mappages["guardPatrolS"].editorLabels = '{}';
// MAP ENDS HERE

mappages["guardPatrolS"].onload = function(mapref) {
  let npcs = mapref.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    npcs[i].onDeath = "patrolDead";
  }
}

mappages["guardPatrolS"].set_exits = function(mapref) {
  maps_set_exits(mapref);
}

mappages["guardPatrolS"].check_escape = function(mapref) {
  maps_check_escape(mapref);
}
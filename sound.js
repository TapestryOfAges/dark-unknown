"use strict";

var soundpath = "sfx/";

var DUSound = {};
DUSound["sfx_walk_right"] = "sfx/sfx1.ogg";
DUSound["sfx_walk_left"] = "sfx/sfx1.ogg";
DUSound["sfx_walk_water_right"] = "sfx/sfx1_1.ogg";
DUSound["sfx_walk_water_left"] = "sfx/sfx1_1.ogg";
DUSound["sfx_walk_blocked"] = "sfx/sfx6.ogg";
DUSound["sfx_open_door"] = "sfx/sfx3.ogg";
DUSound["sfx_close_door"] = "sfx/sfx4.ogg";
DUSound["sfx_locked_door"] = "sfx/sfx5.ogg";
DUSound["sfx_spell_light"] = "sfx/sfx2.ogg";
DUSound["sfx_unlock"] = "sfx/sfx7.ogg";
DUSound["sfx_potion"] = "sfx/sfx8.ogg";
DUSound["sfx_melee_miss"] = "sfx/sfx9.ogg";
DUSound["sfx_melee_hit"] = "sfx/sfx10.ogg";
DUSound["sfx_missile_miss"] = "sfx/sfx11.ogg";
DUSound["sfx_missile_hit"] = "sfx/sfx12.ogg";
DUSound["sfx_stone_drag"] = "sfx/sfx13.ogg";

// new sounds
DUSound["sfx_walk_grass_left"] = "sfx/sfx_walk_grass";   // Sanctamonia footstep_vegetation1_2
DUSound["sfx_walk_grass_right"] = "sfx/sfx_walk_grass";
DUSound["sfx_walk_ug_grass_left"] = "sfx/sfx_ug_walk_grass";   // Dungeon SFX Pack / Step 3 (sand)
DUSound["sfx_walk_ug_grass_right"] = "sfx/sfx_ug_walk_grass";
DUSound["sfx_walk_hill_left"] = "sfx/sfx_walk_hill";   // Medieval Fantasy SFX Pack / Steps / Step 2
DUSound["sfx_walk_hill_right"] = "sfx/sfx_walk_hill";
DUSound["sfx_walk_ug_hill_left"] = "sfx/sfx_ug_walk_grass";   // Dungeon SFX Pack / Misc / Step 3 (sand)
DUSound["sfx_walk_ug_hill_right"] = "sfx/sfx_ug_walk_grass";
DUSound["sfx_walk_water_left"] = "sfx/sfx_walk_water";   // Medieval Fantasy SFX Pack / Steps / Step (water) 1
DUSound["sfx_walk_water_right"] = "sfx/sfx_walk_water";
DUSound["sfx_walk_ug_water_left"] = "sfx/sfx_ug_walk_water";   // Dungeon SFX Pack / Misc / Step 5 (water)
DUSound["sfx_walk_ug_water_right"] = "sfx/sfx_ug_walk_water";
DUSound["sfx_walk_forest_left"] = "sfx/sfx_walk_forest";   // Medieval Fantasy 2 SFX Pack / Steps / StepsLeaves1
DUSound["sfx_walk_forest_right"] = "sfx/sfx_walk_forest";
DUSound["sfx_walk_ug_forest_left"] = "sfx/sfx_ug_walk_grass";   // Dungeon SFX Pack / Misc / Step 3 (sand)
DUSound["sfx_walk_ug_forest_right"] = "sfx/sfx_ug_walk_grass";
DUSound["sfx_walk_stone_left"] = "sfx/sfx_walk_stone";   // Medieval Fantasy Pack / Steps / Step (stone) 2
DUSound["sfx_walk_stone_right"] = "sfx/sfx_walk_stone";
DUSound["sfx_walk_ug_stone_left"] = "sfx/sfx_ug_walk_stone";   // Medieval Fantasy Pack / Steps / Step (stone) 2
DUSound["sfx_walk_ug_stone_right"] = "sfx/sfx_ug_walk_stone";
DUSound["sfx_walk_swamp_left"] = "sfx/sfx_walk_swamp";   // Medieval Fantasy 2 SFX Pack / Steps / StepWet1
DUSound["sfx_walk_swamp_right"] = "sfx/sfx_walk_swamp";
DUSound["sfx_walk_ug_swamp_left"] = "sfx/sfx_ug_walk_swamp";   // Dungeon SFX Pack / Misc / Step 14 (flood)
DUSound["sfx_walk_ug_swamp_right"] = "sfx/sfx_ug_walk_swamp";


var musicpath = "music/";
var DUMusic = {};
DUMusic["Theme"] = "Hero Victorious";
DUMusic["Dark Unknown"] = "The Dark Unknown";
DUMusic["Towne"] = "Towne";
DUMusic["Dark Towne"] = "Dark Towne";
DUMusic["Dungeon"] = "Dungeon";  
DUMusic["Dark Dungeon"] = "Dark Dungeon";  
DUMusic["Mainland"] = "Plains of Tethlokel"; 
DUMusic["Island"] = "Distant Shores";
DUMusic["Magic"] = "Magic and Mystery";
DUMusic["Cave"] = "Paths Unmapped";
DUMusic["Underworld"] = "In the Underworld";  
DUMusic["Combat"] = "On the Battlefield";
DUMusic["Olympus"] = "Olympus";
DUMusic["Tension"] = "Tension";
DUMusic["Charcreate"] = "The Journey Begins";
DUMusic["Fanfare"] = "Triumph"; 
DUMusic["Ruins"] = "Among the Ruins";
DUMusic["Ether"] = "The Beyond";
DUMusic["Lullaby"] = "Lullaby";
DUMusic["Lament"] = "Shelaria's Lament";

var musicloaded = {};
var musicsloaded = 0;

function audio_init() {
  createjs.Sound.initializeDefaultPlugins();
  createjs.Sound.alternateExtensions = ["ogg"];
  createjs.Sound.addEventListener("fileload", handleFileLoad);
//  createjs.Sound.registerSounds(DUSound, soundpath);
  
  $.each(DUMusic, function(idx, val) {
    var fullpath = musicpath + "" + val + ".mp3";
    createjs.Sound.registerSound(fullpath, idx);
  });
}

function audio_init_2() {
  $.each(DUSound, function(idx, val) {
    createjs.Sound.registerSound(val, idx);
  });
}

function audio_init_title() {
  createjs.Sound.initializeDefaultPlugins();
  createjs.Sound.alternateExtensions = ["ogg"];
//  createjs.Sound.addEventListener("fileload", handleFileLoadTitle);
//  createjs.Sound.registerSounds(DUSound, soundpath);
  
  var fullpath = musicpath + "The Dark Unknown.mp3";
  createjs.Sound.registerSound(fullpath, "Dark Unknown");
}

function populate_audio(soundlist, preload, loop, soundtype) {
  var preloadtext = "";
  if (preload) {
    preloadtext = "preload= 'metadata'";
  }
  var looptext = "";
  if (loop) {
    looptext = "loop = 'loop'";
  }
  if (soundtype === "music") {
    $.each(soundlist, function(index, value) {
      var oggvalue = value.replace("mp3", "ogg");
      $("#audiocontainer").html($("#audiocontainer").html() + "<audio id='" + index + "' " + preloadtext + " " + looptext + "><source src='" + value + "' type='audio/mpeg' /><source src='" + oggvalue + "' type='audio/ogg' /></audio>");
    });
  } else {
    $.each(soundlist, function(index, value) {
      $("#audiocontainer").html($("#audiocontainer").html() + "<audio id='" + index + "' " + preloadtext + " " + looptext + "><source src='" + value + "' type='audio/wav' /></audio>");
    });    
  }
}

function create_audio() {
  var tmparray = {};
  tmparray.music = new Audio();
  tmparray.sfx = new Audio();
  tmparray.bkgrnd = new Audio();
  
  return tmparray;
}

// checks to see if the player has turned off sound
function DUPlaySound(sound) {
  var playing;
  if (DU.gameflags.getFlag("sound")) { playing = createjs.Sound.play(sound); }
  return playing;
}

function DUPlayMusic(sound) {
  var playing;
  if (DU.gameflags.getFlag("music")) { playing = createjs.Sound.play(sound, {loop:-1}); }
  return playing;
}

function PlaySound(sound) {
  var playing = createjs.Sound.play(sound);
  return playing;
}

function StopMusic(playing) {
  playing.stop();
}

//function play_audio(atype, music) {
//  audioplayers[atype].src = document.getElementById(music).src;
//  audioplayers[atype].load();
//  audioplayers[atype].play();
function play_audio(music) {
  document.getElementById(music).pause();
  document.getElementById(music).currentTime = 0;
  document.getElementById(music).play();
}

function stop_music() {
  document.getElementById(nowplaying).pause();
  document.getElementById(nowplaying).currentTime = 0;
}

function play_footstep(onwhat) {
  if (laststep === "left") {
    DUPlaySound(onwhat + "_right");
    laststep = "right";
  } else {
    DUPlaySound(onwhat + "_left");
    laststep = "left";
  }
}

function handleFileLoad(event) {
  // A sound has been preloaded.
  musicloaded[event.id] = 1;
  musicsloaded++;
  if (musicsloaded === 20) {
    SoundLoaded();
  }
}

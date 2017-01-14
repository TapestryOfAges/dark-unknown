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
DUSound["sfx_unlock"] = "sfx/sfx_open_lock.mp3";  // REPLACED: Medieval Fantasy SFX Pack / Misc / Open Lock
DUSound["sfx_potion"] = "sfx/sfx8.ogg";
DUSound["sfx_melee_miss"] = "sfx/sfx9.ogg";
DUSound["sfx_melee_hit"] = "sfx/sfx10.ogg";
DUSound["sfx_missile_miss"] = "sfx/sfx11.ogg";
DUSound["sfx_missile_hit"] = "sfx/sfx12.ogg";
DUSound["sfx_stone_drag"] = "sfx/sfx13.ogg";

// new sounds
DUSound["sfx_walk_grass_left"] = "sfx/sfx_walk_grass.mp3";   // Sanctamonia footstep_vegetation1_2
DUSound["sfx_walk_grass_right"] = "sfx/sfx_walk_grass.mp3";
DUSound["sfx_walk_ug_grass_left"] = "sfx/sfx_ug_walk_grass.mp3";   // Dungeon SFX Pack / Step 3 (sand)
DUSound["sfx_walk_ug_grass_right"] = "sfx/sfx_ug_walk_grass.mp3";
DUSound["sfx_walk_hill_left"] = "sfx/sfx_walk_hill.mp3";   // Medieval Fantasy SFX Pack / Steps / Step 2
DUSound["sfx_walk_hill_right"] = "sfx/sfx_walk_hill.mp3";
DUSound["sfx_walk_ug_hill_left"] = "sfx/sfx_ug_walk_grass.mp3";   // Dungeon SFX Pack / Misc / Step 3 (sand)
DUSound["sfx_walk_ug_hill_right"] = "sfx/sfx_ug_walk_grass.mp3";
DUSound["sfx_walk_water_left"] = "sfx/sfx_walk_water.mp3";   // Medieval Fantasy SFX Pack / Steps / Step (water) 1
DUSound["sfx_walk_water_right"] = "sfx/sfx_walk_water.mp3";
DUSound["sfx_walk_ug_water_left"] = "sfx/sfx_ug_walk_water.mp3";   // Dungeon SFX Pack / Misc / Step 5 (water)
DUSound["sfx_walk_ug_water_right"] = "sfx/sfx_ug_walk_water.mp3";
DUSound["sfx_walk_forest_left"] = "sfx/sfx_walk_forest.mp3";   // Medieval Fantasy 2 SFX Pack / Steps / StepsLeaves1
DUSound["sfx_walk_forest_right"] = "sfx/sfx_walk_forest.mp3";
DUSound["sfx_walk_ug_forest_left"] = "sfx/sfx_ug_walk_grass.mp3";   // Dungeon SFX Pack / Misc / Step 3 (sand)
DUSound["sfx_walk_ug_forest_right"] = "sfx/sfx_ug_walk_grass.mp3";
DUSound["sfx_walk_stone_left"] = "sfx/sfx_walk_stone.mp3";   // Medieval Fantasy Pack / Steps / Step (stone) 2
DUSound["sfx_walk_stone_right"] = "sfx/sfx_walk_stone.mp3";
DUSound["sfx_walk_ug_stone_left"] = "sfx/sfx_ug_walk_stone.mp3";   // Medieval Fantasy Pack / Steps / Step (stone) 2
DUSound["sfx_walk_ug_stone_right"] = "sfx/sfx_ug_walk_stone.mp3";
DUSound["sfx_walk_swamp_left"] = "sfx/sfx_walk_swamp.mp3";   // Medieval Fantasy 2 SFX Pack / Steps / StepWet1
DUSound["sfx_walk_swamp_right"] = "sfx/sfx_walk_swamp.mp3";
DUSound["sfx_walk_ug_swamp_left"] = "sfx/sfx_ug_walk_swamp.mp3";   // Dungeon SFX Pack / Misc / Step 14 (flood)
DUSound["sfx_walk_ug_swamp_right"] = "sfx/sfx_ug_walk_swamp.mp3";
DUSound["sfx_fountain_splash"] = "sfx/sfx_fountain_splash.mp3"; // Soniss 2015/Soundopolis - Water 01/Water_Fountain_Fienup_002.wav
DUSound["sfx_ocean_waves"] = "sfx/sfx_ocean_waves.mp3"; // Soniss 2015/Soundopolis - Water Ambiences 01/Beach_Ocean_Waves_Fienup_001.wav
DUSound["sfx_bubbling_lava"] = "sfx/sfx_bubbling_lava.mp3"; // RPG Sound Effects Bundle v1/Bubbling Lava.wav
DUSound["sfx_fire_crackle"] = "sfx/sfx_fire_crackle.mp3"; // Dungeon SFX Pack v1/Misc/Torch 2 (loop).mp3
DUSound["sfx_waterfall"] = "sfx/sfx_waterfall.mp3"; // Soniss 2015/Sound Ex Machine - Water Flow/Small waterfall (closer perspective) 02.wav
DUSound["sfx_waterfall_fall"] = "sfx/sfx_waterfall_fall.mp3"; // Soniss 2015/Soundopolis - Water 01/Splash_Dive_Fienup_002.wav

var musicpath = "music/";
var DUMusic = {};
DUMusic["Theme"] = "Hero Victorious";
DUMusic["Dark Unknown"] = "The Dark Unknown";
DUMusic["Towne"] = "Towne";
DUMusic["Dark Towne"] = "Dark Towne";
DUMusic["Dungeon"] = "Dungeon";  
DUMusic["Dark Dungeon"] = "Dark Dungeon";  
DUMusic["Mainland"] = "Ellusus Dawn"; 
DUMusic["Village"] = "Plains of Tethlokel";
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
DUMusic["Sirius"] = "This Bardic Life";
DUMusic["Death"] = "Death";
DUMusic["Final"] = "Final Steps";
DUMusic["Heartbeat"] = "Alone in the Darkness";
DUMusic["Despair"] = "Depths of Despair";
DUMusic["Alone"] = "You Are Not Alone";
DUMusic["Light"] = "A Light in the Darkness";

var musicloaded = {};
var musicsloaded = 0;
var soundsloaded = 0;
var numsounds = Object.keys(DUSound).length;

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
  createjs.Sound.addEventListener("fileload", handleFileLoadSfx);
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
  fullpath = musicpath + "The Journey Begins.mp3";
  createjs.Sound.registerSound(fullpath, "Charcreate");
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
  var playing = {};
  if (DU.gameflags.getFlag("sound")) { playing.song = createjs.Sound.play(sound); playing.name = sound; }
  return playing;
}

function DUPlayMusic(sound) {
  var playing = {};
  var loopval = 0;
  if (DU.gameflags.getFlag("loopmusic")) { loopval = -1; }
  if (DU.gameflags.getFlag("music")) { playing.song = createjs.Sound.play(sound, {loop:loopval}); playing.name = sound; }
  return playing;
}

function DUPlayAmbient(sound) {
  var playing = {};
  if (DU.gameflags.getFlag("ambientsound") && DU.gameflags.getFlag("sound")) { playing.song = createjs.Sound.play(sound, {loop:-1}); playing.name = sound; }
  playing.song.volume = 0;
  setTimeout(function() { IncAmbientVol(playing); }, 500);
  return playing;
}

function IncAmbientVol(playing) {
  if (playing.name === ambient.name) {
    if (playing.song.volume < 1) {
      playing.song.volume += .125;
      setTimeout(function() { IncAmbientVol(playing); }, 250);
    }
  }
}

function DecAmbientVol(playing) {
  if (playing.song.volume > 0) {
    playing.song.volume -= .125;
    setTimeout(function() { DecAmbientVol(playing); }, 150);
  } else {
    playing.song.stop();
  }
}


function PlaySound(sound) {
  var playing = {};
  playing.song = createjs.Sound.play(sound);
  playing.name = sound;
  return playing;
}

function StopMusic(playing) {
  if (!playing) { playing = nowplaying; }
  playing.song.stop();
  nowplaying = {};
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
    audio_init_2();
  }
}

function handleFileLoadSfx(event) {
  // A sound has been preloaded.
  soundsloaded++;
  if (soundsloaded === numsounds) {
    SoundLoaded();
  }
}

function QueueMusic(songname) {
  nowplaying.song.loop = 0;
  nowplaying.song.addEventListener("complete", function(event) {
    nowplaying = DUPlayMusic(songname);
  });
}
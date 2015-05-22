
var soundpath = "sfx/";
/*
var DUSound = [ {src: "sfx.ogg", data: {
  audioSprite: [
    {id: "sfx_walk_right", startTime: 0, duration: 100},
    {id: "sfx_walk_left", startTime: 400, duration: 100},
    {id: "sfx_spell_light", startTime: 800, duration: 900},
    {id: "sfx_open_door", startTime: 2200, duration: 1100},
    {id: "sfx_close_door", startTime: 3700, duration: 650},
    {id: "sfx_locked_door", startTime: 4900, duration: 800}, 
    {id: "sfx_walk_blocked", startTime: 6250, duration: 250}, 
    {id: "sfx_unlock", startTime: 6850, duration: 300},
    {id: "sfx_potion", startTime: 7700, duration: 200},
    {id: "sfx_melee_miss", startTime: 8200, duration: 150}, 
    {id: "sfx_melee_hit", startTime: 8700, duration: 150},
    {id: "sfx_arrow_miss", startTime: 9100, duration: 200},
    {id: "sfx_arrow_hit", startTime: 9600, duration: 500},
    {id: "sfx_walk_water_right", startTime: 10400, duration: 700},
    {id: "sfx_walk_water_left", startTime: 11400, duration: 700},
  ]}
}];

// Doesn't work properly from file:///
*/

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

var musicpath = "music/";
var DUMusic = {};
DUMusic["Theme"] = "Hero Theme";
DUMusic["Dark Unknown"] = "Dark Unknown";
DUMusic["Towne"] = "Towne";
DUMusic["Dark Towne"] = "Dark Towne";
DUMusic["Dungeon"] = "Dungeon";
DUMusic["Dark Dungeon"] = "Dark Dungeon";
DUMusic["Mainland"] = "Mainland Wander";
DUMusic["Island"] = "Island Wander";
DUMusic["Magic"] = "Magic";
DUMusic["Cave"] = "Cave";
DUMusic["Underworld"] = "Underworld";
DUMusic["Combat"] = "Combat";
DUMusic["Olympus"] = "Olympus";

function audio_init() {
  createjs.Sound.initializeDefaultPlugins();
//  createjs.Sound.alternateExtensions = ["mp3"];
//  createjs.Sound.registerSounds(DUSound, soundpath);
  
  $.each(DUMusic, function(idx, val) {
    var fullpath = musicpath + "" + val + ".ogg";
    createjs.Sound.registerSound(fullpath, idx);
  });

  $.each(DUSound, function(idx, val) {
    createjs.Sound.registerSound(val, idx);
  });

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
  if (DU.gameflags.sound) { playing = createjs.Sound.play(sound); }
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
    if ((onwhat === "Ocean") || (onwhat === "Water") || (onwhat === "Shallows") || (onwhat === "River")) {
      DUPlaySound("sfx_walk_water_right");
    } else {
      DUPlaySound("sfx_walk_right");
    }
    laststep = "right";
  } else {
    if ((onwhat === "Ocean") || (onwhat === "Water") || (onwhat === "Shallows") || (onwhat === "River")) {
      DUPlaySound("sfx_walk_water_left");
    } else {
      DUPlaySound("sfx_walk_left");
    }
    laststep = "left";
  }
}

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
      play_audio("sfx_walk_water_right");
    } else {
      play_audio("sfx_walk_right");
    }
    laststep = "right";
  } else {
    if ((onwhat === "Ocean") || (onwhat === "Water") || (onwhat === "Shallows") || (onwhat === "River")) {
      play_audio("sfx_walk_water_left");
    } else {
      play_audio("sfx_walk_left");
    }
    laststep = "left";
  }
}
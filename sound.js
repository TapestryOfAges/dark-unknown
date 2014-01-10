
function populate_audio(soundlist, preload, loop) {
  var preloadtext = "";
  if (preload) {
    preloadtext = "preload= 'metadata'";
  }
  var looptext = "";
  if (loop) {
    looptext = "loop = 'loop'";
  }
  $.each(soundlist, function(index, value) {
    $("#audiocontainer").html($("#audiocontainer").html() + "<audio id='" + index + "' src='" + value + "' " + preloadtext + " " + looptext + "></audio>");
  });
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
  document.getElementById(music).play();
}

function stop_music() {
  document.getElementById(nowplaying).pause();
  document.getElementById(nowplaying).currentTime = 0;
}

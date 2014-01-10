
function populate_audio(soundlist, preload, loop) {
  var preloadtext = "";
  if (preload) {
    preloadtext = "preload: 'auto'";
  }
  var looptext = "";
  if (loop) {
    looptext = "loop";
  }
  $.each(soundlist, function(index, value) {
    $("#audiocontainer").html($("#audiocontainer").html() + "<audio id='" + index + "' src='" + value + "' " + preloadtext + " " + loop + "></audio>");
  });
}

function create_audio() {
  var tmparray = {};
  tmparray.music = new Audio();
  tmparray.sfx = new Audio();
  tmparray.bkgrnd = new Audio();
  
  return tmparray;
}

function play_audio(atype, music) {
  audioplayer[atype].src = document.getElementById(music).src;
  audioplayer[atype].load();
  audioplayer[atype].play();
}

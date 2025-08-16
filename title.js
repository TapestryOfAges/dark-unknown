"use strict";

let tv = {};

tv.preload = function(arrayOfImages) {
  for (let i=0;i<arrayOfImages.length;i++) {
    (new Image()).src = arrayOfImages[i];
  }
}

tv.preload([
  "graphics/title/ToA_banner-b.jpg",
//  "graphics/title/create.gif",
//  "graphics/title/create-g.gif",
//  "graphics/title/credits.gif",
//  "graphics/title/credits-g.gif",
  "graphics/title/gf.gif",
//  "graphics/title/intro.gif",
//  "graphics/title/intro-g.gif",
//  "graphics/title/journey.gif",
//  "graphics/title/journey-g.gif",
//  "graphics/title/journey-d.gif",
  "graphics/title/present.gif",
  "graphics/title/and.gif",
]);

//tv.optnames = [];
//tv.optnames[0] = "graphics/title/intro";
//tv.optnames[1] = "graphics/title/create";
//tv.optnames[2] = "graphics/title/journey";
//tv.optnames[3] = "graphics/title/credits";

//let avatars = [];
//avatars[0] = ["300.2.gif", "300.gif", "301.gif", "shepherd-offcolor.gif", "302.gif", "druid-offcolor.gif"];
//avatars[1] = ["303.2.gif", "303.gif", "304.2.gif", "304.gif", "305.gif", "ranger-offcolor.gif"];
//avatars[2] = ["306.gif", "307.2.gif", "307.gif", "308.gif", "311.gif", "tinker-offcolor.gif"];
//avatars[3] = ["bard-offcolor.gif", "fighter-offcolor.gif", "paladin-offcolor.gif", "mage-offcolor.gif", "", ""];

tv.nuavatars = [ ["WhiteTunic", "ShortBlackPale", "DaggerPale", "OffhandPale"], 
["WhiteTunic", "ShortBlackDark", "DaggerDark", "OffhandDark"],
["WhiteTunic", "ShortBrownPale", "DaggerPale", "OffhandPale"],
["WhiteTunic", "BrownDark", "DaggerDark", "OffhandDark"],
["WhiteTunic", "BlondePale", "DaggerPale", "OffhandPale"],
["WhiteTunic", "BaldBeardedDark", "DaggerDark", "OffhandDark"]
];

//let avskin = [];
//avskin[0] = [2,1,1,1,1,1];
//avskin[1] = [2,1,2,1,1,1];
//avskin[2] = [1,2,1,2,1,1];
//avskin[3] = [1,1,1,1];

tv.nuavskin = [[1,2,1,2,1,2]];

tv.avatarselect = {};
tv.avatarselect.x = 0;
tv.avatarselect.y = 0;

gamestate.setMode("init");

tv.optselect = 0;
tv.charname = "";
tv.gender = "";
tv.graphic = "";
tv.dusong;
//musictries = 0;
tv.introidx = 0;

tv.firsttime = 1;
tv.themap = new GameMap();

//let testvar;

tv.sweepid;

tv.lastanim = "";

//let browserheight = window.innerHeight;
tv.browserwidth = window.innerWidth;

//DU.gameflags.setFlag("music", 1);
//DU.gameflags.setFlag("loopmusic", 1);
//DU.gameflags.setFlag("sound", 1);
//DU.gameflags.setFlag("ambientsound", 1);
//DU.gameflags.setFlag("zoom", 1);

tv.el = function(e) {
  let code = (e.keyCode ? e.keyCode : e.which);
  if (e.ctrlKey && (code === 73)) { OutOfContext.toggle_dev(); return; }  // ctrl-i opens dev console no matter the mode
  if (IsWantedCode(code)) {
    if (gamestate.getMode() !== "import") {
      e.preventDefault();
    }
    if (gamestate.getMode() === "init") {
      gamestate.setMode("null");
      tv.page_zero();
    }

    else if (gamestate.getMode() !== "null") {
      tv.DoActionTitle(code, e);
    } else {
      tv.finishedFinalPage();
    }
  }
}

{
  let callback = function() {
    audio_init();  
    set_schedules();

    if (tv.firsttime) {
      document.addEventListener("keydown", tv.el);
      tv.firsttime = 0;
    }
    
  }
  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

function page_pre_zero() {
//  ipcRenderer.send('toggle_dev');
  let loaddoc = document.getElementById("load");
  if (loaddoc) {
    loaddoc.innerHTML += "<p class='charcreate' style='margin-top:-30px;margin-left:3px'>Ready.<br />Press any key...</p>";
    if (beta) {
      let verdiv = document.getElementById("version");
      if (verdiv) {
        verdiv.innerHTML = `<p class='charcreate'>v${DU.version}</p>`;
      }
      let changelog = document.getElementById("changelog");
      if (changelog) {
        changelog.innerHTML = `<p class='charcreate'>CHANGELOG:</p><ul style='margin-top:0px>`;
        changelog.innerHTML += `<li class='changelog'>Waiting no longer fails to fade out sometimes</li>`;
        changelog.innerHTML += `<li class='changelog'>Audachta Nemesos are no longer Usable items</li>`;
        changelog.innerHTML += `<li class='changelog'>Vulnerability now imposes at 15/25% penalty to AC</li>`;
        changelog.innerHTML += `<li class='changelog'>Knockback effects will no longer split up multi-tile monsters</li>`;
        changelog.innerHTML += `<li class='changelog'>AoEs and Walls of Fire no longer double-count multi-tile monsters</li>`;
        changelog.innerHTML += `<li class='changelog'>Titan heads cannot be considered to be in a wall of fire</li>`;
        changelog.innerHTML += `<li class='changelog'>Telekinesis no longer throws an error on invalid targets</li>`;
        changelog.innerHTML += `<li class='changelog'>Chests that are in the water can no longer be Pulled if you are waterwalking</li>`;
        changelog.innerHTML += `<li class='changelog'>Completed Dungeon Fulcrum, and created a new monster to live there</li>`;
        changelog.innerHTML += `<li class='changelog'>Walkoff methods are now sent your direction of travel</li>`;
        changelog.innerHTML += `</ul>`;
      }
    }
  }
  OutOfContext.load_settings();
} 

//tv.load_settings = function() {
//  console.log("in load_settings");
//  OutOfContext.load_settings();
//}

OutOfContext.onLoadSettings((event,settings) => {
//  for (let setting in settings) {
//    DU.settings.setSetting(setting, settings[setting]);
//  }
  DU.settings.setSettings(settings);
  OutOfContext.resize(DU.settings.getSetting("zoom"));
});

tv.page_zero = function() {
//  tv.load_settings();
  let fleft = -3;
  let ftop = 0;
  let signl = fleft+324;
  let signt = ftop+121;
  let firstpage = "<div id='allofem'><div id='ToA' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;width:776;height:209;display:block;opacity:0;background-image:url(\"graphics/title/ToA_banner_blank.gif\")'></div><div id=\"over\" style=\"position:absolute;left:"+fleft+"px;top:"+ftop+"px;width:2px;height:209px;z-index:5;display:none;background-image:url('graphics/title/ToA_banner_ToA-only.gif');background-position: 0px 0px\"></div>";
  firstpage += "<div id='sign' style='position:absolute;z-index:10;left:" + signl + "px;display:none;top:" + signt + "px;width:162;height:52;background-image:url(\"graphics/title/games_signature.gif\");background-position: 0px 0px;color:white'></div>";
  fleft = fleft+370;
  ftop = ftop+230;
  firstpage += "<div id='and' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;opacity:0'><img src='graphics/title/and.gif' /></div>";
  fleft = tv.browserwidth/2 - 111;
  ftop = ftop+50;
  firstpage += "<div id='gf' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;opacity:0'><img src='graphics/title/gf.gif' /></div>";
  fleft = tv.browserwidth/2 - 59;
  ftop = ftop+70;
  firstpage += "<div id='present' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;opacity:0'><img src='graphics/title/present.gif' /></div></div>";

  document.getElementById('maindiv').innerHTML = firstpage;
  setTimeout(function() {
    tv.start_animations();      
  }, 100);
}

tv.start_animations = function() {
    tv.dusong = {};
    tv.dusong.name = "Dark Unknown";
    tv.dusong.song = musicpreload["Dark Unknown"];
    musicpreload = {};
    if (DU.settings.getSetting("music")) {
      tv.dusong.song.play();
      tv.dusong.song.loop = true;
      tv.dusong.song.volume = DU.settings.getSetting("music")/10;
    }
    if (gamestate.getMode() === "null") {
      document.getElementById('ToA').classList.add('titlefadein');
      setTimeout(function() {
        if (gamestate.getMode() === "null") {
          if (document.getElementById('over')) {
            document.getElementById('over').style.display = "inline";
            tv.lastanim = "over";
            document.getElementById('over').classList.add("widenanimate");
            setTimeout(function() {
              if (gamestate.getMode() === "null") {
                if (document.getElementById('sign')) {
                  document.getElementById('sign').style.display = "inline";
                  tv.Signature(-52);
                }
              }
            }, 2500);
          }
        }
      }, 2000);
    }
}

tv.Signature = function(val) {
  if (val === -4212) { tv.FirstPage(); return; }
  tv.lastanim = "sign";
  if (gamestate.getMode() === "null") {
    document.getElementById('sign').style.backgroundPosition = "0px " + val + "px";
    setTimeout(function() { tv.Signature(val-52);}, 25);
  }
}

tv.FirstPage = function() {
  document.getElementById('ToA').style.backgroundImage = "url('graphics/title/ToA_banner-b.gif')";
  document.getElementById('sign').style.display = "none";
  document.getElementById('over').style.display = "none";
  tv.lastanim = "and";
  document.getElementById('and').classList.add('andfadein');
  setTimeout(function() {
    tv.lastanim = "gf";
    if (document.getElementById('gf')) {
      document.getElementById('gf').classList.add('gffadein');
      setTimeout(function() {
        tv.lastanim = "present";
        document.getElementById('present').classList.add('presentfadein');
        setTimeout(function() {
          setTimeout(function() {
            let pres = document.getElementById('allofem');
            if (pres) {
              pres.classList.add('titlefadeout');
              setTimeout(function() {
                tv.SecondPage();
              },1150);
            }
          }, 1150);
        }, 1550);
      },1050);
    }
  }, 1350);
}


tv.SecondPage = function() {
  
  let sleft = tv.browserwidth/2 - 200;
  let sptop = -5;
  tv.optselect = 0;
  let spage = "<div id='attract1' style='position:absolute; left:20px; top:5px; z-index:5'></div><div id='attract2' style='position:absolute; left:20px; top:5px; z-index:6'></div><div id='DU' style='position:absolute;left:" + sleft + "px;top:" + sptop + "px;opacity:0'><img src='graphics/title/ducoe_logo.png' /></div><div id='options'></div>";
  document.getElementById('maindiv').innerHTML = spage;
  tv.lastanim = "DU";
  document.getElementById('DU').classList.add('presentfadein');
  setTimeout(function() {
    spage = "<div id='textoptions' class='textoptions'>";
    spage += "<div id='intro'><p class='menuselect' style='margin-top:5px' id='opt0' onClick='makeChoice(\'intro\')' />View Introduction</p></div>";
    spage += "<div id='create'><p class='menuplain' style='margin-top:5px' id='opt1' onClick='makeChoice(\'create\')' />Create Character</p></div>";
    let journey = " style='margin-top:5px'";
    if (gamestate.getLatestSaveIndex() === -1) {
      journey = " style='margin-top:5px; color:gray'";
    } 
    spage += "<div id='journey'><p class='menuplain' id='opt2'" + journey + " onClick='makeChoice(\'journey\')' />Continue Adventure</p></div>";
    spage += "<div id='credits'><p class='menuplain' style='margin-top:5px' id='opt3' onClick='makeChoice(\'credits\')' />Credits</p></div></div>";
    document.getElementById('options').innerHTML = spage;
    document.getElementById('intro').classList.add('presentfadein');
    document.getElementById('create').classList.add('presentfadein');
    document.getElementById('journey').classList.add('presentfadein');
    document.getElementById('credits').classList.add('presentfadein');
    setTimeout(function() { tv.pagelive(); }, 10);
  },1000);
}

tv.finishedFinalPage = function() {
  let sleft = tv.browserwidth/2 - 200;
  let sptop = -5;
  tv.optselect = 0;
  let spage = "<div id='attract1' style='position:absolute; left:20px; top:5px; z-index:5'></div><div id='attract2' style='position:absolute; left:20px; top:5px; z-index:6'></div><div id='DU' style='position:absolute;left:" + sleft + "px;top:" + sptop + "px;z-index:10'><img src='graphics/title/ducoe_logo.png' /></div><div id='options'></div>";
  document.getElementById('maindiv').innerHTML = spage;
  spage = "<div id='textoptions' class='textoptions'>";
  spage += "<div id='intro'><p class='menuselect' style='margin-top:5px' id='opt0' onClick='makeChoice(\'intro\')' />View Introduction</p></div>";
  spage += "<div id='create'><p class='menuplain' style='margin-top:5px' id='opt1' onClick='makeChoice(\'create\')' />Create Character</p></div>";
  let journey = " style='margin-top:5px'";
  if (gamestate.getLatestSaveIndex() === -1) {
    journey = " style='margin-top:5px; color:gray'";
  } 
  spage += "<div id='journey'><p class='menuplain' id='opt2'" + journey + " onClick='makeChoice(\'journey\')' />Continue Adventure</p></div>";
  spage += "<div id='credits'><p class='menuplain' style='margin-top:5px' id='opt3' onClick='makeChoice(\'credits\')' />Credits</p></div></div>";

  document.getElementById('options').innerHTML = spage;
  tv.pagelive();

}

tv.pagelive = function() {
  gamestate.setMode("on");
  setTimeout(function() { if (tv) {tv.StartAttract();} }, 4000);
}

tv.StartAttract = function() {
  let grass = `background-image:url("graphics/static.gif"); background-position: -192px 0px;width:32px;height:32px`;
  let brush = `background-image:url("graphics/static.gif"); background-position: -224px 0px;width:32px;height:32px`;
  let forest = `background-image:url("graphics/static.gif"); background-position: -224px -32px;width:32px;height:32px`;
  let tree = `background-image:url("graphics/static.gif"); background-position: -64px -608px;width:32px;height:32px`;
  let campfire = `background-image:url("graphics/static.gif"); background-position: -128px -3136px;width:32px;height:32px`;
// animation notes: random, 4 frames, 150-300ms.
  let cave = `background-image:url("graphics/static.gif"); background-position: -192px -96px;width:32px;height:32px`;
  let dungeon = `background-image:url("graphics/static.gif"); background-position: -224px -96px;width:32px;height:32px`;
  let keep = `background-image:url("graphics/static.gif"); background-position: 0px -3296px;width:32px;height:32px`;
  // animation notes: random, 4 frames, 150-250
  let shrine = `background-image:url("graphics/static.gif"); background-position: -128px -96px;width:32px;height:32px`;
  let hill = `background-image:url("graphics/static.gif"); background-position: -8*32px 0px;width:32px;height:32px`;
  let mountain1 = `background-image:url("graphics/static.gif"); background-position: -256px -3744px;width:32px;height:32px`;
  let mountain2 = `background-image:url("graphics/static.gif"); background-position: -288px -3744px;width:32px;height:32px`;
  let roadns = `background-image:url("graphics/static.gif"); background-position: -256px -224px;width:32px;height:32px`;
  let roadne = `background-image:url("graphics/static.gif"); background-position: -288px -256px;width:32px;height:32px`;
  let roadew = `background-image:url("graphics/static.gif"); background-position: -224px -288px;width:32px;height:32px`;
  let cobble = `background-image:url("graphics/static.gif"); background-position: -64px -192px;width:32px;height:32px`;
  let wall = `background-image:url("graphics/static.gif"); background-position: -256px -480px;width:32px;height:32px`;
  let door = `background-image:url("graphics/static.gif"); background-position: -288px -480px;width:32px;height:32px`;
  // specifically, door with window
  let chair = `background-image:url("graphics/static.gif"); background-position: -32px -2720px;width:32px;height:32px`;
  let tableedge = `background-image:url("graphics/static.gif"); background-position: -192px -2720px;width:32px;height:32px`;
  let table = `background-image:url("graphics/static.gif"); background-position: -224px -2720px;width:32px;height:32px`;
  let ocean0 = `background-image:url("graphics/water.gif"); background-position: 0px 0px;width:32px;height:32px`;
  let ocean1 = `background-image:url("graphics/water.gif"); background-position: -32px 0px;width:32px;height:32px`;
  let ocean4 = `background-image:url("graphics/water.gif"); background-position: -128px 0px;width:32px;height:32px`;
  // might need more ocean tiles for the tiling
  let water0 = `background-image:url("graphics/water.gif"); background-position: 0px -32px;width:32px;height:32px`;
  let water1 = `background-image:url("graphics/water.gif"); background-position: -32px -32px;width:32px;height:32px`;
  let water2 = `background-image:url("graphics/water.gif"); background-position: -64px -32px;width:32px;height:32px`;
  let water3 = `background-image:url("graphics/water.gif"); background-position: -128px -32px;width:32px;height:32px`;
  let water4 = `background-image:url("graphics/water.gif"); background-position: -160px -32px;width:32px;height:32px`;
  let water5 = `background-image:url("graphics/water.gif"); background-position: -192px -32px;width:32px;height:32px`;
  let water6 = `background-image:url("graphics/water.gif"); background-position: -224px -32px;width:32px;height:32px`;
  let water7 = `background-image:url("graphics/water.gif"); background-position: -256px -32px;width:32px;height:32px`;
  // same
  let dirt = `background-image:url("graphics/static.gif"); background-position: 0px -64px;width:32px;height:32px`;
  let dirtcoast = `background-image:url("graphics/static.gif"); background-position: -160px -1760px;width:32px;height:32px`;
  // note- used to be NorthCoastSAND ?
  let post = `background-image:url("graphics/static.gif"); background-position: -96px -2400px;width:32px;height:32px`;
  let sign = `background-image:url("graphics/static.gif"); background-position: -64px -2272px;width:32px;height:32px`;
  let rightpost = `background-image:url("graphics/static.gif"); background-position: -64px -2816px;width:32px;height:32px`;
  let wpnsign = `background-image:url("graphics/static.gif"); background-position: -256px -2272px;width:32px;height:32px`;
  let brazier = `background-image:url("graphics/static.gif"); background-position: -128px -3104px;width:32px;height:32px`;
  // animation notes: random, 4 frames, 150-300

  let attractmap = "<table cellpadding='0' cellspacing='0' border='0'>";
  attractmap += `<tr><td id='am1x1' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am2x1' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am3x1' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am4x1' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am5x1' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am6x1' style='opacity:0;width:32px;height:32px'></td><td id='am7x1' style='opacity:0;width:32px;height:32px'></td><td id='am8x1' style='opacity:0;width:32px;height:32px'></td><td id='am9x1' style='opacity:0;width:32px;height:32px'></td><td id='am10x1' style='opacity:0;width:32px;height:32px'></td><td id='am11x1' style='opacity:0;width:32px;height:32px'></td><td id='am12x1' style='opacity:0;width:32px;height:32px'></td><td id='am13x1' style='opacity:0;width:32px;height:32px'></td><td id='am14x1' style='opacity:0;width:32px;height:32px'></td><td id='am15x1' style='opacity:0;width:32px;height:32px'></td><td id='am16x1' style='opacity:0;width:32px;height:32px'></td><td id='am17x1' style='opacity:0;width:32px;height:32px'></td><td id='am18x1' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x1' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am20x1' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am21x1' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am22x1' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am23x1' style='opacity:0;${forest}'></td></tr>`;
  attractmap += `<tr><td id='am1x2' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am2x2' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am3x2' style='opacity:0;${shrine}'></td>`;
  attractmap += `<td id='am4x2' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am5x2' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am6x2' style='opacity:0;width:32px;height:32px'></td><td id='am7x2' style='opacity:0;width:32px;height:32px'></td><td id='am8x2' style='opacity:0;width:32px;height:32px'></td><td id='am9x2' style='opacity:0;width:32px;height:32px'></td><td id='am10x2' style='opacity:0;width:32px;height:32px'></td><td id='am11x2' style='opacity:0;width:32px;height:32px'></td><td id='am12x2' style='opacity:0;width:32px;height:32px'></td><td id='am13x2' style='opacity:0;width:32px;height:32px'></td><td id='am14x2' style='opacity:0;width:32px;height:32px'></td><td id='am15x2' style='opacity:0;width:32px;height:32px'></td><td id='am16x2' style='opacity:0;width:32px;height:32px'></td><td id='am17x2' style='opacity:0;width:32px;height:32px'></td><td id='am18x2' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x2' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am20x2' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am21x2' style='opacity:0;${grass}'><div style='${keep}'></div></td>`;
  tv.AnimateTile("am21x2", 0, 4, 150, 250, "random", 1);
  //animate keep
  attractmap += `<td id='am22x2' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am23x2' style='opacity:0;${grass}'></td></tr>`;
  attractmap += `<tr><td id='am1x3' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am2x3' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am3x3' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am4x3' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am5x3' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am6x3' style='opacity:0;width:32px;height:32px'></td><td id='am7x3' style='opacity:0;width:32px;height:32px'></td><td id='am8x3' style='opacity:0;width:32px;height:32px'></td><td id='am9x3' style='opacity:0;width:32px;height:32px'></td><td id='am10x3' style='opacity:0;width:32px;height:32px'></td><td id='am11x3' style='opacity:0;width:32px;height:32px'></td><td id='am12x3' style='opacity:0;width:32px;height:32px'></td><td id='am13x3' style='opacity:0;width:32px;height:32px'></td><td id='am14x3' style='opacity:0;width:32px;height:32px'></td><td id='am15x3' style='opacity:0;width:32px;height:32px'></td><td id='am16x3' style='opacity:0;width:32px;height:32px'></td><td id='am17x3' style='opacity:0;width:32px;height:32px'></td><td id='am18x3' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x3' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am20x3' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am21x3' style='opacity:0;${roadns}'></td>`;
  attractmap += `<td id='am22x3' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am23x3' style='opacity:0;${forest}'></td></tr>`;
  attractmap += `<tr><td id='am1x4' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am2x4' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am3x4' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am4x4' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am5x4' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am6x4' style='opacity:0;width:32px;height:32px'></td><td id='am7x4' style='opacity:0;width:32px;height:32px'></td><td id='am8x4' style='opacity:0;width:32px;height:32px'></td><td id='am9x4' style='opacity:0;width:32px;height:32px'></td><td id='am10x4' style='opacity:0;width:32px;height:32px'></td><td id='am11x4' style='opacity:0;width:32px;height:32px'></td><td id='am12x4' style='opacity:0;width:32px;height:32px'></td><td id='am13x4' style='opacity:0;width:32px;height:32px'></td><td id='am14x4' style='opacity:0;width:32px;height:32px'></td><td id='am15x4' style='opacity:0;width:32px;height:32px'></td><td id='am16x4' style='opacity:0;width:32px;height:32px'></td><td id='am17x4' style='opacity:0;width:32px;height:32px'></td><td id='am18x4' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x4' style='opacity:0;${brush}'></td>`;
  attractmap += `<td id='am20x4' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am21x4' style='opacity:0;${roadns}'></td>`;
  attractmap += `<td id='am22x4' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am23x4' style='opacity:0;${brush}'></td></tr>`;
  attractmap += `<tr><td id='am1x5' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am2x5' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am3x5' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am4x5' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am5x5' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am6x5' style='opacity:0;width:32px;height:32px'></td><td id='am7x5' style='opacity:0;width:32px;height:32px'></td><td id='am8x5' style='opacity:0;width:32px;height:32px'></td><td id='am9x5' style='opacity:0;width:32px;height:32px'></td><td id='am10x5' style='opacity:0;width:32px;height:32px'></td><td id='am11x5' style='opacity:0;width:32px;height:32px'></td><td id='am12x5' style='opacity:0;width:32px;height:32px'></td><td id='am13x5' style='opacity:0;width:32px;height:32px'></td><td id='am14x5' style='opacity:0;width:32px;height:32px'></td><td id='am15x5' style='opacity:0;width:32px;height:32px'></td><td id='am16x5' style='opacity:0;width:32px;height:32px'></td><td id='am17x5' style='opacity:0;width:32px;height:32px'></td><td id='am18x5' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x5' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am20x5' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am21x5' style='opacity:0;${roadns}'></td>`;
  attractmap += `<td id='am22x5' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am23x5' style='opacity:0;${forest}'></td></tr>`;
  attractmap += `<tr><td id='am1x6' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am2x6' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am3x6' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am4x6' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am5x6' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am6x6' style='opacity:0;width:32px;height:32px'></td><td id='am7x4' style='opacity:0;width:32px;height:32px'></td><td id='am8x4' style='opacity:0;width:32px;height:32px'></td><td id='am9x4' style='opacity:0;width:32px;height:32px'></td><td id='am10x4' style='opacity:0;width:32px;height:32px'></td><td id='am11x4' style='opacity:0;width:32px;height:32px'></td><td id='am12x4' style='opacity:0;width:32px;height:32px'></td><td id='am13x4' style='opacity:0;width:32px;height:32px'></td><td id='am14x4' style='opacity:0;width:32px;height:32px'></td><td id='am15x4' style='opacity:0;width:32px;height:32px'></td><td id='am16x4' style='opacity:0;width:32px;height:32px'></td><td id='am17x4' style='opacity:0;width:32px;height:32px'></td><td id='am18x4' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x6' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am20x6' style='opacity:0;${brush}'></td>`;
  attractmap += `<td id='am21x6' style='opacity:0;${roadns}'></td>`;
  attractmap += `<td id='am22x6' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am23x6' style='opacity:0;${forest}'></td></tr>`;
  attractmap += `<tr><td id='am1x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am2x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am3x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am4x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am5x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am6x7' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am7x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am8x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am9x7' style='opacity:0;${brush}'></td>`;
  attractmap += `<td id='am10x7' style='opacity:0;${grass}'><div style='${tree}'></div></td>`;
  attractmap += `<td id='am11x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am12x7' style='opacity:0;${grass}'><div style='${tree}'></div></td>`;
  attractmap += `<td id='am13x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am14x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am15x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am16x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am17x7' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am18x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am19x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am20x7' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am21x7' style='opacity:0;${roadns}'></td>`;
  attractmap += `<td id='am22x7' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am23x7' style='opacity:0;${grass}'></td></tr>`;
  attractmap += `<tr><td id='am1x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am2x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am3x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am4x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am5x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am6x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am7x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am8x8' style='opacity:0;${grass}'><div style='${tree}'></div></td>`;
  attractmap += `<td id='am9x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am10x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am11x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am12x8' style='opacity:0;${grass}'><div style='width:32px;height:32px;background-image:url("graphics/master_spritesheet.png");background-position:-64px -800px'></div></td>`; // !!
  attractmap += `<td id='am13x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am14x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am15x8' style='opacity:0;${brush}'></td>`;
  attractmap += `<td id='am16x8' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am17x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am18x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am19x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am20x8' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am21x8' style='opacity:0;${roadne}'></td>`;
  attractmap += `<td id='am22x8' style='opacity:0;${roadew}'></td>`;
  attractmap += `<td id='am23x8' style='opacity:0;${roadew}'></td></tr>`;
  attractmap += `<tr><td id='am1x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am2x9' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am3x9' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am4x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am5x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am6x9' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am7x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am8x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am9x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am10x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am11x9' style='opacity:0;${grass}'><div style='${campfire}'></div></td>`;
  // animate campfire
  attractmap += `<td id='am12x9' style='opacity:0;${brush}'></td>`;
  attractmap += `<td id='am13x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am14x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am15x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am16x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am17x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am18x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am19x9' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am20x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am21x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am22x9' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am23x9' style='opacity:0;${forest}'></td></tr>`;
  attractmap += `<tr><td id='am1x10' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am2x10' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am3x10' style='opacity:0;${mountain2}'></td>`;
  attractmap += `<td id='am4x10' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am5x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am6x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am7x10' style='opacity:0;${brush}'></td>`;
  attractmap += `<td id='am8x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am9x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am10x10' style='opacity:0;${grass}'><div style='${tree}'></div></td>`;
  attractmap += `<td id='am11x10' style='opacity:0;${brush}'></td>`;
  attractmap += `<td id='am12x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am13x10' style='opacity:0;${grass}'><div style='${tree}'></div></td>`;
  attractmap += `<td id='am14x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am15x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am16x10' style='opacity:0;${forest}'></td>`;
  attractmap += `<td id='am17x10' style='opacity:0;${brush}'></td>`;
  attractmap += `<td id='am18x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am19x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am20x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am21x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am22x10' style='opacity:0;${grass}'></td>`;
  attractmap += `<td id='am23x10' style='opacity:0;${grass}'></td></tr>`;
  attractmap += `<tr><td id='am1x11' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am2x11' style='opacity:0;${mountain2}'></td>`;
  attractmap += `<td id='am3x11' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am4x11' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am5x11' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am6x11' style='opacity:0;width:32px;height:32px'></td><td id='am7x11' style='opacity:0;width:32px;height:32px'></td><td id='am8x11' style='width:32px;height:32px'></td><td id='am9x11' style='opacity:0;width:32px;height:32px'></td><td id='am10x11' style='opacity:0;width:32px;height:32px'></td><td id='am11x11' style='opacity:0;width:32px;height:32px'></td><td id='am12x11' style='opacity:0;width:32px;height:32px'></td><td id='am13x11' style='opacity:0;width:32px;height:32px'></td><td id='am14x11' style='opacity:0;width:32px;height:32px'></td><td id='am15x11' style='opacity:0;width:32px;height:32px'></td><td id='am16x11' style='opacity:0;width:32px;height:32px'></td><td id='am17x11' style='opacity:0;width:32px;height:32px'></td><td id='am18x11' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmap += `<td id='am19x11' style='opacity:0;${brush}'></td>`;
  attractmap += `<td id='am20x11' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am21x11' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am22x11' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am23x11' style='opacity:0;${mountain2}'></td></tr>`;
  attractmap += `<tr><td id='am1x12' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am2x12' style='opacity:0;${mountain2}'><div style='${dungeon}'></div></td>`;
  attractmap += `<td id='am3x12' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am4x12' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am5x12' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am6x12' style='opacity:0;width:32px;height:32px'></td><td id='am7x12' style='opacity:0;width:32px;height:32px'></td><td id='am8x12' style='width:32px;height:32px'></td><td id='am9x12' style='opacity:0;width:32px;height:32px'></td><td id='am10x12' style='opacity:0;width:32px;height:32px'></td><td id='am11x12' style='opacity:0;width:32px;height:32px'></td><td id='am12x12' style='opacity:0;width:32px;height:32px'></td><td id='am13x12' style='opacity:0;width:32px;height:32px'></td><td id='am14x12' style='opacity:0;width:32px;height:32px'></td><td id='am15x12' style='opacity:0;width:32px;height:32px'></td><td id='am16x12' style='opacity:0;width:32px;height:32px'></td><td id='am17x12' style='opacity:0;width:32px;height:32px'></td><td id='am18x12' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmap += `<td id='am19x12' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am20x12' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am21x12' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am22x12' style='opacity:0;${mountain1}'><div style='${cave}'></div></td>`;
  attractmap += `<td id='am23x12' style='opacity:0;${mountain2}'></td></tr>`;
  attractmap += `<tr><td id='am1x13' style='opacity:0;${mountain2}'></td>`;
  attractmap += `<td id='am2x13' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am3x13' style='opacity:0;${mountain2}'></td>`;
  attractmap += `<td id='am4x13' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am5x13' style='opacity:0;${mountain2}'></td>`;
  attractmap += `<td id='am6x13' style='opacity:0;width:32px;height:32px'></td><td id='am7x13' style='opacity:0;width:32px;height:32px'></td><td id='am8x13' style='width:32px;height:32px'></td><td id='am9x13' style='opacity:0;width:32px;height:32px'></td><td id='am10x13' style='opacity:0;width:32px;height:32px'></td><td id='am11x13' style='opacity:0;width:32px;height:32px'></td><td id='am12x13' style='opacity:0;width:32px;height:32px'></td><td id='am13x13' style='opacity:0;width:32px;height:32px'></td><td id='am14x13' style='opacity:0;width:32px;height:32px'></td><td id='am15x13' style='opacity:0;width:32px;height:32px'></td><td id='am16x13' style='opacity:0;width:32px;height:32px'></td><td id='am17x13' style='opacity:0;width:32px;height:32px'></td><td id='am18x13' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmap += `<td id='am19x13' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am20x13' style='opacity:0;${hill}'></td>`;
  attractmap += `<td id='am21x13' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am22x13' style='opacity:0;${mountain2}'></td>`;
  attractmap += `<td id='am23x13' style='opacity:0;${mountain1}'></td></tr>`;
  attractmap += `<tr><td id='am1x14' style='opacity:0;${mountain2}'></td>`;
  attractmap += `<td id='am2x14' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am3x14' style='opacity:0;${mountain2}'></td>`;
  attractmap += `<td id='am4x14' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am5x14' style='opacity:0;${mountain2}'></td>`;
  attractmap += `<td id='am6x14' style='opacity:0;width:32px;height:32px'></td><td id='am7x13' style='opacity:0;width:32px;height:32px'></td><td id='am8x13' style='opacity:0;width:32px;height:32px'></td><td id='am9x13' style='opacity:0;width:32px;height:32px'></td><td id='am10x13' style='opacity:0;width:32px;height:32px'></td><td id='am11x13' style='opacity:0;width:32px;height:32px'></td><td id='am12x13' style='opacity:0;width:32px;height:32px'></td><td id='am13x13' style='opacity:0;width:32px;height:32px'></td><td id='am14x13' style='opacity:0;width:32px;height:32px'></td><td id='am15x13' style='opacity:0;width:32px;height:32px'></td><td id='am16x13' style='opacity:0;width:32px;height:32px'></td><td id='am17x13' style='opacity:0;width:32px;height:32px'></td><td id='am18x13' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmap += `<td id='am19x14' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am20x14' style='opacity:0;${mountain2}'></td>`;
  attractmap += `<td id='am21x14' style='opacity:0;${mountain1}'></td>`;
  attractmap += `<td id='am22x14' style='opacity:0;${mountain2}'></td>`;
  attractmap += `<td id='am23x14' style='opacity:0;${mountain1}'></td></tr>`;
  attractmap += `</table>`;

  let attractmapx = "<table cellpadding='0' cellspacing='0' border='0'>";
  attractmapx += `<tr><td id='amx1x1' style='opacity:0;${cobble}'><div style='width:32px;height:32px;background-image:url("graphics/${brazier[0]}");background-position:${brazier[2]}px ${brazier[3]}px'></div></td>`;
  attractmapx += `<td id='amx2x1' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x1' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x1' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x1' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx6x1' style='opacity:0;width:32px;height:32px'></td><td id='amx7x1' style='opacity:0;width:32px;height:32px'></td><td id='amx8x1' style='opacity:0;width:32px;height:32px'></td><td id='amx9x1' style='opacity:0;width:32px;height:32px'></td><td id='amx10x1' style='opacity:0;width:32px;height:32px'></td><td id='amx11x1' style='opacity:0;width:32px;height:32px'></td><td id='amx12x1' style='opacity:0;width:32px;height:32px'></td><td id='amx13x1' style='opacity:0;width:32px;height:32px'></td><td id='amx14x1' style='opacity:0;width:32px;height:32px'></td><td id='amx15x1' style='opacity:0;width:32px;height:32px'></td><td id='amx16x1' style='opacity:0;width:32px;height:32px'></td><td id='amx17x1' style='opacity:0;width:32px;height:32px'></td><td id='amx18x1' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x1' style='opacity:0;${ocean0}'></td>`;
  attractmapx += `<td id='amx20x1' style='opacity:0;${ocean1}'></td>`;
  attractmapx += `<td id='amx21x1' style='opacity:0;${water4}'></td>`;
  attractmapx += `<td id='amx22x1' style='opacity:0;${water5}'></td>`;
  attractmapx += `<td id='amx23x1' style='opacity:0;${ocean4}'></td></tr>`;
  attractmapx += `<tr><td id='amx1x2' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx2x2' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x2' style='opacity:0;${cobble}'><div style='width:32px;height:32px;background-image:url("graphics/${chair[0]}");background-position:${chair[2]}px ${chair[3]}px'></div></td>`;
  attractmapx += `<td id='amx4x2' style='opacity:0;${cobble}'><div style='width:32px;height:32px;background-image:url("graphics/${tableedge[0]}");background-position:${tableedge[2]}px ${tableedge[3]}px'></div></td>`;
  attractmapx += `<td id='amx5x2' style='opacity:0;${cobble}'><div style='width:32px;height:32px;background-image:url("graphics/${table[0]}");background-position:${table[2]}px ${table[3]}px'></div></td>`;
  attractmapx += `<td id='amx6x2' style='opacity:0;width:32px;height:32px'></td><td id='amx7x2' style='opacity:0;width:32px;height:32px'></td><td id='amx8x2' style='opacity:0;width:32px;height:32px'></td><td id='amx9x2' style='opacity:0;width:32px;height:32px'></td><td id='amx10x2' style='opacity:0;width:32px;height:32px'></td><td id='amx11x2' style='opacity:0;width:32px;height:32px'></td><td id='amx12x2' style='opacity:0;width:32px;height:32px'></td><td id='amx13x2' style='opacity:0;width:32px;height:32px'></td><td id='amx14x2' style='opacity:0;width:32px;height:32px'></td><td id='amx15x2' style='opacity:0;width:32px;height:32px'></td><td id='amx16x2' style='opacity:0;width:32px;height:32px'></td><td id='amx17x2' style='opacity:0;width:32px;height:32px'></td><td id='amx18x2' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x2' style='opacity:0;${water5}'></td>`;
  attractmapx += `<td id='amx20x2' style='opacity:0;${water6}'></td>`;
  attractmapx += `<td id='amx21x2' style='opacity:0;${water7}'></td>`;
  attractmapx += `<td id='amx22x2' style='opacity:0;${water0}'></td>`;
  attractmapx += `<td id='amx23x2' style='opacity:0;${water1}'></td></tr>`;
  attractmapx += `<tr><td id='amx1x3' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx2x3' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x3' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x3' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x3' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx6x3' style='opacity:0;width:32px;height:32px'></td><td id='amx7x3' style='opacity:0;width:32px;height:32px'></td><td id='amx8x3' style='opacity:0;width:32px;height:32px'></td><td id='amx9x3' style='opacity:0;width:32px;height:32px'></td><td id='amx10x3' style='opacity:0;width:32px;height:32px'></td><td id='amx11x3' style='opacity:0;width:32px;height:32px'></td><td id='amx12x3' style='opacity:0;width:32px;height:32px'></td><td id='amx13x3' style='opacity:0;width:32px;height:32px'></td><td id='amx14x3' style='opacity:0;width:32px;height:32px'></td><td id='amx15x3' style='opacity:0;width:32px;height:32px'></td><td id='amx16x3' style='opacity:0;width:32px;height:32px'></td><td id='amx17x3' style='opacity:0;width:32px;height:32px'></td><td id='amx18x3' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x3' style='opacity:0;${water0}'></div></td>`;
  attractmapx += `<td id='amx20x3' style='opacity:0;background-image:url("graphics/${dirtcoast[0]}"); background-position: ${dirtcoast[2]}px ${dirtcoast[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x3' style='opacity:0;background-image:url("graphics/${dirtcoast[0]}"); background-position: ${dirtcoast[2]}px ${dirtcoast[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x3' style='opacity:0;background-image:url("graphics/${dirtcoast[0]}"); background-position: ${dirtcoast[2]}px ${dirtcoast[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x3' style='opacity:0;${water4}'><div style='width:32px;height:32px;background-image:url("graphics/necoast-sand.gif");'></div></td></tr>`;
  attractmapx += `<tr><td id='amx1x4' style='opacity:0;${wall}'></td>`;
  attractmapx += `<td id='amx2x4' style='opacity:0;${wall}'></td>`;
  attractmapx += `<td id='amx3x4' style='opacity:0;${cobble}'><div style='width:32px;height:32px;background-image:url("graphics/${door[0]}");background-position:${door[2]}px ${door[3]}px'></div></td>`;
  attractmapx += `<td id='amx4x4' style='opacity:0;${wall}'></td>`;
  attractmapx += `<td id='amx5x4' style='opacity:0;${wall}'></td>`;
  attractmapx += `<td id='amx6x4' style='opacity:0;width:32px;height:32px'></td><td id='amx7x4' style='opacity:0;width:32px;height:32px'></td><td id='amx8x4' style='opacity:0;width:32px;height:32px'></td><td id='amx9x4' style='opacity:0;width:32px;height:32px'></td><td id='amx10x4' style='opacity:0;width:32px;height:32px'></td><td id='amx11x4' style='opacity:0;width:32px;height:32px'></td><td id='amx12x4' style='opacity:0;width:32px;height:32px'></td><td id='amx13x4' style='opacity:0;width:32px;height:32px'></td><td id='amx14x4' style='opacity:0;width:32px;height:32px'></td><td id='amx15x4' style='opacity:0;width:32px;height:32px'></td><td id='amx16x4' style='opacity:0;width:32px;height:32px'></td><td id='amx17x4' style='opacity:0;width:32px;height:32px'></td><td id='amx18x4' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x4' style='opacity:0;${dirt}'></td>`;
  attractmapx += `<td id='amx20x4' style='opacity:0;${dirt}'></td>`;
  attractmapx += `<td id='amx21x4' style='opacity:0;${dirt}'></td>`;
  attractmapx += `<td id='amx22x4' style='opacity:0;${dirt}'></td>`;
  attractmapx += `<td id='amx23x4' style='opacity:0;${dirt}'></td></tr>`;
  attractmapx += `<tr><td id='amx1x5' style='opacity:0;${sign}'></td>`;
  attractmapx += `<td id='amx2x5' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x5' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x5' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x5' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx6x5' style='opacity:0;width:32px;height:32px'></td><td id='amx7x5' style='opacity:0;width:32px;height:32px'></td><td id='amx8x5' style='opacity:0;width:32px;height:32px'></td><td id='amx9x5' style='opacity:0;width:32px;height:32px'></td><td id='amx10x5' style='opacity:0;width:32px;height:32px'></td><td id='amx11x5' style='opacity:0;width:32px;height:32px'></td><td id='amx12x5' style='opacity:0;width:32px;height:32px'></td><td id='amx13x5' style='opacity:0;width:32px;height:32px'></td><td id='amx14x5' style='opacity:0;width:32px;height:32px'></td><td id='amx15x5' style='opacity:0;width:32px;height:32px'></td><td id='amx16x5' style='opacity:0;width:32px;height:32px'></td><td id='amx17x5' style='opacity:0;width:32px;height:32px'></td><td id='amx18x5' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x5' style='opacity:0;${dirt}'></td>`;
  attractmapx += `<td id='amx20x5' style='opacity:0;${dirt}'></td>`;
  attractmapx += `<td id='amx21x5' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx22x5' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx23x5' style='opacity:0;${dirt}'></td></tr>`;
  attractmapx += `<tr><td id='amx1x6' style='opacity:0;${grass}'><div style='${post}'></div></td>`;
  attractmapx += `<td id='amx2x6' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x6' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x6' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x6' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx6x6' style='opacity:0;width:32px;height:32px'></td><td id='amx7x4' style='opacity:0;width:32px;height:32px'></td><td id='amx8x4' style='opacity:0;width:32px;height:32px'></td><td id='amx9x4' style='opacity:0;width:32px;height:32px'></td><td id='amx10x4' style='opacity:0;width:32px;height:32px'></td><td id='amx11x4' style='opacity:0;width:32px;height:32px'></td><td id='amx12x4' style='opacity:0;width:32px;height:32px'></td><td id='amx13x4' style='opacity:0;width:32px;height:32px'></td><td id='amx14x4' style='opacity:0;width:32px;height:32px'></td><td id='amx15x4' style='opacity:0;width:32px;height:32px'></td><td id='amx16x4' style='opacity:0;width:32px;height:32px'></td><td id='amx17x4' style='opacity:0;width:32px;height:32px'></td><td id='amx18x4' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x6' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx20x6' style='opacity:0;${brush}'></td>`;
  attractmapx += `<td id='amx21x6' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx22x6' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx23x6' style='opacity:0;${brush}'></td></tr>`;
  attractmapx += `<tr><td id='amx1x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx2x7' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x7' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x7' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx6x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx7x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx8x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx9x7' style='opacity:0;${brush}'></td>`;
  attractmapx += `<td id='amx10x7' style='opacity:0;${grass}'><div style='${tree}'></div></td>`;
  attractmapx += `<td id='amx11x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx12x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx13x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx14x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx15x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx16x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx17x7' style='opacity:0;${brush}'></td>`;
  attractmapx += `<td id='amx18x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx19x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx20x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx21x7' style='opacity:0;${brush}'></td>`;
  attractmapx += `<td id='amx22x7' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx23x7' style='opacity:0;${grass}'></td></tr>`;
  attractmapx += `<tr><td id='amx1x8' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx2x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx6x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx7x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx8x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx9x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx10x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx11x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx12x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx13x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx14x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx15x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx16x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx17x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx18x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx19x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx20x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx21x8' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx22x8' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx23x8' style='opacity:0;${grass}'></td></tr>`;
  attractmapx += `<tr><td id='amx1x9' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx2x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx6x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx7x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx8x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx9x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx10x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx11x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx12x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx13x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx14x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx15x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx16x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx17x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx18x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx19x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx20x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx21x9' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx22x9' style='opacity:0;${grass}'><div style='${wpnsign}'></div></td>`;
  attractmapx += `<td id='amx23x9' style='opacity:0;${grass}'><div style='${rightpost}'></div></td></tr>`;
  attractmapx += `<tr><td id='amx1x10' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx2x10' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x10' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x10' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x10' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx6x10' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx7x10' style='opacity:0;${brush}'></td>`;
  attractmapx += `<td id='amx8x10' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx9x10' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx10x10' style='opacity:0;${grass}'><div style='${tree}'></div></td>`;
  attractmapx += `<td id='amx11x10' style='opacity:0;${brush}'></td>`;
  attractmapx += `<td id='amx12x10' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx13x10' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx14x10' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx15x10' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx16x10' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx17x10' style='opacity:0;${brush}'></td>`;
  attractmapx += `<td id='amx18x10' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx19x10' style='opacity:0;${wall}'></td>`;
  attractmapx += `<td id='amx20x10' style='opacity:0;${wall}'></td>`;
  attractmapx += `<td id='amx21x10' style='opacity:0;${cobble}'><div style='width:32px;height:32px;background-image:url("graphics/${door[0]}");background-position:${door[2]}px ${door[3]}px'></div></td>`;
  attractmapx += `<td id='amx22x10' style='opacity:0;${wall}'></td>`;
  attractmapx += `<td id='amx23x10' style='opacity:0;${wall}'></td></tr>`;
  attractmapx += `<tr><td id='amx1x11' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx2x11' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x11' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x11' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x11' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx6x11' style='opacity:0;width:32px;height:32px'></td><td id='amx7x11' style='opacity:0;width:32px;height:32px'></td><td id='amx8x11' style='width:32px;height:32px'></td><td id='amx9x11' style='opacity:0;width:32px;height:32px'></td><td id='amx10x11' style='opacity:0;width:32px;height:32px'></td><td id='amx11x11' style='opacity:0;width:32px;height:32px'></td><td id='amx12x11' style='opacity:0;width:32px;height:32px'></td><td id='amx13x11' style='opacity:0;width:32px;height:32px'></td><td id='amx14x11' style='opacity:0;width:32px;height:32px'></td><td id='amx15x11' style='opacity:0;width:32px;height:32px'></td><td id='amx16x11' style='opacity:0;width:32px;height:32px'></td><td id='amx17x11' style='opacity:0;width:32px;height:32px'></td><td id='amx18x11' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmapx += `<td id='amx19x11' style='opacity:0;${wall}'></td>`;
  attractmapx += `<td id='amx20x11' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx21x11' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx22x11' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx23x11' style='opacity:0;${cobble}'></td></tr>`;
  attractmapx += `<tr><td id='amx1x12' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx2x12' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x12' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x12' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x12' style='opacity:0;${brush}'></td>`;
  attractmapx += `<td id='amx6x12' style='opacity:0;width:32px;height:32px'></td><td id='amx7x12' style='opacity:0;width:32px;height:32px'></td><td id='amx8x12' style='width:32px;height:32px'></td><td id='amx9x12' style='opacity:0;width:32px;height:32px'></td><td id='amx10x12' style='opacity:0;width:32px;height:32px'></td><td id='amx11x12' style='opacity:0;width:32px;height:32px'></td><td id='amx12x12' style='opacity:0;width:32px;height:32px'></td><td id='amx13x12' style='opacity:0;width:32px;height:32px'></td><td id='amx14x12' style='opacity:0;width:32px;height:32px'></td><td id='amx15x12' style='opacity:0;width:32px;height:32px'></td><td id='amx16x12' style='opacity:0;width:32px;height:32px'></td><td id='amx17x12' style='opacity:0;width:32px;height:32px'></td><td id='amx18x12' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmapx += `<td id='amx19x12' style='opacity:0;${wall}'></td>`;
  attractmapx += `<td id='amx20x12' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx21x12' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx22x12' style='opacity:0;${cobble}'><div style='width:32px;height:32px;background-image:url("graphics/civ_green.gif");'></div></td>`;
  attractmapx += `<td id='amx23x12' style='opacity:0;${cobble}'></td></tr>`;
  attractmapx += `<tr><td id='amx1x13' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx2x13' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x13' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x13' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x13' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx6x13' style='opacity:0;width:32px;height:32px'></td><td id='amx7x13' style='opacity:0;width:32px;height:32px'></td><td id='amx8x13' style='width:32px;height:32px'></td><td id='amx9x13' style='opacity:0;width:32px;height:32px'></td><td id='amx10x13' style='opacity:0;width:32px;height:32px'></td><td id='amx11x13' style='opacity:0;width:32px;height:32px'></td><td id='amx12x13' style='opacity:0;width:32px;height:32px'></td><td id='amx13x13' style='opacity:0;width:32px;height:32px'></td><td id='amx14x13' style='opacity:0;width:32px;height:32px'></td><td id='amx15x13' style='opacity:0;width:32px;height:32px'></td><td id='amx16x13' style='opacity:0;width:32px;height:32px'></td><td id='amx17x13' style='opacity:0;width:32px;height:32px'></td><td id='amx18x13' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmapx += `<td id='amx19x13' style='opacity:0;${wall}'></td>`;
  attractmapx += `<td id='amx20x13' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx21x13' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx22x13' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx23x13' style='opacity:0;${cobble}'></td></tr>`;
  attractmapx += `<tr><td id='amx1x14' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx2x14' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx3x14' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx4x14' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx5x14' style='opacity:0;${grass}'></td>`;
  attractmapx += `<td id='amx6x14' style='opacity:0;width:32px;height:32px'></td><td id='amx7x13' style='opacity:0;width:32px;height:32px'></td><td id='amx8x13' style='opacity:0;width:32px;height:32px'></td><td id='amx9x13' style='opacity:0;width:32px;height:32px'></td><td id='amx10x13' style='opacity:0;width:32px;height:32px'></td><td id='amx11x13' style='opacity:0;width:32px;height:32px'></td><td id='amx12x13' style='opacity:0;width:32px;height:32px'></td><td id='amx13x13' style='opacity:0;width:32px;height:32px'></td><td id='amx14x13' style='opacity:0;width:32px;height:32px'></td><td id='amx15x13' style='opacity:0;width:32px;height:32px'></td><td id='amx16x13' style='opacity:0;width:32px;height:32px'></td><td id='amx17x13' style='opacity:0;width:32px;height:32px'></td><td id='amx18x13' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmapx += `<td id='amx19x14' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx20x14' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx21x14' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx22x14' style='opacity:0;${cobble}'></td>`;
  attractmapx += `<td id='amx23x14' style='opacity:0;${cobble}'></td></tr>`;
  attractmapx += `</table>`;
  
  let attractdiv = document.getElementById("attract1");
  if (attractdiv) { 
    attractdiv.innerHTML = attractmap;
    attractdiv = document.getElementById("attract2");
    if (attractdiv) {
      attractdiv.innerHTML = attractmapx;
      tv.ExecuteAttract(0);
    }
  }
}

tv.DoActionTitle = function(code, e) {
  if (gamestate.getMode() === "intro") {
    if (code === 27) {
      tv.introidx = 8;
      tv.RunIntro(tv.introidx);
    } else if (IsWantedCode(code)) {
      tv.RunIntro(tv.introidx);
      tv.introidx++;
    }
  }
  if (gamestate.getMode() === "on") {
    if ((code === 38) || (code === 219)) {    // up arrow or [
      if (tv.optselect > 0) {
        let img = "opt" + tv.optselect;
        document.getElementById(img).classList.remove("menuselect");
        document.getElementById(img).classList.add("menuplain");
        tv.optselect--;
        img = "opt" + tv.optselect;
        if ((tv.optselect !== 2) || (gamestate.getLatestSaveIndex() !== -1)) {
          document.getElementById(img).classList.remove("menuplain");
          document.getElementById(img).classList.add("menuselect");            
        } else {
          tv.optselect--;
          img = "opt" + tv.optselect;
          document.getElementById(img).classList.remove("menuplain");
          document.getElementById(img).classList.add("menuselect");  
        }
      }
    }
    else if ((code === 40) || (code === 191)) {
      if (tv.optselect < 3) {
        let img = "opt" + tv.optselect;
        document.getElementById(img).classList.remove("menuselect");
        document.getElementById(img).classList.add("menuplain");
        tv.optselect++;
        img = "opt" + tv.optselect;
        if ((tv.optselect !== 2) || (gamestate.getLatestSaveIndex() !== -1)) {
          document.getElementById(img).classList.remove("menuplain");
          document.getElementById(img).classList.add("menuselect");            
        } else {
          tv.optselect++;
          img = "opt" + tv.optselect;
          document.getElementById(img).classList.remove("menuplain");
          document.getElementById(img).classList.add("menuselect");            
        }
      }
    }
    else if ((code === 32) || (code === 13)) {
      if (tv.optselect === 0) {
        tv.introidx = 0;
        tv.RunIntro(tv.introidx);
        tv.introidx++;
      }
      else if (tv.optselect === 1) {
        tv.CharCreate();
      }
      else if (tv.optselect === 2) {
//        window.open("game.html", "_self");
        tv.CreateGameSpace();
        if (DU.settings.getSetting("music")) {
          tv.dusong.song.pause();
        }
        tv.dusong = {};
        StartGame();
      }
      else if (tv.optselect === 3) {
        tv.MakeCredits(0);
      }
    }
  }
  else if (gamestate.getMode() === "name") {
    if (((code >= 65) && (code <= 90)) || (code === 32)) {
      if (tv.charname.length < 15) {
        let letter = String.fromCharCode(code);  
        if (!e.shiftKey) {
          letter = letter.toLowerCase();
        }
        tv.charname += letter;
        let chartxt = "<span style='color:gold'>" + tv.charname + "</span>";
        if (tv.charname.length < 15) { chartxt += "_"; }
        document.getElementById('charprompt').innerHTML = chartxt;
      }
    } else if (code === 8) {  // backspace
      if (tv.charname.length) {
        tv.charname = tv.charname.substring(0,tv.charname.length-1);
        let chartxt = "<span style='color:gold'>" + tv.charname + "</span>_";
        document.getElementById('charprompt').innerHTML = chartxt;
      }
    } else if (code === 13) { // enter
      if (tv.charname.length) {
        document.getElementById('charprompt').innerHTML = "";
        let chartxt = "<span style='color:gold'>" + tv.charname + "</span><br /><br />";
        document.getElementById('prompttext').innerHTML = chartxt;
        tv.SweepLetters("Specify your gender: (M)ale, (F)emale, or (O)ther/decline to state", "prompttext");
        gamestate.setMode("gender");
      }
    }
  } else if (gamestate.getMode() === "gender") {
    if (code === 70) {
      tv.gender = "female";
      tv.ChooseGraphic();
    } else if (code === 79) {
      tv.gender = "other";
      tv.ChooseGraphic();
    } else if (code === 77) {
      tv.gender = "male";
      tv.ChooseGraphic();
    }
  } else if (gamestate.getMode() === "graphic") {
    if ((code === 38) || (code === 219)) { // up
 
    } else if ((code === 37) || (code === 186)) {  // left
      if (tv.avatarselect.x > 0) {
        document.getElementById(tv.avatarselect.y + "x" + tv.avatarselect.x).style.backgroundColor = "black";
        tv.avatarselect.x--;
        document.getElementById(tv.avatarselect.y + "x" + tv.avatarselect.x).style.backgroundColor = "white";
      }
    } else if ((code === 39) || (code === 222)) { // right
      if (tv.avatarselect.x < 5) {
        document.getElementById(tv.avatarselect.y + "x" + tv.avatarselect.x).style.backgroundColor = "black";
        tv.avatarselect.x++;
        document.getElementById(tv.avatarselect.y + "x" + tv.avatarselect.x).style.backgroundColor = "white";
      }
    } else if ((code === 40) || (code === 191)) { // down
 
    } else if ((code === 32) || (code === 13)) { // space or enter
//      graphic = avatars[tv.avatarselect.y][tv.avatarselect.x];
      tv.graphic = "spacer.gif";
      targetCursor.page = 0;
      gamestate.setMode("ccoptions");
      DU.gameflags.setFlag("potionsrevealed", "all");
      DU.gameflags.setFlag("allowjournal",1);
      DU.gameflags.setFlag("allowautomap",1);
      DU.gameflags.setFlag("sticky_target",1);
      DU.gameflags.setFlag("move_opens_doors",1);
      tv.CharCreateOptions();

    }
  } else if (gamestate.getMode() === "ccoptions") {
    if ((code === 38) || (code === 219)) { // up
      if (targetCursor.page === 0) {
        targetCursor.page = 8;
      } else {
        targetCursor.page = targetCursor.page-1;
      }
      tv.CharCreateOptions();
    } else if ((code === 37) || (code === 186)) {  // left
      if (targetCursor.page === 0) {
        if (DU.gameflags.getFlag("storymode")) { DU.gameflags.setFlag("storymode",0); }
        else { DU.gameflags.setFlag("storymode",1); }
      } else if (targetCursor.page === 1) {
        if (DU.gameflags.getFlag("potionsrevealed") === "all") { DU.gameflags.setFlag("potionsrevealed","roguelike"); }
        else if (DU.gameflags.getFlag("potionsrevealed") === "blind") { DU.gameflags.setFlag("potionsrevealed","all"); }
        else { DU.gameflags.setFlag("potionsrevealed", "blind"); }
      } else if (targetCursor.page === 2) {
        if (DU.gameflags.getFlag("allowjournal")) { DU.gameflags.setFlag("allowjournal",0); }
        else { DU.gameflags.setFlag("allowjournal",1); }
      } else if (targetCursor.page === 3) {
        if (DU.gameflags.getFlag("allowautomap")) { DU.gameflags.setFlag("allowautomap",0); }
        else { DU.gameflags.setFlag("allowautomap",1); }
      } else if (targetCursor.page === 4) {
        if (DU.gameflags.getFlag("sticky_target")) { DU.gameflags.setFlag("sticky_target",0); }
        else { DU.gameflags.setFlag("sticky_target",1); }
      } else if (targetCursor.page === 5) {
        if (DU.gameflags.getFlag("move_opens_doors")) { DU.gameflags.setFlag("move_opens_doors",0); }
        else { DU.gameflags.setFlag("move_opens_doors",1); }
      } else if (targetCursor.page === 6) {
        if (DU.gameflags.getFlag("move_attacks")) { DU.gameflags.setFlag("move_attacks",0); }
        else { DU.gameflags.setFlag("move_attacks",1); }
      } else if (targetCursor.page === 7) {
        if (DU.gameflags.getFlag("skip_theft_warning")) { DU.gameflags.setFlag("skip_theft_warning",0); }
        else { DU.gameflags.setFlag("skip_theft_warning",1); }
      }
      if (targetCursor.page !== 8) { tv.CharCreateOptions(); }
    } else if ((code === 39) || (code === 222)) { // right
      if (targetCursor.page === 0) {
        if (DU.gameflags.getFlag("storymode")) { DU.gameflags.setFlag("storymode",0); }
        else { DU.gameflags.setFlag("storymode",1); }
      } else if (targetCursor.page === 1) {
        if (DU.gameflags.getFlag("potionsrevealed") === "all") { DU.gameflags.setFlag("potionsrevealed","blind"); }
        else if (DU.gameflags.getFlag("potionsrevealed") === "blind") { DU.gameflags.setFlag("potionsrevealed","roguelike"); }
        else { DU.gameflags.setFlag("potionsrevealed", "all"); }
      } else if (targetCursor.page === 2) {
        if (DU.gameflags.getFlag("allowjournal")) { DU.gameflags.setFlag("allowjournal",0); }
        else { DU.gameflags.setFlag("allowjournal",1); }
      } else if (targetCursor.page === 3) {
        if (DU.gameflags.getFlag("allowautomap")) { DU.gameflags.setFlag("allowautomap",0); }
        else { DU.gameflags.setFlag("allowautomap",1); }
      } else if (targetCursor.page === 4) {
        if (DU.gameflags.getFlag("sticky_target")) { DU.gameflags.setFlag("sticky_target",0); }
        else { DU.gameflags.setFlag("sticky_target",1); }
      } else if (targetCursor.page === 5) {
        if (DU.gameflags.getFlag("move_opens_doors")) { DU.gameflags.setFlag("move_opens_doors",0); }
        else { DU.gameflags.setFlag("move_opens_doors",1); }
      } else if (targetCursor.page === 6) {
        if (DU.gameflags.getFlag("move_attacks")) { DU.gameflags.setFlag("move_attacks",0); }
        else { DU.gameflags.setFlag("move_attacks",1); }
      } else if (targetCursor.page === 7) {
        if (DU.gameflags.getFlag("skip_theft_warning")) { DU.gameflags.setFlag("skip_theft_warning",0); }
        else { DU.gameflags.setFlag("skip_theft_warning",1); }
      }
      if (targetCursor.page !== 8) { tv.CharCreateOptions(); }
    } else if ((code === 40) || (code === 191)) { // down
      if (targetCursor.page === 8) {
        targetCursor.page = 0;
      } else {
        targetCursor.page = targetCursor.page+1;
      }
      tv.CharCreateOptions();
    } else if ((code === 32) || (code === 13)) { // space or enter
      if (targetCursor.page === 0) {
        if (DU.gameflags.getFlag("storymode")) { DU.gameflags.setFlag("storymode",0); }
        else { DU.gameflags.setFlag("storymode",1); }
      } else if (targetCursor.page === 1) {
        if (DU.gameflags.getFlag("potionsrevealed") === "all") { DU.gameflags.setFlag("potionsrevealed","blind"); }
        else if (DU.gameflags.getFlag("potionsrevealed") === "blind") { DU.gameflags.setFlag("potionsrevealed","roguelike"); }
        else { DU.gameflags.setFlag("potionsrevealed", "all"); }
      } else if (targetCursor.page === 2) {
        if (DU.gameflags.getFlag("allowjournal")) { DU.gameflags.setFlag("allowjournal",0); }
        else { DU.gameflags.setFlag("allowjournal",1); }
      } else if (targetCursor.page === 3) {
        if (DU.gameflags.getFlag("allowautomap")) { DU.gameflags.setFlag("allowautomap",0); }
        else { DU.gameflags.setFlag("allowautomap",1); }
      } else if (targetCursor.page === 4) {
        if (DU.gameflags.getFlag("sticky_target")) { DU.gameflags.setFlag("sticky_target",0); }
        else { DU.gameflags.setFlag("sticky_target",1); }
      } else if (targetCursor.page === 5) {
        if (DU.gameflags.getFlag("move_opens_doors")) { DU.gameflags.setFlag("move_opens_doors",0); }
        else { DU.gameflags.setFlag("move_opens_doors",1); }
      } else if (targetCursor.page === 6) {
        if (DU.gameflags.getFlag("move_attacks")) { DU.gameflags.setFlag("move_attacks",0); }
        else { DU.gameflags.setFlag("move_attacks",1); }
      } else if (targetCursor.page === 7) {
        if (DU.gameflags.getFlag("skip_theft_warning")) { DU.gameflags.setFlag("skip_theft_warning",0); }
        else { DU.gameflags.setFlag("skip_theft_warning",1); }
      } else {
        tv.SaveChar();
        tv.SecondPage();
      }
      
      if (targetCursor.page !== 8) { tv.CharCreateOptions(); }
    }

  } else if (gamestate.getMode() === "credits") {
    tv.MakeCredits(tv.creditsPage+1);
  }
}

tv.CharCreateOptions = function() {
  let charopts = "<div class='zstats'><p style='text-align:center'>Game Start Options</p>";
  charopts += "<table cellpadding='0' cellspacing='10' border='0'><tr><td><table cellpadding='2' cellspacing='2' border='0' style='background-color:black; width:250px'>";
//  charopts += "<tr><td>&nbsp;&nbsp;</td><td>&nbsp;</td></tr>";
//  charopts += "<tr><td colspan='2'>=======GAMEPLAY======</td><td></td><td></td></tr>";
  charopts += "<tr><td>DIFFICULTY: </td><td ";
  if (targetCursor.page === 0) {
    charopts += "class='highlight'";
  }
  charopts += ">";
  if (DU.gameflags.getFlag("storymode")) {
    charopts += "STORY";
  } else {
    charopts += "NORMAL";
  }
  charopts += "</td></tr>";

  charopts += "<tr><td>POTION KNOWLEDGE: </td><td ";
  if (targetCursor.page === 1) {
    charopts += "class='highlight'";
  }
  charopts += " style='width:80'>";
  if (DU.gameflags.getFlag("potionsrevealed") === "all") {
    charopts += "ALL";
  } else if (DU.gameflags.getFlag("potionsrevealed") === "blind") {
    charopts += "BLIND";
  } else {
    charopts += "ROGUELIKE";
  }
  charopts += "</td></tr>";
  
  charopts += "<tr><td>USE QUEST JOURNAL: </td><td ";
  if (targetCursor.page === 2) {
    charopts += "class='highlight'";
  }
  charopts += ">";
  if (DU.gameflags.getFlag("allowjournal")) {
    charopts += "YES";
  } else {
    charopts += "NO";
  }
  charopts += "</td></tr>";

  charopts += "<tr><td>USE AUTOMAP: </td><td ";
  if (targetCursor.page === 3) {
    charopts += "class='highlight'";
  }
  charopts += ">";
  if (DU.gameflags.getFlag("allowautomap")) {
    charopts += "YES";
  } else {
    charopts += "NO";
  }
  charopts += "</td></tr>";

  charopts += "<tr><td>STICKY TARGETING: </td><td ";
  if (targetCursor.page === 4) {
    charopts += "class='highlight'";
  }
  charopts += ">";
  if (DU.gameflags.getFlag("sticky_target")) {
    charopts += "YES";
  } else {
    charopts += "NO";
  }
  charopts += "</td></tr>";

  charopts += "<tr><td>MOVE OPENS DOORS: </td><td ";
  if (targetCursor.page === 5) {
    charopts += "class='highlight'";
  }
  charopts += ">";
  if (DU.gameflags.getFlag("move_opens_doors")) {
    charopts += "YES";
  } else {
    charopts += "NO";
  }
  charopts += "</td></tr>";

  charopts += "<tr><td>MOVE ATTACKS: </td><td ";
  if (targetCursor.page === 6) {
    charopts += "class='highlight'";
  }
  charopts += ">";
  if (DU.gameflags.getFlag("move_attacks")) {
    charopts += "YES";
  } else {
    charopts += "NO";
  }
  charopts += "</td></tr>";

  charopts += "<tr><td>SKIP THEFT WARNING: </td><td ";
  if (targetCursor.page === 7) {
    charopts += "class='highlight'";
  }
  charopts += ">";
  if (DU.gameflags.getFlag("skip_theft_warning")) {
    charopts += "YES";
  } else {
    charopts += "NO";
  }

  charopts += "</td></tr>";

  charopts += "<tr><td style='text-align:center'><span ";
  if (targetCursor.page === 8) {
    charopts += "class='highlight' ";
  }
  charopts += ">SAVE</span></td></tr>";

  charopts += "</table>";
  charopts += "</td><td>";

  charopts += "<div style='border-style:solid; border-radius:5px; padding: 5px; margin-left: 40px; width: 400; height: 220'>";

  if (targetCursor.page === 0) {
    charopts += "<center>GAME DIFFICULTY</center><br />";
    charopts += "In STORY difficulty, it is impossible to die in combat."; 
  } else if (targetCursor.page === 1) {
    charopts += "<center>POTION KNOWLEDGE</center><br />";
    charopts += "ALL: You will automtically know what each color of potion does. This is the default.<br />";
    charopts += "BLIND: To learn what a potion does, you must use it, buy it, or sell it.<br />";
    charopts += "ROGUELIKE: Works like Blind, but at character creation, the effects of the colors are shuffled so you cannot remember from a previous game or look them up.";
  } else if (targetCursor.page === 2) {
    charopts += "<center>QUEST JOURNAL</center><br />";
    charopts += "Disable the quest journal if you want the old-school experience of having to take all your own notes.";
  } else if (targetCursor.page === 3) {
    charopts += "<center>AUTOMAP</center><br />";
    charopts += "Disable the automapper if you want the old-school experience of having to make your own maps on graph paper.";
  } else if (targetCursor.page === 4) {
    charopts += "<center>STICKY TARGETING</center><br />";
    charopts += "When enabled, things that target (like attacking and spellcasting) will remember what you last targetted. Otherwise, the target cursor will always start on your position.";
  } else if (targetCursor.page === 5) {
    charopts += "<center>MOVE OPENS DOORS</center><br />";
    charopts += "When enabled, if you use a movement key and bump into a closed door, you will automatically perform the (U)se action on the door. Otherwise, you have to Use or Open it.";
  } else if (targetCursor.page === 6) {
    charopts += "<center>MOVE ATTACKS</center><br />";
    charopts += "When enabled, if you use a movement key and bump into an enemy, you will perform a melee attack against it. Otherwise, you must Attack.";
  } else if (targetCursor.page === 7) {
    charopts += "<center>SKIP THEFT WARNING</center><br />";
    charopts += "When enabled, the game will not warn you when opening or taking something would be considered stealing. Unwise.";
  } 

  charopts += "</div><p style='text-align:center'>NOTE: Even these options can be changed once the game has begun.";

  charopts += "</table></center>";
  
  document.getElementById('maindiv').innerHTML = charopts;
}

tv.SweepLetters = function(text, where) {
  if (tv.sweepid) { clearTimeout(tv.sweepid); }
  let place = document.getElementById(where);
  if (!place) { return; }
  let letter = text.substr(0,1);
  let rest = text.substr(1);
  place.innerHTML = place.innerHTML + letter;
  if (rest) {
    tv.sweepid = setTimeout(function() { tv.SweepLetters(rest,where) }, 10);
  }
}

tv.CharCreate = function() {
  tv.charname = "";
  tv.gender = "";
  tv.graphic = "";
  let charprompt = "<div style='position:absolute;left:100px;top:100px'><p class='charcreate' id='prompttext'></p><p class='charcreate' id='charprompt'>_</p></div>";
  document.getElementById('maindiv').innerHTML = charprompt;
  tv.SweepLetters("Enter character name:", "prompttext");
  gamestate.setMode("name");
}

tv.ChooseGraphic = function() {
  gamestate.setMode("graphic");
  let chartxt = "<div style='position:absolute;left:100px;top:100px'><p class='charcreate'><span style='color:gold'>" + tv.charname + "</span><br /><span style='color:white'>";
  if (tv.gender === "male") { chartxt += "Male"; }
  if (tv.gender === "female") { chartxt += "Female"; }
  if (tv.gender === "other") { chartxt += "Other"; }
  chartxt += "</span></p><p class='charcreate'></p>";
  
  chartxt += "<table cellpadding='0' cellspacing='10' cellborder='0'>";
  chartxt += "<tr>";
//  for (let i=0; i<tv.nuavatars.length; i++) {
//        chartxt += "<td id='0x" + i + "' style='position:relative; width:68px; height:68px; '>";
//        chartxt += `<div style='position:absolute;left:2;top:2; background-color: #333333; width:64px; height: 64px'></div>`;
//        let xpos = HumanParts[tv.nuavatars[i][0]].spritex;
//        let ypos = HumanParts[tv.nuavatars[i][0]].spritey;
//        let source = HumanParts[tv.nuavatars[i][0]].src;
//        chartxt += `<div style='position:absolute;left:18;top:18;background-image:url("graphics/${source}");background-position: ${xpos}px ${ypos}px; width:32px; height: 32px; transform:scale(2)'></div>`;
//        xpos = HumanParts[tv.nuavatars[i][1]].spritex;
//        ypos = HumanParts[tv.nuavatars[i][1]].spritey;
//        source = HumanParts[tv.nuavatars[i][1]].src;
//        chartxt += `<div style='position:absolute;left:18;top:18;background-image:url("graphics/${source}");background-position: ${xpos}px ${ypos}px; width:32px; height: 32px; transform:scale(2)'></div>`;
//        xpos = HumanParts[tv.nuavatars[i][2]].spritex;
//        ypos = HumanParts[tv.nuavatars[i][2]].spritey;
//        source = HumanParts[tv.nuavatars[i][2]].src;
//        chartxt += `<div style='position:absolute;left:18;top:18;background-image:url("graphics/${source}");background-position: ${xpos}px ${ypos}px; width:32px; height: 32px; transform:scale(2)'></div>`;
//        xpos = HumanParts[tv.nuavatars[i][3]].spritex;
//        ypos = HumanParts[tv.nuavatars[i][3]].spritey;
//        source = HumanParts[tv.nuavatars[i][3]].src;
//        chartxt += `<div style='position:absolute;left:18;top:18;background-image:url("graphics/${source}");background-position: ${xpos}px ${ypos}px; width:32px; height: 32px; transform:scale(2)'></div>`;
//        chartxt += '</td>';
//  }
  for (let i=0;i<6;i++) {
    chartxt += "<td id='0x" + i + "' style='position:relative; width:68px; height:68px; '>";
    chartxt += `<div style='position:absolute;left:2;top:2; background-color: #555555; width:64px; height: 64px'></div>`;
    let source = "humancharcreate.gif";
    chartxt += `<div style='position:absolute;left:2;top:2;background-image:url("graphics/${source}");background-position: ${-1*i*64}px 0px; width:64px; height: 64px;'></div></td>`;
  }
  chartxt += "</tr>";
  chartxt += "</table></div>";
  document.getElementById('maindiv').innerHTML = chartxt;
  tv.SweepLetters("Choose your avatar:", "charcreate");
  document.getElementById('0x0').style.backgroundColor = "white";
}

tv.SaveChar = function() {
  DU.merchants = {};
  DU.merchants = SetMerchants();
  DU.randomseed = Math.floor(Math.random()*100)+1;
  
  PC.setPCName(tv.charname);
  PC.setGraphic(tv.graphic);
  PC.setGender(tv.gender);
  PC.wornlayers = {
    body: tv.nuavatars[tv.avatarselect.x][0],
    head: tv.nuavatars[tv.avatarselect.x][1],
    back: null,
    offhand: tv.nuavatars[tv.avatarselect.x][3],
    cloak: null,
    mainhand: tv.nuavatars[tv.avatarselect.x][2],
    realhead: tv.nuavatars[tv.avatarselect.x][1]
  };
  PC.wornlayernudges = {
    body: { x: 0, y: 0 },
    head: { x: 0, y: 0 },
    back: { x: 0, y: 0 },
    offhand: { x: 0, y: 0 },
    cloak: { x: 0, y: 0 },
    mainhand: { x: 0, y: 0 }
  };
  PC.makeLayers();
  PC.skintone = tv.nuavskin[tv.avatarselect.x];
  
  tv.themap = maps.addMap("ellusus");
  maps.addMap("ellusus_limbo");
  maps.addMap("underworld");

  PC.setHomeMap(tv.themap);
  PC.setx(69);
  PC.sety(74);
  PC.getHomeMap().placeThing(PC.getx(),PC.gety(),PC);
  let dagger = localFactory.createTile("Dagger");
  PC.addToInventory(dagger, 1);

  tv.RandomizePotions();

  dagger.equipMe(PC);
//  PC.setEquipment("weapon",dagger);
  let armor = localFactory.createTile("ClothArmor");
  PC.addToInventory(armor, 1);
  armor.equipMe(PC);
//  PC.setEquipment("armor",armor);
  let homekey = localFactory.createTile("HomeKey");
  PC.addToInventory(homekey,1);

  DU.gameflags.setFlag("knows_avery", 1);
  DU.gameflags.setFlag("coward", 0); 
  questlog.activate(0);
  
  let PCEvent = new GameEvent(PC);
	DUTime.addAtTimeInterval(PCEvent,.0001);
	
	gamestate.saveGame(9);
	
  saveIndex[9].loc = "Char Create";
//	localStorage.saveIndex = JSON.stringify(testvar);
}

tv.RunIntro = function(idx) {
  if (idx === 0) {
    gamestate.setMode("null");
    if (DU.settings.getSetting("music")) {
      tv.dusong.song.pause();
      tv.dusong = {};
      tv.dusong.name = "Charcreate";
      tv.dusong.song = new Audio(GetMusicPath("Charcreate"));
      tv.dusong.song.play();
      tv.dusong.song.loop = true;
      tv.dusong.song.volume = DU.settings.getSetting("music")/10;
    }

    let firstpage = `<div style='width:770;position: relative;left:5px;top:15px' id='introcontainer'>
      <table cellpadding='0' cellspacing='5' border='0'><tr>
      <td id='splash'><img id='splash1' src='graphics/splash/Castle-Day-NoRider.gif' /></td>
      <td style='vertical-align:top; padding-top: 4px' id='splashtxt'><div id='intro1' style='color:white;padding-left:5px'><p class='charcreate'>You were born the second child of King Daragen and Queen Shelaria Yggdras of the ruling family of Ellusus. Being the younger, your life is full of tutors and lessons, but also opportunity, for the weight of being heir falls upon your brother, Prince Lance.</p></div>
      <div id='intro2' style='color:white;opacity:0'><p class='charcreate'>And Lance seemed made for the role. All things came easily to him- his studies of magic, of combat, of dance, of diplomacy. Which makes these events all the more surprising.</p></div>
      </td></tr></table>
    </div>`;
    document.getElementById('maindiv').classList.add('titlefadeout');
    setTimeout(function() {
      document.getElementById('maindiv').innerHTML = firstpage;
      document.getElementById('maindiv').classList.remove('titlefadeout');
      document.getElementById('maindiv').classList.add('presentfadein');
      gamestate.setMode("intro");
    },1000);
  } else if (idx === 1) {
    document.getElementById('intro2').classList.add('presentfadein');
  } else if (idx === 2) {
    document.getElementById('splash1').classList.add('titlefadeout');
    document.getElementById('splashtxt').classList.add('titlefadeout');
    setTimeout(function() {
      document.getElementById('splash').innerHTML = `<img id='splash2' style='opacity:0' src='graphics/splash/Castle-Night.gif' />`;
      document.getElementById('splash').classList.remove('titlefadeout');
      document.getElementById('splashtxt').classList.remove('titlefadeout');  
      document.getElementById('splashtxt').innerHTML = `<div id='intro3' style='color:white;opacity:0'><p class='charcreate'>Which is not to say that you did not excel, when you began your studies years behind your older brother. Guard Captain Nyrani has been teaching you to fight with a variety of weapons. Your tutor in wizardry says that you show promise, and someday will earn your own spellbook. And you have surprised your parents with your skill on the harpsichord. Of limited use in statecraft, perhaps, but still satisfying.</p></div>
      <div id='intro4' style='color:white;opacity:0'><p class='charcreate'>The land has been at peace since the end of the civil war nearly 40 years ago. Six years ago, your grandfather passed away and your parents ascended the throne of Ellusus. The transition was smooth, and while King Erik was beloved as the one who had ended the war, that goodwill had seemed to pass readily enough to the new monarchs.</p></div>`;
      document.getElementById('intro3').classList.add('presentfadein');
      document.getElementById('splash2').classList.add('presentfadein');  
    },1000);
  } else if (idx === 3) {
    document.getElementById('intro4').classList.add('presentfadein');
  } else if (idx === 4) {
    document.getElementById('splash2').classList.remove('presentfadein');  
    document.getElementById('splash2').classList.add('titlefadeout');
    document.getElementById('splashtxt').classList.add('titlefadeout');
    setTimeout(function() {
      document.getElementById('splashtxt').classList.remove('titlefadeout'); 
      document.getElementById('splash').innerHTML = `<img id='splash3' style='opacity:0' src='graphics/splash/Lance.png' />`;
      document.getElementById('splashtxt').innerHTML = `<div id='intro5' style='color:white;opacity:0'><p class='charcreate'>Lance, then, completed his tutelage a few years ago and was then charged with getting to know the kingdom, and so he has been away traveling, and you have not seen him in some time. There are rumors of the time he has spent- he has saved an old crone, and won a boon; he has battled a dragon; he has fallen into drunkenness and embarrassed your parents.</p></div>
      `;
      document.getElementById('intro5').classList.add('presentfadein');
      document.getElementById('splash3').classList.add('presentfadein');  
    },1000);
  } else if (idx === 5) {
    document.getElementById('splash3').classList.remove('presentfadein');  
    document.getElementById('splash3').classList.add('titlefadeout');
    document.getElementById('splashtxt').classList.add('titlefadeout');
    setTimeout(function() {
      document.getElementById('splash').innerHTML = `<img id='splash4' style='opacity:0' src='graphics/splash/Training.png' />`;
      document.getElementById('splashtxt').classList.remove('titlefadeout');  
      document.getElementById('splashtxt').innerHTML = `<div id='intro6' style='color:white;opacity:0'><p class='charcreate'>You are meanwhile ensconced in a house on the outskirts of the nearby village of Naurglen. It is less necessary for you to be at the center of things, and it is quieter here. You pursue your studies, and visit when the mood strikes you.</p></div>
      <div id='intro7' style='color:white;opacity:0'><p class='charcreate'>But a few months ago, Lance moved into an old castle, ruined from the war, and began rebuilding. And then, to the surprise of everyone, he planted his banner and declared that he was in rebellion- that he, rather than your father, should rule Ellusus.</p></div>`;
      document.getElementById('intro6').classList.add('presentfadein');
      document.getElementById('splash4').classList.add('presentfadein');  
    },1000);
  } else if (idx === 6) {
    document.getElementById('intro7').classList.add('presentfadein');
  } else if (idx === 7) {
    document.getElementById('splash4').classList.remove('presentfadein');  
    document.getElementById('splash4').classList.add('titlefadeout');
    document.getElementById('splashtxt').classList.add('titlefadeout');
    setTimeout(function() {
      document.getElementById('splash').innerHTML = `<img id='splash5' style='opacity:0' src='graphics/splash/Castle-Day-Rider.gif' />`;
      document.getElementById('splashtxt').classList.remove('titlefadeout');  
      document.getElementById('splashtxt').innerHTML = `
      <div id='intro8' style='color:white;opacity:0'><p class='charcreate'>Shocked and saddened, your parents have summoned you to the ruling seat, Castle dea Yggdras. The time for study is over. The time for leisure is past. You lock your dwelling behind you, and now as you stand outside the gates you prepare to enter and learn what lies in store for you...</p></div>`;
      document.getElementById('intro8').classList.add('presentfadein');
      document.getElementById('splash5').classList.add('presentfadein');  
    },1000);
  } else if (idx === 8) {
    gamestate.setMode("null");
    document.getElementById('splash5').classList.remove('presentfadein');  
    document.getElementById('splash5').classList.add('titlefadeout');
    document.getElementById('splashtxt').classList.add('titlefadeout');
    setTimeout(function() {
      tv.SecondPage();
      if (DU.settings.getSetting("music")) {
        tv.dusong.song.pause();
        tv.dusong = {};
        tv.dusong.name = "Dark Unknown";
        tv.dusong.song = new Audio(GetMusicPath("Dark Unknown"));
        tv.dusong.song.play();
        tv.dusong.song.loop = true;
        tv.dusong.song.volume = DU.settings.getSetting("music")/10;
      }
  
    },1000);
  }
  return;
}

tv.CreateGameSpace = function() {
//  tv.optnames = [];
//  avatars = [];
  tv.avatarselect = {};

  document.removeEventListener("keydown", tv.el);

  document.getElementById('gamebody').innerHTML = `<div id="worldlayer" style="position:absolute;left:20px;top:20px;width:416px;height:416px;z-index:10"><img src="graphics/spacer.gif" width='416' height='416' /></div>
	
  <div id="gamecontainer" style="position:abolute;left:0px;top:0px;z-index:-10; background-color:black;">
    <div style="position:absolute;left:0px;top:0px;z-index:99;width:776px"><img src="graphics/frame/frame6a.gif" /></div>
    <div style="position:absolute;left:128px;top:1px;width:16px;height:16px;" id="sky12"></div><div style="position:absolute;left:144px;top:1px;width:16px;height:16px;" id="sky11"></div><div style="position:absolute;left:160px;top:1px;width:16px;height:16px;" id="sky10"></div><div style="position:absolute;left:176px;top:1px;width:16px;height:16px;" id="sky9"></div><div style="position:absolute;left:192px;top:1px;width:16px;height:16px;" id="sky8"></div><div style="position:absolute;left:208px;top:1px;width:16px;height:16px;" id="sky7"></div><div style="position:absolute;left:224px;top:1px;width:16px;height:16px;" id="sky6"></div><div style="position:absolute;left:240px;top:1px;width:16px;height:16px;" id="sky5"></div><div style="position:absolute;left:256px;top:1px;width:16px;height:16px;" id="sky4"></div><div style="position:absolute;left:272px;top:1px;width:16px;height:16px;" id="sky3"></div><div style="position:absolute;left:288px;top:1px;width:16px;height:16px;" id="sky2"></div><div style="position:absolute;left:306px;top:1px;width:16px;height:16px;" id="sky1"></div>
    <div style="position:absolute;left:128px;top:1px;width:196px;height:16px;z-index:100;text-align:center;color:white" class="oversky" id="oversky"></div>
    <div style="position:absolute;left:100px;top:437px;width:256px;z-index:100;background-color:black" class="topbar" id="topbarframe">Loading...</div>
    <div style="position:absolute;left:20px;top:20px;width:416px;height:416px;z-index:20;" class="mainframe" id="displayframe">&nbsp;</div>
    <div style="position:absolute;left:458px;top:18px;width:300px;height:40px;background-color:black;z-index:99;" id="charstats" class="charstats" onClick="DoAction(90)">&nbsp;</div>
    <div style="position:absolute;left:458px;top:80px;width:300px;height:356px;background-color:black;z-index:99;" id="textframe" class="textframe">
      <div id="maintextframe" class="maintextframe"><div id="innertextframe" class="innertextframe">&nbsp;</div></div>
      <div id="inputtext" class="inputtext">&nbsp;</div>
    </div>
    
  </div>
          <div class="spellbook" id="spellbookdiv" style="position:absolute; left:150px; top:50px; z-index:100;"><div id="spellbookinnerdiv"> <p>Spellbook test.</p></div></div>
          <div id="combateffects" style="position:absolute; left: 20px; top: 20px; z-index: 60; width:416px; height:416px;"></div>
          <div id="spelleffects" style="position:absolute; left: 19px; top: 20px; z-index: 65; width:417px; height:416px; padding-left:1px"></div>
          <div id="audiocontainer" style="display:none"></div>
          <div id="uiinterface" style="position:absolute; left: 19px; top: 20px; z-index: 70; width:416px; height:416px;"></div>
          <img id="turnframe" src="graphics/frame/turn-frame-friendly.gif" style="position:absolute; left: 0px; top: 0px; z-index:65; display:none; width:36px; height:36px" /> `;
}

tv.ExecuteAttract = function(frame) {
  let board1 = document.getElementById("attract1");
  let door = localFactory.createTile("DoorWindow").getGraphicArray();
  let opendoor = ["master_spritesheet.png",0,-192,-704];
  let chair = localFactory.createTile("LeftChair").getGraphicArray();
  let food = localFactory.createTile("FoodSouth").getGraphicArray();
  let tableedge = localFactory.createTile("LeftTable").getGraphicArray();
  let fireball;

  if (!board1) { return; }
  let dur = 500;
  switch (frame) {
    case 0:
      tv.ShowTiles("",10,7,14,10,1);
      dur = 3000;
      break;
    case 1:
      document.getElementById("am12x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      break;
    case 2:
      document.getElementById("am12x8").innerHTML = ``;
      document.getElementById("am13x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",10,7,10,10);
      tv.ShowTiles("",15,7,15,10);
      break;
    case 3:
      document.getElementById("am13x8").innerHTML = ``;
      document.getElementById("am14x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",11,7,11,10);
      tv.ShowTiles("",16,7,16,10);
      break;
    case 4:
      document.getElementById("am14x8").innerHTML = ``;
      document.getElementById("am15x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",12,7,12,10);
      tv.ShowTiles("",17,7,17,10);
      break;
    case 5:
      document.getElementById("am15x8").innerHTML = ``;
      document.getElementById("am16x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",13,7,13,10);
      tv.ShowTiles("",18,7,18,10);
      break;
    case 6:
      document.getElementById("am16x8").innerHTML = ``;
      document.getElementById("am17x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",14,7,14,10);
      tv.ShowTiles("",19,7,19,10);
      break;
    case 7:
      document.getElementById("am17x8").innerHTML = ``;
      document.getElementById("am18x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",15,7,15,10);
      tv.ShowTiles("",20,7,20,10);
      break;
    case 8:
      document.getElementById("am18x8").innerHTML = ``;
      document.getElementById("am19x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",16,7,16,10);
      tv.ShowTiles("",21,7,21,10);
      tv.ShowTiles("",19,6,21,6);
//      tv.ShowTiles("",19,11,21,11);
      break;
    case 9:
      document.getElementById("am19x8").innerHTML = ``;
      document.getElementById("am20x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",17,7,17,10);
      tv.ShowTiles("",22,6,22,10);
      break;
    case 10:
      document.getElementById("am20x8").innerHTML = ``;
      document.getElementById("am21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",18,7,18,10);
      tv.ShowTiles("",23,6,23,10);
      break;
    case 11:
      document.getElementById("am21x8").innerHTML = ``;
      document.getElementById("am21x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",19,10,23,10);
      tv.ShowTiles("",19,5,23,5);
      break;
    case 12:
      document.getElementById("am21x7").innerHTML = ``;
      document.getElementById("am21x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",19,9,23,9);
      tv.ShowTiles("",19,4,23,4);
      break;
    case 13:
      document.getElementById("am21x6").innerHTML = ``;
      document.getElementById("am21x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",19,8,23,8);
      tv.ShowTiles("",19,3,23,3);
      break;
    case 14:
      document.getElementById("am21x5").innerHTML = ``;
      document.getElementById("am21x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",19,7,23,7);
      tv.ShowTiles("",19,2,23,2);
      break;
    case 15:
      document.getElementById("am21x4").innerHTML = ``;
      document.getElementById("am21x3").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",19,6,23,6);
      tv.ShowTiles("",19,1,23,1);
      break;
    case 16: 
      document.getElementById("am21x3").innerHTML = ``;
      document.getElementById("am21x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/153.gif");'><div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div></div>`;
      tv.HideTiles("",19,5,23,5);
      break;
    case 17:
      document.getElementById("am21x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/153.gif");'></div>`;
      dur = 1200;
      break;
    case 18:
      tv.HideTiles("",19,4,23,4);
      tv.HideTiles("",19,1,19,3);
      tv.HideTiles("",23,1,23,3);
      break;
    case 19:
      tv.HideTiles("",20,1,22,1);
      tv.HideTiles("",20,2,20,3);
      tv.HideTiles("",22,2,22,3);
      tv.HideTiles("",21,3,21,3);
      break;
    case 20:
      tv.HideTiles("",21,2,21,2);
      dur = 1200;
      break;
    case 21:
      tv.ShowTiles("x",3,11,3,11);
      break;
    case 22:
      tv.ShowTiles("x",2,10,4,12);
      break;
    case 23:
      tv.ShowTiles("x",1,9,5,13);
      break;
    case 24:
      document.getElementById("amx3x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      break;
    case 25:
      document.getElementById("amx3x11").innerHTML = ``;
      document.getElementById("amx3x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("x",1,13,5,13);
      tv.ShowTiles("x",1,8,5,8);
      break;
    case 26:
      document.getElementById("amx3x10").innerHTML = ``;
      document.getElementById("amx3x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("x",1,12,5,12);
      tv.ShowTiles("x",1,7,5,7);
      break;
    case 27:
      document.getElementById("amx3x9").innerHTML = ``;
      document.getElementById("amx3x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("x",1,11,5,11);
      tv.ShowTiles("x",1,6,5,6);
      break;
    case 28:
      document.getElementById("amx3x8").innerHTML = ``;
      document.getElementById("amx3x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("x",1,10,5,10);
      tv.ShowTiles("x",1,5,5,5);
      break;
    case 29:
      document.getElementById("amx3x7").innerHTML = ``;
      document.getElementById("amx3x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("x",1,9,5,9);
      tv.ShowTiles("x",1,4,5,4);
      break;
    case 30:
      document.getElementById("amx3x6").innerHTML = ``;
      document.getElementById("amx3x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("x",1,8,5,8);
      tv.ShowTiles("x",1,3,5,3);
      break;
    case 31:
      document.getElementById("amx3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      break;
    case 32:
      document.getElementById("amx3x5").innerHTML = ``;
      document.getElementById("amx3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'><div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div></div>`;
      tv.HideTiles("x",1,7,5,7);
      tv.ShowTiles("x",1,2,5,2);
      break;
    case 33:
      document.getElementById("amx3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      document.getElementById("amx3x3").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("x",1,6,5,6);
      tv.ShowTiles("x",1,1,5,1);
      break;
    case 34:
      document.getElementById("amx3x3").innerHTML = ``;
      document.getElementById("amx3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/seated_east_2.gif");'></div>`;
      dur = 200;
      break;
    case 35:
      let cdiv = document.getElementById("amx4x2");
      cdiv.innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${food[0]}");background-position:${food[2]}px ${food[3]}px'></div>`;
      dur = 1800;
      break;
    case 36:
      document.getElementById("amx4x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${tableedge[0]}");background-position:${tableedge[2]}px ${tableedge[3]}px'></div>`;
      break;
    case 37:
      document.getElementById("amx3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${chair[0]}");background-position:${chair[2]}px ${chair[3]}px'></div>`;
      document.getElementById("amx3x3").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      break;
    case 38:
      document.getElementById("amx3x3").innerHTML = ``;
      document.getElementById("amx3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'><div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div></div>`;
      tv.ShowTiles("x",1,6,5,6);
      tv.HideTiles("x",1,1,5,1);      
      break;
    case 39:
      document.getElementById("amx3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      document.getElementById("amx3x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",1,7,5,7);
      tv.HideTiles("x",1,2,5,2);
      break;
    case 40:
      document.getElementById("amx3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${door[0]}");background-position:${door[2]}px ${door[3]}px'></div>`;
      break;
    case 41: 
      document.getElementById("amx3x5").innerHTML = ``;
      document.getElementById("amx3x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",1,8,5,8);
      tv.HideTiles("x",1,3,5,3);
      break;    
    case 42:
      document.getElementById("amx3x6").innerHTML = ``;
      document.getElementById("amx3x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",1,9,5,9);
      tv.HideTiles("x",1,4,5,4);
      break;   
    case 43:
      document.getElementById("amx3x7").innerHTML = ``;
      document.getElementById("amx3x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",1,10,5,10);
      tv.HideTiles("x",1,5,5,5);
      break;
    case 44:
      document.getElementById("amx3x8").innerHTML = ``;
      document.getElementById("amx4x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",6,6,6,10);
      tv.HideTiles("x",1,6,1,10);
      break;
    case 45: 
      document.getElementById("amx4x8").innerHTML = ``;
      document.getElementById("amx5x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",7,6,7,10);
      tv.HideTiles("x",2,6,2,10);
      break;
    case 46:
      document.getElementById("amx5x8").innerHTML = ``;
      document.getElementById("amx6x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",8,6,8,10);
      tv.HideTiles("x",3,6,3,10);
      break;
    case 47:
      document.getElementById("amx6x8").innerHTML = ``;
      document.getElementById("amx7x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",9,6,9,10);
      tv.HideTiles("x",4,6,4,10);
      break;
    case 48:
      document.getElementById("amx7x8").innerHTML = ``;
      document.getElementById("amx8x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",10,6,10,10);
      tv.HideTiles("x",5,6,5,10);
      break;
    case 49:
      document.getElementById("amx8x8").innerHTML = ``;
      document.getElementById("amx9x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",11,6,11,10);
      tv.HideTiles("x",6,6,6,10);
      break;
    case 50:
      document.getElementById("amx9x8").innerHTML = ``;
      document.getElementById("amx10x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",12,6,12,10);
      tv.HideTiles("x",7,6,7,10);
      break;
    case 51:
      document.getElementById("amx10x8").innerHTML = ``;
      document.getElementById("amx11x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",13,6,13,10);
      tv.HideTiles("x",8,6,8,10);
      break;
    case 52:
      document.getElementById("amx11x8").innerHTML = ``;
      document.getElementById("amx12x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",14,6,14,10);
      tv.HideTiles("x",9,6,9,10);
      break;
    case 53:
      document.getElementById("amx12x8").innerHTML = ``;
      document.getElementById("amx13x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",15,6,15,10);
      tv.HideTiles("x",10,6,10,10);
      break;
    case 54:
      document.getElementById("amx13x8").innerHTML = ``;
      document.getElementById("amx14x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",16,6,16,10);
      tv.HideTiles("x",11,6,11,10);
      break;
    case 55:
      document.getElementById("amx14x8").innerHTML = ``;
      document.getElementById("amx15x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",17,6,17,10);
      tv.HideTiles("x",12,6,12,10);
      break;
    case 56:
      document.getElementById("amx15x8").innerHTML = ``;
      document.getElementById("amx16x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",18,6,18,10);
      tv.HideTiles("x",13,6,13,10);
      break;
    case 57:
      document.getElementById("amx16x8").innerHTML = ``;
      document.getElementById("amx17x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",19,6,19,10);
      tv.HideTiles("x",14,6,14,10);
      break;
    case 58:
      document.getElementById("amx17x8").innerHTML = ``;
      document.getElementById("amx18x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",20,6,20,10);
      tv.HideTiles("x",15,6,15,10);
      break;
    case 59:
      document.getElementById("amx18x8").innerHTML = ``;
      document.getElementById("amx19x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",21,6,21,10);
      tv.HideTiles("x",16,6,16,10);
      break;
    case 60:
      document.getElementById("amx19x8").innerHTML = ``;
      document.getElementById("amx20x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",22,6,22,10);
      tv.HideTiles("x",17,6,17,10);
      break;
    case 61:
      document.getElementById("amx20x8").innerHTML = ``;
      document.getElementById("amx21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",23,6,23,10);
      tv.HideTiles("x",18,6,18,10);
      break;
    case 62:
      document.getElementById("amx21x8").innerHTML = ``;
      document.getElementById("amx21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",19,11,23,11);
      tv.HideTiles("x",19,6,23,6);
      break;
    case 63:
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      break;
    case 64:
      document.getElementById("amx21x9").innerHTML = ``;
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'><div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div></div>`;
      tv.ShowTiles("x",19,12,23,12);
      tv.HideTiles("x",19,7,23,7);
      break;
    case 65:
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      document.getElementById("amx21x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("x",19,13,23,13);
      tv.HideTiles("x",19,8,23,8);
      dur = 1200;
      break;
    case 66:
      document.getElementById("amx21x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      break;
    case 67:
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'><div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div></div>`;
      document.getElementById("amx21x11").innerHTML = ``;
      tv.HideTiles("x",19,13,23,13);
      tv.ShowTiles("x",19,8,23,8);
      break;
    case 68:
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      document.getElementById("amx21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.HideTiles("x",19,12,23,12);
      tv.ShowTiles("x",19,7,23,7);
      break;
    case 69:
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${door[0]}");background-position:${door[2]}px ${door[3]}px'></div>`;
      break;
    case 70:
      document.getElementById("amx21x9").innerHTML = ``;
      document.getElementById("amx21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.HideTiles("x",19,11,23,11);
      tv.ShowTiles("x",19,6,23,6);
      break;
    case 71:
      document.getElementById("amx21x8").innerHTML = ``;
      document.getElementById("amx21x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.HideTiles("x",19,10,23,10);
      tv.ShowTiles("x",19,5,23,5);
      break;
    case 72:
      document.getElementById("amx21x7").innerHTML = ``;
      document.getElementById("amx21x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.HideTiles("x",19,9,23,9);
      tv.ShowTiles("x",19,4,23,4);
      break;
    case 73:
      document.getElementById("amx21x6").innerHTML = ``;
      document.getElementById("amx21x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.HideTiles("x",19,8,23,8);
      tv.ShowTiles("x",19,3,23,3);
      break;
    case 74:
      document.getElementById("amx21x5").innerHTML = ``;
      document.getElementById("amx21x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.HideTiles("x",19,7,23,7);
      tv.ShowTiles("x",19,2,23,2);
      dur=2000;
      break;
    case 75:
      document.getElementById("amx21x4").innerHTML = ``;
      document.getElementById("amx21x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.ShowTiles("x",19,7,23,7);
      tv.HideTiles("x",19,2,23,2);
      break;
    case 76:
      document.getElementById("amx21x5").innerHTML = ``;
      document.getElementById("amx22x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      break;
    case 77:
      document.getElementById("amx22x5").innerHTML = ``;
      document.getElementById("amx23x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      break;
    case 78:
      document.getElementById("amx23x5").innerHTML = ``;
      break;
    case 79: 
      tv.HideTiles("x",19,3,19,7);
      break;
    case 80:
      tv.HideTiles("x",20,3,20,7);
      break;
    case 81:
      tv.HideTiles("x",21,3,21,7);
      break;
    case 82:
      tv.HideTiles("x",22,3,22,7);
      break;
    case 83:
      tv.HideTiles("x",23,3,23,7);
      break;
    case 84:
      dur = 10;
      break;
    case 85:
      tv.ShowTiles("",21,2,21,2);
      break;
    case 86:
      tv.ShowTiles("",20,1,22,1);
      tv.ShowTiles("",20,2,20,3);
      tv.ShowTiles("",22,2,22,3);
      tv.ShowTiles("",21,3,21,3);
      break;
    case 87:
      tv.ShowTiles("",19,4,23,4);
      tv.ShowTiles("",19,1,19,3);
      tv.ShowTiles("",23,1,23,3);
      break;
    case 88:
      document.getElementById("am21x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/153.gif");'><div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div></div>`;
      break;
    case 89:
      document.getElementById("am21x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/153.gif");'></div>`;
      document.getElementById("am21x3").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.ShowTiles("",19,5,23,5);
      break;
    case 90:
      document.getElementById("am21x3").innerHTML = ``;
      document.getElementById("am21x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.ShowTiles("",19,6,23,6);
      tv.HideTiles("",19,1,23,1);
      break;
    case 91:
      document.getElementById("am21x4").innerHTML = ``;
      document.getElementById("am21x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.ShowTiles("",19,7,23,7);
      tv.HideTiles("",19,2,23,2);
      document.getElementById("am22x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'></div>`;
      tv.ShowTiles("",20,10,23,13);
      break;
    case 92:
      document.getElementById("am21x5").innerHTML = ``;
      document.getElementById("am21x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.ShowTiles("",19,8,23,8);
      tv.HideTiles("",19,3,23,3);
      document.getElementById("am22x12").innerHTML = ``;
      document.getElementById("am21x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'></div>`;
      tv.ShowTiles("",19,10,19,13);
      break;
    case 93:
      document.getElementById("am21x6").innerHTML = ``;
      document.getElementById("am21x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.ShowTiles("",19,9,23,9);
      tv.HideTiles("",19,4,23,4);
      document.getElementById("am21x12").innerHTML = ``;
      document.getElementById("am21x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'></div>`;
      break;
    case 94:
      document.getElementById("am21x7").innerHTML = ``;
      document.getElementById("am21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.HideTiles("",19,4,23,4);
      document.getElementById("am21x11").innerHTML = ``;
      document.getElementById("am21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'></div>`;
      break;
    case 95:
      document.getElementById("am21x10").innerHTML = ``;
      document.getElementById("am21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'></div>`;
      break;
    case 96:
      document.getElementById("am21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'><div style='width:32px;height:32px;background-image:url("graphics/702.gif");'></div></div>`;
      dur = 300;
      break;
    case 97:
      document.getElementById("am21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'></div>`;
      break;
    case 98:
      document.getElementById("am21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'><div style='width:32px;height:32px;background-image:url("graphics/702.gif");'></div></div>`;
      dur = 300;
      break;
    case 99:
      document.getElementById("am21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      break;
    case 100:
      document.getElementById("am21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'><div style='width:32px;height:32px;background-image:url("graphics/702.gif");'></div></div>`;
      dur = 300;
      break;
    case 101:
      document.getElementById("am21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'></div>`;
      break;
    case 102:
      document.getElementById("am21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'><div style='width:32px;height:32px;background-image:url("graphics/700.gif");'></div></div>`;
      dur = 300;
      break;
    case 103:
      document.getElementById("am21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am22x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/337.gif");'></div>`;
      break;
    case 104:
      document.getElementById("am21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'><div style='width:32px;height:32px;background-image:url("graphics/702.gif");'></div></div>`;
      dur = 300;
      break;
    case 105:
      document.getElementById("am21x9").innerHTML = ``;
      break;
    case 106:
      document.getElementById("am21x8").innerHTML = ``;
      document.getElementById("am21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      tv.HideTiles("",19,5,23,5);
      document.getElementById("am22x12").innerHTML = ``;
      document.getElementById("am21x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/337.gif");'></div>`;
      break;
    case 107:
      fireball = document.createElement("div");
      fireball.style.backgroundImage = "url('graphics/blasts.gif')";
      fireball.style.width=32;
      fireball.style.height=32;
      fireball.style.position="absolute";
      fireball.style.left = 661;
      fireball.style.top = 343;
      fireball.style.zIndex = 99;
      fireball.style.transition = "top 500ms linear 0s";
      fireball.id = "fireball";
      document.body.appendChild(fireball);
      dur = 10;
      break;
    case 108:
      fireball = document.getElementById("fireball");
      Object.assign(fireball.style, {top: "257px" });
      dur = 500;
      break;
    case 109:
      fireball = document.getElementById("fireball");
      fireball.parentNode.removeChild(fireball);
      document.getElementById("am21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'><div style='width:32px;height:32px;background-image:url("graphics/702.gif");'></div></div>`;      
      dur = 300;
      break;
    case 110:
      document.getElementById("am21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;      
      break;
    case 111:
      document.getElementById("am21x9").innerHTML = ``;      
      document.getElementById("am21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;      
      tv.HideTiles("",19,6,23,6);
      document.getElementById("am21x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/337.gif");'><div style='width:32px;height:32px;background-image:url("graphics/spellsparkles-anim.gif");background-position:0px -160px'></div></div>`;
      break;
    case 112:
      document.getElementById("am21x10").innerHTML = ``;      
      document.getElementById("am21x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;      
      tv.HideTiles("",19,7,23,7);
      document.getElementById("am21x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/337.gif");'></div>`;
      break;
    case 113:
      document.getElementById("am21x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'><div style='width:32px;height:32px;background-image:url("graphics/700.gif");'></div></div>`;      
      dur = 300;
      break;
    case 114:
      document.getElementById("am21x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;      
      dur = 300;
      break;
    case 115:
      document.getElementById("am21x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/337.gif");'><div style='width:32px;height:32px;background-image:url("graphics/702.gif");'></div></div>`;
      dur = 300;
      break;
    case 116:
      document.getElementById("am21x12").innerHTML = ``;
      break;
    case 117:
      document.getElementById("am21x11").innerHTML = ``;
      document.getElementById("am21x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;      
      tv.HideTiles("",19,8,23,8);
      break;
    case 118:
      document.getElementById("am21x12").innerHTML = ``;
      document.getElementById("am22x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;      
      tv.HideTiles("",19,9,19,13);
      break;
    case 119:
      document.getElementById("am22x12").innerHTML = ``;
      break;
    case 120:
      tv.HideTiles("",20,9,20,13);
      break;
    case 121:
      tv.HideTiles("",21,9,21,13);
      break;
    case 122:
      tv.HideTiles("",22,9,22,13);
      break;
    case 123:
      tv.HideTiles("",23,9,23,13);
      dur = 1200;
      break;
    case 124:
      tv.ShowTiles("",2,12,2,12);
      break;
    case 125:
      tv.ShowTiles("",1,11,3,13);
      break;
    case 126:
      tv.ShowTiles("",1,10,4,14);
      break;
    case 127:
      document.getElementById("am2x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      break;
    case 128:
      document.getElementById("am3x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am2x12").innerHTML = ``;
      tv.ShowTiles("",1,10,5,14);
      break;
    case 129:
      document.getElementById("am4x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am3x12").innerHTML = ``;
      tv.ShowTiles("",2,10,6,14);
      tv.HideTiles("",1,10,1,14);
      break;
    case 130:
      document.getElementById("am4x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am4x12").innerHTML = ``;
      tv.ShowTiles("",2,9,6,13);
      break;
    case 131:
      document.getElementById("am4x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am4x11").innerHTML = ``;
      tv.ShowTiles("",2,8,6,12);
      break;
    case 132:
      document.getElementById("am2x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      tv.ShowTiles("",1,10,5,14);
      break;
    case 133:
      document.getElementById("am4x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am4x10").innerHTML = ``;
      tv.ShowTiles("",2,7,5,7);
      break;
    case 134:
      document.getElementById("am2x12").innerHTML = ``;
      document.getElementById("am3x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      break;
    case 135:
      document.getElementById("am4x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am4x9").innerHTML = ``;
      tv.ShowTiles("",2,6,5,6);
      break;
    case 136:
      document.getElementById("am3x12").innerHTML = ``;
      document.getElementById("am4x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      document.getElementById("am2x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/351.gif");'></div>`;
      break;
    case 137:
      document.getElementById("am3x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am4x8").innerHTML = ``;
      tv.ShowTiles("",1,6,5,6);
      break;
    case 138:
      document.getElementById("am4x12").innerHTML = ``;
      document.getElementById("am4x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      break;
    case 139:
      document.getElementById("am2x12").innerHTML = ``;
      document.getElementById("am3x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/351.gif");'></div>`;
      break;
    case 140: 
      document.getElementById("am3x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am3x8").innerHTML = ``;
      tv.ShowTiles("",1,5,5,5);
      break;
    case 141:
      document.getElementById("am4x11").innerHTML = ``;
      document.getElementById("am4x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      break;
    case 142:
      document.getElementById("am3x12").innerHTML = ``;
      document.getElementById("am4x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/351.gif");'></div>`;
      break;
    case 143:
      document.getElementById("am3x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am3x7").innerHTML = ``;
      tv.ShowTiles("",1,4,5,4);
      break;
    case 144:
      document.getElementById("am3x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'><div style='width:32px;height:32px;background-image:url("graphics/spellsparkles-anim.gif");background-position:0px -32px'></div></div>`;
      dur = 800;
      break;
    case 145:
      document.getElementById("am3x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am3x6").innerHTML = ``;
      tv.ShowTiles("",1,3,5,3);
      break;
    case 146: 
      document.getElementById("am4x12").innerHTML = ``;
      document.getElementById("am3x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/351.gif");'></div>`;
      break;    
    case 147:
      document.getElementById("am3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am3x5").innerHTML = ``;
      tv.ShowTiles("",1,2,5,2);
      break;
    case 148:
      document.getElementById("am3x12").innerHTML = ``;
      document.getElementById("am2x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/351.gif");'></div>`;
      break;    
    case 149:
      document.getElementById("am3x3").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am3x4").innerHTML = ``;
      tv.ShowTiles("",1,1,5,1);
      break;
    case 150:
      document.getElementById("am2x12").innerHTML = ``;
      break;    
    case 151: 
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am3x3").innerHTML = ``;
      dur = 1000;
      break;
    case 152:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: 0px 0px'></div>`;
      dur = 250;
      break;
    case 153:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -32px 0px'></div>`;
      dur = 250;
      break;
    case 154: 
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -64px 0px'></div>`;
      dur = 250;
      break;
    case 155:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -96px 0px'></div>`;
      dur = 250;
      break;
    case 156:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -128px 0px'></div>`;
      dur = 1000;
      break;
    case 157:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -96px 0px'></div>`;
      dur = 250;
      document.getElementById("am4x10").innerHTML = ``;
      document.getElementById("am4x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      break;
    case 158:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -64px 0px'></div>`;
      dur = 250;
      break;
    case 159:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -32px 0px'></div>`;
      dur = 250;
      break;
    case 160:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: 0px 0px'></div>`;
      dur = 250;
      break;
    case 161:
      document.getElementById("am3x2").innerHTML = ``;
      document.getElementById("am4x11").innerHTML = ``;
      document.getElementById("am4x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      break; 
    case 162:
      document.getElementById("am4x12").innerHTML = ``;
      document.getElementById("am3x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      break;
    case 163:
      document.getElementById("am3x12").innerHTML = ``;
      document.getElementById("am2x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      break; 
    case 164:
      document.getElementById("am2x12").innerHTML = ``;
      break;
    case 165:
      tv.HideTiles("",1,6,5,14);
      dur = 2000;
      break;
    case 166:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: 0px 0px'></div>`;
      dur = 250;
      break;
    case 167:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -32px 0px'></div>`;
      dur = 250;
      break;
    case 168:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -64px 0px'></div>`;
      dur = 250;
      break;
    case 169:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -96px 0px'></div>`;
      dur = 250;
      break;
    case 170:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -128px 0px'></div>`;
      dur = 250;
      break;
    case 171:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      break;
    case 172:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -128px 0px'></div>`;
      document.getElementById("am3x3").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.ShowTiles("",1,5,5,5);
      dur = 250;
      break;
    case 173:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -96px 0px'></div>`;
      dur = 250;
      break;
    case 174:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -64px 0px'></div>`;
      dur = 250;
      break;
    case 175:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: -32px 0px'></div>`;
      document.getElementById("am3x3").innerHTML = ``;
      document.getElementById("am3x3").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      dur = 250;
      break;
    case 176:
      document.getElementById("am3x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/moongates.gif");background-position: 0px 0px'></div>`;
      dur = 250;
      break;
    case 177:
      document.getElementById("am3x2").innerHTML = ``;
      dur = 250;
      break;
    case 178:
      document.getElementById("am3x3").innerHTML = ``;
      document.getElementById("am3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",1,1,5,1);
      tv.ShowTiles("",1,6,5,6);
      break;
    case 179:
      document.getElementById("am3x4").innerHTML = ``;
      document.getElementById("am3x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",1,2,5,2);
      tv.ShowTiles("",1,7,5,7);
      break;
    case 180:
      document.getElementById("am3x5").innerHTML = ``;
      document.getElementById("am3x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",1,3,5,3);
      tv.ShowTiles("",1,8,5,8);
      break;
    case 181:
      document.getElementById("am3x6").innerHTML = ``;
      document.getElementById("am3x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",1,4,5,4);
      tv.ShowTiles("",1,9,5,9);
      break;
    case 182:
      document.getElementById("am3x7").innerHTML = ``;
      document.getElementById("am3x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",1,5,5,5);
      tv.ShowTiles("",1,10,5,10);
      break;
    case 183:
      document.getElementById("am3x8").innerHTML = ``;
      document.getElementById("am4x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",1,6,1,10);
      tv.ShowTiles("",6,7,6,10);
      break;
    case 184:
      document.getElementById("am4x8").innerHTML = ``;
      document.getElementById("am5x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",2,6,2,10);
      tv.ShowTiles("",7,7,7,10);
      break;
    case 185:
      document.getElementById("am5x8").innerHTML = ``;
      document.getElementById("am6x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",3,6,3,10);
      tv.ShowTiles("",8,7,8,10);
      break;
    case 186:
      document.getElementById("am6x8").innerHTML = ``;
      document.getElementById("am7x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",4,6,4,10);
      tv.ShowTiles("",9,7,9,10);
      break;
    case 187:
      document.getElementById("am7x8").innerHTML = ``;
      document.getElementById("am8x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",5,6,5,10);
      tv.ShowTiles("",10,7,10,10);
      break;
    case 188:
      document.getElementById("am8x8").innerHTML = ``;
      document.getElementById("am9x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",6,7,6,10);
      tv.ShowTiles("",11,7,11,10);
      break;
    case 189:
      document.getElementById("am9x8").innerHTML = ``;
      document.getElementById("am10x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",7,7,7,10);
      tv.ShowTiles("",12,7,12,10);
      break;
    case 190:
      document.getElementById("am10x8").innerHTML = ``;
      document.getElementById("am11x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",8,7,8,10);
      tv.ShowTiles("",13,7,13,10);
      break;
    case 191:
      document.getElementById("am11x8").innerHTML = ``;
      document.getElementById("am12x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      tv.HideTiles("",9,7,9,10);
      tv.ShowTiles("",14,7,14,10);
      dur = 2000;
      break;
    case 192:
      document.getElementById("am12x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/master_spritesheet.png");background-position:-64px -800px'></div>`;
      dur = 10000;
      frame = 0;
      break;

    default:
      return;
  }
  setTimeout(function() { if (tv) { tv.ExecuteAttract(frame+1) }},dur);
}

tv.HideTiles = function(board,x1,y1,x2,y2) {
  for (let i=x1;i<=x2;i++) {
    for (let j=y1;j<=y2;j++) {
      let tile = document.getElementById("am"+board+""+i+"x"+j);
      if (tile) {
        tile.classList.remove("attractfadein");
        tile.style.opacity = 0;
      }
    }
  }
}

tv.ShowTiles = function(board,x1,y1,x2,y2,fadein) {
  for (let i=x1;i<=x2;i++) {
    for (let j=y1;j<=y2;j++) {
      let tile = document.getElementById("am"+board+""+i+"x"+j);
      if (tile) {
        if (fadein) {
          tile.classList.add("attractfadein");
        } else {
          tile.style.opacity = 1;
        }
      }
    }
  }
}

tv.RandomizePotions = function() {
  let potions = ["TanPotion","OrangePotion","DeepBluePotion","BluePotion","BlackPotion","PurplePotion","BurntUmberPotion","YellowPotion",
    "WhitePotion","RedPotion","BrownPotion","GreyPotion","PinkPotion","SilverPotion","DarkGreenPotion","GreenPotion"];
  potions = ShuffleArray(potions);
  let pot = localFactory.createTile("TanPotion");
  DU.gameflags.potionmatrix[potions[0]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("OrangePotion");
  DU.gameflags.potionmatrix[potions[1]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("DeepBluePotion");
  DU.gameflags.potionmatrix[potions[2]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("BluePotion");
  DU.gameflags.potionmatrix[potions[3]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("BlackPotion");
  DU.gameflags.potionmatrix[potions[4]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("PurplePotion");
  DU.gameflags.potionmatrix[potions[5]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("BurntUmberPotion");
  DU.gameflags.potionmatrix[potions[6]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("YellowPotion");
  DU.gameflags.potionmatrix[potions[7]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("WhitePotion");
  DU.gameflags.potionmatrix[potions[8]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("RedPotion");
  DU.gameflags.potionmatrix[potions[9]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("BrownPotion");
  DU.gameflags.potionmatrix[potions[10]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("GreyPotion");
  DU.gameflags.potionmatrix[potions[11]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("PinkPotion");
  DU.gameflags.potionmatrix[potions[12]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("SilverPotion");
  DU.gameflags.potionmatrix[potions[13]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("DarkGreenPotion");
  DU.gameflags.potionmatrix[potions[14]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};
  pot = localFactory.createTile("GreenPotion");
  DU.gameflags.potionmatrix[potions[15]] = {"desc": pot.desc, "spritex": pot.spritexoffset, "spritey": pot.spriteyoffset};

}

tv.MakeCredits = function(page) {

  tv.creditsPage = page;
  let table = []
  table[0] = "<table cellpadding='5' cellspacing='5' border='0' style='width:100%'><tr><td colspan='2' align='center'><p class='charcreate'><u>Game By:</u><br /><br />Adam \"Goldenflame\" Burr</p></td></tr>";
  table[0] += "<tr><td align='center' valign='top' style='width:50%'><p class='charcreate'><u>Music Composition</u><br /><br />Adam Burr<br/><br /><u>Music Production</u><br /><br />Adam Burr<br />Gary Burr<br /><br /><u>Cloth Map Design</u><br /><br />David Hernandez-Burr<br /><br />";
  table[0] += "<u>Dragon Scale 3D Model</u><br /><br />Denis Loubet<br /><br /></p></td>";

  table[0] += "<td align='center' valign='top' style='width:50%'><p class='charcreate'><u>Splash Screens</u><br /><br />Dom John<br /><br /><u>Tile Art</u><br /><br />John Henderson<br />Timo Takalo<br />Adam Burr<br />Maud'Dweeb<br />MacKay Wilford<br /><br />";
  table[0] += "<u>Almanac and Player Reference Guide Art</u><br /><br />Indi Martin<br />Denis Loubet</p></td></tr>"; 
  table[0] += "</table>"; 

  table[1] = "<table cellpadding='5' cellspacing='5' border='0' style='width:100%'><tr><td align='center' valign='top' colspan='3'><p class='charcreate'>Special Thanks to these Friends<br /><u>Who Let Me Use Them as a Sounding Board</u><br /><br />Adam D'Addario<br />David Hernandez-Burr<br />Vynce Montgomery<br /><br />";
  table[1] += "<u>More Special Thanks to my Patreon Supporters</u><br /></td></tr>";
  table[1] += "<tr><td align='center' valign='top' style='width:33%'><p class='charcreate'>Almus<br />Cranberry<br />Frank Flury<br />Christopher Galbreath</p></td>";
  table[1] += "<td align='center' valign='top' style='width:33%'><p class='charcreate'>John Hosie<br />Indi Martin<br />Browncoat Jayson<br />Michael Lavery</p></td>";
  table[1] += "<td align='center' valign='top' style='width:33%'><p class='charcreate'>Brandon Luders<br />Erik Smith<br />Stirring Dragon Games<br />David Youd</p></td></tr></table>";

  table[2] = "<table cellpadding='5' cellspacing='5' border='0' style='width:100%' id='creditstable'><tr><td align='center' valign='top' colspan='2'><p class='charcreate'><u>Image Licensing</u><br /><br />Palace in the Sky clouds by:<br />Daniel Gregory Benoy (https://opengameart.org/content/fluffy-clouds)<br />CC-by-SA license (https://creativecommons.org/licenses/by-sa/3.0/)<br />Some clouds edited by merging them together.<br /><br />";
  table[2] += "Spellbook by:<br />DeviantArt user \"flameshaft\" (http://flameshaft.deviantart.com/art/Open-book-289133547)<br /><br /><u>Sound Effect Licensing</u><br /><br />";
  table[2] += "DOOR HANDLE JIGGLE.wav by Kyle1Katarn<br />https://freesound.org/s/108407/ -- License: Attribution 3.0<br />Door-Lock-Turn-01.wav by DWOBoyle<br />https://freesound.org/s/151588/ -- License: Attribution 4.0<br />";
  table[2] += "door close 3.wav by THE_bizniss<br />https://freesound.org/s/53270/ -- License: Attribution 3.0<br />stone_on_stone_dragging5.aif by thanvannispen<br />https://freesound.org/s/29991/ -- License: Attribution 4.0</td></tr></table>"

  if (page >= table.length) {
    gamestate.setMode("null");
    document.getElementById('maindiv').classList.remove('presentfadein');  
    document.getElementById('creditstable').classList.add('titlefadeout');
    setTimeout(function() {
      tv.SecondPage();
    },1000);
    return;
  }
  
  if (gamestate.getMode() !== "credits") {
    document.getElementById('maindiv').classList.add('titlefadeout');
    setTimeout(function() {
      document.getElementById('maindiv').innerHTML = table[page];
      document.getElementById('maindiv').classList.remove('titlefadeout');
      document.getElementById('maindiv').classList.add('presentfadein');
      gamestate.setMode("credits");
    },1000);
    gamestate.setMode("null");
  } else {
    document.getElementById('maindiv').innerHTML = table[page];
  }

}

tv.AnimateTile = function(divid, spritex, animlength, mintime, maxtime, animtype, currframe) {
  let tile = document.getElementById(divid);
  if (tile) {
    let waittime = Math.floor(Math.random() * (maxtime - mintime +1)) + mintime;

    let sx;
    if (animtype === "cycle") {
      currframe++;
      if (currframe > animlength) { currframe = 1; }
      sx = -1*(currframe-1)*32 + spritex;
    } else { // random
      let diesize = animlength-1;
      let sf = Dice.roll("1d"+diesize);
      if (sf >= currframe) { 
        // if you can't repeat, die size was one too small. Therefore if you roll the current frame or higher, add one.
        sf++; 
      }
      currframe = sf;
      if (currframe > animlength) { currframe = 1; }
      sx = -1*(sf-1)*32 + spritex;
    }
    tile.style.backgroundPositionX = sx;

    setTimeout(function() { tv.animateTile(divid, spritex, animlength, mintime, maxtime, animtype, currframe); }, waittime);

  }
}

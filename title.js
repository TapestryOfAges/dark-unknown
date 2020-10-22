"use strict";

function preload(arrayOfImages) {
  for (let i=0;i<arrayOfImages.length;i++) {
    (new Image()).src = arrayOfImages[i];
  }
}

preload([
  "graphics/title/ToA_banner-b.jpg",
  "graphics/title/create.gif",
  "graphics/title/create-g.gif",
  "graphics/title/credits.gif",
  "graphics/title/credits-g.gif",
  "graphics/title/gf.gif",
  "graphics/title/intro.gif",
  "graphics/title/intro-g.gif",
  "graphics/title/journey.gif",
  "graphics/title/journey-g.gif",
  "graphics/title/journey-d.gif",
  "graphics/title/present.gif",
  "graphics/title/and.gif",
]);

let optnames = [];
optnames[0] = "graphics/title/intro";
optnames[1] = "graphics/title/create";
optnames[2] = "graphics/title/journey";
optnames[3] = "graphics/title/credits";

let avatars = [];
avatars[0] = ["300.2.gif", "300.gif", "301.gif", "shepherd-offcolor.gif", "302.gif", "druid-offcolor.gif"];
avatars[1] = ["303.2.gif", "303.gif", "304.2.gif", "304.gif", "305.gif", "ranger-offcolor.gif"];
avatars[2] = ["306.gif", "307.2.gif", "307.gif", "308.gif", "311.gif", "tinker-offcolor.gif"];
avatars[3] = ["bard-offcolor.gif", "fighter-offcolor.gif", "paladin-offcolor.gif", "mage-offcolor.gif", "", ""];

let avskin = [];
avskin[0] = [2,1,1,1,1,1];
avskin[1] = [2,1,2,1,1,1];
avskin[2] = [1,2,1,2,1,1];
avskin[3] = [1,1,1,1];

let avatarselect = {};
avatarselect.x = 0;
avatarselect.y = 0;

gamestate.setMode("init");

let optselect = 0;
let charname = "";
let gender = "";
let graphic = "";
let dusong;
let musictries = 0;
let introidx = 0;

let firsttime = 1;
let themap = new GameMap();

let testvar;

let lastanim = "";

let browserheight = window.innerHeight;
let browserwidth = window.innerWidth;

DU.gameflags.setFlag("music", 1);
DU.gameflags.setFlag("loopmusic", 1);
DU.gameflags.setFlag("sound", 1);
DU.gameflags.setFlag("ambientsound", 1);
DU.gameflags.setFlag("zoom", 1);

let el = function(e) {
  let code = (e.keyCode ? e.keyCode : e.which);
  if (e.ctrlKey && (code === 73)) { ipcRenderer.send('toggle_dev'); return; }  // ctrl-i opens dev console no matter the mode
  if (gamestate.getMode() !== "import") {
    e.preventDefault();
  }
  if (gamestate.getMode() === "init") {
    gamestate.setMode("null");
    page_zero();
  }

  else if (gamestate.getMode() !== "null") {
    DoActionTitle(code, e);
  } else {
    finishedFinalPage();
  }
}

{
  let callback = function() {
    audio_init();  
    set_schedules();

    if (firsttime) {
      document.addEventListener("keydown", el);
      firsttime = 0;
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
    loaddoc.innerHTML += "<p class='charcreate' style='margin-left: 23px'>Ready.<br />Press any key...";
  }
} 


function page_zero() {
  let fleft = -3;
  let ftop = 0;
  let signl = fleft+324;
  let signt = ftop+121;
  let firstpage = "<div id='allofem'><div id='ToA' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;width:776;height:209;display:block;opacity:0;background-image:url(\"graphics/title/ToA_banner_blank.gif\")'></div><div id=\"over\" style=\"position:absolute;left:"+fleft+"px;top:"+ftop+"px;width:2px;height:209px;z-index:5;display:none;background-image:url('graphics/title/ToA_banner_ToA-only.gif');background-position: 0px 0px\"></div>";
  firstpage += "<div id='sign' style='position:absolute;z-index:10;left:" + signl + "px;display:none;top:" + signt + "px;width:162;height:52;background-image:url(\"graphics/title/games_signature.gif\");background-position: 0px 0px;color:white'></div>";
  fleft = fleft+370;
  ftop = ftop+230;
  firstpage += "<div id='and' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;opacity:0'><img src='graphics/title/and.gif' /></div>";
  fleft = browserwidth/2 - 111;
  ftop = ftop+50;
  firstpage += "<div id='gf' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;opacity:0'><img src='graphics/title/gf.gif' /></div>";
  fleft = browserwidth/2 - 59;
  ftop = ftop+70;
  firstpage += "<div id='present' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;opacity:0'><img src='graphics/title/present.gif' /></div></div>";

  document.getElementById('maindiv').innerHTML = firstpage;
  setTimeout(function() {
    start_animations();      
  }, 100);
}

function start_animations() {
    dusong = {};
    dusong.name = "Dark Unknown";
    dusong.song = musicpreload["Dark Unknown"];
    musicpreload = {};
    dusong.song.play();
    dusong.song.loop = true;
    if (gamestate.getMode() === "null") {
      document.getElementById('ToA').classList.add('titlefadein');
      setTimeout(function() {
        if (gamestate.getMode() === "null") {
          if (document.getElementById('over')) {
            document.getElementById('over').style.display = "inline";
            lastanim = "over";
            document.getElementById('over').classList.add("widenanimate");
            setTimeout(function() {
              if (gamestate.getMode() === "null") {
                document.getElementById('sign').style.display = "inline";
                Signature(-52);
              }
            }, 2500);
          }
        }
      }, 2000);
    }
}

function Signature(val) {
  if (val === -4212) { FirstPage(); return; }
  lastanim = "sign";
  if (gamestate.getMode() === "null") {
    document.getElementById('sign').style.backgroundPosition = "0px " + val + "px";
    setTimeout(function() { Signature(val-52);}, 25);
  }
}

function FirstPage() {
  document.getElementById('ToA').style.backgroundImage = "url('graphics/title/ToA_banner-b.gif')";
  document.getElementById('sign').style.display = "none";
  document.getElementById('over').style.display = "none";
  lastanim = "and";
  document.getElementById('and').classList.add('andfadein');
  setTimeout(function() {
    lastanim = "gf";
    if (document.getElementById('gf')) {
      document.getElementById('gf').classList.add('gffadein');
      setTimeout(function() {
        lastanim = "present";
        document.getElementById('present').classList.add('presentfadein');
        setTimeout(function() {
          setTimeout(function() {
            let pres = document.getElementById('allofem');
            if (pres) {
              pres.classList.add('titlefadeout');
              setTimeout(function() {
                SecondPage();
              },1150);
            }
          }, 1150);
        }, 1550);
      },1050);
    }
  }, 1350);
}


function SecondPage() {
  
  let sleft = browserwidth/2 - 200;
  let sptop = -5;
  optselect = 0;
  let spage = "<div id='attract1' style='position:absolute; left:20px; top:5px; z-index:5'></div><div id='attract2' style='position:absolute; left:20px; top:5px; z-index:6'></div><div id='DU' style='position:absolute;left:" + sleft + "px;top:" + sptop + "px;opacity:0'><img src='graphics/title/ducoe_logo.png' /></div><div id='options'></div>";
  document.getElementById('maindiv').innerHTML = spage;
  lastanim = "DU";
  document.getElementById('DU').classList.add('presentfadein');
  setTimeout(function() {
    spage = "<div id='textoptions' class='textoptions'>";
    spage += "<div id='intro'><p class='menuselect' style='margin-top:5px' id='opt0' onClick='makeChoice(\'intro\')' />View Introduction</p></div>";
    spage += "<div id='create'><p class='menuplain' style='margin-top:5px' id='opt1' onClick='makeChoice(\'create\')' />Create Character</p></div>";
    let journey = "";
    if (gamestate.getLatestSaveIndex() === -1) {
      journey = " style='color:gray'";
    } 
    spage += "<div id='journey'><p class='menuplain' style='margin-top:5px' id='opt2'" + journey + " onClick='makeChoice(\'journey\')' />Journey Onward</p></div>";
    spage += "<div id='credits'><p class='menuplain' style='margin-top:5px' id='opt3' onClick='makeChoice(\'credits\')' />Credits</p></div></div>";
    document.getElementById('options').innerHTML = spage;
    document.getElementById('intro').classList.add('presentfadein');
    document.getElementById('create').classList.add('presentfadein');
    document.getElementById('journey').classList.add('presentfadein');
    document.getElementById('credits').classList.add('presentfadein');
    setTimeout(function() { pagelive(); }, 10);
  },1000);
}

function finishedFinalPage() {
  let sleft = browserwidth/2 - 200;
  let sptop = -5;
  optselect = 0;
  let spage = "<div id='attract1' style='position:absolute; left:20px; top:5px; z-index:5'></div><div id='attract2' style='position:absolute; left:20px; top:5px; z-index:6'></div><div id='DU' style='position:absolute;left:" + sleft + "px;top:" + sptop + "px;z-index:10'><img src='graphics/title/ducoe_logo.png' /></div><div id='options'></div>";
  document.getElementById('maindiv').innerHTML = spage;
  spage = "<div id='textoptions' class='textoptions'>";
  spage += "<div id='intro'><p class='menuselect' style='margin-top:5px' id='opt0' onClick='makeChoice(\'intro\')' />View Introduction</p></div>";
  spage += "<div id='create'><p class='menuplain' style='margin-top:5px' id='opt1' onClick='makeChoice(\'create\')' />Create Character</p></div>";
  let journey = "";
  if (gamestate.getLatestSaveIndex() === -1) {
    journey = " style='color:gray'";
  } 
  spage += "<div id='journey'><p class='menuplain' style='margin-top:5px' id='opt2'" + journey + " onClick='makeChoice(\'journey\')' />Journey Onward</p></div>";
  spage += "<div id='credits'><p class='menuplain' style='margin-top:5px' id='opt3' onClick='makeChoice(\'credits\')' />Credits</p></div></div>";

  document.getElementById('options').innerHTML = spage;
  pagelive();

}

function pagelive() {
  gamestate.setMode("on");
  setTimeout(function() { StartAttract(); }, 4000);
}

function StartAttract() {
  let grass = localFactory.createTile("Grass").getGraphicArray();
  let brush = localFactory.createTile("Brush").getGraphicArray();
  let forest = localFactory.createTile("Forest").getGraphicArray();
  let tree = localFactory.createTile("Tree").getGraphicArray();
  let campfire = localFactory.createTile("Campfire").getGraphicArray();
  let cave = localFactory.createTile("Cave").getGraphicArray();
  let dungeon = localFactory.createTile("Dungeon").getGraphicArray();
  let keep = localFactory.createTile("Keep").getGraphicArray();
  let shrine = localFactory.createTile("Shrine").getGraphicArray();
  let hill = localFactory.createTile("Hills").getGraphicArray();
  let mountain = localFactory.createTile("Mountain").getGraphicArray();
  let roadns = ["master_spritesheet.png",0,-224,-736];
  let roadne = ["master_spritesheet.png",0,-32,-736];
  let roadew = ["master_spritesheet.png",0,-128,-736];
  let cobble = localFactory.createTile("Cobblestone").getGraphicArray();
  let wall = localFactory.createTile("Wall").getGraphicArray();
  let door = localFactory.createTile("DoorWindow").getGraphicArray();
  let opendoor = ["master_spritesheet.png",0,-192,-704];
  let chair = localFactory.createTile("LeftChair").getGraphicArray();
  let tableedge = localFactory.createTile("LeftTable").getGraphicArray();
  let table = localFactory.createTile("MiddleTable").getGraphicArray();
  let ocean = localFactory.createTile("Ocean").getGraphicArray();
  let water = localFactory.createTile("Water").getGraphicArray();
  let dirt = localFactory.createTile("Dirt").getGraphicArray();
  let dirtcoast = localFactory.createTile("NorthCoastSand").getGraphicArray();
  let post = localFactory.createTile("SingleSignpost").getGraphicArray();
  let sign = localFactory.createTile("TavernSign").getGraphicArray();
  let rightpost = localFactory.createTile("SignpostRight").getGraphicArray();
  let wpnsign = localFactory.createTile("WeaponSign").getGraphicArray();
  let brazier = localFactory.createTile("Brazier").getGraphicArray();

  let attractmap = "<table cellpadding='0' cellspacing='0' border='0'>";
  attractmap += `<tr><td id='am1x1' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x1' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x1' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x1' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x1' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x1' style='opacity:0;width:32px;height:32px'></td><td id='am7x1' style='opacity:0;width:32px;height:32px'></td><td id='am8x1' style='opacity:0;width:32px;height:32px'></td><td id='am9x1' style='opacity:0;width:32px;height:32px'></td><td id='am10x1' style='opacity:0;width:32px;height:32px'></td><td id='am11x1' style='opacity:0;width:32px;height:32px'></td><td id='am12x1' style='opacity:0;width:32px;height:32px'></td><td id='am13x1' style='opacity:0;width:32px;height:32px'></td><td id='am14x1' style='opacity:0;width:32px;height:32px'></td><td id='am15x1' style='opacity:0;width:32px;height:32px'></td><td id='am16x1' style='opacity:0;width:32px;height:32px'></td><td id='am17x1' style='opacity:0;width:32px;height:32px'></td><td id='am18x1' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x1' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x1' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x1' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x1' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x1' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x2' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x2' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x2' style='opacity:0;background-image:url("graphics/${shrine[0]}"); background-position: ${shrine[2]}px ${shrine[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x2' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x2' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x2' style='opacity:0;width:32px;height:32px'></td><td id='am7x2' style='opacity:0;width:32px;height:32px'></td><td id='am8x2' style='opacity:0;width:32px;height:32px'></td><td id='am9x2' style='opacity:0;width:32px;height:32px'></td><td id='am10x2' style='opacity:0;width:32px;height:32px'></td><td id='am11x2' style='opacity:0;width:32px;height:32px'></td><td id='am12x2' style='opacity:0;width:32px;height:32px'></td><td id='am13x2' style='opacity:0;width:32px;height:32px'></td><td id='am14x2' style='opacity:0;width:32px;height:32px'></td><td id='am15x2' style='opacity:0;width:32px;height:32px'></td><td id='am16x2' style='opacity:0;width:32px;height:32px'></td><td id='am17x2' style='opacity:0;width:32px;height:32px'></td><td id='am18x2' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x2' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x2' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x2' style='opacity:0;background-image:url("graphics/${keep[0]}"); background-position: ${keep[2]}px ${keep[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x2' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x2' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x3' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x3' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x3' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x3' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x3' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x3' style='opacity:0;width:32px;height:32px'></td><td id='am7x3' style='opacity:0;width:32px;height:32px'></td><td id='am8x3' style='opacity:0;width:32px;height:32px'></td><td id='am9x3' style='opacity:0;width:32px;height:32px'></td><td id='am10x3' style='opacity:0;width:32px;height:32px'></td><td id='am11x3' style='opacity:0;width:32px;height:32px'></td><td id='am12x3' style='opacity:0;width:32px;height:32px'></td><td id='am13x3' style='opacity:0;width:32px;height:32px'></td><td id='am14x3' style='opacity:0;width:32px;height:32px'></td><td id='am15x3' style='opacity:0;width:32px;height:32px'></td><td id='am16x3' style='opacity:0;width:32px;height:32px'></td><td id='am17x3' style='opacity:0;width:32px;height:32px'></td><td id='am18x3' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x3' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x3' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x3' style='opacity:0;background-image:url("graphics/${roadns[0]}"); background-position: ${roadns[2]}px ${roadns[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x3' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x3' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x4' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x4' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x4' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x4' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x4' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x4' style='opacity:0;width:32px;height:32px'></td><td id='am7x4' style='opacity:0;width:32px;height:32px'></td><td id='am8x4' style='opacity:0;width:32px;height:32px'></td><td id='am9x4' style='opacity:0;width:32px;height:32px'></td><td id='am10x4' style='opacity:0;width:32px;height:32px'></td><td id='am11x4' style='opacity:0;width:32px;height:32px'></td><td id='am12x4' style='opacity:0;width:32px;height:32px'></td><td id='am13x4' style='opacity:0;width:32px;height:32px'></td><td id='am14x4' style='opacity:0;width:32px;height:32px'></td><td id='am15x4' style='opacity:0;width:32px;height:32px'></td><td id='am16x4' style='opacity:0;width:32px;height:32px'></td><td id='am17x4' style='opacity:0;width:32px;height:32px'></td><td id='am18x4' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x4' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x4' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x4' style='opacity:0;background-image:url("graphics/${roadns[0]}"); background-position: ${roadns[2]}px ${roadns[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x4' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x4' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x5' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x5' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x5' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x5' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x5' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x5' style='opacity:0;width:32px;height:32px'></td><td id='am7x5' style='opacity:0;width:32px;height:32px'></td><td id='am8x5' style='opacity:0;width:32px;height:32px'></td><td id='am9x5' style='opacity:0;width:32px;height:32px'></td><td id='am10x5' style='opacity:0;width:32px;height:32px'></td><td id='am11x5' style='opacity:0;width:32px;height:32px'></td><td id='am12x5' style='opacity:0;width:32px;height:32px'></td><td id='am13x5' style='opacity:0;width:32px;height:32px'></td><td id='am14x5' style='opacity:0;width:32px;height:32px'></td><td id='am15x5' style='opacity:0;width:32px;height:32px'></td><td id='am16x5' style='opacity:0;width:32px;height:32px'></td><td id='am17x5' style='opacity:0;width:32px;height:32px'></td><td id='am18x5' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x5' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x5' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x5' style='opacity:0;background-image:url("graphics/${roadns[0]}"); background-position: ${roadns[2]}px ${roadns[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x5' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x5' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x6' style='opacity:0;width:32px;height:32px'></td><td id='am7x4' style='opacity:0;width:32px;height:32px'></td><td id='am8x4' style='opacity:0;width:32px;height:32px'></td><td id='am9x4' style='opacity:0;width:32px;height:32px'></td><td id='am10x4' style='opacity:0;width:32px;height:32px'></td><td id='am11x4' style='opacity:0;width:32px;height:32px'></td><td id='am12x4' style='opacity:0;width:32px;height:32px'></td><td id='am13x4' style='opacity:0;width:32px;height:32px'></td><td id='am14x4' style='opacity:0;width:32px;height:32px'></td><td id='am15x4' style='opacity:0;width:32px;height:32px'></td><td id='am16x4' style='opacity:0;width:32px;height:32px'></td><td id='am17x4' style='opacity:0;width:32px;height:32px'></td><td id='am18x4' style='opacity:0;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x6' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x6' style='opacity:0;background-image:url("graphics/${roadns[0]}"); background-position: ${roadns[2]}px ${roadns[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x6' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x7' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am7x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am8x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am9x7' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am10x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${tree[0]}");background-position:${tree[2]}px ${tree[3]}px'></div></td>`;
  attractmap += `<td id='am11x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am12x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${tree[0]}");background-position:${tree[2]}px ${tree[3]}px'></div></td>`;
  attractmap += `<td id='am13x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am14x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am15x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am16x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am17x7' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am18x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x7' style='opacity:0;background-image:url("graphics/${roadns[0]}"); background-position: ${roadns[2]}px ${roadns[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x7' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am7x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am8x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${tree[0]}");background-position:${tree[2]}px ${tree[3]}px'></div></td>`;
  attractmap += `<td id='am9x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am10x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am11x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am12x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/master_spritesheet.png");background-position:-64px -800px'></div></td>`;
  attractmap += `<td id='am13x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am14x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am15x8' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am16x8' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am17x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am18x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x8' style='opacity:0;background-image:url("graphics/${roadne[0]}"); background-position: ${roadne[2]}px ${roadne[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x8' style='opacity:0;background-image:url("graphics/${roadew[0]}"); background-position: ${roadew[2]}px ${roadew[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x8' style='opacity:0;background-image:url("graphics/${roadew[0]}"); background-position: ${roadew[2]}px ${roadew[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x9' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x9' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x9' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am7x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am8x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am9x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am10x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am11x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${campfire[0]}");background-position:-${campfire[2]}px -${campfire[3]}px'></div></td>`;
  attractmap += `<td id='am12x9' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am13x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am14x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am15x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am16x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am17x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am18x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x9' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x9' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x10' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x10' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x10' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x10' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am7x10' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am8x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am9x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am10x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${tree[0]}");background-position:${tree[2]}px ${tree[3]}px'></div></td>`;
  attractmap += `<td id='am11x10' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am12x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am13x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${tree[0]}");background-position:${tree[2]}px ${tree[3]}px'></div></td>`;
  attractmap += `<td id='am14x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am15x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am16x10' style='opacity:0;background-image:url("graphics/${forest[0]}"); background-position: ${forest[2]}px ${forest[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am17x10' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am18x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am19x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x11' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x11' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x11' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x11' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x11' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x11' style='opacity:0;width:32px;height:32px'></td><td id='am7x11' style='opacity:0;width:32px;height:32px'></td><td id='am8x11' style='width:32px;height:32px'></td><td id='am9x11' style='opacity:0;width:32px;height:32px'></td><td id='am10x11' style='opacity:0;width:32px;height:32px'></td><td id='am11x11' style='opacity:0;width:32px;height:32px'></td><td id='am12x11' style='opacity:0;width:32px;height:32px'></td><td id='am13x11' style='opacity:0;width:32px;height:32px'></td><td id='am14x11' style='opacity:0;width:32px;height:32px'></td><td id='am15x11' style='opacity:0;width:32px;height:32px'></td><td id='am16x11' style='opacity:0;width:32px;height:32px'></td><td id='am17x11' style='opacity:0;width:32px;height:32px'></td><td id='am18x11' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmap += `<td id='am19x11' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x11' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x11' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x11' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x11' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x12' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x12' style='opacity:0;background-image:url("graphics/${dungeon[0]}"); background-position: ${dungeon[2]}px ${dungeon[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x12' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x12' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x12' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x12' style='opacity:0;width:32px;height:32px'></td><td id='am7x12' style='opacity:0;width:32px;height:32px'></td><td id='am8x12' style='width:32px;height:32px'></td><td id='am9x12' style='opacity:0;width:32px;height:32px'></td><td id='am10x12' style='opacity:0;width:32px;height:32px'></td><td id='am11x12' style='opacity:0;width:32px;height:32px'></td><td id='am12x12' style='opacity:0;width:32px;height:32px'></td><td id='am13x12' style='opacity:0;width:32px;height:32px'></td><td id='am14x12' style='opacity:0;width:32px;height:32px'></td><td id='am15x12' style='opacity:0;width:32px;height:32px'></td><td id='am16x12' style='opacity:0;width:32px;height:32px'></td><td id='am17x12' style='opacity:0;width:32px;height:32px'></td><td id='am18x12' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmap += `<td id='am19x12' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x12' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x12' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x12' style='opacity:0;background-image:url("graphics/${cave[0]}"); background-position: ${cave[2]}px ${cave[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x12' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x13' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x13' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x13' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x13' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x13' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x13' style='opacity:0;width:32px;height:32px'></td><td id='am7x13' style='opacity:0;width:32px;height:32px'></td><td id='am8x13' style='width:32px;height:32px'></td><td id='am9x13' style='opacity:0;width:32px;height:32px'></td><td id='am10x13' style='opacity:0;width:32px;height:32px'></td><td id='am11x13' style='opacity:0;width:32px;height:32px'></td><td id='am12x13' style='opacity:0;width:32px;height:32px'></td><td id='am13x13' style='opacity:0;width:32px;height:32px'></td><td id='am14x13' style='opacity:0;width:32px;height:32px'></td><td id='am15x13' style='opacity:0;width:32px;height:32px'></td><td id='am16x13' style='opacity:0;width:32px;height:32px'></td><td id='am17x13' style='opacity:0;width:32px;height:32px'></td><td id='am18x13' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmap += `<td id='am19x13' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x13' style='opacity:0;background-image:url("graphics/${hill[0]}"); background-position: ${hill[2]}px ${hill[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x13' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x13' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x13' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `<tr><td id='am1x14' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am2x14' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am3x14' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am4x14' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am5x14' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am6x14' style='opacity:0;width:32px;height:32px'></td><td id='am7x13' style='opacity:0;width:32px;height:32px'></td><td id='am8x13' style='opacity:0;width:32px;height:32px'></td><td id='am9x13' style='opacity:0;width:32px;height:32px'></td><td id='am10x13' style='opacity:0;width:32px;height:32px'></td><td id='am11x13' style='opacity:0;width:32px;height:32px'></td><td id='am12x13' style='opacity:0;width:32px;height:32px'></td><td id='am13x13' style='opacity:0;width:32px;height:32px'></td><td id='am14x13' style='opacity:0;width:32px;height:32px'></td><td id='am15x13' style='opacity:0;width:32px;height:32px'></td><td id='am16x13' style='opacity:0;width:32px;height:32px'></td><td id='am17x13' style='opacity:0;width:32px;height:32px'></td><td id='am18x13' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmap += `<td id='am19x14' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am20x14' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am21x14' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am22x14' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td>`;
  attractmap += `<td id='am23x14' style='opacity:0;background-image:url("graphics/${mountain[0]}"); background-position: ${mountain[2]}px ${mountain[3]}px;width:32px;height:32px'></td></tr>`;
  attractmap += `</table>`;

  let attractmapx = "<table cellpadding='0' cellspacing='0' border='0'>";
  attractmapx += `<tr><td id='amx1x1' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${brazier[0]}");background-position:${brazier[2]}px ${brazier[3]}px'></div></td>`;
  attractmapx += `<td id='amx2x1' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x1' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x1' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x1' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x1' style='opacity:0;width:32px;height:32px'></td><td id='amx7x1' style='opacity:0;width:32px;height:32px'></td><td id='amx8x1' style='opacity:0;width:32px;height:32px'></td><td id='amx9x1' style='opacity:0;width:32px;height:32px'></td><td id='amx10x1' style='opacity:0;width:32px;height:32px'></td><td id='amx11x1' style='opacity:0;width:32px;height:32px'></td><td id='amx12x1' style='opacity:0;width:32px;height:32px'></td><td id='amx13x1' style='opacity:0;width:32px;height:32px'></td><td id='amx14x1' style='opacity:0;width:32px;height:32px'></td><td id='amx15x1' style='opacity:0;width:32px;height:32px'></td><td id='amx16x1' style='opacity:0;width:32px;height:32px'></td><td id='amx17x1' style='opacity:0;width:32px;height:32px'></td><td id='amx18x1' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x1' style='opacity:0;background-image:url("graphics/${ocean[0]}"); background-position: ${ocean[2]}px ${ocean[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x1' style='opacity:0;background-image:url("graphics/${ocean[0]}"); background-position: ${ocean[2]}px ${ocean[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x1' style='opacity:0;background-image:url("graphics/${water[0]}"); background-position: ${water[2]}px ${water[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x1' style='opacity:0;background-image:url("graphics/${water[0]}"); background-position: ${water[2]}px ${water[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x1' style='opacity:0;background-image:url("graphics/${ocean[0]}"); background-position: ${ocean[2]}px ${ocean[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `<tr><td id='amx1x2' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x2' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x2' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${chair[0]}");background-position:${chair[2]}px ${chair[3]}px'></div></td>`;
  attractmapx += `<td id='amx4x2' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${tableedge[0]}");background-position:${tableedge[2]}px ${tableedge[3]}px'></div></td>`;
  attractmapx += `<td id='amx5x2' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${table[0]}");background-position:${table[2]}px ${table[3]}px'></div></td>`;
  attractmapx += `<td id='amx6x2' style='opacity:0;width:32px;height:32px'></td><td id='amx7x2' style='opacity:0;width:32px;height:32px'></td><td id='amx8x2' style='opacity:0;width:32px;height:32px'></td><td id='amx9x2' style='opacity:0;width:32px;height:32px'></td><td id='amx10x2' style='opacity:0;width:32px;height:32px'></td><td id='amx11x2' style='opacity:0;width:32px;height:32px'></td><td id='amx12x2' style='opacity:0;width:32px;height:32px'></td><td id='amx13x2' style='opacity:0;width:32px;height:32px'></td><td id='amx14x2' style='opacity:0;width:32px;height:32px'></td><td id='amx15x2' style='opacity:0;width:32px;height:32px'></td><td id='amx16x2' style='opacity:0;width:32px;height:32px'></td><td id='amx17x2' style='opacity:0;width:32px;height:32px'></td><td id='amx18x2' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x2' style='opacity:0;background-image:url("graphics/${water[0]}"); background-position: ${water[2]}px ${water[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x2' style='opacity:0;background-image:url("graphics/${water[0]}"); background-position: ${water[2]}px ${water[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x2' style='opacity:0;background-image:url("graphics/${water[0]}"); background-position: ${water[2]}px ${water[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x2' style='opacity:0;background-image:url("graphics/${water[0]}"); background-position: ${water[2]}px ${water[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x2' style='opacity:0;background-image:url("graphics/${water[0]}"); background-position: ${water[2]}px ${water[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `<tr><td id='amx1x3' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x3' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x3' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x3' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x3' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x3' style='opacity:0;width:32px;height:32px'></td><td id='amx7x3' style='opacity:0;width:32px;height:32px'></td><td id='amx8x3' style='opacity:0;width:32px;height:32px'></td><td id='amx9x3' style='opacity:0;width:32px;height:32px'></td><td id='amx10x3' style='opacity:0;width:32px;height:32px'></td><td id='amx11x3' style='opacity:0;width:32px;height:32px'></td><td id='amx12x3' style='opacity:0;width:32px;height:32px'></td><td id='amx13x3' style='opacity:0;width:32px;height:32px'></td><td id='amx14x3' style='opacity:0;width:32px;height:32px'></td><td id='amx15x3' style='opacity:0;width:32px;height:32px'></td><td id='amx16x3' style='opacity:0;width:32px;height:32px'></td><td id='amx17x3' style='opacity:0;width:32px;height:32px'></td><td id='amx18x3' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x3' style='opacity:0;background-image:url("graphics/${water[0]}"); background-position: ${water[2]}px ${water[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/nwcoast-sand.gif");'></div></td>`;
  attractmapx += `<td id='amx20x3' style='opacity:0;background-image:url("graphics/${dirtcoast[0]}"); background-position: ${dirtcoast[2]}px ${dirtcoast[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x3' style='opacity:0;background-image:url("graphics/${dirtcoast[0]}"); background-position: ${dirtcoast[2]}px ${dirtcoast[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x3' style='opacity:0;background-image:url("graphics/${dirtcoast[0]}"); background-position: ${dirtcoast[2]}px ${dirtcoast[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x3' style='opacity:0;background-image:url("graphics/${water[0]}"); background-position: ${water[2]}px ${water[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/necoast-sand.gif");'></div></td></tr>`;
  attractmapx += `<tr><td id='amx1x4' style='opacity:0;background-image:url("graphics/${wall[0]}"); background-position: ${wall[2]}px ${wall[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x4' style='opacity:0;background-image:url("graphics/${wall[0]}"); background-position: ${wall[2]}px ${wall[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x4' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${door[0]}");background-position:${door[2]}px ${door[3]}px'></div></td>`;
  attractmapx += `<td id='amx4x4' style='opacity:0;background-image:url("graphics/${wall[0]}"); background-position: ${wall[2]}px ${wall[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x4' style='opacity:0;background-image:url("graphics/${wall[0]}"); background-position: ${wall[2]}px ${wall[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x4' style='opacity:0;width:32px;height:32px'></td><td id='amx7x4' style='opacity:0;width:32px;height:32px'></td><td id='amx8x4' style='opacity:0;width:32px;height:32px'></td><td id='amx9x4' style='opacity:0;width:32px;height:32px'></td><td id='amx10x4' style='opacity:0;width:32px;height:32px'></td><td id='amx11x4' style='opacity:0;width:32px;height:32px'></td><td id='amx12x4' style='opacity:0;width:32px;height:32px'></td><td id='amx13x4' style='opacity:0;width:32px;height:32px'></td><td id='amx14x4' style='opacity:0;width:32px;height:32px'></td><td id='amx15x4' style='opacity:0;width:32px;height:32px'></td><td id='amx16x4' style='opacity:0;width:32px;height:32px'></td><td id='amx17x4' style='opacity:0;width:32px;height:32px'></td><td id='amx18x4' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x4' style='opacity:0;background-image:url("graphics/${dirt[0]}"); background-position: ${dirt[2]}px ${dirt[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x4' style='opacity:0;background-image:url("graphics/${dirt[0]}"); background-position: ${dirt[2]}px ${dirt[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x4' style='opacity:0;background-image:url("graphics/${dirt[0]}"); background-position: ${dirt[2]}px ${dirt[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x4' style='opacity:0;background-image:url("graphics/${dirt[0]}"); background-position: ${dirt[2]}px ${dirt[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x4' style='opacity:0;background-image:url("graphics/${dirt[0]}"); background-position: ${dirt[2]}px ${dirt[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `<tr><td id='amx1x5' style='opacity:0;background-image:url("graphics/${sign[0]}"); background-position: ${sign[2]}px ${sign[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x5' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x5' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x5' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x5' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x5' style='opacity:0;width:32px;height:32px'></td><td id='amx7x5' style='opacity:0;width:32px;height:32px'></td><td id='amx8x5' style='opacity:0;width:32px;height:32px'></td><td id='amx9x5' style='opacity:0;width:32px;height:32px'></td><td id='amx10x5' style='opacity:0;width:32px;height:32px'></td><td id='amx11x5' style='opacity:0;width:32px;height:32px'></td><td id='amx12x5' style='opacity:0;width:32px;height:32px'></td><td id='amx13x5' style='opacity:0;width:32px;height:32px'></td><td id='amx14x5' style='opacity:0;width:32px;height:32px'></td><td id='amx15x5' style='opacity:0;width:32px;height:32px'></td><td id='amx16x5' style='opacity:0;width:32px;height:32px'></td><td id='amx17x5' style='opacity:0;width:32px;height:32px'></td><td id='amx18x5' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x5' style='opacity:0;background-image:url("graphics/${dirt[0]}"); background-position: ${dirt[2]}px ${dirt[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x5' style='opacity:0;background-image:url("graphics/${dirt[0]}"); background-position: ${dirt[2]}px ${dirt[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x5' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x5' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x5' style='opacity:0;background-image:url("graphics/${dirt[0]}"); background-position: ${dirt[2]}px ${dirt[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `<tr><td id='amx1x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${post[0]}");background-position:${post[2]}px ${post[3]}px'></div></td>`;
  attractmapx += `<td id='amx2x6' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x6' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x6' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x6' style='opacity:0;width:32px;height:32px'></td><td id='amx7x4' style='opacity:0;width:32px;height:32px'></td><td id='amx8x4' style='opacity:0;width:32px;height:32px'></td><td id='amx9x4' style='opacity:0;width:32px;height:32px'></td><td id='amx10x4' style='opacity:0;width:32px;height:32px'></td><td id='amx11x4' style='opacity:0;width:32px;height:32px'></td><td id='amx12x4' style='opacity:0;width:32px;height:32px'></td><td id='amx13x4' style='opacity:0;width:32px;height:32px'></td><td id='amx14x4' style='opacity:0;width:32px;height:32px'></td><td id='amx15x4' style='opacity:0;width:32px;height:32px'></td><td id='amx16x4' style='opacity:0;width:32px;height:32px'></td><td id='amx17x4' style='opacity:0;width:32px;height:32px'></td><td id='amx18x4' style='opacity:0;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x6' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x6' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x6' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `<tr><td id='amx1x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x7' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x7' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x7' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx7x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx8x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx9x7' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx10x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${tree[0]}");background-position:${tree[2]}px ${tree[3]}px'></div></td>`;
  attractmapx += `<td id='amx11x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx12x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx13x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx14x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx15x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx16x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx17x7' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx18x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x7' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x7' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `<tr><td id='amx1x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx7x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx8x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx9x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx10x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx11x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx12x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx13x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx14x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx15x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx16x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx17x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx18x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x8' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x8' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `<tr><td id='amx1x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx7x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx8x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx9x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx10x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx11x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx12x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx13x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx14x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx15x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx16x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx17x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx18x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x9' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${wpnsign[0]}");background-position:${wpnsign[2]}px ${wpnsign[3]}px'></div></td>`;
  attractmapx += `<td id='amx23x9' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${rightpost[0]}");background-position:${rightpost[2]}px ${rightpost[3]}px'></div></td></tr>`;
  attractmapx += `<tr><td id='amx1x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x10' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x10' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x10' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx7x10' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx8x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx9x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx10x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${tree[0]}");background-position:${tree[2]}px ${tree[3]}px'></div></td>`;
  attractmapx += `<td id='amx11x10' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx12x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx13x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx14x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx15x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx16x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx17x10' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx18x10' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx19x10' style='opacity:0;background-image:url("graphics/${wall[0]}"); background-position: ${wall[2]}px ${wall[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x10' style='opacity:0;background-image:url("graphics/${wall[0]}"); background-position: ${wall[2]}px ${wall[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x10' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/${door[0]}");background-position:${door[2]}px ${door[3]}px'></div></td>`;
  attractmapx += `<td id='amx22x10' style='opacity:0;background-image:url("graphics/${wall[0]}"); background-position: ${wall[2]}px ${wall[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x10' style='opacity:0;background-image:url("graphics/${wall[0]}"); background-position: ${wall[2]}px ${wall[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `<tr><td id='amx1x11' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x11' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x11' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x11' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x11' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x11' style='opacity:0;width:32px;height:32px'></td><td id='amx7x11' style='opacity:0;width:32px;height:32px'></td><td id='amx8x11' style='width:32px;height:32px'></td><td id='amx9x11' style='opacity:0;width:32px;height:32px'></td><td id='amx10x11' style='opacity:0;width:32px;height:32px'></td><td id='amx11x11' style='opacity:0;width:32px;height:32px'></td><td id='amx12x11' style='opacity:0;width:32px;height:32px'></td><td id='amx13x11' style='opacity:0;width:32px;height:32px'></td><td id='amx14x11' style='opacity:0;width:32px;height:32px'></td><td id='amx15x11' style='opacity:0;width:32px;height:32px'></td><td id='amx16x11' style='opacity:0;width:32px;height:32px'></td><td id='amx17x11' style='opacity:0;width:32px;height:32px'></td><td id='amx18x11' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmapx += `<td id='amx19x11' style='opacity:0;background-image:url("graphics/${wall[0]}"); background-position: ${wall[2]}px ${wall[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x11' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x11' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x11' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x11' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `<tr><td id='amx1x12' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x12' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x12' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x12' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x12' style='opacity:0;background-image:url("graphics/${brush[0]}"); background-position: ${brush[2]}px ${brush[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x12' style='opacity:0;width:32px;height:32px'></td><td id='amx7x12' style='opacity:0;width:32px;height:32px'></td><td id='amx8x12' style='width:32px;height:32px'></td><td id='amx9x12' style='opacity:0;width:32px;height:32px'></td><td id='amx10x12' style='opacity:0;width:32px;height:32px'></td><td id='amx11x12' style='opacity:0;width:32px;height:32px'></td><td id='amx12x12' style='opacity:0;width:32px;height:32px'></td><td id='amx13x12' style='opacity:0;width:32px;height:32px'></td><td id='amx14x12' style='opacity:0;width:32px;height:32px'></td><td id='amx15x12' style='opacity:0;width:32px;height:32px'></td><td id='amx16x12' style='opacity:0;width:32px;height:32px'></td><td id='amx17x12' style='opacity:0;width:32px;height:32px'></td><td id='amx18x12' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmapx += `<td id='amx19x12' style='opacity:0;background-image:url("graphics/${wall[0]}"); background-position: ${wall[2]}px ${wall[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x12' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x12' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x12' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'><div style='width:32px;height:32px;background-image:url("graphics/civ_green.gif");'></div></td>`;
  attractmapx += `<td id='amx23x12' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `<tr><td id='amx1x13' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x13' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x13' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x13' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x13' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x13' style='opacity:0;width:32px;height:32px'></td><td id='amx7x13' style='opacity:0;width:32px;height:32px'></td><td id='amx8x13' style='width:32px;height:32px'></td><td id='amx9x13' style='opacity:0;width:32px;height:32px'></td><td id='amx10x13' style='opacity:0;width:32px;height:32px'></td><td id='amx11x13' style='opacity:0;width:32px;height:32px'></td><td id='amx12x13' style='opacity:0;width:32px;height:32px'></td><td id='amx13x13' style='opacity:0;width:32px;height:32px'></td><td id='amx14x13' style='opacity:0;width:32px;height:32px'></td><td id='amx15x13' style='opacity:0;width:32px;height:32px'></td><td id='amx16x13' style='opacity:0;width:32px;height:32px'></td><td id='amx17x13' style='opacity:0;width:32px;height:32px'></td><td id='amx18x13' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmapx += `<td id='amx19x13' style='opacity:0;background-image:url("graphics/${wall[0]}"); background-position: ${wall[2]}px ${wall[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x13' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x13' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x13' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x13' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `<tr><td id='amx1x14' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx2x14' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx3x14' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx4x14' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx5x14' style='opacity:0;background-image:url("graphics/${grass[0]}"); background-position: ${grass[2]}px ${grass[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx6x14' style='opacity:0;width:32px;height:32px'></td><td id='amx7x13' style='opacity:0;width:32px;height:32px'></td><td id='amx8x13' style='opacity:0;width:32px;height:32px'></td><td id='amx9x13' style='opacity:0;width:32px;height:32px'></td><td id='amx10x13' style='opacity:0;width:32px;height:32px'></td><td id='amx11x13' style='opacity:0;width:32px;height:32px'></td><td id='amx12x13' style='opacity:0;width:32px;height:32px'></td><td id='amx13x13' style='opacity:0;width:32px;height:32px'></td><td id='amx14x13' style='opacity:0;width:32px;height:32px'></td><td id='amx15x13' style='opacity:0;width:32px;height:32px'></td><td id='amx16x13' style='opacity:0;width:32px;height:32px'></td><td id='amx17x13' style='opacity:0;width:32px;height:32px'></td><td id='amx18x13' style='opacity:0;width:32px;height:32px'></td>`;  
  attractmapx += `<td id='amx19x14' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx20x14' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx21x14' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx22x14' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td>`;
  attractmapx += `<td id='amx23x14' style='opacity:0;background-image:url("graphics/${cobble[0]}"); background-position: ${cobble[2]}px ${cobble[3]}px;width:32px;height:32px'></td></tr>`;
  attractmapx += `</table>`;
  
  let attractdiv = document.getElementById("attract1");
  if (attractdiv) { 
    attractdiv.innerHTML = attractmap;
    attractdiv = document.getElementById("attract2");
    if (attractdiv) {
      attractdiv.innerHTML = attractmapx;
      ExecuteAttract(0);
    }
  }
}

function DoActionTitle(code, e) {
  if (gamestate.getMode() === "intro") {
    RunIntro(introidx);
    introidx++;
  }
  if (gamestate.getMode() === "on") {
    if ((code === 38) || (code === 219)) {    // up arrow or [
      if (optselect > 0) {
        let img = "opt" + optselect;
        document.getElementById(img).classList.remove("menuselect");
        document.getElementById(img).classList.add("menuplain");
        optselect--;
        img = "opt" + optselect;
        if ((optselect !== 2) || (gamestate.getLatestSaveIndex() !== -1)) {
          document.getElementById(img).classList.remove("menuplain");
          document.getElementById(img).classList.add("menuselect");            
        } else {
          optselect--;
          img = "opt" + optselect;
          document.getElementById(img).classList.remove("menuplain");
          document.getElementById(img).classList.add("menuselect");  
        }
      }
    }
    else if ((code === 40) || (code === 191)) {
      if (optselect < 3) {
        let img = "opt" + optselect;
        document.getElementById(img).classList.remove("menuselect");
        document.getElementById(img).classList.add("menuplain");
        optselect++;
        img = "opt" + optselect;
        if ((optselect !== 2) || (gamestate.getLatestSaveIndex() !== -1)) {
          document.getElementById(img).classList.remove("menuplain");
          document.getElementById(img).classList.add("menuselect");            
        } else {
          optselect++;
          img = "opt" + optselect;
          document.getElementById(img).classList.remove("menuplain");
          document.getElementById(img).classList.add("menuselect");            
        }
      }
    }
    else if ((code === 32) || (code === 13)) {
      if (optselect === 0) {
        introidx = 0;
        RunIntro(introidx);
        introidx++;
      }
      else if (optselect === 1) {
        CharCreate();
      }
      else if (optselect === 2) {
//        window.open("game.html", "_self");
        CreateGameSpace();
        dusong.song.pause();
        dusong = {};
        StartGame();
      }
      else if (optselect === 3) {
        alert("credits");
      }
    }
  }
  else if (gamestate.getMode() === "name") {
    if (((code >= 65) && (code <= 90)) || (code === 32)) {
      if (charname.length < 15) {
        let letter = String.fromCharCode(code);  
        if (!e.shiftKey) {
          letter = letter.toLowerCase();
        }
        charname += letter;
        let chartxt = "Enter character name: <span style='color:gold'>" + charname + "</span>";
        if (charname.length < 15) { chartxt += "_"; }
        document.getElementById('charprompt').innerHTML = chartxt;
      }
    } else if (code === 8) {  // backspace
      if (charname.length) {
        charname = charname.substr(0,charname.length-1);
        let chartxt = "Enter character name: <span style='color:gold'>" + charname + "</span>_";
        document.getElementById('charprompt').innerHTML = chartxt;
      }
    } else if (code === 13) { // enter
      if (charname.length) {
        let chartxt = "<span style='color:gold'>" + charname + "</span><br /><br />Specify your gender: (M)ale, (F)emale, or (O)ther/decline to state";
        document.getElementById('charprompt').innerHTML = chartxt;
        gamestate.setMode("gender");
      }
    }
  } else if (gamestate.getMode() === "gender") {
    if (code === 70) {
      gender = "female";
      ChooseGraphic();
    } else if (code === 79) {
      gender = "other";
      ChooseGraphic();
    } else if (code === 77) {
      gender = "male";
      ChooseGraphic();
    }
  } else if (gamestate.getMode() === "graphic") {
    if ((code === 38) || (code === 219)) { // up
      if (avatarselect.y > 0) {
        document.getElementById(avatarselect.y + "x" + avatarselect.x).style.backgroundColor = "black";
        avatarselect.y--;
        document.getElementById(avatarselect.y + "x" + avatarselect.x).style.backgroundColor = "white";
      }
    } else if ((code === 37) || (code === 186)) {  // left
      if (avatarselect.x > 0) {
        document.getElementById(avatarselect.y + "x" + avatarselect.x).style.backgroundColor = "black";
        avatarselect.x--;
        document.getElementById(avatarselect.y + "x" + avatarselect.x).style.backgroundColor = "white";
      }
    } else if ((code === 39) || (code === 222)) { // right
      if (((avatarselect.y === 3) && (avatarselect.x < 3)) || ((avatarselect.y < 3) && (avatarselect.x < 5))) {
        document.getElementById(avatarselect.y + "x" + avatarselect.x).style.backgroundColor = "black";
        avatarselect.x++;
        document.getElementById(avatarselect.y + "x" + avatarselect.x).style.backgroundColor = "white";
      }
    } else if ((code === 40) || (code === 191)) {
      if (((avatarselect.x > 3) && (avatarselect.y < 2)) || ((avatarselect.y < 3) && (avatarselect.x < 4))) {
        document.getElementById(avatarselect.y + "x" + avatarselect.x).style.backgroundColor = "black";
        avatarselect.y++;
        document.getElementById(avatarselect.y + "x" + avatarselect.x).style.backgroundColor = "white";
      }
    } else if ((code === 32) || (code === 13)) { // space or enter
      graphic = avatars[avatarselect.y][avatarselect.x];
      SaveChar();
      SecondPage();
    }
  }
}

function CharCreate() {
  charname = "";
  gender = "";
  graphic = "";
  let charprompt = "<div style='position:absolute;left:100px;top:100px'><p class='charcreate' id='charprompt'>Enter character name: _</p></div>";
  document.getElementById('maindiv').innerHTML = charprompt;
  gamestate.setMode("name");
}

function ChooseGraphic() {
  gamestate.setMode("graphic");
  let chartxt = "<div style='position:absolute;left:100px;top:100px'><p class='charcreate'><span style='color:gold'>" + charname + "</span><br /><span style='color:white'>";
  if (gender === "male") { chartxt += "Male"; }
  if (gender === "female") { chartxt += "Female"; }
  if (gender === "other") { chartxt += "Other"; }
  chartxt += "</span></p><p class='charcreate'>Choose your avatar:</p>";
  
  chartxt += "<table cellpadding='2' cellspacing='10' cellborder='0'>";
  for (let i=0; i<=3; i++) {
    chartxt += "<tr>";
    for (let j=0; j<=5; j++) {
      if ((i!==3) || (j<4)) { 
        chartxt += "<td id='" + i + "x" + j + "'><img src='graphics/" + avatars[i][j] + "' /></td>";
      }
    }
    chartxt += "</tr>";
  }
  chartxt += "</table></div>";
  document.getElementById('maindiv').innerHTML = chartxt;

  document.getElementById('0x0').style.backgroundColor = "white";
}

function SaveChar() {
  DU.merchants = {};
  DU.merchants = SetMerchants();
  DU.randomseed = Math.floor(Math.random()*100)+1;
  
  PC.setPCName(charname);
  PC.setGraphic(graphic);
  PC.setGender(gender);
  PC.skintone = avskin[avatarselect.y][avatarselect.x];
  
  themap = maps.addMap("darkunknown");
  maps.addMap("ellusus_limbo");

  PC.setHomeMap(themap);
  PC.setx(69);
  PC.sety(74);
  PC.getHomeMap().placeThing(PC.getx(),PC.gety(),PC);
  let dagger = localFactory.createTile("Dagger");
  PC.addToInventory(dagger, 1);

  dagger.equipMe(PC);
//  PC.setEquipment("weapon",dagger);
  let armor = localFactory.createTile("ClothArmor");
  PC.addToInventory(armor, 1);
  armor.equipMe(PC);
//  PC.setEquipment("armor",armor);
  let homekey = localFactory.createTile("HomeKey");
  PC.addToInventory(homekey,1);

  DU.gameflags.setFlag("knows_avery", 1);
  
  let PCEvent = new GameEvent(PC);
	DUTime.addAtTimeInterval(PCEvent,.0001);
	
	gamestate.saveGame(9);
	
  saveIndex[9].loc = "Char Create";
//	localStorage.saveIndex = JSON.stringify(testvar);
}

function RunIntro(idx) {
  if (idx === 0) {
    gamestate.setMode("null");
    dusong.song.pause();
    dusong = {};
    dusong.name = "Charcreate";
    dusong.song = new Audio(GetMusicPath("Charcreate"));
    dusong.song.play();
    dusong.song.loop = true;

    let firstpage = `<div style='width:770;position: relative;left:5px;top:15px' id='introcontainer'>
      <table cellpadding='0' cellspacing='5' border='0'><tr>
      <td id='splash'><img id='splash1' src='graphics/splash/Castle-Day-NoRider.gif' /></td>
      <td style='vertical-align:top; padding-top: 4px' id='splashtxt'><div id='intro1' style='color:white;padding-left:5px'><p class='charcreate'>You were born the second child of the ruling family of Ellusus- King Daragen and Queen Shelaria Olympus. Being the younger, your life is full of tutors and lessons, but also opportunity, for the weight of being heir falls upon your brother, Prince Lance.</p></div>
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
      <div id='intro8' style='color:white;opacity:0'><p class='charcreate'>Shocked and saddened, your parents have summoned you to the ruling seat, Castle dea Olympus. The time for study is over. The time for leisure is past. You lock your dwelling behind you, and now as you stand outside the gates you prepare to enter and learn what lies in store for you...</p></div>`;
      document.getElementById('intro8').classList.add('presentfadein');
      document.getElementById('splash5').classList.add('presentfadein');  
    },1000);
  } else if (idx === 8) {
    gamestate.setMode("null");
    document.getElementById('splash5').classList.remove('presentfadein');  
    document.getElementById('splash5').classList.add('titlefadeout');
    document.getElementById('splashtxt').classList.add('titlefadeout');
    setTimeout(function() {
      SecondPage();
      dusong.song.pause();
      dusong = {};
      dusong.name = "Dark Unknown";
      dusong.song = new Audio(GetMusicPath("Dark Unknown"));
      dusong.song.play();
      dusong.song.loop = true;
  
    },1000);
  }
  return;
}

function CreateGameSpace() {
  optnames = [];
  avatars = [];
  avatarselect = {};

  document.removeEventListener("keydown", el);

  document.getElementById('gamebody').innerHTML = `<div id="worldlayer" style="position:absolute;left:20px;top:20px;width:416px;height:416px;z-index:10"><img src="graphics/spacer.gif" width='416' height='416' /></div>
	
  <div id="gamecontainer" style="position:abolute;left:0px;top:0px;z-index:-10; background-color:black;">
    <div style="position:absolute;left:0px;top:0px;z-index:99;width:776px"><img src="graphics/frame/frame.gif" /></div>
    <div style="position:absolute;left:128px;top:1px;width:16px;height:16px;" id="sky12"></div><div style="position:absolute;left:144px;top:1px;width:16px;height:16px;" id="sky11"></div><div style="position:absolute;left:160px;top:1px;width:16px;height:16px;" id="sky10"></div><div style="position:absolute;left:176px;top:1px;width:16px;height:16px;" id="sky9"></div><div style="position:absolute;left:192px;top:1px;width:16px;height:16px;" id="sky8"></div><div style="position:absolute;left:208px;top:1px;width:16px;height:16px;" id="sky7"></div><div style="position:absolute;left:224px;top:1px;width:16px;height:16px;" id="sky6"></div><div style="position:absolute;left:240px;top:1px;width:16px;height:16px;" id="sky5"></div><div style="position:absolute;left:256px;top:1px;width:16px;height:16px;" id="sky4"></div><div style="position:absolute;left:272px;top:1px;width:16px;height:16px;" id="sky3"></div><div style="position:absolute;left:288px;top:1px;width:16px;height:16px;" id="sky2"></div><div style="position:absolute;left:306px;top:1px;width:16px;height:16px;" id="sky1"></div>
    <div style="position:absolute;left:128px;top:1px;width:196px;height:16px;z-index:100;text-align:center;color:white" class="oversky" id="oversky"></div>
    <div style="position:absolute;left:100px;top:437px;width:256px;z-index:100;background-color:black" class="topbar" id="topbarframe">Loading...</div>
    <div style="position:absolute;left:20px;top:20px;width:416px;height:416px;z-index:20;" class="mainframe" id="displayframe">&nbsp;</div>
    <div style="position:absolute;left:456px;top:20px;width:300px;height:40px;background-color:black;z-index:99;" id="charstats" class="charstats" onClick="DoAction(90)">&nbsp;</div>
    <div style="position:absolute;left:456px;top:80px;width:300px;height:356px;background-color:black;z-index:99;" id="textframe" class="textframe">
      <div id="maintextframe" class="maintextframe"><div id="innertextframe" class="innertextframe">&nbsp;</div></div>
      <div id="inputtext" class="inputtext">&nbsp;</div>
    </div>
    
  </div>
          <div class="spellbook" id="spellbookdiv" style="position:absolute; left:150px; top:50px; z-index:100;"><div id="spellbookinnerdiv"> <p>Spellbook test.</p></div></div>
          <div id="combateffects" style="position:absolute; left: 20px; top: 20px; z-index: 60; width:416px; height:416px;"></div>
          <div id="spelleffects" style="position:absolute; left: 20px; top: 20px; z-index: 65; width:416px; height:416px;"></div>
          <div id="audiocontainer" style="display:none"></div>
          <div id="uiinterface" style="position:absolute; left: 19px; top: 20px; z-index: 70; width:416px; height:416px;"></div>
          <img id="turnframe" src="graphics/frame/turn-frame-friendly.gif" style="position:absolute; left: 0px; top: 0px; z-index:65; display:none; width:36px; height:36px" /> `;
}

function ExecuteAttract(frame) {
  let board1 = document.getElementById("attract1");
  let door = localFactory.createTile("DoorWindow").getGraphicArray();
  let opendoor = ["master_spritesheet.png",0,-192,-704];
  let chair = localFactory.createTile("LeftChair").getGraphicArray();
  let food = localFactory.createTile("FoodSouthEdge").getGraphicArray();
  let tableedge = localFactory.createTile("LeftTable").getGraphicArray();
  let fireball;

  if (!board1) { return; }
  let dur = 500;
  switch (frame) {
    case 0:
      ShowTiles("",10,7,14,10,1);
      dur = 3000;
      break;
    case 1:
      document.getElementById("am12x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      break;
    case 2:
      document.getElementById("am12x8").innerHTML = ``;
      document.getElementById("am13x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",10,7,10,10);
      ShowTiles("",15,7,15,10);
      break;
    case 3:
      document.getElementById("am13x8").innerHTML = ``;
      document.getElementById("am14x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",11,7,11,10);
      ShowTiles("",16,7,16,10);
      break;
    case 4:
      document.getElementById("am14x8").innerHTML = ``;
      document.getElementById("am15x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",12,7,12,10);
      ShowTiles("",17,7,17,10);
      break;
    case 5:
      document.getElementById("am15x8").innerHTML = ``;
      document.getElementById("am16x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",13,7,13,10);
      ShowTiles("",18,7,18,10);
      break;
    case 6:
      document.getElementById("am16x8").innerHTML = ``;
      document.getElementById("am17x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",14,7,14,10);
      ShowTiles("",19,7,19,10);
      break;
    case 7:
      document.getElementById("am17x8").innerHTML = ``;
      document.getElementById("am18x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",15,7,15,10);
      ShowTiles("",20,7,20,10);
      break;
    case 8:
      document.getElementById("am18x8").innerHTML = ``;
      document.getElementById("am19x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",16,7,16,10);
      ShowTiles("",21,7,21,10);
      ShowTiles("",19,6,21,6);
//      ShowTiles("",19,11,21,11);
      break;
    case 9:
      document.getElementById("am19x8").innerHTML = ``;
      document.getElementById("am20x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",17,7,17,10);
      ShowTiles("",22,6,22,10);
      break;
    case 10:
      document.getElementById("am20x8").innerHTML = ``;
      document.getElementById("am21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",18,7,18,10);
      ShowTiles("",23,6,23,10);
      break;
    case 11:
      document.getElementById("am21x8").innerHTML = ``;
      document.getElementById("am21x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",19,10,23,10);
      ShowTiles("",19,5,23,5);
      break;
    case 12:
      document.getElementById("am21x7").innerHTML = ``;
      document.getElementById("am21x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",19,9,23,9);
      ShowTiles("",19,4,23,4);
      break;
    case 13:
      document.getElementById("am21x6").innerHTML = ``;
      document.getElementById("am21x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",19,8,23,8);
      ShowTiles("",19,3,23,3);
      break;
    case 14:
      document.getElementById("am21x5").innerHTML = ``;
      document.getElementById("am21x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",19,7,23,7);
      ShowTiles("",19,2,23,2);
      break;
    case 15:
      document.getElementById("am21x4").innerHTML = ``;
      document.getElementById("am21x3").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",19,6,23,6);
      ShowTiles("",19,1,23,1);
      break;
    case 16: 
      document.getElementById("am21x3").innerHTML = ``;
      document.getElementById("am21x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/153.gif");'><div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div></div>`;
      HideTiles("",19,5,23,5);
      break;
    case 17:
      document.getElementById("am21x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/153.gif");'></div>`;
      dur = 1200;
      break;
    case 18:
      HideTiles("",19,4,23,4);
      HideTiles("",19,1,19,3);
      HideTiles("",23,1,23,3);
      break;
    case 19:
      HideTiles("",20,1,22,1);
      HideTiles("",20,2,20,3);
      HideTiles("",22,2,22,3);
      HideTiles("",21,3,21,3);
      break;
    case 20:
      HideTiles("",21,2,21,2);
      dur = 1200;
      break;
    case 21:
      ShowTiles("x",3,11,3,11);
      break;
    case 22:
      ShowTiles("x",2,10,4,12);
      break;
    case 23:
      ShowTiles("x",1,9,5,13);
      break;
    case 24:
      document.getElementById("amx3x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      break;
    case 25:
      document.getElementById("amx3x11").innerHTML = ``;
      document.getElementById("amx3x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("x",1,13,5,13);
      ShowTiles("x",1,8,5,8);
      break;
    case 26:
      document.getElementById("amx3x10").innerHTML = ``;
      document.getElementById("amx3x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("x",1,12,5,12);
      ShowTiles("x",1,7,5,7);
      break;
    case 27:
      document.getElementById("amx3x9").innerHTML = ``;
      document.getElementById("amx3x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("x",1,11,5,11);
      ShowTiles("x",1,6,5,6);
      break;
    case 28:
      document.getElementById("amx3x8").innerHTML = ``;
      document.getElementById("amx3x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("x",1,10,5,10);
      ShowTiles("x",1,5,5,5);
      break;
    case 29:
      document.getElementById("amx3x7").innerHTML = ``;
      document.getElementById("amx3x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("x",1,9,5,9);
      ShowTiles("x",1,4,5,4);
      break;
    case 30:
      document.getElementById("amx3x6").innerHTML = ``;
      document.getElementById("amx3x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("x",1,8,5,8);
      ShowTiles("x",1,3,5,3);
      break;
    case 31:
      document.getElementById("amx3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      break;
    case 32:
      document.getElementById("amx3x5").innerHTML = ``;
      document.getElementById("amx3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'><div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div></div>`;
      HideTiles("x",1,7,5,7);
      ShowTiles("x",1,2,5,2);
      break;
    case 33:
      document.getElementById("amx3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      document.getElementById("amx3x3").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("x",1,6,5,6);
      ShowTiles("x",1,1,5,1);
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
      ShowTiles("x",1,6,5,6);
      HideTiles("x",1,1,5,1);      
      break;
    case 39:
      document.getElementById("amx3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      document.getElementById("amx3x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",1,7,5,7);
      HideTiles("x",1,2,5,2);
      break;
    case 40:
      document.getElementById("amx3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${door[0]}");background-position:${door[2]}px ${door[3]}px'></div>`;
      break;
    case 41: 
      document.getElementById("amx3x5").innerHTML = ``;
      document.getElementById("amx3x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",1,8,5,8);
      HideTiles("x",1,3,5,3);
      break;    
    case 42:
      document.getElementById("amx3x6").innerHTML = ``;
      document.getElementById("amx3x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",1,9,5,9);
      HideTiles("x",1,4,5,4);
      break;   
    case 43:
      document.getElementById("amx3x7").innerHTML = ``;
      document.getElementById("amx3x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",1,10,5,10);
      HideTiles("x",1,5,5,5);
      break;
    case 44:
      document.getElementById("amx3x8").innerHTML = ``;
      document.getElementById("amx4x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",6,6,6,10);
      HideTiles("x",1,6,1,10);
      break;
    case 45: 
      document.getElementById("amx4x8").innerHTML = ``;
      document.getElementById("amx5x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",7,6,7,10);
      HideTiles("x",2,6,2,10);
      break;
    case 46:
      document.getElementById("amx5x8").innerHTML = ``;
      document.getElementById("amx6x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",8,6,8,10);
      HideTiles("x",3,6,3,10);
      break;
    case 47:
      document.getElementById("amx6x8").innerHTML = ``;
      document.getElementById("amx7x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",9,6,9,10);
      HideTiles("x",4,6,4,10);
      break;
    case 48:
      document.getElementById("amx7x8").innerHTML = ``;
      document.getElementById("amx8x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",10,6,10,10);
      HideTiles("x",5,6,5,10);
      break;
    case 49:
      document.getElementById("amx8x8").innerHTML = ``;
      document.getElementById("amx9x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",11,6,11,10);
      HideTiles("x",6,6,6,10);
      break;
    case 50:
      document.getElementById("amx9x8").innerHTML = ``;
      document.getElementById("amx10x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",12,6,12,10);
      HideTiles("x",7,6,7,10);
      break;
    case 51:
      document.getElementById("amx10x8").innerHTML = ``;
      document.getElementById("amx11x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",13,6,13,10);
      HideTiles("x",8,6,8,10);
      break;
    case 52:
      document.getElementById("amx11x8").innerHTML = ``;
      document.getElementById("amx12x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",14,6,14,10);
      HideTiles("x",9,6,9,10);
      break;
    case 53:
      document.getElementById("amx12x8").innerHTML = ``;
      document.getElementById("amx13x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",15,6,15,10);
      HideTiles("x",10,6,10,10);
      break;
    case 54:
      document.getElementById("amx13x8").innerHTML = ``;
      document.getElementById("amx14x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",16,6,16,10);
      HideTiles("x",11,6,11,10);
      break;
    case 55:
      document.getElementById("amx14x8").innerHTML = ``;
      document.getElementById("amx15x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",17,6,17,10);
      HideTiles("x",12,6,12,10);
      break;
    case 56:
      document.getElementById("amx15x8").innerHTML = ``;
      document.getElementById("amx16x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",18,6,18,10);
      HideTiles("x",13,6,13,10);
      break;
    case 57:
      document.getElementById("amx16x8").innerHTML = ``;
      document.getElementById("amx17x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",19,6,19,10);
      HideTiles("x",14,6,14,10);
      break;
    case 58:
      document.getElementById("amx17x8").innerHTML = ``;
      document.getElementById("amx18x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",20,6,20,10);
      HideTiles("x",15,6,15,10);
      break;
    case 59:
      document.getElementById("amx18x8").innerHTML = ``;
      document.getElementById("amx19x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",21,6,21,10);
      HideTiles("x",16,6,16,10);
      break;
    case 60:
      document.getElementById("amx19x8").innerHTML = ``;
      document.getElementById("amx20x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",22,6,22,10);
      HideTiles("x",17,6,17,10);
      break;
    case 61:
      document.getElementById("amx20x8").innerHTML = ``;
      document.getElementById("amx21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",23,6,23,10);
      HideTiles("x",18,6,18,10);
      break;
    case 62:
      document.getElementById("amx21x8").innerHTML = ``;
      document.getElementById("amx21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",19,11,23,11);
      HideTiles("x",19,6,23,6);
      break;
    case 63:
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      break;
    case 64:
      document.getElementById("amx21x9").innerHTML = ``;
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'><div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div></div>`;
      ShowTiles("x",19,12,23,12);
      HideTiles("x",19,7,23,7);
      break;
    case 65:
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      document.getElementById("amx21x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      ShowTiles("x",19,13,23,13);
      HideTiles("x",19,8,23,8);
      dur = 1200;
      break;
    case 66:
      document.getElementById("amx21x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      break;
    case 67:
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'><div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div></div>`;
      document.getElementById("amx21x11").innerHTML = ``;
      HideTiles("x",19,13,23,13);
      ShowTiles("x",19,8,23,8);
      break;
    case 68:
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${opendoor[0]}");background-position:${opendoor[2]}px ${opendoor[3]}px'></div>`;
      document.getElementById("amx21x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      HideTiles("x",19,12,23,12);
      ShowTiles("x",19,7,23,7);
      break;
    case 69:
      document.getElementById("amx21x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/${door[0]}");background-position:${door[2]}px ${door[3]}px'></div>`;
      break;
    case 70:
      document.getElementById("amx21x9").innerHTML = ``;
      document.getElementById("amx21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      HideTiles("x",19,11,23,11);
      ShowTiles("x",19,6,23,6);
      break;
    case 71:
      document.getElementById("amx21x8").innerHTML = ``;
      document.getElementById("amx21x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      HideTiles("x",19,10,23,10);
      ShowTiles("x",19,5,23,5);
      break;
    case 72:
      document.getElementById("amx21x7").innerHTML = ``;
      document.getElementById("amx21x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      HideTiles("x",19,9,23,9);
      ShowTiles("x",19,4,23,4);
      break;
    case 73:
      document.getElementById("amx21x6").innerHTML = ``;
      document.getElementById("amx21x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      HideTiles("x",19,8,23,8);
      ShowTiles("x",19,3,23,3);
      break;
    case 74:
      document.getElementById("amx21x5").innerHTML = ``;
      document.getElementById("amx21x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      HideTiles("x",19,7,23,7);
      ShowTiles("x",19,2,23,2);
      dur=2000;
      break;
    case 75:
      document.getElementById("amx21x4").innerHTML = ``;
      document.getElementById("amx21x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      ShowTiles("x",19,7,23,7);
      HideTiles("x",19,2,23,2);
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
      HideTiles("x",19,3,19,7);
      break;
    case 80:
      HideTiles("x",20,3,20,7);
      break;
    case 81:
      HideTiles("x",21,3,21,7);
      break;
    case 82:
      HideTiles("x",22,3,22,7);
      break;
    case 83:
      HideTiles("x",23,3,23,7);
      break;
    case 84:
      dur = 10;
      break;
    case 85:
      ShowTiles("",21,2,21,2);
      break;
    case 86:
      ShowTiles("",20,1,22,1);
      ShowTiles("",20,2,20,3);
      ShowTiles("",22,2,22,3);
      ShowTiles("",21,3,21,3);
      break;
    case 87:
      ShowTiles("",19,4,23,4);
      ShowTiles("",19,1,19,3);
      ShowTiles("",23,1,23,3);
      break;
    case 88:
      document.getElementById("am21x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/153.gif");'><div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div></div>`;
      break;
    case 89:
      document.getElementById("am21x2").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/153.gif");'></div>`;
      document.getElementById("am21x3").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      ShowTiles("",19,5,23,5);
      break;
    case 90:
      document.getElementById("am21x3").innerHTML = ``;
      document.getElementById("am21x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      ShowTiles("",19,6,23,6);
      HideTiles("",19,1,23,1);
      break;
    case 91:
      document.getElementById("am21x4").innerHTML = ``;
      document.getElementById("am21x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      ShowTiles("",19,7,23,7);
      HideTiles("",19,2,23,2);
      document.getElementById("am22x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'></div>`;
      ShowTiles("",20,10,23,13);
      break;
    case 92:
      document.getElementById("am21x5").innerHTML = ``;
      document.getElementById("am21x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      ShowTiles("",19,8,23,8);
      HideTiles("",19,3,23,3);
      document.getElementById("am22x12").innerHTML = ``;
      document.getElementById("am21x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'></div>`;
      ShowTiles("",19,10,19,13);
      break;
    case 93:
      document.getElementById("am21x6").innerHTML = ``;
      document.getElementById("am21x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      ShowTiles("",19,9,23,9);
      HideTiles("",19,4,23,4);
      document.getElementById("am21x12").innerHTML = ``;
      document.getElementById("am21x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/339.gif");'></div>`;
      break;
    case 94:
      document.getElementById("am21x7").innerHTML = ``;
      document.getElementById("am21x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      HideTiles("",19,4,23,4);
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
      HideTiles("",19,5,23,5);
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
      HideTiles("",19,6,23,6);
      document.getElementById("am21x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/337.gif");'><div style='width:32px;height:32px;background-image:url("graphics/spellsparkles-anim.gif");background-position:0px -160px'></div></div>`;
      break;
    case 112:
      document.getElementById("am21x10").innerHTML = ``;      
      document.getElementById("am21x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;      
      HideTiles("",19,7,23,7);
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
      HideTiles("",19,8,23,8);
      break;
    case 118:
      document.getElementById("am21x12").innerHTML = ``;
      document.getElementById("am22x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;      
      HideTiles("",19,9,19,13);
      break;
    case 119:
      document.getElementById("am22x12").innerHTML = ``;
      break;
    case 120:
      HideTiles("",20,9,20,13);
      break;
    case 121:
      HideTiles("",21,9,21,13);
      break;
    case 122:
      HideTiles("",22,9,22,13);
      break;
    case 123:
      HideTiles("",23,9,23,13);
      dur = 1200;
      break;
    case 124:
      ShowTiles("",2,12,2,12);
      break;
    case 125:
      ShowTiles("",1,11,3,13);
      break;
    case 126:
      ShowTiles("",1,10,4,14);
      break;
    case 127:
      document.getElementById("am2x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      break;
    case 128:
      document.getElementById("am3x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am2x12").innerHTML = ``;
      ShowTiles("",1,10,5,14);
      break;
    case 129:
      document.getElementById("am4x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am3x12").innerHTML = ``;
      ShowTiles("",2,10,6,14);
      HideTiles("",1,10,1,14);
      break;
    case 130:
      document.getElementById("am4x11").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am4x12").innerHTML = ``;
      ShowTiles("",2,9,6,13);
      break;
    case 131:
      document.getElementById("am4x10").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am4x11").innerHTML = ``;
      ShowTiles("",2,8,6,12);
      break;
    case 132:
      document.getElementById("am2x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      ShowTiles("",1,10,5,14);
      break;
    case 133:
      document.getElementById("am4x9").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am4x10").innerHTML = ``;
      ShowTiles("",2,7,5,7);
      break;
    case 134:
      document.getElementById("am2x12").innerHTML = ``;
      document.getElementById("am3x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      break;
    case 135:
      document.getElementById("am4x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am4x9").innerHTML = ``;
      ShowTiles("",2,6,5,6);
      break;
    case 136:
      document.getElementById("am3x12").innerHTML = ``;
      document.getElementById("am4x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/385.gif");'></div>`;
      document.getElementById("am2x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/351.gif");'></div>`;
      break;
    case 137:
      document.getElementById("am3x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am4x8").innerHTML = ``;
      ShowTiles("",1,6,5,6);
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
      ShowTiles("",1,5,5,5);
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
      ShowTiles("",1,4,5,4);
      break;
    case 144:
      document.getElementById("am3x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'><div style='width:32px;height:32px;background-image:url("graphics/spellsparkles-anim.gif");background-position:0px -32px'></div></div>`;
      dur = 800;
      break;
    case 145:
      document.getElementById("am3x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am3x6").innerHTML = ``;
      ShowTiles("",1,3,5,3);
      break;
    case 146: 
      document.getElementById("am4x12").innerHTML = ``;
      document.getElementById("am3x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/351.gif");'></div>`;
      break;    
    case 147:
      document.getElementById("am3x4").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am3x5").innerHTML = ``;
      ShowTiles("",1,2,5,2);
      break;
    case 148:
      document.getElementById("am3x12").innerHTML = ``;
      document.getElementById("am2x12").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/351.gif");'></div>`;
      break;    
    case 149:
      document.getElementById("am3x3").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/300.gif");'></div>`;
      document.getElementById("am3x4").innerHTML = ``;
      ShowTiles("",1,1,5,1);
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
      HideTiles("",1,6,5,14);
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
      ShowTiles("",1,5,5,5);
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
      HideTiles("",1,1,5,1);
      ShowTiles("",1,6,5,6);
      break;
    case 179:
      document.getElementById("am3x4").innerHTML = ``;
      document.getElementById("am3x5").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",1,2,5,2);
      ShowTiles("",1,7,5,7);
      break;
    case 180:
      document.getElementById("am3x5").innerHTML = ``;
      document.getElementById("am3x6").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",1,3,5,3);
      ShowTiles("",1,8,5,8);
      break;
    case 181:
      document.getElementById("am3x6").innerHTML = ``;
      document.getElementById("am3x7").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",1,4,5,4);
      ShowTiles("",1,9,5,9);
      break;
    case 182:
      document.getElementById("am3x7").innerHTML = ``;
      document.getElementById("am3x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",1,5,5,5);
      ShowTiles("",1,10,5,10);
      break;
    case 183:
      document.getElementById("am3x8").innerHTML = ``;
      document.getElementById("am4x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",1,6,1,10);
      ShowTiles("",6,7,6,10);
      break;
    case 184:
      document.getElementById("am4x8").innerHTML = ``;
      document.getElementById("am5x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",2,6,2,10);
      ShowTiles("",7,7,7,10);
      break;
    case 185:
      document.getElementById("am5x8").innerHTML = ``;
      document.getElementById("am6x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",3,6,3,10);
      ShowTiles("",8,7,8,10);
      break;
    case 186:
      document.getElementById("am6x8").innerHTML = ``;
      document.getElementById("am7x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",4,6,4,10);
      ShowTiles("",9,7,9,10);
      break;
    case 187:
      document.getElementById("am7x8").innerHTML = ``;
      document.getElementById("am8x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",5,6,5,10);
      ShowTiles("",10,7,10,10);
      break;
    case 188:
      document.getElementById("am8x8").innerHTML = ``;
      document.getElementById("am9x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",6,7,6,10);
      ShowTiles("",11,7,11,10);
      break;
    case 189:
      document.getElementById("am9x8").innerHTML = ``;
      document.getElementById("am10x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",7,7,7,10);
      ShowTiles("",12,7,12,10);
      break;
    case 190:
      document.getElementById("am10x8").innerHTML = ``;
      document.getElementById("am11x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",8,7,8,10);
      ShowTiles("",13,7,13,10);
      break;
    case 191:
      document.getElementById("am11x8").innerHTML = ``;
      document.getElementById("am12x8").innerHTML = `<div style='width:32px;height:32px;background-image:url("graphics/310.gif");'></div>`;
      HideTiles("",9,7,9,10);
      ShowTiles("",14,7,14,10);
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
  setTimeout(function() { ExecuteAttract(frame+1) },dur);
}

function HideTiles(board,x1,y1,x2,y2) {
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

function ShowTiles(board,x1,y1,x2,y2,fadein) {
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
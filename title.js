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
//  let fleft = Math.floor(browserwidth/2 - 400);
//  if (fleft < 0) { fleft = 0; }
//  let ftop = Math.floor(browserheight/2 - 300);
//  if (ftop < 0) { ftop = 0; }
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
  let sptop = browserheight/2 - 300;
  if (sptop < 0 ) { sptop = 0; }
  let opttop = sptop + 250;
  if (opttop === 250) { opttop = 200; }
  let optleft = browserwidth/2 - 215;
  optselect = 0;
  let spage = "<div id='DU' style='position:absolute;left:" + sleft + "px;top:" + sptop + "px;opacity:0'><img src='graphics/title/du_logo.png' /></div><div id='options'></div>";
  document.getElementById('maindiv').innerHTML = spage;
  lastanim = "DU";
  document.getElementById('DU').classList.add('presentfadein');
  setTimeout(function() {
    
    spage = "<div id='intro' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;opacity:0'><img id='opt0' src='graphics/title/intro-g.gif' onClick='makeChoice(\'intro\')' /></div>";
    opttop += 60;
    spage += "<div id='create' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;opacity:0'><img id='opt1' src='graphics/title/create.gif' onClick='makeChoice(\'create\')' /></div>";
    opttop += 60;
    let journey = "journey.gif";
    if (gamestate.getLatestSaveIndex() === -1) {
      journey = "journey-d.gif";
      optnames[2] = "graphics/title/journey-d";
    } else {
      optnames[2] = "graphics/title/journey";
    }
    spage += "<div id='journey' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;opacity:0'><img id='opt2' src='graphics/title/" + journey + "' onClick='makeChoice(\'journey\')' /></div>";
    opttop += 60;
    spage += "<div id='credits' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;opacity:0'><img id='opt3' src='graphics/title/credits.gif' onClick='makeChoice(\'credits\')' /></div>";
    document.getElementById('options').innerHTML = spage;
    document.getElementById('intro').classList.add('presentfadein');
    document.getElementById('create').classList.add('presentfadein');
    document.getElementById('journey').classList.add('presentfadein');
    document.getElementById('credits').classList.add('presentfadein');
    setTimeout(function() { pagelive(); }, 1000);
  },1000);
}

function finishedFinalPage() {
  let sleft = browserwidth/2 - 200;
  let sptop = browserheight/2 - 300;
  if (sptop < 0 ) { sptop = 0; }
  let opttop = sptop + 250;
  if (opttop === 250) { opttop = 200; }
  let optleft = browserwidth/2 - 215;
  optselect = 0;
  let spage = "<div id='DU' style='position:absolute;left:" + sleft + "px;top:" + sptop + "px;'><img src='graphics/title/du_logo.png' /></div><div id='options'></div>";
  document.getElementById('maindiv').innerHTML = spage;
  spage = "<div id='intro' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;'><img id='opt0' src='graphics/title/intro-g.gif' onClick='makeChoice(\'intro\')' /></div>";
  opttop += 60;
  spage += "<div id='create' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;'><img id='opt1' src='graphics/title/create.gif' onClick='makeChoice(\'create\')' /></div>";
  opttop += 60;
  let journey = "journey.gif";
  if (gamestate.getLatestSaveIndex() === -1) {
    journey = "journey-d.gif";
    optnames[2] = "graphics/title/journey-d";
  } else {
    optnames[2] = "graphics/title/journey";
  }
  spage += "<div id='journey' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;'><img id='opt2' src='graphics/title/" + journey + "' onClick='makeChoice(\'journey\')' /></div>";
  opttop += 60;
  spage += "<div id='credits' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;'><img id='opt3' src='graphics/title/credits.gif' onClick='makeChoice(\'credits\')' /></div>";
  document.getElementById('options').innerHTML = spage;
  pagelive();

}

function pagelive() {
  gamestate.setMode("on");
  
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
        document.getElementById(img).src = optnames[optselect] + ".gif";
        optselect--;
        img = "opt" + optselect;
        if ((optselect !== 2) || (gamestate.getLatestSaveIndex() !== -1)) {
          document.getElementById(img).src = optnames[optselect] + "-g.gif";
        } else {
          optselect--;
          img = "opt" + optselect;
          document.getElementById(img).src = optnames[optselect] + "-g.gif";
        }
      }
    }
    else if ((code === 40) || (code === 191)) {
      if (optselect < 3) {
        let img = "opt" + optselect;
        document.getElementById(img).src = optnames[optselect] + ".gif";
        optselect++;
        img = "opt" + optselect;
        if ((optselect !== 2) || (gamestate.getLatestSaveIndex() !== -1)) {
          document.getElementById(img).src = optnames[optselect] + "-g.gif";
        } else {
          optselect++;
          img = "opt" + optselect;
          document.getElementById(img).src = optnames[optselect] + "-g.gif";
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

  PC.setEquipment("weapon",dagger);
  let armor = localFactory.createTile("ClothArmor");
  PC.addToInventory(armor, 1);
  PC.setEquipment("armor",armor);
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
    <div style="position:absolute;left:128px;top:1px;width:196px;height:16px;z-index:100;text-align:center;" id="oversky"></div>
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
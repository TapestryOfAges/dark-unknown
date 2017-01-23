"use strict";

var Dice = new DiceObject();

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
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
  "graphics/title/import.gif",
  "graphics/title/import-g.gif",
  "graphics/title/present.gif",
  "graphics/title/and.gif",
]);

var optnames = [];
optnames[0] = "graphics/title/intro";
optnames[1] = "graphics/title/create";
optnames[2] = "graphics/title/journey";
optnames[3] = "graphics/title/credits";
optnames[4] = "graphics/title/import";

var avatars = [];
avatars[0] = ["300.2.gif", "300.gif", "301.gif", "shepherd-offcolor.gif", "302.gif", "druid-offcolor.gif"];
avatars[1] = ["303.2.gif", "303.gif", "304.2.gif", "304.gif", "305.gif", "ranger-offcolor.gif"];
avatars[2] = ["306.gif", "307.2.gif", "307.gif", "308.gif", "311.gif", "tinker-offcolor.gif"];
avatars[3] = ["bard-offcolor.gif", "fighter-offcolor.gif", "paladin-offcolor.gif", "mage-offcolor.gif", "", ""];

var avatarselect = {};
avatarselect.x = 0;
avatarselect.y = 0;

var maxserial = 0;
var mappages = new Pages();
var localFactory = new tileFactory();
var eidos = new Platonic();

var gamestate = new GameStateData();
gamestate.setMode("null");
var DU = {};
DU.gameflags = new Gameflags();
DU.gameflags.setFlag("music", 1);
DU.gameflags.setFlag("loopmusic", 1);
DU.gameflags.setFlag("sound", 1);
DU.gameflags.setFlag("ambientsound", 1);

var nowplaying;
var optselect = 0;
var charname = "";
var gender = "";
var graphic = "";
var dusong;
DU.DUTime = new Timeline(0);
var DUTime = DU.DUTime; // alias
DU.maps = new MapMemory();
var maps = DU.maps; // alias
var debug = 0;
var PC = new PCObject();
PC.assignSerial();
var musicloaded = {};
var musictries = 0;
DU.merchants = {};
DU.merchants = SetMerchants();
DU.randomseed = Math.floor(Math.random()*100)+1;
var introidx = 0;

var firsttime = 1;
var themap;
themap = new GameMap();
var Listener = new DUListener();

var latestidx;
var testvar;

var lastanim = "";
var whoseturn; 

$(document).ready(function() {
  audio_init_title();  

  if (firsttime) {
    $(document).keydown(function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if (gamestate.getMode() !== "import") {
        e.preventDefault();
      }
    
      if (gamestate.getMode() !== "null") {
        DoAction(code, e);
      } else {
        $(lastanim).stop(true,false);
        finishedFinalPage();
      }
        
    });
    firsttime = 0;
  }

  latestidx = gamestate.getLatestSaveIndex();
  if (latestidx === -1) {
    gamestate.initializeSaveGames();
  }
  
  var browserheight = $(window).height();
  var browserwidth = $(window).width();
  
  var fleft = Math.floor(browserwidth/2 - 400);
  if (fleft < 0) { fleft = 0; }
  var ftop = Math.floor(browserheight/2 - 300);
  if (ftop < 0) { ftop = 0; }
  var signl = fleft+324;
  var signt = ftop+121;
  var firstpage = "<div id='allofem'><div id='ToA' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;width:800;height:209;display:none'><img src='graphics/title/ToA_banner_blank.gif' /></div><div id=\"over\" style=\"position:absolute;left:"+fleft+"px;top:"+ftop+"px;width:2px;height:209px;z-index:5;display:none;background-image:url('graphics/title/ToA_banner_ToA-only.gif');background-position: 0px 0px\"></div>";
  firstpage += "<div id='sign' style='position:absolute;z-index:10;left:" + signl + "px;display:none;top:" + signt + "px;width:162;height:52;background-image:url(\"graphics/title/games_signature.gif\");background-position: 0px 0px;color:white'></div>";
  var animateto = fleft+800;
  fleft = fleft+370;
  ftop = ftop+230;
  firstpage += "<div id='and' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;display:none'><img src='graphics/title/and.gif' /></div>";
  fleft = browserwidth/2 - 111;
  ftop = ftop+50;
  firstpage += "<div id='gf' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;display:none'><img src='graphics/title/gf.gif' /></div>";
  fleft = browserwidth/2 - 59;
  ftop = ftop+70;
  firstpage += "<div id='present' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;display:none'><img src='graphics/title/present.gif' /></div></div>";

  $("#maindiv").html(firstpage);
  setTimeout(function() {
    start_animations();      
  }, 100);
});

function start_animations() {
  if ((musicloaded["Dark Unknown"] && musicloaded["Charcreate"]) || (musictries >= 10)) {
    dusong = DUPlayMusic("Dark Unknown");
    $("#ToA").fadeIn(1700, function() {
      $("#over").css("display", "inline");
      lastanim = "#over";
      $("#over").animate({ width: "800px" }, 3700, function() {
        $("#sign").css("display", "inline");
        Signature(-52);
      });
    });
  } else {
    musictries++;
    setTimeout(function() {
      start_animations();      
    }, 100);
  } 
}

function Signature(val) {
  if (val === -4212) { FirstPage(); return; }
  lastanim = "#sign";
  $("#sign").css("background-position", "0px " + val + "px");
  setTimeout(function() { Signature(val-52);}, 25);
}

function FirstPage() {
  $("#ToA").html("<img src='graphics/title/ToA_banner-b.gif' />");
  $("#sign").css("display","none");
  $("#over").css("display","none");
  lastanim = "#and";
  $("#and").fadeIn(1200, function() {
    lastanim = "#gf";
    $("#gf").fadeIn(700, function() {
      lastanim = "#present";
      $("#present").fadeIn(1400, function() {
        setTimeout(function() {
          $("#present").fadeOut(1000);
          $("#gf").fadeOut(1000);
          $("#and").fadeOut(1000);
          $("#sign").fadeOut(1000);
          $("#over").fadeOut(1000);
          $("#ToA").fadeOut(1000, function() {
            SecondPage();
          });
        }, 1300);
      });
    });
  });
}


function SecondPage() {
  
  var browserheight = $(window).height();
  var browserwidth = $(window).width();

  var sleft = browserwidth/2 - 200;
  var sptop = browserheight/2 - 300;
  if (sptop < 0 ) { sptop = 0; }
  var opttop = sptop + 250;
  if (opttop === 250) { opttop = 200; }
  var optleft = browserwidth/2 - 215;
  optselect = 0;
  var spage = "<div id='DU' style='position:absolute;left:" + sleft + "px;top:" + sptop + "px;display:none'><img src='graphics/title/du_logo.png' /></div><div id='options'></div>";
  $("#maindiv").html(spage);
  lastanim = "#DU";
  $("#DU").fadeIn(1000, function() {
    
    spage = "<div id='intro' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img id='opt0' src='graphics/title/intro-g.gif' onClick='makeChoice(\'intro\')' /></div>";
    opttop += 60;
    spage += "<div id='create' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img id='opt1' src='graphics/title/create.gif' onClick='makeChoice(\'create\')' /></div>";
    opttop += 60;
    var journey = "journey.gif";
    if (latestidx === -1) {
      journey = "journey-d.gif";
      optnames[2] = "graphics/title/journey-d";
    } else {
      optnames[2] = "graphics/title/journey";
    }
    spage += "<div id='journey' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img id='opt2' src='graphics/title/" + journey + "' onClick='makeChoice(\'journey\')' /></div>";
    opttop += 60;
    spage += "<div id='credits' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img id='opt3' src='graphics/title/credits.gif' onClick='makeChoice(\'credits\')' /></div>";
    opttop += 60;
    spage += "<div id='import' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img id='opt4' src='graphics/title/import.gif' onClick='makeChoice(\'import\')' /></div>";
    $("#options").html(spage);
    $("#intro").fadeIn(1000);
    $("#create").fadeIn(1000);
    $("#journey").fadeIn(1000);
    $("#import").fadeIn(1000);
    $("#credits").fadeIn(1000, function() { pagelive(); });
  });
}

function finishedFinalPage() {
  var browserheight = $(window).height();
  var browserwidth = $(window).width();

  var sleft = browserwidth/2 - 200;
  var sptop = browserheight/2 - 300;
  if (sptop < 0 ) { sptop = 0; }
  var opttop = sptop + 250;
  if (opttop === 250) { opttop = 200; }
  var optleft = browserwidth/2 - 215;
  optselect = 0;
  var spage = "<div id='DU' style='position:absolute;left:" + sleft + "px;top:" + sptop + "px;'><img src='graphics/title/du_logo.png' /></div><div id='options'></div>";
  $("#maindiv").html(spage);
  spage = "<div id='intro' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;'><img id='opt0' src='graphics/title/intro-g.gif' onClick='makeChoice(\'intro\')' /></div>";
  opttop += 60;
  spage += "<div id='create' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;'><img id='opt1' src='graphics/title/create.gif' onClick='makeChoice(\'create\')' /></div>";
  opttop += 60;
  var journey = "journey.gif";
  if (latestidx === -1) {
    journey = "journey-d.gif";
    optnames[2] = "graphics/title/journey-d";
  } else {
    optnames[2] = "graphics/title/journey";
  }
  spage += "<div id='journey' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;'><img id='opt2' src='graphics/title/" + journey + "' onClick='makeChoice(\'journey\')' /></div>";
  opttop += 60;
  spage += "<div id='credits' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;'><img id='opt3' src='graphics/title/credits.gif' onClick='makeChoice(\'credits\')' /></div>";
  opttop += 60;
  spage += "<div id='import' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;'><img id='opt4' src='graphics/title/import.gif' onClick='makeChoice(\'import\')' /></div>";
  $("#options").html(spage);
  pagelive();

}

function pagelive() {
  gamestate.setMode("on");
  
}


function DoAction(code, e) {
  if (gamestate.getMode() === "intro") {
    RunIntro(introidx);
    introidx++;
  }
  if (gamestate.getMode() === "on") {
    if ((code === 38) || (code === 219)) {    // up arrow or [
      if (optselect > 0) {
        var img = "opt" + optselect;
        $("#"+img).attr("src", optnames[optselect] + ".gif");
        optselect--;
        img = "opt" + optselect;
        if ((optselect !== 2) || (latestidx !== -1)) {
          $("#"+img).attr("src", optnames[optselect] + "-g.gif");
        } else {
          optselect--;
          img = "opt" + optselect;
          $("#"+img).attr("src", optnames[optselect] + "-g.gif");
        }
      }
    }
    else if ((code === 40) || (code === 191)) {
      if (optselect < 4) {
        var img = "opt" + optselect;
        $("#"+img).attr("src", optnames[optselect] + ".gif");
        optselect++;
        img = "opt" + optselect;
        if ((optselect !== 2) || (latestidx !== -1)) {
          $("#"+img).attr("src", optnames[optselect] + "-g.gif");
        } else {
          optselect++;
          img = "opt" + optselect;
          $("#"+img).attr("src", optnames[optselect] + "-g.gif");
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
        window.open("game.html", "_self");
      }
      else if (optselect === 3) {
        alert("credits");
      }
      else if (optselect === 4) {
        // import save
        ImportSave();
      }
    }
  }
  else if (gamestate.getMode() === "name") {
    if (((code >= 65) && (code <= 90)) || (code === 32)) {
      if (charname.length < 15) {
        var letter = String.fromCharCode(code);  
        if (!e.shiftKey) {
          letter = letter.toLowerCase();
        }
        charname += letter;
        var chartxt = "Enter character name: <span style='color:gold'>" + charname + "</span>";
        if (charname.length < 15) { chartxt += "_"; }
        $("#charprompt").html(chartxt);
      }
    } else if (code === 8) {  // backspace
      if (charname.length) {
        charname = charname.substr(0,charname.length-1);
        var chartxt = "Enter character name: <span style='color:gold'>" + charname + "</span>_";
        $("#charprompt").html(chartxt);
      }
    } else if (code === 13) { // enter
      if (charname.length) {
        var chartxt = "<span style='color:gold'>" + charname + "</span><br /><br />Specify your gender: (M)ale, (F)emale, or (O)ther/decline to state";
        $("#charprompt").html(chartxt);
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
        $("#" + avatarselect.y + "x" + avatarselect.x).css("background-color","black");
        avatarselect.y--;
        $("#" + avatarselect.y + "x" + avatarselect.x).css("background-color","white");
      }
    } else if ((code === 37) || (code === 59)) {  // left
      if (avatarselect.x > 0) {
        $("#" + avatarselect.y + "x" + avatarselect.x).css("background-color","black");
        avatarselect.x--;
        $("#" + avatarselect.y + "x" + avatarselect.x).css("background-color","white");
      }
    } else if ((code === 39) || (code === 222)) { // right
      if (((avatarselect.y === 3) && (avatarselect.x < 3)) || ((avatarselect.y < 3) && (avatarselect.x < 5))) {
        $("#" + avatarselect.y + "x" + avatarselect.x).css("background-color","black");
        avatarselect.x++;
        $("#" + avatarselect.y + "x" + avatarselect.x).css("background-color","white");
      }
    } else if ((code === 40) || (code === 191)) {
      if (((avatarselect.x > 3) && (avatarselect.y < 2)) || ((avatarselect.y < 3) && (avatarselect.x < 4))) {
        $("#" + avatarselect.y + "x" + avatarselect.x).css("background-color","black");
        avatarselect.y++;
        $("#" + avatarselect.y + "x" + avatarselect.x).css("background-color","white");
      }
    } else if ((code === 32) || (code === 13)) { // space or enter
      graphic = avatars[avatarselect.y][avatarselect.x];
      SaveChar();
      SecondPage();
    }
  }
}

function CharCreate() {
  var charprompt = "<div style='position:absolute;left:100px;top:100px'><p class='charcreate' id='charprompt'>Enter character name: _</p></div>";
  $("#maindiv").html(charprompt);
  gamestate.setMode("name");
}

function ChooseGraphic() {
  gamestate.setMode("graphic");
  var chartxt = "<div style='position:absolute;left:100px;top:100px'><p class='charcreate'><span style='color:gold'>" + charname + "</span><br /><span style='color:white'>";
  if (gender === "male") { chartxt += "Male"; }
  if (gender === "female") { chartxt += "Female"; }
  if (gender === "other") { chartxt += "Other"; }
  chartxt += "</span></p><p class='charcreate'>Choose your avatar:</p>";
  
  chartxt += "<table cellpadding='2' cellspacing='10' cellborder='0'>";
  for (var i=0; i<=3; i++) {
    chartxt += "<tr>";
    for (var j=0; j<=5; j++) {
      if ((i!==3) || (j<4)) { 
        chartxt += "<td id='" + i + "x" + j + "'><img src='graphics/" + avatars[i][j] + "' /></td>";
      }
    }
    chartxt += "</tr>";
  }
  chartxt += "</table></div>";
  $("#maindiv").html(chartxt);
  
  $("#0x0").css("background-color","white");
}

function SaveChar() {
  PC.setPCName(charname);
  PC.setGraphic(graphic);
  PC.setGender(gender);
  
  themap.loadMap("darkunknown");
  maps.addMapByRef(themap);

  PC.setHomeMap(themap);
  PC.setx(69);
  PC.sety(74);
  PC.getHomeMap().placeThing(PC.getx(),PC.gety(),PC);
  var dagger = localFactory.createTile("Dagger");
  PC.addToInventory(dagger, 1);
  PC.addGold(100);
  PC.setEquipment("weapon",dagger);
  var armor = localFactory.createTile("ClothArmor");
  PC.addToInventory(armor, 1);
  PC.setEquipment("armor",armor);

var PCEvent = new GameEvent(PC);
	DUTime.addAtTimeInterval(PCEvent,.0001);
	startScheduler();
	
	gamestate.saveGame(9);
	latestidx = gamestate.getLatestSaveIndex();
	
	testvar = JSON.parse(localStorage.saveIndex);
	testvar[9].loc = "Char Create";
	localStorage.saveIndex = JSON.stringify(testvar);
}

function ImportSave() {
  gamestate.setMode("import");
  var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
  $('#importbubble').jqm({onShow:myOpen});
  $('#importbubble').jqmShow();

}

function SubmitImport(val) {
  if (val) {
    var serialized = document.forms[0].importjson.value;
    try {
      var savedata = JSON.parse(serialized); 
      localStorage.manualsave = serialized;
    }
    catch(err) {
      alert("Save is invalid.");
    }
    finally {
      gamestate.setMode("on");  
    }
  }
}

function RunIntro(idx) {
  if (idx === 0) {
    gamestate.setMode("null");
    dusong.song.stop();
    dusong = {};
    dusong = DUPlayMusic("Charcreate");
    var introleft = ($(window).width())/2 - 300;
    
    // add float image to each page if/when I have them.
    var firstpage = "<div style='width:600;position: relative;left:" + introleft + "' id='introcontainer'><div id='intro1' style='color:white'><p class='charcreate'>You were born the second child of the ruling family of Ellusus- King Daragan and Queen Shelaria Olympus. Being the younger, your life is full of tutors and lessons, but also opportunity, for the weight of being heir falls upon your brother, Prince Lance.</p></div></div>";
    $('#maindiv').fadeOut(1000, function() {
      $('#maindiv').html(firstpage);
      $('#maindiv').fadeIn(1000);
      gamestate.setMode("intro");
    });
  } else if (idx === 1) {
    var secondpage = "<div id='intro2' style='color:white;display:none'><p class='charcreate'>And Lance seemed made for the role. All things came easily to him- his studies of magic, of combat, of dance, of diplomacy. Which makes these events all the more surprising.</p></div>";
    $('#introcontainer').append(secondpage);
    $('#intro2').fadeIn(1000);
  } else if (idx === 2) {
    var thirdpage = "<div id='intro3' style='color:white;display:none'><p class='charcreate'>Which is not to say that you did not excel, when you began your studies years behind your older brother. Guard Captain Nyrani has been teaching you to fight. Your tutor in wizardry says that you show promise, and someday will earn your own spellbook. And you have surprised your parents with your skill on the harpsichord. Of limited use in statecraft, perhaps, but still satisfying.</p></div>";
    $('#introcontainer').append(thirdpage);
    $('#intro3').fadeIn(1000);
  } else if (idx === 3) {
    var nextpage = "<div id='intro4' style='color:white;display:none'><p class='charcreate'>The land has been at peace since the end of the civil war nearly 40 years ago. Six years ago, your grandfather passed away and your parents ascended the throne of Ellusus. The transition was smooth, and while King Erik was beloved as the one who had ended the war, that goodwill had seemed to pass readily enough to the new monarchs.</p></div>";
    $('#introcontainer').html(nextpage);
    $('#intro4').fadeIn(1000);
  } else if (idx === 4) {
    var nextpage = "<div id='intro5' style='color:white;display:none'><p class='charcreate'>Lance, then, completed his tutelage a few years ago, and was then charged with getting to know the kingdom, and so he has been away traveling, and you have not seen him in some time. There are rumors of the time he has spent- he has saved an old crone, and won a boon; he has battled a dragon; he has fallen into drunkeness and embarrassed your parents.</p></div>";
    $('#introcontainer').append(nextpage);
    $('#intro5').fadeIn(1000);
  } else if (idx === 5) {
    var nextpage = "<div id='intro6' style='color:white;display:none'><p class='charcreate'>But a few months ago, Lance moved into an old castle, ruined from the war, and begun rebuilding. And then, to the surprise of everyone, he planted his banner and declared that he was in rebellion- that he, rather than your father, should rule Ellusus.</p></div>";
    $('#introcontainer').html(nextpage);
    $('#intro6').fadeIn(1000);
  } else if (idx === 6) {
    var nextpage = "<div id='intro7' style='color:white;display:none'><p class='charcreate'>Shocked and saddened, your parents have summoned you to the ruling seat, Castle dea Olympus. The time for study is over. The time for leisure is past. As you stand now outside the gates, you prepare to enter and learn what lies in store for you...</p></div>";
    $('#introcontainer').append(nextpage);
    $('#intro7').fadeIn(1000);
  } else if (idx === 7) {
    gamestate.setMode("null");
    SecondPage();
  }
  return;
}



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
  "graphics/title/present.gif",
  "graphics/title/and.gif",
]);

var optnames = [];
optnames[0] = "graphics/title/intro";
optnames[1] = "graphics/title/create";
optnames[2] = "graphics/title/journey";
optnames[3] = "graphics/title/credits";

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
DU.gameflags = {};
DU.gameflags.music = 1;
DU.gameflags.sound = 1;
DU.gameflags.tablet = 0;
DU.gameflags.autosave = 0;
DU.gameflags.negate = {};
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

var firsttime = 1;
var themap;
themap = new GameMap();


$(document).ready(function() {
  audio_init();  
  var browserheight = $(window).height();
  var browserwidth = $(window).width();
  
  var fleft = Math.floor(browserwidth/2 - 400);
  if (fleft < 0) { fleft = 0; }
  var ftop = Math.floor(browserheight/2 - 300);
  if (ftop < 0) { ftop = 0; }
  var signl = fleft+324;
  var signt = ftop+121;
  var firstpage = "<div id='allofem'><div id='ToA' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;width:800;height:209;display:none'><img src='graphics/title/ToA_banner_ToA-only.gif' /></div><div id=\"over\" style=\"position:absolute;left:"+fleft+"px;top:"+ftop+"px;width:800px;height:209px;z-index:5;display:none;background-image:url('graphics/title/ToA_banner_blank.gif');background-position: 0px 0px\"></div>";
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
  dusong = DUPlayMusic("Dark Unknown");
  $("#over").fadeIn(2000, function() {
    $("#ToA").css("display", "inline");
    $("#over").animate({ left: animateto + "px", width: "0px", backgroundPosition: "-800px 0px" }, 4200, function() {
      $("#sign").css("display", "inline");
      Signature(-52);
    });
  });
  }, 20);
});

function Signature(val) {
  if (val === -4212) { FirstPage(); return; }
  $("#sign").css("background-position", "0px " + val + "px");
  setTimeout(function() { Signature(val-52);}, 100);
}

function FirstPage() {
  $("#and").fadeIn(1200, function() {
    $("#gf").fadeIn(700, function() {
      $("#present").fadeIn(1400, function() {
        return;
        setTimeout(function() {
          $("#present").fadeOut(1000);
          $("#gf").fadeOut(1000);
          $("#and").fadeOut(1000);
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
  var opttop = sptop + 250;
  var optleft = browserwidth/2 - 215;
  optselect = 0;
  var spage = "<div id='DU' style='position:absolute;left:" + sleft + "px;top:" + sptop + "px;display:none'><img src='graphics/title/du_logo.gif' /></div><div id='options'></div>";
  $("#maindiv").html(spage);
  $("#DU").fadeIn(1000, function() {
    
    spage = "<div id='intro' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img id='opt0' src='graphics/title/intro-g.gif' onClick='makeChoice(\'intro\')' /></div>";
    opttop += 60;
    spage += "<div id='create' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img id='opt1' src='graphics/title/create.gif' onClick='makeChoice(\'create\')' /></div>";
    opttop += 60;
    var journey = "journey.gif";
    if (!localStorage.savegame) {
      journey = "journey-d.gif";
      optnames[2] = "graphics/title/journey-d";
    } else {
      optnames[2] = "graphics/title/journey";
    }
    spage += "<div id='journey' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img id='opt2' src='graphics/title/" + journey + "' onClick='makeChoice(\'journey\')' /></div>";
    opttop += 60;
    spage += "<div id='credits' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img id='opt3' src='graphics/title/credits.gif' onClick='makeChoice(\'credits\')' /></div>";
    $("#options").html(spage);
    $("#intro").fadeIn(1000);
    $("#create").fadeIn(1000);
    $("#journey").fadeIn(1000);
    $("#credits").fadeIn(1000, function() { pagelive(); });
  });
}

function pagelive() {
  gamestate.setMode("on");
  
  if (firsttime) {
    $(document).keydown(function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      e.preventDefault();
    
      if (gamestate.getMode() !== "null") {
        DoAction(code, e);
      }
    });
    firsttime = 0;
  }
}


function DoAction(code, e) {
  if (gamestate.getMode() === "on") {
    if ((code === 38) || (code === 219)) {
      if (optselect > 0) {
        var img = "opt" + optselect;
        $("#"+img).attr("src", optnames[optselect] + ".gif");
        optselect--;
        img = "opt" + optselect;
        if ((optselect !== 2) || (localStorage.savegame)) {
          $("#"+img).attr("src", optnames[optselect] + "-g.gif");
        } else {
          optselect--;
          img = "opt" + optselect;
          $("#"+img).attr("src", optnames[optselect] + "-g.gif");
        }
      }
    }
    else if ((code === 40) || (code === 191)) {
      if (optselect < 3) {
        var img = "opt" + optselect;
        $("#"+img).attr("src", optnames[optselect] + ".gif");
        optselect++;
        img = "opt" + optselect;
        if ((optselect !== 2) || (localStorage.savegame)) {
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
        alert("intro");
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
	
	gamestate.saveGame();
}
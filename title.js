
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

var mappages = new Pages();
var localFactory = new tileFactory();
var eidos = new Platonic();

var DU = {};
DU.gameflags = {};
DU.gameflags.music = 1;
DU.gameflags.sound = 1;
var nowplaying;


$(document).ready(function() {
  audio_init();  
  var browserheight = $(window).height();
  var browserwidth = $(window).width();
  
  var fleft = browserwidth/2 - 400;
  if (fleft < 0) { fleft = 0; }
  var ftop = browserheight/2 - 300;
  if (ftop < 0) { ftop = 0; }
  var firstpage = "<div id='allofem'><div id='ToA' style='position:absolute;left:" + fleft + "px;top:" + ftop + "px;display:none'><img src='graphics/title/ToA_banner-b.jpg' /></div>";
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
  $("#ToA").fadeIn(2000, function() {
    $("#and").fadeIn(1000, function() {
      $("#gf").fadeIn(400, function() {
        $("#present").fadeIn(1400, function() {
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
  });
});

function SecondPage() {
  var dusong = DUPlaySound("Dark Unknown");
  
  var browserheight = $(window).height();
  var browserwidth = $(window).width();

  var sleft = browserwidth/2 - 200;
  var sptop = browserheight/2 - 300;
  var opttop = sptop + 250;
  var optleft = browserwidth/2 - 215;
  var spage = "<div id='DU' style='position:absolute;left:" + sleft + "px;top:" + sptop + "px;display:none'><img src='graphics/title/du_logo.gif' /></div><div id='options'></div>";
  $("#maindiv").html(spage);
  $("#DU").fadeIn(1000, function() {
    
    spage = "<div id='intro' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img src='graphics/title/intro.gif' onClick='makeChoice(\'intro\')' /></div>";
    opttop += 60;
    spage += "<div id='create' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img src='graphics/title/create.gif' onClick='makeChoice(\'create\')' /></div>";
    opttop += 60;
    var journey = "journey.gif";
    if (!localStorage.savegame) {
      journey = "journey-d.gif";
    }
    spage += "<div id='journey' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img src='graphics/title/" + journey + "' onClick='makeChoice(\'journey\')' /></div>";
    opttop += 60;
    spage += "<div id='credits' style='position:absolute;left:" + optleft + "px; top:" + opttop + "px;display:none'><img src='graphics/title/credits.gif' onClick='makeChoice(\'credits\')' /></div>";
    $("#options").html(spage);
    $("#intro").fadeIn(1000);
    $("#create").fadeIn(1000);
    $("#journey").fadeIn(1000);
    $("#credits").fadeIn(1000, function() { pagelive(); });
  });
}

function pagelive() {
  
}
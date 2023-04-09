"use strict";
//const isDev = require('electron-is-dev');
let maxserial = 0;
let beta = 0;  // set to one for additional analytics

let wind = {};
wind.xoff = 0;
wind.yoff = 2;

let mappages = new Pages();
let localFactory = new tileFactory();
let eidos = new Platonic();
//var universe = new Object;

let DU = {};
DU.version = "0.9.2";

DU.PC = new PCObject();
DU.gamelength = 0;
DU.starttime;
let PC = DU.PC;  // alias

let timeouts = {};

PC.assignSerial();

let nowplaying = {};  // .song = a SoundJS object for current music, .name = name of the song
let ambient = {};  // .song = a SoundJS object for current ambient noise, .name = name of the sound
let laststep = "left";

DU.maps = new MapMemory();
let maps = DU.maps; // alias
let losgrid = new LOSMatrix(30);  // BIGGER FOR AI USE, NO LONGER RESTRICTING TO SIZE OF VIEWSCREEN

DU.DUTime = new Timeline(0);
let DUTime = DU.DUTime; // alias
let maintext = new TextFrame("innertextframe");
let DULoot = SetLoots();            //
let DULootGroups = SetLootGroups(); //  see loot.js and lootset.js for population
let DUTraps = SetTraps();           //
let displayspecs = {};
let Dice = new DiceObject();
let finder = new PF.AStarFinder({
  heuristic: PF.Heuristic.euclidean
});
DU.gameflags = new Gameflags();

let Listener = new DUListener();

let targetCursor = {};
    targetCursor.skipahead = 0;
let inputText = {};

let raceWarning = 0;
let whoseturn;

let convlog = [];

function DrawCharFrame() {
  let txt = "<table cellpadding='0' cellspacing='0' border='0' width='100%' style='margin-top:1px'><tr><td colspan='2'>";
  let dishp = "" + PC.getDisplayHP();
  while (dishp.length < 3) { dishp = " " + dishp; }
  dishp.replace(" ", "&nbsp;");
  let dismp = "" + PC.getMana();
  while (dismp.length < 3) { dismp = " " + dismp; }
  dismp = dismp.replace(/ /g, "&nbsp;");
  txt = txt + PC.getPCName() + "</td><td id='hpcell' style='text-align:right'>HP:&nbsp;" + dishp + "</td></tr>";
  txt = txt + "<tr><td width='33%' id='gpcell'>GP: " + PC.getGold() + "</td><td width='34%'>" + SpellInitials(PC) + "</td><td width='33%' style='text-align:right'>MP:&nbsp;" + dismp + "</td></tr></table>";
  document.getElementById('charstats').innerHTML = txt;
}

function DrawMainFrame(how, themap, centerx, centery) {
  // how options are "draw" and "one"
  if (PC.getWaiting()) { return; }  // Don't draw the screen if PC is using (W)ait- should avoid a draw during the fade in/out.
  let tp = 0; // telepathy
  let ev = 0; // ethereal vision
  
  if (how === "draw") {
    displayspecs = getDisplayCenter(themap,centerx,centery);
    
    if (themap.getBackground()) {
      let opacity = themap.getOpacity();
      document.getElementById('worldlayer').innerHTML = "<div id='cloudlayer' style='background-image:url(\"graphics/" + themap.getBackground() + "\");opacity:" + opacity + ";position:relative;z-index:10;background-position: " + wind.xoff + "px " + wind.yoff + "px;'><img src='graphics/spacer.gif' width='416' height='416' /></div>";
    } else {
      document.getElementById('worldlayer').innerHTML = "<img src='graphics/spacer.gif' width='416' height='416' />";
    }
    if (themap.worldlayer) {
      document.getElementById('worldlayer').style.backgroundImage = "url('graphics/" + themap.worldlayer + "')";
    } else {
      document.getElementById('worldlayer').style.backgroundImage = "";
    }

    if (PC.getSpellEffectsByName("Telepathy")) { tp = 1; }
    if (PC.getSpellEffectsByName("EtherealVision")) { ev = 1; }
    for (let i=displayspecs.topedge;i<=displayspecs.bottomedge;i++) {
      for (let j=displayspecs.leftedge;j<=displayspecs.rightedge;j++) {
        MainViewDrawTile(themap,centerx,centery,j,i,tp,ev,displayspecs);
      }  
    }
    for (let idx in spellcount) {
      let val=spellcount[idx];
      if ((val.getx() >= displayspecs.leftedge) && (val.getx() <= displayspecs.rightedge) && (val.gety() >= displayspecs.topedge) && (val.gety() <= displayspecs.bottomedge)) {
        let where = getCoords(val.getHomeMap(),val.getx(), val.gety());
        let sparkles = document.getElementById(idx);
        if (sparkles) {
          sparkles.style.left = where.x;
          sparkles.style.top = where.y;
        }
      }
    };
  } else if (how === "one") {
    if ((themap === PC.getHomeMap()) && (centerx <= displayspecs.rightedge) && (centerx >= displayspecs.leftedge) && (centery >= displayspecs.topedge) && (centery <= displayspecs.bottomedge)) {
      MainViewDrawTile(themap,PC.getx(),PC.gety(),centerx,centery,tp,ev,displayspecs);
    }
    for (let idx in spellcount) {
      let val=spellcount[idx];
      if ((val.getx() >= displayspecs.leftedge) && (val.getx() <= displayspecs.rightedge) && (val.gety() >= displayspecs.topedge) && (val.gety() <= displayspecs.bottomedge)) {
        let where = getCoords(val.getHomeMap(),val.getx(), val.gety());
        let sparkles = document.getElementById(idx);
        if (sparkles) {
          sparkles.style.left = where.x;
          sparkles.style.top = where.y;
        }
      }
    };
  }  
}

function MainViewDrawTile(themap, centerx, centery, j, i, tp, ev, displayspecs) {
  let thiscell = GetDisplayStack(themap,centerx,centery,j,i,tp,ev);
  let yidx = i-displayspecs.topedge;
  let xidx = j-displayspecs.leftedge;
  let mview = document.getElementById('mainview_'+xidx+'x'+yidx);
  mview.innerHTML = "";

  for (let k=0;k<thiscell.length;k++) {
    let opac = 1;
    if ((thiscell[k].lighthere >= SHADOW_THRESHOLD) && (thiscell[k].lighthere < 1) && !ev && !(tp && thiscell[k].isnpc)) {
      opac = 0.3;
    } else if ((thiscell[k].lighthere < SHADOW_THRESHOLD) && !ev && !(tp && thiscell[k].isnpc)) {
      opac = 0;
    }
    let id="";
    if (k===0) { id = `id="tilediv_${j}x${i}"`; }
    let newdiv = `<div ${id} style="position:absolute; top:0px; left:0px; background-image: url('graphics/${thiscell[k].showGraphic}'); background-repeat:no-repeat; background-position: ${thiscell[k].graphics2}px ${thiscell[k].graphics3}px">
    <img id='tile${j}x${i}' src='graphics/${thiscell[k].graphics1}' border='0' alt='tile${j}x${i} los: ${thiscell[k].losresult} light:${thiscell[k].lighthere}' width='32' height='32' title='${thiscell[k].desc}'/></div>`;
    mview.innerHTML += newdiv;
    if ((opac > 0) && (opac < 1)) {
      mview.innerHTML += "<div style='background-image: url(\"graphics/shadow.gif\"); position:absolute;left:0px;top:0px;width:32px;height:32px' /></div>";
    } else if (opac === 0) {
      mview.innerHTML += "<div style='background-image: url(\"graphics/master_spritesheet.png\"); background-position:-64px -128px; position:absolute;left:0px;top:0px;width:32px;height:32px' /></div>";
    }  
  }

}

function OldMainViewDrawTile(themap, centerx, centery, j, i, tp, ev, displayspecs) {
 	let thiscell = getDisplayCell(themap,centerx,centery,j,i,tp,ev);
 	let opac = 1;
 	if ((thiscell.lighthere >= SHADOW_THRESHOLD) && (thiscell.lighthere < 1) && !ev && !(tp && thiscell.isnpc)) {
 	  opac = 0.3;
 	} else if (thiscell.lighthere < SHADOW_THRESHOLD && !ev && !(tp && thiscell.isnpc)) {
 	  opac = 0;
 	}
  let yidx = i-displayspecs.topedge;
  let xidx = j-displayspecs.leftedge;
  let mview = document.getElementById('mainview_'+xidx+'x'+yidx);
  let topview = document.getElementById('maintopview_'+xidx+'x'+yidx);
  if (thiscell.terrain) {
    mview.innerHTML = "<img id='tile"+j+"x"+i+"' src='graphics/spacer.gif' border='0' alt='tile"+j+"x"+i+" los: " + thiscell.losresult + " light:" + thiscell.lighthere + "' width='32' height='32' title='" + thiscell.desc + "'/>";
    mview.style.backgroundImage = "url('graphics/spacer.gif')";
    mview.style.backgroundRepeat = "no-repeat";
    mview.style.backgroundPosition = "0px 0px";
  } else {
    mview.innerHTML = "<img id='tile"+j+"x"+i+"' src='graphics/"+thiscell.graphics1+"' border='0' alt='tile"+j+"x"+i+" los: " + thiscell.losresult + " light:" + thiscell.lighthere + "' width='32' height='32' title='" + thiscell.desc + "'/>";
    mview.style.backgroundImage = "url('graphics/" + thiscell.showGraphic + "')";
    mview.style.backgroundRepeat = "no-repeat";
    mview.style.backgroundPosition = thiscell.graphics2 + "px " + thiscell.graphics3 + "px";
  }
  if ((opac > 0) && (opac < 1)) {
    mview.innerHTML += "<img src='graphics/shadow.gif' style='position:absolute;left:0px;top:0px' />";
  } else if (opac === 0) {
    mview.innerHTML += "<div style='background-image: url(\"graphics/master_spritesheet.png\"); background-position:-64px -128px; position:absolute;left:0px;top:0px;width:32px;height:32px' /></div>";
  }

  if (thiscell.hasOwnProperty("topview")) {
    topview.innerHTML = "<img id='toptile"+j+"x"+i+"' src='graphics/"+thiscell.topview.graphics1+"' border='0' alt='tile"+j+"x"+i+" los: " + thiscell.losresult + " light:" + thiscell.lighthere + "' style='width:32;height:32;position:absolute;top:0px;left:0px' title='" + thiscell.desc + "'/>";
    topview.style.backgroundImage = "url('graphics/" + thiscell.topview.showGraphic + "')";
    topview.style.backgroundRepeat = "no-repeat";
    topview.style.backgroundPosition = thiscell.topview.graphics2 + "px " + thiscell.topview.graphics3 + "px";

    if ((opac > 0) && (opac < 1)) {
      topview.innerHTML += "<img src='graphics/shadow.gif' style='position:absolute;left:0px;top:0px' />";
    } else if (opac === 0) {
      topview.innerHTML += "<div style='background-image: url(\"graphics/master_spritesheet.png\"); background-position:-64px -128px; position:absolute;left:0px;top:0px;width:32px;height:32px' /></div>";
    }  
  } else {
    topview.innerHTML = "<img id='tile"+j+"x"+i+"' src='graphics/spacer.gif' border='0' alt='tile"+j+"x"+i+" los: " + thiscell.losresult + " light:" + thiscell.lighthere + "' width='32' height='32' title='" + thiscell.desc + "'/>";
    topview.style.backgroundImage = "url('graphics/spacer.gif')";
    topview.style.backgroundRepeat = "no-repeat";
    topview.style.backgroundPosition = "0px 0px";
  }

  let terr = GetDisplayTerrain(themap,j,i,centerx,centery,thiscell.losresult);
  let tview = document.getElementById('terrain_'+xidx+'x'+yidx);
  tview.innerHTML = "<img id='terr_tile"+j+"x"+i+"' src='graphics/"+terr.graphics1+"' border='0' alt='tile"+j+"x"+i+" los: " + thiscell.losresult + " light:" + thiscell.lighthere + "' width='32' height='32' title='" + terr.desc + "'/>";
  tview.style.backgroundImage = "url('graphics/" + terr.showGraphic + "')";
  tview.style.backgroundRepeat = "no-repeat";
  tview.style.backgroundPosition = terr.graphics2 + "px " + terr.graphics3 + "px";
}

function DrawTopbarFrame(txt) {
  document.getElementById('topbarframe').innerHTML = txt;
}

function StartGame() {
  CreateDisplayTables();

  set_conversations();
  DU.merchants = {};
  DU.merchants = SetMerchants();

  if (debug) {  ActivateDebug(1); }
  SoundLoaded();  
//  CreateUI();
}

function SoundLoaded() {
  let whichsave = gamestate.getLatestSaveIndex();
  if (whichsave === -1) {
    gamestate.loadGame("tmp");
  } else {
    gamestate.loadGame(whichsave);
  }
}

function StartPostLoad() {
  DrawCharFrame();
  DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
  DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());

  maintext.addText("Game loaded.");
  maintext.setInputLine("&gt;");
  maintext.drawTextFrame(); 
  
  document.addEventListener("keydown", function(e) {
    let code = (e.keyCode ? e.keyCode : e.which);

    if (IsWantedCode(code)) {
      e.preventDefault();
      DoAction(code, e.ctrlKey);
    }
  }, false);

//  document.addEventListener("keyup", function(e) { 
//    if (e.keyCode === 27) {
//      e.preventDefault();
//      DoAction(e.keyCode, e.ctrlKey);
//    }
//  } );
}

function DoAction(code, ctrl) {
  if (ctrl && (code === 73)) { 
//    ipcRenderer.send('toggle_dev'); 
    OutOfContext.toggle_dev();
    return; 
  }  // ctrl-i opens dev console no matter the mode
  if (debug && ctrl && (code === 88)) { 
    // BE VERY CAREFUL WITH THIS.
    // recovers from syntax errors, returns control to player
    gamestate.setMode("player");
  }
  if (gamestate.getMode() === "player") {  // PC's turn, awaiting commands
    let response = PerformCommand(code, ctrl);
    if (response["fin"]) { 
      maintext.addText(response["txt"]);
      maintext.setInputLine(response["input"]);
      maintext.drawTextFrame();
      if (response["fin"] === 1) {
        PC.endTurn(response["initdelay"]);
      } else if (response["fin"] === -3) {
        // command interrupted and turned into conversation
        gamestate.setMode("talk");
        maintext.setInputLine("&gt; You say: ");
        maintext.drawTextFrame();
      } else if (response["fin"] === 3) {
        gamestate.setMode("waiting");
      } else if (response["fin"] === 4) {
        maintext.setInputLine("&gt; [MORE]");
        maintext.drawTextFrame();
      }
    }  
  }
  else if (gamestate.getMode() === "anykey") {
    if (targetCursor.command === "garrick") {
      let retval = GarrickScene(targetCursor.stage);
      if (retval["fin"] === 1) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        retval["garrick"].endTurn();
      } else {
        gamestate.setMode("anykey");
      }
    } else if (targetCursor.command === "elderstart") {
      ais.elderdragonintro(targetCursor.dragon);
    } else if (targetCursor.command === "armageddon") {
      ArmageddonNarration(targetCursor.step);
      targetCursor.step++;
    } else if (targetCursor.command === "empower") {
      maintext.addText(targetCursor.txt[targetCursor.idx]);
      targetCursor.idx++;
      if (targetCursor.idx === targetCursor.txt.length) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        PC.endTurn();
      } else {
        // now that I think of it, I don't think I need to do anything here.
      }
    } else if (targetCursor.command === "summon") {
      let aredone = PlaySummonScene(targetCursor.phase);
      maintext.drawTextFrame();
      if (aredone) { PC.endTurn(); }
      else { targetCursor.phase++; }
    } else if (targetCursor.command === "justice") { 
      if (!targetCursor.frame) {
        maintext.addText("Justice draws an eldritch symbol in the air and speaks one syllable in a harsh tone...");
        maintext.drawTextFrame();
        targetCursor.frame = 1;
      } else {
        gamestate.setMode("null");
        let moongate = localFactory.createTile("Moongate");
        let justice = targetCursor.justice;
        justice.getHomeMap().placeThing(justice.getx(),justice.gety(),moongate);
        moongate.destmap = moongate.getHomeMap().getName();
        moongate.destx = moongate.getx();
        moongate.desty = moongate.gety();
        DrawMainFrame("one",PC.getHomeMap(),justice.getx(),justice.gety());
        animateImage(0,-128,moongate,0,"right",300,0,1);
        setTimeout(function() { 
          whoseturn.endTurn();  // could be Justice, could be PC
          targetCursor.justice.getHomeMap().deleteThing(targetCursor.justice);
          DUTime.removeEntityFrom(targetCursor.justice);
          maintext.addText("...and she vanishes.");
          maintext.setInputLine("&gt;");
          maintext.drawTextFrame();
          animateImage(-128,0,moongate,0,"left",300,1,0);
          delete targetCursor.justice;
          delete targetCursor.frame;
          delete targetCursor.command;
          DestroyJusticeCrystals();
        }, 1200);
      }
    } else if (targetCursor.command === "endact") {
      if (targetCursor.endact === 1) {
        maintext.addText('The dragon looks at him, and then at you. "How disappointing."');
        targetCursor.endact = 2;
      } else if (targetCursor.endact === 2) {
        maintext.addText('Then, it roars and lunges at you!');      

        let prince = targetCursor.prince;
        delete targetCursor.prince;
        prince.realgraphic = prince.getGraphicArray();
        prince.setGraphicArray(["master_spritesheet.png","","-64","-800"]);
        prince.setAttitude("neutral"); // so dragon doesn't attack him

        let fieldeffect = localFactory.createTile("Sleep");
    
        fieldeffect.setExpiresTime(-1);
        prince.addSpellEffect(fieldeffect);
   
        Close_BDC_Gate(PC.getHomeMap());

        let dragon = targetCursor.dragon;
        delete targetCursor.dragon;
        dragon.setAttitude("hostile");
        dragon.setCurrentAI("seekPC-30");
        dragon.setAggro(1);
        dragon.setHP(50);
        dragon.setMaxHP(50);
      
        let bdnpcs = prince.getHomeMap().npcs.getAll();
        for (let i=0;i<bdnpcs.length;i++) {
          if (bdnpcs[i].getName() === "TownGuardNPC") {
            bdnpcs[i].setAggro(1); // make the guards help against the dragon
            let wpn = bdnpcs[i].getEquipment("weapon");
            wpn.setDamage("2d4+1");
            wpn.setStrDamage(.5);
          }
        }

        PC.getHomeMap().cityfight = 1;
        Listener.clearListener("BDragon");
        targetCursor.endact = 3;
      } else if (targetCursor.endact === 3) {
        gamestate.setMode("player");
        document.getElementById('uiinterface').innerHTML = ``;
        document.getElementById('uiinterface').style.backgroundColor = "";    
        document.getElementById('uiinterface').style.backgroundImage = "";    
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();   
        DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
        PC.endTurn();
      }
    } else if (targetCursor.command === "intermission") {
      PerformActEnd();
    } else if (targetCursor.command === "u") {
      let retval = PerformRead();
      maintext.addText(retval["txt"]);
      if (retval["fin"] === 1) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        PC.endTurn(retval["initdelay"]);
      }
    } else if (targetCursor.command === "w") {
      if ((code === 27) || ((code <= 57) && (code >= 48))) {
        let retval = PerformWait(code);
        if (retval["fin"] === 2) {
          maintext.setInputLine("&gt;");
          maintext.drawTextFrame();
          gamestate.setMode("player");
        } else {
          maintext.addText(retval["txt"]);
          maintext.setInputLine(retval["input"]);
          maintext.drawTextFrame();
          PC.endTurn(retval["initdelay"]);
        }          
      }
    } else if (targetCursor.command === "PaladinInit") {
      if (targetCursor.step === 1) {
        maintext.addText(`<span class='mainspeaker'>Isaac</span>: "${PC.getPCName()} has undertaken the trials and proven ${PC.getGenderedTerms().reflexive} worthy of standing beside us. Now we must show ourselves worth of standing with ${PC.getGenderedTerms().objective} in turn. For this we will strive, until our deaths or the ending of the world."`);
        targetCursor.step++;
      } else if (targetCursor.step === 2) {
        maintext.addText(`Isaac lifts a golden goblet off the table in front of him.`);
        targetCursor.step++;
      } else if (targetCursor.step === 3) {
        maintext.addText(`<span class='mainspeaker'>Isaac</span>: "This chalice represents a Paladin. For a Paladin's goal is to serve, to make the world better, to guide and protect. And to do that, we must first empty ourselves. Empty of our selfishness, our desires, our greed, our ambition. And instead..."`);
        targetCursor.step++;
      } else if (targetCursor.step === 4) {
        maintext.addText(`He lifts a large earthenware jug with his other hand, and begins to pour into the chalice.`);
        targetCursor.step++;
      } else if (targetCursor.step === 5) {
        maintext.addText(`<span class='mainspeaker'>Isaac</span>: "Instead, we allow ourselves to be filled. With courage. With honor. With fidelity. With integrity. And then, you are a Paladin."`);
        targetCursor.step ++;
      } else if (targetCursor.step === 6) {
        maintext.addText(`<span class='mainspeaker'>Isaac</span>: "When you drink this, you accept these four precepts of our order."`);
        targetCursor.step++;
      } else if (targetCursor.step === 7) {
        maintext.addText(`<span class='altspeaker'>Yelena</span>: "The world is not as it should be. But we will, with each breath, continue to make it better."`);
        targetCursor.step++;
      } else if (targetCursor.step === 8) {
        maintext.addText(`<span class='altspeaker'>Amaeryl</span>: "These here are as your brothers and sisters. Support them always, and they will always support you."`);
        targetCursor.step++;
      } else if (targetCursor.step === 9) {
        maintext.addText(`<span class='altspeaker'>Urskar</span>: "Everywhere we go, we will seek to inspire those we encounter, and we will be an example to all, of bravery and right action."`);
        targetCursor.step++;
      } else if (targetCursor.step === 10) {
        maintext.addText(`<span class='altspeaker'>Linley</span>: "In all things, you will always comport yourself with honor."`);
        targetCursor.step++;
      } else if (targetCursor.step === 11) {
        maintext.addText(`<span class='mainspeaker'>Isaac</span>: He passes you the goblet. "And as we strive to do good, we may fail, but when we fail, we will try and try again. Until all has been set right."`);
        targetCursor.step++;
      } else if (targetCursor.step === 12) {
        maintext.addText(`<span class='mainspeaker'>Isaac</span>: "Now is the time of choice. You may drink, and accept, and become one of us; or you may let the chalice pass you by. There is no shame in declining. The choice is yours."`);
        targetCursor.step++;
      } else if (targetCursor.step === 13) {
        maintext.addText(`You raise the chalice before you, and take a deep drink. Isaac and the others cheer wildly!`);
        targetCursor.step++;
      } else if (targetCursor.step === 14) {
        let newkey = localFactory.createTile("PaladinKey");
        PC.addToInventory(newkey,1);
        DU.gameflags.setFlag("paladin_joined",1);
        maintext.addText(`<span class='mainspeaker'>Isaac</span>: "The first thing I need to do now, is give you access to this tower. Here now is a key. What is in this tower is yours as well as ours, now- take anything you need."<br /><span class='sysconv'>You have obtained: ${newkey.getFullDesc()}.</span>`);
        targetCursor.step++;
      } else if (targetCursor.step === 15) {
        maintext.addText(`<span class='mainspeaker'>Isaac</span>: "Welcome to the Paladins, ${PC.getPCName()}! From here, go forth, and continue to do good. Hip hip..."`);
        targetCursor.step++;
      } else if (targetCursor.step === 16) {
        maintext.addText(`<span class='mainspeaker'>Everyone</span>: "Hooray!"`);
        gamestate.setMode("player");
        maintext.setInputLine("&gt; ");
      }
    } else {
      if (((code >= 65) && (code <= 90)) || (code === 32) || (code === 13)) {  // letter, space, or enter
        if (targetCursor.command === "c") {
          document.getElementById('uiinterface').innerHTML = "";
          document.getElementById('uiinterface').style.backgroundColor = "";
    
          maintext.setInputLine("&gt;");
          maintext.drawTextFrame();
          DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
          PC.endTurn();
        } else {
          let retval = PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), targetCursor.keyword); 
          maintext.addText(retval["txt"]);
          maintext.setInputLine(retval["input"]);
          maintext.drawTextFrame();
         
          if (retval["fin"] === 1) {
            PC.endTurn(retval["initdelay"]);
          }
        }
      }
    }
  }
  else if (gamestate.getMode() === "talk") {
    if ((code >= 65) && (code <= 90)) {  // letter, NOT SPACE 
      let letter = String.fromCharCode(code);    	
      if (inputText.txt.length < 14) {
        inputText.txt += letter;
        maintext.setInputLine(maintext.getInputLine() + letter);
        maintext.drawInputLine();
      }
    } 
    else if (code === 32) { // space
      // nothing 
    }
    else if (code === 8) { // backspace
      let txt = maintext.getInputLine();
      if (inputText.txt.length) {
        inputText.txt = inputText.txt.substr(0,inputText.txt.length-1);
        txt = txt.substr(0,txt.length-1);
        maintext.setInputLine(txt);
        maintext.drawInputLine();
      }
    }
    else if (code === 13) { // enter
      if (inputText.cmd === "y") { 
        let retval = PerformYell(); 
        maintext.setInputLine("&gt;");
        maintext.addText(retval["txt"]);
        maintext.drawTextFrame();

        if (retval["fin"] === 2) {
          gamestate.setMode("player");
          gamestate.setTurn(PC);
        }
        else if (retval["fin"] === 1) {
          PC.endTurn(retval["initdelay"]);
        }
        else if (retval["fin"] === 3) {
          gamestate.setMode("options");
        }

      } else if ( inputText.cmd === "t") {
        let convo = targetCursor.talkingto.getConversation();
        let retval;
        if (inputText.subcmd === "yn") {
          delete inputText.subcmd;
          if (inputText.txt === "") { inputText.txt = "NO"; }
          if ((inputText.txt === "Y") || (inputText.txt === "YES")) {
            inputText.txt = "YES";
            maintext.addText(" ");
            maintext.addText("You answer (y/n): " + inputText.txt);
            retval = PerformTalk(targetCursor.talkingto, convo, "_yes");
          } else {
            inputText.txt = "NO";
            maintext.addText(" ");
            maintext.addText("You answer (y/n): " + inputText.txt);
            retval = PerformTalk(targetCursor.talkingto, convo, "_no");
          }
        } else {
          if (inputText.txt === "") { inputText.txt = "BYE"; }
          maintext.addText(" ");
          maintext.addText("<br class='textbreak' />You say: " + inputText.txt);
          retval = PerformTalk(targetCursor.talkingto, convo, inputText.txt);
        }
        maintext.addText(retval["txt"]);
        maintext.setInputLine(retval["input"]);
        maintext.drawTextFrame();
        
        if (retval["fin"] === 1) {
          PC.endTurn(retval["initdelay"]);
        }
        if (retval["fin"] === "inn") {
          let nextmorning = GetGameClockByClockTime("7:00");
          let duration = nextmorning - DUTime.getGameClock();
          if (duration < 5*12) {
            duration = 8*12;
          }
          // You sleep until morning, unless that would be getting less than 5 hours of sleep, in which case you sleep 8 hours
          PC.setWaiting(DUTime.getGameClock() + duration);
//          PC.moveAfterWaiting = {x : targetCursor.inndest.x, y: targetCursor.inndest.y};
//          delete targetCursor.inndest;
          PC.atinn = 1;      
        }
      } 
      else { alert("need to add hook here! (main 412)"); }
    }
    else if (code === 27) { // ESC
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    }
    else { // ignore
    	
    }
  } else if (gamestate.getMode() === "focus") {
    let response = PerformFocus(code);
    if (response["fin"] === 0) { // ESC
      maintext.addText(response["txt"]);
      gamestate.setMode("player");
      maintext.setInputLine(response["input"]);
      maintext.drawTextFrame();
      document.getElementById('uiinterface').innerHTML = "";
      document.getElementById('uiinterface').style.backgroundColor = "";

      return;
    } else if (response["fin"] === 2) { // moved
      // don't really have to do anything here
    } else if (response["fin"] === 1) { // used a Rune
      maintext.addText(response["txt"]);
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();

      PC.endTurn();
    }
  } else if (gamestate.getMode() === "choosedir") {
    let response = PerformChooseDir(code);
    if (response["fin"] === 1) { // direction chosen
      if ((targetCursor.x === PC.getx()) && (targetCursor.y === PC.gety()) && ((targetCursor.command === "u")||(targetCursor.command === "o")) ) {
        let resp = PerformUseFromInventory();
        if (resp["fin"] === 2) { 
          // cannot use from inventory here
          maintext.addText(resp["txt"]);
          maintext.setInputLine("&gt;");
          gamestate.setMode("player");
          maintext.drawTextFrame();
        } else {
          maintext.setInputLine(resp["input"]);
        }
      }
      else if ((targetCursor.x === PC.getx()) && (targetCursor.y === PC.gety()) && ((targetCursor.command === "a") || (targetCursor.command === "s") || (targetCursor.command === "c") || (targetCursor.command === "p") || (targetCursor.command === "uk"))) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        gamestate.setMode("player");
        return;
      }
      else {
        let resp;
        if ((targetCursor.command === "u")||(targetCursor.command === "o")) { // USE
          resp = PerformUse(PC);
        } else if (targetCursor.command === "uk") {
          resp = KeyUse(PC,targetCursor.useditem);
        } else if (targetCursor.command === "g") { // GET
          resp = PerformGet(PC);
        } else if (targetCursor.command === "s") { // SEARCH
          resp = PerformSearch(PC);
        } else if (targetCursor.command === "a") {  // ATTACK
          let dir = "";
          if (targetCursor.y === PC.gety()-1) { dir = "North"; }
          if (targetCursor.y === PC.gety()+1) { dir = "South"; }
          if (targetCursor.x === PC.getx()-1) { dir = "West"; }
          if (targetCursor.x === PC.getx()+1) { dir = "East"; }
          dir = "Attack " + dir + ".";
          resp = PerformAttackMap(PC);  			  
        } else if (targetCursor.command === "c") { // CAST
          resp = PerformDirSpellcast();          
        } else if (targetCursor.command === "p") { // PUSH
          resp = PerformPush(PC);
        }
        if (resp["fin"] >= 2) {
          if ((targetCursor.command === "u") && (resp["fin"] === 3)) {
            maintext.setInputLine("&gt;[MORE]");
            maintext.addText(resp["txt"]);
            gamestate.setMode("anykey");
            maintext.drawTextFrame();
          } else {
            if ((resp["fin"] > 2) && (targetCursor.command !== "t")) {
              gamestate.setMode("player");
            }      
            maintext.addText(resp["txt"]);
            maintext.setInputLine(resp["input"]);
            maintext.drawTextFrame();
          }
        }
        else if (resp["fin"] === -1) {
          gamestate.setMode("useprompt");
          maintext.addText(resp["txt"]);
          maintext.setInputLine(resp["input"]);
          maintext.drawTextFrame();
        }    
        else if (resp["fin"] < 2) {
          maintext.addText(resp["txt"]);
          maintext.setInputLine("&gt;");
          maintext.drawTextFrame();

          PC.endTurn(resp["initdelay"]);
        } 
      }
    }
    else if (response["fin"] === -1) {   // anything not useful
      gamestate.setMode("choosedir");
    }
    else { // ESC hit
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      gamestate.setMode("player");
    }
  }
  else if (gamestate.getMode() === "target") {
    let response = PerformTarget(code);
    if (response["fin"] === 1) {  // move the cursor
   		let edges = getDisplayCenter(PC.getHomeMap(),PC.x,PC.y);
      let posleft = targetCursor.x - edges.leftedge;
      let postop = targetCursor.y - edges.topedge;
      let tileid = targetCursor.tileid;
      document.getElementById(tileid).innerHTML = targetCursor.basetile;
      tileid = "mainview_" + posleft + "x" + postop;
      targetCursor.tileid = tileid;
      targetCursor.basetile = document.getElementById(tileid).innerHTML;
      document.getElementById(tileid).innerHTML += '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0;top:0;z-index:50" />';
      gamestate.setMode("target");
    }
    else if (response["fin"] === 2) { // act on the current target
      let newresponse = {};
      if (targetCursor.command === "l") {
        newresponse = PerformLook();
        maintext.addText(newresponse["txt"]);
        maintext.setInputLine(newresponse["input"]);
        maintext.drawTextFrame();
      } else if (targetCursor.command === "a") {
        newresponse = PerformAttack(PC);
        if (newresponse["txt"]) {
          maintext.addText(newresponse["txt"]);
        }
        if (newresponse["input"]) {
          maintext.setInputLine(newresponse["input"]);
        }
        maintext.drawTextFrame();
      } else if (targetCursor.command === "t") {
        newresponse = PerformTalkTarget();
        maintext.addText(newresponse["txt"]);
        maintext.setInputLine(newresponse["input"]);
        maintext.drawTextFrame();
      } else if (targetCursor.command === "c") {
        newresponse = PerformSpellcast();
        maintext.addText(newresponse["txt"]);
        maintext.setInputLine(newresponse["input"]);
        maintext.drawTextFrame();        
        if (newresponse["fin"]) {
          if (targetCursor.castFrom) {
            targetCursor.castFrom.spellcast(PC);
          }
        }
      } else if (targetCursor.command === "u") {
        if (targetCursor.spellName === "Green Potion") {
          newresponse = PerformSpellcast();
          maintext.addText(newresponse["txt"]);
          maintext.setInputLine(newresponse["input"]);
          maintext.drawTextFrame();        
        }
      }
      if ((newresponse["fin"] === 0) || (newresponse["fin"] === 2)) {
        gamestate.setMode("player");
        // does not take time, either because it failed or was a no-time success
      }
      else if (newresponse["fin"] === 1) {
        PC.endTurn(newresponse["initdelay"]);
      }
      else if (newresponse["fin"] === -1) {
        gamestate.setMode("null");
        // wait and let the combat code set things to next turn. NOTE: possible race conition
        raceWarning = 1;
      }
      else if (newresponse["fin"] === 3) {
//        gamestate.setMode("talk");      // not needed, set in talk code
        // new response code (need a lot for targeting!)
        
      } else if (newresponse["fin"] === 4) {
        // don't do anything, already set to Equip
      }
    }
    else if (response["fin"] === 0) { 
      let tileid = targetCursor.tileid;
      document.getElementById(tileid).innerHTML = targetCursor.basetile; 
      maintext.addText(response["txt"]);
      maintext.setInputLine(response["input"]);
  			//DrawTextFrame(maintext.getTextFrame(), response["input"]);
      maintext.drawTextFrame();
      
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    }
    else {
      gamestate.setMode("target");
    }

  } 
  else if (gamestate.getMode() === "equip") {
    let response;
    if (targetCursor.command === "r") {
      response = PerformEquip(code);
    } else if ((targetCursor.command === "u") || (targetCursor.command === "o")) {
      response = PerformUseFromInventoryState(code);
    } else if (targetCursor.command === "f") {
      response = PerformRuneChoice(code);
    } else if (targetCursor.command === "c") {
      response = PerformSpellcastEquip(code);
    }

    document.getElementById('uiinterface').innerHTML = "";
    document.getElementById('uiinterface').style.backgroundColor = "";
    if (response["fin"] === 0) {
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    }
    else if (response["fin"] === -1) {
      gamestate.setMode("useprompt");
      maintext.addText(response["txt"]);
      maintext.setInputLine(response["input"]);
      maintext.drawTextFrame();
    }
    else if (response["fin"] === 1) {
      maintext.addText(response["txt"]);
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>"); 
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
      PC.endTurn(response["initdelay"]);
    }
    else if (response["fin"] === 3) {
      // books
      maintext.setInputLine("&gt;[MORE]");
      maintext.addText(response["txt"]);
      gamestate.setMode("anykey");
      maintext.drawTextFrame();
    } 
    else if (response["fin"] === 4) {
      // scroll was used, spell cast is looking for a target
      maintext.setInputLine(response["input"]);
      maintext.addText(response["txt"]);
      // gamestate set by spell
      maintext.drawTextFrame();
    }       
  }
  else if (gamestate.getMode() === "useprompt") {
    if (targetCursor.usewhat === "greenpotion") {
      if (code === 65) {
        delete targetCursor.usewhat;
        delete targetCursor.command;
        let retval = targetCursor.uselink.drink(PC,1);
        delete targetCursor.uselink;
        maintext.addText(retval["txt"]);
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        PC.endTurn(retval["initdelay"]);
      } else if (code === 66) {
        gamestate.setMode("target");
        maintext.setInputLine("&gt; Choose target- ");
        CreateTargetCursor({sticky: 1, command:'u',spellName:'Green Potion',spelldetails:{ caster: PC, targettype: "npc"}, targetlimit: (VIEWSIZEX -1)/2, targetCenterlimit: 0});    
      } else if (code === 27) {
        delete targetCursor.usewhat;
        delete targetCursor.command;
        delete targetCursor.uselink;
        gamestate.setMode("PC");
      }
      return;
    } 
    let used;
    if (targetCursor.useditem) { used = targetCursor.useditem; delete targetCursor.useditem; }
    else { used = targetCursor.itemlist[targetCursor.scrolllocation]; }
    let response = used.usePrompt(code);

    if (response["fin"] === 3) {
      // drinking from the brilliant pool
      maintext.setInputLine("&gt;[MORE]");
      maintext.addText(response["txt"]);
      gamestate.setMode("anykey");
      maintext.drawTextFrame();
    } else {
      maintext.addText(response["txt"]);
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
      PC.endTurn(response["initdelay"]);
    }
  }
  else if (gamestate.getMode() === "showhelp") {
    delete targetCursor.invx;
    delete targetCursor.invy;
    delete targetCursor.invskiprow;
    delete targetCursor.invlength;
    delete targetCursor.restrictTo;
    document.getElementById('uiinterface').innerHTML = "";
    document.getElementById('uiinterface').style.backgroundColor = "";

    maintext.setInputLine("&gt;");
    maintext.drawTextFrame();
    DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
    gamestate.setMode("player");
    gamestate.setTurn(PC);
  }
  else if (gamestate.getMode() === "zstats") {
    let response = performZstats(code);
    if (response["fin"] === 0) {
      delete targetCursor.invx;
      delete targetCursor.invy;
      delete targetCursor.invskiprow;
      delete targetCursor.invlength;
      delete targetCursor.restrictTo;
      document.getElementById('uiinterface').innerHTML = "";
      document.getElementById('uiinterface').style.backgroundColor = "";

      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    } else if (response["fin"] === 1) {
      // stay in zstats mode
    } else if (response["fin"] === 2) {
      // something was Used from zstats
      delete targetCursor.invx;
      delete targetCursor.invy;
      delete targetCursor.invskiprow;
      delete targetCursor.invlength;
      delete targetCursor.restrictTo;
      if ((targetCursor.command !== "endact") && (!targetCursor.hasOwnProperty("spellName") || ( targetCursor.spellName !== "Peer"))) {
        document.getElementById('uiinterface').innerHTML = "";
        document.getElementById('uiinterface').style.backgroundColor = "";
      }

      if (response["usefin"] === 0) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
        DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
        gamestate.setMode("player");
        gamestate.setTurn(PC);
      }
      else if (response["usefin"] === -1) {
        gamestate.setMode("useprompt");
        maintext.addText(response["txt"]);
        maintext.setInputLine(response["input"]);
        maintext.drawTextFrame();
      }
      else if (response["usefin"] === 1) {
        maintext.addText(response["txt"]);
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>"); 
        DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
        PC.endTurn(response["initdelay"]);
      }
      else if (response["usefin"] === 3) {
        // books
        maintext.setInputLine("&gt;[MORE]");
        maintext.addText(response["txt"]);
        gamestate.setMode("anykey");
        maintext.drawTextFrame();
      } 
      else if (response["usefin"] === 4) {
        if (targetCursor.command === "endact") {
          // shouldn't have to do anything, I guess
        } else {
          // scroll was used, spell cast is looking for a target
          maintext.setInputLine(response["input"]);
          maintext.addText(response["txt"]);
          // gamestate set by spell
          maintext.drawTextFrame();
        }
      }

    }
  }
  else if (gamestate.getMode() === "options") {
    let response = performOptions(code);
    if (response["fin"] === 0) {
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    } else if (response["fin"] === 1) {
        
    }
  }
  else if (gamestate.getMode() === "singleletter") {
    if (((code >= 65) && (code <= 90)) || (code === 32)) {  // letter
      if (inputText.thing = "toshin") {
        let retval = PerformToshinAltar(code);
        if (retval["fin"] === 2) {
          gamestate.setMode("player");
          gamestate.setTurn(PC);
        } else if (retval["fin"] === 1) {
          PC.endTurn(retval["initdelay"]);
        }
        maintext.setInputLine("&gt;");
        maintext.addText(retval["txt"]);
        maintext.drawTextFrame();
      }
    }
    else if (code === 27) { // ESC
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    }
    else { // ignore
    	
    }
  } else if (gamestate.getMode() === "singlenumber") {
    if (((code >= 49) && (code <= 57)) || (code === 27)) {
      if ((targetCursor.command === "c") && (targetCursor.spellName === "Permanence")) {
        if (code === 27) {
          maintext.setInputLine("&gt;");
          maintext.addText("Cancelled.");
          maintext.drawTextFrame();
          gamestate.setMode("player");
          delete targetCursor.spellName;
          delete targetCursor.command;
          gamestate.setTurn(PC);
        } else if ((code >= 49) && (code <= 54)) {  // 1-6, there are only 6 options so don't even bother passing a 7+ along
          let retval = PerformPermanence(PC,0,0,code);
          if (retval["fin"] === 1) {
            maintext.addText(retval["txt"]);
            maintext.setInputLine("&gt;");
            maintext.drawTextFrame();
            delete targetCursor.command;
            delete targetCursor.spellName;
            PC.endTurn();
          } // else, if 0, pressed a button that doesn't go with an active effect, treat as no-op
        }
      } else if (targetCursor.itemname === "InfiniteScroll") {
        let retval;
        if ((code >= 49) && (code <=56)) {  // 1-8
          let scroll = targetCursor.itemSource;
          if (scroll.circle) {
            retval = scroll.secondResponse(code);
            maintext.addText(retval["txt"]);
            maintext.setInputLine("&gt;");
            maintext.drawTextFrame();
            delete targetCursor.itemSource;
            PC.endTurn();
          } else {
            retval = scroll.firstResponse(code);
            maintext.addText(retval["txt"]);
            maintext.drawTextFrame();
          }
        } else if (code === 27) {  // ESC
          maintext.setInputLine("&gt;");
          maintext.addText("Cancelled.");
          maintext.drawTextFrame();
          gamestate.setMode("player");
          delete targetCursor.itemSource;
          gamestate.setTurn(PC);
        }
      } else if (inputText.cmd === "t") {
        let amt = code-48;
        if (code === 27) { amt = 0; }
        let convo = targetCursor.talkingto.getConversation();
        let retval;
        if (!amt || (PC.getGold() < amt)) {
          retval = PerformTalk(targetCursor.talkingto, convo, "_notip");
        } else {
          PC.setGold(PC.getGold()-amt);          
          if (amt > 0) {
            maintext.addText(`You tip ${amt} gold.`);
          }
          retval = PerformTalk(targetCursor.talkingto, convo, "_tip"+amt);
        }
        maintext.setInputLine(retval["input"]);
        maintext.drawTextFrame();  
        gamestate.setMode("talk");
      }
    } else if (code === 27) {
      if (targetCursor.itemname === "InfiniteScroll") {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        gamestate.setMode("player");
        gamestate.setTurn(PC);
        delete targetCursor.itemname;
        delete targetCursor.itemSource;
        delete targetCursor.itemSource.circle;
      }
    }
  } else if (gamestate.getMode() === "digits") {
    if ((code >= 49) && (code <= 57)) {  // numbers
      let num = code-48;
      if (inputText.txt.length <= 4) {
        inputText.txt += num;
        maintext.setInputLine(maintext.getInputLine() + num);
      }
      maintext.drawInputLine();
    } else if (code === 8) { // backspace
      let txt = maintext.getInputLine();
      if (inputText.txt.length) {
        inputText.txt = inputText.txt.substr(0,inputText.txt.length-1);
        txt = txt.substr(0,txt.length-1);
        maintext.setInputLine(txt);
        maintext.drawInputLine();
      }
    }
    else if ((code === 27) || (code === 48)) { // ESC
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    }
  } else if (gamestate.getMode() === "choosesave") {
    if (code === 27) { // esc
      document.getElementById('uiinterface').innerHTML = "";
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    } else if (targetCursor.command === "l") {
      if ((code >= 48) && (code <= 57)) {
        let idx = code-48;
        if (saveIndex[idx].charname) { 
          if (nowplaying.song) { StopMusic(); }
          gamestate.loadGame(idx); 
          DrawCharFrame();
          DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
          DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());

          maintext.addText("Game loaded.");
          maintext.setInputLine("&gt;");
          maintext.drawTextFrame(); 
          document.getElementById('uiinterface').innerHTML = "";
        }
      }
    } else if (targetCursor.command === "q") {
      if ((code >= 49) && (code <= 56)) {
        let idx = code-48;
        gamestate.setMode("saving");
        let timer = gamestate.saveGame(idx); 
        let hours = Math.floor(timer/(60*60));
        let minutes = Math.floor((timer-(hours*60*60))/60);
        if (minutes < 10) { minutes = "0" + minutes; }
		    maintext.addText("Quit &amp; Save: Saving game...<br />Time played: " + hours + ":" + minutes + ".");
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame(); 
        document.getElementById('uiinterface').innerHTML = "";
        gamestate.setMode("player");
        gamestate.setTurn(PC);
      }
    }
  } else if (gamestate.getMode() === "spellbook") {
    if (code === 27) { // esc
      document.getElementById('spellbookdiv').style.display = "none";
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    } else {
      let response = PerformSpellbook(code);
      if (response["fin"] === 1) {
        maintext.setInputLine("&gt;");
        maintext.addText(response["txt"]);
        maintext.drawTextFrame();
        PC.endTurn();
      } else if (response["fin"] === 4) {
        maintext.setInputLine(response["input"]);
        maintext.addText(response["txt"]);
        maintext.drawTextFrame();
        // mode has been set prior to this point
      } else if (response["fin"] === 2) {
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        maintext.addText(response["txt"]);
        gamestate.setMode("player");
        gamestate.setTurn(PC);
      } else if (response["fin"] === 3) {
        // waiting for an animation to finish, animation will handle ending turn
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        maintext.addText(response["txt"]);
        gamestate.setMode("null");
      } // response["fin"] === 0 keeps state the same- used for moving around the spellbook
    }
  }
  else if (gamestate.getMode() === "buy") {
    if ((code === 27) || (code ===13)) {    // ESC or enter
      let convo = targetCursor.talkingto.getConversation();
      maintext.addText(" ");
      maintext.addText("You buy: Nothing.");
      let retval = PerformTalk(targetCursor.talkingto, convo, "bye");
      maintext.addText(retval["txt"]);
      maintext.setInputLine(retval["input"]);
      maintext.drawTextFrame();
        
      if (retval["fin"] === 1) {
        PC.endTurn(retval["initdelay"]);
      }
    } else if ((code === 47) || (code === 63) || (code === 191)) {  //  ?, or / since it doesn't actually look at shift
      maintext.addText(" ");
      PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), "buy");
    } else if ((code >= 65) && (code <= 90)) {
      // check to see if that letter is in the merchant's inventory
      let merinv = DU.merchants[targetCursor.talkingto.getMerch()];
      let idx = code-65;
      if (merinv.stock[idx] && ((merinv.stock[idx].quantity) || (merinv.type === "spells"))) {  
        // that letter goes to something, and it is either spells or has a quantity
        if ((merinv.type === "spells") && (!PC.knowsSpell(SPELL_LIGHT_LEVEL,SPELL_LIGHT_ID))) {  
          // Doesn't have a spellbook, which starts with Light in it
          maintext.addText(" ");
          maintext.addText("You need a spellbook to learn spells.");
        } else if (merinv.stock[idx].price <= PC.getGold()) { // can afford it (at least one of it)!
          if (merinv.stock[idx].quantity) {  // item
            targetCursor.buychoice = idx;
            //working here - set up new buy interface
            // say presale blurb
            if (merinv.stock[idx].presale) {
              maintext.addText(merinv.stock[idx].presale);
            }
            if (!merinv.stock[idx].sellqty) {
              maintext.setInputLine("Purchase " + merinv.stock[idx].desc + "?");
            } else {
              maintext.setInputLine("Purchase how many?");
            }
            maintext.drawTextFrame();
            gamestate.setMode("buy-choose");
          } else { // spell 
            if (PC.knowsSpell(merinv.stock[idx].lvl, merinv.stock[idx].sid)) {
              maintext.addText(" ");
              maintext.addText("You already know that spell.");
            } else if ((merinv.stock[idx].lvl > 2) && (!DU.gameflags.getFlag("spellbook2"))) {
              maintext.addText(" ");
              maintext.addText("Your spellbook is not strong enough to contain that spell.");
            } else {
              targetCursor.buychoice = idx;
              //working here - set up new buy interface
              // say presale blurb
              if (merinv.stock[idx].presale) {
                maintext.addText(merinv.stock[idx].presale);
              }
              maintext.setInputLine("Purchase " + merinv.stock[idx].desc + "?");
              maintext.drawTextFrame();
              gamestate.setMode("buy-choose");
            }

          }
        } else { // not enough money
          maintext.addText(" ");
          maintext.addText("You don't have enough gold for that.");
        }
      }
    }
  }
  else if (gamestate.getMode() === "sell") {
    if ((code === 27) || (code ===13)) {    // ESC or enter
      let convo = targetCursor.talkingto.getConversation();
      maintext.addText(" ");
      maintext.addText("You sell: Nothing.");
      let retval = PerformTalk(targetCursor.talkingto, convo, "bye");
      maintext.addText(retval["txt"]);
      maintext.setInputLine(retval["input"]);
      maintext.drawTextFrame();
        
      if (retval["fin"] === 1) {
        PC.endTurn(retval["initdelay"]);
      }

    } else if ((code === 47) || (code === 63) || (code === 191)) {  //  ?, or / since it doesn't actually look at shift
      maintext.addText(" ");
      PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), "sell");
    } else if ((code >= 65) && (code <= 90)) {
      let merinv = DU.merchants[targetCursor.talkingto.getMerch()];
      let idx = code-65;
      if (merinv.stock[idx]) {
        let ininv = PC.checkInventory(merinv.stock[idx].item);
        if (ininv) {
          let qty = ininv.getQuantity();
          if ((ininv === PC.getArmor()) || (ininv === PC.getWeapon()) || (ininv === PC.getMissile())) {
            qty = qty-1;
          }
          if (qty) { // sell it!
            let sold = ininv.desc;
            if (ininv.checkType("Potion")) { IdPotion(ininv); }
            sold = sold.charAt(0).toUpperCase() + sold.slice(1)
            maintext.addText(sold + ": sold.");
            PC.removeFromInventory(ininv);  // already handles only subtracting 1 if there are multiples
            if (ininv.valuable) {
              PC.addGold(Math.ceil(merinv.stock[idx].price * .95));
            } else {
              PC.addGold(Math.ceil(merinv.stock[idx].price/10));
            }
            DUPlaySound("sfx_coin");
            DrawCharFrame();
          }
        } 
      }
    }
  }
  else if (gamestate.getMode() === "buy-choose") {
    let merinv = DU.merchants[targetCursor.talkingto.getMerch()];
    let idx = targetCursor.buychoice;
    if (!merinv.stock[idx].sellqty && (code === 89)) { // buy one at a time, choosing to buy (pressing Y)
      if (merinv.type === "spells") {
        PC.addSpell(merinv.stock[idx].lvl, merinv.stock[idx].sid);
        maintext.addText(" ");
        maintext.addText("You have learned the spell " + merinv.stock[idx].desc + ".");
        PC.addGold(-(merinv.stock[idx].price));
        DUPlaySound("sfx_coin");
        PC.addSpell(merinv.stock[idx].lvl, merinv.stock[idx].sid);
        gamestate.setMode("buy");
        maintext.setInputLine("Buy what: ");
        maintext.drawTextFrame();
        DrawCharFrame();
      } else {
        let idx = targetCursor.buychoice;
        let newitem = localFactory.createTile(merinv.stock[idx].item);
        if (merinv.stock[idx].quantity != 99) { merinv.stock[idx].quantity = merinv.stock[idx].quantity -1; }
        PC.addGold(-(merinv.stock[idx].price));
        DUPlaySound("sfx_coin");
        PC.addToInventory(newitem,1);

        // if you bought a potion, you now know what that color potion is
        if (newitem.checkType("potion")) {
          let known = newitem.getName().toLowerCase();
          known = "knows" + known;
          DU.gameflags.setFlag(known, 1);
        }

        maintext.addText(" ");
        maintext.addText(newitem.getDesc().charAt(0).toUpperCase() + newitem.getDesc().slice(1) + ": Purchased. Anything else?");
        maintext.setInputLine("Buy what: ");
        maintext.drawTextFrame();

        DrawCharFrame();
        gamestate.setMode("buy");
      }
    } else if (merinv.stock[idx].sellqty && (code === 13)) {  // buy in a batch, have hit Enter
      let idx = targetCursor.buychoice;
      let buyqty = parseInt(targetCursor.buyqty);
      delete targetCursor.buyqty; 
      if (isNaN(buyqty)) { buyqty = 0; }
      if (buyqty <= 0) { 
        PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), "_nobuy");
        gamestate.setMode("buy");
        maintext.setInputLine("Buy what: ");
        maintext.drawTextFrame();
      } else if (buyqty > merinv.stock[idx].quantity) {
        maintext.addText("There are not that many available.");
        targetCursor.buyqty = buyqty;
      } else if ((merinv.stock[idx].price * parseInt(buyqty)) <= PC.getGold()) {
        maintext.addText(merinv.stock[idx].sale);
        let newitem = localFactory.createTile(merinv.stock[idx].item);
        if (merinv.stock[idx].quantity != 99) { merinv.stock[idx].quantity = merinv.stock[idx].quantity - buyqty; }
        PC.addGold(-(merinv.stock[idx].price * buyqty));
        DUPlaySound("sfx_coin");
        PC.addToInventory(newitem,buyqty);
        maintext.addText(" ");
        maintext.addText(newitem.getDesc().charAt(0).toUpperCase() + newitem.getDesc().slice(1) + " x" + buyqty + ": Purchased. Anything else?");
        if (HasStock(targetCursor.talkingto.getMerch())) {
          maintext.setInputLine("Buy what: ");
          maintext.drawTextFrame();
          DrawCharFrame();
          gamestate.setMode("buy");        
        } else {
          let retval = PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), "_soldout");
          maintext.addText(retval["txt"]);
          maintext.setInputLine(retval["input"]);
          maintext.drawTextFrame();
        
          if (retval["fin"] === 1) {
            PC.endTurn(retval["initdelay"]);
          }
        }
      } else {
        maintext.addText("You don't have enough gold for that.");
        gamestate.setMode("buy");
      }
    } else if ((code >= 48) && (code <= 57) && (merinv.stock[idx].sellqty)) {
      // picking a number
      let typednum = code-48;
      if (!targetCursor.buyqty) {
        if (typednum) {  // there's no buyqty yet, so you can't add 0 to it.
          targetCursor.buyqty = code-48;
          targetCursor.buyqty = targetCursor.buyqty.toString();
        } 
      } else if ( targetCursor.buyqty.length <= 2) {
        targetCursor.buyqty = targetCursor.buyqty + "" + typednum;
      }
      if (targetCursor.buyqty) {
        maintext.setInputLine("Purchase how many? " + targetCursor.buyqty);
        maintext.drawTextFrame();
      }
    } else if ((!merinv.stock[idx].sellqty && (code === 78)) || (code === 27)) {
      // saying NO (non-qty) or ESC (any)
      maintext.addText(" ");
      PerformTalk(targetCursor.talkingto, targetCursor.talkingto.getConversation(), "_nobuy");
      maintext.setInputLine("Buy what: ");
      maintext.drawTextFrame();
//      DisplayWares(targetCursor.talkingto);
      gamestate.setMode("buy");
    } else if ((code === 8) && (merinv.stock[idx].sellqty)) {
      // backspace
      if (targetCursor.buyqty.length > 1) {
        targetCursor.buyqty = targetCursor.buyqty.charAt(0);
      } else {
        targetCursor.buyqty = "";
      }
      maintext.setInputLine("Purchase how many? " + targetCursor.buyqty);
      maintext.drawTextFrame();
    }
  } else if (gamestate.getMode() === "empower") {
    let retval = EmpowerReagentCommands(code);
    if (retval["fin"] === -1) {
      delete targetCursor.invx;
      delete targetCursor.invx_old;
      delete targetCursor.invy;
      delete targetCursor.mortar;
      delete targetCursor.tgt;
      delete targetCursor.manacost;
      document.getElementById('uiinterface').innerHTML = "";
      document.getElementById('uiinterface').style.backgroundColor = "";
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
      gamestate.setMode("player");
      gamestate.setTurn(PC);
    } else if (retval["fin"] === 0) {
      ShowEmpowerReagentChoice(PC);
    } else if (retval["fin"] === 1) {
      delete targetCursor.invx;
      delete targetCursor.invx_old;
      delete targetCursor.invy;
      delete targetCursor.mortar;
      delete targetCursor.tgt;
      delete targetCursor.manacost;
      document.getElementById('uiinterface').innerHTML = "";
      document.getElementById('uiinterface').style.backgroundColor = "";
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
      PC.endTurn();
    } else if (retval["fin"] === 2) {
      delete targetCursor.invx;
      delete targetCursor.invx_old;
      delete targetCursor.invy;
      delete targetCursor.mortar;
      delete targetCursor.tgt;
      delete targetCursor.manacost;
      document.getElementById('uiinterface').innerHTML = "";
      document.getElementById('uiinterface').style.backgroundColor = "";
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");   	
      DrawMainFrame("draw", PC.getHomeMap(), PC.getx(), PC.gety());
      if (retval["outcome"].length === 1) {
        maintext.addText(retval["outcome"][0]);
        maintext.setInputLine("&gt;");
        maintext.drawTextFrame();
        PC.endTurn();
      } else {
        targetCursor.command = "empower";
        targetCursor.txt = retval["outcome"];
        targetCursor.idx = 1;
        gamestate.setMode("anykey");
        maintext.addText(retval["outcome"][0]);
        maintext.setInputLine("&gt;[MORE]");
        maintext.drawTextFrame();
      }
    }
  } else if (gamestate.getMode() === "endgame") {
    if (targetCursor.dark === 1) {
      maintext.addText("Before you stands your ultimate foe, the architect of all your struggles. Its face is unreadable within the shadows, but it does not move as you lift the ruby up to eye level.");
      targetCursor.dark++;
    } else if (targetCursor.dark === 2) {
      maintext.addText("You are so far from the sun, here.");
      targetCursor.dark++;
    } else if (targetCursor.dark === 3) {
      maintext.addText("But you can feel the motes of the sun's strength that you have seeded in the underworld. Precisely arranged, to focus their power where it is needed.");
      targetCursor.dark++;
    } else if (targetCursor.dark === 4) {
      maintext.addText("You focus on the ruby, and command it to bring forth light. There is a flicker...");
      targetCursor.dark++; 
      document.getElementById('uiinterface').style.backgroundImage = `url('graphics/splash/DemonGem-Part2.gif')`;  
    } else if (targetCursor.dark === 5) {
      maintext.addText("For a heartbeat, the light grows.");
      targetCursor.dark++;
    } else if (targetCursor.dark === 6) {
      maintext.addText("And then, it goes out.");
      document.getElementById('uiinterface').style.backgroundColor = "black";
      document.getElementById('uiinterface').style.backgroundImage = ``;  
      targetCursor.dark++;
    } else if (targetCursor.dark === 7) {
      maintext.addText("A voice speaks. The voice you have been hearing all through your striving deeper into the dark.");
      targetCursor.dark++;
    } else if (targetCursor.dark === 8) {
      maintext.addText('"This is a marvelous enchantment that you have brought here before me. It is truly my nemesis, the undoing of all my schemes. And yet."');
      targetCursor.dark++;
    } else if (targetCursor.dark === 9) {
      maintext.addText(`"To use this amazing artifact, this gemstone of sunlight's radiance, you must concentrate your will upon it- to invoke light, and life, and power. You have to want, so that your will sparks forth, and the ruby lights."`);
      targetCursor.dark++;
    } else if (targetCursor.dark === 10) {
      maintext.addText(`"And here, alone in the dark? My will overpowers yours like a hurricane snuffing a candle."`);
      targetCursor.dark++;
    } else if (targetCursor.dark === 11) {
      maintext.addText(`"This is the end of your quest, little hero, failed lightbringer. It is over."`);
      targetCursor.dark++;
    } else if (targetCursor.dark === 12) {
      maintext.addText("You cannot move. It is challenging to think. The will of the Shepherd of the Dark surrounds you like a miasma. Within and without... all goes dark.");
      targetCursor.dark++;
    } else if (targetCursor.dark === 13) {
      maintext.addText("...");
      targetCursor.dark++;
    } else if (targetCursor.dark === 14) {
      maintext.addText("You try to rouse yourself. You are not done fighting... and then there is another voice, in your head. One you know as well as you know your own.")
      targetCursor.dark++;
    } else if (targetCursor.dark === 15) {
      maintext.addText(`"${PC.getPCName()}? ${PC.getPCName()}, can you hear me?"`);
      targetCursor.dark++;
    } else if (targetCursor.dark === 16) {
      maintext.addText("Your brother. In your mind, you see a vision of him, and standing to either side of him are your mother and your father. The Rune of Kings blazes on the flesh of each, tying each of you to the land, to the kingdom, and to each other. Each of them reaches out a hand, and hold fast to your shoulders.");
      targetCursor.dark++;
      let endmap = maps.addMap("endgame");
      MoveBetweenMaps(PC,PC.getHomeMap(), endmap, 6, 6);
      let uii = document.getElementById('uiinterface');
      uii.style.backgroundColor = "";
      uii.style.backgroundImage = ``;  
      DrawMainFrame("draw",PC.getHomeMap(),6,6);
    } else if (targetCursor.dark === 17) {
      let lance = localFactory.createTile("PrinceNPC");
      let endmap = maps.getMap("endgame");
      endmap.placeThing(6,5,lance);
      maintext.addText(`<span class='mainspeaker'>Lance:</span> "Thank goodness! It worked, we've reached you!"`);
      targetCursor.dark++;
      DrawMainFrame("one", PC.getHomeMap(),6,5);
    } else if (targetCursor.dark === 18) {
      maintext.addText(`<span class='mainspeaker'>King Daragen:</span> "You have gone forth into the darkness at the end of the world... but you are not alone."`);
      let king = localFactory.createTile("KingNPC");
      let endmap = maps.getMap("endgame");
      endmap.placeThing(5,5,king);
      targetCursor.dark++;
      if (DU.gameflags.getFlag("music")) { DUPlayMusic("Alone", {fade:1}); }
      DrawMainFrame("one", PC.getHomeMap(),5,5);
    } else if (targetCursor.dark === 19) {
      maintext.addText(`<span class='mainspeaker'>Queen Shelaria:</span> "We love you so much, ${PC.getPCName()}. But there are so many others whose lives you have touched, and made better, and who care about you. You will always be connected to them."`);
      let queen = localFactory.createTile("QueenNPC");
      let endmap = maps.getMap("endgame");
      endmap.placeThing(7,5,queen);
      targetCursor.dark++;
      DrawMainFrame("one", PC.getHomeMap(),7,5);
      targetCursor.darkchar = 0;
    } else if (targetCursor.dark === 20) {
      if (targetCursor.darkchar === 0) {
        if (DU.gameflags.getFlag("rescued_sam")) {
          maintext.addText(`<span class='mainspeaker'>Kylee:</span> "You brought my daughter back to me. I will never forget that. Thank you."`);
          let kylee = localFactory.createTile("TownsfolkNPC");
          kylee.setOverrideGraphic("civ_red.gif");
          let sam = localFactory.createTile("ChildVillagerNPC");
          let endmap = maps.getMap("endgame");
          endmap.placeThing(3,8,kylee);
          endmap.placeThing(4,8,sam);
          DrawMainFrame("one",PC.getHomeMap(),3,8);
          DrawMainFrame("one",PC.getHomeMap(),4,8);
        } else { targetCursor.darkchar = 2; }
      }
      if (targetCursor.darkchar === 1) {
        maintext.addText(`<span class='mainspeaker'>Sam:</span> "You're a hero! You brought me out of the dark!"`);
      }
      if (targetCursor.darkchar === 2) {
        if (DU.gameflags.getFlag("anna_left")) {
          maintext.addText(`<span class='mainspeaker'>Anna:</span> "Oh, ${PC.getPCName()}! Thank you for showing me the truth about Garrick."`);
          let anna = localFactory.createTile("TownsfolkVillagerNPC");
          anna.setOverrideGraphic("310.2.gif");
          let endmap = maps.getMap("endgame");
          endmap.placeThing(9,1,anna);
          DrawMainFrame("one",PC.getHomeMap(),9,1);
        } else {targetCursor.darkchar = 5; }
      }
      if (targetCursor.darkchar === 3) {
        maintext.addText(`She stands with her arm around two people, one each on either side of her. Damien and Brooke also smile at you.`);
        let brooke = localFactory.createTile("TownsfolkVillagerNPC");
        brooke.setOverrideGraphic("civ_green.2.gif");
        let damien = localFactory.createTile("AdventurerVillagerNPC");
        let endmap = maps.getMap("endgame");
        endmap.placeThing(8,1,brooke);
        endmap.placeThing(10,1,damien);
        DrawMainFrame("one",PC.getHomeMap(),8,1);
        DrawMainFrame("one",PC.getHomeMap(),10,1);
      }
      if (targetCursor.darkchar === 4) {
        maintext.addText(`<span class='mainspeaker'>Anna:</span> "I don't know what the future will bring. But we've learned a lot about finding the love that is out there. We're going to find that future... together."`);
      }
      if (targetCursor.darkchar === 5) {
        if (DU.gameflags.getFlag("returned_cloak")) {
          maintext.addText(`<span class='mainspeaker'>Warren:</span> "You brought back to us a memento of our dear fallen friend. It may seem like a small thing... and perhaps it is. Sometimes the smallest deeds have a greater impact than you can imagine. We owe you."`);
          let warren = localFactory.createTile("AdventurerVillagerNPC");
          let garen = localFactory.createTile("RangerVillagerNPC");
          garen.setOverrideGraphic("ranger-offcolor.gif");
          let endmap = maps.getMap("endgame");
          endmap.placeThing(3,2,warren);
          endmap.placeThing(3,3,garen);
          DrawMainFrame("one",PC.getHomeMap(),3,2);
          DrawMainFrame("one",PC.getHomeMap(),3,3);
        } else {targetCursor.darkchar = 6; }
      }
      if (targetCursor.darkchar === 6) {
        if (DU.gameflags.getFlag("franklin_gift")) {
          maintext.addText(`<span class='mainspeaker'>Franklin:</span> "I thought that was it- I would be on the road forever, never staying too long in any town, for fear my debts would catch up to me. I appreciate you and what you've done for me."`);
          let franklin = localFactory.createTile("BardVillagerNPC");
          franklin.setOverrideGraphic("311.gif");
          let endmap = maps.getMap("endgame");
          endmap.placeThing(11,4,franklin);
          DrawMainFrame("one",PC.getHomeMap(),11,4);
        } else { targetCursor.darkchar = 7; }
      } 
      if (targetCursor.darkchar === 7) {
        if (DU.gameflags.getFlag("rhiannon_recipe")) {
          maintext.addText(`<span class='mainspeaker'>Rhiannon:</span> "The tavern's been booming, since you helped me out with that recipe. Come by again any time- your meal's on me."`);
          let rhi = localFactory.createTile("TownsfolkVillagerNPC");
          rhi.setOverrideGraphic("310.gif");
          let endmap = maps.getMap("endgame");
          endmap.placeThing(1,5,rhi);
          DrawMainFrame("one",PC.getHomeMap(),1,5);
        } else { targetCursor.darkchar = 8; }
      }
      if (targetCursor.darkchar === 8) {
        if (DU.gameflags.getFlag("solved_pheran")) {
          maintext.addText(`<span class='mainspeaker'>Chera:</span> "Did you think that death would lessen our gratitude? Without you we would still be bound to our curse. Thank you."`);
          let ghost1 = localFactory.createTile("GhostNPC");
          let ghost2 = localFactory.createTile("GhostNPC");
          let ghost3 = localFactory.createTile("GhostNPC");
          let endmap = maps.getMap("endgame");
          endmap.placeThing(9,9,ghost1);
          endmap.placeThing(9,8,ghost2);
          endmap.placeThing(8,9,ghost3);
          DrawMainFrame("one",PC.getHomeMap(),9,9);
          DrawMainFrame("one",PC.getHomeMap(),9,8);
          DrawMainFrame("one",PC.getHomeMap(),8,9);
        } else { targetCursor.darkchar = 9; }
      }
      if (targetCursor.darkchar === 9) {
        if (DU.gameflags.getFlag("blanche_returned")) {
          maintext.addText(`<span class='mainspeaker'>Blanche:</span> "I owe you. You found me my missing jewelry without any expectation of reward, just because you are a good person. Don't think we didn't notice."`);
          let blanche = localFactory.createTile("FighterVillagerNPC");
          let endmap = maps.getMap("endgame");
          endmap.placeThing(6,10,blanche);
          DrawMainFrame("one",PC.getHomeMap(),6,10);
        } else { targetCursor.darkchar = 10; }
      }
      if (targetCursor.darkchar === 10) {
        if (DU.gameflags.getFlag("rhys_summoning")) {
          maintext.addText(`<span class='mainspeaker'>Rhys:</span> "I know he's your brother, but to me, you're the one who saved my closest friend. You drove off Justice, and sat with me as we conjured information about the enemy. I'm proud to know you, and call you friend. Thank you, for all you've done."`);
          let rhys = localFactory.createTile("RangerVillagerNPC");
          rhys.setOverrideGraphic("305.gif");
          let endmap = maps.getMap("endgame");
          endmap.placeThing(6,4,rhys);
          DrawMainFrame("one",PC.getHomeMap(),6,4);
        } else { targetCursor.darkchar = 11; }
      }
      if (targetCursor.darkchar === 11) {
        maintext.addText(`<span class='mainspeaker'>Lance:</span> "You've made it this far. And you are not alone. You can finish it."`);
      }
      targetCursor.darkchar++;
      if (targetCursor.darkchar === 12) { targetCursor.dark++; }
    } else if (targetCursor.dark === 21) {
      maintext.addText("...");
      targetCursor.dark++;
      FadeOut();
      gamestate.setMode("null");
      maintext.setInputLine("&gt;");
      setTimeout(function() { gamestate.setMode("endgame"); maintext.setInputLine("&gt;[MORE]"); maintext.drawTextFrame(); }, 2000);
    } else if (targetCursor.dark === 22) {
      let uii = document.getElementById('uiinterface');
      uii.style.backgroundColor = "black";
      uii.style.opacity = 1;
      uii.style.backgroundImage = `url('graphics/splash/DemonGem-Part1.gif')`; 
      document.getElementById('spelleffects').innerHTML = "";
      maintext.addText("Your eyes open with a snap. You sense that only seconds have passed. You feel the will of the Shepherd of the Dark oppressing you, but now you know that you are strong enough to stand against it.");
      targetCursor.dark++;
    } else if (targetCursor.dark === 23) {
      maintext.addText(`You hear the Shepherd's voice in your head, tone no longer mocking. "What? What is this?"`);
      targetCursor.dark++;
    } else if (targetCursor.dark === 24) {
      maintext.addText("Pure and bright, your will strikes the ruby like steel on flint. And the ruby awakes.");
      document.getElementById('uiinterface').style.backgroundImage = `url('graphics/splash/DemonGem-Part3.gif')`; 
      if (DU.gameflags.getFlag("music")) { DUPlayMusic("Light", {fade:1}); QueueMusic("Theme");}
      targetCursor.dark++;
    } else if (targetCursor.dark === 25) {
      maintext.addText("Light bursts forth, as bright as the sun, more pure than anything you've ever seen. You cannot see the daemon well, because it is not a thing that can be lit. But against this light, you see it cringe away, step back, cry out; against this light, it cannot stand.")
      targetCursor.dark++;
    } else if (targetCursor.dark === 26) {
      maintext.addText(`You hear the voice, one last time. "How? I do not... I cannot...! No. NO!"`);
      targetCursor.dark++;
    } else if (targetCursor.dark === 27) {
      maintext.addText("And then... all is silent.");
      targetCursor.dark++;
    } else if (targetCursor.dark === 28) {
      maintext.addText("Your foe is frozen, as though in ice, surrounded in a cocoon of light. You lower the ruby, but the light does not change. The daemon is imprisoned, here in the depths, under the world. Hopefully, with luck, forever.");
      targetCursor.dark++;
    } else if (targetCursor.dark === 29) {
      maintext.addText("It is a long trek back to the surface. But eventually, exhausted, you reach your destination: home.");
      document.getElementById('uiinterface').style.backgroundColor = "black";
      document.getElementById('uiinterface').style.backgroundImage = ``;
      targetCursor.dark++;
    } else if (targetCursor.dark === 30) {
      maintext.addText(`"My ${PC.getPCName()}, you have done it," says your mother with exuberance. "Prevented a war; saved the kingdom; saved your family. It is more than any one person should have been asked to do, but you were strong enough to win through. We must now be ever vigilant to the threat that you have caged beneath our land. We must never forget. For you, there will be pageants and celebrations... after you have had a week of sleep! Your quest is done. Thank you!"`);
      let endmap = maps.addMap("endgame2");
      MoveBetweenMaps(PC,PC.getHomeMap(), endmap, 6, 6);
      let uii = document.getElementById('uiinterface');
      uii.style.backgroundColor = "";
      uii.style.backgroundImage = ``; 
      DrawMainFrame("draw",PC.getHomeMap(),6,6);
      targetCursor.dark++;
    } else if (targetCursor.dark === 31) {
      let clock = GetClockTimePassed();
      let timedesc = "";
      if (clock[0]) { timedesc = `${clock[0]} years, `; }
      if (clock[1]) { timedesc += `${clock[1]} months, `; }
      timedesc += `${clock[2]} days, ${clock[3]} hours, and ${clock[4]} minutes`;
      maintext.addText(`YOU HAVE WON CHRONICLES OF ELLUSUS I: THE DARK UNKNOWN IN ${timedesc}! CONGRATULATIONS!`);
      maintext.setInputLine("");
      targetCursor.dark++;
      gamestate.setMode("null");
    } else {
      alert("How did we get here? Bottom of main.");
    }
    maintext.drawTextFrame();
  }
  maintext.flushDelayedText();
}

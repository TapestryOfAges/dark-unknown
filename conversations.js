
"use strict";

function Conversation() {
  
}
Conversation.prototype = new Object();

// keep_talking values:
// 0  : conv ends
// 1  : normal conv
// 2  : [more]
// 3  : switch to buy
// 4  : switch to sell

Conversation.prototype.respond = function(speaker, keyword, skipahead) { 
    
  if (!skipahead) { skipahead = targetCursor.skipahead; }
  var flags_met;
  var necessary_item;
  var keep_talking = 0;
  if (!keyword) { keyword = "bye"; }
    
  keyword = keyword.toLowerCase();

  var checkkeyword = 1;
  var addtolog = { hasResponse: 1, flagsmet: "", itemsowned: ""};

  while (checkkeyword)  {
    flags_met = 1;
    if (!this.hasOwnProperty(keyword)) {
      keyword = "_confused";
      addtolog.hasResponse = 0;
    }
  
    var flags = this[keyword].flags;
    if (flags.hasOwnProperty("flags_met")) {
      if (flags.flags_met.indexOf("self_") !== -1) {
        var tmpflag = flags.flags_met.replace(/self_/, "");
        if (!speaker[flags.flags_met]) { flags_met = 0; }
      }      
      else if (!DU.gameflags.getFlag(flags.flags_met)) { flags_met = 0; }  
      else { addtolog.flagsmet += " " + flags.flags_met; }
    }
    if (flags.hasOwnProperty("has_item")) {
      necessary_item = PC.checkInventory(flags.has_item);
      if (!necessary_item) { flags_met = 0; }
      else { addtolog.itemsowned += " " + flags.has_item; }
    }
    if (flags.hasOwnProperty("has_gold")) {
      if (PC.getGold() < parseInt(flags.has_gold)) { flags_met = 0; }
      else { addtolog.itemsowned += " gold"; }
    }
  
    if (this[keyword].responses[flags_met].indexOf("->") != -1) {
      var holder = this[keyword].responses[flags_met];
      holder = holder.replace(/\-\>/, "");
      keyword = holder;
    } else {
      checkkeyword = 0;
    }
    
  }
  
  if (!convlog[convlog.length-1].hasOwnProperty("hasResponse")) { 
    convlog[convlog.length-1].hasResponse = addtolog.hasResponse;
    convlog[convlog.length-1].flagsmet = addtolog.flagsmet;
    convlog[convlog.length-1].itemsowned = addtolog.itemsowned;
  }
  keep_talking = this.say(speaker, this[keyword].responses[flags_met], skipahead);
  
  if (keep_talking === 2) { 
    targetCursor.keyword = keyword;
    targetCursor.skipahead = ++skipahead;
    return keep_talking; 
  }  // don't execute end of response triggers until actually at end of response
  targetCursor.keyword = "";
  targetCursor.skipahead = 0;
  // handle triggers
  var triggers = this[keyword].triggers[flags_met];
  
  if (triggers.hasOwnProperty("give_item")) {
    var newitem = localFactory.createTile(triggers.give_item)
    PC.addToInventory(newitem,1);
    maintext.addText("<span class='sysconv'>You have obtained: " + newitem.getFullDesc() + ".</span>");
  }
  if (triggers.hasOwnProperty("take_item")) {
    var takeme = PC.checkInventory(triggers.take_item)
    if (takeme) {
      PC.removeFromInventory(takeme);
      maintext.addText("<span class='sysconv'>You no longer have one: " + takeme.getDesc() + ".</span>");
    }
  }
  if (triggers.hasOwnProperty("give_gold")) {
    PC.addGold(parseInt(triggers.give_gold));
    if (triggers.give_gold > 0) {
      maintext.addText("<span class='sysconv'>You have obtained: " + triggers.give_gold + " gold.</span>");
    } else {
      var amt = Math.abs(triggers.give_gold);
      maintext.addText("<span class='sysconv'>You have lost: " + amt + " gold.</span>");
    }
    DrawCharFrame();
  }
  if (triggers.hasOwnProperty("give_karma")) {
    DU.gameflags.setFlag("karma", DU.gameflags.getFlag("karma") + parseInt(triggers.give_karma));
  }
  if (triggers.hasOwnProperty("give_xp")) {
    PC.addxp(parseInt(triggers.give_xp));
    maintext.addText("<span class='sysconv'>You have gained: " + triggers.give_xp + " XP.</span>");
  }
  if (triggers.hasOwnProperty("yes_no")) {
    inputText.subcmd = "yn";
  }
  if (triggers.hasOwnProperty("set_flag")) {
    if (triggers.set_flag.indexOf("unset_") !== -1) {
      var tmpflag = triggers.set_flag.replace(/unset_/, "");
      if (DU.gameflags.getFlag(tmpflag)) {
        DU.gameflags.deleteFlag(tmpflag);
      }
    } else {
      DU.gameflags.setFlag(triggers.set_flag, 1);
    
      // special cases
      if (typeof OnConvTriggers[triggers.set_flag] === "function") {
        var modkeep = OnConvTriggers[triggers.set_flag](speaker,keyword);
        if (modkeep) { keep_talking = modkeep; }
      }

    } 
  }
  if (triggers.hasOwnProperty("end_convo")) {
    if ((triggers.end_convo !== 1) && (triggers.end_convo !== "1")) {
      this.say(speaker, triggers.end_convo);
    }
    if (keep_talking != -1) {
      keep_talking = 0;
    }
  }
  if (triggers.hasOwnProperty("start_shop")) {
    if (HasStock(speaker.getMerch())) {
      var sell = DisplayWares(speaker);
    
      if (sell) {
        targetCursor.alreadyBought = {};
        keep_talking = 3; 
        // set up merchanting!
      }
    } else {
      keep_talking = this.say(speaker, this["_soldout"].responses[flags_met], skipahead);
    }

  }
  if (triggers.hasOwnProperty("start_sell")) {

    var selllist = [];
    selllist = GetSellBack(PC,speaker);
    
    if (selllist.length) {
      maintext.addText(" ");
      maintext.addText("This merchant will buy:");
      for (var i=0; i<selllist.length; i++) {
        maintext.addText(selllist[i]);
      }
    } else {
      var convo = targetCursor.talkingto.getConversation();
      maintext.addText(" ");
      var genderterms = targetCursor.talkingto.getGenderedTerms();
      maintext.addText("You have nothing " + genderterms.pronoun + " would like to buy.");
      var retval = PerformTalk(targetCursor.talkingto, convo, "bye");
      maintext.addText(retval["txt"]);
      maintext.setInputLine("&gt; ");
      maintext.drawTextFrame();
        
      if (retval["fin"] === 1) {
        PC.endTurn(retval["initdelay"]);
        return;
      }
 
    }


    keep_talking = 4;
  }
  
  return keep_talking;
  
}

Conversation.prototype.say = function(speaker, saywhat, skipahead) {
  var gterms = PC.getGenderedTerms();
  var pcname = PC.getPCName();
  var npcterms = speaker.getGenderedTerms();
  var npcname = speaker.getNPCName();
  
  saywhat = saywhat.replace(/=(\w+)=/g, "<span style='color:cyan'>$1</span>");
  saywhat = saywhat.replace(/%FORMAL%/g, gterms.formal);
  saywhat = saywhat.replace(/%TITLED%/g, gterms.titled);
  saywhat = saywhat.replace(/%NAME%/g, pcname);
  if (DU.gameflags.getFlag("knows_" + speaker.conversation)) {
    saywhat = saywhat.replace(/%MYNAME%/g, npcname); 
  } else {
    saywhat = saywhat.replace(/%MYNAME%/g, "the " + speaker.getDesc());
  }
  saywhat = saywhat.replace(/%PRONOUN%/g, gterms.pronoun);
  saywhat = saywhat.replace(/%POSSESSIVE%/g, gterms.possessive);
  saywhat = saywhat.replace(/%OBJ%/g, gterms.objective);
  saywhat = saywhat.replace(/%SIBLING%/g, gterms.sibling);
  saywhat = saywhat.replace(/%KIDDIE%/g, gterms.kiddie);
  saywhat = saywhat.replace(/%SELF_PRONOUN%/g, npcterms.pronoun);
  saywhat = saywhat.replace(/%SYS%(.+?)%SYS%/g, "<span class='sysconv'>$1</span>");
  
  var speech = saywhat.split("%%");
  while (skipahead) {
    speech.shift();
    skipahead--;
  }
  speech[0] = speech[0].charAt(0).toUpperCase() + speech[0].slice(1);
  maintext.addText("<span class='conv'>" + speech[0] + "</span>");
  speech.shift();
  
  if (speech[0]) {
    return 2;  // has more to say, waiting on any keypress
  } 

  return 1; // full response
}


// Permitted flags: flag_set -- checks DU.gameflags to see if a flag has been set
//                  has_item -- checks PC inventory

// Permitted triggers: end_convo -- conversation ends after response given
//                     give_item, take_item -- alter the PC inventory
//                     set_flag -- set a flag
//                     start_shop -- change game state, do merchanty things
//                     start_sell -- change game state, sell stuff to merchant

function ConvNode(flags, noflag_response, flag_response, triggers) {
  this.flags = flags;
  this.responses = [ noflag_response, flag_response ] ;  
  this.triggers = triggers;
}
ConvNode.prototype = new Object();
//Deprecated

function InnRoom(xc,yc,doors) {
  if (DU.gameflags.getFlag("music")) {
    nowplaying.song.stop();
    nowplaying = DUPlayMusic("Lullaby");
  }
  var innmap = PC.getHomeMap();
  maintext.setInputLine("&gt;");
  maintext.drawTextFrame();
  
  $("#mainview").fadeOut(1500, function() {
    maintext.addText("ZZZZZZ...");
    if (DU.gameflags.getFlag("music")) {
      QueueMusic(PC.getHomeMap().getMusic());
    }
    while(doors[0]) {
      innmap.moveThing(0,0,PC);
      if (GetDistance(0,0,doors[0],doors[1]) <= 10) {
        innmap.moveThing(30,30,PC);
      }
      var inndoor = innmap.getTile(doors[0],doors[1]);
      inndoor = inndoor.getTopFeature();
      if (inndoor.open) {
        inndoor.use(PC);
      }
      doors.shift();
      doors.shift();
    }
    innmap.moveThing(xc,yc,PC);
    DrawMainFrame("draw", PC.getHomeMap().getName(), PC.getx(),PC.gety());
    setTimeout(function() {
      $("#mainview").fadeIn(1000, function() {
        maintext.addText("You awake refreshed!");
        PC.healMe(Dice.roll("20d5+20"));
        PC.setMana(PC.getMaxMana());
        gamestate.setMode("player");
        PC.endTurn();
      });
    },1000);
  });

}

function OnConvTriggers() {};

OnConvTriggers["ash_password"] = function(speaker,keyword) {
  var door = PC.getHomeMap().getTile(25,21).getTopFeature();

  PC.getHomeMap().deleteThing(door);
  door = localFactory.createTile("Door");
  PC.getHomeMap().placeThing(25,21,door);
      
  // replicating a door's Use code without a user
  door.setGraphicArray(door.opengraphic);
  door.closedLOS = door.getBlocksLOSArray();
  var seethru = [];
  seethru[0] = 0;
  door.setBlocksLOSArray(seethru);
  door.addPassable(MOVE_WALK);
  DUPlaySound("sfx_open_door"); 
  door.open = 1;
			
  DrawMainFrame("draw",PC.getHomeMap().getName(),PC.getx(),PC.gety());
  DU.gameflags.deleteFlag("ash_password");
  
  return;
}

OnConvTriggers["spellbook"] = function(speaker,keyword) {
  PC.addSpell(SPELL_LIGHT_LEVEL,SPELL_LIGHT_ID); 
  PC.setLastSpellLevel(SPELL_LIGHT_LEVEL);
  PC.setLastSpell(SPELL_LIGHT_ID);
  return;
}

OnConvTriggers["knows_samantha"] = function(speaker,keyword) {
  DU.gameflags.setFlag("knows_samantha2", 1);
  return; 
}

OnConvTriggers["king_heal"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("king_heal");
  PC.healMe(1000);
  var effects = PC.getSpellEffects();
  if (effects) {
    for (var i=0; i<effects.length; i++) {
      if (effects[i].getName() === "Poison") {
        effects[i].endEffect();
      }
      if (effects[i].getName() === "Disease") {
        effects[i].endEffect();
      }
    }
  }
  ShowEffect(PC, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
  DrawCharFrame();
  
  return;
}

OnConvTriggers["train_int"] = function(speaker,keyword) {
  if (PC.gettp() === 0) {
    alert("Somehow training Int without any tp.");
  } else if ((PC.getBaseInt() < STAT_MAX) && (PC.gettp() > 0)) {
    PC.setBaseInt(PC.getBaseInt()+1);
    PC.settp(PC.gettp()-1);
    maintext.addText("<span class='sysconv'>Your intelligence is now " + PC.getInt() + ".</span>");
  } else {
    maintext.addText("<span class='sysconv'>Your intelligence cannot be raised further by training.</span>");
  }
  if (PC.gettp() === 0) {
    DU.gameflags.deleteFlag("can_train");
  }
  DU.gameflags.deleteFlag("train_int");
  return;
}

OnConvTriggers["train_dex"] = function(speaker,keyword) {
  if (PC.gettp() === 0) {
    alert("Somehow training Dex without any tp.");
  } else if ((PC.getBaseDex() < STAT_MAX) && (PC.gettp() > 0)) {
    PC.setBaseDex(PC.getBaseDex()+1);
    PC.settp(PC.gettp()-1);
    maintext.addText("<span class='sysconv'>Your dexterity is now " + PC.getDex() + ".</span>");
  } else {
    maintext.addText("<span class='sysconv'>Your dexterity cannot be raised further by training.</span>");
  }
  if (PC.gettp() === 0) {
    DU.gameflags.deleteFlag("can_train");
  }
  DU.gameflags.deleteFlag("train_dex");
  return;
}

OnConvTriggers["train_str"] = function(speaker,keyword) {
  if (PC.gettp() === 0) {
    alert("Somehow training Str without any tp.");
  } else if ((PC.getBaseStr() < STAT_MAX) && (PC.gettp() > 0)) {
    PC.setBaseStr(PC.getBaseStr()+1);
    PC.settp(PC.gettp()-1);
    maintext.addText("<span class='sysconv'>Your strength is now " + PC.getStr() + ".</span>");
  } else {
    maintext.addText("<span class='sysconv'>Your strength cannot be raised further by training.</span>");
  }
  if (PC.gettp() === 0) {
    DU.gameflags.deleteFlag("can_train");
  }
  DU.gameflags.deleteFlag("train_str");
  return;
}

OnConvTriggers["inn_20_y"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("inn_20_y");
  DU.gameflags.deleteFlag("inn_20");
  if (PC.getGold() < 20) {
    maintext.addText("You don't have enough gold!");
  } else {
    PC.addGold(-20);
    maintext.addText("He leads you to your room.");
    setTimeout(function() { InnRoom(28,17,[21,14,25,20]); }, 50);
  }
  return -1;
}

OnConvTriggers["inn_20_n"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("inn_20_n");
  DU.gameflags.deleteFlag("inn_20");
  return;
}

OnConvTriggers["inn_25"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("inn_25");

  PC.addGold(-25);
  setTimeout(function() { InnRoom(43,56,[28,50,34,51,38,50,41,49,44,52]); }, 50);
  
  return -1;
}

OnConvTriggers["health_kyvek"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    DU.gameflags.setFlag("all_health", 1);
  }
}

OnConvTriggers["health_daniel"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    DU.gameflags.setFlag("all_health", 1);
  }
}

OnConvTriggers["health_kylee"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    DU.gameflags.setFlag("all_health", 1);
  }
}

OnConvTriggers["health_garen"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    DU.gameflags.setFlag("all_health", 1);
  }
}

OnConvTriggers["health_guard"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    DU.gameflags.setFlag("all_health", 1);
  }
}

OnConvTriggers["health_amaeryl"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    DU.gameflags.setFlag("all_health", 1);
  }
}

OnConvTriggers["health_warren"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    DU.gameflags.setFlag("all_health", 1);
  }
}

OnConvTriggers["health_samuel"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    DU.gameflags.setFlag("all_health", 1);
  }
}

OnConvTriggers["health_ingrid"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    DU.gameflags.setFlag("all_health", 1);
  }
}

OnConvTriggers["shield_gotten"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("get_shield");
  DU.gameflags.deleteFlag("shield_gotten");
}

OnConvTriggers["ash_get_book"] = function(speaker,keyword) {
  var ashmap = PC.getHomeMap(); // he has to be on the PC's map since they just talked to him
  var npcs = ashmap.npcs.getAll();
  var ash;
  $.each(npcs, function(idx,val) {
    if (val.getNPCName() === "Asharden") { ash = val; }
  });
  if (!ash) { alert("Couldn't find Asharden to change his AI."); }
  else {
    ash.prevai = ash.getCurrentAI();
    ash.setCurrentAI("AshardenBook");
    ash.setConversation("asharden_book");
    DebugWrite("plot", "Asharden's AI changes to AshardenBook.<br />");
  }        
}

OnConvTriggers["anna_return"] = function(speaker,keyword) {
  var annamap = PC.getHomeMap(); // she has to be on the PC's map since they just talked to her
  var npcs = annamap.npcs.getAll();
  var anna;
  $.each(npcs, function(idx,val) {
    if (val.getNPCName() === "Anna") { anna = val; }
  });
  if (!anna) { alert("Couldn't find Anna to change her AI."); }
  else {
    anna.setCurrentAI("AnnaLeaves");
    DebugWrite("plot", "Anna's AI changes to AnnaLeaves.<br />");
  }
}

OnConvTriggers["garrick_flipout"] = function(speaker,keyword) {
  var garrickmap = PC.getHomeMap();
  var npcs = garrickmap.npcs.getAll();
  var garrick;
  var aoife;
  $.each(npcs, function(idx,val) {
    if (val.getNPCName() === "Garrick") { garrick = val; }
    if (val.getNPCName() === "Aoife") { aoife = val; }
  });
  if (!garrick) { alert("Couldn't find Garrick to change his AI."); }
  else {
    garrick.setCurrentAI("GarrickAttack");
    DebugWrite("plot", "Garrick's AI changes to GarrickAttack.<br />");
    garrick.setMaxHP(1030);
    garrick.setHP(1030);
    garrick.setAttitude("enraged");
  }
  if (!aoife) { alert("Couldn't find Aoife to change her AI."); }
  else {
    aoife.setCurrentAI("AoifeAttack");
    DebugWrite("plot", "Aoife's AI changes to AoifeAttack.<br />");
    var mace = localFactory.createTile("Shortsword");
    aoife.addToInventory(mace,1);
    aoife.setWeapon(mace);  // no longer actually a mace
    aoife.setAttitude("defensive");
    // to set her back, just reset to PeaceAI
  }
}

OnConvTriggers["kiba_rumor"] = function(speaker,keyword) {
  if (DU.gameflags.getFlag("kiba_question")) {
    DU.gameflags.deleteFlag("kiba_question")
  }
}

OnConvTriggers["start_courier"] = function(speaker,keyword) {
  var worldmap = maps.getMap("darkunknown");
  var npcs = worldmap.npcs.getAll();
  var courierexists = 0;
  $.each(npcs, function(idx,val) {
    if (val.getName() === "CourierGroup") { courierexists = 1; }
  });
  
  if (!courierexists) {
    var courier = localFactory.createTile("CourierGroup");
    worldmap.placeThing(45,111,courier);
    courier.setCurrentAI("CourierPath");
    DebugWrite("plot","Courier spawned.<br />");
  } else {
    DebugWrite("plot","Courier already exists.<br />");
  }
}

OnConvTriggers["jharden_teaches"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("jharden_teaches");
  DU.gameflags.deleteFlag("jharden_newspell");
  var taught = 0;
  if ((PC.getLevel() >= 2) && (!PC.knowsSpell(1,2))) {
    maintext.addText("Jharden teaches you Cure!");
    PC.addSpell(1,2);
    taught = 1;
  }
  if ((PC.getLevel() >= 3) && (!PC.knowsSpell(2,2))) {
    maintext.addText("Jharden teaches you Iron Flesh!");
    PC.addSpell(2,2);
    taught = 1;
  }
  if ((PC.getLevel() >= 4) && (!PC.knowsSpell(3,3))) {
    maintext.addText("Jharden teaches you Fireball!");
    PC.addSpell(3,3);
    taught = 1;
  }
  if ((PC.getLevel() >= 5) && (!PC.knowsSpell(4,1))) {
    maintext.addText("Jharden teaches you Blessing!");
    PC.addSpell(4,1);
    taught = 1;
  }
  if ((PC.getLevel() >= 6) && (!PC.knowsSpell(5,5))) {
    maintext.addText("Jharden teaches you Return!");
    PC.addSpell(5,5);
    taught = 1;
  }
  if ((PC.getLevel() >= 7) && (!PC.knowsSpell(6,4))) {
    maintext.addText('"This is a spell I have only just mastered myself!"');
    maintest.addText("Jharden teaches you Mass Curse!");
    PC.addSpell(6,4);
    taught = 1;
  }
  if ((PC.getLevel() >= 8) && (!PC.knowsSpell(6,6))) {
    maintext.addText('"This is a spell I have only just mastered myself!"');
    maintext.addText("Jharden teaches you Storm!");
    PC.addSpell(6,6);
    taught = 1;
  }
  if (!taught) {
    maintext.addText("Jharden has nothing to teach you.");
  }
}

OnConvTriggers["ash_teaches"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("ash_teaches");
  DU.gameflags.deleteFlag("ash_newspell");
  var taught = 0;
  if ((PC.getLevel() >= 3) && (!PC.knowsSpell(3,1))) {
    maintext.addText("Asharden teaches you Dispel!");
    PC.addSpell(3,1);
    taught = 1;
  }
  if ((PC.getLevel() >= 4) && (!PC.knowsSpell(4,2))) {
    maintext.addText("Asharden teaches you Blink!");
    PC.addSpell(4,2);
    taught = 1;
  }
  if ((PC.getLevel() >= 5) && (!PC.knowsSpell(5,7))) {
    maintext.addText("Asharden teaches you Summon Ally!");
    PC.addSpell(5,7);
    taught = 1;
  }
  if (!taught) {
    maintext.addText("Asharden has nothing to teach you.");
  }  
}

OnConvTriggers["open_bdc_gate"] = function(speaker,keyword) {
  DU.gameflags.setFlag("been_in_bdc",1);
  DU.gameflags.deleteFlag("open_bdc_gate");
  if (DU.gameflags.getFlag("bdc_gate_open")) { return; }
  DU.gameflags.setFlag("bdc_gate_open",1);
  
  Open_BDC_Gate(speaker.getHomeMap());
}

OnConvTriggers["place_mal"] = function(speaker,keyword) {
  var tile = speaker.getHomeMap().getTile(14,17);
  var shelf = tile.getTopFeature();
  if (shelf.getName() !== "MapsAndLegends") {
    shelf.setSearchYield(["MapsAndLegends"]);
  }
}

OnConvTriggers["place_tod"] = function(speaker,keyword) {
  var tile = speaker.getHomeMap().getTile(22,15);
  var shelf = tile.getTopFeature();
  if (shelf.getName() !== "ATreatiseOnDragons") {
    shelf.setSearchYield(["ATreatiseOnDragons"]);
  }
}

OnConvTriggers["sirius_book1"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("sirius_book1");
  var bookshelfLeft = localFactory.createTile("BookshelfLeft");
  var bookshelfRight = localFactory.createTile("BookshelfRight");
  var thismap = speaker.getHomeMap();
  thismap.placeThing(32,41,bookshelfLeft);
  thismap.placeThing(33,41,bookshelfRight);
  if (!PC.checkInventory("AdelusLetter")) {
    bookshelfLeft.setSearchYield(["AdelusLetter"]);
  }
  var lightsource = localFactory.createTile("TorchWest");
  thismap.placeThing(31,41,lightsource);
  
  DrawMainFrame("draw", thismap.getName(), PC.getx(), PC.gety());
}

OnConvTriggers["talked_shelaria"] = function(speaker,keyword) {
  StopMusic(nowplaying);
  nowplaying = DUPlayMusic("Lament");
}

OnConvTriggers["reset_music"] = function(speaker,keyword) {
  var song = speaker.getHomeMap().getMusic();
  StopMusic(nowplaying);
  nowplaying = DUPlayMusic(song);
}

OnConvTriggers["franklin_offered"] = function(speaker, keyword) {
  // grant karma only once
  if (!DU.gameflags.getFlag("franklin_karma")) {
    if (!DU.gameflags.getFlag("franklin_yn")) {  // flag is set if you are lying about being able to afford it 
      DU.gameflags.setFlag("karma", DU.gameflags.getFlag("karma")+1);
      DU.gameflags.deleteFlag("franklin_yn");
    }
    DU.gameflags.setFlag("franklin_karma",1);
  }
}
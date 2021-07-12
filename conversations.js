
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
  let flags_met;
  let necessary_item;
  let keep_talking = 0;
  if (!keyword) { keyword = "bye"; }
    
  keyword = keyword.toLowerCase();

  let checkkeyword = 1;
  let addtolog = { hasResponse: 1, flagsmet: "", itemsowned: ""};

  let re = /^[a-z]/;
  if (re.test(keyword)) { 
//    console.log("CONV: truncating keyword " + keyword);
    keyword = keyword.slice(0,6);
//    console.log("New keyword: " + keyword);
  }

  while (checkkeyword)  {
    flags_met = 1;
    if (!this.hasOwnProperty(keyword)) {
      keyword = "_confused";
      addtolog.hasResponse = 0;
    }
  
    let flags = this[keyword].flags;
    if (flags.hasOwnProperty("flags_met")) {
      if (flags.flags_met.indexOf("self_") !== -1) {
        let tmpflag = flags.flags_met.replace(/self_/, "");
        if (!speaker.flags[tmpflag]) { flags_met = 0; }
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
    if (flags.hasOwnProperty("has_condition")) {
      if (!PC.getSpellEffectsByName(flags.has_condition)) { flags_met = 0; }
      else { addtolog.flagsmet += " " + flags.has_condition; }
    }
    if (flags.hasOwnProperty("function_call")) {
      if (typeof ConvTestFlags[flags.function_call] === "function") {
        if (!ConvTestFlags[flags.function_call](speaker, keyword)) {
          flags_met = 0;
        } else { addtolog.flagsmet += " " + flags.function_call; }
      } else { flags_met = 0; }
    }
    if (flags.hasOwnProperty("between_times")) {
      let times = split("-",flags.between_times);
      if (!CheckTimeBetween(times[0],times[1])) { flags_met = 0; }
      else { addtolog.flagsmet += " " + flags.between_times; }
    }

    if (this[keyword].responses[flags_met].indexOf("->") != -1) {
      let holder = this[keyword].responses[flags_met];
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
  let triggers = this[keyword].triggers[flags_met];
  
  if (triggers.hasOwnProperty("give_item")) {
    let newitem = localFactory.createTile(triggers.give_item);
    PC.addToInventory(newitem,1);
    maintext.addText("<span class='sysconv'>You have obtained: " + newitem.getFullDesc() + ".</span>");
  }
  if (triggers.hasOwnProperty("take_item")) {
    let takeme = PC.checkInventory(triggers.take_item);
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
      let amt = Math.abs(triggers.give_gold);
      maintext.addText("<span class='sysconv'>You have lost: " + amt + " gold.</span>");
    }
    DrawCharFrame();
  }
  if (triggers.hasOwnProperty("give_karma")) {
    PC.diffKarma(parseInt(triggers.give_karma));
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
      let tmpflag = triggers.set_flag.replace(/unset_/, "");
      if (tmpflag.indexOf("self_") !== -1) {
        tmpflag = tmpflag.replace(/self_/, "");
        if (speaker.flags[tmpflag]) {
          delete speaker.flags[tmpflag];
        }
      } else {
        if (DU.gameflags.getFlag(tmpflag)) {
          DU.gameflags.deleteFlag(tmpflag);
        }
      }
    } else {
      if (triggers.set_flag.indexOf("self_") !== -1) {
        let tmpflag = triggers.set_flag.replace(/self_/, "");
        speaker.flags[tmpflag] = 1;
      } else {
        DU.gameflags.setFlag(triggers.set_flag, 1);
      }
    
      // special cases
      if (typeof OnConvTriggers[triggers.set_flag] === "function") {
        let modkeep = OnConvTriggers[triggers.set_flag](speaker,keyword);
        if (modkeep) { keep_talking = modkeep; }
      }

    } 
  }
  if (triggers.hasOwnProperty("questlog")) {
    let lognum = parseInt(triggers["questlog"]);
    questlog[lognum].activate();
  }
  if (triggers.hasOwnProperty("questcomp")) {
    let lognum = parseInt(triggers["questcomp"]);
    questlog[lognum].complete();
  }
  if (triggers.hasOwnProperty("end_convo")) {
    if ((triggers.end_convo !== 1) && (triggers.end_convo !== "1")) {
      this.say(speaker, triggers.end_convo);
    }
    maintext.addText(" ");
    if (keep_talking !== -1) {
      keep_talking = 0;
    }
  }
  if (triggers.hasOwnProperty("start_shop")) {
    if (HasStock(speaker.getMerch())) {
      let sell = DisplayWares(speaker);
    
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

    let selllist = [];
    selllist = GetSellBack(PC,speaker);
    
    if (selllist.length) {
      maintext.addText(" ");
      maintext.addText("This merchant will buy:");
      for (let i=0; i<selllist.length; i++) {
        maintext.addText(selllist[i]);
      }
    } else {
      let convo = targetCursor.talkingto.getConversation();
      maintext.addText(" ");
      let genderterms = targetCursor.talkingto.getGenderedTerms();
      maintext.addText("You have nothing " + genderterms.pronoun + " would like to buy.");
      let retval = PerformTalk(targetCursor.talkingto, convo, "bye");
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

  if ((keep_talking === 0) || (keep_talking === -1)) { HideTurnFrame(); }  
  return keep_talking;
  
}

Conversation.prototype.say = function(speaker, saywhat, skipahead) {
  let gterms = PC.getGenderedTerms();
  let pcname = PC.getPCName();
  let npcterms = speaker.getGenderedTerms();
  let npcname = speaker.getNPCName();
  
  saywhat = saywhat.replace(/=(\w+)=/g, "<span style='color:cyan'>$1</span>");
  saywhat = saywhat.replace(/%FORMAL%/g, gterms.formal);
  saywhat = saywhat.replace(/%TITLED%/g, gterms.titled);
  saywhat = saywhat.replace(/%NAME%/g, pcname);
  saywhat = saywhat.replace(/%BR%/g, "<br />");
  if (DU.gameflags.getFlag("knows_" + speaker.conversation)) {
    saywhat = saywhat.replace(/%MYNAME%/g, npcname); 
  } else {
    saywhat = saywhat.replace(/%MYNAME%/g, "the " + speaker.getDesc());
  }
  saywhat = saywhat.replace(/%MYREALNAME%/g, npcname);
  saywhat = saywhat.replace(/%PRONOUN%/g, gterms.pronoun);
  saywhat = saywhat.replace(/%POSSESSIVE%/g, gterms.possessive);
  saywhat = saywhat.replace(/%OBJ%/g, gterms.objective);
  saywhat = saywhat.replace(/%SIBLING%/g, gterms.sibling);
  saywhat = saywhat.replace(/%KIDDIE%/g, gterms.kiddie);
  saywhat = saywhat.replace(/%REFLEX%/g, gterms.reflexive);
  saywhat = saywhat.replace(/%SELF_PRONOUN%/g, npcterms.pronoun);
  saywhat = saywhat.replace(/%SYS%(.+?)%SYS%/g, "<span class='sysconv'>$1</span>");

  let diffspeak = /\@\w+/.exec(saywhat);
  if (diffspeak) {
    diffspeak = diffspeak.replace(/\@/, "");
    if (diffspeak === "me") {
      if (IsObjectVisibleOnScreen(speaker)) {
        ShowTurnFrame(speaker);
      } else {
        HideTurnFrame();
      }
    } else {
      let findme = FindNPCByName(diffspeak,speaker.getHomeMap());
      if (findme) {
        ShowTurnFrame(findme);
      } else {
        DebugWrite("all", "Conversation with " + speaker.getNPCName() + " failed to find conversation partner. Trying to say: " + saywhat + " .<br />");
      }
    }
  }
  
  let speech = saywhat.split("%%");
  let skipped = "";
  while (skipahead) {
    speech.shift();
    skipahead--;
    skipped = "<br />";
  }
  speech[0] = speech[0].charAt(0).toUpperCase() + speech[0].slice(1);
  maintext.addText(skipped + "<span class='conv'>" + speech[0] + "</span>");
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

function InnRoom(xc,yc,doors,innmap) {
  if (DU.gameflags.getFlag("music")) {
    StopMusic();
    DUPlayMusic("Lullaby", {fade:1});
  }
  if (!innmap) { console.log("Replace innmap with PC's map.");  innmap = PC.getHomeMap(); }
  maintext.setInputLine("&gt;");
  maintext.drawTextFrame();

  FadeOut();
  setTimeout(function() {
    maintext.addText("ZZZZZZ...");
    if (DU.gameflags.getFlag("music")) {
      QueueMusic(PC.getHomeMap().getMusic());
    }
    while(doors[0]) {
      let inndoor = innmap.getTile(doors[0],doors[1]);
      inndoor = inndoor.getTopFeature();
      if (inndoor.open) {
        inndoor.use(PC,1);
      }
      doors.shift();
      doors.shift();
    }
    let pcacre = PC.getHomeMap().getTile(PC.getx(1),PC.gety(1));
    pcacre.executeWalkoffs(PC);
    if (innmap !== PC.getHomeMap()) { 
      MoveBetweenMaps(PC,PC.getHomeMap(), innmap, xc, yc);
    } else {
      innmap.moveThing(xc,yc,PC);
    }
    let feapile = innmap.getTile(xc,yc).features.getAll();
    for (let i=0;i<feapile.length;i++) {
      if (feapile[i].getName() === "BedHead") { feapile[i].walkon(PC); break; }
    }
    DrawMainFrame("draw", PC.getHomeMap(), PC.getx(),PC.gety());
    PC.endTurn();
  }, 1500);

}

function OnConvTriggers() {};

OnConvTriggers["ash_password"] = function(speaker,keyword) {
  let door = PC.getHomeMap().getTile(25,21).getTopFeature();

  PC.getHomeMap().deleteThing(door);
  door = localFactory.createTile("Door");
  PC.getHomeMap().placeThing(25,21,door);
      
  // replicating a door's Use code without a user
  door.setGraphicArray(door.opengraphic);
  door.closedLOS = door.getBlocksLOSArray();
  let seethru = [];
  seethru[0] = 0;
  door.setBlocksLOSArray(seethru);
  door.addPassable(MOVE_WALK);
  DUPlaySound("sfx_open_door"); 
  door.open = 1;
			
  DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
  DU.gameflags.deleteFlag("ash_password");
  
  return;
}

OnConvTriggers["spellbook"] = function(speaker,keyword) {
  PC.addSpell(SPELL_LIGHT_LEVEL,SPELL_LIGHT_ID); 
  return;
}

OnConvTriggers["king_heal"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("king_heal");
  PC.healMe(1000);
  let effects = PC.getSpellEffects();
  if (effects) {
    for (let i=0; i<effects.length; i++) {
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

OnConvTriggers["hazel_cure"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("hazel_cure");
  let effects = PC.getSpellEffects();
  if (effects) {
    for (let i=0; i<effects.length; i++) {
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
    PC.setMaxMana(PC.getInt());
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

OnConvTriggers["inn_cl"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("inn_cl");
  if (PC.getGold() < 7) {
    maintext.addText("You don't have enough gold!");
    return 1;
  } else {
    PC.addGold(-7);
    let pronoun = "She";
    maintext.addText(pronoun + " takes you to your room.");
    InnRoom(23,17,[25,15,36,21]);
  }
  return -1;
}

OnConvTriggers["inn_20_y"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("inn_20_y");
  DU.gameflags.deleteFlag("inn_20");
  if (PC.getGold() < 5) {
    maintext.addText("You don't have enough gold!");
    return 1;
  } else {
    PC.addGold(-5);
    let pronoun = "He";
    if (speaker.getNPCName() === "Sand") { pronoun = "She"; }
    maintext.addText(pronoun + " leads you to your room.");
//    targetCursor.inndest = {x: 93, y: 38};
//    setTimeout(function() { InnRoom(93,38,[91,38,88,29]); }, 50);
    InnRoom(93,38,[91,38,88,29]);
  }
  return -1;
}

OnConvTriggers["inn_onyx_y"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("inn_onyx_y");
  DU.gameflags.deleteFlag("inn_onyx");
  if (PC.getGold() < 8) {
    maintext.addText("You don't have enough gold!");
    return 1;
  } else {
    PC.addGold(-8);
    maintext.addText("He leads you to your room.");
//    targetCursor.inndest = {x: 14, y: 11};
//    setTimeout(function() { InnRoom(14,11,[13,9,10,12]); }, 50);
    InnRoom(14,11,[13,9,10,12]);
  }
  return -1;
}

OnConvTriggers["inn_25"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("inn_25");
  delete speaker.flags["room"];

  let upstairs = maps.getMap("hildendain2");
  if (PC.getGold() < 10) {
    maintext.addText("You don't have enough gold!");
    return 1;
  } 
  PC.addGold(-10);
//  targetCursor.inndest = {x: 23, y: 40};
//  setTimeout(function() { InnRoom(23,40,[27,42], upstairs); }, 50);
  InnRoom(23,40,[27,42], upstairs);
  
  return -1;
}

OnConvTriggers["inn_beldskae"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("inn_beldskae");

  let upstairs = maps.getMap("beldskae2");
  PC.addGold(-50);
//  targetCursor.inndest = {x: 39, y: 13};
//  setTimeout(function() { InnRoom(39,13,[38,15], upstairs); }, 50);
  InnRoom(39,13,[38,15], upstairs);

  let roomdoor = PC.getHomeMap().getTile(32,25).getTopFeature();
  if (roomdoor.open) {
    roomdoor.use(PC,1);
  }
  return -1;
}

OnConvTriggers["gambling"] = function(speaker,keyword) {
  PerformGambling();
}

OnConvTriggers["health_kylee"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    CheckAllHealth();
  }
}

OnConvTriggers["health_garen"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    CheckAllHealth();
  }
}

OnConvTriggers["health_warren"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    CheckAllHealth();
  }
}

OnConvTriggers["health_dora"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("all_health")){
    CheckAllHealth();
  }
}

OnConvTriggers["shield_gotten"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("get_shield");
  DU.gameflags.deleteFlag("shield_gotten");
}

function CheckAllHealth() {
  if (DU.gameflags.getFlag("health_garen") && DU.gameflags.getFlag("health_kylee") && DU.gameflags.getFlag("health_warren") && DU.gameflags.getFlag("health_dora")) {
    DU.gameflags.setFlag("all_health", 1);
  }
}

OnConvTriggers["ash_get_book"] = function(speaker,keyword) {
  let ashmap = PC.getHomeMap(); // he has to be on the PC's map since they just talked to him
  let npcs = ashmap.npcs.getAll();
  let ash;
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getNPCName() === "Asharden") { ash = npcs[i]; }
  }
  if (!ash) { alert("Couldn't find Asharden to change his AI."); }
  else {
    ash.prevai = ash.getCurrentAI();
    ash.setCurrentAI("AshardenBook");
//    ash.setConversation("asharden_book");
    DebugWrite("plot", "Asharden's AI changes to AshardenBook.<br />");
  }        
}

OnConvTriggers["anna_return"] = function(speaker,keyword) {
  let annamap = PC.getHomeMap(); // she has to be on the PC's map since they just talked to her
  let npcs = annamap.npcs.getAll();
  let anna;
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getNPCName() === "Anna") { anna = npcs[i]; }
  }
  if (!anna) { alert("Couldn't find Anna to change her AI."); }
  else {
    anna.setSchedule("anna_leaves");
    anna.setCurrentScheduleIndex(0);
  }
}

OnConvTriggers["garrick_flipout"] = function(speaker,keyword) {
  let garrickmap = PC.getHomeMap();
  let npcs = garrickmap.npcs.getAll();
  let garrick;
  let aoife;
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getNPCName() === "Garrick") { garrick = npcs[i]; }
    if (npcs[i].getNPCName() === "Aoife") { aoife = npcs[i]; }
  }
  if (!garrick) { alert("Couldn't find Garrick to change his AI."); }
  else {
    garrick.setCurrentAI("GarrickAttack");
    DebugWrite("plot", "Garrick's AI changes to GarrickAttack.<br />");
    garrick.specials.unkillable = 1;
    garrick.setAttitude("enraged");
  }
  if (!aoife) { alert("Couldn't find Aoife to change her AI."); }
  else {
    aoife.setCurrentAI("AoifeAttack");
    DebugWrite("plot", "Aoife's AI changes to AoifeAttack.<br />");
    let mace = localFactory.createTile("Shortsword");
    aoife.addToInventory(mace,1);
    aoife.setWeapon(mace);  // no longer actually a mace
    aoife.setAttitude("defensive");
    aoife.specials.unkillable = 1;
    // to set her back, just reset to PeaceAI
  }
}

OnConvTriggers["chits_exchanged"] = function(speaker,keyword) {
  if (DU.gameflags.getFlag("exchange_chits")) {
    DU.gameflags.deleteFlag("exchange_chits");
  }
}

OnConvTriggers["kiba_rumor"] = function(speaker,keyword) {
  if (DU.gameflags.getFlag("kiba_question")) {
    DU.gameflags.deleteFlag("kiba_question");
  }
}

OnConvTriggers["franklin_karma"] = function(speaker,keyword) {
  DU.gameflags.setFlag("franklin_offered",1);
}

OnConvTriggers["franklin_debt_paid"] = function(speaker,keyword) {
  DU.gameflags.setFlag("franklin_debt_paid",DUTime.getGameClock());
}

OnConvTriggers["clear_gem_flags"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("clear_gem_flags");
  if (DU.gameflags.getFlag("cut_ruby")) {
    DU.gameflags.deleteFlag("cut_ruby");
  }
  if (DU.gameflags.getFlag("cut_small_ruby")) {
    DU.gameflags.deleteFlag("cut_small_ruby");
  }
  if (DU.gameflags.getFlag("cut_sapphire")) {
    DU.gameflags.deleteFlag("cut_sapphire");
  }
  if (DU.gameflags.getFlag("cut_gems")) {
    DU.gameflags.deleteFlag("cut_gems");
  }
}

OnConvTriggers["knows_horses"] = function(speaker,keyword) {
  DU.gameflags.setFlag("knows_feather",1);
  DU.gameflags.setFlag("knows_sunlight",1);
  DU.gameflags.setFlag("knows_emperor",1);
  DU.gameflags.setFlag("knows_graceful",1);
}

OnConvTriggers["knows_arlan"] = function(speaker,keyword) {
  DU.gameflags.setFlag("knows_elora",1);
}

OnConvTriggers["start_courier"] = function(speaker,keyword) {
  let worldmap = maps.getMap("darkunknown");
  let npcs = worldmap.npcs.getAll();
  let courierexists = 0;
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName() === "CourierGroup") { courierexists = 1; }
  }
  
  if (!courierexists) {
    let courier = localFactory.createTile("CourierGroup");
    worldmap.placeThing(45,111,courier);
    courier.setCurrentAI("CourierPath");
    DebugWrite("plot","Courier spawned.<br />");
  } else {
    DebugWrite("plot","Courier already exists.<br />");
  }
}

OnConvTriggers["teach_illusion"] = function(speaker,keyword) {
  if (DU.gameflags.getFlag("spellbook") && (PC.getLevel() >= 2) && (!PC.knowsSpell(SPELL_ILLUSION_LEVEL,SPELL_ILLUSION_ID))) {
    maintext.addText("Sirius teaches you Illusion!");
    PC.addSpell(SPELL_ILLUSION_LEVEL,SPELL_ILLUSION_ID);
  } else if (!DU.gameflags.getFlag("spellbook")) {
    maintext.addText('"Alas, you will need a spellbook, to properly learn."');
  } else if (PC.getLevel() === 1) {
    maintext.addText('"Alas, you may not yet be strong enough. Return when you have grown stronger!"');
  }
}

OnConvTriggers["learned_ww"] = function(speaker,keyword) {
  if (DU.gameflags.getFlag("spellbook") && (PC.getLevel() >= 2) && (!PC.knowsSpell(SPELL_WATER_WALK_LEVEL,SPELL_WATER_WALK_ID))) {
    maintext.addText("Ashbourne teaches you Water Walk!");
    PC.addSpell(SPELL_WATER_WALK_LEVEL,SPELL_WATER_WALK_ID);
  } else if (!DU.gameflags.getFlag("spellbook")) {
    maintext.addText('"Alas, you will need a spellbook, to properly learn. Though that makes me wonder however you got here..."');
    DU.gameflags.deleteFlag("learned_ww");
  } else if (PC.getLevel() === 1) {
    maintext.addText('"Alas, you may not yet be strong enough. Return when you have grown stronger!"');
    DU.gameflags.deleteFlag("learned_ww");
  }
}

OnConvTriggers["jharden_teaches"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("jharden_teaches");
  DU.gameflags.deleteFlag("jharden_newspell");
  let taught = 0;
  if ((PC.getLevel() >= 2) && (!PC.knowsSpell(SPELL_CURE_LEVEL,SPELL_CURE_ID))) {
    maintext.addText("Jharden teaches you Cure!");
    PC.addSpell(SPELL_CURE_LEVEL,SPELL_CURE_ID);
    taught = 1;
  }
  if ((PC.getLevel() >= 3) && (DU.gameflags.getFlag("spellbook2")) && (!PC.knowsSpell(SPELL_RETURN_LEVEL,SPELL_RETURN_ID))) {
    maintext.addText("Jharden teaches you Return!");
    PC.addSpell(SPELL_RETURN_LEVEL,SPELL_RETURN_ID);
    taught = 1;
  }
  if ((PC.getLevel() >= 4) && (DU.gameflags.getFlag("spellbook2")) && (!PC.knowsSpell(SPELL_FIREBALL_LEVEL,SPELL_FIREBALL_ID))) {
    maintext.addText("Jharden teaches you Fireball!");
    PC.addSpell(SPELL_FIREBALL_LEVEL,SPELL_FIREBALL_ID);
    taught = 1;
  }
  if ((PC.getLevel() >= 5) && (DU.gameflags.getFlag("spellbook2")) && (!PC.knowsSpell(SPELL_BLESSING_LEVEL,SPELL_BLESSING_ID))) {
    maintext.addText("Jharden teaches you Blessing!");
    PC.addSpell(SPELL_BLESSING_LEVEL,SPELL_BLESSING_ID);
    taught = 1;
  }
  if ((PC.getLevel() >= 6) && (DU.gameflags.getFlag("spellbook2")) && (!PC.knowsSpell(SPELL_PEER_LEVEL,SPELL_PEER_ID))) {
    maintext.addText("Jharden teaches you Peer!");
    PC.addSpell(SPELL_PEER_LEVEL,SPELL_PEER_ID);
    taught = 1;
  }
  if ((PC.getLevel() >= 7) && (DU.gameflags.getFlag("spellbook2")) && (!PC.knowsSpell(SPELL_MASS_CURSE_LEVEL,SPELL_MASS_CURSE_ID))) {
    maintext.addText('"This is a spell I have only just mastered myself!"');
    maintest.addText("Jharden teaches you Mass Curse!");
    PC.addSpell(SPELL_MASS_CURSE_LEVEL,SPELL_MASS_CURSE_ID);
    taught = 1;
  }
  if ((PC.getLevel() >= 8) && (DU.gameflags.getFlag("spellbook2")) && (!PC.knowsSpell(SPELL_STORM_LEVEL,SPELL_STORM_ID))) {
    maintext.addText('"This is a spell I have only just mastered myself!"');
    maintext.addText("Jharden teaches you Storm!");
    PC.addSpell(SPELL_STORM_LEVEL,SPELL_STORM_ID);
    taught = 1;
  }
  if (!taught) {
    maintext.addText("Jharden has nothing to teach you.");
  }
}

OnConvTriggers["ash_teaches"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("ash_teaches");
  DU.gameflags.deleteFlag("ash_newspell");
  let taught = 0;
  if ((PC.getLevel() >= 3) && (!PC.knowsSpell(SPELL_DISPEL_LEVEL,SPELL_DISPEL_ID))) {
    maintext.addText("Asharden teaches you Dispel!");
    PC.addSpell(SPELL_DISPEL_LEVEL,SPELL_DISPEL_ID);
    taught = 1;
  }
  if ((PC.getLevel() >= 4) && (!PC.knowsSpell(SPELL_BLINK_LEVEL,SPELL_BLINK_ID))) {
    maintext.addText("Asharden teaches you Blink!");
    PC.addSpell(SPELL_BLINK_LEVEL,SPELL_BLINK_ID);
    taught = 1;
  }
  if ((PC.getLevel() >= 5) && (!PC.knowsSpell(SPELL_SUMMON_ALLY_LEVEL,SPELL_SUMMON_ALLY_ID))) {
    maintext.addText("Asharden teaches you Summon Ally!");
    PC.addSpell(SPELL_SUMMON_ALLY_LEVEL,SPELL_SUMMON_ALLY_ID);
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
  let tile = speaker.getHomeMap().getTile(30,34);
  let shelf = tile.getTopFeature();
  if (shelf.getName() !== "MapsAndLegends") {
    shelf.setSearchYield(["MapsAndLegends"]);
  }
}

OnConvTriggers["place_tod"] = function(speaker,keyword) {
  let tile = speaker.getHomeMap().getTile(38,32);
  let shelf = tile.getTopFeature();
  if (shelf.getName() !== "ATreatiseOnDragons") {
    shelf.setSearchYield(["ATreatiseOnDragons"]);
  }
}

OnConvTriggers["sirius_book1"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("sirius_book1");
  let bookshelfLeft = localFactory.createTile("BookshelfLeft");
  let bookshelfRight = localFactory.createTile("BookshelfRight");
  let thismap = speaker.getHomeMap();
  thismap.placeThing(32,41,bookshelfLeft);
  thismap.placeThing(33,41,bookshelfRight);
  if (!PC.checkInventory("AdelusLetter")) {
    bookshelfLeft.setSearchYield(["AdelusLetter"]);
  }
  let lightsource = localFactory.createTile("TorchWest");
  thismap.placeThing(31,41,lightsource);
  
  DrawMainFrame("draw", thismap, PC.getx(), PC.gety());
}

OnConvTriggers["talked_shelaria"] = function(speaker,keyword) {
  if (DU.gameflags.getFlag("music")) {
//    StopMusic(nowplaying);
    DUPlayMusic("Lament", {fade:1});
  }
}

OnConvTriggers["rescued_sam"] = function(speaker,keyword) {
  speaker.setCurrentAI("Sam_escape");
}

OnConvTriggers["reset_music"] = function(speaker,keyword) {
  if (DU.gameflags.getFlag("music")) {
    let song = speaker.getHomeMap().getMusic();
//    StopMusic(nowplaying);
    DUPlayMusic(song, {fade:1});
  }
}

OnConvTriggers["franklin_offered"] = function(speaker, keyword) {
  // grant karma only once
  if (!DU.gameflags.getFlag("franklin_karma")) {
    if (!DU.gameflags.getFlag("franklin_yn")) {  // flag is set if you are lying about being able to afford it 
      PC.diffkarma(1);
      DU.gameflags.deleteFlag("franklin_yn");
    }
    DU.gameflags.setFlag("franklin_karma",1);
  }
}

OnConvTriggers["paladin_stage1"] = function(speaker,keyword) {
  DU.gameflags.setFlag("paladin_stage1", DUTime.getGameClock());
}

OnConvTriggers["give_tip"] = function(speaker,keyword) {
  gamestate.setMode("singlenumber");
  DU.gameflags.deleteFlag("give_tip");
  targetCursor.overrideMode = 1;
}

OnConvTriggers["kyvek_fetch"] = function(speaker,keyword) {
  speaker.setCurrentAI("Trevor");
}

OnConvTriggers["taran_serene"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("garden_wait");
}

OnConvTriggers["given_box"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("kyvek_fetch_incomplete");
}

OnConvTriggers["paladin_initiation"] = function(speaker,keyword) {
  DU.gameflags.setFlag("paladin_initiation_time", DUTime.getGameClock() + 120*.2);
  speaker.setCurrentAI("Isaac_initiate");
}

OnConvTriggers["chera_disappear"] = function(speaker,keyword) {
  let chera = FindNPCByName("Chera", speaker.getHomeMap());
  let cherax = chera.getx();
  let cheray = chera.gety();
  speaker.getHomeMap().deleteThing(chera);
  DU.gameflags.deleteFlag("chera_disappear");
  DrawMainFrame("one",speaker.getHomeMap(),cherax,cheray);
}

OnConvTriggers["don_disappear"] = function(speaker,keyword) {
  let don = FindNPCByName("Don", speaker.getHomeMap());
  let donx = don.getx();
  let dony = don.gety();
  speaker.getHomeMap().deleteThing(don);
  DU.gameflags.deleteFlag("don_disappear");
  DrawMainFrame("one",speaker.getHomeMap(),donx,dony);
}

OnConvTriggers["solved_pheran"] = function(speaker,keyword) {
  let themap = speaker.getHomeMap();
  let chera = FindNPCByName("Chera", themap);
  themap.deleteThing(chera);
  let olin = FindNPCByName("Olin", themap);
  themap.deleteThing(olin);
  let hylga = FindNPCByName("Hylga", themap);
  themap.deleteThing(hylga);
  DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
}

OnConvTriggers["where_king"] = function(speaker,keyword) {
  if (CheckTimeBetween("6:15","7:30")) {
    maintext.addText('"The King is at his morning meeting with the chancellor. He will soon make his way to the throne room."');
  } else if (CheckTimeBetween("7:31","12:00")) {
    maintext.addText('"Your father can be found in the throne room."');
  } else if (CheckTimeBetween("12:01","17:00")) {
    maintext.addText('"Your father can be found in the great hall."');
  } else if (CheckTimeBetween("17:01","19:00")) {
    maintext.addText('"Your father can be found in the throne room."');
  } else {
    maintext.addText('"The King has retired for the night."');
  }
  DU.gameflags.deleteFlag("where_king");
}

OnConvTriggers["where_queen"] = function(speaker,keyword) {
  if (CheckTimeBetween("6:15","7:30")) {
    maintext.addText('"She is here. But perhaps speak with her after our meeting."');
  } else if (CheckTimeBetween("7:31","11:20")) {
    maintext.addText('"Your mother is in her sitting room, behind the museum."');
  } else if (CheckTimeBetween("11:21","15:30")) {
    maintext.addText('"Your mother is in the throne room."');
  } else if (CheckTimeBetween("15:31","15:45")) {
    maintext.addText('"She should be on her way to the great hall."');  
  } else if (CheckTimeBetween("15:46","17:00")) {
    maintext.addText('"She is right here!"');
  } else if (CheckTimeBetween("17:01","17:30")) {
    maintext.addText('"Your mother is probably still in the great hall."');
  } else if (CheckTimeBetween("17:31","19:00")) {
    maintext.addText('"Your mother has retired upstairs."');
  } else {
    maintext.addText(`"She's here."`);
  }
  DU.gameflags.deleteFlag("where_queen");
}

OnConvTriggers["tyler_task"] = function(speaker,keyword) {
  PC.removeFromInventory("BeldskaeReport");
  PC.removeFromInventory("SwainhilReport");
  PC.removeFromInventory("ClearLakeReport");
  maintext.addText("<span class='sysconv'>You no longer have one: report from Clear Lake.</span>");
  maintext.addText("<span class='sysconv'>You no longer have one: report from Beldskae.</span>");
  maintext.addText("<span class='sysconv'>You no longer have one: report from Swainhil.</span>");
}

OnConvTriggers["BDC_open_gate"] = function(speaker,keyword) {
  let feas = speaker.getHomeMap().getTile(12,38).getFeatures();
  let gate;
  for (let i=0;i<feas.length;i++) {
    if (feas[i].getName() === "WallPortcullis") {
      gate = feas[i];
    }
  }
  gate.unlockMe();
  gate.use(speaker);
  DU.gameflags.deleteFlag("BDC_open_gate");
  DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
}

OnConvTriggers["infusion_learned"] = function(speaker,keyword) {
  PC.knowsInfusion = 1;
  maintext.addText("<span class='sysconv'>You have learned Infusion.</span>");
}

OnConvTriggers["give_arrow"] = function(speaker,keyword) {
  DU.gameflags.deleteFlag("give_arrow");
  let arrow = localFactory.createTile("BrokenArrow");
  arrow.break();
  PC.addToInventory(arrow,1);
  maintext.addText("<span class='sysconv'>Ladonna hands you a broken arrow.</span>");
}

OnConvTriggers["consolation_test"] = function(speaker,keyword) {
  Listener.createListener("OpenCons", "Spellcast", [], "consolation");
}

OnConvTriggers["enter_consolation"] = function(speaker,keyword) {
  let themap = speaker.getHomeMap();
  themap.moveThing(0,0,speaker);
  let moongate = localFactory.createTile("Moongate");
  moongate.destmap = "consolation";
  moongate.destx = 14;
  moongate.desty = 24;
  themap.placeThing(14,24,moongate);
  AnimateMoongate(moongate,0,"down",300,1,1);
  let field = themap.getTile(16,25).getTopFeature();
  themap.deleteThing(field);
  field = themap.getTile(17,25).getTopFeature();
  themap.deleteThing(field);
  DrawMainFrame("one",themap,16,25);
  DrawMainFrame("one",themap,17,25);
}

OnConvTriggers["prince_awake"] = function(speaker,keyword) {
  speaker.sleep = 1;
}

OnConvTriggers["cult_attack"] = function(speaker,keyword) {
  // add 2 imps, 2 cultists, and sfx destroy the walls
  let themap = speaker.getHomeMap();
  if (themap.getName() !== "Shadow3") { alert("Somehow on the wrong map- cult_attack"); }
  let imp1 = localFactory.createTile("ImpNPCTile");
  imp1.onDeath = "cult";
  themap.placeThing(15,16,imp1);
  let imp2 = localFactory.createTile("ImpNPCTile");
  imp2.onDeath = "cult";
  themap.placeThing(15,17,imp2);
  let cultist1 = localFactory.createTile("CultistNPCTile");
  cultist1.onDeath = "cult";
  themap.placeThing(16,16,cultist1);
  let cultist2 = localFactory.createTile("CultistNPCTile");
  cultist2.onDeath = "cult";
  themap.placeThing(16,17,cultist2);
  let rhys = FindNPCByname("Rhys",themap);
  rhys.setMaxHP(10000);
  rhys.setHP(10000); 
  Earthquake();
  let wall1 = themap.getTile(14,16).getTopFeature();
  let wall2 = themap.getTile(14,17).getTopFeature();
  themap.deleteThing(wall1);
  themap.deleteThing(wall2);
  DrawMainFrame("draw",themap,PC.getx(),PC.gety());
  DUPlaySound("sfx_earthquake");
  maintext.addText("With a strangely muted roar, the eastern wall collapses!");
}

OnConvTriggers["justice_teleport"] = function(speaker,keyword) {
  DUPlaySound("sfx_teleport");
  PC.returntox = PC.getx();
  PC.returntoy = PC.gety();
  PC.returntomap = PC.getHomeMap().getName();
  let newmap = new GameMap();
  if (maps.getMap("justice_battle")) {
    newmap = maps.getMap("justice_battle");
  } else {
    newmap = maps.addMap("justice_battle");
  }
  MoveBetweenMaps(PC,PC.getHomeMap(),newmap,7,9);		  
  DrawMainFrame("draw", newmap, PC.getx(), PC.gety());

}

OnConvTriggers["rhys_return"] = function(speaker,keyword) {
  PC.replaceTurnWith = function(who) {
    let rhys = localFactory.createTile("RangerVillagerNPC");
    rhys.setGraphic("305.gif");
    rhys.setConversation("rhys_group");
    rhys.setNPCName("Rhys");
    let bdcmap = who.getHomeMap();
    bdcmap.placeThing(28,35,rhys);

    FadeOut();
    gamestate.setMode("null");

    setTimeout(function() {
      let npcs=bdcmap.npcs.getAll();
      let lance;
      for (let i=0;i<npcs.length;i++) {
        if (npcs[i].getName() === "PrinceNPC") { lance = npcs[i]; }
      }
      bdcmap.moveThing(29,33,lance);
      bdcmap.moveThing(30,35,PC);
      DrawMainFrame("draw",bdcmap,PC.getx(),PC.gety());
      FadeIn();

      setTimeout(function() {
        PC.forcedTalk = rhys;
        delete PC.replaceTurnWith;
        PC.myTurn();
      }, 1500);
    }, 1500);
  }
}

OnConvTriggers["rhys_summoned"] = function(speaker,keyword) {
  PC.replaceTurnWith = function(who) {
    let bdcmap = who.getHomeMap();
    bdcmap.placeThing(28,35,rhys);

    FadeOut();
    gamestate.setMode("null");

    setTimeout(function() {
      let npcs=bdcmap.npcs.getAll();
      let lance, rhys;
      for (let i=0;i<npcs.length;i++) {
        if (npcs[i].getName() === "PrinceNPC") { lance = npcs[i]; }
        if (npcs[i].getName() === "Rhys") { lance = npcs[i]; }
      }
      bdcmap.moveThing(28,11,lance);
      bdcmap.moveThing(27,9,PC);
      bdcmap.moveThing(28,10,rhys);
      let door=bdcmap.getTile(29,13).getTopFeature();
      door.lockMe(2);
      DrawMainFrame("draw",bdcmap,PC.getx(),PC.gety());
      FadeIn();

      setTimeout(function() {
        delete PC.replaceTurnWith;
        PC.replaceTurnWith = function(who) {
          gamestate.setMode("anykey");
          targetCursor.command = "summon";
          targetCursor.phase = 1;
          maintext.addText("The three of you progress to the back room, sealing the door behind you, and stand in an arc around the pentagram.");
          maintext.setInputLine("[MORE]");
          maintext.drawTextFrame();

          delete PC.replaceTurnWith;
          return;
        }
        PC.myTurn();
      }, 1500);
    }, 1500);
  }
}


OnConvTriggers["rhys_moved"] = function(speaker,keyword) {
  let bdcmap = speaker.getHomeMap();
  let rhys = FindNPCByName("Rhys",bdcmap);
  rhys.setConversation("rhys_bdc");
  let lance = FindNPCByName("Prince Lance",bdcmap);
  delete lance.flags.closedoor;
  // In case he was summoned here while prepping to close a door. Means the door will hang open until map
  // unload, but no big deal.

  rhys.setSchedule("rhys");
  rhys.setPeaceAI("scheduled");
  let loc = DU.schedules["rhys"].getNPCLocationByTime(GetClockTime(), 1, 1, bdcmap);
  rhys.flags = loc.flags;

}

OnConvTriggers["guard_sent"] = function(speaker,keyword) {
  let olympus = maps.getMap("olympus1");
  let coll = FindNPCByName("Coll",olympus);
  if (coll) {
    olympus.deleteThing(coll);
    DUTime.removeEntityFrom(coll);
  }
  let coll2 = localFactory.createTile("GuardNPC");
  coll2.setNPCName("Coll");
  coll2.setConversation("coll2");
  olympus.placeThing(76,38,coll2);

}

OnConvTriggers["peter_caught"] = function(speaker,keyword) {
  let olympus = maps.getMap("olympus1");
  let peter = FindNPCByName("Peter",olympus);
  let petereffect = localFactory.createTile("RemovePeter");
  peter.addSpellEffect(petereffect);

  let basement = maps.getMap("olympus0");
  peter = FindNPCByName("Peter",basement);
  basement.moveThing(24,18,peter);
}

function ConvTestFlags() {};

ConvTestFlags["warren_close"] = function(speaker,keyword) {
  let warren;
  let garen;
  let npcs = speaker.getHomeMap().npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getNPCName() === "Warren") { warren = npcs[i]; }
    if (npcs[i].getNPCName() === "Garen") { garen = npcs[i]; }
  }
  if (warren && garen) {
    if (GetDistance(warren.getx(),warren.gety(),garen.getx(),garen.gety(),"square") <= 5) {
      return 1;
    }
  }
  return 0;
}

ConvTestFlags["in_stable"] = function(speaker,keyword) {
  if ((speaker.getx() >= 62) && (speaker.getx() <= 72) && (speaker.gety() >= 42) && (speaker.gety() <= 51)) { return 1; }

  return 0;
}

ConvTestFlags["in_prison"] = function(speaker,keyword) {
  if ((speaker.getx() >= 19) && (speaker.getx() <= 21) && (speaker.gety() >= 7) && (speaker.gety() <= 19)) { return 1; }
  return 0;
}

ConvTestFlags["in_garden"] = function(speaker,keyword) {
  if ((speaker.getx() >= 10) && (speaker.getx() <= 21) && (speaker.gety() >= 6) && (speaker.gety() <= 15)) { return 1; }

  return 0;
}

ConvTestFlags["is_arlan_asleep"] = function(speaker,keyword) {
  let arlan = FindNPCByName("Arlan",speaker.getHomeMap());
  if (arlan.flags.sleep === 1) { 
    arlan.flags.awakened = 1;
    arlan.setGraphicArray(["347.gif","","0","0"]);
    DrawMainFrame("one",PC.getHomeMap(),arlan.getx(),arlan.gety());
    return 1; 
  }

  return 0;
}

ConvTestFlags["is_elora_asleep"] = function(speaker,keyword) {
  let elora = FindNPCByName("Elora",speaker.getHomeMap());
  if (elora.flags.sleep === 1) { 
    elora.flags.awakened = 1;
    elora.setGraphicArray(["305.gif","","0","0"]);
    DrawMainFrame("one",PC.getHomeMap(),elora.getx(),elora.gety());
    return 1; 
  }

  return 0;
}

ConvTestFlags["need_another_scroll"] = function(speaker,keyword) {
  if (!DU.gameflags.getFlag("infinite_scroll")) { return 0; }  // you haven't gotten the first scroll yet
  if (PC.checkInventory("InfiniteScroll")) {  return 0; }  // you have a scroll
  if (DU.gameflags.getFlag("act2")) { return 0; }  // you've used the scroll
  let wildcard = PC.checkInventory("ScrollWildcard");  
  if (wildcard) {
    if ((wildcard.spelllevel === SPELL_NEGATE_MAGIC_LEVEL) && (wildcard.spellnum = GetSpellId(SPELL_NEGATE_MAGIC_ID))) { return 0; }
    // You have an infinite scroll aspected to Negate Magic
  }
  return 1;
}

ConvTestFlags["is_jennifer_nearby"] = function(speaker,keyword) {
  let poverty = speaker.getHomeMap();
  let jennifer = FindNPCByName("Jennifer",poverty);
  let brooke = FindNPCByName("Brooke",poverty);
  let jinroom = 0;
  let binroom = 0;
  if ((jennifer.getx() === 25) && ((jennifer.gety() === 26) || (jennifer.gety() === 28))) { 
    return 0; // jennifer is in bed 
  }
  if ((brooke.getx() === 25) && ((brooke.gety() === 26) || (brooke.gety() === 28))) { 
    return 0; // brooke is in bed 
  }
  if ((jennifer.getx() >= 20) && (jennifer.getx() <= 26) && (jennifer.gety() >= 24) && (jennifer.gety() <= 28)) {
    jinroom = 1;
  }
  if ((brooke.getx() >= 20) && (brooke.getx() <= 26) && (brooke.gety() >= 24) && (brooke.gety() <= 28)) {
    binroom = 1;
  }
  if (jinroom && binroom) { return 1; }
  if (!jinroom && !binroom && (GetDistance(jennifer.getx(),jennifer.gety(),brooke.getx(),brooke.gety() <= 3))) { return 1; }
  return 0;
}

ConvTestFlags["BDC_gate_open"] = function(speaker,keyword) {
  let feas = speaker.getHomeMap().getTile(12,38).getFeatures();
  let gate;
  for (let i=0;i<feas.length;i++) {
    if (feas[i].getName() === "WallPortcullis") {
      gate = feas[i];
    }
  }
  if (!gate.open) {
    return 1;
  }
  return 0;
}

ConvTestFlags["fixed_arrow"] = function(speaker,keyword) {
  let arrow = PC.checkInventory("BrokenArrow");
  if (arrow) {
    if (!arrow.broken) { return 1; }
  }
  return 0;
}

function SetAct2Convos(mapref) {
  if (DU.gameflags.getFlag("act2")) {
    let npcs = mapref.npcs.getAll();
    for (let i=0;i<npcs.length;i++){
      let convo = npcs[i].conversation;
      convo = convo + "_act2";
      if (conversations[convo]) {
        npcs[i].conversation = convo;
        console.log(convo);
      }
    }
  }
}

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
  var flags_met = 1;
  var necessary_item;
  var keep_talking = 0;
  if (!keyword) { keyword = "bye"; }
    
  keyword = keyword.toLowerCase();

  if (DU.gameflags.kiba_question) {
    delete DU.gameflags.kiba_question;
    // Kiba needed a third set of responses to some things, so when you are answering her
    // question prompt, the responses are set up from here instead.
    if (keyword === "kiba") {
      maintext.addText('Kiba laughs. "No, I think I\'d know in that case."');
      return 1;
    } else if ((keyword === "erin") || (keyword === "aaron") || (keyword === "alexis") || (keyword === "dave") || (keyword === "sarah") || (keyword === "rhiannon") || (keyword === "franklin") || (keyword === "aiofe")) {
      maintext.addText('Kiba considers the possibility. "No, I don\'t think so."');
      return 1;
    } else if (keyword === "anna") {
      if (DU.gameflags.anna_romance) {
        keyword = "_anna";
      } else {
        maintext.addText('Kiba considers. "I\m not sure..."');
        return 1;
      }
    } else {
      maintext.addText('"That doesn\'t really make sense."');
      return 1;
    }
  }

  
  if (!this.hasOwnProperty(keyword)) {
    keyword = "_confused";
  }
  
  var flags = this[keyword].flags;
  if (flags.hasOwnProperty("flags_met")) {
    if (!DU.gameflags[flags.flags_met]) { flags_met = 0; }  
  }
  if (flags.hasOwnProperty("has_item")) {
    necessary_item = PC.checkInventory(flags.has_item);
    if (!necessary_item) { flags_met = 0; }
  }
  
  if (this[keyword].responses[flags_met].indexOf("->") != -1) {
    var holder = this[keyword].responses[flags_met];
    holder = holder.replace(/\-\>/, "");
    keyword = holder;
    if (!this.hasOwnProperty(keyword)) {
      keyword = "_confused";
    }
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
    PC.addToInventory(localFactory.createTile(triggers.give_item),1);
  }
  if (triggers.hasOwnProperty("take_item")) {
    if (necessary_item) {
      PC.removeFromInventory(necessary_item);
    }
  }
  if (triggers.hasOwnProperty("give_gold")) {
    PC.addGold(parseInt(triggers.give_gold));
  }
  if (triggers.hasOwnProperty("give_karma")) {
    DU.gameflags["karma"] += parseInt(triggers.give_karma);
  }
  if (triggers.hasOwnProperty("yes_no")) {
    inputText.subcmd = "yn";
  }
  if (triggers.hasOwnProperty("set_flag")) {
    if (triggers.set_flag.indexOf("unset_") !== -1) {
      var tmpflag = triggers.set_flag.replace(/unset_/, "");
      if (DU.gameflags[tmpflag]) {
        delete DU.gameflags[tmpflag];
      }
    } else {
      DU.gameflags[triggers.set_flag] = 1;
    
      // special cases
      if (triggers.set_flag === "ash_password") {
        var door = PC.getHomeMap().getTile(25,21).getTopFeature();
        door.use = door.use_old;
        door.unlockMe();
      
        // replicating a door's Use code without a user
        door.setGraphicArray(door.opengraphic);
        door.closedLOS = door.getBlocksLOSArray();
        var seethru = [];
	  		seethru[0] = 0;
		  	door.setBlocksLOSArray(seethru);
			  door.addPassable(MOVE_WALK);
  			DUPlaySound("sfx_open_door"); 
	  		door.open = 1;
			
		  	DrawMainFrame("draw",door.getHomeMap().getName(),PC.getx(),PC.gety());
			  delete DU.gameflags[triggers.set_flag];
      } else if (triggers.set_flag === "spellbook") {
        PC.addSpell(1,GetSpellID(5)); 
        // spellbook starts with Light in it
      } else if (triggers.set_flag === "knows_samantha") {
        DU.gameflags["knows_samantha2"] = 1;
      } else if (triggers.set_flag === "king_heal") {
        delete DU.gameflags[triggers.set_flag];
        PC.healMe(1000);
        var effects = PC.getSpellEffects();
        if (effects) {
          for (var i=0; i<effects.length; i++) {
            if (effects[i].getName() === "Poison") {
              effects[i].endEffect();
            }
            if ((infused) && (effects[i].getName() === "Disease")) {
              effects[i].endEffect();
            }
          }
        }
        ShowEffect(PC, 1000, "spellsparkles-anim.gif", 0, COLOR_YELLOW);
        DrawCharFrame();
      } else if (triggers.set_flag === "train_int") {
        if (PC.gettp() === 0) {
          alert("Somehow training Int without any tp.");
        } else if ((PC.getBaseInt() < STAT_MAX) && (PC.gettp() > 0)) {
          PC.setBaseInt(PC.getBaseInt()+1);
          PC.settp(PC.gettp()-1);
          maintext.addText("Your intelligence is now " + PC.getInt());
        } else {
          maintext.addText("Your intelligence cannot be raised further by training.");
        }
        if (PC.gettp() === 0) {
          delete DU.gameflags["can_train"];
        }
        delete DU.gameflags[triggers.set_flag];
      } else if (triggers.set_flag === "train_dex") {
        if (PC.gettp() === 0) {
          alert("Somehow training Dex without any tp.");
        } else if ((PC.getBaseDex() < STAT_MAX) && (PC.gettp() > 0)) {
          PC.setBaseDex(PC.getBaseDex()+1);
          PC.settp(PC.gettp()-1);
          maintext.addText("Your dexterity is now " + PC.getDex());
        } else {
          maintext.addText("Your dexterity cannot be raised further by training.");
        }
        if (PC.gettp() === 0) {
          delete DU.gameflags["can_train"];
        }
        delete DU.gameflags[triggers.set_flag];
      } else if (triggers.set_flag === "train_str") {
        if (PC.gettp() === 0) {
          alert("Somehow training Str without any tp.");
        } else if ((PC.getBaseStr() < STAT_MAX) && (PC.gettp() > 0)) {
          PC.setBaseStr(PC.getBaseStr()+1);
          PC.settp(PC.gettp()-1);
          maintext.addText("Your strength is now " + PC.getStr());
        } else {
          maintext.addText("Your strength cannot be raised further by training.");
        }
        if (PC.gettp() === 0) {
          delete DU.gameflags["can_train"];
        }
        delete DU.gameflags[triggers.set_flag];
      } else if (triggers.set_flag === "inn_20_y") {
        delete DU.gameflags["inn_20_y"];
        delete DU.gameflags["inn_20"];
        if (PC.getGold() < 20) {
          maintext.addText("You don't have enough gold!");
        } else {
          keep_talking = -1;
          PC.addGold(-20);
          maintext.addText("He leads you to your room.");
          setTimeout(function() { InnRoom(28,17,[21,14,25,20]); }, 50);
        }
      } else if (triggers.set_flag === "inn_20_n") {
        delete DU.gameflags["inn_20_n"];
        delete DU.gameflags["inn_20"];
      } else if (triggers.set_flag === "give_100g_k") {
        delete DU.gameflags["give_100g_k"];
        DU.gameflags["debt_paid"] = 1;
        PC.addGold(100);
        DU.gameflags["karma"]++;
      } else if (!DU.gameflags["all_health"] && DU.gameflags["health_kyvek"] &&  DU.gameflags["health_daniel"] && DU.gameflags["health_kylee"] && DU.gameflags["health_garen"] && DU.gameflags["health_guard"] && DU.gameflags["health_amaeryl"] && DU.gameflags["health_warren"] && DU.gameflags["health_samuel"] && DU.gameflags["health_ingrid"]) {
        DU.gameflags["all_health"] = 1;    
      } else if (triggers.set_flag === "shield_gotten") {
        delete DU.gameflags["get_shield"];
        delete DU.gameflags["shield_gotten"];
      } else if (triggers.set_flag === "anna_return") {
        var annamap = PC.getHomeMap(); // she has to be on the PC's map since they just talked to her
        var npcs = annamap.npcs.getAll();
        var anna;
        $.each(npcs, function(idx,val) {
          if (val.getNPCName() === "Anna") { anna = val; }
        });
        if (!anna) { alert("Couldn't find Anna to change her AI."); }
        else {
          anna.setCurrentAI("AnnaLeaves");
          if (debug) { dbs.writeln("Anna's AI changes to AnnaLeaves.<br />"); }        
        }
      } else if (triggers.set_flag === "garrick_flipout") {
        var garrickmap = PC.getHomeMap();
        var npcs = garrickmap.npcs.getAll();
        var garrick;
        var aiofe;
        $.each(npcs, function(idx,val) {
          if (val.getNPCName() === "Garrick") { garrick = val; }
          if (val.getNPCName() === "Aiofe") { aiofe = val; }
        });
        if (!garrick) { alert("Couldn't find Garrick to change his AI."); }
        else {
          garrick.setCurrentAI("GarrickAttack");
          if (debug) { dbs.writeln("Garrick's AI changes to GarrickAttack.<br />"); }        
          garrick.setMaxHP(1030);
          garrick.setHP(1030);
          garrick.setAttitude("enraged");
        }
        if (!aiofe) { alert("Couldn't find Aiofe to change her AI."); }
        else {
          aiofe.setCurrentAI("FightGarrick");
          if (debug) { dbs.writeln("Aiofe's AI changes to FightGarrick.<br />"); }        
          var mace = localFactory.createTile("Mace");
          aiofe.addToInventory(mace);
          aiofe.setWeapon(mace);
          // to set her back, just reset to PeaceAI
        }
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
    var sell = DisplayWares(speaker);
    
    if (sell) {
      targetCursor.alreadyBought = {};
      keep_talking = 3; 
      // set up merchanting!
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
  
  saywhat = saywhat.replace(/=(\w+)=/g, "<span style='color:cyan'>$1</span>");
  saywhat = saywhat.replace(/%FORMAL%/g, gterms.formal);
  saywhat = saywhat.replace(/%TITLED%/g, gterms.titled);
  saywhat = saywhat.replace(/%NAME%/g, pcname);
  saywhat = saywhat.replace(/%PRONOUN%/g, gterms.pronoun);
  saywhat = saywhat.replace(/%POSSESSIVE%/g, gterms.possessive);
  saywhat = saywhat.replace(/%OBJ%/g, gterms.objective);
  saywhat = saywhat.replace(/%SIBLING%/g, gterms.sibling);
  saywhat = saywhat.replace(/%KIDDIE%/g, gterms.kiddie);
  saywhat = saywhat.replace(/%SELF_PRONOUN%/g, npcterms.pronoun);
  
  var speech = saywhat.split("%%");
  while (skipahead) {
    speech.shift();
    skipahead--;
  }
  speech[0] = speech[0].charAt(0).toUpperCase() + speech[0].slice(1);
  maintext.addText(speech[0]);
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
  var innmap = PC.getHomeMap();
  maintext.setInputLine("&gt;");
  maintext.drawTextFrame();
  
  $("#mainview").fadeOut(1500, function() {
    maintext.addText("ZZZZZZ...");
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
        PC.healMe(RollDice("20d5+20"));
        gamestate.setMode("player");
        PC.endTurn();
      });
    },1000);
  });

}
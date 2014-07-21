
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
  if (triggers.hasOwnProperty("set_flag")) {
    DU.gameflags[triggers.set_flag] = 1;
    
    // special cases
    if (triggers.set_flag === "ash_password") {
      var door = PC.getHomeMap().getTile(25,21).getTopFeature();
      door.use = door.use_old;
      door.unlockMe();
    }
  }
  if (triggers.hasOwnProperty("end_convo")) {
    if (triggers.end_convo !== 1) {
      this.say(speaker, triggers.end_convo);
    }
    keep_talking = 0;
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
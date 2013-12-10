
var conversations = {};  // directory of Conversations

function set_conversations() {

  conversations.castleguard1 = new Conversation();
  
  conversations.castleguard1["name"] = new ConvNode({}, "", "We do not give out our names while on duty.", [{}, {}]);
  conversations.castleguard1["_start"] = new ConvNode({ flags_met: "kingspeech" }, "Hail, %FORMAL% %NAME%! Your =father= the King wishes to speak with you.", "Greetings, %FORMAL% %NAME%.", [{}, {}]);
  conversations.castleguard1["job"] = new ConvNode({ flags_met: "kingspeech" }, "Surely that can wait. Your =father= awaits.", "We =guard= Castle Olympus.", [{}, {}]);
  conversations.castleguard1["_confused"] = new ConvNode({}, "", "Beg pardon?", [{}, {}]);
  conversations.castleguard1["father"] = new ConvNode( {flags_met: "kingspeech" }, "He is upstairs, upon his throne. Seek him!", "He is upstairs.", [{}, { end_convo: 1}]);
  conversations.castleguard1["king"] = conversations.castleguard1["father"];
  conversations.castleguard1["guard"] = new ConvNode( {}, "", "While we patrols these halls, no harm shall come to those within.", [{}, {}]);
  conversations.castleguard1["bye"] = new ConvNode({ flags_met: "kingspeech" }, "Hurry along!", "Stay out of trouble.", [{end_convo: 1}, {end_convo: 1}]);
}


// Required keywords: NAME, JOB, BYE, _START, _CONFUSED
// metacharacters: =foo= means display foo in blue (because it is a valid keyword)
//                 %% is a paragraph break
function Conversation() {
  
}
Conversation.prototype = new Object();

Conversation.prototype.respond = function(keyword, skipahead) { 
  if (!skipahead) { skipahead = 0; }
  var flags_met = 1;
  var necessary_item;
  var keep_talking = 0;
  keyword = keyword.toLowerCase();
  
  if (!this.hasOwnProperty(keyword)) {
    keyword = "_confused";
  }
  //WORK HERE ON FLAGS
  var flags = this[keyword].flags;
  if (flags.hasOwnProperty("flag_set")) {
    if (!DU.gameflags[flags.flag_set]) { flags_met = 0; }  
  }
  if (flags.hasOwnProperty("has_item")) {
    necessary_item = PC.checkInventory(flags.has_item);
    if (!necessary_item) { flags_met = 0; }
  }
  keep_talking = this.say(this[keyword].responses[flags_met], skipahead);
  if (keep_talking === 2) { 
    targetCursor.keyword = keyword;
    return keep_talking; 
  }  // don't execute end of response triggers until actually at end of response
  
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
  }
  if (triggers.hasOwnProperty("end_convo")) {
    keep_talking = 0;
  }
  
  return keep_talking;
  
}

Conversation.prototype.say = function(saywhat, skipahead) {
  var gterms = PC.getGenderedTerms();
  var pcname = PC.getPCName();
  
  saywhat = saywhat.replace(/=(\w+)=/g, "<span style='color:blue'>$1</span>");
  saywhat = saywhat.replace(/%FORMAL%/g, gterms.formal);
  saywhat = saywhat.replace(/%TITLED%/g, gterms.titled);
  saywhat = saywhat.replace(/%NAME%/g, pcname);
  saywhat = saywhat.replace(/%PRONOUN%/g, gterms.pronoun);
  saywhat = saywhat.replace(/%POSSESSIVE%/g, gterms.possessive);
  saywhat = saywhat.replace(/%OBJ%/g, gterms.objective);
  
  var speech = saywhat.split("%%");
  while (skipahead) {
    speech.shift();
    skipahead--;
  }
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

function ConvNode(flags, noflag_response, flag_response, triggers) {
  this.flags = flags;
  this.responses = [ noflag_response, flag_response ] ;  
  this.triggers = triggers;
}
ConvNode.prototype = new Object();

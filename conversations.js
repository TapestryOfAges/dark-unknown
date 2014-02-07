
var conversations = {};  // directory of Conversations

function set_conversations() {

  conversations.castleguard1 = new Conversation();
  
  conversations.castleguard1["name"] = new ConvNode({}, "", '"We do not give out our names while on duty."', [{}, {}]);
  conversations.castleguard1["_start"] = new ConvNode({ flags_met: "kingspeech" }, '"Hail, %FORMAL% %NAME%! Your =father= the King wishes to speak with you."', '"Greetings, %FORMAL% %NAME%."', [{}, {}]);
  conversations.castleguard1["job"] = new ConvNode({ flags_met: "kingspeech" }, '"Surely that can wait. Your =father= awaits."', '"We =guard= Castle Olympus."', [{}, {}]);
  conversations.castleguard1["_confused"] = new ConvNode({}, "", "Beg pardon?", [{}, {}]);
  conversations.castleguard1["father"] = new ConvNode( {flags_met: "kingspeech" }, '"He is within, upon his throne. Seek him!"', '"He is within."', [{}, { end_convo: 1}]);
  conversations.castleguard1["throne"] = new ConvNode( {}, "", "Straight ahead through there.", [{}, {}]);
  conversations.castleguard1["king"] = conversations.castleguard1["father"];
  conversations.castleguard1["guard"] = new ConvNode( {}, "", '"While we patrols these halls, no harm shall come to those within."', [{}, {}]);
  conversations.castleguard1["bye"] = new ConvNode({ flags_met: "kingspeech" }, '"Hurry along!"', '"Stay out of trouble."', [{end_convo: "%SELF_PRONOUN% waves you onward."}, {end_convo: 1}]);
  
  conversations.king = new Conversation();
  conversations.king["name"] = new ConvNode({}, "", '"While a king should usually demand a certain formality, even here you can just call me father."', [{}, {}]);
  conversations.king["_start"] = new ConvNode({ flags_met: "kingspeech" }, '"Thank you, %NAME%, for coming so quickly. Your brother has finally taken that step too far and now he must be dealt with.%%He has raised himself a castle and declared himself to be in rebellion, and so it is with a heavy heart that I say that he is no longer my heir.%%That title passes to you, my %KIDDIE%, who has remained steadfast. But now I must charge you with this duty."', '', [{set_flag: "kingspeech"}, {}]);
  
}


// Required keywords: NAME, JOB, BYE, _START, _CONFUSED
// metacharacters: =foo= means display foo in blue (because it is a valid keyword)
//                 %% is a paragraph break
function Conversation() {
  
}
Conversation.prototype = new Object();

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
  }
  if (triggers.hasOwnProperty("end_convo")) {
    if (triggers.end_convo !== 1) {
      this.say(speaker, triggers.end_convo);
    }
    keep_talking = 0;
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

function ConvNode(flags, noflag_response, flag_response, triggers) {
  this.flags = flags;
  this.responses = [ noflag_response, flag_response ] ;  
  this.triggers = triggers;
}
ConvNode.prototype = new Object();

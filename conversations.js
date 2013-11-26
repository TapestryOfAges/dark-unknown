
var conversations = {};  // directory of Conversations

conversations.castleguard1 = new Conversation();

conversations.castleguard1.name = new ConvNode({}, "", "We do not give out our names while on duty.", {});



// Required keywords: NAME, JOB, BYE, _START, _CONFUSED
function Conversation() {
  
}
Conversation.prototype = new Object();

// Permitted flags: flag_set -- checks DU.gameflags to see if a flag has been set
//                  has_item -- checks PC inventory

// Permitted triggers: end_convo -- conversation ends after response given
//                     give_item, take_item -- alter the PC inventory

function ConvNode(flags, noflag_response, flag_response, triggers) {
  this.flags = flags;
  this.responses = [ noflag_response, flag_response ] ;  
  this.triggers = triggers;
}
ConvNode.prototype = new Object();

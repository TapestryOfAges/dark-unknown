
var conversations = {};  // directory of Conversations

function set_conversations() {

  conversations.castleguard1 = new Conversation();
  
  conversations.castleguard1["name"] = new ConvNode({}, "", '"We do not give out our names while on duty."', [{}, {}]);
  conversations.castleguard1["_start"] = new ConvNode({ flags_met: "kingspeech" }, '"Hail, %FORMAL% %NAME%! Your =father= the King wishes to speak with you."', '"Greetings, %FORMAL% %NAME%."', [{}, {}]);
  conversations.castleguard1["job"] = new ConvNode({ flags_met: "kingspeech" }, '"Surely that can wait. Your =father= awaits."', '"We =guard= Castle Olympus."', [{}, {}]);
  conversations.castleguard1["_confused"] = new ConvNode({}, "", '"Beg pardon?"', [{}, {}]);
  conversations.castleguard1["father"] = new ConvNode( {flags_met: "kingspeech" }, '"He is within, upon his throne. Seek him!"', '"He is within."', [{}, { end_convo: 1}]);
  conversations.castleguard1["throne"] = new ConvNode( {}, "", '"Straight ahead through there."', [{}, {}]);
  conversations.castleguard1["king"] = conversations.castleguard1["father"];
  conversations.castleguard1["guard"] = new ConvNode( {}, "", '"While we patrols these halls, no harm shall come to those within."', [{}, {}]);
  conversations.castleguard1["bye"] = new ConvNode({ flags_met: "kingspeech" }, '"Hurry along!"', '"Stay out of trouble."', [{end_convo: "%SELF_PRONOUN% waves you onward."}, {end_convo: 1}]);
  conversations.castleguard1._location = "Castle Olympus";
  
  conversations.king = new Conversation();
  conversations.king["name"] = new ConvNode({}, "", '"While a king should usually demand a certain formality, even here you can just call me father."', [{}, {}]);
  conversations.king["_confused"] = new ConvNode({}, "", '"I\'m sorry, what was that?"', [{}, {}]);
  conversations.king["_start"] = new ConvNode({ flags_met: "kingspeech" }, '"Thank you, %NAME%, for coming so quickly. Your brother has finally taken that step too far and now he must be dealt with.%%He has raised himself a castle and declared himself to be in rebellion, and so it is with a heavy heart that I say that he is no longer my heir.%%That title passes to you, my %KIDDIE%, who has remained steadfast. But now I must charge you with this =duty=."', '', [{set_flag: "kingspeech"}, {}]);
  conversations.king["bye"] = new ConvNode({}, "", '"Travel well!"', [{}, {}]);
  conversations.king._location = "Castle Olympus";
  
  conversations.erin = new Conversation();
  conversations.erin["name"] = new ConvNode({}, "", '"You can call me Erin."', [{}, {}]);
  conversations.erin["_start"] = new ConvNode({}, "", 'She nods at you.', [{}, {}]);
  conversations.erin["_confused"] = new ConvNode({}, "", '"Hmm?"', [{}, {}]);
  conversations.erin["buy"] = new ConvNode({}, "", '"What would you like?"', [{}, {start_shop: 1}]);
  conversations.erin["sell"] = new ConvNode({}, "", '"What have you got?"', [{}, {start_sell: 1}]);
  conversations.erin["bye"] = new ConvNode({}, "", '"Come back soon!"', [{}, {end_convo: 1}]);
  conversations.erin._location = "Gauntlet";

  conversations.alexis = new Conversation();
  conversations.alexis["name"] = new ConvNode({}, "", '"I am Alexis."', [{}, {}]);
  conversations.alexis["_start"] = new ConvNode({}, "", '"Good day to you."', [{}, {}]);
  conversations.alexis["_confused"] = new ConvNode({}, "", '"What?"', [{}, {}]);
  conversations.alexis["buy"] = new ConvNode({}, "", '', [{}, {start_shop: 1}]);
  conversations.alexis["_startbuy"] = new ConvNode({}, "", '"I can teach these spells."', [{}, {}]);
  conversations.alexis["_knowsall"] = new ConvNode({}, "", '"You have already learned everything I have to teach!"', [{}, {}]);
  conversations.alexis["bye"] = new ConvNode({}, "", '"Good day!"', [{}, {end_convo: 1}]);
  conversations.alexis._location = "Gauntlet";
}


// Required keywords: NAME, JOB, BYE, _START, _CONFUSED
// metacharacters: =foo= means display foo in blue (because it is a valid keyword)
//                 %% is a paragraph break

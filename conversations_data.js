
var conversations = {};  // directory of Conversations

function set_conversations() {

  var serialconv = '{"castleguard1":{"name":{"flags":{},"responses":["","\\"We do not give out our names while on duty.\\""],"triggers":[{},{}]},"_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Hail, %FORMAL% %NAME%! Your =father= the King wishes to speak with you.\\"","\\"Greetings, %FORMAL% %NAME%.\\""],"triggers":[{},{}]},"job":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Surely that can wait. Your =father= awaits.\\"","\\"We =guard= Castle Olympus.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Beg pardon?\\""],"triggers":[{},{}]},"father":{"flags":{"flags_met":"kingspeech"},"responses":["\\"He is within, upon his throne. Seek him!\\"","\\"He is within.\\""],"triggers":[{},{"end_convo":1}]},"throne":{"flags":{},"responses":["","\\"Straight ahead through there.\\""],"triggers":[{},{}]},"king":{"flags":{"flags_met":"kingspeech"},"responses":["\\"He is within, upon his throne. Seek him!\\"","\\"He is within.\\""],"triggers":[{},{"end_convo":1}]},"guard":{"flags":{},"responses":["","\\"While we patrols these halls, no harm shall come to those within.\\""],"triggers":[{},{}]},"bye":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Hurry along!\\"","\\"Stay out of trouble.\\""],"triggers":[{"end_convo":"%SELF_PRONOUN% waves you onward."},{"end_convo":1}]},"_location":"Castle Olympus"},"king":{"name":{"flags":{},"responses":["","\\"While a king should usually demand a certain formality, even here you can just call me father.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"I\'m sorry, what was that?\\""],"triggers":[{},{}]},"_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Thank you, %NAME%, for coming so quickly. Your brother has finally taken that step too far and now he must be dealt with.%%He has raised himself a castle and declared himself to be in rebellion, and so it is with a heavy heart that I say that he is no longer my heir.%%That title passes to you, my %KIDDIE%, who has remained steadfast. But now I must charge you with this =duty=.\\"",""],"triggers":[{"set_flag":"kingspeech"},{}]},"bye":{"flags":{},"responses":["","\\"Travel well!\\""],"triggers":[{},{}]},"_location":"Castle Olympus"},"erin":{"name":{"flags":{},"responses":["","\\"You can call me Erin.\\""],"triggers":[{},{}]},"_start":{"flags":{},"responses":["","She nods at you."],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Hmm?\\""],"triggers":[{},{}]},"buy":{"flags":{},"responses":["","\\"What would you like?\\""],"triggers":[{},{"start_shop":1}]},"sell":{"flags":{},"responses":["","\\"What have you got?\\""],"triggers":[{},{"start_sell":1}]},"bye":{"flags":{},"responses":["","\\"Come back soon!\\""],"triggers":[{},{"end_convo":1}]},"_location":"Gauntlet"},"alexis":{"name":{"flags":{},"responses":["","\\"I am Alexis.\\""],"triggers":[{},{}]},"_start":{"flags":{},"responses":["","\\"Good day to you.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"What?\\""],"triggers":[{},{}]},"buy":{"flags":{},"responses":["",""],"triggers":[{},{"start_shop":1}]},"_startbuy":{"flags":{},"responses":["","\\"I can teach these spells.\\""],"triggers":[{},{}]},"_knowsall":{"flags":{},"responses":["","\\"You have already learned everything I have to teach!\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"Good day!\\""],"triggers":[{},{"end_convo":1}]},"_location":"Gauntlet"}}'; 

  var parsed_conversations = JSON.parse(serialconv);
  $.each(parsed_conversations, function(idx,val) {
    conversations[idx] = new Conversation();
    $.each(val, function(idx2, val2) {
      conversations[idx][idx2] = val2;
    });
  });
  
}

function old_set_conversations() {

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


var conversations = {};  // directory of Conversations

function set_conversations() {

//  var serialconv = '{"castleguard1":{"name":{"flags":{},"responses":["","\\"We do not give out our names while on duty.\\""],"triggers":[{},{}]},"_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Hail, %FORMAL% %NAME%! Your =father= the King wishes to speak with you.\\"","\\"Greetings, %FORMAL% %NAME%.\\""],"triggers":[{},{}]},"job":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Surely that can wait. Your =father= awaits.\\"","\\"We =guard= Castle Olympus.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Beg pardon?\\""],"triggers":[{},{}]},"father":{"flags":{"flags_met":"kingspeech"},"responses":["\\"He is within, upon his throne. Seek him!\\"","\\"He is within.\\""],"triggers":[{},{"end_convo":1}]},"throne":{"flags":{},"responses":["","\\"Straight ahead through there.\\""],"triggers":[{},{}]},"king":{"flags":{"flags_met":"kingspeech"},"responses":["\\"He is within, upon his throne. Seek him!\\"","\\"He is within.\\""],"triggers":[{},{"end_convo":1}]},"guard":{"flags":{},"responses":["","\\"While we patrols these halls, no harm shall come to those within.\\""],"triggers":[{},{}]},"bye":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Hurry along!\\"","\\"Stay out of trouble.\\""],"triggers":[{"end_convo":"%SELF_PRONOUN% waves you onward."},{"end_convo":1}]},"_location":"Castle Olympus"},"king":{"name":{"flags":{},"responses":["","\\"While a king should usually demand a certain formality, even here you can just call me father.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"I\'m sorry, what was that?\\""],"triggers":[{},{}]},"_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Thank you, %NAME%, for coming so quickly. Your brother has finally taken that step too far and now he must be dealt with.%%He has raised himself a castle and declared himself to be in rebellion, and so it is with a heavy heart that I say that he is no longer my heir.%%That title passes to you, my %KIDDIE%, who has remained steadfast. But now I must charge you with this =duty=.\\"",""],"triggers":[{"set_flag":"kingspeech"},{}]},"bye":{"flags":{},"responses":["","\\"Travel well!\\""],"triggers":[{},{}]},"_location":"Castle Olympus"},"erin":{"name":{"flags":{},"responses":["","\\"You can call me Erin.\\""],"triggers":[{},{}]},"_start":{"flags":{},"responses":["","She nods at you."],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Hmm?\\""],"triggers":[{},{}]},"buy":{"flags":{},"responses":["","\\"What would you like?\\""],"triggers":[{},{"start_shop":1}]},"sell":{"flags":{},"responses":["","\\"What have you got?\\""],"triggers":[{},{"start_sell":1}]},"bye":{"flags":{},"responses":["","\\"Come back soon!\\""],"triggers":[{},{"end_convo":1}]},"_location":"Gauntlet"},"alexis":{"name":{"flags":{},"responses":["","\\"I am Alexis.\\""],"triggers":[{},{}]},"_start":{"flags":{},"responses":["","\\"Good day to you.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"What?\\""],"triggers":[{},{}]},"buy":{"flags":{},"responses":["",""],"triggers":[{},{"start_shop":1}]},"_startbuy":{"flags":{},"responses":["","\\"I can teach these spells.\\""],"triggers":[{},{}]},"_knowsall":{"flags":{},"responses":["","\\"You have already learned everything I have to teach!\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"Good day!\\""],"triggers":[{},{"end_convo":1}]},"_location":"Gauntlet"}}'; 
var serialconv = '{"castleguard1":{"name":{"flags":{},"responses":["","\\"We do not give out our names while on duty.\\""],"triggers":[{},{}]},"_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Hail, %FORMAL% %NAME%! Your =father= the King wishes to speak with you.\\"","\\"Greetings, %FORMAL% %NAME%.\\""],"triggers":[{},{}]},"job":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Surely that can wait. Your =father= awaits.\\"","\\"We =guard= Castle Olympus.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Beg pardon?\\""],"triggers":[{},{}]},"father":{"flags":{"flags_met":"kingspeech"},"responses":["\\"He is within, upon his throne. Seek him!\\"","\\"He is within.\\""],"triggers":[{},{"end_convo":1}]},"throne":{"flags":{},"responses":["","\\"Straight ahead through there.\\""],"triggers":[{},{}]},"king":{"flags":{"flags_met":"kingspeech"},"responses":["\\"He is within, upon his throne. Seek him!\\"","\\"He is within.\\""],"triggers":[{},{"end_convo":1}]},"guard":{"flags":{},"responses":["","\\"While we patrols these halls, no harm shall come to those within.\\""],"triggers":[{},{}]},"bye":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Hurry along!\\"","\\"Stay out of trouble.\\""],"triggers":[{"end_convo":"%SELF_PRONOUN% waves you onward."},{"end_convo":1}]},"_location":"Castle Olympus"},"king":{"name":{"flags":{},"responses":["","\\"While a king should usually demand a certain formality, even here you can just call me father.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"I\'m sorry, what was that?\\""],"triggers":[{},{}]},"_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Thank you, %NAME%, for coming so quickly. Your =brother= has finally taken that step too far and now he must be dealt with.%%He has raised himself a castle and declared himself to be in rebellion, and so it is with a heavy heart that I say that he is no longer my heir.%%That title passes to you, my %KIDDIE%, who has remained steadfast. But now I must charge you with this =duty=.\\"","\\"Welcome back, %NAME%. What can I do for you?\\""],"triggers":[{"set_flag":"kingspeech"},{}]},"bye":{"flags":{},"responses":["","\\"Travel well!\\""],"triggers":[{},{}]},"_location":"Castle Olympus","job":{"flags":{},"responses":["","\\"I rule over these wide lands as well as I know how.\\""],"triggers":[{},{}]},"duty":{"flags":{},"responses":["","\\"I charge you with the preservation of the kingdom. Prove your worthiness to stand as my heir; go and see to an end to this rebellion.\\"%%\\"But, do so not as a %FORMAL%- go forth in =disguise=, if you will. If you can solve this crisis without the resources of a %FORMAL%, you will truly be worthy.\\""],"triggers":[{},{}]},"disguise":{"flags":{},"responses":["","\\"Go forth, as %NAME%, not as %FORMAL% %NAME%. Get to know the people. And bring your brother back from the brink.\\""],"triggers":[{},{}]},"heal":{"flags":{},"responses":["","\\"Vas Mani!\\" Your father heals your wounds."],"triggers":[{},{"set_flag":"king_heal"}]},"health":{"flags":{},"responses":["","\\"Vas Mani!\\" Your father heals your wounds."],"triggers":[{},{"set_flag":"king_heal"}]},"brother":{"flags":{},"responses":["","\\"He seeks to replace my rule with his own. The city of =Onyx= has sworn to him, and soon I fear his forces will be at our gates.\\""],"triggers":[{},{}]}},"erin":{"name":{"flags":{},"responses":["","\\"You can call me Erin.\\""],"triggers":[{},{"set_flag":"knows_erin"}]},"_start":{"flags":{},"responses":["","She nods at you."],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Hmm?\\""],"triggers":[{},{}]},"buy":{"flags":{},"responses":["","\\"What would you like?\\""],"triggers":[{},{"start_shop":1}]},"sell":{"flags":{},"responses":["","\\"What have you got?\\""],"triggers":[{},{"start_sell":1}]},"bye":{"flags":{},"responses":["","\\"Come back soon!\\""],"triggers":[{},{"end_convo":1}]},"_location":"Gauntlet","job":{"flags":{},"responses":["","\\"I sell armor.\\""],"triggers":[{},{}]}},"alexis":{"name":{"flags":{},"responses":["","\\"I am Alexis.\\""],"triggers":[{},{"set_flag":"knows_alexis"}]},"_start":{"flags":{},"responses":["","\\"Good day to you.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"What?\\""],"triggers":[{},{}]},"buy":{"flags":{},"responses":["",""],"triggers":[{},{"start_shop":1}]},"_startbuy":{"flags":{},"responses":["","\\"I can teach these spells.\\""],"triggers":[{},{}]},"_knowsall":{"flags":{},"responses":["","\\"You have already learned everything I have to teach!\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"Good day!\\""],"triggers":[{},{"end_convo":1}]},"_location":"Gauntlet","job":{"flags":{},"responses":["","\\"I run the magic shop here in Gauntlet.\\""],"triggers":[{},{}]}},"ash_door":{"_location":"Ashardens Tower","_start":{"flags":{},"responses":["","As you reach for the handle, the door speaks! \\"Yes, hello? No, I won\'t =open=.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"I am but a simple door. I don\'t understand.\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"See you around! Except that I can\'t really see...\\""],"triggers":[{},{"end_convo":"The door falls silent."}]},"knocker":{"flags":{},"responses":["","The door sounds pleased. \\"Oh, you like them?\\""],"triggers":[{},{}]},"knockers":{"flags":{},"responses":["","The door sounds pleased. \\"Oh, you like them?\\""],"triggers":[{},{}]},"name":{"flags":{},"responses":["","\\"I don\'t think I have one, actually!\\""],"triggers":[{},{}]},"job":{"flags":{},"responses":["","\\"=Open= and close, close and open. But only where my =master= bids.\\""],"triggers":[{},{}]},"master":{"flags":{},"responses":["","\\"Master Asharden, master of magics. It is rare that he wishes to be disturbed.\\""],"triggers":[{},{}]},"open":{"flags":{},"responses":["","\\"I may not open for you, unless you speak the word that tells me what you =seek=.\\""],"triggers":[{},{}]},"seek":{"flags":{},"responses":["","\\"Do you know what it is you seek? If not, return when you do!\\""],"triggers":[{},{}]},"magic":{"flags":{},"responses":["","\\"To seek magic is well and good, but not enough.\\""],"triggers":[{},{}]},"dreams":{"flags":{},"responses":["","\\"You seek dreams! Very good! Master Asharden will be happy to speak with you.\\""],"triggers":[{},{"end_convo":"The door swings open.","set_flag":"ash_password"}]}},"jharden":{"_location":"Castle Olympus","name":{"flags":{},"responses":["","\\"I am Jharden, royal advisor and court magician.\\""],"triggers":[{},{}]},"_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Your father would speak to you, first.\\"","\\"Greetings, %NAME%.\\""],"triggers":[{"end_convo":"1"},{}]},"_confused":{"flags":{},"responses":["","\\"Say again?\\""],"triggers":[{},{}]},"job":{"flags":{},"responses":["","\\"Royal advisor and court =magician=. In my spare time, I =teach= and =train=.\\""],"triggers":[{},{}]},"train":{"flags":{"flags_met":"can_train"},"responses":["\\"I cannot train you at this time.\\"","\\"I can train you in the ways of outthinking your foes and your problems. Interested?\\" "],"triggers":[{},{"yes_no":1}]},"_yes":{"flags":{},"responses":["","He proceeds to instruct you and hone your mind. You feel smarter than ever!"],"triggers":[{},{"set_flag":"train_int"}]},"_no":{"flags":{},"responses":["","\\"Perhaps later.\\""],"triggers":[{},{}]},"stone":{"flags":{},"responses":["","\\"The Stone Circles can be used with the Transport spell. They are linked in pairs. There is one to the west of the castle and south along the shore.\\""],"triggers":[{},{}]},"circle":{"flags":{},"responses":["","\\"The Stone Circles can be used with the Transport spell. They are linked in pairs. There is one to the west of the castle and south along the shore.\\""],"triggers":[{},{}]},"magician":{"flags":{},"responses":["","\\"I wield my =magic= on the behalf of the kingdom.\\""],"triggers":[{},{}]},"magic":{"flags":{"flags_met":"spellbook"},"responses":["\\"On your quest you would be well served by learning magic. I will give you a journeyman\'s =spellbook= if you will do one task for me.\\"","\\"Use it well and grow in strength.\\""],"triggers":[{},{}]}},"nyrani":{"_location":"Castle Olympus","_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Best talk to his Majesty first.\\"","\\"Hello!\\""],"triggers":[{"end_convo":"1"},{}]},"name":{"flags":{},"responses":["","\\"In earshot of the guards you had best call me Captain Ambrose.\\""],"triggers":[{},{}]},"job":{"flags":{},"responses":["","\\"I am captain of the guard. I command them and =train= them in martial skills.\\""],"triggers":[{},{}]},"prince":{"flags":{"flags_met":"end_rebel"},"responses":["\\"I never thought something like this would happen. I remember when he would challenge me with a stick, saying he wished to learn to fight. Now this mess... all children rebel, eh? But usually it involves less bloodshed.\\"","\\"I am relieved that your brother and father have reconciled.\\""],"triggers":[{},{}]},"lance":{"flags":{"flags_met":"end_rebel"},"responses":["\\"I never thought something like this would happen. I remember when he would challenge me with a stick, saying he wished to learn to fight. Now this mess... all children rebel, eh? But usually it involves less bloodshed.\\"","\\"I am relieved that your brother and father have reconciled.\\""],"triggers":[{},{}]},"train":{"flags":{},"responses":["","\\"I would be pleased to train you. But first, I wonder if you might do me a =favor=.\\""],"triggers":[{},{}]},"favor":{"flags":{},"responses":["","\\"Yes. I placed an order for a special =shield= with the blacksmith in Gauntlet. It should be done by now- would you bring it back for me?\\""],"triggers":[{},{"set_flag":"get_shield"}]},"shield":{"flags":{},"responses":["","\\"Aye. \'Twould be very important to me to have it.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Hmm?\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","He waves cheerfully as you go."],"triggers":[{},{"end_convo":"1"}]}},"ambrose_a":{"_location":"Castle Olympus","shield":{"flags":{},"responses":["","\\"Thank you again for bringing it to me.\\""],"triggers":[{},{}]},"name":{"flags":{},"responses":["","\\"In earshot of the guards you had best call me Captain Ambrose.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Hmm?\\""],"triggers":[{},{}]},"_start":{"flags":{},"responses":["","\\"Hello!\\""],"triggers":[{},{}]},"prince":{"flags":{"flags_met":"end_rebel"},"responses":["\\"I never thought something like this would happen. I remember when he would challenge me with a stick, saying he wished to learn to fight. Now this mess... all children rebel, eh? But usually it involves less bloodshed.\\"","\\"I am relieved that your brother and father have reconciled.\\""],"triggers":[{},{}]},"lance":{"flags":{"flags_met":"end_rebel"},"responses":["\\"I never thought something like this would happen. I remember when he would challenge me with a stick, saying he wished to learn to fight. Now this mess... all children rebel, eh? But usually it involves less bloodshed.\\"","\\"I am relieved that your brother and father have reconciled.\\""],"triggers":[{},{}]},"job":{"flags":{},"responses":["","\\"I am captain of the guard. I command them and =train= them in martial skills.\\""],"triggers":[{},{}]},"train":{"flags":{"flags_met":"can_train"},"responses":["\\"Hmm, you are not yet ready to learn more!\\"","\\"Certainly, %NAME%! Would you prefer to focus on being =quick= or =strong=?\\""],"triggers":[{},{}]},"quick":{"flags":{"flags_met":"can_train"},"responses":["\\"You are not yet ready to learn more!\\"","He takes you aside, picks up a practice sword, and says, \\"Try not to get hit.\\" After a time (and a few bruises), you feel like your reflexes have improved."],"triggers":[{},{"set_flag":"train_dex"}]},"strong":{"flags":{"flags_met":"can_train"},"responses":["\\"You are not yet ready to learn more!\\"","He takes you aside, handing you a practice sword. \\"Strike at my shield,\\" he instructs. After a time you feel that constantly swinging a heavy weapon won\'t be as tiring as it used to be."],"triggers":[{},{"set_flag":"train_str"}]},"bye":{"flags":{},"responses":["","He waves cheerfully as you go."],"triggers":[{},{}]}},"kaye":{"_location":"Castle Olympus","_start":{"flags":{},"responses":["","\\"Hallo, hullo, hello, young %TITLE%!\\""],"triggers":[{},{}]},"name":{"flags":{},"responses":["","With a bow he announces, \\"Master Kaye, at your command!\\""],"triggers":[{},{}]},"job":{"flags":{},"responses":["","\\"What else could I be but a =jester=!\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Hey ho hi ho.\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","His laughter follows as you leave."],"triggers":[{},{"end_convo":"1"}]}}}';






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


var conversations = {};  // directory of Conversations

function set_conversations() {

var serialconv = '{"castleguard1":{"name":{"flags":{},"responses":["","\\"We do not give out our names while on duty.\\""],"triggers":[{},{}]},"_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Hail, %FORMAL% %NAME%! Your =father= the King wishes to speak with you.\\"","\\"Greetings, %FORMAL% %NAME%.\\""],"triggers":[{},{}]},"job":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Surely that can wait. Your =father= awaits.\\"","\\"We =guard= Castle Olympus.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Beg pardon?\\""],"triggers":[{},{}]},"father":{"flags":{"flags_met":"kingspeech"},"responses":["\\"He is within, upon his throne. Seek him!\\"","\\"He is within.\\""],"triggers":[{"end_convo":"%SELF_PRONOUN% waves you onward."},{}]},"throne":{"flags":{},"responses":["","\\"Straight ahead through there.\\""],"triggers":[{},{}]},"king":{"flags":{"flags_met":"kingspeech"},"responses":["\\"He is within, upon his throne. Seek him!\\"","\\"He is within.\\""],"triggers":[{"end_convo":"%SELF_PRONOUN% waves you onward."},{}]},"guard":{"flags":{},"responses":["","\\"While we patrols these halls, no harm shall come to those within.\\""],"triggers":[{},{}]},"bye":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Hurry along!\\"","\\"Stay out of trouble.\\""],"triggers":[{"end_convo":"%SELF_PRONOUN% waves you onward."},{"end_convo":1}]},"_location":"Castle Olympus"},"king":{"name":{"flags":{},"responses":["","\\"While a king should usually demand a certain formality, even here you can just call me father.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"I\'m sorry, what was that?\\""],"triggers":[{},{}]},"_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Thank you, %NAME%, for coming so quickly. Your =brother= has finally taken that step too far and now he must be dealt with.%%He has raised himself a castle and declared himself to be in rebellion, and so it is with a heavy heart that I say that he is no longer my heir.%%That title passes to you, my %KIDDIE%, who has remained steadfast. But now I must charge you with this =duty=.\\"","\\"Welcome back, %NAME%. What can I do for you?\\""],"triggers":[{"set_flag":"kingspeech"},{}]},"bye":{"flags":{},"responses":["","\\"Travel well!\\""],"triggers":[{},{"end_convo":1}]},"_location":"Castle Olympus","job":{"flags":{},"responses":["","\\"I rule over these wide lands as well as I know how.\\""],"triggers":[{},{}]},"duty":{"flags":{},"responses":["","\\"I charge you with the preservation of the kingdom. Prove your worthiness to stand as my heir; go and see to an end to this rebellion.\\"%%\\"But, do so not as a %FORMAL%- go forth in =disguise=, if you will. If you can solve this crisis without the resources of a %FORMAL%, you will truly be worthy.\\""],"triggers":[{},{}]},"disguise":{"flags":{},"responses":["","\\"Go forth, as %NAME%, not as %FORMAL% %NAME%. Get to know the people. And bring your brother back from the brink.\\""],"triggers":[{},{}]},"heal":{"flags":{},"responses":["","\\"Vas Mani!\\" Your father heals your wounds."],"triggers":[{},{"set_flag":"king_heal"}]},"health":{"flags":{},"responses":["","\\"Vas Mani!\\" Your father heals your wounds."],"triggers":[{},{"set_flag":"king_heal"}]},"brother":{"flags":{},"responses":["","\\"He seeks to replace my rule with his own. The city of =Onyx= has sworn to him, and if naught changes soon I fear his forces will be at our gates.\\""],"triggers":[{},{}]},"onyx":{"flags":{},"responses":["","\\"And what\'s more, the road between here and there has had increasing signs of bandits.\\""],"triggers":[{},{}]},"_level":{"flags":{},"responses":["","\\"Now, how can I help you?\\""],"triggers":[{},{}]},"kyvek":{"flags":{"flags_met":"given_box"},"responses":["He laughs uproariously. \\"Ah, he sneaks past my guard with my own %KIDDIE%! Very well, very well then. Go speak to Trevor downstairs, at the treasury, and he will make it right. Show him this token.\\" He hands you a ribbon with the royal seal upon it.","\\"May he continue to do good business.\\""],"triggers":[{"give_item":"TreasuryToken"},{}]},"token":{"flags":{"has_item":"TreasuryToken"},"responses":["\\"I\'m sorry, what was that?\\"","\\"Bring that to Trevor downstairs, and he will bring you Kyvek\'s payment.\\""],"triggers":[{},{}]}},"erin":{"name":{"flags":{},"responses":["","\\"You can call me Erin.\\""],"triggers":[{},{"set_flag":"knows_erin"}]},"_start":{"flags":{},"responses":["","She nods at you."],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Hmm?\\""],"triggers":[{},{}]},"buy":{"flags":{},"responses":["","\\"What would you like?\\""],"triggers":[{},{"start_shop":1}]},"sell":{"flags":{},"responses":["","\\"What have you got?\\""],"triggers":[{},{"start_sell":1}]},"bye":{"flags":{},"responses":["","\\"Come back soon!\\""],"triggers":[{},{"end_convo":1}]},"_location":"Gauntlet","job":{"flags":{},"responses":["","\\"I sell armor.\\""],"triggers":[{},{}]}},"alexis":{"name":{"flags":{},"responses":["","\\"I am Alexis.\\""],"triggers":[{},{"set_flag":"knows_alexis"}]},"_start":{"flags":{},"responses":["","\\"Good day to you.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"What?\\""],"triggers":[{},{}]},"buy":{"flags":{},"responses":["",""],"triggers":[{},{"start_shop":1}]},"_startbuy":{"flags":{},"responses":["","\\"I can teach these spells.\\""],"triggers":[{},{}]},"_knowsall":{"flags":{},"responses":["","\\"You have already learned everything I have to teach!\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"Good day!\\""],"triggers":[{},{"end_convo":1}]},"_location":"Gauntlet","job":{"flags":{},"responses":["","\\"I run the magic shop here in Gauntlet.\\""],"triggers":[{},{}]}},"ash_door":{"_location":"Ashardens Tower","_start":{"flags":{},"responses":["","As you reach for the handle, the door speaks! \\"Yes, hello? No, I won\'t =open=.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"I am but a simple door. I don\'t understand.\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"See you around! Except that I can\'t really see...\\""],"triggers":[{},{"end_convo":"The door falls silent."}]},"knocker":{"flags":{},"responses":["","The door sounds pleased. \\"Oh, you like them?\\""],"triggers":[{},{}]},"knockers":{"flags":{},"responses":["","The door sounds pleased. \\"Oh, you like them?\\""],"triggers":[{},{}]},"name":{"flags":{},"responses":["","\\"I don\'t think I have one, actually!\\""],"triggers":[{},{}]},"job":{"flags":{},"responses":["","\\"=Open= and close, close and open. But only where my =master= bids.\\""],"triggers":[{},{}]},"master":{"flags":{},"responses":["","\\"Master Asharden, master of magics. It is rare that he wishes to be disturbed.\\""],"triggers":[{},{}]},"open":{"flags":{},"responses":["","\\"I may not open for you, unless you speak the word that tells me what you =seek=.\\""],"triggers":[{},{}]},"seek":{"flags":{},"responses":["","\\"Do you know what it is you seek? If not, return when you do!\\""],"triggers":[{},{}]},"magic":{"flags":{},"responses":["","\\"To seek magic is well and good, but not enough.\\""],"triggers":[{},{}]},"dreams":{"flags":{},"responses":["","\\"You seek dreams! Very good! Master Asharden will be happy to speak with you.\\""],"triggers":[{},{"end_convo":"The door swings open.","set_flag":"ash_password"}]}},"jharden":{"_location":"Castle Olympus","name":{"flags":{},"responses":["","\\"I am Jharden, royal advisor and court magician.\\""],"triggers":[{},{"set_flag":"knows_jharden"}]},"_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Your father would speak to you, first.\\"","\\"Greetings, %NAME%.\\""],"triggers":[{"end_convo":"1"},{}]},"_confused":{"flags":{},"responses":["","\\"Say again?\\""],"triggers":[{},{}]},"job":{"flags":{},"responses":["","\\"Royal advisor and court =magician=. In my spare time, I =teach= and =train=.\\""],"triggers":[{},{}]},"train":{"flags":{"flags_met":"can_train"},"responses":["\\"I cannot train you at this time.\\"","\\"I can train you in the ways of outthinking your foes and your problems. Interested?\\" "],"triggers":[{},{"yes_no":1}]},"_yes":{"flags":{"flags_met":"int_max"},"responses":["He proceeds to instruct you and hone your mind. You feel smarter than ever!","\\"You have learned all that I have to teach!\\""],"triggers":[{"set_flag":"train_int"},{}]},"_no":{"flags":{},"responses":["","\\"Perhaps later.\\""],"triggers":[{},{}]},"stone":{"flags":{},"responses":["","\\"The Stone Circles can be used with the Transport spell. They are linked in pairs. There is one to the west of the castle and south along the shore.\\""],"triggers":[{},{}]},"circle":{"flags":{},"responses":["","\\"The Stone Circles can be used with the Transport spell. They are linked in pairs. There is one to the west of the castle and south along the shore.\\""],"triggers":[{},{}]},"magician":{"flags":{},"responses":["","\\"I wield my =magic= on the behalf of the kingdom.\\""],"triggers":[{},{}]},"magic":{"flags":{"flags_met":"spellbook"},"responses":["\\"On your quest you would be well served by learning magic. I will give you a journeyman\'s spellbook if you will do one =task= for me.\\"","\\"Use it well and grow in strength.\\""],"triggers":[{},{}]},"teach":{"flags":{"flags_met":"spellbook"},"responses":["\\"I teach the use of =magic=. Your previous instructor has commended you to my care- you are ready to begin your journeyman\'s studies.\\"","\\"I teach the use of =magic=.\\""],"triggers":[{},{}]},"task":{"flags":{"flags_met":"spellbook"},"responses":["\\"I need someone to run a small errand. Please travel to nearby Nassau, and fetch for me one cap of Executioner\'s =Hood= from the healer there. I need it for an experiment.\\"","\\"Thank you again for running that small errand.\\""],"triggers":[{},{}]},"hood":{"flags":{"has_item":"QuestExecutionersHood"},"responses":["\\"I hope to learn more of its magical properties.\\"","\\"Ah, thank you!\\" He pulls a thin book from his satchel. \\"Here you are. This book can only hold spells of lower level- it is not safe for you to have a full spellbook at this point in your training.\\""],"triggers":[{},{"take_item":"ExecutionersHood","set_flag":"spellbook"}]},"bye":{"flags":{},"responses":["","\\"Good day to you.\\""],"triggers":[{},{"end_convo":1}]}},"nyrani":{"_location":"Castle Olympus","_start":{"flags":{"flags_met":"kingspeech"},"responses":["\\"Best talk to his Majesty first.\\"","\\"Hello!\\""],"triggers":[{"end_convo":"1"},{}]},"name":{"flags":{},"responses":["","\\"In earshot of the guards you had best call me Captain Nyrani.\\""],"triggers":[{},{"set_flag":"knows_nyrani"}]},"job":{"flags":{},"responses":["","\\"I am captain of the guard. I command them and =train= them in martial skills.\\""],"triggers":[{},{}]},"prince":{"flags":{"flags_met":"end_rebel"},"responses":["\\"I never thought something like this would happen. I remember when he would challenge me with a stick, saying he wished to learn to fight. Now this mess... all children rebel, eh? But usually it involves less bloodshed.\\"","\\"I am relieved that your brother and father have reconciled.\\""],"triggers":[{},{}]},"lance":{"flags":{"flags_met":"end_rebel"},"responses":["\\"I never thought something like this would happen. I remember when he would challenge me with a stick, saying he wished to learn to fight. Now this mess... all children rebel, eh? But usually it involves less bloodshed.\\"","\\"I am relieved that your brother and father have reconciled.\\""],"triggers":[{},{}]},"train":{"flags":{},"responses":["","\\"I would be pleased to train you. But first, I wonder if you might do me a =favor=.\\""],"triggers":[{},{}]},"favor":{"flags":{},"responses":["","\\"Yes. I placed an order for a special =shield= with the blacksmith in Gauntlet. It should be done by now- would you bring it back for me?\\""],"triggers":[{},{"yes_no":1}]},"shield":{"flags":{"has_item":"AmbroseShield"},"responses":["\\"Aye. \'Twould be very important to me to have it.\\"","\\"Thank you! Look at that- now that\'s quality. Come back any time and I will be glad to train you.\\""],"triggers":[{},{"end_convo":"1","take_item":"AmbroseShield"}]},"_confused":{"flags":{},"responses":["","\\"Hmm?\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","She waves cheerfully as you go."],"triggers":[{},{"end_convo":"1"}]},"_yes":{"flags":{},"responses":["","\\"My thanks.\\""],"triggers":[{},{"set_flag":"get_shield"}]},"_no":{"flags":{},"responses":["","\\"Well, return if you change your mind.\\""],"triggers":[{},{}]}},"nyrani_a":{"_location":"Castle Olympus","shield":{"flags":{},"responses":["","\\"Thank you again for bringing it to me.\\""],"triggers":[{},{}]},"name":{"flags":{},"responses":["","\\"In earshot of the guards you had best call me Captain Nyrani.\\""],"triggers":[{},{"set_flag":"knows_nyrani"}]},"_confused":{"flags":{},"responses":["","\\"Hmm?\\""],"triggers":[{},{}]},"_start":{"flags":{},"responses":["","\\"Hello!\\""],"triggers":[{},{}]},"prince":{"flags":{"flags_met":"end_rebel"},"responses":["\\"I never thought something like this would happen. I remember when he would challenge me with a stick, saying he wished to learn to fight. Now this mess... all children rebel, eh? But usually it involves less bloodshed.\\"","\\"I am relieved that your brother and father have reconciled.\\""],"triggers":[{},{}]},"lance":{"flags":{"flags_met":"end_rebel"},"responses":["\\"I never thought something like this would happen. I remember when he would challenge me with a stick, saying he wished to learn to fight. Now this mess... all children rebel, eh? But usually it involves less bloodshed.\\"","\\"I am relieved that your brother and father have reconciled.\\""],"triggers":[{},{}]},"job":{"flags":{},"responses":["","\\"I am captain of the guard. I command them and =train= them in martial skills.\\""],"triggers":[{},{}]},"train":{"flags":{"flags_met":"can_train"},"responses":["\\"Hmm, you are not yet ready to learn more!\\"","\\"Certainly, %NAME%! Would you prefer to focus on being =quick= or =strong=?\\""],"triggers":[{},{}]},"quick":{"flags":{"flags_met":"can_train"},"responses":["\\"You are not yet ready to learn more!\\"","She takes you aside, picks up a practice sword, and says, \\"Try not to get hit.\\" After a time (and a few bruises), you feel like your reflexes have improved."],"triggers":[{},{"set_flag":"train_dex"}]},"strong":{"flags":{"flags_met":"can_train"},"responses":["\\"You are not yet ready to learn more!\\"","She takes you aside, handing you a practice sword. \\"Strike at my shield,\\" he instructs. After a time you feel that constantly swinging a heavy weapon won\'t be as tiring as it used to be."],"triggers":[{},{"set_flag":"train_str"}]},"bye":{"flags":{},"responses":["","He waves cheerfully as you go."],"triggers":[{},{}]}},"kaye":{"_location":"Castle Olympus","_start":{"flags":{},"responses":["","\\"Hallo, hullo, hello, young %TITLED%!\\""],"triggers":[{},{}]},"name":{"flags":{},"responses":["","With a bow he announces, \\"Master Kaye, at your command!\\""],"triggers":[{},{"set_flag":"knows_kaye"}]},"job":{"flags":{},"responses":["","\\"What else could I be but a =jester=!\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Hey ho hi ho.\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","His laughter follows as you leave."],"triggers":[{},{"end_convo":"1"}]},"jester":{"flags":{},"responses":["","\\"A singer of =songs=, a dancer and prancer, a wielder of =riddles= and a speaker of =tales=! A heavy burden it is, to be so light on my feet, and the delight of the Court! But aye, it is my =calling=!\\""],"triggers":[{},{}]},"calling":{"flags":{},"responses":["","\\"One thing is certain- when it called, I came! Perhaps someday, you will hear the call. And then, with some work, you could make a Fool of yourself!\\""],"triggers":[{},{}]},"riddles":{"flags":{},"responses":["","\\"Here\'s one: If you\'ve got it, you want to share it. If you share it, you haven\'t got it. What is it?\\""],"triggers":[{},{}]},"riddle":{"flags":{},"responses":["","\\"Here\'s one: If you\'ve got it, you want to share it. If you share it, you haven\'t got it. What is it?\\""],"triggers":[{},{}]},"secret":{"flags":{},"responses":["","\\"Very good! Well now, let me share one: There is a secret door in the upper library!\\""],"triggers":[{},{}]}},"abyssyou":{"_location":"Stygian Abyss","_start":{"flags":{},"responses":["","Your alternate self meets your eyes. \\"For that, you must truly know yourself.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","Yourself just smiles patiently at you."],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","%SELF_PRONOUN% beckons you forward."],"triggers":[{},{"end_convo":1}]},"name":{"flags":{},"responses":["","\\"We are one. My name is %NAME%.\\""],"triggers":[{},{}]},"job":{"flags":{},"responses":["","Yourself just smiles patiently at you."],"triggers":[{},{}]}},"hazel":{"_location":"Nassau","_start":{"flags":{},"responses":["","\\"Hello.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"What\'s that?\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"Good day to you.\\""],"triggers":[{},{"end_convo":1}]},"name":{"flags":{},"responses":["","\\"My name is Hazel.\\""],"triggers":[{},{"set_flag":"knows_hazel"}]},"job":{"flags":{},"responses":["","\\"I\'m the village =herbalist= and =healer=.\\""],"triggers":[{},{}]},"hood":{"flags":{"flags_met":"all_health"},"responses":["\\"You need some executioner\'s hood? I do have some, but I need it when people get sick, here. I know! Go, take a walk around Nassau, and talk to everyone. As after their =health=, and if everyone\'s doing well, I will give you an executioner\'s hood.\\"","\\"Very good! I am glad everyone is displaying their usual robust health.\\" She hands you an unpleasant smelling mushroom."],"triggers":[{},{"give_item":"QuestExecutionersHood","set_flag":"given_hood"}]},"health":{"flags":{},"responses":["","She chuckles. \\"I am doing quite well. But check on the others.\\""],"triggers":[{},{}]}},"hazel_a":{"_location":"Nassau","_start":{"flags":{},"responses":["","\\"Hello.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"What\'s that?\\""],"triggers":[{},{}]},"name":{"flags":{},"responses":["","\\"My name is Hazel.\\""],"triggers":[{},{"set_flag":"knows_hazel"}]},"job":{"flags":{},"responses":["","\\"I\'m the village =herbalist= and =healer=.\\""],"triggers":[{},{}]},"health":{"flags":{},"responses":["","She chuckles. \\"I am doing quite well.\\""],"triggers":[{},{}]},"hood":{"flags":{"has_item":"ExecutionersHood"},"responses":["\\"You know, it seems I have less than I thought left here. If you were to come across any more, I would be happy to take it off your hands. It used to grow in the Pit of Despair.\\"","\\"Ah, thank you! Here is something for your trouble.\\""],"triggers":[{},{"set_flag":"give_100g"}]},"bye":{"flags":{},"responses":["","\\"Stay healthy!\\""],"triggers":[{},{"end_convo":1}]}},"kyvek":{"_location":"Nassau","_start":{"flags":{},"responses":["","He smiles in greeting. \\"Hello!\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Huh?\\""],"triggers":[{},{}]},"name":{"flags":{},"responses":["","\\"I am Kyvek, or perhaps you know me as Kyvek the =Kidder=!\\""],"triggers":[{},{"set_flag":"knows_kyvek"}]},"kidder":{"flags":{},"responses":["","\\"No? Not a glimmer of recognition? Ah well. Kids these days.\\""],"triggers":[{},{}]},"health":{"flags":{},"responses":["","\\"Feeling pretty good, pretty good.\\""],"triggers":[{},{"set_flag":"health_kyvek"}]},"job":{"flags":{},"responses":["","\\"I\'m a merchant! Buy high and sell low, unless it\'s the other way around. I\'m passing through this way because I have a =debt= to collect.\\""],"triggers":[{},{}]},"debt":{"flags":{"has_item":"KyvekBox"},"responses":["\\"Aye, indeed. The =King= himself owes me a small sum of gold, but now I cannot get in to see him!\\"","\\"Ah! Ah! Glory! You have my thanks, young friend. And more than that. Please, take this as your share of these funds.\\""],"triggers":[{},{"take_item":"KyvekBox","set_flag":"give_100g_k"}]},"king":{"flags":{"has_item":"KyvekBox"},"responses":["He looks at you quizzically. \\"It seems unlikely, but if you can get in to talk to him, perhaps you could remind him that he does owe me! Pry some gold from his fingers and I\'ll be happy to give you a share. Just remind him that he owes =Kyvek=.\\"","\\"Ah! Ah! Glory! You have my thanks, young friend. And more than that. Please, take this as your share of these funds.\\""],"triggers":[{"set_flag":"kyvek_gold"},{"take_item":"KyvekBox","set_flag":"give_100g_k"}]},"kyvek":{"flags":{},"responses":["","\\"Aye, that\'s me.\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"Take care!\\""],"triggers":[{},{"end_convo":1}]}},"kyvek_a":{"_location":"Nassau","_start":{"flags":{},"responses":["","He smiles in greeting. \\"Hello, my friend!\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Huh?\\""],"triggers":[{},{}]},"name":{"flags":{},"responses":["","\\"I am Kyvek, or perhaps you know me as Kyvek the =Kidder=!\\""],"triggers":[{},{"set_flag":"knows_kyvek"}]},"kidder":{"flags":{},"responses":["","\\"No? Not a glimmer of recognition? Ah well. Kids these days.\\""],"triggers":[{},{}]},"health":{"flags":{},"responses":["","\\"Feeling pretty good, pretty good.\\""],"triggers":[{},{"set_flag":"health_kyvek"}]},"job":{"flags":{},"responses":["","\\"I\'m a merchant! Buy high and sell low, unless it\'s the other way around.\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"Come back any time!\\""],"triggers":[{},{"end_convo":1}]}},"daniel":{"_location":"Nassau","_start":{"flags":{},"responses":["","\\"Hello, and welcome to Ye Olde Inn!\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","He looks at you uncertainly."],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"Come back and stay with us soon.\\""],"triggers":[{},{"end_convo":1}]},"name":{"flags":{},"responses":["","\\"My name is Daniel. I run Ye Olde =Inn=.\\""],"triggers":[{},{"set_flag":"knows_daniel"}]},"job":{"flags":{},"responses":["","\\"I\'m the innkeeper. Guests visiting the nearby Castle often choose to stay in our more scenic location.\\""],"triggers":[{},{}]},"health":{"flags":{},"responses":["","He shrugs. \\"I think everything\'s fine.\\""],"triggers":[{},{"set_flag":"health_daniel"}]},"inn":{"flags":{},"responses":["","\\"Do you need a =room= for the night?\\""],"triggers":[{},{}]},"room":{"flags":{},"responses":["","\\"Ah, pity.\\""],"triggers":[{},{}]}},"nassau_guard":{"_location":"Nassau","_start":{"flags":{},"responses":["","He nods at you briskly."],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Say again?\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"I\'ll be keeping an eye out.\\""],"triggers":[{},{"end_convo":1}]},"name":{"flags":{},"responses":["","\\"I am a guard of Nassau.\\""],"triggers":[{},{}]},"job":{"flags":{},"responses":["","\\"I keep Nassau safe.\\""],"triggers":[{},{}]},"health":{"flags":{},"responses":["","\\"I am in fine health.\\""],"triggers":[{},{"set_flag":"health_guard"}]}},"castleguard0":{"_location":"Castle Olympus","_start":{"flags":{},"responses":["","The guard looks at you suspiciously. \\"Should you be down here?\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"Beg pardon?\\""],"triggers":[{},{}]},"name":{"flags":{},"responses":["","\\"We do not give out our names while on duty.\\""],"triggers":[{},{}]},"job":{"flags":{},"responses":["","\\"We guard, and watch for thieves.\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"Stay out of trouble!\\""],"triggers":[{},{"end_convo":1}]}},"trevor":{"_location":"Castle Olympus","_start":{"flags":{"flags_met":"kyvek_fetch"},"responses":["\\"Hmm?\\"","\\"Just a moment.\\""],"triggers":[{},{"end_convo":1}]},"name":{"flags":{},"responses":["","\\"I am Trevor. Keeper of the King\'s =purse=.\\""],"triggers":[{},{"set_flag":"knows_trevor"}]},"purse":{"flags":{"has_item":"TreasuryToken"},"responses":["\\"Aye. I handle paperwork for outgoing payments, and incoming taxes.\\"","\\"Aye. I handle paperwork for outgoing payments, and incoming taxes.\\" He sees the treasury token the King gave you. \\"Ah! I will handle that. Please wait here a moment.\\""],"triggers":[{},{"end_convo":"He gets up from the desk.","take_item":"TreasuryToken","set_flag":"kyvek_fetch"}]},"job":{"flags":{},"responses":["","\\"Keeper of the King\'s =purse=. I handle all matters that touch upon the kingdom\'s =gold=.\\""],"triggers":[{},{}]},"gold":{"flags":{},"responses":["","\\"It is stored behind me, but don\'t get any ideas.\\""],"triggers":[{},{}]},"_confused":{"flags":{},"responses":["","\\"I\'m sorry?\\""],"triggers":[{},{}]},"bye":{"flags":{},"responses":["","\\"Farewell. Remember always to balance the books.\\""],"triggers":[{},{"end_convo":1}]}}}';


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

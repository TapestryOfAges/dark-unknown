// MAP BEGINS HERE
mappages["tutorial1"] = {};
mappages["tutorial1"].terrain = [];
 mappages["tutorial1"].terrain[0] = '.. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["tutorial1"].terrain[1] = '.. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["tutorial1"].terrain[2] = '.. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..';
 mappages["tutorial1"].terrain[3] = '.. .. .. .. .. .. .. ,, .. .. .. .. .. .. .. .. .. ,, .. ..';
 mappages["tutorial1"].terrain[4] = '.. .. u, .. .. .. .. .. .. .. .. .. .. ,, .. ,, ,, .. u, ..';
 mappages["tutorial1"].terrain[5] = '.. .. .. .. .. ,, .. .. .. .. .. .. .. .. u, ,, .. .. .. ..';
 mappages["tutorial1"].terrain[6] = 'u, .. .. ,, .. ## ## ## ## +c ## ## ## ## ## .. .. .. ,, ..';
 mappages["tutorial1"].terrain[7] = ',, .. ,, .. .. ## +c +c +c +c +c +c +c ## ## ,, .. ,, .. ..';
 mappages["tutorial1"].terrain[8] = '.. .. .. ,, .. ## +c +c +c +c +c +c +c ## ## .. ,, ,, .. ..';
 mappages["tutorial1"].terrain[9] = ',, ,, .. .. .. #O +c +c +c +c +c +c +c ## ## .. .. .. .. ..';
mappages["tutorial1"].terrain[10] = 'u, .. ,, u, .. ## +c +c +c +c +c +c +c f# ## ,, .. .. .. ..';
mappages["tutorial1"].terrain[11] = '.. .. .. ,, .. ## +c +c +c +c +c +c +c ## ## .. .. .. .. ..';
mappages["tutorial1"].terrain[12] = ',, u, ,, .. .. ## +c +c +c +c +c +c +c ## ## .. u, .. .. ..';
mappages["tutorial1"].terrain[13] = '.. ,, ,, .. .. ## ## ## ## ## ## ## ## ## ## .. ,, .. .. ..';
mappages["tutorial1"].terrain[14] = 'u, .. .. ,, .. ,, .. .. ,, u, .. .. ,, .. .. .. ,, ,, .. ..';
mappages["tutorial1"].terrain[15] = '.. .. .. .. .. u, .. ,, .. .. u, ,, .. u, .. .. .. .. .. ,,';
mappages["tutorial1"].terrain[16] = ',, .. .. .. .. .. .. u, .. .. .. .. .. ,, .. ,, .. .. .. ..';
mappages["tutorial1"].terrain[17] = '.. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["tutorial1"].terrain[18] = '.. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..';
mappages["tutorial1"].terrain[19] = '.. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..';

mappages["tutorial1"].features = [];
mappages["tutorial1"].features[0] = {name : 'DoorWindow', x : 9, y : 6};
mappages["tutorial1"].features[1] = {name : 'BookshelfLeft', x : 6, y : 7, lootedid : 'tutorial_shelf', searchyield : 'TanPotion'};
mappages["tutorial1"].features[2] = {name : 'BookshelfLeft', x : 11, y : 7, lootedid : 'tutorial_shelf', searchyield : 'TanPotion'};
mappages["tutorial1"].features[3] = {name : 'BookshelfRight', x : 12, y : 7, lootedid : 'tutorial_shelf', searchyield : 'TanPotion'};
mappages["tutorial1"].features[4] = {name : 'BookshelfRight', x : 7, y : 7, lootedid : 'tutorial_shelf', searchyield : 'TanPotion'};
mappages["tutorial1"].features[5] = {name : 'BookshelfOne', x : 6, y : 10, lootedid : 'tutorial_shelf', searchyield : 'TanPotion'};
mappages["tutorial1"].features[6] = {name : 'LeftChair', x : 6, y : 8};
mappages["tutorial1"].features[7] = {name : 'TopChair', x : 12, y : 8};
mappages["tutorial1"].features[8] = {name : 'Harpsichord', x : 12, y : 9};
mappages["tutorial1"].features[9] = {name : 'RightTable', x : 11, y : 11};
mappages["tutorial1"].features[10] = {name : 'MiddleTable', x : 10, y : 11};
mappages["tutorial1"].features[11] = {name : 'LeftTable', x : 9, y : 11};
mappages["tutorial1"].features[12] = {name : 'BottomChair', x : 10, y : 12};
mappages["tutorial1"].features[13] = {name : 'GrandfatherClock', x : 12, y : 12};
mappages["tutorial1"].features[14] = {name : 'StairUp', x : 6, y : 12, entermap : 'tutorial2', enterx : 6, entery : 12};
mappages["tutorial1"].features[15] = {name : 'PottedPlant', x : 8, y : 7};
mappages["tutorial1"].features[16] = {name : 'PottedPlant', x : 10, y : 7};
mappages["tutorial1"].features[17] = {name : 'Evergreen', x : 10, y : 5};
mappages["tutorial1"].features[18] = {name : 'Evergreen', x : 8, y : 5};
mappages["tutorial1"].features[19] = {name : 'Tree', x : 1, y : 8};
mappages["tutorial1"].features[20] = {name : 'PileOfRocks', x : 7, y : 2};
mappages["tutorial1"].features[21] = {name : 'PileOfRocks', x : 5, y : 3};
mappages["tutorial1"].features[22] = {name : 'PileOfRocks', x : 2, y : 3};
mappages["tutorial1"].features[23] = {name : 'PileOfRocks', x : 12, y : 2};
mappages["tutorial1"].features[24] = {name : 'PileOfRocks', x : 16, y : 2};
mappages["tutorial1"].features[25] = {name : 'Tree', x : 10, y : 14};
mappages["tutorial1"].features[26] = {name : 'Tree', x : 2, y : 15};
mappages["tutorial1"].features[27] = {name : 'Fireplace', x : 13, y : 10};
mappages["tutorial1"].features[28] = {name : 'WalkOnTutorial2', x : 9, y : 5};


mappages["tutorial1"].npcs = [];
mappages["tutorial1"].npcs[0] = {name : 'TownsfolkVillagerNPC', x : 11, y : 9, NPCName: 'Avery', Desc: 'your tutor', Prefix: '', PeaceAI: 'tutorial', Conversation: 'tutorial', ConversationFlag: 'avery', Gender: 'male', Leash: 2, Bark: '0', NPCBand: '0', skintone: 1, wornlayers: '{"body":"BlueFancy","head":"ShortBlackPale","back":"","offhand":"OffhandPale","cloak":"","mainhand":"MainHandPale","realhead":"ShortBlackPale"}'};

mappages["tutorial1"].desc = "Tutorial";
mappages["tutorial1"].longdesc = ``;
mappages["tutorial1"].music = 'Village';
mappages["tutorial1"].savename = `tutorial`;
mappages["tutorial1"].exitmap = '';
mappages["tutorial1"].exitx = '65';
mappages["tutorial1"].exity = '70';
mappages["tutorial1"].wraps = '';
mappages["tutorial1"].enterx = '65';
mappages["tutorial1"].entery = '70';
mappages["tutorial1"].seeBelow = '';
mappages["tutorial1"].lightLevel = 'bright';
mappages["tutorial1"].alwaysRemember = '0';
mappages["tutorial1"].scale = '1';
mappages["tutorial1"].underground = '0';
mappages["tutorial1"].undergroundDesc = '';
mappages["tutorial1"].enterscript = '';
mappages["tutorial1"].entertestscript = '';
mappages["tutorial1"].exitscript = '';
mappages["tutorial1"].exittestscript = '';
mappages["tutorial1"].returnmap = '';
mappages["tutorial1"].returnx = 'NaN';
mappages["tutorial1"].returny = 'NaN';
mappages["tutorial1"].returninfused = '0';
mappages["tutorial1"].automap = '1';
mappages["tutorial1"].linkedMaps = ["tutorial2", "combatTutorial"];
mappages["tutorial1"].editorLabels = '{}';
// MAP ENDS HERE

// MAP BEGINS HERE
mappages["tutorial2"] = {};
mappages["tutorial2"].terrain = [];
 mappages["tutorial2"].terrain[0] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';
 mappages["tutorial2"].terrain[1] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';
 mappages["tutorial2"].terrain[2] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';
 mappages["tutorial2"].terrain[3] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';
 mappages["tutorial2"].terrain[4] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';
 mappages["tutorial2"].terrain[5] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';
 mappages["tutorial2"].terrain[6] = 'sb sb sb sb sb ## ## ## ## ## ## #O ## ## ## sb sb sb sb sb';
 mappages["tutorial2"].terrain[7] = 'sb sb sb sb sb ## +c +c +c ## +c +c +c ## ## sb sb sb sb sb';
 mappages["tutorial2"].terrain[8] = 'sb sb sb sb sb ## +c +c +c ## +c +c +c ## ## sb sb sb sb sb';
 mappages["tutorial2"].terrain[9] = 'sb sb sb sb sb #O +c +c +c ## +c +c +c ## ## sb sb sb sb sb';
mappages["tutorial2"].terrain[10] = 'sb sb sb sb sb ## ## +c ## ## +c +c +c f# ## sb sb sb sb sb';
mappages["tutorial2"].terrain[11] = 'sb sb sb sb sb ## +c +c +c ## +c +c +c ## ## sb sb sb sb sb';
mappages["tutorial2"].terrain[12] = 'sb sb sb sb sb ## +c +c +c +c +c +c +c ## ## sb sb sb sb sb';
mappages["tutorial2"].terrain[13] = 'sb sb sb sb sb ## ## ## ## ## ## #O ## ## ## sb sb sb sb sb';
mappages["tutorial2"].terrain[14] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';
mappages["tutorial2"].terrain[15] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';
mappages["tutorial2"].terrain[16] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';
mappages["tutorial2"].terrain[17] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';
mappages["tutorial2"].terrain[18] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';
mappages["tutorial2"].terrain[19] = 'sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb sb';

mappages["tutorial2"].features = [];
mappages["tutorial2"].features[0] = {name : 'Fireplace', x : 13, y : 10};
mappages["tutorial2"].features[1] = {name : 'Door', x : 7, y : 10};
mappages["tutorial2"].features[2] = {name : 'Door', x : 9, y : 12};
mappages["tutorial2"].features[3] = {name : 'UnlitBrazier', x : 8, y : 9};
mappages["tutorial2"].features[4] = {name : 'BedHead', x : 6, y : 7};
mappages["tutorial2"].features[5] = {name : 'BedFoot', x : 7, y : 7};
mappages["tutorial2"].features[6] = {name : 'Dresser', x : 8, y : 7};
mappages["tutorial2"].features[7] = {name : 'BedHead', x : 11, y : 12};
mappages["tutorial2"].features[8] = {name : 'BedFoot', x : 12, y : 12};
mappages["tutorial2"].features[9] = {name : 'Dresser', x : 12, y : 9};
mappages["tutorial2"].features[10] = {name : 'RightChair', x : 12, y : 10};
mappages["tutorial2"].features[11] = {name : 'SmallTable', x : 11, y : 10};
mappages["tutorial2"].features[12] = {name : 'Vanity', x : 12, y : 7};
mappages["tutorial2"].features[13] = {name : 'Mirror', x : 10, y : 7};
mappages["tutorial2"].features[14] = {name : 'StairDown', x : 6, y : 12, entermap : 'tutorial1', enterx : 6, entery : 12};
mappages["tutorial2"].features[15] = {name : 'WalkOnTutorial1', x : 7, y : 9};
mappages["tutorial2"].features[16] = {name : 'WalkOnTutorial1', x : 10, y : 12};

mappages["tutorial2"].npcs = [];
mappages["tutorial2"].npcs[0] = {name : 'TownsfolkVillagerNPC', x : 6, y : 11, NPCName: 'Avery', Desc: 'your tutor', Prefix: '', PeaceAI: 'tutorial', Conversation: 'tutorial', ConversationFlag: 'avery', Gender: 'male', Leash: 2, Bark: '0', NPCBand: '0', skintone: 1, wornlayers: '{"body":"BlueFancy","head":"ShortBlackPale","back":"","offhand":"OffhandPale","cloak":"","mainhand":"MainHandPale","realhead":"ShortBlackPale"}'};

mappages["tutorial2"].desc = "Tutorial";
mappages["tutorial2"].longdesc = ``;
mappages["tutorial2"].music = 'Village';
mappages["tutorial2"].savename = `tutorial`;
mappages["tutorial2"].exitmap = '';
mappages["tutorial2"].exitx = '65';
mappages["tutorial2"].exity = '70';
mappages["tutorial2"].wraps = '';
mappages["tutorial2"].enterx = '65';
mappages["tutorial2"].entery = '70';
mappages["tutorial2"].seeBelow = 'tutorial1';
mappages["tutorial2"].lightLevel = 'bright';
mappages["tutorial2"].alwaysRemember = '0';
mappages["tutorial2"].scale = '1';
mappages["tutorial2"].underground = '0';
mappages["tutorial2"].undergroundDesc = '';
mappages["tutorial2"].enterscript = '';
mappages["tutorial2"].entertestscript = '';
mappages["tutorial2"].exitscript = '';
mappages["tutorial2"].exittestscript = '';
mappages["tutorial2"].returnmap = '';
mappages["tutorial2"].returnx = 'NaN';
mappages["tutorial2"].returny = 'NaN';
mappages["tutorial2"].returninfused = '0';
mappages["tutorial2"].automap = '1';
mappages["tutorial2"].linkedMaps = ["tutorial1","combatTutorial"];
mappages["tutorial2"].editorLabels = '{}';
// MAP ENDS HERE

// MAP BEGINS HERE
mappages["combatTutorial"] = {};
mappages["combatTutorial"].terrain = [];
 mappages["combatTutorial"].terrain[0] = ',, ,, ,, .. .. .. .. .. .. .. .. .. ..';
 mappages["combatTutorial"].terrain[1] = ',, .. .. .. .. .. .. .. .. .. .. .. ,,';
 mappages["combatTutorial"].terrain[2] = '.. .. .. .. .. .. .. .. .. .. .. ,, ,,';
 mappages["combatTutorial"].terrain[3] = '.. .. .. .. .. .. .. .. .. .. ,, ,, ,,';
 mappages["combatTutorial"].terrain[4] = '.. .. .. .. .. .. .. .. .. .. ,, ,, ,,';
 mappages["combatTutorial"].terrain[5] = ',, .. .. .. .. .. .. .. .. .. .. ,, ,,';
 mappages["combatTutorial"].terrain[6] = ',, ,, .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatTutorial"].terrain[7] = ',, ,, ,, .. .. .. .. .. .. .. .. .. ..';
 mappages["combatTutorial"].terrain[8] = ',, ,, .. .. .. .. .. .. .. .. .. .. ..';
 mappages["combatTutorial"].terrain[9] = ',, ,, .. .. .. .. .. .. .. .. .. .. ..';
mappages["combatTutorial"].terrain[10] = '.. ,, .. .. .. .. .. .. .. .. .. ,, ,,';
mappages["combatTutorial"].terrain[11] = '.. .. .. .. .. .. .. .. .. .. .. ,, ,,';
mappages["combatTutorial"].terrain[12] = '.. .. .. .. .. .. .. .. .. .. .. .. ,,';

mappages["combatTutorial"].features = [];
mappages["combatTutorial"].features[0] = {name : 'PileOfRocks', x : 11, y : 9};
mappages["combatTutorial"].features[1] = {name : 'PileOfRocks', x : 10, y : 5};
mappages["combatTutorial"].features[2] = {name : 'PileOfRocks', x : 1, y : 1};
mappages["combatTutorial"].features[3] = {name : 'PileOfRocks', x : 1, y : 5};
mappages["combatTutorial"].features[4] = {name : 'PileOfRocks', x : 2, y : 9};
mappages["combatTutorial"].features[5] = {name : 'PileOfRocks', x : 2, y : 0};
mappages["combatTutorial"].features[6] = {name : 'PileOfRocks', x : 1, y : 2};
mappages["combatTutorial"].features[7] = {name : 'PileOfRocks', x : 0, y : 3};
mappages["combatTutorial"].features[8] = {name : 'PileOfRocks', x : 0, y : 4};
mappages["combatTutorial"].features[9] = {name : 'PileOfRocks', x : 1, y : 6};
mappages["combatTutorial"].features[10] = {name : 'PileOfRocks', x : 1, y : 7};
mappages["combatTutorial"].features[11] = {name : 'PileOfRocks', x : 1, y : 8};
mappages["combatTutorial"].features[12] = {name : 'PileOfRocks', x : 2, y : 10};
mappages["combatTutorial"].features[13] = {name : 'PileOfRocks', x : 1, y : 11};
mappages["combatTutorial"].features[14] = {name : 'PileOfRocks', x : 2, y : 12};
mappages["combatTutorial"].features[15] = {name : 'PileOfRocks', x : 3, y : 12};
mappages["combatTutorial"].features[16] = {name : 'PileOfRocks', x : 4, y : 12};
mappages["combatTutorial"].features[17] = {name : 'PileOfRocks', x : 5, y : 12};
mappages["combatTutorial"].features[18] = {name : 'PileOfRocks', x : 6, y : 11};
mappages["combatTutorial"].features[19] = {name : 'PileOfRocks', x : 7, y : 11};
mappages["combatTutorial"].features[20] = {name : 'PileOfRocks', x : 8, y : 12};
mappages["combatTutorial"].features[21] = {name : 'PileOfRocks', x : 9, y : 12};
mappages["combatTutorial"].features[22] = {name : 'PileOfRocks', x : 10, y : 11};
mappages["combatTutorial"].features[23] = {name : 'PileOfRocks', x : 10, y : 10};
mappages["combatTutorial"].features[24] = {name : 'PileOfRocks', x : 11, y : 8};
mappages["combatTutorial"].features[25] = {name : 'PileOfRocks', x : 11, y : 7};
mappages["combatTutorial"].features[26] = {name : 'PileOfRocks', x : 11, y : 6};
mappages["combatTutorial"].features[27] = {name : 'PileOfRocks', x : 10, y : 4};
mappages["combatTutorial"].features[28] = {name : 'PileOfRocks', x : 10, y : 3};
mappages["combatTutorial"].features[29] = {name : 'PileOfRocks', x : 11, y : 2};
mappages["combatTutorial"].features[30] = {name : 'PileOfRocks', x : 11, y : 1};
mappages["combatTutorial"].features[31] = {name : 'PileOfRocks', x : 10, y : 0};
mappages["combatTutorial"].features[32] = {name : 'PileOfRocks', x : 9, y : 0};
mappages["combatTutorial"].features[33] = {name : 'PileOfRocks', x : 8, y : 0};
mappages["combatTutorial"].features[34] = {name : 'PileOfRocks', x : 7, y : 1};
mappages["combatTutorial"].features[35] = {name : 'PileOfRocks', x : 6, y : 1};
mappages["combatTutorial"].features[36] = {name : 'PileOfRocks', x : 5, y : 1};
mappages["combatTutorial"].features[37] = {name : 'PileOfRocks', x : 4, y : 0};
mappages["combatTutorial"].features[38] = {name : 'PileOfRocks', x : 3, y : 0};


mappages["combatTutorial"].npcs = [];

mappages["combatTutorial"].desc = "Combat";
mappages["combatTutorial"].longdesc = ``;
mappages["combatTutorial"].music = 'Combat';
mappages["combatTutorial"].savename = `Combat`;
mappages["combatTutorial"].exitmap = 'tutorial1';
mappages["combatTutorial"].exitx = '8';
mappages["combatTutorial"].exity = '9';
mappages["combatTutorial"].wraps = 'None';
mappages["combatTutorial"].enterx = '6';
mappages["combatTutorial"].entery = '9';
mappages["combatTutorial"].seeBelow = '';
mappages["combatTutorial"].lightLevel = 'bright';
mappages["combatTutorial"].alwaysRemember = '0';
mappages["combatTutorial"].scale = '1';
mappages["combatTutorial"].underground = '0';
mappages["combatTutorial"].undergroundDesc = '';
mappages["combatTutorial"].enterscript = '';
mappages["combatTutorial"].entertestscript = '';
mappages["combatTutorial"].exitscript = '';
mappages["combatTutorial"].exittestscript = '';
mappages["combatTutorial"].returnmap = '';
mappages["combatTutorial"].returnx = 'NaN';
mappages["combatTutorial"].returny = 'NaN';
mappages["combatTutorial"].returninfused = '0';
mappages["combatTutorial"].automap = '0';
mappages["combatTutorial"].linkedMaps = ["tutorial1","tutorial2"];
mappages["combatTutorial"].editorLabels = '{}';
// MAP ENDS HERE

function EnterTutorial() {
  maps.addMap("tutorial1");
  MoveBetweenMaps(PC, PC.getHomeMap(), maps.getMap("tutorial1"),8,9);
  DUCamera.Draw(PC.getHomeMap(),8,9,PC);

  gamestate.setMode("anykey");
  targetCursor.tutorial = 1;

  maintext.addText("Greetings, " + PC.getPCName() + ", and welcome to Ellusus! First things first: when you see a [MORE] prompt, continue by pressing any key.");
  maintext.setInputLine("&gt; [MORE]");
  maintext.drawTextFrame();
}

function ContinueTutorial() {
  if (targetCursor.tutorial === 1) {
    DUPlaySound("sfx_crystal_use");
    maintext.addText("Excellent! Hello, my name is Avery, and I will be your tutor. I'm the... wait... this will be easier.");
  } else if (targetCursor.tutorial === 2) {
    targetCursor.avery = PC.getHomeMap().getTile(11,9).getTopNPC();
    ShowTurnFrame(targetCursor.avery);
    maintext.addText("There we go. How's that? Sometimes you will see these frames around someone. It means either they are taking their turn, or are part of a conversation.<br />The frames are blue around someone who is friendly, and red around a hostile.");
  } else if (targetCursor.tutorial === 3) {
    maintext.addText("Now, let us begin with the basics. To move, press the arrow keys.");
    HideTurnFrame();
    gamestate.setMode("player-tutorial");
    maintext.setInputLine("&gt;");
  } else if (targetCursor.tutorial === 4.5) {
    maintext.addText("When that happens, you can (L)ook at something on the screen- press L, then use the arrow keys to move the targetting cursor. Once it is over the tile you want to look at, press enter.");
    maintext.setInputLine("&gt;");
    targetCursor.tutorial = 4;
    whoseturn.endTurn();
  } else if (targetCursor.tutorial === 6) {
    DUPlaySound("sfx_crystal_use");
    maintext.addText("<br />Looking at things does not take time- it will still be your turn when you do so.");
    maintext.setInputLine("&gt; [MORE]");
    gamestate.setMode("anykey");
  } else if (targetCursor.tutorial === 7) {
    maintext.addText("Sometimes you need to take a closer look at something. To do that, you need to walk right up next to it.");
  } else if (targetCursor.tutorial === 8) {
    maintext.addText("Then you can (S)earch, and choose a direction to search in. This will find traps on chests, secret doors, and just hunt through a bookshelf for useful items. Give it a try.");
    gamestate.setMode("player-tutorial");
    maintext.setInputLine("&gt;");
  } else if (targetCursor.tutorial === 11) {
    maintext.addText("Now let's practice getting around some more. Let's talk about how to change maps, whether by going up stairs or down a ladder, or into a town, a cave, or a dungeon.");
    maintext.setInputLine("&gt; [MORE]");
    gamestate.setMode("anykey");
  } else if (targetCursor.tutorial === 12) {
    maintext.addText("LEAVING a map and returning to the world map is easy- there, you just have to walk off the edge of the map.");
  } else if (targetCursor.tutorial === 13) {
    maintext.addText("To move between maps, stand on the stairs, ladder, city, dungeon, or whatever, and press enter. Give it a try, in the corner of this room.");
    maintext.setInputLine("&gt;");
    whoseturn.endTurn();
  } else if (targetCursor.tutorial === 15) {
    maintext.addText("To Use a door, or anything else- throw a lever, read a book, light or douse a brazier- you hit U and then a direction. Use it to explore this floor.");
    maintext.setInputLine("&gt;");
    whoseturn.endTurn();
  } else if (targetCursor.tutorial === 17) {
    maintext.addText("To do this, hit (U)se but then hit Enter rather than choosing a direction. This will bring up an inventory screen, showing only the things that can be used.");
  } else if (targetCursor.tutorial === 18) {
    maintext.addText("Use arrow keys to move through your inventory, and hit Enter again when the Tan Potion is highlighted.");
    maintext.setInputLine("&gt;");
    whoseturn.endTurn();
  } else if (targetCursor.tutorial === 22) {
    maintext.addText("You can see that some of the commands are greyed out. As you play, you will learn how to use those.");
  } else if (targetCursor.tutorial === 23) {
    DUPlaySound("sfx_crystal_use");
    maintext.addText("One of those is the ability to cast spells, which requires you to have a spellbook. To give you the practice, let me give you one.");
    DU.gameflags.setFlag("spellbook",1);
    PC.addSpell(SPELL_FLAME_BLADE_LEVEL, SPELL_FLAME_BLADE_ID);
    PC.addSpell(SPELL_LIGHT_LEVEL, SPELL_LIGHT_ID);
  } else if (targetCursor.tutorial === 24) {
    maintext.addText("<span class='sysconv'>You have obtained a spellbook!</span>");
  } else if (targetCursor.tutorial === 25) {
    maintext.addText("When you press C to cast a spell, it will bring up your spellbook. Using the arrow keys you will select a spell, then hit Enter. You will then cast it, if you can. (You need to know the spell, be at least the spell's level, and have enough mana.) Try it now: cast Flame Blade.");
    maintext.setInputLine("&gt;");
    gamestate.setMode("player-tutorial");
  } else if (targetCursor.tutorial === 27) {
    DUPlaySound("sfx_crystal_use");
    maintext.addText("Another big one is (T)alk. This is how you'll progress through much of the game- getting information, a to-do list, buying, and selling.");
  } else if (targetCursor.tutorial === 28) {
    maintext.addText("If you are not on an overland map, hitting (T) will bring up a target cursor. It will let you choose anyone within 3 spaces of you to initiate a conversation with.");
  } else if (targetCursor.tutorial === 29) {
    maintext.addText("When you start talking to someone, they will usually greet you, and then you'll be prompted to choose something to say. Here you'll type entire words to continue the conversation.");
  } else if (targetCursor.tutorial === 30) {
    maintext.addText("There are a few keywords that all NPCs that will talk to you will have responses to. These are usually where you should start.");
  } else if (targetCursor.tutorial === 31) {
    maintext.addText("You can ask their NAME. Once they tell you, you'll remember it- if you (L)ook at them later, they will be described by name instead of just what they look like.");
  } else if (targetCursor.tutorial === 32) {
    maintext.addText("You can ask after their JOB. This isn't always what they are employed to do- it's more a shorthand for \"what do you do?\" Ask a blacksmith and you'll probably be told \"I'm a blacksmith\", but ask a child and you might be told \"I'm playing hide and seek!\".");
  } else if (targetCursor.tutorial === 33) {
    maintext.addText("Typing LOOK will tell you what you see when you look at them. Often this will repeat the first thing said when you initiate conversation, but not always.");
  } else if (targetCursor.tutorial === 34) {
    maintext.addText("Finally, saying BYE or just hitting Enter without typing anything else in will attempt to end the conversation.");
  } else if (targetCursor.tutorial === 35) {
    maintext.addText("Beyond the ones that work on everyone, merchants will respond to BUY, giving you a list of what they have to sell and allowing you to buy things. Most merchants will also respond to SELL, and you can sell them goods they are interested in.");
  } else if (targetCursor.tutorial === 36) {
    maintext.addText("But, obviously, that's not all you can say. Type anything you like, and see if they have a response. When they talk to you, if there is a topic they have more to say on, that word will show in <span style='color:cyan'>blue</span>.");
  } else if (targetCursor.tutorial === 37) {
    maintext.addText("Now, let's give it a whirl. Come talk to me.");
    maintext.setInputLine("&gt;");
    whoseturn.endTurn();
  } else if (targetCursor.tutorial === 39) {
    DUPlaySound("sfx_crystal_use");
    maintext.addText("But let's take a step back, now. I've given you a lot of pieces, but we should talk about the big picture.");
  } else if (targetCursor.tutorial === 40) {
    maintext.addText("There are two kinds of maps that you will be on in this game. You will start out on the overworld map. All other maps are \"zoomed in\" maps.");
  } else if (targetCursor.tutorial === 41) {
    maintext.addText("On the overworld map you'll see towns, dungeons, and other places to visit. Step on them and hit Enter to go in.");
  } else if (targetCursor.tutorial === 42) {
    maintext.addText("(This will take you to a zoomed-in map for that place, an entire map for what takes up one space on the overland map.");
  } else if (targetCursor.tutorial === 43) {
    maintext.addText("When you start, each step you take on the world map will take 5 minutes of time.");
  } else if (targetCursor.tutorial === 44) {
    maintext.addText("Also on the world map, you will see other creatures. Mostly these will be monsters, but sometimes they will be friendly.");
  } else if (targetCursor.tutorial === 45) {
    maintext.addText("Notably, when you see a creature graphic on the world map, it represents a group of creatures. When you interact with them, it will be a group of orcs, bandits, dragons, or what have you.");
  } else if (targetCursor.tutorial === 46) {
    maintext.addText("To interact with someone on the overworld, walk up next to them and (A)pproach, then press in their direction. (If you are next to them, they may get the jump and approach you first. Be warned.)");
  } else if (targetCursor.tutorial === 47) {
    maintext.addText("When you approach them, you will be taken to another map (a combat map, if it is an enemy).");
  } else if (targetCursor.tutorial === 48) {
    maintext.addText("On a zoomed-in map- any zoomed-in map!- the A key is now (A)ttack.");
  } else if (targetCursor.tutorial === 49) {
    maintext.addText("This is great in dungeons and on a combat map. In a town, well, you'd better know what you're doing. (Remember you can always hit ESC to exit out of a command you don't want to complete.)");
  } else if (targetCursor.tutorial === 50) {
    maintext.addText("It's time now to talk about combat, so let me take you to a combat map.");
  } else if (targetCursor.tutorial === 51) {
    let combatmap = maps.getMap("combatTutorial");
    MoveBetweenMaps(PC,PC.getHomeMap(),combatmap,6,8);
    DUPlaySound("sfx_teleport");
    DUCamera.Draw(combatmap,6,8);

    let sling = localFactory.createTile("Sling");
    PC.addToInventory(sling,1);
    sling.equipMe(PC);
  } else if (targetCursor.tutorial === 52) {
    maintext.addText("Now, we're going to do a simple fight against an orc. Here's an orc.");
  } else if (targetCursor.tutorial === 53) {
    let tutorc = localFactory.createTile("TutorialOrcNPC");
    let combatmap = maps.getMap("combatTutorial");
    combatmap.placeThing(6,4,tutorc);
    DUPlaySound("sfx_teleport");
    DUCamera.Draw(combatmap,6,8);
  } else if (targetCursor.tutorial === 54) {
    maintext.addText("Hey, orc. Say hi?");
  } else if (targetCursor.tutorial === 55) {
    let orc = PC.getHomeMap().getTile(6,4).getTopNPC();
    ShowTurnFrame(orc);
    maintext.addText("Orc says, \"Hey there. How's it going?\"");
  } else if (targetCursor.tutorial === 56) {
    maintext.addText("In combat, as everywhere else, you'll take turns. How quickly your next turn comes up is dictated primary by your Dexterity. Yes, this means you will sometimes go twice before your opponent goes once, if you're a lot faster!");
    HideTurnFrame();
  } else if (targetCursor.tutorial === 57) {
    maintext.addText("In most fights, you're going to (A)ttack frequently. Here's a high level overview of how that works.");
  } else if (targetCursor.tutorial === 58) {
    maintext.addText("When you (A)ttack, you will get a target cursor and will choose someone or something to attack. If you choose something next to you, you will attack with your equipped melee weapon. The higher your Strength, the better your chance to hit and the more bonus damage you'll deal if you do.");
  } else if (targetCursor.tutorial === 59) {
    maintext.addText("If you target something that it sarther away, you will attack with your equipped missile weapon, if you have one. The higher your Dexterity, the better your chance to hit. However, you can't make a missile attack if there is any enemy standing next to you.");
  } else if (targetCursor.tutorial === 60) {
    maintext.addText("Importantly, you can have both a melee and a missile weapon equipped at the same time. You don't need to juggle between them during the fight, you will just use whichever one is appropriate.");
  } else if (targetCursor.tutorial === 61) {
    maintext.addText("One thing you might want to do frequently during a fight is get a (B)attle Report. This doesn't take your turn- pressing B just brings up health bars for everyone else on screen, friend or foe.");
  } else if (targetCursor.tutorial === 62) {
    maintext.addText("Try fighting the orc now! You have a sling and a dagger as your missile and melee weapons.");
    maintext.setInputLine("&gt;");
    whoseturn.endTurn();
  } else if (targetCursor.tutorial === 64) {
    maintext.addText("Some chests are trapped. The higher your dexterity, the greater the chance that you will disarm the trap before it goes off. If you (S)earch the chest before opening it, there is a chance you'll find the trap in advance, which greatly increases your odds of disarming it.");
  } else if (targetCursor.tutorial === 65) {
    maintext.addText("Open this one, and try using (G)et (A)all to pick up the contents.");
    maintext.setInputLine("&gt;");
    whoseturn.endTurn();
  } else if (targetCursor.tutorial === 67) {
    maintext.addText("When you have enough XP to level, speak to the king or queen and they will raise your level and grant you 3 Training Points. Those you can spend with the court magician (to raise Intelligence) or the captain of the guard (to raise Dexterity or Strength). (There will be other ways to raise those stats, as well.)");
  } else if (targetCursor.tutorial === 68) {
    maintext.addText("Another form of progression is getting better gear. The short sword the orc had in that chest is an improvement over your dagger.");
  } else if (targetCursor.tutorial === 69) {
    maintext.addText("To equip new gear, hit (U)se and then press Enter to use from your inventory. Using a weapon or something you can wear (like armor or a ring) will equip it. Alternately, you can use the (R)eady commend- it's the same as Using from inventory but it only shows you equipment rather than showing you everything you can Use.");
  } else if (targetCursor.tutorial === 70) {
    maintext.addText("Notice that as you move the selection box from one piece of gear to another, the details window at the bottom will show you what it does. This will let you compare the average damage of various weapons, for example, to decide which is the best to use.");
  } else if (targetCursor.tutorial === 71) {
    maintext.addText("Go ahead and equip the short sword.");
    maintext.setInputLine("&gt;");
    whoseturn.endTurn();
  } else if (targetCursor.tutorial === 73) {
    DUPlaySound("sfx_teleport");
    MoveBetweenMaps(PC,PC.getHomeMap(),maps.getMap("tutorial1"),8,9);
    DUCamera.Draw(PC.getHomeMap(), PC.getx(), PC.gety(),PC);
  } else if (targetCursor.tutorial === 74) {
    maintext.addText("Congratulations, you've learned most of what you need to know to play through the game, now. I'll just briefly go over the last few commands we haven't touched on, and then you can go!");
  } else if (targetCursor.tutorial === 75) {
    maintext.addText("As you progress, you're going to want to see your stats. Hitting (Z) will bring up your character sheet, showing you what you have equipped and their stats, what effects are on you, and so on.");
  } else if (targetCursor.tutorial === 76) {
    maintext.addText("If you have a map of the area you're in, pressing (M) will bring that up.");
  } else if (targetCursor.tutorial === 77) {
    maintext.addText("Some things are light enough that you can (P)ush them around. A chair, a barrel, most items. If you try to push something and it can't move in that direction, you'll Pull it instead and switch places with it.");
  } else if (targetCursor.tutorial === 78) {
    maintext.addText("Sometimes you'll want time to pass. You can hit the spacebar to pass individual turns, but you can also (W)ait. You then specify how many hours to wait, or if you're above ground you can wait until sunrise.");
  } else if (targetCursor.tutorial === 79) {
    maintext.addText("Unless you have disabled it in the options, there is a Quest (J)ournal built in. You will still want to take notes, but you'll need to take fewer to keep track of what you're doing.");
  } else if (targetCursor.tutorial === 80) {
    maintext.addText("Speaking of options, ctrl-O brings up the options. (V) is a shortcut to toggle the music on and off, but you can also do that in the options, in addition to changing its volume.");
  } else if (targetCursor.tutorial === 81) {
    maintext.addText("Because S is taken up by (S)earch, you can save your game with Q, and loading your game is ctrl-L.");
  } else if (targetCursor.tutorial === 82) {
    maintext.addText("Finally, if you want to go into more detail about what you've learned in the tutorial, I strongly encourage you to read the Player Reference Guide. And, for that matter, the Almanac, to learn about the world you'll be adventuring in and what you'll find there.");
  } else if (targetCursor.tutorial === 83) {
    maintext.addText("To open either in your PDF viewer of choice, press D for (D)ocuments.");
  } else if (targetCursor.tutorial === 84) {
    maintext.addText("And that is everything from me! Feel free to wander around and play with things, and when you're done just head out the front door.");
    maintext.setInputLine("&gt;");
    whoseturn.endTurn();
  }
  maintext.drawTextFrame();
  targetCursor.tutorial++; 
}

ais.tutorial = function(who) {
  let retval = {fin:1};
  if (targetCursor.stepstaken && (targetCursor.stepstaken >= 3) && (targetCursor.tutorial <= 4)) {
    targetCursor.stepstaken++;
    targetCursor.tutorial = 4.5;
    DUPlaySound("sfx_crystal_use");
    maintext.addText("<br />As you move about a space, sometimes you will not be sure what something is.");
    maintext.setInputLine("&gt; [MORE]");
    gamestate.setMode("anykey");
    retval.wait = 1;
  } else if (targetCursor.tutorial === 9) {
    let mymap = who.getHomeMap();
    let fea = mymap.features.getAll();
    let foundpotion = 0;
    for (let i=0;i<fea.length;i++) {
      if (fea[i].getName() === "TanPotion") { foundpotion = 1; break; }
    }
    if (foundpotion) {
      DUPlaySound("sfx_crystal_use");
      maintext.addText("<br />Good! Next, (G)et that potion. The Get command accepts directions and also Enter, which will get something you are standing on.");
      targetCursor.tutorial = 10;
    }
  } else if (targetCursor.tutorial === 10) {
    if (PC.checkInventory("TanPotion")) {
      DUPlaySound("sfx_crystal_use");
      maintext.addText("<br />One other thing about the Get command- if you want to pick up a whole pile of things on the same tile, perhaps because you've opened a chest, you can hit (G)et, then (A) for \"All\", then choose a direction. You'll pick up everything there.");
      maintext.setInputLine("&gt; [MORE]");
      gamestate.setMode("anykey");
      targetCursor.tutorial = 11;
      retval.wait = 1;
    }
  } else if ((targetCursor.tutorial === 14) && (PC.getHomeMap().getName() === "tutorial2")) {
    DUPlaySound("sfx_crystal_use");
    maintext.addText("<br />To get around you'll need to know how to open doors. For that, you use the (U)se command.");
    maintext.setInputLine("&gt; [MORE]");
    gamestate.setMode("anykey");
    targetCursor.tutorial = 15;
    retval.wait = 1;
  } else if (targetCursor.tutorial === 16) {
    if ((PC.gety() <= 9) || (PC.getx() >= 10)) {
      DUPlaySound("sfx_crystal_use");
      maintext.addText("<br />In addition, you can, unsurprisingly, Use things from your inventory. For instance, you could drink that potion you found earlier.");
      maintext.setInputLine("&gt; [MORE]");
      gamestate.setMode("anykey");
      targetCursor.tutorial = 17;
      retval.wait = 1;
    }
  } else if (targetCursor.tutorial === 19) {
    if (PC.getSpellEffectsByName("IronFlesh")) {
      let ifpot = PC.getSpellEffectsByName("IronFlesh");
      ifpot.setExpiresTime(-1); // Don't let the Iron Flesh wear off
      if (PC.getHomeMap().getName() === "tutorial2") {
        DUPlaySound("sfx_crystal_use");
        maintext.addText("<br />Excellent! Now let's go back downstairs.");
        targetCursor.tutorial = 20;
      } else {
        DUPlaySound("sfx_crystal_use");
        maintext.addText("<br />We've gone through a lot so far, and there are more, so let's look at how you can get a reminder. Hitting ? on your turn will bring up a help screen, and won't take up your turn.");
        targetCursor.tutorial = 21;
      }
    }
  } else if (targetCursor.tutorial === 20) {
    if (PC.getHomeMap().getName() === "tutorial1") {
      DUPlaySound("sfx_crystal_use");
      maintext.addText("<br />We've gone through a lot so far, and there are more, so let's look at how you can get a reminder. Hitting ? on your turn will bring up a help screen, and won't take up your turn.");
      targetCursor.tutorial = 21;
    }
  } else if ((targetCursor.tutorial === 26) && (PC.getMana() !== PC.getMaxMana())) {
    if (PC.getSpellEffectsByName("FlameBlade")) {
      maintext.addText("<br />Perfect!");
    } else {
      maintext.addText("<br />Well, I told you to cast Flame Blade, but that'll do to help you learn how to cast spells.");
    }
    targetCursor.tutorial = 27;
    maintext.setInputLine("&gt; [MORE]");
    gamestate.setMode("anykey");
    retval.wait = 1;
  } else if (DU.gameflags.getFlag("tutor_talk")) {
    maintext.addText("<br />Excellent! This is going very well so far, I feel.");
    targetCursor.tutorial = 39;
    maintext.setInputLine("&gt; [MORE]");
    gamestate.setMode("anykey");
    DU.gameflags.deleteFlag("tutor_talk");
    retval.wait = 1;
  } else if (targetCursor.tutorial === 63) {
    let combatmap = maps.getMap("combatTutorial");
    if (!combatmap.npcs.getAll().length) {
      DUPlaySound("sfx_crystal_use");
      maintext.addText("<br />Enemies you defeat will often drop chests. (Human enemies will often leave corpses- (S)earching the corpses will turn up loot.) To open a chest, (U)se it, and it will disappear and be replaced with all of its contents.");
      targetCursor.tutorial = 64;
      maintext.setInputLine("&gt; [MORE]");
      gamestate.setMode("anykey");
      retval.wait = 1;
    }
  } else if (targetCursor.tutorial === 66) {
    let combatmap = maps.getMap("combatTutorial");
    let stuff = combatmap.features.getAll();
    for (let i=0;i<stuff.length;i++) {
      if (stuff[i].getName() !== "PileOfRocks") { return retval; }
    }
    DUPlaySound("sfx_crystal_use");
    if (PC.died) {
      maintext.addText("<br />Now let's talk character progression for a moment. If you had killed the orc, you would have noticed that you got XP (experience points) for killing it. You can also get XP for completing quests- it isn't all from violence. You start at level 1. You need 100 XP to reach level 2, and the required XP doubles each time you attain a level. The level cap is 8.");
    } else {
      maintext.addText("<br />Now let's talk character progression for a moment. For one thing, you'll have noticed that you got XP (experience points) for killing the orc. You can also get XP for completing quests- it isn't all from violence. You start at level 1. You need 100 XP to reach level 2, and the required XP doubles each time you attain a level. The level cap is 8.");
    }
    targetCursor.tutorial = 67;
    maintext.setInputLine("&gt; [MORE]");
    gamestate.setMode("anykey");
    retval.wait = 1;
  } else if (targetCursor.tutorial === 72) {
    if (PC.getEquipment("weapon").getName() === "Shortsword") {
      DUPlaySound("sfx_crystal_use");
      maintext.addText("<br />Now that you have a better weapon equipped, let's bring you back to your house. Note- normally, you will leave a combat map by either walking off the edge or, if there are no hostiles left, hitting ESC.");
      targetCursor.tutorial = 73;
      maintext.setInputLine("&gt; [MORE]");
      gamestate.setMode("anykey");
      retval.wait = 1;
    }
  }
  maintext.drawTextFrame();
  return retval;
}
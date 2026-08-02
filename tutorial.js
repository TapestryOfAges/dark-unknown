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


mappages["tutorial1"].npcs = [];
mappages["tutorial1"].npcs[0] = {name : 'TownsfolkVillagerNPC', x : 11, y : 9, NPCName: 'Avery', Desc: 'your tutor', Prefix: '', PeaceAI: 'tutorial', Conversation: 'tutorial', ConversationFlag: 'avery', Gender: 'male', Leash: 2, Bark: '0', NPCBand: '0', skintone: 1, wornlayers: '{"body":"BlueFancy","head":"ShortBlackPale","back":"","offhand":"OffhandPale","cloak":"","mainhand":"MainHandPale","realhead":"ShortBlackPale"}'};

mappages["tutorial1"].desc = "Tutorial";
mappages["tutorial1"].longdesc = `Tutorial Map`;
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
mappages["tutorial1"].linkedMaps = ["tutorial2"];
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
mappages["tutorial2"].npcs[0] = {name : 'TownsfolkVillagerNPC', x : 6, y : 11, NPCName: 'Avery', Desc: 'your tutor', Prefix: '', PeaceAI: 'tutorial', Conversation: 'tutorial-upstairs', ConversationFlag: 'avery', Gender: 'male', Leash: 2, Bark: '0', NPCBand: '0', skintone: 1, wornlayers: '{"body":"BlueFancy","head":"ShortBlackPale","back":"","offhand":"OffhandPale","cloak":"","mainhand":"MainHandPale","realhead":"ShortBlackPale"}'};

mappages["tutorial2"].desc = "Tutorial";
mappages["tutorial2"].longdesc = `Tutorial Map`;
mappages["tutorial2"].music = 'Village';
mappages["tutorial2"].savename = `tutorial`;
mappages["tutorial2"].exitmap = '';
mappages["tutorial2"].exitx = '65';
mappages["tutorial2"].exity = '70';
mappages["tutorial2"].wraps = '';
mappages["tutorial2"].enterx = '65';
mappages["tutorial2"].entery = '70';
mappages["tutorial2"].seeBelow = '';
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
mappages["tutorial2"].linkedMaps = ["tutorial1"];
mappages["tutorial2"].editorLabels = '{}';
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
  } else if (targetCursor.tutorial === 4) {
    maintext.addText("When that happens, you can (L)ook at something on the screen- press L, then use the arrow keys to move the targetting cursor. Once it is over the tile you want to look at, press enter.");
    maintext.setInputLine("&gt;");
    whoseturn.endTurn();
  } else if (targetCursor.tutorial === 6) {
    maintext.addText("Looking at things does not take time- it will still be your turn when you do so.");
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
    gamestate.setMode("player-tutorial");
    maintext.setInputLine("&gt;");
  } else if (targetcursor.tutorial === 15) {
    maintext.addText("To Use a door, or anything else- throw a lever, read a book, light or douse a brazier- you hit U and then a direction. Use it to explore this floor.");
    gamestate.setMode("player-tutorial");
    maintext.setInputLine("&gt;");
  } else if (targetCursor.tutorial === 17) {
    maintext.addText("To do this, hit (U)se but then hit Enter rather than choosing a direction. This will bring up an inventory screen, showing only the things that can be used.");
  } else if (targetCursor.tutorial === 18) {
    maintext.addText("Use arrow keys to move through your inventory, and hit Enter again when the Tan Potion is highlighted.");
    gamestate.setMode("player-tutorial");
    maintext.setInputLine("&gt;");
  } else if (targetCursor.tutorial === 22) {
    maintext.addText("You can see that some of the commands are greyed out. As you play, you will learn how to use those.");
  } else if (targetCursor.tutorial === 23) {
    maintext.addText("One of those is the ability to cast spells, which requires you to have a spellbook. To give you the practice, let me give you one.");
    DU.gameflags.setFlag("spellbook",1);
    PC.addSpell(SPELL_FLAME_BLADE_LEVEL, SPELL_FLAME_BLADE_ID);
  } else if (targetCursor.tutorial === 24) {
    maintext.addText("<span class='sysconv'>You have obtained a spellbook!</span>");
  } else if (targetCursor.tutorial === 25) {
    maintext.addText("When you press C to cast a spell, it will bring up your spellbook. Using the arrow keys you will select a spell, then hit Enter. You will then cast it, if you can. Try it now: cast Flame Blade.");
    gamestate.setMode("player-tutorial");
    maintext.setInputLine("&gt;");
  }
  maintext.drawTextFrame();
  targetCursor.tutorial++; 
}

ais.tutorial = function(who) {
  let retval = {fin:1};
  if (targetCursor.stepstaken && (targetCursor.stepstaken === 3)) {
    targetCursor.stepstaken++;
    targetCursor.tutorial = 4;
    maintext.addText("As you move about a space, sometimes you will not be sure what something is.");
    maintext.setInputLine("&gt; [MORE]");
    gamestate.setMode("anykey");
    retval.wait = 1;
  } else if (targetCursor.tutorial === 9) {
    let mymap = who.getHomeMap();
    let fea = mymap.features.getAll();
    let foundpotion = 0;
    for (let i=0;i<fea.length;i++) {
      if (fea[i].getName() === "YellowPotion") { foundpotion = 1; break; }
    }
    if (foundpotion) {
      maintext.addText("Good! Next, (G)et that potion. The Get command accepts directions and also Enter, which will get something you are standing on.");
      targetCursor.tutorial = 10;
    }
  } else if (targetCursor.tutorial === 10) {
    if (PC.checkInventory("TanPotion")) {
      maintext.addText("One other thing about the Get command- if you want to pick up a whole pile of things on the same tile, perhaps because you've opened a chest, you can hit (G)et, then (A) for \"All\", then choose a direction. You'll pick up everything there.");
      maintext.setInputLine("&gt; [MORE]");
      gamestate.setMode("anykey");
      targetCursor.tutorial = 11;
      retval.wait = 1;
    }
  } else if ((targetCursor.tutorial === 14) && (PC.getHomeMap().getName() === "tutorial2")) {
    maintext.addText("To get around you'll need to know how to open doors. For that, you use the (U)se command.");
    maintext.setInputLine("&gt; [MORE]");
    gamestate.setMode("anykey");
    targetCursor.tutorial = 15;
    retval.wait = 1;
  } else if (targetCursor.tutorial === 16) {
    maintext.addText("In addition, you can, unsurprisingly, Use things from your inventory. For instance, you could drink that potion you found earlier.");
    maintext.setInputLine("&gt; [MORE]");
    gamestate.setMode("anykey");
    targetCursor.tutorial = 17;
    retval.wait = 1;
  } else if (targetCursor.tutorial === 19) {
    if (PC.getSpellEffectsByName("IronFlesh")) {
      let ifpot = PC.getSpellEffectsByName("IronFlesh");
      ifpot.setExpiresTime(-1); // Don't let the Iron Flesh wear off
      if (PC.getHomeMap().getName() === "tutorial2") {
        maintext.addText("Excellent! Now let's go back downstairs.");
        targetCursor.tutorial = 20;
      } else {
        maintext.addText("We've gone through a lot so far, and there are more, so let's look at how you can get a reminder. Hitting ? on your turn will bring up a help screen, and won't take up your turn.");
        targetCursor.tutorial = 21;
      }
    }
  } else if (targetCursor.tutorial === 20) {
    maintext.addText("We've gone through a lot so far, and there are more, so let's look at how you can get a reminder. Hitting ? on your turn will bring up a help screen, and won't take up your turn.");
    targetCursor.tutorial = 21;
  } else if ((targetCursor.tutorial === 26) && (PC.getMana() !== PC.getMaxMana())) {
    if (PC.getSpellEffectByName("FlameBlade")) {
      maintext.addText("Perfect!");
    } else {
      maintext.addText("Well, I told you to cast Flame Blade, but that'll do to help you learn how to cast spells.");
    }
    targetCursor.tutorial = 27;
    maintext.setInputLine("&gt; [MORE]");
    gamestate.setMode("anykey");
    retval.wait = 1;
  }
  maintext.drawTextFrame();
  return retval;
}
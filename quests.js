'use strict';

class QuestLogEntry{
  constructor(qnum) {
    this.questnum = qnum;
    this.active = 0;
    this.completed = 0;
    this.replaced = 0;
  }
}

class Questlog {
  constructor() {
    this.log = [];
  }

  findQuest(questnum) {
    for (let i=0;i<this.log.length;i++) {
      if (this.log[i].questnum === questnum) { return i; }
    }
    return -1;
  }

  activate(questnum) {
    let logentry = this.findQuest(questnum);
    if (logentry === -1) {
      let entry = new QuestLogEntry(questnum);
      entry.active = 1;
      this.log.push(entry);

      if (questlist[questnum].replaces.length) {
        for (let i=0;i<questlist[questnum].replaces.length;i++) {
          let repentry = this.findQuest(questlist[questnum].replaces[i]);
          if (repentry !== -1) {
            this.log[repentry].replaced = 1;
            this.log[repentry].active = 0;
          } else {
            this.activate(questlist[questnum].replaced[i]);
            repentry = this.findQuest(questlist[questnum].replaces[i]);
            this.log[repentry].replaced = 1;
            this.log[repentry].active = 0;
          }
        }
      }
    } else if (questnum === 59) {
      // if you get quest 59 again, it's because you squandered your first Infinite Scroll and just got another one, so you just
      // get the same quest again.
      this.log[logentry].replaced = 0;
      this.log[logentry].active = 1;
      let secondtry = this.findQuest(61);
      if (secondtry !== -1) {
        this.complete(61); // complete it but only if you have it. Normally, calling to complete a quest you don't have yet gives
                           // it to you completed, and we don't want that here.
      }
    }
  }

  complete(questnum) {
    let logentry = this.findQuest(questnum);
    if (logentry === -1) {
      console.log("Trying to complete quest " + questnum + " without having begun it.");
      this.activate(questnum);
      logentry = this.findQuest(questnum);
    }
    this.log[logentry].active = 0;
    this.log[logentry].completed = 1;
  }

}

class Quest {
  constructor(replaces = "", name, source = "", location = "", text, completetext = "", category) {
    this.replaces = replaces;
    this.name = name;
    this.source = source;
    this.location = location;
    this.text = text;
    this.completetext = completetext;
    this.category = category;   // categories are main and side
    this.active = 0;
    this.completed = 0;
  }

  getName() {
    return this.name;
  }

  getLocation() { 
    return this.location;
  }

  getSource() {
    return this.source;
  }

  getText(texttype) {
    let txt;
    if (texttype === "completed") { txt = this.completetext; }
    else { txt = this.text; }
    const ifflag = /\<IFFLAG:(.*?)\>/;
    let matches = txt.match(ifflag);
    while (matches !== null) {
      if (DU.gameflags.getFlag(matches[1])) {
        txt = txt.replace(ifflag, "");
        txt = txt.replace(/\<\/IFFLAG\>/, "");
      } else {
        txt = txt.replace(/\<IFFLAG.*?\<\/IFFLAG\>/, "");
      }
      matches = txt.match(ifflag);
    }

    const ifnot = /\<IFNOT:(.*?)\>/;
    matches = txt.match(ifnot);
    while (matches !== null) {
      if (!DU.gameflags.getFlag(matches[1])) {
        txt = txt.replace(ifnot, "");
        txt = txt.replace(/\<\/IFNOT\>/, "");
      } else {
        txt = txt.replace(/\<IFNOT.*?\<\/IFNOT\>/, "");
      }
      matches = txt.match(ifnot);
    }

    const ifitem = /\<IFITEM:(.*?)\>/;
    matches = txt.match(ifitem);
    while (matches !== null) {
      if (PC.checkInventory(matches[1])) {
        txt = txt.replace(ifitem, "");
        txt = txt.replace(/\<\/IFITEM\>/, "");
      } else {
        txt = txt.replace(/\<IFITEM.*?\<\/IFITEM\>/, "");
      }
      matches = txt.match(ifitem);
    }

    return txt;
  }

  getCategory() {
    return this.category;
  }

}

let questlog = new Questlog();

let questlist = [];

questlist[0] = new Quest([], "Beginning", "A Messenger", "Your home", `Your father has called you back to Castle dea Olympus, and wishes to speak with you as soon as may be.`, ``, "main");
questlist[1] = new Quest([0], "Preventing a War", "King Daragen", "Castle dea Olympus", `Your brother is in rebellion. Find out why... and bring the threat to an end before it can start. <IFFLAG:shel_changed>Your mother thinks you should ask those who might know if he has changed.</IFFLAG>`, `You have saved your brother, and prevented a war.`, "main");
questlist[2] = new Quest([], "The Rune of Kings", "King Daragen", "Castle dea Olympus", `Journey to the Pit of Despair, and find the Rune of Kings.`, `You have been marked by the Rune of Kings.`, "main");
questlist[3] = new Quest([], "To Earn a Spellbook", "Jharden", "Castle dea Olympus", `Jharden needs an executioner's hood from the healer in Naurglen.`, `You brought Jharden the executioner's hood he asked for, and received a spellbook.`, "main");
questlist[4] = new Quest([], "Nyrani's Shield", "Nyrani", "Castle dea Olympus", `Fetch Nyrani's shield from the armorsmith in Hildendain.`, `You've brought Nyrani her shield.`, "main");
questlist[5] = new Quest([], "A Cave Near the Coast", "Erin", "Hildendain", `Trade is being threatened by monsters in a cave. Erin has asked you to ask Nyrani to do something about it.`, `The monsters in the cave are slain.`, "side");
questlist[6] = new Quest([], "Fall of Targion", "Olivia", "Castle dea Olympus", `Olivia in Castle dea Olympus is looking for the book Fall of Targion, which is probably in the Tower of Toshin.`, `You found the book for Olivia.`, "side");
questlist[7] = new Quest([], "Reports for the Chancellor", "Tyler", "Castle dea Olympus", `Chancellor Tyler asked that you get reports from the leaders of Swainhil, Clear Lake, and Beldskae.<IFITEM:ClearLakeReport><br />You acquired the report from Clear Lake.</IFITEM><IFITEM:SwainhilReport><br />You have acquired the report from Swainhil.</IFITEM><IFITEM:BeldskaeReport><br />You have acquired the report from Beldskae.</IFITEM>`, `You have brought the reports to the Chancellor.`, "side");
questlist[8] = new Quest([], "Interrogate a Prisoner", "King Daragen", "Castle dea Olympus", `Speak to a recently captured prisoner, in the prison beneath the castle. The prison is behind a secret door in the north wall of the basement hallway.`, `You have spoken with Rose, the prisoner.`, "main");
questlist[9] = new Quest([5], "A Cave Near the Coast", "Erin and Nyrani", "Hildendain", `Trade is being threatened by monsters in a cave southwest of the castle. Nyrani has charged you with eliminating them.`, `The monsters in the cave are slain.`, "side");
questlist[10] = new Quest([], "Talk to a Friend", "Sarah", "Hildendain", `Find Arthur, in Poverty, and ask him of his time as a guard in Onyx.`, `You've spoken with Arthur.`, "main");
questlist[11] = new Quest([], "Seeking a Recipe", "Rhiannon", "Hildendain", `Rhiannon is looking for some way to attract customers to her tavern, perhaps a unique recipe.`, `You brought Rhiannon a recipe to help her tavern take off!`, "side");
questlist[12] = new Quest([], "Franklin's Debt", "Franklin", "Hildendain", `Franklin owes a debt to Allan in Beldskae. He hasn't asked you to do anything about it, but perhaps you will think of a way.`, `You have paid off Franklin's debt to Allan.`, "side");
questlist[13] = new Quest([20], "Joining the Paladins", "Isaac", "Swainhil", `If you would like to join the paladins, you must first undertake a trial. Find the man called 'Warduke' and bring him to Justice. <IFNOT:yelena_warduke>Travel to Hildendain and speak to Yelena.</IFNOT><IFFLAG:yelena_warduke>He is somewhere in Hildendain, likely in the old tunnels. Search the town for secret rooms that might access the tunnels.</IFFLAG>`, `You have defeated Warduke and completed the first trial to become a Paladin.`, "side");
questlist[14] = new Quest([], "Reaper Bark", "Asharden", "Asharden's Tower", `To the southwest, in the Lower Fang Mountains, there is a mine. Find and bring back the bark of a petrified reaper, and Asharden will present you with a spellbook.`, `You have brought Asharden the petrified reaper bark, and received a stronger spellbook.`, "main");
questlist[15] = new Quest([], "Find More Executioner's Hood", "Hazel", "Naurglen", `If you run across more executioner's hood, Hazel could use some.`, `She can always use more.`, "side");
questlist[16] = new Quest([], "Kyvek's Debt", "Kyvek", "Nauglen", `King Daragen owes a debt to Kyvek. Kyvek has asked you to remind him of it.`, `You have arranged for Kyvek to be repaid.`, "side");
questlist[17] = new Quest([], "Bring Robert a Map", "Garen", "Clear Lake", `Garen has asked you to bring a map to Robert in Clear Lake.`, `You've brought Garen's map to Robert.`, "side");
questlist[18] = new Quest([], "Bring a Rock to Garen", "Robert", "Clear Lake", `After receiving a map, Robert has asked you to bring a small rock back to Garen in Naurglen.`, `You're brought Garen a small rock.`, "side");
questlist[19] = new Quest([], "Find Siri's Cloak", "Warren", "Naurglen", `Travel to Dungeon Shadow and find where Warren and Garen's companion, Siri, fell. Recover the cloak she was wearing and bring it back to Warren.`, `You've returned Siri's cloak to Warren.`, "side");
questlist[20] = new Quest([], "Joining the Paladins", "Amaeryl", "Naurglen", `If you would like to join the Paladins, find Isaac in Swainhil and ask him of the Order.`, `You have spoken to Isaac.`, "side");
questlist[21] = new Quest([], "Looking for Sam", "Julian", "Clear Lake", `Julian is worried that his niece Sam is missing. She was last seen with her friend Maggie, who Julian hopes you'll find to ask about it.`, `You've found Sam.`, "side");
questlist[22] = new Quest([21], "Looking for Sam", "Maggie", "Clear Lake", `Maggie and her friend Sam were exploring a cave to the east of town, and Maggie got scared and ran home. She begs you to go find Sam and bring her home safely.`, `You've found Sam.`, "side");
questlist[23] = new Quest([], "Learning about Lance", "Arthur", "Poverty", `Arthur has suggested that you find Xavier, in Onyx, and ask him for his theory, and tell him that Arthur sent you.`, `You have spoken to Xavier about his theory.`, "main");
questlist[24] = new Quest([], "Teacher of Magic", "Ivan", "Poverty", `Ivan, a young apprentice wizard, encourages you to seek out his teacher, if magic is your dream. Follow the road to the east, but turn south into the woods of Claw Valley, to find the tower of Asharden.`, `You have met Asharden and gotten past his door.`, "main");
questlist[25] = new Quest([], "Damien's Regards", "Damien", "Poverty", `Damien asks if you could say hello to Anna for him, if you meet her.`, `You've called Damien to Anna's attention.`, "side");
questlist[26] = new Quest([], "Brooke's Regards", "Brooke", "Poverty", `Brooke <IFFLAG:damien_anna>also </IFFLAG>asks if you could tell Anna she is thinking of her, if you meet her.`, `You've called Brooke to Anna's attention.`, "side");
questlist[27] = new Quest([], "Rebuilding Poverty", "Kelly", "Poverty", `Bring to the King a request from Kelly of Poverty that he fund improvements to Poverty.`, `You have brought Kelly's request to the King, and he has heard you.`, "side");
questlist[28] = new Quest([27], "Rebuilding Poverty", "Kelly", "Poverty", `Once the war is over, return to the King to repeat the request from Kelly of Poverty that he fund improvements to Poverty.`, `You have brought Kelly's request to the King, and he has heard you.`, "side");
questlist[29] = new Quest([], "Policy Decisions", "King Daragen", "Castle dea Olympus", `You have relayed to him the request to rebuild Poverty, and he has informed you that to pay for it would take funds away from repairing and protecting the roads. He has made it your decision, as heir- when you have chosen, tell him you have decided.`, `<IFFLAG:rebuild_poverty>You have chosen to rebuild Poverty.</IFFLAG><IFFLAG:rebuild_no>You have chosen to instead fund guards for the roads.</IFFLAG>`, "side");
questlist[30] = new Quest([], "Join the Loyalists", "Xavier", "Onyx", `Xavier has encouraged you to join the Loyalists, a group still loyal to the King and Queen. Find Dawne, and tell her you are loyal.`, `You have spoken to Dawne and professed your loyalty.`, "main");
questlist[31] = new Quest([], "Ambush a Courier", "Dawne", "Onyx", `To prove yourselves to the Loyalists, you must ambush a courier carrying messages between Onyx and Black Dragon Castle. Bring the letter pouch he carries to Dawne.`, `You have successfully ambushed the courier and proven yourself to the loyalists, and were given their password: 'serene'.`, "main");
questlist[32] = new Quest([], "The Next Step in the Loyalists", "Dawne", "Onyx", `You've proved yourself worthy, now go speak to Heather and give her the password: 'serene'.`, `You have spoken to Heather as a loyalist.`, "main");
questlist[33] = new Quest([], "Infiltrating the Trusted", "Heather", "Onyx", `You have learned that Lance's inner circle is known as the Trusted. Heather has given you the plans to make the Trusted pin, which identifies members- bring them to Colin in Clear Lake to have one made, and bring it back to Heather.`, `You have acquired a Trusted pin.`, "main");
questlist[34] = new Quest([], "Testing Your Trusted Cover", "Heather", "Onyx", `You have the pin that the Trusted wear. Will it be enough? Speak to Aithne and see what he makes of you.`, `The pin has you welcomed as one of the Trusted.`, "main");
questlist[35] = new Quest([], "A Man on the Inside", "Heather", "Onyx", `Go back to Black Dragon Castle and talk to Taran, and give him the loyalist password. He may know what needs to be done next.`, `You have spoken to Taran in Black Dragon Castle.`, "main");
questlist[36] = new Quest([], "A Letter for Lance", "Aithne", "Onyx", `Trusting you, Aithne has given you a letter to deliver directly to the hand of Lance and no other. Bring it to him in Black Dragon Castle.`, `You have brought the letter to Lance.`, "main");
questlist[37] = new Quest([], "Joining the Guild of Hands", "Carol", "Onyx", `If you would like to join the Guild of Hands, bring Carol back a handful of small gemstones.`, `You have joined the Guild of Hands in Onyx.`, "side");
questlist[38] = new Quest([], "Check on Aara", "Lance", "Black Dragon Castle", `The letter from Aithne informed Lance that his good friend Aara has been imprisoned under Castle dea Olympus. He asks that you check and make sure she is ok.`, `You have reported back to Lance that Aara is safe and well.`, "main");
questlist[39] = new Quest([], "Return to Heather", "Heather", "Onyx", `Now that you have performed the task for Aithne and confirmed that you can get into Black Dragon Castle, it is time to return to Heather and report.`, `You have checked in with Heather of the Loyalists.`, "main");
questlist[40] = new Quest([], "Bardic Lore", "Taran", "Black Dragon Castle", `Taran theorizes that Lance is controlled by magic. Taran has heard court wizard Justice speak of a thing called the Brilliant Pool, which can duplicate the effect of any spell. If anyone knows anything about it, it would be the Bards. Ask them what they know.`, `You have started on the path of learning about the Brilliant Pool.`, "main");
questlist[41] = new Quest([], "Adelus's Letter", "Markus", "Swainhil", `The Bards think that the best place to look for information about the Brilliant Pool would be in the Spire of Natassa.<br />The Spire is in a dungeon in the Crown Mountains. There was a bard who had been Natassa's lover for much of her late life, and they have a letter to him with instructions on how to get through the obstacles in the dungeon- speak to Sirius to get the letter.`, `You have gotten Natassa's letter to Adelus.`, "main");
questlist[42] = new Quest([], "Joining the Bardic Guild", "Markus", "Swainhil", `If you would like to join the Bards, speak with Alison upstairs in the Bardic Hall and tell her so.`, `You have started the process of joining the Bards.`, "side");
questlist[43] = new Quest([], "Finding Natassa's Spire", "Markus", "Swainhil", `The Bards think that the best place to look for information about the Brilliant Pool would be in the Spire of Natassa.<br />The Spire is in a dungeon in the Crown Mountains. There was a bard who had been Natassa's lover for much of her late life, and they have a letter to him with instructions on how to get through the obstacles in the dungeon. This letter is now in your possession.`, `You have found Natassa's notes on the Brilliant Pool.`, "main");
questlist[44] = new Quest([], "Seeking the Brilliant Pool", "Natassa?", "Natassa's Research", `The Brilliant Pool moves, and could be under the city of Onyx, in the ruins of Hildendain, or in the dungeon Mt Drash. Her knowledge is incomplete- there is something more needed, to properly use it. Your next step is up to you.`, `You have found the Brilliant Pool.`, "main");
questlist[45] = new Quest([], "Joining the Bards: Music", "Alison", "Swainhil", `Find Simon, and show him your proficiency in music.`, `You have passed the test of music.`, "side");
questlist[46] = new Quest([], "Joining the Bards: Helping Olivia", "Alison", "Swainhil", `Travel to Castle dea Olympus and find Olivia there, and offer her your help in her searches.`, `You've found Olivia and heard what help she needs.`, "side");
questlist[47] = new Quest([], "Joining the Bards: Olivia Helped", "Olivia", "Castle dea Olympus", `You've helped Olivia- return to Alison to report your progress.`, `Alison has appraised your progress.`, "side");
questlist[48] = new Quest([], "Joining the Bards: Return to Markus", "Alison", "Swainhil", `You've accomplished all the tasks that Alison set out for you. Return to Markus to join the Bardic Guild.`, `Markus has inducted you into the Bardic Guild.`, "side");
questlist[49] = new Quest([], "Joining the Paladins: Warduke's Defeat", "Isaac", "Swainhil", `You have defeated Warduke. Return to Isaac in Swainhil.`, `You have passed your first major trial towards joining the Paladins.`, "side");
questlist[50] = new Quest([], "Joining the Paladins: Do Good", "Isaac", "Swainhil", `Now that you have defeated Warduke, Isaac has presented the next challenge: do good. Be a good person. The Paladins will be watching, and will send a messenger to you if they feel you have passed the test.`, `The Paladins have chosen to welcome you!`, "side");
questlist[51] = new Quest([], "Joining the Paladins: Acceptance", "Isaac", "Swainhil", `Return to Isaac in Swainhil to be formally inducted into the Paladins.`, `You are a member of the Paladins!`, "side");
questlist[52] = new Quest([51], "Join the Paladins", "Isaac", "Swainhil", `Isaac has accepted you into the Paladins. He asks you to wait two hours and then meet him in the tower in the southeast corner of Swainhil for your initiation.`, `You are a member of the Paladins!`, "side");
questlist[53] = new Quest([], "The Infinite Scroll", "Toshin?", "Toshin's Journal", `To utilize the Brilliant Pool without dying requires an Infinite Scroll. Toshin did not know how to make one, but some still exist- she considered asking in the Thief's Guild in Onyx, but considered it more likely she would find information about it in Beldskae.`, `You tracked down some information about the Infinite Scroll in Beldskae.`, "main");
questlist[54] = new Quest([], "Franklin's Banishment", "Allan", "Beldskae", `While you have redeemed Franklin's debt, he is still banished from Beldskae on pain of arrest. To do something about that, you will have to speak with the mayor, Denise.`, ``, "side");
questlist[55] = new Quest([54], "Franklin's Banishment", "Denise", "Beldskae", `You've spoken to Denise, but she is firm that if he returns, he will be jailed or worse. Perhaps you can find something that will provide you with the leverage you need. <IFFLAG:chit_tip>You've heard a rumor that the guard Kalli has one of Denise's chits...</IFFLAG>`, ``, "side");
questlist[56] = new Quest([55], "Franklin's Banishment", "Denise", "Beldskae", `You've spoken to Denise about Franklin's debt and banishment, but she is firm that if he returns, he will be imprisoned or worse. However, you now have her favor chit...`, `Franklin's banishment has been lifted, and he may now safely return to Beldskae.`, "side");
questlist[57] = new Quest([], "Paying for the Infinite Scroll", "Conrad", "Beldskae", `Conrad of Beldskae claims to have an Infinite Scroll, but will only trade it for a piece of art made of voidstone, a rare material mined on the Isle of Lost Hope. He suggests you try the Lady Judge of Clear Lake, a collector of rare art.`, `You've traded a voidstone scupture for an Infinite Scroll.`, "main");
questlist[58] = new Quest([], "Finding Voidstone Art", "Flora", "Clear Lake", `Lady Flora of Clear Lake does not have any voidstone art. She told you where voidstone was found- in a mine near the Gate between Ellusus and the Isle of Lost Hope. You may have to find a way there.`, `You found a voidstone sculpture on the Isle of Lost Hope.`, "main");
questlist[59] = new Quest([], "Using the Infinite Scroll", "-", "-", `You have acquired an Infinite Scroll. Find the Brilliant Pool, and use it to generate a scroll capable of casting the spell Negate Magic.`, `You have successfully used the Pool and created the scroll you need.`, "main");
questlist[60] = new Quest([], "Free Your Brother", "-", "-", `With the Infinite Scroll holding the power of Negate Magic, you can finally free your brother Lance from the mind control, if mind control it is. Return to him and read the scroll while near him.`, `You have broken the mind control on your brother and ended the threat of civil war.`, "main");
questlist[61] = new Quest([], "Get Another Infinite Scroll", "-", "-", `You have squandered the power of the Infinite Scroll. You guess you'd better go find Conrad and see if he has another one. This will probably be very, very expensive.`, `You have obtained a second Infinite Scroll. Don't waste this one.`, "main");
questlist[62] = new Quest([], "Find the Book of Lore", "Arlan", "Toshin's Tower", `Arlan has offered to give you a copy of the notes he has found in Toshin's Tower on Empowerment. But first, he asks that you find a book Toshin was known to have: the Book of Lore. He believes she had it with her when she went to Mt Drash.`, `You brought Arlan the Book of Lore, and received the notes on the Empower spell.`, "main");
questlist[63] = new Quest([], "Planar Travel Notes", "Eshkaz", "Consolation", `Bring the book of notes on planar travel to Asharden.`, `You have brought Eshkaz's notes on planar travel to Asharden.`, "side");
questlist[64] = new Quest([], "Find the Time of Sight", "Ashlin", "Consolation", `Before she will tell you of the Oracle, Ashlin requires that you bring her a book called the Tome of Sight.`, `You have brought Ashlin the Tome and learned what she knows of the Oracle.`, "main");
questlist[65] = new Quest([], "Learn Infusion", "Ladonna", "Consolation", `Ladonna has instructed you in what you will need to do to demonstrate the technique known as infusion.<br />She has given you a broken arrow, and instructed you to stand within the 4 fields of energy. While there, infusion is more accessible, so infuse the Mend spell to fix the arrow, and return it to her.<br />(As a reminder, you can try to infuse by pressing (I) rather than (C) when casting a spell.)`, `You have mastered the technique of infusion!`, "main");
questlist[66] = new Quest([], "Entry to Consolation", "Ashlin", "Consolation", `Ashlin has put forth a challenge- cast a spell, any spell, while she watches, to prove that you are a magician. If you are, she will admit you to the Tower of Consolation.`, `You have gained admittance to the Tower of Consolation.`, "main");
questlist[67] = new Quest([], "Lance's Collapse", "Taran", "Black Dragon Castle", `Prince Lance has collapsed, after the dragon's defeat, and cannot be roused. Go to your parents and ask them if they can apply their powers of healing.`, ``, "main");
questlist[68] = new Quest([], "Derek's Pony", "Derek", "Naurglen", `Derek's pony, Faithful, is foundering. He could use the name of a good farrier- return to him if you know of one.`, `You've given Derek the name of a reputable farrier who can help Faithful.`, "side");
questlist[69] = new Quest([], "War Wizard's Tower", "Dave", "Hildendain", `Dave's uncle stole a magic ring from the family, and fled east with it. He was said to be intrigued by stories of an ancestor, a war wizard who had built a tower somewhere near Beldskae. <IFFLAG:megan_mentioned_tower>Megan, in Beldskae, mentioned a tower to the northeast of that city, through a cave, that had been taken over by trolls.</IFFLAG>`, `You have found the magic ring stolen by Dave's uncle.`, "side");
questlist[70] = new Quest([], "Naurglen's Health", "Hazel", "Naurglen", `Hazel asks that you check on the health of: Warren and Garen, often in the tavern; Dora, who lives in the NE corner of town; and Kylee, whose farm is along the south edge.<IFFLAG:health_garen><br />You have asked Garen.</IFFLAG><IFFLAG:health_warren><br />You have asked Warren.</IFFLAG><IFFLAG:health_dora><br />You have asked Dora.</IFFLAG><IFFLAG:health_kylee>You have asked Kylee.</IFFLAG>`, `You checked up on everyone in Naurglen, and got some executioner's hood for Jharden.`, "main");
questlist[71] = new Quest([67], "Lance's Collapse", "Taran", "Black Dragon Castle", `Prince Lance has collapsed, after the dragon's defeat, and cannot be roused. Using the Rune of Kings, you should be able to rouse him from his slumber.`, `You've awakened your brother from his collapse following the defeat of the black dragon.`, "main");
questlist[72] = new Quest([], "Letter from Rhys", "Lance", "Black Dragon Castle", `Lance has asked you to go back to Castle dea Olympus and open the box in his room, and bring back the letter from his friend Rhys that is within. <IFITEM:RhysLetter><br />You have found the letter and should bring it to Lance.</IFITEM>`, `You have brought Lance the letter he asked for.`, "main");
questlist[73] = new Quest([], "Search Rhys's house", "Lance", "Black Dragon Castle", `Go to Clear Lake and search Rhys's house, thoroughly. See if you can find a clue to his whereabouts.`, `You found a secret passage, and Rhys.`, "main");
questlist[74] = new Quest([], "Notes on Other Runes", "Lance", "Black Dragon Castle", `Lance has notes on Runes besides the Rune of Kings. They are in his sanctum, off his bedroom; the key he gave you will give you access.`, `You found the book of notes.`, "main");
questlist[75] = new Quest([], "Confront Justice", "Rhys", "Dungeon Shadow", `Return to Black Dragon Castle and confront Justice. Tell her you know of the cult and the dark. And be ready for anything.`, `You have defeated Justice and drove her to flee.`, "main");
questlist[76] = new Quest([], "Stone of Conflagrations", "Rhys", "Black Dragon Castle", `Go to the dungeon to the southwest, in the Wilding Mountains, and seek the Stone of Conflagrations, then return to Rhys and Lance.`, `You have brought them the Stone they need for the ritual.`, "main");
questlist[77] = new Quest([], "Riddled With Vice?", "A Daemon", "Black Dragon Castle", `The summoned daemon claimed that the Shepherd of Dark would bring forth daemons in "the place most riddled with vice", and that it was "already almost too late to save." What did it mean?`, `You have discovered the fate of Beldskae.`, "main");
questlist[78] = new Quest([], "Learn More", "Rhys", "Black Dragon Castle", `You must learn more about the daemons and how to stop them. You must find a source of information.`, `You've found a lead...`, "main");


// verbage for reference guide:
// Not everything that you might think of as a "quest" will go in the log. And those that do, you will still need to take notes-
// it will not remember and remind you of every step. To illustrate with a hypothetical: Bob tells you that there is a troll living
// under the bridge, and it keeps eating his goats. He asks you to get Sir Galahad to deal with it. A quest appears in your log:
// "Trolls! Make sure that the troll under the bridge is dealt with." You speak with Galahad, who says he's busy, but he'll give you
// a nice magic sword if you take care of the troll yourself.
// In another game, the initial log entry might say "Talk to Sir Galahad about the troll under the bridge," and then when you do, the
// description might change to say "Take care of the troll yourself." Here, though, the quest log is just to remind you what you're
// doing, and the details are up to you to keep track of.
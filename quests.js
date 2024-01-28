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
          }
        }
      }
    }
  }

  complete(questnum) {
    let logentry = this.findQuest(questnum);
    if (logentry === -1) {
      console.log("Trying to complete quest " + questnum + " without having begun it.");
    }
    this.log[logentry].active = 0;
    this.log[logentry].complete = 1;
  }

}

class Quest {
  constructor(replaces, name, source, location, text, completetext, category) {
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
    if (texttype === "completed") { txt = this.completedtext; }
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
      matches = txt.match(ifno);
    }

    return txt;
  }

  getCategory() {
    return this.category;
  }

}

let questlog = new Questlog();

let questlist = [];

questlist[0] = new Quest([], "Beginning", "A Messenger", "Your home", "Your father has called you back to Castle dea Olympus, and wishes to speak with you as soon as may be.", "", "main");
questlist[1] = new Quest([0], "Preventing a War", "King Daragen", "Castle dea Olympus", "Your brother is in rebellion. Find out why... and bring the threat to an end before it can start. <IFFLAG:shel_changed>Your mother thinks you should ask those who might know if he has changed.</IFFLAG>", "You have saved your brother, and prevented a war.", "main");
questlist[2] = new Quest([], "The Rune of Kings", "King Daragen", "Castle dea Olympus", "Journey to the Pit of Despair, and find the Rune of Kings.", "You have been marked by the Rune of Kings.", "main");
questlist[3] = new Quest([], "To Earn a Spellbook", "Jharden", "Castle dea Olympus", "Jharden needs an executioner's hood from the healer in Naurglen.", "You brought Jharden the executioner's hood he asked for.", "main");
questlist[4] = new Quest([], "Nyrani's Shield", "Nyrani", "Castle dea Olympus", "Fetch Nyrani's shield from the armorsmith in Hildendain.", "You've brought Nyrani her shield.", "main");
questlist[5] = new Quest([], "A Cave Near the Coast", "Erin", "Hildendain", "Trade is being threatened by monsters in a cave. Erin has asked you to ask Nyrani to do something about it.", "The monsters in the cave are slain.", "side");
questlist[6] = new Quest([], "Fall of Targion", "Olivia", "Castle dea Olympus", "Olivia in Castle dea Olympus is looking for the book Fall of Targion, which is probably in the Tower of Toshin.", "You found the book for Olivia.", "side");
questlist[7] = new Quest([], "Reports for the Chancellor", "Tyler", "Castle dea Olympus", "Chancellor Tyler asked that you get reports from the leaders of Swainhil, Clear Lake, and Beldskae.", "You have brought the reports to the Chancellor.", "side");
questlist[8] = new Quest([], "Interrogate a Prisoner", "King Daragen", "Castle dea Olympus", "Speak to a recently captured prisoner, in the prison beneath the castle. The prison is behind a secret door in the north wall of the basement hallway.", "main");
questlist[9] = new Quest([5], "A Cave Near the Coast", "Erin and Nyrani", "Hildendain", "Trade is being threatened by monsters in a cave southwest of the castle. Nyrani has charged you with eliminating them.", "The monsters in the cave are slain.", "side");
questlist[10] = new Quest([], "Talk to a Friend", "Sarah", "Hildendain", "Find Arthur, in Poverty, and ask him of his time as a guard in Onyx.", "You've talked to Arthur", "main");
questlist[11] = new Quest([], "Seeking a Recipe", "Rhiannon", "Hildendain", "Rhiannon is looking for some way to attract customers to her tavern, perhaps a unique recipe.", "You brought Rhiannon a recipe to help her tavern take off!", "side");
questlist[12] = new Quest([], "Franklin's Debt", "Franklin", "Hildendain", "Franklin owes a debt to Allan in Beldskae. He hasn't asked you to do anything about it, but perhaps you will think of a way.", "You have relieved Franklin of his debt.", "side");
questlist[13] = new Quest([], "Joining the Paladins", "Isaac", "Swainhil", "If you would like to join the paladins, you must first undertake a trial. Find the man called 'Warduke' and bring him to Justice. <IFNOT:yelena_warduke>Travel to Hildendain and speak to Yelena.</IFNOT><IFFLAG:yelena_warduke>He is somewhere in Hildendain, likely in the old tunnels. Search the town for secret rooms that might access the tunnels.</IFFLAG>", "You have defeated Warduke and completed the first trial to become a Paladin.", "side");
questlist[14] = new Quest([], "Reaper Bark", "Asharden", "Asharden's Tower", "To the southwest, in the Lower Fang Mountains, there is a mine. Find and bring back the bark of a petrified reaper, and Asharden will present you with a spellbook.", "You have brought Asharden the petrified reaper bark.", "main");

// verbage for reference guide:
// Not everything that you might think of as a "quest" will go in the log. And those that do, you will still need to take notes-
// it will not remember and remind you of every step. To illustrate with a hypothetical: Bob tells you that there is a troll living
// under the bridge, and it keeps eating his goats. He asks you to get Sir Galahad to deal with it. A quest appears in your log:
// "Trolls! Make sure that the troll under the bridge is dealt with." You speak with Galahad, who says he's busy, but he'll give you
// a nice magic sword if you take care of the troll yourself.
// In another game, the initial log entry might say "Talk to Sir Galahad about the troll under the bridge," and then when you do, the
// description might change to say "Take care of the troll yourself." Here, though, the quest log is just to remind you what you're
// doing, and the details are up to you to keep track of.
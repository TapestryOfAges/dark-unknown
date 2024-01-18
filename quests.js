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

      if (quests[questnum].replaces) {
        let repentry = this.findQuest(quests[questnum].replaces);
        if (repentry !== -1) {
          this.log[repentry].replaced = 1;
        }
      }
    }
  }

  complete(questnum) {
    let logentry = this.findQuest(questnum);
    if (logentry === -1) {
      console.log("Trying to complete quest " + questnum + " without having begun it.");
    }
  }

}

class Quest {
  constructor(replaces, name, source, text, completetext, category) {
    this.replaces = replaces;
    this.name = name;
    this.source = source;
    this.text = text;
    this.completetext = completetext;
    this.category = category;   // categories are main and side
    this.active = 0;
    this.completed = 0;
  }

  getName() {
    return this.name;
  }

  getText() {
    let txt = this.text;
    
    return this.text;
  }

  getCompleteText() {
    return this.completetext;
  }

  getCategory() {
    return this.category;
  }

}

let questlist = [];

questlist[0] = new Quest([], "Preventing a War", "King Daragen", "Your brother is in rebellion. Find out why... and bring the threat to an end before it can start.", "You have saved your brother, and prevented a war.", "main");
questlist[1] = new Quest([], "The Rune of Kings", "King Daragen", "Journey to the Pit of Despair, and find the Rune of Kings.", "You have been marked by the Rune of Kings.", "main");
questlist[2] = new Quest([], "To Earn a Spellbook", "Jharden", "Jharden needs an executioner's hood from the healer in Naurglen.", "You brought Jharden the executioner's hood he asked for.", "main");
questlist[3] = new Quest([], "Nyrani's Shield", "Nyrani", "Fetch Nyrani's shield from the armorsmith in Hildendain.", "You've brought Nyrani her shield.", "main");
questlist[4] = new Quest([], "A Cave Near the Coast", "Erin", "Trade is being threatened by monsters in a cave. Erin has asked you to see that something is done about it.", "The monsters in the cave are slain.", "main");
questlist[5] = new Quest([], "Fall of Targion", "Olivia", "Olivia in Castle dea Olympus is looking for the book Fall of Targion, which is probably in the Tower of Toshin.", "You found the book for Olivia.", "side");
questlist[6] = new Quest([], "Reports for the Chancellor", "Tyler", "Chancellor Tyler asked that you get reports from the leaders of Swainhil, Clear Lake, and Beldskae.", "You have brought the reports to the Chancellor.", "side");

// verbage for reference guide:
// Not everything that you might think of as a "quest" will go in the log. And those that do, you will still need to take notes-
// it will not remember and remind you of every step. To illustrate with a hypothetical: Bob tells you that there is a troll living
// under the bridge, and it keeps eating his goats. He asks you to get Sir Galahad to deal with it. A quest appears in your log:
// "Trolls! Make sure that the troll under the bridge is dealt with." You speak with Galahad, who says he's busy, but he'll give you
// a nice magic sword if you take care of the troll yourself.
// In another game, the initial log entry might say "Talk to Sir Galahad about the troll under the bridge," and then when you do, the
// description might change to say "Take care of the troll yourself." Here, though, the quest log is just to remind you what you're
// doing, and the details are up to you to keep track of.
'use strict';

class Quest {
  constructor(replaces, name, text, completetext, category) {
    this.replaces = replaces;
    this.name = name;
    this.text = text;
    this.completetext = completetext;
    this.category = category;   // categories are main and side
    this.active = 0;
    this.completed = 0;
  }

  activate(log) {
    if (this.getCompleted() < 1) {
      for (let i=0;i<this.replaces.length;i++) {
        log[this.replaces[i]].deactivate();
        log[this.replaces[i]].complete("replaced");
      }
      this.active = 1;
    }
  }

  deactivate() {
    this.active = 0;
  }

  getName() {
    return this.name;
  }

  getText() {
    return this.text;
  }

  getCompleteText() {
    return this.completetext;
  }

  getCategory() {
    return this.category;
  }

  complete(replaced) {
    this.deactivate();
    if (replaced) { this.completed = -1; }
    else {this.completed = 1;}
  }

  getCompleted() {
    return this.completed;
  }
}

let questlog = [];

questlog[0] = new Quest([], "Preventing a War", "Your brother is in rebellion. Find out why... and put a stop to it.", "You have saved your brother, and prevented a war.", "main");
questlog[1] = new Quest([], "The Rune of Kings", "Journey to the Pit of Despair, and find the Rune of Kings.", "You have been marked by the Rune of Kings.", "main");
questlog[2] = new Quest([], "To Earn a Spellbook", "Jharden needs an executioner's hood from the healer in Naurglen.", "You brought Jharden the executioner's hood he asked for.", "main");
questlog[3] = new Quest([], "Nyrani's Shield", "Fetch Nyrani's shield from the armorsmith in Hildendain.", "You've brought Nyrani her shield.", "main");
questlog[4] = new Quest([], "A Cave Near the Coast", "Trade is being threatened by monsters in a cave. Erin has asked you to see that something is done about it.", "The monsters in the cave are slain.", "main");
questlog[5] = new Quest([], "Fall of Targion", "Olivia in Castle dea Olympus is looking for the book Fall of Targion, which is probably in the Tower of Toshin.", "You found the book for Olivia.", "side");
questlog[6] = new Quest([], "Reports for the Chancellor", "Chancellor Tyler asked that you get reports from the leaders of Swainhil, Clear Lake, and Beldskae.", "You have brought the reports to the Chancellor.", "side");

// verbage for reference guide:
// Not everything that you might think of as a "quest" will go in the log. And those that do, you will still need to take notes-
// it will not remember and remind you of every step. To illustrate with a hypothetical: Bob tells you that there is a troll living
// under the bridge, and it keeps eating his goats. He asks you to get Sir Galahad to deal with it. A quest appears in your log:
// "Trolls! Make sure that the troll under the bridge is dealt with." You speak with Galahad, who says he's busy, but he'll give you
// a nice magic sword if you take care of the troll yourself.
// In another game, the initial log entry might say "Talk to Sir Galahad about the troll under the bridge," and then when you do, the
// description might change to say "Take care of the troll yourself." Here, though, the quest log is just to remind you what you're
// doing, and the details are up to you to keep track of.
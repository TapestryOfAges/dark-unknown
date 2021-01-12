'use strict';

class Quest {
  constructor(replaces, name, text) {
    this.replaces = replaces;
    this.name = name;
    this.text = text;
    this.active = 0;
    this.complete = 0;
  }

  activate(log) {
    for (let i=0;i<this.replaces.length;i++) {
      log[this.replaces[i]].deactivate();
    }
    this.active = 1;
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
}


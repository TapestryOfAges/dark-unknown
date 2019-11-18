"use strict";

function GameEvent(newEntity) {
	this.entity = newEntity;
}

GameEvent.prototype.getEntity = function() {
	return this.entity;
}

GameEvent.prototype.setEntity = function(newEntity) {
	this.entity = newEntity;
}


function Tick(newEvent, time) {
	this.timestamp = time;
	if (newEvent) {
		this.event = newEvent;
	} else {
		this.event = new GameEvent();
	}
	this.nexttick;
	
}

Tick.prototype.setTimestamp = function(time) {
	this.timestamp = time;
}

Tick.prototype.getTimestamp = function() {
	return this.timestamp;
}

Tick.prototype.setEvent = function(newevent) {
	this.event = newevent;
}

Tick.prototype.getEvent = function() {
	return this.event;
}

Tick.prototype.executeEvent = function() {
	let firstevent = this.event;
	firstevent.timestamp = this.getTimestamp();
	return firstevent;
}

Tick.prototype.getNextTick = function() {
	return this.nexttick;
}

Tick.prototype.setNextTick = function(nexttick) {
	// maybe add check to see that nexttick is an instance of Tick?
	this.nexttick = nexttick;
}

function Timeline(starttime) {

 this.gameClock = starttime;
 this.tickstream;
 
}
Timeline.prototype.getGameClock = function() {
	return this.gameClock;
}

Timeline.prototype.setGameClock = function(newtime) {
	this.gameClock = newtime;
}

Timeline.prototype.addAtTimeInterval = function(event, timeinterval) {
  timeinterval = parseFloat(timeinterval);
  let timestamp = this.getGameClock() + timeinterval;
  this.addAtTime(event,timestamp);
}

Timeline.prototype.addAtTime = function(event, timestamp) {
	if (this.tickstream) {
		if (this.findEntityTime(event.getEntity()) !== -1) { alert(`Adding same entity (${event.getEntity().getName()}) twice, at ${timestamp}.`); }
		let pointer = this.tickstream;
		if (timestamp < pointer.getTimestamp()) {
		  let firsttick = new Tick(event,timestamp);
		  firsttick.nexttick = pointer;
		  this.tickstream = firsttick;
		} else {
  		if (pointer.nexttick) {
	  		while ((pointer.nexttick) && (pointer.nexttick.getTimestamp() <= timestamp)) {
		  		pointer = pointer.nexttick;
			  }
  		}
	  	let afterinsert = pointer.nexttick;
		  pointer.nexttick = new Tick(event,timestamp);
		  pointer.nexttick.nexttick = afterinsert;
		}
	}
	else {
		this.tickstream = new Tick(event,timestamp);
	}
  DebugWrite("time", "Tick added to timeline: " + event.getEntity().getName() + " added at " + timestamp + ".<br />");    
  DebugWrite("time", this.createDebugTimeline());
}

Timeline.prototype.getNextEvent = function() {
  return this.tickstream.getEvent();	 
}

Timeline.prototype.executeNextEvent = function() {
  if (PC.getHP() <= 0) {
    DoPCDeath();
  }

  let nextevent = this.tickstream.executeEvent();
  this.setGameClock(nextevent.timestamp);
  let foo = this.tickstream.getNextTick();
  if (foo) { this.tickstream = foo; }
  else {this.tickstream = ""; }
  
  return nextevent;
}

Timeline.prototype.removeEntityFrom = function(entity) {
	let checktick = this.tickstream;
	let prevtick = this.tickstream;
	while ((checktick.getEvent().getEntity() !== entity) && (checktick.getNextTick())) {
		prevtick = checktick;
		checktick = checktick.getNextTick();
	}
	if (checktick.getEvent().getEntity() === entity) {
	  if (prevtick === checktick) { // still at the start of the timeline
	    this.tickstream = checktick.getNextTick();
	    checktick = this.tickstream;
	    prevtick = this.tickstream;
	  } else {
		  prevtick.setNextTick(checktick.getNextTick());
		}
		DebugWrite("time", "Entity removed from timeline: " + entity.getName() + " with serial " + entity.getSerial() + ".<br />" + this.createDebugTimeline());
	}
}

Timeline.prototype.findEntityTime = function(entity) {
	let checktick = this.tickstream;
	let prevtick = this.tickstream;
	while ((checktick.getEvent().getEntity() !== entity) && (checktick.getNextTick())) {
		prevtick = checktick;
		checktick = checktick.getNextTick();
	}
	if (checktick.getEvent().getEntity() === entity) {
	  return checktick.getTimestamp();
	}
	return -1;
}

Timeline.prototype.createDebugTimeline = function() {
  let tltable = "<table border='1'><tr><td>Time<br />Name<br />Serial</td>";
  let pointer = this.tickstream;
  while (pointer) {
    let timestamp = pointer.getTimestamp();
    if (!timestamp) { timestamp = 0; }
		tltable = tltable + "<td>" + timestamp.toFixed(5) + "<br />" + pointer.getEvent().getEntity().getName();
		if (typeof pointer.getEvent().getEntity().getNPCName === "function") { tltable = tltable + " (" + pointer.getEvent().getEntity().getNPCName() + ")"; }
		tltable = tltable + "<br />" + pointer.getEvent().getEntity().getSerial() + "</td>";
    pointer = pointer.nexttick;
  }
  tltable = tltable + "</tr></table><br />";
  
  return tltable;
}

Timeline.prototype.cleanTimeline = function() {
  // after removing one or more maps from mapmemory, find and remove any entities that live on those maps
  let checktick = this.tickstream;
  let prevtick = this.tickstream;  
  let first = 0;
  while (checktick.getNextTick()) {
    first = 0;
    let entity = checktick.getEvent().getEntity();
    let mapname = entity.getHomeMap().getName();
    if (!maps.getMap(mapname)) {  // lives on a map that has been removed
      if (prevtick === checktick) { // first thing in the timeline
        this.tickstream = checktick.getNextTick();
        checktick = this.tickstream;
        prevtick = this.tickstream;
        first = 1;
      } else {
        prevtick.setNextTick(checktick.getNextTick());
      }
      DebugWrite("time", "Entity removed from timeline (on unloaded map): " + entity.getName() + " with serial " + entity.getSerial() + ".<br />");
    } else {
      prevtick = checktick;
    }
    if (!first) {
      checktick = checktick.getNextTick();
    }
  }
  let entity = checktick.getEvent().getEntity();
  let mapname = entity.getHomeMap().getName();
  if (!maps.getMap(mapname)) {
    // remove the last tick on the timeline
    DebugWrite("time", "Entity removed from timeline (on unloaded map): " + entity.getName() + " with serial " + entity.getSerial() + ".<br />");
    prevtick.setNextTick("");
  }
}


function startScheduler() {
  let cont = 1;
  while (cont) {
    let nextEvent = DUTime.executeNextEvent();
    let nextEntity = nextEvent.getEntity();
    whoseturn = nextEntity;
    cont = nextEntity.myTurn();  
  }
}
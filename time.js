
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
	var firstevent = this.event;
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
  var timestamp = this.getGameClock() + timeinterval;
  this.addAtTime(event,timestamp);

}

Timeline.prototype.addAtTime = function(event, timestamp) {
	if (this.tickstream) {
		var pointer = this.tickstream;
		if (timestamp < pointer.getTimestamp()) {
		  var firsttick = new Tick(event,timestamp);
		  firsttick.nexttick = pointer;
		  this.tickstream = firsttick;
		} else {
  		if (pointer.nexttick) {
	  		while ((pointer.nexttick) && (pointer.nexttick.getTimestamp() <= timestamp)) {
		  		pointer = pointer.nexttick;
			  }
  		}
	  	var afterinsert = pointer.nexttick;
		  pointer.nexttick = new Tick(event,timestamp);
//		pointer.nexttick.setTimestamp(timestamp);
//		pointer.nexttick.setEvent(event);
		  pointer.nexttick.nexttick = afterinsert;
		}
	}
	else {
		this.tickstream = new Tick(event,timestamp);
//		this.tickstream.setTimestamp(timestamp);
//		this.tickstream.setEvent(event);
//		alert("adding first tick.");
//		alert(this.tickstream.getTimestamp());
//		alert(event.entity.name);
	}
  if (debug) {
    dbs.writeln("<span style='color:brown;font-weight:bold'>Tick added to timeline: " + event.getEntity().getName() + " added at " + timestamp + ".</span><br />");
    
    dbs.writeln(this.createDebugTimeline());
  }

}

Timeline.prototype.getNextEvent = function() {
  return this.tickstream.getEvent();	 
}

Timeline.prototype.executeNextEvent = function() {
  if (PC.getHP() <= 0) {
    DoPCDeath();
  }

  var nextevent = this.tickstream.executeEvent();
  this.setGameClock(nextevent.timestamp);
  var foo = this.tickstream.getNextTick();
  if (foo) { this.tickstream = foo; }
  else {this.tickstream = ""; }
//  	this.tickstream = this.tickstream.getNextTick();
  
//  alert(nextevent.getEntity().name);
  return nextevent;
}

Timeline.prototype.removeEntityFrom = function(entity) {
	var checktick = this.tickstream;
	var prevtick = this.tickstream;
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
		dbs.writeln("<span style='color:brown;font-weight:bold'>Entity removed from timeline: " + entity.getName() + " with serial " + entity.getSerial() + ".</span><br />");
	}
}

Timeline.prototype.findEntityTime = function(entity) {
	var checktick = this.tickstream;
	var prevtick = this.tickstream;
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
  var tltable = "<table border='1'><tr><td>Time<br />Name<br />Serial</td>";
  var pointer = this.tickstream;
  while (pointer) {
    tltable = tltable + "<td>" + pointer.getTimestamp().toFixed(5) + "<br />" + pointer.getEvent().getEntity().getName() + "<br />" + pointer.getEvent().getEntity().getSerial() + "</td>";
    pointer = pointer.nexttick;
  }
  tltable = tltable + "</tr></table><br />";
  
  return tltable;
}

Timeline.prototype.cleanTimeline = function() {
  // after removing one or more maps from mapmemory, find and remove any entities that live on those maps
  var checktick = this.tickstream;
  var prevtick = this.tickstream;  
  var first = 0;
  while (checktick.getNextTick()) {
    var entity = checktick.getEvent().getEntity();
    var mapname = entity.getHomeMap().getName();
    if (!maps[mapname]) {  // lives on a map that has been removed
      if (prevtick === checktick) { // first thing in the timeline
        this.tickstream = checktick.getNextTick();
        checktick = this.tickstream;
        prevtick = this.tickstream;
        first = 1;
      } else {
        prevtick.setNextTick(checktick.getNextTick());
      }
      dbs.writeln("<span style='color:brown;font-weight:bold'>Entity removed from timeline (on unloaded map): " + entity.getName() + " with serial " + entity.getSerial() + ".</span><br />");
    } else {
      prevtick = checktick;
    }
    if (!first) {
      checktick = checktick.getNextTick();
    }
  }
  var entity = checktick.getEvent().getEntity();
  var mapname = entity.getHomeMap().getName();
  if (!maps[mapname]) {
    // remove the last tick on the timeline
    dbs.writeln("<span style='color:brown;font-weight:bold'>Entity removed from timeline (on unloaded map): " + entity.getName() + " with serial " + entity.getSerial() + ".</span><br />");
    prevtick.setNextTick("");
  }
}


function startScheduler() {
  var cont = 1;
  while (cont) {
    var nextEvent = DUTime.executeNextEvent();
    var nextEntity = nextEvent.getEntity();
    cont = nextEntity.myTurn();  
  }
}

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
  var timestamp = this.getGameClock() + timeinterval;
  this.addAtTime(event,timestamp);
}

Timeline.prototype.addAtTime = function(event, timestamp) {
	if (this.tickstream) {
		var pointer = this.tickstream;
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
	else {
		this.tickstream = new Tick(event,timestamp);
//		this.tickstream.setTimestamp(timestamp);
//		this.tickstream.setEvent(event);
//		alert("adding first tick.");
//		alert(this.tickstream.getTimestamp());
//		alert(event.entity.name);
	}
}

Timeline.prototype.getNextEvent = function() {
  return this.tickstream.getEvent();	 
}

Timeline.prototype.executeNextEvent = function() {
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
		prevtick.setNextTick(checktick.getNextTick());
	}
}
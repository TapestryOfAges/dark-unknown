
function GameEvent(newEntity) {
	this.entity = newEntity;
}

GameEvent.prototype.getEntity = function() {
	return this.entity;
}

GameEvent.prototype.setEntity = function(newEntity) {
	this.entity = newEntity;
}


function Tick() {
	this.timestamp = 0;
	this.events = new Array;
	this.nexttick;
	
}

Tick.prototype.setTimestamp = function(time) {
	this.timestamp = time;
}

Tick.prototype.getTimestamp = function() {
	return this.timestamp;
}

Tick.prototype.addEvent = function(newevent) {
	this.events.push(newevent);
}

Tick.prototype.getFirstEvent = function() {
	return this.events[0];
}

Tick.prototype.executeFirstEvent = function() {
	var firstevent = this.events.shift();
	firstevent.timestamp = this.getTimestamp();
	return firstevent;
}

Tick.prototype.getNumberOfEvents = function() {
	return this.events.length;
}

Tick.prototype.getNextTick = function() {
	return this.nexttick;
}

Tick.prototype.setNextTick = function(nexttick) {
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
		alert("Am I here?");
		var pointer = this.tickstream;
		if (pointer.nexttick) {
			while ((pointer.nexttick.timestamp) && (pointer.nexttick.getGameClock() < timestamp)) {
				pointer = pointer.nexttick;
			}
		}
		var afterinsert = pointer.nexttick;
		pointer.nexttick = new Tick();
		pointer.nexttick.setTimestamp(timestamp);
		pointer.nexttick.addEvent(event);
		pointer.nexttick.nexttick = afterinsert;
	}
	else {
		this.tickstream = new Tick();
		this.tickstream.setTimestamp(timestamp);
		this.tickstream.addEvent(event);
//		alert("adding first tick.");
//		alert(this.tickstream.getTimestamp());
//		alert(event.entity.name);
	}
}

Timeline.prototype.getNextEvent = function() {
  return this.tickstream.getFirstEvent();	 
}

Timeline.prototype.executeNextEvent = function() {
  var nextevent = this.tickstream.executeFirstEvent();
  this.setGameClock(nextevent.timestamp);
  if (this.tickstream.getNumberOfEvents() == 0) {
  	var foo = this.tickstream.getNextTick();
  	if (foo) { this.tickstream = foo; }
  	else {this.tickstream = ""; }
//  	this.tickstream = this.tickstream.getNextTick();
  }
//  alert(nextevent.getEntity().name);
  return nextevent;
}


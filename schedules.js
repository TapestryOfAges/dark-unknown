"use strict";

function NPCSchedule() {
  this.scheduleArray = [];
  this.currentIndex = 0;
}
NPCSchedule.prototype = new Object();

NPCSchedule.prototype.addActivity(activity) {
  this.scheduleArray.push(activity);
}

NPCSchedule.prototype.getNPCLocationByTime(time) {
  if (!time) {
    time = GetClockTime();
  }
  time = time[3]*60+time[4];
  var location;
  var lastlocation = {};
  
  for (var i=0; i<this.scheduleArray.length; i++) {
    if ((scheduleArray[i].type === "RouteTo") && (scheduleArray[i].startCondition === "Time")) {
      var schtime = scheduleArray[i].startTime.split(":");
      var comptime = schtime[0]*comptime[1];
      if (comptime < time) { location = scheduleArray[i].destination; }
      lastlocation = scheduleArray[i].destination;
    }
  }
  if (!location) { location = lastlocation; }

  return location; 
}

function NPCActivity(type, params) {
  if (type === "RouteTo") {  // Route To location
    if (params.hasOwnProperty(destination)) {
      if (params.destination.hasOwnProperty(x) && params.destination.hasOwnProperty(y)) {
        this.destination = params.destination;
      } else { alert("Invalid destination."); }
    } else { alert("This activity is missing its destination."); }
    if (params.hasOwnProperty(endCondition)) {
      if (params.endCondition === "Time") {
        if (params.hasOwnProperty(endTime)) {
          this.endTime = params.endTime;
        } else {
          alert("This activity's endCondition (Time) is missing a time."); 
        }
      }
    }
  } else if (type === "WaitHere") {  // Hang out in current location
    if (params.hasOwnProperty("sleep")) { this.sleep = params.sleep; }
    
    if (params.hasOwnProperty("leashLength")) { this.leashLength = params.leashLength; }
    else { alert("This activity has no leashLength property!"); }    // should have property even if just 0

    if (params.hasOwnProperty("responsibleFor")) { this.responsibleFor = params.responsibleFor; }  // array of coordinates for doors
        
  } else if (type === "ChangeMap") {  // Can only move to a linked map
    if (params.hasOwnProperty("destination")) { 
      if (params.destination.hasOwnProperty("mapName") && params.destination.hasOwnProperty("x") && params.destination.hasOwnProperty("y")) {
        this.destination = params.destination;
      } else { alert("This activity's destination is incomplete!"); }
    } else { alert("This activity is missing the destination!"); }

  } else if (type === "LeaveMap") { // exit to world map

  } else if (type === "CallAI") { // Something other than what's here
    if (params.hasOwnProperty("AIName")) { this.AIName = params.AIName; }
    else { alert("This activity is missing its AIName!"); }

    if (params.hasOwnProperty("params")) { this.params = params.params; } // nicely recursive, eh?
    else { alert("This activity is missing params for its AI!"); }

  }


  // All activities
  if (params.hasOwnProperty(startCondition)) {
    if (params.startCondition === "Time") {
      this.startCondition = params.startCondition;
      if (params.hasOwnProperty("startTime")) {
        this.startTime = params.startTime;
      } else { alert("This activity's startCondition (Time) is missing a time."); }
    } else if (params.startCondition === "PreviousComplete") {

    } else { alert("This activity's startCondition is invalid."); }
  } else { alert("This activity is missing its start condition."); }

  if (params.hasOwnProperty("setFlag")) {
    this.setFlag = params.setFlag;  // as usual, "unset_" works to unset
  }

  if (params.hasOwnProperty("bark") && params.hasOwnProperty("barkfreq")) {
    this.bark = params.bark;  // array of bark txts
    this.barkfreq = params.barkfreq;
  } else if (params.hasOwnProperty("bark") || params.hasOwnProperty("barkfreq")) {
    alert("Activity has incomplete bark information.");
  }
}
NPCActivity.prototype = new Object();
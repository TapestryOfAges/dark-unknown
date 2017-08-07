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
          alert("This activity's endCondition (Time) is missing a time."); }
        }
      }
    }
  } else if (type === "WaitHere") {
    if (params.hasOwnProperty("sleep")) { this.sleep = params.sleep; }
  }

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
    this.setFlag = params.setFlag;
  }
}
NPCActivity.prototype = new Object();
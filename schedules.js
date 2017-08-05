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
    if (params.hasOwnProperty(startCondition)) {
      if ((params.startCondition === "Time") || (params.startCondition === "PreviousComplete")) {
        this.startCondition = params.startCondition;
        if (params.startCondition === "Time") {
          if (params.hasOwnProperty("startTime")) {
            this.startTime = params.startTime;
          } else { alert("This activity's startCondition (Time) is missing a time."); }
        }
      }
    } else { alert("This activity is missing its start condition."); }

  }
}
NPCActivity.prototype = new Object();
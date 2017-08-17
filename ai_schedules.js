"use strict";

function ScheduledAI(who) {
  var nextidx = who.getCurrentScheduleIndex + 1;
  var schedule = DU.schedules[who.getSchedule()];
  if (nextidx >= schedule.scheduleArray.length) { nextidx = 0; }
  
  var nextactivity = schedule.scheduleArray[nextidx];
  
}

// Called by the "Route To" schedule. Parameters include:
// Destination (obj: x,y)
// Bark information
// Close doors behind
// Time to declare that this schedule is done
// Flags to set
function AI_RouteTo(who, params) {

}
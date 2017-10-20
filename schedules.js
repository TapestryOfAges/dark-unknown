"use strict";

function NPCSchedule() {
  this.scheduleArray = [];
  this.baseLocation = "";
  this.currentIndex = 0;
}
NPCSchedule.prototype = new Object();

NPCSchedule.prototype.addActivity = function(activity, atIndex) {
  if (isNaN(atIndex)) {
    this.scheduleArray.push(activity);
  } else {
    this.scheduleArray.splice(atIndex,0,activity);
  }
}

NPCSchedule.prototype.deleteActivity = function(activity, atIndex) {
  if (isNaN(atIndex)) {
    
  } else {
    this.scheduleArray.splice(atIndex,1);
  }
}

NPCSchedule.prototype.editActivity = function(activity, idx) {
  this.scheduleArray[idx] = activity;
}

NPCSchedule.prototype.getNPCLocationByTime = function(time, setIndex) {
  if (!time) {
    time = GetClockTime();
  }
  time = parseInt(time[3])*60+parseInt(time[4]);
  var location;
  var lastlocation = {};
  var lastindex = 0;
  lastlocation.mapName = this.baseLocation;

  var i=0;
  var lowerboundmet = 0;
  
  while (!location) {
    var schtime;
    var comptime;
    if (this.scheduleArray[i].params.startCondition === "Time") {
      schtime = this.scheduleArray[i].params.startTime.split(":");
      comptime = parseInt(schtime[0])*60+parseInt(schtime[1]);
      if ((comptime > time) && lowerboundmet) {
        location = lastlocation;
        lastindex = i;
        break;
      }

      if (comptime <= time) { lowerboundmet = 1; }
    }

//    if (lowerboundmet) {
      if (this.scheduleArray[i].type === "RouteTo") {
        lastlocation.x = this.scheduleArray[i].params.destination.x;
        lastlocation.y = this.scheduleArray[i].params.destination.y;
      } else if (this.scheduleArray[i].type === "ChangeMap") {
        lastlocation = this.scheduleArray[i].params.destination;
      }
//    }

    i++;
    if (i === this.scheduleArray.length) { i=0; lowerboundmet=1; }
  }

  if (setIndex) { this.currentIndex = lastindex; }
  return location; 
}

function NPCActivity(type, params) {
  this.params = {};
  this.type = type;
  if (type === "RouteTo") {  // Route To location
    if (params.hasOwnProperty("destination")) {
      if (params.destination.hasOwnProperty("x") && params.destination.hasOwnProperty("y")) {
        this.params.destination = params.destination;
      } else { alert("Invalid destination."); }
    } else { alert("This activity is missing its destination."); }
    if (params.hasOwnProperty("endCondition")) {
      if (params.endCondition === "Time") {
        this.params.endCondition = "Time";
        if (params.hasOwnProperty("endTime")) {
          this.params.endTime = params.endTime;
        } else {
          alert("This activity's endCondition (Time) is missing a time."); 
        }
      }
    }
    if (params.hasOwnProperty("closeDoors")) {
      this.params.closeDoors = params.closeDoors;
    }
  } else if (type === "WaitHere") {  // Hang out in current location
    if (params.hasOwnProperty("sleep")) { this.params.sleep = params.sleep; }
    
    if (params.hasOwnProperty("leashLength")) { this.params.leashLength = params.leashLength; }
    else { alert("This activity has no leashLength property!"); }    // should have property even if just 0

    if (params.hasOwnProperty("responsibleFor")) { this.params.responsibleFor = params.responsibleFor; }  // array of coordinates for doors
        
  } else if (type === "ChangeMap") {  // Can only move to a linked map
    if (params.hasOwnProperty("destination")) { 
      if (params.destination.hasOwnProperty("mapName") && params.destination.hasOwnProperty("x") && params.destination.hasOwnProperty("y")) {
        this.params.destination = params.destination;
      } else { alert("This activity's destination is incomplete!"); }
    } else { alert("This activity is missing the destination!"); }

  } else if (type === "LeaveMap") { // exit to world map

  } else if (type === "CallAI") { // Something other than what's here
    if (params.hasOwnProperty("AIName")) { this.params.AIName = params.AIName; }
    else { alert("This activity is missing its AIName!"); }

    if (params.hasOwnProperty("params")) { this.params.params = params.params; } // nicely recursive, eh?
    else { alert("This activity is missing params for its AI!"); }

    if (params.hasOwnProperty("endCondition")) {
      if (params.endCondition === "Time") {
        if (params.hasOwnProperty("endTime")) {
          this.endTime = params.endTime;
        } else {
          alert("This activity's endCondition (Time) is missing a time."); 
        }
      }
    }

  }

  // All activities
  if (params.hasOwnProperty("startCondition")) {
    if (params.startCondition === "Time") {
      this.params.startCondition = params.startCondition;
      if (params.hasOwnProperty("startTime")) {
        this.params.startTime = params.startTime;
      } else { alert("This activity's startCondition (Time) is missing a time."); }
    } else if (params.startCondition === "PreviousComplete") {
      this.params.startCondition = params.startCondition;
    } else { alert("This activity's startCondition is invalid."); }
  } else { alert("This activity is missing its start condition."); }

  if (params.hasOwnProperty("setFlag")) {
    this.params.setFlag = params.setFlag;  // as usual, "unset_" works to unset
  }

  if (params.hasOwnProperty("bark") && params.hasOwnProperty("barkfreq")) {
    this.params.bark = params.bark;  // array of bark txts
    this.params.barkfreq = params.barkfreq;
  } else if (params.hasOwnProperty("bark") || params.hasOwnProperty("barkfreq")) {
    alert("Activity has incomplete bark information.");
  }
}
NPCActivity.prototype = new Object();

function set_schedules() {
  var sched = '{"avery":{"scheduleArray":[{"params":{"destination":{"x":"7","y":"42"},"closeDoors":"1","startCondition":"Time","startTime":"6:00"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen","x":"7","y":"42"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"11","y":"42"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"AIName":"PlaceItem","params":"{name: \\"FoodSouth\\", x:11,y:41}","startCondition":"PreviousComplete"},"type":"CallAI"},{"params":{"AIName":"DeleteItem","params":"{param: \\"last\\"}","startCondition":"Time","startTime":"7:00"},"type":"CallAI"},{"params":{"destination":{"x":"10","y":"39"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"13","y":"38"},"startCondition":"Time","startTime":"15:30"},"type":"RouteTo"},{"params":{"AIName":"PlayHarpsichord","params":"{}","startCondition":"PreviousComplete"},"type":"CallAI"},{"params":{"destination":{"x":"10","y":"39"},"startCondition":"Time","startTime":"16:00"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"10","y":"39"},"startCondition":"Time","startTime":"18:30"},"type":"RouteTo"},{"params":{"AIName":"PlaceItem","params":"{name: \\"PlateWithFood\\", x:11,y:41}","startCondition":"PreviousComplete"},"type":"CallAI"},{"params":{"AIName":"DeleteItem","params":"{param:last}","startCondition":"Time","startTime":"19:00"},"type":"CallAI"},{"params":{"destination":{"x":"10","y":"39"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"7","y":"49"},"startCondition":"Time","startTime":"21:30"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen2","x":"7","y":"49"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"7","y":"37"},"closeDoors":"1","startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"sleep":"1","leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"}],"baseLocation":"naurglen2","currentIndex":0},"grayson":{"scheduleArray":[{"params":{"destination":{"x":"16","y":"30"},"startCondition":"Time","startTime":"0:05"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"15","y":"5"},"startCondition":"Time","startTime":"0:58"},"type":"RouteTo"},{"params":{"destination":{"x":"16","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"30"},"startCondition":"Time","startTime":"1:50"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"12"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"30"},"startCondition":"Time","startTime":"2:51"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"84","y":"30"},"startCondition":"Time","startTime":"3:14"},"type":"RouteTo"},{"params":{"destination":{"x":"83","y":"39"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"84","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"83","y":"12"},"startCondition":"Time","startTime":"4:03"},"type":"RouteTo"},{"params":{"destination":{"x":"84","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"59","y":"30"},"startCondition":"Time","startTime":"4:45"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"59","y":"14"},"startCondition":"Time","startTime":"5:16"},"type":"RouteTo"},{"params":{"destination":{"x":"66","y":"13"},"closeDoors":"1","startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"73","y":"16"},"closeDoors":"1","startCondition":"Time","startTime":"6:01"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen2","x":"73","y":"16"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"76","y":"13"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"sleep":"1","leashLength":0,"startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"73","y":"16"},"startCondition":"Time","startTime":"15:00"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen","x":"73","y":"16"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"75","y":"14"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"83","y":"30"},"closeDoors":"1","startCondition":"Time","startTime":"18:00"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"58","y":"29"},"startCondition":"Time","startTime":"18:40"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"13"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"58","y":"29"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"16","y":"30"},"startCondition":"Time","startTime":"19:15"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"16","y":"3"},"startCondition":"Time","startTime":"20:05"},"type":"RouteTo"},{"params":{"destination":{"x":"16","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"59","y":"13"},"startCondition":"Time","startTime":"22:00"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"83","y":"30"},"startCondition":"Time","startTime":"22:40"},"type":"RouteTo"},{"params":{"destination":{"x":"83","y":"14"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"83","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"}],"baseLocation":"naurglen","currentIndex":0},"evelyn":{"scheduleArray":[{"params":{"destination":{"x":"69","y":"16"},"startCondition":"Time","startTime":"5:30"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen","x":"69","y":"16"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"65","y":"15"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"15"},"closeDoors":"1","startCondition":"Time","startTime":"6:00"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"29"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"83","y":"30"},"startCondition":"Time","startTime":"6:30"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"83","y":"40"},"startCondition":"Time","startTime":"7:00"},"type":"RouteTo"},{"params":{"destination":{"x":"82","y":"14"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"83","y":"30"},"startCondition":"Time","startTime":"7:42"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"16","y":"30"},"startCondition":"Time","startTime":"8:05"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"16","y":"4"},"startCondition":"Time","startTime":"9:15"},"type":"RouteTo"},{"params":{"destination":{"x":"16","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"29"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"59","y":"14"},"startCondition":"Time","startTime":"10:50"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"29"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"83","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"16","y":"30"},"startCondition":"Time","startTime":"11:30"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"16","y":"4"},"startCondition":"Time","startTime":"12:40"},"type":"RouteTo"},{"params":{"destination":{"x":"16","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"59","y":"12"},"startCondition":"Time","startTime":"14:15"},"type":"RouteTo"},{"params":{"destination":{"x":"59","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"83","y":"30"},"startCondition":"Time","startTime":"14:52"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"37","y":"30"},"startCondition":"Time","startTime":"15:23"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"83","y":"30"},"startCondition":"Time","startTime":"16:15"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"83","y":"14"},"startCondition":"Time","startTime":"17:10"},"type":"RouteTo"},{"params":{"destination":{"x":"76","y":"14"},"closeDoors":"1","startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"1","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"65","y":"15"},"closeDoors":"1","startCondition":"Time","startTime":"18:05"},"type":"RouteTo"},{"params":{"leashLength":0,"startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"69","y":"16"},"startCondition":"Time","startTime":"20:25"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen2","x":"69","y":"16"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"65","y":"13"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"sleep":"1","leashLength":0,"startCondition":"PreviousComplete"},"type":"WaitHere"}],"baseLocation":"naurglen2","currentIndex":0},"samuel":{"scheduleArray":[{"params":{"destination":{"x":"21","y":"5"},"startCondition":"Time","startTime":"7:00"},"type":"RouteTo"},{"params":{"destination":{"x":"23","y":"8"},"startCondition":"Time","startTime":"7:06"},"type":"RouteTo"},{"params":{"destination":{"x":"17","y":"30"},"closeDoors":"1","startCondition":"Time","startTime":"7:45"},"type":"RouteTo"},{"params":{"destination":{"x":"50","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"52","y":"21"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"5","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"50","y":"30"},"startCondition":"Time","startTime":"19:00"},"type":"RouteTo"},{"params":{"destination":{"x":"17","y":"30"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"23","y":"8"},"closeDoors":"1","startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"destination":{"x":"23","y":"6"},"startCondition":"Time","startTime":"20:30"},"type":"RouteTo"},{"params":{"leashLength":"1","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"23","y":"4"},"startCondition":"Time","startTime":"21:45"},"type":"RouteTo"},{"params":{"sleep":"1","leashLength":0,"startCondition":"PreviousComplete"},"type":"WaitHere"}],"baseLocation":"naurglen","currentIndex":0},"derek":{"scheduleArray":[{"params":{"destination":{"x":"22","y":"22"},"startCondition":"Time","startTime":"5:30"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"21","y":"22"},"startCondition":"Time","startTime":"5:35"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"24","y":"24"},"startCondition":"Time","startTime":"5:38"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"39","y":"23"},"closeDoors":"1","startCondition":"Time","startTime":"6:00"},"type":"RouteTo"},{"params":{"leashLength":"4","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"67","y":"29"},"startCondition":"Time","startTime":"14:00"},"type":"RouteTo"},{"params":{"destination":{"x":"66","y":"24"},"closeDoors":"1","startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"67","y":"29"},"closeDoors":"1","startCondition":"Time","startTime":"15:30"},"type":"RouteTo"},{"params":{"destination":{"x":"39","y":"23"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"4","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"24","y":"24"},"closeDoors":"1","startCondition":"Time","startTime":"19:00"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"24","y":"22"},"startCondition":"Time","startTime":"19:30"},"type":"RouteTo"},{"params":{"leashLength":"2","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"21","y":"24"},"startCondition":"Time","startTime":"20:30"},"type":"RouteTo"},{"params":{"sleep":"1","leashLength":0,"startCondition":"PreviousComplete"},"type":"WaitHere"}],"baseLocation":"naurglen","currentIndex":0},"kylee2":{"scheduleArray":[{"params":{"destination":{"x":"27","y":"38"},"startCondition":"Time","startTime":"6:00"},"type":"RouteTo"},{"params":{"destination":{"x":"37","y":"38"},"closeDoors":"1","startCondition":"Time","startTime":"6:45"},"type":"RouteTo"},{"params":{"leashLength":"4","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"50","y":"26"},"startCondition":"Time","startTime":"11:00"},"type":"RouteTo"},{"params":{"leashLength":"1","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"27","y":"38"},"closeDoors":"1","startCondition":"Time","startTime":"11:35"},"type":"RouteTo"},{"params":{"leashLength":0,"startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"37","y":"38"},"closeDoors":"1","startCondition":"Time","startTime":"12:45"},"type":"RouteTo"},{"params":{"leashLength":"4","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"49","y":"22"},"startCondition":"Time","startTime":"16:00"},"type":"RouteTo"},{"params":{"destination":{"x":"27","y":"38"},"closeDoors":"1","startCondition":"Time","startTime":"19:00"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"29","y":"40"},"startCondition":"Time","startTime":"21:30"},"type":"RouteTo"},{"params":{"sleep":"1","leashLength":0,"startCondition":"PreviousComplete"},"type":"WaitHere"}],"baseLocation":"naurglen","currentIndex":0},"kylee":{"scheduleArray":[{"params":{"destination":{"x":"27","y":"38"},"startCondition":"Time","startTime":"6:00"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"37","y":"38"},"closeDoors":"1","startCondition":"Time","startTime":"6:45"},"type":"RouteTo"},{"params":{"leashLength":"4","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"27","y":"38"},"closeDoors":"1","startCondition":"Time","startTime":"19:15"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"29","y":"40"},"startCondition":"Time","startTime":"21:20"},"type":"RouteTo"},{"params":{"sleep":"1","leashLength":0,"startCondition":"PreviousComplete"},"type":"WaitHere"}],"baseLocation":"naurglen","currentIndex":0},"samantha2":{"scheduleArray":[{"params":{"destination":{"x":"25","y":"37"},"startCondition":"Time","startTime":"6:02"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"54","y":"17"},"closeDoors":"1","startCondition":"Time","startTime":"6:40"},"type":"RouteTo"},{"params":{"leashLength":"5","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"25","y":"37"},"closeDoors":"1","startCondition":"Time","startTime":"11:30"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"54","y":"17"},"closeDoors":"1","startCondition":"Time","startTime":"12:40"},"type":"RouteTo"},{"params":{"leashLength":"5","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"25","y":"37"},"closeDoors":"1","startCondition":"Time","startTime":"19:00"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"28","y":"38"},"startCondition":"Time","startTime":"20:00"},"type":"RouteTo"},{"params":{"leashLength":"2","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"25","y":"40"},"startCondition":"Time","startTime":"21:30"},"type":"RouteTo"},{"params":{"sleep":"1","leashLength":0,"startCondition":"PreviousComplete"},"type":"WaitHere"}],"baseLocation":"naurglen","currentIndex":0},"garen":{"scheduleArray":[{"params":{"destination":{"x":"44","y":"7"},"startCondition":"Time","startTime":"9:30"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen","x":"44","y":"7"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"70","y":"24"},"closeDoors":"1","startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"47","y":"7"},"closeDoors":"1","startCondition":"Time","startTime":"20:00"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"44","y":"7"},"startCondition":"Time","startTime":"23:50"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen2","x":"44","y":"7"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"49","y":"8"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"sleep":"1","leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"}],"baseLocation":"naurglen2","currentIndex":0},"warren":{"scheduleArray":[{"params":{"destination":{"x":"44","y":"7"},"startCondition":"Time","startTime":"9:32"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen","x":"44","y":"7"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"72","y":"32"},"closeDoors":"1","startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"46","y":"10"},"closeDoors":"1","startCondition":"Time","startTime":"20:00"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"48","y":"9"},"startCondition":"Time","startTime":"21:15"},"type":"RouteTo"},{"params":{"leashLength":"3","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"44","y":"7"},"startCondition":"Time","startTime":"23:53"},"type":"RouteTo"},{"params":{"destination":{"mapName":"naurglen2","x":"44","y":"7"},"startCondition":"PreviousComplete"},"type":"ChangeMap"},{"params":{"destination":{"x":"49","y":"9"},"startCondition":"PreviousComplete"},"type":"RouteTo"},{"params":{"sleep":"1","leashLength":0,"startCondition":"PreviousComplete"},"type":"WaitHere"}],"baseLocation":"naurglen2","currentIndex":0},"amaeryl":{"scheduleArray":[{"params":{"destination":{"x":"54","y":"37"},"startCondition":"Time","startTime":"7:20"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"58","y":"39"},"closeDoors":"1","startCondition":"Time"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"59","y":"29"},"closeDoors":"1","startCondition":"Time","startTime":"8:15"},"type":"RouteTo"},{"params":{"leashLength":"6","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"66","y":"24"},"closeDoors":"1","startCondition":"Time","startTime":"10:45"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"59","y":"29"},"closeDoors":"1","startCondition":"Time","startTime":"13:30"},"type":"RouteTo"},{"params":{"leashLength":"6","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"66","y":"24"},"closeDoors":"1","startCondition":"Time","startTime":"17:20"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"59","y":"29"},"closeDoors":"1","startCondition":"Time","startTime":"19:20"},"type":"RouteTo"},{"params":{"leashLength":"6","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"59","y":"37"},"closeDoors":"1","startCondition":"Time","startTime":"20:40"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"58","y":"39"},"startCondition":"Time","startTime":"21:00"},"type":"RouteTo"},{"params":{"leashLength":"0","startCondition":"PreviousComplete"},"type":"WaitHere"},{"params":{"destination":{"x":"51","y":"38"},"closeDoors":"1","startCondition":"Time","startTime":"22:00"},"type":"RouteTo"}],"baseLocation":"naurglen","currentIndex":0}}';  
  
  
  

  var tmpschedules = JSON.parse(sched);

  DU.schedules = {};
  $.each(tmpschedules, function(idx,val) {
    DU.schedules[idx] = new NPCSchedule();
    DU.schedules[idx]["scheduleArray"] = val.scheduleArray;
    DU.schedules[idx]["currentIndex"] = val.currentIndex;
    DU.schedules[idx]["baseLocation"] = val.baseLocation;
  });

}
"use strict";

// universal parameters:
// Bark information (bark, barkfreq, barkrad)
// Time to declare that this schedule is done (endCondition, endTime)
// Flags to set (setFlag)
ais.scheduled = function(who) {
  DebugWrite("ai", "In SCHEDULED.");
  delete who.flags.sleep;
  // will be re-set in WaitHere if still asleep

  var nextidx = who.getCurrentScheduleIndex() + 1;
  var schedule = DU.schedules[who.getSchedule()];
  if (nextidx >= schedule.scheduleArray.length) { nextidx = 0; }

  var currtime = GetUsableClockTime();

  var nowactivity = schedule.scheduleArray[who.getCurrentScheduleIndex()];
  var nextactivity = schedule.scheduleArray[nextidx];
  if (nextactivity.params.startCondition === "Time") {
    if (CheckTimeAfterTime(currtime, nextactivity.params.startTime)) {
      DebugWrite("ai", "Moving to next scheduled activity- startTime met.");
      who.setCurrentScheduleIndex(nextidx);
    }
  }
  else if (nextactivity.params.startCondition === "PreviousComplete") {
    if (nowactivity.params.endCondition === "Time") {
      if (CheckTimeAfterTime(currtime, nowactivity.params.endTime)) {
        DebugWrite("ai", "Moving to next scheduled activity- endTime met.");
        who.setCurrentScheduleIndex(nextidx);
      }
    }
    if (who.flags.activityComplete) {
      console.log("Next activity due to activity complete.");
      who.setCurrentScheduleIndex(nextidx);
      delete who.flags.activityComplete;
    }
  }

  if (who.getCurrentScheduleIndex() === nextidx) { 
    DebugWrite("ai", "Moving to next schedule, setting center for possible leash to current position.<br />");
    who.leashCenter = {x: who.getx(), y: who.gety()}; 
  }
  nowactivity = schedule.scheduleArray[who.getCurrentScheduleIndex()];

  if (nowactivity.params.bark) {
    CheckNPCBark(who,nowactivity);
  }

  if (nowactivity.params.setFlag) {
    if (nowactivity.params.setFlag.indexOf("unset_") !== -1) {
      var tmpflag = nowactivity.params.set_flag.replace(/unset_/, "");
      if (who.flags[tmpflag]) {
        delete who.flags[tmpflag];
      }
    } else {
      who.flags[nowactivity.params.set_flag] = 1;
    }
  }

  return ais[nowactivity.type](who, nowactivity.params);
}

function CheckNPCBark(who,nowactivity) {
  if (who.getHomeMap() === PC.getHomeMap()) { 
    if (Dice.roll("1d100")  < nowactivity.params.barkfreq) {
      if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= nowactivity.params.barkrad) {
        // bark!
        DebugWrite("ai", "Townfolk barking.");
        var barkarr = nowactivity.params.bark;
        var idx = RollDice("1d" + barkarr.length + "-1");
        var mybark = barkarr[idx];
        if (mybark) {
          if ((mybark.indexOf("%THEDESC%") !== -1) || (mybark.indexOf("%DESC%") !== -1)) {
            var pref = who.getPrefix();
            if (mybark.indexOf("%THEDESC%") !== -1) {
              if ((pref === "a") || (pref === "an")) { pref = "the"; }
            }
            var desc = who.getDesc();
            if (who.getDesc() !== who.getNPCName()) {
              desc = pref + " " + desc;
            }
            mybark = mybark.replace(/%THEDESC%/g, desc);
            mybark = mybark.replace(/%DESC%/g, desc);
          }
          mybark = mybark.charAt(0).toUpperCase() + mybark.slice(1);
          maintext.addText(mybark);
        }
      }
    }
  }
}

// Called by the "Route To" schedule. Parameters include:
// Destination (obj: x,y)
// Close doors behind (closeDoors)
ais.RouteTo = function(who, params) {
  DebugWrite("ai", "In scheduled ai: RouteTo.");

  if (params.closeDoors && (who.flags.closedoor) && (who.flags.closedoor.steps === 3)) {
    var fea = who.getHomeMap().getTile(who.flags.closedoor.x,who.flags.closedoor.y).getTopFeature();
    if (fea.closedgraphic) {
      if (fea.open) {  // door hasn't been closed already
        fea.use(who);
        if (GetDistance(fea.getx(),fea.gety(),PC.getx(),PC.gety(),"square") <= 5) {
          DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
        } 
        delete who.flags.closedoor;
        DebugWrite("ai", "Turn spent closing a door.");
        var retval = {};
        retval["fin"] = 1;
        return retval; 
      } else {
        delete who.flags.closedoor; // someone else closed the door
      }
    }
  }

  var movetype = who.getMovetype();
  if ((movetype === MOVE_WALK) && (who.specials["open_door"])) { movetype = MOVE_WALK_DOOR; }
  var path = who.getHomeMap().getPath(who.getx(),who.gety(),params.destination.x,params.destination.y,movetype);
  path.shift();
  var moved = StepOrSidestep(who,path[0],[params.destination.x, params.destination.y]);
  if (moved["opendoor"]) {
    who.flags.closedoor = {};
    who.flags.closedoor.steps = 1;
    who.flags.closedoor.x = path[0][0];
    who.flags.closedoor.y = path[0][1];
  } else if (who.flags.closedoor && who.flags.closedoor.steps) { who.flags.closedoor.steps++; }

  if ((who.getx() === parseInt(params.destination.x)) && (who.gety() === parseInt(params.destination.y))) {
    who.flags.activityComplete = 1;
    DebugWrite("ai", "Arrived at destination, setting activityComplete.");
  }
  return moved;
}

ais.WaitHere = function(who,params) {
  var retval = {};
  retval["fin"] = 1;
  var whomap = who.getHomeMap();
  DebugWrite("ai", "In WaitHere.");
  if (params.sleep) { who.flags.sleep = 1; DebugWrite("ai", "ZZzzzz."); }
  else {
    if (params.hasOwnProperty("responsibleFor")) {
      if (!who.flags.hasOwnProperty("closingResponsibleDoor")) {
        for (var i=0;i<params.responsibleFor.length;i++) {
          var fea = who.getHomeMap().getTile(params.responsibleFor[i].x,params.responsibleFor[i].y).getTopFeature();
          if (fea.open) {
            if (Dice.roll("1d5") === 1) { 
              DebugWrite("ai", "Chosen to close door at " + fea.getx() + "," + fea.gety() +".");
              who.flags.closingResponsibleDoor = i; 
            }
          }
        }
      }
      if (who.flags.hasOwnProperty("closingResponsibleDoor")) {
        var door = who.flags.closingResponsibleDoor;
        var fea = who.getHomeMap().getTile(params.responsibleFor[door].x,params.responsibleFor[door].y).getTopFeature();
        if (fea.open) {
          DebugWrite("ai", "Working on closing the door at " + fea.getx() + "," + fea.gety() +" as previously decided upon.");
          if (IsAdjacent(who,fea,1)) {
            DebugWrite("ai", "Closing the door.");             
            fea.use(who);
            if (GetDistance(fea.getx(),fea.gety(),PC.getx(),PC.gety(),"square") <= 5) {
              DrawMainFrame("draw",whomap,PC.getx(),PC.gety());
            }             
            delete who.flags.closingResponsibleDoor;
            return retval;
          } else {
            DebugWrite("ai", "Approaching the door.");            
            var path = whomap.getPath(who.getx(), who.gety(), params.responsibleFor[door].x, params.responsibleFor[door].y,MOVE_WALK_DOOR);
            if (path.length === 0) {
              // There is no path to the door, giving up on closing it... this time
              DebugWrite("ai", "No path to the door, giving up.");
              delete who.flags.closingResponsibleDoor;
            } else {
              path.shift();
              StepOrSidestep(who, path[0], [params.responsibleFor[door].x, params.responsibleFor[door].y]);
              DebugWrite("ai", "Moved towards the door.");
              return retval;
            }
          }
        } else {
          DebugWrite("ai", "Someone else has closed the door. Skipping my action out of confusion!");
          delete who.flags.closingResponsibleDoor;
        }
      }
    }

    if (params.leashLength) {
      if (GetDistance(who.getx(),who.gety(),who.leashCenter.x,who.leashCenter.y) > params.leashLength) {
        var path = whomap.getPath(who.getx(),who.gety(),who.leashCenter.x,who.leashCenter.y,MOVE_WALK_DOOR);
        if (path) {
          path.shift();
          StepOrSidestep(who,path[0], [who.leashCenter.x,who.leashCenter.y]);
          DebugWrite("ai", "Tried to move toward the center of my leash.");
        } else {
          DebugWrite("ai", "No path back into my leash.");
          // skipping turn in confusion
        }
      } else {
        // I am permitted to wander
        if (Dice.roll("1d2") === 2) {
          var moveval = ais.Randomwalk(who,25,25,25,25);
          DebugWrite("ai", "Wander wander wander.");
        } else {
          DebugWrite("ai", "Could have wandered, chose not to.");
        }
      }
    }
  }

  return retval;
}

ais.LeaveMap = function(who,params) {
  var whox = who.getx();
  var whoy = who.gety();
  who.getHomeMap().deleteThing(who);
  DrawMainFrame("one",themap,whox,whoy); 
  DebugWrite('ai', "I have left the map.");
  DUTime.removeEntityFrom(who);  

  var retval = {};
  retval["fin"] = 1;
  return retval;
}

ais.ChangeMap = function(who,params) {
  var destmap = maps.getMap(params.destination.mapName);
  if (!destmap) { alert("Failure to find map " + params.destination.mapName); }
  var desttile = MoveBetweenMaps(who,who.getHomeMap(),destmap,params.destination.x,params.destination.y);
  if (desttile) {
    who.flags.activityComplete = 1;
    DebugWrite("ai", "Changed maps.");
  } else {
    DebugWrite("ai", "Failed to change maps. Will try again next turn.");
  }

  var retval = {};
  retval["fin"] = 1;
  return retval;
}

ais.CallAI = function(who,params) {
  var callparams = params.params;
  var allparams = callparams.split(",");
  var finalparams = {};
  for (var i=0;i<allparams.length;i++) {
    var entry = allparams[i].split(":");
    entry[0] = entry[0].replace(/^ /,"");
    entry[0] = entry[0].replace(/ $/,"");
    entry[1] = entry[1].replace(/^ /,"");
    entry[1] = entry[1].replace(/ $/,"");
    entry[1] = entry[1].replace(/^"/,"");
    entry[1] = entry[1].replace(/"$/,"");    
    finalparams[entry[0]] = entry[1];
  }
  var retval = ais[params.AIName](who,finalparams);
  if (retval["fin"] = 1) {
    who.flags.activityComplete = 1;
  }
  return retval;
}

ais.PlaceItem = function(who,params) {
  var item = localFactory.createTile(params.name);
  if (item) {
    who.getHomeMap().placeThing(params.x, params.y, item);
    if (who.getHomeMap() === PC.getHomeMap()) {
      DrawMainFrame("one",who.getHomeMap(),params.x,params.y);
    }      
  }
  who.flags.activityComplete = 1;
  who.linkedItem = item;

  return {fin:1};
}

ais.DeleteItem = function(who,params) {
  if (params.param === "last") {
    var item = who.linkedItem;
    if (!item) {
      DebugWrite("ai", "Trying to delete last item, cannot find. Marking complete...");
      who.activityComplete = 1;
    }
    var itemx = item.getx();
    var itemy = item.gety();
    var itemmap = item.getHomeMap();

    item.itemmap.deleteThing(item);

    if (itemmap === PC.getHomeMap()) { DrawMainFrame("one",itemmap,itemx,itemy); }
  }

  return;
}

ais.PlayHarpsichord = function(who,params) {
  // ?? Need to decide what this entails

  return;
}
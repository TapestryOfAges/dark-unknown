"use strict";

// universal parameters:
// Bark information (bark, barkfreq, barkrad)
// Time to declare that this schedule is done (endCondition, endTime)
// Flags to set (setFlag)
ais.scheduled = function(who) {
  DebugWrite("ai", "In SCHEDULED. ");
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

  nowactivity = schedule.scheduleArray[who.getCurrentScheduleIndex()];

  if (nowactivity.params.bark) {
    CheckNPCBark(who,nowactivity);
  }

  if (nowactivity.params.setFlag) {
    var allparams = nowactivity.params.setFlag.split(",");
    for (var i=0;i<allparams.length;i++) {
      allparams[i].replace(/ /g,"");
      if (allparams[i].indexOf("unset_") !== -1) {
        var tmpflag = allparams[i].replace(/unset_/, "");
        if (who.flags[tmpflag]) {
          delete who.flags[tmpflag];
        }
      } else {
        who.flags[allparams[i]] = 1;
      }
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
  if (path[0]) {
    var moved = StepOrSidestep(who,path[0],[params.destination.x, params.destination.y]);
    if (moved["opendoor"]) {
      who.flags.closedoor = {};
      who.flags.closedoor.steps = 1;
      who.flags.closedoor.x = path[0][0];
      who.flags.closedoor.y = path[0][1];
    } else if (who.flags.closedoor && who.flags.closedoor.steps) { who.flags.closedoor.steps++; }
  } else {
    alert(movetype);
    alert(who.getNPCName());
    alert(who.getx() + "," + who.gety());
    alert(DU.schedules[who.getSchedule()]["currentIndex"]);
  }

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
  if (params.sleep) { who.flags.sleep = 1; DebugWrite("ai", "ZZzzzz.<br />"); }
  else {
    if (params.hasOwnProperty("responsibleFor")) {
      if (!who.flags.hasOwnProperty("closingResponsibleDoor")) {
        DebugWrite("ai","Has door responsibilities.<br />");
        for (var i=0;i<params.responsibleFor.length;i++) {
          var fea = who.getHomeMap().getTile(parseInt(params.responsibleFor[i].x),parseInt(params.responsibleFor[i].y)).getTopFeature();
          DebugWrite("ai","Responsible for door at " + parseInt(params.responsibleFor[i].x) + "," + parseInt(params.responsibleFor[i].y + ".<br />");
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
        var fea = who.getHomeMap().getTile(parseInt(params.responsibleFor[door].x),parseInt(params.responsibleFor[door].y)).getTopFeature();
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
            var path = whomap.getPath(who.getx(), who.gety(), parseInt(params.responsibleFor[door].x), parseInt(params.responsibleFor[door].y),MOVE_WALK_DOOR);
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

    var leashCenter;
    var ii = who.getCurrentScheduleIndex();
    ii--;
    while (!leashCenter) {
      if (DU.schedules[who.getSchedule()].scheduleArray[ii].params.destination) {
        leashCenter = {};
        leashCenter.x = DU.schedules[who.getSchedule()].scheduleArray[ii].params.destination.x;
        leashCenter.y = DU.schedules[who.getSchedule()].scheduleArray[ii].params.destination.y;
      } else {
        ii--;
        if (ii < 0) { ii = DU.schedules[who.getSchedule()].scheduleArray.length - 1; }
      }
    }
    if (!params.leashLength) { params.leashLength = 0; }
      if (GetDistance(who.getx(),who.gety(),leashCenter.x,leashCenter.y) > params.leashLength) {
        var path = whomap.getPath(who.getx(),who.gety(),leashCenter.x,leashCenter.y,MOVE_WALK_DOOR);        if (path) {
        path.shift();
        StepOrSidestep(who,path[0], [leashCenter.x,leashCenter.y]);
        DebugWrite("ai", "Tried to move toward the center of my leash.");
      } else {
        DebugWrite("ai", "No path back into my leash.");
        // skipping turn in confusion
      }
    } else if (params.leashLength > 0) {
      // I am permitted to wander
      if (Dice.roll("1d2") === 2) {
        var moveval = ais.Randomwalk(who,25,25,25,25);
        DebugWrite("ai", "Wander wander wander.");
      } else {
        DebugWrite("ai", "Could have wandered, chose not to.");
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
  var retval = ais[params.AIName](who,JSON.parse(params.params));
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
  who.linkedItem = item;

  return {fin:1};
}

ais.DeleteItem = function(who,params) {
  if (params.param === "last") {
    var item = who.linkedItem;
    if (!item) {
      DebugWrite("ai", "Trying to delete last item, cannot find. Marking complete...");
      who.flags.activityComplete = 1;
    }
    var itemx = item.getx();
    var itemy = item.gety();
    var itemmap = item.getHomeMap();

    item.itemmap.deleteThing(item);

    if (itemmap === PC.getHomeMap()) { DrawMainFrame("one",itemmap,itemx,itemy); }
  }

  return {fin:1};
}

ais.PlayHarpsichord = function(who,params) {
  // ?? Need to decide what this entails

  return {fin:1};
}

ais.PrintThing = function(who,params) {
  if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= params.rad) {
    var mybark = params.print;
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
  return {fin:1};
}

// params:
// x,y of door
// lock = unlock/lock
ais.LockDoor = function(who,params){
  var tile = who.getHomeMap().getTile(params.x,params.y);
  var door = tile.getTopFeature();
  if (door.hasOwnProperty(locked)) {
    if (door.locked && (params.lock === "unlock")) {
      door.unLockMe();
    } else if (!door.locked && (params.lock === "lock")) {
      door.lockMe();
    }
  }
  return {fin:1};
}

ais.UseThing = function(who,params) {
  var tile = who.getHomeMap().getTile(params.x,params.y);
  var thing = tile.getTopFeature();
  if (typeof thing.use === "function") {
    thing.use(who);
  }
  return {fin:1};
}
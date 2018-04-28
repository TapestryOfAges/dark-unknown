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
    let prevtime;
    let previdx = who.getCurrentScheduleIndex() - 1;
    while (!prevtime) {
      if (previdx < 0) { previdx = schedule.scheduleArray.length-1; }
      if (schedule.scheduleArray[previdx].params.startCondition === "Time") {
        prevtime = schedule.scheduleArray[previdx].params.startTime;
      }
      previdx--;
    }
    if (DiffTime(nextactivity.params.startTime,currtime) <= DiffTime(prevtime,currtime)) {
      DebugWrite("schedules", "Moving to next scheduled activity (" + nextidx + ")- startTime met.");
      who.setCurrentScheduleIndex(nextidx);
      delete who.pushing;
    }
  }
  else if (nextactivity.params.startCondition === "PreviousComplete") {
    if (nowactivity.params.endCondition === "Time") {
      if (CheckTimeAfterTime(currtime, nowactivity.params.endTime)) {
        DebugWrite("schedules", "Moving to next scheduled activity- endTime met.");
        who.setCurrentScheduleIndex(nextidx);
        delete who.pushing;
      }
    }
    if (who.flags.activityComplete) {
      console.log(who.getNPCName() + ": Next activity due to activity complete at " + currtime + ". Moving to index " + nextidx + ".");
      DebugWrite("schedules", who.getNPCName() + ": Next activity due to activity complete at " + currtime + ".");
      who.setCurrentScheduleIndex(nextidx);
      delete who.flags.activityComplete;
      delete who.pushing;
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

  who.currentActivity = nowactivity.type;
  return ais[nowactivity.type](who, nowactivity.params);
}

function CheckNPCBark(who,nowactivity) {
  if (who.getHomeMap() === PC.getHomeMap()) { 
    if (Dice.roll("1d100")  < nowactivity.params.barkfreq) {
      let barkrad = nowactivity.params.barkrad;
      if (barkrad) { barkrad = 3; }
      if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= barkrad) {
        // bark!
        DebugWrite("schedules", "Townfolk barking.");
        var barkarr = nowactivity.params.bark.split("^^");
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
  DebugWrite("schedules", "In scheduled ai: RouteTo.");

  if (params.closeDoors && (who.flags.closedoor) && (who.flags.closedoor.steps === 3)) {
    var fea = who.getHomeMap().getTile(who.flags.closedoor.x,who.flags.closedoor.y).getTopFeature();
    if (fea.closedgraphic) {
      if (fea.open) {  // door hasn't been closed already
        MakeUseHappen(who,fea,"map");
        if (GetDistance(fea.getx(),fea.gety(),PC.getx(),PC.gety(),"square") <= 5) {
          DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
        } 
        delete who.flags.closedoor;
        DebugWrite("schedules", "Turn spent closing a door.");
        var retval = {};
        retval["fin"] = 1;
        return retval; 
      } else {
        delete who.flags.closedoor; // someone else closed the door
      }
    }
  }

  let moved = {};
  if ((who.getx() !== parseInt(params.destination.x)) || (who.gety() !== parseInt(params.destination.y))) {
    var movetype = who.getMovetype();    
    if ((movetype === MOVE_WALK) && (who.specials["open_door"])) { movetype = MOVE_WALK_DOOR; }
    var gridbackup = who.getHomeMap().getPathGrid(movetype).clone();
    
    let npcs = who.getHomeMap().npcs.getAll();
    for (let i=0;i<npcs.length;i++) {
      if ((npcs[i].getCurrentAI() === "scheduled") && ((npcs[i].currentActivity !== "RouteTo") && (npcs[i].currentActivity !== "ChangeMap"))) {
        // creating a one-time pathmap that makes NPCs who are not currently moving (RouteTo or ChangeMap) considered impassable 
        gridbackup.setWalkableAt(npcs[i].getx(),npcs[i].gety(),false);
      } else {
        // other NPCs get a path weight cost- walk around if possible, push through if not
        gridbackup.setCostAt(npcs[i].getx(),npcs[i].gety(),5);
      }
    }
    if (who.getHomeMap() === PC.getHomeMap()) {
      // make PC a difficult square
      gridbackup.setCostAt(PC.getx(),PC.gety(),5);
    }
    gridbackup.setWalkableAt(params.destination.x,params.destination.y,true);
    gridbackup.setWalkableAt(who.getx(),who.gety(),true);

    var path = finder.findPath(who.getx(),who.gety(),params.destination.x,params.destination.y,gridbackup);

//    var path = who.getHomeMap().getPath(who.getx(),who.gety(),params.destination.x,params.destination.y,movetype);
    path.shift();
    if (path[0]) {
      moved = StepOrSidestep(who,path[0],[params.destination.x, params.destination.y]);
      if (moved["opendoor"]) {
        who.flags.closedoor = {};
        who.flags.closedoor.steps = 1;
        who.flags.closedoor.x = path[0][0];
        who.flags.closedoor.y = path[0][1];
      } else if (who.flags.closedoor && who.flags.closedoor.steps) { who.flags.closedoor.steps++; }
      if (!moved["canmove"] && moved["intoPC"]) {
        who.flags.activityComplete = 1;
        DebugWrite("schedules", "PC at destination, giving up and setting activityComplete.<br />");
      }
    } else {
      console.log(who.getNPCName() + " on " + who.getHomeMap().getName() + " at " + who.getx() + "," + who.gety());
      console.log("Failed to move, in schedule index " + DU.schedules[who.getSchedule()]["currentIndex"]);
    }
  } else { DebugWrite("schedules", "Already at destination... "); }

  if ((who.getx() === parseInt(params.destination.x)) && (who.gety() === parseInt(params.destination.y))) {
    who.flags.activityComplete = 1;
    DebugWrite("schedules", "Arrived at destination, setting activityComplete.<br />");
  }
  return moved;
}

ais.WaitHere = function(who,params) {
  var retval = {};
  retval["fin"] = 1;
  var whomap = who.getHomeMap();
  DebugWrite("schedules", "In WaitHere.");
  if (params.sleep) { who.flags.sleep = 1; DebugWrite("schedules", "ZZzzzz.<br />"); }
  else {
    if (params.hasOwnProperty("responsibleFor")) {
      if (!who.flags.hasOwnProperty("closingResponsibleDoor")) {
        DebugWrite("schedules","Has door responsibilities.<br />");
        for (var i=0;i<params.responsibleFor.length;i++) {
          var fea = who.getHomeMap().getTile(parseInt(params.responsibleFor[i].x),parseInt(params.responsibleFor[i].y)).getTopFeature();
          DebugWrite("schedules","Responsible for door at " + parseInt(params.responsibleFor[i].x) + "," + parseInt(params.responsibleFor[i].y + ".<br />"));
          if (fea.open) {
            if (Dice.roll("1d8") === 1) { 
              DebugWrite("schedules", "Chosen to close door at " + fea.getx() + "," + fea.gety() +".");
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
            MakeUseHappen(who,fea,"map");
            if ((GetDistance(fea.getx(),fea.gety(),PC.getx(),PC.gety(),"square") <= 5) && (whomap === PC.getHomeMap())) {
              DrawMainFrame("draw",whomap,PC.getx(),PC.gety());
            }             
            delete who.flags.closingResponsibleDoor;
            return retval;
          } else {
            DebugWrite("ai", "Approaching the door.");       
            if ((who.getx() === parseInt(params.responsibleFor[door].x) && (who.gety() === parseInt(params.responsibleFor[door].y)))) {
              let leashCenter;
              let ii = who.getCurrentScheduleIndex();
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
          
              var path = whomap.getPath(who.getx(),who.gety(),leashCenter.x,leashCenter.y,MOVE_WALK_DOOR);        
              if (path) {
                path.shift();
                StepOrSidestep(who,path[0], [leashCenter.x,leashCenter.y]);
                DebugWrite("schedules", "Standing in my doorway, tried to move toward the center of my leash.");
              } else {
                DebugWrite("schedules", "Standing in my doorway, no path back into my leash.");
                // skipping turn in confusion
              }        
            } else {
              var path = whomap.getPath(who.getx(), who.gety(), parseInt(params.responsibleFor[door].x), parseInt(params.responsibleFor[door].y),MOVE_WALK_DOOR);
              path.shift();
              if (path.length === 0) {
                // There is no path to the door, giving up on closing it... this time
                DebugWrite("ai", "No path to the door, giving up.");
                delete who.flags.closingResponsibleDoor;
              } else {
                StepOrSidestep(who, path[0], [params.responsibleFor[door].x, params.responsibleFor[door].y]);
                DebugWrite("ai", "Moved towards the door.");
                return retval;
              }
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
      var path = whomap.getPath(who.getx(),who.gety(),leashCenter.x,leashCenter.y,MOVE_WALK_DOOR);        
      if (path) {
        path.shift();
        StepOrSidestep(who,path[0], [leashCenter.x,leashCenter.y]);
        DebugWrite("schedules", "Tried to move toward the center of my leash.");
      } else {
        DebugWrite("schedules", "No path back into my leash.");
        // skipping turn in confusion
      }
    } else if (params.leashLength > 0) {
      // I am permitted to wander
      if (Dice.roll("1d2") === 2) {
        who.aiWandering = 1;
        var moveval = ais.Randomwalk(who,25,25,25,25);
        delete who.aiWandering;
        DebugWrite("schedules", "Wander wander wander.");
      } else {
        DebugWrite("schedules", "Could have wandered, chose not to.");
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
  DebugWrite('schedules', "I have left the map.");
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
    DebugWrite("schedules", "Changed maps.");
  } else {
    DebugWrite("schedules", "Failed to change maps. Will try again next turn.");
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
    if ((who.getHomeMap() === PC.getHomeMap()) && (IsVisibleOnScreen(params.x,params.y))) {
      DrawMainFrame("one",who.getHomeMap(),params.x,params.y);
    }      
  }
  who.linkedItem = item;

  return {fin:1};
}

ais.DeleteItem = function(who,params) {
  DebugWrite("schedules", "In DeleteItem... ");
  if (params.param === "last") {
    var item = who.linkedItem;
    if (!item) {
      DebugWrite("schedules", "Trying to delete last item, cannot find. Marking complete...");
      who.flags.activityComplete = 1;
    }
    var itemx = item.getx();
    var itemy = item.gety();
    var itemmap = item.getHomeMap();

    DebugWrite("schedules", "Deleting " + item.getName() + " from " + itemx + "," + itemy + " on map " + itemmap.getName() + " ...");

    itemmap.deleteThing(item);

    if ((itemmap === PC.getHomeMap()) && (IsVisibleOnScreen(itemx,itemy))) { DrawMainFrame("one",itemmap,itemx,itemy); }
  }
  DebugWrite("schedules", "<br />");
  return {fin:1};
}

// params:
// x,y of door
// lock = unlock/lock
ais.LockDoor = function(who,params){
  var tile = who.getHomeMap().getTile(params.x,params.y);
  var door = tile.getTopFeature();
  if (door.hasOwnProperty("locked")) {
    if (door.locked && (params.lock === "unlock")) {
      door.unlockMe();
    } else if (!door.locked && (params.lock === "lock")) {
      if (door.open) {
        MakeUseHappen(who,door,"map");
//        door.use(who);
      }
      door.lockMe();
    }
  }
  return {fin:1};
}


ais.PlaceFood = function(who,which) {
  // Sean 1 is table 67,23 to 70,23
  // Sean 2 is table 66,27 to 70,27
  // Manny 1 is table 61,23 to 64,23
  // Manny 2 is table 61,27 to 65,27

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

ais.UseThing = function(who,params) {
  var tile = who.getHomeMap().getTile(params.x,params.y);
  var thing = tile.getTopFeature();
  if (thing && (typeof thing.use === "function")) {
    MakeUseHappen(who,thing,"map");
//    thing.use(who);
  } else {
    console.log(who.getNPCName() + " tried to use a thing at " + params.x + "," + params.y + " but it wasn't there to use.");
  }
  return {fin:1};
}

ais.CloseDoor = function(who,params) {
  var tile = who.getHomeMap().getTile(params.x,params.y);
  var thing = tile.getTopFeature();
  if (typeof thing.use === "function") {
    if (thing.open) {
      MakeUseHappen(who,thing,"map");
//      thing.use(who);
    }
  }
  return {fin:1};
}

ais.LightLight = function(who,params) {
  var tile = who.getHomeMap().getTile(params.x,params.y);
  var thing = tile.getTopFeature();
  if (typeof thing.getLight === "function") {
    if (thing.getLight() && (params.light === 0)) {
      MakeUseHappen(who,thing,"map");
    } else if (!thing.getLight() && (params.light === 1)) {
      MakeUseHappen(who,thing,"map");
    }
  }
  return {fin:1};
}

ais.ChangeGraphic = function(who,params) {
  who.setGraphic(params.graphic);
  return {fin:1};
}

ais.CheckTreasuryLock = function(who,params) {
  let doortile = who.getHomeMap().getTile(9,20);
  let door = doortile.getTopFeature();
  if (door.locked) { return {fin:0}; }

  return {fin:1};
}

ais.PassOlympusGuardDoor = function(who,params) {
  let door = who.getHomeMap().getTile(47,57).getTopFeature();
  if (who.getx() === 46) {
    if (!door.open) {
      door.unlockMe();
      MakeUseHappen(who,door,"map");
    }
    who.moveMe(1,0);
    return {fin:0};
  } else if (who.getx() === 48) {
    if (!door.open) {
      door.unlockMe();
      MakeUseHappen(who,door,"map");
    }
    who.moveMe(-1,0);
    return {fin:0};
  } else if (params.dir === "east") {
    who.moveMe(1,0);
    if (door.open) {
      MakeUseHappen(who,door,"map");
    }
    door.lockMe();
    return {fin:1};  
  } else {
    who.moveMe(-1,0);
    if (door.open) {
      MakeUseHappen(who,door,"map");
    }
    door.lockMe();
    return {fin:1};  
  }
  alert("Error in PassOlympusGuardDoor - called by " + who.getNPCName())
}
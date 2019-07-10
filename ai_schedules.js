"use strict";

// universal parameters:
// Bark information (bark, barkfreq, barkrad)
// Time to declare that this schedule is done (endCondition, endTime)
// Flags to set (setFlag)
ais.scheduled = function(who) {
  DebugWrite("ai", "In SCHEDULED. ");
  delete who.flags.sleep;
  // will be re-set in WaitHere if still asleep

  if ((who.flags.closedoor) && (who.flags.closedoor.steps === 3)) {
    let fea = who.getHomeMap().getTile(who.flags.closedoor.x,who.flags.closedoor.y).getTopFeature();
    if (fea.closedgraphic) {
      if (fea.open) {  // door hasn't been closed already
        MakeUseHappen(who,fea,"map");
        if (GetDistance(fea.getx(),fea.gety(),PC.getx(),PC.gety(),"square") <= 5) {
          DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
        } 
        delete who.flags.closedoor;
        DebugWrite("schedules", "Turn spent closing a door.");
        return {fin:1}; 
      } else {
        delete who.flags.closedoor; // someone else closed the door
      }
    }
  }

  let nextidx = who.getCurrentScheduleIndex() + 1;
  let schedule = DU.schedules[who.getSchedule()];
  if (nextidx >= schedule.scheduleArray.length) { nextidx = 0; }

  let currtime = GetUsableClockTime();

  let nowactivity = schedule.scheduleArray[who.getCurrentScheduleIndex()];
  let nextactivity = schedule.scheduleArray[nextidx];
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
      who.incrementCurrentScheduleIndex();
      delete who.pushing;
    }
  }
  else if (nextactivity.params.startCondition === "PreviousComplete") {
    if (nowactivity.params.endCondition === "Time") {
      if (CheckTimeAfterTime(currtime, nowactivity.params.endTime)) {
        DebugWrite("schedules", "Moving to next scheduled activity- endTime met.");
        who.incrementCurrentScheduleIndex();
        delete who.pushing;
      }
    }
    if (who.flags.activityComplete) {
      DebugWrite("schedules", who.getNPCName() + ": Next activity due to activity complete at " + currtime + ".");
      who.incrementCurrentScheduleIndex();
      delete who.flags.activityComplete;
      delete who.pushing;
    }
  }

  nowactivity = schedule.scheduleArray[who.getCurrentScheduleIndex()];

  DebugWrite("schedules", "Checking bark... ");
  CheckNPCBark(who,nowactivity);

  if (nowactivity.params.setFlag) {
    let allparams = nowactivity.params.setFlag.split(",");
    for (let i=0;i<allparams.length;i++) {
      allparams[i].replace(/ /g,"");
      if (allparams[i].indexOf("unset_") !== -1) {
        let tmpflag = allparams[i].replace(/unset_/, "");
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
    let mybark = "";
    if (who.getSpellEffectsByName("Drunk") && (Dice.roll("1d100") <= 9)) {
      if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= 3) {
        mybark = '%THEDESC% says, "hic!"';
      }
    }
    if (nowactivity.params.bark) {
      let chanceroll = Dice.roll("1d100");
      if (chanceroll < parseInt(nowactivity.params.barkfreq)) { 
        let barkrad = nowactivity.params.barkrad;
        if (!barkrad) { barkrad = 3; }
        if (GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= barkrad) {
          // bark!
          DebugWrite("schedules", "Townfolk barking.");
          let barkarr = nowactivity.params.bark.split("^^");
          let idx = Dice.roll("1d" + barkarr.length + "-1");
          mybark = barkarr[idx];
        }
      }
    }
    if (mybark) {
      if ((mybark.indexOf("%THEDESC%") !== -1) || (mybark.indexOf("%DESC%") !== -1)) {
        let pref = who.getPrefix();
        if (mybark.indexOf("%THEDESC%") !== -1) {
          if ((pref === "a") || (pref === "an")) { pref = "the"; }
        }
        let desc = who.getDesc();
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

// Called by the "Route To" schedule. Parameters include:
// Destination (obj: x,y)
// Close doors behind (closeDoors)
ais.RouteTo = function(who, params) {
  DebugWrite("schedules", "In scheduled ai: RouteTo.");

  let drunk = who.getSpellEffectsByName("Drunk");
  if (!who.flags.closedoor && drunk && (Dice.roll("1d15") <= drunk.getPower())) {
    let dir = Dice.roll("1d6");
    if (dir === 1) { who.moveMe(0,-1,0); }
    if (dir === 2) { who.moveMe(1,0,0); }
    if (dir === 3) { who.moveMe(0,1,0); }
    if (dir === 4) { who.moveMe(-1,0,0); }  
    console.log(who.getNPCName() + " stumbling.");
    return {fin:1,canmove:0};
  }

  let moved = {};
  if ((who.getx() !== parseInt(params.destination.x)) || (who.gety() !== parseInt(params.destination.y))) {
    let movetype = who.getMovetype();    
    if ((movetype === MOVE_WALK) && (who.specials["open_door"])) { movetype = MOVE_WALK_DOOR; }
    let gridbackup = who.getHomeMap().getPathGrid(movetype).clone();
    
    let npcs = who.getHomeMap().npcs.getAll();
    DebugWrite("schedules","Making NPCs block paths: ");
    for (let i=0;i<npcs.length;i++) {
      if ((npcs[i] !== who) && (npcs[i].getCurrentAI() === "scheduled") && ((npcs[i].currentActivity !== "RouteTo") && (npcs[i].currentActivity !== "ChangeMap") && (npcs[i].currentActivity !== "CallAI"))) {
        // creating a one-time pathmap that makes NPCs who are not currently moving (RouteTo or ChangeMap) or doing something quick (CallAI) considered impassable 
        gridbackup.setWalkableAt(npcs[i].getx(),npcs[i].gety(),false);
        DebugWrite("schedules",npcs[i].getNPCName() + " (" + npcs[i].getx() + "," + npcs[i].gety() + "), ");
      } else {
        // other NPCs get a path weight cost- walk around if easy, push through (or bump into and sidestep) if not
        gridbackup.setWeightAt(npcs[i].getx(),npcs[i].gety(),2);
      }
    }
    DebugWrite("schedules","<br />");
    if (who.getHomeMap() === PC.getHomeMap()) {
      // make PC a difficult square
      gridbackup.setWeightAt(PC.getx(),PC.gety(),5);
    }
    gridbackup.setWalkableAt(params.destination.x,params.destination.y,true);
    gridbackup.setWalkableAt(who.getx(),who.gety(),true);

    let path = finder.findPath(who.getx(),who.gety(),params.destination.x,params.destination.y,gridbackup);

    path.shift();

    if (path[0]) {
      moved = StepOrSidestep(who,path[0],[parseInt(params.destination.x), parseInt(params.destination.y)]);
      if (moved["opendoor"]) {
        who.flags.closedoor = {};
        who.flags.closedoor.steps = 1;
        who.flags.closedoor.x = path[0][0];
        who.flags.closedoor.y = path[0][1];
      } else if (moved["canmove"] && who.flags.closedoor && who.flags.closedoor.steps) { who.flags.closedoor.steps++; }
      if (!moved["canmove"] && moved["intoPC"]) {
        who.flags.activityComplete = 1;
        DebugWrite("schedules", "PC at destination, giving up and setting activityComplete.<br />");
      }
    } else if ((who.getx() === params.destination.x) && (who.gety() === params.destination.y)) {
      who.flags.activityComplete = 1;
      DebugWrite("schedules", "I am already at my destination somehow.<br />");
      console.log(who.getNPCName() + " somehow is already at her destination.");
    } else {
      console.log(who.getNPCName() + " on " + who.getHomeMap().getName() + " at " + who.getx() + "," + who.gety());
      console.log("Failed to move, in schedule index " + who.getCurrentScheduleIndex() + " at " + GetUsableClockTime());
    }
  } else { DebugWrite("schedules", "Already at destination... "); }

  if ((who.getx() === parseInt(params.destination.x)) && (who.gety() === parseInt(params.destination.y))) {
    who.flags.activityComplete = 1;
    DebugWrite("schedules", "Arrived at destination, setting activityComplete.<br />");
  }
  return moved;
}

ais.WaitHere = function(who,params) {
  let retval = {fin:1};
  let whomap = who.getHomeMap();
  DebugWrite("schedules", "In WaitHere.");
  if (params.sleep) { who.flags.sleep = 1; DebugWrite("schedules", "ZZzzzz.<br />"); }
  else {
    if (params.hasOwnProperty("responsibleFor")) {
      if (!who.flags.hasOwnProperty("closingResponsibleDoor")) {
        DebugWrite("schedules","Has door responsibilities.<br />");
        for (let i=0;i<params.responsibleFor.length;i++) {
          let fea = who.getHomeMap().getTile(parseInt(params.responsibleFor[i].x),parseInt(params.responsibleFor[i].y)).getTopFeature();
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
        let door = who.flags.closingResponsibleDoor;
        let fea = who.getHomeMap().getTile(parseInt(params.responsibleFor[door].x),parseInt(params.responsibleFor[door].y)).getTopFeature();
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
          
              let path = whomap.getPath(who.getx(),who.gety(),leashCenter.x,leashCenter.y,MOVE_WALK_DOOR);        
              if (path) {
                path.shift();
                StepOrSidestep(who,path[0], [leashCenter.x,leashCenter.y]);
                DebugWrite("schedules", "Standing in my doorway, tried to move toward the center of my leash.");
              } else {
                DebugWrite("schedules", "Standing in my doorway, no path back into my leash.");
                // skipping turn in confusion
              }        
            } else {
              let path = whomap.getPath(who.getx(), who.gety(), parseInt(params.responsibleFor[door].x), parseInt(params.responsibleFor[door].y),MOVE_WALK_DOOR);
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
    if (!params.leashLength) { params.leashLength = 0; }
    if (GetDistance(who.getx(),who.gety(),leashCenter.x,leashCenter.y) > params.leashLength) {
      let path = whomap.getPath(who.getx(),who.gety(),leashCenter.x,leashCenter.y,MOVE_WALK_DOOR);        
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
      if ((Dice.roll("1d2") === 2) || who.pushed) {
        who.aiWandering = 1;
        let moveval = ais.Randomwalk(who,25,25,25,25);
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
  let whox = who.getx();
  let whoy = who.gety();
  let themap = who.getHomeMap();
  who.getHomeMap().deleteThing(who);
  DrawMainFrame("one",themap,whox,whoy); 
  DebugWrite('schedules', "I have left the map.");
  DUTime.removeEntityFrom(who);  

  return {fin:1};
}

ais.ChangeMap = function(who,params) {
  let destmap = maps.getMap(params.destination.mapName);
  if (!destmap) { alert("Failure to find map " + params.destination.mapName); }
  let desttile = MoveBetweenMaps(who,who.getHomeMap(),destmap,params.destination.x,params.destination.y);
  if (desttile) {
    who.flags.activityComplete = 1;
    DebugWrite("schedules", "Changed maps. Going to (" + params.destination.x + "," + params.destination.y + "), wound up at (" + who.getx() + "," + who.gety() + ").<br />");
  } else {
    DebugWrite("schedules", "Failed to change maps. Will try again next turn.");
  }

  return {fin:1};
}

ais.CallAI = function(who,params) {
  let retval = ais[params.AIName](who,JSON.parse(params.params));
  if (retval["fin"] === 1) {
    who.flags.activityComplete = 1;
  }
  return retval;
}

ais.PlaceItem = function(who,params) {
  let item = localFactory.createTile(params.name);
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
    let item = who.linkedItem;
    if (!item) {
      DebugWrite("schedules", "Trying to delete last item, cannot find. Marking complete...");
      who.flags.activityComplete = 1;
    } else {
      let itemx = item.getx();
      let itemy = item.gety();
      let itemmap = item.getHomeMap();

      DebugWrite("schedules", "Deleting " + item.getName() + " from " + itemx + "," + itemy + " on map " + itemmap.getName() + " ...");

      itemmap.deleteThing(item);

      if ((itemmap === PC.getHomeMap()) && (IsVisibleOnScreen(itemx,itemy))) { DrawMainFrame("one",itemmap,itemx,itemy); }
    }
  }
  DebugWrite("schedules", "<br />");
  return {fin:1};
}

// params:
// x,y of door
// lock = unlock/lock
ais.LockDoor = function(who,params){
  let tile = who.getHomeMap().getTile(params.x,params.y);
  let door = tile.getTopFeature();
  if (door.hasOwnProperty("locked")) {
    if (door.locked && (params.lock === "unlock")) {
      door.unlockMe();
    } else if (!door.locked && (params.lock === "lock")) {
      if (door.open) {
        MakeUseHappen(who,door,"map");
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
  if (!params.rad) { params.rad = 5; }
  if ((GetDistance(who.getx(),who.gety(),PC.getx(),PC.gety()) <= params.rad) && (who.getHomeMap() === PC.getHomeMap())) {
    let mybark = params.print;
    if ((mybark.indexOf("%THEDESC%") !== -1) || (mybark.indexOf("%DESC%") !== -1)) {
      let pref = who.getPrefix();
      if (mybark.indexOf("%THEDESC%") !== -1) {
        if ((pref === "a") || (pref === "an")) { pref = "the"; }
      }
      let desc = who.getDesc();
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
  let tile = who.getHomeMap().getTile(params.x,params.y);
  let thing = tile.getTopFeature();
  if (thing && (typeof thing.use === "function")) {
    MakeUseHappen(who,thing,"map");
  } else {
    console.log(who.getNPCName() + " tried to use a thing at " + params.x + "," + params.y + " but it wasn't there to use.");
  }
  return {fin:1};
}

ais.CloseDoor = function(who,params) {
  let tile = who.getHomeMap().getTile(params.x,params.y);
  let thing = tile.getTopFeature();
  if (typeof thing.use === "function") {
    if (thing.open) {
      MakeUseHappen(who,thing,"map");
    }
  }
  return {fin:1};
}

ais.LightLight = function(who,params) {
  let tile = who.getHomeMap().getTile(params.x,params.y);
  let thing = tile.getTopFeature();
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
  let xoff = "0";
  let yoff = "0";
  if (params.xoff) { xoff = params.xoff; }
  if (params.yoff) { yoff = params.yoff; }
  who.setGraphicArray([params.graphic,"",xoff,yoff]);
  DrawMainFrame("one", who.getHomeMap(), who.getx(), who.gety());
  return {fin:1};
}

ais.CheckTreasuryLock = function(who,params) {
  let doortile = who.getHomeMap().getTile(9,20);
  let door = doortile.getTopFeature();
  if (door.locked) { return {fin:0}; }

  return {fin:1};
}

ais.PassOlympusGuardDoor = function(who,params) {
  DebugWrite("schedules", "In PassOlympusGuardDoor going " + params.dir + ".<br />");
  let door = who.getHomeMap().getTile(47,57).getTopFeature();
  if (who.getx() === 46) {
    DebugWrite("schedules", "West of door, going east. ");
    if (!door.open) {
      DebugWrite("schedules", "Unlock and open door. ");
      door.unlockMe();
      MakeUseHappen(who,door,"map");
    }
    who.moveMe(1,0);
    DebugWrite("schedules", "Step through. Activity unfinished.<br />");
    return {fin:0};
  } else if (who.getx() === 48) {
    DebugWrite("schedules", "East of door, going west. ");
    if (!door.open) {
      DebugWrite("schedules", "Unlock and open door. ");
      door.unlockMe();
      MakeUseHappen(who,door,"map");
    }
    who.moveMe(-1,0);
    DebugWrite("schedules", "Step through. Activity unfinished.<br />");
    return {fin:0};
  } else if (params.dir === "east") {
    who.moveMe(1,0);
    DebugWrite("schedules", "In doorway, heading east. Stepped out. ");
    if (door.open) {
      DebugWrite("schedules", "Door was open, closing.");
      MakeUseHappen(who,door,"map");
    }
    door.lockMe();
    DebugWrite("schedules", "Door locked : " + door.getLocked() + ". Activity complete.<br />");
    return {fin:1};  
  } else {
    who.moveMe(-1,0);
    DebugWrite("schedules", "In doorway, heading west. Stepped out. ");
    if (door.open) {
      DebugWrite("schedules", "Door was open, closing.");
      MakeUseHappen(who,door,"map");
    }
    door.lockMe();
    DebugWrite("schedules", "Door locked : " + door.getLocked() + ". Activity complete.<br />");
    return {fin:1};  
  }
  alert("Error in PassOlympusGuardDoor - called by " + who.getNPCName());
}

ais.PassPaladinDoor = function(who,params) {
  DebugWrite("schedules", "In PassPaladinDoor going " + params.dir + ".<br />");
  let door = who.getHomeMap().getTile(57,48).getTopFeature();
  if (who.gety() === 47) {
    DebugWrite("schedules", "North of door, going south. ");
    if (!door.open) {
      DebugWrite("schedules", "Unlock and open door. ");
      door.unlockMe();
      MakeUseHappen(who,door,"map");
    }
    who.moveMe(0,1);
    DebugWrite("schedules", "Step through. Activity unfinished.<br />");
    return {fin:0};
  } else if (who.gety() === 49) {
    DebugWrite("schedules", "South of door, going north. ");
    if (!door.open) {
      DebugWrite("schedules", "Unlock and open door. ");
      door.unlockMe();
      MakeUseHappen(who,door,"map");
    }
    who.moveMe(0,-1);
    DebugWrite("schedules", "Step through. Activity unfinished.<br />");
    return {fin:0};
  } else if (params.dir === "south") {
    who.moveMe(0,1);
    DebugWrite("schedules", "In doorway, heading south. Stepped out. ");
    if (door.open) {
      DebugWrite("schedules", "Door was open, closing.");
      MakeUseHappen(who,door,"map");
    }
    door.lockMe(2);
    DebugWrite("schedules", "Door locked : " + door.getLocked() + ". Activity complete.<br />");
    return {fin:1};  
  } else {
    who.moveMe(0,-1);
    DebugWrite("schedules", "In doorway, heading north. Stepped out. ");
    if (door.open) {
      DebugWrite("schedules", "Door was open, closing.");
      MakeUseHappen(who,door,"map");
    }
    door.lockMe(2);
    DebugWrite("schedules", "Door locked : " + door.getLocked() + ". Activity complete.<br />");
    return {fin:1};  
  }
  alert("Error in PassPaladinDoor - called by " + who.getNPCName());
}

ais.GetDrunk = function(who, params) {
  let roll = Dice.roll("1d100");
  console.log(roll);
  if ( roll <= parseInt(params.chance)) {
    console.log(who.getNPCName() + " has gotten drunk.");
    let strwidth = parseInt(params.max - params.min - 1);
    let strength = Dice.roll("1d"+strwidth) + (params.min-1);
    let drunk = localFactory.createTile("Drunk");
    drunk.setPower(strength);
    who.addSpellEffect(drunk);
    drunk.setExpiresTime(parseInt(params.duration)*SCALE_TIME + DUTime.getGameClock());
  }
  return {fin:1};
}

ais.TeleportTo = function(who, params) {
  who.getHomeMap().moveThing(params.x, params.y, who);
  return {fin:1};
}

ais.SwapPlace = function(who, params) {
  who.swapPlace(params.align);
  return {fin:1};
}

ais.CartMoves = function(who, params) {
//  console.log("In CartMoves");
//  console.log(params);
  DebugWrite("schedules", "Cart trying to move...<br />");
  let otherhalf = who.attachedParts[0];
  let moved = {};
  if ((who.getx() !== parseInt(params.destinationx)) || (who.gety() !== parseInt(params.destinationy))) {
//    console.log("Not there yet.");  
    let gridbackup = who.getHomeMap().getPathGrid(MOVE_WALK_DOOR).clone();
    
    if (who.getHomeMap() === PC.getHomeMap()) {
      // make PC a difficult square
      gridbackup.setWeightAt(PC.getx(),PC.gety(),5);
    }
    gridbackup.setWalkableAt(params.destinationx,params.destinationy,true);
    gridbackup.setWalkableAt(who.getx(),who.gety(),true);
    gridbackup.setWalkableAt(otherhalf.getx(),otherhalf.gety(),true);  // allow cart to turn around

    let path = finder.findPath(who.getx(),who.gety(),params.destinationx,params.destinationy,gridbackup);

    path.shift();
//console.log(path);
    if (path[0]) {
      let origx = who.getx();
      let origy = who.gety();
      let origcartx = otherhalf.getx();
      let origcarty = otherhalf.gety();    
//      console.log(otherhalf);
      if ((otherhalf.getx() === path[0][0]) && (otherhalf.gety() === path[0][1])) {
//        console.log("Swapping positions with rear");
        who.swapPlace();
        if (who.getHomeMap() === PC.getHomeMap()) {
          DrawMainFrame("one",who.getHomeMap(),who.getx(),who.gety());
          DrawMainFrame("one",who.getHomeMap(),origx,origy);
        }
        return {fin:0};
      }
      moved = StepOrSidestep(who,path[0],[parseInt(params.destinationx), parseInt(params.destinationy)]);
      if (!moved["canmove"] && moved["intoPC"]) {
        return {fin:1};
        DebugWrite("schedules", "PC at destination, giving up and setting activityComplete.<br />");
      }
      who.getHomeMap().moveThing(who.getx()+who.attachedLocations[0][0],who.gety()+who.attachedLocations[0][1],otherhalf);
      if (who.getHomeMap() === PC.getHomeMap()) {
        DrawMainFrame("one",who.getHomeMap(),who.getx(),who.gety());
        DrawMainFrame("one",who.getHomeMap(),origx,origy);
        DrawMainFrame("one",who.getHomeMap(),otherhalf.getx(),otherhalf.gety());
        DrawMainFrame("one",who.getHomeMap(),origcartx,origcarty);
      }
    } else if ((who.getx() === params.destinationx) && (who.gety() === params.destinationy)) {
      return {fin:1}
      DebugWrite("schedules", "I am already at my destination somehow.<br />");
//      console.log(who.getNPCName() + " somehow is already at her destination.");
    } else {
//      console.log(who.getNPCName() + " on " + who.getHomeMap().getName() + " at " + who.getx() + "," + who.gety());
//      console.log("Failed to move, in schedule index " + who.getCurrentScheduleIndex() + " at " + GetUsableClockTime());
    }
  } else { DebugWrite("schedules", "Already at destination... "); }

  if ((who.getx() === parseInt(params.destinationx)) && (who.gety() === parseInt(params.destinationy))) {
    return {fin:1}

    DebugWrite("schedules", "Arrived at destination, setting activityComplete.<br />");
  }
  return {fin:0};

}

ais.ChangeMapCart = function(who,params) {
//  console.log("In ChangeMapCart");
  let destmap = maps.getMap(params.mapName);
  if (!destmap) { alert("Failure to find map " + params.mapName); }
  let desttile = MoveBetweenMaps(who,who.getHomeMap(),destmap,params.x,params.y);
  if (desttile) {
    who.flags.activityComplete = 1;
    let cart = who.attachedParts[0];
    let cartdestx = params.x;
    if (who.spritexoffset === "-256") { cartdestx -= 1; }
    else { cartdestx += 1; }
    MoveBetweenMaps(cart,cart.getHomeMap(),destmap,cartdestx,params.y);
    DebugWrite("schedules", "Changed maps (Cart). Going to (" + params.x + "," + params.y + "), wound up at (" + who.getx() + "," + who.gety() + ").<br />");
  } else {
    DebugWrite("schedules", "Failed to change maps. Will try again next turn.");
  }
//  console.log(who);

  return {fin:1};
}

ais.ToshinSleep = function(who,params) {
  who.setGraphicArray("master_spritesheet.png","","-64","-800");
  who.sleep = 1;
}

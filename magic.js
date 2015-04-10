
var magic = {};
var bookmark = {};

function SpellObject(name, incant, level, targets) {
  this.name = name;
  this.incant = incant;
  this.level = level;
  this.targets = targets;
  this.reduceresist = 0;
   
}
SpellObject.prototype = new Object();

SpellObject.prototype.getName = function() {
  return this.name;
}

SpellObject.prototype.setName = function(newname) {
  this.name = newname;
  return this.name;
}

SpellObject.prototype.getIncant = function() {
  return this.incant;
}

SpellObject.prototype.getLevel = function() {
  return this.level;
}

SpellObject.prototype.getTargets = function() {
  return this.targets;
}

SpellObject.prototype.getReduceResist = function() {
  return this.returnresist;
}

SpellObject.prototype.myTurn = function() {
  this.executeSpell();
  
	var spellEvent = new GameEvent(this);
  DUTime.addAtTimeInterval(SpellEvent,this.nextActionTime(1));
  
  var nextEntity = DUTime.executeNextEvent().getEntity();
  nextEntity.myTurn(); 
}

SpellObject.prototype.executeSpell = function(caster, infused) {
  // this will be overridden by each spell object

  var retval = {};
  retval["fin"] = 1;
  retval["txt"] = "";
  retval["input"] = "&gt;";
  
  return retval;
}

SpellObject.prototype.expireSpell = function() {
  DUTime.removeEntityFrom(this);
}

SpellObject.prototype.getManaCost = function(infuse) {
  var multiplier = 1;
  if (infuse) { multiplier = 2; }
  var cost = this.getLevel() * multiplier;
  return cost; 
}

function GetSpellID(num) {
  var spellid = (Math.pow(2,(num-1)));
  return spellid;
}

for (var i=1;i<=8;i++) {
  magic[i] = {};
}

magic[1][GetSpellID(1)] = new SpellObject("Cure", "An Nox", 1, 0);      // heal
magic[1][GetSpellID(2)] = new SpellObject("Disarm Trap", "An Jux", 1, 0);   // sound effect is sfx_unlock
magic[1][GetSpellID(3)] = new SpellObject("Distract", "An Wis Xen", 1, 0);  // debuff
magic[1][GetSpellID(4)] = new SpellObject("Flame Blade", "Flam Bet Ylem", 1, 0);     // flames
magic[1][GetSpellID(5)] = new SpellObject("Light", "In Lor", 1, 0);  // has sound
magic[1][GetSpellID(6)] = new SpellObject("Strike", "An Sanct", 1, 1);  // melee hit

magic[2][GetSpellID(1)] = new SpellObject("Illusion", "Quas Xen", 2, 1);
magic[2][GetSpellID(2)] = new SpellObject("Lesser Heal", "Bet Mani", 2, 0);   // heal
magic[2][GetSpellID(3)] = new SpellObject("Magic Bolt", "Grav Por", 2, 1);
magic[2][GetSpellID(4)] = new SpellObject("Poison Blade", "In Nox Bet Ylem", 2, 0);
magic[2][GetSpellID(5)] = new SpellObject("Protect", "In Sanct", 2, 0);   // blessing
magic[2][GetSpellID(6)] = new SpellObject("Unlock", "Ex Por", 2, 0);     // sfx_unlock

magic[3][GetSpellID(1)] = new SpellObject("Fire Armor", "In Sanct Flam", 3, 0);  // flames
magic[3][GetSpellID(2)] = new SpellObject("Fireball", "Flam Por", 3, 1);
magic[3][GetSpellID(3)] = new SpellObject("Iceball", "Frio Por", 3, 1);
magic[3][GetSpellID(4)] = new SpellObject("Poison Wind", "Vas Nox Hur", 3, 0);   // wind
magic[3][GetSpellID(5)] = new SpellObject("Telekinesis", "Ylem Por", 3, 1);
magic[3][GetSpellID(6)] = new SpellObject("Wall of Flame", "Kal Flam", 3, 1);    // flames

magic[4][GetSpellID(1)] = new SpellObject("Blessing", "In Mani Xen", 4, 0);  // blessing
magic[4][GetSpellID(2)] = new SpellObject("Heal", "In Mani", 4, 0);  // heal
magic[4][GetSpellID(3)] = new SpellObject("Life Drain", "In Corp Mani", 4, 1);
magic[4][GetSpellID(4)] = new SpellObject("Smite", "Corp Por", 4, 0);
magic[4][GetSpellID(5)] = new SpellObject("Transport", "Rel Por", 4, 0);    // teleport
magic[4][GetSpellID(6)] = new SpellObject("Water Walk", "Uus Xen", 4, 0);   // blessing
 
magic[5][GetSpellID(1)] = new SpellObject("Mirror Ward", "Ort Sanct", 5, 0);  // blessing
magic[5][GetSpellID(2)] = new SpellObject("Paralyze", "An Ex Por", 5, 1);    // curse
magic[5][GetSpellID(3)] = new SpellObject("Return", "Kal Ort Por", 5, 0);    // none (moongate)
magic[5][GetSpellID(4)] = new SpellObject("Shockwave", "Vas Grav Por Ylem", 5, 0);
magic[5][GetSpellID(5)] = new SpellObject("Summon Ally", "Kal Xen", 5, 1);
magic[5][GetSpellID(6)] = new SpellObject("Swordstrike", "Vas Jux Ylem", 5, 1);  // melee hit

magic[6][GetSpellID(1)] = new SpellObject("Empower", "In Ort Ylem", 6, 0);  // bless
magic[6][GetSpellID(2)] = new SpellObject("Explosion", "Vas Flam Por", 6, 1);
magic[6][GetSpellID(3)] = new SpellObject("Jinx", "Vas Quas", 6, 0);  // curse
magic[6][GetSpellID(4)] = new SpellObject("Mass Curse", "Vas An Sanct", 6, 0);  // curse
magic[6][GetSpellID(5)] = new SpellObject("Lightning Storm", "In Grav Hur", 6, 0);
magic[6][GetSpellID(6)] = new SpellObject("Negate Magic", "An Ort", 6, 0);

magic[7][GetSpellID(1)] = new SpellObject("Charm", "An Xen Ex", 7, 1);   // curse
magic[7][GetSpellID(2)] = new SpellObject("Fear", "Quas Wis", 7, 0);   // curse
magic[7][GetSpellID(3)] = new SpellObject("Fire and Ice", "Vas Frio Flam Ex Por", 7, 1);
magic[7][GetSpellID(4)] = new SpellObject("Invulnerability", "In Vas Sanct", 7, 0);   // bless
magic[7][GetSpellID(5)] = new SpellObject("Meteor Swarm", "Vas Flam Ylem", 7, 0);
magic[7][GetSpellID(6)] = new SpellObject("Permanence", "In Vas Ort Tym", 7, 0);

//magic[8][GetSpellID(1)] = new SpellObject("Armageddon", "Kal Vas An Mani Corp Xen", 8, 0);
magic[8][GetSpellID(1)] = new SpellObject("Arrow of Glass", "Corp Ylem", 8, 1);
magic[8][GetSpellID(2)] = new SpellObject("Conflagration", "In Vas Grav Flam Hur", 8, 1);
magic[8][GetSpellID(3)] = new SpellObject("Conjure Daemon", "Kal Vas Des Xen", 7, 1);
magic[8][GetSpellID(4)] = new SpellObject("Quickness", "Rel Tym", 8, 0);   // bless
magic[8][GetSpellID(5)] = new SpellObject("Reincarnate", "An Corp", 8, 0);  
magic[8][GetSpellID(6)] = new SpellObject("Time Stop", "An Tym", 8, 0);


// Cure
magic[1][GetSpellID(1)].executeSpell = function(caster, infused, free) {
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Casting Cure.<br /></span>"); }
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    if (debug) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
  }
  resp["fin"] = 1;
  var effects = caster.getSpellEffects();
  if (effects) {
    for (var i=0; i<effects.length; i++) {
      if (effects[i].getName() === "Poison") {
        effects[i].endEffect();
      }
      if ((infused) && (effects[i].getName() === "Disease")) {
        effects[i].endEffect();
      }
    }
  }
  return resp;
}

// Light
magic[1][GetSpellID(5)].executeSpell = function(caster, infused, free) {
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Casting Light.<br /></span>"); }
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    if (debug) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
  }
  resp["fin"] = 1;
  
  var liobj = localFactory.createTile("Light");
  
  var dur = caster.getInt() * .3;
  if (infused) {dur = dur * 3; }
  var endtime = dur + DU.DUTime.getGameClock();
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  liobj.setExpiresTime(endtime);
  if (infused) { liobj.setPower(4); }   // defaults to 2
  
  DUPlaySound("sfx_spell_light"); 
  caster.addSpellEffect(liobj);
//  liobj.applyEffect();
  
  DrawCharFrame();
  return resp;
}

// Levitate/Waterwalk
magic[4][GetSpellID(6)].executeSpell = function(caster, infused, free) {
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Casting Water Walk.<br /></span>"); }
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    if (debug) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
  }
  resp["fin"] = 1;

  var levobj = localFactory.createTile("Levitate");
  
  var dur = caster.getInt();
  if (infused) { dur = dur * 3; }
  var endtime = dur + DU.DUTime.getGameClock();
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  levobj.setPower(dur);
  levobj.setExpiresTime(endtime);
  
  caster.addSpellEffect(levobj);
//  levobj.applyEffect();
    
  DrawCharFrame();
  return resp;  
}

//Transport
magic[4][GetSpellID(5)].executeSpell = function(caster, infused, free) {
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Casting Transport.<br /></span>"); }
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    if (debug) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
  }
  resp["fin"] = 3;  // end of turn waits on end of animation

  var loc = caster.getHomeMap().getTile(caster.getx(), caster.gety());
  var shrine = loc.getTopFeature();
  if ((shrine) && (shrine.gotomap)) {
    var belowgraphic = shrine.getGraphicArray();
    if (shrine.getName() === "Shrine") {
      DU.maps.addMap(shrine.gotomap);
      var destmap = DU.maps.getMap(shrine.gotomap);
//      MoveBetweenMaps(caster,caster.getHomeMap(), destmap, shrine.gotox, shrine.gotoy);
//      DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
      TravelByMoongate(caster,"blue",belowgraphic,belowgraphic, destmap, shrine.gotox, shrine.gotoy);
    } else if (shrine.getName() === "BrokenShrine") {
      if (infused) {
        DU.maps.addMap(shrine.gotomap);
        var destmap = DU.maps.getMap(shrine.gotomap);
//        MoveBetweenMaps(caster,caster.getHomeMap(), destmap, shrine.gotox, shrine.gotoy);
//        DrawMainFrame("draw", PC.getHomeMap().getName() , PC.getx(), PC.gety());
        TravelByMoongate(caster,"blue",belowgraphic,belowgraphic, destmap, shrine.gotox, shrine.gotoy);
      } else {
        maintext.addText("The spell sputters and the broken node remains closed.");
        resp["fin"] = 1;
      }
    }
  } else {
    maintext.addText("The spell sputters, finding no transport node to open."); 
    resp["fin"] = 1;
  }
  
  DrawCharFrame();
  return resp;
}

//Return
magic[5][GetSpellID(3)].executeSpell = function(caster, infused, free) {
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    if (debug) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
  }
  resp["fin"] = 1;
  
  var returndest = {};
  
  var castermap = caster.getHomeMap();
  if (castermap.getName().indexOf("combat") > -1) {
    var fighton = castermap.getExitToMap();
    if ((fighton === "darkunknown") || (infused)) {
      returndest.map = "darkunknown";
      returndest.x = 29;
      returndest.y = 43;
    }
  } else {
    if ((castermap.getReturnInfused() && infused) || !castermap.getReturnInfused()) {
      returndest.map = castermap.getReturnMap();
      returndest.x = castermap.getReturnx();
      returndest.y = castermap.getReturny();
    }
  }
  //WORK HERE  
  if (returndest.map) {
    var destmap = DU.maps.getMap(returndest.map);
    var localacre = castermap.getTile(caster.getx(), caster.gety());
    var displaytile = localacre.getTop(1);
    while (displaytile.getName() === "SeeBelow") {
      var retval = FindBelow(x,y,mapname);
      localacre = retval.tile;
      mapname = retval.map;
      displaytile = localacre.getTop();
    }  
    var graphics = displaytile.getGraphicArray();
    var showGraphic = graphics[0];
    if (typeof displaytile.setBySurround === "function") {
     	graphics = displaytile.setBySurround(x,y,mapname,graphics,1,centerx,centery,losresult);
      showGraphic = graphics[0];
      if (typeof displaytile.doTile === "function") {
        graphics[0] = displaytile.doTile(x,y,showGraphic);
      }
//    displayCell.showGraphic = showGraphic;
//    displayCell.graphics2 = graphics[2];
//    displayCell.graphics3 = graphics[3];
//    displayCell.graphics1 = graphics[1];
//    displayCell.losresult = losresult;
//    displayCell.lighthere = lighthere;
//    displayCell.desc = displaytile.getDesc();
    
//    mapdiv += '<td class="maptd" id="td-tile'+x+'x'+y+'" style="background-image:url(\'graphics/' + showGraphic + '\'); background-repeat:no-repeat; background-position: ' + graphics[2] + 'px ' + graphics[3] + 'px;"><img id="tile'+x+'x'+y+'" src="graphics/'+graphics[1]+'" border="0" alt="tile'+x+'x'+y+' los:' + losresult + ' light:' + lighthere + '" width="32" height="32" style="position: relative; z-index:1;" title="' + displaytile.getDesc() + '" /></td>';
    }
    
    var destacre = destmap.getTile(returndest.x, returndest.y);
    var desttile = destacre.getTop();
    
    TravelByMoongate(caster,"blue",graphics,desttile.getGraphicArray(), destmap, returndest.x, returndest.y);
    resp["fin"] = 3;
  } else {
    maintext.addText("The spell sputters as the distances are too great.");
    resp["fin"] = 1;
  }
  
  return resp;
}

//Quickness
magic[8][GetSpellID(4)].executeSpell = function(caster, infused, free) {
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Casting Quickness.<br /></span>"); }
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    if (debug) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
  }
  resp["fin"] = 1;
  
  var liobj = localFactory.createTile("Quickness");
  
  var dur = caster.getInt() * SCALE_TIME;
  if (infused) {dur = dur * 1.5; }
  var endtime = dur + DU.DUTime.getGameClock();
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Spell duration " + dur + ". Spell ends at: " + endtime + ".<br /></span>"); }
  liobj.setExpiresTime(endtime);
  
//  if (DU.gameflags.sound) { play_audio("sfx_spell_light"); }   // ADD SOUND HERE
  caster.addSpellEffect(liobj);
//  liobj.applyEffect();
  
  DrawCharFrame();
  return resp;  
}

function TravelByMoongate(who, color, belowgraphic, destbelow, destmap, destx, desty) {
  var tol = 300;
  var graphicarray = [];
  graphicarray[0] = "moongates.gif";
  graphicarray[1] = "spacer.gif";
  graphicarray[2] = -128;
  graphicarray[3] = 0;
  if (color === "red") { graphicarray[3] = -32; }
  
  var oldgraphic = who.getGraphicArray();
  // play sound effect
  who.setGraphicArray(graphicarray);
  DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
  setTimeout(function() {
    graphicarray[2] += 32;
    who.setGraphicArray(graphicarray);
    DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
    setTimeout(function() {
      graphicarray[2] += 32;
      who.setGraphicArray(graphicarray);
      DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
      setTimeout(function() {
        graphicarray[2] += 32;
        who.setGraphicArray(graphicarray);
        DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
        setTimeout(function() {
          graphicarray[2] += 32; // at this point it should be 0
          who.setGraphicArray(graphicarray);
          DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
          setTimeout(function() {
            who.setGraphicArray(belowgraphic);
            DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
            setTimeout(function() {
              MoveBetweenMaps(who,who.getHomeMap(), destmap, destx, desty);
              who.setGraphicArray(destbelow);
              DrawMainFrame("draw", who.getHomeMap().getName(), who.getx(), who.gety());
              setTimeout(function() {
                who.setGraphicArray(graphicarray);
                DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                setTimeout(function() {
                  graphicarray[2] -= 32;
                  who.setGraphicArray(graphicarray);
                  DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                  setTimeout(function() {
                    graphicarray[2] -= 32;
                    who.setGraphicArray(graphicarray);
                    DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                    setTimeout(function() {
                      graphicarray[2] -= 32;
                      who.setGraphicArray(graphicarray);
                      DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                      setTimeout(function() {
                        graphicarray[2] -= 32;
                        who.setGraphicArray(graphicarray);
                        DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                        setTimeout(function() {
                          who.setGraphicArray(oldgraphic);
                          DrawMainFrame("one", who.getHomeMap().getName(), who.getx(), who.gety());
                          who.endTurn();  // currently only PC has endturn
                                          // if an NPC spell can use this function, add an endturn to NPCs
                        }, tol);
                      }, tol);
                    }, tol);
                  }, tol);
                }, tol);
              }, tol);
            }, tol);
          }, tol);
        }, tol);
      }, tol); 
    }, tol);
  }, tol);
  
}

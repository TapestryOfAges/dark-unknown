
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
magic[1][GetSpellID(6)] = new SpellObject("Vulnerability", "An Sanct", 1, 1);  // melee hit

magic[2][GetSpellID(1)] = new SpellObject("Illusion", "Quas Xen", 2, 1);
magic[2][GetSpellID(2)] = new SpellObject("Lesser Heal", "Bet Mani", 2, 0);   // heal
magic[2][GetSpellID(3)] = new SpellObject("Magic Bolt", "Grav Por", 2, 1);
magic[2][GetSpellID(4)] = new SpellObject("Poison Blade", "In Nox Bet Ylem", 2, 0);
magic[2][GetSpellID(5)] = new SpellObject("Protection", "In Sanct", 2, 0);   // blessing
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
        ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, 0);
        effects[i].endEffect();
      }
      if ((infused) && (effects[i].getName() === "Disease")) {
        effects[i].endEffect();
        ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, 0);
      }
    }
  }
  return resp;
}

// Disarm Trap
magic[1][GetSpellID(2)].executeSpell = function(caster, infused, free) {
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Casting Disarm Trap.<br /></span>"); }
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    if (debug) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
  }
  resp["fin"] = 1;
  var mult = 1;
  if (infused) { mult = 2; }
  for (var i = -1; i<=1; i++) {
    for (var j = -1; j<=1; j++) {
      var checkx = caster.getx() + i;
      var checky = caster.gety() + j;
      var castermap = caster.getHomeMap();
      var thetile = castermap.getTile(checkx,checky)
      if (thetile === "OoB") { continue; }
      var allfeatures = thetile.getFeatures();
      $.each(allfeatures, function(idx, val) {
        if (val.trapped) {
          var chance = ((who.getInt()*mult + 10) - (this.trapchallenge)) /20;
          if (chance < .05) { chance = .05; }
          var roll = Math.random();
          if (roll < chance) { 
            val.disarmTrap(); 
            maintext.addText("Trap disarmed!"); 
            ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, -96);
          }
          else { 
            maintext.addText("Trap resists."); 
            ShowEffect(val, 500, "X.gif");
          }
        }
      });
    }
  }
  return resp;
}

// Distract
magic[1][GetSpellID(3)].executeSpell = function(caster, infused, free) {
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Casting Distract.<br /></span>"); }
  var resp = {};
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    if (debug) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
  }
  resp["fin"] = 1;
  
  var radius = 3;
  if (caster.getInt() > 20) { radius = 4; }
  if (infused) { radius = radius * 1.5; } 
  var power = caster.getInt()/2;
  if (infused) { power = power*1.5; }
  var castermap = caster.getHomeMap();
  var npcs = castermap.npcs.getAll();
  $.each(npcs, function (idx, val) {
    if (GetDistance(caster.getx(), caster.gety(), val.getx(), val.gety()) < radius) {
      var chance = 1-((val.getResist("magic") + 1.5*val.getInt() - .5*caster.getInt())/100);
      if (Math.random()*1 < chance) {
        var distract = localFactory.createTile("Distract");
        ShowEffect(val, 1000, "spellsparkles-anim.gif", 0, -128);
        var desc = val.getDesc() + " is distracted!";
        if (val === PC) {
          desc = "You are distracted!";
        }
        var duration = power * SCALE_TIME;
        distract.setExpiresTime(duration + DUTime.getGameClock());
        val.addSpellEffect(distract);
      } else {
        var desc = val.getDesc() + " resists!";
        if (val === PC) {
          desc = "You resist.";
          // no X over the PC
        } else {
          ShowEffect(val, 700, "X.gif");
        }
      }
      desc = desc.charAt(0).toUpperCase() + desc.slice(1);
      maintext.addText(desc);

    }
  });

  return resp;
}

// Flame Blade
magic[1][GetSpellID(4)].executeSpell = function(caster, infused, free) {
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Casting Flame Blade.<br /></span>"); }
  var resp = {};
  if ((caster.getWeapon() === "Fists") || (caster.getWeapon() === "NaturalWeapon")) {
    if (caster === PC) {
      maintext.addText("You must have a weapon equipped.");
    }
    resp["fin"] = 0;
    return resp;  
  }
  if (!free) {
    var mana = this.getManaCost(infused);
    caster.modMana(-1*mana);
    if (debug) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
  }
  resp["fin"] = 1;
  var flameblade = localFactory.createTile("FlameBlade");
  duration = caster.getInt() * 2 * SCALE_TIME;
  flameblade.uses = 1;
  flameblade.damage = "2d4";
  flameblade.power = 2;
  
  if (infused) { 
    duration = duration * 2; 
    flameblade.uses = RollDice("1d4+1");
    flameblade.damage = "3d4+3";
    flameblade.power = 3;
  }
  var endtime = duration + DUTime.getGameClock();
  if (debug) { dbs.writeln("<span style='color:green'>Magic: End time is " + endtime + ".<br /></span>"); }
  flameblade.setExpiresTime(endtime);
  caster.addSpellEffect(flameblade);
  ShowEffect(caster, 1000, "spellsparkles-anim.gif", 0, -160);
  
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

// Vulnerability
magic[1][GetSpellID(6)].executeSpell = function(caster, infused, free, tgt) {
  if (caster !== PC) {
    var resp = PerformVulnerability(caster, infused, free, tgt);
    return resp;
  }
  if (debug) { dbs.writeln("<span style='color:green'>Magic: Casting Vulnerability.<br /></span>"); }
  var resp = {};
  
  targetCursor.x = PC.getx();
  targetCursor.y = PC.gety();
  targetCursor.command = "c";
  targetCursor.spellName = "Vulnerability";
  targetCursor.spelldetails = { caster: caster, infused: infused, free: free};
  targetCursor.targetlimit = (viewsizex -1)/2;
  targetCursor.targetCenterlimit = 0;

  var tileid = "#td-tile" + targetCursor.x + "x" + targetCursor.y;
  targetCursor.tileid = tileid;
  targetCursor.basetile = $(tileid).html();
  $(tileid).html(targetCursor.basetile + '<img id="targetcursor" src="graphics/target-cursor.gif" style="position:absolute;left:0px;top:0px;z-index:50" />');
  resp["txt"] = "";
  resp["input"] = "&gt; Choose target- ";
  resp["fin"] = 0;
  gamestate.setMode("target");
  return resp;
}
  
function PerformVulnerability(caster, infused, free, tgt) {
  if (!free) {
    var mana = magic[1][GetSpellID(6)].getManaCost(infused);
    caster.modMana(-1*mana);
    if (debug) { dbs.writeln("<span style='color:green'>Magic: Spent " + mana + " mana.<br /></span>"); }
  }
  var resp = {};
  resp["fin"] = 1;
  var desc = "";
    
  var chance = 1-(tgt.getResist("magic")/100);
  if (Math.random()*1 < chance) {
    var vulobj = localFactory.createTile("Vulnerability");
  
    var dur = caster.getInt()/2;
    if (infused) { dur = dur * 1.5;}
    ShowEffect(tgt, 1000, "spellsparkles-anim.gif", 0, -128);
    if (tgt !== PC) {
      desc = tgt.getDesc() + " is vulnerable!";
    }
    vulobj.setExpiresTime(dur + DUTime.getGameClock());
    var power = 4;
    if (infused) { power = 6; }
    vulobj.setPower(power);
    tgt.addSpellEffect(vulobj);
  }
  else {
    desc = tgt.getDesc() + " resists!";
    if (tgt === PC) {
      desc = "You resist.";
      // no X over the PC
    } else {
      ShowEffect(val, 700, "X.gif");
    }
  }
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
//  maintext.addText(desc);
  resp["txt"] = desc;
  resp["input"] = "&gt;";
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

//Negate Magic
magic[6][GetSpellID(6)].executeSpell = function(caster, infused, free) {
  
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


var spellcount = {};

function ShowEffect(onwhat, duration, graphic, xoff, yoff) {
  if (Object.keys(spellcount).length === 0) {
    if (debug) { dbs.writeln("<span style='color:green'>Clearing the spelleffects of empty divs.<br /></span>"); }
    $("#spelleffects").html("");
  }

  if (!xoff) { xoff = 0; }
  if (!yoff) { yoff = 0; }
  
  if (spellcount["anim" + onwhat.getSerial()]){ 
    if (debug) { dbs.writeln("<span style='color:green'>Tried to create a second effect on " + onwhat.getName() + ".<br /></span>"); }
    return; 
  }  //if there's already an effect playing, don't replace it with another one, just play the first only    
  var displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  var where = {};
  where.x = 0;
  where.y = 0;
  var animurl = "";
  spellcount["anim" + onwhat.getSerial()] = onwhat;
  if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onwhat.gety() <= displayspecs.bottomedge)) {
    where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
    where.x += 192;
    where.y += 192;
 //   animurl = "url('graphics/" + graphic + "')";
    animurl = "graphics/" + graphic ;
    if (debug) { dbs.writeln("<span style='color:green'>Putting a " + animurl + " on " + onwhat.getName() + ".<br /></span>"); }
  }
  var animhtml;
  if (animurl) {
    if ($("#anim" + onwhat.getSerial()).html() === "") {
      $("#anim" + onwhat.getSerial()).html('<img src="graphics/spacer.gif" width="32" height="32" />');
      $("#anim" + onwhat.getSerial()).css('left',where.x);
      $("#anim" + onwhat.getSerial()).css('top',where.y);
      $("#anim" + onwhat.getSerial()).css('background-image', 'url("graphics/' + graphic + '")');
      $("#anim" + onwhat.getSerial()).css('background-position', xoff + 'px ' + yoff + 'px');
    } else {
      animhtml = '<div id="anim' + onwhat.getSerial() + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; width:32px; height:32px; background-image:url(\'graphics/' + graphic + '\'); background-position: ' + xoff + 'px ' + yoff + 'px"><img src="graphics/spacer.gif" width="32" height="32" /></div>';
      $("#spelleffects").html($("#spelleffects").html() + animhtml);
    }
    
    setTimeout(function() {
      if (debug) { dbs.writeln("<span style='color:green'>Removing a " + animurl + " from " + onwhat.getName() + ".<br /></span>"); }
      $("#anim" + onwhat.getSerial()).html("");
      $("#anim" + onwhat.getSerial()).css("background-image", "");
      delete spellcount["anim" + onwhat.getSerial()];
    },duration);
  }
}


function ShowEffectOLD(onwhat, graphic, duration) {
  if (spellcount["anim" + onwhat.getSerial()]){ 
    if (debug) { dbs.writeln("<span style='color:green'>Tried to create a second effect on " + onwhat.getName() + ".<br /></span>"); }
    return; 
  }  //if there's already an effect playing, don't replace it with another one, just play the first only    
  var displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  var where = {};
  where.x = 0;
  where.y = 0;
  var animurl = "";
  spellcount["anim" + onwhat.getSerial()] = 1;
  if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onwhat.gety() <= displayspecs.bottomedge)) {
    where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
    where.x += 192;
    where.y += 192;
 //   animurl = "url('graphics/" + graphic + "')";
    animurl = "graphics/" + graphic ;
    if (debug) { dbs.writeln("<span style='color:green'>Putting a " + animurl + " on " + onwhat.getName() + ".<br /></span>"); }
  }
  var animhtml;
  if (animurl) {
    animhtml = '<div id="anim' + onwhat.getSerial() + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; width:32px; height:32px"><img src="' + animurl + '" /></div>';
    $("#spelleffects").html($("#spelleffects").html() + animhtml);
    
    setTimeout(function() {
      delete spellcount["anim" + onwhat.getSerial()];
      $("#anim" + onwhat.getSerial()).html("");
    },duration);
  }
}


function PlaySparkles(onwhat, color) {
  if (Object.keys(spellcount).length === 0) {
    if (debug) { dbs.writeln("<span style='color:green'>Clearing the spelleffects of empty sparkles.<br /></span>"); }
    $("#spelleffects").html("");
  }
    
  var colory = {};
  colory["yellow"] = 0;
  colory["green"] = -32;
  colory["blue"] = -64;
  colory["orange"] = -96;
  colory["purple"] = -128;
  colory["red"] = -160;
  
  var where;
  var animhtml;

  if (spellcount["anim" + onwhat.getSerial()]) { 
    if (debug) { dbs.writeln("<span style='color:green'>Tried to create a second sparkle on " + onwhat.getName() + ".<br /></span>"); }
    return; 
  }  //if there's already a sparkle playing, don't replace it with another one, just play the first only
  spellcount["anim" + onwhat.getSerial()] = 1;
  if (debug) { dbs.writeln("<span style='color:green'>Incrementing spell effects count to " + spellcount['anim' + onwhat.getSerial()] + ".<br /></span>"); }
  var displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onewhat.gety() <= displayspecs.bottomedge)) {
    where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
    where.x += 192;
    where.y += 192;
    animhtml = '<div id="anim' + onwhat.getSerial() + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; background-image:url(\'graphics/spellsparkles.gif\');background-repeat:no-repeat; background-position: 0px ' + colory[color] + 'px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';  
  } else {
    if (debug) { dbs.writeln("<span style='color:green'>Target is offscreen.<br /></span>"); }
    animhtml = '<div id="anim' + onwhat.getSerial() + '" style="position: absolute; left: ' + where.x + 'px; top: ' + where.y + 'px; background-repeat:no-repeat; background-position: 0px ' + colory[color] + 'px;"><img src="graphics/spacer.gif" width="32" height="32" /></div>';  
  }
  $("#spelleffects").html($("#spelleffects").html() + animhtml);
  if (debug) { dbs.writeln("<span style='color:green'>Placed " + color + " sparkles on " + onwhat.getName() + ".<br /></span>"); }
  AnimateSparkles(onwhat,colory[color],0);
  
}

function AnimateSparkles(onwhat, color, animframe) {
  var spellcountid = "#anim" + onwhat.getSerial();
  if (!spellcount[spellcountid]) {
    $(spellcountid).html("");
    $(spellcountid).css("background-image", "");
    if (debug) { dbs.writeln("<span style='color:green'>Spellcount zeroed out externally. Ceasing sparkling.<br /></span>"); }
    return;
  }
  if (spellcount[spellcountid] === 48) {
    if (debug) { dbs.writeln("<span style='color:green'>Sparkle on " + onwhat.getName() + " finished.<br /></span>"); }
    delete spellcount[spellcountid];
    $(spellcountid).html("");
    $(spellcountid).css("background-image", "");
  }
  var displayspecs = getDisplayCenter(PC.getHomeMap(),PC.getx(),PC.gety());
  var where;
  where.x = 0;
  where.y = 0;
  var animurl = "";
  if ((onwhat.getx() >= displayspecs.leftedge) && (onwhat.getx() <= displayspecs.rightedge) && (onwhat.gety() >= displayspecs.topedge) && (onewhat.gety() <= displayspecs.bottomedge)) {
    where = getCoords(onwhat.getHomeMap(),onwhat.getx(), onwhat.gety());
    where.x += 192;
    where.y += 192;
    animurl = "url('graphics/spellsparkles.gif')";
  }
  
  if ((spellcount[spellcountid]) % 3) {  // progressing the animation only every three calls 
                                         // so it can move with the target more quickly than it animates
    animframe++;
    if (animframe > 7) {
      animframe = 0;
    }
    if (debug) { dbs.writeln("<span style='color:green'>Sparkle on " + onwhat.getName() + " moving on to frame " + animframe + ".<br /></span>"); }
  }
  $(spellcountid).css("background-position", (animframe*-32) + "px " + color + "py");
  $(spellcountid).css("background-image", animurl);
  $(spellcountid).css("left", where.x);
  $(spellcountid).css("top", where.y);
  
  spellcount[spellcountid]++;
  setTimeout(AnimateSparkles(onwhat,color,animframe), 100);

}

function PerformSpellcast() {
  var themap = PC.getHomeMap();
  var targettile = themap.getTile(targetCursor.x, targetCursor.y);
  var resp = {};
  if (targetCursor.spellName === "Vulnerability") {
    var tgt = targettile.getTopVisibleNPC();
    if (!tgt || (tgt === PC)){
      // spell canceled
      resp["fin"] = 0;
      resp["txt"] = "Invalid target.";
      resp["input"] = "&gt;";
      delete targetCursor.spellName;
      var tileid = targetCursor.tileid;
      $(tileid).html(targetCursor.basetile); 

    } else {
      delete targetCursor.spellName;
      var tileid = targetCursor.tileid;
      $(tileid).html(targetCursor.basetile); 

      resp = PerformVulnerability(targetCursor.spelldetails.caster, targetCursor.spelldetails.infused, targetCursor.spelldetails.free, tgt);
      
    }
    
  }
  return resp;
}
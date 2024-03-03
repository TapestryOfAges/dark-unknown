"use strict";

// NPCs

function AnimateObject() {
	this.altgraphic = [];
	
	this.addType("Animate");
}
AnimateObject.prototype = new GameObject();



function NPCObject() {
	this.str = 10;
	this.dex = 10;
	this.int = 10
	this.modstr = 0;
	this.moddex = 0;
	this.modint = 0;
	this.orbstr = 0;
	this.orbdex = 0;
	this.orbint = 0;
	this.hp = 10;
	this.maxhp = 10;
	this.mana = 10;
	this.maxmana = 10;
	this.level = 1;
	this.npcname = "myname";
	this.desc = "an NPC";
	this.alignment = "good";	
	this.attitude = "friendly";
	this.peaceAI = "townsfolk";
	this.PCThreatAI = "combat";
	this.forgetAt = 0;
	this.graphic = "301.gif";
  this.gender = "neuter";
	this.meleeAttackAs = "Fists";
	this.meleeDamage = -1;
	this.meleeStrDamage = -1;
	this.missileAttackAs = "none";
	this.missileDamage = -1;
	this.missileRange = -1;
	this.armorAs = "none";
	this.armorDefense = -1;
	this.armorAbsorb = -1;
	this.armorResist = -1;
	this.meleeHitSound = "";
	this.meleeAttackSound = "";
	this.missileHitSound = "";
	this.missileAttackSound = "";
	this.initmult = 1;
	this.movetype = MOVE_WALK;
	this.meleeChance = 100;
  this.gold = 0;
	this.leavesCorpse = "";
	this.lootTable = "";
	this.lastTurnTime = 0;
	this.knowsInfusion = 0;
  this.conversation = "";
  this.schedule = "";
  this.currentScheduleIndex = 0;
	this.conversationflag = "";
	this.merch = "";
	this.spawnedBy;
	this.special = "";
	this.nextMana = 0;
	this.nextHP = 0;
	this.leash = 0;
	this.barkfreq = 0;
	this.bark = 0;
	this.barkrad = 0;
	this.aggro = 0;
	this.npcband = 0;
	this.wait;
  this.flags = {};
  this.initOverride = 0;
  this.skintone = 1;  
  this.hitbyspell = 0;  // did the PC hit me with spells? Used for Ring of Ethereal Focus.
	LightEmitting.call(this, 0);
	
	this.addType("npc");
}
NPCObject.prototype = new AnimateObject();

NPCObject.prototype.getDesc = function() {
  let knowsflag = "knows_" + this.conversation;
  if (DU.gameflags.getFlag(knowsflag)) {
    return this.npcname;
  } 
  return this.desc;
}

NPCObject.prototype.getNPCName = function() {
	return this.npcname;
}

NPCObject.prototype.setNPCName = function(newName) {
	this.npcname = newName;
	return this.npcname;
}

NPCObject.prototype.setMana = function(newMana) {
	if (newMana === -1) { this.mana = this.getInt(); }
	else {this.mana = newMana; }
}

NPCObject.prototype.getMana = function() {
  let mana = parseInt(this.mana);
	return mana;
}

NPCObject.prototype.modMana = function(diffMana) {
	this.mana = this.mana + diffMana;
	if (this.mana < 0) { this.mana = 0; }
	if (this.checkType("pc")) {
	  DrawCharFrame();
	}
	return this.mana;
}

NPCObject.prototype.setMaxMana = function(newMana) {
	if (newMana === -1) { this.maxmana = this.getInt(); }
	else {this.maxmana = newMana; }
}

NPCObject.prototype.getMaxMana = function() {
	return this.maxmana;
}

NPCObject.prototype.getKnowsInfusion = function() {
	return this.knowsInfusion;
}

NPCObject.prototype.setKnowsInfusion = function(knowledge) {
	this.knowsInfusion = knowledge;
	return this.knowsInfusion;
}

NPCObject.prototype.getAggro = function() {
  return this.aggro;
}

NPCObject.prototype.setAggro = function(aggro) {
  this.aggro = aggro;
  return this.aggro;
}

NPCObject.prototype.setGold = function(newgold) {
  newgold = parseInt(newgold);
	this.gold = newgold;
}

NPCObject.prototype.getGold = function() {
	return parseInt(this.gold);
}

NPCObject.prototype.addGold = function(diffgold) {
  diffgold = parseInt(diffgold);
  if (!isNaN(diffgold)) {
    this.gold += diffgold;
  }
  return this.gold;
}

NPCObject.prototype.getLeash = function() {
  return this.leash;
}

NPCObject.prototype.setLeash = function(radius) {
  this.leash = parseInt(radius);
  return this.leash;
}

NPCObject.prototype.getNPCBand = function() {
  return this.npcband;
}

NPCObject.prototype.setNPCBand = function(bandname) {
  this.npcband = bandname;
  return this.npcband;
}

NPCObject.prototype.getBark = function() {
  return this.bark;
}

NPCObject.prototype.setBark = function(bark) {
  this.bark = bark;
  return this.bark;
}

NPCObject.prototype.getBarkFreq = function() {
  return this.barkfreq;
}

NPCObject.prototype.setBarkFreq = function(freq) {
  // frequency is %
  this.barkfreq = parseInt(freq);
  return this.barkfreq;
}

NPCObject.prototype.getBarkRad = function() {
  return this.barkrad;
}

NPCObject.prototype.setBarkRad = function(radius) {
  this.barkrad = parseInt(radius);
  return this.barkrad;
}

NPCObject.prototype.getInitOverride = function() {
  return this.initOverride;
}

NPCObject.prototype.setInitOverride = function(newinit) {
  this.initOverride = parseInt(newinit);
  return this.initOverride;
}

NPCObject.prototype.getLastTurnTime = function() {
  return this.lastTurnTime;
}

NPCObject.prototype.setLastTurnTime = function(newtime) {
  if (!isNaN(newtime)) {
    this.lastTurnTime = newtime;
  }
  return this.lastTurnTime;
}

NPCObject.prototype.getSchedule = function() {
  return this.schedule; 
}

NPCObject.prototype.setSchedule = function (sched) {
  this.schedule = sched;
}

NPCObject.prototype.getCurrentScheduleIndex = function() {
  return this.currentScheduleIndex; 
}

NPCObject.prototype.setCurrentScheduleIndex = function(sched) {
  sched = parseInt(sched);
  this.currentScheduleIndex = sched;
  return this.currentScheduleIndex;
}

NPCObject.prototype.incrementCurrentScheduleIndex = function() {
  let schedule = DU.schedules[this.getSchedule()];
  let nextidx = this.currentScheduleIndex+1;
  if (nextidx >= schedule.scheduleArray.length) { nextidx = 0; }
  this.currentScheduleIndex = nextidx;
  return this.currentScheduleIndex;
}

NPCObject.prototype.getConversation = function() {
  return this.conversation; 
}

NPCObject.prototype.setConversation = function (convo) {
  this.conversation = convo;
}

NPCObject.prototype.getConversationFlag = function() {
  return this.conversationflag; 
}

NPCObject.prototype.setConversationFlag = function (cf) {
  this.conversationflag = cf;
}

NPCObject.prototype.setConversationFlagged = function () {
  this.conversation= this.conversation + "_a";  
  this.setConversationFlag("");
}

NPCObject.prototype.getMerch = function() {
  return this.merch; 
}

NPCObject.prototype.setMerch = function (merchname) {
  this.merch = merchname;
}

NPCObject.prototype.setHP = function(newhp) {
	this.hp = newhp;
}

NPCObject.prototype.getHP = function() {
	return this.hp;
}

NPCObject.prototype.getDisplayHP = function() {
  let displayhp = Math.ceil(this.hp);
  if (displayhp < 0) { displayhp = 0; }
  return displayhp;
}

NPCObject.prototype.setMaxHP = function(newhp) {
	this.maxhp = newhp;
}

NPCObject.prototype.getMaxHP = function() {
	return this.maxhp;
}

NPCObject.prototype.modHP = function(hpdiff) {
	this.hp += hpdiff;
	return this.hp;
}

NPCObject.prototype.healMe = function(amt, src) {
  this.modHP(amt);
  if (this.getHP() > this.getMaxHP()) {
    this.setHP(this.getMaxHP());
  }
  return this.getHP();
}

NPCObject.prototype.setHitBySpell = function(caster,lvl) {
  if ((caster === PC) && (this !== PC)) {
    if (!this.hitbyspell) { this.hitbyspell = 0; }
    this.hitbyspell += lvl;
  }
}

NPCObject.prototype.getHitBySpell = function() {
  return this.hitbyspell;
}

NPCObject.prototype.dealDamage = function(dmg, src, type) {
  let isasleep = this.getSpellEffectsByName("Sleep");
  if (isasleep) {
    isasleep.endEffect();
  }
  let isfrozen = this.getSpellEffectsByName("Frozen");
  if (isfrozen) {
    isfrozen.endEffect();
  }
  let isinvuln = this.getSpellEffectsByName("Invulnerable");
  if (isinvuln) {
    dmg = 0;
  }

  dmg = CheckAbsorb(dmg,this,src,type);
  if (this.specials.unkillable && (dmg > this.getHP())) {
    dmg = this.getHP()-1;
  }
  this.modHP(dmg*-1);
  if (this.getHP() <= 0) { // killed!
    let reincarnate = this.getSpellEffectsByName("Reincarnate");
    if (reincarnate) {
      reincarnate.endEffect();
      this.setHP(this.getMaxHP()/2);
      return 0;
    }
    this.processDeath(1);
    if (src === PC) {
      let XP = this.getXPVal();
      XP = XP * (1 + PC.getKarma()/100 - DU.gameflags.getFlag("coward")/200);
      PC.addxp(XP);

      let rof = PC.checkInventory("RingOfEtherealFocus");
      if (rof) {
        rof.killed(this);
      }
    }
    return -1;
  }
  else { return dmg; }
}

NPCObject.prototype.processDeath = function(droploot){
  if (this.onDeath) { OnDeathFuncs[this.onDeath](this); }
  let thisx = this.getx();
  let thisy = this.gety();
  if (targetCursor.lastTarget === this) { delete targetCursor.lastTarget; }
  if (this.checkType("PC")) {
    DebugWrite("all", "PC HAS DIED");
    // just in case you died on your turn:
    if (gamestate.getTurn() === PC) {
      gamestate.setMode("null");
    }
    let newmap = new GameMap();
    if (maps.getMap("landsbeyond")) {
      newmap = maps.getMap("landsbeyond");
      // though I'm confused about why this is already in memory!
    } else {
      newmap = maps.addMap("landsbeyond");
    }
    let spellobjs = this.getSpellEffects();
    if (spellobjs.length) {
      for (let i=0; i<spellobjs.length; i++ ) {
        if (spellobjs[i].getExpiresTime() !== -1) {
          spellobjs[i].endEffect();
        }
      }
    }
    let wascityfighting = this.getHomeMap().cityfight;
    if (!this.getHomeMap().getName().includes("blackdragon")) { wascityfighting = 0; }
    MoveBetweenMaps(this,this.getHomeMap(),newmap, 7, 7, 1);
    FadeOut(1);
    HideTurnFrame();
    
    if (wascityfighting && DU.gameflags.getFlag("endAct1") && !DU.gameflags.getFlag("act2")) {
      PC.dead = 1;
      PC.deaduntil = GetGameClockByClockTime(ModTime(GetUsableClockTime(),"1:00"));
      PC.bdc = 1;
      DU.gameflags.setFlag("intermission",1);
      maintext.setInputLine("&gt;");
      maintext.drawTextFrame(); 
      setTimeout(function() {
        maintext.addText("You cease to feel as consciousness flees from you.");
        setTimeout(function() {
          maintext.addText("<br style='textbreak' />When you come to, you are on the floor, and the battle has ended.");
          setTimeout(function() {
            if (maps.getMap("blackdragon_int")) {
              returnmap = maps.getMap("blackdragon_int");
              // though again, this shouldn't be in memory
            } else {
              returnmap = maps.addMap("blackdragon_int");
            }
            AdjustStartingLocations(returnmap);
            let taran = FindNPCByName("Taran",returnmap);
            returnmap.moveThing(36,15,taran);
            MoveBetweenMaps(PC,PC.getHomeMap(),returnmap,37,15);
            DrawMainFrame("draw",returnmap,37,15);
            FadeIn();
            setTimeout(function() {
              maintext.addText(`<br style='textbreak' />Taran kneels beside you. "${PC.getPCName()}, I'm glad you're ok. The dragon was struck down, and its body just... disappeared. But your brother hasn't woken up. Gather your strength, and get up when you feel ready."`);
              setTimeout(function() {
                maintext.addText("<br style='textbreak' />You close your eyes for a moment, and an unknown amount of time passes before you are again able to stand.");
                setTimeout(function() {
                  maintext.addText("<span class='sysconv'>You have gained: 100 XP.</span>");
                  maintext.setInputLine("&gt;");
                  PC.addxp(100);
                  DU.gameflags.setFlag("act2",DUTime.getGameClock());
                  BeginAct2();
                  DU.gameflags.deleteFlag("intermission");
                  PC.setHP(15);
                  delete PC.dead;
                }, 1700);
              }, 1700);
            },1700);
          },1700);
        }, 1700);
      },1500);        
      return;
    }
    PC.dead = 1;
    PC.deaduntil = GetGameClockByClockTime("9:00");

    maintext.delayedAddText("You have died!");
    maintext.setInputLine("&gt;");
    maintext.drawTextFrame(); 
    setTimeout(function() {
      maintext.addText("You find yourself floating bodiless in the void.");
      DrawMainFrame("draw", newmap, 7,7);
//      if (gamestate.getTurn() === PC) {
//        PC.endTurn();
//      }
      FadeIn();
      setTimeout(function() {
        DrawTopbarFrame("<p>" + newmap.getDesc() + "</p>");
        maintext.addText("<br style='textbreak' />There is nought to do but meditate upon your life, and the triumphs and errors it contained.");
        setTimeout(function() {
          maintext.addText("<br style='textbreak' />Suddenly a voice cries out in the darkness!");
          setTimeout(function() {
            maintext.addText('<br style="textbreak" />"The world is not finished with thee, ' + PC.getPCName() + '!"');
            setTimeout(function() {
              maintext.addText('<br style="textbreak" />"By the strength of this land I bid thee return!"');
              setTimeout(function() {
                maintext.addText("<br style='textbreak' />All is light...");
                setTimeout(function() {
                  delete PC.dead;
                  // play sound effect

                }, 1700);
              }, 1700);
            }, 1700);
          }, 1700);
        }, 1700);
      }, 1500);
    }, 2300);
    return;
  } else {
    let corpse = {};
    let chest;
    let map = this.getHomeMap();
    if (!this.summoned && (this.getLeavesCorpse()) && (this.getLeavesCorpse() !== "none")) {
      corpse = localFactory.createTile(this.getLeavesCorpse());
      corpse.setSearchDelete(1);
      if (this.skintone === 2) { corpse.spritexoffset += -32; }
      map.placeThing(thisx,thisy, corpse);
    } else {
      chest = localFactory.createTile("Chest");
    }
    if (!this.summoned && droploot && (this.lootTable !== "none")) {
      let loottables = this.lootTable.split(",");
      for (let i=0;i<loottables.length;i++) {
        let loot = {};
        if (DULoot[loottables[i]]) {
          loot = DULoot[loottables[i]].getLoot(); 
          if (loot.lootlist.length) {
            if (chest) {
              for (let i=0; i<loot.lootlist.length;i++){
                chest.addToContainer(loot.lootlist[i], 1);
              }
            } else {
              corpse.setSearchYield(loot.lootlist);
            }
          }
          if (loot.gold) {
            let totgold = loot.gold;
            if (this.stolengold) { totgold += this.stolengold; }

            if (chest) {
              chest.addToContainer("Gold", totgold);
            } else {
              corpse.addToSearchYield("Gold");
              corpse.setGold(corpse.getGold() + totgold);
            }
          }
        }
        else {alert (this.getName() + " has a loottable that is not defined."); }
      }
      if ((chest) && (chest.container.length)) {
        let trapname = GetStrongestTrap(loottables);
        if (trapname) {
          DebugWrite("gameobj", "Chest created, might be trapped with: " + trapname + ".<br />");
          let trap = DUTraps[trapname].getTrap();
          if (trap.trap) {
            chest.setTrap(trap.trap, trap.level);
          }
        }
        map.placeThing(thisx,thisy, chest);
      }  
    }
    if (this.attachedParts) {
      for (let i=0;i<this.attachedParts.length;i++) {
        let dx = this.attachedParts[i].getx();
        let dy = this.attachedParts[i].gety()        
        map.deleteThing(this.attachedParts[i]);
        DrawMainFrame("one",map,dx,dy);
      }
    }
    map.deleteThing(this);
    if (this.summonedby) {
      delete this.summonedby.summoned;
      delete this.summonedby;
    }
    if (this.summoned) {
      delete this.summoned.summonedby;
      delete this.summoned;
    }
    if ((typeof this.getLight === "function") && (Math.abs(this.getLight()) > 0)) {
      DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
    }
    DrawMainFrame("one",map,thisx,thisy);
    DUTime.removeEntityFrom(this);
    CheckPostDeathMusic(map);
    let spawner=this.getSpawnedBy();
    if (spawner && (spawner.getName() === "Spawner")) {  // summons also use SpawnedBy
      spawner.deleteSpawned(this);
    }
  }
}

NPCObject.prototype.setGender = function(newgender) {
  if (newgender === "") { newgender = "monster"; }
  if ((newgender === "male") || (newgender === "female") || (newgender === "other") || (newgender === "neuter") || (newgender === "monster")) { this.gender = newgender; }
  else { alert ("setGender send invalid data"); }
  return this.gender; 
}

NPCObject.prototype.getGender = function() {
  return this.gender;
}

NPCObject.prototype.getGenderedTerms = function() {
  let gt = {};
  if (this.gender === "random") {
    if (Dice.roll("1d2") === 2) { this.gender = "male"; }
    else { this.gender = "female"; }
  }
  
  if (this.gender === "male") {
    gt.pronoun = "he";
    gt.possessive = "his";
    gt.titled = "Lord";
    gt.objective = "him";
    gt.formal = "Prince";
    gt.sibling = "brother";
    gt.kiddie = "son";
    gt.reflexive = "himself";
  } else if (this.gender === "female") {
    gt.pronoun = "she";
    gt.possessive = "hers";
    gt.titled = "Lady";
    gt.objective = "her";
    gt.formal = "Princess";
    gt.sibling = "sister";
    gt.kiddie = "daughter";
    gt.reflexive = "herself";
  } else if (this.gender === "other") {
    gt.pronoun = "they";
    gt.possessive = "theirs";
    gt.objective = "them";
    gt.titled = "Lord";
    gt.formal = "Heir";
    gt.sibling = "sibling";
    gt.kiddie = "child";    
    gt.reflexive = "themself";
  } else {
    gt.pronoun = "it";
    gt.possessive = "its";
    gt.objective = "it";
    gt.titled = "Lord";
    gt.formal = "Heir";
    gt.sibling = "sibling";
    gt.kiddie = "child";    
    gt.reflexive = "itself";
  }
  return gt;
}

NPCObject.prototype.getMeleeHitSound = function() {
  if (this.meleeHitSound) {
    return this.meleeHitSound;
  } else {
    if (this.getEquipment("weapon")) {
      if (this.getEquipment("weapon").getHitSound()) {
        return (this.getEquipment("weapon").getHitSound());
      }
    }
  }
  return "sfx_default_hit";
}

NPCObject.prototype.setMeleeHitSound = function(newsnd) {
  this.meleeHitSound = newsnd;
  return this.meleeHitSound;
}

NPCObject.prototype.getMissileHitSound = function() {
  if (this.missileHitSound){
    return this.missileHitSound;
  } else {
    if (this.getEquipment("missile")) {
      if (this.getEquipment("missile").getHitSound()) {
        return (this.getEquipment("missile").getHitSound());
      }
    }
  }
  return "sfx_default_hit";
}

NPCObject.prototype.setMissileHitSound = function(newsnd) {
  this.missleHitSound = newsnd;
  return this.missleHitSound;
}

NPCObject.prototype.getMeleeAttackSound = function() {
  if (this.meleeAttackSound) {
    return this.meleeAttackSound;
  } else {
    if (this.getEquipment("weapon")) {
      return (this.getEquipment("weapon").getAttackSound());
    }
  }
}

NPCObject.prototype.setMeleeAttackSound = function(newsnd) {
  this.meleeAttackSound = newsnd;
  return this.meleeAttackSound;
}

NPCObject.prototype.getMissileAttackSound = function() {
  if (this.missileAttackSound) { 
    return this.missileAttackSound;
  } else {
    if (this.getEquipment("missile")) {
      return (this.getEquipment("missile").getAttackSound());
    }
  }
}

NPCObject.prototype.setMissileAttackSound = function(newsnd) {
  this.missleAttackSound = newsnd;
  return this.missleAttackSound;
}

NPCObject.prototype.getOnHit = function() {
  // OnHit is what happens when the NPC hits something
  return this.onHit;
}

NPCObject.prototype.setOnHit = function(newoh) {
  this.onHit = newoh;
  return this.onHit;
}

NPCObject.prototype.setStr = function(newstr) {
	newstr = parseInt(newstr);
	if ((newstr !== 0) && (!isNaN(newstr))) { this.str = newstr; }
}

NPCObject.prototype.setBaseStr = function(newstr) {
  this.setStr(newstr);
}

NPCObject.prototype.getStr = function() {
  let str = this.getBaseStr() + this.getModStr() + this.getOrbStr();
  str = Math.max(str,3);
	return str;
}

NPCObject.prototype.getModStr = function() {
  return this.modstr;
}

NPCObject.prototype.getOrbStr = function() {
  return this.orbstr;
}

NPCObject.prototype.setModStr = function(newstr) {
  newstr = parseInt(newstr);
  if (!isNaN(newstr)) { this.modstr = newstr; }
  return this.getStr();
}

NPCObject.prototype.setOrbStr = function(newstr) {
  newstr = parseInt(newstr);
  if (!isNaN(newstr)) { this.orbstr = newstr; }
  return this.getStr();
}

NPCObject.prototype.getBaseStr = function() {
  return this.str;
}

NPCObject.prototype.setDex = function(newdex) {
	newdex = parseInt(newdex);
	if ((newdex !== 0) && (!isNaN(newdex))) { this.dex = newdex; }
}

NPCObject.prototype.setBaseDex = function(newdex) {
  this.setDex(newdex);
}

NPCObject.prototype.setOrbDex = function(newdex) {
	newdex = parseInt(newdex);
	if (!isNaN(newdex)) { this.orbdex = newdex; }
}

NPCObject.prototype.getDex = function() {
  let dex = this.getBaseDex() + this.getModDex() + this.getOrbDex();
  dex = Math.max(dex,3);
	return dex;
}

NPCObject.prototype.getBaseDex = function() {
  return this.dex;
}

NPCObject.prototype.getModDex = function() {
  return this.moddex;
}

NPCObject.prototype.getOrbDex = function() {
  return this.orbdex;
}

NPCObject.prototype.setModDex = function(newdex) {
  newdex = parseInt(newdex);
  if (!isNaN(newdex)) { this.moddex = newdex; }
  return this.getDex();
}

NPCObject.prototype.setInt = function(newint) {
	newint = parseInt(newint);
	if ((newint !== 0) && (!isNaN(newint))) { this.int = newint; }
}

NPCObject.prototype.setBaseInt = function(newint) {
  this.setInt(newint);
}

NPCObject.prototype.setModInt = function(newint) {
  newint = parseInt(newint);
  if (!isNaN(newint)) { this.modint = newint; }
  return this.getInt();
}

NPCObject.prototype.setOrbInt = function(newint) {
  newint = parseInt(newint);
  if (!isNaN(newint)) { this.orbint = newint; }
  return this.getInt();
}

NPCObject.prototype.getInt = function() {
  let theint = this.getBaseInt() + this.getModInt() + this.getOrbInt();
  theint = Math.max(theint, 3);
	return theint;
}

NPCObject.prototype.getIntForPower = function() {
  let theint = this.getInt();
  if (theint < 10) { return theint; }
  return ((theint - 10)*1.5 + 10);
}

NPCObject.prototype.getBaseInt = function() {
  return this.int;
}

NPCObject.prototype.getModInt = function() {
  return this.modint;
}

NPCObject.prototype.getOrbInt = function() {
  return this.orbint;
}

NPCObject.prototype.setStats = function(newstr, newdex, newint) {
	this.setStr(newstr);
	this.setDex(newdex);
	this.setInt(newint);
}

NPCObject.prototype.setLevel = function(newlevel) {
	newlevel = parseInt(newlevel);
	if (newlevel !== 0) { this.level = newlevel; }
}

NPCObject.prototype.getLevel = function() {
	return this.level;
}

NPCObject.prototype.getXPVal = function() {
  if (this.hasOwnProperty("xpval")) { return this.xpval; }
	return this.level * XP_MULTIPLIER;
}

NPCObject.prototype.getAlignment = function() {
	return this.alignment;
}

NPCObject.prototype.setAlignment = function(newAlign) {
	this.alignment = newAlign;
	return this.alignment;
}

NPCObject.prototype.getAttitude = function() {
	return this.attitude;
}

NPCObject.prototype.setAttitude = function(newAttitude) {
	this.attitude = newAttitude;
	return this.attitude;
}

NPCObject.prototype.getPeaceAI = function() {
	return this.peaceAI;
}

NPCObject.prototype.setPeaceAI = function(newAI) {
	this.peaceAI = newAI;
	return this.peaceAI;
}

NPCObject.prototype.getPCThreatAI = function() {
	return this.PCThreatAI;
}

NPCObject.prototype.setPCThreatAI = function(newAI) {
	this.PCThreatAI = newAI;
	return this.PCThreatAI;
}

NPCObject.prototype.getForgetAt = function() {
	return this.forgetAt;
}

NPCObject.prototype.setForgetAt = function(newAt) {
	this.forgetAt = newAt;
	return this.forgetAt;
}

NPCObject.prototype.getCurrentAI = function() {
	return this.currentAI;
}

NPCObject.prototype.setCurrentAI = function(newAI) {
	this.currentAI = newAI;
	return this.currentAI;
}

NPCObject.prototype.getMeleeAttackAs = function() {
	return this.meleeAttackAs;
}

NPCObject.prototype.setMeleeAttackAs = function(melee) {
	this.meleeAttackAs = melee;
	return this.meleeAttackAs;
}

NPCObject.prototype.getMissileAttackAs = function() {
	return this.missileAttackAs;
}

NPCObject.prototype.setMissileAttackAs = function(missile) {
	this.missileAttackAs = missile;
	return this.missileAttackAs;
}

NPCObject.prototype.getArmorAs = function() {
	return this.armorAs;
}

NPCObject.prototype.setArmorAs = function(armor) {
	this.armorAs = armor;
	return this.armorAs;
}

NPCObject.prototype.nextActionTime = function(initdelay) {

  if (this.getSpellEffectsByName("TimeStop")) { return 0; }
  let themap = this.getHomeMap();
  let scale = themap.getScale();
  if (this.smallscalemove) { 
    scale = 1;
    delete this.smallscalemove;
  }

  let effectiveDex = 10;
  if (scale) {
    effectiveDex = this.getDex();
  }
  if (this.getInitOverride() && (this.getAttitude() === "friendly")) { effectiveDex = this.getInitOverride(); }

  let init = ((-1/60) * effectiveDex + (7/6)) * this.initmult;
  
  if ((initdelay) && (initdelay != 0)) {
  	init = init * initdelay;
  }
  if (scale != "0") { init = init * SCALE_TIME; }
	return init;
}

NPCObject.prototype.getLeavesCorpse = function() {
  return this.leavesCorpse;
}

NPCObject.prototype.setLeavesCorpse = function(newCorpse) {
  this.leavesCorpse = newCorpse;
  return (this.leavesCorpse);
}

NPCObject.prototype.getMovetype = function() {
	return this.movetype;
}

NPCObject.prototype.setMovetype = function(move) {
	this.movetype = move;
}

NPCObject.prototype.addMovetype = function(move) {
	this.movetype = this.movetype | move;
}

NPCObject.prototype.removeMovetype = function(move) {
	this.movetype = this.movetype & ~move;
}

NPCObject.prototype.getMeleeChance = function() {
  return this.meleeChance;
}

NPCObject.prototype.setMeleeChance = function(mc) {
  this.meleeChance = mc;
  return this.meleeChance;
}

NPCObject.prototype.getSpellEffects = function() {
  return this.spellEffects.getAll();
}

NPCObject.prototype.getSpellEffectsByName = function(checkname) {
  return this.spellEffects.getByName(checkname);
}

NPCObject.prototype.addSpellEffect = function(spellobj, silent) {
  let otherEffects = this.getSpellEffects();
  let addme = 1;
  if (!silent) { silent = 0; }
  if (otherEffects.length) {
    for (let i=0; i < otherEffects.length; i++) {
      if (otherEffects[i].getName() === spellobj.getName()) {
        silent = 1;
        let totin = spellobj.getInstances() + otherEffects[i].getInstances();
        DebugWrite("magic", "That spell is already on the target.<br />");
        if (otherEffects[i].getPower() > spellobj.getPower()) {  // keep old one, extend it
          let adddur = (1/(totin - 1))*(spellobj.getPower() / otherEffects[i].getPower()) * (spellobj.getExpiresTime() - DU.DUTime.getGameClock());
          DebugWrite("magic", "Old one is stronger, extending by " + adddur + ".<br />");
          if (otherEffects[i].getExpiresTime() > -1) {  // don't change expire time if it's permanent
            otherEffects[i].setExpiresTime(otherEffects[i].getExpiresTime() + adddur);
          }
          otherEffects[i].setInstances(otherEffects[i].getInstances() + spellobj.getInstances());
          otherEffects[i].mergeSpells("old");
          addme = 0; 
          return 0;
        } else {
          if (otherEffects[i].getExpiresTime() > -1) {
            let adddur = (1/(totin - 1))*(otherEffects[i].getPower() / spellobj.getPower()) * (otherEffects[i].getExpiresTime() - DU.DUTime.getGameClock());
            spellobj.setExpiresTime(spellobj.getExpiresTime() + adddur);
            DebugWrite("magic", "New one is stronger. Replacing old and extending new by " + adddur + ".<br />");
          } else {
            // you can still strengthen permanent spells
            spellobj.setExpiresTime(-1);
          }
          otherEffects[i].endEffect(1);
          spellobj.setInstances(otherEffects[i].getInstances() + spellobj.getInstances());
          spellobj.mergeSpells("new");
        }
        break;
      }
    }
  }
  this.spellEffects.addBottom(spellobj);
  spellobj.setAttachedTo(this);
  spellobj.setCreateTime(DUTime.getGameClock());
  let makeactive = spellobj.applyEffect(silent);
  if (makeactive) {
    spellobj.setActive(1);
  }
  
  return 1;
}

NPCObject.prototype.deleteSpellEffect = function(spellobj) {
  this.spellEffects.deleteFrom(spellobj);
}

NPCObject.prototype.getSpawnedBy = function() {
  return this.spawnedBy;
}

NPCObject.prototype.setSpawnedBy = function(spawner) {
  this.spawnedBy = spawner;
  return this.spawnedBy;
}

NPCObject.prototype.getTarget = function() {
  return this.target;
}

NPCObject.prototype.setTarget = function(newtarg) {
  this.target = newtarg;
  return this.target;
}

NPCObject.prototype.activate = function(timeoverride) {
  if (gamestate.getMode() !== "loadgame") {  
    if (this.getPeaceAI() === "RunAway") { 
      this.specials.coward = 1;
      this.setPeaceAI("combat");
    }
    this.equipment = {};
    this.equipment.armor = "";
    this.equipment.weapon = "";
    this.equipment.missile = "";
    this.equipment.ring1 = "";
    this.equipment.ring2 = "";
    this.equipment.circlet = "";
    this.equipment.amulet = "";
    this.equipment.cloak = "";

	  this.inventory = new Collection();
	
  	this.spellbook = [];
	  this.spellEffects = new Collection();

    if (!this.resists) {
    	this.resists = {};   // fire, ice
    }

	  this.lastLocation = {};
    this.lastLocation.map = "";
	  this.lastLocation.x = 0;
	  this.lastLocation.y = 0;
		
	  //brain
	  this.currentPoI = {};
    this.currentDestination = {};
    this.turnsToRecalcPoI = 0;
    this.turnsToRecalcDest = 0;
    this.currentPath = [];
    this.destType;

    this.maxhp = this.level * 10 + Dice.roll("1d10-6");
    if (this.addhp) { 
      this.maxhp += this.addhp; 
      if (this.maxhp < 0) { this.maxhp = 1; }
    }
    this.hp = this.maxhp;
    

    DebugWrite("ai", "<span style='font-weight:bold'>NPC " + this.getName() + "(" + this.getSerial() + ") (" + this.getNPCName() + ") activating at " + this.getx() + "," + this.gety() + ".</span><br />");
  
    if (this.overrideGraphic && !this.checkType("human")) {
      if (this.realgraphic) {
        this.realgraphic = this.overrideGraphic; 
        alert("Why is this happening?");
        console.log("Why is this happening? Actual use of realgraphic in activation:");
        console.log(this);
      } else {
        this.graphic = this.overrideGraphic;
      }
    } else if (this.altgraphic.length) {
      this.altgraphic.push(this.graphic);
      this.graphic = PickOne(this.altgraphic);
      this.altgraphic = []; // no longer need to store this
    }
    if (this.checkType("human")) {
      if (!this.hasOwnProperty("wornlayers")) {
        this.wornlayers = {
          body: this.defwornlayers.body,
          head: this.defwornlayers.head,
          back: this.defwornlayers.back,
          offhand: this.defwornlayers.offhand,
          cloak: this.defwornlayers.cloak,
          mainhand: this.defwornlayers.mainhand
        };
        this.wornlayernudges = {
          body: { x: this.defwornlayernudges.body.x, y: this.defwornlayernudges.body.y },
          head: { x: this.defwornlayernudges.head.x, y: this.defwornlayernudges.head.y},
          back: { x: this.defwornlayernudges.back.x, y: this.defwornlayernudges.back.y },
          offhand: { x: this.defwornlayernudges.offhand.x, y: this.defwornlayernudges.offhand.y },
          cloak: { x: this.defwornlayernudges.cloak.x, y: this.defwornlayernudges.cloak.y },
          mainhand: { x: this.defwornlayernudges.mainhand.x, y: this.defwornlayernudges.mainhand.y }
        };
      } else if (!this.hasOwnProperty("wornlayernudges")) {
        this.wornlayernudges = {
          body: { x: 0, y: 0 },
          head: { x: 0, y: 0},
          back: { x: 0, y: 0 },
          offhand: { x: 0, y: 0 },
          cloak: { x: 0, y: 0 },
          mainhand: { x: 0, y: 0 }
        };
      }
      if (this.wornlayers.head === "random") {
        if (this.wornlayers.body.includes("Bard")) {
          if (Dice.roll("1d2") === 1) {
            this.wornlayers.body = "Bard1";
          } else { this.wornlayers.body = "Bard2"; }
          let coin = Dice.roll("1d3");
          if (coin === 1) {
            this.wornlayers.head = "BardDark";
          } else if (coin === 2) {
            this.wornlayers.head = "BardPale1";
          } else {
            this.wornlayers.head = "BardPale2";
          }
        } else {
          let heads = ["OldManPale","ShortBlackPale","ShortBlackPale","BaldBeardedDark","BaldBeardedDark","ShortBrownPale","ShortBrownPale","RedHeadPale","BlondePale","BlondePale","ShortBlackDark","ShortBlackDark","BrownDark","BrownDark"];
          let idx = Dice.roll("1d"+heads.length+"-1");
          this.wornlayers.head = heads[idx];
          if (this.wornlayers.head.includes("Dark")) {
            if (this.wornlayers.hasOwnProperty("mainhand") && this.wornlayers.mainhand) {
              if (this.wornlayers.mainhand.includes("Pale")) { this.wornlayers.mainhand = this.wornlayers.mainhand.replace("Pale","Dark"); }
            }
            if (this.wornlayers.hasOwnProperty("offhand") && this.wornlayers.offhand) {
              if (this.wornlayers.offhand.includes("Pale")) { this.wornlayers.offhand = this.wornlayers.offhand.replace("Pale","Dark"); }
            }
          }
        }
      }
      this.animlength = HumanParts[this.wornlayers.body].frames;
    }
  
    this.setMana(-1);
    this.setMaxMana(-1);
  
    if (this.getHomeMap().getName().indexOf("combat") !== -1) {
      DebugWrite("ai","Setting AI to combat because of being on a combat map.<br />");
      this.setCurrentAI("combat");
    } else {
      DebugWrite("ai","Setting AI to " + this.getPeaceAI() + ". <br />");
      this.setCurrentAI(this.getPeaceAI());
    }
  
    let weapon;
    let missileweapon;
    let armor;
    
    if ((this.getMeleeAttackAs()) && (this.getMeleeAttackAs() !== "none")) {
      weapon = localFactory.createTile(this.getMeleeAttackAs());
      this.setEquipment("weapon",weapon);
    }
    else {
      weapon = localFactory.createTile("NaturalWeapon");
      
      if (this.meleeDamage !== -1) {
        weapon.setDamage(this.meleeDamage);
      }
      if (this.meleeStrDamage !== -1) {
        weapon.setStrDamage(this.meleeStrDamage);
      }
      this.setEquipment("weapon",weapon);
    } 
    if ((this.getMissileAttackAs()) && (this.getMissileAttackAs() !== "none")) {
      missileweapon = localFactory.createTile(this.getMissileAttackAs());
      this.setEquipment("missile",missileweapon);
    } 
    else if (this.getMissileAttackAs() !== "none") {
      missileweapon = localFactory.createTile("NaturalMissileWeapon");
      if (this.missileDamage !== -1) {
        missileweapon.setDamage(this.missileDamage);
      }
      if (this.missileRange !== -1) {
        missileweapon.setRange(this.missileRange);
      }

      this.setEquipment("missile",missileweapon);
    } 
    if ((this.getArmorAs()) && (this.getArmorAs() !== "none")) {
      armor = localFactory.createTile(this.getArmorAs());
      this.setEquipment("armor",armor);
    }
    else {
      armor = localFactory.createTile("NaturalArmor");
      if (this.armorDefense !== -1) {
        armor.setDefense(this.armorDefense);
      }
      if (this.armorResist !== -1) {
        armor.setResist(this.armorResist);
      }
      if (this.armorAbsorb !== -1) {
        armor.setAbsorb(this.armorAbsorb);
      }

      this.setEquipment("armor",armor);
    } 
    
    this.specials = {};
    let tmpspc = {};
    if (this.special) {
      let tmp = this.special.replace(/ /g,"");
      tmp = tmp.split(",");
      for (let i=0; i<tmp.length;i++){
        if (tmp[i].indexOf(":") > -1) {
          let bluh = tmp[i].split(":");
          tmpspc[bluh[0]] = bluh[1];
          if (typeof NPCSpecialFuncs[bluh[0]] === "function") {
            let ret = NPCSpecialFuncs[bluh[0]](this, bluh[1]);
            if (ret) { tmpspc[bluh[0]] = ret; }
          }
        } else {
          tmpspc[tmp[i]] = 1;
          if (typeof NPCSpecialFuncs[tmp[i]] === "function") {
            let ret = NPCSpecialFuncs[tmp[i]](this);
            if (ret) { tmpspc[tmp[i]] = ret; }
          }
        }
      }
      this.specials = tmpspc;
    }
                  
    if (this.checkType("human")) {
      this.makeLayers(1);
    }

    let timing = this.nextActionTime(0);
    timing = timing/2;
    if (timeoverride) {
      timing = timeoverride;
    }
    timing = timing + (Math.random() / 500);

    DebugWrite("ai", "Curr time: " + DUTime.getGameClock().toFixed(5) + ", NPC will go in " + timing + ".<br />");

    if (typeof this.attachParts === "function") { this.attachParts(); }
    this.startx = this.getx();
    this.starty = this.gety();
    
    this.nextMana = DUTime.getGameClock() + MANA_REGEN;
    this.nextHP = DUTime.getGameClock() + HP_REGEN;
    
    let NPCEvent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCEvent,timing);  
    
    if (this.getSchedule()) {
      this.setCurrentScheduleIndex(DU.schedules[this.getSchedule()].currentIndex);
      DebugWrite("ai", "Set schedule index to: " + this.getCurrentScheduleIndex() + ".<br />");
    }
  }
}


NPCObject.prototype.moveMe = function(diffx,diffy,noexit) {
  let retval = { fin:1 };
  if (this.getSpellEffectsByName("Entangle")) {
    if (this === PC) {
      retval["msg"] = ": You are entangled by tentacles!";
    }
    retval["canmove"] = 0;
    retval["diffx"] = diffx;
    retval["diffy"] = diffy;
    return retval;
  }
	let map = this.getHomeMap();
	let oldmapname = map.getDesc();
	let startx = this.getx();
	let starty = this.gety();
	let passx = startx + parseInt(diffx);
	let passy = starty + parseInt(diffy);
  
  let leftx = startx;
  let rightx = startx;
  let topy = starty;
  let bottomy = starty;

	let tile = map.getTile(passx,passy);
  let alltiles = [tile];
  let allpassx = [passx];
  let allpassy = [passy];
  let allparts = [this];
  let anyoob = 0;
  if (tile === "OoB") { anyoob = 1; }
  if (this.attachedLocations) {
    for (let i=0;i<this.attachedLocations.length;i++) {
      let herex = startx + this.attachedLocations[i][0];
      let herey = starty + this.attachedLocations[i][1];
      if (herex > rightx) { rightx = herex; }
      if (herex < leftx) { leftx = herex; }
      if (herey > bottomy) { bottomy = herey; }
      if (herey < topy) { topy = herey; }

      let tx = passx+this.attachedLocations[i][0];
      let ty = passy+this.attachedLocations[i][1];
      let ttile = map.getTile(tx, ty);
      alltiles.push(ttile);
      allpassx.push(tx);
      allpassy.push(ty);
      allparts.push(this.attachedParts[i]);
      if (ttile === "OoB") { anyoob = 1; }
    }
  }
  
  // alltiles is a list of all the tiles it is trying to move onto, whether already occupied by
  // the creature (if multi-tile) or not. It's just one tile if this is a normal 1 tile entity.
  // allpassx and allpassy are the coordinates of all said tiles.
  // anyoob is 1 if any of the destination tiles are OoB

  // leftx, rightx, topy, bottomy are the current edges of the entity's space
  // to be used to see if a tile has part moving off but a different part moving on- in which case,
  // skip bump, walkoff, and walkon


	if (anyoob) { 
	  if (noexit) {
	    // NPC won't step out of the map
	    DebugWrite("map", this.getDesc() + " won't move out of the map.<br />");
	    retval["canmove"] = 0;
	    retval["diffx"] = diffx;
	    retval["diffy"] = diffy;
	    return retval;
	  }
		if (map.getExitToMap()) {
		  DebugWrite("map", this.getDesc() + " exiting the map: ");
			let newmap = new GameMap();
			if (maps.getMap(map.getExitToMap())) {
			  DebugWrite("map", "destination map already exists.<br />");
				newmap = maps.getMap(map.getExitToMap());
			} else {
			  DebugWrite("map", "destination map needs to be loaded.<br />");
				newmap = maps.addMap(map.getExitToMap());
			}
			tile = MoveBetweenMaps(this,map,newmap,map.getExitToX(),map.getExitToY());
			if (tile) {
  			DebugWrite("map", "Exited from MoveBetweenMaps. New map is " + this.getHomeMap().getName() + ".<br />");
        retval["canmove"] = 0;
		  	if (this === PC) {
			  	DrawMainFrame("draw", newmap, PC.getx(), PC.gety());
				  DrawTopbarFrame("<p>" + newmap.getDesc() + "</p>");
  				retval["msg"] = ".<br />Exiting " + oldmapname + ".";
  			}
			} else {
			  DebugWrite("map", "Failed to exit due to exittest.");
  	    retval["canmove"] = 0;
  	    retval["diffx"] = diffx;
	      retval["diffy"] = diffy;
	      retval["msg"] = ": Failed!";
	      return retval;
			}
		}
	}	else {
    if (map.getWrap() !== "None") {
      let wrap = map.getWrap();
      if ((passx < 0) && ((wrap === "Horizontal") || (wrap === "Both"))) { passx = map.getWidth()+passx; }
      else if ((passx >= map.getWidth()) && ((wrap === "Horizontal") || (wrap === "Both"))) { passx = passx-map.getWidth(); }
      if ((passy < 0) && ((wrap === "Vertical") || (wrap === "Both"))) { passy = map.getHeight()+passy; }
      else if ((passy >= map.getHeight()) && ((wrap === "Vertical") || (wrap === "Both"))) { passy = passy-map.getHeight(); }

      for (let i=0;i<allpassx.length;i++) {
        if ((allpassx[i] < 0) && ((wrap === "Horizontal") || (wrap === "Both"))) { allpassx[i] = map.getWidth()+allpassx[i]; }
        else if ((allpassx[i] >= map.getWidth()) && ((wrap === "Horizontal") || (wrap === "Both"))) { allpassx[i] = allpassx[i]-map.getWidth(); }
        if ((allpassy[i] < 0) && ((wrap === "Vertical") || (wrap === "Both"))) { allpassy[i] = map.getHeight()+allpassy[i]; }
        else if ((allpassy[i] >= map.getHeight()) && ((wrap === "Vertical") || (wrap === "Both"))) { allpassy[i] = allpassy[i]-map.getHeight(); }  
      }
    }
    if (this.attachedLocations) {
      for (let i=0;i<allpassx.length;i++) {
        if ((allpassx[i] < leftx) || (allpassx[i] > rightx) || (allpassy[i] < topy) || (allpassy[i] > bottomy)) {
          // check if the space is a NEW space, rather than something another tile of this
          // entity is already standing on
          retval = alltiles[i].getBumpIntoResult(this);
          if (retval["canmove"] === 0) { return retval; }
        }
      }
    } else {
  		retval = tile.getBumpIntoResult(this);
	  	if (retval["canmove"] === 0) { return retval; }
    }

    let moveval;
    if (this.attachedLocations) {
      retval["canmove"] = 1;
      for (let i=0;i<allpassx.length;i++) {
        if ((allpassx[i] < leftx) || (allpassx[i] > rightx) || (allpassy[i] < topy) || (allpassy[i] > bottomy)) {
          moveval = alltiles[i].canMoveHere(allparts[i].getMovetype());
          if (!moveval["canmove"]) { retval["canmove"] = 0; }
        }
      }
    } else {
      DebugWrite("ai", this.getName() + " trying to move, checking canMoveHere for " + passx + "," + passy +".</span><br />");
	  	moveval = tile.canMoveHere(this.getMovetype());
		  retval["canmove"] = moveval["canmove"];
    }
	
		if (retval["msg"] === "") {
			if (moveval["msg"] === "") { retval["msg"] = "."; }
			else { retval["msg"] = " - " + moveval["msg"]; }
		}
		else {
			if (moveval["msg"] !== "") {
				retval["msg"] += "<br />" + moveval["msg"];
			}
		}
	}
	
	if (retval["canmove"] === 1) {
    let exittiles = [];
    let entertiles = [];
    for (let i=0;i<alltiles.length;i++) {
      if ((allpassx[i] < leftx) || (allpassx[i] > rightx) || (allpassy[i] < topy) || (allpassy[i] > bottomy)) {
        entertiles.push(alltiles[i]);
      }
    }
    if (!alltiles.includes(map.getTile(this.getx(),this.gety()))) { exittiles.push(map.getTile(this.getx(),this.gety())); }
    if (this.attachedParts) {
      for (let i=0;i<this.attachedParts.length;i++) {
        let parttile = map.getTile(this.getx()+this.attachedLocations[i][0],this.gety() + this.attachedLocations[i][1]);
        if (!alltiles.includes(parttile)) { exittiles.push(parttile); }
      }
    }

//    let exittile = map.getTile(this.getx(),this.gety());
    let walkoffsuccess = 1;
    for (let i=0;i<exittiles.length;i++) {
      if (exittiles[i].walkofftest) {
        let walkofftest = exittiles[i].walkofftest(this);
        if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
        retval["msg"] += walkofftest["txt"];
        if (!walkofftest.success) { walkoffsuccess = 0; }
      }
    }

    if (walkoffsuccess) {
      for (let i=0;i<exittiles.length;i++) {
        let walkofftile = exittiles[i].executeWalkoffs(this);
	      if (walkofftile.msg) {
	        if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
	        retval["msg"] += walkoffval.msg;
  	    }
      }
//      map.moveThing(this.getx()+diffx,this.gety()+diffy,this);
      for (let i=0;i<allparts.length;i++) {
        map.moveThing(allparts[i].getx()+diffx,allparts[i].gety()+diffy,allparts[i]);
      }
      retval["fin"] = 1;
		  if (this === PC) {
		    let sfx = "sfx_walk_";
  		  if (map.getUnderground()) { sfx = sfx + "ug_"; }
	  	  if (tile.getTopFeature() && tile.getTopFeature().getWalkSound()) {
		      sfx = sfx + tile.getTopFeature().getWalkSound();
		    } else if (tile.getTerrain().getWalkSound()) {
		      sfx = sfx + tile.getTerrain().getWalkSound();
  		  } else {
	  	    sfx = sfx + "grass";
		    }
		    play_footstep(sfx);
		  
//        ProcessAmbientNoise(tile); 
//        moved to atlas moveThing, so it runs after teleports
		  }

      let distfrom = getDisplayCenter(map, PC.getx(), PC.gety());
      let overridedraw = 0;
      let override;

      for (let i=0;i<entertiles.length;i++) {
        let walkonval = entertiles[i].executeWalkons(this);
        if (walkonval.overridedraw) { overridedraw = 1; }
		    if (walkonval.msg) {
  		    if (retval["msg"] !== "") { retval["msg"] += "<br />"; }
          retval["msg"] += walkonval.msg;
        }
        if (walkonval.override) { override = walkonval.override; }
      }
      if (override) {
        retval.fin = override;
        if (override === -3) {
          retval["msg"] = "";
        }
      }
//    if ((map === PC.getHomeMap()) && (GetSquareDistance(this.getx(), this.gety(), distfrom.centerx, distfrom.centery) < 1+Math.max(VIEWSIZEX,VIEWSIZEY) )) {
      // basically, was this move on screen? The +1 is to catch things that might have just walked off-screen
      // uncommented version checks from current display center, not from PC position.
      if (!overridedraw) {
        if ((typeof this.getLight === "function") && (this.getLight() !== 0)) {
          if (map === PC.getHomeMap()) {
            DebugWrite("ai", "A light source, need to redraw the whole screen...<br />");
            DrawMainFrame("draw", map, PC.getx(), PC.gety());
          }
  			} else {
          // only redraw these two spaces
          DebugWrite("ai", "Redraw both tiles.<br />");
			    DrawMainFrame("one", map, startx, starty);
			    DrawMainFrame("one", map, passx, passy);
        }
      }
//    }
	  }
	  retval["initdelay"] = tile.getInitDelay(this);
	  retval["diffx"] = diffx;
    retval["diffy"] = diffy;
  }

  if (this.hasFrame) {
    if ((this.getHomeMap() === PC.getHomeMap()) && (IsVisibleOnScreen(this.getx(),this.gety()))) {
      MoveTurnFrame(this);
    } else {
      HideTurnFrame();
      delete this.hasFrame;
    }
  }
	return retval;
}

NPCObject.prototype.myTurn = function() {
  maintext.flushDelayedText();

  if (PC.dead) { 
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,this.nextActionTime(1));  // if this still isn't fast enough, make the next action time be not until the PC wakes up anyway

    return 1; 
  }  // New, 2024-02-04: if PC is dead, everyone skips turns until the clock swings around.

  let pchome = PC.getHomeMap().getName();
  if ((this.getHomeMap().getName() === "underworld") && (pchome !== "underworld") && (pchome !== "hidden_cave") && (pchome !== "eldercave") && (pchome !== "kaltonmine3") && (pchome !== "worldsending3")) {
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,this.nextActionTime(10));  // underworld is on small time, but stays in memory, so creatures would go 5 times to 1 on the 
                                                              // surface. So now if you're not in or near the underworld they don't go and they wait 10 ticks between attempts.

    return 1; 
  }
  raceWarning = 0;
  if (this.fled) { return 1; }
  DebugWrite("new", "<div style='border-style:inset; border-color:#999999'><span style='" + debugstyle.header + "'>" + this.getName() + " (" + this.getNPCName() + "), serial " + this.getSerial() + " is starting its turn at " + this.getx() + "," + this.gety() + ", timestamp " + DUTime.getGameClock().toFixed(5) + ".</span><br />");
  if (!maps.getMap(this.getHomeMap().getName())) {
    // removing from timeline, its map is gone

    DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " removed from game- map gone.</span><br />");
  
    return 1;
  }

  if (this.expiresTime && (this.expiresTime <= DUTime.getGameClock())) {
    DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " expired, removing itself.</span><br />");
    this.getHomeMap().deleteThing(this);
    
    return 1;
  }

	gamestate.setMode("NPC");
	gamestate.setTurn(this);

  if (this.specials.noact) { 
    let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,this.nextActionTime(1));
    return 1; 
  } // noact NPCs skip their turns. Effects do not run!

  this.hasFrame = 0;
  if (PC.showFrames && IsObjectVisibleOnScreen(this)) {
    // add turn frame
    ShowTurnFrame(this);
  } else {
    HideTurnFrame();
  }

	RunEffects(this);
	
	Regen(this);
  let awake = 1;
  if (this.getSpellEffectsByName("Sleep") || this.getSpellEffectsByName("Paralyze") || this.getSpellEffectsByName("Frozen") || this.getSpellEffectsByName("CrystalTrap") || this.getSpellEffectsByName("Stunned")) { awake = 0; }
  let confused = this.getSpellEffectsByName("Confused");
  if (confused && (Math.random() < (confused.getPower()/100))) {
    // confused and Confused
    awake = 0;
    if (Math.random() < .5) { 
	    // confused and randomly wandering
	    let dir = Dice.roll("1d4");
	    if (dir === 1) { this.moveMe(0,-1,0); }
	    if (dir === 2) { this.moveMe(1,0,0); }
	    if (dir === 3) { this.moveMe(0,1,0); }
	    if (dir === 4) { this.moveMe(-1,0,0); }
	  }

  }

  let response = {};  
  // will be = return value of AI call
  
  // actual AI!
  if (awake) {	
    let ainame=this.getCurrentAI().split("-");
    if (this.getAggro() && ((this.getAttitude() === "friendly") || (this.getAttitude() === "hostile") || (this.getAttitude() === "neutral"))) {
      ainame[0] = "combat";
    }

    if (ais[ainame[0]]) {
      if (ainame.length === 1) { ainame[1] = ""; }
	    response = ais[ainame[0]](this, ainame[1]);
	  }
	  if (typeof response.initdelay === 'undefined') {
	    response["initdelay"] = 1;
	  }
	}
  if (response.wait) {
    // something the NPC did has started an animation that will handing restarting the scheduler.
    return 0;
  }	
  // check for NPC idling
  let oldloc = this.getLastLocation();
  if ((oldloc.map === this.getHomeMap().getName()) && (oldloc.x === this.getx()) && (oldloc.y === this.gety())) {  // npc did not move
    let tile = this.getHomeMap().getTile(this.getx(),this.gety());
    let idleval = tile.executeIdles(this);
  } else {
    let newloc = {};
    newloc.map = this.getHomeMap().getName();
    newloc.x = this.getx();
    newloc.y = this.gety();
    this.setLastLocation(newloc);
  }
  
	this.setLastTurnTime(DUTime.getGameClock());

  if (!maps.getMap(this.getHomeMap().getName())) {
    // map removed during its turn (probably because it killed the player)
    // therefore it deserves valhalla

    DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " removed from game- map gone. Not re-adding to timeline.</span><br />");

    if (this.hasFrame) {
      // remove turn frame
      HideTurnFrame(this);
    }
  
    return 1;
  }
	
	gamestate.setMode("null");
  if (!response.removed && (this.getHP() > 0)) {
	  let NPCevent = new GameEvent(this);
    DUTime.addAtTimeInterval(NPCevent,this.nextActionTime(response["initdelay"]));
  }
  
  delete this.pushed;
  
  if (this.hasFrame) {
    // remove turn frame
    HideTurnFrame(this);
  }

  DebugWrite("ai", "Ending its turn at (" + this.getx() + "," + this.gety() + ").");
  return 1;
}

NPCObject.prototype.endTurn = function(init) {
  if (!init) { init = 0; }
  if (this.hasFrame && IsObjectVisibleOnScreen(this)) {
    // remove turn frame
    HideTurnFrame(this);
  }

  if (gamestate.getTurn() !== this) {
    console.log(this);
    console.log(gamestate.getTurn());
    alert("Somehow trying to end a turn when it isn't their turn, aborting.");
  } else if ((this.getHP() <= 0) && (this !== PC)) {
    DebugWrite("ai", "Ending turn while dead, not going back on the stack!");
    setTimeout(function() { startScheduler(); }, 5 );
  } else {
    gamestate.setMode("null");
  
    DebugWrite("ai", "Ending its turn at (" + this.getx() + "," + this.gety() + ").");
  
    // did this entity idle?
    let oldloc = this.getLastLocation();
    let idleval;
    if ((oldloc.map === this.getHomeMap().getName()) && (oldloc.x === this.getx()) && (oldloc.y === this.gety())) {  // did not move
      let tile = this.getHomeMap().getTile(this.getx(),this.gety());
      idleval = tile.executeIdles(this);
    } else {
      let newloc = {};
      newloc.map = this.getHomeMap().getName();
      newloc.x = this.getx();
      newloc.y = this.gety();
      this.setLastLocation(newloc);
    }
  
    if (idleval && (this === PC)) { maintext.addText(idleval.msg); }
    this.setLastTurnTime(DUTime.getGameClock());
  
    if (!maps.getMap(this.getHomeMap().getName())) {
      // map removed during its turn (probably because it killed the player)
      // therefore it deserves valhalla

      DebugWrite("gameobj", "<span style='font-weight:bold'>Creature " + this.getName() + " : " + this.getSerial() + " removed from game- map gone. Not re-adding to timeline.</span><br />");
  
    } else if ((this.getHP() > 0) || (this === PC)) {
      let myevent = new GameEvent(this);
      DUTime.addAtTimeInterval(myevent,this.nextActionTime(init));
    }

    setTimeout(function() { startScheduler(); }, 5 );
  }
}

NPCObject.prototype.addToInventory = function(item, thinAir, qty) {
  // Whether the object being added to inventory is an item
  // must be checked before this point. This will add _anything_ to
  // an inventory!
  
  //If thinAir is set, the item is being generated directly into the inventory,
  //and so does not need to be removed from the map.
  if (!thinAir) {
    // otherwise, this will remove the item from the NPC/PC's map first.
    this.getHomeMap().deleteThing(item);
    item.setHomeMap("");
  }
  if (!qty) { 
    if (item.getQuantity()) {
      qty = item.getQuantity();
    } else {
      qty = 1; 
    }
  }
  let alreadyIn = this.checkInventory(item.getName());
  if (alreadyIn) {
    alreadyIn.setQuantity(alreadyIn.getQuantity()+qty);
  }
  else {
    this.inventory.addTop(item);
    item.setQuantity(qty);
  }
  item.setx(0);
  item.sety(0);  
}

NPCObject.prototype.removeFromInventory = function(item, map, x, y) {
  if (item.getQuantity() > 1) {
    item.setQuantity(item.getQuantity()-1);
  } else {
    // If this is equipped, unequip it first
    if (item === this.getWeapon()) {
      this.setEquipment("Weapon","");
    }
    if (item === this.getMissile()) {
      this.setEquipment("Missile","");
    }
    if (item === this.getArmor()) {
      this.setEquipment("Armor","");
    }    
    if (item === this.getEquipment("ring1")) {
      this.setEquipment("ring1","");
    }
    if (item === this.getEquipment("ring2")) {
      this.setEquipment("ring2","");
    }
    if (item === this.getEquipment("circlet")) {
      this.setEquipment("circlet","");
    }
    if (item === this.getEquipment("amulet")) {
      this.setEquipment("amulet","");
    }
    if (item === this.getEquipment("cloak")) {
      this.setEquipment("cloak","");
    }
    this.inventory.deleteFrom(item);
  }
  if (map) { // if map,x,y are filled in, will place the item back on
             // the map
    map.placeThing(x,y,item);
  }
}

NPCObject.prototype.getInventory = function() {
  let inv = this.inventory.getAll();
  return inv;
}

NPCObject.prototype.checkInventory = function(itemname) {
  return this.inventory.getByName(itemname);
}

NPCObject.prototype.getEquipment = function(which) {
  which = which.toLowerCase();
  if (which === "armor") {
    return (this.getArmor()); 
  }
  else if (which === "weapon") {
    return (this.getWeapon());
  }
  else if (which === "missile") {
    return (this.getMissile());
  }
  else if (which === "ring1") {
    if (this.equipment.ring1) {
      return this.equipment.ring1;
    } else { return ""; }
  }
  else if (which === "ring2") {
    if (this.equipment.ring2) {
      return this.equipment.ring2;
    } else { return ""; }
  }
  else if (which === "circlet") {
    if (this.equipment.circlet) {
      return this.equipment.circlet;
    } else { return ""; }
  }
  else if (which === "amulet") {
    if (this.equipment.amulet) {
      return this.equipment.amulet;
    } else { return ""; }
  }
  else if (which === "cloak") {
    if (this.equipment.cloak) {
      return this.equipment.cloak;
    } else { return ""; }
  }
  
  else { return ""; }
}

NPCObject.prototype.setEquipment = function(which,what) {
  which = which.toLowerCase();
  if ((which === "armor") || (which === "weapon") || (which === "missile") || (which === "amulet") || (which === "circlet") || (which === "ring1") || (which === "ring2") || (which === "cloak")) {
    if (what) {
      let type = which;
      if ((type === "ring1") || (type === "ring2")) { type = "ring"; }
      if (what.checkType(type)) {
        this.equipment[which] = what;
        return 1;
      }
      return 0;
    } else {
      this.equipment[which] = "";
      return 1;
    }
  }  
  else { return 0; }
}

NPCObject.prototype.isEquipped = function(checkItem) {
  if (typeof checkItem.getEquippedTo === "function") {
    if (checkItem.getEquippedTo() === this) {
      return 1; 
    }
  }

  return 0;
}

NPCObject.prototype.getArmor = function() {
  if (this.equipment.armor) { return this.equipment.armor; }
  else { return ""; } 
}

NPCObject.prototype.getWeapon = function() {
  if (this.equipment.weapon) { return this.equipment.weapon; }
  else { return ""; } 
}

NPCObject.prototype.getMissile = function() {
  if (this.equipment.missile) { return this.equipment.missile; }
  else { return ""; } 
}

NPCObject.prototype.getHitChance = function(atkwith) {
  if (!atkwith) { atkwith = "melee"; }
  let tohit = BASE_HIT_CHANCE;
  tohit += this.getLevel() * HIT_PER_LEVEL ;
  if (atkwith === "melee") {
    tohit += this.getStr() - 10;
    let weapon = this.getEquipment("weapon");
    if (weapon) {
      tohit += weapon.getToHitBonus();
    }
  } else {
    tohit += this.getDex() - 10;
    let weapon = this.getEquipment("missile");
    if (weapon) {
      tohit += weapon.getToHitBonus();
    }
  }
  let armor = this.getEquipment("armor");
  if (armor) {
    tohit += armor.getToHitBonus();
  }
  
  let distracted = this.getSpellEffectsByName("Distract");
  if (!distracted) { distracted = this.getSpellEffectsByName("Dizzy"); }
  if (distracted) {
    let stillon = distracted.doEffect();
    if (stillon != -1) {
      DebugWrite("combat", "DISTRACTED: old tohit: " + tohit + ", ");
      tohit = tohit - distracted.getPower();
      DebugWrite("combat", "new tohit: " + tohit + ".<br />");
    }
  }
  return tohit;
}

NPCObject.prototype.getDefense = function() {
  let def = this.getLevel() * DEF_PER_LEVEL;
  def = def + (this.getDex()-10)*DEF_PER_DEX;
  let armor = this.getEquipment("armor");
  if (armor) {
    if (this.getStr() < armor.getStrReq()) {
      def += (armor.getDefense())/3;
    } else {
      def += armor.getDefense();
    }
  }
  let vuln = this.getSpellEffectsByName("Vulnerability");
  if (vuln) {
    DebugWrite("ai", "VULNERABLE: Old AC " + def + ", ");
    def = def - vuln.getPower();
    DebugWrite("ai", "new AC: " + def + ".<br />");
  }
  let prot = this.getSpellEffectsByName("Protection");
  if (prot) {
    DebugWrite("combat", "PROTECTED: old AC " + def + ", ");
    def = def + prot.getPower();
    DebugWrite("combat", "new AC: " + def + ".<br />");
  } 
  return def;
}

NPCObject.prototype.getAbsorb = function() {
  let armor = this.getEquipment("armor");
  if (armor) {
    return armor.getAbsorb();
  }
}

NPCObject.prototype.getResist = function(resisttype) {
  if (resisttype === "physical") {
    let armor = this.getEquipment("armor");
    if (armor) {
      return (armor.getAbsorb());
    }
  }
  if (resisttype === "magic") {
    let armor = this.getEquipment("armor");
    if (armor) {
      return (armor.getResist());
    }
  }    
  
  if (this.resists[resisttype]) {
    return this.resists[resisttype];
  } 
  return 0;
}

NPCObject.prototype.getLastLocation = function() {
  return this.lastLocation;
}

NPCObject.prototype.setLastLocation = function (newloc) {
  this.lastLocation.map = newloc.map;
  this.lastLocation.x = newloc.x;
  this.lastLocation.y = newloc.y;
}

NPCObject.prototype.getDestination = function() {
  let dest = {};
  dest.x = this.currentDestination.x;
  dest.y = this.currentDestination.y;
  return dest;
}

NPCObject.prototype.setDestination = function(dest, timeuntil) {
  this.currentDestination = dest;
  this.turnsToRecalcDest = timeuntil;
}

NPCObject.prototype.getDestinationType = function() {
  return this.destType;
}

NPCObject.prototype.setDestinationType = function(dtype) {
  this.destType = dtype;
}

NPCObject.prototype.getTurnsToRecalcDest = function() {
  return this.turnsToRecalcDest; 
}

NPCObject.prototype.setTurnsToRecalcDest = function(timeuntil) {
  this.turnsToRecalcDest = parseInt(timeuntil);
  return this.turnsToRecalcDest;
}

NPCObject.prototype.getPoI = function() {
  if (typeof this.currentPoI !== "object") { this.currentPoI = {}; }
  return this.currentPoI;
}

NPCObject.prototype.setPoI = function(poi) {
  this.currentPoI = poi;
}

NPCObject.prototype.setCurrentPath = function(newpath) {
  this.currentPath = newpath;
}

NPCObject.prototype.getCurrentPath = function() {
  return this.currentPath;
}

NPCObject.prototype.getNextStep = function() {
  if (this.currentPath.length > 0) {
    let nextstep = this.currentPath.shift();
    return nextstep;
  }
  return [];
}

NPCObject.prototype.setWaiting = function(newwait) {
  this.waiting = newwait;
  if (newwait) {
    DU.gameflags.setFlag("mute",1);
  } else {
    DU.gameflags.deleteFlag("mute");
  }
}

NPCObject.prototype.getWaiting = function() {
  return this.waiting;
}

function NPCGroupObject() {
  this.group = [];
  this.attackword = "attack";
  this.attitude = "hostile";
}
NPCGroupObject.prototype = new NPCObject();

function NPCList(npcs,num) {
  this.npc = npcs;
  this.count = num;
}

NPCGroupObject.prototype.populate = function() {
  let population = [];
  for (let i=0; i<this.group.length; i++) {
    let num = Dice.roll(this.group[i].count);
    for (let j=1; j<=num; j++) {
      if (population.length < 8) {
        let monster = localFactory.createTile(this.group[i].npc);
        population[population.length] = monster;
      }
    }
  }
  
  return population;
}

// NPCs have moved into npcObjects.js

// This is a virtual object, created to extend NPCObjects. PCObject is now an extension of this.
// This adds "worn" item layers for rendering, so a humanoid can have a different icon if they wear a helm, 
// wear armor, wield various weapons, etc.
function NPCHumanObject() {
  this.defwornlayers = {
    body: null,
    head: null,
    back: null,
    offhand: null,
    cloak: null,
    mainhand: null
  };
  this.defwornlayernudges = {
    body: { x: 0, y: 0 },
    head: { x: 0, y: 0 },
    back: { x: 0, y: 0 },
    offhand: { x: 0, y: 0 },
    cloak: { x: 0, y: 0 },
    mainhand: { x: 0, y: 0 }
  };
  this.addType("human");
}
NPCHumanObject.prototype = new NPCObject();

NPCHumanObject.prototype.makeLayers = function(frame) {
  if (!frame) { frame = 1; }
  let layer = [];
  if (this.hasOwnProperty("inBed")) {
    let headindex;
    if (this.wornlayers.realhead) {
      headindex = this.wornlayers.realhead;
    } else { headindex = this.wornlayers.head; }
    if (!HumanPartsBed[headindex]) { headindex = "ShortBlackPale"; }
    let newlayer = [HumanPartsBed[headindex].src, "", HumanPartsBed[headindex][this.inBed].x, HumanPartsBed[headindex][this.inBed].y];
    layer.push(newlayer);
    this.layers = layer;
    return;
  }
  if (this.sitting === "chair") {
//    console.log("sitting down");
    let hand = "HandsDark";
    if (this.wornlayers.realhead.includes("Pale")) { hand = "HandsPale"; }
    layer.push([HumanPartsSit[this.wornlayers.body].src, "", HumanPartsSit[this.wornlayers.body][this.facing] - 32*(frame-1), HumanPartsSit[this.wornlayers.body].spritey]);
    layer.unshift([HumanPartsSit[this.wornlayers.body].src, "", HumanPartsSit[this.wornlayers.body][this.facing] - shadowoffsets[HumanPartsSit[this.wornlayers.body].src]*32 - 32*(frame-1), HumanPartsSit[this.wornlayers.body].spritey]);
    if (this.wornlayers.head) {
      let usehead = this.wornlayers.realhead;
      if (HumanPartsSit[this.wornlayers.head]) { usehead = this.wornlayers.head; }
      let newlayer = [HumanPartsSit[usehead].src, "", HumanPartsSit[usehead][this.facing] - 32*(frame-1), HumanPartsSit[usehead].spritey];
      layer.push(newlayer);
      let shadowlayer = [HumanPartsSit[usehead].src, "", HumanPartsSit[usehead][this.facing] - shadowoffsets[HumanPartsSit[usehead].src]*32 - 32*(frame-1), HumanPartsSit[usehead].spritey];
      layer.unshift(shadowlayer);  
    }
    if ((this.wornlayers.mainhand) || (this.wornlayers.head.includes("Bard"))) {
      let newlayer = [HumanPartsSit[hand].src, "", HumanPartsSit[hand][this.facing] - 32*(frame-1), HumanPartsSit[hand].spritey];
      layer.push(newlayer);
      let shadowlayer = [HumanPartsSit[hand].src, "", HumanPartsSit[hand][this.facing] - shadowoffsets[HumanPartsSit[hand].src]*32 - 32*(frame-1), HumanPartsSit[hand].spritey];
      layer.unshift(shadowlayer);  
    } 
    this.layers = layer;
    this.animlength = HumanPartsSit[this.wornlayers.body].frames;  
    return;
  }
  if (this.sitting === "throne") {
    let hand = "HandsDark";
    if (this.wornlayers.realhead.includes("Pale")) { hand = "HandsPale"; }
    layer.push([HumanPartsThrone[this.wornlayers.body].src, "", HumanPartsThrone[this.wornlayers.body].spritex - 32*(frame-1), HumanPartsThrone[this.wornlayers.body].spritey]);
    layer.unshift([HumanPartsThrone[this.wornlayers.body].src, "", HumanPartsThrone[this.wornlayers.body].spritex - shadowoffsets[HumanPartsThrone[this.wornlayers.body].src]*32 - 32*(frame-1), HumanPartsThrone[this.wornlayers.body].spritey]);
    if (this.wornlayers.head) {
      let usehead = this.wornlayers.realhead;
      if (HumanPartsThrone[this.wornlayers.head]) { usehead = this.wornlayers.head; }
      let newlayer = [HumanPartsThrone[usehead].src, "", HumanPartsThrone[usehead].spritex - 32*(frame-1), HumanPartsThrone[usehead].spritey];
      layer.push(newlayer);
      let shadowlayer = [HumanPartsThrone[usehead].src, "", HumanPartsSit[usehead].spritex - shadowoffsets[HumanPartsThrone[usehead].src]*32 - 32*(frame-1), HumanPartsThrone[usehead].spritey];
      layer.unshift(shadowlayer);  
    }
    if ((this.wornlayers.mainhand) || (this.wornlayers.head.includes("Bard"))) {
      let newlayer = [HumanPartsThrone[hand].src, "", HumanPartsThrone[hand].spritex - 32*(frame-1), HumanPartsThrone[hand].spritey];
      layer.push(newlayer);
      let shadowlayer = [HumanPartsThrone[hand].src, "", HumanPartsThrone[hand].spritex - shadowoffsets[HumanPartsThrone[hand].src]*32 - 32*(frame-1), HumanPartsThrone[hand].spritey];
      layer.unshift(shadowlayer);  
    }
    this.layers = layer;
    this.animlength = HumanPartsThrone[this.wornlayers.body].frames;  
    return;
  }
  if (this.hasOwnProperty("noDraw")) {
    this.layers = [["spacer.gif", "", 0,0]];
    return;
  }

  if (this.wornlayers.back) { 
    let newlayer = [HumanParts[this.wornlayers.back].src, "", HumanParts[this.wornlayers.back].spritex + this.wornlayernudges.back.x - 32*(frame-1), HumanParts[this.wornlayers.back].spritey + this.wornlayernudges.back.y];
    layer.push(newlayer);
    let shadowlayer = [HumanParts[this.wornlayers.back].src, "", HumanParts[this.wornlayers.back].spritex - shadowoffsets[HumanParts[this.wornlayers.back].src]*32 + this.wornlayernudges.back.x - 32*(frame-1), HumanParts[this.wornlayers.back].spritey + this.wornlayernudges.back.y];
    layer.unshift(shadowlayer);
  }
  if (this.wornlayers.cloak) { 
    let newlayer = [HumanParts[this.wornlayers.cloak].src, "", HumanParts[this.wornlayers.cloak].spritex + this.wornlayernudges.cloak.x - 32*(frame-1), HumanParts[this.wornlayers.cloak].spritey + this.wornlayernudges.cloak.y];
    layer.push(newlayer);
    let shadowlayer = [HumanParts[this.wornlayers.cloak].src, "", HumanParts[this.wornlayers.cloak].spritex - shadowoffsets[HumanParts[this.wornlayers.cloak].src]*32 + this.wornlayernudges.cloak.x - 32*(frame-1), HumanParts[this.wornlayers.cloak].spritey + this.wornlayernudges.cloak.y];
    layer.unshift(shadowlayer);
  }
  layer.push([HumanParts[this.wornlayers.body].src, "", HumanParts[this.wornlayers.body].spritex + this.wornlayernudges.body.x - 32*(frame-1), HumanParts[this.wornlayers.body].spritey + this.wornlayernudges.body.y]);
  layer.unshift([HumanParts[this.wornlayers.body].src, "", HumanParts[this.wornlayers.body].spritex - shadowoffsets[HumanParts[this.wornlayers.body].src]*32 + this.wornlayernudges.body.x - 32*(frame-1), HumanParts[this.wornlayers.body].spritey + this.wornlayernudges.body.y]);
  if (this.wornlayers.head) { 
    let newlayer = [HumanParts[this.wornlayers.head].src, "", HumanParts[this.wornlayers.head].spritex + this.wornlayernudges.head.x - 32*(frame-1), HumanParts[this.wornlayers.head].spritey + this.wornlayernudges.head.y];
    layer.push(newlayer);
    let shadowlayer = [HumanParts[this.wornlayers.head].src, "", HumanParts[this.wornlayers.head].spritex - shadowoffsets[HumanParts[this.wornlayers.head].src]*32 + this.wornlayernudges.head.x - 32*(frame-1), HumanParts[this.wornlayers.head].spritey + this.wornlayernudges.head.y];
    layer.unshift(shadowlayer);
  }
  if (this.wornlayers.mainhand) { 
    let newlayer = [HumanParts[this.wornlayers.mainhand].src, "", HumanParts[this.wornlayers.mainhand].spritex + this.wornlayernudges.mainhand.x - 32*(frame-1), HumanParts[this.wornlayers.mainhand].spritey + this.wornlayernudges.mainhand.y];
    layer.push(newlayer);
    let shadowlayer = [HumanParts[this.wornlayers.mainhand].src, "", HumanParts[this.wornlayers.mainhand].spritex - shadowoffsets[HumanParts[this.wornlayers.mainhand].src]*32 + this.wornlayernudges.mainhand.x - 32*(frame-1), HumanParts[this.wornlayers.mainhand].spritey + this.wornlayernudges.mainhand.y];
    layer.unshift(shadowlayer);
  }
  if (this.wornlayers.offhand) { 
    let newlayer = [HumanParts[this.wornlayers.offhand].src, "", HumanParts[this.wornlayers.offhand].spritex + this.wornlayernudges.offhand.x - 32*(frame-1), HumanParts[this.wornlayers.offhand].spritey + this.wornlayernudges.offhand.y];
    layer.push(newlayer);
    let shadowlayer = [HumanParts[this.wornlayers.offhand].src, "", HumanParts[this.wornlayers.offhand].spritex - shadowoffsets[HumanParts[this.wornlayers.offhand].src]*32 + this.wornlayernudges.offhand.x - 32*(frame-1), HumanParts[this.wornlayers.offhand].spritey + this.wornlayernudges.offhand.y];
    layer.unshift(shadowlayer);
  }
  this.layers = layer;
  this.animlength = HumanParts[this.wornlayers.body].frames;
}

let shadowoffsets = { "humanparts.png": 5, "humanseated.gif": 16, "humanthrone.gif": 5 };

let HumanParts = {
  // Bodies
  WhiteTunic: { src: "humanparts.png", type: "body", spritex: 0, spritey: -12*32, frames: 5 },
  BlueDress: { src: "humanparts.png", type: "body", spritex: 0, spritey: -98*32, frames: 3 },
  YellowDress: { src: "humanparts.png", type: "body", spritex: 0, spritey: -99*32, frames: 3 },
  BlueDress2: { src: "humanparts.png", type: "body", spritex: 0, spritey: -100*32, frames: 3 },
  YellowDress2: { src: "humanparts.png", type: "body", spritex: 0, spritey: -101*32, frames: 3 },
  Bard1: { src: "humanparts.png", type: "body", spritex: 0, spritey: -3*32, frames: 5 },
  Bard2: { src: "humanparts.png", type: "body", spritex: 0, spritey: -4*32, frames: 5 },
  ChildPale: { src: "humanparts.png", type: "body", spritex: 0, spritey: 0, frames: 5 },
  ChildDark: { src: "humanparts.png", type: "body", spritex: 0, spritey: -1*32, frames: 5 },
  Jester: { src: "humanparts.png", type: "body", spritex: 0, spritey: -5*32, frames: 5 },
  King1: { src: "humanparts.png", type: "body", spritex: 0, spritey: -6*32, frames: 5 },
  King2: { src: "humanparts.png", type: "body", spritex: 0, spritey: -7*32, frames: 5 },
  King3: { src: "humanparts.png", type: "body", spritex: 0, spritey: -8*32, frames: 5 },
//  King4: { src: "humans.png", type: "body", spritex: 0, spritey: -11*32, frames: 2 },
  Queen: { src: "humanparts.png", type: "body", spritex: 0, spritey: -9*32, frames: 5 },
  NoblePurple: { src: "humanparts.png", type: "body", spritex: 0, spritey: -10*32, frames: 5 },
  NobleGreen: { src: "humanparts.png", type: "body", spritex: 0, spritey: -11*32, frames: 5 },
  PurpleFancy: { src: "humanparts.png", type: "body", spritex: 0, spritey: -13*32, frames: 5 },
  BlueFancy: { src: "humanparts.png", type: "body", spritex: 0, spritey: -14*32, frames: 5 },
  YellowTunic: { src: "humanparts.png", type: "body", spritex: 0, spritey: -15*32, frames: 5 },
  OrangeTunic: { src: "humanparts.png", type: "body", spritex: 0, spritey: -16*32, frames: 5 },
  WhiteTunic2: { src: "humanparts.png", type: "body", spritex: 0, spritey: -17*32, frames: 5 },
  BlueTunic: { src: "humanparts.png", type: "body", spritex: 0, spritey: -18*32, frames: 5 },
  OrangeTunic2: { src: "humanparts.png", type: "body", spritex: 0, spritey: -19*32, frames: 5 },
  GreenTunic: { src: "humanparts.png", type: "body", spritex: 0, spritey: -20*32, frames: 5 },
  Gambison: { src: "humans.png", type: "body", spritex: 0, spritey: -23*32, frames: 2 },
  PlateWhiteTabard: { src: "humanparts.png", type: "body", spritex: 0, spritey: -29*32, frames: 5 },
  PlateCheckeredTabard: { src: "humanparts.png", type: "body", spritex: 0, spritey: -30*32, frames: 5 },
  LeatherArmor: { src: "humanparts.png", type: "body", spritex: 0, spritey: -31*32, frames: 5 },
  ChainMail: { src: "humanparts.png", type: "body", spritex: 0, spritey: -32*32, frames: 5 },
  PlatePaladin: { src: "humanparts.png", type: "body", spritex: 0, spritey: -33*32, frames: 5 },
  PlateSash: { src: "humanparts.png", type: "body", spritex: 0, spritey: -34*32, frames: 5 },
  PlateKnight: { src: "humanparts.png", type: "body", spritex: 0, spritey: -35*32, frames: 5 },
  Plate: { src: "humanparts.png", type: "body", spritex: 0, spritey: -36*32, frames: 5 },
  Plate2: { src: "humanparts.png", type: "body", spritex: 0, spritey: -37*32, frames: 5 },
  BlueRobeHood: { src: "humanparts.png", type: "body", spritex: 0, spritey: -21*32, frames: 5 },
  BlueRobe: { src: "humanparts.png", type: "body", spritex: 0, spritey: -22*32, frames: 5 },
  RedRobe: { src: "humanparts.png", type: "body", spritex: 0, spritey: -23*32, frames: 5 },
  GreenRobe: { src: "humanparts.png", type: "body", spritex: 0, spritey: -24*32, frames: 5 },
  BlueRobePlain: { src: "humanparts.png", type: "body", spritex: 0, spritey: -25*32, frames: 5 },
  BrownRobeHood: { src: "humanparts.png", type: "body", spritex: 0, spritey: -26*32, frames: 5 },
  BrownRobe: { src: "humanparts.png", type: "body", spritex: 0, spritey: -27*32, frames: 5 },
  BrownRobeFancy: { src: "humanparts.png", type: "body", spritex: 0, spritey: -28*32, frames: 5 },

  // Heads
  DarkOpenHelm: { src: "humanparts.png", type: "head", spritex: 0, spritey: -38*32, frames: 5 },
  GoldClosedHelm: { src: "humanparts.png", type: "head", spritex: 0, spritey: -39*32, frames: 5 },
  BlueSolidHelm: { src: "humanparts.png", type: "head", spritex: 0, spritey: -40*32, frames: 5 },
  PaleOpenHelm: { src: "humanparts.png", type: "head", spritex: 0, spritey: -41*32, frames: 5 },
  BlueClosedHelm: { src: "humanparts.png", type: "head", spritex: 0, spritey: -42*32, frames: 5 },
//  BeardedPale: { src: "humans.png", type: "head", spritex: 0, spritey: -46*32, frames: 2 },
  OldManPale: { src: "humanparts.png", type: "head", spritex: 0, spritey: -43*32, frames: 5 },
//  LongBrownHairPale: { src: "humans.png", type: "head", spritex: 0, spritey: -48*32, frames: 2 },
  ShortBlackPale: { src: "humanparts.png", type: "head", spritex: 0, spritey: -44*32, frames: 5 },
  BaldBeardedDark: { src: "humanparts.png", type: "head", spritex: 0, spritey: -45*32, frames: 5 },
  ShortBrownPale: { src: "humanparts.png", type: "head", spritex: 0, spritey: -46*32, frames: 5 },
  RedHeadPale: { src: "humanparts.png", type: "head", spritex: 0, spritey: -105*32, frames:5 },
  KingHead: { src: "humanparts.png", type: "head", spritex: 0, spritey: -47*32, frames: 5 },
  GoldCircletDark: { src: "humanparts.png", type: "head", spritex: 0, spritey: -48*32, frames: 5 },
  PrinceHead: { src: "humanparts.png", type: "head", spritex: 0, spritey: -49*32, frames: 5 },
  SilverCircletPale: { src: "humanparts.png", type: "head", spritex: 0, spritey: -50*32, frames: 5 },
  BlondePale: { src: "humanparts.png", type: "head", spritex: 0, spritey: -51*32, frames: 5 },
  Hood1: { src: "humanparts.png", type: "head", spritex: 0, spritey: -52*32, frames: 5 },
  Hood2: { src: "humanparts.png", type: "head", spritex: 0, spritey: -53*32, frames: 5 },
  OldManPale2: { src: "humanparts.png", type: "head", spritex: 0, spritey: -54*32, frames: 5 },
  ShortBlackDark: { src: "humanparts.png", type: "head", spritex: 0, spritey: -55*32, frames: 5 },
//  VanDykePale: { src: "humans.png", type: "head", spritex: 0, spritey: -60*32, frames: 2 },
  BrownDark: { src: "humanparts.png", type: "head", spritex: 0, spritey: -56*32, frames: 5 },
//  LongBlondePale: { src: "humans.png", type: "head", spritex: 0, spritey: -62*32, frames: 2 },
  RedheadWomanPale: { src: "humanparts.png", type: "head", spritex: 0, spritey: -102*32, frames: 3 },
  BrunetteWomanPale: { src: "humanparts.png", type: "head", spritex: 0, spritey: -103*32, frames: 3 },
  WomanDark: { src: "humanparts.png", type: "head", spritex: 0, spritey: -104*32, frames: 3 },
  BardDark: { src: "humanparts.png", type: "head", spritex: 0, spritey: -2*32, frames: 5 },
  BardPale1: { src: "humanparts.png", type: "head", spritex: 0, spritey: -110*32, frames: 5 },
  BardPale2: { src: "humanparts.png", type: "head", spritex: 0, spritey: -111*32, frames: 5 },
  
  //Cloak
  RedCloak: { src: "humanparts.png", type: "cloak", spritex: 0, spritey: -107*32, frames: 5 },
  BlueCloak: { src: "humanparts.png", type: "cloak", spritex: 0, spritey: -108*32, frames: 5 },

  //Back:
  Quiver: { src: "humanparts.png", type: "back", spritex: 0, spritey: -109*32, frames: 5 },

  //Hands
  MainHandPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -59*32, frames: 5 },
  MainHandDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -61*32, frames: 5 },
  HandsPaleArms: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -57*32, frames: 5 },
  HandsDarkArms: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -58*32, frames: 5 },
  Gauntlets: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -63*32, frames: 5 },
  ShortswordPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -65*32, frames: 5 },
  DaggerPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -69*32, frames: 5 },
  LongswordPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -71*32, frames: 5 },
  SwordFromStonePale: { src: "animweapons.png", type: "mainhand", spritex: 0, spritey: -10*32, frames: 5 },  
  UnenchantedPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -73*32, frames: 5 },
  LightningSwordPale: { src: "animweapons.gif", type: "mainhand", spritex: 0, spritey: -2*32, frames: 5 },
  FlamingSwordPale: { src: "animweapons.gif", type: "mainhand", spritex: 0, spritey: 0, frames: 5 },
  VenomSwordPale: { src: "animweapons.gif", type: "mainhand", spritex: 0, spritey: -4*32, frames: 5 },
  SwordOfDefensePale: {  src: "animweapons.gif", type: "mainhand", spritex: 0, spritey: -6*32, frames: 5 },
  MaulPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -75*32, frames: 5 },
  HammerPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -77*32, frames: 5 },
  MacePale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -79*32, frames: 5 },
  AxePale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -81*32, frames: 5 },
  HalberdPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -83*32, frames: 5 },
  QuarterstaffPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -85*32, frames: 5 },
  CrookPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -87*32, frames: 5 },
  WandPale: { src: "animweapons.gif", type: "mainhand", spritex: 0, spritey: -8*32, frames: 5 },
  SerpentStaffPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -89*32, frames: 5 },
  BowPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -91*32, frames: 5 },
  CrossbowPale: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -93*32, frames: 5 },
  ShortswordDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -67*32, frames: 5 },
  DaggerDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -70*32, frames: 5 },
  LongswordDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -72*32, frames: 5 },
  UnenchantedDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -74*32, frames: 5 },
  SwordFromStoneDark: { src: "animweapons.png", type: "mainhand", spritex: 0, spritey: -11*32, frames: 5 }, 
  LightningSwordDark: { src: "animweapons.gif", type: "mainhand", spritex: 0, spritey: -3*32, frames: 5 },
  FlamingSwordDark: { src: "animweapons.gif", type: "mainhand", spritex: 0, spritey: -1*32, frames: 5 },
  VenomSwordDark: { src: "animweapons.gif", type: "mainhand", spritex: 0, spritey: -5*32, frames: 5 },
  SwordOfDefenseDark: { src: "animweapons.gif", type: "mainhand", spritex: 0, spritey: -7*32, frames: 5 },
  MaulDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -76*32, frames: 5 },
  HammerDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -78*32, frames: 5 },
  MaceDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -80*32, frames: 5 },
  AxeDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -82*32, frames: 5 },
  HalberdDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -84*32, frames: 5 },
  QuarterstaffDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -86*32, frames: 5 },
  CrookDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -88*32, frames: 5 },
  WandDark: { src: "animweapons.gif", type: "mainhand", spritex: 0, spritey: -9*32, frames: 5 },
  SerpentStaffDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -90*32, frames: 5 },
  BowDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -92*32, frames: 5 },
  CrossbowDark: { src: "humanparts.png", type: "mainhand", spritex: 0, spritey: -94*32, frames: 5 },

  //Offhand
  OffhandPale: { src: "humanparts.png", type: "offhand", spritex: 0, spritey: -60*32, frames: 5 }, 
  OffhandDark: { src: "humanparts.png", type: "offhand", spritex: 0, spritey: -62*32, frames: 5 }, 
  OffhandGauntlet: { src: "humanparts.png", type: "offhand", spritex: 0, spritey: -64*32, frames: 5 }, 
  OpenOffhandPale: { src: "humanparts.png", type: "offhand", spritex: 0, spritey: -66*32, frames: 5 },
  OpenOffhandDark: { src: "humanparts.png", type: "offhand", spritex: 0, spritey: -68*32, frames: 5 },
  KiteShield: { src: "humanparts.png", type: "offhand", spritex: 0, spritey: -95*32, frames: 5 },
  RoundShield: { src: "humanparts.png", type: "offhand", spritex: 0, spritey: -106*32, frames: 5 },
  OffhandDaggerPale: { src: "humanparts.png", type: "offhand", spritex: 0, spritey: -96*32, frames: 5 },
  OffhandDaggerDark: { src: "humanparts.png", type: "offhand", spritex: 0, spritey: -97*32, frames: 5 },
};

let HumanPartsSit = {
  // Bodies
  WhiteTunic: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -36*32, frames:2 },
  BlueDress: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -49*32, frames:2 },
  YellowDress: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -50*32, frames:2 },
  BlueDress2: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -49*32, frames:2 },
  YellowDress2: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -50*32, frames:2 },
  Bard1: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -19*32, frames:2 },
  Bard2: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -20*32, frames:2 },
  ChildPale: { src: "humanseated.gif", type: "body", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: 0, frames: 4 },
  ChildDark: { src: "humanseated.gif", type: "body", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -1*32, frames: 4 },
  Jester: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -48*32, frames:4 },
  King1: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -42*32, frames:2 },
  King2: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -43*32, frames:2 },
  King3: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -44*32, frames:2 },
  Queen: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -45*32, frames:2 },
  NoblePurple: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -47*32, frames:2 },
  NobleGreen: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -46*32, frames:2 },
  PurpleFancy: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -41*32, frames:2 },
  BlueFancy: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -40*32, frames:2 },
  YellowTunic: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -39*32, frames:2 },
  OrangeTunic: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -35*32, frames:2 },
  WhiteTunic2: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -36*32, frames:2 },
  BlueTunic: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -37*32, frames:2 },
  OrangeTunic2: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -35*32, frames:2 },
  GreenTunic: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -38*32, frames:2 },
  PlateWhiteTabard: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -30*32, frames:2 },
  PlateCheckeredTabard: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -31*32, frames:2 },
  LeatherArmor: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -32*32, frames:2 },
  ChainMail: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -33*32, frames:2 },
  PlatePaladin: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -29*32, frames:2 },
  PlateSash: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -34*32, frames:2 },
  PlateKnight: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -28*32, frames:2 },
  Plate: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -27*32, frames:2 },
  Plate2: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -27*32, frames:2 },
  BlueRobeHood: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -21*32, frames:2 },
  BlueRobe: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -22*32, frames:2 },
  RedRobe: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -23*32, frames:2 },
  GreenRobe: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -24*32, frames:2 },
  BlueRobePlain: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -21*32, frames:2 },
  BrownRobeHood: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -25*32, frames:2 },
  BrownRobe: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -25*32, frames:2 },
  BrownRobeFancy: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -26*32, frames:2 },

  // Heads
  OldManPale: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -13*32, frames:2 },
  ShortBlackPale: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -5*32, frames:2 },
  BaldBeardedDark: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -6*32, frames:2 },
  ShortBrownPale: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -7*32, frames:2 },
  RedHeadPale: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -4*32, frames:2 },
  KingHead: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -8*32, frames:2 },
  GoldCircletDark: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -9*32, frames:2 },
  PrinceHead: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -10*32, frames:2 },
  SilverCircletPale: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -11*32, frames:2 },
  BlondePale: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -12*32, frames:2 },
  ShortBlackDark: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -14*32, frames:2 },
  BrownDark: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -15*32, frames:2 },
  RedheadWomanPale: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -51*32, frames:2 },
  BrunetteWomanPale: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -52*32, frames:2 },
  WomanDark: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -53*32, frames:2 },
  BardDark: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -17*32, frames:2 },
  BardPale1: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -16*32, frames:2 },
  BardPale2: { src: "humanseated.gif", type: "head", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -18*32, frames:2 },

  //Hands
  HandsPale: { src: "humanseated.gif", type: "mainhand", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -2*32, frames: 2 },
  HandsDark: { src: "humanseated.gif", type: "mainhand", facing0: -12*32, facing1: -4*32, facing2: 0, facing3: -8*32, spritey: -3*32, frames: 2 },
}

let HumanPartsThrone = {
  // Bodies
  WhiteTunic: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -4*32, frames:3 },
  BlueDress: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -24*32, frames:2 },
  YellowDress: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -25*32, frames:2 },
  BlueDress2: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -24*32, frames:2 },
  YellowDress2: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -25*32, frames:2 },
  Bard1: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -22*32, frames:2 },
  Bard2: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -23*32, frames:2 },
  ChildPale: { src: "humanthrone.gif", type: "body", spritex: 0, spritey: -2*32, frames: 3 },
  ChildDark: { src: "humanthrone.gif", type: "body", spritex: 0, spritey: -3*32, frames: 3 },
  Jester: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: 0*32, frames: 5 },
  King1: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -8*32, frames:2 },
  King2: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -10*32, frames:2 },
  King3: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -9*32, frames:2 },
  Queen: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -11*32, frames:2 },
  NoblePurple: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -13*32, frames:2 },
  NobleGreen: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -12*32, frames:2 },
  PurpleFancy: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -26*32, frames:2 },
  BlueFancy: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -27*32, frames:2 },
  YellowTunic: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -28*32, frames:2 },
  OrangeTunic: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -5*32, frames:2 },
  WhiteTunic2: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -4*32, frames:2 },
  BlueTunic: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -6*32, frames:2 },
  OrangeTunic2: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -5*32, frames:2 },
  GreenTunic: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -7*32, frames:2 },
  PlateWhiteTabard: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -19*32, frames:2 },
  PlateCheckeredTabard: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -20*32, frames:2 },
  LeatherArmor: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -15*32, frames:2 },
  ChainMail: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -16*32, frames:2 },
  PlatePaladin: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -21*32, frames:2 },
  PlateSash: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -17*32, frames:2 },
  PlateKnight: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -14*32, frames:2 },
  Plate: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -18*32, frames:2 },
  Plate2: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -18*32, frames:2 },
  BlueRobeHood: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -30*32, frames:2 },
  BlueRobe: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -31*32, frames:2 },
  RedRobe: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -32*32, frames:2 },
  GreenRobe: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -33*32, frames:2 },
  BlueRobePlain: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -30*32, frames:2 },
  BrownRobeHood: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -34*32, frames:2 },
  BrownRobe: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -34*32, frames:2 },
  BrownRobeFancy: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -35*32, frames:2 },

  // Heads
  OldManPale: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -40*32, frames:2 },
  ShortBlackPale: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -37*32, frames:2 },
  BaldBeardedDark: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -42*32, frames:2 },
  ShortBrownPale: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -39*32, frames:2 },
  RedHeadPale: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -36*32, frames:2 },
//  KingHead: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -8*32, frames:2 },
 // GoldCircletDark: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -9*32, frames:2 },
  PrinceHead: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -44*32, frames:2 },
  SilverCircletPale: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -45*32, frames:2 },
  BlondePale: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -38*32, frames:2 },
  ShortBlackDark: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -41*32, frames:2 },
  BrownDark: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -43*32, frames:2 },
  RedheadWomanPale: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -51*32, frames:2 },
  BrunetteWomanPale: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -52*32, frames:2 },
  WomanDark: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -53*32, frames:2 },
  BardDark: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -48*32, frames:2 },
  BardPale1: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -49*32, frames:2 },
  BardPale2: { src: "humanthrone.gif", type: "head", spritex: 0, spritey: -50*32, frames:2 },

  //Hands
  HandsPale: { src: "humanthrone.gif", type: "mainhand", spritex: 0, spritey: -46*32, frames: 3 },
  HandsDark: { src: "humanthrone.gif", type: "mainhand", spritex: 0, spritey: -47*32, frames: 3 },
}

let HumanPartsBed = {
  // Real Heads for beds
  OldManPale: { src: "static.gif", dblsinglelower: { x: -7*32, y: -169*32},
                                   dblsingleupper: { x: -7*32, y: -170*32},
                                   dbldbllower: { x: -7*32, y: -171*32},
                                   dbldblupper: { x: -7*32, y: -172*32},
                                   single: { x: -7*32, y: -173*32},
                                   bedroll: { x:-8*32, y: -174*32} },
  ShortBlackPale: { src: "static.gif", dblsinglelower: { x: 0, y: -169*32},
                                       dblsingleupper: { x: 0, y: -170*32},
                                       dbldbllower: { x: 0, y: -171*32},
                                       dbldblupper: { x: 0, y: -172*32},
                                       single: { x: 0, y: -173*32},
                                       bedroll: { x: -8*32, y: -170*32 } },
  BaldBeardedDark: { src: "static.gif", dblsinglelower: { x: -3*32, y: -169*32},
                                        dblsingleupper: { x: -3*32, y: -170*32},
                                        dbldbllower: { x: -3*32, y: -171*32},
                                        dbldblupper: { x: -3*32, y: -172*32},
                                        single: { x: -3*32, y: -173*32},
                                        bedroll: { x: -8*32, y: -172*32} },
  ShortBrownPale: { src: "static.gif", dblsinglelower: { x: -5*32, y: -169*32},
                                       dblsingleupper: { x: -5*32, y: -170*32},
                                       dbldbllower: { x: -5*32, y: -171*32},
                                       dbldblupper: { x: -5*32, y: -172*32},
                                       single: { x: -5*32, y: -173*32},
                                       bedroll: { x: -8*32, y: -173*32} },
  RedHeadPale: { src: "static.gif", dblsinglelower: { x: -6*32, y: -169*32},
                                    dblsingleupper: { x: -6*32, y: -170*32},
                                    dbldbllower: { x: -6*32, y: -171*32},
                                    dbldblupper: { x: -6*32, y: -172*32},
                                    single: { x: -6*32, y: -173*32},
                                    bedroll: { x: -9*32, y: -173*32} },
  BlondePale: { src: "static.gif", dblsinglelower: { x: -4*32, y: -169*32},
                                   dblsingleupper: { x: -4*32, y: -170*32},
                                   dbldbllower: { x: -4*32, y: -171*32},
                                   dbldblupper: { x: -4*32, y: -172*32},
                                   single: { x: -4*32, y: -173*32},
                                   bedroll: { x: -9*32, y: -172*32} },
  ShortBlackDark: { src: "static.gif", dblsinglelower: { x: -1*32, y: -169*32},
                                       dblsingleupper: { x: -1*32, y: -170*32},
                                       dbldbllower: { x: -1*32, y: -171*32},
                                       dbldblupper: { x: -1*32, y: -172*32},
                                       single: { x: -1*32, y: -173*32},
                                       bedroll: { x: -8*32, y: -171*32} },
  BrownDark: { src: "static.gif", dblsinglelower: { x: -2*32, y: -169*32},
                                  dblsingleupper: { x: -2*32, y: -170*32},
                                  dbldbllower: { x: -2*32, y: -171*32},
                                  dbldblupper: { x: -2*32, y: -172*32},
                                  single: { x: -2*32, y: -173*32},
                                  bedroll: { x: -9*32, y: -171*32} },
};  

function NPCHumanGroupObject() {
  this.group = [];
  this.attackword = "attack";
  this.attitude = "hostile";
}
NPCHumanGroupObject.prototype = new NPCHumanObject();

NPCHumanGroupObject.prototype.populate = function() {
  let population = [];
  for (let i=0; i<this.group.length; i++) {
    let num = Dice.roll(this.group[i].count);
    for (let j=1; j<=num; j++) {
      if (population.length < 8) {
        let monster = localFactory.createTile(this.group[i].npc);
        population[population.length] = monster;
      }
    }
  }
  
  return population;
}


function PCObject() {
	this.name = "PC";
	this.str = 10;
	this.dex = 10;
	this.int = 10;
	this.level = 1;
	this.pcname = "Subject Name Here";
	this.desc = "you";
	this.alignment = "good";	
	this.attitude = "friendly";
	this.graphic = "300.gif";
	this.meleeAttackAs = "Fists";
	this.missileAttackAs = "none";
	this.meleeHitSound = "";
	this.meleeAttackSound = "";
	this.missileHitSound = "";
	this.missileAttackSound = "";	
  this.equipment = {};
  this.equipment.armor = "";
  this.equipment.weapon = "";
  this.equipment.missile = "";
	this.maxhp = 25 * this.level + 25;
	this.hp = this.maxhp;
	this.maxmana = this.int;
	this.mana = this.maxmana;
	this.movetype = MOVE_WALK;
	this.xp = 0;
	this.tp = 0;  // training points
  this.spells = [];
  this.lastspelllevel = SPELL_LIGHT_LEVEL;
  this.lastspell = 6;
  this.infuse = 0;
  this.gender = "other";
  this.casinonet = 0;
  this.karma = 0;
  this.negkarma = 0;
  this.spritexoffset = 0;
  this.spriteyoffset = 0;
  
	LightEmitting.call(this, 0.5);
	this.addType("pc");
	
  // kind of a hack
  this.equipment = {};
  this.equipment.armor = "";
  this.equipment.weapon = "";
  this.equipment.missile = "";
  this.resists = {};

  this.runes = {};
  this.runes.kings = 0;
  this.runes.flames = 0;
  this.runes.winds = 0;
  this.runes.waves = 0;
  this.runes.void = 0;
  this.runeCooldown = {};

  this.specials = {};

	this.inventory = new Collection();
  this.spellEffects = new Collection();	

	this.lastLocation = {};
	this.lastLocation.map = "";
	this.lastLocation.x = 0;
  this.lastLocation.y = 0;
  
  this.waiting = 0;
	
	this.nextMana = MANA_REGEN;
	this.nextHP = HP_REGEN;

  ManualAnimation.call(this, { 
    animstart: 0,
    animlength: HumanParts['WhiteTunic'].frames,
    animstyle: "cycle",
    allowrepeat: 0,
    framedurationmin: 240,
    framedurationmax: 340,
    startframe: "random"
  });

}
PCObject.prototype = new NPCHumanObject();

PCObject.prototype.activate = function() {
  return 1;
}

PCObject.prototype.getx = function(evenwait) {
//  if (!evenwait && this.getWaiting()) {
//    return this.moveAfterWaiting.x
//  } 
	return parseInt(this.x,10);
}

PCObject.prototype.gety = function(evenwait) {
//  if (!evenwait && this.getWaiting()) {
//    return this.moveAfterWaiting.y
//  } 
  return parseInt(this.y,10);
}

PCObject.prototype.myTurn = function() {
  maintext.flushDelayedText();
  if (ShouldShowFrames()) { PC.showFrames = 1; }
  else {delete PC.showFrames}

  if (debugmaps.open) { ShowDebugMaps(); }

  let clockface = GetClockTime(this.getLastTurnTime());
  if ((clockface[3] !== GetClockTime()[3]) && !this.getWaiting() && !this.dead) { DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety()); }
  if (!this.dead) {
    SetSky();
  }

  if (this.replaceTurnWith) {
    this.replaceTurnWith(this);
    // remember that it is the responsibility of the replaceTurn function to delete itself from the PC
    return 0;
  }

  DebugWrite("new", "<div style='border-style:inset; border-color:#999999'><span style='" + debugstyle.header + "'><span style='color:purple'>=== PC TURN ===</span>   Timestamp: " + DU.DUTime.getGameClock().toFixed(5) + "; Clock: " + GetUsableClockTime() + "; x: " + PC.getx() + ", y: " + PC.gety() + "<br />");

  if (gamestate !== "loadgame") {
    // this half of myTurn has already run before the player saved
    RunEffects(this);
  
    if (PC.getHP() <= 0) {
      if (DUTime.getGameClock() <= PC.deaduntil) {
        gamestate.setTurn(PC);
        PC.endTurn(0);
        return 0;
      } 
      if (PC.dead) {
        setTimeout(function(){ PC.myTurn(); }, 100);
        return 0;
      }
      delete PC.deaduntil;
      let returnmap = new GameMap();
      if (PC.bdc) {

        PC.setHP(1);
        PC.setMana(PC.getMaxMana());
      } else {
        if (maps.getMap("olympus1")) {
          returnmap = maps.getMap("olympus1");
          // though again, this shouldn't be in memory
        } else {
          returnmap = maps.addMap("olympus1");
        }
        AdjustStartingLocations(returnmap);
        MoveBetweenMaps(PC,PC.getHomeMap(),returnmap,49,22);
        DrawMainFrame("draw",returnmap,49,22);
        PC.setHP(PC.getMaxHP());
        PC.setMana(PC.getMaxMana());
      }
      DrawCharFrame();
      DrawTopbarFrame("<p>" + PC.getHomeMap().getDesc() + "</p>");
      SetSky();
    }
  }
    
  Regen(this);
  let awake = 1;
  let sleep = this.getSpellEffectsByName("Sleep");
  let paralyzed = this.getSpellEffectsByName("Paralyze");
  let frozen = this.getSpellEffectsByName("Frozen");
  let waiting = this.getWaiting();
  let endingwait = 0;
  if (waiting && (waiting < DUTime.getGameClock())) { 
    waiting = 0;
    EndWaiting(this,this.atinn);
    endingwait = 1;
  } else if (waiting && (PC.getx() !== 0) && (PC.gety() !== 0)) {  // waiting somewhere that can have hostiles
    let closemonsters = CheckMapForHostiles(PC);
    if ((closemonsters >= 0) && (closemonsters <= 4)) {
      maintext.addText("You become alert due to nearby enemies.");
      waiting = 0;
      EndWaiting(this,0);
      // consider checking LOS so you aren't alerted by stuff behind walls?
    }
  }
  if (sleep || paralyzed || frozen || waiting) { awake = 0; }  

  SetDebugToBottom();
  
  gamestate.setTurn(PC);
  if (awake) {
    if (!endingwait) {
      if (this.getSpellEffectsByName("DelayTurnStart")) {
        gamestate.setMode("null");
        let delayturn = this.getSpellEffectsByName("DelayTurnStart");
        delayturn.endEffect(1);
      } else {
        gamestate.setMode("player");
      }

      if (this.forcedTalk) {
        if (this.forcedTalk.getNPCName() === "Ashlin") {
          let ashlin = this.forcedTalk;
          if (ashlin && !DU.gameflags.getFlag("enter_consolation")) {
            let themap = this.getHomeMap();
            let moongate = localFactory.createTile("Moongate");
            moongate.destmap = "consolation";
            moongate.destx = 14;
            moongate.desty = 24;
            themap.placeThing(14,24,moongate);
            AnimateMoongate(moongate,0,"up",300,0,1);
            gamestate.setMode("null");
            setTimeout(function() {
              moongate.getHomeMap().moveThing(14,24,ashlin);
              moongate.getHomeMap().deleteThing(moongate);
              ShowTurnFrame(ashlin);
              let convo = ashlin.getConversation();
              let newresponse = PerformTalk(ashlin, convo, "_start");
              maintext.addText(newresponse["txt"]);
              maintext.setInputLine(newresponse["input"]);
              maintext.drawTextFrame();    
            }, 1200);
          } else if (ashlin) {
            let convo = ashlin.getConversation();
            let newresponse = PerformTalk(ashlin, convo, "_entry");
            maintext.addText(newresponse["txt"]);
            maintext.setInputLine(newresponse["input"]);
            maintext.drawTextFrame();    
          }
        } else {
          ShowTurnFrame(this.forcedTalk);
          let convo = this.forcedTalk.getConversation();
          let newresponse = PerformTalk(this.forcedTalk, convo, "_start");
          maintext.addText(newresponse["txt"]);
          maintext.setInputLine(newresponse["input"]);
          maintext.drawTextFrame();
        }

        delete this.forcedTalk;
      }
      if (!DU.gameflags.getFlag("act2")) {
        let endact = this.getSpellEffectsByName("UnconsciousEndAct");
        if (endact) {
          PerformActEnd();
        }
      }
    
      // Because EndWaiting will set to player in a second, and this can override
      // "waiting for input" states.
    }
	  return 0;
	} else {
	  if (sleep) {
  	  maintext.addText("Zzzz...");
  	} else if (paralyzed) {
  	  maintext.addText("Paralyzed!");
  	} else if (frozen) {
  	  maintext.addText("You are frozen!");
  	}
	  this.endTurn(0);
  }
  
}

PCObject.prototype.getPCName = function() {
	return this.pcname;
}

PCObject.prototype.setPCName = function(newname) {
	this.pcname = newname;
	return this.pcname;
}

PCObject.prototype.getxp = function() {
  return this.xp;
}

PCObject.prototype.setxp = function(newxp) {
  newxp = parseInt(newxp);
  this.xp = newxp;
}

PCObject.prototype.addxp = function(diffxp) {
  diffxp = parseInt(diffxp);
  this.xp += diffxp;
  this.xp = Math.min(this.xp,XP_MAX);
  return this.xp;
}

PCObject.prototype.getKarma = function() {
  return this.karma;
}

PCObject.prototype.diffKarma = function(diffkarma) {
  diffkarma = parseInt(diffkarma);
  this.karma += diffkarma;
  if (diffkarma < 0) { this.negkarma++; }
}

PCObject.prototype.gettp = function() {
  return this.tp;
}

PCObject.prototype.settp = function(newtp) {
  newtp = parseInt(newtp);
  this.tp = newtp;
}

PCObject.prototype.addtp = function(difftp) {
  difftp = parseInt(difftp);
  this.tp += difftp;
  return this.tp;
}

PCObject.prototype.addSpell = function(lvl, spellid) {
  this.spells[lvl] = (this.spells[lvl] | spellid);
  return this.spells;
}

PCObject.prototype.knowsSpell = function(lvl, spellid) {
  if (this.spells[lvl] & spellid) { return 1; }
  return 0;
}

PCObject.prototype.getSpells = function() {
  return this.spells;
}

PCObject.prototype.getLastSpellLevel = function() {
  return this.lastspelllevel;
}

PCObject.prototype.setLastSpellLevel = function(newlvl) {
  this.lastspelllevel = parseInt(newlvl);
  if (this.lastspelllevel === 0) { this.lastspelllevel = 1; }
  return this.lastspelllevel;
}

PCObject.prototype.getLastSpell = function() {
  return this.lastspell;
}

PCObject.prototype.setLastSpell = function(newid) {
  this.lastspell = parseInt(newid);
  if (this.lastspell === 0) { this.lastspell = 1; }
  return this.lastspell;
}

PCObject.prototype.getInfusion = function() {
  return this.infuse;
}

PCObject.prototype.setInfusion = function(infuse) {
  this.infuse = parseInt(infuse);
  if (this.infuse !== 1) { this.infuse = 0; }
  return this.infuse;
}

PCObject.prototype.getMaxMana = function() {
  let maxmana = this.getBaseInt() + this.getOrbInt();
  if (DU.gameflags.getFlag("pc_abyss")) {
    maxmana = maxmana * 2;
  }
  return maxmana;
}

// returns the amount of damage dealt, -1 if the damage killed the target
PCObject.prototype.dealDamage = function(dmg, src, type) {
  
  let isasleep = this.getSpellEffectsByName("Sleep");
  if (isasleep) {
    isasleep.endEffect();
  }
  
  let isfrozen = this.getSpellEffectsByName("Frozen");
  if (isfrozen) {
    isfrozen.endEffect();
  }

  let isinvuln = this.getSpellEffectsByName("Invulnerable");
  if (isinvuln) {
    dmg = 0;
  }

  dmg = CheckAbsorb(dmg,this,src,type);
  let oldhp = this.getDisplayHP();
  this.modHP(dmg*-1);
  let newhp = this.getDisplayHP();
  
  if (oldhp !== newhp) {
    DrawCharFrame();
    DamageFlash();
  }
  
  if (this.getHP() <= 0) { // killed!
    if (DU.gameflags.getFlag("storymode")) { this.setHP(1); }
    else {
      this.processDeath(1);
      return -1;
    }
  }
  else { return dmg; }
}

PCObject.prototype.getRuneCooldown = function(rune) {
  return this.runeCooldown[rune];
}

PCObject.prototype.setRuneCooldown = function(rune, timediff) {
  this.runeCooldown[rune] = DUTime.getGameClock() + timediff;
  return this.runeCooldown[rune];
}

//NOPARSE

function PointOfInterest(xval,yval) {
  
  this.x = xval;
  this.y = yval;
  this.connections = [];
//  this.type = poitype;
  
}
PointOfInterest.prototype = new Object();

function NPCBrain() {
  this.currentPoI = {};
  this.currentDestination = {};
  this.turnsToRecalcPoI = 0;
  this.turnsToRecalcDest = 0;
  this.currentPath = [];
}
NPCBrain.prototype = new Object();

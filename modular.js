"use strict";

let OnHitFuncs = {};

OnHitFuncs["disease"] = function(atk,def,dmg) {
  if (Dice.roll("1d100") < 15) {  // diseased!
    if (def.getSpellEffectsByName("Disease")) { return 0; }
    let duration = Dice.roll("2d10+10");
    let disease = localFactory.createTile("Disease");
    disease.setExpiresTime(duration + DUTime.getGameClock());
    def.addSpellEffect(disease);
   
    if (def === PC) {  
      DrawCharFrame();
      maintext.delayedAddText("The bite was diseased!");
    }
  }
  
  return;
}

OnHitFuncs["venom"] = function(atk,def,dmg) {
  if (Dice.roll("1d100") < 15) {  // diseased!
    let poison = localFactory.createTile("Poison");
    let duration = Dice.roll("2d10+10") * SCALE_TIME;
    poison.setExpiresTime(duration + DUTime.getGameClock());
    def.addSpellEffect(poison);
   
    if (def === PC) {  
      DrawCharFrame();
      maintext.delayedAddText("You have been poisoned!");
    }
  }
  
  return;
}

OnHitFuncs["steal gold"] = function(atk,def,dmg) {
  let chance = 25 - def.getDex();  // start with a 15% chance against the PC
  if (Dice.roll("1d100") < chance) {
    if (def.checkType("PC")) {
      let die = atk.getLevel() * 2;
      let loss = Dice.roll(die + "d6");
      if (loss > def.getGold()) { loss = def.getGold(); } 
      loss = 0-loss;
      def.addGold(loss);
      if (def.getGold() < 0) { def.setGold(0); }
      maintext.delayedAddText("The " + atk.getDesc() + " steals some gold!");
      DrawCharFrame();
      atk.stolengold = -1*loss;
      DUPlaySound("sfx_coin");
    }
  }
}

OnHitFuncs["stealfood"] = function(atk,def,dmg) {
  if (Dice.roll("1d100") < 30) {
    if (def.checkType("PC")) {
      maintext.delayedAddText("The " + atk.getDesc() + " has stolen some food! It consumes it greedily.");
      atk.fed = 1;
    }
  }
}

OnHitFuncs["knockback"] = function(atk,def,dmg) {
  let chance = def.getStr() * 2.5;
  if (Dice.roll("1d100") > chance) {
    let options = [];
    let flip = Dice.roll("1d2-1");
    let oct = GetOctant(def.getx()-atk.getx(),def.gety()-atk.gety());
    if (oct === 0) {
      if (flip) { options = [[def.getx(),def.gety()-1],[def.getx()-1,def.gety()-1],[def.getx()+1,def.gety()-1]] }
      else { options = [[def.getx(),def.gety()-1],[def.getx()+1,def.gety()-1],[def.getx()-1,def.gety()-1]] }
    } else if (oct === 1) {
      if (flip) { options = [[def.getx()+1,def.gety()-1],[def.getx(),def.gety()-1],[def.getx()+1,def.gety()]] }
      else { options = [[def.getx()+1,def.gety()-1],[def.getx()+1,def.gety()],[def.getx(),def.gety()-1]] }
    } else if (oct === 2) { 
      if (flip) { options = [[def.getx()+1,def.gety()],[def.getx()+1,def.gety()+1],[def.getx()+1,def.gety()-1]] }
      else { options = [[def.getx()+1,def.gety()],[def.getx()+1,def.gety()-1],[def.getx()+1,def.gety()+1]] }
    } else if (oct === 3) {
      if (flip) { options = [[def.getx()+1,def.gety()+1],[def.getx(),def.gety()+1],[def.getx()+1,def.gety()]] }
      else { options = [[def.getx()+1,def.gety()+1],[def.getx()+1,def.gety()],[def.getx(),def.gety()+1]] }
    } else if (oct === 4) {
      if (flip) { options = [[def.getx(),def.gety()+1],[def.getx()+1,def.gety()+1],[def.getx()-1,def.gety()+1]] }
      else { options = [[def.getx(),def.gety()+1],[def.getx()-1,def.gety()+1],[def.getx()+1,def.gety()+1]] }
    } else if (oct === 5) {
      if (flip) { options = [[def.getx()-1,def.gety()+1],[def.getx(),def.gety()+1],[def.getx()-1,def.gety()]] }
      else { options = [[def.getx()-1,def.gety()+1],[def.getx()-1,def.gety()],[def.getx(),def.gety()+1]] }
    } else if (oct === 6) { 
      if (flip) { options = [[def.getx()-1,def.gety()],[def.getx()-1,def.gety()-1],[def.getx()-1,def.gety()+1]] }
      else { options = [[def.getx()-1,def.gety()],[def.getx()-1,def.gety()+1],[def.getx()-1,def.gety()-1]] }
    } else if (oct === 7) {
      if (flip) { options = [[def.getx()-1,def.gety()-1],[def.getx(),def.gety()-1],[def.getx()-1,def.gety()]] }
      else { options = [[def.getx()-1,def.gety()-1],[def.getx()-1,def.gety()],[def.getx(),def.gety()-1]] }
    }

    while (options[0]) {
      let tile = def.getHomeMap().getTile(options[0][0],options[0][1]);
      if (tile !== "OoB") {
        if (!tile.getTopFeature() && !tile.getTopNPC() && !tile.getTopPC()) {
          def.moveMe(options[0][0] - def.getx(),options[0][1] - def.gety());
          if (def === PC) { maintext.addText("The powerful blow knocks you backwards!"); }
          else {
            if ((def.getHomeMap() === PC.getHomeMap()) && (GetDistance(def.getx(),def.gety(),PC.getx(),PC.gety()) <= 5)) {
              maintext.addText("The powerful blow knocks " + def.getFullDesc() + " back!");
            }
          }
          return;
        }
      }
      options.shift();
    }
  
  }
}

OnHitFuncs["entangle"] = function(atk,def,dmg) {
  let chance = ((def.getDex() - 15) * 1.5) + 50;
  if (Dice.roll("1d100") > chance) {
    let ent = localFactory.createTile("Entangle");
    ent.source = atk.getSerial();
    ent.setExpiresTime(-1);
    def.addSpellEffect(ent);
  }
}

OnHitFuncs["paralyze"] = function(atk,def,dmg) {
  let chance = 40 - def.getStr();
  let roll = Dice.roll("1d100");
  if (roll <= chance) {
    let para = localFactory.createTile("Paralyze");
    let dur = Dice.roll("1d6");
    if (dur <= 3) { dur = 1; }
    else if (dir < 6) { dur = 2; }
    else {dur = 3; }
    para.setExpiresTime(DUTime.getGameClock() + (dur*SCALE_TIME))
    def.addSpellEffect(para);
  }
}

OnHitFuncs["stun"] = function(atk,def,dmg) {
  let chance = 40 - def.getStr();
  let roll = Dice.roll("1d100");
  if (roll <= chance) {
    let para = localFactory.createTile("Stunned");
    let dur = Dice.roll("1d6");
    if (dur <= 3) { dur = 1; }
    else if (dir < 6) { dur = 2; }
    else {dur = 3; }
    para.setExpiresTime(DUTime.getGameClock() + (dur*SCALE_TIME))
    def.addSpellEffect(para);
  }
}

OnHitFuncs["slow"] = function(atk,def,dmg) {
  let roll = Dice.roll("1d100");
  if (roll <= 10) {
    let para = localFactory.createTile("Slow");
    let dur = Dice.roll("1d6");
    para.setExpiresTime(DUTime.getGameClock() + (dur*SCALE_TIME))
    def.addSpellEffect(para);
  }
}

OnHitFuncs["manaclash"] = function(atk,def,dmg) {
  let roll = Dice.roll("1d7");
  if (roll === 1) {
    def.setMana(Math.max(0,def.getMana()-Dice.roll("1d5")));
    maintext.delayedAddText("Your mana is drained!");
  }
}


let OnDamagedFuncs = {};

OnDamagedFuncs["die"] = function(atk,who,dmg,weapon) {
  DebugWrite("combat", "OnDamaged - illusion dies.");
  // Illusions die in one hit.
  // Consider adding a different description to the death?
  return 10000;
}

OnDamagedFuncs["incorporeal"] = function(atk,who,dmg,weapon) {
  DebugWrite("combat", "OnDamaged - incorporeal");
  let chance = 40;
  if ((weapon.getName() === "MagicAxe") || (weapon.getName() === "Wand") || (weapon.getName() === "MagicSword") || (weapon.getName() === "LightningSword") || (weapon.getName() === "FlamingSword") || (weapon.getName() === "SwordOfDefense") || (weapon.getName() === "VenomSword")) {
    chance = 20;
  } else if (weapon.getName() === "SpellWeapon") {
    if ((weapon.dmgtype === "force") || (weapon.dmgtype === "drain")) {
      chance = 0;
    } else {
      chance = 20;
    }
  }
  if (Dice.roll("1d100") <= chance) {
    maintext.delayedAddText("The creature's incorporeality prevents it from taking damage!");
    return 0;
  }
  return dmg;
}

OnDamagedFuncs["shock"] = function(atk,who,dmg,weapon) {
  DebugWrite("combat", "OnDamaged - shock");
  if (!weapon.checkType("MissileWeapon")) {
    let shock = Dice.roll(DMG_LIGHT);
    atk.dealDamage(shock,who,"lightning");
    if (atk === PC) { maintext.delayedAddText("You are struck by electricity when you hit the " + who.getDesc() + "!"); }
    else { maintext.delayedAddText("The " + atk.getDesc() + " is struck by electricity when it hits the " + who.getDesc() + "!"); }
  }
  return dmg;
}

OnDamagedFuncs["split"] = function(atk,who,dmg,weapon) {
  DebugWrite("combat", "OnDamaged - split");
  let hp = who.getHP() - dmg;
  if (hp > 0) {
    if (Dice.roll("1d100") <= 25) {   // chance of slime split
      let whomap = who.getHomeMap();
      let tileopts = [];
      for (let i=-1;i<=1;i++) {
        for (let j=-1;j<=1;j++) {
          let tile = whomap.getTile(who.getx()+i,who.gety()+j);
          if (tile !== "OoB") {
            if (!tile.getTopFeature() && !tile.getTopNPC() && !tile.getTopPC() && tile.canMoveHere(MOVE_WALK).canmove) {
              tileopts.push({x:who.getx()+i,y:who.gety()+j});
            }
          }
        }
      }
      if (tileopts.length) {
        if (IsObjectVisibleOnScreen(who)) {
          maintext.delayedAddText("The slime splits!");
          DUPlaySound("sfx_slime_split");
        }
        let tr = Dice.roll("1d"+tileopts.length+"-1");
        let slime = localFactory.createTile("SlimeNPC");
        slime.setMaxHP(hp);
        slime.setHP(hp);
        whomap.placeThing(tileopts[tr].x,tileopts[tr].y,slime);
        DrawMainFrame("one", who.getHomeMap(), tileopts[tr].x, tileopts[tr].y);
      }
    }
  } 
  return dmg; 
}

let OnDeathFuncs = {};

OnDeathFuncs["insects"] = function(who) {
  let quant = Dice.roll("1d4");
  for (let i=1;i<=quant;i++) {
    let bug = localFactory.createTile("GiantInsectsNPC");
    who.getHomeMap().placeThing(who.getx(),who.gety(),bug);
  }
}

OnDeathFuncs["Patrol"] = function(who) {
  let combatmap = who.getHomeMap();
  let guardsleft = 0;
  if (combatmap.getName().includes("combat")) {
    // this is a guard patrol. Otherwise, it was a guard killed in town.
    let npcs = combatmap.npcs.getAll();
    for (let i=0;i<npcs.length;i++) {
      if (npcs[i].getName().includes("Guard")) { guardsleft++; }
    }
    if (!guardsleft) {
      let worldmap = combatmap.getExitToMap();
      let pcx = combatmap.getExitToX();
      let pcy = combatmap.getExitToY();
      for (let x = pcx-1; x<=pcx+1; x++) {
        for (let y = pcy-1; y<=pcy+1; y++) {
          let tile = worldmap.getTile(pcx,pcy);
          let npc = tile.getTopNPC();
          if (npc.getName().includes("Guard")) {
            // If, somehow, the PC has attacked a guard patrol while adjacent to _another_ guard patrol, there's a chance the wrong
            // one will disappear. I'm not concerned.
            DUTime.removeEntityFrom(npc);
            worldmap.deleteThing(npc);
            return;
          }
        }
      }
    }
  }
}

OnDeathFuncs["oliviaDead"] = function(who) {
  //deal with temporarily removing the cart
  //make its next schedule index point to "move to limbo"
  let worldmap = maps.getMap("darkunknown");
  let npcs = worldmap.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName() === "HorseAndCartNPC") {
      let schidx = npcs[i].getCurrentScheduleIndex();
      console.log(schidx);
      if (schidx < 4) { 
        npcs[i].setCurrentScheduleIndex(4);
        delete npcs[i].flags.activityComplete;
        return;
      } 
      npcs[i].setCurrentScheduleIndex(11);
      delete npcs[i].flags.activityComplete;
    }
  }
}

OnDeathFuncs["patrolDead"] = function(who) {
  let npcs = who.getHomeMap().npcs.getAll();
  let guardsleft = 0;
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName().includes("Guard")) { guardsleft = 1; }
  }
  if (!guardsleft) {
    let worldmap = maps.getMap("darkunknown");
    let patrol = worldmap.getTile(PC.lastAttackedx,PC.lastAttackedy).getTopNPC();
    DUTime.removeEntityFrom(patrol);
    worldmap.deleteThing(patrol);
  }
}

OnDeathFuncs["Warduke"] = function() {
  DU.gameflags.setFlag("warduke_defeated",1);
  PC.diffKarma(2);
}

OnDeathFuncs["Borogard"] = function() {
  DU.gameflags.setFlag("borogard_killed",1);
}

OnDeathFuncs["destroycrystals"] = function(who) {
  let tile = who.getHomeMap().getTile(who.getx(),who.gety()).getFeatures();
  for (let i=0;i<tile.length;i++) {
    if (tile[i].getName() === "BlueCrystal") {
      who.getHomeMap().deleteThing(tile[i]);
      return;
    }
  }
}

OnDeathFuncs["Elder"] = function(who) {
  DU.gameflags.setFlag("elder_killed");
  let dgmap = who.getHomeMap();
  maintext.addText('The dragon slumps to the ground, and opens one huge eye to gaze at you. Its voice rattles forth, "It is done. I see the path before you, mortal: You venture into a darkness the likes the world has ne\'er seen. May you never return to the lands of light..." The dragon\'s labored breathing ceases.');
  for (let i=0;i<3;i++) {
    let chest = localFactory.createTile("Chest");
    chest.setLootgroup("castlechest");
    AddLoot(chest);
    dgmap.placeThing(who.attachedParts[i].getx(), who.attachedParts[i].gety(), chest);
  }
}

OnDeathFuncs["endact"] = function() {
  // WORKING HERE
  let endact = localFactory.createTile("UnconsciousEndAct");
  endact.setExpiresTime(-1);
  endact.setPower(1);
  PC.addSpellEffect(endact);
}

OnDeathFuncs["cult"] = function(who) {
  let themap = who.getHomeMap();
  if (themap.getName() !== "Shadow3") { alert("Somehow on the wrong map"); }
  // check to see if both imps and cultists are dead, if so Rhys says something.
  let impcount = 0;
  let cultistcount = 0;
  let npcs = themap.npcs.getAll();
  let rhys;
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName() === "ImpNPC") { if (npcs[i] !== who) { impcount++; } }
    if (npcs[i].getName() === "CultistNPC") { if (npcs[i] !== who) { cultistcount++; } }
    if (npcs[i].getNPCName() === "Rhys") { rhys = npcs[i]; }
  }
  if (!impcount && !cultistcount) {
    PC.forcedTalk = rhys;
    DU.gameflags.setFlag("cultist_defeat",1);
  }
}

OnDeathFuncs["scouring"] = function(who) {
  let themap = who.getHomeMap();
  if (themap.getName() !== "beldskae_scour") { alert("Somehow on wrong map."); }
  let npcs = themap.npcs.getAll();
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName() === "DaemonNPC") { return; }   // this wasn't the last daemon, keep on
  }
  // all the Daemons are dead!
  let world = maps.getMap("darkunknown");
  let worldfeas = world.features.getAll();
  let beld;
  for (let i=0;i<worldfeas.length;i++) {
    let fea = worldfeas[i];
    if (fea.getEnterMap) {
      if ((fea.getEnterMap().entermap === "beldskae_scour") || (fea.getEnterMap().entermap === "beldskae_razed")) {
        fea.setEnterMap("beldskae_saved", fea.getEnterMap().enterx, fea.getEnterMap().entery);
        fea.setDesc("Towne of Beldskae");
        let gra = fea.getGraphicArray();
        gra[0] = "town2.gif";
        gra[2] = 0;
        gra[3] = 0;
        fea.setGraphicArray(gra);
        DU.gameflags.setFlag("beldskae_saved",1);
        DU.gameflags.setFlag("beldskae",1);
      }
    }
  }
  for (let i=0;i<npcs.length;i++) {
    if (npcs[i].getName() === "TownGuardNPC") {
      npcs[i].setAggro(0);
    }
  }
}

OnDeathFuncs["tharock"] = function() {
  let tharock = PC.getHomeMap().getTile(65,0).getTopNPC();
  if (tharock) {
    tharock.timer = 1;
  }
}

OnDeathFuncs["archdaemon_bone"] = function() {
  maintext.addText('Having been struck a mortal blow, the daemon straightens and stands tall. It spreads its wings and looks balefully into your eyes. "I know you now, Lightbearer." There is a flash of darkness, and it is gone.');
}

OnDeathFuncs["archdaemon_ashes"] = function() {
  maintext.addText('As the daemon is struck down, it gasps: "You are... stronger than you appear, ... little one. But it will not... avail you..."');
}

OnDeathFuncs["archdaemon_dust"] = function() {
  maintext.addText('As the daemon collapses, it cries out: "Great Shepherd of the Dark, I have failed you!"');
}

OnDeathFuncs["shadow"] = function(who) {
  let npcs = who.getHomeMap().npcs.getAll();
  let shadowcount = 0;
  for (let i=0;i<npcs.length;i++) {
    if ((npcs[i].getName() === "ShadowNPC") && (npcs[i] !== who)) { shadowcount++; }
  }
  if (shadowcount === 0) {
    let moongate = localFactory.createTile("DaemonMoongate");
    who.getHomeMap().placeThing(who.getx(),who.gety(),moongate);
    moongate.first = 1;
  }
}

OnDeathFuncs["doppelganger"] = function(who) {
  let gatex = 24;
  let gatey = 21;
  if (who.getName() === "DaemonNPC") { 
    gatex = who.getx();
    gatey = who.gety();
  }
  // check for doppelgangers
  let thismap = who.getHomeMap();
  let npcs = thismap.npcs.getAll();
  let dops = 0;
  for (let i=0;i<npcs.length;i++) {
    if ((npcs[i] !== who) && (npcs[i].getName() === "DoppelgangerNPC")) {
      dops = 1;
    }
  }
  if (!dops) {
    let moongate = localFactory.createTile("DaemonMoongate");
    who.getHomeMap().placeThing(gatex,gatey,moongate);
    moongate.second = 1;
  }
}

function PerformActEnd() {
  let endact = PC.getSpellEffectsByName("UnconsciousEndAct");
  if (endact.getPower() === 1) {
    let newmap = new GameMap();
    if (maps.getMap("landsbeyond")) {
      newmap = maps.getMap("landsbeyond");
      // though I'm confused about why this is already in memory!
    } else {
      newmap = maps.addMap("landsbeyond");
    }
    let spellobjs = PC.getSpellEffects();
    if (spellobjs.length) {
      for (let i=0; i<spellobjs.length; i++ ) {
        if (spellobjs[i].getExpiresTime() !== -1) {
          spellobjs[i].endEffect();
        }
      }      
    }
    MoveBetweenMaps(PC,PC.getHomeMap(),newmap, 7, 7, 1);
    FadeOut(1);
    maintext.addText("The great dragon's body strikes the ground with a crash, and a thundering wave of psychic energy overwhelms your mind. The room fades around you!");
    gamestate.setMode("anykey");
    maintext.setInputLine("&gt;[MORE]");
    maintext.drawTextFrame(); 
    DU.gameflags.setFlag("intermission",1);
    targetCursor.command = "intermission";
    endact.setPower(2);
  } else if (endact.getPower() === 2) {
    maintext.addText("<br style='textbreak' />You feel a dark sensation batter against your mind, like the beating of mighty wings, but your mental fortitude is too great- with a feeling of dismay, it falls away.");
    endact.setPower(3);
  } else if (endact.getPower() === 3) {
    maintext.addText(`<br style='textbreak' />You force yourself back to your senses, and with a groan open your eyes once more.`);
    let returnmap;
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

    endact.setPower(4);
  } else if (endact.getPower() === 4) {
    maintext.addText(`<br style='textbreak' />You find that Taran kneels beside you. "${PC.getPCName()}, I'm glad you're ok. The dragon was struck down, and its body just... disappeared. But your brother hasn't woken up. Gather your strength, and get up when you feel ready."`);
    endact.setPower(5);
  } else if (endact.getPower() === 5) {
    maintext.addText("<br style='textbreak' />You close your eyes for a moment, and an unknown amount of time passes before you are again able to stand.");
    endact.setPower(6);
  } else if (endact.getPower() === 6) {
    maintext.addText("<span class='sysconv'>You have gained: 100 XP.</span>");
    PC.addxp(100);
    DU.gameflags.setFlag("act2",DUTime.getGameClock());
    BeginAct2();
    DU.gameflags.deleteFlag("intermission");
    maintext.setInputLine("&gt;");
    PC.deleteSpellEffect(endact);
    DrawCharFrame();
    PC.endTurn(0);
  }

}

function PlaySummonScene(frame) {
  if (frame === 1) {
    maintext.addText("Rhys lights a series of candles, and takes the Stone from you with murmured thanks.");
  } else if (frame === 2) {
    maintext.addText('Once all is in position, he reaches out and takes each of your hands, then looks at you. "We will all be a part of the spell, but I am the one whose will it will be most constrained by. I will take the lead in the questioning."');
  } else if (frame === 3) {
    maintext.addText('He begins an incantation. One by one, the color of the flames over each candle darken to match the color of the Stone of Conflagrations, which sits at one of the points of the pentagram.');
  } else if (frame === 4) {
    maintext.addText("Rhys's words pause, and you feel something wrench around you. A new flame appears in the center of the circle.");
    let flame = localFactory.createTile("FireField");
    PC.getHomeMap().placeThing(26,11,flame);
    DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
  } else if (frame === 5) {
    maintext.addText("The incanting resumes, and there is a void visible in the heart of the flames... and then something large and terrifying steps forth.");
    let daemon = localFactory.createTile("DaemonNPC");
    daemon.setAttitude("friendly");
    PC.getHomeMap().placeThing(26,11,daemon);
    DrawMainFrame("draw",PC.getHomeMap(),PC.getx(),PC.gety());
  } else if (frame === 6) {
    maintext.addText("Rhys's spell is complete. He stares at the daemon, a sheen of sweat on his brow, as the daemon raises a fist and tests the boundaries of the circle. It jerks its hand back, and looks back at Rhys.");
  } else if (frame === 7) {
    maintext.addText(`The daemon speaks: "You have called me. I have come. What is it that you seek? Power? The destruction of your enemies?"`);
  } else if (frame === 8) {
    maintext.addText(`Rhys does not even shake his head. "Neither of those things. Tell us what you know about Justice, and the Cult of Darkness."`);
  } else if (frame === 9) {
    maintext.addText(`The daemon responds, "You would call the Harbinger of Blood for information? You are fools... but, you may be wise. I can tell you what you seek."`);
  } else if (frame === 10) {
    maintext.addText(`"Yes, I will tell you. The one you call Justice is high in the Cult of Darkness. They have drawn power from the Greatest of the Dark, and seek to bring night everlasting to the world, by bringing Him here."`);
  } else if (frame === 11) {
    maintext.addText(`Rhys looks concerned. "Who is the Greatest of the Dark? What does it want?"`);
  } else if (frame === 12) {
    maintext.addText(`The daemon answers. "Far removed from these vaults of light are the courts of darkness. And at its head is the Shepherd of the Dark. He is the night’s king, the dark unknown, the farewell of the sun forever. The cult has brought him through the great warding, just as you have done to me, but they have unleashed him; now, he needs them not, and reaches to bring forth more of his own."`);
  } else if (frame === 13) {
    maintext.addText(`Lance says, "Bring forth? What do you mean?"`);
  } else if (frame === 14) {
    maintext.addText(`The daemon looks at Lance and says, "Ah. The Prince with two minds." It gives an evil smile. "Yes. His Darkness does not yet stand on Ellusus- he is too vast, and the light is too overbearing. He is outside the warding but not yet here. From where he stands, he can reach within, and cast forth his minions to the place easiest to cross over."`);
  } else if (frame === 15) {
    maintext.addText(`Lance and Rhys exchange a glance. Rhys is visibly under strain. Lance asks, "...and where is that?"`);
  } else if (frame === 16) {
    maintext.addText(`The daemon smiles. "In the place most riddled with vice. It is already almost too late to save. Much like it is almost too late to save yourselves..."`);
  } else if (frame === 17) {
    maintext.addText(`Rhys suddenly shouts three mystical words. All at once, the flames are doused, and the daemon vanishes with a wail.`);
    let bdcmap = PC.getHomeMap();
    let tile = bdcmap.getTile(26,11);
    let daemon = tile.getTopNPC();
    let flame = tile.getTopFeature();
    bdcmap.deleteThing(flame);
    bdcmap.deleteThing(daemon);
    DUTime.removeEntityFrom(flame);
    DUTime.removeEntityFrom(daemon);
  } else if (frame === 18) {
    maintext.addText(`Rhys sags to his knees. "I'm sorry. It was beginning to overwhelm my binding. I wasn't strong enough. I had to send it back. I'm glad I was able to send it back. I'm sorry. I hope we learned enough."`);
    let gnome = localFactory.createTile("NegatorGnomeNPC");
    let gnomemap = maps.getMap("gnomeland");
    if (!gnomemap) {
      gnomemap = new GameMap();
      gnomemap = maps.addMap("gnomeland");
    }
    gnomemap.placeThing(2,1,gnome);
    newcrystal.invisible = 1;
    let cataclysm = localFactory.createTile("ScouringBeldskae");
    gnome.addSpellEffect(cataclysm);
  
    return 1;
  }
}
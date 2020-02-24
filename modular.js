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
      options.unshift();
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
          let tile = whomap.getTile(who.getx()+1,who.gety()+1);
          if (tile !== "OoB") {
            if (!tile.getTopFeature() && !tile.getTopNPC() && !tile.getTopPC()) {
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
      }
    }
  } 
  return dmg; 
}

let OnDeathFuncs = {};

OnDeathFunc["insects"] = function() {
  let quant = Dice.roll("1d4");
  for (let i=1;i<=quant;i++) {
    let bug = localFactory.createTile("GiantInsectsNPC");
    this.getHomeMap().placeThing(this.getx(),this,gety(),bug);
  }
}

OnDeathFuncs["Warduke"] = function() {
  DU.gameflags.setFlag("warduke_defeated");
  PC.diffKarma(2);
}

OnDeathFunc["endact"] = function() {
  // WORKING HERE
}

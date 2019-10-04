
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
      atk.stolengold = loss;
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
  // working here
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
    }
  }
}

// need: entangle, knockback, paralyze, manaclash, slow, stun
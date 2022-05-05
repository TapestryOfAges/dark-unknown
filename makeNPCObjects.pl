#!/usr/bin/perl

use strict;
use warnings;

open (my $npcdoc, "<", "MOB Stats - Monsters.tsv") or die "Can't open MOB Stats - Monsters.tsv\n";
open (my $out, ">", "npcObjects.js") or die "Can't open output file.\n";

my $firstline = 1;

print $out '"use strict";';
print $out "\n\n";

foreach my $line (<$npcdoc>) {
  if ($firstline) {
    $firstline = 0;
    next;
  }
  chomp $line;
  my @fields = split("\t",$line);
  
  print $out "\n// $fields[1]\n\n";
  print $out "function " . $fields[0] . "NPCTile() {\n";
  print $out "  this.name = '$fields[0]NPC';\n";
  print $out "  this.level = $fields[2];\n";
  print $out "  this.addhp = $fields[3];\n";
  print $out "  this.str = $fields[4];\n";
  print $out "  this.dex = $fields[5];\n";
  print $out "  this.int = $fields[6];\n";
  print $out "  this.alignment = '$fields[7]';\n";
  print $out "  this.attitude = '$fields[8]';\n";
  print $out "  this.peaceAI = '$fields[9]';\n";
  print $out "  this.forgetAt = $fields[10];\n";
  print $out "  this.withdraw = $fields[11];\n";
  if (!$fields[45]) { # no animation override
    if ($fields[48]) {
      print $out "  this.graphic = 'static.png';\n";
      print $out "  this.spritexoffset = HumanParts[$fields[46]].spritex;\n";
      print $out "  this.spriteyoffset = HumanParts[$fields[46]].spritey;\n";

      print $out "\n  ManualAnimation.call(this, { \n";
      print $out "    animstart: HumanParts[$fields[46]].spritex,\n";
      print $out "    animlength: HumanParts[$fields[46]].frames,\n";
      print $out "    animstyle: \"random\",\n";
      print $out "    allowrepeat: 0,\n";
      print $out "    framedurationmin: 120,\n";
      print $out "    framedurationmax: 170,\n";
      print $out "    startframe: \"random\"\n";
      print $out "  });\n";
    }
    else if ($fields[12] =~ /,/) {
      $fields[12] =~ s/ //g;
      my @graphics = split(',', $fields[12]);
      print $out "  this.graphic = '$graphics[0]';\n";
      shift @graphics;
      print $out "  this.altgraphic = [";
      while ($graphics[0]) {
        print $out "'$graphics[0]',";
        shift @graphics;
      }  
      print $out "];\n";
    } else { print $out "  this.graphic = '$fields[12]';\n"; }
  }
  if ($fields[13] =~ /\;/) {
    print $out "  this.meleeAttackAs = 'none';\n";
    my @wpnvals = split(';', $fields[13]);
    print $out "  this.meleeDamage = '$wpnvals[0]'\n";
    print $out "  this.meleeStrDamage = $wpnvals[1]\n";
  } else {
    print $out "  this.meleeAttackAs = '$fields[13]';\n";
  }
  if ($fields[14] =~ /\;/) {
    print $out "  this.missileAttackAs = 'none';\n";
    my @wpnvals = split(';', $fields[14]);
    print $out "  this.missileDamage = '$wpnvals[0]'\n";
    print $out "  this.missileStrDamage = $wpnvals[1]\n";
    print $out "  this.missileRange = $wpnvals[2]\n";
  } else{
    print $out "  this.missileAttackAs = '$fields[14]';\n";
  }
  if (!($fields[15] =~ /\;/)) { print $out "  this.armorAs = '$fields[15]Armor';\n"; }
  else {
    my @armorvals = split('\;', $fields[15]);
    print $out "  this.armorAs = 'none';\n";
    print $out "  this.armorDefense = $armorvals[0];\n";
    print $out "  this.armorAbsorb = $armorvals[1];\n";
    print $out "  this.armorResist = $armorvals[2];\n";
  }
  $fields[16] = uc($fields[16]);
  my @moves = split(',',$fields[16]);
  my $movetype = "";
  foreach my $move (@moves) {
    $move =~ s/ //g;
    if (!$movetype) { $movetype = "MOVE_$move"; }
    else { $movetype .= " + MOVE_$move"; }
  }
  print $out "  this.movetype = $movetype;\n";
  print $out "  this.leavesCorpse = '$fields[17]';\n";
  print $out "  this.lootTable = '$fields[18]';\n";
  if ($fields[19] =~ /^(an*) /) {
    print $out "  this.prefix = '$1';\n";
    $fields[19] =~ s/^an* //;
  }
  if ($fields[19] =~ /^(the) /) {
    print $out "  this.prefix = '$1';\n";
    $fields[19] =~ s/^the //;
  }
  my $desc = $fields[19];
  print $out "  this.desc = \"$desc\";\n";
  if ($fields[20]) {
    print $out "  this.onHit = '$fields[20]';\n";
  }
  if ($fields[21]) {
    print $out "  this.onDamaged = '$fields[21]';\n";
  }
  if ($fields[22]) {
    print $out "  this.initmult = $fields[22];\n";
  }
  if ($fields[23]) {
    print $out "  this.meleeChance = $fields[23];\n";
  }
  if ($fields[24] or $fields[25] or $fields[26] or $fields[27] or $fields[28] or $fields[29] or $fields[31] or $fields[32]) {
    print $out "  this.spellsknown = { ";
    print $out "heal: 1, " if $fields[24];
    print $out "lowcontrol: 1, " if $fields[25];
    print $out "highcontrol: 1, " if $fields[26];
    print $out "summon: 1, " if $fields[27];
    print $out "attack: 1, " if $fields[28];
    print $out "highattack: 1, " if $fields[29];
    print $out "banned: '$fields[30]', " if $fields[30];
    print $out "buff: 1, " if $fields[31];
    print $out "highbuff: 1, " if $fields[32];
    print $out "};\n";
  }
  if ($fields[33]) {
    print $out "  this.resists = { $fields[33] };\n";
  } else {
    print $out "  this.resists = {};\n";
  }
  if ($fields[34]) {
    print $out "  this.special = '$fields[34]';\n";
  }
  if ($fields[35]) {
    print $out "  this.meleeHitSound = '$fields[35]';\n";
  }
  if ($fields[36]) {
    print $out "  this.meleeAttackSound = '$fields[36]';\n";
  }
  if ($fields[37]) {
    print $out "  this.missileHitSound = '$fields[37]';\n";
  }
  if ($fields[38]) {
    print $out "  this.missileAttackSound = '$fields[38]';\n";
  }
  if ((defined $fields[39]) and ($fields[39] ne "")) {
    print $out "  this.xpval = $fields[39];\n";
  }
  if ($fields[40]) {
    print $out "  this.initOverride = $fields[40];\n";
  }
  if ($fields[41]) {
    # do this if I ever use this field
  }
  if ($fields[42]) {
    if ($fields[42] eq "M") {
      print $out "  this.gender = 'male';\n";
    } elsif ($fields[42] eq "F") {
      print $out "  this.gender = 'female';\n";
    } elsif ($fields[42] eq "O") {
      print $out "  this.gender = 'other';\n";
    } elsif ($fields[42] eq "R") {
      print $out "  this.gender = 'random';\n";
    }
  }
  if ($fields[45]) {
    # there is an animation override
    print $out "  this.graphic = 'static.png';\n";
    print $out "  this.spritexoffset = $fields[43] * 32;\n";
    print $out "  this.spriteyoffset = $fields[44] * 32;\n";

    print $out "\n  ManualAnimation.call(this, { \n";
    print $out "    animstart: $fields[43]*32,\n";
    print $out "    animlength: $fields[45],\n";
    if ($fields[46]) {
      print $out "    animstyle: \"$fields[46]\",\n";
    } else {
      print $out "    animstyle: \"random\",\n";
    }
    print $out "    allowrepeat: 0,\n";
    if ($fields[47]) {
      my @animminmax = split("-",$fields[47]);
      print $out "    framedurationmin: $animminmax[0],\n";
      print $out "    framedurationmax: $animminmax[1],\n";
    } else {
      print $out "    framedurationmin: 120,\n";
      print $out "    framedurationmax: 170,\n";
    }
    print $out "    startframe: \"random\"\n";
    print $out "  });\n";

  }
  print $out "}\n";
  if ($fields[48]) {
    print $out "$fields[0]" . "NPCTile.prototype = new NPCHumanObject();\n\n";
  } else {
    print $out "$fields[0]" . "NPCTile.prototype = new NPCObject();\n\n";
  }
}

close $npcdoc;

open (my $groupdoc, "<", "MOB Stats - Groups.tsv") or die "Can't open MOB Stats - Groups.tsv\n";
$firstline = 1;

foreach my $line (<$groupdoc>) {
  if ($firstline) { 
    $firstline = 0;
    next;
  }
  chomp $line;
  
  my @fields = split("\t",$line);
  
  print $out "function " . $fields[0] . "Tile() {\n";
  print $out "  this.name = '$fields[0]';\n";
  print $out "  this.desc = '$fields[1]';\n";
  print $out "  this.peaceAI = '$fields[2]';\n";
  if (!$fields[17]) {
    if ($fields[3] =~ /,/) {
      $fields[3] =~ s/ //g;
      my @graphics = split(',', $fields[3]);
      print $out "  this.graphic = '$graphics[0]';\n";
      shift @graphics;
      print $out "  this.altgraphic = [";
      while ($graphics[0]) {
        print $out "'$graphics[0]',";
        shift @graphics;
      }
      print $out "];\n";
    } else { print $out "  this.graphic = '$fields[3]';\n"; }
  }

  print $out "  this.group = [];\n";
  print $out "  this.group[0] = new NPCList('$fields[4]NPC', '$fields[5]');\n";
  if ($fields[6]) {
    print $out "  this.group[1] = new NPCList('$fields[6]NPC', '$fields[7]');\n";
  }
  if ($fields[8]) {
    print $out "  this.group[2] = new NPCList('$fields[8]NPC', '$fields[9]');\n";
  }
  if ($fields[10]) {
    print $out "  this.group[3] = new NPCList('$fields[10]NPC', '$fields[11]');\n";
  }
  $fields[12] = uc($fields[12]);
  print $out "  this.movetype = MOVE_$fields[12];\n";
  print $out "  this.attackword = '$fields[13]';\n";
  if ($fields[14]) { 
    print $out "  this.special = '$fields[14]';\n";
  }

  if ($fields[17]) {
    # there is an animation override
    print $out "  this.graphic = 'static.png';\n";
    print $out "  this.spritexoffset = $fields[15] * 32;\n";
    print $out "  this.spriteyoffset = $fields[16] * 32;\n";

    print $out "\n  ManualAnimation.call(this, { \n";
    print $out "    animstart: $fields[15]*32,\n";
    print $out "    animlength: $fields[17],\n";
    if ($fields[18]) {
      print $out "    animstyle: \"$fields[18]\",\n";
    } else {
      print $out "    animstyle: \"random\",\n";
    }
    print $out "    allowrepeat: 0,\n";
    if ($fields[19]) {
      my @animminmax = split("-",$fields[19]);
      print $out "    framedurationmin: $animminmax[0],\n";
      print $out "    framedurationmax: $animminmax[1],\n";
    } else {
      print $out "    framedurationmin: 150,\n";
      print $out "    framedurationmax: 300,\n";
    }
    print $out "    startframe: \"random\"\n";
    print $out "  });\n";

  }

  print $out "}\n";
  print $out "$fields[0]" . "Tile.prototype = new NPCGroupObject();\n\n";
}

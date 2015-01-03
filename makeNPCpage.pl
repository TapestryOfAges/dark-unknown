#!/usr/bin/perl

use strict;
use warnings;
use POSIX;

open (my $npcdoc, "<", "NPCdoc.txt") or die "Can't open NPCdoc.txt\n";
open (my $out, ">", "NPCcomp.html") or die "Can't open NPCcomp.html\n";

my $firstline = 1;
my $idx = 1;

print $out "<html><head><title>Dark Unknown NPC Values</title></head><body>\n<h1 style='text-align:center'>Dark Unknown NPC Values</h1>\n<table cellpadding='1' cellspacing='1' border='1'>\n";

foreach my $line (<$npcdoc>) {
  if ($firstline) {
    $firstline = 0;
    next;
  }
  chomp $line;
  my @fields = split("\t",$line);

  if ($idx == 1) { print $out "<tr>"; }
  
  print $out "<td><table cellpadding='1' cellspacing='1' border='0' width='100%'><tr><td>";
  my @graphics;
  if ($fields[12] =~ /,/) { @graphics = split(",", $fields[12]); }
  else { $graphics[0] = $fields[12]; }
  
  foreach my $graph (@graphics) {
    $graph =~ s/ *//g;
    print $out "<img src='graphics/$graph' /> ";
  }
  print $out "</td><td style='text-align:right'>";
  my $desc = $fields[19];
  $desc =~ s/^the //;
  $desc =~ s/^an* //;
  print $out "<span style='font-weight:bold;'>$desc</span> ($fields[0])</td></tr>\n";
  
  print $out "<tr><td>Lvl $fields[2] $fields[1]</td><td style='text-align:right'>S: $fields[4] D: $fields[5] I: $fields[6]</td></tr>\n";
  print $out "<tr><td>Combat AI: $fields[10]</td><td style='text-align:right'>";
  print $out "Init mult: $fields[22]" if ($fields[22]);
  print $out "</td></tr>\n";
  my $hp = 10*$fields[2] + $fields[3];
  print $out "<tr><td>HP: $hp</td><td style='text-align:right'>Alignment: $fields[7]</td></tr>\n";
  my $melee;
  if ($fields[13] =~ /Fists/i) {
    my $meleemin = ceil(1 + 1/3*($fields[4]-10));
    my $meleemax = ceil(2 + 1/3*($fields[4]-10));
    $melee = "$meleemin - $meleemax (1d2 + 1/3S)";
  }
  elsif ($fields[13] =~ /Dagger/i) {
    my $meleemin = ceil(2 + 1/3*($fields[4]-10));
    my $meleemax = ceil(5 + 1/3*($fields[4]-10));
    $melee = "$meleemin - $meleemax (1d4+1 + 1/3S)";
  }
  elsif ($fields[13] =~ /Shortsword/i) {
    my $meleemin = ceil(3 + 1/2*($fields[4]-10));
    my $meleemax = ceil(9 + 1/2*($fields[4]-10));
    $melee = "$meleemin - $meleemax (2d4+1 + 1/2S)";
  }
  elsif ($fields[13] =~ /Mace/i) {
    my $meleemin = ceil(5 + ($fields[4]-10));
    my $meleemax = ceil(11 + ($fields[4]-10));
    $melee = "$meleemin - $meleemax (2d4+3 + S)";
  }
  elsif ($fields[13] =~ /Axe/i) {
    my $meleemin = ceil(10 + 2/3*($fields[4]-10));
    my $meleemax = ceil(16 + 2/3*($fields[4]-10));
    $melee = "$meleemin - $meleemax (2d4+8 + 2/3S)";
  }
  elsif ($fields[13] =~ /Longsword/i) {
    my $meleemin = ceil(13 + 2/3*($fields[4]-10));
    my $meleemax = ceil(25 + 2/3*($fields[4]-10));
    $melee = "$meleemin - $meleemax (4d4+9 + 2/3S)";
  }
  elsif ($fields[13] =~ /Halberd/i) {
    my $meleemin = ceil(20 + ($fields[4]-10));
    my $meleemax = ceil(35 + ($fields[4]-10));
    $melee = "$meleemin - $meleemax (5d4+15 + S)";
  }
  elsif ($fields[13] =~ /MagicSword/i) {
    my $meleemin = ceil(27 + ($fields[4]-10));
    my $meleemax = ceil(72 + ($fields[4]-10));
    $melee = "$meleemin - $meleemax (5d10+22 + S)";
  }
  elsif ($fields[13] =~ /none/i) {
    $melee = "none";
  } else {
    print $out "HAS $fields[13]\n";
    my @wpnvals = split(';', $fields[13]);
    $wpnvals[0] =~ s/ //g;
    $wpnvals[1] =~ s/ //g;
    my $strmod;
    if ($wpnvals[1] =~ /\//) {
      my @tmp = split('/', $wpnvals[1]);
      $strmod = $tmp[0] / $tmp[1];
    } else {
      $strmod = $wpnvals[1];
    }
    
    my ($dienum, $rest) = split('d', $wpnvals[0]);
    my ($diesize, $plus) = split('\+', $rest);
    
    my $meleemin = ceil($dienum + $plus + $strmod*($fields[4]-10));
    my $meleemax = ceil($dienum*$diesize + $plus + $strmod*($fields[4]-10));
    $melee = "$meleemin - $meleemax ($dienum" . "d" . "$diesize" . "+" . "$plus + $wpnvals[1]" . "S)";
  }

  my $missile;
  if ($fields[14] =~ /Sling/i) {
    $missile = "1 - 3 (1d3)";
  }
  elsif ($fields[14] =~ /Crossbow/i) {
    $missile = "3 - 31 (4d8-1)";
  }
  elsif ($fields[14] =~ /Bow/i) {
    $missile = "1 - 12 (1d12)";
  }
  elsif ($fields[14] =~ /Wand/i) {
    $missile = "4 - 48 (4d12)";
  }
  elsif ($fields[14] =~ /MagicAxe/i) {
    $missile = "16 - 60 (4d12+12)";
  }
  elsif ($fields[14] =~ /Boulder/i) {
    my $missilemin = 5 + $fields[4] - 10;
    my $missilemax = 27 + $fields[4] - 10;
    $missile = "$missilemin - $missilemax (2d12+3 + S)";
  }
  elsif ($fields[14] =~ /none/i) {
    $missile = "none";
  } else {
    print $out "HAS $fields[14]\n";
    my @wpnvals = split(';', $fields[14]);
    $wpnvals[0] =~ s/ //g;
    $wpnvals[1] =~ s/ //g;
    $wpnvals[2] =~ s/ //g;
    my $strmod;
    if ($wpnvals[1] =~ /\//) {
      my @tmp = split('/', $wpnvals[1]);
      $strmod = $tmp[0] / $tmp[1];
    } else {
      $strmod = $wpnvals[1];
    }
    
    my ($dienum, $rest) = split('d', $wpnvals[0]);
    my ($diesize, $plus) = split('\+', $rest);
    
    my $missilemin = ceil($dienum + $plus + $strmod*($fields[4]-10));
    my $missilemax = ceil($dienum*$diesize + $plus + $strmod*($fields[4]-10));
    $missile = "$missilemin - $missilemax ($dienum" . "d" . "$diesize" . "+" . "$plus + $wpnvals[1]" . "S)";
  }
  print $out "<tr><td>Melee: $melee</td><td style='text-align:right'>Missile: $missile</td></tr>\n";

  my $armorvals;
  if ($fields[15] =~ /Cloth/i) {
    $armorvals = "5/10/0";
  }
  elsif ($fields[15] =~ /Leather/i) {
    $armorvals = "10/20/10";
  }
  elsif ($fields[15] =~ /Chain/i) {
    $armorvals = "20/33/10";
  }
  elsif ($fields[15] =~ /Plate/i) {
    $armorvals = "35/50/15";
  }
  elsif ($fields[15] =~ /Exotic/i) {
    $armorvals = "40/60/40";
  }
  else {
    $armorvals = $fields[15];
    $armorvals =~ s/;/\//g;
  }
  print $out "<tr><td>Armor: $armorvals</td><td style='text-align:right'>Move type: $fields[16]</td></tr>\n";
  print $out "<tr><td>Corpse type: $fields[17]</td><td style='text-align:right'>Lootgroup: $fields[18]</td></tr>\n";
  if ($fields[22]) { print $out "<tr><td colspan='2'>Initmult: $fields[22]</td></tr>\n"; }
  print $out "<tr><td colspan='2'>Melee %: $fields[23]</td></tr>\n"; 
  if ($fields[20]) { print $out "<tr><td colspan='2'>OnHit: $fields[20]</td></tr>\n"; }
  if ($fields[21]) { print $out "<tr><td colspan='2'>OnDamaged: $fields[21]</td></tr>\n"; }
  
  if ($fields[24] or $fields[25] or $fields[26] or $fields[27]) {
    my $spells = "";
    $spells = "heal, " if ($fields[24]);
    $spells .= "control, " if ($fields[25]);
    $spells .= "attack, " if ($fields[26]);
    $spells .= "buff" if ($fields[27]);
    $spells =~ s/, $//;
    print $out "<tr><td colspan='2'>Spells known: $spells</td></tr>\n";
  }
  
  if ($fields[28]) {
    print $out "<tr><td colspan='2'>Resists: $fields[28]</td></tr>\n";
  }
  if ($fields[29]) {
    print $out "<tr><td colspan='2'>Specials: $fields[29]</td></tr>\n";
  }
  
  print $out "</table></td>";
  if ($idx == 3) { 
    print $out "</tr>\n";
    $idx = 1;
  } else {$idx++}
   
}

if ($idx != 3) { print $out "</tr>"; }
print $out "</table>"; 

print $out "<h3>Some definitions</h3>\n<p><b>Damage</b>: Bonus damage from strength actually uses Strength-10 for its calculation.<br />\n";
print $out "<b>Armor</b>: Values are Defense/Aborb/Resist. Defense improves your chance to not be hit at all; Absorb reduces incoming physical damage by that percentage, and resist is magic resistance, the effect of which varies by spell.<br />\n";
print $out "<b>stealgold</b>: When this monster hits you it has a chance to steal some of your gold.<br />\n";
print $out "<b>venom</b>: Has a chance to poison when it hits you.<br />\n";
print $out "<b>knockback</b>: Boulders have a chance to knock their target back one square.<br />\n";
print $out "<b>entangle</b>: On a successful hit, this beast can grab you with a tentacle, preventing you from moving.<br />\n";
print $out "<b>paralyze</b>: Can paralyze a foe with its touch.<br />\n";
print $out "<b>slow</b>: Similar to some ice-based spells, can cause you to move more slowly if it hits you.<br />\n";
print $out "<b>stun</b>: Chance to make what it hits lose its next turn.<br />\n";
print $out "<b>manaclash</b>: I have no idea what this was going to be. I need to figure this out.<br />\n";
print $out "<b>split</b>: When struck, this has a chance of splitting into two creatures.<br />\n";
print $out "<b>incorporeal</b>: These ghostly foes have a chance of negating any physical hit on them.<br />\n";
print $out "<b>acidblood</b>: When struck by a nonmagical weapon, they have a chance of damaging the weapon.<br />\n";
print $out "<b>shock</b>: Can electrocute anyone who hits it.<br />\n";
print $out "<b>sing</b>: Bardic types can duplicate the effect of some buff spells with music.<br />\n";
print $out "<b>whirlpool</b>: If enough Flukes surround someone they can generate a strong whirlpool to harm their foe.<br />\n";
print $out "<b>hides</b>: Appears as the specified graphic until it attacks.<br />\n";
print $out "<b>animalhandler</b>: Accompanied by animals that it buffs and possibly summons.<br />\n";
print $out "<b>spitter</b>: Spits poison at range.<br />\n";
print $out "<b>lbolt</b>: Can shoot lightning bolts, even if not otherwise a caster.<br />\n";
print $out "<b>firebreath</b>: Breathes fire.<br />\n";
print $out "<b>flamearmor</b>: Has a continual version of the Flame Armor spell, causing fire damage to anyone who hits it.<br />\n";
print $out "<b>invisible</b>: Is invisible until it attacks.<br />\n";
print $out "<b>trueinvisible</b>: Is invisible even after it attacks.<br />\n";
print $out "<b>reach</b>: Can melee attack one extra tile away.<br />\n";
print $out "<b>sleep</b>: Can try to put foes to sleep at range.<br />\n";
print $out "<b>ondeathinsects</b>: When it dies, a swarm of insects bursts forth from inside.<br />\n";
print $out "<b>multiattack</b>: Can take more than one melee attack on each turn (usually from multiple heads).<br />\n";
print $out "<b>magmaspit</b>: Spits lava, which sticks around for a few rounds as a battlefield hazard.<br />\n";
print $out "<b>magmaheal</b>: Heals if it spends time in lava.<br />\n";
print $out "<b>teleport</b>: Has an innate teleport ability.<br />\n";
print $out "<b>energybolt</b>: Can project bolts of force, which is not a magic spell.<br />\n";
print $out "<b>icebreath</b>: Similar to fire breath. Less damage but chance of slow.<br />\n";
print $out "<b>phase</b>: Can turn itself invisible temporarily.<br />\n";
print $out "<b>createundead</b>: Can summon low level undead, such as skeletons and ghosts.<br />\n";
print $out "<b>summonearthelemental</b>: Can summon an earth elemental once.<br />\n";

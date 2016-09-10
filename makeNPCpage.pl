#!/usr/bin/perl

use strict;
use warnings;
use POSIX;
use Data::Dumper;

open (my $npcdoc, "<", "DU NPCs - Monsters.tsv") or die "Can't open DU NPCs - Monsters.tsv\n";
open (my $groupdoc, "<", "DU NPCs - Groups.tsv") or die "Can't open DU NPCs - Groups.tsv\n";
open (my $out, ">", "NPCcomp.html") or die "Can't open NPCcomp.html\n";
open (my $out2, ">", "NPCcheck.html") or die "Can't open NPCcheck.html\n";
open (my $spawns, "<", "maps/main_map.js") or die "Can't open main_map.js\n";

my $firstline = 1;
my $idx = 1;

my @spawners; 
# Contains zone, leash, and array of spawns by level

my $inspawns = 0;
my $evolvetype = "";

foreach my $line (<$spawns>) {
  if ($line =~ /function Placespawns/) { $inspawns = 1; }
  if ($line =~ /function CreateNetwork/) { $inspawns = 0; }
  if (!$inspawns) { next; }
  
  if ($line =~ /Zone: (.+)$/i) {
    $spawners[$#spawners+1] = { zone => $1 };
    next;
  }
  
  if ($line =~ /group =\s*\[(.+)\]/) {
    my $tmpgrp = $1;
    $tmpgrp =~ s/\"//g;
    my @groups = split(",",$tmpgrp);
    $spawners[$#spawners]{'spawns'} = [];
    $spawners[$#spawners]{'spawns'}[1] = {};
    foreach my $grp (@groups) {
      $spawners[$#spawners]{'spawns'}[1]{$grp} = 1;
    }
    next;
  }
  
  if ($line =~ /SpawnLeash\((.+)\)/) {
    $spawners[$#spawners]{'leash'} = [];
    $spawners[$#spawners]{'leash'}[1] =$1;
    next;
  }
  
  if ($line =~ /evolve\[(\d)\]\[[024]\]\s*=\s*\"(.+)\"/) {
    $evolvetype = $2;
    next;
  }
  
  if ($line =~ /evolve\[(\d)\]\[[135]\]\s*=\s*\"*(.+)\"*/) {
    if ($evolvetype eq "spawnLeash") {
      my $lsh = $2;
      #$lsh =~ s/;//g;
      my $idx = int($1);
      $spawners[$#spawners]{'leash'}[$idx] = $2;
      $spawners[$#spawners]{'leash'}[$idx] =~ s/\;//g;
    } elsif ($evolvetype eq "spawngroup") {
      my $idx = int($1);
      my $tmpgrp = $2;
      $tmpgrp =~ s/\"//g;
      $tmpgrp =~ s/\[//g;
      $tmpgrp =~ s/\]//g;
      $tmpgrp =~ s/ //g;
      $tmpgrp =~ s/;//g;
      my @groups = split(",",$tmpgrp);
      $spawners[$#spawners]{'spawns'}[$idx] = {};
      foreach my $grp (@groups) {
        $spawners[$#spawners]{'spawns'}[$idx]{$grp} = 1;
      }
      
    }
    next;
  }

}

#print STDERR Dumper(@spawners);

my %groupdata;

foreach my $line (<$groupdoc>) {
  chomp $line;
  my @fields = split("\t",$line);
  if ($fields[0] =~ /Group Name/) { next; }
  
  my $name = $fields[0];
  $groupdata{$name} = [ $fields[4],$fields[6],$fields[8],$fields[10] ];
  
}

#print STDERR Dumper(%groupdata);

foreach my $spn (@spawners) {
  $spn->{'names'} = [];
  for (my $i=1;$i<=8;$i++) {
    if (!exists $spn->{'leash'}[$i]) { $spn->{'leash'}[$i] = $spn->{'leash'}[$i-1]; }
    if (!exists $spn->{'spawns'}[$i]) { $spn->{'spawns'}[$i] = $spn->{'spawns'}[$i-1]; }
    
    $spn->{'names'}[$i] = [];
    foreach my $key (keys %{$spn->{'spawns'}[$i]}) {
      push @{$spn->{'names'}[$i]}, @{$groupdata{$key}};
    }
  }
}

print STDERR Dumper(@spawners);


my @checkout;

print $out "<html><head><title>Dark Unknown NPC Values</title></head><body>\n<h1 style='text-align:center'>Dark Unknown NPC Values</h1>\n<table cellpadding='1' cellspacing='1' border='1'>\n";

print $out2 "<html><head><title>Dark Unknown NPC comparison</title></head><body>\n<h1 style='text-align:center'>Dark Unknown NPC Check</h1>\n<table cellpadding='1' cellspacing='1' border='1'>\n";

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
  print $out "<tr><td>AI: $fields[9] (Forget: $fields[10])</td><td style='text-align:right'>";
  print $out "Init mult: $fields[22]" if ($fields[22]);
  print $out "</td></tr>\n";
  my $hp = 10*$fields[2] + $fields[3];
  print $out "<tr><td>HP: $hp</td><td style='text-align:right'>Alignment: $fields[7]</td></tr>\n";
  my $melee;
  my $meleemin;
  my $meleemax;
  if ($fields[13] =~ /Fists/i) {
    $meleemin = ceil(1 + 1/3*($fields[4]-10));
    $meleemax = ceil(2 + 1/3*($fields[4]-10));
    $melee = "$meleemin - $meleemax (1d2 + 1/3S)";
  }
  elsif ($fields[13] =~ /Dagger/i) {
    $meleemin = ceil(2 + 1/3*($fields[4]-10));
    $meleemax = ceil(5 + 1/3*($fields[4]-10));
    $melee = "$meleemin - $meleemax (1d4+1 + 1/3S)";
  }
  elsif ($fields[13] =~ /Shortsword/i) {
    $meleemin = ceil(3 + 1/2*($fields[4]-10));
    $meleemax = ceil(9 + 1/2*($fields[4]-10));
    $melee = "$meleemin - $meleemax (2d4+1 + 1/2S)";
  }
  elsif ($fields[13] =~ /Mace/i) {
    $meleemin = ceil(5 + ($fields[4]-10));
    $meleemax = ceil(11 + ($fields[4]-10));
    $melee = "$meleemin - $meleemax (2d4+3 + S)";
  }
  elsif ($fields[13] =~ /Axe/i) {
    $meleemin = ceil(10 + 2/3*($fields[4]-10));
    $meleemax = ceil(16 + 2/3*($fields[4]-10));
    $melee = "$meleemin - $meleemax (2d4+8 + 2/3S)";
  }
  elsif ($fields[13] =~ /Longsword/i) {
    $meleemin = ceil(13 + 2/3*($fields[4]-10));
    $meleemax = ceil(25 + 2/3*($fields[4]-10));
    $melee = "$meleemin - $meleemax (4d4+9 + 2/3S)";
  }
  elsif ($fields[13] =~ /Halberd/i) {
    $meleemin = ceil(20 + ($fields[4]-10));
    $meleemax = ceil(35 + ($fields[4]-10));
    $melee = "$meleemin - $meleemax (5d4+15 + S)";
  }
  elsif ($fields[13] =~ /MagicSword/i) {
    $meleemin = ceil(27 + ($fields[4]-10));
    $meleemax = ceil(72 + ($fields[4]-10));
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
  my $missilemin;
  my $missilemax;
  if ($fields[14] =~ /Sling/i) {
    $missile = "1 - 3 (1d3)";
    $missilemin = 1;
    $missilemax = 3;
  }
  elsif ($fields[14] =~ /Crossbow/i) {
    $missile = "3 - 31 (4d8-1)";
    $missilemin = 3;
    $missilemax = 31;
  }
  elsif ($fields[14] =~ /Bow/i) {
    $missile = "2 - 13 (1d12+1)";
    $missilemin = 2;
    $missilemax = 13;

  }
  elsif ($fields[14] =~ /Wand/i) {
    $missile = "4 - 48 (4d12)";
    $missilemin = 4;
    $missilemax = 48;

  }
  elsif ($fields[14] =~ /MagicAxe/i) {
    $missile = "16 - 60 (4d12+12)";
    $missilemin = 16;
    $missilemax = 60;

  }
  elsif ($fields[14] =~ /Boulder/i) {
    $missilemin = 5 + $fields[4] - 10;
    $missilemax = 27 + $fields[4] - 10;
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
  print $out "<tr><td>Melee %: $fields[23]</td><td style='text-align:right'>Withdraw %: $fields[11]</td></tr>\n"; 
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
   
   
  # Check section
  
  for (my $i=1;$i<=8;$i++) {
    my $class = "";
    my $leash = "";
    foreach my $spn (@spawners) {
      if ($fields[0] ~~ $spn->{'names'}[$i]) {
        $class = " style='background-color:green'";
        if ($spn->{'zone'} eq "REMOTE") { $class = " style='background-color:blue'"; }
        if ($spn->{'leash'}[$i]) { $leash = "[] "; }
      }
    }
    $checkout[$i] = "<tr" . $class . "><td>$leash";
  }
  
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
print $out "<b>stealfood</b>: Announces that it has stolen some food. Since food is not tracked, this is not actually a problem in and of itself.<br />\n";
print $out "<b>breedsexplosively</b>: Each turn there is a chance that it spawns a new one... but only if it or the gremlin it spawned from has stolen food.<br />\n";
print $out "<b>dies</b>: The creature is an illusion, and is dispelled if it takes damage.<br />\n";
print $out "<b>quick</b>: Has the Quickness spell applied to it.<br />\n";
print $out "<b>undead</b>: The creature is undead. Immune to poison.<br />\n";
print $out "<b>construct</b>: The creature is a mindless construct. Cannot be Jinxed or Charmed.<br />\n";
print $out "<b>coward</b>: Will always run in aggroed.<br />\n";
print $out "<b>nopeer</b>: Does not appear in the view of a Peer spell.<br />\n";
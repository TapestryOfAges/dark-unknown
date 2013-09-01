#!/usr/bin/perl

use strict;
use warnings;

open (my $npcdoc, "<", "NPCdoc.txt") or die "Can't open NPCdoc.txt\n";

my $firstline = 1;

foreach my $line (<$npcdoc>) {
  if ($firstline) {
    $firstline = 0;
    next;
  }
  chomp $line;
  my @fields = split("\t",$line);
  
  print "\n// $fields[1]\n\n";
  print "function " . $fields[0] . "NPCTile() {\n";
  print "  this.name = '$fields[0]NPC';\n";
  print "  this.level = '$fields[2]';\n";
  print "  this.addhp = '$fields[3]';\n";
  print "  this.str = '$fields[4]';\n";
  print "  this.dex = '$fields[5]';\n";
  print "  this.int = '$fields[6]';\n";
  print "  this.alignment = '$fields[7]';\n";
  print "  this.attitude = '$fields[8]';\n";
  print "  this.peaceAI = '$fields[9]';\n";
  print "  this.threatenedAI = '$fields[10]';\n";
  print "  this.PCThreatAI = '$fields[11]';\n";
  if ($fields[12] =~ /,/) {
    $fields[12] =~ s/ //g;
    $fields[12] =~ /(.{7}),(.{7})/;
    $fields[12] = "PickOne([\"$1\",\"$2\"]);\n";
    print "  this.graphic = $fields[12]";
  } else { print "  this.graphic = '$fields[12]';\n"; }
  print "  this.meleeAttackAs = '$fields[13]';\n";
  print "  this.missileAttackAs = '$fields[14]';\n";
  if (!($fields[15] =~ /\;/)) { print "  this.armorAs = '$fields[15]Armor';\n"; }
  else {
    my @armorvals = split('\;', $fields[15]);
    print "  this.armorAs = 'none';\n";
    print "  this.armorDefense = '$armorvals[0]';\n";
    print "  this.armorAbsorb = '$armorvals[1]';\n";
    print "  this.armorResist = '$armorvals[2]';\n";
  }
  $fields[16] = uc($fields[16]);
  print "  this.movetype = MOVE_$fields[16];\n";
  print "  this.leavesCorpse = '$fields[17]';\n";
  print "  this.lootTable = '$fields[18]';\n";
  if ($fields[19] =~ /^(an*) /) {
    print "  this.prefix = '$1';\n";
    $fields[19] =~ s/^an* //;
  }
  print "  this.desc = '$fields[19]';\n";
  if ($fields[20]) {
    print "  this.onHit = '$fields[20]';\n";
  }
  if ($fields[21]) {
    print "  this.onDamaged = '$fields[21]';\n";
  }
  print "}\n";
  print "$fields[0]" . "NPCTile.prototype = new NPCObject;\n\n";
}

close $npcdoc;

open (my $groupdoc, "<", "Groupdoc.txt") or die "Can't open Groupdoc.txt\n";
$firstline = 1;

foreach my $line (<$groupdoc>) {
  if ($firstline) { 
    $firstline = 0;
    next;
  }
  chomp $line;
  
  my @fields = split("\t",$line);
  
  print "function " . $fields[0] . "Tile() {\n";
  print "  this.name = '$fields[0]';\n";
  print "  this.desc = '$fields[1]';\n";
  print "  this.peaceAI = '$fields[2]';\n";
  if ($fields[3] =~ /,/) {
    $fields[3] =~ s/ //g;
    $fields[3] =~ /(.{7}),(.{7})/;
    $fields[3] = "PickOne([\"$1\",\"$2\"]);\n";
    print "  this.graphic = $fields[3]";
  } else { print "  this.graphic = '$fields[3]';\n"; }
  print "  this.group = new Array;\n";
  print "  this.group[0] = new NPCList('$fields[4]NPC', '$fields[5]');\n";
  if ($fields[6]) {
    print "  this.group[1] = new NPCList('$fields[6]NPC', '$fields[7]');\n";
  }
  if ($fields[8]) {
    print "  this.group[2] = new NPCList('$fields[8]NPC', '$fields[9]');\n";
  }
  print "  this.movetype = '$fields[10]';\n";
  print "}\n";
  print "$fields[0]" . "Tile.prototype = new NPCGroupObject;\n\n";
}

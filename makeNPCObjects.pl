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
  
  print "\n# $fields[1]\n\n";
  print "function " . $fields[0] . "NPCTile() {\n";
  print "  this.name = '$fields[0]NPC';\n";
  print "  this.level = '$fields[2]';\n";
  print "  this.addhp = '$fields[3]';\n";
  print "  this.str = '$fields[4]';\n";
  print "  this.dex = '$fields[5]';\n";
  print "  this.int = '$fields[6]';\n";
  print "  this.align = '$fields[7]';\n";
  print "  this.attitude = '$fields[8]';\n";
  print "  this.peaceAI = '$fields[9]';\n";
  print "  this.threatenedAI = '$fields[10]';\n";
  print "  this.PCthreatenedAI = '$fields[11]';\n";
  if ($fields[12] =~ /,/) {
    $fields[12] =~ s/ //g;
    $fields[12] =~ /(.{7}),(.{7})/;
    $fields[12] = "PickOne([\"$1\",\"$2\"]);\n";
    print "  this.graphic = $fields[12]";
  } else { print "  this.graphic = '$fields[12]';\n"; }
  print "  this.meleeAttackAs = '$fields[13]';\n";
  print "  this.missileAttackAs = '$fields[14]';\n";
  $fields[15] = uc($fields[15]);
  print "  this.movetype = 'MOVE_$fields[15]';\n";
  print "  this.leavesCorpse = '$fields[16]';\n";
  print "  this.lootTable = '$fields[17]';\n";
  if ($fields[18] =~ /^(an*) /) {
    print "  this.prefix = '$1';\n";
    $fields[18] =~ s/^an* //;
  }
  print "  this.desc = '$fields[18]';\n";
  if ($fields[19]) {
    print "  this.onHit = '$fields[19]';\n";
  }
  if ($fields[20]) {
    print "  this.onDamaged = '$fields[20]';\n";
  }
  print "}\n\n";
}


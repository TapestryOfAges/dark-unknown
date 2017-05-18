#!/usr/bin/perl

use strict;
use warnings;

open (my $fh, "<", "MOB stats - Loot.tsv") or die "can't open loot\n";

my %loots;
my %groups;

my $thisloot;
my $thisgroup;

foreach my $line (<$fh>) {
  chomp $line;
  my @cols;
  @cols = split('\t', $line);
  
  # handle loot side
  if ($cols[0]) {
    if (!$cols[1]) {
      $thisloot = $cols[0];
    } else {
      $loots{$thisloot}{$cols[0]}{"val"} = $cols[1];
      $loots{$thisloot}{$cols[0]}{"perc"} = $cols[2];
    }
  }
  
  # handle groups side
  if ($cols[4]) {
    if (!$cols[5]) {
      $thisgroup = $cols[4];
    } else {
      $groups{$thisgroup}{$cols[4]}{"val"} = $cols[5];
    }
  }
}

close $fh;

open (my $outfile, ">", "lootset.js") or die "can't open outfile lootset\n";

print $outfile '"use strict";';
print $outfile "\n\nfunction SetLoots() {\n  var loots = {};\n\n";
foreach my $key (keys %loots) {
  print $outfile "  loots['$key'] = new LootTable();\n";
  if ($loots{$key}{'Gold'}{'val'}) {
    print $outfile "  loots['$key'].goldDice = '$loots{$key}{'Gold'}{'val'}';\n";
    $loots{$key}{'Gold'}{'perc'} =~ s/%//;
    print $outfile "  loots['$key'].goldChance = $loots{$key}{'Gold'}{'perc'};\n";
  }
  my $idx = 0;
  foreach my $thing (keys %{$loots{$key}}) {
    if (($thing eq "Gold") or ($thing eq "Trap")) { next; }
    print $outfile "  loots['$key'].loot[$idx] = {};\n";
    print $outfile "  loots['$key'].loot[$idx].objname = '$thing';\n";
    print $outfile "  loots['$key'].loot[$idx].quantity = '$loots{$key}{$thing}{'val'}';\n";
    $loots{$key}{$thing}{'perc'} =~ s/%//;
    print $outfile "  loots['$key'].loot[$idx].chance = $loots{$key}{$thing}{'perc'};\n";
    $idx++;
  }
  if ($loots{$key}{"Trap"}) {
    print $outfile "  loots['$key'].trap = '$loots{$key}{'Trap'}{'val'}';\n";
  }
  print $outfile "\n";
}

print $outfile "  return loots;\n}\n\n";

print $outfile "function SetLootGroups() {\n  var DULootGroup = new LootGroups();\n\n";
foreach my $key (keys %groups) {
  print $outfile "  DULootGroup.setTreasureType('$key',\n  [\n";
  foreach my $thing (keys %{$groups{$key}}) {
    print $outfile "    '$thing', $groups{$key}{$thing}{'val'},\n";
  }
  print $outfile "  ]);\n\n";
}
print $outfile "  return DULootGroup;\n}\n";

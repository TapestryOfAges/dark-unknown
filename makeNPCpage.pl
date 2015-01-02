#!/usr/bin/perl

use strict;
use warnings;
use POSIX;

open (my $npcdoc, "<", "NPCdoc.txt") or die "Can't open NPCdoc.txt\n";
open (my $out, ">", "NPCcomp.html") or die "Can't open NPCcomp.html\n";

my $firstline = 1;
my $idx = 1;

print $out "<table cellpadding='1' cellspacing='1' border='1'>\n";

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
  
  print $out "<tr><td>Lvl: $fields[2] $fields[1]</td><td style='text-align:right'>S: $fields[4] D: $fields[5] I: $fields[6]</td></tr>\n";
  print $out "<tr><td>Combat AI: $fields[10]</td><td style='text-align:right'>";
  print $out "Init mult: $fields[22]" if ($fields[22]);
  print $out "</td></tr>\n";
  my $hp = 10*$fields[2] + $fields[3];
  print $out "<tr><td>HP: $hp</td><td style='text-align:right'>Loot table: $fields[17]</td></tr>\n";
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
  
  
  
  print $out "</table></td>";
  if ($idx == 3) { 
    print $out "</tr>\n";
    $idx = 1;
  } else {$idx++}
   
}

if ($idx != 3) { print $out "</tr>"; }
print $out "</table>"; 


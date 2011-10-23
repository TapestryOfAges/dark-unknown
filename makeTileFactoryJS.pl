#!/usr/bin/perl

use strict;
use warnings;

open GAMEOBJS, "gameObjects.js" or die "can't open gameObjects\n";

print "function tileFactory() {\n\n}\n\n// terrain factories:\n";
print "tileFactory.prototype.createTile = function(tileName) {\n\n\n  var thingy = \"make\"+tileName+\"Tile\";\n  return this[thingy]();\n}\n\n";


foreach my $line (<GAMEOBJS>) {
  if ($line =~ /function (.*)Tile\(\)/) {
    print "tileFactory.prototype.make" . $1 . "Tile = function() {\n  var newTile = new ". $1 . "Tile();\n  return newTile;\n}\n\n";
  }
}

open NPCOBJS, "npcObjects.js" or die "can't open npcObjects\n";

foreach my $line (<NPCOBJS>) {
  if ($line =~ /function (.*)Tile\(\)/) {
    print "tileFactory.prototype.make" . $1 . "Tile = function() {\n  var newTile = new ". $1 . "Tile();\n  return newTile;\n}\n\n";
  }
}

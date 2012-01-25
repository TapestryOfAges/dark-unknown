#!/usr/bin/perl

use strict;
use warnings;

open GAMEOBJS, "gameObjects.js" or die "can't open gameObjects\n";

print "function tileFactory() {\n\n}\n\n// terrain factories:\n";
print "tileFactory.prototype.createTile = function(tileName) {\n\n\n  var thingy = \"make\"+tileName+\"Tile\";\n    var newthing = this[thingy]();\n  newthing.assignSerial();\n  return newthing;\n}\n\n";


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

print "tileFactory.prototype.makeEraserTile = function() {\n  var newTile = new BlankWhiteTile();\n  newTile.name = 'Eraser';\n  newTile.type = 'feature';\n  return newTile;\n}\n\n";
print "tileFactory.prototype.makeLockedDoorWindowTile = function() {\n  var newTile = this.createTile('DoorWindow');\n  newTile.lockMe(1);\n  return newTile;\n}\n\n";
print "tileFactory.prototype.makeMagicLockedDoorWindowTile = function() {\n  var newTile = this.createTile('DoorWindow');\n  newTile.lockMe(2);    // Magic Lock\n  return newTile;\n}\n\n";
print "tileFactory.prototype.makeLockedDoorTile = function() {\n  var newTile = this.createTile('Door');\n  newTile.lockMe(1);\n  return newTile;\n}\n\n";
print "tileFactory.prototype.makeMagicLockedDoorTile = function() {\n  var newTile = this.createTile('Door');\n  newTile.lockMe(2);    // Magic Lock\n  return newTile;\n}\n\n";
print "tileFactory.prototype.makeLockedStonePortcullisTile = function() {\n  var newTile = this.createTile('StonePortcullis');\n  newTile.lockMe(1);\n  return newTile;\n}\n\n";

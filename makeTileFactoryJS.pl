#!/usr/bin/perl

use strict;
use warnings;

open GAMEOBJS, "gameObjects.js" or die "can't open gameObjects\n";

open (my $output, ">", "tileFactory.js") or die "Can't open output tileFactory\n";

print $output "function tileFactory() {\n\n}\n\n// terrain factories:\n";
print $output "tileFactory.prototype.createTile = function(tileName) {\n\n\n  var thingy = \"make\"+tileName+\"Tile\";\n";
print $output "  if (this[thingy] && (typeof this[thingy] == \"function\")) {\n";
print $output "    var newthing = this[thingy]();\n";
print $output "    newthing.assignSerial();\n";
print $output "    return newthing;\n";
print $output "  } else {\n";
print $output "    alert(tileName + \" is not a thing.\");\n";
print $output "  }\n}\n\n";


foreach my $line (<GAMEOBJS>) {
  if ($line =~ /function (.*)Tile\(\)/) {
    print $output "tileFactory.prototype.make" . $1 . "Tile = function() {\n  var newTile = new ". $1 . "Tile();\n  return newTile;\n}\n\n";
  }
}

open NPCOBJS, "npcObjects.js" or die "can't open npcObjects\n";

foreach my $line (<NPCOBJS>) {
  if ($line =~ /function (.*)Tile\(\)/) {
    print $output "tileFactory.prototype.make" . $1 . "Tile = function() {\n  var newTile = new ". $1 . "Tile();\n  return newTile;\n}\n\n";
  }
}

open EOBJS, "ephemeralObjects.js" or die "can't open ephemeralObjects\n";

foreach my $line (<EOBJS>) {
  if ($line =~ /function (.*)Tile\(\)/) {
    print $output "tileFactory.prototype.make" . $1 . "Tile = function() {\n  var newTile = new ". $1 . "Tile();\n  return newTile;\n}\n\n";
  }
}

print $output "tileFactory.prototype.makeEraserTile = function() {\n  var newTile = new BlankWhiteTile();\n  newTile.name = 'Eraser';\n  newTile.type = 'feature';\n  return newTile;\n}\n\n";
print $output "tileFactory.prototype.makeLockedDoorWindowTile = function() {\n  var newTile = this.createTile('DoorWindow');\n  newTile.lockMe(1);\n  return newTile;\n}\n\n";
print $output "tileFactory.prototype.makeMagicLockedDoorWindowTile = function() {\n  var newTile = this.createTile('DoorWindow');\n  newTile.lockMe(2);    // Magic Lock\n  return newTile;\n}\n\n";
print $output "tileFactory.prototype.makeLockedDoorTile = function() {\n  var newTile = this.createTile('Door');\n  newTile.lockMe(1);\n  return newTile;\n}\n\n";
print $output "tileFactory.prototype.makeMagicLockedDoorTile = function() {\n  var newTile = this.createTile('Door');\n  newTile.lockMe(2);    // Magic Lock\n  return newTile;\n}\n\n";
print $output "tileFactory.prototype.makeLockedStonePortcullisTile = function() {\n  var newTile = this.createTile('StonePortcullis');\n  newTile.lockMe(1);\n  return newTile;\n}\n\n";
print $output "tileFactory.prototype.makeLockedWallPortcullisTile = function() {\n  var newTile = this.createTile('WallPortcullis');\n  newTile.lockMe(1);\n  return newTile;\n}\n\n";
print $output "tileFactory.prototype.makePCTile = function() {\n  var newTile = new PCObject();\n  return newTile;\n}\n\n";


use strict;
use warnings;

open GAMEOBJECTS, "gameObjects.js" or die "Can't open gameObjects\n";

my @gameobjects = <GAMEOBJECTS>;

my $prevline;
my %allobjs;
my $inobj = 0;
my $currentobj = "";

foreach my $line (@gameobjects) {
	
	if ($inobj) {
	  
	}
	else {
	  if ($line =~ /function (\w+Object)\(/) {
	    // Virtual Object
	    $inobj = 1;
	    $currentobj = $1;
	    
	  }
	  elsif ($line =~ /function \w+Tile\(/) {
	    // Actual Object
	    $inobj = 1;
	    $currentobj = $1;
	    
	  }
	}
	
}
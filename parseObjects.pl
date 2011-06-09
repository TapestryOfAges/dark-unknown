
use strict;

open GAMEOBJECTS, "gameObjects.js" or die "Can't open gameObjects\n";

my @gameobjects = <GAMEOBJECTS>;

my $prevline;
my %allobjs;
my $inobj = 0;
my $currentobj = "";

foreach my $line (@gameobjects) {
	if ($line =~ /^\/\//) { next; }
	if ($inobj) {
	  if ($line =~ /$currentobj\.prototype \=\s+new (\w+)\;/) {
	  	# finished with properties, now we know what we inherit from
	  	$allobjs{$currentobj}{"inheritfrom"} = $1;
	  	$inobj = 0;
	  	print STDERR "$currentobj inherits from $1\n";
	  	next;
	  }
	  if ($line =~ /this\.name\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"name"}= $1;
	    print STDERR "$currentobj name: $1\n";
	  }
	  if ($line =~ /this\.graphic\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"graphic"}= $1;
	    print STDERR "$currentobj graphic: $1\n";
	  }
    if ($line =~ /this\.overlay\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"overlay"}= $1;
	    print STDERR "$currentobj overlay $1\n";
	  }
    if ($line =~ /this\.spritexoffset\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"spritexoffset"}= $1;
	    print STDERR "$currentobj spritexoffset $1\n";
	  }
    if ($line =~ /this\.spriteyoffset\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"spriteyoffset"}= $1;
	    print STDERR "$currentobj spriteyoffset $1\n";
	  }
    if ($line =~ /this\.desc\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"desc"}= $1;
	    print STDERR "$currentobj desc $1\n";
	  }
    if ($line =~ /this\.prefix\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"prefix"}= $1;
	    print STDERR "$currentobj prefix $1\n";
	  }
    if ($line =~ /this\.blocklos\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"blocklos"}= $1;
	    print STDERR "$currentobj blocklos $1\n";
	  }
    if ($line =~ /this\.passable\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"passable"}= $1;
	    print STDERR "$currentobj passable $1\n";
	  }
    if ($line =~ /this\.losupclose\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"losupclose"}= $1;
	    print STDERR "$currentobj losupclose $1\n";
	  }
    if ($line =~ /this\.initdelay\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"initdelay"}= $1;
	    print STDERR "$currentobj initdelay $1\n";
	  }
	  if ($line =~ /LightEmitting\.call\(this\s*,\s*(\d+)\);/) {
	    $allobjs{$currentobj}{"lightemitting"} = $1;
	    print STDERR "$currentobj lightemitting $1\n";
	  }
	  if ($line =~ /Enterable\.call\(/) {
	    $allobjs{$currentobj}{"enterable"} = 1;
	    print STDERR "$currentobj enterable\n";
	  }
    if ($line =~ /this\.invisible\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"invisible"}= $1;
	    print STDERR "$currentobj invisible $1\n";
	  } 
    if ($line =~ /this\.defense\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"defense"}= $1;
	    print STDERR "$currentobj defense $1\n";
	  }
    if ($line =~ /this\.absorb\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"absorb"}= $1;
	    print STDERR "$currentobj absorb $1\n";
	  }
    if ($line =~ /this\.resist\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"resist"}= $1;
	    print STDERR "$currentobj resist $1\n";
	  }
    if ($line =~ /this\.strReq\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"strReq"}= $1;
	    print STDERR "$currentobj strReq $1\n";
	  }
    if ($line =~ /this\.hit\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"hit"}= $1;
	    print STDERR "$currentobj hit $1\n";
	  }
    if ($line =~ /this\.reduceArmor\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"reduceArmor"}= $1;
	    print STDERR "$currentobj reduceArmor $1\n";
	  }
    if ($line =~ /this\.damage\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"damage"}= $1;
	    print STDERR "$currentobj damage $1\n";
	  }
    if ($line =~ /this\.strdamage\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"strdamage"}= $1;
	    print STDERR "$currentobj strdamage $1\n";
	  }
    if ($line =~ /this\.dexReq\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"dexReq"}= $1;
	    print STDERR "$currentobj dexReq $1\n";
	  }
    if ($line =~ /this\.range\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"range"}= $1;
	    print STDERR "$currentobj range $1\n";
	  }

	}
	else {
	  if ($line =~ /^\s*function (\w+Object)\(/) {
	    # Virtual Object
	    $inobj = 1;
	    $currentobj = $1;
	    print STDERR "$currentobj\n";
	    
	  }
	  elsif ($line =~ /^\s*function (\w+Tile)\(/) {
	    # Actual Object
	    $inobj = 1;
	    $currentobj = $1;
	    print STDERR "$currentobj\n";
	  }
	  elsif ($line =~ /^\s*(\w+)\.prototype.(\w+)\s*=\s*function\(/) {
	    push @{$allobjs{$1}{"functions"}}, $2;
	    
	  }
	}
	
}

print "<html><head><title>Dark Unknown Objects</title>\n";
print '<script language="JavaScript" src="external/jquery-1.3.2.js"></script>\n';
print "</head><body>";


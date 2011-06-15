
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
#   	print STDERR "$currentobj inherits from $1\n";
	  	next;
	  }
	  if ($line =~ /this\.name\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"name"}= $1;
#	    print STDERR "$currentobj name: $1\n";
	  }
	  if ($line =~ /this\.graphic\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"graphic"}= $1;
#	    print STDERR "$currentobj graphic: $1\n";
	  }
    if ($line =~ /this\.overlay\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"overlay"}= $1;
#	    print STDERR "$currentobj overlay $1\n";
	  }
    if ($line =~ /this\.spritexoffset\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"spritexoffset"}= $1;
#	    print STDERR "$currentobj spritexoffset $1\n";
	  }
    if ($line =~ /this\.spriteyoffset\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"spriteyoffset"}= $1;
#	    print STDERR "$currentobj spriteyoffset $1\n";
	  }
    if ($line =~ /this\.desc\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"desc"}= $1;
#	    print STDERR "$currentobj desc $1\n";
	  }
    if ($line =~ /this\.prefix\s*=\s*[\"\'](.+)[\"\']/) {
	    $allobjs{$currentobj}{"prefix"}= $1;
#	    print STDERR "$currentobj prefix $1\n";
	  }
    if ($line =~ /this\.blocklos\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"blocklos"}= $1;
#	    print STDERR "$currentobj blocklos $1\n";
	  }
    if ($line =~ /this\.passable\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"passable"}= $1;
#	    print STDERR "$currentobj passable $1\n";
	  }
    if ($line =~ /this\.losupclose\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"losupclose"}= $1;
#	    print STDERR "$currentobj losupclose $1\n";
	  }
    if ($line =~ /this\.initdelay\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"initdelay"}= $1;
#	    print STDERR "$currentobj initdelay $1\n";
	  }
	  if ($line =~ /LightEmitting\.call\(this\s*,\s*(\d+)\);/) {
	    $allobjs{$currentobj}{"lightemitting"} = $1;
#	    print STDERR "$currentobj lightemitting $1\n";
	  }
	  if ($line =~ /Enterable\.call\(/) {
	    $allobjs{$currentobj}{"enterable"} = 1;
#	    print STDERR "$currentobj enterable\n";
	  }
	  if ($line =~ /Lockable\.call\(/) {
	    $allobjs{$currentobj}{"lockable"} = 1;
	  }
    if ($line =~ /this\.invisible\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"invisible"}= $1;
#	    print STDERR "$currentobj invisible $1\n";
	  } 
    if ($line =~ /this\.defense\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"defense"}= $1;
#	    print STDERR "$currentobj defense $1\n";
	  }
    if ($line =~ /this\.absorb\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"absorb"}= $1;
#	    print STDERR "$currentobj absorb $1\n";
	  }
    if ($line =~ /this\.resist\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"resist"}= $1;
#	    print STDERR "$currentobj resist $1\n";
	  }
    if ($line =~ /this\.strReq\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"strReq"}= $1;
#	    print STDERR "$currentobj strReq $1\n";
	  }
    if ($line =~ /this\.hit\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"hit"}= $1;
#	    print STDERR "$currentobj hit $1\n";
	  }
    if ($line =~ /this\.reduceArmor\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"reduceArmor"}= $1;
#	    print STDERR "$currentobj reduceArmor $1\n";
	  }
    if ($line =~ /this\.damage\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"damage"}= $1;
#	    print STDERR "$currentobj damage $1\n";
	  }
    if ($line =~ /this\.strdamage\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"strdamage"}= $1;
#	    print STDERR "$currentobj strdamage $1\n";
	  }
    if ($line =~ /this\.dexReq\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"dexReq"}= $1;
#	    print STDERR "$currentobj dexReq $1\n";
	  }
    if ($line =~ /this\.range\s*=\s*(.+);/) {
	    $allobjs{$currentobj}{"range"}= $1;
#	    print STDERR "$currentobj range $1\n";
	  }

	}
	else {
	  if ($line =~ /^\s*function (\w+Object)\(/) {
	    # Virtual Object
	    $inobj = 1;
	    $currentobj = $1;
#	    print STDERR "$currentobj\n";
	    
	  }
	  elsif ($line =~ /^\s*function (\w+Tile)\(/) {
	    # Actual Object
	    $inobj = 1;
	    $currentobj = $1;
#	    print STDERR "$currentobj\n";
	  }
	  elsif ($line =~ /^\s*(\w+)\.prototype.(\w+)\s*=\s*function\(/) {
	    push @{$allobjs{$1}{"functions"}}, $2;
	    
	  }
	}
	
}

print "<html><head><title>Dark Unknown Objects</title>\n";
print '<script language="JavaScript" src="external/jquery-1.3.2.js"></script>';
print '<script language="Javascript">';
print "\n";
print 'function toggleShow(which) {';
print "\n if (\$('#'+which).css('display') == 'none') {\n";
print "   \$('#'+which).css('display', 'block'); \n";
print " } else {\n   \$('#'+which).css('display', 'none'); \n";
print " }\n}\n";
print '</script>';
print "\n<style type='text/css'>\n";
print ".obj {\n  color: #fff;\n	padding: 20px;\n	background: #111;\n	border: 1px solid #000;\n	-webkit-border-radius: 5px;\n	-moz-border-radius: 5px;\n	border-radius: 5px;\n}\n";

print "</style>";
print "</head><body>";

printcat("GameObject");
printcat("InanimateObject");
printcat("TerrainObject");
printcat("FeatureObject");
printcat("ItemObject");
printcat("EquippableItemObject");
printcat("ArmorObject");
printcat("WeaponObject");
printcat("MissileWeaponObject");
printcat("AnimateObject");

sub printcat() {
  my ($category) = @_;
  print "<center><table border='0' padding='0' cellspacing='0' class='obj'><tr><td><span style='color:#dddddd; font-weight:bold'>$category</span><br />";
  if (exists $allobjs{$category}{"prefix"}) {
    print "<span style='font-style:italic'>$allobjs{$category}{'prefix'}</span> ";
  }
  print "<span style='font-style:italic'>$allobjs{$category}{'desc'}</span><br />";
  foreach my $prop (sort keys %{$allobjs{$category}}) {
    if (($prop ne "functions") and ($prop ne "name") and ($prop ne "desc") and ($prop ne "prefix") and ($prop ne "inheritfrom")) {
      print "$prop: $allobjs{$category}{$prop}<br />";
    }
  }
  print "<span style='font-weight:bold' onClick='toggleShow(\"$category\")'>Functions:</span><br /><span style='display:none' id='$category'>";
  foreach my $func (@{$allobjs{$category}{"functions"}}) {
    print "$func<br />";
  }
  print "</span><br />Inherit From: $allobjs{$category}{'inheritfrom'}</td></tr></table><br />";
  
  my $celliter = 0;
  print "<table cellpadding='0' cellspacing='3' border='0' width='100%'><tr>";
  
  foreach my $obj (sort keys %allobjs) {
    if (($allobjs{$obj}{'inheritfrom'} eq $category) and (!($obj =~ /Object/))) {
      print "<td><table border='0' cellpadding='0' cellspacing='6' class='obj'>";
      if (!exists $allobjs{$obj}{'spritexoffset'}) { $allobjs{$obj}{'spritexoffset'} = "0"; }
      if (!exists $allobjs{$obj}{'spriteyoffset'}) { $allobjs{$obj}{'spriteyoffset'} = "0"; }
      if (!exists $allobjs{$obj}{'overlay'}) { $allobjs{$obj}{'overlay'} = "spacer.gif"; }
      print "<tr><td width='32' height='32' style=\"background-image:url('graphics/$allobjs{$obj}{'graphic'}'); background-repeat:no-repeat; background-position: $allobjs{$obj}{'spritexoffset'}px $allobjs{$obj}{'spriteyoffset'}px;\"><img src=\"graphics/$allobjs{$obj}{'overlay'}\" border=\"0\" width=\"32\" height=\"32\" style=\"position: relative; z-index:1;\" /></td>";
      print "<td><span style='color:#dddddd; font-weight: bold'>$allobjs{$obj}{'name'}</span></td></tr>";
      print "<tr><td colspan='2'>";
      foreach my $prop (sort keys %{$allobjs{$obj}}) {
        if (($prop ne "functions") and ($prop ne "name") and ($prop ne "desc") and ($prop ne "prefix") and ($prop ne "inheritfrom")
              and ($prop ne "graphic") and ($prop ne "spritexoffset") and ($prop ne "spriteyoffset") and ($prop ne "overlay")) {
          print "$prop: $allobjs{$obj}{$prop}<br />";
        }
      } 
      print "</td></tr>";
      if ($allobjs{$obj}{"functions"}) {
        print "<tr><td colspan='2'><span style='font-weight:bold' onClick='toggleShow(\"$obj\")'>Functions:</span><br /><span style='display:none' id='$obj'>";
        foreach my $func (@{$allobjs{$obj}{"functions"}}) {
          print "$func<br />";
        }
        print "</span></td></tr>";
      }
 #     print "<tr><td colspan='2'>Inherit From: $allobjs{$obj}{'inheritfrom'}</td></tr>";
      print "<tr><td colspan='2'><span style='font-style:italic'>";
      if (exists $allobjs{$obj}{"prefix"}) {
        print "<span style='font-style:italic'>$allobjs{$obj}{'prefix'}</span> ";
      }
      print "<span style='font-style:italic'>$allobjs{$obj}{'desc'}</span></td></tr></table></td>";
      $celliter++;
      if ($celliter % 3 == 0) { print "</tr><tr>\n"; }
    }
  }
}


"use strict;" 

QUnit.test( "Test Pathfinder", function( assert ) {

  var grid = new PF.Grid(12, 12);
  var finder = new PF.AStarFinder();

  grid.setWeightAt(0,3,1);
  assert.deepEqual(grid.getWeightAt(1,4),1,"Default weight");

  var gridBackup = grid.clone();

  var path = finder.findPath(1, 7, 10, 2, gridBackup);

  for (let i=0;i<path.length;i++) {
    $("#output").append("[");

    for (let j=0;j<path[i].length;j++) {
      $("#output").append(path[i][j]);
      if (!j) { $("#output").append(","); }
    }
    $("#output").append("],");
  }
  $("#output").append("<br />");

  grid.setWeightAt(1,4,3);
  var gridBackup = grid.clone();
  assert.deepEqual(grid.getWeightAt(1,4),3,"Changed weight");
  assert.deepEqual(gridBackup.getWeightAt(1,4),3,"Changed weight");

  var path = finder.findPath(1, 7, 10, 2, gridBackup);

  for (let i=0;i<path.length;i++) {
    $("#output").append("[");

    for (let j=0;j<path[i].length;j++) {
      $("#output").append(path[i][j]);
      if (!j) { $("#output").append(","); }
    }
    $("#output").append("],");
  }

});


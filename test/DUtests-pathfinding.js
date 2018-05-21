"use strict;" 

var maxserial = 0;
var viewsizex = 13;
var viewsizey = 13;

var mappages = new Pages();
var localFactory = new tileFactory();
var eidos = new Platonic();

var DU = {};  // attach all saveable global objects to me
DU.version = "0.7.3";

DU.maps = new MapMemory();
var maps = DU.maps; // alias
var losgrid = new LOSMatrix(30);  // BIGGER FOR AI USE

DU.PC = new PCObject();
var PC = DU.PC;  // alias

DU.DUTime = new Timeline(0);
var DUTime = DU.DUTime; // alias
var maintext = new TextFrame("innertextframe");
var DULoot = SetLoots();            //
var DULootGroups = SetLootGroups(); //  see loot.js and lootset.js for population
var DUTraps = SetTraps();           //
var displayspecs = {};
var Dice = new DiceObject();
DU.gameflags = new Gameflags();
var targetCursor = {};
    targetCursor.skipahead = 0;
var inputText = {};

set_schedules();

QUnit.test( "Test Pathfinder", function( assert ) {

  var grid = new PF.Grid(12, 12);
  var finder = new PF.AStarFinder({
    heuristic: PF.Heuristic.euclidean
  });

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

  var maps = new MapMemory();
  maps.addMap("olympus1");
  var testmap = maps.getMap("olympus1");

  gridBackup = testmap.getPathGrid(MOVE_WALK_DOOR).clone();
  let path1 = finder.findPath(66,35,63,31,gridBackup);
//  console.log(path1);

  let tile=testmap.getTile(65,34);
  let tile2=testmap.getTile(66,34);
  assert.deepEqual(tile.getPathWeight(),4,"Chair weight");
  assert.deepEqual(tile.getPathWeight("civilized"),1.2,"Civilized chair weight");
  assert.deepEqual(tile2.getPathWeight(),1,"Floor weight");
  assert.deepEqual(tile2.getPathWeight("civilized"),.3,"Civilized floor weight");

  assert.deepEqual(gridBackup.getWeightAt(65,34),1.2,"Chair weight from grid copy");
  assert.deepEqual(testmap.getPathGrid(MOVE_WALK_DOOR).getWeightAt(65,34),1.2,"Chair weight from base grid");
  assert.deepEqual(testmap.getPathGrid(MOVE_WALK).getWeightAt(65,34),4,"Uncivilized chair weight from base grid");
  assert.deepEqual(gridBackup.getWeightAt(64,34),.3,"Floor weight from grid copy.");
  
  let anothergrid=new PF.Grid(12,5);
  anothergrid.setWalkableAt(10,4,false);
  anothergrid.setWalkableAt(11,4,false);
  anothergrid.setWalkableAt(3,2,false);
  anothergrid.setWalkableAt(4,2,false);
  anothergrid.setWalkableAt(5,2,false);
  anothergrid.setWalkableAt(6,2,false);
  anothergrid.setWalkableAt(7,2,false);
  anothergrid.setWalkableAt(8,2,false);
  anothergrid.setWalkableAt(9,2,false);
  for (let i=0;i<12;i++) {
    for (let j=0;j<5;j++) {
      anothergrid.setWeightAt(i,j,.3);
    }
  }
  anothergrid.setWeightAt(0,4,anothergrid.getWeightAt(0,4)*10);
  assert.deepEqual(anothergrid.getWeightAt(0,4),3,"Fake plant weight.");
  anothergrid.setWeightAt(2,2,anothergrid.getWeightAt(2,2)*5);
  anothergrid.setWeightAt(3,3,anothergrid.getWeightAt(3,3)*5);
  anothergrid.setWeightAt(5,3,anothergrid.getWeightAt(5,3)*5);
  anothergrid.setWeightAt(7,3,anothergrid.getWeightAt(7,3)*5);
  anothergrid.setWeightAt(10,2,anothergrid.getWeightAt(10,2)*5);
  anothergrid.setWeightAt(8,1,anothergrid.getWeightAt(8,1)*5);
  anothergrid.setWeightAt(6,1,anothergrid.getWeightAt(6,1)*5);
  anothergrid.setWeightAt(4,1,anothergrid.getWeightAt(4,1)*5);

  anothergridbackup = anothergrid.clone();
  anotherpath = finder.findPath(6,4,3,0,anothergridbackup);
  console.log(anotherpath);
});


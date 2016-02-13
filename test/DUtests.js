
// Dice test
QUnit.test( "Test dice parse", function( assert ) {
  var Dice = new DiceObject();
  var dieobj = Dice.parse("3d6+2");
  assert.deepEqual( dieobj.quantity, 3, "Checking '3d6+2', expecting 3" );
  assert.deepEqual( dieobj.dice, 6, "Checking '3d6+2', expecting 6" );
  assert.deepEqual( dieobj.plus, 2, "Checking '3d6+2', expecting 2" );
  
  dieobj = Dice.parse("3d6+-2");
  assert.deepEqual( dieobj.quantity, 3, "Checking '3d6+-2', expecting 3" );
  assert.deepEqual( dieobj.dice, 6, "Checking '3d6+-2', expecting 6" );
  assert.deepEqual( dieobj.plus, -2, "Checking '3d6+-2', expecting -2" );

  dieobj = Dice.parse("3d6-2");
  assert.deepEqual( dieobj.quantity, 3, "Checking '3d6-2', expecting 3" );
  assert.deepEqual( dieobj.dice, 6, "Checking '3d6-2', expecting 6" );
  assert.deepEqual( dieobj.plus, -2, "Checking '3d6-2', expecting -2" );

  dieobj = Dice.parse("2d10");
  assert.deepEqual( dieobj.quantity, 2, "Checking '2d10', expecting 2" );
  assert.deepEqual( dieobj.dice, 10, "Checking '2d10', expecting 10" );
  assert.deepEqual( dieobj.plus, 0, "Checking '2d10', expecting 0" );

  dieobj = Dice.parse("4");
  assert.deepEqual( dieobj.quantity, 0, "Checking '4', expecting 0" );
  assert.deepEqual( dieobj.dice, 0, "Checking '4', expecting 0" );
  assert.deepEqual( dieobj.plus, 4, "Checking '4', expecting 4" );

  dieobj = Dice.parse(4);
  assert.deepEqual( dieobj.quantity, 0, "Checking '4', expecting 0" );
  assert.deepEqual( dieobj.dice, 0, "Checking '4', expecting 0" );
  assert.deepEqual( dieobj.plus, 4, "Checking '4', expecting 4" );
    
  dieobj = Dice.parse("+4");
  assert.deepEqual( dieobj.quantity, 0, "Checking '+4', expecting 0" );
  assert.deepEqual( dieobj.dice, 0, "Checking '+4', expecting 0" );
  assert.deepEqual( dieobj.plus, 4, "Checking '+4', expecting 4" );

  dieobj = Dice.parse("-4");
  assert.deepEqual( dieobj.quantity, 0, "Checking '-4', expecting 0" );
  assert.deepEqual( dieobj.dice, 0, "Checking '-4', expecting 0" );
  assert.deepEqual( dieobj.plus, -4, "Checking '-4', expecting -4" );

  dieobj = Dice.parse(-4);
  assert.deepEqual( dieobj.quantity, 0, "Checking '-4', expecting 0" );
  assert.deepEqual( dieobj.dice, 0, "Checking '-4', expecting 0" );
  assert.deepEqual( dieobj.plus, -4, "Checking '-4', expecting -4" );

  dieobj = Dice.parse("3d");
  assert.deepEqual( dieobj.quantity, 0, "Checking '3d', expecting 0" );
  assert.deepEqual( dieobj.dice, 1, "Checking '3d', expecting 1" );
  assert.deepEqual( dieobj.plus, 0, "Checking '3d', expecting 0" );

  dieobj = Dice.parse("3d+2");
  assert.deepEqual( dieobj.quantity, 0, "Checking '3d+2', expecting 0" );
  assert.deepEqual( dieobj.dice, 1, "Checking '3d+2', expecting 1" );
  assert.deepEqual( dieobj.plus, 2, "Checking '3d+2', expecting 2" );

  dieobj = Dice.parse("d2+3");
  assert.deepEqual( dieobj.quantity, 1, "Checking 'd2+3', expecting 1" );
  assert.deepEqual( dieobj.dice, 2, "Checking 'd2+3', expecting 2" );
  assert.deepEqual( dieobj.plus, 3, "Checking 'd2+3', expecting 3" );

});



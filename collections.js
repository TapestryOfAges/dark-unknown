
"use strict";

function Collection() {

  this.container = [];

}

Collection.prototype.getAt = function(x,y) {

  var stuffat = [];
  for (var i = 0; i < this.container.length; i++) {
    if ((this.container[i].x === x) && (this.container[i].y === y)) {
      stuffat.push(this.container[i]);
    }
  }
  return stuffat;
}

Collection.prototype.getAll = function() {
  return this.container.slice(0);
}

Collection.prototype.getAllSorted = function() {
  var tmparray = [];
  tmparray = this.container.slice(0);
  tmparray.sort(function(a,b) {
    var nameA = a.getName().toLowerCase(), nameB = b.getName().toLowerCase();
    if (nameA < nameB) 
      return -1
    if (nameA > nameB)
      return 1
     return 0 
  }); 
  return tmparray;
}

Collection.prototype.getTopAt = function(x,y) {
	var allat = this.getAt(x,y);
	return allat[allat.length-1];
}

Collection.prototype.getTop = function() {
  return this.container[this.container.length-1];
}

Collection.prototype.getByName = function(neededName) {
	for (var i = 0; i < this.container.length; i++) {
		if (this.container[i].getName() === neededName) {
			return this.container[i];
		}
	}
	return;
}

Collection.prototype.addTop = function(addthis) {
  this.container.push(addthis);
}

Collection.prototype.addBottom = function(addthis) {
  this.container.unshift(addthis);
}

Collection.prototype.deleteFrom = function(deletethis) {
	for (var i = 0; i < this.container.length; i++) {
		if (this.container[i] === deletethis) {
			this.container.splice(i,1);
		}
	}
}

Collection.prototype.deleteAll = function() {
	this.container = new Array;
}



function Collection() {

  this.container = new Array;

}

Collection.prototype.getAt = function(x,y) {

  var stuffat = new Array;
  for (var i = 0; i < this.container.length; i++) {
    if ((this.container[i].x == x) && (this.container[i].y == y)) {
      stuffat.push(this.container[i]);
    }
  }
  return stuffat;
}

Collection.prototype.getAll = function() {
  return this.container;
}

Collection.prototype.getTopAt = function(x,y) {
	var allat = this.getAt(x,y);
	return allat[allat.length-1];
}

Collection.prototype.getTop = function() {
  return this.container[this.container.length-1];
}

Collection.prototype.addTop = function(addthis) {
  this.container.push(addthis);
}

Collection.prototype.addBottom = function(addthis) {
  this.container.shift(addthis);
}

Collection.prototype.deleteFrom = function(deletethis) {
	for (var i = 0; i < this.container.length; i++) {
		if (this.container[i] == deletethis) {
			this.container.splice(i,1);
		}
	}
}

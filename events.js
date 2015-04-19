
function DUListener() {
  this.listeners = new Collection();
}
DUListener.prototype = new Object();

DUListener.prototype.sendEvent = function(ev) {
  this.listeners.addTop(ev);
}



function DUEvent() {
  this.name;
  this.source;
  this.callfunc;  
}
DUEvent.prototype = new Object();

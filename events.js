
function DUListener() {
  this.listeners = new Collection();
}
DUListener.prototype = new Object();

DUListener.prototype.sendEvent = function(ev) {
  this.listeners.addTop(ev);
}



function DUEvent() {
  
}
DUEvent.prototype = new Object();

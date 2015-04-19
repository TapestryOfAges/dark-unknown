
function DUListener() {
  this.listeners = new Collection();
}
DUListener.prototype = new Object();

DUListener.prototype.addListener = function(newlistener) {
  this.listeners.addTop(newlistener);
}

DUListener.prototype.sendEvent = function(ev) {
  var allears = this.listeners.getAll();
  if (allears.length === 0) { 
    if (debug) { dbs.writeln("<span style='color:magenta'>Event sent, no listeners.<br /></span>"); }
    return;
  }
  $.each(allears, function(idx, val) {
    if (val.listenforname === ev.name) {
      var flagsmatch = 1;
      $.each(val.flagsreq, function(idx2, val2) {
        if (ev.idx2 && (ev.idx2 === val2)) {
          if (debug) { dbs.writeln("<span style='color:magenta'>Flag " + idx2 + " matched - values " + val2 + ".<br /></span>"); }
        } else {
          flagsmatch = 0;
        }
      });
    }
  });
}

function DUEar() {
  this.listenforname;
  this.callfunc;
  this.flagsreq = {};
}
DUEar.prototype = new Object();

function DUEvent() {
  this.name;
  this.source;
  this.flags;
}
DUEvent.prototype = new Object();

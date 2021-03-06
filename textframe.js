"use strict";

function TextFrame(fname) {
	this.framename = fname;
	this.inputLine = "";
	this.delayedappend = [];
}

TextFrame.prototype.getInputLine = function() {
	return this.inputLine;
}

TextFrame.prototype.setInputLine = function(txt) {
	if (!txt) { txt = "&gt;"; }
	this.inputLine = txt;
}

TextFrame.prototype.getTextFrame = function() {
	return (document.getElementById(this.framename).innerHTML);
}

TextFrame.prototype.addText = function(newtext) {
	if (newtext) {
		let tmpchild = document.createElement('p');
		tmpchild.innerHTML = newtext;
		tmpchild.classList.add("itfbits");
		document.getElementById(this.framename).appendChild(tmpchild);
    this.countnode();
  }
  if (this.delayedappend[0]) {
		for (let i=0;i<this.delayedappend.length;i++) {
  		let tmpchild = document.createElement('p');
	  	tmpchild.innerHTML = this.delayedappend[i];
			tmpchild.classList.add("itfbits");
		  document.getElementById(this.framename).appendChild(tmpchild);
			this.countnode();
		}
		this.clearDelay();
  }
}

TextFrame.prototype.flushDelayedText = function() {
  this.addText();
}

TextFrame.prototype.delayedAddText = function(newtext) {
	this.delayedappend.push(newtext);
//  if (this.delayedappend) {
//    this.delayedappend = this.delayedappend + "<br />" + newtext;
//  } else {
//    this.delayedappend = newtext;
//  }
}

TextFrame.prototype.clearDelay = function() {
  this.delayedappend = [];
}

TextFrame.prototype.countnode = function() {
	let txtar = document.getElementById(this.framename);
  if (txtar.childNodes.length > 17) {
    txtar.removeChild(txtar.childNodes[0]);
	}
}

TextFrame.prototype.addTextByLine = function(newtext) {  // deprecated
	let words = newtext.split(" ");
	let lines = [];
	let line = "";
	while (words[0]) {
		if (line === "" ){ line = words.shift(); }
		else { 
			let tmpword = words.shift();
			let tmpline = line + " " + tmpword;
			if (tmpline.length > this.width) {
				lines.push(line);
				line = tmpword;
			}
			else { line = tmpline; }
		}
	}
	lines.push(line);
	
	while (lines[0]) {
		this.mainTextFrame.shift();
		this.mainTextFrame.push(lines.shift());
	}
	return this.getTextFrame();
}

TextFrame.prototype.appendToLine = function(newtext) {
  document.getElementById(this.framename).innerHTML += newtext;	
}

TextFrame.prototype.drawTextFrame = function() {
	this.drawInputLine();
}

TextFrame.prototype.drawInputLine = function() {
	document.getElementById('inputtext').innerHTML = this.getInputLine();
}
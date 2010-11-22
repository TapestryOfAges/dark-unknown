

function TextFrame(hgt,wdt) {
	this.mainTextFrame = new Array;
	this.height = hgt;
	this.width = wdt;
	this.inputLine = "";
	
	for (var i=0; i<this.height; i++) {
		this.mainTextFrame[i] = "";
	}
}

TextFrame.prototype.getInputLine = function() {
	return this.inputLine;
}

TextFrame.prototype.setInputLine = function(txt) {
	this.inputLine = txt;
}

TextFrame.prototype.getTextFrame = function(as) {
	if (as == "array") { return this.mainTextFrame; }
	else {
		var textDiv = "";
		for (var i=0; i<this.height; i++) {
			textDiv = textDiv + this.mainTextFrame[i] + "<br />";
		}
		return textDiv;
	}
}

TextFrame.prototype.addText = function(newtext) {
	if (newtext == "") { return; }
	var lines = newtext.split("\n");
	while (lines[0]){
		var line = lines.shift();
		this.addTextByLine(line);
	}
}

TextFrame.prototype.addTextByLine = function(newtext) {
	var words = newtext.split(" ");
	var lines = new Array;
	var line = "";
	while (words[0]) {
		if (line == "" ){ line = words.shift(); }
		else { 
			var tmpline = line + " " + words.shift();
			if (tmpline.length > this.width) {
				lines.push(line);
				line = words.shift();
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
	var appendto = this.mainTextFrame.pop();
	this.mainTextFrame.unshift("   ");
	
	var newline = appendto + "" + newtext;
	this.addText(newline);
	
}

TextFrame.prototype.drawTextFrame = function() {
	$('#maintextframe').html(this.getTextFrame());
	this.drawInputLine();
}

TextFrame.prototype.drawInputLine = function() {
	$('#inputtext').html(this.getInputLine());
}


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

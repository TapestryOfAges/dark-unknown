

function TextFrame(fname) {
	this.framename = "#" + fname;
	this.inputLine = "";
}

TextFrame.prototype.getInputLine = function() {
	return this.inputLine;
}

TextFrame.prototype.setInputLine = function(txt) {
	this.inputLine = txt;
}

TextFrame.prototype.getTextFrame = function() {
	return ($(this.framename).html());
}

TextFrame.prototype.addText = function(newtext) {
	if (newtext) {
  	$(this.framename).append("<br />" + newtext);
  }
}

TextFrame.prototype.addTextByLine = function(newtext) {
	var words = newtext.split(" ");
	var lines = new Array;
	var line = "";
	while (words[0]) {
		if (line == "" ){ line = words.shift(); }
		else { 
			var tmpword = words.shift();
			var tmpline = line + " " + tmpword;
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
  $(this.framename).append(newtext);	
}

TextFrame.prototype.drawTextFrame = function() {
//	$(fname).html(this.getTextFrame());
	this.drawInputLine();
}

TextFrame.prototype.drawInputLine = function() {
	$('#inputtext').html(this.getInputLine());
}
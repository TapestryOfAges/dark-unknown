
var brushdown = 0;

function CreateUI() {
  var uidiv = "<table cellpadding='0' cellspacing='0' border='0'>";
  for (var i = 0; i < 15; i++) {
    uidiv += "<tr>";
    for (var j = 0; j < 15; j++) {
      uidiv += "<td id='ui" + i + "x" + j + "' style='' width='32' height='32'><img src='graphics/spacer.gif' width='32' height='32' onMouseUp='alert(\"up!\")' onMouseDown='alert(\"down!\")' /></td>";
    }
    uidiv += "</tr>";
  }
  uidiv += "</table>";
  
  $("#uiinterface").html(uidiv);
}

var places = {};

var curr_place = "";
var curr_person = "";

$(document).ready(function() {
  set_conversations();
  create_header();
});

function create_header() {
  $.each(conversations, function(idx,val) {
    places[val._location] = 1;
  });
  
  $.each(places, function(idx,val) {
    $(locations).html($(locations).html() + "<a href='javascript:select_place(\"" + idx + "\")'>" + idx + "</a> | ");
  });
}

function select_place(pname) {
  curr_place=pname;
  
  var txt = "<h3>" + pname + "</h3><p><form name='convform'><select name='pickconv' onChange='select_conv()'><option value=''></option>";
  var frst = "";
  $.each(conversations, function(idx, val) {
    if (val._location === pname) {
      txt = txt + "<option value='"+idx+"'>"+idx+"</option>";
      if (!frst) { frst = idx; }
    }
  });
  txt = txt + "</select></form></p>";
  $(convs).html(txt);
}

function select_conv() {
  var thisconv = document.convform.pickconv.value;

  var txt = "<div style='margin-10'><form name='speechform'><table cellpadding='2' cellspacing='0' border='1'>";
  txt = txt + "<tr><td>_start</td><td style='color:blue'>[no flag]</td><td>" + conversations[thisconv]["_start"].responses[0] + "</td><td><a href='javascript:edit_response(\"_start\",0)'>Edit</a></td></tr>";
  if (conversations[thisconv]["_start"].flags) {
    var keytype;
    var flag;
    $.each(conversations[thisconv]["_start"].flags, function(idx,val) {
      keytype = idx;
      flag = val;
    });
    txt = txt + "<tr><td></td><td style='color:blue'>"+ keytype + " : " + flag + "</td><td>" + conversations[thisconv]["_start"].responses[1] + "</td><td><a href='javascript:edit_response(\"_start\",1)'>Edit</a></td></tr>";
  } else {
    txt = txt + "<tr><td></td><td></td><td></td><td><a href='javascript:edit_response(\"_start\",1)'>Edit</a></td></tr>";
  }
  
  
  txt = txt + "</table></form></div>";
  $(mainbody).html(txt);
}
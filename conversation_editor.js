
var conversations = {};  // directory of Conversations
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
  
  var txt = "<p><form name='convform'><select name='pickconv' onChange='select_conv()'><option value=''></option>";
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

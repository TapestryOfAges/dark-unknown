
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
  txt = txt + "</select></form> <a href='javascript:new_conv()'>New Conversation</a></p>";
  $(convs).html(txt);
}

function new_conv() {
  var convname = "";
  while (convname === "") {
    convname = prompt("Name of conversation:");
    $.each(conversations, function(idx, val) {
      if (convname === idx) { convname = ""; }
    });
  }
  conversations[convname] = {};
  conversations[convname]._location = curr_place;
  document.convform.pickconv.value = convname;
  edit_response(convname, "");
}

function select_conv() {
  var thisconv = document.convform.pickconv.value;

  var txt = "<div style='margin-10'><form name='speechform'><table cellpadding='2' cellspacing='0' border='1'>";
  txt = txt + "<th>KEYWORD</th><th>FLAG</th><th>RESPONSE</th><th>TRIGGERS</th><th></th></tr>";
  txt = txt + show_response(thisconv, "_start");
  txt = txt + show_response(thisconv, "_confused");
  
  $.each(conversations[thisconv], function(idx, val) {
    if ((idx != "_start") && (idx != "_confused") && (idx != "bye") && (idx != "_location") && (idx != "respond") && (idx != "say")) {
      txt = txt + show_response(thisconv, idx);
    }
    
  });
  
  txt = txt + show_response(thisconv, "bye");
  txt = txt + "</table></form><p><a href='javascript:edit_response(\""+ thisconv + "\", \"\");'>New Response</a></p></div>";
  $(mainbody).html(txt);
}


function show_response(convname, keyword) {
  var tmptxt = "";
  var keytype = "";
  var flag = "";
  $.each(conversations[convname][keyword].flags, function(idx,val) {
    keytype = idx;
    flag = val;
  });

  if (keytype) {
    var triggers = "";
    $.each(conversations[convname][keyword].triggers[0], function(idx, val) {
      triggers = triggers + idx + " " + "(" + val + ") ";
    });
    tmptxt = tmptxt + "<tr><td>" + keyword + "</td><td style='color:blue'>[no flag]</td><td>" + conversations[convname][keyword].responses[0] + "</td><td style='font-weight:bold'>" + triggers + "</td><td rowspan='2'><a href='javascript:edit_response(\"" + convname + "\", \"" + keyword + "\")'>Edit</a></td></tr>";
    triggers = "";
    $.each(conversations[convname][keyword].triggers[1], function(idx, val) {
      triggers = triggers + idx + " " + "(" + val + ") ";
    });
    tmptxt = tmptxt + "<tr><td></td><td style='color:blue'>"+ keytype + " : " + flag + "</td><td>" + conversations[convname][keyword].responses[1] + "</td><td style='font-weight:bold'>" + triggers + "</td></tr>";
  } else {
    var triggers = "";
    $.each(conversations[convname][keyword].triggers[1], function(idx, val) {
      triggers = triggers + idx + " " + "(" + val + ") ";
    });
    tmptxt = tmptxt + "<tr><td>" + keyword + "</td><td style='color:blue'></td><td>" + conversations[convname][keyword].responses[1] + "</td><td style='font-weight:bold'>" + triggers + "</td><td><a href='javascript:edit_response(\"" + convname + "\", \"" + keyword + "\")'>Edit</a></td></tr>";
  }
  return tmptxt;
}

function edit_response(convname, keyword) {
  var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
  $('#responsebubble').jqm({onShow:myOpen});
  $('#responsebubble').jqmShow();

  if (keyword) {
  document.responseeditpopup.responsekeyword.value = keyword;
  document.responseeditpopup.response1.value = conversations[convname][keyword].responses[0];
  var triggers = "";
  $.each(conversations[convname][keyword].triggers[0], function(idx, val) {
    if (idx === "end_convo") { 
      document.responseeditpopup.end_convo1.checked = "true"; 
      document.responseeditpopup.end_convo1_val.value = val;
    }
    else if (idx === "give_item") {
      document.responseeditpopup.give_item1.checked = "true";
      document.responseeditpopup.item_given1.value = val;
    }
    else if (idx === "take_item") {
      document.responseeditpopup.take_item1.checked = "true";
      document.responseeditpopup.item_taken1.value = val;
    }
    else if (idx === "set_flag") {
      document.responseeditpopup.set_flag1.checked = "true";
      document.responseeditpopup.flag_set1.value = val;
    }
    else if (idx === "start_shop") {
      document.responseeditpopup.start_shop1.checked = "true";
    }
    else if (idx === "start_sell") {
      document.responseeditpopup.start_sell1.checked = "true";
    }
    else { alert("Weird trigger: " + idx + " : " + val); }
  });
  
  var keytype = "";
  var flag = "";
  $.each(conversations[convname][keyword].flags, function(idx,val) {
    keytype = idx;
    flag = val;
  });
  
  document.responseeditpopup.flags2.value= keytype;
  document.responseeditpopup.flags2val.value= flag;
    
  document.responseeditpopup.response2.value = conversations[convname][keyword].responses[1];
  var triggers = "";
  $.each(conversations[convname][keyword].triggers[1], function(idx, val) {
    if (idx === "end_convo") { 
      document.responseeditpopup.end_convo2.checked = "true"; 
      document.responseeditpopup.end_convo2_val.value = val;
    }
    else if (idx === "give_item") {
      document.responseeditpopup.give_item2.checked = "true";
      document.responseeditpopup.item_given2.value = val;
    }
    else if (idx === "take_item") {
      document.responseeditpopup.take_item2.checked = "true";
      document.responseeditpopup.item_taken2.value = val;
    }
    else if (idx === "set_flag") {
      document.responseeditpopup.set_flag2.checked = "true";
      document.responseeditpopup.flag_set2.value = val;
    }
    else if (idx === "start_shop") {
      document.responseeditpopup.start_shop2.checked = "true";
    }
    else if (idx === "start_sell") {
      document.responseeditpopup.start_sell2.checked = "true";
    }
    else { alert("Weird trigger: " + idx + " : " + val); }
  });

  document.responseeditpopup.theconv.value = convname;
  }  
  document.responseeditpopup.location.value = conversations[convname]._location;
}

function submitEditResponse(val) {
  var convname = document.responseeditpopup.theconv.value;
  if (val === -1) { // delete this conversation
    var conf = confirm("Are you sure?");
    if (conf == true) {
      conversations[convname] = {};
    } else {
      var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
      $('#responsebubble').jqm({onShow:myOpen});
      $('#responsebubble').jqmShow();
    }
  }
  
  else if (val === 1) {
    
  }
}
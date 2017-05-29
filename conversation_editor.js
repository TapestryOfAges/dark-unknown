
"use strict";

var places = {};

var curr_place = "";
var curr_person = "";

var last_unknown_idx = 0;

$(document).ready(function() {
  set_conversations();
  create_header();
});

function create_header() {
  $.each(conversations, function(idx,val) {
    places[val._location] = 1;
  });
  
  $('#locations').html("<p><a href='javascript:validate()'>[Validate]</a> <a href='javascript:saveconv()'>[Save Conversations]</a> <a href='javascript:create_header()'>[Refresh]</a> <a href='javascript:makescript()'>[Make Script]</a></p><p>");
  
  $.each(places, function(idx,val) {
    $('#locations').html($('#locations').html() + "<a href='javascript:select_place(\"" + idx + "\")'>" + idx + "</a> | ");
  });
  
  $('#locations').html($('#locations').html() + "</p>");
}

function select_place(pname) {
  curr_place=pname;
  
  var txt = "<h3>" + pname + "</h3><p><form name='convform'><select id='pickconv' name='pickconv' onChange='select_conv()'><option value=''></option>";
  var frst = "";
  $.each(conversations, function(idx, val) {
    if (val._location === pname) {
      txt = txt + "<option value='"+idx+"'>"+idx+"</option>";
      if (!frst) { frst = idx; }
    }
  });
  txt = txt + "</select></form> <a href='javascript:new_conv()'>New Conversation</a> <a href='javascript:del_conv()'>Delete Conversation</a></p>";
  $('#convs').html(txt);
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

  select_place(curr_place)
  $("#pickconv").val(convname);

  edit_response(convname, "");
}

function del_conv() {
  var thisconv = document.convform.pickconv.value;
  if (thisconv) {
    var conf = confirm("Are you sure you want to delete this conversation?");
    if (conf) {
      delete conversations[thisconv];
      $("#mainbody").html(" ");
    }
  } else {
    alert("No selected conversation.");
  }
}

function select_conv() {
  var thisconv = document.convform.pickconv.value;
  last_unknown_idx = 0;
  if (!thisconv) { return; }

  var txt = "<div style='margin-10'><form name='speechform'><table cellpadding='2' cellspacing='0' border='1'>";
  txt = txt + "<th>#</th><th>KEYWORD</th><th>FLAG</th><th>RESPONSE</th><th>TRIGGERS</th><th></th></tr>";
//  if (conversations[thisconv]._start) { txt = txt + show_response(thisconv, "_start"); }
//  if (conversations[thisconv]._confused) { txt = txt + show_response(thisconv, "_confused"); }

  if ((conversations[thisconv]["name"] && conversations[thisconv]["name"].editor_idx) || (conversations[thisconv]["_start"] && conversations[thisconv]["_start"].editor_idx)) {
    var conv_array = [];
    var high_idx = 1000;
    $.each(conversations[thisconv], function (idx,val) {
      if ((idx !== "_location") && (idx !== "respond") && (idx !== "say")) {
        if (conversations[thisconv][idx].editor_idx) {
          while (conv_array[conversations[thisconv][idx].editor_idx]) {
            alert("Conv number collision between " + idx + " and " + conv_array[conversations[thisconv][idx].editor_idx] + ".");
            conversations[thisconv][idx].editor_idx++;
          }
          conv_array[conversations[thisconv][idx].editor_idx] = idx;
        } else {
//          alert(idx + " has no editor_idx.");
          conv_array[high_idx] = idx;
          high_idx++;
        }
      }
    });

    var i=1;
    while (i<conv_array.length) {
      if (conv_array[i]) {
        if (!conversations[thisconv][conv_array[i]].editor_idx) {
          conversations[thisconv][conv_array[i]].editor_idx = i;
        }
        if (conversations[thisconv][conv_array[i]].editor_idx !== i) {
          console.log("Mismatched index for: " + conv_array[i] );
          conversations[thisconv][conv_array[i]].editor_idx = i;
        }
        txt = txt + show_response(thisconv, conv_array[i]);
        i++;
      } else {
        conv_array.splice(i,1);
      }
    }

  } else {   
    $.each(conversations[thisconv], function(idx, val) {
      if ((idx != "_location") && (idx != "respond") && (idx != "say")) {
        txt = txt + show_response(thisconv, idx);
      }    
    });
  }
  
//  if (conversations[thisconv].bye) { txt = txt + show_response(thisconv, "bye"); }
  txt = txt + "</table></form><p><a href='javascript:edit_response(\""+ thisconv + "\", \"\");'>New Response</a></p></div>";
  $('#mainbody').html(txt);
}


function show_response(convname, keyword) {
  var tmptxt = "";
  var keytype = "";
  var flag = "";
  $.each(conversations[convname][keyword].flags, function(idx,val) {
    keytype = idx;
    flag = val;
  });

  if (!conversations[convname][keyword].editor_idx) { conversations[convname][keyword].editor_idx = ++last_unknown_idx; }
  var idx_display = "<table><tr><td><img src='graphics/frame/north.gif' width='10' height='10' onClick='MoveResponse(\"up\",\""+convname+"\",\""+keyword+"\")' /></td><td rowspan='2' verticle-align='center'>" + conversations[convname][keyword].editor_idx + "</tr><tr><td><img src='graphics/frame/south.gif' width='10' height='10' onClick='MoveResponse(\"down\",\""+convname+"\",\""+keyword+"\")' /></td></tr></table>";  
  if (keytype) {
    var triggers = "";
    $.each(conversations[convname][keyword].triggers[0], function(idx, val) {
      triggers = triggers + idx + " " + "(" + val + ") ";
    });
    tmptxt = tmptxt + "<tr><td rowspan='2'>" + idx_display + "</td><td rowspan='2'>" + keyword + "</td><td style='color:blue'>[flag unmet]</td><td>" + conversations[convname][keyword].responses[0] + "</td><td style='font-weight:bold'>" + triggers + "</td><td rowspan='2'><a href='javascript:edit_response(\"" + convname + "\", \"" + keyword + "\")'>Edit</a></td></tr>";
    triggers = "";
    $.each(conversations[convname][keyword].triggers[1], function(idx, val) {
      triggers = triggers + idx + " " + "(" + val + ") ";
    });
    tmptxt = tmptxt + "<tr><td style='color:blue'>"+ keytype + " : " + flag + "</td><td>" + conversations[convname][keyword].responses[1] + "</td><td style='font-weight:bold'>" + triggers + "</td></tr>";
  } else {
    var triggers = "";
    $.each(conversations[convname][keyword].triggers[1], function(idx, val) {
      triggers = triggers + idx + " " + "(" + val + ") ";
    });
    tmptxt = tmptxt + "<tr><td>" + idx_display + "</td><td>" + keyword + "</td><td style='color:blue'></td><td>" + conversations[convname][keyword].responses[1] + "</td><td style='font-weight:bold'>" + triggers + "</td><td><a href='javascript:edit_response(\"" + convname + "\", \"" + keyword + "\")'>Edit</a></td></tr>";
  }
  return tmptxt;
}

function MoveResponse(dir, convname, keyword) {
  var conv_idx = conversations[convname][keyword].editor_idx;
  var diff = 1;
  if (dir === "up") { diff = -1; }

  var swapwith = FindKeywordByIndex(convname, conv_idx+diff);
  if (swapwith) {
    conversations[convname][keyword].editor_idx = conv_idx+diff;
    conversations[convname][swapwith].editor_idx = conv_idx;
  }
  select_conv();
}

function FindKeywordByIndex(convname, findidx) {
  var returnme = 0;
  $.each(conversations[convname], function(idx,val) {
    if (conversations[convname][idx].editor_idx === findidx) { returnme = idx; }
  });
  return returnme;
}

function edit_response(convname, keyword) {
  var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
  $('#responsebubble').jqm({onShow:myOpen});
  $('#responsebubble').jqmShow();

  document.responseeditpopup.responsekeyword.value = keyword;
  document.responseeditpopup.response1.value = "";
  document.responseeditpopup.end_convo1.checked = false;
  document.responseeditpopup.end_convo1_val.value = "";
  document.responseeditpopup.give_item1.checked = false;
  document.responseeditpopup.item_given1.value = "";
  document.responseeditpopup.take_item1.checked = false;
  document.responseeditpopup.item_taken1.value = "";
  document.responseeditpopup.set_flag1.checked = false;
  document.responseeditpopup.flag_set1.value = "";
  document.responseeditpopup.give_gold1.checked = false;
  document.responseeditpopup.gold_given1.value = "";
  document.responseeditpopup.give_karma1.checked = false;
  document.responseeditpopup.karma_given1.value = "";
  document.responseeditpopup.give_xp1.checked = false;
  document.responseeditpopup.xp_given1.value = "";
  document.responseeditpopup.set_yesno1.checked = false;
  document.responseeditpopup.start_shop1.checked = false;
  document.responseeditpopup.start_sell1.checked = false;
  document.responseeditpopup.flags2.value = "";
  document.responseeditpopup.flags2val.value = "";
  document.responseeditpopup.response2.value = "";
  document.responseeditpopup.end_convo2.checked = false;
  document.responseeditpopup.end_convo2_val.value = "";
  document.responseeditpopup.give_item2.checked = false;
  document.responseeditpopup.item_given2.value = "";
  document.responseeditpopup.take_item2.checked = false;
  document.responseeditpopup.item_taken2.value = "";
  document.responseeditpopup.set_flag2.checked = false;
  document.responseeditpopup.flag_set2.value = "";
  document.responseeditpopup.give_gold2.checked = false;
  document.responseeditpopup.gold_given2.value = "";
  document.responseeditpopup.give_karma2.checked = false;
  document.responseeditpopup.karma_given2.value = "";
  document.responseeditpopup.give_xp2.checked = false;
  document.responseeditpopup.xp_given2.value = "";
  document.responseeditpopup.set_yesno2.checked = false;
  document.responseeditpopup.start_shop2.checked = false;
  document.responseeditpopup.start_sell2.checked = false;

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
      else if (idx === "give_gold") {
        document.responseeditpopup.give_gold1.checked = "true";
        document.responseeditpopup.gold_given1.value = val;
      }
      else if (idx === "give_karma") {
        document.responseeditpopup.give_karma1.checked = "true";
        document.responseeditpopup.karma_given1.value = val;
      }
      else if (idx === "give_xp") {
        document.responseeditpopup.give_xp1.checked = "true";
        document.responseeditpopup.xp_given1.value = val;
      }
      else if (idx === "yes_no") {
        document.responseeditpopup.set_yesno1.checked = "true";
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
  
    document.responseeditpopup.flags2.value = keytype;
    document.responseeditpopup.flags2val.value = flag;
    
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
      else if (idx === "give_gold") {
        document.responseeditpopup.give_gold2.checked = "true";
        document.responseeditpopup.gold_given2.value = val;
      }
      else if (idx === "give_karma") {
        document.responseeditpopup.give_karma2.checked = "true";
        document.responseeditpopup.karma_given2.value = val;
      }
      else if (idx === "give_xp") {
        document.responseeditpopup.give_xp2.checked = "true";
        document.responseeditpopup.xp_given2.value = val;
      }
      else if (idx === "yes_no") {
        document.responseeditpopup.set_yesno2.checked = "true";
      }
      else if (idx === "start_shop") {
        document.responseeditpopup.start_shop2.checked = "true";
      }
      else if (idx === "start_sell") {
        document.responseeditpopup.start_sell2.checked = "true";
      }
      else { alert("Weird trigger: " + idx + " : " + val); }
    });

  } 
  document.responseeditpopup.theconv.value = convname;
  document.responseeditpopup.location.value = conversations[convname]._location;
}

function submitEditResponse(val) {
  var convname = document.responseeditpopup.theconv.value;
  var keyword = document.responseeditpopup.responsekeyword.value;
  if (val === -1) { // delete this conversation
    var conf = confirm("Are you sure?");
    if (conf == true) {
      delete conversations[convname][keyword];
      select_conv();
    } else {
      setTimeout(function() {var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
        $('#responsebubble').jqm({onShow:myOpen});
        $('#responsebubble').jqmShow();
      }, 200);
    }
  }
  
  else if (val === 1) {
    while (!keyword) {
      keyword = prompt("What is the keyword?");
    }
    if (!conversations[convname][keyword]){
      conversations[convname][keyword] = {};
    }
    conversations[convname][keyword].flags = {};
    if (document.responseeditpopup.flags2.value) { 
      conversations[convname][keyword]["flags"][document.responseeditpopup.flags2.value] = document.responseeditpopup.flags2val.value;
    }
    conversations[convname][keyword].responses = [ document.responseeditpopup.response1.value , document.responseeditpopup.response2.value ];
    var triggers1 = {};
    var triggers2 = {};

    if (document.responseeditpopup.end_convo1.checked) {
      if (document.responseeditpopup.end_convo1_val.value) {
        triggers1.end_convo = document.responseeditpopup.end_convo1_val.value;
      } else { 
        triggers1.end_convo = 1;
      }
    }
    if (document.responseeditpopup.give_item1.checked) {
      if (document.responseeditpopup.item_given1.value) {
        triggers1.give_item = document.responseeditpopup.item_given1.value;
      } else {
        alert("Needs an item given for item_given1.");
        setTimeout(function() {var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
          $('#responsebubble').jqm({onShow:myOpen});
          $('#responsebubble').jqmShow();
        }, 200);
        return;
      }
    }
    if (document.responseeditpopup.give_gold1.checked) {
      if (document.responseeditpopup.gold_given1.value) {
        triggers1.give_gold = document.responseeditpopup.gold_given1.value;
      } else {
        alert("Needs an amount of gold given for gold_given1.");
        setTimeout(function() {var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
          $('#responsebubble').jqm({onShow:myOpen});
          $('#responsebubble').jqmShow();
        }, 200);
        return;
      }
    }
    if (document.responseeditpopup.give_karma1.checked) {
      if (document.responseeditpopup.karma_given1.value) {
        triggers1.give_karma = document.responseeditpopup.karma_given1.value;
      } else {
        alert("Needs an amount of karma given for karma_given1.");
        setTimeout(function() {var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
          $('#responsebubble').jqm({onShow:myOpen});
          $('#responsebubble').jqmShow();
        }, 200);
        return;
      }
    }
    if (document.responseeditpopup.give_xp1.checked) {
      if (document.responseeditpopup.xp_given1.value) {
        triggers1.give_xp = document.responseeditpopup.xp_given1.value;
      } else {
        alert("Needs an amount of xp given for xp_given1.");
        setTimeout(function() {var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
          $('#responsebubble').jqm({onShow:myOpen});
          $('#responsebubble').jqmShow();
        }, 200);
        return;
      }
    }
    if (document.responseeditpopup.take_item1.checked) {
      if (document.responseeditpopup.item_taken1.value) {
        triggers1.take_item = document.responseeditpopup.item_taken1.value;
      } else {
        alert("Needs an item given for item_taken1.");
        setTimeout(function() {var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
          $('#responsebubble').jqm({onShow:myOpen});
          $('#responsebubble').jqmShow();
        }, 200);
        return;
      }
    }
    if (document.responseeditpopup.set_flag1.checked) {
      if (document.responseeditpopup.flag_set1.value) {
        triggers1.set_flag = document.responseeditpopup.flag_set1.value;
      } else { 
        triggers1.set_flag = 1;
      }
    }
    if (document.responseeditpopup.set_yesno1.checked) {
     triggers1.yes_no = 1;
    }
    if (document.responseeditpopup.start_shop1.checked) {
     triggers1.start_shop = 1;
    }
    if (document.responseeditpopup.start_sell1.checked) {
     triggers1.start_sell = 1;
    }

    if (document.responseeditpopup.end_convo2.checked) {
      if (document.responseeditpopup.end_convo2_val.value) {
        triggers2.end_convo = document.responseeditpopup.end_convo2_val.value;
      } else { 
        triggers2.end_convo = 1;
      }
    }
    if (document.responseeditpopup.give_item2.checked) {
      if (document.responseeditpopup.item_given2.value) {
        triggers2.give_item = document.responseeditpopup.item_given2.value;
      } else {
        alert("Needs an item given for item_given2.");
        setTimeout(function() {var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
          $('#responsebubble').jqm({onShow:myOpen});
          $('#responsebubble').jqmShow();
        }, 200);
        return;
      }
    }
    if (document.responseeditpopup.give_gold2.checked) {
      if (document.responseeditpopup.gold_given2.value) {
        triggers2.give_gold = document.responseeditpopup.gold_given2.value;
      } else {
        alert("Needs an amount of gold given for gold_given2.");
        setTimeout(function() {var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
          $('#responsebubble').jqm({onShow:myOpen});
          $('#responsebubble').jqmShow();
        }, 200);
        return;
      }
    }
    if (document.responseeditpopup.give_karma2.checked) {
      if (document.responseeditpopup.karma_given2.value) {
        triggers2.give_karma = document.responseeditpopup.karma_given2.value;
      } else {
        alert("Needs an amount of karma given for karma_given2.");
        setTimeout(function() {var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
          $('#responsebubble').jqm({onShow:myOpen});
          $('#responsebubble').jqmShow();
        }, 200);
        return;
      }
    }
    if (document.responseeditpopup.give_xp2.checked) {
      if (document.responseeditpopup.xp_given2.value) {
        triggers2.give_xp = document.responseeditpopup.xp_given2.value;
      } else {
        alert("Needs an amount of xp given for xp_given2.");
        setTimeout(function() {var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
          $('#responsebubble').jqm({onShow:myOpen});
          $('#responsebubble').jqmShow();
        }, 200);
        return;
      }
    }
    if (document.responseeditpopup.take_item2.checked) {
      if (document.responseeditpopup.item_taken2.value) {
        triggers2.take_item = document.responseeditpopup.item_taken2.value;
      } else {
        alert("Needs an item given for item_taken2.");
        setTimeout(function() {var myOpen=function(hash){ hash.w.css('opacity',0.88).show(); };
          $('#responsebubble').jqm({onShow:myOpen});
          $('#responsebubble').jqmShow();
        }, 200);
        return;
      }
    }
    if (document.responseeditpopup.set_flag2.checked) {
      if (document.responseeditpopup.flag_set2.value) {
        triggers2.set_flag = document.responseeditpopup.flag_set2.value;
      } else { 
        triggers2.set_flag = 1;
      }
    }
    if (document.responseeditpopup.set_yesno2.checked) {
     triggers2.yes_no = 1;
    }
    if (document.responseeditpopup.start_shop2.checked) {
     triggers2.start_shop = 1;
    }
    if (document.responseeditpopup.start_sell2.checked) {
     triggers2.start_sell = 1;
    }
    
    conversations[convname][keyword].triggers = [ triggers1, triggers2 ];
    conversations[convname]._location = document.responseeditpopup.location.value; 
    
    select_conv();
  }
}

function saveconv() {
  var serialized = JSON.stringify(conversations);

  serialized = serialized.replace(/\\/g, "\\\\");
  
  serialized = serialized.replace(/\'/g, "\\'");
  //alert(serialized);
  var printerwin = window.open('','printarray');
  printerwin.document.writeln("var serialconv = '" + serialized + "';");
  printerwin.document.close();
  
  var deser = JSON.parse(serialized);
}

function validate() {
  $("#mainbody").html("<p>");
  $.each(conversations, function(idx,val) {
    var allgood = 1;
    $("#mainbody").html($("#mainbody").html() + "Processing " + idx + " in " + val['_location'] + "...");
    if (!val["_start"]) { 
      allgood = 0;
      $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>_start missing</span>");
    }
    if (!val["_confused"]) { 
      allgood = 0;
      $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>_confused missing</span>");
    }
    if (!val["name"]) { 
      allgood = 0;
      $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>name missing</span>");
    }
    if (!val["job"]) { 
      allgood = 0;
      $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>job missing</span>");
    }
    if (!val["bye"]) { 
      allgood = 0;
      $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>bye missing</span>");
    }
    if (!val["_location"]) { 
      allgood = 0;
      $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>_location missing</span>");
    }
    if (!val["look"]) { 
      allgood = 0;
      $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>look missing</span>");
    }
    if (val["bye"] && !val["bye"].triggers[1].end_convo && (!val["bye"].responses[1].match(/->/))) {
      allgood = 0;
      $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>Bye[1] missing end_convo</span>");
    }
    if (val["bye"] && val["bye"].responses[0] && !val["bye"].triggers[0].end_convo && (!val["bye"].responses[0].match(/->/))) {
      allgood = 0;
      $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>Bye[0] missing end_convo</span>");
    }
    
    $.each(val, function(idx2,val2) {
      if ((idx2 !== "_location") && (typeof val2 !== "function")) {
        if (val2.responses[0] && (Object.keys(val2.flags).length === 0)) { 
          $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>Keyword " + idx2 + " has no flag, response in wrong field. Repairing...</span>");
          val2.responses[1] = val2.responses[0];
          val2.responses[0] = "";
          val2.triggers[1] = val2.triggers[0];
          val2.triggers[0] = {};
          allgood = 0;
        }
        $.each(val2.flags, function(flagname, flagval) {
          if (flagval === "") {
            $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>Keyword " + idx2 + ", flag " + flagname + " has no value.</span>");
          }
        });
        $.each(val2.triggers[0], function(trigname, trigval) {
          if (((trigname === "end_convo") || (trigname === "give_item") || (trigname === "take_item") || (trigname === "set_flag")) && (trigval === "")) {
            $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>Keyword " + idx2 + ", trigger " + trigname + " has no value.</span>");
          }
        });
        $.each(val2.triggers[1], function(trigname, trigval) {
          if (((trigname === "end_convo") || (trigname === "give_item") || (trigname === "take_item") || (trigname === "set_flag")) && (trigval === "")) {
            $("#mainbody").html($("#mainbody").html() + "<br /> * <span style='color:red'>Keyword " + idx2 + ", trigger " + trigname + " has no value.</span>");
          }          
        });
      }
    });
    
    if (allgood) {
      $("#mainbody").html($("#mainbody").html() + "<span style='color:blue'>validated</span>.");
    }
    
    $("#mainbody").html($("#mainbody").html() + "<br />");
    
  });
}

function makescript() {
  var scriptpage = window.open("","_blank");
  var script = scriptpage.document;
  script.writeln("<html><head><title>Dark Unknown Transcript</title></head><body><table cellpadding='1' cellspacing='1' border='0'>");
  var locations = {};
  $.each(conversations, function(idx,val) {
    locations[val["_location"]] = 1;
  });
  
  $.each(locations, function(idx,val) {
    script.writeln("<tr><td colspan='3'>" + idx.toUpperCase() + "</td></tr>");
    $.each(conversations, function(convname, convdata) {
      if (idx === convdata._location) {
        script.writeln("<tr><td colspan='3'><br /><span style='text-decoration:underline'>" + convname.toUpperCase() + "</span>");
        if (convdata["_notes"]) {
          script.writeln("(" + convdata["_notes"].responses[1] + ")</td></tr>");
        } else {
          script.writeln("</td></tr>");
        }
        script.writeln(PrintDialogue(convdata, "_start"));
        script.writeln(PrintDialogue(convdata, "_confused"));
        script.writeln(PrintDialogue(convdata, "name"));
        script.writeln(PrintDialogue(convdata, "job"));
        $.each(convdata, function(convword, convresponce) {
          if (typeof convdata[convword] !== "function") {
            if ((convword !== "_start") && (convword !== "_confused") && (convword !== "name") && (convword !== "job") && (convword !== "bye") && (convword !== "_location") && (convword !== "_notes")) {
              script.writeln(PrintDialogue(convdata, convword));
            }
          }
        });
        script.writeln(PrintDialogue(convdata, "bye"));
        script.writeln(PrintDialogue(convdata, "look"));
        
      }
    });
  });
  script.close();
}

function PrintDialogue(speech, keyword) {
  //alert(keyword);
  var tmptxt = "";
  var keytype = "";
  var flag = "";
  $.each(speech[keyword].flags, function(idx,val) {
    keytype = idx;
    flag = val;
  });

  if (keytype) {
    var triggers = "";
    $.each(speech[keyword].triggers[0], function(idx, val) {
      triggers = triggers + idx + " " + "(" + val + ") ";
    });
    tmptxt = tmptxt + "<tr><td>" + keyword.toUpperCase() + "</td><td style='color:blue'>[flag unmet]</td><td>" + speech[keyword].responses[0] + "</td><td style='font-weight:bold'>" + triggers + "</td></tr>";
    triggers = "";
    $.each(speech[keyword].triggers[1], function(idx, val) {
      triggers = triggers + idx + " " + "(" + val + ") ";
    });
    tmptxt = tmptxt + "<tr><td></td><td style='color:blue'>"+ keytype + " : " + flag + "</td><td>" + speech[keyword].responses[1] + "</td><td style='font-weight:bold'>" + triggers + "</td></tr>";
  } else {
    var triggers = "";
    $.each(speech[keyword].triggers[1], function(idx, val) {
      triggers = triggers + idx + " " + "(" + val + ") ";
    });
    tmptxt = tmptxt + "<tr><td>" + keyword.toUpperCase() + "</td><td style='color:blue'></td><td>" + speech[keyword].responses[1] + "</td><td style='font-weight:bold'>" + triggers + "</td></tr>";
  }
  return tmptxt;

}
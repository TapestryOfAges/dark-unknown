"use strict";

let selectedquest;

function FillTitles() {
  let questtext = "<table cellpadding='0' cellspacing='0' border='1'>";
  for (let i=0;i<questlist.length;i++) {
    questtext += `<tr><td onclick='ClickQuest(${i})'>${questlist[i].name}</td></tr>`;
  }
  questtext += "</table>";

  document.getElementById("qtitles").innerHTML = questtext;
  document.getElementById("qtitles").style.overflowY = "auto"; 
}

function ClickQuest(which) {
  selectedquest = which;
  document.getElementById("qnum").innerHTML = which;
  document.getElementById("qtitle").value = questlist[which].name;
  let replaces = "";
  for (let i=0; i<questlist[which].replaces.length; i++) {
    if (replaces) { replaces += `,${questlist[which].replaces[i]}`; }
    else { replaces = `${questlist[which].replaces[i]}`; }
  }
  document.getElementById("qreplace").value = replaces;
  document.getElementById("qsource").value = questlist[which].source;
  document.getElementById("qlocation").value = questlist[which].location;
  document.getElementById("qtext").value = questlist[which].text;
  document.getElementById("qcomplete").value = questlist[which].completetext;
  document.getElementById("qtype").value = questlist[which].category;
}

function NewQuest() {
  let newq = new Quest([], "[New Quest]", "", "", "", "", "");
  questlist.push(newq);
  FillTitles();
}

function changeField(fieldname, htmlname) {
  if (fieldname === "replaces") {
    let repv = document.getElementById(htmlname).value;
    if (repv) {
      let repl = document.getElementById(htmlname).value.split(",");
      questlist[selectedquest][fieldname] = repl;
    } else { questlist[selectedquest][fieldname] = []; }
  } else {
    questlist[selectedquest][fieldname] = document.getElementById(htmlname).value;
  }
}

function SaveQuests() {
  let printerwin = window.open('','printarray');
  printerwin.document.writeln("let questlist = [];<br /><br />");
  for (let i=0; i<questlist.length; i++) {
    let repl = "[";
    for (let j=0; j<questlist[i].replaces.length; j++) {
      if (j) { repl += ","; }
      repl += questlist[i].replaces[j];
    }
    repl += "]";
    let txt = questlist[i].text;
    txt = txt.replace(/</g, '&lt;');
    txt = txt.replace(/>/g, '&gt;');
    let ctxt = questlist[i].completetext;
    ctxt = ctxt.replace(/</g, '&lt;');
    ctxt = ctxt.replace(/>/g, '&gt;');

    printerwin.document.writeln(`questlist[${i}] = new Quest(${repl}, "${questlist[i].name}", "${questlist[i].source}", "${questlist[i].location}", \`${txt}\`, \`${ctxt}\`, "${questlist[i].category}");<br />`);
  }
  printerwin.document.close();
}
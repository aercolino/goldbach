var styles = {
  Euclid: "border: thin dashed #C0C0C0; margin-top: 3pt; padding: 2pt 5pt 2pt 30pt; text-indent: -25pt",
  Partition: "border: 1pt ridge; margin-top: 3pt; padding: 2pt 5pt 2pt 30pt; text-indent: -25pt",
  Partition_Element: "",
  Partition_Group: "border: 1pt ridge; margin-top: 3pt; padding: 2pt 5pt 2pt 30pt; text-indent: -25pt"
};

var f;
document.addEventListener('DOMContentLoaded', () => {
  f = document.inputForm;
});

var euclidArray = [];
var thisResidue;
var thisModulus;
var thisTerms;
var thisEuclidSet;
var thisNumber;
var thisNumberTo;
var thisCount;
var lastID = -1;


function ShowInfo() {
  window.open(
    "xgc_js_info.html",
    "",
    "directory=no, menubar=no, location=no, scrollbars=yes, resizable=yes, toolbar=yes, width=600, height=400"
  );
}

function wizard(name, how) {
  if (document.getElementById) {
    var element = document.getElementById(name);
    element.style.visibility = how;
  }
}

function outputClear() {
  parent.outputFrame.document.location = "xgc_js_output.html";
}

function makeLink(lnkClass, lnkOnClick, lnkContent) {
  var lnkStyle = ' style="' + styles[lnkClass] + '"';
  lnkOnClick = ' onclick="' + lnkOnClick + '"';
  return (
    '<a href="#"' + lnkOnClick + lnkStyle + ">" + lnkContent + "</div>"
  );
}

function makeDiv(divClass, divId, divContent) {
  var divStyle = ' style="' + styles[divClass] + '"';
  divId = ' id="' + divId + '"';
  return "<div" + divId + divStyle + ">" + divContent + "</div>";
}

function outputWrite(html, gotoId) {
  var doc = parent.outputFrame.document;
  doc.writeln(html);
  doc.location = "#" + gotoId;
}

function EuclidSetID() {
  return "e" + thisEuclidSet;
}

function LastID() {
  return ++lastID;
}

function EuclidSetHeader(thisResidue, thisModulus, thisTerms) {
  return (
    "<b>Euclid( " +
    thisResidue +
    ", " +
    thisModulus +
    " )</b> |<sub>" +
    thisTerms +
    "</sub>"
  );
}

function addOption() {
  var select = f.EuclidSets;
  thisEuclidSet = select.options.length;
  label =
    thisEuclidSet +
    ":" +
    "    " +
    euclidArray[thisEuclidSet].residue +
    "    " +
    euclidArray[thisEuclidSet].modulus +
    "    (" +
    euclidArray[thisEuclidSet].terms +
    ")";
  select.options[thisEuclidSet] = new Option(label, thisEuclidSet);
  select.options[thisEuclidSet].selected = true;
}

function getSelectedOption() {
  var select = f.EuclidSets;
  for (var i = 0; i < select.options.length; i++)
    if (select.options[i].selected) return select.options[i];
  return false;
}

function getCurrentIndex() {
  var selected = getSelectedOption();
  return selected == false ? false : parseInt(selected.value);
}

function copyCurrent() {
  thisEuclidSet = getCurrentIndex();
  //  readFields();
  if (thisEuclidSet === false) return false;
  outputEuclidSet(euclidArray[thisEuclidSet], LastID());
}

function findCurrent() {
  thisEuclidSet = getCurrentIndex();
  //  readFields();
  if (thisEuclidSet === false) return false;
  parent.outputFrame.document.location = "#e" + thisEuclidSet;
}

function outputEuclidSet(euclidSet, id) {
  var header = EuclidSetHeader(
    euclidSet.residue,
    euclidSet.modulus,
    euclidSet.terms
  );
  var body = "" + euclidSet.values;
  outputWrite(makeDiv("Euclid", id, header + " = " + body), id);
}

function readFields() {
  thisEuclidSet = getCurrentIndex();
  if (thisEuclidSet !== false) {
    thisResidue = euclidArray[thisEuclidSet].residue;
    thisModulus = euclidArray[thisEuclidSet].modulus;
    thisTerms = euclidArray[thisEuclidSet].terms;
  }
  thisNumber = parseInt(f.inputNumber.value);
  thisNumberTo = parseInt(f.inputNumberTo.value);
  thisCount = parseInt(f.inputCount.value);
}

function EuclidSetCompute() {
  var thisResidue = parseInt(f.inputResidue.value);
  var thisModulus = parseInt(f.inputModulus.value);
  var thisTerms = parseInt(f.inputTerms.value);

  if (thisResidue + thisModulus * thisTerms < xgc_maxFactorable) {
    var euclidSet = new XGC_EuclidSet(
      thisResidue,
      thisModulus,
      thisTerms
    );
    euclidArray[euclidArray.length] = euclidSet;
    addOption();
    adjustFields("inputPartition");
    outputEuclidSet(euclidSet, EuclidSetID());
  } else {
    alert("Incorrect Euclid Set parameters.");
  }
}

function usingClause() {
  return (
    ' &nbsp;&nbsp; <nobr><font size="-1">using&nbsp;<a href="#' +
    EuclidSetID() +
    '">' +
    EuclidSetHeader(thisResidue, thisModulus, thisTerms) +
    "</a></font></nobr>"
  );
}

function PartitionLoop() {
  adjustFields("inputLoop");
  readFields();

  if (
    xgc_Divides(thisModulus, thisNumber) &&
    euclidArray[thisEuclidSet].values
  ) {
    var partition = new XGC_Partition(euclidArray[thisEuclidSet]);
    var id = LastID();
    var uClause = usingClause();
    var html = "";
    for (
      var number = thisNumber;
      number <= thisNumberTo;
      number += thisModulus
    ) {
      var html2 =
        "<b>" + number + "</b> = +" + partition.get(number) + uClause;
      html += makeDiv("Partition_Element", "", html2);
    }

    outputWrite(makeDiv("Partition_Group", id, html), id);
  } else {
    alert("Incorrect Partition parameters.");
  }
}

function PartitionCompute() {
  readFields();

  if (
    xgc_Divides(thisModulus, thisNumber) &&
    euclidArray[thisEuclidSet].values
  ) {
    var partition = new XGC_Partition(euclidArray[thisEuclidSet]);
    var id = LastID();
    var uClause = usingClause();
    var number = thisNumber;
    var html2 =
      "<b>" + number + "</b> = +" + partition.get(number) + uClause;

    outputWrite(makeDiv("Partition", id, html2), id);
  } else {
    alert("Incorrect Partition parameters.");
  }
}

function adjustFields(choice) {
  readFields();
  switch (choice) {
    case "inputCount":
      f.inputCount.value = (thisNumberTo - thisNumber) / thisModulus + 1;
      break;
    case "inputLoop":
      f.inputCount.value = thisCount <= 0 ? 5 : thisCount;
      f.inputNumberTo.value = thisNumber + thisModulus * (thisCount - 1);
      break;
    case "inputNumberTo":
      f.inputNumberTo.value = (thisCount - 1) * thisModulus + thisNumber;
      break;
    case "inputPartition":
      f.inputNumber.value = (thisResidue + thisModulus) * thisModulus;
      f.inputCount.value = thisCount <= 0 ? 5 : thisCount;
      f.inputNumberTo.value = thisNumber + thisModulus * (thisCount - 1);
      break;
  }
}

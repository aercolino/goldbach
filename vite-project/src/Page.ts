import { xgc_maxFactorable, XGC_EuclidSet, xgc_Divides, XGC_Partition } from './XGC';

const styles = {
  Euclid: "border: thin dashed #C0C0C0; margin-top: 3pt; padding: 2pt 5pt 2pt 30pt; text-indent: -25pt",
  Partition: "border: 1pt ridge; margin-top: 3pt; padding: 2pt 5pt 2pt 30pt; text-indent: -25pt",
  Partition_Element: "",
  Partition_Group: "border: 1pt ridge; margin-top: 3pt; padding: 2pt 5pt 2pt 30pt; text-indent: -25pt"
};

let f;
document.addEventListener('DOMContentLoaded', () => {
  f = document.inputForm;
});

const euclidArray = [];
let thisResidue;
let thisModulus;
let thisTerms;
let thisEuclidSet;
let thisNumber;
let thisNumberTo;
let thisCount;
let lastID = -1;

window.Page = {};

window.Page.ShowInfo = function ShowInfo() {
  window.open(
    "xgc_js_info.html",
    "",
    "directory=no, menubar=no, location=no, scrollbars=yes, resizable=yes, toolbar=yes, width=600, height=400"
  );
}

window.Page.outputClear = function outputClear() {
  parent.outputFrame.document.location = "xgc_js_output.html";
}

function makeDiv(divClass, divId, divContent) {
  const divStyle = ' style="' + styles[divClass] + '"';
  divId = ' id="' + divId + '"';
  return "<div" + divId + divStyle + ">" + divContent + "</div>";
}

function outputWrite(html, gotoId) {
  const doc = parent.outputFrame.document;
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
  const select = f.EuclidSets;
  thisEuclidSet = select.options.length;
  const label =
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
  const select = f.EuclidSets;
  for (let i = 0; i < select.options.length; i++)
    if (select.options[i].selected) return select.options[i];
  return false;
}

function getCurrentIndex() {
  const selected = getSelectedOption();
  return selected == false ? false : parseInt(selected.value);
}

window.Page.copyCurrent = function copyCurrent() {
  thisEuclidSet = getCurrentIndex();
  //  readFields();
  if (thisEuclidSet === false) return false;
  outputEuclidSet(euclidArray[thisEuclidSet], LastID());
}

window.Page.findCurrent = function findCurrent() {
  thisEuclidSet = getCurrentIndex();
  //  readFields();
  if (thisEuclidSet === false) return false;
  parent.outputFrame.document.location = "#e" + thisEuclidSet;
}

function outputEuclidSet(euclidSet, id) {
  const header = EuclidSetHeader(
    euclidSet.residue,
    euclidSet.modulus,
    euclidSet.terms
  );
  const body = "" + euclidSet.values;
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

window.Page.EuclidSetCompute = function EuclidSetCompute() {
  const thisResidue = parseInt(f.inputResidue.value);
  const thisModulus = parseInt(f.inputModulus.value);
  const thisTerms = parseInt(f.inputTerms.value);

  if (thisResidue + thisModulus * thisTerms < xgc_maxFactorable) {
    const euclidSet = new XGC_EuclidSet(
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

window.Page.PartitionLoop = function PartitionLoop() {
  adjustFields("inputLoop");
  readFields();

  if (
    xgc_Divides(thisModulus, thisNumber) &&
    euclidArray[thisEuclidSet].values
  ) {
    const partition = new XGC_Partition(euclidArray[thisEuclidSet]);
    const id = LastID();
    const uClause = usingClause();
    let html = "";
    for (
      let number = thisNumber;
      number <= thisNumberTo;
      number += thisModulus
    ) {
      const html2 =
        "<b>" + number + "</b> = +" + partition.get(number) + uClause;
      html += makeDiv("Partition_Element", "", html2);
    }

    outputWrite(makeDiv("Partition_Group", id, html), id);
  } else {
    alert("Incorrect Partition parameters.");
  }
}

window.Page.PartitionCompute = function PartitionCompute() {
  readFields();

  if (
    xgc_Divides(thisModulus, thisNumber) &&
    euclidArray[thisEuclidSet].values
  ) {
    const partition = new XGC_Partition(euclidArray[thisEuclidSet]);
    const id = LastID();
    const uClause = usingClause();
    const number = thisNumber;
    const html2 =
      "<b>" + number + "</b> = +" + partition.get(number) + uClause;

    outputWrite(makeDiv("Partition", id, html2), id);
  } else {
    alert("Incorrect Partition parameters.");
  }
}

const adjustFields = window.Page.adjustFields = function adjustFields(choice) {
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

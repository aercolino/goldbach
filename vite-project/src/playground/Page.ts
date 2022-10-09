import { xgc_maxFactorable, XGC_Array, XGC_EuclidSet, xgc_Divides, XGC_Partition } from './XGC';

const styles: Record<string, string> = {
  Euclid: "border: thin dashed #C0C0C0; margin-top: 3pt; padding: 2pt 5pt 2pt 30pt; text-indent: -25pt",
  Partition: "border: 1pt ridge; margin-top: 3pt; padding: 2pt 5pt 2pt 30pt; text-indent: -25pt",
  Partition_Element: "",
  Partition_Group: "border: 1pt ridge; margin-top: 3pt; padding: 2pt 5pt 2pt 30pt; text-indent: -25pt"
};

let f: HTMLFormElement;
document.addEventListener('DOMContentLoaded', () => {
  f = document.forms.inputForm as HTMLFormElement;
});

const euclidArray: XGC_EuclidSet[] = [];
let thisResidue: number;
let thisModulus: number;
let thisTerms: number;
let thisEuclidSet = -1;
let thisNumber: number;
let thisNumberTo: number;
let thisCount: number;
let lastID = -1;

function makeDiv(divClass: string, divId: string, divContent: string) {
  const divStyle = ' style="' + styles[divClass] + '"';
  divId = ' id="' + divId + '"';
  return "<div" + divId + divStyle + ">" + divContent + "</div>";
}

function outputWrite(html: string, gotoId: string) {
  const doc = (parent.outputFrame as Window).document;
  doc.writeln(html);
  doc.location = "#" + gotoId;
}

function EuclidSetID() {
  return `e${thisEuclidSet}`;
}

function LastID() {
  return ++lastID;
}

function EuclidSetHeader(thisResidue: number, thisModulus: number, thisTerms: number) {
  return `<b>Euclid(${thisResidue}, ${thisModulus})</b> |<sub>${thisTerms}</sub>`;
}

function addOption() {
  const select = f.EuclidSets as HTMLSelectElement;
  thisEuclidSet = select.options.length;
  const set = euclidArray[thisEuclidSet];
  const label = `${thisEuclidSet}: Euclid(${set.residue}, ${set.modulus}) | ${set.terms}`;
  select.options[thisEuclidSet] = new Option(label, thisEuclidSet);
  select.options[thisEuclidSet].selected = true;
}

function getSelectedOption() {
  const select = f.EuclidSets as HTMLSelectElement;
  for (let i = 0; i < select.options.length; i++)
    if (select.options[i].selected) return select.options[i];
  return false;
}

function getCurrentIndex() {
  const selected = getSelectedOption();
  return selected == false ? false : parseInt(selected.value);
}

function outputEuclidSet(euclidSet: XGC_EuclidSet, id: string) {
  const header = EuclidSetHeader(
    euclidSet.residue,
    euclidSet.modulus,
    euclidSet.terms
  );
  const body = `${String(euclidSet.values)}`;
  outputWrite(makeDiv("Euclid", id, header + " = " + body), id);
}

function readFields() {
  thisEuclidSet = getCurrentIndex();
  if (thisEuclidSet !== false) {
    thisResidue = euclidArray[thisEuclidSet].residue;
    thisModulus = euclidArray[thisEuclidSet].modulus;
    thisTerms = euclidArray[thisEuclidSet].terms;
  }
  thisNumber = parseInt((f.inputNumber as HTMLInputElement).value);
  thisNumberTo = parseInt((f.inputNumberTo as HTMLInputElement).value);
  thisCount = parseInt((f.inputCount as HTMLInputElement).value);
}

function formatPartition(result: number, sum: XGC_Array | undefined | false) {
  let sumString: string;
  if (sum instanceof XGC_Array) {
    sumString = sum.values.join(' + ');
  } else {
    sumString = String(sum);
  }
  const header = EuclidSetHeader(thisResidue, thisModulus, thisTerms);
  const using = `<nobr><font size="-1">using&nbsp;<a href="#${EuclidSetID()}">${header}</a></font></nobr>`;
  return `<b>${result}</b> = ${sumString} &nbsp;&nbsp; ${using}`;
}


const Page = {
  ShowInfo() {
    window.open(
      "xgc_js_info.html",
      "",
      "directory=no, menubar=no, location=no, scrollbars=yes, resizable=yes, toolbar=yes, width=600, height=400"
    );
  },

  outputClear() {
    (parent.outputFrame as Window).document.location = "xgc_js_output.html";
  },

  copyCurrent() {
    thisEuclidSet = getCurrentIndex();
    //  readFields();
    if (thisEuclidSet === false) return false;
    outputEuclidSet(euclidArray[thisEuclidSet], LastID());
  },

  findCurrent() {
    thisEuclidSet = getCurrentIndex();
    //  readFields();
    if (thisEuclidSet === false) return false;
    (parent.outputFrame as Window).document.location = `#${EuclidSetID()}`;
  },

  EuclidSetCompute() {
    const thisResidue = parseInt((f.inputResidue as HTMLInputElement).value);
    const thisModulus = parseInt((f.inputModulus as HTMLInputElement).value);
    const thisTerms = parseInt((f.inputTerms as HTMLInputElement).value);
  
    if (thisResidue + thisModulus * thisTerms < xgc_maxFactorable) {
      const euclidSet = new XGC_EuclidSet(
        thisResidue,
        thisModulus,
        thisTerms
      );
      euclidArray[euclidArray.length] = euclidSet;
      addOption();
      this.adjustFields("inputPartition");
      outputEuclidSet(euclidSet, EuclidSetID());
    } else {
      alert("Incorrect Euclid Set parameters.");
    }
  },

  PartitionLoop() {
    this.adjustFields("inputLoop");
    readFields();
  
    if (
      xgc_Divides(thisModulus, thisNumber) &&
      euclidArray[thisEuclidSet].values
    ) {
      const partition = new XGC_Partition(euclidArray[thisEuclidSet]);
      const id = LastID();
      let html = "";
      for (
        let number = thisNumber;
        number <= thisNumberTo;
        number += thisModulus
      ) {
        const html2 = formatPartition(number, partition.get(number));
        html += makeDiv("Partition_Element", "", html2);
      }
  
      outputWrite(makeDiv("Partition_Group", id, html), id);
    } else {
      alert("Incorrect Partition parameters.");
    }
  },

  PartitionCompute() {
    readFields();
  
    if (
      xgc_Divides(thisModulus, thisNumber) &&
      euclidArray[thisEuclidSet].values
    ) {
      const partition = new XGC_Partition(euclidArray[thisEuclidSet]);
      const id = LastID();
      const number = thisNumber;
      const html2 = formatPartition(number, partition.get(number));
  
      outputWrite(makeDiv("Partition", id, html2), id);
    } else {
      alert("Incorrect Partition parameters.");
    }
  },

  adjustFields(choice) {
    readFields();
    switch (choice) {
      case "inputCount":
        (f.inputCount as HTMLInputElement).value = (thisNumberTo - thisNumber) / thisModulus + 1;
        break;
      case "inputLoop":
        (f.inputCount as HTMLInputElement).value = thisCount <= 0 ? 5 : thisCount;
        (f.inputNumberTo as HTMLInputElement).value = thisNumber + thisModulus * (thisCount - 1);
        break;
      case "inputNumberTo":
        (f.inputNumberTo as HTMLInputElement).value = (thisCount - 1) * thisModulus + thisNumber;
        break;
      case "inputPartition":
        (f.inputNumber as HTMLInputElement).value = (thisResidue + thisModulus) * thisModulus;
        (f.inputCount as HTMLInputElement).value = thisCount <= 0 ? 5 : thisCount;
        (f.inputNumberTo as HTMLInputElement).value = thisNumber + thisModulus * (thisCount - 1);
        break;
    }
  }
};

window.Page = Page;

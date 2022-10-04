window.onload = function dc_Init() {
  var x = document.getElementsByTagName('dt');
  for( var i = 0; i < x.length; i++ ) {
    var y = x[i].nextSibling.firstChild;
    if( y.tagName == "PRE" ) {
      x[i].onclick = dc_Toggle;
      x[i].title = "click here to show the Mathematica code";
      x[i].style.color = "red";
      y.style.display = 'none';
    }
  }
}

function dc_ThisElement( event ) {
  if (!event) var event = window.event;
  if (event.target) var thisElement = event.target;
  else if (event.srcElement) var thisElement = event.srcElement;
  while (thisElement.nodeType != 1) // Safari GRRRRRRRRRR
    thisElement = thisElement.parentNode;
  return thisElement;
}

function dc_Toggle() {
  var tagDT_B_NOBR = dc_ThisElement( ( arguments.length > 0 ) ? arguments[0] : false );
  var tagDT_B = tagDT_B_NOBR.parentNode;
  var tagDT = tagDT_B.parentNode;
  var tagDD = tagDT.nextSibling;
  var tagDD_NOBR = tagDD.firstChild;
  if( tagDD_NOBR.style.display == 'none' ) {
    tagDD_NOBR.style.display = 'block';
    tagDT_B_NOBR.style.color = 'black';
    tagDT_B_NOBR.title = "click here to hide the Mathematica code";
  } else {
    tagDD_NOBR.style.display = 'none';
    tagDT_B_NOBR.style.color = 'red';
    tagDT_B_NOBR.title = "click here to show the Mathematica code";
  }
}

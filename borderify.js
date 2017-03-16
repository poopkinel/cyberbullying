var debug = true;
var redBorder = "5px solid red";
var postClassName = "userContentWrapper _5pcr";

var elementsInView = getElementsInView();
if (debug) {
	for (var i in elementsInView) { 
	elementsInView[i].style.border = redBorder; 
	}
}

function getElementsInView() {
	var result = []
	var elems = document.getElementsByTagName('div');
	for (var i = 0; i < elems.length; i++) {
		var current = elems[i];
		if (current.className == postClassName && CheckPosition(current)) {
			result.push(current);
		}
	}
	return result;
}

function CheckPosition(current){
	return current.getBoundingClientRect().top < window.innerHeight && current.getBoundingClientRect().bottom > 0;
}
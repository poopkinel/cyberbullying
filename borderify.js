var debug = true;
var redBorder = "5px solid red";
var postClassName = "userContentWrapper _5pcr";
var commercialIdentifier = "<span class=\"_m8d\">Suggested Post</span>";
var commercialIdentifierHebrew = "<span class=\"_m8d\">הצעה לפרסום</span>";

var elementsInView = getElementsInView();

function getElementsInView() {
	var result = []
	var elems = document.getElementsByTagName('div');
	for (var i = 0; i < elems.length; i++) {
		var current = elems[i];
		if (current.className == postClassName && CheckPosition(current) && !isCommercial(current)) {
			exportElementToFile(current, "c:/tmp/newfile.txt");
			var analysis = analyzeElement(current);
			result.push(analysis);
			if (debug) {
				current.style.border = redBorder;
				visualizeAnalysis(analysis);
			}
		}
	}
	return result;
}

function exportElementToFile(current, "c:/tmp/newfile.txt") {
	
}

function isCommercial(elem) {
	return elem.innerHTML.includes(commercialIdentifier) || elem.innerHTML.includes(commercialIdentifierHebrew);
}

function CheckPosition(current){
	return current.getBoundingClientRect().top < window.innerHeight && current.getBoundingClientRect().bottom > 0;
}

function analyzeElement(elem) {
	var result = {};
	result["time"] = extractTimestamp(elem);
	result["publisher"] = extractPublisher(elem);
	result["type"] = classifyContentType(elem);
	return result;
}

function classifyContentType(elem) {
	if (elem.getElementsByTagName("video").length > 0) 
		return "video";
	if (elem.getElementsByClassName("_5ine").length > 0 && elem.getElementsByClassName("_5ine")[0].href && elem.getElementsByClassName("_5ine")[0].href.includes("/events/")) 
		return "event";
	if (elem.getElementsByClassName("_6m2 _1zpr clearfix _dcs _4_w4 _59ap").length > 0) return "link";
	if (elem.getElementsByClassName("profileLink").length == 3 && elem.getElementsByClassName("profileLink")[2].href.includes("/photos/"))
		return "image";
	if (elem.getElementsByClassName("_5x46").length == 1)
		return "status";
		
	return "unknown";
}

function extractPublisher(elem) {
	var publisherElement = elem.getElementsByTagName("a")[2];
	return {
		"name": publisherElement.innerText,
		"url": publisherElement.href
	}
}

function extractTimestamp(elem) {
	return elem.getElementsByTagName("abbr")[0].attributes["title"].value;
}

function visualizeAnalysis(analysis) {
	var div = document.createElement("div");
	div.id = "debugDiv";
	div.style.right = "0";
	div.height = "100%";
	div.width = "200px";
	div.style.top = "6%";
	div.style.position = "fixed";
	div.style.background = "white";
	div.style.zIndex = "301";
	div.innerText = JSON.stringify(analysis);
	var innerDiv = document.createElement("div");
	innerDiv.style.background = "red";
	innerDiv.style.zIndex = "301";
	innerDiv.style.height = "20%";
	innerDiv.style.width = "100%";
	div.appendChild(innerDiv);
	
	document.body.appendChild(div);
}
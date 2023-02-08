// JavaScript Document


// function idPanels() {
// 	panels = document.getElementsByClassName('panel');
// 	pIds = newArray();
// 	for (i = 0; i < panels.length; i++) {
// 		pIds[i].id = "id=" + panels[i] + 1;
// 		//alert(pIds[3].id);
// 		return pIds[i].id;
// 	}
// }


var figs = document.getElementsByTagName('figcaption');
var capText = new Array();

function figNums() {
	var figs = document.getElementsByTagName('figcaption');
	//alert (figs.length);

	for (i = 0; i < figs.length; i++) {
		capText[i] = figs[i].childNodes[0].nodeValue; //.text;
		figs[i].innerHTML = "Figure " + (i + 1) + ". " + capText[i];
	}
}

var panels = document.getElementsByClassName("panel");

function togDoc(panels) {
	panels = document.getElementsByClassName("panel");
	pIndex = panels[i].value;
}


function togPanel(id) {
	//var panels = document.getElementsByClassName("panel");
	//idPanels();


	panel = document.getElementById(id);
	//pIndex = panel[i];

	//alert(pIndex);
	//for (i=0; i<panel.length; i++) {
	if (panel.style.display == "") {
		panel.style.display = "none";
	} else {
		panel.style.display = "";
	}
	//}
}


function togSect(id) {
	section = document.getElementById(id);
	if (section.style.display == "") {
		section.style.display = "none";
	} else {
		section.style.display = "";
	}
}


function togSub(id) {
	subSects = document.getElementById(id);
	if (subSects.style.display == "") {
		subSects.style.display = "none";
	} else {
		subSects.style.display = "";
	}
}

function hideSects() {
	section = document.getElementsByClassName('section');
	for (i = 0; i < section.length; i++) {
		section[i].style.display = "none";
	}
}

function hidePanels() {
	panel = document.getElementsByClassName('panel');
	for (i = 0; i < panel.length; i++) {
		panel[i].style.display = "none";
	}
}

function hideAll() {
	hidePanels();
	hideSects();
}


function showPanels() {
	panel = document.getElementsByClassName('panel');
	for (i = 0; i < panel.length; i++) {
		panel[i].style.display = "";
	}
}

function showSects() {
	section = document.getElementsByClassName('section');
	for (i = 0; i < section.length; i++) {
		section[i].style.display = "";
	}
}

function showAll() {
	showPanels();
	showSects();
}

// window.onload = hideAll;
document.addEventListener('DOMContentLoaded',hideAll);
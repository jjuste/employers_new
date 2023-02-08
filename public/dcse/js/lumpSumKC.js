/* Lump Sum Withholding Calculator
  
*/

var form = document.getElementById("iexcalc");


function addDeducts() {
	var form = document.getElementById("iexcalc");
	var fed = parseFloat(form.fedtax.value);
	var ss = parseFloat(form.sstax.value);
	var med = parseFloat(form.medtax.value);
	var state = parseFloat(form.statetax.value);
	var city = parseFloat(form.citytax.value);
	var pension = parseFloat(form.pension.value);
	var totalDeducts = (fed + ss + med + state + city + pension).toFixed(2);
	form.deduct.value = totalDeducts;
}


function calcAdwe() {
	addDeducts();
	var form = document.getElementById("iexcalc");
	var deducts = parseFloat(form.deduct.value);
	var gross = parseFloat(form.grosspay.value);
	var Adwe = (gross - deducts).toFixed(2);
	form.adwe.value = Adwe;
}

function persServSw(selectedCycle) {
	var form = document.getElementById("iexcalc");

	var choice = selectedCycle.value;

	form.pers_Service.value = selectedCycle.value;

	var arrearsF = document.getElementById("twelvePlus");
	var ccpaSect = document.getElementById("CCPAsection");

	if (choice == "No") {
		arrearsF.classList.add('hidden');
		ccpaSect.classList.add('hidden');
	} else if (choice == "Yes") {
		arrearsF.classList.remove('hidden');
		ccpaSect.classList.remove('hidden');
	}
}


function employFam(selectedCycle) {
	var form = document.getElementById("iexcalc");
	form.other_fam.value = selectedCycle.value;
}


function employAdd(selectedCycle) {
	var form = document.getElementById("iexcalc");
	form.arrears.value = selectedCycle.value;
}

function getCCPAPers() {
	var form = document.getElementById("iexcalc");
	var persOpt = form.pers_Service.value;
	var arrears = form.arrears.value;

	if (persOpt == "Yes" && arrears == "No") {
		form.ccpa.value = 0.50.toFixed(2);
	} else if (persOpt == "Yes" && arrears == "Yes") {
		form.ccpa.value = 0.55;
	} else {
		alert("Please make selections");
	}
}


function getMax(adwe, ccpa) {
	getCCPAPers();

	var form = document.getElementById("iexcalc");
	var disposIn = parseFloat(form.adwe.value);
	var Ccpa = form.ccpa.value;
	if (Ccpa == "" | Ccpa == null) {
		alert("Please make selections for the CCPA value"); //added to force completion
	}
	var maxW = (disposIn * Ccpa).toFixed(2);
	form.max.value = maxW;
}


var IE = document.all ? true : false;
var DOM = document.addEventListener ? true : false;

function eventSource(e) {
	if (IE) return event.srcElement;
	else if (DOM) return e.currentTarget;
}


function getNotesNum(selectedCycle) {
	var form = document.getElementById("iexcalc");
	form.notesNum.value = selectedCycle.value;
}

function showNotices() {
	var form = document.getElementById("iexcalc");
	var notice2 = [document.getElementById("iwo2"), document.getElementById("alloc2")];
	var notice3 = [document.getElementById("iwo3"), document.getElementById("alloc3")];
	var notice4 = [document.getElementById("iwo4"), document.getElementById("alloc4")];
	var notice5 = [document.getElementById("iwo5"), document.getElementById("alloc5")];

	var noticesNum = form.notesNum.value;

	for (i = 0; i < 2; i++) {
		// if (noticesNum == 1) {}
		if (noticesNum == 2) {
			notice2[i].classList.remove('hidden');
		} else if (noticesNum == 3) {
			notice2[i].classList.remove('hidden');
			notice3[i].classList.remove('hidden');
		} else if (noticesNum == 4) {
			notice2[i].classList.remove('hidden');
			notice3[i].classList.remove('hidden');
			notice4[i].classList.remove('hidden');
		} else if (noticesNum == 5) {
			notice2[i].classList.remove('hidden');
			notice3[i].classList.remove('hidden');
			notice4[i].classList.remove('hidden');
			notice5[i].classList.remove('hidden');
		}
	}
}

function hideNotices() {
	var form = document.getElementById("iexcalc");
	var notice2 = [document.getElementById("iwo2"), document.getElementById("alloc2")];
	var notice3 = [document.getElementById("iwo3"), document.getElementById("alloc3")];
	var notice4 = [document.getElementById("iwo4"), document.getElementById("alloc4")];
	var notice5 = [document.getElementById("iwo5"), document.getElementById("alloc5")];

	for (i = 0; i < 2; i++) {
		notice2[i].classList.add('hidden');
		notice3[i].classList.add('hidden');
		notice4[i].classList.add('hidden');
		notice5[i].classList.add('hidden');
	}
	form.notesNum.value = "";
}


function totalOrdered() {
	var form = document.getElementById("iexcalc");

	var arrAmt = form.allArrears.value;

	var totalPastDue = 0;

	var totalNotes = 0;


	var pastdue = new Array();
	pastdue[0] = parseFloat(form.totalN1.value);
	pastdue[1] = parseFloat(form.totalN2.value);
	pastdue[2] = parseFloat(form.totalN3.value);
	pastdue[3] = parseFloat(form.totalN4.value);
	pastdue[4] = parseFloat(form.totalN5.value);

	var notice = new Array();
	notice[0] = form.notice1;
	notice[1] = form.notice2;
	notice[2] = form.notice3;
	notice[3] = form.notice4;
	notice[4] = form.notice5;


	for (var i = 0; i < 5; i++) {
		totalNotes = totalNotes + pastdue[i];
	}

	form.ordTotalA.value = (totalNotes).toFixed(2);

	if (form.ordTotalA.value != arrAmt) {
		alert("Totals do not match Arrears total, above. Please check your entries");
		form.allArrears.classList.add("invalid");
		form.ordTotalA.classList.add("invalid");
		form.ordTotalA.focus();
	} else {
		form.allArrears.classList.remove("invalid");
		form.ordTotalA.classList.remove("invalid");
		form.ordTotalA.value = (totalNotes).toFixed(2);
	}


} //end totalOrdered 



function twoPlace(value, n) {
	return Math.floor(Math.pow(10, n) * value) / Math.pow(10, n);
}


function lumpCalcWithhold() {

	var form = document.getElementById("iexcalc");

	var payAmt = form.adwe.value;

	var persOpt = form.pers_Service.value;

	var arrAmt = form.allArrears.value;

	var orderTotal = parseFloat(form.ordTotalA.value); //changing today, 18MAR20, 10:39 AM

	var maxW = parseFloat(form.max.value);

	var pDue = [0, parseFloat(form.totalN1.value), parseFloat(form.totalN2.value), parseFloat(form.totalN3.value), parseFloat(form.totalN4.value), parseFloat(form.totalN5.value)];

	var n_total = [0, form.totalN1.value, form.totalN2.value, form.totalN3.value, form.totalN4.value, form.totalN5.value];

	var w_total = [0, form.w_total1, form.w_total2, form.w_total3, form.w_total4, form.w_total5];

	var totalW = 0;

	if (orderTotal != arrAmt) {
		alert("Totals do not match Arrears total, above. Your results will not be correct until the total arrears are correct.");
	}

	for (i = 1; i < 6; i++) {

		if (persOpt == "Yes") {

			if (orderTotal > maxW || orderTotal > arrAmt) {
				w_total[i].value = parseFloat(((pDue[i] / orderTotal) * maxW)).toFixed(2);
			} else {
				w_total[i].value = parseFloat(pDue[i]).toFixed(2);
			}

			totalW = totalW + parseFloat(w_total[i].value);
		} else if (persOpt == "No") {
			if (orderTotal > payAmt || orderTotal > arrAmt) {
				w_total[i].value = parseFloat(((pDue[i] / orderTotal) * payAmt)).toFixed(2);
			} else {
				w_total[i].value = parseFloat(pDue[i]).toFixed(2);
			}

			totalW = totalW + parseFloat(w_total[i].value);
		}

	} //end for loop

	form.totalremit.value = parseFloat(totalW).toFixed(2);

	form.totalwithholding.value = parseFloat(totalW).toFixed(2);
	//}


} // end LcalcWithhold
// JavaScript Document
function getNotesNum(selectedCycle) {
	var form = document.getElementById("enfCheck");
	form.notesNum.value = selectedCycle.value;
}

function showNotices() {
	var form = document.getElementById("enfCheck");
	var notice2 = document.getElementById("note2");
	var notice3 = document.getElementById("note3");
	var notice4 = document.getElementById("note4");
	var notice5 = document.getElementById("note5");

	var noticesNum = form.notesNum.value;

	if (noticesNum == 2) {
		notice2.classList.remove('hidden');
	} else if (noticesNum == 3) {
		notice2.classList.remove('hidden');
		notice3.classList.remove('hidden');
	} else if (noticesNum == 4) {
		notice2.classList.remove('hidden');
		notice3.classList.remove('hidden');
		notice4.classList.remove('hidden');
	} else if (noticesNum == 5) {
		notice2.classList.remove('hidden');
		notice3.classList.remove('hidden');
		notice4.classList.remove('hidden');
		notice5.classList.remove('hidden');
	}
}

function hideNotices() {
	var form = document.getElementById("enfCheck");
	var notice2 = document.getElementById("note2");
	var notice3 = document.getElementById("note3");
	var notice4 = document.getElementById("note4");
	var notice5 = document.getElementById("note5");

	notice2.classList.add('hidden');
	notice3.classList.add('hidden');
	notice4.classList.add('hidden');
	notice5.classList.add('hidden');

	form.notesNum.value = "";
}


function convertMon(num) {
	var form = document.getElementById("enfCheck");

	var Ordchoice = [0, form.convert1.value, form.convert2.value, form.convert3.value, form.convert4.value, form.convert5.value];
	var order = [0, form.order1, form.order2, form.order3, form.order4, form.order5];
	var res = [0, form.res1, form.res2, form.res3, form.res4, form.res5];

	for (num = 1; num < 6; num++) {

		if (Ordchoice[num] == "week_month") {
			res[num].value = (order[num].value * 52 / 12).toFixed(2);
		} else if (Ordchoice[num] == "bi_month") {
			res[num].value = (order[num].value * 26 / 12).toFixed(2);
		} else if (Ordchoice[num] == "semi_month") {
			res[num].value = (order[num].value * 24 / 12).toFixed(2);
		} else if (Ordchoice[num] == "No_conversion") {
			res[num].value = parseFloat(order[num].value).toFixed(2);
		} else {
			res[num].value = parseFloat(order[num].value).toFixed(2);
		}
	}
}

function totalMons() {
	convertMon(1);
	convertMon(2);
	convertMon(3);
	convertMon(4);
	convertMon(5);

	var form = document.getElementById("enfCheck");

	var mon1 = parseFloat(form.res1.value);
	var mon2 = parseFloat(form.res2.value);
	var mon3 = parseFloat(form.res3.value);
	var mon4 = parseFloat(form.res4.value);
	var mon5 = parseFloat(form.res5.value);

	var total = (mon1 + mon2 + mon3 + mon4 + mon5).toFixed(2);

	form.totalM.value = total;

}

function compareAct() {
	var form = document.getElementById("enfCheck");

	var newline = "\n";

	var arrears = parseFloat(form.arrears.value);
	var mTotal = parseFloat(form.totalM.value);

	var ratio = (arrears / mTotal).toFixed(2);

	if (ratio >= 4 && arrears >= 2500) {
		form.act.value = "Your driver license may be suspended" + newline + "You may be reported to the Department of Taxation and Finance" + newline + "You may be subject to a lien" + newline + "Professional, recreational or other licenses may be suspended" + newline + "Your passport may be denied" + newline + "Your financial assets may be frozen" + newline + "You may be reported to credit bureaus" + newline + "Your federal and state tax refunds may be intercepted" + newline + "Your lottery prize may be intercepted";
	} else if (ratio >= 4) {
		form.act.value = "Your driver license may be suspended" + newline + "You may be reported to the Department of Taxation and Finance" + newline + "You may be subject to a lien" + newline + "Professional, recreational or other licenses may be suspended" + newline + "Your financial assets may be frozen" + newline + "You may be reported to credit bureaus" + newline + "Your federal and state tax refunds may be intercepted" + newline + "Your lottery prize may be intercepted";
	} else if ((ratio >= 2) && (arrears >= 150 && arrears <= 1000)) {
		form.act.value = "You may be reported to credit bureaus" + newline + "Your financial assets may be frozen" + newline + "Your federal and state tax refunds may be intercepted" + newline + "Your lottery prize may be intercepted";
	} else if ((arrears >= 2500) && (ratio <= 2)) {
		form.act.value = "Your passport may be denied" + newline + "You may be reported to credit bureaus" + newline + "Your financial assets may be frozen" + newline + "Your federal and state tax refunds may be intercepted" + newline + "Your lottery prize may be intercepted";
	} else if (arrears >= 2500 && ratio >= 2) {
		form.act.value = "Your passport may be denied" + newline + "You may be reported to credit bureaus" + newline + "Your financial assets may be frozen" + newline + "Your federal and state tax refunds may be intercepted" + newline + "Your lottery prize may be intercepted";
	} else if (arrears >= 1000 || ratio >= 2) {
		form.act.value = "You may be reported to credit bureaus" + newline + "Your financial assets may be frozen" + newline + "Your federal and state tax refunds may be intercepted" + newline + "Your lottery prize may be intercepted";
	} else if (ratio <= 2 && arrears >= 300) {
		form.act.value = "Your financial assets may be frozen" + newline + "Your federal and state tax refunds may be intercepted" + newline + "Your lottery prize may be intercepted";
	} else if (ratio <= 2 && arrears >= 150) {
		form.act.value = "Your federal and state tax refunds may be intercepted" + newline + "Your lottery prize may be intercepted";
	} else if (arrears >= 50 && ratio <= 2) {
		form.act.value = "Your state tax refunds may be intercepted" + newline + "Your lottery prize may be intercepted";
	} else {
		form.act.value = "No actions will be taken at this time";
	}
}

function setFieldLimit() {
	$("[id^=order]").attr("maxlength", 13);
	$("#arrears").attr("maxlength", 13);
	$("#act").attr("maxlength", 200);
}
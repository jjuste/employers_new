// JavaScript Document

/*
Function list

convertPay
converts amounts at ordered frequency to amounts for employer's pay cycle for each IWO

noteTotal
displays converted amounts for each type of support and adds total converted amounts for each IWO

*/


function convertPay(num) {
	var form = document.getElementById("iexcalc");

	var Cchoice = [0, form.convert_curr1.value, form.convert_curr2.value, form.convert_curr3.value, form.convert_curr4.value, form.convert_curr5.value];
	var current = [0, form.current1, form.current2, form.current3, form.current4, form.current5];
	var ocurrent = [0, form.ocurrent1, form.ocurrent2, form.ocurrent3, form.ocurrent4, form.ocurrent5];

	//var Cchoice1 = form.convert_curr1.value;

	for (num = 1; num < 6; num++) {

		if (Cchoice[num] == "week_bi") {
			current[num].value = (ocurrent[num].value * 52 / 26).toFixed(2);
		} else if (Cchoice[num] == "week_semi") {
			current[num].value = (ocurrent[num].value * 52 / 24).toFixed(2);
		} else if (Cchoice[num] == "week_month") {
			current[num].value = (ocurrent[num].value * 52 / 12).toFixed(2);
		} else if (Cchoice[num] == "bi_week") {
			current[num].value = (ocurrent[num].value * 26 / 52).toFixed(2);
		} else if (Cchoice[num] == "bi_semi") {
			current[num].value = (ocurrent[num].value * 26 / 24).toFixed(2);
		} else if (Cchoice[num] == "bi_month") {
			current[num].value = (ocurrent[num].value * 26 / 12).toFixed(2);
		} else if (Cchoice[num] == "semi_week") {
			current[num].value = (ocurrent[num].value * 24 / 52).toFixed(2);
		} else if (Cchoice[num] == "semi_bi") {
			current[num].value = (ocurrent[num].value * 24 / 26).toFixed(2);
		} else if (Cchoice[num] == "semi_month") {
			current[num].value = (ocurrent[num].value * 24 / 12).toFixed(2);
		} else if (Cchoice[num] == "month_week") {
			current[num].value = (ocurrent[num].value * 12 / 52).toFixed(2);
		} else if (Cchoice[num] == "month_bi") {
			current[num].value = (ocurrent[num].value * 12 / 26).toFixed(2);
		} else if (Cchoice[num] == "month_semi") {
			current[num].value = (ocurrent[num].value * 12 / 24).toFixed(2);
		} else {
			current[num].value = parseFloat(ocurrent[num].value).toFixed(2);
		}

		var PDchoice = [0, form.convert_pdue1.value, form.convert_pdue2.value, form.convert_pdue3.value, form.convert_pdue4.value, form.convert_pdue5.value];
		var pastdue = [0, form.pastdue1, form.pastdue2, form.pastdue3, form.pastdue4, form.pastdue5];
		var opdadd = [0, form.opdadd1, form.opdadd2, form.opdadd3, form.opdadd4, form.opdadd5];

		if (PDchoice[num] == "week_bi") {
			pastdue[num].value = (opdadd[num].value * 52 / 26).toFixed(2);
		} else if (PDchoice[num] == "week_semi") {
			pastdue[num].value = (opdadd[num].value * 52 / 24).toFixed(2);
		} else if (PDchoice[num] == "week_month") {
			pastdue[num].value = (opdadd[num].value * 52 / 12).toFixed(2);
		} else if (PDchoice[num] == "bi_week") {
			pastdue[num].value = (opdadd[num].value * 26 / 52).toFixed(2);
		} else if (PDchoice[num] == "bi_semi") {
			pastdue[num].value = (opdadd[num].value * 26 / 24).toFixed(2);
		} else if (PDchoice[num] == "bi_month") {
			pastdue[num].value = (opdadd[num].value * 26 / 12).toFixed(2);
		} else if (PDchoice[num] == "semi_week") {
			pastdue[num].value = (opdadd[num].value * 24 / 52).toFixed(2);
		} else if (PDchoice[num] == "semi_bi") {
			pastdue[num].value = (opdadd[num].value * 24 / 26).toFixed(2);
		} else if (PDchoice[num] == "semi_month") {
			pastdue[num].value = (opdadd[num].value * 24 / 12).toFixed(2);
		} else if (PDchoice[num] == "month_week") {
			pastdue[num].value = (opdadd[num].value * 12 / 52).toFixed(2);
		} else if (PDchoice[num] == "month_bi") {
			pastdue[num].value = (opdadd[num].value * 12 / 26).toFixed(2);
		} else if (PDchoice[num] == "month_semi") {
			pastdue[num].value = (opdadd[num].value * 12 / 24).toFixed(2);
		} else {
			pastdue[num].value = parseFloat(opdadd[num].value).toFixed(2);
		}

		var CMedchoice = [0, form.convert_currmed1.value, form.convert_currmed2.value, form.convert_currmed3.value, form.convert_currmed4a.value, form.convert_currmed5.value];

		//alert(CMedchoice[num]);

		var currmed = [0, form.currmed1, form.currmed2, form.currmed3, form.currmed4a, form.currmed5];

		var ocurrmed = [0, form.ocurrmed1, form.ocurrmed2, form.ocurrmed3, form.ocurrmed4a, form.ocurrmed5];

		if (CMedchoice[num] == "week_bi") {
			currmed[num].value = (ocurrmed[num].value * 52 / 26).toFixed(2);
		} else if (CMedchoice[num] == "week_semi") {
			currmed[num].value = (ocurrmed[num].value * 52 / 24).toFixed(2);
		} else if (CMedchoice[num] == "week_month") {
			currmed[num].value = (ocurrmed[num].value * 52 / 12).toFixed(2);
		} else if (CMedchoice[num] == "bi_week") {
			currmed[num].value = (ocurrmed[num].value * 26 / 52).toFixed(2);
		} else if (CMedchoice[num] == "bi_semi") {
			currmed[num].value = (ocurrmed[num].value * 26 / 24).toFixed(2);
		} else if (CMedchoice[num] == "bi_month") {
			currmed[num].value = (ocurrmed[num].value * 26 / 12).toFixed(2);
		} else if (CMedchoice[num] == "semi_week") {
			currmed[num].value = (ocurrmed[num].value * 24 / 52).toFixed(2);
		} else if (CMedchoice[num] == "semi_bi") {
			currmed[num].value = (ocurrmed[num].value * 24 / 26).toFixed(2);
		} else if (CMedchoice[num] == "semi_month") {
			currmed[num].value = (ocurrmed[num].value * 24 / 12).toFixed(2);
		} else if (CMedchoice[num] == "month_week") {
			currmed[num].value = (ocurrmed[num].value * 12 / 52).toFixed(2);
		} else if (CMedchoice[num] == "month_bi") {
			currmed[num].value = (ocurrmed[num].value * 12 / 26).toFixed(2);
		} else if (CMedchoice[num] == "month_semi") {
			currmed[num].value = (ocurrmed[num].value * 12 / 24).toFixed(2);
		} else {
			currmed[num].value = parseFloat(ocurrmed[num].value).toFixed(2);
		}


		var PMedchoice = [0, form.convert_pduemed1.value, form.convert_pduemed2.value, form.convert_pduemed3.value, form.convert_pduemed4a.value, form.convert_pduemed5.value];
		var pastduemed = [0, form.pastduemed1, form.pastduemed2, form.pastduemed3, form.pastduemed4a, form.pastduemed5];
		var opastduemed = [0, form.opastduemed1, form.opastduemed2, form.opastduemed3, form.opastduemed4a, form.opastduemed5];

		if (PMedchoice[num] == "week_bi") {
			pastduemed[num].value = (opastduemed[num].value * 52 / 26).toFixed(2);
		} else if (PMedchoice[num] == "week_semi") {
			pastduemed[num].value = (opastduemed[num].value * 52 / 24).toFixed(2);
		} else if (PMedchoice[num] == "week_month") {
			pastduemed[num].value = (opastduemed[num].value * 52 / 12).toFixed(2);
		} else if (PMedchoice[num] == "bi_week") {
			pastduemed[num].value = (opastduemed[num].value * 26 / 52).toFixed(2);
		} else if (PMedchoice[num] == "bi_semi") {
			pastduemed[num].value = (opastduemed[num].value * 26 / 24).toFixed(2);
		} else if (PMedchoice[num] == "bi_month") {
			pastduemed[num].value = (opastduemed[num].value * 26 / 12).toFixed(2);
		} else if (PMedchoice[num] == "semi_week") {
			pastduemed[num].value = (opastduemed[num].value * 24 / 52).toFixed(2);
		} else if (PMedchoice[num] == "semi_bi") {
			pastduemed[num].value = (opastduemed[num].value * 24 / 26).toFixed(2);
		} else if (PMedchoice[num] == "semi_month") {
			pastduemed[num].value = (opastduemed[num].value * 24 / 12).toFixed(2);
		} else if (PMedchoice[num] == "month_week") {
			pastduemed[num].value = (opastduemed[num].value * 12 / 52).toFixed(2);
		} else if (PMedchoice[num] == "month_bi") {
			pastduemed[num].value = (opastduemed[num].value * 12 / 26).toFixed(2);
		} else if (PMedchoice[num] == "month_semi") {
			pastduemed[num].value = (opastduemed[num].value * 12 / 24).toFixed(2);
		} else {
			pastduemed[num].value = parseFloat(opastduemed[num].value).toFixed(2);
		}

		var CSpouschoice = [0, form.convert_currspous1.value, form.convert_currspous2.value, form.convert_currspous3.value, form.convert_currspous4.value, form.convert_currspous5.value];
		var currspous = [0, form.currspous1, form.currspous2, form.currspous3, form.currspous4, form.currspous5];
		var ocurrspous = [0, form.ocurrspous1, form.ocurrspous2, form.ocurrspous3, form.ocurrspous4, form.ocurrspous5];

		if (CSpouschoice[num] == "week_bi") {
			currspous[num].value = (ocurrspous[num].value * 52 / 26).toFixed(2);
		} else if (CSpouschoice[num] == "week_semi") {
			currspous[num].value = (ocurrspous[num].value * 52 / 24).toFixed(2);
		} else if (CSpouschoice[num] == "week_month") {
			currspous[num].value = (ocurrspous[num].value * 52 / 12).toFixed(2);
		} else if (CSpouschoice[num] == "bi_week") {
			currspous[num].value = (ocurrspous[num].value * 26 / 52).toFixed(2);
		} else if (CSpouschoice[num] == "bi_semi") {
			currspous[num].value = (ocurrspous[num].value * 26 / 24).toFixed(2);
		} else if (CSpouschoice[num] == "bi_month") {
			currspous[num].value = (ocurrspous[num].value * 26 / 12).toFixed(2);
		} else if (CSpouschoice[num] == "semi_week") {
			currspous[num].value = (ocurrspous[num].value * 24 / 52).toFixed(2);
		} else if (CSpouschoice[num] == "semi_bi") {
			currspous[num].value = (ocurrspous[num].value * 24 / 26).toFixed(2);
		} else if (CSpouschoice[num] == "semi_month") {
			currspous[num].value = (ocurrspous[num].value * 24 / 12).toFixed(2);
		} else if (CSpouschoice[num] == "month_week") {
			currspous[num].value = (ocurrspous[num].value * 12 / 52).toFixed(2);
		} else if (CSpouschoice[num] == "month_bi") {
			currspous[num].value = (ocurrspous[num].value * 12 / 26).toFixed(2);
		} else if (CSpouschoice[num] == "month_semi") {
			currspous[num].value = (ocurrspous[num].value * 12 / 24).toFixed(2);
		} else {
			currspous[num].value = parseFloat(ocurrspous[num].value).toFixed(2);
		}

		var PSpouschoice = [0, form.convert_pdspous1.value, form.convert_pdspous2.value, form.convert_pdspous3.value, form.convert_pdspous4.value, form.convert_pdspous5.value];

		var pastduespous = [0, form.pastduespous1, form.pastduespous2, form.pastduespous3, form.pastduespous4, form.pastduespous5];
		var opastduespous = [0, form.opastduespous1, form.opastduespous2, form.opastduespous3, form.opastduespous4, form.opastduespous5];

		if (PSpouschoice[num] == "week_bi") {
			pastduespous[num].value = (opastduespous[num].value * 52 / 26).toFixed(2);
		} else if (PSpouschoice[num] == "week_semi") {
			pastduespous[num].value = (opastduespous[num].value * 52 / 24).toFixed(2);
		} else if (PSpouschoice[num] == "week_month") {
			pastduespous[num].value = (opastduespous[num].value * 52 / 12).toFixed(2);
		} else if (PSpouschoice[num] == "bi_week") {
			pastduespous[num].value = (opastduespous[num].value * 26 / 52).toFixed(2);
		} else if (PSpouschoice[num] == "bi_semi") {
			pastduespous[num].value = (opastduespous[num].value * 26 / 24).toFixed(2);
		} else if (PSpouschoice[num] == "bi_month") {
			pastduespous[num].value = (opastduespous[num].value * 26 / 12).toFixed(2);
		} else if (PSpouschoice[num] == "semi_week") {
			pastduespous[num].value = (opastduespous[num].value * 24 / 52).toFixed(2);
		} else if (PSpouschoice[num] == "semi_bi") {
			pastduespous[num].value = (opastduespous[num].value * 24 / 26).toFixed(2);
		} else if (PSpouschoice[num] == "semi_month") {
			pastduespous[num].value = (opastduespous[num].value * 24 / 12).toFixed(2);
		} else if (PSpouschoice[num] == "month_week") {
			pastduespous[num].value = (opastduespous[num].value * 12 / 52).toFixed(2);
		} else if (PSpouschoice[num] == "month_bi") {
			pastduespous[num].value = (opastduespous[num].value * 12 / 26).toFixed(2);
		} else if (PSpouschoice[num] == "month_semi") {
			pastduespous[num].value = (opastduespous[num].value * 12 / 24).toFixed(2);
		} else {
			pastduespous[num].value = parseFloat(opastduespous[num].value).toFixed(2);
		}

		var Otherchoice = [0, form.convert_other1.value, form.convert_other2.value, form.convert_other3.value, form.convert_other4.value, form.convert_other5.value];
		var other = [0, form.other1, form.other2, form.other3, form.other4, form.other5];
		var OrdOther = [0, form.OrdOther1, form.OrdOther2, form.OrdOther3, form.OrdOther4, form.OrdOther5];

		if (Otherchoice[num] == "week_bi") {
			other[num].value = (OrdOther[num].value * 52 / 26).toFixed(2);
		} else if (Otherchoice[num] == "week_semi") {
			other[num].value = (OrdOther[num].value * 52 / 24).toFixed(2);
		} else if (Otherchoice[num] == "week_month") {
			other[num].value = (OrdOther[num].value * 52 / 12).toFixed(2);
		} else if (Otherchoice[num] == "bi_week") {
			other[num].value = (OrdOther[num].value * 26 / 52).toFixed(2);
		} else if (Otherchoice[num] == "bi_semi") {
			other[num].value = (OrdOther[num].value * 26 / 24).toFixed(2);
		} else if (Otherchoice[num] == "bi_month") {
			other[num].value = (OrdOther[num].value * 26 / 12).toFixed(2);
		} else if (Otherchoice[num] == "semi_week") {
			other[num].value = (OrdOther[num].value * 24 / 52).toFixed(2);
		} else if (Otherchoice[num] == "semi_bi") {
			other[num].value = (OrdOther[num].value * 24 / 26).toFixed(2);
		} else if (Otherchoice[num] == "semi_month") {
			other[num].value = (OrdOther[num].value * 24 / 12).toFixed(2);
		} else if (Otherchoice[num] == "month_week") {
			other[num].value = (OrdOther[num].value * 12 / 52).toFixed(2);
		} else if (Otherchoice[num] == "month_bi") {
			other[num].value = (OrdOther[num].value * 12 / 26).toFixed(2);
		} else if (Otherchoice[num] == "month_semi") {
			other[num].value = (OrdOther[num].value * 12 / 24).toFixed(2);
		} else {
			other[num].value = parseFloat(OrdOther[num].value).toFixed(2);
		}
	} // end for loop
}


function noteTotal(num) {

	convertPay(num);

	var form = document.getElementById("iexcalc");

	var order = [0, form.notice1, form.notice2, form.notice3, form.notice4, form.notice5];

	var noteFields = [0,

		[parseFloat(form.current1.value), parseFloat(form.pastdue1.value), parseFloat(form.currmed1.value), parseFloat(form.pastduemed1.value), parseFloat(form.currspous1.value), parseFloat(form.pastduespous1.value), parseFloat(form.other1.value)],

		[parseFloat(form.current2.value), parseFloat(form.pastdue2.value), parseFloat(form.currmed2.value), parseFloat(form.pastduemed2.value), parseFloat(form.currspous2.value), parseFloat(form.pastduespous2.value), parseFloat(form.other2.value)],

		[parseFloat(form.current3.value), parseFloat(form.pastdue3.value), parseFloat(form.currmed3.value), parseFloat(form.pastduemed3.value), parseFloat(form.currspous3.value), parseFloat(form.pastduespous3.value), parseFloat(form.other3.value)],

		[parseFloat(form.current4.value), parseFloat(form.pastdue4.value), parseFloat(form.currmed4a.value), parseFloat(form.pastduemed4a.value), parseFloat(form.currspous4.value), parseFloat(form.pastduespous4.value), parseFloat(form.other4.value)],

		[parseFloat(form.current5.value), parseFloat(form.pastdue5.value), parseFloat(form.currmed5.value), parseFloat(form.pastduemed5.value), parseFloat(form.currspous5.value), parseFloat(form.pastduespous5.value), parseFloat(form.other5.value)]
	];


	for (num = 1; num < 6; num++) {

		var noticeTotal = 0;

		for (j = 0; j < 7; j++) {
			//var noticeTotal = 0;
			noticeTotal += noteFields[num][j];
		}

		//alert("Total for "+num+" equals "+noticeTotal);

		order[num].value = noticeTotal.toFixed(2);
	}
}
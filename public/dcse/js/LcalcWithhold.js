// JavaScript Document

/*
Function list

twoPlace
forces the result to be rounded down to 2 decimal places

LcalcWithhold
calculates allocated withholding for each notice and total amount to withhold according to New York State priorities (current, health insurance, arrears)

*/

function twoPlace(value, n) {
	return Math.floor(Math.pow(10, n) * value) / Math.pow(10, n);
}

function LcalcWithhold() {

	var form = document.getElementById("iexcalc");
	var wtotal = 0;
	var hiprem = parseFloat(form.hipremium.value);
	var orderTotal = parseFloat(form.total_order.value);
	var totalCurrent = parseFloat(form.total_current.value);
	var totalAdd = parseFloat(form.total_add.value);
	var maxHi = parseFloat(form.max.value) + parseFloat(form.hipremium.value);

	var maxW = parseFloat(form.max.value);

	var diff = (maxW - (totalCurrent + hiprem)).toFixed(2);
	var diff2 = (maxW - totalCurrent);


	var current = [0, parseFloat(form.current1.value) + parseFloat(form.currmed1.value) + parseFloat(form.currspous1.value), parseFloat(form.current2.value) + parseFloat(form.currmed2.value) + parseFloat(form.currspous2.value), parseFloat(form.current3.value) + parseFloat(form.currmed3.value) + parseFloat(form.currspous3.value), parseFloat(form.current4.value) + parseFloat(form.currmed4a.value) + parseFloat(form.currspous4.value), parseFloat(form.current5.value) + parseFloat(form.currmed5.value) + parseFloat(form.currspous5.value)];


	var pdadd = [0, parseFloat(form.other1.value) + parseFloat(form.pastdue1.value) + parseFloat(form.pastduemed1.value) + parseFloat(form.pastduespous1.value), parseFloat(form.other2.value) + parseFloat(form.pastdue2.value) + parseFloat(form.pastduemed2.value) + parseFloat(form.pastduespous2.value), parseFloat(form.other3.value) + parseFloat(form.pastdue3.value) + parseFloat(form.pastduemed3.value) + parseFloat(form.pastduespous3.value), parseFloat(form.other4.value) + parseFloat(form.pastdue4.value) + parseFloat(form.pastduemed4a.value) + parseFloat(form.pastduespous4.value), parseFloat(form.other5.value) + parseFloat(form.pastdue5.value) + parseFloat(form.pastduemed5.value) + parseFloat(form.pastduespous5.value)];

	var n_total = [0, form.notice1.value, form.notice2.value, form.notice3.value, form.notice4.value, form.notice5.value];

	var w_total = [0, form.w_total1, form.w_total2, form.w_total3, form.w_total4, form.w_total5];

	var w_current = [0, form.w_current1, form.w_current2, form.w_current3, form.w_current4, form.w_current5];

	var w_add = [0, form.w_add1, form.w_add2, form.w_add3, form.w_add4, form.w_add5];

	//twoPlace is applied only to calculated (prorated) values and as of 29APR14 only to the total values

	for (i = 1; i < 6; i++) {

		if (orderTotal + hiprem > maxW && totalCurrent + hiprem > maxW && totalCurrent > maxW) {
			w_total[i].value = twoPlace((n_total[i] / orderTotal * maxW), 2).toFixed(2);
			w_current[i].value = parseFloat(current[i] / totalCurrent * maxW).toFixed(2);
			w_add[i].value = "0.00";
		} else if (orderTotal + hiprem > maxW && totalCurrent + hiprem > maxW && orderTotal < maxW) {
			w_total[i].value = parseFloat(n_total[i]).toFixed(2);
			w_current[i].value = parseFloat(current[i]).toFixed(2);
			w_add[i].value = parseFloat(pdadd[i]).toFixed(2);
		} else if (orderTotal + hiprem > maxW && totalCurrent + hiprem <= maxW) {
			w_total[i].value = twoPlace((current[i] + pdadd[i]), 2).toFixed(2);
			w_current[i].value = (current[i]).toFixed(2);
			w_add[i].value = parseFloat(pdadd[i] / totalAdd * diff).toFixed(2);
		} else if (orderTotal + hiprem > maxW && totalCurrent + hiprem > maxW && totalCurrent < maxW) {
			w_total[i].value = twoPlace((current[i] + pdadd[i]), 2).toFixed(2);
			w_current[i].value = (current[i]).toFixed(2);
			w_add[i].value = parseFloat(pdadd[i] / totalAdd * diff2).toFixed(2);
		} else {

			w_total[i].value = n_total[i];
			w_current[i].value = parseFloat(current[i]).toFixed(2);
			w_add[i].value = parseFloat(pdadd[i]).toFixed(2);
		}

		w_total[i].value = (parseFloat(w_current[i].value) + parseFloat(w_add[i].value)).toFixed(2);


		wtotal = wtotal + parseFloat(w_total[i].value);

	} //end for loop

	form.totalremit.value = wtotal.toFixed(2);
	if (maxW >= (totalCurrent + parseFloat(form.hipremium.value))) {
		form.withholdHIns.value = parseFloat(form.hipremium.value).toFixed(2);
		form.totalwithholding.value = (wtotal + parseFloat(form.hipremium.value)).toFixed(2);
	} else {
		form.withholdHIns.value = "0.00";
		form.totalwithholding.value = wtotal.toFixed(2);
	}

} // end LcalcWithhold
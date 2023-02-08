/* Income Withholding Calculator


Function list

  paycycle
  populates pay cycle fields with user's initial selection from dropdown menu
  
  addDeducts 
  totals allowed deductions from gross pay
  
  calcAdwe 
  calculates the disposable earnings (ADWE); gross pay minus allowed deductions

  employFam 
  gets input from first factor for CCPA--other dependents

  employAdd 
  gets input for second factor for CCPA--arrears over 12 weeks

  getCCPA 
  returns correct percentage for CCPA limitation, based on other dependents and arrears status inputs

  getMax 
  calculates maximum withholding allowed by CCPA (disposable income * CCPA percentage)
  
  getNotesNum
  gets number of notices selected to display
  
  showNotices
  displays fields for number of notices selected
  
  hideNotices
  hides fields for additional notices (reselect)
  
  sumOrds
  adds the total of all IWOs to compare to Maximum withholding (the shortcut, if you're lucky)
  
  quickCheck
  compares total of all IWOs to Maximum and displays dialog saying to continue with prorations or calculation is complete
  

  totalOrdered 
  after paycycle conversion calculates the total ordered withholding, the sum from all notices or orders to withhold 
  
  twoPlace 
  forces the result to be rounded down to 2 decimal places
  
*/

var form = document.getElementById("iexcalc");


function paycycle(selectedCycle) {
  var form = document.getElementById("iexcalc");
  form.freq1.value = selectedCycle.value;
  form.freq2.value = selectedCycle.value;
}

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


function iwoDate(selectedCycle) {
  var famField = document.getElementById("twoFam");
  var form = document.getElementById("iexcalc");

  form.all_Four.value = selectedCycle.value;

  famNum();

}


function employFam(selectedCycle) {
  var form = document.getElementById("iexcalc");
  form.other_fam.value = selectedCycle.value;
}


function employAdd(selectedCycle) {
  var form = document.getElementById("iexcalc");
  form.arrears.value = selectedCycle.value;
}


function famNum() {
  var form = document.getElementById("iexcalc");
  var famField = document.getElementById("twoFam");
  var all4pct = form.all_Four.value;

  if (all4pct == "No") {
    famField.style.display = "";
    //alert("Show it!");
  } else {
    famField.style.display = "none";
    //alert("Not here!");
  }
}



function getCCPA() {
  var form = document.getElementById("iexcalc");
  var famField = document.getElementById("twoFam");

  var all4pct = form.all_Four.value;
  //alert(all4pct);

  var otherfam = form.other_fam.value;
  var arrears = form.arrears.value;


  if (all4pct == "No") {
    famNum();
  }

  if (all4pct == "No" && otherfam == "Yes" && arrears == "Yes") {
    form.ccpa.value = 0.55;
  } else if (all4pct == "No" && otherfam == "Yes" && arrears == "No") {
    form.ccpa.value = 0.50.toFixed(2);
  } else if (all4pct == "No" && otherfam == "No" && arrears == "No") {
    form.ccpa.value = 0.60.toFixed(2);
  } else if (all4pct == "No" && otherfam == "No" && arrears == "Yes") {
    form.ccpa.value = 0.65;
  } else if (all4pct == "Yes" && arrears == "No") {
    form.ccpa.value = 0.50.toFixed(2);
  } else if (all4pct == "Yes" && arrears == "Yes") {
    form.ccpa.value = 0.55;
  } else {
    alert("Please make selections");
  }

}


function getMax(adwe, ccpa) {
  getCCPA();

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
  var notice1 = [document.getElementById("iwo1"), document.getElementById("note1"), document.getElementById("alloc1")];
  var notice2 = [document.getElementById("iwo2"), document.getElementById("note2"), document.getElementById("alloc2")];
  var notice3 = [document.getElementById("iwo3"), document.getElementById("note3"), document.getElementById("alloc3")];
  var notice4 = [document.getElementById("iwo4"), document.getElementById("note4"), document.getElementById("alloc4")];
  var notice5 = [document.getElementById("iwo5"), document.getElementById("note5"), document.getElementById("alloc5")];

  var noticesNum = form.notesNum.value;

  for (i = 0; i < 3; i++) {
    if (noticesNum == 1) {}
    if (noticesNum == 2) {
      notice2[i].style.display = "";
    } else if (noticesNum == 3) {
      notice2[i].style.display = "";
      notice3[i].style.display = "";
    } else if (noticesNum == 4) {
      notice2[i].style.display = "";
      notice3[i].style.display = "";
      notice4[i].style.display = "";
    } else if (noticesNum == 5) {
      notice2[i].style.display = "";
      notice3[i].style.display = "";
      notice4[i].style.display = "";
      notice5[i].style.display = "";
    }

  }
}

function hideNotices() {
  var form = document.getElementById("iexcalc");
  var notice1 = [document.getElementById("iwo1"), document.getElementById("note1"), document.getElementById("alloc1")];
  var notice2 = [document.getElementById("iwo2"), document.getElementById("note2"), document.getElementById("alloc2")];
  var notice3 = [document.getElementById("iwo3"), document.getElementById("note3"), document.getElementById("alloc3")];
  var notice4 = [document.getElementById("iwo4"), document.getElementById("note4"), document.getElementById("alloc4")];
  var notice5 = [document.getElementById("iwo5"), document.getElementById("note5"), document.getElementById("alloc5")];

  for (i = 0; i < 3; i++) {
    notice2[i].style.display = "none";
    notice3[i].style.display = "none";
    notice4[i].style.display = "none";
    notice5[i].style.display = "none";
  }
  form.notesNum.value = "";
}


function sumOrds() {
  var form = document.getElementById("iexcalc");

  var not1 = parseFloat(form.totalN1.value);
  var not2 = parseFloat(form.totalN2.value);
  var not3 = parseFloat(form.totalN3.value);
  var not4 = parseFloat(form.totalN4.value);
  var not5 = parseFloat(form.totalN5.value);

  var hiprem = parseFloat(form.hipremA.value);

  var sumAll = (not1 + not2 + not3 + not4 + not5 + hiprem).toFixed(2);

  form.ordTotalA.value = sumAll;

}

function quickCheck() {
  sumOrds();
  var form = document.getElementById("iexcalc");

  var maxW = parseFloat(form.max.value);
  var hiprem = parseFloat(form.hipremA.value);


  var totalAll = form.ordTotalA.value;

  if (totalAll < maxW) {
    form.totalwithholding.value = totalAll;
    form.withholdHIns.value = hiprem.toFixed(2);
    form.totalremit.value = (totalAll - hiprem).toFixed(2);
    alert("Your calculation is complete. Withhold the full ordered amounts. See the amounts to withhold and remit at the bottom of this page.");
  } else {
    alert("Continue with the detailed pro-rata calculations, below.");
  }
  form.hipremium.value = hiprem.toFixed(2); //new today, 23APR14, to write value below

}


function totalOrdered() {
  var form = document.getElementById("iexcalc");
  var totalCurrent = 0;
  var totalPastDue = 0;
  var totalCurrMed = 0;
  var totalPastDueMed = 0;
  var totalCurrSpous = 0;
  var totalPastDueSpous = 0;
  var totalAdd = 0;
  var totalN = 0;


  var current = new Array();
  current[0] = parseFloat(form.current1.value);
  current[1] = parseFloat(form.current2.value);
  current[2] = parseFloat(form.current3.value);
  current[3] = parseFloat(form.current4.value);
  current[4] = parseFloat(form.current5.value);

  var pastdue = new Array();
  pastdue[0] = parseFloat(form.pastdue1.value);
  pastdue[1] = parseFloat(form.pastdue2.value);
  pastdue[2] = parseFloat(form.pastdue3.value);
  pastdue[3] = parseFloat(form.pastdue4.value);
  pastdue[4] = parseFloat(form.pastdue5.value);

  var currmed = new Array();
  currmed[0] = parseFloat(form.currmed1.value);
  currmed[1] = parseFloat(form.currmed2.value);
  currmed[2] = parseFloat(form.currmed3.value);
  currmed[3] = parseFloat(form.currmed4a.value);
  currmed[4] = parseFloat(form.currmed5.value);


  var pastduemed = new Array();
  pastduemed[0] = parseFloat(form.pastduemed1.value);
  pastduemed[1] = parseFloat(form.pastduemed2.value);
  pastduemed[2] = parseFloat(form.pastduemed3.value);
  pastduemed[3] = parseFloat(form.pastduemed4a.value);
  pastduemed[4] = parseFloat(form.pastduemed5.value);

  var currspous = new Array();
  currspous[0] = parseFloat(form.currspous1.value);
  currspous[1] = parseFloat(form.currspous2.value);
  currspous[2] = parseFloat(form.currspous3.value);
  currspous[3] = parseFloat(form.currspous4.value);
  currspous[4] = parseFloat(form.currspous5.value);

  var pastduespous = new Array();
  pastduespous[0] = parseFloat(form.pastduespous1.value);
  pastduespous[1] = parseFloat(form.pastduespous2.value);
  pastduespous[2] = parseFloat(form.pastduespous3.value);
  pastduespous[3] = parseFloat(form.pastduespous4.value);
  pastduespous[4] = parseFloat(form.pastduespous5.value);

  var add = new Array();
  add[0] = parseFloat(form.other1.value);
  add[1] = parseFloat(form.other2.value);
  add[2] = parseFloat(form.other3.value);
  add[3] = parseFloat(form.other4.value);
  add[4] = parseFloat(form.other5.value);


  var notice = new Array();
  notice[0] = form.notice1;
  notice[1] = form.notice2;
  notice[2] = form.notice3;
  notice[3] = form.notice4;
  notice[4] = form.notice5;


  for (var i = 0; i < 5; i++) {
    totalCurrent = totalCurrent + current[i] + totalCurrMed + currmed[i] + totalCurrSpous + currspous[i];
    totalAdd = totalAdd + add[i] + totalPastDue + pastdue[i] + totalPastDueMed + pastduemed[i] + totalPastDueSpous + pastduespous[i];

  }

  for (var i = 0; i < 5; i++) {
    var totalN = 0;
    totalN = totalN + current[i] + pastdue[i] + currmed[i] + pastduemed[i] + currspous[i] + pastduespous[i] + add[i];
  }
  form.total_current.value = (totalCurrent).toFixed(2);
  form.total_add.value = (totalAdd).toFixed(2);

  form.total_order.value = (totalCurrent + totalPastDue + totalCurrMed + totalPastDueMed + totalCurrSpous + totalPastDueSpous + totalAdd).toFixed(2);
} //end totalOrdered 



function twoPlace(value, n) {
  return Math.floor(Math.pow(10, n) * value) / Math.pow(10, n);
}
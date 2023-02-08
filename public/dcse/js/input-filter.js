$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
        if (inputFilter(this.value)) {
            // console.log("allowed");
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            // console.log("not allowed");
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            // console.log("no value");
            this.value = "";
        }
    });
};

$(document).ready(function() {
    $('.currency').inputFilter(isCurrency);
})

function isCurrency(value) {
    return /^\d*\.?\d{0,2}$/.test(value);
}

// function setInputFilter(textBox, inputFilter) {
//     ["input","keydown","keyup","mousedown","mouseup","select","contextmenu","drop"].forEach(function(event){
//         textBox.addEventListener(event, function() {
//             if(inputFilter(this.value)) {
//                 this.oldValue = this.value;
//                 this.oldSelectionStart = this.selectionStart;
//                 this.oldSelectionEnd = this.selectionEnd;
//             } else if(this.hasOwnProperty("oldValue")){
//                 this.value = this.oldValue;
//                 this.setSelectionRange(this.oldSelectionStart,this.oldSelectionEnd);
//             } else {
//                 this.value = "";
//             }
//         })
//     })
// }

// window.onload(function() {
//     document.getElementsByClassName("currency").forEach(function(){
//         setInputFilter(this,isCurrency);
//     })
// })
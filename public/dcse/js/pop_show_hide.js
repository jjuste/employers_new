// JavaScript Document


function popWin(url) {
    defwin = window.open(url, "pop", "width=650,height=500,scrollbars=yes");
    testpop = (defwin == null || typeof (defwin) == "undefined") ? true : false;
    return testpop;
}

function displayAll() {
    if (document.images) {
        steps = document.getElementById("iwsteps");
        img = steps.getElementsByTagName("img");
        for (i = 0; i < img.length; i++) {
            img[i].style.display = "";
        }
    }
}

function hideAll() {
    if (document.images) {
        steps = document.getElementById("iwsteps");
        img = steps.getElementsByTagName("img");
        for (i = 0; i < img.length; i++) {
            img[i].style.display = "none";
        }
    }
}

// window.onload = hideAll;
document.addEventListener("DOMContentLoaded", hideAll);
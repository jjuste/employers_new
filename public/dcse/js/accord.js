// JavaScript Document

/*
 * This controls the collapsible sections allowing them to open and close
   Updated to restore keyboard navigation required for accessibility
 */

$(document).ready(function () {
    $("#main h2.pointer").click(function () {
        $(this).toggleClass("pointer2");
        $(this).next("div.panel").toggleClass("panel2");
    });

    $("#main h3.subPoint").click(function () {
        $(this).toggleClass("subPoint2");
        $(this).next("div.section").toggleClass("section2");

    });

    $("#main h2.pointer button").keydown(function (ev) {
        if (ev.which == 13) {
			$(this).next("div.panel").toggleClass("panel2");
        }
    });

    $("#main h3.subPoint button").keydown(function (ev) {
        if (ev.which == 13) {
			$(this).next("div.section").toggleClass("section2");
        }
    });
});
/* 
 * Include script to include files inside HTML files where typically this can't be done 
 * 
 * To use, create a div and give it an attribute of data-src="/path/file.html"
 * 
 * Loading external files like css and js may not work correctly with this method, 
 * so they should be in the main page instead.
 * 
 * There are two options, jQuery and XHttpRequest, both can only look at files in the same directory.
 */
//function include() {
//	var attr = "data-src";
//	var includes = $("["+attr+"]");
//	$("[data-src]").each(function(i, div){
////		var div = this;
//		var file = div.getAttribute(attr);
//		div.removeAttribute(attr);
//		$(div).load(file);
//		
////		xhttp = new XMLHttpRequest();
////		xhttp.onreadystatechange = function() {
////			if(this.readyState == 4) {
////				if(this.status == 200) {div.innerHTML = this.responseText;}
////				if(this.status == 404) {div.innerHTML = "Page not found";}
////				div.removeAttribute(attr);
////				include();
////			}
////		}
////		xhttp.open("GET", file, true);
////		xhttp.send();
//		
////		console.log(this);
//		return;
//	});
//}

$(document).ready(function () {
	var attr = "data-src";
	var includes = $("[" + attr + "]");
	$("[data-src]").each(function () {
		var file = this.getAttribute(attr);
		this.removeAttribute(attr);
		$(this).load(file);
	});
});
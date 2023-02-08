function addGTScript(i) {
	let w = window;
	let d = document;
	let s = 'script';
	let l = 'dataLayer';
	w[l] = w[l] || []
	w[l].push({
	'gtm.start': new Date().getTime(),
	event: 'gtm.js',
	})
	var f = d.getElementsByTagName(s)[0],
	j = d.createElement(s),
	dl = l != 'dataLayer' ? '&l=' + l : ''
	j.async = true
	j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl
	f.parentNode.insertBefore(j, f)
}
(function (is) {
	is.forEach(i => {
		addGTScript(i);
	})
})(['GTM-T8BQL5','GTM-TPTJXHH'])
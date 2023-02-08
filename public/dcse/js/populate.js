// function openClose(url) {
// 	let w = window.open(url,'_blank')
// 	w && w.addEventListener('DOMContentLoaded',() => {w.close()})
// }

// function populate() {
// 	const host = location.host
// 	$('#site-map-list').find('a').each((i,l) => {
// 		if(l.href.includes(host)){
// 			openClose(l.href)
// 		}
// 	})
// }

// populate()

// Copy this into the site map for each language to open the links.
const openClose = (url) => {
	let w = window.open(url,'_blank')
	w && w.addEventListener('DOMContentLoaded',() => {w.close()})
}
const host = location.host
$('#site-map-list').find('a').each((i,l) => {
	if(l.href.includes(host)){
		openClose(l.href)
	}
})

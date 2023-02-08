const ADD_HEADER = false;
const ADD_FOOTER = true;
const SITE = location.host.replace(/^(www\.)?([a-z]{2}\.)?/g,'')
const langs = [
	{
		engName: 'English',
		lang: 'en',
		label: 'English',
		dir: 'ltr',
		prefix: false,
	},
	{
		engName: 'Spanish',
		lang: 'es',
		label: 'Español',
		dir: 'ltr',
		prefix: true,
	},
	{
		engName: 'Chinese',
		lang: 'zh',
		label: '中文',
		dir: 'ltr',
		prefix: true,
	},
	{
		engName: 'Russian',
		lang: 'ru',
		label: 'Русскийy',
		dir: 'ltr',
		prefix: true,
	},
	{
		engName: 'Yiddish',
		lang: 'yi',
		label: 'יידיש',
		dir: 'rtl',
		prefix: true,
	},
	{
		engName: 'Bengali',
		lang: 'bn',
		label: 'বাঙালি',
		dir: 'ltr',
		prefix: true,
	},
	{
		engName: 'Korean',
		lang: 'ko',
		label: '한국어',
		dir: 'ltr',
		prefix: true,
	},
	{
		engName: 'Haitian Creole',
		lang: 'ht',
		label: 'Kreyòl Ayisyen',
		dir: 'ltr',
		prefix: true,
	},
	{
		engName: 'Italian',
		lang: 'it',
		label: 'Italiano',
		dir: 'ltr',
		prefix: true,
	},
	{
		engName: 'Arabic',
		lang: 'ar',
		label: 'العربية',
		dir: 'rtl',
		prefix: true,
	},
	{
		engName: 'Polish',
		lang: 'pl',
		label: 'Polski',
		dir: 'ltr',
		prefix: true,
	},
	{
		engName: 'French',
		lang: 'fr',
		label: 'Français',
		dir: 'ltr',
		prefix: true,
	},
	{
		engName: 'Urdu',
		lang: 'ur',
		label: 'اردو',
		dir: 'rtl',
		prefix: true,
	},
]

const isProd = () => {
	return (location.hostname.search("(localhost|sit|uat|pseudo)") == -1)
}

function processURL() {
	return SITE + location.pathname
}

const langLinks = (site) => {
	return langs.map(lang => {return langLink(lang,site)}).join('')
}

const langLink = (props, site) => {
	const url = `${location.protocol}//${(props.prefix? `${props.lang}.`:'')}${site}`
	// console.log(props.engName,url)
	return (
	`<li class="smt-item" key="${props.engName}">
		<a href="${url}" lang="${props.lang}" class="smt-link sl_norewrite" translate="no">${props.label}</a>
	</li>`
	)
}

const transBar = (site) => {
	return (
	`<div class="translate-bar">
		<div class="smt-selector">
			<nav aria-labelledby="langnav">
				<ul class="smt-menu">
					<li class="smt-trigger">
						<a class="smt-trigger-link" tabindex="0">
							<span class="smt-lang" id="langnav">Translate</span>
						</a>
						<ul class="language-links">
							${langLinks(site)}
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>`
	)	
}

const transHeader = (children) => {
	return (
		`
		<div id="translate-wrap">
			${children}
		</div>
		`
	)
}

const transFooter = (children) => {
	return (
		`
		<div class="footer-translate">
			<div class="inside-wrap">
				<h3><a href="https://ny.gov/web-translation-services">Translation Services</a></h3>
				<p>This page is available in other languages</p>
				<div class="translation-menu" id="translation-menu">
					${children}
				</div>
			</div>
		</div>
		`
	)
}

const buildTranslations = () => {
	const resp = {}
	const site = processURL()
	const bar = transBar(site)
	if(ADD_HEADER) {
		// Add the Translate Header to the top of the page
		resp.header = transHeader(bar)
	}
	if(ADD_FOOTER){
		// Add the Translate Footer to the bottom of the page
		resp.footer = transFooter(bar)
	}
	return resp
}

const listenToTranslations = () => {

	// bind click event to trigger menu display
	$('.smt-trigger').bind('click', function(e) {
		e.stopPropagation();
		$(this).find('ul').toggle();
		$('#translate-wrap a.smt-trigger-link').toggleClass("open");
	});

	// build object full of key presses
	var keys = {Tab: false, Shift: false};
	onkeydown = onkeyup = (e) => {
		if(e.key == 'Shift' || e.key == 'Tab'){
			keys[e.key] = e.type == 'keydown';
		}
	};

	// on focusout of last item in menu, check if key press is tab and close menu if so
	$('#translate-wrap .language-links li:last-child').focusout(function() {
		if (keys.Tab && !keys.Shift) {
			$('#translate-wrap .smt-trigger').find('ul').hide();
			$('#translate-wrap a.smt-trigger-link').removeClass("open");
		} 
	});

	// on focusout of first item in menu, check if key press is shift+tab and close menu if so
	$('#translate-wrap .language-links li:first-child').focusout(function() {
		if (keys.Tab && keys.Shift) {
			$('#translate-wrap .smt-trigger').find('ul').hide();
			$('#translate-wrap a.smt-trigger-link').removeClass("open");
		} 
	});

	// close menu on click outside
	$('body').bind('click', function(e) {
		$('#translate-wrap .smt-trigger').find('ul').hide();
		$('#translate-wrap a.smt-trigger-link').removeClass("open");
	});

	// bind enter key to trigger
	$('.smt-trigger').keyup(function(e) {
		if (e.key == 'Enter') {
			$(this).find('ul').toggle();
			$('#translate-wrap a.smt-trigger-link').toggleClass("open");
		}
	});

	// Hide the vertical list of links in the footer translate menu in mobile (looks for window < 768px for NYGOV).
	var expandCollapse = function () {
		if ($(window).width() < 768) {
			$(function () {
			$(".footer-translate .inside-wrap .translation-menu ul.smt-menu ul").css("display", "none");
			});
		} else {
			$(function () {
			$(".footer-translate .inside-wrap .translation-menu ul.smt-menu ul").css("display", "flex");
			});
		}
	};
	$(window).resize(expandCollapse);

	// change footer translate menu links into <select> menu (to display on mobile devices)
	// append <select> to footer translate nav
	var buildSelectMenu = function () {
		var label = $('<label for="footertranslate">Translate</label>');
		var select = $('<select id="footertranslate" name="footertranslate"></select>');
		select.append(new Option('Translate', ''));
		$(".footer-translate .smt-menu ul.language-links li a").each(function() {
			select.append(new Option($(this).text(), $(this).attr('href')));
		});

		$('.footer-translate .smt-menu').append(label).append(select);
	};

	buildSelectMenu();
	$("#footertranslate option:first-child").prop({"disabled": "disabled", "hidden": "hidden"});

	// Ensure links open in the same browser tab
	$(".smt-menu select").change(function() {
		window.location = $(this).find("option:selected").val();
	});
}

const addTranslations = () => {
	const trans = buildTranslations()
	const $body = $('body')
	if(trans.header){
		$body.prepend(trans.header)
		$('#translate-wrap .smt-trigger ul').css('display', 'none');
	}
	if(trans.footer){
		$body.append(trans.footer)
		$(".footer-translate .inside-wrap .translation-menu ul.smt-menu ul").css("display", "none");
	}
	listenToTranslations()
}

$(document).ready(function() {
	addTranslations()
});
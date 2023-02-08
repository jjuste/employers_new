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

// List Item: <li class="smt-item">{link}</li>
// Link Example: <a translate="no" lang="{lang}" class="smt-link sl_norewrite" href="https://({prefix}?'{lang}.':''){url}">{label}</a>

const isProd = () => {
	return (location.hostname.search("(localhost|sit|uat|pseudo)") == -1)
}

const getUrl = () => {
	return location.host + location.pathname
}

const langLinks = (site) => {
	return langs.map(lang => {return langLink(lang,site)}).join('')
}

const langLink = (props, site) => {
	const url = `${location.protocol}//${(props.prefix? `${props.lang}.`:'')}${site}`
	console.log(props.engName,url)
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

const transFooter = (site) => {
	return (
		`
		<div class="footer-translate">
			<div class="inside-wrap">
				<h3><a href="https://ny.gov/web-translation-services">Translation Services</a></h3>
				<p>This page is available in other languages</p>
				<div class="translation-menu" id="translation-menu">
					${transBar(site)}
				</div>
			</div>
		</div>
		`
	)
}

const allInOne = () => {
	return (
		`<div class="footer-translate">
			<div class="inside-wrap">
				<h3><a href="https://ny.gov/web-translation-services">Translation Services</a></h3>
				<p>This page is available in other languages</p>
				<div id="translation-menu" class="translation-menu">
					<div class="translate-bar">
						<div class="smt-selector">
							<nav aria-labelledby="langnav">
								<ul class="smt-menu">
									<li class="smt-trigger">
										<a class="smt-trigger-link" tabindex="0">
											<span class="smt-lang" id="langnav">Translate</span>
										</a>
										<ul class="language-links">
											${langs.map(lang => {
												return (
													`<li class="smt-item" key="${lang.engName}">
														<a translate="no" lang="${lang.lang}" dir="${lang.dir}" class="smt-link sl_norewrite" 
														href="https://${lang.prefix?`${lang.lang}.`:''}${location.host}${location.pathname}">${lang.label}</a>
													</li>`
												)
											}).join('\n')}
											<label for="footertranslate">Translate</label>
										</ul>
										<select id="footertranslate" name="footertranslate">
											<option value disabled hidden>Translate</option>
											${langs.map(lang => {
												return (
													`<option value="https://${lang.prefix?`${lang.lang}.`:''}${location.host}${location.pathname}">${lang.label}</option>`
												)
											}).join('\n')}
										</select>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>`
	)
}

document.addEventListener('DOMContentLoaded', () => {
	!isProd() && (document.body.innerHTML += transFooter(getUrl()))
})
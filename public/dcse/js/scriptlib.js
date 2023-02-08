/**************************************************************************************
 * Global Constants
 **************************************************************************************/

/******************************************
 * Pages
 ******************************************/
// Login Page - Used for validation and navigation
const LOGIN_PAGE = "/DCSE/secure/Login_input";

// Logout Page - Used for navigation
const LOGOUT_PAGE = "/DCSE/secure/Login_logout";

// Logout Page - when unsupported browser
const LOGOUT_IE_BROWSER = "/DCSE/secure/Login_blocked";

// Login Page - When using an unauthorized account
const LOGIN_ACCESS_DENIED = "/DCSE/secure/Login_accessdenied";

// Login Kill Session - Used on Login page when attempting to create an account that already exists
const LOGIN_KILL_SESSION = "/DCSE/secure/Login_killSession";

// Upgrade Page - For IE users
const UPGRADE_BROWSER = "/DCSE/UpgradeBrowser";

// Create Account - Used when replacing a linked account
const CREATE_ACCOUNT = "/DCSE/CreateAccount";

// View Payments - Used when attempting to create account while logged into it
const VIEW_PAYMENTS = "/DCSE/secure/ViewPayments"

/******************************************
 * Time Units
 ******************************************/
// One Second in Milliseconds
const SECOND = 1000;

// One Minute in Milliseconds
const MINUTE = 60 * SECOND;

// One Hour in Milliseconds
const HOUR = 60 * MINUTE;

// One Day in Milliseconds
const DAY = 24 * HOUR;

/**************************************************************************************
 * Configuration
 **************************************************************************************/

/******************************************
 * Times
 ******************************************/
// For Timeout times, see EnvEnum in Global Variables section.

// Default timeout if unable to get one from the environment
const TIME_LIMIT = 1 * HOUR;

// How long before time out they are warned. Currently unused.
const WARN_OFFSET = MINUTE;

// How long it waits after activity to set the time. Prevents excessive setting
// of the time. For bufferTimer object
const BUFFER = 500;

// How often to check if session expired. For checkInterval object
const CHECK = SECOND;

// How often to check if a page is still alive
const LIFE = MINUTE;

// How old a page can be before it is removed
const LIFESPAN = 2 * MINUTE;

// The max session length for Okta
const OKTA_MAX = 2 * HOUR;

/******************************************
 * Local Storage Values
 ******************************************/
// The last activity time
const STORE_TIME = "_csActiveTime";

// The time the session expired
const STORE_EXPIRE = "_csExpireTime";

// The time they are force logged off
const STORE_LOGOUT = "_csLogOutTime";

/******************************************
 * Misc
 ******************************************/

// What to tell the user when they get logged off
const ALERT_MSG = "You have been logged out due to inactivity. Please log in again.";

// The events to monitor for activity
const EVENTS = ["mousedown", "mousemove", "scroll", "keypress", "resize",
	"touchstart", "click", "touchmove", "mousewheel"
];

// The events to monitor for the menu
const MENU_EVENTS = ["touchend","click"];

// DCSE Cookies
const DCSE_COOKIES = ["DCSECookieMultiCase", "DCSECookieMasterAccount",
	"DCSECookieLogin", "DCSECookieRoleID"
];

// Debug Mode - logs to console
const DEBUG_MODE = true;

// Whether to remove CP/NCP only links if role is not found.
const HIDE_ROLE_LINKS = false;

/**************************************************************************************
 * Global Variables
 **************************************************************************************/

/******************************************
 * Custom Objects
 ******************************************/
/**
 * Environment Enum with time limits and environment test
 */
var EnvEnum = Object.freeze({
	PROD: {
		timelimit: 1 * HOUR,
		isEnv: function () {
			return (location.hostname.search("(localhost|sit|uat|pseudo)") == -1)
		}
	},
	PSEUDO: {
		timelimit: 1 * HOUR,
		isEnv: function () {
			return location.hostname.startsWith("pseudo")
		}
	},
	UAT: {
		timelimit: 1 * HOUR,
		isEnv: function () {
			return location.hostname.startsWith("uat")
		}
	},
	SIT: {
		timelimit: 5 * MINUTE,
		isEnv: function () {
			return location.hostname.startsWith("sit")
		}
	},
	LOCAL: {
		timelimit: 5 * MINUTE,
		isEnv: function () {
			return location.hostname == "localhost";
		}
	},
})

// Store the time limit for the environment
var timelimit;

// Store Cookies for setting the flags
var cookieMap = {};

// Stores the event handlers
var _eventHandlers = {};

/******************************************
 * Time Objects
 ******************************************/
// Activity buffer before setting time. See BUFFER for configuration
var bufferTimer;

// Expiration Checker - repeats until cleared. See CHECK for configuration
var checkInterval;

// Life Checker - repeats until cleared. See LIFE and LIFESPAN for configuration
var lifeInterval;

// Include Checker - repeats until cleared.
var includeInterval;

/******************************************
 * Flags
 ******************************************/
// MultiCase Flag
var multiCase;

// Master Account Flag
var masterAccount;

// Logged In Flag
var loggedIn;

// Custodial Parent Flag
var cpRole;

// Non-Custodial Parent Flag
var ncpRole;

// Has Menu been updated
var menuUpdate = false;

// Has Menu had listeners added
var menuListen = false;
/**************************************************************************************
 * Menu Functions
 **************************************************************************************/

/**
 * Called from the pages to write the appropriate menu items.<br>
 * Adds links for My Accounts, Select SSN, Log out or Log in.<br>
 * 
 * @returns
 */
// function showLogout() {
// 	/*
// 	 * The function name is inaccurate, but until there are no static files, not
// 	 * worth the hassle to rename it. At that point, it would be better to just
// 	 * have the back end figure it out.
// 	 */

// 	// Parse the cookies to check status
// 	parseCookies();

// 	// Write the Select SSN link if a master account user
// 	if (masterAccount) {
// 		document
// 			.write('<li id="select"><a href="/DCSE/secure/Login_masterSelectSsn" title="Select SSN">Select SSN</a></li>');
// 	}

// 	// Write the My Accounts link if a logged in as multicase user
// 	if (multiCase && loggedIn) {
// 		document
// 			.write('<li id="my-accounts"><a href="/DCSE/secure/Login" title="My Accounts">My Accounts</a></li>');
// 	}

// 	// Write the Log out link if logged in or the Log in link if logged out
// 	document.write(getLogMenuItem());
// }

/**
 * Replacement for showLogout and cleanUpMenu that can be called after page load to set up the menu
 */
function updateMenu() {
	debug('Updating Menu')
	if(!menuUpdate){
		menuUpdate = true
		parseCookies();
		if(HIDE_ROLE_LINKS) {
			if(!cpRole){
				$('[data-role-required="cp"]').remove()
			}

			if(!ncpRole){
				$('[data-role-required="ncp"]').remove()
			}
		}

		if (masterAccount) {
			// add master account link
			$("#select").replaceWith('<li id="select"><a href="/DCSE/secure/Login_masterSelectSsn" title="Select SSN">Select SSN</a></li>');
		} else {
			// Remove master account li
			$("#select").remove();
		}

		if (multiCase && loggedIn) {
			// add my accounts
			$("#my-accounts").replaceWith('<li id="my-accounts"><a href="/DCSE/secure/Login" title="My Accounts">My Accounts</a></li>');
		} else {
			// Remove master account li
			$("#my-accounts").remove();
		}

		// update the login li

		$(".log-in-out").replaceWith(getLogMenuItem());
	} else {
		debug('Menu already updated')
	}
}

/**
 * Get the list item for Log in or Log out depending on login status
 * 
 * @returns
 */
function getLogMenuItem() {
	// The page to go to
	var page;

	// Link title
	var title;

	// Link text
	var text;

	// Menu List Item ID
	var id = "log-in-out";

	// Define based on log in status
	if (loggedIn) {
		page = LOGOUT_PAGE;
		title = "Log Out";
		text = "Log out";
		// id = "log-out";
	} else {
		page = LOGIN_PAGE;
		title = "Login";
		text = "Log in";
		// id = "log-in";
	}

	// Construct the list item
	return '<li id="' + id + '"><a href="' + getLogoutPath(page) + '" title="' +
		title + '">' + text + '</a></li>'
}

/**
 * Removes the Select SSN and My Accounts menu items, and replaces Log out with
 * Log in
 * 
 * @returns
 */
function cleanupMenu() {
	debug('Cleaning up menu')
	$("#select").remove();
	$("#my-accounts").remove();
	$("#log-out").replaceWith(getLogMenuItem());
}

/**************************************************************************************
 * Activity Tracking Functions
 **************************************************************************************/

/**
 * Checks if the user is logged in and then tracks if their activity, force
 * logging them out if they are idle
 * 
 * @returns
 */
function activityTracker() {
	// Parse the cookies to check status
	parseCookies();

	// Only need to time out users that are logged in
	if (loggedIn) {
		debug("Logged in");
		// Check if the session is expired on initial load
		if (loadExpireCheck()) {
			debug("Expired on load");
			forceLogoff(Date.now());
		} else {
			startMonitoring();
		}
	} else if (location.pathname == LOGOUT_PAGE) {
		debug("On the logout page");
		if (!hasLogout()) {
			setLogout(Date.now())
			debug("Setting logout time from logout page")
		}
		if (!hasExpire()) {
			debug("Session didn't expire.")
			// Probably a manual logout. Clear the localStorage?
		}
		// Don't clear any times if on the logout page. They need to navigate
		// somewhere else.
	} else {
		debug("Not logged in");
		// Make sure there is no time from a previous session to mess things up
		// Wrapped in a timeout so any other pages that are open have time to
		// finish up
		setTimeout(resetTimes, CHECK + BUFFER);
	}
}

/**
 * Expiration check for when the page loads
 * 
 * @returns true or false
 */
function loadExpireCheck() {
	/*
	 * This is extracted so any special logic that may change the result can be
	 * added
	 */
	var expired = isExpired(getTimeLimit());
	var reset = false;
	if (isExpired(OKTA_MAX)) {
		debug("Previous Okta session expired. This is a new one.")
		reset = true;
	}

	if (hasLogout()) {
		reset = true;
		if (hasExpire()) {
			debug("They were force logged out the last session. This is a new one.")
		} else {
			debug("They manually logged out last session. This is a new one.")
		}
	} else if (hasExpire()) {
		debug("Their session expired but they never logged out.")
	}

	if (reset) {
		if (expired) {
			debug("Previous session expired but they have logged back in.")
			expired = false;
		} else {
			debug("Previous session hasn't expired.")
		}
		debug("Clearing storage.")
		clearStorage();
	}

	return expired;
}

/**
 * Still active expiration check
 * 
 * @returns true or false
 */
function activeExpireCheck() {
	/*
	 * This is extracted so any special logic that may change the result can be
	 * added
	 */
	var expired = isExpired(getTimeLimit());

	if (expired && hasExpire()) {
		if (hasLogout()) {
			debug("Expired and logged off since last check.")
		} else {
			debug("Expired but not logged off since last check.")
		}
	}

	return expired;
}

/**
 * Checks for the presence of MSIE or Trident in the user agent.
 * 
 * @returns true or false
 */
function ieCheck() {
	var ua = window.navigator.userAgent;
	return ua.indexOf("MSIE") != -1 || ua.indexOf("Trident") != -1;
}

/* function to detect IE */
function detectIEbrowser() {
	// check if IE browser
	if (ieCheck()) {
		// Parse the cookies to check status
		parseCookies();
		// Check if they are on a white-listed page that should not redirect or display the message
		if ((location.pathname != LOGIN_PAGE && location.pathname.indexOf("/Login_") != -1) ||
			location.pathname.indexOf("/Error") != -1 ||
			location.pathname.indexOf("/UpgradeBrowser") != -1 ||
			location.pathname.indexOf("/LoginBlocked") != -1) {
			debug("On a white-listed page.");
		} else // Check if they are logged in or on a secure page
			if (loggedIn || (location.pathname.indexOf("/DCSE/secure") == 0 && location.pathname != LOGIN_PAGE)) {
				// Log them out and send them to the log out page
				goToPage(getLogoutPath(LOGOUT_IE_BROWSER));
			} else {
				// Show them the message
				ieMessage();
			}
	}
}

function ieMessage() {
	var list = $('<ul class="error"></ul>');
	var msg = 'Internet Explorer is unsupported, and you will not be able to log in. Please upgrade your browser. ';
	var btn = $('<input />', {
		type: 'button',
		'class': 'button',
		value: 'Upgrade browser',
		id: 'upgradeBtn',
		alt: 'Upgrade your browser',
		title: 'Upgrade your browser',
		tabindex: '0',
		on: {
			click: function () {
				goToPage(UPGRADE_BROWSER);
			}
		}
	});
	var item = $('<li />');
	item.append(msg, btn);
	list.append(item);
	$("#content h1").after(list);
}

/**
 * Sets the activity time, starts a buffer, adds the event listeners, and starts
 * the expire check
 */
function startMonitoring() {
	debug("Starting monitor process");

	// Set the initial expiration time
	setTime(Date.now());

	// Add the listeners
	startListening();

	// Create the check interval
	checkInterval = setInterval(check, CHECK);
}

/**
 * Activity check
 */
function check() {
	/*
	 * It is possible to set a warning time as well. Need to look into managing
	 * the warning box. It may need to be a modal rather than a JS alert.
	 */
	if (activeExpireCheck()) {
		debug("Expired on check");
		var time = Date.now();
		// Only set the expire time once
		if (!hasExpire()) {
			// Set it
			setExpire(time);
		}
		stopMonitoring(time);
	}
}

/**
 * Stops the expire check, removes the event listeners, and calls forceLogoff()
 * 
 * @returns
 */
function stopMonitoring(time) {
	debug("Stopping monitor process");
	debug("Clearing intervals");
	// Stop checking for expired
	clearInterval(checkInterval);

	// Determine what to do
	endSession(time);
}

function endSession(time) {
	debug("Ending session");

	var curPage = getCurPage();

	if (curPage.secure) {
		// Boot them regardless of how many pages they have open
		forceLogoff(time ? time : curPage.time);
	} else {
		/*
		 * All insecure pages will have the menus reset, so it looks like they
		 * are logged out. If no secure pages are open, the first insecure page
		 * to show activity after being expired will get the boot. If they were
		 * booted elsewhere prior to this page ending its session, stop
		 * listening.
		 */
		clearDCSECookies();
		cleanupMenu();
		if (hasLogout()) {
			stopListening();
		}
	}
}

/**
 * Sets the kick time if not set, and sends them to the log out page
 * 
 * @param <strong>time
 *            </strong> The kick time.
 * @returns
 */
function forceLogoff(time) {
	debug("Forcing log off");
	if (!hasLogout()) {
		setLogout(time)
	}

	// Log them out and send them to the log out page
	goToPage(getLogoutPath(LOGOUT_PAGE));
}

/**
 * Called when the page loads or activity was detected by the listeners.<br>
 * Resets the timer if existing, and updates the time when it expires.
 */
function activity() {
	// Check if they were active after expiration
	if (hasExpire()) {
		if (hasLogout()) {
			/*
			 * They have already been booted. Stop listening for activity and
			 * exit the function.
			 */
			stopListening();
			return;
		} else {
			// Boot them
			forceLogoff(Date.now());
		}
	}

	// This is a mini-idle tracker. It prevents updating the activity time
	// non-stop.
	if (bufferTimer) {
		clearTimeout(bufferTimer);
	}
	// Once the mini-idle ends, update the last activity time
	bufferTimer = setTimeout(activityUpdate, BUFFER);
}

/**
 * The actions to perform when activity is detected
 */
function activityUpdate() {
	// Get the current page object
	var curPage = getCurPage();

	// Set the activity time
	setTime(curPage.time);
}

/**
 * Reset the times in the local storage
 */
function resetTimes() {
	debug("Resetting times")
	var reset = true;

	/*
	 * Currently not preventing it from being cleared. If there is any reason to
	 * do so, it can be added to the logic below. For now, it is just for debug
	 * logging.
	 */

	// Is there an activity time
	if (hasTime()) {
		debug("Activity time found")
		// Was it found to have expired
		if (hasExpire()) {
			debug("Expiration time found")
			// Were they kicked off at any point
			if (hasLogout()) {
				debug("Kick time found")
			} else {
				debug("No Kick time found")
			}
		} else {
			debug("No Expiration time found")
		}
	} else {
		debug("No activity time found")
		// For now clear everything out anyway
		// reset = false;
	}
	if (reset) {
		clearStorage();
	}
}

/**************************************************************************************
 * Listener Functions
 **************************************************************************************/

/**
 * Starts the activity tracker and loads the browser update script when the page is loaded
 */
// document.addEventListener('DOMContentLoaded', function () {
// 	debug("DOM loaded");
// 	// Check for IE
// 	detectIEbrowser();
// 	// Sets up the menu
// 	updateMenu();
// 	// Enable the menu functionality
// 	listenToMenu();
// 	// Start the activity tracker
// 	activityTracker();
// });

$(document).ready(function() {
	debug("DOM loaded");
	// addHeaderFooter()
	// Check for IE
	detectIEbrowser();
	// Include any files that need to be included.
	// setUpHeader();
	// setUpFooter();
	// getDataSrc()
	includeFiles();
	// Start the activity tracker
	activityTracker();
	// Sets up the menu
	setUpMenu();
	// updateMenu();
	// Enable the menu functionality
	// listenToMenu();
})

/**
 * This would add the header and footer to html pages 
 * and add interactivity to the added parts. JSPs would
 * only have the interactivity added.
 */
// function addHeaderFooter() {
// 	if(location.href.includes('.htm')) {
// 		const body = $(document.body)
// 		$.get('/dcse/_header.htm',data => {
// 			body.prepend(data)
// 			// Need to call this here to ensure the menu is there when it's called
// 			setUpMenu()
// 		})
// 		$.get('/dcse/_footer.htm',data => {
// 			body.append(data)
// 			// Need to call this here to ensure that they are added after the footer
// 			addTranslations()
// 		})
// 	} else {
// 		setUpMenu()
// 		addTranslations()
// 	}
// }

// function setUpHeader() {
// 	const h = $('#page-header')
// 	if(h){
// 		debug('Loading page header')
// 		const file = h.data('src')
// 		$.get(file, data => {
// 			h.replaceWith(data)
// 			// setUpMenu()
// 		})
// 	} 
// 	// else if($('#header')) {
// 	// 	setUpMenu()
// 	// }
// }

// function setUpFooter() {
// 	const f = $('#page-footer')
// 	if(f){
// 		debug('Loading page footer')
// 		const file = f.data('src')
// 		$.get(file, data => {
// 			f.replaceWith(data)
// 			// debug('Setting Up Footer. Adding Translations.')
// 			// console.log('Pre: Footer Translate count:',$('.footer-translate').length)
// 			// addTranslations()
// 			// console.log('Post: Footer Translate count:',$('.footer-translate').length)

// 		})
// 	}
// }

function setUpMenu() {
	// debug('Setting up menu')
	includeInterval = setInterval(() => {
		if(getIncludeTargets().length == 0){
			debug('All data sources loaded. Setting up menu.')
			clearInterval(includeInterval)
			updateMenu()
			listenToMenu()
		}
	}, 100);
}

/**
 * Adds the various menu listeners so the menu works.
 */
function listenToMenu() {
	if(!menuListen){
		menuListen = true
		let menuBtn = $("#nys-menu-control");
		let menu = $("#nys-global-nav");
		if(!menu) {
			menuUpdate = false;
			menuListen = false;
			debug('Menu not added yet, resetting flags')
		} else {
			let menuItems = menu.children().filter(function(i,item) {return item.children && (item.children.length > 1)});
			MENU_EVENTS.forEach(function(ev) {
				menuItems.each(function(index,item) {
					item.firstElementChild.addEventListener(ev,function(e) {toggleSubMenus(item)});
				})
				menuBtn[0] && (menuBtn[0].addEventListener(ev,function(e){
					toggleMainMenu(true);
					e.preventDefault();
					e.stopPropagation();
					return false;
				}))
				document.addEventListener(ev,function(e) {
					if(!isParentActive(e.target)){
						toggleMainMenu()
					}
					if(e.target.getAttribute("href") == "#"){
						e.preventDefault();
						e.stopPropagation()
						return false;
					}
				})
			})
		}
	} else {
		debug('Menu already has listeners added')
	}
}

/**
 * Controls the active and hidden state for the sub menus
 * @param item the menu item clicked
 */
function toggleSubMenus(item) {
	let menu = $("#nys-global-nav");
	if(isActive(item)) {
		// debug("Item is active. Removing active and hidden classes.")
		/*
		 Could remove the class attribute, but that would be a problem if other
		 classes are ever added in the future.
		*/
		// menu.children().removeClass();
		menu.children().removeClass("active hidden");
		// item.removeClass("active");
	} else {
		// debug("Item is not active. Setting it to active, hiding rest.")
		// Remove active from all the children
		menu.children().removeClass("active");
		// Add hidden to all the children
		menu.children().addClass("hidden");
		// Make item only have active
		item.className = "active";
	}
}

/**
 * Controls the active and hidden state for the menu and menu toggle
 * @param button is it the toggle button
 */
function toggleMainMenu(button) {
	// Could be changed to pass in e.target and test if that is the toggle button or not
	let menuBtn = $("#nys-menu-control");
	let menu = $("#nys-global-nav");
	if(isActive(menu)) {
		// debug("Menu is active. Removing active from menu and toggle.")
		menuBtn.removeClass("active")
		menu.removeClass("active")
	} else if(button) {
		// debug("Toggle pressed. Add active to menu and toggle.")
		menuBtn.addClass("active")
		menu.addClass("active")
	}
	// debug("Removing active and hidden from sub menu.")
	menu.children().removeClass("active hidden");
}

/**
 * Checks if the element has the active class
 * @param element 
 * @returns 
 */
function isActive(element) {
	return $(element).hasClass("active");
}

/**
 * Checks if the element is a child of an active element
 * @param element
 * @returns 
 */
function isParentActive(element) {
	// Other ways to test
	// debug("Closest length: "+($(element).closest('.active').length))
	// debug("Parents length: "+($(element).parents('.active').length))
	// debug("Parents has Class: "+($(element).parents().hasClass('active')))
	// debug("Active has element length: "+($(".active").has($(element)).length))
	// debug("Element is active: "+($(element).is('.active *')))
	return $(element).is('.active *');
}

/**
 * Adds the event listener to the _eventHandlers object
 * 
 * @param node
 * @param event
 * @param handler
 * @param capture
 */
function addListener(node, event, handler, capture) {
	if (!(event in _eventHandlers)) {
		_eventHandlers[event] = [];
	}

	_eventHandlers[event].push({
		node: node,
		handler: handler,
		capture: capture
	});
	node.addEventListener(event, handler, capture);
}

/**
 * Removes all of the event's listeners from the _eventHandlers object
 * 
 * @param targetNode
 * @param event
 */
function removeAllListeners(targetNode, event) {
	_eventHandlers[event].forEach(function (e) {
		if (e.node === targetNode) {
			e.node.removeEventListener(event, e.handler, e.capture);
		}
	});
}

/**
 * Add Event Listeners for the tracked events
 */
function startListening() {
	debug("Starting listeners")
	EVENTS.forEach(function (e) {
		addListener(document, e, activity, true);
	});
}

/**
 * Remove Event Listeners for the tracked events
 */
function stopListening() {
	debug("Stopping listeners")
	EVENTS.forEach(function (e) {
		removeAllListeners(document, e);
	});
}

/**************************************************************************************
 * Local Storage Functions
 **************************************************************************************/

/**
 * Clears everything in local storage
 */
function clearStorage() {
	debug("Clearing local storage");
	localStorage.clear();
}

/******************************************
 * Expire Time Functions
 ******************************************/

/**
 * Removes the expire time from local storage
 */
function clearExpire() {
	localStorage.removeItem(STORE_EXPIRE);
}

/**
 * Get the expire time from local storage
 * 
 * @returns
 */
function getExpire() {
	return localStorage.getItem(STORE_EXPIRE);
}

/**
 * Is there an expire time in local storage
 * 
 * @returns boolean
 */
function hasExpire() {
	return localStorage.hasOwnProperty(STORE_EXPIRE);
}

/**
 * Set the expire time in local storage
 * 
 * @param time
 */
function setExpire(time) {
	localStorage.setItem(STORE_EXPIRE, time);
}

/******************************************
 * Kick Time Functions
 ******************************************/

/**
 * Removes the logout time from local storage
 */
function clearLogout() {
	localStorage.removeItem(STORE_LOGOUT);
}

/**
 * Get the logout time from local storage
 * 
 * @returns
 */
function getLogout() {
	return localStorage.getItem(STORE_LOGOUT);
}

/**
 * Is there an kick time in local storage
 * 
 * @returns boolean
 */
function hasLogout() {
	return localStorage.hasOwnProperty(STORE_LOGOUT);
}

/**
 * Set the kick time in local storage
 * 
 * @param time
 */
function setLogout(time) {
	localStorage.setItem(STORE_LOGOUT, time);
}

/******************************************
 * Last Activity Time Functions
 ******************************************/

/**
 * Removes the last activity time from local storage
 */
function clearTime() {
	debug("Clearing time");
	localStorage.removeItem(STORE_TIME);
}

/**
 * Gets the last activity time from local storage
 * 
 * @returns last activity time as a string
 */
function getTime() {
	return localStorage.getItem(STORE_TIME);
}

/**
 * Is there a last activity time in local storage
 * 
 * @returns boolean
 */
function hasTime() {
	return localStorage.hasOwnProperty(STORE_TIME);
}

/**
 * Sets the last activity time in local storage
 * 
 * @param time
 */
function setTime(time) {
	localStorage.setItem(STORE_TIME, time);
}

/**************************************************************************************
 * Cookie Functions
 **************************************************************************************/

/**
 * Parses the cookie string and splits the cookies into a map. Then sets flags
 * based on the cookies.
 * 
 * @returns
 */
function parseCookies() {
	if (isEmptyObject(cookieMap)) {
		/*
		 * IE and Old Edge don't support replaceAll(), so removing it and
		 * replacing with trim
		 */
		var cookieArray = document.cookie.split(";");
		cookieArray.forEach(function (c) {
			parts = c.split("=");
			cookieMap[parts[0].trim()] = (parts.length > 1 ? parts[1].trim() :
				"");
		});

		// Use the cookies to set flags
		multiCase = cookieMap.DCSECookieMultiCase == 'true';
		masterAccount = cookieMap.DCSECookieMasterAccount == 'true';
		/*
		Use !== undefined for it to exist, or == 'success' for properly logged in
		*/
		loggedIn = cookieMap.DCSECookieLogin == 'success'; // !== undefined; 
		cpRole = cookieMap.DCSECookieRoleID == 'DCSE_PARENT_CUSTODIAL_ROLE';
		ncpRole = cookieMap.DCSECookieRoleID == 'DCSE_PARENT_NON_CUSTODIAL_ROLE';
	}
}

/**
 * Deletes all the DCSE cookies and clears the cookie map
 */
function clearDCSECookies() {
	// Deletes all the cookies
	DCSE_COOKIES.forEach(function (c) {
		deleteCookie(c)
	});

	// Replace the cookie map so it can be rebuilt if anything tries to
	// parseCookies again
	cookieMap = {};

	// Reset the flags to false
	multiCase = false;
	masterAccount = false;
	loggedIn = false;
	cpRole = false;
	ncpRole = false;
}

/**
 * Creates a cookie
 * 
 * @param name
 * @param value
 * @param days
 */
function createCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * DAY));
		expires = "expires=" + date.toUTCString() + ";";
	}
	document.cookie = name + "=" + value + "; " + expires +
		" path=/; secure=true;";
}

/**
 * Checks if a cookie exists using the document cookie string
 * 
 * @param cookieName
 * @returns true or false
 */
function cookieExists(cookieName) {
	var allCookies = document.cookie;
	var pos = allCookies.indexOf(cookieName);
	if (pos != -1) {
		return true;
	} else {
		return false;
	}
}

/**
 * Gets the value of a cookie from the document cookie string
 * 
 * @param name
 * @returns the value or empty string if it can't read it
 */
function readCookie(name) {
	var cookieValue = "";
	var search = name + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			cookieValue = unescape(document.cookie.substring(offset, end))
		}
	}
	return cookieValue;
}

/**
 * Deletes the cookie by replacing it with a null value and expired date
 * 
 * @param cookieName
 * @returns
 */
function deleteCookie(cookieName) {
	if (cookieExists(cookieName))
		createCookie(cookieName, 'null', -1);
}

/**************************************************************************************
 * Page and Environment Functions
 **************************************************************************************/

/**
 * Creates a page object for the current page with it's name, if it's secure,
 * and the time
 * 
 * @returns { "name" : pathname, "secure" : true/false, "time" : (Date.now()) }
 */
function getCurPage() {
	var page = location.pathname;
	return {
		"name": page,
		"secure": isSecurePage(page),
		"time": Date.now()
	};
}

/**
 * Checks if the page is a secure page.
 * 
 * @param page
 * @returns true or false
 */
function isSecurePage(page) {
	let insecure = [LOGIN_PAGE,LOGOUT_PAGE];
	return (page.startsWith('/DCSE/secure') && !insecure.includes(page)
	&& !page.includes('/Error'));
}

/**
 * Get the time limit for the environment
 * 
 * @returns
 */
function getTimeLimit() {
	if (!timelimit) {
		var env = getEnv();
		timelimit = (env && env.timelimit && env.timelimit > 0) ? env.timelimit :
			TIME_LIMIT;
		debug("Timelimit is " + timelimit);
	}
	return timelimit;
}

/**
 * Get the warning limit for the environment
 * 
 * @returns
 */
function getWarnLimit() {
	return getTimeLimit() - WARN_OFFSET;
}

/**
 * Checks if it has been more than the time limit since the last activity
 * 
 * @param timelimit
 * @returns
 */
function isExpired(timelimit) {
	if (localStorage.hasOwnProperty(STORE_TIME)) {
		const lastActive = parseInt(getTime());
		if (lastActive > 0 && Date.now() - lastActive > timelimit) {
			return true;
		}
	}
	return false;
}

/**
 * Returns the page if local, else redirects to the encoded origin and page
 * 
 * @param page
 * @returns
 */
function getLogoutPath(page) {
	return EnvEnum.LOCAL.isEnv() ? page : "/DCSE/secure/redirect?logout=" +
		encodeURIComponent(getFullPath(page));
}

/**
 * Returns the My.Ny.gov logout page for the environment.
 * @returns
 */
function getNyGovLogout() {
	if (EnvEnum.PROD.isEnv()) {
		return "https://login.ny.gov/login/signout?fromURI=https://sso.ny.gov/affwebservices/public/logout/logoutredirect.html?TARGET=" + getFullPath(LOGIN_PAGE);
	} else {
		return "https://login-qa.ny.gov/login/signout?fromURI=https://qa-sso.ny.gov/affwebservices/public/logout/logoutredirect.html?TARGET=" + getFullPath(LOGIN_PAGE);
	}
}

/**
 * Get the environment that the page is running on. The EnvEnums have individual
 * tests in them as well.
 * 
 * @returns EnvEnum.LOCAL, EnvEnum.SIT, EnvEnum.UAT, or EnvEnum.PROD
 */
function getEnv() {
	/*
	 * Test for the local, sit, and uat environments. If none of them, then it's
	 * prod.
	 */
	if (location.hostname == "localhost")
		return EnvEnum.LOCAL;
	if (location.hostname.startsWith("sit"))
		return EnvEnum.SIT;
	if (location.hostname.startsWith("uat"))
		return EnvEnum.UAT;
	return EnvEnum.PROD;
}

/**
 * Goes to the page
 * 
 * @param page 
 */
function goToPage(page) {
	location.href = page;
}

/**
 * Gets the logout path for the page and goes there.
 * Combination of goToPage and getLogoutPath.
 * 
 * @param page 
 */
function logout(page) {
	goToPage(getLogoutPath(page));
}

/**
 * Get all the elements on the page that need to be replaced with other content
 */
function getIncludeTargets() {
	return $("[data-src]")
}

/**
 * Checks the page for elements with the data-src attribute then replaces them with the file.
 * 
 * It requires a relative path and only works for the same context root. This is really only for HTML files that lack a better way of including files.
 * 
 * @example <div data-src="somefile.htm"></div>
 */
function includeFiles() {
	var includes = getIncludeTargets()
	includes.each(function() {
		var file = $(this).data('src');
		debug(`including ${file}`)
		// $(this).load(file, () => {$(this).children(':first').unwrap()});
		$.get(file,(data) => {$(this).replaceWith(data)})
	});
}

/**
 * Can use this to quickly swap page direction for testing purposes
 */
function swapDir() {
	document.dir = document.dir? '' : 'rtl'
}

/**************************************************************************************
 * Utility Functions
 **************************************************************************************/

/**
 * Logs to console if in debug mode
 * 
 * @param msg
 * @returns
 */
function debug(msg) {
	DEBUG_MODE && !EnvEnum.PROD.isEnv() && (console.log(msg));
}

/**
 * Gets the main site removing any www or sub domains
 * @returns 
 */
function getRootSite() {
	return location.host.replace(/^(www\.)?([a-z]{2}\.)?/,'')
}

/**
 * Get the full path for the page
 * @param page 
 * @returns 
 */
function getFullPath(page) {
	return `${location.protocol}//${getRootSite()}${page}`
}

/**
 * Attached to elements to load
 * 
 * @param element
 *            The element to get the attribute from
 * @param attribute
 *            The attribute to get the file from
 * @param replace
 *            If the file should replace the element
 * @returns
 */
// function include(element, attribute, replace) {
// 	var file = element.getAttribute(attribute);
// 	debug("File: " + file);
// 	if (replace) {
// 		debug("Replacing element");
// 		var parent = element.parentElement;
// 		$(element).remove;
// 		$(parent).load(file);
// 	} else {
// 		debug("Not replacing element");
// 		$(element).load(file);
// 	}

// }

/**
 * Looks for elements with the attribute, then loads the value from it into the
 * element. Meant to be used to add content such as html or jsp files into an
 * element. Make sure the attribute is unique, e.g. custom data-file attribute.
 * 
 * @param attribute
 * @returns
 */
// function load(attribute) {
// 	$('[' + attribute + ']').each(function () {
// 		var file = this.getAttribute(attribute);
// 		$(this).load(file);
// 		// $(this).unwrap(); // unwrap gets rid of everything inside it.
// 		// Find a way to get rid of the container
// 		this.removeAttribute(attribute);
// 	});
// }

/**
 * Tests if the object is empty
 * 
 * @param obj
 * @returns
 */
function isEmptyObject(obj) {
	return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}
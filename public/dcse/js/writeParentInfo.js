$(document).ready(() => {
	if (!(readCookie('DCSECookieRoleID') == 'DCSE_PARENT_CUSTODIAL_ROLE')) {
		$('[data-role-required="cp"]').remove()
	}
	if (!(readCookie('DCSECookieRoleID') == 'DCSE_PARENT_NON_CUSTODIAL_ROLE')) {
		$('[data-role-required="ncp"]').remove()
	}
})
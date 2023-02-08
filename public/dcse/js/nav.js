$(document).scroll(() => {
	const y = $(this).scrollTop();
	const scrollPoint = 400;
	const back = $('#back-to-top');
	if(y > scrollPoint) {
		back.addClass('nygov-back-to-top-show').removeClass('nygov-back-to-top-hidden');
	} else {
		back.addClass('nygov-back-to-top-hidden').removeClass('nygov-back-to-top-show')
	}
})
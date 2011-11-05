jQuery(window).scroll(function() {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();
	var elemTop = $('#sun').offset().top;
	var elemBottom = elemTop + $('#sun').height();

	if ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)) {
		$('#sun').addClass('risen');
	} else {
		$('#sun').removeClass('risen');
	};
});
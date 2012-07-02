/* Expanding Navigation */

function ExpandTarget(controller) {
	this.controller = controller;
	
	this.target = $('.' + this.controller.attr('data-target'));

	this.expand = function() {
		this.target.toggleClass('is-expanded');
	};
}

$('.js-ctrl').click(function() {

	new ExpandTarget($(this)).expand();

	return false;

});
$(document).ready( function() {
	$('.add-ingredient').click( function() {
		$(".ingredients ul li").last().clone().appendTo(".ingredients ul");
		$(".ingredients ul li #ingredient").last().val('');
	});
	// TODO Add remove ingredient function
	$('.add-direction').click( function() {
		$(".directions ul li").last().clone().appendTo(".directions ul");
		$(".directions ul li #direction").last().val('');
	});
	// TODO Add remove direction function
});
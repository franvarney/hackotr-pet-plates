$(document).ready( function() {
	$('.add-ingredient').click( function() {
		$( ".ingredients ul li" ).last().clone().appendTo( ".ingredients ul" );
	});
	$('.add-direction').click( function() {
		$( ".directions ul li" ).last().clone().appendTo( ".directions ul" );
	});
});
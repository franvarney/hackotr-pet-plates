$(".form-login-link").click(function() {
	$(".form-signup ").removeClass("form-active-class");    
	$(".form-login ").addClass("form-active-class");
});
$(".form-login-linknot").click(function() {
	$(".form-signup ").addClass("form-active-class");    
	$(".form-login ").removeClass("form-active-class");
});
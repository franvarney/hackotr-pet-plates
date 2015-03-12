$(".form-login-link").click(function() {
	$(".form-signup ").removeClass("form-active-class");    
	$(".form-login ").addClass("form-active-class");
});
$(".form-login-linknot").click(function() {
	$(".form-signup ").addClass("form-active-class");    
	$(".form-login ").removeClass("form-active-class");
});

$(".logout").click(function() {
  $(".navbar ul").toggleClass("login-active");    
});







  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-60680600-1', 'auto');
  ga('send', 'pageview');


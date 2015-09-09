# Так приятней :)
window.log = (param) ->
	console.log(param);

# Navigation
# Fix on scroll down
nav = $('body > header > nav')
$(window).scroll ->
	if ($(@).scrollTop() > 54)
		nav.addClass('fixed')
		$('body').addClass('nav-fixed')
	else
		nav.removeClass('fixed')
		$('body').removeClass('nav-fixed')

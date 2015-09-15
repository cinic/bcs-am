# Так приятней :)
window.log = (param) ->
	console.log(param);

# Navigation
# Fix on scroll down
nav = $('nav.menu')
$(window).scroll ->
	if ($(@).scrollTop() > 75)
		nav.addClass('fixed')
	else
		nav.removeClass('fixed')

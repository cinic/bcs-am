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

# owl carousel
$ ->
	$('.owl-carousel').owlCarousel
		navigation : false,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true

	$('.toggle-nav').on 'click', ->
		$('nav.menu').toggleClass('active')
$ ->
	if typeof $.fn.easytabs == 'function'
		$('.tab-container, .tab-rates-container, .tab-analytics-container').easytabs()

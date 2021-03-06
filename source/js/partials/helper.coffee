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
	if typeof $.fn.owlCarousel == 'function'
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

	if $('.custom-checkbox input').is(':checked')
			$('.custom-checkbox input').parent().addClass('checked').parent().addClass('checked')
	$('.custom-checkbox input').on 'change', ->
		if $(@).is(':checked')
			$(@).parent().addClass('checked').parent().addClass('checked')
		else
			$(@).parent().removeClass('checked').parent().removeClass('checked')

	$('.about .awards .expand .plus, .about .awards .expand .label').on 'click', ->
		$('.about .awards .collapsed').slideDown()

	$('.about .team .bio').on 'click', (e)->
		e.preventDefault()
		$(@).siblings('.collapsed').slideToggle()

# darkbox
closeDarkbox = ->
	$('body').removeClass('fixed')
	$('.darkbox').fadeOut 600, ->
		$('.darkbox').remove
$ ->
	$('.offices-select').on 'click', (e)->
		e.preventDefault()
		$('<div class="darkbox"><div class="darkbox-wrapper"><div class="darkbox-close"></div></div></div>').appendTo('body')
		$('#cities-choice').clone().appendTo('.darkbox-wrapper')
		$('.darkbox').fadeIn 600, ->
			$('body').addClass('fixed')
			$('.darkbox').addClass('active')

		$('.darkbox-close').on 'click', ->
			closeDarkbox()
		$(document).on 'keypress', (e)->
			if (e.keyCode == 27) then closeDarkbox()
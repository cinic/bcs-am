$ ->
	$('.calculator-form span.time').on 'click', ->
		$(@).siblings().removeClass('active').end().andSelf().addClass('active')
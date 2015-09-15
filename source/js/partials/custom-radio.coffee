$ ->
	$('.custom-radio input').on 'change', ->
		$('.custom-radio input').parent().removeClass('checked').parent().removeClass('checked')
		if $(@).is(':checked')
			$(@).parent().addClass('checked').parent().addClass('checked')
		else
			$('.custom-radio input').parent().removeClass('checked').parent().removeClass('checked')
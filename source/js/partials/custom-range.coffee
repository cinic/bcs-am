# Number formatter
Number::formatMoney = (c, d, t) ->
	n = this
	c = if isNaN(c = Math.abs(c)) then 2 else c
	d = if d == undefined then '.' else d
	t = if t == undefined then ',' else t
	s = if n < 0 then '-' else ''
	i = parseInt(n = Math.abs(+n or 0).toFixed(c)) + ''
	j = if (j = i.length) > 3 then j % 3 else 0
	s + (if j then i.substr(0, j) + t else '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (if c then d + Math.abs(n - i).toFixed(c).slice(2) else '') + ' ₽'

calcValue = (v) ->
	percent = $('#income-percent').data('value') * 1
	interval = $('#bond-interval').val() * 1
	r = v / 100 * percent * interval
	(Math.floor(r,0)).formatMoney(0, '', ' ')

calcValueHeight = (v) ->
	Math.log(v) * 5

calcValueHeight2 = (v) ->
	Math.log(v) * 8
	

calcIncomeHeight = (v) ->
	#v.match(/([0-9\s]+)( ₽)/)[1].replace(/\s/g, "") * 1 / 10000
	Math.log(v.match(/([0-9\s]+)( ₽)/)[1].replace(/\s/g, "") * 1) * 3


slider = document.getElementById('calc-range')
sliderPiaInvest = document.getElementById('calc-range-pia-investments')
sliderPiaRefill = document.getElementById('calc-range-pia-refill')

if slider?
	valueInput = document.getElementById('calc-range-input')
	noUiSlider.create slider,
		start: 100000,
		connect: 'lower',
		step: 10000,
		range:
			'min': 50000,
			'max': 2000000
		pips:
			mode: 'values',
			values: [50000, 500000, 1000000, 1500000, 2000000],
			density: 10000,
			format: wNumb
				postfix: '&nbsp;т.',
				encoder: (value) ->
					value / 1000
	slider.noUiSlider.on 'update', ( values, handle ) ->
		rawValue = values[handle] * 1
		valueInput.value = (values[handle] * 1).formatMoney(0, '', ' ')
		valueBg = $('.calculator .income-values .value-bg').height()
		$('.calculator #range-value').text( valueInput.value )
		$('.calculator #income-value, .calculator #income-result').text( calcValue(values[handle] * 1) )
		$('.calculator .income-values .value-bg').css('height', calcValueHeight(rawValue))
		$('.calculator .income-values .income-bg').css('height', calcIncomeHeight(calcValue(values[handle] * 1)))

	valueInput.addEventListener 'change', ->
		slider.noUiSlider.set([null, this.value])
		
	$ ->
		$('.calculator #calc-range-input').on 'change', ->
			val = ($(@).val().match(/([0-9\s]+)( ₽)/)[1].replace(/\s/g, "") * 1).formatMoney(0, '', ' ')
			$(@).val( val )
			$('.calculator #range-value').text( val )

		$('.calculator-form span.time').on 'click', ->
			value = $('.calculator #calc-range-input').val().match(/([0-9\s]+)( ₽)/)[1].replace(/\s/g, "") * 1 
			$(@).siblings().removeClass('active').end().andSelf().addClass('active')
			$('.calculator #bond-interval').val( $(@).data('value') )
			$('.calculator #income-value, .calculator #income-result').text( calcValue( value) )
			$('.calculator .income-values .income-bg').css('height', calcIncomeHeight(calcValue( value )))

# Calculator on Pia page
if sliderPiaInvest?
	valueInput2 = document.getElementById('calc-range-input-investments')
	noUiSlider.create sliderPiaInvest,
		start: 100000,
		connect: 'lower',
		step: 10000,
		range:
			'min': 50000,
			'max': 2000000
		pips:
			mode: 'values',
			values: [50000, 500000, 1000000, 1500000, 2000000],
			density: 10000,
			format: wNumb
				postfix: '&nbsp;т.',
				encoder: (value) ->
					value / 1000

	valueInput2.addEventListener 'change', ->
		sliderPiaInvest.noUiSlider.set([null, this.value])

	sliderPiaInvest.noUiSlider.on 'update', ( values, handle ) ->
		rawValue = values[handle] * 1
		valueInput2.value = (values[handle] * 1).formatMoney(0, '', ' ')
		$('.calculator #range-value').text( valueInput2.value )
		$('.calculator .income-values .value-bg').css('height', calcValueHeight2(rawValue))

if sliderPiaRefill?
	valueInput3 = document.getElementById('calc-range-input-refill')
	noUiSlider.create sliderPiaRefill,
		start: 100000,
		connect: 'lower',
		step: 10000,
		range:
			'min': 10000,
			'max': 400000
		pips:
			mode: 'values',
			values: [10000, 100000, 200000, 300000, 400000],
			density: 500,
			format: wNumb
				postfix: '&nbsp;т.',
				encoder: (value) ->
					value / 1000
	valueInput3.addEventListener 'change', ->
		sliderPiaRefill.noUiSlider.set([null, this.value])

if sliderPiaInvest? && sliderPiaRefill?
	sliderPiaInvest.noUiSlider.on 'update', ( values, handle ) ->
		rawValue = values[handle] * 1
		valueInput2.value = (values[handle] * 1).formatMoney(0, '', ' ')

	sliderPiaRefill.noUiSlider.on 'update', ( values, handle ) ->
		rawValue = values[handle] * 1
		valueInput3.value = (values[handle] * 1).formatMoney(0, '', ' ')

	# Calculator pia time click binding
	$ -> 
		$('.calculator-form span.time').on 'click', ->
			$(@).siblings().removeClass('active').end().andSelf().addClass('active')


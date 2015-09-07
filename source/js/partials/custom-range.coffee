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

slider = document.getElementById('calc-range')
valueInput = document.getElementById('calc-range-input')
noUiSlider.create slider,
  start: 100000,
  connect: 'lower',
  step: 5000,
  range:
    'min': 50000,
    'max': 2000000

slider.noUiSlider.on 'update', ( values, handle ) ->
  valueInput.value = (values[handle] * 1).formatMoney(0, '', ' ')

valueInput.addEventListener 'change', ->
  slider.noUiSlider.set([null, this.value])
  
$ ->
  $('#calc-range-input').on 'change', ->
    val = ($(@).val() * 1)
    $(@).val( val.formatMoney(0, '', ' ') )
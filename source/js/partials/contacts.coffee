markers = []
routing = false
contactMap = true

hoverMarker = (num) ->
	marker = markers[num]
	placemark = marker.placemark
	placemark.options.set('iconContentLayout', ymaps.templateLayoutFactory.createClass('<span class="marker active">'+num+'</span>'))
	$('.point[data-point='+num+']').addClass('hovered')

blurMarker = (num) ->
	marker = markers[num];
	placemark = marker.placemark;
	unless marker.active then placemark.options.set('iconContentLayout', ymaps.templateLayoutFactory.createClass('<span class="marker">'+num+'</span>'))
	$('.point[data-point='+num+']').removeClass('hovered')

openPointDetails = (num) ->
	unless $('.point-detail[data-point='+num+']').is(':visible')
		closeAllPointDetails()
		$('.point[data-point=' + num + ']').addClass('active')
		$('.point-detail[data-point='+num+']').show()

		marker = markers[num]
		marker.active = true
		markers[num] = marker
		hoverMarker(num)

closePointDetails = (num) ->
	$('.point[data-point=' + num + ']').removeClass('active')
	$('.point-detail[data-point='+num+']').hide()
	marker = markers[num]
	marker.active = false
	markers[num] = marker
	blurMarker(num)

closeAllPointDetails = ->
	$('.point-detail').each ->
		num = parseInt($(@).attr('data-point'))
		closePointDetails(num)

$ ->
	$('.contact-map .etabs .item a').on 'click', (e) ->
		closeAllPointDetails()

	$('.contact-map .points .point').on 'mouseenter', ->
		num = parseInt($(@).attr('data-point'))
		hoverMarker(num)

	$('.contact-map .points .point').on 'mouseleave', ->
		num = parseInt($(@).attr('data-point'))
		blurMarker(num)

	$('.contact-map .points .point').on 'click', ->
		if $(@).hasClass('active')
			num = parseInt($(@).data('point'))
			closePointDetails(num)
		else
			num = parseInt($(@).attr('data-point'))
			openPointDetails(num)

	if $('#contact-map') && $('#contact-map').length
		ymaps.ready ->
			contactMap = new (ymaps.Map)('contact-map',
				center: [center_latitude, center_longitude],
				zoom: 11,
				controls: [],
				behaviors: ['drag']
			)

			for j of contactPoints
				point = contactPoints[j]
				placemark = new (ymaps.Placemark)(point, {},
					iconLayout: 'default#imageWithContent'
					iconImageHref: '/Content/img/spacer.png'
					iconImageSize: [44,44]
					iconImageOffset: [-22,-22]
					iconContentSize: [44,44]
					pointNum: j
					iconContentLayout: ymaps.templateLayoutFactory.createClass('<span class="marker">' + j + '</span>'))
				placemark.events.add('mouseenter', (e) ->
					num = e.get('target').options.get('pointNum')
					hoverMarker num
					return
				).add('mouseleave', (e) ->
					num = e.get('target').options.get('pointNum')
					blurMarker num
					return
				).add 'click', (e) ->
					num = e.get('target').options.get('pointNum')
					openPointDetails num
					return
				contactMap.geoObjects.add placemark
				markers[j] =
					placemark: placemark
					active: false

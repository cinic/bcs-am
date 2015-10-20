var blurMarker, calcIncomeHeight, calcValue, calcValueHeight, calcValueHeight2, closeAllPointDetails, closeDarkbox, closePointDetails, contactMap, hoverMarker, markers, nav, openPointDetails, routing, slider, sliderPiaInvest, sliderPiaRefill, valueInput, valueInput2, valueInput3;

window.log = function(param) {
  return console.log(param);
};

nav = $('nav.menu');

$(window).scroll(function() {
  if ($(this).scrollTop() > 75) {
    return nav.addClass('fixed');
  } else {
    return nav.removeClass('fixed');
  }
});

$(function() {
  $('.owl-carousel').owlCarousel({
    navigation: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true
  });
  return $('.toggle-nav').on('click', function() {
    return $('nav.menu').toggleClass('active');
  });
});

$(function() {
  if (typeof $.fn.easytabs === 'function') {
    $('.tab-container, .tab-rates-container, .tab-analytics-container').easytabs();
  }
  if ($('.custom-checkbox input').is(':checked')) {
    $('.custom-checkbox input').parent().addClass('checked').parent().addClass('checked');
  }
  $('.custom-checkbox input').on('change', function() {
    if ($(this).is(':checked')) {
      return $(this).parent().addClass('checked').parent().addClass('checked');
    } else {
      return $(this).parent().removeClass('checked').parent().removeClass('checked');
    }
  });
  $('.about .awards .expand .plus, .about .awards .expand .label').on('click', function() {
    return $('.about .awards .collapsed').slideDown();
  });
  return $('.about .team .bio').on('click', function(e) {
    e.preventDefault();
    return $(this).siblings('.collapsed').slideToggle();
  });
});

$(function() {
  return $('.custom-select').selectize();
});

$(function() {
  return $('.custom-radio input').on('change', function() {
    $('.custom-radio input').parent().removeClass('checked').parent().removeClass('checked');
    if ($(this).is(':checked')) {
      return $(this).parent().addClass('checked').parent().addClass('checked');
    } else {
      return $('.custom-radio input').parent().removeClass('checked').parent().removeClass('checked');
    }
  });
});

Number.prototype.formatMoney = function(c, d, t) {
  var i, j, n, s;
  n = this;
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d === void 0 ? '.' : d;
  t = t === void 0 ? ',' : t;
  s = n < 0 ? '-' : '';
  i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '';
  j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '') + ' ₽';
};

calcValue = function(v) {
  var interval, percent, r;
  percent = $('#income-percent').data('value') * 1;
  interval = $('#bond-interval').val() * 1;
  r = v / 100 * percent * interval;
  return (Math.floor(r, 0)).formatMoney(0, '', ' ');
};

calcValueHeight = function(v) {
  return Math.log(v) * 5;
};

calcValueHeight2 = function(v) {
  return Math.log(v) * 8;
};

calcIncomeHeight = function(v) {
  return Math.log(v.match(/([0-9\s]+)( ₽)/)[1].replace(/\s/g, "") * 1) * 3;
};

slider = document.getElementById('calc-range');

sliderPiaInvest = document.getElementById('calc-range-pia-investments');

sliderPiaRefill = document.getElementById('calc-range-pia-refill');

if (slider != null) {
  valueInput = document.getElementById('calc-range-input');
  noUiSlider.create(slider, {
    start: 100000,
    connect: 'lower',
    step: 10000,
    range: {
      'min': 50000,
      'max': 2000000
    },
    pips: {
      mode: 'values',
      values: [50000, 500000, 1000000, 1500000, 2000000],
      density: 10000,
      format: wNumb({
        postfix: '&nbsp;т.',
        encoder: function(value) {
          return value / 1000;
        }
      })
    }
  });
  slider.noUiSlider.on('update', function(values, handle) {
    var rawValue, valueBg;
    rawValue = values[handle] * 1;
    valueInput.value = (values[handle] * 1).formatMoney(0, '', ' ');
    valueBg = $('.calculator .income-values .value-bg').height();
    $('.calculator #range-value').text(valueInput.value);
    $('.calculator #income-value, .calculator #income-result').text(calcValue(values[handle] * 1));
    $('.calculator .income-values .value-bg').css('height', calcValueHeight(rawValue));
    return $('.calculator .income-values .income-bg').css('height', calcIncomeHeight(calcValue(values[handle] * 1)));
  });
  valueInput.addEventListener('change', function() {
    return slider.noUiSlider.set([null, this.value]);
  });
  $(function() {
    $('.calculator #calc-range-input').on('change', function() {
      var val;
      val = ($(this).val().match(/([0-9\s]+)( ₽)/)[1].replace(/\s/g, "") * 1).formatMoney(0, '', ' ');
      $(this).val(val);
      return $('.calculator #range-value').text(val);
    });
    return $('.calculator-form span.time').on('click', function() {
      var value;
      value = $('.calculator #calc-range-input').val().match(/([0-9\s]+)( ₽)/)[1].replace(/\s/g, "") * 1;
      $(this).siblings().removeClass('active').end().andSelf().addClass('active');
      $('.calculator #bond-interval').val($(this).data('value'));
      $('.calculator #income-value, .calculator #income-result').text(calcValue(value));
      return $('.calculator .income-values .income-bg').css('height', calcIncomeHeight(calcValue(value)));
    });
  });
}

if (sliderPiaInvest != null) {
  valueInput2 = document.getElementById('calc-range-input-investments');
  noUiSlider.create(sliderPiaInvest, {
    start: 100000,
    connect: 'lower',
    step: 10000,
    range: {
      'min': 50000,
      'max': 2000000
    },
    pips: {
      mode: 'values',
      values: [50000, 500000, 1000000, 1500000, 2000000],
      density: 10000,
      format: wNumb({
        postfix: '&nbsp;т.',
        encoder: function(value) {
          return value / 1000;
        }
      })
    }
  });
  valueInput2.addEventListener('change', function() {
    return sliderPiaInvest.noUiSlider.set([null, this.value]);
  });
  sliderPiaInvest.noUiSlider.on('update', function(values, handle) {
    var rawValue;
    rawValue = values[handle] * 1;
    valueInput2.value = (values[handle] * 1).formatMoney(0, '', ' ');
    $('.calculator #range-value').text(valueInput2.value);
    return $('.calculator .income-values .value-bg').css('height', calcValueHeight2(rawValue));
  });
}

if (sliderPiaRefill != null) {
  valueInput3 = document.getElementById('calc-range-input-refill');
  noUiSlider.create(sliderPiaRefill, {
    start: 100000,
    connect: 'lower',
    step: 10000,
    range: {
      'min': 10000,
      'max': 400000
    },
    pips: {
      mode: 'values',
      values: [10000, 100000, 200000, 300000, 400000],
      density: 500,
      format: wNumb({
        postfix: '&nbsp;т.',
        encoder: function(value) {
          return value / 1000;
        }
      })
    }
  });
  valueInput3.addEventListener('change', function() {
    return sliderPiaRefill.noUiSlider.set([null, this.value]);
  });
}

if ((sliderPiaInvest != null) && (sliderPiaRefill != null)) {
  sliderPiaInvest.noUiSlider.on('update', function(values, handle) {
    var rawValue;
    rawValue = values[handle] * 1;
    return valueInput2.value = (values[handle] * 1).formatMoney(0, '', ' ');
  });
  sliderPiaRefill.noUiSlider.on('update', function(values, handle) {
    var rawValue;
    rawValue = values[handle] * 1;
    return valueInput3.value = (values[handle] * 1).formatMoney(0, '', ' ');
  });
  $(function() {
    return $('.calculator-form span.time').on('click', function() {
      return $(this).siblings().removeClass('active').end().andSelf().addClass('active');
    });
  });
}

closeDarkbox = function() {
  $('body').removeClass('fixed');
  return $('.darkbox').fadeOut(600, function() {
    return $('.darkbox').remove;
  });
};

$(function() {
  return $('.offices-select').on('click', function(e) {
    e.preventDefault();
    $('<div class="darkbox"><div class="darkbox-wrapper"><div class="darkbox-close"></div></div></div>').appendTo('body');
    $('#cities-choice').clone().appendTo('.darkbox-wrapper');
    $('.darkbox').fadeIn(600, function() {
      $('body').addClass('fixed');
      return $('.darkbox').addClass('active');
    });
    $('.darkbox-close').on('click', function() {
      return closeDarkbox();
    });
    return $(document).on('keypress', function(e) {
      if (e.keyCode === 27) {
        return closeDarkbox();
      }
    });
  });
});

markers = [];

routing = false;

contactMap = true;

hoverMarker = function(num) {
  var marker, placemark;
  marker = markers[num];
  placemark = marker.placemark;
  placemark.options.set('iconContentLayout', ymaps.templateLayoutFactory.createClass('<span class="marker active">' + num + '</span>'));
  return $('.point[data-point=' + num + ']').addClass('hovered');
};

blurMarker = function(num) {
  var marker, placemark;
  marker = markers[num];
  placemark = marker.placemark;
  if (!marker.active) {
    placemark.options.set('iconContentLayout', ymaps.templateLayoutFactory.createClass('<span class="marker">' + num + '</span>'));
  }
  return $('.point[data-point=' + num + ']').removeClass('hovered');
};

openPointDetails = function(num) {
  var marker;
  if (!$('.point-detail[data-point=' + num + ']').is(':visible')) {
    closeAllPointDetails();
    $('.point[data-point=' + num + ']').addClass('active');
    $('.point-detail[data-point=' + num + ']').show();
    marker = markers[num];
    marker.active = true;
    markers[num] = marker;
    return hoverMarker(num);
  }
};

closePointDetails = function(num) {
  var marker;
  $('.point[data-point=' + num + ']').removeClass('active');
  $('.point-detail[data-point=' + num + ']').hide();
  marker = markers[num];
  marker.active = false;
  markers[num] = marker;
  return blurMarker(num);
};

closeAllPointDetails = function() {
  return $('.point-detail').each(function() {
    var num;
    num = parseInt($(this).attr('data-point'));
    return closePointDetails(num);
  });
};

$(function() {
  $('.contact-map .etabs .item a').on('click', function(e) {
    return closeAllPointDetails();
  });
  $('.contact-map .points .point').on('mouseenter', function() {
    var num;
    num = parseInt($(this).attr('data-point'));
    return hoverMarker(num);
  });
  $('.contact-map .points .point').on('mouseleave', function() {
    var num;
    num = parseInt($(this).attr('data-point'));
    return blurMarker(num);
  });
  $('.contact-map .points .point').on('click', function() {
    var num;
    if ($(this).hasClass('active')) {
      num = parseInt($(this).data('point'));
      return closePointDetails(num);
    } else {
      num = parseInt($(this).attr('data-point'));
      return openPointDetails(num);
    }
  });
  if ($('#contact-map') && $('#contact-map').length) {
    return ymaps.ready(function() {
      var j, placemark, point, results;
      contactMap = new ymaps.Map('contact-map', {
        center: [center_latitude, center_longitude],
        zoom: 11,
        controls: [],
        behaviors: ['drag']
      });
      results = [];
      for (j in contactPoints) {
        point = contactPoints[j];
        placemark = new ymaps.Placemark(point, {}, {
          iconLayout: 'default#imageWithContent',
          iconImageHref: '/Content/img/spacer.png',
          iconImageSize: [44, 44],
          iconImageOffset: [-22, -22],
          iconContentSize: [44, 44],
          pointNum: j,
          iconContentLayout: ymaps.templateLayoutFactory.createClass('<span class="marker">' + j + '</span>')
        });
        placemark.events.add('mouseenter', function(e) {
          var num;
          num = e.get('target').options.get('pointNum');
          hoverMarker(num);
        }).add('mouseleave', function(e) {
          var num;
          num = e.get('target').options.get('pointNum');
          blurMarker(num);
        }).add('click', function(e) {
          var num;
          num = e.get('target').options.get('pointNum');
          openPointDetails(num);
        });
        contactMap.geoObjects.add(placemark);
        results.push(markers[j] = {
          placemark: placemark,
          active: false
        });
      }
      return results;
    });
  }
});

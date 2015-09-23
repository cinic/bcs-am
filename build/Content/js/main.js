var calcIncomeHeight, calcValue, calcValueHeight, nav, slider, valueInput;

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
  return $('.tab-container').easytabs();
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
  var opposite, res;
  opposite = v / 10000 < 10;
  return res = opposite ? v / 10000 * -1 : v / 10000;
};

calcIncomeHeight = function(v) {
  return v.match(/([0-9\s]+)( ₽)/)[1].replace(/\s/g, "") * 1 / 10000;
};

slider = document.getElementById('calc-range');

valueInput = document.getElementById('calc-range-input');

noUiSlider.create(slider, {
  start: 100000,
  connect: 'lower',
  step: 10000,
  range: {
    'min': 50000,
    '25%': 500000,
    '50%': 1000000,
    '75%': 1500000,
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
  return $('.calculator #calc-range-input').on('change', function() {
    var val;
    val = ($(this).val().match(/([0-9\s]+)( ₽)/)[1].replace(/\s/g, "") * 1).formatMoney(0, '', ' ');
    $(this).val(val);
    return $('.calculator #range-value').text(val);
  });
});

$(function() {
  return $('.calculator-form span.time').on('click', function() {
    var value;
    value = $('.calculator #calc-range-input').val().match(/([0-9\s]+)( ₽)/)[1].replace(/\s/g, "") * 1;
    $(this).siblings().removeClass('active').end().andSelf().addClass('active');
    $('.calculator #bond-interval').val($(this).data('value'));
    $('.calculator #income-value, .calculator #income-result').text(calcValue(value));
    return $('.calculator .income-values .income-bg').css('height', calcIncomeHeight(calcValue(value)));
  });
});

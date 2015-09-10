var nav, slider, valueInput;

window.log = function(param) {
  return console.log(param);
};

nav = $('body > header > nav');

$(window).scroll(function() {
  if ($(this).scrollTop() > 54) {
    nav.addClass('fixed');
    return $('body').addClass('nav-fixed');
  } else {
    nav.removeClass('fixed');
    return $('body').removeClass('nav-fixed');
  }
});

$(function() {
  return $('.custom-select').selectize();
});

$(function() {
  return $('.custom-radio input').on('change', function() {
    $('.custom-radio input').parent().removeClass('checked');
    if ($(this).is(':checked')) {
      return $(this).parent().addClass('checked');
    } else {
      return $('.custom-radio input').parent().removeClass('checked');
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

slider = document.getElementById('calc-range');

valueInput = document.getElementById('calc-range-input');

noUiSlider.create(slider, {
  start: 125000,
  connect: 'lower',
  step: 10000,
  range: {
    'min': 50000,
    '25%': 500000,
    '50%': 1000000,
    'max': 2000000
  },
  pips: {
    mode: 'range',
    density: 3
  }
});

slider.noUiSlider.on('update', function(values, handle) {
  return valueInput.value = (values[handle] * 1).formatMoney(0, '', ' ');
});

valueInput.addEventListener('change', function() {
  return slider.noUiSlider.set([null, this.value]);
});

$(function() {
  return $('#calc-range-input').on('change', function() {
    var val;
    val = $(this).val() * 1;
    return $(this).val(val.formatMoney(0, '', ' '));
  });
});

$(function() {
  return $('.calculator-form span.time').on('click', function() {
    return $(this).siblings().removeClass('active').end().andSelf().addClass('active');
  });
});

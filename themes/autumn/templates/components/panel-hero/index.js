var $ = jQuery;
var _window = $(window);

var _handlePanelHeroSlider = function () {
  $('.panel-hero-slider .slider-wrap').each(function(index, el) {
    var thisPanel = $(this).closest('.panel-hero-slider');

    if (thisPanel.hasClass('slider-init') == false) {
      $(this).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        prevArrow: thisPanel.find('.slider-prev'),
        nextArrow: thisPanel.find('.slider-next')
      });

      thisPanel.addClass('slider-init');
    }
  });
}

var _handlePanelHero = function () {
  $('.panel-hero .bg-image').each(function(index, el) {
    var paxImage = $(this);
    var paxClosestHero = $(this).closest('.panel-hero');
    var thisAllowed = true;

    if (paxClosestHero.hasClass('slick-slide')) {
      thisAllowed = false;

      if (paxClosestHero.hasClass('slick-current')) {
        thisAllowed = true;
      }
    }

    if (thisAllowed) {
      if ($(this).hasClass('init-scroll-events') == false) {
        $(this).addClass('init-scroll-events');

        _window.on('scroll', function(event) {
          if (_window.outerWidth() > 767) {
            if ($('body').hasClass('autumn_parallax-0') == false && paxClosestHero.hasClass('hero-half') == false) {
              if (paxClosestHero.hasClass('first-panel-hero')) {
                var perc = _window.scrollTop()/_window.outerHeight();
                var endVal = '-20vh';
                var endValInt = 20;
              } else {
                var perc = 1 - ((paxClosestHero.offset().top - _window.scrollTop() + paxClosestHero.outerHeight()) / (_window.outerHeight() + paxClosestHero.outerHeight()));
                var endVal = '-40vh';
                var endValInt = 40;
              }

              if (perc <= 0) {
                paxImage.css('transform', 'translate3d(0, 0, 0)');
              } else if (perc >= 1) {
                paxImage.css('transform', 'translate3d(0, '+endVal+', 0)');
              } else {
                var calcVal = perc * endValInt;
                var calcValPx = (_window.outerHeight()/100) * calcVal;

                paxImage.css('transform', 'translate3d(0, -'+calcValPx+'px, 0)');
              }
            } else {
              $(this).closest('.panel-hero').addClass('no-parallax');
            }
          }
        });
      }
    } else {
      $(this).closest('.panel-hero').addClass('no-parallax');
    }
  });
}

_window.on('load', function(event) {
  if ($('.panel-hero-slider').length > 0) {
    _handlePanelHeroSlider();

    if ($('.panel-hero').length > 0) {
      _handlePanelHero();
    }
  } else {
    if ($('.panel-hero').length > 0) {
      _handlePanelHero();
    }
  }
});

$('body').on('updatelayoutbackend', function(event) {
  if ($('.panel-hero-slider').length > 0) {
    _handlePanelHeroSlider();

    if ($('.panel-hero').length > 0) {
      _handlePanelHero();
    }
  } else {
    if ($('.panel-hero').length > 0) {
      _handlePanelHero();
    }
  }

  _window.trigger('scroll');
});

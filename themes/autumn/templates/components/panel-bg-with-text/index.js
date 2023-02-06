var $ = jQuery;
var _window = $(window);

var _handleBgWithText = function () {
  _window.on('resize', function(event) {
    $('.panel-bg-with-text video').each(function(index, el) {
      var thisPanel = $(this).closest('.panel-bg-with-text');

      var videoRatio = $(this).outerWidth()/$(this).outerHeight();
      var panelRatio = thisPanel.outerWidth()/thisPanel.outerHeight();

      if (videoRatio > panelRatio) {
        $(this).addClass('height');
      } else {
        $(this).removeClass('height');
      }
    });
  });

  $('.panel-bg-with-text').each(function(index, el) {
    if ($(this).next().hasClass('panel-bg-with-text')) {
      $(this).addClass('no-space-bottom');
      $(this).next().addClass('no-space-top')
    }
  });
}

var _initBgImageWithText = function () {
  $('.panel-bg-with-text .bg-image').each(function(index, el) {
    if ($(this).hasClass('init-scroll-events') == false) {
      $(this).addClass('init-scroll-events');

      var paxImage = $(this);

      _window.on('scroll', function(event) {
        if ($('body').hasClass('autumn_theme_parallax-0') == false) {
          if (_window.outerWidth() > 767) {
            var perc = 1 - ((paxImage.offset().top - _window.scrollTop() + paxImage.outerHeight()) / (_window.outerHeight() + paxImage.outerHeight()));

            if (perc <= 0) {
              paxImage.css('transform', 'translate3d(0, 0, 0)');
            } else if (perc >= 1) {
              paxImage.css('transform', 'translate3d(0, -20vw, 0)');
            } else {
              var calcVal = perc * 20;
              var calcValPx = (_window.outerWidth()/100) * calcVal;

              paxImage.css('transform', 'translate3d(0, -'+calcValPx+'px, 0)');
            }
          }
        } else {
          paxImage.css('transform', 'translate3d(0, 0, 0)');
        }
      });
    }
  });

  $('.panel-bg-with-text video').each(function(index, el) {
    if ($(this).hasClass('init-video-events') == false) {
      $(this).addClass('init-video-events');

      var thisPanel = $(this).closest('.panel-bg-with-text');

      var videoRatio = $(this).outerWidth()/$(this).outerHeight();
      var panelRatio = thisPanel.outerWidth()/thisPanel.outerHeight();

      if (videoRatio > panelRatio) {
        $(this).addClass('height');
      }

      _window.on('scroll', function(event) {
        if (_window.scrollTop() > thisPanel.offset().top - _window.outerHeight()/2) {
          if (_window.scrollTop() > thisPanel.offset().top + thisPanel.outerHeight()) {
            thisPanel.find('video').get(0).pause();
          } else {
            thisPanel.find('video').get(0).play();
          }
        } else {
          thisPanel.find('video').get(0).pause();
        }
      });
    }
  });
}

var _initQuotesSlider = function () {
  $('.panel-quotes .slider-wrap').each(function(index, el) {
    var thisPanel = $(this).closest('.panel-quotes');

    if (thisPanel.hasClass('slider-init') == false) {
      $(this).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        prevArrow: thisPanel.find('.slider-prev'),
        nextArrow: thisPanel.find('.slider-next'),
        adaptiveHeight: true,
        speed: 750,
        fade: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              fade: false,
              swipe: true,
              adaptiveHeight: true
            }
          }
        ]
      });

      thisPanel.addClass('slider-init');
    }
  });
}

_window.on('load', function(event) {
  if ($('.panel-bg-with-text').length > 0) {
    _handleBgWithText();
    _initQuotesSlider();
    _initBgImageWithText();
  }
});

$('body').on('updatelayoutbackend', function(event) {
  if ($('.panel-bg-with-text').length > 0) {
    _initQuotesSlider();
    _initBgImageWithText();
  }
});

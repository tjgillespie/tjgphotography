var $ = jQuery;
var _window = $(window);

var _handlePanelUsp = function () {
  $('.panel-usp .usp-slider-wrap').each(function(index, el) {
    var thisPanel = $(this).closest('.panel-usp');

    if (thisPanel.hasClass('slider-init') == false) {
      $(this).slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              arrows: false,
              dots: true,
              arrows: true,
              prevArrow: thisPanel.find('.slider-prev'),
              nextArrow: thisPanel.find('.slider-next')
            }
          }
        ]
      });

      thisPanel.addClass('slider-init');
    }
  });
}

_window.on('load', function(event) {
  if ($('.panel-usp').length > 0) {
    _handlePanelUsp();
  }
});

$('body').on('updatelayoutbackend', function(event) {
  if ($('.panel-usp').length > 0) {
    _handlePanelUsp();
  }
});

var $ = jQuery;
var _window = $(window);

var _handlePanelPartner = function () {
  $('.panel-partner .partner-slider').each(function(index, el) {
    var thisPanel = $(this).closest('.panel-partner');

    $(this).slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: true
          }
        }
      ]
    });
  });
}

_window.on('load', function(event) {
  if ($('.panel-partner').length > 0) {
    _handlePanelPartner();
  }
});

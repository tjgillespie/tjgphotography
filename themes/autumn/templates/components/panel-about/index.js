var $ = jQuery;
var _window = $(window);

var _handlePanelAbout = function () {
  $('.panel-about .about-slider-wrap').each(function(index, el) {
    var thisPanel = $(this).closest('.panel-about');

    if (thisPanel.hasClass('slider-init') == false) {

      $(this).slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        prevArrow: thisPanel.find('.slider-prev'),
        nextArrow: thisPanel.find('.slider-next'),
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
              arrows: false,
              centerMode: true,
              centerPadding: '10%'
            }
          }
        ]
      });

      if (thisPanel.find('.element-about').length < 4) {
        thisPanel.find('.slider-next').hide();
        thisPanel.find('.slider-prev').hide();
        thisPanel.find('.slick-dots').hide();
      }

      thisPanel.addClass('slider-init');
    }
  });
}

_window.on('load', function(event) {
  if ($('.panel-about').length > 0) {
    _handlePanelAbout();
  }
});

$('body').on('updatelayoutbackend', function(event) {
  if ($('.panel-about').length > 0) {
    _handlePanelAbout();
  }
});

var $ = jQuery;
var _window = $(window);

var _handlePanelHeroSlider = function () {

}

_window.on('load', function(event) {
  if ($('.panel-hero-slider').length > 0) {
    _handlePanelHeroSlider();
  }
});

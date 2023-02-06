var $ = jQuery;
var _window = $(window);

var _handlePanelBlogImageSlider = function () {

}

_window.on('load', function(event) {
  if ($('.panel-blog-image-slider').length > 0) {
    _handlePanelBlogImageSlider();
  }
});

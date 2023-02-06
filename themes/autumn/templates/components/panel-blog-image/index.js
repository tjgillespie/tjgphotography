var $ = jQuery;
var _window = $(window);

var _handlePanelBlogImage = function () {

}

_window.on('load', function(event) {
  if ($('.panel-blog-image').length > 0) {
    _handlePanelBlogImage();
  }
});

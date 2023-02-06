var $ = jQuery;
var _window = $(window);

var _handlePanelBlogVideo = function () {

}

_window.on('load', function(event) {
  if ($('.panel-blog-video').length > 0) {
    _handlePanelBlogVideo();
  }
});

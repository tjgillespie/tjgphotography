var $ = jQuery;
var _window = $(window);

var _handlePanelBlogTeaser = function () {

}

_window.on('load', function(event) {
  if ($('.panel-blog-teaser').length > 0) {
    _handlePanelBlogTeaser();
  }
});

var $ = jQuery;
var _window = $(window);

var _handlePanelBlogText = function () {

}

_window.on('load', function(event) {
  if ($('.panel-blog-text').length > 0) {
    _handlePanelBlogText();
  }
});

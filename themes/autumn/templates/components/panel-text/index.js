var $ = jQuery;
var _window = $(window);

var _handlePanelText = function () {

}

_window.on('load', function(event) {
  if ($('.panel-text').length > 0) {
    _handlePanelText();
  }
});

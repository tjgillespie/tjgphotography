var $ = jQuery;
var _window = $(window);

var _handlePanelBanner = function () {

}

_window.on('load', function(event) {
  if ($('.panel-banner').length > 0) {
    _handlePanelBanner();
  }
});

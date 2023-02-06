var $ = jQuery;
var _window = $(window);

var _handlePanelQuotes = function () {

}

_window.on('load', function(event) {
  if ($('.panel-quotes').length > 0) {
    _handlePanelQuotes();
  }
});

var $ = jQuery;
var _window = $(window);

var _handlePanelLegal = function () {

}

_window.on('load', function(event) {
  if ($('.panel-legal').length > 0) {
    _handlePanelLegal();
  }
});

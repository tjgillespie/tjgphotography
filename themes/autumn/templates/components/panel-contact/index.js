var $ = jQuery;
var _window = $(window);

var _handlePanelContact = function () {

}

_window.on('load', function(event) {
  if ($('.panel-contact').length > 0) {
    _handlePanelContact();
  }
});

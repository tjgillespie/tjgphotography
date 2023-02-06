var $ = jQuery;
var _window = $(window);

var _handlePanelFaq = function () {
  $(document).on('click', '.faq-element .faq-title', function(event) {
    $(this).closest('.faq-element').find('.faq-text').slideToggle();
    $(this).closest('.faq-element').toggleClass('active-faq');
  });
}

_window.on('load', function(event) {
  if ($('.panel-faq').length > 0) {
    _handlePanelFaq();
  }
});

var $ = jQuery;
var _window = $(window);

var _helperResizeAdminToolbar = function () {
  var calcHeight = 0;

  if ($('#toolbar-administration').length > 0) {
    calcHeight = calcHeight + $('#toolbar-bar').outerHeight();

    if ($('body').hasClass('toolbar-tray-open')) {
      calcHeight = calcHeight + $('#toolbar-item-administration-tray').outerHeight();
    }
  }

  $('.main-nav').css('transform', 'translate(0,' + calcHeight + 'px)');
}

var handleDrupalBigMessage = function () {
  if ($('.drupal-big-message').length > 0) {
    if ($('.page-outer-wrap').hasClass('header-sticky-on-scroll')) {
      var calcHeight = $('.drupal-big-message').outerHeight();
      $('.main-nav').css('margin-top', calcHeight);
    } else {
      var calcHeight = $('.main-nav').outerHeight();
      $('body').css('margin-top', calcHeight);
    }
  }
}

var checkForBackendChangesLoop = function () {
  if ($('#drupal-modal').find('div').length <= 0) {
    $('.frontend-loader .loading-icon').addClass('active');
    $('.frontend-loader').fadeIn();

    setTimeout(function() {
      $('body').removeClass('backendupdate');

      setTimeout(function() {
        $('body').trigger('updatelayoutbackend');
        $('body').trigger('updatelayout');
        $('body').trigger('custom-resize');

        setTimeout(function() {
          $('.frontend-loader .loading-icon').removeClass('active');
          $('.frontend-loader').fadeOut();
        }, 500);
      }, 100);
    }, 1500);
  } else {
    setTimeout(function() {
      checkForBackendChangesLoop();
    }, 50);
  }
}

var _checkForLangSwitchOrigin = function () {
  if ($('#hidden-language-switcher a').length > 0) {
    setTimeout(function() {
      _buildLangSwitches();
    }, 100);
  } else {
    setTimeout(function() {
      _checkForLangSwitchOrigin();
    }, 100);
  }
}

var _buildLangSwitches = function () {
  //dom prepare
  $('.custom-lang-switch-wrap').each(function(index, el) {
    var thisLangEle = $(this);

    var activeLangItem = $('#hidden-language-switcher a.is-active');

    thisLangEle.find('.selection-text').text(activeLangItem.text());
    thisLangEle.find('.selection-text').attr('data-id', activeLangItem.attr('hreflang'));

    var appendCounter = 0;

    $('#hidden-language-switcher a').each(function(index, el) {
      if ($(this).hasClass('is-active') == false) {
        var thisText = $(this).text();
        var thisId = $(this).attr('hreflang');

        var appendEle = $('<div class="select-item" data-id="'+thisId+'">'+thisText+'</div>')

        thisLangEle.find('.expand-row-inner').append(appendEle);

        appendCounter++;
      }
    });

    /*if (appendCounter > 2) {
      thisLangEle.find('.filter-dropdown').find('.expand-row-inner').addClass('has-scroll');
      thisLangEle.find('.filter-dropdown').find('.expand-row-inner').scrollbar();
    }*/
  });

  //events
  $(document).on('click', '.filter-dropdown .selection', function(event) {
    $(this).closest('.filter-dropdown').toggleClass('active');
    $(this).closest('.filter-dropdown').find('.expand-row').slideToggle();
  });

  $(document).on('click', '.filter-dropdown .select-item', function(event) {
    var thisData = $(this).attr('data-id');
    var thisText = $(this).text();

    $(this).closest('.filter-dropdown').find('.selection-text').text(thisText);

    $(this).closest('.filter-dropdown').removeClass('active');
    $(this).closest('.filter-dropdown').find('.expand-row').slideUp();
    $(this).closest('.filter-dropdown').attr('data-value', thisData);

    $('#hidden-language-switcher a[hreflang="'+thisData+'"]').get(0).click();
  });
}

var initDrupal = function () {
  if ($('#toolbar-administration').length > 0) {
    _helperResizeAdminToolbar();

    setTimeout(function() {
      _helperResizeAdminToolbar();
    }, 500);

    setTimeout(function() {
      _helperResizeAdminToolbar();
    }, 5000);

    $('#toolbar-bar').on('click', function(event) {
      setTimeout(function() {
        _helperResizeAdminToolbar();
      }, 50);
    });

    //prepare dom
    var frontEndLoader = $('<div class="frontend-loader" style="display:none;"><div class="center-content abs-wrap"><div class="loading-icon"><i class="fas fa-spinner"></i></div></div></div>');
    $('body').append(frontEndLoader);

    $(document).on('click', '.ui-widget .form-submit', function(event) {
      $('body').trigger('backendupdate');
      $('body').addClass('backendupdate');

      checkForBackendChangesLoop();
    });
  }

  handleDrupalBigMessage();

  setTimeout(function() {
    handleDrupalBigMessage();

    setTimeout(function() {
      handleDrupalBigMessage();

      setTimeout(function() {
        handleDrupalBigMessage();
      }, 500);
    }, 250);
  }, 50);

  //handle language select
  if ($('#hidden-language-switcher').length > 0) {
    _checkForLangSwitchOrigin();
  }
}

_window.on('load', function(event) {
  initDrupal();
});

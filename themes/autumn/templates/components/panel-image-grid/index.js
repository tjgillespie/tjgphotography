var $ = jQuery;
var _window = $(window);

var maxTimeout = 50;
var timeOutStep = 0;
var _checkImageLoadSliderPopup = function (thisId) {
  var allLoaded = true;
  timeOutStep = timeOutStep + 1;

  $('.popup[data-id="'+thisId+'"]').find('img').each(function(index, el) {
    if ($(this).hasClass('image-loaded') == false) {
      allLoaded = false;
    }
  });

  if (allLoaded) {
    timeOutStep = 0;
    $('.popup[data-id="'+thisId+'"]').find('.slider-wrap').slick('slickGoTo', 0);
  } else {
    if (timeOutStep < maxTimeout) {
      setTimeout(function() {
        _checkImageLoadSliderPopup(thisId);
      }, 100);
    } else {
      timeOutStep = 0;
      $('.popup[data-id="'+thisId+'"]').find('.slider-wrap').slick('slickGoTo', 0);
    }
  }
}

var _handlePanelImageGrid = function () {
  $('.panel-image-grid').addClass('animation-init');

  //initial setup
  $('.panel-image-grid .filter-trigger').first().addClass('active');
  $('.panel-image-grid .mobile-dropdown .filter-trigger').first().addClass('active');

  //filtering
  var options = {
    animationDuration: 0.5, // in seconds
    callbacks: {
      onInit: function() {
        if ($('body').hasClass('autumn_fade_in-1')) {
          _handleGlobalFadeIn();
        }
      },
      onFilteringStart: function() { },
      onFilteringEnd: function() {
        if ($('body').hasClass('autumn_fade_in-1')) {
          _calcFadeInElePos();
          checkFadeInElePos();
        }
      },
      onShufflingStart: function() { },
      onShufflingEnd: function() { },
      onSortingStart: function() { },
      onSortingEnd: function() { }
    },
    controlsSelector: '', // Selector for custom controls
    delay: 0, // Transition delay in ms
    delayMode: 'progressive', // 'progressive' or 'alternate'
    easing: 'ease-out',
    filter: 'all', // Initial filter
    filterOutCss: { // Filtering out animation
      opacity: 0,
      transform: 'scale(0.5)'
    },
    filterInCss: { // Filtering in animation
      opacity: 1,
      transform: 'scale(1)'
    },
    gutterPixels: 0, // Items spacing in pixels
    layout: 'sameWidth', // See layouts
    multifilterLogicalOperator: 'or',
    searchTerm: '',
    setupControls: true, // Should be false if controlsSelector is set
    spinner: { // Configuration for built-in spinner
      enabled: false,
      fillColor: '#2184D0',
      styles: {
        height: '75px',
        margin: '0 auto',
        width: '75px',
        'z-index': 2,
      },
    },
  }

  $('.filter-container').filterizr(options);
}

var _handlePanelImageGridEvents = function () {
  //filter-menu
  $(document).on('click', '.panel-image-grid .filter-bar .filter-trigger', function(event) {
    if (_window.outerWidth() > 767) {
      var thisData = $(this).attr('data-filter');

      $('.panel-image-grid .filter-bar .filter-trigger').removeClass('active');
      $('.panel-image-grid .filter-bar .filter-trigger[data-filter="'+thisData+'"]').addClass('active');
    } else {
      if ($(this).closest('.mobile-dropdown').length > 0) {
        var thisData = $(this).attr('data-filter');

        $('.panel-image-grid .filter-bar .filter-trigger').removeClass('active');
        $('.panel-image-grid .filter-bar .filter-trigger[data-filter="'+thisData+'"]').addClass('active');

        $('.panel-image-grid .mobile-dropdown').slideToggle();
        $('.panel-image-grid .icon-filter').toggleClass('active');
      } else {
        $('.panel-image-grid .mobile-dropdown').slideToggle();
        $('.panel-image-grid .icon-filter').toggleClass('active');
      }
    }
  });

  //popup handler
  var touchExecuted = false;
  $(document).on('click touchend', '.panel-image-grid .filtr-item', function(event) {
    var openAllowed = false;

    if (event.type == 'click') {
      if (touchExecuted == false) {
        openAllowed = true;
      }
    } else {
      touchExecuted = true;

      if ($(this).hasClass('active-touch')) {
        openAllowed = true;

        var _self = $(this);
        setTimeout(function() {
          _self.removeClass('active-touch');
        }, 500);
      } else {
        $('.panel-image-grid .filtr-item').removeClass('active-touch');
        $(this).addClass('active-touch');
      }
    }

    if (openAllowed) {
      var thisId = $(this).attr('data-popup-id');

      //normal image
      if (thisId == '2') {
        $('.popup[data-id="'+thisId+'"]').find('.inner-popup').empty();

        var imgSrc = $(this).attr('data-src');
        var imgEle = $('<img class="inner-image" alt="popup-image">');
        imgEle.attr('src', imgSrc);

        $('.popup[data-id="'+thisId+'"]').find('.inner-popup').append(imgEle);
        _helperPopupResize();

        $('.popup[data-id="'+thisId+'"]').fadeIn(function() {
          $('.popup[data-id="'+thisId+'"]').css('pointer-events', 'all');
        });
      } else if (thisId == '1') {
        var imgSrc = $(this).attr('data-src');
        var imgSrcArray = imgSrc.split(',');

        for (var i = 0; i < imgSrcArray.length; i++) {
          if (imgSrcArray[i] != '') {
            var thisImage = $('<div class="img-wrap"><img class="inner-image" src="'+imgSrcArray[i]+'"><div class="overlay abs-wrap"></div></div>');
            $('.popup[data-id="'+thisId+'"]').find('.slider-wrap').append(thisImage);

            thisImage.find('img').on('load', function(event) {
              $(this).addClass('image-loaded');
            });
          }
        }

        _helperPopupResize();

        $('.popup[data-id="'+thisId+'"]').fadeIn(function() {
          $('.popup[data-id="'+thisId+'"]').css('pointer-events', 'all');
        });

        setTimeout(function() {
          $('.popup[data-id="'+thisId+'"]').find('.slider-wrap').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            variableWidth: true,
            centerMode: true,
            centerPadding: '0',
            prevArrow: $('.popup[data-id="'+thisId+'"]').find('.slider-prev'),
            nextArrow: $('.popup[data-id="'+thisId+'"]').find('.slider-next')
          });

          setTimeout(function() {
            $('.popup[data-id="'+thisId+'"]').find('.inner-popup').addClass('active');

            setTimeout(function() {
              $('.popup[data-id="'+thisId+'"]').find('.slick-current').focus();

              //check if images loaded
              _checkImageLoadSliderPopup(thisId);
            }, 10);
          }, 10);
        }, 10);
      } else if (thisId == '3') {
        var videoSrc = $(this).attr('data-src');

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;
        player = new YT.Player('yt-player-wrap-panel-image-grid', {
          videoId: videoSrc,
          host: 'https://www.youtube-nocookie.com',
          playerVars: {'playsinline': 1, 'modestbranding': 1, 'rel': 0},
          events: {
            'onReady': onPlayerReady
          }
        });

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
          event.target.playVideo();
        }

        _helperPopupResize();

        $('.popup[data-id="'+thisId+'"]').fadeIn(function() {
          $('.popup[data-id="'+thisId+'"]').css('pointer-events', 'all');
        });
      }
    }
  });
}

_window.on('load', function(event) {
  if ($('.panel-image-grid').length > 0) {
    _handlePanelImageGridEvents();
  }
});

$('body').on('lazyloadgallery', function(event) {
  _handlePanelImageGrid();
});

$('body').on('updatelayoutbackend', function(event) {
  if ($('.panel-image-grid').length > 0) {
    if ($('.panel-image-grid').hasClass('animation-init') == false) {
      _handlePanelImageGrid();
    }
  }
});

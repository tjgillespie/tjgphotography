var $ = jQuery;
var _window = $(window);

var checkFadeInElePos = function () {
  $('.fade-in-ele:not(.active)').each(function(index, el) {
    if (_window.scrollTop() > parseInt($(this).attr('fade-in-val'))) {
      $(this).addClass('active');

      if ($(this).hasClass('last-fade-in-ele')) {
        $(this).closest('.slider-last-fade-in').addClass('last-fade-in-true');
      }
    }
  });
}

var _calcFadeInElePos = function () {
  $('.fade-in-ele').each(function(index, el) {
    var thisFadeIn = ($(this).offset().top - _window.outerHeight()) + (_window.outerHeight()/4);

    $(this).attr('fade-in-val', thisFadeIn);
  });
}

var _helperPopupResize = function () {
  var popupPadding = 80;
  var popupMaxHeight = _window.outerHeight() - popupPadding;
  var popupMaxWidth = _window.outerWidth() - popupPadding;

  $('.popup.popup-image').find('img').css('max-height', popupMaxHeight);
  $('.popup.popup-image-slider').find('img').css('max-height', popupMaxHeight);
  $('.popup.popup-image-slider').find('img').css('max-width', popupMaxWidth);

  if (_window.outerWidth()/_window.outerHeight() < 16/9) {
    $('.popup.popup-video').removeClass('video-related-height');
  } else {
    $('.popup.popup-video').addClass('video-related-height');
  }
}

var _helperClosePopup = function (thisPopup) {
  var thisPopup = thisPopup;

  thisPopup.fadeOut(function() {
    thisPopup.css('pointer-events', 'none');
  });

  if (thisPopup.hasClass('popup-image-slider')) {
    if (thisPopup.find('.slider-wrap').hasClass('slick-slider')) {
      thisPopup.find('.slider-wrap').slick('unslick');
    }

    thisPopup.find('.slider-wrap').html('');
    thisPopup.find('.inner-popup').removeClass('active');
  }

  if (thisPopup.hasClass('popup-video')) {
    thisPopup.find('#yt-player-wrap-panel-image-grid').remove();

    var newVideoEle = $('<div id="yt-player-wrap-panel-image-grid" class="abs-wrap"></div>');
    thisPopup.find('.player-append-wrap').append(newVideoEle);
  }
}

var _handleGeneral = function () {
  //main nav sticky
  _window.on('scroll', function(event) {
    if ($('.page-outer-wrap').hasClass('header-sticky-on-scroll')) {
      var checkHeight = _window.outerHeight();

      if ($('.main-nav').hasClass('hero-half-pos')) {
        checkHeight = checkHeight/2;
      }

      if (_window.scrollTop() > checkHeight) {
        $('.main-nav').addClass('sticky');
      } else {
        $('.main-nav').removeClass('sticky');
      }
    } else {
      $('.main-nav').addClass('sticky');
    }
  }).trigger('scroll');

  $('.main-nav .hamburger-menu').on('click', function(event) {
    $(this).toggleClass('active');
    $('#mobile-overlay').toggleClass('active');
  });

  //handle current hash
  _window.on('scroll', function(event) {
    //main nav
    $('.main-nav a').each(function(index, el) {
      if (this.hash !== "") {
        var urlA = this.hash.replace('#', '');

        if ($(this.hash).length > 0) {
          if (_window.scrollTop() > $(this.hash).offset().top - 5) {
            $(this).addClass('active-allowed')
          } else {
            $(this).removeClass('active-allowed');
          }
        }
      }
    });

    $('.main-nav a').removeClass('active');
    $('.main-nav .active-allowed:last').addClass('active');

    //mobile nav
    $('#mobile-overlay a').each(function(index, el) {
      if (this.hash !== "") {
        var urlA = this.hash.replace('#', '');

        if ($(this.hash).length > 0) {
          if (_window.scrollTop() > $(this.hash).offset().top - 5) {
            $(this).addClass('active-allowed')
          } else {
            $(this).removeClass('active-allowed');
          }
        }
      }
    });

    $('#mobile-overlay a').removeClass('active');
    $('#mobile-overlay .active-allowed:last').addClass('active');
  });

  //handle global hash scroling
  $('a').on('click', function(event) {
    if (this.hash !== "") {
      if ($(this.hash).length > 0) {
        event.preventDefault();

        if ($('#mobile-overlay').hasClass('active')) {
          $('#mobile-overlay').removeClass('active');
          $('.main-nav .hamburger-menu').removeClass('active');
        }

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
          checkFadeInElePos();
        });
      }
    }
  });

  //footer links
  $('#footer .row-legal a').each(function(index, el) {
    if ($.trim($(this).attr('href')) == '#' || $.trim($(this).attr('href')) == '') {
      $(this).closest('li').html($(this).text());
    }
  });

  //check hr margin
  $('hr').each(function(index, el) {
    if ($(this).is(':last-child')) {
      $(this).closest('section[class^="panel-"]').addClass('hr-margin-two');
    }
  });
}

var _handlePopups = function () {
  $(document).on('click', '.popup .close-icon', function(event) {
    var thisPopup = $(this).closest('.popup');

    _helperClosePopup(thisPopup);
  });

  $(document).on('click', '.popup', function(event) {
    var t = $(event.target);
    var thisPopup = $(this);

    if ($(this).hasClass('popup-image')) {
      if (t.hasClass('inner-image') == false) {
        _helperClosePopup(thisPopup);
      }
    }
    if ($(this).hasClass('popup-image-slider')) {
      if (t.hasClass('slider-wrap') == false) {
        if (t.closest('.slider-wrap').length <= 0) {
          if (t.hasClass('slider-navi') == false) {
            if (t.closest('.slider-navi').length <= 0) {
              _helperClosePopup(thisPopup);
            }
          }
        }
      }
    }
    if ($(this).hasClass('popup-video')) {
      if (t.hasClass('inner-image') == false) {
        if (t.closest('.inner-image').length <= 0) {
          _helperClosePopup(thisPopup);
        }
      }
    }
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('.popup').each(function(index, el) {
        var thisPopup = $(this);

        _helperClosePopup(thisPopup);
      });
    }
  });

  _window.on('resize', function(event) {
    _helperPopupResize();
  }).trigger('resize');
}

var _handleGlobalFadeIn = function () {
  $('.panel-text').each(function(index, el) {
    $(this).find('.big-p').children().each(function(index, el) {
      $(this).addClass('fade-in-ele');
    });
  });

  //prepare image grid
  var itemsPerRow = 5;

  if (_window.width() < 1024) {
    itemsPerRow = 4;
  }
  if (_window.width() < 768) {
    itemsPerRow = 3;
  }
  if (_window.width() < 500) {
    itemsPerRow = 2;
  }

  itemsPerRow = itemsPerRow - 1;

  $('.panel-image-grid').each(function(index, el) {
    $(this).find('.filter-bar').addClass('fade-in-ele');

    $(this).find('.filtr-item').each(function(index, el) {
      $(this).find('.animation-helper').addClass('fade-in-ele');

      if (index <= itemsPerRow) {
        $(this).find('.animation-helper').addClass('fade-in-delay-' + index);
      }
    });
  });

  //prepare for panel about
  var itemsPerRow = 3;

  if (_window.width() < 1024) {
    itemsPerRow = 2;
  }

  itemsPerRow = itemsPerRow - 1;

  $('.panel-about').each(function(index, el) {
    $(this).find('.row-headline').addClass('fade-in-ele');

    $(this).find('.element-about').each(function(index, el) {
      if (index <= itemsPerRow) {
        $(this).find('.animation-helper').addClass('fade-in-ele');
        $(this).find('.animation-helper').addClass('fade-in-delay-' + index);

        if (index == itemsPerRow) {
          $(this).find('.animation-helper').addClass('last-fade-in-ele');
          $(this).closest('.about-outer-slider-wrap').addClass('last-fade-delay-' + itemsPerRow);
          $(this).closest('.about-outer-slider-wrap').addClass('slider-last-fade-in');
        }
      }
    });
  });

  $('.panel-bg-with-text').each(function(index, el) {
    $(this).find('.animation-helper').addClass('fade-in-ele');
  });

  $('.panel-hero.not-first-hero').each(function(index, el) {
    $(this).find('.animation-helper').addClass('fade-in-ele');
  });

  //prepare for panel usp
  var itemsPerRow = 3;

  if (_window.width() < 768) {
    itemsPerRow = 1;
  }

  $('.panel-usp').each(function(index, el) {
    $(this).find('.row-headline').addClass('fade-in-ele');

    $(this).find('.element-usp').each(function(index, el) {
      if (index <= itemsPerRow) {
        $(this).find('.animation-helper').addClass('fade-in-ele');
        $(this).find('.animation-helper').addClass('fade-in-delay-' + index);

        if (index == itemsPerRow) {
          $(this).find('.animation-helper').addClass('last-fade-in-ele');
          $(this).closest('.usp-slider-wrap').addClass('last-fade-delay-' + itemsPerRow);
          $(this).closest('.usp-slider-wrap').addClass('slider-last-fade-in');
        }
      }
    });
  });

  $('.panel-brands').each(function(index, el) {
    //$(this).find('.fade-headline').addClass('fade-in-ele');

    $(this).find('.element-brand').each(function(index, el) {
      $(this).addClass('fade-in-ele');

      if (_window.outerWidth() > 767) {
        $(this).addClass('fade-in-delay-' + index);
      }
    });
  });

  $('.panel-tickets').each(function(index, el) {
    $(this).find('.row-headline').addClass('fade-in-ele');

    $(this).find('.ticket').each(function(index, el) {
      $(this).addClass('fade-in-ele');

      if (_window.outerWidth() > 767) {
        $(this).addClass('fade-in-delay-' + index);
      }
    });
  });

  $('.panel-blog-teaser').each(function(index, el) {
    $(this).find('.row-headline').addClass('fade-in-ele');

    $(this).find('.blog-post-teaser-element').each(function(index, el) {
      $(this).addClass('fade-in-ele');
    });

    $(this).find('.btn-outer-wrap').addClass('fade-in-ele');
  });

  $('.panel-banner').each(function(index, el) {
    $(this).addClass('fade-in-ele');
  });

  $('.panel-faq').each(function(index, el) {
    $(this).find('.row-headline').addClass('fade-in-ele');

    $(this).find('.faq-element').each(function(index, el) {
      $(this).addClass('fade-in-ele');

      if ($(this).closest('.right-faq-col').length > 0 && _window.outerWidth() > 767) {
        $(this).addClass('fade-in-delay-1');
      }
    });
  });

  $('.panel-services').each(function(index, el) {
    $(this).find('.row-headline').addClass('fade-in-ele');

    $(this).find('.element-services').each(function(index, el) {
      if (_window.outerWidth() > 767) {
        $(this).addClass('fade-in-ele');

        if (index % 2 == 1) {
          $(this).addClass('fade-in-delay-1');
        }
      } else {
        if (index == 0) {
          $(this).closest('.panel-services').find('.outer-slider-wrap').addClass('fade-in-ele');
          $(this).closest('.panel-services').find('.outer-slider-wrap').addClass('last-fade-in-ele');

          $(this).closest('.panel-services').addClass('last-fade-delay-' + 1);
          $(this).closest('.panel-services').addClass('slider-last-fade-in');
        }
      }
    });
  });

  $('.panel-quotes').each(function(index, el) {
    $(this).find('.animation-helper').addClass('fade-in-ele');
    $(this).find('.animation-helper').addClass('last-fade-in-ele');
    $(this).closest('.panel-quotes').addClass('last-fade-delay-' + itemsPerRow);
    $(this).closest('.panel-quotes').addClass('slider-last-fade-in');
  });

  $('.panel-partner').each(function(index, el) {
    $(this).addClass('fade-in-ele');
  });

  $('.panel-contact').each(function(index, el) {
    $(this).find('.row-headline').addClass('fade-in-ele');
    $(this).find('form').addClass('fade-in-ele');
  });

  _window.on('resize', function(event) {
    _calcFadeInElePos();

    setTimeout(function() {
      _calcFadeInElePos();
    }, 1000);
  }).trigger('resize');

  $('body').on('custom-resize', function(event) {
    _calcFadeInElePos();

    setTimeout(function() {
      _calcFadeInElePos();
    }, 1000);
  });

  var scrollHandling = {
    allow: true,
    reallow: function() {
      scrollHandling.allow = true;
    },
    delay: 250
  };

  _window.on('scroll', function(event) {
    if(scrollHandling.allow) {
      checkFadeInElePos();

      scrollHandling.allow = false;
      setTimeout(scrollHandling.reallow, scrollHandling.delay);
    }
  }).trigger('scroll');
}

var initCheckFirstHero = function () {
  if ($('.page-outer-wrap').children().first().hasClass('panel-hero')) {
    $('.page-outer-wrap').children().first().addClass('first-panel-hero');
  }

  $('.panel-hero').each(function(index, el) {
    if ($(this).hasClass('first-panel-hero') == false) {
      $(this).addClass('not-first-hero');
    } else {
      if ($(this).hasClass('hero-half')) {
        $('.main-nav').addClass('hero-half-pos');
      } else {
        $('.main-nav').removeClass('hero-half-pos');
      }
    }
  });

  //error page remove margin
  if ($('.page-outer-wrap').hasClass('page-default')) {
    if ($('.page-outer-wrap ').children().length <= 1) {
      $('.panel-hero-slider').css('padding-bottom', '0px');
      $('.panel-hero').css('margin-bottom', '0px');
    } else {
      $('.panel-hero-slider').css('padding-bottom', '');
      $('.panel-hero').css('margin-bottom', '');
    }
  } else {
    $('.panel-hero-slider').css('padding-bottom', '');
    $('.panel-hero').css('margin-bottom', '');
  }
}

var _handleLazyLoad = function () {
  _window.on('scroll', function(event) {
    var windowH = _window.outerHeight() * 1.5;
    var scrTop = _window.scrollTop();

    $('.lazy-load-image:not(.lazy-load-triggerd)').each(function(index, el) {
      var loadAllowed = true;

      if ($(this).hasClass('mobile') && _window.outerWidth() > 767) {
        loadAllowed = false;
      }

      if (loadAllowed) {
        if (scrTop > $(this).offset().top - windowH) {
          $(this).addClass('lazy-load-triggerd');
          $(this).attr('src', $(this).attr('data-lazy-src'));
        }
      }
    });

    $('.lazy-load-bg-image:not(.lazy-load-triggerd)').each(function(index, el) {
      if (scrTop > $(this).offset().top - windowH) {
        $(this).addClass('lazy-load-triggerd');
        $(this).css('background-image', 'url('+ $(this).attr('data-lazy-src') +')');
      }
    });

    $('.lazy-load-video:not(.lazy-load-triggerd)').each(function(index, el) {
      if (scrTop > $(this).offset().top - windowH) {
        $(this).addClass('lazy-load-triggerd');
        $(this).attr('poster', $(this).attr('data-lazy-poster'));
        $(this).attr('preload', 'auto');
      }
    });

    $('.panel-image-grid:not(.lazy-load-triggerd)').each(function(index, el) {
      if (scrTop > $(this).offset().top - windowH) {
        $(this).addClass('lazy-load-triggerd');

        $(this).find('.lazy-load-image-gallery').each(function(index, el) {
          $(this).attr('src', $(this).attr('data-lazy-src'));
        });

        $('body').trigger('lazyloadgallery');
      }
    });

    $('.maps-target-lazy-load:not(.lazy-load-triggerd)').each(function(index, el) {
      if (scrTop > $(this).offset().top - windowH) {
        $(this).addClass('lazy-load-triggerd');
        $('<iframe src="'+$(this).attr('data-lazy-src')+'" frameborder="0" style="border:0;" allowfullscreen="" title="Map"></iframe>').insertAfter($(this));
      }
    });
  }).trigger('scroll');
}

_window.on('load', function(event) {
  _handleLazyLoad();

  initCheckFirstHero();

  $('body').on('updatelayout', function(event) {
    initCheckFirstHero();
  });

  _handleGeneral();
  _handlePopups();

  if ($('body').hasClass('autumn_fade_in-1')) {
    if ($('.panel-image-grid').length <= 0) {
      _handleGlobalFadeIn();
    }
  }
});

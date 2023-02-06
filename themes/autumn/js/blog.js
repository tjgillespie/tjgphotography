var _handlePanelBlogPost = function () {
  $('.reply-wrap').on('click', function(event) {
    event.preventDefault();

    var url = $(this).closest('.comment-text').find('.comment-reply').find('a').attr('href');

    window.location.href = url;
  });
}

var _handlePanelBlogPostSlider = function () {
  $('.panel-blog-post .blog-image-slider').each(function(index, el) {
    var thisPanel = $(this).closest('.panel-blog-post');

    if ($(this).hasClass('slider-init') == false) {
      $(this).slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        prevArrow: thisPanel.find('.slider-prev'),
        nextArrow: thisPanel.find('.slider-next')
      });

      $(this).addClass('slider-init');
    }
  });
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
}

var _handlePageBlogSearch = function () {
  $('.sidebar .search-click a').each(function(index, el) {
    var field = $(this).attr('data-field');
    var id = $(this).attr('data-id');

    var currentVal = $('select[name="'+field+'"]').val();

    if (currentVal == id) {
      $(this).closest('li').addClass('active');
    }
  });

  $('.sidebar-search').val($('input[name="field_text_01_value"]').val());

  $('.sidebar .search-click a').off('click');
  $('.sidebar .search-click a').on('click', function(event) {
    event.preventDefault();

    var field = $(this).attr('data-field');
    var id = $(this).attr('data-id');

    if ($(this).closest('li').hasClass('active')) {
      $(this).closest('li').removeClass('active');
      $('select[name="'+field+'"]').val('All');
    } else {
      $(this).closest('ul').find('li').removeClass('active');
      $(this).closest('li').addClass('active');
      $('select[name="'+field+'"]').val(id);
    }

    $('.filter-search input[type="submit"]').click();
  });

  $('.sidebar-search').off('change');
  $('.sidebar-search').on('change', function(event) {
    $('input[name="field_text_01_value"]').val($('.sidebar-search').val());

    $('.filter-search input[type="submit"]').click();
  });
}

var makeUri = function(string){
  return encodeURI($.trim(string));
}

var _handleSideBarSearch = function () {
  $('.sidebar-search').on('change', function(event) {
    var thisVal = $(this).val();
    var redirectUrl = $(this).attr('data-url') + $(this).attr('data-field') + '=' + makeUri(thisVal);

    window.location.href = redirectUrl;
  });
}

_window.on('load', function(event) {
  if ($('.panel-blog-search').length > 0 || $('body').hasClass('page-type-page-blog-overview')) {
    _handlePageBlogSearch();

    $(document).on('DOMNodeInserted', function( e ) {
      _handlePageBlogSearch();
    });
  } else {
    if ($('.sidebar .blog-box-wrap').length > 0) {
      _handleSideBarSearch();
    }
  }

  if ($('.panel-blog-post').length > 0) {
    _handlePanelBlogPost();
    _handlePanelBlogPostSlider();
  }
});

$('body').on('updatelayoutbackend', function(event) {
  if ($('.panel-blog-post').length > 0) {
    _handlePanelBlogPostSlider();
  }
});

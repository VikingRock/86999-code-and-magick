'use strict';

(function() {
  var filterBlock = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsBlock = document.querySelector('.reviews');
  var activeFilter = 'reviews-all';
  var currentPage = 0;
  var reviews = [];
  var RECENT_NUM_WEEKS = 2;
  var PAGE_SIZE = 3;

  filterBlock.classList.add('invisible');

  //adding event handler for filter radio buttons
  filterBlock.addEventListener('click', filterHandler);

  function filterHandler(evt) {
    var target = evt.target;

    if ( !(target.tagName === 'INPUT')) {
      return;
    }

    setActiveFilter(target.id);
  }

  getReviews();

  //rendering a new DOM element created in getElementFromTemplate()
  function renderReviews(items, pageNumber) {
    reviewsList.innerHTML = '';
    var fragment = document.createDocumentFragment();

    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pageReviews = items.slice(from, to);

    pageReviews.forEach(function(testimonial) {
      var element = getElementFromTemplate(testimonial);
      fragment.appendChild(element);
    });

    reviewsList.appendChild(fragment);
  }

  //set and apply filter to reviews
  function setActiveFilter(id) {

    if (activeFilter === id) {
      return;
    }

    var filteredReviews = reviews.slice(0);

    switch (id) {
      case 'reviews-recent':
        filteredReviews = filteredReviews.filter(function(item) {
          var now = new Date();
          var reviewDate = new Date(item.date);
          return (now - reviewDate) < (RECENT_NUM_WEEKS * 7 * 24 * 60 * 60 * 1000);
        });
        filteredReviews.sort(function(a, b) {
          var leftDate = new Date(a.date);
          var rightDate = new Date(b.date);
          return rightDate - leftDate;
        });
        break;

      case 'reviews-good':
        filteredReviews = filteredReviews.filter(function(item) {
          return item.rating >= 3;
        });
        filteredReviews.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;

      case 'reviews-bad':
        filteredReviews = filteredReviews.filter(function(item) {
          return item.rating <= 2;
        });
        filteredReviews.sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;

      case 'reviews-popular':
        filteredReviews.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }

    activeFilter = id;
    renderReviews(filteredReviews, 0);
  }

  //load review list by XHR
  function getReviews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://o0.github.io/assets/json/reviews.json');
    xhr.timeout = 10000;

    xhr.onload = function(evt) {
      var stringData = evt.target.response;
      reviews = JSON.parse(stringData);
      reviewsBlock.classList.remove('reviews-list-loading');
      renderReviews(reviews, 0);
    };

    xhr.onloadstart = function() {
      reviewsBlock.classList.add('reviews-list-loading');
    };

    xhr.ontimeout = function() {
      addError();
    };

    xhr.onerror = function() {
      addError();
    };

    function addError() {
      reviewsBlock.classList.remove('reviews-list-loading');
      reviewsBlock.classList.add('reviews-load-failure');
    }

    xhr.send();
  }

  //create a new DOM element - review - from template and return this element
  function getElementFromTemplate(templateData) {
    var testimonialTemplate = document.getElementById('review-template');
    var element;

    if ('content' in testimonialTemplate) {
      element = testimonialTemplate.content.childNodes[1].cloneNode(true);
    } else {
      element = testimonialTemplate.childNodes[1].cloneNode(true);
    }

    element.querySelector('.review-text').textContent = templateData.description;
    element.querySelector('.review-author').setAttribute('alt', templateData.author.name);
    element.querySelector('.review-author').setAttribute('title', templateData.author.name);

    for (var i = 0; i < templateData.rating - 1; i++) {
      var ratingClone = element.querySelector('.review-rating').cloneNode();
      element.insertBefore(ratingClone, element.querySelector('.review-rating'));
    }

    var authorAvatar = new Image(124, 124);
    var imageLoadTimeout;
    var IMAGE_TIMEOUT = 1000;

    authorAvatar.onload = function() {
      clearTimeout(imageLoadTimeout);
      element.querySelector('.review-author').setAttribute('src', authorAvatar.src);
    };

    authorAvatar.onerror = function() {
      element.classList.add('review-load-failure');
    };

    authorAvatar.src = templateData.author.picture;

    imageLoadTimeout = setTimeout( function() {
      element.querySelector('.review-author').setAttribute('src', '');
      element.classList.add('review-load-failure');
    }, IMAGE_TIMEOUT);

    return element;
  }

  filterBlock.classList.remove('invisible');

})();

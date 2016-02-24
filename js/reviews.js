/* global Review: true, Gallery: true, Photo: true, Video: true */

'use strict';

(function() {
  var filterBlock = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsBlock = document.querySelector('.reviews');
  var activeFilter = 'reviews-all';
  var showMoreReviewsBtn = document.querySelector('.reviews-controls-more');
  var currentPage = 0;
  var reviews = [];
  var filteredReviews = [];
  var RECENT_NUM_WEEKS = 2;
  var PAGE_SIZE = 3;
  var gallery = new Gallery();
  var photos = document.querySelectorAll('.photogallery-image');

  filterBlock.classList.add('invisible');

  //adding event handler for filter radio buttons
  filterBlock.addEventListener('click', filterHandler);

  //button click handler for showing another page
  showMoreReviewsBtn.addEventListener('click', function() {
    renderReviews(filteredReviews, currentPage);
  });

  //delegating radio button click event
  function filterHandler(evt) {
    var target = evt.target;

    if (target.tagName.toUpperCase() === 'INPUT') {
      setActiveFilter(target.id);
    }
  }

  //set and apply filter to reviews
  function setActiveFilter(id) {

    if (activeFilter === id) {
      return;
    }

    filteredReviews = reviews.slice(0);

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

    currentPage = 0;  //when filter changes, show array from page = 0
    activeFilter = id;
    renderReviews(filteredReviews, currentPage);
  }

  //rendering a new DOM element created in getElementFromTemplate()
  function renderReviews(items, pageNumber) {
    var fragment = document.createDocumentFragment();

    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pageReviews;

    if (to < items.length) {
      pageReviews = items.slice(from, to);
    } else {
      pageReviews = items.slice(from);
    }

    if (pageNumber === 0) {
      var renderedElements = document.querySelectorAll('.review');

      Array.prototype.forEach.call(renderedElements, function(elm) {
        reviewsList.removeChild(elm);
      });
    }

    if (items[to]) {
      showMoreReviewsBtn.classList.remove('invisible');
      currentPage++;
    } else {
      showMoreReviewsBtn.classList.add('invisible');
    }

    pageReviews.forEach(function(testimonial) {
      var reviewElement = new Review(testimonial);

      reviewElement.render();
      fragment.appendChild(reviewElement.element);
    });

    reviewsList.appendChild(fragment);
  }

  //load review list by XHR
  function getReviews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://o0.github.io/assets/json/reviews.json');
    xhr.timeout = 10000;

    xhr.onload = function(evt) {
      var stringData = evt.target.response;
      reviews = JSON.parse(stringData);
      reviewsBlock.classList.remove('reviews-list-loading');
      renderReviews(reviews, 0);
      filteredReviews = reviews.slice(0);
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

  getReviews();

  filterBlock.classList.remove('invisible');

  //creating array of Photos and pass it to the Gallery
  var photosArr = Array.prototype.map.call(photos, function(obj) {
    if (obj.hasAttribute('data-replacement-video')) {
      return new Video(obj);
    } else {
      return new Photo(obj);
    }
  });

  //delegating onclick event to each photo
  photosArr.forEach(function(photo, index) {
    photo.onClick = function() {
      gallery.show();
      gallery.setCurrentPicture(index);
    };
  });

  gallery.setPictures(photosArr);

})();

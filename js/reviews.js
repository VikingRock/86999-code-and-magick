'use strict';

(function() {
  var filterBlock = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsBlock = document.querySelector('.reviews');

  filterBlock.classList.add('invisible');

  getReviews();

  function renderReviews(reviews) {
    reviewsList.innerHTML = '';

    reviews.forEach(function(testimonial) {
      var element = getElementFromTemplate(testimonial);
      reviewsList.appendChild(element);
    });
  }

  function getReviews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://o0.github.io/assets/json/reviews.json');
    xhr.timeout = 10000;

    xhr.onload = function(evt) {
      var stringData = evt.target.response;
      var loadedReviews = JSON.parse(stringData);
      reviewsBlock.classList.remove('reviews-list-loading');
      renderReviews(loadedReviews);
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

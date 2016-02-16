'use strict';

(function() {

  function Review(data) {
    this._data = data;
  }

  //create a new DOM element - review - from template and return this element
  Review.prototype.render = function() {
    var testimonialTemplate = document.getElementById('review-template');

    if ('content' in testimonialTemplate) {
      this.element = testimonialTemplate.content.childNodes[1].cloneNode(true);
    } else {
      this.element = testimonialTemplate.childNodes[1].cloneNode(true);
    }

    this.element.querySelector('.review-text').textContent = this._data.description;
    this.element.querySelector('.review-author').setAttribute('alt', this._data.author.name);
    this.element.querySelector('.review-author').setAttribute('title', this._data.author.name);

    for (var i = 0; i < this._data.rating - 1; i++) {
      var ratingClone = this.element.querySelector('.review-rating').cloneNode();
      this.element.insertBefore(ratingClone, this.element.querySelector('.review-rating'));
    }

    var authorAvatar = new Image(124, 124);
    var imageLoadTimeout;
    var IMAGE_TIMEOUT = 1000;

    authorAvatar.onload = function() {
      clearTimeout(imageLoadTimeout);
      this.element.querySelector('.review-author').setAttribute('src', authorAvatar.src);
    }.bind(this);

    authorAvatar.onerror = function() {
      this.element.classList.add('review-load-failure');
    }.bind(this);

    authorAvatar.src = this._data.author.picture;

    imageLoadTimeout = setTimeout( function() {
      this.element.querySelector('.review-author').setAttribute('src', '');
      this.element.classList.add('review-load-failure');
    }.bind(this), IMAGE_TIMEOUT);
  };

  window.Review = Review;
})();

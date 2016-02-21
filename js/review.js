'use strict';

(function() {

  function Review(data) {
    this._data = data;
    this._onUsefulClick = this._onUsefulClick.bind(this);
  }

  Review.prototype.setUsefulness = function(flag) {
    var yes = this.element.querySelector('.review-quiz-answer-yes');
    var no = this.element.querySelector('.review-quiz-answer-no');
    var delta = 1;

    if (this.element.querySelector('.review-quiz-answer-active')) {
      delta = 2;
    }

    if (flag) {
      if (yes.classList.contains('review-quiz-answer-active')) {
        return;
      }
      this._data.review_usefulness += delta;
      yes.classList.add('review-quiz-answer-active');
      no.classList.remove('review-quiz-answer-active');

    } else {
      if (no.classList.contains('review-quiz-answer-active')) {
        return;
      }
      this._data.review_usefulness -= delta;
      no.classList.add('review-quiz-answer-active');
      yes.classList.remove('review-quiz-answer-active');
    }
  };

  //click on review usefulness yes/no
  Review.prototype._onUsefulClick = function(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('review-quiz-answer')) {
      if (evt.target.classList.contains('review-quiz-answer-yes')) {
        this.setUsefulness(true);
      } else {
        this.setUsefulness(false);
      }
    }
  };

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

    this.element.addEventListener('click', this._onUsefulClick);

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

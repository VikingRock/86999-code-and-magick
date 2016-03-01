'use strict';

/**
 * creates a Review object and renders it to the page
 * @constructor
 * @param {ReviewData} data
 */
function Review(data) {
  this._data = data;
  this._onUsefulClick = this._onUsefulClick.bind(this);
}

/**
 * modifies usefulness score for Review
 * and displays user's choice
 * @param {Boolean} flag
 */
Review.prototype.setUsefulness = function(flag) {
  var yes = this.element.querySelector('.review-quiz-answer-yes');
  var no = this.element.querySelector('.review-quiz-answer-no');
  var delta = 1;

  /**
   * if user has already clicked before
   * set delta = 2
   */
  if (this._data.getReviewed() !== 'n/a') {
    delta = 2;
  }

  if (flag) {
    if (this._data.getReviewed() === 'yes') {
      return;
    }
    this._data.setReviewUsefulness(delta);
    yes.classList.add('review-quiz-answer-active');
    no.classList.remove('review-quiz-answer-active');
    this._data.setReviewed('yes');

  } else {
    if (this._data.getReviewed() === 'no') {
      return;
    }
    this._data.setReviewUsefulness(-delta);
    no.classList.add('review-quiz-answer-active');
    yes.classList.remove('review-quiz-answer-active');
    this._data.setReviewed('no');
  }
};

/**
 * when review usefulness yes/no clicked
 * call setUsefulness function
 * @param {Event} evt
 */
Review.prototype._onUsefulClick = function(evt) {
  evt.preventDefault();
  var cl = evt.target.classList;
  if (cl.contains('review-quiz-answer')) {
    if (cl.contains('review-quiz-answer-yes')) {
      this.setUsefulness(true);
    } else {
      this.setUsefulness(false);
    }
  }
};

/**
 * render a new DOM element - review -
 * from template and get its content from _data object
 */
Review.prototype.render = function() {
  var testimonialTemplate = document.getElementById('review-template');

  if ('content' in testimonialTemplate) {
    this.element = testimonialTemplate.content.childNodes[1].cloneNode(true);
  } else {
    this.element = testimonialTemplate.childNodes[1].cloneNode(true);
  }

  this.element.querySelector('.review-text').textContent = this._data.getReviewDescription();
  this.element.querySelector('.review-author').setAttribute('alt', this._data.getReviewAuthor('name'));
  this.element.querySelector('.review-author').setAttribute('title', this._data.getReviewAuthor('name'));

  this.element.addEventListener('click', this._onUsefulClick);

  for (var i = 0; i < this._data.getReviewRating() - 1; i++) {
    var ratingClone = this.element.querySelector('.review-rating').cloneNode(true);
    this.element.insertBefore(ratingClone, this.element.querySelector('.review-rating'));
  }

  var authorAvatar = new Image(124, 124);
  var imageLoadTimeout;
  /**
   * @type {number}
   */
  var IMAGE_TIMEOUT = 1000;

  authorAvatar.onload = function() {
    clearTimeout(imageLoadTimeout);
    this.element.querySelector('.review-author').setAttribute('src', authorAvatar.src);
  }.bind(this);

  authorAvatar.onerror = function() {
    this.element.classList.add('review-load-failure');
  }.bind(this);

  authorAvatar.src = this._data.getReviewAuthor('picture');

  imageLoadTimeout = setTimeout( function() {
    this.element.querySelector('.review-author').setAttribute('src', '');
    this.element.classList.add('review-load-failure');
  }.bind(this), IMAGE_TIMEOUT);
};

module.exports = Review;

'use strict';

var Video = require('video');

/**
 * creates a Gallery object to display a set of photos or videos in a light box
 * @constructor
 */
var Gallery = function() {
  this.element = document.querySelector('.overlay-gallery');
  this._closeButton = document.querySelector('.overlay-gallery-close');
  this._sliderLeft = document.querySelector('.overlay-gallery-control-left');
  this._sliderRight = document.querySelector('.overlay-gallery-control-right');
  this._currentPhotoNum = document.querySelector('.preview-number-current');
  this._totalPhotoNum = document.querySelector('.preview-number-total');
  this._imageContainer = document.querySelector('.overlay-gallery-preview');

  window.addEventListener('hashchange', this._onHashChange.bind(this));
  this._onCloseClick = this._onCloseClick.bind(this);
  this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  this._onSliderLeft = this._onSliderLeft.bind(this);
  this._onSliderRight = this._onSliderRight.bind(this);
};

/**
 * shows Gallery and adds event listeners for close, keyboard, and slider
 */
Gallery.prototype.show = function() {
  this.element.classList.remove('invisible');

  this._closeButton.addEventListener('click', this._onCloseClick);
  document.addEventListener('keydown', this._onDocumentKeyDown);
  this._sliderLeft.addEventListener('click', this._onSliderLeft);
  this._sliderRight.addEventListener('click', this._onSliderRight);
};

/**
 * hides Gallery and removes event listeners for close, keyboard, and slider
 */
Gallery.prototype.hide = function() {
  this.element.classList.add('invisible');
  location.hash = '';

  this._closeButton.removeEventListener('click', this._onCloseClick);
  document.removeEventListener('keydown', this._onDocumentKeyDown);
  this._sliderLeft.removeEventListener('click', this._onSliderLeft);
  this._sliderRight.removeEventListener('click', this._onSliderRight);
};

/**
 * loads photos into gallery and counts their total number
 * @param {Array} photos
 */
Gallery.prototype.setPictures = function(photos) {
  this._photos = photos;
  this._totalPhotoNum.textContent = photos.length;
};

/**
 * renders a particular photo or video inside the gallery
 * renders photo number
 * @param {Number/String} number
 */
Gallery.prototype.setCurrentPicture = function(number) {

  if (typeof number === 'number') {
    this.currentPhoto = this._photos[number];
    this._currentPhotoNum.textContent = +number + 1;

  } else if (typeof number === 'string') {
    var currentIndex;
    this._photos.forEach(function(target, index) {
      if (target.image.getAttribute('src') === number) {
        currentIndex = index;
        return;
      }
    });
    this.currentPhoto = this._photos[currentIndex];
    this._currentPhotoNum.textContent = +currentIndex + 1;
  }

  if (this._imageContainer.lastElementChild.tagName.toUpperCase() !== 'DIV') {
    var childToRemove = this._imageContainer.lastElementChild;
    this._imageContainer.removeChild(childToRemove);
  }

  if (!(this.currentPhoto instanceof Video)) {
    var image = new Image(600);
    image.setAttribute('src', this.currentPhoto.image.src);
    this._imageContainer.appendChild(image);

  } else {
    var video = document.createElement('video');
    video.setAttribute('width', '600');
    video.setAttribute('src', this.currentPhoto.getVideoUrl());
    //video.setAttribute('controls', '');
    video.setAttribute('loop', '');
    video.setAttribute('autoplay', '');

    video.addEventListener('click', function() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    this._imageContainer.appendChild(video);
  }
};

/**
 * location hash is checked,
 * gallery is shown with current picture
 * or gallery is hidden
 */
Gallery.prototype.restoreFromHash = function() {
  if (!location.hash.match(/#photo\/(\S+)/)) {
    this.hide();
  } else {
    this.setCurrentPicture(location.hash.replace('#photo/', ''));
    this.show();
  }
};

/**
 * when location hash is changed,
 * gallery is shown or hidden
 */
Gallery.prototype._onHashChange = function() {
  this.restoreFromHash();
};
/**
 * hides gallery when _onCloseClick event fires
 */
Gallery.prototype._onCloseClick = function() {
  this.hide();
};

/**
 * listens to keyboard events to call slide photos or close gallery
 * @param {Event} evt
 */
Gallery.prototype._onDocumentKeyDown = function(evt) {
  switch (evt.keyCode) {
    case 37:
      this._onSliderLeft();
      break;
    case 39:
      this._onSliderRight();
      break;
    case 27:
      this.hide();
      break;
  }
};

/**
 * displays previous photo
 */
Gallery.prototype._onSliderLeft = function() {
  var nextNumber = this._currentPhotoNum.textContent - 2;

  if ( parseInt(this._currentPhotoNum.textContent, 10) === 1) {
    nextNumber = this._photos.length - 1;
  }

  location.hash = '#photo/' + this._photos[nextNumber].image.getAttribute('src');
};

/**
 * displays next photo
 */
Gallery.prototype._onSliderRight = function() {
  var nextNumber = parseInt(this._currentPhotoNum.textContent, 10);

  if (parseInt(this._currentPhotoNum.textContent, 10) === this._photos.length) {
    nextNumber = 0;
  }

  location.hash = '#photo/' + this._photos[nextNumber].image.getAttribute('src');
};

module.exports = Gallery;

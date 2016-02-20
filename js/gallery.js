'use strict';

(function() {

  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = document.querySelector('.overlay-gallery-close');
    this._sliderLeft = document.querySelector('.overlay-gallery-control-left');
    this._sliderRight = document.querySelector('.overlay-gallery-control-right');
    this._currentPhotoNum = document.querySelector('.preview-number-current');
    this._totalPhotoNum = document.querySelector('.preview-number-total');
    this._imageContainer = document.querySelector('.overlay-gallery-preview');

    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onSliderLeft = this._onSliderLeft.bind(this);
    this._onSliderRight = this._onSliderRight.bind(this);
  };

  Gallery.prototype.show = function() {
    this.element.classList.remove('invisible');

    this._closeButton.addEventListener('click', this._onCloseClick);
    document.addEventListener('keydown', this._onDocumentKeyDown);
    this._sliderLeft.addEventListener('click', this._onSliderLeft);
    this._sliderRight.addEventListener('click', this._onSliderRight);
  };

  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');

    this._closeButton.removeEventListener('click', this._onCloseClick);
    document.removeEventListener('keydown', this._onDocumentKeyDown);
    this._sliderLeft.removeEventListener('click', this._onSliderLeft);
    this._sliderRight.removeEventListener('click', this._onSliderRight);
  };

  Gallery.prototype.setPictures = function(photos) {
    this._photos = photos;
    this._totalPhotoNum.textContent = photos.length;
  };

  Gallery.prototype.setCurrentPicture = function(number) {
    this.currentPhoto = this._photos[number];
    this._currentPhotoNum.textContent = number;

    var image = new Image(600);
    image.setAttribute('src', this.currentPhoto.image.src);
    this._imageContainer.appendChild(image);
  };

  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  Gallery.prototype._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === 27) {
      this.hide();
    }
  };

  Gallery.prototype._onSliderLeft = function() {
    console.dir(this);
  };

  Gallery.prototype._onSliderRight = function() {
    console.dir(this);
  };

  window.Gallery = Gallery;
})();

'use strict';

(function() {

  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = document.querySelector('.overlay-gallery-close');
    this._sliderLeft = document.querySelector('.overlay-gallery-control-left');
    this._sliderRight = document.querySelector('.overlay-gallery-control-right');

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

'use strict';

(function() {

  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = document.querySelector('.overlay-gallery-close');
    this._onCloseClick = this._onCloseClick.bind(this);
  };

  Gallery.prototype.show = function() {
    this.element.classList.remove('invisible');
    this._closeButton.addEventListener('click', this._onCloseClick);
  };

  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');
    this._closeButton.removeEventListener('click', this._onCloseClick);
  };

  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  window.Gallery = Gallery;
})();

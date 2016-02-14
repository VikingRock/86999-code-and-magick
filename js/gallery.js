'use strict';

(function() {

  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
  };

  Gallery.prototype.show = function() {
    this.element.classList.remove('invisible');
  };

  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');
  };

  window.Gallery = Gallery;
})();

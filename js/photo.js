'use strict';

(function() {

  /**
   * creates a Photo object from a DOM element (<a> with <img> inside it)
   * @constructor
   * @param {Element} element
   */
  var Photo = function(element) {
    this.image = element.children[0];

    /**
     * if an image inside object is clicked
     * and object has onClick() method, call that method
     */
    this.image.addEventListener('click', function(evt) {
      evt.preventDefault();
      if (evt.target.tagName.toUpperCase() === 'IMG') {
        if (typeof this.onClick === 'function') {
          this.onClick();
        }
      }
    }.bind(this));
  };

  module.exports = Photo;
})();

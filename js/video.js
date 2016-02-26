'use strict';

(function() {
  var inherit = require('inherit');
  var Photo = require('photo');

  /**
   * creates a Video object from a DOM element (<a> with <img> inside it)
   * @constructor
   * @param {Element} element
   */
  var Video = function(element) {
    this.image = element.children[0];
    this._videoUrl = element.getAttribute('data-replacement-video');

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

    this.getVideoUrl = this.getVideoUrl.bind(this);
  };

  /**
   * Video is a child of Photo
   */
  inherit(Video, Photo);

  /**
   * returns video url from data-replacement-video attr
   * @return {String}
   */
  Video.prototype.getVideoUrl = function() {
    return this._videoUrl;
  };

  module.exports = Video;
})();

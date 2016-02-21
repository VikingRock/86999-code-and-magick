/* global Photo: true, inherit: true */

'use strict';

(function() {

  var Video = function(element) {
    this.image = element.children[0];
    this._videoUrl = element.getAttribute('data-replacement-video');

    this.image.addEventListener('click', function(evt) {
      evt.preventDefault();
      if (evt.target.tagName === 'IMG') {
        if (typeof this.onClick === 'function') {
          this.onClick();
        }
      }
    }.bind(this));

    this.getVideoUrl = this.getVideoUrl.bind(this);
  };

  inherit(Video, Photo);

  Video.prototype.getVideoUrl = function() {
    return this._videoUrl;
  };

  window.Video = Video;
})();

'use strict';

(function() {

  var Photo = function(element) {
    this.image = element.children[0];

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

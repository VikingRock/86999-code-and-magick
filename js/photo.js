'use strict';

(function() {

  var Photo = function(element) {
    this.image = element.children[0];
  };

  window.Photo = Photo;
})();

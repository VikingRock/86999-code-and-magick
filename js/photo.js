/* global Gallery: true */

'use strict';

(function() {

  function Photo(element) {
    this.image = element.children[0];
  }

  var photos = document.querySelectorAll('.photogallery-image');

  var photosArr = Array.prototype.map.call(photos, function(obj) {
    return new Photo(obj);
  });

  console.dir(photosArr);

})();

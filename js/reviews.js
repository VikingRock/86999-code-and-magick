'use strict';

(function() {
  var filterBlock = document.querySelector('.reviews-filter');
  filterBlock.classList.add('invisible');

  window.reviews.forEach(function(testimonial) {
    var element = getElementFromTemplate(testimonial);
    filterBlock.appendChild(element);
  });

  function getElementFromTemplate(templateData) {
    var testimonialTemplate = document.getElementById('review-template');
    var element = testimonialTemplate.content.childNodes[1].cloneNode(true);

    return element;
  }

  filterBlock.classList.remove('invisible');

})();

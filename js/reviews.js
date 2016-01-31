'use strict';

(function() {
  var filterBlock = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  filterBlock.classList.add('invisible');

  window.reviews.forEach(function(testimonial) {
    var element = getElementFromTemplate(testimonial);
    reviewsList.appendChild(element);
  });

  function getElementFromTemplate(templateData) {
    var testimonialTemplate = document.getElementById('review-template');
    var element;

    if ('content' in testimonialTemplate) {
      element = testimonialTemplate.content.childNodes[1].cloneNode(true);
    } else {
      element = testimonialTemplate.childNodes[1].cloneNode(true);
    }

    element.querySelector('.review-text').textContent = templateData.description;
    element.querySelector('.review-author').setAttribute('alt', templateData.author.name);
    element.querySelector('.review-author').setAttribute('title', templateData.author.name);

    for (var i = 0; i < templateData.rating - 1; i++) {
      var ratingClone = element.querySelector('.review-rating').cloneNode();
      element.insertBefore(ratingClone, element.querySelector('.review-rating'));
    }

    var authorAvatar = new Image();  //124,124
    authorAvatar.src = templateData.author.picture;
    //element.querySelector('.review-author').setAttribute('src', templateData.author.picture);

    return element;
  }

  filterBlock.classList.remove('invisible');

})();

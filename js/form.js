'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = document.forms[0];
  var reviewBlock = document.querySelector('.review-fields');
  var reviewLabels = document.querySelectorAll('.review-fields-label');
  var nameField = document.getElementById('review-name');
  var feedbackField = document.getElementById('review-text');
  var rateFields = document.querySelectorAll('[name=review-mark]');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  function makeRequired() {
    if ( rateFields[0].checked || rateFields[1].checked ) {
      feedbackField.required = true;
    } else {
      feedbackField.required = false;
    }
  }

  nameField.required = true;

  for (var i = 0; i < rateFields.length; i++) {
    rateFields[i].onchange = function() {
      makeRequired();
    }
  }

})();

'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = document.forms[1];
  var submitForm = document.querySelector('.review-submit');
  var reviewBlock = document.querySelector('.review-fields');
  var reviewLabels = document.querySelectorAll('.review-fields-label');
  var nameField = document.getElementById('review-name');
  var feedbackField = document.getElementById('review-text');
  var rateFields = document.querySelectorAll('[name=review-mark]');

  //------------------- functions -----------------


  // makes Feedback required if Rate <=2
  // invokes checkRequired function
  function makeRequired() {

    feedbackField.required = false;

    if ( rateFields[0].checked || rateFields[1].checked ) {
      feedbackField.required = true;
    }

    var boundCheck = checkRequired.bind(feedbackField);
    boundCheck();
  }

  // shows/hides labels for required fields;
  // invokes checkSubmit function
  function checkRequired() {
    var identifier = this.id;
    var targetLabel = document.querySelector('[for=' + identifier + '].review-fields-label');

    if ( (this.required) && (this.value !== '') || (!this.required) ) {
      targetLabel.classList.add('invisible');
    } else {
      targetLabel.classList.remove('invisible');
    }

    checkSubmit();
  }

  // checks if all required fields are not empty
  function checkSubmit() {
    for (var i = 0; i < reviewLabels.length; i++) {
      if ( !reviewLabels[i].classList.contains('invisible') ) {  //if a required field is empty
        submitForm.disabled = true;
        reviewBlock.classList.remove('invisible');
        return;
      }

      reviewBlock.classList.add('invisible');
      submitForm.disabled = false;
    }
  }


  //------------------- event handlers -----------------

  for (var i = 0; i < rateFields.length; i++) {
    rateFields[i].onchange = function() {
      makeRequired();
    };
  }

  nameField.oninput = checkRequired;
  feedbackField.oninput = checkRequired;

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  form.onsubmit = function(event) {
    event.preventDefault();

    var currentRate = document.querySelector('input[name="review-mark"]:checked').value;
    var myBDate = new Date('1988 10 26');
    var now = new Date();

    if ( ( now.getMonth() === myBDate.getMonth() && now.getDate() >= myBDate.getDate() ) || now.getMonth() > myBDate.getMonth() ) {
      myBDate.setFullYear(now.getFullYear());
    } else {
      myBDate.setFullYear(now.getFullYear() - 1);
    }

    var cookieLife = new Date( now - myBDate + now.valueOf() ).toUTCString();

    document.cookie = 'rate=' + currentRate + ';expires=' + cookieLife;
    document.cookie = 'name=' + nameField.value + ';expires=' + cookieLife;

    form.submit();
  };

  //------------------- default settings -----------------

  nameField.required = true;
  reviewLabels[1].classList.add('invisible');

  if (document.cookie) {
    nameField.value = window.docCookies.getItem('name');
    var defaultRate = window.docCookies.getItem('rate');

    document.getElementById('review-mark-' + defaultRate).checked = true;
    reviewLabels[0].classList.add('invisible');
    reviewBlock.classList.add('invisible');
    makeRequired();

  } else {
    submitForm.disabled = true;
  }

})();

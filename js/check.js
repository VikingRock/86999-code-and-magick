'use strict';

function getMessage(a, b) {

  var message;

  if ( (typeof a) == 'boolean' ) {
    (a) ? (message = 'Я попал в ' + b) : (message = 'Я никуда не попал');
    return message;
  }

  if ( (typeof a) == 'number' ) {
    message = 'Я прыгнул на ' + (a * 100) + ' сантиметров';
    return message;
  }

  if ( Array.isArray(a) && !Array.isArray(b) ) {
    var sumArray = a.reduce(function(x, y) {
      return x + y;
    });

    message = 'Я прошёл ' + sumArray + ' шагов';
    return message;
  }

  if ( Array.isArray(a) && Array.isArray(b) ) {
    var multiply = a.map( function(currentValue, index) {
      return currentValue * b[index];
    });

    var length = multiply.reduce(function(x, y) {
      return x + y;
    });

    message = 'Я прошёл ' + length + ' метров';
    return message;
  }

}

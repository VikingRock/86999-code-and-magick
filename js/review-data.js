'use strict';

var ReviewData = function(dataObj) {
  this._data = dataObj;
};

ReviewData.prototype.getReviewUsefulness = function() {
  return this._data.review_usefulness;
};

module.exports = ReviewData;

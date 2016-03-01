'use strict';

/**
 * creates a ReviewData object and adds methods to get and set its props
 * @constructor
 * @param {Object} dataObj
 */
var ReviewData = function(dataObj) {
  this._data = dataObj;
  this._data.reviewed = 'n/a';
};

ReviewData.prototype.getReviewed = function() {
  return this._data.reviewed;
};

ReviewData.prototype.setReviewed = function(answer) {
  this._data.reviewed = answer;
};

ReviewData.prototype.getReviewUsefulness = function() {
  return this._data.review_usefulness;
};

ReviewData.prototype.setReviewUsefulness = function(usefulness) {
  this._data.review_usefulness += usefulness;
};

ReviewData.prototype.getReviewDescription = function() {
  return this._data.description;
};

ReviewData.prototype.getReviewAuthor = function(parameter) {
  return this._data.author[parameter];
};

ReviewData.prototype.getReviewRating = function() {
  return this._data.rating;
};

ReviewData.prototype.getReviewDate = function() {
  return this._data.date;
};

module.exports = ReviewData;

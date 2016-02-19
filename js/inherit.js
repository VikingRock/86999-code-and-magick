'use strict';

(function() {
  /**
   * Function makes ChildFoo constructor a child of ParentFoo constructor
   * @param {Function} ChildFoo
   * @param {Function} ParentFoo
   */
  function inherit(ChildFoo, ParentFoo) {
    var EmptyConstructor = function() {};
    EmptyConstructor.prototype = ParentFoo.prototype;
    ChildFoo.prototype = new EmptyConstructor();
    ChildFoo.prototype.constructor = ChildFoo;
  }

  window.inherit = inherit;

})();

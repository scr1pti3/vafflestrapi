(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.regexp.prototype.flags"],{

/***/ "5xAX":
/*!******************************************************!*\
  !*** ./node_modules/regexp.prototype.flags/index.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(/*! define-properties */ "82c2");

var callBind = __webpack_require__(/*! es-abstract/helpers/callBind */ "RLeF");

var implementation = __webpack_require__(/*! ./implementation */ "VwiP");

var getPolyfill = __webpack_require__(/*! ./polyfill */ "V+xs");

var shim = __webpack_require__(/*! ./shim */ "HH6Z");

var flagsBound = callBind(implementation);
define(flagsBound, {
  getPolyfill: getPolyfill,
  implementation: implementation,
  shim: shim
});
module.exports = flagsBound;

/***/ }),

/***/ "HH6Z":
/*!*****************************************************!*\
  !*** ./node_modules/regexp.prototype.flags/shim.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var supportsDescriptors = __webpack_require__(/*! define-properties */ "82c2").supportsDescriptors;

var getPolyfill = __webpack_require__(/*! ./polyfill */ "V+xs");

var gOPD = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;
var TypeErr = TypeError;
var getProto = Object.getPrototypeOf;
var regex = /a/;

module.exports = function shimFlags() {
  if (!supportsDescriptors || !getProto) {
    throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
  }

  var polyfill = getPolyfill();
  var proto = getProto(regex);
  var descriptor = gOPD(proto, 'flags');

  if (!descriptor || descriptor.get !== polyfill) {
    defineProperty(proto, 'flags', {
      configurable: true,
      enumerable: false,
      get: polyfill
    });
  }

  return polyfill;
};

/***/ }),

/***/ "V+xs":
/*!*********************************************************!*\
  !*** ./node_modules/regexp.prototype.flags/polyfill.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "VwiP");

var supportsDescriptors = __webpack_require__(/*! define-properties */ "82c2").supportsDescriptors;

var $gOPD = Object.getOwnPropertyDescriptor;
var $TypeError = TypeError;

module.exports = function getPolyfill() {
  if (!supportsDescriptors) {
    throw new $TypeError('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
  }

  if (/a/mig.flags === 'gim') {
    var descriptor = $gOPD(RegExp.prototype, 'flags');

    if (descriptor && typeof descriptor.get === 'function' && typeof /a/.dotAll === 'boolean') {
      return descriptor.get;
    }
  }

  return implementation;
};

/***/ }),

/***/ "VwiP":
/*!***************************************************************!*\
  !*** ./node_modules/regexp.prototype.flags/implementation.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $Object = Object;
var $TypeError = TypeError;

module.exports = function flags() {
  if (this != null && this !== $Object(this)) {
    throw new $TypeError('RegExp.prototype.flags getter called on non-object');
  }

  var result = '';

  if (this.global) {
    result += 'g';
  }

  if (this.ignoreCase) {
    result += 'i';
  }

  if (this.multiline) {
    result += 'm';
  }

  if (this.dotAll) {
    result += 's';
  }

  if (this.unicode) {
    result += 'u';
  }

  if (this.sticky) {
    result += 'y';
  }

  return result;
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVnZXhwLnByb3RvdHlwZS5mbGFncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVnZXhwLnByb3RvdHlwZS5mbGFncy9zaGltLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdleHAucHJvdG90eXBlLmZsYWdzL3BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdleHAucHJvdG90eXBlLmZsYWdzL2ltcGxlbWVudGF0aW9uLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsInJlcXVpcmUiLCJjYWxsQmluZCIsImltcGxlbWVudGF0aW9uIiwiZ2V0UG9seWZpbGwiLCJzaGltIiwiZmxhZ3NCb3VuZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzdXBwb3J0c0Rlc2NyaXB0b3JzIiwiZ09QRCIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImRlZmluZVByb3BlcnR5IiwiVHlwZUVyciIsIlR5cGVFcnJvciIsImdldFByb3RvIiwiZ2V0UHJvdG90eXBlT2YiLCJyZWdleCIsInNoaW1GbGFncyIsInBvbHlmaWxsIiwicHJvdG8iLCJkZXNjcmlwdG9yIiwiZ2V0IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsIiRnT1BEIiwiJFR5cGVFcnJvciIsImZsYWdzIiwiUmVnRXhwIiwicHJvdG90eXBlIiwiZG90QWxsIiwiJE9iamVjdCIsInJlc3VsdCIsImdsb2JhbCIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJ1bmljb2RlIiwic3RpY2t5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFhOztBQUViLElBQUlBLE1BQU0sR0FBR0MsbUJBQU8sQ0FBQywrQkFBRCxDQUFwQjs7QUFDQSxJQUFJQyxRQUFRLEdBQUdELG1CQUFPLENBQUMsMENBQUQsQ0FBdEI7O0FBRUEsSUFBSUUsY0FBYyxHQUFHRixtQkFBTyxDQUFDLDhCQUFELENBQTVC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LFFBQVEsSUFBUixJQUFnQixTQUFTSSxPQUFPLENBQUMsSUFBRCxDQUFwQyxFQUE0QztBQUMzQyxVQUFNLElBQUlMLFVBQUosQ0FBZSxvREFBZixDQUFOO0FBQ0E7O0FBQ0QsTUFBSU0sTUFBTSxHQUFHLEVBQWI7O0FBQ0EsTUFBSSxLQUFLQyxNQUFULEVBQWlCO0FBQ2hCRCxVQUFNLElBQUksR0FBVjtBQUNBOztBQUNELE1BQUksS0FBS0UsVUFBVCxFQUFxQjtBQUNwQkYsVUFBTSxJQUFJLEdBQVY7QUFDQTs7QUFDRCxNQUFJLEtBQUtHLFNBQVQsRUFBb0I7QUFDbkJILFVBQU0sSUFBSSxHQUFWO0FBQ0E7O0FBQ0QsTUFBSSxLQUFLRixNQUFULEVBQWlCO0FBQ2hCRSxVQUFNLElBQUksR0FBVjtBQUNBOztBQUNELE1BQUksS0FBS0ksT0FBVCxFQUFrQjtBQUNqQkosVUFBTSxJQUFJLEdBQVY7QUFDQTs7QUFDRCxNQUFJLEtBQUtLLE1BQVQsRUFBaUI7QUFDaEJMLFVBQU0sSUFBSSxHQUFWO0FBQ0E7O0FBQ0QsU0FBT0EsTUFBUDtBQUNBLENBeEJELEMiLCJmaWxlIjoibnBtLnJlZ2V4cC5wcm90b3R5cGUuZmxhZ3MuODAzMzQ1MDE1YjM0YjZmYTE2ZTUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnZXMtYWJzdHJhY3QvaGVscGVycy9jYWxsQmluZCcpO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgc2hpbSA9IHJlcXVpcmUoJy4vc2hpbScpO1xuXG52YXIgZmxhZ3NCb3VuZCA9IGNhbGxCaW5kKGltcGxlbWVudGF0aW9uKTtcblxuZGVmaW5lKGZsYWdzQm91bmQsIHtcblx0Z2V0UG9seWZpbGw6IGdldFBvbHlmaWxsLFxuXHRpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb24sXG5cdHNoaW06IHNoaW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYWdzQm91bmQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdXBwb3J0c0Rlc2NyaXB0b3JzID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKS5zdXBwb3J0c0Rlc2NyaXB0b3JzO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIFR5cGVFcnIgPSBUeXBlRXJyb3I7XG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgcmVnZXggPSAvYS87XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hpbUZsYWdzKCkge1xuXHRpZiAoIXN1cHBvcnRzRGVzY3JpcHRvcnMgfHwgIWdldFByb3RvKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnIoJ1JlZ0V4cC5wcm90b3R5cGUuZmxhZ3MgcmVxdWlyZXMgYSB0cnVlIEVTNSBlbnZpcm9ubWVudCB0aGF0IHN1cHBvcnRzIHByb3BlcnR5IGRlc2NyaXB0b3JzJyk7XG5cdH1cblx0dmFyIHBvbHlmaWxsID0gZ2V0UG9seWZpbGwoKTtcblx0dmFyIHByb3RvID0gZ2V0UHJvdG8ocmVnZXgpO1xuXHR2YXIgZGVzY3JpcHRvciA9IGdPUEQocHJvdG8sICdmbGFncycpO1xuXHRpZiAoIWRlc2NyaXB0b3IgfHwgZGVzY3JpcHRvci5nZXQgIT09IHBvbHlmaWxsKSB7XG5cdFx0ZGVmaW5lUHJvcGVydHkocHJvdG8sICdmbGFncycsIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0Z2V0OiBwb2x5ZmlsbFxuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBwb2x5ZmlsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxudmFyIHN1cHBvcnRzRGVzY3JpcHRvcnMgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpLnN1cHBvcnRzRGVzY3JpcHRvcnM7XG52YXIgJGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UG9seWZpbGwoKSB7XG5cdGlmICghc3VwcG9ydHNEZXNjcmlwdG9ycykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdSZWdFeHAucHJvdG90eXBlLmZsYWdzIHJlcXVpcmVzIGEgdHJ1ZSBFUzUgZW52aXJvbm1lbnQgdGhhdCBzdXBwb3J0cyBwcm9wZXJ0eSBkZXNjcmlwdG9ycycpO1xuXHR9XG5cdGlmICgoL2EvbWlnKS5mbGFncyA9PT0gJ2dpbScpIHtcblx0XHR2YXIgZGVzY3JpcHRvciA9ICRnT1BEKFJlZ0V4cC5wcm90b3R5cGUsICdmbGFncycpO1xuXHRcdGlmIChkZXNjcmlwdG9yICYmIHR5cGVvZiBkZXNjcmlwdG9yLmdldCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgKC9hLykuZG90QWxsID09PSAnYm9vbGVhbicpIHtcblx0XHRcdHJldHVybiBkZXNjcmlwdG9yLmdldDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGltcGxlbWVudGF0aW9uO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmbGFncygpIHtcblx0aWYgKHRoaXMgIT0gbnVsbCAmJiB0aGlzICE9PSAkT2JqZWN0KHRoaXMpKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1JlZ0V4cC5wcm90b3R5cGUuZmxhZ3MgZ2V0dGVyIGNhbGxlZCBvbiBub24tb2JqZWN0Jyk7XG5cdH1cblx0dmFyIHJlc3VsdCA9ICcnO1xuXHRpZiAodGhpcy5nbG9iYWwpIHtcblx0XHRyZXN1bHQgKz0gJ2cnO1xuXHR9XG5cdGlmICh0aGlzLmlnbm9yZUNhc2UpIHtcblx0XHRyZXN1bHQgKz0gJ2knO1xuXHR9XG5cdGlmICh0aGlzLm11bHRpbGluZSkge1xuXHRcdHJlc3VsdCArPSAnbSc7XG5cdH1cblx0aWYgKHRoaXMuZG90QWxsKSB7XG5cdFx0cmVzdWx0ICs9ICdzJztcblx0fVxuXHRpZiAodGhpcy51bmljb2RlKSB7XG5cdFx0cmVzdWx0ICs9ICd1Jztcblx0fVxuXHRpZiAodGhpcy5zdGlja3kpIHtcblx0XHRyZXN1bHQgKz0gJ3knO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
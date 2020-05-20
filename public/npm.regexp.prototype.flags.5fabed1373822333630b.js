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
	if ((/a/mig).flags === 'gim') {
		var descriptor = $gOPD(RegExp.prototype, 'flags');
		if (descriptor && typeof descriptor.get === 'function' && typeof (/a/).dotAll === 'boolean') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVnZXhwLnByb3RvdHlwZS5mbGFncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVnZXhwLnByb3RvdHlwZS5mbGFncy9zaGltLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdleHAucHJvdG90eXBlLmZsYWdzL3BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdleHAucHJvdG90eXBlLmZsYWdzL2ltcGxlbWVudGF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLCtCQUFtQjtBQUN4QyxlQUFlLG1CQUFPLENBQUMsMENBQThCOztBQUVyRCxxQkFBcUIsbUJBQU8sQ0FBQyw4QkFBa0I7QUFDL0Msa0JBQWtCLG1CQUFPLENBQUMsd0JBQVk7QUFDdEMsV0FBVyxtQkFBTyxDQUFDLG9CQUFROztBQUUzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7O0FDakJhOztBQUViLDBCQUEwQixtQkFBTyxDQUFDLCtCQUFtQjtBQUNyRCxrQkFBa0IsbUJBQU8sQ0FBQyx3QkFBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDekJhOztBQUViLHFCQUFxQixtQkFBTyxDQUFDLDhCQUFrQjs7QUFFL0MsMEJBQTBCLG1CQUFPLENBQUMsK0JBQW1CO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25CYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im5wbS5yZWdleHAucHJvdG90eXBlLmZsYWdzLjVmYWJlZDEzNzM4MjIzMzM2MzBiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJ2VzLWFic3RyYWN0L2hlbHBlcnMvY2FsbEJpbmQnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIGZsYWdzQm91bmQgPSBjYWxsQmluZChpbXBsZW1lbnRhdGlvbik7XG5cbmRlZmluZShmbGFnc0JvdW5kLCB7XG5cdGdldFBvbHlmaWxsOiBnZXRQb2x5ZmlsbCxcblx0aW1wbGVtZW50YXRpb246IGltcGxlbWVudGF0aW9uLFxuXHRzaGltOiBzaGltXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbGFnc0JvdW5kO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3VwcG9ydHNEZXNjcmlwdG9ycyA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJykuc3VwcG9ydHNEZXNjcmlwdG9ycztcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBUeXBlRXJyID0gVHlwZUVycm9yO1xudmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIHJlZ2V4ID0gL2EvO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoaW1GbGFncygpIHtcblx0aWYgKCFzdXBwb3J0c0Rlc2NyaXB0b3JzIHx8ICFnZXRQcm90bykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyKCdSZWdFeHAucHJvdG90eXBlLmZsYWdzIHJlcXVpcmVzIGEgdHJ1ZSBFUzUgZW52aXJvbm1lbnQgdGhhdCBzdXBwb3J0cyBwcm9wZXJ0eSBkZXNjcmlwdG9ycycpO1xuXHR9XG5cdHZhciBwb2x5ZmlsbCA9IGdldFBvbHlmaWxsKCk7XG5cdHZhciBwcm90byA9IGdldFByb3RvKHJlZ2V4KTtcblx0dmFyIGRlc2NyaXB0b3IgPSBnT1BEKHByb3RvLCAnZmxhZ3MnKTtcblx0aWYgKCFkZXNjcmlwdG9yIHx8IGRlc2NyaXB0b3IuZ2V0ICE9PSBwb2x5ZmlsbCkge1xuXHRcdGRlZmluZVByb3BlcnR5KHByb3RvLCAnZmxhZ3MnLCB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdGdldDogcG9seWZpbGxcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbnZhciBzdXBwb3J0c0Rlc2NyaXB0b3JzID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKS5zdXBwb3J0c0Rlc2NyaXB0b3JzO1xudmFyICRnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFBvbHlmaWxsKCkge1xuXHRpZiAoIXN1cHBvcnRzRGVzY3JpcHRvcnMpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignUmVnRXhwLnByb3RvdHlwZS5mbGFncyByZXF1aXJlcyBhIHRydWUgRVM1IGVudmlyb25tZW50IHRoYXQgc3VwcG9ydHMgcHJvcGVydHkgZGVzY3JpcHRvcnMnKTtcblx0fVxuXHRpZiAoKC9hL21pZykuZmxhZ3MgPT09ICdnaW0nKSB7XG5cdFx0dmFyIGRlc2NyaXB0b3IgPSAkZ09QRChSZWdFeHAucHJvdG90eXBlLCAnZmxhZ3MnKTtcblx0XHRpZiAoZGVzY3JpcHRvciAmJiB0eXBlb2YgZGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mICgvYS8pLmRvdEFsbCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHRyZXR1cm4gZGVzY3JpcHRvci5nZXQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBpbXBsZW1lbnRhdGlvbjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmxhZ3MoKSB7XG5cdGlmICh0aGlzICE9IG51bGwgJiYgdGhpcyAhPT0gJE9iamVjdCh0aGlzKSkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdSZWdFeHAucHJvdG90eXBlLmZsYWdzIGdldHRlciBjYWxsZWQgb24gbm9uLW9iamVjdCcpO1xuXHR9XG5cdHZhciByZXN1bHQgPSAnJztcblx0aWYgKHRoaXMuZ2xvYmFsKSB7XG5cdFx0cmVzdWx0ICs9ICdnJztcblx0fVxuXHRpZiAodGhpcy5pZ25vcmVDYXNlKSB7XG5cdFx0cmVzdWx0ICs9ICdpJztcblx0fVxuXHRpZiAodGhpcy5tdWx0aWxpbmUpIHtcblx0XHRyZXN1bHQgKz0gJ20nO1xuXHR9XG5cdGlmICh0aGlzLmRvdEFsbCkge1xuXHRcdHJlc3VsdCArPSAncyc7XG5cdH1cblx0aWYgKHRoaXMudW5pY29kZSkge1xuXHRcdHJlc3VsdCArPSAndSc7XG5cdH1cblx0aWYgKHRoaXMuc3RpY2t5KSB7XG5cdFx0cmVzdWx0ICs9ICd5Jztcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.is-arguments"],{

/***/ "45zb":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var toStr = Object.prototype.toString;

var isStandardArguments = function isArguments(value) {
  if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
    return false;
  }

  return toStr.call(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
  if (isStandardArguments(value)) {
    return true;
  }

  return value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value) !== '[object Array]' && toStr.call(value.callee) === '[object Function]';
};

var supportsStandardArguments = function () {
  return isStandardArguments(arguments);
}();

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtYXJndW1lbnRzL2luZGV4LmpzIl0sIm5hbWVzIjpbImhhc1RvU3RyaW5nVGFnIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJ0b1N0ciIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiaXNTdGFuZGFyZEFyZ3VtZW50cyIsImlzQXJndW1lbnRzIiwidmFsdWUiLCJjYWxsIiwiaXNMZWdhY3lBcmd1bWVudHMiLCJsZW5ndGgiLCJjYWxsZWUiLCJzdXBwb3J0c1N0YW5kYXJkQXJndW1lbnRzIiwiYXJndW1lbnRzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBYTs7QUFFYixJQUFJQSxjQUFjLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPQSxNQUFNLENBQUNDLFdBQWQsS0FBOEIsUUFBbkY7QUFDQSxJQUFJQyxLQUFLLEdBQUdDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsUUFBN0I7O0FBRUEsSUFBSUMsbUJBQW1CLEdBQUcsU0FBU0MsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEI7QUFDckQsTUFBSVQsY0FBYyxJQUFJUyxLQUFsQixJQUEyQixPQUFPQSxLQUFQLEtBQWlCLFFBQTVDLElBQXdEUixNQUFNLENBQUNDLFdBQVAsSUFBc0JPLEtBQWxGLEVBQXlGO0FBQ3hGLFdBQU8sS0FBUDtBQUNBOztBQUNELFNBQU9OLEtBQUssQ0FBQ08sSUFBTixDQUFXRCxLQUFYLE1BQXNCLG9CQUE3QjtBQUNBLENBTEQ7O0FBT0EsSUFBSUUsaUJBQWlCLEdBQUcsU0FBU0gsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEI7QUFDbkQsTUFBSUYsbUJBQW1CLENBQUNFLEtBQUQsQ0FBdkIsRUFBZ0M7QUFDL0IsV0FBTyxJQUFQO0FBQ0E7O0FBQ0QsU0FBT0EsS0FBSyxLQUFLLElBQVYsSUFDTixPQUFPQSxLQUFQLEtBQWlCLFFBRFgsSUFFTixPQUFPQSxLQUFLLENBQUNHLE1BQWIsS0FBd0IsUUFGbEIsSUFHTkgsS0FBSyxDQUFDRyxNQUFOLElBQWdCLENBSFYsSUFJTlQsS0FBSyxDQUFDTyxJQUFOLENBQVdELEtBQVgsTUFBc0IsZ0JBSmhCLElBS05OLEtBQUssQ0FBQ08sSUFBTixDQUFXRCxLQUFLLENBQUNJLE1BQWpCLE1BQTZCLG1CQUw5QjtBQU1BLENBVkQ7O0FBWUEsSUFBSUMseUJBQXlCLEdBQUksWUFBWTtBQUM1QyxTQUFPUCxtQkFBbUIsQ0FBQ1EsU0FBRCxDQUExQjtBQUNBLENBRmdDLEVBQWpDOztBQUlBUixtQkFBbUIsQ0FBQ0ksaUJBQXBCLEdBQXdDQSxpQkFBeEMsQyxDQUEyRDs7QUFFM0RLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkgseUJBQXlCLEdBQUdQLG1CQUFILEdBQXlCSSxpQkFBbkUsQyIsImZpbGUiOiJucG0uaXMtYXJndW1lbnRzLmJmYmE1ZmIxNTRkNWYyYjgxNDIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnO1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzU3RhbmRhcmRBcmd1bWVudHMgPSBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuXHRpZiAoaGFzVG9TdHJpbmdUYWcgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBTeW1ib2wudG9TdHJpbmdUYWcgaW4gdmFsdWUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIHRvU3RyLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn07XG5cbnZhciBpc0xlZ2FjeUFyZ3VtZW50cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdGlmIChpc1N0YW5kYXJkQXJndW1lbnRzKHZhbHVlKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcblx0XHR0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJyAmJlxuXHRcdHZhbHVlLmxlbmd0aCA+PSAwICYmXG5cdFx0dG9TdHIuY2FsbCh2YWx1ZSkgIT09ICdbb2JqZWN0IEFycmF5XScgJiZcblx0XHR0b1N0ci5jYWxsKHZhbHVlLmNhbGxlZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG52YXIgc3VwcG9ydHNTdGFuZGFyZEFyZ3VtZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBpc1N0YW5kYXJkQXJndW1lbnRzKGFyZ3VtZW50cyk7XG59KCkpO1xuXG5pc1N0YW5kYXJkQXJndW1lbnRzLmlzTGVnYWN5QXJndW1lbnRzID0gaXNMZWdhY3lBcmd1bWVudHM7IC8vIGZvciB0ZXN0c1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzU3RhbmRhcmRBcmd1bWVudHMgPyBpc1N0YW5kYXJkQXJndW1lbnRzIDogaXNMZWdhY3lBcmd1bWVudHM7XG4iXSwic291cmNlUm9vdCI6IiJ9
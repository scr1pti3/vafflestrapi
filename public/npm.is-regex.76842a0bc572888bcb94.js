(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.is-regex"],{

/***/ "2Nju":
/*!****************************************!*\
  !*** ./node_modules/is-regex/index.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(/*! has */ "oNNP");

var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
  try {
    var lastIndex = value.lastIndex;
    value.lastIndex = 0; // eslint-disable-line no-param-reassign

    regexExec.call(value);
    return true;
  } catch (e) {
    return false;
  } finally {
    value.lastIndex = lastIndex; // eslint-disable-line no-param-reassign
  }
};

var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
  if (!value || typeof value !== 'object') {
    return false;
  }

  if (!hasToStringTag) {
    return toStr.call(value) === regexClass;
  }

  var descriptor = gOPD(value, 'lastIndex');
  var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');

  if (!hasLastIndexDataProperty) {
    return false;
  }

  return tryRegexExecCall(value);
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtcmVnZXgvaW5kZXguanMiXSwibmFtZXMiOlsiaGFzIiwicmVxdWlyZSIsInJlZ2V4RXhlYyIsIlJlZ0V4cCIsInByb3RvdHlwZSIsImV4ZWMiLCJnT1BEIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwidHJ5UmVnZXhFeGVjQ2FsbCIsInRyeVJlZ2V4RXhlYyIsInZhbHVlIiwibGFzdEluZGV4IiwiY2FsbCIsImUiLCJ0b1N0ciIsInRvU3RyaW5nIiwicmVnZXhDbGFzcyIsImhhc1RvU3RyaW5nVGFnIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJtb2R1bGUiLCJleHBvcnRzIiwiaXNSZWdleCIsImRlc2NyaXB0b3IiLCJoYXNMYXN0SW5kZXhEYXRhUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWIsSUFBSUEsR0FBRyxHQUFHQyxtQkFBTyxDQUFDLGlCQUFELENBQWpCOztBQUNBLElBQUlDLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxJQUFqQztBQUNBLElBQUlDLElBQUksR0FBR0MsTUFBTSxDQUFDQyx3QkFBbEI7O0FBRUEsSUFBSUMsZ0JBQWdCLEdBQUcsU0FBU0MsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkI7QUFDbkQsTUFBSTtBQUNILFFBQUlDLFNBQVMsR0FBR0QsS0FBSyxDQUFDQyxTQUF0QjtBQUNBRCxTQUFLLENBQUNDLFNBQU4sR0FBa0IsQ0FBbEIsQ0FGRyxDQUVrQjs7QUFFckJWLGFBQVMsQ0FBQ1csSUFBVixDQUFlRixLQUFmO0FBQ0EsV0FBTyxJQUFQO0FBQ0EsR0FORCxDQU1FLE9BQU9HLENBQVAsRUFBVTtBQUNYLFdBQU8sS0FBUDtBQUNBLEdBUkQsU0FRVTtBQUNUSCxTQUFLLENBQUNDLFNBQU4sR0FBa0JBLFNBQWxCLENBRFMsQ0FDb0I7QUFDN0I7QUFDRCxDQVpEOztBQWFBLElBQUlHLEtBQUssR0FBR1IsTUFBTSxDQUFDSCxTQUFQLENBQWlCWSxRQUE3QjtBQUNBLElBQUlDLFVBQVUsR0FBRyxpQkFBakI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPQSxNQUFNLENBQUNDLFdBQWQsS0FBOEIsUUFBbkY7O0FBRUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixTQUFTQyxPQUFULENBQWlCWixLQUFqQixFQUF3QjtBQUN4QyxNQUFJLENBQUNBLEtBQUQsSUFBVSxPQUFPQSxLQUFQLEtBQWlCLFFBQS9CLEVBQXlDO0FBQ3hDLFdBQU8sS0FBUDtBQUNBOztBQUNELE1BQUksQ0FBQ08sY0FBTCxFQUFxQjtBQUNwQixXQUFPSCxLQUFLLENBQUNGLElBQU4sQ0FBV0YsS0FBWCxNQUFzQk0sVUFBN0I7QUFDQTs7QUFFRCxNQUFJTyxVQUFVLEdBQUdsQixJQUFJLENBQUNLLEtBQUQsRUFBUSxXQUFSLENBQXJCO0FBQ0EsTUFBSWMsd0JBQXdCLEdBQUdELFVBQVUsSUFBSXhCLEdBQUcsQ0FBQ3dCLFVBQUQsRUFBYSxPQUFiLENBQWhEOztBQUNBLE1BQUksQ0FBQ0Msd0JBQUwsRUFBK0I7QUFDOUIsV0FBTyxLQUFQO0FBQ0E7O0FBRUQsU0FBT2hCLGdCQUFnQixDQUFDRSxLQUFELENBQXZCO0FBQ0EsQ0FmRCxDIiwiZmlsZSI6Im5wbS5pcy1yZWdleC43Njg0MmEwYmM1NzI4ODhiY2I5NC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xudmFyIHJlZ2V4RXhlYyA9IFJlZ0V4cC5wcm90b3R5cGUuZXhlYztcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxudmFyIHRyeVJlZ2V4RXhlY0NhbGwgPSBmdW5jdGlvbiB0cnlSZWdleEV4ZWModmFsdWUpIHtcblx0dHJ5IHtcblx0XHR2YXIgbGFzdEluZGV4ID0gdmFsdWUubGFzdEluZGV4O1xuXHRcdHZhbHVlLmxhc3RJbmRleCA9IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblxuXHRcdHJlZ2V4RXhlYy5jYWxsKHZhbHVlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSBmaW5hbGx5IHtcblx0XHR2YWx1ZS5sYXN0SW5kZXggPSBsYXN0SW5kZXg7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblx0fVxufTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgcmVnZXhDbGFzcyA9ICdbb2JqZWN0IFJlZ0V4cF0nO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1JlZ2V4KHZhbHVlKSB7XG5cdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoIWhhc1RvU3RyaW5nVGFnKSB7XG5cdFx0cmV0dXJuIHRvU3RyLmNhbGwodmFsdWUpID09PSByZWdleENsYXNzO1xuXHR9XG5cblx0dmFyIGRlc2NyaXB0b3IgPSBnT1BEKHZhbHVlLCAnbGFzdEluZGV4Jyk7XG5cdHZhciBoYXNMYXN0SW5kZXhEYXRhUHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGhhcyhkZXNjcmlwdG9yLCAndmFsdWUnKTtcblx0aWYgKCFoYXNMYXN0SW5kZXhEYXRhUHJvcGVydHkpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gdHJ5UmVnZXhFeGVjQ2FsbCh2YWx1ZSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.is-date-object"],{

/***/ "DmXP":
/*!**********************************************!*\
  !*** ./node_modules/is-date-object/index.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDay = Date.prototype.getDay;

var tryDateObject = function tryDateGetDayCall(value) {
  try {
    getDay.call(value);
    return true;
  } catch (e) {
    return false;
  }
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtZGF0ZS1vYmplY3QvaW5kZXguanMiXSwibmFtZXMiOlsiZ2V0RGF5IiwiRGF0ZSIsInByb3RvdHlwZSIsInRyeURhdGVPYmplY3QiLCJ0cnlEYXRlR2V0RGF5Q2FsbCIsInZhbHVlIiwiY2FsbCIsImUiLCJ0b1N0ciIsIk9iamVjdCIsInRvU3RyaW5nIiwiZGF0ZUNsYXNzIiwiaGFzVG9TdHJpbmdUYWciLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJpc0RhdGVPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWIsSUFBSUEsTUFBTSxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUYsTUFBNUI7O0FBQ0EsSUFBSUcsYUFBYSxHQUFHLFNBQVNDLGlCQUFULENBQTJCQyxLQUEzQixFQUFrQztBQUNyRCxNQUFJO0FBQ0hMLFVBQU0sQ0FBQ00sSUFBUCxDQUFZRCxLQUFaO0FBQ0EsV0FBTyxJQUFQO0FBQ0EsR0FIRCxDQUdFLE9BQU9FLENBQVAsRUFBVTtBQUNYLFdBQU8sS0FBUDtBQUNBO0FBQ0QsQ0FQRDs7QUFTQSxJQUFJQyxLQUFLLEdBQUdDLE1BQU0sQ0FBQ1AsU0FBUCxDQUFpQlEsUUFBN0I7QUFDQSxJQUFJQyxTQUFTLEdBQUcsZUFBaEI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPQSxNQUFNLENBQUNDLFdBQWQsS0FBOEIsUUFBbkY7O0FBRUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixTQUFTQyxZQUFULENBQXNCWixLQUF0QixFQUE2QjtBQUM3QyxNQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBakIsSUFBNkJBLEtBQUssS0FBSyxJQUEzQyxFQUFpRDtBQUNoRCxXQUFPLEtBQVA7QUFDQTs7QUFDRCxTQUFPTyxjQUFjLEdBQUdULGFBQWEsQ0FBQ0UsS0FBRCxDQUFoQixHQUEwQkcsS0FBSyxDQUFDRixJQUFOLENBQVdELEtBQVgsTUFBc0JNLFNBQXJFO0FBQ0EsQ0FMRCxDIiwiZmlsZSI6Im5wbS5pcy1kYXRlLW9iamVjdC4yOTNiYTVjODk0YmQ5YmNhOTE4ZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGdldERheSA9IERhdGUucHJvdG90eXBlLmdldERheTtcbnZhciB0cnlEYXRlT2JqZWN0ID0gZnVuY3Rpb24gdHJ5RGF0ZUdldERheUNhbGwodmFsdWUpIHtcblx0dHJ5IHtcblx0XHRnZXREYXkuY2FsbCh2YWx1ZSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZGF0ZUNsYXNzID0gJ1tvYmplY3QgRGF0ZV0nO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0RhdGVPYmplY3QodmFsdWUpIHtcblx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgfHwgdmFsdWUgPT09IG51bGwpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIGhhc1RvU3RyaW5nVGFnID8gdHJ5RGF0ZU9iamVjdCh2YWx1ZSkgOiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gZGF0ZUNsYXNzO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
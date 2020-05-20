(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.deep-equal"],{

/***/ "f66B":
/*!******************************************!*\
  !*** ./node_modules/deep-equal/index.js ***!
  \******************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var objectKeys = __webpack_require__(/*! object-keys */ "1seS");

var isArguments = __webpack_require__(/*! is-arguments */ "45zb");

var is = __webpack_require__(/*! object-is */ "bbcx");

var isRegex = __webpack_require__(/*! is-regex */ "2Nju");

var flags = __webpack_require__(/*! regexp.prototype.flags */ "5xAX");

var isDate = __webpack_require__(/*! is-date-object */ "DmXP");

var getTime = Date.prototype.getTime;

function deepEqual(actual, expected, options) {
  var opts = options || {}; // 7.1. All identical values are equivalent, as determined by ===.

  if (opts.strict ? is(actual, expected) : actual === expected) {
    return true;
  } // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.


  if (!actual || !expected || typeof actual !== 'object' && typeof expected !== 'object') {
    return opts.strict ? is(actual, expected) : actual == expected;
  }
  /*
   * 7.4. For all other Object pairs, including Array objects, equivalence is
   * determined by having the same number of owned properties (as verified
   * with Object.prototype.hasOwnProperty.call), the same set of keys
   * (although not necessarily the same order), equivalent values for every
   * corresponding key, and an identical 'prototype' property. Note: this
   * accounts for both named and indexed properties on Arrays.
   */
  // eslint-disable-next-line no-use-before-define


  return objEquiv(actual, expected, opts);
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
    return false;
  }

  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }

  if (x.length > 0 && typeof x[0] !== 'number') {
    return false;
  }

  return true;
}

function objEquiv(a, b, opts) {
  /* eslint max-statements: [2, 50] */
  var i, key;

  if (typeof a !== typeof b) {
    return false;
  }

  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) {
    return false;
  } // an identical 'prototype' property.


  if (a.prototype !== b.prototype) {
    return false;
  }

  if (isArguments(a) !== isArguments(b)) {
    return false;
  }

  var aIsRegex = isRegex(a);
  var bIsRegex = isRegex(b);

  if (aIsRegex !== bIsRegex) {
    return false;
  }

  if (aIsRegex || bIsRegex) {
    return a.source === b.source && flags(a) === flags(b);
  }

  if (isDate(a) && isDate(b)) {
    return getTime.call(a) === getTime.call(b);
  }

  var aIsBuffer = isBuffer(a);
  var bIsBuffer = isBuffer(b);

  if (aIsBuffer !== bIsBuffer) {
    return false;
  }

  if (aIsBuffer || bIsBuffer) {
    // && would work too, because both are true or both false here
    if (a.length !== b.length) {
      return false;
    }

    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  try {
    var ka = objectKeys(a);
    var kb = objectKeys(b);
  } catch (e) {
    // happens when one is a string literal and the other isn't
    return false;
  } // having the same number of owned properties (keys incorporates hasOwnProperty)


  if (ka.length !== kb.length) {
    return false;
  } // the same set of keys (although not necessarily the same order),


  ka.sort();
  kb.sort(); // ~~~cheap key test

  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) {
      return false;
    }
  } // equivalent values for every corresponding key, and ~~~possibly expensive deep test


  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];

    if (!deepEqual(a[key], b[key], opts)) {
      return false;
    }
  }

  return true;
}

module.exports = deepEqual;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVlcC1lcXVhbC9pbmRleC5qcyJdLCJuYW1lcyI6WyJvYmplY3RLZXlzIiwicmVxdWlyZSIsImlzQXJndW1lbnRzIiwiaXMiLCJpc1JlZ2V4IiwiZmxhZ3MiLCJpc0RhdGUiLCJnZXRUaW1lIiwiRGF0ZSIsInByb3RvdHlwZSIsImRlZXBFcXVhbCIsImFjdHVhbCIsImV4cGVjdGVkIiwib3B0aW9ucyIsIm9wdHMiLCJzdHJpY3QiLCJvYmpFcXVpdiIsImlzVW5kZWZpbmVkT3JOdWxsIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJpc0J1ZmZlciIsIngiLCJsZW5ndGgiLCJjb3B5Iiwic2xpY2UiLCJhIiwiYiIsImkiLCJrZXkiLCJhSXNSZWdleCIsImJJc1JlZ2V4Iiwic291cmNlIiwiY2FsbCIsImFJc0J1ZmZlciIsImJJc0J1ZmZlciIsImthIiwia2IiLCJlIiwic29ydCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxVQUFVLEdBQUdDLG1CQUFPLENBQUMseUJBQUQsQ0FBeEI7O0FBQ0EsSUFBSUMsV0FBVyxHQUFHRCxtQkFBTyxDQUFDLDBCQUFELENBQXpCOztBQUNBLElBQUlFLEVBQUUsR0FBR0YsbUJBQU8sQ0FBQyx1QkFBRCxDQUFoQjs7QUFDQSxJQUFJRyxPQUFPLEdBQUdILG1CQUFPLENBQUMsc0JBQUQsQ0FBckI7O0FBQ0EsSUFBSUksS0FBSyxHQUFHSixtQkFBTyxDQUFDLG9DQUFELENBQW5COztBQUNBLElBQUlLLE1BQU0sR0FBR0wsbUJBQU8sQ0FBQyw0QkFBRCxDQUFwQjs7QUFFQSxJQUFJTSxPQUFPLEdBQUdDLElBQUksQ0FBQ0MsU0FBTCxDQUFlRixPQUE3Qjs7QUFFQSxTQUFTRyxTQUFULENBQW1CQyxNQUFuQixFQUEyQkMsUUFBM0IsRUFBcUNDLE9BQXJDLEVBQThDO0FBQzVDLE1BQUlDLElBQUksR0FBR0QsT0FBTyxJQUFJLEVBQXRCLENBRDRDLENBRzVDOztBQUNBLE1BQUlDLElBQUksQ0FBQ0MsTUFBTCxHQUFjWixFQUFFLENBQUNRLE1BQUQsRUFBU0MsUUFBVCxDQUFoQixHQUFxQ0QsTUFBTSxLQUFLQyxRQUFwRCxFQUE4RDtBQUM1RCxXQUFPLElBQVA7QUFDRCxHQU4yQyxDQVE1Qzs7O0FBQ0EsTUFBSSxDQUFDRCxNQUFELElBQVcsQ0FBQ0MsUUFBWixJQUF5QixPQUFPRCxNQUFQLEtBQWtCLFFBQWxCLElBQThCLE9BQU9DLFFBQVAsS0FBb0IsUUFBL0UsRUFBMEY7QUFDeEYsV0FBT0UsSUFBSSxDQUFDQyxNQUFMLEdBQWNaLEVBQUUsQ0FBQ1EsTUFBRCxFQUFTQyxRQUFULENBQWhCLEdBQXFDRCxNQUFNLElBQUlDLFFBQXREO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFRQTs7O0FBQ0EsU0FBT0ksUUFBUSxDQUFDTCxNQUFELEVBQVNDLFFBQVQsRUFBbUJFLElBQW5CLENBQWY7QUFDRDs7QUFFRCxTQUFTRyxpQkFBVCxDQUEyQkMsS0FBM0IsRUFBa0M7QUFDaEMsU0FBT0EsS0FBSyxLQUFLLElBQVYsSUFBa0JBLEtBQUssS0FBS0MsU0FBbkM7QUFDRDs7QUFFRCxTQUFTQyxRQUFULENBQWtCQyxDQUFsQixFQUFxQjtBQUNuQixNQUFJLENBQUNBLENBQUQsSUFBTSxPQUFPQSxDQUFQLEtBQWEsUUFBbkIsSUFBK0IsT0FBT0EsQ0FBQyxDQUFDQyxNQUFULEtBQW9CLFFBQXZELEVBQWlFO0FBQy9ELFdBQU8sS0FBUDtBQUNEOztBQUNELE1BQUksT0FBT0QsQ0FBQyxDQUFDRSxJQUFULEtBQWtCLFVBQWxCLElBQWdDLE9BQU9GLENBQUMsQ0FBQ0csS0FBVCxLQUFtQixVQUF2RCxFQUFtRTtBQUNqRSxXQUFPLEtBQVA7QUFDRDs7QUFDRCxNQUFJSCxDQUFDLENBQUNDLE1BQUYsR0FBVyxDQUFYLElBQWdCLE9BQU9ELENBQUMsQ0FBQyxDQUFELENBQVIsS0FBZ0IsUUFBcEMsRUFBOEM7QUFDNUMsV0FBTyxLQUFQO0FBQ0Q7O0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7O0FBRUQsU0FBU0wsUUFBVCxDQUFrQlMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCWixJQUF4QixFQUE4QjtBQUM1QjtBQUNBLE1BQUlhLENBQUosRUFBT0MsR0FBUDs7QUFDQSxNQUFJLE9BQU9ILENBQVAsS0FBYSxPQUFPQyxDQUF4QixFQUEyQjtBQUFFLFdBQU8sS0FBUDtBQUFlOztBQUM1QyxNQUFJVCxpQkFBaUIsQ0FBQ1EsQ0FBRCxDQUFqQixJQUF3QlIsaUJBQWlCLENBQUNTLENBQUQsQ0FBN0MsRUFBa0Q7QUFBRSxXQUFPLEtBQVA7QUFBZSxHQUp2QyxDQU01Qjs7O0FBQ0EsTUFBSUQsQ0FBQyxDQUFDaEIsU0FBRixLQUFnQmlCLENBQUMsQ0FBQ2pCLFNBQXRCLEVBQWlDO0FBQUUsV0FBTyxLQUFQO0FBQWU7O0FBRWxELE1BQUlQLFdBQVcsQ0FBQ3VCLENBQUQsQ0FBWCxLQUFtQnZCLFdBQVcsQ0FBQ3dCLENBQUQsQ0FBbEMsRUFBdUM7QUFBRSxXQUFPLEtBQVA7QUFBZTs7QUFFeEQsTUFBSUcsUUFBUSxHQUFHekIsT0FBTyxDQUFDcUIsQ0FBRCxDQUF0QjtBQUNBLE1BQUlLLFFBQVEsR0FBRzFCLE9BQU8sQ0FBQ3NCLENBQUQsQ0FBdEI7O0FBQ0EsTUFBSUcsUUFBUSxLQUFLQyxRQUFqQixFQUEyQjtBQUFFLFdBQU8sS0FBUDtBQUFlOztBQUM1QyxNQUFJRCxRQUFRLElBQUlDLFFBQWhCLEVBQTBCO0FBQ3hCLFdBQU9MLENBQUMsQ0FBQ00sTUFBRixLQUFhTCxDQUFDLENBQUNLLE1BQWYsSUFBeUIxQixLQUFLLENBQUNvQixDQUFELENBQUwsS0FBYXBCLEtBQUssQ0FBQ3FCLENBQUQsQ0FBbEQ7QUFDRDs7QUFFRCxNQUFJcEIsTUFBTSxDQUFDbUIsQ0FBRCxDQUFOLElBQWFuQixNQUFNLENBQUNvQixDQUFELENBQXZCLEVBQTRCO0FBQzFCLFdBQU9uQixPQUFPLENBQUN5QixJQUFSLENBQWFQLENBQWIsTUFBb0JsQixPQUFPLENBQUN5QixJQUFSLENBQWFOLENBQWIsQ0FBM0I7QUFDRDs7QUFFRCxNQUFJTyxTQUFTLEdBQUdiLFFBQVEsQ0FBQ0ssQ0FBRCxDQUF4QjtBQUNBLE1BQUlTLFNBQVMsR0FBR2QsUUFBUSxDQUFDTSxDQUFELENBQXhCOztBQUNBLE1BQUlPLFNBQVMsS0FBS0MsU0FBbEIsRUFBNkI7QUFBRSxXQUFPLEtBQVA7QUFBZTs7QUFDOUMsTUFBSUQsU0FBUyxJQUFJQyxTQUFqQixFQUE0QjtBQUFFO0FBQzVCLFFBQUlULENBQUMsQ0FBQ0gsTUFBRixLQUFhSSxDQUFDLENBQUNKLE1BQW5CLEVBQTJCO0FBQUUsYUFBTyxLQUFQO0FBQWU7O0FBQzVDLFNBQUtLLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR0YsQ0FBQyxDQUFDSCxNQUFsQixFQUEwQkssQ0FBQyxFQUEzQixFQUErQjtBQUM3QixVQUFJRixDQUFDLENBQUNFLENBQUQsQ0FBRCxLQUFTRCxDQUFDLENBQUNDLENBQUQsQ0FBZCxFQUFtQjtBQUFFLGVBQU8sS0FBUDtBQUFlO0FBQ3JDOztBQUNELFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQUksT0FBT0YsQ0FBUCxLQUFhLE9BQU9DLENBQXhCLEVBQTJCO0FBQUUsV0FBTyxLQUFQO0FBQWU7O0FBRTVDLE1BQUk7QUFDRixRQUFJUyxFQUFFLEdBQUduQyxVQUFVLENBQUN5QixDQUFELENBQW5CO0FBQ0EsUUFBSVcsRUFBRSxHQUFHcEMsVUFBVSxDQUFDMEIsQ0FBRCxDQUFuQjtBQUNELEdBSEQsQ0FHRSxPQUFPVyxDQUFQLEVBQVU7QUFBRTtBQUNaLFdBQU8sS0FBUDtBQUNELEdBeEMyQixDQXlDNUI7OztBQUNBLE1BQUlGLEVBQUUsQ0FBQ2IsTUFBSCxLQUFjYyxFQUFFLENBQUNkLE1BQXJCLEVBQTZCO0FBQUUsV0FBTyxLQUFQO0FBQWUsR0ExQ2xCLENBNEM1Qjs7O0FBQ0FhLElBQUUsQ0FBQ0csSUFBSDtBQUNBRixJQUFFLENBQUNFLElBQUgsR0E5QzRCLENBK0M1Qjs7QUFDQSxPQUFLWCxDQUFDLEdBQUdRLEVBQUUsQ0FBQ2IsTUFBSCxHQUFZLENBQXJCLEVBQXdCSyxDQUFDLElBQUksQ0FBN0IsRUFBZ0NBLENBQUMsRUFBakMsRUFBcUM7QUFDbkMsUUFBSVEsRUFBRSxDQUFDUixDQUFELENBQUYsSUFBU1MsRUFBRSxDQUFDVCxDQUFELENBQWYsRUFBb0I7QUFBRSxhQUFPLEtBQVA7QUFBZTtBQUN0QyxHQWxEMkIsQ0FtRDVCOzs7QUFDQSxPQUFLQSxDQUFDLEdBQUdRLEVBQUUsQ0FBQ2IsTUFBSCxHQUFZLENBQXJCLEVBQXdCSyxDQUFDLElBQUksQ0FBN0IsRUFBZ0NBLENBQUMsRUFBakMsRUFBcUM7QUFDbkNDLE9BQUcsR0FBR08sRUFBRSxDQUFDUixDQUFELENBQVI7O0FBQ0EsUUFBSSxDQUFDakIsU0FBUyxDQUFDZSxDQUFDLENBQUNHLEdBQUQsQ0FBRixFQUFTRixDQUFDLENBQUNFLEdBQUQsQ0FBVixFQUFpQmQsSUFBakIsQ0FBZCxFQUFzQztBQUFFLGFBQU8sS0FBUDtBQUFlO0FBQ3hEOztBQUVELFNBQU8sSUFBUDtBQUNEOztBQUVEeUIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCOUIsU0FBakIsQyIsImZpbGUiOiJucG0uZGVlcC1lcXVhbC44MTg2OTk3ODYzMzExNmZhNGNlMS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnb2JqZWN0LWtleXMnKTtcbnZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJ2lzLWFyZ3VtZW50cycpO1xudmFyIGlzID0gcmVxdWlyZSgnb2JqZWN0LWlzJyk7XG52YXIgaXNSZWdleCA9IHJlcXVpcmUoJ2lzLXJlZ2V4Jyk7XG52YXIgZmxhZ3MgPSByZXF1aXJlKCdyZWdleHAucHJvdG90eXBlLmZsYWdzJyk7XG52YXIgaXNEYXRlID0gcmVxdWlyZSgnaXMtZGF0ZS1vYmplY3QnKTtcblxudmFyIGdldFRpbWUgPSBEYXRlLnByb3RvdHlwZS5nZXRUaW1lO1xuXG5mdW5jdGlvbiBkZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgb3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG5cbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChvcHRzLnN0cmljdCA/IGlzKGFjdHVhbCwgZXhwZWN0ZWQpIDogYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gNy4zLiBPdGhlciBwYWlycyB0aGF0IGRvIG5vdCBib3RoIHBhc3MgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnLCBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5ID09LlxuICBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQgfHwgKHR5cGVvZiBhY3R1YWwgIT09ICdvYmplY3QnICYmIHR5cGVvZiBleHBlY3RlZCAhPT0gJ29iamVjdCcpKSB7XG4gICAgcmV0dXJuIG9wdHMuc3RyaWN0ID8gaXMoYWN0dWFsLCBleHBlY3RlZCkgOiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG4gIH1cblxuICAvKlxuICAgKiA3LjQuIEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcbiAgICogZGV0ZXJtaW5lZCBieSBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGFzIHZlcmlmaWVkXG4gICAqIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgICogKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuICAgKiBjb3JyZXNwb25kaW5nIGtleSwgYW5kIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS4gTm90ZTogdGhpc1xuICAgKiBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCwgb3B0cyk7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkT3JOdWxsKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc0J1ZmZlcih4KSB7XG4gIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHgubGVuZ3RoICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIHguY29weSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgeC5zbGljZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoeC5sZW5ndGggPiAwICYmIHR5cGVvZiB4WzBdICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgb3B0cykge1xuICAvKiBlc2xpbnQgbWF4LXN0YXRlbWVudHM6IFsyLCA1MF0gKi9cbiAgdmFyIGksIGtleTtcbiAgaWYgKHR5cGVvZiBhICE9PSB0eXBlb2YgYikgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGlzVW5kZWZpbmVkT3JOdWxsKGEpIHx8IGlzVW5kZWZpbmVkT3JOdWxsKGIpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBpZiAoaXNBcmd1bWVudHMoYSkgIT09IGlzQXJndW1lbnRzKGIpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHZhciBhSXNSZWdleCA9IGlzUmVnZXgoYSk7XG4gIHZhciBiSXNSZWdleCA9IGlzUmVnZXgoYik7XG4gIGlmIChhSXNSZWdleCAhPT0gYklzUmVnZXgpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChhSXNSZWdleCB8fCBiSXNSZWdleCkge1xuICAgIHJldHVybiBhLnNvdXJjZSA9PT0gYi5zb3VyY2UgJiYgZmxhZ3MoYSkgPT09IGZsYWdzKGIpO1xuICB9XG5cbiAgaWYgKGlzRGF0ZShhKSAmJiBpc0RhdGUoYikpIHtcbiAgICByZXR1cm4gZ2V0VGltZS5jYWxsKGEpID09PSBnZXRUaW1lLmNhbGwoYik7XG4gIH1cblxuICB2YXIgYUlzQnVmZmVyID0gaXNCdWZmZXIoYSk7XG4gIHZhciBiSXNCdWZmZXIgPSBpc0J1ZmZlcihiKTtcbiAgaWYgKGFJc0J1ZmZlciAhPT0gYklzQnVmZmVyKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoYUlzQnVmZmVyIHx8IGJJc0J1ZmZlcikgeyAvLyAmJiB3b3VsZCB3b3JrIHRvbywgYmVjYXVzZSBib3RoIGFyZSB0cnVlIG9yIGJvdGggZmFsc2UgaGVyZVxuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhW2ldICE9PSBiW2ldKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYSAhPT0gdHlwZW9mIGIpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgdHJ5IHtcbiAgICB2YXIga2EgPSBvYmplY3RLZXlzKGEpO1xuICAgIHZhciBrYiA9IG9iamVjdEtleXMoYik7XG4gIH0gY2F0Y2ggKGUpIHsgLy8gaGFwcGVucyB3aGVuIG9uZSBpcyBhIHN0cmluZyBsaXRlcmFsIGFuZCB0aGUgb3RoZXIgaXNuJ3RcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlcyBoYXNPd25Qcm9wZXJ0eSlcbiAgaWYgKGthLmxlbmd0aCAhPT0ga2IubGVuZ3RoKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIC8vIHRoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy8gfn5+Y2hlYXAga2V5IHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoa2FbaV0gIT0ga2JbaV0pIHsgcmV0dXJuIGZhbHNlOyB9XG4gIH1cbiAgLy8gZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghZGVlcEVxdWFsKGFba2V5XSwgYltrZXldLCBvcHRzKSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZXBFcXVhbDtcbiJdLCJzb3VyY2VSb290IjoiIn0=
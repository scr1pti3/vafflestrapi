(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.dom-helpers"],{

/***/ "VOcB":
/*!*******************************************************!*\
  !*** ./node_modules/dom-helpers/class/removeClass.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

module.exports = function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);else if (typeof element.className === 'string') element.className = replaceClassName(element.className, className);else element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
};

/***/ }),

/***/ "yD6e":
/*!****************************************************!*\
  !*** ./node_modules/dom-helpers/class/hasClass.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = hasClass;

function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);else return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

module.exports = exports["default"];

/***/ }),

/***/ "ycFn":
/*!****************************************************!*\
  !*** ./node_modules/dom-helpers/class/addClass.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "TqRt");

exports.__esModule = true;
exports.default = addClass;

var _hasClass = _interopRequireDefault(__webpack_require__(/*! ./hasClass */ "yD6e"));

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0, _hasClass.default)(element, className)) if (typeof element.className === 'string') element.className = element.className + ' ' + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + ' ' + className);
}

module.exports = exports["default"];

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvY2xhc3MvcmVtb3ZlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL2NsYXNzL2hhc0NsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kb20taGVscGVycy9jbGFzcy9hZGRDbGFzcy5qcyJdLCJuYW1lcyI6WyJyZXBsYWNlQ2xhc3NOYW1lIiwib3JpZ0NsYXNzIiwiY2xhc3NUb1JlbW92ZSIsInJlcGxhY2UiLCJSZWdFeHAiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVtb3ZlQ2xhc3MiLCJlbGVtZW50IiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwic2V0QXR0cmlidXRlIiwiYmFzZVZhbCIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImluZGV4T2YiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsImFkZENsYXNzIiwiX2hhc0NsYXNzIiwiYWRkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFhOztBQUViLFNBQVNBLGdCQUFULENBQTBCQyxTQUExQixFQUFxQ0MsYUFBckMsRUFBb0Q7QUFDbEQsU0FBT0QsU0FBUyxDQUFDRSxPQUFWLENBQWtCLElBQUlDLE1BQUosQ0FBVyxZQUFZRixhQUFaLEdBQTRCLFdBQXZDLEVBQW9ELEdBQXBELENBQWxCLEVBQTRFLElBQTVFLEVBQWtGQyxPQUFsRixDQUEwRixNQUExRixFQUFrRyxHQUFsRyxFQUF1R0EsT0FBdkcsQ0FBK0csWUFBL0csRUFBNkgsRUFBN0gsQ0FBUDtBQUNEOztBQUVERSxNQUFNLENBQUNDLE9BQVAsR0FBaUIsU0FBU0MsV0FBVCxDQUFxQkMsT0FBckIsRUFBOEJDLFNBQTlCLEVBQXlDO0FBQ3hELE1BQUlELE9BQU8sQ0FBQ0UsU0FBWixFQUF1QkYsT0FBTyxDQUFDRSxTQUFSLENBQWtCQyxNQUFsQixDQUF5QkYsU0FBekIsRUFBdkIsS0FBZ0UsSUFBSSxPQUFPRCxPQUFPLENBQUNDLFNBQWYsS0FBNkIsUUFBakMsRUFBMkNELE9BQU8sQ0FBQ0MsU0FBUixHQUFvQlQsZ0JBQWdCLENBQUNRLE9BQU8sQ0FBQ0MsU0FBVCxFQUFvQkEsU0FBcEIsQ0FBcEMsQ0FBM0MsS0FBbUhELE9BQU8sQ0FBQ0ksWUFBUixDQUFxQixPQUFyQixFQUE4QlosZ0JBQWdCLENBQUNRLE9BQU8sQ0FBQ0MsU0FBUixJQUFxQkQsT0FBTyxDQUFDQyxTQUFSLENBQWtCSSxPQUF2QyxJQUFrRCxFQUFuRCxFQUF1REosU0FBdkQsQ0FBOUM7QUFDcEwsQ0FGRCxDOzs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWJILE9BQU8sQ0FBQ1EsVUFBUixHQUFxQixJQUFyQjtBQUNBUixPQUFPLENBQUNTLE9BQVIsR0FBa0JDLFFBQWxCOztBQUVBLFNBQVNBLFFBQVQsQ0FBa0JSLE9BQWxCLEVBQTJCQyxTQUEzQixFQUFzQztBQUNwQyxNQUFJRCxPQUFPLENBQUNFLFNBQVosRUFBdUIsT0FBTyxDQUFDLENBQUNELFNBQUYsSUFBZUQsT0FBTyxDQUFDRSxTQUFSLENBQWtCTyxRQUFsQixDQUEyQlIsU0FBM0IsQ0FBdEIsQ0FBdkIsS0FBd0YsT0FBTyxDQUFDLE9BQU9ELE9BQU8sQ0FBQ0MsU0FBUixDQUFrQkksT0FBbEIsSUFBNkJMLE9BQU8sQ0FBQ0MsU0FBNUMsSUFBeUQsR0FBMUQsRUFBK0RTLE9BQS9ELENBQXVFLE1BQU1ULFNBQU4sR0FBa0IsR0FBekYsTUFBa0csQ0FBQyxDQUExRztBQUN6Rjs7QUFFREosTUFBTSxDQUFDQyxPQUFQLEdBQWlCQSxPQUFPLENBQUMsU0FBRCxDQUF4QixDOzs7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWIsSUFBSWEsc0JBQXNCLEdBQUdDLG1CQUFPLENBQUMsMERBQUQsQ0FBcEM7O0FBRUFkLE9BQU8sQ0FBQ1EsVUFBUixHQUFxQixJQUFyQjtBQUNBUixPQUFPLENBQUNTLE9BQVIsR0FBa0JNLFFBQWxCOztBQUVBLElBQUlDLFNBQVMsR0FBR0gsc0JBQXNCLENBQUNDLG1CQUFPLENBQUMsd0JBQUQsQ0FBUixDQUF0Qzs7QUFFQSxTQUFTQyxRQUFULENBQWtCYixPQUFsQixFQUEyQkMsU0FBM0IsRUFBc0M7QUFDcEMsTUFBSUQsT0FBTyxDQUFDRSxTQUFaLEVBQXVCRixPQUFPLENBQUNFLFNBQVIsQ0FBa0JhLEdBQWxCLENBQXNCZCxTQUF0QixFQUF2QixLQUE2RCxJQUFJLENBQUMsQ0FBQyxHQUFHYSxTQUFTLENBQUNQLE9BQWQsRUFBdUJQLE9BQXZCLEVBQWdDQyxTQUFoQyxDQUFMLEVBQWlELElBQUksT0FBT0QsT0FBTyxDQUFDQyxTQUFmLEtBQTZCLFFBQWpDLEVBQTJDRCxPQUFPLENBQUNDLFNBQVIsR0FBb0JELE9BQU8sQ0FBQ0MsU0FBUixHQUFvQixHQUFwQixHQUEwQkEsU0FBOUMsQ0FBM0MsS0FBd0dELE9BQU8sQ0FBQ0ksWUFBUixDQUFxQixPQUFyQixFQUE4QixDQUFDSixPQUFPLENBQUNDLFNBQVIsSUFBcUJELE9BQU8sQ0FBQ0MsU0FBUixDQUFrQkksT0FBdkMsSUFBa0QsRUFBbkQsSUFBeUQsR0FBekQsR0FBK0RKLFNBQTdGO0FBQ3ZOOztBQUVESixNQUFNLENBQUNDLE9BQVAsR0FBaUJBLE9BQU8sQ0FBQyxTQUFELENBQXhCLEMiLCJmaWxlIjoibnBtLmRvbS1oZWxwZXJzLjkwMGQ1ZTliNWQzZWI2YWUyYmE5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiByZXBsYWNlQ2xhc3NOYW1lKG9yaWdDbGFzcywgY2xhc3NUb1JlbW92ZSkge1xuICByZXR1cm4gb3JpZ0NsYXNzLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXHMpJyArIGNsYXNzVG9SZW1vdmUgKyAnKD86XFxcXHN8JCknLCAnZycpLCAnJDEnKS5yZXBsYWNlKC9cXHMrL2csICcgJykucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO2Vsc2UgaWYgKHR5cGVvZiBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIGVsZW1lbnQuY2xhc3NOYW1lID0gcmVwbGFjZUNsYXNzTmFtZShlbGVtZW50LmNsYXNzTmFtZSwgY2xhc3NOYW1lKTtlbHNlIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIHJlcGxhY2VDbGFzc05hbWUoZWxlbWVudC5jbGFzc05hbWUgJiYgZWxlbWVudC5jbGFzc05hbWUuYmFzZVZhbCB8fCAnJywgY2xhc3NOYW1lKSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gaGFzQ2xhc3M7XG5cbmZ1bmN0aW9uIGhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHJldHVybiAhIWNsYXNzTmFtZSAmJiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO2Vsc2UgcmV0dXJuIChcIiBcIiArIChlbGVtZW50LmNsYXNzTmFtZS5iYXNlVmFsIHx8IGVsZW1lbnQuY2xhc3NOYW1lKSArIFwiIFwiKS5pbmRleE9mKFwiIFwiICsgY2xhc3NOYW1lICsgXCIgXCIpICE9PSAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmRlZmF1bHQgPSBhZGRDbGFzcztcblxudmFyIF9oYXNDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaGFzQ2xhc3NcIikpO1xuXG5mdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtlbHNlIGlmICghKDAsIF9oYXNDbGFzcy5kZWZhdWx0KShlbGVtZW50LCBjbGFzc05hbWUpKSBpZiAodHlwZW9mIGVsZW1lbnQuY2xhc3NOYW1lID09PSAnc3RyaW5nJykgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSArICcgJyArIGNsYXNzTmFtZTtlbHNlIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbGVtZW50LmNsYXNzTmFtZSAmJiBlbGVtZW50LmNsYXNzTmFtZS5iYXNlVmFsIHx8ICcnKSArICcgJyArIGNsYXNzTmFtZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07Il0sInNvdXJjZVJvb3QiOiIifQ==
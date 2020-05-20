(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.react-scrollspy"],{

/***/ "Fxm3":
/*!******************************************************!*\
  !*** ./node_modules/react-scrollspy/lib/throttle.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var throttle = function throttle(fn) {
  var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var last;
  var timer;
  return function () {
    var now = +new Date();
    var timePassed = !!last && now < last + threshold;

    if (timePassed) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn();
      }, threshold);
    } else {
      last = now;
      fn();
    }
  };
};

var _default = throttle;
exports.default = _default;

/***/ }),

/***/ "YIkO":
/*!*******************************************************!*\
  !*** ./node_modules/react-scrollspy/lib/scrollspy.js ***!
  \*******************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "pVnL"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "lSNA"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "RIqP"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "lwsE"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "Nsbk"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "PJYZ"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "W8MJ"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "7W2i"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "17x9"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "q1tI"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "TSYQ"));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./throttle */ "Fxm3"));

function isEqualArray(a, b) {
  return a.length === b.length && a.every(function (item, index) {
    return item === b[index];
  });
}

var Scrollspy =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Scrollspy, _React$Component);
  (0, _createClass2.default)(Scrollspy, null, [{
    key: "propTypes",
    get: function get() {
      return {
        items: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
        currentClassName: _propTypes.default.string.isRequired,
        scrolledPastClassName: _propTypes.default.string,
        style: _propTypes.default.object,
        componentTag: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
        offset: _propTypes.default.number,
        rootEl: _propTypes.default.string,
        onUpdate: _propTypes.default.func
      };
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        items: [],
        currentClassName: '',
        style: {},
        componentTag: 'ul',
        offset: 0,
        onUpdate: function onUpdate() {}
      };
    }
  }]);

  function Scrollspy(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Scrollspy);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Scrollspy).call(this, props));
    _this.state = {
      targetItems: [],
      inViewState: [],
      isScrolledPast: [] // manually bind as ES6 does not apply this
      // auto binding as React.createClass does

    };
    _this._handleSpy = _this._handleSpy.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Scrollspy, [{
    key: "_initSpyTarget",
    value: function _initSpyTarget(items) {
      var targetItems = items.map(function (item) {
        return document.getElementById(item);
      });
      return targetItems;
    } // https://github.com/makotot/react-scrollspy/pull/45

  }, {
    key: "_fillArray",
    value: function _fillArray(array, val) {
      var newArray = [];

      for (var i = 0, max = array.length; i < max; i++) {
        newArray[i] = val;
      }

      return newArray;
    }
  }, {
    key: "_isScrolled",
    value: function _isScrolled() {
      return this._getScrollDimension().scrollTop > 0;
    }
  }, {
    key: "_getScrollDimension",
    value: function _getScrollDimension() {
      var doc = document;
      var rootEl = this.props.rootEl;
      var scrollTop = rootEl ? doc.querySelector(rootEl).scrollTop : doc.documentElement.scrollTop || doc.body.parentNode.scrollTop || doc.body.scrollTop;
      var scrollHeight = rootEl ? doc.querySelector(rootEl).scrollHeight : doc.documentElement.scrollHeight || doc.body.parentNode.scrollHeight || doc.body.scrollHeight;
      return {
        scrollTop: scrollTop,
        scrollHeight: scrollHeight
      };
    }
  }, {
    key: "_getElemsViewState",
    value: function _getElemsViewState(targets) {
      var elemsInView = [];
      var elemsOutView = [];
      var viewStatusList = [];
      var targetItems = targets ? targets : this.state.targetItems;
      var hasInViewAlready = false;

      for (var i = 0, max = targetItems.length; i < max; i++) {
        var currentContent = targetItems[i];
        var isInView = hasInViewAlready ? false : this._isInView(currentContent);

        if (isInView) {
          hasInViewAlready = true;
          elemsInView.push(currentContent);
        } else {
          elemsOutView.push(currentContent);
        }

        var isLastItem = i === max - 1;

        var isScrolled = this._isScrolled(); // https://github.com/makotot/react-scrollspy/pull/26#issue-167413769


        var isLastShortItemAtBottom = this._isAtBottom() && this._isInView(currentContent) && !isInView && isLastItem && isScrolled;

        if (isLastShortItemAtBottom) {
          elemsOutView.pop();
          elemsOutView.push.apply(elemsOutView, (0, _toConsumableArray2.default)(elemsInView));
          elemsInView = [currentContent];
          viewStatusList = this._fillArray(viewStatusList, false);
          isInView = true;
        }

        viewStatusList.push(isInView);
      }

      return {
        inView: elemsInView,
        outView: elemsOutView,
        viewStatusList: viewStatusList,
        scrolledPast: this.props.scrolledPastClassName && this._getScrolledPast(viewStatusList)
      };
    }
  }, {
    key: "_isInView",
    value: function _isInView(el) {
      if (!el) {
        return false;
      }

      var _this$props = this.props,
          rootEl = _this$props.rootEl,
          offset = _this$props.offset;
      var rootRect;

      if (rootEl) {
        rootRect = document.querySelector(rootEl).getBoundingClientRect();
      }

      var rect = el.getBoundingClientRect();
      var winH = rootEl ? rootRect.height : window.innerHeight;

      var _this$_getScrollDimen = this._getScrollDimension(),
          scrollTop = _this$_getScrollDimen.scrollTop;

      var scrollBottom = scrollTop + winH;
      var elTop = rootEl ? rect.top + scrollTop - rootRect.top + offset : rect.top + scrollTop + offset;
      var elBottom = elTop + el.offsetHeight;
      return elTop < scrollBottom && elBottom > scrollTop;
    }
  }, {
    key: "_isAtBottom",
    value: function _isAtBottom() {
      var rootEl = this.props.rootEl;

      var _this$_getScrollDimen2 = this._getScrollDimension(),
          scrollTop = _this$_getScrollDimen2.scrollTop,
          scrollHeight = _this$_getScrollDimen2.scrollHeight;

      var winH = rootEl ? document.querySelector(rootEl).getBoundingClientRect().height : window.innerHeight;
      var scrolledToBottom = scrollTop + winH >= scrollHeight;
      return scrolledToBottom;
    }
  }, {
    key: "_getScrolledPast",
    value: function _getScrolledPast(viewStatusList) {
      if (!viewStatusList.some(function (item) {
        return item;
      })) {
        return viewStatusList;
      }

      var hasFoundInView = false;
      var scrolledPastItems = viewStatusList.map(function (item) {
        if (item && !hasFoundInView) {
          hasFoundInView = true;
          return false;
        }

        return !hasFoundInView;
      });
      return scrolledPastItems;
    }
  }, {
    key: "_spy",
    value: function _spy(targets) {
      var _this2 = this;

      var elemensViewState = this._getElemsViewState(targets);

      var currentStatuses = this.state.inViewState;
      this.setState({
        inViewState: elemensViewState.viewStatusList,
        isScrolledPast: elemensViewState.scrolledPast
      }, function () {
        _this2._update(currentStatuses);
      });
    }
  }, {
    key: "_update",
    value: function _update(prevStatuses) {
      if (isEqualArray(this.state.inViewState, prevStatuses)) {
        return;
      }

      this.props.onUpdate(this.state.targetItems[this.state.inViewState.indexOf(true)]);
    }
  }, {
    key: "_handleSpy",
    value: function _handleSpy() {
      (0, _throttle.default)(this._spy(), 100);
    }
  }, {
    key: "_initFromProps",
    value: function _initFromProps() {
      var targetItems = this._initSpyTarget(this.props.items);

      this.setState({
        targetItems: targetItems
      });

      this._spy(targetItems);
    }
  }, {
    key: "offEvent",
    value: function offEvent() {
      var el = this.props.rootEl ? document.querySelector(this.props.rootEl) : window;
      el.removeEventListener('scroll', this._handleSpy);
    }
  }, {
    key: "onEvent",
    value: function onEvent() {
      var el = this.props.rootEl ? document.querySelector(this.props.rootEl) : window;
      el.addEventListener('scroll', this._handleSpy);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._initFromProps();

      this.onEvent();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.offEvent();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps() {
      this._initFromProps();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var Tag = this.props.componentTag;
      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className,
          scrolledPastClassName = _this$props2.scrolledPastClassName,
          style = _this$props2.style;
      var counter = 0;

      var items = _react.default.Children.map(children, function (child, idx) {
        var _classNames;

        if (!child) {
          return null;
        }

        var ChildTag = child.type;
        var isScrolledPast = scrolledPastClassName && _this3.state.isScrolledPast[idx];
        var childClass = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(child.props.className), child.props.className), (0, _defineProperty2.default)(_classNames, "".concat(_this3.props.currentClassName), _this3.state.inViewState[idx]), (0, _defineProperty2.default)(_classNames, "".concat(_this3.props.scrolledPastClassName), isScrolledPast), _classNames));
        return _react.default.createElement(ChildTag, (0, _extends2.default)({}, child.props, {
          className: childClass,
          key: counter++
        }), child.props.children);
      });

      var itemClass = (0, _classnames.default)((0, _defineProperty2.default)({}, "".concat(className), className));
      return _react.default.createElement(Tag, {
        className: itemClass,
        style: style
      }, items);
    }
  }]);
  return Scrollspy;
}(_react.default.Component);

exports.default = Scrollspy;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc2Nyb2xsc3B5L2xpYi90aHJvdHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc2Nyb2xsc3B5L2xpYi9zY3JvbGxzcHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQjs7Ozs7Ozs7Ozs7OztBQzdCYTs7QUFFYiw2QkFBNkIsbUJBQU8sQ0FBQywwREFBOEM7O0FBRW5GO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUEsdUNBQXVDLG1CQUFPLENBQUMsNENBQWdDOztBQUUvRSw4Q0FBOEMsbUJBQU8sQ0FBQyxtREFBdUM7O0FBRTdGLGlEQUFpRCxtQkFBTyxDQUFDLHNEQUEwQzs7QUFFbkcsOENBQThDLG1CQUFPLENBQUMsbURBQXVDOztBQUU3Rix5REFBeUQsbUJBQU8sQ0FBQyw4REFBa0Q7O0FBRW5ILDhDQUE4QyxtQkFBTyxDQUFDLG1EQUF1Qzs7QUFFN0YscURBQXFELG1CQUFPLENBQUMsMERBQThDOztBQUUzRywyQ0FBMkMsbUJBQU8sQ0FBQyxnREFBb0M7O0FBRXZGLHdDQUF3QyxtQkFBTyxDQUFDLDZDQUFpQzs7QUFFakYsd0NBQXdDLG1CQUFPLENBQUMsd0JBQVk7O0FBRTVELG9DQUFvQyxtQkFBTyxDQUFDLG1CQUFPOztBQUVuRCx5Q0FBeUMsbUJBQU8sQ0FBQyx3QkFBWTs7QUFFN0QsdUNBQXVDLG1CQUFPLENBQUMsd0JBQVk7O0FBRTNEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLOztBQUVMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDLFNBQVM7QUFDbEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0NBQStDLFNBQVM7QUFDeEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQSw0Q0FBNEM7OztBQUc1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRSwrRUFBK0U7QUFDL0U7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQLCtFQUErRTtBQUMvRTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVELDRCIiwiZmlsZSI6Im5wbS5yZWFjdC1zY3JvbGxzcHkuNmU4YjY3YjhkOTVkMTg5MDc4ZjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIHRocm90dGxlID0gZnVuY3Rpb24gdGhyb3R0bGUoZm4pIHtcbiAgdmFyIHRocmVzaG9sZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMTAwO1xuICB2YXIgbGFzdDtcbiAgdmFyIHRpbWVyO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBub3cgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgdGltZVBhc3NlZCA9ICEhbGFzdCAmJiBub3cgPCBsYXN0ICsgdGhyZXNob2xkO1xuXG4gICAgaWYgKHRpbWVQYXNzZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICBmbigpO1xuICAgICAgfSwgdGhyZXNob2xkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdCA9IG5vdztcbiAgICAgIGZuKCk7XG4gICAgfVxuICB9O1xufTtcblxudmFyIF9kZWZhdWx0ID0gdGhyb3R0bGU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfZXh0ZW5kczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2V4dGVuZHNcIikpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHlcIikpO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXlcIikpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCIpKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mXCIpKTtcblxudmFyIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX3Byb3BUeXBlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInByb3AtdHlwZXNcIikpO1xuXG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuXG52YXIgX2NsYXNzbmFtZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJjbGFzc25hbWVzXCIpKTtcblxudmFyIF90aHJvdHRsZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdGhyb3R0bGVcIikpO1xuXG5mdW5jdGlvbiBpc0VxdWFsQXJyYXkoYSwgYikge1xuICByZXR1cm4gYS5sZW5ndGggPT09IGIubGVuZ3RoICYmIGEuZXZlcnkoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgcmV0dXJuIGl0ZW0gPT09IGJbaW5kZXhdO1xuICB9KTtcbn1cblxudmFyIFNjcm9sbHNweSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAoMCwgX2luaGVyaXRzMi5kZWZhdWx0KShTY3JvbGxzcHksIF9SZWFjdCRDb21wb25lbnQpO1xuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShTY3JvbGxzcHksIG51bGwsIFt7XG4gICAga2V5OiBcInByb3BUeXBlc1wiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXRlbXM6IF9wcm9wVHlwZXMuZGVmYXVsdC5hcnJheU9mKF9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmcpLmlzUmVxdWlyZWQsXG4gICAgICAgIGN1cnJlbnRDbGFzc05hbWU6IF9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgc2Nyb2xsZWRQYXN0Q2xhc3NOYW1lOiBfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nLFxuICAgICAgICBzdHlsZTogX3Byb3BUeXBlcy5kZWZhdWx0Lm9iamVjdCxcbiAgICAgICAgY29tcG9uZW50VGFnOiBfcHJvcFR5cGVzLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzLmRlZmF1bHQuZWxlbWVudF0pLFxuICAgICAgICBvZmZzZXQ6IF9wcm9wVHlwZXMuZGVmYXVsdC5udW1iZXIsXG4gICAgICAgIHJvb3RFbDogX3Byb3BUeXBlcy5kZWZhdWx0LnN0cmluZyxcbiAgICAgICAgb25VcGRhdGU6IF9wcm9wVHlwZXMuZGVmYXVsdC5mdW5jXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWZhdWx0UHJvcHNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgY3VycmVudENsYXNzTmFtZTogJycsXG4gICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgY29tcG9uZW50VGFnOiAndWwnLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZSgpIHt9XG4gICAgICB9O1xuICAgIH1cbiAgfV0pO1xuXG4gIGZ1bmN0aW9uIFNjcm9sbHNweShwcm9wcykge1xuICAgIHZhciBfdGhpcztcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIFNjcm9sbHNweSk7XG4gICAgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yLmRlZmF1bHQpKHRoaXMsICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKFNjcm9sbHNweSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgdGFyZ2V0SXRlbXM6IFtdLFxuICAgICAgaW5WaWV3U3RhdGU6IFtdLFxuICAgICAgaXNTY3JvbGxlZFBhc3Q6IFtdIC8vIG1hbnVhbGx5IGJpbmQgYXMgRVM2IGRvZXMgbm90IGFwcGx5IHRoaXNcbiAgICAgIC8vIGF1dG8gYmluZGluZyBhcyBSZWFjdC5jcmVhdGVDbGFzcyBkb2VzXG5cbiAgICB9O1xuICAgIF90aGlzLl9oYW5kbGVTcHkgPSBfdGhpcy5faGFuZGxlU3B5LmJpbmQoKDAsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyLmRlZmF1bHQpKF90aGlzKSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoU2Nyb2xsc3B5LCBbe1xuICAgIGtleTogXCJfaW5pdFNweVRhcmdldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaW5pdFNweVRhcmdldChpdGVtcykge1xuICAgICAgdmFyIHRhcmdldEl0ZW1zID0gaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRhcmdldEl0ZW1zO1xuICAgIH0gLy8gaHR0cHM6Ly9naXRodWIuY29tL21ha290b3QvcmVhY3Qtc2Nyb2xsc3B5L3B1bGwvNDVcblxuICB9LCB7XG4gICAga2V5OiBcIl9maWxsQXJyYXlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ZpbGxBcnJheShhcnJheSwgdmFsKSB7XG4gICAgICB2YXIgbmV3QXJyYXkgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIG1heCA9IGFycmF5Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICAgIG5ld0FycmF5W2ldID0gdmFsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9pc1Njcm9sbGVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9pc1Njcm9sbGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2dldFNjcm9sbERpbWVuc2lvbigpLnNjcm9sbFRvcCA+IDA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9nZXRTY3JvbGxEaW1lbnNpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFNjcm9sbERpbWVuc2lvbigpIHtcbiAgICAgIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgICAgIHZhciByb290RWwgPSB0aGlzLnByb3BzLnJvb3RFbDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSByb290RWwgPyBkb2MucXVlcnlTZWxlY3Rvcihyb290RWwpLnNjcm9sbFRvcCA6IGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvYy5ib2R5LnBhcmVudE5vZGUuc2Nyb2xsVG9wIHx8IGRvYy5ib2R5LnNjcm9sbFRvcDtcbiAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSByb290RWwgPyBkb2MucXVlcnlTZWxlY3Rvcihyb290RWwpLnNjcm9sbEhlaWdodCA6IGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IHx8IGRvYy5ib2R5LnBhcmVudE5vZGUuc2Nyb2xsSGVpZ2h0IHx8IGRvYy5ib2R5LnNjcm9sbEhlaWdodDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICBzY3JvbGxIZWlnaHQ6IHNjcm9sbEhlaWdodFxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2dldEVsZW1zVmlld1N0YXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRFbGVtc1ZpZXdTdGF0ZSh0YXJnZXRzKSB7XG4gICAgICB2YXIgZWxlbXNJblZpZXcgPSBbXTtcbiAgICAgIHZhciBlbGVtc091dFZpZXcgPSBbXTtcbiAgICAgIHZhciB2aWV3U3RhdHVzTGlzdCA9IFtdO1xuICAgICAgdmFyIHRhcmdldEl0ZW1zID0gdGFyZ2V0cyA/IHRhcmdldHMgOiB0aGlzLnN0YXRlLnRhcmdldEl0ZW1zO1xuICAgICAgdmFyIGhhc0luVmlld0FscmVhZHkgPSBmYWxzZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIG1heCA9IHRhcmdldEl0ZW1zLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICAgIHZhciBjdXJyZW50Q29udGVudCA9IHRhcmdldEl0ZW1zW2ldO1xuICAgICAgICB2YXIgaXNJblZpZXcgPSBoYXNJblZpZXdBbHJlYWR5ID8gZmFsc2UgOiB0aGlzLl9pc0luVmlldyhjdXJyZW50Q29udGVudCk7XG5cbiAgICAgICAgaWYgKGlzSW5WaWV3KSB7XG4gICAgICAgICAgaGFzSW5WaWV3QWxyZWFkeSA9IHRydWU7XG4gICAgICAgICAgZWxlbXNJblZpZXcucHVzaChjdXJyZW50Q29udGVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbXNPdXRWaWV3LnB1c2goY3VycmVudENvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlzTGFzdEl0ZW0gPSBpID09PSBtYXggLSAxO1xuXG4gICAgICAgIHZhciBpc1Njcm9sbGVkID0gdGhpcy5faXNTY3JvbGxlZCgpOyAvLyBodHRwczovL2dpdGh1Yi5jb20vbWFrb3RvdC9yZWFjdC1zY3JvbGxzcHkvcHVsbC8yNiNpc3N1ZS0xNjc0MTM3NjlcblxuXG4gICAgICAgIHZhciBpc0xhc3RTaG9ydEl0ZW1BdEJvdHRvbSA9IHRoaXMuX2lzQXRCb3R0b20oKSAmJiB0aGlzLl9pc0luVmlldyhjdXJyZW50Q29udGVudCkgJiYgIWlzSW5WaWV3ICYmIGlzTGFzdEl0ZW0gJiYgaXNTY3JvbGxlZDtcblxuICAgICAgICBpZiAoaXNMYXN0U2hvcnRJdGVtQXRCb3R0b20pIHtcbiAgICAgICAgICBlbGVtc091dFZpZXcucG9wKCk7XG4gICAgICAgICAgZWxlbXNPdXRWaWV3LnB1c2guYXBwbHkoZWxlbXNPdXRWaWV3LCAoMCwgX3RvQ29uc3VtYWJsZUFycmF5Mi5kZWZhdWx0KShlbGVtc0luVmlldykpO1xuICAgICAgICAgIGVsZW1zSW5WaWV3ID0gW2N1cnJlbnRDb250ZW50XTtcbiAgICAgICAgICB2aWV3U3RhdHVzTGlzdCA9IHRoaXMuX2ZpbGxBcnJheSh2aWV3U3RhdHVzTGlzdCwgZmFsc2UpO1xuICAgICAgICAgIGlzSW5WaWV3ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpZXdTdGF0dXNMaXN0LnB1c2goaXNJblZpZXcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpblZpZXc6IGVsZW1zSW5WaWV3LFxuICAgICAgICBvdXRWaWV3OiBlbGVtc091dFZpZXcsXG4gICAgICAgIHZpZXdTdGF0dXNMaXN0OiB2aWV3U3RhdHVzTGlzdCxcbiAgICAgICAgc2Nyb2xsZWRQYXN0OiB0aGlzLnByb3BzLnNjcm9sbGVkUGFzdENsYXNzTmFtZSAmJiB0aGlzLl9nZXRTY3JvbGxlZFBhc3Qodmlld1N0YXR1c0xpc3QpXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfaXNJblZpZXdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2lzSW5WaWV3KGVsKSB7XG4gICAgICBpZiAoIWVsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIF90aGlzJHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICByb290RWwgPSBfdGhpcyRwcm9wcy5yb290RWwsXG4gICAgICAgICAgb2Zmc2V0ID0gX3RoaXMkcHJvcHMub2Zmc2V0O1xuICAgICAgdmFyIHJvb3RSZWN0O1xuXG4gICAgICBpZiAocm9vdEVsKSB7XG4gICAgICAgIHJvb3RSZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290RWwpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIHdpbkggPSByb290RWwgPyByb290UmVjdC5oZWlnaHQgOiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgIHZhciBfdGhpcyRfZ2V0U2Nyb2xsRGltZW4gPSB0aGlzLl9nZXRTY3JvbGxEaW1lbnNpb24oKSxcbiAgICAgICAgICBzY3JvbGxUb3AgPSBfdGhpcyRfZ2V0U2Nyb2xsRGltZW4uc2Nyb2xsVG9wO1xuXG4gICAgICB2YXIgc2Nyb2xsQm90dG9tID0gc2Nyb2xsVG9wICsgd2luSDtcbiAgICAgIHZhciBlbFRvcCA9IHJvb3RFbCA/IHJlY3QudG9wICsgc2Nyb2xsVG9wIC0gcm9vdFJlY3QudG9wICsgb2Zmc2V0IDogcmVjdC50b3AgKyBzY3JvbGxUb3AgKyBvZmZzZXQ7XG4gICAgICB2YXIgZWxCb3R0b20gPSBlbFRvcCArIGVsLm9mZnNldEhlaWdodDtcbiAgICAgIHJldHVybiBlbFRvcCA8IHNjcm9sbEJvdHRvbSAmJiBlbEJvdHRvbSA+IHNjcm9sbFRvcDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2lzQXRCb3R0b21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2lzQXRCb3R0b20oKSB7XG4gICAgICB2YXIgcm9vdEVsID0gdGhpcy5wcm9wcy5yb290RWw7XG5cbiAgICAgIHZhciBfdGhpcyRfZ2V0U2Nyb2xsRGltZW4yID0gdGhpcy5fZ2V0U2Nyb2xsRGltZW5zaW9uKCksXG4gICAgICAgICAgc2Nyb2xsVG9wID0gX3RoaXMkX2dldFNjcm9sbERpbWVuMi5zY3JvbGxUb3AsXG4gICAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gX3RoaXMkX2dldFNjcm9sbERpbWVuMi5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgIHZhciB3aW5IID0gcm9vdEVsID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290RWwpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCA6IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIHZhciBzY3JvbGxlZFRvQm90dG9tID0gc2Nyb2xsVG9wICsgd2luSCA+PSBzY3JvbGxIZWlnaHQ7XG4gICAgICByZXR1cm4gc2Nyb2xsZWRUb0JvdHRvbTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2dldFNjcm9sbGVkUGFzdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0U2Nyb2xsZWRQYXN0KHZpZXdTdGF0dXNMaXN0KSB7XG4gICAgICBpZiAoIXZpZXdTdGF0dXNMaXN0LnNvbWUoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9KSkge1xuICAgICAgICByZXR1cm4gdmlld1N0YXR1c0xpc3Q7XG4gICAgICB9XG5cbiAgICAgIHZhciBoYXNGb3VuZEluVmlldyA9IGZhbHNlO1xuICAgICAgdmFyIHNjcm9sbGVkUGFzdEl0ZW1zID0gdmlld1N0YXR1c0xpc3QubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtICYmICFoYXNGb3VuZEluVmlldykge1xuICAgICAgICAgIGhhc0ZvdW5kSW5WaWV3ID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gIWhhc0ZvdW5kSW5WaWV3O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gc2Nyb2xsZWRQYXN0SXRlbXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9zcHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NweSh0YXJnZXRzKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIGVsZW1lbnNWaWV3U3RhdGUgPSB0aGlzLl9nZXRFbGVtc1ZpZXdTdGF0ZSh0YXJnZXRzKTtcblxuICAgICAgdmFyIGN1cnJlbnRTdGF0dXNlcyA9IHRoaXMuc3RhdGUuaW5WaWV3U3RhdGU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaW5WaWV3U3RhdGU6IGVsZW1lbnNWaWV3U3RhdGUudmlld1N0YXR1c0xpc3QsXG4gICAgICAgIGlzU2Nyb2xsZWRQYXN0OiBlbGVtZW5zVmlld1N0YXRlLnNjcm9sbGVkUGFzdFxuICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczIuX3VwZGF0ZShjdXJyZW50U3RhdHVzZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl91cGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZShwcmV2U3RhdHVzZXMpIHtcbiAgICAgIGlmIChpc0VxdWFsQXJyYXkodGhpcy5zdGF0ZS5pblZpZXdTdGF0ZSwgcHJldlN0YXR1c2VzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJvcHMub25VcGRhdGUodGhpcy5zdGF0ZS50YXJnZXRJdGVtc1t0aGlzLnN0YXRlLmluVmlld1N0YXRlLmluZGV4T2YodHJ1ZSldKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2hhbmRsZVNweVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlU3B5KCkge1xuICAgICAgKDAsIF90aHJvdHRsZS5kZWZhdWx0KSh0aGlzLl9zcHkoKSwgMTAwKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2luaXRGcm9tUHJvcHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2luaXRGcm9tUHJvcHMoKSB7XG4gICAgICB2YXIgdGFyZ2V0SXRlbXMgPSB0aGlzLl9pbml0U3B5VGFyZ2V0KHRoaXMucHJvcHMuaXRlbXMpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdGFyZ2V0SXRlbXM6IHRhcmdldEl0ZW1zXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fc3B5KHRhcmdldEl0ZW1zKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib2ZmRXZlbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmRXZlbnQoKSB7XG4gICAgICB2YXIgZWwgPSB0aGlzLnByb3BzLnJvb3RFbCA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wcm9wcy5yb290RWwpIDogd2luZG93O1xuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5faGFuZGxlU3B5KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25FdmVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkV2ZW50KCkge1xuICAgICAgdmFyIGVsID0gdGhpcy5wcm9wcy5yb290RWwgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucHJvcHMucm9vdEVsKSA6IHdpbmRvdztcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2hhbmRsZVNweSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbXBvbmVudERpZE1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5faW5pdEZyb21Qcm9wcygpO1xuXG4gICAgICB0aGlzLm9uRXZlbnQoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFVubW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLm9mZkV2ZW50KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIlVOU0FGRV9jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIFVOU0FGRV9jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge1xuICAgICAgdGhpcy5faW5pdEZyb21Qcm9wcygpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHZhciBUYWcgPSB0aGlzLnByb3BzLmNvbXBvbmVudFRhZztcbiAgICAgIHZhciBfdGhpcyRwcm9wczIgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGNoaWxkcmVuID0gX3RoaXMkcHJvcHMyLmNoaWxkcmVuLFxuICAgICAgICAgIGNsYXNzTmFtZSA9IF90aGlzJHByb3BzMi5jbGFzc05hbWUsXG4gICAgICAgICAgc2Nyb2xsZWRQYXN0Q2xhc3NOYW1lID0gX3RoaXMkcHJvcHMyLnNjcm9sbGVkUGFzdENsYXNzTmFtZSxcbiAgICAgICAgICBzdHlsZSA9IF90aGlzJHByb3BzMi5zdHlsZTtcbiAgICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgICAgdmFyIGl0ZW1zID0gX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQsIGlkeCkge1xuICAgICAgICB2YXIgX2NsYXNzTmFtZXM7XG5cbiAgICAgICAgaWYgKCFjaGlsZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIENoaWxkVGFnID0gY2hpbGQudHlwZTtcbiAgICAgICAgdmFyIGlzU2Nyb2xsZWRQYXN0ID0gc2Nyb2xsZWRQYXN0Q2xhc3NOYW1lICYmIF90aGlzMy5zdGF0ZS5pc1Njcm9sbGVkUGFzdFtpZHhdO1xuICAgICAgICB2YXIgY2hpbGRDbGFzcyA9ICgwLCBfY2xhc3NuYW1lcy5kZWZhdWx0KSgoX2NsYXNzTmFtZXMgPSB7fSwgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkoX2NsYXNzTmFtZXMsIFwiXCIuY29uY2F0KGNoaWxkLnByb3BzLmNsYXNzTmFtZSksIGNoaWxkLnByb3BzLmNsYXNzTmFtZSksICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKF9jbGFzc05hbWVzLCBcIlwiLmNvbmNhdChfdGhpczMucHJvcHMuY3VycmVudENsYXNzTmFtZSksIF90aGlzMy5zdGF0ZS5pblZpZXdTdGF0ZVtpZHhdKSwgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkoX2NsYXNzTmFtZXMsIFwiXCIuY29uY2F0KF90aGlzMy5wcm9wcy5zY3JvbGxlZFBhc3RDbGFzc05hbWUpLCBpc1Njcm9sbGVkUGFzdCksIF9jbGFzc05hbWVzKSk7XG4gICAgICAgIHJldHVybiBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KENoaWxkVGFnLCAoMCwgX2V4dGVuZHMyLmRlZmF1bHQpKHt9LCBjaGlsZC5wcm9wcywge1xuICAgICAgICAgIGNsYXNzTmFtZTogY2hpbGRDbGFzcyxcbiAgICAgICAgICBrZXk6IGNvdW50ZXIrK1xuICAgICAgICB9KSwgY2hpbGQucHJvcHMuY2hpbGRyZW4pO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBpdGVtQ2xhc3MgPSAoMCwgX2NsYXNzbmFtZXMuZGVmYXVsdCkoKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkoe30sIFwiXCIuY29uY2F0KGNsYXNzTmFtZSksIGNsYXNzTmFtZSkpO1xuICAgICAgcmV0dXJuIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVGFnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogaXRlbUNsYXNzLFxuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0sIGl0ZW1zKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNjcm9sbHNweTtcbn0oX3JlYWN0LmRlZmF1bHQuQ29tcG9uZW50KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2Nyb2xsc3B5OyJdLCJzb3VyY2VSb290IjoiIn0=
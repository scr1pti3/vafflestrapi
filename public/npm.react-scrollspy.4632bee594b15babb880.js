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

var Scrollspy = /*#__PURE__*/function (_React$Component) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc2Nyb2xsc3B5L2xpYi90aHJvdHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc2Nyb2xsc3B5L2xpYi9zY3JvbGxzcHkuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0IiwidGhyb3R0bGUiLCJmbiIsInRocmVzaG9sZCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImxhc3QiLCJ0aW1lciIsIm5vdyIsIkRhdGUiLCJ0aW1lUGFzc2VkIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIl9kZWZhdWx0IiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfZXh0ZW5kczIiLCJfZGVmaW5lUHJvcGVydHkyIiwiX3RvQ29uc3VtYWJsZUFycmF5MiIsIl9jbGFzc0NhbGxDaGVjazIiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIiLCJfZ2V0UHJvdG90eXBlT2YyIiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZDIiLCJfY3JlYXRlQ2xhc3MyIiwiX2luaGVyaXRzMiIsIl9wcm9wVHlwZXMiLCJfcmVhY3QiLCJfY2xhc3NuYW1lcyIsIl90aHJvdHRsZSIsImlzRXF1YWxBcnJheSIsImEiLCJiIiwiZXZlcnkiLCJpdGVtIiwiaW5kZXgiLCJTY3JvbGxzcHkiLCJfUmVhY3QkQ29tcG9uZW50Iiwia2V5IiwiZ2V0IiwiaXRlbXMiLCJhcnJheU9mIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImN1cnJlbnRDbGFzc05hbWUiLCJzY3JvbGxlZFBhc3RDbGFzc05hbWUiLCJzdHlsZSIsIm9iamVjdCIsImNvbXBvbmVudFRhZyIsIm9uZU9mVHlwZSIsImVsZW1lbnQiLCJvZmZzZXQiLCJudW1iZXIiLCJyb290RWwiLCJvblVwZGF0ZSIsImZ1bmMiLCJwcm9wcyIsIl90aGlzIiwiY2FsbCIsInN0YXRlIiwidGFyZ2V0SXRlbXMiLCJpblZpZXdTdGF0ZSIsImlzU2Nyb2xsZWRQYXN0IiwiX2hhbmRsZVNweSIsImJpbmQiLCJfaW5pdFNweVRhcmdldCIsIm1hcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJfZmlsbEFycmF5IiwiYXJyYXkiLCJ2YWwiLCJuZXdBcnJheSIsImkiLCJtYXgiLCJfaXNTY3JvbGxlZCIsIl9nZXRTY3JvbGxEaW1lbnNpb24iLCJzY3JvbGxUb3AiLCJkb2MiLCJxdWVyeVNlbGVjdG9yIiwiZG9jdW1lbnRFbGVtZW50IiwiYm9keSIsInBhcmVudE5vZGUiLCJzY3JvbGxIZWlnaHQiLCJfZ2V0RWxlbXNWaWV3U3RhdGUiLCJ0YXJnZXRzIiwiZWxlbXNJblZpZXciLCJlbGVtc091dFZpZXciLCJ2aWV3U3RhdHVzTGlzdCIsImhhc0luVmlld0FscmVhZHkiLCJjdXJyZW50Q29udGVudCIsImlzSW5WaWV3IiwiX2lzSW5WaWV3IiwicHVzaCIsImlzTGFzdEl0ZW0iLCJpc1Njcm9sbGVkIiwiaXNMYXN0U2hvcnRJdGVtQXRCb3R0b20iLCJfaXNBdEJvdHRvbSIsInBvcCIsImFwcGx5IiwiaW5WaWV3Iiwib3V0VmlldyIsInNjcm9sbGVkUGFzdCIsIl9nZXRTY3JvbGxlZFBhc3QiLCJlbCIsIl90aGlzJHByb3BzIiwicm9vdFJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyZWN0Iiwid2luSCIsImhlaWdodCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiX3RoaXMkX2dldFNjcm9sbERpbWVuIiwic2Nyb2xsQm90dG9tIiwiZWxUb3AiLCJ0b3AiLCJlbEJvdHRvbSIsIm9mZnNldEhlaWdodCIsIl90aGlzJF9nZXRTY3JvbGxEaW1lbjIiLCJzY3JvbGxlZFRvQm90dG9tIiwic29tZSIsImhhc0ZvdW5kSW5WaWV3Iiwic2Nyb2xsZWRQYXN0SXRlbXMiLCJfc3B5IiwiX3RoaXMyIiwiZWxlbWVuc1ZpZXdTdGF0ZSIsImN1cnJlbnRTdGF0dXNlcyIsInNldFN0YXRlIiwiX3VwZGF0ZSIsInByZXZTdGF0dXNlcyIsImluZGV4T2YiLCJfaW5pdEZyb21Qcm9wcyIsIm9mZkV2ZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsIlVOU0FGRV9jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwicmVuZGVyIiwiX3RoaXMzIiwiVGFnIiwiX3RoaXMkcHJvcHMyIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJjb3VudGVyIiwiQ2hpbGRyZW4iLCJjaGlsZCIsImlkeCIsIl9jbGFzc05hbWVzIiwiQ2hpbGRUYWciLCJ0eXBlIiwiY2hpbGRDbGFzcyIsImNvbmNhdCIsImNyZWF0ZUVsZW1lbnQiLCJpdGVtQ2xhc3MiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWJBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUNFLE9BQVIsR0FBa0IsS0FBSyxDQUF2Qjs7QUFFQSxJQUFJQyxRQUFRLEdBQUcsU0FBU0EsUUFBVCxDQUFrQkMsRUFBbEIsRUFBc0I7QUFDbkMsTUFBSUMsU0FBUyxHQUFHQyxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0JELFNBQVMsQ0FBQyxDQUFELENBQVQsS0FBaUJFLFNBQXpDLEdBQXFERixTQUFTLENBQUMsQ0FBRCxDQUE5RCxHQUFvRSxHQUFwRjtBQUNBLE1BQUlHLElBQUo7QUFDQSxNQUFJQyxLQUFKO0FBQ0EsU0FBTyxZQUFZO0FBQ2pCLFFBQUlDLEdBQUcsR0FBRyxDQUFDLElBQUlDLElBQUosRUFBWDtBQUNBLFFBQUlDLFVBQVUsR0FBRyxDQUFDLENBQUNKLElBQUYsSUFBVUUsR0FBRyxHQUFHRixJQUFJLEdBQUdKLFNBQXhDOztBQUVBLFFBQUlRLFVBQUos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NkJKLFFBQTdCLEVBQXVDLENBQUMsR0FBR3RJLFNBQVMsQ0FBQ2pCLE9BQWQsRUFBdUIsRUFBdkIsRUFBMkJvSixLQUFLLENBQUM1RixLQUFqQyxFQUF3QztBQUNwRnlGLG1CQUFTLEVBQUVRLFVBRHlFO0FBRXBGbkgsYUFBRyxFQUFFNEcsT0FBTztBQUZ3RSxTQUF4QyxDQUF2QyxFQUdIRSxLQUFLLENBQUM1RixLQUFOLENBQVl3RixRQUhULENBQVA7QUFJRCxPQWRXLENBQVo7O0FBZ0JBLFVBQUlZLFNBQVMsR0FBRyxDQUFDLEdBQUdoSSxXQUFXLENBQUM1QixPQUFoQixFQUF5QixDQUFDLEdBQUdrQixnQkFBZ0IsQ0FBQ2xCLE9BQXJCLEVBQThCLEVBQTlCLEVBQWtDLEdBQUcwSixNQUFILENBQVVULFNBQVYsQ0FBbEMsRUFBd0RBLFNBQXhELENBQXpCLENBQWhCO0FBQ0EsYUFBT3RILE1BQU0sQ0FBQzNCLE9BQVAsQ0FBZTJKLGFBQWYsQ0FBNkJiLEdBQTdCLEVBQWtDO0FBQ3ZDRyxpQkFBUyxFQUFFVyxTQUQ0QjtBQUV2QzlHLGFBQUssRUFBRUE7QUFGZ0MsT0FBbEMsRUFHSk4sS0FISSxDQUFQO0FBSUQ7QUFsQ0EsR0FuTm1DLENBQXRDO0FBdVBBLFNBQU9KLFNBQVA7QUFDRCxDQXRTRCxDQXNTRVQsTUFBTSxDQUFDM0IsT0FBUCxDQUFlNkosU0F0U2pCLENBRkE7O0FBMFNBL0osT0FBTyxDQUFDRSxPQUFSLEdBQWtCb0MsU0FBbEIsQyIsImZpbGUiOiJucG0ucmVhY3Qtc2Nyb2xsc3B5LjQ2MzJiZWU1OTRiMTViYWJiODgwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciB0aHJvdHRsZSA9IGZ1bmN0aW9uIHRocm90dGxlKGZuKSB7XG4gIHZhciB0aHJlc2hvbGQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDEwMDtcbiAgdmFyIGxhc3Q7XG4gIHZhciB0aW1lcjtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbm93ID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIHRpbWVQYXNzZWQgPSAhIWxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaG9sZDtcblxuICAgIGlmICh0aW1lUGFzc2VkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGFzdCA9IG5vdztcbiAgICAgICAgZm4oKTtcbiAgICAgIH0sIHRocmVzaG9sZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3QgPSBub3c7XG4gICAgICBmbigpO1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBfZGVmYXVsdCA9IHRocm90dGxlO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX2V4dGVuZHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzXCIpKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCIpKTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5XCIpKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVyblwiKSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZlwiKSk7XG5cbnZhciBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9pbmhlcml0czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpKTtcblxudmFyIF9wcm9wVHlwZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpKTtcblxudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcblxudmFyIF9jbGFzc25hbWVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiY2xhc3NuYW1lc1wiKSk7XG5cbnZhciBfdGhyb3R0bGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3Rocm90dGxlXCIpKTtcblxuZnVuY3Rpb24gaXNFcXVhbEFycmF5KGEsIGIpIHtcbiAgcmV0dXJuIGEubGVuZ3RoID09PSBiLmxlbmd0aCAmJiBhLmV2ZXJ5KGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgIHJldHVybiBpdGVtID09PSBiW2luZGV4XTtcbiAgfSk7XG59XG5cbnZhciBTY3JvbGxzcHkgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgKDAsIF9pbmhlcml0czIuZGVmYXVsdCkoU2Nyb2xsc3B5LCBfUmVhY3QkQ29tcG9uZW50KTtcbiAgKDAsIF9jcmVhdGVDbGFzczIuZGVmYXVsdCkoU2Nyb2xsc3B5LCBudWxsLCBbe1xuICAgIGtleTogXCJwcm9wVHlwZXNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGl0ZW1zOiBfcHJvcFR5cGVzLmRlZmF1bHQuYXJyYXlPZihfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nKS5pc1JlcXVpcmVkLFxuICAgICAgICBjdXJyZW50Q2xhc3NOYW1lOiBfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIHNjcm9sbGVkUGFzdENsYXNzTmFtZTogX3Byb3BUeXBlcy5kZWZhdWx0LnN0cmluZyxcbiAgICAgICAgc3R5bGU6IF9wcm9wVHlwZXMuZGVmYXVsdC5vYmplY3QsXG4gICAgICAgIGNvbXBvbmVudFRhZzogX3Byb3BUeXBlcy5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlcy5kZWZhdWx0LnN0cmluZywgX3Byb3BUeXBlcy5kZWZhdWx0LmVsZW1lbnRdKSxcbiAgICAgICAgb2Zmc2V0OiBfcHJvcFR5cGVzLmRlZmF1bHQubnVtYmVyLFxuICAgICAgICByb290RWw6IF9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmcsXG4gICAgICAgIG9uVXBkYXRlOiBfcHJvcFR5cGVzLmRlZmF1bHQuZnVuY1xuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVmYXVsdFByb3BzXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIGN1cnJlbnRDbGFzc05hbWU6ICcnLFxuICAgICAgICBzdHlsZToge30sXG4gICAgICAgIGNvbXBvbmVudFRhZzogJ3VsJyxcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24gb25VcGRhdGUoKSB7fVxuICAgICAgfTtcbiAgICB9XG4gIH1dKTtcblxuICBmdW5jdGlvbiBTY3JvbGxzcHkocHJvcHMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMi5kZWZhdWx0KSh0aGlzLCBTY3JvbGxzcHkpO1xuICAgIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMi5kZWZhdWx0KSh0aGlzLCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShTY3JvbGxzcHkpLmNhbGwodGhpcywgcHJvcHMpKTtcbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRhcmdldEl0ZW1zOiBbXSxcbiAgICAgIGluVmlld1N0YXRlOiBbXSxcbiAgICAgIGlzU2Nyb2xsZWRQYXN0OiBbXSAvLyBtYW51YWxseSBiaW5kIGFzIEVTNiBkb2VzIG5vdCBhcHBseSB0aGlzXG4gICAgICAvLyBhdXRvIGJpbmRpbmcgYXMgUmVhY3QuY3JlYXRlQ2xhc3MgZG9lc1xuXG4gICAgfTtcbiAgICBfdGhpcy5faGFuZGxlU3B5ID0gX3RoaXMuX2hhbmRsZVNweS5iaW5kKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMi5kZWZhdWx0KShfdGhpcykpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKFNjcm9sbHNweSwgW3tcbiAgICBrZXk6IFwiX2luaXRTcHlUYXJnZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2luaXRTcHlUYXJnZXQoaXRlbXMpIHtcbiAgICAgIHZhciB0YXJnZXRJdGVtcyA9IGl0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0YXJnZXRJdGVtcztcbiAgICB9IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYWtvdG90L3JlYWN0LXNjcm9sbHNweS9wdWxsLzQ1XG5cbiAgfSwge1xuICAgIGtleTogXCJfZmlsbEFycmF5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9maWxsQXJyYXkoYXJyYXksIHZhbCkge1xuICAgICAgdmFyIG5ld0FycmF5ID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBtYXggPSBhcnJheS5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgICBuZXdBcnJheVtpXSA9IHZhbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfaXNTY3JvbGxlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaXNTY3JvbGxlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9nZXRTY3JvbGxEaW1lbnNpb24oKS5zY3JvbGxUb3AgPiAwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfZ2V0U2Nyb2xsRGltZW5zaW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRTY3JvbGxEaW1lbnNpb24oKSB7XG4gICAgICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gICAgICB2YXIgcm9vdEVsID0gdGhpcy5wcm9wcy5yb290RWw7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gcm9vdEVsID8gZG9jLnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKS5zY3JvbGxUb3AgOiBkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2MuYm9keS5wYXJlbnROb2RlLnNjcm9sbFRvcCB8fCBkb2MuYm9keS5zY3JvbGxUb3A7XG4gICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gcm9vdEVsID8gZG9jLnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKS5zY3JvbGxIZWlnaHQgOiBkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCB8fCBkb2MuYm9keS5wYXJlbnROb2RlLnNjcm9sbEhlaWdodCB8fCBkb2MuYm9keS5zY3JvbGxIZWlnaHQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgc2Nyb2xsSGVpZ2h0OiBzY3JvbGxIZWlnaHRcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9nZXRFbGVtc1ZpZXdTdGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0RWxlbXNWaWV3U3RhdGUodGFyZ2V0cykge1xuICAgICAgdmFyIGVsZW1zSW5WaWV3ID0gW107XG4gICAgICB2YXIgZWxlbXNPdXRWaWV3ID0gW107XG4gICAgICB2YXIgdmlld1N0YXR1c0xpc3QgPSBbXTtcbiAgICAgIHZhciB0YXJnZXRJdGVtcyA9IHRhcmdldHMgPyB0YXJnZXRzIDogdGhpcy5zdGF0ZS50YXJnZXRJdGVtcztcbiAgICAgIHZhciBoYXNJblZpZXdBbHJlYWR5ID0gZmFsc2U7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBtYXggPSB0YXJnZXRJdGVtcy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgICB2YXIgY3VycmVudENvbnRlbnQgPSB0YXJnZXRJdGVtc1tpXTtcbiAgICAgICAgdmFyIGlzSW5WaWV3ID0gaGFzSW5WaWV3QWxyZWFkeSA/IGZhbHNlIDogdGhpcy5faXNJblZpZXcoY3VycmVudENvbnRlbnQpO1xuXG4gICAgICAgIGlmIChpc0luVmlldykge1xuICAgICAgICAgIGhhc0luVmlld0FscmVhZHkgPSB0cnVlO1xuICAgICAgICAgIGVsZW1zSW5WaWV3LnB1c2goY3VycmVudENvbnRlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1zT3V0Vmlldy5wdXNoKGN1cnJlbnRDb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpc0xhc3RJdGVtID0gaSA9PT0gbWF4IC0gMTtcblxuICAgICAgICB2YXIgaXNTY3JvbGxlZCA9IHRoaXMuX2lzU2Nyb2xsZWQoKTsgLy8gaHR0cHM6Ly9naXRodWIuY29tL21ha290b3QvcmVhY3Qtc2Nyb2xsc3B5L3B1bGwvMjYjaXNzdWUtMTY3NDEzNzY5XG5cblxuICAgICAgICB2YXIgaXNMYXN0U2hvcnRJdGVtQXRCb3R0b20gPSB0aGlzLl9pc0F0Qm90dG9tKCkgJiYgdGhpcy5faXNJblZpZXcoY3VycmVudENvbnRlbnQpICYmICFpc0luVmlldyAmJiBpc0xhc3RJdGVtICYmIGlzU2Nyb2xsZWQ7XG5cbiAgICAgICAgaWYgKGlzTGFzdFNob3J0SXRlbUF0Qm90dG9tKSB7XG4gICAgICAgICAgZWxlbXNPdXRWaWV3LnBvcCgpO1xuICAgICAgICAgIGVsZW1zT3V0Vmlldy5wdXNoLmFwcGx5KGVsZW1zT3V0VmlldywgKDAsIF90b0NvbnN1bWFibGVBcnJheTIuZGVmYXVsdCkoZWxlbXNJblZpZXcpKTtcbiAgICAgICAgICBlbGVtc0luVmlldyA9IFtjdXJyZW50Q29udGVudF07XG4gICAgICAgICAgdmlld1N0YXR1c0xpc3QgPSB0aGlzLl9maWxsQXJyYXkodmlld1N0YXR1c0xpc3QsIGZhbHNlKTtcbiAgICAgICAgICBpc0luVmlldyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2aWV3U3RhdHVzTGlzdC5wdXNoKGlzSW5WaWV3KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5WaWV3OiBlbGVtc0luVmlldyxcbiAgICAgICAgb3V0VmlldzogZWxlbXNPdXRWaWV3LFxuICAgICAgICB2aWV3U3RhdHVzTGlzdDogdmlld1N0YXR1c0xpc3QsXG4gICAgICAgIHNjcm9sbGVkUGFzdDogdGhpcy5wcm9wcy5zY3JvbGxlZFBhc3RDbGFzc05hbWUgJiYgdGhpcy5fZ2V0U2Nyb2xsZWRQYXN0KHZpZXdTdGF0dXNMaXN0KVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2lzSW5WaWV3XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9pc0luVmlldyhlbCkge1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBfdGhpcyRwcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgcm9vdEVsID0gX3RoaXMkcHJvcHMucm9vdEVsLFxuICAgICAgICAgIG9mZnNldCA9IF90aGlzJHByb3BzLm9mZnNldDtcbiAgICAgIHZhciByb290UmVjdDtcblxuICAgICAgaWYgKHJvb3RFbCkge1xuICAgICAgICByb290UmVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciB3aW5IID0gcm9vdEVsID8gcm9vdFJlY3QuaGVpZ2h0IDogd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICB2YXIgX3RoaXMkX2dldFNjcm9sbERpbWVuID0gdGhpcy5fZ2V0U2Nyb2xsRGltZW5zaW9uKCksXG4gICAgICAgICAgc2Nyb2xsVG9wID0gX3RoaXMkX2dldFNjcm9sbERpbWVuLnNjcm9sbFRvcDtcblxuICAgICAgdmFyIHNjcm9sbEJvdHRvbSA9IHNjcm9sbFRvcCArIHdpbkg7XG4gICAgICB2YXIgZWxUb3AgPSByb290RWwgPyByZWN0LnRvcCArIHNjcm9sbFRvcCAtIHJvb3RSZWN0LnRvcCArIG9mZnNldCA6IHJlY3QudG9wICsgc2Nyb2xsVG9wICsgb2Zmc2V0O1xuICAgICAgdmFyIGVsQm90dG9tID0gZWxUb3AgKyBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgICByZXR1cm4gZWxUb3AgPCBzY3JvbGxCb3R0b20gJiYgZWxCb3R0b20gPiBzY3JvbGxUb3A7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9pc0F0Qm90dG9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9pc0F0Qm90dG9tKCkge1xuICAgICAgdmFyIHJvb3RFbCA9IHRoaXMucHJvcHMucm9vdEVsO1xuXG4gICAgICB2YXIgX3RoaXMkX2dldFNjcm9sbERpbWVuMiA9IHRoaXMuX2dldFNjcm9sbERpbWVuc2lvbigpLFxuICAgICAgICAgIHNjcm9sbFRvcCA9IF90aGlzJF9nZXRTY3JvbGxEaW1lbjIuc2Nyb2xsVG9wLFxuICAgICAgICAgIHNjcm9sbEhlaWdodCA9IF90aGlzJF9nZXRTY3JvbGxEaW1lbjIuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICB2YXIgd2luSCA9IHJvb3RFbCA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgOiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICB2YXIgc2Nyb2xsZWRUb0JvdHRvbSA9IHNjcm9sbFRvcCArIHdpbkggPj0gc2Nyb2xsSGVpZ2h0O1xuICAgICAgcmV0dXJuIHNjcm9sbGVkVG9Cb3R0b207XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9nZXRTY3JvbGxlZFBhc3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFNjcm9sbGVkUGFzdCh2aWV3U3RhdHVzTGlzdCkge1xuICAgICAgaWYgKCF2aWV3U3RhdHVzTGlzdC5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSkpIHtcbiAgICAgICAgcmV0dXJuIHZpZXdTdGF0dXNMaXN0O1xuICAgICAgfVxuXG4gICAgICB2YXIgaGFzRm91bmRJblZpZXcgPSBmYWxzZTtcbiAgICAgIHZhciBzY3JvbGxlZFBhc3RJdGVtcyA9IHZpZXdTdGF0dXNMaXN0Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZiAoaXRlbSAmJiAhaGFzRm91bmRJblZpZXcpIHtcbiAgICAgICAgICBoYXNGb3VuZEluVmlldyA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICFoYXNGb3VuZEluVmlldztcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHNjcm9sbGVkUGFzdEl0ZW1zO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfc3B5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zcHkodGFyZ2V0cykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBlbGVtZW5zVmlld1N0YXRlID0gdGhpcy5fZ2V0RWxlbXNWaWV3U3RhdGUodGFyZ2V0cyk7XG5cbiAgICAgIHZhciBjdXJyZW50U3RhdHVzZXMgPSB0aGlzLnN0YXRlLmluVmlld1N0YXRlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGluVmlld1N0YXRlOiBlbGVtZW5zVmlld1N0YXRlLnZpZXdTdGF0dXNMaXN0LFxuICAgICAgICBpc1Njcm9sbGVkUGFzdDogZWxlbWVuc1ZpZXdTdGF0ZS5zY3JvbGxlZFBhc3RcbiAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLl91cGRhdGUoY3VycmVudFN0YXR1c2VzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfdXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF91cGRhdGUocHJldlN0YXR1c2VzKSB7XG4gICAgICBpZiAoaXNFcXVhbEFycmF5KHRoaXMuc3RhdGUuaW5WaWV3U3RhdGUsIHByZXZTdGF0dXNlcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BzLm9uVXBkYXRlKHRoaXMuc3RhdGUudGFyZ2V0SXRlbXNbdGhpcy5zdGF0ZS5pblZpZXdTdGF0ZS5pbmRleE9mKHRydWUpXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9oYW5kbGVTcHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2hhbmRsZVNweSgpIHtcbiAgICAgICgwLCBfdGhyb3R0bGUuZGVmYXVsdCkodGhpcy5fc3B5KCksIDEwMCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9pbml0RnJvbVByb3BzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9pbml0RnJvbVByb3BzKCkge1xuICAgICAgdmFyIHRhcmdldEl0ZW1zID0gdGhpcy5faW5pdFNweVRhcmdldCh0aGlzLnByb3BzLml0ZW1zKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRhcmdldEl0ZW1zOiB0YXJnZXRJdGVtc1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX3NweSh0YXJnZXRJdGVtcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9mZkV2ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZkV2ZW50KCkge1xuICAgICAgdmFyIGVsID0gdGhpcy5wcm9wcy5yb290RWwgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucHJvcHMucm9vdEVsKSA6IHdpbmRvdztcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2hhbmRsZVNweSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uRXZlbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25FdmVudCgpIHtcbiAgICAgIHZhciBlbCA9IHRoaXMucHJvcHMucm9vdEVsID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnByb3BzLnJvb3RFbCkgOiB3aW5kb3c7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9oYW5kbGVTcHkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnREaWRNb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHRoaXMuX2luaXRGcm9tUHJvcHMoKTtcblxuICAgICAgdGhpcy5vbkV2ZW50KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbXBvbmVudFdpbGxVbm1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy5vZmZFdmVudCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpIHtcbiAgICAgIHRoaXMuX2luaXRGcm9tUHJvcHMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgVGFnID0gdGhpcy5wcm9wcy5jb21wb25lbnRUYWc7XG4gICAgICB2YXIgX3RoaXMkcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjaGlsZHJlbiA9IF90aGlzJHByb3BzMi5jaGlsZHJlbixcbiAgICAgICAgICBjbGFzc05hbWUgPSBfdGhpcyRwcm9wczIuY2xhc3NOYW1lLFxuICAgICAgICAgIHNjcm9sbGVkUGFzdENsYXNzTmFtZSA9IF90aGlzJHByb3BzMi5zY3JvbGxlZFBhc3RDbGFzc05hbWUsXG4gICAgICAgICAgc3R5bGUgPSBfdGhpcyRwcm9wczIuc3R5bGU7XG4gICAgICB2YXIgY291bnRlciA9IDA7XG5cbiAgICAgIHZhciBpdGVtcyA9IF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkLCBpZHgpIHtcbiAgICAgICAgdmFyIF9jbGFzc05hbWVzO1xuXG4gICAgICAgIGlmICghY2hpbGQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBDaGlsZFRhZyA9IGNoaWxkLnR5cGU7XG4gICAgICAgIHZhciBpc1Njcm9sbGVkUGFzdCA9IHNjcm9sbGVkUGFzdENsYXNzTmFtZSAmJiBfdGhpczMuc3RhdGUuaXNTY3JvbGxlZFBhc3RbaWR4XTtcbiAgICAgICAgdmFyIGNoaWxkQ2xhc3MgPSAoMCwgX2NsYXNzbmFtZXMuZGVmYXVsdCkoKF9jbGFzc05hbWVzID0ge30sICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKF9jbGFzc05hbWVzLCBcIlwiLmNvbmNhdChjaGlsZC5wcm9wcy5jbGFzc05hbWUpLCBjaGlsZC5wcm9wcy5jbGFzc05hbWUpLCAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShfY2xhc3NOYW1lcywgXCJcIi5jb25jYXQoX3RoaXMzLnByb3BzLmN1cnJlbnRDbGFzc05hbWUpLCBfdGhpczMuc3RhdGUuaW5WaWV3U3RhdGVbaWR4XSksICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKF9jbGFzc05hbWVzLCBcIlwiLmNvbmNhdChfdGhpczMucHJvcHMuc2Nyb2xsZWRQYXN0Q2xhc3NOYW1lKSwgaXNTY3JvbGxlZFBhc3QpLCBfY2xhc3NOYW1lcykpO1xuICAgICAgICByZXR1cm4gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChDaGlsZFRhZywgKDAsIF9leHRlbmRzMi5kZWZhdWx0KSh7fSwgY2hpbGQucHJvcHMsIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNoaWxkQ2xhc3MsXG4gICAgICAgICAga2V5OiBjb3VudGVyKytcbiAgICAgICAgfSksIGNoaWxkLnByb3BzLmNoaWxkcmVuKTtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgaXRlbUNsYXNzID0gKDAsIF9jbGFzc25hbWVzLmRlZmF1bHQpKCgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHt9LCBcIlwiLmNvbmNhdChjbGFzc05hbWUpLCBjbGFzc05hbWUpKTtcbiAgICAgIHJldHVybiBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRhZywge1xuICAgICAgICBjbGFzc05hbWU6IGl0ZW1DbGFzcyxcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9LCBpdGVtcyk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTY3JvbGxzcHk7XG59KF9yZWFjdC5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNjcm9sbHNweTsiXSwic291cmNlUm9vdCI6IiJ9
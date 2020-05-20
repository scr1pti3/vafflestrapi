(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.react-popper"],{

/***/ "9P9J":
/*!*****************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/Popper.js ***!
  \*****************************************************/
/*! exports provided: InnerPopper, placements, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InnerPopper */
/* unused harmony export placements */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Popper; });
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "8OQS");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "pVnL");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "VbXa");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! deep-equal */ "f66B");
/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(deep_equal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! popper.js */ "8L3F");
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Manager */ "KFoM");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils */ "HcfF");










var initialStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  pointerEvents: 'none'
};
var initialArrowStyle = {};
var InnerPopper =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(InnerPopper, _React$Component);

  function InnerPopper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "state", {
      data: undefined,
      placement: undefined
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "popperInstance", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "popperNode", null);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "arrowNode", null);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "setPopperNode", function (popperNode) {
      if (!popperNode || _this.popperNode === popperNode) return;
      Object(_utils__WEBPACK_IMPORTED_MODULE_9__[/* setRef */ "b"])(_this.props.innerRef, popperNode);
      _this.popperNode = popperNode;

      _this.updatePopperInstance();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "setArrowNode", function (arrowNode) {
      _this.arrowNode = arrowNode;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "updateStateModifier", {
      enabled: true,
      order: 900,
      fn: function fn(data) {
        var placement = data.placement;

        _this.setState({
          data: data,
          placement: placement
        });

        return data;
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getOptions", function () {
      return {
        placement: _this.props.placement,
        eventsEnabled: _this.props.eventsEnabled,
        positionFixed: _this.props.positionFixed,
        modifiers: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, _this.props.modifiers, {
          arrow: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, _this.props.modifiers && _this.props.modifiers.arrow, {
            enabled: !!_this.arrowNode,
            element: _this.arrowNode
          }),
          applyStyle: {
            enabled: false
          },
          updateStateModifier: _this.updateStateModifier
        })
      };
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getPopperStyle", function () {
      return !_this.popperNode || !_this.state.data ? initialStyle : _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
        position: _this.state.data.offsets.popper.position
      }, _this.state.data.styles);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getPopperPlacement", function () {
      return !_this.state.data ? undefined : _this.state.placement;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getArrowStyle", function () {
      return !_this.arrowNode || !_this.state.data ? initialArrowStyle : _this.state.data.arrowStyles;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getOutOfBoundariesState", function () {
      return _this.state.data ? _this.state.data.hide : undefined;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "destroyPopperInstance", function () {
      if (!_this.popperInstance) return;

      _this.popperInstance.destroy();

      _this.popperInstance = null;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "updatePopperInstance", function () {
      _this.destroyPopperInstance();

      var _assertThisInitialize = _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this),
          popperNode = _assertThisInitialize.popperNode;

      var referenceElement = _this.props.referenceElement;
      if (!referenceElement || !popperNode) return;
      _this.popperInstance = new popper_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"](referenceElement, popperNode, _this.getOptions());
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "scheduleUpdate", function () {
      if (_this.popperInstance) {
        _this.popperInstance.scheduleUpdate();
      }
    });

    return _this;
  }

  var _proto = InnerPopper.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // If the Popper.js options have changed, update the instance (destroy + create)
    if (this.props.placement !== prevProps.placement || this.props.referenceElement !== prevProps.referenceElement || this.props.positionFixed !== prevProps.positionFixed || !deep_equal__WEBPACK_IMPORTED_MODULE_5___default()(this.props.modifiers, prevProps.modifiers, {
      strict: true
    })) {
      // develop only check that modifiers isn't being updated needlessly
      if (true) {
        if (this.props.modifiers !== prevProps.modifiers && this.props.modifiers != null && prevProps.modifiers != null && Object(_utils__WEBPACK_IMPORTED_MODULE_9__[/* shallowEqual */ "c"])(this.props.modifiers, prevProps.modifiers)) {
          console.warn("'modifiers' prop reference updated even though all values appear the same.\nConsider memoizing the 'modifiers' object to avoid needless rendering.");
        }
      }

      this.updatePopperInstance();
    } else if (this.props.eventsEnabled !== prevProps.eventsEnabled && this.popperInstance) {
      this.props.eventsEnabled ? this.popperInstance.enableEventListeners() : this.popperInstance.disableEventListeners();
    } // A placement difference in state means popper determined a new placement
    // apart from the props value. By the time the popper element is rendered with
    // the new position Popper has already measured it, if the place change triggers
    // a size change it will result in a misaligned popper. So we schedule an update to be sure.


    if (prevState.placement !== this.state.placement) {
      this.scheduleUpdate();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    Object(_utils__WEBPACK_IMPORTED_MODULE_9__[/* setRef */ "b"])(this.props.innerRef, null);
    this.destroyPopperInstance();
  };

  _proto.render = function render() {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_9__[/* unwrapArray */ "d"])(this.props.children)({
      ref: this.setPopperNode,
      style: this.getPopperStyle(),
      placement: this.getPopperPlacement(),
      outOfBoundaries: this.getOutOfBoundariesState(),
      scheduleUpdate: this.scheduleUpdate,
      arrowProps: {
        ref: this.setArrowNode,
        style: this.getArrowStyle()
      }
    });
  };

  return InnerPopper;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(InnerPopper, "defaultProps", {
  placement: 'bottom',
  eventsEnabled: true,
  referenceElement: undefined,
  positionFixed: false
});

var placements = popper_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].placements;

function Popper(_ref) {
  var referenceElement = _ref.referenceElement,
      props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default()(_ref, ["referenceElement"]);

  return react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_Manager__WEBPACK_IMPORTED_MODULE_8__[/* ManagerReferenceNodeContext */ "a"].Consumer, null, function (referenceNode) {
    return react__WEBPACK_IMPORTED_MODULE_6__["createElement"](InnerPopper, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
      referenceElement: referenceElement !== undefined ? referenceElement : referenceNode
    }, props));
  });
}

/***/ }),

/***/ "HcfF":
/*!****************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/utils.js ***!
  \****************************************************/
/*! exports provided: unwrapArray, safeInvoke, shallowEqual, setRef */
/*! exports used: safeInvoke, setRef, shallowEqual, unwrapArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return unwrapArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return safeInvoke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return shallowEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setRef; });
/**
 * Takes an argument and if it's an array, returns the first item in the array,
 * otherwise returns the argument. Used for Preact compatibility.
 */
var unwrapArray = function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg;
};
/**
 * Takes a maybe-undefined function and arbitrary args and invokes the function
 * only if it is defined.
 */

var safeInvoke = function safeInvoke(fn) {
  if (typeof fn === "function") {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(void 0, args);
  }
};
/**
 * Does a shallow equality check of two objects by comparing the reference
 * equality of each value.
 */

var shallowEqual = function shallowEqual(objA, objB) {
  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);

  if (bKeys.length !== aKeys.length) {
    return false;
  }

  for (var i = 0; i < bKeys.length; i++) {
    var key = aKeys[i];

    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};
/**
 * Sets a ref using either a ref callback or a ref object
 */

var setRef = function setRef(ref, node) {
  // if its a function call it
  if (typeof ref === "function") {
    return safeInvoke(ref, node);
  } // otherwise we should treat it as a ref object
  else if (ref != null) {
      ref.current = node;
    }
};

/***/ }),

/***/ "I7VN":
/*!****************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/index.js ***!
  \****************************************************/
/*! exports provided: Popper, placements, Manager, Reference */
/*! exports used: Manager, Popper, Reference */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Popper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popper */ "9P9J");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _Popper__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Manager */ "KFoM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _Manager__WEBPACK_IMPORTED_MODULE_1__["c"]; });

/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Reference */ "rJga");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _Reference__WEBPACK_IMPORTED_MODULE_2__["a"]; });

// Public components



 // Public types

/***/ }),

/***/ "KFoM":
/*!******************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/Manager.js ***!
  \******************************************************/
/*! exports provided: ManagerReferenceNodeContext, ManagerReferenceNodeSetterContext, default */
/*! exports used: ManagerReferenceNodeContext, ManagerReferenceNodeSetterContext, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagerReferenceNodeContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ManagerReferenceNodeSetterContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Manager; });
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "VbXa");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var create_react_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! create-react-context */ "/tz4");
/* harmony import */ var create_react_context__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(create_react_context__WEBPACK_IMPORTED_MODULE_4__);





var ManagerReferenceNodeContext = create_react_context__WEBPACK_IMPORTED_MODULE_4___default()();
var ManagerReferenceNodeSetterContext = create_react_context__WEBPACK_IMPORTED_MODULE_4___default()();

var Manager =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default()(Manager, _React$Component);

  function Manager() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "referenceNode", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "setReferenceNode", function (newReferenceNode) {
      if (newReferenceNode && _this.referenceNode !== newReferenceNode) {
        _this.referenceNode = newReferenceNode;

        _this.forceUpdate();
      }
    });

    return _this;
  }

  var _proto = Manager.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.referenceNode = null;
  };

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](ManagerReferenceNodeContext.Provider, {
      value: this.referenceNode
    }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"](ManagerReferenceNodeSetterContext.Provider, {
      value: this.setReferenceNode
    }, this.props.children));
  };

  return Manager;
}(react__WEBPACK_IMPORTED_MODULE_3__["Component"]);



/***/ }),

/***/ "rJga":
/*!********************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/Reference.js ***!
  \********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Reference; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "pVnL");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "PJYZ");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "VbXa");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! warning */ "2W6z");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Manager */ "KFoM");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "HcfF");









var InnerReference =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(InnerReference, _React$Component);

  function InnerReference() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "refHandler", function (node) {
      Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* setRef */ "b"])(_this.props.innerRef, node);
      Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* safeInvoke */ "a"])(_this.props.setReferenceNode, node);
    });

    return _this;
  }

  var _proto = InnerReference.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* setRef */ "b"])(this.props.innerRef, null);
  };

  _proto.render = function render() {
    warning__WEBPACK_IMPORTED_MODULE_5___default()(Boolean(this.props.setReferenceNode), '`Reference` should not be used outside of a `Manager` component.');
    return Object(_utils__WEBPACK_IMPORTED_MODULE_7__[/* unwrapArray */ "d"])(this.props.children)({
      ref: this.refHandler
    });
  };

  return InnerReference;
}(react__WEBPACK_IMPORTED_MODULE_4__["Component"]);

function Reference(props) {
  return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](_Manager__WEBPACK_IMPORTED_MODULE_6__[/* ManagerReferenceNodeSetterContext */ "b"].Consumer, null, function (setReferenceNode) {
    return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](InnerReference, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
      setReferenceNode: setReferenceNode
    }, props));
  });
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcG9wcGVyL2xpYi9lc20vUG9wcGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1wb3BwZXIvbGliL2VzbS91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcG9wcGVyL2xpYi9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXBvcHBlci9saWIvZXNtL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXBvcHBlci9saWIvZXNtL1JlZmVyZW5jZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0c7QUFDMUM7QUFDNEI7QUFDaEI7QUFDRTtBQUNqQztBQUNKO0FBQ0U7QUFDdUI7QUFDSTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsRUFBRSwyRUFBYzs7QUFFaEI7QUFDQTs7QUFFQSx1RUFBdUUsYUFBYTtBQUNwRjtBQUNBOztBQUVBOztBQUVBLElBQUksNEVBQWUsQ0FBQyxtRkFBc0I7QUFDMUM7QUFDQTtBQUNBLEtBQUs7O0FBRUwsSUFBSSw0RUFBZSxDQUFDLG1GQUFzQjs7QUFFMUMsSUFBSSw0RUFBZSxDQUFDLG1GQUFzQjs7QUFFMUMsSUFBSSw0RUFBZSxDQUFDLG1GQUFzQjs7QUFFMUMsSUFBSSw0RUFBZSxDQUFDLG1GQUFzQjtBQUMxQztBQUNBLE1BQU0sNkRBQU07QUFDWjs7QUFFQTtBQUNBLEtBQUs7O0FBRUwsSUFBSSw0RUFBZSxDQUFDLG1GQUFzQjtBQUMxQztBQUNBLEtBQUs7O0FBRUwsSUFBSSw0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LGFBQWE7QUFDcEY7QUFDQTs7QUFFQTs7QUFFQSxJQUFJLDRFQUFlLENBQUMsbUZBQXNCOztBQUUxQyxJQUFJLDRFQUFlLENBQUMsbUZBQXNCO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLG1EQUFtQjtBQUM5QjtBQUNBLEtBQUssRUFBRSxtREFBbUI7QUFDMUI7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxDQUFDLENBQUMsK0NBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ2xEakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNEO0FBQzRCO0FBQ2hCO0FBQ0U7QUFDckM7QUFDRDtBQUNnQztBQUNKOztBQUUxRDtBQUNBO0FBQ0E7QUFDQSxFQUFFLDJFQUFjOztBQUVoQjtBQUNBOztBQUVBLHVFQUF1RSxhQUFhO0FBQ3BGO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSSw0RUFBZSxDQUFDLG1GQUFzQjtBQUMxQyxNQUFNLDZEQUFNO0FBQ1osTUFBTSxpRUFBVTtBQUNoQixLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLDZEQUFNO0FBQ1Y7O0FBRUE7QUFDQSxJQUFJLDhDQUFPO0FBQ1gsV0FBVyxrRUFBVztBQUN0QjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLENBQUMsQ0FBQywrQ0FBZTs7QUFFRjtBQUNmLFNBQVMsbURBQW1CLENBQUMsa0ZBQWlDO0FBQzlELFdBQVcsbURBQW1CLGlCQUFpQixxRUFBUTtBQUN2RDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQyIsImZpbGUiOiJucG0ucmVhY3QtcG9wcGVyLmVlY2Q5ZmMxMTZiZDc2YjQ1MjYzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzXCI7XG5pbXBvcnQgX2Fzc2VydFRoaXNJbml0aWFsaXplZCBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIjtcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c0xvb3NlXCI7XG5pbXBvcnQgX2RlZmluZVByb3BlcnR5IGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCI7XG5pbXBvcnQgZGVlcEVxdWFsIGZyb20gXCJkZWVwLWVxdWFsXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUG9wcGVySlMgZnJvbSAncG9wcGVyLmpzJztcbmltcG9ydCB7IE1hbmFnZXJSZWZlcmVuY2VOb2RlQ29udGV4dCB9IGZyb20gJy4vTWFuYWdlcic7XG5pbXBvcnQgeyB1bndyYXBBcnJheSwgc2V0UmVmLCBzaGFsbG93RXF1YWwgfSBmcm9tICcuL3V0aWxzJztcbnZhciBpbml0aWFsU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB0b3A6IDAsXG4gIGxlZnQ6IDAsXG4gIG9wYWNpdHk6IDAsXG4gIHBvaW50ZXJFdmVudHM6ICdub25lJ1xufTtcbnZhciBpbml0aWFsQXJyb3dTdHlsZSA9IHt9O1xuZXhwb3J0IHZhciBJbm5lclBvcHBlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShJbm5lclBvcHBlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gSW5uZXJQb3BwZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwic3RhdGVcIiwge1xuICAgICAgZGF0YTogdW5kZWZpbmVkLFxuICAgICAgcGxhY2VtZW50OiB1bmRlZmluZWRcbiAgICB9KTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJwb3BwZXJJbnN0YW5jZVwiLCB2b2lkIDApO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcInBvcHBlck5vZGVcIiwgbnVsbCk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiYXJyb3dOb2RlXCIsIG51bGwpO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcInNldFBvcHBlck5vZGVcIiwgZnVuY3Rpb24gKHBvcHBlck5vZGUpIHtcbiAgICAgIGlmICghcG9wcGVyTm9kZSB8fCBfdGhpcy5wb3BwZXJOb2RlID09PSBwb3BwZXJOb2RlKSByZXR1cm47XG4gICAgICBzZXRSZWYoX3RoaXMucHJvcHMuaW5uZXJSZWYsIHBvcHBlck5vZGUpO1xuICAgICAgX3RoaXMucG9wcGVyTm9kZSA9IHBvcHBlck5vZGU7XG5cbiAgICAgIF90aGlzLnVwZGF0ZVBvcHBlckluc3RhbmNlKCk7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwic2V0QXJyb3dOb2RlXCIsIGZ1bmN0aW9uIChhcnJvd05vZGUpIHtcbiAgICAgIF90aGlzLmFycm93Tm9kZSA9IGFycm93Tm9kZTtcbiAgICB9KTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJ1cGRhdGVTdGF0ZU1vZGlmaWVyXCIsIHtcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBvcmRlcjogOTAwLFxuICAgICAgZm46IGZ1bmN0aW9uIGZuKGRhdGEpIHtcbiAgICAgICAgdmFyIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50O1xuXG4gICAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcImdldE9wdGlvbnNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGxhY2VtZW50OiBfdGhpcy5wcm9wcy5wbGFjZW1lbnQsXG4gICAgICAgIGV2ZW50c0VuYWJsZWQ6IF90aGlzLnByb3BzLmV2ZW50c0VuYWJsZWQsXG4gICAgICAgIHBvc2l0aW9uRml4ZWQ6IF90aGlzLnByb3BzLnBvc2l0aW9uRml4ZWQsXG4gICAgICAgIG1vZGlmaWVyczogX2V4dGVuZHMoe30sIF90aGlzLnByb3BzLm1vZGlmaWVycywge1xuICAgICAgICAgIGFycm93OiBfZXh0ZW5kcyh7fSwgX3RoaXMucHJvcHMubW9kaWZpZXJzICYmIF90aGlzLnByb3BzLm1vZGlmaWVycy5hcnJvdywge1xuICAgICAgICAgICAgZW5hYmxlZDogISFfdGhpcy5hcnJvd05vZGUsXG4gICAgICAgICAgICBlbGVtZW50OiBfdGhpcy5hcnJvd05vZGVcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBhcHBseVN0eWxlOiB7XG4gICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlU3RhdGVNb2RpZmllcjogX3RoaXMudXBkYXRlU3RhdGVNb2RpZmllclxuICAgICAgICB9KVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJnZXRQb3BwZXJTdHlsZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gIV90aGlzLnBvcHBlck5vZGUgfHwgIV90aGlzLnN0YXRlLmRhdGEgPyBpbml0aWFsU3R5bGUgOiBfZXh0ZW5kcyh7XG4gICAgICAgIHBvc2l0aW9uOiBfdGhpcy5zdGF0ZS5kYXRhLm9mZnNldHMucG9wcGVyLnBvc2l0aW9uXG4gICAgICB9LCBfdGhpcy5zdGF0ZS5kYXRhLnN0eWxlcyk7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiZ2V0UG9wcGVyUGxhY2VtZW50XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAhX3RoaXMuc3RhdGUuZGF0YSA/IHVuZGVmaW5lZCA6IF90aGlzLnN0YXRlLnBsYWNlbWVudDtcbiAgICB9KTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJnZXRBcnJvd1N0eWxlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAhX3RoaXMuYXJyb3dOb2RlIHx8ICFfdGhpcy5zdGF0ZS5kYXRhID8gaW5pdGlhbEFycm93U3R5bGUgOiBfdGhpcy5zdGF0ZS5kYXRhLmFycm93U3R5bGVzO1xuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcImdldE91dE9mQm91bmRhcmllc1N0YXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5zdGF0ZS5kYXRhID8gX3RoaXMuc3RhdGUuZGF0YS5oaWRlIDogdW5kZWZpbmVkO1xuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcImRlc3Ryb3lQb3BwZXJJbnN0YW5jZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIV90aGlzLnBvcHBlckluc3RhbmNlKSByZXR1cm47XG5cbiAgICAgIF90aGlzLnBvcHBlckluc3RhbmNlLmRlc3Ryb3koKTtcblxuICAgICAgX3RoaXMucG9wcGVySW5zdGFuY2UgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcInVwZGF0ZVBvcHBlckluc3RhbmNlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmRlc3Ryb3lQb3BwZXJJbnN0YW5jZSgpO1xuXG4gICAgICB2YXIgX2Fzc2VydFRoaXNJbml0aWFsaXplID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksXG4gICAgICAgICAgcG9wcGVyTm9kZSA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZS5wb3BwZXJOb2RlO1xuXG4gICAgICB2YXIgcmVmZXJlbmNlRWxlbWVudCA9IF90aGlzLnByb3BzLnJlZmVyZW5jZUVsZW1lbnQ7XG4gICAgICBpZiAoIXJlZmVyZW5jZUVsZW1lbnQgfHwgIXBvcHBlck5vZGUpIHJldHVybjtcbiAgICAgIF90aGlzLnBvcHBlckluc3RhbmNlID0gbmV3IFBvcHBlckpTKHJlZmVyZW5jZUVsZW1lbnQsIHBvcHBlck5vZGUsIF90aGlzLmdldE9wdGlvbnMoKSk7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwic2NoZWR1bGVVcGRhdGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKF90aGlzLnBvcHBlckluc3RhbmNlKSB7XG4gICAgICAgIF90aGlzLnBvcHBlckluc3RhbmNlLnNjaGVkdWxlVXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gSW5uZXJQb3BwZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAvLyBJZiB0aGUgUG9wcGVyLmpzIG9wdGlvbnMgaGF2ZSBjaGFuZ2VkLCB1cGRhdGUgdGhlIGluc3RhbmNlIChkZXN0cm95ICsgY3JlYXRlKVxuICAgIGlmICh0aGlzLnByb3BzLnBsYWNlbWVudCAhPT0gcHJldlByb3BzLnBsYWNlbWVudCB8fCB0aGlzLnByb3BzLnJlZmVyZW5jZUVsZW1lbnQgIT09IHByZXZQcm9wcy5yZWZlcmVuY2VFbGVtZW50IHx8IHRoaXMucHJvcHMucG9zaXRpb25GaXhlZCAhPT0gcHJldlByb3BzLnBvc2l0aW9uRml4ZWQgfHwgIWRlZXBFcXVhbCh0aGlzLnByb3BzLm1vZGlmaWVycywgcHJldlByb3BzLm1vZGlmaWVycywge1xuICAgICAgc3RyaWN0OiB0cnVlXG4gICAgfSkpIHtcbiAgICAgIC8vIGRldmVsb3Agb25seSBjaGVjayB0aGF0IG1vZGlmaWVycyBpc24ndCBiZWluZyB1cGRhdGVkIG5lZWRsZXNzbHlcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm1vZGlmaWVycyAhPT0gcHJldlByb3BzLm1vZGlmaWVycyAmJiB0aGlzLnByb3BzLm1vZGlmaWVycyAhPSBudWxsICYmIHByZXZQcm9wcy5tb2RpZmllcnMgIT0gbnVsbCAmJiBzaGFsbG93RXF1YWwodGhpcy5wcm9wcy5tb2RpZmllcnMsIHByZXZQcm9wcy5tb2RpZmllcnMpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiJ21vZGlmaWVycycgcHJvcCByZWZlcmVuY2UgdXBkYXRlZCBldmVuIHRob3VnaCBhbGwgdmFsdWVzIGFwcGVhciB0aGUgc2FtZS5cXG5Db25zaWRlciBtZW1vaXppbmcgdGhlICdtb2RpZmllcnMnIG9iamVjdCB0byBhdm9pZCBuZWVkbGVzcyByZW5kZXJpbmcuXCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMudXBkYXRlUG9wcGVySW5zdGFuY2UoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZXZlbnRzRW5hYmxlZCAhPT0gcHJldlByb3BzLmV2ZW50c0VuYWJsZWQgJiYgdGhpcy5wb3BwZXJJbnN0YW5jZSkge1xuICAgICAgdGhpcy5wcm9wcy5ldmVudHNFbmFibGVkID8gdGhpcy5wb3BwZXJJbnN0YW5jZS5lbmFibGVFdmVudExpc3RlbmVycygpIDogdGhpcy5wb3BwZXJJbnN0YW5jZS5kaXNhYmxlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9IC8vIEEgcGxhY2VtZW50IGRpZmZlcmVuY2UgaW4gc3RhdGUgbWVhbnMgcG9wcGVyIGRldGVybWluZWQgYSBuZXcgcGxhY2VtZW50XG4gICAgLy8gYXBhcnQgZnJvbSB0aGUgcHJvcHMgdmFsdWUuIEJ5IHRoZSB0aW1lIHRoZSBwb3BwZXIgZWxlbWVudCBpcyByZW5kZXJlZCB3aXRoXG4gICAgLy8gdGhlIG5ldyBwb3NpdGlvbiBQb3BwZXIgaGFzIGFscmVhZHkgbWVhc3VyZWQgaXQsIGlmIHRoZSBwbGFjZSBjaGFuZ2UgdHJpZ2dlcnNcbiAgICAvLyBhIHNpemUgY2hhbmdlIGl0IHdpbGwgcmVzdWx0IGluIGEgbWlzYWxpZ25lZCBwb3BwZXIuIFNvIHdlIHNjaGVkdWxlIGFuIHVwZGF0ZSB0byBiZSBzdXJlLlxuXG5cbiAgICBpZiAocHJldlN0YXRlLnBsYWNlbWVudCAhPT0gdGhpcy5zdGF0ZS5wbGFjZW1lbnQpIHtcbiAgICAgIHRoaXMuc2NoZWR1bGVVcGRhdGUoKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgc2V0UmVmKHRoaXMucHJvcHMuaW5uZXJSZWYsIG51bGwpO1xuICAgIHRoaXMuZGVzdHJveVBvcHBlckluc3RhbmNlKCk7XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdW53cmFwQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikoe1xuICAgICAgcmVmOiB0aGlzLnNldFBvcHBlck5vZGUsXG4gICAgICBzdHlsZTogdGhpcy5nZXRQb3BwZXJTdHlsZSgpLFxuICAgICAgcGxhY2VtZW50OiB0aGlzLmdldFBvcHBlclBsYWNlbWVudCgpLFxuICAgICAgb3V0T2ZCb3VuZGFyaWVzOiB0aGlzLmdldE91dE9mQm91bmRhcmllc1N0YXRlKCksXG4gICAgICBzY2hlZHVsZVVwZGF0ZTogdGhpcy5zY2hlZHVsZVVwZGF0ZSxcbiAgICAgIGFycm93UHJvcHM6IHtcbiAgICAgICAgcmVmOiB0aGlzLnNldEFycm93Tm9kZSxcbiAgICAgICAgc3R5bGU6IHRoaXMuZ2V0QXJyb3dTdHlsZSgpXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIElubmVyUG9wcGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5fZGVmaW5lUHJvcGVydHkoSW5uZXJQb3BwZXIsIFwiZGVmYXVsdFByb3BzXCIsIHtcbiAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgZXZlbnRzRW5hYmxlZDogdHJ1ZSxcbiAgcmVmZXJlbmNlRWxlbWVudDogdW5kZWZpbmVkLFxuICBwb3NpdGlvbkZpeGVkOiBmYWxzZVxufSk7XG5cbnZhciBwbGFjZW1lbnRzID0gUG9wcGVySlMucGxhY2VtZW50cztcbmV4cG9ydCB7IHBsYWNlbWVudHMgfTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBvcHBlcihfcmVmKSB7XG4gIHZhciByZWZlcmVuY2VFbGVtZW50ID0gX3JlZi5yZWZlcmVuY2VFbGVtZW50LFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJyZWZlcmVuY2VFbGVtZW50XCJdKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNYW5hZ2VyUmVmZXJlbmNlTm9kZUNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChyZWZlcmVuY2VOb2RlKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5uZXJQb3BwZXIsIF9leHRlbmRzKHtcbiAgICAgIHJlZmVyZW5jZUVsZW1lbnQ6IHJlZmVyZW5jZUVsZW1lbnQgIT09IHVuZGVmaW5lZCA/IHJlZmVyZW5jZUVsZW1lbnQgOiByZWZlcmVuY2VOb2RlXG4gICAgfSwgcHJvcHMpKTtcbiAgfSk7XG59IiwiLyoqXG4gKiBUYWtlcyBhbiBhcmd1bWVudCBhbmQgaWYgaXQncyBhbiBhcnJheSwgcmV0dXJucyB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgYXJyYXksXG4gKiBvdGhlcndpc2UgcmV0dXJucyB0aGUgYXJndW1lbnQuIFVzZWQgZm9yIFByZWFjdCBjb21wYXRpYmlsaXR5LlxuICovXG5leHBvcnQgdmFyIHVud3JhcEFycmF5ID0gZnVuY3Rpb24gdW53cmFwQXJyYXkoYXJnKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyZykgPyBhcmdbMF0gOiBhcmc7XG59O1xuLyoqXG4gKiBUYWtlcyBhIG1heWJlLXVuZGVmaW5lZCBmdW5jdGlvbiBhbmQgYXJiaXRyYXJ5IGFyZ3MgYW5kIGludm9rZXMgdGhlIGZ1bmN0aW9uXG4gKiBvbmx5IGlmIGl0IGlzIGRlZmluZWQuXG4gKi9cblxuZXhwb3J0IHZhciBzYWZlSW52b2tlID0gZnVuY3Rpb24gc2FmZUludm9rZShmbikge1xuICBpZiAodHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4uYXBwbHkodm9pZCAwLCBhcmdzKTtcbiAgfVxufTtcbi8qKlxuICogRG9lcyBhIHNoYWxsb3cgZXF1YWxpdHkgY2hlY2sgb2YgdHdvIG9iamVjdHMgYnkgY29tcGFyaW5nIHRoZSByZWZlcmVuY2VcbiAqIGVxdWFsaXR5IG9mIGVhY2ggdmFsdWUuXG4gKi9cblxuZXhwb3J0IHZhciBzaGFsbG93RXF1YWwgPSBmdW5jdGlvbiBzaGFsbG93RXF1YWwob2JqQSwgb2JqQikge1xuICB2YXIgYUtleXMgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGJLZXlzID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgaWYgKGJLZXlzLmxlbmd0aCAhPT0gYUtleXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBiS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBhS2V5c1tpXTtcblxuICAgIGlmIChvYmpBW2tleV0gIT09IG9iakJba2V5XSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcbi8qKlxuICogU2V0cyBhIHJlZiB1c2luZyBlaXRoZXIgYSByZWYgY2FsbGJhY2sgb3IgYSByZWYgb2JqZWN0XG4gKi9cblxuZXhwb3J0IHZhciBzZXRSZWYgPSBmdW5jdGlvbiBzZXRSZWYocmVmLCBub2RlKSB7XG4gIC8vIGlmIGl0cyBhIGZ1bmN0aW9uIGNhbGwgaXRcbiAgaWYgKHR5cGVvZiByZWYgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBzYWZlSW52b2tlKHJlZiwgbm9kZSk7XG4gIH0gLy8gb3RoZXJ3aXNlIHdlIHNob3VsZCB0cmVhdCBpdCBhcyBhIHJlZiBvYmplY3RcbiAgZWxzZSBpZiAocmVmICE9IG51bGwpIHtcbiAgICAgIHJlZi5jdXJyZW50ID0gbm9kZTtcbiAgICB9XG59OyIsIi8vIFB1YmxpYyBjb21wb25lbnRzXG5pbXBvcnQgUG9wcGVyLCB7IHBsYWNlbWVudHMgfSBmcm9tICcuL1BvcHBlcic7XG5pbXBvcnQgTWFuYWdlciBmcm9tICcuL01hbmFnZXInO1xuaW1wb3J0IFJlZmVyZW5jZSBmcm9tICcuL1JlZmVyZW5jZSc7XG5leHBvcnQgeyBQb3BwZXIsIHBsYWNlbWVudHMsIE1hbmFnZXIsIFJlZmVyZW5jZSB9OyAvLyBQdWJsaWMgdHlwZXMiLCJpbXBvcnQgX2Fzc2VydFRoaXNJbml0aWFsaXplZCBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIjtcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c0xvb3NlXCI7XG5pbXBvcnQgX2RlZmluZVByb3BlcnR5IGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ29udGV4dCBmcm9tICdjcmVhdGUtcmVhY3QtY29udGV4dCc7XG5leHBvcnQgdmFyIE1hbmFnZXJSZWZlcmVuY2VOb2RlQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcbmV4cG9ydCB2YXIgTWFuYWdlclJlZmVyZW5jZU5vZGVTZXR0ZXJDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuXG52YXIgTWFuYWdlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShNYW5hZ2VyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBNYW5hZ2VyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSB8fCB0aGlzO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcInJlZmVyZW5jZU5vZGVcIiwgdm9pZCAwKTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJzZXRSZWZlcmVuY2VOb2RlXCIsIGZ1bmN0aW9uIChuZXdSZWZlcmVuY2VOb2RlKSB7XG4gICAgICBpZiAobmV3UmVmZXJlbmNlTm9kZSAmJiBfdGhpcy5yZWZlcmVuY2VOb2RlICE9PSBuZXdSZWZlcmVuY2VOb2RlKSB7XG4gICAgICAgIF90aGlzLnJlZmVyZW5jZU5vZGUgPSBuZXdSZWZlcmVuY2VOb2RlO1xuXG4gICAgICAgIF90aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTWFuYWdlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5yZWZlcmVuY2VOb2RlID0gbnVsbDtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1hbmFnZXJSZWZlcmVuY2VOb2RlQ29udGV4dC5Qcm92aWRlciwge1xuICAgICAgdmFsdWU6IHRoaXMucmVmZXJlbmNlTm9kZVxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWFuYWdlclJlZmVyZW5jZU5vZGVTZXR0ZXJDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICB2YWx1ZTogdGhpcy5zZXRSZWZlcmVuY2VOb2RlXG4gICAgfSwgdGhpcy5wcm9wcy5jaGlsZHJlbikpO1xuICB9O1xuXG4gIHJldHVybiBNYW5hZ2VyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5leHBvcnQgeyBNYW5hZ2VyIGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kc1wiO1xuaW1wb3J0IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkXCI7XG5pbXBvcnQgX2luaGVyaXRzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNMb29zZVwiO1xuaW1wb3J0IF9kZWZpbmVQcm9wZXJ0eSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5pbXBvcnQgeyBNYW5hZ2VyUmVmZXJlbmNlTm9kZVNldHRlckNvbnRleHQgfSBmcm9tICcuL01hbmFnZXInO1xuaW1wb3J0IHsgc2FmZUludm9rZSwgdW53cmFwQXJyYXksIHNldFJlZiB9IGZyb20gJy4vdXRpbHMnO1xuXG52YXIgSW5uZXJSZWZlcmVuY2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoSW5uZXJSZWZlcmVuY2UsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIElubmVyUmVmZXJlbmNlKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSB8fCB0aGlzO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcInJlZkhhbmRsZXJcIiwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHNldFJlZihfdGhpcy5wcm9wcy5pbm5lclJlZiwgbm9kZSk7XG4gICAgICBzYWZlSW52b2tlKF90aGlzLnByb3BzLnNldFJlZmVyZW5jZU5vZGUsIG5vZGUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IElubmVyUmVmZXJlbmNlLnByb3RvdHlwZTtcblxuICBfcHJvdG8uY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBzZXRSZWYodGhpcy5wcm9wcy5pbm5lclJlZiwgbnVsbCk7XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB3YXJuaW5nKEJvb2xlYW4odGhpcy5wcm9wcy5zZXRSZWZlcmVuY2VOb2RlKSwgJ2BSZWZlcmVuY2VgIHNob3VsZCBub3QgYmUgdXNlZCBvdXRzaWRlIG9mIGEgYE1hbmFnZXJgIGNvbXBvbmVudC4nKTtcbiAgICByZXR1cm4gdW53cmFwQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikoe1xuICAgICAgcmVmOiB0aGlzLnJlZkhhbmRsZXJcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gSW5uZXJSZWZlcmVuY2U7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlZmVyZW5jZShwcm9wcykge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNYW5hZ2VyUmVmZXJlbmNlTm9kZVNldHRlckNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChzZXRSZWZlcmVuY2VOb2RlKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5uZXJSZWZlcmVuY2UsIF9leHRlbmRzKHtcbiAgICAgIHNldFJlZmVyZW5jZU5vZGU6IHNldFJlZmVyZW5jZU5vZGVcbiAgICB9LCBwcm9wcykpO1xuICB9KTtcbn0iXSwic291cmNlUm9vdCI6IiJ9
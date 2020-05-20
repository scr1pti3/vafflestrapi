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
var InnerPopper = /*#__PURE__*/function (_React$Component) {
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

var Manager = /*#__PURE__*/function (_React$Component) {
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









var InnerReference = /*#__PURE__*/function (_React$Component) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcG9wcGVyL2xpYi9lc20vUG9wcGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1wb3BwZXIvbGliL2VzbS91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcG9wcGVyL2xpYi9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXBvcHBlci9saWIvZXNtL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXBvcHBlci9saWIvZXNtL1JlZmVyZW5jZS5qcyJdLCJuYW1lcyI6WyJpbml0aWFsU3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJvcGFjaXR5IiwicG9pbnRlckV2ZW50cyIsImluaXRpYWxBcnJvd1N0eWxlIiwiSW5uZXJQb3BwZXIiLCJfUmVhY3QkQ29tcG9uZW50IiwiX2luaGVyaXRzTG9vc2UiLCJfdGhpcyIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiY2FsbCIsImFwcGx5IiwiY29uY2F0IiwiX2RlZmluZVByb3BlcnR5IiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsImRhdGEiLCJ1bmRlZmluZWQiLCJwbGFjZW1lbnQiLCJwb3BwZXJOb2RlIiwic2V0UmVmIiwicHJvcHMiLCJpbm5lclJlZiIsInVwZGF0ZVBvcHBlckluc3RhbmNlIiwiYXJyb3dOb2RlIiwiZW5hYmxlZCIsIm9yZGVyIiwiZm4iLCJzZXRTdGF0ZSIsImV2ZW50c0VuYWJsZWQiLCJwb3NpdGlvbkZpeGVkIiwibW9kaWZpZXJzIiwiX2V4dGVuZHMiLCJhcnJvdyIsImVsZW1lbnQiLCJhcHBseVN0eWxlIiwidXBkYXRlU3RhdGVNb2RpZmllciIsInN0YXRlIiwib2Zmc2V0cyIsInBvcHBlciIsInN0eWxlcyIsImFycm93U3R5bGVzIiwiaGlkZSIsInBvcHBlckluc3RhbmNlIiwiZGVzdHJveSIsImRlc3Ryb3lQb3BwZXJJbnN0YW5jZSIsIl9hc3NlcnRUaGlzSW5pdGlhbGl6ZSIsInJlZmVyZW5jZUVsZW1lbnQiLCJQb3BwZXJKUyIsImdldE9wdGlvbnMiLCJzY2hlZHVsZVVwZGF0ZSIsIl9wcm90byIsInByb3RvdHlwZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImRlZXBFcXVhbCIsInN0cmljdCIsInByb2Nlc3MiLCJzaGFsbG93RXF1YWwiLCJjb25zb2xlIiwid2FybiIsImVuYWJsZUV2ZW50TGlzdGVuZXJzIiwiZGlzYWJsZUV2ZW50TGlzdGVuZXJzIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW5kZXIiLCJ1bndyYXBBcnJheSIsImNoaWxkcmVuIiwicmVmIiwic2V0UG9wcGVyTm9kZSIsInN0eWxlIiwiZ2V0UG9wcGVyU3R5bGUiLCJnZXRQb3BwZXJQbGFjZW1lbnQiLCJvdXRPZkJvdW5kYXJpZXMiLCJnZXRPdXRPZkJvdW5kYXJpZXNTdGF0ZSIsImFycm93UHJvcHMiLCJzZXRBcnJvd05vZGUiLCJnZXRBcnJvd1N0eWxlIiwiUmVhY3QiLCJwbGFjZW1lbnRzIiwiUG9wcGVyIiwiX3JlZiIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIiwiTWFuYWdlclJlZmVyZW5jZU5vZGVDb250ZXh0IiwiQ29uc3VtZXIiLCJyZWZlcmVuY2VOb2RlIiwiYXJnIiwiaXNBcnJheSIsInNhZmVJbnZva2UiLCJvYmpBIiwib2JqQiIsImFLZXlzIiwiT2JqZWN0Iiwia2V5cyIsImJLZXlzIiwiaSIsImtleSIsIm5vZGUiLCJjdXJyZW50IiwiY3JlYXRlQ29udGV4dCIsIk1hbmFnZXJSZWZlcmVuY2VOb2RlU2V0dGVyQ29udGV4dCIsIk1hbmFnZXIiLCJuZXdSZWZlcmVuY2VOb2RlIiwiZm9yY2VVcGRhdGUiLCJQcm92aWRlciIsInZhbHVlIiwic2V0UmVmZXJlbmNlTm9kZSIsIklubmVyUmVmZXJlbmNlIiwi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b0JzQixrRkFBaUMsQ0FBQ2hCLFFBQXRELEVBQWdFLElBQWhFLEVBQXNFLFVBQVVzQixnQkFBVixFQUE0QjtBQUN2RyxXQUFPNUIsbURBQUEsQ0FBb0I2QixjQUFwQixFQUFvQzNFLHFFQUFRLENBQUM7QUFDbEQwRSxzQkFBZ0IsRUFBRUE7QUFEZ0MsS0FBRCxFQUVoRHJGLEtBRmdELENBQTVDLENBQVA7QUFHRCxHQUpNLENBQVA7QUFLRCxDIiwiZmlsZSI6Im5wbS5yZWFjdC1wb3BwZXIuNWVlZDllOGIwZDg5ODYwYmVhOGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2V4dGVuZHNcIjtcbmltcG9ydCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiO1xuaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2VcIjtcbmltcG9ydCBfZGVmaW5lUHJvcGVydHkgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHlcIjtcbmltcG9ydCBkZWVwRXF1YWwgZnJvbSBcImRlZXAtZXF1YWxcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQb3BwZXJKUyBmcm9tICdwb3BwZXIuanMnO1xuaW1wb3J0IHsgTWFuYWdlclJlZmVyZW5jZU5vZGVDb250ZXh0IH0gZnJvbSAnLi9NYW5hZ2VyJztcbmltcG9ydCB7IHVud3JhcEFycmF5LCBzZXRSZWYsIHNoYWxsb3dFcXVhbCB9IGZyb20gJy4vdXRpbHMnO1xudmFyIGluaXRpYWxTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHRvcDogMCxcbiAgbGVmdDogMCxcbiAgb3BhY2l0eTogMCxcbiAgcG9pbnRlckV2ZW50czogJ25vbmUnXG59O1xudmFyIGluaXRpYWxBcnJvd1N0eWxlID0ge307XG5leHBvcnQgdmFyIElubmVyUG9wcGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKElubmVyUG9wcGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBJbm5lclBvcHBlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJzdGF0ZVwiLCB7XG4gICAgICBkYXRhOiB1bmRlZmluZWQsXG4gICAgICBwbGFjZW1lbnQ6IHVuZGVmaW5lZFxuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcInBvcHBlckluc3RhbmNlXCIsIHZvaWQgMCk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwicG9wcGVyTm9kZVwiLCBudWxsKTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJhcnJvd05vZGVcIiwgbnVsbCk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwic2V0UG9wcGVyTm9kZVwiLCBmdW5jdGlvbiAocG9wcGVyTm9kZSkge1xuICAgICAgaWYgKCFwb3BwZXJOb2RlIHx8IF90aGlzLnBvcHBlck5vZGUgPT09IHBvcHBlck5vZGUpIHJldHVybjtcbiAgICAgIHNldFJlZihfdGhpcy5wcm9wcy5pbm5lclJlZiwgcG9wcGVyTm9kZSk7XG4gICAgICBfdGhpcy5wb3BwZXJOb2RlID0gcG9wcGVyTm9kZTtcblxuICAgICAgX3RoaXMudXBkYXRlUG9wcGVySW5zdGFuY2UoKTtcbiAgICB9KTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJzZXRBcnJvd05vZGVcIiwgZnVuY3Rpb24gKGFycm93Tm9kZSkge1xuICAgICAgX3RoaXMuYXJyb3dOb2RlID0gYXJyb3dOb2RlO1xuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcInVwZGF0ZVN0YXRlTW9kaWZpZXJcIiwge1xuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIG9yZGVyOiA5MDAsXG4gICAgICBmbjogZnVuY3Rpb24gZm4oZGF0YSkge1xuICAgICAgICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQ7XG5cbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiZ2V0T3B0aW9uc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwbGFjZW1lbnQ6IF90aGlzLnByb3BzLnBsYWNlbWVudCxcbiAgICAgICAgZXZlbnRzRW5hYmxlZDogX3RoaXMucHJvcHMuZXZlbnRzRW5hYmxlZCxcbiAgICAgICAgcG9zaXRpb25GaXhlZDogX3RoaXMucHJvcHMucG9zaXRpb25GaXhlZCxcbiAgICAgICAgbW9kaWZpZXJzOiBfZXh0ZW5kcyh7fSwgX3RoaXMucHJvcHMubW9kaWZpZXJzLCB7XG4gICAgICAgICAgYXJyb3c6IF9leHRlbmRzKHt9LCBfdGhpcy5wcm9wcy5tb2RpZmllcnMgJiYgX3RoaXMucHJvcHMubW9kaWZpZXJzLmFycm93LCB7XG4gICAgICAgICAgICBlbmFibGVkOiAhIV90aGlzLmFycm93Tm9kZSxcbiAgICAgICAgICAgIGVsZW1lbnQ6IF90aGlzLmFycm93Tm9kZVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGFwcGx5U3R5bGU6IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1cGRhdGVTdGF0ZU1vZGlmaWVyOiBfdGhpcy51cGRhdGVTdGF0ZU1vZGlmaWVyXG4gICAgICAgIH0pXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcImdldFBvcHBlclN0eWxlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAhX3RoaXMucG9wcGVyTm9kZSB8fCAhX3RoaXMuc3RhdGUuZGF0YSA/IGluaXRpYWxTdHlsZSA6IF9leHRlbmRzKHtcbiAgICAgICAgcG9zaXRpb246IF90aGlzLnN0YXRlLmRhdGEub2Zmc2V0cy5wb3BwZXIucG9zaXRpb25cbiAgICAgIH0sIF90aGlzLnN0YXRlLmRhdGEuc3R5bGVzKTtcbiAgICB9KTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJnZXRQb3BwZXJQbGFjZW1lbnRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICFfdGhpcy5zdGF0ZS5kYXRhID8gdW5kZWZpbmVkIDogX3RoaXMuc3RhdGUucGxhY2VtZW50O1xuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcImdldEFycm93U3R5bGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICFfdGhpcy5hcnJvd05vZGUgfHwgIV90aGlzLnN0YXRlLmRhdGEgPyBpbml0aWFsQXJyb3dTdHlsZSA6IF90aGlzLnN0YXRlLmRhdGEuYXJyb3dTdHlsZXM7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiZ2V0T3V0T2ZCb3VuZGFyaWVzU3RhdGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnN0YXRlLmRhdGEgPyBfdGhpcy5zdGF0ZS5kYXRhLmhpZGUgOiB1bmRlZmluZWQ7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiZGVzdHJveVBvcHBlckluc3RhbmNlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghX3RoaXMucG9wcGVySW5zdGFuY2UpIHJldHVybjtcblxuICAgICAgX3RoaXMucG9wcGVySW5zdGFuY2UuZGVzdHJveSgpO1xuXG4gICAgICBfdGhpcy5wb3BwZXJJbnN0YW5jZSA9IG51bGw7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwidXBkYXRlUG9wcGVySW5zdGFuY2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuZGVzdHJveVBvcHBlckluc3RhbmNlKCk7XG5cbiAgICAgIHZhciBfYXNzZXJ0VGhpc0luaXRpYWxpemUgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSxcbiAgICAgICAgICBwb3BwZXJOb2RlID0gX2Fzc2VydFRoaXNJbml0aWFsaXplLnBvcHBlck5vZGU7XG5cbiAgICAgIHZhciByZWZlcmVuY2VFbGVtZW50ID0gX3RoaXMucHJvcHMucmVmZXJlbmNlRWxlbWVudDtcbiAgICAgIGlmICghcmVmZXJlbmNlRWxlbWVudCB8fCAhcG9wcGVyTm9kZSkgcmV0dXJuO1xuICAgICAgX3RoaXMucG9wcGVySW5zdGFuY2UgPSBuZXcgUG9wcGVySlMocmVmZXJlbmNlRWxlbWVudCwgcG9wcGVyTm9kZSwgX3RoaXMuZ2V0T3B0aW9ucygpKTtcbiAgICB9KTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJzY2hlZHVsZVVwZGF0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoX3RoaXMucG9wcGVySW5zdGFuY2UpIHtcbiAgICAgICAgX3RoaXMucG9wcGVySW5zdGFuY2Uuc2NoZWR1bGVVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBJbm5lclBvcHBlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIC8vIElmIHRoZSBQb3BwZXIuanMgb3B0aW9ucyBoYXZlIGNoYW5nZWQsIHVwZGF0ZSB0aGUgaW5zdGFuY2UgKGRlc3Ryb3kgKyBjcmVhdGUpXG4gICAgaWYgKHRoaXMucHJvcHMucGxhY2VtZW50ICE9PSBwcmV2UHJvcHMucGxhY2VtZW50IHx8IHRoaXMucHJvcHMucmVmZXJlbmNlRWxlbWVudCAhPT0gcHJldlByb3BzLnJlZmVyZW5jZUVsZW1lbnQgfHwgdGhpcy5wcm9wcy5wb3NpdGlvbkZpeGVkICE9PSBwcmV2UHJvcHMucG9zaXRpb25GaXhlZCB8fCAhZGVlcEVxdWFsKHRoaXMucHJvcHMubW9kaWZpZXJzLCBwcmV2UHJvcHMubW9kaWZpZXJzLCB7XG4gICAgICBzdHJpY3Q6IHRydWVcbiAgICB9KSkge1xuICAgICAgLy8gZGV2ZWxvcCBvbmx5IGNoZWNrIHRoYXQgbW9kaWZpZXJzIGlzbid0IGJlaW5nIHVwZGF0ZWQgbmVlZGxlc3NseVxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubW9kaWZpZXJzICE9PSBwcmV2UHJvcHMubW9kaWZpZXJzICYmIHRoaXMucHJvcHMubW9kaWZpZXJzICE9IG51bGwgJiYgcHJldlByb3BzLm1vZGlmaWVycyAhPSBudWxsICYmIHNoYWxsb3dFcXVhbCh0aGlzLnByb3BzLm1vZGlmaWVycywgcHJldlByb3BzLm1vZGlmaWVycykpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCInbW9kaWZpZXJzJyBwcm9wIHJlZmVyZW5jZSB1cGRhdGVkIGV2ZW4gdGhvdWdoIGFsbCB2YWx1ZXMgYXBwZWFyIHRoZSBzYW1lLlxcbkNvbnNpZGVyIG1lbW9pemluZyB0aGUgJ21vZGlmaWVycycgb2JqZWN0IHRvIGF2b2lkIG5lZWRsZXNzIHJlbmRlcmluZy5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy51cGRhdGVQb3BwZXJJbnN0YW5jZSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5ldmVudHNFbmFibGVkICE9PSBwcmV2UHJvcHMuZXZlbnRzRW5hYmxlZCAmJiB0aGlzLnBvcHBlckluc3RhbmNlKSB7XG4gICAgICB0aGlzLnByb3BzLmV2ZW50c0VuYWJsZWQgPyB0aGlzLnBvcHBlckluc3RhbmNlLmVuYWJsZUV2ZW50TGlzdGVuZXJzKCkgOiB0aGlzLnBvcHBlckluc3RhbmNlLmRpc2FibGVFdmVudExpc3RlbmVycygpO1xuICAgIH0gLy8gQSBwbGFjZW1lbnQgZGlmZmVyZW5jZSBpbiBzdGF0ZSBtZWFucyBwb3BwZXIgZGV0ZXJtaW5lZCBhIG5ldyBwbGFjZW1lbnRcbiAgICAvLyBhcGFydCBmcm9tIHRoZSBwcm9wcyB2YWx1ZS4gQnkgdGhlIHRpbWUgdGhlIHBvcHBlciBlbGVtZW50IGlzIHJlbmRlcmVkIHdpdGhcbiAgICAvLyB0aGUgbmV3IHBvc2l0aW9uIFBvcHBlciBoYXMgYWxyZWFkeSBtZWFzdXJlZCBpdCwgaWYgdGhlIHBsYWNlIGNoYW5nZSB0cmlnZ2Vyc1xuICAgIC8vIGEgc2l6ZSBjaGFuZ2UgaXQgd2lsbCByZXN1bHQgaW4gYSBtaXNhbGlnbmVkIHBvcHBlci4gU28gd2Ugc2NoZWR1bGUgYW4gdXBkYXRlIHRvIGJlIHN1cmUuXG5cblxuICAgIGlmIChwcmV2U3RhdGUucGxhY2VtZW50ICE9PSB0aGlzLnN0YXRlLnBsYWNlbWVudCkge1xuICAgICAgdGhpcy5zY2hlZHVsZVVwZGF0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBzZXRSZWYodGhpcy5wcm9wcy5pbm5lclJlZiwgbnVsbCk7XG4gICAgdGhpcy5kZXN0cm95UG9wcGVySW5zdGFuY2UoKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB1bndyYXBBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKSh7XG4gICAgICByZWY6IHRoaXMuc2V0UG9wcGVyTm9kZSxcbiAgICAgIHN0eWxlOiB0aGlzLmdldFBvcHBlclN0eWxlKCksXG4gICAgICBwbGFjZW1lbnQ6IHRoaXMuZ2V0UG9wcGVyUGxhY2VtZW50KCksXG4gICAgICBvdXRPZkJvdW5kYXJpZXM6IHRoaXMuZ2V0T3V0T2ZCb3VuZGFyaWVzU3RhdGUoKSxcbiAgICAgIHNjaGVkdWxlVXBkYXRlOiB0aGlzLnNjaGVkdWxlVXBkYXRlLFxuICAgICAgYXJyb3dQcm9wczoge1xuICAgICAgICByZWY6IHRoaXMuc2V0QXJyb3dOb2RlLFxuICAgICAgICBzdHlsZTogdGhpcy5nZXRBcnJvd1N0eWxlKClcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gSW5uZXJQb3BwZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbl9kZWZpbmVQcm9wZXJ0eShJbm5lclBvcHBlciwgXCJkZWZhdWx0UHJvcHNcIiwge1xuICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICBldmVudHNFbmFibGVkOiB0cnVlLFxuICByZWZlcmVuY2VFbGVtZW50OiB1bmRlZmluZWQsXG4gIHBvc2l0aW9uRml4ZWQ6IGZhbHNlXG59KTtcblxudmFyIHBsYWNlbWVudHMgPSBQb3BwZXJKUy5wbGFjZW1lbnRzO1xuZXhwb3J0IHsgcGxhY2VtZW50cyB9O1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUG9wcGVyKF9yZWYpIHtcbiAgdmFyIHJlZmVyZW5jZUVsZW1lbnQgPSBfcmVmLnJlZmVyZW5jZUVsZW1lbnQsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcInJlZmVyZW5jZUVsZW1lbnRcIl0pO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1hbmFnZXJSZWZlcmVuY2VOb2RlQ29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKHJlZmVyZW5jZU5vZGUpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChJbm5lclBvcHBlciwgX2V4dGVuZHMoe1xuICAgICAgcmVmZXJlbmNlRWxlbWVudDogcmVmZXJlbmNlRWxlbWVudCAhPT0gdW5kZWZpbmVkID8gcmVmZXJlbmNlRWxlbWVudCA6IHJlZmVyZW5jZU5vZGVcbiAgICB9LCBwcm9wcykpO1xuICB9KTtcbn0iLCIvKipcbiAqIFRha2VzIGFuIGFyZ3VtZW50IGFuZCBpZiBpdCdzIGFuIGFycmF5LCByZXR1cm5zIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBhcnJheSxcbiAqIG90aGVyd2lzZSByZXR1cm5zIHRoZSBhcmd1bWVudC4gVXNlZCBmb3IgUHJlYWN0IGNvbXBhdGliaWxpdHkuXG4gKi9cbmV4cG9ydCB2YXIgdW53cmFwQXJyYXkgPSBmdW5jdGlvbiB1bndyYXBBcnJheShhcmcpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJnKSA/IGFyZ1swXSA6IGFyZztcbn07XG4vKipcbiAqIFRha2VzIGEgbWF5YmUtdW5kZWZpbmVkIGZ1bmN0aW9uIGFuZCBhcmJpdHJhcnkgYXJncyBhbmQgaW52b2tlcyB0aGUgZnVuY3Rpb25cbiAqIG9ubHkgaWYgaXQgaXMgZGVmaW5lZC5cbiAqL1xuXG5leHBvcnQgdmFyIHNhZmVJbnZva2UgPSBmdW5jdGlvbiBzYWZlSW52b2tlKGZuKSB7XG4gIGlmICh0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBmbi5hcHBseSh2b2lkIDAsIGFyZ3MpO1xuICB9XG59O1xuLyoqXG4gKiBEb2VzIGEgc2hhbGxvdyBlcXVhbGl0eSBjaGVjayBvZiB0d28gb2JqZWN0cyBieSBjb21wYXJpbmcgdGhlIHJlZmVyZW5jZVxuICogZXF1YWxpdHkgb2YgZWFjaCB2YWx1ZS5cbiAqL1xuXG5leHBvcnQgdmFyIHNoYWxsb3dFcXVhbCA9IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIHZhciBhS2V5cyA9IE9iamVjdC5rZXlzKG9iakEpO1xuICB2YXIgYktleXMgPSBPYmplY3Qua2V5cyhvYmpCKTtcblxuICBpZiAoYktleXMubGVuZ3RoICE9PSBhS2V5cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGFLZXlzW2ldO1xuXG4gICAgaWYgKG9iakFba2V5XSAhPT0gb2JqQltrZXldKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuLyoqXG4gKiBTZXRzIGEgcmVmIHVzaW5nIGVpdGhlciBhIHJlZiBjYWxsYmFjayBvciBhIHJlZiBvYmplY3RcbiAqL1xuXG5leHBvcnQgdmFyIHNldFJlZiA9IGZ1bmN0aW9uIHNldFJlZihyZWYsIG5vZGUpIHtcbiAgLy8gaWYgaXRzIGEgZnVuY3Rpb24gY2FsbCBpdFxuICBpZiAodHlwZW9mIHJlZiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHNhZmVJbnZva2UocmVmLCBub2RlKTtcbiAgfSAvLyBvdGhlcndpc2Ugd2Ugc2hvdWxkIHRyZWF0IGl0IGFzIGEgcmVmIG9iamVjdFxuICBlbHNlIGlmIChyZWYgIT0gbnVsbCkge1xuICAgICAgcmVmLmN1cnJlbnQgPSBub2RlO1xuICAgIH1cbn07IiwiLy8gUHVibGljIGNvbXBvbmVudHNcbmltcG9ydCBQb3BwZXIsIHsgcGxhY2VtZW50cyB9IGZyb20gJy4vUG9wcGVyJztcbmltcG9ydCBNYW5hZ2VyIGZyb20gJy4vTWFuYWdlcic7XG5pbXBvcnQgUmVmZXJlbmNlIGZyb20gJy4vUmVmZXJlbmNlJztcbmV4cG9ydCB7IFBvcHBlciwgcGxhY2VtZW50cywgTWFuYWdlciwgUmVmZXJlbmNlIH07IC8vIFB1YmxpYyB0eXBlcyIsImltcG9ydCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiO1xuaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2VcIjtcbmltcG9ydCBfZGVmaW5lUHJvcGVydHkgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHlcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVDb250ZXh0IGZyb20gJ2NyZWF0ZS1yZWFjdC1jb250ZXh0JztcbmV4cG9ydCB2YXIgTWFuYWdlclJlZmVyZW5jZU5vZGVDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuZXhwb3J0IHZhciBNYW5hZ2VyUmVmZXJlbmNlTm9kZVNldHRlckNvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbnZhciBNYW5hZ2VyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKE1hbmFnZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIE1hbmFnZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwicmVmZXJlbmNlTm9kZVwiLCB2b2lkIDApO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcInNldFJlZmVyZW5jZU5vZGVcIiwgZnVuY3Rpb24gKG5ld1JlZmVyZW5jZU5vZGUpIHtcbiAgICAgIGlmIChuZXdSZWZlcmVuY2VOb2RlICYmIF90aGlzLnJlZmVyZW5jZU5vZGUgIT09IG5ld1JlZmVyZW5jZU5vZGUpIHtcbiAgICAgICAgX3RoaXMucmVmZXJlbmNlTm9kZSA9IG5ld1JlZmVyZW5jZU5vZGU7XG5cbiAgICAgICAgX3RoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBNYW5hZ2VyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnJlZmVyZW5jZU5vZGUgPSBudWxsO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWFuYWdlclJlZmVyZW5jZU5vZGVDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICB2YWx1ZTogdGhpcy5yZWZlcmVuY2VOb2RlXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChNYW5hZ2VyUmVmZXJlbmNlTm9kZVNldHRlckNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgIHZhbHVlOiB0aGlzLnNldFJlZmVyZW5jZU5vZGVcbiAgICB9LCB0aGlzLnByb3BzLmNoaWxkcmVuKSk7XG4gIH07XG5cbiAgcmV0dXJuIE1hbmFnZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmV4cG9ydCB7IE1hbmFnZXIgYXMgZGVmYXVsdCB9OyIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzXCI7XG5pbXBvcnQgX2Fzc2VydFRoaXNJbml0aWFsaXplZCBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIjtcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c0xvb3NlXCI7XG5pbXBvcnQgX2RlZmluZVByb3BlcnR5IGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcbmltcG9ydCB7IE1hbmFnZXJSZWZlcmVuY2VOb2RlU2V0dGVyQ29udGV4dCB9IGZyb20gJy4vTWFuYWdlcic7XG5pbXBvcnQgeyBzYWZlSW52b2tlLCB1bndyYXBBcnJheSwgc2V0UmVmIH0gZnJvbSAnLi91dGlscyc7XG5cbnZhciBJbm5lclJlZmVyZW5jZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShJbm5lclJlZmVyZW5jZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gSW5uZXJSZWZlcmVuY2UoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwicmVmSGFuZGxlclwiLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgc2V0UmVmKF90aGlzLnByb3BzLmlubmVyUmVmLCBub2RlKTtcbiAgICAgIHNhZmVJbnZva2UoX3RoaXMucHJvcHMuc2V0UmVmZXJlbmNlTm9kZSwgbm9kZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gSW5uZXJSZWZlcmVuY2UucHJvdG90eXBlO1xuXG4gIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHNldFJlZih0aGlzLnByb3BzLmlubmVyUmVmLCBudWxsKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHdhcm5pbmcoQm9vbGVhbih0aGlzLnByb3BzLnNldFJlZmVyZW5jZU5vZGUpLCAnYFJlZmVyZW5jZWAgc2hvdWxkIG5vdCBiZSB1c2VkIG91dHNpZGUgb2YgYSBgTWFuYWdlcmAgY29tcG9uZW50LicpO1xuICAgIHJldHVybiB1bndyYXBBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKSh7XG4gICAgICByZWY6IHRoaXMucmVmSGFuZGxlclxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBJbm5lclJlZmVyZW5jZTtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVmZXJlbmNlKHByb3BzKSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1hbmFnZXJSZWZlcmVuY2VOb2RlU2V0dGVyQ29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKHNldFJlZmVyZW5jZU5vZGUpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChJbm5lclJlZmVyZW5jZSwgX2V4dGVuZHMoe1xuICAgICAgc2V0UmVmZXJlbmNlTm9kZTogc2V0UmVmZXJlbmNlTm9kZVxuICAgIH0sIHByb3BzKSk7XG4gIH0pO1xufSJdLCJzb3VyY2VSb290IjoiIn0=
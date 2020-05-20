(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.react-transition-group"],{

/***/ "1w3K":
/*!******************************************************!*\
  !*** ./node_modules/react-transition-group/index.js ***!
  \******************************************************/
/*! no static exports found */
/*! exports used: Transition */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _CSSTransition = _interopRequireDefault(__webpack_require__(/*! ./CSSTransition */ "Si88"));

var _ReplaceTransition = _interopRequireDefault(__webpack_require__(/*! ./ReplaceTransition */ "PAGr"));

var _TransitionGroup = _interopRequireDefault(__webpack_require__(/*! ./TransitionGroup */ "UnXY"));

var _Transition = _interopRequireDefault(__webpack_require__(/*! ./Transition */ "S3Uj"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = {
  Transition: _Transition.default,
  TransitionGroup: _TransitionGroup.default,
  ReplaceTransition: _ReplaceTransition.default,
  CSSTransition: _CSSTransition.default
};

/***/ }),

/***/ "8PcY":
/*!*******************************************************************!*\
  !*** ./node_modules/react-transition-group/utils/ChildMapping.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;
exports.getInitialChildMapping = getInitialChildMapping;
exports.getNextChildMapping = getNextChildMapping;

var _react = __webpack_require__(/*! react */ "q1tI");
/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */


function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && (0, _react.isValidElement)(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) _react.Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}
/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */


function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  } // For each key of `next`, the list of keys to insert before that key in
  // the combined list


  var nextKeysPending = Object.create(null);
  var pendingKeys = [];

  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i;
  var childMapping = {};

  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }

    childMapping[nextKey] = getValueForKey(nextKey);
  } // Finally, add the keys which didn't appear before any key in `next`


  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}

function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function (child) {
    return (0, _react.cloneElement)(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, 'appear', props),
      enter: getProp(child, 'enter', props),
      exit: getProp(child, 'exit', props)
    });
  });
}

function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function (key) {
    var child = children[key];
    if (!(0, _react.isValidElement)(child)) return;
    var hasPrev = (key in prevChildMapping);
    var hasNext = (key in nextChildMapping);
    var prevChild = prevChildMapping[key];
    var isLeaving = (0, _react.isValidElement)(prevChild) && !prevChild.props.in; // item is new (entering)

    if (hasNext && (!hasPrev || isLeaving)) {
      // console.log('entering', key)
      children[key] = (0, _react.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      // item is old (exiting)
      // console.log('leaving', key)
      children[key] = (0, _react.cloneElement)(child, {
        in: false
      });
    } else if (hasNext && hasPrev && (0, _react.isValidElement)(prevChild)) {
      // item hasn't changed transition states
      // copy over the last transition props;
      // console.log('unchanged', key)
      children[key] = (0, _react.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    }
  });
  return children;
}

/***/ }),

/***/ "PAGr":
/*!******************************************************************!*\
  !*** ./node_modules/react-transition-group/ReplaceTransition.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "17x9"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "q1tI"));

var _reactDom = __webpack_require__(/*! react-dom */ "i8i4");

var _TransitionGroup = _interopRequireDefault(__webpack_require__(/*! ./TransitionGroup */ "UnXY"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
/**
 * The `<ReplaceTransition>` component is a specialized `Transition` component
 * that animates between two children.
 *
 * ```jsx
 * <ReplaceTransition in>
 *   <Fade><div>I appear first</div></Fade>
 *   <Fade><div>I replace the above</div></Fade>
 * </ReplaceTransition>
 * ```
 */


var ReplaceTransition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ReplaceTransition, _React$Component);

  function ReplaceTransition() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;

    _this.handleEnter = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _this.handleLifecycle('onEnter', 0, args);
    };

    _this.handleEntering = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _this.handleLifecycle('onEntering', 0, args);
    };

    _this.handleEntered = function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _this.handleLifecycle('onEntered', 0, args);
    };

    _this.handleExit = function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return _this.handleLifecycle('onExit', 1, args);
    };

    _this.handleExiting = function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return _this.handleLifecycle('onExiting', 1, args);
    };

    _this.handleExited = function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return _this.handleLifecycle('onExited', 1, args);
    };

    return _this;
  }

  var _proto = ReplaceTransition.prototype;

  _proto.handleLifecycle = function handleLifecycle(handler, idx, originalArgs) {
    var _child$props;

    var children = this.props.children;

    var child = _react.default.Children.toArray(children)[idx];

    if (child.props[handler]) (_child$props = child.props)[handler].apply(_child$props, originalArgs);
    if (this.props[handler]) this.props[handler]((0, _reactDom.findDOMNode)(this));
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        inProp = _this$props.in,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "in"]);

    var _React$Children$toArr = _react.default.Children.toArray(children),
        first = _React$Children$toArr[0],
        second = _React$Children$toArr[1];

    delete props.onEnter;
    delete props.onEntering;
    delete props.onEntered;
    delete props.onExit;
    delete props.onExiting;
    delete props.onExited;
    return _react.default.createElement(_TransitionGroup.default, props, inProp ? _react.default.cloneElement(first, {
      key: 'first',
      onEnter: this.handleEnter,
      onEntering: this.handleEntering,
      onEntered: this.handleEntered
    }) : _react.default.cloneElement(second, {
      key: 'second',
      onEnter: this.handleExit,
      onEntering: this.handleExiting,
      onEntered: this.handleExited
    }));
  };

  return ReplaceTransition;
}(_react.default.Component);

ReplaceTransition.propTypes =  true ? {
  in: _propTypes.default.bool.isRequired,
  children: function children(props, propName) {
    if (_react.default.Children.count(props[propName]) !== 2) return new Error("\"" + propName + "\" must be exactly two transition components.");
    return null;
  }
} : undefined;
var _default = ReplaceTransition;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "S3Uj":
/*!***********************************************************!*\
  !*** ./node_modules/react-transition-group/Transition.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = void 0;

var PropTypes = _interopRequireWildcard(__webpack_require__(/*! prop-types */ "17x9"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "q1tI"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "i8i4"));

var _reactLifecyclesCompat = __webpack_require__(/*! react-lifecycles-compat */ "VCL8");

var _PropTypes = __webpack_require__(/*! ./utils/PropTypes */ "xfxO");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var UNMOUNTED = 'unmounted';
exports.UNMOUNTED = UNMOUNTED;
var EXITED = 'exited';
exports.EXITED = EXITED;
var ENTERING = 'entering';
exports.ENTERING = ENTERING;
var ENTERED = 'entered';
exports.ENTERED = ENTERED;
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 0 },
 *   entered:  { opacity: 1 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

exports.EXITING = EXITING;

var Transition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context.transitionGroup; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  var _proto = Transition.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      transitionGroup: null // allows for nested Transitions

    };
  };

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  }; // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }


  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      var node = _reactDom.default.findDOMNode(this);

      if (nextStatus === ENTERING) {
        this.performEnter(node, mounting);
      } else {
        this.performExit(node);
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(node, mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(node);
      });
      return;
    }

    this.props.onEnter(node, appearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(node, appearing);

      _this2.onTransitionEnd(node, enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(node, appearing);
        });
      });
    });
  };

  _proto.performExit = function performExit(node) {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts(); // no exit animation skip right to EXITED

    if (!exit) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(node);
      });
      return;
    }

    this.props.onExit(node);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(node);

      _this3.onTransitionEnd(node, timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(node);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
    this.setNextCallback(handler);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      this.props.addEndListener(node, this.nextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children,
        childProps = _objectWithoutPropertiesLoose(_this$props, ["children"]); // filter props for Transtition


    delete childProps.in;
    delete childProps.mountOnEnter;
    delete childProps.unmountOnExit;
    delete childProps.appear;
    delete childProps.enter;
    delete childProps.exit;
    delete childProps.timeout;
    delete childProps.addEndListener;
    delete childProps.onEnter;
    delete childProps.onEntering;
    delete childProps.onEntered;
    delete childProps.onExit;
    delete childProps.onExiting;
    delete childProps.onExited;

    if (typeof children === 'function') {
      return children(status, childProps);
    }

    var child = _react.default.Children.only(children);

    return _react.default.cloneElement(child, childProps);
  };

  return Transition;
}(_react.default.Component);

Transition.contextTypes = {
  transitionGroup: PropTypes.object
};
Transition.childContextTypes = {
  transitionGroup: function transitionGroup() {}
};
Transition.propTypes =  true ? {
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`, `'unmounted'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: PropTypes.bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
   * If you want to transition on the first mount set `appear` to `true`, and the
   * component will transition in as soon as the `<Transition>` mounts.
   *
   * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
   */
  appear: PropTypes.bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: PropTypes.bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: PropTypes.bool,

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = _PropTypes.timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return pt.apply(void 0, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. **Note:** Timeouts are still used as a fallback if provided.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: PropTypes.func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: PropTypes.func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: PropTypes.func // Name the function so it is clearer in the documentation

} : undefined;

function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = 0;
Transition.EXITED = 1;
Transition.ENTERING = 2;
Transition.ENTERED = 3;
Transition.EXITING = 4;

var _default = (0, _reactLifecyclesCompat.polyfill)(Transition);

exports.default = _default;

/***/ }),

/***/ "Si88":
/*!**************************************************************!*\
  !*** ./node_modules/react-transition-group/CSSTransition.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var PropTypes = _interopRequireWildcard(__webpack_require__(/*! prop-types */ "17x9"));

var _addClass = _interopRequireDefault(__webpack_require__(/*! dom-helpers/class/addClass */ "ycFn"));

var _removeClass = _interopRequireDefault(__webpack_require__(/*! dom-helpers/class/removeClass */ "VOcB"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "q1tI"));

var _Transition = _interopRequireDefault(__webpack_require__(/*! ./Transition */ "S3Uj"));

var _PropTypes = __webpack_require__(/*! ./utils/PropTypes */ "xfxO");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var addClass = function addClass(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return (0, _addClass.default)(node, c);
  });
};

var removeClass = function removeClass(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return (0, _removeClass.default)(node, c);
  });
};
/**
 * A transition component inspired by the excellent
 * [ng-animate](http://www.nganimate.org/) library, you should use it if you're
 * using CSS transitions or animations. It's built upon the
 * [`Transition`](https://reactcommunity.org/react-transition-group/transition)
 * component, so it inherits all of its props.
 *
 * `CSSTransition` applies a pair of class names during the `appear`, `enter`,
 * and `exit` states of the transition. The first class is applied and then a
 * second `*-active` class in order to activate the CSSS transition. After the
 * transition, matching `*-done` class names are applied to persist the
 * transition state.
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <CSSTransition in={inProp} timeout={200} classNames="my-node">
 *         <div>
 *           {"I'll receive my-node-* classes"}
 *         </div>
 *       </CSSTransition>
 *       <button type="button" onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the `in` prop is set to `true`, the child component will first receive
 * the class `example-enter`, then the `example-enter-active` will be added in
 * the next tick. `CSSTransition` [forces a
 * reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
 * between before adding the `example-enter-active`. This is an important trick
 * because it allows us to transition between `example-enter` and
 * `example-enter-active` even though they were added immediately one after
 * another. Most notably, this is what makes it possible for us to animate
 * _appearance_.
 *
 * ```css
 * .my-node-enter {
 *   opacity: 0;
 * }
 * .my-node-enter-active {
 *   opacity: 1;
 *   transition: opacity 200ms;
 * }
 * .my-node-exit {
 *   opacity: 1;
 * }
 * .my-node-exit-active {
 *   opacity: 0;
 *   transition: opacity: 200ms;
 * }
 * ```
 *
 * `*-active` classes represent which styles you want to animate **to**.
 */


var CSSTransition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CSSTransition, _React$Component);

  function CSSTransition() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.onEnter = function (node, appearing) {
      var _this$getClassNames = _this.getClassNames(appearing ? 'appear' : 'enter'),
          className = _this$getClassNames.className;

      _this.removeClasses(node, 'exit');

      addClass(node, className);

      if (_this.props.onEnter) {
        _this.props.onEnter(node, appearing);
      }
    };

    _this.onEntering = function (node, appearing) {
      var _this$getClassNames2 = _this.getClassNames(appearing ? 'appear' : 'enter'),
          activeClassName = _this$getClassNames2.activeClassName;

      _this.reflowAndAddClass(node, activeClassName);

      if (_this.props.onEntering) {
        _this.props.onEntering(node, appearing);
      }
    };

    _this.onEntered = function (node, appearing) {
      var appearClassName = _this.getClassNames('appear').doneClassName;

      var enterClassName = _this.getClassNames('enter').doneClassName;

      var doneClassName = appearing ? appearClassName + " " + enterClassName : enterClassName;

      _this.removeClasses(node, appearing ? 'appear' : 'enter');

      addClass(node, doneClassName);

      if (_this.props.onEntered) {
        _this.props.onEntered(node, appearing);
      }
    };

    _this.onExit = function (node) {
      var _this$getClassNames3 = _this.getClassNames('exit'),
          className = _this$getClassNames3.className;

      _this.removeClasses(node, 'appear');

      _this.removeClasses(node, 'enter');

      addClass(node, className);

      if (_this.props.onExit) {
        _this.props.onExit(node);
      }
    };

    _this.onExiting = function (node) {
      var _this$getClassNames4 = _this.getClassNames('exit'),
          activeClassName = _this$getClassNames4.activeClassName;

      _this.reflowAndAddClass(node, activeClassName);

      if (_this.props.onExiting) {
        _this.props.onExiting(node);
      }
    };

    _this.onExited = function (node) {
      var _this$getClassNames5 = _this.getClassNames('exit'),
          doneClassName = _this$getClassNames5.doneClassName;

      _this.removeClasses(node, 'exit');

      addClass(node, doneClassName);

      if (_this.props.onExited) {
        _this.props.onExited(node);
      }
    };

    _this.getClassNames = function (type) {
      var classNames = _this.props.classNames;
      var isStringClassNames = typeof classNames === 'string';
      var prefix = isStringClassNames && classNames ? classNames + '-' : '';
      var className = isStringClassNames ? prefix + type : classNames[type];
      var activeClassName = isStringClassNames ? className + '-active' : classNames[type + 'Active'];
      var doneClassName = isStringClassNames ? className + '-done' : classNames[type + 'Done'];
      return {
        className: className,
        activeClassName: activeClassName,
        doneClassName: doneClassName
      };
    };

    return _this;
  }

  var _proto = CSSTransition.prototype;

  _proto.removeClasses = function removeClasses(node, type) {
    var _this$getClassNames6 = this.getClassNames(type),
        className = _this$getClassNames6.className,
        activeClassName = _this$getClassNames6.activeClassName,
        doneClassName = _this$getClassNames6.doneClassName;

    className && removeClass(node, className);
    activeClassName && removeClass(node, activeClassName);
    doneClassName && removeClass(node, doneClassName);
  };

  _proto.reflowAndAddClass = function reflowAndAddClass(node, className) {
    // This is for to force a repaint,
    // which is necessary in order to transition styles when adding a class name.
    if (className) {
      /* eslint-disable no-unused-expressions */
      node && node.scrollTop;
      /* eslint-enable no-unused-expressions */

      addClass(node, className);
    }
  };

  _proto.render = function render() {
    var props = _extends({}, this.props);

    delete props.classNames;
    return _react.default.createElement(_Transition.default, _extends({}, props, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  };

  return CSSTransition;
}(_react.default.Component);

CSSTransition.defaultProps = {
  classNames: ''
};
CSSTransition.propTypes =  true ? _extends({}, _Transition.default.propTypes, {
  /**
   * The animation classNames applied to the component as it enters, exits or
   * has finished the transition. A single name can be provided and it will be
   * suffixed for each stage: e.g.
   *
   * `classNames="fade"` applies `fade-enter`, `fade-enter-active`,
   * `fade-enter-done`, `fade-exit`, `fade-exit-active`, `fade-exit-done`,
   * `fade-appear`, `fade-appear-active`, and `fade-appear-done`.
   *
   * **Note**: `fade-appear-done` and `fade-enter-done` will _both_ be applied.
   * This allows you to define different behavior for when appearing is done and
   * when regular entering is done, using selectors like
   * `.fade-enter-done:not(.fade-appear-done)`. For example, you could apply an
   * epic entrance animation when element first appears in the DOM using
   * [Animate.css](https://daneden.github.io/animate.css/). Otherwise you can
   * simply use `fade-enter-done` for defining both cases.
   *
   * Each individual classNames can also be specified independently like:
   *
   * ```js
   * classNames={{
   *  appear: 'my-appear',
   *  appearActive: 'my-active-appear',
   *  appearDone: 'my-done-appear',
   *  enter: 'my-enter',
   *  enterActive: 'my-active-enter',
   *  enterDone: 'my-done-enter',
   *  exit: 'my-exit',
   *  exitActive: 'my-active-exit',
   *  exitDone: 'my-done-exit',
   * }}
   * ```
   *
   * If you want to set these classes using CSS Modules:
   *
   * ```js
   * import styles from './styles.css';
   * ```
   *
   * you might want to use camelCase in your CSS file, that way could simply
   * spread them instead of listing them one by one:
   *
   * ```js
   * classNames={{ ...styles }}
   * ```
   *
   * @type {string | {
   *  appear?: string,
   *  appearActive?: string,
   *  appearDone?: string,
   *  enter?: string,
   *  enterActive?: string,
   *  enterDone?: string,
   *  exit?: string,
   *  exitActive?: string,
   *  exitDone?: string,
   * }}
   */
  classNames: _PropTypes.classNamesShape,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or 'appear' class is
   * applied.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEnter: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter-active' or
   * 'appear-active' class is applied.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or
   * 'appear' classes are **removed** and the `done` class is added to the DOM node.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntered: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit' class is
   * applied.
   *
   * @type Function(node: HtmlElement)
   */
  onExit: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit-active' is applied.
   *
   * @type Function(node: HtmlElement)
   */
  onExiting: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit' classes
   * are **removed** and the `exit-done` class is added to the DOM node.
   *
   * @type Function(node: HtmlElement)
   */
  onExited: PropTypes.func
}) : undefined;
var _default = CSSTransition;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "UnXY":
/*!****************************************************************!*\
  !*** ./node_modules/react-transition-group/TransitionGroup.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "17x9"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "q1tI"));

var _reactLifecyclesCompat = __webpack_require__(/*! react-lifecycles-compat */ "VCL8");

var _ChildMapping = __webpack_require__(/*! ./utils/ChildMapping */ "8PcY");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var defaultProps = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }
  /**
   * The `<TransitionGroup>` component manages a set of transition components
   * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
   * components, `<TransitionGroup>` is a state machine for managing the mounting
   * and unmounting of components over time.
   *
   * Consider the example below. As items are removed or added to the TodoList the
   * `in` prop is toggled automatically by the `<TransitionGroup>`.
   *
   * Note that `<TransitionGroup>`  does not define any animation behavior!
   * Exactly _how_ a list item animates is up to the individual transition
   * component. This means you can mix and match animations across different list
   * items.
   */

};

var TransitionGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    var handleExited = _this.handleExited.bind(_assertThisInitialized(_assertThisInitialized(_this))); // Initial children should all be entering, dependent on appear


    _this.state = {
      handleExited: handleExited,
      firstRender: true
    };
    return _this;
  }

  var _proto = TransitionGroup.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      transitionGroup: {
        isMounting: !this.appeared
      }
    };
  };

  _proto.componentDidMount = function componentDidMount() {
    this.appeared = true;
    this.mounted = true;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children,
        handleExited = _ref.handleExited,
        firstRender = _ref.firstRender;
    return {
      children: firstRender ? (0, _ChildMapping.getInitialChildMapping)(nextProps, handleExited) : (0, _ChildMapping.getNextChildMapping)(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  };

  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = (0, _ChildMapping.getChildMapping)(this.props.children);
    if (child.key in currentChildMapping) return;

    if (child.props.onExited) {
      child.props.onExited(node);
    }

    if (this.mounted) {
      this.setState(function (state) {
        var children = _extends({}, state.children);

        delete children[child.key];
        return {
          children: children
        };
      });
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.component,
        childFactory = _this$props.childFactory,
        props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);

    var children = values(this.state.children).map(childFactory);
    delete props.appear;
    delete props.enter;
    delete props.exit;

    if (Component === null) {
      return children;
    }

    return _react.default.createElement(Component, props, children);
  };

  return TransitionGroup;
}(_react.default.Component);

TransitionGroup.childContextTypes = {
  transitionGroup: _propTypes.default.object.isRequired
};
TransitionGroup.propTypes =  true ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: _propTypes.default.any,

  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: _propTypes.default.node,

  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: _propTypes.default.bool,

  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: _propTypes.default.bool,

  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: _propTypes.default.bool,

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: _propTypes.default.func
} : undefined;
TransitionGroup.defaultProps = defaultProps;

var _default = (0, _reactLifecyclesCompat.polyfill)(TransitionGroup);

exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "xfxO":
/*!****************************************************************!*\
  !*** ./node_modules/react-transition-group/utils/PropTypes.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.classNamesShape = exports.timeoutsShape = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "17x9"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var timeoutsShape =  true ? _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
  enter: _propTypes.default.number,
  exit: _propTypes.default.number,
  appear: _propTypes.default.number
}).isRequired]) : undefined;
exports.timeoutsShape = timeoutsShape;
var classNamesShape =  true ? _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
  enter: _propTypes.default.string,
  exit: _propTypes.default.string,
  active: _propTypes.default.string
}), _propTypes.default.shape({
  enter: _propTypes.default.string,
  enterDone: _propTypes.default.string,
  enterActive: _propTypes.default.string,
  exit: _propTypes.default.string,
  exitDone: _propTypes.default.string,
  exitActive: _propTypes.default.string
})]) : undefined;
exports.classNamesShape = classNamesShape;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtdHJhbnNpdGlvbi1ncm91cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtdHJhbnNpdGlvbi1ncm91cC91dGlscy9DaGlsZE1hcHBpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAvUmVwbGFjZVRyYW5zaXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAvVHJhbnNpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtdHJhbnNpdGlvbi1ncm91cC9DU1NUcmFuc2l0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC10cmFuc2l0aW9uLWdyb3VwL1RyYW5zaXRpb25Hcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtdHJhbnNpdGlvbi1ncm91cC91dGlscy9Qcm9wVHlwZXMuanMiXSwibmFtZXMiOlsiX0NTU1RyYW5zaXRpb24iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9SZXBsYWNlVHJhbnNpdGlvbiIsIl9UcmFuc2l0aW9uR3JvdXAiLCJfVHJhbnNpdGlvbiIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwibW9kdWxlIiwiZXhwb3J0cyIsIlRyYW5zaXRpb24iLCJUcmFuc2l0aW9uR3JvdXAiLCJSZXBsYWNlVHJhbnNpdGlvbiIsIkNTU1RyYW5zaXRpb24iLCJnZXRDaGlsZE1hcHBpbmciLCJtZXJnZUNoaWxkTWFwcGluZ3MiLCJnZXRJbml0aWFsQ2hpbGRNYXBwaW5nIiwiZ2V0TmV4dENoaWxkTWFwcGluZyIsIl9yZWFjdCIsImNoaWxkcmVuIiwibWFwRm4iLCJtYXBwZXIiLCJjaGlsZCIsImlzVmFsaWRFbGVtZW50IiwicmVzdWx0IiwiT2JqZWN0IiwiY3JlYXRlIiwiQ2hpbGRyZW4iLCJtYXAiLCJjIiwiZm9yRWFjaCIsImtleSIsInByZXYiLCJuZXh0IiwiZ2V0VmFsdWVGb3JLZXkiLCJuZXh0S2V5c1BlbmRpbmciLCJwZW5kaW5nS2V5cyIsInByZXZLZXkiLCJsZW5ndGgiLCJwdXNoIiwiaSIsImNoaWxkTWFwcGluZyIsIm5leHRLZXkiLCJwZW5kaW5nTmV4dEtleSIsImdldFByb3AiLCJwcm9wIiwicHJvcHMiLCJvbkV4aXRlZCIsImNsb25lRWxlbWVudCIsImJpbmQiLCJpbiIsImFwcGVhciIsImVudGVyIiwiZXhpdCIsIm5leHRQcm9wcyIsInByZXZDaGlsZE1hcHBpbmciLCJuZXh0Q2hpbGRNYXBwaW5nIiwia2V5cyIsImhhc1ByZXYiLCJoYXNOZXh0IiwicHJldkNoaWxkIiwiaXNMZWF2aW5nIiwiX3Byb3BUeXBlcyIsIl9yZWFjdERvbSIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIiwic291cmNlIiwiZXhjbHVkZWQiLCJ0YXJnZXQiLCJzb3VyY2VLZXlzIiwiaW5kZXhPZiIsIl9pbmhlcml0c0xvb3NlIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJfX3Byb3RvX18iLCJfUmVhY3QkQ29tcG9uZW50IiwiX3RoaXMiLCJfbGVuIiwiYXJndW1lbnRzIiwiX2FyZ3MiLCJBcnJheSIsIl9rZXkiLCJjYWxsIiwiYXBwbHkiLCJjb25jYXQiLCJoYW5kbGVFbnRlciIsIl9sZW4yIiwiYXJncyIsIl9rZXkyIiwiaGFuZGxlTGlmZWN5Y2xlIiwiaGFuZGxlRW50ZXJpbmciLCJfbGVuMyIsIl9rZXkzIiwiaGFuZGxlRW50ZXJlZCIsIl9sZW40IiwiX2tleTQiLCJoYW5kbGVFeGl0IiwiX2xlbjUiLCJfa2V5NSIsImhhbmRsZUV4aXRpbmciLCJfbGVuNiIsIl9rZXk2IiwiaGFuZGxlRXhpdGVkIiwiX2xlbjciLCJfa2V5NyIsIl9wcm90byIsImhhbmRsZXIiLCJpZHgiLCJvcmlnaW5hbEFyZ3MiLCJfY2hpbGQkcHJvcHMiLCJ0b0FycmF5IiwiZmluZERPTU5vZGUiLCJyZW5kZXIiLCJfdGhpcyRwcm9wcyIsImluUHJvcCIsIl9SZWFjdCRDaGlsZHJlbiR0b0FyciIsImZpcnN0Iiwic2Vjb25kIiwib25FbnRlciIsIm9uRW50ZXJpbmciLCJvbkVudGVyZWQiLCJvbkV4aXQiLCJvbkV4aXRpbmciLCJjcmVhdGVFbGVtZW50IiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwicHJvY2VzcyIsImJvb2wiLCJpc1JlcXVpcmVkIiwicHJvcE5hbWUiLCJjb3VudCIsIkVycm9yIiwiX2RlZmF1bHQiLCJFWElUSU5HIiwiRU5URVJFRCIsIkVOVEVSSU5HIiwiRVhJVEVEIiwiVU5NT1VOVEVEIiwiUHJvcFR5cGVzIiwiX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQiLCJfcmVhY3RMaWZlY3ljbGVzQ29tcGF0IiwiX1Byb3BUeXBlcyIsIm5ld09iaiIsImhhc093blByb3BlcnR5IiwiZGVzYyIsImRlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0Iiwic2V0IiwiY29udGV4dCIsInBhcmVudEdyb3VwIiwidHJhbnNpdGlvbkdyb3VwIiwiaXNNb3VudGluZyIsImluaXRpYWxTdGF0dXMiLCJhcHBlYXJTdGF0dXMiLCJ1bm1vdW50T25FeGl0IiwibW91bnRPbkVudGVyIiwic3RhdGUiLCJzdGF0dXMiLCJuZXh0Q2FsbGJhY2siLCJnZXRDaGlsZENvbnRleHQiLCJnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMiLCJfcmVmIiwicHJldlN0YXRlIiwibmV4dEluIiwiY29tcG9uZW50RGlkTW91bnQiLCJ1cGRhdGVTdGF0dXMiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJuZXh0U3RhdHVzIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJjYW5jZWxOZXh0Q2FsbGJhY2siLCJnZXRUaW1lb3V0cyIsInRpbWVvdXQiLCJ1bmRlZmluZWQiLCJtb3VudGluZyIsIm5vZGUiLCJwZXJmb3JtRW50ZXIiLCJwZXJmb3JtRXhpdCIsInNldFN0YXRlIiwiX3RoaXMyIiwiYXBwZWFyaW5nIiwidGltZW91dHMiLCJlbnRlclRpbWVvdXQiLCJzYWZlU2V0U3RhdGUiLCJvblRyYW5zaXRpb25FbmQiLCJfdGhpczMiLCJjYW5jZWwiLCJuZXh0U3RhdGUiLCJjYWxsYmFjayIsInNldE5leHRDYWxsYmFjayIsIl90aGlzNCIsImFjdGl2ZSIsImV2ZW50IiwiZG9lc05vdEhhdmVUaW1lb3V0T3JMaXN0ZW5lciIsImFkZEVuZExpc3RlbmVyIiwic2V0VGltZW91dCIsImNoaWxkUHJvcHMiLCJvbmx5IiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiY2hpbGRDb250ZXh0VHlwZXMiLCJvbmVPZlR5cGUiLCJmdW5jIiwiZWxlbWVudCIsInB0IiwidGltZW91dHNTaGFwZSIsIm5vb3AiLCJkZWZhdWx0UHJvcHMiLCJwb2x5ZmlsbCIsIl9hZGRDbGFzcyIsIl9yZW1vdmVDbGFzcyIsIl9leHRlbmRzIiwiYXNzaWduIiwiYWRkQ2xhc3MiLCJjbGFzc2VzIiwic3BsaXQiLCJyZW1vdmVDbGFzcyIsIl90aGlzJGdldENsYXNzTmFtZXMiLCJnZXRDbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3NlcyIsIl90aGlzJGdldENsYXNzTmFtZXMyIiwiYWN0aXZlQ2xhc3NOYW1lIiwicmVmbG93QW5kQWRkQ2xhc3MiLCJhcHBlYXJDbGFzc05hbWUiLCJkb25lQ2xhc3NOYW1lIiwiZW50ZXJDbGFzc05hbWUiLCJfdGhpcyRnZXRDbGFzc05hbWVzMyIsIl90aGlzJGdldENsYXNzTmFtZXM0IiwiX3RoaXMkZ2V0Q2xhc3NOYW1lczUiLCJ0eXBlIiwiY2xhc3NOYW1lcyIsImlzU3RyaW5nQ2xhc3NOYW1lcyIsInByZWZpeCIsIl90aGlzJGdldENsYXNzTmFtZXM2Iiwic2Nyb2xsVG9wIiwiY2xhc3NOYW1lc1NoYXBlIiwiX0NoaWxkTWFwcGluZyIsIl9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQiLCJzZWxmIiwiUmVmZXJlbmNlRXJyb3IiLCJ2YWx1ZXMiLCJrIiwiY29tcG9uZW50IiwiY2hpbGRGYWN0b3J5IiwiZmlyc3RSZW5kZXIiLCJhcHBlYXJlZCIsIm1vdW50ZWQiLCJjdXJyZW50Q2hpbGRNYXBwaW5nIiwiYW55IiwibnVtYmVyIiwic2hhcGUiLCJzdHJpbmciLCJlbnRlckRvbmUiLCJlbnRlckFjdGl2ZSIsImV4aXREb25lIiwiZXhpdEFjdGl2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBYTs7QUFFYixJQUFJQSxjQUFjLEdBQUdDLHNCQUFzQixDQUFDQyxtQkFBTyxDQUFDLDZCQUFELENBQVIsQ0FBM0M7O0FBRUEsSUFBSUMsa0JBQWtCLEdBQUdGLHNCQUFzQixDQUFDQyxtQkFBTyxDQUFDLGlDQUFELENBQVIsQ0FBL0M7O0FBRUEsSUFBSUUsZ0JBQWdCLEdBQUdILHNCQUFzQixDQUFDQyxtQkFBTyxDQUFDLCtCQUFELENBQVIsQ0FBN0M7O0FBRUEsSUFBSUcsV0FBVyxHQUFHSixzQkFBc0IsQ0FBQ0MsbUJBQU8sQ0FBQywwQkFBRCxDQUFSLENBQXhDOztBQUVBLFNBQVNELHNCQUFULENBQWdDSyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFRSxXQUFPLEVBQUVGO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GRyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDZkMsWUFBVSxFQUFFTixXQUFXLENBQUNHLE9BRFQ7QUFFZkksaUJBQWUsRUFBRVIsZ0JBQWdCLENBQUNJLE9BRm5CO0FBR2ZLLG1CQUFpQixFQUFFVixrQkFBa0IsQ0FBQ0ssT0FIdkI7QUFJZk0sZUFBYSxFQUFFZCxjQUFjLENBQUNRO0FBSmYsQ0FBakIsQzs7Ozs7Ozs7Ozs7OztBQ1phOztBQUViRSxPQUFPLENBQUNILFVBQVIsR0FBcUIsSUFBckI7QUFDQUcsT0FBTyxDQUFDSyxlQUFSLEdBQTBCQSxlQUExQjtBQUNBTCxPQUFPLENBQUNNLGtCQUFSLEdB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WCxDQUFtQnVQLE1BSEw7QUFJM0J6TSxNQUFJLEVBQUVTLFVBQVUsQ0FBQ3ZELE9BQVgsQ0FBbUJ1UCxNQUpFO0FBSzNCRyxVQUFRLEVBQUVuTSxVQUFVLENBQUN2RCxPQUFYLENBQW1CdVAsTUFMRjtBQU0zQkksWUFBVSxFQUFFcE0sVUFBVSxDQUFDdkQsT0FBWCxDQUFtQnVQO0FBTkosQ0FBekIsQ0FKdUYsQ0FBN0IsQ0FBeEMsR0FXZixTQVhQO0FBWUFyUCxPQUFPLENBQUNxTyxlQUFSLEdBQTBCQSxlQUExQixDIiwiZmlsZSI6Im5wbS5yZWFjdC10cmFuc2l0aW9uLWdyb3VwLjBkNmU2ODY0YTY0ODU4MzAzZWZjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfQ1NTVHJhbnNpdGlvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vQ1NTVHJhbnNpdGlvblwiKSk7XG5cbnZhciBfUmVwbGFjZVRyYW5zaXRpb24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1JlcGxhY2VUcmFuc2l0aW9uXCIpKTtcblxudmFyIF9UcmFuc2l0aW9uR3JvdXAgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1RyYW5zaXRpb25Hcm91cFwiKSk7XG5cbnZhciBfVHJhbnNpdGlvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vVHJhbnNpdGlvblwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBUcmFuc2l0aW9uOiBfVHJhbnNpdGlvbi5kZWZhdWx0LFxuICBUcmFuc2l0aW9uR3JvdXA6IF9UcmFuc2l0aW9uR3JvdXAuZGVmYXVsdCxcbiAgUmVwbGFjZVRyYW5zaXRpb246IF9SZXBsYWNlVHJhbnNpdGlvbi5kZWZhdWx0LFxuICBDU1NUcmFuc2l0aW9uOiBfQ1NTVHJhbnNpdGlvbi5kZWZhdWx0XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5nZXRDaGlsZE1hcHBpbmcgPSBnZXRDaGlsZE1hcHBpbmc7XG5leHBvcnRzLm1lcmdlQ2hpbGRNYXBwaW5ncyA9IG1lcmdlQ2hpbGRNYXBwaW5ncztcbmV4cG9ydHMuZ2V0SW5pdGlhbENoaWxkTWFwcGluZyA9IGdldEluaXRpYWxDaGlsZE1hcHBpbmc7XG5leHBvcnRzLmdldE5leHRDaGlsZE1hcHBpbmcgPSBnZXROZXh0Q2hpbGRNYXBwaW5nO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG4vKipcbiAqIEdpdmVuIGB0aGlzLnByb3BzLmNoaWxkcmVuYCwgcmV0dXJuIGFuIG9iamVjdCBtYXBwaW5nIGtleSB0byBjaGlsZC5cbiAqXG4gKiBAcGFyYW0geyp9IGNoaWxkcmVuIGB0aGlzLnByb3BzLmNoaWxkcmVuYFxuICogQHJldHVybiB7b2JqZWN0fSBNYXBwaW5nIG9mIGtleSB0byBjaGlsZFxuICovXG5mdW5jdGlvbiBnZXRDaGlsZE1hcHBpbmcoY2hpbGRyZW4sIG1hcEZuKSB7XG4gIHZhciBtYXBwZXIgPSBmdW5jdGlvbiBtYXBwZXIoY2hpbGQpIHtcbiAgICByZXR1cm4gbWFwRm4gJiYgKDAsIF9yZWFjdC5pc1ZhbGlkRWxlbWVudCkoY2hpbGQpID8gbWFwRm4oY2hpbGQpIDogY2hpbGQ7XG4gIH07XG5cbiAgdmFyIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGlmIChjaGlsZHJlbikgX3JlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gYztcbiAgfSkuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAvLyBydW4gdGhlIG1hcCBmdW5jdGlvbiBoZXJlIGluc3RlYWQgc28gdGhhdCB0aGUga2V5IGlzIHRoZSBjb21wdXRlZCBvbmVcbiAgICByZXN1bHRbY2hpbGQua2V5XSA9IG1hcHBlcihjaGlsZCk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBXaGVuIHlvdSdyZSBhZGRpbmcgb3IgcmVtb3ZpbmcgY2hpbGRyZW4gc29tZSBtYXkgYmUgYWRkZWQgb3IgcmVtb3ZlZCBpbiB0aGVcbiAqIHNhbWUgcmVuZGVyIHBhc3MuIFdlIHdhbnQgdG8gc2hvdyAqYm90aCogc2luY2Ugd2Ugd2FudCB0byBzaW11bHRhbmVvdXNseVxuICogYW5pbWF0ZSBlbGVtZW50cyBpbiBhbmQgb3V0LiBUaGlzIGZ1bmN0aW9uIHRha2VzIGEgcHJldmlvdXMgc2V0IG9mIGtleXNcbiAqIGFuZCBhIG5ldyBzZXQgb2Yga2V5cyBhbmQgbWVyZ2VzIHRoZW0gd2l0aCBpdHMgYmVzdCBndWVzcyBvZiB0aGUgY29ycmVjdFxuICogb3JkZXJpbmcuIEluIHRoZSBmdXR1cmUgd2UgbWF5IGV4cG9zZSBzb21lIG9mIHRoZSB1dGlsaXRpZXMgaW5cbiAqIFJlYWN0TXVsdGlDaGlsZCB0byBtYWtlIHRoaXMgZWFzeSwgYnV0IGZvciBub3cgUmVhY3QgaXRzZWxmIGRvZXMgbm90XG4gKiBkaXJlY3RseSBoYXZlIHRoaXMgY29uY2VwdCBvZiB0aGUgdW5pb24gb2YgcHJldkNoaWxkcmVuIGFuZCBuZXh0Q2hpbGRyZW5cbiAqIHNvIHdlIGltcGxlbWVudCBpdCBoZXJlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmV2IHByZXYgY2hpbGRyZW4gYXMgcmV0dXJuZWQgZnJvbVxuICogYFJlYWN0VHJhbnNpdGlvbkNoaWxkTWFwcGluZy5nZXRDaGlsZE1hcHBpbmcoKWAuXG4gKiBAcGFyYW0ge29iamVjdH0gbmV4dCBuZXh0IGNoaWxkcmVuIGFzIHJldHVybmVkIGZyb21cbiAqIGBSZWFjdFRyYW5zaXRpb25DaGlsZE1hcHBpbmcuZ2V0Q2hpbGRNYXBwaW5nKClgLlxuICogQHJldHVybiB7b2JqZWN0fSBhIGtleSBzZXQgdGhhdCBjb250YWlucyBhbGwga2V5cyBpbiBgcHJldmAgYW5kIGFsbCBrZXlzXG4gKiBpbiBgbmV4dGAgaW4gYSByZWFzb25hYmxlIG9yZGVyLlxuICovXG5cblxuZnVuY3Rpb24gbWVyZ2VDaGlsZE1hcHBpbmdzKHByZXYsIG5leHQpIHtcbiAgcHJldiA9IHByZXYgfHwge307XG4gIG5leHQgPSBuZXh0IHx8IHt9O1xuXG4gIGZ1bmN0aW9uIGdldFZhbHVlRm9yS2V5KGtleSkge1xuICAgIHJldHVybiBrZXkgaW4gbmV4dCA/IG5leHRba2V5XSA6IHByZXZba2V5XTtcbiAgfSAvLyBGb3IgZWFjaCBrZXkgb2YgYG5leHRgLCB0aGUgbGlzdCBvZiBrZXlzIHRvIGluc2VydCBiZWZvcmUgdGhhdCBrZXkgaW5cbiAgLy8gdGhlIGNvbWJpbmVkIGxpc3RcblxuXG4gIHZhciBuZXh0S2V5c1BlbmRpbmcgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgcGVuZGluZ0tleXMgPSBbXTtcblxuICBmb3IgKHZhciBwcmV2S2V5IGluIHByZXYpIHtcbiAgICBpZiAocHJldktleSBpbiBuZXh0KSB7XG4gICAgICBpZiAocGVuZGluZ0tleXMubGVuZ3RoKSB7XG4gICAgICAgIG5leHRLZXlzUGVuZGluZ1twcmV2S2V5XSA9IHBlbmRpbmdLZXlzO1xuICAgICAgICBwZW5kaW5nS2V5cyA9IFtdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwZW5kaW5nS2V5cy5wdXNoKHByZXZLZXkpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpO1xuICB2YXIgY2hpbGRNYXBwaW5nID0ge307XG5cbiAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0KSB7XG4gICAgaWYgKG5leHRLZXlzUGVuZGluZ1tuZXh0S2V5XSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IG5leHRLZXlzUGVuZGluZ1tuZXh0S2V5XS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGVuZGluZ05leHRLZXkgPSBuZXh0S2V5c1BlbmRpbmdbbmV4dEtleV1baV07XG4gICAgICAgIGNoaWxkTWFwcGluZ1tuZXh0S2V5c1BlbmRpbmdbbmV4dEtleV1baV1dID0gZ2V0VmFsdWVGb3JLZXkocGVuZGluZ05leHRLZXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNoaWxkTWFwcGluZ1tuZXh0S2V5XSA9IGdldFZhbHVlRm9yS2V5KG5leHRLZXkpO1xuICB9IC8vIEZpbmFsbHksIGFkZCB0aGUga2V5cyB3aGljaCBkaWRuJ3QgYXBwZWFyIGJlZm9yZSBhbnkga2V5IGluIGBuZXh0YFxuXG5cbiAgZm9yIChpID0gMDsgaSA8IHBlbmRpbmdLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY2hpbGRNYXBwaW5nW3BlbmRpbmdLZXlzW2ldXSA9IGdldFZhbHVlRm9yS2V5KHBlbmRpbmdLZXlzW2ldKTtcbiAgfVxuXG4gIHJldHVybiBjaGlsZE1hcHBpbmc7XG59XG5cbmZ1bmN0aW9uIGdldFByb3AoY2hpbGQsIHByb3AsIHByb3BzKSB7XG4gIHJldHVybiBwcm9wc1twcm9wXSAhPSBudWxsID8gcHJvcHNbcHJvcF0gOiBjaGlsZC5wcm9wc1twcm9wXTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5pdGlhbENoaWxkTWFwcGluZyhwcm9wcywgb25FeGl0ZWQpIHtcbiAgcmV0dXJuIGdldENoaWxkTWFwcGluZyhwcm9wcy5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgcmV0dXJuICgwLCBfcmVhY3QuY2xvbmVFbGVtZW50KShjaGlsZCwge1xuICAgICAgb25FeGl0ZWQ6IG9uRXhpdGVkLmJpbmQobnVsbCwgY2hpbGQpLFxuICAgICAgaW46IHRydWUsXG4gICAgICBhcHBlYXI6IGdldFByb3AoY2hpbGQsICdhcHBlYXInLCBwcm9wcyksXG4gICAgICBlbnRlcjogZ2V0UHJvcChjaGlsZCwgJ2VudGVyJywgcHJvcHMpLFxuICAgICAgZXhpdDogZ2V0UHJvcChjaGlsZCwgJ2V4aXQnLCBwcm9wcylcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldE5leHRDaGlsZE1hcHBpbmcobmV4dFByb3BzLCBwcmV2Q2hpbGRNYXBwaW5nLCBvbkV4aXRlZCkge1xuICB2YXIgbmV4dENoaWxkTWFwcGluZyA9IGdldENoaWxkTWFwcGluZyhuZXh0UHJvcHMuY2hpbGRyZW4pO1xuICB2YXIgY2hpbGRyZW4gPSBtZXJnZUNoaWxkTWFwcGluZ3MocHJldkNoaWxkTWFwcGluZywgbmV4dENoaWxkTWFwcGluZyk7XG4gIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltrZXldO1xuICAgIGlmICghKDAsIF9yZWFjdC5pc1ZhbGlkRWxlbWVudCkoY2hpbGQpKSByZXR1cm47XG4gICAgdmFyIGhhc1ByZXYgPSBrZXkgaW4gcHJldkNoaWxkTWFwcGluZztcbiAgICB2YXIgaGFzTmV4dCA9IGtleSBpbiBuZXh0Q2hpbGRNYXBwaW5nO1xuICAgIHZhciBwcmV2Q2hpbGQgPSBwcmV2Q2hpbGRNYXBwaW5nW2tleV07XG4gICAgdmFyIGlzTGVhdmluZyA9ICgwLCBfcmVhY3QuaXNWYWxpZEVsZW1lbnQpKHByZXZDaGlsZCkgJiYgIXByZXZDaGlsZC5wcm9wcy5pbjsgLy8gaXRlbSBpcyBuZXcgKGVudGVyaW5nKVxuXG4gICAgaWYgKGhhc05leHQgJiYgKCFoYXNQcmV2IHx8IGlzTGVhdmluZykpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdlbnRlcmluZycsIGtleSlcbiAgICAgIGNoaWxkcmVuW2tleV0gPSAoMCwgX3JlYWN0LmNsb25lRWxlbWVudCkoY2hpbGQsIHtcbiAgICAgICAgb25FeGl0ZWQ6IG9uRXhpdGVkLmJpbmQobnVsbCwgY2hpbGQpLFxuICAgICAgICBpbjogdHJ1ZSxcbiAgICAgICAgZXhpdDogZ2V0UHJvcChjaGlsZCwgJ2V4aXQnLCBuZXh0UHJvcHMpLFxuICAgICAgICBlbnRlcjogZ2V0UHJvcChjaGlsZCwgJ2VudGVyJywgbmV4dFByb3BzKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghaGFzTmV4dCAmJiBoYXNQcmV2ICYmICFpc0xlYXZpbmcpIHtcbiAgICAgIC8vIGl0ZW0gaXMgb2xkIChleGl0aW5nKVxuICAgICAgLy8gY29uc29sZS5sb2coJ2xlYXZpbmcnLCBrZXkpXG4gICAgICBjaGlsZHJlbltrZXldID0gKDAsIF9yZWFjdC5jbG9uZUVsZW1lbnQpKGNoaWxkLCB7XG4gICAgICAgIGluOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChoYXNOZXh0ICYmIGhhc1ByZXYgJiYgKDAsIF9yZWFjdC5pc1ZhbGlkRWxlbWVudCkocHJldkNoaWxkKSkge1xuICAgICAgLy8gaXRlbSBoYXNuJ3QgY2hhbmdlZCB0cmFuc2l0aW9uIHN0YXRlc1xuICAgICAgLy8gY29weSBvdmVyIHRoZSBsYXN0IHRyYW5zaXRpb24gcHJvcHM7XG4gICAgICAvLyBjb25zb2xlLmxvZygndW5jaGFuZ2VkJywga2V5KVxuICAgICAgY2hpbGRyZW5ba2V5XSA9ICgwLCBfcmVhY3QuY2xvbmVFbGVtZW50KShjaGlsZCwge1xuICAgICAgICBvbkV4aXRlZDogb25FeGl0ZWQuYmluZChudWxsLCBjaGlsZCksXG4gICAgICAgIGluOiBwcmV2Q2hpbGQucHJvcHMuaW4sXG4gICAgICAgIGV4aXQ6IGdldFByb3AoY2hpbGQsICdleGl0JywgbmV4dFByb3BzKSxcbiAgICAgICAgZW50ZXI6IGdldFByb3AoY2hpbGQsICdlbnRlcicsIG5leHRQcm9wcylcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjaGlsZHJlbjtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9wcm9wVHlwZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpKTtcblxudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcblxudmFyIF9yZWFjdERvbSA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7XG5cbnZhciBfVHJhbnNpdGlvbkdyb3VwID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9UcmFuc2l0aW9uR3JvdXBcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7IGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9OyB2YXIgdGFyZ2V0ID0ge307IHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTsgdmFyIGtleSwgaTsgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHsga2V5ID0gc291cmNlS2V5c1tpXTsgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIFRoZSBgPFJlcGxhY2VUcmFuc2l0aW9uPmAgY29tcG9uZW50IGlzIGEgc3BlY2lhbGl6ZWQgYFRyYW5zaXRpb25gIGNvbXBvbmVudFxuICogdGhhdCBhbmltYXRlcyBiZXR3ZWVuIHR3byBjaGlsZHJlbi5cbiAqXG4gKiBgYGBqc3hcbiAqIDxSZXBsYWNlVHJhbnNpdGlvbiBpbj5cbiAqICAgPEZhZGU+PGRpdj5JIGFwcGVhciBmaXJzdDwvZGl2PjwvRmFkZT5cbiAqICAgPEZhZGU+PGRpdj5JIHJlcGxhY2UgdGhlIGFib3ZlPC9kaXY+PC9GYWRlPlxuICogPC9SZXBsYWNlVHJhbnNpdGlvbj5cbiAqIGBgYFxuICovXG52YXIgUmVwbGFjZVRyYW5zaXRpb24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoUmVwbGFjZVRyYW5zaXRpb24sIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFJlcGxhY2VUcmFuc2l0aW9uKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBfYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIF9hcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoX2FyZ3MpKSB8fCB0aGlzO1xuXG4gICAgX3RoaXMuaGFuZGxlRW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMuaGFuZGxlTGlmZWN5Y2xlKCdvbkVudGVyJywgMCwgYXJncyk7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUVudGVyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLmhhbmRsZUxpZmVjeWNsZSgnb25FbnRlcmluZycsIDAsIGFyZ3MpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVFbnRlcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40KSwgX2tleTQgPSAwOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTRdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLmhhbmRsZUxpZmVjeWNsZSgnb25FbnRlcmVkJywgMCwgYXJncyk7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUV4aXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjUpLCBfa2V5NSA9IDA7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMuaGFuZGxlTGlmZWN5Y2xlKCdvbkV4aXQnLCAxLCBhcmdzKTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlRXhpdGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNiksIF9rZXk2ID0gMDsgX2tleTYgPCBfbGVuNjsgX2tleTYrKykge1xuICAgICAgICBhcmdzW19rZXk2XSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpcy5oYW5kbGVMaWZlY3ljbGUoJ29uRXhpdGluZycsIDEsIGFyZ3MpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVFeGl0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjcpLCBfa2V5NyA9IDA7IF9rZXk3IDwgX2xlbjc7IF9rZXk3KyspIHtcbiAgICAgICAgYXJnc1tfa2V5N10gPSBhcmd1bWVudHNbX2tleTddO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMuaGFuZGxlTGlmZWN5Y2xlKCdvbkV4aXRlZCcsIDEsIGFyZ3MpO1xuICAgIH07XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gUmVwbGFjZVRyYW5zaXRpb24ucHJvdG90eXBlO1xuXG4gIF9wcm90by5oYW5kbGVMaWZlY3ljbGUgPSBmdW5jdGlvbiBoYW5kbGVMaWZlY3ljbGUoaGFuZGxlciwgaWR4LCBvcmlnaW5hbEFyZ3MpIHtcbiAgICB2YXIgX2NoaWxkJHByb3BzO1xuXG4gICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcblxuICAgIHZhciBjaGlsZCA9IF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pW2lkeF07XG5cbiAgICBpZiAoY2hpbGQucHJvcHNbaGFuZGxlcl0pIChfY2hpbGQkcHJvcHMgPSBjaGlsZC5wcm9wcylbaGFuZGxlcl0uYXBwbHkoX2NoaWxkJHByb3BzLCBvcmlnaW5hbEFyZ3MpO1xuICAgIGlmICh0aGlzLnByb3BzW2hhbmRsZXJdKSB0aGlzLnByb3BzW2hhbmRsZXJdKCgwLCBfcmVhY3REb20uZmluZERPTU5vZGUpKHRoaXMpKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyRwcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgIGNoaWxkcmVuID0gX3RoaXMkcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgIGluUHJvcCA9IF90aGlzJHByb3BzLmluLFxuICAgICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF90aGlzJHByb3BzLCBbXCJjaGlsZHJlblwiLCBcImluXCJdKTtcblxuICAgIHZhciBfUmVhY3QkQ2hpbGRyZW4kdG9BcnIgPSBfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKSxcbiAgICAgICAgZmlyc3QgPSBfUmVhY3QkQ2hpbGRyZW4kdG9BcnJbMF0sXG4gICAgICAgIHNlY29uZCA9IF9SZWFjdCRDaGlsZHJlbiR0b0FyclsxXTtcblxuICAgIGRlbGV0ZSBwcm9wcy5vbkVudGVyO1xuICAgIGRlbGV0ZSBwcm9wcy5vbkVudGVyaW5nO1xuICAgIGRlbGV0ZSBwcm9wcy5vbkVudGVyZWQ7XG4gICAgZGVsZXRlIHByb3BzLm9uRXhpdDtcbiAgICBkZWxldGUgcHJvcHMub25FeGl0aW5nO1xuICAgIGRlbGV0ZSBwcm9wcy5vbkV4aXRlZDtcbiAgICByZXR1cm4gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfVHJhbnNpdGlvbkdyb3VwLmRlZmF1bHQsIHByb3BzLCBpblByb3AgPyBfcmVhY3QuZGVmYXVsdC5jbG9uZUVsZW1lbnQoZmlyc3QsIHtcbiAgICAgIGtleTogJ2ZpcnN0JyxcbiAgICAgIG9uRW50ZXI6IHRoaXMuaGFuZGxlRW50ZXIsXG4gICAgICBvbkVudGVyaW5nOiB0aGlzLmhhbmRsZUVudGVyaW5nLFxuICAgICAgb25FbnRlcmVkOiB0aGlzLmhhbmRsZUVudGVyZWRcbiAgICB9KSA6IF9yZWFjdC5kZWZhdWx0LmNsb25lRWxlbWVudChzZWNvbmQsIHtcbiAgICAgIGtleTogJ3NlY29uZCcsXG4gICAgICBvbkVudGVyOiB0aGlzLmhhbmRsZUV4aXQsXG4gICAgICBvbkVudGVyaW5nOiB0aGlzLmhhbmRsZUV4aXRpbmcsXG4gICAgICBvbkVudGVyZWQ6IHRoaXMuaGFuZGxlRXhpdGVkXG4gICAgfSkpO1xuICB9O1xuXG4gIHJldHVybiBSZXBsYWNlVHJhbnNpdGlvbjtcbn0oX3JlYWN0LmRlZmF1bHQuQ29tcG9uZW50KTtcblxuUmVwbGFjZVRyYW5zaXRpb24ucHJvcFR5cGVzID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8ge1xuICBpbjogX3Byb3BUeXBlcy5kZWZhdWx0LmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IGZ1bmN0aW9uIGNoaWxkcmVuKHByb3BzLCBwcm9wTmFtZSkge1xuICAgIGlmIChfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5jb3VudChwcm9wc1twcm9wTmFtZV0pICE9PSAyKSByZXR1cm4gbmV3IEVycm9yKFwiXFxcIlwiICsgcHJvcE5hbWUgKyBcIlxcXCIgbXVzdCBiZSBleGFjdGx5IHR3byB0cmFuc2l0aW9uIGNvbXBvbmVudHMuXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59IDoge307XG52YXIgX2RlZmF1bHQgPSBSZXBsYWNlVHJhbnNpdGlvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuRVhJVElORyA9IGV4cG9ydHMuRU5URVJFRCA9IGV4cG9ydHMuRU5URVJJTkcgPSBleHBvcnRzLkVYSVRFRCA9IGV4cG9ydHMuVU5NT1VOVEVEID0gdm9pZCAwO1xuXG52YXIgUHJvcFR5cGVzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcInByb3AtdHlwZXNcIikpO1xuXG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuXG52YXIgX3JlYWN0RG9tID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcblxudmFyIF9yZWFjdExpZmVjeWNsZXNDb21wYXQgPSByZXF1aXJlKFwicmVhY3QtbGlmZWN5Y2xlcy1jb21wYXRcIik7XG5cbnZhciBfUHJvcFR5cGVzID0gcmVxdWlyZShcIi4vdXRpbHMvUHJvcFR5cGVzXCIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IHt9OyBpZiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTsgfSBlbHNlIHsgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHsgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307IHZhciB0YXJnZXQgPSB7fTsgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpOyB2YXIga2V5LCBpOyBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykgeyBrZXkgPSBzb3VyY2VLZXlzW2ldOyBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlOyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBVTk1PVU5URUQgPSAndW5tb3VudGVkJztcbmV4cG9ydHMuVU5NT1VOVEVEID0gVU5NT1VOVEVEO1xudmFyIEVYSVRFRCA9ICdleGl0ZWQnO1xuZXhwb3J0cy5FWElURUQgPSBFWElURUQ7XG52YXIgRU5URVJJTkcgPSAnZW50ZXJpbmcnO1xuZXhwb3J0cy5FTlRFUklORyA9IEVOVEVSSU5HO1xudmFyIEVOVEVSRUQgPSAnZW50ZXJlZCc7XG5leHBvcnRzLkVOVEVSRUQgPSBFTlRFUkVEO1xudmFyIEVYSVRJTkcgPSAnZXhpdGluZyc7XG4vKipcbiAqIFRoZSBUcmFuc2l0aW9uIGNvbXBvbmVudCBsZXRzIHlvdSBkZXNjcmliZSBhIHRyYW5zaXRpb24gZnJvbSBvbmUgY29tcG9uZW50XG4gKiBzdGF0ZSB0byBhbm90aGVyIF9vdmVyIHRpbWVfIHdpdGggYSBzaW1wbGUgZGVjbGFyYXRpdmUgQVBJLiBNb3N0IGNvbW1vbmx5XG4gKiBpdCdzIHVzZWQgdG8gYW5pbWF0ZSB0aGUgbW91bnRpbmcgYW5kIHVubW91bnRpbmcgb2YgYSBjb21wb25lbnQsIGJ1dCBjYW4gYWxzb1xuICogYmUgdXNlZCB0byBkZXNjcmliZSBpbi1wbGFjZSB0cmFuc2l0aW9uIHN0YXRlcyBhcyB3ZWxsLlxuICpcbiAqIC0tLVxuICpcbiAqICoqTm90ZSoqOiBgVHJhbnNpdGlvbmAgaXMgYSBwbGF0Zm9ybS1hZ25vc3RpYyBiYXNlIGNvbXBvbmVudC4gSWYgeW91J3JlIHVzaW5nXG4gKiB0cmFuc2l0aW9ucyBpbiBDU1MsIHlvdSdsbCBwcm9iYWJseSB3YW50IHRvIHVzZVxuICogW2BDU1NUcmFuc2l0aW9uYF0oaHR0cHM6Ly9yZWFjdGNvbW11bml0eS5vcmcvcmVhY3QtdHJhbnNpdGlvbi1ncm91cC9jc3MtdHJhbnNpdGlvbilcbiAqIGluc3RlYWQuIEl0IGluaGVyaXRzIGFsbCB0aGUgZmVhdHVyZXMgb2YgYFRyYW5zaXRpb25gLCBidXQgY29udGFpbnNcbiAqIGFkZGl0aW9uYWwgZmVhdHVyZXMgbmVjZXNzYXJ5IHRvIHBsYXkgbmljZSB3aXRoIENTUyB0cmFuc2l0aW9ucyAoaGVuY2UgdGhlXG4gKiBuYW1lIG9mIHRoZSBjb21wb25lbnQpLlxuICpcbiAqIC0tLVxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlIGBUcmFuc2l0aW9uYCBjb21wb25lbnQgZG9lcyBub3QgYWx0ZXIgdGhlIGJlaGF2aW9yIG9mIHRoZVxuICogY29tcG9uZW50IGl0IHJlbmRlcnMsIGl0IG9ubHkgdHJhY2tzIFwiZW50ZXJcIiBhbmQgXCJleGl0XCIgc3RhdGVzIGZvciB0aGVcbiAqIGNvbXBvbmVudHMuIEl0J3MgdXAgdG8geW91IHRvIGdpdmUgbWVhbmluZyBhbmQgZWZmZWN0IHRvIHRob3NlIHN0YXRlcy4gRm9yXG4gKiBleGFtcGxlIHdlIGNhbiBhZGQgc3R5bGVzIHRvIGEgY29tcG9uZW50IHdoZW4gaXQgZW50ZXJzIG9yIGV4aXRzOlxuICpcbiAqIGBgYGpzeFxuICogaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuICpcbiAqIGNvbnN0IGR1cmF0aW9uID0gMzAwO1xuICpcbiAqIGNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAqICAgdHJhbnNpdGlvbjogYG9wYWNpdHkgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gKiAgIG9wYWNpdHk6IDAsXG4gKiB9XG4gKlxuICogY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAqICAgZW50ZXJpbmc6IHsgb3BhY2l0eTogMCB9LFxuICogICBlbnRlcmVkOiAgeyBvcGFjaXR5OiAxIH0sXG4gKiB9O1xuICpcbiAqIGNvbnN0IEZhZGUgPSAoeyBpbjogaW5Qcm9wIH0pID0+IChcbiAqICAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICogICAgIHtzdGF0ZSA9PiAoXG4gKiAgICAgICA8ZGl2IHN0eWxlPXt7XG4gKiAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAqICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV1cbiAqICAgICAgIH19PlxuICogICAgICAgICBJJ20gYSBmYWRlIFRyYW5zaXRpb24hXG4gKiAgICAgICA8L2Rpdj5cbiAqICAgICApfVxuICogICA8L1RyYW5zaXRpb24+XG4gKiApO1xuICogYGBgXG4gKlxuICogVGhlcmUgYXJlIDQgbWFpbiBzdGF0ZXMgYSBUcmFuc2l0aW9uIGNhbiBiZSBpbjpcbiAqICAtIGAnZW50ZXJpbmcnYFxuICogIC0gYCdlbnRlcmVkJ2BcbiAqICAtIGAnZXhpdGluZydgXG4gKiAgLSBgJ2V4aXRlZCdgXG4gKlxuICogVHJhbnNpdGlvbiBzdGF0ZSBpcyB0b2dnbGVkIHZpYSB0aGUgYGluYCBwcm9wLiBXaGVuIGB0cnVlYCB0aGUgY29tcG9uZW50XG4gKiBiZWdpbnMgdGhlIFwiRW50ZXJcIiBzdGFnZS4gRHVyaW5nIHRoaXMgc3RhZ2UsIHRoZSBjb21wb25lbnQgd2lsbCBzaGlmdCBmcm9tXG4gKiBpdHMgY3VycmVudCB0cmFuc2l0aW9uIHN0YXRlLCB0byBgJ2VudGVyaW5nJ2AgZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGVcbiAqIHRyYW5zaXRpb24gYW5kIHRoZW4gdG8gdGhlIGAnZW50ZXJlZCdgIHN0YWdlIG9uY2UgaXQncyBjb21wbGV0ZS4gTGV0J3MgdGFrZVxuICogdGhlIGZvbGxvd2luZyBleGFtcGxlICh3ZSdsbCB1c2UgdGhlXG4gKiBbdXNlU3RhdGVdKGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9ob29rcy1yZWZlcmVuY2UuaHRtbCN1c2VzdGF0ZSkgaG9vayk6XG4gKlxuICogYGBganN4XG4gKiBmdW5jdGlvbiBBcHAoKSB7XG4gKiAgIGNvbnN0IFtpblByb3AsIHNldEluUHJvcF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gKiAgIHJldHVybiAoXG4gKiAgICAgPGRpdj5cbiAqICAgICAgIDxUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9ezUwMH0+XG4gKiAgICAgICAgIHtzdGF0ZSA9PiAoXG4gKiAgICAgICAgICAgLy8gLi4uXG4gKiAgICAgICAgICl9XG4gKiAgICAgICA8L1RyYW5zaXRpb24+XG4gKiAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldEluUHJvcCh0cnVlKX0+XG4gKiAgICAgICAgIENsaWNrIHRvIEVudGVyXG4gKiAgICAgICA8L2J1dHRvbj5cbiAqICAgICA8L2Rpdj5cbiAqICAgKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIFdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkIHRoZSBjb21wb25lbnQgd2lsbCBzaGlmdCB0byB0aGUgYCdlbnRlcmluZydgIHN0YXRlXG4gKiBhbmQgc3RheSB0aGVyZSBmb3IgNTAwbXMgKHRoZSB2YWx1ZSBvZiBgdGltZW91dGApIGJlZm9yZSBpdCBmaW5hbGx5IHN3aXRjaGVzXG4gKiB0byBgJ2VudGVyZWQnYC5cbiAqXG4gKiBXaGVuIGBpbmAgaXMgYGZhbHNlYCB0aGUgc2FtZSB0aGluZyBoYXBwZW5zIGV4Y2VwdCB0aGUgc3RhdGUgbW92ZXMgZnJvbVxuICogYCdleGl0aW5nJ2AgdG8gYCdleGl0ZWQnYC5cbiAqL1xuXG5leHBvcnRzLkVYSVRJTkcgPSBFWElUSU5HO1xuXG52YXIgVHJhbnNpdGlvbiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShUcmFuc2l0aW9uLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBUcmFuc2l0aW9uKHByb3BzLCBjb250ZXh0KSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgdmFyIHBhcmVudEdyb3VwID0gY29udGV4dC50cmFuc2l0aW9uR3JvdXA7IC8vIEluIHRoZSBjb250ZXh0IG9mIGEgVHJhbnNpdGlvbkdyb3VwIGFsbCBlbnRlcnMgYXJlIHJlYWxseSBhcHBlYXJzXG5cbiAgICB2YXIgYXBwZWFyID0gcGFyZW50R3JvdXAgJiYgIXBhcmVudEdyb3VwLmlzTW91bnRpbmcgPyBwcm9wcy5lbnRlciA6IHByb3BzLmFwcGVhcjtcbiAgICB2YXIgaW5pdGlhbFN0YXR1cztcbiAgICBfdGhpcy5hcHBlYXJTdGF0dXMgPSBudWxsO1xuXG4gICAgaWYgKHByb3BzLmluKSB7XG4gICAgICBpZiAoYXBwZWFyKSB7XG4gICAgICAgIGluaXRpYWxTdGF0dXMgPSBFWElURUQ7XG4gICAgICAgIF90aGlzLmFwcGVhclN0YXR1cyA9IEVOVEVSSU5HO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5pdGlhbFN0YXR1cyA9IEVOVEVSRUQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcm9wcy51bm1vdW50T25FeGl0IHx8IHByb3BzLm1vdW50T25FbnRlcikge1xuICAgICAgICBpbml0aWFsU3RhdHVzID0gVU5NT1VOVEVEO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5pdGlhbFN0YXR1cyA9IEVYSVRFRDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHN0YXR1czogaW5pdGlhbFN0YXR1c1xuICAgIH07XG4gICAgX3RoaXMubmV4dENhbGxiYWNrID0gbnVsbDtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gVHJhbnNpdGlvbi5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmdldENoaWxkQ29udGV4dCA9IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHJhbnNpdGlvbkdyb3VwOiBudWxsIC8vIGFsbG93cyBmb3IgbmVzdGVkIFRyYW5zaXRpb25zXG5cbiAgICB9O1xuICB9O1xuXG4gIFRyYW5zaXRpb24uZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzID0gZnVuY3Rpb24gZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKF9yZWYsIHByZXZTdGF0ZSkge1xuICAgIHZhciBuZXh0SW4gPSBfcmVmLmluO1xuXG4gICAgaWYgKG5leHRJbiAmJiBwcmV2U3RhdGUuc3RhdHVzID09PSBVTk1PVU5URUQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogRVhJVEVEXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9OyAvLyBnZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgLy8gICBsZXQgbmV4dFN0YXR1cyA9IG51bGxcbiAgLy8gICBpZiAocHJldlByb3BzICE9PSB0aGlzLnByb3BzKSB7XG4gIC8vICAgICBjb25zdCB7IHN0YXR1cyB9ID0gdGhpcy5zdGF0ZVxuICAvLyAgICAgaWYgKHRoaXMucHJvcHMuaW4pIHtcbiAgLy8gICAgICAgaWYgKHN0YXR1cyAhPT0gRU5URVJJTkcgJiYgc3RhdHVzICE9PSBFTlRFUkVEKSB7XG4gIC8vICAgICAgICAgbmV4dFN0YXR1cyA9IEVOVEVSSU5HXG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0gZWxzZSB7XG4gIC8vICAgICAgIGlmIChzdGF0dXMgPT09IEVOVEVSSU5HIHx8IHN0YXR1cyA9PT0gRU5URVJFRCkge1xuICAvLyAgICAgICAgIG5leHRTdGF0dXMgPSBFWElUSU5HXG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuIHsgbmV4dFN0YXR1cyB9XG4gIC8vIH1cblxuXG4gIF9wcm90by5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMudXBkYXRlU3RhdHVzKHRydWUsIHRoaXMuYXBwZWFyU3RhdHVzKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHZhciBuZXh0U3RhdHVzID0gbnVsbDtcblxuICAgIGlmIChwcmV2UHJvcHMgIT09IHRoaXMucHJvcHMpIHtcbiAgICAgIHZhciBzdGF0dXMgPSB0aGlzLnN0YXRlLnN0YXR1cztcblxuICAgICAgaWYgKHRoaXMucHJvcHMuaW4pIHtcbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gRU5URVJJTkcgJiYgc3RhdHVzICE9PSBFTlRFUkVEKSB7XG4gICAgICAgICAgbmV4dFN0YXR1cyA9IEVOVEVSSU5HO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3RhdHVzID09PSBFTlRFUklORyB8fCBzdGF0dXMgPT09IEVOVEVSRUQpIHtcbiAgICAgICAgICBuZXh0U3RhdHVzID0gRVhJVElORztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU3RhdHVzKGZhbHNlLCBuZXh0U3RhdHVzKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmNhbmNlbE5leHRDYWxsYmFjaygpO1xuICB9O1xuXG4gIF9wcm90by5nZXRUaW1lb3V0cyA9IGZ1bmN0aW9uIGdldFRpbWVvdXRzKCkge1xuICAgIHZhciB0aW1lb3V0ID0gdGhpcy5wcm9wcy50aW1lb3V0O1xuICAgIHZhciBleGl0LCBlbnRlciwgYXBwZWFyO1xuICAgIGV4aXQgPSBlbnRlciA9IGFwcGVhciA9IHRpbWVvdXQ7XG5cbiAgICBpZiAodGltZW91dCAhPSBudWxsICYmIHR5cGVvZiB0aW1lb3V0ICE9PSAnbnVtYmVyJykge1xuICAgICAgZXhpdCA9IHRpbWVvdXQuZXhpdDtcbiAgICAgIGVudGVyID0gdGltZW91dC5lbnRlcjsgLy8gVE9ETzogcmVtb3ZlIGZhbGxiYWNrIGZvciBuZXh0IG1ham9yXG5cbiAgICAgIGFwcGVhciA9IHRpbWVvdXQuYXBwZWFyICE9PSB1bmRlZmluZWQgPyB0aW1lb3V0LmFwcGVhciA6IGVudGVyO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBleGl0OiBleGl0LFxuICAgICAgZW50ZXI6IGVudGVyLFxuICAgICAgYXBwZWFyOiBhcHBlYXJcbiAgICB9O1xuICB9O1xuXG4gIF9wcm90by51cGRhdGVTdGF0dXMgPSBmdW5jdGlvbiB1cGRhdGVTdGF0dXMobW91bnRpbmcsIG5leHRTdGF0dXMpIHtcbiAgICBpZiAobW91bnRpbmcgPT09IHZvaWQgMCkge1xuICAgICAgbW91bnRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAobmV4dFN0YXR1cyAhPT0gbnVsbCkge1xuICAgICAgLy8gbmV4dFN0YXR1cyB3aWxsIGFsd2F5cyBiZSBFTlRFUklORyBvciBFWElUSU5HLlxuICAgICAgdGhpcy5jYW5jZWxOZXh0Q2FsbGJhY2soKTtcblxuICAgICAgdmFyIG5vZGUgPSBfcmVhY3REb20uZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKTtcblxuICAgICAgaWYgKG5leHRTdGF0dXMgPT09IEVOVEVSSU5HKSB7XG4gICAgICAgIHRoaXMucGVyZm9ybUVudGVyKG5vZGUsIG1vdW50aW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGVyZm9ybUV4aXQobm9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnVubW91bnRPbkV4aXQgJiYgdGhpcy5zdGF0ZS5zdGF0dXMgPT09IEVYSVRFRCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHN0YXR1czogVU5NT1VOVEVEXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnBlcmZvcm1FbnRlciA9IGZ1bmN0aW9uIHBlcmZvcm1FbnRlcihub2RlLCBtb3VudGluZykge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdmFyIGVudGVyID0gdGhpcy5wcm9wcy5lbnRlcjtcbiAgICB2YXIgYXBwZWFyaW5nID0gdGhpcy5jb250ZXh0LnRyYW5zaXRpb25Hcm91cCA/IHRoaXMuY29udGV4dC50cmFuc2l0aW9uR3JvdXAuaXNNb3VudGluZyA6IG1vdW50aW5nO1xuICAgIHZhciB0aW1lb3V0cyA9IHRoaXMuZ2V0VGltZW91dHMoKTtcbiAgICB2YXIgZW50ZXJUaW1lb3V0ID0gYXBwZWFyaW5nID8gdGltZW91dHMuYXBwZWFyIDogdGltZW91dHMuZW50ZXI7IC8vIG5vIGVudGVyIGFuaW1hdGlvbiBza2lwIHJpZ2h0IHRvIEVOVEVSRURcbiAgICAvLyBpZiB3ZSBhcmUgbW91bnRpbmcgYW5kIHJ1bm5pbmcgdGhpcyBpdCBtZWFucyBhcHBlYXIgX211c3RfIGJlIHNldFxuXG4gICAgaWYgKCFtb3VudGluZyAmJiAhZW50ZXIpIHtcbiAgICAgIHRoaXMuc2FmZVNldFN0YXRlKHtcbiAgICAgICAgc3RhdHVzOiBFTlRFUkVEXG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5wcm9wcy5vbkVudGVyZWQobm9kZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uRW50ZXIobm9kZSwgYXBwZWFyaW5nKTtcbiAgICB0aGlzLnNhZmVTZXRTdGF0ZSh7XG4gICAgICBzdGF0dXM6IEVOVEVSSU5HXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMyLnByb3BzLm9uRW50ZXJpbmcobm9kZSwgYXBwZWFyaW5nKTtcblxuICAgICAgX3RoaXMyLm9uVHJhbnNpdGlvbkVuZChub2RlLCBlbnRlclRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLnNhZmVTZXRTdGF0ZSh7XG4gICAgICAgICAgc3RhdHVzOiBFTlRFUkVEXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpczIucHJvcHMub25FbnRlcmVkKG5vZGUsIGFwcGVhcmluZyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLnBlcmZvcm1FeGl0ID0gZnVuY3Rpb24gcGVyZm9ybUV4aXQobm9kZSkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdmFyIGV4aXQgPSB0aGlzLnByb3BzLmV4aXQ7XG4gICAgdmFyIHRpbWVvdXRzID0gdGhpcy5nZXRUaW1lb3V0cygpOyAvLyBubyBleGl0IGFuaW1hdGlvbiBza2lwIHJpZ2h0IHRvIEVYSVRFRFxuXG4gICAgaWYgKCFleGl0KSB7XG4gICAgICB0aGlzLnNhZmVTZXRTdGF0ZSh7XG4gICAgICAgIHN0YXR1czogRVhJVEVEXG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMy5wcm9wcy5vbkV4aXRlZChub2RlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25FeGl0KG5vZGUpO1xuICAgIHRoaXMuc2FmZVNldFN0YXRlKHtcbiAgICAgIHN0YXR1czogRVhJVElOR1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzMy5wcm9wcy5vbkV4aXRpbmcobm9kZSk7XG5cbiAgICAgIF90aGlzMy5vblRyYW5zaXRpb25FbmQobm9kZSwgdGltZW91dHMuZXhpdCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczMuc2FmZVNldFN0YXRlKHtcbiAgICAgICAgICBzdGF0dXM6IEVYSVRFRFxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMzLnByb3BzLm9uRXhpdGVkKG5vZGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5jYW5jZWxOZXh0Q2FsbGJhY2sgPSBmdW5jdGlvbiBjYW5jZWxOZXh0Q2FsbGJhY2soKSB7XG4gICAgaWYgKHRoaXMubmV4dENhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICB0aGlzLm5leHRDYWxsYmFjay5jYW5jZWwoKTtcbiAgICAgIHRoaXMubmV4dENhbGxiYWNrID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnNhZmVTZXRTdGF0ZSA9IGZ1bmN0aW9uIHNhZmVTZXRTdGF0ZShuZXh0U3RhdGUsIGNhbGxiYWNrKSB7XG4gICAgLy8gVGhpcyBzaG91bGRuJ3QgYmUgbmVjZXNzYXJ5LCBidXQgdGhlcmUgYXJlIHdlaXJkIHJhY2UgY29uZGl0aW9ucyB3aXRoXG4gICAgLy8gc2V0U3RhdGUgY2FsbGJhY2tzIGFuZCB1bm1vdW50aW5nIGluIHRlc3RpbmcsIHNvIGFsd2F5cyBtYWtlIHN1cmUgdGhhdFxuICAgIC8vIHdlIGNhbiBjYW5jZWwgYW55IHBlbmRpbmcgc2V0U3RhdGUgY2FsbGJhY2tzIGFmdGVyIHdlIHVubW91bnQuXG4gICAgY2FsbGJhY2sgPSB0aGlzLnNldE5leHRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBfcHJvdG8uc2V0TmV4dENhbGxiYWNrID0gZnVuY3Rpb24gc2V0TmV4dENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICB2YXIgYWN0aXZlID0gdHJ1ZTtcblxuICAgIHRoaXMubmV4dENhbGxiYWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBfdGhpczQubmV4dENhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgY2FsbGJhY2soZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLm5leHRDYWxsYmFjay5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMubmV4dENhbGxiYWNrO1xuICB9O1xuXG4gIF9wcm90by5vblRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiBvblRyYW5zaXRpb25FbmQobm9kZSwgdGltZW91dCwgaGFuZGxlcikge1xuICAgIHRoaXMuc2V0TmV4dENhbGxiYWNrKGhhbmRsZXIpO1xuICAgIHZhciBkb2VzTm90SGF2ZVRpbWVvdXRPckxpc3RlbmVyID0gdGltZW91dCA9PSBudWxsICYmICF0aGlzLnByb3BzLmFkZEVuZExpc3RlbmVyO1xuXG4gICAgaWYgKCFub2RlIHx8IGRvZXNOb3RIYXZlVGltZW91dE9yTGlzdGVuZXIpIHtcbiAgICAgIHNldFRpbWVvdXQodGhpcy5uZXh0Q2FsbGJhY2ssIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmFkZEVuZExpc3RlbmVyKSB7XG4gICAgICB0aGlzLnByb3BzLmFkZEVuZExpc3RlbmVyKG5vZGUsIHRoaXMubmV4dENhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBpZiAodGltZW91dCAhPSBudWxsKSB7XG4gICAgICBzZXRUaW1lb3V0KHRoaXMubmV4dENhbGxiYWNrLCB0aW1lb3V0KTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgc3RhdHVzID0gdGhpcy5zdGF0ZS5zdGF0dXM7XG5cbiAgICBpZiAoc3RhdHVzID09PSBVTk1PVU5URUQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBfdGhpcyRwcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgIGNoaWxkcmVuID0gX3RoaXMkcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgIGNoaWxkUHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfdGhpcyRwcm9wcywgW1wiY2hpbGRyZW5cIl0pOyAvLyBmaWx0ZXIgcHJvcHMgZm9yIFRyYW5zdGl0aW9uXG5cblxuICAgIGRlbGV0ZSBjaGlsZFByb3BzLmluO1xuICAgIGRlbGV0ZSBjaGlsZFByb3BzLm1vdW50T25FbnRlcjtcbiAgICBkZWxldGUgY2hpbGRQcm9wcy51bm1vdW50T25FeGl0O1xuICAgIGRlbGV0ZSBjaGlsZFByb3BzLmFwcGVhcjtcbiAgICBkZWxldGUgY2hpbGRQcm9wcy5lbnRlcjtcbiAgICBkZWxldGUgY2hpbGRQcm9wcy5leGl0O1xuICAgIGRlbGV0ZSBjaGlsZFByb3BzLnRpbWVvdXQ7XG4gICAgZGVsZXRlIGNoaWxkUHJvcHMuYWRkRW5kTGlzdGVuZXI7XG4gICAgZGVsZXRlIGNoaWxkUHJvcHMub25FbnRlcjtcbiAgICBkZWxldGUgY2hpbGRQcm9wcy5vbkVudGVyaW5nO1xuICAgIGRlbGV0ZSBjaGlsZFByb3BzLm9uRW50ZXJlZDtcbiAgICBkZWxldGUgY2hpbGRQcm9wcy5vbkV4aXQ7XG4gICAgZGVsZXRlIGNoaWxkUHJvcHMub25FeGl0aW5nO1xuICAgIGRlbGV0ZSBjaGlsZFByb3BzLm9uRXhpdGVkO1xuXG4gICAgaWYgKHR5cGVvZiBjaGlsZHJlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGNoaWxkcmVuKHN0YXR1cywgY2hpbGRQcm9wcyk7XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkID0gX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG5cbiAgICByZXR1cm4gX3JlYWN0LmRlZmF1bHQuY2xvbmVFbGVtZW50KGNoaWxkLCBjaGlsZFByb3BzKTtcbiAgfTtcblxuICByZXR1cm4gVHJhbnNpdGlvbjtcbn0oX3JlYWN0LmRlZmF1bHQuQ29tcG9uZW50KTtcblxuVHJhbnNpdGlvbi5jb250ZXh0VHlwZXMgPSB7XG4gIHRyYW5zaXRpb25Hcm91cDogUHJvcFR5cGVzLm9iamVjdFxufTtcblRyYW5zaXRpb24uY2hpbGRDb250ZXh0VHlwZXMgPSB7XG4gIHRyYW5zaXRpb25Hcm91cDogZnVuY3Rpb24gdHJhbnNpdGlvbkdyb3VwKCkge31cbn07XG5UcmFuc2l0aW9uLnByb3BUeXBlcyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHtcbiAgLyoqXG4gICAqIEEgYGZ1bmN0aW9uYCBjaGlsZCBjYW4gYmUgdXNlZCBpbnN0ZWFkIG9mIGEgUmVhY3QgZWxlbWVudC4gVGhpcyBmdW5jdGlvbiBpc1xuICAgKiBjYWxsZWQgd2l0aCB0aGUgY3VycmVudCB0cmFuc2l0aW9uIHN0YXR1cyAoYCdlbnRlcmluZydgLCBgJ2VudGVyZWQnYCxcbiAgICogYCdleGl0aW5nJ2AsIGAnZXhpdGVkJ2AsIGAndW5tb3VudGVkJ2ApLCB3aGljaCBjYW4gYmUgdXNlZCB0byBhcHBseSBjb250ZXh0XG4gICAqIHNwZWNpZmljIHByb3BzIHRvIGEgY29tcG9uZW50LlxuICAgKlxuICAgKiBgYGBqc3hcbiAgICogPFRyYW5zaXRpb24gaW49e3RoaXMuc3RhdGUuaW59IHRpbWVvdXQ9ezE1MH0+XG4gICAqICAge3N0YXRlID0+IChcbiAgICogICAgIDxNeUNvbXBvbmVudCBjbGFzc05hbWU9e2BmYWRlIGZhZGUtJHtzdGF0ZX1gfSAvPlxuICAgKiAgICl9XG4gICAqIDwvVHJhbnNpdGlvbj5cbiAgICogYGBgXG4gICAqL1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCwgUHJvcFR5cGVzLmVsZW1lbnQuaXNSZXF1aXJlZF0pLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIFNob3cgdGhlIGNvbXBvbmVudDsgdHJpZ2dlcnMgdGhlIGVudGVyIG9yIGV4aXQgc3RhdGVzXG4gICAqL1xuICBpbjogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQgdGhlIGNoaWxkIGNvbXBvbmVudCBpcyBtb3VudGVkIGltbWVkaWF0ZWx5IGFsb25nIHdpdGhcbiAgICogdGhlIHBhcmVudCBgVHJhbnNpdGlvbmAgY29tcG9uZW50LiBJZiB5b3Ugd2FudCB0byBcImxhenkgbW91bnRcIiB0aGUgY29tcG9uZW50IG9uIHRoZVxuICAgKiBmaXJzdCBgaW49e3RydWV9YCB5b3UgY2FuIHNldCBgbW91bnRPbkVudGVyYC4gQWZ0ZXIgdGhlIGZpcnN0IGVudGVyIHRyYW5zaXRpb24gdGhlIGNvbXBvbmVudCB3aWxsIHN0YXlcbiAgICogbW91bnRlZCwgZXZlbiBvbiBcImV4aXRlZFwiLCB1bmxlc3MgeW91IGFsc28gc3BlY2lmeSBgdW5tb3VudE9uRXhpdGAuXG4gICAqL1xuICBtb3VudE9uRW50ZXI6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBCeSBkZWZhdWx0IHRoZSBjaGlsZCBjb21wb25lbnQgc3RheXMgbW91bnRlZCBhZnRlciBpdCByZWFjaGVzIHRoZSBgJ2V4aXRlZCdgIHN0YXRlLlxuICAgKiBTZXQgYHVubW91bnRPbkV4aXRgIGlmIHlvdSdkIHByZWZlciB0byB1bm1vdW50IHRoZSBjb21wb25lbnQgYWZ0ZXIgaXQgZmluaXNoZXMgZXhpdGluZy5cbiAgICovXG4gIHVubW91bnRPbkV4aXQ6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBOb3JtYWxseSBhIGNvbXBvbmVudCBpcyBub3QgdHJhbnNpdGlvbmVkIGlmIGl0IGlzIHNob3duIHdoZW4gdGhlIGA8VHJhbnNpdGlvbj5gIGNvbXBvbmVudCBtb3VudHMuXG4gICAqIElmIHlvdSB3YW50IHRvIHRyYW5zaXRpb24gb24gdGhlIGZpcnN0IG1vdW50IHNldCBgYXBwZWFyYCB0byBgdHJ1ZWAsIGFuZCB0aGVcbiAgICogY29tcG9uZW50IHdpbGwgdHJhbnNpdGlvbiBpbiBhcyBzb29uIGFzIHRoZSBgPFRyYW5zaXRpb24+YCBtb3VudHMuXG4gICAqXG4gICAqID4gTm90ZTogdGhlcmUgYXJlIG5vIHNwZWNpZmljIFwiYXBwZWFyXCIgc3RhdGVzLiBgYXBwZWFyYCBvbmx5IGFkZHMgYW4gYWRkaXRpb25hbCBgZW50ZXJgIHRyYW5zaXRpb24uXG4gICAqL1xuICBhcHBlYXI6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBFbmFibGUgb3IgZGlzYWJsZSBlbnRlciB0cmFuc2l0aW9ucy5cbiAgICovXG4gIGVudGVyOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogRW5hYmxlIG9yIGRpc2FibGUgZXhpdCB0cmFuc2l0aW9ucy5cbiAgICovXG4gIGV4aXQ6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBUaGUgZHVyYXRpb24gb2YgdGhlIHRyYW5zaXRpb24sIGluIG1pbGxpc2Vjb25kcy5cbiAgICogUmVxdWlyZWQgdW5sZXNzIGBhZGRFbmRMaXN0ZW5lcmAgaXMgcHJvdmlkZWQuXG4gICAqXG4gICAqIFlvdSBtYXkgc3BlY2lmeSBhIHNpbmdsZSB0aW1lb3V0IGZvciBhbGwgdHJhbnNpdGlvbnM6XG4gICAqXG4gICAqIGBgYGpzeFxuICAgKiB0aW1lb3V0PXs1MDB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBvciBpbmRpdmlkdWFsbHk6XG4gICAqXG4gICAqIGBgYGpzeFxuICAgKiB0aW1lb3V0PXt7XG4gICAqICBhcHBlYXI6IDUwMCxcbiAgICogIGVudGVyOiAzMDAsXG4gICAqICBleGl0OiA1MDAsXG4gICAqIH19XG4gICAqIGBgYFxuICAgKlxuICAgKiAtIGBhcHBlYXJgIGRlZmF1bHRzIHRvIHRoZSB2YWx1ZSBvZiBgZW50ZXJgXG4gICAqIC0gYGVudGVyYCBkZWZhdWx0cyB0byBgMGBcbiAgICogLSBgZXhpdGAgZGVmYXVsdHMgdG8gYDBgXG4gICAqXG4gICAqIEB0eXBlIHtudW1iZXIgfCB7IGVudGVyPzogbnVtYmVyLCBleGl0PzogbnVtYmVyLCBhcHBlYXI/OiBudW1iZXIgfX1cbiAgICovXG4gIHRpbWVvdXQ6IGZ1bmN0aW9uIHRpbWVvdXQocHJvcHMpIHtcbiAgICB2YXIgcHQgPSBfUHJvcFR5cGVzLnRpbWVvdXRzU2hhcGU7XG4gICAgaWYgKCFwcm9wcy5hZGRFbmRMaXN0ZW5lcikgcHQgPSBwdC5pc1JlcXVpcmVkO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHB0LmFwcGx5KHZvaWQgMCwgW3Byb3BzXS5jb25jYXQoYXJncykpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBBZGQgYSBjdXN0b20gdHJhbnNpdGlvbiBlbmQgdHJpZ2dlci4gQ2FsbGVkIHdpdGggdGhlIHRyYW5zaXRpb25pbmdcbiAgICogRE9NIG5vZGUgYW5kIGEgYGRvbmVgIGNhbGxiYWNrLiBBbGxvd3MgZm9yIG1vcmUgZmluZSBncmFpbmVkIHRyYW5zaXRpb24gZW5kXG4gICAqIGxvZ2ljLiAqKk5vdGU6KiogVGltZW91dHMgYXJlIHN0aWxsIHVzZWQgYXMgYSBmYWxsYmFjayBpZiBwcm92aWRlZC5cbiAgICpcbiAgICogYGBganN4XG4gICAqIGFkZEVuZExpc3RlbmVyPXsobm9kZSwgZG9uZSkgPT4ge1xuICAgKiAgIC8vIHVzZSB0aGUgY3NzIHRyYW5zaXRpb25lbmQgZXZlbnQgdG8gbWFyayB0aGUgZmluaXNoIG9mIGEgdHJhbnNpdGlvblxuICAgKiAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGRvbmUsIGZhbHNlKTtcbiAgICogfX1cbiAgICogYGBgXG4gICAqL1xuICBhZGRFbmRMaXN0ZW5lcjogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZpcmVkIGJlZm9yZSB0aGUgXCJlbnRlcmluZ1wiIHN0YXR1cyBpcyBhcHBsaWVkLiBBbiBleHRyYSBwYXJhbWV0ZXJcbiAgICogYGlzQXBwZWFyaW5nYCBpcyBzdXBwbGllZCB0byBpbmRpY2F0ZSBpZiB0aGUgZW50ZXIgc3RhZ2UgaXMgb2NjdXJyaW5nIG9uIHRoZSBpbml0aWFsIG1vdW50XG4gICAqXG4gICAqIEB0eXBlIEZ1bmN0aW9uKG5vZGU6IEh0bWxFbGVtZW50LCBpc0FwcGVhcmluZzogYm9vbCkgLT4gdm9pZFxuICAgKi9cbiAgb25FbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZpcmVkIGFmdGVyIHRoZSBcImVudGVyaW5nXCIgc3RhdHVzIGlzIGFwcGxpZWQuIEFuIGV4dHJhIHBhcmFtZXRlclxuICAgKiBgaXNBcHBlYXJpbmdgIGlzIHN1cHBsaWVkIHRvIGluZGljYXRlIGlmIHRoZSBlbnRlciBzdGFnZSBpcyBvY2N1cnJpbmcgb24gdGhlIGluaXRpYWwgbW91bnRcbiAgICpcbiAgICogQHR5cGUgRnVuY3Rpb24obm9kZTogSHRtbEVsZW1lbnQsIGlzQXBwZWFyaW5nOiBib29sKVxuICAgKi9cbiAgb25FbnRlcmluZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZpcmVkIGFmdGVyIHRoZSBcImVudGVyZWRcIiBzdGF0dXMgaXMgYXBwbGllZC4gQW4gZXh0cmEgcGFyYW1ldGVyXG4gICAqIGBpc0FwcGVhcmluZ2AgaXMgc3VwcGxpZWQgdG8gaW5kaWNhdGUgaWYgdGhlIGVudGVyIHN0YWdlIGlzIG9jY3VycmluZyBvbiB0aGUgaW5pdGlhbCBtb3VudFxuICAgKlxuICAgKiBAdHlwZSBGdW5jdGlvbihub2RlOiBIdG1sRWxlbWVudCwgaXNBcHBlYXJpbmc6IGJvb2wpIC0+IHZvaWRcbiAgICovXG4gIG9uRW50ZXJlZDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZpcmVkIGJlZm9yZSB0aGUgXCJleGl0aW5nXCIgc3RhdHVzIGlzIGFwcGxpZWQuXG4gICAqXG4gICAqIEB0eXBlIEZ1bmN0aW9uKG5vZGU6IEh0bWxFbGVtZW50KSAtPiB2b2lkXG4gICAqL1xuICBvbkV4aXQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmaXJlZCBhZnRlciB0aGUgXCJleGl0aW5nXCIgc3RhdHVzIGlzIGFwcGxpZWQuXG4gICAqXG4gICAqIEB0eXBlIEZ1bmN0aW9uKG5vZGU6IEh0bWxFbGVtZW50KSAtPiB2b2lkXG4gICAqL1xuICBvbkV4aXRpbmc6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmaXJlZCBhZnRlciB0aGUgXCJleGl0ZWRcIiBzdGF0dXMgaXMgYXBwbGllZC5cbiAgICpcbiAgICogQHR5cGUgRnVuY3Rpb24obm9kZTogSHRtbEVsZW1lbnQpIC0+IHZvaWRcbiAgICovXG4gIG9uRXhpdGVkOiBQcm9wVHlwZXMuZnVuYyAvLyBOYW1lIHRoZSBmdW5jdGlvbiBzbyBpdCBpcyBjbGVhcmVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG5cbn0gOiB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cblRyYW5zaXRpb24uZGVmYXVsdFByb3BzID0ge1xuICBpbjogZmFsc2UsXG4gIG1vdW50T25FbnRlcjogZmFsc2UsXG4gIHVubW91bnRPbkV4aXQ6IGZhbHNlLFxuICBhcHBlYXI6IGZhbHNlLFxuICBlbnRlcjogdHJ1ZSxcbiAgZXhpdDogdHJ1ZSxcbiAgb25FbnRlcjogbm9vcCxcbiAgb25FbnRlcmluZzogbm9vcCxcbiAgb25FbnRlcmVkOiBub29wLFxuICBvbkV4aXQ6IG5vb3AsXG4gIG9uRXhpdGluZzogbm9vcCxcbiAgb25FeGl0ZWQ6IG5vb3Bcbn07XG5UcmFuc2l0aW9uLlVOTU9VTlRFRCA9IDA7XG5UcmFuc2l0aW9uLkVYSVRFRCA9IDE7XG5UcmFuc2l0aW9uLkVOVEVSSU5HID0gMjtcblRyYW5zaXRpb24uRU5URVJFRCA9IDM7XG5UcmFuc2l0aW9uLkVYSVRJTkcgPSA0O1xuXG52YXIgX2RlZmF1bHQgPSAoMCwgX3JlYWN0TGlmZWN5Y2xlc0NvbXBhdC5wb2x5ZmlsbCkoVHJhbnNpdGlvbik7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgUHJvcFR5cGVzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcInByb3AtdHlwZXNcIikpO1xuXG52YXIgX2FkZENsYXNzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiZG9tLWhlbHBlcnMvY2xhc3MvYWRkQ2xhc3NcIikpO1xuXG52YXIgX3JlbW92ZUNsYXNzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiZG9tLWhlbHBlcnMvY2xhc3MvcmVtb3ZlQ2xhc3NcIikpO1xuXG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuXG52YXIgX1RyYW5zaXRpb24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1RyYW5zaXRpb25cIikpO1xuXG52YXIgX1Byb3BUeXBlcyA9IHJlcXVpcmUoXCIuL3V0aWxzL1Byb3BUeXBlc1wiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgeyB2YXIgZGVzYyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiB7fTsgaWYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHsgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9OyByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIGFkZENsYXNzID0gZnVuY3Rpb24gYWRkQ2xhc3Mobm9kZSwgY2xhc3Nlcykge1xuICByZXR1cm4gbm9kZSAmJiBjbGFzc2VzICYmIGNsYXNzZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgcmV0dXJuICgwLCBfYWRkQ2xhc3MuZGVmYXVsdCkobm9kZSwgYyk7XG4gIH0pO1xufTtcblxudmFyIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24gcmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3Nlcykge1xuICByZXR1cm4gbm9kZSAmJiBjbGFzc2VzICYmIGNsYXNzZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgcmV0dXJuICgwLCBfcmVtb3ZlQ2xhc3MuZGVmYXVsdCkobm9kZSwgYyk7XG4gIH0pO1xufTtcbi8qKlxuICogQSB0cmFuc2l0aW9uIGNvbXBvbmVudCBpbnNwaXJlZCBieSB0aGUgZXhjZWxsZW50XG4gKiBbbmctYW5pbWF0ZV0oaHR0cDovL3d3dy5uZ2FuaW1hdGUub3JnLykgbGlicmFyeSwgeW91IHNob3VsZCB1c2UgaXQgaWYgeW91J3JlXG4gKiB1c2luZyBDU1MgdHJhbnNpdGlvbnMgb3IgYW5pbWF0aW9ucy4gSXQncyBidWlsdCB1cG9uIHRoZVxuICogW2BUcmFuc2l0aW9uYF0oaHR0cHM6Ly9yZWFjdGNvbW11bml0eS5vcmcvcmVhY3QtdHJhbnNpdGlvbi1ncm91cC90cmFuc2l0aW9uKVxuICogY29tcG9uZW50LCBzbyBpdCBpbmhlcml0cyBhbGwgb2YgaXRzIHByb3BzLlxuICpcbiAqIGBDU1NUcmFuc2l0aW9uYCBhcHBsaWVzIGEgcGFpciBvZiBjbGFzcyBuYW1lcyBkdXJpbmcgdGhlIGBhcHBlYXJgLCBgZW50ZXJgLFxuICogYW5kIGBleGl0YCBzdGF0ZXMgb2YgdGhlIHRyYW5zaXRpb24uIFRoZSBmaXJzdCBjbGFzcyBpcyBhcHBsaWVkIGFuZCB0aGVuIGFcbiAqIHNlY29uZCBgKi1hY3RpdmVgIGNsYXNzIGluIG9yZGVyIHRvIGFjdGl2YXRlIHRoZSBDU1NTIHRyYW5zaXRpb24uIEFmdGVyIHRoZVxuICogdHJhbnNpdGlvbiwgbWF0Y2hpbmcgYCotZG9uZWAgY2xhc3MgbmFtZXMgYXJlIGFwcGxpZWQgdG8gcGVyc2lzdCB0aGVcbiAqIHRyYW5zaXRpb24gc3RhdGUuXG4gKlxuICogYGBganN4XG4gKiBmdW5jdGlvbiBBcHAoKSB7XG4gKiAgIGNvbnN0IFtpblByb3AsIHNldEluUHJvcF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gKiAgIHJldHVybiAoXG4gKiAgICAgPGRpdj5cbiAqICAgICAgIDxDU1NUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9ezIwMH0gY2xhc3NOYW1lcz1cIm15LW5vZGVcIj5cbiAqICAgICAgICAgPGRpdj5cbiAqICAgICAgICAgICB7XCJJJ2xsIHJlY2VpdmUgbXktbm9kZS0qIGNsYXNzZXNcIn1cbiAqICAgICAgICAgPC9kaXY+XG4gKiAgICAgICA8L0NTU1RyYW5zaXRpb24+XG4gKiAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRJblByb3AodHJ1ZSl9PlxuICogICAgICAgICBDbGljayB0byBFbnRlclxuICogICAgICAgPC9idXR0b24+XG4gKiAgICAgPC9kaXY+XG4gKiAgICk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBXaGVuIHRoZSBgaW5gIHByb3AgaXMgc2V0IHRvIGB0cnVlYCwgdGhlIGNoaWxkIGNvbXBvbmVudCB3aWxsIGZpcnN0IHJlY2VpdmVcbiAqIHRoZSBjbGFzcyBgZXhhbXBsZS1lbnRlcmAsIHRoZW4gdGhlIGBleGFtcGxlLWVudGVyLWFjdGl2ZWAgd2lsbCBiZSBhZGRlZCBpblxuICogdGhlIG5leHQgdGljay4gYENTU1RyYW5zaXRpb25gIFtmb3JjZXMgYVxuICogcmVmbG93XShodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZWFjdC10cmFuc2l0aW9uLWdyb3VwL2Jsb2IvNTAwNzMwM2U3MjlhNzRiZTY2YTIxYzNlMjIwNWU0OTE2ODIxNTI0Yi9zcmMvQ1NTVHJhbnNpdGlvbi5qcyNMMjA4LUwyMTUpXG4gKiBiZXR3ZWVuIGJlZm9yZSBhZGRpbmcgdGhlIGBleGFtcGxlLWVudGVyLWFjdGl2ZWAuIFRoaXMgaXMgYW4gaW1wb3J0YW50IHRyaWNrXG4gKiBiZWNhdXNlIGl0IGFsbG93cyB1cyB0byB0cmFuc2l0aW9uIGJldHdlZW4gYGV4YW1wbGUtZW50ZXJgIGFuZFxuICogYGV4YW1wbGUtZW50ZXItYWN0aXZlYCBldmVuIHRob3VnaCB0aGV5IHdlcmUgYWRkZWQgaW1tZWRpYXRlbHkgb25lIGFmdGVyXG4gKiBhbm90aGVyLiBNb3N0IG5vdGFibHksIHRoaXMgaXMgd2hhdCBtYWtlcyBpdCBwb3NzaWJsZSBmb3IgdXMgdG8gYW5pbWF0ZVxuICogX2FwcGVhcmFuY2VfLlxuICpcbiAqIGBgYGNzc1xuICogLm15LW5vZGUtZW50ZXIge1xuICogICBvcGFjaXR5OiAwO1xuICogfVxuICogLm15LW5vZGUtZW50ZXItYWN0aXZlIHtcbiAqICAgb3BhY2l0eTogMTtcbiAqICAgdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtcztcbiAqIH1cbiAqIC5teS1ub2RlLWV4aXQge1xuICogICBvcGFjaXR5OiAxO1xuICogfVxuICogLm15LW5vZGUtZXhpdC1hY3RpdmUge1xuICogICBvcGFjaXR5OiAwO1xuICogICB0cmFuc2l0aW9uOiBvcGFjaXR5OiAyMDBtcztcbiAqIH1cbiAqIGBgYFxuICpcbiAqIGAqLWFjdGl2ZWAgY2xhc3NlcyByZXByZXNlbnQgd2hpY2ggc3R5bGVzIHlvdSB3YW50IHRvIGFuaW1hdGUgKip0byoqLlxuICovXG5cblxudmFyIENTU1RyYW5zaXRpb24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoQ1NTVHJhbnNpdGlvbiwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQ1NTVHJhbnNpdGlvbigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcblxuICAgIF90aGlzLm9uRW50ZXIgPSBmdW5jdGlvbiAobm9kZSwgYXBwZWFyaW5nKSB7XG4gICAgICB2YXIgX3RoaXMkZ2V0Q2xhc3NOYW1lcyA9IF90aGlzLmdldENsYXNzTmFtZXMoYXBwZWFyaW5nID8gJ2FwcGVhcicgOiAnZW50ZXInKSxcbiAgICAgICAgICBjbGFzc05hbWUgPSBfdGhpcyRnZXRDbGFzc05hbWVzLmNsYXNzTmFtZTtcblxuICAgICAgX3RoaXMucmVtb3ZlQ2xhc3Nlcyhub2RlLCAnZXhpdCcpO1xuXG4gICAgICBhZGRDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xuXG4gICAgICBpZiAoX3RoaXMucHJvcHMub25FbnRlcikge1xuICAgICAgICBfdGhpcy5wcm9wcy5vbkVudGVyKG5vZGUsIGFwcGVhcmluZyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLm9uRW50ZXJpbmcgPSBmdW5jdGlvbiAobm9kZSwgYXBwZWFyaW5nKSB7XG4gICAgICB2YXIgX3RoaXMkZ2V0Q2xhc3NOYW1lczIgPSBfdGhpcy5nZXRDbGFzc05hbWVzKGFwcGVhcmluZyA/ICdhcHBlYXInIDogJ2VudGVyJyksXG4gICAgICAgICAgYWN0aXZlQ2xhc3NOYW1lID0gX3RoaXMkZ2V0Q2xhc3NOYW1lczIuYWN0aXZlQ2xhc3NOYW1lO1xuXG4gICAgICBfdGhpcy5yZWZsb3dBbmRBZGRDbGFzcyhub2RlLCBhY3RpdmVDbGFzc05hbWUpO1xuXG4gICAgICBpZiAoX3RoaXMucHJvcHMub25FbnRlcmluZykge1xuICAgICAgICBfdGhpcy5wcm9wcy5vbkVudGVyaW5nKG5vZGUsIGFwcGVhcmluZyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLm9uRW50ZXJlZCA9IGZ1bmN0aW9uIChub2RlLCBhcHBlYXJpbmcpIHtcbiAgICAgIHZhciBhcHBlYXJDbGFzc05hbWUgPSBfdGhpcy5nZXRDbGFzc05hbWVzKCdhcHBlYXInKS5kb25lQ2xhc3NOYW1lO1xuXG4gICAgICB2YXIgZW50ZXJDbGFzc05hbWUgPSBfdGhpcy5nZXRDbGFzc05hbWVzKCdlbnRlcicpLmRvbmVDbGFzc05hbWU7XG5cbiAgICAgIHZhciBkb25lQ2xhc3NOYW1lID0gYXBwZWFyaW5nID8gYXBwZWFyQ2xhc3NOYW1lICsgXCIgXCIgKyBlbnRlckNsYXNzTmFtZSA6IGVudGVyQ2xhc3NOYW1lO1xuXG4gICAgICBfdGhpcy5yZW1vdmVDbGFzc2VzKG5vZGUsIGFwcGVhcmluZyA/ICdhcHBlYXInIDogJ2VudGVyJyk7XG5cbiAgICAgIGFkZENsYXNzKG5vZGUsIGRvbmVDbGFzc05hbWUpO1xuXG4gICAgICBpZiAoX3RoaXMucHJvcHMub25FbnRlcmVkKSB7XG4gICAgICAgIF90aGlzLnByb3BzLm9uRW50ZXJlZChub2RlLCBhcHBlYXJpbmcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5vbkV4aXQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdmFyIF90aGlzJGdldENsYXNzTmFtZXMzID0gX3RoaXMuZ2V0Q2xhc3NOYW1lcygnZXhpdCcpLFxuICAgICAgICAgIGNsYXNzTmFtZSA9IF90aGlzJGdldENsYXNzTmFtZXMzLmNsYXNzTmFtZTtcblxuICAgICAgX3RoaXMucmVtb3ZlQ2xhc3Nlcyhub2RlLCAnYXBwZWFyJyk7XG5cbiAgICAgIF90aGlzLnJlbW92ZUNsYXNzZXMobm9kZSwgJ2VudGVyJyk7XG5cbiAgICAgIGFkZENsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XG5cbiAgICAgIGlmIChfdGhpcy5wcm9wcy5vbkV4aXQpIHtcbiAgICAgICAgX3RoaXMucHJvcHMub25FeGl0KG5vZGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5vbkV4aXRpbmcgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdmFyIF90aGlzJGdldENsYXNzTmFtZXM0ID0gX3RoaXMuZ2V0Q2xhc3NOYW1lcygnZXhpdCcpLFxuICAgICAgICAgIGFjdGl2ZUNsYXNzTmFtZSA9IF90aGlzJGdldENsYXNzTmFtZXM0LmFjdGl2ZUNsYXNzTmFtZTtcblxuICAgICAgX3RoaXMucmVmbG93QW5kQWRkQ2xhc3Mobm9kZSwgYWN0aXZlQ2xhc3NOYW1lKTtcblxuICAgICAgaWYgKF90aGlzLnByb3BzLm9uRXhpdGluZykge1xuICAgICAgICBfdGhpcy5wcm9wcy5vbkV4aXRpbmcobm9kZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLm9uRXhpdGVkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHZhciBfdGhpcyRnZXRDbGFzc05hbWVzNSA9IF90aGlzLmdldENsYXNzTmFtZXMoJ2V4aXQnKSxcbiAgICAgICAgICBkb25lQ2xhc3NOYW1lID0gX3RoaXMkZ2V0Q2xhc3NOYW1lczUuZG9uZUNsYXNzTmFtZTtcblxuICAgICAgX3RoaXMucmVtb3ZlQ2xhc3Nlcyhub2RlLCAnZXhpdCcpO1xuXG4gICAgICBhZGRDbGFzcyhub2RlLCBkb25lQ2xhc3NOYW1lKTtcblxuICAgICAgaWYgKF90aGlzLnByb3BzLm9uRXhpdGVkKSB7XG4gICAgICAgIF90aGlzLnByb3BzLm9uRXhpdGVkKG5vZGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5nZXRDbGFzc05hbWVzID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIHZhciBjbGFzc05hbWVzID0gX3RoaXMucHJvcHMuY2xhc3NOYW1lcztcbiAgICAgIHZhciBpc1N0cmluZ0NsYXNzTmFtZXMgPSB0eXBlb2YgY2xhc3NOYW1lcyA9PT0gJ3N0cmluZyc7XG4gICAgICB2YXIgcHJlZml4ID0gaXNTdHJpbmdDbGFzc05hbWVzICYmIGNsYXNzTmFtZXMgPyBjbGFzc05hbWVzICsgJy0nIDogJyc7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gaXNTdHJpbmdDbGFzc05hbWVzID8gcHJlZml4ICsgdHlwZSA6IGNsYXNzTmFtZXNbdHlwZV07XG4gICAgICB2YXIgYWN0aXZlQ2xhc3NOYW1lID0gaXNTdHJpbmdDbGFzc05hbWVzID8gY2xhc3NOYW1lICsgJy1hY3RpdmUnIDogY2xhc3NOYW1lc1t0eXBlICsgJ0FjdGl2ZSddO1xuICAgICAgdmFyIGRvbmVDbGFzc05hbWUgPSBpc1N0cmluZ0NsYXNzTmFtZXMgPyBjbGFzc05hbWUgKyAnLWRvbmUnIDogY2xhc3NOYW1lc1t0eXBlICsgJ0RvbmUnXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICBhY3RpdmVDbGFzc05hbWU6IGFjdGl2ZUNsYXNzTmFtZSxcbiAgICAgICAgZG9uZUNsYXNzTmFtZTogZG9uZUNsYXNzTmFtZVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IENTU1RyYW5zaXRpb24ucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW1vdmVDbGFzc2VzID0gZnVuY3Rpb24gcmVtb3ZlQ2xhc3Nlcyhub2RlLCB0eXBlKSB7XG4gICAgdmFyIF90aGlzJGdldENsYXNzTmFtZXM2ID0gdGhpcy5nZXRDbGFzc05hbWVzKHR5cGUpLFxuICAgICAgICBjbGFzc05hbWUgPSBfdGhpcyRnZXRDbGFzc05hbWVzNi5jbGFzc05hbWUsXG4gICAgICAgIGFjdGl2ZUNsYXNzTmFtZSA9IF90aGlzJGdldENsYXNzTmFtZXM2LmFjdGl2ZUNsYXNzTmFtZSxcbiAgICAgICAgZG9uZUNsYXNzTmFtZSA9IF90aGlzJGdldENsYXNzTmFtZXM2LmRvbmVDbGFzc05hbWU7XG5cbiAgICBjbGFzc05hbWUgJiYgcmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcbiAgICBhY3RpdmVDbGFzc05hbWUgJiYgcmVtb3ZlQ2xhc3Mobm9kZSwgYWN0aXZlQ2xhc3NOYW1lKTtcbiAgICBkb25lQ2xhc3NOYW1lICYmIHJlbW92ZUNsYXNzKG5vZGUsIGRvbmVDbGFzc05hbWUpO1xuICB9O1xuXG4gIF9wcm90by5yZWZsb3dBbmRBZGRDbGFzcyA9IGZ1bmN0aW9uIHJlZmxvd0FuZEFkZENsYXNzKG5vZGUsIGNsYXNzTmFtZSkge1xuICAgIC8vIFRoaXMgaXMgZm9yIHRvIGZvcmNlIGEgcmVwYWludCxcbiAgICAvLyB3aGljaCBpcyBuZWNlc3NhcnkgaW4gb3JkZXIgdG8gdHJhbnNpdGlvbiBzdHlsZXMgd2hlbiBhZGRpbmcgYSBjbGFzcyBuYW1lLlxuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuICAgICAgbm9kZSAmJiBub2RlLnNjcm9sbFRvcDtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG5cbiAgICAgIGFkZENsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIHByb3BzID0gX2V4dGVuZHMoe30sIHRoaXMucHJvcHMpO1xuXG4gICAgZGVsZXRlIHByb3BzLmNsYXNzTmFtZXM7XG4gICAgcmV0dXJuIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1RyYW5zaXRpb24uZGVmYXVsdCwgX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgICBvbkVudGVyOiB0aGlzLm9uRW50ZXIsXG4gICAgICBvbkVudGVyZWQ6IHRoaXMub25FbnRlcmVkLFxuICAgICAgb25FbnRlcmluZzogdGhpcy5vbkVudGVyaW5nLFxuICAgICAgb25FeGl0OiB0aGlzLm9uRXhpdCxcbiAgICAgIG9uRXhpdGluZzogdGhpcy5vbkV4aXRpbmcsXG4gICAgICBvbkV4aXRlZDogdGhpcy5vbkV4aXRlZFxuICAgIH0pKTtcbiAgfTtcblxuICByZXR1cm4gQ1NTVHJhbnNpdGlvbjtcbn0oX3JlYWN0LmRlZmF1bHQuQ29tcG9uZW50KTtcblxuQ1NTVHJhbnNpdGlvbi5kZWZhdWx0UHJvcHMgPSB7XG4gIGNsYXNzTmFtZXM6ICcnXG59O1xuQ1NTVHJhbnNpdGlvbi5wcm9wVHlwZXMgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBfZXh0ZW5kcyh7fSwgX1RyYW5zaXRpb24uZGVmYXVsdC5wcm9wVHlwZXMsIHtcbiAgLyoqXG4gICAqIFRoZSBhbmltYXRpb24gY2xhc3NOYW1lcyBhcHBsaWVkIHRvIHRoZSBjb21wb25lbnQgYXMgaXQgZW50ZXJzLCBleGl0cyBvclxuICAgKiBoYXMgZmluaXNoZWQgdGhlIHRyYW5zaXRpb24uIEEgc2luZ2xlIG5hbWUgY2FuIGJlIHByb3ZpZGVkIGFuZCBpdCB3aWxsIGJlXG4gICAqIHN1ZmZpeGVkIGZvciBlYWNoIHN0YWdlOiBlLmcuXG4gICAqXG4gICAqIGBjbGFzc05hbWVzPVwiZmFkZVwiYCBhcHBsaWVzIGBmYWRlLWVudGVyYCwgYGZhZGUtZW50ZXItYWN0aXZlYCxcbiAgICogYGZhZGUtZW50ZXItZG9uZWAsIGBmYWRlLWV4aXRgLCBgZmFkZS1leGl0LWFjdGl2ZWAsIGBmYWRlLWV4aXQtZG9uZWAsXG4gICAqIGBmYWRlLWFwcGVhcmAsIGBmYWRlLWFwcGVhci1hY3RpdmVgLCBhbmQgYGZhZGUtYXBwZWFyLWRvbmVgLlxuICAgKlxuICAgKiAqKk5vdGUqKjogYGZhZGUtYXBwZWFyLWRvbmVgIGFuZCBgZmFkZS1lbnRlci1kb25lYCB3aWxsIF9ib3RoXyBiZSBhcHBsaWVkLlxuICAgKiBUaGlzIGFsbG93cyB5b3UgdG8gZGVmaW5lIGRpZmZlcmVudCBiZWhhdmlvciBmb3Igd2hlbiBhcHBlYXJpbmcgaXMgZG9uZSBhbmRcbiAgICogd2hlbiByZWd1bGFyIGVudGVyaW5nIGlzIGRvbmUsIHVzaW5nIHNlbGVjdG9ycyBsaWtlXG4gICAqIGAuZmFkZS1lbnRlci1kb25lOm5vdCguZmFkZS1hcHBlYXItZG9uZSlgLiBGb3IgZXhhbXBsZSwgeW91IGNvdWxkIGFwcGx5IGFuXG4gICAqIGVwaWMgZW50cmFuY2UgYW5pbWF0aW9uIHdoZW4gZWxlbWVudCBmaXJzdCBhcHBlYXJzIGluIHRoZSBET00gdXNpbmdcbiAgICogW0FuaW1hdGUuY3NzXShodHRwczovL2RhbmVkZW4uZ2l0aHViLmlvL2FuaW1hdGUuY3NzLykuIE90aGVyd2lzZSB5b3UgY2FuXG4gICAqIHNpbXBseSB1c2UgYGZhZGUtZW50ZXItZG9uZWAgZm9yIGRlZmluaW5nIGJvdGggY2FzZXMuXG4gICAqXG4gICAqIEVhY2ggaW5kaXZpZHVhbCBjbGFzc05hbWVzIGNhbiBhbHNvIGJlIHNwZWNpZmllZCBpbmRlcGVuZGVudGx5IGxpa2U6XG4gICAqXG4gICAqIGBgYGpzXG4gICAqIGNsYXNzTmFtZXM9e3tcbiAgICogIGFwcGVhcjogJ215LWFwcGVhcicsXG4gICAqICBhcHBlYXJBY3RpdmU6ICdteS1hY3RpdmUtYXBwZWFyJyxcbiAgICogIGFwcGVhckRvbmU6ICdteS1kb25lLWFwcGVhcicsXG4gICAqICBlbnRlcjogJ215LWVudGVyJyxcbiAgICogIGVudGVyQWN0aXZlOiAnbXktYWN0aXZlLWVudGVyJyxcbiAgICogIGVudGVyRG9uZTogJ215LWRvbmUtZW50ZXInLFxuICAgKiAgZXhpdDogJ215LWV4aXQnLFxuICAgKiAgZXhpdEFjdGl2ZTogJ215LWFjdGl2ZS1leGl0JyxcbiAgICogIGV4aXREb25lOiAnbXktZG9uZS1leGl0JyxcbiAgICogfX1cbiAgICogYGBgXG4gICAqXG4gICAqIElmIHlvdSB3YW50IHRvIHNldCB0aGVzZSBjbGFzc2VzIHVzaW5nIENTUyBNb2R1bGVzOlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiBpbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzLmNzcyc7XG4gICAqIGBgYFxuICAgKlxuICAgKiB5b3UgbWlnaHQgd2FudCB0byB1c2UgY2FtZWxDYXNlIGluIHlvdXIgQ1NTIGZpbGUsIHRoYXQgd2F5IGNvdWxkIHNpbXBseVxuICAgKiBzcHJlYWQgdGhlbSBpbnN0ZWFkIG9mIGxpc3RpbmcgdGhlbSBvbmUgYnkgb25lOlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiBjbGFzc05hbWVzPXt7IC4uLnN0eWxlcyB9fVxuICAgKiBgYGBcbiAgICpcbiAgICogQHR5cGUge3N0cmluZyB8IHtcbiAgICogIGFwcGVhcj86IHN0cmluZyxcbiAgICogIGFwcGVhckFjdGl2ZT86IHN0cmluZyxcbiAgICogIGFwcGVhckRvbmU/OiBzdHJpbmcsXG4gICAqICBlbnRlcj86IHN0cmluZyxcbiAgICogIGVudGVyQWN0aXZlPzogc3RyaW5nLFxuICAgKiAgZW50ZXJEb25lPzogc3RyaW5nLFxuICAgKiAgZXhpdD86IHN0cmluZyxcbiAgICogIGV4aXRBY3RpdmU/OiBzdHJpbmcsXG4gICAqICBleGl0RG9uZT86IHN0cmluZyxcbiAgICogfX1cbiAgICovXG4gIGNsYXNzTmFtZXM6IF9Qcm9wVHlwZXMuY2xhc3NOYW1lc1NoYXBlLFxuXG4gIC8qKlxuICAgKiBBIGA8VHJhbnNpdGlvbj5gIGNhbGxiYWNrIGZpcmVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSAnZW50ZXInIG9yICdhcHBlYXInIGNsYXNzIGlzXG4gICAqIGFwcGxpZWQuXG4gICAqXG4gICAqIEB0eXBlIEZ1bmN0aW9uKG5vZGU6IEh0bWxFbGVtZW50LCBpc0FwcGVhcmluZzogYm9vbClcbiAgICovXG4gIG9uRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBBIGA8VHJhbnNpdGlvbj5gIGNhbGxiYWNrIGZpcmVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSAnZW50ZXItYWN0aXZlJyBvclxuICAgKiAnYXBwZWFyLWFjdGl2ZScgY2xhc3MgaXMgYXBwbGllZC5cbiAgICpcbiAgICogQHR5cGUgRnVuY3Rpb24obm9kZTogSHRtbEVsZW1lbnQsIGlzQXBwZWFyaW5nOiBib29sKVxuICAgKi9cbiAgb25FbnRlcmluZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIEEgYDxUcmFuc2l0aW9uPmAgY2FsbGJhY2sgZmlyZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlICdlbnRlcicgb3JcbiAgICogJ2FwcGVhcicgY2xhc3NlcyBhcmUgKipyZW1vdmVkKiogYW5kIHRoZSBgZG9uZWAgY2xhc3MgaXMgYWRkZWQgdG8gdGhlIERPTSBub2RlLlxuICAgKlxuICAgKiBAdHlwZSBGdW5jdGlvbihub2RlOiBIdG1sRWxlbWVudCwgaXNBcHBlYXJpbmc6IGJvb2wpXG4gICAqL1xuICBvbkVudGVyZWQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBBIGA8VHJhbnNpdGlvbj5gIGNhbGxiYWNrIGZpcmVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSAnZXhpdCcgY2xhc3MgaXNcbiAgICogYXBwbGllZC5cbiAgICpcbiAgICogQHR5cGUgRnVuY3Rpb24obm9kZTogSHRtbEVsZW1lbnQpXG4gICAqL1xuICBvbkV4aXQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBBIGA8VHJhbnNpdGlvbj5gIGNhbGxiYWNrIGZpcmVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSAnZXhpdC1hY3RpdmUnIGlzIGFwcGxpZWQuXG4gICAqXG4gICAqIEB0eXBlIEZ1bmN0aW9uKG5vZGU6IEh0bWxFbGVtZW50KVxuICAgKi9cbiAgb25FeGl0aW5nOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQSBgPFRyYW5zaXRpb24+YCBjYWxsYmFjayBmaXJlZCBpbW1lZGlhdGVseSBhZnRlciB0aGUgJ2V4aXQnIGNsYXNzZXNcbiAgICogYXJlICoqcmVtb3ZlZCoqIGFuZCB0aGUgYGV4aXQtZG9uZWAgY2xhc3MgaXMgYWRkZWQgdG8gdGhlIERPTSBub2RlLlxuICAgKlxuICAgKiBAdHlwZSBGdW5jdGlvbihub2RlOiBIdG1sRWxlbWVudClcbiAgICovXG4gIG9uRXhpdGVkOiBQcm9wVHlwZXMuZnVuY1xufSkgOiB7fTtcbnZhciBfZGVmYXVsdCA9IENTU1RyYW5zaXRpb247XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfcHJvcFR5cGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicHJvcC10eXBlc1wiKSk7XG5cbnZhciBfcmVhY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cbnZhciBfcmVhY3RMaWZlY3ljbGVzQ29tcGF0ID0gcmVxdWlyZShcInJlYWN0LWxpZmVjeWNsZXMtY29tcGF0XCIpO1xuXG52YXIgX0NoaWxkTWFwcGluZyA9IHJlcXVpcmUoXCIuL3V0aWxzL0NoaWxkTWFwcGluZ1wiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkgeyBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTsgdmFyIHRhcmdldCA9IHt9OyB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7IHZhciBrZXksIGk7IGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7IGtleSA9IHNvdXJjZUtleXNbaV07IGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHsgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9OyByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbnZhciB2YWx1ZXMgPSBPYmplY3QudmFsdWVzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGZ1bmN0aW9uIChrKSB7XG4gICAgcmV0dXJuIG9ialtrXTtcbiAgfSk7XG59O1xuXG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBjb21wb25lbnQ6ICdkaXYnLFxuICBjaGlsZEZhY3Rvcnk6IGZ1bmN0aW9uIGNoaWxkRmFjdG9yeShjaGlsZCkge1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuICAvKipcbiAgICogVGhlIGA8VHJhbnNpdGlvbkdyb3VwPmAgY29tcG9uZW50IG1hbmFnZXMgYSBzZXQgb2YgdHJhbnNpdGlvbiBjb21wb25lbnRzXG4gICAqIChgPFRyYW5zaXRpb24+YCBhbmQgYDxDU1NUcmFuc2l0aW9uPmApIGluIGEgbGlzdC4gTGlrZSB3aXRoIHRoZSB0cmFuc2l0aW9uXG4gICAqIGNvbXBvbmVudHMsIGA8VHJhbnNpdGlvbkdyb3VwPmAgaXMgYSBzdGF0ZSBtYWNoaW5lIGZvciBtYW5hZ2luZyB0aGUgbW91bnRpbmdcbiAgICogYW5kIHVubW91bnRpbmcgb2YgY29tcG9uZW50cyBvdmVyIHRpbWUuXG4gICAqXG4gICAqIENvbnNpZGVyIHRoZSBleGFtcGxlIGJlbG93LiBBcyBpdGVtcyBhcmUgcmVtb3ZlZCBvciBhZGRlZCB0byB0aGUgVG9kb0xpc3QgdGhlXG4gICAqIGBpbmAgcHJvcCBpcyB0b2dnbGVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGA8VHJhbnNpdGlvbkdyb3VwPmAuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBgPFRyYW5zaXRpb25Hcm91cD5gICBkb2VzIG5vdCBkZWZpbmUgYW55IGFuaW1hdGlvbiBiZWhhdmlvciFcbiAgICogRXhhY3RseSBfaG93XyBhIGxpc3QgaXRlbSBhbmltYXRlcyBpcyB1cCB0byB0aGUgaW5kaXZpZHVhbCB0cmFuc2l0aW9uXG4gICAqIGNvbXBvbmVudC4gVGhpcyBtZWFucyB5b3UgY2FuIG1peCBhbmQgbWF0Y2ggYW5pbWF0aW9ucyBhY3Jvc3MgZGlmZmVyZW50IGxpc3RcbiAgICogaXRlbXMuXG4gICAqL1xuXG59O1xuXG52YXIgVHJhbnNpdGlvbkdyb3VwID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKFRyYW5zaXRpb25Hcm91cCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gVHJhbnNpdGlvbkdyb3VwKHByb3BzLCBjb250ZXh0KSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpIHx8IHRoaXM7XG5cbiAgICB2YXIgaGFuZGxlRXhpdGVkID0gX3RoaXMuaGFuZGxlRXhpdGVkLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSkpOyAvLyBJbml0aWFsIGNoaWxkcmVuIHNob3VsZCBhbGwgYmUgZW50ZXJpbmcsIGRlcGVuZGVudCBvbiBhcHBlYXJcblxuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBoYW5kbGVFeGl0ZWQ6IGhhbmRsZUV4aXRlZCxcbiAgICAgIGZpcnN0UmVuZGVyOiB0cnVlXG4gICAgfTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gVHJhbnNpdGlvbkdyb3VwLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2l0aW9uR3JvdXA6IHtcbiAgICAgICAgaXNNb3VudGluZzogIXRoaXMuYXBwZWFyZWRcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuYXBwZWFyZWQgPSB0cnVlO1xuICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5tb3VudGVkID0gZmFsc2U7XG4gIH07XG5cbiAgVHJhbnNpdGlvbkdyb3VwLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyA9IGZ1bmN0aW9uIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIF9yZWYpIHtcbiAgICB2YXIgcHJldkNoaWxkTWFwcGluZyA9IF9yZWYuY2hpbGRyZW4sXG4gICAgICAgIGhhbmRsZUV4aXRlZCA9IF9yZWYuaGFuZGxlRXhpdGVkLFxuICAgICAgICBmaXJzdFJlbmRlciA9IF9yZWYuZmlyc3RSZW5kZXI7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNoaWxkcmVuOiBmaXJzdFJlbmRlciA/ICgwLCBfQ2hpbGRNYXBwaW5nLmdldEluaXRpYWxDaGlsZE1hcHBpbmcpKG5leHRQcm9wcywgaGFuZGxlRXhpdGVkKSA6ICgwLCBfQ2hpbGRNYXBwaW5nLmdldE5leHRDaGlsZE1hcHBpbmcpKG5leHRQcm9wcywgcHJldkNoaWxkTWFwcGluZywgaGFuZGxlRXhpdGVkKSxcbiAgICAgIGZpcnN0UmVuZGVyOiBmYWxzZVxuICAgIH07XG4gIH07XG5cbiAgX3Byb3RvLmhhbmRsZUV4aXRlZCA9IGZ1bmN0aW9uIGhhbmRsZUV4aXRlZChjaGlsZCwgbm9kZSkge1xuICAgIHZhciBjdXJyZW50Q2hpbGRNYXBwaW5nID0gKDAsIF9DaGlsZE1hcHBpbmcuZ2V0Q2hpbGRNYXBwaW5nKSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgICBpZiAoY2hpbGQua2V5IGluIGN1cnJlbnRDaGlsZE1hcHBpbmcpIHJldHVybjtcblxuICAgIGlmIChjaGlsZC5wcm9wcy5vbkV4aXRlZCkge1xuICAgICAgY2hpbGQucHJvcHMub25FeGl0ZWQobm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubW91bnRlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gX2V4dGVuZHMoe30sIHN0YXRlLmNoaWxkcmVuKTtcblxuICAgICAgICBkZWxldGUgY2hpbGRyZW5bY2hpbGQua2V5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyRwcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgIENvbXBvbmVudCA9IF90aGlzJHByb3BzLmNvbXBvbmVudCxcbiAgICAgICAgY2hpbGRGYWN0b3J5ID0gX3RoaXMkcHJvcHMuY2hpbGRGYWN0b3J5LFxuICAgICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF90aGlzJHByb3BzLCBbXCJjb21wb25lbnRcIiwgXCJjaGlsZEZhY3RvcnlcIl0pO1xuXG4gICAgdmFyIGNoaWxkcmVuID0gdmFsdWVzKHRoaXMuc3RhdGUuY2hpbGRyZW4pLm1hcChjaGlsZEZhY3RvcnkpO1xuICAgIGRlbGV0ZSBwcm9wcy5hcHBlYXI7XG4gICAgZGVsZXRlIHByb3BzLmVudGVyO1xuICAgIGRlbGV0ZSBwcm9wcy5leGl0O1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cblxuICAgIHJldHVybiBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMsIGNoaWxkcmVuKTtcbiAgfTtcblxuICByZXR1cm4gVHJhbnNpdGlvbkdyb3VwO1xufShfcmVhY3QuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5UcmFuc2l0aW9uR3JvdXAuY2hpbGRDb250ZXh0VHlwZXMgPSB7XG4gIHRyYW5zaXRpb25Hcm91cDogX3Byb3BUeXBlcy5kZWZhdWx0Lm9iamVjdC5pc1JlcXVpcmVkXG59O1xuVHJhbnNpdGlvbkdyb3VwLnByb3BUeXBlcyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHtcbiAgLyoqXG4gICAqIGA8VHJhbnNpdGlvbkdyb3VwPmAgcmVuZGVycyBhIGA8ZGl2PmAgYnkgZGVmYXVsdC4gWW91IGNhbiBjaGFuZ2UgdGhpc1xuICAgKiBiZWhhdmlvciBieSBwcm92aWRpbmcgYSBgY29tcG9uZW50YCBwcm9wLlxuICAgKiBJZiB5b3UgdXNlIFJlYWN0IHYxNisgYW5kIHdvdWxkIGxpa2UgdG8gYXZvaWQgYSB3cmFwcGluZyBgPGRpdj5gIGVsZW1lbnRcbiAgICogeW91IGNhbiBwYXNzIGluIGBjb21wb25lbnQ9e251bGx9YC4gVGhpcyBpcyB1c2VmdWwgaWYgdGhlIHdyYXBwaW5nIGRpdlxuICAgKiBib3JrcyB5b3VyIGNzcyBzdHlsZXMuXG4gICAqL1xuICBjb21wb25lbnQ6IF9wcm9wVHlwZXMuZGVmYXVsdC5hbnksXG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIGA8VHJhbnNpdGlvbj5gIGNvbXBvbmVudHMsIHRoYXQgYXJlIHRvZ2dsZWQgYGluYCBhbmQgb3V0IGFzIHRoZXlcbiAgICogbGVhdmUuIHRoZSBgPFRyYW5zaXRpb25Hcm91cD5gIHdpbGwgaW5qZWN0IHNwZWNpZmljIHRyYW5zaXRpb24gcHJvcHMsIHNvXG4gICAqIHJlbWVtYmVyIHRvIHNwcmVhZCB0aGVtIHRocm91Z2ggaWYgeW91IGFyZSB3cmFwcGluZyB0aGUgYDxUcmFuc2l0aW9uPmAgYXNcbiAgICogd2l0aCBvdXIgYDxGYWRlPmAgZXhhbXBsZS5cbiAgICpcbiAgICogV2hpbGUgdGhpcyBjb21wb25lbnQgaXMgbWVhbnQgZm9yIG11bHRpcGxlIGBUcmFuc2l0aW9uYCBvciBgQ1NTVHJhbnNpdGlvbmBcbiAgICogY2hpbGRyZW4sIHNvbWV0aW1lcyB5b3UgbWF5IHdhbnQgdG8gaGF2ZSBhIHNpbmdsZSB0cmFuc2l0aW9uIGNoaWxkIHdpdGhcbiAgICogY29udGVudCB0aGF0IHlvdSB3YW50IHRvIGJlIHRyYW5zaXRpb25lZCBvdXQgYW5kIGluIHdoZW4geW91IGNoYW5nZSBpdFxuICAgKiAoZS5nLiByb3V0ZXMsIGltYWdlcyBldGMuKSBJbiB0aGF0IGNhc2UgeW91IGNhbiBjaGFuZ2UgdGhlIGBrZXlgIHByb3Agb2ZcbiAgICogdGhlIHRyYW5zaXRpb24gY2hpbGQgYXMgeW91IGNoYW5nZSBpdHMgY29udGVudCwgdGhpcyB3aWxsIGNhdXNlXG4gICAqIGBUcmFuc2l0aW9uR3JvdXBgIHRvIHRyYW5zaXRpb24gdGhlIGNoaWxkIG91dCBhbmQgYmFjayBpbi5cbiAgICovXG4gIGNoaWxkcmVuOiBfcHJvcFR5cGVzLmRlZmF1bHQubm9kZSxcblxuICAvKipcbiAgICogQSBjb252ZW5pZW5jZSBwcm9wIHRoYXQgZW5hYmxlcyBvciBkaXNhYmxlcyBhcHBlYXIgYW5pbWF0aW9uc1xuICAgKiBmb3IgYWxsIGNoaWxkcmVuLiBOb3RlIHRoYXQgc3BlY2lmeWluZyB0aGlzIHdpbGwgb3ZlcnJpZGUgYW55IGRlZmF1bHRzIHNldFxuICAgKiBvbiBpbmRpdmlkdWFsIGNoaWxkcmVuIFRyYW5zaXRpb25zLlxuICAgKi9cbiAgYXBwZWFyOiBfcHJvcFR5cGVzLmRlZmF1bHQuYm9vbCxcblxuICAvKipcbiAgICogQSBjb252ZW5pZW5jZSBwcm9wIHRoYXQgZW5hYmxlcyBvciBkaXNhYmxlcyBlbnRlciBhbmltYXRpb25zXG4gICAqIGZvciBhbGwgY2hpbGRyZW4uIE5vdGUgdGhhdCBzcGVjaWZ5aW5nIHRoaXMgd2lsbCBvdmVycmlkZSBhbnkgZGVmYXVsdHMgc2V0XG4gICAqIG9uIGluZGl2aWR1YWwgY2hpbGRyZW4gVHJhbnNpdGlvbnMuXG4gICAqL1xuICBlbnRlcjogX3Byb3BUeXBlcy5kZWZhdWx0LmJvb2wsXG5cbiAgLyoqXG4gICAqIEEgY29udmVuaWVuY2UgcHJvcCB0aGF0IGVuYWJsZXMgb3IgZGlzYWJsZXMgZXhpdCBhbmltYXRpb25zXG4gICAqIGZvciBhbGwgY2hpbGRyZW4uIE5vdGUgdGhhdCBzcGVjaWZ5aW5nIHRoaXMgd2lsbCBvdmVycmlkZSBhbnkgZGVmYXVsdHMgc2V0XG4gICAqIG9uIGluZGl2aWR1YWwgY2hpbGRyZW4gVHJhbnNpdGlvbnMuXG4gICAqL1xuICBleGl0OiBfcHJvcFR5cGVzLmRlZmF1bHQuYm9vbCxcblxuICAvKipcbiAgICogWW91IG1heSBuZWVkIHRvIGFwcGx5IHJlYWN0aXZlIHVwZGF0ZXMgdG8gYSBjaGlsZCBhcyBpdCBpcyBleGl0aW5nLlxuICAgKiBUaGlzIGlzIGdlbmVyYWxseSBkb25lIGJ5IHVzaW5nIGBjbG9uZUVsZW1lbnRgIGhvd2V2ZXIgaW4gdGhlIGNhc2Ugb2YgYW4gZXhpdGluZ1xuICAgKiBjaGlsZCB0aGUgZWxlbWVudCBoYXMgYWxyZWFkeSBiZWVuIHJlbW92ZWQgYW5kIG5vdCBhY2Nlc3NpYmxlIHRvIHRoZSBjb25zdW1lci5cbiAgICpcbiAgICogSWYgeW91IGRvIG5lZWQgdG8gdXBkYXRlIGEgY2hpbGQgYXMgaXQgbGVhdmVzIHlvdSBjYW4gcHJvdmlkZSBhIGBjaGlsZEZhY3RvcnlgXG4gICAqIHRvIHdyYXAgZXZlcnkgY2hpbGQsIGV2ZW4gdGhlIG9uZXMgdGhhdCBhcmUgbGVhdmluZy5cbiAgICpcbiAgICogQHR5cGUgRnVuY3Rpb24oY2hpbGQ6IFJlYWN0RWxlbWVudCkgLT4gUmVhY3RFbGVtZW50XG4gICAqL1xuICBjaGlsZEZhY3Rvcnk6IF9wcm9wVHlwZXMuZGVmYXVsdC5mdW5jXG59IDoge307XG5UcmFuc2l0aW9uR3JvdXAuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG52YXIgX2RlZmF1bHQgPSAoMCwgX3JlYWN0TGlmZWN5Y2xlc0NvbXBhdC5wb2x5ZmlsbCkoVHJhbnNpdGlvbkdyb3VwKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5jbGFzc05hbWVzU2hhcGUgPSBleHBvcnRzLnRpbWVvdXRzU2hhcGUgPSB2b2lkIDA7XG5cbnZhciBfcHJvcFR5cGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicHJvcC10eXBlc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciB0aW1lb3V0c1NoYXBlID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF9wcm9wVHlwZXMuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMuZGVmYXVsdC5udW1iZXIsIF9wcm9wVHlwZXMuZGVmYXVsdC5zaGFwZSh7XG4gIGVudGVyOiBfcHJvcFR5cGVzLmRlZmF1bHQubnVtYmVyLFxuICBleGl0OiBfcHJvcFR5cGVzLmRlZmF1bHQubnVtYmVyLFxuICBhcHBlYXI6IF9wcm9wVHlwZXMuZGVmYXVsdC5udW1iZXJcbn0pLmlzUmVxdWlyZWRdKSA6IG51bGw7XG5leHBvcnRzLnRpbWVvdXRzU2hhcGUgPSB0aW1lb3V0c1NoYXBlO1xudmFyIGNsYXNzTmFtZXNTaGFwZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfcHJvcFR5cGVzLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzLmRlZmF1bHQuc2hhcGUoe1xuICBlbnRlcjogX3Byb3BUeXBlcy5kZWZhdWx0LnN0cmluZyxcbiAgZXhpdDogX3Byb3BUeXBlcy5kZWZhdWx0LnN0cmluZyxcbiAgYWN0aXZlOiBfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nXG59KSwgX3Byb3BUeXBlcy5kZWZhdWx0LnNoYXBlKHtcbiAgZW50ZXI6IF9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmcsXG4gIGVudGVyRG9uZTogX3Byb3BUeXBlcy5kZWZhdWx0LnN0cmluZyxcbiAgZW50ZXJBY3RpdmU6IF9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmcsXG4gIGV4aXQ6IF9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmcsXG4gIGV4aXREb25lOiBfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nLFxuICBleGl0QWN0aXZlOiBfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nXG59KV0pIDogbnVsbDtcbmV4cG9ydHMuY2xhc3NOYW1lc1NoYXBlID0gY2xhc3NOYW1lc1NoYXBlOyJdLCJzb3VyY2VSb290IjoiIn0=
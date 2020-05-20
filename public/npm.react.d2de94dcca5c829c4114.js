(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.react"],{

/***/ "ctBr":
/*!*****************************************************!*\
  !*** ./node_modules/react/cjs/react.development.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


if (true) {
  (function () {
    'use strict';

    var _assign = __webpack_require__(/*! object-assign */ "MgzW");

    var checkPropTypes = __webpack_require__(/*! prop-types/checkPropTypes */ "oVyQ");

    var ReactVersion = '16.13.1'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary

    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== 'object') {
        return null;
      }

      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }

      return null;
    }
    /**
     * Keeps track of the current dispatcher.
     */


    var ReactCurrentDispatcher = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };
    /**
     * Keeps track of the current batch's configuration such as how long an update
     * should suspend for if it needs to.
     */

    var ReactCurrentBatchConfig = {
      suspense: null
    };
    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */

    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };
    var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

    function describeComponentFrame(name, source, ownerName) {
      var sourceInfo = '';

      if (source) {
        var path = source.fileName;
        var fileName = path.replace(BEFORE_SLASH_RE, '');
        {
          // In DEV, include code for a common special case:
          // prefer "folder/index.js" instead of just "index.js".
          if (/^index\./.test(fileName)) {
            var match = path.match(BEFORE_SLASH_RE);

            if (match) {
              var pathBeforeSlash = match[1];

              if (pathBeforeSlash) {
                var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
                fileName = folderName + '/' + fileName;
              }
            }
          }
        }
        sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
      } else if (ownerName) {
        sourceInfo = ' (created by ' + ownerName + ')';
      }

      return '\n    in ' + (name || 'Unknown') + sourceInfo;
    }

    var Resolved = 1;

    function refineResolvedLazyComponent(lazyComponent) {
      return lazyComponent._status === Resolved ? lazyComponent._result : null;
    }

    function getWrappedName(outerType, innerType, wrapperName) {
      var functionName = innerType.displayName || innerType.name || '';
      return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
    }

    function getComponentName(type) {
      if (type == null) {
        // Host root, text node or just invalid type.
        return null;
      }

      {
        if (typeof type.tag === 'number') {
          error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
        }
      }

      if (typeof type === 'function') {
        return type.displayName || type.name || null;
      }

      if (typeof type === 'string') {
        return type;
      }

      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return 'Fragment';

        case REACT_PORTAL_TYPE:
          return 'Portal';

        case REACT_PROFILER_TYPE:
          return "Profiler";

        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode';

        case REACT_SUSPENSE_TYPE:
          return 'Suspense';

        case REACT_SUSPENSE_LIST_TYPE:
          return 'SuspenseList';
      }

      if (typeof type === 'object') {
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            return 'Context.Consumer';

          case REACT_PROVIDER_TYPE:
            return 'Context.Provider';

          case REACT_FORWARD_REF_TYPE:
            return getWrappedName(type, type.render, 'ForwardRef');

          case REACT_MEMO_TYPE:
            return getComponentName(type.type);

          case REACT_BLOCK_TYPE:
            return getComponentName(type.render);

          case REACT_LAZY_TYPE:
            {
              var thenable = type;
              var resolvedThenable = refineResolvedLazyComponent(thenable);

              if (resolvedThenable) {
                return getComponentName(resolvedThenable);
              }

              break;
            }
        }
      }

      return null;
    }

    var ReactDebugCurrentFrame = {};
    var currentlyValidatingElement = null;

    function setCurrentlyValidatingElement(element) {
      {
        currentlyValidatingElement = element;
      }
    }

    {
      // Stack implementation injected by the current renderer.
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var stack = ''; // Add an extra top frame while an element is being validated

        if (currentlyValidatingElement) {
          var name = getComponentName(currentlyValidatingElement.type);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
        } // Delegate to the injected renderer-specific implementation


        var impl = ReactDebugCurrentFrame.getCurrentStack;

        if (impl) {
          stack += impl() || '';
        }

        return stack;
      };
    }
    /**
     * Used by act() to track whether you're inside an act() scope.
     */

    var IsSomeRendererActing = {
      current: false
    };
    var ReactSharedInternals = {
      ReactCurrentDispatcher: ReactCurrentDispatcher,
      ReactCurrentBatchConfig: ReactCurrentBatchConfig,
      ReactCurrentOwner: ReactCurrentOwner,
      IsSomeRendererActing: IsSomeRendererActing,
      // Used by renderers to avoid bundling object-assign twice in UMD bundles:
      assign: _assign
    };
    {
      _assign(ReactSharedInternals, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    } // by calls to these methods by a Babel plugin.
    //
    // In PROD (or in packages without access to React internals),
    // they are left as they are instead.

    function warn(format) {
      {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        printWarning('warn', format, args);
      }
    }

    function error(format) {
      {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        printWarning('error', format, args);
      }
    }

    function printWarning(level, format, args) {
      // When changing this logic, you might want to also
      // update consoleWithStackDev.www.js as well.
      {
        var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\n    in') === 0;

        if (!hasExistingStack) {
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame.getStackAddendum();

          if (stack !== '') {
            format += '%s';
            args = args.concat([stack]);
          }
        }

        var argsWithFormat = args.map(function (item) {
          return '' + item;
        }); // Careful: RN currently depends on this prefix

        argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
        // breaks IE9: https://github.com/facebook/react/issues/13610
        // eslint-disable-next-line react-internal/no-production-logging

        Function.prototype.apply.call(console[level], console, argsWithFormat);

        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });
          throw new Error(message);
        } catch (x) {}
      }
    }

    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var _constructor = publicInstance.constructor;
        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
        var warningKey = componentName + "." + callerName;

        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }

        error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }
    /**
     * This is the abstract API for an update queue.
     */


    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function (publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function (publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function (publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };
    var emptyObject = {};
    {
      Object.freeze(emptyObject);
    }
    /**
     * Base class helpers for the updating state of a component.
     */

    function Component(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};
    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */

    Component.prototype.setState = function (partialState, callback) {
      if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
        {
          throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        }
      }

      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };
    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */


    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };
    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */


    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };

      var defineDeprecationWarning = function (methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function () {
            warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };

      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    function ComponentDummy() {}

    ComponentDummy.prototype = Component.prototype;
    /**
     * Convenience component with default shallow equality check for sCU.
     */

    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

    _assign(pureComponentPrototype, Component.prototype);

    pureComponentPrototype.isPureReactComponent = true; // an immutable object with a single mutable value

    function createRef() {
      var refObject = {
        current: null
      };
      {
        Object.seal(refObject);
      }
      return refObject;
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
    {
      didWarnAboutStringRefs = {};
    }

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function () {
        {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
          }
        }
      };

      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function () {
        {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true;
            error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
          }
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    function warnIfStringRefCannotBeAutoConverted(config) {
      {
        if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
          var componentName = getComponentName(ReactCurrentOwner.current.type);

          if (!didWarnAboutStringRefs[componentName]) {
            error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://fb.me/react-strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);
            didWarnAboutStringRefs[componentName] = true;
          }
        }
      }
    }
    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, instanceof check
     * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} props
     * @param {*} key
     * @param {string|object} ref
     * @param {*} owner
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @internal
     */


    var ReactElement = function (type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.

        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }); // self and source are DEV only properties.

        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.

        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });

        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */


    function createElement(type, config, children) {
      var propName; // Reserved names are extracted

      var props = {};
      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
          {
            warnIfStringRefCannotBeAutoConverted(config);
          }
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      {
        if (key || ref) {
          var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

          if (key) {
            defineKeyPropWarningGetter(props, displayName);
          }

          if (ref) {
            defineRefPropWarningGetter(props, displayName);
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }

    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    }
    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */


    function cloneElement(element, config, children) {
      if (!!(element === null || element === undefined)) {
        {
          throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
        }
      }

      var propName; // Original props are copied

      var props = _assign({}, element.props); // Reserved names are extracted


      var key = element.key;
      var ref = element.ref; // Self is preserved since the owner is preserved.

      var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.

      var source = element._source; // Owner will be preserved, unless ref is overridden

      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        } // Remaining properties override existing props


        var defaultProps;

        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }
    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a ReactElement.
     * @final
     */


    function isValidElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';
    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */

    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });
      return '$' + escapedString;
    }
    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */


    var didWarnAboutMaps = false;
    var userProvidedKeyEscapeRegex = /\/+/g;

    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];

    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;

      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }
    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children;

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;

          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }

        }
      }

      if (invokeCallback) {
        callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.

      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);

        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              if (!didWarnAboutMaps) {
                warn('Using Maps as children is deprecated and will be removed in ' + 'a future major release. Consider converting children to ' + 'an array of keyed ReactElements instead.');
              }

              didWarnAboutMaps = true;
            }
          }
          var iterator = iteratorFn.call(children);
          var step;
          var ii = 0;

          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          {
            {
              throw Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ")." + addendum);
            }
          }
        }
      }

      return subtreeCount;
    }
    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }
    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */


    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (typeof component === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      } // Implicit key determined by the index in the set


      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;
      func.call(context, child, bookKeeping.count++);
    }
    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */


    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }

      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;
      var mappedChild = func.call(context, child, bookKeeping.count++);

      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
          return c;
        });
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }

        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';

      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }

      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }
    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenmap
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */


    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }

      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }
    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrencount
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */


    function countChildren(children) {
      return traverseAllChildren(children, function () {
        return null;
      }, null);
    }
    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
     */


    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
        return child;
      });
      return result;
    }
    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenonly
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */


    function onlyChild(children) {
      if (!isValidElement(children)) {
        {
          throw Error("React.Children.only expected to receive a single React element child.");
        }
      }

      return children;
    }

    function createContext(defaultValue, calculateChangedBits) {
      if (calculateChangedBits === undefined) {
        calculateChangedBits = null;
      } else {
        {
          if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
            error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
          }
        }
      }

      var context = {
        $$typeof: REACT_CONTEXT_TYPE,
        _calculateChangedBits: calculateChangedBits,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        // Used to track how many concurrent renderers this context currently
        // supports within in a single renderer. Such as parallel server rendering.
        _threadCount: 0,
        // These are circular
        Provider: null,
        Consumer: null
      };
      context.Provider = {
        $$typeof: REACT_PROVIDER_TYPE,
        _context: context
      };
      var hasWarnedAboutUsingNestedContextConsumers = false;
      var hasWarnedAboutUsingConsumerProvider = false;
      {
        // A separate object, but proxies back to the original context object for
        // backwards compatibility. It has a different $$typeof, so we can properly
        // warn for the incorrect usage of Context as a Consumer.
        var Consumer = {
          $$typeof: REACT_CONTEXT_TYPE,
          _context: context,
          _calculateChangedBits: context._calculateChangedBits
        }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

        Object.defineProperties(Consumer, {
          Provider: {
            get: function () {
              if (!hasWarnedAboutUsingConsumerProvider) {
                hasWarnedAboutUsingConsumerProvider = true;
                error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
              }

              return context.Provider;
            },
            set: function (_Provider) {
              context.Provider = _Provider;
            }
          },
          _currentValue: {
            get: function () {
              return context._currentValue;
            },
            set: function (_currentValue) {
              context._currentValue = _currentValue;
            }
          },
          _currentValue2: {
            get: function () {
              return context._currentValue2;
            },
            set: function (_currentValue2) {
              context._currentValue2 = _currentValue2;
            }
          },
          _threadCount: {
            get: function () {
              return context._threadCount;
            },
            set: function (_threadCount) {
              context._threadCount = _threadCount;
            }
          },
          Consumer: {
            get: function () {
              if (!hasWarnedAboutUsingNestedContextConsumers) {
                hasWarnedAboutUsingNestedContextConsumers = true;
                error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
              }

              return context.Consumer;
            }
          }
        }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

        context.Consumer = Consumer;
      }
      {
        context._currentRenderer = null;
        context._currentRenderer2 = null;
      }
      return context;
    }

    function lazy(ctor) {
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _ctor: ctor,
        // React uses these fields to store the result.
        _status: -1,
        _result: null
      };
      {
        // In production, this would just set it on the object.
        var defaultProps;
        var propTypes;
        Object.defineProperties(lazyType, {
          defaultProps: {
            configurable: true,
            get: function () {
              return defaultProps;
            },
            set: function (newDefaultProps) {
              error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
              defaultProps = newDefaultProps; // Match production behavior more closely:

              Object.defineProperty(lazyType, 'defaultProps', {
                enumerable: true
              });
            }
          },
          propTypes: {
            configurable: true,
            get: function () {
              return propTypes;
            },
            set: function (newPropTypes) {
              error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
              propTypes = newPropTypes; // Match production behavior more closely:

              Object.defineProperty(lazyType, 'propTypes', {
                enumerable: true
              });
            }
          }
        });
      }
      return lazyType;
    }

    function forwardRef(render) {
      {
        if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
          error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
        } else if (typeof render !== 'function') {
          error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
        } else {
          if (render.length !== 0 && render.length !== 2) {
            error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
          }
        }

        if (render != null) {
          if (render.defaultProps != null || render.propTypes != null) {
            error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
          }
        }
      }
      return {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render
      };
    }

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }

    function memo(type, compare) {
      {
        if (!isValidElementType(type)) {
          error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
        }
      }
      return {
        $$typeof: REACT_MEMO_TYPE,
        type: type,
        compare: compare === undefined ? null : compare
      };
    }

    function resolveDispatcher() {
      var dispatcher = ReactCurrentDispatcher.current;

      if (!(dispatcher !== null)) {
        {
          throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.");
        }
      }

      return dispatcher;
    }

    function useContext(Context, unstable_observedBits) {
      var dispatcher = resolveDispatcher();
      {
        if (unstable_observedBits !== undefined) {
          error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '');
        } // TODO: add a more generic warning for invalid values.


        if (Context._context !== undefined) {
          var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
          // and nobody should be using this in existing code.

          if (realContext.Consumer === Context) {
            error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
          } else if (realContext.Provider === Context) {
            error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
          }
        }
      }
      return dispatcher.useContext(Context, unstable_observedBits);
    }

    function useState(initialState) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useState(initialState);
    }

    function useReducer(reducer, initialArg, init) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useReducer(reducer, initialArg, init);
    }

    function useRef(initialValue) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useRef(initialValue);
    }

    function useEffect(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useEffect(create, deps);
    }

    function useLayoutEffect(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useLayoutEffect(create, deps);
    }

    function useCallback(callback, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useCallback(callback, deps);
    }

    function useMemo(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useMemo(create, deps);
    }

    function useImperativeHandle(ref, create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useImperativeHandle(ref, create, deps);
    }

    function useDebugValue(value, formatterFn) {
      {
        var dispatcher = resolveDispatcher();
        return dispatcher.useDebugValue(value, formatterFn);
      }
    }

    var propTypesMisspellWarningShown;
    {
      propTypesMisspellWarningShown = false;
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current.type);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }

    function getSourceInfoErrorAddendum(source) {
      if (source !== undefined) {
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }

      return '';
    }

    function getSourceInfoErrorAddendumForProps(elementProps) {
      if (elementProps !== null && elementProps !== undefined) {
        return getSourceInfoErrorAddendum(elementProps.__source);
      }

      return '';
    }
    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */


    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

        if (parentName) {
          info = "\n\nCheck the top-level render call using <" + parentName + ">.";
        }
      }

      return info;
    }
    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */


    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }

      element._store.validated = true;
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
      }

      setCurrentlyValidatingElement(element);
      {
        error('Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
      }
      setCurrentlyValidatingElement(null);
    }
    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */


    function validateChildKeys(node, parentType) {
      if (typeof node !== 'object') {
        return;
      }

      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];

          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;

            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }
    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */


    function validatePropTypes(element) {
      {
        var type = element.type;

        if (type === null || type === undefined || typeof type === 'string') {
          return;
        }

        var name = getComponentName(type);
        var propTypes;

        if (typeof type === 'function') {
          propTypes = type.propTypes;
        } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        type.$$typeof === REACT_MEMO_TYPE)) {
          propTypes = type.propTypes;
        } else {
          return;
        }

        if (propTypes) {
          setCurrentlyValidatingElement(element);
          checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
          setCurrentlyValidatingElement(null);
        } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
          propTypesMisspellWarningShown = true;
          error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
        }

        if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
          error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
        }
      }
    }
    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */


    function validateFragmentProps(fragment) {
      {
        setCurrentlyValidatingElement(fragment);
        var keys = Object.keys(fragment.props);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];

          if (key !== 'children' && key !== 'key') {
            error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
            break;
          }
        }

        if (fragment.ref !== null) {
          error('Invalid attribute `ref` supplied to `React.Fragment`.');
        }

        setCurrentlyValidatingElement(null);
      }
    }

    function createElementWithValidation(type, props, children) {
      var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendumForProps(props);

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        var typeString;

        if (type === null) {
          typeString = 'null';
        } else if (Array.isArray(type)) {
          typeString = 'array';
        } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
          typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
          info = ' Did you accidentally export a JSX literal instead of a component?';
        } else {
          typeString = typeof type;
        }

        {
          error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
        }
      }

      var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    var didWarnAboutDeprecatedCreateFactory = false;

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      validatedFactory.type = type;
      {
        if (!didWarnAboutDeprecatedCreateFactory) {
          didWarnAboutDeprecatedCreateFactory = true;
          warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
        } // Legacy hook: remove it


        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);

      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }

      validatePropTypes(newElement);
      return newElement;
    }

    {
      try {
        var frozenObject = Object.freeze({});
        var testMap = new Map([[frozenObject, null]]);
        var testSet = new Set([frozenObject]); // This is necessary for Rollup to not consider these unused.
        // https://github.com/rollup/rollup/issues/1771
        // TODO: we can remove these if Rollup fixes the bug.

        testMap.set(0, 0);
        testSet.add(0);
      } catch (e) {}
    }
    var createElement$1 = createElementWithValidation;
    var cloneElement$1 = cloneElementWithValidation;
    var createFactory = createFactoryWithValidation;
    var Children = {
      map: mapChildren,
      forEach: forEachChildren,
      count: countChildren,
      toArray: toArray,
      only: onlyChild
    };
    exports.Children = Children;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
    exports.cloneElement = cloneElement$1;
    exports.createContext = createContext;
    exports.createElement = createElement$1;
    exports.createFactory = createFactory;
    exports.createRef = createRef;
    exports.forwardRef = forwardRef;
    exports.isValidElement = isValidElement;
    exports.lazy = lazy;
    exports.memo = memo;
    exports.useCallback = useCallback;
    exports.useContext = useContext;
    exports.useDebugValue = useDebugValue;
    exports.useEffect = useEffect;
    exports.useImperativeHandle = useImperativeHandle;
    exports.useLayoutEffect = useLayoutEffect;
    exports.useMemo = useMemo;
    exports.useReducer = useReducer;
    exports.useRef = useRef;
    exports.useState = useState;
    exports.version = ReactVersion;
  })();
}

/***/ }),

/***/ "q1tI":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ "ctBr");
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QvY2pzL3JlYWN0LmRldmVsb3BtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qcyJdLCJuYW1lcyI6WyJwcm9jZXNzIiwiX2Fzc2lnbiIsInJlcXVpcmUiLCJjaGVja1Byb3BUeXBlcyIsIlJlYWN0VmVyc2lvbiIsImhhc1N5bWJvbCIsIlN5bWJvbCIsImZvciIsIlJFQUNUX0VMRU1FTlRfVFlQRSIsIlJFQUNUX1BPUlRBTF9UWVBFIiwiUkVBQ1RfRlJBR01FTlRfVFlQRSIsIlJFQUNUX1NUUklDVF9NT0RFX1RZUEUiLCJSRUFDVF9QUk9GSUxFUl9UWVBFIiwiUkVBQ1RfUFJPVklERVJfVFlQRSIsIlJFQUNUX0NPTlRFWFRfVFlQRSIsIlJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFIiwiUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSIsIlJFQUNUX1NVU1BFTlNFX1RZUEUiLCJSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUiLCJSRUFDVF9NRU1PX1RZUEUiLCJSRUFDVF9MQVpZX1RZUEUiLCJSRUFDVF9CTE9DS19UWVBFIiwiUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSIsIlJFQUNUX1JFU1BPTkRFUl9UWVBFIiwiUkVBQ1RfU0NPUEVfVFlQRSIsIk1BWUJFX0lURVJBVE9SX1NZTUJPTCIsIml0ZXJhdG9yIiwiRkFVWF9JVEVSQVRPUl9TWU1CT0wiLCJnZXRJdGVyYXRvckZuIiwibWF5YmVJdGVyYWJsZSIsIm1heWJlSXRlcmF0b3IiLCJSZWFjdEN1cnJlbnREaXNwYXRjaGVyIiwiY3VycmVudCIsIlJlYWN0Q3VycmVudEJhdGNoQ29uZmlnIiwic3VzcGVuc2UiLCJSZWFjdEN1cnJlbnRPd25lciIsIkJFRk9SRV9TTEFTSF9SRSIsImRlc2NyaWJlQ29tcG9uZW50RnJhbWUiLCJuYW1lIiwic291cmNlIiwib3duZXJOYW1lIiwic291cmNlSW5mbyIsInBhdGgiLCJmaWxlTmFtZSIsInJlcGxhY2UiLCJ0ZXN0IiwibWF0Y2giLCJwYXRoQmVmb3JlU2xhc2giLCJmb2xkZXJOYW1lIiwibGluZU51bWJlciIsIlJlc29sdmVkIiwicmVmaW5lUmVzb2x2ZWRMYXp5Q29tcG9uZW50IiwibGF6eUNvbXBvbmVudCIsIl9zdGF0dXMiLCJfcmVzdWx0IiwiZ2V0V3JhcHBlZE5hbWUiLCJvdXRlclR5cGUiLCJpbm5lclR5cGUiLCJ3cmFwcGVyTmFtZSIsImZ1bmN0aW9uTmFtZSIsImRpc3BsYXlOYW1lIiwiZ2V0Q29tcG9uZW50TmFtZSIsInR5cGUiLCJ0YWciLCJlcnJvciIsIiQkdHlwZW9mIiwicmVuZGVyIiwidGhlbmFibGUiLCJyZXNvbHZlZFRoZW5hYmxlIiwiUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSIsImN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50Iiwic2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQiLCJlbGVtZW50IiwiZ2V0Q3VycmVudFN0YWNrIiwiZ2V0U3RhY2tBZGRlbmR1bSIsInN0YWNrIiwib3duZXIiLCJfb3duZXIiLCJfc291cmNlIiwiaW1wbCIsIklzU29tZVJlbmRlcmVyQWN0aW5nIiwiUmVhY3RTaGFyZWRJbnRlcm5hbHMiLCJhc3NpZ24iLCJSZWFjdENvbXBvbmVudFRyZWVIb29rIiwid2FybiIsImZvcm1hdCIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwicHJpbnRXYXJuaW5nIiwiX2xlbjIiLCJfa2V5MiIsImxldmVsIiwiaGFzRXhpc3RpbmdTdGFjayIsImluZGV4T2YiLCJjb25jYXQiLCJhcmdzV2l0aEZvcm1hdCIsIm1hcCIsIml0ZW0iLCJ1bnNoaWZ0IiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJhcHBseSIsImNhbGwiLCJjb25zb2xlIiwiYXJnSW5kZXgiLCJtZXNzYWdlIiwiRXJyb3IiLCJ4IiwiZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50Iiwid2Fybk5vb3AiLCJwdWJsaWNJbnN0YW5jZSIsImNhbGxlck5hbWUiLCJfY29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvciIsImNvbXBvbmVudE5hbWUiLCJ3YXJuaW5nS2V5IiwiUmVhY3ROb29wVXBkYXRlUXVldWUiLCJpc01vdW50ZWQiLCJlbnF1ZXVlRm9yY2VVcGRhdGUiLCJjYWxsYmFjayIsImVucXVldWVSZXBsYWNlU3RhdGUiLCJjb21wbGV0ZVN0YXRlIiwiZW5xdWV1ZVNldFN0YXRlIiwicGFydGlhbFN0YXRlIiwiZW1wdHlPYmplY3QiLCJPYmplY3QiLCJmcmVlemUiLCJDb21wb25lbnQiLCJwcm9wcyIsImNvbnRleHQiLCJ1cGRhdGVyIiwicmVmcyIsImlzUmVhY3RDb21wb25lbnQiLCJzZXRTdGF0ZSIsImZvcmNlVXBkYXRlIiwiZGVwcmVjYXRlZEFQSXMiLCJyZXBsYWNlU3RhdGUiLCJkZWZpbmVEZXByZWNhdGlvbldhcm5pbmciLCJtZXRob2ROYW1lIiwiaW5mbyIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwidW5kZWZpbmVkIiwiZm5OYW1lIiwiaGFzT3duUHJvcGVydHkiLCJDb21wb25lbnREdW1teSIsIlB1cmVDb21wb25lbnQiLCJwdXJlQ29tcG9uZW50UHJvdG90eXBlIiwiaXNQdXJlUmVhY3RDb21wb25lbnQiLCJjcmVhdGVSZWYiLCJyZWZPYmplY3QiLCJzZWFsIiwiUkVTRVJWRURfUFJPUFMiLCJrZXkiLCJyZWYiLCJfX3NlbGYiLCJfX3NvdXJjZSIsInNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duIiwic3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24iLCJkaWRXYXJuQWJvdXRTdHJpbmdSZWZzIiwiaGFzVmFsaWRSZWYiLCJjb25maWciLCJnZXR0ZXIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc1JlYWN0V2FybmluZyIsImhhc1ZhbGlkS2V5IiwiZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIiLCJ3YXJuQWJvdXRBY2Nlc3NpbmdLZXkiLCJjb25maWd1cmFibGUiLCJkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlciIsIndhcm5BYm91dEFjY2Vzc2luZ1JlZiIsIndhcm5JZlN0cmluZ1JlZkNhbm5vdEJlQXV0b0NvbnZlcnRlZCIsInN0YXRlTm9kZSIsIlJlYWN0RWxlbWVudCIsInNlbGYiLCJfc3RvcmUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJ2YWx1ZSIsImNyZWF0ZUVsZW1lbnQiLCJjaGlsZHJlbiIsInByb3BOYW1lIiwiY2hpbGRyZW5MZW5ndGgiLCJjaGlsZEFycmF5IiwiaSIsImRlZmF1bHRQcm9wcyIsImNsb25lQW5kUmVwbGFjZUtleSIsIm9sZEVsZW1lbnQiLCJuZXdLZXkiLCJuZXdFbGVtZW50IiwiX3NlbGYiLCJjbG9uZUVsZW1lbnQiLCJpc1ZhbGlkRWxlbWVudCIsIm9iamVjdCIsIlNFUEFSQVRPUiIsIlNVQlNFUEFSQVRPUiIsImVzY2FwZSIsImVzY2FwZVJlZ2V4IiwiZXNjYXBlckxvb2t1cCIsImVzY2FwZWRTdHJpbmciLCJkaWRXYXJuQWJvdXRNYXBzIiwidXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgiLCJlc2NhcGVVc2VyUHJvdmlkZWRLZXkiLCJ0ZXh0IiwiUE9PTF9TSVpFIiwidHJhdmVyc2VDb250ZXh0UG9vbCIsImdldFBvb2xlZFRyYXZlcnNlQ29udGV4dCIsIm1hcFJlc3VsdCIsImtleVByZWZpeCIsIm1hcEZ1bmN0aW9uIiwibWFwQ29udGV4dCIsInRyYXZlcnNlQ29udGV4dCIsInBvcCIsInJlc3VsdCIsImZ1bmMiLCJjb3VudCIsInJlbGVhc2VUcmF2ZXJzZUNvbnRleHQiLCJwdXNoIiwidHJhdmVyc2VBbGxDaGlsZHJlbkltcGwiLCJuYW1lU29GYXIiLCJpbnZva2VDYWxsYmFjayIsImdldENvbXBvbmVudEtleSIsImNoaWxkIiwibmV4dE5hbWUiLCJzdWJ0cmVlQ291bnQiLCJuZXh0TmFtZVByZWZpeCIsImlzQXJyYXkiLCJpdGVyYXRvckZuIiwiZW50cmllcyIsInN0ZXAiLCJpaSIsIm5leHQiLCJkb25lIiwiYWRkZW5kdW0iLCJjaGlsZHJlblN0cmluZyIsImtleXMiLCJqb2luIiwidHJhdmVyc2VBbGxDaGlsZHJlbiIsImNvbXBvbmVudCIsImluZGV4IiwidG9TdHJpbmciLCJmb3JFYWNoU2luZ2xlQ2hpbGQiLCJib29rS2VlcGluZyIsImZvckVhY2hDaGlsZHJlbiIsImZvckVhY2hGdW5jIiwiZm9yRWFjaENvbnRleHQiLCJtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0IiwiY2hpbGRLZXkiLCJtYXBwZWRDaGlsZCIsIm1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwiLCJjIiwiYXJyYXkiLCJwcmVmaXgiLCJlc2NhcGVkUHJlZml4IiwibWFwQ2hpbGRyZW4iLCJjb3VudENoaWxkcmVuIiwidG9BcnJheSIsIm9ubHlDaGlsZCIsImNyZWF0ZUNvbnRleHQiLCJkZWZhdWx0VmFsdWUiLCJjYWxjdWxhdGVDaGFuZ2VkQml0cyIsIl9jYWxjdWxhdGVDaGFuZ2VkQml0cyIsIl9jdXJyZW50VmFsdWUiLCJfY3VycmVudFZhbHVlMiIsIl90aHJlYWRDb3VudCIsIlByb3ZpZGVyIiwiQ29uc3VtZXIiLCJfY29udGV4dCIsImhhc1dhcm5lZEFib3V0VXNpbmdOZXN0ZWRDb250ZXh0Q29uc3VtZXJzIiwiaGFzV2FybmVkQWJvdXRVc2luZ0NvbnN1bWVyUHJvdmlkZXIiLCJkZWZpbmVQcm9wZXJ0aWVzIiwic2V0IiwiX1Byb3ZpZGVyIiwiX2N1cnJlbnRSZW5kZXJlciIsIl9jdXJyZW50UmVuZGVyZXIyIiwibGF6eSIsImN0b3IiLCJsYXp5VHlwZSIsIl9jdG9yIiwicHJvcFR5cGVzIiwibmV3RGVmYXVsdFByb3BzIiwibmV3UHJvcFR5cGVzIiwiZm9yd2FyZFJlZiIsImlzVmFsaWRFbGVtZW50VHlwZSIsIm1lbW8iLCJjb21wYXJlIiwicmVzb2x2ZURpc3BhdGNoZXIiLCJkaXNwYXRjaGVyIiwidXNlQ29udGV4dCIsIkNvbnRleHQiLCJ1bnN0YWJsZV9vYnNlcnZlZEJpdHMiLCJyZWFsQ29udGV4dCIsInVzZVN0YXRlIiwiaW5pdGlhbFN0YXRlIiwidXNlUmVkdWNlciIsInJlZHVjZXIiLCJpbml0aWFsQXJnIiwiaW5pdCIsInVzZVJlZiIsImluaXRpYWxWYWx1ZSIsInVzZUVmZmVjdCIsImNyZWF0ZSIsImRlcHMiLCJ1c2VMYXlvdXRFZmZlY3QiLCJ1c2VDYWxsYmFjayIsInVzZU1lbW8iLCJ1c2VJbXBlcmF0aXZlSGFuZGxlIiwidXNlRGVidWdWYWx1ZSIsImZvcm1hdHRlckZuIiwicHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24iLCJnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0iLCJnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bSIsImdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtRm9yUHJvcHMiLCJlbGVtZW50UHJvcHMiLCJvd25lckhhc0tleVVzZVdhcm5pbmciLCJnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvIiwicGFyZW50VHlwZSIsInBhcmVudE5hbWUiLCJ2YWxpZGF0ZUV4cGxpY2l0S2V5IiwidmFsaWRhdGVkIiwiY3VycmVudENvbXBvbmVudEVycm9ySW5mbyIsImNoaWxkT3duZXIiLCJ2YWxpZGF0ZUNoaWxkS2V5cyIsIm5vZGUiLCJ2YWxpZGF0ZVByb3BUeXBlcyIsIlByb3BUeXBlcyIsImdldERlZmF1bHRQcm9wcyIsImlzUmVhY3RDbGFzc0FwcHJvdmVkIiwidmFsaWRhdGVGcmFnbWVudFByb3BzIiwiZnJhZ21lbnQiLCJjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24iLCJ2YWxpZFR5cGUiLCJ0eXBlU3RyaW5nIiwiZGlkV2FybkFib3V0RGVwcmVjYXRlZENyZWF0ZUZhY3RvcnkiLCJjcmVhdGVGYWN0b3J5V2l0aFZhbGlkYXRpb24iLCJ2YWxpZGF0ZWRGYWN0b3J5IiwiYmluZCIsImNsb25lRWxlbWVudFdpdGhWYWxpZGF0aW9uIiwiZnJvemVuT2JqZWN0IiwidGVzdE1hcCIsIk1hcCIsInRlc3RTZXQiLCJTZXQiLCJhZGQiLCJlIiwiY3JlYXRlRWxlbWVudCQxIiwiY2xvbmVFbGVtZW50JDEiLCJjcmVhdGVGYWN0b3J5IiwiQ2hpbGRyZW4iLCJmb3JFYWNoIiwib25seSIsImV4cG9ydHMiLCJGcmFnbWVudCIsIlByb2ZpbGVyIiwiU3RyaWN0TW9kZSIsIlN1c3BlbnNlIiwiX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQiLCJ2ZXJzaW9uIiwibW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7OztBQVNhOztBQUliLElBQUlBLElBQUosRUFBMkM7QUFDekMsR0FBQyxZQUFXO0FBQ2Q7O0FBRUEsUUFBSUMsT0FBTyxHQUFHQyxtQkFBTyxDQUFDLDJCQUFELENBQXJCOztBQUNBLFFBQUlDLGNBQWMsR0FBR0QsbUJBQU8sQ0FBQyx1Q0FBRCxDQUE1Qjs7QUFFQSxRQUFJRSxZQUFZLEdBQUcsU0FBbkIsQ0FOYyxDQVFkO0FBQ0E7O0FBQ0EsUUFBSUMsU0FBUyxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE1BQU0sQ0FBQ0MsR0FBdkQ7QUFDQSxRQUFJQyxrQkFBa0IsR0FBR0gsU0FBUyxHQUFHQyxNQUFNLENBQUNDLEdBQVAsQ0FBVyxlQUFYLENBQUgsR0FBaUMsTUFBbkU7QUFDQSxRQUFJRSxpQkFBaUIsR0FBR0osU0FBUyxHQUFHQyxNQUFNLENBQUNDLEdBQVAsQ0FBVyxjQUFYLENBQUgsR0FBZ0MsTUFBakU7QUFDQSxRQUFJRyxtQkFBbUIsR0FBR0wsU0FBUyxHQUFHQyxNQUFNLENBQUNDLEdBQVAsQ0FBVyxnQkFBWCxDQUFILEdBQWtDLE1BQXJFO0FBQ0EsUUFBSUksc0JBQXNCLEdBQUdOLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxHQUFQLENBQVcsbUJBQVgsQ0FBSCxHQUFxQyxNQUEzRTtBQUNBLFFBQUlLLG1CQUFtQixHQUFHUCxTQUFTLEdBQUdDLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXLGdCQUFYLENBQUgsR0FBa0MsTUFBckU7QUFDQSxRQUFJTSxtQkFBbUIsR0FBR1IsU0FBUyxHQUFHQyxNQUFNLENBQUNDLEdBQVAsQ0FBVyxnQkFBWCxDQUFILEdBQWtDLE1BQXJFO0FBQ0EsUUFBSU8sa0JBQWtCLEdBQUdULFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxHQUFQLENBQVcsZUFBWCxDQUFILEdBQWlDLE1BQW5FLENBakJjLENBaUI2RDs7QUFDM0UsUUFBSVEsMEJBQTBCLEdBQUdWLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxHQUFQLENBQVcsdUJBQVgsQ0FBSCxHQUF5QyxNQUFuRjtBQUNBLFFBQUlTLHNCQUFzQixHQUFHWCxTQUFTLEdBQUdDLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXLG1CQUFYLENBQUgsR0FBcUMsTUFBM0U7QUFDQSxRQUFJVSxtQkFBbUIsR0FBR1osU0FBUyxHQUFHQyxNQUFNLENBQUNDLEdBQVAsQ0FBVyxnQkFBWCxDQUFILEdBQWtDLE1BQXJFO0FBQ0EsUUFBSVcsd0JBQXdCLEdBQUdiLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxHQUFQLENBQVcscUJBQVgsQ0FBSCxHQUF1QyxNQUEvRTtBQUNBLFFBQUlZLGVBQWUsR0FBR2QsU0FBUyxHQUFHQyxNQUFNLENBQUNDLEdBQVAsQ0FBVyxZQUFYLENBQUgsR0FBOEIsTUFBN0Q7QUFDQSxRQUFJYSxlQUFlLEdBQUdmLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxHQUFQLENBQVcsWUFBWCxDQUFILEdBQThCLE1BQTdEO0FBQ0EsUUFBSWMsZ0JBQWdCLEdBQUdoQixTQUFTLEdBQUdDLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXLGFBQVgsQ0FBSCxHQUErQixNQUEvRDtBQUNBLFFBQUllLHNCQUFzQixHQUFHakIsU0FBUyxHQUFHQyxNQUFNLENBQUNDLEdBQVAsQ0FBVyxtQkFBWCxDQUFILEdBQXFDLE1BQTNFO0FBQ0EsUUFBSWdCLG9CQUFvQixHQUFHbEIsU0FBUyxHQUFHQyxNQUFNLENBQUNDLEdBQVAsQ0FBVyxpQkFBWCxDQUFILEdBQW1DLE1BQXZFO0FBQ0EsUUFBSWlCLGdCQUFnQixHQUFHbkIsU0FBUyxHQUFHQyxNQUFNLENBQUNDLEdBQVAsQ0FBVyxhQUFYLENBQUgsR0FBK0IsTUFBL0Q7QUFDQSxRQUFJa0IscUJBQXFCLEdBQUcsT0FBT25CLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE1BQU0sQ0FBQ29CLFFBQW5FO0FBQ0EsUUFBSUMsb0JBQW9CLEdBQUcsWUFBM0I7O0FBQ0EsYUFBU0MsYUFBVCxDQUF1QkMsYUFBdkIsRUFBc0M7QUFDcEMsVUFBSUEsYUFBYSxLQUFLLElBQWxCLElBQTBCLE9BQU9BLGFBQVAsS0FBeUIsUUFBdkQsRUFBaUU7QUFDL0QsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsVUFBSUMsYUFBYSxHQUFHTCxxQkFBcUIsSUFBSUksYUFBYSxDQUFDSixxQkFBRCxDQUF0QyxJQUFpRUksYUFBYSxDQUFDRixvQkFBRCxDQUFsRzs7QUFFQSxVQUFJLE9BQU9HLGFBQVAsS0FBeUIsVUFBN0IsRUFBeUM7QUFDdkMsZUFBT0EsYUFBUDtBQUNEOztBQUVELGFBQU8sSUFBUDtBQUNEO0FBRUQ7Ozs7O0FBR0EsUUFBSUMsc0JBQXNCLEdBQUc7QUFDM0I7Ozs7QUFJQUMsYUFBTyxFQUFFO0FBTGtCLEtBQTdCO0FBUUE7Ozs7O0FBSUEsUUFBSUMsdUJBQXVCLEdBQUc7QUFDNUJDLGNBQVEsRUFBRTtBQURrQixLQUE5QjtBQUlBOzs7Ozs7O0FBTUEsUUFBSUMsaUJBQWlCLEdBQUc7QUFDdEI7Ozs7QUFJQUgsYUFBTyxFQUFFO0FBTGEsS0FBeEI7QUFRQSxRQUFJSSxlQUFlLEdBQUcsYUFBdEI7O0FBQ0EsYUFBU0Msc0JBQVQsQ0FBaUNDLElBQWpDLEVBQXVDQyxNQUF2QyxFQUErQ0MsU0FBL0MsRUFBMEQ7QUFDeEQsVUFBSUMsVUFBVSxHQUFHLEVBQWpCOztBQUVBLFVBQUlGLE1BQUosRUFBWTtBQUNWLFlBQUlHLElBQUksR0FBR0gsTUFBTSxDQUFDSSxRQUFsQjtBQUNBLFlBQUlBLFFBQVEsR0FBR0QsSUFBSSxDQUFDRSxPQUFMLENBQWFSLGVBQWIsRUFBOEIsRUFBOUIsQ0FBZjtBQUVBO0FBQ0U7QUFDQTtBQUNBLGNBQUksV0FBV1MsSUFBWCxDQUFnQkYsUUFBaEIsQ0FBSixFQUErQjtBQUM3QixnQkFBSUcsS0FBSyxHQUFHSixJQUFJLENBQUNJLEtBQUwsQ0FBV1YsZUFBWCxDQUFaOztBQUVBLGdCQUFJVSxLQUFKLEVBQVc7QUFDVCxrQkFBSUMsZUFBZSxHQUFHRCxLQUFLLENBQUMsQ0FBRCxDQUEzQjs7QUFFQSxrQkFBSUMsZUFBSixFQUFxQjtBQUNuQixvQkFBSUMsVUFBVSxHQUFHRCxlQUFlLENBQUNILE9BQWhCLENBQXdCUixlQUF4QixFQUF5QyxFQUF6QyxDQUFqQjtBQUNBTyx3QkFBUSxHQUFHSyxVQUFVLEdBQUcsR0FBYixHQUFtQkwsUUFBOUI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUVERixrQkFBVSxHQUFHLFVBQVVFLFFBQVYsR0FBcUIsR0FBckIsR0FBMkJKLE1BQU0sQ0FBQ1UsVUFBbEMsR0FBK0MsR0FBNUQ7QUFDRCxPQXRCRCxNQXNCTyxJQUFJVCxTQUFKLEVBQWU7QUFDcEJDLGtCQUFVLEdBQUcsa0JBQWtCRCxTQUFsQixHQUE4QixHQUEzQztBQUNEOztBQUVELGFBQU8sZUFBZUYsSUFBSSxJQUFJLFNBQXZCLElBQW9DRyxVQUEzQztBQUNEOztBQUVELFFBQUlTLFFBQVEsR0FBRyxDQUFmOztBQUNBLGFBQVNDLDJCQUFULENBQXFDQyxhQUFyQyxFQUFvRDtBQUNsRCxhQUFPQSxhQUFhLENBQUNDLE9BQWQsS0FBMEJILFFBQTFCLEdBQXFDRSxhQUFhLENBQUNFLE9BQW5ELEdBQTZELElBQXBFO0FBQ0Q7O0FBRUQsYUFBU0MsY0FBVCxDQUF3QkMsU0FBeEIsRUFBbUNDLFNBQW5DLEVBQThDQyxXQUE5QyxFQUEyRDtBQUN6RCxVQUFJQyxZQUFZLEdBQUdGLFNBQVMsQ0FBQ0csV0FBVixJQUF5QkgsU0FBUyxDQUFDbkIsSUFBbkMsSUFBMkMsRUFBOUQ7QUFDQSxhQUFPa0IsU0FBUyxDQUFDSSxXQUFWLEtBQTBCRCxZQUFZLEtBQUssRUFBakIsR0FBc0JELFdBQVcsR0FBRyxHQUFkLEdBQW9CQyxZQUFwQixHQUFtQyxHQUF6RCxHQUErREQsV0FBekYsQ0FBUDtBQUNEOztBQUVELGFBQVNHLGdCQUFULENBQTBCQyxJQUExQixFQUFnQztBQUM5QixVQUFJQSxJQUFJLElBQUksSUFBWixFQUFrQjtBQUNoQjtBQUNBLGVBQU8sSUFBUDtBQUNEOztBQUVEO0FBQ0UsWUFBSSxPQUFPQSxJQUFJLENBQUNDLEdBQVosS0FBb0IsUUFBeEIsRUFBa0M7QUFDaENDLGVBQUssQ0FBQywwREFBMEQsc0RBQTNELENBQUw7QUFDRDtBQUNGOztBQUVELFVBQUksT0FBT0YsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM5QixlQUFPQSxJQUFJLENBQUNGLFdBQUwsSUFBb0JFLElBQUksQ0FBQ3hCLElBQXpCLElBQWlDLElBQXhDO0FBQ0Q7O0FBRUQsVUFBSSxPQUFPd0IsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QixlQUFPQSxJQUFQO0FBQ0Q7O0FBRUQsY0FBUUEsSUFBUjtBQUNFLGFBQUtwRCxtQkFBTDtBQUNFLGlCQUFPLFVBQVA7O0FBRUYsYUFBS0QsaUJBQUw7QUFDRSxpQkFBTyxRQUFQOztBQUVGLGFBQUtHLG1CQUFMO0FBQ0UsaUJBQU8sVUFBUDs7QUFFRixhQUFLRCxzQkFBTDtBQUNFLGlCQUFPLFlBQVA7O0FBRUYsYUFBS00sbUJBQUw7QUFDRSxpQkFBTyxVQUFQOztBQUVGLGFBQUtDLHdCQUFMO0FBQ0UsaUJBQU8sY0FBUDtBQWpCSjs7QUFvQkEsVUFBSSxPQUFPNEMsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QixnQkFBUUEsSUFBSSxDQUFDRyxRQUFiO0FBQ0UsZUFBS25ELGtCQUFMO0FBQ0UsbUJBQU8sa0JBQVA7O0FBRUYsZUFBS0QsbUJBQUw7QUFDRSxtQkFBTyxrQkFBUDs7QUFFRixlQUFLRyxzQkFBTDtBQUNFLG1CQUFPdUMsY0FBYyxDQUFDTyxJQUFELEVBQU9BLElBQUksQ0FBQ0ksTUFBWixFQUFvQixZQUFwQixDQUFyQjs7QUFFRixlQUFLL0MsZUFBTDtBQUNFLG1CQUFPMEMsZ0JBQWdCLENBQUNDLElBQUksQ0FBQ0EsSUFBTixDQUF2Qjs7QUFFRixlQUFLekMsZ0JBQUw7QUFDRSxtQkFBT3dDLGdCQUFnQixDQUFDQyxJQUFJLENBQUNJLE1BQU4sQ0FBdkI7O0FBRUYsZUFBSzlDLGVBQUw7QUFDRTtBQUNFLGtCQUFJK0MsUUFBUSxHQUFHTCxJQUFmO0FBQ0Esa0JBQUlNLGdCQUFnQixHQUFHakIsMkJBQTJCLENBQUNnQixRQUFELENBQWxEOztBQUVBLGtCQUFJQyxnQkFBSixFQUFzQjtBQUNwQix1QkFBT1AsZ0JBQWdCLENBQUNPLGdCQUFELENBQXZCO0FBQ0Q7O0FBRUQ7QUFDRDtBQTFCTDtBQTRCRDs7QUFFRCxhQUFPLElBQVA7QUFDRDs7QUFFRCxRQUFJQyxzQkFBc0IsR0FBRyxFQUE3QjtBQUNBLFFBQUlDLDBCQUEwQixHQUFHLElBQWpDOztBQUNBLGFBQVNDLDZCQUFULENBQXVDQyxPQUF2QyxFQUFnRDtBQUM5QztBQUNFRixrQ0FBMEIsR0FBR0UsT0FBN0I7QUFDRDtBQUNGOztBQUVEO0FBQ0U7QUFDQUgsNEJBQXNCLENBQUNJLGVBQXZCLEdBQXlDLElBQXpDOztBQUVBSiw0QkFBc0IsQ0FBQ0ssZ0JBQXZCLEdBQTBDLFlBQVk7QUFDcEQsWUFBSUMsS0FBSyxHQUFHLEVBQVosQ0FEb0QsQ0FDcEM7O0FBRWhCLFlBQUlMLDBCQUFKLEVBQWdDO0FBQzlCLGNBQUloQyxJQUFJLEdBQUd1QixnQkFBZ0IsQ0FBQ1MsMEJBQTBCLENBQUNSLElBQTVCLENBQTNCO0FBQ0EsY0FBSWMsS0FBSyxHQUFHTiwwQkFBMEIsQ0FBQ08sTUFBdkM7QUFDQUYsZUFBSyxJQUFJdEMsc0JBQXNCLENBQUNDLElBQUQsRUFBT2dDLDBCQUEwQixDQUFDUSxPQUFsQyxFQUEyQ0YsS0FBSyxJQUFJZixnQkFBZ0IsQ0FBQ2UsS0FBSyxDQUFDZCxJQUFQLENBQXBFLENBQS9CO0FBQ0QsU0FQbUQsQ0FPbEQ7OztBQUdGLFlBQUlpQixJQUFJLEdBQUdWLHNCQUFzQixDQUFDSSxlQUFsQzs7QUFFQSxZQUFJTSxJQUFKLEVBQVU7QUFDUkosZUFBSyxJQUFJSSxJQUFJLE1BQU0sRUFBbkI7QUFDRDs7QUFFRCxlQUFPSixLQUFQO0FBQ0QsT0FqQkQ7QUFrQkQ7QUFFRDs7OztBQUdBLFFBQUlLLG9CQUFvQixHQUFHO0FBQ3pCaEQsYUFBTyxFQUFFO0FBRGdCLEtBQTNCO0FBSUEsUUFBSWlELG9CQUFvQixHQUFHO0FBQ3pCbEQsNEJBQXNCLEVBQUVBLHNCQURDO0FBRXpCRSw2QkFBdUIsRUFBRUEsdUJBRkE7QUFHekJFLHVCQUFpQixFQUFFQSxpQkFITTtBQUl6QjZDLDBCQUFvQixFQUFFQSxvQkFKRztBQUt6QjtBQUNBRSxZQUFNLEVBQUVqRjtBQU5pQixLQUEzQjtBQVNBO0FBQ0VBLGFBQU8sQ0FBQ2dGLG9CQUFELEVBQXVCO0FBQzVCO0FBQ0FaLDhCQUFzQixFQUFFQSxzQkFGSTtBQUc1QjtBQUNBO0FBQ0FjLDhCQUFzQixFQUFFO0FBTEksT0FBdkIsQ0FBUDtBQU9ELEtBMVBhLENBNFBkO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQVNDLElBQVQsQ0FBY0MsTUFBZCxFQUFzQjtBQUNwQjtBQUNFLGFBQUssSUFBSUMsSUFBSSxHQUFHQyxTQUFTLENBQUNDLE1BQXJCLEVBQTZCQyxJQUFJLEdBQUcsSUFBSUMsS0FBSixDQUFVSixJQUFJLEdBQUcsQ0FBUCxHQUFXQSxJQUFJLEdBQUcsQ0FBbEIsR0FBc0IsQ0FBaEMsQ0FBcEMsRUFBd0VLLElBQUksR0FBRyxDQUFwRixFQUF1RkEsSUFBSSxHQUFHTCxJQUE5RixFQUFvR0ssSUFBSSxFQUF4RyxFQUE0RztBQUMxR0YsY0FBSSxDQUFDRSxJQUFJLEdBQUcsQ0FBUixDQUFKLEdBQWlCSixTQUFTLENBQUNJLElBQUQsQ0FBMUI7QUFDRDs7QUFFREMsb0JBQVksQ0FBQyxNQUFELEVBQVNQLE1BQVQsRUFBaUJJLElBQWpCLENBQVo7QUFDRDtBQUNGOztBQUNELGFBQVN6QixLQUFULENBQWVxQixNQUFmLEVBQXVCO0FBQ3JCO0FBQ0UsYUFBSyxJQUFJUSxLQUFLLEdBQUdOLFNBQVMsQ0FBQ0MsTUFBdEIsRUFBOEJDLElBQUksR0FBRyxJQUFJQyxLQUFKLENBQVVHLEtBQUssR0FBRyxDQUFSLEdBQVlBLEtBQUssR0FBRyxDQUFwQixHQUF3QixDQUFsQyxDQUFyQyxFQUEyRUMsS0FBSyxHQUFHLENBQXhGLEVBQTJGQSxLQUFLLEdBQUdELEtBQW5HLEVBQTBHQyxLQUFLLEVBQS9HLEVBQW1IO0FBQ2pITCxjQUFJLENBQUNLLEtBQUssR0FBRyxDQUFULENBQUosR0FBa0JQLFNBQVMsQ0FBQ08sS0FBRCxDQUEzQjtBQUNEOztBQUVERixvQkFBWSxDQUFDLE9BQUQsRUFBVVAsTUFBVixFQUFrQkksSUFBbEIsQ0FBWjtBQUNEO0FBQ0Y7O0FBRUQsYUFBU0csWUFBVCxDQUFzQkcsS0FBdEIsRUFBNkJWLE1BQTdCLEVBQXFDSSxJQUFyQyxFQUEyQztBQUN6QztBQUNBO0FBQ0E7QUFDRSxZQUFJTyxnQkFBZ0IsR0FBR1AsSUFBSSxDQUFDRCxNQUFMLEdBQWMsQ0FBZCxJQUFtQixPQUFPQyxJQUFJLENBQUNBLElBQUksQ0FBQ0QsTUFBTCxHQUFjLENBQWYsQ0FBWCxLQUFpQyxRQUFwRCxJQUFnRUMsSUFBSSxDQUFDQSxJQUFJLENBQUNELE1BQUwsR0FBYyxDQUFmLENBQUosQ0FBc0JTLE9BQXRCLENBQThCLFVBQTlCLE1BQThDLENBQXJJOztBQUVBLFlBQUksQ0FBQ0QsZ0JBQUwsRUFBdUI7QUFDckIsY0FBSTNCLHNCQUFzQixHQUFHWSxvQkFBb0IsQ0FBQ1osc0JBQWxEO0FBQ0EsY0FBSU0sS0FBSyxHQUFHTixzQkFBc0IsQ0FBQ0ssZ0JBQXZCLEVBQVo7O0FBRUEsY0FBSUMsS0FBSyxLQUFLLEVBQWQsRUFBa0I7QUFDaEJVLGtCQUFNLElBQUksSUFBVjtBQUNBSSxnQkFBSSxHQUFHQSxJQUFJLENBQUNTLE1BQUwsQ0FBWSxDQUFDdkIsS0FBRCxDQUFaLENBQVA7QUFDRDtBQUNGOztBQUVELFlBQUl3QixjQUFjLEdBQUdWLElBQUksQ0FBQ1csR0FBTCxDQUFTLFVBQVVDLElBQVYsRUFBZ0I7QUFDNUMsaUJBQU8sS0FBS0EsSUFBWjtBQUNELFNBRm9CLENBQXJCLENBYkYsQ0FlTTs7QUFFSkYsc0JBQWMsQ0FBQ0csT0FBZixDQUF1QixjQUFjakIsTUFBckMsRUFqQkYsQ0FpQmdEO0FBQzlDO0FBQ0E7O0FBRUFrQixnQkFBUSxDQUFDQyxTQUFULENBQW1CQyxLQUFuQixDQUF5QkMsSUFBekIsQ0FBOEJDLE9BQU8sQ0FBQ1osS0FBRCxDQUFyQyxFQUE4Q1ksT0FBOUMsRUFBdURSLGNBQXZEOztBQUVBLFlBQUk7QUFDRjtBQUNBO0FBQ0E7QUFDQSxjQUFJUyxRQUFRLEdBQUcsQ0FBZjtBQUNBLGNBQUlDLE9BQU8sR0FBRyxjQUFjeEIsTUFBTSxDQUFDekMsT0FBUCxDQUFlLEtBQWYsRUFBc0IsWUFBWTtBQUM1RCxtQkFBTzZDLElBQUksQ0FBQ21CLFFBQVEsRUFBVCxDQUFYO0FBQ0QsV0FGMkIsQ0FBNUI7QUFHQSxnQkFBTSxJQUFJRSxLQUFKLENBQVVELE9BQVYsQ0FBTjtBQUNELFNBVEQsQ0FTRSxPQUFPRSxDQUFQLEVBQVUsQ0FBRTtBQUNmO0FBQ0Y7O0FBRUQsUUFBSUMsdUNBQXVDLEdBQUcsRUFBOUM7O0FBRUEsYUFBU0MsUUFBVCxDQUFrQkMsY0FBbEIsRUFBa0NDLFVBQWxDLEVBQThDO0FBQzVDO0FBQ0UsWUFBSUMsWUFBWSxHQUFHRixjQUFjLENBQUNHLFdBQWxDO0FBQ0EsWUFBSUMsYUFBYSxHQUFHRixZQUFZLEtBQUtBLFlBQVksQ0FBQ3hELFdBQWIsSUFBNEJ3RCxZQUFZLENBQUM5RSxJQUE5QyxDQUFaLElBQW1FLFlBQXZGO0FBQ0EsWUFBSWlGLFVBQVUsR0FBR0QsYUFBYSxHQUFHLEdBQWhCLEdBQXNCSCxVQUF2Qzs7QUFFQSxZQUFJSCx1Q0FBdUMsQ0FBQ08sVUFBRCxDQUEzQyxFQUF5RDtBQUN2RDtBQUNEOztBQUVEdkQsYUFBSyxDQUFDLDJEQUEyRCxvRUFBM0QsR0FBa0kscUVBQWxJLEdBQTBNLDREQUEzTSxFQUF5UW1ELFVBQXpRLEVBQXFSRyxhQUFyUixDQUFMO0FBRUFOLCtDQUF1QyxDQUFDTyxVQUFELENBQXZDLEdBQXNELElBQXREO0FBQ0Q7QUFDRjtBQUNEOzs7OztBQUtBLFFBQUlDLG9CQUFvQixHQUFHO0FBQ3pCOzs7Ozs7O0FBT0FDLGVBQVMsRUFBRSxVQUFVUCxjQUFWLEVBQTBCO0FBQ25DLGVBQU8sS0FBUDtBQUNELE9BVndCOztBQVl6Qjs7Ozs7Ozs7Ozs7Ozs7O0FBZUFRLHdCQUFrQixFQUFFLFVBQVVSLGNBQVYsRUFBMEJTLFFBQTFCLEVBQW9DUixVQUFwQyxFQUFnRDtBQUNsRUYsZ0JBQVEsQ0FBQ0MsY0FBRCxFQUFpQixhQUFqQixDQUFSO0FBQ0QsT0E3QndCOztBQStCekI7Ozs7Ozs7Ozs7Ozs7QUFhQVUseUJBQW1CLEVBQUUsVUFBVVYsY0FBVixFQUEwQlcsYUFBMUIsRUFBeUNGLFFBQXpDLEVBQW1EUixVQUFuRCxFQUErRDtBQUNsRkYsZ0JBQVEsQ0FBQ0MsY0FBRCxFQUFpQixjQUFqQixDQUFSO0FBQ0QsT0E5Q3dCOztBQWdEekI7Ozs7Ozs7Ozs7OztBQVlBWSxxQkFBZSxFQUFFLFVBQVVaLGNBQVYsRUFBMEJhLFlBQTFCLEVBQXdDSixRQUF4QyxFQUFrRFIsVUFBbEQsRUFBOEQ7QUFDN0VGLGdCQUFRLENBQUNDLGNBQUQsRUFBaUIsVUFBakIsQ0FBUjtBQUNEO0FBOUR3QixLQUEzQjtBQWlFQSxRQUFJYyxXQUFXLEdBQUcsRUFBbEI7QUFFQTtBQUNFQyxZQUFNLENBQUNDLE1BQVAsQ0FBY0YsV0FBZDtBQUNEO0FBQ0Q7Ozs7QUFLQSxhQUFTRyxTQUFULENBQW1CQyxLQUFuQixFQUEwQkMsT0FBMUIsRUFBbUNDLE9BQW5DLEVBQTRDO0FBQzFDLFdBQUtGLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFdBQUtDLE9BQUwsR0FBZUEsT0FBZixDQUYwQyxDQUVsQjs7QUFFeEIsV0FBS0UsSUFBTCxHQUFZUCxXQUFaLENBSjBDLENBSWpCO0FBQ3pCOztBQUVBLFdBQUtNLE9BQUwsR0FBZUEsT0FBTyxJQUFJZCxvQkFBMUI7QUFDRDs7QUFFRFcsYUFBUyxDQUFDM0IsU0FBVixDQUFvQmdDLGdCQUFwQixHQUF1QyxFQUF2QztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQUwsYUFBUyxDQUFDM0IsU0FBVixDQUFvQmlDLFFBQXBCLEdBQStCLFVBQVVWLFlBQVYsRUFBd0JKLFFBQXhCLEVBQWtDO0FBQy9ELFVBQUksRUFBRSxPQUFPSSxZQUFQLEtBQXdCLFFBQXhCLElBQW9DLE9BQU9BLFlBQVAsS0FBd0IsVUFBNUQsSUFBMEVBLFlBQVksSUFBSSxJQUE1RixDQUFKLEVBQXVHO0FBQ3JHO0FBQ0UsZ0JBQU1qQixLQUFLLENBQUUsdUhBQUYsQ0FBWDtBQUNEO0FBQ0Y7O0FBRUQsV0FBS3dCLE9BQUwsQ0FBYVIsZUFBYixDQUE2QixJQUE3QixFQUFtQ0MsWUFBbkMsRUFBaURKLFFBQWpELEVBQTJELFVBQTNEO0FBQ0QsS0FSRDtBQVNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBUSxhQUFTLENBQUMzQixTQUFWLENBQW9Ca0MsV0FBcEIsR0FBa0MsVUFBVWYsUUFBVixFQUFvQjtBQUNwRCxXQUFLVyxPQUFMLENBQWFaLGtCQUFiLENBQWdDLElBQWhDLEVBQXNDQyxRQUF0QyxFQUFnRCxhQUFoRDtBQUNELEtBRkQ7QUFHQTs7Ozs7OztBQU9BO0FBQ0UsVUFBSWdCLGNBQWMsR0FBRztBQUNuQmxCLGlCQUFTLEVBQUUsQ0FBQyxXQUFELEVBQWMsMEVBQTBFLCtDQUF4RixDQURRO0FBRW5CbUIsb0JBQVksRUFBRSxDQUFDLGNBQUQsRUFBaUIscURBQXFELGlEQUF0RTtBQUZLLE9BQXJCOztBQUtBLFVBQUlDLHdCQUF3QixHQUFHLFVBQVVDLFVBQVYsRUFBc0JDLElBQXRCLEVBQTRCO0FBQ3pEZCxjQUFNLENBQUNlLGNBQVAsQ0FBc0JiLFNBQVMsQ0FBQzNCLFNBQWhDLEVBQTJDc0MsVUFBM0MsRUFBdUQ7QUFDckRHLGFBQUcsRUFBRSxZQUFZO0FBQ2Y3RCxnQkFBSSxDQUFDLDZEQUFELEVBQWdFMkQsSUFBSSxDQUFDLENBQUQsQ0FBcEUsRUFBeUVBLElBQUksQ0FBQyxDQUFELENBQTdFLENBQUo7QUFFQSxtQkFBT0csU0FBUDtBQUNEO0FBTG9ELFNBQXZEO0FBT0QsT0FSRDs7QUFVQSxXQUFLLElBQUlDLE1BQVQsSUFBbUJSLGNBQW5CLEVBQW1DO0FBQ2pDLFlBQUlBLGNBQWMsQ0FBQ1MsY0FBZixDQUE4QkQsTUFBOUIsQ0FBSixFQUEyQztBQUN6Q04sa0NBQXdCLENBQUNNLE1BQUQsRUFBU1IsY0FBYyxDQUFDUSxNQUFELENBQXZCLENBQXhCO0FBQ0Q7QUFDRjtBQUNGOztBQUVELGFBQVNFLGNBQVQsR0FBMEIsQ0FBRTs7QUFFNUJBLGtCQUFjLENBQUM3QyxTQUFmLEdBQTJCMkIsU0FBUyxDQUFDM0IsU0FBckM7QUFDQTs7OztBQUlBLGFBQVM4QyxhQUFULENBQXVCbEIsS0FBdkIsRUFBOEJDLE9BQTlCLEVBQXVDQyxPQUF2QyxFQUFnRDtBQUM5QyxXQUFLRixLQUFMLEdBQWFBLEtBQWI7QUFDQSxXQUFLQyxPQUFMLEdBQWVBLE9BQWYsQ0FGOEMsQ0FFdEI7O0FBRXhCLFdBQUtFLElBQUwsR0FBWVAsV0FBWjtBQUNBLFdBQUtNLE9BQUwsR0FBZUEsT0FBTyxJQUFJZCxvQkFBMUI7QUFDRDs7QUFFRCxRQUFJK0Isc0JBQXNCLEdBQUdELGFBQWEsQ0FBQzlDLFNBQWQsR0FBMEIsSUFBSTZDLGNBQUosRUFBdkQ7QUFDQUUsMEJBQXNCLENBQUNsQyxXQUF2QixHQUFxQ2lDLGFBQXJDLENBM2dCYyxDQTJnQnNDOztBQUVwRHJKLFdBQU8sQ0FBQ3NKLHNCQUFELEVBQXlCcEIsU0FBUyxDQUFDM0IsU0FBbkMsQ0FBUDs7QUFFQStDLDBCQUFzQixDQUFDQyxvQkFBdkIsR0FBOEMsSUFBOUMsQ0EvZ0JjLENBaWhCZDs7QUFDQSxhQUFTQyxTQUFULEdBQXFCO0FBQ25CLFVBQUlDLFNBQVMsR0FBRztBQUNkMUgsZUFBTyxFQUFFO0FBREssT0FBaEI7QUFJQTtBQUNFaUcsY0FBTSxDQUFDMEIsSUFBUCxDQUFZRCxTQUFaO0FBQ0Q7QUFFRCxhQUFPQSxTQUFQO0FBQ0Q7O0FBRUQsUUFBSU4sY0FBYyxHQUFHbkIsTUFBTSxDQUFDekIsU0FBUCxDQUFpQjRDLGNBQXRDO0FBQ0EsUUFBSVEsY0FBYyxHQUFHO0FBQ25CQyxTQUFHLEVBQUUsSUFEYztBQUVuQkMsU0FBRyxFQUFFLElBRmM7QUFHbkJDLFlBQU0sRUFBRSxJQUhXO0FBSW5CQyxjQUFRLEVBQUU7QUFKUyxLQUFyQjtBQU1BLFFBQUlDLDBCQUFKLEVBQWdDQywwQkFBaEMsRUFBNERDLHNCQUE1RDtBQUVBO0FBQ0VBLDRCQUFzQixHQUFHLEVBQXpCO0FBQ0Q7O0FBRUQsYUFBU0MsV0FBVCxDQUFxQkMsTUFBckIsRUFBNkI7QUFDM0I7QUFDRSxZQUFJakIsY0FBYyxDQUFDMUMsSUFBZixDQUFvQjJELE1BQXBCLEVBQTRCLEtBQTVCLENBQUosRUFBd0M7QUFDdEMsY0FBSUMsTUFBTSxHQUFHckMsTUFBTSxDQUFDc0Msd0JBQVAsQ0FBZ0NGLE1BQWhDLEVBQXdDLEtBQXhDLEVBQStDcEIsR0FBNUQ7O0FBRUEsY0FBSXFCLE1BQU0sSUFBSUEsTUFBTSxDQUFDRSxjQUFyQixFQUFxQztBQUNuQyxtQkFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNGO0FBRUQsYUFBT0gsTUFBTSxDQUFDUCxHQUFQLEtBQWVaLFNBQXRCO0FBQ0Q7O0FBRUQsYUFBU3VCLFdBQVQsQ0FBcUJKLE1BQXJCLEVBQTZCO0FBQzNCO0FBQ0UsWUFBSWpCLGNBQWMsQ0FBQzFDLElBQWYsQ0FBb0IyRCxNQUFwQixFQUE0QixLQUE1QixDQUFKLEVBQXdDO0FBQ3RDLGNBQUlDLE1BQU0sR0FBR3JDLE1BQU0sQ0FBQ3NDLHdCQUFQLENBQWdDRixNQUFoQyxFQUF3QyxLQUF4QyxFQUErQ3BCLEdBQTVEOztBQUVBLGNBQUlxQixNQUFNLElBQUlBLE1BQU0sQ0FBQ0UsY0FBckIsRUFBcUM7QUFDbkMsbUJBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFDRjtBQUVELGFBQU9ILE1BQU0sQ0FBQ1IsR0FBUCxLQUFlWCxTQUF0QjtBQUNEOztBQUVELGFBQVN3QiwwQkFBVCxDQUFvQ3RDLEtBQXBDLEVBQTJDeEUsV0FBM0MsRUFBd0Q7QUFDdEQsVUFBSStHLHFCQUFxQixHQUFHLFlBQVk7QUFDdEM7QUFDRSxjQUFJLENBQUNWLDBCQUFMLEVBQWlDO0FBQy9CQSxzQ0FBMEIsR0FBRyxJQUE3QjtBQUVBakcsaUJBQUssQ0FBQyw4REFBOEQsZ0VBQTlELEdBQWlJLHNFQUFqSSxHQUEwTSwyQ0FBM00sRUFBd1BKLFdBQXhQLENBQUw7QUFDRDtBQUNGO0FBQ0YsT0FSRDs7QUFVQStHLDJCQUFxQixDQUFDSCxjQUF0QixHQUF1QyxJQUF2QztBQUNBdkMsWUFBTSxDQUFDZSxjQUFQLENBQXNCWixLQUF0QixFQUE2QixLQUE3QixFQUFvQztBQUNsQ2EsV0FBRyxFQUFFMEIscUJBRDZCO0FBRWxDQyxvQkFBWSxFQUFFO0FBRm9CLE9BQXBDO0FBSUQ7O0FBRUQsYUFBU0MsMEJBQVQsQ0FBb0N6QyxLQUFwQyxFQUEyQ3hFLFdBQTNDLEVBQXdEO0FBQ3RELFVBQUlrSCxxQkFBcUIsR0FBRyxZQUFZO0FBQ3RDO0FBQ0UsY0FBSSxDQUFDWiwwQkFBTCxFQUFpQztBQUMvQkEsc0NBQTBCLEdBQUcsSUFBN0I7QUFFQWxHLGlCQUFLLENBQUMsOERBQThELGdFQUE5RCxHQUFpSSxzRUFBakksR0FBME0sMkNBQTNNLEVBQXdQSixXQUF4UCxDQUFMO0FBQ0Q7QUFDRjtBQUNGLE9BUkQ7O0FBVUFrSCwyQkFBcUIsQ0FBQ04sY0FBdEIsR0FBdUMsSUFBdkM7QUFDQXZDLFlBQU0sQ0FBQ2UsY0FBUCxDQUFzQlosS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0M7QUFDbENhLFdBQUcsRUFBRTZCLHFCQUQ2QjtBQUVsQ0Ysb0JBQVksRUFBRTtBQUZvQixPQUFwQztBQUlEOztBQUVELGFBQVNHLG9DQUFULENBQThDVixNQUE5QyxFQUFzRDtBQUNwRDtBQUNFLFlBQUksT0FBT0EsTUFBTSxDQUFDUCxHQUFkLEtBQXNCLFFBQXRCLElBQWtDM0gsaUJBQWlCLENBQUNILE9BQXBELElBQStEcUksTUFBTSxDQUFDTixNQUF0RSxJQUFnRjVILGlCQUFpQixDQUFDSCxPQUFsQixDQUEwQmdKLFNBQTFCLEtBQXdDWCxNQUFNLENBQUNOLE1BQW5JLEVBQTJJO0FBQ3pJLGNBQUl6QyxhQUFhLEdBQUd6RCxnQkFBZ0IsQ0FBQzFCLGlCQUFpQixDQUFDSCxPQUFsQixDQUEwQjhCLElBQTNCLENBQXBDOztBQUVBLGNBQUksQ0FBQ3FHLHNCQUFzQixDQUFDN0MsYUFBRCxDQUEzQixFQUE0QztBQUMxQ3RELGlCQUFLLENBQUMsa0RBQWtELHFFQUFsRCxHQUEwSCxvRUFBMUgsR0FBaU0saUZBQWpNLEdBQXFSLDJDQUFyUixHQUFtVSw0Q0FBcFUsRUFBa1hILGdCQUFnQixDQUFDMUIsaUJBQWlCLENBQUNILE9BQWxCLENBQTBCOEIsSUFBM0IsQ0FBbFksRUFBb2F1RyxNQUFNLENBQUNQLEdBQTNhLENBQUw7QUFFQUssa0NBQXNCLENBQUM3QyxhQUFELENBQXRCLEdBQXdDLElBQXhDO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxRQUFJMkQsWUFBWSxHQUFHLFVBQVVuSCxJQUFWLEVBQWdCK0YsR0FBaEIsRUFBcUJDLEdBQXJCLEVBQTBCb0IsSUFBMUIsRUFBZ0MzSSxNQUFoQyxFQUF3Q3FDLEtBQXhDLEVBQStDd0QsS0FBL0MsRUFBc0Q7QUFDdkUsVUFBSTVELE9BQU8sR0FBRztBQUNaO0FBQ0FQLGdCQUFRLEVBQUV6RCxrQkFGRTtBQUdaO0FBQ0FzRCxZQUFJLEVBQUVBLElBSk07QUFLWitGLFdBQUcsRUFBRUEsR0FMTztBQU1aQyxXQUFHLEVBQUVBLEdBTk87QUFPWjFCLGFBQUssRUFBRUEsS0FQSztBQVFaO0FBQ0F2RCxjQUFNLEVBQUVEO0FBVEksT0FBZDtBQVlBO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDQUosZUFBTyxDQUFDMkcsTUFBUixHQUFpQixFQUFqQixDQUxGLENBS3VCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQWxELGNBQU0sQ0FBQ2UsY0FBUCxDQUFzQnhFLE9BQU8sQ0FBQzJHLE1BQTlCLEVBQXNDLFdBQXRDLEVBQW1EO0FBQ2pEUCxzQkFBWSxFQUFFLEtBRG1DO0FBRWpEUSxvQkFBVSxFQUFFLEtBRnFDO0FBR2pEQyxrQkFBUSxFQUFFLElBSHVDO0FBSWpEQyxlQUFLLEVBQUU7QUFKMEMsU0FBbkQsRUFWRixDQWVNOztBQUVKckQsY0FBTSxDQUFDZSxjQUFQLENBQXNCeEUsT0FBdEIsRUFBK0IsT0FBL0IsRUFBd0M7QUFDdENvRyxzQkFBWSxFQUFFLEtBRHdCO0FBRXRDUSxvQkFBVSxFQUFFLEtBRjBCO0FBR3RDQyxrQkFBUSxFQUFFLEtBSDRCO0FBSXRDQyxlQUFLLEVBQUVKO0FBSitCLFNBQXhDLEVBakJGLENBc0JNO0FBQ0o7O0FBRUFqRCxjQUFNLENBQUNlLGNBQVAsQ0FBc0J4RSxPQUF0QixFQUErQixTQUEvQixFQUEwQztBQUN4Q29HLHNCQUFZLEVBQUUsS0FEMEI7QUFFeENRLG9CQUFVLEVBQUUsS0FGNEI7QUFHeENDLGtCQUFRLEVBQUUsS0FIOEI7QUFJeENDLGVBQUssRUFBRS9JO0FBSmlDLFNBQTFDOztBQU9BLFlBQUkwRixNQUFNLENBQUNDLE1BQVgsRUFBbUI7QUFDakJELGdCQUFNLENBQUNDLE1BQVAsQ0FBYzFELE9BQU8sQ0FBQzRELEtBQXRCO0FBQ0FILGdCQUFNLENBQUNDLE1BQVAsQ0FBYzFELE9BQWQ7QUFDRDtBQUNGO0FBRUQsYUFBT0EsT0FBUDtBQUNELEtBcEREO0FBcURBOzs7Ozs7QUFLQSxhQUFTK0csYUFBVCxDQUF1QnpILElBQXZCLEVBQTZCdUcsTUFBN0IsRUFBcUNtQixRQUFyQyxFQUErQztBQUM3QyxVQUFJQyxRQUFKLENBRDZDLENBQy9COztBQUVkLFVBQUlyRCxLQUFLLEdBQUcsRUFBWjtBQUNBLFVBQUl5QixHQUFHLEdBQUcsSUFBVjtBQUNBLFVBQUlDLEdBQUcsR0FBRyxJQUFWO0FBQ0EsVUFBSW9CLElBQUksR0FBRyxJQUFYO0FBQ0EsVUFBSTNJLE1BQU0sR0FBRyxJQUFiOztBQUVBLFVBQUk4SCxNQUFNLElBQUksSUFBZCxFQUFvQjtBQUNsQixZQUFJRCxXQUFXLENBQUNDLE1BQUQsQ0FBZixFQUF5QjtBQUN2QlAsYUFBRyxHQUFHTyxNQUFNLENBQUNQLEdBQWI7QUFFQTtBQUNFaUIsZ0RBQW9DLENBQUNWLE1BQUQsQ0FBcEM7QUFDRDtBQUNGOztBQUVELFlBQUlJLFdBQVcsQ0FBQ0osTUFBRCxDQUFmLEVBQXlCO0FBQ3ZCUixhQUFHLEdBQUcsS0FBS1EsTUFBTSxDQUFDUixHQUFsQjtBQUNEOztBQUVEcUIsWUFBSSxHQUFHYixNQUFNLENBQUNOLE1BQVAsS0FBa0JiLFNBQWxCLEdBQThCLElBQTlCLEdBQXFDbUIsTUFBTSxDQUFDTixNQUFuRDtBQUNBeEgsY0FBTSxHQUFHOEgsTUFBTSxDQUFDTCxRQUFQLEtBQW9CZCxTQUFwQixHQUFnQyxJQUFoQyxHQUF1Q21CLE1BQU0sQ0FBQ0wsUUFBdkQsQ0Fka0IsQ0FjK0M7O0FBRWpFLGFBQUt5QixRQUFMLElBQWlCcEIsTUFBakIsRUFBeUI7QUFDdkIsY0FBSWpCLGNBQWMsQ0FBQzFDLElBQWYsQ0FBb0IyRCxNQUFwQixFQUE0Qm9CLFFBQTVCLEtBQXlDLENBQUM3QixjQUFjLENBQUNSLGNBQWYsQ0FBOEJxQyxRQUE5QixDQUE5QyxFQUF1RjtBQUNyRnJELGlCQUFLLENBQUNxRCxRQUFELENBQUwsR0FBa0JwQixNQUFNLENBQUNvQixRQUFELENBQXhCO0FBQ0Q7QUFDRjtBQUNGLE9BOUI0QyxDQThCM0M7QUFDRjs7O0FBR0EsVUFBSUMsY0FBYyxHQUFHbkcsU0FBUyxDQUFDQyxNQUFWLEdBQW1CLENBQXhDOztBQUVBLFVBQUlrRyxjQUFjLEtBQUssQ0FBdkIsRUFBMEI7QUFDeEJ0RCxhQUFLLENBQUNvRCxRQUFOLEdBQWlCQSxRQUFqQjtBQUNELE9BRkQsTUFFTyxJQUFJRSxjQUFjLEdBQUcsQ0FBckIsRUFBd0I7QUFDN0IsWUFBSUMsVUFBVSxHQUFHakcsS0FBSyxDQUFDZ0csY0FBRCxDQUF0Qjs7QUFFQSxhQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLGNBQXBCLEVBQW9DRSxDQUFDLEVBQXJDLEVBQXlDO0FBQ3ZDRCxvQkFBVSxDQUFDQyxDQUFELENBQVYsR0FBZ0JyRyxTQUFTLENBQUNxRyxDQUFDLEdBQUcsQ0FBTCxDQUF6QjtBQUNEOztBQUVEO0FBQ0UsY0FBSTNELE1BQU0sQ0FBQ0MsTUFBWCxFQUFtQjtBQUNqQkQsa0JBQU0sQ0FBQ0MsTUFBUCxDQUFjeUQsVUFBZDtBQUNEO0FBQ0Y7QUFFRHZELGFBQUssQ0FBQ29ELFFBQU4sR0FBaUJHLFVBQWpCO0FBQ0QsT0FwRDRDLENBb0QzQzs7O0FBR0YsVUFBSTdILElBQUksSUFBSUEsSUFBSSxDQUFDK0gsWUFBakIsRUFBK0I7QUFDN0IsWUFBSUEsWUFBWSxHQUFHL0gsSUFBSSxDQUFDK0gsWUFBeEI7O0FBRUEsYUFBS0osUUFBTCxJQUFpQkksWUFBakIsRUFBK0I7QUFDN0IsY0FBSXpELEtBQUssQ0FBQ3FELFFBQUQsQ0FBTCxLQUFvQnZDLFNBQXhCLEVBQW1DO0FBQ2pDZCxpQkFBSyxDQUFDcUQsUUFBRCxDQUFMLEdBQWtCSSxZQUFZLENBQUNKLFFBQUQsQ0FBOUI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQ7QUFDRSxZQUFJNUIsR0FBRyxJQUFJQyxHQUFYLEVBQWdCO0FBQ2QsY0FBSWxHLFdBQVcsR0FBRyxPQUFPRSxJQUFQLEtBQWdCLFVBQWhCLEdBQTZCQSxJQUFJLENBQUNGLFdBQUwsSUFBb0JFLElBQUksQ0FBQ3hCLElBQXpCLElBQWlDLFNBQTlELEdBQTBFd0IsSUFBNUY7O0FBRUEsY0FBSStGLEdBQUosRUFBUztBQUNQYSxzQ0FBMEIsQ0FBQ3RDLEtBQUQsRUFBUXhFLFdBQVIsQ0FBMUI7QUFDRDs7QUFFRCxjQUFJa0csR0FBSixFQUFTO0FBQ1BlLHNDQUEwQixDQUFDekMsS0FBRCxFQUFReEUsV0FBUixDQUExQjtBQUNEO0FBQ0Y7QUFDRjtBQUVELGFBQU9xSCxZQUFZLENBQUNuSCxJQUFELEVBQU8rRixHQUFQLEVBQVlDLEdBQVosRUFBaUJvQixJQUFqQixFQUF1QjNJLE1BQXZCLEVBQStCSixpQkFBaUIsQ0FBQ0gsT0FBakQsRUFBMERvRyxLQUExRCxDQUFuQjtBQUNEOztBQUNELGFBQVMwRCxrQkFBVCxDQUE0QkMsVUFBNUIsRUFBd0NDLE1BQXhDLEVBQWdEO0FBQzlDLFVBQUlDLFVBQVUsR0FBR2hCLFlBQVksQ0FBQ2MsVUFBVSxDQUFDakksSUFBWixFQUFrQmtJLE1BQWxCLEVBQTBCRCxVQUFVLENBQUNqQyxHQUFyQyxFQUEwQ2lDLFVBQVUsQ0FBQ0csS0FBckQsRUFBNERILFVBQVUsQ0FBQ2pILE9BQXZFLEVBQWdGaUgsVUFBVSxDQUFDbEgsTUFBM0YsRUFBbUdrSCxVQUFVLENBQUMzRCxLQUE5RyxDQUE3QjtBQUNBLGFBQU82RCxVQUFQO0FBQ0Q7QUFDRDs7Ozs7O0FBS0EsYUFBU0UsWUFBVCxDQUFzQjNILE9BQXRCLEVBQStCNkYsTUFBL0IsRUFBdUNtQixRQUF2QyxFQUFpRDtBQUMvQyxVQUFJLENBQUMsRUFBRWhILE9BQU8sS0FBSyxJQUFaLElBQW9CQSxPQUFPLEtBQUswRSxTQUFsQyxDQUFMLEVBQW1EO0FBQ2pEO0FBQ0UsZ0JBQU1wQyxLQUFLLENBQUUsbUZBQW1GdEMsT0FBbkYsR0FBNkYsR0FBL0YsQ0FBWDtBQUNEO0FBQ0Y7O0FBRUQsVUFBSWlILFFBQUosQ0FQK0MsQ0FPakM7O0FBRWQsVUFBSXJELEtBQUssR0FBR25JLE9BQU8sQ0FBQyxFQUFELEVBQUt1RSxPQUFPLENBQUM0RCxLQUFiLENBQW5CLENBVCtDLENBU1A7OztBQUd4QyxVQUFJeUIsR0FBRyxHQUFHckYsT0FBTyxDQUFDcUYsR0FBbEI7QUFDQSxVQUFJQyxHQUFHLEdBQUd0RixPQUFPLENBQUNzRixHQUFsQixDQWIrQyxDQWF4Qjs7QUFFdkIsVUFBSW9CLElBQUksR0FBRzFHLE9BQU8sQ0FBQzBILEtBQW5CLENBZitDLENBZXJCO0FBQzFCO0FBQ0E7O0FBRUEsVUFBSTNKLE1BQU0sR0FBR2lDLE9BQU8sQ0FBQ00sT0FBckIsQ0FuQitDLENBbUJqQjs7QUFFOUIsVUFBSUYsS0FBSyxHQUFHSixPQUFPLENBQUNLLE1BQXBCOztBQUVBLFVBQUl3RixNQUFNLElBQUksSUFBZCxFQUFvQjtBQUNsQixZQUFJRCxXQUFXLENBQUNDLE1BQUQsQ0FBZixFQUF5QjtBQUN2QjtBQUNBUCxhQUFHLEdBQUdPLE1BQU0sQ0FBQ1AsR0FBYjtBQUNBbEYsZUFBSyxHQUFHekMsaUJBQWlCLENBQUNILE9BQTFCO0FBQ0Q7O0FBRUQsWUFBSXlJLFdBQVcsQ0FBQ0osTUFBRCxDQUFmLEVBQXlCO0FBQ3ZCUixhQUFHLEdBQUcsS0FBS1EsTUFBTSxDQUFDUixHQUFsQjtBQUNELFNBVGlCLENBU2hCOzs7QUFHRixZQUFJZ0MsWUFBSjs7QUFFQSxZQUFJckgsT0FBTyxDQUFDVixJQUFSLElBQWdCVSxPQUFPLENBQUNWLElBQVIsQ0FBYStILFlBQWpDLEVBQStDO0FBQzdDQSxzQkFBWSxHQUFHckgsT0FBTyxDQUFDVixJQUFSLENBQWErSCxZQUE1QjtBQUNEOztBQUVELGFBQUtKLFFBQUwsSUFBaUJwQixNQUFqQixFQUF5QjtBQUN2QixjQUFJakIsY0FBYyxDQUFDMUMsSUFBZixDQUFvQjJELE1BQXBCLEVBQTRCb0IsUUFBNUIsS0FBeUMsQ0FBQzdCLGNBQWMsQ0FBQ1IsY0FBZixDQUE4QnFDLFFBQTlCLENBQTlDLEVBQXVGO0FBQ3JGLGdCQUFJcEIsTUFBTSxDQUFDb0IsUUFBRCxDQUFOLEtBQXFCdkMsU0FBckIsSUFBa0MyQyxZQUFZLEtBQUszQyxTQUF2RCxFQUFrRTtBQUNoRTtBQUNBZCxtQkFBSyxDQUFDcUQsUUFBRCxDQUFMLEdBQWtCSSxZQUFZLENBQUNKLFFBQUQsQ0FBOUI7QUFDRCxhQUhELE1BR087QUFDTHJELG1CQUFLLENBQUNxRCxRQUFELENBQUwsR0FBa0JwQixNQUFNLENBQUNvQixRQUFELENBQXhCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsT0FuRDhDLENBbUQ3QztBQUNGOzs7QUFHQSxVQUFJQyxjQUFjLEdBQUduRyxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBeEM7O0FBRUEsVUFBSWtHLGNBQWMsS0FBSyxDQUF2QixFQUEwQjtBQUN4QnRELGFBQUssQ0FBQ29ELFFBQU4sR0FBaUJBLFFBQWpCO0FBQ0QsT0FGRCxNQUVPLElBQUlFLGNBQWMsR0FBRyxDQUFyQixFQUF3QjtBQUM3QixZQUFJQyxVQUFVLEdBQUdqRyxLQUFLLENBQUNnRyxjQUFELENBQXRCOztBQUVBLGFBQUssSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsY0FBcEIsRUFBb0NFLENBQUMsRUFBckMsRUFBeUM7QUFDdkNELG9CQUFVLENBQUNDLENBQUQsQ0FBVixHQUFnQnJHLFNBQVMsQ0FBQ3FHLENBQUMsR0FBRyxDQUFMLENBQXpCO0FBQ0Q7O0FBRUR4RCxhQUFLLENBQUNvRCxRQUFOLEdBQWlCRyxVQUFqQjtBQUNEOztBQUVELGFBQU9WLFlBQVksQ0FBQ3pHLE9BQU8sQ0FBQ1YsSUFBVCxFQUFlK0YsR0FBZixFQUFvQkMsR0FBcEIsRUFBeUJvQixJQUF6QixFQUErQjNJLE1BQS9CLEVBQXVDcUMsS0FBdkMsRUFBOEN3RCxLQUE5QyxDQUFuQjtBQUNEO0FBQ0Q7Ozs7Ozs7OztBQVFBLGFBQVNnRSxjQUFULENBQXdCQyxNQUF4QixFQUFnQztBQUM5QixhQUFPLE9BQU9BLE1BQVAsS0FBa0IsUUFBbEIsSUFBOEJBLE1BQU0sS0FBSyxJQUF6QyxJQUFpREEsTUFBTSxDQUFDcEksUUFBUCxLQUFvQnpELGtCQUE1RTtBQUNEOztBQUVELFFBQUk4TCxTQUFTLEdBQUcsR0FBaEI7QUFDQSxRQUFJQyxZQUFZLEdBQUcsR0FBbkI7QUFDQTs7Ozs7OztBQU9BLGFBQVNDLE1BQVQsQ0FBZ0IzQyxHQUFoQixFQUFxQjtBQUNuQixVQUFJNEMsV0FBVyxHQUFHLE9BQWxCO0FBQ0EsVUFBSUMsYUFBYSxHQUFHO0FBQ2xCLGFBQUssSUFEYTtBQUVsQixhQUFLO0FBRmEsT0FBcEI7QUFJQSxVQUFJQyxhQUFhLEdBQUcsQ0FBQyxLQUFLOUMsR0FBTixFQUFXakgsT0FBWCxDQUFtQjZKLFdBQW5CLEVBQWdDLFVBQVUzSixLQUFWLEVBQWlCO0FBQ25FLGVBQU80SixhQUFhLENBQUM1SixLQUFELENBQXBCO0FBQ0QsT0FGbUIsQ0FBcEI7QUFHQSxhQUFPLE1BQU02SixhQUFiO0FBQ0Q7QUFDRDs7Ozs7O0FBTUEsUUFBSUMsZ0JBQWdCLEdBQUcsS0FBdkI7QUFDQSxRQUFJQywwQkFBMEIsR0FBRyxNQUFqQzs7QUFFQSxhQUFTQyxxQkFBVCxDQUErQkMsSUFBL0IsRUFBcUM7QUFDbkMsYUFBTyxDQUFDLEtBQUtBLElBQU4sRUFBWW5LLE9BQVosQ0FBb0JpSywwQkFBcEIsRUFBZ0QsS0FBaEQsQ0FBUDtBQUNEOztBQUVELFFBQUlHLFNBQVMsR0FBRyxFQUFoQjtBQUNBLFFBQUlDLG1CQUFtQixHQUFHLEVBQTFCOztBQUVBLGFBQVNDLHdCQUFULENBQWtDQyxTQUFsQyxFQUE2Q0MsU0FBN0MsRUFBd0RDLFdBQXhELEVBQXFFQyxVQUFyRSxFQUFpRjtBQUMvRSxVQUFJTCxtQkFBbUIsQ0FBQ3pILE1BQXhCLEVBQWdDO0FBQzlCLFlBQUkrSCxlQUFlLEdBQUdOLG1CQUFtQixDQUFDTyxHQUFwQixFQUF0QjtBQUNBRCx1QkFBZSxDQUFDRSxNQUFoQixHQUF5Qk4sU0FBekI7QUFDQUksdUJBQWUsQ0FBQ0gsU0FBaEIsR0FBNEJBLFNBQTVCO0FBQ0FHLHVCQUFlLENBQUNHLElBQWhCLEdBQXVCTCxXQUF2QjtBQUNBRSx1QkFBZSxDQUFDbEYsT0FBaEIsR0FBMEJpRixVQUExQjtBQUNBQyx1QkFBZSxDQUFDSSxLQUFoQixHQUF3QixDQUF4QjtBQUNBLGVBQU9KLGVBQVA7QUFDRCxPQVJELE1BUU87QUFDTCxlQUFPO0FBQ0xFLGdCQUFNLEVBQUVOLFNBREg7QUFFTEMsbUJBQVMsRUFBRUEsU0FGTjtBQUdMTSxjQUFJLEVBQUVMLFdBSEQ7QUFJTGhGLGlCQUFPLEVBQUVpRixVQUpKO0FBS0xLLGVBQUssRUFBRTtBQUxGLFNBQVA7QUFPRDtBQUNGOztBQUVELGFBQVNDLHNCQUFULENBQWdDTCxlQUFoQyxFQUFpRDtBQUMvQ0EscUJBQWUsQ0FBQ0UsTUFBaEIsR0FBeUIsSUFBekI7QUFDQUYscUJBQWUsQ0FBQ0gsU0FBaEIsR0FBNEIsSUFBNUI7QUFDQUcscUJBQWUsQ0FBQ0csSUFBaEIsR0FBdUIsSUFBdkI7QUFDQUgscUJBQWUsQ0FBQ2xGLE9BQWhCLEdBQTBCLElBQTFCO0FBQ0FrRixxQkFBZSxDQUFDSSxLQUFoQixHQUF3QixDQUF4Qjs7QUFFQSxVQUFJVixtQkFBbUIsQ0FBQ3pILE1BQXBCLEdBQTZCd0gsU0FBakMsRUFBNEM7QUFDMUNDLDJCQUFtQixDQUFDWSxJQUFwQixDQUF5Qk4sZUFBekI7QUFDRDtBQUNGO0FBQ0Q7Ozs7Ozs7Ozs7QUFVQSxhQUFTTyx1QkFBVCxDQUFpQ3RDLFFBQWpDLEVBQTJDdUMsU0FBM0MsRUFBc0RwRyxRQUF0RCxFQUFnRTRGLGVBQWhFLEVBQWlGO0FBQy9FLFVBQUl6SixJQUFJLEdBQUcsT0FBTzBILFFBQWxCOztBQUVBLFVBQUkxSCxJQUFJLEtBQUssV0FBVCxJQUF3QkEsSUFBSSxLQUFLLFNBQXJDLEVBQWdEO0FBQzlDO0FBQ0EwSCxnQkFBUSxHQUFHLElBQVg7QUFDRDs7QUFFRCxVQUFJd0MsY0FBYyxHQUFHLEtBQXJCOztBQUVBLFVBQUl4QyxRQUFRLEtBQUssSUFBakIsRUFBdUI7QUFDckJ3QyxzQkFBYyxHQUFHLElBQWpCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZ0JBQVFsSyxJQUFSO0FBQ0UsZUFBSyxRQUFMO0FBQ0EsZUFBSyxRQUFMO0FBQ0VrSywwQkFBYyxHQUFHLElBQWpCO0FBQ0E7O0FBRUYsZUFBSyxRQUFMO0FBQ0Usb0JBQVF4QyxRQUFRLENBQUN2SCxRQUFqQjtBQUNFLG1CQUFLekQsa0JBQUw7QUFDQSxtQkFBS0MsaUJBQUw7QUFDRXVOLDhCQUFjLEdBQUcsSUFBakI7QUFISjs7QUFQSjtBQWNEOztBQUVELFVBQUlBLGNBQUosRUFBb0I7QUFDbEJyRyxnQkFBUSxDQUFDNEYsZUFBRCxFQUFrQi9CLFFBQWxCLEVBQTRCO0FBQ3BDO0FBQ0F1QyxpQkFBUyxLQUFLLEVBQWQsR0FBbUJ6QixTQUFTLEdBQUcyQixlQUFlLENBQUN6QyxRQUFELEVBQVcsQ0FBWCxDQUE5QyxHQUE4RHVDLFNBRnRELENBQVI7QUFHQSxlQUFPLENBQVA7QUFDRDs7QUFFRCxVQUFJRyxLQUFKO0FBQ0EsVUFBSUMsUUFBSjtBQUNBLFVBQUlDLFlBQVksR0FBRyxDQUFuQixDQXRDK0UsQ0FzQ3pEOztBQUV0QixVQUFJQyxjQUFjLEdBQUdOLFNBQVMsS0FBSyxFQUFkLEdBQW1CekIsU0FBbkIsR0FBK0J5QixTQUFTLEdBQUd4QixZQUFoRTs7QUFFQSxVQUFJN0csS0FBSyxDQUFDNEksT0FBTixDQUFjOUMsUUFBZCxDQUFKLEVBQTZCO0FBQzNCLGFBQUssSUFBSUksQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osUUFBUSxDQUFDaEcsTUFBN0IsRUFBcUNvRyxDQUFDLEVBQXRDLEVBQTBDO0FBQ3hDc0MsZUFBSyxHQUFHMUMsUUFBUSxDQUFDSSxDQUFELENBQWhCO0FBQ0F1QyxrQkFBUSxHQUFHRSxjQUFjLEdBQUdKLGVBQWUsQ0FBQ0MsS0FBRCxFQUFRdEMsQ0FBUixDQUEzQztBQUNBd0Msc0JBQVksSUFBSU4sdUJBQXVCLENBQUNJLEtBQUQsRUFBUUMsUUFBUixFQUFrQnhHLFFBQWxCLEVBQTRCNEYsZUFBNUIsQ0FBdkM7QUFDRDtBQUNGLE9BTkQsTUFNTztBQUNMLFlBQUlnQixVQUFVLEdBQUczTSxhQUFhLENBQUM0SixRQUFELENBQTlCOztBQUVBLFlBQUksT0FBTytDLFVBQVAsS0FBc0IsVUFBMUIsRUFBc0M7QUFFcEM7QUFDRTtBQUNBLGdCQUFJQSxVQUFVLEtBQUsvQyxRQUFRLENBQUNnRCxPQUE1QixFQUFxQztBQUNuQyxrQkFBSSxDQUFDNUIsZ0JBQUwsRUFBdUI7QUFDckJ4SCxvQkFBSSxDQUFDLGlFQUFpRSwwREFBakUsR0FBOEgsMENBQS9ILENBQUo7QUFDRDs7QUFFRHdILDhCQUFnQixHQUFHLElBQW5CO0FBQ0Q7QUFDRjtBQUVELGNBQUlsTCxRQUFRLEdBQUc2TSxVQUFVLENBQUM3SCxJQUFYLENBQWdCOEUsUUFBaEIsQ0FBZjtBQUNBLGNBQUlpRCxJQUFKO0FBQ0EsY0FBSUMsRUFBRSxHQUFHLENBQVQ7O0FBRUEsaUJBQU8sQ0FBQyxDQUFDRCxJQUFJLEdBQUcvTSxRQUFRLENBQUNpTixJQUFULEVBQVIsRUFBeUJDLElBQWpDLEVBQXVDO0FBQ3JDVixpQkFBSyxHQUFHTyxJQUFJLENBQUNuRCxLQUFiO0FBQ0E2QyxvQkFBUSxHQUFHRSxjQUFjLEdBQUdKLGVBQWUsQ0FBQ0MsS0FBRCxFQUFRUSxFQUFFLEVBQVYsQ0FBM0M7QUFDQU4sd0JBQVksSUFBSU4sdUJBQXVCLENBQUNJLEtBQUQsRUFBUUMsUUFBUixFQUFrQnhHLFFBQWxCLEVBQTRCNEYsZUFBNUIsQ0FBdkM7QUFDRDtBQUNGLFNBdEJELE1Bc0JPLElBQUl6SixJQUFJLEtBQUssUUFBYixFQUF1QjtBQUM1QixjQUFJK0ssUUFBUSxHQUFHLEVBQWY7QUFFQTtBQUNFQSxvQkFBUSxHQUFHLG9FQUFvRSxVQUFwRSxHQUFpRnhLLHNCQUFzQixDQUFDSyxnQkFBdkIsRUFBNUY7QUFDRDtBQUVELGNBQUlvSyxjQUFjLEdBQUcsS0FBS3RELFFBQTFCO0FBRUE7QUFDRTtBQUNFLG9CQUFNMUUsS0FBSyxDQUFFLHFEQUFxRGdJLGNBQWMsS0FBSyxpQkFBbkIsR0FBdUMsdUJBQXVCN0csTUFBTSxDQUFDOEcsSUFBUCxDQUFZdkQsUUFBWixFQUFzQndELElBQXRCLENBQTJCLElBQTNCLENBQXZCLEdBQTBELEdBQWpHLEdBQXVHRixjQUE1SixJQUE4SyxJQUE5SyxHQUFxTEQsUUFBdkwsQ0FBWDtBQUNEO0FBQ0Y7QUFDRjtBQUNGOztBQUVELGFBQU9ULFlBQVA7QUFDRDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsYUFBU2EsbUJBQVQsQ0FBNkJ6RCxRQUE3QixFQUF1QzdELFFBQXZDLEVBQWlENEYsZUFBakQsRUFBa0U7QUFDaEUsVUFBSS9CLFFBQVEsSUFBSSxJQUFoQixFQUFzQjtBQUNwQixlQUFPLENBQVA7QUFDRDs7QUFFRCxhQUFPc0MsdUJBQXVCLENBQUN0QyxRQUFELEVBQVcsRUFBWCxFQUFlN0QsUUFBZixFQUF5QjRGLGVBQXpCLENBQTlCO0FBQ0Q7QUFDRDs7Ozs7Ozs7O0FBU0EsYUFBU1UsZUFBVCxDQUF5QmlCLFNBQXpCLEVBQW9DQyxLQUFwQyxFQUEyQztBQUN6QztBQUNBO0FBQ0EsVUFBSSxPQUFPRCxTQUFQLEtBQXFCLFFBQXJCLElBQWlDQSxTQUFTLEtBQUssSUFBL0MsSUFBdURBLFNBQVMsQ0FBQ3JGLEdBQVYsSUFBaUIsSUFBNUUsRUFBa0Y7QUFDaEY7QUFDQSxlQUFPMkMsTUFBTSxDQUFDMEMsU0FBUyxDQUFDckYsR0FBWCxDQUFiO0FBQ0QsT0FOd0MsQ0FNdkM7OztBQUdGLGFBQU9zRixLQUFLLENBQUNDLFFBQU4sQ0FBZSxFQUFmLENBQVA7QUFDRDs7QUFFRCxhQUFTQyxrQkFBVCxDQUE0QkMsV0FBNUIsRUFBeUNwQixLQUF6QyxFQUFnRDVMLElBQWhELEVBQXNEO0FBQ3BELFVBQUlvTCxJQUFJLEdBQUc0QixXQUFXLENBQUM1QixJQUF2QjtBQUFBLFVBQ0lyRixPQUFPLEdBQUdpSCxXQUFXLENBQUNqSCxPQUQxQjtBQUVBcUYsVUFBSSxDQUFDaEgsSUFBTCxDQUFVMkIsT0FBVixFQUFtQjZGLEtBQW5CLEVBQTBCb0IsV0FBVyxDQUFDM0IsS0FBWixFQUExQjtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7O0FBY0EsYUFBUzRCLGVBQVQsQ0FBeUIvRCxRQUF6QixFQUFtQ2dFLFdBQW5DLEVBQWdEQyxjQUFoRCxFQUFnRTtBQUM5RCxVQUFJakUsUUFBUSxJQUFJLElBQWhCLEVBQXNCO0FBQ3BCLGVBQU9BLFFBQVA7QUFDRDs7QUFFRCxVQUFJK0IsZUFBZSxHQUFHTCx3QkFBd0IsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhc0MsV0FBYixFQUEwQkMsY0FBMUIsQ0FBOUM7QUFDQVIseUJBQW1CLENBQUN6RCxRQUFELEVBQVc2RCxrQkFBWCxFQUErQjlCLGVBQS9CLENBQW5CO0FBQ0FLLDRCQUFzQixDQUFDTCxlQUFELENBQXRCO0FBQ0Q7O0FBRUQsYUFBU21DLHlCQUFULENBQW1DSixXQUFuQyxFQUFnRHBCLEtBQWhELEVBQXVEeUIsUUFBdkQsRUFBaUU7QUFDL0QsVUFBSWxDLE1BQU0sR0FBRzZCLFdBQVcsQ0FBQzdCLE1BQXpCO0FBQUEsVUFDSUwsU0FBUyxHQUFHa0MsV0FBVyxDQUFDbEMsU0FENUI7QUFBQSxVQUVJTSxJQUFJLEdBQUc0QixXQUFXLENBQUM1QixJQUZ2QjtBQUFBLFVBR0lyRixPQUFPLEdBQUdpSCxXQUFXLENBQUNqSCxPQUgxQjtBQUlBLFVBQUl1SCxXQUFXLEdBQUdsQyxJQUFJLENBQUNoSCxJQUFMLENBQVUyQixPQUFWLEVBQW1CNkYsS0FBbkIsRUFBMEJvQixXQUFXLENBQUMzQixLQUFaLEVBQTFCLENBQWxCOztBQUVBLFVBQUlqSSxLQUFLLENBQUM0SSxPQUFOLENBQWNzQixXQUFkLENBQUosRUFBZ0M7QUFDOUJDLG9DQUE0QixDQUFDRCxXQUFELEVBQWNuQyxNQUFkLEVBQXNCa0MsUUFBdEIsRUFBZ0MsVUFBVUcsQ0FBVixFQUFhO0FBQ3ZFLGlCQUFPQSxDQUFQO0FBQ0QsU0FGMkIsQ0FBNUI7QUFHRCxPQUpELE1BSU8sSUFBSUYsV0FBVyxJQUFJLElBQW5CLEVBQXlCO0FBQzlCLFlBQUl4RCxjQUFjLENBQUN3RCxXQUFELENBQWxCLEVBQWlDO0FBQy9CQSxxQkFBVyxHQUFHOUQsa0JBQWtCLENBQUM4RCxXQUFELEVBQWM7QUFDOUM7QUFDQXhDLG1CQUFTLElBQUl3QyxXQUFXLENBQUMvRixHQUFaLEtBQW9CLENBQUNxRSxLQUFELElBQVVBLEtBQUssQ0FBQ3JFLEdBQU4sS0FBYytGLFdBQVcsQ0FBQy9GLEdBQXhELElBQStEaUQscUJBQXFCLENBQUM4QyxXQUFXLENBQUMvRixHQUFiLENBQXJCLEdBQXlDLEdBQXhHLEdBQThHLEVBQWxILENBQVQsR0FBaUk4RixRQUZqRyxDQUFoQztBQUdEOztBQUVEbEMsY0FBTSxDQUFDSSxJQUFQLENBQVkrQixXQUFaO0FBQ0Q7QUFDRjs7QUFFRCxhQUFTQyw0QkFBVCxDQUFzQ3JFLFFBQXRDLEVBQWdEdUUsS0FBaEQsRUFBdURDLE1BQXZELEVBQStEdEMsSUFBL0QsRUFBcUVyRixPQUFyRSxFQUE4RTtBQUM1RSxVQUFJNEgsYUFBYSxHQUFHLEVBQXBCOztBQUVBLFVBQUlELE1BQU0sSUFBSSxJQUFkLEVBQW9CO0FBQ2xCQyxxQkFBYSxHQUFHbkQscUJBQXFCLENBQUNrRCxNQUFELENBQXJCLEdBQWdDLEdBQWhEO0FBQ0Q7O0FBRUQsVUFBSXpDLGVBQWUsR0FBR0wsd0JBQXdCLENBQUM2QyxLQUFELEVBQVFFLGFBQVIsRUFBdUJ2QyxJQUF2QixFQUE2QnJGLE9BQTdCLENBQTlDO0FBQ0E0Ryx5QkFBbUIsQ0FBQ3pELFFBQUQsRUFBV2tFLHlCQUFYLEVBQXNDbkMsZUFBdEMsQ0FBbkI7QUFDQUssNEJBQXNCLENBQUNMLGVBQUQsQ0FBdEI7QUFDRDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7QUFlQSxhQUFTMkMsV0FBVCxDQUFxQjFFLFFBQXJCLEVBQStCa0MsSUFBL0IsRUFBcUNyRixPQUFyQyxFQUE4QztBQUM1QyxVQUFJbUQsUUFBUSxJQUFJLElBQWhCLEVBQXNCO0FBQ3BCLGVBQU9BLFFBQVA7QUFDRDs7QUFFRCxVQUFJaUMsTUFBTSxHQUFHLEVBQWI7QUFDQW9DLGtDQUE0QixDQUFDckUsUUFBRCxFQUFXaUMsTUFBWCxFQUFtQixJQUFuQixFQUF5QkMsSUFBekIsRUFBK0JyRixPQUEvQixDQUE1QjtBQUNBLGFBQU9vRixNQUFQO0FBQ0Q7QUFDRDs7Ozs7Ozs7Ozs7QUFXQSxhQUFTMEMsYUFBVCxDQUF1QjNFLFFBQXZCLEVBQWlDO0FBQy9CLGFBQU95RCxtQkFBbUIsQ0FBQ3pELFFBQUQsRUFBVyxZQUFZO0FBQy9DLGVBQU8sSUFBUDtBQUNELE9BRnlCLEVBRXZCLElBRnVCLENBQTFCO0FBR0Q7QUFDRDs7Ozs7Ozs7QUFRQSxhQUFTNEUsT0FBVCxDQUFpQjVFLFFBQWpCLEVBQTJCO0FBQ3pCLFVBQUlpQyxNQUFNLEdBQUcsRUFBYjtBQUNBb0Msa0NBQTRCLENBQUNyRSxRQUFELEVBQVdpQyxNQUFYLEVBQW1CLElBQW5CLEVBQXlCLFVBQVVTLEtBQVYsRUFBaUI7QUFDcEUsZUFBT0EsS0FBUDtBQUNELE9BRjJCLENBQTVCO0FBR0EsYUFBT1QsTUFBUDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsYUFBUzRDLFNBQVQsQ0FBbUI3RSxRQUFuQixFQUE2QjtBQUMzQixVQUFJLENBQUNZLGNBQWMsQ0FBQ1osUUFBRCxDQUFuQixFQUErQjtBQUM3QjtBQUNFLGdCQUFNMUUsS0FBSyxDQUFFLHVFQUFGLENBQVg7QUFDRDtBQUNGOztBQUVELGFBQU8wRSxRQUFQO0FBQ0Q7O0FBRUQsYUFBUzhFLGFBQVQsQ0FBdUJDLFlBQXZCLEVBQXFDQyxvQkFBckMsRUFBMkQ7QUFDekQsVUFBSUEsb0JBQW9CLEtBQUt0SCxTQUE3QixFQUF3QztBQUN0Q3NILDRCQUFvQixHQUFHLElBQXZCO0FBQ0QsT0FGRCxNQUVPO0FBQ0w7QUFDRSxjQUFJQSxvQkFBb0IsS0FBSyxJQUF6QixJQUFpQyxPQUFPQSxvQkFBUCxLQUFnQyxVQUFyRSxFQUFpRjtBQUMvRXhNLGlCQUFLLENBQUMsa0VBQWtFLGdDQUFuRSxFQUFxR3dNLG9CQUFyRyxDQUFMO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFVBQUluSSxPQUFPLEdBQUc7QUFDWnBFLGdCQUFRLEVBQUVuRCxrQkFERTtBQUVaMlAsNkJBQXFCLEVBQUVELG9CQUZYO0FBR1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBRSxxQkFBYSxFQUFFSCxZQVJIO0FBU1pJLHNCQUFjLEVBQUVKLFlBVEo7QUFVWjtBQUNBO0FBQ0FLLG9CQUFZLEVBQUUsQ0FaRjtBQWFaO0FBQ0FDLGdCQUFRLEVBQUUsSUFkRTtBQWVaQyxnQkFBUSxFQUFFO0FBZkUsT0FBZDtBQWlCQXpJLGFBQU8sQ0FBQ3dJLFFBQVIsR0FBbUI7QUFDakI1TSxnQkFBUSxFQUFFcEQsbUJBRE87QUFFakJrUSxnQkFBUSxFQUFFMUk7QUFGTyxPQUFuQjtBQUlBLFVBQUkySSx5Q0FBeUMsR0FBRyxLQUFoRDtBQUNBLFVBQUlDLG1DQUFtQyxHQUFHLEtBQTFDO0FBRUE7QUFDRTtBQUNBO0FBQ0E7QUFDQSxZQUFJSCxRQUFRLEdBQUc7QUFDYjdNLGtCQUFRLEVBQUVuRCxrQkFERztBQUViaVEsa0JBQVEsRUFBRTFJLE9BRkc7QUFHYm9JLCtCQUFxQixFQUFFcEksT0FBTyxDQUFDb0k7QUFIbEIsU0FBZixDQUpGLENBUUs7O0FBRUh4SSxjQUFNLENBQUNpSixnQkFBUCxDQUF3QkosUUFBeEIsRUFBa0M7QUFDaENELGtCQUFRLEVBQUU7QUFDUjVILGVBQUcsRUFBRSxZQUFZO0FBQ2Ysa0JBQUksQ0FBQ2dJLG1DQUFMLEVBQTBDO0FBQ3hDQSxtREFBbUMsR0FBRyxJQUF0QztBQUVBak4scUJBQUssQ0FBQyxtRkFBbUYsNEVBQXBGLENBQUw7QUFDRDs7QUFFRCxxQkFBT3FFLE9BQU8sQ0FBQ3dJLFFBQWY7QUFDRCxhQVRPO0FBVVJNLGVBQUcsRUFBRSxVQUFVQyxTQUFWLEVBQXFCO0FBQ3hCL0kscUJBQU8sQ0FBQ3dJLFFBQVIsR0FBbUJPLFNBQW5CO0FBQ0Q7QUFaTyxXQURzQjtBQWVoQ1YsdUJBQWEsRUFBRTtBQUNiekgsZUFBRyxFQUFFLFlBQVk7QUFDZixxQkFBT1osT0FBTyxDQUFDcUksYUFBZjtBQUNELGFBSFk7QUFJYlMsZUFBRyxFQUFFLFVBQVVULGFBQVYsRUFBeUI7QUFDNUJySSxxQkFBTyxDQUFDcUksYUFBUixHQUF3QkEsYUFBeEI7QUFDRDtBQU5ZLFdBZmlCO0FBdUJoQ0Msd0JBQWMsRUFBRTtBQUNkMUgsZUFBRyxFQUFFLFlBQVk7QUFDZixxQkFBT1osT0FBTyxDQUFDc0ksY0FBZjtBQUNELGFBSGE7QUFJZFEsZUFBRyxFQUFFLFVBQVVSLGNBQVYsRUFBMEI7QUFDN0J0SSxxQkFBTyxDQUFDc0ksY0FBUixHQUF5QkEsY0FBekI7QUFDRDtBQU5hLFdBdkJnQjtBQStCaENDLHNCQUFZLEVBQUU7QUFDWjNILGVBQUcsRUFBRSxZQUFZO0FBQ2YscUJBQU9aLE9BQU8sQ0FBQ3VJLFlBQWY7QUFDRCxhQUhXO0FBSVpPLGVBQUcsRUFBRSxVQUFVUCxZQUFWLEVBQXdCO0FBQzNCdkkscUJBQU8sQ0FBQ3VJLFlBQVIsR0FBdUJBLFlBQXZCO0FBQ0Q7QUFOVyxXQS9Ca0I7QUF1Q2hDRSxrQkFBUSxFQUFFO0FBQ1I3SCxlQUFHLEVBQUUsWUFBWTtBQUNmLGtCQUFJLENBQUMrSCx5Q0FBTCxFQUFnRDtBQUM5Q0EseURBQXlDLEdBQUcsSUFBNUM7QUFFQWhOLHFCQUFLLENBQUMsbUZBQW1GLDRFQUFwRixDQUFMO0FBQ0Q7O0FBRUQscUJBQU9xRSxPQUFPLENBQUN5SSxRQUFmO0FBQ0Q7QUFUTztBQXZDc0IsU0FBbEMsRUFWRixDQTRETTs7QUFFSnpJLGVBQU8sQ0FBQ3lJLFFBQVIsR0FBbUJBLFFBQW5CO0FBQ0Q7QUFFRDtBQUNFekksZUFBTyxDQUFDZ0osZ0JBQVIsR0FBMkIsSUFBM0I7QUFDQWhKLGVBQU8sQ0FBQ2lKLGlCQUFSLEdBQTRCLElBQTVCO0FBQ0Q7QUFFRCxhQUFPakosT0FBUDtBQUNEOztBQUVELGFBQVNrSixJQUFULENBQWNDLElBQWQsRUFBb0I7QUFDbEIsVUFBSUMsUUFBUSxHQUFHO0FBQ2J4TixnQkFBUSxFQUFFN0MsZUFERztBQUVic1EsYUFBSyxFQUFFRixJQUZNO0FBR2I7QUFDQW5PLGVBQU8sRUFBRSxDQUFDLENBSkc7QUFLYkMsZUFBTyxFQUFFO0FBTEksT0FBZjtBQVFBO0FBQ0U7QUFDQSxZQUFJdUksWUFBSjtBQUNBLFlBQUk4RixTQUFKO0FBQ0ExSixjQUFNLENBQUNpSixnQkFBUCxDQUF3Qk8sUUFBeEIsRUFBa0M7QUFDaEM1RixzQkFBWSxFQUFFO0FBQ1pqQix3QkFBWSxFQUFFLElBREY7QUFFWjNCLGVBQUcsRUFBRSxZQUFZO0FBQ2YscUJBQU80QyxZQUFQO0FBQ0QsYUFKVztBQUtac0YsZUFBRyxFQUFFLFVBQVVTLGVBQVYsRUFBMkI7QUFDOUI1TixtQkFBSyxDQUFDLHNFQUFzRSxtRUFBdEUsR0FBNEksdURBQTdJLENBQUw7QUFFQTZILDBCQUFZLEdBQUcrRixlQUFmLENBSDhCLENBR0U7O0FBRWhDM0osb0JBQU0sQ0FBQ2UsY0FBUCxDQUFzQnlJLFFBQXRCLEVBQWdDLGNBQWhDLEVBQWdEO0FBQzlDckcsMEJBQVUsRUFBRTtBQURrQyxlQUFoRDtBQUdEO0FBYlcsV0FEa0I7QUFnQmhDdUcsbUJBQVMsRUFBRTtBQUNUL0csd0JBQVksRUFBRSxJQURMO0FBRVQzQixlQUFHLEVBQUUsWUFBWTtBQUNmLHFCQUFPMEksU0FBUDtBQUNELGFBSlE7QUFLVFIsZUFBRyxFQUFFLFVBQVVVLFlBQVYsRUFBd0I7QUFDM0I3TixtQkFBSyxDQUFDLG1FQUFtRSxtRUFBbkUsR0FBeUksdURBQTFJLENBQUw7QUFFQTJOLHVCQUFTLEdBQUdFLFlBQVosQ0FIMkIsQ0FHRDs7QUFFMUI1SixvQkFBTSxDQUFDZSxjQUFQLENBQXNCeUksUUFBdEIsRUFBZ0MsV0FBaEMsRUFBNkM7QUFDM0NyRywwQkFBVSxFQUFFO0FBRCtCLGVBQTdDO0FBR0Q7QUFiUTtBQWhCcUIsU0FBbEM7QUFnQ0Q7QUFFRCxhQUFPcUcsUUFBUDtBQUNEOztBQUVELGFBQVNLLFVBQVQsQ0FBb0I1TixNQUFwQixFQUE0QjtBQUMxQjtBQUNFLFlBQUlBLE1BQU0sSUFBSSxJQUFWLElBQWtCQSxNQUFNLENBQUNELFFBQVAsS0FBb0I5QyxlQUExQyxFQUEyRDtBQUN6RDZDLGVBQUssQ0FBQyxpRUFBaUUsbURBQWpFLEdBQXVILHdCQUF4SCxDQUFMO0FBQ0QsU0FGRCxNQUVPLElBQUksT0FBT0UsTUFBUCxLQUFrQixVQUF0QixFQUFrQztBQUN2Q0YsZUFBSyxDQUFDLHlEQUFELEVBQTRERSxNQUFNLEtBQUssSUFBWCxHQUFrQixNQUFsQixHQUEyQixPQUFPQSxNQUE5RixDQUFMO0FBQ0QsU0FGTSxNQUVBO0FBQ0wsY0FBSUEsTUFBTSxDQUFDc0IsTUFBUCxLQUFrQixDQUFsQixJQUF1QnRCLE1BQU0sQ0FBQ3NCLE1BQVAsS0FBa0IsQ0FBN0MsRUFBZ0Q7QUFDOUN4QixpQkFBSyxDQUFDLDhFQUFELEVBQWlGRSxNQUFNLENBQUNzQixNQUFQLEtBQWtCLENBQWxCLEdBQXNCLDBDQUF0QixHQUFtRSw2Q0FBcEosQ0FBTDtBQUNEO0FBQ0Y7O0FBRUQsWUFBSXRCLE1BQU0sSUFBSSxJQUFkLEVBQW9CO0FBQ2xCLGNBQUlBLE1BQU0sQ0FBQzJILFlBQVAsSUFBdUIsSUFBdkIsSUFBK0IzSCxNQUFNLENBQUN5TixTQUFQLElBQW9CLElBQXZELEVBQTZEO0FBQzNEM04saUJBQUssQ0FBQywyRUFBMkUsOENBQTVFLENBQUw7QUFDRDtBQUNGO0FBQ0Y7QUFFRCxhQUFPO0FBQ0xDLGdCQUFRLEVBQUVqRCxzQkFETDtBQUVMa0QsY0FBTSxFQUFFQTtBQUZILE9BQVA7QUFJRDs7QUFFRCxhQUFTNk4sa0JBQVQsQ0FBNEJqTyxJQUE1QixFQUFrQztBQUNoQyxhQUFPLE9BQU9BLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEIsT0FBT0EsSUFBUCxLQUFnQixVQUE1QyxJQUEwRDtBQUNqRUEsVUFBSSxLQUFLcEQsbUJBREYsSUFDeUJvRCxJQUFJLEtBQUsvQywwQkFEbEMsSUFDZ0UrQyxJQUFJLEtBQUtsRCxtQkFEekUsSUFDZ0drRCxJQUFJLEtBQUtuRCxzQkFEekcsSUFDbUltRCxJQUFJLEtBQUs3QyxtQkFENUksSUFDbUs2QyxJQUFJLEtBQUs1Qyx3QkFENUssSUFDd00sT0FBTzRDLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEJBLElBQUksS0FBSyxJQUFyQyxLQUE4Q0EsSUFBSSxDQUFDRyxRQUFMLEtBQWtCN0MsZUFBbEIsSUFBcUMwQyxJQUFJLENBQUNHLFFBQUwsS0FBa0I5QyxlQUF2RCxJQUEwRTJDLElBQUksQ0FBQ0csUUFBTCxLQUFrQnBELG1CQUE1RixJQUFtSGlELElBQUksQ0FBQ0csUUFBTCxLQUFrQm5ELGtCQUFySSxJQUEySmdELElBQUksQ0FBQ0csUUFBTCxLQUFrQmpELHNCQUE3SyxJQUF1TThDLElBQUksQ0FBQ0csUUFBTCxLQUFrQjNDLHNCQUF6TixJQUFtUHdDLElBQUksQ0FBQ0csUUFBTCxLQUFrQjFDLG9CQUFyUSxJQUE2UnVDLElBQUksQ0FBQ0csUUFBTCxLQUFrQnpDLGdCQUEvUyxJQUFtVXNDLElBQUksQ0FBQ0csUUFBTCxLQUFrQjVDLGdCQUFuWSxDQUQvTTtBQUVEOztBQUVELGFBQVMyUSxJQUFULENBQWNsTyxJQUFkLEVBQW9CbU8sT0FBcEIsRUFBNkI7QUFDM0I7QUFDRSxZQUFJLENBQUNGLGtCQUFrQixDQUFDak8sSUFBRCxDQUF2QixFQUErQjtBQUM3QkUsZUFBSyxDQUFDLDJEQUEyRCxjQUE1RCxFQUE0RUYsSUFBSSxLQUFLLElBQVQsR0FBZ0IsTUFBaEIsR0FBeUIsT0FBT0EsSUFBNUcsQ0FBTDtBQUNEO0FBQ0Y7QUFFRCxhQUFPO0FBQ0xHLGdCQUFRLEVBQUU5QyxlQURMO0FBRUwyQyxZQUFJLEVBQUVBLElBRkQ7QUFHTG1PLGVBQU8sRUFBRUEsT0FBTyxLQUFLL0ksU0FBWixHQUF3QixJQUF4QixHQUErQitJO0FBSG5DLE9BQVA7QUFLRDs7QUFFRCxhQUFTQyxpQkFBVCxHQUE2QjtBQUMzQixVQUFJQyxVQUFVLEdBQUdwUSxzQkFBc0IsQ0FBQ0MsT0FBeEM7O0FBRUEsVUFBSSxFQUFFbVEsVUFBVSxLQUFLLElBQWpCLENBQUosRUFBNEI7QUFDMUI7QUFDRSxnQkFBTXJMLEtBQUssQ0FBRSw0YUFBRixDQUFYO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPcUwsVUFBUDtBQUNEOztBQUVELGFBQVNDLFVBQVQsQ0FBb0JDLE9BQXBCLEVBQTZCQyxxQkFBN0IsRUFBb0Q7QUFDbEQsVUFBSUgsVUFBVSxHQUFHRCxpQkFBaUIsRUFBbEM7QUFFQTtBQUNFLFlBQUlJLHFCQUFxQixLQUFLcEosU0FBOUIsRUFBeUM7QUFDdkNsRixlQUFLLENBQUMseURBQXlELDZDQUF6RCxHQUF5RyxtQkFBMUcsRUFBK0hzTyxxQkFBL0gsRUFBc0osT0FBT0EscUJBQVAsS0FBaUMsUUFBakMsSUFBNkM1TSxLQUFLLENBQUM0SSxPQUFOLENBQWMvSSxTQUFTLENBQUMsQ0FBRCxDQUF2QixDQUE3QyxHQUEyRSw2Q0FBNkMsZ0RBQTdDLEdBQWdHLDRDQUEzSyxHQUEwTixFQUFoWCxDQUFMO0FBQ0QsU0FISCxDQUdJOzs7QUFHRixZQUFJOE0sT0FBTyxDQUFDdEIsUUFBUixLQUFxQjdILFNBQXpCLEVBQW9DO0FBQ2xDLGNBQUlxSixXQUFXLEdBQUdGLE9BQU8sQ0FBQ3RCLFFBQTFCLENBRGtDLENBQ0U7QUFDcEM7O0FBRUEsY0FBSXdCLFdBQVcsQ0FBQ3pCLFFBQVosS0FBeUJ1QixPQUE3QixFQUFzQztBQUNwQ3JPLGlCQUFLLENBQUMsd0ZBQXdGLHNGQUF6RixDQUFMO0FBQ0QsV0FGRCxNQUVPLElBQUl1TyxXQUFXLENBQUMxQixRQUFaLEtBQXlCd0IsT0FBN0IsRUFBc0M7QUFDM0NyTyxpQkFBSyxDQUFDLDREQUE0RCxtREFBN0QsQ0FBTDtBQUNEO0FBQ0Y7QUFDRjtBQUVELGFBQU9tTyxVQUFVLENBQUNDLFVBQVgsQ0FBc0JDLE9BQXRCLEVBQStCQyxxQkFBL0IsQ0FBUDtBQUNEOztBQUNELGFBQVNFLFFBQVQsQ0FBa0JDLFlBQWxCLEVBQWdDO0FBQzlCLFVBQUlOLFVBQVUsR0FBR0QsaUJBQWlCLEVBQWxDO0FBQ0EsYUFBT0MsVUFBVSxDQUFDSyxRQUFYLENBQW9CQyxZQUFwQixDQUFQO0FBQ0Q7O0FBQ0QsYUFBU0MsVUFBVCxDQUFvQkMsT0FBcEIsRUFBNkJDLFVBQTdCLEVBQXlDQyxJQUF6QyxFQUErQztBQUM3QyxVQUFJVixVQUFVLEdBQUdELGlCQUFpQixFQUFsQztBQUNBLGFBQU9DLFVBQVUsQ0FBQ08sVUFBWCxDQUFzQkMsT0FBdEIsRUFBK0JDLFVBQS9CLEVBQTJDQyxJQUEzQyxDQUFQO0FBQ0Q7O0FBQ0QsYUFBU0MsTUFBVCxDQUFnQkMsWUFBaEIsRUFBOEI7QUFDNUIsVUFBSVosVUFBVSxHQUFHRCxpQkFBaUIsRUFBbEM7QUFDQSxhQUFPQyxVQUFVLENBQUNXLE1BQVgsQ0FBa0JDLFlBQWxCLENBQVA7QUFDRDs7QUFDRCxhQUFTQyxTQUFULENBQW1CQyxNQUFuQixFQUEyQkMsSUFBM0IsRUFBaUM7QUFDL0IsVUFBSWYsVUFBVSxHQUFHRCxpQkFBaUIsRUFBbEM7QUFDQSxhQUFPQyxVQUFVLENBQUNhLFNBQVgsQ0FBcUJDLE1BQXJCLEVBQTZCQyxJQUE3QixDQUFQO0FBQ0Q7O0FBQ0QsYUFBU0MsZUFBVCxDQUF5QkYsTUFBekIsRUFBaUNDLElBQWpDLEVBQXVDO0FBQ3JDLFVBQUlmLFVBQVUsR0FBR0QsaUJBQWlCLEVBQWxDO0FBQ0EsYUFBT0MsVUFBVSxDQUFDZ0IsZUFBWCxDQUEyQkYsTUFBM0IsRUFBbUNDLElBQW5DLENBQVA7QUFDRDs7QUFDRCxhQUFTRSxXQUFULENBQXFCekwsUUFBckIsRUFBK0J1TCxJQUEvQixFQUFxQztBQUNuQyxVQUFJZixVQUFVLEdBQUdELGlCQUFpQixFQUFsQztBQUNBLGFBQU9DLFVBQVUsQ0FBQ2lCLFdBQVgsQ0FBdUJ6TCxRQUF2QixFQUFpQ3VMLElBQWpDLENBQVA7QUFDRDs7QUFDRCxhQUFTRyxPQUFULENBQWlCSixNQUFqQixFQUF5QkMsSUFBekIsRUFBK0I7QUFDN0IsVUFBSWYsVUFBVSxHQUFHRCxpQkFBaUIsRUFBbEM7QUFDQSxhQUFPQyxVQUFVLENBQUNrQixPQUFYLENBQW1CSixNQUFuQixFQUEyQkMsSUFBM0IsQ0FBUDtBQUNEOztBQUNELGFBQVNJLG1CQUFULENBQTZCeEosR0FBN0IsRUFBa0NtSixNQUFsQyxFQUEwQ0MsSUFBMUMsRUFBZ0Q7QUFDOUMsVUFBSWYsVUFBVSxHQUFHRCxpQkFBaUIsRUFBbEM7QUFDQSxhQUFPQyxVQUFVLENBQUNtQixtQkFBWCxDQUErQnhKLEdBQS9CLEVBQW9DbUosTUFBcEMsRUFBNENDLElBQTVDLENBQVA7QUFDRDs7QUFDRCxhQUFTSyxhQUFULENBQXVCakksS0FBdkIsRUFBOEJrSSxXQUE5QixFQUEyQztBQUN6QztBQUNFLFlBQUlyQixVQUFVLEdBQUdELGlCQUFpQixFQUFsQztBQUNBLGVBQU9DLFVBQVUsQ0FBQ29CLGFBQVgsQ0FBeUJqSSxLQUF6QixFQUFnQ2tJLFdBQWhDLENBQVA7QUFDRDtBQUNGOztBQUVELFFBQUlDLDZCQUFKO0FBRUE7QUFDRUEsbUNBQTZCLEdBQUcsS0FBaEM7QUFDRDs7QUFFRCxhQUFTQywyQkFBVCxHQUF1QztBQUNyQyxVQUFJdlIsaUJBQWlCLENBQUNILE9BQXRCLEVBQStCO0FBQzdCLFlBQUlNLElBQUksR0FBR3VCLGdCQUFnQixDQUFDMUIsaUJBQWlCLENBQUNILE9BQWxCLENBQTBCOEIsSUFBM0IsQ0FBM0I7O0FBRUEsWUFBSXhCLElBQUosRUFBVTtBQUNSLGlCQUFPLHFDQUFxQ0EsSUFBckMsR0FBNEMsSUFBbkQ7QUFDRDtBQUNGOztBQUVELGFBQU8sRUFBUDtBQUNEOztBQUVELGFBQVNxUiwwQkFBVCxDQUFvQ3BSLE1BQXBDLEVBQTRDO0FBQzFDLFVBQUlBLE1BQU0sS0FBSzJHLFNBQWYsRUFBMEI7QUFDeEIsWUFBSXZHLFFBQVEsR0FBR0osTUFBTSxDQUFDSSxRQUFQLENBQWdCQyxPQUFoQixDQUF3QixXQUF4QixFQUFxQyxFQUFyQyxDQUFmO0FBQ0EsWUFBSUssVUFBVSxHQUFHVixNQUFNLENBQUNVLFVBQXhCO0FBQ0EsZUFBTyw0QkFBNEJOLFFBQTVCLEdBQXVDLEdBQXZDLEdBQTZDTSxVQUE3QyxHQUEwRCxHQUFqRTtBQUNEOztBQUVELGFBQU8sRUFBUDtBQUNEOztBQUVELGFBQVMyUSxrQ0FBVCxDQUE0Q0MsWUFBNUMsRUFBMEQ7QUFDeEQsVUFBSUEsWUFBWSxLQUFLLElBQWpCLElBQXlCQSxZQUFZLEtBQUszSyxTQUE5QyxFQUF5RDtBQUN2RCxlQUFPeUssMEJBQTBCLENBQUNFLFlBQVksQ0FBQzdKLFFBQWQsQ0FBakM7QUFDRDs7QUFFRCxhQUFPLEVBQVA7QUFDRDtBQUNEOzs7Ozs7O0FBT0EsUUFBSThKLHFCQUFxQixHQUFHLEVBQTVCOztBQUVBLGFBQVNDLDRCQUFULENBQXNDQyxVQUF0QyxFQUFrRDtBQUNoRCxVQUFJakwsSUFBSSxHQUFHMkssMkJBQTJCLEVBQXRDOztBQUVBLFVBQUksQ0FBQzNLLElBQUwsRUFBVztBQUNULFlBQUlrTCxVQUFVLEdBQUcsT0FBT0QsVUFBUCxLQUFzQixRQUF0QixHQUFpQ0EsVUFBakMsR0FBOENBLFVBQVUsQ0FBQ3BRLFdBQVgsSUFBMEJvUSxVQUFVLENBQUMxUixJQUFwRzs7QUFFQSxZQUFJMlIsVUFBSixFQUFnQjtBQUNkbEwsY0FBSSxHQUFHLGdEQUFnRGtMLFVBQWhELEdBQTZELElBQXBFO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPbEwsSUFBUDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUFhQSxhQUFTbUwsbUJBQVQsQ0FBNkIxUCxPQUE3QixFQUFzQ3dQLFVBQXRDLEVBQWtEO0FBQ2hELFVBQUksQ0FBQ3hQLE9BQU8sQ0FBQzJHLE1BQVQsSUFBbUIzRyxPQUFPLENBQUMyRyxNQUFSLENBQWVnSixTQUFsQyxJQUErQzNQLE9BQU8sQ0FBQ3FGLEdBQVIsSUFBZSxJQUFsRSxFQUF3RTtBQUN0RTtBQUNEOztBQUVEckYsYUFBTyxDQUFDMkcsTUFBUixDQUFlZ0osU0FBZixHQUEyQixJQUEzQjtBQUNBLFVBQUlDLHlCQUF5QixHQUFHTCw0QkFBNEIsQ0FBQ0MsVUFBRCxDQUE1RDs7QUFFQSxVQUFJRixxQkFBcUIsQ0FBQ00seUJBQUQsQ0FBekIsRUFBc0Q7QUFDcEQ7QUFDRDs7QUFFRE4sMkJBQXFCLENBQUNNLHlCQUFELENBQXJCLEdBQW1ELElBQW5ELENBWmdELENBWVM7QUFDekQ7QUFDQTs7QUFFQSxVQUFJQyxVQUFVLEdBQUcsRUFBakI7O0FBRUEsVUFBSTdQLE9BQU8sSUFBSUEsT0FBTyxDQUFDSyxNQUFuQixJQUE2QkwsT0FBTyxDQUFDSyxNQUFSLEtBQW1CMUMsaUJBQWlCLENBQUNILE9BQXRFLEVBQStFO0FBQzdFO0FBQ0FxUyxrQkFBVSxHQUFHLGlDQUFpQ3hRLGdCQUFnQixDQUFDVyxPQUFPLENBQUNLLE1BQVIsQ0FBZWYsSUFBaEIsQ0FBakQsR0FBeUUsR0FBdEY7QUFDRDs7QUFFRFMsbUNBQTZCLENBQUNDLE9BQUQsQ0FBN0I7QUFFQTtBQUNFUixhQUFLLENBQUMsMERBQTBELGlFQUEzRCxFQUE4SG9RLHlCQUE5SCxFQUF5SkMsVUFBekosQ0FBTDtBQUNEO0FBRUQ5UCxtQ0FBNkIsQ0FBQyxJQUFELENBQTdCO0FBQ0Q7QUFDRDs7Ozs7Ozs7Ozs7QUFXQSxhQUFTK1AsaUJBQVQsQ0FBMkJDLElBQTNCLEVBQWlDUCxVQUFqQyxFQUE2QztBQUMzQyxVQUFJLE9BQU9PLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUI7QUFDRDs7QUFFRCxVQUFJN08sS0FBSyxDQUFDNEksT0FBTixDQUFjaUcsSUFBZCxDQUFKLEVBQXlCO0FBQ3ZCLGFBQUssSUFBSTNJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcySSxJQUFJLENBQUMvTyxNQUF6QixFQUFpQ29HLENBQUMsRUFBbEMsRUFBc0M7QUFDcEMsY0FBSXNDLEtBQUssR0FBR3FHLElBQUksQ0FBQzNJLENBQUQsQ0FBaEI7O0FBRUEsY0FBSVEsY0FBYyxDQUFDOEIsS0FBRCxDQUFsQixFQUEyQjtBQUN6QmdHLCtCQUFtQixDQUFDaEcsS0FBRCxFQUFROEYsVUFBUixDQUFuQjtBQUNEO0FBQ0Y7QUFDRixPQVJELE1BUU8sSUFBSTVILGNBQWMsQ0FBQ21JLElBQUQsQ0FBbEIsRUFBMEI7QUFDL0I7QUFDQSxZQUFJQSxJQUFJLENBQUNwSixNQUFULEVBQWlCO0FBQ2ZvSixjQUFJLENBQUNwSixNQUFMLENBQVlnSixTQUFaLEdBQXdCLElBQXhCO0FBQ0Q7QUFDRixPQUxNLE1BS0EsSUFBSUksSUFBSixFQUFVO0FBQ2YsWUFBSWhHLFVBQVUsR0FBRzNNLGFBQWEsQ0FBQzJTLElBQUQsQ0FBOUI7O0FBRUEsWUFBSSxPQUFPaEcsVUFBUCxLQUFzQixVQUExQixFQUFzQztBQUNwQztBQUNBO0FBQ0EsY0FBSUEsVUFBVSxLQUFLZ0csSUFBSSxDQUFDL0YsT0FBeEIsRUFBaUM7QUFDL0IsZ0JBQUk5TSxRQUFRLEdBQUc2TSxVQUFVLENBQUM3SCxJQUFYLENBQWdCNk4sSUFBaEIsQ0FBZjtBQUNBLGdCQUFJOUYsSUFBSjs7QUFFQSxtQkFBTyxDQUFDLENBQUNBLElBQUksR0FBRy9NLFFBQVEsQ0FBQ2lOLElBQVQsRUFBUixFQUF5QkMsSUFBakMsRUFBdUM7QUFDckMsa0JBQUl4QyxjQUFjLENBQUNxQyxJQUFJLENBQUNuRCxLQUFOLENBQWxCLEVBQWdDO0FBQzlCNEksbUNBQW1CLENBQUN6RixJQUFJLENBQUNuRCxLQUFOLEVBQWEwSSxVQUFiLENBQW5CO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Q7Ozs7Ozs7O0FBUUEsYUFBU1EsaUJBQVQsQ0FBMkJoUSxPQUEzQixFQUFvQztBQUNsQztBQUNFLFlBQUlWLElBQUksR0FBR1UsT0FBTyxDQUFDVixJQUFuQjs7QUFFQSxZQUFJQSxJQUFJLEtBQUssSUFBVCxJQUFpQkEsSUFBSSxLQUFLb0YsU0FBMUIsSUFBdUMsT0FBT3BGLElBQVAsS0FBZ0IsUUFBM0QsRUFBcUU7QUFDbkU7QUFDRDs7QUFFRCxZQUFJeEIsSUFBSSxHQUFHdUIsZ0JBQWdCLENBQUNDLElBQUQsQ0FBM0I7QUFDQSxZQUFJNk4sU0FBSjs7QUFFQSxZQUFJLE9BQU83TixJQUFQLEtBQWdCLFVBQXBCLEVBQWdDO0FBQzlCNk4sbUJBQVMsR0FBRzdOLElBQUksQ0FBQzZOLFNBQWpCO0FBQ0QsU0FGRCxNQUVPLElBQUksT0FBTzdOLElBQVAsS0FBZ0IsUUFBaEIsS0FBNkJBLElBQUksQ0FBQ0csUUFBTCxLQUFrQmpELHNCQUFsQixJQUE0QztBQUNwRjtBQUNBOEMsWUFBSSxDQUFDRyxRQUFMLEtBQWtCOUMsZUFGUCxDQUFKLEVBRTZCO0FBQ2xDd1EsbUJBQVMsR0FBRzdOLElBQUksQ0FBQzZOLFNBQWpCO0FBQ0QsU0FKTSxNQUlBO0FBQ0w7QUFDRDs7QUFFRCxZQUFJQSxTQUFKLEVBQWU7QUFDYnBOLHVDQUE2QixDQUFDQyxPQUFELENBQTdCO0FBQ0FyRSx3QkFBYyxDQUFDd1IsU0FBRCxFQUFZbk4sT0FBTyxDQUFDNEQsS0FBcEIsRUFBMkIsTUFBM0IsRUFBbUM5RixJQUFuQyxFQUF5QytCLHNCQUFzQixDQUFDSyxnQkFBaEUsQ0FBZDtBQUNBSCx1Q0FBNkIsQ0FBQyxJQUFELENBQTdCO0FBQ0QsU0FKRCxNQUlPLElBQUlULElBQUksQ0FBQzJRLFNBQUwsS0FBbUJ2TCxTQUFuQixJQUFnQyxDQUFDdUssNkJBQXJDLEVBQW9FO0FBQ3pFQSx1Q0FBNkIsR0FBRyxJQUFoQztBQUVBelAsZUFBSyxDQUFDLHFHQUFELEVBQXdHMUIsSUFBSSxJQUFJLFNBQWhILENBQUw7QUFDRDs7QUFFRCxZQUFJLE9BQU93QixJQUFJLENBQUM0USxlQUFaLEtBQWdDLFVBQWhDLElBQThDLENBQUM1USxJQUFJLENBQUM0USxlQUFMLENBQXFCQyxvQkFBeEUsRUFBOEY7QUFDNUYzUSxlQUFLLENBQUMsK0RBQStELGtFQUFoRSxDQUFMO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Q7Ozs7OztBQU1BLGFBQVM0USxxQkFBVCxDQUErQkMsUUFBL0IsRUFBeUM7QUFDdkM7QUFDRXRRLHFDQUE2QixDQUFDc1EsUUFBRCxDQUE3QjtBQUNBLFlBQUk5RixJQUFJLEdBQUc5RyxNQUFNLENBQUM4RyxJQUFQLENBQVk4RixRQUFRLENBQUN6TSxLQUFyQixDQUFYOztBQUVBLGFBQUssSUFBSXdELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdtRCxJQUFJLENBQUN2SixNQUF6QixFQUFpQ29HLENBQUMsRUFBbEMsRUFBc0M7QUFDcEMsY0FBSS9CLEdBQUcsR0FBR2tGLElBQUksQ0FBQ25ELENBQUQsQ0FBZDs7QUFFQSxjQUFJL0IsR0FBRyxLQUFLLFVBQVIsSUFBc0JBLEdBQUcsS0FBSyxLQUFsQyxFQUF5QztBQUN2QzdGLGlCQUFLLENBQUMscURBQXFELDBEQUF0RCxFQUFrSDZGLEdBQWxILENBQUw7QUFFQTtBQUNEO0FBQ0Y7O0FBRUQsWUFBSWdMLFFBQVEsQ0FBQy9LLEdBQVQsS0FBaUIsSUFBckIsRUFBMkI7QUFDekI5RixlQUFLLENBQUMsdURBQUQsQ0FBTDtBQUNEOztBQUVETyxxQ0FBNkIsQ0FBQyxJQUFELENBQTdCO0FBQ0Q7QUFDRjs7QUFDRCxhQUFTdVEsMkJBQVQsQ0FBcUNoUixJQUFyQyxFQUEyQ3NFLEtBQTNDLEVBQWtEb0QsUUFBbEQsRUFBNEQ7QUFDMUQsVUFBSXVKLFNBQVMsR0FBR2hELGtCQUFrQixDQUFDak8sSUFBRCxDQUFsQyxDQUQwRCxDQUNoQjtBQUMxQzs7QUFFQSxVQUFJLENBQUNpUixTQUFMLEVBQWdCO0FBQ2QsWUFBSWhNLElBQUksR0FBRyxFQUFYOztBQUVBLFlBQUlqRixJQUFJLEtBQUtvRixTQUFULElBQXNCLE9BQU9wRixJQUFQLEtBQWdCLFFBQWhCLElBQTRCQSxJQUFJLEtBQUssSUFBckMsSUFBNkNtRSxNQUFNLENBQUM4RyxJQUFQLENBQVlqTCxJQUFaLEVBQWtCMEIsTUFBbEIsS0FBNkIsQ0FBcEcsRUFBdUc7QUFDckd1RCxjQUFJLElBQUksK0RBQStELHdFQUF2RTtBQUNEOztBQUVELFlBQUl0RyxVQUFVLEdBQUdtUixrQ0FBa0MsQ0FBQ3hMLEtBQUQsQ0FBbkQ7O0FBRUEsWUFBSTNGLFVBQUosRUFBZ0I7QUFDZHNHLGNBQUksSUFBSXRHLFVBQVI7QUFDRCxTQUZELE1BRU87QUFDTHNHLGNBQUksSUFBSTJLLDJCQUEyQixFQUFuQztBQUNEOztBQUVELFlBQUlzQixVQUFKOztBQUVBLFlBQUlsUixJQUFJLEtBQUssSUFBYixFQUFtQjtBQUNqQmtSLG9CQUFVLEdBQUcsTUFBYjtBQUNELFNBRkQsTUFFTyxJQUFJdFAsS0FBSyxDQUFDNEksT0FBTixDQUFjeEssSUFBZCxDQUFKLEVBQXlCO0FBQzlCa1Isb0JBQVUsR0FBRyxPQUFiO0FBQ0QsU0FGTSxNQUVBLElBQUlsUixJQUFJLEtBQUtvRixTQUFULElBQXNCcEYsSUFBSSxDQUFDRyxRQUFMLEtBQWtCekQsa0JBQTVDLEVBQWdFO0FBQ3JFd1Usb0JBQVUsR0FBRyxPQUFPblIsZ0JBQWdCLENBQUNDLElBQUksQ0FBQ0EsSUFBTixDQUFoQixJQUErQixTQUF0QyxJQUFtRCxLQUFoRTtBQUNBaUYsY0FBSSxHQUFHLG9FQUFQO0FBQ0QsU0FITSxNQUdBO0FBQ0xpTSxvQkFBVSxHQUFHLE9BQU9sUixJQUFwQjtBQUNEOztBQUVEO0FBQ0VFLGVBQUssQ0FBQyxvRUFBb0UsMERBQXBFLEdBQWlJLDRCQUFsSSxFQUFnS2dSLFVBQWhLLEVBQTRLak0sSUFBNUssQ0FBTDtBQUNEO0FBQ0Y7O0FBRUQsVUFBSXZFLE9BQU8sR0FBRytHLGFBQWEsQ0FBQzlFLEtBQWQsQ0FBb0IsSUFBcEIsRUFBMEJsQixTQUExQixDQUFkLENBckMwRCxDQXFDTjtBQUNwRDs7QUFFQSxVQUFJZixPQUFPLElBQUksSUFBZixFQUFxQjtBQUNuQixlQUFPQSxPQUFQO0FBQ0QsT0ExQ3lELENBMEN4RDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxVQUFJdVEsU0FBSixFQUFlO0FBQ2IsYUFBSyxJQUFJbkosQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3JHLFNBQVMsQ0FBQ0MsTUFBOUIsRUFBc0NvRyxDQUFDLEVBQXZDLEVBQTJDO0FBQ3pDMEksMkJBQWlCLENBQUMvTyxTQUFTLENBQUNxRyxDQUFELENBQVYsRUFBZTlILElBQWYsQ0FBakI7QUFDRDtBQUNGOztBQUVELFVBQUlBLElBQUksS0FBS3BELG1CQUFiLEVBQWtDO0FBQ2hDa1UsNkJBQXFCLENBQUNwUSxPQUFELENBQXJCO0FBQ0QsT0FGRCxNQUVPO0FBQ0xnUSx5QkFBaUIsQ0FBQ2hRLE9BQUQsQ0FBakI7QUFDRDs7QUFFRCxhQUFPQSxPQUFQO0FBQ0Q7O0FBQ0QsUUFBSXlRLG1DQUFtQyxHQUFHLEtBQTFDOztBQUNBLGFBQVNDLDJCQUFULENBQXFDcFIsSUFBckMsRUFBMkM7QUFDekMsVUFBSXFSLGdCQUFnQixHQUFHTCwyQkFBMkIsQ0FBQ00sSUFBNUIsQ0FBaUMsSUFBakMsRUFBdUN0UixJQUF2QyxDQUF2QjtBQUNBcVIsc0JBQWdCLENBQUNyUixJQUFqQixHQUF3QkEsSUFBeEI7QUFFQTtBQUNFLFlBQUksQ0FBQ21SLG1DQUFMLEVBQTBDO0FBQ3hDQSw2Q0FBbUMsR0FBRyxJQUF0QztBQUVBN1AsY0FBSSxDQUFDLGdFQUFnRSw2Q0FBaEUsR0FBZ0gsZ0RBQWpILENBQUo7QUFDRCxTQUxILENBS0k7OztBQUdGNkMsY0FBTSxDQUFDZSxjQUFQLENBQXNCbU0sZ0JBQXRCLEVBQXdDLE1BQXhDLEVBQWdEO0FBQzlDL0osb0JBQVUsRUFBRSxLQURrQztBQUU5Q25DLGFBQUcsRUFBRSxZQUFZO0FBQ2Y3RCxnQkFBSSxDQUFDLDJEQUEyRCxxQ0FBNUQsQ0FBSjtBQUVBNkMsa0JBQU0sQ0FBQ2UsY0FBUCxDQUFzQixJQUF0QixFQUE0QixNQUE1QixFQUFvQztBQUNsQ3NDLG1CQUFLLEVBQUV4SDtBQUQyQixhQUFwQztBQUdBLG1CQUFPQSxJQUFQO0FBQ0Q7QUFUNkMsU0FBaEQ7QUFXRDtBQUVELGFBQU9xUixnQkFBUDtBQUNEOztBQUNELGFBQVNFLDBCQUFULENBQW9DN1EsT0FBcEMsRUFBNkM0RCxLQUE3QyxFQUFvRG9ELFFBQXBELEVBQThEO0FBQzVELFVBQUlTLFVBQVUsR0FBR0UsWUFBWSxDQUFDMUYsS0FBYixDQUFtQixJQUFuQixFQUF5QmxCLFNBQXpCLENBQWpCOztBQUVBLFdBQUssSUFBSXFHLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdyRyxTQUFTLENBQUNDLE1BQTlCLEVBQXNDb0csQ0FBQyxFQUF2QyxFQUEyQztBQUN6QzBJLHlCQUFpQixDQUFDL08sU0FBUyxDQUFDcUcsQ0FBRCxDQUFWLEVBQWVLLFVBQVUsQ0FBQ25JLElBQTFCLENBQWpCO0FBQ0Q7O0FBRUQwUSx1QkFBaUIsQ0FBQ3ZJLFVBQUQsQ0FBakI7QUFDQSxhQUFPQSxVQUFQO0FBQ0Q7O0FBRUQ7QUFFRSxVQUFJO0FBQ0YsWUFBSXFKLFlBQVksR0FBR3JOLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsQ0FBbkI7QUFDQSxZQUFJcU4sT0FBTyxHQUFHLElBQUlDLEdBQUosQ0FBUSxDQUFDLENBQUNGLFlBQUQsRUFBZSxJQUFmLENBQUQsQ0FBUixDQUFkO0FBQ0EsWUFBSUcsT0FBTyxHQUFHLElBQUlDLEdBQUosQ0FBUSxDQUFDSixZQUFELENBQVIsQ0FBZCxDQUhFLENBR3FDO0FBQ3ZDO0FBQ0E7O0FBRUFDLGVBQU8sQ0FBQ3BFLEdBQVIsQ0FBWSxDQUFaLEVBQWUsQ0FBZjtBQUNBc0UsZUFBTyxDQUFDRSxHQUFSLENBQVksQ0FBWjtBQUNELE9BVEQsQ0FTRSxPQUFPQyxDQUFQLEVBQVUsQ0FDWDtBQUNGO0FBRUQsUUFBSUMsZUFBZSxHQUFJZiwyQkFBdkI7QUFDQSxRQUFJZ0IsY0FBYyxHQUFJVCwwQkFBdEI7QUFDQSxRQUFJVSxhQUFhLEdBQUliLDJCQUFyQjtBQUNBLFFBQUljLFFBQVEsR0FBRztBQUNiNVAsU0FBRyxFQUFFOEosV0FEUTtBQUViK0YsYUFBTyxFQUFFMUcsZUFGSTtBQUdiNUIsV0FBSyxFQUFFd0MsYUFITTtBQUliQyxhQUFPLEVBQUVBLE9BSkk7QUFLYjhGLFVBQUksRUFBRTdGO0FBTE8sS0FBZjtBQVFBOEYsV0FBTyxDQUFDSCxRQUFSLEdBQW1CQSxRQUFuQjtBQUNBRyxXQUFPLENBQUNoTyxTQUFSLEdBQW9CQSxTQUFwQjtBQUNBZ08sV0FBTyxDQUFDQyxRQUFSLEdBQW1CMVYsbUJBQW5CO0FBQ0F5VixXQUFPLENBQUNFLFFBQVIsR0FBbUJ6VixtQkFBbkI7QUFDQXVWLFdBQU8sQ0FBQzdNLGFBQVIsR0FBd0JBLGFBQXhCO0FBQ0E2TSxXQUFPLENBQUNHLFVBQVIsR0FBcUIzVixzQkFBckI7QUFDQXdWLFdBQU8sQ0FBQ0ksUUFBUixHQUFtQnRWLG1CQUFuQjtBQUNBa1YsV0FBTyxDQUFDSyxrREFBUixHQUE2RHZSLG9CQUE3RDtBQUNBa1IsV0FBTyxDQUFDaEssWUFBUixHQUF1QjJKLGNBQXZCO0FBQ0FLLFdBQU8sQ0FBQzdGLGFBQVIsR0FBd0JBLGFBQXhCO0FBQ0E2RixXQUFPLENBQUM1SyxhQUFSLEdBQXdCc0ssZUFBeEI7QUFDQU0sV0FBTyxDQUFDSixhQUFSLEdBQXdCQSxhQUF4QjtBQUNBSSxXQUFPLENBQUMxTSxTQUFSLEdBQW9CQSxTQUFwQjtBQUNBME0sV0FBTyxDQUFDckUsVUFBUixHQUFxQkEsVUFBckI7QUFDQXFFLFdBQU8sQ0FBQy9KLGNBQVIsR0FBeUJBLGNBQXpCO0FBQ0ErSixXQUFPLENBQUM1RSxJQUFSLEdBQWVBLElBQWY7QUFDQTRFLFdBQU8sQ0FBQ25FLElBQVIsR0FBZUEsSUFBZjtBQUNBbUUsV0FBTyxDQUFDL0MsV0FBUixHQUFzQkEsV0FBdEI7QUFDQStDLFdBQU8sQ0FBQy9ELFVBQVIsR0FBcUJBLFVBQXJCO0FBQ0ErRCxXQUFPLENBQUM1QyxhQUFSLEdBQXdCQSxhQUF4QjtBQUNBNEMsV0FBTyxDQUFDbkQsU0FBUixHQUFvQkEsU0FBcEI7QUFDQW1ELFdBQU8sQ0FBQzdDLG1CQUFSLEdBQThCQSxtQkFBOUI7QUFDQTZDLFdBQU8sQ0FBQ2hELGVBQVIsR0FBMEJBLGVBQTFCO0FBQ0FnRCxXQUFPLENBQUM5QyxPQUFSLEdBQWtCQSxPQUFsQjtBQUNBOEMsV0FBTyxDQUFDekQsVUFBUixHQUFxQkEsVUFBckI7QUFDQXlELFdBQU8sQ0FBQ3JELE1BQVIsR0FBaUJBLE1BQWpCO0FBQ0FxRCxXQUFPLENBQUMzRCxRQUFSLEdBQW1CQSxRQUFuQjtBQUNBMkQsV0FBTyxDQUFDTSxPQUFSLEdBQWtCclcsWUFBbEI7QUFDRyxHQXgyREQ7QUF5MkRELEM7Ozs7Ozs7Ozs7Ozs7QUN2M0RZOztBQUViLElBQUlKLEtBQUosRUFBMkMsRUFBM0MsTUFFTztBQUNMMFcsUUFBTSxDQUFDUCxPQUFQLEdBQWlCalcsbUJBQU8sQ0FBQyx3Q0FBRCxDQUF4QjtBQUNELEMiLCJmaWxlIjoibnBtLnJlYWN0LmQyZGU5NGRjY2E1YzgyOWM0MTE0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi4xMy4xXG4gKiByZWFjdC5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMnKTtcblxudmFyIFJlYWN0VmVyc2lvbiA9ICcxNi4xMy4xJztcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xudmFyIFJFQUNUX1BPUlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucG9ydGFsJykgOiAweGVhY2E7XG52YXIgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZyYWdtZW50JykgOiAweGVhY2I7XG52YXIgUkVBQ1RfU1RSSUNUX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN0cmljdF9tb2RlJykgOiAweGVhY2M7XG52YXIgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb2ZpbGVyJykgOiAweGVhZDI7XG52YXIgUkVBQ1RfUFJPVklERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb3ZpZGVyJykgOiAweGVhY2Q7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpIDogMHhlYWNlOyAvLyBUT0RPOiBXZSBkb24ndCB1c2UgQXN5bmNNb2RlIG9yIENvbmN1cnJlbnRNb2RlIGFueW1vcmUuIFRoZXkgd2VyZSB0ZW1wb3JhcnlcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKSA6IDB4ZWFkODtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xudmFyIFJFQUNUX0JMT0NLX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5ibG9jaycpIDogMHhlYWQ5O1xudmFyIFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mdW5kYW1lbnRhbCcpIDogMHhlYWQ1O1xudmFyIFJFQUNUX1JFU1BPTkRFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucmVzcG9uZGVyJykgOiAweGVhZDY7XG52YXIgUkVBQ1RfU0NPUEVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnNjb3BlJykgOiAweGVhZDc7XG52YXIgTUFZQkVfSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7XG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgaWYgKG1heWJlSXRlcmFibGUgPT09IG51bGwgfHwgdHlwZW9mIG1heWJlSXRlcmFibGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgbWF5YmVJdGVyYXRvciA9IE1BWUJFX0lURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW01BWUJFX0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF07XG5cbiAgaWYgKHR5cGVvZiBtYXliZUl0ZXJhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG1heWJlSXRlcmF0b3I7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBkaXNwYXRjaGVyLlxuICovXG52YXIgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciA9IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBjdXJyZW50OiBudWxsXG59O1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IGJhdGNoJ3MgY29uZmlndXJhdGlvbiBzdWNoIGFzIGhvdyBsb25nIGFuIHVwZGF0ZVxuICogc2hvdWxkIHN1c3BlbmQgZm9yIGlmIGl0IG5lZWRzIHRvLlxuICovXG52YXIgUmVhY3RDdXJyZW50QmF0Y2hDb25maWcgPSB7XG4gIHN1c3BlbnNlOiBudWxsXG59O1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICpcbiAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAqL1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICovXG4gIGN1cnJlbnQ6IG51bGxcbn07XG5cbnZhciBCRUZPUkVfU0xBU0hfUkUgPSAvXiguKilbXFxcXFxcL10vO1xuZnVuY3Rpb24gZGVzY3JpYmVDb21wb25lbnRGcmFtZSAobmFtZSwgc291cmNlLCBvd25lck5hbWUpIHtcbiAgdmFyIHNvdXJjZUluZm8gPSAnJztcblxuICBpZiAoc291cmNlKSB7XG4gICAgdmFyIHBhdGggPSBzb3VyY2UuZmlsZU5hbWU7XG4gICAgdmFyIGZpbGVOYW1lID0gcGF0aC5yZXBsYWNlKEJFRk9SRV9TTEFTSF9SRSwgJycpO1xuXG4gICAge1xuICAgICAgLy8gSW4gREVWLCBpbmNsdWRlIGNvZGUgZm9yIGEgY29tbW9uIHNwZWNpYWwgY2FzZTpcbiAgICAgIC8vIHByZWZlciBcImZvbGRlci9pbmRleC5qc1wiIGluc3RlYWQgb2YganVzdCBcImluZGV4LmpzXCIuXG4gICAgICBpZiAoL15pbmRleFxcLi8udGVzdChmaWxlTmFtZSkpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gcGF0aC5tYXRjaChCRUZPUkVfU0xBU0hfUkUpO1xuXG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgIHZhciBwYXRoQmVmb3JlU2xhc2ggPSBtYXRjaFsxXTtcblxuICAgICAgICAgIGlmIChwYXRoQmVmb3JlU2xhc2gpIHtcbiAgICAgICAgICAgIHZhciBmb2xkZXJOYW1lID0gcGF0aEJlZm9yZVNsYXNoLnJlcGxhY2UoQkVGT1JFX1NMQVNIX1JFLCAnJyk7XG4gICAgICAgICAgICBmaWxlTmFtZSA9IGZvbGRlck5hbWUgKyAnLycgKyBmaWxlTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzb3VyY2VJbmZvID0gJyAoYXQgJyArIGZpbGVOYW1lICsgJzonICsgc291cmNlLmxpbmVOdW1iZXIgKyAnKSc7XG4gIH0gZWxzZSBpZiAob3duZXJOYW1lKSB7XG4gICAgc291cmNlSW5mbyA9ICcgKGNyZWF0ZWQgYnkgJyArIG93bmVyTmFtZSArICcpJztcbiAgfVxuXG4gIHJldHVybiAnXFxuICAgIGluICcgKyAobmFtZSB8fCAnVW5rbm93bicpICsgc291cmNlSW5mbztcbn1cblxudmFyIFJlc29sdmVkID0gMTtcbmZ1bmN0aW9uIHJlZmluZVJlc29sdmVkTGF6eUNvbXBvbmVudChsYXp5Q29tcG9uZW50KSB7XG4gIHJldHVybiBsYXp5Q29tcG9uZW50Ll9zdGF0dXMgPT09IFJlc29sdmVkID8gbGF6eUNvbXBvbmVudC5fcmVzdWx0IDogbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0V3JhcHBlZE5hbWUob3V0ZXJUeXBlLCBpbm5lclR5cGUsIHdyYXBwZXJOYW1lKSB7XG4gIHZhciBmdW5jdGlvbk5hbWUgPSBpbm5lclR5cGUuZGlzcGxheU5hbWUgfHwgaW5uZXJUeXBlLm5hbWUgfHwgJyc7XG4gIHJldHVybiBvdXRlclR5cGUuZGlzcGxheU5hbWUgfHwgKGZ1bmN0aW9uTmFtZSAhPT0gJycgPyB3cmFwcGVyTmFtZSArIFwiKFwiICsgZnVuY3Rpb25OYW1lICsgXCIpXCIgOiB3cmFwcGVyTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUodHlwZSkge1xuICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgLy8gSG9zdCByb290LCB0ZXh0IG5vZGUgb3IganVzdCBpbnZhbGlkIHR5cGUuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB7XG4gICAgaWYgKHR5cGVvZiB0eXBlLnRhZyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGVycm9yKCdSZWNlaXZlZCBhbiB1bmV4cGVjdGVkIG9iamVjdCBpbiBnZXRDb21wb25lbnROYW1lKCkuICcgKyAnVGhpcyBpcyBsaWtlbHkgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCBudWxsO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgcmV0dXJuICdGcmFnbWVudCc7XG5cbiAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgcmV0dXJuICdQb3J0YWwnO1xuXG4gICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgcmV0dXJuIFwiUHJvZmlsZXJcIjtcblxuICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgIHJldHVybiAnU3RyaWN0TW9kZSc7XG5cbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N1c3BlbnNlJztcblxuICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFOlxuICAgICAgcmV0dXJuICdTdXNwZW5zZUxpc3QnO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHN3aXRjaCAodHlwZS4kJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgIHJldHVybiAnQ29udGV4dC5Db25zdW1lcic7XG5cbiAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgcmV0dXJuICdDb250ZXh0LlByb3ZpZGVyJztcblxuICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICByZXR1cm4gZ2V0V3JhcHBlZE5hbWUodHlwZSwgdHlwZS5yZW5kZXIsICdGb3J3YXJkUmVmJyk7XG5cbiAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZSh0eXBlLnR5cGUpO1xuXG4gICAgICBjYXNlIFJFQUNUX0JMT0NLX1RZUEU6XG4gICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lKHR5cGUucmVuZGVyKTtcblxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgdGhlbmFibGUgPSB0eXBlO1xuICAgICAgICAgIHZhciByZXNvbHZlZFRoZW5hYmxlID0gcmVmaW5lUmVzb2x2ZWRMYXp5Q29tcG9uZW50KHRoZW5hYmxlKTtcblxuICAgICAgICAgIGlmIChyZXNvbHZlZFRoZW5hYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZShyZXNvbHZlZFRoZW5hYmxlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IHt9O1xudmFyIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gbnVsbDtcbmZ1bmN0aW9uIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpIHtcbiAge1xuICAgIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gZWxlbWVudDtcbiAgfVxufVxuXG57XG4gIC8vIFN0YWNrIGltcGxlbWVudGF0aW9uIGluamVjdGVkIGJ5IHRoZSBjdXJyZW50IHJlbmRlcmVyLlxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldEN1cnJlbnRTdGFjayA9IG51bGw7XG5cbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdGFjayA9ICcnOyAvLyBBZGQgYW4gZXh0cmEgdG9wIGZyYW1lIHdoaWxlIGFuIGVsZW1lbnQgaXMgYmVpbmcgdmFsaWRhdGVkXG5cbiAgICBpZiAoY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQpIHtcbiAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudC50eXBlKTtcbiAgICAgIHZhciBvd25lciA9IGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50Ll9vd25lcjtcbiAgICAgIHN0YWNrICs9IGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQuX3NvdXJjZSwgb3duZXIgJiYgZ2V0Q29tcG9uZW50TmFtZShvd25lci50eXBlKSk7XG4gICAgfSAvLyBEZWxlZ2F0ZSB0byB0aGUgaW5qZWN0ZWQgcmVuZGVyZXItc3BlY2lmaWMgaW1wbGVtZW50YXRpb25cblxuXG4gICAgdmFyIGltcGwgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldEN1cnJlbnRTdGFjaztcblxuICAgIGlmIChpbXBsKSB7XG4gICAgICBzdGFjayArPSBpbXBsKCkgfHwgJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YWNrO1xuICB9O1xufVxuXG4vKipcbiAqIFVzZWQgYnkgYWN0KCkgdG8gdHJhY2sgd2hldGhlciB5b3UncmUgaW5zaWRlIGFuIGFjdCgpIHNjb3BlLlxuICovXG52YXIgSXNTb21lUmVuZGVyZXJBY3RpbmcgPSB7XG4gIGN1cnJlbnQ6IGZhbHNlXG59O1xuXG52YXIgUmVhY3RTaGFyZWRJbnRlcm5hbHMgPSB7XG4gIFJlYWN0Q3VycmVudERpc3BhdGNoZXI6IFJlYWN0Q3VycmVudERpc3BhdGNoZXIsXG4gIFJlYWN0Q3VycmVudEJhdGNoQ29uZmlnOiBSZWFjdEN1cnJlbnRCYXRjaENvbmZpZyxcbiAgUmVhY3RDdXJyZW50T3duZXI6IFJlYWN0Q3VycmVudE93bmVyLFxuICBJc1NvbWVSZW5kZXJlckFjdGluZzogSXNTb21lUmVuZGVyZXJBY3RpbmcsXG4gIC8vIFVzZWQgYnkgcmVuZGVyZXJzIHRvIGF2b2lkIGJ1bmRsaW5nIG9iamVjdC1hc3NpZ24gdHdpY2UgaW4gVU1EIGJ1bmRsZXM6XG4gIGFzc2lnbjogX2Fzc2lnblxufTtcblxue1xuICBfYXNzaWduKFJlYWN0U2hhcmVkSW50ZXJuYWxzLCB7XG4gICAgLy8gVGhlc2Ugc2hvdWxkIG5vdCBiZSBpbmNsdWRlZCBpbiBwcm9kdWN0aW9uLlxuICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWU6IFJlYWN0RGVidWdDdXJyZW50RnJhbWUsXG4gICAgLy8gU2hpbSBmb3IgUmVhY3QgRE9NIDE2LjAuMCB3aGljaCBzdGlsbCBkZXN0cnVjdHVyZWQgKGJ1dCBub3QgdXNlZCkgdGhpcy5cbiAgICAvLyBUT0RPOiByZW1vdmUgaW4gUmVhY3QgMTcuMC5cbiAgICBSZWFjdENvbXBvbmVudFRyZWVIb29rOiB7fVxuICB9KTtcbn1cblxuLy8gYnkgY2FsbHMgdG8gdGhlc2UgbWV0aG9kcyBieSBhIEJhYmVsIHBsdWdpbi5cbi8vXG4vLyBJbiBQUk9EIChvciBpbiBwYWNrYWdlcyB3aXRob3V0IGFjY2VzcyB0byBSZWFjdCBpbnRlcm5hbHMpLFxuLy8gdGhleSBhcmUgbGVmdCBhcyB0aGV5IGFyZSBpbnN0ZWFkLlxuXG5mdW5jdGlvbiB3YXJuKGZvcm1hdCkge1xuICB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcHJpbnRXYXJuaW5nKCd3YXJuJywgZm9ybWF0LCBhcmdzKTtcbiAgfVxufVxuZnVuY3Rpb24gZXJyb3IoZm9ybWF0KSB7XG4gIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICBwcmludFdhcm5pbmcoJ2Vycm9yJywgZm9ybWF0LCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmludFdhcm5pbmcobGV2ZWwsIGZvcm1hdCwgYXJncykge1xuICAvLyBXaGVuIGNoYW5naW5nIHRoaXMgbG9naWMsIHlvdSBtaWdodCB3YW50IHRvIGFsc29cbiAgLy8gdXBkYXRlIGNvbnNvbGVXaXRoU3RhY2tEZXYud3d3LmpzIGFzIHdlbGwuXG4gIHtcbiAgICB2YXIgaGFzRXhpc3RpbmdTdGFjayA9IGFyZ3MubGVuZ3RoID4gMCAmJiB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdID09PSAnc3RyaW5nJyAmJiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0uaW5kZXhPZignXFxuICAgIGluJykgPT09IDA7XG5cbiAgICBpZiAoIWhhc0V4aXN0aW5nU3RhY2spIHtcbiAgICAgIHZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbiAgICAgIHZhciBzdGFjayA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuXG4gICAgICBpZiAoc3RhY2sgIT09ICcnKSB7XG4gICAgICAgIGZvcm1hdCArPSAnJXMnO1xuICAgICAgICBhcmdzID0gYXJncy5jb25jYXQoW3N0YWNrXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFyZ3NXaXRoRm9ybWF0ID0gYXJncy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiAnJyArIGl0ZW07XG4gICAgfSk7IC8vIENhcmVmdWw6IFJOIGN1cnJlbnRseSBkZXBlbmRzIG9uIHRoaXMgcHJlZml4XG5cbiAgICBhcmdzV2l0aEZvcm1hdC51bnNoaWZ0KCdXYXJuaW5nOiAnICsgZm9ybWF0KTsgLy8gV2UgaW50ZW50aW9uYWxseSBkb24ndCB1c2Ugc3ByZWFkIChvciAuYXBwbHkpIGRpcmVjdGx5IGJlY2F1c2UgaXRcbiAgICAvLyBicmVha3MgSUU5OiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzEzNjEwXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZ1xuXG4gICAgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZVtsZXZlbF0sIGNvbnNvbGUsIGFyZ3NXaXRoRm9ybWF0KTtcblxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cbn1cblxudmFyIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudCA9IHt9O1xuXG5mdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICB7XG4gICAgdmFyIF9jb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gX2NvbnN0cnVjdG9yICYmIChfY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgX2NvbnN0cnVjdG9yLm5hbWUpIHx8ICdSZWFjdENsYXNzJztcbiAgICB2YXIgd2FybmluZ0tleSA9IGNvbXBvbmVudE5hbWUgKyBcIi5cIiArIGNhbGxlck5hbWU7XG5cbiAgICBpZiAoZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50W3dhcm5pbmdLZXldKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXJyb3IoXCJDYW4ndCBjYWxsICVzIG9uIGEgY29tcG9uZW50IHRoYXQgaXMgbm90IHlldCBtb3VudGVkLiBcIiArICdUaGlzIGlzIGEgbm8tb3AsIGJ1dCBpdCBtaWdodCBpbmRpY2F0ZSBhIGJ1ZyBpbiB5b3VyIGFwcGxpY2F0aW9uLiAnICsgJ0luc3RlYWQsIGFzc2lnbiB0byBgdGhpcy5zdGF0ZWAgZGlyZWN0bHkgb3IgZGVmaW5lIGEgYHN0YXRlID0ge307YCAnICsgJ2NsYXNzIHByb3BlcnR5IHdpdGggdGhlIGRlc2lyZWQgc3RhdGUgaW4gdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjb21wb25lbnROYW1lKTtcblxuICAgIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSA9IHRydWU7XG4gIH1cbn1cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cblxuXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSB7XG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHdlIHdhbnQgdG8gdGVzdC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICAgKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAgICpcbiAgICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICAgKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAgICpcbiAgICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICAgKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBjb21wb25lbnQgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSBjYWxsZXJOYW1lIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gY2FsbGVyTmFtZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3JlcGxhY2VTdGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gVGhpcyBvbmx5IGV4aXN0cyBiZWNhdXNlIF9wZW5kaW5nU3RhdGUgaXNcbiAgICogaW50ZXJuYWwuIFRoaXMgcHJvdmlkZXMgYSBtZXJnaW5nIHN0cmF0ZWd5IHRoYXQgaXMgbm90IGF2YWlsYWJsZSB0byBkZWVwXG4gICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgKiBkdXJpbmcgdGhlIG1lcmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggc3RhdGUuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gTmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgcGFydGlhbFN0YXRlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbntcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG4vKipcbiAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICovXG5cblxuZnVuY3Rpb24gQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDsgLy8gSWYgYSBjb21wb25lbnQgaGFzIHN0cmluZyByZWZzLCB3ZSB3aWxsIGFzc2lnbiBhIGRpZmZlcmVudCBvYmplY3QgbGF0ZXIuXG5cbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7IC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuLyoqXG4gKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIHRvIG11dGF0ZVxuICogc3RhdGUuIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBjYWxscyB0byBgc2V0U3RhdGVgIHdpbGwgcnVuIHN5bmNocm9ub3VzbHksXG4gKiBhcyB0aGV5IG1heSBldmVudHVhbGx5IGJlIGJhdGNoZWQgdG9nZXRoZXIuICBZb3UgY2FuIHByb3ZpZGUgYW4gb3B0aW9uYWxcbiAqIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBjYWxsIHRvIHNldFN0YXRlIGlzIGFjdHVhbGx5XG4gKiBjb21wbGV0ZWQuXG4gKlxuICogV2hlbiBhIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIHRvIHNldFN0YXRlLCBpdCB3aWxsIGJlIGNhbGxlZCBhdCBzb21lIHBvaW50IGluXG4gKiB0aGUgZnV0dXJlIChub3Qgc3luY2hyb25vdXNseSkuIEl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIHVwIHRvIGRhdGVcbiAqIGNvbXBvbmVudCBhcmd1bWVudHMgKHN0YXRlLCBwcm9wcywgY29udGV4dCkuIFRoZXNlIHZhbHVlcyBjYW4gYmUgZGlmZmVyZW50XG4gKiBmcm9tIHRoaXMuKiBiZWNhdXNlIHlvdXIgZnVuY3Rpb24gbWF5IGJlIGNhbGxlZCBhZnRlciByZWNlaXZlUHJvcHMgYnV0IGJlZm9yZVxuICogc2hvdWxkQ29tcG9uZW50VXBkYXRlLCBhbmQgdGhpcyBuZXcgc3RhdGUsIHByb3BzLCBhbmQgY29udGV4dCB3aWxsIG5vdCB5ZXQgYmVcbiAqIGFzc2lnbmVkIHRvIHRoaXMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgb3IgZnVuY3Rpb24gdG9cbiAqICAgICAgICBwcm9kdWNlIG5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBjdXJyZW50IHN0YXRlLlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblxuQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrKSB7XG4gIGlmICghKHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdmdW5jdGlvbicgfHwgcGFydGlhbFN0YXRlID09IG51bGwpKSB7XG4gICAge1xuICAgICAgdGhyb3cgRXJyb3IoIFwic2V0U3RhdGUoLi4uKTogdGFrZXMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcyB0byB1cGRhdGUgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuXCIgKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xufTtcbi8qKlxuICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gKlxuICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gKlxuICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAqXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHVwZGF0ZSBpcyBjb21wbGV0ZS5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5cblxuQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMsIGNhbGxiYWNrLCAnZm9yY2VVcGRhdGUnKTtcbn07XG4vKipcbiAqIERlcHJlY2F0ZWQgQVBJcy4gVGhlc2UgQVBJcyB1c2VkIHRvIGV4aXN0IG9uIGNsYXNzaWMgUmVhY3QgY2xhc3NlcyBidXQgc2luY2VcbiAqIHdlIHdvdWxkIGxpa2UgdG8gZGVwcmVjYXRlIHRoZW0sIHdlJ3JlIG5vdCBnb2luZyB0byBtb3ZlIHRoZW0gb3ZlciB0byB0aGlzXG4gKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAqL1xuXG5cbntcbiAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgIGlzTW91bnRlZDogWydpc01vdW50ZWQnLCAnSW5zdGVhZCwgbWFrZSBzdXJlIHRvIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMgYW5kIHBlbmRpbmcgcmVxdWVzdHMgaW4gJyArICdjb21wb25lbnRXaWxsVW5tb3VudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy4nXSxcbiAgICByZXBsYWNlU3RhdGU6IFsncmVwbGFjZVN0YXRlJywgJ1JlZmFjdG9yIHlvdXIgY29kZSB0byB1c2Ugc2V0U3RhdGUgaW5zdGVhZCAoc2VlICcgKyAnaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMjM2KS4nXVxuICB9O1xuXG4gIHZhciBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgaW5mbykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2FybignJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXMnLCBpbmZvWzBdLCBpbmZvWzFdKTtcblxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGZvciAodmFyIGZuTmFtZSBpbiBkZXByZWNhdGVkQVBJcykge1xuICAgIGlmIChkZXByZWNhdGVkQVBJcy5oYXNPd25Qcm9wZXJ0eShmbk5hbWUpKSB7XG4gICAgICBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcoZm5OYW1lLCBkZXByZWNhdGVkQVBJc1tmbk5hbWVdKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gQ29tcG9uZW50RHVtbXkoKSB7fVxuXG5Db21wb25lbnREdW1teS5wcm90b3R5cGUgPSBDb21wb25lbnQucHJvdG90eXBlO1xuLyoqXG4gKiBDb252ZW5pZW5jZSBjb21wb25lbnQgd2l0aCBkZWZhdWx0IHNoYWxsb3cgZXF1YWxpdHkgY2hlY2sgZm9yIHNDVS5cbiAqL1xuXG5mdW5jdGlvbiBQdXJlQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDsgLy8gSWYgYSBjb21wb25lbnQgaGFzIHN0cmluZyByZWZzLCB3ZSB3aWxsIGFzc2lnbiBhIGRpZmZlcmVudCBvYmplY3QgbGF0ZXIuXG5cbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbnZhciBwdXJlQ29tcG9uZW50UHJvdG90eXBlID0gUHVyZUNvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50RHVtbXkoKTtcbnB1cmVDb21wb25lbnRQcm90b3R5cGUuY29uc3RydWN0b3IgPSBQdXJlQ29tcG9uZW50OyAvLyBBdm9pZCBhbiBleHRyYSBwcm90b3R5cGUganVtcCBmb3IgdGhlc2UgbWV0aG9kcy5cblxuX2Fzc2lnbihwdXJlQ29tcG9uZW50UHJvdG90eXBlLCBDb21wb25lbnQucHJvdG90eXBlKTtcblxucHVyZUNvbXBvbmVudFByb3RvdHlwZS5pc1B1cmVSZWFjdENvbXBvbmVudCA9IHRydWU7XG5cbi8vIGFuIGltbXV0YWJsZSBvYmplY3Qgd2l0aCBhIHNpbmdsZSBtdXRhYmxlIHZhbHVlXG5mdW5jdGlvbiBjcmVhdGVSZWYoKSB7XG4gIHZhciByZWZPYmplY3QgPSB7XG4gICAgY3VycmVudDogbnVsbFxuICB9O1xuXG4gIHtcbiAgICBPYmplY3Quc2VhbChyZWZPYmplY3QpO1xuICB9XG5cbiAgcmV0dXJuIHJlZk9iamVjdDtcbn1cblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG52YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24sIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duLCBkaWRXYXJuQWJvdXRTdHJpbmdSZWZzO1xuXG57XG4gIGRpZFdhcm5BYm91dFN0cmluZ1JlZnMgPSB7fTtcbn1cblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdyZWYnKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuXG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbmZpZy5yZWYgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaGFzVmFsaWRLZXkoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuXG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAge1xuICAgICAgaWYgKCFzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bikge1xuICAgICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG5cbiAgICAgICAgZXJyb3IoJyVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAge1xuICAgICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG5cbiAgICAgICAgZXJyb3IoJyVzOiBgcmVmYCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd2FybkFib3V0QWNjZXNzaW5nUmVmLmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nUmVmLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gd2FybklmU3RyaW5nUmVmQ2Fubm90QmVBdXRvQ29udmVydGVkKGNvbmZpZykge1xuICB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcucmVmID09PSAnc3RyaW5nJyAmJiBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ICYmIGNvbmZpZy5fX3NlbGYgJiYgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5zdGF0ZU5vZGUgIT09IGNvbmZpZy5fX3NlbGYpIHtcbiAgICAgIHZhciBjb21wb25lbnROYW1lID0gZ2V0Q29tcG9uZW50TmFtZShSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnR5cGUpO1xuXG4gICAgICBpZiAoIWRpZFdhcm5BYm91dFN0cmluZ1JlZnNbY29tcG9uZW50TmFtZV0pIHtcbiAgICAgICAgZXJyb3IoJ0NvbXBvbmVudCBcIiVzXCIgY29udGFpbnMgdGhlIHN0cmluZyByZWYgXCIlc1wiLiAnICsgJ1N1cHBvcnQgZm9yIHN0cmluZyByZWZzIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSBtYWpvciByZWxlYXNlLiAnICsgJ1RoaXMgY2FzZSBjYW5ub3QgYmUgYXV0b21hdGljYWxseSBjb252ZXJ0ZWQgdG8gYW4gYXJyb3cgZnVuY3Rpb24uICcgKyAnV2UgYXNrIHlvdSB0byBtYW51YWxseSBmaXggdGhpcyBjYXNlIGJ5IHVzaW5nIHVzZVJlZigpIG9yIGNyZWF0ZVJlZigpIGluc3RlYWQuICcgKyAnTGVhcm4gbW9yZSBhYm91dCB1c2luZyByZWZzIHNhZmVseSBoZXJlOiAnICsgJ2h0dHBzOi8vZmIubWUvcmVhY3Qtc3RyaWN0LW1vZGUtc3RyaW5nLXJlZicsIGdldENvbXBvbmVudE5hbWUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKSwgY29uZmlnLnJlZik7XG5cbiAgICAgICAgZGlkV2FybkFib3V0U3RyaW5nUmVmc1tjb21wb25lbnROYW1lXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCBub3Qgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBwcm9wc1xuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAaW50ZXJuYWxcbiAqL1xuXG5cbnZhciBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKSB7XG4gIHZhciBlbGVtZW50ID0ge1xuICAgIC8vIFRoaXMgdGFnIGFsbG93cyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuICAgIC8vIFJlY29yZCB0aGUgY29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGlzIGVsZW1lbnQuXG4gICAgX293bmVyOiBvd25lclxuICB9O1xuXG4gIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTsgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQuX3N0b3JlLCAndmFsaWRhdGVkJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9KTsgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2VsZicsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBzZWxmXG4gICAgfSk7IC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zb3VyY2UnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogc291cmNlXG4gICAgfSk7XG5cbiAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50LnByb3BzKTtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2NyZWF0ZWVsZW1lbnRcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lOyAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG5cbiAgdmFyIHByb3BzID0ge307XG4gIHZhciBrZXkgPSBudWxsO1xuICB2YXIgcmVmID0gbnVsbDtcbiAgdmFyIHNlbGYgPSBudWxsO1xuICB2YXIgc291cmNlID0gbnVsbDtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgcmVmID0gY29uZmlnLnJlZjtcblxuICAgICAge1xuICAgICAgICB3YXJuSWZTdHJpbmdSZWZDYW5ub3RCZUF1dG9Db252ZXJ0ZWQoY29uZmlnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIHNlbGYgPSBjb25maWcuX19zZWxmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc2VsZjtcbiAgICBzb3VyY2UgPSBjb25maWcuX19zb3VyY2UgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zb3VyY2U7IC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcblxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9IC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG5cblxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcblxuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgICBPYmplY3QuZnJlZXplKGNoaWxkQXJyYXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfSAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcblxuXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuXG4gICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHtcbiAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbn1cbmZ1bmN0aW9uIGNsb25lQW5kUmVwbGFjZUtleShvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQob2xkRWxlbWVudC50eXBlLCBuZXdLZXksIG9sZEVsZW1lbnQucmVmLCBvbGRFbGVtZW50Ll9zZWxmLCBvbGRFbGVtZW50Ll9zb3VyY2UsIG9sZEVsZW1lbnQuX293bmVyLCBvbGRFbGVtZW50LnByb3BzKTtcbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59XG4vKipcbiAqIENsb25lIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IHVzaW5nIGVsZW1lbnQgYXMgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjbG9uZWVsZW1lbnRcbiAqL1xuXG5mdW5jdGlvbiBjbG9uZUVsZW1lbnQoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICBpZiAoISEoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQpKSB7XG4gICAge1xuICAgICAgdGhyb3cgRXJyb3IoIFwiUmVhY3QuY2xvbmVFbGVtZW50KC4uLik6IFRoZSBhcmd1bWVudCBtdXN0IGJlIGEgUmVhY3QgZWxlbWVudCwgYnV0IHlvdSBwYXNzZWQgXCIgKyBlbGVtZW50ICsgXCIuXCIgKTtcbiAgICB9XG4gIH1cblxuICB2YXIgcHJvcE5hbWU7IC8vIE9yaWdpbmFsIHByb3BzIGFyZSBjb3BpZWRcblxuICB2YXIgcHJvcHMgPSBfYXNzaWduKHt9LCBlbGVtZW50LnByb3BzKTsgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuXG5cbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7IC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG5cbiAgdmFyIHNlbGYgPSBlbGVtZW50Ll9zZWxmOyAvLyBTb3VyY2UgaXMgcHJlc2VydmVkIHNpbmNlIGNsb25lRWxlbWVudCBpcyB1bmxpa2VseSB0byBiZSB0YXJnZXRlZCBieSBhXG4gIC8vIHRyYW5zcGlsZXIsIGFuZCB0aGUgb3JpZ2luYWwgc291cmNlIGlzIHByb2JhYmx5IGEgYmV0dGVyIGluZGljYXRvciBvZiB0aGVcbiAgLy8gdHJ1ZSBvd25lci5cblxuICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlOyAvLyBPd25lciB3aWxsIGJlIHByZXNlcnZlZCwgdW5sZXNzIHJlZiBpcyBvdmVycmlkZGVuXG5cbiAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIC8vIFNpbGVudGx5IHN0ZWFsIHRoZSByZWYgZnJvbSB0aGUgcGFyZW50LlxuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB9XG5cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH0gLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgb3ZlcnJpZGUgZXhpc3RpbmcgcHJvcHNcblxuXG4gICAgdmFyIGRlZmF1bHRQcm9wcztcblxuICAgIGlmIChlbGVtZW50LnR5cGUgJiYgZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgZGVmYXVsdFByb3BzID0gZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcztcbiAgICB9XG5cbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBpZiAoY29uZmlnW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkICYmIGRlZmF1bHRQcm9wcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG5cblxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcblxuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG5cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KGVsZW1lbnQudHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKTtcbn1cbi8qKlxuICogVmVyaWZpZXMgdGhlIG9iamVjdCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjaXN2YWxpZGVsZW1lbnRcbiAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgUmVhY3RFbGVtZW50LlxuICogQGZpbmFsXG4gKi9cblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5cbnZhciBTRVBBUkFUT1IgPSAnLic7XG52YXIgU1VCU0VQQVJBVE9SID0gJzonO1xuLyoqXG4gKiBFc2NhcGUgYW5kIHdyYXAga2V5IHNvIGl0IGlzIHNhZmUgdG8gdXNlIGFzIGEgcmVhY3RpZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gYmUgZXNjYXBlZC5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGVzY2FwZWQga2V5LlxuICovXG5cbmZ1bmN0aW9uIGVzY2FwZShrZXkpIHtcbiAgdmFyIGVzY2FwZVJlZ2V4ID0gL1s9Ol0vZztcbiAgdmFyIGVzY2FwZXJMb29rdXAgPSB7XG4gICAgJz0nOiAnPTAnLFxuICAgICc6JzogJz0yJ1xuICB9O1xuICB2YXIgZXNjYXBlZFN0cmluZyA9ICgnJyArIGtleSkucmVwbGFjZShlc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVzY2FwZXJMb29rdXBbbWF0Y2hdO1xuICB9KTtcbiAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG59XG4vKipcbiAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICogcGF0dGVybi5cbiAqL1xuXG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvXFwvKy9nO1xuXG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG52YXIgUE9PTF9TSVpFID0gMTA7XG52YXIgdHJhdmVyc2VDb250ZXh0UG9vbCA9IFtdO1xuXG5mdW5jdGlvbiBnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQobWFwUmVzdWx0LCBrZXlQcmVmaXgsIG1hcEZ1bmN0aW9uLCBtYXBDb250ZXh0KSB7XG4gIGlmICh0cmF2ZXJzZUNvbnRleHRQb29sLmxlbmd0aCkge1xuICAgIHZhciB0cmF2ZXJzZUNvbnRleHQgPSB0cmF2ZXJzZUNvbnRleHRQb29sLnBvcCgpO1xuICAgIHRyYXZlcnNlQ29udGV4dC5yZXN1bHQgPSBtYXBSZXN1bHQ7XG4gICAgdHJhdmVyc2VDb250ZXh0LmtleVByZWZpeCA9IGtleVByZWZpeDtcbiAgICB0cmF2ZXJzZUNvbnRleHQuZnVuYyA9IG1hcEZ1bmN0aW9uO1xuICAgIHRyYXZlcnNlQ29udGV4dC5jb250ZXh0ID0gbWFwQ29udGV4dDtcbiAgICB0cmF2ZXJzZUNvbnRleHQuY291bnQgPSAwO1xuICAgIHJldHVybiB0cmF2ZXJzZUNvbnRleHQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3VsdDogbWFwUmVzdWx0LFxuICAgICAga2V5UHJlZml4OiBrZXlQcmVmaXgsXG4gICAgICBmdW5jOiBtYXBGdW5jdGlvbixcbiAgICAgIGNvbnRleHQ6IG1hcENvbnRleHQsXG4gICAgICBjb3VudDogMFxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpIHtcbiAgdHJhdmVyc2VDb250ZXh0LnJlc3VsdCA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5rZXlQcmVmaXggPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQuZnVuYyA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5jb250ZXh0ID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmNvdW50ID0gMDtcblxuICBpZiAodHJhdmVyc2VDb250ZXh0UG9vbC5sZW5ndGggPCBQT09MX1NJWkUpIHtcbiAgICB0cmF2ZXJzZUNvbnRleHRQb29sLnB1c2godHJhdmVyc2VDb250ZXh0KTtcbiAgfVxufVxuLyoqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZVNvRmFyIE5hbWUgb2YgdGhlIGtleSBwYXRoIHNvIGZhci5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBlYWNoIGNoaWxkIGZvdW5kLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IFVzZWQgdG8gcGFzcyBpbmZvcm1hdGlvbiB0aHJvdWdob3V0IHRoZSB0cmF2ZXJzYWxcbiAqIHByb2Nlc3MuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCBuYW1lU29GYXIsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgY2hpbGRyZW47XG5cbiAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgIC8vIEFsbCBvZiB0aGUgYWJvdmUgYXJlIHBlcmNlaXZlZCBhcyBudWxsLlxuICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgfVxuXG4gIHZhciBpbnZva2VDYWxsYmFjayA9IGZhbHNlO1xuXG4gIGlmIChjaGlsZHJlbiA9PT0gbnVsbCkge1xuICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBzd2l0Y2ggKGNoaWxkcmVuLiQkdHlwZW9mKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgaWYgKGludm9rZUNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sodHJhdmVyc2VDb250ZXh0LCBjaGlsZHJlbiwgLy8gSWYgaXQncyB0aGUgb25seSBjaGlsZCwgdHJlYXQgdGhlIG5hbWUgYXMgaWYgaXQgd2FzIHdyYXBwZWQgaW4gYW4gYXJyYXlcbiAgICAvLyBzbyB0aGF0IGl0J3MgY29uc2lzdGVudCBpZiB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGdyb3dzLlxuICAgIG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGRyZW4sIDApIDogbmFtZVNvRmFyKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHZhciBjaGlsZDtcbiAgdmFyIG5leHROYW1lO1xuICB2YXIgc3VidHJlZUNvdW50ID0gMDsgLy8gQ291bnQgb2YgY2hpbGRyZW4gZm91bmQgaW4gdGhlIGN1cnJlbnQgc3VidHJlZS5cblxuICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpKTtcbiAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pO1xuXG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG5cbiAgICAgIHtcbiAgICAgICAgLy8gV2FybiBhYm91dCB1c2luZyBNYXBzIGFzIGNoaWxkcmVuXG4gICAgICAgIGlmIChpdGVyYXRvckZuID09PSBjaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgICAgaWYgKCFkaWRXYXJuQWJvdXRNYXBzKSB7XG4gICAgICAgICAgICB3YXJuKCdVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAnICsgJ2EgZnV0dXJlIG1ham9yIHJlbGVhc2UuIENvbnNpZGVyIGNvbnZlcnRpbmcgY2hpbGRyZW4gdG8gJyArICdhbiBhcnJheSBvZiBrZXllZCBSZWFjdEVsZW1lbnRzIGluc3RlYWQuJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKGNoaWxkcmVuKTtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgdmFyIGlpID0gMDtcblxuICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICBjaGlsZCA9IHN0ZXAudmFsdWU7XG4gICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgYWRkZW5kdW0gPSAnJztcblxuICAgICAge1xuICAgICAgICBhZGRlbmR1bSA9ICcgSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQuJyArIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2hpbGRyZW5TdHJpbmcgPSAnJyArIGNoaWxkcmVuO1xuXG4gICAgICB7XG4gICAgICAgIHtcbiAgICAgICAgICB0aHJvdyBFcnJvciggXCJPYmplY3RzIGFyZSBub3QgdmFsaWQgYXMgYSBSZWFjdCBjaGlsZCAoZm91bmQ6IFwiICsgKGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZykgKyBcIikuXCIgKyBhZGRlbmR1bSApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN1YnRyZWVDb3VudDtcbn1cbi8qKlxuICogVHJhdmVyc2VzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCwgYnV0XG4gKiBtaWdodCBhbHNvIGJlIHNwZWNpZmllZCB0aHJvdWdoIGF0dHJpYnV0ZXM6XG4gKlxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmNoaWxkcmVuLCAuLi4pYFxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmxlZnRQYW5lbENoaWxkcmVuLCAuLi4pYFxuICpcbiAqIFRoZSBgdHJhdmVyc2VDb250ZXh0YCBpcyBhbiBvcHRpb25hbCBhcmd1bWVudCB0aGF0IGlzIHBhc3NlZCB0aHJvdWdoIHRoZVxuICogZW50aXJlIHRyYXZlcnNhbC4gSXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgYWNjdW11bGF0aW9ucyBvciBhbnl0aGluZyBlbHNlIHRoYXRcbiAqIHRoZSBjYWxsYmFjayBtaWdodCBmaW5kIHJlbGV2YW50LlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgb2JqZWN0LlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIFRvIGludm9rZSB1cG9uIHRyYXZlcnNpbmcgZWFjaCBjaGlsZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBDb250ZXh0IGZvciB0cmF2ZXJzYWwuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuLyoqXG4gKiBHZW5lcmF0ZSBhIGtleSBzdHJpbmcgdGhhdCBpZGVudGlmaWVzIGEgY29tcG9uZW50IHdpdGhpbiBhIHNldC5cbiAqXG4gKiBAcGFyYW0geyp9IGNvbXBvbmVudCBBIGNvbXBvbmVudCB0aGF0IGNvdWxkIGNvbnRhaW4gYSBtYW51YWwga2V5LlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IHRoYXQgaXMgdXNlZCBpZiBhIG1hbnVhbCBrZXkgaXMgbm90IHByb3ZpZGVkLlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50S2V5KGNvbXBvbmVudCwgaW5kZXgpIHtcbiAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnb2JqZWN0JyAmJiBjb21wb25lbnQgIT09IG51bGwgJiYgY29tcG9uZW50LmtleSAhPSBudWxsKSB7XG4gICAgLy8gRXhwbGljaXQga2V5XG4gICAgcmV0dXJuIGVzY2FwZShjb21wb25lbnQua2V5KTtcbiAgfSAvLyBJbXBsaWNpdCBrZXkgZGV0ZXJtaW5lZCBieSB0aGUgaW5kZXggaW4gdGhlIHNldFxuXG5cbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcbiAgZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbn1cbi8qKlxuICogSXRlcmF0ZXMgdGhyb3VnaCBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVuZm9yZWFjaFxuICpcbiAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmb3JFYWNoRnVuY1xuICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGZvckVhY2hDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IGdldFBvb2xlZFRyYXZlcnNlQ29udGV4dChudWxsLCBudWxsLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIHJlbGVhc2VUcmF2ZXJzZUNvbnRleHQodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dChib29rS2VlcGluZywgY2hpbGQsIGNoaWxkS2V5KSB7XG4gIHZhciByZXN1bHQgPSBib29rS2VlcGluZy5yZXN1bHQsXG4gICAgICBrZXlQcmVmaXggPSBib29rS2VlcGluZy5rZXlQcmVmaXgsXG4gICAgICBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuICB2YXIgbWFwcGVkQ2hpbGQgPSBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KG1hcHBlZENoaWxkKSkge1xuICAgIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwobWFwcGVkQ2hpbGQsIHJlc3VsdCwgY2hpbGRLZXksIGZ1bmN0aW9uIChjKSB7XG4gICAgICByZXR1cm4gYztcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgaWYgKGlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBjbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsIC8vIEtlZXAgYm90aCB0aGUgKG1hcHBlZCkgYW5kIG9sZCBrZXlzIGlmIHRoZXkgZGlmZmVyLCBqdXN0IGFzXG4gICAgICAvLyB0cmF2ZXJzZUFsbENoaWxkcmVuIHVzZWQgdG8gZG8gZm9yIG9iamVjdHMgYXMgY2hpbGRyZW5cbiAgICAgIGtleVByZWZpeCArIChtYXBwZWRDaGlsZC5rZXkgJiYgKCFjaGlsZCB8fCBjaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkgPyBlc2NhcGVVc2VyUHJvdmlkZWRLZXkobWFwcGVkQ2hpbGQua2V5KSArICcvJyA6ICcnKSArIGNoaWxkS2V5KTtcbiAgICB9XG5cbiAgICByZXN1bHQucHVzaChtYXBwZWRDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgYXJyYXksIHByZWZpeCwgZnVuYywgY29udGV4dCkge1xuICB2YXIgZXNjYXBlZFByZWZpeCA9ICcnO1xuXG4gIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgIGVzY2FwZWRQcmVmaXggPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkocHJlZml4KSArICcvJztcbiAgfVxuXG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQoYXJyYXksIGVzY2FwZWRQcmVmaXgsIGZ1bmMsIGNvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0LCB0cmF2ZXJzZUNvbnRleHQpO1xuICByZWxlYXNlVHJhdmVyc2VDb250ZXh0KHRyYXZlcnNlQ29udGV4dCk7XG59XG4vKipcbiAqIE1hcHMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbm1hcFxuICpcbiAqIFRoZSBwcm92aWRlZCBtYXBGdW5jdGlvbihjaGlsZCwga2V5LCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZ1bmMgVGhlIG1hcCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBDb250ZXh0IGZvciBtYXBGdW5jdGlvbi5cbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKi9cblxuXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuYywgY29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBmdW5jLCBjb250ZXh0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQ291bnQgdGhlIG51bWJlciBvZiBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzXG4gKiBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbmNvdW50XG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4uXG4gKi9cblxuXG5mdW5jdGlvbiBjb3VudENoaWxkcmVuKGNoaWxkcmVuKSB7XG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sIG51bGwpO1xufVxuLyoqXG4gKiBGbGF0dGVuIGEgY2hpbGRyZW4gb2JqZWN0ICh0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmApIGFuZFxuICogcmV0dXJuIGFuIGFycmF5IHdpdGggYXBwcm9wcmlhdGVseSByZS1rZXllZCBjaGlsZHJlbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW50b2FycmF5XG4gKi9cblxuXG5mdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICByZXR1cm4gY2hpbGQ7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbm9ubHlcbiAqXG4gKiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzXG4gKiBwYXNzZWQgd2l0aG91dCBhIHdyYXBwZXIsIGJ1dCB0aGUgcHVycG9zZSBvZiB0aGlzIGhlbHBlciBmdW5jdGlvbiBpcyB0b1xuICogYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmUgb2YgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBjaGlsZHJlbiBDaGlsZCBjb2xsZWN0aW9uIHN0cnVjdHVyZS5cbiAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdEVsZW1lbnRgIGNvbnRhaW5lZCBpbiB0aGVcbiAqIHN0cnVjdHVyZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICBpZiAoIWlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgIHtcbiAgICAgIHRocm93IEVycm9yKCBcIlJlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLlwiICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0KGRlZmF1bHRWYWx1ZSwgY2FsY3VsYXRlQ2hhbmdlZEJpdHMpIHtcbiAgaWYgKGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSB1bmRlZmluZWQpIHtcbiAgICBjYWxjdWxhdGVDaGFuZ2VkQml0cyA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAge1xuICAgICAgaWYgKGNhbGN1bGF0ZUNoYW5nZWRCaXRzICE9PSBudWxsICYmIHR5cGVvZiBjYWxjdWxhdGVDaGFuZ2VkQml0cyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlcnJvcignY3JlYXRlQ29udGV4dDogRXhwZWN0ZWQgdGhlIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCB0byBiZSBhICcgKyAnZnVuY3Rpb24uIEluc3RlYWQgcmVjZWl2ZWQ6ICVzJywgY2FsY3VsYXRlQ2hhbmdlZEJpdHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBjb250ZXh0ID0ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9DT05URVhUX1RZUEUsXG4gICAgX2NhbGN1bGF0ZUNoYW5nZWRCaXRzOiBjYWxjdWxhdGVDaGFuZ2VkQml0cyxcbiAgICAvLyBBcyBhIHdvcmthcm91bmQgdG8gc3VwcG9ydCBtdWx0aXBsZSBjb25jdXJyZW50IHJlbmRlcmVycywgd2UgY2F0ZWdvcml6ZVxuICAgIC8vIHNvbWUgcmVuZGVyZXJzIGFzIHByaW1hcnkgYW5kIG90aGVycyBhcyBzZWNvbmRhcnkuIFdlIG9ubHkgZXhwZWN0XG4gICAgLy8gdGhlcmUgdG8gYmUgdHdvIGNvbmN1cnJlbnQgcmVuZGVyZXJzIGF0IG1vc3Q6IFJlYWN0IE5hdGl2ZSAocHJpbWFyeSkgYW5kXG4gICAgLy8gRmFicmljIChzZWNvbmRhcnkpOyBSZWFjdCBET00gKHByaW1hcnkpIGFuZCBSZWFjdCBBUlQgKHNlY29uZGFyeSkuXG4gICAgLy8gU2Vjb25kYXJ5IHJlbmRlcmVycyBzdG9yZSB0aGVpciBjb250ZXh0IHZhbHVlcyBvbiBzZXBhcmF0ZSBmaWVsZHMuXG4gICAgX2N1cnJlbnRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuICAgIF9jdXJyZW50VmFsdWUyOiBkZWZhdWx0VmFsdWUsXG4gICAgLy8gVXNlZCB0byB0cmFjayBob3cgbWFueSBjb25jdXJyZW50IHJlbmRlcmVycyB0aGlzIGNvbnRleHQgY3VycmVudGx5XG4gICAgLy8gc3VwcG9ydHMgd2l0aGluIGluIGEgc2luZ2xlIHJlbmRlcmVyLiBTdWNoIGFzIHBhcmFsbGVsIHNlcnZlciByZW5kZXJpbmcuXG4gICAgX3RocmVhZENvdW50OiAwLFxuICAgIC8vIFRoZXNlIGFyZSBjaXJjdWxhclxuICAgIFByb3ZpZGVyOiBudWxsLFxuICAgIENvbnN1bWVyOiBudWxsXG4gIH07XG4gIGNvbnRleHQuUHJvdmlkZXIgPSB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX1BST1ZJREVSX1RZUEUsXG4gICAgX2NvbnRleHQ6IGNvbnRleHRcbiAgfTtcbiAgdmFyIGhhc1dhcm5lZEFib3V0VXNpbmdOZXN0ZWRDb250ZXh0Q29uc3VtZXJzID0gZmFsc2U7XG4gIHZhciBoYXNXYXJuZWRBYm91dFVzaW5nQ29uc3VtZXJQcm92aWRlciA9IGZhbHNlO1xuXG4gIHtcbiAgICAvLyBBIHNlcGFyYXRlIG9iamVjdCwgYnV0IHByb3hpZXMgYmFjayB0byB0aGUgb3JpZ2luYWwgY29udGV4dCBvYmplY3QgZm9yXG4gICAgLy8gYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuIEl0IGhhcyBhIGRpZmZlcmVudCAkJHR5cGVvZiwgc28gd2UgY2FuIHByb3Blcmx5XG4gICAgLy8gd2FybiBmb3IgdGhlIGluY29ycmVjdCB1c2FnZSBvZiBDb250ZXh0IGFzIGEgQ29uc3VtZXIuXG4gICAgdmFyIENvbnN1bWVyID0ge1xuICAgICAgJCR0eXBlb2Y6IFJFQUNUX0NPTlRFWFRfVFlQRSxcbiAgICAgIF9jb250ZXh0OiBjb250ZXh0LFxuICAgICAgX2NhbGN1bGF0ZUNoYW5nZWRCaXRzOiBjb250ZXh0Ll9jYWxjdWxhdGVDaGFuZ2VkQml0c1xuICAgIH07IC8vICRGbG93Rml4TWU6IEZsb3cgY29tcGxhaW5zIGFib3V0IG5vdCBzZXR0aW5nIGEgdmFsdWUsIHdoaWNoIGlzIGludGVudGlvbmFsIGhlcmVcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKENvbnN1bWVyLCB7XG4gICAgICBQcm92aWRlcjoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoIWhhc1dhcm5lZEFib3V0VXNpbmdDb25zdW1lclByb3ZpZGVyKSB7XG4gICAgICAgICAgICBoYXNXYXJuZWRBYm91dFVzaW5nQ29uc3VtZXJQcm92aWRlciA9IHRydWU7XG5cbiAgICAgICAgICAgIGVycm9yKCdSZW5kZXJpbmcgPENvbnRleHQuQ29uc3VtZXIuUHJvdmlkZXI+IGlzIG5vdCBzdXBwb3J0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAnICsgJ2EgZnV0dXJlIG1ham9yIHJlbGVhc2UuIERpZCB5b3UgbWVhbiB0byByZW5kZXIgPENvbnRleHQuUHJvdmlkZXI+IGluc3RlYWQ/Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuUHJvdmlkZXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKF9Qcm92aWRlcikge1xuICAgICAgICAgIGNvbnRleHQuUHJvdmlkZXIgPSBfUHJvdmlkZXI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBfY3VycmVudFZhbHVlOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0Ll9jdXJyZW50VmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKF9jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICBjb250ZXh0Ll9jdXJyZW50VmFsdWUgPSBfY3VycmVudFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgX2N1cnJlbnRWYWx1ZTI6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuX2N1cnJlbnRWYWx1ZTI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKF9jdXJyZW50VmFsdWUyKSB7XG4gICAgICAgICAgY29udGV4dC5fY3VycmVudFZhbHVlMiA9IF9jdXJyZW50VmFsdWUyO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgX3RocmVhZENvdW50OiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0Ll90aHJlYWRDb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoX3RocmVhZENvdW50KSB7XG4gICAgICAgICAgY29udGV4dC5fdGhyZWFkQ291bnQgPSBfdGhyZWFkQ291bnQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBDb25zdW1lcjoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoIWhhc1dhcm5lZEFib3V0VXNpbmdOZXN0ZWRDb250ZXh0Q29uc3VtZXJzKSB7XG4gICAgICAgICAgICBoYXNXYXJuZWRBYm91dFVzaW5nTmVzdGVkQ29udGV4dENvbnN1bWVycyA9IHRydWU7XG5cbiAgICAgICAgICAgIGVycm9yKCdSZW5kZXJpbmcgPENvbnRleHQuQ29uc3VtZXIuQ29uc3VtZXI+IGlzIG5vdCBzdXBwb3J0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAnICsgJ2EgZnV0dXJlIG1ham9yIHJlbGVhc2UuIERpZCB5b3UgbWVhbiB0byByZW5kZXIgPENvbnRleHQuQ29uc3VtZXI+IGluc3RlYWQ/Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuQ29uc3VtZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTsgLy8gJEZsb3dGaXhNZTogRmxvdyBjb21wbGFpbnMgYWJvdXQgbWlzc2luZyBwcm9wZXJ0aWVzIGJlY2F1c2UgaXQgZG9lc24ndCB1bmRlcnN0YW5kIGRlZmluZVByb3BlcnR5XG5cbiAgICBjb250ZXh0LkNvbnN1bWVyID0gQ29uc3VtZXI7XG4gIH1cblxuICB7XG4gICAgY29udGV4dC5fY3VycmVudFJlbmRlcmVyID0gbnVsbDtcbiAgICBjb250ZXh0Ll9jdXJyZW50UmVuZGVyZXIyID0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBjb250ZXh0O1xufVxuXG5mdW5jdGlvbiBsYXp5KGN0b3IpIHtcbiAgdmFyIGxhenlUeXBlID0ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9MQVpZX1RZUEUsXG4gICAgX2N0b3I6IGN0b3IsXG4gICAgLy8gUmVhY3QgdXNlcyB0aGVzZSBmaWVsZHMgdG8gc3RvcmUgdGhlIHJlc3VsdC5cbiAgICBfc3RhdHVzOiAtMSxcbiAgICBfcmVzdWx0OiBudWxsXG4gIH07XG5cbiAge1xuICAgIC8vIEluIHByb2R1Y3Rpb24sIHRoaXMgd291bGQganVzdCBzZXQgaXQgb24gdGhlIG9iamVjdC5cbiAgICB2YXIgZGVmYXVsdFByb3BzO1xuICAgIHZhciBwcm9wVHlwZXM7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobGF6eVR5cGUsIHtcbiAgICAgIGRlZmF1bHRQcm9wczoge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBkZWZhdWx0UHJvcHM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0RlZmF1bHRQcm9wcykge1xuICAgICAgICAgIGVycm9yKCdSZWFjdC5sYXp5KC4uLik6IEl0IGlzIG5vdCBzdXBwb3J0ZWQgdG8gYXNzaWduIGBkZWZhdWx0UHJvcHNgIHRvICcgKyAnYSBsYXp5IGNvbXBvbmVudCBpbXBvcnQuIEVpdGhlciBzcGVjaWZ5IHRoZW0gd2hlcmUgdGhlIGNvbXBvbmVudCAnICsgJ2lzIGRlZmluZWQsIG9yIGNyZWF0ZSBhIHdyYXBwaW5nIGNvbXBvbmVudCBhcm91bmQgaXQuJyk7XG5cbiAgICAgICAgICBkZWZhdWx0UHJvcHMgPSBuZXdEZWZhdWx0UHJvcHM7IC8vIE1hdGNoIHByb2R1Y3Rpb24gYmVoYXZpb3IgbW9yZSBjbG9zZWx5OlxuXG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGxhenlUeXBlLCAnZGVmYXVsdFByb3BzJywge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BUeXBlcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3UHJvcFR5cGVzKSB7XG4gICAgICAgICAgZXJyb3IoJ1JlYWN0LmxhenkoLi4uKTogSXQgaXMgbm90IHN1cHBvcnRlZCB0byBhc3NpZ24gYHByb3BUeXBlc2AgdG8gJyArICdhIGxhenkgY29tcG9uZW50IGltcG9ydC4gRWl0aGVyIHNwZWNpZnkgdGhlbSB3aGVyZSB0aGUgY29tcG9uZW50ICcgKyAnaXMgZGVmaW5lZCwgb3IgY3JlYXRlIGEgd3JhcHBpbmcgY29tcG9uZW50IGFyb3VuZCBpdC4nKTtcblxuICAgICAgICAgIHByb3BUeXBlcyA9IG5ld1Byb3BUeXBlczsgLy8gTWF0Y2ggcHJvZHVjdGlvbiBiZWhhdmlvciBtb3JlIGNsb3NlbHk6XG5cbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobGF6eVR5cGUsICdwcm9wVHlwZXMnLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBsYXp5VHlwZTtcbn1cblxuZnVuY3Rpb24gZm9yd2FyZFJlZihyZW5kZXIpIHtcbiAge1xuICAgIGlmIChyZW5kZXIgIT0gbnVsbCAmJiByZW5kZXIuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSkge1xuICAgICAgZXJyb3IoJ2ZvcndhcmRSZWYgcmVxdWlyZXMgYSByZW5kZXIgZnVuY3Rpb24gYnV0IHJlY2VpdmVkIGEgYG1lbW9gICcgKyAnY29tcG9uZW50LiBJbnN0ZWFkIG9mIGZvcndhcmRSZWYobWVtbyguLi4pKSwgdXNlICcgKyAnbWVtbyhmb3J3YXJkUmVmKC4uLikpLicpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbmRlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXJyb3IoJ2ZvcndhcmRSZWYgcmVxdWlyZXMgYSByZW5kZXIgZnVuY3Rpb24gYnV0IHdhcyBnaXZlbiAlcy4nLCByZW5kZXIgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgcmVuZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlbmRlci5sZW5ndGggIT09IDAgJiYgcmVuZGVyLmxlbmd0aCAhPT0gMikge1xuICAgICAgICBlcnJvcignZm9yd2FyZFJlZiByZW5kZXIgZnVuY3Rpb25zIGFjY2VwdCBleGFjdGx5IHR3byBwYXJhbWV0ZXJzOiBwcm9wcyBhbmQgcmVmLiAlcycsIHJlbmRlci5sZW5ndGggPT09IDEgPyAnRGlkIHlvdSBmb3JnZXQgdG8gdXNlIHRoZSByZWYgcGFyYW1ldGVyPycgOiAnQW55IGFkZGl0aW9uYWwgcGFyYW1ldGVyIHdpbGwgYmUgdW5kZWZpbmVkLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW5kZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHJlbmRlci5kZWZhdWx0UHJvcHMgIT0gbnVsbCB8fCByZW5kZXIucHJvcFR5cGVzICE9IG51bGwpIHtcbiAgICAgICAgZXJyb3IoJ2ZvcndhcmRSZWYgcmVuZGVyIGZ1bmN0aW9ucyBkbyBub3Qgc3VwcG9ydCBwcm9wVHlwZXMgb3IgZGVmYXVsdFByb3BzLiAnICsgJ0RpZCB5b3UgYWNjaWRlbnRhbGx5IHBhc3MgYSBSZWFjdCBjb21wb25lbnQ/Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAkJHR5cGVvZjogUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSxcbiAgICByZW5kZXI6IHJlbmRlclxuICB9O1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9SRVNQT05ERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9TQ09QRV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0JMT0NLX1RZUEUpO1xufVxuXG5mdW5jdGlvbiBtZW1vKHR5cGUsIGNvbXBhcmUpIHtcbiAge1xuICAgIGlmICghaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpKSB7XG4gICAgICBlcnJvcignbWVtbzogVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBjb21wb25lbnQuIEluc3RlYWQgJyArICdyZWNlaXZlZDogJXMnLCB0eXBlID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX01FTU9fVFlQRSxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGNvbXBhcmU6IGNvbXBhcmUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb21wYXJlXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVEaXNwYXRjaGVyKCkge1xuICB2YXIgZGlzcGF0Y2hlciA9IFJlYWN0Q3VycmVudERpc3BhdGNoZXIuY3VycmVudDtcblxuICBpZiAoIShkaXNwYXRjaGVyICE9PSBudWxsKSkge1xuICAgIHtcbiAgICAgIHRocm93IEVycm9yKCBcIkludmFsaWQgaG9vayBjYWxsLiBIb29rcyBjYW4gb25seSBiZSBjYWxsZWQgaW5zaWRlIG9mIHRoZSBib2R5IG9mIGEgZnVuY3Rpb24gY29tcG9uZW50LiBUaGlzIGNvdWxkIGhhcHBlbiBmb3Igb25lIG9mIHRoZSBmb2xsb3dpbmcgcmVhc29uczpcXG4xLiBZb3UgbWlnaHQgaGF2ZSBtaXNtYXRjaGluZyB2ZXJzaW9ucyBvZiBSZWFjdCBhbmQgdGhlIHJlbmRlcmVyIChzdWNoIGFzIFJlYWN0IERPTSlcXG4yLiBZb3UgbWlnaHQgYmUgYnJlYWtpbmcgdGhlIFJ1bGVzIG9mIEhvb2tzXFxuMy4gWW91IG1pZ2h0IGhhdmUgbW9yZSB0aGFuIG9uZSBjb3B5IG9mIFJlYWN0IGluIHRoZSBzYW1lIGFwcFxcblNlZSBodHRwczovL2ZiLm1lL3JlYWN0LWludmFsaWQtaG9vay1jYWxsIGZvciB0aXBzIGFib3V0IGhvdyB0byBkZWJ1ZyBhbmQgZml4IHRoaXMgcHJvYmxlbS5cIiApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkaXNwYXRjaGVyO1xufVxuXG5mdW5jdGlvbiB1c2VDb250ZXh0KENvbnRleHQsIHVuc3RhYmxlX29ic2VydmVkQml0cykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG5cbiAge1xuICAgIGlmICh1bnN0YWJsZV9vYnNlcnZlZEJpdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IoJ3VzZUNvbnRleHQoKSBzZWNvbmQgYXJndW1lbnQgaXMgcmVzZXJ2ZWQgZm9yIGZ1dHVyZSAnICsgJ3VzZSBpbiBSZWFjdC4gUGFzc2luZyBpdCBpcyBub3Qgc3VwcG9ydGVkLiAnICsgJ1lvdSBwYXNzZWQ6ICVzLiVzJywgdW5zdGFibGVfb2JzZXJ2ZWRCaXRzLCB0eXBlb2YgdW5zdGFibGVfb2JzZXJ2ZWRCaXRzID09PSAnbnVtYmVyJyAmJiBBcnJheS5pc0FycmF5KGFyZ3VtZW50c1syXSkgPyAnXFxuXFxuRGlkIHlvdSBjYWxsIGFycmF5Lm1hcCh1c2VDb250ZXh0KT8gJyArICdDYWxsaW5nIEhvb2tzIGluc2lkZSBhIGxvb3AgaXMgbm90IHN1cHBvcnRlZC4gJyArICdMZWFybiBtb3JlIGF0IGh0dHBzOi8vZmIubWUvcnVsZXMtb2YtaG9va3MnIDogJycpO1xuICAgIH0gLy8gVE9ETzogYWRkIGEgbW9yZSBnZW5lcmljIHdhcm5pbmcgZm9yIGludmFsaWQgdmFsdWVzLlxuXG5cbiAgICBpZiAoQ29udGV4dC5fY29udGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgcmVhbENvbnRleHQgPSBDb250ZXh0Ll9jb250ZXh0OyAvLyBEb24ndCBkZWR1cGxpY2F0ZSBiZWNhdXNlIHRoaXMgbGVnaXRpbWF0ZWx5IGNhdXNlcyBidWdzXG4gICAgICAvLyBhbmQgbm9ib2R5IHNob3VsZCBiZSB1c2luZyB0aGlzIGluIGV4aXN0aW5nIGNvZGUuXG5cbiAgICAgIGlmIChyZWFsQ29udGV4dC5Db25zdW1lciA9PT0gQ29udGV4dCkge1xuICAgICAgICBlcnJvcignQ2FsbGluZyB1c2VDb250ZXh0KENvbnRleHQuQ29uc3VtZXIpIGlzIG5vdCBzdXBwb3J0ZWQsIG1heSBjYXVzZSBidWdzLCBhbmQgd2lsbCBiZSAnICsgJ3JlbW92ZWQgaW4gYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gRGlkIHlvdSBtZWFuIHRvIGNhbGwgdXNlQ29udGV4dChDb250ZXh0KSBpbnN0ZWFkPycpO1xuICAgICAgfSBlbHNlIGlmIChyZWFsQ29udGV4dC5Qcm92aWRlciA9PT0gQ29udGV4dCkge1xuICAgICAgICBlcnJvcignQ2FsbGluZyB1c2VDb250ZXh0KENvbnRleHQuUHJvdmlkZXIpIGlzIG5vdCBzdXBwb3J0ZWQuICcgKyAnRGlkIHlvdSBtZWFuIHRvIGNhbGwgdXNlQ29udGV4dChDb250ZXh0KSBpbnN0ZWFkPycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUNvbnRleHQoQ29udGV4dCwgdW5zdGFibGVfb2JzZXJ2ZWRCaXRzKTtcbn1cbmZ1bmN0aW9uIHVzZVN0YXRlKGluaXRpYWxTdGF0ZSkge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZVN0YXRlKGluaXRpYWxTdGF0ZSk7XG59XG5mdW5jdGlvbiB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxBcmcsIGluaXQpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxBcmcsIGluaXQpO1xufVxuZnVuY3Rpb24gdXNlUmVmKGluaXRpYWxWYWx1ZSkge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZVJlZihpbml0aWFsVmFsdWUpO1xufVxuZnVuY3Rpb24gdXNlRWZmZWN0KGNyZWF0ZSwgZGVwcykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUVmZmVjdChjcmVhdGUsIGRlcHMpO1xufVxuZnVuY3Rpb24gdXNlTGF5b3V0RWZmZWN0KGNyZWF0ZSwgZGVwcykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUxheW91dEVmZmVjdChjcmVhdGUsIGRlcHMpO1xufVxuZnVuY3Rpb24gdXNlQ2FsbGJhY2soY2FsbGJhY2ssIGRlcHMpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VDYWxsYmFjayhjYWxsYmFjaywgZGVwcyk7XG59XG5mdW5jdGlvbiB1c2VNZW1vKGNyZWF0ZSwgZGVwcykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZU1lbW8oY3JlYXRlLCBkZXBzKTtcbn1cbmZ1bmN0aW9uIHVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCBjcmVhdGUsIGRlcHMpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgY3JlYXRlLCBkZXBzKTtcbn1cbmZ1bmN0aW9uIHVzZURlYnVnVmFsdWUodmFsdWUsIGZvcm1hdHRlckZuKSB7XG4gIHtcbiAgICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gICAgcmV0dXJuIGRpc3BhdGNoZXIudXNlRGVidWdWYWx1ZSh2YWx1ZSwgZm9ybWF0dGVyRm4pO1xuICB9XG59XG5cbnZhciBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93bjtcblxue1xuICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSB7XG4gIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQudHlwZSk7XG5cbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuICdcXG5cXG5DaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oc291cmNlKSB7XG4gIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBmaWxlTmFtZSA9IHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgdmFyIGxpbmVOdW1iZXIgPSBzb3VyY2UubGluZU51bWJlcjtcbiAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHlvdXIgY29kZSBhdCAnICsgZmlsZU5hbWUgKyAnOicgKyBsaW5lTnVtYmVyICsgJy4nO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bUZvclByb3BzKGVsZW1lbnRQcm9wcykge1xuICBpZiAoZWxlbWVudFByb3BzICE9PSBudWxsICYmIGVsZW1lbnRQcm9wcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtKGVsZW1lbnRQcm9wcy5fX3NvdXJjZSk7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG4vKipcbiAqIFdhcm4gaWYgdGhlcmUncyBubyBrZXkgZXhwbGljaXRseSBzZXQgb24gZHluYW1pYyBhcnJheXMgb2YgY2hpbGRyZW4gb3JcbiAqIG9iamVjdCBrZXlzIGFyZSBub3QgdmFsaWQuIFRoaXMgYWxsb3dzIHVzIHRvIGtlZXAgdHJhY2sgb2YgY2hpbGRyZW4gYmV0d2VlblxuICogdXBkYXRlcy5cbiAqL1xuXG5cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgaWYgKCFpbmZvKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG5cbiAgICBpZiAocGFyZW50TmFtZSkge1xuICAgICAgaW5mbyA9IFwiXFxuXFxuQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8XCIgKyBwYXJlbnROYW1lICsgXCI+LlwiO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbmZvO1xufVxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gKiB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICBpZiAoIWVsZW1lbnQuX3N0b3JlIHx8IGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCB8fCBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgdmFyIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8gPSBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpO1xuXG4gIGlmIChvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10gPSB0cnVlOyAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cblxuICB2YXIgY2hpbGRPd25lciA9ICcnO1xuXG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuX293bmVyICYmIGVsZW1lbnQuX293bmVyICE9PSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgY2hpbGRPd25lciA9IFwiIEl0IHdhcyBwYXNzZWQgYSBjaGlsZCBmcm9tIFwiICsgZ2V0Q29tcG9uZW50TmFtZShlbGVtZW50Ll9vd25lci50eXBlKSArIFwiLlwiO1xuICB9XG5cbiAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG5cbiAge1xuICAgIGVycm9yKCdFYWNoIGNoaWxkIGluIGEgbGlzdCBzaG91bGQgaGF2ZSBhIHVuaXF1ZSBcImtleVwiIHByb3AuJyArICclcyVzIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nLCBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvLCBjaGlsZE93bmVyKTtcbiAgfVxuXG4gIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xufVxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcblxuICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KGNoaWxkLCBwYXJlbnRUeXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcblxuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gRW50cnkgaXRlcmF0b3JzIHVzZWQgdG8gcHJvdmlkZSBpbXBsaWNpdCBrZXlzLFxuICAgICAgLy8gYnV0IG5vdyB3ZSBwcmludCBhIHNlcGFyYXRlIHdhcm5pbmcgZm9yIHRoZW0gbGF0ZXIuXG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG5cbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIGlmIChpc1ZhbGlkRWxlbWVudChzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShzdGVwLnZhbHVlLCBwYXJlbnRUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gIHtcbiAgICB2YXIgdHlwZSA9IGVsZW1lbnQudHlwZTtcblxuICAgIGlmICh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUodHlwZSk7XG4gICAgdmFyIHByb3BUeXBlcztcblxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcHJvcFR5cGVzID0gdHlwZS5wcm9wVHlwZXM7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgLy8gTm90ZTogTWVtbyBvbmx5IGNoZWNrcyBvdXRlciBwcm9wcyBoZXJlLlxuICAgIC8vIElubmVyIHByb3BzIGFyZSBjaGVja2VkIGluIHRoZSByZWNvbmNpbGVyLlxuICAgIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSkpIHtcbiAgICAgIHByb3BUeXBlcyA9IHR5cGUucHJvcFR5cGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHByb3BUeXBlcykge1xuICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG4gICAgICBjaGVja1Byb3BUeXBlcyhwcm9wVHlwZXMsIGVsZW1lbnQucHJvcHMsICdwcm9wJywgbmFtZSwgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKTtcbiAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xuICAgIH0gZWxzZSBpZiAodHlwZS5Qcm9wVHlwZXMgIT09IHVuZGVmaW5lZCAmJiAhcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24pIHtcbiAgICAgIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duID0gdHJ1ZTtcblxuICAgICAgZXJyb3IoJ0NvbXBvbmVudCAlcyBkZWNsYXJlZCBgUHJvcFR5cGVzYCBpbnN0ZWFkIG9mIGBwcm9wVHlwZXNgLiBEaWQgeW91IG1pc3NwZWxsIHRoZSBwcm9wZXJ0eSBhc3NpZ25tZW50PycsIG5hbWUgfHwgJ1Vua25vd24nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHR5cGUuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nICYmICF0eXBlLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCkge1xuICAgICAgZXJyb3IoJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKTtcbiAgICB9XG4gIH1cbn1cbi8qKlxuICogR2l2ZW4gYSBmcmFnbWVudCwgdmFsaWRhdGUgdGhhdCBpdCBjYW4gb25seSBiZSBwcm92aWRlZCB3aXRoIGZyYWdtZW50IHByb3BzXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZnJhZ21lbnRcbiAqL1xuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlRnJhZ21lbnRQcm9wcyhmcmFnbWVudCkge1xuICB7XG4gICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZnJhZ21lbnQpO1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZnJhZ21lbnQucHJvcHMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcblxuICAgICAgaWYgKGtleSAhPT0gJ2NoaWxkcmVuJyAmJiBrZXkgIT09ICdrZXknKSB7XG4gICAgICAgIGVycm9yKCdJbnZhbGlkIHByb3AgYCVzYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLiAnICsgJ1JlYWN0LkZyYWdtZW50IGNhbiBvbmx5IGhhdmUgYGtleWAgYW5kIGBjaGlsZHJlbmAgcHJvcHMuJywga2V5KTtcblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZnJhZ21lbnQucmVmICE9PSBudWxsKSB7XG4gICAgICBlcnJvcignSW52YWxpZCBhdHRyaWJ1dGUgYHJlZmAgc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4nKTtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbiAgfVxufVxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uKHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuICB2YXIgdmFsaWRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpOyAvLyBXZSB3YXJuIGluIHRoaXMgY2FzZSBidXQgZG9uJ3QgdGhyb3cuIFdlIGV4cGVjdCB0aGUgZWxlbWVudCBjcmVhdGlvbiB0b1xuICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuXG4gIGlmICghdmFsaWRUeXBlKSB7XG4gICAgdmFyIGluZm8gPSAnJztcblxuICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICBpbmZvICs9ICcgWW91IGxpa2VseSBmb3Jnb3QgdG8gZXhwb3J0IHlvdXIgY29tcG9uZW50IGZyb20gdGhlIGZpbGUgJyArIFwiaXQncyBkZWZpbmVkIGluLCBvciB5b3UgbWlnaHQgaGF2ZSBtaXhlZCB1cCBkZWZhdWx0IGFuZCBuYW1lZCBpbXBvcnRzLlwiO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VJbmZvID0gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW1Gb3JQcm9wcyhwcm9wcyk7XG5cbiAgICBpZiAoc291cmNlSW5mbykge1xuICAgICAgaW5mbyArPSBzb3VyY2VJbmZvO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmZvICs9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuICAgIH1cblxuICAgIHZhciB0eXBlU3RyaW5nO1xuXG4gICAgaWYgKHR5cGUgPT09IG51bGwpIHtcbiAgICAgIHR5cGVTdHJpbmcgPSAnbnVsbCc7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICB0eXBlU3RyaW5nID0gJ2FycmF5JztcbiAgICB9IGVsc2UgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgIHR5cGVTdHJpbmcgPSBcIjxcIiArIChnZXRDb21wb25lbnROYW1lKHR5cGUudHlwZSkgfHwgJ1Vua25vd24nKSArIFwiIC8+XCI7XG4gICAgICBpbmZvID0gJyBEaWQgeW91IGFjY2lkZW50YWxseSBleHBvcnQgYSBKU1ggbGl0ZXJhbCBpbnN0ZWFkIG9mIGEgY29tcG9uZW50Pyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGVTdHJpbmcgPSB0eXBlb2YgdHlwZTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBlcnJvcignUmVhY3QuY3JlYXRlRWxlbWVudDogdHlwZSBpcyBpbnZhbGlkIC0tIGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgJyArICdidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlICcgKyAnY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCB0eXBlU3RyaW5nLCBpbmZvKTtcbiAgICB9XG4gIH1cblxuICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuXG4gIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSAvLyBTa2lwIGtleSB3YXJuaW5nIGlmIHRoZSB0eXBlIGlzbid0IHZhbGlkIHNpbmNlIG91ciBrZXkgdmFsaWRhdGlvbiBsb2dpY1xuICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgLy8gKFJlbmRlcmluZyB3aWxsIHRocm93IHdpdGggYSBoZWxwZnVsIG1lc3NhZ2UgYW5kIGFzIHNvb24gYXMgdGhlIHR5cGUgaXNcbiAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuXG5cbiAgaWYgKHZhbGlkVHlwZSkge1xuICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIHR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSB7XG4gICAgdmFsaWRhdGVGcmFnbWVudFByb3BzKGVsZW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG52YXIgZGlkV2FybkFib3V0RGVwcmVjYXRlZENyZWF0ZUZhY3RvcnkgPSBmYWxzZTtcbmZ1bmN0aW9uIGNyZWF0ZUZhY3RvcnlXaXRoVmFsaWRhdGlvbih0eXBlKSB7XG4gIHZhciB2YWxpZGF0ZWRGYWN0b3J5ID0gY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uLmJpbmQobnVsbCwgdHlwZSk7XG4gIHZhbGlkYXRlZEZhY3RvcnkudHlwZSA9IHR5cGU7XG5cbiAge1xuICAgIGlmICghZGlkV2FybkFib3V0RGVwcmVjYXRlZENyZWF0ZUZhY3RvcnkpIHtcbiAgICAgIGRpZFdhcm5BYm91dERlcHJlY2F0ZWRDcmVhdGVGYWN0b3J5ID0gdHJ1ZTtcblxuICAgICAgd2FybignUmVhY3QuY3JlYXRlRmFjdG9yeSgpIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAnICsgJ2EgZnV0dXJlIG1ham9yIHJlbGVhc2UuIENvbnNpZGVyIHVzaW5nIEpTWCAnICsgJ29yIHVzZSBSZWFjdC5jcmVhdGVFbGVtZW50KCkgZGlyZWN0bHkgaW5zdGVhZC4nKTtcbiAgICB9IC8vIExlZ2FjeSBob29rOiByZW1vdmUgaXRcblxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbGlkYXRlZEZhY3RvcnksICd0eXBlJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2FybignRmFjdG9yeS50eXBlIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB0aGUgY2xhc3MgZGlyZWN0bHkgJyArICdiZWZvcmUgcGFzc2luZyBpdCB0byBjcmVhdGVGYWN0b3J5LicpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICB2YWx1ZTogdHlwZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbn1cbmZ1bmN0aW9uIGNsb25lRWxlbWVudFdpdGhWYWxpZGF0aW9uKGVsZW1lbnQsIHByb3BzLCBjaGlsZHJlbikge1xuICB2YXIgbmV3RWxlbWVudCA9IGNsb25lRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCBuZXdFbGVtZW50LnR5cGUpO1xuICB9XG5cbiAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gIHJldHVybiBuZXdFbGVtZW50O1xufVxuXG57XG5cbiAgdHJ5IHtcbiAgICB2YXIgZnJvemVuT2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG4gICAgdmFyIHRlc3RNYXAgPSBuZXcgTWFwKFtbZnJvemVuT2JqZWN0LCBudWxsXV0pO1xuICAgIHZhciB0ZXN0U2V0ID0gbmV3IFNldChbZnJvemVuT2JqZWN0XSk7IC8vIFRoaXMgaXMgbmVjZXNzYXJ5IGZvciBSb2xsdXAgdG8gbm90IGNvbnNpZGVyIHRoZXNlIHVudXNlZC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvMTc3MVxuICAgIC8vIFRPRE86IHdlIGNhbiByZW1vdmUgdGhlc2UgaWYgUm9sbHVwIGZpeGVzIHRoZSBidWcuXG5cbiAgICB0ZXN0TWFwLnNldCgwLCAwKTtcbiAgICB0ZXN0U2V0LmFkZCgwKTtcbiAgfSBjYXRjaCAoZSkge1xuICB9XG59XG5cbnZhciBjcmVhdGVFbGVtZW50JDEgPSAgY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uIDtcbnZhciBjbG9uZUVsZW1lbnQkMSA9ICBjbG9uZUVsZW1lbnRXaXRoVmFsaWRhdGlvbiA7XG52YXIgY3JlYXRlRmFjdG9yeSA9ICBjcmVhdGVGYWN0b3J5V2l0aFZhbGlkYXRpb24gO1xudmFyIENoaWxkcmVuID0ge1xuICBtYXA6IG1hcENoaWxkcmVuLFxuICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICB0b0FycmF5OiB0b0FycmF5LFxuICBvbmx5OiBvbmx5Q2hpbGRcbn07XG5cbmV4cG9ydHMuQ2hpbGRyZW4gPSBDaGlsZHJlbjtcbmV4cG9ydHMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuZXhwb3J0cy5GcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG5leHBvcnRzLlByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbmV4cG9ydHMuUHVyZUNvbXBvbmVudCA9IFB1cmVDb21wb25lbnQ7XG5leHBvcnRzLlN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xuZXhwb3J0cy5TdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG5leHBvcnRzLl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEID0gUmVhY3RTaGFyZWRJbnRlcm5hbHM7XG5leHBvcnRzLmNsb25lRWxlbWVudCA9IGNsb25lRWxlbWVudCQxO1xuZXhwb3J0cy5jcmVhdGVDb250ZXh0ID0gY3JlYXRlQ29udGV4dDtcbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQkMTtcbmV4cG9ydHMuY3JlYXRlRmFjdG9yeSA9IGNyZWF0ZUZhY3Rvcnk7XG5leHBvcnRzLmNyZWF0ZVJlZiA9IGNyZWF0ZVJlZjtcbmV4cG9ydHMuZm9yd2FyZFJlZiA9IGZvcndhcmRSZWY7XG5leHBvcnRzLmlzVmFsaWRFbGVtZW50ID0gaXNWYWxpZEVsZW1lbnQ7XG5leHBvcnRzLmxhenkgPSBsYXp5O1xuZXhwb3J0cy5tZW1vID0gbWVtbztcbmV4cG9ydHMudXNlQ2FsbGJhY2sgPSB1c2VDYWxsYmFjaztcbmV4cG9ydHMudXNlQ29udGV4dCA9IHVzZUNvbnRleHQ7XG5leHBvcnRzLnVzZURlYnVnVmFsdWUgPSB1c2VEZWJ1Z1ZhbHVlO1xuZXhwb3J0cy51c2VFZmZlY3QgPSB1c2VFZmZlY3Q7XG5leHBvcnRzLnVzZUltcGVyYXRpdmVIYW5kbGUgPSB1c2VJbXBlcmF0aXZlSGFuZGxlO1xuZXhwb3J0cy51c2VMYXlvdXRFZmZlY3QgPSB1c2VMYXlvdXRFZmZlY3Q7XG5leHBvcnRzLnVzZU1lbW8gPSB1c2VNZW1vO1xuZXhwb3J0cy51c2VSZWR1Y2VyID0gdXNlUmVkdWNlcjtcbmV4cG9ydHMudXNlUmVmID0gdXNlUmVmO1xuZXhwb3J0cy51c2VTdGF0ZSA9IHVzZVN0YXRlO1xuZXhwb3J0cy52ZXJzaW9uID0gUmVhY3RWZXJzaW9uO1xuICB9KSgpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LnByb2R1Y3Rpb24ubWluLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LmRldmVsb3BtZW50LmpzJyk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
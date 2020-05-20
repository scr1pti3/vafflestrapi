(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.axios"],{

/***/ "2SVd":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),

/***/ "5oMp":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ "9rSQ":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "xTJ+");

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ "CgaS":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "xTJ+");

var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "MLWZ");

var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "9rSQ");

var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "UnBK");

var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "SntB");
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */


function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  } // Hook up interceptors middleware


  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
module.exports = Axios;

/***/ }),

/***/ "DfZB":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ "HSsa":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ "JEQr":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "xTJ+");

var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "yK9s");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "tQ2B");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "tQ2B");
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        /* Ignore */
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "8oxB")))

/***/ }),

/***/ "LYNF":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "OH9c");
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),

/***/ "Lmem":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ "MLWZ":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "xTJ+");

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ "OH9c":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function () {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };

  return error;
};

/***/ }),

/***/ "OTTw":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "xTJ+");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ "Rn+g":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "LYNF");
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),

/***/ "SntB":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "xTJ+");
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = ['baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'];
  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys);
  var otherKeys = Object.keys(config2).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  return config;
};

/***/ }),

/***/ "UnBK":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "xTJ+");

var transformData = __webpack_require__(/*! ./transformData */ "xAGQ");

var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "Lmem");

var defaults = __webpack_require__(/*! ../defaults */ "JEQr");
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ "endd":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;

/***/ }),

/***/ "eqyj":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "xTJ+");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ "g7np":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "2SVd");

var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "5oMp");
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */


module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

/***/ }),

/***/ "jfS+":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "endd");
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ "tQ2B":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "xTJ+");

var settle = __webpack_require__(/*! ./../core/settle */ "Rn+g");

var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "MLWZ");

var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "g7np");

var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "w0Vi");

var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "OTTw");

var createError = __webpack_require__(/*! ../core/createError */ "LYNF");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "eqyj"); // Add xsrf header


      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

/***/ }),

/***/ "vDqi":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "zuR4");

/***/ }),

/***/ "w0Vi":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "xTJ+"); // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

/***/ }),

/***/ "xAGQ":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "xTJ+");
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

/***/ }),

/***/ "xTJ+":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "HSsa");
/*global toString:true*/
// utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray(val) {
  return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */


function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function deepMerge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

/***/ }),

/***/ "yK9s":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "xTJ+");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ "zuR4":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "xTJ+");

var bind = __webpack_require__(/*! ./helpers/bind */ "HSsa");

var Axios = __webpack_require__(/*! ./core/Axios */ "CgaS");

var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "SntB");

var defaults = __webpack_require__(/*! ./defaults */ "JEQr");
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios.prototype, context); // Copy context to instance

  utils.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults); // Expose Axios class to allow class inheritance

axios.Axios = Axios; // Factory for creating new instances

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
}; // Expose Cancel & CancelToken


axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "endd");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "jfS+");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "Lmem"); // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = __webpack_require__(/*! ./helpers/spread */ "DfZB");
module.exports = axios; // Allow use of default import syntax in TypeScript

module.exports.default = axios;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiaXNBYnNvbHV0ZVVSTCIsInVybCIsInRlc3QiLCJjb21iaW5lVVJMcyIsImJhc2VVUkwiLCJyZWxhdGl2ZVVSTCIsInJlcGxhY2UiLCJ1dGlscyIsInJlcXVpcmUiLCJJbnRlcmNlcHRvck1hbmFnZXIiLCJoYW5kbGVycyIsInByb3RvdHlwZSIsInVzZSIsImZ1bGZpbGxlZCIsInJlamVjdGVkIiwicHVzaCIsImxlbmd0aCIsImVqZWN0IiwiaWQiLCJmb3JFYWNoIiwiZm4iLCJmb3JFYWNoSGFuZGxlciIsImgiLCJidWlsZFVSTCIsImRpc3BhdGNoUmVxdWVzdCIsIm1lcmdlQ29uZmlnIiwiQXhpb3MiLCJpbnN0YW5jZUNvbmZpZyIsImRlZmF1bHRzIiwiaW50ZXJjZXB0b3JzIiwicmVxdWVzdCIsInJlc3BvbnNlIiwiY29uZmlnIiwiYXJndW1lbnRzIiwibWV0aG9kIiwidG9Mb3dlckNhc2UiLCJjaGFpbiIsInVuZGVmaW5lZCIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzIiwiaW50ZXJjZXB0b3IiLCJ1bnNoaWZ0IiwicHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzIiwidGhlbiIsInNoaWZ0IiwiZ2V0VXJpIiwicGFyYW1zIiwicGFyYW1zU2VyaWFsaXplciIsImZvckVhY2hNZXRob2ROb0RhdGEiLCJtZXJnZSIsImZvckVhY2hNZXRob2RXaXRoRGF0YSIsImRhdGEiLCJzcHJlYWQiLCJjYWxsYmFjayIsIndyYXAiLCJhcnIiLCJhcHBseSIsImJpbmQiLCJ0aGlzQXJnIiwiYXJncyIsIkFycmF5IiwiaSIsIm5vcm1hbGl6ZUhlYWRlck5hbWUiLCJERUZBVUxUX0NPTlRFTlRfVFlQRSIsInNldENvbnRlbnRUeXBlSWZVbnNldCIsImhlYWRlcnMiLCJ2YWx1ZSIsImlzVW5kZWZpbmVkIiwiZ2V0RGVmYXVsdEFkYXB0ZXIiLCJhZGFwdGVyIiwiWE1MSHR0cFJlcXVlc3QiLCJwcm9jZXNzIiwiT2JqZWN0IiwidG9TdHJpbmciLCJjYWxsIiwidHJhbnNmb3JtUmVxdWVzdCIsImlzRm9ybURhdGEiLCJpc0FycmF5QnVmZmVyIiwiaXNCdWZmZXIiLCJpc1N0cmVhbSIsImlzRmlsZSIsImlzQmxvYiIsImlzQXJyYXlCdWZmZXJWaWV3IiwiYnVmZmVyIiwiaXNVUkxTZWFyY2hQYXJhbXMiLCJpc09iamVjdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0cmFuc2Zvcm1SZXNwb25zZSIsInBhcnNlIiwiZSIsInRpbWVvdXQiLCJ4c3JmQ29va2llTmFtZSIsInhzcmZIZWFkZXJOYW1lIiwibWF4Q29udGVudExlbmd0aCIsInZhbGlkYXRlU3RhdHVzIiwic3RhdHVzIiwiY29tbW9uIiwiZW5oYW5jZUVycm9yIiwiY3JlYXRlRXJyb3IiLCJtZXNzYWdlIiwiY29kZSIsImVycm9yIiwiRXJyb3IiLCJpc0NhbmNlbCIsIl9fQ0FOQ0VMX18iLCJlbmNvZGUiLCJ2YWwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJzZXJpYWxpemVkUGFyYW1zIiwicGFydHMiLCJzZXJpYWxpemUiLCJrZXkiLCJpc0FycmF5IiwicGFyc2VWYWx1ZSIsInYiLCJpc0RhdGUiLCJ0b0lTT1N0cmluZyIsImpvaW4iLCJoYXNobWFya0luZGV4IiwiaW5kZXhPZiIsInNsaWNlIiwiaXNBeGlvc0Vycm9yIiwidG9KU09OIiwibmFtZSIsImRlc2NyaXB0aW9uIiwibnVtYmVyIiwiZmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwic3RhY2siLCJpc1N0YW5kYXJkQnJvd3NlckVudiIsInN0YW5kYXJkQnJvd3NlckVudiIsIm1zaWUiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ1cmxQYXJzaW5nTm9kZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIm9yaWdpblVSTCIsInJlc29sdmVVUkwiLCJocmVmIiwic2V0QXR0cmlidXRlIiwicHJvdG9jb2wiLCJob3N0Iiwic2VhcmNoIiwiaGFzaCIsImhvc3RuYW1lIiwicG9ydCIsInBhdGhuYW1lIiwiY2hhckF0Iiwid2luZG93IiwibG9jYXRpb24iLCJpc1VSTFNhbWVPcmlnaW4iLCJyZXF1ZXN0VVJMIiwicGFyc2VkIiwiaXNTdHJpbmciLCJub25TdGFuZGFyZEJyb3dzZXJFbnYiLCJzZXR0bGUiLCJyZWplY3QiLCJjb25maWcxIiwiY29uZmlnMiIsInZhbHVlRnJvbUNvbmZpZzJLZXlzIiwibWVyZ2VEZWVwUHJvcGVydGllc0tleXMiLCJkZWZhdWx0VG9Db25maWcyS2V5cyIsInZhbHVlRnJvbUNvbmZpZzIiLCJwcm9wIiwibWVyZ2VEZWVwUHJvcGVydGllcyIsImRlZXBNZXJnZSIsImRlZmF1bHRUb0NvbmZpZzIiLCJheGlvc0tleXMiLCJjb25jYXQiLCJvdGhlcktleXMiLCJrZXlzIiwiZmlsdGVyIiwiZmlsdGVyQXhpb3NLZXlzIiwib3RoZXJLZXlzRGVmYXVsdFRvQ29uZmlnMiIsInRyYW5zZm9ybURhdGEiLCJ0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkIiwiY2FuY2VsVG9rZW4iLCJ0aHJvd0lmUmVxdWVzdGVkIiwiY2xlYW5IZWFkZXJDb25maWciLCJvbkFkYXB0ZXJSZXNvbHV0aW9uIiwib25BZGFwdGVyUmVqZWN0aW9uIiwicmVhc29uIiwiQ2FuY2VsIiwid3JpdGUiLCJleHBpcmVzIiwicGF0aCIsImRvbWFpbiIsInNlY3VyZSIsImNvb2tpZSIsImlzTnVtYmVyIiwiRGF0ZSIsInRvR01UU3RyaW5nIiwicmVhZCIsIm1hdGNoIiwiUmVnRXhwIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicmVtb3ZlIiwibm93IiwiYnVpbGRGdWxsUGF0aCIsInJlcXVlc3RlZFVSTCIsIkNhbmNlbFRva2VuIiwiZXhlY3V0b3IiLCJUeXBlRXJyb3IiLCJyZXNvbHZlUHJvbWlzZSIsInByb21pc2VFeGVjdXRvciIsInRva2VuIiwiY2FuY2VsIiwic291cmNlIiwiYyIsInBhcnNlSGVhZGVycyIsInhockFkYXB0ZXIiLCJkaXNwYXRjaFhoclJlcXVlc3QiLCJyZXF1ZXN0RGF0YSIsInJlcXVlc3RIZWFkZXJzIiwiYXV0aCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJBdXRob3JpemF0aW9uIiwiYnRvYSIsImZ1bGxQYXRoIiwib3BlbiIsInRvVXBwZXJDYXNlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiaGFuZGxlTG9hZCIsInJlYWR5U3RhdGUiLCJyZXNwb25zZVVSTCIsInJlc3BvbnNlSGVhZGVycyIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlRGF0YSIsInJlc3BvbnNlVHlwZSIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJvbmFib3J0IiwiaGFuZGxlQWJvcnQiLCJvbmVycm9yIiwiaGFuZGxlRXJyb3IiLCJvbnRpbWVvdXQiLCJoYW5kbGVUaW1lb3V0IiwidGltZW91dEVycm9yTWVzc2FnZSIsImNvb2tpZXMiLCJ4c3JmVmFsdWUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25Eb3dubG9hZFByb2dyZXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uVXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWQiLCJvbkNhbmNlbGVkIiwiYWJvcnQiLCJzZW5kIiwiaWdub3JlRHVwbGljYXRlT2YiLCJzcGxpdCIsInBhcnNlciIsImxpbmUiLCJ0cmltIiwic3Vic3RyIiwiZm5zIiwidHJhbnNmb3JtIiwiY29uc3RydWN0b3IiLCJGb3JtRGF0YSIsInJlc3VsdCIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiaXNGdW5jdGlvbiIsInBpcGUiLCJVUkxTZWFyY2hQYXJhbXMiLCJzdHIiLCJwcm9kdWN0Iiwib2JqIiwibCIsImhhc093blByb3BlcnR5IiwiYXNzaWduVmFsdWUiLCJleHRlbmQiLCJhIiwiYiIsIm5vcm1hbGl6ZWROYW1lIiwicHJvY2Vzc0hlYWRlciIsImNyZWF0ZUluc3RhbmNlIiwiZGVmYXVsdENvbmZpZyIsImNvbnRleHQiLCJpbnN0YW5jZSIsImF4aW9zIiwiY3JlYXRlIiwiYWxsIiwicHJvbWlzZXMiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFhO0FBRWI7Ozs7Ozs7QUFNQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFNBQVNDLGFBQVQsQ0FBdUJDLEdBQXZCLEVBQTRCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLFNBQU8sZ0NBQWdDQyxJQUFoQyxDQUFxQ0QsR0FBckMsQ0FBUDtBQUNELENBTEQsQzs7Ozs7Ozs7Ozs7OztBQ1JhO0FBRWI7Ozs7Ozs7O0FBT0FILE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixTQUFTSSxXQUFULENBQXFCQyxPQUFyQixFQUE4QkMsV0FBOUIsRUFBMkM7QUFDMUQsU0FBT0EsV0FBVyxHQUNkRCxPQUFPLENB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OztBQUNBclIsT0FBSyxDQUFDOFEsTUFBTixDQUFhUSxRQUFiLEVBQXVCRCxPQUF2QjtBQUVBLFNBQU9DLFFBQVA7QUFDRCxDLENBRUQ7OztBQUNBLElBQUlDLEtBQUssR0FBR0osY0FBYyxDQUFDOVAsUUFBRCxDQUExQixDLENBRUE7O0FBQ0FrUSxLQUFLLENBQUNwUSxLQUFOLEdBQWNBLEtBQWQsQyxDQUVBOztBQUNBb1EsS0FBSyxDQUFDQyxNQUFOLEdBQWUsU0FBU0EsTUFBVCxDQUFnQnBRLGNBQWhCLEVBQWdDO0FBQzdDLFNBQU8rUCxjQUFjLENBQUNqUSxXQUFXLENBQUNxUSxLQUFLLENBQUNsUSxRQUFQLEVBQWlCRCxjQUFqQixDQUFaLENBQXJCO0FBQ0QsQ0FGRCxDLENBSUE7OztBQUNBbVEsS0FBSyxDQUFDbkcsTUFBTixHQUFlbkwsbUJBQU8sQ0FBQyw2QkFBRCxDQUF0QjtBQUNBc1IsS0FBSyxDQUFDakYsV0FBTixHQUFvQnJNLG1CQUFPLENBQUMsa0NBQUQsQ0FBM0I7QUFDQXNSLEtBQUssQ0FBQ3BMLFFBQU4sR0FBaUJsRyxtQkFBTyxDQUFDLCtCQUFELENBQXhCLEMsQ0FFQTs7QUFDQXNSLEtBQUssQ0FBQ0UsR0FBTixHQUFZLFNBQVNBLEdBQVQsQ0FBYUMsUUFBYixFQUF1QjtBQUNqQyxTQUFPMVAsT0FBTyxDQUFDeVAsR0FBUixDQUFZQyxRQUFaLENBQVA7QUFDRCxDQUZEOztBQUdBSCxLQUFLLENBQUN4TyxNQUFOLEdBQWU5QyxtQkFBTyxDQUFDLDhCQUFELENBQXRCO0FBRUFWLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQitSLEtBQWpCLEMsQ0FFQTs7QUFDQWhTLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlbVMsT0FBZixHQUF5QkosS0FBekIsQyIsImZpbGUiOiJucG0uYXhpb3MuMzRkNzNiMTJkMTZkMjhhNTk4M2IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgdmFyIG9yaWdpblVSTDtcblxuICAgICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICAgIH1cblxuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdwYXJhbXMnLCAnZGF0YSddO1xuICB2YXIgbWVyZ2VEZWVwUHJvcGVydGllc0tleXMgPSBbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eSddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbXG4gICAgJ2Jhc2VVUkwnLCAndXJsJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsXG4gICAgJ3RpbWVvdXQnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJyxcbiAgICAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJywgJ3ZhbGlkYXRlU3RhdHVzJywgJ21heFJlZGlyZWN0cycsICdodHRwQWdlbnQnLFxuICAgICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnXG4gIF07XG5cbiAgdXRpbHMuZm9yRWFjaCh2YWx1ZUZyb21Db25maWcyS2V5cywgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gobWVyZ2VEZWVwUHJvcGVydGllc0tleXMsIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICh1dGlscy5pc09iamVjdChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goZGVmYXVsdFRvQ29uZmlnMktleXMsIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXNcbiAgICAuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKVxuICAgIC5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpO1xuXG4gIHZhciBvdGhlcktleXMgPSBPYmplY3RcbiAgICAua2V5cyhjb25maWcyKVxuICAgIC5maWx0ZXIoZnVuY3Rpb24gZmlsdGVyQXhpb3NLZXlzKGtleSkge1xuICAgICAgcmV0dXJuIGF4aW9zS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xuICAgIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gob3RoZXJLZXlzLCBmdW5jdGlvbiBvdGhlcktleXNEZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1xuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi4vY29yZS9idWlsZEZ1bGxQYXRoJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IodGltZW91dEVycm9yTWVzc2FnZSwgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gZXF1YWwgdG8gbWVyZ2Ugd2l0aCB0aGUgZGlmZmVyZW5jZSBiZWluZyB0aGF0IG5vIHJlZmVyZW5jZVxuICogdG8gb3JpZ2luYWwgb2JqZWN0cyBpcyBrZXB0LlxuICpcbiAqIEBzZWUgbWVyZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGRlZXBNZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBkZWVwTWVyZ2U6IGRlZXBNZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGF4aW9zLmRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iXSwic291cmNlUm9vdCI6IiJ9
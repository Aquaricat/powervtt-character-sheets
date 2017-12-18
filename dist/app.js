(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["powervtt-character-sheets"] = factory();
	else
		root["powervtt-character-sheets"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(1);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(8);
} else {
  module.exports = __webpack_require__(9);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(4);
  var warning = __webpack_require__(5);
  var ReactPropTypesSecret = __webpack_require__(10);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var m=__webpack_require__(2),n=__webpack_require__(3),p=__webpack_require__(1),q="function"===typeof Symbol&&Symbol["for"],r=q?Symbol["for"]("react.element"):60103,t=q?Symbol["for"]("react.call"):60104,u=q?Symbol["for"]("react.return"):60105,v=q?Symbol["for"]("react.portal"):60106,w=q?Symbol["for"]("react.fragment"):60107,x="function"===typeof Symbol&&Symbol.iterator;
function y(a){for(var b=arguments.length-1,e="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);b=Error(e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function A(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}A.prototype.isReactComponent={};A.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?y("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};A.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function B(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}function C(){}C.prototype=A.prototype;var D=B.prototype=new C;D.constructor=B;m(D,A.prototype);D.isPureReactComponent=!0;function E(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}var F=E.prototype=new C;F.constructor=E;m(F,A.prototype);F.unstable_isAsyncReactComponent=!0;F.render=function(){return this.props.children};var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,e){var c,d={},g=null,k=null;if(null!=b)for(c in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)H.call(b,c)&&!I.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var h=Array(f),l=0;l<f;l++)h[l]=arguments[l+2];d.children=h}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:r,type:a,key:g,ref:k,props:d,_owner:G.current}}function K(a){return"object"===typeof a&&null!==a&&a.$$typeof===r}
function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var L=/\/+/g,M=[];function N(a,b,e,c){if(M.length){var d=M.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function O(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>M.length&&M.push(a)}
function P(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case r:case t:case u:case v:g=!0}}if(g)return e(c,a,""===b?"."+Q(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+Q(d,k);g+=P(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=x&&a[x]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=
f.call(a),k=0;!(d=a.next()).done;)d=d.value,f=b+Q(d,k++),g+=P(d,f,e,c);else"object"===d&&(e=""+a,y("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function R(a,b){a.func.call(a.context,b,a.count++)}
function S(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?T(a,c,e,p.thatReturnsArgument):null!=a&&(K(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(L,"$\x26/")+"/")+e,a={$$typeof:r,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function T(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(L,"$\x26/")+"/");b=N(b,g,c,d);null==a||P(a,"",S,b);O(b)}
var U={Children:{map:function(a,b,e){if(null==a)return a;var c=[];T(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=N(null,null,b,e);null==a||P(a,"",R,b);O(b)},count:function(a){return null==a?0:P(a,"",p.thatReturnsNull,null)},toArray:function(a){var b=[];T(a,b,null,p.thatReturnsArgument);return b},only:function(a){K(a)?void 0:y("143");return a}},Component:A,PureComponent:B,unstable_AsyncComponent:E,Fragment:w,createElement:J,cloneElement:function(a,b,e){var c=m({},a.props),
d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)H.call(b,h)&&!I.hasOwnProperty(h)&&(c[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)c.children=e;else if(1<h){f=Array(h);for(var l=0;l<h;l++)f[l]=arguments[l+2];c.children=f}return{$$typeof:r,type:a.type,key:d,ref:g,props:c,_owner:k}},createFactory:function(a){var b=J.bind(null,a);b.type=a;return b},
isValidElement:K,version:"16.2.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:G,assign:m}},V=Object.freeze({default:U}),W=V&&U||V;module.exports=W["default"]?W["default"]:W;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var _assign = __webpack_require__(2);
var emptyObject = __webpack_require__(3);
var invariant = __webpack_require__(4);
var warning = __webpack_require__(5);
var emptyFunction = __webpack_require__(1);
var checkPropTypes = __webpack_require__(7);

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.2.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
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

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
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
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
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
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
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

/**
 * Base class helpers for the updating state of a component.
 */
function PureComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

function AsyncComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = AsyncComponent;
// Avoid an extra prototype jump for these methods.
_assign(asyncComponentPrototype, Component.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
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

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

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
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
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
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
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
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
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
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
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
  }

  // Resolve default props
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
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
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
  }

  // Children can be more than one argument, and those are transferred onto
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
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
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
          case REACT_CALL_TYPE:
          case REACT_RETURN_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
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
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
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
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
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
  }
  // Implicit key determined by the index in the set
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
 * See https://reactjs.org/docs/react-api.html#react.children.foreach
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
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
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
 * See https://reactjs.org/docs/react-api.html#react.children.map
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
 * See https://reactjs.org/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.only
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
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  return null;
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

{
  var currentlyValidatingElement = null;

  var propTypesMisspellWarningShown = false;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (element.type === REACT_FRAGMENT_TYPE) {
      return 'React.Fragment';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
    return stack;
  };

  var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
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
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
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
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
  }
  currentlyValidatingElement = null;
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
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;
  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
    currentlyValidatingElement = null;
  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  currentlyValidatingElement = fragment;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!VALID_FRAGMENT_PROPS.has(key)) {
        warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (fragment.ref !== null) {
    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
  }

  currentlyValidatingElement = null;
}

function createElementWithValidation(type, props, children) {
  var validType = typeof type === 'string' || typeof type === 'function' || typeof type === 'symbol' || typeof type === 'number';
  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    info += getStackAddendum() || '';

    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (typeof type === 'symbol' && type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  // Legacy hook TODO: Warn if this is accessed
  validatedFactory.type = type;

  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
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

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  Component: Component,
  PureComponent: PureComponent,
  unstable_AsyncComponent: AsyncComponent,

  Fragment: REACT_FRAGMENT_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

{
  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3['default'] ? React$3['default'] : React$3;

module.exports = react;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _thEditionOGL = __webpack_require__(18);

var _thEditionOGL2 = _interopRequireDefault(_thEditionOGL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  FifthEditionSRD: _thEditionOGL2.default
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var attributes = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];

var skills = [{
  "code": "acrobatics",
  "name": "Acrobatics",
  "type": "Dexterity"
}, {
  "code": "animal_handling",
  "name": "Animal Handling",
  "type": "Wisdom"
}, {
  "code": "arcana",
  "name": "Arcana",
  "type": "Intelligence"
}, {
  "code": "athletics",
  "name": "Athletics",
  "type": "Strength"
}, {
  "code": "deception",
  "name": "Deception",
  "type": "Charisma"
}, {
  "code": "history",
  "name": "History",
  "type": "Intelligence"
}, {
  "code": "insight",
  "name": "Insight",
  "type": "Wisdom"
}, {
  "code": "intimidation",
  "name": "Intimidation",
  "type": "Charisma"
}, {
  "code": "investigation",
  "name": "Investigation",
  "type": "Intelligence"
}, {
  "code": "medicine",
  "name": "Medicine",
  "type": "Wisdom"
}, {
  "code": "nature",
  "name": "Nature",
  "type": "Intelligence"
}, {
  "code": "perception",
  "name": "Perception",
  "type": "Wisdom"
}, {
  "code": "performance",
  "name": "Performance",
  "type": "Charisma"
}, {
  "code": "persuasion",
  "name": "Persuasion",
  "type": "Charisma"
}, {
  "code": "religion",
  "name": "Religion",
  "type": "Intelligence"
}, {
  "code": "sleight_of_hand",
  "name": "Sleight of Hand",
  "type": "Dexterity"
}, {
  "code": "stealth",
  "name": "Stealth",
  "type": "Dexterity"
}, {
  "code": "survival",
  "name": "Survival",
  "type": "Wisdom"
}];

var CharacterSheet = function (_Component) {
  _inherits(CharacterSheet, _Component);

  function CharacterSheet(props) {
    _classCallCheck(this, CharacterSheet);

    var _this = _possibleConstructorReturn(this, (CharacterSheet.__proto__ || Object.getPrototypeOf(CharacterSheet)).apply(this, arguments));

    _this.onAddAttack = _this.onAddAttack.bind(_this);
    _this.onAddEquipment = _this.onAddEquipment.bind(_this);
    _this.onAddProficiency = _this.onAddProficiency.bind(_this);
    _this.onAddTool = _this.onAddTool.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onChangeTab = _this.onChangeTab.bind(_this);
    _this.onRemoveTool = _this.onRemoveTool.bind(_this);
    _this.onToggleAdvantage = _this.onToggleAdvantage.bind(_this);
    _this.onToggleEditNPC = _this.onToggleEditNPC.bind(_this);
    _this.onToggleEditing = _this.onToggleEditing.bind(_this);
    _this.onToggleNPC = _this.onToggleNPC.bind(_this);
    _this.onTogglePC = _this.onTogglePC.bind(_this);

    _this.state = {
      isAdvantage: props.character.advantage || false,
      isEditing: false,
      isNPC: true || props.character.is_npc || false,
      tab: 0
    };
    return _this;
  }

  _createClass(CharacterSheet, [{
    key: 'onAddAttack',
    value: function onAddAttack() {
      if (this.props.onUpdateAttribute) {
        this.props.onUpdateAttribute('attacks', [].concat(_toConsumableArray(this.props.character.attacks), [{
          attribute: 'Strength',
          isEditing: true,
          isProficient: false,
          mod: 0,
          name: ''
        }]));
      }
    }
  }, {
    key: 'onAddEquipment',
    value: function onAddEquipment() {
      if (this.props.onUpdateAttribute) {
        this.props.onUpdateAttribute('equipment', [].concat(_toConsumableArray(this.props.character.equipment), [{
          isEditing: true,
          isEquipped: false,
          weight: 0.1,
          name: ''
        }]));
      }
    }
  }, {
    key: 'onAddProficiency',
    value: function onAddProficiency() {
      if (this.props.onUpdateAttribute) {
        this.props.onUpdateAttribute('other_profs_and_langs', [].concat(_toConsumableArray(this.props.character.other_profs_and_langs), [{
          isEditing: true,
          proficiency: '',
          type: 'Language'
        }]));
      }
    }
  }, {
    key: 'onAddTool',
    value: function onAddTool() {
      if (this.props.onUpdateAttribute) {
        this.props.onUpdateAttribute('tools_and_skills', [].concat(_toConsumableArray(this.props.character.tools_and_skills), [{
          attribute: 'Strength',
          bonus: '',
          isEditing: true,
          mod: '0',
          name: ''
        }]));
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var attr = e.target.name;
      var value = e.target.value;
      var attackId = e.target.getAttribute('data-attack-id');
      var equipmentId = e.target.getAttribute('data-equipment-id');
      var toolId = e.target.getAttribute('data-tool-id');
      var otherId = e.target.getAttribute('data-other-id');

      var data = undefined;
      var attribute = undefined;
      if (attackId !== null) {
        var id = ~~attackId;
        attribute = 'attacks';
        data = this.props.character.attacks.map(function (attack, i) {
          return _extends({}, attack, {
            attribute: i === id && attr === 'attribute' ? value : attack.attribute,
            name: i === id && attr === 'name' ? value : attack.name,
            mod: i === id && attr === 'mod' ? value : attack.mod
          });
        });
      } else if (equipmentId !== null) {
        var _id = ~~equipmentId;
        attribute = 'equipment';
        data = this.props.character.equipment.map(function (equipment, i) {
          return _extends({}, equipment, {
            name: i === _id && attr === 'name' ? value : equipment.name,
            weight: i === _id && attr === 'weight' ? value : equipment.weight
          });
        });
      } else if (toolId !== null) {
        var _id2 = ~~toolId;
        attribute = 'tools_and_skills';
        data = this.props.character.tools_and_skills.map(function (tool, i) {
          return _extends({}, tool, {
            attribute: i === _id2 && attr === 'attribute' ? value : tool.attribute,
            bonus: i === _id2 && attr === 'bonus' ? value : tool.bonus,
            name: i === _id2 && attr === 'name' ? value : tool.name,
            mod: i === _id2 && attr === 'mod' ? value : tool.mod
          });
        });
      } else if (otherId !== null) {
        var _id3 = ~~otherId;
        attribute = 'other_profs_and_langs';
        data = this.props.character.other_profs_and_langs.map(function (prof, i) {
          return _extends({}, prof, {
            type: i === _id3 && attr === 'type' ? value : prof.type,
            proficiency: i === _id3 && attr === 'proficiency' ? value : prof.proficiency
          });
        });
      }

      if (attribute && this.props.onUpdateAttribute) {
        this.props.onUpdateAttribute(attribute, data);
      }
    }
  }, {
    key: 'onChangeTab',
    value: function onChangeTab(e) {
      var tab = e.target.getAttribute('data-tab');
      this.setState({
        tab: ~~tab // convert to int
      });
    }
  }, {
    key: 'onRemoveTool',
    value: function onRemoveTool(e) {
      var attackId = e.target.getAttribute('data-attack-id');
      var equipmentId = e.target.getAttribute('data-equipment-id');
      var toolId = e.target.getAttribute('data-tool-id');
      var otherId = e.target.getAttribute('data-other-id');

      var data = undefined;
      var attribute = undefined;
      if (attackId !== null) {
        var id = ~~attackId;
        attribute = 'attacks';
        data = this.props.character.attacks.filter(function (_, i) {
          return id !== i;
        });
      } else if (equipmentId !== null) {
        var _id4 = ~~equipmentId;
        attribute = 'equipment';
        data = this.props.character.equipment.filter(function (_, i) {
          return _id4 !== i;
        });
      } else if (toolId !== null) {
        var _id5 = ~~toolId;
        attribute = 'tools_and_skills';
        data = this.props.character.tools_and_skills.filter(function (_, i) {
          return _id5 !== i;
        });
      } else if (otherId !== null) {
        var _id6 = ~~otherId;
        attribute = 'other_profs_and_langs';
        data = this.props.character.other_profs_and_langs.filter(function (_, i) {
          return _id6 !== i;
        });
      }

      if (attribute && this.props.onUpdateAttribute) {
        this.props.onUpdateAttribute(attribute, data);
      }
    }
  }, {
    key: 'onToggleAdvantage',
    value: function onToggleAdvantage() {
      this.setState({
        isAdvantage: !this.state.isAdvantage
      });

      if (this.props.onUpdateAttribute) {
        this.props.onUpdateAttribute('isAdvantage', !this.state.isAdvantage);
      }
    }
  }, {
    key: 'onToggleEditNPC',
    value: function onToggleEditNPC() {
      this.setState({
        isEditing: !this.state.isEditing
      });
    }
  }, {
    key: 'onToggleEditing',
    value: function onToggleEditing(e) {
      var attackId = e.target.getAttribute('data-attack-id');
      var equipmentId = e.target.getAttribute('data-equipment-id');
      var toolId = e.target.getAttribute('data-tool-id');
      var otherId = e.target.getAttribute('data-other-id');

      var data = undefined;
      var attribute = undefined;
      if (attackId !== null) {
        var id = ~~attackId;
        attribute = 'attacks';
        data = this.props.character.attacks.map(function (attack, i) {
          return _extends({}, attack, {
            isEditing: i === id ? !attack.isEditing : attack.isEditing
          });
        });
      } else if (equipmentId !== null) {
        var _id7 = ~~equipmentId;
        attribute = 'equipment';
        data = this.props.character.equipment.map(function (equipment, i) {
          return _extends({}, equipment, {
            isEditing: i === _id7 ? !equipment.isEditing : equipment.isEditing
          });
        });
      } else if (toolId !== null) {
        var _id8 = ~~toolId;
        attribute = 'tools_and_skills';
        data = this.props.character.tools_and_skills.map(function (tool, i) {
          return _extends({}, tool, {
            isEditing: i === _id8 ? !tool.isEditing : tool.isEditing
          });
        });
      } else if (otherId !== null) {
        var _id9 = ~~otherId;
        attribute = 'other_profs_and_langs';
        data = this.props.character.other_profs_and_langs.map(function (prof, i) {
          return _extends({}, prof, {
            isEditing: i === _id9 ? !prof.isEditing : prof.isEditing
          });
        });
      }

      if (attribute && this.props.onUpdateAttribute) {
        this.props.onUpdateAttribute(attribute, data);
      }
    }
  }, {
    key: 'onTogglePC',
    value: function onTogglePC() {
      var ok = true;
      if (this.state.isNPC) {
        ok = confirm('Are you sure you want to switch to the PC character sheet template?');
      }

      if (ok) {
        this.setState({
          isNPC: false
        });
        if (this.props.onUpdateAttribute) {
          this.props.onUpdateAttribute('isNPC', false);
        }
      }
    }
  }, {
    key: 'onToggleNPC',
    value: function onToggleNPC() {
      var ok = true;
      if (!this.state.isNPC) {
        ok = confirm('Are you sure you want to switch to the NPC character sheet template?');
      }

      if (ok) {
        this.setState({
          isNPC: true
        });
        if (this.props.onUpdateAttribute) {
          this.props.onUpdateAttribute('isNPC', true);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          character = _props.character,
          onChange = _props.onChange,
          runMacro = _props.runMacro;
      var _state = this.state,
          isAdvantage = _state.isAdvantage,
          tab = _state.tab,
          isEditing = _state.isEditing,
          isNPC = _state.isNPC;

      // If we have advantage, we tend to roll 2d20kh1 for most rolls, so we just store it here

      var roll1d20 = isAdvantage ? '2d20kh1' : '1d20';

      return _react2.default.createElement(
        'div',
        { className: 'root' },
        _react2.default.createElement(
          'div',
          { className: 'header' },
          _react2.default.createElement(
            'div',
            { className: 'left' },
            _react2.default.createElement(
              'div',
              { className: 'logo' },
              'SRD5|',
              _react2.default.createElement(
                'span',
                { className: 'power-vtt' },
                'Power VTT'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'template' },
              _react2.default.createElement(
                'a',
                { className: !isNPC && 'selected', onClick: this.onTogglePC },
                'PC'
              ),
              '\xA0|\xA0',
              _react2.default.createElement(
                'a',
                { className: isNPC && 'selected', onClick: this.onToggleNPC },
                'NPC'
              ),
              isNPC && _react2.default.createElement(
                'span',
                null,
                '\xA0- ',
                _react2.default.createElement(
                  'a',
                  { className: isEditing && 'selected', onClick: this.onToggleEditNPC },
                  isEditing ? 'Save' : 'Edit'
                )
              )
            ),
            !isNPC && _react2.default.createElement(
              'label',
              { className: 'flex' },
              _react2.default.createElement('input', {
                defaultValue: character.name,
                name: 'name',
                onChange: onChange,
                type: 'text'
              }),
              'Character Name'
            )
          ),
          !isNPC && _react2.default.createElement(
            'div',
            { className: 'right' },
            tab === 0 && _react2.default.createElement(
              'div',
              { className: 'input-row' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.character_class,
                  name: 'character_class',
                  onChange: onChange,
                  type: 'text'
                }),
                'Class'
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.level,
                  name: 'level',
                  onChange: onChange,
                  type: 'number'
                }),
                'Level'
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.background,
                  name: 'background',
                  onChange: onChange,
                  type: 'text'
                }),
                'Background'
              )
            ),
            tab === 0 && _react2.default.createElement(
              'div',
              { className: 'input-row' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.race,
                  name: 'race',
                  onChange: onChange,
                  type: 'text'
                }),
                'Race'
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.alignment,
                  name: 'alignment',
                  onChange: onChange,
                  type: 'text'
                }),
                'Alignment'
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.xp,
                  name: 'xp',
                  onChange: onChange,
                  type: 'text'
                }),
                'Experience Points'
              )
            ),
            tab === 1 && _react2.default.createElement(
              'div',
              { className: 'input-row' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.age,
                  name: 'age',
                  onChange: onChange,
                  type: 'text'
                }),
                'Age'
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.size,
                  name: 'height',
                  onChange: onChange,
                  type: 'text'
                }),
                'Size'
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.height,
                  name: 'height',
                  onChange: onChange,
                  type: 'text'
                }),
                'Height'
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.weight,
                  name: 'weight',
                  onChange: onChange,
                  type: 'text'
                }),
                'Weight'
              )
            ),
            tab === 1 && _react2.default.createElement(
              'div',
              { className: 'input-row' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.eyes,
                  name: 'eyes',
                  onChange: onChange,
                  type: 'text'
                }),
                'Eyes'
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.skin,
                  name: 'skin',
                  onChange: onChange,
                  type: 'text'
                }),
                'Skin'
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  defaultValue: character.hair,
                  name: 'hair',
                  onChange: onChange,
                  type: 'text'
                }),
                'Hair'
              )
            )
          )
        ),
        !isNPC && _react2.default.createElement(
          'div',
          { className: 'nav flex' },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              {
                'data-tab': 0,
                onClick: this.onChangeTab,
                className: tab === 0 && 'selected'
              },
              'Core'
            ),
            _react2.default.createElement(
              'li',
              {
                'data-tab': 1,
                onClick: this.onChangeTab,
                className: tab === 1 && 'selected'
              },
              'Bio'
            ),
            false && _react2.default.createElement(
              'li',
              {
                'data-tab': 2,
                onClick: this.onChangeTab,
                className: tab === 2 && 'selected'
              },
              'Spells'
            )
          ),
          _react2.default.createElement(
            'span',
            { className: 'toggle' },
            _react2.default.createElement(
              'span',
              null,
              'Advantage ',
              isAdvantage ? 'ON' : 'Off'
            ),
            _react2.default.createElement(Toggle, {
              onClick: this.onToggleAdvantage,
              isOn: isAdvantage
            })
          )
        ),
        isNPC && _react2.default.createElement(
          'div',
          { className: 'body flex' },
          !isEditing && _react2.default.createElement(
            'div',
            { className: 'col-1' },
            _react2.default.createElement(
              'h1',
              { className: 'npcName' },
              character.name
            ),
            _react2.default.createElement(
              'h2',
              { className: 'npcType' },
              character.npc_type || 'Character Type, Chaotic Evil'
            ),
            _react2.default.createElement(
              'div',
              { className: 'npc-section' },
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Armor Class'
                  ),
                  ' ',
                  character.ac,
                  ' (',
                  character.armor_type || 'Natural Armor',
                  ')'
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Hit Points'
                  ),
                  ' ',
                  character.hp,
                  ' (',
                  _react2.default.createElement(
                    'a',
                    {
                      onClick: runMacro,
                      'data-macro': '!r ' + character.hp_formula,
                      'data-as': character.key
                    },
                    character.hp_formula
                  ),
                  ')'
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Speed'
                  ),
                  ' ',
                  character.speed
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'npc-section npc-stats' },
              attributes.map(function (attr) {
                return _react2.default.createElement(
                  'div',
                  { key: 'npc-stat-' + attr, className: 'stat' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    attr.slice(0, 3).toUpperCase()
                  ),
                  character[attr.toLowerCase()],
                  ' (+',
                  character[attr.toLowerCase() + '_mod'],
                  ')'
                );
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'npc-section' },
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Saving Throws'
                  ),
                  ' ',
                  attributes.filter(function (attr) {
                    return character[attr.toLowerCase() + '_mod'] > 0;
                  }).map(function (attr) {
                    return _react2.default.createElement(
                      'span',
                      { key: 'npc-saving-throw-' + attr },
                      _react2.default.createElement(
                        'a',
                        {
                          onClick: runMacro,
                          'data-macro': '!r ' + roll1d20 + '+@me.' + attr.toLowerCase() + '_mod "' + attr + ' Save"',
                          'data-as': character.key
                        },
                        attr.slice(0, 3),
                        ' +',
                        character[attr.toLowerCase() + '_mod']
                      )
                    );
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Skills'
                  ),
                  ' ',
                  skills.filter(function (skill) {
                    return character[skill.code] > 0;
                  }).map(function (skill) {
                    return _react2.default.createElement(
                      'span',
                      { key: 'npc-skill-' + skill.name },
                      _react2.default.createElement(
                        'a',
                        {
                          onClick: runMacro,
                          'data-macro': '!r ' + roll1d20 + '+@me.' + skill.code + ' "' + skill.name + '"',
                          'data-as': character.key
                        },
                        skill.name,
                        ' +',
                        character[skill.code]
                      )
                    );
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Damage Immunities'
                  ),
                  ' ',
                  character.damage_immunities
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Senses'
                  ),
                  ' ',
                  character.senses
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Languages'
                  ),
                  ' ',
                  character.other_profs_and_langs.map(function (lang) {
                    return lang.proficiency;
                  }).join(', ')
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Challenge'
                  ),
                  ' ',
                  character.challenge,
                  ' (',
                  character.xp,
                  ')'
                )
              )
            )
          ),
          isEditing && _react2.default.createElement(
            'div',
            { className: 'col-1' },
            _react2.default.createElement(
              'label',
              { className: 'flex' },
              _react2.default.createElement('input', {
                defaultValue: character.name,
                name: 'name',
                onChange: onChange,
                type: 'text'
              }),
              'Character Name'
            ),
            _react2.default.createElement(
              'label',
              { className: 'flex' },
              _react2.default.createElement('input', {
                defaultValue: character.npc_type,
                name: 'npc_type',
                onChange: onChange,
                placeholder: 'Dragon, Chaotic Evil',
                type: 'text'
              }),
              'NPC Type'
            ),
            _react2.default.createElement(
              'div',
              { className: 'stats flex' },
              _react2.default.createElement(
                'div',
                { className: 'attribute' },
                _react2.default.createElement('input', {
                  defaultValue: character.ac,
                  name: 'ac',
                  onChange: onChange,
                  className: 'large',
                  placeholder: '0',
                  type: 'number'
                }),
                _react2.default.createElement(
                  'h4',
                  null,
                  'Armor Class'
                )
              )
            )
          )
        ),
        !isNPC && tab === 0 && _react2.default.createElement(
          'div',
          { className: 'body flex' },
          _react2.default.createElement(
            'div',
            { className: 'col-1' },
            _react2.default.createElement(
              'div',
              { className: 'flex' },
              _react2.default.createElement(
                'div',
                { className: 'attributes' },
                attributes.map(function (attr) {
                  return _react2.default.createElement(
                    'div',
                    { key: 'attr-' + attr, className: 'attribute' },
                    _react2.default.createElement(
                      'span',
                      {
                        onClick: runMacro,
                        'data-macro': '!r ' + roll1d20 + '+@me.' + attr.toLowerCase() + '_mod "' + attr + '"',
                        'data-as': character.key
                      },
                      attr
                    ),
                    _react2.default.createElement('input', {
                      defaultValue: character[attr.toLowerCase()],
                      name: attr.toLowerCase(),
                      onChange: onChange,
                      className: 'large',
                      placeholder: '0',
                      type: 'number'
                    }),
                    _react2.default.createElement(
                      'div',
                      { className: 'mod' },
                      _react2.default.createElement('input', {
                        defaultValue: '' + character[attr.toLowerCase() + '_mod'],
                        name: attr.toLowerCase() + '_mod',
                        placeholder: '0',
                        onChange: onChange,
                        type: 'number'
                      })
                    )
                  );
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col' },
                _react2.default.createElement('div', { className: 'inspiration' }),
                _react2.default.createElement(
                  'div',
                  { className: 'proficiency' },
                  _react2.default.createElement(
                    'div',
                    { className: 'bonus' },
                    _react2.default.createElement('input', {
                      defaultValue: character.proficiency_bonus,
                      name: 'proficiency_bonus',
                      placeholder: '0',
                      onChange: onChange,
                      type: 'number'
                    })
                  ),
                  _react2.default.createElement(
                    'label',
                    null,
                    'Proficiency Bonus'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'list' },
                  attributes.map(function (attr) {
                    return _react2.default.createElement(
                      'div',
                      { key: 'saving-throw-' + attr },
                      _react2.default.createElement('input', {
                        type: 'checkbox',
                        onChange: onChange,
                        name: attr.toLowerCase() + '_prof',
                        defaultChecked: character[attr.toLowerCase() + '_prof'] === true
                      }),
                      _react2.default.createElement(
                        'label',
                        {
                          onClick: runMacro,
                          'data-macro': '!r ' + roll1d20 + '+@me.' + attr.toLowerCase() + ' "' + attr + ' Save"',
                          'data-as': character.key
                        },
                        _react2.default.createElement(
                          'strong',
                          null,
                          character[attr.toLowerCase() + '_mod'] || 0
                        ),
                        ' ',
                        attr
                      )
                    );
                  }),
                  _react2.default.createElement(
                    'h4',
                    null,
                    'Saving Throws'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'list' },
                  skills.map(function (skill) {
                    return _react2.default.createElement(
                      'div',
                      { className: 'skill', key: 'skill-' + skill.name },
                      _react2.default.createElement('input', {
                        type: 'checkbox',
                        onChange: onChange,
                        name: skill.code + '_prof',
                        defaultChecked: character[skill.code + '_prof'] === true
                      }),
                      _react2.default.createElement(
                        'label',
                        {
                          onClick: runMacro,
                          'data-macro': '!r ' + roll1d20 + '+@me.' + skill.code + ' "' + skill.name + '"',
                          'data-as': character.key
                        },
                        _react2.default.createElement(
                          'strong',
                          null,
                          character[skill.type.toLowerCase() + '_mod'] || 0
                        ),
                        ' ',
                        skill.name,
                        ' ',
                        _react2.default.createElement(
                          'span',
                          { className: 'skill-type' },
                          '(',
                          skill.type.slice(0, 3),
                          ')'
                        )
                      )
                    );
                  }),
                  _react2.default.createElement(
                    'h4',
                    null,
                    'Skills'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'proficiency' },
              _react2.default.createElement(
                'div',
                { className: 'bonus' },
                _react2.default.createElement('input', {
                  defaultValue: character.passive_wisdom,
                  name: 'passive_wisdom',
                  placeholder: '0',
                  onChange: onChange,
                  type: 'number'
                })
              ),
              _react2.default.createElement(
                'label',
                null,
                'Passive Wisdom (Perception)'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'list' },
              _react2.default.createElement(
                'div',
                { className: 'tables flex' },
                _react2.default.createElement(
                  'table',
                  null,
                  _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Tool'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'Proficiency'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'Attribute'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'tbody',
                    null,
                    character.tools_and_skills.map(function (tool, i) {
                      return _react2.default.createElement(
                        'tr',
                        {
                          className: tool.isEditing && 'editable',
                          key: 'tool-proficiency-' + i,
                          onClick: !tool.isEditing ? runMacro : undefined,
                          'data-macro': '!r ' + roll1d20 + '+@me.' + tool.attribute.toLowerCase() + '+' + (tool.mod || 0) + ' "' + tool.name + '"',
                          'data-as': character.key
                        },
                        _react2.default.createElement(
                          'td',
                          null,
                          tool.isEditing ? _react2.default.createElement('input', {
                            'data-tool-id': i,
                            type: 'text',
                            placeholder: 'Name',
                            name: 'name',
                            onChange: _this2.onChange,
                            defaultValue: tool.name
                          }) : tool.name
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          tool.isEditing ? _react2.default.createElement(
                            'select',
                            {
                              'data-tool-id': i,
                              type: 'text',
                              placeholder: '',
                              name: 'bonus',
                              onChange: _this2.onChange,
                              defaultValue: tool.bonus
                            },
                            _react2.default.createElement(
                              'option',
                              { value: 0 },
                              'Proficient'
                            ),
                            _react2.default.createElement(
                              'option',
                              { value: 1 },
                              'Expertise'
                            ),
                            _react2.default.createElement(
                              'option',
                              { value: 2 },
                              'Jack of all Trades'
                            )
                          ) : tool.mod
                        ),
                        tool.isEditing ? _react2.default.createElement(
                          'td',
                          { style: { width: '124px' }, className: 'flex' },
                          _react2.default.createElement(
                            'select',
                            {
                              'data-tool-id': i,
                              type: 'text',
                              placeholder: '',
                              name: 'attribute',
                              onChange: _this2.onChange,
                              defaultValue: tool.attribute
                            },
                            attributes.map(function (attr) {
                              return _react2.default.createElement(
                                'option',
                                { key: 'tools-and-proficiencies-attr-' + attr, value: attr },
                                attr
                              );
                            })
                          ),
                          _react2.default.createElement('input', {
                            'data-tool-id': i,
                            type: 'number',
                            placeholder: 'Mod',
                            name: 'mod',
                            defaultValue: tool.mod,
                            onChange: _this2.onChange
                          })
                        ) : _react2.default.createElement(
                          'td',
                          null,
                          tool.attribute
                        )
                      );
                    }),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        { colSpan: 3, className: 'add' },
                        _react2.default.createElement(
                          'a',
                          { onClick: this.onAddTool },
                          '+ Add Item'
                        )
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'edit' },
                  _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        '\xA0'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'tbody',
                    null,
                    character.tools_and_skills.map(function (tool, i) {
                      return _react2.default.createElement(
                        'tr',
                        {
                          className: tool.isEditing && 'editable',
                          key: 'tool-proficiency-edit-' + i
                        },
                        _react2.default.createElement(
                          'td',
                          null,
                          _react2.default.createElement(
                            'a',
                            { 'data-tool-id': i, onClick: _this2.onToggleEditing },
                            tool.isEditing ? 'Save' : 'Edit'
                          ),
                          tool.isEditing && _react2.default.createElement(
                            'a',
                            { 'data-tool-id': i, onClick: _this2.onRemoveTool, className: 'warning' },
                            'Delete'
                          )
                        )
                      );
                    })
                  )
                )
              ),
              _react2.default.createElement(
                'h4',
                null,
                'Tool Proficiencies & Custom Skills'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'list' },
              _react2.default.createElement(
                'div',
                { className: 'tables flex' },
                _react2.default.createElement(
                  'table',
                  { className: 'proficiencies' },
                  _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Type'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'Label'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'tbody',
                    null,
                    character.other_profs_and_langs.map(function (prof, i) {
                      return _react2.default.createElement(
                        'tr',
                        {
                          className: prof.isEditing && 'editable',
                          key: 'other-proficiency-' + i
                        },
                        _react2.default.createElement(
                          'td',
                          null,
                          prof.isEditing ? _react2.default.createElement(
                            'select',
                            {
                              'data-other-id': i,
                              type: 'text',
                              placeholder: '',
                              name: 'type',
                              onChange: _this2.onChange,
                              defaultValue: prof.type
                            },
                            _react2.default.createElement(
                              'option',
                              { value: 'Language' },
                              'Language'
                            ),
                            _react2.default.createElement(
                              'option',
                              { value: 'Weapon' },
                              'Weapon'
                            ),
                            _react2.default.createElement(
                              'option',
                              { value: 'Armor' },
                              'Armor'
                            ),
                            _react2.default.createElement(
                              'option',
                              { value: 'Other' },
                              'Other'
                            )
                          ) : prof.type
                        ),
                        _react2.default.createElement(
                          'td',
                          { className: 'flex' },
                          prof.isEditing ? _react2.default.createElement('input', {
                            'data-other-id': i,
                            type: 'text',
                            placeholder: 'Proficiency',
                            name: 'proficiency',
                            defaultValue: prof.proficiency,
                            onChange: _this2.onChange
                          }) : prof.proficiency
                        )
                      );
                    }),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        { colSpan: 3, className: 'add' },
                        _react2.default.createElement(
                          'a',
                          { onClick: this.onAddProficiency },
                          '+ Add Item'
                        )
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'edit' },
                  _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        '\xA0'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'tbody',
                    null,
                    character.other_profs_and_langs.map(function (prof, i) {
                      return _react2.default.createElement(
                        'tr',
                        {
                          className: prof.isEditing && 'editable',
                          key: 'prof-proficiency-edit-' + i
                        },
                        _react2.default.createElement(
                          'td',
                          null,
                          _react2.default.createElement(
                            'a',
                            { 'data-other-id': i, onClick: _this2.onToggleEditing },
                            prof.isEditing ? 'Save' : 'Edit'
                          ),
                          prof.isEditing && _react2.default.createElement(
                            'a',
                            { 'data-other-id': i, onClick: _this2.onRemoveTool, className: 'warning' },
                            'Delete'
                          )
                        )
                      );
                    })
                  )
                )
              ),
              _react2.default.createElement(
                'h4',
                null,
                'Other Proficiencies & Languages'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-1' },
            _react2.default.createElement(
              'div',
              { className: 'stats flex' },
              _react2.default.createElement(
                'div',
                { className: 'attribute' },
                _react2.default.createElement('input', {
                  defaultValue: character.ac,
                  name: 'ac',
                  onChange: onChange,
                  className: 'large',
                  placeholder: '0',
                  type: 'number'
                }),
                _react2.default.createElement(
                  'h4',
                  null,
                  'Armor Class'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'attribute' },
                _react2.default.createElement('input', {
                  defaultValue: character.initiative,
                  name: 'initiative',
                  onChange: onChange,
                  className: 'large',
                  placeholder: '0',
                  type: 'number'
                }),
                _react2.default.createElement(
                  'h4',
                  {
                    onClick: runMacro,
                    'data-macro': '!r ' + roll1d20 + '+@me.dexterity "Initiative"',
                    'data-as': character.key,
                    className: 'macro'
                  },
                  'Initiative'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'attribute' },
                _react2.default.createElement('input', {
                  defaultValue: character.speed,
                  name: 'speed',
                  onChange: onChange,
                  className: 'large',
                  placeholder: '0',
                  type: 'number'
                }),
                _react2.default.createElement(
                  'h4',
                  null,
                  'Speed'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'attribute attribute-sub' },
              _react2.default.createElement(
                'div',
                { className: 'max' },
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement('input', {
                    defaultValue: character.hp_max,
                    name: 'hp_max',
                    placeholder: '0',
                    onChange: onChange,
                    type: 'number'
                  }),
                  'Hit Point Max'
                )
              ),
              _react2.default.createElement('input', {
                defaultValue: character.hp,
                name: 'hp',
                onChange: onChange,
                className: 'large',
                placeholder: '0',
                type: 'number'
              }),
              _react2.default.createElement(
                'h4',
                null,
                'Current Hit Points'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'attribute attribute-sub' },
              _react2.default.createElement('input', {
                defaultValue: character.hp_tmp,
                name: 'hp_tmp',
                onChange: onChange,
                className: 'large',
                placeholder: '0',
                type: 'number'
              }),
              _react2.default.createElement(
                'h4',
                null,
                'Temporary Hit Points'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-2' },
              _react2.default.createElement(
                'div',
                { className: 'attribute attribute-sub' },
                _react2.default.createElement(
                  'div',
                  { className: 'max' },
                  _react2.default.createElement(
                    'label',
                    null,
                    _react2.default.createElement('input', {
                      defaultValue: character.hit_dice_total,
                      name: 'hit_dice_total',
                      placeholder: '0',
                      onChange: onChange,
                      type: 'number'
                    }),
                    'Total Hit Dice'
                  )
                ),
                _react2.default.createElement('input', {
                  defaultValue: character.hit_dice,
                  name: 'hit_dice',
                  onChange: onChange,
                  className: 'large',
                  placeholder: '0',
                  type: 'text'
                }),
                _react2.default.createElement(
                  'h4',
                  {
                    className: 'macro',
                    onClick: runMacro,
                    'data-macro': '!r 1d10+@me.constitution',
                    'data-as': character.key
                  },
                  'Hit Dice'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'attribute attribute-sub' },
                _react2.default.createElement(
                  'div',
                  { className: 'death-saves' },
                  _react2.default.createElement(
                    'label',
                    null,
                    'Successes',
                    _react2.default.createElement('input', {
                      type: 'checkbox'
                    }),
                    _react2.default.createElement('input', {
                      type: 'checkbox'
                    }),
                    _react2.default.createElement('input', {
                      type: 'checkbox'
                    })
                  ),
                  _react2.default.createElement(
                    'label',
                    null,
                    'Failures',
                    _react2.default.createElement('input', {
                      type: 'checkbox'
                    }),
                    _react2.default.createElement('input', {
                      type: 'checkbox'
                    }),
                    _react2.default.createElement('input', {
                      type: 'checkbox'
                    })
                  )
                ),
                _react2.default.createElement(
                  'h4',
                  null,
                  'Death Saves'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'list attacks' },
              _react2.default.createElement(
                'div',
                { className: 'tables flex' },
                _react2.default.createElement(
                  'table',
                  null,
                  _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Name'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'Attack'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'tbody',
                    null,
                    character.attacks.map(function (attack, i) {
                      return _react2.default.createElement(
                        'tr',
                        {
                          className: attack.isEditing && 'editable',
                          key: 'attack-' + i,
                          onClick: !attack.isEditing ? runMacro : undefined,
                          'data-macro': '!r 1d6+@me.' + attack.attribute + '+' + (attack.mod || 0) + ' "' + attack.name + '"',
                          'data-as': character.key
                        },
                        _react2.default.createElement(
                          'td',
                          null,
                          attack.isEditing ? _react2.default.createElement('input', {
                            'data-attack-id': i,
                            type: 'text',
                            placeholder: 'Name',
                            name: 'name',
                            onChange: _this2.onChange,
                            defaultValue: attack.name
                          }) : attack.name
                        ),
                        attack.isEditing ? _react2.default.createElement(
                          'td',
                          { style: { width: '196px' }, className: 'flex' },
                          _react2.default.createElement(
                            'select',
                            {
                              'data-attack-id': i,
                              type: 'text',
                              placeholder: '',
                              name: 'attribute',
                              onChange: _this2.onChange,
                              defaultValue: attack.attribute
                            },
                            attributes.map(function (attr) {
                              return _react2.default.createElement(
                                'option',
                                { key: 'attack-attr-' + attr, value: attr },
                                attr
                              );
                            })
                          ),
                          '+\xA0',
                          _react2.default.createElement('input', {
                            'data-attack-id': i,
                            type: 'number',
                            placeholder: 'Mod',
                            name: 'mod',
                            defaultValue: attack.mod,
                            onChange: _this2.onChange
                          })
                        ) : _react2.default.createElement(
                          'td',
                          null,
                          attack.attribute,
                          ' + ',
                          attack.mod
                        )
                      );
                    }),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        { colSpan: 3, className: 'add' },
                        _react2.default.createElement(
                          'a',
                          { onClick: this.onAddAttack },
                          '+ Add Item'
                        )
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'edit' },
                  _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        '\xA0'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'tbody',
                    null,
                    character.attacks.map(function (attack, i) {
                      return _react2.default.createElement(
                        'tr',
                        {
                          className: attack.isEditing && 'editable',
                          key: 'attack-edit-' + i
                        },
                        _react2.default.createElement(
                          'td',
                          null,
                          _react2.default.createElement(
                            'a',
                            { 'data-attack-id': i, onClick: _this2.onToggleEditing },
                            attack.isEditing ? 'Save' : 'Edit'
                          ),
                          attack.isEditing && _react2.default.createElement(
                            'a',
                            { 'data-attack-id': i, onClick: _this2.onRemoveTool, className: 'warning' },
                            'Delete'
                          )
                        )
                      );
                    })
                  )
                )
              ),
              _react2.default.createElement(
                'h4',
                null,
                'Attacks & Spellcasting'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'list attacks' },
              _react2.default.createElement(
                'div',
                { className: 'tables flex' },
                _react2.default.createElement(
                  'table',
                  null,
                  _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Name'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'Weight'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'tbody',
                    null,
                    character.equipment.map(function (equipment, i) {
                      return _react2.default.createElement(
                        'tr',
                        {
                          className: equipment.isEditing && 'editable',
                          key: 'equipment-' + i
                        },
                        _react2.default.createElement(
                          'td',
                          null,
                          equipment.isEditing ? _react2.default.createElement('input', {
                            'data-equipment-id': i,
                            type: 'text',
                            placeholder: 'Name',
                            name: 'name',
                            onChange: _this2.onChange,
                            defaultValue: equipment.name
                          }) : equipment.name
                        ),
                        equipment.isEditing ? _react2.default.createElement(
                          'td',
                          { style: { width: '196px' }, className: 'flex' },
                          _react2.default.createElement('input', {
                            'data-equipment-id': i,
                            type: 'number',
                            placeholder: 'Weight',
                            name: 'weight',
                            defaultValue: equipment.weight,
                            onChange: _this2.onChange
                          })
                        ) : _react2.default.createElement(
                          'td',
                          null,
                          parseFloat(equipment.weight, 10).toFixed(1)
                        )
                      );
                    }),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        { colSpan: 3, className: 'add' },
                        _react2.default.createElement(
                          'a',
                          { onClick: this.onAddEquipment },
                          '+ Add Item'
                        )
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'edit' },
                  _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        '\xA0'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'tbody',
                    null,
                    character.equipment.map(function (equipment, i) {
                      return _react2.default.createElement(
                        'tr',
                        {
                          className: equipment.isEditing && 'editable',
                          key: 'equipment-edit-' + i
                        },
                        _react2.default.createElement(
                          'td',
                          null,
                          _react2.default.createElement(
                            'a',
                            { 'data-equipment-id': i, onClick: _this2.onToggleEditing },
                            equipment.isEditing ? 'Save' : 'Edit'
                          ),
                          equipment.isEditing && _react2.default.createElement(
                            'a',
                            { 'data-equipment-id': i, onClick: _this2.onRemoveTool, className: 'warning' },
                            'Delete'
                          )
                        )
                      );
                    })
                  )
                )
              ),
              _react2.default.createElement(
                'h4',
                null,
                'Equipment'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-1' },
            _react2.default.createElement(
              'div',
              { className: 'info' },
              _react2.default.createElement(
                'div',
                { className: 'attribute' },
                _react2.default.createElement('textarea', {
                  onChange: onChange,
                  name: 'personality_traits',
                  defaultValue: character.personality_traits
                }),
                _react2.default.createElement(
                  'h4',
                  null,
                  'Personality Traits'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'attribute' },
              _react2.default.createElement('textarea', {
                onChange: onChange,
                name: 'ideals',
                defaultValue: character.ideals
              }),
              _react2.default.createElement(
                'h4',
                null,
                'Ideals'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'attribute' },
              _react2.default.createElement('textarea', {
                onChange: onChange,
                name: 'bonds',
                defaultValue: character.bonds
              }),
              _react2.default.createElement(
                'h4',
                null,
                'Bonds'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'attribute' },
              _react2.default.createElement('textarea', {
                onChange: onChange,
                name: 'flaws',
                defaultValue: character.flaws
              }),
              _react2.default.createElement(
                'h4',
                null,
                'Flaws'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'attribute attribute-sub' },
              _react2.default.createElement(
                'div',
                { className: 'max' },
                _react2.default.createElement(
                  'label',
                  null,
                  'Total',
                  _react2.default.createElement('input', {
                    defaultValue: character.classResourceMax,
                    name: 'classResourceMax',
                    placeholder: '0',
                    onChange: onChange,
                    type: 'number'
                  })
                )
              ),
              _react2.default.createElement('input', {
                defaultValue: character.classResource,
                name: 'classResource',
                onChange: onChange,
                className: 'large',
                placeholder: '0',
                type: 'number'
              }),
              _react2.default.createElement(
                'h4',
                null,
                'Class Resource'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'attribute' },
              _react2.default.createElement('textarea', {
                onChange: onChange,
                rows: 10,
                name: 'features_and_traits',
                defaultValue: character.features_and_traits
              }),
              _react2.default.createElement(
                'h4',
                null,
                'Features & Traits'
              )
            )
          )
        ),
        tab === 1 && _react2.default.createElement(
          'div',
          { className: 'body flex' },
          _react2.default.createElement(
            'div',
            { className: 'col-1' },
            _react2.default.createElement(
              'div',
              { className: 'bio' },
              _react2.default.createElement(
                'div',
                { className: 'attribute' },
                _react2.default.createElement('textarea', {
                  onChange: onChange,
                  name: 'appearance',
                  defaultValue: character.appearance
                }),
                _react2.default.createElement(
                  'h4',
                  null,
                  'Character Appearance'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'attribute' },
                _react2.default.createElement('textarea', {
                  onChange: onChange,
                  name: 'backstory',
                  defaultValue: character.backstory
                }),
                _react2.default.createElement(
                  'h4',
                  null,
                  'Character Backstory'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-1' },
            _react2.default.createElement(
              'div',
              { className: 'bio' },
              _react2.default.createElement(
                'div',
                { className: 'attribute' },
                _react2.default.createElement('textarea', {
                  onChange: onChange,
                  name: 'allies_and_orgs',
                  defaultValue: character.allies_and_orgs
                }),
                _react2.default.createElement(
                  'h4',
                  null,
                  'Allies & Organizations'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'attribute' },
                _react2.default.createElement('textarea', {
                  onChange: onChange,
                  name: 'additional_features',
                  defaultValue: character.additional_features
                }),
                _react2.default.createElement(
                  'h4',
                  null,
                  'Additional Features & Traits'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'attribute' },
                _react2.default.createElement('textarea', {
                  onChange: onChange,
                  name: 'treasure',
                  defaultValue: character.treasure
                }),
                _react2.default.createElement(
                  'h4',
                  null,
                  'Treasure'
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'style',
          { jsx: true },
          '\n          a {\n            transtiion: all 0.15s ease-out;\n          }\n          h4 {\n            color: ' + _styles.color.grey[400] + ';\n            font-weight: 700;\n            margin: 0;\n            font-size: 13px;\n            text-align: center;\n          }\n\n          input[type=\'text\'], input[type=\'number\'] {\n            background-color: transparent;\n            border: 0;\n            border-bottom: 1px solid ' + _styles.color.grey[700] + ';\n            color: ' + _styles.color.grey[50] + ';\n            display: block;\n            flex: 1;\n            font-size: 16px;\n            min-width: inherit;\n            outline: 0;\n            padding: 6px 0;\n            transition: border 0.15s ease-out;\n            width: 100%;\n          }\n\n          textarea {\n            background-color: transparent;\n            display: block;\n            resize: none;\n            font-size: 14px;\n            flex: 1;\n            border: 0;\n            min-height: 48px;\n            min-width: inherit;\n            outline: 0;\n            padding: 6px 0;\n            width: 100%;\n            color: ' + _styles.color.grey[50] + ';\n          }\n\n          .bio textarea {\n            min-height: 124px;\n          }\n\n          label:hover {\n            color: ' + _styles.color.grey[50] + ';\n          }\n\n          label:hover input {\n            border-bottom: 1px solid ' + _styles.color.grey[50] + ';\n          }\n\n          input:active,\n          input:focus {\n            border-bottom: 1px solid ' + _styles.color.grey[50] + ';\n          }\n\n          label {\n            color: ' + _styles.color.grey[500] + ';\n            flex-direction: column;\n            flex: 1;\n            display: inline-block;\n            white-space: nowrap;\n            font-size: 11px;\n            text-transform: uppercase;\n            transition: color 0.15s ease-out;\n          }\n\n          .attributes {\n            margin-right: 12px;\n            max-width: 124px;\n          }\n\n          .list {\n            border-radius: 3px;\n            border: 1px solid ' + _styles.color.grey[500] + ';\n            flex: 1;\n            margin-bottom: 12px;\n            padding: 6px 12px;\n          }\n\n          .macro {\n            transition: color 0.15s ease-out;\n          }\n\n          .macro:hover,\n          .list label:hover {\n            cursor: pointer;\n            color: ' + _styles.color.yellow[500] + ';\n          }\n\n          .attribute {\n            margin-bottom: 6px;\n            text-align: center;\n            border-radius: 3px;\n            border: 1px solid ' + _styles.color.grey[500] + ';\n            padding: 6px 6px;\n          }\n\n          .attribute span {\n            color: ' + _styles.color.grey[50] + ';\n            font-weight: 700;\n            font-size: 14px;\n            transition: color 0.15s ease-out;\n          }\n\n          .attribute span:hover {\n            color: ' + _styles.color.yellow[500] + ';\n            cursor: pointer;\n          }\n\n          .attribute input {\n            text-align: center;\n            border-bottom: 0;\n          }\n\n          .attribute input.large {\n            font-size: 24px;\n            padding: 0;\n          }\n\n          .bonus,\n          .attribute .mod {\n            width: 42px;\n            margin: 6px auto 0 auto;\n            border-radius: 24px;\n            border: 1px solid ' + _styles.color.grey[700] + ';\n          }\n\n          .bonus {\n            margin: 0 6px 0 0;\n          }\n\n          .proficiency {\n            border-radius: 3px;\n            margin-bottom: 12px;\n            display: flex;\n            align-items: center;\n            border: 1px solid ' + _styles.color.grey[500] + ';\n            padding: 6px;\n          }\n\n          .bonus input,\n          .attribute .mod input {\n            font-size: 14px;\n            padding: 3px 0;\n            border-bottom: 0;\n          }\n\n          .bonus input {\n            text-align: center;\n          }\n\n          .bonus input:hover,\n          .bonus input:active,\n          .bonus input:focus,\n          .attribute .mod input:hover,\n          .attribute .mod input:active,\n          .attribute .mod input:focus {\n            border-bottom: 0!important;\n          }\n\n          .skill-type {\n            font-size: 11px;\n            text-transform: inherit;\n            color: ' + _styles.color.grey[600] + ';\n          }\n\n          .skill {\n            white-space: nowrap;\n          }\n\n          .flex {\n            display: flex;\n          }\n\n          .root {\n            background-color: ' + _styles.color.grey[800] + ';\n            border-radius: 3px;\n            border: 1px solid ' + _styles.color.grey[900] + ';\n            padding: 12px;\n          }\n\n          .logo {\n            color: ' + _styles.color.grey[50] + ';\n            font-size: 24px;\n            margin-bottom: 3px;\n            font-weight: 300;\n          }\n\n          .logo .power-vtt {\n            color: ' + _styles.color.yellow[500] + ';\n            font-weight: 700;\n          }\n\n          .template {\n            color: ' + _styles.color.grey[400] + ';\n            font-size: 12px;\n            margin-bottom: 12px;\n            font-weight: 300;\n          }\n\n          .template a {\n            text-decoration: none;\n            transition: opacity 0.15s ease-out;\n          }\n\n          .template a:hover {\n            cursor: pointer;\n            opacity: 0.7;\n          }\n\n          .template a.selected {\n            color: ' + _styles.color.yellow[500] + ';\n            font-weight: 700;\n          }\n\n          .template a.selected:hover {\n            opacity: 1.0;\n            cursor: inherit;\n          }\n\n          .header {\n            display: flex;\n          }\n\n          .left {\n            width: 33.33%;\n            margin-right: 24px;\n          }\n\n          .right {\n            width: 66.66%;\n            padding: 12px;\n            border: 1px solid ' + _styles.color.grey[500] + ';\n          }\n\n          .right label {\n            margin-right: 12px;\n          }\n\n          .input-row {\n            display: flex;\n          }\n\n          .body {\n            margin-top: 12px;\n          }\n\n          .col {\n            flex: 1;\n          }\n\n          .col-1 {\n            margin-left: 12px;\n            flex: 1;\n          }\n\n          .col-1:first-child {\n            margin-left: 0;\n          }\n\n          .death-saves {\n            padding: 12px 0;\n          }\n\n          .col-2 .attribute,\n          .stats .attribute {\n            margin: 0 6px;\n          }\n\n          .col-2 .attribute:first-child,\n          .stats .attribute:first-child {\n            margin-left: 0;\n          }\n\n          .col-2 .attribute:last-child,\n          .stats .attribute:last-child {\n            margin-right: 0;\n          }\n\n          .attribute-sub {\n            margin-top: 12px;\n          }\n\n          .attribute-sub .max {\n            margin-bottom: 6px;\n          }\n\n          .attribute-sub .max input {\n            border-bottom: 1px solid ' + _styles.color.grey[500] + ';\n            display: inline-block;\n            width: 42px;\n            margin-right: 6px;\n            padding: 3px;\n          }\n\n          .attribute-sub .max label:hover input {\n            border-bottom: 1px solid ' + _styles.color.grey[50] + ';\n          }\n\n          .col-2 {\n            display: flex;\n            margin-top: 12px;\n          }\n\n          .equipment,\n          .attacks {\n            margin-top: 12px;\n          }\n\n          .nav {\n            padding: 12px 0 0 0;\n            display: flex;\n            justify-content: space-between;\n          }\n\n          .nav ul {\n            margin: 0;\n            list-style: none;\n            padding: 0;\n          }\n\n          .nav ul li {\n            padding: 6px;\n            border-radius: 3px;\n            background-color: transparent;\n            color: ' + _styles.color.grey[500] + ';\n            border: 1px solid ' + _styles.color.grey[700] + ';\n            border-radius: 3px;\n            font-size: 12px;\n            margin: 0 3px;\n            transition: all 0.15s ease-out;\n            display: inline-block;\n          }\n\n          .nav ul li:first-child {\n            margin-left: 0;\n          }\n\n          .nav ul li:last-child {\n            margin-right: 0;\n          }\n\n          .nav ul li:hover {\n            background-color: ' + _styles.color.grey[700] + ';\n            cursor: pointer;\n            color: ' + _styles.color.grey[50] + ';\n          }\n\n          .nav ul li.selected {\n            background-color: ' + _styles.color.yellow[500] + ';\n            color: ' + _styles.color.grey[900] + ';\n            font-weight: 700;\n          }\n\n          .toggle {\n            display: flex;\n            align-items: center;\n          }\n\n          .toggle span {\n            display: block;\n            font-size: 12px;\n            text-transform: uppercase;\n            color: ' + _styles.color.grey[300] + ';\n            margin-right: 6px;\n          }\n\n          table {\n            font-size: 12px;\n            color: ' + _styles.color.grey[50] + ';\n            display: block;\n            flex: 1;\n            margin-bottom: 6px;\n          }\n\n          table thead tr {\n            background-color: ' + _styles.color.grey[900] + ';\n            width: 100%;\n          }\n\n          table td {\n            vertical-align: top;\n            padding: 3px;\n            width: 100%;\n          }\n\n          table td:first-child {\n            max-width: inherit;\n          }\n\n          table input {\n            font-size: 12px;\n            padding: 0;\n          }\n\n          table select {\n            background-color: ' + _styles.color.grey[800] + ';\n            border: 0;\n            color: ' + _styles.color.grey[50] + ';\n            width: 76px;\n            margin-bottom: 6px;\n          }\n\n          table tbody tr {\n            transition: background 0.15s ease-out;\n          }\n\n          table tbody tr:hover {\n            cursor: pointer;\n            color: ' + _styles.color.yellow[500] + ';\n            background-color: ' + _styles.color.grey[700] + ';\n          }\n\n          table tbody tr.editable:hover {\n            cursor: inherit;\n            background-color: transparent;\n            color: inherit;\n          }\n\n          table tbody tr.editable a {\n            font-size: 10px;\n            margin-right: 3px;\n          }\n\n          table tbody tr.editable a:last-child {\n            margin-right: 0;\n          }\n\n          table tbody tr.editable a:hover {\n            color: ' + _styles.color.yellow[500] + ';\n            cursor: pointer;\n          }\n\n          table tbody tr.editable a.warning {\n            margin-left: 3px;\n          }\n          table tbody tr.editable a.warning:hover {\n            color: ' + _styles.color.error + ';\n          }\n\n          .add {\n            text-align: center;\n          }\n\n          .add a {\n            font-size: 11px;\n            color: ' + _styles.color.grey[400] + ';\n            transition: color 0.15s ease-out;\n          }\n\n          table.edit {\n            flex: inherit;\n          }\n\n          table.edit thead tr {\n            background-color: transparent;\n          }\n\n          .tables {\n            width: 100%;\n          }\n\n          table.proficiencies td:first-child {\n            width: 126px;\n            max-width: 126px;\n          }\n\n          .npcName {\n            color: ' + _styles.color.yellow[500] + ';\n            margin: 0 0 -3px 0;\n            font-family: \'Spectral SC\', serif;\n            font-size: 21px;\n            font-weight: 700;\n          }\n\n          .npcType {\n            margin: 0;\n            font-size: 14px;\n            font-weight: 300;\n            font-style: italic;\n            color: ' + _styles.color.grey[200] + ';\n            padding-bottom: 12px;\n            border-bottom: 1px solid ' + _styles.color.yellow[500] + ';\n          }\n\n          .npc-section {\n            padding: 12px 0;\n            font-size: 14px;\n            color: ' + _styles.color.grey[100] + ';\n            border-bottom: 1px solid ' + _styles.color.yellow[500] + ';\n          }\n\n          .npc-section ul {\n            list-style: none;\n            margin: 0;\n            padding: 0;\n          }\n\n          .npc-section span {\n            margin-right: 6px;\n          }\n\n          .npc-section a {\n            text-decoration: none;\n            transition: color 0.15s ease-out;\n          }\n\n          .npc-section a:hover {\n            color: ' + _styles.color.yellow[500] + ';\n            cursor: pointer;\n          }\n\n          .npc-stats {\n            display: flex;\n            align-items: center;\n          }\n\n          .stat {\n            flex: 1;\n            font-size: 16px;\n            text-align: center;\n          }\n\n          .stat strong {\n            display: block;\n          }\n        '
        )
      );
    }
  }]);

  return CharacterSheet;
}(_react.Component);

exports.default = CharacterSheet;


var Toggle = function Toggle(_ref) {
  var isOn = _ref.isOn,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    'div',
    { className: isOn && 'on', onClick: onClick },
    _react2.default.createElement('span', null),
    _react2.default.createElement(
      'style',
      { jsx: true },
      '\n      div {\n        background-color: ' + _styles.color.grey[700] + ';\n        border-radius: 24px;\n        width: 48px;\n        display: flex;\n        padding: 0;\n        margin: 0;\n        align-items: center;\n        transition: background 0.15s ease-out;\n      }\n\n      span {\n        background-color: ' + _styles.color.yellow[500] + ';\n        display: block;\n        border-radius: 24px;\n        transition: all 0.15s ease-out;\n        height: 24px;\n        width: 24px;\n      }\n\n      span:hover {\n        opacity: 0.7;\n        cursor: pointer;\n      }\n\n      .on {\n        background-color: ' + _styles.color.grey[900] + ';\n      }\n\n      .on span {\n        margin-left: 24px;\n      }\n    '
    )
  );
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var color = exports.color = {
  grey: {
    950: '#111',
    900: '#212121',
    800: '#424242',
    700: '#616161',
    600: '#757575',
    500: '#9E9E9E',
    400: '#BDBDBD',
    300: '#E0E0E0',
    200: '#EEEEEE',
    100: '#F5F5F5',
    50: '#FAFAFA',
    0: '#FFFFFF',
    primary: '#9E9E9E',
    secondary: '#424242'
  },

  yellow: {
    '50': '#fffde7',
    '100': '#fff9c4',
    '200': '#fff59d',
    '300': '#fff176',
    '400': '#ffee58',
    '500': '#ffeb3b',
    '600': '#fdd835',
    '700': '#fbc02d',
    '800': '#f9a825',
    '900': '#f57f17',
    'a100': '#ffff8d',
    'a200': '#ffff00',
    'a400': '#ffea00',
    'a700': '#ffd600'
  },

  background: {
    primary: '#212121',
    secondary: '#E65100',
    inverse: '#FAFAFA',
    primaryTransparent: 'rgba(33, 33, 33, 0.8)'
  },

  text: {
    primary: '#FAFAFA',
    secondary: '#FFA726',
    inverse: '#212121'
  },

  error: '#ef5350',
  warning: '#FF7043',
  success: '#66BB6A'
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0NGI1NTJkNTBkOWE5ZmE4ZGM2NiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QvY2pzL3JlYWN0LnByb2R1Y3Rpb24ubWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC9janMvcmVhY3QuZGV2ZWxvcG1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NoZWV0cy81dGggRWRpdGlvbiBPR0wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2hlZXRzL3N0eWxlcy5qcyJdLCJuYW1lcyI6WyJGaWZ0aEVkaXRpb25TUkQiLCJhdHRyaWJ1dGVzIiwic2tpbGxzIiwiQ2hhcmFjdGVyU2hlZXQiLCJwcm9wcyIsImFyZ3VtZW50cyIsIm9uQWRkQXR0YWNrIiwiYmluZCIsIm9uQWRkRXF1aXBtZW50Iiwib25BZGRQcm9maWNpZW5jeSIsIm9uQWRkVG9vbCIsIm9uQ2hhbmdlIiwib25DaGFuZ2VUYWIiLCJvblJlbW92ZVRvb2wiLCJvblRvZ2dsZUFkdmFudGFnZSIsIm9uVG9nZ2xlRWRpdE5QQyIsIm9uVG9nZ2xlRWRpdGluZyIsIm9uVG9nZ2xlTlBDIiwib25Ub2dnbGVQQyIsInN0YXRlIiwiaXNBZHZhbnRhZ2UiLCJjaGFyYWN0ZXIiLCJhZHZhbnRhZ2UiLCJpc0VkaXRpbmciLCJpc05QQyIsImlzX25wYyIsInRhYiIsIm9uVXBkYXRlQXR0cmlidXRlIiwiYXR0YWNrcyIsImF0dHJpYnV0ZSIsImlzUHJvZmljaWVudCIsIm1vZCIsIm5hbWUiLCJlcXVpcG1lbnQiLCJpc0VxdWlwcGVkIiwid2VpZ2h0Iiwib3RoZXJfcHJvZnNfYW5kX2xhbmdzIiwicHJvZmljaWVuY3kiLCJ0eXBlIiwidG9vbHNfYW5kX3NraWxscyIsImJvbnVzIiwiZSIsImF0dHIiLCJ0YXJnZXQiLCJ2YWx1ZSIsImF0dGFja0lkIiwiZ2V0QXR0cmlidXRlIiwiZXF1aXBtZW50SWQiLCJ0b29sSWQiLCJvdGhlcklkIiwiZGF0YSIsInVuZGVmaW5lZCIsImlkIiwibWFwIiwiYXR0YWNrIiwiaSIsInRvb2wiLCJwcm9mIiwic2V0U3RhdGUiLCJmaWx0ZXIiLCJfIiwib2siLCJjb25maXJtIiwicnVuTWFjcm8iLCJyb2xsMWQyMCIsImNoYXJhY3Rlcl9jbGFzcyIsImxldmVsIiwiYmFja2dyb3VuZCIsInJhY2UiLCJhbGlnbm1lbnQiLCJ4cCIsImFnZSIsInNpemUiLCJoZWlnaHQiLCJleWVzIiwic2tpbiIsImhhaXIiLCJucGNfdHlwZSIsImFjIiwiYXJtb3JfdHlwZSIsImhwIiwiaHBfZm9ybXVsYSIsImtleSIsInNwZWVkIiwic2xpY2UiLCJ0b1VwcGVyQ2FzZSIsInRvTG93ZXJDYXNlIiwic2tpbGwiLCJjb2RlIiwiZGFtYWdlX2ltbXVuaXRpZXMiLCJzZW5zZXMiLCJsYW5nIiwiam9pbiIsImNoYWxsZW5nZSIsInByb2ZpY2llbmN5X2JvbnVzIiwicGFzc2l2ZV93aXNkb20iLCJ3aWR0aCIsImluaXRpYXRpdmUiLCJocF9tYXgiLCJocF90bXAiLCJoaXRfZGljZV90b3RhbCIsImhpdF9kaWNlIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJwZXJzb25hbGl0eV90cmFpdHMiLCJpZGVhbHMiLCJib25kcyIsImZsYXdzIiwiY2xhc3NSZXNvdXJjZU1heCIsImNsYXNzUmVzb3VyY2UiLCJmZWF0dXJlc19hbmRfdHJhaXRzIiwiYXBwZWFyYW5jZSIsImJhY2tzdG9yeSIsImFsbGllc19hbmRfb3JncyIsImFkZGl0aW9uYWxfZmVhdHVyZXMiLCJ0cmVhc3VyZSIsImdyZXkiLCJ5ZWxsb3ciLCJlcnJvciIsIlRvZ2dsZSIsImlzT24iLCJvbkNsaWNrIiwiY29sb3IiLCJwcmltYXJ5Iiwic2Vjb25kYXJ5IiwiaW52ZXJzZSIsInByaW1hcnlUcmFuc3BhcmVudCIsInRleHQiLCJ3YXJuaW5nIiwic3VjY2VzcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixXQUFXLEVBQUU7QUFDYixXQUFXLGNBQWM7QUFDekIsV0FBVyxFQUFFO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYjtBQUNBLFdBQVcsRUFBRTtBQUNiLFdBQVcsRUFBRTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7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R0FBWCxDQUZ4QixpUUFhd0IsY0FBTUMsTUFBTixDQUFhLEdBQWIsQ0FieEIsMFJBMkJ3QixjQUFNRCxJQUFOLENBQVcsR0FBWCxDQTNCeEI7QUFBQTtBQUhGLEdBRGE7QUFBQSxDQUFmLEM7Ozs7Ozs7Ozs7OztBQ3JpRU8sSUFBTU0sd0JBQVE7QUFDbkJOLFFBQU07QUFDSixTQUFLLE1BREQ7QUFFSixTQUFLLFNBRkQ7QUFHSixTQUFLLFNBSEQ7QUFJSixTQUFLLFNBSkQ7QUFLSixTQUFLLFNBTEQ7QUFNSixTQUFLLFNBTkQ7QUFPSixTQUFLLFNBUEQ7QUFRSixTQUFLLFNBUkQ7QUFTSixTQUFLLFNBVEQ7QUFVSixTQUFLLFNBVkQ7QUFXSixRQUFJLFNBWEE7QUFZSixPQUFHLFNBWkM7QUFhSk8sYUFBUyxTQWJMO0FBY0pDLGVBQVc7QUFkUCxHQURhOztBQWtCbkJQLFVBQVE7QUFDTixVQUFNLFNBREE7QUFFTixXQUFPLFNBRkQ7QUFHTixXQUFPLFNBSEQ7QUFJTixXQUFPLFNBSkQ7QUFLTixXQUFPLFNBTEQ7QUFNTixXQUFPLFNBTkQ7QUFPTixXQUFPLFNBUEQ7QUFRTixXQUFPLFNBUkQ7QUFTTixXQUFPLFNBVEQ7QUFVTixXQUFPLFNBVkQ7QUFXTixZQUFRLFNBWEY7QUFZTixZQUFRLFNBWkY7QUFhTixZQUFRLFNBYkY7QUFjTixZQUFRO0FBZEYsR0FsQlc7O0FBbUNuQmxELGNBQVk7QUFDVndELGFBQVMsU0FEQztBQUVWQyxlQUFXLFNBRkQ7QUFHVkMsYUFBUyxTQUhDO0FBSVZDLHdCQUFvQjtBQUpWLEdBbkNPOztBQTBDbkJDLFFBQU07QUFDSkosYUFBUyxTQURMO0FBRUpDLGVBQVcsU0FGUDtBQUdKQyxhQUFTO0FBSEwsR0ExQ2E7O0FBZ0RuQlAsU0FBTyxTQWhEWTtBQWlEbkJVLFdBQVMsU0FqRFU7QUFrRG5CQyxXQUFTO0FBbERVLENBQWQsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJwb3dlcnZ0dC1jaGFyYWN0ZXItc2hlZXRzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInBvd2VydnR0LWNoYXJhY3Rlci1zaGVldHNcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0NGI1NTJkNTBkOWE5ZmE4ZGM2NiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge307XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eU9iamVjdCA9IHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eU9iamVjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eU9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZianMvbGliL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QuZGV2ZWxvcG1lbnQuanMnKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbiAgdmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaW52YXJpYW50KHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICd0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJXNgLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKTtcbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgd2FybmluZyghZXJyb3IgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciwgJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIGVycm9yKTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgJXMgdHlwZTogJXMlcycsIGxvY2F0aW9uLCBlcnJvci5tZXNzYWdlLCBzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjIuMFxuICogcmVhY3QucHJvZHVjdGlvbi5taW4uanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7dmFyIG09cmVxdWlyZShcIm9iamVjdC1hc3NpZ25cIiksbj1yZXF1aXJlKFwiZmJqcy9saWIvZW1wdHlPYmplY3RcIikscD1yZXF1aXJlKFwiZmJqcy9saWIvZW1wdHlGdW5jdGlvblwiKSxxPVwiZnVuY3Rpb25cIj09PXR5cGVvZiBTeW1ib2wmJlN5bWJvbFtcImZvclwiXSxyPXE/U3ltYm9sW1wiZm9yXCJdKFwicmVhY3QuZWxlbWVudFwiKTo2MDEwMyx0PXE/U3ltYm9sW1wiZm9yXCJdKFwicmVhY3QuY2FsbFwiKTo2MDEwNCx1PXE/U3ltYm9sW1wiZm9yXCJdKFwicmVhY3QucmV0dXJuXCIpOjYwMTA1LHY9cT9TeW1ib2xbXCJmb3JcIl0oXCJyZWFjdC5wb3J0YWxcIik6NjAxMDYsdz1xP1N5bWJvbFtcImZvclwiXShcInJlYWN0LmZyYWdtZW50XCIpOjYwMTA3LHg9XCJmdW5jdGlvblwiPT09dHlwZW9mIFN5bWJvbCYmU3ltYm9sLml0ZXJhdG9yO1xuZnVuY3Rpb24geShhKXtmb3IodmFyIGI9YXJndW1lbnRzLmxlbmd0aC0xLGU9XCJNaW5pZmllZCBSZWFjdCBlcnJvciAjXCIrYStcIjsgdmlzaXQgaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2Vycm9yLWRlY29kZXIuaHRtbD9pbnZhcmlhbnRcXHgzZFwiK2EsYz0wO2M8YjtjKyspZSs9XCJcXHgyNmFyZ3NbXVxceDNkXCIrZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3VtZW50c1tjKzFdKTtiPUVycm9yKGUrXCIgZm9yIHRoZSBmdWxsIG1lc3NhZ2Ugb3IgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50IGZvciBmdWxsIGVycm9ycyBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLlwiKTtiLm5hbWU9XCJJbnZhcmlhbnQgVmlvbGF0aW9uXCI7Yi5mcmFtZXNUb1BvcD0xO3Rocm93IGI7fVxudmFyIHo9e2lzTW91bnRlZDpmdW5jdGlvbigpe3JldHVybiExfSxlbnF1ZXVlRm9yY2VVcGRhdGU6ZnVuY3Rpb24oKXt9LGVucXVldWVSZXBsYWNlU3RhdGU6ZnVuY3Rpb24oKXt9LGVucXVldWVTZXRTdGF0ZTpmdW5jdGlvbigpe319O2Z1bmN0aW9uIEEoYSxiLGUpe3RoaXMucHJvcHM9YTt0aGlzLmNvbnRleHQ9Yjt0aGlzLnJlZnM9bjt0aGlzLnVwZGF0ZXI9ZXx8en1BLnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50PXt9O0EucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKGEsYil7XCJvYmplY3RcIiE9PXR5cGVvZiBhJiZcImZ1bmN0aW9uXCIhPT10eXBlb2YgYSYmbnVsbCE9YT95KFwiODVcIik6dm9pZCAwO3RoaXMudXBkYXRlci5lbnF1ZXVlU2V0U3RhdGUodGhpcyxhLGIsXCJzZXRTdGF0ZVwiKX07QS5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24oYSl7dGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzLGEsXCJmb3JjZVVwZGF0ZVwiKX07XG5mdW5jdGlvbiBCKGEsYixlKXt0aGlzLnByb3BzPWE7dGhpcy5jb250ZXh0PWI7dGhpcy5yZWZzPW47dGhpcy51cGRhdGVyPWV8fHp9ZnVuY3Rpb24gQygpe31DLnByb3RvdHlwZT1BLnByb3RvdHlwZTt2YXIgRD1CLnByb3RvdHlwZT1uZXcgQztELmNvbnN0cnVjdG9yPUI7bShELEEucHJvdG90eXBlKTtELmlzUHVyZVJlYWN0Q29tcG9uZW50PSEwO2Z1bmN0aW9uIEUoYSxiLGUpe3RoaXMucHJvcHM9YTt0aGlzLmNvbnRleHQ9Yjt0aGlzLnJlZnM9bjt0aGlzLnVwZGF0ZXI9ZXx8en12YXIgRj1FLnByb3RvdHlwZT1uZXcgQztGLmNvbnN0cnVjdG9yPUU7bShGLEEucHJvdG90eXBlKTtGLnVuc3RhYmxlX2lzQXN5bmNSZWFjdENvbXBvbmVudD0hMDtGLnJlbmRlcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnByb3BzLmNoaWxkcmVufTt2YXIgRz17Y3VycmVudDpudWxsfSxIPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksST17a2V5OiEwLHJlZjohMCxfX3NlbGY6ITAsX19zb3VyY2U6ITB9O1xuZnVuY3Rpb24gSihhLGIsZSl7dmFyIGMsZD17fSxnPW51bGwsaz1udWxsO2lmKG51bGwhPWIpZm9yKGMgaW4gdm9pZCAwIT09Yi5yZWYmJihrPWIucmVmKSx2b2lkIDAhPT1iLmtleSYmKGc9XCJcIitiLmtleSksYilILmNhbGwoYixjKSYmIUkuaGFzT3duUHJvcGVydHkoYykmJihkW2NdPWJbY10pO3ZhciBmPWFyZ3VtZW50cy5sZW5ndGgtMjtpZigxPT09ZilkLmNoaWxkcmVuPWU7ZWxzZSBpZigxPGYpe2Zvcih2YXIgaD1BcnJheShmKSxsPTA7bDxmO2wrKyloW2xdPWFyZ3VtZW50c1tsKzJdO2QuY2hpbGRyZW49aH1pZihhJiZhLmRlZmF1bHRQcm9wcylmb3IoYyBpbiBmPWEuZGVmYXVsdFByb3BzLGYpdm9pZCAwPT09ZFtjXSYmKGRbY109ZltjXSk7cmV0dXJueyQkdHlwZW9mOnIsdHlwZTphLGtleTpnLHJlZjprLHByb3BzOmQsX293bmVyOkcuY3VycmVudH19ZnVuY3Rpb24gSyhhKXtyZXR1cm5cIm9iamVjdFwiPT09dHlwZW9mIGEmJm51bGwhPT1hJiZhLiQkdHlwZW9mPT09cn1cbmZ1bmN0aW9uIGVzY2FwZShhKXt2YXIgYj17XCJcXHgzZFwiOlwiXFx4M2QwXCIsXCI6XCI6XCJcXHgzZDJcIn07cmV0dXJuXCIkXCIrKFwiXCIrYSkucmVwbGFjZSgvWz06XS9nLGZ1bmN0aW9uKGEpe3JldHVybiBiW2FdfSl9dmFyIEw9L1xcLysvZyxNPVtdO2Z1bmN0aW9uIE4oYSxiLGUsYyl7aWYoTS5sZW5ndGgpe3ZhciBkPU0ucG9wKCk7ZC5yZXN1bHQ9YTtkLmtleVByZWZpeD1iO2QuZnVuYz1lO2QuY29udGV4dD1jO2QuY291bnQ9MDtyZXR1cm4gZH1yZXR1cm57cmVzdWx0OmEsa2V5UHJlZml4OmIsZnVuYzplLGNvbnRleHQ6Yyxjb3VudDowfX1mdW5jdGlvbiBPKGEpe2EucmVzdWx0PW51bGw7YS5rZXlQcmVmaXg9bnVsbDthLmZ1bmM9bnVsbDthLmNvbnRleHQ9bnVsbDthLmNvdW50PTA7MTA+TS5sZW5ndGgmJk0ucHVzaChhKX1cbmZ1bmN0aW9uIFAoYSxiLGUsYyl7dmFyIGQ9dHlwZW9mIGE7aWYoXCJ1bmRlZmluZWRcIj09PWR8fFwiYm9vbGVhblwiPT09ZClhPW51bGw7dmFyIGc9ITE7aWYobnVsbD09PWEpZz0hMDtlbHNlIHN3aXRjaChkKXtjYXNlIFwic3RyaW5nXCI6Y2FzZSBcIm51bWJlclwiOmc9ITA7YnJlYWs7Y2FzZSBcIm9iamVjdFwiOnN3aXRjaChhLiQkdHlwZW9mKXtjYXNlIHI6Y2FzZSB0OmNhc2UgdTpjYXNlIHY6Zz0hMH19aWYoZylyZXR1cm4gZShjLGEsXCJcIj09PWI/XCIuXCIrUShhLDApOmIpLDE7Zz0wO2I9XCJcIj09PWI/XCIuXCI6YitcIjpcIjtpZihBcnJheS5pc0FycmF5KGEpKWZvcih2YXIgaz0wO2s8YS5sZW5ndGg7aysrKXtkPWFba107dmFyIGY9YitRKGQsayk7Zys9UChkLGYsZSxjKX1lbHNlIGlmKG51bGw9PT1hfHxcInVuZGVmaW5lZFwiPT09dHlwZW9mIGE/Zj1udWxsOihmPXgmJmFbeF18fGFbXCJAQGl0ZXJhdG9yXCJdLGY9XCJmdW5jdGlvblwiPT09dHlwZW9mIGY/ZjpudWxsKSxcImZ1bmN0aW9uXCI9PT10eXBlb2YgZilmb3IoYT1cbmYuY2FsbChhKSxrPTA7IShkPWEubmV4dCgpKS5kb25lOylkPWQudmFsdWUsZj1iK1EoZCxrKyspLGcrPVAoZCxmLGUsYyk7ZWxzZVwib2JqZWN0XCI9PT1kJiYoZT1cIlwiK2EseShcIjMxXCIsXCJbb2JqZWN0IE9iamVjdF1cIj09PWU/XCJvYmplY3Qgd2l0aCBrZXlzIHtcIitPYmplY3Qua2V5cyhhKS5qb2luKFwiLCBcIikrXCJ9XCI6ZSxcIlwiKSk7cmV0dXJuIGd9ZnVuY3Rpb24gUShhLGIpe3JldHVyblwib2JqZWN0XCI9PT10eXBlb2YgYSYmbnVsbCE9PWEmJm51bGwhPWEua2V5P2VzY2FwZShhLmtleSk6Yi50b1N0cmluZygzNil9ZnVuY3Rpb24gUihhLGIpe2EuZnVuYy5jYWxsKGEuY29udGV4dCxiLGEuY291bnQrKyl9XG5mdW5jdGlvbiBTKGEsYixlKXt2YXIgYz1hLnJlc3VsdCxkPWEua2V5UHJlZml4O2E9YS5mdW5jLmNhbGwoYS5jb250ZXh0LGIsYS5jb3VudCsrKTtBcnJheS5pc0FycmF5KGEpP1QoYSxjLGUscC50aGF0UmV0dXJuc0FyZ3VtZW50KTpudWxsIT1hJiYoSyhhKSYmKGI9ZCsoIWEua2V5fHxiJiZiLmtleT09PWEua2V5P1wiXCI6KFwiXCIrYS5rZXkpLnJlcGxhY2UoTCxcIiRcXHgyNi9cIikrXCIvXCIpK2UsYT17JCR0eXBlb2Y6cix0eXBlOmEudHlwZSxrZXk6YixyZWY6YS5yZWYscHJvcHM6YS5wcm9wcyxfb3duZXI6YS5fb3duZXJ9KSxjLnB1c2goYSkpfWZ1bmN0aW9uIFQoYSxiLGUsYyxkKXt2YXIgZz1cIlwiO251bGwhPWUmJihnPShcIlwiK2UpLnJlcGxhY2UoTCxcIiRcXHgyNi9cIikrXCIvXCIpO2I9TihiLGcsYyxkKTtudWxsPT1hfHxQKGEsXCJcIixTLGIpO08oYil9XG52YXIgVT17Q2hpbGRyZW46e21hcDpmdW5jdGlvbihhLGIsZSl7aWYobnVsbD09YSlyZXR1cm4gYTt2YXIgYz1bXTtUKGEsYyxudWxsLGIsZSk7cmV0dXJuIGN9LGZvckVhY2g6ZnVuY3Rpb24oYSxiLGUpe2lmKG51bGw9PWEpcmV0dXJuIGE7Yj1OKG51bGwsbnVsbCxiLGUpO251bGw9PWF8fFAoYSxcIlwiLFIsYik7TyhiKX0sY291bnQ6ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGw9PWE/MDpQKGEsXCJcIixwLnRoYXRSZXR1cm5zTnVsbCxudWxsKX0sdG9BcnJheTpmdW5jdGlvbihhKXt2YXIgYj1bXTtUKGEsYixudWxsLHAudGhhdFJldHVybnNBcmd1bWVudCk7cmV0dXJuIGJ9LG9ubHk6ZnVuY3Rpb24oYSl7SyhhKT92b2lkIDA6eShcIjE0M1wiKTtyZXR1cm4gYX19LENvbXBvbmVudDpBLFB1cmVDb21wb25lbnQ6Qix1bnN0YWJsZV9Bc3luY0NvbXBvbmVudDpFLEZyYWdtZW50OncsY3JlYXRlRWxlbWVudDpKLGNsb25lRWxlbWVudDpmdW5jdGlvbihhLGIsZSl7dmFyIGM9bSh7fSxhLnByb3BzKSxcbmQ9YS5rZXksZz1hLnJlZixrPWEuX293bmVyO2lmKG51bGwhPWIpe3ZvaWQgMCE9PWIucmVmJiYoZz1iLnJlZixrPUcuY3VycmVudCk7dm9pZCAwIT09Yi5rZXkmJihkPVwiXCIrYi5rZXkpO2lmKGEudHlwZSYmYS50eXBlLmRlZmF1bHRQcm9wcyl2YXIgZj1hLnR5cGUuZGVmYXVsdFByb3BzO2ZvcihoIGluIGIpSC5jYWxsKGIsaCkmJiFJLmhhc093blByb3BlcnR5KGgpJiYoY1toXT12b2lkIDA9PT1iW2hdJiZ2b2lkIDAhPT1mP2ZbaF06YltoXSl9dmFyIGg9YXJndW1lbnRzLmxlbmd0aC0yO2lmKDE9PT1oKWMuY2hpbGRyZW49ZTtlbHNlIGlmKDE8aCl7Zj1BcnJheShoKTtmb3IodmFyIGw9MDtsPGg7bCsrKWZbbF09YXJndW1lbnRzW2wrMl07Yy5jaGlsZHJlbj1mfXJldHVybnskJHR5cGVvZjpyLHR5cGU6YS50eXBlLGtleTpkLHJlZjpnLHByb3BzOmMsX293bmVyOmt9fSxjcmVhdGVGYWN0b3J5OmZ1bmN0aW9uKGEpe3ZhciBiPUouYmluZChudWxsLGEpO2IudHlwZT1hO3JldHVybiBifSxcbmlzVmFsaWRFbGVtZW50OkssdmVyc2lvbjpcIjE2LjIuMFwiLF9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEOntSZWFjdEN1cnJlbnRPd25lcjpHLGFzc2lnbjptfX0sVj1PYmplY3QuZnJlZXplKHtkZWZhdWx0OlV9KSxXPVYmJlV8fFY7bW9kdWxlLmV4cG9ydHM9V1tcImRlZmF1bHRcIl0/V1tcImRlZmF1bHRcIl06VztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0L2Nqcy9yZWFjdC5wcm9kdWN0aW9uLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuMi4wXG4gKiByZWFjdC5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcycpO1xuXG4vLyBUT0RPOiB0aGlzIGlzIHNwZWNpYWwgYmVjYXVzZSBpdCBnZXRzIGltcG9ydGVkIGR1cmluZyBidWlsZC5cblxudmFyIFJlYWN0VmVyc2lvbiA9ICcxNi4yLjAnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sWydmb3InXTtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbFsnZm9yJ10oJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9DQUxMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2xbJ2ZvciddKCdyZWFjdC5jYWxsJykgOiAweGVhYzg7XG52YXIgUkVBQ1RfUkVUVVJOX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2xbJ2ZvciddKCdyZWFjdC5yZXR1cm4nKSA6IDB4ZWFjOTtcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbFsnZm9yJ10oJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2xbJ2ZvciddKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xuXG52YXIgTUFZQkVfSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7XG5cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICBpZiAobWF5YmVJdGVyYWJsZSA9PT0gbnVsbCB8fCB0eXBlb2YgbWF5YmVJdGVyYWJsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgbWF5YmVJdGVyYXRvciA9IE1BWUJFX0lURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW01BWUJFX0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF07XG4gIGlmICh0eXBlb2YgbWF5YmVJdGVyYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBtYXliZUl0ZXJhdG9yO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFdBUk5JTkc6IERPIE5PVCBtYW51YWxseSByZXF1aXJlIHRoaXMgbW9kdWxlLlxuICogVGhpcyBpcyBhIHJlcGxhY2VtZW50IGZvciBgaW52YXJpYW50KC4uLilgIHVzZWQgYnkgdGhlIGVycm9yIGNvZGUgc3lzdGVtXG4gKiBhbmQgd2lsbCBfb25seV8gYmUgcmVxdWlyZWQgYnkgdGhlIGNvcnJlc3BvbmRpbmcgYmFiZWwgcGFzcy5cbiAqIEl0IGFsd2F5cyB0aHJvd3MuXG4gKi9cblxuLyoqXG4gKiBGb3JrZWQgZnJvbSBmYmpzL3dhcm5pbmc6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmJqcy9ibG9iL2U2NmJhMjBhZDViZTQzM2ViNTQ0MjNmMmIwOTdkODI5MzI0ZDlkZTYvcGFja2FnZXMvZmJqcy9zcmMvX19mb3Jrc19fL3dhcm5pbmcuanNcbiAqXG4gKiBPbmx5IGNoYW5nZSBpcyB3ZSB1c2UgY29uc29sZS53YXJuIGluc3RlYWQgb2YgY29uc29sZS5lcnJvcixcbiAqIGFuZCBkbyBub3RoaW5nIHdoZW4gJ2NvbnNvbGUnIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKiBUaGlzIHJlYWxseSBzaW1wbGlmaWVzIHRoZSBjb2RlLlxuICogLS0tXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmckMSA9IGxvd1ByaW9yaXR5V2FybmluZztcblxudmFyIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudCA9IHt9O1xuXG5mdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICB7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3I7XG4gICAgdmFyIGNvbXBvbmVudE5hbWUgPSBjb25zdHJ1Y3RvciAmJiAoY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgY29uc3RydWN0b3IubmFtZSkgfHwgJ1JlYWN0Q2xhc3MnO1xuICAgIHZhciB3YXJuaW5nS2V5ID0gY29tcG9uZW50TmFtZSArICcuJyArIGNhbGxlck5hbWU7XG4gICAgaWYgKGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogQ2FuIG9ubHkgdXBkYXRlIGEgbW91bnRlZCBvciBtb3VudGluZyBjb21wb25lbnQuICcgKyAnVGhpcyB1c3VhbGx5IG1lYW5zIHlvdSBjYWxsZWQgJXMoKSBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiAnICsgJ1RoaXMgaXMgYSBuby1vcC5cXG5cXG5QbGVhc2UgY2hlY2sgdGhlIGNvZGUgZm9yIHRoZSAlcyBjb21wb25lbnQuJywgY2FsbGVyTmFtZSwgY2FsbGVyTmFtZSwgY29tcG9uZW50TmFtZSk7XG4gICAgZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50W3dhcm5pbmdLZXldID0gdHJ1ZTtcbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGFic3RyYWN0IEFQSSBmb3IgYW4gdXBkYXRlIHF1ZXVlLlxuICovXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSB7XG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHdlIHdhbnQgdG8gdGVzdC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICAgKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAgICpcbiAgICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICAgKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAgICpcbiAgICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICAgKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBjb21wb25lbnQgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSBjYWxsZXJOYW1lIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gY2FsbGVyTmFtZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3JlcGxhY2VTdGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gVGhpcyBvbmx5IGV4aXN0cyBiZWNhdXNlIF9wZW5kaW5nU3RhdGUgaXNcbiAgICogaW50ZXJuYWwuIFRoaXMgcHJvdmlkZXMgYSBtZXJnaW5nIHN0cmF0ZWd5IHRoYXQgaXMgbm90IGF2YWlsYWJsZSB0byBkZWVwXG4gICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgKiBkdXJpbmcgdGhlIG1lcmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggc3RhdGUuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gTmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgcGFydGlhbFN0YXRlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5Db21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPSB7fTtcblxuLyoqXG4gKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIHRvIG11dGF0ZVxuICogc3RhdGUuIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBjYWxscyB0byBgc2V0U3RhdGVgIHdpbGwgcnVuIHN5bmNocm9ub3VzbHksXG4gKiBhcyB0aGV5IG1heSBldmVudHVhbGx5IGJlIGJhdGNoZWQgdG9nZXRoZXIuICBZb3UgY2FuIHByb3ZpZGUgYW4gb3B0aW9uYWxcbiAqIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBjYWxsIHRvIHNldFN0YXRlIGlzIGFjdHVhbGx5XG4gKiBjb21wbGV0ZWQuXG4gKlxuICogV2hlbiBhIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIHRvIHNldFN0YXRlLCBpdCB3aWxsIGJlIGNhbGxlZCBhdCBzb21lIHBvaW50IGluXG4gKiB0aGUgZnV0dXJlIChub3Qgc3luY2hyb25vdXNseSkuIEl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIHVwIHRvIGRhdGVcbiAqIGNvbXBvbmVudCBhcmd1bWVudHMgKHN0YXRlLCBwcm9wcywgY29udGV4dCkuIFRoZXNlIHZhbHVlcyBjYW4gYmUgZGlmZmVyZW50XG4gKiBmcm9tIHRoaXMuKiBiZWNhdXNlIHlvdXIgZnVuY3Rpb24gbWF5IGJlIGNhbGxlZCBhZnRlciByZWNlaXZlUHJvcHMgYnV0IGJlZm9yZVxuICogc2hvdWxkQ29tcG9uZW50VXBkYXRlLCBhbmQgdGhpcyBuZXcgc3RhdGUsIHByb3BzLCBhbmQgY29udGV4dCB3aWxsIG5vdCB5ZXQgYmVcbiAqIGFzc2lnbmVkIHRvIHRoaXMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgb3IgZnVuY3Rpb24gdG9cbiAqICAgICAgICBwcm9kdWNlIG5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBjdXJyZW50IHN0YXRlLlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAocGFydGlhbFN0YXRlLCBjYWxsYmFjaykge1xuICAhKHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdmdW5jdGlvbicgfHwgcGFydGlhbFN0YXRlID09IG51bGwpID8gaW52YXJpYW50KGZhbHNlLCAnc2V0U3RhdGUoLi4uKTogdGFrZXMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcyB0byB1cGRhdGUgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuJykgOiB2b2lkIDA7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlU2V0U3RhdGUodGhpcywgcGFydGlhbFN0YXRlLCBjYWxsYmFjaywgJ3NldFN0YXRlJyk7XG59O1xuXG4vKipcbiAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICpcbiAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICpcbiAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gKlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB1cGRhdGUgaXMgY29tcGxldGUuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMsIGNhbGxiYWNrLCAnZm9yY2VVcGRhdGUnKTtcbn07XG5cbi8qKlxuICogRGVwcmVjYXRlZCBBUElzLiBUaGVzZSBBUElzIHVzZWQgdG8gZXhpc3Qgb24gY2xhc3NpYyBSZWFjdCBjbGFzc2VzIGJ1dCBzaW5jZVxuICogd2Ugd291bGQgbGlrZSB0byBkZXByZWNhdGUgdGhlbSwgd2UncmUgbm90IGdvaW5nIHRvIG1vdmUgdGhlbSBvdmVyIHRvIHRoaXNcbiAqIG1vZGVybiBiYXNlIGNsYXNzLiBJbnN0ZWFkLCB3ZSBkZWZpbmUgYSBnZXR0ZXIgdGhhdCB3YXJucyBpZiBpdCdzIGFjY2Vzc2VkLlxuICovXG57XG4gIHZhciBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICBpc01vdW50ZWQ6IFsnaXNNb3VudGVkJywgJ0luc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluICcgKyAnY29tcG9uZW50V2lsbFVubW91bnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuJ10sXG4gICAgcmVwbGFjZVN0YXRlOiBbJ3JlcGxhY2VTdGF0ZScsICdSZWZhY3RvciB5b3VyIGNvZGUgdG8gdXNlIHNldFN0YXRlIGluc3RlYWQgKHNlZSAnICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuJ11cbiAgfTtcbiAgdmFyIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBpbmZvKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbXBvbmVudC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsb3dQcmlvcml0eVdhcm5pbmckMShmYWxzZSwgJyVzKC4uLikgaXMgZGVwcmVjYXRlZCBpbiBwbGFpbiBKYXZhU2NyaXB0IFJlYWN0IGNsYXNzZXMuICVzJywgaW5mb1swXSwgaW5mb1sxXSk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIGZvciAodmFyIGZuTmFtZSBpbiBkZXByZWNhdGVkQVBJcykge1xuICAgIGlmIChkZXByZWNhdGVkQVBJcy5oYXNPd25Qcm9wZXJ0eShmbk5hbWUpKSB7XG4gICAgICBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcoZm5OYW1lLCBkZXByZWNhdGVkQVBJc1tmbk5hbWVdKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gUHVyZUNvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAvLyBEdXBsaWNhdGVkIGZyb20gQ29tcG9uZW50LlxuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuZnVuY3Rpb24gQ29tcG9uZW50RHVtbXkoKSB7fVxuQ29tcG9uZW50RHVtbXkucHJvdG90eXBlID0gQ29tcG9uZW50LnByb3RvdHlwZTtcbnZhciBwdXJlQ29tcG9uZW50UHJvdG90eXBlID0gUHVyZUNvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50RHVtbXkoKTtcbnB1cmVDb21wb25lbnRQcm90b3R5cGUuY29uc3RydWN0b3IgPSBQdXJlQ29tcG9uZW50O1xuLy8gQXZvaWQgYW4gZXh0cmEgcHJvdG90eXBlIGp1bXAgZm9yIHRoZXNlIG1ldGhvZHMuXG5fYXNzaWduKHB1cmVDb21wb25lbnRQcm90b3R5cGUsIENvbXBvbmVudC5wcm90b3R5cGUpO1xucHVyZUNvbXBvbmVudFByb3RvdHlwZS5pc1B1cmVSZWFjdENvbXBvbmVudCA9IHRydWU7XG5cbmZ1bmN0aW9uIEFzeW5jQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIC8vIER1cGxpY2F0ZWQgZnJvbSBDb21wb25lbnQuXG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG52YXIgYXN5bmNDb21wb25lbnRQcm90b3R5cGUgPSBBc3luY0NvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50RHVtbXkoKTtcbmFzeW5jQ29tcG9uZW50UHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXN5bmNDb21wb25lbnQ7XG4vLyBBdm9pZCBhbiBleHRyYSBwcm90b3R5cGUganVtcCBmb3IgdGhlc2UgbWV0aG9kcy5cbl9hc3NpZ24oYXN5bmNDb21wb25lbnRQcm90b3R5cGUsIENvbXBvbmVudC5wcm90b3R5cGUpO1xuYXN5bmNDb21wb25lbnRQcm90b3R5cGUudW5zdGFibGVfaXNBc3luY1JlYWN0Q29tcG9uZW50ID0gdHJ1ZTtcbmFzeW5jQ29tcG9uZW50UHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG59O1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICpcbiAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAqL1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICovXG4gIGN1cnJlbnQ6IG51bGxcbn07XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG5cbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bjtcbnZhciBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bjtcblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdyZWYnKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ2tleScpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdrZXknKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcua2V5ICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2YXIgd2FybkFib3V0QWNjZXNzaW5nS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgIHdhcm5pbmcoZmFsc2UsICclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ1JlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICB3YXJuaW5nKGZhbHNlLCAnJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nUmVmLmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nUmVmLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIG5vIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHByb3BzXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpIHtcbiAgdmFyIGVsZW1lbnQgPSB7XG4gICAgLy8gVGhpcyB0YWcgYWxsb3cgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAge1xuICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAvLyBhbiBleHRlcm5hbCBiYWNraW5nIHN0b3JlIHNvIHRoYXQgd2UgY2FuIGZyZWV6ZSB0aGUgd2hvbGUgb2JqZWN0LlxuICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICBlbGVtZW50Ll9zdG9yZSA9IHt9O1xuXG4gICAgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfSk7XG4gICAgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogc2VsZlxuICAgIH0pO1xuICAgIC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHNvdXJjZVxuICAgIH0pO1xuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IG9mIHRoZSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIgcHJvcHMgPSB7fTtcblxuICB2YXIga2V5ID0gbnVsbDtcbiAgdmFyIHJlZiA9IG51bGw7XG4gIHZhciBzZWxmID0gbnVsbDtcbiAgdmFyIHNvdXJjZSA9IG51bGw7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgc2VsZiA9IGNvbmZpZy5fX3NlbGYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zZWxmO1xuICAgIHNvdXJjZSA9IGNvbmZpZy5fX3NvdXJjZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NvdXJjZTtcbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICB7XG4gICAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgICBPYmplY3QuZnJlZXplKGNoaWxkQXJyYXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICB2YXIgZGVmYXVsdFByb3BzID0gdHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB7XG4gICAgaWYgKGtleSB8fCByZWYpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvcHMuJCR0eXBlb2YgPT09ICd1bmRlZmluZWQnIHx8IHByb3BzLiQkdHlwZW9mICE9PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVmKSB7XG4gICAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIFJlYWN0RWxlbWVudHMgb2YgYSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVmYWN0b3J5XG4gKi9cblxuXG5mdW5jdGlvbiBjbG9uZUFuZFJlcGxhY2VLZXkob2xkRWxlbWVudCwgbmV3S2V5KSB7XG4gIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50KG9sZEVsZW1lbnQudHlwZSwgbmV3S2V5LCBvbGRFbGVtZW50LnJlZiwgb2xkRWxlbWVudC5fc2VsZiwgb2xkRWxlbWVudC5fc291cmNlLCBvbGRFbGVtZW50Ll9vd25lciwgb2xkRWxlbWVudC5wcm9wcyk7XG5cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogQ2xvbmUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgdXNpbmcgZWxlbWVudCBhcyB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2Nsb25lZWxlbWVudFxuICovXG5mdW5jdGlvbiBjbG9uZUVsZW1lbnQoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gT3JpZ2luYWwgcHJvcHMgYXJlIGNvcGllZFxuICB2YXIgcHJvcHMgPSBfYXNzaWduKHt9LCBlbGVtZW50LnByb3BzKTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBrZXkgPSBlbGVtZW50LmtleTtcbiAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICAvLyBTZWxmIGlzIHByZXNlcnZlZCBzaW5jZSB0aGUgb3duZXIgaXMgcHJlc2VydmVkLlxuICB2YXIgc2VsZiA9IGVsZW1lbnQuX3NlbGY7XG4gIC8vIFNvdXJjZSBpcyBwcmVzZXJ2ZWQgc2luY2UgY2xvbmVFbGVtZW50IGlzIHVubGlrZWx5IHRvIGJlIHRhcmdldGVkIGJ5IGFcbiAgLy8gdHJhbnNwaWxlciwgYW5kIHRoZSBvcmlnaW5hbCBzb3VyY2UgaXMgcHJvYmFibHkgYSBiZXR0ZXIgaW5kaWNhdG9yIG9mIHRoZVxuICAvLyB0cnVlIG93bmVyLlxuICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlO1xuXG4gIC8vIE93bmVyIHdpbGwgYmUgcHJlc2VydmVkLCB1bmxlc3MgcmVmIGlzIG92ZXJyaWRkZW5cbiAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIC8vIFNpbGVudGx5IHN0ZWFsIHRoZSByZWYgZnJvbSB0aGUgcGFyZW50LlxuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBvdmVycmlkZSBleGlzdGluZyBwcm9wc1xuICAgIHZhciBkZWZhdWx0UHJvcHM7XG4gICAgaWYgKGVsZW1lbnQudHlwZSAmJiBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICBkZWZhdWx0UHJvcHMgPSBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzO1xuICAgIH1cbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBpZiAoY29uZmlnW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkICYmIGRlZmF1bHRQcm9wcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgcmV0dXJuIFJlYWN0RWxlbWVudChlbGVtZW50LnR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcyk7XG59XG5cbi8qKlxuICogVmVyaWZpZXMgdGhlIG9iamVjdCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjaXN2YWxpZGVsZW1lbnRcbiAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgdmFsaWQgY29tcG9uZW50LlxuICogQGZpbmFsXG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuXG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IHt9O1xuXG57XG4gIC8vIENvbXBvbmVudCB0aGF0IGlzIGJlaW5nIHdvcmtlZCBvblxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldEN1cnJlbnRTdGFjayA9IG51bGw7XG5cbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbXBsID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRDdXJyZW50U3RhY2s7XG4gICAgaWYgKGltcGwpIHtcbiAgICAgIHJldHVybiBpbXBsKCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xufVxuXG52YXIgU0VQQVJBVE9SID0gJy4nO1xudmFyIFNVQlNFUEFSQVRPUiA9ICc6JztcblxuLyoqXG4gKiBFc2NhcGUgYW5kIHdyYXAga2V5IHNvIGl0IGlzIHNhZmUgdG8gdXNlIGFzIGEgcmVhY3RpZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gYmUgZXNjYXBlZC5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGVzY2FwZWQga2V5LlxuICovXG5mdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gIHZhciBlc2NhcGVSZWdleCA9IC9bPTpdL2c7XG4gIHZhciBlc2NhcGVyTG9va3VwID0ge1xuICAgICc9JzogJz0wJyxcbiAgICAnOic6ICc9MidcbiAgfTtcbiAgdmFyIGVzY2FwZWRTdHJpbmcgPSAoJycgKyBrZXkpLnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG5cbiAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG59XG5cbi8qKlxuICogVE9ETzogVGVzdCB0aGF0IGEgc2luZ2xlIGNoaWxkIGFuZCBhbiBhcnJheSB3aXRoIG9uZSBpdGVtIGhhdmUgdGhlIHNhbWUga2V5XG4gKiBwYXR0ZXJuLlxuICovXG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG52YXIgUE9PTF9TSVpFID0gMTA7XG52YXIgdHJhdmVyc2VDb250ZXh0UG9vbCA9IFtdO1xuZnVuY3Rpb24gZ2V0UG9vbGVkVHJhdmVyc2VDb250ZXh0KG1hcFJlc3VsdCwga2V5UHJlZml4LCBtYXBGdW5jdGlvbiwgbWFwQ29udGV4dCkge1xuICBpZiAodHJhdmVyc2VDb250ZXh0UG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gdHJhdmVyc2VDb250ZXh0UG9vbC5wb3AoKTtcbiAgICB0cmF2ZXJzZUNvbnRleHQucmVzdWx0ID0gbWFwUmVzdWx0O1xuICAgIHRyYXZlcnNlQ29udGV4dC5rZXlQcmVmaXggPSBrZXlQcmVmaXg7XG4gICAgdHJhdmVyc2VDb250ZXh0LmZ1bmMgPSBtYXBGdW5jdGlvbjtcbiAgICB0cmF2ZXJzZUNvbnRleHQuY29udGV4dCA9IG1hcENvbnRleHQ7XG4gICAgdHJhdmVyc2VDb250ZXh0LmNvdW50ID0gMDtcbiAgICByZXR1cm4gdHJhdmVyc2VDb250ZXh0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICByZXN1bHQ6IG1hcFJlc3VsdCxcbiAgICAgIGtleVByZWZpeDoga2V5UHJlZml4LFxuICAgICAgZnVuYzogbWFwRnVuY3Rpb24sXG4gICAgICBjb250ZXh0OiBtYXBDb250ZXh0LFxuICAgICAgY291bnQ6IDBcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbGVhc2VUcmF2ZXJzZUNvbnRleHQodHJhdmVyc2VDb250ZXh0KSB7XG4gIHRyYXZlcnNlQ29udGV4dC5yZXN1bHQgPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQua2V5UHJlZml4ID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmZ1bmMgPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQuY29udGV4dCA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5jb3VudCA9IDA7XG4gIGlmICh0cmF2ZXJzZUNvbnRleHRQb29sLmxlbmd0aCA8IFBPT0xfU0laRSkge1xuICAgIHRyYXZlcnNlQ29udGV4dFBvb2wucHVzaCh0cmF2ZXJzZUNvbnRleHQpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5hbWVTb0ZhciBOYW1lIG9mIHRoZSBrZXkgcGF0aCBzbyBmYXIuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gaW52b2tlIHdpdGggZWFjaCBjaGlsZCBmb3VuZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBVc2VkIHRvIHBhc3MgaW5mb3JtYXRpb24gdGhyb3VnaG91dCB0aGUgdHJhdmVyc2FsXG4gKiBwcm9jZXNzLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCBuYW1lU29GYXIsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgY2hpbGRyZW47XG5cbiAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgIC8vIEFsbCBvZiB0aGUgYWJvdmUgYXJlIHBlcmNlaXZlZCBhcyBudWxsLlxuICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgfVxuXG4gIHZhciBpbnZva2VDYWxsYmFjayA9IGZhbHNlO1xuXG4gIGlmIChjaGlsZHJlbiA9PT0gbnVsbCkge1xuICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgc3dpdGNoIChjaGlsZHJlbi4kJHR5cGVvZikge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ0FMTF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUkVUVVJOX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbnZva2VDYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKHRyYXZlcnNlQ29udGV4dCwgY2hpbGRyZW4sXG4gICAgLy8gSWYgaXQncyB0aGUgb25seSBjaGlsZCwgdHJlYXQgdGhlIG5hbWUgYXMgaWYgaXQgd2FzIHdyYXBwZWQgaW4gYW4gYXJyYXlcbiAgICAvLyBzbyB0aGF0IGl0J3MgY29uc2lzdGVudCBpZiB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGdyb3dzLlxuICAgIG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGRyZW4sIDApIDogbmFtZVNvRmFyKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHZhciBjaGlsZDtcbiAgdmFyIG5leHROYW1lO1xuICB2YXIgc3VidHJlZUNvdW50ID0gMDsgLy8gQ291bnQgb2YgY2hpbGRyZW4gZm91bmQgaW4gdGhlIGN1cnJlbnQgc3VidHJlZS5cbiAgdmFyIG5leHROYW1lUHJlZml4ID0gbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiA6IG5hbWVTb0ZhciArIFNVQlNFUEFSQVRPUjtcblxuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaSk7XG4gICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKGNoaWxkcmVuKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHtcbiAgICAgICAgLy8gV2FybiBhYm91dCB1c2luZyBNYXBzIGFzIGNoaWxkcmVuXG4gICAgICAgIGlmIChpdGVyYXRvckZuID09PSBjaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgICAgd2FybmluZyhkaWRXYXJuQWJvdXRNYXBzLCAnVXNpbmcgTWFwcyBhcyBjaGlsZHJlbiBpcyB1bnN1cHBvcnRlZCBhbmQgd2lsbCBsaWtlbHkgeWllbGQgJyArICd1bmV4cGVjdGVkIHJlc3VsdHMuIENvbnZlcnQgaXQgdG8gYSBzZXF1ZW5jZS9pdGVyYWJsZSBvZiBrZXllZCAnICsgJ1JlYWN0RWxlbWVudHMgaW5zdGVhZC4lcycsIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpKTtcbiAgICAgICAgICBkaWRXYXJuQWJvdXRNYXBzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoY2hpbGRyZW4pO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICB2YXIgaWkgPSAwO1xuICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICBjaGlsZCA9IHN0ZXAudmFsdWU7XG4gICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgYWRkZW5kdW0gPSAnJztcbiAgICAgIHtcbiAgICAgICAgYWRkZW5kdW0gPSAnIElmIHlvdSBtZWFudCB0byByZW5kZXIgYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuLCB1c2UgYW4gYXJyYXkgJyArICdpbnN0ZWFkLicgKyBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKTtcbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZHJlblN0cmluZyA9ICcnICsgY2hpbGRyZW47XG4gICAgICBpbnZhcmlhbnQoZmFsc2UsICdPYmplY3RzIGFyZSBub3QgdmFsaWQgYXMgYSBSZWFjdCBjaGlsZCAoZm91bmQ6ICVzKS4lcycsIGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZywgYWRkZW5kdW0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdWJ0cmVlQ291bnQ7XG59XG5cbi8qKlxuICogVHJhdmVyc2VzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCwgYnV0XG4gKiBtaWdodCBhbHNvIGJlIHNwZWNpZmllZCB0aHJvdWdoIGF0dHJpYnV0ZXM6XG4gKlxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmNoaWxkcmVuLCAuLi4pYFxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmxlZnRQYW5lbENoaWxkcmVuLCAuLi4pYFxuICpcbiAqIFRoZSBgdHJhdmVyc2VDb250ZXh0YCBpcyBhbiBvcHRpb25hbCBhcmd1bWVudCB0aGF0IGlzIHBhc3NlZCB0aHJvdWdoIHRoZVxuICogZW50aXJlIHRyYXZlcnNhbC4gSXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgYWNjdW11bGF0aW9ucyBvciBhbnl0aGluZyBlbHNlIHRoYXRcbiAqIHRoZSBjYWxsYmFjayBtaWdodCBmaW5kIHJlbGV2YW50LlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgb2JqZWN0LlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIFRvIGludm9rZSB1cG9uIHRyYXZlcnNpbmcgZWFjaCBjaGlsZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBDb250ZXh0IGZvciB0cmF2ZXJzYWwuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCAnJywgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgYSBrZXkgc3RyaW5nIHRoYXQgaWRlbnRpZmllcyBhIGNvbXBvbmVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBjb21wb25lbnQgQSBjb21wb25lbnQgdGhhdCBjb3VsZCBjb250YWluIGEgbWFudWFsIGtleS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCB0aGF0IGlzIHVzZWQgaWYgYSBtYW51YWwga2V5IGlzIG5vdCBwcm92aWRlZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50S2V5KGNvbXBvbmVudCwgaW5kZXgpIHtcbiAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnb2JqZWN0JyAmJiBjb21wb25lbnQgIT09IG51bGwgJiYgY29tcG9uZW50LmtleSAhPSBudWxsKSB7XG4gICAgLy8gRXhwbGljaXQga2V5XG4gICAgcmV0dXJuIGVzY2FwZShjb21wb25lbnQua2V5KTtcbiAgfVxuICAvLyBJbXBsaWNpdCBrZXkgZGV0ZXJtaW5lZCBieSB0aGUgaW5kZXggaW4gdGhlIHNldFxuICByZXR1cm4gaW5kZXgudG9TdHJpbmcoMzYpO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGQoYm9va0tlZXBpbmcsIGNoaWxkLCBuYW1lKSB7XG4gIHZhciBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG4gIGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgdGhyb3VnaCBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5mb3JlYWNoXG4gKlxuICogVGhlIHByb3ZpZGVkIGZvckVhY2hGdW5jKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gKiBAcGFyYW0geyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgZm9yIGZvckVhY2hDb250ZXh0LlxuICovXG5mdW5jdGlvbiBmb3JFYWNoQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gZ2V0UG9vbGVkVHJhdmVyc2VDb250ZXh0KG51bGwsIG51bGwsIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0KGJvb2tLZWVwaW5nLCBjaGlsZCwgY2hpbGRLZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGJvb2tLZWVwaW5nLnJlc3VsdCxcbiAgICAgIGtleVByZWZpeCA9IGJvb2tLZWVwaW5nLmtleVByZWZpeCxcbiAgICAgIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jLFxuICAgICAgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cblxuICB2YXIgbWFwcGVkQ2hpbGQgPSBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXBwZWRDaGlsZCkpIHtcbiAgICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKG1hcHBlZENoaWxkLCByZXN1bHQsIGNoaWxkS2V5LCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKG1hcHBlZENoaWxkICE9IG51bGwpIHtcbiAgICBpZiAoaXNWYWxpZEVsZW1lbnQobWFwcGVkQ2hpbGQpKSB7XG4gICAgICBtYXBwZWRDaGlsZCA9IGNsb25lQW5kUmVwbGFjZUtleShtYXBwZWRDaGlsZCxcbiAgICAgIC8vIEtlZXAgYm90aCB0aGUgKG1hcHBlZCkgYW5kIG9sZCBrZXlzIGlmIHRoZXkgZGlmZmVyLCBqdXN0IGFzXG4gICAgICAvLyB0cmF2ZXJzZUFsbENoaWxkcmVuIHVzZWQgdG8gZG8gZm9yIG9iamVjdHMgYXMgY2hpbGRyZW5cbiAgICAgIGtleVByZWZpeCArIChtYXBwZWRDaGlsZC5rZXkgJiYgKCFjaGlsZCB8fCBjaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkgPyBlc2NhcGVVc2VyUHJvdmlkZWRLZXkobWFwcGVkQ2hpbGQua2V5KSArICcvJyA6ICcnKSArIGNoaWxkS2V5KTtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2gobWFwcGVkQ2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIGFycmF5LCBwcmVmaXgsIGZ1bmMsIGNvbnRleHQpIHtcbiAgdmFyIGVzY2FwZWRQcmVmaXggPSAnJztcbiAgaWYgKHByZWZpeCAhPSBudWxsKSB7XG4gICAgZXNjYXBlZFByZWZpeCA9IGVzY2FwZVVzZXJQcm92aWRlZEtleShwcmVmaXgpICsgJy8nO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQoYXJyYXksIGVzY2FwZWRQcmVmaXgsIGZ1bmMsIGNvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0LCB0cmF2ZXJzZUNvbnRleHQpO1xuICByZWxlYXNlVHJhdmVyc2VDb250ZXh0KHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogTWFwcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5tYXBcbiAqXG4gKiBUaGUgcHJvdmlkZWQgbWFwRnVuY3Rpb24oY2hpbGQsIGtleSwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmdW5jIFRoZSBtYXAgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgQ29udGV4dCBmb3IgbWFwRnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtvYmplY3R9IE9iamVjdCBjb250YWluaW5nIHRoZSBvcmRlcmVkIG1hcCBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuYywgY29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZnVuYywgY29udGV4dCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ291bnQgdGhlIG51bWJlciBvZiBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzXG4gKiBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uY291bnRcbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbiwgY29udGV4dCkge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwsIG51bGwpO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4udG9hcnJheVxuICovXG5mdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGNoaWxkIGluIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiBhbmQgdmVyaWZpZXMgdGhhdCB0aGVyZVxuICogaXMgb25seSBvbmUgY2hpbGQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5vbmx5XG4gKlxuICogVGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgYSBzaW5nbGUgY2hpbGQgZ2V0c1xuICogcGFzc2VkIHdpdGhvdXQgYSB3cmFwcGVyLCBidXQgdGhlIHB1cnBvc2Ugb2YgdGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdG9cbiAqIGFic3RyYWN0IGF3YXkgdGhlIHBhcnRpY3VsYXIgc3RydWN0dXJlIG9mIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gY2hpbGRyZW4gQ2hpbGQgY29sbGVjdGlvbiBzdHJ1Y3R1cmUuXG4gKiBAcmV0dXJuIHtSZWFjdEVsZW1lbnR9IFRoZSBmaXJzdCBhbmQgb25seSBgUmVhY3RFbGVtZW50YCBjb250YWluZWQgaW4gdGhlXG4gKiBzdHJ1Y3R1cmUuXG4gKi9cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICAhaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3QuQ2hpbGRyZW4ub25seSBleHBlY3RlZCB0byByZWNlaXZlIGEgc2luZ2xlIFJlYWN0IGVsZW1lbnQgY2hpbGQuJykgOiB2b2lkIDA7XG4gIHJldHVybiBjaGlsZHJlbjtcbn1cblxudmFyIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUgPSBmdW5jdGlvbiAobmFtZSwgc291cmNlLCBvd25lck5hbWUpIHtcbiAgcmV0dXJuICdcXG4gICAgaW4gJyArIChuYW1lIHx8ICdVbmtub3duJykgKyAoc291cmNlID8gJyAoYXQgJyArIHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJykgKyAnOicgKyBzb3VyY2UubGluZU51bWJlciArICcpJyA6IG93bmVyTmFtZSA/ICcgKGNyZWF0ZWQgYnkgJyArIG93bmVyTmFtZSArICcpJyA6ICcnKTtcbn07XG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUoZmliZXIpIHtcbiAgdmFyIHR5cGUgPSBmaWJlci50eXBlO1xuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWU7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogUmVhY3RFbGVtZW50VmFsaWRhdG9yIHByb3ZpZGVzIGEgd3JhcHBlciBhcm91bmQgYSBlbGVtZW50IGZhY3RvcnlcbiAqIHdoaWNoIHZhbGlkYXRlcyB0aGUgcHJvcHMgcGFzc2VkIHRvIHRoZSBlbGVtZW50LiBUaGlzIGlzIGludGVuZGVkIHRvIGJlXG4gKiB1c2VkIG9ubHkgaW4gREVWIGFuZCBjb3VsZCBiZSByZXBsYWNlZCBieSBhIHN0YXRpYyB0eXBlIGNoZWNrZXIgZm9yIGxhbmd1YWdlc1xuICogdGhhdCBzdXBwb3J0IGl0LlxuICovXG5cbntcbiAgdmFyIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gbnVsbDtcblxuICB2YXIgcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24gPSBmYWxzZTtcblxuICB2YXIgZ2V0RGlzcGxheU5hbWUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnI2VtcHR5JztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAnI3RleHQnO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LnR5cGU7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50LnR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUpIHtcbiAgICAgIHJldHVybiAnUmVhY3QuRnJhZ21lbnQnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZWxlbWVudC50eXBlLmRpc3BsYXlOYW1lIHx8IGVsZW1lbnQudHlwZS5uYW1lIHx8ICdVbmtub3duJztcbiAgICB9XG4gIH07XG5cbiAgdmFyIGdldFN0YWNrQWRkZW5kdW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YWNrID0gJyc7XG4gICAgaWYgKGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KSB7XG4gICAgICB2YXIgbmFtZSA9IGdldERpc3BsYXlOYW1lKGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KTtcbiAgICAgIHZhciBvd25lciA9IGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50Ll9vd25lcjtcbiAgICAgIHN0YWNrICs9IGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQuX3NvdXJjZSwgb3duZXIgJiYgZ2V0Q29tcG9uZW50TmFtZShvd25lcikpO1xuICAgIH1cbiAgICBzdGFjayArPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKSB8fCAnJztcbiAgICByZXR1cm4gc3RhY2s7XG4gIH07XG5cbiAgdmFyIFZBTElEX0ZSQUdNRU5UX1BST1BTID0gbmV3IE1hcChbWydjaGlsZHJlbicsIHRydWVdLCBbJ2tleScsIHRydWVdXSk7XG59XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bShlbGVtZW50UHJvcHMpIHtcbiAgaWYgKGVsZW1lbnRQcm9wcyAhPT0gbnVsbCAmJiBlbGVtZW50UHJvcHMgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50UHJvcHMuX19zb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBzb3VyY2UgPSBlbGVtZW50UHJvcHMuX19zb3VyY2U7XG4gICAgdmFyIGZpbGVOYW1lID0gc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICB2YXIgbGluZU51bWJlciA9IHNvdXJjZS5saW5lTnVtYmVyO1xuICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgeW91ciBjb2RlIGF0ICcgKyBmaWxlTmFtZSArICc6JyArIGxpbmVOdW1iZXIgKyAnLic7XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlcmUncyBubyBrZXkgZXhwbGljaXRseSBzZXQgb24gZHluYW1pYyBhcnJheXMgb2YgY2hpbGRyZW4gb3JcbiAqIG9iamVjdCBrZXlzIGFyZSBub3QgdmFsaWQuIFRoaXMgYWxsb3dzIHVzIHRvIGtlZXAgdHJhY2sgb2YgY2hpbGRyZW4gYmV0d2VlblxuICogdXBkYXRlcy5cbiAqL1xudmFyIG93bmVySGFzS2V5VXNlV2FybmluZyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpIHtcbiAgdmFyIGluZm8gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcblxuICBpZiAoIWluZm8pIHtcbiAgICB2YXIgcGFyZW50TmFtZSA9IHR5cGVvZiBwYXJlbnRUeXBlID09PSAnc3RyaW5nJyA/IHBhcmVudFR5cGUgOiBwYXJlbnRUeXBlLmRpc3BsYXlOYW1lIHx8IHBhcmVudFR5cGUubmFtZTtcbiAgICBpZiAocGFyZW50TmFtZSkge1xuICAgICAgaW5mbyA9ICdcXG5cXG5DaGVjayB0aGUgdG9wLWxldmVsIHJlbmRlciBjYWxsIHVzaW5nIDwnICsgcGFyZW50TmFtZSArICc+Lic7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmZvO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIGV4cGxpY2l0IGtleSBhc3NpZ25lZCB0byBpdC5cbiAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gKiBoYXZlIGEgXCJrZXlcIiBwcm9wZXJ0eSBhc3NpZ25lZCB0byBpdC4gRXJyb3Igc3RhdHVzZXMgYXJlIGNhY2hlZCBzbyBhIHdhcm5pbmdcbiAqIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUV4cGxpY2l0S2V5KGVsZW1lbnQsIHBhcmVudFR5cGUpIHtcbiAgaWYgKCFlbGVtZW50Ll9zdG9yZSB8fCBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgfHwgZWxlbWVudC5rZXkgIT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuXG4gIHZhciBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvID0gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKTtcbiAgaWYgKG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgIHJldHVybjtcbiAgfVxuICBvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10gPSB0cnVlO1xuXG4gIC8vIFVzdWFsbHkgdGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIG9mZmVuZGVyLCBidXQgaWYgaXQgYWNjZXB0cyBjaGlsZHJlbiBhcyBhXG4gIC8vIHByb3BlcnR5LCBpdCBtYXkgYmUgdGhlIGNyZWF0b3Igb2YgdGhlIGNoaWxkIHRoYXQncyByZXNwb25zaWJsZSBmb3JcbiAgLy8gYXNzaWduaW5nIGl0IGEga2V5LlxuICB2YXIgY2hpbGRPd25lciA9ICcnO1xuICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Ll9vd25lciAmJiBlbGVtZW50Ll9vd25lciAhPT0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIC8vIEdpdmUgdGhlIGNvbXBvbmVudCB0aGF0IG9yaWdpbmFsbHkgY3JlYXRlZCB0aGlzIGNoaWxkLlxuICAgIGNoaWxkT3duZXIgPSAnIEl0IHdhcyBwYXNzZWQgYSBjaGlsZCBmcm9tICcgKyBnZXRDb21wb25lbnROYW1lKGVsZW1lbnQuX293bmVyKSArICcuJztcbiAgfVxuXG4gIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gZWxlbWVudDtcbiAge1xuICAgIHdhcm5pbmcoZmFsc2UsICdFYWNoIGNoaWxkIGluIGFuIGFycmF5IG9yIGl0ZXJhdG9yIHNob3VsZCBoYXZlIGEgdW5pcXVlIFwia2V5XCIgcHJvcC4nICsgJyVzJXMgU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1rZXlzIGZvciBtb3JlIGluZm9ybWF0aW9uLiVzJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lciwgZ2V0U3RhY2tBZGRlbmR1bSgpKTtcbiAgfVxuICBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IG51bGw7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG4gICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChpc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gRW50cnkgaXRlcmF0b3JzIHVzZWQgdG8gcHJvdmlkZSBpbXBsaWNpdCBrZXlzLFxuICAgICAgLy8gYnV0IG5vdyB3ZSBwcmludCBhIHNlcGFyYXRlIHdhcm5pbmcgZm9yIHRoZW0gbGF0ZXIuXG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgdmFyIGNvbXBvbmVudENsYXNzID0gZWxlbWVudC50eXBlO1xuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lID0gY29tcG9uZW50Q2xhc3MuZGlzcGxheU5hbWUgfHwgY29tcG9uZW50Q2xhc3MubmFtZTtcbiAgdmFyIHByb3BUeXBlcyA9IGNvbXBvbmVudENsYXNzLnByb3BUeXBlcztcbiAgaWYgKHByb3BUeXBlcykge1xuICAgIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gZWxlbWVudDtcbiAgICBjaGVja1Byb3BUeXBlcyhwcm9wVHlwZXMsIGVsZW1lbnQucHJvcHMsICdwcm9wJywgbmFtZSwgZ2V0U3RhY2tBZGRlbmR1bSk7XG4gICAgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBudWxsO1xuICB9IGVsc2UgaWYgKGNvbXBvbmVudENsYXNzLlByb3BUeXBlcyAhPT0gdW5kZWZpbmVkICYmICFwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93bikge1xuICAgIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICB3YXJuaW5nKGZhbHNlLCAnQ29tcG9uZW50ICVzIGRlY2xhcmVkIGBQcm9wVHlwZXNgIGluc3RlYWQgb2YgYHByb3BUeXBlc2AuIERpZCB5b3UgbWlzc3BlbGwgdGhlIHByb3BlcnR5IGFzc2lnbm1lbnQ/JywgbmFtZSB8fCAnVW5rbm93bicpO1xuICB9XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgd2FybmluZyhjb21wb25lbnRDbGFzcy5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQsICdnZXREZWZhdWx0UHJvcHMgaXMgb25seSB1c2VkIG9uIGNsYXNzaWMgUmVhY3QuY3JlYXRlQ2xhc3MgJyArICdkZWZpbml0aW9ucy4gVXNlIGEgc3RhdGljIHByb3BlcnR5IG5hbWVkIGBkZWZhdWx0UHJvcHNgIGluc3RlYWQuJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBHaXZlbiBhIGZyYWdtZW50LCB2YWxpZGF0ZSB0aGF0IGl0IGNhbiBvbmx5IGJlIHByb3ZpZGVkIHdpdGggZnJhZ21lbnQgcHJvcHNcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBmcmFnbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZnJhZ21lbnQpIHtcbiAgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBmcmFnbWVudDtcblxuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBPYmplY3Qua2V5cyhmcmFnbWVudC5wcm9wcylbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICB2YXIga2V5ID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgIGlmICghVkFMSURfRlJBR01FTlRfUFJPUFMuaGFzKGtleSkpIHtcbiAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgcHJvcCBgJXNgIHN1cHBsaWVkIHRvIGBSZWFjdC5GcmFnbWVudGAuICcgKyAnUmVhY3QuRnJhZ21lbnQgY2FuIG9ubHkgaGF2ZSBga2V5YCBhbmQgYGNoaWxkcmVuYCBwcm9wcy4lcycsIGtleSwgZ2V0U3RhY2tBZGRlbmR1bSgpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbJ3JldHVybiddKSB7XG4gICAgICAgIF9pdGVyYXRvclsncmV0dXJuJ10oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChmcmFnbWVudC5yZWYgIT09IG51bGwpIHtcbiAgICB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhdHRyaWJ1dGUgYHJlZmAgc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4lcycsIGdldFN0YWNrQWRkZW5kdW0oKSk7XG4gIH1cblxuICBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRXaXRoVmFsaWRhdGlvbih0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgdmFyIHZhbGlkVHlwZSA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ3N5bWJvbCcgfHwgdHlwZW9mIHR5cGUgPT09ICdudW1iZXInO1xuICAvLyBXZSB3YXJuIGluIHRoaXMgY2FzZSBidXQgZG9uJ3QgdGhyb3cuIFdlIGV4cGVjdCB0aGUgZWxlbWVudCBjcmVhdGlvbiB0b1xuICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuICBpZiAoIXZhbGlkVHlwZSkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh0eXBlKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgXCJpdCdzIGRlZmluZWQgaW4sIG9yIHlvdSBtaWdodCBoYXZlIG1peGVkIHVwIGRlZmF1bHQgYW5kIG5hbWVkIGltcG9ydHMuXCI7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUluZm8gPSBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bShwcm9wcyk7XG4gICAgaWYgKHNvdXJjZUluZm8pIHtcbiAgICAgIGluZm8gKz0gc291cmNlSW5mbztcbiAgICB9IGVsc2Uge1xuICAgICAgaW5mbyArPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICB9XG5cbiAgICBpbmZvICs9IGdldFN0YWNrQWRkZW5kdW0oKSB8fCAnJztcblxuICAgIHdhcm5pbmcoZmFsc2UsICdSZWFjdC5jcmVhdGVFbGVtZW50OiB0eXBlIGlzIGludmFsaWQgLS0gZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciAnICsgJ2J1aWx0LWluIGNvbXBvbmVudHMpIG9yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgJyArICdjb21wb25lbnRzKSBidXQgZ290OiAlcy4lcycsIHR5cGUgPT0gbnVsbCA/IHR5cGUgOiB0eXBlb2YgdHlwZSwgaW5mbyk7XG4gIH1cblxuICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAvLyBUaGUgcmVzdWx0IGNhbiBiZSBudWxsaXNoIGlmIGEgbW9jayBvciBhIGN1c3RvbSBmdW5jdGlvbiBpcyB1c2VkLlxuICAvLyBUT0RPOiBEcm9wIHRoaXMgd2hlbiB0aGVzZSBhcmUgbm8gbG9uZ2VyIGFsbG93ZWQgYXMgdGhlIHR5cGUgYXJndW1lbnQuXG4gIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gIC8vIGRvZXNuJ3QgZXhwZWN0IGEgbm9uLXN0cmluZy9mdW5jdGlvbiB0eXBlIGFuZCBjYW4gdGhyb3cgY29uZnVzaW5nIGVycm9ycy5cbiAgLy8gV2UgZG9uJ3Qgd2FudCBleGNlcHRpb24gYmVoYXZpb3IgdG8gZGlmZmVyIGJldHdlZW4gZGV2IGFuZCBwcm9kLlxuICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAvLyBmaXhlZCwgdGhlIGtleSB3YXJuaW5ncyB3aWxsIGFwcGVhci4pXG4gIGlmICh2YWxpZFR5cGUpIHtcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCB0eXBlKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzeW1ib2wnICYmIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUpIHtcbiAgICB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZWxlbWVudCk7XG4gIH0gZWxzZSB7XG4gICAgdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRmFjdG9yeVdpdGhWYWxpZGF0aW9uKHR5cGUpIHtcbiAgdmFyIHZhbGlkYXRlZEZhY3RvcnkgPSBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24uYmluZChudWxsLCB0eXBlKTtcbiAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gIHZhbGlkYXRlZEZhY3RvcnkudHlwZSA9IHR5cGU7XG5cbiAge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWxpZGF0ZWRGYWN0b3J5LCAndHlwZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvd1ByaW9yaXR5V2FybmluZyQxKGZhbHNlLCAnRmFjdG9yeS50eXBlIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB0aGUgY2xhc3MgZGlyZWN0bHkgJyArICdiZWZvcmUgcGFzc2luZyBpdCB0byBjcmVhdGVGYWN0b3J5LicpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3R5cGUnLCB7XG4gICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHZhbGlkYXRlZEZhY3Rvcnk7XG59XG5cbmZ1bmN0aW9uIGNsb25lRWxlbWVudFdpdGhWYWxpZGF0aW9uKGVsZW1lbnQsIHByb3BzLCBjaGlsZHJlbikge1xuICB2YXIgbmV3RWxlbWVudCA9IGNsb25lRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgbmV3RWxlbWVudC50eXBlKTtcbiAgfVxuICB2YWxpZGF0ZVByb3BUeXBlcyhuZXdFbGVtZW50KTtcbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59XG5cbnZhciBSZWFjdCA9IHtcbiAgQ2hpbGRyZW46IHtcbiAgICBtYXA6IG1hcENoaWxkcmVuLFxuICAgIGZvckVhY2g6IGZvckVhY2hDaGlsZHJlbixcbiAgICBjb3VudDogY291bnRDaGlsZHJlbixcbiAgICB0b0FycmF5OiB0b0FycmF5LFxuICAgIG9ubHk6IG9ubHlDaGlsZFxuICB9LFxuXG4gIENvbXBvbmVudDogQ29tcG9uZW50LFxuICBQdXJlQ29tcG9uZW50OiBQdXJlQ29tcG9uZW50LFxuICB1bnN0YWJsZV9Bc3luY0NvbXBvbmVudDogQXN5bmNDb21wb25lbnQsXG5cbiAgRnJhZ21lbnQ6IFJFQUNUX0ZSQUdNRU5UX1RZUEUsXG5cbiAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uLFxuICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudFdpdGhWYWxpZGF0aW9uLFxuICBjcmVhdGVGYWN0b3J5OiBjcmVhdGVGYWN0b3J5V2l0aFZhbGlkYXRpb24sXG4gIGlzVmFsaWRFbGVtZW50OiBpc1ZhbGlkRWxlbWVudCxcblxuICB2ZXJzaW9uOiBSZWFjdFZlcnNpb24sXG5cbiAgX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ6IHtcbiAgICBSZWFjdEN1cnJlbnRPd25lcjogUmVhY3RDdXJyZW50T3duZXIsXG4gICAgLy8gVXNlZCBieSByZW5kZXJlcnMgdG8gYXZvaWQgYnVuZGxpbmcgb2JqZWN0LWFzc2lnbiB0d2ljZSBpbiBVTUQgYnVuZGxlczpcbiAgICBhc3NpZ246IF9hc3NpZ25cbiAgfVxufTtcblxue1xuICBfYXNzaWduKFJlYWN0Ll9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVELCB7XG4gICAgLy8gVGhlc2Ugc2hvdWxkIG5vdCBiZSBpbmNsdWRlZCBpbiBwcm9kdWN0aW9uLlxuICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWU6IFJlYWN0RGVidWdDdXJyZW50RnJhbWUsXG4gICAgLy8gU2hpbSBmb3IgUmVhY3QgRE9NIDE2LjAuMCB3aGljaCBzdGlsbCBkZXN0cnVjdHVyZWQgKGJ1dCBub3QgdXNlZCkgdGhpcy5cbiAgICAvLyBUT0RPOiByZW1vdmUgaW4gUmVhY3QgMTcuMC5cbiAgICBSZWFjdENvbXBvbmVudFRyZWVIb29rOiB7fVxuICB9KTtcbn1cblxuXG5cbnZhciBSZWFjdCQyID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGRlZmF1bHQ6IFJlYWN0XG59KTtcblxudmFyIFJlYWN0JDMgPSAoIFJlYWN0JDIgJiYgUmVhY3QgKSB8fCBSZWFjdCQyO1xuXG4vLyBUT0RPOiBkZWNpZGUgb24gdGhlIHRvcC1sZXZlbCBleHBvcnQgZm9ybS5cbi8vIFRoaXMgaXMgaGFja3kgYnV0IG1ha2VzIGl0IHdvcmsgd2l0aCBib3RoIFJvbGx1cCBhbmQgSmVzdC5cbnZhciByZWFjdCA9IFJlYWN0JDNbJ2RlZmF1bHQnXSA/IFJlYWN0JDNbJ2RlZmF1bHQnXSA6IFJlYWN0JDM7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVhY3Q7XG4gIH0pKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC9janMvcmVhY3QuZGV2ZWxvcG1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCBGaWZ0aEVkaXRpb25TUkQgZnJvbSAnLi9zaGVldHMvNXRoIEVkaXRpb24gT0dMJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEZpZnRoRWRpdGlvblNSRCxcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgeyBjb2xvciB9IGZyb20gJy4uL3N0eWxlcydcblxuY29uc3QgYXR0cmlidXRlcyA9IFtcbiAgJ1N0cmVuZ3RoJyxcbiAgJ0RleHRlcml0eScsXG4gICdDb25zdGl0dXRpb24nLFxuICAnSW50ZWxsaWdlbmNlJyxcbiAgJ1dpc2RvbScsXG4gICdDaGFyaXNtYSdcbl1cblxuY29uc3Qgc2tpbGxzID0gW1xuICB7XG4gICAgXCJjb2RlXCI6IFwiYWNyb2JhdGljc1wiLFxuICAgIFwibmFtZVwiOiBcIkFjcm9iYXRpY3NcIixcbiAgICBcInR5cGVcIjogXCJEZXh0ZXJpdHlcIlxuICB9LFxuICB7XG4gICAgXCJjb2RlXCI6IFwiYW5pbWFsX2hhbmRsaW5nXCIsXG4gICAgXCJuYW1lXCI6IFwiQW5pbWFsIEhhbmRsaW5nXCIsXG4gICAgXCJ0eXBlXCI6IFwiV2lzZG9tXCJcbiAgfSxcbiAge1xuICAgIFwiY29kZVwiOiBcImFyY2FuYVwiLFxuICAgIFwibmFtZVwiOiBcIkFyY2FuYVwiLFxuICAgIFwidHlwZVwiOiBcIkludGVsbGlnZW5jZVwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJhdGhsZXRpY3NcIixcbiAgICBcIm5hbWVcIjogXCJBdGhsZXRpY3NcIixcbiAgICBcInR5cGVcIjogXCJTdHJlbmd0aFwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJkZWNlcHRpb25cIixcbiAgICBcIm5hbWVcIjogXCJEZWNlcHRpb25cIixcbiAgICBcInR5cGVcIjogXCJDaGFyaXNtYVwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJoaXN0b3J5XCIsXG4gICAgXCJuYW1lXCI6IFwiSGlzdG9yeVwiLFxuICAgIFwidHlwZVwiOiBcIkludGVsbGlnZW5jZVwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJpbnNpZ2h0XCIsXG4gICAgXCJuYW1lXCI6IFwiSW5zaWdodFwiLFxuICAgIFwidHlwZVwiOiBcIldpc2RvbVwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJpbnRpbWlkYXRpb25cIixcbiAgICBcIm5hbWVcIjogXCJJbnRpbWlkYXRpb25cIixcbiAgICBcInR5cGVcIjogXCJDaGFyaXNtYVwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJpbnZlc3RpZ2F0aW9uXCIsXG4gICAgXCJuYW1lXCI6IFwiSW52ZXN0aWdhdGlvblwiLFxuICAgIFwidHlwZVwiOiBcIkludGVsbGlnZW5jZVwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJtZWRpY2luZVwiLFxuICAgIFwibmFtZVwiOiBcIk1lZGljaW5lXCIsXG4gICAgXCJ0eXBlXCI6IFwiV2lzZG9tXCJcbiAgfSxcbiAge1xuICAgIFwiY29kZVwiOiBcIm5hdHVyZVwiLFxuICAgIFwibmFtZVwiOiBcIk5hdHVyZVwiLFxuICAgIFwidHlwZVwiOiBcIkludGVsbGlnZW5jZVwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJwZXJjZXB0aW9uXCIsXG4gICAgXCJuYW1lXCI6IFwiUGVyY2VwdGlvblwiLFxuICAgIFwidHlwZVwiOiBcIldpc2RvbVwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJwZXJmb3JtYW5jZVwiLFxuICAgIFwibmFtZVwiOiBcIlBlcmZvcm1hbmNlXCIsXG4gICAgXCJ0eXBlXCI6IFwiQ2hhcmlzbWFcIlxuICB9LFxuICB7XG4gICAgXCJjb2RlXCI6IFwicGVyc3Vhc2lvblwiLFxuICAgIFwibmFtZVwiOiBcIlBlcnN1YXNpb25cIixcbiAgICBcInR5cGVcIjogXCJDaGFyaXNtYVwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJyZWxpZ2lvblwiLFxuICAgIFwibmFtZVwiOiBcIlJlbGlnaW9uXCIsXG4gICAgXCJ0eXBlXCI6IFwiSW50ZWxsaWdlbmNlXCJcbiAgfSxcbiAge1xuICAgIFwiY29kZVwiOiBcInNsZWlnaHRfb2ZfaGFuZFwiLFxuICAgIFwibmFtZVwiOiBcIlNsZWlnaHQgb2YgSGFuZFwiLFxuICAgIFwidHlwZVwiOiBcIkRleHRlcml0eVwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJzdGVhbHRoXCIsXG4gICAgXCJuYW1lXCI6IFwiU3RlYWx0aFwiLFxuICAgIFwidHlwZVwiOiBcIkRleHRlcml0eVwiXG4gIH0sXG4gIHtcbiAgICBcImNvZGVcIjogXCJzdXJ2aXZhbFwiLFxuICAgIFwibmFtZVwiOiBcIlN1cnZpdmFsXCIsXG4gICAgXCJ0eXBlXCI6IFwiV2lzZG9tXCJcbiAgfVxuXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJTaGVldCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcblxuICAgIHRoaXMub25BZGRBdHRhY2sgPSB0aGlzLm9uQWRkQXR0YWNrLmJpbmQodGhpcylcbiAgICB0aGlzLm9uQWRkRXF1aXBtZW50ID0gdGhpcy5vbkFkZEVxdWlwbWVudC5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbkFkZFByb2ZpY2llbmN5ID0gdGhpcy5vbkFkZFByb2ZpY2llbmN5LmJpbmQodGhpcylcbiAgICB0aGlzLm9uQWRkVG9vbCA9IHRoaXMub25BZGRUb29sLmJpbmQodGhpcylcbiAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbkNoYW5nZVRhYiA9IHRoaXMub25DaGFuZ2VUYWIuYmluZCh0aGlzKVxuICAgIHRoaXMub25SZW1vdmVUb29sID0gdGhpcy5vblJlbW92ZVRvb2wuYmluZCh0aGlzKVxuICAgIHRoaXMub25Ub2dnbGVBZHZhbnRhZ2UgPSB0aGlzLm9uVG9nZ2xlQWR2YW50YWdlLmJpbmQodGhpcylcbiAgICB0aGlzLm9uVG9nZ2xlRWRpdE5QQyA9IHRoaXMub25Ub2dnbGVFZGl0TlBDLmJpbmQodGhpcylcbiAgICB0aGlzLm9uVG9nZ2xlRWRpdGluZyA9IHRoaXMub25Ub2dnbGVFZGl0aW5nLmJpbmQodGhpcylcbiAgICB0aGlzLm9uVG9nZ2xlTlBDID0gdGhpcy5vblRvZ2dsZU5QQy5iaW5kKHRoaXMpXG4gICAgdGhpcy5vblRvZ2dsZVBDID0gdGhpcy5vblRvZ2dsZVBDLmJpbmQodGhpcylcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0FkdmFudGFnZTogcHJvcHMuY2hhcmFjdGVyLmFkdmFudGFnZSB8fCBmYWxzZSxcbiAgICAgIGlzRWRpdGluZzogZmFsc2UsXG4gICAgICBpc05QQzogdHJ1ZSB8fCBwcm9wcy5jaGFyYWN0ZXIuaXNfbnBjIHx8IGZhbHNlLFxuICAgICAgdGFiOiAwLFxuICAgIH1cbiAgfVxuXG4gIG9uQWRkQXR0YWNrICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblVwZGF0ZUF0dHJpYnV0ZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblVwZGF0ZUF0dHJpYnV0ZShcbiAgICAgICAgJ2F0dGFja3MnLFxuICAgICAgICBbXG4gICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFyYWN0ZXIuYXR0YWNrcyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhdHRyaWJ1dGU6ICdTdHJlbmd0aCcsXG4gICAgICAgICAgICBpc0VkaXRpbmc6IHRydWUsXG4gICAgICAgICAgICBpc1Byb2ZpY2llbnQ6IGZhbHNlLFxuICAgICAgICAgICAgbW9kOiAwLFxuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBvbkFkZEVxdWlwbWVudCAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25VcGRhdGVBdHRyaWJ1dGUpIHtcbiAgICAgIHRoaXMucHJvcHMub25VcGRhdGVBdHRyaWJ1dGUoXG4gICAgICAgICdlcXVpcG1lbnQnLFxuICAgICAgICBbXG4gICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFyYWN0ZXIuZXF1aXBtZW50LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlzRWRpdGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGlzRXF1aXBwZWQ6IGZhbHNlLFxuICAgICAgICAgICAgd2VpZ2h0OiAwLjEsXG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIG9uQWRkUHJvZmljaWVuY3kgKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uVXBkYXRlQXR0cmlidXRlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uVXBkYXRlQXR0cmlidXRlKFxuICAgICAgICAnb3RoZXJfcHJvZnNfYW5kX2xhbmdzJyxcbiAgICAgICAgW1xuICAgICAgICAgIC4uLnRoaXMucHJvcHMuY2hhcmFjdGVyLm90aGVyX3Byb2ZzX2FuZF9sYW5ncyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpc0VkaXRpbmc6IHRydWUsXG4gICAgICAgICAgICBwcm9maWNpZW5jeTogJycsXG4gICAgICAgICAgICB0eXBlOiAnTGFuZ3VhZ2UnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgb25BZGRUb29sICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblVwZGF0ZUF0dHJpYnV0ZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblVwZGF0ZUF0dHJpYnV0ZShcbiAgICAgICAgJ3Rvb2xzX2FuZF9za2lsbHMnLFxuICAgICAgICBbXG4gICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFyYWN0ZXIudG9vbHNfYW5kX3NraWxscyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhdHRyaWJ1dGU6ICdTdHJlbmd0aCcsXG4gICAgICAgICAgICBib251czogJycsXG4gICAgICAgICAgICBpc0VkaXRpbmc6IHRydWUsXG4gICAgICAgICAgICBtb2Q6ICcwJyxcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgb25DaGFuZ2UgKGUpIHtcbiAgICBjb25zdCBhdHRyID0gZS50YXJnZXQubmFtZVxuICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWVcbiAgICBjb25zdCBhdHRhY2tJZCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1hdHRhY2staWQnKVxuICAgIGNvbnN0IGVxdWlwbWVudElkID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWVxdWlwbWVudC1pZCcpXG4gICAgY29uc3QgdG9vbElkID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2wtaWQnKVxuICAgIGNvbnN0IG90aGVySWQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3RoZXItaWQnKVxuXG4gICAgbGV0IGRhdGEgPSB1bmRlZmluZWRcbiAgICBsZXQgYXR0cmlidXRlID0gdW5kZWZpbmVkXG4gICAgaWYgKGF0dGFja0lkICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpZCA9IH5+YXR0YWNrSWRcbiAgICAgIGF0dHJpYnV0ZSA9ICdhdHRhY2tzJ1xuICAgICAgZGF0YSA9IHRoaXMucHJvcHMuY2hhcmFjdGVyLmF0dGFja3MubWFwKChhdHRhY2ssIGkpID0+ICh7XG4gICAgICAgIC4uLmF0dGFjayxcbiAgICAgICAgYXR0cmlidXRlOiBpID09PSBpZCAmJiBhdHRyID09PSAnYXR0cmlidXRlJyA/IHZhbHVlIDogYXR0YWNrLmF0dHJpYnV0ZSxcbiAgICAgICAgbmFtZTogaSA9PT0gaWQgJiYgYXR0ciA9PT0gJ25hbWUnID8gdmFsdWUgOiBhdHRhY2submFtZSxcbiAgICAgICAgbW9kOiBpID09PSBpZCAmJiBhdHRyID09PSAnbW9kJyA/IHZhbHVlIDogYXR0YWNrLm1vZCxcbiAgICAgIH0pKVxuICAgIH0gZWxzZSBpZiAoZXF1aXBtZW50SWQgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGlkID0gfn5lcXVpcG1lbnRJZFxuICAgICAgYXR0cmlidXRlID0gJ2VxdWlwbWVudCdcbiAgICAgIGRhdGEgPSB0aGlzLnByb3BzLmNoYXJhY3Rlci5lcXVpcG1lbnQubWFwKChlcXVpcG1lbnQsIGkpID0+ICh7XG4gICAgICAgIC4uLmVxdWlwbWVudCxcbiAgICAgICAgbmFtZTogaSA9PT0gaWQgJiYgYXR0ciA9PT0gJ25hbWUnID8gdmFsdWUgOiBlcXVpcG1lbnQubmFtZSxcbiAgICAgICAgd2VpZ2h0OiBpID09PSBpZCAmJiBhdHRyID09PSAnd2VpZ2h0JyA/IHZhbHVlIDogZXF1aXBtZW50LndlaWdodCxcbiAgICAgIH0pKVxuICAgIH0gZWxzZSBpZiAodG9vbElkICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpZCA9IH5+dG9vbElkXG4gICAgICBhdHRyaWJ1dGUgPSAndG9vbHNfYW5kX3NraWxscydcbiAgICAgIGRhdGEgPSB0aGlzLnByb3BzLmNoYXJhY3Rlci50b29sc19hbmRfc2tpbGxzLm1hcCgodG9vbCwgaSkgPT4gKHtcbiAgICAgICAgLi4udG9vbCxcbiAgICAgICAgYXR0cmlidXRlOiBpID09PSBpZCAmJiBhdHRyID09PSAnYXR0cmlidXRlJyA/IHZhbHVlIDogdG9vbC5hdHRyaWJ1dGUsXG4gICAgICAgIGJvbnVzOiBpID09PSBpZCAmJiBhdHRyID09PSAnYm9udXMnID8gdmFsdWUgOiB0b29sLmJvbnVzLFxuICAgICAgICBuYW1lOiBpID09PSBpZCAmJiBhdHRyID09PSAnbmFtZScgPyB2YWx1ZSA6IHRvb2wubmFtZSxcbiAgICAgICAgbW9kOiBpID09PSBpZCAmJiBhdHRyID09PSAnbW9kJyA/IHZhbHVlIDogdG9vbC5tb2QsXG4gICAgICB9KSlcbiAgICB9IGVsc2UgaWYgKG90aGVySWQgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGlkID0gfn5vdGhlcklkXG4gICAgICBhdHRyaWJ1dGUgPSAnb3RoZXJfcHJvZnNfYW5kX2xhbmdzJ1xuICAgICAgZGF0YSA9IHRoaXMucHJvcHMuY2hhcmFjdGVyLm90aGVyX3Byb2ZzX2FuZF9sYW5ncy5tYXAoKHByb2YsIGkpID0+ICh7XG4gICAgICAgIC4uLnByb2YsXG4gICAgICAgIHR5cGU6IGkgPT09IGlkICYmIGF0dHIgPT09ICd0eXBlJyA/IHZhbHVlIDogcHJvZi50eXBlLFxuICAgICAgICBwcm9maWNpZW5jeTogaSA9PT0gaWQgJiYgYXR0ciA9PT0gJ3Byb2ZpY2llbmN5JyA/IHZhbHVlIDogcHJvZi5wcm9maWNpZW5jeSxcbiAgICAgIH0pKVxuICAgIH1cblxuICAgIGlmIChhdHRyaWJ1dGUgJiYgdGhpcy5wcm9wcy5vblVwZGF0ZUF0dHJpYnV0ZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblVwZGF0ZUF0dHJpYnV0ZShhdHRyaWJ1dGUsIGRhdGEpXG4gICAgfVxuICB9XG5cbiAgb25DaGFuZ2VUYWIgKGUpIHtcbiAgICBjb25zdCB0YWIgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJylcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRhYjogfn50YWIsIC8vIGNvbnZlcnQgdG8gaW50XG4gICAgfSlcbiAgfVxuXG4gIG9uUmVtb3ZlVG9vbCAoZSkge1xuICAgIGNvbnN0IGF0dGFja0lkID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWF0dGFjay1pZCcpXG4gICAgY29uc3QgZXF1aXBtZW50SWQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZXF1aXBtZW50LWlkJylcbiAgICBjb25zdCB0b29sSWQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbC1pZCcpXG4gICAgY29uc3Qgb3RoZXJJZCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1vdGhlci1pZCcpXG5cbiAgICBsZXQgZGF0YSA9IHVuZGVmaW5lZFxuICAgIGxldCBhdHRyaWJ1dGUgPSB1bmRlZmluZWRcbiAgICBpZiAoYXR0YWNrSWQgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGlkID0gfn5hdHRhY2tJZFxuICAgICAgYXR0cmlidXRlID0gJ2F0dGFja3MnXG4gICAgICBkYXRhID0gdGhpcy5wcm9wcy5jaGFyYWN0ZXIuYXR0YWNrcy5maWx0ZXIoKF8sIGkpID0+IChpZCAhPT0gaSkpXG4gICAgfSBlbHNlIGlmIChlcXVpcG1lbnRJZCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgaWQgPSB+fmVxdWlwbWVudElkXG4gICAgICBhdHRyaWJ1dGUgPSAnZXF1aXBtZW50J1xuICAgICAgZGF0YSA9IHRoaXMucHJvcHMuY2hhcmFjdGVyLmVxdWlwbWVudC5maWx0ZXIoKF8sIGkpID0+IChpZCAhPT0gaSkpXG4gICAgfSBlbHNlIGlmICh0b29sSWQgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGlkID0gfn50b29sSWRcbiAgICAgIGF0dHJpYnV0ZSA9ICd0b29sc19hbmRfc2tpbGxzJ1xuICAgICAgZGF0YSA9IHRoaXMucHJvcHMuY2hhcmFjdGVyLnRvb2xzX2FuZF9za2lsbHMuZmlsdGVyKChfLCBpKSA9PiAoaWQgIT09IGkpKVxuICAgIH0gZWxzZSBpZiAob3RoZXJJZCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgaWQgPSB+fm90aGVySWRcbiAgICAgIGF0dHJpYnV0ZSA9ICdvdGhlcl9wcm9mc19hbmRfbGFuZ3MnXG4gICAgICBkYXRhID0gdGhpcy5wcm9wcy5jaGFyYWN0ZXIub3RoZXJfcHJvZnNfYW5kX2xhbmdzLmZpbHRlcigoXywgaSkgPT4gKGlkICE9PSBpKSlcbiAgICB9XG5cbiAgICBpZiAoYXR0cmlidXRlICYmIHRoaXMucHJvcHMub25VcGRhdGVBdHRyaWJ1dGUpIHtcbiAgICAgIHRoaXMucHJvcHMub25VcGRhdGVBdHRyaWJ1dGUoYXR0cmlidXRlLCBkYXRhKVxuICAgIH1cbiAgfVxuXG4gIG9uVG9nZ2xlQWR2YW50YWdlICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzQWR2YW50YWdlOiAhdGhpcy5zdGF0ZS5pc0FkdmFudGFnZSxcbiAgICB9KVxuXG4gICAgaWYgKHRoaXMucHJvcHMub25VcGRhdGVBdHRyaWJ1dGUpIHtcbiAgICAgIHRoaXMucHJvcHMub25VcGRhdGVBdHRyaWJ1dGUoJ2lzQWR2YW50YWdlJywgIXRoaXMuc3RhdGUuaXNBZHZhbnRhZ2UpXG4gICAgfVxuICB9XG5cbiAgb25Ub2dnbGVFZGl0TlBDICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzRWRpdGluZzogIXRoaXMuc3RhdGUuaXNFZGl0aW5nLFxuICAgIH0pXG4gIH1cblxuICBvblRvZ2dsZUVkaXRpbmcgKGUpIHtcbiAgICBjb25zdCBhdHRhY2tJZCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1hdHRhY2staWQnKVxuICAgIGNvbnN0IGVxdWlwbWVudElkID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWVxdWlwbWVudC1pZCcpXG4gICAgY29uc3QgdG9vbElkID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2wtaWQnKVxuICAgIGNvbnN0IG90aGVySWQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3RoZXItaWQnKVxuXG4gICAgbGV0IGRhdGEgPSB1bmRlZmluZWRcbiAgICBsZXQgYXR0cmlidXRlID0gdW5kZWZpbmVkXG4gICAgaWYgKGF0dGFja0lkICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpZCA9IH5+YXR0YWNrSWRcbiAgICAgIGF0dHJpYnV0ZSA9ICdhdHRhY2tzJ1xuICAgICAgZGF0YSA9IHRoaXMucHJvcHMuY2hhcmFjdGVyLmF0dGFja3MubWFwKChhdHRhY2ssIGkpID0+ICh7XG4gICAgICAgIC4uLmF0dGFjayxcbiAgICAgICAgaXNFZGl0aW5nOiBpID09PSBpZCA/ICFhdHRhY2suaXNFZGl0aW5nIDogYXR0YWNrLmlzRWRpdGluZyxcbiAgICAgIH0pKVxuICAgIH0gZWxzZSBpZiAoZXF1aXBtZW50SWQgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGlkID0gfn5lcXVpcG1lbnRJZFxuICAgICAgYXR0cmlidXRlID0gJ2VxdWlwbWVudCdcbiAgICAgIGRhdGEgPSB0aGlzLnByb3BzLmNoYXJhY3Rlci5lcXVpcG1lbnQubWFwKChlcXVpcG1lbnQsIGkpID0+ICh7XG4gICAgICAgIC4uLmVxdWlwbWVudCxcbiAgICAgICAgaXNFZGl0aW5nOiBpID09PSBpZCA/ICFlcXVpcG1lbnQuaXNFZGl0aW5nIDogZXF1aXBtZW50LmlzRWRpdGluZyxcbiAgICAgIH0pKVxuICAgIH0gZWxzZSBpZiAodG9vbElkICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpZCA9IH5+dG9vbElkXG4gICAgICBhdHRyaWJ1dGUgPSAndG9vbHNfYW5kX3NraWxscydcbiAgICAgIGRhdGEgPSB0aGlzLnByb3BzLmNoYXJhY3Rlci50b29sc19hbmRfc2tpbGxzLm1hcCgodG9vbCwgaSkgPT4gKHtcbiAgICAgICAgLi4udG9vbCxcbiAgICAgICAgaXNFZGl0aW5nOiBpID09PSBpZCA/ICF0b29sLmlzRWRpdGluZyA6IHRvb2wuaXNFZGl0aW5nLFxuICAgICAgfSkpXG4gICAgfSBlbHNlIGlmIChvdGhlcklkICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpZCA9IH5+b3RoZXJJZFxuICAgICAgYXR0cmlidXRlID0gJ290aGVyX3Byb2ZzX2FuZF9sYW5ncydcbiAgICAgIGRhdGEgPSB0aGlzLnByb3BzLmNoYXJhY3Rlci5vdGhlcl9wcm9mc19hbmRfbGFuZ3MubWFwKChwcm9mLCBpKSA9PiAoe1xuICAgICAgICAuLi5wcm9mLFxuICAgICAgICBpc0VkaXRpbmc6IGkgPT09IGlkID8gIXByb2YuaXNFZGl0aW5nIDogcHJvZi5pc0VkaXRpbmcsXG4gICAgICB9KSlcbiAgICB9XG5cbiAgICBpZiAoYXR0cmlidXRlICYmIHRoaXMucHJvcHMub25VcGRhdGVBdHRyaWJ1dGUpIHtcbiAgICAgIHRoaXMucHJvcHMub25VcGRhdGVBdHRyaWJ1dGUoYXR0cmlidXRlLCBkYXRhKVxuICAgIH1cbiAgfVxuXG4gIG9uVG9nZ2xlUEMgKCkge1xuICAgIGxldCBvayA9IHRydWVcbiAgICBpZiAodGhpcy5zdGF0ZS5pc05QQykge1xuICAgICAgb2sgPSBjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gc3dpdGNoIHRvIHRoZSBQQyBjaGFyYWN0ZXIgc2hlZXQgdGVtcGxhdGU/JylcbiAgICB9XG5cbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc05QQzogZmFsc2UsXG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMucHJvcHMub25VcGRhdGVBdHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblVwZGF0ZUF0dHJpYnV0ZSgnaXNOUEMnLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblRvZ2dsZU5QQyAoKSB7XG4gICAgbGV0IG9rID0gdHJ1ZVxuICAgIGlmICghdGhpcy5zdGF0ZS5pc05QQykge1xuICAgICAgb2sgPSBjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gc3dpdGNoIHRvIHRoZSBOUEMgY2hhcmFjdGVyIHNoZWV0IHRlbXBsYXRlPycpXG4gICAgfVxuXG4gICAgaWYgKG9rKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNOUEM6IHRydWUsXG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMucHJvcHMub25VcGRhdGVBdHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblVwZGF0ZUF0dHJpYnV0ZSgnaXNOUEMnLCB0cnVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2hhcmFjdGVyLFxuICAgICAgb25DaGFuZ2UsXG4gICAgICBydW5NYWNybyxcbiAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgY29uc3Qge1xuICAgICAgaXNBZHZhbnRhZ2UsXG4gICAgICB0YWIsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBpc05QQyxcbiAgICB9ID0gdGhpcy5zdGF0ZVxuXG4gICAgLy8gSWYgd2UgaGF2ZSBhZHZhbnRhZ2UsIHdlIHRlbmQgdG8gcm9sbCAyZDIwa2gxIGZvciBtb3N0IHJvbGxzLCBzbyB3ZSBqdXN0IHN0b3JlIGl0IGhlcmVcbiAgICBjb25zdCByb2xsMWQyMCA9IGlzQWR2YW50YWdlID8gJzJkMjBraDEnIDogJzFkMjAnXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3Jvb3QnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naGVhZGVyJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbGVmdCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9nbyc+XG4gICAgICAgICAgICAgIFNSRDV8PHNwYW4gY2xhc3NOYW1lPSdwb3dlci12dHQnPlBvd2VyIFZUVDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RlbXBsYXRlJz5cbiAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXshaXNOUEMgJiYgJ3NlbGVjdGVkJ30gb25DbGljaz17dGhpcy5vblRvZ2dsZVBDfT5QQzwvYT5cbiAgICAgICAgICAgICAgJm5ic3A7fCZuYnNwO1xuICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e2lzTlBDICYmICdzZWxlY3RlZCd9IG9uQ2xpY2s9e3RoaXMub25Ub2dnbGVOUEN9Pk5QQzwvYT5cbiAgICAgICAgICAgICAge2lzTlBDICYmIChcbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICZuYnNwOy0gPGEgY2xhc3NOYW1lPXtpc0VkaXRpbmcgJiYgJ3NlbGVjdGVkJ30gb25DbGljaz17dGhpcy5vblRvZ2dsZUVkaXROUEN9Pntpc0VkaXRpbmcgPyAnU2F2ZScgOiAnRWRpdCd9PC9hPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7IWlzTlBDICYmIChcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nZmxleCc+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NoYXJhY3Rlci5uYW1lfVxuICAgICAgICAgICAgICAgICAgbmFtZT0nbmFtZSdcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIENoYXJhY3RlciBOYW1lXG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgeyFpc05QQyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmlnaHQnPlxuICAgICAgICAgICAgICB7dGFiID09PSAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtcm93Jz5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuY2hhcmFjdGVyX2NsYXNzfVxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2NoYXJhY3Rlcl9jbGFzcydcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICBDbGFzc1xuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIubGV2ZWx9XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT0nbGV2ZWwnXG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J251bWJlcidcbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICBMZXZlbFxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NoYXJhY3Rlci5iYWNrZ3JvdW5kfVxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2JhY2tncm91bmQnXG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgQmFja2dyb3VuZFxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICB7dGFiID09PSAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtcm93Jz5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIucmFjZX1cbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdyYWNlJ1xuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgIFJhY2VcbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Y2hhcmFjdGVyLmFsaWdubWVudH1cbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdhbGlnbm1lbnQnXG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgQWxpZ25tZW50XG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Y2hhcmFjdGVyLnhwfVxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J3hwJ1xuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgIEV4cGVyaWVuY2UgUG9pbnRzXG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIHt0YWIgPT09IDEgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1yb3cnPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NoYXJhY3Rlci5hZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT0nYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgIEFnZVxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuc2l6ZX1cbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdoZWlnaHQnXG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgU2l6ZVxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NoYXJhY3Rlci5oZWlnaHR9XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT0naGVpZ2h0J1xuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgIEhlaWdodFxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NoYXJhY3Rlci53ZWlnaHR9XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT0nd2VpZ2h0J1xuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgIFdlaWdodFxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICB7dGFiID09PSAxICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtcm93Jz5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuZXllc31cbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdleWVzJ1xuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgIEV5ZXNcbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Y2hhcmFjdGVyLnNraW59XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT0nc2tpbidcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICBTa2luXG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Y2hhcmFjdGVyLmhhaXJ9XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT0naGFpcidcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICBIYWlyXG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgeyFpc05QQyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXYgZmxleCc+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgIGRhdGEtdGFiPXswfVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlVGFifVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3RhYiA9PT0gMCAmJiAnc2VsZWN0ZWQnfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBDb3JlXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgIGRhdGEtdGFiPXsxfVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlVGFifVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3RhYiA9PT0gMSAmJiAnc2VsZWN0ZWQnfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBCaW9cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB7ZmFsc2UgJiYgKFxuICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICBkYXRhLXRhYj17Mn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlVGFifVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGFiID09PSAyICYmICdzZWxlY3RlZCd9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBTcGVsbHNcbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC91bD5cblxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndG9nZ2xlJz5cbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICBBZHZhbnRhZ2Uge2lzQWR2YW50YWdlID8gJ09OJyA6ICdPZmYnfVxuICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICA8VG9nZ2xlXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25Ub2dnbGVBZHZhbnRhZ2V9XG4gICAgICAgICAgICAgIGlzT249e2lzQWR2YW50YWdlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHtpc05QQyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JvZHkgZmxleCc+XG4gICAgICAgICAgICB7IWlzRWRpdGluZyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtMSc+XG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT0nbnBjTmFtZSc+e2NoYXJhY3Rlci5uYW1lfTwvaDE+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT0nbnBjVHlwZSc+e2NoYXJhY3Rlci5ucGNfdHlwZSB8fCAnQ2hhcmFjdGVyIFR5cGUsIENoYW90aWMgRXZpbCd9PC9oMj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSducGMtc2VjdGlvbic+XG4gICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPkFybW9yIENsYXNzPC9zdHJvbmc+IHtjaGFyYWN0ZXIuYWN9ICh7Y2hhcmFjdGVyLmFybW9yX3R5cGUgfHwgJ05hdHVyYWwgQXJtb3InfSk8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5IaXQgUG9pbnRzPC9zdHJvbmc+IHtjaGFyYWN0ZXIuaHB9IChcbiAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17cnVuTWFjcm99XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLW1hY3JvPXtgIXIgJHtjaGFyYWN0ZXIuaHBfZm9ybXVsYX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1hcz17Y2hhcmFjdGVyLmtleX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2hhcmFjdGVyLmhwX2Zvcm11bGF9XG4gICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+U3BlZWQ8L3N0cm9uZz4ge2NoYXJhY3Rlci5zcGVlZH08L2xpPlxuICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbnBjLXNlY3Rpb24gbnBjLXN0YXRzJz5cbiAgICAgICAgICAgICAgICAgIHthdHRyaWJ1dGVzLm1hcCgoYXR0cikgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YG5wYy1zdGF0LSR7YXR0cn1gfSBjbGFzc05hbWU9J3N0YXQnPlxuICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+e2F0dHIuc2xpY2UoMCwgMykudG9VcHBlckNhc2UoKX08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2hhcmFjdGVyW2F0dHIudG9Mb3dlckNhc2UoKV19ICgre2NoYXJhY3RlcltgJHthdHRyLnRvTG93ZXJDYXNlKCl9X21vZGBdfSlcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbnBjLXNlY3Rpb24nPlxuICAgICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5TYXZpbmcgVGhyb3dzPC9zdHJvbmc+IHthdHRyaWJ1dGVzLmZpbHRlcihhdHRyID0+IGNoYXJhY3RlcltgJHthdHRyLnRvTG93ZXJDYXNlKCl9X21vZGBdID4gMCkubWFwKChhdHRyKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2BucGMtc2F2aW5nLXRocm93LSR7YXR0cn1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtydW5NYWNyb31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLW1hY3JvPXtgIXIgJHtyb2xsMWQyMH0rQG1lLiR7YXR0ci50b0xvd2VyQ2FzZSgpfV9tb2QgXCIke2F0dHJ9IFNhdmVcImB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1hcz17Y2hhcmFjdGVyLmtleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthdHRyLnNsaWNlKDAsIDMpfSAre2NoYXJhY3RlcltgJHthdHRyLnRvTG93ZXJDYXNlKCl9X21vZGBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlNraWxsczwvc3Ryb25nPiB7c2tpbGxzLmZpbHRlcihza2lsbCA9PiBjaGFyYWN0ZXJbc2tpbGwuY29kZV0gPiAwKS5tYXAoKHNraWxsKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2BucGMtc2tpbGwtJHtza2lsbC5uYW1lfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3J1bk1hY3JvfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtbWFjcm89e2AhciAke3JvbGwxZDIwfStAbWUuJHtza2lsbC5jb2RlfSBcIiR7c2tpbGwubmFtZX1cImB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1hcz17Y2hhcmFjdGVyLmtleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtza2lsbC5uYW1lfSAre2NoYXJhY3Rlcltza2lsbC5jb2RlXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz5EYW1hZ2UgSW1tdW5pdGllczwvc3Ryb25nPiB7Y2hhcmFjdGVyLmRhbWFnZV9pbW11bml0aWVzfTwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPlNlbnNlczwvc3Ryb25nPiB7Y2hhcmFjdGVyLnNlbnNlc308L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz5MYW5ndWFnZXM8L3N0cm9uZz4ge2NoYXJhY3Rlci5vdGhlcl9wcm9mc19hbmRfbGFuZ3MubWFwKGxhbmcgPT4gbGFuZy5wcm9maWNpZW5jeSkuam9pbignLCAnKX08L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz5DaGFsbGVuZ2U8L3N0cm9uZz4ge2NoYXJhY3Rlci5jaGFsbGVuZ2V9ICh7Y2hhcmFjdGVyLnhwfSk8L2xpPlxuICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2lzRWRpdGluZyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtMSc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nZmxleCc+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgbmFtZT0nbmFtZSdcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgQ2hhcmFjdGVyIE5hbWVcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nZmxleCc+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIubnBjX3R5cGV9XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9J25wY190eXBlJ1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSdEcmFnb24sIENoYW90aWMgRXZpbCdcbiAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgIE5QQyBUeXBlXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0cyBmbGV4Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhdHRyaWJ1dGUnPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NoYXJhY3Rlci5hY31cbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdhYydcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdsYXJnZSdcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nMCdcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPSdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPGg0PkFybW9yIENsYXNzPC9oND5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFpc05QQyAmJiB0YWIgPT09IDAgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdib2R5IGZsZXgnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbC0xJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhdHRyaWJ1dGVzJz5cbiAgICAgICAgICAgICAgICAgIHthdHRyaWJ1dGVzLm1hcCgoYXR0cikgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YGF0dHItJHthdHRyfWB9IGNsYXNzTmFtZT0nYXR0cmlidXRlJz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17cnVuTWFjcm99XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLW1hY3JvPXtgIXIgJHtyb2xsMWQyMH0rQG1lLiR7YXR0ci50b0xvd2VyQ2FzZSgpfV9tb2QgXCIke2F0dHJ9XCJgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1hcz17Y2hhcmFjdGVyLmtleX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YXR0cn1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Y2hhcmFjdGVyW2F0dHIudG9Mb3dlckNhc2UoKV19XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXthdHRyLnRvTG93ZXJDYXNlKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2xhcmdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9JzAnXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtb2QnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17YCR7Y2hhcmFjdGVyW2F0dHIudG9Mb3dlckNhc2UoKSArICdfbW9kJ119YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17YCR7YXR0ci50b0xvd2VyQ2FzZSgpfV9tb2RgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbCc+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5zcGlyYXRpb24nPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncHJvZmljaWVuY3knPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYm9udXMnPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIucHJvZmljaWVuY3lfYm9udXN9XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdwcm9maWNpZW5jeV9ib251cydcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPScwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0nbnVtYmVyJ1xuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICBQcm9maWNpZW5jeSBCb251c1xuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbGlzdCc+XG4gICAgICAgICAgICAgICAgICAgIHthdHRyaWJ1dGVzLm1hcCgoYXR0cikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgc2F2aW5nLXRocm93LSR7YXR0cn1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXtgJHthdHRyLnRvTG93ZXJDYXNlKCl9X3Byb2ZgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q2hlY2tlZD17Y2hhcmFjdGVyW2Ake2F0dHIudG9Mb3dlckNhc2UoKX1fcHJvZmBdID09PSB0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtydW5NYWNyb31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1tYWNybz17YCFyICR7cm9sbDFkMjB9K0BtZS4ke2F0dHIudG9Mb3dlckNhc2UoKX0gXCIke2F0dHJ9IFNhdmVcImB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYXM9e2NoYXJhY3Rlci5rZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+e2NoYXJhY3RlcltgJHthdHRyLnRvTG93ZXJDYXNlKCl9X21vZGBdIHx8IDB9PC9zdHJvbmc+IHthdHRyfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG5cbiAgICAgICAgICAgICAgICAgICAgPGg0PlNhdmluZyBUaHJvd3M8L2g0PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsaXN0Jz5cbiAgICAgICAgICAgICAgICAgICAge3NraWxscy5tYXAoKHNraWxsKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NraWxsJyBrZXk9e2Bza2lsbC0ke3NraWxsLm5hbWV9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17YCR7c2tpbGwuY29kZX1fcHJvZmB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDaGVja2VkPXtjaGFyYWN0ZXJbYCR7c2tpbGwuY29kZX1fcHJvZmBdID09PSB0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtydW5NYWNyb31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1tYWNybz17YCFyICR7cm9sbDFkMjB9K0BtZS4ke3NraWxsLmNvZGV9IFwiJHtza2lsbC5uYW1lfVwiYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1hcz17Y2hhcmFjdGVyLmtleX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz57Y2hhcmFjdGVyW2Ake3NraWxsLnR5cGUudG9Mb3dlckNhc2UoKX1fbW9kYF0gfHwgMH08L3N0cm9uZz4ge3NraWxsLm5hbWV9IDxzcGFuIGNsYXNzTmFtZT0nc2tpbGwtdHlwZSc+KHtza2lsbC50eXBlLnNsaWNlKDAsIDMpfSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cblxuICAgICAgICAgICAgICAgICAgICA8aDQ+U2tpbGxzPC9oND5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncHJvZmljaWVuY3knPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdib251cyc+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIucGFzc2l2ZV93aXNkb219XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9J3Bhc3NpdmVfd2lzZG9tJ1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nMCdcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPSdudW1iZXInXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgUGFzc2l2ZSBXaXNkb20gKFBlcmNlcHRpb24pXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xpc3QnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0YWJsZXMgZmxleCc+XG4gICAgICAgICAgICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+VG9vbDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+UHJvZmljaWVuY3k8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPkF0dHJpYnV0ZTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgIHtjaGFyYWN0ZXIudG9vbHNfYW5kX3NraWxscy5tYXAoKHRvb2wsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3Rvb2wuaXNFZGl0aW5nICYmICdlZGl0YWJsZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YHRvb2wtcHJvZmljaWVuY3ktJHtpfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyF0b29sLmlzRWRpdGluZyA/IHJ1bk1hY3JvIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLW1hY3JvPXtgIXIgJHtyb2xsMWQyMH0rQG1lLiR7dG9vbC5hdHRyaWJ1dGUudG9Mb3dlckNhc2UoKX0rJHt0b29sLm1vZCB8fCAwfSBcIiR7dG9vbC5uYW1lfVwiYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1hcz17Y2hhcmFjdGVyLmtleX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0b29sLmlzRWRpdGluZyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRvb2wtaWQ9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSdOYW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSduYW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0b29sLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiB0b29sLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dG9vbC5pc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtdG9vbC1pZD17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9JydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0nYm9udXMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3Rvb2wuYm9udXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezB9PlByb2ZpY2llbnQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MX0+RXhwZXJ0aXNlPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezJ9PkphY2sgb2YgYWxsIFRyYWRlczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IHRvb2wubW9kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dG9vbC5pc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTI0cHgnIH19IGNsYXNzTmFtZT0nZmxleCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtdG9vbC1pZD17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9JydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0nYXR0cmlidXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0b29sLmF0dHJpYnV0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2F0dHJpYnV0ZXMubWFwKChhdHRyKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2B0b29scy1hbmQtcHJvZmljaWVuY2llcy1hdHRyLSR7YXR0cn1gfSB2YWx1ZT17YXR0cn0+e2F0dHJ9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRvb2wtaWQ9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J251bWJlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J01vZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0nbW9kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3Rvb2wubW9kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3Rvb2wuYXR0cmlidXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXszfSBjbGFzc05hbWU9J2FkZCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxhIG9uQ2xpY2s9e3RoaXMub25BZGRUb29sfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIEFkZCBJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG5cbiAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9J2VkaXQnPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiZuYnNwOzwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgIHtjaGFyYWN0ZXIudG9vbHNfYW5kX3NraWxscy5tYXAoKHRvb2wsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3Rvb2wuaXNFZGl0aW5nICYmICdlZGl0YWJsZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YHRvb2wtcHJvZmljaWVuY3ktZWRpdC0ke2l9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtdG9vbC1pZD17aX0gb25DbGljaz17dGhpcy5vblRvZ2dsZUVkaXRpbmd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rvb2wuaXNFZGl0aW5nID8gJ1NhdmUnIDogJ0VkaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dG9vbC5pc0VkaXRpbmcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgZGF0YS10b29sLWlkPXtpfSBvbkNsaWNrPXt0aGlzLm9uUmVtb3ZlVG9vbH0gY2xhc3NOYW1lPSd3YXJuaW5nJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWxldGUgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGg0PlxuICAgICAgICAgICAgICAgICAgVG9vbCBQcm9maWNpZW5jaWVzICZhbXA7IEN1c3RvbSBTa2lsbHNcbiAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbGlzdCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RhYmxlcyBmbGV4Jz5cbiAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9J3Byb2ZpY2llbmNpZXMnPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlR5cGU8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPkxhYmVsPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAge2NoYXJhY3Rlci5vdGhlcl9wcm9mc19hbmRfbGFuZ3MubWFwKChwcm9mLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtwcm9mLmlzRWRpdGluZyAmJiAnZWRpdGFibGUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2BvdGhlci1wcm9maWNpZW5jeS0ke2l9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9mLmlzRWRpdGluZyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1vdGhlci1pZD17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9JydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0ndHlwZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17cHJvZi50eXBlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdMYW5ndWFnZSc+TGFuZ3VhZ2U8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nV2VhcG9uJz5XZWFwb248L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nQXJtb3InPkFybW9yPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J090aGVyJz5PdGhlcjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IHByb2YudHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT0nZmxleCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9mLmlzRWRpdGluZyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtb3RoZXItaWQ9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J1Byb2ZpY2llbmN5J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0ncHJvZmljaWVuY3knXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3Byb2YucHJvZmljaWVuY3l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBwcm9mLnByb2ZpY2llbmN5XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezN9IGNsYXNzTmFtZT0nYWRkJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgb25DbGljaz17dGhpcy5vbkFkZFByb2ZpY2llbmN5fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIEFkZCBJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG5cbiAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9J2VkaXQnPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiZuYnNwOzwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgIHtjaGFyYWN0ZXIub3RoZXJfcHJvZnNfYW5kX2xhbmdzLm1hcCgocHJvZiwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17cHJvZi5pc0VkaXRpbmcgJiYgJ2VkaXRhYmxlJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtgcHJvZi1wcm9maWNpZW5jeS1lZGl0LSR7aX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgZGF0YS1vdGhlci1pZD17aX0gb25DbGljaz17dGhpcy5vblRvZ2dsZUVkaXRpbmd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb2YuaXNFZGl0aW5nID8gJ1NhdmUnIDogJ0VkaXQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvZi5pc0VkaXRpbmcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgZGF0YS1vdGhlci1pZD17aX0gb25DbGljaz17dGhpcy5vblJlbW92ZVRvb2x9IGNsYXNzTmFtZT0nd2FybmluZyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVsZXRlIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICAgICAgICBPdGhlciBQcm9maWNpZW5jaWVzICZhbXA7IExhbmd1YWdlc1xuICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtMSc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdGF0cyBmbGV4Jz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXR0cmlidXRlJz5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NoYXJhY3Rlci5hY31cbiAgICAgICAgICAgICAgICAgICAgbmFtZT0nYWMnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdsYXJnZSdcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9JzAnXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9J251bWJlcidcbiAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgIDxoND5Bcm1vciBDbGFzczwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXR0cmlidXRlJz5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NoYXJhY3Rlci5pbml0aWF0aXZlfVxuICAgICAgICAgICAgICAgICAgICBuYW1lPSdpbml0aWF0aXZlJ1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nbGFyZ2UnXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPScwJ1xuICAgICAgICAgICAgICAgICAgICB0eXBlPSdudW1iZXInXG4gICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICA8aDRcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17cnVuTWFjcm99XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtbWFjcm89e2AhciAke3JvbGwxZDIwfStAbWUuZGV4dGVyaXR5IFwiSW5pdGlhdGl2ZVwiYH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1hcz17Y2hhcmFjdGVyLmtleX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdtYWNybydcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgSW5pdGlhdGl2ZVxuICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhdHRyaWJ1dGUnPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Y2hhcmFjdGVyLnNwZWVkfVxuICAgICAgICAgICAgICAgICAgICBuYW1lPSdzcGVlZCdcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2xhcmdlJ1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nMCdcbiAgICAgICAgICAgICAgICAgICAgdHlwZT0nbnVtYmVyJ1xuICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgPGg0PlNwZWVkPC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2F0dHJpYnV0ZSBhdHRyaWJ1dGUtc3ViJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWF4Jz5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuaHBfbWF4fVxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2hwX21heCdcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nMCdcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT0nbnVtYmVyJ1xuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgIEhpdCBQb2ludCBNYXhcbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Y2hhcmFjdGVyLmhwfVxuICAgICAgICAgICAgICAgICAgbmFtZT0naHAnXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2xhcmdlJ1xuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9JzAnXG4gICAgICAgICAgICAgICAgICB0eXBlPSdudW1iZXInXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxoND5DdXJyZW50IEhpdCBQb2ludHM8L2g0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXR0cmlidXRlIGF0dHJpYnV0ZS1zdWInPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuaHBfdG1wfVxuICAgICAgICAgICAgICAgICAgbmFtZT0naHBfdG1wJ1xuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdsYXJnZSdcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPScwJ1xuICAgICAgICAgICAgICAgICAgdHlwZT0nbnVtYmVyJ1xuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8aDQ+VGVtcG9yYXJ5IEhpdCBQb2ludHM8L2g0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLTInPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhdHRyaWJ1dGUgYXR0cmlidXRlLXN1Yic+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWF4Jz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuaGl0X2RpY2VfdG90YWx9XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdoaXRfZGljZV90b3RhbCdcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPScwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0nbnVtYmVyJ1xuICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICBUb3RhbCBIaXQgRGljZVxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuaGl0X2RpY2V9XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9J2hpdF9kaWNlJ1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nbGFyZ2UnXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPScwJ1xuICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxoNFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdtYWNybydcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3J1bk1hY3JvfVxuICAgICAgICAgICAgICAgICAgZGF0YS1tYWNybz0nIXIgMWQxMCtAbWUuY29uc3RpdHV0aW9uJ1xuICAgICAgICAgICAgICAgICAgZGF0YS1hcz17Y2hhcmFjdGVyLmtleX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBIaXQgRGljZVxuICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXR0cmlidXRlIGF0dHJpYnV0ZS1zdWInPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2RlYXRoLXNhdmVzJz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIFN1Y2Nlc3Nlc1xuXG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIEZhaWx1cmVzXG5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8aDQ+RGVhdGggU2F2ZXM8L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbGlzdCBhdHRhY2tzJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndGFibGVzIGZsZXgnPlxuICAgICAgICAgICAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPk5hbWU8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPkF0dGFjazwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgIHtjaGFyYWN0ZXIuYXR0YWNrcy5tYXAoKGF0dGFjaywgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YXR0YWNrLmlzRWRpdGluZyAmJiAnZWRpdGFibGUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2BhdHRhY2stJHtpfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyFhdHRhY2suaXNFZGl0aW5nID8gcnVuTWFjcm8gOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtbWFjcm89e2AhciAxZDYrQG1lLiR7YXR0YWNrLmF0dHJpYnV0ZX0rJHthdHRhY2subW9kIHx8IDB9IFwiJHthdHRhY2submFtZX1cImB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYXM9e2NoYXJhY3Rlci5rZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YXR0YWNrLmlzRWRpdGluZyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWF0dGFjay1pZD17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J05hbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J25hbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2F0dGFjay5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogYXR0YWNrLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHthdHRhY2suaXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzE5NnB4JyB9fSBjbGFzc05hbWU9J2ZsZXgnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWF0dGFjay1pZD17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9JydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0nYXR0cmlidXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXthdHRhY2suYXR0cmlidXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YXR0cmlidXRlcy5tYXAoKGF0dHIpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17YGF0dGFjay1hdHRyLSR7YXR0cn1gfSB2YWx1ZT17YXR0cn0+e2F0dHJ9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsmbmJzcDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYXR0YWNrLWlkPXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSdNb2QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J21vZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXthdHRhY2subW9kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e2F0dGFjay5hdHRyaWJ1dGV9ICsge2F0dGFjay5tb2R9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezN9IGNsYXNzTmFtZT0nYWRkJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgb25DbGljaz17dGhpcy5vbkFkZEF0dGFja30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBBZGQgSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuXG4gICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPSdlZGl0Jz5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2hhcmFjdGVyLmF0dGFja3MubWFwKChhdHRhY2ssIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2F0dGFjay5pc0VkaXRpbmcgJiYgJ2VkaXRhYmxlJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtgYXR0YWNrLWVkaXQtJHtpfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBkYXRhLWF0dGFjay1pZD17aX0gb25DbGljaz17dGhpcy5vblRvZ2dsZUVkaXRpbmd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2F0dGFjay5pc0VkaXRpbmcgPyAnU2F2ZScgOiAnRWRpdCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthdHRhY2suaXNFZGl0aW5nICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtYXR0YWNrLWlkPXtpfSBvbkNsaWNrPXt0aGlzLm9uUmVtb3ZlVG9vbH0gY2xhc3NOYW1lPSd3YXJuaW5nJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWxldGUgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGg0PkF0dGFja3MgJmFtcDsgU3BlbGxjYXN0aW5nPC9oND5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xpc3QgYXR0YWNrcyc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RhYmxlcyBmbGV4Jz5cbiAgICAgICAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5OYW1lPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5XZWlnaHQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2hhcmFjdGVyLmVxdWlwbWVudC5tYXAoKGVxdWlwbWVudCwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17ZXF1aXBtZW50LmlzRWRpdGluZyAmJiAnZWRpdGFibGUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2BlcXVpcG1lbnQtJHtpfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZXF1aXBtZW50LmlzRWRpdGluZyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWVxdWlwbWVudC1pZD17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J05hbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J25hbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2VxdWlwbWVudC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogZXF1aXBtZW50Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtlcXVpcG1lbnQuaXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzE5NnB4JyB9fSBjbGFzc05hbWU9J2ZsZXgnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtZXF1aXBtZW50LWlkPXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSdXZWlnaHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J3dlaWdodCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtlcXVpcG1lbnQud2VpZ2h0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3BhcnNlRmxvYXQoZXF1aXBtZW50LndlaWdodCwgMTApLnRvRml4ZWQoMSl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezN9IGNsYXNzTmFtZT0nYWRkJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgb25DbGljaz17dGhpcy5vbkFkZEVxdWlwbWVudH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBBZGQgSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuXG4gICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPSdlZGl0Jz5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2hhcmFjdGVyLmVxdWlwbWVudC5tYXAoKGVxdWlwbWVudCwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17ZXF1aXBtZW50LmlzRWRpdGluZyAmJiAnZWRpdGFibGUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2BlcXVpcG1lbnQtZWRpdC0ke2l9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtZXF1aXBtZW50LWlkPXtpfSBvbkNsaWNrPXt0aGlzLm9uVG9nZ2xlRWRpdGluZ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZXF1aXBtZW50LmlzRWRpdGluZyA/ICdTYXZlJyA6ICdFZGl0J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VxdWlwbWVudC5pc0VkaXRpbmcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgZGF0YS1lcXVpcG1lbnQtaWQ9e2l9IG9uQ2xpY2s9e3RoaXMub25SZW1vdmVUb29sfSBjbGFzc05hbWU9J3dhcm5pbmcnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlbGV0ZSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGg0PkVxdWlwbWVudDwvaDQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtMSc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbmZvJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXR0cmlidXRlJz5cbiAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9J3BlcnNvbmFsaXR5X3RyYWl0cydcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIucGVyc29uYWxpdHlfdHJhaXRzfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxoND5QZXJzb25hbGl0eSBUcmFpdHM8L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXR0cmlidXRlJz5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIG5hbWU9J2lkZWFscydcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Y2hhcmFjdGVyLmlkZWFsc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxoND5JZGVhbHM8L2g0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXR0cmlidXRlJz5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIG5hbWU9J2JvbmRzJ1xuICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuYm9uZHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8aDQ+Qm9uZHM8L2g0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXR0cmlidXRlJz5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIG5hbWU9J2ZsYXdzJ1xuICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuZmxhd3N9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8aDQ+Rmxhd3M8L2g0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXR0cmlidXRlIGF0dHJpYnV0ZS1zdWInPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtYXgnPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICBUb3RhbFxuXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Y2hhcmFjdGVyLmNsYXNzUmVzb3VyY2VNYXh9XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT0nY2xhc3NSZXNvdXJjZU1heCdcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nMCdcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT0nbnVtYmVyJ1xuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Y2hhcmFjdGVyLmNsYXNzUmVzb3VyY2V9XG4gICAgICAgICAgICAgICAgICBuYW1lPSdjbGFzc1Jlc291cmNlJ1xuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdsYXJnZSdcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPScwJ1xuICAgICAgICAgICAgICAgICAgdHlwZT0nbnVtYmVyJ1xuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICAgICAgICBDbGFzcyBSZXNvdXJjZVxuICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhdHRyaWJ1dGUnPlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgcm93cz17MTB9XG4gICAgICAgICAgICAgICAgICBuYW1lPSdmZWF0dXJlc19hbmRfdHJhaXRzJ1xuICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuZmVhdHVyZXNfYW5kX3RyYWl0c31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxoND5GZWF0dXJlcyAmYW1wOyBUcmFpdHM8L2g0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHt0YWIgPT09IDEgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdib2R5IGZsZXgnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbC0xJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Jpbyc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2F0dHJpYnV0ZSc+XG4gICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICBuYW1lPSdhcHBlYXJhbmNlJ1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NoYXJhY3Rlci5hcHBlYXJhbmNlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxoND5DaGFyYWN0ZXIgQXBwZWFyYW5jZTwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXR0cmlidXRlJz5cbiAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9J2JhY2tzdG9yeSdcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuYmFja3N0b3J5fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxoND5DaGFyYWN0ZXIgQmFja3N0b3J5PC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtMSc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiaW8nPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhdHRyaWJ1dGUnPlxuICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgbmFtZT0nYWxsaWVzX2FuZF9vcmdzJ1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NoYXJhY3Rlci5hbGxpZXNfYW5kX29yZ3N9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGg0PkFsbGllcyAmYW1wOyBPcmdhbml6YXRpb25zPC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhdHRyaWJ1dGUnPlxuICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgbmFtZT0nYWRkaXRpb25hbF9mZWF0dXJlcydcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIuYWRkaXRpb25hbF9mZWF0dXJlc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8aDQ+QWRkaXRpb25hbCBGZWF0dXJlcyAmYW1wOyBUcmFpdHM8L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2F0dHJpYnV0ZSc+XG4gICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICBuYW1lPSd0cmVhc3VyZSdcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtjaGFyYWN0ZXIudHJlYXN1cmV9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGg0PlRyZWFzdXJlPC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgYSB7XG4gICAgICAgICAgICB0cmFuc3RpaW9uOiBhbGwgMC4xNXMgZWFzZS1vdXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGg0IHtcbiAgICAgICAgICAgIGNvbG9yOiAke2NvbG9yLmdyZXlbNDAwXX07XG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlucHV0W3R5cGU9J3RleHQnXSwgaW5wdXRbdHlwZT0nbnVtYmVyJ10ge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHtjb2xvci5ncmV5WzcwMF19O1xuICAgICAgICAgICAgY29sb3I6ICR7Y29sb3IuZ3JleVs1MF19O1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICAgICAgbWluLXdpZHRoOiBpbmhlcml0O1xuICAgICAgICAgICAgb3V0bGluZTogMDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDZweCAwO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyIDAuMTVzIGVhc2Utb3V0O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGV4dGFyZWEge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIHJlc2l6ZTogbm9uZTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgICBtaW4taGVpZ2h0OiA0OHB4O1xuICAgICAgICAgICAgbWluLXdpZHRoOiBpbmhlcml0O1xuICAgICAgICAgICAgb3V0bGluZTogMDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDZweCAwO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBjb2xvcjogJHtjb2xvci5ncmV5WzUwXX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmJpbyB0ZXh0YXJlYSB7XG4gICAgICAgICAgICBtaW4taGVpZ2h0OiAxMjRweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsYWJlbDpob3ZlciB7XG4gICAgICAgICAgICBjb2xvcjogJHtjb2xvci5ncmV5WzUwXX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGFiZWw6aG92ZXIgaW5wdXQge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICR7Y29sb3IuZ3JleVs1MF19O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlucHV0OmFjdGl2ZSxcbiAgICAgICAgICBpbnB1dDpmb2N1cyB7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHtjb2xvci5ncmV5WzUwXX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGFiZWwge1xuICAgICAgICAgICAgY29sb3I6ICR7Y29sb3IuZ3JleVs1MDBdfTtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cyBlYXNlLW91dDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuYXR0cmlidXRlcyB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDEyNHB4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5saXN0IHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR7Y29sb3IuZ3JleVs1MDBdfTtcbiAgICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgICAgICAgICAgcGFkZGluZzogNnB4IDEycHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLm1hY3JvIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2Utb3V0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5tYWNybzpob3ZlcixcbiAgICAgICAgICAubGlzdCBsYWJlbDpob3ZlciB7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBjb2xvcjogJHtjb2xvci55ZWxsb3dbNTAwXX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmF0dHJpYnV0ZSB7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAke2NvbG9yLmdyZXlbNTAwXX07XG4gICAgICAgICAgICBwYWRkaW5nOiA2cHggNnB4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5hdHRyaWJ1dGUgc3BhbiB7XG4gICAgICAgICAgICBjb2xvcjogJHtjb2xvci5ncmV5WzUwXX07XG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZS1vdXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmF0dHJpYnV0ZSBzcGFuOmhvdmVyIHtcbiAgICAgICAgICAgIGNvbG9yOiAke2NvbG9yLnllbGxvd1s1MDBdfTtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuYXR0cmlidXRlIGlucHV0IHtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmF0dHJpYnV0ZSBpbnB1dC5sYXJnZSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5ib251cyxcbiAgICAgICAgICAuYXR0cmlidXRlIC5tb2Qge1xuICAgICAgICAgICAgd2lkdGg6IDQycHg7XG4gICAgICAgICAgICBtYXJnaW46IDZweCBhdXRvIDAgYXV0bztcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDI0cHg7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAke2NvbG9yLmdyZXlbNzAwXX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmJvbnVzIHtcbiAgICAgICAgICAgIG1hcmdpbjogMCA2cHggMCAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5wcm9maWNpZW5jeSB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAke2NvbG9yLmdyZXlbNTAwXX07XG4gICAgICAgICAgICBwYWRkaW5nOiA2cHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmJvbnVzIGlucHV0LFxuICAgICAgICAgIC5hdHRyaWJ1dGUgLm1vZCBpbnB1dCB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICBwYWRkaW5nOiAzcHggMDtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmJvbnVzIGlucHV0IHtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuYm9udXMgaW5wdXQ6aG92ZXIsXG4gICAgICAgICAgLmJvbnVzIGlucHV0OmFjdGl2ZSxcbiAgICAgICAgICAuYm9udXMgaW5wdXQ6Zm9jdXMsXG4gICAgICAgICAgLmF0dHJpYnV0ZSAubW9kIGlucHV0OmhvdmVyLFxuICAgICAgICAgIC5hdHRyaWJ1dGUgLm1vZCBpbnB1dDphY3RpdmUsXG4gICAgICAgICAgLmF0dHJpYnV0ZSAubW9kIGlucHV0OmZvY3VzIHtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5za2lsbC10eXBlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiBpbmhlcml0O1xuICAgICAgICAgICAgY29sb3I6ICR7Y29sb3IuZ3JleVs2MDBdfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuc2tpbGwge1xuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuZmxleCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5yb290IHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3IuZ3JleVs4MDBdfTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR7Y29sb3IuZ3JleVs5MDBdfTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmxvZ28ge1xuICAgICAgICAgICAgY29sb3I6ICR7Y29sb3IuZ3JleVs1MF19O1xuICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogM3B4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAubG9nbyAucG93ZXItdnR0IHtcbiAgICAgICAgICAgIGNvbG9yOiAke2NvbG9yLnllbGxvd1s1MDBdfTtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLnRlbXBsYXRlIHtcbiAgICAgICAgICAgIGNvbG9yOiAke2NvbG9yLmdyZXlbNDAwXX07XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAudGVtcGxhdGUgYSB7XG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzIGVhc2Utb3V0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC50ZW1wbGF0ZSBhOmhvdmVyIHtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAudGVtcGxhdGUgYS5zZWxlY3RlZCB7XG4gICAgICAgICAgICBjb2xvcjogJHtjb2xvci55ZWxsb3dbNTAwXX07XG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC50ZW1wbGF0ZSBhLnNlbGVjdGVkOmhvdmVyIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcbiAgICAgICAgICAgIGN1cnNvcjogaW5oZXJpdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuaGVhZGVyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmxlZnQge1xuICAgICAgICAgICAgd2lkdGg6IDMzLjMzJTtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjRweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAucmlnaHQge1xuICAgICAgICAgICAgd2lkdGg6IDY2LjY2JTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAke2NvbG9yLmdyZXlbNTAwXX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLnJpZ2h0IGxhYmVsIHtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuaW5wdXQtcm93IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmJvZHkge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTJweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuY29sIHtcbiAgICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmNvbC0xIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxMnB4O1xuICAgICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuY29sLTE6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmRlYXRoLXNhdmVzIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEycHggMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuY29sLTIgLmF0dHJpYnV0ZSxcbiAgICAgICAgICAuc3RhdHMgLmF0dHJpYnV0ZSB7XG4gICAgICAgICAgICBtYXJnaW46IDAgNnB4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5jb2wtMiAuYXR0cmlidXRlOmZpcnN0LWNoaWxkLFxuICAgICAgICAgIC5zdGF0cyAuYXR0cmlidXRlOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5jb2wtMiAuYXR0cmlidXRlOmxhc3QtY2hpbGQsXG4gICAgICAgICAgLnN0YXRzIC5hdHRyaWJ1dGU6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmF0dHJpYnV0ZS1zdWIge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTJweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuYXR0cmlidXRlLXN1YiAubWF4IHtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuYXR0cmlidXRlLXN1YiAubWF4IGlucHV0IHtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke2NvbG9yLmdyZXlbNTAwXX07XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICB3aWR0aDogNDJweDtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogNnB4O1xuICAgICAgICAgICAgcGFkZGluZzogM3B4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5hdHRyaWJ1dGUtc3ViIC5tYXggbGFiZWw6aG92ZXIgaW5wdXQge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICR7Y29sb3IuZ3JleVs1MF19O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5jb2wtMiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTJweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuZXF1aXBtZW50LFxuICAgICAgICAgIC5hdHRhY2tzIHtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEycHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLm5hdiB7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMnB4IDAgMCAwO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAubmF2IHVsIHtcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5uYXYgdWwgbGkge1xuICAgICAgICAgICAgcGFkZGluZzogNnB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICBjb2xvcjogJHtjb2xvci5ncmV5WzUwMF19O1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgJHtjb2xvci5ncmV5WzcwMF19O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgbWFyZ2luOiAwIDNweDtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjE1cyBlYXNlLW91dDtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAubmF2IHVsIGxpOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5uYXYgdWwgbGk6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLm5hdiB1bCBsaTpob3ZlciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yLmdyZXlbNzAwXX07XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBjb2xvcjogJHtjb2xvci5ncmV5WzUwXX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLm5hdiB1bCBsaS5zZWxlY3RlZCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yLnllbGxvd1s1MDBdfTtcbiAgICAgICAgICAgIGNvbG9yOiAke2NvbG9yLmdyZXlbOTAwXX07XG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC50b2dnbGUge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLnRvZ2dsZSBzcGFuIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgICAgIGNvbG9yOiAke2NvbG9yLmdyZXlbMzAwXX07XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDZweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YWJsZSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICBjb2xvcjogJHtjb2xvci5ncmV5WzUwXX07XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFibGUgdGhlYWQgdHIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvci5ncmV5WzkwMF19O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFibGUgdGQge1xuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDNweDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRhYmxlIHRkOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIG1heC13aWR0aDogaW5oZXJpdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YWJsZSBpbnB1dCB7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRhYmxlIHNlbGVjdCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yLmdyZXlbODAwXX07XG4gICAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgICBjb2xvcjogJHtjb2xvci5ncmV5WzUwXX07XG4gICAgICAgICAgICB3aWR0aDogNzZweDtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YWJsZSB0Ym9keSB0ciB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzIGVhc2Utb3V0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRhYmxlIHRib2R5IHRyOmhvdmVyIHtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGNvbG9yOiAke2NvbG9yLnllbGxvd1s1MDBdfTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3IuZ3JleVs3MDBdfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YWJsZSB0Ym9keSB0ci5lZGl0YWJsZTpob3ZlciB7XG4gICAgICAgICAgICBjdXJzb3I6IGluaGVyaXQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRhYmxlIHRib2R5IHRyLmVkaXRhYmxlIGEge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAzcHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFibGUgdGJvZHkgdHIuZWRpdGFibGUgYTpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YWJsZSB0Ym9keSB0ci5lZGl0YWJsZSBhOmhvdmVyIHtcbiAgICAgICAgICAgIGNvbG9yOiAke2NvbG9yLnllbGxvd1s1MDBdfTtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YWJsZSB0Ym9keSB0ci5lZGl0YWJsZSBhLndhcm5pbmcge1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDNweDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGFibGUgdGJvZHkgdHIuZWRpdGFibGUgYS53YXJuaW5nOmhvdmVyIHtcbiAgICAgICAgICAgIGNvbG9yOiAke2NvbG9yLmVycm9yfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuYWRkIHtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuYWRkIGEge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgICAgICAgY29sb3I6ICR7Y29sb3IuZ3JleVs0MDBdfTtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2Utb3V0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRhYmxlLmVkaXQge1xuICAgICAgICAgICAgZmxleDogaW5oZXJpdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YWJsZS5lZGl0IHRoZWFkIHRyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC50YWJsZXMge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFibGUucHJvZmljaWVuY2llcyB0ZDpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICB3aWR0aDogMTI2cHg7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDEyNnB4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5ucGNOYW1lIHtcbiAgICAgICAgICAgIGNvbG9yOiAke2NvbG9yLnllbGxvd1s1MDBdfTtcbiAgICAgICAgICAgIG1hcmdpbjogMCAwIC0zcHggMDtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnU3BlY3RyYWwgU0MnLCBzZXJpZjtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjFweDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLm5wY1R5cGUge1xuICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgICAgIGNvbG9yOiAke2NvbG9yLmdyZXlbMjAwXX07XG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke2NvbG9yLnllbGxvd1s1MDBdfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAubnBjLXNlY3Rpb24ge1xuICAgICAgICAgICAgcGFkZGluZzogMTJweCAwO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgY29sb3I6ICR7Y29sb3IuZ3JleVsxMDBdfTtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke2NvbG9yLnllbGxvd1s1MDBdfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAubnBjLXNlY3Rpb24gdWwge1xuICAgICAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLm5wYy1zZWN0aW9uIHNwYW4ge1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA2cHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLm5wYy1zZWN0aW9uIGEge1xuICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZS1vdXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLm5wYy1zZWN0aW9uIGE6aG92ZXIge1xuICAgICAgICAgICAgY29sb3I6ICR7Y29sb3IueWVsbG93WzUwMF19O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5ucGMtc3RhdHMge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLnN0YXQge1xuICAgICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuc3RhdCBzdHJvbmcge1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuY29uc3QgVG9nZ2xlID0gKHsgaXNPbiwgb25DbGljayB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtpc09uICYmICdvbid9IG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxzcGFuIC8+XG5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICBkaXYge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yLmdyZXlbNzAwXX07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDI0cHg7XG4gICAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXMgZWFzZS1vdXQ7XG4gICAgICB9XG5cbiAgICAgIHNwYW4ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yLnllbGxvd1s1MDBdfTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDI0cHg7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjE1cyBlYXNlLW91dDtcbiAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICB3aWR0aDogMjRweDtcbiAgICAgIH1cblxuICAgICAgc3Bhbjpob3ZlciB7XG4gICAgICAgIG9wYWNpdHk6IDAuNztcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgfVxuXG4gICAgICAub24ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yLmdyZXlbOTAwXX07XG4gICAgICB9XG5cbiAgICAgIC5vbiBzcGFuIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDI0cHg7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICA8L2Rpdj5cbilcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NoZWV0cy81dGggRWRpdGlvbiBPR0wvaW5kZXguanMiLCJleHBvcnQgY29uc3QgY29sb3IgPSB7XG4gIGdyZXk6IHtcbiAgICA5NTA6ICcjMTExJyxcbiAgICA5MDA6ICcjMjEyMTIxJyxcbiAgICA4MDA6ICcjNDI0MjQyJyxcbiAgICA3MDA6ICcjNjE2MTYxJyxcbiAgICA2MDA6ICcjNzU3NTc1JyxcbiAgICA1MDA6ICcjOUU5RTlFJyxcbiAgICA0MDA6ICcjQkRCREJEJyxcbiAgICAzMDA6ICcjRTBFMEUwJyxcbiAgICAyMDA6ICcjRUVFRUVFJyxcbiAgICAxMDA6ICcjRjVGNUY1JyxcbiAgICA1MDogJyNGQUZBRkEnLFxuICAgIDA6ICcjRkZGRkZGJyxcbiAgICBwcmltYXJ5OiAnIzlFOUU5RScsXG4gICAgc2Vjb25kYXJ5OiAnIzQyNDI0MicsXG4gIH0sXG5cbiAgeWVsbG93OiB7XG4gICAgJzUwJzogJyNmZmZkZTcnLFxuICAgICcxMDAnOiAnI2ZmZjljNCcsXG4gICAgJzIwMCc6ICcjZmZmNTlkJyxcbiAgICAnMzAwJzogJyNmZmYxNzYnLFxuICAgICc0MDAnOiAnI2ZmZWU1OCcsXG4gICAgJzUwMCc6ICcjZmZlYjNiJyxcbiAgICAnNjAwJzogJyNmZGQ4MzUnLFxuICAgICc3MDAnOiAnI2ZiYzAyZCcsXG4gICAgJzgwMCc6ICcjZjlhODI1JyxcbiAgICAnOTAwJzogJyNmNTdmMTcnLFxuICAgICdhMTAwJzogJyNmZmZmOGQnLFxuICAgICdhMjAwJzogJyNmZmZmMDAnLFxuICAgICdhNDAwJzogJyNmZmVhMDAnLFxuICAgICdhNzAwJzogJyNmZmQ2MDAnLFxuICB9LFxuXG4gIGJhY2tncm91bmQ6IHtcbiAgICBwcmltYXJ5OiAnIzIxMjEyMScsXG4gICAgc2Vjb25kYXJ5OiAnI0U2NTEwMCcsXG4gICAgaW52ZXJzZTogJyNGQUZBRkEnLFxuICAgIHByaW1hcnlUcmFuc3BhcmVudDogJ3JnYmEoMzMsIDMzLCAzMywgMC44KScsXG4gIH0sXG5cbiAgdGV4dDoge1xuICAgIHByaW1hcnk6ICcjRkFGQUZBJyxcbiAgICBzZWNvbmRhcnk6ICcjRkZBNzI2JyxcbiAgICBpbnZlcnNlOiAnIzIxMjEyMScsXG4gIH0sXG5cbiAgZXJyb3I6ICcjZWY1MzUwJyxcbiAgd2FybmluZzogJyNGRjcwNDMnLFxuICBzdWNjZXNzOiAnIzY2QkI2QScsXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zaGVldHMvc3R5bGVzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
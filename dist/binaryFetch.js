/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = binaryFetch;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinaryFetch = function () {
  function BinaryFetch(src, options) {
    _classCallCheck(this, BinaryFetch);

    this.src = src;
    this.options = options;
  }

  _createClass(BinaryFetch, [{
    key: 'fetch',
    value: function fetch() {
      var _this = this;

      var xhr = new XMLHttpRequest();
      xhr.open(this.options.method ? this.options.method : 'GET', this.src);
      xhr.overrideMimeType('text\/plain; charset=x-user-defined');
      for (var key in this.options.headers) {
        if (obj.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, this.options.headers[key]);
        }
      }
      if (this.options.timeout) xhr.timeout = this.options.timeout;
      xhr.onprogress = function (e) {
        var uInt8Array = _this.strToUint8Array(xhr.responseText);
        _this.progress({
          timeStamp: e.timeStamp,
          total: e.total,
          type: e.type,
          loaded: e.loaded,
          status: xhr.status,
          headers: _this.getResponseHeaders(xhr),
          arrayBuffer: function arrayBuffer() {
            return _this.arrayBuffer(uInt8Array);
          },
          arrayBufferView: function arrayBufferView() {
            return Promise.resolve(uInt8Array);
          },
          blob: function blob() {
            return _this.blob(uInt8Array);
          },
          text: function text() {
            return Promise.resolve(xhr.responseText);
          }
        });
      };
      xhr.onload = function (e) {
        var uInt8Array = _this.strToUint8Array(xhr.responseText);
        _this.resolve({
          timeStamp: e.timeStamp,
          total: e.total,
          type: e.type,
          loaded: e.loaded,
          status: xhr.status,
          headers: _this.getResponseHeaders(xhr),
          arrayBuffer: function arrayBuffer() {
            return _this.arrayBuffer(uInt8Array);
          },
          arrayBufferView: function arrayBufferView() {
            return Promise.resolve(uInt8Array);
          },
          blob: function blob() {
            return _this.blob(uInt8Array);
          },
          text: function text() {
            return Promise.resolve(xhr.responseText);
          },
          json: function json() {
            return Promise.resolve(JSON.parse(xhr.responseText));
          }
        });
      };
      xhr.ontimeout = function (e) {
        var err = new Error('Timeout');
        err.context = e;
        _this.reject(err);
      };
      xhr.onerror = function (e) {
        var err = new Error('Fetch error');
        err.context = e;
        _this.reject(err);
      };
      xhr.send(this.options.body);
    }
  }, {
    key: 'strToUint8Array',
    value: function strToUint8Array(str) {
      var uInt8Array = new Uint8Array(new ArrayBuffer(str.length));
      for (var i = 0; i < str.length; i++) {
        uInt8Array[i] = str.charCodeAt(i) & 0xff;
      }
      return uInt8Array;
    }
  }, {
    key: 'getResponseHeaders',
    value: function getResponseHeaders(xhr) {
      var headersRaw = xhr.getAllResponseHeaders();
      var headersArray = headersRaw.split('\n');
      var headers = {};
      headersArray.map(function (header) {
        var key = header.substring(0, header.indexOf(':'));
        if (key.length > 0) {
          headers[key] = header.substring(header.indexOf(':') + 2, header.length - 1);
        }
      });
      return headers;
    }
  }, {
    key: 'arrayBuffer',
    value: function arrayBuffer(uInt8Array) {
      return new Promise(function (resolve, reject) {
        var arrayBuffer = new ArrayBuffer(uInt8Array.length);
        uInt8Array.map(function (i, value) {
          arrayBuffer[i] = value;
        });
        resolve(arrayBuffer);
      });
    }
  }, {
    key: 'blob',
    value: function blob(uInt8Array) {
      return this.arrayBuffer(uInt8Array).then(function (arrayBuffer) {
        return new Blob([arrayBuffer]);
      });
    }
  }]);

  return BinaryFetch;
}();

function binaryFetch(src, options, progress) {
  var _arguments = arguments;

  return new Promise(function (resolve, reject) {
    switch (_arguments.length) {
      case 0:
        reject(new Error('Missing src argument'));
        break;
      case 1:
        options = {};
        progress = function progress() {};
        break;
      case 2:
        if (typeof _arguments[1] === 'function') {
          options = {};
          progress = _arguments[1];
        } else {
          progress = function progress() {};
        }
        break;
    }
    var binaryFetch = new BinaryFetch(src, options);
    binaryFetch.progress = progress;
    binaryFetch.resolve = resolve;
    binaryFetch.reject = reject;
    binaryFetch.fetch();
  });
}

/***/ })
/******/ ]);
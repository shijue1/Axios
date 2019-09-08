// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"xhr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var xhr = new XMLHttpRequest();

var _default = function _default(_ref) {
  var _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      url = _ref.url,
      headers = _ref.headers;
  return new Promise(function (resolve, reject) {
    xhr.open(method, url, true);

    xhr.onload = function () {
      var res = JSON.parse(xhr.responseText);
      resolve(res);
    };

    Object.keys(headers).forEach(function (key) {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.send();
  });
};

exports.default = _default;
},{}],"defaults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var config = {
  baseURL: '',
  url: '',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
};
var _default = config;
exports.default = _default;
},{}],"utils/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCopy = exports.deepMerge = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 深度合并（简单版）
 * 注：仅合并对象中的自身可迭代属性，其他的都不合并，合并规则如下：
 * boolean、number、string、null、undefined、Array 和 function 类型采用覆盖的方式合并，
 * 除此以外的引用类型，使用深度合并。
 * @param { Object * n}  被合并对象，后者合并优先级高于前者
 * @returns 深度合并后的对象
 */
var deepMerge = function deepMerge() {
  var target = {};

  for (var i = 0; i < arguments.length; i++) {
    var source = i < 0 || arguments.length <= i ? undefined : arguments[i];

    for (var key in source) {
      if (!source.hasOwnProperty(key)) {
        continue;
      }

      var value = source[key];

      if (_typeof(value) !== 'object' || value === null || value.constructor === Array) {
        target[key] = value;
      } else {
        target[key] = deepMerge(target[key], value);
      }
    }
  }

  return target;
};
/**
 * 深度拷贝（简单版）
 * 注：仅拷贝对象中的自身可迭代属性，其他的都不拷贝，拷贝规则如下：
 * boolean、number、string、null、undefined 和 function 类型采用浅拷贝，
 * 除此以外的引用类型（对象和数组），使用深拷贝。
 * @param { Array | Object } source 被拷贝对象
 * @returns 深度拷贝后的对象
 */


exports.deepMerge = deepMerge;

var deepCopy = function deepCopy(source) {
  var target = {};

  var deepCopyArray = function deepCopyArray(array) {
    return array.map(function (item) {
      if (_typeof(item) !== 'object' || item === null) {
        return item;
      } else if (item.constructor === Array) {
        return deepCopyArray(item);
      } else {
        return deepCopy(item);
      }
    });
  };

  for (var key in source) {
    if (!source.hasOwnProperty(key)) {
      continue;
    }

    var value = source[key];

    if (_typeof(value) !== 'object' || value === null) {
      target[key] = value;
    } else if (value.constructor === Array) {
      target[key] = deepCopyArray(value);
    } else {
      target[key] = deepCopy(value);
    }
  }

  return target;
};

exports.deepCopy = deepCopy;
},{}],"axios.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xhr = _interopRequireDefault(require("./xhr"));

var _defaults = _interopRequireDefault(require("./defaults"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = new function Axios() {
  var _this = this;

  _classCallCheck(this, Axios);

  this.request = function (url) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // 模拟方法重载
    if (typeof url === 'string') {
      option.url = url;
    } else {
      option = url;
    } // 合并配置项


    option = (0, _utils.deepMerge)(_this.request.defaults, option);
    option = (0, _utils.deepMerge)(option, {
      url: option.baseURL ? option.baseURL + option.url : option.url
    }); // 发起 XMLHttpRequest 请求，并返回一个 Promise 实例

    return (0, _xhr.default)(option).then(function (res) {
      return res;
    });
  };

  Object.assign(this.request, {
    defaults: _defaults.default,
    get: this.request
  });
  return this.request;
}();

exports.default = _default;
},{"./xhr":"xhr.js","./defaults":"defaults.js","./utils":"utils/index.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _axios = _interopRequireDefault(require("./axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios.default.defaults.baseURL = 'http://localhost:3004'; // axios.get('/', {
//     baseURL: 'http://localhost:3004',
//     headers: {'Xsssss-Requested-With': 'XMLHttpRequest'},
// }).then(res => {
//     debugger
// })

(0, _axios.default)({
  method: 'get',
  url: '/',
  headers: {
    a: 1
  }
}).then(function (res) {});
/*

模拟 axios 的 api 用法

const a = axios.create({ @todo
    baseURL: 'http://localhost:3004',
    timeout: 1000,
})

*/
},{"./axios":"axios.js"}],"../../../.nvm/versions/node/v11.11.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50649" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v11.11.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/front.e31bb0bc.js.map
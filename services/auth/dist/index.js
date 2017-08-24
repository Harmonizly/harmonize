module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _bunyan = __webpack_require__(42);

var _bunyan2 = _interopRequireDefault(_bunyan);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _bunyanCloudwatch = __webpack_require__(43);

var _bunyanCloudwatch2 = _interopRequireDefault(_bunyanCloudwatch);

var _bunyanNewrelicStream = __webpack_require__(44);

var _bunyanNewrelicStream2 = _interopRequireDefault(_bunyanNewrelicStream);

var _process = __webpack_require__(9);

var _process2 = _interopRequireDefault(_process);

var _v = __webpack_require__(56);

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

/**
 * Class representing Logger
 */

var Logger = function () {

  /**
   * Instantiates instance or returns previous one if it already exists
   * @return { Object } Instance of the Logger class by calling init method
   */
  function Logger() {
    _classCallCheck(this, Logger);

    this.loggers = {};

    if (instance == null) {
      this.init(_config2.default.get('loggers'));
      instance = this;
    }
    return instance;
  }

  /**
   * Initialization method which sets logger using provided confing and depending on an environment
   * @param { Object } loggersConfig - Configuration options for logger
   */


  Logger.prototype.init = function init(loggersConfig) {
    var _this = this;

    var loggerConfig = void 0;
    var handlersConfig = loggersConfig.get('handlers');
    handlersConfig.forEach(function (obj) {
      loggerConfig = Object.assign({}, obj);
      var name = loggerConfig.name.toLowerCase();
      var stream = loggerConfig.stream;

      delete loggerConfig.stream;
      var logger = _bunyan2.default.createLogger(loggerConfig);

      _this.loadStreams(logger, stream, loggersConfig.get('streams'));
      _this.loggers[name] = logger;
    });

    // Enable forwarding logged errors to Newrelic Reporting if the server is in a production environment
    if (_process2.default.env.NODE_ENV === 'production') {
      _bunyan2.default.createLogger({
        name: 'arbiter',
        streams: [{
          level: 'error',
          type: 'raw',
          stream: new _bunyanNewrelicStream2.default()
        }]
      });
    }
  };

  /**
   * Gets certain logger by name or returns root if name isn't provided
   * @param  { string } name - Name of the logger we want to get
   * @return { Object } Logger of the nae we provided
   */


  Logger.get = function get(name) {
    if (!instance) {
      instance = new Logger();
    }

    var loggerName = void 0;
    if (name == null) {
      loggerName = 'root';
    } else {
      loggerName = name.toLowerCase();
    }
    return instance.loggers[loggerName];
  };

  /**
   * Loads streams for cloudwatch
   * @param { Object } logger - logger instance
   * @param { string } name - name of the stream
   * @param { Object } streamsConfig - configuration for the stream
   */


  Logger.prototype.loadStreams = function loadStreams(logger, name, streamsConfig) {
    var streamConfig = void 0;
    switch (name) {
      case 'cloudwatch':
        streamConfig = Object.assign({}, streamsConfig.get('cloudwatch'));
        streamConfig.logStreamName += '-' + _process2.default.pid + '-' + (0, _v2.default)();
        logger.addStream({
          name: 'cloudwatch',
          type: 'raw',
          stream: (0, _bunyanCloudwatch2.default)(Object.assign({}, streamConfig))
        });
        break;
      default:
        break;
    }
  };

  return Logger;
}();

exports.default = Logger;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var FATAL_ERROR = exports.FATAL_ERROR = {
  status: 500,
  code: 0,
  category: 'IllegalStateException',
  message: 'An error occurred. If this error persists, please contact your System Administrator'
};

/**
 * General error constructor
 * @param { string } message - Message used to construct error
 * @param { string } extra - Extra info to the error message
 * @return { Object } Error object that contains status, code, category, message and extra info
 */
var GENERAL_ERROR = exports.GENERAL_ERROR = function GENERAL_ERROR(message) {
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return {
    status: 400,
    code: 0,
    category: 'GeneralException',
    message: message,
    extra: extra
  };
};

var NOT_YET_IMPLEMENTED = exports.NOT_YET_IMPLEMENTED = {
  status: 501,
  code: 1,
  category: 'NotYetImplemented',
  message: 'This method must be implmented'
};

var ILLEGAL_STATE_EXCEPTION = exports.ILLEGAL_STATE_EXCEPTION = {
  status: 500,
  code: 2,
  category: 'IllegalStateException',
  message: 'Application not configured correctly'
};

var NOT_AUTHORIZED = exports.NOT_AUTHORIZED = {
  status: 401,
  code: 3,
  category: 'SecurityException',
  message: 'You are not authorized to access this resource'
};

var NOT_ALLOWED = exports.NOT_ALLOWED = {
  status: 403,
  code: 4,
  category: 'SecurityException',
  message: 'You are not authorized to access this resource'
};

var MISSING_REQUIRED_PARAMETER = exports.MISSING_REQUIRED_PARAMETER = {
  status: 400,
  code: 5,
  category: 'GeneralException',
  message: 'A required parameter was missing'
};

var MISSING_USERNAME_PARAMETER = exports.MISSING_USERNAME_PARAMETER = {
  status: 400,
  code: 6,
  category: 'GeneralException',
  message: 'The request parameter \'username\' is required'
};

var MISSING_OAUTH_TOKEN_PARAMETER = exports.MISSING_OAUTH_TOKEN_PARAMETER = {
  status: 400,
  code: 7,
  category: 'GeneralException',
  message: 'The request parameter \'token\' is required'
};

var MISSING_CLIENT_ID_PARAMETER = exports.MISSING_CLIENT_ID_PARAMETER = {
  status: 400,
  code: 8,
  category: 'GeneralException',
  message: 'The request parameter \'clientId\' is required'
};

var MISSING_PROFILE_PARAMETER = exports.MISSING_PROFILE_PARAMETER = {
  status: 400,
  code: 9,
  category: 'GeneralException',
  message: 'The request parameter \'profile\' is required'
};

var MODEL_NOT_FOUND = exports.MODEL_NOT_FOUND = {
  status: 404,
  code: 100,
  category: 'NotFoundException',
  message: 'Requested model could not be found'
};

var CLIENT_NOT_FOUND = exports.CLIENT_NOT_FOUND = {
  status: 404,
  code: 100,
  category: 'IllegalStateException',
  message: 'Could not find client for user'
};

var CLIENT_MISSING_CLIENT_URL = exports.CLIENT_MISSING_CLIENT_URL = {
  status: 404,
  code: 100,
  category: 'IllegalStateException',
  message: 'Could not find client url for user'
};

var USER_NOT_FOUND = exports.USER_NOT_FOUND = {
  status: 401,
  code: 101,
  category: 'SecurityException',
  message: 'Invalid user credentials'
};

var GOOGLE_ACCOUNT_NOT_FOUND = exports.GOOGLE_ACCOUNT_NOT_FOUND = {
  status: 401,
  code: 102,
  category: 'SecurityException',
  message: 'No ThriveHive Account found for that Google Account',
  extra: 'Either you don\'t have a ThriveHive Account or you have not linked your ThriveHive Account with your Google' + ' Account'
};

var FACEBOOK_ACCOUNT_NOT_FOUND = exports.FACEBOOK_ACCOUNT_NOT_FOUND = {
  status: 401,
  code: 103,
  category: 'SecurityException',
  message: 'No ThriveHive Account found for that Facebook Account',
  extra: 'Either you don\'t have a ThriveHive Account or you have not linked your ThriveHive Account with your ' + 'Facebook Account'
};

var INSTAGRAM_ACCOUNT_NOT_FOUND = exports.INSTAGRAM_ACCOUNT_NOT_FOUND = {
  status: 401,
  code: 104,
  category: 'SecurityException',
  message: 'No ThriveHive Account found for that Instagram Account',
  extra: 'Either you don\'t have a ThriveHive Account or you have not linked your ThriveHive Account with your ' + 'Instagram Account'
};

var TWITTER_ACCOUNT_NOT_FOUND = exports.TWITTER_ACCOUNT_NOT_FOUND = {
  status: 401,
  code: 105,
  category: 'SecurityException',
  message: 'No ThriveHive Account found for that Twitter Account',
  extra: 'Either you don\'t have a ThriveHive Account or you have not linked your ThriveHive Account with your ' + 'Twitter Account'
};

var GOOGLE_ACCOUNT_NOT_LINKABLE = exports.GOOGLE_ACCOUNT_NOT_LINKABLE = {
  status: 400,
  code: 106,
  category: 'TransactionException',
  message: 'That Google Account is already linked to a different user'
};

var GOOGLE_ACCOUNT_LINKED = exports.GOOGLE_ACCOUNT_LINKED = {
  status: 400,
  code: 107,
  category: 'TransactionException',
  message: 'That Google Account is already linked to the user'
};

var FACEBOOK_ACCOUNT_NOT_LINKABLE = exports.FACEBOOK_ACCOUNT_NOT_LINKABLE = {
  status: 400,
  code: 108,
  category: 'TransactionException',
  message: 'That Facebook Account is already linked to a different user'
};

var FACEBOOK_ACCOUNT_LINKED = exports.FACEBOOK_ACCOUNT_LINKED = {
  status: 400,
  code: 109,
  category: 'TransactionException',
  message: 'That Facebook Account is already linked to the user'
};

var INSTAGRAM_ACCOUNT_NOT_LINKABLE = exports.INSTAGRAM_ACCOUNT_NOT_LINKABLE = {
  status: 400,
  code: 110,
  category: 'TransactionException',
  message: 'That Instagram Account is already linked to a different user'
};

var INSTAGRAM_ACCOUNT_LINKED = exports.INSTAGRAM_ACCOUNT_LINKED = {
  status: 400,
  code: 111,
  category: 'TransactionException',
  message: 'That Instagram Account is already linked to the user'
};

var TWITTER_ACCOUNT_EXISTS = exports.TWITTER_ACCOUNT_EXISTS = {
  status: 400,
  code: 110,
  category: 'TransactionException',
  message: 'That Twitter Account is already linked to a user'
};

var TWITTER_ACCOUNT_LINKED = exports.TWITTER_ACCOUNT_LINKED = {
  status: 400,
  code: 111,
  category: 'TransactionException',
  message: 'That Twitter Account is already linked to the user'
};

var FACEBOOK_ACCOUNT_NOT_CONFIGURED = exports.FACEBOOK_ACCOUNT_NOT_CONFIGURED = {
  status: 500,
  code: 112,
  category: 'SecurityException',
  message: 'Google OAuth2 has not been properly configured'
};

var SOCIAL_OATUH_NOT_CONFIGURED = exports.SOCIAL_OATUH_NOT_CONFIGURED = {
  status: 500,
  code: 112,
  category: 'SecurityException',
  message: 'OAuth2 for that account has not been properly configured'
};

var MODEL_NOT_UPDATED = exports.MODEL_NOT_UPDATED = {
  status: 400,
  code: 200,
  category: 'TransactionException',
  message: 'Update failed'
};

var MODEL_NOT_CREATED = exports.MODEL_NOT_CREATED = {
  status: 400,
  code: 201,
  category: 'TransactionException',
  message: 'Creation failed'
};

/**
 * Validation error constructor
 * @param { string } message - Message used to construct error
 * @param { string } extra - Extra info to the error message
 * @return { Object } Error object that contains status, code, category, message and extra info
 */
var VALIDATION_ERROR = exports.VALIDATION_ERROR = function VALIDATION_ERROR(message) {
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return {
    status: 400,
    code: 202,
    category: 'ValidationException',
    message: message,
    extra: extra
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _facebook = __webpack_require__(36);

var _facebook2 = _interopRequireDefault(_facebook);

var _local = __webpack_require__(37);

var _local2 = _interopRequireDefault(_local);

var _logger = __webpack_require__(1);

var _logger2 = _interopRequireDefault(_logger);

var _passport = __webpack_require__(50);

var _passport2 = _interopRequireDefault(_passport);

var _user = __webpack_require__(8);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PASSPORT_CONFIG = _config2.default.auth.passport;
var LOGGER = _logger2.default.get('auth');

_passport2.default.use('facebook', (0, _facebook2.default)(PASSPORT_CONFIG.facebook));
_passport2.default.use('google', (0, _facebook2.default)(PASSPORT_CONFIG.google));
_passport2.default.use('instagram', (0, _facebook2.default)(PASSPORT_CONFIG.instagram));
_passport2.default.use('local', (0, _local2.default)(PASSPORT_CONFIG.local));

// serializeUser is used by Passport Session to convert the User object
// to a single value that can be later deserialized back to a User object.
_passport2.default.serializeUser(function (user, done) {
  done(null, user.id);
});

// Given the string id, return the User object back to Passport session
_passport2.default.deserializeUser(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, done) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user2.default.where({ id: id });

          case 3:
            user = _context.sent;

            done(null, user);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            done(_context.t0);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = _passport2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (driver, name) {
  var Cls = (0, _seraphModel2.default)(driver, name);

  /**
   * [description]
   * @param  {[type]} idOrObject [description]
   * @return {[type]}            [description]
   */
  Cls.exists = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(idOrObject) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', new Promise(function (resolve, reject) {
                return Cls.prototype.exists(idOrObject, function (err, result) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(result);
                });
              }));

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * [description]
   * @param  {[type]} opts [description]
   * @return {[type]}      [description]
   */
  Cls.findAll = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(opts) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', new Promise(function (resolve, reject) {
                return Cls.prototype.findAll(opts, function (err, results) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(results);
                });
              }));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * [description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  Cls.prepare = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', new Promise(function (resolve, reject) {
                return Cls.prototype.prepare(data, function (err, result) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(result);
                });
              }));

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  /**
   * [description]
   * @param  {[type]} root     [description]
   * @param  {[type]} compName [description]
   * @param  {[type]} object   [description]
   * @return {[type]}          [description]
   */
  Cls.push = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(root, compName, object) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt('return', new Promise(function (resolve, reject) {
                return Cls.prototype.push(root, compName, object, function (err, results) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(results);
                });
              }));

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x4, _x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  /**
   * [description]
   * @param  {[type]} query  [description]
   * @param  {[type]} params [description]
   * @param  {[type]} opts   [description]
   * @return {[type]}        [description]
   */
  Cls.query = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(query, params, opts) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt('return', new Promise(function (resolve, reject) {
                return Cls.prototype.query(query, params, opts, function (err, results) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(results);
                });
              }));

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x7, _x8, _x9) {
      return _ref5.apply(this, arguments);
    };
  }();

  /**
   * [description]
   * @param  {[type]} data [description]
   * @return {[type]}         [description]
   */
  Cls.read = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(data) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt('return', new Promise(function (resolve, reject) {
                return Cls.prototype.read(data, function (err, result) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(result);
                });
              }));

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x10) {
      return _ref6.apply(this, arguments);
    };
  }();

  /**
   * [description]
   * @param  {[type]} data [description]
   * @return {[type]}         [description]
   */
  Cls.save = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(data) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt('return', new Promise(function (resolve, reject) {
                return Cls.prototype.save(data, function (err, result) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(result);
                });
              }));

            case 1:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function (_x11) {
      return _ref7.apply(this, arguments);
    };
  }();

  /**
   * [description]
   * @param  {[type]} root     [description]
   * @param  {[type]} compName [description]
   * @param  {[type]} objects  [description]
   * @return {[type]}          [description]
   */
  Cls.saveComposition = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(root, compName, objects) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt('return', new Promise(function (resolve, reject) {
                return Cls.prototype.saveComposition(root, compName, objects, function (err, results) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(results);
                });
              }));

            case 1:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function (_x12, _x13, _x14) {
      return _ref8.apply(this, arguments);
    };
  }();

  /**
   * [description]
   * @param  {[type]} data [description]
   * @return {[type]}         [description]
   */
  Cls.update = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(data) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt('return', new Promise(function (resolve, reject) {
                return Cls.prototype.update(data, function (err, result) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(result);
                });
              }));

            case 1:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    return function (_x15) {
      return _ref9.apply(this, arguments);
    };
  }();

  /**
   * [description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  Cls.validate = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(data) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt('return', new Promise(function (resolve, reject) {
                return Cls.prototype.exists(data, function (err, result) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(result);
                });
              }));

            case 1:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    return function (_x16) {
      return _ref10.apply(this, arguments);
    };
  }();

  /**
   * [description]
   * @param  {[type]} predicate [description]
   * @param  {[type]} opts      [description]
   * @return {[type]}           [description]
   */
  Cls.where = function (predicate) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new Promise(function (resolve, reject) {
      Cls.prototype.where(predicate, opts, function (err, result) {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  };

  return Cls;
};

var _seraphModel = __webpack_require__(55);

var _seraphModel2 = _interopRequireDefault(_seraphModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * [description]
 * @param  {[type]} driver [description]
 * @param  {[type]} name   [description]
 * @return {[type]}        [description]
 */

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _seraph = __webpack_require__(54);

var _seraph2 = _interopRequireDefault(_seraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbConfig = _config2.default.auth.db;
var driver = (0, _seraph2.default)({
  server: dbConfig.server,
  endpoint: dbConfig.endpoint,
  user: dbConfig.user,
  pass: dbConfig.password
});

exports.default = driver;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.handleAuthError = exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _logger = __webpack_require__(1);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LOGGER = _logger2.default.get('auth');

/**
 * Class representing an Exception
 * @extends Error
 */

var Exception = function (_Error) {
  _inherits(Exception, _Error);

  /**
   * Creates new Error and assigns payload, code, category and status
   * @param  { string|Object } payload - String or object passed to constructor to create Error
   * @param  { number } [code = -1] - Error code
   * @param  { number } [status = 500] - Error status
   */
  function Exception(payload) {
    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;

    _classCallCheck(this, Exception);

    if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) !== 'object') {
      payload = {
        category: "N/A",
        code: code,
        message: payload,
        status: status
      };
    }

    var _this = _possibleConstructorReturn(this, _Error.call(this));

    _this.message = '' + payload.message + (payload.extra ? '. ' + payload.extra : '');
    _this.category = payload.category;
    _this.status = payload.status;
    return _this;
  }

  return Exception;
}(Error);

/**
 * Handles auth error in case status is 401 or 403
 * @param  { * } e - Error, we expect it to have status which we check against
 * @param  { Function } done - Callback function
 */


exports.default = Exception;
var handleAuthError = exports.handleAuthError = function handleAuthError(e, done) {
  LOGGER.error(e);
  if ('status' in e && (e.status === 401 || e.status === 403)) {
    return done(null, false, e);
  }
  return done(e);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _bcrypt = __webpack_require__(40);

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _neo4j = __webpack_require__(6);

var _neo4j2 = _interopRequireDefault(_neo4j);

var _logger = __webpack_require__(1);

var _logger2 = _interopRequireDefault(_logger);

var _seraphAdapter = __webpack_require__(5);

var _seraphAdapter2 = _interopRequireDefault(_seraphAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var LOGGER = _logger2.default.get('auth');

// Create the User AAA model
var User = (0, _seraphAdapter2.default)(_neo4j2.default, 'user');

/**
 *
 */
User.schema = {
  email: { type: 'string', required: true },
  id: { type: 'number', required: true },
  lastPasswordUpdate: { type: 'date' },
  password: { type: 'string', required: true },
  username: { type: 'string', required: true }
};

User.setUniqueKey('id');
User.setUniqueKey('username');
User.useTimestamps();

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
User.beforeSave = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var hash, didNeedUpdate;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!data.password) {
              _context.next = 8;
              break;
            }

            _context.next = 3;
            return User.hashPassword(data.password);

          case 3:
            hash = _context.sent;
            _context.next = 6;
            return User.verifyPassword(data.password, hash);

          case 6:
            didNeedUpdate = _context.sent;

            if (didNeedUpdate) {
              data.password = hash;
            }

          case 8:
            return _context.abrupt('return', this);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * [description]
 * @param  {[type]} plainText [description]
 * @return {[type]}           [description]
 */
User.hashPassword = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(plainText) {
    var hash;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcrypt2.default.hash(plainText, _config2.default.saltRounds);

          case 2:
            hash = _context2.sent;
            return _context2.abrupt('return', hash);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * [description]
 * @param  {[type]} plainText [description]
 * @return {[type]}           [description]
 */
User.verifyPassword = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(plainText) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var verified, compare;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            verified = false;
            _context3.prev = 1;
            compare = hash || this.password;
            _context3.next = 5;
            return _bcrypt2.default.compare(plainText, compare);

          case 5:
            verified = _context3.sent;
            _context3.next = 12;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](1);

            LOGGER.error(_context3.t0);
            verified = false;

          case 12:
            return _context3.abrupt('return', verified);

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[1, 8]]);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = User;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("process");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _bodyParser = __webpack_require__(41);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _controllers = __webpack_require__(27);

var controllers = _interopRequireWildcard(_controllers);

var _error = __webpack_require__(32);

var _error2 = _interopRequireDefault(_error);

var _express = __webpack_require__(46);

var _express2 = _interopRequireDefault(_express);

var _connectFlashPlus = __webpack_require__(45);

var _connectFlashPlus2 = _interopRequireDefault(_connectFlashPlus);

var _fs = __webpack_require__(48);

var _fs2 = _interopRequireDefault(_fs);

var _https = __webpack_require__(49);

var _https2 = _interopRequireDefault(_https);

var _logger = __webpack_require__(1);

var _logger2 = _interopRequireDefault(_logger);

var _logging = __webpack_require__(33);

var _logging2 = _interopRequireDefault(_logging);

var _passport = __webpack_require__(4);

var _passport2 = _interopRequireDefault(_passport);

var _process = __webpack_require__(9);

var _process2 = _interopRequireDefault(_process);

var _render = __webpack_require__(34);

var _render2 = _interopRequireDefault(_render);

var _swagger = __webpack_require__(39);

var _swagger2 = _interopRequireDefault(_swagger);

var _openApi = __webpack_require__(23);

var _openApi2 = _interopRequireDefault(_openApi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
// import swaggerMiddleware from 'server/middleware/swagger';

/**
 * [app description]
 * @type {[type]}
 */
var Server = function () {

  /**
   * [constructor description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  function Server() {
    _classCallCheck(this, Server);

    this.config = _config2.default.server;

    // Initialize the express server
    this.app = (0, _express2.default)();

    this.configure();
  }

  /**
   * [logger description]
   * @type {[type]}
   */


  Server.prototype.configure = function configure() {
    this.logger = _logger2.default.get('root');

    // Catches ctrl+c event
    this.boundSigIntHandler = this.sigIntHandler.bind(this);
    _process2.default.on('SIGINT', this.boundSigIntHandler);

    // Catches uncaught exceptions
    this.boundUncaughtExceptionHandler = this.unhandledExceptionHandler.bind(this);
    _process2.default.on('uncaughtException', this.boundUncaughtExceptionHandler);
  };

  /**
   * [destroy description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.destroy = function destroy() {
    this.removeEventListeners();
  };

  /**
   * Attach middleware to the Express app.
   * Note: Order matters here.
   * @param  {[type]}  void [description]
   * @return {Promise}      [description]
   */


  Server.prototype.initMiddleware = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var assetsConfig;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Configure Request logging
              this.app.use(_logging2.default);

              // Configure the Express Static middleware
              assetsConfig = this.config.assets;


              this.app.use('/', _express2.default.static(assetsConfig.staticRoot));
              this.app.use('/', _express2.default.static(assetsConfig.distRoot));

              // Override the default rendering function
              this.app.use(_render2.default);

              // Initialize body parser before routes or body will be undefined
              this.app.use(_bodyParser2.default.urlencoded({ extended: true }));
              this.app.use(_bodyParser2.default.json());

              // Add flash message capabilities
              this.app.use((0, _connectFlashPlus2.default)({ unsafe: true }));

              // Configure passport.js
              this.app.use(_passport2.default.initialize());
              this.app.use(_passport2.default.session());

              // Configure the Swagger Middleware by using Sway
              // const swayMiddleware: Function = await swaggerMiddleware(swaggerConfig, controllers);
              //
              // this.app.use(swayMiddleware);

              (0, _openApi2.default)(_swagger2.default);

              // Configure the request error handling
              this.app.use(_error2.default);

              // Default fallback to 404 if the current route could not be handled
              this.app.all('*', function (request, response) {
                response.render('error/404');
              });

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function initMiddleware() {
      return _ref.apply(this, arguments);
    }

    return initMiddleware;
  }();

  /**
   * [callback description]
   * @type {Function}
   */


  Server.prototype.start = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _this = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var cb;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.app) {
                _context2.next = 2;
                break;
              }

              throw new Error('Cannot start server: the express instance is not defined');

            case 2:
              cb = function cb() {
                if (callback != null) {
                  callback();
                }

                var message = 'Server listening at ' + _this.config.get('hostname') + ':' + _this.config.get('port') + '...';

                _this.logger.info(message);
              };

              _context2.prev = 3;
              _context2.next = 6;
              return this.initMiddleware();

            case 6:
              return _context2.abrupt('return', this.config.get('secure') ? this.startHttps(cb) : this.startHttp(cb));

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](3);

              if (this.logger) {
                this.logger.error(_context2.t0);
              } else {
                /* eslint-disable no-console */
                console.error(_context2.t0);
              }
              this.destroy();
              return _context2.abrupt('return', _process2.default.exit(-1));

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 9]]);
    }));

    function start() {
      return _ref2.apply(this, arguments);
    }

    return start;
  }();

  /**
   * [startHttp description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.startHttp = function startHttp(callback) {
    return this.app.listen(this.config.get('port'), this.config.get('hostname'), this.config.get('backlog'), callback);
  };

  /**
   * [startHttps description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.startHttps = function startHttps(callback) {
    var _this2 = this;

    this.app.all('*', function (request, response, next) {
      if (request.secure) {
        return next();
      }
      return response.redirect('https://' + request.hostname + ':' + _this2.config.get('port') + request.url);
    });

    var sslConfig = this.config.get('ssl');
    var httpsConfig = Object.assign({}, sslConfig, {
      key: _fs2.default.readFileSync(sslConfig.get('key')),
      cert: _fs2.default.readFileSync(sslConfig.get('cert'))
    });

    return _https2.default.createServer(httpsConfig, this.app).listen(this.config.get('port'), this.config.get('hostname'), this.config.get('backlog'), callback);
  };

  /**
   * [stop description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */


  Server.prototype.stop = function stop() {
    var _this3 = this;

    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (this.app && this.app.server) {
      this.app.server.close(function () {
        if (callback != null && typeof callback === 'function') {
          callback();
        }
        _this3.logger.info('Server (' + _this3.config.hostname + ':' + _this3.config.port + ') stopping...');
      });
    }
    this.destroy();
  };

  /**
   * [sigIntHandler description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.sigIntHandler = function sigIntHandler() {
    if (this.logger) {
      this.logger.info('Captured ctrl-c');
    }

    this.stop();
    _process2.default.exit(1);
  };

  /**
   * [removeEventListeners description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.removeEventListeners = function removeEventListeners() {
    _process2.default.removeListener('SIGINT', this.boundSigIntHandler);
    _process2.default.removeListener('uncaughtException', this.boundUncaughtExceptionHandler);
  };

  /**
   * [unhandledExceptionHandler description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */


  Server.prototype.unhandledExceptionHandler = function unhandledExceptionHandler(e) {
    if (this.logger) {
      this.logger.error('Unhandled Exception. ' + e);
    }
  };

  return Server;
}();

exports.default = Server;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _routes = __webpack_require__(22);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 */
var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      _routes2.default
    );
  };

  return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */
var Error400 = function (_React$Component) {
  _inherits(Error400, _React$Component);

  function Error400() {
    _classCallCheck(this, Error400);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Error400.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      '400'
    );
  };

  return Error400;
}(_react2.default.Component);

exports.default = Error400;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */
var Error401 = function (_React$Component) {
  _inherits(Error401, _React$Component);

  function Error401() {
    _classCallCheck(this, Error401);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Error401.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      '401'
    );
  };

  return Error401;
}(_react2.default.Component);

exports.default = Error401;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */
var Error403 = function (_React$Component) {
  _inherits(Error403, _React$Component);

  function Error403() {
    _classCallCheck(this, Error403);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Error403.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      '403'
    );
  };

  return Error403;
}(_react2.default.Component);

exports.default = Error403;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */
var Error404 = function (_React$Component) {
  _inherits(Error404, _React$Component);

  function Error404() {
    _classCallCheck(this, Error404);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Error404.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      '404'
    );
  };

  return Error404;
}(_react2.default.Component);

exports.default = Error404;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */
var Error500 = function (_React$Component) {
  _inherits(Error500, _React$Component);

  function Error500() {
    _classCallCheck(this, Error500);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Error500.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      '500'
    );
  };

  return Error500;
}(_react2.default.Component);

exports.default = Error500;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */
var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login() {
    _classCallCheck(this, Login);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Login.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      'Login!'
    );
  };

  return Login;
}(_react2.default.Component);

exports.default = Login;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */
var PasswordReset = function (_React$Component) {
  _inherits(PasswordReset, _React$Component);

  function PasswordReset() {
    _classCallCheck(this, PasswordReset);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  PasswordReset.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      'Reset Password!'
    );
  };

  return PasswordReset;
}(_react2.default.Component);

exports.default = PasswordReset;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */
var PasswordResetRequest = function (_React$Component) {
  _inherits(PasswordResetRequest, _React$Component);

  function PasswordResetRequest() {
    _classCallCheck(this, PasswordResetRequest);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  PasswordResetRequest.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      'Reset Password Request!'
    );
  };

  return PasswordResetRequest;
}(_react2.default.Component);

exports.default = PasswordResetRequest;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _login = __webpack_require__(19);

var _login2 = _interopRequireDefault(_login);

var _reset = __webpack_require__(20);

var _reset2 = _interopRequireDefault(_reset);

var _resetRequest = __webpack_require__(21);

var _resetRequest2 = _interopRequireDefault(_resetRequest);

var _ = __webpack_require__(14);

var _2 = _interopRequireDefault(_);

var _3 = __webpack_require__(15);

var _4 = _interopRequireDefault(_3);

var _5 = __webpack_require__(16);

var _6 = _interopRequireDefault(_5);

var _7 = __webpack_require__(17);

var _8 = _interopRequireDefault(_7);

var _9 = __webpack_require__(18);

var _10 = _interopRequireDefault(_9);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [path description]
 * @type {String}
 */
// TODO handle logged in
exports.default = _react2.default.createElement(
  _reactRouter.Switch,
  null,
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/auth/login', component: _login2.default }),
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/auth/password/reset', component: _reset2.default }),
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/auth/password/reset/request', component: _resetRequest2.default }),
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/error/400', component: _2.default }),
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/error/401', component: _4.default }),
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/error/403', component: _6.default }),
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/error/404', component: _8.default }),
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/error/500', component: _10.default }),
  _react2.default.createElement(_reactRouter.Redirect, { from: '/auth', to: '/auth/login' }),
  _react2.default.createElement(_reactRouter.Redirect, { from: '/', to: '/auth/login' })
);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = openApi;
/**
 * [description]
 * @param  {[type]} definion [description]
 * @return {[type]}          [description]
 */
function openApi(definion) {
  console.log(definion);
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.connectAccountCallback = exports.connectAccount = exports.authenticateAccountCallback = exports.authenticateAccount = undefined;

var _passport = __webpack_require__(4);

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calls authenticate function on passport using facebook strategy and passing scope as option
 * @type { Object }
 */
var authenticateAccount = exports.authenticateAccount = _passport2.default.authenticate('facebook', {
  scope: ['email', 'public_profile']
});

/**
 * Calls authenticate function on passport using facebook strategy and passing redirection options
 * @type { Object }
 */
var authenticateAccountCallback = exports.authenticateAccountCallback = _passport2.default.authenticate('facebook', {
  failureRedirect: '/auth/facebook/connect',
  failureFlash: true
});

/**
 * Calls authorize function on passport using facebook strategy and passing scope as option
 * @type { Object }
 */
var connectAccount = exports.connectAccount = _passport2.default.authorize('facebook', {
  scope: ['email', 'public_profile']
});

/**
 * Calls authorize function on passport using facebook strategy and passing redirection options
 * @type { Object }
 */
var connectAccountCallback = exports.connectAccountCallback = _passport2.default.authorize('facebook', {
  failureRedirect: '/auth/facebook/connect',
  failureFlash: true
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.user = exports.password = exports.login = exports.instagram = exports.google = exports.facebook = exports.client = undefined;

var _client = __webpack_require__(24);

var client = _interopRequireWildcard(_client);

var _facebook = __webpack_require__(25);

var facebook = _interopRequireWildcard(_facebook);

var _google = __webpack_require__(26);

var google = _interopRequireWildcard(_google);

var _instagram = __webpack_require__(28);

var instagram = _interopRequireWildcard(_instagram);

var _login = __webpack_require__(29);

var login = _interopRequireWildcard(_login);

var _password = __webpack_require__(30);

var password = _interopRequireWildcard(_password);

var _user = __webpack_require__(31);

var user = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.client = client;
exports.facebook = facebook;
exports.google = google;
exports.instagram = instagram;
exports.login = login;
exports.password = password;
exports.user = user;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.render = exports.logout = exports.login = undefined;

var _passport = __webpack_require__(4);

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var login = exports.login = function login(request, response) {
  return response.send({ message: 'ok' });
};

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var logout = exports.logout = function logout(request, response) {
  request.logout();
  // TODO clear session and create new one
  // TODO set flash message
  return response.redirect('/login');
};

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var render = exports.render = function render(request, response) {
  console.log('inside login.render function');
  return response.render('/auth/login');
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var resetPassword = exports.resetPassword = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function resetPassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var list = exports.list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function list(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var register = exports.register = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(request, response) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function register(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var unregister = exports.unregister = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(request, response) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function unregister(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var update = exports.update = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(request, response) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function update(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = errorMiddleware;

var _logger = __webpack_require__(1);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGGER = _logger2.default.get('root');

/**
 * [description]
 * @param  {[type]} error    [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */


function errorMiddleware(error, request, response) {
  var status = 'status' in error ? error.status : 500;
  var code = 'code' in error ? error.code : -1;

  LOGGER.error({
    message: error.message,
    status: error.status,
    code: error.code,
    app: 'auth'
  });

  console.log(response.render);

  switch (status) {
    case 400:
      return response.render('/error/400', {
        message: error.message,
        code: code
      });
    case 401:
      return response.render('/error/401', {
        message: error.message,
        code: code
      });
    case 403:
      return response.render('/error/403', {
        code: code
      });
    case 404:
      return response.render('/error/404', {
        code: code
      });
    default:
      return response.render('/error/500', {
        code: code
      });
  }
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = loggingMiddleware;

var _logger = __webpack_require__(1);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGGER = _logger2.default.get('root');

/**
 * Class representing Logger Middleware
 * @extends AbstractMiddleware
 */


function loggingMiddleware(request, response, next) {
  LOGGER.info({
    method: request.method,
    url: request.url,
    headers: request.headers
  });
  next();
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = renderMiddleware;

var _app = __webpack_require__(13);

var _app2 = _interopRequireDefault(_app);

var _expressEs6TemplateEngine = __webpack_require__(47);

var _expressEs6TemplateEngine2 = _interopRequireDefault(_expressEs6TemplateEngine);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(53);

var _server2 = _interopRequireDefault(_server);

var _index = __webpack_require__(38);

var _index2 = _interopRequireDefault(_index);

var _reactRouter = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [render description]
 * @param  {[type]}   request  [description]
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
function renderMiddleware(request, response, next) {
  console.log('inside renderMiddleware');
  // eslint-disable-next-line no-param-reassign
  response.render = function (url, data) {
    var context = Object.assign({}, data);
    var markup = _server2.default.renderToString(_react2.default.createElement(
      _reactRouter.StaticRouter,
      { location: url, context: context },
      _react2.default.createElement(_app2.default, null)
    ));

    if (context.url) {
      return response.redirect(301, context.url);
    }

    var html = (0, _expressEs6TemplateEngine2.default)(_index2.default, { locals: { app: markup } });

    return response.send(html);
  };
  console.log(response.render);

  next();
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _neo4j = __webpack_require__(6);

var _neo4j2 = _interopRequireDefault(_neo4j);

var _seraphAdapter = __webpack_require__(5);

var _seraphAdapter2 = _interopRequireDefault(_seraphAdapter);

var _codes = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Create the Facebook Account model
var FacebookAccount = (0, _seraphAdapter2.default)(_neo4j2.default, 'facebook');

/**
 *
 */
FacebookAccount.schema = {
  id: { type: 'string', required: true },
  profile: { type: 'object', required: true }
};

FacebookAccount.setUniqueKey('id');
FacebookAccount.useTimestamps();

/**
 * [description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
FacebookAccount.connect = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(account, user) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              return _neo4j2.default.relate(account, 'connected', user, { to: user.id }, function (err, relationship) {
                if (err) {
                  return reject((0, _codes.GENERAL_ERROR)('Failed to link the Facebook Account ' + account.id + ' to the user \'' + user.username + '\': ' + err));
                }

                return resolve(relationship);
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * [description]
 * @param  {[type]} account [description]
 * @return {[type]}         [description]
 */
FacebookAccount.getConnectedUser = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(account) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new Promise(function (resolve, reject) {
              return _neo4j2.default.relationships(account, 'all', 'connected', function (err, relationships) {
                if (err) {
                  return reject(err);
                }

                // We assume only one connected relationship
                return resolve(relationships[0]);
              });
            }));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = FacebookAccount;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (config) {
  return new _passportFacebook2.default(config, handler);
};

var _facebook = __webpack_require__(35);

var _facebook2 = _interopRequireDefault(_facebook);

var _passportFacebook = __webpack_require__(51);

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

var _exception = __webpack_require__(7);

var _exception2 = _interopRequireDefault(_exception);

var _codes = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * [description]
 * @param  {[type]} user    [description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
var authFacebookAccount = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, profile) {
    var facebookAccount, linkedUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _facebook2.default.where({ id: profile.id });

          case 2:
            facebookAccount = _context.sent;

            if (facebookAccount) {
              _context.next = 5;
              break;
            }

            throw new _exception2.default(_codes.FACEBOOK_ACCOUNT_NOT_FOUND);

          case 5:
            linkedUser = _facebook2.default.getConnectedUser(facebookAccount);

            if (linkedUser) {
              _context.next = 8;
              break;
            }

            throw new _exception2.default(_codes.SOCIAL_OATUH_NOT_CONFIGURED);

          case 8:
            if (!(linkedUser.id !== user.id)) {
              _context.next = 10;
              break;
            }

            throw new _exception2.default(_codes.FACEBOOK_ACCOUNT_NOT_LINKABLE);

          case 10:
            return _context.abrupt('return', linkedUser);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function authFacebookAccount(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * [description]
 * @param  {[type]} user    [description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
var connectFacebookAccount = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user, profile) {
    var id, facebookAccount, linkedUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Check if account already exists. If it does and is currently linked, throw error
            // If it does and is not linked, skip save
            id = profile.id;
            _context2.next = 3;
            return _facebook2.default.where({ id: id });

          case 3:
            facebookAccount = _context2.sent;

            if (facebookAccount) {
              _context2.next = 13;
              break;
            }

            _context2.next = 7;
            return _facebook2.default.save({ id: profile.id, profile: profile });

          case 7:
            facebookAccount = _context2.sent;

            if (facebookAccount) {
              _context2.next = 10;
              break;
            }

            throw new _exception2.default((0, _codes.GENERAL_ERROR)('Failed to link the Facebook Account ' + id + ' to the user \'' + user.username + '\''));

          case 10:
            _context2.next = 12;
            return _facebook2.default.connect(facebookAccount, user);

          case 12:
            return _context2.abrupt('return', _context2.sent);

          case 13:
            linkedUser = _facebook2.default.getConnectedUser(facebookAccount);

            if (linkedUser) {
              _context2.next = 18;
              break;
            }

            _context2.next = 17;
            return _facebook2.default.connect(facebookAccount, user);

          case 17:
            return _context2.abrupt('return', _context2.sent);

          case 18:
            if (!(linkedUser.id !== user.id)) {
              _context2.next = 20;
              break;
            }

            throw new _exception2.default(_codes.FACEBOOK_ACCOUNT_NOT_LINKABLE);

          case 20:
            throw new _exception2.default(_codes.FACEBOOK_ACCOUNT_LINKED);

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function connectFacebookAccount(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Strategy for user authentication with Facebook
 * @param  { Object } request - Request object
 * @param  { Object } accessToken - Access token data
 * @param  { Object } refreshToken - Refresh token data
 * @param  { Object } profile - User profile data
 * @param  { Function } done - Callback
 * @return { Promise<*> } A promise that resolves by calling callback with
 *                        user data or rejects by calling util function
 *                        with provided error
 */
var handler = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(request, accessToken, refreshToken, profile, done) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            // If the user is authenticated, update/link their user data
            user = request.user;

            if (!user) {
              _context3.next = 7;
              break;
            }

            _context3.next = 5;
            return connectFacebookAccount(user, profile);

          case 5:
            _context3.next = 9;
            break;

          case 7:
            _context3.next = 9;
            return authFacebookAccount(user, profile);

          case 9:
            return _context3.abrupt('return', done(null, user));

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', (0, _exception.handleAuthError)(_context3.t0, done));

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 12]]);
  }));

  return function handler(_x5, _x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (config) {
  return new _passportLocal2.default(config, handler);
};

var _exception = __webpack_require__(7);

var _exception2 = _interopRequireDefault(_exception);

var _passportLocal = __webpack_require__(52);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _logger = __webpack_require__(1);

var _logger2 = _interopRequireDefault(_logger);

var _user = __webpack_require__(8);

var _user2 = _interopRequireDefault(_user);

var _codes = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var LOGGER = _logger2.default.get('auth');

/**
 * Strategy for user authentication
 * @param  { string } username - Username in the format of an email
 * @param  { string } password - Users password
 * @param  { Function } done - Callback
 * @return { Promise<*> } A promise that resolves by calling callback with
 * user data or rejects by calling util function with provided error
 */
var handler = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, password, done) {
    var user, validPassword;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user2.default.where({ username: username });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 7;
              break;
            }

            LOGGER.warn('User not found for username ' + username);
            throw new _exception2.default(_codes.USER_NOT_FOUND);

          case 7:
            _context.next = 9;
            return user.verifyPassword(password);

          case 9:
            validPassword = _context.sent;

            if (validPassword) {
              _context.next = 13;
              break;
            }

            LOGGER.info('Password validation failed for user ' + username);
            throw new _exception2.default(_codes.USER_NOT_FOUND);

          case 13:
            return _context.abrupt('return', done(null, user));

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', (0, _exception.handleAuthError)(_context.t0, done));

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 16]]);
  }));

  return function handler(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html>\n  <head></head>\n  <body id=\"app\">${app}</body>\n  <script src=\"/client.js\"></script>\n</html>\n";

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = {
	"openapi": "3.0.0",
	"info": {
		"title": "Harmonize API",
		"description": "Connect, do, and harominze your life",
		"version": "1.0.0"
	},
	"servers": [
		{
			"url": "http://localhost:3000/auth",
			"description": "Development server"
		}
	],
	"paths": {
		"/login": {
			"get": {
				"x-swagger-controller": "login",
				"summary": "Renders the login page",
				"operationId": "render",
				"responses": {
					"200": {
						"description": "The login HTML page",
						"content": {
							"text/html": {
								"schema": {
									"type": "string"
								}
							}
						}
					}
				}
			},
			"post": {
				"summary": "Validates the user's username and password",
				"operationId": "login",
				"requestBody": {
					"description": "The JSON object containing the username and password",
					"required": true,
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Login"
							}
						}
					}
				},
				"responses": {
					"302": {
						"description": "Redirects on a successful login",
						"headers": {
							"Location": {
								"schema": {
									"type": "string"
								}
							}
						}
					},
					"default": {
						"description": "An error response",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Error"
								}
							}
						}
					}
				}
			}
		},
		"/logout": {
			"post": {
				"summary": "Invalidates the user's session and redirects them to the login page",
				"operationId": "logout",
				"responses": {
					"302": {
						"description": "Redirects on a successful logout",
						"headers": {
							"Location": {
								"schema": {
									"type": "string"
								}
							}
						}
					},
					"default": {
						"description": "An error response",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Error"
								}
							}
						}
					}
				}
			}
		},
		"/facebook": {
			"get": {
				"summary": "Trigger the Facebook OAuth2 flow",
				"operationId": "auth",
				"responses": {
					"302": {
						"description": "Redirects to the Facebook Account selection screen",
						"headers": {
							"Location": {
								"schema": {
									"type": "string"
								}
							}
						}
					}
				}
			}
		},
		"/facebook/callback": {
			"get": {
				"summary": "Receive the result of the Facebook OAuth2 flow",
				"operationId": "callback",
				"responses": {
					"302": {
						"description": "Redirects to the success or failure urls",
						"headers": {
							"Location": {
								"schema": {
									"type": "string"
								}
							}
						}
					}
				}
			}
		},
		"/google": {
			"get": {
				"summary": "Trigger the Google OAuth2 flow",
				"operationId": "auth",
				"responses": {
					"302": {
						"description": "Redirects to the Google Account selection screen",
						"headers": {
							"Location": {
								"schema": {
									"type": "string"
								}
							}
						}
					}
				}
			}
		},
		"/google/callback": {
			"get": {
				"summary": "Receive the result of the Google OAuth2 flow",
				"operationId": "callback",
				"responses": {
					"302": {
						"description": "Redirects to the success or failure urls",
						"headers": {
							"Location": {
								"schema": {
									"type": "string"
								}
							}
						}
					}
				}
			}
		},
		"/instagram": {
			"get": {
				"summary": "Trigger the Instagram OAuth2 flow",
				"operationId": "auth",
				"responses": {
					"302": {
						"description": "Redirects to the Instagram Account selection screen",
						"headers": {
							"Location": {
								"schema": {
									"type": "string"
								}
							}
						}
					}
				}
			}
		},
		"/instagram/callback": {
			"get": {
				"summary": "Receive the result of the Instagram OAuth2 flow",
				"operationId": "callback",
				"responses": {
					"302": {
						"description": "Redirects to the success or failure urls",
						"headers": {
							"Location": {
								"schema": {
									"type": "string"
								}
							}
						}
					}
				}
			}
		},
		"/password/reset": {
			"get": {
				"summary": "Renders the Password Reset page",
				"operationId": "render",
				"responses": {
					"200": {
						"description": "The reset password page",
						"content": {
							"text/html": {
								"schema": {
									"type": "string"
								}
							}
						}
					},
					"default": {
						"description": "An error response",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Error"
								}
							}
						}
					}
				}
			},
			"put": {
				"summary": "Validates and commits the new password",
				"operationId": "resetPassword",
				"requestBody": {
					"description": "The JSON object containing the user's new password and a verification password",
					"required": true,
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/PasswordReset"
							}
						}
					}
				},
				"responses": {
					"302": {
						"description": "The password was updated",
						"headers": {
							"Location": {
								"schema": {
									"type": "string"
								}
							}
						}
					},
					"default": {
						"description": "An error response",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Error"
								}
							}
						}
					}
				}
			}
		},
		"/password/reset/request": {
			"get": {
				"summary": "Renders the Password Reset Request page",
				"operationId": "render",
				"responses": {
					"200": {
						"description": "The Password Reset Request HTML page",
						"content": {
							"text/html": {
								"schema": {
									"type": "string"
								}
							}
						}
					}
				}
			},
			"post": {
				"summary": "Triggers a new Password Reset email to the provided email address if and only if the email exists in the database\n",
				"operationId": "requestPasswordReset",
				"requestBody": {
					"description": "The JSON object containing the possibly valid user's email",
					"required": true,
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/PasswordResetRequest"
							}
						}
					}
				},
				"responses": {
					"200": {
						"description": "The request was created",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Message"
								}
							}
						}
					},
					"default": {
						"description": "An error response",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Error"
								}
							}
						}
					}
				}
			}
		},
		"/validate": {
			"get": {
				"operationId": "validate",
				"responses": {
					"204": {
						"description": "The session is valid"
					},
					"default": {
						"description": "An error response",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Error"
								}
							}
						}
					}
				}
			}
		},
		"/users/{username}": {
			"delete": {
				"summary": "Deletes the user specified by the provided username and returns a 200 if the operation was successful or 404 if no user was found by the provided username\n",
				"operationId": "deleteUser",
				"parameters": [
					{
						"name": "username",
						"in": "path",
						"required": true,
						"schema": {
							"type": "string"
						}
					}
				],
				"responses": {
					"200": {
						"description": "The user was deleted",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Message"
								}
							}
						}
					},
					"404": {
						"description": "Indicates that no user was found",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Message"
								}
							}
						}
					},
					"default": {
						"description": "An error response",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Error"
								}
							}
						}
					}
				}
			},
			"get": {
				"summary": "Returns the user specified by the username parameter, or 404 if no user could be found",
				"operationId": "getUser",
				"parameters": [
					{
						"name": "username",
						"in": "path",
						"required": true,
						"schema": {
							"type": "string"
						}
					}
				],
				"responses": {
					"200": {
						"description": "The resulting user",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/SafeUser"
								}
							}
						}
					},
					"404": {
						"description": "Indicates that no user was found",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Message"
								}
							}
						}
					},
					"default": {
						"description": "An error response",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Error"
								}
							}
						}
					}
				}
			},
			"post": {
				"summary": "Creates the user specified by the username parameter with the provided data",
				"operationId": "createUser",
				"parameters": [
					{
						"name": "username",
						"in": "path",
						"required": true,
						"schema": {
							"type": "string"
						}
					}
				],
				"requestBody": {
					"description": "The JSON object containing the new user data",
					"required": true,
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/User"
							}
						}
					}
				},
				"responses": {
					"201": {
						"description": "The user was created",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Message"
								}
							}
						}
					},
					"default": {
						"description": "An error response",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Error"
								}
							}
						}
					}
				}
			},
			"put": {
				"summary": "Updates the user specified by the username parameter with the provided data",
				"operationId": "updateUser",
				"parameters": [
					{
						"name": "username",
						"in": "path",
						"required": true,
						"schema": {
							"type": "string"
						}
					}
				],
				"requestBody": {
					"description": "The JSON object containing the new user data",
					"required": true,
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/User"
							}
						}
					}
				},
				"responses": {
					"200": {
						"description": "The user was updated",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Message"
								}
							}
						}
					},
					"default": {
						"description": "An error response",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Error"
								}
							}
						}
					}
				}
			}
		}
	},
	"components": {
		"schemas": {
			"Error": {
				"type": "object",
				"required": [
					"code",
					"message",
					"status"
				],
				"properties": {
					"code": {
						"type": "integer",
						"format": "int32"
					},
					"message": {
						"type": "string"
					},
					"status": {
						"type": "integer",
						"format": "int32"
					}
				}
			},
			"Login": {
				"type": "object",
				"required": [
					"password",
					"username"
				],
				"properties": {
					"password": {
						"type": "string"
					},
					"username": {
						"type": "string"
					}
				}
			},
			"Message": {
				"type": "object",
				"required": [
					"message"
				],
				"properties": {
					"message": {
						"type": "string"
					}
				}
			},
			"PasswordReset": {
				"type": "object",
				"required": [
					"password",
					"verifyPassword"
				],
				"properties": {
					"password": {
						"type": "string"
					},
					"verifyPassword": {
						"type": "string"
					}
				}
			},
			"PasswordResetRequest": {
				"type": "object",
				"required": [
					"email"
				],
				"properties": {
					"email": {
						"type": "string"
					}
				}
			},
			"User": {
				"type": "object",
				"required": [
					"email"
				],
				"properties": {
					"email": {
						"type": "string"
					},
					"password": {
						"type": "string"
					}
				}
			},
			"SafeUser": {
				"type": "object",
				"required": [
					"email",
					"username"
				],
				"properties": {
					"email": {
						"type": "string"
					},
					"username": {
						"type": "string"
					}
				}
			}
		}
	}
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("bunyan-cloudwatch");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("bunyan-newrelic-stream");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("connect-flash-plus");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("express-es6-template-engine");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("seraph");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("seraph-model");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(12);
module.exports = __webpack_require__(11);


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map
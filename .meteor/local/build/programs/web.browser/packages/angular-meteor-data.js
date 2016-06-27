//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Session = Package.session.Session;
var EJSON = Package.ejson.EJSON;
var check = Package.check.check;
var Match = Package.check.Match;
var DiffSequence = Package['diff-sequence'].DiffSequence;
var MongoID = Package['mongo-id'].MongoID;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var ObserveSequence = Package['observe-sequence'].ObserveSequence;
var ReactiveVar = Package['reactive-var'].ReactiveVar;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/angular-meteor-data/.npm/package/node_modules/angular-meteor/dist/angular-meteor.js                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*! angular-meteor v1.3.11 */                                                                                         // 1
(function webpackUniversalModuleDefinition(root, factory) {                                                           // 2
	if(typeof exports === 'object' && typeof module === 'object')                                                        // 3
		module.exports = factory(require("underscore"), require("jsondiffpatch"));                                          // 4
	else if(typeof define === 'function' && define.amd)                                                                  // 5
		define(["underscore", "jsondiffpatch"], factory);                                                                   // 6
	else if(typeof exports === 'object')                                                                                 // 7
		exports["angularMeteor"] = factory(require("underscore"), require("jsondiffpatch"));                                // 8
	else                                                                                                                 // 9
		root["angularMeteor"] = factory(root["_"], root["jsondiffpatch"]);                                                  // 10
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_22__) {                                    // 11
return /******/ (function(modules) { // webpackBootstrap                                                              // 12
/******/ 	// The module cache                                                                                         // 13
/******/ 	var installedModules = {};                                                                                  // 14
                                                                                                                      // 15
/******/ 	// The require function                                                                                     // 16
/******/ 	function __webpack_require__(moduleId) {                                                                    // 17
                                                                                                                      // 18
/******/ 		// Check if module is in cache                                                                             // 19
/******/ 		if(installedModules[moduleId])                                                                             // 20
/******/ 			return installedModules[moduleId].exports;                                                                // 21
                                                                                                                      // 22
/******/ 		// Create a new module (and put it into the cache)                                                         // 23
/******/ 		var module = installedModules[moduleId] = {                                                                // 24
/******/ 			exports: {},                                                                                              // 25
/******/ 			id: moduleId,                                                                                             // 26
/******/ 			loaded: false                                                                                             // 27
/******/ 		};                                                                                                         // 28
                                                                                                                      // 29
/******/ 		// Execute the module function                                                                             // 30
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);                       // 31
                                                                                                                      // 32
/******/ 		// Flag the module as loaded                                                                               // 33
/******/ 		module.loaded = true;                                                                                      // 34
                                                                                                                      // 35
/******/ 		// Return the exports of the module                                                                        // 36
/******/ 		return module.exports;                                                                                     // 37
/******/ 	}                                                                                                           // 38
                                                                                                                      // 39
                                                                                                                      // 40
/******/ 	// expose the modules object (__webpack_modules__)                                                          // 41
/******/ 	__webpack_require__.m = modules;                                                                            // 42
                                                                                                                      // 43
/******/ 	// expose the module cache                                                                                  // 44
/******/ 	__webpack_require__.c = installedModules;                                                                   // 45
                                                                                                                      // 46
/******/ 	// __webpack_public_path__                                                                                  // 47
/******/ 	__webpack_require__.p = "";                                                                                 // 48
                                                                                                                      // 49
/******/ 	// Load entry module and return exports                                                                     // 50
/******/ 	return __webpack_require__(0);                                                                              // 51
/******/ })                                                                                                           // 52
/************************************************************************/                                            // 53
/******/ ([                                                                                                           // 54
/* 0 */                                                                                                               // 55
/***/ function(module, exports, __webpack_require__) {                                                                // 56
                                                                                                                      // 57
	'use strict';                                                                                                        // 58
                                                                                                                      // 59
	Object.defineProperty(exports, "__esModule", {                                                                       // 60
	  value: true                                                                                                        // 61
	});                                                                                                                  // 62
                                                                                                                      // 63
	__webpack_require__(1);                                                                                              // 64
                                                                                                                      // 65
	__webpack_require__(4);                                                                                              // 66
                                                                                                                      // 67
	__webpack_require__(5);                                                                                              // 68
                                                                                                                      // 69
	__webpack_require__(6);                                                                                              // 70
                                                                                                                      // 71
	__webpack_require__(7);                                                                                              // 72
                                                                                                                      // 73
	__webpack_require__(8);                                                                                              // 74
                                                                                                                      // 75
	__webpack_require__(9);                                                                                              // 76
                                                                                                                      // 77
	__webpack_require__(10);                                                                                             // 78
                                                                                                                      // 79
	__webpack_require__(11);                                                                                             // 80
                                                                                                                      // 81
	__webpack_require__(12);                                                                                             // 82
                                                                                                                      // 83
	__webpack_require__(13);                                                                                             // 84
                                                                                                                      // 85
	__webpack_require__(14);                                                                                             // 86
                                                                                                                      // 87
	__webpack_require__(15);                                                                                             // 88
                                                                                                                      // 89
	var _utils = __webpack_require__(16);                                                                                // 90
                                                                                                                      // 91
	var _mixer = __webpack_require__(17);                                                                                // 92
                                                                                                                      // 93
	var _scope = __webpack_require__(18);                                                                                // 94
                                                                                                                      // 95
	var _core = __webpack_require__(19);                                                                                 // 96
                                                                                                                      // 97
	var _viewModel = __webpack_require__(20);                                                                            // 98
                                                                                                                      // 99
	var _reactive = __webpack_require__(21);                                                                             // 100
                                                                                                                      // 101
	var _templates = __webpack_require__(23);                                                                            // 102
                                                                                                                      // 103
	// legacy                                                                                                            // 104
	// lib                                                                                                               // 105
                                                                                                                      // 106
                                                                                                                      // 107
	var name = 'angular-meteor';                                                                                         // 108
                                                                                                                      // 109
	// new                                                                                                               // 110
                                                                                                                      // 111
	exports.default = name;                                                                                              // 112
                                                                                                                      // 113
                                                                                                                      // 114
	angular.module(name, [                                                                                               // 115
	// new                                                                                                               // 116
	_utils.name, _mixer.name, _scope.name, _core.name, _viewModel.name, _reactive.name, _templates.name,                 // 117
                                                                                                                      // 118
	// legacy                                                                                                            // 119
	'angular-meteor.ironrouter', 'angular-meteor.utils', 'angular-meteor.subscribe', 'angular-meteor.collection', 'angular-meteor.object', 'angular-meteor.user', 'angular-meteor.methods', 'angular-meteor.session', 'angular-meteor.camera']).run([_mixer.Mixer, _core.Core, _viewModel.ViewModel, _reactive.Reactive, function ($Mixer, $$Core, $$ViewModel, $$Reactive) {
	  // Load all mixins                                                                                                 // 121
	  $Mixer.mixin($$Core).mixin($$ViewModel).mixin($$Reactive);                                                         // 122
	}])                                                                                                                  // 123
                                                                                                                      // 124
	// legacy                                                                                                            // 125
	// Putting all services under $meteor service for syntactic sugar                                                    // 126
	.service('$meteor', ['$meteorCollection', '$meteorCollectionFS', '$meteorObject', '$meteorMethods', '$meteorSession', '$meteorSubscribe', '$meteorUtils', '$meteorCamera', '$meteorUser', function ($meteorCollection, $meteorCollectionFS, $meteorObject, $meteorMethods, $meteorSession, $meteorSubscribe, $meteorUtils, $meteorCamera, $meteorUser) {
	  var _this = this;                                                                                                  // 128
                                                                                                                      // 129
	  this.collection = $meteorCollection;                                                                               // 130
	  this.collectionFS = $meteorCollectionFS;                                                                           // 131
	  this.object = $meteorObject;                                                                                       // 132
	  this.subscribe = $meteorSubscribe.subscribe;                                                                       // 133
	  this.call = $meteorMethods.call;                                                                                   // 134
	  this.session = $meteorSession;                                                                                     // 135
	  this.autorun = $meteorUtils.autorun;                                                                               // 136
	  this.getCollectionByName = $meteorUtils.getCollectionByName;                                                       // 137
	  this.getPicture = $meteorCamera.getPicture;                                                                        // 138
                                                                                                                      // 139
	  // $meteorUser                                                                                                     // 140
	  ['loginWithPassword', 'requireUser', 'requireValidUser', 'waitForUser', 'createUser', 'changePassword', 'forgotPassword', 'resetPassword', 'verifyEmail', 'loginWithMeteorDeveloperAccount', 'loginWithFacebook', 'loginWithGithub', 'loginWithGoogle', 'loginWithMeetup', 'loginWithTwitter', 'loginWithWeibo', 'logout', 'logoutOtherClients'].forEach(function (method) {
	    _this[method] = $meteorUser[method];                                                                             // 142
	  });                                                                                                                // 143
	}]);                                                                                                                 // 144
	module.exports = exports['default'];                                                                                 // 145
                                                                                                                      // 146
/***/ },                                                                                                              // 147
/* 1 */                                                                                                               // 148
/***/ function(module, exports, __webpack_require__) {                                                                // 149
                                                                                                                      // 150
	'use strict';                                                                                                        // 151
                                                                                                                      // 152
	var _underscore = __webpack_require__(2);                                                                            // 153
                                                                                                                      // 154
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 155
                                                                                                                      // 156
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 157
                                                                                                                      // 158
	'use strict';                                                                                                        // 159
                                                                                                                      // 160
	// https://github.com/DAB0mB/get-updates                                                                             // 161
	/*global                                                                                                             // 162
	 angular, _                                                                                                          // 163
	 */                                                                                                                  // 164
                                                                                                                      // 165
	(function () {                                                                                                       // 166
	  var module = angular.module('getUpdates', []);                                                                     // 167
                                                                                                                      // 168
	  var utils = function () {                                                                                          // 169
	    var rip = function rip(obj, level) {                                                                             // 170
	      if (level < 1) return {};                                                                                      // 171
                                                                                                                      // 172
	      return _underscore2.default.reduce(obj, function (clone, v, k) {                                               // 173
	        v = _underscore2.default.isObject(v) ? rip(v, --level) : v;                                                  // 174
	        clone[k] = v;                                                                                                // 175
	        return clone;                                                                                                // 176
	      }, {});                                                                                                        // 177
	    };                                                                                                               // 178
                                                                                                                      // 179
	    var toPaths = function toPaths(obj) {                                                                            // 180
	      var keys = getKeyPaths(obj);                                                                                   // 181
	      var values = getDeepValues(obj);                                                                               // 182
	      return _underscore2.default.object(keys, values);                                                              // 183
	    };                                                                                                               // 184
                                                                                                                      // 185
	    var getKeyPaths = function getKeyPaths(obj) {                                                                    // 186
	      var keys = _underscore2.default.keys(obj).map(function (k) {                                                   // 187
	        var v = obj[k];                                                                                              // 188
	        if (!_underscore2.default.isObject(v) || _underscore2.default.isEmpty(v) || _underscore2.default.isArray(v)) return k;
                                                                                                                      // 190
	        return getKeyPaths(v).map(function (subKey) {                                                                // 191
	          return k + '.' + subKey;                                                                                   // 192
	        });                                                                                                          // 193
	      });                                                                                                            // 194
                                                                                                                      // 195
	      return _underscore2.default.flatten(keys);                                                                     // 196
	    };                                                                                                               // 197
                                                                                                                      // 198
	    var getDeepValues = function getDeepValues(obj, arr) {                                                           // 199
	      arr = arr || [];                                                                                               // 200
                                                                                                                      // 201
	      _underscore2.default.values(obj).forEach(function (v) {                                                        // 202
	        if (!_underscore2.default.isObject(v) || _underscore2.default.isEmpty(v) || _underscore2.default.isArray(v)) arr.push(v);else getDeepValues(v, arr);
	      });                                                                                                            // 204
                                                                                                                      // 205
	      return arr;                                                                                                    // 206
	    };                                                                                                               // 207
                                                                                                                      // 208
	    var flatten = function flatten(arr) {                                                                            // 209
	      return arr.reduce(function (flattened, v, i) {                                                                 // 210
	        if (_underscore2.default.isArray(v) && !_underscore2.default.isEmpty(v)) flattened.push.apply(flattened, flatten(v));else flattened.push(v);
                                                                                                                      // 212
	        return flattened;                                                                                            // 213
	      }, []);                                                                                                        // 214
	    };                                                                                                               // 215
                                                                                                                      // 216
	    var setFilled = function setFilled(obj, k, v) {                                                                  // 217
	      if (!_underscore2.default.isEmpty(v)) obj[k] = v;                                                              // 218
	    };                                                                                                               // 219
                                                                                                                      // 220
	    var assert = function assert(result, msg) {                                                                      // 221
	      if (!result) throwErr(msg);                                                                                    // 222
	    };                                                                                                               // 223
                                                                                                                      // 224
	    var throwErr = function throwErr(msg) {                                                                          // 225
	      throw Error('get-updates error - ' + msg);                                                                     // 226
	    };                                                                                                               // 227
                                                                                                                      // 228
	    return {                                                                                                         // 229
	      rip: rip,                                                                                                      // 230
	      toPaths: toPaths,                                                                                              // 231
	      getKeyPaths: getKeyPaths,                                                                                      // 232
	      getDeepValues: getDeepValues,                                                                                  // 233
	      setFilled: setFilled,                                                                                          // 234
	      assert: assert,                                                                                                // 235
	      throwErr: throwErr                                                                                             // 236
	    };                                                                                                               // 237
	  }();                                                                                                               // 238
                                                                                                                      // 239
	  var getDifference = function () {                                                                                  // 240
	    var getDifference = function getDifference(src, dst, isShallow) {                                                // 241
	      var level;                                                                                                     // 242
                                                                                                                      // 243
	      if (isShallow > 1) level = isShallow;else if (isShallow) level = 1;                                            // 244
                                                                                                                      // 245
	      if (level) {                                                                                                   // 246
	        src = utils.rip(src, level);                                                                                 // 247
	        dst = utils.rip(dst, level);                                                                                 // 248
	      }                                                                                                              // 249
                                                                                                                      // 250
	      return compare(src, dst);                                                                                      // 251
	    };                                                                                                               // 252
                                                                                                                      // 253
	    var compare = function compare(src, dst) {                                                                       // 254
	      var srcKeys = _underscore2.default.keys(src);                                                                  // 255
	      var dstKeys = _underscore2.default.keys(dst);                                                                  // 256
                                                                                                                      // 257
	      var keys = _underscore2.default.chain([]).concat(srcKeys).concat(dstKeys).uniq().without('$$hashKey').value();
                                                                                                                      // 259
	      return keys.reduce(function (diff, k) {                                                                        // 260
	        var srcValue = src[k];                                                                                       // 261
	        var dstValue = dst[k];                                                                                       // 262
                                                                                                                      // 263
	        if (_underscore2.default.isDate(srcValue) && _underscore2.default.isDate(dstValue)) {                        // 264
	          if (srcValue.getTime() != dstValue.getTime()) diff[k] = dstValue;                                          // 265
	        }                                                                                                            // 266
                                                                                                                      // 267
	        if (_underscore2.default.isObject(srcValue) && _underscore2.default.isObject(dstValue)) {                    // 268
	          var valueDiff = getDifference(srcValue, dstValue);                                                         // 269
	          utils.setFilled(diff, k, valueDiff);                                                                       // 270
	        } else if (srcValue !== dstValue) {                                                                          // 271
	          diff[k] = dstValue;                                                                                        // 272
	        }                                                                                                            // 273
                                                                                                                      // 274
	        return diff;                                                                                                 // 275
	      }, {});                                                                                                        // 276
	    };                                                                                                               // 277
                                                                                                                      // 278
	    return getDifference;                                                                                            // 279
	  }();                                                                                                               // 280
                                                                                                                      // 281
	  var getUpdates = function () {                                                                                     // 282
	    var getUpdates = function getUpdates(src, dst, isShallow) {                                                      // 283
	      utils.assert(_underscore2.default.isObject(src), 'first argument must be an object');                          // 284
	      utils.assert(_underscore2.default.isObject(dst), 'second argument must be an object');                         // 285
                                                                                                                      // 286
	      var diff = getDifference(src, dst, isShallow);                                                                 // 287
	      var paths = utils.toPaths(diff);                                                                               // 288
                                                                                                                      // 289
	      var set = createSet(paths);                                                                                    // 290
	      var unset = createUnset(paths);                                                                                // 291
	      var pull = createPull(unset);                                                                                  // 292
                                                                                                                      // 293
	      var updates = {};                                                                                              // 294
	      utils.setFilled(updates, '$set', set);                                                                         // 295
	      utils.setFilled(updates, '$unset', unset);                                                                     // 296
	      utils.setFilled(updates, '$pull', pull);                                                                       // 297
                                                                                                                      // 298
	      return updates;                                                                                                // 299
	    };                                                                                                               // 300
                                                                                                                      // 301
	    var createSet = function createSet(paths) {                                                                      // 302
	      var undefinedKeys = getUndefinedKeys(paths);                                                                   // 303
	      return _underscore2.default.omit(paths, undefinedKeys);                                                        // 304
	    };                                                                                                               // 305
                                                                                                                      // 306
	    var createUnset = function createUnset(paths) {                                                                  // 307
	      var undefinedKeys = getUndefinedKeys(paths);                                                                   // 308
	      var unset = _underscore2.default.pick(paths, undefinedKeys);                                                   // 309
                                                                                                                      // 310
	      return _underscore2.default.reduce(unset, function (result, v, k) {                                            // 311
	        result[k] = true;                                                                                            // 312
	        return result;                                                                                               // 313
	      }, {});                                                                                                        // 314
	    };                                                                                                               // 315
                                                                                                                      // 316
	    var createPull = function createPull(unset) {                                                                    // 317
	      var arrKeyPaths = _underscore2.default.keys(unset).map(function (k) {                                          // 318
	        var split = k.match(/(.*)\.\d+$/);                                                                           // 319
	        return split && split[1];                                                                                    // 320
	      });                                                                                                            // 321
                                                                                                                      // 322
	      return _underscore2.default.compact(arrKeyPaths).reduce(function (pull, k) {                                   // 323
	        pull[k] = null;                                                                                              // 324
	        return pull;                                                                                                 // 325
	      }, {});                                                                                                        // 326
	    };                                                                                                               // 327
                                                                                                                      // 328
	    var getUndefinedKeys = function getUndefinedKeys(obj) {                                                          // 329
	      return _underscore2.default.keys(obj).filter(function (k) {                                                    // 330
	        var v = obj[k];                                                                                              // 331
	        return _underscore2.default.isUndefined(v);                                                                  // 332
	      });                                                                                                            // 333
	    };                                                                                                               // 334
                                                                                                                      // 335
	    return getUpdates;                                                                                               // 336
	  }();                                                                                                               // 337
                                                                                                                      // 338
	  module.value('getUpdates', getUpdates);                                                                            // 339
	})();                                                                                                                // 340
                                                                                                                      // 341
/***/ },                                                                                                              // 342
/* 2 */                                                                                                               // 343
/***/ function(module, exports, __webpack_require__) {                                                                // 344
                                                                                                                      // 345
	'use strict';                                                                                                        // 346
                                                                                                                      // 347
	Object.defineProperty(exports, "__esModule", {                                                                       // 348
	  value: true                                                                                                        // 349
	});                                                                                                                  // 350
                                                                                                                      // 351
	var _underscore = __webpack_require__(3);                                                                            // 352
                                                                                                                      // 353
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 354
                                                                                                                      // 355
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 356
                                                                                                                      // 357
	if (typeof _underscore2.default === 'undefined') {                                                                   // 358
	  if (typeof Package.underscore === 'undefined') {                                                                   // 359
	    throw new Error('underscore is missing');                                                                        // 360
	  }                                                                                                                  // 361
	}                                                                                                                    // 362
                                                                                                                      // 363
	exports.default = _underscore2.default || Package.underscore._;                                                      // 364
	module.exports = exports['default'];                                                                                 // 365
                                                                                                                      // 366
/***/ },                                                                                                              // 367
/* 3 */                                                                                                               // 368
/***/ function(module, exports) {                                                                                     // 369
                                                                                                                      // 370
	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;                                                                      // 371
                                                                                                                      // 372
/***/ },                                                                                                              // 373
/* 4 */                                                                                                               // 374
/***/ function(module, exports, __webpack_require__) {                                                                // 375
                                                                                                                      // 376
	'use strict';                                                                                                        // 377
                                                                                                                      // 378
	var _underscore = __webpack_require__(2);                                                                            // 379
                                                                                                                      // 380
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 381
                                                                                                                      // 382
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 383
                                                                                                                      // 384
	'use strict'; /*global                                                                                               // 385
	               angular, _, Package                                                                                   // 386
	               */                                                                                                    // 387
                                                                                                                      // 388
	var _module = angular.module('diffArray', ['getUpdates']);                                                           // 389
                                                                                                                      // 390
	_module.factory('diffArray', ['getUpdates', function (getUpdates) {                                                  // 391
	  var LocalCollection = Package.minimongo.LocalCollection;                                                           // 392
	  var idStringify = LocalCollection._idStringify || Package['mongo-id'].MongoID.idStringify;                         // 393
	  var idParse = LocalCollection._idParse || Package['mongo-id'].MongoID.idParse;                                     // 394
                                                                                                                      // 395
	  // Calculates the differences between `lastSeqArray` and                                                           // 396
	  // `seqArray` and calls appropriate functions from `callbacks`.                                                    // 397
	  // Reuses Minimongo's diff algorithm implementation.                                                               // 398
	  // XXX Should be replaced with the original diffArray function here:                                               // 399
	  // https://github.com/meteor/meteor/blob/devel/packages/observe-sequence/observe_sequence.js#L152                  // 400
	  // When it will become nested as well, tracking here: https://github.com/meteor/meteor/issues/3764                 // 401
	  function diffArray(lastSeqArray, seqArray, callbacks, preventNestedDiff) {                                         // 402
	    preventNestedDiff = !!preventNestedDiff;                                                                         // 403
                                                                                                                      // 404
	    var diffFn = Package.minimongo.LocalCollection._diffQueryOrderedChanges || Package['diff-sequence'].DiffSequence.diffQueryOrderedChanges;
                                                                                                                      // 406
	    var oldObjIds = [];                                                                                              // 407
	    var newObjIds = [];                                                                                              // 408
	    var posOld = {}; // maps from idStringify'd ids                                                                  // 409
	    var posNew = {}; // ditto                                                                                        // 410
	    var posCur = {};                                                                                                 // 411
	    var lengthCur = lastSeqArray.length;                                                                             // 412
                                                                                                                      // 413
	    _underscore2.default.each(seqArray, function (doc, i) {                                                          // 414
	      newObjIds.push({ _id: doc._id });                                                                              // 415
	      posNew[idStringify(doc._id)] = i;                                                                              // 416
	    });                                                                                                              // 417
                                                                                                                      // 418
	    _underscore2.default.each(lastSeqArray, function (doc, i) {                                                      // 419
	      oldObjIds.push({ _id: doc._id });                                                                              // 420
	      posOld[idStringify(doc._id)] = i;                                                                              // 421
	      posCur[idStringify(doc._id)] = i;                                                                              // 422
	    });                                                                                                              // 423
                                                                                                                      // 424
	    // Arrays can contain arbitrary objects. We don't diff the                                                       // 425
	    // objects. Instead we always fire 'changedAt' callback on every                                                 // 426
	    // object. The consumer of `observe-sequence` should deal with                                                   // 427
	    // it appropriately.                                                                                             // 428
	    diffFn(oldObjIds, newObjIds, {                                                                                   // 429
	      addedBefore: function addedBefore(id, doc, before) {                                                           // 430
	        var position = before ? posCur[idStringify(before)] : lengthCur;                                             // 431
                                                                                                                      // 432
	        _underscore2.default.each(posCur, function (pos, id) {                                                       // 433
	          if (pos >= position) posCur[id]++;                                                                         // 434
	        });                                                                                                          // 435
                                                                                                                      // 436
	        lengthCur++;                                                                                                 // 437
	        posCur[idStringify(id)] = position;                                                                          // 438
                                                                                                                      // 439
	        callbacks.addedAt(id, seqArray[posNew[idStringify(id)]], position, before);                                  // 440
	      },                                                                                                             // 441
                                                                                                                      // 442
	      movedBefore: function movedBefore(id, before) {                                                                // 443
	        var prevPosition = posCur[idStringify(id)];                                                                  // 444
	        var position = before ? posCur[idStringify(before)] : lengthCur - 1;                                         // 445
                                                                                                                      // 446
	        _underscore2.default.each(posCur, function (pos, id) {                                                       // 447
	          if (pos >= prevPosition && pos <= position) posCur[id]--;else if (pos <= prevPosition && pos >= position) posCur[id]++;
	        });                                                                                                          // 449
                                                                                                                      // 450
	        posCur[idStringify(id)] = position;                                                                          // 451
                                                                                                                      // 452
	        callbacks.movedTo(id, seqArray[posNew[idStringify(id)]], prevPosition, position, before);                    // 453
	      },                                                                                                             // 454
	      removed: function removed(id) {                                                                                // 455
	        var prevPosition = posCur[idStringify(id)];                                                                  // 456
                                                                                                                      // 457
	        _underscore2.default.each(posCur, function (pos, id) {                                                       // 458
	          if (pos >= prevPosition) posCur[id]--;                                                                     // 459
	        });                                                                                                          // 460
                                                                                                                      // 461
	        delete posCur[idStringify(id)];                                                                              // 462
	        lengthCur--;                                                                                                 // 463
                                                                                                                      // 464
	        callbacks.removedAt(id, lastSeqArray[posOld[idStringify(id)]], prevPosition);                                // 465
	      }                                                                                                              // 466
	    });                                                                                                              // 467
                                                                                                                      // 468
	    _underscore2.default.each(posNew, function (pos, idString) {                                                     // 469
	      if (!_underscore2.default.has(posOld, idString)) return;                                                       // 470
                                                                                                                      // 471
	      var id = idParse(idString);                                                                                    // 472
	      var newItem = seqArray[pos] || {};                                                                             // 473
	      var oldItem = lastSeqArray[posOld[idString]];                                                                  // 474
	      var updates = getUpdates(oldItem, newItem, preventNestedDiff);                                                 // 475
                                                                                                                      // 476
	      if (!_underscore2.default.isEmpty(updates)) callbacks.changedAt(id, updates, pos, oldItem);                    // 477
	    });                                                                                                              // 478
	  }                                                                                                                  // 479
                                                                                                                      // 480
	  diffArray.shallow = function (lastSeqArray, seqArray, callbacks) {                                                 // 481
	    return diffArray(lastSeqArray, seqArray, callbacks, true);                                                       // 482
	  };                                                                                                                 // 483
                                                                                                                      // 484
	  diffArray.deepCopyChanges = function (oldItem, newItem) {                                                          // 485
	    var setDiff = getUpdates(oldItem, newItem).$set;                                                                 // 486
                                                                                                                      // 487
	    _underscore2.default.each(setDiff, function (v, deepKey) {                                                       // 488
	      setDeep(oldItem, deepKey, v);                                                                                  // 489
	    });                                                                                                              // 490
	  };                                                                                                                 // 491
                                                                                                                      // 492
	  diffArray.deepCopyRemovals = function (oldItem, newItem) {                                                         // 493
	    var unsetDiff = getUpdates(oldItem, newItem).$unset;                                                             // 494
                                                                                                                      // 495
	    _underscore2.default.each(unsetDiff, function (v, deepKey) {                                                     // 496
	      unsetDeep(oldItem, deepKey);                                                                                   // 497
	    });                                                                                                              // 498
	  };                                                                                                                 // 499
                                                                                                                      // 500
	  // Finds changes between two collections                                                                           // 501
	  diffArray.getChanges = function (newCollection, oldCollection, diffMethod) {                                       // 502
	    var changes = { added: [], removed: [], changed: [] };                                                           // 503
                                                                                                                      // 504
	    diffMethod(oldCollection, newCollection, {                                                                       // 505
	      addedAt: function addedAt(id, item, index) {                                                                   // 506
	        changes.added.push({ item: item, index: index });                                                            // 507
	      },                                                                                                             // 508
                                                                                                                      // 509
	      removedAt: function removedAt(id, item, index) {                                                               // 510
	        changes.removed.push({ item: item, index: index });                                                          // 511
	      },                                                                                                             // 512
                                                                                                                      // 513
	      changedAt: function changedAt(id, updates, index, oldItem) {                                                   // 514
	        changes.changed.push({ selector: id, modifier: updates });                                                   // 515
	      },                                                                                                             // 516
                                                                                                                      // 517
	      movedTo: function movedTo(id, item, fromIndex, toIndex) {                                                      // 518
	        // XXX do we need this?                                                                                      // 519
	      }                                                                                                              // 520
	    });                                                                                                              // 521
                                                                                                                      // 522
	    return changes;                                                                                                  // 523
	  };                                                                                                                 // 524
                                                                                                                      // 525
	  var setDeep = function setDeep(obj, deepKey, v) {                                                                  // 526
	    var split = deepKey.split('.');                                                                                  // 527
	    var initialKeys = _underscore2.default.initial(split);                                                           // 528
	    var lastKey = _underscore2.default.last(split);                                                                  // 529
                                                                                                                      // 530
	    initialKeys.reduce(function (subObj, k, i) {                                                                     // 531
	      var nextKey = split[i + 1];                                                                                    // 532
                                                                                                                      // 533
	      if (isNumStr(nextKey)) {                                                                                       // 534
	        if (subObj[k] === null) subObj[k] = [];                                                                      // 535
	        if (subObj[k].length == parseInt(nextKey)) subObj[k].push(null);                                             // 536
	      } else if (subObj[k] === null || !isHash(subObj[k])) {                                                         // 537
	        subObj[k] = {};                                                                                              // 538
	      }                                                                                                              // 539
                                                                                                                      // 540
	      return subObj[k];                                                                                              // 541
	    }, obj);                                                                                                         // 542
                                                                                                                      // 543
	    var deepObj = getDeep(obj, initialKeys);                                                                         // 544
	    deepObj[lastKey] = v;                                                                                            // 545
	    return v;                                                                                                        // 546
	  };                                                                                                                 // 547
                                                                                                                      // 548
	  var unsetDeep = function unsetDeep(obj, deepKey) {                                                                 // 549
	    var split = deepKey.split('.');                                                                                  // 550
	    var initialKeys = _underscore2.default.initial(split);                                                           // 551
	    var lastKey = _underscore2.default.last(split);                                                                  // 552
	    var deepObj = getDeep(obj, initialKeys);                                                                         // 553
                                                                                                                      // 554
	    if (_underscore2.default.isArray(deepObj) && isNumStr(lastKey)) return !!deepObj.splice(lastKey, 1);else return delete deepObj[lastKey];
	  };                                                                                                                 // 556
                                                                                                                      // 557
	  var getDeep = function getDeep(obj, keys) {                                                                        // 558
	    return keys.reduce(function (subObj, k) {                                                                        // 559
	      return subObj[k];                                                                                              // 560
	    }, obj);                                                                                                         // 561
	  };                                                                                                                 // 562
                                                                                                                      // 563
	  var isHash = function isHash(obj) {                                                                                // 564
	    return _underscore2.default.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;                    // 565
	  };                                                                                                                 // 566
                                                                                                                      // 567
	  var isNumStr = function isNumStr(str) {                                                                            // 568
	    return str.match(/^\d+$/);                                                                                       // 569
	  };                                                                                                                 // 570
                                                                                                                      // 571
	  return diffArray;                                                                                                  // 572
	}]);                                                                                                                 // 573
                                                                                                                      // 574
/***/ },                                                                                                              // 575
/* 5 */                                                                                                               // 576
/***/ function(module, exports) {                                                                                     // 577
                                                                                                                      // 578
	'use strict';                                                                                                        // 579
                                                                                                                      // 580
	angular.module('angular-meteor.settings', []).constant('$angularMeteorSettings', {                                   // 581
	  suppressWarnings: true                                                                                             // 582
	});                                                                                                                  // 583
                                                                                                                      // 584
/***/ },                                                                                                              // 585
/* 6 */                                                                                                               // 586
/***/ function(module, exports) {                                                                                     // 587
                                                                                                                      // 588
	'use strict';                                                                                                        // 589
                                                                                                                      // 590
	angular.module('angular-meteor.ironrouter', []).run(['$compile', '$document', '$rootScope', function ($compile, $document, $rootScope) {
	  var Router = (Package['iron:router'] || {}).Router;                                                                // 592
	  if (!Router) return;                                                                                               // 593
                                                                                                                      // 594
	  var isLoaded = false;                                                                                              // 595
                                                                                                                      // 596
	  // Recompile after iron:router builds page                                                                         // 597
	  Router.onAfterAction(function (req, res, next) {                                                                   // 598
	    Tracker.afterFlush(function () {                                                                                 // 599
	      if (isLoaded) return;                                                                                          // 600
	      $compile($document)($rootScope);                                                                               // 601
	      if (!$rootScope.$$phase) $rootScope.$apply();                                                                  // 602
	      isLoaded = true;                                                                                               // 603
	    });                                                                                                              // 604
	  });                                                                                                                // 605
	}]);                                                                                                                 // 606
                                                                                                                      // 607
/***/ },                                                                                                              // 608
/* 7 */                                                                                                               // 609
/***/ function(module, exports, __webpack_require__) {                                                                // 610
                                                                                                                      // 611
	'use strict';                                                                                                        // 612
                                                                                                                      // 613
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /*global
	                                                                                                                                                                                                                                                   angular, _, Tracker, EJSON, FS, Mongo
	                                                                                                                                                                                                                                                   */
                                                                                                                      // 617
	var _underscore = __webpack_require__(2);                                                                            // 618
                                                                                                                      // 619
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 620
                                                                                                                      // 621
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 622
                                                                                                                      // 623
	'use strict';                                                                                                        // 624
                                                                                                                      // 625
	var angularMeteorUtils = angular.module('angular-meteor.utils', ['angular-meteor.settings']);                        // 626
                                                                                                                      // 627
	angularMeteorUtils.service('$meteorUtils', ['$q', '$timeout', '$angularMeteorSettings', function ($q, $timeout, $angularMeteorSettings) {
                                                                                                                      // 629
	  var self = this;                                                                                                   // 630
                                                                                                                      // 631
	  this.autorun = function (scope, fn) {                                                                              // 632
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.utils.autorun] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.6/autorun. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 634
	    // wrapping around Deps.autorun                                                                                  // 635
	    var comp = Tracker.autorun(function (c) {                                                                        // 636
	      fn(c);                                                                                                         // 637
	      // this is run immediately for the first call                                                                  // 638
	      // but after that, we need to $apply to start Angular digest                                                   // 639
	      if (!c.firstRun) $timeout(angular.noop, 0);                                                                    // 640
	    });                                                                                                              // 641
                                                                                                                      // 642
	    // stop autorun when scope is destroyed                                                                          // 643
	    scope.$on('$destroy', function () {                                                                              // 644
	      comp.stop();                                                                                                   // 645
	    });                                                                                                              // 646
                                                                                                                      // 647
	    // return autorun object so that it can be stopped manually                                                      // 648
	    return comp;                                                                                                     // 649
	  };                                                                                                                 // 650
                                                                                                                      // 651
	  // Borrowed from angularFire                                                                                       // 652
	  // https://github.com/firebase/angularfire/blob/master/src/utils.js#L445-L454                                      // 653
	  this.stripDollarPrefixedKeys = function (data) {                                                                   // 654
	    if (!_underscore2.default.isObject(data) || data instanceof Date || data instanceof File || EJSON.toJSONValue(data).$type === 'oid' || (typeof FS === 'undefined' ? 'undefined' : _typeof(FS)) === 'object' && data instanceof FS.File) return data;
                                                                                                                      // 656
	    var out = _underscore2.default.isArray(data) ? [] : {};                                                          // 657
                                                                                                                      // 658
	    _underscore2.default.each(data, function (v, k) {                                                                // 659
	      if (typeof k !== 'string' || k.charAt(0) !== '$') out[k] = self.stripDollarPrefixedKeys(v);                    // 660
	    });                                                                                                              // 661
                                                                                                                      // 662
	    return out;                                                                                                      // 663
	  };                                                                                                                 // 664
                                                                                                                      // 665
	  // Returns a callback which fulfills promise                                                                       // 666
	  this.fulfill = function (deferred, boundError, boundResult) {                                                      // 667
	    return function (err, result) {                                                                                  // 668
	      if (err) deferred.reject(boundError == null ? err : boundError);else if (typeof boundResult == "function") deferred.resolve(boundResult == null ? result : boundResult(result));else deferred.resolve(boundResult == null ? result : boundResult);
	    };                                                                                                               // 670
	  };                                                                                                                 // 671
                                                                                                                      // 672
	  // creates a function which invokes method with the given arguments and returns a promise                          // 673
	  this.promissor = function (obj, method) {                                                                          // 674
	    return function () {                                                                                             // 675
	      var deferred = $q.defer();                                                                                     // 676
	      var fulfill = self.fulfill(deferred);                                                                          // 677
	      var args = _underscore2.default.toArray(arguments).concat(fulfill);                                            // 678
	      obj[method].apply(obj, args);                                                                                  // 679
	      return deferred.promise;                                                                                       // 680
	    };                                                                                                               // 681
	  };                                                                                                                 // 682
                                                                                                                      // 683
	  // creates a $q.all() promise and call digestion loop on fulfillment                                               // 684
	  this.promiseAll = function (promises) {                                                                            // 685
	    var allPromise = $q.all(promises);                                                                               // 686
                                                                                                                      // 687
	    allPromise.finally(function () {                                                                                 // 688
	      // calls digestion loop with no conflicts                                                                      // 689
	      $timeout(angular.noop);                                                                                        // 690
	    });                                                                                                              // 691
                                                                                                                      // 692
	    return allPromise;                                                                                               // 693
	  };                                                                                                                 // 694
                                                                                                                      // 695
	  this.getCollectionByName = function (string) {                                                                     // 696
	    return Mongo.Collection.get(string);                                                                             // 697
	  };                                                                                                                 // 698
                                                                                                                      // 699
	  this.findIndexById = function (collection, doc) {                                                                  // 700
	    var foundDoc = _underscore2.default.find(collection, function (colDoc) {                                         // 701
	      // EJSON.equals used to compare Mongo.ObjectIDs and Strings.                                                   // 702
	      return EJSON.equals(colDoc._id, doc._id);                                                                      // 703
	    });                                                                                                              // 704
                                                                                                                      // 705
	    return _underscore2.default.indexOf(collection, foundDoc);                                                       // 706
	  };                                                                                                                 // 707
	}]);                                                                                                                 // 708
                                                                                                                      // 709
	angularMeteorUtils.run(['$rootScope', '$meteorUtils', function ($rootScope, $meteorUtils) {                          // 710
	  Object.getPrototypeOf($rootScope).$meteorAutorun = function (fn) {                                                 // 711
	    return $meteorUtils.autorun(this, fn);                                                                           // 712
	  };                                                                                                                 // 713
	}]);                                                                                                                 // 714
                                                                                                                      // 715
/***/ },                                                                                                              // 716
/* 8 */                                                                                                               // 717
/***/ function(module, exports) {                                                                                     // 718
                                                                                                                      // 719
	/*global                                                                                                             // 720
	 angular, Meteor                                                                                                     // 721
	 */                                                                                                                  // 722
                                                                                                                      // 723
	'use strict';                                                                                                        // 724
                                                                                                                      // 725
	var angularMeteorSubscribe = angular.module('angular-meteor.subscribe', ['angular-meteor.settings']);                // 726
                                                                                                                      // 727
	angularMeteorSubscribe.service('$meteorSubscribe', ['$q', '$angularMeteorSettings', function ($q, $angularMeteorSettings) {
                                                                                                                      // 729
	  var self = this;                                                                                                   // 730
                                                                                                                      // 731
	  this._subscribe = function (scope, deferred, args) {                                                               // 732
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.subscribe] Please note that this module is deprecated since 1.3.0 and will be removed in 1.4.0! Replace it with the new syntax described here: http://www.angular-meteor.com/api/1.3.6/subscribe. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 734
	    var subscription = null;                                                                                         // 735
	    var lastArg = args[args.length - 1];                                                                             // 736
                                                                                                                      // 737
	    // User supplied onStop callback                                                                                 // 738
	    // save it for later use and remove                                                                              // 739
	    // from subscription arguments                                                                                   // 740
	    if (angular.isObject(lastArg) && angular.isFunction(lastArg.onStop)) {                                           // 741
	      var _onStop = lastArg.onStop;                                                                                  // 742
                                                                                                                      // 743
	      args.pop();                                                                                                    // 744
	    }                                                                                                                // 745
                                                                                                                      // 746
	    args.push({                                                                                                      // 747
	      onReady: function onReady() {                                                                                  // 748
	        deferred.resolve(subscription);                                                                              // 749
	      },                                                                                                             // 750
	      onStop: function onStop(err) {                                                                                 // 751
	        if (!deferred.promise.$$state.status) {                                                                      // 752
	          if (err) deferred.reject(err);else deferred.reject(new Meteor.Error("Subscription Stopped", "Subscription stopped by a call to stop method. Either by the client or by the server."));
	        } else if (_onStop)                                                                                          // 754
	          // After promise was resolved or rejected                                                                  // 755
	          // call user supplied onStop callback.                                                                     // 756
	          _onStop.apply(this, Array.prototype.slice.call(arguments));                                                // 757
	      }                                                                                                              // 758
	    });                                                                                                              // 759
                                                                                                                      // 760
	    subscription = Meteor.subscribe.apply(scope, args);                                                              // 761
                                                                                                                      // 762
	    return subscription;                                                                                             // 763
	  };                                                                                                                 // 764
                                                                                                                      // 765
	  this.subscribe = function () {                                                                                     // 766
	    var deferred = $q.defer();                                                                                       // 767
	    var args = Array.prototype.slice.call(arguments);                                                                // 768
	    var subscription = null;                                                                                         // 769
                                                                                                                      // 770
	    self._subscribe(this, deferred, args);                                                                           // 771
                                                                                                                      // 772
	    return deferred.promise;                                                                                         // 773
	  };                                                                                                                 // 774
	}]);                                                                                                                 // 775
                                                                                                                      // 776
	angularMeteorSubscribe.run(['$rootScope', '$q', '$meteorSubscribe', function ($rootScope, $q, $meteorSubscribe) {    // 777
	  Object.getPrototypeOf($rootScope).$meteorSubscribe = function () {                                                 // 778
	    var deferred = $q.defer();                                                                                       // 779
	    var args = Array.prototype.slice.call(arguments);                                                                // 780
                                                                                                                      // 781
	    var subscription = $meteorSubscribe._subscribe(this, deferred, args);                                            // 782
                                                                                                                      // 783
	    this.$on('$destroy', function () {                                                                               // 784
	      subscription.stop();                                                                                           // 785
	    });                                                                                                              // 786
                                                                                                                      // 787
	    return deferred.promise;                                                                                         // 788
	  };                                                                                                                 // 789
	}]);                                                                                                                 // 790
                                                                                                                      // 791
/***/ },                                                                                                              // 792
/* 9 */                                                                                                               // 793
/***/ function(module, exports, __webpack_require__) {                                                                // 794
                                                                                                                      // 795
	'use strict';                                                                                                        // 796
                                                                                                                      // 797
	var _underscore = __webpack_require__(2);                                                                            // 798
                                                                                                                      // 799
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 800
                                                                                                                      // 801
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 802
                                                                                                                      // 803
	'use strict'; /*global                                                                                               // 804
	               angular, _, Tracker, check, Match, Mongo                                                              // 805
	               */                                                                                                    // 806
                                                                                                                      // 807
	var angularMeteorCollection = angular.module('angular-meteor.collection', ['angular-meteor.stopper', 'angular-meteor.subscribe', 'angular-meteor.utils', 'diffArray', 'angular-meteor.settings']);
                                                                                                                      // 809
	// The reason angular meteor collection is a factory function and not something                                      // 810
	// that inherit from array comes from here:                                                                          // 811
	// http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/                            // 812
	// We went with the direct extensions approach.                                                                      // 813
	angularMeteorCollection.factory('AngularMeteorCollection', ['$q', '$meteorSubscribe', '$meteorUtils', '$rootScope', '$timeout', 'diffArray', '$angularMeteorSettings', function ($q, $meteorSubscribe, $meteorUtils, $rootScope, $timeout, diffArray, $angularMeteorSettings) {
                                                                                                                      // 815
	  function AngularMeteorCollection(curDefFunc, collection, diffArrayFunc, autoClientSave) {                          // 816
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.$meteorCollection] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/meteorCollection. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 818
	    var data = [];                                                                                                   // 819
	    // Server backup data to evaluate what changes come from client                                                  // 820
	    // after each server update.                                                                                     // 821
	    data._serverBackup = [];                                                                                         // 822
	    // Array differ function.                                                                                        // 823
	    data._diffArrayFunc = diffArrayFunc;                                                                             // 824
	    // Handler of the cursor observer.                                                                               // 825
	    data._hObserve = null;                                                                                           // 826
	    // On new cursor autorun handler                                                                                 // 827
	    // (autorun for reactive variables).                                                                             // 828
	    data._hNewCurAutorun = null;                                                                                     // 829
	    // On new data autorun handler                                                                                   // 830
	    // (autorun for cursor.fetch).                                                                                   // 831
	    data._hDataAutorun = null;                                                                                       // 832
                                                                                                                      // 833
	    if (angular.isDefined(collection)) {                                                                             // 834
	      data.$$collection = collection;                                                                                // 835
	    } else {                                                                                                         // 836
	      var cursor = curDefFunc();                                                                                     // 837
	      data.$$collection = $meteorUtils.getCollectionByName(cursor.collection.name);                                  // 838
	    }                                                                                                                // 839
                                                                                                                      // 840
	    _underscore2.default.extend(data, AngularMeteorCollection);                                                      // 841
	    data._startCurAutorun(curDefFunc, autoClientSave);                                                               // 842
                                                                                                                      // 843
	    return data;                                                                                                     // 844
	  }                                                                                                                  // 845
                                                                                                                      // 846
	  AngularMeteorCollection._startCurAutorun = function (curDefFunc, autoClientSave) {                                 // 847
	    var self = this;                                                                                                 // 848
                                                                                                                      // 849
	    self._hNewCurAutorun = Tracker.autorun(function () {                                                             // 850
	      // When the reactive func gets recomputated we need to stop any previous                                       // 851
	      // observeChanges.                                                                                             // 852
	      Tracker.onInvalidate(function () {                                                                             // 853
	        self._stopCursor();                                                                                          // 854
	      });                                                                                                            // 855
                                                                                                                      // 856
	      if (autoClientSave) self._setAutoClientSave();                                                                 // 857
	      self._updateCursor(curDefFunc(), autoClientSave);                                                              // 858
	    });                                                                                                              // 859
	  };                                                                                                                 // 860
                                                                                                                      // 861
	  AngularMeteorCollection.subscribe = function () {                                                                  // 862
	    $meteorSubscribe.subscribe.apply(this, arguments);                                                               // 863
	    return this;                                                                                                     // 864
	  };                                                                                                                 // 865
                                                                                                                      // 866
	  AngularMeteorCollection.save = function (docs, useUnsetModifier) {                                                 // 867
	    // save whole collection                                                                                         // 868
	    if (!docs) docs = this;                                                                                          // 869
	    // save single doc                                                                                               // 870
	    docs = [].concat(docs);                                                                                          // 871
                                                                                                                      // 872
	    var promises = docs.map(function (doc) {                                                                         // 873
	      return this._upsertDoc(doc, useUnsetModifier);                                                                 // 874
	    }, this);                                                                                                        // 875
                                                                                                                      // 876
	    return $meteorUtils.promiseAll(promises);                                                                        // 877
	  };                                                                                                                 // 878
                                                                                                                      // 879
	  AngularMeteorCollection._upsertDoc = function (doc, useUnsetModifier) {                                            // 880
	    var deferred = $q.defer();                                                                                       // 881
	    var collection = this.$$collection;                                                                              // 882
	    var createFulfill = _underscore2.default.partial($meteorUtils.fulfill, deferred, null);                          // 883
                                                                                                                      // 884
	    // delete $$hashkey                                                                                              // 885
	    doc = $meteorUtils.stripDollarPrefixedKeys(doc);                                                                 // 886
	    var docId = doc._id;                                                                                             // 887
	    var isExist = collection.findOne(docId);                                                                         // 888
                                                                                                                      // 889
	    // update                                                                                                        // 890
	    if (isExist) {                                                                                                   // 891
	      // Deletes _id property (from the copy) so that                                                                // 892
	      // it can be $set using update.                                                                                // 893
	      delete doc._id;                                                                                                // 894
	      var modifier = useUnsetModifier ? { $unset: doc } : { $set: doc };                                             // 895
	      // NOTE: do not use #upsert() method, since it does not exist in some collections                              // 896
	      collection.update(docId, modifier, createFulfill(function () {                                                 // 897
	        return { _id: docId, action: 'updated' };                                                                    // 898
	      }));                                                                                                           // 899
	    }                                                                                                                // 900
	    // insert                                                                                                        // 901
	    else {                                                                                                           // 902
	        collection.insert(doc, createFulfill(function (id) {                                                         // 903
	          return { _id: id, action: 'inserted' };                                                                    // 904
	        }));                                                                                                         // 905
	      }                                                                                                              // 906
                                                                                                                      // 907
	    return deferred.promise;                                                                                         // 908
	  };                                                                                                                 // 909
                                                                                                                      // 910
	  // performs $pull operations parallely.                                                                            // 911
	  // used for handling splice operations returned from getUpdates() to prevent conflicts.                            // 912
	  // see issue: https://github.com/Urigo/angular-meteor/issues/793                                                   // 913
	  AngularMeteorCollection._updateDiff = function (selector, update, callback) {                                      // 914
	    callback = callback || angular.noop;                                                                             // 915
	    var setters = _underscore2.default.omit(update, '$pull');                                                        // 916
	    var updates = [setters];                                                                                         // 917
                                                                                                                      // 918
	    _underscore2.default.each(update.$pull, function (pull, prop) {                                                  // 919
	      var puller = {};                                                                                               // 920
	      puller[prop] = pull;                                                                                           // 921
	      updates.push({ $pull: puller });                                                                               // 922
	    });                                                                                                              // 923
                                                                                                                      // 924
	    this._updateParallel(selector, updates, callback);                                                               // 925
	  };                                                                                                                 // 926
                                                                                                                      // 927
	  // performs each update operation parallely                                                                        // 928
	  AngularMeteorCollection._updateParallel = function (selector, updates, callback) {                                 // 929
	    var self = this;                                                                                                 // 930
	    var done = _underscore2.default.after(updates.length, callback);                                                 // 931
                                                                                                                      // 932
	    var next = function next(err, affectedDocsNum) {                                                                 // 933
	      if (err) return callback(err);                                                                                 // 934
	      done(null, affectedDocsNum);                                                                                   // 935
	    };                                                                                                               // 936
                                                                                                                      // 937
	    _underscore2.default.each(updates, function (update) {                                                           // 938
	      self.$$collection.update(selector, update, next);                                                              // 939
	    });                                                                                                              // 940
	  };                                                                                                                 // 941
                                                                                                                      // 942
	  AngularMeteorCollection.remove = function (keyOrDocs) {                                                            // 943
	    var keys;                                                                                                        // 944
                                                                                                                      // 945
	    // remove whole collection                                                                                       // 946
	    if (!keyOrDocs) {                                                                                                // 947
	      keys = _underscore2.default.pluck(this, '_id');                                                                // 948
	    }                                                                                                                // 949
	    // remove docs                                                                                                   // 950
	    else {                                                                                                           // 951
	        keyOrDocs = [].concat(keyOrDocs);                                                                            // 952
                                                                                                                      // 953
	        keys = _underscore2.default.map(keyOrDocs, function (keyOrDoc) {                                             // 954
	          return keyOrDoc._id || keyOrDoc;                                                                           // 955
	        });                                                                                                          // 956
	      }                                                                                                              // 957
                                                                                                                      // 958
	    // Checks if all keys are correct.                                                                               // 959
	    check(keys, [Match.OneOf(String, Mongo.ObjectID)]);                                                              // 960
                                                                                                                      // 961
	    var promises = keys.map(function (key) {                                                                         // 962
	      return this._removeDoc(key);                                                                                   // 963
	    }, this);                                                                                                        // 964
                                                                                                                      // 965
	    return $meteorUtils.promiseAll(promises);                                                                        // 966
	  };                                                                                                                 // 967
                                                                                                                      // 968
	  AngularMeteorCollection._removeDoc = function (id) {                                                               // 969
	    var deferred = $q.defer();                                                                                       // 970
	    var collection = this.$$collection;                                                                              // 971
	    var fulfill = $meteorUtils.fulfill(deferred, null, { _id: id, action: 'removed' });                              // 972
	    collection.remove(id, fulfill);                                                                                  // 973
	    return deferred.promise;                                                                                         // 974
	  };                                                                                                                 // 975
                                                                                                                      // 976
	  AngularMeteorCollection._updateCursor = function (cursor, autoClientSave) {                                        // 977
	    var self = this;                                                                                                 // 978
	    // XXX - consider adding an option for a non-orderd result for faster performance                                // 979
	    if (self._hObserve) self._stopObserving();                                                                       // 980
                                                                                                                      // 981
	    self._hObserve = cursor.observe({                                                                                // 982
	      addedAt: function addedAt(doc, atIndex) {                                                                      // 983
	        self.splice(atIndex, 0, doc);                                                                                // 984
	        self._serverBackup.splice(atIndex, 0, doc);                                                                  // 985
	        self._setServerUpdateMode();                                                                                 // 986
	      },                                                                                                             // 987
                                                                                                                      // 988
	      changedAt: function changedAt(doc, oldDoc, atIndex) {                                                          // 989
	        diffArray.deepCopyChanges(self[atIndex], doc);                                                               // 990
	        diffArray.deepCopyRemovals(self[atIndex], doc);                                                              // 991
	        self._serverBackup[atIndex] = self[atIndex];                                                                 // 992
	        self._setServerUpdateMode();                                                                                 // 993
	      },                                                                                                             // 994
                                                                                                                      // 995
	      movedTo: function movedTo(doc, fromIndex, toIndex) {                                                           // 996
	        self.splice(fromIndex, 1);                                                                                   // 997
	        self.splice(toIndex, 0, doc);                                                                                // 998
	        self._serverBackup.splice(fromIndex, 1);                                                                     // 999
	        self._serverBackup.splice(toIndex, 0, doc);                                                                  // 1000
	        self._setServerUpdateMode();                                                                                 // 1001
	      },                                                                                                             // 1002
                                                                                                                      // 1003
	      removedAt: function removedAt(oldDoc) {                                                                        // 1004
	        var removedIndex = $meteorUtils.findIndexById(self, oldDoc);                                                 // 1005
                                                                                                                      // 1006
	        if (removedIndex != -1) {                                                                                    // 1007
	          self.splice(removedIndex, 1);                                                                              // 1008
	          self._serverBackup.splice(removedIndex, 1);                                                                // 1009
	          self._setServerUpdateMode();                                                                               // 1010
	        } else {                                                                                                     // 1011
	          // If it's been removed on client then it's already not in collection                                      // 1012
	          // itself but still is in the _serverBackup.                                                               // 1013
	          removedIndex = $meteorUtils.findIndexById(self._serverBackup, oldDoc);                                     // 1014
                                                                                                                      // 1015
	          if (removedIndex != -1) {                                                                                  // 1016
	            self._serverBackup.splice(removedIndex, 1);                                                              // 1017
	          }                                                                                                          // 1018
	        }                                                                                                            // 1019
	      }                                                                                                              // 1020
	    });                                                                                                              // 1021
                                                                                                                      // 1022
	    self._hDataAutorun = Tracker.autorun(function () {                                                               // 1023
	      cursor.fetch();                                                                                                // 1024
	      if (self._serverMode) self._unsetServerUpdateMode(autoClientSave);                                             // 1025
	    });                                                                                                              // 1026
	  };                                                                                                                 // 1027
                                                                                                                      // 1028
	  AngularMeteorCollection._stopObserving = function () {                                                             // 1029
	    this._hObserve.stop();                                                                                           // 1030
	    this._hDataAutorun.stop();                                                                                       // 1031
	    delete this._serverMode;                                                                                         // 1032
	    delete this._hUnsetTimeout;                                                                                      // 1033
	  };                                                                                                                 // 1034
                                                                                                                      // 1035
	  AngularMeteorCollection._setServerUpdateMode = function (name) {                                                   // 1036
	    this._serverMode = true;                                                                                         // 1037
	    // To simplify server update logic, we don't follow                                                              // 1038
	    // updates from the client at the same time.                                                                     // 1039
	    this._unsetAutoClientSave();                                                                                     // 1040
	  };                                                                                                                 // 1041
                                                                                                                      // 1042
	  // Here we use $timeout to combine multiple updates that go                                                        // 1043
	  // each one after another.                                                                                         // 1044
	  AngularMeteorCollection._unsetServerUpdateMode = function (autoClientSave) {                                       // 1045
	    var self = this;                                                                                                 // 1046
                                                                                                                      // 1047
	    if (self._hUnsetTimeout) {                                                                                       // 1048
	      $timeout.cancel(self._hUnsetTimeout);                                                                          // 1049
	      self._hUnsetTimeout = null;                                                                                    // 1050
	    }                                                                                                                // 1051
                                                                                                                      // 1052
	    self._hUnsetTimeout = $timeout(function () {                                                                     // 1053
	      self._serverMode = false;                                                                                      // 1054
	      // Finds updates that was potentially done from the client side                                                // 1055
	      // and saves them.                                                                                             // 1056
	      var changes = diffArray.getChanges(self, self._serverBackup, self._diffArrayFunc);                             // 1057
	      self._saveChanges(changes);                                                                                    // 1058
	      // After, continues following client updates.                                                                  // 1059
	      if (autoClientSave) self._setAutoClientSave();                                                                 // 1060
	    }, 0);                                                                                                           // 1061
	  };                                                                                                                 // 1062
                                                                                                                      // 1063
	  AngularMeteorCollection.stop = function () {                                                                       // 1064
	    this._stopCursor();                                                                                              // 1065
	    this._hNewCurAutorun.stop();                                                                                     // 1066
	  };                                                                                                                 // 1067
                                                                                                                      // 1068
	  AngularMeteorCollection._stopCursor = function () {                                                                // 1069
	    this._unsetAutoClientSave();                                                                                     // 1070
                                                                                                                      // 1071
	    if (this._hObserve) {                                                                                            // 1072
	      this._hObserve.stop();                                                                                         // 1073
	      this._hDataAutorun.stop();                                                                                     // 1074
	    }                                                                                                                // 1075
                                                                                                                      // 1076
	    this.splice(0);                                                                                                  // 1077
	    this._serverBackup.splice(0);                                                                                    // 1078
	  };                                                                                                                 // 1079
                                                                                                                      // 1080
	  AngularMeteorCollection._unsetAutoClientSave = function (name) {                                                   // 1081
	    if (this._hRegAutoBind) {                                                                                        // 1082
	      this._hRegAutoBind();                                                                                          // 1083
	      this._hRegAutoBind = null;                                                                                     // 1084
	    }                                                                                                                // 1085
	  };                                                                                                                 // 1086
                                                                                                                      // 1087
	  AngularMeteorCollection._setAutoClientSave = function () {                                                         // 1088
	    var self = this;                                                                                                 // 1089
                                                                                                                      // 1090
	    // Always unsets auto save to keep only one $watch handler.                                                      // 1091
	    self._unsetAutoClientSave();                                                                                     // 1092
                                                                                                                      // 1093
	    self._hRegAutoBind = $rootScope.$watch(function () {                                                             // 1094
	      return self;                                                                                                   // 1095
	    }, function (nItems, oItems) {                                                                                   // 1096
	      if (nItems === oItems) return;                                                                                 // 1097
                                                                                                                      // 1098
	      var changes = diffArray.getChanges(self, oItems, self._diffArrayFunc);                                         // 1099
	      self._unsetAutoClientSave();                                                                                   // 1100
	      self._saveChanges(changes);                                                                                    // 1101
	      self._setAutoClientSave();                                                                                     // 1102
	    }, true);                                                                                                        // 1103
	  };                                                                                                                 // 1104
                                                                                                                      // 1105
	  AngularMeteorCollection._saveChanges = function (changes) {                                                        // 1106
	    var self = this;                                                                                                 // 1107
                                                                                                                      // 1108
	    // Saves added documents                                                                                         // 1109
	    // Using reversed iteration to prevent indexes from changing during splice                                       // 1110
	    var addedDocs = changes.added.reverse().map(function (descriptor) {                                              // 1111
	      self.splice(descriptor.index, 1);                                                                              // 1112
	      return descriptor.item;                                                                                        // 1113
	    });                                                                                                              // 1114
                                                                                                                      // 1115
	    if (addedDocs.length) self.save(addedDocs);                                                                      // 1116
                                                                                                                      // 1117
	    // Removes deleted documents                                                                                     // 1118
	    var removedDocs = changes.removed.map(function (descriptor) {                                                    // 1119
	      return descriptor.item;                                                                                        // 1120
	    });                                                                                                              // 1121
                                                                                                                      // 1122
	    if (removedDocs.length) self.remove(removedDocs);                                                                // 1123
                                                                                                                      // 1124
	    // Updates changed documents                                                                                     // 1125
	    changes.changed.forEach(function (descriptor) {                                                                  // 1126
	      self._updateDiff(descriptor.selector, descriptor.modifier);                                                    // 1127
	    });                                                                                                              // 1128
	  };                                                                                                                 // 1129
                                                                                                                      // 1130
	  return AngularMeteorCollection;                                                                                    // 1131
	}]);                                                                                                                 // 1132
                                                                                                                      // 1133
	angularMeteorCollection.factory('$meteorCollectionFS', ['$meteorCollection', 'diffArray', '$angularMeteorSettings', function ($meteorCollection, diffArray, $angularMeteorSettings) {
	  function $meteorCollectionFS(reactiveFunc, autoClientSave, collection) {                                           // 1135
                                                                                                                      // 1136
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.$meteorCollectionFS] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/files. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
	    return new $meteorCollection(reactiveFunc, autoClientSave, collection, diffArray.shallow);                       // 1138
	  }                                                                                                                  // 1139
                                                                                                                      // 1140
	  return $meteorCollectionFS;                                                                                        // 1141
	}]);                                                                                                                 // 1142
                                                                                                                      // 1143
	angularMeteorCollection.factory('$meteorCollection', ['AngularMeteorCollection', '$rootScope', 'diffArray', function (AngularMeteorCollection, $rootScope, diffArray) {
	  function $meteorCollection(reactiveFunc, autoClientSave, collection, diffFn) {                                     // 1145
	    // Validate parameters                                                                                           // 1146
	    if (!reactiveFunc) {                                                                                             // 1147
	      throw new TypeError('The first argument of $meteorCollection is undefined.');                                  // 1148
	    }                                                                                                                // 1149
                                                                                                                      // 1150
	    if (!(angular.isFunction(reactiveFunc) || angular.isFunction(reactiveFunc.find))) {                              // 1151
	      throw new TypeError('The first argument of $meteorCollection must be a function or ' + 'a have a find function property.');
	    }                                                                                                                // 1153
                                                                                                                      // 1154
	    if (!angular.isFunction(reactiveFunc)) {                                                                         // 1155
	      collection = angular.isDefined(collection) ? collection : reactiveFunc;                                        // 1156
	      reactiveFunc = _underscore2.default.bind(reactiveFunc.find, reactiveFunc);                                     // 1157
	    }                                                                                                                // 1158
                                                                                                                      // 1159
	    // By default auto save - true.                                                                                  // 1160
	    autoClientSave = angular.isDefined(autoClientSave) ? autoClientSave : true;                                      // 1161
	    diffFn = diffFn || diffArray;                                                                                    // 1162
	    return new AngularMeteorCollection(reactiveFunc, collection, diffFn, autoClientSave);                            // 1163
	  }                                                                                                                  // 1164
                                                                                                                      // 1165
	  return $meteorCollection;                                                                                          // 1166
	}]);                                                                                                                 // 1167
                                                                                                                      // 1168
	angularMeteorCollection.run(['$rootScope', '$meteorCollection', '$meteorCollectionFS', '$meteorStopper', function ($rootScope, $meteorCollection, $meteorCollectionFS, $meteorStopper) {
	  var scopeProto = Object.getPrototypeOf($rootScope);                                                                // 1170
	  scopeProto.$meteorCollection = $meteorStopper($meteorCollection);                                                  // 1171
	  scopeProto.$meteorCollectionFS = $meteorStopper($meteorCollectionFS);                                              // 1172
	}]);                                                                                                                 // 1173
                                                                                                                      // 1174
/***/ },                                                                                                              // 1175
/* 10 */                                                                                                              // 1176
/***/ function(module, exports, __webpack_require__) {                                                                // 1177
                                                                                                                      // 1178
	'use strict';                                                                                                        // 1179
                                                                                                                      // 1180
	var _underscore = __webpack_require__(2);                                                                            // 1181
                                                                                                                      // 1182
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1183
                                                                                                                      // 1184
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1185
                                                                                                                      // 1186
	'use strict'; /*global                                                                                               // 1187
	                angular, _, Mongo                                                                                    // 1188
	              */                                                                                                     // 1189
                                                                                                                      // 1190
	var angularMeteorObject = angular.module('angular-meteor.object', ['angular-meteor.utils', 'angular-meteor.subscribe', 'angular-meteor.collection', 'getUpdates', 'diffArray', 'angular-meteor.settings']);
                                                                                                                      // 1192
	angularMeteorObject.factory('AngularMeteorObject', ['$q', '$meteorSubscribe', '$meteorUtils', 'diffArray', 'getUpdates', 'AngularMeteorCollection', '$angularMeteorSettings', function ($q, $meteorSubscribe, $meteorUtils, diffArray, getUpdates, AngularMeteorCollection, $angularMeteorSettings) {
                                                                                                                      // 1194
	  // A list of internals properties to not watch for, nor pass to the Document on update and etc.                    // 1195
	  AngularMeteorObject.$$internalProps = ['$$collection', '$$options', '$$id', '$$hashkey', '$$internalProps', '$$scope', 'bind', 'save', 'reset', 'subscribe', 'stop', 'autorunComputation', 'unregisterAutoBind', 'unregisterAutoDestroy', 'getRawObject', '_auto', '_setAutos', '_eventEmitter', '_serverBackup', '_updateDiff', '_updateParallel', '_getId'];
                                                                                                                      // 1197
	  function AngularMeteorObject(collection, selector, options) {                                                      // 1198
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.$meteorObject] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/meteorObject. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
	    // Make data not be an object so we can extend it to preserve                                                    // 1200
	    // Collection Helpers and the like                                                                               // 1201
	    var helpers = collection._helpers;                                                                               // 1202
	    var data = _underscore2.default.isFunction(helpers) ? Object.create(helpers.prototype) : {};                     // 1203
	    var doc = collection.findOne(selector, options);                                                                 // 1204
	    var collectionExtension = _underscore2.default.pick(AngularMeteorCollection, '_updateParallel');                 // 1205
	    _underscore2.default.extend(data, doc);                                                                          // 1206
	    _underscore2.default.extend(data, AngularMeteorObject);                                                          // 1207
	    _underscore2.default.extend(data, collectionExtension);                                                          // 1208
                                                                                                                      // 1209
	    // Omit options that may spoil document finding                                                                  // 1210
	    data.$$options = _underscore2.default.omit(options, 'skip', 'limit');                                            // 1211
	    data.$$collection = collection;                                                                                  // 1212
	    data.$$id = data._getId(selector);                                                                               // 1213
	    data._serverBackup = doc || {};                                                                                  // 1214
                                                                                                                      // 1215
	    return data;                                                                                                     // 1216
	  }                                                                                                                  // 1217
                                                                                                                      // 1218
	  AngularMeteorObject.getRawObject = function () {                                                                   // 1219
	    return angular.copy(_underscore2.default.omit(this, this.$$internalProps));                                      // 1220
	  };                                                                                                                 // 1221
                                                                                                                      // 1222
	  AngularMeteorObject.subscribe = function () {                                                                      // 1223
	    $meteorSubscribe.subscribe.apply(this, arguments);                                                               // 1224
	    return this;                                                                                                     // 1225
	  };                                                                                                                 // 1226
                                                                                                                      // 1227
	  AngularMeteorObject.save = function (custom) {                                                                     // 1228
	    var deferred = $q.defer();                                                                                       // 1229
	    var collection = this.$$collection;                                                                              // 1230
	    var createFulfill = _underscore2.default.partial($meteorUtils.fulfill, deferred, null);                          // 1231
	    var oldDoc = collection.findOne(this.$$id);                                                                      // 1232
	    var mods;                                                                                                        // 1233
                                                                                                                      // 1234
	    // update                                                                                                        // 1235
	    if (oldDoc) {                                                                                                    // 1236
	      if (custom) mods = { $set: custom };else {                                                                     // 1237
	        mods = getUpdates(oldDoc, this.getRawObject());                                                              // 1238
	        // If there are no updates, there is nothing to do here, returning                                           // 1239
	        if (_underscore2.default.isEmpty(mods)) {                                                                    // 1240
	          return $q.when({ action: 'updated' });                                                                     // 1241
	        }                                                                                                            // 1242
	      }                                                                                                              // 1243
                                                                                                                      // 1244
	      // NOTE: do not use #upsert() method, since it does not exist in some collections                              // 1245
	      this._updateDiff(mods, createFulfill({ action: 'updated' }));                                                  // 1246
	    }                                                                                                                // 1247
	    // insert                                                                                                        // 1248
	    else {                                                                                                           // 1249
	        if (custom) mods = _underscore2.default.clone(custom);else mods = this.getRawObject();                       // 1250
                                                                                                                      // 1251
	        mods._id = mods._id || this.$$id;                                                                            // 1252
	        collection.insert(mods, createFulfill({ action: 'inserted' }));                                              // 1253
	      }                                                                                                              // 1254
                                                                                                                      // 1255
	    return deferred.promise;                                                                                         // 1256
	  };                                                                                                                 // 1257
                                                                                                                      // 1258
	  AngularMeteorObject._updateDiff = function (update, callback) {                                                    // 1259
	    var selector = this.$$id;                                                                                        // 1260
	    AngularMeteorCollection._updateDiff.call(this, selector, update, callback);                                      // 1261
	  };                                                                                                                 // 1262
                                                                                                                      // 1263
	  AngularMeteorObject.reset = function (keepClientProps) {                                                           // 1264
	    var self = this;                                                                                                 // 1265
	    var options = this.$$options;                                                                                    // 1266
	    var id = this.$$id;                                                                                              // 1267
	    var doc = this.$$collection.findOne(id, options);                                                                // 1268
                                                                                                                      // 1269
	    if (doc) {                                                                                                       // 1270
	      // extend SubObject                                                                                            // 1271
	      var docKeys = _underscore2.default.keys(doc);                                                                  // 1272
	      var docExtension = _underscore2.default.pick(doc, docKeys);                                                    // 1273
	      var clientProps;                                                                                               // 1274
                                                                                                                      // 1275
	      _underscore2.default.extend(self, docExtension);                                                               // 1276
	      _underscore2.default.extend(self._serverBackup, docExtension);                                                 // 1277
                                                                                                                      // 1278
	      if (keepClientProps) {                                                                                         // 1279
	        clientProps = _underscore2.default.intersection(_underscore2.default.keys(self), _underscore2.default.keys(self._serverBackup));
	      } else {                                                                                                       // 1281
	        clientProps = _underscore2.default.keys(self);                                                               // 1282
	      }                                                                                                              // 1283
                                                                                                                      // 1284
	      var serverProps = _underscore2.default.keys(doc);                                                              // 1285
	      var removedKeys = _underscore2.default.difference(clientProps, serverProps, self.$$internalProps);             // 1286
                                                                                                                      // 1287
	      removedKeys.forEach(function (prop) {                                                                          // 1288
	        delete self[prop];                                                                                           // 1289
	        delete self._serverBackup[prop];                                                                             // 1290
	      });                                                                                                            // 1291
	    } else {                                                                                                         // 1292
	      _underscore2.default.keys(this.getRawObject()).forEach(function (prop) {                                       // 1293
	        delete self[prop];                                                                                           // 1294
	      });                                                                                                            // 1295
                                                                                                                      // 1296
	      self._serverBackup = {};                                                                                       // 1297
	    }                                                                                                                // 1298
	  };                                                                                                                 // 1299
                                                                                                                      // 1300
	  AngularMeteorObject.stop = function () {                                                                           // 1301
	    if (this.unregisterAutoDestroy) this.unregisterAutoDestroy();                                                    // 1302
                                                                                                                      // 1303
	    if (this.unregisterAutoBind) this.unregisterAutoBind();                                                          // 1304
                                                                                                                      // 1305
	    if (this.autorunComputation && this.autorunComputation.stop) this.autorunComputation.stop();                     // 1306
	  };                                                                                                                 // 1307
                                                                                                                      // 1308
	  AngularMeteorObject._getId = function (selector) {                                                                 // 1309
	    var options = _underscore2.default.extend({}, this.$$options, {                                                  // 1310
	      fields: { _id: 1 },                                                                                            // 1311
	      reactive: false,                                                                                               // 1312
	      transform: null                                                                                                // 1313
	    });                                                                                                              // 1314
                                                                                                                      // 1315
	    var doc = this.$$collection.findOne(selector, options);                                                          // 1316
                                                                                                                      // 1317
	    if (doc) return doc._id;                                                                                         // 1318
	    if (selector instanceof Mongo.ObjectID) return selector;                                                         // 1319
	    if (_underscore2.default.isString(selector)) return selector;                                                    // 1320
	    return new Mongo.ObjectID();                                                                                     // 1321
	  };                                                                                                                 // 1322
                                                                                                                      // 1323
	  return AngularMeteorObject;                                                                                        // 1324
	}]);                                                                                                                 // 1325
                                                                                                                      // 1326
	angularMeteorObject.factory('$meteorObject', ['$rootScope', '$meteorUtils', 'getUpdates', 'AngularMeteorObject', function ($rootScope, $meteorUtils, getUpdates, AngularMeteorObject) {
	  function $meteorObject(collection, id, auto, options) {                                                            // 1328
	    // Validate parameters                                                                                           // 1329
	    if (!collection) {                                                                                               // 1330
	      throw new TypeError("The first argument of $meteorObject is undefined.");                                      // 1331
	    }                                                                                                                // 1332
                                                                                                                      // 1333
	    if (!angular.isFunction(collection.findOne)) {                                                                   // 1334
	      throw new TypeError("The first argument of $meteorObject must be a function or a have a findOne function property.");
	    }                                                                                                                // 1336
                                                                                                                      // 1337
	    var data = new AngularMeteorObject(collection, id, options);                                                     // 1338
	    // Making auto default true - http://stackoverflow.com/a/15464208/1426570                                        // 1339
	    data._auto = auto !== false;                                                                                     // 1340
	    _underscore2.default.extend(data, $meteorObject);                                                                // 1341
	    data._setAutos();                                                                                                // 1342
	    return data;                                                                                                     // 1343
	  }                                                                                                                  // 1344
                                                                                                                      // 1345
	  $meteorObject._setAutos = function () {                                                                            // 1346
	    var self = this;                                                                                                 // 1347
                                                                                                                      // 1348
	    this.autorunComputation = $meteorUtils.autorun($rootScope, function () {                                         // 1349
	      self.reset(true);                                                                                              // 1350
	    });                                                                                                              // 1351
                                                                                                                      // 1352
	    // Deep watches the model and performs autobind                                                                  // 1353
	    this.unregisterAutoBind = this._auto && $rootScope.$watch(function () {                                          // 1354
	      return self.getRawObject();                                                                                    // 1355
	    }, function (item, oldItem) {                                                                                    // 1356
	      if (item !== oldItem) self.save();                                                                             // 1357
	    }, true);                                                                                                        // 1358
                                                                                                                      // 1359
	    this.unregisterAutoDestroy = $rootScope.$on('$destroy', function () {                                            // 1360
	      if (self && self.stop) self.pop();                                                                             // 1361
	    });                                                                                                              // 1362
	  };                                                                                                                 // 1363
                                                                                                                      // 1364
	  return $meteorObject;                                                                                              // 1365
	}]);                                                                                                                 // 1366
                                                                                                                      // 1367
	angularMeteorObject.run(['$rootScope', '$meteorObject', '$meteorStopper', function ($rootScope, $meteorObject, $meteorStopper) {
	  var scopeProto = Object.getPrototypeOf($rootScope);                                                                // 1369
	  scopeProto.$meteorObject = $meteorStopper($meteorObject);                                                          // 1370
	}]);                                                                                                                 // 1371
                                                                                                                      // 1372
/***/ },                                                                                                              // 1373
/* 11 */                                                                                                              // 1374
/***/ function(module, exports, __webpack_require__) {                                                                // 1375
                                                                                                                      // 1376
	'use strict';                                                                                                        // 1377
                                                                                                                      // 1378
	var _underscore = __webpack_require__(2);                                                                            // 1379
                                                                                                                      // 1380
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1381
                                                                                                                      // 1382
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1383
                                                                                                                      // 1384
	'use strict'; /*global                                                                                               // 1385
	               angular, _, Package, Meteor                                                                           // 1386
	               */                                                                                                    // 1387
                                                                                                                      // 1388
	var angularMeteorUser = angular.module('angular-meteor.user', ['angular-meteor.utils', 'angular-meteor.core', 'angular-meteor.settings']);
                                                                                                                      // 1390
	// requires package 'accounts-password'                                                                              // 1391
	angularMeteorUser.service('$meteorUser', ['$rootScope', '$meteorUtils', '$q', '$angularMeteorSettings', function ($rootScope, $meteorUtils, $q, $angularMeteorSettings) {
                                                                                                                      // 1393
	  var pack = Package['accounts-base'];                                                                               // 1394
	  if (!pack) return;                                                                                                 // 1395
                                                                                                                      // 1396
	  var self = this;                                                                                                   // 1397
	  var Accounts = pack.Accounts;                                                                                      // 1398
                                                                                                                      // 1399
	  this.waitForUser = function () {                                                                                   // 1400
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.waitForUser] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! http://info.meteor.com/blog/angular-meteor-1.3. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 1402
	    var deferred = $q.defer();                                                                                       // 1403
                                                                                                                      // 1404
	    $meteorUtils.autorun($rootScope, function () {                                                                   // 1405
	      if (!Meteor.loggingIn()) deferred.resolve(Meteor.user());                                                      // 1406
	    }, true);                                                                                                        // 1407
                                                                                                                      // 1408
	    return deferred.promise;                                                                                         // 1409
	  };                                                                                                                 // 1410
                                                                                                                      // 1411
	  this.requireUser = function () {                                                                                   // 1412
	    if (!$angularMeteorSettings.suppressWarnings) {                                                                  // 1413
	      console.warn('[angular-meteor.requireUser] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! http://info.meteor.com/blog/angular-meteor-1.3. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
	    }                                                                                                                // 1415
                                                                                                                      // 1416
	    var deferred = $q.defer();                                                                                       // 1417
                                                                                                                      // 1418
	    $meteorUtils.autorun($rootScope, function () {                                                                   // 1419
	      if (!Meteor.loggingIn()) {                                                                                     // 1420
	        if (Meteor.user() === null) deferred.reject("AUTH_REQUIRED");else deferred.resolve(Meteor.user());           // 1421
	      }                                                                                                              // 1422
	    }, true);                                                                                                        // 1423
                                                                                                                      // 1424
	    return deferred.promise;                                                                                         // 1425
	  };                                                                                                                 // 1426
                                                                                                                      // 1427
	  this.requireValidUser = function (validatorFn) {                                                                   // 1428
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.requireValidUser] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! http://info.meteor.com/blog/angular-meteor-1.3. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 1430
	    return self.requireUser(true).then(function (user) {                                                             // 1431
	      var valid = validatorFn(user);                                                                                 // 1432
                                                                                                                      // 1433
	      if (valid === true) return user;else if (typeof valid === "string") return $q.reject(valid);else return $q.reject("FORBIDDEN");
	    });                                                                                                              // 1435
	  };                                                                                                                 // 1436
                                                                                                                      // 1437
	  this.loginWithPassword = $meteorUtils.promissor(Meteor, 'loginWithPassword');                                      // 1438
	  this.createUser = $meteorUtils.promissor(Accounts, 'createUser');                                                  // 1439
	  this.changePassword = $meteorUtils.promissor(Accounts, 'changePassword');                                          // 1440
	  this.forgotPassword = $meteorUtils.promissor(Accounts, 'forgotPassword');                                          // 1441
	  this.resetPassword = $meteorUtils.promissor(Accounts, 'resetPassword');                                            // 1442
	  this.verifyEmail = $meteorUtils.promissor(Accounts, 'verifyEmail');                                                // 1443
	  this.logout = $meteorUtils.promissor(Meteor, 'logout');                                                            // 1444
	  this.logoutOtherClients = $meteorUtils.promissor(Meteor, 'logoutOtherClients');                                    // 1445
	  this.loginWithFacebook = $meteorUtils.promissor(Meteor, 'loginWithFacebook');                                      // 1446
	  this.loginWithTwitter = $meteorUtils.promissor(Meteor, 'loginWithTwitter');                                        // 1447
	  this.loginWithGoogle = $meteorUtils.promissor(Meteor, 'loginWithGoogle');                                          // 1448
	  this.loginWithGithub = $meteorUtils.promissor(Meteor, 'loginWithGithub');                                          // 1449
	  this.loginWithMeteorDeveloperAccount = $meteorUtils.promissor(Meteor, 'loginWithMeteorDeveloperAccount');          // 1450
	  this.loginWithMeetup = $meteorUtils.promissor(Meteor, 'loginWithMeetup');                                          // 1451
	  this.loginWithWeibo = $meteorUtils.promissor(Meteor, 'loginWithWeibo');                                            // 1452
	}]);                                                                                                                 // 1453
                                                                                                                      // 1454
	angularMeteorUser.run(['$rootScope', '$angularMeteorSettings', '$$Core', function ($rootScope, $angularMeteorSettings, $$Core) {
                                                                                                                      // 1456
	  var ScopeProto = Object.getPrototypeOf($rootScope);                                                                // 1457
	  _underscore2.default.extend(ScopeProto, $$Core);                                                                   // 1458
                                                                                                                      // 1459
	  $rootScope.autorun(function () {                                                                                   // 1460
	    if (!Meteor.user) return;                                                                                        // 1461
	    $rootScope.currentUser = Meteor.user();                                                                          // 1462
	    $rootScope.loggingIn = Meteor.loggingIn();                                                                       // 1463
	  });                                                                                                                // 1464
	}]);                                                                                                                 // 1465
                                                                                                                      // 1466
/***/ },                                                                                                              // 1467
/* 12 */                                                                                                              // 1468
/***/ function(module, exports, __webpack_require__) {                                                                // 1469
                                                                                                                      // 1470
	'use strict';                                                                                                        // 1471
                                                                                                                      // 1472
	var _underscore = __webpack_require__(2);                                                                            // 1473
                                                                                                                      // 1474
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1475
                                                                                                                      // 1476
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1477
                                                                                                                      // 1478
	'use strict'; /*global                                                                                               // 1479
	               angular, _, Meteor                                                                                    // 1480
	               */                                                                                                    // 1481
                                                                                                                      // 1482
	var angularMeteorMethods = angular.module('angular-meteor.methods', ['angular-meteor.utils', 'angular-meteor.settings']);
                                                                                                                      // 1484
	angularMeteorMethods.service('$meteorMethods', ['$q', '$meteorUtils', '$angularMeteorSettings', function ($q, $meteorUtils, $angularMeteorSettings) {
	  this.call = function () {                                                                                          // 1486
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.$meteor.call] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/methods. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 1488
	    var deferred = $q.defer();                                                                                       // 1489
	    var fulfill = $meteorUtils.fulfill(deferred);                                                                    // 1490
	    var args = _underscore2.default.toArray(arguments).concat(fulfill);                                              // 1491
	    Meteor.call.apply(this, args);                                                                                   // 1492
	    return deferred.promise;                                                                                         // 1493
	  };                                                                                                                 // 1494
	}]);                                                                                                                 // 1495
                                                                                                                      // 1496
/***/ },                                                                                                              // 1497
/* 13 */                                                                                                              // 1498
/***/ function(module, exports) {                                                                                     // 1499
                                                                                                                      // 1500
	/*global                                                                                                             // 1501
	 angular, Session                                                                                                    // 1502
	 */                                                                                                                  // 1503
                                                                                                                      // 1504
	'use strict';                                                                                                        // 1505
                                                                                                                      // 1506
	var angularMeteorSession = angular.module('angular-meteor.session', ['angular-meteor.utils', 'angular-meteor.settings']);
                                                                                                                      // 1508
	angularMeteorSession.factory('$meteorSession', ['$meteorUtils', '$parse', '$angularMeteorSettings', function ($meteorUtils, $parse, $angularMeteorSettings) {
	  return function (session) {                                                                                        // 1510
                                                                                                                      // 1511
	    return {                                                                                                         // 1512
                                                                                                                      // 1513
	      bind: function bind(scope, model) {                                                                            // 1514
	        if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.session.bind] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! http://www.angular-meteor.com/api/1.3.0/session. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 1516
	        var getter = $parse(model);                                                                                  // 1517
	        var setter = getter.assign;                                                                                  // 1518
	        $meteorUtils.autorun(scope, function () {                                                                    // 1519
	          setter(scope, Session.get(session));                                                                       // 1520
	        });                                                                                                          // 1521
                                                                                                                      // 1522
	        scope.$watch(model, function (newItem, oldItem) {                                                            // 1523
	          Session.set(session, getter(scope));                                                                       // 1524
	        }, true);                                                                                                    // 1525
	      }                                                                                                              // 1526
	    };                                                                                                               // 1527
	  };                                                                                                                 // 1528
	}]);                                                                                                                 // 1529
                                                                                                                      // 1530
/***/ },                                                                                                              // 1531
/* 14 */                                                                                                              // 1532
/***/ function(module, exports) {                                                                                     // 1533
                                                                                                                      // 1534
	/*global                                                                                                             // 1535
	 angular, Package                                                                                                    // 1536
	 */                                                                                                                  // 1537
                                                                                                                      // 1538
	'use strict';                                                                                                        // 1539
                                                                                                                      // 1540
	var angularMeteorCamera = angular.module('angular-meteor.camera', ['angular-meteor.utils', 'angular-meteor.settings']);
                                                                                                                      // 1542
	// requires package 'mdg:camera'                                                                                     // 1543
	angularMeteorCamera.service('$meteorCamera', ['$q', '$meteorUtils', '$angularMeteorSettings', function ($q, $meteorUtils, $angularMeteorSettings) {
	  if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.camera] Please note that this module has moved to a separate package and is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/camera. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
	  var pack = Package['mdg:camera'];                                                                                  // 1546
	  if (!pack) return;                                                                                                 // 1547
                                                                                                                      // 1548
	  var MeteorCamera = pack.MeteorCamera;                                                                              // 1549
                                                                                                                      // 1550
	  this.getPicture = function (options) {                                                                             // 1551
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.camera] Please note that this module has moved to a separate package and is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/camera. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 1553
	    options = options || {};                                                                                         // 1554
	    var deferred = $q.defer();                                                                                       // 1555
	    MeteorCamera.getPicture(options, $meteorUtils.fulfill(deferred));                                                // 1556
	    return deferred.promise;                                                                                         // 1557
	  };                                                                                                                 // 1558
	}]);                                                                                                                 // 1559
                                                                                                                      // 1560
/***/ },                                                                                                              // 1561
/* 15 */                                                                                                              // 1562
/***/ function(module, exports) {                                                                                     // 1563
                                                                                                                      // 1564
	/*global                                                                                                             // 1565
	 angular                                                                                                             // 1566
	 */                                                                                                                  // 1567
                                                                                                                      // 1568
	'use strict';                                                                                                        // 1569
                                                                                                                      // 1570
	var angularMeteorStopper = angular.module('angular-meteor.stopper', ['angular-meteor.subscribe']);                   // 1571
                                                                                                                      // 1572
	angularMeteorStopper.factory('$meteorStopper', ['$q', '$meteorSubscribe', function ($q, $meteorSubscribe) {          // 1573
	  function $meteorStopper($meteorEntity) {                                                                           // 1574
	    return function () {                                                                                             // 1575
	      var args = Array.prototype.slice.call(arguments);                                                              // 1576
	      var meteorEntity = $meteorEntity.apply(this, args);                                                            // 1577
                                                                                                                      // 1578
	      angular.extend(meteorEntity, $meteorStopper);                                                                  // 1579
	      meteorEntity.$$scope = this;                                                                                   // 1580
                                                                                                                      // 1581
	      this.$on('$destroy', function () {                                                                             // 1582
	        meteorEntity.stop();                                                                                         // 1583
	        if (meteorEntity.subscription) meteorEntity.subscription.stop();                                             // 1584
	      });                                                                                                            // 1585
                                                                                                                      // 1586
	      return meteorEntity;                                                                                           // 1587
	    };                                                                                                               // 1588
	  }                                                                                                                  // 1589
                                                                                                                      // 1590
	  $meteorStopper.subscribe = function () {                                                                           // 1591
	    var args = Array.prototype.slice.call(arguments);                                                                // 1592
	    this.subscription = $meteorSubscribe._subscribe(this.$$scope, $q.defer(), args);                                 // 1593
	    return this;                                                                                                     // 1594
	  };                                                                                                                 // 1595
                                                                                                                      // 1596
	  return $meteorStopper;                                                                                             // 1597
	}]);                                                                                                                 // 1598
                                                                                                                      // 1599
/***/ },                                                                                                              // 1600
/* 16 */                                                                                                              // 1601
/***/ function(module, exports, __webpack_require__) {                                                                // 1602
                                                                                                                      // 1603
	'use strict';                                                                                                        // 1604
                                                                                                                      // 1605
	Object.defineProperty(exports, "__esModule", {                                                                       // 1606
	  value: true                                                                                                        // 1607
	});                                                                                                                  // 1608
	exports.utils = exports.name = undefined;                                                                            // 1609
                                                                                                                      // 1610
	var _underscore = __webpack_require__(2);                                                                            // 1611
                                                                                                                      // 1612
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1613
                                                                                                                      // 1614
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1615
                                                                                                                      // 1616
	var name = exports.name = 'angular-meteor.utilities';                                                                // 1617
	var utils = exports.utils = '$$utils';                                                                               // 1618
                                                                                                                      // 1619
	angular.module(name, [])                                                                                             // 1620
                                                                                                                      // 1621
	/*                                                                                                                   // 1622
	  A utility service which is provided with general utility functions                                                 // 1623
	 */                                                                                                                  // 1624
	.service(utils, ['$rootScope', function ($rootScope) {                                                               // 1625
	  var self = this;                                                                                                   // 1626
                                                                                                                      // 1627
	  // Checks if an object is a cursor                                                                                 // 1628
	  this.isCursor = function (obj) {                                                                                   // 1629
	    return obj instanceof Meteor.Collection.Cursor;                                                                  // 1630
	  };                                                                                                                 // 1631
                                                                                                                      // 1632
	  // Cheecks if an object is a scope                                                                                 // 1633
	  this.isScope = function (obj) {                                                                                    // 1634
	    return obj instanceof $rootScope.constructor;                                                                    // 1635
	  };                                                                                                                 // 1636
                                                                                                                      // 1637
	  // Checks if an object is a view model                                                                             // 1638
	  this.isViewModel = function (obj) {                                                                                // 1639
	    return _underscore2.default.isObject(obj) && obj.$$dependencies;                                                 // 1640
	  };                                                                                                                 // 1641
                                                                                                                      // 1642
	  // Checks if two objects are siblings                                                                              // 1643
	  this.areSiblings = function (obj1, obj2) {                                                                         // 1644
	    return _underscore2.default.isObject(obj1) && _underscore2.default.isObject(obj2) && Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2);
	  };                                                                                                                 // 1646
                                                                                                                      // 1647
	  // Binds function into a scpecified context. If an object is provided, will bind every                             // 1648
	  // value in the object which is a function. If a tap function is provided, it will be                              // 1649
	  // called right after the function has been invoked.                                                               // 1650
	  this.bind = function (fn, context, tap) {                                                                          // 1651
	    tap = _underscore2.default.isFunction(tap) ? tap : angular.noop;                                                 // 1652
	    if (_underscore2.default.isFunction(fn)) return bindFn(fn, context, tap);                                        // 1653
	    if (_underscore2.default.isObject(fn)) return bindObj(fn, context, tap);                                         // 1654
	    return fn;                                                                                                       // 1655
	  };                                                                                                                 // 1656
                                                                                                                      // 1657
	  function bindFn(fn, context, tap) {                                                                                // 1658
	    return function () {                                                                                             // 1659
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {                         // 1660
	        args[_key] = arguments[_key];                                                                                // 1661
	      }                                                                                                              // 1662
                                                                                                                      // 1663
	      var result = fn.apply(context, args);                                                                          // 1664
	      tap.call(context, {                                                                                            // 1665
	        result: result,                                                                                              // 1666
	        args: args                                                                                                   // 1667
	      });                                                                                                            // 1668
	      return result;                                                                                                 // 1669
	    };                                                                                                               // 1670
	  }                                                                                                                  // 1671
                                                                                                                      // 1672
	  function bindObj(obj, context, tap) {                                                                              // 1673
	    return _underscore2.default.keys(obj).reduce(function (bound, k) {                                               // 1674
	      bound[k] = self.bind(obj[k], context, tap);                                                                    // 1675
	      return bound;                                                                                                  // 1676
	    }, {});                                                                                                          // 1677
	  }                                                                                                                  // 1678
	}]);                                                                                                                 // 1679
                                                                                                                      // 1680
/***/ },                                                                                                              // 1681
/* 17 */                                                                                                              // 1682
/***/ function(module, exports, __webpack_require__) {                                                                // 1683
                                                                                                                      // 1684
	'use strict';                                                                                                        // 1685
                                                                                                                      // 1686
	Object.defineProperty(exports, "__esModule", {                                                                       // 1687
	  value: true                                                                                                        // 1688
	});                                                                                                                  // 1689
	exports.Mixer = exports.name = undefined;                                                                            // 1690
                                                                                                                      // 1691
	var _underscore = __webpack_require__(2);                                                                            // 1692
                                                                                                                      // 1693
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1694
                                                                                                                      // 1695
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1696
                                                                                                                      // 1697
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
                                                                                                                      // 1699
	var name = exports.name = 'angular-meteor.mixer';                                                                    // 1700
	var Mixer = exports.Mixer = '$Mixer';                                                                                // 1701
                                                                                                                      // 1702
	angular.module(name, [])                                                                                             // 1703
                                                                                                                      // 1704
	/*                                                                                                                   // 1705
	  A service which lets us apply mixins into Scope.prototype.                                                         // 1706
	  The flow is simple. Once we define a mixin, it will be stored in the `$Mixer`,                                     // 1707
	  and any time a `ChildScope` prototype is created                                                                   // 1708
	  it will be extended by the `$Mixer`.                                                                               // 1709
	  This concept is good because it keeps our code                                                                     // 1710
	  clean and simple, and easy to extend.                                                                              // 1711
	  So any time we would like to define a new behaviour to our scope,                                                  // 1712
	  we will just use the `$Mixer` service.                                                                             // 1713
	 */                                                                                                                  // 1714
	.service(Mixer, function () {                                                                                        // 1715
	  var _this = this;                                                                                                  // 1716
                                                                                                                      // 1717
	  // Used to store method's caller                                                                                   // 1718
	  var caller = undefined;                                                                                            // 1719
                                                                                                                      // 1720
	  this._mixins = [];                                                                                                 // 1721
	  // Apply mixins automatically on specified contexts                                                                // 1722
	  this._autoExtend = [];                                                                                             // 1723
	  this._autoConstruct = [];                                                                                          // 1724
                                                                                                                      // 1725
	  // Adds a new mixin                                                                                                // 1726
	  this.mixin = function (mixin) {                                                                                    // 1727
	    if (!_underscore2.default.isObject(mixin)) {                                                                     // 1728
	      throw Error('argument 1 must be an object');                                                                   // 1729
	    }                                                                                                                // 1730
                                                                                                                      // 1731
	    _this._mixins = _underscore2.default.union(_this._mixins, [mixin]);                                              // 1732
	    // Apply mixins to stored contexts                                                                               // 1733
	    _this._autoExtend.forEach(function (context) {                                                                   // 1734
	      return _this._extend(context);                                                                                 // 1735
	    });                                                                                                              // 1736
	    _this._autoConstruct.forEach(function (context) {                                                                // 1737
	      return _this._construct(context);                                                                              // 1738
	    });                                                                                                              // 1739
	    return _this;                                                                                                    // 1740
	  };                                                                                                                 // 1741
                                                                                                                      // 1742
	  // Removes a mixin. Useful mainly for test purposes                                                                // 1743
	  this._mixout = function (mixin) {                                                                                  // 1744
	    _this._mixins = _underscore2.default.without(_this._mixins, mixin);                                              // 1745
	    return _this;                                                                                                    // 1746
	  };                                                                                                                 // 1747
                                                                                                                      // 1748
	  // Invoke function mixins with the provided context and arguments                                                  // 1749
	  this._construct = function (context) {                                                                             // 1750
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {        // 1751
	      args[_key - 1] = arguments[_key];                                                                              // 1752
	    }                                                                                                                // 1753
                                                                                                                      // 1754
	    _this._mixins.filter(_underscore2.default.isFunction).forEach(function (mixin) {                                 // 1755
	      mixin.call.apply(mixin, [context].concat(args));                                                               // 1756
	    });                                                                                                              // 1757
                                                                                                                      // 1758
	    return context;                                                                                                  // 1759
	  };                                                                                                                 // 1760
                                                                                                                      // 1761
	  // Extend prototype with the defined mixins                                                                        // 1762
	  this._extend = function (obj, options) {                                                                           // 1763
	    var _$defaults = _underscore2.default.defaults({}, options, {                                                    // 1764
	      pattern: /.*/ });                                                                                              // 1765
                                                                                                                      // 1766
	    var pattern = _$defaults.pattern;                                                                                // 1767
	    var context = _$defaults.context;                                                                                // 1768
	    // The patterns of the keys which will be filtered                                                               // 1769
                                                                                                                      // 1770
                                                                                                                      // 1771
	    var mixins = _this._mixins.map(function (mixin) {                                                                // 1772
	      // Filtering the keys by the specified pattern                                                                 // 1773
	      var keys = _underscore2.default.keys(mixin).filter(function (k) {                                              // 1774
	        return k.match(pattern);                                                                                     // 1775
	      }).filter(function (k) {                                                                                       // 1776
	        return _underscore2.default.isFunction(mixin[k]);                                                            // 1777
	      });                                                                                                            // 1778
                                                                                                                      // 1779
	      return keys.reduce(function (boundMixin, methodName) {                                                         // 1780
	        var methodHandler = mixin[methodName];                                                                       // 1781
                                                                                                                      // 1782
	        // Note that this is not an arrow function so we can conserve the conetxt                                    // 1783
	        boundMixin[methodName] = function () {                                                                       // 1784
	          // Storing original caller so we will know who actually called the                                         // 1785
	          // method event though it is bound to another context                                                      // 1786
	          var methodContext = context || this;                                                                       // 1787
	          var recentCaller = caller;                                                                                 // 1788
	          caller = this;                                                                                             // 1789
                                                                                                                      // 1790
	          try {                                                                                                      // 1791
	            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {             // 1792
	              args[_key2] = arguments[_key2];                                                                        // 1793
	            }                                                                                                        // 1794
                                                                                                                      // 1795
	            return methodHandler.apply(methodContext, args);                                                         // 1796
	          } finally {                                                                                                // 1797
	            // No matter what happens, restore variable to the previous one                                          // 1798
	            caller = recentCaller;                                                                                   // 1799
	          }                                                                                                          // 1800
	        };                                                                                                           // 1801
                                                                                                                      // 1802
	        return boundMixin;                                                                                           // 1803
	      }, {});                                                                                                        // 1804
	    });                                                                                                              // 1805
                                                                                                                      // 1806
	    return _underscore2.default.extend.apply(_underscore2.default, [obj].concat(_toConsumableArray(mixins)));        // 1807
	  };                                                                                                                 // 1808
                                                                                                                      // 1809
	  // Caller property can not be set                                                                                  // 1810
	  Object.defineProperty(this, 'caller', {                                                                            // 1811
	    configurable: true,                                                                                              // 1812
	    enumerable: true,                                                                                                // 1813
                                                                                                                      // 1814
	    get: function get() {                                                                                            // 1815
	      return caller;                                                                                                 // 1816
	    }                                                                                                                // 1817
	  });                                                                                                                // 1818
	});                                                                                                                  // 1819
                                                                                                                      // 1820
/***/ },                                                                                                              // 1821
/* 18 */                                                                                                              // 1822
/***/ function(module, exports, __webpack_require__) {                                                                // 1823
                                                                                                                      // 1824
	'use strict';                                                                                                        // 1825
                                                                                                                      // 1826
	Object.defineProperty(exports, "__esModule", {                                                                       // 1827
	  value: true                                                                                                        // 1828
	});                                                                                                                  // 1829
	exports.name = undefined;                                                                                            // 1830
                                                                                                                      // 1831
	var _mixer = __webpack_require__(17);                                                                                // 1832
                                                                                                                      // 1833
	var name = exports.name = 'angular-meteor.scope';                                                                    // 1834
                                                                                                                      // 1835
	angular.module(name, [_mixer.name]).run(['$rootScope', _mixer.Mixer, function ($rootScope, $Mixer) {                 // 1836
	  var Scope = $rootScope.constructor;                                                                                // 1837
	  var $new = $rootScope.$new;                                                                                        // 1838
                                                                                                                      // 1839
	  // Apply extensions whether a mixin in defined.                                                                    // 1840
	  // Note that this way mixins which are initialized later                                                           // 1841
	  // can be applied on rootScope.                                                                                    // 1842
	  $Mixer._autoExtend.push(Scope.prototype);                                                                          // 1843
	  $Mixer._autoConstruct.push($rootScope);                                                                            // 1844
                                                                                                                      // 1845
	  Scope.prototype.$new = function () {                                                                               // 1846
	    var scope = $new.apply(this, arguments);                                                                         // 1847
	    // Apply constructors to newly created scopes                                                                    // 1848
	    return $Mixer._construct(scope);                                                                                 // 1849
	  };                                                                                                                 // 1850
	}]);                                                                                                                 // 1851
                                                                                                                      // 1852
/***/ },                                                                                                              // 1853
/* 19 */                                                                                                              // 1854
/***/ function(module, exports, __webpack_require__) {                                                                // 1855
                                                                                                                      // 1856
	'use strict';                                                                                                        // 1857
                                                                                                                      // 1858
	Object.defineProperty(exports, "__esModule", {                                                                       // 1859
	  value: true                                                                                                        // 1860
	});                                                                                                                  // 1861
	exports.Core = exports.name = undefined;                                                                             // 1862
                                                                                                                      // 1863
	var _underscore = __webpack_require__(2);                                                                            // 1864
                                                                                                                      // 1865
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1866
                                                                                                                      // 1867
	var _utils = __webpack_require__(16);                                                                                // 1868
                                                                                                                      // 1869
	var _mixer = __webpack_require__(17);                                                                                // 1870
                                                                                                                      // 1871
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1872
                                                                                                                      // 1873
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
                                                                                                                      // 1875
	var name = exports.name = 'angular-meteor.core';                                                                     // 1876
	var Core = exports.Core = '$$Core';                                                                                  // 1877
                                                                                                                      // 1878
	angular.module(name, [_utils.name, _mixer.name])                                                                     // 1879
                                                                                                                      // 1880
	/*                                                                                                                   // 1881
	  A mixin which provides us with core Meteor functions.                                                              // 1882
	 */                                                                                                                  // 1883
	.factory(Core, ['$q', _utils.utils, _mixer.Mixer, function ($q, $$utils, $Mixer) {                                   // 1884
	  function $$Core() {}                                                                                               // 1885
                                                                                                                      // 1886
	  // Calls Meteor.autorun() which will be digested after each run and automatically destroyed                        // 1887
	  $$Core.autorun = function (fn) {                                                                                   // 1888
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];                           // 1889
                                                                                                                      // 1890
	    fn = this.$bindToContext($Mixer.caller, fn);                                                                     // 1891
                                                                                                                      // 1892
	    if (!_underscore2.default.isFunction(fn)) {                                                                      // 1893
	      throw Error('argument 1 must be a function');                                                                  // 1894
	    }                                                                                                                // 1895
	    if (!_underscore2.default.isObject(options)) {                                                                   // 1896
	      throw Error('argument 2 must be an object');                                                                   // 1897
	    }                                                                                                                // 1898
                                                                                                                      // 1899
	    var computation = Tracker.autorun(fn, options);                                                                  // 1900
	    // Reset to a function that will also stop the listener we just added                                            // 1901
	    computation.stop = this.$$autoStop(computation);                                                                 // 1902
	    return computation;                                                                                              // 1903
	  };                                                                                                                 // 1904
                                                                                                                      // 1905
	  // Calls Meteor.subscribe() which will be digested after each invokation                                           // 1906
	  // and automatically destroyed                                                                                     // 1907
	  $$Core.subscribe = function (subName, fn, cb) {                                                                    // 1908
	    fn = this.$bindToContext($Mixer.caller, fn || angular.noop);                                                     // 1909
	    cb = cb ? this.$bindToContext($Mixer.caller, cb) : angular.noop;                                                 // 1910
                                                                                                                      // 1911
	    // Additional callbacks specific for this library                                                                // 1912
	    // onStart - right after Meteor.subscribe()                                                                      // 1913
	    var hooks = {                                                                                                    // 1914
	      onStart: angular.noop                                                                                          // 1915
	    };                                                                                                               // 1916
                                                                                                                      // 1917
	    if (!_underscore2.default.isString(subName)) {                                                                   // 1918
	      throw Error('argument 1 must be a string');                                                                    // 1919
	    }                                                                                                                // 1920
	    if (!_underscore2.default.isFunction(fn)) {                                                                      // 1921
	      throw Error('argument 2 must be a function');                                                                  // 1922
	    }                                                                                                                // 1923
	    if (!_underscore2.default.isFunction(cb) && !_underscore2.default.isObject(cb)) {                                // 1924
	      throw Error('argument 3 must be a function or an object');                                                     // 1925
	    }                                                                                                                // 1926
                                                                                                                      // 1927
	    if (_underscore2.default.isObject(cb)) {                                                                         // 1928
	      for (var hook in hooks) {                                                                                      // 1929
	        if (hooks.hasOwnProperty(hook) && cb[hook]) {                                                                // 1930
	          // Don't use any of additional callbacks in Meteor.subscribe                                               // 1931
	          hooks[hook] = cb[hook];                                                                                    // 1932
	          delete cb[hook];                                                                                           // 1933
	        }                                                                                                            // 1934
	      }                                                                                                              // 1935
	    }                                                                                                                // 1936
                                                                                                                      // 1937
	    var result = {};                                                                                                 // 1938
                                                                                                                      // 1939
	    var computation = this.autorun(function () {                                                                     // 1940
	      var _Meteor;                                                                                                   // 1941
                                                                                                                      // 1942
	      var args = fn();                                                                                               // 1943
	      if (angular.isUndefined(args)) args = [];                                                                      // 1944
                                                                                                                      // 1945
	      if (!_underscore2.default.isArray(args)) {                                                                     // 1946
	        throw Error('reactive function\'s return value must be an array');                                           // 1947
	      }                                                                                                              // 1948
                                                                                                                      // 1949
	      var subscription = (_Meteor = Meteor).subscribe.apply(_Meteor, [subName].concat(_toConsumableArray(args), [cb]));
                                                                                                                      // 1951
	      hooks.onStart();                                                                                               // 1952
                                                                                                                      // 1953
	      result.ready = subscription.ready.bind(subscription);                                                          // 1954
	      result.subscriptionId = subscription.subscriptionId;                                                           // 1955
	    });                                                                                                              // 1956
                                                                                                                      // 1957
	    // Once the computation has been stopped,                                                                        // 1958
	    // any subscriptions made inside will be stopped as well                                                         // 1959
	    result.stop = computation.stop.bind(computation);                                                                // 1960
	    return result;                                                                                                   // 1961
	  };                                                                                                                 // 1962
                                                                                                                      // 1963
	  // Calls Meteor.call() wrapped by a digestion cycle                                                                // 1964
	  $$Core.callMethod = function () {                                                                                  // 1965
	    var _Meteor2;                                                                                                    // 1966
                                                                                                                      // 1967
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {                           // 1968
	      args[_key] = arguments[_key];                                                                                  // 1969
	    }                                                                                                                // 1970
                                                                                                                      // 1971
	    var fn = args.pop();                                                                                             // 1972
	    if (_underscore2.default.isFunction(fn)) fn = this.$bindToContext($Mixer.caller, fn);                            // 1973
	    return (_Meteor2 = Meteor).call.apply(_Meteor2, args.concat([fn]));                                              // 1974
	  };                                                                                                                 // 1975
                                                                                                                      // 1976
	  // Calls Meteor.apply() wrapped by a digestion cycle                                                               // 1977
	  $$Core.applyMethod = function () {                                                                                 // 1978
	    var _Meteor3;                                                                                                    // 1979
                                                                                                                      // 1980
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {                     // 1981
	      args[_key2] = arguments[_key2];                                                                                // 1982
	    }                                                                                                                // 1983
                                                                                                                      // 1984
	    var fn = args.pop();                                                                                             // 1985
	    if (_underscore2.default.isFunction(fn)) fn = this.$bindToContext($Mixer.caller, fn);                            // 1986
	    return (_Meteor3 = Meteor).apply.apply(_Meteor3, args.concat([fn]));                                             // 1987
	  };                                                                                                                 // 1988
                                                                                                                      // 1989
	  // Stops a process once the scope has been destroyed                                                               // 1990
	  $$Core.$$autoStop = function (stoppable) {                                                                         // 1991
	    var removeListener = undefined;                                                                                  // 1992
	    var baseStop = stoppable.stop.bind(stoppable);                                                                   // 1993
                                                                                                                      // 1994
	    // Once the process has been stopped the destroy event listener will be removed                                  // 1995
	    // to avoid memory leaks and unexpected behaviours                                                               // 1996
	    var stop = function stop() {                                                                                     // 1997
	      removeListener();                                                                                              // 1998
	      return baseStop.apply(undefined, arguments);                                                                   // 1999
	    };                                                                                                               // 2000
                                                                                                                      // 2001
	    removeListener = this.$on('$destroy', stop);                                                                     // 2002
	    return stop;                                                                                                     // 2003
	  };                                                                                                                 // 2004
                                                                                                                      // 2005
	  // Digests scope only if there is no phase at the moment                                                           // 2006
	  $$Core.$$throttledDigest = function () {                                                                           // 2007
	    var isDigestable = !this.$$destroyed && !this.$$phase && !this.$root.$$phase;                                    // 2008
                                                                                                                      // 2009
	    if (isDigestable) this.$digest();                                                                                // 2010
	  };                                                                                                                 // 2011
                                                                                                                      // 2012
	  // Creates a promise only that the digestion cycle will be called at its fulfillment                               // 2013
	  $$Core.$$defer = function () {                                                                                     // 2014
	    var deferred = $q.defer();                                                                                       // 2015
	    // Once promise has been fulfilled, digest                                                                       // 2016
	    deferred.promise = deferred.promise.finally(this.$$throttledDigest.bind(this));                                  // 2017
	    return deferred;                                                                                                 // 2018
	  };                                                                                                                 // 2019
                                                                                                                      // 2020
	  // Binds an object or a function to the provided context and digest it once it is invoked                          // 2021
	  $$Core.$bindToContext = function (context, fn) {                                                                   // 2022
	    if (_underscore2.default.isFunction(context)) {                                                                  // 2023
	      fn = context;                                                                                                  // 2024
	      context = this;                                                                                                // 2025
	    }                                                                                                                // 2026
                                                                                                                      // 2027
	    return $$utils.bind(fn, context, this.$$throttledDigest.bind(this));                                             // 2028
	  };                                                                                                                 // 2029
                                                                                                                      // 2030
	  return $$Core;                                                                                                     // 2031
	}]);                                                                                                                 // 2032
                                                                                                                      // 2033
/***/ },                                                                                                              // 2034
/* 20 */                                                                                                              // 2035
/***/ function(module, exports, __webpack_require__) {                                                                // 2036
                                                                                                                      // 2037
	'use strict';                                                                                                        // 2038
                                                                                                                      // 2039
	Object.defineProperty(exports, "__esModule", {                                                                       // 2040
	  value: true                                                                                                        // 2041
	});                                                                                                                  // 2042
	exports.reactive = exports.ViewModel = exports.name = undefined;                                                     // 2043
                                                                                                                      // 2044
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
                                                                                                                      // 2046
	var _underscore = __webpack_require__(2);                                                                            // 2047
                                                                                                                      // 2048
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 2049
                                                                                                                      // 2050
	var _utils = __webpack_require__(16);                                                                                // 2051
                                                                                                                      // 2052
	var _mixer = __webpack_require__(17);                                                                                // 2053
                                                                                                                      // 2054
	var _core = __webpack_require__(19);                                                                                 // 2055
                                                                                                                      // 2056
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 2057
                                                                                                                      // 2058
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
                                                                                                                      // 2060
	var name = exports.name = 'angular-meteor.view-model';                                                               // 2061
	var ViewModel = exports.ViewModel = '$$ViewModel';                                                                   // 2062
	var reactive = exports.reactive = '$reactive';                                                                       // 2063
                                                                                                                      // 2064
	angular.module(name, [_utils.name, _mixer.name, _core.name])                                                         // 2065
                                                                                                                      // 2066
	/*                                                                                                                   // 2067
	  A mixin which lets us bind a view model into a scope.                                                              // 2068
	  Note that only a single view model can be bound,                                                                   // 2069
	  otherwise the scope might behave unexpectedly.                                                                     // 2070
	  Mainly used to define the controller as the view model,                                                            // 2071
	  and very useful when wanting to use Angular's `controllerAs` syntax.                                               // 2072
	 */                                                                                                                  // 2073
	.factory(ViewModel, [_utils.utils, _mixer.Mixer, function ($$utils, $Mixer) {                                        // 2074
	  function $$ViewModel() {}                                                                                          // 2075
                                                                                                                      // 2076
	  // Gets an object, wraps it with scope functions and returns it                                                    // 2077
	  $$ViewModel.viewModel = function (vm) {                                                                            // 2078
	    if (!_underscore2.default.isObject(vm)) {                                                                        // 2079
	      throw Error('argument 1 must be an object');                                                                   // 2080
	    }                                                                                                                // 2081
                                                                                                                      // 2082
	    // Extend view model with mixin functions                                                                        // 2083
	    $Mixer._extend(vm, {                                                                                             // 2084
	      pattern: /^(?!\$\$).*$/, // Omitting methods which start with a $$ notation                                    // 2085
	      context: this // Binding methods to scope                                                                      // 2086
	    });                                                                                                              // 2087
                                                                                                                      // 2088
	    // Apply mixin constructors on scope with view model                                                             // 2089
	    $Mixer._construct(this, vm);                                                                                     // 2090
	    return vm;                                                                                                       // 2091
	  };                                                                                                                 // 2092
                                                                                                                      // 2093
	  return $$ViewModel;                                                                                                // 2094
	}])                                                                                                                  // 2095
                                                                                                                      // 2096
	/*                                                                                                                   // 2097
	  Illustrates the old API where a view model is created using $reactive service                                      // 2098
	 */                                                                                                                  // 2099
	.service(reactive, [_utils.utils, function ($$utils) {                                                               // 2100
	  var Reactive = function () {                                                                                       // 2101
	    function Reactive(vm) {                                                                                          // 2102
	      var _this = this;                                                                                              // 2103
                                                                                                                      // 2104
	      _classCallCheck(this, Reactive);                                                                               // 2105
                                                                                                                      // 2106
	      if (!_underscore2.default.isObject(vm)) {                                                                      // 2107
	        throw Error('argument 1 must be an object');                                                                 // 2108
	      }                                                                                                              // 2109
                                                                                                                      // 2110
	      _underscore2.default.defer(function () {                                                                       // 2111
	        if (!_this._attached) {                                                                                      // 2112
	          console.warn('view model was not attached to any scope');                                                  // 2113
	        }                                                                                                            // 2114
	      });                                                                                                            // 2115
                                                                                                                      // 2116
	      this._vm = vm;                                                                                                 // 2117
	    }                                                                                                                // 2118
                                                                                                                      // 2119
	    _createClass(Reactive, [{                                                                                        // 2120
	      key: 'attach',                                                                                                 // 2121
	      value: function attach(scope) {                                                                                // 2122
	        this._attached = true;                                                                                       // 2123
                                                                                                                      // 2124
	        if (!$$utils.isScope(scope)) {                                                                               // 2125
	          throw Error('argument 1 must be a scope');                                                                 // 2126
	        }                                                                                                            // 2127
                                                                                                                      // 2128
	        var viewModel = scope.viewModel(this._vm);                                                                   // 2129
                                                                                                                      // 2130
	        // Similar to the old/Meteor API                                                                             // 2131
	        viewModel.call = viewModel.callMethod;                                                                       // 2132
	        viewModel.apply = viewModel.applyMethod;                                                                     // 2133
                                                                                                                      // 2134
	        return viewModel;                                                                                            // 2135
	      }                                                                                                              // 2136
	    }]);                                                                                                             // 2137
                                                                                                                      // 2138
	    return Reactive;                                                                                                 // 2139
	  }();                                                                                                               // 2140
                                                                                                                      // 2141
	  return function (vm) {                                                                                             // 2142
	    return new Reactive(vm);                                                                                         // 2143
	  };                                                                                                                 // 2144
	}]);                                                                                                                 // 2145
                                                                                                                      // 2146
/***/ },                                                                                                              // 2147
/* 21 */                                                                                                              // 2148
/***/ function(module, exports, __webpack_require__) {                                                                // 2149
                                                                                                                      // 2150
	'use strict';                                                                                                        // 2151
                                                                                                                      // 2152
	Object.defineProperty(exports, "__esModule", {                                                                       // 2153
	  value: true                                                                                                        // 2154
	});                                                                                                                  // 2155
	exports.Reactive = exports.name = undefined;                                                                         // 2156
                                                                                                                      // 2157
	var _jsondiffpatch = __webpack_require__(22);                                                                        // 2158
                                                                                                                      // 2159
	var _jsondiffpatch2 = _interopRequireDefault(_jsondiffpatch);                                                        // 2160
                                                                                                                      // 2161
	var _underscore = __webpack_require__(2);                                                                            // 2162
                                                                                                                      // 2163
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 2164
                                                                                                                      // 2165
	var _utils = __webpack_require__(16);                                                                                // 2166
                                                                                                                      // 2167
	var _mixer = __webpack_require__(17);                                                                                // 2168
                                                                                                                      // 2169
	var _core = __webpack_require__(19);                                                                                 // 2170
                                                                                                                      // 2171
	var _viewModel = __webpack_require__(20);                                                                            // 2172
                                                                                                                      // 2173
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 2174
                                                                                                                      // 2175
	var name = exports.name = 'angular-meteor.reactive';                                                                 // 2176
	var Reactive = exports.Reactive = '$$Reactive';                                                                      // 2177
                                                                                                                      // 2178
	angular.module(name, [_utils.name, _mixer.name, _core.name, _viewModel.name])                                        // 2179
                                                                                                                      // 2180
	/*                                                                                                                   // 2181
	  A mixin which enhance our reactive abilities by providing methods                                                  // 2182
	  that are capable of updating our scope reactively.                                                                 // 2183
	 */                                                                                                                  // 2184
	.factory(Reactive, ['$parse', _utils.utils, _mixer.Mixer, function ($parse, $$utils, $Mixer) {                       // 2185
	  function $$Reactive() {                                                                                            // 2186
	    var vm = arguments.length <= 0 || arguments[0] === undefined ? this : arguments[0];                              // 2187
                                                                                                                      // 2188
	    // Helps us track changes made in the view model                                                                 // 2189
	    vm.$$dependencies = {};                                                                                          // 2190
	  }                                                                                                                  // 2191
                                                                                                                      // 2192
	  // Gets an object containing functions and define their results as reactive properties.                            // 2193
	  // Once a return value has been changed the property will be reset.                                                // 2194
	  $$Reactive.helpers = function (vm, props) {                                                                        // 2195
	    var _this = this;                                                                                                // 2196
                                                                                                                      // 2197
	    if ($$utils.isViewModel(vm)) {                                                                                   // 2198
	      if (!_underscore2.default.isObject(props)) {                                                                   // 2199
	        throw Error('argument 2 must be an object');                                                                 // 2200
	      }                                                                                                              // 2201
	    } else {                                                                                                         // 2202
	      props = vm;                                                                                                    // 2203
	      vm = $Mixer.caller;                                                                                            // 2204
                                                                                                                      // 2205
	      if (!_underscore2.default.isObject(props)) {                                                                   // 2206
	        throw Error('argument 1 must be an object');                                                                 // 2207
	      }                                                                                                              // 2208
	    }                                                                                                                // 2209
                                                                                                                      // 2210
	    _underscore2.default.each(props, function (v, k) {                                                               // 2211
	      if (!_underscore2.default.isFunction(v)) {                                                                     // 2212
	        throw Error('helper \'' + k + '\' must be a function');                                                      // 2213
	      }                                                                                                              // 2214
	    });                                                                                                              // 2215
                                                                                                                      // 2216
	    _underscore2.default.each(props, function (v, k) {                                                               // 2217
	      if (!vm.$$dependencies[k]) {                                                                                   // 2218
	        // Registers a new dependency to the specified helper                                                        // 2219
	        vm.$$dependencies[k] = new Tracker.Dependency();                                                             // 2220
	      }                                                                                                              // 2221
                                                                                                                      // 2222
	      _this.$$setFnHelper(vm, k, v);                                                                                 // 2223
	    });                                                                                                              // 2224
	  };                                                                                                                 // 2225
                                                                                                                      // 2226
	  // Gets a model reactively                                                                                         // 2227
	  $$Reactive.getReactively = function (vm, k, isDeep) {                                                              // 2228
	    if ($$utils.isViewModel(vm)) {                                                                                   // 2229
	      if (angular.isUndefined(isDeep)) isDeep = false;                                                               // 2230
                                                                                                                      // 2231
	      if (!_underscore2.default.isString(k)) {                                                                       // 2232
	        throw Error('argument 2 must be a string');                                                                  // 2233
	      }                                                                                                              // 2234
	      if (!_underscore2.default.isBoolean(isDeep)) {                                                                 // 2235
	        throw Error('argument 3 must be a boolean');                                                                 // 2236
	      }                                                                                                              // 2237
	    } else {                                                                                                         // 2238
	      isDeep = angular.isDefined(k) ? k : false;                                                                     // 2239
	      k = vm;                                                                                                        // 2240
	      vm = $Mixer.caller;                                                                                            // 2241
                                                                                                                      // 2242
	      if (!_underscore2.default.isString(k)) {                                                                       // 2243
	        throw Error('argument 1 must be a string');                                                                  // 2244
	      }                                                                                                              // 2245
	      if (!_underscore2.default.isBoolean(isDeep)) {                                                                 // 2246
	        throw Error('argument 2 must be a boolean');                                                                 // 2247
	      }                                                                                                              // 2248
	    }                                                                                                                // 2249
                                                                                                                      // 2250
	    return this.$$reactivateEntity(vm, k, this.$watch, isDeep);                                                      // 2251
	  };                                                                                                                 // 2252
                                                                                                                      // 2253
	  // Gets a collection reactively                                                                                    // 2254
	  $$Reactive.getCollectionReactively = function (vm, k) {                                                            // 2255
	    if ($$utils.isViewModel(vm)) {                                                                                   // 2256
	      if (!_underscore2.default.isString(k)) {                                                                       // 2257
	        throw Error('argument 2 must be a string');                                                                  // 2258
	      }                                                                                                              // 2259
	    } else {                                                                                                         // 2260
	      k = vm;                                                                                                        // 2261
	      vm = $Mixer.caller;                                                                                            // 2262
                                                                                                                      // 2263
	      if (!_underscore2.default.isString(k)) {                                                                       // 2264
	        throw Error('argument 1 must be a string');                                                                  // 2265
	      }                                                                                                              // 2266
	    }                                                                                                                // 2267
                                                                                                                      // 2268
	    return this.$$reactivateEntity(vm, k, this.$watchCollection);                                                    // 2269
	  };                                                                                                                 // 2270
                                                                                                                      // 2271
	  // Gets an entity reactively, and once it has been changed the computation will be recomputed                      // 2272
	  $$Reactive.$$reactivateEntity = function (vm, k, watcher) {                                                        // 2273
	    if (!vm.$$dependencies[k]) {                                                                                     // 2274
	      vm.$$dependencies[k] = new Tracker.Dependency();                                                               // 2275
                                                                                                                      // 2276
	      for (var _len = arguments.length, watcherArgs = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	        watcherArgs[_key - 3] = arguments[_key];                                                                     // 2278
	      }                                                                                                              // 2279
                                                                                                                      // 2280
	      this.$$watchEntity.apply(this, [vm, k, watcher].concat(watcherArgs));                                          // 2281
	    }                                                                                                                // 2282
                                                                                                                      // 2283
	    vm.$$dependencies[k].depend();                                                                                   // 2284
	    return $parse(k)(vm);                                                                                            // 2285
	  };                                                                                                                 // 2286
                                                                                                                      // 2287
	  // Watches for changes in the view model, and if so will notify a change                                           // 2288
	  $$Reactive.$$watchEntity = function (vm, k, watcher) {                                                             // 2289
	    var _this2 = this;                                                                                               // 2290
                                                                                                                      // 2291
	    // Gets a deep property from the caller                                                                          // 2292
	    var getVal = _underscore2.default.partial($parse(k), vm);                                                        // 2293
	    var initialVal = getVal();                                                                                       // 2294
                                                                                                                      // 2295
	    // Watches for changes in the view model                                                                         // 2296
                                                                                                                      // 2297
	    for (var _len2 = arguments.length, watcherArgs = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
	      watcherArgs[_key2 - 3] = arguments[_key2];                                                                     // 2299
	    }                                                                                                                // 2300
                                                                                                                      // 2301
	    watcher.call.apply(watcher, [this, getVal, function (val, oldVal) {                                              // 2302
	      var hasChanged = val !== initialVal || val !== oldVal;                                                         // 2303
                                                                                                                      // 2304
	      // Notify if a change has been detected                                                                        // 2305
	      if (hasChanged) _this2.$$changed(vm, k);                                                                       // 2306
	    }].concat(watcherArgs));                                                                                         // 2307
	  };                                                                                                                 // 2308
                                                                                                                      // 2309
	  // Invokes a function and sets the return value as a property                                                      // 2310
	  $$Reactive.$$setFnHelper = function (vm, k, fn) {                                                                  // 2311
	    var _this3 = this;                                                                                               // 2312
                                                                                                                      // 2313
	    var activeObservation = null;                                                                                    // 2314
	    var lastModel = null;                                                                                            // 2315
	    var lastModelData = [];                                                                                          // 2316
                                                                                                                      // 2317
	    this.autorun(function () /* computation */{                                                                      // 2318
	      // Invokes the reactive functon                                                                                // 2319
	      var model = fn.apply(vm);                                                                                      // 2320
                                                                                                                      // 2321
	      // Ignore notifications made by the following handler                                                          // 2322
	      Tracker.nonreactive(function () {                                                                              // 2323
	        // If a cursor, observe its changes and update acoordingly                                                   // 2324
	        if ($$utils.isCursor(model)) {                                                                               // 2325
	          var modelData = undefined;                                                                                 // 2326
                                                                                                                      // 2327
	          if (angular.isUndefined(vm[k])) {                                                                          // 2328
	            _this3.$$setValHelper(vm, k, [], false);                                                                 // 2329
	          }                                                                                                          // 2330
                                                                                                                      // 2331
	          if (activeObservation) {                                                                                   // 2332
	            lastModelData = lastModel.fetch();                                                                       // 2333
	            activeObservation.stop();                                                                                // 2334
	            activeObservation = null;                                                                                // 2335
	          }                                                                                                          // 2336
                                                                                                                      // 2337
	          var handle = _this3.$$handleCursor(vm, k, model);                                                          // 2338
                                                                                                                      // 2339
	          activeObservation = handle.observation;                                                                    // 2340
	          modelData = handle.data;                                                                                   // 2341
                                                                                                                      // 2342
	          if (lastModelData.length !== 0) {                                                                          // 2343
	            var diff = _jsondiffpatch2.default.diff(lastModelData, modelData);                                       // 2344
	            vm[k] = _jsondiffpatch2.default.patch(lastModelData, diff);                                              // 2345
	          } else {                                                                                                   // 2346
	            vm[k] = modelData;                                                                                       // 2347
	          }                                                                                                          // 2348
                                                                                                                      // 2349
	          lastModel = model;                                                                                         // 2350
	          lastModelData = modelData;                                                                                 // 2351
                                                                                                                      // 2352
	          /* computation.onInvalidate(() => {                                                                        // 2353
	            activeObservation.stop();                                                                                // 2354
	          });*/                                                                                                      // 2355
	        } else {                                                                                                     // 2356
	            _this3.$$handleNonCursor(vm, k, model);                                                                  // 2357
	          }                                                                                                          // 2358
                                                                                                                      // 2359
	        // Notify change and update the view model                                                                   // 2360
	        _this3.$$changed(vm, k);                                                                                     // 2361
	      });                                                                                                            // 2362
	    });                                                                                                              // 2363
	  };                                                                                                                 // 2364
                                                                                                                      // 2365
	  // Sets a value helper as a setter and a getter which will notify computations once used                           // 2366
	  $$Reactive.$$setValHelper = function (vm, k, v) {                                                                  // 2367
	    var _this4 = this;                                                                                               // 2368
                                                                                                                      // 2369
	    var watch = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];                           // 2370
                                                                                                                      // 2371
	    // If set, reactives property                                                                                    // 2372
	    if (watch) {                                                                                                     // 2373
	      var isDeep = _underscore2.default.isObject(v);                                                                 // 2374
	      this.getReactively(vm, k, isDeep);                                                                             // 2375
	    }                                                                                                                // 2376
                                                                                                                      // 2377
	    Object.defineProperty(vm, k, {                                                                                   // 2378
	      configurable: true,                                                                                            // 2379
	      enumerable: true,                                                                                              // 2380
                                                                                                                      // 2381
	      get: function get() {                                                                                          // 2382
	        return v;                                                                                                    // 2383
	      },                                                                                                             // 2384
	      set: function set(newVal) {                                                                                    // 2385
	        v = newVal;                                                                                                  // 2386
	        _this4.$$changed(vm, k);                                                                                     // 2387
	      }                                                                                                              // 2388
	    });                                                                                                              // 2389
	  };                                                                                                                 // 2390
                                                                                                                      // 2391
	  // Fetching a cursor and updates properties once the result set has been changed                                   // 2392
	  $$Reactive.$$handleCursor = function (vm, k, cursor) {                                                             // 2393
	    var _this5 = this;                                                                                               // 2394
                                                                                                                      // 2395
	    var data = [];                                                                                                   // 2396
	    // Observe changes made in the result set                                                                        // 2397
	    var observation = cursor.observe({                                                                               // 2398
	      addedAt: function addedAt(doc, atIndex) {                                                                      // 2399
	        if (!observation) {                                                                                          // 2400
	          data.push(doc);                                                                                            // 2401
	          return;                                                                                                    // 2402
	        }                                                                                                            // 2403
	        vm[k].splice(atIndex, 0, doc);                                                                               // 2404
	        _this5.$$changed(vm, k);                                                                                     // 2405
	      },                                                                                                             // 2406
	      changedAt: function changedAt(doc, oldDoc, atIndex) {                                                          // 2407
	        var diff = _jsondiffpatch2.default.diff(vm[k][atIndex], doc);                                                // 2408
	        _jsondiffpatch2.default.patch(vm[k][atIndex], diff);                                                         // 2409
	        _this5.$$changed(vm, k);                                                                                     // 2410
	      },                                                                                                             // 2411
	      movedTo: function movedTo(doc, fromIndex, toIndex) {                                                           // 2412
	        vm[k].splice(fromIndex, 1);                                                                                  // 2413
	        vm[k].splice(toIndex, 0, doc);                                                                               // 2414
	        _this5.$$changed(vm, k);                                                                                     // 2415
	      },                                                                                                             // 2416
	      removedAt: function removedAt(oldDoc, atIndex) {                                                               // 2417
	        vm[k].splice(atIndex, 1);                                                                                    // 2418
	        _this5.$$changed(vm, k);                                                                                     // 2419
	      }                                                                                                              // 2420
	    });                                                                                                              // 2421
                                                                                                                      // 2422
	    return {                                                                                                         // 2423
	      observation: observation,                                                                                      // 2424
	      data: data                                                                                                     // 2425
	    };                                                                                                               // 2426
	  };                                                                                                                 // 2427
                                                                                                                      // 2428
	  $$Reactive.$$handleNonCursor = function (vm, k, data) {                                                            // 2429
	    var v = vm[k];                                                                                                   // 2430
                                                                                                                      // 2431
	    if (angular.isDefined(v)) {                                                                                      // 2432
	      delete vm[k];                                                                                                  // 2433
	      v = null;                                                                                                      // 2434
	    }                                                                                                                // 2435
                                                                                                                      // 2436
	    if (angular.isUndefined(v)) {                                                                                    // 2437
	      this.$$setValHelper(vm, k, data);                                                                              // 2438
	    }                                                                                                                // 2439
	    // Update property if the new value is from the same type                                                        // 2440
	    else if ($$utils.areSiblings(v, data)) {                                                                         // 2441
	        var diff = _jsondiffpatch2.default.diff(v, data);                                                            // 2442
	        _jsondiffpatch2.default.patch(v, diff);                                                                      // 2443
	        this.$$changed(vm, k);                                                                                       // 2444
	      } else {                                                                                                       // 2445
	        vm[k] = data;                                                                                                // 2446
	      }                                                                                                              // 2447
	  };                                                                                                                 // 2448
                                                                                                                      // 2449
	  // Notifies dependency in view model                                                                               // 2450
	  $$Reactive.$$depend = function (vm, k) {                                                                           // 2451
	    vm.$$dependencies[k].depend();                                                                                   // 2452
	  };                                                                                                                 // 2453
                                                                                                                      // 2454
	  // Notifies change in view model                                                                                   // 2455
	  $$Reactive.$$changed = function (vm, k) {                                                                          // 2456
	    this.$$throttledDigest();                                                                                        // 2457
	    vm.$$dependencies[k].changed();                                                                                  // 2458
	  };                                                                                                                 // 2459
                                                                                                                      // 2460
	  return $$Reactive;                                                                                                 // 2461
	}]);                                                                                                                 // 2462
                                                                                                                      // 2463
/***/ },                                                                                                              // 2464
/* 22 */                                                                                                              // 2465
/***/ function(module, exports) {                                                                                     // 2466
                                                                                                                      // 2467
	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;                                                                     // 2468
                                                                                                                      // 2469
/***/ },                                                                                                              // 2470
/* 23 */                                                                                                              // 2471
/***/ function(module, exports) {                                                                                     // 2472
                                                                                                                      // 2473
	'use strict';                                                                                                        // 2474
                                                                                                                      // 2475
	Object.defineProperty(exports, "__esModule", {                                                                       // 2476
	  value: true                                                                                                        // 2477
	});                                                                                                                  // 2478
	var name = exports.name = 'angular-templates';                                                                       // 2479
                                                                                                                      // 2480
	try {                                                                                                                // 2481
	  angular.module(name);                                                                                              // 2482
	} catch (e) {                                                                                                        // 2483
	  angular.module(name, []);                                                                                          // 2484
	}                                                                                                                    // 2485
                                                                                                                      // 2486
/***/ }                                                                                                               // 2487
/******/ ])                                                                                                           // 2488
});                                                                                                                   // 2489
;                                                                                                                     // 2490
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular-meteor-data'] = {};

})();
